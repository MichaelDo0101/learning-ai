---
title: 'Toolkit 2026 — Stack creator AI đầy đủ (T5/2026)'
description: 'Bảng so sánh đầy đủ tools image / video / audio / 3D / multimodal. Giá tháng 5/2026. VN-friendly recommendations.'
---

# Chapter 7 — Toolkit 2026

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧰</p>

> **"Tool AI thay đổi mỗi quý. Đừng nhớ tool — nhớ ROLE của từng layer."**

::: tip 🎯 Cách dùng chapter này
1. **Đọc table tổng quan** → biết tool có gì
2. **Quay lại khi cần pick tool cụ thể** cho project
3. **Check "VN-friendly" column** → ưu tiên khi launch VN
4. **Re-check mỗi 3 tháng** — pricing/feature thay đổi nhanh
:::

---

## 00 Stack picker tương tác

<GenStackPicker />

---

## 01 Image Generation

### Bảng so sánh full

| Tool | Giá (T5/2026) | Strength | Weakness | Best for | VN-friendly |
|------|------|------|------|------|------|
| **Midjourney V7** | $10-120/tháng | Aesthetic, art style, character consistency (Omni Reference), voice input | Discord-heavy, weak text in image | Branding, illustration, mood board | ✅ |
| **Flux.2** (Pro/Max/Klein) | $0.05+/image API | 4MP photoreal, light physics, multi-ref control | New ecosystem, ít community LoRA | Commercial product photo, ad | ✅✅ |
| **Nano Banana Pro** (Gemini 3) | $0.134/image API | Top prompt adherence, 4K, in-image text accurate | Premium cost, safety filter chặt | Brand edits, complex composition | ✅ |
| **Recraft V3** | $0-96/tháng | #1 ELO 1172, SVG vector export, brand canvas | Smaller community | Logo, vector, icon, brand | ✅ |
| **Ideogram 3** | $0-48/tháng | Best in-image text (~75% accuracy) | Less photoreal than Flux | Ad with text, poster, packaging | ✅ |
| **GPT Image 1.5/2** (DALL-E) | $0.009-0.04/image | Native ChatGPT, prompt accuracy | Slow (60s-4min), over-stylize | Conversational edit, ChatGPT flow | ✅ |
| **Adobe Firefly 4** | CC subscription | **IP-indemnified** (commercial safe) | Aesthetic ceiling thấp | Enterprise / IP-sensitive | ✅ |
| **Imagen 4** | $0.02-0.04/image API | Photoreal, gần real-time, sharp text | Less artistic | High-volume production | ✅ |
| **Krea 1** | $0-30/tháng | Real-time canvas, sketch-to-image, Enhance | Heavy on credits | Iterative ideation | ✅ |
| **Stable Diffusion 3.5** | Free (local) | Open weights, full control | Cần GPU, learning curve | Pro pipeline, ComfyUI | ✅ (SDVN community) |

### 🎯 Quick picker

| Use case | Top pick | Backup |
|------|------|------|
| Brand logo / icon | Recraft V3 | Ideogram 3 |
| Product photo for e-com | Flux.2 Pro | Nano Banana Pro |
| Illustration / art | Midjourney V7 | Flux Pro |
| Ad with text overlay | Ideogram 3 | Recraft V3 |
| Character consistency | Midjourney V7 (`--cref`) | Flux + LoRA |
| Commercial safe (no lawsuit) | Adobe Firefly | — |
| Bulk gen low cost | Imagen 4 / Stable Diffusion | Flux Klein |

---

## 02 Video Generation

### Bảng so sánh full

| Tool | Giá (T5/2026) | Strength | Weakness | Best for | VN-friendly |
|------|------|------|------|------|------|
| **Sora 2** | ChatGPT Pro $20+/tháng | Physics first-class, sync audio 10-25s, Cameo, social-native | IP guardrail chặt, queue | Social-native, cameo content | ✅ |
| **Veo 3.1** | Gemini / Vertex AI | 4K, native 48kHz dialogue audio, vertical 9:16 | Wait time peak | Cinematic, audio-synced | ✅ |
| **Kling 2.5 Turbo** | $6.99-64.99/tháng | Outperform Seedance/Veo3-fast, ~30% cheaper | Chinese-origin compliance | Cost-efficient, anime style | ✅ |
| **Runway Gen-4** | $15-95/tháng | Single-image character consistency, "visual memory" | Less photoreal vs Veo | Filmmaker, character scene | ✅ |
| **Pika 2.2** | $10-95/tháng | Pikaframes, Scene Ingredients, lip-sync | Lower realism ceiling | Meme, playful effects | ✅ |
| **MiniMax Hailuo 2.3** | $14.99/tháng | Budget photoreal, style packs | Slow iteration | Stylized motion, budget | ✅ |
| **Luma Ray 3** | $9.99-99/tháng | First native 16-bit HDR, physics | Smaller community | Multi-model lab, HDR | ✅ |
| **Hunyuan Video 1.5** | Free open-source (Tencent) | 13B params, strong motion | Custom license (100M MAU cap) | Open-source pipeline | ✅ |
| **Wan 2.2** | Apache 2.0 (Alibaba) | MoE arch, **beat Sora on VBench** (86.22%) | Setup complexity | Self-host, ComfyUI | ✅ |
| **Higgsfield Cinema** | $9-99/tháng | Aggregator Sora+Veo+Kling+Wan + camera presets | Wrapper, không own model | Cinematic camera moves | ✅ |

### 🎯 Quick picker

| Use case | Top pick | Backup |
|------|------|------|
| Social-native short (TikTok) | Sora 2 | Kling 2.5 |
| Cinematic with dialogue | Veo 3.1 | Higgsfield Cinema |
| Character consistency | Runway Gen-4 | Sora 2 with cameo |
| Budget / anime style | Kling 2.5 | MiniMax Hailuo |
| Open-source pipeline | Wan 2.2 | Hunyuan |
| Camera control | Higgsfield | Runway |
| HDR / physics | Luma Ray 3 | Veo 3.1 |

---

## 03 Audio Generation

### Music

| Tool | Giá | Strength | Best for |
|------|------|------|------|
| **Suno v5.5** | $0-30/tháng | Voice clone, Personas, 8-min song, charted #1 Billboard | Full song with vocals |
| **Udio** | UMG/Udio platform 2026 | Licensed (UMG settle T10/2025), per-gen royalty | Licensed music workflow |
| **Riffusion** | Free + paid | Image-diffusion based, used by Aventhis | Backing track, sample |
| **Stable Audio 3.0** | Open weights + commercial | On-device, dev-friendly | Indie dev, sound design |

### Voice / TTS

| Tool | Giá | Strength | Best for |
|------|------|------|------|
| **ElevenLabs v3** | $5-1,320/tháng | Instant + Pro voice clone, emotional tag, 32+ ngôn ngữ | Voice-over, dubbing, character |
| **Cartesia (Sonic)** | API per-minute | **Lowest latency** TTS market, on-device | Real-time agent, low-latency |
| **Play.ht** | $19-99/tháng | Conversational AI voice | Podcast, audio book |
| **Murf AI** | $19-79/tháng | 120+ voice, video sync | Corporate, training video |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Full song production | Suno v5.5 |
| Voice clone (own voice) | ElevenLabs Pro |
| Real-time voice agent | Cartesia |
| Multi-language dubbing | ElevenLabs v3 |
| Bolero / V-Pop tiếng Việt | Suno (custom prompt) |

---

## 04 3D Generation

| Tool | Giá | Strength | Weakness | Best for |
|------|------|------|------|------|
| **Tripo v3.1** | $0.133/gen | 50% faster, PBR default, negative prompts | Geometry less precise vs Meshy | Game prop, indie |
| **Meshy-6** | ~$0.80+/gen | Best geometry detail, 3D-print ready | 6x cost vs Tripo | High-fidelity, 3D print |
| **Luma Genie** | Free + paid | Text/image → 4 previews ~10s | Smaller catalog | Simple character, prop |
| **CSM** | API + sub | Multi-view consistency, AR-ready | Less mainstream | AR/VR, multi-view |
| **Spline AI** | $0-22/tháng | Browser-native, web-embed | Lower fidelity | Web 3D, marketing page |

### 🎯 Quick picker

| Use case | Top pick |
|------|------|
| Game asset rapid iteration | Tripo v3.1 |
| 3D-print ready | Meshy-6 |
| Web 3D embed | Spline AI |
| AR/VR multi-view | CSM |

---

## 05 Multimodal / Workflow

| Tool | Giá | What it does | Best for |
|------|------|------|------|
| **ComfyUI** | Free open-source | Node-based graph cho SD/Flux/Wan/Hunyuan | Pro full-control, local |
| **Krea Nodes** | $0-60/tháng | Visual canvas integrate Flux/Sora/Veo/3D | Designer node workflow |
| **Magnific (Freepik)** | $5.75/tháng+ | 250M asset + Upscaler/Relight/Style Transfer | Stock-heavy workflow |
| **Higgsfield** | $9-99/tháng | Multi-model camera control wrapper | Cinematic cross-model |
| **ElevenLabs Flows** | Bundled | Node canvas AI filmmaking pipeline | Short film end-to-end |
| **Adobe Firefly App / Foundry** | CC sub | Hosts Firefly + Veo 3 + Runway Gen-4 in Adobe | Enterprise creative |
| **Pomelli** (Google Labs) | Free beta | Scan website → "Business DNA" → branded ads | Small business, solo founder |

---

## 06 Stack ideal cho 5 persona

### Persona 1: Indie creator solo (budget $50-100/tháng)

```
Image: Midjourney V7 ($30)
Video: Kling 2.5 ($14.99) or Sora 2 (ChatGPT Plus $20)
Audio: Suno Pro ($10) + ElevenLabs Starter ($5)
3D: Luma Genie (free tier)
Edit: CapCut Pro ($7.99)
─────────────
Total: ~$80-90/tháng
```

### Persona 2: Solo SaaS founder

```
Image API: Flux Pro via Replicate (~$0.05/gen × volume)
Backend: Stripe + Supabase
Frontend: Next.js + Vercel
Auth: Clerk
─────────────
Variable cost (margin 70-85% nếu pricing đúng)
```

### Persona 3: Faceless YouTuber

```
Image: Midjourney V7 ($30)
Video: Veo 3.1 (Gemini Advanced $19.99)
Voice: ElevenLabs Creator ($22)
Edit: CapCut Pro ($7.99)
SEO: TubeBuddy + VidIQ ($15-30)
─────────────
Total: ~$95-110/tháng
```

### Persona 4: Virtual influencer agency

```
Image: Flux Pro API + own LoRA
Render: ComfyUI local (GPU RTX 4090 ~$1,600 one-time)
3D / animation: Runway Gen-4 ($95)
Voice: ElevenLabs Pro ($99)
Posting: Buffer ($15)
─────────────
Total: ~$200/tháng + GPU
```

### Persona 5: Music producer AI

```
Music: Suno Premier ($30)
Voice: ElevenLabs Creator ($22)
Master: LANDR ($4/track) or BandLab Mastering (free)
Distribute: DistroKid ($23/năm)
Cover art: Midjourney ($30)
─────────────
Total: ~$85/tháng
```

---

## 07 🇻🇳 VN-friendly stack tips

### 💰 Payment VN cho subscription

| Tool | Cách trả từ VN |
|------|------|
| Midjourney | Stripe → cần card Visa/MC quốc tế (Techcombank Visa Debit OK) |
| ElevenLabs | Stripe — như trên |
| Suno | Stripe — như trên |
| Veo (Gemini) | Google Cloud — cần card quốc tế |
| Cursor | Stripe — như trên |
| Replicate | API key + card quốc tế |

**Card khuyên dùng VN**:
- **Techcombank Visa Debit** (free debit, OK Stripe)
- **VPBank Online Plus** (free, support online global)
- **TPBank EVO** (free debit, virtual card)
- **Wise card** (multi-currency, tốt nhất nếu hay travel)

### 🌐 Cộng đồng VN cho mỗi mảng

| Mảng | Cộng đồng |
|------|------|
| Image gen | **SDVN** (sdvn.vn) + "Midjourney VN" FB |
| Video gen | "AI Video Vietnam" FB |
| Music gen | "Suno AI Vietnam" FB |
| 3D | "Blender Việt Nam" + "AI 3D VN" |
| Workflow | "ComfyUI Vietnam" Discord |

---

## 08 Tool selection framework

::: tip 🎯 Decision tree

**Khi pick tool, hỏi 4 câu**:

1. **Cost model có khớp business model không?**
   - Pay-per-use (API) → ổn cho SaaS
   - Subscription → ổn cho creator
   - One-time → hiếm cho AI

2. **VN có dùng được không?**
   - Card quốc tế OK?
   - Sub có VN tier?
   - Quy định pháp lý VN OK?

3. **Output có commercial license không?**
   - Personal tier thường KHÔNG cho thương mại
   - Đọc kỹ ToS trước khi launch product

4. **Backup tool nếu primary fail?**
   - Tools rotate, đừng over-rely 1 tool
   - Test 2-3 alternatives mỗi 6 tháng
:::

---

## 09 🎥 Watch & Learn — 3 video

<ChapterVideos :videos="[
  { id: 'qIO9Mg1Man4', title: 'AI Vibe Coding Tutorial + Workflow (Cursor, PRD, MCP)', channel: 'ByteGrad', duration: '1:00:00', why: 'Full workflow Cursor + PRD + Rules + MCP — toolkit chuẩn nhất 2026 cho production-grade vibe coding.' },
  { id: 'HQaVFUV2AgY', title: 'Vibe Coding Crash Course: Cursor, Copilot, MCP + more', channel: 'AI Engineering', duration: '1:30:00', why: 'Build real app — Cursor + Copilot + MCP cùng project. Multi-tool orchestration.' },
  { id: 'pXALDuq-kq0', title: 'Cursor vs Claude Code vs Windsurf (tiếng Việt)', channel: '200Lab', duration: '20:00', why: 'Vietnamese — tool comparison cho developer VN.' }
]" />

---

## 10 🛠️ Toolkit Updates 2026 — Cập nhật Q1-Q2

### Top-tier IDE / Agent (2026)
- **Cursor** ($20/mo Pro, Anthropic Claude 4.5/4.6 default 2026)
- **Claude Code CLI** (terminal-first, MCP-rich)
- **Windsurf** (Cascade agent, full repo context)
- **Bolt v2** (cloud, enterprise, **$40M ARR 6 tháng**)
- **Lovable** (non-tech, Supabase native, **$20M ARR 2 tháng**)
- **v0.app** (Vercel rebrand T1/2026, full-stack)
- **T3 Code** (Theo open-source, free, T1/2026)

### Stack backend default 2026
- Next.js 15 (App Router stable)
- Supabase (auth + DB + storage + realtime)
- Stripe / Lemon Squeezy
- Resend / Postmark
- Vercel / Railway / Cloudflare
- Cloudflare R2 (storage)

### AI video gen Q2 2026
- Sora 2 (audio supremacy)
- Veo 3.1 (vertical native, character consistency)
- Kling 3.0 (best price/perf)
- Higgsfield (wrapper + Soul ID)

### Pricing 2026 per 4-sec gen
| Tool | Cost |
|------|------|
| Sora 2 | ~$0.40 |
| Veo 3.1 | ~$1.60 std / $0.15-0.40 per sec API |
| Kling v2.1 | ~$0.45 |

### MCP ecosystem
- Claude Code MCP plugins **100+** available
- Self-hosted sandbox public beta (Cloudflare, Daytona, Modal, Vercel)
- Lazy loading tools default (reduce startup overhead)

Sources: [NxCode comparison](https://www.nxcode.io/resources/news/v0-vs-bolt-vs-lovable-ai-app-builder-comparison-2025) | [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)

---

## 11 Đọc tiếp

- 🎬 [Chapter 1 — Solo Studio](./1-solo-studio.md)
- 💰 [Chapter 4 — Solo SaaS](./4-solo-saas-million.md)
- 📱 [Chapter 5 — Sora 2 & TikTok](./5-sora-2-tiktok.md)
- 🤖 [Chapter 6 — Faceless Empire](./6-faceless-empire.md)
- 📜 [Chapter 8 — Ethics 2026](./ethics-2026.md)
- 🗓️ [Chapter 9 — Roadmap 30 ngày](./roadmap-30-days.md)

::: tip 🧰 Update cadence
> *Tool và pricing này chính xác **T5/2026**.*
> *Re-check mỗi 3 tháng — pricing thay đổi nhanh.*
> *Bookmark page này, ping community VN khi tool mới ra.*
:::
