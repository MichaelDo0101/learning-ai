---
title: 'Chương 5 — Consistency nhân vật & style'
description: 'Kỹ năng phân biệt amateur với pro: giữ cùng một nhân vật/style qua hàng chục ảnh. Bộ ba LoRA + ControlNet + IPAdapter, Midjourney --sref/--oref, reference sheet, seed lock, InstantID/PuLID, và ComfyUI hands-on.'
---

# Chương 5 — Consistency nhân vật & style

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧬</p>

::: tip 🔥 Thực chiến — 30 giây
KOL ảo của bạn mỗi post một gương mặt → không ai tin là "một người". Pro dùng **LoRA / `--oref`** khoá identity qua hàng chục ảnh.
**💸 Ăn tiền ở đâu:** giữ *cùng nhân vật* qua 50 ảnh = thứ bán được thật (KOL ảo, truyện tranh, bộ ảnh sản phẩm).
:::

> **Tạo *một* ảnh đẹp: ai cũng làm được. Giữ *cùng một nhân vật* qua 50 ảnh khác cảnh: đây là kỹ năng bán được tiền.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Giữ **cùng một nhân vật/style** qua nhiều ảnh.
- Phân biệt & dùng **bộ ba LoRA + ControlNet + IPAdapter**.
- Dùng **`--sref`/`--oref`** (Midjourney) và **InstantID/PuLID** (no-train).
- Biết khi nào **train LoRA** vs khi nào dùng reference nhanh.
:::

---

## 01 · Vì sao consistency là kỹ năng cốt lõi

Mọi sản phẩm bán được đều cần nó: KOL ảo (cùng gương mặt mọi post), truyện tranh (cùng nhân vật mọi khung), bộ ảnh sản phẩm (cùng người mẫu), phim ngắn (cùng diễn viên mọi cảnh).

Người mới gen lại 50 lần hy vọng "ra giống" — **sai cách**. Pro dùng **kỹ thuật khoá identity**. Chương này là các kỹ thuật đó.

---

## 02 · Khung quyết định (chọn kỹ thuật theo nhu cầu)

```
Cần consistency mức nào & bạn có điều khiển model không?
│
├─ Khoá STYLE cả series (màu/look)      → --sref (MJ) hoặc style LoRA
├─ Cùng MẶT, nhanh, không train         → Nano Banana / InstantID / PuLID / MJ --oref
├─ EDIT một nhân vật/cảnh có sẵn         → Flux Kontext / Nano Banana (hội thoại)
└─ Nhân vật TÁI DÙNG mãi qua cả dự án    → TRAIN LoRA (giải pháp bền nhất) + ControlNet + seed
```

---

## 03 · Closed-tool (Midjourney / Nano Banana / Flux Kontext)

**Midjourney:**
- **`--sref <code/url>`** — khoá *style* cả series (một code dùng chung).
- **`--oref <url> --ow 200-400`** — bơm *nhân vật* (V7+; thay `--cref` đã bỏ). Quy trình: tạo 1 ảnh nhân vật "chuẩn" → tái dùng với `--oref` + mô tả cảnh mới (text vẫn quan trọng — reference không mang thông tin cảnh). **Tối đa 2 reference** ("nhiều hơn thành bùn, không thành phép").

**Nano Banana (Gemini):** mạnh nhất về giữ identity khi **edit bằng hội thoại** ("đổi áo sang đỏ, giữ nguyên mặt"), blend nhiều ảnh, giữ qua một chuỗi kể chuyện.

**Flux Kontext:** edit *trong ngữ cảnh* — prompt kèm cả text và ảnh, sửa cục bộ mà **giữ nhân vật/vật thể** qua nhiều lần edit.

---

## 04 · Open-stack: bộ ba LoRA + ControlNet + IPAdapter

Đây là "vũ khí" của ComfyUI/Stable Diffusion. Hiểu **mỗi cái kiểm soát gì** (đa số người học lẫn lộn):

::: tip 🔑 Ba thứ, ba việc khác nhau
| Công cụ | Kiểm soát | Ẩn dụ |
|---|---|---|
| **LoRA** | **Identity/style cụ thể** (nhân vật A, phong cách X) | "Dạy model nhớ mặt nhân vật" |
| **ControlNet** | **Cấu trúc** (tư thế, chiều sâu, đường nét) | "Đặt khung xương/bố cục" |
| **IPAdapter** | **Style/look từ 1 ảnh tham chiếu** (không train) | "Dán cảm hứng từ ảnh mẫu" |

**Combo pro cho nhân vật nhất quán:** **ControlNet (tư thế) + IPAdapter (look) + LoRA (identity).**
:::

---

## 05 · Train LoRA — chuẩn vàng cho nhân vật tái dùng

Khi cần *cùng* nhân vật dùng mãi qua mọi tư thế/cảnh → **train một LoRA**.

::: tip 🔑 Spec thực chiến 2026
- **Dataset:** **15-30 ảnh** (chất > lượng; "15-20 ảnh tốt thắng 50 ảnh tệ"). Mặt người: 20-40 ảnh **đa góc, đa biểu cảm, đa ánh sáng**. Độ phân giải ≥ **1024×1024**; **không upscale** ảnh mờ; bỏ ảnh che mặt/góc cực đoan.
- **Caption** (mô tả từng ảnh) là bước **quan trọng nhất hay bị bỏ qua**.
- **Steps:** ~**1.500-2.500** cho character LoRA.
- **Learning rate:** SDXL ~**1e-4**; Flux ~5e-5-1e-4.
- **#1 sai lầm = overtrain.** Lưu checkpoint mỗi 200-500 step, test từng cái — kết quả tốt nhất thường *trước* checkpoint cuối.
:::

---

## 06 · ControlNet — khoá cấu trúc

Khi cần *đúng tư thế/bố cục* (kết hợp với LoRA identity):
| Loại | Khoá gì |
|---|---|
| **OpenPose** | Tư thế cơ thể/tay chân |
| **Depth** | Hình học 3D/không gian |
| **Canny** | Đường nét cứng (sản phẩm, kiến trúc) |
| **Scribble/Lineart** | Phác thảo → ảnh |

> ControlNet cần **preprocessor** chuyển ảnh tham chiếu thành "bản đồ điều khiển" (pose map, depth map...) trước.

---

## 07 · No-train face (nhanh, không cần train)

| Tool | Đặc điểm |
|---|---|
| **InstantID** | Điểm identity cao nhất; nặng tài nguyên |
| **PuLID** | Nhẹ hơn, phổ biến trên Flux; fidelity hơi kém InstantID |
| **Nano Banana** | Giữ mặt khi edit hội thoại (không cần ComfyUI) |

→ Cần cùng mặt cho **vài chục ảnh nhanh** mà ngại train → InstantID/PuLID hoặc Nano Banana.

---

## 08 · Reference sheet + seed lock (quy trình)

::: tip 🔑 Quy trình chuẩn để giữ nhân vật
1. **Tạo reference sheet trước:** 1 ảnh nhân vật "chuẩn" + 4-6 góc (trước/nghiêng/3-4/toàn thân) + vài biểu cảm. Ảnh **rõ, đủ sáng, 1024×1024** quan trọng hơn 4K mờ.
2. **Viết "continuity bible":** ghi mọi đặc điểm cố định (tóc, trang phục, vết sẹo, tông màu) và **dùng đúng từng chữ** mọi prompt.
3. **Khoá seed** khi tool cho phép → tái lập.
4. Dùng reference (`--oref`/IPAdapter/LoRA) + ControlNet (tư thế) cho cảnh mới.
:::

---

## 09 · ComfyUI — vào cửa hands-on

**ComfyUI** = giao diện **node-graph** (nối node: load model → mã hoá prompt → KSampler → decode → save). 2026 là tool **local/chuyên nghiệp** số 1.

**Vì sao pro chọn:**
- Hỗ trợ nhiều model + tiết kiệm VRAM; **chỉ chạy lại node có input đổi** (lặp prompt không reload model → nhanh).
- Workflow **xuất ra JSON**, chia sẻ được (kéo ảnh PNG có metadata vào là load lại nguyên workflow).

**Thứ tự học:** txt2img cơ bản → img2img → thêm **LoRA** → thêm **ControlNet (OpenPose)** đổi tư thế → cuối cùng **train 1 character LoRA** + gen series 5 ảnh.

**VRAM thực tế:** SDXL ≥ 8GB; Flux fp8 ≥ 12GB; **12GB là mức thực dụng 2026**. Không có GPU mạnh → chạy **cloud** (RunPod) hoặc dùng **Replicate/fal** ([Chương 7](./7-pipeline-tu-dong.md)).

---

## 10 · 🧪 Lab: tạo nhân vật & giữ qua 5 cảnh

::: tip Bài thực hành (90 phút) — chọn 1 đường
**Đường closed-tool (dễ):**
1. Tạo 1 KOL ảo nữ Việt (MJ/Flux) — 1 ảnh chuẩn đẹp.
2. Lấy URL ảnh đó làm `--oref --ow 300`, gen 5 cảnh khác (quán cà phê, đường phố, văn phòng...) + cùng `--sref` khoá tông.
3. Kiểm: 5 ảnh có giữ **cùng gương mặt + cùng tông**?

**Đường open-stack (sâu):**
1. ComfyUI: chạy txt2img → thêm **IPAdapter** với ảnh nhân vật → gen 5 cảnh.
2. (Nâng cao) Train **LoRA** 20-30 ảnh, ~1.500 step; gen series.

**Tiêu chí đạt:** 5 ảnh khác cảnh nhưng nhận ra là *cùng một người*. Đây là minh chứng bạn làm chủ consistency.
:::

---

## 11 · Bài tập

1. Bạn cần KOL ảo đăng 3 post/tuần trong 6 tháng (~70 ảnh) — closed-tool reference hay train LoRA? Vì sao?
2. Truyện tranh 20 khung, cùng 2 nhân vật, nhiều tư thế — kết hợp công cụ nào?

::: details 👉 Lời giải gợi ý
1. **Train LoRA** — số lượng lớn + tái dùng lâu dài → LoRA bền và rẻ hơn về lâu dài (reference nhanh hợp khi ít ảnh/ngắn hạn).
2. **LoRA (identity 2 nhân vật) + ControlNet OpenPose (tư thế từng khung) + seed**; style khoá bằng `--sref`/style LoRA.
:::

---

## 12 · Kiểm tra nhanh

1. LoRA, ControlNet, IPAdapter mỗi cái kiểm soát gì?
2. Combo pro cho nhân vật nhất quán?
3. Sai lầm #1 khi train LoRA?
4. Khi nào train LoRA vs dùng reference nhanh?
5. `--sref` vs `--oref`?

::: details 👉 Gợi ý đáp án
1. LoRA = identity/style cụ thể; ControlNet = cấu trúc (tư thế/depth/nét); IPAdapter = style từ ảnh tham chiếu (không train).
2. ControlNet (tư thế) + IPAdapter (look) + LoRA (identity).
3. Overtrain — không lưu/test checkpoint trung gian.
4. Train LoRA khi cần tái dùng lâu dài/số lượng lớn; reference nhanh khi ít ảnh/ngắn hạn.
5. `--sref` khoá style; `--oref` bơm nhân vật.
:::

---

## 📸 Ví dụ minh họa (có nguồn)

> Ví dụ consistency & workflow thật (link tới bản gốc):
- **Midjourney Omni-Reference** — ví dụ giữ nhân vật (`--oref`): [updates.midjourney.com · omni-reference](https://updates.midjourney.com/omni-reference-oref/) · *Nguồn: Midjourney*
- **Nano Banana (Google)** — demo character consistency: [developers.googleblog.com · gemini-2-5-flash-image](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/) · *Nguồn: Google*
- **ComfyUI Examples** (chính thức — kéo ảnh vào để load workflow): [comfyanonymous.github.io/ComfyUI_examples](https://comfyanonymous.github.io/ComfyUI_examples/) · *Nguồn: ComfyUI*
- **ThinkDiffusion** — consistent character với Flux (có file workflow): [learn.thinkdiffusion.com · consistent-character](https://learn.thinkdiffusion.com/consistent-character-creation-with-flux-comfyui/) · *Nguồn: ThinkDiffusion*
- **Civitai** — LoRA + ảnh ví dụ mỗi model (bật SFW): [civitai.com/models?types=LORA](https://civitai.com/models?types=LORA) · *Nguồn: Civitai*
- **Stable Diffusion Art** — guide ControlNet / IPAdapter (có before/after): [controlnet](https://stable-diffusion-art.com/controlnet/) · [ip-adapter](https://stable-diffusion-art.com/ip-adapter/) · *Nguồn: Stable Diffusion Art*
- 🇻🇳 **Stable Diffusion Vietnam (SDVN)** — cộng đồng + model Việt: [stablediffusion.vn](https://stablediffusion.vn/) · [GitHub](https://github.com/StableDiffusionVN) · *Nguồn: SDVN*

---

## 13 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Consistency = kỹ năng **bán được tiền**; đừng "gen lại nhiều lần".
- **LoRA (identity) + ControlNet (cấu trúc) + IPAdapter (style)** — nhớ ai làm gì.
- **`--sref`** style, **`--oref`** nhân vật; **InstantID/PuLID** no-train.
- **Reference sheet + continuity bible + seed lock** là quy trình lõi.
:::

Giữ nhân vật trong ảnh xong — giờ giữ qua cả một *series video* + xử lý hậu kỳ cho ra "phim".

→ [**Chương 6 — Consistency series & Post-production**](./6-consistency-post.md)

---

<ChapterVideos :videos="[
  { id: 'PhiPASFYBmk', title: 'Create HYPERREALISTIC Consistent AI Characters - FREE & LOCAL! [Full ComfyUI Masterclass 2025]', channel: 'Mickmumpitz', why: 'Masterclass nhân vật nhất quán, chạy local/free. (2025, 560K view)' },
  { id: 'grtmiWbmvv0', title: 'Generate endless CONSISTENT CHARACTERS from one input image! (ComfyUI Tutorial)', channel: 'Mickmumpitz', why: 'Từ 1 ảnh → character sheet nhất quán. (2025, 380K view)' }
]" />
