---
title: 'Toolkit Agent 2026 — Coding, General, Workflow, Multi-agent, Infra, Voice'
description: 'Complete agent tools table May 2026. 6 layers, 40+ tools. Pricing + use cases.'
---

# Chapter 7 — Toolkit Agent 2026

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧰</p>

> **"40+ tools, 6 layers. Pick the layer first, the tool second."**

::: tip 🎯 How to use this chapter
1. **Read overview tables** — know the landscape
2. **Quick picker** — fast tool choice for use case
3. **Re-check every 3 months** — Anthropic + OpenAI release fast
:::

---

## 01 Layer 1: Coding Agents

| Tool | Price (May 2026) | Strength | Best for |
|------|------|------|------|
| **Claude Code** | $20 Pro / $100-200 Max / API | **Terminal-native, sub-agent, 30h autonomous, MCP-native** | Multi-file refactor, large codebase |
| **Cursor** | $20/month Pro (credit-based) | Best autocomplete, polished IDE | Daily inline coding |
| **Windsurf (Cascade)** | $15/month Pro (cheapest top 3) | "Flows" persistent context | Value-conscious |
| **Devin 2.0** | $20 Core / $500 Team | Cloud-based, parallel autonomous PR | Long tickets, enterprise |
| **OpenAI Codex** | Bundle ChatGPT Plus/Pro | 2M+ WAU Mar 2026, cloud sandbox | ChatGPT users, cloud async |
| **GitHub Copilot Workspace** | $10-39/user/month | GitHub-native | Existing GH enterprises |
| **Replit Agent** | $25/month Core | Browser-based, full-stack scaffold | Non-dev MVP |
| **Aider** | Free + your API key | 45.3K stars, terminal, git-aware | OSS purists |
| **Cline** | Free + your API key | 62.3K stars, "trusted by 8M+", VS Code | Visual diff approval |

### 🎯 Quick picker

| Use case | Top pick | Backup |
|------|------|------|
| Multi-file refactor large codebase | **Claude Code** | Devin |
| Daily inline coding flow | **Cursor** | Windsurf |
| Budget-tight | **Windsurf** or Aider | Cline |
| Cloud async (long task) | **Devin** or **OpenAI Codex** | — |
| Non-dev build MVP | **Replit Agent** | Lovable |
| OSS / privacy concern | **Aider** or **Cline** | — |

---

## 02 Layer 2: General-Purpose Agents

| Tool | Price | Status (May 2026) |
|------|------|------|
| **Manus AI** | $199/month Pro | **Blocked by Chinese NDRC Apr 2026** — Meta acquisition $2-3B unresolved |
| **Anthropic Computer Use** | API Sonnet 4.6 $3/$15 | Beta `computer-use-2025-11-24`; **72.5% OSWorld-Verified** |
| **OpenAI ChatGPT Workspace Agents** | Bundle enterprise | Apr 2026 — Operator absorbed |
| **Project Mariner** | — | **Shutdown May 4, 2026** — absorbed into Gemini Agent |
| **Claude Code SDK** | API-priced | Orchestrator-via-Task tool, MCP-native |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Automate legacy app no-API | **Anthropic Computer Use** |
| ChatGPT-native workflow | **Workspace Agents** |
| Build custom agent | **Claude Code SDK** |

---

## 03 Layer 3: Workflow / Automation

| Tool | Price | Numbers (May 2026) | Best for |
|------|------|------|------|
| **n8n** | Free / $20+ cloud / $13.3K avg ARR enterprise | **$40M ARR, $180M Series B, $2.5B valuation, 230K users, 3K+ enterprise** | Full-stack workflow, AI nodes |
| **Make** | $9-29/month | 1,500+ apps | Visual scenarios |
| **Zapier Central/Agents** | Variable | Established | Existing Zapier users |
| **Smax.ai (Vietnam)** | **$25-89/month** | **Yody +15-20% close, Let's Sushi +300% online** | VN Messenger/Zalo bot |
| **Lindy** | Free / $49.99 Pro / $299.99 Business | 2,300+ apps | No-code agent |
| **Sema4.ai** | Enterprise | $55.5M raised, Emerson + Koch | Finance/HR enterprise |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Full-stack workflow + AI | **n8n** |
| Vietnamese Messenger/Zalo | **Smax.ai** |
| No-code agent for all | **Lindy** |
| Visual scenarios non-tech | **Make** |
| Enterprise SAFE | **Sema4.ai** |

---

## 04 Layer 4: Multi-Agent Frameworks

| Framework | Status May 2026 | Best for |
|------|------|------|
| **LangGraph** | Production powerhouse — Klarna, Uber, LinkedIn. **Surpassed CrewAI stars early 2026**. | Mission-critical production |
| **CrewAI** | Role-based DSL, **20 lines to start**. 60% Fortune 500, 44K+ stars | Prototype, agency |
| **AutoGen 0.4+** | **Microsoft maintenance mode** | Don't start new |
| **OpenAI Swarm → Agents SDK** | Lightweight handoff-based | OpenAI-native |
| **Anthropic / Claude Code SDK** | Orchestrator-worker via Task tool, MCP-native | Claude-first stack |
| **A2A protocol** | Open standard Apr 2025, **donated Linux Foundation Jun 2025**, 150+ supporters | Cross-vendor agents |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Production scale | **LangGraph** |
| Prototype fast | **CrewAI** |
| Claude-native | **Claude Code SDK** |
| OpenAI-native | **OpenAI Agents SDK** |
| Cross-vendor agents | **A2A** |

---

## 05 Layer 5: Infrastructure

| Tool | Differentiator | Customers |
|------|------|------|
| **E2B** | microVM, **~150ms cold start, 500M+ sandboxes processed, 88% Fortune 100 signed** | Perplexity, Hugging Face, Groq, Manus |
| **Browserbase** | Headless browser as a service, **1K+ paying customers in 16 months, $40M Series B at $300M valuation** | — |
| **Daytona** | Docker-based, **<90ms sandbox creation, $24M Series A Feb 2026** | — |
| **Modal / Vercel Sandbox** | Serverless compute for agents | — |
| **MCP servers ecosystem** | **5,800+ official, 17,468 cross-registry, 97M monthly SDK downloads** | Anthropic, OpenAI, Google all adopted |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Code execution sandbox | **E2B** |
| Browser automation | **Browserbase** |
| Cheap Docker sandbox | **Daytona** |
| MCP server | **Anthropic SDK + Smithery** |

---

## 06 Layer 6: Voice Agents

| Tool | Latency | Cost/min | Strength |
|------|------|------|------|
| **ElevenLabs Conversational AI** | **<100ms** | $0.08-0.24 | **11K+ voices, 70+ languages** |
| **Vapi** | ~150ms | $0.05 orch + provider | **Provider-agnostic, 62M monthly calls, 99.99% SLA** |
| **Retell AI** | ~620ms | $0.07+ flat | **HIPAA included, no-code + SDK** |
| **Bland** | ~400ms | Variable | Phone-first |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Multi-language brand | **ElevenLabs** |
| Custom stack + scale | **Vapi** |
| Healthcare HIPAA | **Retell** |
| Outbound campaigns | **Bland** |

---

## 07 5 ideal stacks by persona

### Persona 1: Solo dev (budget < $100/month)

```
Coding: Cursor Pro ($20) or Claude Code Pro ($20)
LLM API: Claude Haiku 4.5 + Sonnet 4.6 (~$30/month usage)
Sandbox: E2B free tier
Deploy: Vercel free + Supabase free
─────────────
Total: ~$60-80/month
```

### Persona 2: Indie agent builder

```
Coding: Claude Code Max ($100)
Workflow: n8n cloud Starter ($20)
Infra: E2B ($20) + Browserbase free tier
Voice: Vapi ($30 usage)
─────────────
Total: ~$170/month
```

### Persona 3: Agency (serving SMEs)

```
Coding: Claude Code Pro ($20)
Workflow: Smax.ai Pro ($89) + n8n Pro ($50)
LLM: Claude API ($50-200 usage)
Voice: Vapi ($50-200)
CRM: Pancake ($30)
─────────────
Total: ~$280-580/month (charge $5-15K project)
```

### Persona 4: Enterprise team (10+ devs)

```
Coding: Claude Code Max × 10 devs ($1,000-2,000)
Workflow: n8n Enterprise ($1K+)
Multi-agent: LangGraph (LangSmith $250+)
Voice: Vapi enterprise ($500+)
Eval: Braintrust ($500)
─────────────
Total: ~$3K-5K/month
```

### Persona 5: Operator non-dev

```
Workflow: Lindy Pro ($49.99) or Make ($29)
LLM: ChatGPT Plus ($20)
Voice: Retell no-code tier
─────────────
Total: ~$70-100/month
```

---

## 08 Selection framework

::: tip 🎯 Decision tree

**Q1: What's the use case?**
- Solo coding → Layer 1 (Claude Code / Cursor)
- Automate workflow → Layer 3 (n8n / Smax.ai)
- Custom agent product → Layer 4-5 (LangGraph + E2B)
- Voice → Layer 6 (Vapi / ElevenLabs)

**Q2: Budget?**
- < $100/month → free tier + 1 Pro tool
- $100-500/month → multi-layer indie stack
- > $500/month → enterprise tier or team

**Q3: Regional context needed?**
- Yes (target VN customer) → Smax.ai + Zalo OA + Pancake mandatory
- No (global) → standard global stack

**Q4: Skill level?**
- Non-dev → Lindy + Make + Replit Agent
- Junior dev → Cursor + n8n + ChatGPT
- Senior dev → Claude Code + LangGraph + custom MCP
:::

---

## 09 Continue reading

- 💻 [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md)
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md)
- 🛡️ [Chapter 8 — Safety & Evals](./safety-evals.md)
- 🗓️ [Chapter 9 — 30-Day Roadmap](./roadmap-30-days.md)

::: tip 🧰 Final word
> *"Don't memorize tools. Memorize **layer roles**.*
> *Coding agent = augment human dev.*
> *Computer Use = automate legacy.*
> *Workflow = orchestrate cross-app.*
> *Multi-agent = parallel specialists.*
> *MCP = standard interconnect.*
> *Voice = phone/call interface.*
> *Tools rotate. Layers stay."*
:::
