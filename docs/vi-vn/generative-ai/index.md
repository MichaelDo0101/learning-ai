---
title: 'Generative AI — Hiểu, tạo, làm chủ consistency và tự động hóa nội dung'
description: 'Lộ trình 10 chương từ nền tảng đến production: tạo ảnh/video/nhạc bằng prompt, giữ nhân vật & style nhất quán (LoRA/ControlNet/IPAdapter), pipeline tự động (Replicate/n8n), ứng dụng VN và pháp lý 2026.'
---

# Generative AI

<p style="font-size: 56px; line-height: 1; margin: 0 0 8px;">🎨</p>

> **Khi 1 người = 1 hãng phim, 1 studio nhạc, 1 xưởng thiết kế.**
> **Nhưng khác biệt giữa "ra ảnh đẹp ngẫu nhiên" và "ship được sản phẩm" là: prompt craft + consistency + tự động hóa.**

::: tip 🎯 Module này dạy bạn 5 việc
1. **HIỂU** — diffusion vs LLM, các modality, bản đồ công cụ 2026 — để chọn đúng tool.
2. **TẠO** — prompt craft cho ảnh/video/nhạc/giọng (không phải "tả vu vơ").
3. **LÀM CHỦ CONSISTENCY** — giữ *cùng một nhân vật/style* qua hàng chục ảnh & cả series. Đây là kỹ năng phân biệt amateur với pro.
4. **TỰ ĐỘNG HÓA** — pipeline gen hàng loạt (API + n8n) thay vì click tay từng cái.
5. **ỨNG DỤNG & AN TOÀN** — ngách VN, kiếm tiền, và **commercial-safe** (không dính bản quyền).

**Không cần background** nghệ thuật/IT. Cần: 1 laptop + vài tài khoản $10-30/tháng + tay biết "drive" model.
:::

---

## 🧭 Tư duy cốt lõi: bạn là "đạo diễn", không phải "hoạ sĩ"

Model gen không vẽ hộ bạn — nó **diễn giải mô tả** của bạn. Chất lượng output = chất lượng "chỉ đạo" (prompt + reference + tham số). Cùng một model, người biết drive ra kết quả gấp 10 lần người gõ "a beautiful girl".

::: warning 💡 3 cấp độ thợ
- **Cấp 1 — gõ vu vơ:** "ảnh đẹp" → ra generic, không dùng được thương mại.
- **Cấp 2 — prompt có cấu trúc:** subject + bối cảnh + ánh sáng + style + tham số → ảnh tốt, một lần.
- **Cấp 3 — consistency + pipeline:** *cùng* nhân vật/style qua 50 ảnh, tự động hóa hàng loạt → **đây mới là sản phẩm bán được.**

Module này đưa bạn từ cấp 1 lên cấp 3.
:::

---

## 🗺️ Bản đồ công cụ 2026 (đã cập nhật — nhiều thứ vừa đổi)

::: warning ⚠️ 3 thay đổi lớn người học hay bị lỗi thời
1. **Sora 2 (OpenAI) đã khai tử** — app đóng 4/2026, API đóng 9/2026. Đừng học theo Sora; dùng **Veo 3.1 / Kling 3.0 / Runway Gen-4**.
2. **Midjourney V7/V8 bỏ `--cref` và `::`** — giờ dùng **`--oref` (Omni Reference)** cho nhân vật và **`--sref`** cho style. Tutorial cũ dạy `--cref` là **sai**.
3. **ElevenLabs không tốt cho tiếng Việt** — dùng **Vbee / Viettel AI / FPT.AI / Zalo** cho TTS Việt.
:::

| Modality | Công cụ chính (giữa 2026) |
|---|---|
| **Ảnh** | Midjourney V8.1 (đẹp nghệ thuật), Flux.2 + Kontext (photoreal + edit), Nano Banana 2/Pro (Gemini, edit hội thoại), Ideogram 3 (chữ trong ảnh), Recraft V4 (vector/logo), Firefly (an toàn bản quyền) |
| **Video** | Veo 3.1 (điện ảnh + audio gốc), Kling 3.0 (giá/chất lượng tốt, 4K), Runway Gen-4 (editor mạnh), Higgsfield (router nhiều model) |
| **Nhạc** | Suno v5.5 (dễ nhất), Udio (fidelity cao), ElevenMusic v2, Stable Audio (open) |
| **Giọng** | ElevenLabs v3 (toàn cầu) · **VN: Vbee/Viettel/FPT/Zalo** |
| **Workflow** | ComfyUI (local/node), Replicate + fal.ai (API), n8n/Make (tự động hóa) |

---

## 🗺️ Lộ trình 10 chương — 5 phần

### 🟦 A · HIỂU nền tảng
| # | Chương | Nắm được |
|---|------|------|
| **1** | [Generative AI là gì](./1-generative-ai-la-gi.md) | Diffusion vs LLM, modalities, cách chọn tool, mental model "đạo diễn" |

### 🟩 B · TẠO (prompt craft)
| # | Chương | Nắm được |
|---|------|------|
| **2** | [Tạo ảnh](./2-tao-anh.md) | Prompt formula, MJ `--sref/--oref`, negative, weights; chọn Flux/Nano Banana/Ideogram |
| **3** | [Tạo video](./3-tao-video.md) | 5-part formula, camera vocab, audio tags, T2V vs I2V, keyframe; Veo/Kling/Runway |
| **4** | [Tạo nhạc & giọng nói](./4-tao-nhac-giong.md) | Suno meta-tags, stems, ElevenLabs + đạo đức, **TTS tiếng Việt** |

### 🟨 C · LÀM CHỦ CONSISTENCY (kỹ năng cốt lõi)
| # | Chương | Nắm được |
|---|------|------|
| **5** | [Consistency nhân vật & style](./5-consistency-nhan-vat.md) | LoRA + ControlNet + IPAdapter; `--sref/--oref`; reference sheet; ComfyUI |
| **6** | [Consistency series & Post-production](./6-consistency-post.md) | Reference sheet → chaining → batch-by-similarity; color/audio/lip-sync/captions/reframe |

### 🟧 D · TỰ ĐỘNG HÓA
| # | Chương | Nắm được |
|---|------|------|
| **7** | [Pipeline tự động & faceless factory](./7-pipeline-tu-dong.md) | Replicate/fal API, async/webhook, ComfyUI API, n8n + Sheets gen hàng loạt |

### 🟥 E · ỨNG DỤNG & PHÁP LÝ
| # | Chương | Nắm được |
|---|------|------|
| **8** | [Ứng dụng VN, ngách & monetization](./8-ung-dung-vn.md) | Solo studio, influencer ảo VN, nhạc Việt, faceless, SaaS; RPM/TikTok Shop/Etsy |
| **9** | [Pháp lý, đạo đức & commercial-safe](./9-phap-ly-dao-duc.md) | Disclosure platform, cloning law, litigation, EU AI Act, luật VN |
| **10** | [Roadmap 30 ngày & Capstone](./10-roadmap-capstone.md) | Kế hoạch 30 ngày ship 1 sản phẩm có user/doanh thu |

---

## 🇻🇳 Vì sao creator/dev VN có lợi thế

::: warning 💡 3 lợi thế
**1. Cost gap** — tool $50-200/tháng so với lương VN → bao tool dễ hơn dev Mỹ (cùng tool nhưng lương $5K/tháng).

**2. Ngách Việt chưa ai làm tốt:**
- Ảnh cưới/áo dài AI (bối cảnh + thẩm mỹ Việt), ảnh profile/thẻ doanh nghiệp
- Bolero/indie/rap tiếng Việt trên Spotify VN
- KOL ảo cho brand VN (Viettel đã làm Vi An; còn hàng trăm brand chưa có)
- Faceless tiếng Việt (kể chuyện, kiến thức) — RPM thấp hơn US nhưng cạnh tranh ít

**3. TTS tiếng Việt** — ElevenLabs yếu tiếng Việt → **Vbee/Viettel/FPT/Zalo** là lợi thế nội địa (xem [Chương 4](./4-tao-nhac-giong.md)).
:::

---

## ⚖️ Commercial-safe — đọc trước khi kiếm tiền

2025-2026 là **giai đoạn đặt luật chơi** (Disney kiện Midjourney; UMG/Warner settle với Udio/Suno nhưng Sony/UMG *vẫn đang kiện*). 3 nguyên tắc sống còn:
1. **Không clone IP** (nhân vật Disney/Marvel) cho khách thương mại.
2. **Không clone giọng/mặt người thật** không có đồng ý (luật deepfake siết mạnh).
3. **Disclose AI** khi khán giả mong đợi nội dung thật (YouTube/TikTok/Meta đều bắt buộc nhãn).

→ Chi tiết: [Chương 9 — Pháp lý & đạo đức](./9-phap-ly-dao-duc.md).

---

## 🎯 Đọc theo thứ tự nào?

- **🆕 Mới hoàn toàn** → Ch1 → Ch2 → Ch5 (consistency) → Ch8 → Ch10
- **🎬 Creator (đã biết edit)** → Ch2 → Ch3 → Ch6 (post) → Ch7 (automation)
- **💼 Founder build product** → Ch1 → Ch5 → Ch7 → Ch8 → Ch9
- **🎵 Musician** → Ch4 → Ch9 → Ch8
- **🏭 Muốn faceless/scale** → Ch3 → Ch6 → Ch7 → Ch8

---

## 🎓 Khóa học miễn phí chính hãng (Google · OpenAI · Anthropic)

> Học thẳng từ nguồn gốc. Tất cả **miễn phí** (link đã kiểm tra còn sống, ghi rõ nguồn):

**🔵 Google** — mạnh nhất mảng generative
- **Beginner: Introduction to Generative AI** (lộ trình nền tảng) — [skills.google/paths/118](https://www.skills.google/paths/118)
- **Introduction to Image Generation** (diffusion/Imagen) — [skills.google · course 541](https://www.skills.google/course_templates/541)
- **5-Day Gen AI Intensive** (Kaggle × Google) — [kaggle.com/learn-guide/5-day-genai](https://www.kaggle.com/learn-guide/5-day-genai)
- **Imagen docs** (tạo ảnh) — [ai.google.dev · imagen](https://ai.google.dev/gemini-api/docs/imagen) · **Veo docs** (tạo video) — [ai.google.dev · video](https://ai.google.dev/gemini-api/docs/video)
- **Prompt design strategies** (Gemini) — [ai.google.dev · prompting-strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)

**🟢 OpenAI**
- **OpenAI Academy** (ChatGPT + prompt engineering; cần đăng nhập free) — [academy.openai.com](https://academy.openai.com/)
- **Images/Vision guide** (gpt-image) — [developers.openai.com · images-vision](https://developers.openai.com/api/docs/guides/images-vision)
- **ChatGPT Prompt Engineering for Developers** (OpenAI × DeepLearning.AI; free-to-audit) — [deeplearning.ai · chatgpt-prompt-eng](https://www.deeplearning.ai/courses/chatgpt-prompt-eng)

**🟣 Anthropic** — nền tảng prompting (dùng chung)
- **Interactive Prompt Engineering Tutorial** (9 chương) — [github.com/anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
- **AI Fluency** (literacy về AI) — [anthropic.skilljar.com](https://anthropic.skilljar.com/)

> 💡 Mảng *agent* (Claude API, Computer Use, tool use…) học sâu hơn ở module [**Agentic AI**](../agentic-ai/) — cũng có mục khóa học miễn phí riêng.

---

::: tip 🚦 Trước khi bắt đầu
> *"Tool AI đổi mỗi quý. Pipeline đổi mỗi 6 tháng.*
> *Cái không đổi: **taste, story, consistency, distribution**.*
> *Học tool để có leverage. Đầu tư consistency + taste để có moat."*
:::

→ Sẵn sàng? Bắt đầu: [**Chương 1 — Generative AI là gì**](./1-generative-ai-la-gi.md)

---

## 🎥 Watch & Learn

<ChapterVideos :videos="[
  { id: 'iv-5mZ_9CPY', title: 'But how do AI images and videos actually work?', channel: '3Blue1Brown', why: 'Explainer hình ảnh tốt nhất về diffusion/CLIP. (2025, 1.9M view)' },
  { id: 'c7R94ykz0po', title: 'AI Videos in 2025 Are Getting Crazy! Google Veo 3 TUTORIAL!', channel: 'Grow With Kaz', why: 'Thấy ngay video AI 2025 đỉnh cỡ nào + cách làm. (2025, 830K view)' }
]" />
