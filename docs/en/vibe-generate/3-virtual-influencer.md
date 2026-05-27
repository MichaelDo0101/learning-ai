---
title: 'Virtual Influencer — Aitana €10K/month + Vi An Viettel ambassador'
description: 'Case Aitana López (The Clueless), Lil Miquela (Brud), Vi An (ADT Creative + Viettel). AI persona consistency pipeline: LoRA + IPAdapter + ControlNet.'
---

# Chapter 3 — Virtual Influencer

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">👤</p>

> **"We created Aitana because we were tired of real models' drama.**
> **3 years later, she's the busiest model in Spain."**
> — *Rubén Cruz, The Clueless Agency, Barcelona*

::: tip 🎯 You'll learn
- 3 virtual influencer business models (sponsorship, ambassador, subscription)
- Consistency stack: LoRA + IPAdapter + ControlNet → 80-90% similarity
- Case studies: Aitana, Lil Miquela, Vi An (Vietnam)
- A-to-Z pipeline for creating an AI persona
- Legal + ethics: voice cloning + AI disclosure
:::

---

## 01 Aitana López — €10K/month in Barcelona

### Background

**The Clueless** is a creative agency in Barcelona. Founders: **Rubén Cruz** + **Diana Núñez**.

They were **tired of real model drama** (late, demanding more, doesn't fit brand) → created a hyper-real AI model.

Result: **Aitana López** — Spanish 25-year-old, pink hair, fitness body.

### Numbers

| Metric | Number |
|------|------|
| IG followers (peak) | **~4.3M** (currently stable ~378K) |
| Average revenue | **€3,000/month** |
| Peak | **€10,000/month** |
| Brand ambassador | **Big supplements** (Spain) |
| Brand collab | **Zara, Sephora** |
| Subscription | **Fanvue** (NSFW tier) |
| Sister model | **Maia** (also from The Clueless) |

### The Clueless stack

| Step | Tool |
|------|------|
| Base model | **Stable Diffusion 1.5** (later Flux) |
| Identity LoRA | Train custom LoRA for Aitana |
| Composition | IPAdapter |
| Pose | ControlNet OpenPose |
| Polish | Photoshop manual touch-up |
| Posting | Weekly content meeting, 4-5 posts/week |

### Industry-defining quote

> *"We are mainly taken aback by the skyrocketing costs of those [real] influencers."*
> — *Diana Núñez*

---

## 02 Lil Miquela — pioneer virtual influencer

### Profile (US reference)

| Item | Number |
|------|------|
| Agency | **Brud** (Los Angeles) |
| Launch | 2016 |
| IG followers | **~2.6M** |
| Rate / post | **~$10,000** |
| Annual revenue | **~$10M** |
| Brand list | Calvin Klein, Prada, Samsung |

**Lesson from Brud**: virtual influencers **don't need hyper-realism** to succeed. Lil Miquela is clearly 3D-animated — but "personality" + cohesive content built the moat.

---

## 03 Vi An — Vietnam's first AI ambassador

### Background

**ADT Creative** (HCMC, founded 2015) spent **3 years** developing Vi An. Goal: Vietnam's first hyper-real virtual brand ambassador.

**"Vi An"** = "Việt" + "An" (peace).

### Numbers

| Item | Number |
|------|------|
| Development time | **3 years** |
| Stack | CGI + 3D scan + motion capture + AI Human |
| Engine | Unreal Engine + Houdini + Maya |
| Main brand | **Viettel** — Y-Fest 2024 ambassador |
| Debut | MWC 2024 |
| IG followers (@vian.righthere) | **~38K** |
| Celeb collaborations | Anh Tú, Diệu Nhi, Tun Phạm |

### Lesson

> **"Vietnam doesn't need to wait for an Aitana from the US.**
> **One major brand (Viettel) is enough to fund a 3-year project + dedicated agency.**
> **Another 100 Vietnamese brands (Vinamilk, Vingroup, Highlands, Trung Nguyên...) don't yet have virtual ambassadors."**

---

## 04 7-step pipeline to create a hyper-real AI persona

::: tip 👤 Standard 2026 workflow
```
1. Persona ──→ 2. Visual ──→ 3. LoRA ──→ 4. Test ──→ 5. IPAdapter ──→ 6. Post ──→ 7. Monetize
   (concept)    (10 ref pics) (train)     (iterate)   (compose)       (cadence)    (revenue)
   1 day        3 days         2 days     2 days      ongoing         weekly       monthly
```
:::

### Step 1. Persona concept

Define:
- **Name + bio** (age, occupation, hobbies, hometown)
- **Personality** (fun, deep, quirky...)
- **Niche** (fashion, fitness, tech, lifestyle, gaming)
- **Origin story** (why this persona exists)
- **Aesthetic** (mood board 20+ images ref)

### Step 2. Visual identity — 10 reference images

Generate 10 images **same person, 10 different angles**:
- Frontal, 3/4, profile (3 basic angles)
- Close-up, medium, full-body (3 distances)
- Smiling, neutral, contemplative (3 expressions)
- Plus 1 signature pose

Tool: **Midjourney V7** (`--cref` chain) or **Flux** + IPAdapter.

### Step 3. Train LoRA

This is the **most important step**. LoRA = "small fine-tune" to teach the model your character.

| Platform | Cost | Speed |
|------|------|------|
| **Replicate** (Flux LoRA) | ~$2-5 / train | 20-40 min |
| **Fal.ai** | ~$3 / train | 15-30 min |
| **CivitAI** | Free (community quota) | 1-2 hrs |
| **Local** (RTX 4090) | Free + electricity | 2-4 hrs |

Dataset: **20-50 images** from step 2 (diverse angle/expression).

### Step 4. Test consistency

Generate 50-100 test images with new LoRA → measure:
- **% similarity to original**
- **% recognizable as same person**

Target: **>80% consistency**.

### Step 5. IPAdapter + ControlNet (production)

ComfyUI workflow:
- **LoRA Aitana** (identity)
- **IPAdapter** (style — outfit, location)
- **ControlNet OpenPose** (precise pose)
- **ControlNet Depth** (composition)

→ Each production image = 1-2 minutes render on consumer GPU.

### Step 6. Posting cadence

| Platform | Recommended frequency |
|------|------|
| **Instagram** | 4-5 posts/week + 7-10 stories/day |
| **TikTok** | 1-3 videos/day |
| **Twitter/X** | 3-5 posts/day |
| **Fanvue / OnlyFans** | 5-10 posts/week |

### Step 7. Monetize (detail in section 06)

---

## 05 Monetization — 3 streams

::: tip 💰 3 revenue models
**1. Sponsorship / brand deal**
- Aitana: €3K-10K/month from supplements + fashion
- Rate: $50-500 / 1K followers (depends on niche)

**2. Brand ambassador (long-term)**
- Vi An × Viettel = enterprise template
- Contract 6-12 months
- Rate: $5K-50K/contract depending on brand size

**3. Subscription content (Fanvue / OnlyFans)**
- Aitana has Fanvue tier
- Rate: $5-30/month/subscriber
- Highest if niche is fitness / fashion / NSFW
:::

---

## 06 Prompt pack — persona creation

::: tip 📝 5 templates

**1. Define persona (Claude / ChatGPT)**
```
Create virtual influencer persona for [target market]:
- Name: [name]
- Age: 22-28
- Occupation: [local-friendly job]
- Niche: [fashion/lifestyle/tech]
- Personality: 3 words
- Aesthetic mood: 5 words
- Origin story: 100 words
- 10 sample captions for IG
```

**2. Visual identity (Midjourney V7)**
```
beautiful [ethnicity] woman, [age], [hair: long black wavy], 
[skin tone], [features: defined cheekbone, almond eyes], 
[outfit: contemporary fashion], 
[lighting: golden hour urban], cinematic, 8K, --ar 4:5 --v 7 --cref [URL]
```

**3. LoRA training dataset prompts**
20 captions for 20 dataset images:
```
1. portrait of [persona], front facing, neutral expression
2. portrait of [persona], 3/4 angle, slight smile
... (20 variations)
```

**4. Production scene (Flux + LoRA)**
```
photo of [persona name], wearing [outfit], at [location], 
[activity], candid, natural light, shot on iPhone 16 Pro
```

**5. Caption (Claude)**
```
Write 5 IG captions for [photo description] of persona [name].
Style: [casual / aspirational / quirky]
Hashtags: #[niche] #[location]
Length: 2-3 lines + hashtag
```
:::

---

## 07 Common pitfalls

::: warning 🚨 6 mistakes

**1. Skip persona definition** → beautiful images but "soulless," no fanbase

**2. Dataset not diverse** → LoRA over-fits, fails on new poses

**3. Clone celebs / real people** → lawsuits (Disney 2025, Spotify voice clone ban)

**4. No AI disclosure** → backlash when discovered (Velvet Sundown case)

**5. Spam posting** → IG/TikTok algo demotes if low engagement

**6. Inconsistent personality** → each caption a different voice, audience confused
:::

---

## 08 🌏 Opportunity in emerging markets

### 🎯 5 niches with traction

| Niche | Audience | Brand fit |
|------|------|------|
| **Local fashion KOL** | 18-30 female | Local fashion, cafés, lifestyle |
| **Tech reviewer** | 20-35 male | Smartphone, gadget, fintech |
| **Food vlogger local cuisine** | 18-40 all regions | F&B, snacks, delivery apps |
| **Travel content** (Bali, Hoi An, Phuket) | 25-45 | Resort, airline, tour |
| **Mom influencer kids** | 25-40 female | Baby products, toys, edu |

### 💰 Economics

| Item | Cost |
|------|------|
| Midjourney V7 Standard | $30/month |
| Flux + Replicate LoRA | $20/month |
| ComfyUI (local) | $0 (needs GPU) |
| ElevenLabs (for video voice) | $5/month |
| Photoshop subscription | $10/month (Photography plan) |
| **Total** | **~$65/month** |

→ 1 brand deal $500 = 7 months of runway.

### 📜 Legal

- **Must disclose AI** when collab'ing with brands
- Ambassador contract via company (registered business)
- Tax: brand deal income → declare
- Avoid cloning real faces (any nationality)

---

## 09 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Define 1 persona (full bio + mood board)
- Generate 10 identity images with MJ `--cref`
- Post to test IG account

**Level 2 — 1 month**
- Train LoRA for persona
- Post 20 images over 4 weeks, consistency >80%
- Measure follower growth + engagement

**Level 3 — 6 months**
- Build audience 5K-10K real followers
- Land 1 small brand deal ($200-1K)
- Test Fanvue tier (if niche fits)
:::

---

## 10 Continue reading

- 🎬 [Chapter 1 — Solo Studio](./1-solo-studio.md)
- 🎵 [Chapter 2 — AI Music](./2-ai-music-3m.md) — combine music + persona
- 💼 [Chapter 4 — Solo SaaS](./4-solo-saas-million.md)
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)

::: tip 👤 Final word
> *"Aitana isn't real, but her story is. Brands need stories, not people.*
> *Vi An proves: 1 Vietnamese brand was willing to pay 3 years + billions for an AI ambassador.*
> *You don't need permission. You need persona + consistency + cadence."*
:::
