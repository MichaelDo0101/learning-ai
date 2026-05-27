# System Design Methodology

::: tip Mở đầu
**System design không phải vẽ architecture diagram tuỳ tiện, mà set methodology có rule.** Dù interview hay work thật, đều theo similar framework: hiểu vấn đề → estimate scale → design → optimize sâu.
:::

**Bạn sẽ học**:
- **Flow design**: framework 4-step
- **Capacity estimation**: "back-of-envelope"
- **Common patterns**: cache, sharding, MQ, CDN
- **Trade-off thinking**: tư duy đánh đổi
- **Real cases**: short link, feed, flash sale

| Chương | Nội dung |
|-----|------|
| **1** | 4-step framework |
| **2** | Capacity estimation |
| **3** | Core design patterns |
| **4** | Trade-off thinking |
| **5** | Classic cases |

---

## 1. 4-step framework

System design không nhảy thẳng vẽ diagram. Theo structured flow.

<SystemDesignStepsDemo />

::: tip Sao clarify requirement trước?
Nhiều người nhận đề → vẽ ngay → "đúng nhưng không phải cái interviewer muốn". Bỏ 5 phút clarify = tránh 30 phút làm lại.

Câu clarify common:
- Core function là gì? (đừng design hết)
- User scale bao nhiêu? (quyết distributed không)
- Read/write ratio? (quyết cache strategy)
- Data giữ bao lâu? (quyết storage)
:::

---

## 2. Capacity estimation: nghệ thuật back-of-envelope

**Back-of-envelope estimation** = skill core. Không cần chính xác, chỉ cần order of magnitude.

<CapacityEstimationDemo />

### Conversion cheatsheet

| Order | Conversion | Memory trick |
|------|------|---------|
| 1 day | 86,400s | ≈ 100k giây |
| 100M req/day | ≈ 1,200 QPS | Chia 100k |
| 1KB × 100M | ≈ 100GB | 100M small record |
| 1MB × 1M | ≈ 1TB | 1M ảnh |

### 80/20 rule trong estimation

Đa số system theo 80/20: 20% data carry 80% request:

- **Cache size** ≈ total data × 20%
- **Hot QPS** ≈ total QPS × 80% concentrate vào 20% key
- **Cache hit rate** target ≈ 80%+ (thấp hơn = strategy có vấn đề)

---

## 3. Core design patterns

Patterns lặp đi lặp lại trong system design. Master = handle đa số scenario.

### 3.1 Cache patterns

| Pattern | Read | Write | Use |
|------|--------|--------|---------|
| Cache-Aside | Query cache, miss → DB + refill | Write DB, delete cache | Most common |
| Read-Through | Cache auto load từ DB | Same Cache-Aside | Cần framework support |
| Write-Behind | Same Cache-Aside | Write cache, async DB | Write-heavy, accept loss |

::: tip Sao "delete cache" không "update cache"?
Update cache trong concurrent dễ inconsistent: thread A + B cùng update, A write DB trước nhưng B update cache trước → cache = B's old value. Delete cache = next read load fresh từ DB, tránh issue này native.
:::

### 3.2 Sharding

Khi single table > triệu row, hoặc single DB QPS quá bottleneck → sharding.

| Strategy | Cách | Lợi | Nhược |
|------|------|------|------|
| Vertical DB | Tách DB theo business domain | Decouple business, scale độc lập | Cross-DB JOIN khó |
| Horizontal table | Cùng table tách theo rule | Single table size control | Sharding key key |
| Vertical table | Tách big field thành table riêng | Giảm IO, tăng query | Cần JOIN thêm |

**Sharding key principle**:
- Chọn field query thường nhất (vd user_id)
- Distribute đều, tránh hot spot
- Cùng user data trong cùng shard

### 3.3 Message queue

MQ = "shock absorber" distributed, core: decouple, async, smoothing.

| Scenario | Không MQ | Có MQ |
|------|---------|--------|
| Order xong send notify | Order API sync gọi notify, notify fail → order fail | Order OK → send message, notify async consume |
| Flash sale | Burst traffic đập DB | Request enqueue, backend consume theo capacity |
| Data sync | Service A direct gọi B | A publish event, B subscribe |

---

## 4. Trade-off thinking: no silver bullet

Architecture design bản chất = **Trade-off**. Mỗi decision có cost, key là hiểu cost + chọn phù hợp giai đoạn.

| Dim | Option A | Option B | Decision |
|---------|--------|--------|---------|
| Consistency vs Availability | Strong (CP) | High availability (AP) | Business tolerate inconsistent ngắn? |
| Perf vs Cost | Full cache | On-demand cache | Data volume + budget |
| Simple vs Flexible | Monolith | Microservice | Team scale + business complexity |
| Realtime vs Batch | Stream | Batch | Data timeliness need |
| Self-host vs Managed | Tự MySQL | Cloud RDS | Ops capability + cost |

::: tip Architecture Decision Record (ADR)
Mỗi quan trọng decision phải record: **background, options, why chosen, cost**. Không phải đổ lỗi, mà để người sau hiểu "sao lúc đó design vậy".

Format đơn giản:
- **Title**: Replace XXX với YYY
- **Background**: Gặp vấn đề gì
- **Decision**: Chọn option nào
- **Rationale**: Sao chọn
- **Cost**: Nhược điểm + risk
:::

### Common bad trade-offs

| Error | Biểu hiện | Đúng |
|------|------|---------|
| Premature optimization | DAU 1k đã sharding | Single DB trước, gặp bottleneck mới tách |
| Tech-driven | "Tôi muốn Kafka" thay vì "tôi cần async" | Từ vấn đề, không từ tech |
| Ignore ops cost | Chọn option tối ưu nhưng team maintain không nổi | Match team ability |
| Pursue perfect consistency | Mọi scenario distributed transaction | Đa số eventual consistency đủ |

---

## 5. Classic cases

3 cases kinh điển, áp dụng methodology:

### 5.1 Short link service (TinyURL)

Short link = case interview kinh điển, nhỏ nhưng đủ.

**Clarify**:
- Core: long → short (write), short → redirect (read)
- R/W: ~100:1 (read >> write)
- Daily redirect: 100M
- Never expire

**Estimation**:

| Metric | Calc | Result |
|------|------|------|
| Write QPS | 100M / 100 / 86400 | ≈ 12 QPS |
| Read QPS | 100M / 86400 | ≈ 1,200 QPS |
| Peak read | 1,200 × 3 | ≈ 3,600 QPS |
| 5-year storage | 1M/day × 365 × 5 × 100B | ≈ 18 GB |
| Cache (20%) | 18 GB × 20% | ≈ 3.6 GB |

**Architecture**:

```
Write: Client → API → ID gen → Base62 encode → MySQL + Redis
Read: Client → CDN → API → Redis query → 302 redirect
                              ↓ (miss)
                            MySQL → refill Redis
```

**Key decisions**:
- Short code: Snowflake ID + Base62, tránh hash collision
- Cache: Cache-Aside, hot link dùng CDN
- DB: single table OK (18GB nhỏ), index theo short code

### 5.2 Feed stream

Social feed (Facebook feed, Twitter timeline).

**Challenge core**: user post 1 update, làm sao mọi follower thấy?

| Solution | Cách | Lợi | Nhược |
|------|------|------|------|
| Pull | Read time aggregate updates of followers | Write đơn giản, ít storage | Read chậm, follow nhiều = latency cao |
| Push | Publish time write inbox của mỗi follower | Read cực nhanh | Big V post → write fanout nặng |
| Hybrid | Normal user push, big V pull | Balance R/W | Implement complex |

**Hybrid solution**:
- Follower <10k: publish push tới mọi follower (push)
- Follower >10k: không push, follower read time pull (pull)
- User open feed: merge pushed content + realtime pull big V, sort by time

### 5.3 Flash sale system

Core challenge: instant high concurrency + stock không over-sell.

**Traffic feature**:
- Pre-event: nhiều user refresh đợi
- Event start instant: QPS có thể 100x bình thường
- Post-event: traffic giảm nhanh

**Layered smoothing**:

```
Request → CDN (static) → Gateway (rate limit) → MQ (smoothing) → Stock service (deduct)
```

| Layer | Strategy | Effect |
|------|------|------|
| FE | Button gray + random delay + captcha | Filter bot, scatter request |
| CDN | Static cache | Giảm 90% page request |
| Gateway | Token bucket | Chỉ pass traffic system chịu nổi |
| MQ | Enqueue + async process | Smoothing, protect DB |
| Stock service | Redis pre-deduct + Lua atomic | Prevent over-sell, ms response |

::: tip Flash sale core principles
1. **Block upstream**: CDN block được thì không lên app
2. **R/W split**: product detail page → cache, chỉ checkout → DB
3. **Async**: user click "buy" → return "queuing" ngay, async xử
4. **Plan B**: rate limit, circuit break, degradation
:::

---

## Tổng kết

System design = practical skill, core là structured thinking + trade-off.

1. **4-step framework**: clarify → estimate → design → optimize
2. **Back-of-envelope**: không chính xác, order of magnitude OK
3. **Core patterns**: cache, sharding, MQ, CDN, rate limit + circuit breaker = "lego" của system design
4. **Trade-off thinking**: no perfect, chỉ phù hợp giai đoạn, record decision
5. **Classic cases**: short link (basic), feed (push-pull), flash sale (high concurrency) — master 3 này = apply rộng

::: tip 2026 cho VN dev
- **Interview prep**:
  - **ByteByteGo** (Alex Xu): visual best
  - **System Design Primer** (GitHub): comprehensive
  - **Hello Interview**: structured framework
- **VN scenarios**:
  - Tiki search system
  - Grab matching system
  - MoMo payment + fraud detection
  - Zalo messaging architecture
- **AI-era system design**:
  - LLM gateway (LiteLLM, Portkey)
  - Vector DB integration
  - Async inference queue
  - Cost optimization layer
- **Trends 2026**: serverless-first, edge computing, event-driven, eventually consistent
:::

## Tài liệu

- [System Design Interview (Alex Xu)](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
- [The System Design Primer](https://github.com/donnemartin/system-design-primer)
- [ByteByteGo](https://bytebytego.com/)
