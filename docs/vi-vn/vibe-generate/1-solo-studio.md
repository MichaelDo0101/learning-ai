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

## 09 Đọc tiếp

- 🎵 [**Chapter 2 — AI Music $3M**](./2-ai-music-3m.md) — Telisha Jones + Aventhis stories
- 👤 [**Chapter 3 — Virtual Influencer**](./3-virtual-influencer.md) — Aitana + Vi An
- 🧰 [**Chapter 7 — Toolkit 2026**](./toolkit-2026.md) — Full comparison
- 📜 [**Chapter 8 — Ethics 2026**](./ethics-2026.md) — Không bị kiện
- 🗓️ [**Chapter 9 — Roadmap 30 ngày**](./roadmap-30-days.md) — Ship product trong 30 ngày

::: tip 🎬 Lời cuối
> *"Bạn không cần Hollywood. Bạn cần taste + storytelling + 5 tool $60/tháng.*
> *Phần khó nhất không phải tool — là **decide câu chuyện đáng kể**."*
:::
