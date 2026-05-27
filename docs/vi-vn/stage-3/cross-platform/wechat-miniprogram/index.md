# Cách build Mini App đơn giản nhất

::: tip Adapt cho VN — Zalo Mini App
Bài gốc viết về WeChat Mini Program (thị trường Trung Quốc, không phổ biến VN). Tôi đã **adapt sang Zalo Mini App** — equivalent của WeChat cho VN với 75M+ user.

**Cả 2 platform có concept tương tự**: framework JS-based, render UI từ JSON config + JS logic, deploy lên platform owner (Tencent/Zalo) qua web-based IDE.

Nếu bạn vẫn cần dev WeChat Mini Program cho thị trường TQ, xem [tài liệu official WeChat](https://developers.weixin.qq.com/miniprogram/en/dev/).
:::

## Zalo Mini App là gì?

Zalo Mini App là "app nhỏ" chạy trong Zalo, user không cần download install. Mở qua:
- Scan QR code
- Search trong Zalo
- Click link share

**Lợi**:
- 75M+ MAU Zalo VN
- Zero install friction
- Tích hợp ZaloPay native
- Tích hợp Zalo OA (chat business)
- Việt-hoá tốt

**Nhược**:
- Chỉ chạy trong Zalo
- Function hạn chế (không full hardware access)
- Phải qua review của Zalo

## Use case phù hợp

- Booking dịch vụ (salon, sửa xe, lịch hẹn bác sĩ)
- E-commerce nhỏ
- Loyalty/membership card
- Local service finder
- Mini game
- Form survey

## Roadmap tutorial

Build **"Hello World"** Zalo Mini App từ 0:
1. Đăng ký Zalo Developer
2. Cài Zalo Mini App Studio
3. Tạo project mới
4. UI cơ bản
5. Logic + ZaloPay integration
6. Preview trên Zalo
7. Publish

# Chương 1: setup

## 1.1 Đăng ký Zalo Developer

1. Truy cập https://developers.zalo.me/
2. Đăng nhập với Zalo account
3. "Create app" → fill thông tin
4. Lấy `App ID`

## 1.2 Cài Zalo Mini App Studio

Tool dev official từ Zalo:

```bash
# Cài Node 18+
npm install -g zmp-cli

# Verify
zmp --version
```

Hoặc download IDE: https://mini.zalo.me/devtools/

## 1.3 Tạo project

```bash
zmp create my-first-app
cd my-first-app
zmp start
```

Project structure:
```
my-first-app/
├── app-config.json      # Config app
├── src/
│   ├── app.tsx          # Entry
│   ├── pages/           # Pages
│   ├── components/      # Components
│   └── css/             # Styles
├── public/
└── package.json
```

# Chương 2: UI cơ bản

## 2.1 app-config.json

```json
{
  "app": {
    "title": "My First App",
    "headerColor": "#4F46E5",
    "textColor": "white",
    "statusBarStyle": "light"
  },
  "listCSS": ["app.css"],
  "listSyncJS": [],
  "pages": [
    {
      "name": "home",
      "title": "Trang chủ",
      "path": "/pages/home/index.tsx"
    },
    {
      "name": "about",
      "title": "Giới thiệu",
      "path": "/pages/about/index.tsx"
    }
  ],
  "template": {
    "navigationBar": {
      "type": "fixed",
      "color": "#4F46E5"
    }
  },
  "tabBar": {
    "color": "#888",
    "selectedColor": "#4F46E5",
    "list": [
      { "iconPath": "icons/home.png", "selectedIconPath": "icons/home-active.png", "pageName": "home", "text": "Home" },
      { "iconPath": "icons/about.png", "selectedIconPath": "icons/about-active.png", "pageName": "about", "text": "About" }
    ]
  }
}
```

## 2.2 Home page

`src/pages/home/index.tsx`:

```tsx
import React, { useState } from "react";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { authorize, getUserInfo } from "zmp-sdk/apis";

const HomePage: React.FunctionComponent = () => {
  const [userName, setUserName] = useState<string>("");
  
  const handleGetUserInfo = async () => {
    try {
      // Request permission
      await authorize({ scopes: ["scope.userInfo"] });
      // Get user info
      const { userInfo } = await getUserInfo({});
      setUserName(userInfo.name);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <Page className="page">
      <Header title="Trang chủ" />
      <Box flex flexDirection="column" alignItems="center" p={4}>
        <Text size="xLarge" bold>
          Chào mừng {userName || "bạn"} đến với Zalo Mini App!
        </Text>
        <Box mt={4}>
          <Button onClick={handleGetUserInfo}>
            Lấy thông tin user
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default HomePage;
```

## 2.3 About page

```tsx
import React from "react";
import { Box, Header, Page, Text } from "zmp-ui";

const AboutPage = () => (
  <Page>
    <Header title="Giới thiệu" />
    <Box p={4}>
      <Text size="large" bold>Về app</Text>
      <Text>App được build bằng Zalo Mini App framework</Text>
      <Text mt={2}>Version: 1.0.0</Text>
    </Box>
  </Page>
);

export default AboutPage;
```

# Chương 3: tích hợp Zalo SDK

## 3.1 ZaloPay payment

```typescript
import { createOrder } from "zmp-sdk/apis";

async function checkout(amount: number) {
  try {
    const result = await createOrder({
      desc: "Thanh toán đơn hàng #123",
      item: [{ id: "item1", amount }],
      success: (data) => {
        console.log("Payment success", data);
      },
      fail: (err) => {
        console.error("Payment fail", err);
      }
    });
    return result;
  } catch (err) {
    console.error(err);
  }
}
```

## 3.2 Share với bạn bè

```typescript
import { openShareSheet } from "zmp-sdk/apis";

async function share() {
  await openShareSheet({
    type: "link",
    data: {
      link: "https://zalo.me/your-app",
      chatOnly: false
    }
  });
}
```

## 3.3 Location

```typescript
import { getLocation } from "zmp-sdk/apis";

const { latitude, longitude } = await getLocation({});
```

## 3.4 QR scan

```typescript
import { scanQRCode } from "zmp-sdk/apis";

const { content } = await scanQRCode({});
```

## 3.5 Phone number

```typescript
import { getPhoneNumber } from "zmp-sdk/apis";

const { token } = await getPhoneNumber({});
// Gửi token lên backend, dùng Zalo API exchange → số điện thoại thật
```

# Chương 4: preview và test

## 4.1 Local preview

```bash
zmp start
```

Web preview ở http://localhost:3000. Test UI cơ bản.

## 4.2 Preview trong Zalo

1. Mở Zalo app trên điện thoại
2. Settings → Developer mode → On
3. Quay lại home Zalo → search "Mini App Developer"
4. Scan QR code từ Zalo Mini App Studio (Project → Preview)
5. App mở trong Zalo

# Chương 5: publish

## 5.1 Build production

```bash
zmp build
```

Output trong `www/` folder.

## 5.2 Upload qua Studio

1. Login Zalo Mini App Studio
2. Select app
3. Click "Upload" → chọn folder `www/`
4. Add version note
5. Submit for review

## 5.3 Review

- Zalo review thường 1-3 ngày
- Tiêu chí: function chạy được, không broken link, không nội dung vi phạm
- Sau approve, app available cho tất cả Zalo user

## 5.4 Marketing

- **QR code**: print QR cho user scan
- **Zalo OA**: tích hợp với Zalo OA bot
- **Zalo Ads**: chạy ads target user
- **Mời friend**: share trong Zalo chat
- **SEO trong Zalo search**

# Chương 6: best practice

## 6.1 Performance

- Lazy load page (không load mọi page lúc start)
- Compress image (WebP)
- Cache API response
- Minimize bundle size (<2MB lý tưởng)

## 6.2 UX

- Loading state cho mọi async
- Error handling rõ
- Skeleton screen
- Pull-to-refresh
- Smooth animation

## 6.3 Security

- Verify token Zalo server-side
- Don't trust client data
- HTTPS only
- Sanitize user input

## 6.4 Analytics

- Tích hợp Zalo Analytics
- Custom event tracking
- Funnel analysis
- A/B testing

# Câu hỏi thường gặp

### Q1: Cost dev Zalo Mini App?

Free. Chỉ cần Zalo account + dev tool free.

### Q2: Limit gì so với native app?

- Không background process
- Không push notification chính (chỉ qua Zalo OA)
- Hardware access hạn chế (no Bluetooth, no NFC)
- Storage giới hạn (~10MB)
- Network request phải HTTPS

### Q3: Zalo Mini App vs PWA?

| Tiêu chí | Zalo Mini App | PWA |
|---|---|---|
| Audience | Zalo user VN | Mọi browser user |
| Install | Tự động qua Zalo | Phải user "Add to Home Screen" |
| Payment | ZaloPay built-in | Phải tích hợp Stripe/VNPay |
| Discoverability | Zalo search + share | Google search + share |
| Best for | Mass market VN | International, web-savvy |

### Q4: Có dùng React, Vue được không?

Có. Zalo Mini App framework dựa React. Vue support qua plugin (ít phổ biến).

### Q5: Database thì sao?

Không có built-in DB. Cần backend riêng (Supabase, Firebase, custom Node.js API). Xem bài [tiếp theo](/vi-vn/stage-3/cross-platform/wechat-miniprogram-backend/) cho backend integration.

# Tài liệu tham khảo

- [Zalo Mini App official docs](https://mini.zalo.me/docs/)
- [Zalo Mini App API reference](https://mini.zalo.me/docs/api/)
- [ZMP-UI Component library](https://miniapp.zaloplatform.com/docs/zmp-ui/)
- [Zalo Developer Portal](https://developers.zalo.me/)
- [Sample apps](https://github.com/zaloapp)

---

# Phụ lục: Zalo Mini App 2026

## A. Update 2026

- **Zalo Mini App 2.0** (Q1/2026): support TypeScript native, hot reload nhanh hơn, Tailwind CSS support
- **AI integration**: Zalo AI Studio mới cho phép embed AI chatbot vào Mini App
- **Cross-channel**: 1 Mini App show được cả trong Zalo cá nhân và Zalo OA business
- **Mini Game**: dedicated framework cho game trong Zalo
- **Subscription**: monetize qua subscription, Zalo handle billing

## B. Stack template phổ biến

```
Frontend: Zalo Mini App + React + Tailwind
State: Zustand
Backend: Supabase (free tier) hoặc Firebase
Payment: ZaloPay native
Auth: Zalo OAuth
Analytics: Zalo Analytics + Posthog
Deploy: Zalo Mini App Studio
```

## C. Top Zalo Mini App VN

- **AhaMove**: book xe ôm
- **Be Mini App**: book Be
- **Tiki**: e-commerce
- **Lazada**: e-commerce
- **Zalo OA của các shop nhỏ**: booking, order

## D. Roadmap learning Zalo Mini App

**Tuần 1**: Setup + Hello World + UI cơ bản
**Tuần 2**: Tích hợp ZaloPay, location, QR
**Tuần 3**: Backend (Supabase) + auth flow
**Tuần 4**: Polish UI, performance, publish

## E. WeChat Mini Program (nếu cần TQ market)

Nếu vẫn cần build WeChat Mini Program:
- **WXML + WXSS + JS** thay vì React
- **微信开发者工具** (WeChat DevTools) thay Zalo Studio
- **WeChat Pay** thay ZaloPay
- **Backend**: WeChat Cloud Functions, Tencent Cloud
- **Audience**: 1.3 tỷ user TQ (nhưng VN không dùng)

Docs: https://developers.weixin.qq.com/miniprogram/en/dev/

## Sources

- [Zalo Mini App docs](https://mini.zalo.me/docs/)
- [Zalo Developer blog](https://developers.zalo.me/blog)
- [Awesome Zalo Mini App](https://github.com/awesome-zmp)
