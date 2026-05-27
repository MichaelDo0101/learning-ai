# Hành trình hoàn chỉnh của 1 Request

::: tip Mở đầu
**Khi gõ URL Enter, đến page hiển thị, ở giữa xảy ra gì?** Câu hỏi phỏng vấn kinh điển, cũng là chìa khoá hiểu Web architecture toàn bộ. Hiểu chain này = hiểu FE, BE, network, DB phối hợp thế nào.
:::

**Bạn sẽ học**:
- **Full-chain view**: 1 HTTP request từ gửi → return
- **Layer responsibility**: DNS, TCP, load balancer, web server, app server, DB
- **Debug skill**: request chậm/fail → biết bắt đầu từ layer nào
- **Optimization**: mỗi layer có chỗ optimize

| Chương | Nội dung |
|-----|------|
| **1** | Browser gửi request |
| **2** | Network transmission |
| **3** | Server processing |
| **4** | Response return |
| **5** | Full-chain optimization |

---

## 0. Toàn cảnh

Ẩn dụ: order sách online — giống HTTP request kinh ngạc.

| Stage | Order sách | Tech |
|---------|---------|---------|
| Gõ URL | "Tôi đến tiệm sách X" | Browser parse URL |
| DNS | Tra map tìm địa chỉ tiệm | Domain → IP |
| TCP | Đi đến cửa, mở cửa | 3-way handshake |
| Send request | "Tôi muốn cuốn xxx" | HTTP request |
| Server xử | Nhân viên tìm sách, check kho, tính giá | App logic + DB query |
| Response | Nhân viên đưa sách | HTTP response |
| Render | Bạn mở sách đọc | HTML/CSS/JS parse render |

<RequestJourneyFlow />

---

## 1. Browser gửi request

### 1.1 URL parse

URL `https://api.example.com/books?id=123`:

| Phần | Value | Nghĩa |
|-----|-----|------|
| Protocol | `https` | Encrypted |
| Domain | `api.example.com` | Server "name" |
| Path | `/books` | Resource |
| Query | `id=123` | Param |

### 1.2 DNS resolution

Máy không hiểu domain, chỉ IP (`93.184.216.34`). DNS = "danh bạ" Internet.

```
Browser cache → System cache → Router cache → ISP DNS → Root DNS
     ↓ Hit là dùng, miss query xuống
```

::: tip Sao cache DNS?
Nếu mỗi request query từ root, Internet sập. Mỗi layer cache → đa số request resolve ở browser/system.
:::

### 1.3 TCP 3-way handshake

```
Client → Server: Hi, muốn connect (SYN)
Server → Client: OK, sẵn sàng (SYN + ACK)
Client → Server: Nhận, bắt đầu (ACK)
```

HTTPS thêm TLS handshake để negotiate encryption.

### 1.4 Send HTTP request

```http
GET /books?id=123 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGci...
User-Agent: Chrome/120.0
```

---

## 2. Network transmission

### 2.1 Router forwarding

Request rời máy → qua nhiều router (như giao hàng qua nhiều trạm trung chuyển):

```
PC bạn → Router gia đình → ISP network → Backbone → Target datacenter
```

Mỗi router theo IP quyết "next hop". `traceroute` xem node nào request qua.

### 2.2 CDN

Nếu target dùng CDN:

| Scenario | Đi |
|-----|------|
| Static (image, CSS, JS) | Edge node trả trực tiếp |
| Dynamic (API) | Xuyên CDN, đến origin |

CDN = "đưa content gần user nhất".

### 2.3 Load balancer

Site lớn không 1 server. Load balancer chia request:

```
Request → LB → Server A (30%)
              → Server B (30%)
              → Server C (40%)
```

| Strategy | Nguyên lý | Use |
|-----|------|---------|
| Round robin | Theo thứ tự | Server giống nhau |
| Weighted | Theo weight | Server khác |
| IP hash | Cùng user → cùng server | Cần session sticky |
| Least connection | Server connection ít nhất | Time xử khác nhau |

---

## 3. Server processing

### 3.1 Web server (Nginx/Apache)

| Trách nhiệm | Note |
|-----|------|
| Static file | Trả HTML, CSS, JS, image |
| Reverse proxy | Forward API request tới backend |
| SSL termination | Xử HTTPS encryption |
| Filter | Block malicious, rate limit |

### 3.2 App server

Web server forward → app server (Node.js, Spring, Django):

```
Request → Middleware chain → Route match → Controller → Service → Data access
```

**Middleware**:
1. Parse body (JSON, form)
2. Verify auth (check Token)
3. Check permission
4. Log

### 3.3 DB query

Đa số request cuối đến DB:

```
App: SELECT * FROM books WHERE id = 123
    ↓
DB: parse SQL → query optimize → execution plan → read data
    ↓
Return: { id: 123, title: "xxx", price: 59.9 }
```

::: tip DB = bottleneck phổ biến nhất
Network thường ms, app logic nhanh, nhưng DB query không index có thể vài giây - vài chục. Slow request 90% là DB chậm.
:::

---

## 4. Response return

### 4.1 Construct HTTP response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip
Cache-Control: max-age=3600

{"id": 123, "title": "xxx", "price": 59.9}
```

### 4.2 Compression

Server gzip/brotli compress body:

| Algorithm | Ratio | Speed |
|---------|--------|------|
| gzip | ~70% | Nhanh |
| brotli | ~80% | Chậm hơn, compress tốt hơn |

100KB JSON → 20-30KB sau compress.

### 4.3 Browser render

1. Parse HTML → DOM tree
2. Parse CSS → CSSOM
3. Merge → render tree
4. Layout
5. Paint

<RequestTimeline />

---

## 5. Full-chain optimization

### 5.1 Mỗi layer optimize

| Layer | Optimization | Effect |
|-----|---------|------|
| DNS | DNS prefetch, fast DNS | Giảm time DNS |
| Network | CDN, HTTP/2, connection reuse | Giảm latency |
| Server | Cache (Redis), async | Giảm processing time |
| DB | Index, query optimize, read-write split | Giảm query time |
| FE | Lazy load, code split, compress | Giảm render time |

### 5.2 Cache: optimization hiệu quả nhất

Cache mỗi layer:

```
Browser cache → CDN cache → Reverse proxy cache → App cache (Redis) → DB cache
```

::: tip Bản chất cache
Đổi space lấy time. Lưu kết quả tính, lần sau dùng trực tiếp. Cache hit rate tăng 10% → perf có thể tăng vài lần.
:::

### 5.3 Debug request fail

| Hiện tượng | Layer có thể | Debug |
|-----|------------|---------|
| Hoàn toàn no response | DNS / network | ping, nslookup |
| Connection timeout | Network / server down | telnet, curl |
| 4xx | Client request sai | Check URL, param, Token |
| 5xx | Server error | Xem server log |
| Response chậm | DB / app logic | Slow query log, APM tool |

---

## Tổng kết

1. **Browser**: parse URL → DNS → TCP → send request
2. **Network**: routing → CDN → load balance
3. **Server**: web server → middleware → business → DB
4. **Return**: response → compress → network → browser render

::: tip Giá trị hiểu full-chain
Vẽ chain trong đầu → gặp vấn đề biết tầng nào. Đây là cú nhảy từ "junior dev" → "tự debug được".
:::

::: tip 2026 cho VN dev
- **APM tool**: Datadog, New Relic, Sentry Performance
- **Tracing**: OpenTelemetry (chuẩn cross-tool)
- **Edge compute**: Cloudflare Workers, Vercel Edge → cut latency với user toàn cầu
- **VN context**: latency từ VN → US ~200ms, → SG ~50ms → chọn region gần
- **AI inference**: thường là bottleneck mới (LLM call 1-5s), cần cache + queue
:::

## Tài liệu

- [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [High Performance Browser Networking](https://hpbn.co/)
- [What happens when...](https://github.com/alex/what-happens-when)
