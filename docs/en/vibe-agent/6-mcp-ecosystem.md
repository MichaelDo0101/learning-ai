---
title: 'MCP Ecosystem — 97M downloads/month, 78% enterprise adoption'
description: 'Model Context Protocol = 2026 standard. Anthropic opened Nov 2024, ChatGPT/Gemini/Cursor all adopted. Blue ocean: build MCP for local stacks.'
---

# Chapter 6 — MCP Ecosystem

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🔌</p>

> **"Anthropic opened MCP in Nov 2024.**
> **In less than 18 months: 97M downloads/month, 78% enterprise adoption.**
> **This is how AI 'plugs into' enterprise systems."**

::: tip 🎯 You'll learn
- What MCP is + why Anthropic "won the standard"
- 78% enterprise has ≥1 MCP agent in production
- A2A protocol (Google donated Linux Foundation) — parallel protocol
- 🌏 Blue ocean: build MCP for local stacks (Vietnamese, Brazilian, Indonesian)
- How to build MCP server quickly
:::

---

## 01 What is MCP?

**Model Context Protocol** = open standard for LLM agents to connect with external tools / data sources.

### Pre-MCP problem

Each LLM vendor had own way:
- OpenAI: function calling
- Anthropic: tool use
- Google: function declarations
- Cursor, Windsurf, Claude Code: own integrations

→ **N×M problem**: N LLMs × M tools = chaos integration.

### MCP solves

```
Before MCP:
LLM A → custom adapter → Tool 1
LLM A → custom adapter → Tool 2
LLM B → custom adapter → Tool 1
LLM B → custom adapter → Tool 2
(N × M)

After MCP:
LLM A ┐
LLM B ├ → MCP standard → Tool 1, Tool 2, Tool 3
LLM C ┘
(N + M)
```

### Components

```
LLM (client) ↔ MCP standard ↔ MCP server
                                  - Tools
                                  - Resources
                                  - Prompts
                                  │
                                  ▼
                            [Service: GitHub / Slack / DB / etc.]
```

---

## 02 Insane stats (May 2026)

| Metric | Number |
|------|------|
| **MCP SDK downloads/month** | **97 million** (Mar 2026) |
| Growth in 18 months | **970x** (from 100K in month 1) |
| **MCP servers registered** | **17,468** (cross-registry census) |
| Official registry | **5,800+** |
| **78%** enterprise has ≥1 MCP agent in production | WorkOS report |
| **67%** CTOs name MCP default agent-integration | (vs A2A 23%, ACP 8%) |

---

## 03 Adoption — who has adopted MCP?

### LLM vendors

| Vendor | Status |
|------|------|
| **Anthropic** | ✅ Creator, native |
| **OpenAI** | ✅ Apr 2025 (ChatGPT Apps SDK) |
| **Google** | ✅ Mar 2026 (Gemini API + Vertex AI Agent Builder) |
| **Microsoft / Copilot** | ✅ Partial (competing with own protocol) |

### IDE / coding tools

| Tool | MCP support |
|------|------|
| **Cursor** | ✅ |
| **Windsurf** | ✅ |
| **Zed** | ✅ |
| **JetBrains** | ✅ |
| **Claude Code** | ✅ Native |
| **Vercel AI SDK** | ✅ |

### Frameworks

| Framework | MCP integration |
|------|------|
| **LangChain / LangGraph** | ✅ |
| **CrewAI** | ✅ |
| **OpenAI Agents SDK** | ✅ |

---

## 04 A2A protocol — competitor / complement

### Google A2A (Agent-to-Agent)

| Item | Detail |
|------|------|
| Announce | Apr 9, 2025 |
| Donated to | **Linux Foundation Jun 2025** |
| Supporters | **150+** — Atlassian, Salesforce, ServiceNow, SAP, Workday |
| Protocol | HTTP + SSE + JSON-RPC 2.0 + Agent Cards |
| Use case | Agent ↔ agent comm (different vendors) |

### MCP vs A2A — not conflicting

| | **MCP** | **A2A** |
|------|------|------|
| Purpose | LLM ↔ tool/data | Agent ↔ agent |
| Standard owner | Anthropic | Google → Linux Foundation |
| Mature stage (May 2026) | Established (78% enterprise) | Early adoption |
| Best for | Single agent + many tools | Multi-vendor agent network |

→ **Learn MCP first, A2A later** (when cross-vendor agents needed).

---

## 05 MCP server ecosystem

### Top MCP servers (May 2026)

| Category | Server | Use |
|------|------|------|
| **Dev tools** | github, postgres, sqlite, filesystem, git | Code + data ops |
| **Cloud** | aws, gcp, cloudflare, vercel | Infra automation |
| **Productivity** | slack, notion, linear, jira, asana | Work management |
| **Customer / CRM** | hubspot, salesforce, intercom | Sales/CS ops |
| **Communication** | gmail, outlook, calendar | Schedule + email |
| **Analytics** | google-analytics, amplitude, mixpanel | Data analysis |
| **Design** | figma, canva | Design ops |
| **Browser** | playwright, puppeteer | Web automation |

### Gateway / aggregator

- **Smithery** — central registry + browser
- **Obot** — enterprise MCP gateway
- **Webrix** — multi-tenant MCP proxy
- **mcp.so** — community discovery

---

## 06 Build MCP server — quickstart

::: tip 🛠️ Setup 5 minutes

### Option 1: Use existing SDK

```bash
# Python
pip install mcp

# TypeScript
npm install @modelcontextprotocol/sdk
```

### Minimal server (TypeScript)

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'my-local-tools',
  version: '1.0.0',
}, {
  capabilities: { tools: {} },
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'check_invoice',
    description: 'Check invoice status in accounting system',
    inputSchema: {
      type: 'object',
      properties: {
        invoice_id: { type: 'string' },
      },
      required: ['invoice_id'],
    },
  }],
}));

server.setRequestHandler('tools/call', async (req) => {
  if (req.params.name === 'check_invoice') {
    const result = await callAccountingAPI(req.params.arguments.invoice_id);
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Use in Claude Code / Cursor

```json
// ~/.claude.json
{
  "mcpServers": {
    "local-tools": {
      "command": "node",
      "args": ["/path/to/my-local-tools/dist/server.js"],
      "env": { "API_KEY": "..." }
    }
  }
}
```

Restart Claude Code → tool `mcp__local-tools__check_invoice` appears ✅
:::

---

## 07 🌏 Blue ocean — MCP for local stacks

### Current state by region

| Region | Local stack | MCP server existing? |
|------|------|------|
| **Vietnam** | MISA, KiotViet, Sapo, Pancake, Base.vn, Misa AMIS | ❌ None yet |
| **Indonesia** | Mekari, Sleekr, OY!, Mokapos | ❌ None yet |
| **India** | Tally, Razorpay, Tata, Kotak | ❌ Minimal |
| **Brazil** | Pagar.me, NuBank, Conta Azul | ❌ Minimal |
| **Philippines** | GCash, Maya, Sprout HR | ❌ None yet |

→ **100% blue ocean**. Opportunity to build "MCP for [region] stack" as early winner.

### Project ideas

#### Idea 1: `mcp-misa` (Vietnam)
- Tool: check invoice, create voucher, generate VAT report
- Target: agencies doing CS / accounting for VN SMEs
- Revenue: open-source + service consulting

#### Idea 2: `mcp-kiotviet` (Vietnam)
- Tool: check stock, create order, customer lookup
- Target: F&B / retail using KiotViet
- Revenue: license $50-200/month per business

#### Idea 3: `mcp-pancake` (Vietnam)
- Tool: list conversations, send messages, update customer tag
- Target: agencies using Pancake for clients
- Revenue: subscription

#### Idea 4: `mcp-mekari` (Indonesia)
- Tool: HRIS + payroll automation
- Target: agencies for Indonesian SMEs
- Revenue: open-source build trust

#### Idea 5: `mcp-local-payment` (region-specific)
- VNPay + MoMo + ZaloPay (Vietnam)
- Pix + PicPay (Brazil)
- GCash + Maya (Philippines)

### Go-to-market

| Step | Action |
|------|------|
| 1 | Build MCP open-source (GitHub) |
| 2 | Submit to Smithery + mcp.so |
| 3 | Twitter / Reddit / LinkedIn launch post |
| 4 | Reach out to local dev communities |
| 5 | Speak at AI meetups |
| 6 | Build paid tier (hosted, support) |

→ **Become "MCP-for-[region]" go-to person** — establish authority + lead inflow.

---

## 08 Enterprise use cases — MCP-driven workflows

::: tip 🏢 Enterprise patterns

### CS multi-system
**Stack**: Claude + mcp-pancake + mcp-misa + mcp-shopify
- Customer message via Pancake
- Agent: check order in Shopify, check invoice MISA
- Reply with full context
- Update CRM Pancake

### Sales lead enrichment
**Stack**: Claude + mcp-hubspot + mcp-builtwith + mcp-google
- Lead enters HubSpot
- Agent: enrich from BuiltWith (tech stack) + Google (company info)
- Score lead, route to sales rep

### Inventory rebalance
**Stack**: Claude + mcp-kiotviet + mcp-sapo (multi-store)
- Daily check stock across stores
- Agent: suggest transfers between stores
- Auto-create transfer order

### HR onboarding
**Stack**: Claude + mcp-base.vn + mcp-slack + mcp-google
- New employee → create account in Base.vn + Slack + Google Workspace
- Send welcome email + checklist
:::

---

## 09 Common pitfalls

::: warning 🚨 6 MCP server dev mistakes

**1. Unclear tool names** → agent doesn't pick. Use namespace `service_action` (e.g., `misa_invoice_check`)

**2. Loose schema** → agent generates wrong inputs. Validate strict with Zod / Pydantic

**3. Token-inefficient output** → bloats context. Paginate, truncate, filter

**4. Unclear error messages** → agent retries infinitely. Return error code + suggest fix

**5. Skip auth / security** → MCP server leaks data. Per-user auth + audit log

**6. No eval testing** → tool works happy path, fails edge. Test 20+ scenarios
:::

---

## 10 Roadmap for dev to MCP expert

::: tip 🗺️ 6 months → MCP expert + service business

**Month 1**: Learn MCP basics
- Build 3 hello-world servers (filesystem, HTTP, DB)
- Read Anthropic docs + best practices

**Month 2**: First local MCP
- Pick 1 local stack
- Build full MCP server for 1 use case
- Launch GitHub open-source

**Month 3**: Distribution
- Submit registry (Smithery + mcp.so)
- Blog post, Twitter thread, demo video
- Speak at meetups

**Month 4**: Second + third MCP
- Add complementary stack
- Cross-promote with first MCP

**Month 5**: Service business
- Pitch 3 SMEs: full MCP-driven automation
- Charge $5-15K project

**Month 6**: Recurring + scale
- Hosted tier ($50-200/month per server per business)
- Speak at conferences, build authority
:::

---

## 11 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Setup MCP SDK (TS or Python)
- Build hello-world: tool `echo`
- Connect Claude Code, test

**Level 2 — 1 month**
- Pick 1 local service
- Build MCP server with 5 tools
- Open-source GitHub + Smithery

**Level 3 — 6 months**
- 3 production MCP servers for local stacks
- 5 paying customers (subscription)
- $1-3K MRR
:::

---

## 12 Continue reading

- 💻 [Chapter 1 — Vibe Coding Solo](./1-agent-foundation.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)
- 🗓️ [Chapter 9 — 30-Day Roadmap](./roadmap-30-days.md)

::: tip 🔌 Final word
> *"MCP is **USB-C for AI agents**.*
> *Before MCP: each vendor had own port.*
> *After MCP: 1 port plugs everywhere.*
> *Emerging markets have no MCP for local stacks yet.*
> *Whoever builds first = wins the category.*
> *The door is **open**. Walk through or watch others — your choice."*
:::
