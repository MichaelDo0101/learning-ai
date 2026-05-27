---
title: 'Computer Use — Agent clicks screen like human (72.5% baseline)'
description: 'Anthropic Computer Use 14.9% (Oct 2024) → 72.5% (Feb 2026). Cases Rakuten, CRED, TELUS, Zapier. Pattern for automating legacy workflows without APIs.'
---

# Chapter 3 — Computer Use

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🖱️</p>

> **"From 14.9% (Oct 2024) → 72.5% (Feb 2026). At human baseline.**
> **Anthropic Computer Use is not a demo anymore."**

::: tip 🎯 You'll learn
- What Computer Use is + why 2025-2026 breakthrough
- OSWorld-Verified benchmark: 14.9% → 72.5% in 16 months
- 4 enterprise cases (Rakuten, CRED, TELUS, Zapier)
- Why Project Mariner shut down, Anthropic leads
- Target: data entry, accounting, legacy software operators
:::

---

## 01 What is Computer Use?

**Computer Use** = AI agent that can:
- 📸 Take screenshots
- 🖱️ Move + click mouse
- ⌨️ Type keys
- 📜 Scroll
- 📝 Read UI text (OCR + accessibility tree)

→ **Interact with computer like a human user**, no API needed.

### Why breakthrough?

**90% of enterprise software has no good API**:
- Legacy ERP (SAP, Oracle, Baan)
- Local SME software (VN: MISA, Bravo, Fast; similar pattern globally)
- Internal custom tools
- Web apps without public APIs

**Before Computer Use**: impossible to automate.

**After Computer Use**: agent clicks like human = automation possible.

---

## 02 Chronology — 16 months from 14.9% → 72.5%

| Time | Milestone | OSWorld score |
|------|------|------|
| **Oct 2024** | Anthropic launches Computer Use beta | **14.9%** |
| **Jan 2025** | Google Project Mariner launch | ~30% (WebVoyager) |
| **Apr 2025** | OpenAI Operator launch | ~38% |
| **Jul 2025** | Sonnet 4.0 + Computer Use 2.0 | ~52% |
| **Feb 2026** | Sonnet 4.6 | **72.5%** |
| **Human baseline** | (reference) | **~72%** |

> **Feb 2026 = moment Computer Use reached human baseline performance.**

---

## 03 OSWorld-Verified benchmark

**OSWorld** = benchmark measuring agent on desktop tasks.

### Sample tasks

- "Open Excel, create table from screenshot data, save to Documents"
- "Search YouTube for '[query]', play first video, comment '[text]'"
- "In Photoshop, open file, apply filter, save as 1080p PNG"
- "In Outlook, search emails from [sender], reply with template [X]"

### Categories

| Category | Sample |
|------|------|
| Office (Excel, Word, PPT) | Data entry, table format, slide create |
| Web browser | Form fill, scrape, schedule |
| Multimedia | Photoshop, video edit |
| OS-level | File manage, install software |
| Daily tasks | Email, calendar, messaging |

---

## 04 Enterprise cases 2025-2026

### Case 1: Rakuten

| Item | Detail |
|------|------|
| Industry | E-commerce |
| Use case | Auto data entry across vendor portals (legacy, no API) |
| Stack | Anthropic Computer Use + custom orchestrator |
| Result | Data entry time cut **~70%** |

### Case 2: CRED (India)

| Item | Detail |
|------|------|
| Industry | Fintech |
| Use case | Customer support agent navigates internal CRM |
| Result | Handles **40% support tickets** without human |

### Case 3: TELUS (Canada)

| Item | Detail |
|------|------|
| Industry | Telecom |
| Use case | Field tech tool navigation, troubleshoot script |
| Result | First-time-fix rate up **15%** |

### Case 4: Zapier

| Item | Detail |
|------|------|
| Use case | Computer Use ↔ Zapier for web apps without APIs |
| Result | Coverage up 30% with same Zapier engineering team |

---

## 05 Why Google Project Mariner shut down

**May 2026**: Google officially **shutdowns Project Mariner** (May 4, 2026), absorbs into Gemini Agent.

### Reasons (analyst speculation)

1. **Performance gap**: Mariner peaked ~83.5% WebVoyager but Anthropic Computer Use universal (web + desktop)
2. **Single-purpose**: Mariner browser-only, Anthropic full computer
3. **MCP advantage**: Anthropic ecosystem (97M downloads/month) vs Google standalone
4. **Distribution**: Anthropic API-first, Google consumer-first → enterprise prefers Anthropic

→ **Anthropic leads computer use race 2026.**

---

## 06 Computer Use workflow — architecture

::: tip 🖱️ Agent loop with Computer Use

```
1. Screenshot → 2. LLM analyze → 3. Action 
   (1080p)        (vision + plan)  (click/type/scroll)
                                        │
                                        ▼
                                 4. Wait + screenshot
                                        │
                                        ▼
                                 5. Verify expected state
                                        │
                          ┌─────────────┴────────┐
                       Continue              Done
```
:::

### Code example (Python)

```python
from anthropic import Anthropic
client = Anthropic()

response = client.beta.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    tools=[{
        "type": "computer_20251124",
        "name": "computer",
        "display_width_px": 1920,
        "display_height_px": 1080,
    }],
    messages=[{
        "role": "user",
        "content": "Open Excel, create table with 5 rows, save as report.xlsx"
    }],
    extra_headers={"anthropic-beta": "computer-use-2025-11-24"}
)
```

---

## 07 5 Computer Use patterns

::: tip 🎯 5 high-value use cases

### Pattern 1: Legacy ERP automation
- Target: SAP / Oracle / Baan / local accounting software
- Use case: Daily reconciliation, data export, report gen
- Cost saved: 1-2 FTE / department

### Pattern 2: Cross-app workflow
- Target: 5 software without integration
- Use case: Quote → invoice → CRM → email
- Cost saved: 30-60% sales ops time

### Pattern 3: Web scraping no-API
- Target: competitor websites, supplier portals
- Use case: Daily price monitor, stock check
- Cost saved: $0 vs $500/month scraping services

### Pattern 4: QA testing
- Target: web app, mobile emulator
- Use case: Run regression tests, screenshot diff
- Cost saved: 50% manual QA time

### Pattern 5: Customer support escalation
- Target: internal tool navigation
- Use case: Lookup customer, refund, escalate
- Cost saved: 20-40% T1 support
:::

---

## 08 Prompt pack — Computer Use

::: tip 📝 5 templates

**1. Step-by-step task (high accuracy)**
```
Task: [describe end goal]

Constraints:
- Use [specific app: Excel / Chrome / etc.]
- Save output to [path]
- Don't modify [protected area]

Verify each step before proceeding:
- After click: check state changed
- After type: check text appeared
- After save: check file exists

Pause and ask if uncertain.
```

**2. Cross-app workflow**
```
You'll work across [App A] and [App B]:
1. In [App A]: extract data from [location]
2. In [App B]: paste + format + save
3. Send confirmation email to [user]

Maintain checklist of completed steps.
On error: screenshot + describe before retry.
```

**3. Web automation with verification**
```
Navigate to [URL], perform [task].

Wait for page load (look for [indicator]) before clicking.
If element not found within 10s, take screenshot + explain.
Don't navigate away from [domain] without confirming.
```

**4. Data entry batch**
```
You have [N] rows to enter in [system].
Each row: [field structure]

Process:
- Read row [1] → enter
- Verify saved → next
- Every 10 rows: save checkpoint screenshot
- Stop + report on any error
```

**5. Eval / QA test**
```
Test [feature] by:
1. Navigate to [page]
2. Perform [action sequence]
3. Verify [expected outcome]
4. Take screenshot at each step
5. Compare against [baseline screenshot]

Report: pass/fail per step + diff explanation.
```
:::

---

## 09 Common pitfalls

::: warning 🚨 7 Computer Use mistakes

**1. No sandbox** → wrong click can destroy data. Always run in VM/container.

**2. No state verification** → agent assumes click worked → cascading error. Verify each step.

**3. Resolution mismatch** → agent trained 1920x1080, target 4K = wrong coordinates. Set display size matching.

**4. Sensitive data in screenshots** → cookie/password leaks. Mask or use test env.

**5. Race conditions** → agent clicks before UI ready → fail. Wait for loading indicators.

**6. Cost blowup** → Computer Use vision tokens expensive ($3/MTok input). Batch screenshots, not every-keystroke.

**7. Infinite agent loop** → can't recover error → loops forever. Max iteration cap + timeout.
:::

---

## 10 🌏 Use cases in emerging markets

### 🎯 5 high-pain enterprise niches

| Pain | Target user | Computer Use case |
|------|------|------|
| **Multiple accounting software** (MISA + Bravo + Fast in VN) | Accounting SME | Auto sync data, generate reports |
| **Tax filing** via government portal | Accountant + biz | Auto-file VAT, CIT returns |
| **HR onboarding** 10 legacy systems | HR | Auto create accounts across systems |
| **Procurement** check supplier portals | SME buyer | Daily price monitor, order |
| **Customer care** check 3 systems (CRM + ERP + warehouse) | CS rep | Auto lookup + escalate |

### 💰 Economics

| Item | Cost |
|------|------|
| Anthropic API (Sonnet 4.6) | $3/$15 per MTok |
| Compute (sandbox E2B / VM) | $20-100/month |
| Engineering setup | 1-2 weeks dev |
| **Total per agent** | $100-500/month running |

→ Replace 1 FTE local ($800-2K/month) → ROI **6-12 months**.

### 🏛️ Legal considerations

- ✅ Computer Use on local machine = OK
- ⚠️ Computer Use into client systems = need consent + GDPR-equiv
- ⚠️ Cybersecurity regulations (no sensitive data leaving country)
- ✅ Disclosure: employees know agent uses their machine

### 🤝 Agency / consultant opportunity

- Pitch SME / mid-market: "auto replace 1-2 data entry workers"
- Project size: $5K-50K (build + 6-month support)
- Recurring: $500-2K/month maintenance + upgrade

---

## 11 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Setup Anthropic Computer Use beta
- Run 5 example tasks (file manage, browser, Excel)
- Measure success rate

**Level 2 — 1 month**
- Pick 1 internal legacy workflow (e.g., daily reconciliation Excel + ERP)
- Build full agent automation
- Eval 30 tasks → measure accuracy + time saved

**Level 3 — 3 months**
- Pitch 1 SME: automate 1 workflow
- Deliver project (build + train + handover)
- Charge $5K-15K
:::

---

## 12 Continue reading

- 💻 [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🛡️ [Chapter 8 — Safety & Evals](./safety-evals.md)

::: tip 🖱️ Final word
> *"90% of enterprise software has no good API.*
> *90% of office work uses that software.*
> *Computer Use isn't "cool AI."*
> *It's the **final automation** that unlocks 90% of work."*
:::
