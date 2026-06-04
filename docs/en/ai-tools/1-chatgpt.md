---
title: 'ChatGPT — An AI assistant that gets work done'
description: 'A hands-on guide to ChatGPT (OpenAI): free sign-up, plans & pricing (Go from $8), picking the GPT-5.5 model, anti-hallucination prompt templates, Custom GPTs, Projects, Agent mode — with practice exercises.'
---

# ChatGPT — An AI assistant that gets work done

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">💬</p>

::: tip 🔥 Hands-on — 30 seconds
You're a teacher. It's 10pm and you still have to plan tomorrow's lesson plus summarize a 40-page PDF for the morning class. Open **ChatGPT**, drop in the PDF, and type: *"Summarize this document into 5 key points + 3 things to watch out for"* → 20 seconds later you have a draft. Build the lesson plan around an Objectives – Activities – Assessment structure → 2 more minutes. A 2-hour job shrinks to 15 minutes.
**💸 Real benefit:** an assistant that can write, translate, read documents, and code — running 24/7, with a cheap plan from just $8/month. Less hiring, fewer late nights.
:::

> **"ChatGPT doesn't just answer — it writes, translates, reads files, runs code, generates images, and holds a spoken conversation.**
> **But it also makes things up very confidently. Knowing how to use it properly is the difference between a 'tool that pays for itself' and a 'trap that misleads you.'"**

::: tip 🎯 After this chapter you'll be **able to**
- **Sign up** for a free ChatGPT account and know how to pick the plan that fits your budget.
- **Write clear prompts** (role + context + format) so the output stays on target.
- **Pick the right model** (Instant for quick jobs, Thinking for deep reasoning) and **turn on web search** to cut down on made-up answers.
- **Upload files & images** (PDFs, spreadsheets) to summarize, extract, and analyze data.
- **Build a Custom GPT / Project** for repeat work, so you don't re-type the same instructions every time.
- **Spot & prevent** hallucinations — a survival skill when you use AI for real work.
:::

::: warning ⏱️ Note on the "shelf life" of this information
This reflects what's true as of **mid-2026**. AI tools change fast (model names, prices, features) — the numbers below may already have shifted by the time you read this. Go straight to [chatgpt.com](https://chatgpt.com) and [help.openai.com](https://help.openai.com) to check the latest.
:::

---

## 01 · What this tool is & when to use it

**ChatGPT** is the generative AI assistant from **OpenAI**. You type a question or request in natural language — in **any language**, including yours — and it answers, writes, codes, analyzes data, generates images, searches the web, processes files and images, and talks back with voice.

As of mid-2026, the core runs on the **GPT-5.5** model family. Specifically, **GPT-5.5 Instant** has been the default model for all users since **2026-05-05** (replacing GPT-5.3 Instant). Official URL: **https://chatgpt.com**.

::: tip 🔑 Three things people mix up (read carefully)
- **ChatGPT** = the product/interface for end users (what you use at chatgpt.com). This chapter is about this.
- **OpenAI API** = a programmatic, token-billed service for developers — **different** from ChatGPT.
- **GPT-5.5** = the name of the *model* underneath; **ChatGPT** is the *product* that uses it. And a **Custom GPT** = an assistant you build yourself (no code required), which is something else entirely from a "GPT model."
:::

**What ChatGPT does well (per research):**

| Task group | What it can do | Where you can use it |
|---|---|---|
| **Writing & language** | Answer, write, translate, summarize, brainstorm in many languages | Web, iOS/Android app, desktop (macOS/Windows) |
| **Fresh info** | Web search inside answers, usually with source links you can verify | On by default |
| **Voice** | Advanced Voice — natural two-way speech you can interrupt, continuous live translation; Record Mode captures meetings → turns them into action items | App, paid plans |
| **Files & data** | Upload PDFs/images/spreadsheets to summarize/extract/analyze; Code Interpreter runs Python for calculations & charts | Attach in chat |
| **Images** | Generate images from a description right in the chat | In chat |
| **Multi-step automation** | Agent mode & Deep Research: hand it one messy task → it plans, uses tools, checks itself, and works until done | Paid plans, usage-capped |

::: warning 🔁 Notable change: Canvas is gone
**Canvas** (the separate editing/code window) is **no longer** in GPT-5.5 Instant/Thinking. Writing and coding now happen **directly inside the answer** (writing blocks / code blocks). If you were used to the old Canvas workflow — just work right in the answer now.
:::

**Use ChatGPT when:** you need to write/translate/summarize quickly, ask knowledge questions, read long documents, draft code, brainstorm ideas, or generate illustrative images. **Think twice when:** the stakes are high (legal/medical/financial) — always keep a human in the loop and never ship raw output.

::: tip 📌 Real example — "connecting the dots" that experts missed
A user had mysterious symptoms for **over 10 years**, ran every MRI/CT/blood test, and still got no answer. They pasted all their lab results into ChatGPT, and it pointed in the right direction — an **MTHFR gene mutation** — which doctors later confirmed; treatment with B12 cleared things up. OpenAI president Greg Brockman reshared the case, so it went viral. **Lesson:** ChatGPT's strength is stitching together scattered data points; but this is a personal anecdote — it's **no substitute for clinical examination**, and should only be used to suggest a direction. (Details + a second case in Section 06 · CS1.)
:::

### Versus other tools — "when to pick which"

There's no tool that "wins on everything." ChatGPT is strongest on **versatility** (writing, coding, image generation, voice, and agents all wrapped into **one app** with the biggest ecosystem). But depending on the job, another tool may fit better. The table below is short and impartial, as of mid-2026:

| Tool | Strong at | Pick it when |
|---|---|---|
| **ChatGPT** (OpenAI) | Most versatile, biggest ecosystem, images/voice/agents/Custom GPTs in one app | You want an "all-in-one" assistant with the most features |
| **Claude** (Anthropic) | Coherent long-form writing, quality code, sticks to the spec, safe, large context | Writing long documents, serious coding, when you need it to follow the spec with few "extra suggestions" |
| **Gemini** (Google) | Deep Google Workspace integration (Docs/Gmail/Drive), a fairly strong free tier | You live in the Google ecosystem and want a generous free tier |
| **Perplexity** | Search-first, answers with clear source citations | Looking up fresh info that needs trustworthy sources; quick research with citations |
| **DeepSeek** | Cheap, has an open-source build, good performance/price | Tight budget, need to self-host — **note: data is processed in China, so weigh this for sensitive work** |
| **Grok** (xAI) | Real-time access to data from X (Twitter), a blunt writing voice | You need real-time info/trends from the X social network |

::: tip 💡 Quick takeaway
If you'll only pick **one** tool to start with and use for most things → **ChatGPT** is the safe choice. When your work leans toward **serious coding / long-form writing** → also try **Claude**; **lookups that need sources** → **Perplexity**; **already on Google Workspace** → **Gemini**. Running two tools side by side is perfectly normal.
:::

---

## 02 · Sign-up & access — pricing & access

### Does it work where you are? — **Yes, in most places.**

ChatGPT is available across OpenAI's supported-countries list (**no VPN needed** in most regions). What matters for your wallet: the cheap **ChatGPT Go ($8/month)** plan is now widely available, and in a growing number of markets you can **pay in your local currency** — you're no longer forced to pay in USD or use an international credit card. **The Free plan needs no card at all.**

::: tip 🌏 Note for Vietnam / SEA readers — local payment
ChatGPT works directly in Vietnam **without a VPN**. ChatGPT Go opened in Vietnam in **October 2025**, listed at **≈132,000đ/month (VAT included)**, and Vietnam is one of the markets where you can **pay in local currency (VND)** — no international card required. The exact local payment methods vary over time and region, so check at purchase time on [chatgpt.com/pricing](https://chatgpt.com/pricing/). If a local card is declined, try another card or the channel the app suggests for your region.
:::

### Sign up in 30 seconds

```text
1. Open https://chatgpt.com (or download the iOS / Android / desktop app).
2. Sign up with email, or use a quick login via Google / Apple / Microsoft.
3. Land on the empty chat screen → start typing in your language and you're good to go.
```

### Plans & pricing (updated mid-2026, USD/month)

| Plan | Price | Who it's for / what you mainly get |
|---|---|---|
| **Free** | $0 | Get started. Access to **GPT-5.5 Instant**, ~10 messages/5 hours then drops to the **mini** build of GPT-5.5 (basic, unlimited). Some markets show ads. |
| **Go** | $8 (≈132,000đ/month) | **A great value pick** — pay in local currency where supported, removes most limits, higher daily caps, double the memory of Free. |
| **Plus** | $20 | The most common tier: GPT-5.5 routing, Advanced Voice, Agent mode, **Custom GPT creation**, ~10 Deep Research runs/month. |
| **Pro (Codex)** | $100 | Launched 2026-04-09, an agent-coding-focused branch (Codex). Full model set including **GPT-5.5 Pro**, limits ~5× Plus. |
| **Pro (Max)** | $200 | The top branch: ~20× the limits, very large context (up to ~680 pages of documents), Sora access. |
| **Business** | ~$25/seat | Billed monthly/annually depending on cycle, for teams/small businesses; **chats are not used for training by default**. |
| **Enterprise** | Custom | Large organizations; **chats are not used for training by default**. |

::: tip 💡 Notes on model & context (per official docs as of mid-2026)
- **GPT-5.5 Instant** is the default model for **all signed-in users** (including Free) since **2026-05-05** — so the Free row above is consistent with this, not a contradiction.
- A **context window up to ~1M tokens** is a general trait of the **GPT-5.5 / GPT-5.5 Pro** family, not the privilege of one plan. Plus already has a large context (reads documents ~320 pages long), and Pro (Max) is larger (~680 pages).
- The Business figure (~$25/seat) and the "≈132,000đ" for Go are **reference prices per 2025–2026 sources**, and can change with billing cycle and local tax — re-check the official pricing page before you buy.
:::

::: tip 💸 Tips for choosing a plan
- **New / light use** → **Free** is enough to start, no card needed.
- **Regular use for study / personal work** → **Go ($8, pay in local currency where available)** — cheap, removes the annoying limits. The best value for most people.
- **Only move to Plus ($20)** when you genuinely need **Advanced Voice / Agent mode / Custom GPT creation / Deep Research** — don't overpay for features you won't touch.
:::

::: warning ⚠️ Think before you open your wallet
Don't jump straight to a high tier because it "sounds impressive." Use Free for a few days; when you hit a limit (~10 messages/5 hours) or miss a specific feature → only then upgrade to exactly the plan you need. Go covers 80% of personal needs.
:::

---

## 03 · Hands-on workflow — step by step (with real prompts)

This is the "from start to done" process. Each step includes a way to **verify** you did it right.

### Step 1 — Sign in

Open [chatgpt.com](https://chatgpt.com) or the app → sign in with Google/email.
→ **Verify:** you reach the empty chat screen.

### Step 2 — Type a clear request (state role + context + format)

This is the single most important skill. A vague prompt → a vague result. Spell out: **what role you want it to play**, **what the context is**, **what format the output should take**.

```text
You are a copy editor. Rewrite the passage below so it reads cleanly,
keeping the meaning, and return it as bullet points: [paste the passage]
```

→ **Verify:** you get a relevant answer in exactly the format you asked for (here, bullet points).

### Step 3 — Pick the right model

The model picker is at the **top** of the chat screen:
- **Instant** → quick jobs, everyday Q&A.
- **Thinking** → multi-step reasoning problems that need accuracy (paid plans).

→ **Verify:** the model name shown in the top bar is correct.

### Step 4 — Turn on / keep web search for fresh info + ask for sources

For news, fresh numbers, or anything that needs to be accurate — ask it to search the web and cite sources. This is your strongest **shield against hallucination**:

```text
Answer based on web search and include a source link for each figure.
If you're not sure or have no source, say "I'm not sure" instead of guessing.
```

Hard task → **break it into** multiple steps/prompts instead of asking one long question.
→ **Verify:** the answer has clickable source links; open one and confirm it's a real source, not a 404.

### Step 5 — Process documents (PDFs, images, spreadsheets)

Click the **attach** button, upload the file, then ask:

```text
(attach a PDF)
Summarize this document into 5 key points + 3 things to watch out for,
one sentence each.
```

→ **Verify:** it references the **actual file content** (correct numbers, correct names from the document) and doesn't make things up.

### Step 6 — For repeat work: build a Custom GPT or Project

If you do the same kind of work over and over (lesson plans, code reviews, blog posts), don't re-type the instructions each time.

**Option A — Custom GPT** (needs a paid plan):
sidebar → **Explore GPTs** (or `chatgpt.com/gpts`) → **Create** → fill in **Name / Description / Instructions**, attach **Knowledge files**, toggle **Capabilities**, set sharing permissions.

Three parts that are easy to skip but matter:
- **Knowledge (knowledge files):** upload background documents (e.g. your school's lesson-plan framework, a brand guideline, a price list) so the GPT **always answers from them** instead of making things up. This is how you "teach" a GPT your own data without code.
- **Capabilities:** toggle **Web Search**, **Code Interpreter** (run Python for calculations/charts), and **image generation** — whatever your GPT needs.
- **Actions (advanced, optional):** let the GPT **call external APIs** (e.g. look up an order, pull data from your system). Requires a bit of technical know-how; beginners can skip it — Knowledge alone is enough for most work.

Example Instructions section:

```text
You are an assistant that helps teachers write lesson plans.
Always ask which grade/subject if it's missing.
Answer in this structure: Objectives - Activities - Assessment.
Do not make up figures.
```

**Option B — Project:** a workspace that bundles multiple chats + its own instructions + files (supports up to **40 files/project**) for a given workflow.

→ **Verify:** the GPT/Project behaves as configured (e.g. it asks back for grade/subject and answers in the right structure).

::: tip 📌 Real example — agent coding in production (Codex)
Cisco uses **OpenAI Codex** (the agent coding inside ChatGPT) for one of a developer's most repetitive jobs: code review. For each task, Codex reads the codebase in a sandbox, runs tests/linters, then opens a pull request with a description of "what it did and how it tested." Cisco reports **up to a 50% cut in PR review time**; OpenAI says Codex usage grew more than 10×, with customers including Duolingo and Rakuten. **Lesson:** for repeat work, letting AI run a fixed process (like Codex, or a Custom GPT/Project you build yourself) is far more valuable than copy-pasting each time. This is OpenAI's own **vendor claim**, so read it with measured skepticism. (Details in Section 06 · CS2.)
:::

### Step 7 — Multi-step work / deep research: Agent mode or Deep Research

Hand it a goal and let it plan, use tools, check itself, and work until done.

- **Agent mode** (paid plans): suited to **multi-step work with actions** — e.g. *"find 5 suppliers of X in this city, build a price comparison table, and include links,"* or *"read this file then draft a summary email to my boss."* It browses the web, uses tools, and synthesizes the result.
- **Deep Research** (paid plans, **usage-capped** — e.g. Plus is around **~10 runs/month**, a number OpenAI often adjusts): suited to **deep research that needs a long, sourced report** — e.g. *"survey the home water-purifier market for 2026, with citations."* It runs longer (a few minutes) but produces a dense, sourced synthesis.

→ **Verify:** you get a complete output — and **ALWAYS re-check the important figures/sources** before using them (Deep Research can still cite sources incorrectly; see Section 04).

::: tip 🎙️ Bonus — live voice translation
With Advanced Voice, you can use it as a pocket interpreter:

```text
Translate what I say into English and keep translating
until I tell you to stop.
```

It listens to you speak in one language and reads out the English version continuously — handy when hosting international guests.
:::

::: tip ⚙️ 4 "hidden" features worth turning on right away (huge time savers)
- **Custom Instructions** — *Settings → Custom Instructions*: pre-fill two boxes (box 1: who you are / your job / your goal; box 2: what format/tone you want, e.g. *"always answer concisely, with examples"*). Declare it **once**, apply it to every chat — no re-typing context each time.
- **Memory** — ChatGPT can **automatically remember** facts/preferences you've shared (e.g. "I teach 9th-grade literature") to use in later chats. Turn it on/off/clear it at *Settings → Personalization → Memory*. Want one session **unaffected** by memory → use **Temporary Chat**.
- **Connectors** — connect ChatGPT to **Google Drive, OneDrive/SharePoint…** so it reads your files directly (plan-dependent). Handy when documents already live in the cloud, no manual upload.
- **Share link & Export** — share a chat via link, or **export all your data** (*Settings → Data Controls → Export*). Note: a public share link can leak content — see the Privacy box in Section 04.
:::

---

## 04 · Handy tips & common mistakes

### 🟢 Tips that pay off

::: tip 7 tips for using ChatGPT like a pro
1. **The most reliable combo right now:** turn on **web search + Thinking mode** for questions that need high accuracy. This is the most effective way to cut hallucinations.
2. **Assign a role + state the output format** ("You are...", "return it as a table") → the answer stays far closer to your goal than with a vague prompt.
3. **Break complex work into multiple prompts** instead of one long multi-part question.
4. **Let the AI say "I don't know":** add *"if you're not sure, say so"* → a clear drop in made-up content.
5. **If the AI rambles or goes wrong → open a NEW chat** to clear the bad context, instead of trying to fix it in the same session (a broken context drags the whole session off course).
6. **Use Projects to separate context:** each project has its own instructions (e.g. "write blog" vs "review code") → no re-typing each time.
7. **Consider the Go plan ($8, pay in local currency where available)** — cheap and enough for study/personal use; only move to Plus when you need Voice/Agent/Custom GPT/Deep Research.
:::

### 🔴 Mistakes & traps (read carefully — this part saves you)

::: warning 🚨 Hallucination — trap number 1
The AI can **very confidently give you wrong information**, especially with:
- Niche / low-data topics.
- Multi-step reasoning problems.
- **Fabricated sources**: citing books/articles/studies that **don't exist**, or links that lead to a **404** page.

**Warning signs of a hallucination:**
- No source cited.
- Contradicts a widely known fact you already know.
- Ask it a different way → you get a completely different answer.

**→ ALWAYS verify against a trustworthy source** before using it for real work.
:::

::: tip 📌 Real example — fabricated sources got a lawyer fined $10,000
Lawyer Amir Mostafavi (California) used ChatGPT to polish an appellate brief **but didn't re-check the citations**. The court found that **21 of 23 case citations in the brief were fabricated** and fined him **$10,000** (September 2025). Context: roughly 712 rulings worldwide involve AI-fabricated content, ~90% of them in 2025. **Lesson:** ChatGPT fabricates "sources that sound very real" — verifying every citation/figure before it goes into an official document is **mandatory, not optional**. (Details in Section 06 · CS3.)
:::

::: warning ⚠️ Other traps to remember
- **Knowledge cutoff:** the model's built-in knowledge is frozen at a point in time. For **fresh** news/numbers → **turn on web search**, don't trust the model's static memory.
- **The Free plan is usage-limited** (~10 messages/5 hours) before dropping to a smaller model; many powerful features (Agent, Advanced Voice, **Custom GPT creation**, Deep Research) are **paid-only**.
- **Creating a Custom GPT needs a paid plan** — Free accounts can only **use** existing GPTs, not **create** them.
- **Canvas is gone** in GPT-5.5 Instant/Thinking — if you knew the old workflow, just work directly in the answer now.
:::

::: warning 🔒 Privacy & data — read carefully if using it for work
This matters a lot if you use ChatGPT for company work. Per OpenAI's documentation as of mid-2026:

**(a) Where does your data go?**
- On **personal plans (Free / Go / Plus)**, by default OpenAI **may use chat content to improve (train) the model** — unless you turn it off yourself.
- On **Business / Enterprise** plans, by default your data is **NOT** used for training.

**(b) How to turn off training (personal plans):**
- Go to **Settings → Data Controls** → turn off the **"Improve the model for everyone"** option. Once off, new chats won't be used for training.

**(c) Temporary Chat:**
- There's a **Temporary Chat** button at the top of the chat screen. That session is **not saved to history, not used for training**, and has no memory. Great for handling sensitive content or just asking a quick one-off.

**(d) NEVER paste the following into a regular chat:**
- ID/passport numbers, bank card numbers, passwords, OTPs.
- Contracts/NDAs, confidential documents, your company's proprietary source code.
- Customers' personal data (names, phone numbers, addresses, records) — under data-protection law (e.g. GDPR, or your local privacy regulation), this can constitute a **violation**.

**(e) Be careful when sharing:** a public Custom GPT and **share links** can accidentally expose the content/instructions you entered. Double-check privacy settings before sharing.
:::

::: warning ⛔ When NOT to use ChatGPT (or to use it very cautiously)
ChatGPT is good at a lot, but **not every task fits**. Avoid — or always keep a human in the loop — in these cases:
- **Arithmetic that must be exact** (accounting, engineering) — language models are prone to math errors. If you need it, **turn on Code Interpreter** so it runs real Python.
- **Real-time news / prices / exchange rates** — built-in knowledge is time-limited; **you must turn on web search**.
- **Legal / medical / financial advice for a final decision** — reference the direction only; the decision must rest with a responsible expert.
- **Confidential / personal data** (see the Privacy box above).
- **Work that needs a "legally accountable source"** — AI output is not legal grounds.
- **Niche language/culture nuances** (local dialects, country-specific official/administrative terminology) — it may use the wrong term, so have a native speaker review it.
:::

::: details ❓ FAQ & common errors (click to open)
**"You've reached your limit" / out of messages — what now?**
The Free plan limits you to ~10 messages/5 hours then drops to the mini build. How to handle it: (1) **wait for the reset** after a few hours; (2) switch to a **lighter model** that still works; (3) if you need steady use → upgrade to **Go ($8)**.

**Sign-up/sign-in error, or a local card declined?**
- Try signing in via **Google/Apple/Microsoft** instead of email.
- For the Go plan, prefer **paying in local currency** (supported in a growing number of markets) over forcing an international credit card. If a local card is declined, try another card or the payment channel the app suggests for your region.

**File upload fails / "file too large" / can't be read?**
- Check the **format** (PDF, DOCX, XLSX, images, TXT… are supported; exotic formats aren't) and the **size** (split a too-large file, or export a leaner PDF).
- A **scanned image PDF** (not real text) may be read incompletely — use a version with text, or tell it to "read it with OCR."

**ChatGPT answers in English even though I asked in another language?**
Add an explicit instruction: *"Always answer in [your language]."* or set it in **Custom Instructions** so you don't have to repeat it each time.

**"Network error" on long answers?**
Common with very long answers. To reduce it: ask it to **break the answer into parts** ("answer part 1 first"), or reload the page and type *"continue."* A flaky connection also triggers this.

**App slow / won't load — do I need a VPN?**
**No VPN needed** in supported regions — use it directly at [chatgpt.com](https://chatgpt.com). If it's slow, try a different network or check [status.openai.com](https://status.openai.com) for a system incident.
:::

---

## 05 · Exercises / mini-project

Actually do 2–3 of the exercises below to turn "I understand it" into "I can do it." Each has a clear completion criterion.

### 🧪 Exercise 1 — A prompt with role & format (basic)

**Goal:** feel the difference between a vague prompt and a structured one.

1. Ask vaguely: `Write about the benefits of reading.`
2. Then ask again with structure:

```text
You are an education expert. Write 5 benefits of reading for high school students,
one short sentence each, returned as bullet points, in an inspiring tone.
```

**✅ Done when:** you clearly see the second version stays closer to the request (right count, right format, right tone). Write one sentence: why a clear prompt produces a better result.

### 🧪 Exercise 2 — Read a file + prevent hallucination (important)

**Goal:** train the verification reflex — a survival skill when using AI.

1. Find any PDF (a document, report, or article). Attach it to the chat.
2. Use this prompt:

```text
(attach a PDF)
Summarize this document into 5 key points + 3 things to watch out for.
Base it only on the file's content. If something isn't in the file, write "not in the document."
```

3. **Open the original file and compare**: are those 5 points actually in the file? Did it "add" anything?

**✅ Done when:** you can confirm each point is in the document (or you catch where it made something up). This is a reflex you should keep forever.

### 🧪 Exercise 3 — Build your own assistant (Custom GPT or Project)

::: warning Needs a paid plan
Creating a Custom GPT needs a paid plan. If you're on Free, you can still do a "lite" version: create a **Project** (if your plan allows) or simply save an Instructions snippet to paste in each time.
:::

**Goal:** build an assistant for something you do repeatedly.

1. Think of one thing you do often (e.g. lesson plans, captions, reviewing a code snippet).
2. Create a Custom GPT (`Explore GPTs` → `Create`) or a Project, fill in the Instructions, for example:

```text
You are an assistant that helps teachers write lesson plans.
Always ask which grade/subject if it's missing.
Answer in this structure: Objectives - Activities - Assessment.
Do not make up figures.
```

3. Hand it a real task and see whether it **asks back for grade/subject** + answers in the right structure.

**✅ Done when:** the assistant behaves as configured without you re-stating the instructions each time.

---

## 06 · Case studies & real use cases (from the community)

This section gathers **real** examples from the press, court records, OpenAI's official announcements, and community discussion roundups (Reddit, dev blogs) up to early 2026. The point: to show you how ChatGPT performs **in the real world** — both when it shines and when it becomes a trap.

::: warning ⚠️ Read carefully on source reliability
A large share of what follows is **second-hand** — i.e. roundups of Reddit/X discussions via articles and blogs, **not** direct quotes from the original threads. So:
- Numbers like *"saves X hours/week,"* *"cut tickets 70%,"* *"50 interviews"* are all **self-reported by individuals**, not independently verified → read them skeptically.
- The **upvote** counts for each prompt come from a roundup article, not from re-counting each thread.
- Figures **published by OpenAI itself** (e.g. Codex effectiveness) are **vendor claims** — weigh them accordingly.
- Where something is **certain** (with press/court/official sourcing) it's stated clearly; where it's only "per a roundup" that's stated too.
:::

### 🩺 CS1 — ChatGPT pointed to the right gene mutation after 10 years of doctors stumped

- **Context:** A user had unexplained symptoms for over 10 years — spinal MRI, CT, blood tests, a Lyme test, all inconclusive.
- **What they did:** Entered **all their lab results + symptom history** into ChatGPT and asked it to analyze for a direction.
- **Result:** ChatGPT flagged a possible link to the **A1298C mutation on the MTHFR gene**. The doctor was "extremely surprised" it was right; treatment with B12 supplements made most symptoms disappear. **OpenAI president Greg Brockman** reshared the case on X, which spread it widely.
- **A second medical case (same article):** Gil Spencer (CTO of WitnessAI) injured his knee skiing; the MRI was inconclusive; he uploaded the scan images to ChatGPT (multimodal) → it correctly diagnosed a **torn meniscus** and confirmed the ACL was intact, which the surgeon later confirmed.
- **Lesson:** ChatGPT is strong at "connecting scattered data points" that a busy expert might miss. **But** these are personal anecdotes — medical experts warn AI is no substitute for clinical examination, can miss context/body language, and may **delay treatment** if you rely on it.
- **Source:** PYMNTS (roundup of a Reddit post + Greg Brockman's repost on X) — https://www.pymnts.com/artificial-intelligence-2/2025/chatgpt-as-doctor-when-consumers-rely-on-ai-for-medical-advice/ *(the original subreddit name couldn't be identified).*

### 👨‍💻 CS2 — Codex at Cisco: up to 50% cut in pull request review time

- **Context:** Cisco uses **OpenAI Codex** (agent coding integrated into ChatGPT) to assist with code review.
- **What they did:** For each task, Codex reads the codebase in its own sandbox, runs tests/linters/type-checkers, then opens a pull request with a description of "what it did, why, and how it tested." Engineers use it to scrutinize complex PRs.
- **Result / numbers:** Cisco reports **up to a 50% cut in PR review time**. More broadly, OpenAI says Codex usage grew **more than 10×** since early August; customers include Duolingo, Vanta, Cisco, and Rakuten. Each task typically takes **1–30 minutes**.
- **Lesson:** This is real "agent coding" in a production environment, not copy-paste chat. The biggest value is in **review / bug-catching**, not just generating code.
- **Source (official OpenAI — vendor claim):** https://openai.com/index/codex-now-generally-available/ and https://openai.com/index/introducing-codex/

::: warning ⚖️ CS3 — Lawyer fined $10,000 because ChatGPT fabricated case law (a real trap, with a court ruling)
- **Context:** Lawyer Amir Mostafavi (California) used ChatGPT plus a few other AI tools to "upgrade" an appellate brief — **but didn't re-check the citations** before filing with the court.
- **Result / numbers:** The court found that **21 of 23 case citations in the brief were fabricated**; fined him **$10,000** and referred the matter to the state bar (September 2025). Broader context: there are roughly **712 rulings** worldwide involving AI-fabricated content, **~90% of them in 2025**; California alone had 52 cases, the whole US over 600.
- **Lesson:** ChatGPT fabricates "sources that sound very real." **Verifying every citation/figure is mandatory** before it goes into an official document — exactly as the hallucination warning in Section 04 says.
- **Sources:** CalMatters https://calmatters.org/economy/technology/2025/09/chatgpt-lawyer-fine-ai-regulation/ · LawSites https://www.lawnext.com/2025/09/a-new-wrinkle-in-ai-hallucination-cases-lawyers-dinged-for-failing-to-detect-opponents-fake-citations.html · AI hallucination database (Damien Charlotin) https://www.damiencharlotin.com/hallucinations/
:::

### 📄 CS4 — A bot fired off 1,000 job applications → ~50 interviews/month (viral, many caveats)

- **Context:** A Reddit user built an AI-powered bot (ChatGPT-style) to automate job applications.
- **What they did:** The bot takes personal info → auto-generates a "unique" résumé + cover letter for each job to get past automated applicant-tracking systems (ATS).
- **Result / numbers:** Applied to roughly **1,000 jobs**, got **~50 interviews in one month**.
- **Real caveat:** Many people reported the project was **broken / not running** at the time of writing; one report says ~50% of candidates use AI but recruiters **easily spot it and rate it lower**.
- **Lesson:** "Spray-and-pray" with AI can generate a volume of interviews, but **quality, conversion rate, and reputation** are big problems — not to mention the ethical debate.
- **Source:** Entrepreneur (roundup of a Reddit post) — https://www.entrepreneur.com/business-news/a-reddit-user-made-an-ai-bot-that-got-him-50-job-interviews/485293

### 📊 CS5 — An accountant used ChatGPT + Excel to re-classify thousands of journal entries

- **Context:** An accountant had a journal entry log in which many expenses were misfiled under "Office Supplies."
- **What they did:** Uploaded the log to ChatGPT and asked it to scan the description column for keywords ("laptop", "monitor") to create a new "Reclassified Account" column with an Excel formula.

```text
This is a journal entry log (attached). Scan the Description column for keywords
like "laptop", "monitor"; for each matching row, propose a value for a new column
"Reclassified Account" and write an Excel formula to auto-fill that column.
```

- **Result:** Automatically corrected the classification on hundreds-to-thousands of transaction rows, improving accuracy and audit-readiness. At the product level, OpenAI shipped **ChatGPT for Excel (beta)** embedded right in the spreadsheet, letting you build/update models in natural language.
- **Lesson:** The repetitive "data wrangling" use case is a **sweet spot** for ChatGPT — you describe it in plain language, it writes the formula.
- **Sources:** Journal of Accountancy https://www.journalofaccountancy.com/issues/2025/jul/3-ways-to-use-chatgpt-4o-with-excel/ · OpenAI https://openai.com/index/chatgpt-for-excel/

### 🧪 CS6 — A dev tested 50 "viral" Reddit prompts, only 4 were actually usable

- **Context:** A developer, fed up with the "magic prompts" flooding Reddit, decided to test them for real by embedding them in code/automation.
- **Two patterns worth keeping that survived:**
  - **Self-Refinement Loop:** make ChatGPT critique itself and rewrite the output until it hits quality → cleaner summaries, fewer fabrications.
  - **Context Chaining:** chain multiple context windows to summarize an entire GitHub repo / long document without blowing the token limit.
- **Result:** Only **4 of 50 prompts** were genuinely worth using. Insight: the power lies in how you **chain + loop-refine + embed prompts into a system**, not in the "magic" prompt itself.
- **Lesson:** Don't blindly trust the "mega-prompt." Real value comes from loop techniques and wiring up a process.
- **Source (dev blog, Medium — personal experience):** https://medium.com/@mariaali056/i-tested-50-viral-prompts-from-reddit-only-4-were-actually-worth-it-f9edf11f96e6

### 🔄 CS7 — A team moved coding to Claude / a local model, "weird AI work" dropped ~70% (a comparison, with bias)

- **Context:** An engineer (in a Reddit "AI tools 2026" ranking) manages a team that was paying OpenAI around $80/month for the group.
- **What they did:** Moved most of the coding workload to Claude / a local model, because (a) GPT-4o would volunteer "you could also consider..." instead of sticking to the spec, and (b) they worried about enterprise conversation data being used for training.
- **Result (self-reported):** Tickets of the "the AI did something weird" type **dropped about 70%** after the switch; in that ranking, ChatGPT Pro "only made the top 15."
- **Lesson:** For coding that must follow the spec strictly with sensitive data, some teams find ChatGPT loses to rivals. Tool choice depends on the specific problem + data policy — **there's no tool that wins on everything**.
- **Source (roundup of Reddit r/LocalLLaMA, r/ChatGPT — second-hand, and skewed toward the local-LLM community, so biased):** https://dev.to/b1fe7066aefjbingbong/reddits-most-upvoted-ai-tools-of-2026-ranked-3hhl

### 🗣️ CS8 — The #Keep4o drama: when OpenAI retired GPT-4o

- **Context:** OpenAI turned off the **GPT-4o** model (officially discontinued 2026-02-13). Many users who'd grown attached to GPT-4o's "personality" reacted strongly.
- **What happened:** The **#Keep4o** movement flooded social/Reddit demanding the model be kept. Earlier, the late-April-2025 GPT-4o update had been criticized as **overly flattering (sycophancy)** — a Reddit post about the model "amplifying a relative's delusions" helped pressure OpenAI into a rollback. The community also noted a silent update in late January 2025 that changed the personality, leaving users complaining it was "like being swapped for a different personality wearing the old name."
- **Lesson:** An AI model **can be changed or retired at any time**. Don't build critical workflows hard-wired to a specific model; and be wary of the trend of AI "flattering" you to optimize engagement — it hides real feedback.
- **Source:** Gizmodo (#Keep4o, sycophancy) — https://gizmodo.com/openai-users-launch-movement-to-save-most-sycophantic-version-of-chatgpt-2000721971

---

### 🧰 Community prompt library (with upvote counts — from a Reddit roundup)

The prompts below are pulled from the roundup *"Reddit's most upvoted prompts."* The upvote counts are what the article states (not re-verified per thread), but the **prompt templates** are usable right away:

```text
# Anti-hallucination meta-prompt (~400+ upvotes, r/ChatGPT)
Before responding, ask me any clarifying questions until you are 95% confident
you can complete this task successfully. Use only verifiable, credible sources.
Do not speculate.
```

```text
# Blunt critique, anti-"flattery" (~250+ upvotes, r/ChatGPT)
Give me the Gordon Ramsay treatment on this: [paste content].
Be harsh, specific, and tell me exactly what needs to change.
```

```text
# Red-team an idea (~350+ upvotes, r/PromptEngineering)
Red team this idea: [idea]. What is wrong with it?
Weaknesses, risks, failure modes? Be specific.
```

```text
# Improve in 3 passes (~150+ upvotes, r/PromptEngineering)
Improve this [text] three times in sequence, each clearer and more effective.
Show me all three versions.
```

```text
# "Explain-first" debugging (~150–600 upvotes, r/learnprogramming)
Explain what this code does line by line, identify the likely bug,
then show the corrected version with comments explaining what changed.
```

```text
# Socratic-style learning (~200+ upvotes, r/learnprogramming)
Teach me [topic] using the Socratic Method. Use first-principle thinking.
Ask me questions to test my understanding as we go.
```

::: tip 🧷 Community-distilled formulas
- **The more specific the "Act as," the stronger:** *"Act as a B2B SaaS content strategist who scaled 3 blogs from 0 to 100K visitors/month"* is far better than *"Act as a marketing expert."*
- **The standard prompt structure:** role → specific instruction → output format → context → constraints.
- **Custom Instructions** (fill 2 boxes: box 1 job/context/goal/level; box 2 format/tone/constraints): per the community, this **cuts prompt length by 40–60%** because you don't repeat context each time.
:::

### 📚 Notable sources (title + URL)

These are accessible roundups / articles — **not** links to the original Reddit threads (the original threads couldn't be verified by direct URL, so they're omitted to avoid fabrication):

- "Reddit Post Reignites Debate Over AI's Role in Medical Advice" (MTHFR case + Greg Brockman) — https://www.pymnts.com/artificial-intelligence-2/2025/chatgpt-as-doctor-when-consumers-rely-on-ai-for-medical-advice/
- "A Reddit User Made an AI Bot That Got Him 50 Job Interviews" — https://www.entrepreneur.com/business-news/a-reddit-user-made-an-ai-bot-that-got-him-50-job-interviews/485293
- "OpenAI Users Launch Movement to Save Most Sycophantic Version of ChatGPT" (#Keep4o) — https://gizmodo.com/openai-users-launch-movement-to-save-most-sycophantic-version-of-chatgpt-2000721971
- "California issues historic fine over lawyer's ChatGPT fabrications" — https://calmatters.org/economy/technology/2025/09/chatgpt-lawyer-fine-ai-regulation/
- "Reddit's Most Upvoted AI Tools of 2026, Ranked" — https://dev.to/b1fe7066aefjbingbong/reddits-most-upvoted-ai-tools-of-2026-ranked-3hhl
- "I Tested 50 'Viral' Prompts from Reddit — Only 4 Were Actually Worth It" — https://medium.com/@mariaali056/i-tested-50-viral-prompts-from-reddit-only-4-were-actually-worth-it-f9edf11f96e6
- "Best ChatGPT Prompts Reddit Recommends in 2026" — https://www.aitooldiscovery.com/guides/chatgpt-prompts-reddit
- "Introducing Codex / Codex is now generally available" — https://openai.com/index/introducing-codex/ and https://openai.com/index/codex-now-generally-available/

---

## 07 · Summary & official sources

::: tip 📌 5 things to take away
1. **ChatGPT = an AI assistant that gets work done** (writing/translation/file reading/code/images/voice), with strong multilingual understanding.
2. **A clear prompt = role + context + format.** This is the single most important skill.
3. **Anti-hallucination = web search + Thinking + allowing "I'm not sure" + ALWAYS verifying.**
4. **It's available in most regions**; the **Go plan ($8, pay in local currency where available, ≈132,000đ in Vietnam)** is the best entry point after Free.
5. **Repeat work → Custom GPT / Project.** Multi-step work → Agent mode / Deep Research (then verify).
:::

### Official OpenAI links (worth bookmarking)

These are the **first-party** pages where you can check the latest info yourself — always trust these over a third-party roundup:

- **Use ChatGPT:** https://chatgpt.com
- **Pricing & plans:** https://chatgpt.com/pricing/
- **Help Center (support, guides):** https://help.openai.com
- **Release notes (model/feature updates):** https://help.openai.com/en/articles/6825453
- **Privacy & Data Controls:** https://privacy.openai.com
- **System status (check when the app is broken/slow):** https://status.openai.com

::: details 🔎 Additional reference sources (research as of mid-2026)
- Introduction of GPT-5.5 & GPT-5.5 Instant (OpenAI Help Center "GPT-5.5 in ChatGPT"), news from TechCrunch / CNBC (April–May 2026); **GPT-5.5 Instant became the default model for all signed-in users on 2026-05-05**.
- OpenAI Help Center: https://help.openai.com — includes release notes, the supported-countries list, and guides for creating/editing GPTs.
- ChatGPT Go expanded to Vietnam & other Asian countries (October 2025), listed in Vietnam at ≈132,000đ/month (VAT included) per local press.
- The two Pro branches (Codex $100 / Max $200) launched 2026-04-09 per tech-news reports.

*Numbers (prices, models, features) may have changed — always re-check at chatgpt.com and help.openai.com.*
:::
