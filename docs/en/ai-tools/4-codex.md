---
title: 'OpenAI Codex — the OpenAI coding agent in your terminal & the cloud'
description: 'Hands-on guide to OpenAI Codex (the revived 2025–2026 product): a multi-surface coding agent (Rust CLI, cloud sandbox, IDE, app). Setup, sign-in with your ChatGPT plan, pricing & access, token-based pricing, AGENTS.md, approval/sandbox, MCP — with real commands & prompts.'
---

# OpenAI Codex — OpenAI's coding agent

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧩</p>

::: tip 🔥 Hands-on — 30 seconds
You're a developer at a startup. It's 4 PM and your lead drops a task on you: *"The `parseDate` function is parsing the `dd/MM/yyyy` format wrong — fix it and add a test that passes."* You open your terminal, type `codex`, and paste that exact sentence in. Codex **reads** `src/utils/date.ts` on its own, understands the repo, **writes a test**, **runs** `pnpm test`, sees it fail, **fixes** the code, and re-runs until it's green — you just sit there reviewing the diff.
**💸 The real payoff:** that "read unfamiliar code + write a test + run + fix" loop that used to eat 1–2 hours now takes ~15 minutes; you spend your time on the genuinely hard part instead of the repetitive grind.
:::

> **"Codex is not autocomplete suggesting a line of code.**
> **It's an agent that reads the repo, edits files, runs tests and shell commands to complete an engineering task on its own — and that's the distinction you have to grasp before you touch the keyboard."**

::: tip 🎯 After this chapter you'll be able to
- **Install** the Codex CLI (npm/brew/script) and **sign in** with your ChatGPT plan — no API key required.
- **Run a session** to hand Codex work in plain language, and review the diff before applying.
- **Write an `AGENTS.md`** for your repo to steer the agent in the right direction from the start.
- **Pick the right safety mode** (`approval_policy` + `sandbox_mode`) for an unfamiliar repo vs. your own.
- **Automate** a step in CI/scripts with `codex exec` (non-interactive runs).
- **Decide** when to use the CLI/IDE (quick fixes) vs. Codex Cloud (heavy, long-running work that returns a PR).
:::

::: warning ⚠️ Timing caveat
This is what's known about the revived Codex as of **mid-2026**. OpenAI changes pricing/features/regions **very fast** (billing alone shifted from per-message to per-token during 2026). Before you commit money, double-check on the official pages [openai.com/codex](https://openai.com/codex/) and [developers.openai.com/codex](https://developers.openai.com/codex/).
:::

---

## 01 · What this tool is & when to use it

**OpenAI Codex** (the 2025–2026 product) is an **AI coding agent** from OpenAI. Unlike autocomplete-style code suggestions, it **reads the codebase, edits files, runs tests/shell** and completes an engineering task end to end.

::: warning 🚨 Don't confuse the two "Codex"es
The name *Codex* refers to **two completely different things**:
- **The original 2021–2023 Codex:** a *code-generation model* (code-davinci) — **discontinued**.
- **The revived Codex from May 2025:** a *multi-surface coding agent* running on the GPT-5.x models — **this is what this chapter is about**.

Mixing these two up is the single most common mistake when reading older docs online.
:::

What makes it distinctive: Codex isn't a single app, but **a family of products across 4 surfaces** that share one "brain":

| Surface | What it is | Use it when |
|---|---|---|
| **Codex CLI** | An agent that runs in your terminal, **open source, written in Rust** | You live in the terminal, want quick fixes + diff review (the rough equivalent of Claude Code) |
| **Codex Cloud** | An agent that runs in a **cloud sandbox**, works asynchronously and returns a **PR/diff** | Heavy/long-running work you don't want tying up your local machine; kick it off via web/GitHub/Slack/mobile |
| **IDE extension** | The official extension for **VS Code, Cursor, Windsurf** | You want the agent right inside your editor, choosing the model via a model selector |
| **Codex app** | A **desktop & iOS** app | Working from a desktop/phone; iOS has Face ID/passcode lock |

The current underlying models: **GPT-5.5** (an agentic-first model launched April 23, 2026) and the **GPT-5.x-Codex** line.

::: tip 🔑 A few features worth noting
- **Goal mode** (shipped in **May 2026** per the official changelog): set a *goal* and Codex drives itself toward it for hours/days — available in the app, IDE, and CLI.
- **Computer use:** Codex reads the screen and operates desktop apps (macOS, and **Windows since May 29, 2026**) — for GUI testing and end-to-end QA.
- **Automated code review** on pull requests: reads the diff, comments, suggests fixes.
- **`AGENTS.md`:** a project instruction file to steer the agent. Codex **reads and merges multiple `AGENTS.md` files by directory level** (root → subdirectory), where the file closest to what's being edited **overrides** instructions above it (each file is capped at ~32KB per the official docs as of mid-2026).
- **MCP (Model Context Protocol):** declare `[mcp_servers.<name>]` to attach external tools.
- **Sites plugin** (preview, June 2, 2026): build & deploy a website right from the app's sidebar.
:::

**When should you use Codex?** When your task is *real software engineering* (fixing bugs, adding tests, refactoring, reading an unfamiliar repo) rather than just "asking about code." The more repetitive the work, and the more "read → fix → run → fix again" steps it has, the more the agent earns its keep.

### Versus other tools — which one to pick?

Codex doesn't exist in a vacuum. The table below helps you decide **when to choose Codex over a rival** (a directional view as of mid-2026 — not an absolute ranking):

| Rival | What it is | Codex wins on | The rival wins on |
|---|---|---|---|
| **Claude Code** | CLI agent (Anthropic) | "A swarm of small parallel jobs"; **Codex Cloud** runs in a sandbox and returns PRs; computer use; ships bundled with your ChatGPT plan | Often praised by the community for **deeper reasoning** on large/complex tasks (see 7.5: a developer recounts Codex "losing to Claude" on complex data/extraction tasks) |
| **Cursor / Windsurf** | AI **IDEs** (not pure agents) | Codex is an **agent** running in the background (CLI + Cloud), not locked to one editor; and it has an **IDE extension that plugs straight into Cursor/Windsurf themselves** | A smoother integrated editor experience (inline autocomplete, tab, chat right in the code) for hands-on typing |
| **Gemini CLI** | CLI agent (Google) | OpenAI's ecosystem + models; many surfaces (Cloud/IDE/app) | The **price/quota** axis (Google offers a generous free tier) + Google ecosystem integration |
| **Devin** | Autonomous cloud agent, premium pricing | **Codex Cloud is far cheaper**, bundled into the ChatGPT plan you already have; flexible across CLI + cloud | Positioned as a full "autonomous software engineer" needing less manual intervention (but at a high price) |

::: tip 🧭 One line to remember
Need to **fix things fast in the terminal + run many small tasks in parallel + already have a ChatGPT plan** → Codex is the natural pick. Need **deep architectural reasoning for one big task** → also consider Claude Code (or go multi-model, see tip 6 in section 7.4). Need **hands-on coding with inline suggestions** → an IDE like Cursor fits better.
:::

::: tip 📌 Real example — Codex isn't just for coding anymore (2026)
Context: OpenAI announced Codex had passed **more than 4 million developers/week** (up from over 3 million just two weeks earlier), with team usage up **~6x** vs. January and **~10x** vs. August.

The surprise: by May 2026, **~50% of Codex usage was NO LONGER coding** — people were using it to manage their inbox, drive their Mac, and run long-running jobs toward a "goal." Codex had shifted from "coding assistant" to "full-stack work platform."

Takeaway: if you're new to Codex, don't box yourself into "writing code." But also remember: these percentages are **self-reported by OpenAI** — read them as a trend signal, not independently verified fact.

*Source: OpenAI "Building more with GPT-5.1-Codex-Max" — https://openai.com/index/gpt-5-1-codex-max/ ; KuCoin roundup — https://www.kucoin.com/news/flash/codex-evolves-from-coding-assistant-to-full-stack-work-platform-with-4m-weekly-active-users*
:::

---

## 02 · Pricing & access

### 2.1 · Availability and account types

Codex **ships bundled with your ChatGPT plan**, so once you have a plan, you can use it; the API route is supported too. Availability and pricing by country change quickly, so the safest entry point for most people is to sign in with an existing ChatGPT plan (more on tiers below).

::: tip 🌏 Note for Vietnam / SEA readers
Since **October 2025**, OpenAI has rolled out the **ChatGPT Go** plan to 16 countries in Asia, **including Vietnam**, and **accepts payment in local currency**. Earlier, users in Vietnam sometimes hit the *"OpenAI unavailable in your country"* error — that's no longer the case. If your local card has trouble with USD billing on the Plus/Pro tiers, the local-currency Go plan is often the smoothest way in.
:::

::: warning ⚠️ Verify for yourself
Country/region policy **changes fast**. Before you buy, re-check access & payment options for your region on the official pages — don't trust an old article (including this chapter).
:::

### 2.2 · Installing the Codex CLI

Pick **one** method that suits your machine:

```bash
# Option 1 — npm (all platforms)
npm install -g @openai/codex

# Option 2 — Homebrew (macOS)
brew install --cask codex

# Option 3 — script (macOS/Linux)
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

On **Windows** (PowerShell):

```text
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

Supported: **macOS** (Apple Silicon + x86_64), **Linux** (x86_64 + arm64), **Windows**.

Verify the install succeeded:

```bash
codex --version
```

### 2.3 · Signing in

Two routes, pick one:

| Method | Pros | Cons |
|---|---|---|
| **Sign in with ChatGPT** (recommended) | Uses your **ChatGPT plan's quota** (Plus/Pro/Business/Edu/Enterprise); gets new models early | Capped by the plan's sliding window |
| **API key** (`OPENAI_API_KEY`) | Billed by token, no fixed rate limit | New models/features **usually arrive later** than on the ChatGPT plan |

Run `codex`, choose **"Sign in with ChatGPT,"** and follow the prompts — this is the easiest way in for newcomers.

### 2.4 · Pricing (ChatGPT plan, Codex included)

| Plan | Price | For |
|---|---|---|
| **Free** | $0 | Just "exploring" quick tasks, a small Codex Mini–style model, **very tight limits** |
| **Go** | **~$8/month** (global price; sold in local currency in some regions, VAT inclusive) | Light work — the cheapest entry point |
| **Plus** | $20/month | Focused sessions; capped by a **5-hour sliding window** (e.g. GPT-5.5: ~15–80 local messages/5h) |
| **Pro** | from $100/month (tiers up to $200) | Limits many times higher than Plus. Per the official pricing page (as of mid-2026), the **Pro 5x ≈ 80–400 local messages/5h** (GPT-5.5); a higher tier (20x) exists but **check the official rate card for the exact numbers** before trusting them |
| **Business** | billed per **seat** (pay-as-you-go) | Teams |
| **Enterprise / Edu** | contact sales | Large organizations / schools |

::: details 💸 Token-based pricing (billed in credits once you exceed your limits)
As of **April 2, 2026**, OpenAI switched to **per-token** billing instead of per-message. Reference table (input / output, in credits per 1M tokens):

| Model | Input /1M | Output /1M |
|---|---|---|
| **GPT-5.5** | 125 | 750 |
| **GPT-5.4** | 62.5 | 375 |
| **GPT-5.4-mini** | 18.75 | 113 |
| **GPT-5.3-Codex** | 43.75 | 350 |

- **Cached input** costs only ~10% of the price → the more stable your repo, the cheaper it gets.
- In practice, the average lands around **~$100–$200/dev/month** depending on the model & intensity.
:::

::: tip 🎯 Picking a plan
- Just trying Codex out → **Go (~$8)** or **Plus ($20)** is plenty to experience the CLI/IDE.
- Constantly hitting the 5-hour window ceiling on Plus → consider **Pro** (5x/20x) rather than paying for one-off credits.
- Codex **understands prompts in many languages well** (it handles Vietnamese prompts fine, for instance); your `AGENTS.md` can be written in any language too (the UI/docs are in English).
:::

---

## 03 · The hands-on workflow — step by step

This is the standard flow from zero to the agent doing real work.

**Step 1 — Install the CLI** (see section 2.2). Verify:

```bash
codex --version
```

**Step 2 — Sign in.** Run `codex`, choose *Sign in with ChatGPT* (or set the environment variable if using the API):

```bash
export OPENAI_API_KEY="sk-..."   # only when using the API-key route
```

**Step 3 — Go into your project directory and write `AGENTS.md`.** This is the **single biggest lever** for getting the agent to do the right thing. Put the file at the **repo root**:

```text
# AGENTS.md  (a minimal example, placed at the repo root)
# Project: my-app
# Build: pnpm install && pnpm build
# Test: pnpm test
# Conventions: TypeScript strict; don't add new dependencies without asking
```

::: tip 📌 Real example — `AGENTS.md` is a "behavior switch"
Per discussion on Hacker News (the "Many of us prefer OpenAI's Codex…" thread) and developer Jason Liu's blog, just **changing the contents of `AGENTS.md`** produced "huge behavioral changes" in the agent — which is exactly why many people pick Codex over other tools.

A practical trick worth learning: beyond build/test commands, **ask the agent itself to record what it learns** into `AGENTS.md` (e.g. "when you discover a new repo convention, update this file"). Jason Liu keeps `AGENTS.md` in an Obsidian vault and **syncs it to GitHub**, so he can review via diff what "the agent remembered/changed" over time.

Takeaway: `AGENTS.md` isn't a static write-once file — treat it as the agent's living memory and its value compounds over time.

*Source: Hacker News — https://news.ycombinator.com/item?id=47667380 ; Jason Liu's blog "Codex-maxxing" — https://jxnl.co/writing/2026/05/10/codex-maxxing/*
:::

**Step 4 — Open an interactive session** and type your request in natural language:

```bash
codex
# then type, for example:
# "add a test for the parseDate function and make it pass"
```

To specify a model:

```bash
codex --model gpt-5.5
# or the short form:
codex -m gpt-5.5
```

**Step 5 — Pick the right approval mode.** The default is `on-request` (the agent asks when needed). Depending on how much you trust the repo:

| Situation | Set it to |
|---|---|
| Unfamiliar repo, not yet trusted | `sandbox_mode = read-only` or approval `on-request` |
| Your own repo, want to move fast | `workspace-write` / full-auto |
| **Almost never** | `danger-full-access` (high risk — see section 04) |

**Step 6 — Big/long-running work → turn on Goal mode** so the agent drives itself toward the goal for hours (available in the app, IDE, CLI).

**Step 7 — Asynchronous or heavy work → hand it to Codex Cloud.** Go to [chatgpt.com/codex](https://chatgpt.com/codex) (or kick it off from GitHub/Slack); the agent runs in a cloud sandbox and **returns a PR** — your local machine stays free.

**Step 8 — Automation/CI → use `codex exec`** (non-interactive): run a single command, get the result, no need to sit and interact:

```bash
codex exec "write unit tests for src/utils/date.ts and make them pass"
```

**Step 9 — Extend tools via MCP.** Declare an MCP server in `~/.codex/config.toml` so Codex can call external tools:

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

# MCP server "fetch" — you need BOTH command AND args for it to run.
# (just "command" with no "args" → the server won't start, and tool calls return nothing)
[mcp_servers.fetch]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-fetch"]
```

::: tip 🔑 In-session commands (slash commands)
While inside an interactive Codex session, you can use slash commands:

```text
/plan       # have the agent plan first
/exec       # execute
/review     # review the changes
/model      # switch models mid-session
/approvals  # quickly switch approval/sandbox mode mid-session
/status     # see session status & remaining quota in the 5h window
/side       # open a side conversation (also available on ChatGPT iOS)
```
:::

::: tip ⚡ A few handy lesser-known features/flags
- **Resume an old session:** `codex resume` to pick up a previous session (without losing the context you'd built).
- **Run against another directory:** add `--cd <path>` to have Codex work outside the current directory.
- **Capture output for CI:** `codex exec "..." --output-last-message out.txt` writes the final answer to a file, handy for pipelines.
- **Profiles:** once you've defined `[profiles.<name>]` in your config (see the box below), run `codex --profile safe` / `--profile full` to switch read-only ↔ full-auto in a single flag.
> Flag syntax can change between CLI versions — run `codex --help` to check what's on your machine.
:::

::: details 🧩 A fuller example config.toml (line by line)
```toml
# the base model for the agent
model = "gpt-5.5"

# approval_policy: untrusted | on-request | never
#   - untrusted  : suspicious, asks the most
#   - on-request : default, asks when needed (safe & convenient)
#   - never      : never asks (only when you REALLY trust it)
approval_policy = "on-request"

# sandbox_mode: read-only | workspace-write | danger-full-access
#   - read-only         : read only, no file edits (safest for unfamiliar repos)
#   - workspace-write    : allowed to edit files in the workspace
#   - danger-full-access : full permissions (RISKY — avoid unless truly needed)
sandbox_mode = "workspace-write"

# Attach external tools via MCP (needs BOTH command and args to run)
[mcp_servers.fetch]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-fetch"]

# Profiles: predefine a few config bundles to switch between quickly,
# so you don't edit by hand each time. Run: codex --profile safe  (or: full)
[profiles.safe]
approval_policy = "untrusted"
sandbox_mode = "read-only"

[profiles.full]
approval_policy = "never"
sandbox_mode = "workspace-write"
```
> Note: a `config.toml` placed **in the repo** (`.codex/config.toml`) is only loaded once you "trust" the project — use it to override config per project. The exact MCP server name/args can vary by package — check https://developers.openai.com/codex/mcp if a command doesn't run.
:::

---

## 04 · Tips & common mistakes

### 4.1 · Tips that pay off

::: tip ✅ 7 hands-on tips
1. **Write a clear `AGENTS.md`** (build/test commands, style, allowed boundaries) — this is the single biggest lever for getting the agent right from the start.
2. **Start safe with unfamiliar repos:** `sandbox_mode=read-only` or approval `on-request`; only open up `workspace-write` once you trust it. Avoid `danger-full-access` unless truly necessary.
3. **Right tool for the job:** `codex exec` for CI/automated scripts; an interactive session for work where you want to **review the diff before applying**.
4. **Long-running/independent work → push it to Codex Cloud** so it doesn't tie up your local machine and you get a PR back; work that needs a quick fix right now → CLI/IDE.
5. **Choose the model by difficulty:** GPT-5.5 for complex tasks; the **-mini** line to save credits on simple ones — token prices differ by a wide margin.
6. **Watch the 5-hour sliding window:** if you keep hitting the ceiling on Plus, consider Pro (5x/20x) rather than paying for one-off credits.
7. **A `config.toml` in the repo** (`.codex/config.toml`) is only loaded once you "trust" the project — use it to override config per project.
:::

### 4.2 · Common errors & traps

::: warning 🚨 8 traps to dodge
1. **Confusing the 2021–2023 "Codex" with the 2025–2026 agent** — they're entirely different things (see section 01).
2. **Assuming the Free plan gives you the full agent** — Free only allows quick tasks, a small model, and very tight limits; it's **not the full Codex agent**.
3. **Getting cut off mid-task** because you ran out of the **5-hour sliding window** quota (especially on Plus with GPT-5.5).
4. **Token costs climbing fast** when running many instances / fast mode / GPT-5.5 — realistically up to **$100–$200/dev/month**.
5. **The API-key route gets models LATER** than the ChatGPT plan → new features/models may not be available right away via the API.
6. **`approval_policy=never` + `sandbox danger-full-access` is risky** — the agent can run destructive commands **without asking**.
7. **Computer use on Windows only arrived May 29, 2026**; many features (Sites, certain items) are in **preview** and may change.
8. **Country/region policy can change** — re-verify access & payment for your region on the official pages before committing.
:::

::: warning ⚠️ Dangerous config — look so you can avoid it
The pair below gives the agent permission to run *any* command **without asking**. Use it only in an isolated environment (a disposable container) — never on a machine holding important data:

```toml
approval_policy = "never"
sandbox_mode = "danger-full-access"
```
:::

::: warning 📌 Real example — "overreach" when you grant full-auto
Many developers on Hacker News and in Reddit sentiment roundups (r/codex, r/ChatGPTCoding) report that when the CLI is given **full permissions**, Codex tends to "**rewrite a large amount of code that's hard to follow**" and **propose out-of-scope work** (scope creep).

One subtle form of technical debt that's been described: the agent **makes a field nullable just to silence a compiler warning** — accidentally breaking data integrity; or writes duplicate functions; or picks a wasteful approach (spawning a sub-interpreter on every function call). With unfamiliar libraries/frameworks, some describe Codex as "**like a bad junior dev**": rather than admitting "I don't know," it makes things up (hallucinates).

Takeaway: this is exactly why section 4.2 advises starting at `read-only`/`on-request` and **reviewing the diff before applying** — don't hand a big job to full-auto and then merge it blind.

*Source: Hacker News "OpenAI Codex hands-on review" — https://news.ycombinator.com/item?id=44042070 ; Reddit sentiment roundup via DEV.to — https://dev.to/_46ea277e677b888e0cd13/claude-code-vs-codex-2026-what-500-reddit-developers-really-think-31pb (the survey numbers in that article are UNVERIFIED against the original posts).*
:::

### 4.3 · FAQ & common install/run problems

::: details ❓ FAQ & troubleshooting (open to see how to handle them)
**1) npm install reports `EACCES` / permission denied (global).**
Don't `sudo npm install -g`. The clean fix: use **nvm** (Node version manager) so npm global writes into your own directory; or switch to installing via **Homebrew** (`brew install --cask codex`) / the script (`curl … | sh`) from section 2.2.

**2) After installing, `codex` reports `command not found`.**
The directory holding the binary isn't on your `PATH` yet. Reopen your terminal; if it still fails, add npm/Homebrew's bin directory to `PATH` in `~/.zshrc` (macOS defaults to zsh) and open a new terminal. Re-check with `codex --version`.

**3) "Sign in with ChatGPT" won't complete (you're on SSH/headless/a server).**
The sign-in flow opens a callback port on `localhost` — a machine with no browser (server, container, SSH) gets stuck. The alternative: use an **API key** (`export OPENAI_API_KEY="sk-..."`) instead of the ChatGPT sign-in. Remember: the API-key route may get new models/features **later** than the ChatGPT plan.

**4) It gets cut off mid-run.**
Usually you've exhausted the **5-hour sliding window** quota (common on Plus with GPT-5.5). To see remaining quota: use the `/status` command in an interactive session (or check the usage section in the app/ChatGPT). Once the window's spent, wait for the reset or consider Pro.

**5) You set `sandbox_mode = workspace-write` but the agent still reports it can only read (read-only).**
There's a **known bug** on some desktop/Windows builds where the write permission doesn't apply correctly (see GitHub issue openai/codex #20942). Workaround: run the latest **CLI** (`npm i -g @openai/codex@latest`) and check the config is in the right place (`~/.codex/config.toml` for global; `.codex/config.toml` in the repo is only loaded once the project is "trusted").

**6) Connection errors behind a corporate proxy/network.**
Set the standard proxy environment variables (`HTTPS_PROXY` / `HTTP_PROXY`) before running `codex`; some networks block OpenAI's endpoints — try a different network to confirm it really is the proxy.

*Troubleshooting sources: GitHub Issues openai/codex (e.g. #20942) — https://github.com/openai/codex/issues ; config docs — https://developers.openai.com/codex/config-reference*
:::

---

## 05 · Security, privacy & when NOT to use it

Codex is an agent **with permission to run commands and to send your code to OpenAI's servers** — so this section is required reading before you hand it real work, especially company code.

### 5.1 · Where does your data go?

::: warning 🔒 Code & prompts are sent to OpenAI for processing
- **Is it used to train models?** Per the official docs (as of mid-2026): **Business / Enterprise — customer code is NOT used for training by default**. For **personal accounts (Free / Go / Plus / Pro)**, data **may** be used to improve models **unless you turn it off yourself**. → Go to **Settings → Data controls** and **turn off "improve the model for everyone"** if you don't want that.
- **Zero Data Retention (ZDR):** available for Enterprise/ZDR organizations — data isn't retained. Suitable when you have compliance constraints.
- **Don't paste these things** — especially when `sandbox_mode = danger-full-access`: production API keys/secrets, real `.env` files, tokens, customer data/PII. The agent might inadvertently log, echo, or send them somewhere.

*Source: OpenAI Help — "Using Codex with your ChatGPT plan" — https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan*
:::

::: tip 🌐 Privacy & regulation note
If you operate under a data-protection regime (GDPR in the EU/UK, or a local privacy/personal-data law in your country), treat any code, logs, or customer data sent to a cloud agent as a cross-border data transfer and check whether your policy allows it. For regulated workloads, prefer Enterprise/ZDR and never paste secrets or personal data.
:::

### 5.2 · Prompt injection — a real risk, confirmed by the docs

::: warning 🚨 Untrusted content can "hijack" the agent
This is **not** a theoretical worry — OpenAI's official security docs confirm it's a real risk:

- **The mechanism:** the agent reads external content (a PDF, an email, a web page, or a malicious `AGENTS.md` inside a dependency) and gets **hidden instructions injected** → it does something you didn't intend (leaking data, running bad commands). A malicious `AGENTS.md` in a third-party package is a form of **supply-chain attack**.
- **Codex Cloud has NO internet at runtime by default** precisely to reduce this risk; web search has a **cached mode** to limit pulling in uncontrolled fresh content.
- **There's been a real CVE:** a **command-injection vulnerability in the Codex CLI** could **leak a GitHub token** (disclosed by BeyondTrust). → Lesson: **update the CLI regularly** (`npm i -g @openai/codex@latest`).

**Safety rule:** don't point the agent at untrusted content **while in a write/full-access mode** (`workspace-write` / `danger-full-access`). For unfamiliar content → keep it `read-only` and review the diff.

*Source: OpenAI Codex Security — https://developers.openai.com/codex/security ; BeyondTrust — https://www.beyondtrust.com/blog/entry/openai-codex-command-injection-vulnerability-github-token*
:::

### 5.3 · When NOT to use Codex

::: warning 🛑 Four situations to stop and reconsider
1. **Large tasks needing deep architectural reasoning.** Community data (section 7.2): the success rate for small tasks is only **~40–60%**, and for large tasks it **"drops noticeably."** For big work → design it yourself first, or go multi-model.
2. **Safety-critical domains** (medicine, core finance, self-driving, etc.). Even the Kodiak case (section 7.1) only uses it for **tooling/refactoring around the core**, not letting the agent touch the high-risk parts.
3. **When you can't (or won't) review the diff.** The agent tends to "overreach" (rewriting lots of code, scope creep — section 7.5). No review = blind merge = technical debt.
4. **When sensitive data can't leave the machine** (ZDR/compliance constraints, customer data, contracts). If you must use it → only Enterprise/ZDR, and never paste secrets/PII.
:::

---

## 06 · Exercises / mini-projects

Do them in order — each has clear **"done" criteria** so you can grade yourself.

### Exercise 1 — Install & "Hello, agent" (≈15 min)

**Goal:** install the Codex CLI, sign in, run your first session.

```bash
npm install -g @openai/codex
codex --version
codex
# in the session, type something casual to try it, e.g.:
# "list the files in this directory and guess what the project does"
```

::: details ✅ Done criteria
- `codex --version` prints a version number (no error).
- You sign in successfully via *Sign in with ChatGPT*.
- Codex reads the directory and describes it back — proving the agent **actually reads the repo**, rather than just chatting.
:::

### Exercise 2 — `AGENTS.md` + a bug fix with a test (≈30 min)

**Goal:** experience the *read → write test → run → fix → green* loop.

1. Go into a small repo of yours (or create a sample project with 1 function + 1 bug).
2. Create `AGENTS.md` at the root (template in section 03, with build/test commands matching your project).
3. Open a session and hand it the work in plain language:

```bash
codex
# "The parseDate function is parsing dd/MM/yyyy wrong. Write a test that
#  reproduces the bug, then fix the code so the test passes. Don't add new dependencies."
```

::: details ✅ Done criteria
- Codex **reads** the correct file containing the function on its own (thanks to `AGENTS.md` pointing the way).
- There's a **new test** that reproduces the bug, and it **passes** after the fix.
- You **review the diff** before applying (with approval set to `on-request`).
:::

### Exercise 3 — `codex exec` for an automated step (≈20 min)

**Goal:** run Codex **non-interactively**, as a step in a script/CI.

```bash
codex exec "write unit tests for src/utils/date.ts and make them pass"
echo "Exit code: $?"
```

::: details ✅ Done criteria
- The command runs **without you typing anything** in the middle.
- A new test is created and run.
- You understand the difference: `codex exec` fits **automation**; an interactive session fits work that **needs diff review**.
- *(Optional advanced):* try handing the same task to **Codex Cloud** ([chatgpt.com/codex](https://chatgpt.com/codex)) and compare — Cloud returns a **PR**, and your local machine stays free.
:::

---

## 07 · Case studies & real use-cases (from the community)

This section collects **real experiences** of companies and developers with Codex (2026 context). Read it alongside two caveats:

::: warning ⚠️ Read the numbers correctly
- The **enterprise** figures below mostly come from **OpenAI's official pages/announcements** → trustworthy as to source, but they're "vendor-published numbers" with no independent verification.
- The **community** figures/anecdotes (Hacker News, Reddit) are real developer experiences but are **anecdotal** — true for the teller, not generalizable to everyone.
- Some **technical limitations** described here reflect the 2025–early-2026 period and **may well have changed** — always read them with the date attached. See the SOURCING NOTE at the end of the section.
:::

### 7.1 · Enterprise case studies (OpenAI's official numbers)

**① Cisco — rolling out Codex across the entire engineering org**
- *Context:* a very large engineering org with long review/release cycles.
- *What they did:* deployed Codex org-wide, using it for **code review** and to speed up the development cycle.
- *Result:* ~**50%** reduction in code-review time; project timelines compressed "from weeks down to a few days."
- *Takeaway:* at a large enterprise, Codex's biggest value is often **not** "writing new code" but **shortening review and iteration loops**.
- *Source:* OpenAI — https://openai.com/codex/ (OpenAI-published figures).

**② Duolingo — faster onboarding + reduced review time**
- *Context:* hiring heavily, new engineers needing to ramp up fast on a large codebase.
- *What they did:* used Codex to **understand the codebase**, **generate tests**, and **open PRs**.
- *Result:* new engineers ramped ~**25%** faster; (median) review time fell ~**67%**; PR volume rose ~**70%**.
- *Takeaway:* Codex shortens the codebase-familiarization curve — a strong lever for teams hiring lots of people.
- *Source:* OpenAI — https://openai.com/codex/ (OpenAI-published figures).

**③ Superhuman — letting PMs make light code fixes, engineers just review**
- *Context:* a product team with lots of small repetitive jobs (test coverage, failing integration tests).
- *What they did:* Codex handles the small/repetitive tasks; more importantly — it **lets Product Managers contribute light code changes**, with engineers only stepping in at the **code-review** stage.
- *Result:* faster shipping; engineers freed from grunt work.
- *Takeaway:* a notable org pattern — "**non-engineers contribute light code + engineers only review.**"
- *Source:* OpenAI — https://openai.com/codex/ (official).

**④ OpenAI using it internally (dogfooding)**
- *Context:* OpenAI's own engineers.
- *What they did:* used Codex weekly across CLI/IDE/cloud/review.
- *Result:* ~**95%** of OpenAI engineers use Codex weekly; this group **merges ~70% more PRs/week** since adopting it. The model blog also notes devs completing tasks ~**55%** faster and **time-to-merge ~50%** faster.
- *Takeaway:* the KPI they chose to demonstrate impact is **"PRs merged/week,"** not "lines of code."
- *Source:* OpenAI "Building more with GPT-5.1-Codex-Max" — https://openai.com/index/gpt-5-1-codex-max/ (official).

::: details 🚗 Bonus case — Kodiak (self-driving): Codex for tooling & refactoring
- *Context:* developing the "Kodiak Driver" (autonomous driving), complex and **safety-critical** code.
- *What they did:* used Codex to **write debugging tools**, **increase test coverage**, and **refactor** — NOT to automate the critical parts.
- *Result:* accelerated development of the core technology (qualitative, no published %).
- *Takeaway:* even a safety-sensitive domain uses Codex, but limits it to **tooling/refactoring** around the core rather than replacing humans on the high-risk parts.
- *Source:* OpenAI — https://openai.com/codex/ (official, qualitative).
:::

### 7.2 · Individual-developer case studies (real anecdotes)

**⑤ Jason Liu — running 5 Codex "agents" in parallel as a personal operating system**
- *Context:* an independent developer/consultant wanting to run many work streams in parallel.
- *What he did (very concrete):*
  - Keeps **5 pinned threads** (Chief of Staff, Agents SDK, OpenAI CLI, Codex-for-open-source, Twitter tracking), switching fast with `Command-1` … `Command-9`.
  - Stores top-level instructions in an `AGENTS.md` inside an Obsidian vault (structured as `TODO.md`, `people/`, `projects/`, `agent/`, `notes/`), **synced to GitHub** to review via diff.
  - **Voice input** (Wispr Flow): pushes rough thoughts to the agent instead of typing them out neatly.
  - **Mid-run "steering":** interjects short messages while the agent is running rather than waiting for it to finish:

```text
make this smaller
fix the spacing
open a PR
```

  - **Periodic "heartbeats":** the Chief-of-Staff scans Slack/Gmail **every 30 minutes** and drafts replies; an animation-feedback loop scans Slack **every 15 minutes** and re-renders; a support check runs **every 5 minutes** (then every minute once the agent engages).
  - **Frequently used connectors:** `$slack`, `$gmail`, `$calendar`, `$browser`, `@chrome`, `@computer`; artifacts in the side panel (HTML/CSS/JS, Storybook, Remotion, Slidev, Streamlit).
- *Result/trade-off:* long threads **cost more** due to cache-misses when coming back, but he judges the continuity worth it (the post gives no specific token/time-saved numbers).
- *Takeaway:* Codex in 2026 isn't just a "coding agent" but a background **"personal ops" system**; the two biggest levers are **`AGENTS.md`** and **mid-run steering**.
- *Source:* Jason Liu's blog "Codex-maxxing" — https://jxnl.co/writing/2026/05/10/codex-maxxing/ (concrete personal experience).

**⑥ "7 small-to-medium PRs before lunch" — the multi-rollout technique**
- *Context:* a developer on Hacker News running many tasks in parallel with Codex Cloud.
- *What he did (a real trick):* run **MANY rollouts of the same prompt in parallel**, pick the best one, then refine the prompt toward what worked. Applied to: batch updates across many repos (README/format/link fixes), small CSS fixes, API munging, generating tests from an existing pattern.
- *Result:* one commenter reported "**landed 7 small-to-medium PRs before lunch**"; a ~**40–60%** success rate on small tasks is considered "pretty good"; large tasks needing deep thought **drop noticeably**.
- *Takeaway:* Codex shines at **"a swarm of small parallel jobs"** more than at one large task requiring deep reasoning.
- *Source:* Hacker News "OpenAI Codex hands-on review" — https://news.ycombinator.com/item?id=44042070 (real developer anecdote).

### 7.3 · Concrete use-cases (grouped)

A roundup from the official use-cases page (https://developers.openai.com/codex/use-cases) and Hacker News:

| Group | What Codex can do (real examples) |
|---|---|
| **Engineering** | Review PRs on GitHub, understand large codebases, refactor, run code migrations |
| **Front-end** | Build responsive UI from a design/prompt, fine-tune UI details, Figma→code, build a game that runs in the browser |
| **iOS / macOS** | Scaffold an app shell, write native SwiftUI, add App Intents, debug in the iOS simulator |
| **Data & Analysis** | Clean messy data, query tabular data, analyze datasets/reports (including annotating scRNA-seq for life sciences) |
| **Quality & Security** | Auto-triage bugs, security scanning, remediate vulnerabilities, deep security scans |
| **Workflow / Automation** | Kick off coding tasks from Slack, turn feedback into action, build internal apps, "set up a teammate" |
| **Beyond coding (new in 2026)** | Manage your inbox (find important emails + draft replies in your voice), drive your Mac (click/type/navigate apps), "follow a goal" for long-running work |

::: details 🔐 Large-scale security use-case (with numbers)
One campaign using Codex to **scan 1.2 million commits** surfaced **10,561 high-severity bugs**. This illustrates the "security scan at scale" direction — but remember that automated findings still need humans to **triage and confirm** before patching.

*Source: The Hacker News — https://thehackernews.com/2026/03/openai-codex-security-scanned-12.html*
:::

A personal anecdote (Hacker News): someone had Codex build an entire "**normalization pipeline + tax computing engine**" to help with taxes — but stressed they had to **cross-check/verify** a lot, never trusting the output blindly.

### 7.4 · Community tips & tricks (distilled)

::: tip ✅ 8 tips from real developers
1. **Treat `AGENTS.md` as a "behavior switch"** — put top-level instructions in it + ask the agent to **record what it learns** (Jason Liu; Hacker News).
2. **Steer mid-run instead of trying to write the perfect prompt** — interject short commands ("make this smaller," "open a PR") while the agent is running (Jason Liu).
3. **Multi-rollout the same prompt** → pick the best one → refine the prompt toward what worked (Hacker News).
4. **Keep control of the architecture:** don't say "build me an app"; hand it **stub code** and let the agent **fill in the `TODO`s** (Hacker News).
5. **Require a design doc/spec before handing it a big job** — handing over "raw requirements" tends to produce poor results (Hacker News).
6. **Use complementary multi-model setups:** brainstorm the big ideas with one model (e.g. Claude/Opus), let Codex/GPT handle the **detailed implementation**; have each model **cross-review** since they catch different classes of bugs (Hacker News; Reddit roundup).
7. **Pipe the diff to Codex for review** right inside another tool's workflow (Reddit roundup; dev.to).
8. **Periodic heartbeats/automation** (scanning Slack/Gmail by the minute) to run Codex in the background like an ops assistant; **sync `AGENTS.md`/your vault to GitHub** to see via diff what "the agent remembered/changed" (Jason Liu).
:::

### 7.5 · Real complaints & traps (both sides)

::: warning 🚨 What developers gripe about
- **Overreach in full-auto:** give the CLI full permissions and it "rewrites a large amount of code that's hard to follow"; it tends to propose out-of-scope work (Reddit roundup; Hacker News).
- **Subtle technical debt:** making a field nullable just to clear a compiler warning → breaking data integrity; writing duplicate functions; picking wasteful approaches (Hacker News).
- **Hallucinating with unfamiliar libs/frameworks:** won't admit "I don't know" and makes things up; some describe it as "like a bad junior dev" (Hacker News).
- **Environment constraints (early cloud version, may have changed):** no access to git upstream, no pulling new dependencies, no Docker/containers, no internet → hard to test AWS / use web search; each iteration having to **open a new PR** is clunky (Hacker News).
- **Needs a lot of human-in-the-loop for complex data tasks:** one team recounts constant "prompt-nudging," taking ~**3 days** to get a so-so result (Hacker News).
- **Lacking MCP + hitting "context pruning" in long sessions** (Reddit roundup — note this state may have changed over time).
- **Platform/UX (early stage):** macOS-only at one point, missing Linux/Windows; indeterminate wait times for results; reasoning hidden by default (Hacker News).
- **Long-thread cost:** returning to an old thread causes a **cache-miss** → more tokens spent (Jason Liu).
- **Security risk when granting full system access:** **prompt injection via PDF/email** is a recurring worry (Hacker News).
- **Quality comparison (both ways):** many praise Codex for "carefully hunting bugs"; but others (especially on complex data/extraction tasks) find it **loses to Claude** and needs more hand-holding (Hacker News).
:::

### 7.6 · Threads worth reading further

- "OpenAI Codex hands-on review" — Hacker News — https://news.ycombinator.com/item?id=44042070 (the "7 PRs before lunch" anecdote, cloud-limitation details).
- "Codex for almost everything" — Hacker News — https://news.ycombinator.com/item?id=47796469 (beyond-coding use-cases, the "stub code + let the agent fill the `TODO`s" tip).
- "Many of us prefer OpenAI's Codex…" — Hacker News — https://news.ycombinator.com/item?id=47667380 (why people pick Codex; `AGENTS.md` causing "huge behavioral changes").
- "I work at OpenAI (not on Codex) and have used it successfully…" — Hacker News — https://news.ycombinator.com/item?id=44043717 (an insider's perspective).
- "…a plea to not screw with the reasoning…" — Hacker News — https://news.ycombinator.com/item?id=46316606 (concerns about reasoning/model changes).
- Blog "Codex-maxxing" — Jason Liu — https://jxnl.co/writing/2026/05/10/codex-maxxing/ (the 5-parallel-agent workflow).
- "Claude Code vs Codex 2026 — What 500+ Reddit Developers Really Think" — DEV.to — https://dev.to/_46ea277e677b888e0cd13/claude-code-vs-codex-2026-what-500-reddit-developers-really-think-31pb (quotes sentiment from r/codex, r/ClaudeCode, r/ChatGPTCoding — **the survey numbers in the article are unverified against the original posts**).

::: details 🧾 SOURCING NOTE — read this to use the numbers correctly
- **Solid sources:** (a) OpenAI's official pages (the Cisco/Duolingo/Superhuman/Kodiak customer stories + internal numbers) and (b) Hacker News (a few real threads where developers recount concrete experiences). Every **OpenAI %** is a **"vendor-published number."**
- **X (Twitter): limited.** Only the @OpenAI research-preview launch post is firmly confirmed (https://x.com/OpenAI/status/1923416740073033873). No individual KOL thread is cited, to avoid fabricating @handles.
- **Reddit: indirect.** The r/codex, r/ClaudeCode, r/ChatGPTCoding sentiment here comes **via a roundup** (DEV.to, etc.), NOT links to the original posts. The survey figures (like "65.3% lean Codex") are stated by that roundup and are **unverified** → treat them as low-confidence reference, not hard fact.
- **Possibly outdated parts:** the early cloud-version limitations (no Docker/no internet/having to open a new PR each iteration, macOS-only, missing MCP) reflect 2025–early 2026 and **may well have changed** — always read them with the date attached. Model names (o3 fine-tune → GPT-5.1/5.2-Codex-Max → GPT-5.5/5.6) change very fast; re-check if you need an exact version.
:::

---

## 08 · Summary & official sources

::: tip 📌 4 things to take away
1. Codex 2025–2026 is a **multi-surface coding agent** (Rust CLI / Cloud / IDE / app) — **not** autocomplete, and **not** the old 2021–2023 Codex model.
2. The easiest way in: install the CLI → **Sign in with ChatGPT** (Go/Plus plan) — ChatGPT comes bundled with Codex.
3. `AGENTS.md` + **the right `approval_policy`/`sandbox_mode`** are the two things that determine whether the agent works correctly and safely.
4. **CLI/IDE** for quick fixes with diff review; **Codex Cloud** for heavy/long-running work that returns a PR; **`codex exec`** for automation.
:::

::: details 📚 Official reference sources
- Product page: https://openai.com/codex/
- Developer docs: https://developers.openai.com/codex/
- Pricing: https://developers.openai.com/codex/pricing
- Changelog: https://developers.openai.com/codex/changelog
- Configuration: https://developers.openai.com/codex/config-basic · https://developers.openai.com/codex/config-reference
- MCP: https://developers.openai.com/codex/mcp
- AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Security & command approvals: https://developers.openai.com/codex/security · https://developers.openai.com/codex/agent-approvals-security
- Model list & default model: https://developers.openai.com/codex/models
- Permissions (permissions/sandbox): https://developers.openai.com/codex/permissions
- CLI source code: https://github.com/openai/codex
- Codex Cloud: https://chatgpt.com/codex
- Rate card & using it with your ChatGPT plan: https://help.openai.com/en/articles/20001106-codex-rate-card · https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Prompt injection / GitHub-token-leak CVE (BeyondTrust): https://www.beyondtrust.com/blog/entry/openai-codex-command-injection-vulnerability-github-token
- Introducing Codex: https://openai.com/index/introducing-codex/
- ChatGPT Go expansion across Asia (incl. Vietnam): https://techcrunch.com/2025/10/09/openais-affordable-chatgpt-go-plan-expands-to-16-new-countries-in-asia/
- ChatGPT Go price in Vietnam (132,000đ/month): https://e.vnexpress.net/news/tech/tech-news/openai-s-most-affordable-chatgpt-plan-now-available-in-vietnam-4949761.html
:::
