---
title: 'Claude Cowork — the agent that does office work for you (no code needed)'
description: 'A hands-on guide to Claude Cowork: Anthropic''s knowledge-work agent that runs inside Claude Desktop. Setup, pricing & access, the plan-approval workflow, real prompts, token-saving tips, and practical exercises.'
---

# Claude Cowork — hand it a goal, get back a deliverable

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🤝</p>

::: tip 🔥 Hands-on — 30 seconds
It's the end of the month, and your accountant has **a folder of 40 messy photos of invoices and receipts** that all need to be typed into Excel for an expense sheet — an entire afternoon of work. With Claude Cowork: you point it at that folder, type *"Turn these receipt photos into a formatted expense spreadsheet"*, **approve the plan it proposes**, and go grab a coffee. By the time you're back, the spreadsheet is ready.
**💸 Real payoff:** a repetitive task (invoice data entry) goes from *"half a day by hand"* to *"a few minutes of delegating"* — and you didn't write a single line of code.
:::

> **"A regular chat answers you one message at a time.**
> **Cowork takes a single goal and does the work itself on your machine — files, apps, browser — until there's a finished deliverable."**

::: tip 🎯 After this chapter you'll be able to
- **Tell Cowork apart** from a regular chat and from Claude Code — and know when it's worth handing a task to it.
- **Install Claude Desktop**, open the Cowork tab, and **grant folder access** the right way (least privilege).
- **Run a task end-to-end**: clean up/rename files, merge documents, extract invoices → spreadsheet.
- **Read and approve the plan** Claude proposes before it executes — the single most important control point.
- **Avoid the token-burning trap**, complex-spreadsheet failures, and prompt-injection risk.
- **Judge access for yourself** (pricing, international cards, supported countries) instead of assuming "it just works."
:::

::: warning 🗓️ A note on freshness
This guide reflects an understanding of Claude Cowork **as of mid-2026** (GA release on April 9, 2026). AI products move fast — the interface, pricing, the list of supported countries, and usage limits may already differ. The identity/feature parts are **high** confidence; the **access from your region** and **detailed usage-limit numbers** are **lower** confidence, so verify them yourself before relying on them.
:::

---

## 01 · What this tool is & when to use it

**Claude Cowork** (by Anthropic) is an **AI agent for "knowledge work"** (office/desk work) that runs right inside the **Claude Desktop** app. The official tagline:

```text
"Claude Cowork handles tasks autonomously. Give it a goal and Claude
works on your computer, local files, and applications to return a
finished deliverable."
```

In plain terms: you **hand it a goal**, and Claude **plans and then executes many steps** on your machine — reading/writing local files, opening apps, driving the browser, pulling data from multiple sources — to return **a finished deliverable** (a report, a deck, a spreadsheet…).

The essence: **it brings Claude Code-style power (originally built for programmers) to office workers who don't code.**

### How is it different from a regular chat?

| | **Regular Claude chat** | **Claude Cowork** |
|---|---|---|
| What you give it | A question | A **goal** + constraints |
| Who decides the steps | You (one question at a time) | **Claude plans** the steps itself |
| Touches your machine? | No | **Yes** — local files, apps, browser |
| Result | A text answer | A **deliverable** (report/spreadsheet/deck file…) |
| Number of steps | One Q&A round | Many steps, **self-checks**, asks back when stuck |

::: warning 💡 Don't confuse Cowork with look-alike products
- **Claude Code** — an agent for **programmers** (runs in the terminal/CLI). Cowork is the "no-code version," inheriting the power but aimed at office users.
- **Managed Agents** — launched on the **same day** (April 9, 2026), but they run **server-side/in Anthropic's cloud**; Cowork runs **on your desktop**.
- **Dynamic Workflows** — a parallel multi-agent feature **inside Claude Code**, not Cowork.
- Unfamiliar sites like `coworkerai.io`, `claudecowork.im`… are **not** official sources. The only official sources are **anthropic.com** and **claude.com**.
:::

### Versus other tools (ChatGPT, Manus, Copilot)

You'll almost certainly wonder *"how does it compare to ChatGPT?"*. The **core** difference comes down to **where the agent runs** and **whether it can touch the files on your machine**. Cowork runs a **VM right on your desktop**, so it can read/write local files and deeply understand complex Office documents — that's its **unique selling point**; ChatGPT Agent and Manus mostly run **in the cloud, with no access to local files**.

| Criterion | **Claude Cowork** | **ChatGPT Agent / Operator** | **Manus ("My Computer")** | **Microsoft Copilot** |
|---|---|---|---|---|
| Access **local files**? | **Yes** (reads/writes your machine) | **No** (runs a cloud VM) | **No** (cloud sandbox) | **Yes** (strong in the Office ecosystem) |
| Cloud or desktop? | **Desktop** (local VM) | **Cloud** | **Cloud** | Desktop + cloud (MS 365 ecosystem) |
| Strengths | Deep understanding of complex Word/Excel/PPT thanks to the local VM; chained work over files | Web tasks (booking, filling forms); has a *"takeover mode"* that hands control back when you need to enter a password | Runs long tasks like its own "virtual computer" | Tight Office integration + enterprise data |
| Billing model | By plan (usage limits) | By ChatGPT plan | **Credits** — hard to predict: one complex task can eat **~500–900 credits** | By MS 365 / Copilot license |
| Starting price | **$20/month** (Pro) | By ChatGPT Plus/Pro plan | Paid plans from **~$19/month** | By enterprise Copilot plan |
| **Free tier**? | **No** | Partial (depends on feature) | **Yes** (limited) | Partial (depends on license) |

::: warning 🧭 How to read this table
This is a **directional** comparison (based on public docs as of mid-2026) — these products change very fast, so **verify for yourself** before buying. Manus is built by **Butterfly Effect** (per press reports, acquired by Meta in late 2025); the *"My Computer"* version launched around March 2026. Manus's **credit model** is especially hard to predict cost-wise — worth noting if you're price-sensitive.
:::

### When should you use Cowork?

::: tip ✅ Best fit when
- The work is **repetitive and multi-step** over local files: cleaning up/renaming a file pile, batch format conversion.
- You need to **merge scattered data** into one deliverable: meeting notes + a number table → a branded report/deck.
- You need to **extract data** from unstructured stuff: invoice/receipt photos → a spreadsheet.
- The work is **recurring**: pulling metrics, building a weekly digest (set a Scheduled task).
:::
::: warning 🚫 Don't over-expect when
- The task is just a **one-shot Q&A** → a regular chat is far cheaper and faster (Cowork burns tens of times more tokens).
- The spreadsheet is **"presentation-style"** and messy (merged cells, section headers) → the xlsx skill often struggles.
- The work needs **many-step browser actions** → it's slow (it has to take screenshots back and forth).
:::

::: details 📌 Real example — one command blooms into 90 sub-steps
Simon Willison typed **one sentence** asking Cowork to review his nearly-finished blog drafts. To answer, Cowork **scanned 46 files** and then **ran 44 separate web searches** to cross-check against his site — that's **nearly 90 sub-actions from a single prompt**. This is both why Cowork is **powerful** (it expands into many steps on its own) and why it **burns tokens fast**. The lesson: pick Cowork when the work *deserves* a long chain of sub-steps; for a single question, use a regular chat.
*Source: simonw.substack.com.*
:::

::: warning ⚠️ Real limitations — read before you buy
Before you commit money, know the 4 limitations that most often leave newcomers *disappointed*: **(1)** no Free tier — Pro at $20/month minimum; **(2)** it **burns through your usage limit very fast** — heavy work can drain your quota in a handful of tasks; **(3)** "presentation-style" spreadsheets (merged cells/multiple headers) and **many-step browser actions** are error-prone/slow; **(4)** your region may not yet be on the official supported-countries list (see section 02). The detailed reasons people **abandon Cowork** are in **section 06** — worth reading before you spend.
:::

---

## 02 · Setup & access

### How to use it (summary)

1. Download **Claude Desktop** from `claude.com/download` (supports **both macOS and Windows** as of GA on April 9, 2026).
2. Sign in to your Claude account (you need a **Pro plan or higher** — see below).
3. Open the **"Cowork" tab** at the top of the app (next to **Chat** and **Code**).

### Pricing & plans (cross-checked, 2026)

Cowork is available on **ALL paid plans**. The difference between plans is **mainly the usage limit, NOT the features**:

| Plan | Price | Usage limit (relative) | Who it's for |
|---|---|---|---|
| **Pro** | **$20/month** (≈ **$17/month** billed annually, ~$200 up front) | Full features, **lowest usage** | Light/occasional use |
| **Max 5x** | **$100/month** | ~5x usage | **Practical minimum** for daily work |
| **Max 20x** | **$200/month** | ~20x usage | Heavy, frequent batch processing |
| **Team / Enterprise** | Team ~**$20/seat/month** (billed annually) or ~**$25/seat** (billed monthly), **minimum 5 seats**; Enterprise by agreement (~$20/seat + usage via API) | Centralized administration | Businesses (RBAC, spend caps, analytics…) |

::: warning 🚫 There is NO Free tier
Cowork is **not** in the Free plan. You need at least **Pro at $20/month** to use it.
:::

::: warning ⚠️ The biggest "trap" — usage burns down very fast
A single Cowork task **burns tokens at tens of times the rate** of a regular chat message: it reads **whole files** + multiple reasoning passes + runs a **long workflow**. The limit is measured over a **5-hour window**, so it drains quickly — on **Max 5x** you can sometimes only run **~10–20 heavy tasks** before it's gone.
*(This number is an estimate from third-party analysis, not an official Anthropic table — treat it as a rough reference point.)*

**Easing the limit:** per the docs as of mid-2026, the paid plans have an **"extra usage toggle"** — when you exhaust your included usage, you can choose to **keep going at API pricing with a spend cap you set yourself** instead of hitting a hard stop. Handy so you don't get stranded mid-task, but remember to **set a spend cap** so the bill doesn't run away from you.
:::

### Pricing & access (international)

**Technically:** the desktop app runs fine anywhere **as long as you can sign in** to your Claude account.

**The practical hurdles** (per Anthropic's general policy — you **must verify at the time you use it**):

1. **Not every country is on Claude/Anthropic's official supported-countries list.** Whether your region is supported determines whether **account signup & payment may be blocked by region**. The list does get expanded over time, so check it for yourself.
2. **Payment requires an international card** (Visa/Mastercard), and sometimes a billing address in a supported country.

::: tip 🔑 The first thing to do before buying
Open [anthropic.com/supported-countries](https://www.anthropic.com/supported-countries) and check whether your country is on the list. Don't buy a plan first and only then discover you can't activate it.
:::

::: warning 🌏 Note for Vietnam / SEA readers
Some Southeast Asian countries — including Vietnam — may not appear on the official supported-countries list at the time you read this, which can block signup or payment. Many people work around it with a **VPN + international card**, but that's a **gray area under the Terms of Service**, **at your own risk** — not recommended as the "proper" path. Check [anthropic.com/supported-countries](https://www.anthropic.com/supported-countries) before paying, since the list may have expanded.
:::

::: details 💡 Why this chapter is still worth studying even if access is a hurdle
Even if you can't buy it right away, Cowork is a **living example** of three core concepts: **autonomous agents** (you hand over a goal instead of orchestrating each step), **plan-approval** (review the plan before it runs), and **sandbox/least-privilege** (grant access only to the exact folder needed). Understanding how Cowork behaves helps you use **any** task-delegating agent well later on.
:::

---

## 03 · The hands-on workflow — step by step

This is the standard procedure, **with a verify check at each step**:

::: tip 🧭 8 steps to hand a task to Cowork
1. **Install Claude Desktop** (macOS/Windows) from `claude.com/download` and sign in (Pro or higher required). → *verify: you see the "Cowork" tab at the top of the app.*
2. **Open the Cowork tab.** If you want it to act on your files, enable/check **"Work in a Folder"** at the bottom of the interface and choose the target folder.
3. **Grant access** when the dialog appears — choose **"one-time"** or **"Always Allow."** *Safety rule:* grant only the **exact folder/connector needed**, never your whole drive.
4. **Type a description of the task** in natural language (the clearer the **goal + constraints**, the better) and send it.
5. **Read the PLAN** Claude proposes **before it runs** → approve, edit, or redirect. *This is the single most important control point.*
6. **Watch progress in real time** in the sidebar; Claude **stops to ask permission** before any **destructive** action (delete/overwrite).
7. **Receive the deliverable** (file/report/spreadsheet…) and **double-check** the result. For recurring work → set a **Scheduled task**.
8. *(Optional)* **Dispatch a task from your phone** so Claude keeps running on the desktop (mobile dispatch).
:::

### Real prompts — copy & use

Cowork takes **natural language**. Below are real-world prompts (in English — Cowork understands it best; you can also type in your own language).

**Clean up & rename a Downloads pile:**
```text
Organize this downloads folder. Sort files into subfolders by type.
Rename files that have generic names like 'download' or 'IMG_' to
something descriptive based on their content.
```
> *Clean up the Downloads folder: sort files into subfolders by type; rename generic-named files (like "download", "IMG_") to descriptive names based on their content.*

**Batch format conversion + archive the originals:**
```text
Convert all .docx files to PDF, then move the original .docx files
into a single 'docx-archive' folder.
```
> *Convert every .docx file to PDF, then move the original .docx files into a single "docx-archive" folder.*

**Extract invoices → expense spreadsheet (a very common need):**
```text
Convert these receipt screenshots into a formatted expense spreadsheet.
```
> *Turn these receipt screenshots into a formatted expense spreadsheet.*

::: details 📌 Real example — Jeff Su merges 100+ invoices and adds a "VERIFY" column
Jeff Su had **more than 100 invoice photos** (over Claude Chat's 20-file limit). He pointed Cowork at the folder and added **one small trick well worth learning** — asking it to flag any line it wasn't sure about:
```text
I need an expense report from the receipt photos in my Receipts folder.
Excel spreadsheet with date, vendor, category, amount, and a totals row.
If anything's blurry or unclear, mark it VERIFY.
```
Cowork read every photo and exported Excel with **the blurry/unclear lines tagged VERIFY** for a human to re-check — i.e. **human-in-the-loop baked into the result file itself**. Two of Jeff Su's notes: **the files must already be in the folder** (Cowork won't read files dragged in from Downloads), and running through the **browser extension is slow + token-heavy**.
*Source: jeffsu.org.*
:::

**Draft a branded report from scattered sources:**
```text
Prepare a branded Q1 product report from my scattered meeting notes
in this folder, using our deck template.
```
> *Prepare a branded Q1 product report from the meeting notes scattered in this folder, using our deck template.*

**Analyze data in an archive → PDF report:**
```text
Extract it, analyze the inside, and generate a detailed PDF report
of my spending habits.
```
> *Extract the archive, analyze the contents inside, and generate a detailed PDF report of my spending habits.*

::: details 📌 Simon Willison's real run (to see how far Cowork goes)
Tech writer Simon Willison tried this prompt:
```text
Look at my drafts that were started within the last three months and
then check that I didn't publish them on simonwillison.net using a
search against content on that site and then suggest the ones that
are most close to being ready.
```
Cowork **found 46 draft files** and **ran 44 web searches** to cross-check, then suggested the ones closest to done. Another follow-up prompt:
```text
Make me an artifact with exciting animated encouragements to get me
to do it.
```
→ it produced an **animated HTML artifact**. The takeaway: a single command can bloom into **dozens of sub-steps** — which is also why tokens burn fast.
:::

### Step 5 is the most important: read the plan

Before it executes, Cowork **shows you a plan** (the plan-approval workflow). You can **approve / redirect / stop** at any step. For **destructive actions** (delete, overwrite), it **stops to ask permission**.

::: warning ⚠️ Why you must never click "approve" on reflex
The plan is where you catch dangerous intent early — for example, Cowork planning to **delete the originals** instead of **archiving** them, or **overwriting** a file you needed to keep. Reading carefully here is **far cheaper** than recovering data after it has already run. This is the number-one control point of the whole chapter.
:::

### Filesystem sandbox & access controls

- **Default sandbox:** your files are **mounted into a container environment** (e.g. paths like `/sessions/<name>/mnt/...`) to **limit access**.
- **Access controls:** you **choose which folders & connectors** Claude is allowed to use. The enterprise edition adds **RBAC, per-group spend limits, analytics, OpenTelemetry, per-tool connector controls**, and **MCP connectors** (e.g. Zoom).
- **External connections via MCP** (Model Context Protocol) to other tools/apps.

::: warning 🧱 What the sandbox protects — and what it does NOT
The sandbox **limits filesystem access** (only the folders you grant) and **restricts the network**, but it **whitelists Anthropic's own API as "trusted."** That's **precisely the gap** the PromptArmor incident exploited (see the "lethal trifecta" box in section 04): the attacker didn't need to open an unfamiliar connection — they tricked Cowork into **sending your data over the very Anthropic API channel that was already allowed**. In other words: the sandbox stops it from "tunneling out," **but it can't stop data from leaking through a door that's already open**. So *least-privilege at the folder level is still your most practical line of defense* — the sandbox is no substitute for **keeping sensitive data out of the agent's reach in the first place**.
:::

---

## 04 · Tips & common mistakes

### Tips (these make an immediate difference)

::: tip 💡 7 hands-on tips
1. **Start small.** Begin with a simple prompt on **ONE folder** before handing over a multi-step task — so you learn how it plans and behaves.
2. **Always READ the plan carefully** before approving — especially for **delete/overwrite** actions.
3. **Time heavy work right after the 5-hour usage window resets** to have the most quota.
4. **Least privilege:** grant access only to the **exact folder/connector** needed; **don't "Always Allow"** everything.
5. **Pre-install system tools** like **LibreOffice** and **Ghostscript** so Cowork can convert files locally (docx↔pdf…) more reliably.
6. **Pick a realistic plan:** if you need heavy batch processing regularly → consider **Max 5x ($100)** as your minimum; **Pro ($20)** suits light use.
7. **Lean on Scheduled tasks** for recurring work (weekly digests, pulling metrics) — *"Set it once, skip the ask"* — so you don't re-enter the same prompt.
:::

### Mistakes & pitfalls

::: warning 🚨 7 common pitfalls
1. **Usage burns down very fast.** One Cowork task can cost as much as **dozens of chat messages**; Max 5x can sometimes only run **~10–20 heavy tasks per 5 hours**. This is the biggest shock for newcomers.
2. **Complex Excel/spreadsheets are error-prone.** The **xlsx** skill struggles with *"presentation-style spreadsheets"* — **merged cells**, section headers, non-columnar layouts.
3. **Browser automation is SLOW.** It has to **screenshot back and forth**; e.g. unsubscribing from 3 email lists took **30+ minutes**.
4. **Prompt-injection risk.** An agent reading web/file content can **pick up malicious instructions hidden** in that content. Anthropic advises users to *"watch for suspicious behavior themselves"* — which is **impossible** for non-technical people. → Be cautious about what you grant.
5. **No Free tier** — you must pay at least **Pro at $20/month**.
6. **Outdated guides cause confusion.** Some preview-era write-ups say *"macOS only"* or *"Max only."* Note: *"Max only"* **was true in the first preview (Jan 12, 2026)**, but from **Jan 16, 2026** it opened to Pro, and the GA release supports **Windows too** and **every paid plan** — so the "Max only / macOS only" claims are now **OUTDATED**.
7. **Google connectors may be unstable.** Some connectors (Gmail/Calendar/Drive) were in a **work-in-progress** state in the early releases — **check the connector's status** before relying on it.
:::

::: warning 🔒 A security warning — read carefully
**Do NOT grant Cowork access to folders containing sensitive/customer data** until you fully understand the prompt-injection risk. An agent that reads files/web can be "spiked" with malicious instructions in the content it reads. Safety rule: **create a dedicated folder, put only what needs processing in it**, and then point Cowork at it — don't open your entire work directory.
:::

::: warning 🔐 Where does your data go? — training policy & privacy
This is a **different** question from prompt injection above: prompt injection is *the risk of being attacked*, while this is Anthropic's *data policy*. Two things to know (per public policy as of mid-2026 — **verify, because policies change**):

- **Does it go to the cloud?** Cowork runs a VM **on your machine**, but **the model's inference still happens in Anthropic's cloud** — meaning the content Claude needs to "read to process" **is still sent to the servers**. "Runs locally" does **not** mean the data never leaves your machine.
- **Is it used for training?** It varies by account type: **Team/Enterprise** plans **do NOT use your data to train models by default**; **consumer** plans (Free/Pro/Max) **depend on your settings** — Anthropic offers a toggle to allow/disallow using your data to improve models, so **go into Settings to check and turn it off if needed**.

A practical rule for confidential/customer data: **prefer an organizational account (Team/Enterprise) if you handle sensitive data**, and always **read the privacy setting before pouring real data in**. (If you operate under GDPR or a similar privacy regime, an organizational account with a data-processing agreement is generally the safer choice.)
:::

::: warning ☠️ The "lethal trifecta" — a real attack, read before granting access
This is a **mandatory** warning, confirmed by **multiple independent sources**. Cowork combines **three dangerous ingredients** at once (Simon Willison calls this the *"lethal trifecta"*):

1. **Reads your private data** (local files, email, drive…).
2. **Is exposed to untrusted content** (the web, documents others send you).
3. **Has the ability to send data out** (upload, email, API calls).

**Real demo:** just **two days after Cowork shipped its Research Preview (January 2026)** — NOT after the April GA — the **PromptArmor** team demonstrated a **Word file containing a hidden prompt injection** that tricked Cowork into **uploading a sensitive file** (including financial documents containing part of a **Social Security number**) to **the attacker's Anthropic account** — exploitable because Cowork's VM **whitelists Anthropic's own API as "trusted."** Simon Willison stressed: telling non-technical users to *"watch for prompt injection themselves"* is **unreasonable**.

**A deeper flaw than "one malicious Word file":** per the reports, the root cause is an **isolation bug in Claude's code-execution environment that was known BEFORE Cowork existed** — researcher Johann Rehberger had disclosed a similar variant on Claude.ai; Anthropic acknowledged it but (per reports, as of mid-2026) hadn't fully fixed it. This is a **systemic problem**, not a one-off incident. The hiding technique also shows why **the naked eye essentially can't detect it**: text at **1pt font, white-on-white, line spacing 0.1**.

**What to do:** don't point Cowork at confidential data mixed with unfamiliar content; separate folders; for outward-facing work, stop at **"drafts"** rather than letting it send on its own.
*Sources: PromptArmor (original) — `https://www.promptarmor.com/resources/claude-cowork-exfiltrates-files`; The Decoder — `https://the-decoder.com/claude-cowork-hit-with-file-stealing-prompt-injection-days-after-anthropics-launch/`; byteiota.com, mintmcp.com, wonderingaboutai.substack.com, simonwillison.net.*
:::

### Quick lookup: symptom → cause

| Symptom | Common cause | How to handle |
|---|---|---|
| "Ran out of quota after just a few tasks" | Each task burns tokens at tens of times the rate of chat | Time it after the 5h reset; consider Max 5x; consider enabling **extra usage** (with a spend cap) |
| Spreadsheet comes out **wrong/misaligned cells** | The source file is "presentation-style" (merged cells…) | Simplify the source layout; double-check by hand |
| docx↔pdf conversion **fails/loses content** | Missing system tools | Install **LibreOffice + Ghostscript** |
| Web actions are **very slow** | Browser automation has to screenshot | Accept the slowness, or split into smaller tasks |
| Google connector **won't connect** | The connector is still in development | Check its status before relying on it |
| Large task **keeps needing "Continue"** | A **tool-call-per-turn limit** | Break the task up; for big batches consider **Claude Code** |
| **Scheduled task doesn't run** | Laptop is **asleep** / app closed | Keep the machine awake + app open; or accept the "catch-up" when you reopen |

---

## 05 · Exercises / mini-projects

Do these on **your own real data** (but **non-sensitive**), and **always read the plan before approving**.

### Exercise 1 — Clean up & rename a file pile (beginner)

> **Goal:** turn a messy folder (photos, PDFs, docx named `IMG_xxxx`, `download (3)`…) into something orderly.

1. Create **a test folder** (copy ~15–20 files in — **don't** use an important original folder).
2. Enable **"Work in a Folder"**, point it at the test folder, grant **one-time** access.
3. Send the clean-up + rename prompt (section 03).
4. **Read the plan** → check: does it plan to **delete** anything? If so, change it to **move/archive**.

::: details ✅ "Pass" criteria
- Files are sorted into **subfolders by type**.
- Generic-named files are **renamed descriptively based on content**.
- **No original file is deleted** unintentionally (you blocked that at the plan-approval step).
- You **can explain** every step in the plan before it runs.
:::

### Exercise 2 — Invoices/receipts → expense sheet (applied)

> **Goal:** from a folder of **receipt photos**, create a **formatted expense spreadsheet**.

1. Gather **8–10 receipt photos** (coffee, taxi, office supplies…) into one folder.
2. Point Cowork at the folder and send:
   ```text
   Convert these receipt screenshots into a formatted expense
   spreadsheet. Columns: date, vendor, category, amount.
   ```
3. **Double-check a few rows by hand**: are the amounts and dates correct? (OCR can be wrong.)

::: details ✅ "Pass" criteria + notes
- You get **one spreadsheet file** with the requested columns.
- You **cross-check ≥3 rows** against the original photos and confirm they match.
- **Error note:** if you force a "presentation-style" layout (merged cells, multiple headers) → it's error-prone. Keep the sheet **simple and columnar**.
:::

### Exercise 3 — Merge scattered notes into a report (synthesis)

> **Goal:** from several scattered meeting-note files (Word/Markdown/txt) → **one concise report**.

1. Put 3–4 note files into one folder.
2. Send:
   ```text
   Combine the meeting notes in this folder into a single one-page
   summary report: key decisions, action items (with owners), and
   open questions. Export as PDF.
   ```
3. *(Advanced)* If this recurs weekly → set up a **Scheduled task** so Claude runs it on a schedule.

::: details ✅ "Pass" criteria
- A **one-page report** with the right structure (decisions / action items / open questions).
- You try **redirecting at the plan step** (e.g. "also add a deadline column") and watch Claude adjust.
- You understand why this is **a good fit for an agent** (merging unstructured sources) rather than a regular chat.
:::

---

## 06 · Case studies & real use cases (from the community)

This section gathers **real, attributed cases** from the creator community (mostly on Substack/blogs), so you can see what Cowork is **actually used for**, what the results were, and the **lessons** drawn. Each case follows: context → what they did → result → lesson.

::: warning 🧪 How to read these numbers correctly
The "saved X hours" figures below are **creators' self-reported experiences**, not independent measurements. The **enterprise** numbers (PwC, Jamf…) come from **Anthropic's official showcase** — so read them as **marketing**, not neutral benchmarks. Treat them as **indications of magnitude**, not promises.
:::

### CS1 — A morning intelligence briefing (scheduled task)

> **Context:** Raghav Mehra (a tech researcher) tracks news on enterprise AI, fintech, and workflow automation; **each morning he spent ~45 minutes** hunting sources by hand.

- **What he did:** built a **scheduled task that runs at 8 AM** — searches across 4 "research pillars," **deduplicates** against a Notion database, picks 10 stories, formats them, and pushes them into Slack. Tools used: **Notion connector + Slack connector + web search**.
- **Result:** from **~45 minutes of scanning sources** down to **~5 minutes of reading a curated brief**; no more worry about missing news.
- **Lesson:** "reading the news on a schedule" is a perfect candidate for a **Scheduled task** — configure once, get a ready-made summary every morning.

*Source: cashandcache.substack.com, compiled in buildtolaunch.substack.com (Jenny Ouyang) — `https://buildtolaunch.substack.com/p/claude-cowork-use-cases-real-workflows`.*

### CS2 — Reconciling bank statements + invoices

> **Context:** a blogger (pen name "aiblewmymind") self-tested **monthly bank-statement + invoice reconciliation** — by hand it took an entire afternoon.

- **What they did:** dropped statements + invoices into **one folder** and asked Cowork to: extract transactions, **clean up vendor names**, categorize expenses, **match invoices to transactions**, **flag missing invoices**, export Excel, and **rename files consistently**.
- **Result:** correct extraction, consistent renaming, missing invoices flagged. The author said it **"saves a whole afternoon every month."**
- **Lesson:** Cowork shines at **chains of small linked steps** (extract → clean → reconcile → export) that a regular chat can't do end-to-end.

*Source: `https://aiblewmymind.substack.com/p/claude-cowork-use-cases-guide`.*

### CS3 — Expense sheet from 100+ invoice photos (Jeff Su)

> **Context:** Jeff Su (a well-known productivity creator) had **more than 100 invoice photos** to turn into a sheet — **over the 20-file limit** of a regular Claude Chat.

- **What he did — the real prompt (close paraphrase):**
  ```text
  I need an expense report from the receipt photos in my Receipts
  folder. Excel spreadsheet with date, vendor, category, amount, and
  a totals row. If anything's blurry or unclear, mark it VERIFY.
  ```
- **Result:** Cowork read all the photos and exported Excel with **the uncertain rows marked VERIFY** for a human to re-check.
- **Lesson (very valuable):**
  - Use a **"VERIFY/Notes" column** to create a **human-in-the-loop** — this is where Cowork clearly beats Chat on **file volume**.
  - **The files must already be in the folder** Cowork is pointed at — Cowork **won't read files dragged in from Downloads**; running the work through the **browser extension is slow and token-heavy**.

*Source: `https://www.jeffsu.org/learn-80-of-claude-cowork-in-under-20-minutes/`. (This invoice-merging use case is also cited by an anonymous secondary source with the figure "a month of invoices in under 10 minutes instead of ~3 hours by hand" — plausible in magnitude but not traceable to a named person.)*

### CS4 — Finding nearly "publish-ready" blog drafts (Simon Willison)

> **Context:** Simon Willison (a developer/blogger and trustworthy first-party source) has a blog drafts folder and wanted to know **which posts are nearly done and have never been published**.

- **What he did — the real prompt (verbatim):**
  ```text
  Look at my drafts that were started within the last three months and
  then check that I didn't publish them on simonwillison.net using a
  search against content on that site and then suggest the ones that
  are most close to being ready.
  ```
- **Result:** Cowork **scanned 46 draft files**, ran **44 separate searches** against the site, and suggested **3 ready posts** (including "Frequently Argued Questions about LLMs," ~22,602 bytes). There was **1 wrong suggestion** (a post actually published in the Datasette docs, not the blog) and **1 UI bug** (the artifact got squeezed into a narrow column).
- **Lesson:** the agent is useful but **you must verify its suggestions** — it still makes mistakes. Simon himself also warns strongly about **security** (see the "lethal trifecta" box in section 04).

*Source: `https://simonw.substack.com/p/first-impressions-of-claude-cowork`.*

### CS5 — A weekly "content flywheel" (memory living in files)

> **Context:** Wyndo (a content creator) spent **~2 hours/week** planning content; complained that "creators operate without memory."

- **What he did:** built a folder structure with `CLAUDE.md`, `profile.md`, `stats.md`, `memory.md`, plus a newsletter archive + social history + brain-dump; then just typed one command:
  ```text
  Run content flywheel
  ```
- **Result:** it produced a **weekly brief** of 5 validated ideas, draft titles, audience fit, performance predictions, and a content pack for social; the `memory.md` file **grows thicker over time on its own**. Cut **2 hours of research** down to **~10 minutes of conversation**.
- **Lesson (the punchline of this whole section):** *"documentation tightness, not model smartness"* — **consistency comes from tight context files, not a smarter model**.

*Source: aimaker.substack.com, compiled in buildtolaunch (URL as in CS1).*

### CS6 — A HubSpot follow-up machine (sales)

> **Context:** Patrick Schaber (sales/marketing) spent **30–45 minutes a day** researching contacts and writing follow-up emails.

- **What he did:** a **scheduled task at 8 AM** — surfaces due follow-up tasks, reads call/meeting notes, **drafts emails in his own tone**, and drops them into **Gmail drafts** (a human reviews before sending). Tools: **HubSpot + Gmail connector**.
- **Result:** saves **30–45 minutes/day** on the research + drafting step.
- **Lesson:** stop at **"drafts" rather than auto-sending** — keep a human in the final loop for sensitive outward work like customer email.

*Source: patrickschaber.substack.com, compiled in buildtolaunch (URL as in CS1).*

### CS7 (enterprise) — PwC, Brainlabs, Satispay, Jamf

> **Context:** large organizations deploying the **Claude + Cowork + Code** suite at team scale.

- **PwC:** set up a financial-transformation business group for clients; cited evidence (per Anthropic): **insurance underwriting from 10 weeks down to 10 days**; security work from "hours" down to "minutes." (`https://www.anthropic.com/news/pwc-expanded-partnership`)
- **Brainlabs** (media agency): equipped **1,000+ marketers** with an **"AI coworker"** built on Claude Cowork + skills.
- **Satispay:** engineers write **75% of code** with Claude, using Cowork alongside on the Enterprise plan.
- **Jamf:** reached **89% active usage within 8 weeks**.
- **Lesson:** at enterprise scale, the value comes from **combining all three** (Cowork for ops, Code for engineering, Chat for thinking) — not any single tool.

*Overall source: official showcase `https://claude.com/customers` (rosy numbers — read as marketing).*

### What else can it be used for? (a quick roundup, all from real shares)

::: tip 🗂️ Use-case library by group
- **Morning briefing/standup:** merge email + calendar into a summary (the **most common** use case per the roundups).
- **Content pipeline:** from a folder of articles → generate **60 Substack Notes** (3 per article for 20 articles) with the `substack-notes` skill; a chain of **4 sequential tasks** for a YouTube creator (Ryan Stax): log videos from 17 channels → fetch transcripts → generate 10 ideas per article → clean up old entries.
- **Course builder:** turn **47 YouTube videos (31+ hours)** into articles + exercises, preserving context throughout (Dheeraj Sharma).
- **Cross-platform reconciliation:** compare Gemini/Google Drive transcripts against Notion notes to find **"missed commitments"** (Jeff Su).
- **Personal ops:** clean up the Desktop **on a schedule** (deleting only `Screenshot*.png`, `Screen Recording*.mov` — Joel Salinas); track flight prices; Stripe reporting.
- **House/real-estate hunting:** drop in a Zillow URL → Cowork extracts fields into a Notion database by criteria (school score, commute time, solar panels…) (Jenny Ouyang).
- **Data/business reporting:** Amazon Seller Central + Triple Whale sales → a Gmail draft at 6 AM (Margot); analyze a **~49,000-response dataset** into a multi-tab report with charts.
- **Create plugins/skills with no code:** `/skill-creator`, "Plugin Create" — Claude interviews you and then generates the file structure + slash command.
:::

### Community tips (distilled from real users)

::: tip 🧰 8 worthwhile tricks
1. **"One job per task":** split a giant prompt into **multiple sequential atomic tasks** — stability improves noticeably (Ryan Stax).
2. **Context lives in files:** `CLAUDE.md` + `memory.md` + a self-updating brain-dump; consistency comes from **tight files**, not the model (Wyndo, Jenny Ouyang).
3. **Approval gate instead of auto-apply:** an editorial pipeline that **pauses for human review at each step**; e.g. the slash commands `/polish-article`, `/add-visuals`, `/repurpose-article` (Daria Cupareanu).
4. **Hardcode absolute folder paths** in the skill file to avoid **"location drift"** (Asli Öztürk).
5. **A "VERIFY/Notes" column** for every data-extraction task (invoices/receipts) to make human review easy (Jeff Su).
6. **Build the workflow first, then "reverse-engineer" it into a skill** — don't create a skill from scratch (Jeff Su).
7. **Back up skills to Google Drive** because skills **don't transfer between machines on their own**; teams sync via Google Drive Desktop + a shared `PROJECT_INSTRUCTIONS.md` file (Zain Haseeb, Jeff Su).
8. **The first task setup** takes ~15 minutes, later tasks ~2 minutes; **on the first run Claude rewrites your prompt** to optimize connectors for later runs. And: **be explicit about which account/where Cowork is allowed to act** to avoid sending the wrong email (Margot).
:::

### When do people ABANDON Cowork? (real complaints)

::: warning ⚠️ 6 reasons people walk away — know them so you're not disappointed
1. **Burns quota fast:** each task spawns sub-agents + tool calls + file ops; a complex session eats quota equal to **"dozens" of regular chat messages**. One Pro user tried enabling the 1M context and **burned the whole month's quota in under 3 days** *(compiled from r/ClaudeAI and blogs retelling it)*.
2. **Tool-call-per-turn limit:** with 100+ invoices you have to hit **"Continue" repeatedly**; Karen Spinner reported a 100+ invoice task hitting **server timeouts + 20 minutes of "babysitting,"** whereas **Claude Code finished in 5 minutes**.
3. **The scheduler only runs when the machine is awake + the app is open:** if the laptop is asleep, the task is **skipped** (it only "catches up" the next time you open the app). This is the **most frequently repeated complaint**.
4. **Rigid plugins:** Mia Kiraki dropped Cowork because an SEO plugin was too rigid — **"every time I changed one step it became a fight with the format"** instead of editing directly; she went back to keeping the workflow in local files (Obsidian + Notion).
5. **"Non-developer is a trap":** Dee McCrorey tried building a Next.js + Supabase app in Cowork → **failed to deploy, RLS/permission errors, nowhere to debug**. Conclusion — a **3-lane** framework: **Claude Code = engineering partner, Claude Chat = thinking partner, Cowork = operations assistant** — don't make one do another's job.
6. **The browser extension is slow and you can't force web search:** Cowork often falls back to the unreliable extension (Jeff Su).
:::

### Threads/posts worth reading further

::: details 🔗 Roundup of original links
- "First impressions of Claude Cowork, Anthropic's general agent" — Simon Willison: `https://simonw.substack.com/p/first-impressions-of-claude-cowork`
- "First impressions of Claude Cowork" — Hacker News thread: `https://news.ycombinator.com/item?id=46612919`
- "Show HN: OpenWork – An open-source alternative to Claude Cowork" — HN: `https://news.ycombinator.com/item?id=46612494`
- "Claude Cowork Use Cases From 17 Creators: 15 That Genuinely Work, 4 Who Walked Away" — Jenny Ouyang: `https://buildtolaunch.substack.com/p/claude-cowork-use-cases-real-workflows`
- "Claude Cowork: 10 Use Cases I Tested + 67 More by Profession" — aiblewmymind: `https://aiblewmymind.substack.com/p/claude-cowork-use-cases-guide`
- "Learn 80% of Claude Cowork in Under 20 Minutes" — Jeff Su: `https://www.jeffsu.org/learn-80-of-claude-cowork-in-under-20-minutes/`
- "Is Claude Cowork safe?" — Wondering About AI: `https://wonderingaboutai.substack.com/p/is-claude-cowork-safe`
- "Anthropic takes Claude Cowork out of preview and straight into the enterprise" — The New Stack: `https://thenewstack.io/anthropic-takes-claude-cowork-out-of-preview-and-straight-into-the-enterprise/`
- "Anthropic updates Claude Cowork…" — CNBC: `https://www.cnbc.com/2026/02/24/anthropic-claude-cowork-office-worker.html`
- Official showcase: `https://claude.com/customers` · product page: `https://www.anthropic.com/product/claude-cowork`
:::

::: warning 🧾 A note on sources (read to gauge reliability)
- The **creator use-case** material is plentiful and **clearly attributed** (person's name, blog, sometimes the prompt). The two richest sources: **Jenny Ouyang (buildtolaunch)** and **Jeff Su**.
- Only **CS3 (Jeff Su)** and **CS4 (Simon Willison)** have **verbatim/near-verbatim** prompts. CS1, CS5, CS6 are read through a **compiled roundup** — **the names and platforms are real**, but the prompts are **paraphrased**.
- The **enterprise** numbers (10 weeks→10 days, 89%, 75% of code) are **Anthropic's official showcase** → presented as **"per Anthropic,"** not independent measurement.
- Observations from **r/ClaudeAI** (quota burn, scheduler needing an awake machine) come **indirectly via blogs retelling them**, are **paraphrased**, and are **not** linked to a specific post/username to avoid fabrication.
:::

---

## 07 · Summary & official sources

::: tip 📌 5 things to take away
1. Cowork = **hand it a goal → get a deliverable**; it plans and runs many steps on **your machine**.
2. **Plan-approval is the number-one control point** — always read the plan, especially before delete/overwrite actions.
3. **Least privilege:** point it only at the folder you need to process; **don't** open sensitive data to the agent.
4. **Fast token burn** is the biggest trap — Pro suits light use, **Max 5x** is the realistic choice for daily work.
5. **Access:** check the **supported countries** list + you'll need an **international card**; "it works" is not a given — verify first.
:::

::: details ❓ FAQ & common errors
**Is there a free version of Cowork?** — **No.** At least **Pro at $20/month**. Any page claiming "Free includes Cowork" is **misreading** the pricing page.

**Does "runs locally" mean the data never leaves my machine?** — **No.** The VM runs on your machine, but **the model's inference is still in Anthropic's cloud** → the content that needs processing is still sent out. See the *"Where does your data go?"* box in section 04.

**Why does a large task keep asking me to hit "Continue"?** — Because of a **tool-call-per-turn limit**. Break the task up; for very large batches (100+ files) consider **Claude Code** (the community reports Code finishing in ~5 minutes vs. 20 minutes of "babysitting" on Cowork).

**Why doesn't my Scheduled task run on time?** — The scheduler **only runs when the machine is awake + the app is open**; if the laptop is asleep the task is **skipped** (it only catches up the next time you open the app). Keep the machine awake or accept the delay.

**docx ↔ pdf conversion fails / loses text?** — Usually because of **missing system tools**. Install **LibreOffice + Ghostscript** and try again.

**Spreadsheet comes out with misaligned cells?** — A *"presentation-style"* source file (merged cells, multiple headers) makes the **xlsx** skill struggle. Keep the layout **simple and columnar** and double-check by hand.

**Cowork can't see the file I just dragged in?** — The file **must already be in the folder** Cowork is pointed at; it **won't read files dragged in from Downloads**. Running through the **browser extension is slow + token-heavy**.

**"Max only / macOS only" — is that still true?** — **No.** It was true in the first preview (Jan 2026); the **GA release supports Windows and every paid plan**.

**Can I use it from a country not on the list?** — As of mid-2026, some countries aren't on the supported-countries list → signup/payment may be blocked. Verify for yourself, since the list may expand.
:::

::: tip 🔗 Official sources (first-party — check when needed)
- Product page: [anthropic.com/product/claude-cowork](https://www.anthropic.com/product/claude-cowork)
- Supported countries (important for access): [anthropic.com/supported-countries](https://www.anthropic.com/supported-countries)
- Pricing & plans: [claude.com/pricing](https://claude.com/pricing)
- Download Claude Desktop: [claude.com/download](https://claude.com/download)
- Enterprise showcase: [claude.com/customers](https://claude.com/customers)
- The security incident (PromptArmor original): [promptarmor.com/resources/claude-cowork-exfiltrates-files](https://www.promptarmor.com/resources/claude-cowork-exfiltrates-files)
- Independent report on the incident: [the-decoder.com — Claude Cowork prompt injection](https://the-decoder.com/claude-cowork-hit-with-file-stealing-prompt-injection-days-after-anthropics-launch/)
:::

::: details 📚 References
- anthropic.com/product/claude-cowork · claude.com/product/cowork · claude.com/pricing
- thenewstack.io (Cowork out of preview into enterprise) · venturebeat.com (Cowork launch) · cnbc.com (Cowork update)
- simonw.substack.com (Simon Willison's first impressions) · datacamp.com (tutorial)
- pasqualepillitteri.it (the April 9, 2026 GA milestone) · help.apiyi.com, sentisight.ai, jamout.ai (pricing & limits)
- **Community case studies (section 06):** buildtolaunch.substack.com (Jenny Ouyang) · aiblewmymind.substack.com · jeffsu.org · simonw.substack.com · claude.com/customers · anthropic.com/news/pwc-expanded-partnership
- **Security (lethal trifecta):** wonderingaboutai.substack.com · byteiota.com · mintmcp.com · simonwillison.net

*Confidence: **high** for identity, features, platform, plans/pricing (cross-checked). **Lower** for regional availability (depends on the supported-countries policy at the time you access it) and detailed usage-limit numbers (third-party estimates). Verify for yourself when you use it.*
:::
