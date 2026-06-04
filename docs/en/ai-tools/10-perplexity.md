---
title: 'Perplexity — The answer engine with citations that shows its sources'
description: 'A hands-on guide to Perplexity (Perplexity AI): free vs Pro $20, Deep Research, Labs, the Comet browser, and the Sonar API — a sourced research workflow, anti-hallucination tips, plus pricing, access, and the legal risks still in the air.'
---

# Perplexity — The answer engine with citations that shows its sources

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🔍</p>

::: tip 🔥 Hands-on — 30 seconds
You work in marketing, and your boss pings you at 9pm: *"We have a meeting tomorrow morning. Send me a comparison of 3 ad platforms plus 2026 market-share figures, with sources so I can trust it."* Open **Perplexity** and type: *"Compare Meta Ads, Google Ads, and TikTok Ads in 2026 on cost and reach, build a table, and cite a source for each row."* → 30 seconds later you get a coherent answer where **every number carries a citation number you can click through to the original source**. You open a few links to spot-check, then drop it into your slides. A 2-hour Google dig shrinks to 15 minutes.
**💸 Real-world payoff:** an "answer machine" that searches the web in real time and synthesizes the result **with verifiable sources** — the free tier already gets you going, and the $20/month Pro plan unlocks deep research. No more juggling 20 Google tabs.
:::

> **"Perplexity isn't Google (which hands you 10 links) and it isn't vanilla ChatGPT (which answers from memory).**
> **It searches the web → reads many sources → synthesizes an answer, attaching a citation to each sentence. But it still hallucinates — knowing which parts to trust and which to verify is the difference that matters."**

::: tip 🎯 After this chapter you'll **be able to**
- **Tell apart** Perplexity from Google, ChatGPT, and Gemini — and know when to reach for which.
- **Use search with citations**: type a natural-language question, click the source numbers to verify, and use Focus to narrow scope.
- **Run Deep Research** to get a long sourced report, and use **Labs** to generate a dashboard/file/app from a single prompt.
- **Install & use the Comet browser** (agentic browsing) — and understand its real limits.
- **Call the Sonar API** with `curl` if you're a developer, and understand token-based pricing.
- **Spot the risks**: hallucinated hard facts, data used for training by default, and the copyright lawsuits still pending.
:::

::: warning ⏱️ Note on the "shelf life" of this information
This reflects understanding as of **mid-2026**. AI tools change very fast (model version names, plan prices, feature limits) — many figures below come from **cross-checked third-party sources** because the official pricing page blocks automated access. In a few spots **the sources contradict each other**, and that's flagged explicitly. Just head straight to [perplexity.ai](https://www.perplexity.ai) and [docs.perplexity.ai](https://docs.perplexity.ai) to check the latest before quoting anything as fact.
:::

---

## 01 · What this tool is & when to use it

**Perplexity** (vendor: **Perplexity AI**) is an **"answer engine"** — a different kind of tool from both a traditional search engine and a plain chatbot. Instead of handing you a list of 10 blue links (like Google) or answering "from memory" with the risk of making things up (like vanilla ChatGPT), Perplexity **searches the web in real time, reads many sources, and then synthesizes a coherent answer with numbered citations right inside the text**. That's the core identity: every claim is tied to a source you can click and inspect.

By 2026, Perplexity has grown beyond the idea of a "search tool" into an **AI workspace** that includes: search with citations, **Deep Research**, **Labs** (generate files/apps), **Spaces** (collaborative workspaces), the **Comet** AI browser, and the **Sonar** API for developers. Main URL: **https://www.perplexity.ai**.

::: tip 🔑 Three things that are easy to mix up (read carefully)
- **Perplexity (web app)** = what you use at perplexity.ai for cited Q&A. Most of this chapter is about this.
- **Comet** = a separate *browser* built by Perplexity (you install it on your machine), with an AI assistant that acts on your behalf — different from the web app.
- **Sonar API** = a service for *developers* to call from code, billed per token — completely different from using the app. Non-coders can skip it.
:::

**What Perplexity does well (per research):**

| Feature | What it does | Plan needed |
|---|---|---|
| **Search with citations** | Real-time web search, answers with numbered sources. Runs the vendor's **Sonar** model by default | Free |
| **Pro Search** | Deeper, multi-step queries with a choice of premium models. Free is capped (~5 per day) | Free (limited) → Pro |
| **Model switcher** | Swap between GPT / Claude / Gemini (per sources through mid-2026, versions like GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro — *model version names change constantly, treat as reference*) | Pro and up |
| **Deep Research** | Searches dozens of times, browses 100+ pages, cross-checks, then writes a structured report with citations. Takes ~2–5 minutes per query | Free (very limited) → Pro/Max |
| **Labs** (under the **+** menu, labeled "Create files and apps") | Tackles 10+ minutes of work: generates reports, spreadsheets, dashboards, slides, mini web apps, and images — running Python and drawing charts | Pro/Max |
| **Spaces** | A collaborative space to store research by topic; the Enterprise version adds admin controls, audit logs, and SSO | Free (basic) → Enterprise |
| **Comet browser** | An AI-native browser: summarize pages, ask questions across tabs, **agentic browsing** (add items to a cart, find coupons, draft an email from page content). Available on iOS/Android/Mac/Windows | The browser itself is free; some agentic capabilities require Pro. A **Comet Plus ~$5/month** add-on unlocks premium publisher content (included free with Pro/Max) |
| **Focus modes** | Restrict the search scope: Academic, Reddit, etc. | Free |
| **Image / video generation** | Image generation; video (sources around mid-2026 mention Sora 2 Pro on the Max plan). *Image generation has been region-blocked at times — see Section 04* | Pro/Max |
| **Sonar API** | A search-grounded API for developers (see Section 03) | Pay-per-use |

::: tip 📌 Why "citations" are the headline feature
Perplexity's biggest difference from a regular chatbot: it **attaches a source to each sentence by default**. For anything you need to verify (news, technical or academic figures), you don't have to "take the AI's word for it" — you click the citation number, open the original page, and confirm it yourself. That's why researchers, journalists, and marketers love it. **But** don't confuse "has citations" with "always correct": it can still attach a source that doesn't actually support the claim, or fabricate a fact with no source at all — see Section 04.
:::

### Versus other tools — "when to pick which"

No tool "wins on every front." Perplexity is a **specialist** for sourced research — in raw "AI search" market share it's much smaller than ChatGPT/Gemini (ChatGPT leads by a wide margin, Gemini is second), but it's highly rated for **tracking down verifiable sources**. *Note: 2026 market-share numbers swing wildly depending on measurement method (for example, ChatGPT ranges from ~57% to ~77%, Gemini from ~9% to ~25% depending on the source) — don't splice numbers from sources that use different methods; treat them as qualitative only.* The table below is brief and neutral as of mid-2026:

| Tool | Strong at | Pick it when |
|---|---|---|
| **Perplexity** | Answer engine built for research; **per-sentence citations by default**; has Comet & the Sonar API | You need a sourced, verifiable answer — tracking news/technical/academic facts, synthesizing research |
| **ChatGPT Search** (OpenAI) | All-rounder, multi-step workflows, writing/coding/brainstorming; search is a supplement | You want a true "all-in-one" assistant for varied work beyond research |
| **Google AI Mode** | An AI tab right **inside** Google Search, with Google's infrastructure browsing huge numbers of pages | You already live in Google Search and want AI right there |
| **Gemini** (Google) | **Creative, multimodal**, integrated with Google Workspace | You prioritize images/video/multimedia, or you're already in the Google ecosystem |
| **Claude** (Anthropic) | Reasoning, long-form writing, document analysis, code | You're analyzing long text, writing, or coding — and can accept less search-grounding |

::: warning ⛔ When NOT to use Perplexity (the real limits)
Perplexity is great at research, but **not every job suits it**:
- **When you need absolute precision on hard facts** (GPS coordinates, opening hours, phone numbers, official contact info): the community reports it **fabricates very confidently** in this area (see Section 06) → always verify, or use the primary source.
- **Heavy creative / multimedia tasks** (artistic images, complex video, long brainstorms): Gemini/ChatGPT fit better.
- **Coding / long, in-depth technical writing**: Claude/ChatGPT are usually better.
- **High-stakes agentic automation / money transactions** via Comet: it still misclicks and gets stuck on payment pages — don't hand it risky work unsupervised.
- **Highly sensitive data on the consumer tier**: by default your data is collected and used for training (unless you opt out) — see Section 04.
:::

::: tip 💡 Quick summary
If your job is **looking things up with trustworthy sources** (news, figures, academic work, product comparisons) → **Perplexity** is the strongest choice. Need a versatile assistant that does a bit of everything → **ChatGPT**. Leaning toward **creative/multimodal** work, or already on Google → **Gemini**. **Serious long-form writing or coding** → **Claude**. Many people run them in parallel: Perplexity to *find & verify*, another chatbot to *write & process*.
:::

---

## 02 · Sign-up / install & access

### Pricing & access

Perplexity is available globally with no special setup — open the site, sign in, and start typing. There's a generous free tier, a paid web app (multiple plans), a downloadable Comet browser, and the Sonar API for developers. Below is a practical walkthrough of each, with verification steps so you know you've done it right.

::: warning 🚫 Don't use a VPN to sign up or log in
This is a common trap: Perplexity **blocks VPNs** to fight spam, and it requires **region-correct phone verification** for Pro accounts. Using a VPN, or buying Pro through a foreign coupon, is a leading cause of accounts getting **locked**. Connecting directly on your normal network is the safest path.
:::

### Sign up / install

**Web (nothing to install):**

```text
1. Open https://www.perplexity.ai
2. Sign up with email, or sign in quickly via Google / Apple.
3. Go straight to the question box → type and you're using it right away (free tier).
```

**Comet browser (a real installer you download to your machine):**

```text
# Download at https://www.perplexity.ai/comet
# (needs >=2GB free disk space, 5-6GB recommended - per the official support page)

# macOS:
1. Open the .dmg file
2. Drag the "Comet" icon into the Applications folder
3. On first launch, grant permissions in System Settings -> Privacy & Security

# Windows:
1. Run the .exe file
2. Follow the install wizard
3. Open it from the Start menu

# Mobile:
- iOS: download "Comet" from the App Store
- Android: download from Google Play (package: ai.perplexity.comet)
```

::: tip ℹ️ There's no end-user CLI
Perplexity does **not publish an official command-line tool (CLI)** for end users — you interact through the app/browser. A real command line only exists on the **Sonar API** side (called via `curl`/SDK), see Section 03.
:::

### Plans & pricing (as of mid-2026)

::: warning 📋 Pricing-accuracy caveat
Perplexity's `/pro` page **blocks automated access (403 error)**, so the pricing table below is compiled from **multiple cross-checked third-party sources from 2026**. There are **contradictions** in a few spots — flagged explicitly. Re-check the official page before buying or quoting anything as fact.
:::

| Plan | Monthly | Yearly | Key inclusions |
|---|---|---|---|
| **Free** | $0 | $0 | Unlimited basic search (Sonar model), citations, **~5 Pro Searches/day**; no premium models / full Labs / full Deep Research |
| **Pro** | **$20** | **$200** (~$16.67/month, saves ~17%) | Unlimited Pro Search, model switcher (GPT/Claude/Gemini), Deep Research (~20/day), file upload, image generation, **$5 API credit/month**, basic Comet/Computer access |
| **Max** | **$200** | **$2,000** | Everything in Pro + Perplexity Computer (~10,000 credits/month; orchestrates 19 models to run complex tasks), unlimited Labs/Deep Research, **Model Council** (ask several models at once, then synthesize the answers), priority frontier-model access at peak hours, premium video |
| **Education / Student Pro** | **$10** (50% off) | (usually monthly only) | Same as Pro, for verified students/teachers |
| **Enterprise Pro** | **$40/user/month** | **$400/user/year** | Pro for teams, shared Spaces, SSO/SCIM, audit logs, SOC 2 Type II; Deep Research ~500/day |
| **Enterprise Max** | **$325/user/month** | **$3,250/user/year** | All of Enterprise Pro + unlimited Labs/Research, org-wide analytics |

::: tip 💡 The UNCERTAIN bits (third-party sources — tagged with ~, treat as reference)
**Per-plan Deep Research limits**; **frontier model version names**; the "19 models" figure for Perplexity Computer (many sources say exactly 19, but the model versions change constantly). The Max price ($200/month, $2,000/year), Enterprise Pro ($40/seat/month, $400/seat/year), Enterprise Max ($325/seat/month, $3,250/seat/year), and Education ($10/month) match across multiple sources as of mid-2026 — but still verify at the official source before printing.
:::

### Payment & card access

- Perplexity accepts **international Visa / Mastercard / Amex / Discover credit and debit cards** (processed via **Stripe**).
- It also supports **PayPal** (Perplexity has integrated PayPal in some flows) — a fallback if a card is declined.

::: tip 🌏 Note for Vietnam / SEA readers
Domestic-only cards from some countries (Vietnam included) are often **blocked for recurring international SaaS charges**. To reduce the chance of a decline, use a **virtual card** that supports international payments, or fall back to **PayPal**. Also, beware of sellers advertising "cheap Perplexity Pro" (a few dollars a year) — these are usually **shared accounts or foreign-region coupons** and carry a real risk of getting **locked** due to region-correct phone verification. Not recommended for serious work — losing the account mid-project costs more than it saves.
:::

::: tip 💸 Tips for choosing a plan
- **Just trying it / light use** → **Free** is enough for daily lookups, no card needed. Once you hit the ~5 Pro Searches/day cap, drop back to Quick Search.
- **Regular research use** → **Pro ($20)**: unlocks Deep Research, the model switcher, Labs, and full Comet. The best value for most people.
- **Only step up to Max ($200)** when you genuinely need Perplexity Computer / unlimited Labs / premium video — don't overpay for what you won't use.
:::

---

## 03 · The hands-on workflow — step by step (with real prompts/commands)

This is the "from question to done" process. Each part has a way to **self-check (verify)** so you know you did it right.

### A. Research with citations (web app)

```text
1. Go to perplexity.ai -> type a natural-language question.
2. Pick a Focus to narrow scope if needed: Academic, Reddit (community opinions).
3. Turn on Pro Search (Pro plan) for multi-step queries.
4. Read the answer -> click the citation numbers to open the original source and verify.
5. Use "related questions" to dig deeper; save it to a Space by topic for reuse.
```

A sample prompt for serious research:

```text
Compare 3 options X, Y, Z on [cost, performance, regional support] as of 2026.
Use only sources <= 12 months old. Build a table + cite a source for each row.
If the data conflicts, present both and cite the sources.
```

→ **Verify:** the answer has clickable citation numbers; when you open them, the sources are real, on-topic, and not a 404 or an off-topic link.

### B. Deep Research → a long sourced report

```text
1. Choose the Deep Research mode (or via the + menu).
2. Give a clear brief: scope + the output format you want.
3. Wait ~2-5 minutes (the system browses 100+ pages and cross-checks).
4. Read the report; if you need a dashboard/slides -> push it on to Labs.
```

→ **Verify:** you get a dense, sourced synthesis — and you **ALWAYS re-verify the key figures/sources** before using them (Deep Research can still cite shallow or off-target sources, see Section 06).

### C. Labs — generate an app / dashboard / file from a single prompt

```text
1. + menu -> "Create files and apps" (Labs).
2. Write a fully detailed prompt -> Labs researches + runs Python +
   builds charts -> produces a mini web app / dashboard (~10-30 minutes).
3. Open the "Tasks" tab to see which steps it took.
```

A sample Labs prompt (dashboard):

```text
Build a dashboard tracking [AI startups that raised funding]: funding data, founders,
investors, charts + a map, with filters by date/topic.
Use reputable sources and note the date of the data.
```

::: warning ⚠️ Labs is powerful but you must check the output
Per DataCamp's testing, Labs sometimes **gets the current year wrong** (thinks it's still an earlier year → stale data), **breaks chart/map layouts**, or **produces broken exports**. Don't use Labs output as an official document without reviewing every number.
:::

### D. Comet — agentic browsing (a browser that acts for you)

```text
1. Install Comet (Section 02) -> sign in.
2. Give the assistant a high-level command, for example:
   - "summarize this page"
   - "find a video summarizing topic X"
   - "add items to the cart + find a coupon"
   - "read the Gmail tab, list important unanswered emails"
3. Comet acts across the tabs on its own.
   (The agent model, per sources through mid-2026: Pro defaults to Sonnet 4.6;
    Max defaults to Opus 4.6, with Sonnet selectable - versions change constantly, treat as reference.)
```

→ **Verify:** Comet does exactly what you asked. If it gets stuck on a complex form or a payment page → **step in manually** at that point; don't let the agent click "pay" on its own.

### E. Sonar API — for developers (real commands)

Get your API key at **console.perplexity.ai** (Settings → API). A common snag: **you must load prepaid credit FIRST** before the Generate key button becomes active (this is separate from the "$5 API credit/month" that comes with Pro — that's consumption credit and doesn't unlock the console on its own). Reference docs: docs.perplexity.ai. Once you have a key → call the chat-completions–style endpoint:

```bash
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PPLX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar-pro",
    "messages": [
      {"role": "user", "content": "Summarize the latest news on [topic], with sources."}
    ]
  }'
```

> The model names `sonar`, `sonar-pro`, `sonar-reasoning-pro`, `sonar-deep-research` are per the docs ~mid-2026. The endpoint syntax is confirmed against the docs; check the docs for specific fields, as they may change.

Sonar API pricing (~mid-2026, per the docs):

| Model | Input /1M tokens | Output /1M tokens | Per 1,000 requests (Low→High) |
|---|---|---|---|
| **Sonar** | $1 | $1 | $5 → $12 |
| **Sonar Pro** | $3 | $15 | $6 → $14 |
| **Sonar Reasoning Pro** | $2 | $8 | $6 → $14 |
| **Sonar Deep Research** | $2 | $8 | + citation $2/1M, search $5/1K, reasoning $3/1M |

::: tip 💡 API cost note
In 2026 Perplexity **dropped citation-token fees** for Sonar/Sonar Pro (they remain only on Deep Research) → cheaper per response than in 2025. The Pro plan includes **$5 API credit/month**; heavy use requires buying more prepaid credit. **The Sonar API is Zero Data Retention** — it doesn't store the data you send through the API (see Section 04).
:::

::: tip ⚙️ Small tricks to improve answer quality (web app)
- **Demand explicit sources:** add *"cite a source for each point, prioritizing sources ≤ 12 months old"* → fewer stale/fabricated facts.
- **Allow "I don't know":** add *"if you can't find a trustworthy source, say so instead of guessing"* → fewer fabricated hard facts.
- **Use the right Focus:** academic questions → Academic; need real user experiences → Reddit.
- **Save a Space per topic:** group research sessions on the same subject so you don't have to retype the context.
:::

---

## 04 · Tips & common mistakes

### 🟢 High-value tips

::: tip 6 tips for using Perplexity like a pro
1. **Always click the citation numbers to check the source** — "has a citation" isn't "correct"; it can attach a source that doesn't actually support the claim.
2. **Give a constrained brief** (source date cutoff, table format, "cite a source for each row") → results stay on-target and are far easier to verify than from a vague prompt.
3. **Let the AI say "not found"** → markedly fewer fabricated hard facts (GPS, hours, phone numbers).
4. **For hard jobs → split Deep Research (find & synthesize) then push to Labs (build the output)** instead of forcing one prompt to carry it all.
5. **Switch models when an answer isn't satisfying** (Pro) — the community reports that picking a different model makes a real difference.
6. **Start on Free, step up to Pro ($20) when you hit the ~5 Pro Searches/day limit** or need Deep Research/Labs.
:::

### 🔴 Mistakes & pitfalls (read carefully — this section saves you)

::: warning 🚨 Hallucination — still happens, even "with citations"
Perplexity **still fabricates**, especially on **hard lookup facts**: Hacker News community testing found it fabricated **GPS coordinates that were almost 100% wrong**, restaurant/attraction **opening hours that were "mostly made up,"** and **agency phone numbers/departments that were "almost 100% wrong."** The main complaint: it **answers confidently but wrong instead of saying "not found."**

**Warning signs:**
- A claim with no attached source, or a source that **doesn't actually say that** (click through and it's off-point).
- Facts like coordinates/hours/contact info — the area it gets wrong most.
- Re-ask a different way → you get a completely different answer.

**→ ALWAYS verify hard facts** against the primary source before using them for real work.
:::

::: warning 🔒 Privacy & data — read this if you use it for work
Per Perplexity's **Privacy Policy effective 2026-02-05**:

**(a) Where does your data go?**
- On the **consumer tiers (Free / Pro / Max)**, by default your prompts and queries are **collected, stored, and used to improve/train models** — **unless you opt out yourself**.
- On **Enterprise**, customer data is **NOT** used to train/fine-tune (including chats, file uploads, metadata).
- **Sonar API: Zero Data Retention** — data sent through the API is not stored and not trained on.

**(b) How to turn off training (consumer tiers):**
- Go to **Settings** → turn off the **AI data retention / training** option if you're entering sensitive data.

**(c) NEVER paste the following into the consumer tiers:**
- National ID numbers, bank card numbers, passwords, OTPs.
- Contracts/NDAs, confidential documents, your company's proprietary source code.
- Customers' personal data (names, phone numbers, addresses, records) — in most jurisdictions this can **violate data-protection law** (e.g. the EU's GDPR, and equivalent privacy regulations elsewhere).

**(d) If you must process sensitive data** → use **Enterprise / the Sonar API (Zero Data Retention)**, not the consumer tier.
:::

::: warning ⚖️ Legal risks still in the air (worth knowing to judge durability)
This is the hot section, reported honestly — most of it is **allegations in lawsuits, not court findings**:
- **Tracking lawsuit (early Apr 2026):** a **class action under CIPA** (the California Invasion of Privacy Act, filed around Mar 31–Apr 1, 2026) alleges Perplexity embedded "undetectable" tracking software that shares conversations with Meta/Google **even in incognito mode**. **An important detail for assessing your own risk:** per the complaint, the proposed class **covers only free-tier accounts** (roughly Dec 2022–Feb 2026) and **excludes paying Pro/Max users**; the class **has not yet been certified by a court**. *(Still an allegation — worth watching how it unfolds.)*
- **A wave of copyright/scraping lawsuits:** as of ~May 31, 2026, around **9 organizations** are suing Perplexity (CNN — a May 28, 2026 complaint alleging it copied 17,000+ works; The New York Times; News Corp/Dow Jones; the New York Post; the Chicago Tribune; Britannica; Merriam-Webster; Reddit; the Yomiuri Shimbun). Earlier (Aug 2024), **Cloudflare** documentation plus a Wired/Robb Knight investigation alleged Perplexity used a **hidden crawler, ignored robots.txt, and spoofed its user-agent**. The vendor's response (CCO Jesse Dwyer): *"You can't copyright facts."*
- **The practical upshot:** if you rely on major news sources, these lawsuits could affect content/source relationships down the line → keep an eye on it.
:::

::: details ❓ FAQ & common errors (click to open)
**"Image Generation Not Supported in This Region" — what's going on?**
Image generation rolls out by region/compliance (in early 2026 several regions, including parts of Southeast Asia, were temporarily blocked). **It's not a problem with your account** — wait for it to open in your region.

**Out of quota / a vague error during search?**
Free is only ~5 Pro Searches/day; hitting the cap shows a generic error. Fix: switch back to **Quick Search**, or upgrade to **Pro**.

**"Something went wrong" on every query?**
Possible causes: (1) a service outage, (2) a stale cache, (3) a blocking extension. Fix: check the service status; **hard refresh** (Ctrl+Shift+R) + clear cache; test in **incognito** with extensions off.

**Won't load / broken UI?**
The #1 cause is an **ad-blocker / privacy extension / VPN**. Fix: disable extensions; **don't use a VPN**; try Chrome/Edge (Safari often breaks a few features).

**Locked out / asked for phone verification?**
Usually from buying Pro via a foreign-region coupon; it requires **region-correct** phone verification. Fix: use a properly registered account for your region, and avoid foreign coupons.

**Comet stuck / misclicking while acting on its own?**
Caused by complex forms, unfamiliar logins, dynamic elements, payment pages. Fix: **step in manually** at that point; break the task into smaller pieces; don't hand sensitive payment work to the agent.

**App slow / not loading — do I need a VPN?**
**No VPN needed** (and you shouldn't use one). If it's slow, try a different network or disable extensions.
:::

---

## 05 · Exercises / mini-projects

Actually do 2–3 of the exercises below to turn "I read it" into "I can do it." Each has clear completion criteria.

### 🧪 Exercise 1 — Sourced research & the verification reflex (basic)

**Goal:** practice the single most important skill when using Perplexity — clicking the source to verify.

1. Go to perplexity.ai and ask a question that needs fresh figures, for example:

```text
Top 3 most popular programming languages in 2026 per a reputable survey,
with the % and a source for each number. Use only sources <= 12 months old.
```

2. **Click each citation number**, open the original page, and compare: does the number in the answer match what the source says? Is any source off-topic or a 404?

**✅ Done when:** you can confirm each number matches its source (or catch a spot where the source was attached incorrectly). This is a reflex to keep forever.

### 🧪 Exercise 2 — Deep Research into a report (important)

**Goal:** experience deep research and learn not to "trust blindly."

1. Choose **Deep Research** and give a clearly scoped brief:

```text
Survey the home water-purifier market in 2026: the main brands,
price ranges, and consumer trends. Write a report with sections and cite each part.
If sources conflict, present both.
```

2. Wait ~2–5 minutes. Read the report, then **pick the 3 most important claims and verify them yourself** by opening the sources.

**✅ Done when:** you have a structured report + you've verified at least 3 key points, and you've noticed where the report "sounds authoritative but is shallow underneath."

### 🧪 Exercise 3 — Build a dashboard with Labs (needs Pro/Max)

::: warning Requires a paid plan
Labs needs Pro/Max. If you're on Free, do Exercises 1 and 2 first; save this one for when you upgrade.
:::

**Goal:** build a real output from a single prompt — and practice the habit of checking for errors.

1. **+ → Create files and apps (Labs)**, with this prompt:

```text
Build a dashboard comparing 5 best-selling mid-range phones in 2026:
price, key specs, camera score, battery. Include a table + a bar chart.
Use reputable sources and note the date of the data.
```

2. When it's done, **open the Tasks tab to see what it did**, then review: is the data year actually 2026? Are the charts breaking the layout? Do the numbers match the sources?

**✅ Done when:** you have a working dashboard **and** you can name at least one thing to fix/verify before you'd dare hand it to someone else.

---

## 06 · Case studies & real use-cases (from the community)

This section gathers **real** examples from a tutorial (DataCamp), community discussion (Hacker News), and official announcements through ~mid-2026. The point: to show you how Perplexity actually behaves **in the real world** — both when it shines and when it becomes a trap.

::: warning ⚠️ Read carefully about source reliability
Some of the content below is **personal experience / third-party testing**, not independently verified:
- Remarks like *"beautiful," "accurate," "almost 100% fabricated"* are one tester's judgment in a specific context → read as reference.
- Numbers like "4.6/5 for Vietnamese," "89%/94% ease of use" come from **self-published regional reviews**, not vendor figures → qualitative reference only.
- Whatever is **official** (the Perplexity blog) is labeled as such.
:::

### ⚽ CS1 — An FC Barcelona dashboard with Labs (beautiful but a few details wrong)

- **Context:** The DataCamp author tested Perplexity Labs by asking it to build a football-fan dashboard from a single prompt.
- **What they did:** One prompt describing a dashboard with the last 5 results, the fixture list, the squad with photos + contract status, an injury list, and transfer news.
- **Result:** The output was **beautiful, the squad info was accurate, the club colors were right**; but **a few details were wrong** about contract extensions/injuries (a research limitation, not a system bug).
- **Lesson:** Labs produces an impressive visual product from a single prompt, but **the factual details must be reviewed** — don't treat the output as the final truth.
- **Source:** DataCamp — Perplexity Labs tutorial.

### 📈 CS2 — Analyzing Shopify's 10-K with Labs

- **Context:** Testing Labs on a financial-analysis task (reading an annual 10-K report).
- **What they did:** Labs read the 10-K data and generated a detailed report with **its own charts**, drawing on **more sources** than a typical AI research tool.
- **Result:** The visuals made the numbers easier to present; the report had more depth thanks to multi-source synthesis.
- **Lesson:** For number-heavy analysis, Labs excels at **turning raw figures into charts + a report** — the tool's sweet spot.
- **Source:** Perplexity Labs documentation/tutorial.

### 🗺️ CS3 — 5 experimental trackers/dashboards (including when it breaks)

- **Context:** DataCamp built 5 dashboards with Labs: a climate heat map, a tech-conference calendar, an AI-startup funding tracker, a global-conflict map, and more.
- **What they did:** Each mostly needed just **1 prompt**, built in ~10–30 minutes.
- **Result / real failures:** Many came out beautifully; **but** in one case Labs **got the current year wrong** (thought it was still an earlier year → stale data), in another it **over-engineered and broke the pipeline** down to 2 rows of data, and **exports/charts sometimes broke**.
- **Lesson:** Labs is powerful but **not "set & forget"** — you have to check the output, especially the data year and the integrity of charts/exports.
- **Source:** DataCamp.

### 📧 CS4 — Comet as a Gmail assistant (handy but easy to get stuck)

- **Context:** A Comet browser review (USAII / toolstack) tried using it as an assistant controlling tabs directly.
- **What they did:** Asked Comet to **summarize long emails** and **find important unanswered emails** by acting on the Gmail tab; also tried a shopping use-case (add to cart + hunt for coupons + compare prices).
- **Result:** Summarizing and filtering email worked; but the review warned that pages with **complex forms / unfamiliar logins / dynamic elements** easily cause Comet to **misclick and get stuck on payment pages**, sometimes **slower than doing it by hand**.
- **Lesson:** Agentic browsing is useful for reading/summarizing, but for **transactions/payments**, supervise closely or do it manually.
- **Source:** Comet review (USAII / toolstack).

### 🤝 CS5 — Hacker News community experiences (very mixed)

- **Context:** The thread "Ask HN: What's Your Take on Perplexity AI?" and a thread discussing Deep Research.
- **Positive:** One user, using it 2+ years for web search, said it **"hallucinates less than before"** and that **"choosing a model makes a difference."**
- **Negative (very specific):** One user's testing found Perplexity fabricated **GPS coordinates that were almost 100% wrong**, restaurant/attraction **opening hours that were "mostly made up,"** and **government phone numbers/departments that were "almost 100% wrong"** — the main complaint being that it **answers confidently instead of saying "not found."** Some criticized Deep Research as "authoritative-sounding, well-structured, but possibly shallow in content."
- **Lesson:** Strong for **synthesis & web search**, weak for **hard lookup facts**. This is exactly why Section 04 hammers on verification.
- **Source:** Hacker News — "Ask HN: What's Your Take on Perplexity AI?" + the Deep Research thread.

### 📰 CS6 — Perplexity funding AI & journalism research (positioning its user base)

- **Context:** *(Reference, not a technical use-case.)* Perplexity announced a **$250k gift to Northwestern/Medill** to research AI and journalism.
- **Meaning:** It shows the vendor positions journalists / researchers as its core user base — consistent with its "sourced research" strength.
- **Lesson:** If your work is research/journalism, this is a tool designed with you in mind — but still weigh it against the copyright legal risks in Section 04.
- **Source (official):** Perplexity blog.

::: tip 🧷 Takeaways from the community
- **Trust Perplexity most for:** multi-source synthesis, tracking news/technical/academic facts, comparisons — things you can click through to verify.
- **Don't trust blindly for:** hard facts (GPS, hours, contact info), and Labs output (data year, charts) — always review.
- **Golden rule:** "has a citation" ≠ "correct." Clicking through to read the source is the only real verification.
:::

---

## 07 · Summary & official sources

::: tip 📌 5 things to take with you
1. **Perplexity = an answer engine with citations** — real-time web search, synthesis, a source attached to each sentence. Strongest for **research that needs verification**.
2. **"Has a citation" isn't "correct"** — always click the source numbers to verify, especially hard facts (GPS, hours, contact info) that it often fabricates.
3. **Available globally, no VPN needed** (and you **shouldn't** use a VPN — it risks a lockout). Free is enough for lookups; **Pro $20** unlocks full Deep Research/Labs/Comet.
4. **The backbone workflow:** sourced search → Deep Research (synthesize) → Labs (build the output) → Comet (act). Check the output at every layer.
5. **Privacy:** the consumer tier **trains on your data by default** (unless you opt out); for sensitive data → Enterprise/API. Keep an eye on the pending copyright/tracking lawsuits.
:::

### Official links (worth bookmarking)

These are the **first-party** pages to check for the latest information — always trust these over third-party round-ups:

- **Web app:** https://www.perplexity.ai
- **Comet browser:** https://www.perplexity.ai/comet
- **Pro plan:** https://www.perplexity.ai/pro *(this page often blocks automated fetches — open it in a browser and it works)*
- **API docs (Sonar):** https://docs.perplexity.ai
- **API console (get a key + load credit):** https://console.perplexity.ai
- **API pricing:** https://docs.perplexity.ai/docs/getting-started/pricing
- **Privacy Policy:** https://www.perplexity.ai/hub/legal/privacy-policy
- **Security:** https://www.perplexity.ai/hub/security
- **Help Center:** https://www.perplexity.ai/help-center/en/

::: details 🔎 Reliability notes (research through ~mid-2026)
- **Solid (multiple sources agree):** the answer-engine + citations nature; Pro $20/month, $200/year; Max $200/month, $2,000/year; Enterprise Pro $40/seat/month ($400/year), Enterprise Max $325/seat/month ($3,250/year); Education $10/month; Free ~5 Pro Searches/day; the existence of Deep Research/Labs/Spaces/Comet/Sonar; Comet (the browser) free globally + Comet Plus ~$5/month; works globally with no VPN; Sonar API pricing per the docs; the copyright lawsuits and the Cloudflare/tracking allegations.
- **Reference (tagged with ~, changes constantly):** per-plan Deep Research limits; **frontier model version names** (per sources through mid-2026: GPT-5.4 / Claude Opus 4.6 / Gemini 3.1 Pro); the "19 models" figure for Computer.
- **Self-published third-party numbers (not the vendor's):** 4.6/5 for Vietnamese, 89%/94% ease of use — qualitative reference only.
- **The `/pro` page blocks automated fetches (403)** → pricing comes from cross-checked third-party sources; **re-verify at the official source** before printing.

*Figures (pricing, models, features) may have changed — always re-check at perplexity.ai and docs.perplexity.ai.*
:::
