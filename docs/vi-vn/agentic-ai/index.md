---
title: 'Agentic AI — Hiểu, làm chủ và ứng dụng AI biết tự hành động'
description: 'Lộ trình 12 chương từ nền tảng đến production: agent loop, tool design, context engineering, memory, agentic RAG, multi-agent, MCP, evaluation, safety. Chuẩn hoá theo Anthropic, OpenAI, Google, Andrew Ng — bản 2026.'
---

# Agentic AI

<p style="font-size: 56px; line-height: 1; margin: 0 0 8px;">🤖</p>

> **Khi LLM không chỉ trả lời, mà tự lập kế hoạch → gọi tool → quan sát kết quả → tự sửa → lặp lại đến khi xong.**
> **Đó là Agentic AI.**

::: tip 🎯 Module này dạy bạn 5 việc
1. **HIỂU** — agent thực chất là gì, khác chatbot/workflow ở đâu, khi nào *nên* và khi nào *không nên* dùng.
2. **LÀM CHỦ** — agent loop, tool design, context engineering — những thứ quyết định 80% chất lượng agent.
3. **SETUP** — dựng môi trường, viết agent đầu tiên từ số 0 (không cần framework).
4. **TẠO** — build agent thật: memory, RAG, multi-agent, MCP, kết nối hệ thống.
5. **ỨNG DỤNG** — đánh giá, bảo vệ, đưa lên production và ship cho người dùng thật.

**Không cần nền ML.** Cần: biết gọi API + tư duy lập trình cơ bản.
:::

---

## 🧭 Tư duy cốt lõi: Workflow vs Agent

Trước khi học cách build, phải phân biệt được hai thứ hay bị gọi lẫn là "agent" (theo cách Anthropic định nghĩa trong *Building Effective Agents*):

| | **Workflow** | **Agent** |
|---|---|---|
| Ai quyết định luồng? | **Lập trình viên** viết sẵn code path | **LLM** tự quyết runtime |
| Tính dự đoán | Cao, ổn định, rẻ | Linh hoạt, đắt hơn, khó đoán hơn |
| Dùng khi | Bài toán *biết trước* các bước | Bài toán *mở*, không hardcode được đường đi |

::: warning 💡 Bài học quan trọng nhất của cả ngành 2026
**Đa số use case KHÔNG cần agent.** Bắt đầu bằng giải pháp đơn giản nhất; chỉ leo lên agent (rồi multi-agent) khi nó *thật sự* cải thiện kết quả đo được. Cả OpenAI, Anthropic lẫn cộng đồng đều nhấn mạnh: **"start simple, add complexity only when it pays off."**
:::

### Viên gạch nền: "Augmented LLM"

Đơn vị nhỏ nhất để xây mọi agent — một LLM được tăng cường (Anthropic gọi là *augmented LLM*):

```
Augmented LLM = Model + Tools + Memory + Retrieval
```

LLM tự sinh truy vấn (retrieval), tự chọn & gọi hàm (tools), tự quyết giữ lại gì (memory). Việc của bạn là cho nó một **giao diện tốt, mô tả rõ ràng** để dùng.

---

## 🔁 Agent Loop — trái tim của mọi agent

Mọi agent, dù đơn giản hay phức tạp, đều chạy một vòng lặp. Anthropic (Claude Agent SDK) gói gọn thành 4 nhịp:

::: tip 🔑 Vòng lặp chuẩn
**Gather context → Take action → Verify work → Repeat**
1. **Thu thập ngữ cảnh** — tìm/đọc thông tin cần thiết (search, đọc file, gọi API).
2. **Hành động** — gọi tool để làm việc thật.
3. **Kiểm chứng** — đối chiếu kết quả với tiêu chí (test, linter, LLM-as-judge), tự sửa nếu sai.
4. **Lặp lại** — đến khi đạt điều kiện dừng (xong việc / hết lượt / cần con người).

Đây là phiên bản kỹ thuật của vòng **ReAct**: *Thought → Action → Observation → loop.*
:::

<AgentLoopDemo />

---

## 🗺️ Lộ trình 12 chương — 4 phần

Lộ trình bám đúng cách OpenAI, Anthropic, Google và Andrew Ng dạy, theo nguyên tắc cộng đồng đồng thuận: **"loop-first, framework-second"** — hiểu bản chất vòng lặp trước, framework sau.

### 🟦 Phần A — HIỂU nền tảng

| # | Chương | Bạn nắm được |
|---|------|------|
| **1** | [Agent là gì: Workflow vs Agent](./1-agent-la-gi.md) | Phân biệt agent/chatbot/workflow; thang tự chủ L0–L5; khi nào nên/không nên build |
| **2** | [Agent Loop & các Pattern chuẩn](./2-agent-loop-patterns.md) | 4 pattern của Andrew Ng + 5 workflow pattern của Anthropic |

### 🟩 Phần B — LÀM CHỦ & SETUP

| # | Chương | Bạn nắm được |
|---|------|------|
| **3** | [Build agent đầu tiên từ số 0](./3-build-first-agent.md) | Tự viết agent loop (không framework); function calling; structured output |
| **4** | [Tool Design (Agent–Computer Interface)](./4-tool-design.md) | 5 nguyên tắc thiết kế tool; namespacing; token-efficiency; error message |
| **5** | [Context Engineering](./5-context-engineering.md) | Cú shift lớn nhất 2026: quản lý ngữ cảnh, attention budget, compaction, just-in-time |
| **6** | [Memory & Agentic RAG](./6-memory-agentic-rag.md) | Bộ nhớ ngắn/dài hạn; Mem0/Zep/Letta; RAG → Agentic RAG |

### 🟨 Phần C — NÂNG CAO

| # | Chương | Bạn nắm được |
|---|------|------|
| **7** | [Multi-Agent Systems](./7-multi-agent.md) | Debate "đừng vội multi-agent"; orchestrator-workers; chi phí ~15x |
| **8** | [MCP, Skills & Code Execution](./8-mcp-skills.md) | MCP chuẩn kết nối; Agent Skills; code-execution tiết kiệm token; A2A |
| **9** | [Frameworks & Tooling](./9-frameworks-tooling.md) | LangGraph/CrewAI/OpenAI SDK/Claude SDK/ADK; Computer Use; cách chọn |

### 🟧 Phần D — ỨNG DỤNG & PRODUCTION

| # | Chương | Bạn nắm được |
|---|------|------|
| **10** | [Evaluation & Observability](./10-evaluation-observability.md) | Đánh giá *trajectory*; LLM-as-judge; LangSmith/Langfuse/Phoenix; OTel |
| **11** | [Safety, Guardrails & Reliability](./11-safety-guardrails.md) | Lethal trifecta; OWASP Agentic Top 10; 12-Factor Agents |
| **12** | [Ứng dụng VN & Roadmap ship](./12-apply-vn-roadmap.md) | Workflow agent (n8n/Smax.ai/voice); case VN; roadmap 30 ngày |

---

## 🧠 4 Agentic Pattern bạn sẽ gặp khắp nơi

Andrew Ng (DeepLearning.AI) đúc kết 4 pattern mà gần như mọi agent đều dùng — học thuộc bộ này là có "từ vựng" để đọc hiểu mọi hệ thống agent:

1. **Reflection** — agent tự soi và sửa output của chính mình.
2. **Tool Use** — LLM tự chọn hàm/API để gọi.
3. **Planning** — LLM chia bài toán lớn thành các bước nhỏ.
4. **Multi-Agent Collaboration** — nhiều agent chuyên biệt phối hợp, như một công ty thuê nhiều nhân viên.

> Chi tiết + 5 workflow pattern của Anthropic (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer): [Chương 2](./2-agent-loop-patterns.md).

---

## 🤖 Bối cảnh model 2026 — chọn "bộ não" nào?

Agent chỉ mạnh bằng model đứng sau. Trạng thái giữa 2026 (luôn kiểm tra lại vì model ra rất nhanh):

| Nhà | Dòng model | Ghi chú cho agent |
|---|------|------|
| **Anthropic** | **Opus 4.8** (28/5/2026), **Sonnet 4.6**, **Haiku 4.5** | Mạnh nhất cho agentic coding & tool use; Sonnet 4.6 ~ "Opus-level giá 1/5"; Haiku cho việc rẻ/nhanh |
| **OpenAI** | **GPT-5.5** (4/2026), dòng **Codex** (5.2/5.3-Codex) | Agentic coding tốt; built-in tools qua Responses API |
| **Google** | **Gemini 3.1 Pro**, Gemini 3 Flash | Mạnh long-context & computer-use/browser agent |

::: tip 💸 Mẹo chi phí (dùng xuyên suốt module)
**Định tuyến theo độ khó**: model nhỏ/rẻ (Haiku, GPT-5-mini) cho phân loại & việc đơn giản; model lớn cho suy luận phức tạp. Kết hợp **prompt caching** + structured output. Có thể tiết kiệm 60–80% chi phí mà không giảm chất lượng.
:::

---

## 🎥 Xem trước khi bắt đầu — 3 video nền tảng

<ChapterVideos :videos="[
  { id: 'EDb37y_MhRw', title: 'Generative vs Agentic AI: Shaping the Future of AI Collaboration', channel: 'IBM Technology', why: 'Phân biệt AI sinh nội dung vs AI agent — vào đề rõ ràng. (2025, 1.2M view)' },
  { id: 'CEvIs9y1uog', title: 'Don\'t Build Agents, Build Skills Instead – Anthropic', channel: 'AI Engineer', why: 'Kỹ sư Anthropic bàn triết lý thiết kế agent. (2025, 1.4M view)' },
  { id: 'GuTcle5edjk', title: 'you need to learn MCP RIGHT NOW!! (Model Context Protocol)', channel: 'NetworkChuck', why: 'MCP — chuẩn kết nối agent↔tool 2026. (2025, 1.5M view)' }
]" />

---

## 🇻🇳 Vì sao dev/founder Việt Nam có lợi thế?

::: warning 💡 4 lợi thế thực tế
**1. Margin runway lớn** — lương dev VN thấp hơn global 3–5x, cùng chi phí tool ($50–500/tháng) → biên lợi nhuận cao hơn khi làm product/agency.

**2. Blue ocean MCP cho stack nội địa** — MISA, KiotViet, Sapo, Pancake, Base.vn… phần lớn *chưa có* MCP server chính thức. Cơ hội build lớp kết nối (xem [Chương 8](./8-mcp-skills.md)).

**3. Thị trường AI Sale / Customer Care SME khổng lồ** — 100K+ SME chưa được phục vụ; Smax.ai đang dominate Messenger/Zalo (xem [Chương 12](./12-apply-vn-roadmap.md)).

**4. Nhiều phần mềm nội địa không có API** — Computer Use mở khoá tự động hoá việc nhập liệu (xem [Chương 9](./9-frameworks-tooling.md)).
:::

---

## 🎯 Đọc theo thứ tự nào?

- **💻 Dev mới với agent** → Chương 1 → 2 → 3 → 4 → 5 (nền tảng vững trước khi vào framework)
- **💼 Founder build product** → Chương 1 → 3 → 6 → 8 → 12
- **🏢 Operator (HR/marketing/ops)** → Chương 1 → 9 (Computer Use) → 12
- **🇻🇳 Agency / system integrator** → Chương 4 → 8 (MCP) → 11 (Safety) → 12 (Roadmap)
- **🔬 Researcher / ML engineer** → Chương 2 → 5 → 7 → 10

---

## 🎓 Khóa học miễn phí chính hãng (Anthropic · OpenAI · Google)

> Học thẳng từ nguồn gốc. Tất cả **miễn phí** (link đã kiểm tra còn sống, ghi rõ nguồn):

**🟣 Anthropic**
- **Building with the Claude API** (tool use, RAG, MCP, agents) — [anthropic.skilljar.com · claude-with-the-anthropic-api](https://anthropic.skilljar.com/claude-with-the-anthropic-api)
- **Claude Code in Action** — [anthropic.skilljar.com · claude-code-in-action](https://anthropic.skilljar.com/claude-code-in-action)
- **Introduction to MCP** — [skilljar · introduction-to-model-context-protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol) · **Agent skills** — [skilljar · introduction-to-agent-skills](https://anthropic.skilljar.com/introduction-to-agent-skills)
- **Building Effective Agents** (bài canonical) — [anthropic.com/engineering/building-effective-agents](https://www.anthropic.com/engineering/building-effective-agents)
- Code: [anthropics/courses](https://github.com/anthropics/courses) · [claude-quickstarts/agents](https://github.com/anthropics/claude-quickstarts/tree/main/agents) · [claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python)

**🟢 OpenAI**
- **A Practical Guide to Building Agents** (PDF) — [cdn.openai.com · a-practical-guide-to-building-agents.pdf](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- **Agents guide** (Agents SDK, handoffs, guardrails) — [developers.openai.com · guides/agents](https://developers.openai.com/api/docs/guides/agents)
- **OpenAI Cookbook** (function calling, agents) — [developers.openai.com/cookbook](https://developers.openai.com/cookbook)
- **Agents SDK docs** — [openai.github.io/openai-agents-python](https://openai.github.io/openai-agents-python/)

**🔵 Google**
- **5-Day AI Agents Intensive** (Kaggle × Google) — [kaggle.com/learn-guide/5-day-agents](https://www.kaggle.com/learn-guide/5-day-agents)
- **Introduction to Agents** (whitepaper) — [kaggle.com/whitepaper-introduction-to-agents](https://www.kaggle.com/whitepaper-introduction-to-agents)
- **Agent Development Kit (ADK)** — [adk.dev/get-started](https://adk.dev/get-started/) · [github.com/google/adk-python](https://github.com/google/adk-python)

> 💡 Mảng *tạo nội dung* (ảnh/video/nhạc) học ở module [**Generative AI**](../generative-ai/) — cũng có mục khóa học miễn phí riêng.

---

::: tip 🚦 Trước khi bắt đầu
> *"Năm 2023 LLM là chatbot.*
> *Năm 2024 LLM biết gọi function.*
> *Năm 2025–2026 LLM biết **tự lái** — plan, execute, verify, recover.*
>
> *Không học agentic giờ = ngồi xem cuộc cách mạng diễn ra mà không tham gia."*
:::

→ Sẵn sàng? Bắt đầu: [**Chương 1 — Agent là gì: Workflow vs Agent**](./1-agent-la-gi.md)
