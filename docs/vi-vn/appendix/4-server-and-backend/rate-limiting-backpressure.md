# Rate Limiting + Backpressure Control

::: tip Mở đầu
**Khuyến mãi 12.12 lúc 00:00, vài triệu user đổ vào — server chịu nổi?** Mọi system có giới hạn. Khi request vượt capacity, không control → ai cũng không dùng được. Rate limiting + backpressure = 2 hàng phòng thủ chống system bị "đè bẹp".
:::

**Bạn sẽ học**:
- **Sao cần limit**: chủ động reject để bảo vệ system
- **Algorithm**: token bucket, leaky bucket, sliding window
- **Backpressure**: khi upstream nhanh hơn downstream
- **Multi-layer**: client → gateway → service
- **Selection**: scenario nào dùng strategy nào

| Chương | Nội dung |
|-----|------|
| **1** | Sao cần rate limit |
| **2** | Algorithms |
| **3** | Backpressure |
| **4** | Multi-layer architecture |
| **5** | Thực chiến + selection |

---

## 0. Toàn cảnh: sao "reject" user?

Nghe phi trực giác — không phải nên serve mọi user à? Nhưng thực tế: **không reject 1 phần → tất cả request fail**.

Tưởng nhà hàng 100 chỗ, đột nhiên 1000 người tới. Không limit → 1000 người không phải đều ăn được, mà bếp crash, phục vụ liệt, 1000 người không ai ăn. Cách đúng: limit ở cửa, 100 vào trước, còn lại chờ.

::: tip Mục tiêu rate limit
- **Bảo vệ system**: phòng overload gây service hoàn toàn không dùng
- **Phân phối công bằng**: đảm bảo request đã accept xử bình thường
- **Graceful degradation**: request bị limit nhận `429` rõ ràng, không timeout hoặc 500
:::

---

## 1. Algorithms: 3 plan kinh điển

Vấn đề: **trong unit time, max bao nhiêu request được qua?** Algorithm khác về precision, xử burst, complexity.

<RateLimitAlgorithmDemo />

| Algorithm | Nguyên lý | Burst | Precision | Complexity |
|------|------|---------|--------|-----------|
| Token bucket | Tốc độ cố định cấp token, request consume token | Cho phép (có dự trữ) | Cao | Trung |
| Leaky bucket | Request xếp hàng, tốc độ cố định xử | Không cho phép (smooth) | Cao | Trung |
| Sliding window | Đếm request trong window | 1 phần cho phép | Khá cao | Thấp |
| Fixed window | Đếm theo time window | Boundary có thể burst | Thấp | Thấp nhất |

::: tip Chọn algorithm?
- **API limit**: token bucket hay nhất, cho phép burst hợp lý
- **Traffic shaping**: leaky bucket hợp output rate constant
- **Simple count**: sliding window đơn giản, hợp đa số web app
:::

---

## 2. Backpressure: khi upstream nhanh hơn downstream

Rate limit giải "external request quá nhiều", **backpressure** giải "internal component speed không match".

Khi producer sinh data nhanh hơn consumer xử liên tục, buffer giữa tăng vô hạn → OOM hoặc mất data. Backpressure = consumer "reverse notify" producer chậm lại.

<BackpressureDemo />

::: tip 4 strategy
1. **Drop**: buffer đầy drop new/old data, hợp realtime cao nhưng cho phép mất
2. **Block**: producer pause, đợi consumer xử xong, hợp data không mất được
3. **Sample**: chỉ xử 1 phần, hợp data stream tần số cao
4. **Scale**: dynamic tăng consumer, hợp cloud-native
:::

---

## 3. Multi-layer rate limiting

Production cần **multi-layer protection**, mỗi layer xử granularity khác.

| Layer | Vị trí | Granularity | Tool |
|------|------|---------|------|
| Client | FE/App | Button debounce, request throttle | lodash.throttle, debounce |
| CDN/WAF | Edge | IP, region | Cloudflare Rate Limiting |
| API gateway | Entry | Route, user | Nginx limit_req, Kong |
| Server | App nội bộ | API, resource | Sentinel, Resilience4j |
| DB | Storage | Connection, QPS | Connection pool, slow query circuit break |

::: tip HTTP spec
Request bị limit return `429 Too Many Requests` + headers:
- `Retry-After`: thời gian retry (giây hoặc date)
- `X-RateLimit-Limit`: limit max
- `X-RateLimit-Remaining`: quota còn
- `X-RateLimit-Reset`: time reset quota
:::

---

## 4. Selection thực

| Scenario | Recommend | Note |
|------|---------|------|
| Nginx entry limit | `limit_req_zone` | Leaky bucket, config đơn giản |
| Distributed limit | Redis + Lua | Token bucket / sliding window, share count |
| Java microservice | Sentinel / Resilience4j | Hỗ trợ circuit, degradation, hot limit |
| Node.js API | express-rate-limit | Đơn giản, Redis support |
| Go service | golang.org/x/time/rate | Stdlib token bucket |

---

## Tổng kết

Rate limit + backpressure = 2 hàng phòng thủ stability.

1. **Sao cần**: không reject 1 phần → tất cả fail
2. **3 algorithm core**: token bucket (burst), leaky bucket (smooth), sliding window (đơn giản)
3. **Backpressure**: drop, block, sample, scale
4. **Multi-layer**: client → DB
5. **429 spec**: status code + headers chuẩn

::: tip 2026 cho VN dev
- **Cloudflare Workers**: edge rate limiting, geo-based, bot detection
- **Upstash Ratelimit**: serverless Redis-based, dễ dùng Next.js/Vercel
- **AI API rate limit**: OpenAI/Anthropic có rate limit theo TPM (token/min) + RPM
- **VN scenario**: protect API auth (login brute-force), payment endpoint, AI inference
- **VN-friendly tools**: BunnyCDN, Cloudflare APAC PoP
:::

## Tài liệu

- [Stripe Rate Limiters](https://stripe.com/blog/rate-limiters)
- [Nginx limit_req](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html)
- [Alibaba Sentinel](https://sentinelguard.io/)
- [Resilience4j](https://resilience4j.readme.io/)
