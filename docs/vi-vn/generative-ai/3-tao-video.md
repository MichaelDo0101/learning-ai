---
title: 'Chương 3 — Tạo video (prompt & tools)'
description: 'Prompt video: công thức 5 phần, từ vựng chuyển động máy quay, audio tags, text-to-video vs image-to-video, kỹ thuật keyframe/first-last-frame; chọn Veo 3.1 / Kling 3.0 / Runway Gen-4 (Sora đã khai tử).'
---

# Chương 3 — Tạo video (prompt & tools)

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎬</p>

::: tip 🔥 Thực chiến — 30 giây
Đừng "text-to-video" mọi thứ rồi than nó méo. Mẹo pro: tạo **ảnh hero đẹp trước** → cho nó chuyển động (I2V). Kiểm soát gấp nhiều lần.
**💸 Ăn tiền ở đâu:** 1 clip quảng cáo AI rẻ hơn quay thật nhiều lần — bán cho shop/brand.
:::

> **Bí quyết video AI 2026: đừng "text-to-video" mọi thứ. Tạo ảnh hero đẹp trước, rồi cho nó chuyển động. Kiểm soát gấp nhiều lần.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Viết **prompt video 5 phần** + dùng **từ vựng máy quay** thật.
- Phân biệt **T2V vs I2V** và chọn đúng.
- Dùng **keyframe/first-last-frame** để kiểm soát chuyển cảnh.
- Chọn **Veo/Kling/Runway** đúng việc (Sora đã khai tử).
:::

---

## 01 · Công thức prompt video 5 phần

::: tip 🔑 Công thức (chuẩn Google Veo, dùng được cho mọi model)
```
[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]
```
- **Cinematography** — cỡ cảnh + góc (medium shot, close-up, low angle)
- **Subject** — ai/cái gì
- **Action** — đang làm gì (động từ động)
- **Context** — bối cảnh
- **Style & Ambiance** — tâm trạng, film stock, ánh sáng

**Ví dụ:**
> `Medium shot, một bà cụ bán phở, đang chan nước dùng bốc khói nghi ngút, quán nhỏ vỉa hè Hà Nội sáng sớm, phong cách phim tài liệu ấm, ánh sáng tự nhiên dịu`
:::

::: warning 💡 Prompt cho CHUYỂN ĐỘNG, không chỉ ngoại hình
Model học từ phim chuyên nghiệp → **dùng thuật ngữ điện ảnh thật**. "Slow push-in" chạy được; "làm cho ngầu" thì không.
:::

---

## 02 · Từ vựng chuyển động máy quay (học thuộc)

| Thuật ngữ | Nghĩa |
|---|---|
| **Dolly / push-in / pull-back** | Máy quay *di chuyển* tới/lui (khác zoom — đổi phối cảnh) |
| **Tracking shot** | Bám theo chủ thể ngang |
| **Pan / tilt** | Xoay ngang / dọc tại chỗ |
| **Crane shot** | Nâng/hạ theo phương dọc |
| **Arc shot** | Quay vòng quanh chủ thể |
| **Aerial / POV / static** | Trên cao / góc nhìn thứ nhất / cố định |

**Cỡ cảnh:** wide/establishing → medium → close-up → extreme close-up.
**Ống kính/nét:** shallow depth of field, wide-angle, macro, soft focus.

---

## 03 · Audio direction (model có audio gốc)

Veo 3.1 / Kling 3.0 tạo audio đồng bộ trong một lần. Cách ra lệnh:
```
Thoại trong ngoặc kép:  Người phụ nữ nói: "Mình phải đi ngay bây giờ."
SFX:                    SFX: tiếng sấm vọng xa
Tiếng nền:              Ambient: tiếng ồn xe máy buổi sáng
```

**Nâng cao — prompt nhiều cảnh theo timestamp (1 lần gen, nhiều nhịp):**
```
[00:00-00:02] Medium shot anh shipper dừng xe, cởi mũ bảo hiểm
[00:02-00:04] Close-up khuôn mặt lau mồ hôi. SFX: tiếng xe cộ
[00:04-00:06] Wide shot giao hàng cho cụ già, cụ cười
```

---

## 04 · T2V vs I2V — chọn cái nào?

| | **Text-to-Video (T2V)** | **Image-to-Video (I2V)** |
|---|---|---|
| Đầu vào | Chỉ mô tả | Ảnh tĩnh + mô tả |
| Kiểm soát | Thấp hơn | **Cao** (giữ bố cục/màu/nhân vật) |
| Dùng khi | Cảnh tưởng tượng không chụp được | Cần giữ đúng thiết kế/thương hiệu |

::: tip 🔑 Pipeline pro (xương sống cả module)
**Tạo ảnh "hero" trong model ảnh (MJ/Flux/Nano Banana) → rồi animate bằng I2V (Kling/Veo).** Ảnh tĩnh đã "giải" xong bố cục & màu → video ra đẹp & đúng ý nhanh hơn nhiều so với T2V từ đầu.
:::

---

## 05 · Keyframe / first-last-frame

Cho **khung đầu và khung cuối**, model nội suy ở giữa → kiểm soát chuyển cảnh + nối clip:
```
Frame đầu: ảnh sản phẩm đặt trên bàn
Frame cuối: cùng sản phẩm, camera đã đẩy sát logo
→ model tạo cú push-in mượt giữa hai khung
```
Có ở **Veo 3.1 (First & Last Frame)**, **Kling**, **Midjourney Video**. Dùng để **nối nhiều clip**: lấy frame cuối clip 1 làm frame đầu clip 2 → liền mạch ([Chương 6](./6-consistency-post.md)).

---

## 06 · Chọn tool video 2026

::: warning ⚠️ Sora 2 đã khai tử (app 4/2026, API 9/2026). Đừng học theo Sora.
:::

| Tool | Mạnh ở | Khi nào |
|---|---|---|
| **Veo 3.1** | Điện ảnh + **audio/thoại gốc**, extend cảnh tới 60s+ | Cảnh kể chuyện, có thoại, chất lượng cao |
| **Kling 3.0** | Giá/chất lượng tốt, **4K**, lip-sync đa nhân vật | Gen **số lượng nhiều, rẻ**; test ý tưởng |
| **Runway Gen-4** | **Editor mạnh**: Act-One (diễn xuất), Motion Brush | Cần edit/diễn xuất ngay trong tool |
| **Higgsfield** | **Router nhiều model** + preset social | So sánh model side-by-side rẻ |

**Mẹo chi phí:** test ý tưởng hàng loạt bằng **Kling** (rẻ), cảnh "hero" cuối cùng mới dùng **Veo** (đắt, đẹp).

---

## 07 · Lỗi người mới hay mắc

::: warning 🚨
1. **Học/chờ Sora** — đã chết; dùng Veo/Kling/Runway.
2. **T2V mọi thứ** thay vì tạo ảnh hero rồi I2V → khó kiểm soát.
3. **Prompt "làm cho đẹp"** thay vì thuật ngữ điện ảnh.
4. **Clip dài** → AI video dễ "morph/biến dạng" sau ~vài giây. Giữ clip ngắn, ghép nhiều clip.
:::

---

## 08 · 🧪 Lab: video sản phẩm 8 giây (I2V)

::: tip Bài thực hành (45-60 phút)
1. Tạo 1 **ảnh hero** sản phẩm (Ch2) — vd ly cà phê trên bàn gỗ, ánh sáng đẹp.
2. Đưa ảnh vào **Kling/Veo (I2V)** + prompt chuyển động: `slow push-in, hơi nước bốc lên từ ly, ánh nắng sớm dịch nhẹ`.
3. Thêm audio (nếu Veo): `Ambient: tiếng quán cà phê buổi sáng`.
4. (Nâng cao) Dùng **first-last-frame**: khung cuối camera đã đẩy sát logo.

**Tiêu chí đạt:** clip 8s mượt, giữ đúng thiết kế ảnh hero (không "morph"), chuyển động có chủ đích.
:::

---

## 09 · Bài tập

1. Viết prompt 5 phần cho clip giới thiệu quán bún chả (có 1 cú máy + 1 dòng thoại + SFX).
2. Bạn cần 20 clip test ý tưởng + 2 clip "hero" cuối — phân bổ tool/chi phí thế nào?

::: details 👉 Lời giải gợi ý
1. Vd: `Tracking shot, anh đầu bếp quạt than nướng chả, khói bốc nghi ngút, quán bún chả Hà Nội trưa nắng, phong cách ẩm thực ấm. Anh nói: "Mời cả nhà!" SFX: tiếng quạt than xèo xèo`.
2. 20 clip test → **Kling** (rẻ); 2 clip hero → **Veo 3.1** (đẹp + audio). Đây là chiến lược cost-routing video.
:::

---

## 10 · Kiểm tra nhanh

1. Công thức prompt video 5 phần?
2. Vì sao nên I2V thay vì T2V khi cần giữ thiết kế?
3. First-last-frame để làm gì?
4. Tool nào rẻ để test nhiều, tool nào cho cảnh hero?
5. Vì sao nên giữ clip ngắn?

::: details 👉 Gợi ý đáp án
1. Cinematography + Subject + Action + Context + Style/Ambiance.
2. I2V giữ bố cục/màu/nhân vật của ảnh hero → kiểm soát cao hơn.
3. Cho khung đầu+cuối để kiểm soát chuyển cảnh + nối clip liền mạch.
4. Test nhiều → Kling (rẻ); hero → Veo 3.1.
5. AI video dễ morph/biến dạng sau vài giây → clip ngắn, ghép nhiều.
:::

---

## 📸 Ví dụ minh họa (có nguồn)

> Showcase & phim AI thật (link tới bản gốc của tác giả):
- **Google Veo** — showcase chính thức: [deepmind.google/models/veo](https://deepmind.google/models/veo/) · *Nguồn: Google DeepMind*
- **Runway Gen-4** — phim ngắn test world-consistency: [runwayml.com · introducing-runway-gen-4](https://runwayml.com/research/introducing-runway-gen-4) · *Nguồn: Runway*
- **Kling** — explore: [kling.ai/explore-catalog](https://kling.ai/explore-catalog) · *Nguồn: Kling AI*
- **Neural Viz / "Monoverse"** (Josh Kerrigan) — vũ trụ phim AI nổi tiếng: [youtube.com/@NeuralViz](https://www.youtube.com/@NeuralViz) · *Nguồn: Neural Viz*
- **Curious Refuge** — gallery phim AI cộng đồng: [curiousrefuge.com/ai-film-gallery](https://curiousrefuge.com/ai-film-gallery) · *Nguồn: Curious Refuge*

Demo Veo chính chủ (nhúng từ Google DeepMind):

<ChapterVideos :videos="[
  { id: 'mCFMn0UkRt0', title: 'Veo 3 demo | Sailor and the sea', channel: 'Google DeepMind', why: 'Demo chính chủ — video + audio gốc sinh bằng Veo 3.' },
  { id: 'vcHxAwDwPOg', title: 'Veo 3 demo | Feather\'s journey', channel: 'Google DeepMind', why: 'Demo chính chủ — chuyển động & ánh sáng điện ảnh.' }
]" />

---

## 11 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Prompt video = **5 phần + từ vựng máy quay + audio tags**.
- **Ảnh hero → I2V** là pipeline kiểm soát tốt nhất.
- **Veo** (điện ảnh/thoại), **Kling** (rẻ/nhiều), **Runway** (edit). **Không Sora.**
- Clip ngắn, ghép nhiều (tránh morph).
:::

Ảnh & video xong — giờ thêm âm thanh: nhạc & giọng nói.

→ [**Chương 4 — Tạo nhạc & giọng nói**](./4-tao-nhac-giong.md)

---

<ChapterVideos :videos="[
  { id: 'c7R94ykz0po', title: 'AI Videos in 2025 Are Getting Crazy! Google Veo 3 TUTORIAL!', channel: 'Grow With Kaz', why: 'Tutorial Veo 3 view cao nhất 2025. (830K view)' },
  { id: 'IjF5Uun2jrM', title: 'Google Veo 3 Tutorial: Make Cinematic AI Videos with Just a Prompt', channel: 'Kevin Stratvert', why: 'Veo 3 điện ảnh từ một kênh tutorial chính thống lớn. (2025, 580K view)' }
]" />
