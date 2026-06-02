---
title: 'Chương 6 — Memory & Agentic RAG'
description: 'Bộ nhớ agent (short/long-term, episodic/semantic/procedural) và Agentic RAG (decompose/route/grade/iterate) — kèm code Python, ví dụ CRM Pancake VN, và lab thêm trí nhớ + RAG cho helpdesk.'
---

# Chương 6 — Memory & Agentic RAG

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧠</p>

::: tip 🔥 Thực chiến — 30 giây
Khách quay lại lần 2, bot hỏi *"Anh/chị tên gì ạ?"* → mất điểm. Agent có **memory** nhớ khách; có **agentic RAG** tra đúng chính sách xuyên nhiều tài liệu.
**💸 Ăn tiền ở đâu:** cá nhân hoá = tỉ lệ chốt đơn cao hơn; CSKH đỡ trả lời lặp.
:::

> **Agent không bộ nhớ = mỗi lần gặp lại bạn như người lạ.**
> **Agent không tri thức = bịa rất tự tin.**
> **Chương này gắn cho agent cả hai — bằng code.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Phân biệt bộ nhớ ngắn/dài hạn (episodic/semantic/procedural) + **code lưu/nạp**.
- Thấy vì sao **naive RAG gãy** và **code một vòng Agentic RAG**.
- Biết khi nào agentic RAG đáng tiền.
:::

---

## 01 · Vì sao agent cần bộ nhớ?

Mặc định mỗi lời gọi LLM là **vô trạng thái (stateless)** — không nhớ lượt trước. Để agent "có trí nhớ", ta phải **chủ động** lưu và nạp lại.

```python
# Stateless: hỏi lại tên → không nhớ
llm("Tên tôi là An")          # ok
llm("Tên tôi là gì?")          # → không biết (lượt mới, không có ngữ cảnh)

# Stateful: tự lưu & nạp memory
mem = {}
def remember(user, key, val): mem.setdefault(user, {})[key] = val
def recall(user): return mem.get(user, {})
```

<AgentMemoryPrinciple />

---

## 02 · Phân loại bộ nhớ (kèm code)

::: tip 🔑 Taxonomy chuẩn
**Ngắn hạn (working)** — context window hiện tại; mất khi hết phiên.
**Dài hạn (long-term)**, 3 loại:
- **Episodic** — *sự kiện* đã xảy ra (lần trước khách đặt gì).
- **Semantic** — *sự thật & sở thích* (khách thích size M, dị ứng tôm).
- **Procedural** — *quy tắc/hành vi đã học* (quy trình xử lý khiếu nại shop).
:::

```python
# Lưu theo loại — đầu phiên nạp vào system prompt
profile = {
  "semantic":  {"size": "M", "dia_chi": "Q1, HCM"},        # sự thật
  "episodic":  ["2026-05: mua áo A123", "2026-06: hỏi đổi size"],  # sự kiện
}
def build_system(user):
    p = recall(user)
    return f"Khách quen. Thông tin: {p}. Cá nhân hoá tư vấn dựa trên đây."
```

Bốn thao tác: **extraction** (rút điều đáng nhớ) → **consolidation** (gộp) → **conflict resolution** (xử lý mâu thuẫn) → **retrieval** (lấy đúng lúc).

---

## 03 · 3 hệ memory thực chiến (2026)

| Hệ | Ý tưởng cốt lõi | Mạnh ở |
|---|---|---|
| **Mem0** | Lớp memory mã nguồn mở: tự rút trích "ký ức", xử lý mâu thuẫn | **Semantic**; dễ tích hợp |
| **Zep** | Trên **Graphiti** — đồ thị tri thức **thời gian (temporal)** | **Episodic/temporal**; phiên dài |
| **Letta** (MemGPT) | "LLM như hệ điều hành": **memory blocks** agent tự sửa | **Stateful agent** |

::: tip 💡 Khái niệm hay của Zep — bi-temporal
Phân biệt *khi sự kiện xảy ra* và *khi được ghi nhận*. Mâu thuẫn → **vô hiệu hoá** sự thật cũ (đặt khoảng hết hạn) thay vì xoá. Rất hợp CRM.
:::

---

## 04 · RAG cơ bản — và vì sao gãy

```python
# Naive RAG: đường ống thẳng
def naive_rag(question, kb):
    docs = retrieve_top_k(question, kb, k=3)   # tìm 3 đoạn gần nhất
    return llm(f"Dựa vào:\n{docs}\nTrả lời: {question}")
```

**Naive RAG gãy khi:**
- Câu hỏi **nhiều phần** ("so chính sách đổi trả của 3 shop") → 1 truy vấn không đủ.
- Truy vấn ban đầu **lấy nhầm** → không có cơ chế thử lại.
- Thông tin **rải nhiều nguồn** → cần tổng hợp.

---

## 05 · Agentic RAG — biến truy vấn thành hành động (kèm code)

::: tip 🔑 4 năng lực
1. **Decompose** — chia câu hỏi phức thành câu hỏi con.
2. **Route** — đẩy mỗi câu hỏi con tới đúng nguồn/tool.
3. **Grade** — *tự đánh giá* tài liệu lấy về có đủ/liên quan.
4. **Iterate** — *viết lại truy vấn và lặp* đến khi đủ căn cứ.
:::

```python
def agentic_rag(question, kb, max_iter=3):
    sub_qs = llm(f"Chia câu hỏi thành câu hỏi con:\n{question}").split("\n")  # DECOMPOSE
    findings = []
    for q in sub_qs:
        for _ in range(max_iter):
            docs = retrieve_top_k(q, kb, k=3)                  # ROUTE/retrieve
            grade = llm(f"Tài liệu này đủ trả lời '{q}'? ĐỦ/THIẾU + thiếu gì.\n{docs}")  # GRADE
            if "ĐỦ" in grade:
                findings.append(docs); break
            q = llm(f"Viết lại truy vấn cho rõ hơn dựa trên: {grade}")  # ITERATE
    return llm(f"Tổng hợp trả lời '{question}' từ:\n{findings}")
```
→ Chính là áp **Planning + Tool Use + Reflection** ([Chương 2](./2-agent-loop-patterns.md)) vào truy xuất.

---

## 06 · Trade-off: đáng tiền khi nào?

::: warning ⚠️ Agentic RAG KHÔNG phải mặc định
Tốt hơn rõ rệt với câu hỏi đa phần/mơ hồ/xuyên nguồn — nhưng tốn **~10x chi phí + độ trễ** so naive RAG.
- Câu hỏi đơn giản, một nguồn → **naive RAG**.
- Câu hỏi phức, nhiều nguồn, đáng giá → **agentic RAG**.
:::

---

## 07 · 🇻🇳 Góc Việt Nam

- **CSKH/Sale bot** ([Chương 12](./12-apply-vn-roadmap.md)): semantic memory nhớ sở thích; episodic nhớ lịch sử mua → cá nhân hoá. *Pancake/Sapo CRM* là nguồn dữ liệu memory.
- **Knowledge base**: agentic RAG tra chính sách/tồn kho/FAQ xuyên nhiều tài liệu.
- **Cảnh báo poisoning**: nếu cho khách "dạy" bộ nhớ, kẻ xấu có thể nhồi sai → kiểm soát ([Chương 11](./11-safety-guardrails.md)).

---

## 08 · 🧪 Lab: thêm trí nhớ + RAG cho helpdesk

::: tip Bài thực hành (60 phút) — code
Nâng cấp agent [Chương 3](./3-build-first-agent.md):
```python
# 1) SEMANTIC MEMORY: lưu & nạp sở thích khách
def on_new_session(user, system):
    p = recall(user)                          # {"size":"M",...}
    return system + f"\nKhách quen: {p}. Cá nhân hoá."

# 2) Sau hội thoại, rút trích điều đáng nhớ (extraction)
def after_chat(user, transcript):
    fact = llm(f"Rút 1 sự thật đáng nhớ về khách (size/địa chỉ/sở thích):\n{transcript}")
    remember(user, "fact", fact)

# 3) KNOWLEDGE BASE: thêm agentic_rag() (mục 05) làm 1 tool
TOOLS.append(tool_def_for(agentic_rag))       # agent tự quyết khi nào tra KB
```
**Tiêu chí đạt:** phiên thứ 2 agent "nhớ" khách; câu hỏi đa phần được chia nhỏ + tra đúng.
:::

---

## 09 · Bài tập

1. Viết hàm `consolidate()` gộp memory mâu thuẫn (khách đổi địa chỉ) — giữ cái mới, đánh dấu cái cũ hết hiệu lực (kiểu Zep).
2. Khi nào dùng naive RAG thay vì agentic RAG cho FAQ shop? Vì sao?

::: details 👉 Lời giải mẫu
1. `consolidate(old, new)`: cùng `key` (vd "địa chỉ") mà `value` khác → giữ `new`, gắn `old["valid_to"] = now` (đánh dấu hết hiệu lực, không xoá). Truy xuất chỉ lấy bản còn hiệu lực.
2. **Naive RAG** khi FAQ là câu đơn, một nguồn ("phí ship bao nhiêu") — rẻ, nhanh, đủ. Agentic RAG chỉ đáng khi câu đa phần/xuyên nhiều tài liệu (đắt ~10x).
:::

---

## 10 · Kiểm tra nhanh

1. Working vs long-term memory?
2. Episodic / semantic / procedural khác nhau?
3. Vì sao naive RAG gãy với câu hỏi đa phần?
4. 4 năng lực của agentic RAG?
5. Khi nào KHÔNG nên dùng agentic RAG?

::: details 👉 Gợi ý đáp án
1. Working = context hiện tại, mất khi hết phiên; long-term = lưu ngoài, qua nhiều phiên.
2. Episodic = sự kiện; semantic = sự thật/sở thích; procedural = quy tắc/hành vi.
3. Một truy vấn không đủ, không thử lại, không tổng hợp đa nguồn.
4. Decompose, Route, Grade, Iterate.
5. Câu hỏi đơn giản, một nguồn — vì agentic RAG đắt ~10x.
:::

---

## 11 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Memory biến chuỗi lời gọi rời rạc thành **agent có trạng thái**.
- Long-term = **episodic + semantic + procedural**; công cụ Mem0/Zep/Letta.
- **Agentic RAG** = decompose + route + grade + iterate (đã có code).
- Đắt ~10x → chỉ dùng khi câu hỏi thật sự phức tạp.
:::

Bạn đã làm chủ một agent đơn lẻ mạnh. Phần C nâng quy mô: nhiều agent — bắt đầu bằng câu hỏi nóng nhất: *có nên multi-agent không?*

→ [**Chương 7 — Multi-Agent Systems**](./7-multi-agent.md)

---

<ChapterVideos :videos="[
  { id: 'JB2P5Gk23VI', title: 'RAG\'s Evolution: From Simple Retrieval to Agentic AI', channel: 'IBM Technology', why: 'Từ naive RAG đến agentic RAG (planning + truy xuất lặp). (2026, 100K view)' },
  { id: 'BacJ6sEhqMo', title: 'The Four Types of Memory Every AI Agent Needs', channel: 'IBM Technology', why: 'Bộ nhớ agent: semantic, episodic, procedural, working. (2026)' }
]" />
