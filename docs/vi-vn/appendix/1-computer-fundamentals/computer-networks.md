# Browser là 1 hệ điều hành

::: tip Mở đầu
Bạn dùng browser hàng ngày — xem video, đọc tin, làm việc online. Nhưng có nghĩ: **khi gõ URL và Enter, đằng sau xảy ra gì?**

Bài này dùng ẩn dụ **"shopping online"** + quá trình kỹ thuật thật, từng bước hiểu browser biến URL thành page thế nào.

Đọc xong:
- Hiểu full flow từ nhập URL đến hiện page
- Nắm URL, DNS, TCP, HTTP
- Hiểu browser render thế nào
- Biết khác biệt static vs dynamic website

**Không cần background code**, chỉ cần kinh nghiệm shopping online.
:::

**Bạn sẽ học**: full flow kỹ thuật từ nhập URL đến hiện page. Foundation cho API, network security, debug "không vào được web", "load chậm".

| Chương | Nội dung |
|-----|------|
| **1** | URL parsing |
| **2** | DNS query |
| **3** | TCP handshake |
| **4** | HTTP communication |
| **5** | Browser rendering |
| **6** | Static vs Dynamic |

---

## 0. Khi bạn Enter, khoảnh khắc đó

::: tip 🤔 Core
**Khi gõ URL và Enter, background xảy ra gì?** Sao có page nhanh có chậm? Sao thỉnh thoảng "không tìm thấy server"?
:::

### Ẩn dụ: chuyến shopping online

Tưởng shopping online, chia 5 step:

1. **🛒 Điền order**: chọn hàng, confirm địa chỉ
2. **🗺️ Tìm kho**: hệ thống tìm kho cụ thể
3. **📞 Lập kênh**: confirm kho mở + gửi được
4. **🚚 Kho gửi**: shipper giao tới nhà
5. **🎁 Mở hàng**: thấy sản phẩm

**Truy cập web tương đồng đến kinh ngạc!**

Khi gõ `google.com` Enter, bạn là "khách", browser qua loạt operation, đưa "hàng" (web content) từ server xa lên màn hình bạn.

<UrlToBrowserQuickStart />

::: info 💡 Insight
Hiểu browser = **map quá trình kỹ thuật vào scenario đời thường**. 5 step shopping = 5 stage browser truy cập web.
:::

---

## 1. Step 1: Điền "order" — URL parsing

::: tip 🤔 Core
**Sao URL viết như vậy?** `https://www.example.com:8080/path/page.html?id=123#section` — chuỗi này nghĩa gì?
:::

### Ẩn dụ: điền phiếu shopping

Nếu phiếu chỉ ghi "mua giày", kho không biết giày nào. Phải:
- **Loại shop** (official / thường)
- **Tên shop** (Nike official)
- **Vị trí hàng** (giày nam / running series)
- **Model cụ thể** (Air Max 90)
- **Note** (màu đỏ)

### Quá trình: browser parse URL

**URL (Uniform Resource Locator)** = "code định vị hàng" trong browser. Gõ `https://www.example.com:8080/path/page.html?id=123#section`, browser cắt:

| Phần URL | Vd | Ẩn dụ | Vai trò |
| -------- | ---- | -------------- | -------- |
| **Protocol** `https://` | Secure HTTP | Phương thức giao (an toàn vs thường) | Rule communicate |
| **Domain** `www.example.com` | Tên server cho người | Tên shop | Tìm server, sẽ convert IP |
| **Port** `:8080` | "Số quầy" | Quầy số 3 (default không ghi) | 1 server nhiều service, port chọn. HTTP=80, HTTPS=443 |
| **Path** `/path/page.html` | Vị trí file server | Kệ hàng / hàng 3 | Chỉ resource cụ thể |
| **Query** `?id=123` | Param thêm | Note order: đỏ, XL | Data extra gửi server |
| **Anchor** `#section` | Vị trí trong page | Trang 5 của hướng dẫn | Scroll page, không gửi server |

<UrlParserDemo />

::: info 💡 Key
URL tồn tại để **người** nhớ + gõ. Máy cần **IP address** (như shipper cuối cùng cần địa chỉ kho cụ thể).
:::

---

## 2. Step 2: Tra "danh bạ" — DNS query

::: tip 🤔 Core
**Sao browser tìm được website?** Bạn gõ domain (vd `google.com`), máy cần IP (số). Ở giữa xảy ra gì?
:::

### Ẩn dụ: tra địa chỉ kho

Order ghi "Nike official", logistic không biết kho đâu. Phải tra:

1. **Địa chỉ thường dùng** (gần đây mua chưa?) → browser cache
2. **Bưu cục khu** (biết phân bổ vùng) → local DNS server
3. **Trung tâm điều phối** (biết shop `.com` quản ai) → root DNS server
4. **Brand management** (cuối tìm kho Nike thật) → authoritative DNS server

### Quá trình: DNS phân tầng query

**DNS (Domain Name System)** = "hệ thống danh bạ phân tán" của Internet. Vì có hàng tỷ domain, phân tầng để phân tán tải:

```
Bạn (browser)
   ↓ Hỏi: IP của google.com?
Local DNS server (ISP, vd Viettel/VNPT)
   ↓ Hỏi: .com ai quản?
Root DNS server (13 cụm root toàn cầu)
   ↓ Bảo: hỏi quản .com
TLD server (Verisign quản .com)
   ↓ Bảo: hỏi quản google.com
Authoritative DNS (DNS riêng của Google)
   ↓ Bảo: google.com IP là 142.250.80.46
Return IP về browser
```

**Loại query**:
- **Recursive**: browser gửi 1 request, local DNS lo query tầng
- **Iterative**: mỗi tầng bảo tầng sau hỏi đâu, browser query nhiều lần
- **Cache**: kết quả cache, lần sau trả ngay, accelerate

<DnsLookupDemo />

::: info 💡 Sao nhiều tầng?
Nếu cả thế giới 1 danh bạ, hàng tỷ người query cùng lúc → sập. Phân tầng = mỗi tầng quản "khu vực" của mình, hiệu quả + đáng tin.

Đây là idea core của Internet: **distributed system**.
:::

---

## 3. Step 3: Gọi confirm — TCP 3-way handshake

::: tip 🤔 Core
**Sao cần "3 lần bắt tay"?** Có IP rồi, sao không gửi data thẳng? Sao phải communicate 3 lần?
:::

### Ẩn dụ: lập kênh logistic

Nếu xe logistic đến thẳng kho:
- Kho đóng → đi không
- Kho hết hàng → không gửi
- Không tìm cửa hàng → không tiếp được

**Trước khi gửi thật, phải lập kênh đáng tin.**

### Quá trình: TCP 3-way handshake

**TCP (Transmission Control Protocol)** = rule đảm bảo data đáng tin. Trước gửi data, phải "3-way handshake":

```
Client (PC bạn)              Server (kho shop)
   |                            |
   |--- SYN=1 ----------------->|  Lần 1: hi, tôi ở nhà, sẵn sàng nhận (SYN)
   |                            |
   |<-- SYN=1, ACK=1 -----------|  Lần 2: OK! tôi sẵn sàng gửi, bạn ở nhà chứ? (SYN-ACK)
   |                            |
   |--- ACK=1 ----------------->|  Lần 3: Có! gửi đi (ACK)
   |                            |
   ===== Kênh lập, gửi! =====
```

**Sao 3 lần, không 2?**
- **Lần 1 (SYN)**: client chứng minh gửi được
- **Lần 2 (SYN-ACK)**: server chứng minh nhận + gửi được
- **Lần 3 (ACK)**: client chứng minh nhận được

3-way đảm bảo: **2 bên đều gửi + nhận được** — đủ 4 điều kiện mới transmit đáng tin.

**TCP còn**:
- **Packetization**: data lớn cắt nhỏ
- **Reorder**: assemble đúng thứ tự
- **Retransmit**: mất gói tự gửi lại
- **Flow control**: điều chỉnh speed theo network

<TcpHandshakeDemo />

> **HTTPS extra**: nếu HTTPS, sau TCP còn **TLS handshake** (1-RTT hoặc 2-RTT), 2 bên trao đổi key encrypt, đảm bảo nội dung chỉ 2 bên hiểu.

---

## 4. Step 4: Đối thoại buyer-seller — HTTP request + response

::: tip 🤔 Core
**Browser + server nói gì?** Kết nối lập rồi, browser "bảo" server muốn gì? Server "trả lời" thế nào?
:::

### Ẩn dụ: kho gửi hàng

Xe logistic đến kho: "Đây là order (HTTP request), **tôi lấy hàng (web HTML source code)!**"
Quản kho check: "Order hợp lệ, đây gói hàng (**HTML file**)."

### Quá trình: HTTP communication

**HTTP (HyperText Transfer Protocol)** = "rule đối thoại" browser-server. Kênh lập xong, browser send **request lấy hàng**, mục tiêu lấy source code page (HTML file):

**HTTP request ví dụ**:

```http
GET /index.html HTTP/1.1          ← method + path + version
Host: www.example.com             ← target host (virtual hosting)
User-Agent: Chrome/120.0          ← client ID
Accept: text/html                 ← format chấp nhận
Accept-Language: vi-VN,vi;q=0.9   ← ngôn ngữ ưa
Accept-Encoding: gzip, deflate    ← compress format
Connection: keep-alive            ← giữ connection
Cookie: session_id=abc123         ← identity credential
```

::: tip 💡 Insight dev: đây chẳng phải API à?
**Y chang!** API call bạn viết (`fetch` / `axios`) và browser truy cập web, **ở tầng HTTP hoàn toàn cùng 1 thứ**.

Đều send request, server return text.
- Server gửi **HTML** → browser **vẽ** (thành page)
- Server gửi **JSON** → code bạn **lưu** (xử logic)

**Không có "2 loại" request, chỉ 1 loại HTTP request, khác mỗi data format (Content-Type).**

Đây là sao hiểu HTTP = hiểu 90% backend API.

Muốn sâu API: xem [API Intro](./api-intro.md).
:::

**Common HTTP method**:
- `GET`: lấy resource (an toàn, idempotent, cacheable)
- `POST`: submit data (tạo resource: register, login)
- `PUT`: update (replace)
- `PATCH`: update 1 phần
- `DELETE`: xoá
- `HEAD`: lấy header (không body)

**Server return HTTP response**:

```http
HTTP/1.1 200 OK                   ← version + status + desc
Date: Mon, 23 May 2026 12:00:00 GMT  ← server time
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Cache-Control: max-age=3600
Set-Cookie: user_id=xyz789

<!DOCTYPE html>...                ← response body
```

**Status code**:

| Code | Loại | Nghĩa | Ẩn dụ |
| --- | --- | --- | --- |
| **200** | Success | Request OK | "Order confirm, gửi ngay" |
| **301/302** | Redirect | Resource đã chuyển | "Shop chuyển nhà, đến shop mới" |
| **304** | Not modified | Cache còn valid | "Cái cũ còn dùng được, không cần gửi lại" |
| **400** | Client error | Format sai | "Order viết mơ hồ, không hiểu" |
| **401** | Unauthorized | Cần auth | "Show thẻ thành viên trước" |
| **403** | Forbidden | Không quyền | "Nội bộ cấm vào" |
| **404** | Not found | Resource không tồn tại | "Kho không có hàng đó" |
| **500** | Server error | Server crash | "Kho cháy, tạm không gửi được" |
| **502** | Bad gateway | Upstream không respond | "Kho tổng hết, kho chi không điều được" |
| **503** | Unavailable | Server quá tải | "Đang bão order, ngừng nhận" |

<HttpExchangeDemo />

---

## 5. Step 5: Mở "gói hàng" — Browser render

::: tip 🤔 Core
**Code thành hình ảnh thế nào?** Server gửi HTML/CSS/JS khô khan, browser biến thành web đẹp thế nào?
:::

### Ẩn dụ: mở thùng + lắp ráp

Bạn nhận gói (HTTP response), mở ra không phải hàng sẵn, mà **linh kiện** (HTML) + **hướng dẫn lắp** (CSS). Là "khách" (browser), phải tự lắp:

1. **Mở gói**: lấy linh kiện, check list (parse HTML → DOM tree)
2. **Đọc hướng dẫn**: hiểu linh kiện nào lắp đâu, màu gì (parse CSS → CSSOM tree)
3. **Phân loại**: chọn linh kiện cần lắp, vứt foam (`display: none`) (build render tree)
4. **Đo vị trí**: dùng thước đo phòng, định vị từng đồ (layout/reflow)
5. **Tô màu**: sơn, dán nhãn (paint)
6. **Hoàn thiện**: dọn, bật đèn (composite)

### Quá trình: render engine

Browser nhận **HTML/CSS/JS code** (text khô), biến thành **pixel image** (web đẹp). Gọi **rendering**, render engine (Chrome=Blink, Safari=WebKit) thực thi.

#### Step 1: Parse HTML → DOM tree (list linh kiện)

Browser đọc HTML byte stream, parse thành **DOM (Document Object Model) tree**:

```html
<div class="header">Title</div>
<div class="content">Content</div>
```

```text
DOM tree:
Document
 └─ html
     └─ body
         ├─ div.header ("Title")
         └─ div.content ("Content")
```

#### Step 2: Parse CSS → CSSOM tree (hướng dẫn)

Parse CSS (inline + external), build **CSSOM tree**:

```css
.header { color: blue; font-size: 24px; }
.content { display: none; }
```

#### Step 3: Merge → Render tree (chuẩn bị lắp)

DOM + CSSOM = **Render Tree**.
Key: **chỉ "visible" element trong render tree**.
- `.header`: trong (visible)
- `.content`: **không trong** (vì `display: none`)

#### Step 4: Layout (Reflow) — đo kích thước

Tính **toạ độ + size chính xác** mỗi node:
- "Header box rộng 100px, cao 50px, ở (0,0)"
- Gọi **Reflow**. Đổi window size (xoay phone) → mọi element re-calculate, tốn performance.

#### Step 5: Paint — tô màu

Có vị trí, fill pixel: background, text color, border, shadow.

#### Step 6: Composite — hoàn thiện

Browser hiện đại chia **Layers** vẽ riêng (3D transform, scroll bar riêng layer), GPU stack lại như Photoshop.

<BrowserRenderingDemo />

::: info 💡 Bạn có biết?
**Layout + Paint** là lúc browser bận nhất. Element nhiều + structure phức tạp → mất nhiều thời gian. Đó là sao 1 số web phức tạp lag khi load.
:::

---

## 5.5 Web "sinh ra" thế nào? Static vs Dynamic

::: tip 🤔 Core
**Content web từ đâu?** Trước nói browser render thế nào, nhưng HTML file trên server từ đâu ra? Làm sẵn hay làm khi cần?
:::

Đáp án: **2 cách**, đây là khác biệt static vs dynamic.

### Static: làm sẵn, đưa thẳng

Vào siêu thị mua bánh quy. Bánh quy đã sản xuất sẵn, lấy đi, không chờ.

**Static site** = "thành phẩm". Web đã sẵn trên server, bạn truy cập → server gửi thẳng HTML, không xử thêm.

**Đặc điểm**:
- ✅ Speed nhanh (server gửi file, không tính)
- ✅ Đơn giản (viết HTML xong dùng)
- ✅ Tải lớn (CDN distribute, bao nhiêu người cũng ok)
- ❌ Khó update (đổi content = re-generate)

**Vd**: company intro, product doc, help center, personal blog.

### Dynamic: order rồi làm, mỗi lần khác

Vào nhà hàng order. Đầu bếp làm theo order, gọi gà xào không lên cá kho.

**Dynamic site** = "làm tại chỗ". Server nhận request → query DB, tính, generate HTML mới gửi bạn.

**Đặc điểm**:
- ✅ Realtime (giỏ hàng inventory mới nhất, tin tức cập nhật)
- ✅ Personalized (login thấy info riêng)
- ✅ Mạnh (search, comment, recommend, payment)
- ❌ Chậm hơn (server cần tính)
- ❌ Server áp lực lớn (nhiều người = xếp hàng)

**Vd**: Shopee, MoMo, online banking, Google Docs.

**Cần server?** Dynamic cần "backend" generate content, nhưng dạng đa dạng:
- **Server truyền thống**: tự thuê VPS (DigitalOcean, AWS EC2)
- **Serverless**: cloud vendor run code (AWS Lambda, Cloudflare Workers)
- **3rd party API**: payment Stripe, weather từ API riêng

::: tip 💡 Kết hợp
Nhiều site "hybrid": main static, 1 phần (comment, search) dynamic load. JS sau page load gọi API lấy data → "static page + dynamic function".
:::

### 📊 Static vs Dynamic

| | Static | Dynamic |
|---|---------|---------|
| **Sinh ra thế nào** | Làm sẵn, lưu server | Truy cập mới làm |
| **Như gì** | Hàng kệ siêu thị | Món order nhà hàng |
| **Speed** | Nhanh | Chậm (cần tính) |
| **Đổi content** | Khó (re-generate) | Dễ (admin sửa) |
| **Hợp gì** | Display (intro, doc) | Interaction (shopping, social) |
| **Vd** | Company site, doc | Shopee, MoMo, banking |

### 🤔 FAQ

**Q: Static site có JS được không?**
Tất nhiên! Carousel, dropdown, form validation — static dùng JS được. "Static/dynamic" = **content có làm sẵn không**, khác với có interactive không.

**Q: Dynamic phải tự thuê server?**
Không. Ngoài server thường, có Serverless (cloud function), hoặc gọi 3rd party API. Trend: "tránh quản server" — static + JS gọi API, vừa nhanh vừa rẻ.

::: tip 💡 Quan trọng
Cho dù static hay dynamic, **nguyên lý browser render giống nhau**! Server gửi gì, browser render đó. Khác:
- Static: server gửi "thành phẩm"
- Dynamic: server gửi "vừa làm"

FE dev tập trung browser xử input thế nào, không phải server generate ra sao.
:::

---

## 6. Tổng kết: 1 chuyến "shopping" hoàn chỉnh

::: tip 🎉 Học xong
- Giải thích full flow nhập URL → hiện page
- Hiểu URL, DNS, TCP, HTTP
- Biết browser render thế nào
- Phân biệt static vs dynamic
- Dùng ẩn dụ đời thường giải thích cho người khác
:::

Recap:

| Stage | Tech | Ẩn dụ | Task | Key tech |
| ----- | ---- | ----- | ---- | -------- |
| **1. Parse** | URL parse | Điền order | Hiểu buyer muốn gì | Protocol, domain, port, path, param |
| **2. Query** | DNS query | Tra địa chỉ kho | Tìm kho gửi của shop | Recursive/iterative, cache |
| **3. Connect** | TCP handshake | Lập kênh | Đảm bảo logistic thông | 3-way, seq, flow control |
| **4. Talk** | HTTP exchange | Kho gửi | Submit order + nhận hàng | Method, status code, header |
| **5. Display** | Browser render | Mở thùng + lắp | Hiển thị hàng | DOM, CSSOM, render tree, layout, paint |

**Cả quá trình thường vài trăm ms** — không tin nổi!

Browser trong <1 giây:
- Parse URL phức tạp
- Query DNS server toàn cầu
- Establish reliable connection với server xa
- Full HTTP đối thoại
- Biến code khô thành page đẹp

Đây là vẻ đẹp Internet: **tech phức tạp, trải nghiệm đơn giản**.

::: info 💡 Advanced
- **API dev**: [API Intro](./api-intro.md)
- **FE performance**: [Frontend performance](../3-browser-and-frontend/web-performance.md)
- **Browser rendering**: [Browser rendering pipeline](../3-browser-and-frontend/browser-as-os-rendering.md)
:::

---

## 7. Glossary

| Tên | Full | Giải thích |
| --- | ---- | ---------- |
| **URL** | Uniform Resource Locator | "Địa chỉ" web, browser tìm resource |
| **DNS** | Domain Name System | "Danh bạ" Internet, convert domain → IP |
| **IP** | Internet Protocol Address | "Số nhà" duy nhất mỗi device, vd `192.168.1.1` |
| **TCP** | Transmission Control Protocol | Rule đảm bảo transmit đáng tin, 3-way handshake |
| **HTTP** | HyperText Transfer Protocol | Rule đối thoại browser-server |
| **HTTPS** | HTTP Secure | HTTP + encrypt (TLS/SSL) |
| **HTML** | HyperText Markup Language | "Khung xương" web |
| **CSS** | Cascading Style Sheets | "Da" web |
| **DOM** | Document Object Model | Tree structure browser convert từ HTML |
| **CSSOM** | CSS Object Model | Tree structure từ CSS |
| **Render** | — | Biến code thành pixel màn hình |
| **RTT** | Round Trip Time | Time đi-về của packet, ảnh hưởng load speed |

---

::: tip 🎓 Chúc mừng
Lần sau gõ URL + Enter, bạn đã thấy thế giới digital bận rộn đằng sau màn hình.

Bạn hiểu:
- Sao web đôi khi không vào được (DNS fail, server down)
- Sao web có nhanh có chậm (network latency, server perf, page complexity)
- Browser biến code thành image thế nào (render pipeline)

**Đây là giá trị hiểu nguyên lý** — gặp vấn đề biết tìm nguyên nhân ở đâu.
:::

::: tip 2026 update
- **HTTP/3 + QUIC**: chạy trên UDP, 0-RTT, mobile mượt hơn
- **DNS-over-HTTPS (DoH)**: encrypt DNS query, privacy
- **Server-Sent Events (SSE)** + **WebSocket**: realtime, thay polling
- **Edge computing**: Cloudflare Workers, Vercel Edge, render gần user
- **AI in browser**: Chrome Built-in AI (Gemini Nano), local LLM inference
- **VN dev**: hiểu HTTP method + status code = không vẽ API ngớ ngẩn (DELETE GET, POST cho query...)
:::
