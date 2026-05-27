---
title: 'Solo SaaS $1M — Pieter Levels, Base44, Medvi'
description: 'Case Pieter Levels ($1.65M ARR PhotoAI), Maor Shlomo ($80M exit Base44), Matthew Gallagher ($401M Medvi). Wrap API gen + niche + build-in-public.'
---

# Chapter 4 — Solo SaaS $1M

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">💰</p>

> **"14,000 dòng PHP raw mixed với inline HTML, CSS trong style tag, JS trong script tag.**
> **0 nhân viên. $132K MRR. $1.65M ARR."**
> — *Pieter Levels (@levelsio), tweet 4.8M view*

::: tip 🎯 Bạn sẽ học
- Cách build solo SaaS trên top AI gen API (Flux, Replicate, Fal)
- Tại sao "ship before perfect" + build-in-public = competitive moat
- 3 case từ $0 → $1M-$401M ARR
- Niche AI gen chưa được phục vụ (đặc biệt VN-friendly)
- Tax + payment stack cho founder VN go-global
:::

---

## 01 Pieter Levels — Indie hacker $1.65M ARR solo

### Profile

| Item | Số |
|------|------|
| Tên | **Pieter Levels** (@levelsio) |
| Quê | Hà Lan, sống Bali / Hà Lan |
| Background | 10 năm "build in public", 70+ failed startups |
| X followers | **~600K** |
| Số nhân viên | **0** |

### Portfolio (T5/2026)

| Product | Status | ARR / MRR |
|------|------|------|
| **PhotoAI** | AI headshot/portrait generator | **$132K MRR ≈ $1.65M ARR** (T11/2025) |
| **InteriorAI** | AI interior design | ~$300K ARR |
| **NomadList** | Remote work community | ~$500K ARR (legacy) |
| **RemoteOK** | Remote job board | ~$300K ARR (legacy) |
| **fly.pieter.com** | Browser flight game (vibe-coded) | $87K MRR in 17 ngày, $1M ARR cao điểm |
| **Total portfolio** | ~5 product active | **~$3M ARR** |

### Tech stack (notoriously simple)

- **PHP raw** (~14K dòng cho PhotoAI)
- **Inline HTML + CSS + JS** (không React, không Next.js)
- **MySQL**
- **Replicate API** (cho Flux + Stable Diffusion)
- **Stripe** (payment)
- **Hetzner** (cheap server)

### Quote định nghĩa

> *"Without AI it would have taken me 10-100x more time. AI really is a creativity and speed maximizer."*
> — *Pieter Levels*

> *"Ship fast. Ship ugly. Ship in public."*
> — *Pieter Levels (motto)*

---

## 02 Maor Shlomo — Base44, $80M exit 6 tháng

### Profile

| Item | Số |
|------|------|
| Tên | **Maor Shlomo** |
| Quê | Israel |
| Product | **Base44** — no-code AI app builder |
| Solo founder | ✅ |

### Result

| Metric | Số |
|------|------|
| Launch | T2/2025 |
| Users (4 tuần đầu) | **250K** |
| Revenue tháng đầu | **~$1.5M** |
| **Exit acquisition** | **$80M trong 6 tháng** |

### Bài học

> **"Một solo founder, 6 tháng, $80M exit. Không phải fluke — là pattern mới 2025-2026."**

Stack Base44 = wrap LLM + UI builder + Vercel deploy. **Không công nghệ mới**. Cái mới: **execution velocity + niche timing**.

---

## 03 Matthew Gallagher — Medvi, $401M năm 1

### Profile

| Item | Số |
|------|------|
| Tên | **Matthew Gallagher** |
| Product | **Medvi** (healthcare-adjacent) |
| Setup cost | **$20K** + 2 tháng |
| Year 1 revenue | **$401M** 🤯 |
| Projected | $1.8B/năm |

### Stack

- **ChatGPT / Claude / Grok** — code
- **Midjourney + Runway** — ad creative
- **ElevenLabs + custom agent** — customer service
- **0 engineer thuê** (chỉ contractor outsource phần custom)

### Bài học — "Billion-dollar one-person company"

Sam Altman đã predict này. Medvi là **case đầu tiên** thực sự gần $1B từ solo founder.

> *"Cảnh báo: $401M ≠ profit. Doanh thu top-line. Vẫn cực ấn tượng cho solo."*

---

## 04 Pattern chung của 3 case

::: tip 🎯 5 yếu tố lặp lại

**1. Wrap 1 API tốt + niche cụ thể**
- Pieter: Flux + portrait
- Maor: LLM + app builder
- Matthew: nhiều LLM + healthcare niche

**2. Ship sớm, ship xấu**
- PhotoAI là 14K dòng PHP "raw"
- Base44 first version "đủ chạy"
- Không over-engineer

**3. Build in public**
- Pieter có 600K follower X 10 năm
- Maor share progress mỗi tuần
- Audience trước product

**4. Niche underserved**
- AI headshot (Pieter) — corporate cần ảnh, không có ai làm pro
- No-code AI builder (Maor) — non-dev muốn build app
- Healthcare booking (Matthew) — fragmented market

**5. Tỉ lệ chi phí cực thấp**
- 0 nhân viên
- $50-500/tháng cloud
- $0-200/tháng tool
:::

---

## 05 Pipeline build solo AI SaaS — 6 bước

### Bước 1. Pick niche

Framework: **3 câu hỏi**:
1. **Bạn có pain gì lặp lại?** (vd: ảnh hồ sơ visa)
2. **Audience là ai?** (vd: người Việt đi nước ngoài)
3. **AI gen tool nào solve được?** (Flux + LoRA)

### Bước 2. Validate trong 24h

- Tạo landing page (Webflow / Framer / Carrd) — 2 giờ
- Mô tả product + form đăng ký waitlist
- Post lên Twitter / Reddit / Facebook group
- Đo: **đăng ký waitlist trong 24h**?

Target: **>20 signup trong 24h** = niche khả thi.

### Bước 3. MVP trong 7 ngày

Stack đơn giản:
- **Frontend**: Next.js / SvelteKit / **PHP raw** (theo Levels)
- **Auth**: Clerk (free tier)
- **DB**: Supabase / Postgres
- **AI API**: Replicate / Fal.ai / OpenAI
- **Payment**: Stripe
- **Deploy**: Vercel / Cloudflare Pages

### Bước 4. Pricing

| Model | Khi dùng |
|------|------|
| **Pay-per-use** | Generation product (mỗi ảnh $0.05-0.20) |
| **Subscription** | Recurring use ($9-49/tháng) |
| **One-time** | Lifetime deal launch ($29-99) |
| **Hybrid** | Sub + credit top-up |

PhotoAI: $9-39/tháng + credit. Base44: $29-99/tháng + usage.

### Bước 5. Launch sequence

| Day | Action |
|------|------|
| -7 | Build waitlist tweet thread (build-in-public) |
| 0 | Launch ProductHunt + Hacker News + Reddit + Twitter |
| 1-7 | Daily build-in-public update (số signup, MRR) |
| 14 | Post-launch iteration based on feedback |
| 30 | Đo $MRR + retention |

### Bước 6. Iterate

- **Weekly**: pricing test
- **Bi-weekly**: feature ship
- **Monthly**: review churn + add referral

---

## 06 Niche AI gen có cơ hội (T5/2026)

::: tip 🎯 20 niche cụ thể

**Image gen**
1. AI headshot doanh nhân (PhotoAI dominate global, VN trống)
2. AI ảnh thẻ visa / hộ chiếu (VN cực hot)
3. AI ảnh cưới (background Đà Nẵng, Hội An)
4. AI product photo cho seller TikTok Shop / Shopee
5. AI interior design (VN căn hộ chung cư)
6. AI logo + brand identity (SME VN)
7. AI ảnh CV / LinkedIn profile

**Video gen**
8. AI TVC mock-up cho SME pitch
9. AI ad UGC cho TikTok Shop (cực hot 2026)
10. AI karaoke MV instrumental
11. AI explainer cho B2B SaaS
12. AI mini-series tiếng địa phương

**Audio**
13. AI dubbing tiếng Việt cho video tiếng nước ngoài
14. AI bolero / V-Pop production
15. AI audio book tiếng Việt
16. AI voice clone cho podcast (own voice)

**3D**
17. AI 3D asset cho Roblox creator VN
18. AI 3D model cho e-commerce (xoay 360)

**Multimodal**
19. AI brand identity full pack (logo + ad + voice)
20. AI yearbook / portfolio cho học sinh sinh viên
:::

---

## 07 Prompt pack — solo founder workflow

::: tip 📝 5 prompt thực hành

**1. Niche validation (Claude / ChatGPT)**
```
Tôi muốn build AI SaaS niche [TOPIC]. 
Phân tích:
1. TAM (total addressable market) global vs Việt Nam
2. Top 3 competitor + giá + USP
3. 5 pain point của target user
4. 3 angle marketing khác biệt
5. Pricing model phù hợp + giá đề xuất
```

**2. Landing page copy (Claude)**
```
Viết landing page copy cho [product name]:
- Headline (1 dòng, dưới 12 từ)
- Subheadline (2 dòng)
- 3 benefit (mỗi cái 1 dòng, focused trên outcome)
- CTA primary + secondary
- Social proof placeholder
- FAQ 5 câu
Tone: [direct / playful / aspirational]
```

**3. Cold post launch (Twitter / Reddit)**
```
Viết 5 tweet variation launch product [name]:
- Tweet 1: hook story (vì sao tôi build)
- Tweet 2: feature demo (1 dòng + screenshot)
- Tweet 3: pricing + free tier
- Tweet 4: ask for feedback
- Tweet 5: numbers (signup, day-1 MRR)
Tone: Pieter Levels-style — direct, no fluff
```

**4. Pricing test (Claude)**
```
Phân tích 3 pricing model cho [product]:
A: $9/mo unlimited
B: $0 + $0.10/generation
C: $29/mo + 100 credit/mo + $0.05/extra

Cho mỗi model:
- LTV estimate
- Churn risk
- Volume needed để $10K MRR
- VN/global appeal
```

**5. Customer email (Claude)**
```
Viết email cho user vừa hủy subscription [product]:
- Acknowledge feedback
- Ask 1 câu hỏi cụ thể: "Cái gì làm bạn hủy?"
- Offer 50% off 3 tháng nếu thử lại
- Sign-off ngắn
Tone: human, không corporate
Length: <100 từ
```
:::

---

## 08 Common pitfalls

::: warning 🚨 7 sai lầm

**1. Over-engineer trước khi validate** → 3 tháng dev, 0 user

**2. Pricing quá thấp** → khó scale, dễ burnout

**3. Không build audience trước** → launch ra hư vô

**4. Chọn niche quá rộng** → "AI design tool" thua "AI headshot for LinkedIn"

**5. Quên billing edge case** → user lạm dụng free tier → margin âm

**6. Không có churn tracking** → MRR tăng giả, churn ăn hết

**7. Skip API cost optimization** → margin < 50% là alarm
:::

---

## 09 🇻🇳 Founder VN — playbook

### 🎯 Lợi thế VN

| Yếu tố | VN | US/EU |
|------|------|------|
| **Cost engineer** | $800-3K/tháng | $8-15K/tháng |
| **Cloud cost** | Như nhau ($50-500) | Như nhau |
| **Time to ship** | Như nhau (AI tool) | Như nhau |
| **Lifestyle cost** | $500-1.5K/tháng | $3-8K/tháng |
| **Margin runway** | **3-5x** | 1x |

→ VN founder có thể **sống được trên $2K MRR** trong khi US cần $10K+.

### 💰 Payment stack VN

| Layer | Tool | Note |
|------|------|------|
| **Customer charge** | **Stripe Atlas** | Cần công ty Mỹ (Delaware) — $500 setup |
| | **Paddle** | Merchant of record, không cần company US |
| | **Lemon Squeezy** | Acquired by Stripe 2025, similar to Paddle |
| **Founder pay-out** | **Wise** | Phổ biến nhất VN |
| | **Payoneer** | Tốt cho marketplace |
| | **PayPal** | Phí cao, bị limit dễ |
| **VN tax** | Khai thuế TNCN > 100M VND/năm | 5% kinh doanh + 5% TNCN |

### 📜 Pháp lý

- **Hộ kinh doanh cá thể**: thuế khoán, dễ setup, giới hạn quy mô
- **Công ty TNHH 1 thành viên**: cho scale lớn, mua hoá đơn được
- **Stripe Atlas + LLC Mỹ**: chuyên nghiệp, cần kế toán quốc tế ($200-500/tháng)
- **Hoá đơn điện tử**: bắt buộc nếu có công ty VN (Misa, Viettel SInvoice, VNPT)

### 🤝 Community VN

- **WIP.co** — solo founder global, nhiều VN
- **IndieHackers VN group** (Facebook)
- **Built in Saigon** podcast
- **Vietnam Tech Twitter** (#vntech)

---

## 10 Bài tập

::: tip ✍️ 3 cấp độ

**Level 1 — 1 tuần**
- Pick 1 niche từ list 20
- Validate: landing page + 50 signup
- Dùng Carrd + Tally form

**Level 2 — 1 tháng**
- Build MVP (Next.js + Supabase + Replicate)
- Launch ProductHunt
- Target: **5 paying customer**

**Level 3 — 6 tháng**
- $1K MRR
- 100 paying customer
- Build in public ≥50 follower/tuần
:::

---

## 11 🎥 Watch & Learn — 5 video tutorial

<ChapterVideos :videos="[
  { id: 'oFtjKbXKqbg', title: 'Pieter Levels: Programming, Viral AI Startups, Digital Nomad', channel: 'Lex Fridman', duration: '3:50:00', why: '3.5 giờ với chính founder $250K/month MRR, 0 employees. \'12 startups in 12 months\' và vibe coding workflow.' },
  { id: '9Wjec3wh4p8', title: 'Pieter Levels — Indie Hacking is Dead. Now what?', channel: 'The Bootstrapped Founder', duration: '1:00:00', why: '2025 interview — Pieter argue indie hacking chuyển từ \'dead\' sang \'the new normal\' trong era AI.' },
  { id: 'RnDJf2K8y1w', title: 'Building a SaaS in 24 hours — PART 1', channel: 'Marc Lou', duration: '30:00', why: 'Marc Lou livebuild eLearning với ShipFast — raw workflow của founder $50K+/month MRR.' },
  { id: '1CDBbEVBtBU', title: 'I built a startup in 31 hours (SaaS)', channel: 'Marc Lou', duration: '25:00', why: 'ZenVoice case (Stripe invoicing) — $2,000 trong 5 ngày sau launch.' },
  { id: 'pXALDuq-kq0', title: 'Cursor vs Claude Code vs Windsurf (tiếng Việt)', channel: '200Lab', duration: '20:00', why: 'Tool comparison 3 tool chính cho vibe coding stack, dạy bằng tiếng Việt.' }
]" />

---

## 12 🔬 Deep Dive Techniques 2026

::: tip 🚀 8 advanced techniques cho solo founder $1M

**1. Boilerplate-first approach (Marc Lou pattern)**
- Đừng start from scratch. ShipFast = Next.js + MongoDB + Auth.js + Stripe + Mailgun + ChatGPT
- Set up boilerplate riêng sau project 3-4
- Marc Lou ship **21 product** với pattern này

**2. Single-account separation cho multi-product**
- Mỗi app → Stripe account riêng
- Suspension/payout delay 1 account không kill app khác
- Best practice từ indie hacker stack guide

**3. Lemon Squeezy vs Stripe quyết định**
- **Stripe**: nếu tự xử lý tax compliance (US-focused)
- **Lemon Squeezy**: outsource VAT/GST/sales tax globally (Merchant of Record)
- Founder VN bán toàn cầu → **recommend Lemon Squeezy**

**4. Webhook + retry scheduler trong tuần 1-3**
- Solo founder thường skip → revenue leakage
- Build Stripe webhook + smart retry based on failure codes
- **2-5% MRR thường mất** do failed payments → recover được

**5. Soul ID-style consistency cho landing page**
- Maor Shlomo (Base44) hit 250K user trong 6 tháng nhờ landing page consistent
- Dùng MJ v7 + reference image lock face/style cross assets

**6. AI replaces FUNCTIONS, not employees** (Matthew Gallagher pattern)
- Medvi $401M năm 1 với 1-2 người
- Map từng business function (CS, marketing, code, finance) → AI tool tương ứng
- Không hire trừ khi >$10K/month per function chi phí AI

**7. Build in public = free CAC**
- Pieter Levels: 700K X followers → organic CAC ~$0
- Marc Lou: $92K trong 2 ngày (CodeFast launch) từ 135K followers
- Solo founder phải invest **30% time** vào content + audience

**8. Profit margin > top-line**
- Base44 $189K profit/tháng T5/2025 (**16.2% margin**)
- Đó là metric Wix nhìn để pay $80M, không phải revenue
- Track gross margin từ ngày 1
:::

---

## 13 📚 More Case Studies (2025-2026)

### Case A: Maor Shlomo / Base44 → **Wix $80M cash** (T6/2025)

| Item | Số |
|------|------|
| Founder | Solo + 8 employees |
| Tuổi product | **6 tháng** |
| Users | **250K** (10K trong 3 tuần đầu) |
| Profit T5/2025 | **$189K** (16.2% margin) |
| **Exit** | **$80M cash + $90M earnout milestones** |

> **Insight**: "Solo" ≠ zero employee — 1 founder + small team. Acquisition <1 năm sau launch.
> Source: [TechCrunch](https://techcrunch.com/2025/06/18/6-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash/)

### Case B: Matthew Gallagher / Medvi → **$1.8B run-rate** (T1/2026)

| Item | Số |
|------|------|
| Founded | T9/2024 với **$20K seed** |
| Year 1 revenue | **$401M** (2025) |
| **Projected year 2** | **$1.8B** (2026) |
| Team size | **1-2 người + ~250K users** |
| Profit margin | **~16.2%** |
| Stack | ChatGPT + Claude + Grok cho code + marketing + CS |
| Niche | Direct-to-consumer GLP-1 telehealth |

> **Insight**: AI replaces full corporate functions. Proof point cho Sam Altman 2024 prediction "1-person billion-dollar company".
> Source: [Inc](https://www.inc.com/leila-sheridan/the-no-employee-billion-dollar-startup-how-ai-is-changing-the-face-of-solopreneurship/91326517)

### Case C: Pieter Levels / fly.pieter.com → **$1M ARR trong 2 tháng** (T3/2025)

| Item | Số |
|------|------|
| Build time | **3 giờ** với Cursor + Grok |
| Stack | Three.js + Cursor + Grok 2 |
| Day 1 MRR | **$57K** |
| MRR T3/2025 | **$75K** |
| **$1M ARR** | **12 March 2025** |
| In-game upgrade | $29.99 F-16 |

> **Insight**: Distribution-led (Elon Musk RT amplified). Game không cần "production-grade code" — chỉ cần fun + viral hook.
> Source: [404 Media](https://www.404media.co/this-game-created-by-ai-vibe-coding-makes-50-000-a-month-yours-probably-wont/)

---

## 14 🛠️ Tool Updates (T2-T5/2026)

| Tool | Update | Date | Key impact |
|------|------|------|------|
| **Bolt v2** | $40M ARR/6 tháng. Team Templates, Editable Netlify URLs, Opus 4.6, Figma import | T10/2025 → 2026 | Move sang enterprise-grade production |
| **Lovable** | **$20M ARR trong 2 tháng** đầu 2026 — fastest growth European startup history | T2026 | Native Supabase = moat cho non-tech VN founder |
| **v0 → v0.app rebrand** | Vercel position lại từ UI gen → full-stack platform | T1/2026 | Compete trực tiếp Lovable + Bolt |
| **Claude Code MCP v2.1.76** | Enhanced MCP elicitation, lazy loading tools | 14/3/2026 | Self-hosted sandbox public beta (Cloudflare/Daytona/Modal/Vercel) |
| **Agent SDK credit billing** | Anthropic tách Agent SDK + `claude -p` ra monthly credit riêng | 15/6/2026 | Solo founder cần monitor — không unlimited |
| **T3 Code** (Theo) | Open-source AI coding tool free | T1/2026 | Alternative cho Cursor/Claude Code |

Source: [NxCode comparison](https://www.nxcode.io/resources/news/v0-vs-bolt-vs-lovable-ai-app-builder-comparison-2025) | [Claude Agent SDK docs](https://code.claude.com/docs/en/agent-sdk/overview)

---

## 15 Đọc tiếp

- 🎬 [Chapter 1 — Solo Studio](./1-solo-studio.md) — pipeline ad
- 👤 [Chapter 3 — Virtual Influencer](./3-virtual-influencer.md) — combine product
- 📱 [Chapter 5 — Sora 2 & TikTok](./5-sora-2-tiktok.md) — viral distribution
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)
- 🗓️ [Chapter 9 — Roadmap 30 ngày](./roadmap-30-days.md) — execute now

::: tip 💰 Lời cuối
> *"Pieter Levels không phải genius. Anh ấy ship 70+ project failed trước khi PhotoAI work.*
>
> *Cái khó nhất không phải code (AI làm hộ).*
> *Là **kiên trì ship khi 60 project đầu fail**."*
:::
