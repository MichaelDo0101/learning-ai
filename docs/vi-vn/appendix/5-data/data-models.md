# Data Model Overview (Document / Graph / Time-series / Vector)

::: tip 🎯 Core
**Sao không nhét hết data vào MySQL table?** Khi data là social graph, sensor stream triệu record/giây, hoặc semantic vector cho AI hiểu — relational table bất lực. Mỗi data shape cần modeling khác.
:::

---

## 1. Ngoài relational: sao cần model khác?

Relational DB (MySQL, PostgreSQL) dùng "table + row + column", hợp structured + relationship rõ. Nhưng real-world data đa dạng hơn:

| Shape | Pain relational | Model phù hợp |
|----------|-------------|-------------|
| User profile (field linh hoạt, nested) | ALTER TABLE liên tục, nhiều NULL column | **Document** |
| Social network (friend of friend of friend) | Multi-layer JOIN exponential slow | **Graph** |
| Monitoring (triệu row/giây write) | Write bottleneck, history bloat | **Time-series** |
| AI semantic search ("nội dung gần ý nghĩa") | Không express semantic similarity | **Vector** |

::: info 💡 Insight
Không phải "thay" relational, mà **bổ sung**. Đa số system core business vẫn MySQL/PostgreSQL, nhưng introduce model chuyên cho scenario đặc thù → perf tăng nhiều order.
:::

---

## 2. Document Model

### 2.1 Document model là gì?

Store data thành **JSON/BSON document**, mỗi record self-contained, có thể field khác nhau.

```json
{
  "_id": "user_1001",
  "name": "Hoàng",
  "tags": ["VIP", "Active"],
  "address": { "city": "HCM", "district": "Q1" },
  "orders": [
    { "id": "o1", "amount": 299 },
    { "id": "o2", "amount": 599 }
  ]
}
```

**Đặc điểm**:
- **No Schema constraint**: không cần pre-define table, field thêm/xoá tuỳ
- **Nested**: address, orders nested trong document, 1 read = full data
- **Horizontal scale**: native sharding, handle scale lớn

### 2.2 Document vs Relational

| Dim | Relational (MySQL) | Document (MongoDB) |
|----------|----------------|------------------|
| Structure | Fixed Schema, ALTER TABLE | Flexible, add field anytime |
| Nested | Multi-table JOIN | Embedded |
| Cross-record | JOIN strong | Weak |
| Use | Stable business | Variable content |

### 2.3 Use cases

- **CMS**: article, comment, tag structure khác
- **User profile**: user khác có attribute khác
- **Product catalog**: phone có "screen size", food có "expiry", field hoàn toàn khác
- **Config center**: service config không uniform

::: warning ⚠️ Misconception
"MongoDB không cần design data structure" — sai! Document model vẫn cần design: nested không quá deep, sub-document update thường xuyên nên tách collection riêng.
:::

---

## 3. Graph Model

### 3.1 Graph là gì?

**Node** + **Edge** express entity + relationship. Mỗi node = entity, mỗi edge = relationship, cả 2 mang attribute.

```
(Hoàng) --[Follow]--> (Linh) --[Follow]--> (An)
   |                                        |
   +---------[Buy]----> (iPhone) <--[Buy]---+
```

### 3.2 Killer capability: multi-hop query

**Scenario**: social network tìm "friend of friend of friend"

Relational (3-layer JOIN):
```sql
SELECT DISTINCT f3.name
FROM friends f1
JOIN friends f2 ON f1.friend_id = f2.user_id
JOIN friends f3 ON f2.friend_id = f3.user_id
WHERE f1.user_id = 1001;
```

Graph DB (Cypher query language):
```cypher
MATCH (me)-[:FOLLOWS*1..3]->(target)
WHERE me.name = 'Hoàng'
RETURN DISTINCT target.name
```

Relational mỗi hop thêm = JOIN thêm, perf giảm exponential. Graph DB traverse qua pointer, multi-hop perf gần như không đổi.

### 3.3 Use cases

- **Social network**: friend recommendation, mutual follow, influence
- **Knowledge graph**: entity relationship reasoning
- **Fraud detection**: phát hiện money loop, related account network
- **Recommendation**: graph user-product-tag

---

## 4. Time-Series Model

### 4.1 Time-Series là gì?

Lấy **timestamp** làm main axis, optimize "write theo time order, query theo time range".

```
timestamp            device      cpu_usage   memory
2024-01-15 10:00:01  server-01   45%         12.3GB
2024-01-15 10:00:02  server-01   67%         12.5GB
2024-01-15 10:00:03  server-01   92%         14.1GB
```

### 4.2 Sao không dùng MySQL?

| Issue | MySQL | TS DB (InfluxDB) |
|------|-------|----------------------|
| Write speed | 10k/s | **1M/s** |
| History | Manual cleanup, table bloat | **TTL auto** |
| Aggregate query | GROUP BY slow | **Downsampling built-in** |
| Storage efficiency | Generic, waste | **Columnar compression**, save 90% |

### 4.3 Use cases

- **Server monitoring**: CPU, memory, disk per second
- **IoT sensor**: temperature, humidity, GPS
- **Financial feed**: stock price, trading volume
- **Log analysis**: app log timeline aggregation

---

## 5. Vector Model

### 5.1 Vector là gì?

Convert text, image, audio → high-dim vector qua **Embedding model**, compute distance giữa vector = semantic similarity.

```
"Nhà hàng Nhật ngon" → Embedding → [0.82, 0.15, 0.91, 0.33, ...]
                                       ↓ Cosine similarity
"Sushi master Tokyo"  → [0.80, 0.18, 0.89, ...] → 96% similar
"Italian pizza"       → [0.12, 0.85, 0.20, ...] → 31% similar
```

### 5.2 Vector vs Keyword search

| Dim | Keyword (LIKE / full-text) | Vector |
|------|---------------------------|---------|
| Method | Exact string match | Semantic similarity |
| "Nhà hàng Nhật ngon" | Chỉ match text chứa "Nhật" | Tìm được "sushi", "sashimi", "izakaya" |
| Multi-lang | Phải xử riêng | Cross-language semantic |
| Multi-modal | Chỉ text | Text + image + audio unified |

### 5.3 Use cases

- **RAG**: cung cấp knowledge chunk relevant cho LLM
- **Semantic search**: hiểu intent thay keyword
- **Image-to-image**: upload ảnh, tìm visual similar
- **Recommendation**: content-based semantic recommendation

::: tip 💡 Vector DB selection
- **Standalone**: Pinecone, Milvus, Weaviate, Qdrant — perf tốt nhất
- **DB extension**: pgvector (PostgreSQL), Atlas Vector Search (MongoDB) — giảm complexity
- **In-memory**: FAISS, Annoy — small scale, low latency
:::

---

## 6. Decision: chọn model nào?

| Data của bạn thế nào? | Recommended | Đại diện |
|-------------------|---------|---------|
| Structure fixed, relationship rõ (order, user) | Relational | MySQL, PostgreSQL |
| Structure linh hoạt, nested nhiều (content, config) | Document | MongoDB, DynamoDB |
| Entity relationship phức tạp, multi-hop | Graph | Neo4j, Amazon Neptune |
| Time-ordered write, time-range query | Time-series | InfluxDB, TimescaleDB |
| Unstructured, cần semantic similarity | Vector | Pinecone, Milvus, pgvector |

::: info 🎯 Practical
System hiện đại thường **multi-model**:
- **Core business** → PostgreSQL (relational)
- **User behavior log** → InfluxDB (time-series)
- **AI knowledge base** → Milvus / pgvector (vector)
- **Recommendation engine** → Neo4j (graph)

Đừng theo đuổi "1 DB giải mọi thứ", để mỗi data tìm nhà phù hợp.
:::

<DataModelsDemo />

::: tip 2026 cho VN dev
- **PostgreSQL + extensions** đang là king: pgvector, TimescaleDB, PostGIS (geo), pg_trgm (fuzzy text)
- **VN context**: e-commerce dùng PG + Redis chính; AI scenario nên thử pgvector trước Milvus
- **AI standard stack 2026**: PostgreSQL (relational + vector) + Redis (cache + queue) + ClickHouse (analytics)
- **Document era**: MongoDB still mainstream, Firestore cho serverless
:::
