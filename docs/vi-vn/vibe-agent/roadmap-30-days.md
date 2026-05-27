---
title: 'Roadmap 30 ngày — Từ zero đến ship 1 agent có user'
description: 'Day-by-day plan 30 ngày cho 3 track: Solo coder, Agency builder, Operator non-dev. Ship 1 agent thật + đo metric.'
---

# Chapter 9 — Roadmap 30 ngày

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🗓️</p>

> **"30 ngày đủ để ship 1 agent có user.**
> **Không đủ để giàu. Đủ để **prove bạn ship được**."**

::: tip 🎯 Cách dùng roadmap
- **30 ngày** từ zero → ship 1 agent thật có user thật
- **3 track** tuỳ goal: Solo dev | Agency | Operator non-dev
- **2-4 giờ/ngày** dedicated
- Daily checkbox
:::

---

## 00 Pre-flight (Day 0)

::: warning ✅ Phải xong trước Day 1

- [ ] **Claude Code Pro** ($20/tháng) hoặc Cursor Pro
- [ ] **Anthropic API key** ($5 minimum top-up)
- [ ] **GitHub account** + 1 repo trống (private OK)
- [ ] **VPS hoặc cloud account** (Vercel/Cloudflare free OK)
- [ ] **Twitter/X account** build-in-public
- [ ] **Tracking sheet** (Notion / Apple Notes)
- [ ] **Calendar block** 2-4h/ngày cùng giờ
:::

---

## 🛤️ Chọn 1 trong 3 track

| Track | Goal Day 30 | Effort |
|------|------|------|
| **A. Solo dev** | Ship 1 agent product có 5+ paying customer | 3-4h/ngày |
| **B. Agency** | Close 1 deal $5-10K cho VN SME | 2-3h/ngày + sale meeting |
| **C. Operator** | Tự động hoá 5 workflow nội bộ, save 10h/tuần | 2h/ngày |

---

## 📅 TRACK A — Solo dev (agent product có user)

### Week 1 — Setup + idea (Day 1-7)

| Day | Task |
|------|------|
| **1** | Brainstorm 10 idea agent product (use [Chapter 5](./5-workflow-agent.md) + [6](./6-mcp-ecosystem.md) inspiration) |
| **2** | Pick 1: ngách + pain rõ + audience identifiable |
| **3** | Spec với Claude: feature list, user flow, tech stack |
| **4** | Landing page (Carrd / Framer) + waitlist form |
| **5** | Post Twitter / Reddit / FB group → 50+ signup |
| **6** | Customer dev: phone 5 user, ask 5 question |
| **7** | Refine spec dựa interview |

### Week 2 — Build core (Day 8-14)

| Day | Task |
|------|------|
| **8** | Setup repo: Next.js + Supabase + Stripe + Clerk + Claude API |
| **9** | Auth flow + landing → dashboard |
| **10** | Core agent loop (input → LLM + tool → output) |
| **11** | Save history to DB + display dashboard |
| **12** | Payment integration (Stripe checkout + webhook) |
| **13** | Polish: empty state, error, loading |
| **14** | Internal dogfood — 50 generation own use |

### Week 3 — Launch (Day 15-21)

| Day | Task |
|------|------|
| **15** | Pricing page (3 tier) + Privacy + Terms |
| **16** | Email waitlist: "we're live!" |
| **17** | **ProductHunt + Hacker News launch** |
| **18** | Reddit + Twitter thread + FB group |
| **19** | Reply mọi comment, fix critical bug |
| **20** | Customer support setup (email + Intercom) |
| **21** | Recap week: signup, conversion, MRR |

### Week 4 — Iterate + scale (Day 22-30)

| Day | Task |
|------|------|
| **22-24** | Ship 1 feature based feedback (2 ngày/feature) |
| **25** | Pricing A/B test |
| **26** | Cold outreach 50 (Twitter DM + email) |
| **27** | Add referral system (free credit for invite) |
| **28** | Cohort analysis: week-1 retention |
| **29** | Eval suite: 30 test case cho agent |
| **30** | Recap: MRR, paying customer, learning, next 30 |

### KPI Day 30

- ✅ Agent product live + payment work
- ✅ **5+ paying customer**
- ✅ **$50-500 MRR**
- ✅ 100+ free user
- ✅ Eval suite + cost monitoring active

---

## 📅 TRACK B — Agency (VN SME deal)

### Week 1 — Skill + portfolio (Day 1-7)

| Day | Task |
|------|------|
| **1** | Setup n8n cloud + Smax.ai trial + Claude API |
| **2** | Build hello-world workflow (Slack mention + Claude reply) |
| **3** | Build Smax.ai sample bot (Messenger sale) |
| **4** | Build voice agent demo (Vapi free credit) |
| **5** | Compile 3 demo into portfolio site |
| **6** | Write 1 case study post (LinkedIn + blog) |
| **7** | Identify 20 SME VN target (industry: F&B, fashion, retail) |

### Week 2 — Outreach + meeting (Day 8-14)

| Day | Task |
|------|------|
| **8** | Cold message 20 SME (Facebook DM, email, LinkedIn) |
| **9** | Follow-up + qualify first 5 reply |
| **10-11** | Discovery call 3 SME — understand pain |
| **12** | Draft proposal cho 2 strongest lead |
| **13** | Send proposal + follow-up call |
| **14** | Recap: meeting count, pipeline value |

### Week 3 — Close + deliver MVP (Day 15-21)

| Day | Task |
|------|------|
| **15** | Negotiate + close 1 deal ($5-10K) |
| **16** | Kick-off meeting với client, requirements |
| **17-19** | Build MVP (Smax.ai or n8n based) |
| **20** | Client review + iterate |
| **21** | Train client team (1h session) |

### Week 4 — Handover + recurring (Day 22-30)

| Day | Task |
|------|------|
| **22** | Final delivery + documentation |
| **23** | Pitch recurring support contract ($300-1K/tháng) |
| **24** | Get client testimonial / case study consent |
| **25** | Publish case study (blog + LinkedIn + Twitter) |
| **26-28** | Generate more lead: cold + warm referral |
| **29** | 2 more discovery call |
| **30** | Recap: total revenue, recurring, pipeline next month |

### KPI Day 30

- ✅ **1 deal closed $5-10K**
- ✅ **1 recurring contract** active
- ✅ Portfolio + 1 case study published
- ✅ Pipeline 5+ qualified lead next month

---

## 📅 TRACK C — Operator non-dev (workflow automation)

### Week 1 — Audit + setup (Day 1-7)

| Day | Task |
|------|------|
| **1** | List 10 tedious task bạn làm hằng ngày |
| **2** | Rank theo time spent + frustration |
| **3** | Pick 5 task có thể automate |
| **4** | Setup n8n cloud Starter ($20) hoặc Lindy free tier |
| **5** | Setup ChatGPT Plus ($20) hoặc Claude Pro |
| **6** | First automation: 1 task simple (vd: auto Slack mention reply) |
| **7** | Test 1 tuần, đo time saved |

### Week 2 — Build 5 workflow (Day 8-14)

| Day | Task |
|------|------|
| **8-9** | Workflow #2: Email triage (Claude classify + label) |
| **10-11** | Workflow #3: Cross-app data sync (Google Sheet → Notion) |
| **12-13** | Workflow #4: Calendar assistant (book + reminder) |
| **14** | Workflow #5: Daily digest (news + email → summary) |

### Week 3 — Refine + measure (Day 15-21)

| Day | Task |
|------|------|
| **15-17** | Daily run all 5 workflow, fix edge case |
| **18** | Measure: time saved/tuần vs baseline |
| **19** | Add error handling + Slack alert |
| **20** | Document each workflow (mini-runbook) |
| **21** | Recap week 3 |

### Week 4 — Expand + share (Day 22-30)

| Day | Task |
|------|------|
| **22-24** | Pitch boss / team: try workflow tools cho them |
| **25-26** | Build 2 workflow cho colleague (free, build goodwill) |
| **27** | Write internal doc: "5 workflow I automated" |
| **28** | Share LinkedIn + company blog |
| **29** | Quantify ROI: time × hourly rate |
| **30** | Recap: time saved/tuần, colleague onboarded |

### KPI Day 30

- ✅ **5 workflow active**
- ✅ **10+ giờ/tuần saved**
- ✅ 2 colleague onboarded
- ✅ Doc + share

---

## 🔁 Common across 3 tracks

::: tip 🎯 Bất kể track nào

**1. Daily build-in-public**
- 1 tweet/ngày share progress
- Audience = compound interest

**2. Weekly retro (Sunday)**
- KPI check
- Top 3 learning
- Next week priority

**3. Tool budget cap**
- Đầu tiên < $100/tháng
- Sau $500+ MRR: tăng

**4. Energy management**
- 2-4h focus, no multitask
- 1 ngày off/tuần
:::

---

## 🚧 Common pitfalls

::: warning 🚨 8 cú vấp

**1. Đổi track giữa chừng** → reset Day 1. Stick 30 ngày.

**2. Perfectionism Week 1** → đừng đợi MVP "đẹp". Ship Week 3 dù xấu.

**3. Over-tool** → 10 tool dùng 2. Stick 3-5 core.

**4. Skip build-in-public** → bắt đầu Day 1, không Day 30.

**5. Compare top creator** → họ 5 năm, bạn Day 7. Apple-to-apple.

**6. Quên KPI cụ thể** → "đang cải thiện" = không đo. Number target.

**7. Burn out tuần 3** → trough of disillusionment. Recharge, không quit.

**8. Không có distribution plan** → ship rồi không biết bán ai. Build distribution Day 1.
:::

---

## 🇻🇳 VN-specific tips

### Time zone

- VN UTC+7 — ship khi US ngủ
- Post lúc US sáng (8-9 EST = 19-20 VN) = engagement peak

### Cộng đồng VN

- **F8 community** (Sơn Đặng)
- **IndieHackers VN** Facebook
- **Vietnam Tech Twitter** (#vntech)
- **Built in Saigon** community

### Khi nào quit job chính?

| MRR | Action |
|------|------|
| < $500 | Side project |
| $500-2K | Part-time side |
| **$2K+** | Có thể quit (VN OK với $2K) |
| $5K+ | Definitely quit / scale team |

---

## 📊 Tracking template

```
Day | Date | Task done | Energy (1-10) | KPI today | Tomorrow
─────────────────────────────────────────────────────────────
1   | 1/6 | Spec idea  | 8/10         | 0         | Landing
2   | 2/6 | Landing    | 7/10         | 12 signup | Customer dev
...

Weekly review (Sunday):
- Top 3 win
- Top 3 challenge  
- KPI: [MRR / deal / time saved]
- Energy avg: __/10
- Next week priority (top 3)
```

---

## 🎯 Sau Day 30

- 🧠 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md) — refine workflow
- ⚙️ [Chapter 5 — Workflow Agent](./5-workflow-agent.md) — scale
- 🔌 [Chapter 6 — MCP](./6-mcp-ecosystem.md) — build moat
- 🛡️ [Chapter 8 — Safety](./safety-evals.md) — production-ready

---

::: tip 🚀 Lời cuối
> *"30 ngày không đủ để **giàu**.*
> *30 ngày đủ để **prove bạn ship được**.*
>
> *90% người không xong nổi Week 1.*
> *Bạn chỉ cần là 10% còn lại.*
>
> ***Day 1 starts now. Đi ✊***"
:::
