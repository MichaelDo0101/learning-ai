---
title: 'Hermes Agent — A Self-Hosted AI Assistant That Has Memory and Learns You'
description: 'Hands-on guide to Hermes Agent (Nous Research): an MIT open-source agent you self-host on a VPS or your own machine, with memory that persists across sessions, auto-generated skills, and 20+ messaging platforms. Install with one command, run it 100% FREE with Gemini OAuth or Ollama — great for anyone learning AI in 2026.'
---

# Hermes Agent — A Self-Hosted AI Assistant That Has Memory

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🪽</p>

::: tip 🔥 Hands-on — 30 seconds
It's 8 AM and you haven't even opened your laptop when Telegram pings: *"Your repo got 3 new issues overnight, 1 urgent (CI is broken). Summary + fix suggestions below."* — That's **Hermes Agent**, running on the $5/month VPS you set up, online around the clock, remembering exactly which project you're working on, and **sending you reports** through the channel you actually use.
**💸 The real payoff:** an AI assistant that *has memory + runs 24/7 + schedules itself*, with software that's **free** (MIT) — you only pay for tokens (or $0 if you use a free tier). That's something the web version of ChatGPT simply can't do.
:::

> **Hermes Agent is NOT a copilot stuffed inside an IDE, and it is NOT a chatbot wrapping a single API.**
> **It's an "autonomous agent" you install on your own machine, leave running forever, that remembers everything and understands you better the more you use it — "the agent that grows with you".**

::: tip 🎯 After this chapter you'll be able to
- **Install Hermes Agent** on macOS/Linux/WSL2 with **one command**, then pick a model to run **100% FREE**.
- **Chat with the agent** in the TUI and **resume an old session** to see persistent memory working with your own eyes.
- **Connect the agent to Telegram/Discord** to command it from your phone.
- **Understand the 3-layer memory + auto-generated skills** — and know when *not* to trust them.
- **Pick the right provider** (no international card required): Gemini OAuth or local Ollama.
- **Fix the 6 most common errors yourself** (command not found, 429, model not found, flaky gateway…).
:::

This is an **intermediate–advanced** tool: you need to be comfortable with the terminal/CLI and with Linux/WSL2. It's not a "click-and-go" app like ChatGPT — but in exchange, you own a genuine AI assistant of your own.

::: warning ⏳ Time marker
This document reflects what's known about Hermes Agent as of **mid-2026** (initial release 2026-02-25, most recent version referenced **v0.15.x — 2026-05-29**). The project moves **very fast** (hundreds of thousands of GitHub stars and a dozen-plus releases within a few months), so **commands/prices/providers/version numbers may have changed** by the time you read this. When in doubt, double-check the homepage, GitHub Releases, and the official docs in section 02 and section 07.
:::

---

## 01 · What this tool is & when to use it

**Hermes Agent** is an **open-source** AI agent (MIT license) released by **Nous Research** on **2026-02-25**. The core difference: it's a **self-hosted autonomous agent** — you install it on your own machine/VPS, and it:

- **Runs persistently** — it isn't there only while a tab is open and gone when you close it.
- **Remembers across sessions** (persistent memory) — it remembers your profile, preferences, and project conventions across restarts.
- **Creates its own "skills"** from experience — the more you use it, the better it understands you.
- Reaches you through the **CLI/TUI** and **20+ messaging platforms** (Telegram, Discord, Slack, WhatsApp, Signal…).

::: tip 🔑 The 3 pillars that make Hermes Agent
1. **Persistent memory** — real memory, loaded instantly every session, no retrieval latency.
2. **Self-improving (learning loop)** — it distills experience into reusable skills on its own.
3. **Multi-channel + self-hosted** — you drive it from any chat app, and your data lives on your own infrastructure.
:::

### Notable feature set

| Feature | What it does (why it matters) |
|---|---|
| **3-layer persistent memory** | 2 files always loaded each session: `USER.md` (your profile) + `MEMORY.md` (long-term context). Accessed **instantly**, with no retrieval latency. |
| **Self-improving / skills** | After a task finishes with **≥ 5 tool calls**, a background process summarizes the "trajectory" into **one Markdown skill file** (with YAML frontmatter). Skills are **searchable + shareable**, following the open **agentskills.io** standard. |
| **40+ built-in tools** | Web search, browser automation, vision, file read/write, running terminal commands… ready out of the box. |
| **Multi-platform messaging (20+)** | Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Email, SMS, **Feishu/Lark, WeCom**… through a single **gateway process**. |
| **Cron scheduler** | Schedule automations (e.g. send a GitHub-issues summary via Telegram at 8 AM) and deliver results to **any** channel. |
| **Subagents** | Spawn **isolated** child agents to run **multiple work streams in parallel**. |
| **6 terminal backends** | local, Docker, SSH, Singularity, Modal, Daytona — runs on a cheap VPS or serverless that's **near $0 when idle**. |
| **No model lock-in** | Switch provider/model with the `hermes model` command, **no code changes**. |

### When to use it / when not to

::: tip ✅ A good fit when
- You want a **persistent AI assistant with memory**, controlled from your phone via Telegram/Discord.
- You need **scheduled automation** (morning report, issue scan, news digest) delivered to a chat app.
- You want **full control + privacy**: run it 100% locally with Ollama, and your data never leaves the machine.
- You're fine with the **terminal/CLI** and have a cheap VPS (or a personal machine you keep on).
:::

::: warning 🚫 Not a fit yet when
- You want something **click-and-go** in the browser and dislike the terminal → ChatGPT/Claude on the web is much easier.
- You need a **copilot typing code right inside your IDE** (line-by-line suggestions) → that's Cursor/Copilot, not Hermes.
- You **have nowhere for it to run persistently** and don't need memory/automation → Hermes's biggest advantage goes to waste.
:::

::: details 🧩 "Hermes" — watch out for the name collision
The name **Hermes** in the Nous Research ecosystem used to refer to a **FAMILY OF LANGUAGE MODELS** (Hermes / OpenHermes / Hermes 2, 3, 4 — well-known fine-tuned LLMs, often run via Ollama/HuggingFace). Those are **models**, not the agent.

This chapter is about **"Hermes Agent"** — Nous Research's open-source **agent** product (released 2026-02-25). The two are related but play different roles: Hermes Agent can *use* the Hermes/OpenHermes models as its underlying "brain" (via NVIDIA NIM/HuggingFace), but it is itself an agent framework, not an LLM.

There are also a few unrelated **"Hermes" projects** that have nothing to do with AI (e.g. Meta's Hermes JavaScript engine for React Native) — none of those are relevant here.
:::

### Compared to other tools (especially OpenClaw)

Hermes Agent is **not the only self-host option**. Its closest competitor, and far bigger in scale, is **OpenClaw** — one of the most-starred repos in GitHub history. To be fair (and not just go on "Reddit vibes"), here's an objective comparison:

| Criterion | Hermes Agent | OpenClaw |
|---|---|---|
| **Philosophy** | *Agent-first*: the core is a learning runtime (memory + skills), with messaging wrapped around it | *Gateway-first*: the core is a messaging gateway, with the agent wrapped around it |
| **GitHub stars** | ~180K (mid-2026) | ~370K (~2× Hermes) |
| **Language** | Python | TypeScript |
| **Strengths** | Easy setup, good default memory, **auto-generated skills**, checkpoint/rollback | **Massive skill ecosystem** (13K+ community skills), multi-agent orchestration, deterministic cron |
| **Weaknesses** | Over-optimistic self-evaluation (often reports "done" when it isn't), auto-skills can overwrite your customizations, fewer releases | Often breaks on updates, less reliable memory, more complex to self-host; has had a CVE + malicious skills in the ecosystem |

::: tip 🤝 You don't have to "pick one" — you can use them TOGETHER
Hermes and OpenClaw **can talk to each other** through the **ACP** protocol (Agent Communication Protocol). This is exactly the mechanism behind the *"Hermes as CEO, OpenClaw as senior engineer"* pattern in Case 2 (section 06): **OpenClaw orchestrates / holds the skill library, Hermes executes and keeps the memory** — both pointing at a shared vault. Beginners don't need to do this right away, but it's worth knowing the two tools are **complementary** rather than strictly mutually exclusive.
:::

Beyond OpenClaw, the "self-hosted personal assistant" space has other pieces worth knowing: **external memory providers** (Mem0, Honcho, Supermemory, ByteRover…) that Hermes can plug into to add semantic search / a knowledge graph — see the "Advanced: external memory" box in section 04.

::: warning 🧱 REAL limitations — know them upfront to avoid disappointment
Gathering the capability limits in one place (they're scattered across Case 3 and Case 5 in section 06) so you don't expect the wrong things:
- **Self-evaluation isn't trustworthy:** the agent **often reports "done" when it isn't** (especially when an action fails silently) — this is the weakness the community raises most. Always verify the real result for anything with side effects.
- **Deep reasoning is still shallow:** in narrow domains (legal, database RLS…), output tends to be **generic**.
- **Large token overhead** (~73%/call is fixed): running premium models can easily "burn tokens" if you don't optimize context.
- **Auto-generated skills can overwrite manual customizations** on update → back up first.
:::

---

## 02 · Installation & access — Pricing & access

### Install with one command

**The OFFICIAL, recommended way** (install script — the README prefers this because it **auto-installs** all system dependencies: uv/Python, Node.js, ripgrep, ffmpeg, Git):
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

**Alternative** (via pip — fast if your machine **already has** Python 3.11+, Node.js, ripgrep, ffmpeg):
```bash
pip install hermes-agent && hermes postinstall
```

::: warning ⚠️ Which install method to choose?
- `pip install hermes-agent` **does exist** on PyPI and installs the Python build. But `pip` **won't pull** the system dependencies (Node.js, ripgrep, ffmpeg) — if those are missing, the browser/vision/search tools may break. The `hermes postinstall` step is *expected* to pull the rest, but **this command isn't clearly documented in the official README/docs as of mid-2026** — if it errors out, switch to the `curl ... install.sh | bash` script.
- **Beginners / a fresh machine:** just use the **curl script** to be safe.
:::

Platform support:

| Platform | Notes |
|---|---|
| **Linux** | Recommended, smoothest (especially for a VPS). |
| **macOS** | Runs well. |
| **WSL2** (on Windows) | **Recommended** for Windows users — more stable than native. |
| **Windows native** | Via PowerShell `iex (irm .../install.ps1)` — works, but the docs suggest WSL2. |
| **Termux (Android)** | Installs right on your phone. |

::: warning ⚠️ After installing: remember to reload your shell
If you type `hermes` and get **"command not found"**, it's because you haven't reloaded your shell. Run:
```bash
source ~/.zshrc   # if you use zsh (default on macOS)
# or
source ~/.bashrc  # if you use bash
```
:::

### Pricing: the software is FREE, you only pay for tokens + hosting

This is where people get confused, so let's separate it clearly:

| Item | Actual cost |
|---|---|
| **Hermes Agent itself** | **FREE** (MIT, no subscription). |
| **Model (LLM)** | Tokens from the provider you pick — **can be $0** if you use a free tier or run locally. |
| **Hosting** | A VPS at **~$5/month**, or run it **locally for $0** on your own machine. |

### Several ways to run 100% FREE

Many learners run into the **international-payment** hurdle — here's the good news: several providers **need no card**.

| Provider | Free tier | International card needed? |
|---|---|---|
| **Google Gemini (OAuth)** | A **fairly generous** daily quota, browser PKCE login, **no API key needed** | ❌ No — just a Google account |
| **Ollama / llama.cpp** | Runs **fully locally**, completely free | ❌ No |
| **OpenRouter** | 27+ models with the `:free` suffix (roughly **200 requests/day**, 20 req/min — *OpenRouter's policy changes over time and sometimes attaches a minimum-top-up condition; re-check*) | ✅ Yes (to create an account / top up) |
| **NVIDIA NIM** | Free credits on signup, **no card needed** | ❌ No |
| **Hugging Face** | Free **monthly** credits | ❌ No |

::: tip 💸 How to start
- **Learning/experimenting:** use **Google Gemini OAuth** (just a Google account) — the fastest, most free route.
- **Need absolute privacy:** run **Ollama** locally (e.g. `ollama pull qwen2.5-coder:32b`) — your data never leaves the machine.
- **Want a wide variety of exotic models:** OpenRouter `:free` — but you'll need a card to open an account.
:::

::: tip 📌 A real example — from $64/week down to $20/month
Keith Rumjahn (a solopreneur) reports he previously spent **~$64/week** calling the Claude API directly while still having **no durable memory** — every morning he had to paste context back in. After switching to Hermes (running on a DigitalOcean droplet ~$18/month, 2CPU/4GB) and using a cheap subscription, his cost dropped to **~$20/month**. The key point isn't "Hermes is cheaper than the API" but rather: **durable memory keeps him from paying over and over for the same context every morning.** (Source: Keith Rumjahn's Substack — details in section 06, Case 2.)
:::

### Nous Portal (the vendor's bundle — optional)

Nous Research has its own portal (**recommended but not required**) that bundles **300+ models + a tool gateway** (web search, image generation, TTS, browser) in a **single subscription**:

| Plan | Price | Notes |
|---|---|---|
| **Free** | $0/month | Only **$0.10 credit** — enough to try for a feel, not enough for real use. |
| **Plus** | $20/month | Paid. |
| **Super** | $100/month | Paid. |
| **Ultra** | $200/month | Paid. |

> ⚠️ The paid Nous Portal plans (and OpenRouter/Anthropic/OpenAI) **require an international payment card**. Beginners should start with **Gemini free** or **Ollama** first.

### Privacy & regional notes

::: tip 🌍 Access & privacy — a straight take
- **No geo restrictions** are mentioned in the documentation.
- **No telemetry collected** — data is only sent to the **LLM provider you configure** (and if you run Ollama locally, it *goes nowhere at all*).
- Because it's **self-hosted + provider-agnostic**, it installs and runs **normally** anywhere.
- It supports platforms common to businesses across Asia: **Feishu/Lark, WeCom**, plus Telegram/Discord/Slack — handy for building an internal assistant bot.
- **Privacy / compliance:** since you self-host and choose the provider, you control where data flows. If you're subject to a privacy regime (GDPR or similar), running **Ollama locally** keeps everything on-prem; with a cloud provider, your context is sent to that provider (see the privacy box in section 04).
:::

::: tip 🇻🇳 Note for Vietnam / SEA readers
The main practical hurdle in the region is **card payments**: paid providers (OpenRouter, Anthropic, OpenAI, Nous Portal $20+) typically need an **international card**, while **Gemini OAuth** and **Ollama** do not. Start with those two free routes and you can get going without a card.
:::

### Official links

```text
Homepage : https://hermes-agent.nousresearch.com/
Docs     : https://hermes-agent.nousresearch.com/docs/
GitHub   : https://github.com/NousResearch/hermes-agent   (MIT license)
```

---

## 03 · Hands-on workflow — step by step

Below are 7 steps that take you from zero to an AI assistant with memory, connected to your phone, running on a schedule. Each step has **real commands/prompts**.

### Step 1 — Install

```bash
pip install hermes-agent && hermes postinstall
# or: curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.zshrc   # reload the shell (or ~/.bashrc)
```

### Step 2 — Choose a model/provider

Run the interactive command to pick a provider:
```bash
hermes model
```
For example, choose **Google Gemini OAuth** to run free, or **OpenRouter** (enter an API key). If you want to run **Ollama locally**, choose **Custom endpoint** and fill in:
```text
API base URL: http://localhost:11434/v1
```

If you use **Nous Portal**, the fastest path is to set up OAuth + enable the Tool Gateway in one shot:
```bash
hermes setup --portal
```

::: warning ⚠️ The "64K" recommendation — the most common pitfall
Pick a model with a context of **≥ 64,000 tokens**. This is **not a hard number written in the official docs** (as of mid-2026 the docs state no hard threshold), but a **practical recommendation** drawn from real usage: on every tool call, Hermes already loads a large amount of overhead (tool definitions + system prompt + skills index — see Case 5, ~13.9K tokens just for the fixed part). The smaller the context, the easier it is to **choke**, leaving no room for multi-step tool-calling and dropping you into a "prompt too long" loop. This is the #1 pitfall when beginners pick a small model at random.
:::

### Step 3 — Open the chat interface & experiment

Open the **TUI** (the modern interface, recommended):
```bash
hermes --tui
```
Or the classic CLI: just `hermes`. Try a quick test prompt to see whether the agent can read the repo:
```text
Summarize this repo in 5 bullets and tell me what the main entrypoint is.
```

### Step 4 — Resume an old session (test MEMORY)

This is the step that lets you **see persistent memory with your own eyes**. Close the terminal, reopen it, then:
```bash
hermes --continue   # or shorthand: hermes -c
```
List your existing sessions:
```bash
hermes sessions list
```
To verify memory, say something in one session, then bring it up in the next:
```text
remember that nginx Docker bug from Tuesday
```
If the agent "remembers" the old context → memory is working correctly.

::: tip 🔑 A tip for using its strength right
Get into the habit of `hermes -c` (continue). **Don't open a new session every time** — doing so throws away the very thing that makes Hermes different: memory accumulated over time.
:::

### Step 5 (optional) — Connect a messaging platform

Configure and then run the gateway to control the agent from Telegram/Discord/Slack…:
```bash
hermes gateway setup && hermes gateway
```
If you're on **WSL2**, run the gateway in the foreground for stability:
```bash
hermes gateway run
```

### Step 6 (optional) — Schedule automation (cron)

Register a cron-style job so the agent **runs itself** and delivers results to a connected channel. The classic example: *summarize GitHub issues at 8 AM → send to Telegram*. Jobs are registered through Hermes's jobs API:
```text
POST /api/jobs   (register a cron job — e.g. daily at 08:00: summarize issues → Telegram)
```

::: tip 📌 A real example — set cron in plain language, no YAML required
One developer reported handing Hermes the task *"every morning at 8 AM, compile tech news, summarize each item in under 50 words, ranked by relevance to a developer"* — and the agent **figured out how to set up the cron on its own, with no YAML syntax to declare**; it ran reliably for a week. Keith Rumjahn, meanwhile, set up a job that sends an **App Store report at 8:30 AM every Monday** via Telegram. The nice part: you command it in natural language and the agent handles the scheduling. (Source: DEV.to "5 impossible tasks" + Rumjahn's Substack — section 06.)
:::

### Step 7 — Maintenance

```bash
hermes doctor    # diagnose when something breaks
hermes update    # update to a new version
hermes tools     # enable/disable individual tools
```

::: details 🧪 A sample end-to-end CLI session (illustrative)
```text
$ hermes --tui

you ▸ Summarize this repo in 5 bullets and tell me what the main entrypoint is.
hermes ▸ (reads files via the read/grep tools…) Here are the 5 key points… Entrypoint: src/main.py.

you ▸ remember that nginx Docker bug from Tuesday
hermes ▸ Saved to MEMORY.md. Next time you mention "nginx Docker bug" I'll recall this context.

# (close the terminal, reopen a few hours later)
$ hermes -c
hermes ▸ Resuming the previous session. You were working on the nginx-in-Docker bug — want me to dig further?
```
Note: this is an illustration of the *expected* behavior to help you picture the flow, not a verbatim transcript.
:::

::: tip 🧠 Under the hood — read once to understand "the agent that grows with you"
- **Memory:** every session, Hermes **always loads** `USER.md` (your profile) + `MEMORY.md` (long-term context) — so it "remembers" immediately, without having to go looking.
- **Skills:** after a task finishes with **≥ 5 tool calls**, a background process **automatically distills** the trajectory into **one Markdown skill file**. Next time it hits a similar task, the agent pulls that skill back out and reuses it → that's "self-improving".
- **Why skills matter more than switching to a "fancier" model:** the Nous team observed a phenomenon called **"linearized RL"** — the agent struggles the first time it meets a new task, but **once it solves it, performance is unlocked for every subsequent time** (because it's been packaged into a skill). The value lies in **"solve once → reuse forever"** (details: section 06, Case 4).
:::

::: details 🚀 Advanced — attach an "external memory provider" to burn fewer tokens
The default memory model (`USER.md`/`MEMORY.md` **loaded in full on every call**) is simple but token-hungry when the files grow large (Case 5). Recent releases ship **a range of external memory providers** as plugins — for example **Honcho, Mem0, Supermemory, ByteRover, Hindsight, RetainDB**… — which allow:
- **Semantic search / a knowledge graph** instead of loading the whole file → only the relevant part is pulled, **reducing token overhead**.
- **Cross-session user modeling** that's deeper than flat markdown files.

The trade-off: enabling an external provider means **your memory data passes through a third party** (see the privacy warning in section 04). Beginners should stick with the default files first; only consider plugging in an external provider once tokens become a real problem.
:::

::: tip 📌 A real example — the "CEO + senior engineer" pattern when you need multiple agents
When the workload exceeds a single agent, one widely used coordination pattern is: **one lightweight orchestrating agent + delegate heavy tasks to a more capable agent/CLI, then review the result** — Keith Rumjahn jokingly calls it *"Hermes as CEO, OpenClaw as senior engineer"*, with both pointing at **one shared Obsidian vault** as the brain. At team scale, Teknium (Nous) runs **~12 Hermes instances in parallel each day** to develop Hermes itself. The lesson for beginners: **don't cram everything into one agent** — splitting the "orchestrator" and "executor" roles makes the system more stable and easier to control. (Details: section 06, Case 2 and Case 4.)
:::

---

## 04 · Pro tips & common errors

### High-value tips

::: tip 💡 7 practical tips
1. **Start 100% FREE:** use **Gemini (OAuth)** or OpenRouter's `:free` models to learn; for absolute privacy, run **Ollama** locally (e.g. `ollama pull qwen2.5-coder:32b`).
2. **Prefer a model with context ≥ 64K** (a practical recommendation, not an official spec) — small context chokes easily due to tool/skills overhead, and multi-step tool-calling tends to fail.
3. **Use `hermes -c`** (continue) to make the most of persistent memory — don't open a new session every time.
4. **Long sessions burn tokens:** type `/compress` periodically to compress context and avoid "context exceeded" errors.
   ```text
   /compress
   ```
5. **Treat auto-generated skills as "drafts that need review"**, not reliable automation — **review them first** before letting them run in production.
6. **Switch models flexibly as needed** (e.g. a light/fast model like `llama-3.1-8b-instruct` for trivial tasks) with just `hermes model`, **no code changes**.
7. **On Windows, use WSL2** instead of native for better stability.
:::

### Common errors & how to fix them

| Symptom | Cause | Fix |
|---|---|---|
| **`hermes: command not found`** after install | Shell not reloaded | `source ~/.zshrc` (or `source ~/.bashrc`) |
| Install fails because **Python is too old** | Requires **Python 3.11+** (3.12+ recommended) | Check `python3 --version`, then upgrade |
| **429 / rate limit error** | The free tier has limits (Gemini quota; OpenRouter `:free` **200 req/day**) | Switch to another model or upgrade your plan |
| **"Model not found"** | Wrong model identifier | Re-verify with `hermes model` |
| **Flaky gateway on WSL2** | systemd / background service unstable | Run `hermes gateway run` in the **foreground** instead of systemd |
| **Telegram complains about too many commands** | Telegram caps at **100 commands max** | Disable unused skills in `config.yaml` |
| **Local model responds very slowly** | Insufficient GPU VRAM | Use a strong enough GPU; CPU/llama.cpp works but is **slow** |
| **"Prompt too long" / endless retry loop** | Switching to a small-context local model → compression sometimes makes the prompt **LARGER**, stuck in a loop (issue #23767) | Pick a model **≥ 64K**, or type `/compress` manually; **don't** let auto-compression run with a small model |
| **Browser/vision/search tools break after a `pip` install** | `pip` doesn't pull system deps (Node.js/ripgrep/ffmpeg) | Reinstall with the **`curl ... install.sh` script** (handles dependencies) |
| **Customizations in a skill lost after update** | Auto-generated skills **overwrite** your manual edits | **Back up skills** before updating; use **Hermes Curator** to manage skills |

::: tip 📌 A real example — the "silent failure" trap and a Telegram group tip
Two traps the community hits often, worth remembering upfront:
- **Silent failure when a token lacks scope.** A developer had Hermes push a GitHub issue; when the token **lacked scope**, the push **failed but the agent did NOT report an error** — it assumed success, but nothing landed on the repo. The lesson: for any action with side effects (pushing code, sending mail), **verify the real result** and don't trust the agent's "done" report.
- **A silent Telegram bot in a group.** Keith Rumjahn lost time because the bot wouldn't reply in a group — the cause was Telegram's **"Group Privacy"** being on by default. Go into BotFather and **turn off Group Privacy** so the bot can read group messages.

(Source: DEV.to "5 impossible tasks" + Rumjahn's Substack — section 06.)
:::

::: warning 🔐 Security & privacy — read before putting it on a VPS
**Infrastructure:**
- **DO NOT expose the web UI/gateway to the public Internet** — put it behind a **VPN/SSH tunnel**.
- **Dangerous commands require your manual approval** — don't disable the confirmation step. (Safety tip: Hermes has **checkpoint/rollback** — it snapshots before the agent edits files/code, so you can undo if it breaks something.)
- The agent **writes its own procedures (skills)**, so **a human must review** them before letting them run for real.
- `sudo` **isn't available** in the gateway unless you've configured passwordless sudo — don't expect it to run root commands.

**Where your data goes — don't paste the wrong thing:**
- When using a **cloud provider** (Gemini/OpenRouter/Anthropic…), **the entire context is sent to that provider on every call** — including `USER.md`, `MEMORY.md`, and every repo file the agent reads. Because those two files are **reloaded on every call** (see Case 5), **don't keep API keys, passwords, tokens, or customer data/PII in the memory files** if you're using a cloud LLM — they'll **leak to the provider over and over**.
- If you enable an **external memory provider** (Mem0, Honcho, Supermemory…), your memory also **passes through a second third party** beyond the LLM provider — weigh this carefully with sensitive data.
- **Absolute privacy:** run **Ollama locally** → your data *never leaves the machine* and isn't sent anywhere.
:::

::: warning 🚨 The "429" trap while learning
The free tier is great for learning, but the **Gemini quota** and **OpenRouter `:free` (200 req/day)** will hit the ceiling if you let the agent run many rounds of tool-calling. When you hit a **429**, don't panic: either **switch models** (`hermes model`) or move to **local Ollama** to run without limits.
:::

::: details ❓ FAQ & common errors (quick read)
**Q: `pip install hermes-agent` or `curl ... install.sh`?**
→ Beginners / a fresh machine: use the **curl script** (auto-installs Node.js/ripgrep/ffmpeg). `pip` is only convenient when the machine already has those dependencies.

**Q: Typing `hermes` says "command not found"?**
→ Shell not reloaded: `source ~/.zshrc` (or `~/.bashrc`).

**Q: Can I run free without an international card?**
→ Yes. Use **Google Gemini OAuth** (just a Google account) or local **Ollama** — both **need no card**. Only paid OpenRouter/Anthropic/Nous Portal require a card.

**Q: Which model is suitable? How much context is enough?**
→ Prefer context **≥ 64K** (a practical recommendation due to the large overhead). Smaller models get stuck on "prompt too long".

**Q: The agent says "done" but actually did nothing (push code, send mail)?**
→ This is a **silent failure** (usually because the token lacks scope). **Always verify the real result** for any action with side effects — don't trust the agent's report.

**Q: A silent Telegram bot in a group?**
→ Telegram has **"Group Privacy"** on by default. Go to **BotFather → turn off Group Privacy** so the bot can read group messages.

**Q: Tokens burn fast / high bill?**
→ Every call has ~73% fixed overhead (Case 5). Type `/compress` periodically, trim unused tools/skills, or plug in an **external memory provider** (section 03) to pull only the relevant part.

**Q: Does the agent "die" when my personal machine is off?**
→ Yes. To keep the agent **running 24/7**, you must host it on a **continuously running VPS** (~$5/month) — that's the condition for Hermes to play to its strengths.
:::

---

## 05 · Exercises / mini-projects

Do these in order — each has clear **"pass" criteria** so you can check yourself.

### 🧪 Exercise 1 — Build a FREE agent & verify memory (basic)

**Goal:** install Hermes, run it on a free provider, and *prove* it remembers across sessions.

Steps:
```bash
pip install hermes-agent && hermes postinstall
source ~/.zshrc
hermes model        # choose Google Gemini OAuth (free)
hermes --tui        # open chat
```
In the first session, tell the agent a personal fact (e.g. *"my name is Hoang, I'm working on a VitePress project called easy-vibe, and I like concise answers"*). Close the terminal, reopen it:
```bash
hermes -c
```
Then ask: *"what's my name, which project am I working on, and how do I like answers?"*

::: tip ✅ Pass when
The agent answers your name + project + preference **correctly** from the previous session → persistent memory (`USER.md`/`MEMORY.md`) is working.
:::

### 🧪 Exercise 2 — A "repo-reading assistant" over Telegram (intermediate)

**Goal:** control the agent from your phone to summarize a repo.

```bash
hermes gateway setup     # choose Telegram, paste the bot token
hermes gateway           # (on WSL2: hermes gateway run)
```
From Telegram, message the bot:
```text
Summarize this repo in 5 bullets and tell me what the main entrypoint is.
```

::: tip ✅ Pass when
You get a **5-bullet summary + the entrypoint** right inside Telegram, without opening a terminal. If Telegram complains about too many commands → disable some skills in `config.yaml` (see section 04).
:::

### 🧪 Exercise 3 — Automatic morning report via cron (advanced)

**Goal:** every morning at 8 AM, the agent **automatically** summarizes a repo's GitHub issues and sends them to Telegram — you type nothing.

Outline of what to do:
1. Make sure Exercise 2 is working (Telegram gateway OK).
2. Register a **cron job** (e.g. via `/api/jobs`) on a daily `08:00` schedule, with the content: *"summarize new issues for repo X → send to Telegram"*.
3. Keep the machine/VPS running through the night.

::: tip ✅ Pass when
**The next morning**, you receive the issue summary over Telegram **without doing anything**. This is the moment you really feel the value of "a persistent agent + scheduled + multi-channel".
:::

::: warning ⚠️ Before running it "for real"
- If you're on a free tier, watch the **quota/429** — a daily cron still consumes requests.
- **Review** every skill the agent auto-generates while doing the exercise (treat them as drafts).
- **Don't expose the gateway to the Internet** — keep it behind a VPN/SSH tunnel.
:::

---

## 06 · Case studies & real use cases (from the community)

This section gathers **real, verifiable** examples from Nous Research itself, GitHub issues (with concrete numbers), and first-person user blogs. Each example follows the frame: **context → what they did → results/numbers → lesson**, with a source at the end.

::: warning ⚖️ Read first: how to tell real from "hype"
There are many viral numbers around Hermes Agent that are **not independently verified** (e.g. "$300 → $123K in 3 months" from a weather trading bot, or "224 billion tokens/day", "40% faster"). Numbers like these mostly come from marketing posts on X or auto-generated SEO pages. In this chapter, **the most trustworthy data comes from GitHub issues** (users measuring themselves, with data dumps) and **Nous's own blog**. Whenever you read any huge ROI number about an AI agent, ask: *"is there a data dump/log behind it, or is it just a single tweet?"*
:::

### Case 1 — Nous wrote an entire novel with Hermes

**Context.** Nous Research wanted to prove an agent could **"ship" a complete product**, not just produce a demo draft. They picked a hard problem: writing a full novel ("The Second Son of the House of Bells").

**What they did.** Hermes built a 4-phase pipeline on its own:
1. World-building / character creation / outlining.
2. Writing each chapter — **any chapter it self-scored below 6.0 was discarded and rewritten**.
3. An adversarial review loop: spin up 2 critic personas ("literary critic" + "novel professor") to find flaws.
4. Push through Claude Opus review **repeatedly until there was no further improvement**.

This is exactly the **"modify → evaluate → keep/discard"** loop in the style of Karpathy's Autoresearch, but applied to fiction writing. Finishing touches: typeset with LaTeX, illustrated via FAL, audiobook via ElevenLabs.

**Results.** **79,456 words, 19 chapters, 4,179 audio segments**; went through **6 automated rounds + 6 Opus rounds**.

**Lesson.** With a self-evaluation loop that has a **clear score threshold**, the agent can handle even a long-form creative task end-to-end — the key isn't "one magic prompt" but the **iteration mechanism + discard criteria**.

> Source: Nous Research blog (`nousresearch.com/bells`); repo `github.com/NousResearch/autonovel` (includes `PIPELINE.md`, `ANTI-PATTERNS.md`); announcement on X `@NousResearch`.

### Case 2 — Solopreneur: "Hermes is the CEO, OpenClaw is the senior engineer"

**Context.** Keith Rumjahn, a solopreneur, previously spent **~$64/week** calling the Claude API with **no durable memory** — every morning he had to paste context back in, and browser automation was flaky. He had also tried running it on a Jetson Nano but it **crashed ~6 times/day**.

**What they did.** Run **2 agents pointing at 1 shared Obsidian vault** hosted on a UGreen NAS. Everything configured with markdown files:

```text
Souls.md   → personality: "concise technical expert, no fluff"
Agents.md  → code conventions, LinkedIn post format
User.md    → memory: name, relationships, work
```

Hermes handles the simple work + **orchestration**, **delegating heavy tasks to OpenClaw** and then reviewing the result — exactly like "a CEO assigning work to a senior engineer". He also integrated Apple Health, Threads (auth via cookie), and App Store reports.

**Results / numbers.**
- Cost from **~$64/week → ~$20/month** (using an OpenAI Codex subscription; or a DigitalOcean droplet ~$18/month, 2CPU/4GB).
- Self-analyzed sleep: *"average 7.59h, max 9.8h, min 5.37h"*.
- Pulled 34 Threads posts with like/reply/repost counts.
- A cron sends an **App Store report at 8:30 AM Monday** via Telegram.

**Traps encountered (very real).**
- The Telegram bot **wouldn't reply in a group** until "Group Privacy" was turned off in BotFather.
- Watch out for a **fake** `@userinfobot`.
- The dashboard runs at `127.0.0.1:1919`.

**Lesson.** Separate the roles of **"lightweight orchestration" vs "heavy execution"**; use a **shared markdown vault** as a durable brain for multiple agents.

> Source: Keith Rumjahn's Substack — "Complete guide to mastering Hermes Agent" (`rumjahn.substack.com/p/complete-guide-to-mastering-hermes`).

### Case 3 — A developer gave Hermes "5 hard tasks" (with both passes and failures)

**Context.** A full-stack developer tested the agent's limits with 5 real tasks, honestly recording both what worked and what broke.

**What they did & results (very specific):**
1. **Compile tech news every morning at 8 AM, summarize each item in under 50 words, ranked by relevance to a developer** → ✅ **Pass**. The agent inferred "developer relevance" (prioritizing Next.js/Supabase) and **set up the cron with no YAML to declare**; ran reliably for a week.
2. **Read a repo's README → identify the stack → write a review checklist → push a GitHub issue** → ⚠️ **partial**: correctly identified Next.js + Supabase + Tailwind, but the checklist was **generic** (missing RLS, missing edge cold start); the push succeeded when the token had scope, but **FAILED SILENTLY when scope was missing**.
3. **Decide a backend architecture** (Supabase serverless vs Node/Express + PostgreSQL) → ✅ produced a decision matrix and inferred factors that weren't even mentioned.
4. **Analyze a CSV of student grades → write intervention notes → package it into a reusable skill** → ✅ created the skill `at-risk-student-csv-analyzer`; the second time it was reused with no explanation needed (though the note content was a bit "cold"/generic).
5. **Switch context mid-stream** (dev-tools content calendar → personal finance) → ✅ kept the usable parts + regenerated; but **dropped 1 point tied to the old context** ("context bleed").

**Lesson.** The skill-loop framework **actually works**; but deep reasoning is still **shallow**, output tends to be **generic**, there's **context bleed** when switching topics, and there are **silent failures** with bad config (token missing scope). Don't hand it high-risk work without checking the output.

> Source: DEV Community — "I Gave Hermes Agent 5 Impossible Tasks" (`dev.to/syedahmershah`).

### Case 4 — The Nous team itself uses 12 Hermes instances to… build Hermes

**Context.** Teknium (Nous co-founder) shared how the team uses Hermes itself to develop Hermes.

**What they did.** Run **~12 instances in parallel each day**. They observed a phenomenon they call **"linearized RL"**: the agent is initially poor/floundering on a task with no prior "experience", but **once it solves it, it unlocks a big performance gain for subsequent runs**.

**Results.** The repo reached the top of GitHub; a series of new features shipped in recent releases — **Hermes Curator** (auto-collects/prunes skills), **Kanban multi-agent orchestration**, the `/goal` command to force the agent to complete an objective, and disk optimization. (Versions change fast: v0.13.0 was once referenced, but by late May 2026 it was already v0.15.x — don't latch onto a specific version number, check GitHub Releases in section 07.)

**Lesson.** The core value of this kind of agent lies in **"solve once → reuse forever"**, not in the power of a single model. This is why persistent memory + skills matter more than switching to a "fancier" model.

> Source: X `@Teknium` and `@NousResearch` (posts about Hermes Curator, v0.13.0, "linearized RL").

### Case 5 — Token-overhead audit: ~73% of every call is "fixed cost"

**Context.** A user built a proxy dashboard to **measure real tokens** across roughly **207 API calls over ~10 sessions** in one evening — both a useful case and a cost trap.

**What they did.** Dumped every request and broke down each component of the prompt.

**Results / numbers (v0.6.0 build):** about **73% of every call is fixed overhead (~13.9K tokens)**:

```text
Tool definitions (31 tools) : 8,759 tokens  (46.1%)
System prompt               : 5,176 tokens  (27.2%)
Browser tools               : 1,258 tokens  (even when chatting on WhatsApp with NO browser used)
Skills index                : ~2,200 tokens
```

Estimate: **1,000 calls ≈ 14 million tokens just for the overhead**. The user's suggestion: **filter tools per platform** + **lazy-load the skills index**.

**Lesson.** Even after self-hosting, you **still have to optimize context**, or you'll "burn tokens" running a premium model. This is REAL data (with a dump), quite unlike marketing's "40% faster" benchmarks.

> Source: `github.com/NousResearch/hermes-agent/issues/4379`.

### Case 6 — On-prem self-hosting for the legal industry (small model + 1 GPU)

**Context.** Legal work **isn't allowed to send data through a third-party API**.

**What they did.** Run Hermes **fully locally** on an edge-class GPU with a **small ~4B model** (e.g. Gemma 3 4B), wired into internal systems.

**Results.** Self-hosting became a **hard requirement**; it proved that a **small on-prem model** works for real work.

**Lesson.** For tightly regulated industries (legal, healthcare, finance), **"small model + on-prem"** matters more than **"strong model on the cloud"**. This is also why it's worth knowing the Ollama/local route from the very start.

> Source: GitHub issue #15562 (via Nous's official user-stories compilation).

::: details ⚠️ Case 7 (CAUTION) — "Weather trading bot makes $123K": why not to trust it
There's a widely circulated "case": deploy Hermes on a $5 VPS running 24/7, read forecasts (NOAA/ECMWF), score EV, size bets with the Kelly Criterion on Polymarket, "writing its own strategy notes and self-adjusting". The rumored figures: *"$300 → $123K in 3 months"*, *"$440K profit in 20 days"*, *"85% win rate (850/1000)"*.

**Why you should NOT use it as evidence:** even the use-case compilation repo has **no URL to the original post**, only the handle + the X post title. There's no trade dump, no log, no way to verify. This is an **unverified marketing claim** — if it goes into documentation, it must be clearly framed as "rumor", or better, dropped. I leave it here as a **critical-thinking exercise**: when you see a shocking ROI number about an AI agent, default to skepticism until there's data.
:::

### Common use cases (quick grouping)

Beyond the cases with numbers above, the community (via user-stories/Discord/X) also uses Hermes for:

| Group | Concrete examples |
|---|---|
| **24/7 personal assistant** | Run on a VPS/Raspberry Pi, command it via Telegram/WhatsApp/iMessage; a morning/evening "standup" cron that gathers work from every project (some describe using it to manage ADHD). |
| **Obsidian second brain** | The agent reads/writes a markdown vault as durable memory that survives context resets; writes journals, dashboards. |
| **Dev workflow** | Review GitHub PRs (cron + webhook); the agent learns the codebase style over days and then adjusts its output format; multi-agent Plan → Code → QA → Ship, each role on a different cheap model. |
| **Voice-first** | Log via voice memo (fitness coach; accessibility for people who find typing hard, and NVDA screen-reader users). |
| **Content / creative** | A cron that researches weekly video topics; generates tweets/LinkedIn posts in your personal "voice" from a folder of old scripts; auto-builds a RenPy + ComfyUI visual novel. |
| **Business ops** | A "Chief of Staff" agent + a sub-agent per project (separate memory), daily WhatsApp reports; ticket triage in Plane.so. |
| **Cost optimization** | Route OpenRouter to cheap tiers; exploit free tiers (GitHub Copilot, OpenRouter free models); local Ollama/SearXNG to avoid paying for a search API. |
| **Regional / Asian enterprise** | Adapters for Feishu/WeCom/QQ/LINE (China/Japan/SEA); Vertex AI requirements; EU AI Act compliance (audit, encrypted memory). |

> The sources for this group are mostly user-stories/Discord/X — **good for listing ideas, but don't cite the absolute numbers**.

### Real complaints & pitfalls (verified via GitHub issues)

This is the most trustworthy section because it comes from issues with numbers — read it carefully to **dodge them in advance**:

| Issue | Detail / numbers | Source |
|---|---|---|
| **Large fixed token overhead** | ~73%/call (~13.9K tokens): tool definitions + system prompt + skills index loaded every time → burns tokens with premium models. | issue #4379 |
| **Context files balloon** | `MEMORY.md`/`USER.md`/`SOUL.md` + daily logs loaded in full on every call → **~45K tokens/call** in a 250-turn session; a multi-resolution compression was proposed to cut cost 80%+. | issue #10585 |
| **"Prompt too long" loop** | Switching to a small-context local model → token estimation is off, compression sometimes makes the prompt **LARGER**, endless retry loop. | issue #23767 |
| **Silent failure on bad config** | E.g. a GitHub token lacking scope → the push fails with **no error reported**. | DEV.to + several issues |
| **Shallow reasoning / generic output** | In deep domains; plus **"context bleed"** when switching topics mid-stream. | DEV.to |
| **Approval-gate violations** | One user ran an RCA script over 129 sessions/23 days and **self-reported 112/129 sessions with approval-gate violations** (a self-measured number). | issue #17619 |
| **The agent edits its own code** | Concern about being overwritten on update → you need a safe customization pattern before upgrading. | community |

::: tip 🔍 A note on source reliability (read this to vet things yourself)
- **Strongest:** GitHub (repo + issues with data dumps: #4379, #10585, #23767, #17619), Nous's own blog (`nousresearch.com/bells` + the `autonovel` repo), the official X accounts `@NousResearch`/`@Teknium`. The two best first-person blogs for fighting "vagueness" are **Rumjahn (Substack)** and **DEV.to "5 impossible tasks"**.
- **Reddit:** this compilation pass **couldn't open any specific URL/username** — only general traces on `r/LocalLLaMA` / `r/selfhosted` (complaints that OpenClaw often breaks on updates and Hermes is more stable; a "one month wisdom" post; running Qwen locally as a Telegram assistant; using Obsidian as memory). So this chapter **only paraphrases and does not cite Reddit usernames**.
- **Compared to "OpenClaw":** the recurring community sentiment is that OpenClaw has *"endless bugs / often breaks on updates"*, and many switched to Hermes because it's *"more stable"*. This is **sentiment**, not a benchmark.
- **The GitHub star count is REAL** (verified at the repo: roughly **~180,000 stars** mid-2026) — not in the "fabricated" group. Just note: this number **changes very fast**, so don't treat a specific snapshot as fixed, and "many stars" alone doesn't guarantee quality/stability.
- **Absolutely doubt:** any weather-trading-style financial number ("$300 → $123K"), "224 billion tokens/day", "40% faster" — mostly from SEO/AI-generated pages or unverified marketing.
:::

---

---

## 07 · Summary & official sources

::: tip 📌 5 things to take away
1. Hermes Agent = a **self-hosted, open-source (MIT) agent** that remembers across sessions and understands you better the more you use it.
2. **The software is FREE** — you only pay for tokens (or **$0** with Gemini OAuth/Ollama) + hosting (~$5/month or local).
3. **It works fine anywhere:** no geo restrictions, no telemetry; Gemini OAuth/Ollama **need no international card**.
4. **Survival tips:** prefer a model with context **≥ 64K** (a practical recommendation due to the large overhead, not an official spec); use `hermes -c` to keep memory; `/compress` when tokens fill up.
5. **Security is on you:** hide the gateway behind a VPN/SSH, approve dangerous commands, **review auto-generated skills** before production; **don't keep secrets/PII in the memory files** when using a cloud LLM.
:::

**Official sources (verified as of mid-2026):**

| Source | Link | Use for |
|---|---|---|
| **Homepage** | [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/) | Overview, download |
| **Docs** | [hermes-agent.nousresearch.com/docs](https://hermes-agent.nousresearch.com/docs/) | Install, memory, provider guides |
| **GitHub repo (MIT)** | [github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Source, README, issues |
| **GitHub Releases** | [github.com/NousResearch/hermes-agent/releases](https://github.com/NousResearch/hermes-agent/releases) | **Check the latest version yourself** (the project changes fast) |
| **PyPI** | [pypi.org/project/hermes-agent](https://pypi.org/project/hermes-agent/) | Confirm `pip install hermes-agent` |
| **Nous Portal (pricing)** | [portal.nousresearch.com](https://portal.nousresearch.com/) | Free/Plus/Super/Ultra plans |

> This document is compiled as of **mid-2026** — the numbers (GitHub stars, version numbers, free-tier quotas, prices) **change fast**, so re-check GitHub Releases and the homepage if a command/price has changed. The OpenClaw comparison and the ACP protocol draw on third-party comparison pages (kilo.ai, glukhov.org) — treat them as **directional reference**, not official Nous figures.
