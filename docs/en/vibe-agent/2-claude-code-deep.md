---
title: 'Claude Code Deep — 30 hours autonomous, 11K lines, sub-agent orchestrator'
description: 'Claude Sonnet 4.5/4.6 coding agent. Case Jaana Dogan (Google Gemini), Uber CTO budget burn, MCP integration. Sub-agent orchestrator-worker pattern.'
---

# Chapter 2 — Claude Code Deep

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧠</p>

> **"30 hours autonomous coding. 11,000 lines. Zero intervention."**
> — *Claude Sonnet 4.5, Sep 2025*

::: tip 🎯 You'll learn
- Claude Code architecture: agent loop + tools + MCP
- Sub-agent orchestrator-worker pattern (Anthropic Research style)
- Case: Jaana Dogan (60 min on problem Google team iterated all of 2024)
- Cost economics: Uber CTO burns $500-2K/dev/month
- Workflow for devs + global freelance rates
:::

---

## 01 What is Claude Code?

**Claude Code** = Anthropic's terminal-native autonomous coding agent.

### Architecture

```
┌─────────────────────────┐
│   Claude Sonnet 4.6      │
│   (or Opus 4.7)          │
└───────────┬─────────────┘
            │
        Agent loop (ReAct)
            │
   ┌────────┼────────┐
   │        │        │
 Tools    Memory   MCP
(Bash,   (history (3rd-party
 Read,   + plan)   servers)
 Edit,
 Grep)
```

### Pricing (May 2026)

| Tier | Cost/month | Use case |
|------|------|------|
| **Pro** | $20 | Personal dev, light usage |
| **Max** | $100-200 | Pro dev, heavy use |
| **API pay-as-you-go** | $3/$15 per MTok (Sonnet 4.6) | Custom integration |
| | $5/$25 per MTok (Opus 4.7) | Heavy / mission-critical |

---

## 02 Sonnet 4.5 — "30 hours autonomous" moment

### Story

Sep 2025, Anthropic released Sonnet 4.5. **Biggest demo**: 1 Claude Code instance ran:

| Metric | Number |
|------|------|
| Autonomous coding time | **30+ hours continuous** |
| Code generated | **~11,000 lines** |
| Human intervention | **0** |
| Task | Full-stack app from scratch |

### Why breakthrough?

Before Sonnet 4.5:
- GPT-4 / Claude 3.5 autonomous: 1-4 hours before "context drift" or fail
- 4-8 hours was max human-trust threshold

After Sonnet 4.5:
- **30+ continuous hours** — model maintains context, plans recovery on errors
- Anthropic calls this the first true "agentic" model

---

## 03 Sonnet 4.6 + Opus 4.7 (May 2026)

| Model | Release | Strength | Best for |
|------|------|------|------|
| **Sonnet 4.5** | Sep 2025 | Balance price/perf, 30h autonomous | Daily coding |
| **Sonnet 4.6** | Feb 2026 | OSWorld 72.5% (≈ human baseline) | Daily coding upgrade |
| **Opus 4.7** | Mar 2026 | Best reasoning, complex architecture | Critical, mission-critical |
| **Haiku 4.5** | Jan 2026 | Fast + cheap ($1/$5/MTok) | Sub-agent worker, bulk |

---

## 04 Case 1 — Jaana Dogan / Google Gemini API team

**Jaana Dogan** = senior engineer Google Gemini API. She worked on **distributed agent orchestration system** all of 2024.

Feb 2025 she tried Claude Code.

| Item | Number |
|------|------|
| Problem | Distributed agent orchestration |
| Google team iterated | **All of 2024** |
| Claude Code solo | **60 minutes** |
| Output | Working prototype |

> *"Claude Code solved in 60 minutes what my team at Gemini iterated on for a year."*
> — *Jaana Dogan*

→ **Lesson**: even senior engineers at top-tier companies get 10x'd by Claude Code. Not replace — augment.

---

## 05 Case 2 — Uber CTO burns AI budget in 4 months

### Story

Apr 2026 — Uber CTO public report:

| Metric | Number |
|------|------|
| Claude Code adoption | **32% → 84%** in 5,000-engineer org |
| Per-engineer API cost | **$500-$2,000/month** |
| Total 2026 annual budget | **Burned in 4 months** |
| Reason | Adoption rise + agentic workflows consume tokens |

> *"Burned through entire 2026 AI budget in 4 months."*
> — *Uber CTO*

→ **Lesson**: Agent coding cost isn't free. Cost-control is critical skill (section 08).

---

## 06 Sub-agent orchestrator-worker pattern

::: tip 🎯 Standard 2026 pattern

```
┌───────────────────────┐
│  ORCHESTRATOR AGENT    │ (Sonnet 4.6 / Opus 4.7)
│  (Lead, plan, synth)   │
└──────────┬────────────┘
           │
   ┌───────┼───────┐
┌──▼──┐ ┌──▼──┐ ┌──▼──┐
│ Sub │ │ Sub │ │ Sub │   (Haiku 4.5 — cheap, fast)
│ #1  │ │ #2  │ │ #3  │
└─────┘ └─────┘ └─────┘
```

**How it works**:
1. Orchestrator receives big task
2. Breaks into 3-5 parallel subtasks
3. Spawns sub-agent (Task tool) per subtask
4. Sub-agent has **fresh context window** (no bloat)
5. Sub-agent returns summary to orchestrator
6. Orchestrator synthesizes → final output

**Anthropic Research case** (Apr 2025):
- Beat single-agent Claude Opus 4 by **90.2%** on internal eval
- **Cost**: 15x tokens vs single chat
:::

### Code example (Claude Code SDK)

```typescript
import { Anthropic } from '@anthropic-ai/sdk';
const client = new Anthropic();

async function leadAgent(task: string) {
  const plan = await client.messages.create({
    model: 'claude-sonnet-4-6',
    system: 'Break tasks into 3 parallel subtasks.',
    messages: [{ role: 'user', content: task }],
  });
  
  const subtasks = parsePlan(plan);
  
  const workerResults = await Promise.all(
    subtasks.map(subtask =>
      client.messages.create({
        model: 'claude-haiku-4-5',
        system: `Complete this subtask: ${subtask}`,
        messages: [{ role: 'user', content: subtask }],
        tools: [readFile, grep, bash],
      })
    )
  );
  
  return client.messages.create({
    model: 'claude-sonnet-4-6',
    system: 'Combine subtask results into report.',
    messages: [{
      role: 'user',
      content: `Task: ${task}\n\nResults:\n${workerResults.map(r => r.content[0].text).join('\n\n---\n\n')}`
    }],
  });
}
```

---

## 07 5 practical patterns

### Pattern 1: Code Review
Orchestrator: review PR → Sub 1 (style/lint) + Sub 2 (security) + Sub 3 (test coverage) → synthesize comment

### Pattern 2: Ticket triage
Orchestrator: triage 50 GH issues → Sub 1 (classify) + Sub 2 (priority) + Sub 3 (assignee) → spreadsheet

### Pattern 3: Doc gen
Orchestrator: API doc → Sub 1 (extract routes) + Sub 2 (parse types) + Sub 3 (gen examples) → OpenAPI spec

### Pattern 4: Migration
Orchestrator: React 17 → 19 → Sub 1 (imports) + Sub 2 (deprecated API) + Sub 3 (tests) → PR

### Pattern 5: Research
Orchestrator: "Why slow checkout?" → Sub 1 (DB profile) + Sub 2 (network) + Sub 3 (frontend) → root cause

---

## 08 Cost control — 5 levers

::: tip 💰 5 ways to reduce Claude Code cost

**1. Prompt caching (Anthropic native)** — 90% input cost off if prefix cache hit
**2. Batch processing** — 50% off, 24h SLA
**3. Haiku for sub-agents** — 5x cheaper than Sonnet
**4. Context discipline** — Grep before Read, sub-agent fresh context
**5. Eval gate** — test 10 samples before running 1000
:::

### Cost cheat sheet (May 2026)

| Model | Input ($/MTok) | Output ($/MTok) |
|------|------|------|
| Haiku 4.5 | $1 | $5 |
| Sonnet 4.6 | $3 | $15 |
| Opus 4.7 | $5 | $25 |
| Opus 4.7 Fast | $30 | $150 (6x) |

→ **Rule of thumb**: 1 typical Claude Code task ~$0.10-2 depending on scope.

---

## 09 MCP integration (brief — see Chapter 6)

Claude Code is **MCP-native**. Setup 1 MCP server:

```json
// ~/.claude.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    }
  }
}
```

→ Claude Code uses tool `mcp__github__*` etc. directly.

→ Details: [Chapter 6 — MCP](./6-mcp-ecosystem.md)

---

## 10 🌏 Global freelance with Claude Code

### Freelance day rates

| Region | Rate/day Claude Code dev |
|------|------|
| **France** (benchmark) | **€550-900/day** |
| **US** | $600-1,500/day |
| **UK** | £400-700/day |
| **Germany** | €500-800/day |
| **Singapore** | S$500-1,000/day |

→ **Emerging market dev knowing Claude Code can bill $200-500/day freelance** (vs $30-80/hr local rates).

### Skills needed

1. ✅ **English communication** — required
2. ✅ **Claude Code + MCP** proficiency — differentiator
3. ✅ **Codebase navigation** — Grep/Glob/Read fluency
4. ✅ **Architecture sense** — when orchestrator, when single agent
5. ✅ **Cost awareness** — don't burn client budget

### Where to find gigs

- **Toptal** — top freelance, vetted
- **Arc.dev** — remote-first
- **Lemon.io** — Vietnam-friendly
- **WIP.co, IndieHackers** — solo founder hire
- **Twitter / X** — direct outreach

---

## 11 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Setup Claude Code Pro ($20)
- Pick 1 OSS repo → contribute 3 PRs with Claude Code
- Test 2 MCP servers (GitHub + Postgres)

**Level 2 — 1 month**
- Implement orchestrator-worker for 1 internal task
- Measure cost vs time saved
- Write tutorial / case study

**Level 3 — 3 months**
- Land 1 freelance gig $200+/day with Claude Code
- Build 5 internal MCP servers for team
- Eval framework: measure agent task success rate
:::

---

## 12 Continue reading

- 💻 [Chapter 1 — Vibe Coding Solo](./1-agent-foundation.md)
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md)
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md)
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md)
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)

::: tip 🧠 Final word
> *"Claude Code doesn't replace devs. It **replaces devs who don't use Claude Code**.*
> *Like IDEs didn't replace programmers in 1990. But programmers in 2026 who don't use IDEs = dead.*
> *2030 will be **devs who don't use agents = dead**."*
:::
