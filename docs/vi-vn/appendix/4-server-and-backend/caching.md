# Cache: layers + strategies

::: tip Mở đầu
**Why cache?** DB access = ms-s, RAM = ns. Cache giảm latency 1000x + giảm DB load. Mọi system perf tốt đều có cache, mỗi layer.
:::

---

## 1. Sao cần cache?

| Metric | DB | Cache (Redis) |
|--------|-----|-----|
| Latency | 5-50ms | <1ms |
| Throughput | 1k-10k QPS | 100k+ QPS |
| Cost per query | High | Cực thấp |

Cache **không phải optimization optional**, mà là **must** cho mọi production system.

---

## 2. Cache là gì?

**Cache** = lưu kết quả compute/query đắt vào storage nhanh để reuse.

3 element:
- **Key**: identifier (vd `user:123`)
- **Value**: data cache
- **TTL** (Time-To-Live): expire time

```python
# Pseudo-code
def get_user(id):
    cached = cache.get(f"user:{id}")
    if cached:
        return cached  # Hit
    user = db.query(f"SELECT * FROM users WHERE id={id}")  # Miss → DB
    cache.set(f"user:{id}", user, ttl=300)  # Cache 5 min
    return user
```

---

## 3. Cache evolution

### 3.1 Browser cache
```http
Cache-Control: max-age=3600
ETag: "abc123"
```
Static asset (image, CSS, JS) cache ở browser → 0 request server.

### 3.2 CDN cache
Cloudflare, BunnyCDN, AWS CloudFront — cache static + dynamic edge.

### 3.3 In-memory cache (single server)
```python
# Python @lru_cache
from functools import lru_cache

@lru_cache(maxsize=1000)
def get_product(id): ...
```
Hợp single-server, hot data nhỏ. Restart server = mất.

### 3.4 Distributed cache (Redis, Memcached)
Multi-server share cache.

```python
import redis
r = redis.Redis(host='cache.example.com')

r.set("user:123", json.dumps(user_data), ex=300)
data = r.get("user:123")
```

### 3.5 Multi-layer cache

```
Browser cache → CDN → Reverse proxy (Nginx) → App in-memory → Redis → DB
   100ms          50ms         10ms              1ms          0.5ms    50ms
```

Mỗi layer absorb 1 phần traffic, DB chỉ nhận miss của Redis.

---

## 4. 3 classic cache problems

### 4.1 Cache penetration (cache xuyên thủng)

**Problem**: Query data không tồn tại (vd `user_id=99999`). Cache miss → DB query → trả null → không cache → mỗi request đập DB.

**Solutions**:
- Cache null value với TTL ngắn (`cache.set("user:99999", null, 60)`)
- Bloom filter: pre-check ID tồn tại trước khi query

### 4.2 Cache breakdown (cache đột phá)

**Problem**: 1 hot key expire đúng lúc thousands of request → đập DB đồng loạt.

**Solutions**:
- Mutex/lock: chỉ 1 request rebuild cache, các request khác đợi
- Logical expire: không TTL thật, async refresh
- Hot key không bao giờ expire, cron job update

### 4.3 Cache avalanche (cache tuyết lở)

**Problem**: Nhiều key expire cùng lúc, hoặc cache server down → mọi request đập DB.

**Solutions**:
- TTL stagger: add random jitter (`ttl = 300 + random(0, 60)`)
- Multi-layer cache (Redis fail → fallback Memcached/local)
- Rate limit DB query
- Circuit breaker

---

## 5. Consistency strategies: cache vs DB

Cache + DB cùng tồn tại = vấn đề consistency. Update data ở đâu trước?

### 5.1 Cache-Aside (most common)

```python
# Read
def get_user(id):
    user = cache.get(f"user:{id}")
    if not user:
        user = db.query(id)
        cache.set(f"user:{id}", user)
    return user

# Write
def update_user(id, data):
    db.update(id, data)
    cache.delete(f"user:{id}")  # Invalidate, lazy reload
```

**Lợi**: đơn giản, control rõ.
**Hại**: race condition possible (request đọc giữa lúc write).

### 5.2 Write-Through

```python
def update_user(id, data):
    cache.set(f"user:{id}", data)  # Write cache trước
    db.update(id, data)             # Write DB
```

**Lợi**: cache + DB sync.
**Hại**: write latency tăng.

### 5.3 Write-Behind (Write-Back)

```python
def update_user(id, data):
    cache.set(f"user:{id}", data)
    queue.enqueue(("update_user", id, data))  # Async write DB
```

**Lợi**: write nhanh.
**Hại**: data loss nếu cache crash trước khi flush.

### 5.4 Read-Through / Write-Through (managed)

Cache layer tự load + persist (vd Hibernate L2 cache, EhCache).

---

## 6. Thực chiến: build cache system

### Stack

```
Client → CDN (static) → API Gateway → App
                                       ├── In-memory LRU (hot user)
                                       └── Redis Cluster (shared)
                                              ↓ miss
                                            DB (PostgreSQL)
```

### Code example (Node.js + Redis)

```typescript
import Redis from 'ioredis'
import LRU from 'lru-cache'

const redis = new Redis()
const local = new LRU({ max: 1000, ttl: 60_000 })  // 1 phút local

async function getUser(id: string) {
  // L1: local cache
  const local_hit = local.get(id)
  if (local_hit) return local_hit

  // L2: Redis
  const redis_hit = await redis.get(`user:${id}`)
  if (redis_hit) {
    const data = JSON.parse(redis_hit)
    local.set(id, data)
    return data
  }

  // L3: DB
  const user = await db.user.findUnique({ where: { id } })
  if (user) {
    await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 300)
    local.set(id, user)
  }
  return user
}

async function updateUser(id: string, data: any) {
  await db.user.update({ where: { id }, data })
  await redis.del(`user:${id}`)
  local.delete(id)
}
```

### Monitoring

- **Hit rate**: target >80%
- **Latency**: P99 cache <10ms
- **Memory**: Redis usage < 80% max
- **Eviction rate**: nếu cao → tăng memory hoặc TTL ngắn lại

---

## 7. Tổng kết + roadmap

| Stage | Strategy |
|------|----------|
| Junior | `@lru_cache` Python, in-memory |
| Mid | Redis cache-aside, basic TTL |
| Senior | Multi-layer, handle penetration/breakdown/avalanche, consistency strategies |
| Architect | Distributed cache cluster, hot key handling, monitoring + alerting |

::: tip 2026 cho VN dev
- **Redis 7.4+**: hash field expire, stream tốt hơn
- **DragonflyDB**: thay Redis, faster (25x), drop-in compatible
- **KeyDB**: Redis fork, multi-threaded
- **Cloudflare KV / Workers KV / D1**: edge cache mainstream
- **Upstash Redis**: serverless Redis, pay-per-request
- **VN context**: e-commerce + banking dùng Redis cluster on-prem; startup dùng Upstash/Redis Cloud
- **AI scenario**:
  - Cache LLM response (semantic cache với embedding similarity)
  - Cache RAG retrieval (giảm vector DB hit)
  - Tool: GPTCache, LangChain cache, Helicone
:::
