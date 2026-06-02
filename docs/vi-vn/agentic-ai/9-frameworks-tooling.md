---
title: 'Chương 9 — Frameworks & Tooling'
description: 'Khi nào nên kéo framework: LangGraph, CrewAI, OpenAI Agents SDK, Claude Agent SDK, Google ADK — kèm code minh hoạ cùng một bài toán. Computer Use, toolkit 6 layer, và khung quyết định chọn công cụ.'
---

# Chương 9 — Frameworks & Tooling

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">⚙️</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn viết tay agent rồi — *giờ* mới tới lúc framework có ích. LangGraph hay CrewAI? Chọn sai = debug khóc thét, giao hàng trễ.
**💸 Ăn tiền ở đâu:** chọn đúng tool cho dự án khách = giao nhanh, ít sửa, biên lợi nhuận cao.
:::

> **Bạn đã viết agent tay ở [Chương 3](./3-build-first-agent.md). Giờ mới là lúc framework có ích — vì bạn đã hiểu nó giấu gì bên dưới.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Biết **khi nào** kéo framework (và khi nào đừng).
- Đọc được code **5 framework** chính qua cùng một bài toán.
- Chọn đúng công cụ theo nhu cầu (có khung quyết định).
:::

---

## 01 · Khi nào kéo framework?

::: warning 💡 Loop-first, framework-second
Framework **rất hữu ích** — nhưng *sau khi* hiểu vòng lặp. Anthropic cảnh báo: framework thêm lớp trừu tượng che mất cơ chế, gây khó debug.
- Prototype/học → viết tay ([Chương 3](./3-build-first-agent.md)).
- Cần **state bền, checkpoint, human-in-the-loop, nhiều agent** → kéo framework.
:::

<FrameworkMotivationDemo />

---

## 02 · LangGraph — chuẩn cho production

Mô hình hoá agent như **đồ thị có hướng** (`StateGraph`):
```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):          # "bộ nhớ làm việc" của hệ
    question: str
    answer: str

def tra_loi(state):              # 1 node = 1 hàm cập nhật state
    return {"answer": llm(state["question"])}

g = StateGraph(State)
g.add_node("answer", tra_loi)
g.set_entry_point("answer")
g.add_edge("answer", END)
from langgraph.checkpoint.memory import MemorySaver
memory = MemorySaver()                  # dev; production dùng PostgresSaver
app = g.compile(checkpointer=memory)    # ← checkpoint: khôi phục được
```
::: tip 🔑 Khái niệm cốt lõi
**State** (TypedDict chia sẻ) · **Nodes** (hàm cập nhật state) · **Edges** (nối node; **conditional edge** để LLM tự định tuyến) · **Checkpointing** (`MemorySaver`→`PostgresSaver`, workflow khôi phục được) · **HITL** (breakpoint: dừng, sửa state, duyệt, chạy tiếp).
:::
→ Mạnh nhất cho workflow **có trạng thái, cần audit/rollback**. Hệ sinh thái: **LangSmith** ([Chương 10](./10-evaluation-observability.md)).

---

## 03 · CrewAI — nhanh để prototype

Mô hình **role-based**: mỗi agent có **role / goal / backstory**; gom thành **Crew**.
```python
from crewai import Agent, Task, Crew

researcher = Agent(role="Nhà nghiên cứu thị trường",
                   goal="Tìm insight đối thủ trà sữa HN",
                   backstory="Chuyên gia F&B 10 năm")
writer = Agent(role="Copywriter", goal="Viết báo cáo SWOT dễ đọc",
               backstory="Viết content marketing")

crew = Crew(agents=[researcher, writer],
            tasks=[Task(description="Research 3 đối thủ", agent=researcher),
                   Task(description="Viết SWOT", agent=writer)])
print(crew.kickoff())
```
> Ẩn dụ "thuê nhân viên". Nhanh nhất từ ý tưởng → demo multi-agent. Yếu hơn về state bền → hợp **prototype/POC**.

---

## 04 · OpenAI Agents SDK & Claude Agent SDK

```python
# OpenAI Agents SDK — 3 primitive cốt lõi (Agents, Handoffs, Guardrails) + Sessions & Tracing
from agents import Agent, Runner
trợ_lý = Agent(name="CSKH", instructions="Trả lời lịch sự", tools=[tra_don])
print(Runner.run_sync(trợ_lý, "Đơn 1234 đâu rồi?").final_output)
```
| OpenAI Agents SDK | Vai trò |
|---|---|
| **Agents** | LLM + instructions + tools |
| **Handoffs** | Trao quyền sang agent khác (là 1 tool) |
| **Guardrails** | Kiểm input/output song song, "tripwire" chặn |
| **Sessions** | Tự lưu lịch sử hội thoại |
| **Tracing** | Ghi vết để debug |

**Claude Agent SDK** (trước là Claude Code SDK): khái niệm cốt lõi **harness** — bộ khung quanh model cho nó truy cập máy (terminal/file/lệnh); vòng lặp **gather → act → verify → repeat** + **subagent** context riêng.

---

## 05 · Google ADK & phân tầng (2026)

**ADK**: **LLM Agents** (suy luận) vs **Workflow Agents** (điều phối tất định: Sequential/Parallel/Loop) vs **Custom/Graph**.

::: tip 🔑 "Tier" theo đồng thuận cộng đồng (định hướng)
| Tầng | Framework | Ghi chú |
|---|---|---|
| **Production** | **LangGraph**, **LlamaIndex** (tài liệu), **MS Agent Framework**, **ADK** | State bền, audit, checkpoint |
| **Prototype** | **CrewAI**, **AG2** | Nhanh ra demo, nhẹ về state |
| **Bảo trì (cân nhắc rời)** | **AutoGen** (gốc), **Semantic Kernel** | Hướng dẫn migrate sang MS Agent Framework |
**Chuẩn hội tụ:** **MCP** (agent↔tool), **A2A** (agent↔agent), **OpenTelemetry GenAI** (observability).
:::

<FrameworkComparisonDemo />
<FrameworkSelectionDemo />

---

## 06 · Computer Use — agent điều khiển màn hình

Khi phần mềm **không có API**, agent thao tác **GUI như người**: chụp màn hình → click/gõ/cuộn.
::: tip 📊 Trạng thái 2026 (nói cho chuẩn)
Trên **OSWorld-Verified**, Claude Sonnet 4.6 đạt **~72,5%** (từ 14,9% lúc ra mắt 10/2024) — **≈ mức người ở nhiều tác vụ GUI**. Anthropic nói model "vẫn kém người giỏi nhất", nên dùng "≈ mức người ở nhiều tác vụ", **không** "ngang con người".
:::
→ Mở khoá tự động hoá phần mềm legacy (rất hợp VN: MISA, Bravo, Fast — [Chương 12](./12-apply-vn-roadmap.md)). Đánh đổi: chậm + đắt hơn API, dễ vỡ khi UI đổi.

---

## 07 · Toolkit 6 layer & khung chọn

::: tip 🛠️ Bản đồ 2026
1. **Coding** — Claude Code, Cursor, Windsurf, Devin, Cline, Aider
2. **General** — Manus, Claude Computer Use, OpenAI Operator
3. **Workflow** — n8n, Make, Smax.ai, Lindy
4. **Multi-agent** — LangGraph, CrewAI, OpenAI/Claude SDK, ADK
5. **Infra** — E2B, Browserbase, Daytona (sandbox), MCP servers
6. **Voice** — ElevenLabs, Vapi, Retell, Bland
:::
```
Bạn cần gì?
├─ Học/hiểu cơ chế        → viết tay (Chương 3)
├─ Workflow state bền/HITL → LangGraph
├─ Demo multi-agent nhanh → CrewAI
├─ Hệ OpenAI / Claude     → OpenAI Agents SDK / Claude Agent SDK
├─ No-code automation     → n8n / Smax.ai (Chương 12)
└─ Phần mềm không API     → Computer Use
```

---

## 08 · 🧪 Bài tập

1. Viết lại **lab research đối thủ** ([Chương 7](./7-multi-agent.md)) bằng **CrewAI** (2 agent: researcher + writer). So với bản viết tay — gọn hơn hay khó debug hơn?
2. Chọn framework cho 3 ca: (a) bot CSKH cần audit log từng bước, (b) demo nhanh cho khách xem, (c) tự động hoá phần mềm kế toán không API. Giải thích.

::: details 👉 Gợi ý câu 2
(a) **LangGraph** (checkpoint/audit). (b) **CrewAI** (nhanh ra demo). (c) **Computer Use** (không API).
:::

---

## 09 · Kiểm tra nhanh

1. Khi nào viết tay, khi nào framework?
2. 3 khái niệm cốt lõi của LangGraph?
3. Các thành phần chính của OpenAI Agents SDK?
4. "Harness" trong Claude Agent SDK là gì?
5. Nói cho chuẩn về điểm Computer Use trên OSWorld?

::: details 👉 Gợi ý đáp án
1. Viết tay để học/prototype; framework khi cần state bền, checkpoint, HITL, nhiều agent.
2. State, Nodes, Edges (+ checkpointing, conditional edges).
3. 3 primitive cốt lõi: Agents, Handoffs, Guardrails; + Sessions & Tracing (tính năng).
4. Bộ khung quanh model cho nó truy cập máy + chạy vòng lặp.
5. ~72,5%, ≈ mức người ở **nhiều** tác vụ GUI — không phải "ngang con người".
:::

---

## 10 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- **Loop-first, framework-second.**
- **LangGraph** (production/state), **CrewAI** (prototype), **OpenAI/Claude SDK**, **ADK** — đã thấy code.
- Chuẩn hội tụ: **MCP + A2A + OpenTelemetry**.
- **Computer Use** mở khoá phần mềm không-API.
:::

Agent chạy được rồi — nhưng *có tốt không?* Phần D đưa lên production: đo lường, an toàn, ship.

→ [**Chương 10 — Evaluation & Observability**](./10-evaluation-observability.md)

---

<ChapterVideos :videos="[
  { id: 'jGg_1h0qzaM', title: 'LangGraph Complete Course for Beginners – Complex AI Agents with Python', channel: 'freeCodeCamp.org', why: 'Khoá LangGraph đầy đủ: graph/state/nodes/edges/checkpointing. (2025, 740K view)' },
  { id: '35nxORG1mtg', title: 'Agents SDK from OpenAI! | Full Tutorial', channel: 'James Briggs', why: 'Full tutorial OpenAI Agents SDK: agents, tools, handoffs. (2025)' }
]" />
