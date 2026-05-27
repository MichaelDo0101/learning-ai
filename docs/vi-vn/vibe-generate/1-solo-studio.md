---
title: 'Solo Studio — 1 người = 1 hãng phim'
description: 'Case Neural Viz (Josh Kerrigan) + Genre.ai (PJ Ace). Pipeline 1 người làm phim ngắn / quảng cáo viral với MJ + Runway + ElevenLabs + Topaz. Chi phí 1/20 traditional.'
---

# Chapter 1 — Solo Studio: 1 người = 1 hãng phim

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎬</p>

> **"Tôi bỏ việc full-time T1/2025. Không phải vì có đầu tư. Vì AI clip của tôi đủ trả tiền nhà."**
> — *Josh Kerrigan, Neural Viz*

::: tip 🎯 Bạn sẽ học
- Pipeline đầy đủ của 1 hãng phim solo (5 tool, 5 bước)
- Tại sao $2,000 ad có thể đánh bại $2M ad
- Cách dựng "cinematic universe" mà không cần studio
- Prompt pack: shotlist → keyframe → video → audio → polish
- Ngách VN: mock-ad cho brand Việt, mini-series tiếng Việt
:::

---

## 01 Josh Kerrigan — Solo filmmaker xây "Monoverse"

Josh là **filmmaker ở LA**, đã làm phim nhiều năm nhưng không nổi. Tháng 1/2025, anh **bỏ job full-time** vì các clip AI anh post lên TikTok/YouTube/Instagram đủ trả tiền nhà.

Project chính của anh: **"Monoverse"** — một mockumentary universe kiểu *The Office* nhưng nhân vật + bối cảnh đều do AI tạo.

### 📊 Numbers

| Metric | Số |
|------|------|
| Clip view trên YouTube | **Hàng trăm nghìn / clip** |
| Cross-platform reach | **Millions** (TikTok + IG + YT) |
| Hollywood pilot deal | **Đang đàm phán** |
| Crew | **1 người** (Josh) |
| Stack core | **Midjourney + Runway + ElevenLabs** |

> *"The first great cinematic universe of the AI era."*
> — *Wired*

### 🛠️ Stack của Josh

| Bước | Tool | Vai trò |
|------|------|------|
| 1. Concept + script | ChatGPT / Claude | Brainstorm character, dialogue, lore |
| 2. Character + scene design | **Midjourney V7** | Keyframe nhân vật, set, costume |
| 3. Motion | **Runway Gen-4** | Biến keyframe thành 5-10s clip |
| 4. Voice | **ElevenLabs v3** | Voice cho từng nhân vật, emotional |
| 5. Polish | Topaz Video AI + CapCut | Upscale 4K + edit cuối |

---

## 02 PJ Ace — Viral AI ad director

**PJ Accetturo** ("PJ Ace") đến từ TV/film background. 2024 anh launch **Genre.ai** — AI-native creative agency.

### 💰 Case Kalshi NBA Finals 2025

| Item | Số |
|------|------|
| Cost ad | **$2,000** |
| Production time | **48 hours** |
| Impressions | **~20M** |
| ROI multiple | **>1000x** so với TV ad cũ |

**Cùng ad đó nếu làm traditional**: ekip 20 người, $200K-500K, 6 tuần.

### 🏆 Client list của Genre.ai

- **Oracle** (B2B ad)
- **Popeyes** (food)
- **Qatar Airlines** (travel)
- **David Beckham IM8** (230M+ views) 🤯

### Quote đắt giá

> *"Tôi không thay thế đạo diễn. Tôi cho phép đạo diễn không cần ekip 20 người để test 50 ideas."*
> — *PJ Ace*

---

## 03 Pipeline solo studio — 5 bước

::: tip 🎬 Pipeline chuẩn 2026
```
1. Concept ──→ 2. Keyframe ──→ 3. Motion ──→ 4. Audio ──→ 5. Polish
   (LLM)        (Midjourney)    (Runway/Veo)   (Suno/EL)    (Topaz/CapCut)
   1-2 giờ      2-4 giờ         4-8 giờ         1-2 giờ      2-4 giờ
```
Tổng: **1-3 ngày** cho 30-60s short film / ad.
:::

### Bước 1. Concept + script (LLM)

Dùng Claude hoặc ChatGPT để brainstorm:
- Logline (1 câu pitch)
- 3-act structure
- Character bios
- Shotlist (10-30 shot)

**Output target**: file shotlist Markdown với mỗi shot: location, char, action, camera, dialogue.

### Bước 2. Keyframe (Midjourney V7 / Flux / Nano Banana)

Đây là bước **quyết định toàn bộ visual identity**.

**Rule of thumb**:
- 1 keyframe / shot
- Character ref (`--cref` hoặc Omni Reference V7) để giữ identity
- Style ref (`--sref`) để giữ tone
- Resolution: 2K-4K

### Bước 3. Motion (Runway Gen-4 / Veo 3.1 / Sora 2 / Kling 2.5)

Biến keyframe → 5-10s clip.

| Tool | Khi nào dùng |
|------|------|
| **Runway Gen-4** | Character motion, dialogue scene |
| **Veo 3.1** | Cinematic shot, có dialogue audio luôn |
| **Sora 2** | Cameo, social-native, có sync audio |
| **Kling 2.5** | Budget-friendly, anime/illustration style |

::: warning ⚠️ Quan trọng
**Không text-prompt từ scratch mỗi shot.** Luôn dùng image-to-video từ keyframe → giữ consistency.
:::

### Bước 4. Audio

| Loại | Tool |
|------|------|
| Voice nhân vật | **ElevenLabs v3** (clone hoặc preset) |
| Music score | **Suno v5.5** |
| Sound effect | **Stable Audio 3** hoặc royalty-free |
| Dialogue có sẵn (record) | **ElevenLabs voice changer** để fix |

### Bước 5. Polish

| Tool | Việc |
|------|------|
| **Topaz Video AI** | Upscale 4K, interpolate frame, restore |
| **CapCut / DaVinci Resolve** | Edit cuối, transition, color |
| **After Effects** | VFX layer nếu cần |

---

## 04 Prompt pack — copy & paste

::: tip 📝 5 prompt template thực hành

**1. Shotlist generator (Claude/ChatGPT)**
```
Tôi muốn làm 1 short film 60s về [TOPIC] với tone [TONE].
Hãy gen shotlist 12 shot, mỗi shot có:
- Location
- Character + emotion
- Camera move (dolly, pan, static...)
- Dialogue (nếu có)
- Audio cue
Format: bảng Markdown.
```

**2. Keyframe consistency (Midjourney V7)**
```
[character description, 5 attributes max], cinematic, [lighting], 
[mood], [style ref], --cref [URL_of_ref] --sref [URL_of_style] 
--ar 16:9 --v 7 --stylize 200
```

**3. Image-to-video (Runway Gen-4)**
```
[Action description], [camera move], [duration: 5s/10s], 
slow burn, natural motion, sync with reference image
```

**4. Voice character (ElevenLabs v3)**
- Upload 30s sample voice
- Set emotion tag: `[whisper]`, `[excited]`, `[sad]`
- Output: MP3 with timestamp matching shotlist

**5. Music score (Suno v5.5)**
```
[genre: orchestral / lofi / synth-wave], [mood: tense / hopeful], 
[instruments], [bpm], duration [seconds], no vocal, loop-ready
```
:::

---

## 05 Numbers thị trường — vì sao bây giờ?

| Stat | Nguồn |
|------|------|
| **86%** advertiser dùng/plan AI cho video ad | IAB 2026 |
| **GenAI sẽ chiếm 40% video ad toàn cầu** vào cuối 2026 | IAB |
| **British Council** cắt **70%** cost, **50%** thời gian trên 1,000+ asset | MindStudio case |
| 1 agency từ **€180K/năm → €792K/năm** (+340%) sau AI pivot | MindStudio |
| Meta **Advantage+ Shopping** giảm **20-30% CPL** vs manual | Meta case |

---

## 06 Common pitfalls — tránh ngay

::: warning 🚨 5 sai lầm phổ biến

**1. Skip keyframe, text-prompt video thẳng** → consistency 0%, look mỗi shot 1 kiểu

**2. Dùng 1 tool cho tất cả** → mỗi tool có sweet spot. Runway giỏi character motion, Veo giỏi cinematic, Sora giỏi social

**3. Skip Topaz polish** → AI video 720p hoặc 1080p out-of-the-box trông "AI-ish". Upscale 4K + frame interp giúp **hide artifacts**

**4. Clone giọng/khuôn mặt người thật** → Spotify cấm rồi, các platform sẽ theo. Disney + Universal kiện Midjourney T6/2025 vì IP. Dùng AI persona riêng

**5. Không có distribution plan** → Làm xong clip đẹp nhưng không có audience. Phải build channel TRƯỚC khi launch clip lớn (Josh Kerrigan build TikTok trước Monoverse)
:::

---

## 07 🇻🇳 Áp dụng cho creator Việt Nam

### 🎯 5 ngách VN có cơ hội

| Ngách | Lý do | Tool stack đề xuất |
|------|------|------|
| **Mock-ad cho SME VN** | 99% SME không có ngân sách TVC | MJ + Runway + ElevenLabs (giọng Việt) |
| **Mini-series tiếng Việt** trên TikTok | Niche storytelling chưa đông creator | Veo 3.1 + Suno v5.5 + CapCut |
| **Reels lịch sử / văn hoá Việt** | Bộ Văn hoá push, trend "lịch sử Việt" hot | Flux + Runway + ElevenLabs |
| **Quảng cáo bất động sản, ô tô** | Cần render đẹp, budget cao | Nano Banana Pro + Veo + Topaz |
| **Karaoke MV AI tiếng Việt** | Suno hát Việt được; karaoke industry $$ | Suno + Veo / Kling |

### 💰 Chi phí khởi đầu (T5/2026)

| Item | Cost/tháng |
|------|------|
| Midjourney Standard | $30 |
| Runway Standard | $15 |
| ElevenLabs Starter | $5 |
| Suno Pro | $10 |
| Topaz (one-time) | $300 (mua đứt) |
| **Total** | **~$60/tháng + $300 one-time** |

Mức này = lương 1 nhân viên design 1 ngày VN. Affordable cực.

### 🔌 Payment cho khách quốc tế

- **Wise** — phổ biến nhất với freelancer VN
- **Payoneer** — tốt cho marketplace (Fiverr, Upwork)
- **Stripe Atlas** — nếu muốn nhận card Mỹ (tạo công ty US)
- **PayPal** — vẫn được dù phí cao

### 📚 Cộng đồng VN nên join

- **SDVN (Stable Diffusion Việt Nam)** — sdvn.vn, Facebook group ~1K user, tools custom
- **AI Việt Nam** — non-profit dạy ML/DL VN
- **Group Facebook "Midjourney Việt Nam"**, **"AI Art Vietnam"** — share prompt + work

---

## 08 Bài tập thực hành

::: tip ✍️ Bài tập 3 cấp độ

**Level 1 — 1 ngày**
Làm 1 clip 10s tiếng Việt: 1 character + 1 line dialogue + 1 background music.
Stack: MJ keyframe → Runway motion → ElevenLabs giọng Việt → Suno BGM.

**Level 2 — 1 tuần**
Làm 1 mock-ad 30s cho 1 brand VN có thật (Highlands, Trung Nguyên, Vinamilk). 5 shot.
Post lên TikTok + đo engagement.

**Level 3 — 1 tháng**
Build 1 mini-series 3 tập × 60s. Có character consistency, có universe lore.
Mục tiêu: 10K view tổng cộng + 100 follower.
:::

---

## 09 🎥 Watch & Learn — 5 video tutorial

<ChapterVideos :videos="[
  { id: 'wHIdCNIQHpo', title: 'How to Create a Professional AI Film (Step-by-Step)', channel: 'Curious Refuge', duration: '25:00', why: 'School AI filmmaking duy nhất bên trong Hollywood studio. Workflow A-Z: script → MJ → Kling → Topaz.' },
  { id: 'p_e2IAsB84A', title: 'AI Cinematography is Here… And Surprisingly Easy', channel: 'Curious Refuge', duration: '18:00', why: 'Shot composition + camera movement với Kling 2.5 + Veo 3. Nâng cấp cinematic sense.' },
  { id: 'ue8CnA6xvdw', title: 'Create Cinematic AI Video using Kling', channel: 'Curious Refuge', duration: '12:00', why: 'Hands-on Kling — model image-to-video tốt nhất cho motion fluidity 2025.' },
  { id: '7T3em61dSYk', title: 'My AI Videos Hit 122M Views: Kalshi Behind-the-Scenes', channel: 'PJ Ace', duration: '14:00', why: 'PJ Ace kể từ A-Z cách làm Kalshi NBA Finals ad $2K → 50M+ view. \'Vibe direction\' > tool mastery.' },
  { id: 'KRGHOmD0lUk', title: 'Create Cinematic AI Video in Sora 2 (Full Review)', channel: 'Curious Refuge', duration: '20:00', why: 'Sora 2 review không hype — Sora 2 KHÔNG thể tự làm cả phim từ script. Realistic expectation.' }
]" />

---

## 10 🔬 Deep Dive Techniques 2026

::: tip 🚀 6 advanced techniques nâng cấp pipeline

**1. Multi-shot character consistency với Omni-Reference (Midjourney V8)**
- Upload 1 ảnh character → dùng `--oref [URL] --ow 100` giữ identity qua 20+ shot
- Combine với `--sref` để pin cả tone
- Khi nào: short film đa shot cùng nhân vật

**2. "Ingredients to Video" trên Veo 3.1**
- Upload tối đa 3 reference images (nhân vật, prop, scene) → Veo ghép logic
- Khi nào: cùng nhân vật xuất hiện nhiều scene khác nhau
- Tool: Gemini API / Flow app

**3. Scene extension Veo 3.1 cho long-form**
- Veo phân tích second cuối → sinh tiếp đoạn mới giữ continuity
- Khi nào: long take, oner shot, tracking shot >8s
- Tool: Flow / Vertex AI, "Extend scene" mode

**4. Runway Aleph — post-gen modification không re-render**
- Edit video đã gen bằng prompt: "add rain", "change to golden hour"
- Khi nào: gần xong project, cần tweak light/atmosphere
- Tool: Runway Standard+, Aleph node

**5. Higgsfield "Elements" cho project-level consistency**
- Tạo Element (character, location, prop) 1 lần → reference `@tag` qua mọi shot
- Mr. Higgs (AI co-director) break script thành shot list
- Khi nào: project >30 shot, team collaboration
- Tool: Higgsfield Cinema Studio 3.5 Pro

**6. Topaz Astra + Starlight cho 4K/8K upscale**
- Astra dedicated AI video upscale; Starlight = first diffusion model temporal-consistent
- Output 4K/8K/24K, render local (file privacy)
- Khi nào: sau cut cuối, broadcast / rạp
- Tool: Topaz Video AI Pro
:::

---

## 11 📚 More Case Studies (2025-2026)

### Case A: Coca-Cola "Holiday 2025" — 70,000 clips trong 1 tháng

| Item | Số |
|------|------|
| Project | Holiday campaign 2025, hoàn toàn AI |
| Volume | **70,000+ clip** generated |
| Cost saving | 60-70% so với traditional ($1M-3M) |
| Time-to-market | "Tháng → tuần" |
| ⚠️ Caveat | Backlash lớn — viewer gọi "soulless", "digital slop" |

> **Bài học**: cost saving ≠ quality. Cần human direction layer cho brand iconic.
> Source: [BrandVM](https://www.brandvm.com/post/coca-cola-pushing-ai-2025)

### Case B: Tribeca 2026 chấp nhận "Dreams of Violets" — full AI feature film đầu tiên ở major festival

| Item | Detail |
|------|------|
| Festival | **Tribeca 2026** — world premiere |
| Phim | "Dreams of Violets" — full AI feature |
| Chủ đề | Phong trào kháng cự dân thường Iran |
| Bài học | AI film vượt ngưỡng "novelty", vào mainstream festival |

Source: [Variety](https://variety.com/2026/film/festivals/tribeca-festival-ai-film-dreams-of-violets-foundation-0-1236759724/)

### Case C: Muhannad Nassar + Simon Meyer — Grand Prize AI Film Competition **$150K**

| Item | Số |
|------|------|
| Filmmaker | Muhannad Nassar (Detroit) + Simon Meyer (Đức) |
| Cách làm | **Chưa từng gặp mặt** — async qua time zone |
| Stack | Higgsfield Cinema Studio |
| Result | **First place $150,000** |
| Competition size | ~8,800 submission từ 139 quốc gia |

> **Bài học**: Async AI collaboration cho phép 2 người làm phim như team 50 người.
> Source: [PR Newswire](https://www.prnewswire.com/news-releases/the-largest-ai-film-competition-highlights-emerging-trends-in-global-ai-filmmaking-302717810.html)

---

## 12 🛠️ Tool Updates (T2-T5/2026)

| Tool | Update | Date | Key impact |
|------|------|------|------|
| **Midjourney V8** | Alpha — 5x faster, 2K native, improved text | 17/3/2026 | Backward-compatible V7 styles |
| **Midjourney V8.1** | HD 2K không cần upscale, Raw mode | 30/4/2026 | Yêu cầu unlock Personalization Profile |
| **Sora 2** | Free tier removed, $4 = 10 generations pack | 10/1/2026 | Chỉ Plus ($20) và Pro ($200) còn access |
| **Veo 3.1** | "Ingredients to Video" + Scene Extension | T10/2025 | Lip-sync <120ms; $0.15-0.40/sec Gemini API |
| **Kling 2.6** | Native audio + 30% cost reduction | 3/12/2025 | 1080p @ 48 FPS, 10s max; Pro ~$37/mo |
| **Nano Banana Pro** | Gemini 3 Pro Image, best text-in-image | T11/2025 | Available ComfyUI Partner Nodes |
| **World Labs Marble** | First commercial 3D world generation | 12/11/2025 | Export Unreal/Unity, $20-95/mo |
| **Runway Aleph** | In-video editing via text prompt | T7/2025 | Maintains temporal consistency |
| **Higgsfield Cinema Studio 3.5** | "Mr. Higgs" AI co-director + Elements + real-time collab | T1-3/2026 | Project-level consistency |

---

## 13 Đọc tiếp

- 🎵 [**Chapter 2 — AI Music $3M**](./2-ai-music-3m.md) — Telisha Jones + Aventhis stories
- 👤 [**Chapter 3 — Virtual Influencer**](./3-virtual-influencer.md) — Aitana + Vi An
- 🧰 [**Chapter 7 — Toolkit 2026**](./toolkit-2026.md) — Full comparison
- 📜 [**Chapter 8 — Ethics 2026**](./ethics-2026.md) — Không bị kiện
- 🗓️ [**Chapter 9 — Roadmap 30 ngày**](./roadmap-30-days.md) — Ship product trong 30 ngày

::: tip 🎬 Lời cuối
> *"Bạn không cần Hollywood. Bạn cần taste + storytelling + 5 tool $60/tháng.*
> *Phần khó nhất không phải tool — là **decide câu chuyện đáng kể**."*
:::
