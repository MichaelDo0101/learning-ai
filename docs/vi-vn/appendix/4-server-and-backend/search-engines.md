# Search Engine Principles

::: tip Mở đầu
**Search "áo đỏ" trên Shopee, 0.1s từ vài tỷ sản phẩm ra kết quả relevant — sao làm được?** Search engine = infrastructure core nhất Internet. Từ Google đến on-site search, nguyên lý giống nhau: **inverted index + relevance ranking**.
:::

**Bạn sẽ học**:
- **Inverted index**: data structure cốt lõi
- **Tokenization**: thử thách + solution VN
- **Relevance ranking**: TF-IDF + BM25
- **Elasticsearch**: search engine phổ biến nhất
- **Optimization**: synonym, correction, highlight

---

## 0. Toàn cảnh: bản chất search là gì?

Search = **Information Retrieval**: cho 1 query, tìm document relevant nhất từ kho lớn, sort theo relevance return.

2 stage:
- **Index (offline)**: pre-process mọi document, build structure tìm nhanh
- **Query (online)**: user nhập keyword, nhanh match document + sort

::: tip Sao không dùng DB LIKE?
`SELECT * FROM products WHERE name LIKE '%áo đỏ%'` nhìn được, nhưng cần **full table scan** — check từng row. Triệu record → query chậm không dùng được. Inverted index biến O(n) → O(1).
:::

---

## 1. Inverted Index: "tim" search engine

DB truyền thống = **forward index**: từ document ID → content. Search engine = **inverted index**: từ keyword → document list.

<InvertedIndexDemo />

| Type | Direction | Tìm | Use |
|---------|------|---------|---------|
| Forward | Doc → content | Biết ID, tra content | DB primary key |
| Inverted | Keyword → doc list | Biết keyword, tra doc | Full-text search |

::: tip Build inverted index
1. **Collect**: lấy mọi doc cần search
2. **Tokenize**: cắt doc thành word
3. **Mapping**: record mỗi word xuất hiện ở doc nào (+ position, frequency)
4. **Persist**: index ghi disk, support tìm nhanh
:::

---

## 2. Tokenization + Text Analysis

Tokenization = step 1, cũng là thử thách lớn cho tiếng Việt + Trung. EN tự nhiên tách bằng space, VN có space nhưng nhiều từ ghép — "máy tính" là 1 từ hay 2?

| Cách | Note | Vd |
|---------|------|------|
| Standard | Theo space + punctuation (EN) | "hello world" → ["hello", "world"] |
| VN/CN tokenizer | Dictionary-based + ML | "trí tuệ nhân tạo" → ["trí tuệ", "nhân tạo"] |
| N-gram | Sliding window | "search" → ["sear", "earch"] |
| Custom dict | Thêm domain-specific | "iPhone 16 Pro Max" = 1 từ |

::: tip Pipeline
1. **Char filter**: bỏ HTML, special char
2. **Tokenize**: cắt thành tokens
3. **Stop word filter**: bỏ "và", "của", "là"
4. **Synonym**: "phone" → "phone, điện thoại, di động"
5. **Stemming**: "running" → "run" (EN)
:::

---

## 3. Relevance ranking

Match document chỉ là step 1, quan trọng là **sort** — result relevant nhất lên đầu.

| Algorithm | Nguyên lý | Đặc điểm |
|------|------|------|
| TF-IDF | Term frequency × Inverse doc frequency | Kinh điển |
| BM25 | TF-IDF + doc length normalization | Default Elasticsearch |
| Vector retrieval | Doc + query → vector, cosine similarity | Semantic search |

::: tip TF-IDF intuition
- **TF**: từ xuất hiện càng nhiều trong doc, doc càng relevant với từ đó
- **IDF**: từ xuất hiện ít trong tổng doc → distinctness cao
- "của" xuất hiện mọi doc (IDF thấp) → search "của" vô nghĩa
- "Elasticsearch" chỉ ở few doc (IDF cao) → search precise
:::

---

## 4. Elasticsearch

Open-source search engine phổ biến nhất, dựa Apache Lucene, distributed + RESTful API.

| Concept | Note |
|------|------|
| Index | Như DB "table", chứa doc cùng loại |
| Document | 1 record, JSON |
| Shard | Phân chia index sang nhiều node |
| Replica | Bản copy, HA + read scale |
| Mapping | Field type definition, như DB schema |
| Analyzer | Text analyzer, define tokenization |

::: tip ES vs DB
ES không thay DB, mà làm **search layer** kết hợp DB. Architecture: data write DB → sync ES → search request → ES → detail request → DB.
:::

---

## 5. Search optimization

| Optimization | Note | Effect |
|---------|------|------|
| Synonym | "phone" search được "điện thoại" | Tăng recall |
| Spell correction | "iphoen" → "iphone" | Fault tolerance |
| Autocomplete | Gõ "iPh" → suggest "iPhone" | UX |
| Highlight | Mark đỏ word match | Trực quan |
| Weight | Title match > content match | Tăng precision |
| Filter + aggregate | Filter theo price, brand | Narrow range |

---

## Tổng kết

1. **Inverted index** = core
2. **Tokenization** = nền tảng chất lượng search VN
3. **BM25** = default ES, relevance ranking tốt
4. **ES architecture**: shard + replica, distributed + HA
5. **Optimization**: synonym, correction, autocomplete

::: tip 2026 cho VN dev
- **Tiếng Việt tokenizer**: VnCoreNLP, underthesea, pyvi
- **ES alternative**: Meilisearch (lightweight, dễ setup), Typesense, OpenSearch (AWS fork)
- **Vector search (semantic)**: Pinecone, Qdrant, Weaviate, pgvector (PostgreSQL extension)
- **Hybrid search**: BM25 + vector → best of both, Elasticsearch 8.13+ hỗ trợ native
- **VN context**: Shopee, Tiki dùng ES; small project → Meilisearch + bge-m3 embedding cho tiếng Việt
:::

## Tài liệu

- [Elasticsearch Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/)
- [Apache Lucene](https://lucene.apache.org/)
- [MeiliSearch](https://www.meilisearch.com/)
- [Typesense](https://typesense.org/)
- [Vietnamese NLP](https://github.com/undertheseanlp/underthesea)
