---
title: 'Replit — Cloud IDE + an AI agent that builds and deploys your app'
description: 'A practical guide to Replit: Replit Agent 3 writes a full-stack app, tests it in a real browser, and deploys it with one click. Sign-up, plans and pricing (effort-based), real prompt workflows, case studies, and exercises.'
---

# Replit — Cloud IDE + an AI agent that builds and deploys your app

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🟧</p>

::: tip 🔥 Hands-on — 30 seconds
You're a PM or founder at a small startup, and you need an *"internal time-tracking app"* to demo to your boss tomorrow morning — but the dev team is buried in a sprint, and you can't code. Normally this sits in the backlog for two weeks. With Replit you open a browser, type a plain-language description, and **Replit Agent** writes the frontend and backend, builds a database, **opens a real browser and clicks through the buttons itself**, fixes bugs, then **deploys to a live URL** — all in one evening.
**💸 Why it matters:** a non-developer can take "idea → running app with a link" all the way in a single session. Instead of queuing behind the dev team for every small internal tool, you build the prototype yourself to lock down the idea, then hand a clean spec to engineering for the production version.
:::

> **"Replit isn't a chat box that suggests code, and it isn't just an online editor.**
> **It's a cloud IDE plus an agent: it writes a full-stack app, opens a browser to test it, fixes itself, then deploys with one click — and you install nothing on your machine."**

::: tip 🎯 After this chapter you'll be able to
- **Sign up for Replit** and build your first app *entirely in the browser* — no local install.
- **Hand work to Replit Agent** in natural language so it writes, tests in the browser, and deploys on its own.
- **Write prompts "the right way"**: specific, broken into small steps, using checkpoints to roll back when the agent goes off track.
- **Understand effort-based billing** so a buggy agent loop doesn't quietly "burn your credits."
- **Pick the right plan** (Free / Core / Pro) and know when **NOT** to use Replit (versus Cursor / Codex / Bolt).
- **Build extra automations and bots** (cron, Slack/Telegram bots) just by describing them in plain language.
:::

This is a tool chapter — read it with `replit.com` open and type along. Doing it by hand sticks twice as well.

---

## 01 · What this tool is & when to use it

**Replit** is a **cloud IDE that runs entirely in the browser**, combined with an **autonomous AI agent (Replit Agent)**. It's made by **Replit, Inc.** (CEO Amjad Masad). You describe an app in natural language, and the Agent writes the frontend and backend, builds a database, wires up APIs, **tests in a real browser**, then **deploys with one click** — no local setup. It's a flagship *"vibe coding"* platform: idea → command → real running software.

Replit began as a **REPL/IDE for learning to code online** and has since repositioned itself as a full-stack **"prompt-to-app"** platform serving both non-coders and professional developers (internal tools, fast prototypes). Concretely, it can:

- **Understand a plain-language description** (in English or other languages) and plan out how to build the app.
- **Write multi-file code** (frontend + backend) right inside the cloud editor.
- **Build a database + built-in Auth**, and manage secrets for third-party integrations (Stripe, OpenAI, etc.).
- **Open a real browser to test** — move the cursor, click buttons, fill forms, log itself in to check user flows — then fix the bugs it finds.
- **Deploy with one click** onto Replit's infrastructure (running on Google Cloud), and attach a custom domain.

::: tip 📌 Company context (read for context, don't memorize the numbers)
Per press coverage (TechCrunch, Bloomberg, Sacra) as of mid-2026 — note these are **two funding rounds about ~6 months apart**, don't merge them into one:

- **Sep 2025:** raised **~$250M** at a **~$3B** valuation (ARR ~$150M annualized).
- **Mar 2026:** raised another **~$400M**, valuation jumping to **~$9B**.

2025 revenue is estimated across sources with wide swings, **~$150–300M ARR** (private, unaudited figures). The stated goal is **$1B ARR** by the end of 2026. *These are press figures, not audited public numbers — use them only to picture the scale, don't quote them as official financials.*
:::

### Replit Agent 3 — the heart of the product

The biggest leap is **Agent 3**, launched on **Sep 10, 2025**. This is what sets Replit apart from an ordinary online editor:

- **Autonomy up to ~200 minutes** in **"Max Autonomy" (Beta)** mode — roughly a **10×** increase over Agent 2 (~20 minutes). That means you can hand off a large task and let the agent run for the long haul.
- **Self-testing & self-fixing (self-testing / reflection loop):** the Agent **opens a real browser, moves the cursor**, clicks buttons, fills forms, checks APIs/data sources, and **logs itself in via Replit Auth** to test user flows; it spots a bug → fixes it → re-runs until it passes. Replit says its in-house testing system is *"3× faster, 10× cheaper"* than "Computer Use models."
- **Agents that build other agents + automations:** it spins up chatbots and scheduled workflows (cron) from a plain-language description — e.g., a Slack bot that answers questions about your codebase/Notion, a Telegram bot for scheduling, or an email digest of your Linear tasks.
- **Effort controls:** toggle a *"High-power model"* (a stronger model for hard tasks) + *"Extended Thinking"* (more reasoning time) + web search.

::: warning 💡 Don't confuse "Replit" with things that look or sound similar
- **Replit (plain online editor)** vs **Replit Agent:** Replit is still a full IDE; the *Agent* is the autonomous AI layer on top. You can type code in the editor yourself, or let the Agent do it.
- **Replit ≠ Bolt.new / v0:** all are "prompt → app," but Replit packs **editor + database + deploy + browser testing** in one place; Bolt leans toward "get a prototype URL as fast as possible."
- **Replit ≠ GitHub Codespaces:** Codespaces is a *cloud dev environment* (VS Code) for developers to code themselves — **not an AI builder**.

Replit is **Replit, Inc.'s own first-party product.** Homepage: <https://replit.com> · Agent: <https://replit.com/products/agent>.
:::

**When to use it?** When you want to go from *idea → a real running app with a link* **without setting up an environment and without managing deploys yourself**: building internal tools (a mini CRM, forms, dashboards), prototypes to lock down an idea with a boss or client, an MVP for a small startup, or automating a few repetitive jobs (bots, cron). It shines exactly where "even a non-developer ships working software," and where "a developer wants to build something fast and deploy it right away."

### Compared with other tools

Replit isn't your only option. The table below is an objective comparison with peer tools people commonly weigh against it *(characteristics as of mid-2026, subject to change; many figures/specs are self-reported by Replit or its partners)*:

| Criterion | **Replit (Agent 3)** | **Cursor** | **OpenAI Codex (cloud)** | **Bolt.new** | **GitHub Codespaces** |
|---|---|---|---|---|---|
| What it is | Cloud IDE + agent that builds + deploys | IDE (VS Code fork) + deep AI | Cloud "teammate" agent (one sandbox per task, opens a PR) | "Prompt → full-stack app" in the browser | Cloud dev environment (VS Code), **not an AI builder** |
| Who it's for | Non-coders + devs (internal / prototype) | **Devs who code** (high control) | Devs (assign tasks, review PRs) | Non-coders / PMs needing a fast prototype | Devs who want a ready-made environment |
| Deploy | Built-in, **1-click** | No (editor only) | No (opens a PR to GitHub) | Yes, fastest to a URL | No built-in deploy |
| Code quality | Complete first version (plans first, slower) | **Most production-ready** (understands the whole codebase) | Strong at repo scale, ships tests/logs as evidence | "A starting point, not a finished version" | Depends on what the dev writes |
| Reference pricing | Free + Core ~$20–25 + Pro $100 (credits) | Pro $20/mo (includes $20 credit, overage billed by usage); also Pro+ $60, Ultra $200, Teams $40/user | Per ChatGPT plan + usage | Free / Pro $25 / Teams $30/member (billed by **token**) | $0.18/hr (2 cores); free 120 core-hours (≈60 hrs on a 2-core machine) / 15GB |
| Standout strength | Browser self-testing + auto deploy + builds automations | Background Agents, architecture control | GitHub PR integration + review evidence | Fastest to a URL | Stable dev infra, pay-as-you-go |

**Read the table correctly — choose by need** *(framing per Zapier, NoCode.Tech, Medium/Anna Arteeva)*:

- **You can code and need control over architecture & production quality** → **Cursor**.
- **You want a real running app + deploy without knowing how to code** → **Replit**.
- **You need a lightning-fast prototype URL to demo** → **Bolt.new**.
- **You work inside a strict GitHub/PR-review process** → **Codex** (Codex is often slotted *into* a Replit workflow rather than being a head-to-head rival).
- **You only need a plain cloud dev environment (no AI builder)** → **GitHub Codespaces**.

::: warning 🛑 When NOT to use Replit (check this before you go "all-in")
- **You already have a large codebase and need architecture control / strict PR review** → Cursor or Codex (GitHub) fit better.
- **You need high-quality, deeply optimized production code:** the Agent's first version is good, but *"vibe coding"* easily accrues **technical debt** — you still need someone to review/refactor.
- **Tight budget + complex/long tasks:** effort-based pricing plus buggy loops can burn credits fast and are hard to estimate (see sections 02 & 04).
- **You need to work fully offline / locally**, or compliance requires self-hosting → not a fit (unless you buy **Enterprise single-tenant**).
- **Your app needs heavy load / high concurrency with stable low latency in production** → consider dedicated infrastructure, not just Replit's Autoscale.
- **You only need a plain cloud dev environment** (no AI builder) → GitHub Codespaces is cheaper and simpler.
:::

---

## 02 · Sign-up / access & pricing

### Sign-up (no install)

Go to <https://replit.com> → **Sign up** (Google / GitHub / email) → use it right in the browser. No local install; there's a **mobile app** for quick monitoring/spin-ups.

```text
1. Open https://replit.com
2. Sign up with Google / GitHub / email
3. Open the workspace → the Agent chat box is ready to take an app description
```

### Is there a usable Free plan? — YES (with limits)

Unlike Claude Code (paid only), **Replit has a genuinely usable Free (Starter) plan** for learning and trying the Agent — but the daily Agent credits are capped and you can publish only one project. For serious use, upgrade to Core/Pro.

### Pricing table *(per replit.com/pricing as of mid-2026 — the product changes fast, re-check the link in section 07)*

| Plan | Price | What's included (short) |
|---|---|---|
| **Starter (Free)** | $0 | Daily Agent credits (free), built-in database, slide/video/animation creation, **publish up to 1 project**, private/password deployments |
| **Core** | **$25/mo** (monthly) · **$20/mo** (annual, ~20% off) | **$25 credit/month**, up to 5 collaborators, **2 parallel agents**, unlimited workspaces, brand badge removed, AI integrations |
| **Pro** | **$100/mo** (monthly) · **$95** (annual) | **$100 credit/month**, up to 15 builders + 50 viewers, **10 parallel agents**, the strongest model, 28-day database rollback, premium support |
| **Enterprise** | Custom pricing | SSO/SAML, single-tenant, region selection, static outbound IP, VPC peering, advanced privacy |

::: tip 🗓️ A few plan changes (so a different price doesn't surprise you)
- **Core dropped from $25 → $20** (annual); existing Core subscribers get the new price from their next renewal after **Feb 25, 2026**.
- **Pro launched Feb 20, 2026**, replacing the old **Teams** plan — Teams customers are auto-upgraded to Pro (rollout from **Mar 3, 2026**).
- *(Plan names/prices may keep changing — always check the official pricing page before deciding.)*
:::

### Effort-based pricing — the MOST important part about money

As of **Jul 1, 2025**, Replit dropped the old *"fixed $0.25/checkpoint"* model and switched to **effort-based pricing** — cost reflects the **actual complexity** of what the agent does:

- A simple task (a small fix) can be **under $0.25** — Replit's blog cites about **~$0.06** for a very simple task.
- A complex task can cost **up to a few dollars** (the agent does more, runs more tests, reasons longer → costs more). The official range from Replit's blog: **~$0.06 → a few dollars per task**.
- **Monthly Core/Pro credits expire after ~6 months** if unused; **once credits run out you incur overage** *(per third-party sources — verify this yourself and set a spending limit in your account)*.

::: warning 💸 The unspoken money rule: buggy loops are still billed
Because you're billed by *the effort the agent expends*, a **buggy loop** (the agent fixing the same thing over and over without success) **still deducts credits** even with no result. This is the community's most common complaint (see section 04). The practical takeaway: **set a spending limit**, break tasks into small pieces, and stop to roll back early when you see the agent "going in circles."
:::

### Deployment fees are billed SEPARATELY — pick the right deployment type

This is where people building real apps trip up: **the cost of running an app 24/7 is SEPARATE from Agent credits**. When you hit "deploy," Replit asks you to choose a **deployment type** — each is billed and behaves differently *(per Replit docs as of mid-2026)*:

| Deployment type | When to use | Cost characteristics |
|---|---|---|
| **Autoscale** | Web apps/APIs with variable traffic | **Scale-to-zero** (sleeps when idle → may be "cold" on the next call), billed by request/resources |
| **Reserved VM** | Apps that need to be **always-on**, stable latency, with background jobs | Machine runs continuously, **fixed monthly fee** whether or not anyone is using it |
| **Static** | Static sites (HTML/JS, landing pages) | Cheapest, no backend |
| **Scheduled** | Cron jobs that run on a schedule | Billed per run |

::: warning ⚠️ "My app deployed fine but turns off / sleeps when no one's using it"
That's usually because you're on **Autoscale** (scale-to-zero) — by design, to save money. If you need the app **always on** (e.g., an internal cron job, or an on-the-spot demo for a client), choose **Reserved VM**. Don't mistake "app sleeping" for "app broken."
:::

### Pricing & access

Replit works through the browser anywhere, and the Agent handles non-English input well (you can describe an app in your own language and it understands and builds it). Payment is by **international Visa/Mastercard card** (you may need to enable *international online payments* + *3D Secure* with your bank).

::: warning ⚠️ Payment/access caveat: thin sourcing — verify yourself
Replit **doesn't publish a region-specific page** for most countries, **has no local payment gateway**, and **doesn't accept local currencies**. The conclusion that you can "use it + pay with an international card" comes from real-world card use and various community tutorials — **not official Replit documentation**. Check again at the time you sign up; if a card is declined, check your bank's international-payment settings on the issuing card.
:::

::: tip 🌏 Note for Vietnam / SEA readers
**Describing an app in Vietnamese works well** because the Agent understands it. The interface and docs are mostly in English, and community resources in Vietnamese are still thin — a small barrier, but also a good gap to learn into and share. For payments, use an international Visa/Mastercard with online + 3D Secure enabled; there's no local-currency gateway, so verify your card settings before subscribing.
:::

---

## 03 · Hands-on workflow — step by step (with real prompts)

Below is the standard loop from describing an idea to deploying a URL. Open `replit.com` and follow along.

**Step 1 — Describe the app in the Agent chat box.** The prompt should be **specific**: say who uses it, what it does, what data it holds, and how the UI looks. Here's a real example prompt (in English so the Agent "gets it" reliably; you can also write in your own language):

```text
Build a Vietnamese-language expense tracker web app. Users log in with email.
They can add expenses (amount in VND, category, date, note), see a monthly total,
and a pie chart by category. Use a built-in database. Make the UI mobile-friendly
and in Vietnamese.
```

**Step 2 — The Agent plans.** It proposes an architecture and lets you choose **full-stack** or **frontend-only**, then writes the code, installs dependencies, and creates the DB schema.

**Step 3 — The Agent tests in the browser.** This is the signature step: the agent **opens a real browser**, clicks buttons, fills forms, **logs itself in** to check user flows, spots bugs → fixes them → re-runs in a *reflection loop*. You just watch.

**Step 4 — Review at the checkpoint.** Each step has a **checkpoint** so you can **roll back** if the agent goes off track — this is the most important "safety brake." Use it instead of letting the agent circle and burn credits.

**Step 5 — Iterate with SMALL prompts.** Avoid giant prompts (they easily cause "buggy loops"). Fix one thing at a time:

```text
Add a filter to show only this month's expenses
```

```text
Fix: the chart doesn't update after I delete an item
```

::: tip 🧠 Prompting tips from the community — small chunks are king
- Turn on **"High-power model"** / **"Extended Thinking"** for hard tasks (complex logic, stubborn bugs).
- **Break a big task into many small prompts** — the agent "1-shots" far better than when it's crammed with one giant request.
- When the agent **hangs / loops**: stop, **roll back to the nearest checkpoint**, re-describe more clearly, or **refresh/restart the session**.
:::

**Step 6 — Add an automation / another agent.** Still in plain language:

```text
Create a daily 8am automation that emails me yesterday's total spending
```

```text
Build a Slack bot that answers questions about this codebase
```

Replit ships **connectors** for Notion, Linear, Dropbox, SharePoint, Outlook, Google Drive, GitHub; and it can deliver output to **Slack / Telegram / email**.

**Step 7 — 1-click deploy → attach a custom domain.** One button puts the app on Replit's infrastructure (Google Cloud), with **DDoS protection + WAF**. Then point your **custom domain** at it.

```text
Deploy this app and set up my custom domain expense.mycompany.com
```

::: tip 📌 Real example — Wholesail: a 30-minute prototype instead of 2 weeks
**Context:** the Head of Product at **Wholesail** (fintech, via Plaid) needed to test a cash-flow data flow.
**What they did:** used **Replit + Plaid** to build a data-testing prototype — instead of queuing for the engineering team.
**Result:** something that would have taken **~2 weeks** was **prototyped in ~30 minutes**.
**Lesson:** for someone who *knows exactly what they want from the product*, Replit shrinks the "idea → testable build" loop from weeks to minutes — fast enough to **decide** rather than debate.
*Source: blog.replit.com/fintech-pm-customer-story · plaid.com/blog/replit-plaid-prototyping*
:::

---

## 04 · Tips & common mistakes

### Tips that pay off (you'll feel the difference immediately)

::: tip ✅ 7 hands-on tips
1. **Be specific, not vague:** spell out *who uses it / what it does / what data / how the UI looks*. A fuzzy description → the agent guesses wrong → wasted fix-loops.
2. **Break tasks into small pieces:** one request = one thing. Giant prompts are the number-one cause of "buggy loops."
3. **Use checkpoints like Ctrl+Z:** when it goes wrong, **roll back immediately** — don't let the agent "firefight" in circles (and burn credits).
4. **Turn on High-power model / Extended Thinking for hard work**, and off for easy work to save money.
5. **Set a spending limit** in your account — effort-based pricing can spike unexpectedly.
6. **A hanging agent is often a network issue:** refresh/restart the session, check VPN/firewall before assuming "the agent is broken."
7. **Don't treat the first version as production:** it's great for testing/locking down an idea, but review it (or have a dev review it) before going live.
:::

::: warning 🔒 Security & privacy — read before you paste real data
You're running an app on **Replit's cloud** (Google Cloud, US; an India region option). A few points from Replit's published policies *(security page + docs)*:

- **SOC 2 Type II** (2025, Replit says *"zero exceptions"*), **GDPR/CCPA** compliant, with a **DPA + SCC**.
- **Each customer gets a separate GCP project** (even on the free tier); **secrets encrypted with AES-256**; encryption both *at rest* and *in transit*.
- **Private content is not used to train AI** (Replit's commitment — an enterprise selling point). *Note: SOC 2 doesn't govern training — the "no training" term lives in the **DPA/Terms**, not in the SOC 2 report; sensitive organizations should read the DPA carefully.*
- Deployments get **DDoS protection + WAF**. **Enterprise:** SSO/SAML/OIDC (Okta, Azure AD, Google), RBAC, single-tenant, static outbound IP, VPC peering, "Security Center 2.0".

**Practical takeaways:**
- **Don't paste** real API keys/tokens/passwords, production `.env` files, **real customer PII**, or **NDA-covered source code** into a Free/personal project just to "try it quickly."
- Use Replit's built-in **secret manager** instead of hard-coding keys into the code.
- Sensitive/compliance work should consider **Enterprise (single-tenant)** rather than the regular plans.
- *Source: docs.replit.com/teams/information-security/overview · replit.com/products/security · replit.com/dpa*
:::

::: tip 🌏 Note for Vietnam / SEA readers — privacy & data residency
If you operate under a local data-protection regime (e.g., a GDPR-style privacy law), treat Replit like any other US/EU cloud SaaS: keep real customer PII out of personal/Free projects, prefer the secret manager over hard-coded keys, and review the DPA and region options (US, India) before storing regulated data. For anything compliance-sensitive, lean toward Enterprise single-tenant.
:::

### Common mistakes & how to avoid them

::: warning 🚨 Where things trip up at real scale *(error figures are from third-party blogs/forums — tagged "per source," not official statistics)*
1. **The Agent's "buggy loop":** the agent fixes the same thing over and over without success but **still deducts credits** (per sidetool.co / the Replit forum, roughly **~$0.50–$1.50/prompt**). → **Roll back to a checkpoint**, re-describe more clearly, break the work down.
2. **"Run out of agent calls… try again in 6 hours"** / sudden credit exhaustion → the **unpredictable-cost** worry with effort-based pricing. → Track usage, set limits, consider a higher plan for heavy use.
3. **Agent hangs / slow responses / cryptic errors** — often a **network/VPN/firewall** issue (per sidetool: *>60% of stalls are connection-related*). → Check the network, turn off the VPN, refresh the session.
4. **"401 Unauthorized"** (expired credentials) or a **malformed URL**. → Reconnect the account/secret, re-check the path.
5. **Treating vibe-coding as done:** forgetting that a first version may carry **technical debt**. → Review the code, especially auth/payments, before going live.
:::

::: details ❓ FAQ & common issues (operational)
*(The error figures below are from third-party sources — for reference, not an official Replit commitment.)*

**Q: The agent keeps fixing things in circles without finishing — what should I do?**
→ Stop, **roll back to the nearest checkpoint**, then **break the request down** and re-describe it more specifically. Don't let the agent "firefight" endlessly, since every loop is still billed.

**Q: Why am I being charged credits while the app is still broken?**
→ Effort-based pricing bills *the effort the agent expends*, even when the result falls short. Set a **spending limit**, and roll back early when you see no progress.

**Q: The agent says "out of agent calls, try again in 6 hours."**
→ You've hit your cycle's quota/credit. Wait for the reset window, or upgrade (Core/Pro have more credits).

**Q: The agent hangs and responds very slowly.**
→ Per community sources, most cases are a **network/VPN/firewall** issue. Refresh/restart the session, check your connection, try turning off the VPN.

**Q: I get "401 Unauthorized" when calling an integration.**
→ The credential/secret has expired or is misconfigured. Reconnect the connector and check the secret in the secret manager.

**Q: The agent edits files I didn't want it to, or breaks code that was working fine?**
→ Before handing off work, **rolling back to a checkpoint** is your main brake. Also: tell it clearly "only edit file X, don't touch part Y"; split the app into small pieces to contain the blast radius; use `.gitignore` / connect GitHub for an extra layer of version control beyond Replit's checkpoints.

**Q: My app deployed but sleeps/turns off when no one's using it?**
→ That's **Autoscale (scale-to-zero)** — by design, to save money; the first call after sleep may be slow ("cold start"). If you need the app always on, choose **Reserved VM** at deploy time (see the deployment-types table in section 02).

**Q: How do I export the code to GitHub / run it locally? Is there lock-in?**
→ Replit lets you **connect GitHub** to push code to your repo (then clone it to run locally) — the code is yours, not hard-locked inside Replit. This is also how you back up and review via PRs.

**Q: How do payments work outside the US?**
→ An international **Visa/Mastercard** card (with international online payments + 3D Secure enabled). There's no local-currency gateway — see the "thin sourcing" caveat in section 02.
:::

---

## 05 · Exercises / mini-projects

Do these in order. Each has **clear success criteria** so you can check yourself.

### 🧪 Exercise 1 — Your first app in the browser (basic)

**Goal:** sign up for Replit and let the Agent build a small, genuinely running app with nothing installed on your machine.

1. Go to `replit.com` → Sign up → open the workspace.
2. Paste this prompt into the Agent chat box:

```text
Build a simple to-do list web app in Vietnamese. I can add a task, mark it done,
and delete it. Save tasks in a built-in database so they persist after reload.
Make the UI clean and mobile-friendly.
```

3. Let the Agent run, and watch it **test in the browser** itself.

::: details ✅ Completion criteria
- The app runs in Replit's preview (add/mark-done/delete a task all work).
- Tasks **persist after a reload** (saved to the DB).
- (Reflect) You saw the Agent click through the buttons in the browser while testing.
:::

### 🧪 Exercise 2 — Iterate + deploy to a real URL (core)

**Goal:** experience the *small prompt → fix → deploy* loop, and use a checkpoint to roll back.

1. From the Exercise 1 app, add a feature with a **small prompt**:

```text
Add a filter with three buttons: All, Active, Completed
```

2. Deliberately try a vague prompt, watch the agent go off track → **roll back to the previous checkpoint**.
3. When you're happy, **1-click deploy** and open the public URL.

::: details ✅ Completion criteria
- The All/Active/Completed filter works.
- You've **rolled back to a checkpoint** at least once (you know where the "brake" is).
- The app has **a real running URL** that opens on your phone.
- (Reflect) Why small prompts cause fewer "buggy loops" than giant ones.
:::

### 🧪 Exercise 3 — An internal tool + one automation (advanced)

**Goal:** build a tool with a database + Auth, then add a scheduled automation.

1. Create a new app:

```text
Build an internal expense tracker. Users log in with email (use built-in Auth).
They add expenses (amount in VND, category, date, note), see a monthly total and a
pie chart by category. Store everything in the built-in database. UI in Vietnamese.
```

2. Add an automation:

```text
Create a daily 8am automation that emails me yesterday's total spending
```

3. Deploy, and set a spending limit in your account before using it heavily.

::: details ✅ Completion criteria
- Email login works; expense data is stored in the DB and shown in the chart.
- You have one **scheduled automation** (cron) created from a plain-language description.
- You've **set a spending limit** (cost discipline with effort-based pricing).
- (Reflect) Which part of this app would you have a dev review before putting it into real use?
:::

---

## 06 · Case studies & real use-cases (from the community)

This section gathers **real** cases of Replit use from 2025–2026. Read them correctly: **most figures are self-reported by Replit or its partners/customers** on the `customers` page/blog — so they're tagged *"per Replit"*; treat them as reference, not independent verification.

::: warning ⚠️ Read the numbers correctly
- The *cost-saving / time-reduction* numbers are mostly **Replit's self-reported metrics** (marketing) — cross-check before quoting them in formal documents.
- They show the *potential* of the tool at real scale, not a guarantee you'll hit the same results.
:::

**① Zinus (mattresses) — DevOps builds an internal tool, saves >$140,000**
A DevOps employee built an internal customer-care QA tool with Replit. Per Replit: **saved >$140,000** ($40k/year in license fees + $112,050 in outsourced-dev cost) and **cut development time by 50%**. **Lesson:** Replit lets someone *outside the core app team* solve an internal need themselves instead of queuing for the dev team. *Source: blog.replit.com/zinus-customer-story.*

**② Rokt (ecommerce) — 135 internal apps in 24 hours**
Per Replit, Rokt **built 135 internal apps in 24 hours**, with **700+ employees participating**, now handling **30,000+ tasks/year**. **Lesson:** when you open up "build your own tool" to the whole organization, the number of small tools getting solved jumps dramatically. *Source: replit.com/customers/rokt.*

**③ Wholesail (fintech, via Plaid) — 30 minutes instead of 2 weeks**
Detailed in the *"📌 Real example"* box in section 03: the Head of Product prototyped in **~30 minutes** something that would have taken **~2 weeks**. **Lesson:** shortening the product-decision loop. *Source: blog.replit.com/fintech-pm-customer-story · plaid.com/blog/replit-plaid-prototyping.*

**④ SaaStr — 7 production apps in 3 months**
Per Replit, SaaStr **launched 7 production apps in 3 months**. **Lesson:** a small organization can ship many operational apps without bloating the engineering team. *Source: replit.com/customers · saastr.com.*

**⑤ Blubbr (university students) — ~$1,000/month revenue in 3 weeks**
A group of students used Replit to build a startup, reaching **~$1,000/month in revenue within 3 weeks**. **Lesson:** the "you must know how to code to ship a product" barrier is dropped significantly for young founders. *Source: blog.replit.com/blubbr.*

**⑥ Northern Health (healthcare, UK) & a few other organizations**
Per Replit: **Northern Health saves >£100,000/year**; **Leatherman** cut **60% of the time**; **Spellbook** (legal) raised **$20M**. **Lesson:** the "internal tool + prototype" use-case spans many industries (healthcare, manufacturing, legal). *Source: replit.com/customers — these are Replit's self-reported metrics.*

::: tip 💡 The recurring use-cases (a template to hold up against your own needs)
- **Small internal tools** (QA, time-tracking, forms, dashboards) built by non-developers.
- **Prototypes to lock down an idea** with a boss/client in minutes instead of weeks.
- **Startup MVPs** built fast to test the market, with revenue early.
- **Automations/bots** (cron, Slack/Telegram, email digests) from plain-language descriptions.
:::

---

## 07 · Summary & official sources

::: tip 📌 5 things to take with you
1. Replit = **first-party cloud IDE + Replit Agent** — describe it in words, and it writes the full stack, **tests in the browser**, and **deploys with one click**; no local install needed.
2. **Agent 3** (Sep 10, 2025) is the leap: autonomy up to ~200 minutes, logging itself in to test user flows, building entire automations/bots.
3. **There's a Free plan** that genuinely works (with limits). Paid: **Core ~$20–25** / **Pro $100** (credit-based). Watch out for **effort-based pricing** — buggy loops still cost money.
4. **Usable anywhere** via the browser + an international card (the access/payment part is *thin sourcing* — verify it yourself).
5. **Pick the right job:** non-coder who wants a running app + deploy → Replit; need architecture/production control → Cursor/Codex; just need a cloud dev environment → Codespaces.
6. **Security:** each customer gets a separate GCP project, secrets encrypted, *private not used to train AI*; but don't paste real secrets/PII/NDA code into a personal project — for sensitive work, consider Enterprise.
:::

The product changes very fast — when this material goes stale, use the official links below to update yourself:

| Topic | Official link |
|---|---|
| Homepage | <https://replit.com> |
| Replit Agent | <https://replit.com/products/agent> |
| Pricing | <https://replit.com/pricing> |
| Blog "Introducing Agent 3" | <https://replit.com/blog/introducing-agent-3-our-most-autonomous-agent-yet> |
| Effort-based pricing | <https://replit.com/blog/effort-based-pricing> |
| Security | <https://replit.com/products/security> |
| Security (docs) | <https://docs.replit.com/teams/information-security/overview> |
| Customers (case studies) | <https://replit.com/customers> |
| Zinus case | <https://blog.replit.com/zinus-customer-story> |
| Fintech case (Plaid) | <https://blog.replit.com/fintech-pm-customer-story> |

> *Reliability note: the "what it is / features / pricing / security / links" parts are based on **official Replit sources** — fairly solid. Competitor pricing (section 01) and customer metrics (section 06) are mostly **self-reported by Replit/partners** (tagged "per Replit"). The **access / payment** part (section 02) and the **error figures** (section 04) are **thin/third-party sourcing** — verify them in practice before relying on them. The company financials (~$240M raised, ~$9B valuation) are **2025–2026 press**, not audited numbers. When in doubt, check the official links in the table above or ask directly inside Replit.*
