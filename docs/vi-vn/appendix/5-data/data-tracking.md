# Data Tracking: record user làm gì trong app

::: tip 🎯 Vấn đề chương này giải
**Làm sao biết user trong app làm gì?**

Tưởng bạn mở quán trà sữa offline. Đứng quầy quan sát từng khách: xem menu bao lâu? Order gì? Có do dự xong bỏ đi không?

Nhưng "shop" là app/website, không thấy user thao tác. Cần tech "đặt" record point ở vị trí key của app, tự động record từng step user. Đây là **Data Tracking (Event Tracking)**.

"Tracking" nghe professional, nhưng core đơn giản: **đặt "recorder" ở chỗ user có thể thao tác, ghi lại làm gì.**

4 step:
1. **Chọn collection method** — đặt recorder ở đâu, thế nào
2. **Design data format** — mỗi record chứa info gì
3. **Transmit + cache** — gửi record từ phone user an toàn lên server
4. **Clean + load** — sort data, bỏ duplicate + error, lưu DB
:::

---

## Step 1: Chọn collection method — đặt recorder ở đâu?

**Goal**: chọn cách record user op.

Vd: PM muốn biết "bao nhiêu user click buy button". Dev add logic record trong code button — mỗi click → ghi 1 record.

Lựa chọn: **chỉ đặt recorder chỗ quan trọng** (chỉ "buy", "register"), hay **mọi chỗ** (mọi click, swipe, dwell)?

<DataTrackingDemo tab="methods" />

**💡 3 method mainstream**

**Method 1: Code Tracking — manual precise**

Dev manually specify trong code: khi user op X → record.

Ẩn dụ: tại counter trà sữa có 1 người chuyên record "ai mua gì, bao nhiêu". Info detail + chính xác.

- *Lợi*: detail business info (coupon dùng, balance)
- *Cost*: thêm record point = code + test + release version mới, lâu

**Method 2: Visual Tracking — click circle record**

Không cần code. System cung cấp visual tool, marketer "circle" button/area trong app UI, system auto record.

Ẩn dụ: trên CCTV trà sữa, mouse circle "counter area", system auto đếm flow.

- *Lợi*: không cần dev, marketer tự config
- *Cost*: chỉ record "user click gì" UI, không record "order amount" business

**Method 3: Auto Tracking — auto record mọi thứ**

App nhúng SDK auto record mọi op: mỗi click, swipe, dwell.

Ẩn dụ: lắp camera mọi góc trà sữa, record mọi cử động.

- *Lợi*: không sót op nào
- *Cost*: data cực lớn, đa số vô dụng (vd user swipe vô thức), cần lọc-clean nhiều

**Tóm**: chọn method xong, app có capability "record user op".

**Vấn đề mới**: mỗi recorder format khác (có "userID", có "user_id", có không record) → không phân tích thống nhất được. Step sau: define format thống nhất.

---

## Step 2: Design data format — mỗi record chứa gì?

**Goal**: define "record template" thống nhất.

**Sao cần?** Tưởng 3 nhân viên trà sữa record sale: 1 ghi "An mua trà sữa trân châu 15k", 1 ghi "15k, sữa, trân châu", 1 ghi "trà sữa trân châu 1 ly". Cuối tháng tổng hợp = đau khổ.

<DataTrackingDemo tab="model" />

**💡 4W1H template**

Mỗi record trả lời 5 câu hỏi (4W1H):

**Who — ai làm?**
- User logged in: account ID (`user_id: "hoang123"`)
- Not logged in: device unique ID (phone device ID), để phân biệt "cùng phone"

**When — khi nào?**
Time chính xác đến ms. Detail: app có user oversea, 3 giờ Hà Nội ≠ 3 giờ NY (13h cách). Thống nhất convert sang **UTC**.

**Where & How — env nào?**
**Common attribute** — device + network env. Auto kèm với mọi record:
- Device model: iPhone 15 / Xiaomi 14
- Network: WiFi / 5G / 4G
- App version: v1.2.3
- OS: iOS 18 / Android 15

Value: bug chỉ trên 1 model → common attr giúp định vị nhanh.

**What — làm gì cụ thể?**
**Custom attribute** — business detail. Op khác → info khác:
- Click "Add to cart": product name, price, quantity
- Complete payment: order amount, payment method, coupon code

**Tóm**: qua 4W1H, mỗi op user → record format thống nhất (JSON).

**Vấn đề mới**: format thống nhất rồi, nhưng app traffic lớn (vd campaign, vài chục nghìn record/giây), phone không gửi từng cái (tốn pin + bandwidth + server crash). Step sau: design transmission khôn hơn.

---

## Step 3: Transmit + cache — gửi data an toàn lên server?

**Pre-condition**: mỗi op user đã thành JSON format thống nhất.

**Goal**: gửi data từ phone (browser) đáng tin tới server, dù network kém.

**Sao không gửi thẳng?** Mỗi record gửi network request = mỗi viết 1 thư chạy đến bưu điện. Tốt hơn: gom 1 batch gửi.

<DataTrackingDemo tab="pipeline" />

**💡 3 layer protection**

**Layer 1: gom batch (batching)**
SDK không gửi từng record, mà cache memory phone. Đủ batch (vd 30 record) hoặc đủ time (vd 5 giây) → pack batch, gửi 1 lần.

Như gửi nhiều món qua bưu điện chung. Phone giảm request → tiết kiệm pin + bandwidth.

**Layer 2: offline tolerance (local storage)**
User trong elevator, subway tunnel, no signal. Data chỉ memory → close app = mất.

SDK save data chưa gửi vào local storage (như cho thư vào ngăn kéo). Network có lại → auto resend. Short disconnect = không mất.

**Layer 3: server không sập (message queue)**
Data đến server không direct write DB. Sao? Peak campaign vài chục nghìn record/giây cùng lúc, DB process direct = crash.

Solution: thêm "buffer" trước DB — **Message Queue** (Kafka). Như taking ticket queue nhà hàng: peak khách (data) xếp hàng, bếp (DB) xử theo nhịp riêng, không bị spike crush.

**Tóm**: qua "batch → offline storage → MQ buffer", data đến server an toàn.

**Vấn đề mới**: offline reconnect auto resend → có thể duplicate. Không xử trực tiếp DB = duplicate (vd 100k order ghi 2 lần, sale ảo). Step sau: clean data.

---

## Step 4: Clean + load — bỏ "dirty data"

**Pre-condition**: data đến server qua pipeline.

**Goal**: trước khi vào DB chính, "health check" — bỏ duplicate, fix format sai.

Tech: **ETL** — 3 chữ viết tắt:
- **E**xtract: lấy từ MQ
- **T**ransform: check + fix format
- **L**oad: ghi clean data vào DB

<DataTrackingDemo tab="overview" />

**💡 2 action key**

**Action 1: Dedup — bỏ record duplicate**

Reconnect auto resend → duplicate. Xử thế nào?

Đơn giản: client pack data → cấp ID unique global cho mỗi record (`dedup_id`, như tracking number). Server lưu data → check ID đã có chưa — có = drop.

**Action 2: Validation + normalize — fix record không chuẩn**

App update version, code tracking khác bản:
- Old version `userId`, new `user_id`
- Timestamp bất thường (vd 1970)
- Value không nhận diện

Step này: viết rule transform unified — field name align, timestamp lỗi drop, unknown mark `unknown`.

**Tóm**: sau dedup + validation, data clean ghi **Data Warehouse** (DB chuyên store + analyze, vd ClickHouse, Hive). Data analyst dùng SQL query → result đáng tin.

---

## Full flow recap

| Step | Làm gì | Được gì | Còn vấn đề |
|------|----------|-----------|-------------|
| **1. Method** | Chọn cách record | App có khả năng record | Format không thống nhất |
| **2. Format** | 4W1H template | Mỗi record JSON chuẩn | Traffic lớn không gửi từng cái được |
| **3. Transmit** | Batch + offline + MQ | Data an toàn đến server | Retry → duplicate |
| **4. Clean** | Dedup + validation | ✅ Data clean vào DW | — |

---

## Kết

Khi user click 1 button, bề mặt là 1 action tức thời. Đằng sau là chain hoàn chỉnh:

1. Tracking code capture click, theo 4W1H gen record chuẩn
2. Record cache local, đủ batch gửi server
3. Server qua MQ nhận êm, dedup + validate
4. Cuối, data clean + chính xác ghi DW

**Tracking system** = biến hành vi scattered, invisible thành structured data queryable + analyzable. PM hiểu user thích feature nào, mất ở đâu; marketer eval campaign; dev định vị bug version nào.

"Collect → model → transmit → clean" = infrastructure cho data-driven decision.

::: tip 2026 cho VN dev
- **Tool**:
  - **PostHog** (open-source, all-in-one): tracking + analytics + feature flag + A/B
  - **Amplitude**: enterprise, mạnh nhất
  - **Mixpanel**: alternative Amplitude
  - **Segment**: data router, tracking 1 lần gửi nhiều destination
  - **Snowplow** (open-source): self-host data pipeline
- **VN context**: Tiki, Shopee, Grab dùng Amplitude/Mixpanel; startup thường PostHog
- **Privacy first 2026**: GDPR, VN Data Protection Decree → cần consent banner, anonymization, opt-out
- **AI tracking**: track user query LLM, prompt pattern, accept/reject AI suggestion (Cursor, Copilot làm này)
:::
