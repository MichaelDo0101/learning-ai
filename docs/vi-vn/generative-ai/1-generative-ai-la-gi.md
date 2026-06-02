---
title: 'Chương 1 — Generative AI là gì'
description: 'Phân biệt diffusion vs LLM, các modality (text-to-image/video/audio, image-to-video), bản đồ công cụ 2026, mental model "đạo diễn", và cách chọn đúng tool cho từng việc.'
---

# Chương 1 — Generative AI là gì?

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧭</p>

::: tip 🔥 Thực chiến — 30 giây
Cùng Midjourney: người gõ *"a beautiful girl"* ra ảnh nhựa; người biết **"drive"** ra ảnh bán được. Khác biệt = hiểu ~20% cơ chế bên dưới.
**💸 Ăn tiền ở đâu:** hiểu seed/diffusion = tái lập được nhân vật → làm ra *sản phẩm*, không phải ăn may từng ảnh.
:::

> **Hiểu *cơ chế* bên dưới (dù chỉ 20%) là khác biệt giữa người "gõ cầu may" và người "drive được model".**

::: tip 🎯 Sau chương này bạn sẽ
- Phân biệt **diffusion** (ảnh/video/nhạc) vs **LLM** (text) — và vì sao điều đó đổi cách bạn prompt.
- Gọi tên đúng các **modality** (text-to-image, image-to-video...).
- Đọc được **bản đồ công cụ 2026** và biết cái nào cho việc gì.
- Có **mental model "đạo diễn"** để mọi chương sau dễ vào.
:::

---

## 01 · Generative AI là gì?

**Generative AI (GenAI)** = AI **tạo ra nội dung mới** (ảnh, video, âm thanh, text, code) bằng cách học mẫu từ dữ liệu huấn luyện — thay vì chỉ phân loại/dự đoán.

Khác biệt cốt lõi với AI "truyền thống":
| AI phân tích | Generative AI |
|---|---|
| "Ảnh này là mèo hay chó?" | "Vẽ cho tôi một con mèo phi hành gia" |
| Phân loại, dự đoán | **Sinh ra** thứ chưa từng tồn tại |

---

## 02 · Hai bộ não khác nhau: Diffusion vs LLM

Đây là điều đa số người học bỏ qua — và là lý do prompt ảnh khác hẳn prompt ChatGPT.

::: tip 🔑 Hai cơ chế
**LLM (text)** — sinh **tuần tự**, từng token một, đoán từ tiếp theo (autoregressive). Bạn "trò chuyện" với nó.

**Diffusion (ảnh/video/nhạc)** — bắt đầu từ **nhiễu ngẫu nhiên (noise)** rồi **khử nhiễu dần** qua nhiều bước cho đến khi thành hình. Bạn "chỉ đạo" một quá trình ngẫu nhiên hội tụ.
:::

```
DIFFUSION (ảnh):
  Noise ngẫu nhiên  →  khử nhiễu (step 1)  →  ...  →  (step 30)  →  Ảnh rõ
       ▲ seed quyết định điểm xuất phát      ▲ prompt lái hướng ở mỗi bước
```

**Vì sao điều này quan trọng (3 hệ quả thực tế):**
1. **Seed** = điểm xuất phát ngẫu nhiên → cùng prompt + cùng seed = cùng ảnh (tái lập được). Đây là chìa khoá consistency ([Chương 5](./5-consistency-nhan-vat.md)).
2. **Steps** = số bước khử nhiễu → nhiều hơn = mịn hơn (đến một ngưỡng), nhưng đắt/chậm hơn.
3. Diffusion **không "hiểu" câu như người** — nó khớp prompt với các vùng đặc trưng đã học. Vì vậy *từ khoá + cấu trúc* quan trọng hơn *ngữ pháp đẹp* ([Chương 2](./2-tao-anh.md)).

> **Multimodal:** một số model 2026 (Nano Banana/Gemini) kết hợp "hiểu" kiểu LLM + "tạo" kiểu diffusion → cho phép *edit bằng hội thoại* ("đổi áo sang đỏ"). Xu hướng đang hợp nhất hai bộ não.

---

## 03 · Các modality & "hướng" sinh

Gọi tên đúng giúp bạn tìm tool và đọc tài liệu:

| Hướng (direction) | Nghĩa | Ví dụ tool |
|---|---|---|
| **text-to-image** | Mô tả → ảnh | Midjourney, Flux |
| **text-to-video** | Mô tả → video (T2V) | Veo, Kling |
| **image-to-video** | Ảnh tĩnh → chuyển động (I2V) | Kling, Runway |
| **text-to-audio / music** | Mô tả → nhạc | Suno, Udio |
| **text-to-speech (TTS)** | Chữ → giọng nói | ElevenLabs, Vbee |
| **image-to-image** | Ảnh → ảnh (đổi style/edit) | Flux Kontext, Nano Banana |
| **text-to-3D** | Mô tả → mô hình 3D | Tripo, Meshy |

::: tip 🔑 Quy tắc vàng sẽ gặp lại khắp module
**Ảnh tĩnh dễ kiểm soát hơn video.** Nên pipeline pro thường là: **tạo ảnh "hero" đẹp & đúng ý trước (text-to-image), rồi mới cho nó chuyển động (image-to-video).** Đừng cố "text-to-video" mọi thứ từ đầu — khó kiểm soát hơn nhiều ([Chương 3](./3-tao-video.md)).
:::

---

## 04 · Bản đồ công cụ 2026 (cập nhật — nhiều thứ vừa đổi)

::: warning ⚠️ 3 cập nhật khiến tutorial cũ sai
1. **Sora 2 (OpenAI) đã khai tử** (thông báo 3/2026; app đóng 4/2026; API đóng 9/2026). → Dùng **Veo 3.1 / Kling 3.0 / Runway Gen-4**.
2. **Midjourney V7/V8 bỏ `--cref` và `::`** → dùng **`--oref`** (nhân vật) + **`--sref`** (style).
3. **ElevenLabs yếu tiếng Việt** → dùng **Vbee/Viettel/FPT/Zalo**.
:::

| Modality | Công cụ chính | Mạnh ở |
|---|---|---|
| **Ảnh** | **Midjourney V8.1** | Đẹp nghệ thuật, thẩm mỹ số 1 |
| | **Flux.2 / Flux Kontext** | Photoreal + **edit trong ngữ cảnh**; có bản open-weight |
| | **Nano Banana 2/Pro** (Gemini) | Edit bằng hội thoại, giữ nhân vật tốt |
| | **Ideogram 3** | **Chữ trong ảnh** (poster, logo) |
| | **Recraft V4** | **Vector/SVG** thật, in 300 DPI |
| | **Adobe Firefly** | **An toàn bản quyền** (có bồi thường IP) |
| **Video** | **Veo 3.1** | Điện ảnh + **audio gốc**, extend cảnh |
| | **Kling 3.0** | Giá/chất lượng tốt, 4K, lip-sync |
| | **Runway Gen-4** | **Editor mạnh** (Act-One, Motion Brush) |
| **Nhạc** | **Suno v5.5** | Dễ nhất, stems, personas |
| **Giọng** | **ElevenLabs v3** (toàn cầu) · **Vbee/Viettel** (Việt) | |
| **Workflow** | **ComfyUI** (local), **Replicate/fal** (API), **n8n** (tự động) | |

> Đây chỉ là điểm khởi đầu. Mỗi chương sau đào sâu *cách dùng* từng cái + chọn cái nào khi nào.

---

## 05 · Mental model: bạn là "đạo diễn", không phải "hoạ sĩ"

Model không vẽ hộ — nó **diễn giải chỉ đạo** của bạn. "Chỉ đạo" gồm 3 thứ:

```
Output chất lượng = Prompt (mô tả) + Reference (ảnh/style tham chiếu) + Params (seed, ratio, steps...)
```

- **Prompt** — mô tả có cấu trúc (subject + bối cảnh + ánh sáng + style). [Chương 2-4](./2-tao-anh.md).
- **Reference** — đưa ảnh mẫu để khớp nhân vật/style (`--sref`, `--oref`, IPAdapter). [Chương 5](./5-consistency-nhan-vat.md).
- **Params** — seed (tái lập), aspect ratio, steps, CFG/stylize.

::: warning 💡 3 cấp độ thợ (mục tiêu của module)
- **Cấp 1:** gõ "a beautiful girl" → generic, vô dụng thương mại.
- **Cấp 2:** prompt có cấu trúc → ảnh đẹp, *một lần*.
- **Cấp 3:** consistency (cùng nhân vật/style qua 50 ảnh) + pipeline tự động → **sản phẩm bán được**.
:::

---

## 06 · Cách chọn tool — khung quyết định

```
Bạn cần tạo gì?
├─ Ảnh nghệ thuật/concept đẹp        → Midjourney
├─ Ảnh photoreal / edit ảnh có sẵn   → Flux Kontext / Nano Banana
├─ Poster/logo có CHỮ                → Ideogram (chữ) / Recraft (vector)
├─ Cần AN TOÀN bản quyền (khách lớn) → Adobe Firefly
├─ Video điện ảnh + thoại            → Veo 3.1
├─ Video số lượng nhiều, rẻ          → Kling 3.0
├─ Nhạc nền / bài hát                → Suno
├─ Giọng đọc tiếng Việt              → Vbee / Viettel  (KHÔNG ElevenLabs)
└─ Gen hàng loạt tự động             → ComfyUI API / Replicate + n8n (Chương 7)
```

::: tip 🔑 Đừng "tool-hopping"
Sai lầm số 1 của người mới: nhảy tool liên tục. **Chọn 1 tool cho 1 modality, dùng đến thành thạo**, rồi mới mở rộng. Thành thạo 1 tool > biết sơ 10 tool.
:::

---

## 07 · Commercial-safe — nguyên tắc nền (chi tiết ở Ch9)

Ngay từ đầu hãy khắc 3 quy tắc (kẻo làm xong không bán được / bị kiện):
1. **Không clone IP** (nhân vật Disney/Marvel...) cho khách thương mại — Disney đang kiện Midjourney.
2. **Không clone giọng/mặt người thật** không có đồng ý — luật deepfake (TAKE IT DOWN Act) siết mạnh.
3. **Disclose AI** khi khán giả mong đợi nội dung thật — YouTube/TikTok/Meta đều bắt buộc nhãn.

→ Đầy đủ + cách làm an toàn: [Chương 9](./9-phap-ly-dao-duc.md).

---

## 08 · 🧪 Bài tập: chọn tool cho use case

Với mỗi nhu cầu, chọn tool + giải thích:
1. Shop áo dài cần 50 ảnh sản phẩm trên người mẫu, *cùng một gương mặt người mẫu*.
2. Làm poster sự kiện có dòng chữ tiếng Việt to, rõ.
3. Video quảng cáo 8 giây có lời thoại nhân vật.
4. Đọc sách nói (audiobook) tiếng Việt.
5. Logo vector cho startup (cần file in được).

::: details 👉 Lời giải gợi ý
1. Tạo nhân vật bằng MJ/Flux rồi **giữ consistency bằng LoRA hoặc `--oref`** ([Ch5](./5-consistency-nhan-vat.md)); cùng gương mặt = bài toán consistency, không phải "gen lại nhiều lần".
2. **Ideogram** (mạnh chữ trong ảnh) — MJ hay sai chính tả chữ.
3. **Veo 3.1** (audio gốc + thoại) — KHÔNG Sora (đã khai tử).
4. **Vbee/Viettel** (TTS Việt) — KHÔNG ElevenLabs.
5. **Recraft** (xuất vector/SVG thật) — không phải PNG raster.
:::

---

## 09 · Kiểm tra nhanh

1. Diffusion khác LLM ở cơ chế nào?
2. Vì sao seed quan trọng?
3. Vì sao pipeline pro hay "tạo ảnh trước, cho chuyển động sau"?
4. Tool nào KHÔNG nên dùng cho TTS tiếng Việt?
5. Sora 2 còn dùng được không?

::: details 👉 Gợi ý đáp án
1. LLM sinh tuần tự từng token; diffusion khử nhiễu dần từ noise.
2. Seed = điểm xuất phát ngẫu nhiên → cùng prompt+seed = tái lập cùng ảnh (nền tảng consistency).
3. Ảnh tĩnh dễ kiểm soát hơn video → khoá đúng ý ở ảnh rồi mới animate.
4. ElevenLabs (yếu tiếng Việt) — dùng Vbee/Viettel/FPT/Zalo.
5. Không — đã khai tử (app 4/2026, API 9/2026); dùng Veo/Kling/Runway.
:::

---

## 10 · 📒 Thuật ngữ

| Thuật ngữ | Nghĩa nhanh |
|---|---|
| **Diffusion** | Cơ chế tạo ảnh/video/nhạc bằng khử nhiễu dần từ noise |
| **Seed** | Điểm xuất phát ngẫu nhiên; cố định để tái lập |
| **T2V / I2V** | text-to-video / image-to-video |
| **`--sref` / `--oref`** | Style Reference / Omni Reference của Midjourney |
| **LoRA / ControlNet / IPAdapter** | Bộ ba kiểm soát identity/cấu trúc/style (Ch5) |
| **Commercial-safe** | Nội dung dùng thương mại không dính bản quyền |

---

## 11 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- GenAI = **tạo nội dung mới**; ảnh/video/nhạc chạy bằng **diffusion**, text bằng **LLM**.
- **Seed/steps/prompt** đều có vai trò vì cơ chế khử nhiễu.
- Pipeline pro: **ảnh trước → animate sau**; **1 tool/modality đến thành thạo**.
- Tool 2026 đã đổi: **không Sora, dùng `--oref`, TTS Việt riêng**.
:::

Hiểu nền rồi — giờ vào kỹ năng đầu tiên & quan trọng nhất: prompt craft cho ảnh.

→ [**Chương 2 — Tạo ảnh (prompt & tools)**](./2-tao-anh.md)

---

<ChapterVideos :videos="[
  { id: 'iv-5mZ_9CPY', title: 'But how do AI images and videos actually work?', channel: '3Blue1Brown', why: 'Explainer hình ảnh định nghĩa về diffusion (cơ chế tạo ảnh/video). (2025, 1.9M view)' },
  { id: 'EDb37y_MhRw', title: 'Generative vs Agentic AI: Shaping the Future of AI Collaboration', channel: 'IBM Technology', why: 'GenAI khác agentic AI thế nào — đặt đúng bản đồ. (2025, 1.2M view)' }
]" />
