# Context Engineering

> 💡 **Hướng dẫn**: Prompt engineering giải "nói rõ ràng thế nào", context engineering giải "cho model nhìn đúng info vào đúng thời điểm". Chương này xoay quanh: **trong context window có hạn, làm sao để model hiểu bạn + không đốt cháy ngân sách?**

Trước khi bắt đầu, bổ sung:
- **Token**: xem [LLM principles](./llm-principles.md) phần Tokenization
- **Prompt**: chưa quen System/User/Assistant → xem [Prompt engineering](./prompt-engineering/)

---

## 0. Mở đầu: sao chat một lúc nó quên, mà còn càng đắt?

<AgentContextFlow />

Khi dùng LLM thực tế, hay gặp:
- Chat nửa chừng, model "quên" điều kiện key trước
- Long convo, câu trả lời mâu thuẫn, khó giữ 1 setting
- Số turn nhiều, hoá đơn tăng như taxi

Trực giác: **"Model nhớ kém"**. Nhưng thường vấn đề không phải model "không biết nhớ", mà bạn **không design context được**.

<IntroProblemReasonSolution />

Chỉ "viết prompt tốt" không đủ. Cần engineering method có hệ thống, trong window + budget có hạn, đảm bảo model luôn có info key. Đây là **context engineering**.

---

## 1. "Context engineering" là gì?

> Context engineering = method engineering build + manage "info environment" cho LLM, quyết "nó thấy gì, ignore gì, lúc nào thấy", để complete task ổn định trong context window có hạn.

Hiểu đơn giản 3 việc: organize info, control window, manage cost.

Scenario thường dùng:
- Conversational Agent + chatbot CS
- Code/doc assistant
- Multi-turn tool call + long workflow

Tiếp theo, từ "blood lesson" thật của 1 team, xem họ tiến hoá từ "chỉ viết Prompt" sang "context engineering" thế nào.

---

## 2. "Blood lesson": pit Manus team đã ngã

Case từ **Manus** (general AI Agent).

Khác chat thường, Manus phải tự plan + call tool complete long task (vài chục đến trăm turn).

Mâu thuẫn core:
- **Không nhớ**: info key mất, task gián đoạn
- **Nhớ hết**: cost + latency bùng nổ, vượt window

Manus team refactor nhiều lần, hiểu: **context không phải "viết", mà "design".**

### 2.1 4 lần refactor dạy gì?

| Stage | Vấn đề | Idea lúc đó | Kết quả |
| :--- | :--- | :--- | :--- |
| **1** | AI quên | "Viết thêm prompt là OK" | Càng viết càng dài + đắt |
| **2** | Info quan trọng bị đẩy ra | "Copy nhiều lần" | Text dài hơn, cost cao hơn |
| **3** | Hoá đơn cao | "Reuse compute trước được không?" | Tìm cách giảm cost compute lặp |
| **4** | Long doc xử không nổi | "Cần lúc nào query lúc đó?" | Build "thư viện + on-demand retrieval" |

**Insight**: **Không phải nhớ càng nhiều càng tốt, mà nhớ càng khéo càng tốt**.

### 2.2 "Trí nhớ" AI giống cái gì?

**RAM PC** = **disk**:
- Capacity lớn
- Giá thấp
- Read/write chậm, tìm cần thời gian

**Context AI** = **bảng đen nhỏ**:
- Read/write nhanh: model thấy hết trong 1 call
- Capacity có hạn: viết đầy phải xoá cũ
- Mỗi token thêm = compute + phí

**Bài học Manus**: **Bảng đen dùng tiết kiệm + khéo, đừng dùng làm bách khoa toàn thư**.

---

## 3. Step 1: Hiểu cost - tiền chi đâu?

### 3.1 Sao xem cost trước?

1 convo AI điển hình, tiền chi:

```
💰 Cost (1 convo):
├─ 70% xem lại content cũ ("Vừa chat gì?")
├─ 20% xử content mới ("Giờ nói gì?")
└─ 10% gen response ("Trả lời sao?")
```

**Phát hiện sốc**: **70% tiền để AI re-read content cũ!**

### 3.2 KV Cache là gì?

Concept tech core: **KV Cache (key-value cache)** — "speed lookup table trí nhớ ngắn hạn" của AI.

- **Không KV Cache**: AI mỗi lần như lần đầu thấy bài, đọc từ đầu, hiểu, compute.
- **Có KV Cache**: AI lưu kết quả compute (pre-fill) của phần đã đọc. Lần sau nếu đầu không đổi, trực tiếp lấy memory.

Như:
> Đi thi.
> **A**: mỗi lần phải đọc lại sách giáo trình từ đầu, rồi mới làm bài. (Chậm, mệt, đắt)
> **B**: bạn đã thuộc lòng (Cache), ngồi xuống làm bài luôn. (Nhanh, dễ, rẻ)

Trong billing cloud, **"sách đã thuộc" (Cache Hit)** thường rẻ hơn 90%+ **"sách mới đọc" (Cache Miss)**.

### 3.3 "Thuộc lòng" vs "tra mới" — chênh giá

Claude vd:
- **Tra mới** (no cache): $3.00 / 1M token
- **Đã thuộc** (cache): $0.30 / 1M token
- **Chênh 10x**!

**Practice Manus**: cho AI "thuộc lòng" → cost từ **$0.15 xuống $0.02**, **giảm 87%**!

<ContextWindowVisualizer />

### 3.4 Đừng để timestamp huỷ "cache"

Nhiều dev quen viết "current time" ở câu đầu System Prompt, nghĩ rất nghiêm túc. **Đây là anti-pattern lớn nhất context engineering.**

Tưởng: bạn thuộc cả sách lịch sử (System Prompt), nhưng dòng đầu viết "second hiện tại". Nếu mỗi giây đổi, mọi thứ bạn thuộc giây trước → bỏ → phải học lại từ đầu.

Đây là tử huyệt **KV Cache**: **đầu đổi → sau phải compute lại hết.**

#### Sai: dynamic info ở đầu
```text
System: Hiện 2026-05-26 12:00:01. Bạn là assistant...
(1 phút sau)
System: Hiện 2026-05-26 12:01:01. Bạn là assistant...
```
**Hậu quả**: chỉ vài chữ đổi, nhưng vì ở đầu, 99% content cố định sau không reuse cache. Mỗi request như lần đầu.

#### Đúng: static-dynamic tách
```text
System: Bạn là assistant... (vài nghìn từ rule cố định + KB)
User: (current time pass qua tool call hoặc user message)
```
**Lợi**: vài nghìn từ rule không bao giờ đổi, AI chỉ "thuộc" 1 lần.

👇 **Click thử**: bật "thuộc lòng speedup", click "gửi request mới" nhiều lần. Quan sát: TTFT (Time to First Token) thay đổi thế nào?

<KVCacheDemo />

---

## 4. Step 2: Sliding window - khi "trí nhớ" thành "cost"

Convo dài, vấn đề đầu tiên: **window đầy sao?**

### 4.1 Sao "FIFO" có vấn đề?

Đơn giản nhất: **Sliding Window** — mới vào, cũ ra.

Nghe công bằng, nhưng thực tế tai hoạ.

**Scene**:
```text
History:
[1] User: Tôi là Hoàng, quản payment system
[2] User: Project dùng Go
[3] User: DB là PostgreSQL
...
[20] User: Viết giúp API
```
**Kết quả**: tới câu 20, câu 1 đã bị đẩy ra. AI quên hết bạn là ai.

**Bản chất vấn đề**: chiến lược này coi **info quan trọng** (identity, tech stack) + **rác** ("OK", "Nhận") như nhau.

### 4.2 "Lost in the Middle" - AI hay bỏ sót info key

Ngoài "quên nhanh", AI có quirk: **cũng "bỏ sót"**. Research: **AI nhạy với đầu + cuối, hay ignore middle**. Hiện tượng **Lost in the Middle**.

**U-curve memory**:
```text
Position: đầu → giữa → cuối
Memory:   cao →  thấp →  cao
```

👇 **Click thử**:
1. **"Sliding window"**: gửi nhiều message, xem cũ bị đẩy ra
2. **"Lost in middle"**: info key ở middle → success rate thấp nhất?

<SlidingWindowDemo />
<LostInMiddleDemo />

**Giải pháp**: info key đặt **đầu** (system prompt) hoặc **cuối** (user question).

---

## 5. Step 3: Selective retention - "ghim" info key thế nào?

FIFO không đáng tin → câu trả lời Manus: **build "info hierarchy"**.

### 5.1 Sao phân cấp info?

Không treat đều mọi info, mà theo importance:

| Cấp | Loại | Đối xử | Cost |
| :--- | :--- | :--- | :--- |
| **VIP** | System setting, user identity | **Giữ luôn** | +15% |
| **Quan trọng** | Task goal hiện tại | **Giữ trong task** | +10% |
| **Thường** | Convo history thường | **Giữ 5 turn gần** | Baseline |
| **Bỏ được** | KB retrievable | **Tra khi cần** | -60% |

**Core**: **Tăng 25% cost, đổi 90% info key giữ được**.

### 5.2 "Đóng đinh" strategy

Tưởng context window là 1 bảng đen:
- **VIP**: đóng đinh chặt ở trên (System Prompt)
- **Quan trọng**: gắn nam châm giữa (Context Injection)
- **Thường**: viết phần dưới, đầy xoá cũ (Sliding Window)

👇 **Click thử**: thử "ghim" 1 convo quan trọng. Convo tiếp, info ghim còn không?

<SelectiveContextDemo />

---

## 6. Step 4: RAG - khi "trí nhớ" cần "thư viện"

Đôi khi info quá nhiều (vài trăm trang doc), bảng đen không đủ. Cần ngoài não — **RAG (Retrieval-Augmented Generation)**.

### 6.1 Sao "bảng đen nhỏ" không đủ?

Manus xử doc kỹ thuật triệu từ, so 2 cách:

1. **Full write**: nhét hết vào context.
   - **Hậu quả**: bảng đen full ngay, xử cực chậm, theo "lost in middle" AI không nhớ middle.
   - **Cost**: ~$50/lần, chờ 15s.
2. **On-demand retrieval (RAG)**: query thư viện (DB), chỉ copy đoạn liên quan lên bảng.
   - **Hậu quả**: bảng sạch, AI focus info key.
   - **Cost**: ~$0.5/lần, chờ 2s.

**Giảm 99% tiền, 87% time!**

### 6.2 "Tra tài liệu" best practice

Kinh nghiệm Manus:
- **Mỗi sách xé bao to?** 500-1000 từ best
- **Mỗi lần tra mấy sách?** 3-5, nhiều hơn gây nhiễu
- **Relevance bao nhiêu mới tra?** Similarity >0.7

👇 **Click thử**: gõ câu hỏi (vd "reset password thế nào"), xem system tìm trong đống doc.

<RAGSimulationDemo />

---

## 7. Step 5: Compression - "bảng đen" viết dày hơn

Info đều quan trọng, không xoá được, không muốn query?
Chỉ còn **viết chữ nhỏ hơn** — **context compression**.

### 7.1 Khi nào "viết tắt"?
- Material retrieved quá dày (>2000 từ)
- Convo history dài dòng (>80% bảng)
- Cần trả nhanh

### 7.2 3 cảnh giới "viết tắt"

| Cách | Tỷ lệ | Giữ gì | Use | Tiết kiệm |
| :--- | :--- | :--- | :--- | :--- |
| **Summary** | 70% | Ý chính | Quick understand | -30% |
| **Bullet** | 50% | Key points | Structured output | -50% |
| **Table** | 30% | Core data | Code process | -70% |

👇 **Click thử**: chọn strategy, xem text dài → ngắn:

<ContextCompressionDemo />

---

## 8. System integration: "Memory Palace" của AI

Đã học các strategy riêng:
- **KV Cache**: tiết kiệm (Ch 3)
- **Sliding Window**: dọn chỗ (Ch 4)
- **Tiered retention**: giữ key (Ch 5)
- **RAG**: external (Ch 6)

Giờ ghép thành lâu đài — **"Memory Palace"** của Manus.

### 8.1 Lắp context như xây nhà

Context như toà nhà tầng. Mỗi tầng có chức năng + rule.

👇 **Click thử**: "bắt đầu xây", xem lâu đài lên từng tầng.

<MemoryPalaceDemo />

### 8.2 Sao design này mạnh?

Triết lý palace giải 3 mâu thuẫn:

1. **Móng (System Prompt) — giải "đắt"**
   - Mâu thuẫn: system setting dài nhất, mỗi lần phải gửi
   - Giải: ở tầng đáy, KV Cache. Vài trăm turn convo, cost ~**0**

2. **Cột (Task Context) — giải "quên"**
   - Mâu thuẫn: convo dài, AI quên goal
   - Giải: tiered retention, "ghim" task ở tầng 2. Bao nhiêu turn cũng giữ

3. **Trên (Chat & RAG) — giải "loạn"**
   - Mâu thuẫn: convo mới + retrieved material trộn dễ chóng mặt
   - Giải:
     - **Phòng khách (chat)**: sliding window, giữ 5-10 câu mới
     - **Thư viện (RAG)**: dùng xong đi, không chiếm chỗ

### 8.3 Hiệu quả thực

Manus deploy production:
- **Tiết kiệm**: móng "thuộc" → cost mỗi turn giảm **84%**
- **Nhanh hơn**: không đọc từ đầu, response time từ 8s → **2s**
- **Chính xác hơn**: info key ghim chặt, không quên việc

---

## 9. Template thực chiến

<MemoryPalaceActionDemo />

### 📝 Design dùng ngay

Nếu design system như Manus, không chỉ nhìn Prompt viết sao, mà **system architecture điều phối context thế nào**.

#### Scene 1: Full-stack Agent (long-memory)
> **Challenge**: task chu kỳ dài, dễ quên req + project background
> **Strategy**: System (identity) + Task (ghim goal) + Chat (sliding)

**1. System Prompt (Layer 1 & 2)**
```markdown
# Layer 1: Identity (System Prompt) - không đổi, KV Cache
Bạn là senior full-stack engineer, giỏi Python + Vue3.
Code style:
- Variable theo PEP8
- Logic key phải có comment
- Ưu tiên util function project có

# Layer 2: Task lock - trong task không xoá
Task: refactor payment_module
Constraint:
1. Compatible v1.0 API
2. DB migration phải idempotent
3. Deadline: thứ 6 tuần này
```

**2. Logic assemble (pseudo-code)**
```python
def build_engineer_context(user_input, chat_history, task_info):
    context = []
    
    # 1. Móng: identity (KV Cache)
    context.append(SYSTEM_PROMPT)
    
    # 2. Cột: task lock (pinned)
    context.append(f"Task: {task_info}")
    
    # 3. Retrieval: code snippet (RAG)
    relevant_code = search_codebase(user_input)
    if relevant_code:
        context.append(f"Ref code:\n{relevant_code}")
    
    # 4. Interaction: chat history (Sliding Window)
    recent_chat = chat_history[-10:] 
    context.extend(recent_chat)
    
    # 5. Input mới
    context.append(user_input)
    
    return context
```

#### Scene 2: Smart CS Agent (precise Q&A)
> **Challenge**: nhạy cost, tuyệt đối không bịa
> **Strategy**: System (strict constraint) + RAG (dynamic inject)

**1. System Prompt (Layer 1)**
```markdown
# Layer 1: Identity
Bạn là chuyên viên CS e-commerce.
Rule:
1. Tone: nhẹ nhàng, chuyên nghiệp, ngắn gọn
2. **CẤM** bịa, chỉ theo [reference] trả lời
3. Không có trong reference: "Xin lỗi, vấn đề này tôi chuyển human CS"
```

**2. Logic assemble (pseudo-code)**
```python
def build_support_context(user_input):
    context = []
    
    # 1. Móng: identity
    context.append(SYSTEM_PROMPT)
    
    # 2. Library: dynamic retrieval (RAG)
    docs = vector_db.search(user_input, top_k=3)
    
    context.append("【Reference start】")
    for doc in docs:
        context.append(doc.content)
    context.append("【Reference end】")
    
    # 3. Interaction: history rất ngắn
    context.extend(get_recent_chat(limit=3))
    
    context.append(user_input)
    
    return context
```

---

## 10. Glossary

| EN | VN | Giải thích |
| :--- | :--- | :--- |
| **Context Window** | Cửa sổ context | Max text length model xử 1 lúc (input + output). Vượt = truncate |
| **Token** | Token | Đơn vị nhỏ nhất LLM xử. ~0.75 từ tiếng Anh hoặc 0.5 chữ Hán |
| **KV Cache** | KV cache | Inference speedup, cache attention K-V tránh re-compute prefix lặp |
| **RAG** | RAG | Retrieval-Augmented Generation. Tra KB ngoài trước, làm context |
| **Sliding Window** | Sliding window | Strategy giữ token count cố định, vào mới đẩy cũ ra |
| **Lost in Middle** | Lost in middle | LLM nhớ đầu + cuối tốt, ignore middle |
| **System Prompt** | System prompt | Instruction đầu convo, set identity + behavior + style |
| **Few-shot** | Few-shot | Cho vài Q-A example trong prompt |
| **Chain of Thought** | CoT | Dẫn model output reasoning steps trước answer |
| **Hallucination** | Ảo giác | Model tự tin gen info sai/không tồn tại |
| **Embedding** | Embedding | Convert text → high-dim vector |
| **Vector DB** | Vector DB | DB chuyên store + retrieve vector |
| **Temperature** | Temperature | Hyperparam control randomness. Cao = sáng tạo, thấp = chắc |
| **TTFT** | TTFT | Time to First Token. Time từ gửi request đến token đầu ra |

---

## Tổng kết: bản chất context engineering

4 lần refactor Manus dạy:

**Practice**: không phải nhớ nhiều = tốt, mà nhớ có structure + có selectivity.

**Cost view**:
- Đa số waste từ compute lặp prefix → giải bằng prefix stable + cache
- Info key bị xoá nhầm → do "treat đều" của sliding window → giải bằng tiering + ghim
- Doc cực dài + KB → chỉ tăng window không thực tế → kết hợp retrieval + compression

Mục tiêu: trong model + context limit cho trước, mỗi token đầu tư có mục đích rõ.

::: tip 2026 cho VN dev
- **Long context era**: Gemini 2M context, Claude 200K, GPT-4o 128K — nhưng vẫn cần context engineering
- **Prompt caching**: Claude + Gemini + OpenAI đều support, dev phải tận dụng
- **MCP + context**: dùng MCP để load context on-demand, không nhét hết
- **Agent memory libs**: mem0, Letta (formerly MemGPT) — high-level abstraction
- **Bài tập**: build assistant với 4 layer (System + Task + RAG + Chat), đo cost trước/sau
:::
