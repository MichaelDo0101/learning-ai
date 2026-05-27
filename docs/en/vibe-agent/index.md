---
title: 'Vibe Agent — When LLMs learn to drive'
description: 'Learning module for AI Agent: coding agent, computer use, multi-agent, workflow agent, MCP. Cases from Anthropic, Devin, Manus, Smax.ai. 30 days zero to shipping an agent with users.'
---

# Vibe Agent

<p style="font-size: 56px; line-height: 1; margin: 0 0 8px;">🤖</p>

> **When an LLM can: plan → call tool → observe result → loop.**
> **That's an Agent.**

::: tip 📖 Who is this module for?
- 💻 **Devs** wanting to use coding agents (Claude Code, Cursor, Devin) for 10x productivity
- 💼 **Founders** building agent products — automation, sales, customer care
- 🏢 **Operators** (HR, marketing, ops) replacing 5-person teams with agents
- 🌏 **Tech/agency in emerging markets** building AI Sales Agent / AI Customer Care for clients

**No ML background required**: just understand **LLM API + tool + memory + loop**.
:::

---

## 🚀 Why now?

| Stat | Source |
|------|------|
| **97M downloads/month** MCP SDK (970x growth in 18 months) | Anthropic, Mar 2026 |
| **78%** enterprise has ≥1 MCP agent in production | Digital Applied 2026 |
| **30 hours autonomous coding** uninterrupted, 11,000 lines | Claude Sonnet 4.5, Sep 2025 |
| **72.5%** OSWorld-Verified (≈ human baseline ~72%) | Anthropic Computer Use, Feb 2026 |
| **$73M ARR** Devin in 9 months (Sept 2024 → June 2025) | Cognition AI |
| **Goldman Sachs hired Devin** alongside 12K engineers | Fortune Jul 2025 |
| **+15-20% close rate** Yody (Vietnam) using Smax.ai | VN case |

---

## 🤖 4 opening characters

### 1️⃣ Pieter Levels — $3.1M/year solo
> *"Stack: Cursor + Claude + coffee. No employees. No VCs."*

- 70+ failed startups before PhotoAI
- Vibe coded fly.pieter.com $0 → $1M ARR / 17 days
- Portfolio ~$3.1M ARR

→ [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md)

### 2️⃣ Jaana Dogan — Google Gemini API team
> *"60 minutes to solve a problem my team iterated on all of 2024."*

- Senior engineer Google Gemini
- Used Claude Code to generate distributed orchestration system
- "AI coding tool Google engineers prefer 2025"

→ [Chapter 2 — Claude Code Deep Dive](./2-claude-code-deep.md)

### 3️⃣ Goldman Sachs — Hired Devin alongside 12K engineers
> *"Devin = employee #1 in hybrid workforce of 12,000 engineers."*

- Cognition's Devin: cloud-based autonomous SWE
- Goldman, Dell, Cisco, Santander, Nubank piloting
- Teams report 3-4x faster on complex tasks

→ [Chapter 4 — Multi-Agent Patterns](./4-multi-agent.md)

### 4️⃣ Yody + Let's Sushi (Vietnam)
> *"+15-20% close rate. +300% online orders. Smax.ai chatbot."*

- VN fashion / restaurant chain
- Smax.ai Facebook Messenger AI agent
- Operating cost down 3x

→ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)

---

## 🗺️ Module roadmap

| # | Chapter | What you learn |
|---|------|------|
| **1** | [Vibe Coding Solo](./1-vibe-coding-solo.md) | Cursor + Claude + ship product solo |
| **2** | [Claude Code Deep](./2-claude-code-deep.md) | 30-hour autonomous coding, sub-agent orchestrator-worker |
| **3** | [Computer Use](./3-computer-use.md) | Agent clicks screen like human (72.5% baseline) |
| **4** | [Multi-Agent](./4-multi-agent.md) | Patterns: orchestrator-worker, debate, hierarchical |
| **5** | [Workflow Agent](./5-workflow-agent.md) | n8n + Smax.ai + Lindy + Vapi for ops |
| **6** | [MCP Ecosystem](./6-mcp-ecosystem.md) | MCP = 2026 standard; opportunity to build MCPs for local stacks |
| **7** | [Toolkit 2026](./toolkit-2026.md) | Full comparison: Coding + General + Workflow + Multi-agent + Infra + Voice |
| **8** | [Safety & Evals](./safety-evals.md) | CVE-2025-32711, GTG-1002, prompt injection 73% prod deploy |
| **9** | [30-Day Roadmap](./roadmap-30-days.md) | Day-by-day plan zero → shipping agent with users |

---

## 🧩 What is an agent? — 1-page explanation

::: tip 🔑 Definition
**Agent = LLM + Tools + Memory + Planning + Sandbox**

**Standard ReAct loop**:
1. **Thought** — LLM thinks what to do next
2. **Action** — Call tool
3. **Observation** — Read tool result
4. → back to step 1 (until done)
:::

<AgentLoopDemo />

---

## 🛠️ Stack overview (May 2026)

::: tip 6 layers you need
**1. Coding agents** — Claude Code, Cursor, Windsurf, Devin, Cline, Aider
**2. General-purpose agents** — Manus, Anthropic Computer Use, OpenAI Workspace
**3. Workflow / Automation** — n8n, Make, Smax.ai, Lindy, Sema4.ai
**4. Multi-agent frameworks** — LangGraph, CrewAI, Claude Code SDK, A2A
**5. Infrastructure** — E2B, Browserbase, Daytona, MCP servers
**6. Voice agents** — ElevenLabs Conversational, Vapi, Retell, Bland
:::

→ Details: [Toolkit 2026](./toolkit-2026.md)

---

## 🌏 Why emerging market devs/founders have edge

::: warning 💡 4 advantages

**1. Salary < Global → 3-5x margin runway**
- Emerging dev: $800-3K/month
- US dev: $8-15K/month
- Same tool cost ($50-500/month) → higher margin

**2. Local stack lacks MCP servers**
- VN: MISA, KiotViet, Sapo, Haravan, Pancake, Base.vn — no MCP yet
- Brazil, Indonesia, India local stacks similar
- → **Blue ocean opportunity** to build MCP gateways

**3. AI Sales + AI CS for SMEs huge market**
- Smax.ai dominates Messenger/Zalo in VN (Yody, Let's Sushi, Biluxury cases)
- 100K+ SMEs in VN alone underserved
- Same pattern repeats in Indonesia, Philippines, Thailand

**4. Operator tasks need Computer Use**
- Accounting / data entry on legacy software (no API)
- Computer Use = auto data entry replacement
:::

---

## 📊 Market numbers

| Stat | Number |
|------|------|
| Agentic AI market 2025 | **$7-8B** |
| Forecast 2034 | **$139-199B** (40-50% CAGR) |
| Enterprise apps with agents 2025 | < 5% |
| Forecast end of 2026 | **40%** |
| Gartner: AI sales agents vs human sellers 2028 | **10:1** |
| % sellers reporting agent improved productivity | **< 40%** (gap claim vs reality) |

---

## 🎯 Reading order

### 💻 New dev (no coding agent experience)
→ **Landing** → [Chapter 1 Vibe Coding](./1-vibe-coding-solo.md) → [Chapter 2 Claude Code](./2-claude-code-deep.md) → [Toolkit](./toolkit-2026.md)

### 💼 Founder building product
→ [Chapter 1 Vibe Coding](./1-vibe-coding-solo.md) → [Chapter 5 Workflow Agent](./5-workflow-agent.md) → [Chapter 6 MCP](./6-mcp-ecosystem.md) → [Roadmap](./roadmap-30-days.md)

### 🏢 Operator (HR, marketing, ops)
→ [Chapter 3 Computer Use](./3-computer-use.md) → [Chapter 5 Workflow Agent](./5-workflow-agent.md) → [Toolkit](./toolkit-2026.md)

### 🌏 Agency / system integrator
→ [Chapter 5 Workflow Agent](./5-workflow-agent.md) → [Chapter 6 MCP](./6-mcp-ecosystem.md) → [Safety](./safety-evals.md) → [Roadmap](./roadmap-30-days.md)

### 🔬 Researcher / ML engineer
→ [Chapter 4 Multi-Agent](./4-multi-agent.md) → [Chapter 6 MCP](./6-mcp-ecosystem.md) → [Safety](./safety-evals.md)

---

::: tip 🚦 Before you start
> *"2023: LLMs were chat bots.*
> *2024: LLMs could call functions.*
> *2025-2026: LLMs can **self-drive** — plan, execute, recover.*
> *Not learning agents now = watching the revolution from the sidelines."*
:::

→ Ready? Start here: [**Chapter 1 — Vibe Coding Solo**](./1-vibe-coding-solo.md)
