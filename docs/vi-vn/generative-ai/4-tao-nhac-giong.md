---
title: 'Chương 4 — Tạo nhạc & giọng nói'
description: 'Prompt nhạc với Suno (cấu trúc Style + meta-tags section), xuất stems; giọng nói ElevenLabs + đạo đức voice cloning; và TTS tiếng Việt (Vbee/Viettel/FPT/Zalo) — vì sao tiếng Việt cần tool riêng. Trạng thái pháp lý Suno/Udio.'
---

# Chương 4 — Tạo nhạc & giọng nói

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎵</p>

::: tip 🔥 Thực chiến — 30 giây
Cần nhạc nền + giọng đọc tiếng Việt cho video? Suno ra nhạc — nhưng ElevenLabs **đọc tiếng Việt sai dấu**, phải dùng Vbee/Viettel.
**💸 Ăn tiền ở đâu:** audiobook / faceless tiếng Việt giọng chuẩn = ngách cạnh tranh ít.
:::

> **Nhạc nền + giọng đọc là "chất keo" của mọi video. Biết drive Suno + chọn đúng TTS tiếng Việt là lợi thế lớn.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Viết **prompt nhạc có cấu trúc** (Style field + section tags) thay vì "happy pop".
- Xuất **stems** để remix/mix.
- Tạo **giọng nói** + hiểu **đạo đức/luật** voice cloning.
- Chọn đúng **TTS tiếng Việt** (ElevenLabs *không* phải lựa chọn tốt cho tiếng Việt).
:::

---

## 01 · Suno — mental model 3 trường

Ở chế độ Custom, Suno có 3 trường: **Style** (mô tả nhạc) + **Lyrics** (lời + thẻ cấu trúc) + **Title**. Hiểu vai trò từng trường là drive được.

---

## 02 · Style field — công thức (4-7 mô tả là tối ưu)

::: tip 🔑 Công thức
```
[Genre/Subgenre], [Tempo/Năng lượng], [Nhạc cụ chính], [Kiểu giọng], [Chất âm/production], [Mood]
```
**Ví dụ (bolero Việt):**
> `bolero Việt Nam, chậm rãi tình cảm, guitar thùng + đàn bầu, giọng nữ trầm ấm, thu âm mộc ấm như thập niên 80, hoài niệm`
:::

::: warning 💡 Đừng nhồi tag
**4-7 mô tả là ngọt nhất.** Quá nhiều tag (10+) làm model **rối** và ra kết quả không nhất quán. Quy tắc: **1-2 genre + 2-3 nhạc cụ + 1-2 mood**. Quan trọng nhất để **đầu**.
:::

---

## 03 · Section tags — điều khiển *cấu trúc* bài hát

Trong trường Lyrics, dùng **thẻ trong ngoặc vuông** để báo cấu trúc cho model (đây là *thẻ chức năng*, không phải lời):

| Thẻ | Tác dụng |
|---|---|
| `[Intro]` | Dạo đầu |
| `[Verse 1]`, `[Verse 2]` | Phiên khúc (đánh số để buộc giai điệu khác nhau) |
| `[Pre-Chorus]` | Xây căng thẳng trước điệp khúc (chìa khoá chuyển mượt) |
| `[Chorus]` | Điệp khúc (lặp lại thẻ để model dùng cùng giai điệu hook) |
| `[Bridge]` | Đoạn cầu nối, thường đổi năng lượng |
| `[Outro]` | Kết, có thể `[Outro: fade out]` |
| `[Guitar Solo]`, `[Instrumental]` | Đoạn nhạc cụ |

**Thẻ tham số theo đoạn** (đòn mạnh để ra đúng sound):
```
[Verse: giọng thì thầm, guitar mộc]
[Bridge: đổi sang năng lượng mạnh, thêm dàn dây]
[Outro: fade out]
```

::: tip 🔑 4 mẹo ra đúng "sound"
1. Ghi rõ **giới tính/kiểu giọng** (`[Female Vocal]`, thì thầm/belt/spoken).
2. Neo **chất âm/thời đại** ("lo-fi tape", "mix radio bóng bẩy").
3. Dùng **pre-chorus + verse đánh số**; lặp `[Chorus]` để hook nhất quán.
4. **Đổi một biến mỗi lần** (genre → nhạc cụ → giọng), đừng viết lại cả prompt.
:::

> ⚠️ *Bài viết này chỉ hướng dẫn cấu trúc prompt. Tự viết lời của bạn; đừng dán lời bài hát có bản quyền của người khác vào Suno.*

---

## 04 · Stems — xuất để mix/remix

Suno (Pro/Premier) xuất **tới 12 stem** (trống, bass, guitar, keys, synth, dây...) dạng WAV đồng bộ thời gian → kéo vào DAW (Ableton/Logic) để mix lại, thay nhạc cụ, hoặc làm nhạc nền video. Bản free chỉ 2 stem (vocals + instrumental).

---

## 05 · Giọng nói — ElevenLabs & đạo đức

**ElevenLabs v3** (toàn cầu): 70+ ngôn ngữ, **Audio Tags** (`[whispers]`, `[sighs]`, `[shouts]`), hội thoại đa người, **dub video** giữ giọng gốc.

::: warning ⚖️ Đạo đức & luật voice cloning (BẮT BUỘC nhớ)
- **Chỉ clone giọng bạn sở hữu hoặc có đồng ý bằng văn bản.**
- ElevenLabs **chặn clone giọng người nổi tiếng / chính trị gia** và **khoá tài khoản** vi phạm.
- ≥12 bang Mỹ có luật voice-cloning (vd **ELVIS Act** ở Tennessee). VN: dùng hình ảnh/giọng người khác để lừa đảo là vi phạm pháp luật.
→ Chi tiết: [Chương 9](./9-phap-ly-dao-duc.md).
:::

---

## 06 · 🇻🇳 TTS tiếng Việt — dùng tool RIÊNG

::: warning ⚠️ ElevenLabs KHÔNG phải lựa chọn tốt cho tiếng Việt
Giọng mặc định hay **lai âm tiếng Anh**, biểu cảm/clone không sang tốt. Lý do tiếng Việt khó: **6 thanh điệu chỉ thể hiện qua dấu** (sai dấu = sai từ), và **trộn số/từ viết tắt/tên tiếng Anh** làm rối chuẩn hoá văn bản.
:::

| Tool VN | Mạnh ở |
|---|---|
| **Vbee** | 400+ giọng, voice cloning, chuẩn thanh điệu + giọng vùng miền |
| **Viettel AI / FPT.AI** | Giọng tự nhiên, tích hợp doanh nghiệp |
| **Zalo AI** | Giọng Bắc/Nam, miễn phí mức cơ bản |
| **VieNeu-TTS** (open) | Chạy on-device, clone nhanh |

→ Audiobook/podcast/faceless tiếng Việt: **bắt đầu với Vbee/Viettel**, không phải ElevenLabs.

---

## 07 · Pháp lý nhạc AI 2026 (nói cho chuẩn)

::: tip 📌 Trạng thái settle (đã verify)
- **Warner × Suno**: settle (11/2025) → license + tải trả phí từ 2026.
- **UMG × Udio**: settle (10/2025) → nền tảng "walled garden" có license.
- ⚠️ **NHƯNG UMG và Sony VẪN đang kiện Suno** (chưa xong). Đừng nói "đã settle hết".
:::

**Phân phối (ai nhận nhạc AI):**
- **Chấp nhận:** DistroKid, RouteNote, Amuse, LANDR.
- **Từ chối nhạc 100% AI:** TuneCore, CD Baby.
- **Bản quyền thương mại Suno** chỉ áp dụng cho bài tạo *khi đang ở gói trả phí* — nâng cấp sau **không** hồi tố bài làm ở free. **Giữ ngày tạo + hoá đơn.**

---

## 08 · 🧪 Lab: nhạc nền + giọng đọc Việt

::: tip Bài thực hành (60 phút)
1. **Suno:** viết Style field theo công thức (vd "lo-fi chill, guitar nhẹ, không lời, thư giãn"); tạo 1 track nhạc nền 1 phút cho video.
2. Xuất **instrumental stem** để làm nền.
3. **Vbee/Viettel:** viết 3 câu giới thiệu tiếng Việt, tạo giọng đọc; kiểm **dấu thanh** đọc đúng.
4. Ghép nhạc nền + giọng đọc (CapCut).

**Tiêu chí đạt:** 1 đoạn audio sạch (nhạc nền + voiceover Việt rõ dấu), commercial-safe (lời tự viết, giọng không clone người thật).
:::

---

## 09 · Bài tập

1. Viết Style field cho một bài rap tiếng Việt cổ vũ tinh thần khởi nghiệp (chỉ phần mô tả, tự viết lời).
2. Bạn làm kênh kể chuyện ma tiếng Việt (faceless) — chọn TTS nào, vì sao?

::: details 👉 Lời giải gợi ý
1. Vd Style: `boom-bap rap Việt, tempo vừa, beat trống mạnh + piano u tối, giọng nam rõ chữ, mix hiện đại, năng lượng quyết tâm`. Lời tự viết.
2. **Vbee/Viettel/Zalo** — đọc tiếng Việt tự nhiên, đúng dấu; ElevenLabs lai âm Anh sẽ phá không khí.
:::

---

## 10 · Kiểm tra nhanh

1. 3 trường của Suno custom?
2. Bao nhiêu mô tả trong Style field là tối ưu?
3. Thẻ `[Chorus]` lặp lại để làm gì?
4. Vì sao không dùng ElevenLabs cho tiếng Việt?
5. Nhạc AI từ Suno đã hết bị kiện chưa?

::: details 👉 Gợi ý đáp án
1. Style, Lyrics, Title.
2. 4-7 mô tả (1-2 genre + 2-3 nhạc cụ + 1-2 mood).
3. Báo model dùng lại cùng giai điệu hook → điệp khúc nhất quán.
4. Yếu thanh điệu/dấu tiếng Việt, lai âm Anh → dùng Vbee/Viettel.
5. Chưa — Warner/UMG-Udio đã settle nhưng UMG & Sony vẫn kiện Suno.
:::

---

## 📸 Ví dụ minh họa (có nguồn)

> Nhạc AI & giọng nói thật — link tới bản gốc (mô tả thành tựu, **không chép lời bài hát**):
- **Suno** — feed nhạc AI trending: [suno.com/explore/feed/trending](https://suno.com/explore/feed/trending) · *Nguồn: Suno*
- **Udio** — discover: [udio.com](https://www.udio.com/) · *Nguồn: Udio*
- **Xania Monet** — nghệ sĩ R&B giọng AI (lời do người viết; ký deal ~$3M với Hallwood): [Spotify](https://open.spotify.com/artist/0YIEJNJUCsjzeWwj8Xh2LD) · [Billboard](https://www.billboard.com/pro/ai-music-artist-xania-monet-multimillion-dollar-record-deal/) · *Nguồn: Spotify / Billboard*
- **Breaking Rust** — bài AI từng #1 Billboard Country Digital Song Sales (lưu ý: bảng chỉ tính tải trả phí — xem phân tích của TIME): [Spotify](https://open.spotify.com/artist/3h9rLaviiFj1TeEhdIRpP5) · *Nguồn: Spotify*
- 🇻🇳 **Vbee** — demo TTS tiếng Việt: [vbee.vn](https://vbee.vn/) · *Nguồn: Vbee*
- 🇻🇳 **Viettel AI** — demo chuyển giọng nói: [viettelai.vn](https://viettelai.vn/en/chuyen-giong-noi) · *Nguồn: Viettel AI*

---

## 11 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Suno: **Style field 4-7 mô tả + section tags**; xuất **stems** để mix.
- Voice cloning: **chỉ giọng có đồng ý**; luật siết mạnh.
- **TTS tiếng Việt: Vbee/Viettel/FPT/Zalo**, không ElevenLabs.
- Nhạc AI: phân phối qua **DistroKid/LANDR**; bản quyền chỉ tính khi ở gói trả phí.
:::

Bạn đã tạo được ảnh/video/nhạc/giọng. Nhưng tạo *một cái* khác với giữ *cùng một nhân vật/style qua hàng chục cái*. Phần C — kỹ năng cốt lõi: consistency.

→ [**Chương 5 — Consistency nhân vật & style**](./5-consistency-nhan-vat.md)

---

<ChapterVideos :videos="[
  { id: '72R1NjNaUnE', title: 'Suno Ai Tutorial 2026 (For Complete Beginners)', channel: 'ChillPanic', why: 'Suno từ zero, bản 2026.' },
  { id: 'Vs6vJwmJL0Y', title: 'How to make AI Voiceovers that sound Human (2025 ElevenLabs Text to Speech Tutorial)', channel: 'ElevenLabs', why: 'Kênh chính thức — voiceover/TTS chuẩn.' },
  { id: 'HlkoEt9BleU', title: 'Suno Studio Tutorial for Beginners and Pros: Suno AI Music Production in 15 Mins', channel: 'Moe Lueker', why: 'Suno Studio sâu hơn prompt cơ bản.' }
]" />
