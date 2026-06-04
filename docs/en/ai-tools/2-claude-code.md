---
title: 'Claude Code — An autonomous AI developer in your terminal'
description: 'A hands-on guide to Anthropic Claude Code: agentic coding that edits multiple files & runs tests, CLAUDE.md, Skills, Subagents, Hooks, MCP. Install, pricing, access, step-by-step workflow and exercises.'
---

# Claude Code — An autonomous AI developer in your terminal

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">⌨️</p>

::: tip 🔥 Hands-on — 30 seconds
You get a familiar task: *"write tests for the login module, run them, fix whatever breaks."* Normally that eats half a day: read the code, guess the edge cases, write tests, run, red, fix, run again. With Claude Code you type a single sentence in the terminal — it reads the whole codebase, writes the tests, **runs** them, and when something fails it **fixes itself** and re-runs until green.
**💸 Real benefit:** you collapse several hours of manual work into a single prompt; instead of typing code line by line, you shift into a *review & approve* role — getting more done in the same day.
:::

> **"Claude Code is not a chat box that suggests code.**
> **It's an agent: it reads the repo, edits files, runs shell commands, works with git — and loops until it's done."**

::: tip 🎯 After this chapter you'll be **able to**
- **Install & launch** Claude Code on your machine (macOS/Linux/WSL/Windows) and sign in correctly.
- **Hand off real work**: fix bugs, add features, write tests — in natural language, letting it run and fix itself.
- **Set up project memory** with `CLAUDE.md` (via `/init`) so Claude follows your coding standards.
- **Use Plan mode** to see the plan *before* it touches any file — safe for large changes.
- **Keep context clean & cheap**: know when to `/clear`, `/compact`, and when to hand work to a **subagent**.
- **Pick the right plan** (Pro/Max/API) and avoid payment and 451 pitfalls.
:::

This is a tools chapter — you should read it with a terminal open and type along. Learning by hand sticks twice as well.

---

## 01 · What this tool is & when to use it

**Claude Code** is the **"agentic" (autonomous AI)** coding tool from **Anthropic**. Unlike a code-suggestion box, it **plans on its own, edits code across multiple files, runs tests, and fixes errors until it's done**. Concretely, it can:

- Read the **entire codebase** to understand context.
- **Edit files** directly on disk.
- **Run shell commands** (build, test, lint…).
- Work with **git** (commit, branch, open PRs).
- **Connect to external tools** via MCP.

Claude Code started as a **CLI in the terminal**. By 2026 it shows up on many "surfaces" but they all share one **engine**:

| Surface | Form |
|---|---|
| **Terminal CLI** | The `claude` command in your terminal |
| **VS Code / Cursor** | Extension |
| **JetBrains** | Plugin |
| **Desktop** | Standalone app |
| **Web** | `claude.ai/code` |

The key point: **they all share the same `CLAUDE.md`, the same settings, and the same MCP servers** — learn it once, use it everywhere.

::: warning 💡 Don't confuse "Claude Code" with similarly named things
- **Regular Claude chat** (claude.ai / app): just conversation — it doesn't edit files or run commands in your repo.
- **Claude Agent SDK**: an SDK for *building your own* agent on top of Claude Code's capabilities — not Claude Code itself.
- **Third-party IDEs that integrate Claude** (Cursor, Zed…): they use Claude models but are products from other companies.

Claude Code is **Anthropic's own first-party product**. URL: <https://code.claude.com> · docs: <https://code.claude.com/docs/en/overview> · web version: <https://claude.ai/code>.
:::

**When to use it?** When you have a real codebase and want to hand off *multi-step work that touches many files*: adding features, fixing hard bugs, writing/fixing tests, refactoring, paying down tech debt, security reviews. It shines exactly where typing line by line is slow but describing it in words is fast.

::: details 👉 Claude Code's "superpowers" (quick look; details in later sections)
- **Agentic coding** — plans on its own → edits multiple files → runs tests → fixes errors until done.
- **CLAUDE.md (Memory)** — a markdown file at the project root, loaded at the start of every session to set coding standards/architecture. In 2026 there's also *auto memory* that saves build commands and debug insights across sessions.
- **Skills** — package a repeated workflow into a `SKILL.md` under `.claude/skills/`, invoked via `/skill-name` or auto-triggered by Claude. Runs in the **same context** and only loads the body when needed, so it saves tokens (replacing the old "commands" concept).
- **Subagents** — spawn a separate Claude instance with its own context window, do a task (research/review), then return only a **summary** → keeps the main context clean; you can assign a cheaper model to grunt work.
- **Hooks** — scripts that run around the tool lifecycle/events (auto-format after each edit, lint before commit). This is **deterministic code** — no hallucination — used to **ENFORCE** behavior/safety.
- **MCP (Model Context Protocol)** — an open standard for connecting external data/tools: Google Drive, Jira, Slack, GitHub… reference a resource with `@server:resource`.
- **Plugins** — pre-packaged skills + hooks + subagents + tools for 1-click install, shareable across a team.
- **Automatic Git/PR** — stage changes, write commit messages, create branches, open PRs; integrates with GitHub Actions/GitLab CI and GitHub Code Review.
- **Plan mode** — reads files and proposes a plan, **without** editing files until you approve.
- **Headless/pipe** (`claude -p`) — runs non-interactively for CI, pre-commit, batch (Unix-style, reading stdin/stdout).
- **Agent teams + background agents** — many agents running in parallel with one lead orchestrating; watch multiple sessions from one screen.
- **Multi-surface & mobile** — Remote Control from your phone, `--teleport` to pull a task from web/iOS back to the terminal, `/desktop` to hand off a session, mention `@Claude` in Slack.
- **Scheduling** — Routines (run on Anthropic's infrastructure even when your machine is off), Desktop scheduled tasks (run on your machine), `/loop`, `/schedule`.
:::

---

## 02 · Install / Sign-up & access — pricing & access

### Is there a Free plan that works? — NO

This is the most time-wasting misconception. **Claude Code (terminal) REQUIRES a paid plan** — it's not on the Free tier. The Free plan only gives you **Claude chat** (web/app). To use Claude Code you need at least **Pro** or **API credits**.

### Pricing (subscription, 2026)

| Plan | Price | Notes |
|---|---|---|
| **Pro** | USD 20/month (~17 USD/month billed annually) | Works with Claude Code, with **limits** |
| **Max** | USD 100/month (≈5× Pro) | Heavier usage |
| **Max** | USD 200/month (≈20× Pro) | Very heavy usage |

Or pay by **API (pay-as-you-go)** via the **Anthropic Console** — billed per token:

| Model | Input (USD / million tokens) | Output (USD / million tokens) |
|---|---|---|
| **Opus 4.8** | ~5 | ~25 |
| **Sonnet 4.6** | ~3 | ~15 |
| **Haiku 4.5** | ~1 | ~5 |

::: tip 💸 Default model & how to pick a plan for your budget
*(Per Anthropic's official docs as of mid-2026 — the product changes fast; type `/model` in a session to see the model actually running.)*
- **Newest model:** **Claude Opus 4.8** (ID `claude-opus-4-8`) launched **2026-05-28** on claude.ai, the API, and Claude Code; pricing stays the same as the previous generation at **$5 in / $25 out**.
- **Default model:** Opus 4.8 is the **new default for Claude Code** on **Max, Team Premium, Enterprise pay-as-you-go and API** (defaulting to *high* effort). Lighter plans (Pro / Team Standard) default to **Sonnet 4.6** to conserve quota.
- **Effort control:** Opus 4.8 adds an `/effort` command to tune how "deep" it reasons (e.g. `/effort xhigh` for hard problems). Higher effort = better quality but **more tokens** — weigh it against task complexity.
- **Switch models mid-session:** type `/model` in a session to toggle between Opus / Sonnet / Haiku (e.g. drop to Sonnet/Haiku for small jobs to save money).
- **Trial API credits** are typically around **5 USD**.
- **The math:** if you use a lot (tens to hundreds of millions of tokens/month), **Max is far cheaper than the API** — one developer reported saving **~93%**.
- **A sensible path for learners:** start with **Pro at 20 USD/month** to learn → use `/init` + `CLAUDE.md` on a real project → gradually add Skills/Hooks/MCP/subagents → only move to **Max** when your usage gets heavy.
:::

### Where can you use it?

Claude Code is available wherever Anthropic offers Claude.ai and the API — check the supported-countries list at <https://www.anthropic.com/supported-countries>. To get started you simply:

- Subscribe to **Pro/Max** with an international card (**Visa/Mastercard**), or
- Create an **API key** in the **Anthropic Console**.

::: warning ⚠️ The 451 error — read carefully so you don't misread it
Some users (notably in regions routed through certain data centers) hit this error:
```text
451 Access to Anthropic models is not available from this data center (HKG)
```
This is a **ROUTING** issue through a specific data center (commonly seen when using Claude via a **third-party editor like Zed**), **not a country-level block**. When using **first-party Claude Code** (signed in with your Anthropic account) you usually **don't hit it**; if you do, check your network/VPN.
:::

::: tip 🌏 Note for Vietnam / SEA readers
The two *practical* frictions in this region are: (1) paying with an international card — make sure your Visa/Mastercard is enabled for international online payments; and (2) the occasional 451 routing error described above — it's a routing quirk, not a ban. Also handy: **a `CLAUDE.md` written in Vietnamese still works well** because Claude understands Vietnamese, even though the UI and docs are in English. So if your team prefers Vietnamese coding notes, keep them in Vietnamese.
:::

### Install (3 ways)

The **native installer is recommended**: it auto-updates and doesn't need Node.js.

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash
```

```bash
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

```bash
# macOS via Homebrew
brew install --cask claude-code
```

::: warning ⚠️ Install gotchas
- **Windows native:** install **Git for Windows** so Claude can use the **Bash tool**; without it Claude falls back to PowerShell. (With **WSL** you don't need this.)
- **Homebrew / WinGet builds do NOT auto-update** — you must run `brew upgrade` / `winget upgrade` manually. The native installer updates itself.
:::

---

## 03 · The hands-on workflow — step by step (with real commands/prompts)

Below is the standard loop from opening a project to shipping a PR. Open a terminal and type along.

**Step 1 — Enter the project directory & launch.** The first run will ask you to sign in (Pro/Max/Console):

```bash
cd your-project && claude
```

**Step 2 — Initialize project memory.** Run `/init` so Claude generates `CLAUDE.md` (coding standards, architecture, build commands):

```text
/init
```

**Step 3 — Ask questions to understand the code.** Use `@file` to embed content instead of waiting for Claude to read it (tip: `@file` also pulls in the `CLAUDE.md` from that directory):

```text
give me an overview of this codebase
how is authentication handled?
Explain the logic in @src/utils/auth.js
trace the login process from front-end to database
```

**Step 4 — For big changes, turn on Plan mode first.** Plan mode reads files and **proposes a plan, WITHOUT editing files** until you approve. In a session press **Shift+Tab**, or launch directly:

```bash
claude --permission-mode plan
```

::: tip 📌 Real example — Boris Cherny (creator of Claude Code) always starts in Plan mode
**Context:** Boris Cherny, the creator of Claude Code, shares his daily personal workflow on Threads (@boris_cherny).
**What he does:** Most of his sessions start in **Plan mode (press Shift+Tab twice)**, he refines the plan until he's happy, then switches to auto-accept to let Claude run. He also runs **5 Claudes in parallel** in the terminal (tabs numbered 1–5, with system notifications on) and **5–10 Claudes** on `claude.ai/code`, using **git worktrees** to isolate files and avoid conflicts.
**Result:** he says he has *automated about 80% of his PR creation*; quality goes up because there's always a feedback loop to verify.
**Lesson:** *Plan-first → lock in a good plan → auto-accept* tends to produce "1-shot" results (done on the first try). Combining parallelism + worktrees + reusable slash commands is a classic productivity combo.
*Source: Boris Cherny on Threads (@boris_cherny) — https://www.threads.com/@boris_cherny/post/DTBVppIEkdE ; summarized at The Pragmatic Engineer.*
:::

**Step 5 — Hand off work in natural language.** Let Claude run the tests and fix itself until they pass:

```bash
claude "write tests for the auth module, run them, and fix any failures"
```

**Step 6 — Keep context clean when switching tasks.** Use `/clear` when changing tasks, `/compact` to compress history; hand heavy research to a subagent:

```text
/clear
/compact
use a subagent to investigate how our auth system handles token refresh
```

::: tip 📌 Real example — A solo dev uses `/clear` between subtasks + subagent review on a separate context
**Context:** A solo developer (10+ years of experience) maintains a **350k+ line** monorepo (PHP, TypeScript/React, React Native, Terraform, Python).
**What they do:** For each subtask they start with `/clear` and have Claude re-read an *"implementation overview"* file (instead of dragging the whole chat history along) to avoid context bloat. They built **3 separate code-review subagents** (backend / frontend / mobile) running in isolated contexts, and defined workflows like `/workflows:fast`, `/approved` (which triggers the review subagents and prepares a commit). They also wrote a custom MCP server connected to YouTrack so Claude can read issues itself.
**Result (git-history analysis Oct–Dec 2025):** NET source lines ~3,473/week (was ~2,125), NET test lines ~2,043/week (was ~434); an estimated **30–40% productivity gain** (~saving 1 week/month); **80%+ of code changes written by Claude Code** (with review). They needed the **Max 100 USD/month** plan because Pro runs out of limit in ~1 hour.
**Lesson:** Keep each subtask within **one context window**; prefer a `CLAUDE.md` tailored to your codebase over a set of generic subagents — *"generic prompts don't understand your codebase's specific patterns."*
*Source: DEV Community (Dzianis Karviha), 2025-12-24 — https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn*
:::

**Step 7 — Wrap up: commit or open a PR.**

```bash
claude "commit my changes with a descriptive message"
```

```text
create a pr for my changes
```

**Step 8 — Continue a later session.**

```bash
claude --continue        # continue the most recent session
claude --resume          # pick from a list (or type /resume in a session)
claude --from-pr 123     # reopen from a PR
```

### 03b · Headless mode (`claude -p`) — for CI / pipes

In the Unix tradition, `claude -p` runs **non-interactively**, reading stdin/stdout — great for CI, pre-commit, and batch jobs:

```bash
git log --oneline -20 | claude -p "summarize these recent commits"
```

```bash
tail -200 app.log | claude -p "Slack me if you see any anomalies"
```

```bash
git diff main --name-only | claude -p "review these changed files for security issues"
```

### 03c · Working in parallel with git worktrees

Open a separate session on a separate **git worktree** to do several things at once without stepping on each other:

```bash
claude --worktree feature-auth
```

### 03d · A few in-session commands worth remembering

```text
/init      # generate CLAUDE.md
/clear     # clear context when switching tasks
/compact   # compress history when the conversation gets long
/resume    # pick a previous session
/schedule  # schedule a run
/loop      # repeat a prompt within a session
/model     # switch model mid-session (Opus / Sonnet / Haiku)
/effort    # tune reasoning "depth" (e.g. /effort xhigh) — Opus 4.8
```

::: tip 💡 Type `/help` to see the real commands for your version
The list of slash commands changes between versions. The most reliable list is always to type **`/help`** right in a session so Claude prints the exact commands for the current build — don't memorize a static list.
:::

::: tip 🖼️ Tip: use images to debug
Drag-and-drop an **error screenshot** into the window, then ask directly:
```text
Here is a screenshot of the error. What is causing it?
```
**macOS note:** when pasting an image into the CLI, use **Ctrl+V** (NOT Cmd+V).
:::

### 03e · Four extension layers — and what each one is for

This is the part that confuses people. Remember the principle: **right job, right layer**.

| Layer | What it is | Use when |
|---|---|---|
| **CLAUDE.md** | Memory loaded **every turn** | Rules that apply to **nearly every task** (coding standards, architecture) |
| **Skills** | `SKILL.md` under `.claude/skills/`, body **loaded only when invoked** | Workflows you use **occasionally** (PR review, changelog) |
| **Subagents** | Separate instance, **own context window**, returns a summary | **Research/reading many files**, grunt work (assign a cheap model) |
| **Hooks** | **Deterministic code** running around tool/lifecycle events | Things you must **ENFORCE** (block dangerous commands, force lint/format) |

→ Then **MCP** connects external data/tools (Drive, Jira, Slack, GitHub), and **Plugins** bundle all four layers above for 1-click install across a team.

### 03f · Runnable examples: Skill, Hook, MCP (read and type along)

Section 03e describes the concepts; below are **minimal** templates so you can try them right now. *(File syntax can change between versions — cross-check the docs in section 09.)*

**① A minimal `SKILL.md`** — place it at `.claude/skills/changelog/SKILL.md`:

```markdown
---
name: changelog
description: Generate a changelog entry from unreleased commits.
---

When invoked:
1. Run `git log` to get commits since the latest tag.
2. Group them by Added / Fixed / Changed.
3. Write a concise changelog entry following the Keep a Changelog convention.
```

Invoke it with `/changelog` in a session, or let Claude auto-trigger it when it fits the context. The body loads **only when invoked**, so it doesn't cost tokens every turn.

**② An auto-format Hook** — in `.claude/settings.json`, run a formatter **after each time Claude edits a file** (this is *deterministic code*, no hallucination):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATHS" }
        ]
      }
    ]
  }
}
```

**③ Add an MCP server** — e.g. connecting the filesystem; project-level config lives in `.mcp.json` (commit it to git so the whole team shares it):

```bash
# Add quickly via the CLI
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ./

# Check the status of configured servers
claude mcp list
```

Once added, reference a resource in a prompt with the `@server:resource` syntax.

::: tip ⌨️ Two shortcuts worth remembering
- Type **`#`** at the start of a line in a session to **quickly jot a note into `CLAUDE.md`** (memory shortcut) — handy when you spot a rule you want Claude to remember long-term.
- Need JSON for a pipeline/CI: use **`claude -p "..." --output-format json`** to get machine-readable output instead of plain text.
:::

---

## 04 · Tips & common mistakes

### High-value tips (you'll feel the difference immediately)

::: tip ✅ 8 hands-on tips
1. **CLAUDE.md for always-on rules; Skills for occasional workflows.** CLAUDE.md loads **every turn**, while a skill body loads **only when invoked** → move workflows into Skills to save tokens.
2. **If you find yourself pasting the same block of instructions into every new chat → turn it into a Skill right away.**
3. **Hand research/multi-file reading to a subagent** so you don't "flood" the main context (e.g. read 30 files but only get a summary back).
4. **Assign a cheap/fast model (Haiku) to subagents doing grunt work** (finding files, pulling API data, scanning logs), saving the strong model for the reasoning → cuts cost.
5. **For things that must be ENFORCED deterministically, use Hooks** — don't expect CLAUDE.md to "force" it; the model can work around it.
6. **Use `@file` / `@directory`** to embed content quickly instead of waiting for Claude to read it; `@file` also pulls in that directory's `CLAUDE.md`.
7. **High-risk changes → start in Plan mode**, review the plan, then let it edit disk.
8. **Ask Claude directly about itself** — it always has the latest docs:
```text
what are the limitations of Claude Code?
how do I use MCP?
```
Or type `/help` to see the command list for your running version.
:::

::: warning 📌 Real example — token bills can "spike" unexpectedly
**Context:** Many users report token costs jumping beyond expectations even when they think they're being careful.
**Details:** One person (Jenny Ouyang) recorded a bill of **~1,600 USD**; per the article, similar figures reported by the community weren't isolated cases. In March 2026 there was also a **prompt caching bug** that ballooned tokens **10–20×** with no warning — users had to reverse-engineer the binary to find it (GitHub issue #40524, *issue number per the cited source*).
**Why:** `CLAUDE.md` is loaded **every turn** — a 5,000-token file means you "pay" 5,000 tokens *before you type anything*, every turn, every session. All output from MCP/`read_file` (large JSON, multi-line logs) is **appended permanently** within a session, so message #40 "pays" for everything before it.
**Lesson:** Keep `CLAUDE.md` lean (50–100 lines); use `/clear` when switching tasks; for high volume, consider the **Max** plan instead of the API.
*Source: buildtolaunch.substack.com — https://buildtolaunch.substack.com/p/claude-code-token-optimization*
:::

### Common mistakes & how to avoid them

::: warning 🚨 9 traps people fall into
1. **CLAUDE.md bloats into a "process document"** → weighs down **every** session (wasting tokens every turn). Move the process parts into a **Skill**.
2. **Spawning a subagent for something that only needed a Skill** → adds overhead and unnecessary context isolation.
3. **Pasting ad-hoc instructions into chat** → not reusable; package them into a **Skill/CLAUDE.md**.
4. **Mixing up the layers' responsibilities** (putting routing logic in a subagent's system prompt instead of a hook; using CLAUDE.md to "force" instead of a hook) → this is the **main reason** setups get "messy".
5. **Assuming a Free plan can use Claude Code** → it can't; you need at least **Pro** or the API.
6. **The 451 error** caused by routing through a specific data center (**HKG**, common with third-party editors) → easy to misread as a "country block" even though the region is actually supported.
7. **Windows native missing Git for Windows** → Claude can't use the Bash tool and falls back to PowerShell (WSL doesn't need this).
8. **Homebrew/WinGet builds don't auto-update** → remember to run `brew upgrade` / `winget upgrade` manually.
9. **Using the API directly at high token volume is very expensive** → consider **Max** if you use a lot (can be ~93% cheaper).
:::

::: tip 🔑 One line to remember the 4 layers
Same goal of "making Claude do the right thing": if it's a **soft rule** → CLAUDE.md; if it's a **hard rule that must be obeyed** → Hook. Putting it in the wrong place is the root of most messy setups.
:::

---

## 05 · Exercises / mini-projects

Do them in order. Each has **clear success criteria** so you can check yourself.

### 🧪 Exercise 1 — Get set up & "get to know" a real repo (basic)

**Goal:** install Claude Code, open one of your projects, let it set up memory and explain the code.

1. Install per section 02, then:
```bash
cd your-project && claude
```
2. Run `/init` to generate `CLAUDE.md`.
3. Ask 2 questions to understand the code:
```text
give me an overview of this codebase
how is authentication handled?
```

::: details ✅ Completion criteria
- There's a `CLAUDE.md` at the project root (created by `/init`).
- You got an overview of the codebase + where auth is handled.
- (Reflect) You understand why `CLAUDE.md` is loaded at the start of every session.
:::

### 🧪 Exercise 2 — Hand off a "run until green" task + open a PR (core)

**Goal:** experience the *agentic* loop: write tests → run → fix errors itself → commit/PR. Use **Plan mode** for safety.

1. Turn on Plan mode to see the plan first:
```bash
claude --permission-mode plan
```
2. After approving the plan, hand off the work:
```bash
claude "write tests for the auth module, run them, and fix any failures"
```
3. Wrap up:
```text
create a pr for my changes
```

::: details ✅ Completion criteria
- You **saw the plan first** before any file was edited (Plan mode works).
- New tests were created, **actually run**, and Claude **fixed itself** until they passed.
- There's a PR (or commit) with a clear descriptive message.
- (If you slip) You know `claude --continue` to return to a session.
:::

### 🧪 Exercise 3 — Optimize context & cost with a subagent + headless (advanced)

**Goal:** practice "context discipline" and use `claude -p` in a pipe.

1. Hand a heavy research task to a **subagent** to keep the main context clean:
```text
use a subagent to investigate how our auth system handles token refresh
```
2. Switch to a different task → clear context:
```text
/clear
```
3. Use headless mode to review changes (without entering an interactive session):
```bash
git diff main --name-only | claude -p "review these changed files for security issues"
```

::: details ✅ Completion criteria
- The subagent returns a **summary** (instead of cramming 30 files into the main context).
- You used `/clear` at the right moment when switching tasks.
- The `claude -p` command runs **non-interactively** and prints results to stdout.
- (Reflect) When you should hand grunt work to a subagent assigned the **Haiku** model to save money.
:::

---

## 06 · Case studies & real use-cases (from the community)

This section gathers **real** Claude Code use cases from the 2025–2026 period, so you can see what the tool can do *at real scale* — and where it stumbles. The three "backbone" cases (Rakuten, Bun, the Claude Code team) have official sources + numbers + real names; the rest are for reference, and many of their numbers are **self-reported**, so they're clearly labeled.

::: warning ⚠️ Read the numbers correctly
- Revenue/productivity numbers self-published by individuals (indie hackers, dev blogs) are **not independently verified** — treat them as *"per their account"*.
- GitHub issue numbers (#40524, #11712) are taken *per the cited source*, so re-check them before quoting in formal documentation.
- One Hacker News figure later switched to a different tool (GPT-5.2 Codex) — so read it as an evolving experience, not one-sided praise for Claude.
:::

### 06a · The four most credible case studies (with named sources)

**① Rakuten — implementing a method deep in vLLM (12.5M lines), Claude ran 7 hours on its own**

- **Context:** Kenta Naruse (ML Engineer, Rakuten) had Claude Code implement *"activation vector extraction"* in **vLLM** — an open-source library of ~**12.5 million lines**, multi-language.
- **What he did:** Let Claude Code run autonomously. Per Naruse, he *"didn't write a single line of code in those 7 hours, just occasionally gave guidance."*
- **Result:** completed in **7 hours straight**, reaching **99.9% numerical accuracy** versus the reference method. At the organizational level, Rakuten reported a **79% reduction in time-to-market** (one feature went from 24 person-days to 5), a **97% reduction in critical bugs**, and shipping major releases every 2 weeks instead of quarterly. Yusuke Kaji (GM, AI for Business) described the approach: *run 5 tasks in parallel — hand 4 to Claude Code, do the remaining 1 yourself*.
- **Lesson:** Claude Code can take on deep technical work on a huge codebase **if the task is well-defined + there's a way to verify** (compare against a reference).
- *Source: Anthropic customer story (official) — https://claude.com/customers/rakuten*

**② Bun — porting the runtime from Zig to Rust with Dynamic Workflows (~750k lines, 11 days)**

- **Context:** Bun (a JS runtime) used the **Dynamic Workflows** feature to port its entire runtime from **Zig → Rust**.
- **What they did:** Claude wrote a JS orchestration script that *fanned out* to **16 parallel subagents** (up to 1,000 subagents/workflow), validating before returning results.
- **Result:** generated **~750,000 lines of code**, **99.8% of the existing test suite passing**, in **11 days**.
- **Lesson:** For broad migrations/refactors that are *"parallelizable"*, a fan-out workflow shrinks a full day's work to a few hours — but it needs high *effort* for the orchestrator to bother writing the script.
- *Source: Anthropic blog + InfoQ — https://claude.com/blog/introducing-dynamic-workflows-in-claude-code · https://www.infoq.com/news/2026/06/dynamic-workflows-claude-code/*

**③ The Claude Code team (Anthropic) builds it on itself — about 90% AI-written**

- **Context:** The Claude Code team itself *dogfoods* the tool to build the tool.
- **What they did:** Boris Cherny chose a tech stack that "doesn't need teaching" so Claude Code can build itself; every code change is an npm release.
- **Result:** **~90% of Claude Code is written by Claude Code itself**. Internal adoption: ~20% of engineering on day one, 50% after 5 days. When the team doubled in size it still saw **+67% PRs/engineer**; about **5 PRs/engineer/day** (~5× the norm); **60–100 internal releases/day**. Boris built **20+ to-do-list prototypes in 2 days**.
- **Lesson:** *Dogfooding* + tiny, super-frequent releases drives quality; *"giving Claude a way to verify its work raises quality 2–3×."*
- *Source: The Pragmatic Engineer (Gergely Orosz) interview with Boris Cherny — https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built*

**④ Solo dev — 350k+ line codebase, 80%+ of code written by Claude Code**

- **Context & result:** already summarized in the *"📌 Real example"* box in section 03 (Step 6). The core points: a 350k+ line multi-language monorepo, using self-defined workflows (`/workflows:fast`, `/workflows:full:*`, `/approved`), 3 review subagents on separate contexts, MCP connected to YouTrack; an estimated 30–40% productivity gain, 80%+ of changes written by Claude (with review).
- *Source: DEV Community (Dzianis Karviha) — https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn*

### 06b · Two cases from Hacker News (qualitative, no hard numbers)

**⑤ "All AI-generated code, multi-worktree"** — A developer on Hacker News describes a process of *"not typing a single line by hand"*: they feed the agent **user stories, test cases, designs, whiteboard photos** before it generates code; spawn multiple agents simultaneously per ticket across many worktrees; review → test → leave notes. They stress that the agent needs to *"see"* logs and test results to be autonomous. (Note: this person later switched to GPT-5.2 Codex.) **Lesson:** giving the agent *"observability"* (logs/tests) is the condition for running many things autonomously. *Source: HN thread #46410285 — https://news.ycombinator.com/item?id=46410285*

**⑥ "An auth bridge for an old monolith"** — A developer added an authentication *"shim"* + a new REST endpoint to an aging monolith — the kind of work that *"strays off the beaten path"*. They worked back and forth with Claude Code through several rounds until it ran; they considered the value received worth *"~20 USD/month."* **Lesson:** even off-standard work on a legacy system is feasible if you're willing to iterate. *Source: same HN thread #46410285.*

::: tip 💡 Two "self-reported" cases — read with caution
- **An indie hacker built a SaaS in ~2 days:** fed a business idea → Claude built the concept + first draft → they refined it; later built a *SaaS portfolio earning ~28k USD/month* (**figure self-published by the user**). Lesson: AI shrinks an MVP from weeks to days, but *product judgment, scope, distribution* are still human work. *Source: Indie Hackers.*
:::

### 06c · Concrete use-cases seen in the sources

- **Implementing deep algorithms/methods** in a large library, with a reference to compare accuracy against (the Rakuten case).
- **Broad migration/porting** (changing a runtime's language, refactoring whole modules) via subagent *fan-out* (the Bun case).
- **Auditing a whole codebase for a class of bug:** a full day's work cut to under 1 hour thanks to parallelism (Dynamic Workflows).
- **Generating + fixing code from an issue tracker:** connecting MCP to YouTrack/JIRA so Claude reads issues, comments, attachments itself.
- **Automated review with specialized subagents:** `code-reviewer`, `test-runner`, `frontend-qa`, `docs-maintainer`, `security-checker`, `migration-planner`.
- **Automating the PR loop:** commands like `/commit-push-pr`; tagging `@claude` on a colleague's PR to update shared guidelines.
- **Building prototypes in bulk** to test ideas (20+ in 2 days — the Claude Code team).
- **Data science:** data scientists running many Claude Code instances to generate queries + visualizations (an unexpected discovery by Anthropic).

### 06d · Tips & tricks from the community

::: tip 🧰 Patterns mentioned again and again
- **Plan-first:** start in Plan mode (Shift+Tab × 2), lock in a good plan, then auto-accept → often "1-shot" (Boris Cherny).
- **TDD is the strongest pattern:** write tests first, letting each *red → green* cycle be the "signal" for the agent to loop on its own without human intervention.
- **`CLAUDE.md` lean & layered:** keep it 50–100 lines, only things that apply broadly (it loads into the system prompt every session). Place nested `CLAUDE.md` files per module to add context automatically.
- **Shared `CLAUDE.md`, committed to Git:** the whole team contributes multiple times/week; whenever you hit a bug, add a line so *"Claude doesn't repeat it"* (Boris Cherny).
- **Subagents to save context:** the agent runs in its own context window and returns only a *summary* → keeps the main context clean. You must **explicitly say "use a subagent"**, e.g.:
```text
Use a subagent to review this code for security issues
```
- **Parallelism + git worktrees:** run 5–10 Claudes, isolate files with worktrees, number tabs + turn on system notifications.
- **`/clear` between subtasks** then re-read an *"implementation overview"* file instead of dragging the whole chat history.
- **Make a Skill for steps it often gets wrong:** when Claude repeats the same kind of error, package it into a dedicated skill.
- **High effort for orchestration:** with Dynamic Workflows, set it to the highest level; dropping to *medium* makes the orchestrator skip writing the script, losing the *fan-out*.
- **Use the filesystem as memory:** write the plan to a `.md` file for the agent to reference, instead of stuffing the content into context (saves tokens).
:::

### 06e · Real complaints & traps (so you're not surprised)

::: warning 🚨 Where Claude Code tends to stumble at real scale
- **Unexpected token bills** and the **prompt caching bug (3/2026)** that ballooned tokens 10–20× with no warning — see the *"📌 Real example"* box on tokens in section 04.
- **"Tear it down and redo it" on large codebases:** a few HN devs say most of what Claude wrote eventually *"had to be torn out and redone"*; when the code gets big enough, Claude sometimes breaks working code, makes no progress, and *"tends to write duplicate logic"* instead of reusing existing code. *(HN #46410285)*
- **Hallucinated APIs:** one HN dev says Claude generated wrong JSONRPC and invented non-existent Python functions while working with the Kanboard API, *even with docs available*. *(HN #46410285)*
- **Explore & Plan subagents do NOT auto-load `CLAUDE.md` + git status:** if you need a rule to reach that specific subagent (e.g. *"ignore the vendor/ directory"*) you must restate the rule in the prompt when delegating.
- **A resumed subagent may "fix" wrong parameters:** e.g. silently changing `BANANA-123` to `APPLE-123` when it has to infer the user's original intent; there's a *"Subagent Resume Missing All User Prompts"* bug. *(GitHub issue #11712, issue number per the cited source — https://github.com/anthropics/claude-code/issues/11712)*
- **Worry about "losing skills/thinking":** some argue *writing code is a way of thinking* — letting the LLM do it all means missing the chance to catch design flaws. (This is an opinion, not a bug.)
- **Security/blind trust:** some writing warns about the risk of over-trusting automation — don't auto-approve everything by default.
:::

### 06f · Threads worth reading further

| Title | Source |
|---|---|
| "Claude Code creator says Claude wrote all his code for the last month" | https://news.ycombinator.com/item?id=46410285 |
| "Getting good results from Claude Code" | https://news.ycombinator.com/item?id=44836879 |
| "Claude Code is all you need" | https://news.ycombinator.com/item?id=44864185 |
| "How Claude Code is built" (Pragmatic Engineer) | https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built |
| "Introducing dynamic workflows in Claude Code" (Anthropic) | https://claude.com/blog/introducing-dynamic-workflows-in-claude-code |
| Boris Cherny's Plan mode post series (Threads) | https://www.threads.com/@boris_cherny/post/DTBVppIEkdE |
| "Integrating Claude Code into production workflows" (DEV) | https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn |

::: details 🔎 Source notes (transparency on reliability)
- **The most credible backbone:** Rakuten/vLLM (Anthropic official), Bun Zig→Rust (Anthropic + InfoQ), dogfooding via the Boris Cherny interview (Pragmatic Engineer). The solo-dev 350k-line case (DEV) is very detailed on real commands/config.
- **Boris Cherny's Threads** is a primary source from the creator himself (handle + URL are real).
- **Reddit:** not accessible while writing this material, so **no specific Reddit username/post is quoted**; the "community reports high token bills" part only speaks generally per the cited Substack article.
- **Hacker News:** accessible; content taken from thread #46410285. Other threads are only listed by URL.
- **GitHub issues (#40524, #11712):** came from search, **not opened directly issue by issue** — treat the numbers as "per the cited source".
- **The group to be cautious about:** the indie hacker revenue (~28k USD/month) is self-published; the "10×/0.8 productivity" metrics in dev blogs are qualitative/marketing.
:::

---

## 07 · Security & where your data goes

You're handing **your real codebase** to a cloud service — so you need to know where the data goes **before** you paste in a client's code. The section below follows Anthropic's published policy (consumer terms 2025-08-28, privacy center) as of mid-2026; policies can change, so re-check the links in section 08.

::: warning 🔒 The make-or-break distinction: consumer vs commercial plans
| | **Consumer** (Free / Pro / Max — signed in to claude.ai) | **Commercial** (API key / Team / Enterprise / Bedrock / Vertex) |
|---|---|---|
| **Does Anthropic train on your code/prompts?** | **YES — on by default** (since the 2025-08-28 update). You must **opt out yourself**. | **NO** training on your code/prompts. |
| **How long is data kept?** | **5 years** if training is left on; **30 days** if you opt out. | API logs kept **~7 days** (since 2025-09-14), not used for training. |
| **Where do I turn off training?** | `claude.ai/settings/data-privacy-controls` | Not applicable (no training by default). |

**Practical takeaway:** if you work on **sensitive / client / NDA code**, you should run Claude Code via an **API key (commercial terms)** rather than a consumer Pro/Max plan — because commercial **does not train** on your data by default. This is a difference very few people notice.
:::

::: warning 🚫 Never paste these into a consumer session
- **Secrets:** API keys, tokens, passwords, `.env` file contents, private keys.
- **Customer PII:** real users' names/phone numbers/emails/ID numbers/personal data.
- **Legally bound code:** NDA projects, a client's proprietary source.

Technical tip: add `.env` and secrets directories to `.gitignore` and configure **permissions** in `.claude/settings.json` to stop Claude from accidentally reading/running them. You can point the endpoint/commercial key via the `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` environment variables.

**Privacy regulations:** if you operate under a data-protection regime (GDPR in the EU, or similar national privacy laws), note that processing personal data through a third-party AI service may carry legal obligations — keep real customer PII out of these sessions.
:::

::: tip 🛡️ Permissions — don't auto-approve everything
Claude Code asking for confirmation before editing a file/running a command is a **safety feature, not an annoyance**. Don't enable global auto-approve on an unfamiliar codebase. Fine-grained permission config (allowed commands, readable files, selective auto-approve) lives in `.claude/settings.json`. For high-risk changes, use **Plan mode** (section 03, Step 4) to see the plan *before* it touches disk.
:::

---

## 08 · Versus other tools — when NOT to use it

### Versus other CLI agents

Claude Code isn't the only option. The table below compares it objectively with comparable competitors developers often weigh *(characteristics as of mid-2026, may change)*:

| Tool | Vendor | Software | Pricing model | Model-locked? |
|---|---|---|---|---|
| **Claude Code** | Anthropic | **Closed** (proprietary) | Needs Pro/Max **or** API tokens | Claude models only |
| **OpenAI Codex CLI** | OpenAI | **Open source** | A ChatGPT plan **or** API tokens | OpenAI models |
| **Gemini CLI** | Google | **Open source** | **Generous free tier** + API tokens | Gemini models |
| **Aider** | Community | **Open source** | **Free software** — you pay tokens for the model you choose | **Multi-model** (Claude/GPT/Gemini/local…) |
| **Cursor** | Anysphere | **Closed** (IDE) | Limited free tier + paid plans | Multi-model |

**Read the table correctly:** this chapter stresses "Claude Code has no Free plan", but **not the whole market requires paying for the software** — **Aider and Gemini CLI have free software** (Aider only charges for the model tokens you use; Gemini CLI has a generous free tier). What you pay for with Claude Code is **Anthropic's plan/credits**, and in return you get a first-party product, deep integration, and Claude models.

::: tip 🤔 When to consider a competitor
- **Want free / maximum token control, multi-model:** → **Aider** (open-source, bring-your-own-key).
- **Want a generous free tier to learn, Google ecosystem:** → **Gemini CLI**.
- **Already pay for ChatGPT Plus, prefer the OpenAI ecosystem:** → **Codex CLI**.
- **Want AI right inside the IDE as autocomplete + chat:** → **Cursor**.
- **Want the strongest autonomous agent on a large codebase, first-party integration + Skills/Hooks/MCP:** → **Claude Code** (exactly this chapter's strength).
:::

### When NOT to use Claude Code

::: warning 🛑 Real boundaries — don't "use a sledgehammer to swat a fly"
- **A 1–2 line task / a small fix in one place:** opening an editor and typing it by hand is faster than the time Claude takes to read the context.
- **A codebase too large with no way to verify** (no tests, no reference to compare against): Claude can easily "break working code" or write duplicate logic — see section 06e.
- **No control over token cost:** there have been ~1,600 USD bill cases (section 04). If you're not yet used to managing context, start with the **Max** plan (fixed price) instead of the API.
- **Need deep design thinking / architecture decisions:** writing code is also a way of thinking — handing it all to an LLM can mean missing design flaws. Use Claude to *execute*; you still *steer* the design.
- **Domains where the model often hallucinates APIs:** with less-popular libraries/APIs, Claude may invent functions that don't exist (section 06e) — verify carefully.
:::

::: details ❓ FAQ & common errors (operations)
*(Reference the official error reference in section 09; type `/help` in a session to see the commands for your exact version.)*

**Q: I type `claude` and get "command not found".**
→ The command isn't on your **PATH** yet. Open a new terminal (the installer usually adds PATH for new shells), or recheck the install step in section 02. The native installer handles PATH itself; if it still fails, re-login to your shell.

**Q: Mid-work I get a session-expired / auth error.**
→ Your session token expired. Type **`/login`** in a session to sign in again (or exit and rerun `claude`).

**Q: The Pro plan runs for ~1 hour then hits the rate limit.**
→ Correct — heavy use exhausts Pro quickly (see the case in section 03, Step 6). Watch your usage and consider moving to **Max**. When limited, wait for the reset window or switch to an **API key**.

**Q: Claude broke a file — how do I roll back?**
→ Press **`Esc`** to stop Claude mid-run. Since changes are on disk/git, use **`git checkout -- <file>`** (or `git restore`) to recover an uncommitted file. To continue the previous session, use `claude --continue`.

**Q: My MCP server connection fails.**
→ Check the server's launch command in the config (`claude mcp list` to see status). A wrong binary path, a missing environment variable, or a server crash are common causes — see section 03f on adding MCP.

**Q: My token bill jumped unexpectedly.**
→ `CLAUDE.md` loads **every turn** + MCP/file-read output is appended permanently within a session. Keep `CLAUDE.md` lean (50–100 lines) and `/clear` when switching tasks — see the token box in section 04.

**Q: My install doesn't auto-update.**
→ The **Homebrew/WinGet** build doesn't auto-update — run `brew upgrade` / `winget upgrade` manually. The native installer updates itself.
:::

---

## 09 · Summary & official sources

::: tip 📌 5 things to take away
1. Claude Code = **Anthropic's first-party coding agent** — reads the repo, edits files, runs commands, does git; loops until done.
2. **No Free plan** for Claude Code: at minimum **Pro 20 USD/month** or the **API**. For heavy use, **Max** is much cheaper than the API. (Competitors like **Aider/Gemini CLI** have free software — see section 08.)
3. **Access is broad** wherever Anthropic offers Claude. The 451 (HKG) error is a *routing* issue via third-party editors, not a ban.
4. Standard flow: `/init` → ask to understand the code → **Plan mode** for big changes → hand off work → `commit`/`pr`.
5. Extend at the right layer: **CLAUDE.md** (always-on rules) · **Skills** (occasional workflows) · **Subagents** (research, keep context clean) · **Hooks** (deterministic ENFORCE) · **MCP/Plugins** (connect & bundle).
6. **Security:** consumer plans **train by default** on your code; sensitive/client code should run via an **API key (commercial)** — see section 07.
:::

The product changes very fast — when this material gets outdated, use the official links below to update yourself:

| Topic | Official link |
|---|---|
| Overview & docs | <https://code.claude.com/docs/en/overview> |
| Pricing | <https://platform.claude.com/docs/en/about-claude/pricing> |
| Security | <https://code.claude.com/docs/en/security> |
| Privacy / data | <https://privacy.claude.com/en/articles/10023555> |
| Consumer terms updates | <https://www.anthropic.com/news/updates-to-our-consumer-terms> |
| Error reference | <https://code.claude.com/docs/en/errors> |
| Supported countries | <https://www.anthropic.com/supported-countries> |
| Release notes | <https://support.claude.com/en/articles/12138966-release-notes> |

> *This chapter is based mainly on the official `code.claude.com` docs (model reference up to **Opus 4.8 — 05/2026**). The product updates fast — features/pricing/model names may have changed; when in doubt, type `/model` to see the actual model, ask Claude directly `what are the limitations of Claude Code?`, or check the official sources in the table above.*
