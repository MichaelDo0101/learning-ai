---
title: 'Solo SaaS $1M — Pieter Levels, Base44, Medvi'
description: 'Pieter Levels ($1.65M ARR PhotoAI), Maor Shlomo ($80M exit Base44), Matthew Gallagher ($401M Medvi). Wrap gen API + niche + build-in-public.'
---

# Chapter 4 — Solo SaaS $1M

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">💰</p>

> **"14,000 lines of raw PHP mixed with inline HTML, CSS in style tags, JS in script tags.**
> **0 employees. $132K MRR. $1.65M ARR."**
> — *Pieter Levels (@levelsio), tweet 4.8M views*

::: tip 🎯 You'll learn
- How to build solo SaaS on top of AI gen APIs (Flux, Replicate, Fal)
- Why "ship before perfect" + build-in-public = competitive moat
- 3 cases from $0 → $1M-$401M ARR
- Underserved AI gen niches
- Tax + payment stack for global founders
:::

---

## 01 Pieter Levels — solo indie hacker $1.65M ARR

### Profile

| Item | Number |
|------|------|
| Name | **Pieter Levels** (@levelsio) |
| Home | Netherlands, lives Bali / Netherlands |
| Background | 10 years "build in public", 70+ failed startups |
| X followers | **~600K** |
| Employees | **0** |

### Portfolio (May 2026)

| Product | Status | ARR/MRR |
|------|------|------|
| **PhotoAI** | AI headshot/portrait | **$1.65M ARR** ($132K MRR Nov 2025) |
| **InteriorAI** | AI interior design | ~$300K ARR |
| **NomadList** | Remote community | ~$500K ARR |
| **RemoteOK** | Remote job board | ~$300K ARR |
| **fly.pieter.com** | Browser flight game (vibe-coded) | **$0 → $1M ARR in 17 days** |
| **Total** | | **~$3M ARR** |

### fly.pieter.com — case study

| Milestone | Number |
|------|------|
| Launch | Mar 2025 |
| 17 days later | **$1M ARR** ($87K MRR) |
| Build-in-public tweet | 4.8M views |
| Stack | three.js + raw JS + Cursor |
| Build time | **3 days** |
| Team | **1 (Pieter)** |

### Defining quote

> *"Without AI it would have taken me 10-100x more time. AI really is a creativity and speed maximizer."*
> *"Ship fast. Ship ugly. Ship in public."*
> — *Pieter Levels*

---

## 02 Maor Shlomo — Base44, $80M exit / 6 months

| Item | Number |
|------|------|
| Founder | **Maor Shlomo** (Israel, solo) |
| Product | **Base44** — no-code AI app builder |
| Launch | Feb 2025 |
| Users in 4 weeks | **250K** |
| Month 1 revenue | **~$1.5M** |
| **Exit** | **$80M acquisition in 6 months** |

> **Lesson**: Solo founder + AI app builder + execution velocity = new 2025-2026 pattern.

---

## 03 Matthew Gallagher — Medvi, $401M year 1

| Item | Number |
|------|------|
| Product | **Medvi** (healthcare-adjacent) |
| Setup cost | **$20K** + 2 months |
| Year 1 revenue | **$401M** 🤯 |
| Projected | $1.8B/year |
| Engineers hired | **0** (only contractor for custom parts) |

Stack:
- **ChatGPT / Claude / Grok** — code
- **Midjourney + Runway** — ad creative
- **ElevenLabs + custom agent** — customer service

> **First case approaching $1B from solo founder.** Sam Altman predicted this. Medvi delivered it.
> 
> Note: $401M ≠ profit. Top-line revenue. Still impressive for solo.

---

## 04 Pattern across all 3 cases

::: tip 🎯 5 recurring factors

**1. Wrap 1 good API + specific niche**
- Pieter: Flux + portraits
- Maor: LLM + app builder
- Matthew: multiple LLMs + healthcare niche

**2. Ship early, ship ugly**
- PhotoAI = 14K lines of "raw" PHP
- Base44 first version "good enough"
- No over-engineering

**3. Build in public**
- Pieter: 600K X followers over 10 years
- Maor: weekly progress shares
- Audience before product

**4. Underserved niche**
- AI headshot (Pieter) — corporate needs photos, no pro service
- No-code AI builder (Maor) — non-devs want to build apps
- Healthcare booking (Matthew) — fragmented market

**5. Extremely lean cost structure**
- 0 employees
- $50-500/month cloud
- $0-200/month tools
:::

---

## 05 Build pipeline — 6 steps

### Step 1. Pick niche

3-question framework:
1. **What pain do you experience repeatedly?** (e.g., visa photos)
2. **Who's the audience?** (e.g., people emigrating)
3. **Which AI gen tool solves it?** (Flux + LoRA)

### Step 2. Validate in 24 hours

- Create landing page (Webflow / Framer / Carrd) — 2 hours
- Product description + waitlist signup
- Post Twitter / Reddit / Facebook group
- Measure: **24-hour signups?**

Target: **>20 signups in 24 hours** = viable niche.

### Step 3. MVP in 7 days

Simple stack:
- **Frontend**: Next.js / SvelteKit / **raw PHP** (Levels-style)
- **Auth**: Clerk (free tier)
- **DB**: Supabase / Postgres
- **AI API**: Replicate / Fal.ai / OpenAI
- **Payment**: Stripe
- **Deploy**: Vercel / Cloudflare Pages

### Step 4. Pricing

| Model | When to use |
|------|------|
| **Pay-per-use** | Generation product ($0.05-0.20/image) |
| **Subscription** | Recurring ($9-49/month) |
| **One-time** | Lifetime deal launch ($29-99) |
| **Hybrid** | Sub + credit top-up |

PhotoAI: $9-39/month + credits. Base44: $29-99/month + usage.

### Step 5. Launch sequence

| Day | Action |
|------|------|
| -7 | Build waitlist tweet thread |
| 0 | Launch ProductHunt + Hacker News + Reddit + Twitter |
| 1-7 | Daily build-in-public update (signups, MRR) |
| 14 | Post-launch iteration based on feedback |
| 30 | Measure $MRR + retention |

### Step 6. Iterate

- **Weekly**: pricing test
- **Bi-weekly**: feature ship
- **Monthly**: review churn + add referral

---

## 06 20 specific niches (May 2026)

::: tip 🎯 Concrete niches

**Image gen**
1. AI executive headshots
2. AI passport/visa photos
3. AI wedding photos (cultural backdrop)
4. AI product photos for TikTok Shop/Shopee sellers
5. AI interior design
6. AI logo + brand identity
7. AI CV/LinkedIn profile photos

**Video gen**
8. AI TVC mockups for SME pitches
9. AI UGC ads for TikTok Shop
10. AI karaoke MV
11. AI explainer videos for B2B SaaS
12. AI mini-series in local language

**Audio**
13. AI dubbing local language for foreign videos
14. Genre-specific AI music production
15. AI audio books in local language
16. AI voice clone for podcasts (own voice)

**3D**
17. AI 3D assets for Roblox creators
18. AI 3D models for e-commerce (360 view)

**Multimodal**
19. AI full brand identity pack (logo + ad + voice)
20. AI yearbook / portfolio for students
:::

---

## 07 Prompt pack

::: tip 📝 5 templates

**1. Niche validation (Claude)**
```
I want to build an AI SaaS in [TOPIC] niche.
Analyze:
1. TAM global vs [local market]
2. Top 3 competitors + price + USP
3. 5 user pain points
4. 3 differentiating marketing angles
5. Pricing model + suggested price
```

**2. Landing page copy (Claude)**
```
Write landing copy for [product name]:
- Headline (1 line, <12 words)
- Subheadline (2 lines)
- 3 benefits (outcome-focused)
- Primary + secondary CTA
- 5 FAQ
Tone: [direct / playful / aspirational]
```

**3. Launch posts**
```
Write 5 tweet variants for [name] launch:
- Tweet 1: hook story (why I built)
- Tweet 2: feature demo (1 line + screenshot)
- Tweet 3: pricing + free tier
- Tweet 4: ask for feedback
- Tweet 5: numbers (signups, day-1 MRR)
Tone: Pieter Levels-style — direct, no fluff
```

**4. Pricing test**
```
Analyze 3 pricing models for [product]:
A: $9/mo unlimited
B: $0 + $0.10/generation
C: $29/mo + 100 credits/mo + $0.05/extra

For each:
- LTV estimate
- Churn risk
- Volume needed for $10K MRR
- Global appeal
```

**5. Churn email (Claude)**
```
Write email to user who canceled [product]:
- Acknowledge feedback
- 1 specific question: "What made you cancel?"
- Offer 50% off 3 months if retry
- Short sign-off
Tone: human, not corporate
Length: <100 words
```
:::

---

## 08 Common pitfalls

::: warning 🚨 7 mistakes

**1. Over-engineer before validate** → 3 months dev, 0 users

**2. Pricing too low** → hard to scale, burnout

**3. No audience built first** → launch into void

**4. Niche too broad** → "AI design tool" loses to "AI LinkedIn headshots"

**5. Forget billing edge cases** → users abuse free tier → margin negative

**6. No churn tracking** → MRR fake-grows, churn eats it

**7. Skip API cost optimization** → margin < 50% is alarm
:::

---

## 09 🌏 Global founder advantages

| Factor | Emerging markets | US/EU |
|------|------|------|
| **Engineer cost** | $800-3K/month | $8-15K/month |
| **Cloud cost** | Same ($50-500) | Same |
| **Time to ship** | Same (AI tool) | Same |
| **Lifestyle cost** | $500-1.5K/month | $3-8K/month |
| **Margin runway** | **3-5x** | 1x |

→ Emerging market founder can **live on $2K MRR** while US founder needs $10K+.

### 💰 Payment stack

| Layer | Tool | Note |
|------|------|------|
| **Customer charge** | **Stripe Atlas** | Need US LLC (Delaware) — $500 setup |
| | **Paddle** | Merchant of record, no US company needed |
| | **Lemon Squeezy** | Acquired by Stripe 2025 |
| **Founder pay-out** | **Wise** | Most popular |
| | **Payoneer** | Best for marketplaces |
| | **PayPal** | Higher fees |

---

## 10 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Pick 1 niche from list of 20
- Validate: landing page + 50 signups
- Use Carrd + Tally form

**Level 2 — 1 month**
- Build MVP (Next.js + Supabase + Replicate)
- Launch ProductHunt
- Target: **5 paying customers**

**Level 3 — 6 months**
- $1K MRR
- 100 paying customers
- Build-in-public ≥50 followers/week
:::

---

## 11 Continue reading

- 🎬 [Chapter 1 — Solo Studio](./1-solo-studio.md) — pipeline ad
- 👤 [Chapter 3 — Virtual Influencer](./3-virtual-influencer.md) — combine product
- 📱 [Chapter 5 — Sora 2 & TikTok](./5-sora-2-tiktok.md) — viral distribution
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)
- 🗓️ [Chapter 9 — 30-Day Roadmap](./roadmap-30-days.md) — execute now

::: tip 💰 Final word
> *"Pieter Levels isn't a genius. He shipped 70+ failed projects before PhotoAI worked.*
> *The hardest part isn't code (AI does that).*
> *It's **persisting when project 60 fails**."*
:::
