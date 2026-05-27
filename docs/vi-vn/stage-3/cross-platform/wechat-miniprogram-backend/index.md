# Cách build Mini App có backend

::: tip Adapt cho VN — Zalo Mini App + Supabase
Bài này dạy build full-stack Zalo Mini App với backend. Stack đề xuất 2026:
- **Frontend**: Zalo Mini App (React-based)
- **Backend**: Supabase (Postgres + Auth + Realtime + Storage)
- **Payment**: ZaloPay
- **Hosting**: Supabase Cloud hoặc self-host VPS VN
- **Alternative**: Firebase, Cloudflare D1, hoặc Express + PostgreSQL
:::

## Tại sao cần backend?

Mini App không có backend chỉ làm được:
- Display tĩnh
- Local calculation
- Call API bên thứ 3

Với backend, làm được:
- User authentication
- Save data user (đơn hàng, lịch sử)
- Multi-user features (chat, social, marketplace)
- Admin panel
- Notification

## Architecture

```
┌─────────────────┐       ┌──────────────────┐
│  Zalo Mini App  │ ────► │  Backend API     │
│  (Frontend)     │       │  (Supabase /     │
│                 │       │   Express)        │
└─────────────────┘       └────────┬─────────┘
        │                          │
        │  ┌────────────────┐     │
        └─►│  Zalo OAuth    │     │
           │  (verify user) │     │
           └────────────────┘     │
                                  ▼
                          ┌──────────────────┐
                          │  Postgres / etc  │
                          └──────────────────┘
```

# Chương 1: setup Supabase backend

## 1.1 Tạo Supabase project

1. Đăng ký https://supabase.com (free tier 500MB DB, 1GB storage)
2. New project → chọn region Singapore (gần VN nhất)
3. Lấy:
   - `SUPABASE_URL`: https://xxxxx.supabase.co
   - `SUPABASE_ANON_KEY`: public key
   - `SUPABASE_SERVICE_KEY`: secret, không expose frontend

## 1.2 Tạo bảng

Trong Supabase Dashboard → SQL Editor:

```sql
-- Bảng users (sync từ Zalo)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zalo_id TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total INT NOT NULL,
  status TEXT DEFAULT 'pending',
  items JSONB,
  zalo_pay_transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: user chỉ xem được data của mình
CREATE POLICY "Users see own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users see own orders" ON orders
  FOR SELECT USING (user_id::text = auth.uid()::text);
```

## 1.3 Cài Supabase client trong Mini App

```bash
npm install @supabase/supabase-js
```

`src/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

# Chương 2: auth flow

## 2.1 Login với Zalo

```typescript
import { authorize, getUserInfo, getAccessToken } from "zmp-sdk/apis";
import { supabase } from "@/lib/supabase";

async function loginWithZalo() {
  // 1. Get permission từ user
  await authorize({ scopes: ["scope.userInfo"] });
  
  // 2. Get user info từ Zalo
  const { userInfo } = await getUserInfo({});
  
  // 3. Get access token Zalo
  const { accessToken } = await getAccessToken({});
  
  // 4. Gửi token lên backend verify + tạo session
  const { data, error } = await supabase.functions.invoke("zalo-login", {
    body: { accessToken, userInfo }
  });
  
  if (error) throw error;
  
  // 5. Save session token
  localStorage.setItem("session_token", data.token);
  return data.user;
}
```

## 2.2 Backend: verify Zalo token

Supabase Edge Function `zalo-login/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  const { accessToken, userInfo } = await req.json();
  
  // 1. Verify token với Zalo API
  const zaloRes = await fetch(`https://graph.zalo.me/v2.0/me?access_token=${accessToken}&fields=id,name,picture`);
  const zaloUser = await zaloRes.json();
  
  if (!zaloUser.id) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
  
  // 2. Upsert user vào Supabase
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  
  const { data: user, error } = await supabase
    .from("users")
    .upsert({
      zalo_id: zaloUser.id,
      name: zaloUser.name,
      avatar_url: zaloUser.picture?.data?.url
    }, { onConflict: "zalo_id" })
    .select()
    .single();
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  
  // 3. Tạo session JWT
  const token = await createJWT({ user_id: user.id });
  
  return new Response(JSON.stringify({ user, token }), {
    headers: { "Content-Type": "application/json" }
  });
});

async function createJWT(payload: any): Promise<string> {
  // Implement JWT signing với Deno crypto
  // (Code chi tiết omit cho ngắn)
  return "jwt-token-here";
}
```

Deploy: `supabase functions deploy zalo-login`

## 2.3 Protected request

```typescript
// Mọi request sau khi login dùng session token
async function getOrders() {
  const token = localStorage.getItem("session_token");
  
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  
  return data;
}
```

# Chương 3: business logic — đơn hàng

## 3.1 Tạo đơn

```typescript
async function createOrder(items: any[], total: number) {
  // 1. Tạo order pending
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      total,
      items,
      status: "pending"
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // 2. Init payment ZaloPay
  const paymentResult = await initZaloPay({
    orderId: order.id,
    amount: total,
    desc: `Đơn hàng #${order.id}`
  });
  
  return { order, payment: paymentResult };
}
```

## 3.2 ZaloPay integration

```typescript
import { createOrder as zpCreateOrder } from "zmp-sdk/apis";

async function initZaloPay({ orderId, amount, desc }: any) {
  return new Promise((resolve, reject) => {
    zpCreateOrder({
      desc,
      item: [{ id: orderId, amount }],
      success: (data) => {
        // Callback từ ZaloPay khi success
        // Send về backend để confirm
        confirmPayment(orderId, data);
        resolve(data);
      },
      fail: (err) => reject(err)
    });
  });
}

async function confirmPayment(orderId: string, paymentData: any) {
  await supabase
    .from("orders")
    .update({
      status: "paid",
      zalo_pay_transaction_id: paymentData.transactionId
    })
    .eq("id", orderId);
  
  // Send notification
  await sendNotification(orderId);
}
```

## 3.3 Webhook từ ZaloPay (server-side confirmation)

ZaloPay sẽ POST webhook xác nhận payment. Backend cần endpoint:

```typescript
// Supabase Edge Function: zalopay-webhook
serve(async (req) => {
  const body = await req.json();
  
  // Verify signature từ ZaloPay (anti-fraud)
  const isValid = await verifyZaloPaySignature(body);
  if (!isValid) return new Response("Invalid signature", { status: 401 });
  
  // Update order status
  await supabase
    .from("orders")
    .update({ status: "paid" })
    .eq("zalo_pay_transaction_id", body.transactionId);
  
  return new Response("OK");
});
```

# Chương 4: realtime — order status

Supabase có Realtime built-in:

```typescript
// Subscribe order status changes
useEffect(() => {
  const channel = supabase
    .channel(`order:${orderId}`)
    .on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: "orders",
      filter: `id=eq.${orderId}`
    }, (payload) => {
      setOrder(payload.new);
      if (payload.new.status === "paid") {
        showSuccess("Thanh toán thành công!");
      }
    })
    .subscribe();
  
  return () => { supabase.removeChannel(channel); };
}, [orderId]);
```

# Chương 5: file upload (avatar, image)

## 5.1 Setup Supabase Storage

Trong Supabase Dashboard → Storage → Create bucket `user-uploads` (public).

## 5.2 Upload from Mini App

```typescript
import { chooseImage, uploadFile } from "zmp-sdk/apis";

async function uploadAvatar() {
  // 1. Chọn ảnh
  const { tempFiles } = await chooseImage({ count: 1 });
  const file = tempFiles[0];
  
  // 2. Upload to Supabase Storage
  const fileName = `${userId}/avatar-${Date.now()}.jpg`;
  const { data, error } = await supabase.storage
    .from("user-uploads")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true
    });
  
  if (error) throw error;
  
  // 3. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("user-uploads")
    .getPublicUrl(fileName);
  
  // 4. Update user record
  await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);
  
  return publicUrl;
}
```

# Chương 6: notification

## 6.1 Push notification qua Zalo OA

Khi order status đổi, gửi notification qua Zalo OA:

```typescript
// Backend function
async function sendZaloNotification(zaloId: string, message: string) {
  const oaAccessToken = await getZaloOAAccessToken();
  
  const response = await fetch("https://openapi.zalo.me/v3.0/oa/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": oaAccessToken
    },
    body: JSON.stringify({
      recipient: { user_id: zaloId },
      message: { text: message }
    })
  });
  
  return response.json();
}
```

## 6.2 In-app notification

```typescript
import { showToast } from "zmp-sdk/apis";

showToast({ message: "Order đã được xác nhận!" });
```

# Chương 7: admin panel

Cần dashboard quản lý orders, users. Build riêng web app:

## 7.1 Next.js admin

```bash
npx create-next-app admin --typescript --tailwind --app
cd admin
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

## 7.2 Auth admin (separate từ Zalo user)

Supabase có built-in auth cho admin:

```typescript
// app/login/page.tsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const supabase = createClientComponentClient();
  
  const handleLogin = async (email, password) => {
    await supabase.auth.signInWithPassword({ email, password });
  };
  
  return <LoginForm onSubmit={handleLogin} />;
}
```

## 7.3 Admin can xem mọi order

```typescript
// Bypass RLS với service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function getAllOrders() {
  const { data } = await supabaseAdmin
    .from("orders")
    .select("*, users(name, phone)")
    .order("created_at", { ascending: false });
  return data;
}
```

# Chương 8: deploy

## 8.1 Deploy Mini App

```bash
zmp build
# Upload www/ folder lên Zalo Mini App Studio
```

## 8.2 Deploy backend

Supabase Edge Functions deploy auto:
```bash
supabase functions deploy --all
```

## 8.3 Deploy admin

Vercel:
```bash
vercel deploy --prod
```

# Best practice

## Security
- **RLS mandatory** trên mọi table
- **Verify webhook signature** từ ZaloPay
- **Validate input** server-side
- **Rate limiting** trên API endpoint nhạy cảm
- **HTTPS only**

## Performance
- **Index** trên column query thường (zalo_id, user_id, status)
- **Pagination** cho list lớn
- **Cache** với React Query / SWR
- **CDN** cho image (Cloudflare)
- **Realtime selective** (chỉ subscribe channel cần)

## Cost optimize
- Supabase free tier: 500MB DB, 1GB storage, 2GB bandwidth
- Khi scale: $25/month cho Pro tier (8GB DB, 100GB storage)
- Edge Function: 500K invocation/month free
- Alternative cho VN: Vinahost VPS + self-host Supabase ($5-15/month)

# Câu hỏi thường gặp

### Q1: Tại sao chọn Supabase thay Firebase?

| | Supabase | Firebase |
|---|---|---|
| DB | Postgres (SQL) | Firestore (NoSQL) |
| Pricing | Free tier rộng, predictable | Free tier OK, scale expensive |
| Open source | Yes, self-host được | No |
| VN data residency | Singapore (gần) | US (xa) |
| Realtime | Built-in | Built-in |

### Q2: Có dùng Express thay Supabase Edge Function?

Có. Setup:
```
Express server (host trên Vinahost / Hetzner)
  + PostgreSQL (managed Supabase hoặc self-host)
  + JWT auth tự implement
  + Multer cho upload
```

Phù hợp khi cần custom logic phức tạp Edge Function khó làm.

### Q3: Realtime có tốn cost không?

Supabase free tier: 2 concurrent connection. Pro: 500 concurrent. Đủ cho most use case.

### Q4: ZaloPay rate?

- 2-2.5% per transaction (tuỳ deal)
- Settle T+1 hoặc T+2
- Minimum payment 1,000 VND

### Q5: Compliance PII tiếng Việt?

Theo NĐ13/2023:
- Notify user khi collect PII
- Cho user xem/sửa/xoá data
- Data residency tốt nhất ở VN (self-host Vinahost)
- Audit log thao tác trên PII

# Tài liệu tham khảo

- [Zalo Mini App docs](https://mini.zalo.me/docs/)
- [Supabase docs](https://supabase.com/docs)
- [ZaloPay developer](https://developers.zalopay.vn/)
- [Zalo OA Open API](https://developers.zalo.me/docs/api/official-account-api)

---

# Phụ lục: Backend stack 2026 cho VN startup

## A. Recommended stack

```
Frontend: Zalo Mini App (mass market) + Web (SEO)
Backend: Supabase Edge Functions + Postgres
Payment: ZaloPay + MoMo + VNPay (multi-option)
Storage: Supabase Storage + Cloudflare R2 (CDN)
Email: Resend hoặc Mailgun
Notification: Zalo OA + Email + SMS (eSMS, ESMS)
Analytics: Posthog self-host (privacy + free)
Monitoring: Sentry + UptimeRobot
Search: Meilisearch self-host (Vietnamese-friendly)
```

## B. Cost projection

| MRR | Stack cost |
|---|---|
| $0-$1k | Free tier mọi service: ~$0/tháng |
| $1k-$10k | Supabase Pro $25 + Vercel $20 = ~$50 |
| $10k-$100k | Add Cloudflare $20, Sentry $26, Resend $20 = ~$120 |
| $100k+ | Migrate sang dedicated infra: ~$500-2000 |

## C. Self-host alternative cho compliance

Nếu cần data ở VN:
- VPS Vinahost / BizflyCloud (~$15-30/tháng)
- Docker compose: Postgres + PostgREST + Auth + GoTrue
- Caddy reverse proxy
- Backup S3-compatible (DigitalOcean Spaces)

Effort cao hơn nhưng full control + compliance.

## Sources

- [Supabase docs](https://supabase.com/docs)
- [Zalo Mini App backend best practices](https://mini.zalo.me/docs/backend/)
- [ZaloPay integration guide](https://developers.zalopay.vn/docs/)
- [NĐ13/2023 PII compliance](https://thuvienphapluat.vn/)
