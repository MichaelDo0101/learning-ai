---
title: 'Claude Code Deep — 30 tiếng autonomous, 11K dòng, sub-agent orchestrator'
description: 'Claude Sonnet 4.5/4.6 coding agent. Case Jaana Dogan (Google Gemini), Uber CTO burn budget 4 tháng, MCP integration. Sub-agent orchestrator-worker pattern.'
---

# Chapter 2 — Claude Code Deep

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧠</p>

> **"30 tiếng autonomous coding. 11,000 dòng code. Không can thiệp."**
> — *Claude Sonnet 4.5, T9/2025*

::: tip 🎯 Bạn sẽ học
- Claude Code architecture: agent loop + tool + MCP
- Sub-agent orchestrator-worker pattern (như Anthropic Research)
- Case: Jaana Dogan (60 phút giải bài toán team Google làm cả năm)
- Cost economics: Uber CTO burn $500-2K/dev/tháng
- Workflow chuẩn cho VN dev + freelance global rate
:::

---

## 01 Claude Code là gì?

**Claude Code** = terminal-native autonomous coding agent của Anthropic.

### Architecture

```
┌─────────────────────────────────┐
│         Claude Sonnet 4.6         │
│         (or Opus 4.7)             │
└─────────────────┬─────────────────┘
                  │
        ┌─────────┴─────────┐
        │   Agent loop      │
        │  (ReAct pattern)   │
        └─────────┬─────────┘
                  │
   ┌──────────────┼──────────────┐
   │              │              │
┌──▼────┐   ┌────▼─────┐   ┌────▼─────┐
│ Tools  │   │  Memory  │   │   MCP    │
│ (Bash, │   │ (history │   │ servers  │
│  Read, │   │ + plan)  │   │ (3rd-    │
│  Edit, │   └──────────┘   │  party)  │
│  Grep, │                  └──────────┘
│  ...) │
└────────┘
```

### Tier pricing (T5/2026)

| Tier | Cost/tháng | Use case |
|------|------|------|
| **Pro** | $20 | Personal dev, light usage |
| **Max** | $100-200 | Pro dev, heavy use |
| **API pay-as-you-go** | $3/$15 per MTok (Sonnet 4.6) | Custom integration |
| | $5/$25 per MTok (Opus 4.7) | Heavy task, mission-critical |

---

## 02 Sonnet 4.5 — moment "30 tiếng autonomous"

### Story

T9/2025, Anthropic release Sonnet 4.5. **Demo lớn nhất**: 1 instance Claude Code:

| Metric | Số |
|------|------|
| Autonomous coding time | **30+ giờ liên tục** |
| Code generated | **~11,000 dòng** |
| Human intervention | **0** |
| Task | Build full-stack app từ scratch |

### Vì sao đột phá?

Trước Sonnet 4.5:
- GPT-4 / Claude 3.5 autonomous: 1-4 giờ trước "context drift" hoặc fail
- 4-8 giờ là max human-trust threshold

Sau Sonnet 4.5:
- **30+ giờ continuous** — model maintain context, plan recover khi error
- Anthropic gọi đây là "agentic" model thật sự

---

## 03 Sonnet 4.6 + Opus 4.7 (T5/2026)

| Model | Release | Strength | Best for |
|------|------|------|------|
| **Sonnet 4.5** | T9/2025 | Balance giá/perf, 30h autonomous | Daily coding |
| **Sonnet 4.6** | T2/2026 | OSWorld 72.5% (≈ human baseline) | Daily coding upgrade |
| **Opus 4.7** | T3/2026 | Best reasoning, complex architecture | Critical task, mission-critical |
| **Haiku 4.5** | T1/2026 | Fast + cheap ($1/$5/MTok) | Sub-agent worker, bulk task |

---

## 04 Case 1 — Jaana Dogan / Google Gemini API team

### Story

**Jaana Dogan** = senior engineer Google Gemini API team. Cô làm việc về **distributed agent orchestration system** suốt 2024.

T2/2025: cô thử Claude Code.

| Item | Số |
|------|------|
| Bài toán | Distributed agent orchestration |
| Team Google iterate | **Cả năm 2024** |
| Claude Code solo | **60 phút** |
| Output | Working prototype |

> *"Claude Code giải 60 phút bài toán team Gemini iterate cả năm."*
> — *Jaana Dogan*

→ **Bài học**: kể cả senior engineer ở top-tier company cũng được Claude Code 10x. Không phải replace, mà augment.

---

## 05 Case 2 — Uber CTO burn AI budget 4 tháng

### Story

T4/2026 — Uber CTO public report:

| Metric | Số |
|------|------|
| Claude Code adoption | **32% → 84%** trong 5,000-engineer org |
| Per-engineer API cost | **$500-$2,000/tháng** |
| Total annual budget 2026 | **Hết trong 4 tháng** |
| Lý do | Adoption tăng + agentic workflows tốn token |

### Quote

> *"Burned through entire 2026 AI budget in 4 months."*
> — *Uber CTO*

→ **Bài học**: Agent coding cost không free. Cost-control là kỹ năng quan trọng (xem section 08).

---

## 06 Sub-agent orchestrator-worker pattern

::: tip 🎯 Pattern chuẩn 2026

```
┌────────────────────────┐
│  ORCHESTRATOR AGENT     │ (Sonnet 4.6 / Opus 4.7)
│  (Lead, plan, synth)    │
└──────────┬─────────────┘
           │
   ┌───────┼───────┐
   │       │       │
┌──▼──┐ ┌──▼──┐ ┌──▼──┐
│ Sub │ │ Sub │ │ Sub │   (Haiku 4.5 — cheap, fast)
│ #1  │ │ #2  │ │ #3  │
└─────┘ └─────┘ └─────┘
 ↓        ↓        ↓
 Tool    Tool    Tool
```

**Cách hoạt động**:
1. Orchestrator nhận task lớn
2. Phân chia thành 3-5 subtask song song
3. Spawn sub-agent (Task tool) cho mỗi subtask
4. Sub-agent có **fresh context window** (không bị bloat)
5. Sub-agent return summary cho orchestrator
6. Orchestrator synthesize → output cuối

**Anthropic Research case** (T4/2025):
- Beat single-agent Claude Opus 4 by **90.2%** trên internal eval
- **Cost**: 15x token vs single chat
:::

### Code example (Claude Code SDK)

```typescript
// Orchestrator spawns sub-agents
import { Anthropic } from '@anthropic-ai/sdk';

const orchestrator = new Anthropic();

const task = "Audit codebase for security issues + write report";

// Spawn 3 sub-agents in parallel
const subagents = await Promise.all([
  orchestrator.messages.create({
    model: 'claude-haiku-4-5',
    system: 'You audit SQL injection vulnerabilities.',
    messages: [{ role: 'user', content: 'Scan /src/db/' }],
    tools: [readFile, grep],
  }),
  orchestrator.messages.create({
    model: 'claude-haiku-4-5',
    system: 'You audit XSS vulnerabilities.',
    messages: [{ role: 'user', content: 'Scan /src/components/' }],
    tools: [readFile, grep],
  }),
  orchestrator.messages.create({
    model: 'claude-haiku-4-5',
    system: 'You audit auth bypass.',
    messages: [{ role: 'user', content: 'Scan /src/auth/' }],
    tools: [readFile, grep],
  }),
]);

// Synthesize with Sonnet orchestrator
const report = await orchestrator.messages.create({
  model: 'claude-sonnet-4-6',
  system: 'You synthesize security audit reports.',
  messages: [{
    role: 'user',
    content: `Combine 3 audit findings:\n${subagents.map(s => s.content[0].text).join('\n\n')}`
  }],
});
```

---

## 07 Pattern thực hành — 5 case

### Pattern 1: Code Review

```
Orchestrator: review pull request #123
├─ Sub 1 (Haiku): check style + lint
├─ Sub 2 (Haiku): check security 
├─ Sub 3 (Haiku): check test coverage
└─ Synthesize: post comment to PR
```

### Pattern 2: Ticket triage

```
Orchestrator: triage 50 GitHub issue
├─ Sub 1: classify bug vs feature
├─ Sub 2: assess priority
├─ Sub 3: suggest assignee
└─ Output: triaged spreadsheet
```

### Pattern 3: Doc gen

```
Orchestrator: generate API doc for service
├─ Sub 1: extract endpoint from /routes/
├─ Sub 2: parse comment + types
├─ Sub 3: gen example request/response
└─ Output: OpenAPI spec + Markdown
```

### Pattern 4: Migration

```
Orchestrator: migrate React 17 → 19
├─ Sub 1: update import + lifecycle
├─ Sub 2: fix deprecated API
├─ Sub 3: update test
└─ Output: PR with changeset
```

### Pattern 5: Research

```
Orchestrator: investigate "Why is checkout slow?"
├─ Sub 1: profile DB query
├─ Sub 2: profile network
├─ Sub 3: profile frontend render
└─ Synthesize: root cause + fix proposal
```

---

## 08 Cost control — 5 lever

::: tip 💰 5 cách giảm cost Claude Code

**1. Prompt caching (Anthropic native)**
- Cache prompt prefix → giảm 90% input cost
- Use khi: same system prompt + same context, varied query

**2. Batch processing (50% discount)**
- API batch endpoint: 50% off, 24h SLA
- Use khi: không cần realtime (bulk task)

**3. Haiku for sub-agents**
- Orchestrator: Sonnet/Opus
- Sub-agents: Haiku (5x rẻ hơn)
- Total cost: 30-50% so với all-Sonnet

**4. Context window discipline**
- Đừng dump whole codebase
- Use Grep/Glob first → only Read needed file
- Sub-agent fresh context tránh bloat

**5. Eval before scale**
- Test prompt với 10 sample trước khi run 1000
- Catch hallucination/error early
:::

### Cost cheat sheet (T5/2026)

| Model | Input ($/MTok) | Output ($/MTok) |
|------|------|------|
| Haiku 4.5 | $1 | $5 |
| Sonnet 4.6 | $3 | $15 |
| Opus 4.7 | $5 | $25 |
| Opus 4.7 Fast | $30 | $150 (6x) |

→ **Rule of thumb**: 1 typical Claude Code task ~$0.10-2 tuỳ scope.

---

## 09 MCP integration (briefly — chi tiết Chapter 6)

Claude Code có **MCP-native**. Setup 1 MCP server:

```json
// ~/.claude.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "..." }
    }
  }
}
```

→ Claude Code dùng tool `mcp__github__*`, `mcp__supabase__*` để ops trực tiếp.

→ Chi tiết MCP ecosystem: [Chapter 6 — MCP](./6-mcp-ecosystem.md)

---

## 10 Workflow chuẩn — VN dev

### Daily workflow

```
☀️ Sáng (1h):
  - Triage GitHub issue → label, priority
  - Run security audit weekly

🌞 Trưa-chiều (4-6h):
  - Feature ship với Claude Code
  - Sub-agent cho large refactor
  
🌙 Tối (1h):
  - Doc update
  - Commit + push
  - Tweet build-in-public
```

### Weekly workflow

```
Mon: Sprint planning + ticket prioritization
Tue-Fri: Feature ship 
Sat: Refactor + tech debt
Sun: Off / read AI news
```

---

## 11 🇻🇳 VN dev — go global với Claude Code

### Rate freelance global benchmark

| Region | Rate/day Claude Code dev |
|------|------|
| **France** (benchmark) | **€550-900/ngày** |
| **US** | $600-1,500/ngày |
| **UK** | £400-700/ngày |
| **Germany** | €500-800/ngày |
| **Singapore** | S$500-1,000/ngày |

→ **VN dev biết Claude Code có thể bill $200-500/ngày freelance** (vs $30-80/giờ local).

### Skills cần để bill rate global

1. ✅ **English communication** (verbal + written) — required
2. ✅ **Claude Code + MCP** proficiency — differentiator
3. ✅ **Codebase navigation** — biết dùng Grep/Glob/Read
4. ✅ **Architecture sense** — biết khi nào orchestrator, khi nào single agent
5. ✅ **Cost awareness** — không burn client budget vô tội vạ

### Nơi tìm gig

- **Toptal** — top freelance, vetted
- **Arc.dev** — remote-first
- **Lemon.io** — Vietnam-friendly
- **WIP.co, IndieHackers** — solo founder hire
- **Twitter / X** — direct outreach to founder

### Setup hợp đồng + payment

- **Stripe Atlas + LLC US** — chuyên nghiệp, dễ invoice
- **Wise** — receive USD/EUR
- **Hợp đồng**: PDF với scope + milestone + IP clause
- **Tax VN**: TNCN > 100M/năm

---

## 12 Bài tập

::: tip ✍️ 3 cấp độ

**Level 1 — 1 tuần**
- Setup Claude Code Pro tier ($20)
- Pick 1 OSS repo → contribute 3 PR với Claude Code
- Test 2 MCP server (GitHub + Postgres)

**Level 2 — 1 tháng**
- Implement orchestrator-worker pattern cho 1 internal task
- Đo cost vs time saved
- Write tutorial / case study về workflow

**Level 3 — 3 tháng**
- Land 1 freelance gig $200+/ngày dùng Claude Code
- Build 5 internal MCP server cho team
- Eval framework: measure agent task success rate
:::

---

## 13 Đọc tiếp

- 💻 [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md) (back)
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md) — agent click màn hình
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md) — pattern advanced
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md) — extension ecosystem
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)

::: tip 🧠 Lời cuối
> *"Claude Code không thay thế dev. Nó **thay thế** dev không biết dùng Claude Code.*
>
> *Như IDE không thay thế programmer năm 1990. Nhưng programmer 2026 không dùng IDE = dead.*
>
> *2030 sẽ là **dev không dùng agent = dead**."*
:::
