---
title: 'Solo Studio — 1 person = 1 film studio'
description: 'Case Neural Viz (Josh Kerrigan) + Genre.ai (PJ Ace). Solo filmmaker pipeline with MJ + Runway + ElevenLabs + Topaz. 1/20 the cost of traditional production.'
---

# Chapter 1 — Solo Studio: 1 person = 1 film studio

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎬</p>

> **"I quit my full-time job in Jan 2025. Not because I got funding. Because my AI clips paid rent."**
> — *Josh Kerrigan, Neural Viz*

::: tip 🎯 You'll learn
- Complete pipeline of a solo film studio (5 tools, 5 steps)
- Why a $2,000 ad can beat a $2M ad
- How to build a "cinematic universe" without a studio
- Prompt pack: shotlist → keyframe → video → audio → polish
- Application: mock-ads for any local brand, language-specific mini-series
:::

---

## 01 Josh Kerrigan — Solo filmmaker building "Monoverse"

Josh is a **LA-based filmmaker** who'd worked in film for years without breaking through. In January 2025, he **quit his full-time job** because the AI clips he posted on TikTok/YouTube/Instagram paid his rent.

His main project: **"Monoverse"** — a mockumentary universe (think *The Office*) where characters and settings are entirely AI-generated.

### 📊 Numbers

| Metric | Number |
|------|------|
| YouTube clip views | **Hundreds of thousands / clip** |
| Cross-platform reach | **Millions** (TikTok + IG + YT) |
| Hollywood pilot deal | **In negotiation** |
| Crew | **1 person** (Josh) |
| Core stack | **Midjourney + Runway + ElevenLabs** |

> *"The first great cinematic universe of the AI era."*
> — *Wired*

### 🛠️ Josh's stack

| Step | Tool | Role |
|------|------|------|
| 1. Concept + script | ChatGPT / Claude | Brainstorm character, dialogue, lore |
| 2. Character + scene design | **Midjourney V7** | Keyframes for character, set, costume |
| 3. Motion | **Runway Gen-4** | Turn keyframes into 5-10s clips |
| 4. Voice | **ElevenLabs v3** | Per-character voice, with emotion |
| 5. Polish | Topaz Video AI + CapCut | 4K upscale + final edit |

---

## 02 PJ Ace — Viral AI ad director

**PJ Accetturo** ("PJ Ace") came from TV/film. In 2024 he launched **Genre.ai** — AI-native creative agency.

### 💰 Kalshi NBA Finals 2025

| Item | Number |
|------|------|
| Ad cost | **$2,000** |
| Production time | **48 hours** |
| Impressions | **~20M** |
| ROI multiple | **>1000x** vs traditional TV |

**Same ad if traditional**: 20-person crew, $200K-500K, 6 weeks.

### 🏆 Genre.ai client list

- **Oracle** (B2B)
- **Popeyes** (food)
- **Qatar Airlines** (travel)
- **David Beckham IM8** (230M+ views) 🤯

### Killer quote

> *"I don't replace directors. I let directors not need a 20-person crew to test 50 ideas."*
> — *PJ Ace*

---

## 03 Solo studio pipeline — 5 steps

::: tip 🎬 Standard 2026 pipeline
```
1. Concept ──→ 2. Keyframe ──→ 3. Motion ──→ 4. Audio ──→ 5. Polish
   (LLM)        (Midjourney)    (Runway/Veo)   (Suno/EL)    (Topaz/CapCut)
   1-2 hrs      2-4 hrs         4-8 hrs         1-2 hrs      2-4 hrs
```
Total: **1-3 days** for a 30-60s short film / ad.
:::

### Step 1. Concept + script (LLM)

Use Claude or ChatGPT:
- Logline (1-line pitch)
- 3-act structure
- Character bios
- Shotlist (10-30 shots)

**Output target**: Markdown shotlist with location, char, action, camera, dialogue per shot.

### Step 2. Keyframe (Midjourney V7 / Flux / Nano Banana)

This step **defines the entire visual identity**.

**Rule of thumb**:
- 1 keyframe / shot
- Character ref (`--cref` or V7 Omni Reference) to lock identity
- Style ref (`--sref`) for consistent tone
- Resolution: 2K-4K

### Step 3. Motion (Runway Gen-4 / Veo 3.1 / Sora 2 / Kling 2.5)

Turn keyframes → 5-10s clips.

| Tool | When to use |
|------|------|
| **Runway Gen-4** | Character motion, dialogue scene |
| **Veo 3.1** | Cinematic shot, dialogue audio built-in |
| **Sora 2** | Cameo, social-native, with sync audio |
| **Kling 2.5** | Budget-friendly, anime/illustration |

::: warning ⚠️ Critical
**Don't text-prompt from scratch each shot.** Always use image-to-video from your keyframe to maintain consistency.
:::

### Step 4. Audio

| Type | Tool |
|------|------|
| Character voice | **ElevenLabs v3** (cloned or preset) |
| Music score | **Suno v5.5** |
| Sound effects | **Stable Audio 3** or royalty-free |
| Existing dialogue (recorded) | **ElevenLabs voice changer** to fix |

### Step 5. Polish

| Tool | Job |
|------|------|
| **Topaz Video AI** | 4K upscale, frame interp, restoration |
| **CapCut / DaVinci Resolve** | Final edit, transitions, color |
| **After Effects** | VFX layer if needed |

---

## 04 Prompt pack — copy & paste

::: tip 📝 5 practical templates

**1. Shotlist generator (Claude/ChatGPT)**
```
I want to make a 60s short film about [TOPIC] with [TONE] tone.
Generate a 12-shot shotlist with:
- Location
- Character + emotion
- Camera move (dolly, pan, static...)
- Dialogue (if any)
- Audio cue
Format: Markdown table.
```

**2. Keyframe consistency (Midjourney V7)**
```
[character description, max 5 attributes], cinematic, [lighting], 
[mood], [style ref], --cref [URL_of_ref] --sref [URL_of_style] 
--ar 16:9 --v 7 --stylize 200
```

**3. Image-to-video (Runway Gen-4)**
```
[Action description], [camera move], [duration: 5s/10s], 
slow burn, natural motion, sync with reference image
```

**4. Voice character (ElevenLabs v3)**
- Upload 30s voice sample
- Set emotion tags: `[whisper]`, `[excited]`, `[sad]`
- Output: MP3 timestamped to shotlist

**5. Music score (Suno v5.5)**
```
[genre: orchestral / lofi / synth-wave], [mood: tense / hopeful], 
[instruments], [bpm], duration [seconds], no vocal, loop-ready
```
:::

---

## 05 Market numbers — why now?

| Stat | Source |
|------|------|
| **86%** advertisers use/plan AI for video ads | IAB 2026 |
| **GenAI will be 40%** of all video ads by end of 2026 | IAB |
| **British Council** cut **70%** cost, **50%** time on 1,000+ assets | MindStudio case |
| 1 agency went **€180K → €792K/year** (+340%) after AI pivot | MindStudio |
| Meta **Advantage+ Shopping** cuts **20-30% CPL** vs manual | Meta case |

---

## 06 Common pitfalls — avoid these

::: warning 🚨 5 common mistakes

**1. Skip keyframe, text-prompt video directly** → 0% consistency, each shot looks different

**2. Use 1 tool for everything** → each tool has a sweet spot. Runway = character motion, Veo = cinematic, Sora = social

**3. Skip Topaz polish** → out-of-the-box AI video at 720p/1080p looks "AI-ish." 4K upscale + frame interp **hide artifacts**

**4. Clone real person's voice/face** → Spotify already bans, other platforms following. Disney + Universal sued Midjourney June 2025 over IP. Use your own AI persona

**5. No distribution plan** → make beautiful clip, no audience. Build channel BEFORE launching big clip (Josh built TikTok before Monoverse)
:::

---

## 07 🌏 Application — local market opportunities

### 🎯 5 niches with traction in emerging markets

| Niche | Why | Stack |
|------|------|------|
| **Mock-ads for SMEs** | 99% SMEs lack TVC budget | MJ + Runway + ElevenLabs (local language) |
| **Mini-series in local language** | Storytelling niche | Veo 3.1 + Suno v5.5 + CapCut |
| **Cultural / historical reels** | Government cultural push | Flux + Runway + ElevenLabs |
| **Real estate, automotive ads** | Premium budget, render quality matters | Nano Banana Pro + Veo + Topaz |
| **Karaoke MV AI in local language** | Karaoke is huge in Asia | Suno + Veo / Kling |

### 💰 Starting cost (May 2026)

| Item | Cost/month |
|------|------|
| Midjourney Standard | $30 |
| Runway Standard | $15 |
| ElevenLabs Starter | $5 |
| Suno Pro | $10 |
| Topaz (one-time) | $300 |
| **Total** | **~$60/month + $300 one-time** |

In Vietnam this equals **~1 day of designer salary**. Globally affordable.

### 🔌 Payment for international clients

- **Wise** — most popular for freelancers
- **Payoneer** — best for marketplaces (Fiverr, Upwork)
- **Stripe Atlas** — if you want US card processing (form US LLC)
- **PayPal** — still works, fees higher

### 📚 Communities to join

- **SDVN (Stable Diffusion Vietnam)** — sdvn.vn, ~1K active
- **r/StableDiffusion, r/midjourney** — global
- **Discord: Midjourney official, RunwayML**

---

## 08 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 day**
Make 1 × 10s clip in your language: 1 character + 1 line of dialogue + 1 background music.
Stack: MJ keyframe → Runway motion → ElevenLabs voice → Suno BGM.

**Level 2 — 1 week**
Make 1 × 30s mock-ad for a real brand (local big brand). 5 shots.
Post to TikTok + measure engagement.

**Level 3 — 1 month**
Build 1 mini-series, 3 episodes × 60s. Character consistency + universe lore.
Target: 10K views total + 100 followers.
:::

---

## 09 Continue reading

- 🎵 [**Chapter 2 — AI Music $3M**](./2-ai-music-3m.md) — Telisha Jones + Aventhis
- 👤 [**Chapter 3 — Virtual Influencer**](./3-virtual-influencer.md) — Aitana + Vi An
- 🧰 [**Chapter 7 — Toolkit 2026**](./toolkit-2026.md) — Full comparison
- 📜 [**Chapter 8 — Ethics 2026**](./ethics-2026.md) — Don't get sued
- 🗓️ [**Chapter 9 — 30-Day Roadmap**](./roadmap-30-days.md) — Ship in 30 days

::: tip 🎬 Final word
> *"You don't need Hollywood. You need taste + storytelling + 5 tools costing $60/month.*
> *The hardest part isn't the tools. It's **deciding what story is worth telling**."*
:::
