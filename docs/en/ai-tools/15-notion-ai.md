---
title: 'Notion AI — An AI layer that lives inside your workspace, from writing assistant to a team of background agents'
description: 'A hands-on guide to Notion AI: Notion Agent & Custom Agents running 24/7, AI Meeting Notes (/meet), Enterprise Search, AI Autofill, choosing GPT-5.2 / Claude Opus 4.5 / Gemini 3, plans & pricing (Business $20/month — $15 yearly, credits $10/1,000), pricing & access, real workflows + prompts, the Ramp case study, security, and exercises.'
---

# Notion AI — An AI layer that lives inside your workspace, from writing assistant to a team of background agents

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">📝</p>

::: tip 🔥 Hands-on — 30 seconds
You're a product lead, and your whole team runs on Notion as both wiki and project tracker. This morning there's a 45-minute sprint meeting: you type `/meet` right inside a Notion page, hit **Start transcribing** → the AI transcribes + summarizes + pulls out **action items** the moment the meeting ends, with no bot joining the room. In the afternoon, a dev asks "what's the refund policy?" — you open **Enterprise Search**, type one question, and it scans across Slack + Google Drive + GitHub and returns an answer with sources in seconds. A 30-minute synthesis job shrinks to 3 minutes.
**💸 Real-world payoff:** instead of hopping between 5 apps and copy-pasting, the AI lives right where you already store your data — writing, summarizing, searching, auto-filling databases, and running background agents 24/7. A single Business plan at **$20/person/month** (or **$15** if you pay yearly) wraps all of it together.
:::

> **"Notion AI isn't a chatbot you open and close — it lives inside your pages, databases, and projects.**
> **When Notion is your team's data hub, the AI here wins because it can read the real context. When Notion is just a side app, the math on cost usually doesn't work out."**

::: tip 🎯 After this chapter you'll **be able to**
- **Distinguish** Notion Agent (command it task by task) from **Custom Agents** (run automatically in the background) — and know when to use which.
- **Turn on AI Meeting Notes** with `/meet` to transcribe + summarize + pull action items right inside the page.
- **Use Enterprise Search** to ask-and-answer across connected Slack/Google Drive/GitHub/Gmail.
- **Create AI Autofill** in a database so the AI auto-classifies / scores / extracts entities for every row.
- **Pick the underlying model** (GPT-5.2 / Claude Opus 4.5 / Gemini 3) or enable Auto-select per task.
- **Understand pricing & credits correctly** (Business $20/month — $15 yearly, credits $10/1,000 for Custom Agents) and know **when NOT** to pay for Notion AI.
:::

::: warning ⏱️ Note on the "shelf life" of this information
This reflects understanding as of **mid-2026**, compiled mainly from the official **notion.com** pages (product/ai, pricing, help center, releases, customers) plus a few third-party reviews. AI tools change very fast — model names/versions, prices, dates, and language counts may have changed by the time you read this. Just head straight to [notion.com/product/ai](https://www.notion.com/product/ai) and [notion.com/pricing](https://www.notion.com/pricing) to check the latest. Figures that come only from third-party blogs are flagged as **[thin source]**.
:::

---

## 01 · What this tool is & when to use it

**Notion AI** is the artificial-intelligence layer built **inside** the all-in-one Notion workspace (docs, wiki, database, project). Unlike a standalone chatbot, Notion AI lives right inside your pages/databases and can use context from your own workspace, your connected apps (Slack, Google Drive, GitHub, Gmail…), and the web. Vendor: **Notion Labs, Inc.** Official URL: **https://www.notion.com/product/ai**.

Per its positioning on the AI product page (as of mid-2026), Notion AI has evolved from a "writing assistant" (2023–2024) into a **programmable agent platform** — Notion calls this *"Meet your AI team"*: it includes Notion Agent, Custom Agents running 24/7 in the background, AI Meeting Notes, Enterprise Search, and AI Autofill.

::: tip 🔑 Three things that are easy to confuse (read carefully or you'll mix them up)
- **Notion** = the workspace platform (docs/wiki/database/project) — the "place" where you store everything.
- **Notion AI** = the AI layer *inside* that workspace. This chapter is about this.
- **Notion Agent vs Custom Agents** = two different AI modes: with **Notion Agent** you command it task by task; **Custom Agents** are named agents that run automatically in the background on a schedule/event, without you prompting them. (Details in Sections 02–03.)
:::

**What Notion AI does well (confirmed from notion.com/product/ai):**

| Task group | What it does | How to use |
|---|---|---|
| **Notion Agent** | Multi-step tasks using context from Notion + connected apps + the web; create pages, write database formulas, build views via natural language | Open the AI bar, command it task by task |
| **Custom Agents** | Named agents that **run automatically** on a schedule or event trigger, operate 24/7, and write results back to a database | Configure once, run in the background |
| **AI Meeting Notes** | Record + transcribe + summarize in real time right on the page, "no bot needed"; supports ~16 languages | Type `/meet` (desktop app only) |
| **Enterprise Search** | Search across connected apps: "Search across Slack, Google Drive, GitHub & more — in seconds" (also called "Ask Notion") | Ask one question, get the answer + sources |
| **AI Autofill** | Define one property (category, summary, sentiment, entity…) and the AI fills **every row, including rows added later** | Inside a database |
| **Writing / AI blocks** | Improve style, fix spelling/grammar, change tone, continue writing, translate, summarize, find action items | Right inside the page |
| **Research Mode** | Generate detailed reports & summaries on a topic, with *reasoning* capability (a Business AI feature, listed on notion.com/pricing) | In the AI bar |

::: tip 🆕 Pick the AI model right inside the document (from Notion 3.2)
From Notion 3.2 (**Jan 20, 2026**), you can choose the underlying model right inside the document: **GPT-5.2 (OpenAI)**, **Claude Opus 4.5 (Anthropic)**, **Gemini 3 (Google)** — or enable **Auto-select** to let Notion route by task type. Switching models mid-stream still **preserves context**. (Model names/versions are per sources as of mid-2026 and may have changed.)
:::

::: warning 🔁 Notable change: the $10 Notion AI add-on has been killed
Previously Notion AI was sold as a **$10/month add-on** bolted onto a plan. As of **May 2025**, this add-on was **discontinued** for new Free/Plus customers — all AI is now consolidated into the **Business $20** plan. Existing customers keep access on a *grandfathered* basis. If you read an old article mentioning "buy the $10 Notion AI add-on," that information is out of date.
:::

**Use Notion AI when:** Notion is **your (or your team's) central workspace**; you need ask-and-answer across all your docs + connected apps; you need meeting notes right inside the page; you need to auto-classify/synthesize databases in bulk; you want a background agent doing repetitive work. **Think twice when:** you don't really "live" in Notion, or you've already paid for another general-purpose chatbot (see Section 09).

### Versus other tools — "when to pick which"

The key thing to remember: **the pro tier of most tools is ~$20/person/month**, so price is *not* the deciding factor. Choose based on **the tool you already use and the kind of work you do**. The table below is brief and objective, as of mid-2026:

| Criterion | Notion AI | ChatGPT | Claude | Gemini (in Docs) | Coda AI |
|---|---|---|---|---|---|
| **Nature** | AI **inside the workspace**; strong when Notion is the data hub | General-purpose chatbot, multimodal, web search, code | Strong at writing & reasoning; many praise its text quality | Deeply integrated with Google Workspace (Gmail/Docs/Sheets/Meet) | AI woven into **formulas & automation**, strong at table/row-level |
| **Main weakness** | Doesn't freely browse the web, doesn't analyze images, doesn't run tasks outside Notion (per reviews) — *whereas ChatGPT/Gemini/Claude all already have web browsing*; agents need very precise prompts and must be reviewed | Not tied to your internal workspace | Similar — it's not your "work operating system" | Locked into the Google ecosystem | Smaller community/templates than Notion; pricing has changed several times |
| **Automation** | Triggers at the **database/page level** (page added / property changed) | n/a (outside the workspace; has Projects/Canvas) | n/a (has Projects) | n/a (has Canvas/Gems) | Triggers at the **cell/row level** — more granular for CRM/inventory |
| **Pro price** | **$15 yearly / $20 monthly** (Business) | ~$20/month (Plus) | ~$20/month (Pro) | ~$20/month (AI Pro) | Only charges for "Doc Maker"; editors/viewers free |
| **When it wins** | It's the central workspace, you run a team, you need workspace-wide Q&A + meeting notes | You need a general-purpose assistant outside Notion | You prioritize writing/reasoning quality | You already live in Google Workspace | Heavy data work, a large org with many viewers, a tight budget |

::: tip 💡 Quick summary
If Notion **is already** your (or your team's) data hub → Notion AI is the natural and strongest choice (workspace-wide Q&A + meeting notes + autofill). If you need a general-purpose assistant outside Notion → **ChatGPT**; prioritize writing/reasoning → **Claude**; already live in Google → **Gemini**; heavy data work, many viewers, tight budget → consider **Coda**. One Notion advantage few people notice: the **deep yearly discount** (Business $20 → $15/seat), whereas ChatGPT Plus / Claude Pro / Gemini AI Pro barely **discount the annual plan**. Per one third-party blog estimate, a 100-person org (20 creators + 80 viewers) costs ~$1,650/month on Notion Business versus ~$600/month on Coda Team **[thin source — flagged as "an estimate"]**.
:::

::: warning ⛔ When NOT to use Notion AI (read before you pull out your wallet)
- **You don't live in Notion.** If Notion isn't your central workspace, or you already pay for ChatGPT/Claude/Gemini → the math on cost usually doesn't work out. A community rule of thumb from Reddit: *"Do you spend more than 2 hours/week writing or reading in Notion?"* — if not, just use ChatGPT and copy-paste across.
- **You need to run tasks outside Notion** (freely browse the web, analyze images, run general-purpose code) → use a general-purpose chatbot.
- **Client/team meetings that need speaker identification, or recording on mobile** → a dedicated meeting tool (tl;dv/Otter/Fireflies) is better. (Notion *does* label speakers, but only in English and for 1-on-1/online meetings — see Section 04.)
- **Automation that needs to react per cell** → Coda fits better (Notion only triggers at the database/page level).
- **Handling sensitive data (PII/PHI, customer records) while NOT on the Enterprise plan** → only Enterprise has **zero data retention** with the LLM; non-Enterprise plans still let the LLM provider keep data **≤ 30 days** (details in Section 04). For genuinely sensitive data, either move to Enterprise or don't feed it to the AI at all.
:::

---

## 02 · Sign-up & access

### Available globally? — **Yes.**

- **No geo-blocking** observed — there's no restriction information. You can sign up and use it normally anywhere, with no VPN required.
- Notion (app + web) has an **official localized UI in many languages** — for example, Vietnamese shipped on **Jul 22, 2025** (alongside Indonesian/Thai). Change the language in **Settings**.
- **Notion AI Translate supports many languages** (a group of ~14 translation languages; AI Meeting Notes covers more, ~16 — the language count differs per feature and may have changed). The writing features (improve writing, fix grammar, change tone, simpler language) work across these languages too.

::: warning 🖥️ Important note: AI Meeting Notes only runs on the desktop app
The recording feature of **AI Meeting Notes** (`/meet`) **only runs on the desktop app** (macOS/Windows), per community reviews (Reddit/tl;dv). On web/mobile you can't start a recording session. If you often meet on your phone → this is a limitation to know up front.
:::

::: warning 🧪 Still in beta — don't depend on it 100%
As of mid-2026, per the official pages, both **AI Meeting Notes** (the help center says *"AI Meeting Notes (beta)"*) and **Enterprise Search** (pricing says *"Enterprise Search beta"*) are still in **beta**. That means features may change and can sometimes be unstable — usable for real work, but keep a fallback for anything critical.
:::

### Sign up in 30 seconds

```text
1. Open https://www.notion.com (or download the desktop app for macOS/Windows, mobile for iOS/Android).
2. Sign up with email, or sign in quickly via Google / Apple.
3. Go to your workspace -> open Settings to change the language if you want.
4. Type "/" in a page to call the AI; type "/meet" (on desktop) to turn on Meeting Notes.
```

### Plans & pricing (updated mid-2026 — *monthly price* and *yearly price*)

| Plan | Price/person/month (yearly) | Price/person/month (monthly) | What AI is included |
|---|---|---|---|
| **Free** | $0 | $0 | **Limited trial** of basic AI features only (chat, generate, autofill, translate) |
| **Plus** | $10 | $12 | Still only a **limited trial** of AI features |
| **Business** *(Recommended)* | **$15** | **$20** | **Full set**: Notion Agent, Ask Notion / AI search, AI Meeting Notes, Enterprise Search |
| **Enterprise** | Contact sales | — | Everything in Business + **Zero data retention** with the LLM, SCIM, audit log, unlimited history, dedicated CSM |

> ⚠️ **How to read the price (a common mistake):** the number people often quote, **$20/person/month**, is the **monthly** price of Business; if you commit to **yearly** billing it drops to just **$15/person/month** (~$180/person/year). Plus is similar: **$10 (yearly) / $12 (monthly)**. The pricing page says *"Save up to 20% with yearly."* Source: [notion.com/pricing](https://www.notion.com/pricing).

::: tip 🧮 Credits for Custom Agents — the part that's easy to miss
Custom Agents (launched Feb 24, 2026, see Section 03) are **free to try** until the next billing cycle (on/after **May 4, 2026**), after which they cost:
- **$10 / 1,000 Notion credits / month**, **non-rolling** (resets monthly), **shared across the whole workspace**.
- **How far do 1,000 credits go?** An estimated **~30–60 runs** (≈ $0.17–0.33/run) depending on agent complexity — *an estimate as of mid-2026, not an official commitment*. Notion 3.4 part 2 (Apr 14, 2026) cut Custom Agent costs **~35–50%**, so real-world usage may be lower.
- This is a fee **on top** of the Business/Enterprise plan — it's not bundled in.
- The pricing page also mentions *"Workers (Beta)… starts using credits on August 11"* — still little material on this **[thin source]**.
:::

::: tip 💡 A note on the actual "free tier"
Don't get it wrong: the **Free and Plus plans only get a limited trial of AI features**. To use AI **seriously** (full Notion Agent, AI Meeting Notes, Enterprise Search) you **must move to Business** ($20/person/month, or $15 if you pay yearly). If your goal is just "to try it out," Free is enough; but don't expect to use AI every day on Free/Plus.
:::

### Pricing & access

- **Web:** debit/credit card (**Visa/Mastercard** are accepted), **Apple Pay**, **Stripe Link**, **SEPA** (Europe only).
- **Mobile:** iOS via Apple Pay; Android via Google Play (manage the plan through the App Store / Play Store).
- **No PayPal support.** Billed prepaid monthly/yearly, processed via **Stripe**.
- Pricing is generally **charged in USD** unless a local-currency option is shown for your region; check the in-app price at checkout.

::: tip 🌏 Note for Vietnam / SEA readers
Payment goes through **Stripe** via **Visa/Mastercard** or **Apple Pay** (no PayPal). The help center doesn't list a VND price, so the charge is most likely **in USD** (this is an inference — the help center doesn't say so explicitly). Domestic-only cards from some countries can be **blocked for recurring international charges** — if a payment is declined, use a **card that supports international payments** (e.g. a virtual card).
:::

::: warning ⚠️ Be careful before upgrading the whole team to Business
Because real AI is only in **Business** ($20/person/month billed monthly, $15 yearly), the cost multiplies by headcount fast: a 10-person team = **$200/month** (monthly price) or **~$150/month** (yearly) — *not counting Custom Agents credits*. Pilot first with **1–2 Business seats** to confirm the AI actually solves your problem (meeting notes, Enterprise Search, autofill) before rolling it out to the whole team.
:::

---

## 03 · The hands-on workflow — step by step (with real commands & prompts)

Here are the 4 most-used workflows. Each step includes a way to **verify** that you did it right.

### A · AI Meeting Notes — record, transcribe, summarize right inside the page

Per the official help center:

```text
1. On the DESKTOP app, type /meet in any page.
2. Before the meeting: write your agenda / notes into the "Notes" section -> the AI
   will use them as context when summarizing.
3. Click "Start transcribing" (confirm everyone consents to recording).
4. After the meeting click "Stop" -> the AI auto-generates a summary + action items.
```

→ **Verify:** after you click Stop, the page has a summary + a list of action items that accurately match what was said (not made-up content).

A sample prompt to standardize the minutes (from the community/PromptRocket — **[thin source]**):

```text
Meeting type: [STANDUP / CLIENT CALL / STRATEGY]
Attendees: [...]
Date: [...] — Duration: [...]
Raw notes: [PASTE THE TRANSCRIPT]

Produce a summary with:
1. Meeting Overview (1-2 sentences)
2. Key Decisions Made (note who decided)
3. Action Items (owner + deadline)
```

### B · Ask/do things in the page with Notion Agent

Open the AI bar → type a natural-language command. These are the real prompts Notion **suggests to product teams** (from the official guide):

```text
Simplify the language        # condense a long PRD
Continue writing             # continue the paragraph in progress
Make longer                  # expand the idea to be longer
Fix spelling & grammar       # fix spelling / grammar
Change tone                  # change tone: friendly / casual / professional
Summarize                    # summarize the whole page
Find action items            # pull to-dos from meeting notes / a doc
Brainstorm ideas             # feature ideas, naming a feature
```

→ **Verify:** the result sticks to the content of the page you have open, without "injecting" unrelated information.

::: tip ✍️ The golden rule Notion emphasizes
Notion recommends writing **"detailed and specific prompts"** — the more detailed and specific the prompt, the better the result. *"Rewrite this paragraph"* loses badly to *"Rewrite this paragraph 30% shorter, in a professional tone, keeping the 3 figures in the table intact."*
:::

### C · AI Autofill in a database — let the AI fill in bulk

```text
1. In a database, create an AI-type property.
2. Describe the task, for example:
   "Classify the sentiment of this feedback as Positive / Neutral / Negative."
3. Turn on autofill -> the AI fills EVERY row, including rows you add later.
```

→ **Verify:** check the first few rows to see whether the AI classifies sensibly; add a new row and confirm it auto-fills.

::: tip ⚙️ Upgrade: Autofill runs on Custom Agents (Notion 3.4 part 2)
Notion 3.4 part 2 (**Apr 14, 2026**) upgraded AI Autofill to run on **Custom Agents** as a background process, with a third-party source describing *"sub-3-second autofill"* — this speed detail is from the Fazm blog **[partly thin source]**.
:::

### D · Custom Agent — a named agent that runs in the background automatically (Notion 3.3)

Launched **Feb 24, 2026** in Notion 3.3. This is the biggest difference from Notion Agent: you configure it **once**, and the agent runs in the background without prompting.

```text
1. Give the agent a NAME (e.g. "Sales Feedback Categorizer").
2. Assign its skill / task in natural language.
3. Pick a trigger:
   - on a recurring SCHEDULE (e.g. every morning at 8am), or
   - on an EVENT (e.g. when a new row appears / a property changes).
4. Specify which database the OUTPUT writes into.
```

→ **Verify:** wait for the trigger to fire (or create a test event) and check the destination database to see whether the agent wrote the correct result.

::: tip 🔑 Notion Agent vs Custom Agents — the rule for choosing
- **Notion Agent** = you command it **task by task** and watch the result. Good for one-off jobs (write, summarize, build a view).
- **Custom Agents** = an agent that **runs 24/7 in the background** on a schedule/event and writes results into a database. Good for **repetitive** work (classify feedback every day, weekly synthesis…). Ramp reports that one agent was **created in 3 minutes** between meetings (see Section 06).
:::

::: tip 🔌 Connectors confirmed on the official page
Notion AI connects to: **Slack, Google Drive, GitHub, Asana, Gmail**. These are the data sources for Enterprise Search and where Notion Agent/Custom Agents pull context from outside Notion.
:::

---

## 04 · Pro tips & common mistakes

### 🟢 Tips that pay off

::: tip 7 tips to use Notion AI like a pro
1. **Detailed & specific prompts** — Notion says outright this is the #1 factor. Spell out the length, tone, constraints, and the data that must be preserved.
2. **Put knowledge into the prompt and force the AI to "use only the provided documents"** → fewer fabrications, especially on niche technical topics.
3. **Use the right mode:** one-off work → Notion Agent; daily repetitive work → Custom Agents (no manual prompting).
4. **Lean on Auto-select model**, but when you need high writing quality → pick the right model yourself; switching mid-stream still preserves context.
5. **Write the agenda into the Notes section before `/meet`** → the summary sticks to the key points much better.
6. **Treat the output as a "draft," always review** — especially with agents: results usually need human approval before use.
7. **Use the localized UI** if your language is supported (e.g. Vietnamese since Jul 22, 2025) and use Translate/writing in your language — but double-check domain-specific terminology.
:::

### 🔴 Mistakes & pitfalls (read carefully — this part saves you)

::: warning 🚨 Hallucination (making things up) — still the #1 pitfall
Like any generative AI, Notion AI can **state wrong information very confidently**, especially:
- **Very recent** news or **niche technical** topics.
- When the prompt is vague, the AI "infers" to fill the gap.

**→ How to prevent it:** treat the output as a **draft**, always verify; put knowledge into the prompt and require *"use only the provided documents; if it's not there, say it's not there."*
:::

::: warning ⚠️ Notion AI's specific limitations to remember
- **AI Meeting Notes:** **speaker labels are English-only** and only reliable for **1-on-1 / online meetings** (it captures both your mic and system audio; if you link a calendar event it can attach the other person's name). For **group meetings or multiple people sharing one mic** it can barely tell who's speaking. It also **doesn't join the meeting room itself** and **only runs on desktop**. For client/group meetings that need to know who said what → use a dedicated tool (tl;dv/Otter/Fireflies). Source: [notion.com/help/ai-meeting-notes](https://www.notion.com/help/ai-meeting-notes).
- **Writing style can get repetitive/bland** if you don't specify a concrete style.
- **Lacks deep conversational memory** compared to a dedicated chatbot; it stumbles on vague prompts.
- **Notion/Custom Agents "need very precise prompts,"** and results usually require human review; as of early 2026, some reviews call the reliability *"not yet stable enough"* to depend on completely (Reddit/eesel — **[thin source / opinion]**).
- **Automation is database/page-level only**, with no per-cell triggers (it loses to Coda here).
- **No free web browsing, no image analysis, no running tasks outside Notion** (per reviews) — this is not an all-purpose chatbot.
:::

::: warning 🔒 Privacy & data — read carefully if you use it for work
Per Notion's **official help center**, as of mid-2026:

**(a) Does it train on your data? — NO.**
- Quoting directly: *"Your use of Notion AI does not grant Notion any right or license to your Customer Data to train machine learning models."*
- Notion has contracts that **prohibit AI subprocessors from using customer data for training**.

**(b) Data isolation:** each customer's account is kept separate in the production environment; data isn't mixed during AI processing.

**(c) Storage at the LLM provider:**
- **Enterprise → zero data retention** with the LLM provider.
- **Non-Enterprise → the LLM provider keeps data ≤ 30 days** before deleting it.

**(d) Encryption & certification:** TLS 1.2+ in transit; the vector DB storing embeddings is **SOC 2 Type 2** (audited by an external auditor).

**(e) HIPAA:** Notion AI supports HIPAA compliance thanks to the LLM provider's zero-retention API (for processing PHI).

**(f) Even so — be cautious with personal data:** putting customers' personal data (names, phone numbers, records) into any cloud service can, in most jurisdictions, **touch data-protection law** (e.g. the EU's GDPR, and equivalent privacy regulations elsewhere) — carefully weigh the scope of data before enabling a connector that scans the whole workspace.

Reference pages: notion.com/help/notion-ai-security-practices · /help/ai-safety · /help/enterprise-search-security-and-privacy-practices.
:::

::: details ❓ FAQ & common errors (click to open)
**Typed `/meet` but don't see it / can't record?**
AI Meeting Notes **only runs on the desktop app** (macOS/Windows). On web or mobile you can't start a transcribe session. Install the desktop app and try again.

**I'm on Free/Plus — why am I missing Notion Agent / Enterprise Search?**
Free and Plus only get a **limited trial** of AI features. The full AI suite (Notion Agent, AI Meeting Notes, Enterprise Search) is only on **Business** ($20/person/month monthly, $15 yearly) and up.

**How much cheaper is yearly billing?**
Business: **$15/person/month** yearly versus **$20** monthly (~25% cheaper). Plus: **$10** versus **$12**. The pricing page says *"Save up to 20% with yearly."* If you're sure you'll use it long-term, yearly saves noticeably once multiplied by seats.

**How many Custom Agent runs do 1,000 credits get me?**
Per third-party estimates as of mid-2026, **~30–60 runs / 1,000 credits** (i.e. ~$0.17–0.33/run) — *an estimate; each agent consumes differently by complexity*. Note: Notion 3.4 part 2 (Apr 14, 2026) made Custom Agents **~35–50% cheaper**, so real-world usage may be lower. Source: [notion.com/help/custom-agent-pricing](https://www.notion.com/help/custom-agent-pricing).

**My Custom Agent suddenly says it's out of credits?**
Custom Agents cost **$10 / 1,000 credits/month**, **non-rolling** and **resetting monthly**, shared across the whole workspace. If many agents run in the background at once, credits drain fast — monitor your usage and add more if needed.

**I previously bought the $10 Notion AI add-on — can I still use it?**
The $10 add-on was **discontinued (May 2025)** for new Free/Plus customers. Existing customers keep access on a *grandfathered* basis. New customers who want full AI must move to **Business**.

**Notion AI replies in English even though I wrote in another language?**
State it explicitly in the prompt, e.g. *"Reply in [your language]."* Also switch the UI to your language in Settings (Vietnamese, for example, has been officially supported since Jul 22, 2025). Translate supports many languages.

**The agent returns wrong / weird results?**
Agents "need very precise prompts," and results should be human-reviewed. Rewrite the task in more detail, narrow the data scope, and don't fully depend on un-checked output.

**How do I pay, and is there PayPal?**
No PayPal. Use a **Visa/Mastercard card**, **Apple Pay**, or **Stripe Link** (web); on mobile via the App Store/Play Store. Processed via Stripe; the help center doesn't list local currency, so it's most likely charged in USD.
:::

---

## 05 · Exercises / mini-projects

Actually do 2–3 of the exercises below to turn "I understand it" into "I can do it." Each has clear completion criteria.

### 🧪 Exercise 1 — Meeting Notes + pulling action items (basic)

**Goal:** experience the full `/meet` lifecycle from recording to action items.

1. On the **desktop app**, create a new page and type `/meet`.
2. Go to the **Notes** section and pre-write 3 agenda bullets (e.g. *"lock the deadline, assign owners, risks"*).
3. Click **Start transcribing**, read aloud a ~2-minute mock meeting (play 2 people yourself), then click **Stop**.
4. Cross-check: does the summary cover all 3 agenda items? Do the **action items** assign the right person + task?

**✅ Done when:** you've confirmed the summary sticks to what was said and pulls out at least 1–2 sensible action items (or you catch where it made something up). Write one sentence: did writing the agenda beforehand make the summary tighter?

### 🧪 Exercise 2 — AI Autofill for sentiment classification (important)

**Goal:** practice bulk AI fill + the reflex to verify.

1. Create a simple database with a **"Feedback"** column and paste in ~8 mock feedback lines (positive/negative/neutral mixed).
2. Add an AI-type property named **"Sentiment"** with the description:

```text
Classify the sentiment of the "Feedback" column content as exactly one of three:
Positive / Neutral / Negative. Base it only on the text in that row.
```

3. Turn on autofill, then **add a new feedback row** and confirm it auto-fills.
4. **Manually cross-check** all 8 rows: are any of the AI's classifications wrong?

**✅ Done when:** most rows are correct, the new row auto-fills, and you can point out which rows (if any) the AI got wrong. This is the "don't blindly trust the output" reflex you must keep forever.

### 🧪 Exercise 3 — Custom Agent running in the background (advanced)

::: warning Requires the Business plan + credits
Custom Agents need the **Business** plan and consume **credits** ($10/1,000). If you don't have it yet, do a "paper draft": write out the agent config (name, task, trigger, output) as if you were about to create it — you'll still train your agent-design thinking.
:::

**Goal:** build a background agent for one of your repetitive tasks.

1. Pick one task you do repeatedly in Notion (e.g. *every morning, synthesize the "In progress" tasks into a status paragraph*).
2. Create a Custom Agent: name it, describe the task, choose a **schedule** trigger (e.g. 8am), and specify the output database/page.

```text
Name: Daily Standup Summarizer
Task: Every morning, read the tasks with status "In progress" in the [Project]
database, write a 4-6 bullet summary (what, who's on it, what's blocking),
and write it into the "Standup [today's date]" page.
Trigger: scheduled, 08:00 every workday.
```

3. Wait for the trigger (or trigger it manually) and check the output.

**✅ Done when:** the agent writes the correct summary into your chosen location without you commanding it each time — or (if you did the "paper draft") you've written an agent config clear enough that someone else could build it.

---

## 06 · Case studies & real use cases (from the community & official sources)

This section gathers **real** examples from Notion's official case studies, partner announcements, and third-party reviews as of mid-2026. The point: to show you how Notion AI runs **in the real world** — both when it shines and when its limits show.

::: warning ⚠️ Read carefully about source reliability
- Figures in **Notion's own case study** (Ramp) are **vendor claims** — read them with measure.
- Figures from a **partner** (Decagon) are published by the partner — flagged "per Decagon."
- The **[thin source]** parts are third-party reviews/blogs or community discussion, not independently verified.
- A company's **valuation/revenue figures** (e.g. Ramp) are business context and **should not be directly attributed** to Notion AI's effectiveness.
:::

### 🤖 CS1 — Ramp: running 300+ Notion Agents per day (official case study)

- **Background:** Ramp (a fintech company) is an official Notion case study at notion.com/customers/ramp.
- **What they do:** Ramp runs **300+ Notion Agents/day**, each named for a specific job: *Product Q&A Oracle* (connected to Slack, answers product questions), *Sales Feedback Categorizer* (maps feedback to the roadmap), *Referral Bonus Roy*, *Enablement Eddie*, *Customer Advocacy Miner*, *The Underwriter*…
- **Results / figures (per Notion):** **~70% reduction in productivity-tool costs**; the team *"moves 3× faster."* Ramp says one agent can be **created in 3 minutes** between meetings.
- **Lesson:** the real power of Custom Agents is **cloning repetitive work** — instead of one "do-everything assistant," Ramp built hundreds of agents each dedicated to one task, clearly named, running in the background. *(Ramp's valuation / revenue figures are company context and should not be directly attributed to Notion AI's effectiveness.)*
- **Source (official Notion — vendor claim):** https://www.notion.com/customers/ramp

### 🎧 CS2 — Notion + Decagon: up to ~34% reduction in customer-support ticket handling time

- **Background:** Notion deployed **Decagon's** AI customer-experience solution for its customer-support team.
- **Results / figures (per Decagon):** up to **~34%** (*"up to 34%"*) reduction in ticket handling time; an **ask-for-human rate of only ~3.4%**; handling roughly **1 million requests/year**. Smart routing increased *first-touch resolution* and lightened the load on human agents.
- **Lesson:** even a company "born in Notion" bolts on a dedicated tool for customer support — illustrating that Notion AI is strong at **knowledge/workspace** work, while large-scale ticketing still needs a specialized layer.
- **Source (partner Decagon — read with measure):** https://decagon.ai/case-studies/notion

### 📋 CS3 — Product team: upgrading PRDs/RFCs, synthesizing user research (official guide)

- **Background:** Notion published an official guide on using Notion AI for product teams.
- **What they do:** use the AI to upgrade **PRDs/RFCs** (simplify language, make longer, fix grammar), **synthesize user research**, brainstorm features, scope projects — using exactly the prompts in Section 03B.
- **Lesson:** for product people, the most immediate value isn't the "background agent" but the **AI blocks right inside the document** — editing, summarizing, pulling action items.
- **Source (official Notion):** notion.com/help/guides (the guide series for product teams).

### 🗂️ CS4 — Surfacing insights from a database with AI Autofill (official guide)

- **Background:** Notion's official guide *"5 AI prompts to surface insights from your databases."*
- **What they do:** use **AI Autofill + prompts** to classify, score, and extract entities for many records at once (e.g. classify sentiment, tag topics, extract a company name from a description).
- **Lesson:** this is the "sweet spot" of Notion AI for data-operations people — you describe the criteria in plain language, the AI fills every row, and every row added later.
- **Source (official Notion):** notion.com/help/guides.

### 👤 CS5 — Solo/creator: meeting notes handy for individuals, but weak for group meetings

- **Background:** reviews from tl;dv, a Medium post *"60 days test,"* and Saner.ai (**[thin source — blog/review]**).
- **What they do / takeaways:** AI Meeting Notes is useful for **individual users** working in Notion (taking your own meeting notes solo). But it's **weak for group/client meetings** in languages other than English because: speaker labels only work in English and for 1-on-1/online meetings (with many people sharing one mic it's hard to separate who's speaking), it doesn't join the room itself, and it only runs on desktop.
- **Lesson:** choose the tool by **meeting context**. Solo + you already live in Notion → handy; multi-person meetings that need to know who said what → a dedicated meeting tool wins.
- **Source (third-party reviews):** tl;dv, Medium "60 days test," Saner.ai.

::: warning 📉 CS6 — The "~35% productivity boost" figure deserves a big question mark
A few blogs claim *"Notion's own data"* shows AI boosts productivity *"by up to ~35%,"* and the *"~34%"* figure (Decagon) also gets re-quoted a lot. **The problem:** no **original official page** can be found for the 35% number. → Use these figures with a **strong hedge** or drop them entirely; don't put them in a report as verified fact. This is exactly the kind of "pretty number that spreads" you should be skeptical of yourself.
:::

---

## 07 · Summary & official sources

::: tip 📌 6 things to take away
1. **Notion AI = an AI layer living inside the workspace** — strongest when Notion is your (or your team's) **data hub**.
2. **Two agent modes:** Notion Agent (command it task by task) vs **Custom Agents** (run 24/7 in the background on a schedule/event, launched Feb 24, 2026).
3. **Real AI is only on Business** ($20/person/month monthly, **$15 if yearly**); Free/Plus get only a limited trial. Custom Agents cost extra **credits at $10/1,000**.
4. **`/meet` (desktop only)** for meeting notes; **Enterprise Search** scans Slack/Drive/GitHub/Gmail; **AI Autofill** fills databases in bulk.
5. **Pick the model** GPT-5.2 / Claude Opus 4.5 / Gemini 3 or Auto-select; switching mid-stream still preserves context.
6. **Usable globally** (localized UI, e.g. Vietnamese since Jul 22, 2025, with Translate support for many languages); pay by card/Apple Pay/Stripe, **no PayPal**. It doesn't train on customer data; non-Enterprise keeps it ≤30 days, Enterprise is zero-retention.
:::

### Official links from Notion (worth bookmarking)

These are the **official** pages to check the latest information yourself — always trust these links over third-party summaries:

- **AI product page:** https://www.notion.com/product/ai
- **Pricing & plans:** https://www.notion.com/pricing
- **AI Meeting Notes (help):** https://www.notion.com/help/ai-meeting-notes
- **Notion AI security & privacy:** https://www.notion.com/help/notion-ai-security-practices
- **AI safety commitment:** https://www.notion.com/help/ai-safety
- **Custom Agents pricing / credits:** https://www.notion.com/help/custom-agent-pricing
- **What's New / Releases:** https://www.notion.com/releases
- **Ramp case study:** https://www.notion.com/customers/ramp

::: details 🔎 Reliability notes (research as of mid-2026)
- **Certain (official):** plan pricing (Business $20 monthly / **$15 yearly**; Plus $12 / $10); add-on discontinued May 2025; credits $10/1,000; Custom Agents launch date (Feb 24, 2026) & Notion 3.2 (Jan 20, 2026); Research Mode (listed on the pricing page); connectors (Slack/Drive/GitHub/Asana/Gmail); security/retention policy; localized UI (Vietnamese Jul 22, 2025); payment (card/Apple Pay/SEPA, no PayPal, via Stripe); the Ramp case (>300 agents, ~70% cost reduction); AI Meeting Notes & Enterprise Search still in **beta** (as of mid-2026).
- **Hedged "per sources as of mid-2026 / ~":** language counts (~16, varies by feature); model names/versions (GPT-5.2 / Claude Opus 4.5 / Gemini 3 — *Notion may have updated these underlying models to newer versions*); the "sub-3s autofill" speed; the ~30–60 runs / 1,000 credits estimate; "Workers Beta starts using credits Aug 11."
- **[Thin source — re-check before quoting]:** the ~34% productivity figure (Decagon, an *"up to"*) and ~35% (blogs citing "Notion data," **no original page found**); the Coda 100-person cost comparison; agent-reliability assessments (Reddit/blog).

*Figures (prices, models, features, dates) may have changed — always re-check at notion.com/product/ai and notion.com/pricing.*
:::
