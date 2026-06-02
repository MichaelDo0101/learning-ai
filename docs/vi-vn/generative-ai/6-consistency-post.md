---
title: 'Chương 6 — Consistency series & Post-production'
description: 'Giữ nhân vật nhất quán qua cả series video (reference sheet → Ingredients/Elements → first-last-frame chaining → batch-by-similarity → mask-in-edit) và hậu kỳ: color grading, upscale/repair, audio, lip-sync, captions, reframe cross-platform.'
---

# Chương 6 — Consistency series & Post-production

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎞️</p>

::: tip 🔥 Thực chiến — 30 giây
Clip AI ra "nguyên liệu thô", không phải "phim": nhân vật morph tay, màu mỗi clip một kiểu. Hậu kỳ + first-last-frame cứu.
**💸 Ăn tiền ở đâu:** 30s nhìn như *một phim* (đồng tông, caption sạch) = nhận job dựng video.
:::

> **AI xuất ra "nguyên liệu thô", không phải "phim". Khác biệt giữa clip AI nghiệp dư và một thước phim là ở hậu kỳ.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Giữ **cùng nhân vật qua cả series** video (pipeline 6 bước).
- **Nối clip** liền mạch bằng first-last-frame.
- Hậu kỳ: **color grade thống nhất**, upscale/sửa lỗi, audio, **lip-sync**, **captions**, reframe.
:::

---

## 01 · Pipeline giữ nhân vật qua series (6 bước)

::: tip 🔑 Quy trình chuẩn 2026
1. **Tạo reference sheet TRƯỚC** — 1 ảnh nhân vật chuẩn + 4-6 góc + biểu cảm (rõ, 1024×1024).
2. **Dùng tính năng identity của model:** Veo **Ingredients** (tới 4 ảnh ref), Kling **Elements/Character ID** (3-5 ref, giữ ~90% identity), Runway **References**.
3. **Nối clip bằng first-last-frame** ("frame stitching"): lấy **khung cuối cảnh 1 làm khung đầu cảnh 2** → liền mạch tuyệt đối.
4. **Gen theo NHÓM tương đồng, KHÔNG theo thứ tự kịch bản:** gom tất cả close-up gen cùng nhau, rồi tất cả medium shot... (ảnh cùng batch ít trôi hơn ảnh kề nhau theo thời gian).
5. **Continuity bible:** ghi mọi đặc điểm (tóc, trang phục, tông màu) và **dùng đúng từng chữ** mọi prompt; khoá seed/style.
6. **Review → regen → che phần trôi còn lại bằng edit** (dự trù **15-25% phải gen lại**).
:::

---

## 02 · Tính năng identity theo model

| Model | Tính năng | Cách dùng |
|---|---|---|
| **Veo 3.1** | **Ingredients to Video** | Tới 4 ảnh ref (nhân vật/vật/style) giữ qua cảnh |
| **Kling 3.0** | **Elements / Character ID** | 3-5 ảnh ref → embedding identity (~90%, kém ở góc cực đoan) |
| **Runway Gen-4** | **References** | Đưa ảnh ref vào generation |

> Điểm chung: **cùng reference + cùng cách mô tả** = nhất quán. Đổi chữ mô tả = trôi nhân vật.

---

## 03 · Hậu kỳ — quy tắc số 1: TRIAGE trước

::: warning 🚨 Sửa hay gen lại?
**Lỗi cấu trúc** (vật thể xuất hiện/biến mất, **morph/biến dạng**, tay chảy, logo trôi) → **KHÔNG sửa được trong edit, phải GEN LẠI** (seed/prompt mới). Đốt ngân sách gen-lại vào đây, đừng vào timeline.
"Object permanence" là điểm yếu lõi: ly cà phê nhảy chỗ giữa các cắt, đồ đạc tự sắp xếp lại.
:::

---

## 04 · Color grading (DaVinci Resolve — free, chuẩn ngành)

- Resolve dùng hệ **node** (không phá huỷ; mỗi node = 1 bước grade).
- **Thứ tự 2026:** để **AI làm pass kỹ thuật** (cân exposure, match các clip từ nhiều model về nền **Rec.709 sạch**) → rồi mới áp **LUT/grade sáng tạo**.
- **Mẹo số 1 cho video AI:** **một grade thống nhất cho mọi clip** → làm các clip lệch nhau (từ nhiều model) trông như *một phim*.

---

## 05 · Upscale & sửa lỗi (Topaz Video AI)

- **Topaz Astra ("GenAI Fix")** chuyên sửa méo của video AI (Kling/Veo), có **scene detection** áp setting khác nhau theo đoạn.
- Setting thực dụng: **2× upscale** (4× nặng VRAM) + phục hồi grain nhẹ; thêm interpolation lên ≥24fps để giảm flicker.

---

## 06 · Audio — vấn đề ngược đời: "quá hoàn hảo"

Audio AI thường **quá sạch** (không tiếng phòng, không màu micro) → tai người nhận ra giả. Sửa bằng cách **thêm lại "dấu vân" âm thanh:** reverb phòng nhẹ, màu micro, de-ess, khớp tiếng nền giữa các clip. (Dù model có audio gốc vẫn nên dọn.)

---

## 07 · Lip-sync (khi thoại phải khớp miệng)

| Tool | Mạnh ở |
|---|---|
| **Runway Act-One** | Quay webcam mình → chuyển diễn xuất/khẩu hình lên nhân vật (biểu cảm nhất) |
| **Sync.so** | Hợp pipeline/API (theo usage) |
| **Hedra** | Nhân vật nói biểu cảm (vi-biểu cảm, cử động đầu) |
| **Magic Hour** | All-in-one cho solo creator (rẻ) |

---

## 08 · Captions & Reframe (đừng bỏ qua — quyết định retention)

::: tip 🔑 85% short-form xem TẮT TIẾNG
**Captions là cái hook, không phải phụ kiện.** Caption cháy chữ (burned-in) có animation/nhấn mạnh **thắng** chữ trắng phẳng về tỉ lệ xem hết — đúng thứ thuật toán thưởng.
- **CapCut Auto Captions** (1 chạm) — **luôn kiểm transcript** (AI hay sai chính tả, nhất là tiếng Việt có dấu).
:::

**Reframe cross-platform (1 master → nhiều tỉ lệ):**
- 16:9 (YouTube) / **9:16 (TikTok/Reels/Shorts — 1080×1920)** / 1:1 (feed).
- Tool bám chủ thể: **CapCut Auto Reframe**, **OpusClip ReframeAnything**, **Luma Reframe** (còn outpaint mở rộng cạnh thay vì crop).
- **Quy tắc:** đặt canvas tỉ lệ đích → chạy AI reframe → kiểm chủ thể + chữ còn trong vùng an toàn.

---

## 09 · Khác biệt thuật toán nền tảng (để repurpose đúng)

| Nền tảng | Tối ưu cho | Mạnh nhất |
|---|---|---|
| **TikTok** | Watch time, completion, re-watch | **Khám phá nguội** (đẩy tới người lạ nhanh) |
| **YouTube Shorts** | Retention + chủ đề kênh nhất quán | **Monetization** + phễu sang long-form |
| **Instagram Reels** | "Sends per reach" (share DM) | **Khán giả sẵn có** + nội dung dễ share |

> Đòn bẩy chung: **hook 1 giây đầu mạnh**, xem-hết cao, captions bật, **upload native** từng nền tảng (đừng đăng bản có watermark chéo).

---

## 10 · 🧪 Lab: phim ngắn 30s, 1 nhân vật, nhiều cảnh

::: tip Bài thực hành (2-3 giờ)
1. Tạo **reference sheet** 1 nhân vật ([Chương 5](./5-consistency-nhan-vat.md)).
2. Viết 5-6 shot (prompt 5 phần — [Chương 3](./3-tao-video.md)), animate bằng **Kling/Veo + Ingredients/Elements**.
3. **Nối** bằng first-last-frame; **gen theo nhóm tương đồng**.
4. Ráp trong **CapCut/Resolve**, **một grade thống nhất**.
5. Thêm **captions cháy chữ** + nhạc nền ([Chương 4](./4-tao-nhac-giong.md)).
6. **Reframe** bản 16:9 thành 9:16 cho Reels.

**Tiêu chí đạt:** 30s nhìn như *một phim* — cùng nhân vật, cùng tông màu, captions sạch, có bản dọc.
:::

---

## 11 · Bài tập

1. Một clip có nhân vật "morph" tay ở giây thứ 4 — sửa trong CapCut hay gen lại? Vì sao?
2. Bạn có 6 clip từ Kling + Veo, màu lệch nhau — làm sao thành "một phim"?

::: details 👉 Lời giải gợi ý
1. **Gen lại** — morph là lỗi cấu trúc, không sửa được trong edit; đổi seed/prompt.
2. **Một color grade thống nhất** trong Resolve, match tất cả về một clip "hero" (Rec.709 nền) rồi áp cùng LUT.
:::

---

## 12 · Kiểm tra nhanh

1. 6 bước giữ nhân vật qua series?
2. "Frame stitching" là gì?
3. Vì sao gen theo nhóm tương đồng, không theo kịch bản?
4. Lỗi morph: sửa hay gen lại?
5. Vì sao captions quan trọng?

::: details 👉 Gợi ý đáp án
1. Reference sheet → Ingredients/Elements → first-last-frame chaining → batch-by-similarity → continuity bible/seed → review+regen+che bằng edit.
2. Lấy khung cuối cảnh 1 làm khung đầu cảnh 2 → liền mạch.
3. Ảnh cùng batch ít trôi hơn ảnh kề nhau theo thời gian.
4. Gen lại (lỗi cấu trúc).
5. 85% xem tắt tiếng → caption là hook, tăng xem-hết.
:::

---

## 📸 Ví dụ minh họa (có nguồn)

> Phim AI hoàn chỉnh để học cách dựng series + hậu kỳ (link tới bản gốc):
- **Neural Viz / "Monoverse"** (Josh Kerrigan) — vũ trụ phim AI nhất quán nhân vật qua nhiều tập: [youtube.com/@NeuralViz](https://www.youtube.com/@NeuralViz) · *Nguồn: Neural Viz*
- **Curious Refuge** — gallery phim AI tuyển chọn (trailer, phim ngắn): [curiousrefuge.com/ai-film-gallery](https://curiousrefuge.com/ai-film-gallery) · *Nguồn: Curious Refuge*
- **Runway Gen-4** — phim test consistency qua nhiều cảnh: [runwayml.com · introducing-runway-gen-4](https://runwayml.com/research/introducing-runway-gen-4) · *Nguồn: Runway*

---

## 13 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Series consistency: **reference sheet → Ingredients/Elements → first-last-frame → batch-by-similarity**.
- Hậu kỳ: **triage (gen lại lỗi cấu trúc)**, **một grade thống nhất**, Topaz, audio "bớt hoàn hảo", lip-sync, **captions + reframe**.
- Repurpose theo **thuật toán từng nền tảng**.
:::

Làm tay từng cái xong — giờ tự động hóa để gen *hàng loạt* thay vì click từng cái.

→ [**Chương 7 — Pipeline tự động & faceless factory**](./7-pipeline-tu-dong.md)

---

<ChapterVideos :videos="[
  { id: 'aVfawxDj6uw', title: 'How to Make a Professional AI Animated Film', channel: 'Curious Refuge', why: 'Workflow dựng phim AI hoàn chỉnh (giữ nhân vật + hậu kỳ). (2025, 140K view)' },
  { id: 'rQgaQ1p4tKU', title: 'My AI Videos Hit 1M+ Views (Veo3 + Sora 2 Demo)', channel: 'Greg Isenberg', why: 'Quy trình thực chiến ra video AI viral. (2025)' }
]" />
