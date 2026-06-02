---
title: 'Chương 5 — Context Engineering'
description: 'Cú shift 2025→2026: từ prompt sang context engineering. Attention budget, context rot, 4 thao tác Write/Select/Compress/Isolate, compaction, structured note-taking, just-in-time retrieval, prompt caching — kèm code Python và lab đo/bóp token.'
---

# Chương 5 — Context Engineering

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧩</p>

::: tip 🔥 Thực chiến — 30 giây
Agent của bạn càng chat lâu càng "lú"? Không phải model ngu — là **context bị nhồi rác**. Chương này dạy bóp gọn context cho đúng.
**💸 Ăn tiền ở đâu:** giảm 40–80% token mỗi lượt = hóa đơn API từ $200 còn $40–80/tháng.
:::

> **"Đa số lỗi agent năm 2026 không phải lỗi model — mà là lỗi context."**
> **Karpathy và CEO Shopify cùng chốt: kỹ năng cốt lõi giờ là *context engineering*.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Phân biệt context engineering vs prompt engineering.
- **Đo** token mỗi lượt + **bóp gọn** bằng compaction (có code).
- Áp **Write/Select/Compress/Isolate** + structured note-taking.
- Bật **prompt caching** để cắt chi phí.
:::

---

## 01 · Từ "prompt" sang "context"

- **Prompt engineering** — viết *lời chỉ dẫn* cho một lượt.
- **Context engineering** — quản **toàn bộ tập token** mỗi bước: system prompt + tool + dữ liệu lấy về + memory + lịch sử, **xuyên nhiều lượt**.

Khi chuyển từ "hỏi một câu" sang "agent chạy hàng trăm lượt", thứ cần quản không còn là một prompt mà là *cả dòng chảy ngữ cảnh*.

<AgentContextFlow />

---

## 02 · Context là tài nguyên hữu hạn

::: warning 💡 Hai nguyên lý khắc cốt
**1. Attention budget** — mỗi token nhét vào đều tiêu hao "sự chú ý" hữu hạn của model. Token nhiễu càng nhiều, model càng khó tập trung.

**2. Context rot** — độ chính xác **giảm** khi token tăng (do attention bậc hai của transformer). **Nhiều context ≠ tốt hơn.**
:::

→ Mục tiêu: tìm **tập token nhỏ nhất, tín hiệu cao nhất**. Không phải "nhồi đầy context window".

```python
# Đo nhanh "ngân sách" đang dùng (ước lượng token ≈ ký tự / 4 cho tiếng Anh)
def uoc_token(messages):
    return sum(len(str(m["content"])) for m in messages) // 4

print("Token đang dùng:", uoc_token(messages))   # in mỗi vòng để theo dõi
```

---

## 03 · Giải phẫu context

```
┌─────────────── CONTEXT WINDOW ───────────────┐
│ System prompt   (vai trò + hướng dẫn)        │
│ Tools           (định nghĩa + schema)        │
│ Retrieved data  (tài liệu/RAG lấy về)        │
│ Memory          (ghi chú dài hạn)            │
│ Message history (lịch sử hội thoại)          │
│ ── còn lại: chỗ cho model "suy nghĩ" ──      │
└──────────────────────────────────────────────┘
```
Mỗi phần cạnh tranh cùng một ngân sách → **biên tập không thương tiếc**.

---

## 04 · "Right altitude" cho system prompt

System prompt nên ở **độ cao vừa**, giữa hai cực sai:

```
❌ Quá thấp (hardcode cứng):
   "Nếu khách nói 'ship', trả 'phí ship 30k'. Nếu nói 'free', trả..."
   → giòn, mỗi tình huống một dòng, không bao quát.

❌ Quá cao (mơ hồ):
   "Hãy hỗ trợ khách thật tốt."
   → model đoán bừa, hành vi thất thường.

✅ Vừa (tối thiểu đủ outline hành vi):
   "Bạn là CSKH shop ABC. Trả lời giá/ship/tồn kho dựa trên tool.
    Không chắc → hỏi lại. Ngoài phạm vi → mời để lại SĐT."
```
> Nguyên tắc: viết **đủ để model làm đúng**, không thừa một dòng.

---

## 04b · Few-shot — đòn bẩy độ tin cậy cao nhất

Khi agent **chọn nhầm tool** hoặc **trả sai format**, cách mạnh nhất thường *không* phải mô tả dài hơn — mà **đặt vài ví dụ mẫu vào context** (few-shot):
```python
SYSTEM = """Bạn phân loại tin nhắn shop: GIA / TONKHO / SIZE / KHAC.
Ví dụ:
- "áo này bao nhiêu tiền?"        → GIA
- "còn hàng ko shop"             → TONKHO
- "em cao 1m60 mặc size nào"     → SIZE
- "shop ship COD ko"             → KHAC
Phân loại tin sau, CHỈ trả 1 nhãn."""
```
::: tip 🔑 Vì sao few-shot mạnh
- Dạy **format + ranh giới** mà mô tả bằng lời khó diễn đạt.
- Sửa nhanh **ca biên**: gặp ca phân loại sai → thêm chính nó làm ví dụ.
- 2–5 ví dụ thường đủ; nhiều quá thì tốn token (cân với *attention budget* §02).
:::
> Công thức chống "agent chọn nhầm tool": **mô tả tool tốt ([Ch4](./4-tool-design.md)) + few-shot ví dụ**.

---

## 05 · 4 thao tác context (kèm code)

::: tip 🔑 Write · Select · Compress · Isolate
1. **Write** — ghi ra **ngoài** context (file ghi chú) để dùng lại.
2. **Select** — *chọn lọc* kéo đúng thứ cần (RAG) thay vì nhồi tất cả.
3. **Compress** — *nén* lịch sử dài (summarize, cắt tool output thừa).
4. **Isolate** — *tách* ra nhiều sub-agent/sandbox.
:::

```python
# WRITE: agent ghi chú trạng thái ra ngoài
def write_note(text): open("NOTES.md", "a").write(text + "\n")

# SELECT: chỉ kéo đúng tài liệu liên quan (không nhồi cả KB)
def select_context(query, kb, k=3):
    return retrieve_top_k(query, kb, k)        # 3 đoạn liên quan nhất

# COMPRESS: nén lịch sử khi quá dài (xem mục 06)
# ISOLATE: giao việc cho sub-agent context riêng (xem Chương 7)
```

---

## 06 · 3 kỹ thuật long-horizon (kèm code)

### 1. Compaction (nén)
Gần đầy context → **tóm tắt** lịch sử, giữ quyết định quan trọng, bỏ tool output thừa.
```python
def compact(messages, nguong_token=8000):
    if uoc_token(messages) < nguong_token:
        return messages                         # chưa cần nén
    tom_tat = llm("Tóm tắt hội thoại sau thành 5 gạch đầu dòng, "
                  "GIỮ: quyết định + việc chưa xong; BỎ: chi tiết tool thừa.\n"
                  + str(messages))
    return [{"role": "user", "content": f"[Tóm tắt phiên trước]\n{tom_tat}"}]
```

### 2. Structured note-taking (agentic memory)
Agent **tự ghi chú ra file ngoài** và đọc lại — giữ mạch qua nhiều giờ / sau reset.
```
Agent → viết "đã làm X, còn lại Y, quyết định Z" vào NOTES.md
     → (context reset) → đọc lại NOTES.md → tiếp tục mạch
```
> 🇻🇳 Agent xử lý 50 đơn: ghi "đã xong đơn 1–30, đơn 31 chờ khách xác nhận" → reset vẫn biết tiếp từ đâu.

### 3. Sub-agent isolation
Giao khảo sát cho **sub-agent** context **sạch riêng**, chỉ trả **tóm tắt cô đọng** ([Chương 7](./7-multi-agent.md)).

<AgentMemoryDemo />

---

## 07 · Just-in-time retrieval

Thay vì **nạp hết trước** (RAG truyền thống), agent giữ **tham chiếu nhẹ** (đường dẫn, query, link) và **nạp lúc cần**.

```python
# ❌ Pre-retrieval: nạp cả 500 trang tài liệu vào context → ngộp, đắt
context = doc_500_trang

# ✅ Just-in-time: giữ con trỏ, nạp khi cần
refs = ["chinh_sach_doi_tra.md", "bang_gia.md"]   # chỉ là tên file
# Khi agent cần → tool đọc đúng file:
def read_doc(path): return open(path).read()       # nạp đúng lúc
```
| Pre-retrieval (cũ) | Just-in-time (mới) |
|---|---|
| Nạp hết trước, ngộp, đắt | Giữ con trỏ, nạp khi cần, gọn |
> Thực tế thường **hybrid**: nạp sẵn ít dữ liệu cốt lõi + lấy phần còn lại theo nhu cầu.

---

## 08 · Prompt caching — tiết kiệm tiền thật

Phần context **lặp lại** (system prompt, định nghĩa tool, tài liệu nền) có thể **cache** để không tính lại token đầu vào mỗi lượt.
```python
# Anthropic: đánh dấu phần ổn định để cache (đặt LÊN ĐẦU)
system = [
    {"type": "text", "text": HUONG_DAN_DAI,
     "cache_control": {"type": "ephemeral"}}      # ← cache phần này
]
# Phần thay đổi (câu hỏi mới) để sau → tận dụng cache
```
::: tip 💸 Quy tắc
Đặt phần **ổn định** (system, tool, tài liệu) lên đầu để cache; phần **thay đổi** (câu hỏi) để sau. Agent nhiều lượt → tiết kiệm rất đáng kể.
:::

---

## 09 · 4 kiểu "hỏng context"

::: warning 🚨 Đặt tên để debug
1. **Poisoning** — thông tin sai/độc lọt vào và lan ra ([Chương 11](./11-safety-guardrails.md)).
2. **Distraction** — quá nhiều thứ không liên quan → model lạc hướng.
3. **Clash** — thông tin mâu thuẫn nhau trong context.
4. **Confusion** — tool/định nghĩa chồng lấn → model rối.
:::

---

## 10 · 🧪 Lab: đo & bóp context

::: tip Bài thực hành (45 phút) — code
Lấy agent helpdesk [Chương 3](./3-build-first-agent.md):
1. Thêm `uoc_token(messages)` (mục 02), in mỗi vòng.
2. Áp `compact()` (mục 06): sau 6 lượt, nén lịch sử.
3. Thêm `write_note()` lưu "đơn đang xử lý" ra file.
4. So token trước/sau.

```python
for turn in range(max_turns):
    print(f"[turn {turn}] token≈{uoc_token(messages)}")   # theo dõi
    messages = compact(messages)                          # nén khi cần
    ... # phần còn lại như Chương 3
```
**Tiêu chí đạt:** giảm ≥40% token/lượt mà chất lượng trả lời không đổi.
:::

---

## 11 · Bài tập

1. Viết `compact()` giữ lại **chỉ** các tool_result của 2 vòng gần nhất + tóm tắt phần cũ.
2. Thiết kế `NOTES.md` cho agent xử lý 100 đơn: cần ghi field gì để reset xong vẫn tiếp đúng?

::: details 👉 Lời giải mẫu
1. Giữ `messages[-4:]` (2 vòng gần nhất), tóm tắt `messages[:-4]` thành 1 message "[Tóm tắt]": `return [tom_tat_msg] + messages[-4:]`.
2. Tối thiểu 4 field: `da_xong: [mã đơn]`, `dang_xu_ly: {mã, bước, đang chờ gì}`, `con_lai: [mã]`, `ghi_chu_quyet_dinh`. Đọc lại 4 field này là tiếp đúng mạch.
:::

---

## 12 · Kiểm tra nhanh

1. Context engineering khác prompt engineering ở đâu?
2. "Attention budget" + "context rot" nói lên điều gì?
3. Kể 4 thao tác context.
4. Pre-retrieval vs just-in-time?
5. Đặt phần nào lên đầu để cache tốt?

::: details 👉 Gợi ý đáp án
1. Prompt = một lượt; Context = quản toàn bộ token xuyên nhiều lượt.
2. Token nhiều làm loãng chú ý + giảm chính xác → nhiều ≠ tốt.
3. Write, Select, Compress, Isolate.
4. Pre-retrieval nạp hết trước; just-in-time giữ tham chiếu, nạp lúc cần.
5. Phần ổn định (system prompt, tool, tài liệu nền).
:::

---

## 13 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- **Context là tài nguyên hữu hạn** — tập token nhỏ nhất, tín hiệu cao nhất.
- 4 thao tác: **Write / Select / Compress / Isolate** (đã có code).
- Long-horizon: **compaction + note-taking + sub-agent isolation**.
- **Just-in-time** > nạp hết; **prompt caching** để tiết kiệm.
:::

Một dạng context đặc biệt là *bộ nhớ dài hạn* và *kiến thức lấy về*. Chương sau đào sâu memory & agentic RAG.

→ [**Chương 6 — Memory & Agentic RAG**](./6-memory-agentic-rag.md)

---

<ChapterVideos :videos="[
  { id: 'vD0E3EUb8-8', title: 'Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents', channel: 'IBM Technology', why: 'Định nghĩa context engineering vs prompt engineering cho agent. (2025, 200K view)' },
  { id: 'UC4vDpSJCkM', title: 'How to Pass Context in an Agentic AI Flow', channel: 'IBM Technology', why: 'Thực hành chuyển & curate context qua một luồng agent. (2025)' }
]" />
