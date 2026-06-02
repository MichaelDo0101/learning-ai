---
title: 'Chương 10 — Evaluation & Observability'
description: 'Đánh giá agent: trajectory eval, LLM-as-judge, công cụ LangSmith/Langfuse/Phoenix, OpenTelemetry GenAI — kèm code build eval suite và kiểm tra đường đi (trajectory) cho agent helpdesk VN.'
---

# Chương 10 — Evaluation & Observability

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">📊</p>

::: tip 🔥 Thực chiến — 30 giây
Sếp/khách hỏi *"con bot chạy tốt không?"* — không đo được thì câu trả lời luôn là "không biết". Đây là lý do 90% AI không lên nổi production.
**💸 Ăn tiền ở đâu:** có eval = dám deploy, dám ký hợp đồng bảo hành chất lượng.
:::

> **"Agent của khách có chạy tốt không?" — nếu không đo được, câu trả lời luôn là *không biết*.**
> **Lời than số 1 của ngành 2026: "GenAI không lên nổi production." Lý do: không có eval.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Phân biệt observability / evaluation / CI gating.
- **Code một eval suite** (LLM-as-judge + kiểm trajectory).
- Đặt một **ngưỡng gate** chặn deploy khi chất lượng tụt.
:::

---

## 01 · Ba việc khác nhau, đừng lẫn

::: tip 🔑
- **Observability/Tracing** — *chuyện gì đã xảy ra?* Ghi vết từng bước.
- **Evaluation** — *nó có tốt không?* Chấm điểm output theo tiêu chí.
- **CI gating** — *có được ship không?* Chặn release nếu eval tụt.
:::
Agent **phi tất định** → cùng input có thể ra đường đi khác. Phải đo *có hệ thống*.

---

## 02 · Trajectory eval — khái niệm đặc trưng kỷ nguyên agent

Với chatbot, ta chấm **đáp án cuối**. Với agent, đáp án đúng nhưng **đường đi** có thể sai:
```
User → [tool A] → [tool B] → [tool A lần 2] → đáp án
        ✓ đúng    ✗ thừa     ✗ lặp vô ích    ✓ đúng?
         → đáp án đúng nhưng TRAJECTORY tệ (đắt, chậm)
```
→ Đo cả: tool đúng không, kế hoạch có bám không, số bước có hiệu quả không.

---

## 03 · 3 chiều đánh giá

::: tip 🔑 Correctness · Path · Reproducibility
1. **Correctness** — đáp án cuối đúng/hữu ích?
2. **Path (trajectory)** — tool-correctness (gọi đúng tool?), plan-adherence, step-efficiency.
3. **Reproducibility** — chạy lại ổn định hay thất thường?
:::

---

## 04 · LLM-as-judge (code)

```python
import json, re

def judge(question, answer, rubric):
    verdict = llm(f"""Chấm câu trả lời theo rubric. CHỈ trả JSON {{"pass": true/false, "ly_do": "..."}}.
Rubric: {rubric}
Câu hỏi: {question}
Trả lời: {answer}""")
    m = re.search(r"\{.*\}", verdict, re.S)   # bóc JSON dù model bọc ```json hay văn xuôi
    return json.loads(m.group(0)) if m else {"pass": False, "ly_do": "judge sai định dạng"}

# Ví dụ
r = judge("Đơn 1234 đâu?", "Đơn đang giao, dự kiến mai tới.",
          "Đạt nếu: nêu trạng thái đơn + thời gian dự kiến, lịch sự.")
print(r["pass"], r["ly_do"])
```
::: warning ⚠️ Dùng đúng cách
- LLM **giỏi phân biệt hơn sinh tự do** → thiết kế eval dạng **so sánh cặp / phân loại / chấm theo rubric**, đừng hỏi "mấy điểm?" mơ hồ.
- Cẩn thận **bias** (thiên vị câu dài). Kết hợp eval **luật cứng** (test, regex) khi có thể.
:::

---

## 05 · Công cụ chuẩn (2026)

| Công cụ | Thế mạnh |
|---|---|
| **LangSmith** | Tích hợp sâu LangChain/LangGraph; diff state từng node, replay |
| **Langfuse** | Mã nguồn mở (self-host); prompt mgmt, dataset, eval |
| **Braintrust** | Quy trình **trace → eval**; lỗi production → ca eval; **CI gate** |
| **Arize Phoenix** | **OpenTelemetry-native**; 50+ metric; phân tích trajectory |
| **DeepEval** | Bề rộng metric; test kiểu **pytest** |

---

## 06 · OpenTelemetry GenAI — lớp chuẩn vendor-neutral

Để không khoá vào một vendor, dùng **OpenTelemetry GenAI semantic conventions**:
- `gen_ai.operation.name` ∈ `create_agent`, `invoke_agent`, `execute_tool`, `chat`
- Thuộc tính: `gen_ai.agent.name`, `gen_ai.request.model`, `gen_ai.conversation.id`...
→ Ghi lại **"đồ thị quyết định"** của agent, không chỉ I/O ở rìa.

---

## 07 · Continuous Evaluation

::: tip 🔑 Traces → Datasets → Eval runs
1. **Bật tracing** trước → dữ liệu thật, tín hiệu cao.
2. Biến trace thành **dataset** lặp lại được.
3. Chạy **eval trên mỗi thay đổi**; phát hiện regression; **nuôi lớn** bộ eval.
:::
> Production failure → thêm vào eval set. Bộ eval lớn dần = "bộ nhớ chất lượng" của hệ.

<AgentChallengesDemo />

---

## 08 · 🧪 Lab: eval suite cho helpdesk (code)

::: tip Bài thực hành (60–90 phút) — code
```python
# Bộ ca thật: câu hỏi + tool kỳ vọng + rubric
CASES = [
  {"q": "Đơn 1234 đâu?", "tool_can": "lookup_order",
   "rubric": "Nêu trạng thái đơn + lịch sự"},
  {"q": "Áo A123 còn không?", "tool_can": "check_stock",
   "rubric": "Nêu còn/hết hàng chính xác"},
  {"q": "Vay 5 triệu được không?", "tool_can": None,        # ngoài phạm vi
   "rubric": "Từ chối lịch sự, không gọi tool"},
]

def eval_suite():
    passed = 0
    for c in CASES:
        answer, trajectory = run_agent_traced(c["q"])     # trả cả đường đi
        # (1) CORRECTNESS: LLM-as-judge
        ok = judge(c["q"], answer, c["rubric"])["pass"]
        # (2) PATH: tool đúng kỳ vọng?
        tools_goi = [t.name for t in trajectory if t.type == "tool_use"]
        path_ok = (c["tool_can"] in tools_goi) if c["tool_can"] else (tools_goi == [])
        if ok and path_ok: passed += 1
        else: print("❌ FAIL:", c["q"], "| tools:", tools_goi)
    rate = passed / len(CASES)
    print(f"Pass rate: {rate:.0%}")
    assert rate >= 0.9, "GATE: chất lượng < 90% → chặn deploy"   # (3) CI GATE
    return rate

eval_suite()
```
**Tiêu chí đạt:** suite chạy được, in pass rate, **chặn deploy** khi < 90%; bắt được ca gọi sai tool.
:::

---

## 09 · Bài tập

1. Thêm chiều **reproducibility**: chạy mỗi ca 3 lần, fail nếu kết quả không nhất quán.
2. Một agent đáp đúng nhưng gọi `lookup_order` 4 lần. Eval `correctness` pass nhưng `path` fail — vì sao điều này quan trọng?

::: details 👉 Lời giải mẫu
1. Chạy mỗi ca 3 lần, chuẩn hoá output; `reproducible = len(set(outputs)) == 1` (hoặc judge "3 đáp án tương đương?"). Fail nếu không nhất quán → agent thất thường, chưa production-ready.
2. Đáp đúng nhưng gọi tool thừa 4 lần = **đắt gấp 4 + chậm + dễ chạm rate limit**. Ở 10k hội thoại, "đúng nhưng lãng phí path" đốt tiền thật → phải đo *trajectory*, không chỉ kết quả.
:::

---

## 10 · Kiểm tra nhanh

1. Phân biệt observability / evaluation / CI gating.
2. Trajectory eval khác chấm đáp-án-cuối ở đâu?
3. 3 chiều đánh giá agent?
4. Vì sao LLM-as-judge nên dạng so sánh/phân loại?
5. OpenTelemetry GenAI giải quyết gì?

::: details 👉 Gợi ý đáp án
1. Observability = ghi vết; Evaluation = chấm chất lượng; CI gating = chặn ship khi tụt.
2. Trajectory chấm cả đường đi (tool, kế hoạch, hiệu quả), không chỉ kết quả.
3. Correctness, Path, Reproducibility.
4. LLM giỏi phân biệt hơn sinh tự do → tin cậy hơn.
5. Chuẩn vendor-neutral ghi "đồ thị quyết định" của agent.
:::

---

## 11 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Không đo = không lên production được.
- **Trajectory eval** + 3 chiều **correctness/path/reproducibility** (đã có code).
- **LLM-as-judge** dạng rubric; kết hợp luật cứng + **CI gate**.
- **Continuous eval**: traces → datasets → eval runs.
:::

Đo được rồi — giờ phải làm agent **an toàn** mới dám thả ra thế giới.

→ [**Chương 11 — Safety, Guardrails & Reliability**](./11-safety-guardrails.md)

---

<ChapterVideos :videos="[
  { id: 'oSjAbx67f0k', title: 'How to Debug, Evaluate, and Ship Reliable AI Agents with LangSmith', channel: 'LangChain', why: 'Bản chính chủ LangSmith: eval/observability + LLM-as-judge. (2026)' },
  { id: '3Ce7ZSTlrTU', title: 'Learn how to evaluate AI agents in this new course with Arize AI!', channel: 'DeepLearningAI', why: 'Khoá đánh giá agent của Andrew Ng × Arize — nguồn uy tín nhất. (2025)' }
]" />
