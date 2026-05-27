# RAG: Retrieval-Augmented Generation

::: tip Mở đầu
**Tại sao ChatGPT đôi khi "tự tin bịa chuyện"?** Knowledge của LLM lấy từ training data, nhưng training data có cutoff date và không gồm doc nội bộ công ty bạn. **RAG (Retrieval-Augmented Generation)** là tech core giải vấn đề này — cho AI "tra tài liệu" trước khi trả lời.
:::

**Bạn sẽ học**:
- Hiểu khái niệm: RAG là gì, sao cần, giải vấn đề "hallucination"
- Workflow đầy đủ: load doc → chunk → vectorize → retrieve → generate
- Năng lực chọn tech: chiến lược chunking, retrieval, biết chọn theo scenario
- Evolution: Naive → Advanced → Modular RAG
- Năng lực quyết định: khi nào dùng RAG, khi nào fine-tune

| Chương | Nội dung |
|-----|------|
| **1** | Flow cơ bản: index, retrieve, generate |
| **2** | Strategy chunking text |
| **3** | Tech retrieval |
| **4** | Evolution architecture |
| **5** | RAG vs fine-tuning |

---

## 0. Toàn cảnh: tại sao LLM cần "tra tài liệu"?

Tưởng tượng bạn là 1 giáo sư uyên bác, đọc vô số sách. Nhưng nếu ai hỏi "data bán hàng hôm qua của công ty bạn", chắc chắn không trả lời được — info này không có trong sách.

LLM cũng tình cảnh tương tự:

- **Knowledge có cutoff date**: GPT-4 training data cut tại 1 point, sau đó không biết
- **Thiếu knowledge riêng**: doc nội bộ, manual product, customer data — model chưa thấy
- **Dễ hallucinate**: khi model không chắc, có xu hướng "bịa" answer trông hợp lý

::: tip Ý tưởng core RAG
**Trước khi model trả lời, giúp nó tìm tài liệu reference liên quan**. Giống thi mở sách — không cần nhớ hết, chỉ cần biết tra ở đâu.

RAG = Retrieval + Augmented + Generation
:::

---

## 1. Flow cơ bản: index, retrieve, generate

2 giai đoạn: **offline indexing** và **online query**.

Offline = library cataloging. Online = reader vào library tra tài liệu.

<RAGPipelineDemo />

::: tip 3 giai đoạn core
1. **Indexing**: load doc gốc, clean, chunk, qua embedding model → vector → lưu vector DB. One-time prep.
2. **Retrieval**: user hỏi, convert question thành vector, search vector DB tìm fragment similar nhất.
3. **Generation**: ghép fragment + question thành Prompt, đưa LLM gen answer.
:::

| Giai đoạn | Input | Output | Tech |
|------|------|------|---------|
| Index | Doc gốc | Vector DB | Chunking, embedding |
| Retrieve | Câu hỏi user | Top-K fragment | Vector similarity, rerank |
| Generate | Question + context | Answer cuối | Prompt engineering, LLM |

---

## 2. Text chunking: bỏ voi vào tủ lạnh

Chunking là khâu hay bị bỏ quên nhất nhưng ảnh hưởng effect lớn nhất. Sao cần chunk? Vì LLM context window có hạn, không nhồi cả sách vào được. Quan trọng hơn: **chất lượng chunk quyết định trực tiếp chất lượng retrieval**.

<ChunkingStrategyDemo />

::: tip Chọn strategy chunking
- **Fixed size**: cắt theo char/token, đơn giản nhưng có thể break semantic
- **Recursive**: cắt theo paragraph trước, dài quá thì câu, giữ semantic
- **Semantic**: dùng embedding model detect semantic boundary, cắt ở chỗ similarity break
- **Document structure**: dùng heading Markdown, tag HTML

Không có "best", chỉ có "phù hợp data của bạn". Khuyến nghị start với recursive chunking, size 200-500 tokens, overlap 10-20%.
:::

---

## 3. Tech retrieval: cách tìm content liên quan nhất

Sau chunking, vấn đề: **user hỏi 1 câu, làm sao tìm vài fragment liên quan nhất từ hàng nghìn?**

Giống tìm sách trong library lớn. Bạn có thể search title (keyword), mô tả nội dung muốn (semantic), hoặc kết hợp cả (hybrid).

<RetrievalDemo />

| Cách retrieve | Nguyên lý | Ưu | Nhược |
|---------|------|------|------|
| Keyword (BM25) | Term frequency + inverse doc frequency | Match chính xác, nhanh | Không hiểu semantic, fail với synonym |
| Vector retrieval | Cosine similarity embedding | Hiểu semantic, fuzzy match | Kém với proper noun |
| Hybrid | Fuse keyword + vector | Cân bằng chính xác và semantic | Phải tune weight, phức tạp |

::: tip Reranking
Sau initial retrieval, thường cần "rerank". Initial retrieval theo recall (tìm hết), rerank theo precision (xếp lên trên). Rerank model phổ biến: Cohere Rerank, BGE Reranker. Dùng cross-encoder cho fine-grained scoring.
:::

---

## 4. Evolution architecture: từ đơn giản tới thông minh

RAG evolve qua 3 generation trong 2 năm, mỗi gen giải pain point gen trước.

<RAGArchitectureDemo />

::: tip So sánh 3 gen
- **Naive RAG (2023)**: flow cơ bản "index → retrieve → generate". Đơn giản nhưng effect hạn chế.
- **Advanced RAG (2024)**: thêm query rewrite, hybrid retrieval, rerank, context compression. Tăng đáng kể precision.
- **Modular RAG (2025)**: chia thành module pluggable, support routing, adaptive retrieval, self-reflection. Dynamic chọn flow tối ưu theo query type.
:::

---

## 5. RAG vs fine-tuning: chọn cái nào?

Khi muốn LLM nắm knowledge lĩnh vực cụ thể, 2 đường: RAG và fine-tuning. Không exclusive, mà bổ sung nhau.

So sánh: **fine-tuning = cho học sinh đi học bồi dưỡng**, nội hoá knowledge vào não. **RAG = phát sách tham khảo**, thi có thể tra. Mỗi cách có ưu nhược.

<RAGvsFineTuningDemo />

| Chiều | RAG | Fine-tuning |
|------|-----|------|
| Update knowledge | Real-time, sửa doc là xong | Phải train lại |
| Cost | Thấp (không cần GPU train) | Cao (cần training resource) |
| Explainability | Cao (trace source được) | Thấp (knowledge nội hoá weights) |
| Scenario | KB Q&A, doc retrieval | Style transfer, task tuning |
| Hallucination control | Tốt hơn (có reference) | Trung bình (vẫn hallucinate được) |

::: tip Khuyến nghị thực hành
Hầu hết scenario, **thử RAG trước**. Ưu: không train, knowledge update real-time, answer trace được. Chỉ khi cần đổi "behavior pattern" của model (output format, language style, reasoning) mới fine-tune. Phương án mạnh nhất thường là **RAG + fine-tuning combo**.
:::

---

## Tổng kết

RAG là tech thực dụng nhất để land LLM hiện tại. Giá trị core: answer có dẫn chứng, knowledge update real-time, hallucination control được.

Điểm key:

1. **RAG giải**: knowledge LLM outdated, thiếu private data, dễ hallucinate
2. **3 stage**: index (offline) → retrieve (online find) → generate (synthesize answer)
3. **Chunking là nền**: chất lượng chunk quyết định chất lượng retrieval
4. **Retrieval là key**: hybrid + rerank = combo tốt nhất hiện tại
5. **Architecture evolve**: Naive → Modular, ngày càng thông minh
6. **RAG + fine-tuning bổ sung**: scenario thường thử RAG trước

::: tip 2026 update
- **Anthropic Contextual Retrieval** (10/2024): inject context trước embedding → -49% retrieval failure
- **GraphRAG** (Microsoft) cho multi-hop reasoning
- **Multimodal RAG**: text + image trong cùng vector space
- **Agentic RAG**: agent quyết khi nào retrieve, retrieve gì
- **Long context không thay RAG**: Gemini 2.5 1M token context vẫn dùng RAG vì cost, latency, control
- **Stack VN 2026**: Qwen3-Embedding + Cohere Rerank 3 + Claude Sonnet 5 + Qdrant
:::

## Đọc thêm

- [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [LlamaIndex docs](https://docs.llamaindex.ai/)
- [RAG Survey paper](https://arxiv.org/abs/2312.10997)
- [Anthropic Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Microsoft GraphRAG](https://microsoft.github.io/graphrag/)
- [Vector DB comparison](https://superlinked.com/vector-db-comparison)
- [RAG chuyên sâu trong course này](/vi-vn/stage-3/ai-advanced/rag-introduction/)
