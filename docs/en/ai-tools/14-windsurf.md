---
title: 'Windsurf (Devin Desktop) — the AI-native IDE where the Cascade agent runs itself'
description: 'A hands-on guide to Windsurf — renamed Devin Desktop (Cognition) on Jun 2, 2026, with Devin Local as the new default local agent. An AI-native IDE forked from VS Code: Cascade/Devin Local, Tab/Supercomplete, Codemaps, ACP, Rules/Workflows, MCP, the SWE-1.5/1.6 models. Install, new pricing & quota, access, a step-by-step workflow, case studies and common errors.'
---

# Windsurf (Devin Desktop) — the AI-native IDE where the Cascade agent runs itself

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🌊</p>

::: tip 🔥 Hands-on — 30 seconds
You inherit a client's Laravel + React codebase and you're handed a task: *"add a PDF invoice export feature — it touches both backend and frontend."* Open plain VS Code and you'd first have to read 30 files just to understand the flow. Open **Windsurf** instead, hit **Ctrl+L** to open **Cascade**, and type a single sentence: *"add an endpoint to export an order's invoice as PDF, call it from the order detail page, and write tests."* Cascade reads the whole repo on its own, edits multiple files in one pass, **runs terminal commands**, watches the output, and iterates — while you sit and review each diff. This isn't a code-suggestion plugin; the AI is the *center* of the whole IDE.
**💸 Real benefit:** work that touches many files (the kind that used to eat half a day of reading-understanding-typing) shrinks to a few dozen minutes; you shift from *typing line by line* to *describing & reviewing* — getting more done in the same day.
:::

> **"Windsurf isn't an AI chat box bolted onto an editor.**
> **It's an IDE built around an agent (Cascade) that reads the whole codebase, edits many files, runs commands, and iterates until it's done."**

::: warning ⚠️ READ FIRST — this tool was just renamed (very easy to confuse)
As of mid-2026, this tool has been through **2 rounds of rebranding/ownership change**, so older blog posts can easily confuse you:
- **Codeium → Windsurf**: the company Codeium renamed its product/company to **Windsurf** (2025).
- **Acquired by Cognition** (announced Jul 14, 2025) — Cognition is the company behind the autonomous agent **Devin** (CEO Scott Wu).
- **Windsurf → "Devin Desktop"**: on **Jun 2, 2026**, Cognition renamed the Windsurf IDE to **Devin Desktop** via an OTA update. Some old domains (`windsurf.com/pricing`, `docs.windsurf.com`) now **redirect to `devin.ai`**.

Throughout this chapter I use **"Windsurf (Devin Desktop)"** or both names side by side so you don't get lost — under the hood it's still **one product**.
:::

::: tip 🎯 After this chapter you'll **be able to**
- **Install & open** Windsurf/Devin Desktop (macOS/Windows/Linux) and import your config from VS Code/Cursor.
- **Delegate work to Cascade** (Ctrl+L) — pick the right **Write / Chat / Plan** mode for each kind of task.
- **Write `.windsurfrules`** so the agent follows your coding standards, and bottle a repeated workflow into a **slash command** at `.windsurf/workflows/*.md`.
- **Understand the new quota system** (daily/weekly, credits gone) and know how to pay for it.
- **Dodge the real traps**: running out of quota mid-cycle, hallucinating when it swallows a huge codebase, the agent editing beyond what you asked.
- **Decide when to pick Windsurf** over Cursor / Copilot / Claude Code — and when NOT to use it.
:::

This is a tool chapter — you should read it with Windsurf open and type along. Learning by doing sticks twice as long.

> ⏱️ **Timeliness note:** this tool changes its name/price/quota **very fast**. This content is current as of roughly **mid-2026** — always check <https://devin.ai/pricing> before you buy. Many of the performance/benchmark numbers are published by Cognition itself or pulled from secondary sources, and are labeled *"per vendor"* throughout the chapter.

---

## 01 · What this tool is & when to use it

**Windsurf** (formerly: **Codeium**) is an **AI-native IDE** — a development environment with AI at its *center*. Technically, it's a **fork of VS Code**, so it keeps the extensions, keybindings, and themes you already know from VS Code. The core difference from a typical AI plugin: the AI isn't "bolted on" — the whole thing revolves around an agent named **Cascade**.

- **Official URL:** <https://windsurf.com> (gradually redirecting to <https://devin.ai/desktop>)
- **Original developer:** Codeium (co-founders Varun Mohan, Anshul Kanakia).
- **Current owner:** **Cognition AI** — the company behind the autonomous agent **Devin** (CEO Scott Wu). Cognition acquired Windsurf in Jul 2025.
- **Current name (since Jun 2026):** **Devin Desktop**.
- **Scale (per official sources, as of mid-2025):** roughly **1M+ users** (hundreds of thousands of DAU), **350+ enterprise customers**, ARR ~**$82M** (at the time of the Cognition acquisition, Jul 2025). A customer story with Anthropic notes a system handling **100M+ tokens/minute**.

Because it's a VS Code fork, you can use nearly every extension/theme/shortcut you know and import your config directly. The difference lies in the AI pieces wired deep into the core: **Cascade** (the agent), **Tab/Supercomplete** (autocomplete), **Flow Awareness** (tracking the context of what you're doing), and **Codemaps** (an AI-drawn map of the codebase).

::: warning 💡 Which category is Windsurf in? — positioning for newcomers
The 2026 AI coding tool market splits into **3 groups** — don't mix them up:
- **The "inline suggestions + chat" group** — like **GitHub Copilot**: the AI sits inside the original IDE (VS Code), suggests line by line plus a chat box; you still do the driving.
- **The "full IDE with a deeply integrated agent" group** — **Windsurf** lives here, alongside **Cursor**: a dedicated IDE (VS Code fork), an agent that reads & edits many files.
- **The "autonomous terminal/cloud agent" group** — like **Claude Code** / **OpenAI Codex**: you delegate the work and review the result, with little visibility into "the process."

Compared with **Cursor** (same group), Windsurf's philosophy leans toward **high autonomy** — Cascade decides a lot on its own and asks little; whereas Cursor gives you **finer-grained control** (picking the model/task manually). This is the most important "personality" difference between the two tools.
:::

**When to use it?** When you have a real codebase and want an "all-in-one" tool that *sits inside the editor* but is strong enough to fully delegate multi-step jobs that touch many files: adding features, fixing hard bugs, writing/fixing tests, refactoring. Windsurf especially suits **solo devs / indie hackers** who want fast autonomy with little configuration; or teams that need to **run across many IDEs** (Windsurf has plugins for 40+ editors), or that need **strong compliance** (defense/finance).

::: details 👉 Windsurf's main features (quick look; deeper dive later)
| Feature | Short description |
|---|---|
| **Cascade** | The core agent: reads the whole codebase, edits many files from one command, runs terminal commands, watches output, and iterates ("flow-aware"). Has **Write / Chat (Ask) / Plan** modes. Open it with **Ctrl+L** (Cmd+L on Mac). |
| **Tab / Supercomplete** | Advanced autocomplete: not just the next line but predicting the *next action* (moving the cursor, adding an import, "Tab to Jump"). Shows gray ghost text. |
| **Flow Awareness** | Tracks the file you're editing, terminal output, clipboard, and browser preview to guess what you need. |
| **Codemaps** (2026) | A visual, AI-annotated map of the codebase: modules, relationships, data flow. *Per vendor*, this is a strong point for monorepos/legacy code that competitors don't yet match. |
| **SWE-1.5 / SWE-1.6** | Cognition's own coding models. SWE-1.5 is the current GA release (~950 tok/s); SWE-1.6 (announced Mar 1, 2026) is still in **early preview**. Benchmark details are in the 📊 box below. |
| **ACP (Agent Client Protocol)** (Devin Desktop, Jun 2026) | A protocol that lets you run **another agent right inside Devin Desktop** — e.g. OpenAI Codex, Claude Agent, OpenCode. This is the "agent-neutral" angle Cursor doesn't have. *(Per the Cognition/Devin blog, as of mid-2026.)* |
| **Browser preview + 1-click deploy** | Preview the web app inside the IDE, deploy with one button; includes web search & live element targeting. |
| **MCP** | Connect external DBs/APIs/services via Model Context Protocol; 1-click setup for ready-made MCP servers. |
| **Rules / Memories / Workflows** | Project rules live in the **`.devin/rules/*.md`** folder (highest priority) or **`.windsurf/rules/*.md`** — the old single `.windsurfrules` file still works but is **deprecated since Wave 8** (see section 03). **Memories** (the AI remembers across sessions), **Workflows** (repeated scripts saved as slash commands). |
| **Plugins for 40+ IDEs** | JetBrains, Vim/Neovim, Xcode… — not hard-locked to a single editor like Cursor. |
| **Agent Command Center / Spaces** (Devin Desktop, Jun 2026) | A Kanban board for managing many local + cloud agents (Devin Cloud) at once. |
:::

### Compared to other tools

The table below compares it objectively with same-class competitors developers commonly weigh *(characteristics as of mid-2026, subject to change; many benchmarks are secondary sources — read them as reference only)*:

| Criterion | **Windsurf / Devin Desktop** | **Cursor** | **VS Code + Copilot** | **Claude Code** | **OpenAI Codex** |
|---|---|---|---|---|---|
| **Type** | IDE (VS Code fork) | IDE (VS Code fork) | IDE + extension | CLI/agent in the terminal | CLI/cloud agent + desktop |
| **Philosophy** | High autonomy (Cascade decides, asks little) | Fine-grained control (pick model/task, `.cursorrules`) | Assistant + autocomplete | Deepest reasoning | Runs many cloud agents in parallel |
| **IDE support** | **40+ IDEs** | Cursor only | VS Code | Editor-agnostic (terminal) | Terminal + desktop |
| **Own model** | SWE-1.5 (~950 tok/s); SWE-1.6 in preview | Composer | GPT/Claude via Copilot | Opus/Sonnet (Anthropic) | GPT-5-class (gpt-5-codex) |
| **Strengths** | Codemaps, autonomy, multi-IDE, compliance, **ACP** (run other agents like Codex/Claude Agent right inside the IDE) | Snappy, control, team/power user | Built-in ecosystem, cheap Copilot | Large refactors, output quality | Parallel agents in cloud VMs |
| **Compliance** | ZDR, SOC2, HIPAA, FedRAMP/DoD, ITAR, RBAC, SCIM | Mainly SOC2 | Per GitHub/Microsoft | Per Anthropic | Per OpenAI |
| **Pro price** | ~$20/mo | ~$20/mo | Copilot is cheaper | Pro $20 or API | Bundled with ChatGPT or API |

::: tip 📊 Benchmarks & models — read them correctly
*(Figures synthesized as of mid-2026, mostly secondary/self-published — treat as reference, not an independent audit.)*
- **Composite scores (third-party):** Claude Code ~9.0/10, OpenAI Codex ~8.8/10, Windsurf (Wave 13 build) ~8.7/10 — neck and neck, the differences smaller than how disciplined you are in using them.
- **Cognition's SWE-1.5 model:** scores **~40.08% on SWE-bench Pro** (per Scale SWE-bench Pro) at a speed of ~**950 tokens/second**, running on Cerebras infrastructure. Cognition's own blog claims SWE-1.5 is **~13x faster than Claude Sonnet 4.5** (and ~6x vs Haiku 4.5) — "near-SOTA quality but extremely fast" for a smooth agent loop. The Sonnet 4.5 score of ~43.6% comes *from the Scale leaderboard (a secondary source, not in Cognition's blog)* — placed alongside for reference; don't assume both numbers come from the same source. *(Primary source: cognition.ai/blog/swe-1-5.)*
- **SWE-1.6 (announced Mar 1, 2026):** still in **early preview** (rolled out to a small group, **not yet GA for all users**), scoring **+~11% over SWE-1.5 on SWE-bench Pro**, still ~950 tok/s; there are reports of "overthinking/excess self-verification" issues. Don't assume SWE-1.6 is the default on your Pro account. *(Source: cognition.ai/blog/swe-1-6-preview.)*
- **Agent roadmap note:** since **Jun 2, 2026** (the same day as the rebrand, shipped via OTA), **Devin Local has been the default local agent** — a Rust rewrite that, per Cognition, saves up to ~30% tokens and supports subagents + sandboxing. **Cascade only remains usable as a fallback until Jul 1, 2026** (after which it's gone). So this isn't a future plan — if your UI still says "Cascade," you're in fallback mode. *(Source: docs.devin.ai/desktop/devin-desktop-faq.)*
:::

### When NOT to use Windsurf

::: warning 🛑 The real boundaries — don't use a sledgehammer to crack a nut
- **Very large codebases / complex monorepos that need high precision:** Cascade can **hallucinate when it swallows a huge codebase** — one developer called it *"really bad,"* and had to "hand-feed" it piece by piece (see section 04). Codemaps helps somewhat, but stay cautious.
- **Need extremely fast autocomplete with short edit loops:** many reviews find Cursor "snappier" on short edit cycles — Windsurf is a touch slower.
- **Need fine-grained control** over each model / each agent behavior: Cursor with `.cursorrules` fits better; Cascade leans toward deciding on its own.
- **Very high-intensity dev on a tight budget:** the daily/weekly quota runs out mid-cycle easily (section 04) — consider Claude Code (API-billed) or Cursor.
- **You just need a lightweight assistant inside your existing VS Code:** Copilot is cheap and enough.
- **Concerned about brand/product churn:** it just rebranded to Devin Desktop (Jun 2, 2026), the local agent changed from Cascade to **Devin Local** (default since Jun 2, Cascade support ends Jul 1, 2026) — teams that need stability should watch closely or wait.
- **You just onboarded and need stable docs/tutorials:** because the agent just changed (Cascade → Devin Local, Jun 2) and the rules format moved to `.devin/rules/`, **many online tutorials/screenshots — including the steps in this chapter — will drift from the actual UI** over the next few months. Always cross-check the official docs (section 07).
:::

---

## 02 · Install / Sign up & access

### Is there a Free plan? — YES (limited)

Unlike Claude Code (paid-only), Windsurf **has a Free plan**. The Free tier gives **UNLIMITED inline edit + Tab completion**, while the agent (Cascade) runs on a **light quota with limited models**. Enough to learn/try, not enough for high-intensity dev.

### Pricing & plans (per `devin.ai/pricing`, ~Jun 2026)

| Plan | Price | Includes |
|---|---|---|
| **Free** | $0 | A "light" quota to run the agent, limited models; **unlimited inline edit + Tab completion** |
| **Pro** | **$20/mo** | Higher quota; full models (OpenAI, Claude, Gemini); SWE-1.5 (SWE-1.6 once preview opens) + free open-source models; Devin Cloud; buy extra usage at API rates |
| **Max** | **$200/mo** | Like Pro but a **much higher** quota |
| **Teams** | **$40/seat/mo** (up to 200 seats) | Everything in Pro + **automatic Zero Data Retention**, admin dashboard + analytics, centralized billing, priority support; buy extra pooled credit (~$120/1000 credits) |
| **Enterprise** | Contact sales | SSO SAML/OIDC, self-hosted/air-gapped deployment, dedicated support |

::: warning ⚠️ The quota system CHANGED — don't trust old numbers
Since **Mar 19, 2026**, Windsurf **dropped the credit system** and moved to a **daily + weekly quota** (auto-refreshing). Importantly: Cognition **deliberately doesn't publish specific quota numbers** — they say *"the cost per message depends on the model and complexity."*

→ The upshot: lots of old blogs still list prices/credits like **Free 25 credits, Pro $15/500 credits, Teams 30, Enterprise 60** — these are **OUTDATED**, don't use them. And because the quota isn't published, **costs are hard to predict** — a major community complaint (see section 04).
:::

### Availability & access

Windsurf/Devin Desktop is **downloadable software** that is **not region-blocked** (no source reports any geo-blocking). In practice you can **use it from anywhere**.

*(Transparency note: this point is thinly sourced — there's no official doc listing supported regions the way some vendors do. The "it works" conclusion rests on the fact that it's a downloadable app with no blocking reported.)*

::: warning 💳 Payment — read carefully so your card isn't declined
Windsurf accepts **international credit cards (Visa/Mastercard)**, Apple Pay, Google Pay, Link, WeChat Pay, Alipay — through a global payment gateway (most likely **Stripe**).
- **International Visa/Mastercard:** usually works.
- **The real obstacle:** some cards get blocked due to FX/cross-border controls. Community sources suggest **turning off your VPN** so the page shows the right country-appropriate payment methods, and contacting support if it still fails.

*(Source: evertry.co + docs.devin.ai — third-party + docs, medium confidence.)*
:::

::: tip 🌏 Note for Vietnam / SEA readers
For card payments in this region: local domestic cards (e.g. NAPAS-only cards in Vietnam) are frequently declined for international charges, so an **international Visa/Mastercard** is the path most people use. One nice bonus: **`.windsurfrules` and prompts to Cascade written in Vietnamese still work well**, because the underlying models (Claude/GPT/Gemini) understand Vietnamese — the UI/docs are in English, but you can command the agent in your own language and it understands and acts on it.
:::

### Install

Download at **<https://windsurf.com/download/editor>** (Mac/Windows/Linux, ~100–200MB):

```text
1. macOS  → download the .dmg, drag Windsurf into Applications.
2. Windows → run the installer (wizard), click Next to the end.
3. Linux  → unpack the downloaded archive, then run the executable.
```

On first launch, onboarding lets you **Import from VS Code / Cursor** (bringing your extensions, themes, keybindings). Then open a project via **File → Open Folder**, and the IDE will **auto-index the codebase**. Open Cascade with **Ctrl+L** (or **Cmd+L** on Mac).

::: tip 🔐 A note on data privacy & regulation
You're handing a real codebase to a cloud service, so check what data-protection rules apply to you before pasting client code. If you operate under privacy regimes like the EU's **GDPR** (or any local data-protection law), confirm that your usage — especially how customer or personal data flows to the model providers — is compliant. For sensitive code, prefer the Team/Enterprise tier (Zero Data Retention) or disable telemetry (see section 04).
:::

---

## 03 · Hands-on workflow — step by step (with real commands/prompts)

Below is the standard work loop, from opening a project to delegating work to the agent. Open Windsurf and follow along.

**Step 1 — Open the project & wait for indexing.** Use `File → Open Folder` and let the IDE finish indexing the codebase (progress bar at the bottom).

**Step 2 — Write your project rules.** This is where you "teach" the agent about coding standards, architecture, and build commands — limit **≤ 12,000 tokens**.

::: warning ⚠️ The `.windsurfrules` file is DEPRECATED — use the `.devin/rules/` folder
The single `.windsurfrules` file at the repo root **still works** (kept for backward compatibility) but is **deprecated since Wave 8**. The recommended approach now (matching the Devin Desktop rebrand):
- **`.devin/rules/*.md`** — highest priority, aligned with Devin Local. **Prefer this.**
- **`.windsurf/rules/*.md`** — fallback if there's no `.devin/rules/` folder yet.

Each rule is its own `.md` file in the folder, easier to manage than one giant file. The example below uses `.windsurfrules` for brevity, but you should put this content in `.devin/rules/coding-standards.md`. *(Source: docs.windsurf.com — rules; the Devin Desktop FAQ confirms `.devin/rules/` takes priority.)*
:::

```text
# .devin/rules/coding-standards.md (recommended)
# — or .windsurfrules at the repo root (old, deprecated but still works)

- This project uses TypeScript strict mode, no `any`.
- Backend: Laravel 11. Frontend: React + Vite. State via Zustand.
- Always write tests for new logic (Vitest for FE, Pest for BE).
- Don't edit files under `vendor/` or `node_modules/`.
- Commit messages follow Conventional Commits (feat:, fix:, chore:).
```

**Step 3 — Open Cascade (Ctrl+L) and pick the RIGHT mode.** This is the part many people skip:

```text
Plan   → for big/vague tasks: Cascade drafts a plan FIRST, you review, then it codes.
Write  → let Cascade edit code directly (the default mode when delegating work).
Chat   → (Ask) pure Q&A, does NOT edit files — use it to understand the code.
```

**Step 4 — Delegate in natural language.** Cascade will plan, edit multiple files (showing diffs to review), run the terminal, and iterate:

```text
Add a POST /api/invoices/{order}/pdf endpoint to export an order's invoice as PDF.
Call it from the "Download invoice" button on the order detail page (src/pages/OrderDetail.tsx).
Write tests for the controller. Run the tests and fix until they pass.
```

**Step 5 — Review the diff step by step.** For tasks that touch many files, don't "accept all" blindly — read each diff, especially anything touching auth/migrations/payments.

**Step 6 — Bottle repeated work into a Workflow** (see 03b) so next time you call it with a single slash command.

### 03b · Workflows — bottle a repeated script into a slash command

This is Windsurf's highest-value feature for repetitive work. **The real structure** (per `docs.devin.ai/desktop/cascade/workflows`):

- **File location:** `.windsurf/workflows/*.md` (committed to the repo, shared across the team) **or** global `~/.codeium/windsurf/global_workflows/*.md`. *(The global `.codeium` path is a Codeium legacy; after 2 rebrands it may have changed — re-check on docs.devin.ai if you can't find it.)*
- **Format:** a Markdown file with `name:` + `description:` frontmatter plus numbered steps. Limit **12,000 characters**.
- **Manual-only:** Cascade **won't call it on its own** — you invoke it with the slash command `/[workflow-name]`.

A minimal `pre-pr-check` workflow — placed at `.windsurf/workflows/pre-pr-check.md`:

```markdown
---
name: pre-pr-check
description: Run before opening a PR — lint, tests, type check, and stage diff
---

1. Run the linter: `npm run lint` and fix the reported errors.
2. Run the type checker: `npm run typecheck`.
3. Run the full test suite: `npm test`.
4. If everything is green, stage the changes: `git add -A`.
5. Summarize what changed to prepare the PR description.
```

Call it in Cascade with:

```text
/pre-pr-check
```

The official `/address-pr-comments` workflow (abridged from the docs) shows you can embed `gh` commands too:

```markdown
---
name: address-pr-comments
description: Check out a PR, read its review comments, and address each one
---

1. Check out the PR branch: `gh pr checkout [id]`
2. Fetch the PR comments [using the `gh api` command]
3. For EACH comment: read → fix the corresponding code → mark it resolved
4. After handling every comment, summarize the changes you made.
```

::: tip 🔁 A common pattern — a chain of workflows along a task's lifecycle
The community often builds a numbered chain of workflows to standardize the process, called in sequence:
```text
/0-task        # initialize the task, record the goal
/1-discovery   # read related code, list the files to touch
/2-design      # propose a design for you to review
/3-implement   # code per the agreed design
/4-clean       # clean up, run lint/test
```
There's also `/test_new_changes` to run tests just for the part you edited. *(Source: docs.devin.ai + windsurf.com/university.)*
:::

### 03c · MCP — connect Cascade to external data/tools

Windsurf supports **MCP (Model Context Protocol)** so Cascade can access external DBs/APIs/services (e.g. look up a Jira issue, query a database). The handy part: there's **1-click setup** for ready-made MCP servers in the UI. Once added, you let Cascade use it directly in a prompt — e.g. *"read issue PROJ-123 from Jira and fix the code per its description."*

### 03d · Codemaps — quickly read an unfamiliar codebase

When you inherit an unfamiliar monorepo/legacy code, open **Codemaps** to see the AI-drawn map: which module talks to which, where the data flows. This is a *per vendor* point that competitors don't yet match — great for onboarding into an old project before you hand it to Cascade to edit.

---

## 04 · Tips & common errors

### High-value tips (you'll feel the difference immediately)

::: tip ✅ 7 hands-on tips
1. **Always write rules (`.devin/rules/*.md`) before delegating a big job.** Without them, the agent guesses your coding conventions — and easily drifts off-standard. (The old `.windsurfrules` file still works but is deprecated — see section 03.)
2. **Big/vague task → turn on Plan mode first.** See the plan, fix it, then let it Write — to keep the agent from "charging in" the wrong direction.
3. **Don't "accept all" blindly.** Cascade leans autonomous, so it sometimes **edits beyond what you asked** — review each diff, especially anything touching auth/migrations/payments.
4. **Bottle repeated work into a Workflow** (`.windsurf/workflows/*.md`) — next time call `/name` instead of retyping the whole instruction.
5. **Large codebase → don't make Cascade swallow the whole repo at once.** Give it only the relevant file scope; use Codemaps to locate things first.
6. **Lean on Tab/Supercomplete when hand-typing** — it predicts the "next action" too (adding an import, jumping the cursor), not just the next line.
7. **Watch your daily/weekly quota.** Since Cognition doesn't publish consumption, keep an eye on the quota meter and spread out heavy work — don't dump it all on Monday.
:::

::: warning 🔒 SECURITY & where your data goes
You're handing a **real codebase** to a cloud service — you must know where the data goes **before** you paste client code. Per `windsurf.com/security` + secondary sources (reco.ai), as of mid-2026:

- **Zero Data Retention (ZDR)** is the **default for the Team/Enterprise tiers**: code sent for inference is **not stored** after the request completes; artifact-saving features are **opt-in**. The official pricing page (`devin.ai/blog/windsurf-pricing-plans`) lists *"Automated zero data retention"* outright for the Teams plan.
- **Free/Pro:** you can disable telemetry at **Settings → Telemetry → Disable**. *Per secondary sources (no clear official confirmation)*, if you **don't opt out**, code may be retained as training data — so for sensitive code, consider the Team/Enterprise tier (ZDR) or disabling telemetry. To be sure, read `windsurf.com/security` directly.
- **Self-hosted / air-gapped** for enterprise → the vendor can't access your data (see the Anduril case in section 06).
- **Compliance certifications:** SOC 2, HIPAA, FedRAMP/DoD, ITAR, RBAC, SCIM — more than Cursor (mainly SOC2). This is why Windsurf gets picked in defense/finance.

**Never** paste secrets (API keys, `.env`, private keys), customer PII, or NDA-bound code into a Free/Pro session with telemetry still on.
:::

### Common errors & how to avoid them

::: warning 🚨 7 traps people hit
1. **"End-of-month drought" — running out of quota mid-cycle.** After the move to a daily/weekly quota (Mar 19–22, 2026), high-intensity users **complain about hitting the limit mid-cycle** — the most common complaint on r/windsurf.
2. **Top-ups don't restore the weekly quota.** Someone topped up $5 when the weekly quota was 96% used — it only dropped to ~94%, nearly pointless. *(Source: Medium @lacanianpupil.)*
3. **You can't tell how much you're spending.** Cognition doesn't publish quota consumption → costs are hard to predict. You have to "feel" it through the quota meter.
4. **Hallucinating when it swallows a huge codebase.** One developer called it *"really bad,"* and had to "hand-feed" it piece by piece. *(Source: Jeff Heisler, Medium.)*
5. **The agent is too aggressive** — sometimes editing beyond what you asked. Fix: use Plan mode + review the diff carefully.
6. **Slower than Cursor on short edit loops** — noted in many reviews. If you need instant feedback while hand-typing a lot, that's a downside.
7. **No live chat support on paid plans** — inconvenient vs Cursor when you hit an urgent issue.
:::

::: details ❓ FAQ & common errors
*(The product changes fast; cross-check the docs in section 07. Remember: Windsurf = Devin Desktop since Jun 2026.)*

**Q: Are "Windsurf" and "Devin Desktop" two different programs?**
→ No. Same product. Cognition renamed the Windsurf IDE to **Devin Desktop** on Jun 2, 2026; the old domains redirect to `devin.ai`.

**Q: Where do I download the right one?**
→ <https://windsurf.com/download/editor>. After installing, sign in to your account to use Cascade.

**Q: How many messages/day is my quota?**
→ Cognition **deliberately doesn't publish** the specific number — "it depends on the model and complexity of each message." Watch the quota meter in the app and spread out heavy work.

**Q: I topped up — why didn't my weekly quota go back up?**
→ Right, a top-up **doesn't** restore an already-used weekly quota — topping up near empty is nearly useless. Upgrade to a higher plan (Max) if you run out frequently.

**Q: Cascade broke something / edited beyond what I asked — how do I roll back?**
→ Since the changes are on disk/git, use `git checkout -- <file>` (or `git restore`) to recover uncommitted files. Next time, turn on **Plan mode** and review the diff before you accept.

**Q: My card got declined when buying Pro?**
→ Local domestic-only cards (e.g. NAPAS-only in Vietnam) don't work; you need an **international** Visa/Mastercard. If it still fails, try **turning off your VPN** so the page shows the right methods, and contact support.

**Q: Cascade vs Devin Local — which one is running?**
→ Per the official FAQ (docs.devin.ai/desktop/devin-desktop-faq): since **Jun 2, 2026, Devin Local has been the default local agent** (a Rust rewrite, saving up to ~30% tokens, with subagents + sandboxing). **Cascade only remains usable as a fallback until Jul 1, 2026** — after which it's gone. So if you open the app today, you're on Devin Local by default; the FAQ says it keeps "the same capabilities and settings as Cascade," so the 3 Write/Chat/Plan modes likely keep their names.
:::

---

## 05 · Exercises / mini-project

Do them in order. Each has **clear success criteria** so you can check yourself.

### 🧪 Exercise 1 — Install, import & "get to know" a real repo (basic)

**Goal:** install Windsurf, open one of your projects, and use Cascade in **Chat** mode to understand the code.

1. Install per section 02, open the app, **Import from VS Code/Cursor** if applicable.
2. `File → Open Folder` to pick a real project, wait for indexing to finish.
3. Open Cascade (**Ctrl+L**), choose **Chat (Ask)** mode, and ask 2 questions:
```text
Give me an overview of this codebase's architecture.
Where is authentication handled?
```
4. Open **Codemaps** to see the module map.

::: details ✅ Completion criteria
- Windsurf runs, your config is imported (if any), and the project is indexed.
- You get an overview description + where auth is handled.
- You can tell the 3 modes apart — **Write / Chat / Plan** — and know Chat does **not** edit files.
:::

### 🧪 Exercise 2 — Delegate a "run until green" task with Plan mode (core)

**Goal:** experience Cascade's *agentic* loop: plan → edit many files → run tests → self-fix. With a rules file to stay on-standard.

1. Create a rules file `.devin/rules/coding-standards.md` (or the old `.windsurfrules` at the repo root — per the template in section 03, Step 2).
2. Open Cascade, choose **Plan**, and delegate:
```text
Add a small feature that touches both backend and frontend (e.g. add a
"notes" field to orders). Plan the files to edit first.
```
3. Review the plan, tweak if needed, then switch to **Write** so Cascade executes and **runs the tests, fixing until they pass**.

::: details ✅ Completion criteria
- You **see the plan first** before any file is edited (Plan mode works).
- Cascade edits multiple files, **actually runs the tests**, and self-fixes until green.
- You review each diff instead of "accept all," and know how to use `git restore` to undo if needed.
:::

### 🧪 Exercise 3 — Bottle a repeated process into a Workflow + connect MCP (advanced)

**Goal:** create a reusable slash command and (optionally) connect an MCP server.

1. Create `.windsurf/workflows/pre-pr-check.md` per the template in section 03b.
2. Call it in Cascade:
```text
/pre-pr-check
```
3. (Optional) Go to the MCP section, use **1-click setup** to add a server (e.g. filesystem), then ask Cascade to use it in a prompt.

::: details ✅ Completion criteria
- The workflow runs the steps correctly (lint → typecheck → test → stage).
- The `/pre-pr-check` slash command works and Cascade runs it in order.
- (If you did the MCP part) Cascade can reach the external data source/tool you configured.
:::

---

## 06 · Case studies & real use-cases (from the community)

This section gathers **real** Windsurf use-cases from 2025–2026. The cases with **official** sources (windsurf.com case studies, claude.com/customers) are the most trustworthy; the % figures from third-party synthesis are clearly labeled so you read them cautiously.

::: warning ⚠️ Read the numbers correctly
- The % productivity figures from secondary sources (ServiceNow ~10%, a bank ~40%, ~$100M risk…) are **not independently verified**, and some **don't name the company** — treat them as *"per synthesis."*
- The list of named enterprise customers (JPMorgan Chase, Dell, Anduril, Zillow, Broadcom, Mercado Libre, athenahealth) is just a **customer list**, **not** a detailed case study for each one.
:::

### 06a · Officially sourced cases (most trustworthy)

**① Anduril (defense, 2,200+ employees) — air-gapped deployment, saving "hundreds of hours of keystrokes"**
- **Context:** Anduril deployed Windsurf **air-gapped on AWS GovCloud**, integrated with IAM + self-hosted GitHub — a tightly secured environment.
- **Result:** saved *"hundreds of hours of keystrokes"* via code completion; proved Windsurf runs in a fully isolated environment (the vendor can't access the data).
- **Lesson:** strong compliance (FedRAMP/DoD/ITAR + self-hosted) is a real reason to pick Windsurf in sensitive domains.
- *Source: windsurf.com/blog/anduril-case-study (official).*

**② A customer story with Anthropic/Claude — nearly half of new commits written by AI**
- **Context:** a company using Windsurf (running on Claude models) was featured in an Anthropic customer story.
- **Result:** nearly **half of new code commits** are written by AI; **+38% suggestion acceptance rate**; the system handles **100M+ tokens/minute**.
- **Lesson:** at real scale, agentic coding makes up a significant share of new code — but humans still need to review.
- *Source: claude.com/customers/windsurf (official).*

**③ WWT (an individual developer) — 70%+ productivity gain, per-screen migration from >1 day to a few hours**
- **Context:** a developer at WWT used Windsurf for migration work.
- **Result:** **70%+ productivity gain**; tasks that took days now finish in hours; per-screen migration dropped from over 1 day to ~a few hours.
- *Source: wwt.com/blog/... (official, from WWT).*

### 06b · Cases from third-party synthesis (read cautiously)

**④ Dell — after a 2-week trial, 100% of developers wanted to keep using it**
- A **2-week** trial, with **100% of developers wanting to continue** with Windsurf. *(Source: review synthesis + Contrary Research — third-party.)*

**⑤ ServiceNow — ~7,000 engineers, productivity +~10%**
- Using Windsurf for about **7,000 engineers**, a ~**10%** productivity gain. *(Source: getpanto.ai — third-party, read cautiously.)*

**⑥ A top-10 financial services firm — legal/regulatory risk reduced ~$100M; a large bank cut unit-test writing time by 40%**
- *(Source: third-party synthesis — heavily hedged: company not named, not independently verified.)*

::: tip 💡 What to take away from these cases
- **Compliance + self-hosted** (Anduril) is Windsurf's clearest differentiating strength vs Cursor.
- **Agentic coding makes up a large share of new code** (the Claude customer story) — but humans still *review & steer the design*.
- **The % productivity numbers sound very appealing** but are mostly self-reported/synthesized — use them for directional reference, not as a guarantee.
:::

---

## 07 · Summary & official sources

::: tip 📌 6 things to take away
1. **Windsurf = Devin Desktop** (since Jun 2, 2026, owned by **Cognition**) — an **AI-native IDE** forked from VS Code, built around the **Cascade** agent that reads the whole repo, edits many files, runs commands, and iterates.
2. **There's a Free plan** (unlimited Tab + inline edit, a light agent quota); **Pro $20/mo**, **Max $200**, **Teams $40/seat** (up to 200 seats, with automatic ZDR).
3. **The quota changed (Mar 19, 2026):** credits dropped, moved to a **daily/weekly quota**, with **no published numbers** → costs are hard to predict; running out mid-cycle is a common complaint.
4. **Works anywhere** (a downloadable app, no region block); payment needs an **international Visa/Mastercard** — local domestic-only cards don't work.
5. **The standard process:** Open Folder → write rules in `.devin/rules/*.md` (the old `.windsurfrules` is deprecated) → the agent (Plan for big tasks / Write to edit / Chat to ask) → review the diff → bottle repeated work into a Workflow at `.windsurf/workflows/*.md`.
6. **Pick Windsurf when:** you want fast autonomy with little config, need multi-IDE support, or need strong compliance (ZDR/HIPAA/FedRAMP/ITAR). **Avoid it when:** you need fine-grained control (→ Cursor), an ultra-fast edit loop (→ Cursor), or you're on a tight budget with heavy use (→ Claude Code/API).
:::

The product changes very fast (it just rebranded to Devin Desktop, and the local agent moved to Devin Local) — when the material goes stale, use these official links to update yourself. *(Note: some `windsurf.com/...` links are gradually 301-redirecting to `devin.ai`.)*

| Topic | Official link |
|---|---|
| New product page (Devin Desktop) | <https://devin.ai/desktop> |
| Windsurf page (redirecting) | <https://windsurf.com> |
| Pricing | <https://devin.ai/pricing> |
| Docs | <https://docs.devin.ai/desktop/> |
| Devin Desktop FAQ (rebrand, Cascade→Devin Local) | <https://docs.devin.ai/desktop/devin-desktop-faq> |
| Download the editor | <https://windsurf.com/download/editor> |
| Security | <https://windsurf.com/security> |
| Acquisition blog (Cognition) | <https://cognition.ai/blog/windsurf> |
| SWE-1.5 model blog | <https://cognition.ai/blog/swe-1-5> |
| "Windsurf is now Devin Desktop" announcement | <https://devin.ai/blog/windsurf-is-now-devin-desktop/> |
| Anduril case study | <https://windsurf.com/blog/anduril-case-study> |

> *The material in this chapter is based on official sources (cognition.ai, devin.ai, docs.windsurf/devin, claude.com/customers/windsurf, windsurf.com case studies) current as of roughly **mid-2026**, combined with a few labeled secondary sources. Timely traps to dodge: don't use the old prices/credits ($15, 25 credits…); remember **Windsurf = Devin Desktop since Jun 2, 2026**; **Devin Local has been the default local agent since Jun 2**, while **Cascade is only a fallback until Jul 1, 2026** (not "about to be replaced" — it already was); and the old `.windsurfrules` file is deprecated → use `.devin/rules/`. When in doubt, open <https://devin.ai/pricing> and the official docs in the table above.*
