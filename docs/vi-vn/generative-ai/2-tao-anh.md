---
title: 'Chương 2 — Tạo ảnh (prompt & tools)'
description: 'Prompt craft cho ảnh: công thức prompt có cấu trúc, tham số Midjourney (--sref/--oref, KHÔNG --cref), negative prompt, prompt weighting; chọn Flux/Nano Banana/Ideogram/Recraft/Firefly; lab bộ ảnh sản phẩm VN.'
---

# Chương 2 — Tạo ảnh (prompt & tools)

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🖼️</p>

::: tip 🔥 Thực chiến — 30 giây
50 ảnh sản phẩm áo dài *cùng một tông thương hiệu* — gõ vu vơ thì mỗi ảnh một kiểu, đăng feed loạn. Chương này: prompt có cấu trúc + `--sref` khoá phong cách.
**💸 Ăn tiền ở đâu:** bộ ảnh đồng bộ = nhận tiền chụp "studio AI" cho shop/SME.
:::

> **Cùng một Midjourney, người biết prompt ra ảnh dùng được; người gõ "ảnh đẹp" ra ảnh stock nhựa. Chương này là cách "drive".**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Viết **prompt có cấu trúc** thay vì tả vu vơ.
- Dùng đúng **tham số Midjourney** 2026 (`--sref`, `--oref`, `--no`, `--ar`) — và biết cái nào đã bỏ.
- Viết **negative prompt** đúng cách (không phản tác dụng).
- Chọn **đúng tool** cho từng loại ảnh.
:::

---

## 01 · Công thức prompt (học thuộc thứ tự)

Diffusion khớp *từ khoá + cấu trúc*, không cần ngữ pháp đẹp. Dùng công thức:

::: tip 🔑 Công thức 6 phần
```
[Subject] + [Action/Pose] + [Bối cảnh] + [Ánh sáng] + [Style/tham chiếu] + [Camera/tham số]
```
**Ví dụ (áo dài VN):**
> `Người mẫu nữ Việt mặc áo dài lụa trắng, đứng nghiêng, sân đình cổ rêu phong, nắng sớm xiên nhẹ, phong cách tạp chí thời trang, ảnh chụp 85mm bokeh --ar 4:5`
:::

- **Thứ tự ổn định** giúp tránh output bị "căn giữa generic". Quan trọng nhất để **trước**.
- **Mật độ > độ dài:** 15-40 từ đắt giá hơn 100 từ lan man.
- **Điều khiển bố cục** rõ: "bố cục bất đối xứng", "chừa khoảng trống bên phải", "góc chéo động".

---

## 02 · Tham số Midjourney 2026 (và cái đã bị bỏ)

::: warning ⚠️ ĐÃ BỎ trên V7/V8 — đừng dùng
- **`--cref`** (character reference) → thay bằng **`--oref`** (Omni Reference).
- **`::`** (multi-prompt weighting kiểu `cat::2 dog::1`) → không còn trên V7+; lái bằng `--sref`/`--oref`.
> Tutorial cũ dạy `--cref`/`::` là dành cho V6 — sai với model 2026.
:::

**Tham số cốt lõi (V7/V8):**
| Tham số | Tác dụng | Ví dụ |
|---|---|---|
| `--ar W:H` | Tỉ lệ khung | `--ar 16:9`, `--ar 4:5` |
| `--stylize / --s` (0-1000) | Độ "nghệ" của MJ | `--s 250` |
| `--chaos / --c` (0-100) | Đa dạng giữa 4 ảnh | `--c 20` |
| `--seed <n>` | Cố định ngẫu nhiên (tái lập) | `--seed 1234` |
| `--no <từ>` | **Negative** (loại bỏ) | `--no text, watermark` |
| `--raw` | Bớt "ý kiến" của MJ, sát mô tả hơn | |

**Tham chiếu phong cách & nhân vật (chìa khoá consistency — Ch5):**
- **`--sref <url|code>`** — **Style Reference**: copy *look/màu/thẩm mỹ* (không phải nhân vật). `--sw` chỉnh độ ảnh hưởng. Một `--sref` code dùng chung cho cả series = khoá style.
- **`--oref <url> --ow <0-1000>`** — **Omni Reference**: bơm *nhân vật/vật thể* từ ảnh tham chiếu. `--ow` 25-100 = lỏng, **200-400 = cân bằng (hay dùng)**, 600+ = bám sát. Tốn 2× thời gian; không chạy được ở chế độ Draft/Fast.

---

## 03 · Negative prompt — làm đúng kẻo phản tác dụng

::: warning 🚨 4 lỗi negative phổ biến
1. **Viết thành câu** ("không có hoàng hôn") → vô tình *thêm* "hoàng hôn" vào attention. Đúng: dùng **từ khoá trần** — `--no sunset` hoặc field negative: `extra fingers, deformed hands, watermark, blurry`.
2. **Mâu thuẫn với prompt chính** (váy đỏ + "red" trong negative) → tự phá.
3. **Nhồi 200 từ negative** → loãng. Giữ **10-15 từ lõi** + vài từ tuỳ tình huống.
4. **Copy negative cũ của SD 1.5** cho SDXL/Flux → các model mới cần *ít* negative hơn nhiều.
:::

---

## 04 · Prompt weighting (Stable Diffusion / ComfyUI)

Trong hệ Stable Diffusion (A1111/ComfyUI), nhấn/giảm trọng số bằng ngoặc:
```
(áo dài đỏ:1.3)     # nhấn mạnh
(hậu cảnh:0.7)      # giảm
```
> Midjourney không dùng cú pháp này (nó có `--iw` cho image prompt). Mỗi hệ một quy ước — nhớ đúng tool.

---

## 05 · Chọn tool theo loại ảnh

| Cần gì | Tool | Vì sao |
|---|---|---|
| Đẹp nghệ thuật, concept | **Midjourney V8.1** | Thẩm mỹ số 1 |
| Photoreal / edit ảnh có sẵn | **Flux Kontext / Nano Banana** | Sửa cục bộ, giữ chủ thể, edit bằng lời |
| **Chữ trong ảnh** (poster, bao bì) | **Ideogram 3** | MJ hay sai chính tả; Ideogram đọc được |
| **Vector/logo** (file in được) | **Recraft V4** | Xuất SVG thật, 300 DPI CMYK |
| **An toàn bản quyền** (khách lớn) | **Adobe Firefly** | Train trên data có license + bồi thường IP |

::: tip 🇻🇳 Mẹo VN
- Ảnh áo dài/cưới: MJ/Flux cho thẩm mỹ + `--sref` khoá phong cách Việt.
- Bao bì sản phẩm có chữ Việt: **Ideogram** (chữ có dấu dễ sai — kiểm kỹ).
- Logo doanh nghiệp: **Recraft** (giao file vector cho khách).
:::

---

## 06 · Lỗi người mới hay mắc

::: warning 🚨
1. **Mơ hồ** — "a beautiful girl in a garden" là *mô tả*, không phải *prompt*. Thiếu subject rõ, ánh sáng, style, camera → model điền bằng default nhựa.
2. **Dùng `--cref`/`::`** trên model 2026 (đã bỏ).
3. **Negative dạng câu** hoặc nhồi 200 từ.
4. **Tool-hopping** — đổi tool liên tục thay vì thành thạo 1 cái.
:::

---

## 07 · 🧪 Lab: bộ 5 ảnh sản phẩm áo dài (cùng phong cách)

::: tip Bài thực hành (45-60 phút)
Mục tiêu: 5 ảnh sản phẩm **cùng một "tông" thương hiệu** (để đăng feed nhất quán).
1. Viết prompt theo **công thức 6 phần** cho 1 mẫu áo dài (subject + bối cảnh Việt + ánh sáng + style + `--ar 4:5`).
2. Gen, chọn ảnh ưng, **lấy `--sref` code** từ ảnh đó (hoặc dùng URL ảnh làm sref).
3. Gen 4 mẫu áo dài khác **kèm cùng `--sref`** → 5 ảnh đồng bộ tông màu/ánh sáng.
4. Thêm `--no text, watermark, deformed hands`.

**Tiêu chí đạt:** 5 ảnh nhìn như *một bộ sưu tập*, không phải 5 ảnh rời rạc. (Giữ *cùng gương mặt người mẫu* là bài toán nâng cao → [Chương 5](./5-consistency-nhan-vat.md).)
:::

---

## 08 · Bài tập

1. Viết lại prompt "a nice product photo of a coffee bag" thành prompt 6-phần hoàn chỉnh cho bao cà phê Việt.
2. Bạn cần 1 poster khai trương có dòng chữ "KHAI TRƯƠNG 20/6" — chọn tool nào, vì sao?

::: details 👉 Lời giải gợi ý
1. Vd: `Bao cà phê giấy kraft in chữ tối giản, đặt trên bàn gỗ, hạt cà phê rang rải quanh, ánh sáng cửa sổ buổi sáng ấm, phong cách product photography sạch, chụp 50mm --ar 1:1 --no text, watermark`. (Để chữ trên bao chính xác → cân nhắc Ideogram.)
2. **Ideogram** — mạnh chữ trong ảnh; MJ dễ sai chính tả chữ Việt có dấu. Kiểm tra kỹ dấu.
:::

---

## 09 · Kiểm tra nhanh

1. Công thức prompt 6 phần gồm gì?
2. `--cref` còn dùng trên MJ V8 không? Thay bằng gì?
3. Vì sao "không có X" trong negative lại phản tác dụng?
4. Tool nào cho ảnh có chữ? Cho vector?
5. `--sref` khác `--oref` thế nào?

::: details 👉 Gợi ý đáp án
1. Subject + action/pose + bối cảnh + ánh sáng + style/tham chiếu + camera/tham số.
2. Không — đã bỏ; thay bằng `--oref`.
3. "Không có X" vẫn đưa khái niệm X vào attention; dùng từ khoá trần ở field negative/`--no`.
4. Chữ → Ideogram; vector → Recraft.
5. `--sref` copy *style/look*; `--oref` bơm *nhân vật/vật thể*.
:::

---

## 📸 Ví dụ minh họa (có nguồn)

> Xem sản phẩm thật từ gallery chính thức — đây là **link tới tác phẩm gốc của tác giả** (tôn trọng bản quyền, không sao chép vào khoá học):
- **Midjourney Explore** — thư viện ảnh có prompt kèm: [midjourney.com/explore](https://www.midjourney.com/explore) · *Nguồn: Midjourney*
- **Flux (Black Forest Labs)** — ví dụ từng model: [bfl.ai/models](https://bfl.ai/models) · *Nguồn: Black Forest Labs*
- **Nano Banana (Google)** — 10 ví dụ edit ảnh: [blog.google · nano-banana-examples](https://blog.google/products/gemini/gemini-nano-banana-examples/) · *Nguồn: Google*
- **Ideogram** — ảnh có chữ/typography: [ideogram.ai/explore](https://ideogram.ai/explore) · *Nguồn: Ideogram*
- **Recraft** — vector/logo: [recraft.ai/community](https://www.recraft.ai/community) · *Nguồn: Recraft*
- **Adobe Firefly** — gallery (hover xem prompt): [firefly.adobe.com/gallery](https://firefly.adobe.com/gallery) · *Nguồn: Adobe*
- **Lexica / PromptHero** — cặp prompt → ảnh để học: [lexica.art](https://lexica.art/) · [prompthero.com](https://prompthero.com/)
- **Midlibrary** — thư viện mã `--sref`: [midlibrary.io](https://midlibrary.io/) · *Nguồn: Midlibrary (cộng đồng)*
> ⚠️ Civitai/Lexica có thể chứa nội dung 18+ — bật bộ lọc SFW khi xem.

---

## 10 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Prompt = **công thức có cấu trúc**, mật độ > độ dài.
- MJ 2026: dùng **`--sref`/`--oref`**, **bỏ `--cref`/`::`**.
- Negative: **từ khoá trần, 10-15 từ, không mâu thuẫn**.
- Chọn tool theo việc; **đừng tool-hopping**.
:::

Ảnh tĩnh xong — giờ cho nó chuyển động. Chương sau: prompt video + Veo/Kling/Runway.

→ [**Chương 3 — Tạo video (prompt & tools)**](./3-tao-video.md)

---

<ChapterVideos :videos="[
  { id: 'vUj4VNXXC1c', title: 'The ULTIMATE Beginners Guide to Midjourney in 2025', channel: 'Future Tech Pilot', why: 'Onboarding Midjourney + nền tảng prompt (incl. V7). (2025, 340K view)' },
  { id: 'J3DWZ60ShzM', title: 'How To Use Midjourney | The ULTIMATE Beginners Guide to Midjourney 2025', channel: 'Wes Roth', why: 'Hướng dẫn Midjourney 2025 từ kênh AI lớn. (2025)' }
]" />
