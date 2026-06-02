---
title: 'Multi-Agent — Orchestrator-worker (+90.2%), Devin at Goldman, Uber budget burn'
description: 'Anthropic Research multi-agent pattern beats single-agent +90.2%. Case Devin + Goldman Sachs. Cost reality (15x tokens).'
---

# Chapter 4 — Multi-Agent

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧩</p>

> **"Anthropic Research multi-agent beat Claude Opus 4 single by +90.2%.**
> **But cost 15x tokens. Worth it?"**

::: tip 🎯 You'll learn
- 4 multi-agent patterns: orchestrator-worker, debate, hierarchical, swarm
- Anthropic Research case (+90.2% internal eval)
- Devin + Goldman Sachs: hundreds of instances parallel
- Frameworks 2026: LangGraph, CrewAI, Claude Code SDK, A2A
- Cost reality + when to use / not use
:::

---

## 01 Why multi-agent?

### Single-agent limits

| Bottleneck | Single-agent |
|------|------|
| Context window | Bloats, performance drops |
| Sequential | Must do A → B → C |
| Cognitive load | 1 model handles many domains → confused |

### Multi-agent unlocks

- ✅ **Parallel** — 3 tasks at once → 3x faster
- ✅ **Specialized** — each sub-agent clear role
- ✅ **Fresh context** — sub-agents don't bloat
- ❌ **15x token cost** — expensive!
- ❌ **Coordination overhead** — orchestrator + comm protocol

---

## 02 Anthropic Research case (Apr 2025)

### Story

Anthropic built internal **multi-agent research system** for company research tasks (technical analysis, market scan, competitive intel).

### Architecture

```
        LEAD AGENT (Sonnet)
        Plan + spawn + synthesize
                │
   ┌────────────┼────────────┐
   ▼            ▼            ▼
Worker 1     Worker 2      Worker 3
Research     Verify        Citation
topic A      claims        check
```

### Result

| Metric | Single agent | Multi-agent |
|------|------|------|
| Eval score | baseline | **+90.2%** |
| Token cost | 1x | **~15x** |
| Latency | 1x | 1.5-3x (parallel sub) |
| Coordination overhead | 0 | 10-20% |

> *"Multi-agent systems can consume approximately 15x more tokens than standard chat interactions."*
> — *Anthropic*

---

## 03 Devin + Goldman Sachs — hybrid workforce

### Story

Jul 2025: Goldman Sachs deployed **Devin (Cognition)** alongside **12,000 human engineers**.

| Item | Number |
|------|------|
| Human engineers | **12,000** |
| Devin instances (peak) | **Hundreds** |
| Task type | Real engineering tickets |
| Speed gain | **3-4x faster** on complex tasks |
| Devin pricing | $20-500/month (Devin 2.0 slashed) |

> **"Devin = employee #1 in hybrid workforce."**
> — *Goldman CIO*

Pattern: **multi-instance Devin** parallel = enterprise-scale multi-agent.

### Cognition AI growth

| Metric | Number |
|------|------|
| ARR Sept 2024 | $1M |
| ARR June 2025 | **$73M** (73x in 9 months) |
| Valuation Apr 2026 | **$25B** |

---

## 04 4 multi-agent patterns

::: tip 🎯 Pattern 1: Orchestrator-Worker
**When**: Task parallel-breakable, each subtask different domain, needs final synthesis.
**Example**: Research + audit + report
:::

::: tip 🎯 Pattern 2: Debate
```
AGENT A ←──→ AGENT B    →    JUDGE AGENT
(propose)   (critique)        (decide)
```
**When**: Decision needs multi-perspective, debug LLM bias, critical judgment.
**Example**: Code review (proposer vs critic), legal contract review
:::

::: tip 🎯 Pattern 3: Hierarchical
```
       CEO AGENT (strategy)
            │
    ┌───────┴───────┐
 MANAGER A      MANAGER B
    │              │
  [W1,W2]      [W3,W4]
```
**When**: Big task needs multi-level breakdown, mimicking company.
**Example**: Full product (research → design → code → marketing)
:::

::: tip 🎯 Pattern 4: Swarm (peer-to-peer)
```
AGENT 1 ←──→ AGENT 2
   ↕              ↕
AGENT 4 ←──→ AGENT 3
```
**When**: No clear hierarchy, emergent behavior, simulation/research.
**Example**: Multi-agent RL, simulation
:::

---

## 05 Anthropic principles for sub-agents

::: warning ⚠️ 5 principles Anthropic published (Apr 2025)

**1. Each sub-agent needs clear objective** — not "help me" vague
**2. Output format defined** — JSON structured, not free text
**3. Tool guidance** — tell sub-agent which tool, when
**4. Task boundary clear** — sub-agent knows when done
**5. Fresh context window** — no peer-to-peer comm, single summary return
:::

---

## 06 Frameworks 2026 landscape

### LangGraph — production powerhouse

| Item | Detail |
|------|------|
| Approach | Graph nodes + shared state |
| Production use | Klarna, Uber, LinkedIn agents |
| Strength | Best LangSmith observability, time-travel checkpoints |
| Stars (May 2026) | Surpassed CrewAI early 2026 |
| Best for | Mission-critical production |

### CrewAI — easiest learning curve

| Item | Detail |
|------|------|
| Approach | Role-based DSL (Crew + Task + Agent) |
| Strength | **20 lines to start**, intuitive |
| Adoption | 60% Fortune 500, Insight Partners backing, 44K+ stars |
| Best for | Prototype, agency |

### AutoGen — maintenance mode (Feb 2026)

| Item | Detail |
|------|------|
| Status | Microsoft moved to maintenance mode |
| Replacement | Microsoft Agent Framework |
| Implication | Don't start new projects with AutoGen |

### OpenAI Swarm → Agents SDK

Lightweight handoff-based, OpenAI-native.

### Anthropic Claude Code SDK

Orchestrator-worker via Task tool, MCP-native, Claude-first.

### A2A protocol (Google → Linux Foundation)

- Open standard, donated Jun 2025
- 150+ supporters — Atlassian, Salesforce, ServiceNow, SAP, Workday
- Protocol: HTTP + SSE + JSON-RPC 2.0 + Agent Cards
- Best for: cross-vendor agent communication

---

## 07 When to use / not use multi-agent

::: tip ✅ Use multi-agent when
- Task has > 3 parallel subtasks
- Cost not a constraint (15x tokens)
- Need specialists (security audit + performance + UX)
- Wide domain breadth (broad research)
:::

::: warning ❌ Don't use multi-agent when
- Sequential task (A must finish before B)
- Tight budget
- Single domain
- Latency-sensitive (real-time chat)
- Coordination overhead > task value
:::

### Quick decision

```
Q1: > 3 parallel subtasks?
   NO  → Single agent
   YES → Q2

Q2: Budget allows 15x tokens?
   NO  → Single agent
   YES → Q3

Q3: Need different-domain specialists?
   NO  → Single agent (just split task)
   YES → ✅ Multi-agent
```

---

## 08 Cost economics

### Real numbers (May 2026)

| Setup | Token / task | Cost (Sonnet 4.6) | Time |
|------|------|------|------|
| Single Sonnet | 50K | **$0.75** | 30s |
| Orchestrator + 3 Haiku worker | 200K | **$1.05** | 20s (parallel) |
| Orchestrator + 5 Sonnet worker | 500K | **$7.50** | 30s |
| Anthropic Research full | 750K | **~$11** | 60-120s |

### ROI calculation

**Task value > $10**: multi-agent OK
**Task value < $1**: single agent
**Thousand tasks/day**: cost compounds — optimize prompt cache + Haiku for sub

---

## 09 Common pitfalls

::: warning 🚨 6 multi-agent mistakes

**1. Multi-agent for sequential task** → 15x cost no gain
**2. Sub-agent context overlap** → redundant info, wasted cost
**3. Inconsistent output format** → orchestrator can't parse
**4. Forget timeout** → 1 sub stuck → orchestrator waits forever
**5. No cost monitoring** → end-of-month bill shock
**6. Eval doesn't cover multi-agent** → don't know output quality
:::

---

## 10 🌏 Application in emerging markets

### Multi-agent use cases

| Use case | Pattern | Stack |
|------|------|------|
| **Multi-channel CS** (Messenger + Zalo + web) | Orchestrator-Worker | Smax.ai + Anthropic |
| **Tax compliance audit** | Hierarchical | Claude + MCP for tax DB |
| **Multi-marketplace e-com** | Swarm | n8n + Claude per channel |
| **Investment research local market** | Debate | LangGraph + market data |

### Smax.ai = micro multi-agent

Each channel (Messenger, Zalo, web, IG) = 1 sub-agent:
- Own context (channel + customer history)
- Own tools (CRM, inventory, shipping)
- Orchestrator: human agent handover

**Yody case**: +15-20% close rate = multi-agent in easy-access form for SMEs.

### Cost economics

- Emerging market dev rate: $20-50/hr
- Multi-agent system build: 2-4 weeks
- End-product cost: $200-1K/month API
- Project price (consultant): $5K-30K

→ Clear ROI for SMEs with > 1K conversations/month.

---

## 11 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Implement basic orchestrator-worker
- Task: "Audit OSS repo for X, Y, Z" parallel
- Compare cost vs single agent

**Level 2 — 1 month**
- Use CrewAI or LangGraph
- Build 1 production multi-agent (3+ workers)
- Add observability (LangSmith)

**Level 3 — 3 months**
- Pitch SME: multi-channel agent
- Deliver (Smax.ai + n8n hybrid)
- Charge $10K+
:::

---

## 12 Continue reading

- 💻 [Chapter 1 — Vibe Coding Solo](./1-agent-foundation.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md)
- 🛡️ [Chapter 8 — Safety & Evals](./safety-evals.md)

::: tip 🧩 Final word
> *"Multi-agent isn't always better.*
> *15x tokens = need clear ROI.*
> *Simple rule:*
> *- Task value > $10 → orchestrator-worker*
> *- Task value < $1 → single agent*
> *- **Parallel breakdown clear** → multi-agent*
> *- **Sequential** → single agent, even if big."*
:::
