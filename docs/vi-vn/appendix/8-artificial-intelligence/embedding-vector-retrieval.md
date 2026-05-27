# Embedding và Vector Retrieval

::: tip Mở đầu
**Máy tính hiểu "mèo và chó giống nhau, khác xe hơi" thế nào?** Với người là common sense, với máy "mèo", "chó", "xe hơi" chỉ là 3 chuỗi text không liên quan. **Embedding** giải bài toán này — biến text thành vector số, để máy hiểu được "xa-gần" về semantic.
:::

**Bạn sẽ học**:
- **Hiểu trực giác**: Embedding là gì, sao vector "mèo" + "chó" gần nhau
- **Tính similarity**: cosine, Euclidean
- **Index principle**: vector DB tìm trong triệu vector trong vài ms thế nào
- **Tech selection**: vector DB mainstream
- **End-to-end pipeline**: text → vector → retrieval

| Chương | Nội dung |
|-----|------|
| **1** | Embedding concept |
| **2** | Similarity calculation |
| **3** | Vector index |
| **4** | Vector database |
| **5** | End-to-end pipeline |

---

## 0. Toàn cảnh: cầu nối text → số

NLP có thách thức nền tảng: **máy chỉ biết số, không biết chữ**.

Cách sớm: gán mỗi từ 1 ID (One-Hot), vd "mèo"=001, "chó"=010, "xe hơi"=100. Vấn đề chí mạng: **mọi từ cách đều nhau**. "Mèo" tới "chó" = "mèo" tới "xe hơi" → trái trực giác.

Embedding cách mạng: map mỗi từ thành **dense low-dim vector**, từ semantic gần tự gom nhóm. Trong space đó, "mèo" + "chó" sát nhau, "xe hơi" xa — máy "hiểu" semantic.

::: tip Từ One-Hot đến Embedding
- **One-Hot**: dim = vocab size (vạn dim), mỗi vector 1 số 1, còn 0, sparse + không semantic
- **Embedding**: dim thường 768~1536, mỗi số có nghĩa, dense + giàu semantic
- **Đột phá**: Word2Vec (2013) chứng minh "nghĩa từ định nghĩa được bằng context", mở kỷ nguyên Embedding
:::

---

## 1. Embedding concept: text → toạ độ

Core idea: **dùng nhóm số (vector) biểu diễn nghĩa của 1 từ/câu**.

Tưởng 2D coordinate. Đặt "mèo" ở (0.2, 0.7), "chó" (0.3, 0.6), "xe hơi" (0.9, 0.1). "Mèo" + "chó" gần, "xe hơi" xa. Đây là trực giác — **semantic similarity = khoảng cách space**.

<EmbeddingConceptDemo />

::: tip 3 tính chất Embedding
1. **Semantic clustering**: từ nghĩa giống tự gom (động vật, thức ăn, công nghệ)
2. **Analogy**: phép vector biểu thị quan hệ semantic, kinh điển: king - man + woman ≈ queen
3. **Dimension meaning**: mỗi dim implicit encode 1 feature (là động vật? size? sentiment?)
:::

| Encoding | Dim | Semantic | App |
|---------|------|---------|---------|
| One-Hot | Vocab (~50000) | Không | NLP cổ |
| Word2Vec | 100~300 | Word level | Similarity, analogy |
| BERT Embedding | 768 | Context | Sentence, QA |
| OpenAI text-embedding-3 | 1536~3072 | Deep | RAG, semantic search |

---

## 2. Similarity: 2 vector "gần" cỡ nào?

Có vector, câu hỏi: **đo similarity 2 vector thế nào?** Như đo 2 thành phố — đo đường thẳng, hoặc direction.

<VectorSimilarityDemo />

::: tip 2 metric chính
- **Cosine Similarity**: đo **direction** 2 vector, range [-1, 1]. 1 = cùng chiều, 0 = vuông góc, -1 = ngược. Chọn đầu cho text vì không bị ảnh hưởng bởi length.
- **Euclidean Distance**: **đường thẳng** giữa 2 endpoint, range [0, ∞). 0 = trùng, càng lớn càng khác. Hợp scenario cần "absolute size".
:::

| Metric | Trực giác | Range | Use |
|---------|---------|------|---------|
| Cosine | Direction, ignore length | [-1, 1] | Text semantic, recommendation |
| Euclidean | Direct distance | [0, ∞) | Image feature, clustering |
| Dot product | Direction × length | (-∞, +∞) | Vector đã normalize, tính nhanh |
| Manhattan | Đi dọc axis | [0, ∞) | High-dim sparse vector |

---

## 3. Vector index: retrieve trong triệu vector trong ms

Giả sử có 1M document, mỗi cái 1536-dim vector. User hỏi, cần tìm 10 gần nhất. Cách đơn giản: tính từng cái — 1M phép vector 1536-dim, quá chậm.

**Vector index** giải: **đánh đổi space-time, prebuild index → speed từ O(n) → ~O(log n)**.

<VectorIndexDemo />

::: tip Brute-force vs ANN
- **Flat (brute-force)**: so từng cái, 100% accurate nhưng chậm. Data <100k OK.
- **IVF (Inverted File Index)**: chia vector space thành regions (clustering), query chỉ search region gần. Như thư viện phân theme.
- **HNSW (Hierarchical Navigable Small World)**: graph multi-layer, từ coarse-grained đến fine-grained. Như world map → country map → street map.
- **PQ (Product Quantization)**: nén high-dim vector thành short code, đánh đổi accuracy lấy memory. Hợp data cực lớn.
:::

| Index | Build speed | Query speed | Recall | Memory | Scale |
|---------|---------|---------|-------|---------|---------|
| Flat | Không cần | Chậm | 100% | Cao | <100k |
| IVF | Trung | Nhanh | 95%+ | Trung | 100k-10M |
| HNSW | Chậm | Rất nhanh | 99%+ | Cao | 100k-10M |
| PQ | Trung | Nhanh | 90%+ | Rất thấp | >10M |
| IVF-PQ | Trung | Nhanh | 92%+ | Thấp | >100M |

---

## 4. Vector DB: storage engine cho vector

Có vector + index, cần nơi store + manage. Traditional DB (MySQL, PostgreSQL) tốt cho structured data, nhưng yếu cho similarity search high-dim. **Vector DB** thiết kế riêng cho scenario này.

<VectorDatabaseDemo />

::: tip Capability core
1. **High-efficient storage**: format optimize cho high-dim float vector
2. **ANN retrieval**: built-in HNSW, IVF
3. **Metadata filter**: search + filter theo tag/time
4. **Realtime update**: dynamic CRUD, không rebuild index
5. **Horizontal scaling**: distributed, scale tỷ vector
:::

| DB | Type | Feature | Scenario |
|-------|------|------|---------|
| Pinecone | Managed cloud | Zero-ops, ready-to-use | Prototype, mid-prod |
| Milvus | Open distributed | High-perf, scalable | Large prod |
| Chroma | Open lightweight | Embedded, API clean | Local dev, small project |
| Weaviate | Open cloud-native | Built-in vectorize, GraphQL | Cần auto-vectorize |
| Qdrant | Open high-perf | Rust, filter mạnh | Cần filter phức tạp |
| pgvector | PG extension | Reuse PG infra | Team đã có PostgreSQL |

---

## 5. End-to-end pipeline

Nối các component → hệ vector retrieval đầy đủ.

Có 2 luồng: **offline write** (doc → vector → store) và **online query** (question → vector → search).

<EmbeddingPipelineDemo />

::: tip Offline write
1. **Doc loading**: load text từ source (PDF, web, DB)
2. **Preprocessing**: clean, denoise, normalize (bỏ HTML tag, char đặc biệt)
3. **Chunking**: cắt text dài thành chunk (200~500 tokens)
4. **Vectorize**: gọi embedding model (vd OpenAI text-embedding-3-small) → vector
5. **Store**: lưu vector + text + metadata vào vector DB
:::

::: tip Online query
1. **Receive query**: user gõ câu hỏi
2. **Query vectorize**: cùng model embed
3. **Similarity search**: trong DB tìm Top-K similar chunk
4. **Postprocess**: rerank, dedup, metadata filter
5. **Return**: relevant chunk → caller (hoặc LLM gen answer)
:::

| Stage | Key choice | Khuyến nghị |
|------|---------|---------|
| Embedding model | Accuracy vs cost vs speed | OpenAI text-embedding-3-small (tốt giá) |
| Chunking | Granularity vs semantic | Recursive chunking, 200~500 tokens |
| Vector DB | Scale vs ops cost | Project nhỏ: Chroma, prod: Pinecone/Milvus |
| Similarity | Semantic vs exact | Cosine (chọn đầu cho text) |
| Top-K | Recall vs noise | Retrieve 20, rerank Top 5 |

---

## Tổng kết

Embedding + vector retrieval = cầu nối "ngôn ngữ người" ↔ "máy hiểu", và là infrastructure cho RAG, semantic search, recommendation.

Key:
1. **Bản chất Embedding**: map text vào high-dim space, semantic similarity → khoảng cách space
2. **Similarity**: cosine cho direction (text), Euclidean cho absolute distance
3. **Index = key performance**: HNSW + IVF làm retrieval ms với triệu vector
4. **Vector DB**: project nhỏ Chroma/pgvector, prod Pinecone/Milvus
5. **End-to-end**: từ doc loading đến retrieval, mỗi stage ảnh hưởng kết quả

::: tip 2026 update
- **OpenAI text-embedding-3-large**: 3072 dim, best public quality
- **Cohere embed-v4**: multimodal, strong on non-English
- **BGE-M3** (open-source): tốt VN dev cần multilingual
- **Matryoshka embeddings**: dim adaptive (256/512/1024)
- **Hybrid search**: combine BM25 + vector (Pinecone, Weaviate)
- **VN dev**: cho RAG tiếng Việt, dùng `BAAI/bge-m3` hoặc Cohere
:::

## Tài liệu

- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Pinecone Learning Center](https://www.pinecone.io/learn/)
- [FAISS Wiki](https://github.com/facebookresearch/faiss/wiki)
- [Word2Vec paper](https://arxiv.org/abs/1301.3781)
- [MTEB leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
