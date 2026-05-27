---
title: 'Vibe Agent — Khi LLM biết tự lái'
description: 'Module học AI Agent: coding agent, computer use, multi-agent, workflow agent, MCP. Case Anthropic, Devin, Manus, Smax.ai. 30 ngày từ zero đến ship agent có user.'
---

# Vibe Agent

<p style="font-size: 56px; line-height: 1; margin: 0 0 8px;">🤖</p>

> **Khi LLM biết: tự lập kế hoạch → gọi tool → quan sát kết quả → lặp lại.**
> **Đó là Agent.**

::: tip 📖 Module này dành cho ai?
- 💻 **Dev** muốn dùng coding agent (Claude Code, Cursor, Devin) để 10x productivity
- 💼 **Founder** muốn build product agent — automation, sales, customer care
- 🏢 **Operator** (HR, marketing, ops) muốn dùng agent thay 5 nhân viên
- 🇻🇳 **VN tech / agency** muốn build AI Sale Agent / AI Customer Care cho khách (Smax.ai + n8n stack)

**Không cần ML background**: cần hiểu **LLM call API + tool + memory + loop**.
:::

---

## 🚀 Vì sao học bây giờ?

| Số liệu | Nguồn |
|------|------|
| **97M downloads/tháng** MCP SDK (970x growth in 18 months) | Anthropic, T3/2026 |
| **78%** enterprise có ≥1 MCP agent production | Digital Applied 2026 |
| **30 tiếng autonomous coding** không can thiệp, 11,000 dòng code | Claude Sonnet 4.5, T9/2025 |
| **72.5%** OSWorld-Verified (≈ baseline người ~72%) | Anthropic Computer Use, T2/2026 |
| **$73M ARR** Devin trong 9 tháng (Sept 2024 → June 2025) | Cognition AI |
| **Goldman Sachs hired Devin** alongside 12K engineer | Fortune T7/2025 |
| **+15-20% close rate** Yody dùng Smax.ai | VN case |

---

## 🤖 4 nhân vật mở màn

### 1️⃣ Pieter Levels — $3.1M/năm solo
> *"Stack: Cursor + Claude + cà phê. Không nhân viên. Không VC."*

- 70+ failed startup trước PhotoAI
- Vibe coded fly.pieter.com $0 → $1M ARR / 17 ngày
- Portfolio ~$3.1M ARR

→ [Chapter 1 — Agent Foundation 101](./1-agent-foundation.md)

### 2️⃣ Jaana Dogan — Google Gemini API team
> *"60 phút giải bài toán team tôi iterate suốt 2024."*

- Senior engineer Google Gemini
- Dùng Claude Code gen distributed orchestration system
- Story: AI coding tool Google engineer prefer 2025

→ [Chapter 2 — Claude Code Deep Dive](./2-claude-code-deep.md)

### 3️⃣ Goldman Sachs — Hire Devin alongside 12K engineer
> *"Devin = employee #1 trong hybrid workforce 12,000 engineer."*

- Cognition's Devin: cloud-based autonomous SWE
- Goldman, Dell, Cisco, Santander, Nubank piloting
- Teams report 3-4x faster on complex task

→ [Chapter 4 — Multi-Agent Patterns](./4-multi-agent.md)

### 4️⃣ Yody + Let's Sushi (VN)
> *"+15-20% close rate. +300% online order. Smax.ai chatbot."*

- VN fashion / restaurant chain
- Smax.ai Facebook Messenger AI agent
- Operating cost down 3x

→ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)

---

## 🗺️ Roadmap module (8 chapter + toolkit + safety + 30-day)

| # | Chapter | Bạn học được gì |
|---|------|------|
| **1** | [Agent Foundation](./1-agent-foundation.md) | Cursor + Claude + ship product solo |
| **2** | [Claude Code Deep](./2-claude-code-deep.md) | 30-hour autonomous coding, sub-agent orchestrator-worker |
| **3** | [Computer Use](./3-computer-use.md) | Agent click màn hình như người (72.5% baseline) |
| **4** | [Multi-Agent](./4-multi-agent.md) | Pattern orchestrator-worker, debate, hierarchical |
| **5** | [Workflow Agent](./5-workflow-agent.md) | n8n + Smax.ai + Lindy + Vapi cho VN ops |
| **6** | [MCP Ecosystem](./6-mcp-ecosystem.md) | MCP = chuẩn 2026; cơ hội build MCP cho stack VN |
| **7** | [Toolkit 2026](./toolkit-2026.md) | Bảng đầy đủ Coding + General + Workflow + Multi-agent + Infra + Voice |
| **8** | [Safety & Evals](./safety-evals.md) | CVE-2025-32711, GTG-1002, prompt injection 73% prod deploy |
| **9** | [Roadmap 30 ngày](./roadmap-30-days.md) | Day-by-day plan từ zero → ship agent có user |

---

## 🧩 Agent là gì? — minh hoạ 1 page

::: tip 🔑 Định nghĩa
**Agent = LLM + Tools + Memory + Planning + Sandbox**

```
        ┌─────────────────────┐
        │       LLM (brain)    │
        │  Claude / GPT / etc │
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   ┌────▼────┐         ┌─────▼─────┐
   │  Tools  │         │  Memory   │
   │ (read/  │         │ (short +  │
   │ write/  │         │ long-term)│
   │ search) │         └───────────┘
   └────┬────┘
        │
   ┌────▼─────────┐
   │   Sandbox    │
   │  (E2B /      │
   │   Browserbase)│
   └──────────────┘
```

**Loop chuẩn ReAct**:
1. **Thought** — LLM nghĩ kế tiếp làm gì
2. **Action** — Gọi tool
3. **Observation** — Đọc kết quả tool
4. → quay lại bước 1 (đến khi xong)
:::

<AgentLoopDemo />

---

## 🎥 Watch & Learn — 3 video nền tảng

Trước khi vào từng chapter, xem 3 video này để hiểu mental model "Software 3.0" + agent loop:

<ChapterVideos :videos="[
  { id: 'LCEmiRjPEtQ', title: 'Andrej Karpathy: Software Is Changing (Again)', channel: 'Y Combinator', duration: '39:00', why: 'Karpathy giới thiệu \'Software 3.0\' — code là tiếng Anh, LLM là CPU mới, context window là RAM. Định nghĩa mental model.' },
  { id: '96jN2OCOfLs', title: 'Karpathy: From Vibe Coding to Agentic Engineering (AI Ascent 2026)', channel: 'Sequoia Capital', duration: '30:00', why: 'Update T3/2026 — vibe coding đã passé, giờ là agentic engineering. Giải thích chuyển từ \'LLM tự code\' sang \'LLM in loop with oversight\'.' },
  { id: 'fHWFF_pnqDk', title: 'Vibe coding in prod | Code w/ Claude', channel: 'Anthropic', duration: '45:00', why: 'Erik Schluntz live demo cách team Anthropic dùng Claude Code trong production. Agent loop = LLM + tools + memory + feedback.' }
]" />

---

## 🛠️ Stack tổng quan (T5/2026)

::: tip 6 layer cần biết
**1. Coding agents** — Claude Code, Cursor, Windsurf, Devin, Cline, Aider
**2. General-purpose agents** — Manus, Anthropic Computer Use, OpenAI Workspace
**3. Workflow / Automation** — n8n, Make, Smax.ai, Lindy, Sema4.ai
**4. Multi-agent frameworks** — LangGraph, CrewAI, Claude Code SDK, A2A
**5. Infrastructure** — E2B, Browserbase, Daytona, MCP servers
**6. Voice agents** — ElevenLabs Conversational, Vapi, Retell, Bland
:::

→ Chi tiết: [Toolkit 2026](./toolkit-2026.md)

---

## 🇻🇳 Vì sao dev/founder VN có lợi thế?

::: warning 💡 4 lợi thế VN

**1. Lương VN < Global → Margin runway 3-5x**
- VN dev: $800-3K/tháng salary
- US dev: $8-15K/tháng
- Cùng tool cost ($50-500/tháng) → margin VN cao hơn

**2. Local stack VN chưa có MCP server**
- MISA, KiotViet, Sapo, Haravan, Pancake, Base.vn — chưa có MCP
- → **Cơ hội blue ocean** build MCP gateway

**3. AI Sale + AI CS cho VN SME huge market**
- Smax.ai dominate Messenger/Zalo (case Yody, Let's Sushi, Biluxury)
- AIECOS — Custom Enterprise AI Agents cho VN
- 100K+ SME VN chưa được phục vụ

**4. Operator tasks ở VN cần Computer Use**
- Kế toán xài 5 phần mềm legacy không có API (MISA, Bravo, Fast)
- Computer Use = auto thay nhân viên data entry
:::

---

## 📊 Numbers thị trường

| Stat | Số |
|------|------|
| Agentic AI market 2025 | **$7-8B** |
| Forecast 2034 | **$139-199B** (40-50% CAGR) |
| Enterprise app với agent 2025 | < 5% |
| Forecast 2026 cuối năm | **40%** |
| Gartner: AI sales agent vs human seller 2028 | **10:1** |
| % seller report agent improve productivity | **< 40%** (gap claim vs reality) |

---

## 🎯 Bạn nên đọc theo thứ tự nào?

### 💻 Dev mới (chưa dùng coding agent)
→ **Landing** → [Chapter 1 Vibe Coding](./1-agent-foundation.md) → [Chapter 2 Claude Code](./2-claude-code-deep.md) → [Toolkit](./toolkit-2026.md)

### 💼 Founder build product
→ [Chapter 1 Vibe Coding](./1-agent-foundation.md) → [Chapter 5 Workflow Agent](./5-workflow-agent.md) → [Chapter 6 MCP](./6-mcp-ecosystem.md) → [Roadmap](./roadmap-30-days.md)

### 🏢 Operator (HR, marketing, ops)
→ [Chapter 3 Computer Use](./3-computer-use.md) → [Chapter 5 Workflow Agent](./5-workflow-agent.md) → [Toolkit](./toolkit-2026.md)

### 🇻🇳 Agency / system integrator VN
→ [Chapter 5 Workflow Agent](./5-workflow-agent.md) → [Chapter 6 MCP](./6-mcp-ecosystem.md) → [Safety](./safety-evals.md) → [Roadmap](./roadmap-30-days.md)

### 🔬 Researcher / ML engineer
→ [Chapter 4 Multi-Agent](./4-multi-agent.md) → [Chapter 6 MCP](./6-mcp-ecosystem.md) → [Safety](./safety-evals.md)

---

::: tip 🚦 Trước khi bắt đầu
> *"Năm 2023 LLM còn là chat bot.*
> *Năm 2024 LLM biết gọi function.*
> *Năm 2025-2026 LLM biết **tự lái** — plan, execute, recover.*
>
> *Không học agent giờ = ngồi xem revolution diễn ra mà không tham gia."*
:::

→ Sẵn sàng? Bắt đầu: [**Chapter 1 — Agent Foundation 101**](./1-agent-foundation.md)
