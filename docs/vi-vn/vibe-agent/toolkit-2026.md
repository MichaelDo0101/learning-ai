---
title: 'Toolkit Agent 2026 — Coding, General, Workflow, Multi-agent, Infra, Voice'
description: 'Bảng đầy đủ tools agent T5/2026. 6 layer, 40+ tool. Pricing + use case. VN-friendly stack đề xuất.'
---

# Chapter 7 — Toolkit Agent 2026

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧰</p>

> **"40+ tool, 6 layer. Pick đúng layer trước, pick tool sau."**

::: tip 🎯 Cách dùng chapter này
1. **Đọc tổng quan 6 layer** — biết landscape
2. **Quick picker** — pick fast cho use case bạn có
3. **VN-friendly stack** — đề xuất cụ thể cho VN dev
4. **Re-check mỗi 3 tháng** — Anthropic + OpenAI release nhanh
:::

---

## 01 Layer 1: Coding Agents

### Bảng so sánh full

| Tool | Giá (T5/2026) | Strength | Best for | VN-friendly |
|------|------|------|------|------|
| **Claude Code** | $20 Pro / $100-200 Max / API | **Terminal-native, sub-agent, 30h autonomous, MCP-native** | Multi-file refactor, large codebase | ✅✅ |
| **Cursor** | $20/tháng Pro (credit-based) | Best autocomplete, polished IDE | Daily inline coding, flow editing | ✅✅ |
| **Windsurf (Cascade)** | $15/tháng Pro (cheapest top 3) | "Flows" persistent context | Value-conscious | ✅ |
| **Devin 2.0** | $20 Core / $500 Team | Cloud-based, parallel autonomous PR | Long ticket, enterprise | ✅ |
| **OpenAI Codex** | Bundle ChatGPT Plus/Pro | 2M+ WAU March 2026, cloud sandbox | ChatGPT user, cloud async | ✅ |
| **GitHub Copilot Workspace** | $10-39/user/tháng | GitHub-native | Existing GH enterprise | ✅ |
| **Replit Agent** | $25/tháng Core | Browser-based, full-stack scaffold | Non-dev MVP | ✅ |
| **Aider** | Free + your API key | 45.3K stars, terminal, git-aware | OSS purist | ✅ |
| **Cline** | Free + your API key | 62.3K stars, "trusted by 8M+", VS Code | Visual diff approval | ✅ |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Multi-file refactor codebase lớn | **Claude Code** |
| Daily inline coding flow | **Cursor** |
| Budget-tight | **Windsurf** hoặc Aider |
| Cloud async (long task) | **Devin** hoặc **OpenAI Codex** |
| Non-dev build MVP | **Replit Agent** |
| OSS / privacy concern | **Aider** hoặc **Cline** |

---

## 02 Layer 2: General-Purpose Agents

### Bảng so sánh

| Tool | Giá | Status (T5/2026) |
|------|------|------|
| **Manus AI** | $199/tháng Pro | Meta acquisition $2-3B announced, **blocked by Chinese NDRC T4/2026** — status unresolved |
| **Anthropic Computer Use** | API Sonnet 4.6 $3/$15 | Beta `computer-use-2025-11-24`; **72.5% OSWorld-Verified** (≈ human baseline) |
| **OpenAI ChatGPT Workspace Agents** | Bundle enterprise | T4/2026 — Operator absorbed |
| **Project Mariner** | — | **Shutdown T5/4/2026** — absorbed Gemini Agent |
| **Claude Code SDK** | API-priced | Orchestrator-via-Task tool, MCP-native |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Automate legacy app no-API | **Anthropic Computer Use** |
| ChatGPT-native workflow | **Workspace Agents** |
| Custom agent build | **Claude Code SDK** |

---

## 03 Layer 3: Workflow / Automation

### Bảng so sánh

| Tool | Giá | Numbers (T5/2026) | Best for |
|------|------|------|------|
| **n8n** | Free self-host / $20+ cloud / $13.3K avg ARR enterprise | **$40M ARR, $180M Series B, $2.5B valuation, 230K user, 3K+ enterprise** | Full-stack workflow, AI nodes |
| **Make** | $9-29/tháng | 1,500+ apps | Visual scenarios |
| **Zapier Central/Agents** | Variable | Established | Existing Zapier user |
| **Smax.ai (VN)** | **$25-89/tháng** by channels | **Yody +15-20% close, Let's Sushi +300% online** | VN Messenger/Zalo bot |
| **Lindy** | Free / $49.99 Pro / $299.99 Business | 2,300+ apps | No-code agent over apps |
| **Sema4.ai** | Enterprise | $55.5M raised, Emerson + Koch customer | Finance/HR enterprise |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Full-stack workflow + AI | **n8n** |
| VN Messenger/Zalo bot | **Smax.ai** |
| No-code agent for everyone | **Lindy** |
| Visual scenarios cho non-tech | **Make** |
| Enterprise SAFE | **Sema4.ai** |

---

## 04 Layer 4: Multi-Agent Frameworks

### Bảng so sánh

| Framework | Status T5/2026 | Best for |
|------|------|------|
| **LangGraph** | Production powerhouse — Klarna, Uber, LinkedIn. **Surpassed CrewAI stars early 2026**. Best LangSmith observability, time-travel checkpoint | Mission-critical production |
| **CrewAI** | Role-based DSL, **20 lines to start**. 60% Fortune 500, 44K+ stars | Prototype, agency |
| **AutoGen 0.4+** | **Microsoft moved to maintenance mode** | Don't start new project |
| **OpenAI Swarm → Agents SDK** | Lightweight handoff-based | OpenAI-native |
| **Anthropic / Claude Code SDK** | Orchestrator-worker via Task tool, MCP-native | Claude-first stack |
| **A2A protocol** | Open standard T4/9/2025, **donated Linux Foundation T6/2025**, 150+ supporters (Atlassian, Salesforce, ServiceNow, SAP, Workday) | Cross-vendor agent comm |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Production scale (Klarna-style) | **LangGraph** |
| Prototype fast | **CrewAI** |
| Claude-native | **Claude Code SDK** |
| OpenAI-native | **OpenAI Agents SDK** |
| Cross-vendor agent | **A2A** |

---

## 05 Layer 5: Infrastructure

### Bảng so sánh

| Tool | Differentiator | Customer |
|------|------|------|
| **E2B** | microVM, **~150ms cold start, 500M+ sandbox processed, 2M+ monthly downloads, 88% Fortune 100 signed** | Perplexity, Hugging Face, Groq, Manus |
| **Browserbase** | Headless browser as a service, 30 employees, **1K+ paying customer in 16 months, $40M Series B at $300M valuation** | — |
| **Daytona** | Docker-based, **<90ms sandbox creation, $24M Series A T2/2026** | — |
| **Modal / Vercel Sandbox** | Serverless compute cho agent | — |
| **MCP servers ecosystem** | **5,800+ official registry, 17,468 cross-registry, 97M monthly SDK downloads** (970x growth 18 months) | Anthropic, OpenAI, Google all adopted |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Code execution sandbox | **E2B** |
| Browser automation | **Browserbase** |
| Cheap Docker sandbox | **Daytona** |
| MCP server | **Anthropic SDK + Smithery registry** |

---

## 06 Layer 6: Voice Agents

### Bảng so sánh

| Tool | Latency | Cost/min | Strength |
|------|------|------|------|
| **ElevenLabs Conversational AI** | **<100ms** | $0.08-0.24 all-in | **11K+ voices, 70+ ngôn ngữ** |
| **Vapi** | ~150ms | $0.05 orch + provider (~$0.08-0.15 total) | **Provider-agnostic, 62M monthly call, 99.99% SLA** |
| **Retell AI** | ~620ms | $0.07+ flat | **HIPAA included, no-code + SDK** |
| **Bland** | ~400ms | Variable | Phone-first |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Multi-language brand | **ElevenLabs** |
| Custom stack + scale | **Vapi** |
| Healthcare HIPAA | **Retell** |
| Outbound phone campaign | **Bland** |

---

## 07 5 stack ideal cho persona

### Persona 1: Solo dev (budget < $100/tháng)

```
Coding: Cursor Pro ($20) or Claude Code Pro ($20)
LLM API: Claude Haiku 4.5 + Sonnet 4.6 (~$30/tháng usage)
Sandbox: E2B free tier
Deploy: Vercel free + Supabase free
─────────────
Total: ~$60-80/tháng
```

### Persona 2: Indie agent builder

```
Coding: Claude Code Max ($100)
Workflow: n8n cloud Starter ($20)
Infra: E2B ($20) + Browserbase free tier
Voice: Vapi ($30 usage)
─────────────
Total: ~$170/tháng
```

### Persona 3: VN agency (serving SME)

```
Coding: Claude Code Pro ($20)
Workflow: Smax.ai Pro ($89) + n8n Pro ($50)
LLM: Claude API ($50-200 usage)
Voice: Vapi ($50-200)
CRM: Pancake ($30)
─────────────
Total: ~$280-580/tháng (per project, charge $5-15K)
```

### Persona 4: Enterprise team (10+ dev)

```
Coding: Claude Code Max × 10 dev ($1,000-2,000)
Workflow: n8n Enterprise ($1K+)
Multi-agent: LangGraph (LangSmith $250+)
Voice: Vapi enterprise ($500+)
Eval: Braintrust ($500)
─────────────
Total: ~$3K-5K/tháng
```

### Persona 5: Operator non-dev

```
Workflow: Lindy Pro ($49.99) or Make ($29)
LLM: ChatGPT Plus ($20)
Voice: Retell no-code tier
─────────────
Total: ~$70-100/tháng
```

---

## 08 🇻🇳 VN-friendly recommend

### 💳 Payment cho subscription

Card khuyên dùng VN:
- **Techcombank Visa Debit** (free debit, OK Stripe)
- **VPBank Online Plus**
- **TPBank EVO**
- **Wise card** (best nếu travel + multi-currency)

### 🌐 Community VN cho từng layer

| Layer | Community |
|------|------|
| Coding agent | **F8** (Sơn Đặng) + "Cursor VN" FB |
| Workflow | **"n8n Vietnam" FB** + Smax.ai user group |
| Voice | "AI Voice Vietnam" (đang manh nha) |
| MCP | **"AI Vietnam" + "Anthropic Vietnam"** Discord/FB |
| Multi-agent | **"LangChain Vietnam"** FB |

### 🇻🇳 VN-specific tools

| Tool | Use case |
|------|------|
| **Smax.ai** | Messenger + Zalo bot — VN leader |
| **Pancake** | CRM cho Messenger/Zalo user VN |
| **Misa / Misa AMIS** | Kế toán + HR + ERP SME (need MCP) |
| **KiotViet** | F&B/retail POS (need MCP) |
| **Base.vn** | HR + work management (need MCP) |
| **Zalo OA** | Mass message Vietnam audience |

---

## 09 Selection framework

::: tip 🎯 Decision tree

**Câu hỏi 1: Use case là gì?**
- Coding solo → Layer 1 (Claude Code / Cursor)
- Automate workflow → Layer 3 (n8n / Smax.ai)
- Custom agent product → Layer 4-5 (LangGraph + E2B)
- Voice → Layer 6 (Vapi / ElevenLabs)

**Câu hỏi 2: Budget?**
- < $100/tháng → free tier + Pro tier 1 tool
- $100-500/tháng → multi-layer stack indie
- > $500/tháng → enterprise tier hoặc team

**Câu hỏi 3: VN context có cần không?**
- Có (target VN customer) → Smax.ai + Zalo OA + Pancake mandatory
- Không (global) → standard global stack

**Câu hỏi 4: Skill level?**
- Non-dev → Lindy + Make + Replit Agent
- Dev junior → Cursor + n8n + ChatGPT
- Dev senior → Claude Code + LangGraph + custom MCP
:::

---

## 10 Update cadence

::: warning ⚠️ Tools update nhanh — re-check 3 tháng

**Things đang đổi nhanh nhất**:
- Pricing tiers (Anthropic, OpenAI rotate)
- New model versions (Sonnet 4.7+, Opus 5?, GPT-5.5?)
- MCP server count (97M/tháng → có thể 200M T8/2026)
- Computer Use benchmark (72.5% có thể >80%)

**Bookmark page này. Ping cộng đồng VN khi có thay đổi.**
:::

---

## 11 Đọc tiếp

- 💻 [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md)
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md)
- 🛡️ [Chapter 8 — Safety & Evals](./safety-evals.md)
- 🗓️ [Chapter 9 — Roadmap 30 ngày](./roadmap-30-days.md)

::: tip 🧰 Lời cuối
> *"Đừng nhớ tool. Nhớ **role của layer**.*
>
> *Coding agent = augment human dev.*
> *Computer Use = automate legacy.*
> *Workflow = orchestrate cross-app.*
> *Multi-agent = parallel specialist.*
> *MCP = standard interconnect.*
> *Voice = phone/call interface.*
>
> *Tool sẽ rotate. Layer sẽ stay."*
:::
