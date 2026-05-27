---
title: 'Computer Use — Agent click màn hình như người (72.5% baseline)'
description: 'Anthropic Computer Use 14.9% (10/2024) → 72.5% (2/2026). Case Rakuten, CRED, TELUS, Zapier. Pattern automate workflow legacy không có API.'
---

# Chapter 3 — Computer Use

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🖱️</p>

> **"Từ 14.9% (10/2024) → 72.5% (2/2026). Bằng baseline người.**
> **Anthropic Computer Use không còn là demo nữa."**

::: tip 🎯 Bạn sẽ học
- Computer Use là gì + tại sao đột phá 2025-2026
- Benchmark OSWorld-Verified: từ 14.9% → 72.5% trong 16 tháng
- 4 case enterprise (Rakuten, CRED, TELUS, Zapier)
- Vì sao Project Mariner đóng cửa, Anthropic dẫn đầu
- VN: target nhân viên data entry, kế toán xài phần mềm legacy
:::

---

## 01 Computer Use là gì?

**Computer Use** = AI agent có thể:
- 📸 Take screenshot
- 🖱️ Move + click chuột
- ⌨️ Gõ phím
- 📜 Scroll
- 📝 Đọc UI text (OCR + accessibility tree)

→ **Tương tác với computer như người dùng**, không cần API.

### Vì sao breakthrough?

**90% phần mềm enterprise không có API tốt**:
- ERP legacy (SAP, Oracle, Baan)
- VN: MISA, Bravo, Fast, KiotViet (có API limited)
- Internal tool tự build
- Web app không có public API

**Trước Computer Use**: bất khả tự động hoá.

**Sau Computer Use**: agent click như người = automation possible.

---

## 02 Chronology — 16 tháng từ 14.9% → 72.5%

| Thời gian | Milestone | OSWorld score |
|------|------|------|
| **T10/2024** | Anthropic launch Computer Use beta | **14.9%** |
| **T1/2025** | Project Mariner (Google) launch | ~30% (WebVoyager) |
| **T4/2025** | OpenAI Operator launch | ~38% |
| **T7/2025** | Sonnet 4.0 + Computer Use 2.0 | ~52% |
| **T2/2026** | Sonnet 4.6 | **72.5%** |
| **Baseline người** | (reference) | **~72%** |

> **2/2026 = moment Computer Use đạt baseline human performance.**

---

## 03 OSWorld-Verified benchmark

**OSWorld** = benchmark đo agent perform desktop task.

### Task examples

- "Mở Excel, tạo bảng từ data trong screenshot này, save vào folder Documents"
- "Search YouTube cho '[query]', play video đầu tiên, comment '[text]'"
- "Trong Photoshop, mở file, apply filter, save as PNG ở 1080p"
- "Trong Outlook, search email từ [sender], reply với template [X]"

### Categories

| Category | Sample |
|------|------|
| Office (Excel, Word, PPT) | Data entry, table format, slide create |
| Web browser | Form fill, scrape, schedule |
| Multimedia | Photoshop, video edit |
| OS-level | File manage, install software |
| Daily tasks | Email, calendar, messaging |

---

## 04 Case enterprise — 2025-2026

### Case 1: Rakuten

| Item | Detail |
|------|------|
| Industry | E-commerce |
| Use case | Auto data entry across vendor portals (legacy, no API) |
| Stack | Anthropic Computer Use + custom orchestrator |
| Result | Cut data entry time **~70%** |

### Case 2: CRED (Ấn Độ)

| Item | Detail |
|------|------|
| Industry | Fintech |
| Use case | Customer support agent navigate internal CRM |
| Result | Handle **40% support ticket** without human |

### Case 3: TELUS (Canada)

| Item | Detail |
|------|------|
| Industry | Telecom |
| Use case | Field tech tool navigation, troubleshoot script |
| Result | First-time-fix rate up **15%** |

### Case 4: Zapier

| Item | Detail |
|------|------|
| Use case | Computer Use ↔ Zapier integration cho web app không có API |
| Result | Coverage tăng 30% với same Zapier engineering team |

---

## 05 Vì sao Google Project Mariner đóng cửa

**T5/2026**: Google chính thức **shutdown Project Mariner** (T5/4/2026), absorb vào Gemini Agent.

### Lý do (analyst speculate)

1. **Performance gap**: Mariner peak ~83.5% WebVoyager nhưng Anthropic Computer Use universal (web + desktop)
2. **Single-purpose**: Mariner chỉ web browser, Anthropic toàn computer
3. **MCP advantage**: Anthropic ecosystem (97M downloads/tháng) vs Google standalone
4. **Distribution**: Anthropic API-first, Google consumer-first → enterprise prefer Anthropic

→ **Anthropic dẫn đầu computer use race 2026.**

---

## 06 Workflow Computer Use — kiến trúc

::: tip 🖱️ Agent loop với Computer Use

```
1. Screenshot ──→ 2. LLM phân tích ──→ 3. Action 
   (1080p)         (vision + plan)      (click/type/scroll)
                                              │
                                              ▼
                                       4. Wait + screenshot
                                              │
                                              ▼
                                       5. Verify expected state
                                              │
                              ┌───────────────┴─────────┐
                              │                         │
                          Continue                    Done
```
:::

### Code example (Python)

```python
from anthropic import Anthropic

client = Anthropic()

response = client.beta.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    tools=[
        {
            "type": "computer_20251124",
            "name": "computer",
            "display_width_px": 1920,
            "display_height_px": 1080,
        }
    ],
    messages=[
        {
            "role": "user",
            "content": "Open Excel, create a table with these 5 rows: [...], save as report.xlsx"
        }
    ],
    extra_headers={
        "anthropic-beta": "computer-use-2025-11-24"
    }
)

# Loop: handle tool calls
for tool_call in response.content:
    if tool_call.type == "tool_use":
        action = execute_action(tool_call.input)  # click/type/screenshot
        # Send back result
```

---

## 07 5 patterns Computer Use

::: tip 🎯 5 use case high-value

### Pattern 1: Legacy ERP automation
- Target: SAP / Oracle / Baan / VN MISA
- Use case: Daily reconciliation, data export, report gen
- Cost saved: 1-2 FTE / department

### Pattern 2: Cross-app workflow
- Target: 5 phần mềm không có integration
- Use case: Quote → invoice → CRM → email
- Cost saved: 30-60% sales ops time

### Pattern 3: Web scraping no-API
- Target: competitor website, supplier portal
- Use case: Daily price monitor, stock check
- Cost saved: $0 vs $500/tháng scraping service

### Pattern 4: QA testing
- Target: web app, mobile emulator
- Use case: Run regression test, screenshot diff
- Cost saved: 50% manual QA time

### Pattern 5: Customer support escalation
- Target: internal tool navigation
- Use case: Lookup customer, refund, escalate
- Cost saved: 20-40% T1 support
:::

---

## 08 Prompt pack — Computer Use

::: tip 📝 5 prompt template

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

State: maintain checklist of completed steps.
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
- Stop + report if any error
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

::: warning 🚨 7 sai lầm Computer Use

**1. Không sandbox** → agent click sai có thể destroy data. Always run trong VM/container.

**2. Không verify state** → agent assume click work → cascading error. Verify mỗi step.

**3. Resolution mismatch** → agent training 1920x1080, target 4K = miss coordinate. Set display size match.

**4. Sensitive data trong screenshot** → cookie/password leak. Mask hoặc dùng test env.

**5. Race condition** → agent click trước UI ready → fail. Wait for loading indicator.

**6. Cost blowup** → Computer Use vision token expensive ($3/MTok input). Batch screenshot, không every-keystroke.

**7. Agent loop infinite** → khi không recover error, loop forever. Max iteration cap + timeout.
:::

---

## 10 🇻🇳 Use case Việt Nam

### 🎯 5 ngách enterprise VN có pain rõ

| Pain | Target user | Use case Computer Use |
|------|------|------|
| **Kế toán MISA + Bravo + Fast** xài 5 phần mềm song song | Kế toán SME | Auto sync data, gen báo cáo |
| **Bộ phận thuế** điền form online thuế cục | Kế toán + DN | Auto khai thuế GTGT, TNDN |
| **HR onboarding** 10 phần mềm legacy | HR | Auto create account cross-system |
| **Procurement** check supplier portal | Mua hàng SME | Daily price monitor, order |
| **Customer care** check 3 system (CRM + ERP + warehouse) | CS rep | Auto lookup + escalate |

### 💰 Economics VN

| Item | Cost |
|------|------|
| Anthropic API (Sonnet 4.6) | $3/$15 per MTok |
| Compute (sandbox E2B / VM) | $20-100/tháng |
| Engineering setup | 1-2 tuần dev |
| **Total per agent** | $100-500/tháng running |

→ Replace 1 FTE VN ($800-2K/tháng) → ROI **6-12 tháng**.

### 🏛️ Pháp lý VN

- ✅ Computer Use trên local machine = OK
- ⚠️ Computer Use vào system của khách = cần consent + GDPR-equiv
- ⚠️ Quy định bảo mật (Luật An ninh mạng) — không sensitive data ra ngoài
- ✅ Disclosure: nhân viên biết có agent dùng máy mình

### 🤝 Agency / consultant VN có cơ hội

- Pitch SME / mid-market: "auto thay 1-2 nhân viên data entry"
- Project size: $5K-50K (build + 6-month support)
- Recurring: $500-2K/tháng maintenance + upgrade

---

## 11 Bài tập

::: tip ✍️ 3 cấp độ

**Level 1 — 1 tuần**
- Setup Anthropic Computer Use beta
- Run 5 example task (file manage, browser, Excel)
- Đo success rate

**Level 2 — 1 tháng**
- Pick 1 workflow nội bộ legacy (vd: daily reconciliation Excel + ERP)
- Build agent automate full
- Eval 30 task → đo accuracy + time saved

**Level 3 — 3 tháng**
- Pitch 1 SME VN: tự động hoá 1 workflow
- Deliver project (build + train + handover)
- Charge $5K-15K
:::

---

## 12 Đọc tiếp

- 💻 [Chapter 1 — Vibe Coding Solo](./1-vibe-coding-solo.md)
- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md)
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md)
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md)
- 🛡️ [Chapter 8 — Safety & Evals](./safety-evals.md)

::: tip 🖱️ Lời cuối
> *"90% phần mềm enterprise không có API tốt.*
> *90% công việc văn phòng VN dùng các phần mềm đó.*
>
> *Computer Use không phải "AI cool".*
> *Đó là **automation cuối cùng** unlock 90% work."*
:::
