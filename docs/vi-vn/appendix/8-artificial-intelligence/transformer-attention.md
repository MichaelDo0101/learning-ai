---
title: 'Transformer và Attention: engine core của LLM'
description: 'Hiểu sâu Transformer architecture và attention mechanism, base technical của GPT, BERT.'
---

# Transformer và Attention: engine core của LLM

2017, Google paper **"Attention Is All You Need"** ra Transformer architecture, thay đổi game NLP. Bỏ RNN truyền thống, chỉ dựa attention mechanism — đạt performance mạnh hơn + training efficiency cao hơn. Hôm nay gần như mọi LLM — GPT, BERT, T5, LLaMA, Claude, Gemini — đều build trên Transformer.

<TransformerQuickStartDemo />

---

## 1. Vấn đề của RNN và breakthrough của Transformer

Trước Transformer, xử sequence data (text, speech) chủ yếu là RNN và variants (LSTM, GRU). Process từng element tuần tự, maintain hidden state nhớ history.

### 1.1 3 khiếm khuyết tử mạng của RNN

**Sequential dependency, không parallel được**: phải đợi time step trước xong mới xử từ sau. Training cực chậm, không tận dụng GPU parallel.

**Long-distance dependency decay**: kể cả LSTM, với long text, info đầu bị "forget". Bài 500 từ, model khó nhớ info key đầu bài.

**Gradient vanishing/exploding**: backprop qua time step, gradient dễ vanish/explode, training không ổn định.

### 1.2 Breakthrough revolutionary của Transformer

Transformer qua **Self-Attention mechanism**, cho model "1 mắt thấy hết" sequence, tính trực tiếp relationship giữa 2 position bất kỳ — không cần truyền info từng bước.

<RnnVsTransformerDemo />

::: tip Ưu thế core Transformer
- **Parallel computation**: mọi position attention tính cùng lúc, training tốc độ tăng hàng chục lần
- **Global view**: capture long-distance dependency trực tiếp, không bị giới hạn sequence length
- **Scalability**: architecture đơn giản thống nhất, dễ stack network sâu
:::

---

## 2. Architecture đầy đủ Transformer

Gồm 2 phần: **Encoder** và **Decoder** — hiểu input + sinh output.

<TransformerArchitectureDemo />

### 2.1 Encoder

Ví dụ câu "số dư trong account ngân hàng không đủ". Khi process từ "số dư", auto tính relevance với từ khác:
- "Số dư" - "account": cao (0.35)
- "Số dư" - "ngân hàng": trung (0.20)
- "Số dư" - "trong", "của": thấp (0.05-0.10)

Relevance không phải định nghĩa tay, mà model tự học từ data.

<SelfAttentionDemo />

### 2.2 Process tính attention

3 step key:
1. **Sinh Q, K, V vector**: mỗi từ qua 3 linear transformation khác nhau, sinh Query, Key, Value
2. **Tính attention weight**: Query dot product với mọi Key → similarity score
3. **Weighted sum**: dùng attention weight cho Value vector weighted sum → output cuối

---

## 3. Query, Key, Value: 3 kiếm thủ attention

Lấy ý tưởng từ information retrieval, map mỗi từ vào 3 vector space khác.

### 3.1 Vai trò 3 vector

**Query**: "tôi đang tìm gì". Query intent của từ hiện tại, dùng match với Key từ khác.

**Key**: "tôi là gì". Feature identifier của mỗi từ, để Query retrieve.

**Value**: "content của tôi là gì". Info thực sự truyền, được weight-sum theo attention weight.

Khéo léo: **similarity computation (Q·K) và information passing (V) decoupled**. Model học được "từ nào nên attend" và "sau attend extract gì" là 2 vấn đề độc lập.

<QKVMechanismDemo />

### 3.2 Công thức tính attention

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

- `QK^T`: dot product Q và K → similarity matrix
- `√d_k`: scaling factor, tránh dot product quá lớn → softmax gradient vanish
- `softmax`: chuyển similarity thành probability distribution (attention weight)
- Nhân với `V`: weighted sum Value theo attention weight

---

## 4. Multi-Head Attention: từ nhiều góc hiểu semantic

1 attention head chỉ học 1 loại pattern. Multi-Head Attention dùng nhiều head parallel, mỗi head học 1 góc:

- Head 1 focus syntactic relation (subject-verb)
- Head 2 focus semantic similarity
- Head 3 focus long-distance dependency

Sau, concat tất cả head output → linear projection.

<MultiHeadAttentionDemo />

```
MultiHead(Q,K,V) = Concat(head_1, ..., head_h) W^O
where head_i = Attention(QW^Q_i, KW^K_i, VW^V_i)
```

Typical: GPT-3 dùng 96 head, Llama 70B dùng 64.

---

## 5. Positional Encoding: encode "thứ tự"

Transformer "all-in" — không phân biệt "tôi yêu bạn" và "bạn yêu tôi" nếu không xử position.

### 5.1 Sinusoidal Positional Encoding (paper gốc)

Dùng sin/cos để encode position:

```
PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

Cộng vào input embedding.

### 5.2 Variants modern

- **Learned Positional Embedding**: GPT-2 dùng — learn position embedding như word embedding
- **RoPE (Rotary Position Embedding)**: Llama, GPT-NeoX dùng — rotation matrix trên Q và K
- **ALiBi (Attention with Linear Biases)**: thêm bias dựa distance, hỗ trợ long context tốt

<PositionalEncodingDemo />

---

## 6. Decoder và Masked Attention

Decoder dùng **Masked Self-Attention**: khi sinh từ thứ i, chỉ thấy được từ 1 đến i, không thấy được "tương lai".

```
Mask = upper triangular -inf matrix
softmax(QK^T + Mask) → upper triangular phần thành 0
```

Đây là cách GPT auto-regressive: sinh từng token, mỗi token chỉ dựa token trước.

---

## 7. Feed-Forward Network và Residual Connection

Sau attention, mỗi token qua **Feed-Forward Network** (2-layer MLP):

```
FFN(x) = ReLU(x W_1 + b_1) W_2 + b_2
```

**Residual Connection** giúp gradient flow tốt:
```
x = LayerNorm(x + Attention(x))
x = LayerNorm(x + FFN(x))
```

Cho phép stack 96, 128, 256 layer mà vẫn train được.

---

## 8. Variants Transformer

| Variant | Đặc điểm | Đại diện |
|---|---|---|
| **Encoder-only** | Chỉ encoder, classification/embedding | BERT, RoBERTa |
| **Decoder-only** | Chỉ decoder, generation | GPT, Llama, Claude |
| **Encoder-Decoder** | Cả 2, seq2seq | T5, BART |
| **Sparse Attention** | Attention chỉ subset → faster | Longformer, BigBird |
| **Linear Attention** | O(n) thay O(n²) | Mamba, RWKV |
| **MoE** | Mixture of Experts | Mixtral, DeepSeek V3 |

---

## 9. Optimization 2026

Long context (1M+ token) đòi optimization:

### 9.1 KV Cache compression

- **Multi-Query Attention (MQA)**: 1 K, V cho mọi head → giảm memory
- **Grouped-Query Attention (GQA)**: nhóm head share K, V — balance giữa quality và efficiency (Llama 3, Gemini)
- **MLA (Multi-Latent Attention)**: DeepSeek innovation, compress KV cache cực mạnh

### 9.2 Flash Attention

Algorithm optimize memory access pattern → 2-4x faster training/inference, support longer context.

### 9.3 Sliding Window Attention

Mỗi token chỉ attend tới N token gần nhất → O(n) thay O(n²). Combine với global token cho long-range.

---

## 10. Tổng kết

Transformer = **attention + position encoding + parallel architecture**.

Tại sao thắng RNN:
- ✅ Parallel (fast training)
- ✅ Long-range (no forget)
- ✅ Scalable (stack được sâu)

Tại sao base của mọi LLM:
- Pre-train scale với data + compute
- Architecture stable, đã prove
- Eco system khổng lồ (PyTorch, JAX, FlashAttention)

::: tip 2026 Update
- **MoE phổ biến**: Mixtral, DeepSeek V3, GPT-4 (rumored), Gemini Ultra
- **Long context standard**: 200K (Claude), 1M+ (Gemini)
- **Native multimodal**: ViT (vision) + Transformer text, unified architecture (Gemini Omni)
- **Hybrid models**: Transformer + Mamba (Jamba), best of both worlds
- **Test-time compute**: o1/R1 style — spend more compute at inference for better reasoning
- **VN ecosystem**: Qwen 3 series + Gemini cho tiếng Việt tốt nhất
:::

## Tài liệu

- [Attention Is All You Need (paper gốc)](https://arxiv.org/abs/1706.03762)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Karpathy nanoGPT](https://github.com/karpathy/nanoGPT)
- [Andrej Karpathy: Let's build GPT (YouTube)](https://www.youtube.com/watch?v=kCc8FmEb1nY)
- [Anthropic: Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/)
