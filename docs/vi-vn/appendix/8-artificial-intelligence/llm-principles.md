# Nguyên lý hoạt động của LLM

> 💡 **Hướng dẫn**: chương này không cần nền lập trình, qua interactive demo dẫn bạn hiểu sâu nguyên lý underlying của LLM. Từ tokenization cơ bản đến cách GPT train và inference.

<LlmQuickStartDemo />

## 0. Mở đầu: từ ngôn ngữ người tới tính toán máy

Người giao tiếp bằng ngôn ngữ, máy tính bằng số.
**LLM** là cầu nối 2 thế giới này.

Task core duy nhất: **biến "hiểu ngôn ngữ" thành "tính toán toán học"**.

3 thách thức core:
1. **Translate**: biến text thành số? (Tokenization & Embedding)
2. **Efficiency**: cho máy tính nhanh? (matrix operation)
3. **Memory**: cho máy hiểu context? (Transformer model)

---

## 1. Bước 1: Tokenization

Máy tính không hiểu "hamburger", chỉ hiểu số.
Task đầu: **cắt text thành unit nhỏ nhất máy hiểu**.

### 1.1 Tokenization là gì?

Cắt câu thành các "word unit" (Token).

- **Tiếng Anh**: có space, dễ tách (`I love AI`)
- **Tiếng Trung/Việt**: ít space hơn, cần algorithm

#### Tokenizer

Program thực hiện tokenization gọi là **Tokenizer**. Như translator, biến text người thành số.

LLM hiện đại (GPT-4) dùng **Subword Tokenization** (BPE algorithm). Thông minh ở: **từ phổ biến giữ nguyên, từ hiếm tách**.

Ví dụ BPE thực (GPT-4 Tokenizer):

**Input**: `"The quick brown fox jumps over the lazy dog. \n今天天气真不错！"`

**Token list**:
```text
index=791,   string='The' 
index=4062,  string=' quick' 
index=14198, string=' brown' 
index=39935, string=' fox' 
index=83368, string=' jumps'
index=927,   string=' over' 
index=279,   string=' the' 
index=16053, string=' lazy' 
index=3290,  string=' dog' 
index=13,    string='.' 
index=198,   string='\n'
index=33838, string='今天'
index=54580, string='天气' 
...
```

> **Xử ký tự hiếm**: nếu gặp char không có trong vocab, model fallback **Byte level encoding**. Đảm bảo **không bao giờ OOV** (Out Of Vocabulary).

<TokenizationDemo />

**Key**: LLM xử **Token ID** (chuỗi số index), không phải word.

---

## 2. Vấn đề core: cho máy "tính" ngôn ngữ thế nào?

Ý tưởng đơn giản: cho mỗi từ 1 số (ID).
- Apple → ID 10
- Banana → ID 20

### 2.1 Sao không dùng ID đơn giản?

Máy sẽ coi "10" và "20" là 2 số không liên quan. Nếu vocab 100k từ, cần array dài 100k để biểu diễn 1 từ (One-Hot encoding), 99999 vị trí là 0, chỉ 1 vị trí là 1.

- **Nhược 1**: lãng phí (sparse)
- **Nhược 2**: không có nội hàm (không biết "apple" và "banana" đều là fruit)

### 2.2 Solution: Embedding (dense vector)

Để biểu đạt 1 từ **hiệu quả + có nội hàm**, dùng **Embedding**.
Không dùng array dài 0/1, mà array ngắn fill float (vd 512 số):

`[0.8 (fruit), 0.1 (red), 0.9 (sweet)...]`

Vừa nén data, vừa biến semantic thành "coordinate" tính toán được.

<EmbeddingDemo />

---

## 3. Từ word tới matrix

### 3.1 Sao phải matrix?

1 câu nhiều từ:
- 1 từ = 1 row số (vector)
- 1 câu = nhiều row stack lại

Đó là **matrix**.

Stack thành matrix vì hardware core hiện đại — **GPU** — sinh ra cho matrix operation. Chỉ khi ngôn ngữ thành matrix, mới tận dụng được parallel của GPU → inference + training hiệu quả.

### 3.2 Pipeline đầy đủ

1. **Tokenize**: cắt text
2. **Index**: fragment → ID
3. **Embedding**: ID → vector (semantic + nén)
4. **Stack**: vector → matrix (cho GPU)

<TokenizerToMatrix />

---

## 3.5 Insert: "model" thực chất là gì?

Trước architecture cụ thể, hiểu "model" theo cách phổ thông:

**Model** = **function siêu phức tạp** hoặc **black box**.

- **Input**: 1 đống số (Token ID)
- **Process**: trong black box có hàng tỉ parameter (tỉ knob), thực hiện phép cộng-trừ-nhân-chia điên cuồng
- **Output**: 1 đống số khác (predict, vd probability từ tiếp)

**Ẩn dụ**: model như **đầu bếp nhiều kinh nghiệm**:
1. Input (nguyên liệu): bạn cho thịt bò, khoai tây, cà chua
2. Model (não đầu bếp): dựa hàng nghìn công thức đã học, tính nhanh trong đầu
3. Output (món): cuối ra 1 đĩa bò hầm khoai

**Training** = cho đầu bếp từ học việc, thử sai hàng tỉ lần. Mặn quá → chỉnh "knob muối", nhạt → chỉnh "knob lửa", tới khi nấu món ngon ổn định.

LLM = "đầu bếp đọc hết sách nhân loại", nhưng nấu không phải món, mà text.

## 4. Đường evolution: từ RNN tới Transformer

Có data (Token), đầu bếp (model), giờ xem đầu bếp này nghĩ thế nào.

Lịch sử AI, 2 "cách nghĩ" (architecture): **RNN** và **Transformer**.

### 4.1 Cách cũ ngốc: RNN (game truyền tin)

Model sớm (RNN) xử 1 câu như **game truyền tin**:

1. Đọc từ 1 "tôi", nhớ trong đầu, truyền cho bước 2
2. Đọc từ 2 "thích", kết hợp memory, update, truyền tiếp
3. Cứ thế tới hết

**2 nhược tử mạng**:

1. **Chậm (không parallel)**: phải đợi người trước truyền xong, người sau mới bắt đầu. Không cho 100 người làm cùng lúc.
2. **Quên (long-distance forget)**: truyền tới người 100, có thể đã quên người 1 nói "tôi" hay "bạn". Nên model viết bài dài hay trước-sau không khớp.

### 4.2 Design thiên tài: Transformer (round table)

2017, Google ra architecture mới — **Transformer**. Biến "game truyền tin" thành **round table**.

Mọi từ **1 lúc ngồi lên bàn**.

1. **Góc nhìn trên cao (parallel)**: mọi từ vào cùng lúc, không xếp hàng
2. **Attention mechanism**: vũ khí. Mỗi từ **trực tiếp** xem info từ khác trên bàn
   - Đọc "nó", model không phải nhớ truyền tin trước, mà trực tiếp 1 phát thấy "mèo" → hiểu "nó = mèo"

**Giải hoàn hảo RNN's pain**:
- **Nhanh**: cùng xem tài liệu, GPU fire full power
- **Không quên**: dù câu dài, từ 1 và từ 10000 cách "1 bước"

> **Tóm**:
> - **RNN**: như đi mê cung, mò từng bước, dễ lạc
> - **Transformer**: như view bản đồ thượng đế, điểm đầu-cuối thấy hết

#### Sao vẫn cần "position" info?

Transformer "all-in", không xử lý đặc biệt thì không phân biệt "tôi yêu bạn" và "bạn yêu tôi" (từ giống, chỉ thứ tự khác).

Nên dán **bảng số (position encoding)** cho mỗi từ, báo model ai vị trí 1, ai vị trí 2.

### 4.3 Tech hot: KV Cache

Khi gen text dài, càng về sau càng chậm hoặc tốn VRAM. Vì model phải "nhớ" content đã gen.

**Transformer "ghi chú" thế nào?**

Trong attention mechanism, mỗi từ sinh `Key (K)` và `Value (V)` vector, cho từ sau "query".

- Khi gen từ 100, cần xem lại K, V của 99 từ trước
- Nếu mỗi lần re-compute K, V của 99 từ → lãng phí!

**KV Cache**: **notebook tăng dần**.

1. Tính K, V từ 1 xong, save
2. Gen từ 2 → chỉ tính K, V của từ 2, ghép với K, V từ 1
3. Càng lưu càng nhiều

Đây là lý do long context tốn nhiều VRAM — **không phải model lớn, mà notebook (KV Cache) dày**.

<RNNvsTransformer />

---

## 5. Bóc tách: từ "tiếp tục viết" sang "hội thoại"

Nhiều người tưởng ChatGPT hiểu ta nói gì, thực tế bản năng nó chỉ 1: **đoán từ tiếp** (Next Token Prediction).

### 5.1 Bản năng: viết tiếp điên cuồng

Cho base model: "Hôm nay thời tiết đẹp", có thể tiếp: "đi công viên chơi đi".
Nhưng input: "Thủ đô Mỹ ở đâu?", có thể tiếp: "Thủ đô TQ ở đâu? Thủ đô Nhật?" (vì bắt chước format đề thi, không trả lời).

### 5.2 Kỹ thuật: dùng "script" để chat

Để biến thành chat assistant, engineer dùng cách **role-play**.

Trong input cho model, lén add **tag template**, để model tưởng đang viết tiếp 1 "kịch bản hội thoại".

Bạn thấy:
> User: hi

Model thực thấy:
> `<|user|>` hi `<|assistant|>`

Model thấy `<|assistant|>` → biết: "À, đến lượt tôi đóng vai assistant nói".

<TrainingInferenceDemo />

---

## 6. Từ "nói bậy" tới "good assistant" (Alignment)

Chỉ chat không đủ. Model gốc có thể dạy chế bom, chửi bậy.
Để thành ChatGPT lịch sự, an toàn, cần 2 bước cuối:

1. **SFT (Supervised Fine-Tuning)**:
   - Expert viết nhiều Q&A chất lượng cao, dạy model "nói chuyện tử tế"
   - Goal: model hiểu instruction, không tiếp tục viết loạn
   ```json
   {
     "messages": [
       { "role": "user", "content": "Dịch sang tiếng Anh: 'xin chào'." },
       { "role": "assistant", "content": "Hello." }
     ]
   }
   ```

2. **RLHF (Reinforcement Learning from Human Feedback)**:
   - **Chấm**: model sinh vài answer, human teacher chấm
   - **Reward/penalty**: nói tốt → reward, kém → penalty. Dần model "align" với human value
   ```json
   {
     "prompt": "Cách chế bom?",
     "chosen": "Xin lỗi, tôi không trả lời được câu này.",
     "rejected": "Đầu tiên bạn cần..."
   }
   ```

---

## 7. Frontier: Thinking Models, MoE, Linear Attention

### 7.1 "Thinking" là gì?

Người trả lời câu phức tạp (9.11 và 9.9 cái nào lớn?) không thốt ra ngay, mà suy nghĩ trong đầu.
**Thinking Model** học được **System 2 (slow thinking)** này.

- **System 1**: trực giác, thốt ra ngay, dễ sai
- **System 2**: sinh "Chain of Thought", reasoning từng bước, mới trả lời

<ThinkingModelDemo />

### 7.2 Training: từ "imitation" tới "exploration"

#### Mode truyền thống (SFT - imitation)

- Cho model xem reasoning của người, để nó **bắt chước**
- Giới hạn: model trần là chất lượng data người. Người không nghĩ ra (math khó), model cũng không học được.

#### Mode thinking (RL)

- **Không** cho process data, chỉ cho **verifier** cuối
- Vd cho math problem, model tự thử
- Sai → penalty. Đúng → reward
- **Aha moment**: sau hàng triệu thử, model phát hiện: **"Nếu trước output answer, viết vài bước derivation trên giấy nháp, tỉ lệ reward tăng đáng kể!"**
- Behavior "nghĩ trước, trả lời sau" được củng cố. Giống AlphaGo tự đấu tự học, vượt human.

### 7.3 Hướng dẫn thực: Prompt style đổi lớn

Dùng Thinking Model (DeepSeek-R1, o1) cần đổi prompt strategy:

| Đặc điểm | Traditional (GPT-4o, Claude 3.5) | Thinking (R1, o1, Claude with thinking) |
|:---|:---|:---|
| **Logic core** | System 1 (intuition) | System 2 (logic) |
| **Prompt kỹ thuật** | Dẫn CoT: "Hãy nghĩ từng bước..." | **Không** vẽ rắn thêm chân. Model tự CoT, dẫn tay sẽ nhiễu |
| **Độ rõ instruction** | Tách task phức tạp thành subtask | Đưa goal cuối thẳng, để model tự tách |
| **Scenario** | Sáng tạo, dịch, chit-chat | Math, code refactor, logic reasoning |

### 7.4 MoE (Mixture of Experts)

Thay vì 1 model lớn xử mọi thứ, có nhiều "expert" nhỏ, router chọn 1-2 expert kích hoạt cho mỗi token.

**Lợi ích**: parameter active < total parameter → fast inference với cost của model nhỏ, quality của model lớn.

**Đại diện**: Mixtral 8x7B (8 expert × 7B), DeepSeek V3 (671B total, ~37B active), GPT-4 (rumored MoE).

### 7.5 Linear Attention

Attention truyền thống là **O(n²)** (mỗi từ với mọi từ khác) → tốn memory + slow với long context.

**Linear Attention** giảm xuống O(n). Đại diện: **Mamba**, **RWKV**, **Linear Attention variants**.

Trade-off: faster + cheaper, nhưng quality hơi kém Transformer trên 1 số task.

---

## 8. Tổng kết

LLM = pipeline:
1. **Tokenize** → number
2. **Embed** → vector
3. **Stack** → matrix
4. **Transformer** (attention) → process
5. **Predict next token** → output
6. **Iterate** → text gen
7. **SFT + RLHF** → align với human

Trend 2026:
- **Thinking models** thành mainstream (Claude với extended thinking, GPT o-series, DeepSeek R series)
- **MoE** scale models hiệu quả
- **Long context** 1M+ token (Gemini, Claude)
- **Multimodal native** (Gemini Omni, GPT-5)
- **Cheaper** inference (per-token cost giảm 10x/năm)

::: tip 2026 Update cho VN dev
- **Best model tiếng Việt 2026**: Claude Sonnet 5, Gemini 2.5 Pro, GPT-5 — đều fluent
- **Open source tốt**: Qwen 3 series, Llama 4, DeepSeek V3 (free local)
- **Pricing**: Sonnet 5 $3/$15 per M token, Haiku 4.5 $0.80/$4
- **Local model deploy**: Ollama, LM Studio, vLLM cho self-host
- **Stack production**: Anthropic API (managed) hoặc Qwen self-host (data sovereignty)
:::

## Glossary

| Term | Giải thích |
|---|---|
| **Token** | Unit nhỏ nhất model xử lý (~3-4 char tiếng Việt) |
| **Embedding** | Vector dense biểu diễn semantic của token |
| **Attention** | Mechanism cho mỗi token "nhìn" tới mọi token khác |
| **Context Window** | Max token model xử trong 1 inference |
| **Transformer** | Architecture neural network dùng attention, base của LLM |
| **Pre-training** | Train trên corpus khổng lồ unsupervised |
| **SFT** | Fine-tune supervised với instruction data |
| **RLHF** | Align với human preference qua reinforcement learning |
| **Thinking Model** | Model có built-in reasoning chain trước answer |
| **MoE** | Mixture of Experts: nhiều sub-model, router chọn |
| **KV Cache** | Cache K-V tensor cho fast incremental gen |
