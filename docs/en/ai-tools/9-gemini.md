---
title: 'Gemini (Google) — A multimodal AI assistant that lives inside the Google ecosystem'
description: 'A hands-on guide to Google Gemini: plans & pricing, Deep Research, NotebookLM, AI Studio, and the Gemini CLI → Antigravity transition (personal CLI shutdown deadline: Jun 18, 2026) — with exercises and sourced case studies.'
---

# Gemini (Google) — A multimodal AI assistant that lives inside the Google ecosystem

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">✨</p>

::: tip 🔥 Hands-on — 30 seconds
You're a final-year student. It's 11pm and you owe a literature-review section for your thesis — 20 sources scattered across the web, and reading them by hand would eat your whole night. Open **gemini.google.com**, turn on **Deep Research**, and type: *"Do deep research on [topic], compare conflicting viewpoints, prioritize 2025–2026 sources, and include a table and citations."* → Gemini proposes a plan, you approve it, it browses the web for a few minutes, then returns a sourced report. Export to Google Docs and polish. An all-nighter shrinks to 30 minutes.
**💸 Real-world payoff:** an assistant that can read your Gmail/Drive/Docs, generate images/video, and swallow a 1-million-token document. The Free tier is already enough for most schoolwork. (A one-year free Google AI Pro offer for students ran in late 2025 but **registration has now closed** — see Section 02 for how to check for a new round.) Less hired help, fewer late nights.
:::

> **"Gemini isn't just a chatbot — it's a whole family of products: a foundation model, a chat app, an assistant inside Gmail/Docs, and developer tools.**
> **It's strongest when you already live inside the Google ecosystem. But it also fabricates citations, and Google just 'retired' the Gemini CLI for individual users — know the details so you don't get caught out."**

::: tip 🎯 After this chapter you'll **be able to**
- **Tell apart** the three layers of Gemini (foundation model / chat app / dev tools) so you don't get confused reading the news.
- **Sign in** and use the generous Free tier (Deep Research, image generation, Live are all there), and pick a plan that fits your budget.
- **Run Deep Research** to produce a report with citations, and **combine it with NotebookLM** into a powerful research workflow.
- **Use AI Studio** (free, no card required) to grab an API key and "vibe-code" an app, then deploy it.
- **Understand the Gemini CLI → Antigravity transition** (personal CLI shutdown deadline: Jun 18, 2026) and decide whether to depend on it.
- **Spot & prevent** citation fabrication + data leakage on the personal tier — a survival skill when using AI for real work.
:::

::: warning ⏱️ Note on the "shelf life" of this information
This reflects understanding as of **early June 2026**. The Gemini ecosystem changes **extremely fast** — the first half of 2026 alone brought Gemini 3, 3.1 Pro, I/O 2026, and the Gemini CLI shutdown. Pricing/benchmark figures are tagged with "~" when the source is a third party. Just head straight to [gemini.google.com](https://gemini.google.com) and [ai.google.dev](https://ai.google.dev) to check the latest.
:::

---

## 01 · What this tool is & when to use it

**Gemini** is the overall AI product family from **Google / Google DeepMind**. Unlike ChatGPT (mostly a single app), "Gemini" spans **3 layers** that are easy to mix up — get them straight and the news stops being confusing:

::: tip 🔑 Telling apart the 3 layers of "Gemini" (read carefully so you don't confuse them)
- **Foundation models** = the Gemini model line underneath, with several tiers: the **Pro** versions (the most capable: 3 Pro, 3.1 Pro, 3.5 Pro), the **Flash** / **Flash-Lite** versions (fast & cheap: 3.5 Flash), and the deep-reasoning **Deep Think** mode. This is the "engine."
- **End-user apps** = the Gemini chat app (web + iOS/Android), the on-phone assistant, and the Workspace integrations. This chapter talks mostly about these.
- **Developer tools** = **AI Studio**, the **Gemini API**, **Vertex AI**, and (formerly) the **Gemini CLI** → now **Antigravity**.
:::

**Gemini 3** (the foundation model) launched **Nov 18, 2025**, described by Google as its "most intelligent model" — strong reasoning, multimodal (text/image/video/audio/code), with a **1-million-token** context window. **Gemini 3.1 Pro** arrived around **Feb 19, 2026**. At **Google I/O 2026** (around May 19–20) Google announced **Gemini 3.5 Flash** (now GA — described as fast yet beating 3.1 Pro at coding/agentic work), introduced **Gemini Omni**, **Spark**, and **Antigravity** (an agent-first platform replacing the Gemini CLI). *Per sources through mid-2026:* **Gemini 3.5 Pro** is not yet broadly available (it's rolling out gradually), so don't confuse "3.5 Flash" (available) with "3.5 Pro" (not yet). The official app URL: **https://gemini.google.com**.

::: warning 🔗 "Shutting down the Gemini CLI" and "launching Antigravity" are the SAME event
The announcement to move from Gemini CLI → Antigravity came **at I/O 2026 (~May 19–20, 2026)**, while the **deadline to shut off the Gemini CLI for individual users is Jun 18, 2026** — i.e. about a month after the announcement. Don't misread Jun 18 as "Antigravity's launch day": Antigravity (and the Antigravity CLI) have existed since I/O; Jun 18 is just the day the old CLI stops serving individuals. Details in Section 02.
:::

**What Gemini does well (in the app):**

| Task group | What it can do | Where to find it |
|---|---|---|
| **Multimodal chat** | Q&A over text/image/video/audio/code; the Free tier runs a Flash-class model (latest generation), paid unlocks the Pro tier | Even on Free |
| **Deep Research** | An agent that browses many web sources, plans, and synthesizes a report with citations | Free (stronger on Pro/Ultra) |
| **Deep Think** | A deep-reasoning mode (many parallel hypotheses); Google announced Gemini 3 Deep Think hitting ~41% on Humanity's Last Exam, ~93.8% GPQA Diamond, and IMO 2025 gold-medal level *(figures published by Google)* | Ultra |
| **Voice & authoring** | **Gemini Live** (real-time conversation), **Canvas** (authoring/code workspace), **Gems** (custom assistants) | Free + paid |
| **Image & video generation** | Images via **Nano Banana / Nano Banana Pro**, video via **Veo 3.1** through **Flow** | By plan |
| **Personal Intelligence** | Reads context from Gmail, Drive, Calendar, Maps (with a privacy controls panel) | By plan |

::: tip 📌 Two sibling products you must know
- **NotebookLM** (notebooklm.google.com) — uses Gemini models, but the workflow is different: you **load your own documents as "sources,"** then ask questions and get answers **with citations linking back to the source**, generate an **Audio Overview** (auto-generated podcast), summaries, and slides. It's an extremely powerful **personal-document RAG** tool — it only answers based on the documents you supply, so it fabricates less than ordinary chat. (Hybrid workflow with Deep Research in Section 03.)
- **Gemini in Google Workspace** — integrated into Gmail, Docs, Sheets, Slides, Drive, Meet, Chat, Vids: "Help me write," thread summaries, Sheets formulas, meeting notes. Since ~Jan 2025 it's been bundled free into many Workspace business/enterprise plans.
:::

::: tip ✨ New at I/O 2026 (rolling out — read with measured expectations)
- **Gemini 3.5 Flash** is GA — Google describes it as fast yet beating 3.1 Pro at coding/agentic work; **3.5 Pro** is, *per sources through mid-2026*, rolling out gradually and not yet widely available.
- **Gemini Omni** — a model that "creates anything from any input," starting with video, available on Plus/Pro/Ultra. **Spark** (a 24/7 agent running on 3.5) and **Project Genie** are for Ultra.
- *Note: these are new I/O 2026 features, some in Beta or limited to the US market — double-check before assuming they're available in your region.*
:::

**Developer (AI Studio + API):** **AI Studio** (aistudio.google.com) is a free playground — prompt, grab an API key, "vibe-code" an app, then deploy it to **Cloud Run**; access Gemini/Veo/Imagen/Nano Banana/Gemma. **Build mode** spins up a full-stack web app or Android (Kotlin/Compose) from natural language.

**Use Gemini when:** you live inside Google (Gmail/Docs/Drive), need multimodal (image/video/audio), need very long context (1M tokens), or want good local pricing. **Think twice when:** the task needs absolutely precise citations (legal/medical) — Gemini fabricates citations more than Claude (see below).

### Vs. other tools — "when to pick which"

No tool "wins on everything." Gemini is strongest at **multimodal**, **long context**, and **Google integration**. The table below synthesizes several third-party comparisons (2026) — benchmarks vary by source, so treat them as **directional reference**, not absolute numbers:

| Tool | Strong at | Common paid plan (~USD/month) | Pick when |
|---|---|---|---|
| **Gemini** (Google) | Multimodal (image/video/audio), 1M-token context, Workspace integration | Plus ~$8 · Pro ~$20 · Ultra ~$100+ | You live in Google, need video/images, very long documents, good local pricing |
| **ChatGPT** (OpenAI) | All-rounder, the widest plugin/integration ecosystem | Plus ~$20 | You need a versatile "all-in-one" assistant |
| **Claude** (Anthropic) | High-quality code, multi-file reasoning, long/formal documents, safety | Pro ~$20 | Serious programming, long spec-faithful writing, safety-first |
| **Perplexity** | Search-first, highest citation accuracy | Pro ~$20 | Lookups needing trustworthy sources, fast research with citations |
| **Grok** (xAI) | Direct access to the X feed, fastest speed | ~$30 (varies by X plan) | Tracking breaking news / real-time social media |

*Reference USD prices (global, per multiple sources through mid-2026), may vary by promotion & region — check the localized price shown on the official site for your country.*

::: tip 💡 Quick "who's strong at what" summary
- **Multimodal + long context + work integration** → **Gemini** (plus Veo/Nano Banana).
- **Code quality & multi-file reasoning** → **Claude** (one source reports SWE-bench Verified ~87.6% vs Gemini 3.1 Pro ~80.6% — *third-party figure, read with measured expectations*).
- **Citation accuracy / real-time search** → **Perplexity** (lowest citation-hallucination rate).
- **Speed + social-media data** → **Grok** (direct X access).
- Running **two tools in parallel** is totally normal — Gemini for thinking/research, Claude for coding, for instance.
:::

#### CLI coding specifically (Antigravity vs Claude Code vs Codex)

If you plan to **code with a CLI agent**, this is the head-to-head comparison most worth weighing. Antigravity's biggest point of contention is that its **free quota dropped drastically** versus the old Gemini CLI:

| Axis | **Antigravity CLI** (`agy`) | **Claude Code** | **Codex CLI** |
|---|---|---|---|
| Open source? | Closed-source | Closed-source | Open source |
| Language | Go (binary, no Node needed) | Node.js | Rust |
| Free quota/day | *per community reports through mid-2026:* ~**20 runs/day** (the old Gemini CLI was ~1,000/day → a ~98% cut) | By Claude plan (Free limited; Pro/Max more) | By ChatGPT plan |
| Agent features | Keeps Agent Skills, Hooks, Subagents, Extensions; supports MCP | Skills, Hooks, Subagents, MCP | Tool use, MCP |
| Maturity | New (~I/O 2026), community complains about insufficient feature parity | Mature, widely used | Mature |

::: warning ⚠️ Antigravity's free quota of ~20 runs/day is a real pain point
*Per community reports through mid-2026:* Antigravity CLI's free quota fell to about **~20 runs/day** — just a few tasks and it's gone, a far cry from the old Gemini CLI (~1,000/day). If you code a lot and don't want to pay, consider **Claude Code / Codex** as a fallback, or upgrade to **Gemini Code Assist Standard** for a higher quota. This number changes often by round — recheck before depending on it.
:::

::: warning ⛔ When NOT to use Gemini (real limits)
Gemini is good at many things, but **not every job suits it**. Avoid it — or always keep a human in the loop — in these cases:
- **Legal / medical content needing absolutely precise citations** — one source reports Gemini "hallucinating" case-law citations ~18% of the time (vs Claude ~3%). *That figure is from a third-party comparison, not formal research* — but it's enough to **not trust it blindly** for legal/medical content; always verify.
- **Sensitive / confidential data on the personal tier** — because of human review + long retention (see Section 04). Workspace enterprise is different.
- **Production pipelines needing an open-source, long-term-stable CLI** — the Gemini CLI was just "retired" for individuals (Jun 18, 2026), and Antigravity is closed-source and lacked feature parity at launch → if you need open-source/stability, consider Claude Code/Codex or wait for Antigravity to mature.
- **Large codebases needing top reliability for multi-file edits** — many benchmarks give Claude the edge.
- **Tasks needing real-time social-media data** — Grok (X access) fits better.
- **Needing absolute API stability right when a model just launched** — the Preview phase often hits 503 "overloaded" errors (see Section 04).
- **Recognizing specialized or regional accents in Gemini Live / audio** — spoken-language recognition quality (especially terminology and regional accents) is often weaker than for English; **test first** with a sample clip before relying on it for important work.
- **Needing stable / reproducible results** — the model changes versions constantly (3 → 3.1 → 3.5 in just 6 months), and output can drift between generations. **Don't hard-code a rigid dependency on one version** in a product; pin a specific version via the API if you need stability.
:::

---

## 02 · Sign-up & access — pricing & access

### Available worldwide? — **Yes.**

Google officially sells **all 3 plans** in most regions (no VPN needed). The **Free tier requires no card.** Prices are shown in your local currency on the official subscriptions page.

::: warning 🎓 The one-year free Pro student offer — REGISTRATION HAS CLOSED
In late 2025 Google ran an offer giving students **one year of Google AI Pro free** (at the time "powered by Gemini 2.5 Pro" + 2TB), with registration via SheerID verification. *Per sources through mid-2026:* the registration window opened around **Oct 8, 2025 → Dec 9, 2025** in some regions and this 12-month round has **closed globally** (regional deadlines extended to ~March 2026). **As of now (mid-2026) registration is closed — don't assume it's still available.** Google often reopens these in rounds, so check `gemini.google/students` to see whether a new one is live.
:::

### 30-second sign-in (the app — nothing to install)

```text
1. Open https://gemini.google.com (or download the iOS / Android app).
2. Sign in with your Google account.
3. Go straight to the chat screen → type and you're ready to go (Free tier).
```

### Plans & pricing (local prices come from gemini.google/subscriptions, shown in your currency)

| Plan | Pricing | Key contents |
|---|---|---|
| **Free** | 0 | 3.5 Flash + several tiers of 3.1 Pro; image generation, Deep Research, Live, Canvas, Gems; 15 GB |
| **AI Plus** | ~$8/month (often 50% off for the first 6 months) | 2× quota, video generation, 200 Flow credits, advanced NotebookLM, 200 GB |
| **AI Pro** | ~$20/month | 4× quota, "3.1 Pro" + advanced features, 1,000 Flow credits, 5 TB, YouTube Premium Lite |
| **AI Ultra** | ~$100+/month (with higher tiers) | Deep Think (early, US/English), 10,000–25,000 Flow credits, 20+ TB |

::: tip 💡 Notes on pricing (read before opening your wallet)
- Reference USD prices (global, per multiple sources): Plus ~$7.99, Pro ~$19.99, Ultra ~$99.99–$249.99 (I/O 2026 lowered the top tier). There's slight variation between sources → the number shown on **your country's official page** is the most reliable.
- The **Free tier is quite generous** — it already has Deep Research, image generation, and Live. Enough for most learners. Don't rush to pay.
- **Students:** the one-year free Pro offer has closed registration (see the box above) — if Google opens a new round, jump on it; otherwise just start with Free.
:::

### Payment

Through **Google Play / Google One** with an international card (Visa/Mastercard); some local cards/wallets work via Google Play depending on region.

::: warning 💳 Note for Vietnam / SEA readers — local payment methods
The exact list of **local** payment methods (which wallets/cards) varies over time and region, and reliable sourcing is thin. Check directly on **Google One** at purchase time. If a local card is declined, try an international Visa/Mastercard or the channel Google One suggests for your region.
:::

### Developer — AI Studio is free, no card required

```text
1. Open https://aistudio.google.com → sign in with Google.
2. Grab an API key (there's a free tier) or open the Build tab to "vibe-code" an app.
3. No credit card needed to start.
```

::: warning 🔁 Notable change: the Pro model leaves the API free tier
- The **API free tier** still has **Flash / Flash-Lite** free, but **as of Apr 1, 2026 the Pro model is removed from the free tier** → to use Pro via the API you must pay.
- The free tier is capped at **~5 requests/minute** — fine for experimenting, **too little for a multi-user app** → upgrade the tier or throttle client-side.
- **Reference API pricing (third-party):** Gemini 3.1 Pro ~**$2.00 input / $12.00 output** per 1M tokens (≤200K); above 200K it rises to ~$4/$18. Flash-Lite ~$0.10–$0.40/1M. The Batch API is roughly half the price.
:::

::: warning 🔒 Free-tier AI Studio / Gemini API data MAY be used to improve the model
A survival point for devs and prototypers: *per Google policy through mid-2026,* prompts/content sent through the **free tier (AI Studio / unpaid Gemini API)** **may be used to improve the product** (including human review). The **paid tier does NOT** use your data for training. → **Don't prototype with customer data / real data on the free tier.** Before committing, check the current policy at `ai.google.dev/gemini-api/terms`.
:::

### Installing a CLI coder — **Antigravity CLI** (replaces the Gemini CLI)

Google is shutting down the **Gemini CLI** (open-source) for Free/AI Pro/Ultra users as of **Jun 18, 2026**, replacing it with the **Antigravity CLI** (closed-source, written in Go, command `agy`). Here's the standard way to install from now on:

```bash
# macOS / Linux
curl -fsSL https://antigravity.google/cli/install.sh | bash

# Windows PowerShell
irm https://antigravity.google/cli/install.ps1 | iex

# Run (binary named 'agy', NO Node.js needed)
agy
```

The first time you run `agy` it opens the browser to sign in with Google; over SSH/headless it prints a URL + one-time code. Antigravity keeps **Agent Skills, Hooks, Subagents, Extensions** (packaged as plugins).

::: details Installing the old Gemini CLI (only relevant for Standard/Enterprise orgs now)
For **individuals**, the Gemini CLI **stops serving as of Jun 18, 2026** — this section only still works if you're a **Gemini Code Assist Standard/Enterprise** customer (paid API key) or an org using it through Google Cloud.

```bash
npx @google/gemini-cli            # run without installing
npm install -g @google/gemini-cli  # install globally (needs Node 18+, 20+ recommended)
```
:::

::: warning 🚧 IMPORTANT TURNING POINT: Gemini CLI → Antigravity (read carefully if you code via CLI)
Google is moving from **Gemini CLI (open-source) → Antigravity CLI (closed-source)** for individual users as of **Jun 18, 2026**. The Gemini CLI is kept only for **Standard/Enterprise** customers. The community reacted strongly because:
- It goes from **open to closed** (losing transparency / the ability to patch it yourself).
- It **lacked feature parity** at launch (The Register, FOSS Force, Hacker News all noted this).

→ If your pipeline needs an **open-source, long-term-stable CLI**, consider **Claude Code / Codex**, or wait for Antigravity to mature. Don't build a critical workflow with a hard dependency on a CLI that's mid-transition.
:::

---

## 03 · Hands-on workflows — step by step (with real prompts)

Here are 4 workflows that go "from start to finished." Each step has a way to **self-check** (verify) so you know you did it right.

### A) Deep Research in the app — a report with citations

**Step 1 — Turn on Deep Research.**
Open [gemini.google.com](https://gemini.google.com) → select **Deep Research** (or enable it from the tools menu).
→ **Verify:** you see Deep Research mode selected in the toolbar.

**Step 2 — Type a clear prompt.**

```text
Do deep research on [topic]. Outline the sub-topics, compare conflicting
viewpoints, prioritize 2025–2026 sources, and include a comparison table
and a list of citations. If any source is uncertain, say so instead of guessing.
```

**Step 3 — Review the plan.**
Gemini proposes a **plan** (the sub-topics it will search) → you edit/approve it → it browses the web for a few minutes → returns a report.
→ **Verify:** the plan matches your intent; the report has clickable source links, not 404 links.

**Step 4 — Export to Docs.**
Click to export to **Google Docs** to edit and save.
→ **Verify:** opening the Doc shows the content + full citations.

### B) The Deep Research + NotebookLM hybrid workflow (very powerful for study/research)

This is the "sweet spot" combo of the Google ecosystem — pairing **broad web search** (Deep Research) with **personal-document RAG that cites back to the source** (NotebookLM):

```text
1. Gemini Deep Research: gather web info on the topic → copy/export the report.
2. Go to notebooklm.google.com → create a new notebook.
3. Add that report as a Source + add your own original PDFs/documents.
4. Ask questions with citations linking BACK to the source; generate an
   Audio Overview (podcast); cluster insights into a framework.
```

→ **Verify:** every answer in NotebookLM **links back to the right passage in the source** you loaded (this is the difference — NotebookLM only answers based on your sources, so it fabricates less than ordinary chat).

### C) Coding with the Antigravity CLI

```bash
agy                      # open the agent TUI in the project folder
# in the session: describe the task in your language, the agent reads/edits
# multiple files, calls tools, and keeps the session history
```

**Configure project context** — create a file describing the project (inheriting the **context file** concept like the Gemini CLI's `GEMINI.md`): put the project description, code conventions, and build commands so the agent reads the right context:

```text
# Project context file (example contents)
Project: an order-management web app (React + Supabase).
Conventions: TypeScript, no 'any'; components live in src/components.
Build command: npm run build. Test command: npm run test.
DO NOT edit files in the /legacy folder.
```

::: warning 📁 Antigravity's context-file name & MCP paths DIFFER from the old Gemini CLI
The old Gemini CLI used `GEMINI.md` for context and `~/.gemini/settings.json` for MCP. **Antigravity changed the convention** — the context-file name, format, and MCP config paths are **not the same** as the old CLI. Don't follow the convention of a retired tool: look up the **exact file name & paths at `antigravity.google/docs/cli-getting-started`** before creating anything.
:::

→ **Verify:** run `agy` in the repo, and the agent reads the context file and follows the conventions you wrote (e.g. doesn't touch /legacy).

### D) AI Studio Build mode — build an app with no infrastructure

```text
1. aistudio.google.com → Build tab → describe the app in your language.
2. The agent generates code (auto-creating placeholder images with Nano Banana)
   and shows a preview.
3. Deploy to Cloud Run RIGHT inside AI Studio,
   or grab an API key to embed in your own app.
```

→ **Verify:** the preview runs as described; if you deploy, the Cloud Run URL opens.

::: tip ⚙️ Git tip before letting the agent edit files
Before running `agy` (or any agent that auto-edits files): **commit a clean state to git first**, work in a clean repo, **review each diff**, and split tasks small. There are reports of the CLI **deleting/editing code by mistake** in long sessions (see Sections 04/06) — committing first is the cheapest safety net.
:::

---

## 04 · Handy tips & common mistakes

### 🟢 Money-making tips

::: tip 7 tips to use Gemini like a pro
1. **If you live in Google, turn on Personal Intelligence** — let Gemini read Gmail/Drive/Calendar so it understands your work context (but see the privacy box below about sensitive data).
2. **Research → Deep Research; your documents → NotebookLM.** Don't make ordinary chat carry both — NotebookLM cites back far more reliably.
3. **The 1M-token context is a real advantage** — paste an entire long document / many files at once instead of chopping them up.
4. **Let the AI say "I'm not sure":** add *"if there's no source, say you're not sure"* → clearly reduces fabrication, especially with citations.
5. **Hit a 503 "overloaded"? Switch to Flash.** The Flash model recovers faster than Pro when servers are overloaded (see FAQ).
6. **Letting an agent (CLI) edit files → always in a clean git repo + review the diff.** Long sessions risk deleting things by mistake.
7. **Watch for student offers:** activate a free year of Pro before thinking about paying, if a round is open; AI Studio is also free for devs.
:::

### 🔴 Errors & pitfalls (read carefully — this part saves you)

::: warning 🚨 Citation hallucination — Gemini's #1 pitfall
Gemini can **very confidently cite sources that don't exist**, especially in legal/medical content. One third-party source reports a citation-hallucination rate of **~18% (vs Claude ~3%)** — *that figure isn't formal research*, but it's enough to:
- **Not trust it blindly** for legal/medical content.
- **ALWAYS verify** every citation/figure before putting it in an official document.
- Prefer **NotebookLM** (cites back to the sources you loaded) or **Perplexity** when you need high source accuracy.
:::

::: warning ⚠️ Other traps to remember
- **The CLI deleting/editing code by mistake** in long sessions ("state degradation") → always work in a clean git repo, review each diff, split tasks small.
- **The Pro model vanishing from the API free tier (as of Apr 1, 2026)** → only Flash/Flash-Lite remain free; switch models or pay.
- **The Gemini CLI ceasing to serve individuals (Jun 18, 2026)** → move to `agy` (Antigravity) or a Standard/Enterprise license.
- **The API free tier's 5 req/min** is too little for a shared app → upgrade the paid tier or throttle client-side.
- **I/O 2026 features (Gemini Omni/3.5/Spark)** are still rolling out, partly US-only — don't assume they're available in your region.
:::

::: warning 🔒 Privacy & data — read carefully if using it for work
This part really matters if you use Gemini for company work. Information per Google's documentation through early 2026:

**(a) The Gemini app (personal account) — where does the data go?**
- By default it **saves conversations** (Gemini Apps Activity), with default retention of **18 months** (changeable to 3 or 36 months).
- Google **samples some chats for human review** (including service-provider reviewers) to improve the model; **a conversation a reviewer touches can be kept up to 3 years** — and you **shouldn't paste sensitive data** into it.

**(b) How to turn off training / human review (personal plan):**
- Go to **myactivity.google.com/product/gemini** → turn off **Keep Activity**; or **myaccount.google.com → Data & Privacy → Gemini Apps Activity → Turn off**.
- Once off, **new chats aren't sent for review / aren't used for training**.

**(c) Gemini in Workspace (enterprise) — completely different from the personal tier:**
- Prompts and content **stay within the organization, aren't shared externally, and aren't used to train public models**; enterprise controls apply (data region, DLP).

**(c2) AI Studio / Gemini API:** *per policy through mid-2026* — on the **free tier** prompts **may be used to improve the model**; on the **paid tier** they are **not**. → Don't prototype with customer data on the free tier (see Section 02). Check `ai.google.dev/gemini-api/terms` before committing.

**(d) NEVER paste the following into the personal tier:**
- National ID numbers, bank card numbers, passwords, OTPs.
- Contracts/NDAs, confidential documents, proprietary source code.
- Customers' personal data (names, phone numbers, addresses, records) — under data-protection law (e.g. GDPR, or your local privacy regulation), this can constitute a **violation**.

**(e) When letting an agent (CLI) edit files automatically:** there's a risk of deleting/editing by mistake → **commit to git first, review the diff**.
:::

::: details ❓ FAQ & common errors (click to open)
**503 "model is overloaded" / "Deadline Expired" — what now?**
This is **Google's servers overloaded**, NOT a quota/billing error on your end. How to handle it: (1) **don't increase the timeout**; (2) use **exponential backoff retry**; (3) wait 5–30 minutes (≈70% recover within 60 minutes); (4) **fall back to Gemini 2.5/3 Flash** (recovers fast, 5–15 minutes). Common right after a Preview model launches (e.g. the Feb 19 & Feb 26, 2026 rounds).

**429 RESOURCE_EXHAUSTED — is it the same as 503?**
**Completely different.** 429 is **your personal quota / rate limit** → reduce frequency, upgrade the tier, or use the **Batch API**. Don't confuse 429 (your error) with 503 (Google's server error).

**The API free tier is only 5 req/min — what about my multi-user app?**
Too little for a shared app → **upgrade to the paid tier** or **throttle client-side** (queue requests). Consider the Batch API if you run in batches.

**The CLI deleted/edited my code by mistake?**
This has been reported in long sessions. Prevent it: always work in a **clean git repo**, **review each diff**, **split tasks small**, and commit often.

**I'm an individual and the Gemini CLI says it's ceasing service?**
Correct — as of **Jun 18, 2026** the Gemini CLI stops serving individuals. Move to **`agy` (Antigravity)** or use a **Standard/Enterprise** license.

**Gemini answers in English even though I asked in another language?**
Add an explicit instruction: *"Always answer in [language]."* or set it in Gems/Saved info so you don't have to repeat it.

**The Pro model vanished in AI Studio?**
As of **Apr 1, 2026** the Pro model was removed from the **API free tier** — only Flash/Flash-Lite remain free. Switch models or pay.

**The Antigravity CLI (`agy`) reports out of quota after ~20 runs/day?**
This is the community's most common complaint — *per reports through mid-2026,* Antigravity's free quota is only ~**20 runs/day** (the old Gemini CLI ~1,000/day). How to handle it: check the remaining quota in-session; if you code a lot, upgrade **Gemini Code Assist Standard** for a higher quota, or use **Claude Code / Codex** as a fallback. The quota number changes often by round — recheck at `antigravity.google/docs`.

**After installing Antigravity, typing `agy` says "command not found"?**
The installer drops the binary into `~/.local/bin`, which may **not yet be in your PATH**. The fix: add `~/.local/bin` to PATH (e.g. in `~/.zshrc` / `~/.bashrc`) then reopen the terminal; or call it by full path `~/.local/bin/agy` to test first.

**SheerID can't verify my university (when registering for the student offer)?**
A classic error while the offer is open: SheerID sometimes doesn't have your school's name in its list. The common workaround: pick "school not in the list" then **upload proof** (student card / .edu email), or retry with the school's official English name. *Note:* as of mid-2026 registration has closed (see Section 02) — this only helps if Google reopens a new round.
:::

---

## 05 · Exercises / mini-projects

Actually do 2–3 of the exercises below to turn "I understand" into "I can do it." Each has clear completion criteria.

### 🧪 Exercise 1 — Verified Deep Research (basic)

**Goal:** run a Deep Research report and build the reflex of verifying sources.

1. Go to [gemini.google.com](https://gemini.google.com) → turn on **Deep Research**.
2. Use the prompt:

```text
Do deep research on "electric vehicle trends in Southeast Asia 2025–2026."
Compare conflicting viewpoints, include a data table and a list of citations.
If any figure lacks a solid source, mark it "uncertain" instead of guessing.
```

3. **Open any 3 source links** in the report and check whether they're real (not 404) and actually match what Gemini cited.

**✅ Done when:** you have a report + confirmed at least 3 sources are real and matching (or **caught** a fabricated/wrong source — an even more valuable lesson).

### 🧪 Exercise 2 — Personal-document RAG with NotebookLM (important)

**Goal:** experience citing-back — the strongest fabrication-reducer in the Google ecosystem.

1. Go to [notebooklm.google.com](https://notebooklm.google.com) → create a notebook → load **1–2 of your own PDFs** (study materials, a report) as Sources.
2. Ask:

```text
Summarize this document into 5 key points. For each point, cite back to
the exact passage in the source. If information isn't in the document,
clearly state "not in the source."
```

3. Click each **citation-back** and check it jumps to the right passage in the original file.
4. (Optional) Generate an **Audio Overview** to hear the auto-generated podcast.

**✅ Done when:** every point links back to the right source passage; you clearly see NotebookLM **sticking to the document** rather than fabricating extra.

### 🧪 Exercise 3 — Vibe-code a small app in AI Studio (lightly advanced)

::: warning No card required
AI Studio is free, no credit card needed to start.
:::

**Goal:** build a working app from a natural-language description.

1. Go to [aistudio.google.com](https://aistudio.google.com) → **Build** tab.
2. Describe the app, for example:

```text
Create a "split-the-bill" web app: enter the total bill and the number of
people, show the amount per person, with a round-up button. Clean,
mobile-friendly UI.
```

3. Check the **preview**, refine with a few more sentences if needed.
4. (Optional) Deploy to **Cloud Run** right inside AI Studio.

**✅ Done when:** the preview app works correctly (enter numbers → get the right split). Getting a Cloud Run URL deployed is a bonus.

### 🧪 Exercise 4 — Coding with the Antigravity CLI in a clean repo (advanced)

::: warning ⚠️ Quota note
Antigravity's free quota is ~**20 runs/day** (*per community reports through mid-2026*) — enough for this small exercise, but don't waste it. Always **commit a clean state to git first** before letting the agent edit files.
:::

**Goal:** experience a CLI agent editing real files + the safety reflex (git + review the diff).

1. Install the Antigravity CLI (see Section 02). If typing `agy` says "command not found" → add `~/.local/bin` to PATH.
2. Go into a small repo (or create one), **`git init` + commit a clean state**.
3. Create a project context file (look up the correct file name at `antigravity.google/docs/cli-getting-started`), with 1–2 conventions, e.g. "DO NOT edit the /legacy folder."
4. Run `agy`, give it a small task in plain language (e.g. *"add a function that totals the bill and write a test for it"*).
5. **Review each diff** before accepting; run `git diff` to check whether the agent touched any out-of-scope files.

**✅ Done when:** the agent finishes the task following the conventions (doesn't touch /legacy), you can review the diff, and you know how to `git restore` if it edits something by mistake.

---

## 06 · Case studies & real use-cases (from the community)

This section gathers **real** examples from blogs, official Google announcements, and aggregated community discussion (Hacker News, Medium) through early 2026. The point: to show you how Gemini runs **in the real world** — both when it shines and when it becomes a trap.

::: warning ⚠️ Read carefully about source reliability
Some of the content below is **personal / second-hand experience** — i.e. dev blogs, Hacker News posts, or Google's own vendor claims. So:
- Statements like "convenient but it misses things" are the author's **subjective assessment** → read with a balanced attitude.
- Figures **Google publishes itself** (e.g. Deep Think winning IMO gold) are **vendor claims** — weigh accordingly.
- Whatever's **certain** (official Google / press) is marked as such; whatever's just "per a personal blog" is also marked.
:::

### 🔬 CS1 — Materials-science literature review: convenient, but it misses deep papers

- **Context:** A researcher (computational-materials PhD background) tested **Deep Research** to do a literature review on "generative models for inorganic crystal structures."
- **What they did:** Cross-checked the Deep Research results against **27 papers** in their personal library.
- **Result / lesson:** Convenient, but each deep-research tool has a **different "taste"** in picking papers, and **often misses deep / paywalled material**. → Deep Research is good for **sketching a framework & finding directions**, but **can't replace reading the original papers yourself** for serious research.
- **Source:** Xiangyu Yin's blog (2026) — *a researcher's personal experience*.

### 🏛️ CS2 — STOC 2026 used Gemini to auto-generate feedback for submissions

- **Context:** **STOC 2026** (a top theoretical computer science conference) used Gemini to generate **automated feedback** for submissions.
- **Result:** There's a testimonial from **Prof. Shuchi Chawla** praising results that **exceeded expectations**.
- **Lesson:** Gemini is strong enough to support serious academic processes (screening/feedback), not just casual chat. But this is a **context with expert oversight** — not a replacement for human reviewers.
- **Source (official):** research.google blog (2026).

### 📝 CS3 — Master's thesis on 5G Anomaly Detection: build a "skeleton," then edit right in Docs

- **Context:** A student doing a master's thesis on **5G Anomaly Detection**.
- **What they did:** Used Gemini to build a **~1,000-word "skeleton"** for the literature-review section, then **edited it right in Google Docs**.
- **Result / lesson:** This is a practical sweet spot of Gemini for thesis writers — **frame the structure fast + refine in Docs** (Workspace integration), instead of writing from a blank page. You still have to rewrite/verify the academic content yourself.
- **Source:** UCStrategies / aggregated sources (2026).

### 📊 CS4 — NotebookLM for Quarterly Business Reviews & sales battlecards

- **Context:** Enterprise teams used **NotebookLM** for **Quarterly Business Reviews (QBR)** and sales.
- **What they did:** Loaded strategy documents → got a **storyline for the deck**, **talking points for leadership**, and a Q&A where **every answer links back to the source**. The sales team turned product briefs / pricing / win-loss into a **battlecard**.
- **Result / lesson:** NotebookLM shines at **internal-document RAG with citations** — exactly the work that needs reliability (when leadership asks "where's the source?", you click to show it instantly). This pattern applies to any team with its own document repository.
- **Source:** UCStrategies; Medium @nitinfab (2026).

### 🏆 CS5 — Gemini 3 Hackathon ($100k): build a real product under a time constraint

- **Context:** The **Gemini 3 Hackathon** ($100k, Dec 2025–Feb 2026).
- **What they did:** Developer **Nisrine Amimi** recounts the experience of building a real product under a time constraint with Gemini 3.
- **Result / lesson:** She describes it as **"completely different from just talking about AI"** — i.e. the real value comes from **getting hands-on and shipping a product** under a deadline, not from reading demos. The lesson for learners: you absorb AI far better by **doing real projects**.
- **Source:** Medium / Google Cloud Community — *personal experience*.

::: warning ⚠️ CS6 — Vibe-coding with Gemini 3 in the CLI: strong "one-shot" but the CLI deleted code by mistake (a real trap)
- **Context:** A "5 things to try" piece on vibe-coding with **Gemini 3 Pro in the Gemini CLI**, discussed on **Hacker News**.
- **What happened:** The community noted the model is strong at **"one-shot"** (finishing in a single pass), **but** there was an incident of the **CLI deleting code by mistake** in a long session.
- **Lesson:** This is a classic **trust-boundary** warning — when letting an agent auto-edit files, **always commit to git first, review the diff, and split tasks small**. "One-shot" power doesn't offset the risk of losing code if you have no safety net.
- **Source:** Hacker News (2026) — *aggregated community discussion*.
:::

::: tip ⚖️ A dissenting view (for balance)
A **former Google employee** once called Gemini the **"most frustrating"** model they'd used for dev work (paraphrased, no @handle attached). We raise this not to bash it — but so you see that **not every experience is positive**. Real-world experience depends heavily on the task type: Gemini shines at research/multimodal/long-context, but for multi-file coding many people still find Claude has the edge.
:::

### 📚 Notable sources (title + context)

These are accessible sources — official Google, personal blogs, and community discussion:

**Official sources with links (trustworthy):**
- Gemini 3 (launch blog, official) — https://blog.google/products/gemini/gemini-3/
- Gemini 3.1 Pro model card (official DeepMind) — https://deepmind.google/models/model-cards/gemini-3-1-pro/
- Gemini CLI → Antigravity transition announcement (official) — https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
- Gemini Apps privacy (official support) — https://support.google.com/gemini/answer/13594961

**Illustrative examples (not citable sources — just retold so you get the picture):**
- The materials-science literature-review experience (a researcher's personal blog) — *illustrative, no verifiable URL attached*.
- STOC 2026 using Gemini for submission feedback (research.google blog) — *official Google, search research.google if you need to verify*.
- NotebookLM for enterprise QBR & battlecards (aggregated Medium/UCStrategies) — *illustrative, no verifiable URL attached*.

---

## 07 · Summary & Official sources

::: tip 📌 5 things to take away
1. **Gemini = a whole product family** (foundation model + chat app + Workspace + dev tools), strongest when you live inside Google.
2. **Multimodal + 1M-token context + Deep Research/NotebookLM** is the sweet spot — research, image/video, long documents.
3. **Anti-fabrication = let it say "I'm not sure" + prefer NotebookLM (citing back) + ALWAYS verify** (Gemini fabricates citations more than Claude).
4. **It's available legally worldwide**; the **Free tier is generous** enough for most schoolwork. (The one-year free Pro student offer **has closed registration** — check `gemini.google/students` for a new round.)
5. **The CLI turning point:** the Gemini CLI stops serving individuals **Jun 18, 2026** → use **`agy` (Antigravity)**, but the free quota is only ~20 runs/day. When letting the agent edit files, **commit to git + review the diff**.
:::

### Official links from Google (worth bookmarking)

These are the **official** pages for checking the latest info yourself — always trust these links over third-party roundups:

- **Gemini chat app:** https://gemini.google.com
- **Plans & pricing:** https://gemini.google/subscriptions/
- **Developer / Gemini API:** https://ai.google.dev (pricing: https://ai.google.dev/gemini-api/docs/pricing)
- **Gemini 3 (launch blog):** https://blog.google/products/gemini/gemini-3/
- **Gemini 3.1 Pro model card:** https://deepmind.google/models/model-cards/gemini-3-1-pro/
- **Antigravity (CLI getting started):** https://antigravity.google/docs/cli-getting-started
- **Gemini CLI → Antigravity announcement:** https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
- **Gemini Apps privacy:** https://support.google.com/gemini/answer/13594961

::: details 🔎 Confidence notes (research through early June 2026)
- **Certain (official Google sources):** localized prices on the subscriptions page, the Gemini 3 launch date (Nov 18, 2025), the Gemini CLI shutdown on Jun 18, 2026, the Antigravity install commands, the privacy/retention policy of 18 months, AI Studio being free.
- **Fairly certain (reputable press):** the ~$5 entry plan. The one-year free Pro student offer **did genuinely exist but registration closed** (windows ~Oct 8–Dec 9, 2025 in some regions) — no longer in effect at present.
- **Reference/third-party (tagged "~"/hedged):** all comparison benchmarks (SWE-bench Claude ~87.6% vs Gemini 3.1 Pro ~80.6%, citation-hallucination rate 18% vs 3%, the Deep Think scores), per-token API pricing, Antigravity's free quota ~20/day vs the old Gemini CLI ~1,000/day, the new Antigravity config paths.
- **Thin sourcing / links to check at build time:** the list of local payment methods; the names/details of I/O 2026 models (3.5 Flash is GA, 3.5 Pro/Omni/Spark still rolling out, partly US-only); the URLs `gemini.google/subscriptions/` and `support.google.com/gemini/answer/13594961` (the support article ID may change — open it to check before trusting it).

*Figures (prices, models, features) may have changed — always recheck at gemini.google.com and ai.google.dev.*
:::
