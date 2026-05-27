---
title: 'Multi-Agent — Orchestrator-worker (+90.2%), Devin ở Goldman, Uber burn budget'
description: 'Anthropic Research multi-agent pattern (orchestrator + worker) beat single-agent +90.2%. Case Devin + Goldman Sachs. Cost reality (15x token).'
---

# Chapter 4 — Multi-Agent

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧩</p>

> **"Anthropic Research multi-agent vượt Claude Opus 4 đơn lẻ +90.2%.**
> **Nhưng tốn 15x token. Multi-agent đáng giá không?"**

::: tip 🎯 Bạn sẽ học
- 4 pattern multi-agent: orchestrator-worker, debate, hierarchical, swarm
- Anthropic Research case (+90.2% trên internal eval)
- Devin + Goldman Sachs: hundreds of instance song song
- Frameworks 2026: LangGraph, CrewAI, Claude Code SDK, A2A protocol
- Cost reality + khi nào dùng / không dùng
:::

---

## 01 Tại sao multi-agent?

### Single-agent limitation

| Bottleneck | Single-agent |
|------|------|
| Context window | Bloat dần — performance drop |
| Sequential | Phải làm xong A → B → C |
| Cognitive load | 1 model lo nhiều domain → confused |

### Multi-agent unlock

- ✅ **Parallel** — 3 task cùng lúc → 3x faster
- ✅ **Specialized** — mỗi sub-agent role rõ
- ✅ **Fresh context** — sub-agent không bị bloat
- ❌ **15x token cost** — đắt!
- ❌ **Coordination overhead** — orchestrator + comm protocol

---

## 02 Anthropic Research case (T4/2025)

### Story

Anthropic build internal **multi-agent research system**: dùng cho company research task (technical analysis, market scan, competitive intel).

### Architecture

```
┌────────────────────────────────┐
│   LEAD AGENT (Sonnet)            │
│   Plan + spawn + synthesize       │
└─────────────────┬────────────────┘
                  │
   ┌──────────────┼──────────────┐
   │              │              │
┌──▼──────┐ ┌────▼──────┐ ┌────▼──────┐
│ Worker 1 │ │ Worker 2  │ │ Worker 3  │
│ Research │ │ Verify    │ │ Citation  │
│ topic A  │ │ claims    │ │ check     │
└─────────┘ └───────────┘ └───────────┘
   │              │              │
   ▼              ▼              ▼
 [Tool]        [Tool]         [Tool]
 (Search,     (Browse,        (Sources
  Read)        Read)           DB)
```

### Result

| Metric | Single agent | Multi-agent |
|------|------|------|
| Eval score | baseline | **+90.2%** |
| Token cost | 1x | **~15x** |
| Latency | 1x | 1.5-3x (parallel sub) |
| Coordination overhead | 0 | 10-20% |

### Quote

> *"Multi-agent systems can consume approximately 15x more tokens than standard chat interactions."*
> — *Anthropic*

---

## 03 Devin + Goldman Sachs — hybrid workforce

### Story

T7/2025: Goldman Sachs deploy **Devin (Cognition)** alongside **12,000 human engineer**.

| Item | Số |
|------|------|
| Human engineer | **12,000** |
| Devin instances (peak) | **Hundreds** |
| Task type | Real engineering ticket |
| Speed gain | **3-4x faster** trên complex task |
| Pricing Devin | $20-500/tháng (Devin 2.0 slashed) |

### Bài học

> **"Devin = employee #1 trong hybrid workforce."**
> — *Goldman CIO*

Pattern: **multi-instance Devin** parallel = multi-agent ở enterprise scale.

### Cognition AI growth

| Metric | Số |
|------|------|
| ARR Sept 2024 | $1M |
| ARR June 2025 | **$73M** (73x trong 9 tháng) |
| Valuation T4/2026 | **$25B** |

---

## 04 4 multi-agent patterns

::: tip 🎯 Pattern 1: Orchestrator-Worker

```
       LEAD AGENT
       (plan + synth)
            │
   ┌────────┼────────┐
   │        │        │
WORKER 1  WORKER 2  WORKER 3
(role A)  (role B)  (role C)
```

**Khi dùng**:
- Task có thể parallel breakdown
- Mỗi subtask có domain khác
- Cần synthesis cuối

**Example**: Research + audit + report generation
:::

::: tip 🎯 Pattern 2: Debate

```
AGENT A ←──────→ AGENT B
(propose)        (critique)
         │
         ▼
   JUDGE AGENT
   (decide)
```

**Khi dùng**:
- Decision cần multi-perspective
- Cần debug LLM bias
- Critical judgment

**Example**: Code review (proposer vs critic), legal contract review
:::

::: tip 🎯 Pattern 3: Hierarchical

```
       CEO AGENT
       (strategy)
          │
   ┌──────┴──────┐
   │             │
MANAGER A    MANAGER B
   │             │
 [W1,W2]      [W3,W4]
```

**Khi dùng**:
- Task lớn cần multi-level breakdown
- Tổ chức mô phỏng company

**Example**: Build product full-cycle (research → design → code → marketing)
:::

::: tip 🎯 Pattern 4: Swarm (peer-to-peer)

```
AGENT 1 ←──→ AGENT 2
   ↕              ↕
AGENT 4 ←──→ AGENT 3
```

**Khi dùng**:
- Task không có hierarchy rõ
- Emergent behavior needed
- Research / simulation

**Example**: Multi-agent reinforcement learning, simulation
:::

---

## 05 Anthropic principles cho sub-agent

::: warning ⚠️ 5 nguyên tắc Anthropic publish (T4/2025)

**1. Mỗi subagent cần objective rõ**
- Không "help me" vague
- Có: "Audit /src/auth for SQL injection, return list with line numbers"

**2. Output format defined**
- Subagent return JSON structured, không free text
- Orchestrator parse + synthesize được

**3. Tool guidance**
- Tell subagent dùng tool nào, khi nào
- Không để subagent figure out

**4. Task boundary clear**
- Subagent know task khi nào done
- Có exit condition (max iteration, success criteria)

**5. Fresh context window**
- Mỗi subagent có context riêng
- Không peer-to-peer comm channel
- Single summary return cho orchestrator
:::

---

## 06 Frameworks 2026 — landscape

### LangGraph — production powerhouse

| Item | Detail |
|------|------|
| Approach | Graph node + shared state |
| Production use | Klarna, Uber, LinkedIn agents |
| Strength | Best LangSmith observability, time-travel checkpoint |
| Stars (T5/2026) | Surpassed CrewAI early 2026 |
| Best for | Mission-critical production agent |

### CrewAI — easiest learning curve

| Item | Detail |
|------|------|
| Approach | Role-based DSL (Crew + Task + Agent) |
| Strength | **20 lines to start**, intuitive |
| Adoption | 60% Fortune 500, Insight Partners backing, 44K+ stars |
| Best for | Prototype, agency, demo |

### AutoGen — maintenance mode (T2/2026)

| Item | Detail |
|------|------|
| Status | Microsoft moved to maintenance mode |
| Replacement | Microsoft Agent Framework |
| Implication | Đừng start new project với AutoGen |

### OpenAI Swarm → Agents SDK

| Item | Detail |
|------|------|
| Approach | Lightweight handoff-based |
| Strength | Simple, OpenAI-native |
| Best for | OpenAI ecosystem |

### Anthropic Claude Code SDK

| Item | Detail |
|------|------|
| Approach | Orchestrator-worker via Task tool |
| Strength | MCP-native, Claude Code integration |
| Best for | Claude-first stack |

### A2A protocol (Google, donated to Linux Foundation)

| Item | Detail |
|------|------|
| Status | Open standard, donated T6/2025 |
| Supporters | 150+ — Atlassian, Salesforce, ServiceNow, SAP, Workday |
| Protocol | HTTP + SSE + JSON-RPC 2.0 + Agent Cards |
| Best for | Cross-vendor agent communication |

---

## 07 Code example — orchestrator pattern (Claude Code SDK)

```typescript
import { Anthropic } from '@anthropic-ai/sdk';

const client = new Anthropic();

// Lead agent (Sonnet) plans + synthesizes
async function leadAgent(task: string) {
  // Step 1: Plan
  const plan = await client.messages.create({
    model: 'claude-sonnet-4-6',
    system: 'You break tasks into 3 parallel subtasks.',
    messages: [{ role: 'user', content: task }],
  });
  
  const subtasks = parsePlan(plan); // ["audit X", "audit Y", "audit Z"]
  
  // Step 2: Spawn workers in parallel (Haiku for cheap)
  const workerResults = await Promise.all(
    subtasks.map(subtask =>
      client.messages.create({
        model: 'claude-haiku-4-5',
        system: `You complete this specific subtask: ${subtask}`,
        messages: [{ role: 'user', content: subtask }],
        tools: [readFile, grep, bash],
      })
    )
  );
  
  // Step 3: Synthesize
  const synthesis = await client.messages.create({
    model: 'claude-sonnet-4-6',
    system: 'Combine subtask results into coherent report.',
    messages: [{
      role: 'user',
      content: `Original task: ${task}\n\nResults:\n${workerResults.map(r => r.content[0].text).join('\n\n---\n\n')}`
    }],
  });
  
  return synthesis.content[0].text;
}

await leadAgent("Audit /src/ for security issues, suggest fixes, write report");
```

---

## 08 Khi nào dùng / không dùng multi-agent

::: tip ✅ Dùng multi-agent khi
- Task có sub-task parallel rõ
- Cost không phải vấn đề (15x token)
- Cần specialist (security audit + performance audit + UX audit)
- Domain breadth lớn (research scope rộng)
:::

::: warning ❌ Không dùng multi-agent khi
- Task sequential (A phải xong trước B)
- Budget constraint chặt
- Single domain (chỉ 1 lĩnh vực)
- Latency-sensitive (real-time chat agent)
- Coordination overhead > task value
:::

### Quick decision

```
Câu hỏi 1: Task có > 3 sub-task parallel không?
   NO  → Single agent
   YES → câu 2

Câu hỏi 2: Budget cho phép 15x token?
   NO  → Single agent
   YES → câu 3

Câu hỏi 3: Có need specialist khác domain?
   NO  → Single agent (chỉ chia task)
   YES → ✅ Multi-agent
```

---

## 09 Cost economics

### Real numbers (T5/2026)

| Setup | Token / task | Cost (Sonnet 4.6) | Time |
|------|------|------|------|
| Single Sonnet | 50K | **$0.75** | 30s |
| Orchestrator + 3 Haiku worker | 200K (15K orch + 60K × 3 worker) | **$1.05** | 20s (parallel) |
| Orchestrator + 5 Sonnet worker | 500K | **$7.50** | 30s |
| Anthropic Research full | 750K | **~$11** | 60-120s |

### ROI calculation

**Nếu task value > $10**: multi-agent OK
**Nếu task value < $1**: single agent
**Nếu run hàng nghìn task/ngày**: cost compound — optimize prompt cache + Haiku for sub

---

## 10 Common pitfalls

::: warning 🚨 6 sai lầm multi-agent

**1. Multi-agent cho task sequential** → cost 15x mà không gain. Single agent đủ.

**2. Sub-agent context overlap** → information redundant, cost lãng phí. Define boundary rõ.

**3. Output format không consistent** → orchestrator không parse được. Schema strict.

**4. Quên timeout** → 1 sub-agent stuck → orchestrator wait forever. Set max time.

**5. Cost monitoring không có** → bill shock cuối tháng. Per-task cost track.

**6. Eval không cover multi-agent** → không biết output quality. Test với sample.
:::

---

## 11 🇻🇳 Application VN

### Use case multi-agent cho VN

| Use case | Pattern | Stack |
|------|------|------|
| **Multi-channel CS** (Messenger + Zalo + web) | Orchestrator-Worker | Smax.ai + Anthropic |
| **Tax compliance audit** | Hierarchical | Claude + MCP for VN tax DB |
| **Multi-product e-com Shopee/Tiki/Lazada** | Swarm | n8n + Claude per channel |
| **Investment research VN stock** | Debate | LangGraph + market data |

### Smax.ai = multi-agent micro

Mỗi kênh (Messenger, Zalo, web, IG) = 1 sub-agent:
- Context riêng (kênh + customer history)
- Tool riêng (CRM, inventory, shipping)
- Orchestrator: human agent handover

**Yody case**: +15-20% close rate = multi-agent ở dạng dễ access cho VN SME.

### Cost ở VN context

- VN dev rate: $20-50/giờ
- Multi-agent system build: 2-4 tuần
- Cost end-product: $200-1K/tháng API
- Project price (consultant): $5K-30K

→ ROI rõ cho VN SME có volume conversation > 1K/tháng.

---

## 12 Bài tập

::: tip ✍️ 3 cấp độ

**Level 1 — 1 tuần**
- Implement orchestrator-worker basic
- Task: "Audit OSS repo for X, Y, Z" parallel
- Compare cost vs single agent

**Level 2 — 1 tháng**
- Use CrewAI hoặc LangGraph
- Build 1 production multi-agent (3+ worker)
- Add observability (LangSmith)

**Level 3 — 3 tháng**
- Pitch SME VN: multi-channel agent
- Deliver (Smax.ai + n8n hybrid)
- Charge $10K+
:::

---

## 13 Đọc tiếp

- 💻 [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md)
- 🛡️ [Chapter 8 — Safety & Evals](./safety-evals.md)

::: tip 🧩 Lời cuối
> *"Multi-agent không phải always tốt hơn.*
> *15x token = phải có ROI rõ.*
>
> *Quy tắc đơn giản:*
> *- Task value > $10 → orchestrator-worker*
> *- Task value < $1 → single agent*
> *- Task có **parallel breakdown rõ** → multi-agent*
> *- Task **sequential** → single agent, kể cả khi to."*
:::
