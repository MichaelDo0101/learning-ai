---
title: 'Cursor — the AI code editor where the agent sits at the center'
description: 'A hands-on guide to Cursor (Anysphere): an AI code editor forked from VS Code with the #1 Tab autocomplete, Agent Mode, Plan Mode, Composer, Rules & MCP. Install, pricing & the credit system, payment & access, step-by-step workflow, security and common errors.'
---

# Cursor — the AI code editor where the agent sits at the center

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🖱️</p>

::: tip 🔥 Hands-on — 30 seconds
You're building a landing page for a startup. You need to swap the entire button system over to a new style — edit 12 React + CSS files, each one done a little differently. Hand-typing this in VS Code would eat your whole afternoon. Open **Cursor**, hit **⌘+.** to open the Agent, and type one sentence: *"switch every button to the new `primary` variant in `src/components`, keep the existing props."* Cursor reads the whole project, edits each file, and you just sit and review the diff. And when you're typing normal code? Cursor predicts the next 4–5-line block all at once — you just press **Tab**.
**💸 Real benefit:** repetitive work spread across many files (the kind that used to burn an afternoon) shrinks to a few dozen minutes; you move from *typing line by line* to *describing & reviewing* — and you ship noticeably faster every day.
:::

> **"Cursor isn't an AI plugin bolted onto an IDE.**
> **It's an IDE rebuilt around AI — autocomplete, chat, and the agent are the center, not side features."**

::: tip 🎯 After this chapter you'll **be able to**
- **Install & open** Cursor (macOS/Windows/Linux) and understand where it differs from VS Code + Copilot.
- **Use Tab autocomplete** properly — what the community calls "the best Tab on the market."
- **Delegate work to Agent Mode** (⌘+.) and **use Plan Mode** (Shift+Tab) to "think first, code second."
- **Write `.cursor/rules/*.mdc`** so the agent follows your coding standards; configure **MCP** to connect external tools.
- **Understand the credit system & the pricing tiers**, know how to pay for it, and avoid the unpredictable-bill trap.
- **Turn on Privacy Mode** at the right moment and know when NOT to let the agent run on its own (auth, migrations, production).
:::

This is a tool chapter — you should read it with Cursor open and type along. Learning by doing sticks twice as long.

> ⏱️ **Timeliness note:** Cursor changes its prices, tier names, and credit policy **very fast**. This content is current as of roughly **mid-2026** — always check <https://cursor.com/pricing> before you buy. Most of the performance/benchmark numbers are published by Cursor itself and are labeled *"per vendor"* throughout the chapter.

---

## 01 · What this tool is & when to use it

**Cursor** is an **AI code editor** — a code editor with deep AI integration, built as a **fork of VS Code**, developed by the company **Anysphere**. The core difference: instead of bolting an AI plugin onto an existing IDE, Cursor is a standalone IDE built **"AI-native"** — AI isn't a side feature but the *center* of the experience.

- **Official URL:** <https://cursor.com>
- **Company:** Anysphere Inc.
- **Scale (per vendor, as of early 2026):** annualized revenue past **~$2B ARR** (hit the $2B ARR mark around early March 2026); used by millions of developers; **more than half (>50%) of the Fortune 500** use Cursor *(figure published by Cursor on its Enterprise page — treat it as a marketing claim, not an independent audit)*.
- **Current version (mid-2026):** **Cursor 3.0** (released **Apr 2, 2026**), with an "agent-first" interface, paired with its own model **Composer 2.5** (released **May 18, 2026**). Cursor 3 moves to a unified **"Agents Window"** for local/cloud/remote agents and, *per vendor*, supports running up to ~8 agents in parallel on isolated Git worktrees/branches.

Because it's a VS Code fork, you can use **almost every extension, theme, and keyboard shortcut** you already know — and import your VS Code config directly. The difference is the 3 AI pieces wired into the core: **Tab** (autocomplete), **Chat/Agent** (editing code), and **codebase indexing** (the AI understands the whole project).

::: warning 💡 Which category is Cursor in? — positioning for newcomers
The 2026 AI coding tool market splits into **3 groups** — don't mix them up:
- **The "inline suggestions + chat" group** — like **GitHub Copilot**: the AI sits inside the original IDE, suggests line by line plus a chat box; you still do the driving.
- **The "full IDE with a deeply integrated agent" group** — **Cursor** lives here (alongside Windsurf/Antigravity): a dedicated IDE, an agent that reads & edits many files.
- **The "autonomous terminal/cloud agent" group** — like **Claude Code** / **OpenAI Codex**: you delegate the work and review the result, with little visibility into "the process."

Cursor is strongest when you still want to **sit inside the editor**, typing code while having an agent powerful enough to delegate big jobs to — rather than fully "fire and forget."
:::

**When to use it?** When you work in an IDE **daily** and want an "all-in-one" tool: solid autocomplete for hand-typing, plus an agent for when you need to edit many files. Cursor shines most at **frontend/React/CSS** — the kind of work that iterates fast, needs a visual feedback loop, and shows results immediately.

::: details 👉 Cursor's main features (quick look; deeper dive later)
| Feature | Short description |
|---|---|
| **Tab (autocomplete)** | Cursor's own model — predicts not just the current line but the "next action" (the next 3–5 lines, and where the cursor should jump). Praised as the best Tab on the market; *per a secondary source, the acceptance rate is ~72%*. |
| **Agent / Agent Mode** | Autonomous agent: reads the codebase, plans, edits multiple files, runs terminal commands, runs tests, iterates until done — you review before you accept. Open it with **⌘+.** / **Ctrl+.** |
| **Plan Mode** | Before coding, the agent drafts a markdown "plan" (saved in `.cursor/plans`). Toggle it with **Shift+Tab** in the input box. "Think clearly first, code second." |
| **Composer** | Anysphere's agentic model for long/multi-step coding tasks. *Per Cursor, the (original) Composer model is ~4x faster than comparable frontier models (~250 tok/s vs Sonnet ~63 tok/s), with most agent turns finishing in under 30 seconds.* The latest **Composer 2.5** (released May 18, 2026), *per vendor*, is built on Moonshot AI's **Kimi K2.5** base and is **on par with Claude Opus 4.7 / GPT-5.5 on coding benchmarks at ~1/10 the cost** — this is Cursor 3.x's main positioning point. |
| **Background / Cloud Agents** | Agents that run in the background on Cursor's cloud infrastructure, working independently while you do something else. |
| **Agents Window (Cursor 3)** | A unified workspace for local + cloud + remote agents; supports multi-repo (one agent reasoning across multiple Git repos). |
| **Codebase Indexing + Semantic Search** | Indexes the whole project so the AI "understands the codebase"; semantic search. |
| **Chat (Ask mode)** | Open AI chat (**⌘+L** / **Ctrl+L**) that does NOT edit files — pure Q&A. |
| **MCP** | Connects Cursor to external tools/data (DB, API, Jira, GitHub…). |
| **Rules** | Custom rules that shape agent behavior (see section 03). |
| **BugBot** | Automated code review integrated into GitHub pull requests. |
| **CLI** | Runs the agent headless in the terminal / CI / GitHub Actions. |
| **Multi-model** | Access to models from OpenAI, Anthropic (Claude), Google Gemini, xAI Grok + the **in-house Composer 2.5 model** — a competitive differentiator vs Copilot/Codex (which depend on third-party models), giving Cursor control over cost/speed. **Auto mode** picks the model automatically. |
:::

### Compared to other tools

The table below compares Cursor with the direct competitors developers commonly weigh *(characteristics as of mid-2026, subject to change; "right/wrong" depends on workflow & team more than on benchmark scores)*:

| Criterion | **Cursor** | **VS Code + Copilot** | **Devin Desktop (ex-Windsurf)** | **Claude Code** | **OpenAI Codex** |
|---|---|---|---|---|---|
| Type | AI-native IDE (VS Code fork) | IDE + extension | AI-native IDE (agent-neutral) | Terminal agent (CLI) | Autonomous cloud agent |
| Autonomy level | High — has fully pivoted to **agent-first** (Cursor 3: Agents Window, multi-agent) | Lowest (suggestions + chat) | In the middle | High ("like a junior dev") | Highest (runs in background, returns PRs) |
| Tab/inline | **Best on the market** | Good, mature | Good | Not its strength | None (cloud) |
| Multi-file / large refactor | Strong (Composer) | Weaker | Strong | **Very strong** | Strong (async) |
| Starting price | $20/mo (Pro) | **$10/mo** — cheapest, broad free tier | Inherits the old Windsurf pricing (carry over) | $17/mo Pro, $100+/mo Max | high tier ~$200/mo |

::: tip 🤔 When to consider a competitor instead of Cursor
- **Low budget / only need autocomplete + a large org that prioritizes stability and compliance:** → **VS Code + Copilot** ($10, broad free tier, "the enterprise default choice").
- **Delegating large refactors / heavy "hand it off and review" work:** → **Claude Code** (often leads on complex coding benchmarks). *Note that the numbers change very fast: "Opus 4.5 ~80.9% SWE-bench Verified" was only true at its late-2025 launch; by mid-2026 the leaders (Opus 4.7/4.8, GPT-5.5) are all around ~87–89% — check the current leaderboard rather than trusting any absolute number.*
- **Many independent, well-defined tasks where you want it to "code while you sleep" in an isolated sandbox:** → **OpenAI Codex**.
- **Daily IDE work, fast-iterating frontend/React/CSS, wanting both great autocomplete and an agent:** → **Cursor** (exactly this chapter's strength).

> ⚠️ **Big note about Windsurf:** on **Jun 2, 2026**, Cognition **retired the Windsurf brand and relaunched it as "Devin Desktop"** — an **agent-neutral IDE** (managing OpenAI/Anthropic… agents via the **Agent Client Protocol**). Old Windsurf users get an automatic OTA update; **Cascade** (the old agent) is removed after **Jul 1, 2026**; tiers/pricing carry over directly from Windsurf. When you read old docs about "Windsurf," map it to Devin Desktop.
:::

::: tip 💡 The practical 2026 pattern — strong devs often pair two tools
Don't assume you have to pick **one**. The most effective developers typically use **one IDE-assistant for daily work** (Cursor/Copilot) + **one terminal agent for heavy work** (Claude Code/Codex). Some even run Claude Code *inside Cursor's terminal*. A rule that recurs across many sources: **Cursor for the ~80% of work that needs real-time judgment, Codex/Claude Code for the ~20% you can delegate.**
:::

### When NOT to use Cursor (or Agent Mode)

::: warning 🛑 The real boundaries — don't hand the agent the wrong job
- **Code touching production / a system serving paying customers:** many veteran developers stress that the idea "you no longer need to review code" is **wrong** in a multi-dev environment with real customers — architecture & maintainability still matter.
- **Authentication/security logic (auth), database migrations, CI/CD configuration:** agent mode is "less suitable" for these high-risk areas.
- **Connecting an MCP server to a production DB with service-role/write access:** don't — this is exactly the lesson from the Supabase incident (see section 04). Grant only minimal permissions, prefer read-only and staging environments.
- **Complex legacy codebases:** you can't simply "rewrite it with AI"; AI can create a maintenance burden.
- **Very large teams that need absolute control & compliance:** many organizations pick Copilot because it's safer/more stable; there are **vendor lock-in** concerns with Cursor.
- **You only need simple autocomplete + low budget:** Copilot ($10) or a free tier may already be enough.
- **When you don't plan to review the output:** AI code can "look right but be subtly wrong," with a risk of vulnerabilities/hidden bugs that tests may not catch.
:::

---

## 02 · Install / Sign up & access

### Install the IDE

Download the desktop build at **<https://cursor.com>** (macOS / Windows / Linux). Open it and sign in with an account (Google / GitHub / email). On first launch, Cursor asks whether you want to **import your VS Code config** (extensions, themes, keybindings) — say yes to keep your existing habits.

### Is there a Free plan? — YES (limited)

Unlike Claude Code, Cursor **has a Free (Hobby) plan** you can use right away, **no card required**. It gives you **limited agent requests** + **limited Tab completions** *(Cursor doesn't publish the exact numbers — it just says "limited")*. Enough to learn and try; for serious use you'll need to upgrade to Pro.

### Pricing (per cursor.com/pricing + secondary sources, as of mid-2026)

| Tier | Price (monthly) | Key inclusions |
|---|---|---|
| **Hobby (Free)** | **$0**, no card needed | *Limited* agent requests + *limited* Tab completions |
| **Pro** | **$20** (~**$16** billed annually, saves ~20%) | Unlimited Tab; a ~$20 credit pool for API agents; Background Agents; frontier models; MCP, skills, hooks; Cloud agents; BugBot billed by usage |
| **Pro+** | **$60** (~$48/mo billed annually) | Like Pro but **~3x the credit (~$60/mo)** |
| **Ultra** | **$200** | **~20x usage multiplier** + priority on new features — for power users running agents continuously on frontier models |
| **Teams** | **$40/user/mo** (~$32 billed annually) | Everything in Individual + centralized billing, an internal marketplace (rules/skills), BugBot review, shared context, usage analytics, **team-wide privacy mode**, SAML/OIDC SSO |
| **Enterprise** | **Custom** | Everything in Teams + pooled usage, invoice/PO, SCIM, repo/model/MCP access controls, audit logs, an AI code tracking API, priority support |

::: warning 💸 The CREDIT system — the most confusing part, read carefully
*Per sources, since ~Jun 2025* the paid tiers come with a **monthly credit pool equal to the tier price** (e.g. Pro $20 → ~$20 credit). How credit gets consumed:
- **Auto mode** (letting Cursor pick the model): *previously* advertised as "unlimited / no credit deducted," but **this policy has changed several times**. The current `cursor.com/pricing` page describes *every tier as having a certain usage allowance, beyond which it's billed on-demand* — meaning, as of mid-2026, you should treat **every request (including Auto) as potentially drawing credit**. **Don't fully trust "Auto is free" — check `cursor.com/pricing` first.**
- **Manually picking a frontier model** (e.g. Claude Opus, the latest GPT) **burns credit faster** per use.
- When "fast requests" run out, you're pushed into a **"slow queue"** (5–30s+ slower responses — see section 04).

⚠️ **This is the most outdate-prone point in the whole chapter:** Cursor's credit/limit policy has changed **many times**. The "credit = tier price" and "20x multiplier" figures should be re-checked at <https://cursor.com/pricing> before you trust them outright.
:::

### Install the CLI (headless agent in the terminal)

For scripts / CI / GitHub Actions. *Actual commands per cursor.com/docs/cli/installation:*

```bash
# macOS / Linux / WSL
curl https://cursor.com/install -fsS | bash
```

```bash
# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex
```

```bash
# Or via npm
npm install -g @cursor/cli
```

### Availability & access

**Cursor works normally worldwide** with no region blocking reported. The Free tier (Hobby) works right away, no card needed. The one real friction point for some users is **paying for a paid tier**.

::: warning 💳 Payment — methods that work
- **Cursor accepts:** **Visa/Mastercard** and **Alipay** (since 2024). It does **NOT** accept UnionPay / PayPal / WeChat Pay / Apple Pay — the reason is **Stripe** (Cursor's payment processor) doesn't support these methods, not a Cursor-specific policy.
- **The real obstacle:** local cards in some countries get declined for international transactions / don't support recurring payments / carry high FX fees.
- **Common workarounds:**
  1. **An international Visa/Mastercard** (the most common & reliable approach).
  2. **A virtual card** topped up with USDT/USDC through an intermediary platform.
  3. **Topping up a virtual card with crypto** (BTC/USDT/USDC) via certain proxy services. *Note:* as of ~Mar 2026 **Cursor does NOT accept crypto directly** — this approach really just means paying with a virtual card (which was itself funded with crypto), not Cursor accepting cryptocurrency.

> Virtual-card/crypto services are **third parties** (blog sources) — listed as common options, **not endorsed** for quality/safety. Prefer a legitimate international card in your own name if you have one.
:::

::: tip 🌏 Note for Vietnam / SEA readers
Two things worth knowing in this region: (1) **prompts and Rules written in Vietnamese still work well** because the underlying models (Claude/GPT/Gemini) understand Vietnamese — the UI/docs are in English, but you can command the Agent in Vietnamese freely and it understands and acts on it; (2) for card payments, local domestic cards are frequently declined for recurring international charges, so an international Visa/Mastercard (or a topped-up virtual card) is the path most people use.
:::

::: tip 🔐 A note on data privacy & regulation
You're handing real code to a cloud service, so check what data-protection rules apply to you before pasting client code. If you operate under privacy regimes like the EU's **GDPR** (or any local data-protection law), confirm that your usage — especially how customer or personal data flows to model providers — is compliant. Turning on **Privacy Mode** (section 04) and excluding secrets/`.env` via `.cursorignore` are the baseline steps.
:::

---

## 03 · Hands-on workflow — step by step (with real commands/prompts/config)

Below is the standard work loop, synthesized from **cursor.com/blog/agent-best-practices**. Open Cursor and follow along.

### Recommended process

**Step 1 — Plan first, code second (the highest-impact change).** In the input box, press **Shift+Tab** to enable **Plan Mode**. The agent drafts a markdown plan file in `.cursor/plans` listing each step, the libraries it'll use, the code standards, and where files go. Read & edit the plan until you're happy with it, then let it run.

::: tip 📌 A tip on plan detail
The **less detailed** the plan → the **more "freedom"** the agent has to decide (sometimes against your intent); the more detailed → it follows your intent more closely but costs more to write. For important work, nail down "where files go, which lib to use, which API to keep unchanged."
:::

**Step 2 — Write a specific prompt.** Success rates rise noticeably when the prompt is clear. Compare:

```text
❌ Vague:    make it look nicer
✅ Specific: Refactor src/auth/login.ts to extract the token-validation logic into
            its own function, add unit tests for invalid input, keep the public API intact
```

**Step 3 — Run Agent Mode.** Open it with **⌘+.** (Mac) / **Ctrl+.** (Win/Linux). The agent reads errors/logs, edits across files, runs tests, iterates. For pure Q&A (no file edits), use **Chat/Ask** (**⌘+L** / **Ctrl+L**).

**Step 4 — Review carefully.** AI code "looks right but is subtly wrong" — **always read the diff before you accept**. Don't accept-all on reflex.

**Step 5 — Build up your setup gradually.** Only add a **rule** when you see the agent repeat **the same mistake**; only add a **command/skill** when you have a workflow worth reusing. **Don't optimize early.**

### Tab autocomplete — using it right

Tab is Cursor's "specialty." As you type code, it shows a faint suggestion (ghost text) — not just the rest of the current line but the **next 3–5-line block** and **where the cursor should jump**. The controls:

```text
Tab        → accept the suggestion
Esc        → reject it
Tab (again)→ "jump" to the next edit location Cursor predicts
```

### Headless CLI (for scripts/CI)

*Per cursor.com/docs/cli/installation:* the binary that runs the agent in headless mode is **`cursor-agent`** (alias `agent`), **not** the `cursor` command (which opens the GUI). After installing, remember to add `~/.local/bin` to your `PATH`, then check:

```bash
# Check the installation
cursor-agent --version
```

```bash
# Run the agent non-interactively, printing the result to the console
cursor-agent -p "fix the failing tests in src/auth/"
```

```bash
# Combine with an output format for scripts (json or text)
cursor-agent -p "refactor module X" --output-format json
```

### Running multiple agents in parallel (Cursor 3)

Cursor 3's biggest selling point is **multi-agent**: run up to ~8 agents **in parallel**, each working on an **isolated Git worktree/branch** (local, cloud, or over SSH) so they don't step on each other. Quick how-to:

1. Open the **Agents Window** (the unified workspace for local + cloud + remote agents).
2. Give each agent an independent, clearly-defined task (e.g. agent A writes tests, agent B refactors a different module) — the more separable the tasks, the fewer conflicts.
3. Watch each agent, **review the diff** of each branch separately, then merge.

::: tip 📌 When multi-agent is worth it
It fits when you have **many independent, non-dependent tasks**. If the tasks touch the same file/same logic, running them in parallel easily creates merge conflicts — at that point doing them sequentially is faster.
:::

### Configuring RULES — follow your coding standards

*Actual syntax per cursor.com/docs/context/rules.* Rules are how you "teach" the agent your project's conventions.

- **Location:** the `.cursor/rules/` folder holds **`.mdc`** files (markdown + frontmatter), version-controlled (commit them to git so the whole team shares them).
- **4 application types**, controlled via 3 frontmatter fields (`alwaysApply`, `description`, `globs`):
  1. **Always Apply** — into **every** chat.
  2. **Apply Intelligently** — the agent decides based on `description`.
  3. **Apply to Specific Files** — triggered when a file matches `globs`.
  4. **Apply Manually** — only when you call `@rule-name` in chat.
- **Create a rule:** type `/create-rule` in chat, or go to *Cursor Settings → Rules, Commands → + Add Rule*.

Example file `.cursor/rules/typescript.mdc`:

```markdown
---
description: TypeScript coding standards for this project
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---
- Always use strict TypeScript, no `any`.
- Prefer functional components and named exports.
- Co-locate tests next to source files.
```

::: warning ⚠️ The most common Rules trap
A plain **`.md` file (no frontmatter) is IGNORED by the rules system**. You must use the **`.mdc`** extension with the right frontmatter (`description` / `globs` / `alwaysApply`) for the rule to load.

**A simpler alternative:** the `AGENTS.md` file (plain markdown, no frontmatter needed, supports files nested in subfolders — a more specific file beats a parent file). There are also **Team Rules** (Team/Enterprise) and **User Rules** (global). The old **`.cursorrules`** file (at the root) is still mentioned, but the official new way is `.cursor/rules/*.mdc`.
:::

### Configuring MCP — connecting external tools/data

*Per cursor.com/docs/mcp.* MCP (Model Context Protocol) lets the agent read DBs, call APIs, read Jira/GitHub…

- **Global:** `~/.cursor/mcp.json`. **Per-project:** `.cursor/mcp.json` (share with the team via git).
- Access the UI: *Settings → Tools & MCP* (or Features → MCP).

::: warning 🔌 Installed an MCP server but don't see it?
**You must fully quit & reopen Cursor** after installing a server — MCP servers **only load at startup**. If it's correct, the server will appear under **"Installed MCP Servers."**
:::

### `.cursorignore` — exclude things you don't need indexed

Create a `.cursorignore` file at the project root to exclude large folders / dependencies / build output from indexing → less load, more speed (see section 04). Example contents:

```text
node_modules/
dist/
build/
.env
*.log
```

---

## 04 · Tips & common errors

### High-value tips (you'll feel the difference immediately)

::: tip ✅ 7 hands-on tips
1. **Leave Auto mode on when you don't need a specific model** → usually cheaper (Cursor picks a suitable model); only pick a frontier model for genuinely hard work. *Note: Auto is no longer guaranteed "completely free" like the 2025 policy — still keep an eye on your usage.*
2. **Switch to a small/fast model (Haiku/mini) for routine work** → both faster and cheaper; save the strong models for the reasoning-heavy parts.
3. **Plan Mode (Shift+Tab) for every high-risk change** → see the plan *before* the agent touches files.
4. **Create a `.cursorignore`** excluding `node_modules`/build → Cursor gets much smoother on large repos.
5. **Only add a Rule when the agent repeats the same mistake** → don't write a giant "process manual" into rules from day one.
6. **Use `@file` to pull the right file** into context instead of letting the agent hunt for it → more accurate results, less "drifting."
7. **Reserve a frontier model + use your own API key** if the slow queue is bothering you → pay per-token, no Cursor rate-limiting.
:::

::: warning 🔒 SECURITY & PRIVACY — where your data goes
You're handing a **real codebase** to a cloud service — you must know where the data goes **before** you paste client code. *Per cursor.com/security, /data-use, /privacy:*

**Where the data goes:** when you use an AI feature, Cursor sends the **prompt + code context** to the model provider (**OpenAI, Anthropic, Google Vertex AI, xAI Grok**).

**Privacy Mode:**
- Available to **every user** (both Free and Pro); **on by default for team members**.
- When **ON**: Cursor has a **Zero Data Retention (ZDR)** agreement with the model providers → they **don't store** and **don't train** on your data. Codebase indexing: the vector DB **never sees raw code** — it only stores vectors (not reversible to source); when needed, Cursor looks up the real code on your **local machine** using the vector "coordinates" returned.
- When **OFF**: Cursor **may store & use** codebase data, prompts, editor actions, snippets… to improve and **train their models**.

👉 **For sensitive / client / NDA-covered code → turn ON Privacy Mode.** And never let the agent read/paste **secrets** (API keys, tokens, `.env`, private keys) — add them to `.cursorignore`.
:::

::: warning 🚨 Agent security risks — don't "auto-run" everything
*(Technical sources: Check Point, GitHub Security Advisory, Practical-DevSecOps.)*
- **Prompt injection (indirect):** an attacker embeds malicious instructions in data the agent reads. A real case in mid-2025: Cursor's agent at **Supabase** ran with privileged service-role access and processed a support ticket containing user input → the attacker embedded SQL commands to **leak an integration token** to a public thread.
- **A disclosed MCP vulnerability — CurXecute (CVE-2025-54135):** indirect prompt injection that makes Cursor write a malicious `.cursor/mcp.json` file → **remote code execution (RCE)** with just one message. **Patched in Cursor 1.3 (Jul 29, 2025)** — updating your version is the main mitigation.
- **MCPoison (CVE-2025-54136):** from the same Check Point research wave — an attacker exploits Cursor **not re-validating** an MCP config that was approved once, altering the command behind your back to achieve **persistent code execution**. Also patched; lesson: be careful approving MCP and update Cursor promptly.
- **Auto-run / "YOLO" mode:** executes AI-generated commands **without approval** → if the payload is malicious, it's exploited extremely fast. *As of Cursor 3.6+*, use **Auto-review** (the recommended default): run an allowlist, sandbox, and route the rest through an LLM classifier to allow/block.

**Best practices:** (1) turn on Privacy Mode; (2) **don't enable auto-run/full-auto** on sensitive repos; (3) review the command allowlist; (4) be careful installing unfamiliar MCP servers; (5) add `.cursorignore` for secrets/`.env`.
:::

### Common errors & how to handle them

| Error / symptom | Cause | Fix |
|---|---|---|
| **"You've reached your request limit" / "Too many requests"** | Out of fast requests; spamming ⌘K/regenerate | Wait ~60s; avoid rapid-firing. *Per sources, Pro has ~500 fast requests/month* — **this is the OLD pricing model (pre-Jun 2025), replaced by the credit system; this number is from a secondary source and changes often** |
| **Very slow responses (slow queue)** | Out of fast requests, deprioritized | Switch to a small/fast model; or use **your own API key** (per-token, no rate limit) |
| **Cursor slow on a large repo** | Indexer churn, heavy context, MCP overhead, "extension tax" | Create a **`.cursorignore`**; disable heavy extensions (ESLint/Pylance on large projects, GitLens); pick a fast model for routine work |
| **"User provided API key rate limit exceeded"** | A limit on OpenAI/Anthropic's side (your key) | Check your quota/billing at the model provider; wait for reset |
| **Generated code is broken / "fixing one error creates another"** | The agent lacks enough context, vague prompt | Use Plan Mode + a specific prompt; `@`-reference the right file; review the diff; break the task into smaller pieces |
| **MCP server doesn't show up** | MCP only loads at startup | **Fully quit & reopen Cursor**; check `.cursor/mcp.json`; look at "Installed MCP Servers" |
| **Rule not applying** | A `.md` file with no frontmatter is ignored | Switch to `.mdc` with the right frontmatter (`description`/`globs`/`alwaysApply`) |

::: details ❓ FAQ & common errors (operations)

**Q: Can I import VS Code extensions/themes into Cursor?**
→ Yes. Cursor is a VS Code fork; on first launch it offers to import them. Most extensions run fine.

**Q: How does Auto mode differ from manually picking a model, cost-wise?**
→ Auto mode lets Cursor pick the model, so it's **usually cheaper**; picking a frontier model yourself **burns credit faster** per use. *Warning:* the claim "Auto = no credit deducted" was a 2025 policy and **has changed** — as of mid-2026, treat every request as potentially counting toward usage; check `cursor.com/pricing`. Rule of thumb: leave routine work on Auto, only pick a strong model for hard work.

**Q: I keep getting stuck in the "slow queue" — how do I get out?**
→ You're out of fast requests. Either wait for the reset window, use a faster model, or plug in **your own API key** to pay per-token (bypassing Cursor's limits).

**Q: Do limits reset on the calendar month?**
→ No — limits **reset on your billing day**, not the 1st of the month. See *Settings → Subscription* for your reset date.

**Q: My rule isn't being followed by the agent?**
→ Most likely the file is `.md` (ignored) instead of `.mdc`, or it's missing frontmatter, or the application type is wrong (e.g. set to "Apply Manually" so you have to call `@rule-name`). Re-read section 03.

**Q: Cursor "doesn't understand my whole codebase"?**
→ Check that codebase indexing has finished; cut out the junk with `.cursorignore`; and **proactively `@file`** the relevant files into context instead of expecting the agent to find everything itself.
:::

---

## 05 · Exercises / mini-project

Do them in order. Each has **clear success criteria** so you can check yourself.

### 🧪 Exercise 1 — Get comfortable with Tab + Chat on a real project (basic)

**Goal:** install Cursor, open your project, get a feel for Tab autocomplete and Chat.

1. Install per section 02, open Cursor, *Open Folder* pointing at one of your projects.
2. Open a code file, start typing a function → watch **Tab** suggest a block of code; press **Tab** to accept, **Esc** to reject.
3. Open **Chat** (**⌘+L** / **Ctrl+L**) and ask:
```text
Give me an overview of this codebase
Where is authentication handled?
```

::: details ✅ Completion criteria
- You see Tab suggest **more than one line** and can accept it with Tab.
- Chat answers with a codebase overview + where auth is handled (**without** editing any file).
- (Reflect for yourself) You can tell **Chat/Ask** (Q&A) apart from **Agent** (file edits).
:::

### 🧪 Exercise 2 — Delegate a task to the Agent + Plan Mode (core)

**Goal:** experience the *plan → agent → review* loop: let the agent edit code and run tests.

1. In the input box, press **Shift+Tab** to enable **Plan Mode**, and type:
```text
Add unit tests for the input-validation function in src/, run the tests, fix until they pass.
Keep the public API unchanged.
```
2. Read the **plan** the agent drafts (in `.cursor/plans`), edit it if needed, then let it run.
3. Open **Agent Mode** (**⌘+.** / **Ctrl+.**) to let the agent execute; **read the diff** of each file before you accept.

::: details ✅ Completion criteria
- You **see the plan first** before any file is edited (Plan Mode works).
- The agent creates tests, **actually runs them**, and fixes until they pass.
- You **review the diff** and accept selectively (no blind accept-all).
:::

### 🧪 Exercise 3 — Rules + MCP + saving credit (advanced)

**Goal:** "teach" the agent your project's conventions and connect an external tool; practice cost discipline.

1. Create `.cursor/rules/style.mdc` with the right `globs` frontmatter (template in section 03), enforcing a rule you often have to repeat (e.g. "no `any`", "use named exports").
2. Add an MCP server (per-project `.cursor/mcp.json`), **quit & reopen Cursor**, and verify it appears under "Installed MCP Servers."
3. Do a task in **Auto mode** (no frontier model) and **watch the usage/credit consumed** in *Settings → Usage*; then try manually picking a frontier model and notice the difference in consumption.

::: details ✅ Completion criteria
- The `.mdc` rule **is applied** (the agent follows the rule without you repeating it).
- The MCP server appears after restarting Cursor.
- You understand the cost difference between **Auto mode (usually cheaper)** vs **manually picking a frontier model (burns credit faster)** — and know when to use which.
:::

---

## 06 · Case studies & real use-cases (from the community)

This section gathers **sourced** Cursor use-cases so you can see what it does *at real scale*. The enterprise cases come from **cursor.com/customers** (with named people + titles).

::: warning ⚠️ Read the numbers correctly
Every **% productivity** figure in this section is **self-reported** via Cursor's customer page (or a benchmark published by Cursor) — **not independently audited**. The company names + titles are real on that page. Read them as *"per the company's/Cursor's claims,"* not as neutral numbers.
:::

**① Coinbase — refactors from months to days**
- **Context:** Brian Armstrong (CEO) announced this as of ~Feb 2025.
- **What they did → result:** **100% of engineers now use Cursor**; a single engineer now refactors the codebase in *a few days* instead of *a few months*.
- **Lesson:** at scale, Cursor's biggest benefit is **shortening repetitive mechanical work across many files**.
- *Source: cursor.com/customers (Coinbase).*

**② Rippling — adoption spread fast in a few weeks**
- **Context:** Albert Strasheim (CTO).
- **Result:** adoption rose from **150 → 500+ engineers (~60% of the org)** in just a few weeks.
- **Lesson:** when Tab + Agent are good enough, the tool **spreads on its own** within the team without being forced.
- *Source: cursor.com/customers (Rippling).*

**③ Upwork — more PRs & more code shipped**
- **Context:** Anton Andreev (Principal SWE).
- **Result:** **+25% PRs**, average PR size **+100%**, total code shipped **+50%**.
- **Lesson:** measure impact by **PRs & code shipped**, not just "feeling faster."
- *Source: cursor.com/customers (Upwork).*

**④ monday.com — 2–5x velocity, better tech-debt management**
- **Context:** Roni Avidov (Senior R&D Team Lead).
- **Result:** **velocity up 2–5x**; better tech-debt management and refactoring.
- **Lesson:** Cursor isn't just for writing new features but also fits **paying down tech debt/refactoring**.
- *Source: cursor.com/customers (monday.com).*

**⑤ Brex — adoption >70%, better onboarding & debugging**
- **Context:** James Reggio (CTO).
- **Result:** **>70% engineer adoption**; faster migrations, better debugging & onboarding.
- **Lesson:** the value isn't just coding speed but also **understanding code fast** (onboarding newcomers, debugging).
- *Source: cursor.com/customers (Brex). (Mercado Libre, Stripe, Sentry, eBay also have similar testimonials.)*

**⑥ Community (Reddit r/cursor) — multi-file refactors & building real systems**
- **Context:** *secondary-source synthesis with no specific handle, so paraphrased in general.*
- **What they did → result:** one developer describes using Cursor to build a scraper system with a job queue, managing a fleet of VMs on Fly.io and writing data into Supabase; the community heavily praises its ability to **refactor across multiple files throughout the codebase**, saving hours.
- **Lesson:** Cursor's repeatedly-cited strength is **consistent edits across many files at once**.
- *Source: synthesis of r/cursor discussions.*

::: tip 💡 A notable endorsement (press source, not cursor.com)
NVIDIA CEO **Jensen Huang** publicly backed Cursor and said, in essence, **"100% of our engineers now code with AI"** *(TechStartups, ~Oct 2025)*. Note: this is about *"coding with AI"* in general in the context of endorsing Cursor — don't read it as "100% use Cursor exclusively."
:::

::: details 📌 Recurring patterns from the cases (worth learning)
- **Adoption spreads on its own** when Tab + Agent are good enough (Rippling, Brex) — no top-down mandate needed.
- **Measure by PRs & code shipped**, not just feel (Upwork).
- **Fits both new work and refactoring/tech-debt** (monday.com, Coinbase).
- **The onboarding/debugging value** rivals the coding-speed value (Brex).
- **The clearest technical strength: multi-file refactoring** (community).
:::

---

## 07 · Summary & official sources

::: tip 📌 6 things to take away
1. Cursor = an **AI code editor** (a VS Code fork, by Anysphere) — AI is the **center**, not a plugin. Strongest at **Tab autocomplete** + **Agent Mode** + **codebase indexing**.
2. There's a **Free plan (Hobby)** you can use right away with no card; for serious use, **Pro $20/mo**. Understand the **credit system** clearly (Auto is usually cheaper; manually picking a frontier model burns it faster — and "Auto is free" was an old policy that has changed) — this is the easiest place to get confused & "burn through your wallet."
3. **Works fine worldwide**; the only friction is **payment** — prefer an international Visa/Mastercard.
4. The standard process: **Plan Mode (Shift+Tab)** → a specific prompt → **Agent (⌘+.)** → **review the diff** → only add Rules/MCP when you really need them.
5. **Rules use the `.mdc` extension + frontmatter** (a plain `.md` file is ignored); MCP **requires restarting Cursor** to load.
6. **Security:** turn on **Privacy Mode** for sensitive code; **no auto-run** on important repos; be careful with unfamiliar MCP (there's already been an RCE CVE). And **don't blindly hand auth/migrations/production to the agent**.
:::

The product changes very fast — when the material goes stale, use these official links to update yourself:

| Topic | Official link |
|---|---|
| Homepage | <https://cursor.com> |
| Pricing | <https://cursor.com/pricing> |
| Features | <https://cursor.com/features> |
| Docs — Rules | <https://cursor.com/docs/context/rules> |
| Docs — MCP | <https://cursor.com/docs/mcp> |
| Docs — CLI installation | <https://cursor.com/docs/cli/installation> |
| Security / Data use | <https://cursor.com/security> · <https://cursor.com/data-use> |
| Blog — Best practices with agents | <https://cursor.com/blog/agent-best-practices> |

> *The material in this chapter is based mainly on the official `cursor.com` docs (current as of ~mid-2026). Most performance/benchmark numbers (Tab ~72%, original Composer ~4x speed, "8 agents in parallel"…) are **published by Cursor itself** — labeled "per vendor." Model benchmark numbers (SWE-bench…) change very fast; prefer checking the current leaderboard. Prices, tier names, and the credit policy change many times; when in doubt, check <https://cursor.com/pricing> before you buy.*
