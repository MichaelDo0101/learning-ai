---
title: 'ElevenLabs — AI giọng nói chân thực nhất, clone & dub đa ngôn ngữ'
description: 'Hướng dẫn thực chiến ElevenLabs cho người Việt: text-to-speech siêu thực, voice cloning (IVC/PVC), dubbing 90+ ngôn ngữ, API Python/cURL thật, giá & gói (hedge), dùng ở VN & tiếng Việt 3 vùng miền, bảo mật, case study Klarna/Revolut — và khi nào KHÔNG nên dùng.'
---

# ElevenLabs — AI giọng nói chân thực nhất, clone & dub đa ngôn ngữ

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎙️</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn làm kênh YouTube review phim (faceless), tối nay phải ra 1 video 8 phút nhưng giọng bạn bị khàn. Mở **ElevenLabs**, dán kịch bản tiếng Anh vào **Text to Speech**, chọn giọng nam trầm, chèn vài thẻ cảm xúc `[excited]` / `[whispers]` → 30 giây có file MP3 giọng đọc như người thật. Cần lồng tiếng cho clip nước ngoài? **Dubbing** dịch + giữ nguyên giọng + khớp khẩu hình qua 90+ ngôn ngữ.
**💸 Lợi ích thực tế:** thay vì thuê voice talent 500k–2 triệu/video, bạn tự sản xuất giọng đọc chất lượng phòng thu với vài đô/tháng — chạy 24/7, ra hàng loạt nội dung.
:::

> **"ElevenLabs là 'cái loa' tốt nhất của ngành AI audio: giọng chân thực, clone trong vài giây, dub cả phim.**
> **Nhưng nó tính tiền theo từng ký tự, tiếng Việt còn lai âm — biết dùng đúng việc là khác biệt giữa 'xưởng nội dung' và 'đốt credit'."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Đăng ký** ElevenLabs và hiểu **gói + giá + free tier** (cùng các điều kiện thương mại / attribution dễ vướng).
- **Tạo giọng đọc** chất lượng cao bằng giao diện web, chèn **audio tag** cảm xúc đúng cách.
- **Clone giọng** (Instant vs Professional) — và biết ranh giới đạo đức/pháp lý phải giữ.
- **Gọi API** bằng Python và cURL thật để nhúng TTS vào sản phẩm của bạn.
- **Chọn đúng công cụ:** khi nào ElevenLabs, khi nào OpenAI TTS / Azure / Murf — và **khi nào KHÔNG** nên dùng.
- **Dùng ở VN**: thanh toán bằng thẻ quốc tế, hỗ trợ tiếng Việt 3 vùng miền tới đâu.
:::

::: warning ⏱️ Lưu ý "hạn dùng" của thông tin
Đây là hiểu biết tới **giữa 2026**. AI audio đổi rất nhanh (tên model, **tên gói & số credit**, tính năng). Riêng phần **GIÁ**, ElevenLabs đã đổi tên gói và số credit nhiều lần trong 2025–2026 nên các nguồn báo khác nhau — số dưới đây là **khung tham khảo**, hãy vào thẳng [elevenlabs.io/pricing](https://elevenlabs.io/pricing) kiểm tra bản mới nhất trước khi rút ví.
:::

::: tip 🔗 Chương này nối với module Generative AI
Phần **lý thuyết tạo giọng** (TTS hoạt động ra sao, audio tag là gì, đạo đức voice cloning) đã được dạy ở [**Chương 4 — Tạo nhạc & giọng nói**](../generative-ai/4-tao-nhac-giong) của module Generative AI. Chương này tập trung vào **ElevenLabs như một CÔNG CỤ**: công ty/nền tảng, ma trận model, so sánh đối thủ, giá–thanh toán–VN, workflow + API thật, case study, bảo mật. Khi gặp khái niệm nền, mình sẽ trỏ ngược về chương 4.
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**ElevenLabs** là công ty/nền tảng **AI audio (giọng nói)**: chuyển văn bản thành giọng nói (text-to-speech), **nhân bản giọng** (voice cloning), **lồng tiếng** video/audio (dubbing), nhận dạng giọng nói (Scribe / speech-to-text), tạo nhạc (Eleven Music) và xây **voice agent hội thoại** (ElevenAgents). Tới giữa 2026, ElevenLabs được xem là **dẫn đầu thị trường về độ chân thực giọng nói**. URL chính thức: **https://elevenlabs.io**.

::: tip 🏢 Đây là công cụ "production-grade", không phải dự án thử nghiệm
Vài mốc thật để bạn yên tâm khi đặt nó vào quy trình nghiêm túc:
- **Series C** (30/01/2025): gọi **180 triệu USD**, định giá **3,3 tỷ USD** (a16z + ICONIQ đồng dẫn) — *TechCrunch*.
- Đóng năm **2025 với hơn 330 triệu USD ARR**; khách gồm Deutsche Telekom, Square, Chính phủ Ukraine, Revolut — blog chính thức.
- **Series D** (04/02/2026): **500 triệu USD, định giá 11 tỷ USD** (Sequoia dẫn, có Nvidia, đang nhắm IPO) — *TechCrunch / CNBC*.

→ Thông điệp: một công cụ được rót vốn và dùng ở quy mô lớn — đáng để học dùng tử tế.
:::

::: tip 🔑 Phân biệt 3 thứ dễ lẫn
- **ElevenLabs** = nền tảng/giao diện web bạn dùng ở elevenlabs.io (cái chương này nói tới).
- **ElevenLabs API** = dịch vụ lập trình tính tiền theo **credit (≈ ký tự)** cho dev — cùng tài khoản nhưng dùng qua code.
- **Model** (Eleven v3, Multilingual v2, Flash v2.5…) = "động cơ" bên dưới; bạn **chọn model** cho mỗi lần tạo giọng. Đừng nhầm tên model với tên gói cước.
:::

**Những việc ElevenLabs làm tốt (theo research):**

| Nhóm | Làm được gì |
|---|---|
| **Text-to-Speech** | Giọng đọc siêu thực từ văn bản; thư viện giọng rất lớn (các nguồn bên thứ ba nói "~1.200+ giọng" — *con số chưa chính thức*) + Voice Library cộng đồng. |
| **Eleven v3** (biểu cảm nhất) | Hỗ trợ **audio tag** inline như `[excited]`, `[whispers]`, `[sighs]`, `[laughing]` để điều khiển cảm xúc; **Text to Dialogue** ghép nhiều giọng thành hội thoại liền mạch; mở rộng lên **70+ ngôn ngữ**. |
| **Voice Cloning** | **Instant (IVC):** ~1–5 phút audio, clone trong vài giây. **Professional (PVC):** tối thiểu ~30 phút (tối ưu ~3 giờ) → bản sao gần như không phân biệt được. |
| **Dubbing** | Dịch + lồng tiếng video/audio qua **90+ ngôn ngữ**, giữ cảm xúc/timing/đặc trưng giọng gốc; pipeline tự động dịch → clone → dub → sync. "Bản địa hoá" chứ không dịch word-for-word. |
| **Scribe (Speech-to-Text)** | 90+ ngôn ngữ, timestamp theo từ, **phân tách người nói (diarization) tới 32 người**; bản Realtime ~150ms cho live. |
| **Eleven Music** | Tạo nhạc "studio-grade" (nhạc game, nền podcast, marketing). |
| **ElevenAgents** | Voice agent hội thoại qua điện thoại (Twilio), WhatsApp, web chat từ một "brain"; có turn-taking model riêng + gọi tool (vd hoàn tiền, tra đơn). |
| **API** | REST API + SDK Python/JS chính thức, hỗ trợ streaming. |

::: tip 📌 Cùng đọc với chương 4
Phần *audio tag* và *voice cloning là gì* đã được giải thích ở [Chương 4 module Generative AI](../generative-ai/4-tao-nhac-giong#_05-giong-noi-elevenlabs-dao-duc). Ở đây bạn chỉ cần nhớ: **v3 = biểu cảm cao + đa giọng**, **Flash v2.5 = nhanh/real-time (~75ms)**, **Multilingual v2 = chất lượng ổn định**.
:::

### So với công cụ khác — "khi nào chọn cái nào"

Không có công cụ thắng mọi mặt. ElevenLabs mạnh ở **chất lượng giọng + clone + dubbing + agent**. Nhưng tuỳ việc, đối thủ có thể hợp hơn. Bảng dưới khách quan tới giữa 2026:

| Tiêu chí | ElevenLabs | OpenAI TTS | PlayHT | Murf | Google / Azure TTS |
|---|---|---|---|---|---|
| **Độ chân thực** | Dẫn đầu, biểu cảm cao | Tốt, đơn giản | Tốt (mạnh hội thoại) | "Sạch", hơi quá hoàn hảo | Ổn định, "doanh nghiệp" |
| **Voice cloning** | Có (IVC + PVC) | **Không** | Có | Hạn chế | Custom Voice (cần training) |
| **Số giọng dựng sẵn** | Rất nhiều (~1.200+ *theo nguồn so sánh*) | **Chỉ ~6 giọng** *(theo nguồn so sánh)* | Nhiều | Theo use-case | Nhiều, đa accent |
| **Latency real-time** | Flash v2.5 ~75ms | Trung bình | Tối ưu hội thoại | Không phải thế mạnh | Tốt |
| **Audio tag cảm xúc** | Có (v3) | Không | Hạn chế | Hạn chế | Hạn chế (SSML) |
| **Tiếng Việt** | Có (Bắc/Trung/Nam) | Có (đa ngữ) | — | Hạn chế | Có (giọng VN ổn) |
| **Hợp nhất với** | Creator / podcast / audiobook / agent | Team đã dùng GPT/Whisper | Podcast, CSKH | Team marketing/video | Doanh nghiệp cần governance |

::: warning 🔥 Tin nóng phải biết: PlayHT đã đóng cửa
**PlayHT** — đối thủ TTS quen thuộc — **đã bị Meta mua (12/07/2025)** và **API PlayHT đóng cửa 31/12/2025**. Nếu bạn (hoặc tool bạn theo dõi) còn xài PlayHT, hãy lên kế hoạch chuyển; ElevenLabs là một trong những điểm đến chính của làn sóng người dùng PlayHT.
:::

::: tip 💡 Tóm tắt nhanh
- Cần **giọng chân thực nhất + clone + dub** → **ElevenLabs**.
- Đã sống trong **hệ sinh thái OpenAI** và chỉ cần TTS đơn giản → **OpenAI TTS** (nhưng không có clone, ít giọng).
- Doanh nghiệp lớn cần **governance / brand-consistency / SLA hạ tầng cloud** → **Azure / Google TTS**.
- Team marketing cần **workflow cộng tác + tích hợp video** → **Murf**.
- ⚠️ Riêng **tiếng Việt thuần** (audiobook/faceless cần đúng dấu) → ElevenLabs hay lai âm, cân nhắc **Vbee/Viettel** (xem mục 04 + [Chương 4](../generative-ai/4-tao-nhac-giong#_06-tts-tieng-viet-dung-tool-rieng)).
:::

### ⛔ Khi nào KHÔNG nên dùng ElevenLabs

::: warning ⛔ 7 trường hợp nên tránh hoặc dùng rất thận trọng
- **Ngân sách = 0 nhưng cần thương mại:** gói Free **không cho kiếm tiền** và **bắt buộc ghi nguồn** → phải lên trả phí; nếu chỉ cần TTS cơ bản miễn phí, cân nhắc giải pháp khác.
- **Đã ở sâu trong hệ sinh thái OpenAI** và chỉ cần TTS đơn giản → **OpenAI TTS** tiện hơn (dù không clone, ít giọng).
- **Doanh nghiệp cần governance / brand-consistency tối đa, SLA hạ tầng cloud** → **Azure / Google TTS** (hoặc WellSaid) kiểm soát tốt hơn.
- **Team marketing cần cộng tác + tích hợp video** → **Murf** mạnh hơn về collaboration.
- **Khối lượng cực lớn, nhạy giá theo ký tự:** chi phí credit đội nhanh — phải tính kỹ; volume khổng lồ thì các API rẻ hơn (hạ tầng cloud, Deepgram…) đáng so sánh.
- **Output dài liền mạch** (audiobook nhiều giờ) → vướng giới hạn ký tự/đoạn, phải chia nhỏ + ghép, kém tiện.
- **Clone giọng người thật không xin phép** → **tuyệt đối không** (deepfake giọng — vi phạm đạo đức/pháp luật, xem [Chương 4](../generative-ai/4-tao-nhac-giong#_05-giong-noi-elevenlabs-dao-duc)).
:::

---

## 02 · Đăng ký & truy cập — bối cảnh VN

### Dùng được ở Việt Nam không? — **Có.**

ElevenLabs vào được từ VN **không cần VPN**, có giao diện và **giọng tiếng Việt chính thức** ([elevenlabs.io/text-to-speech/vietnamese](https://elevenlabs.io/text-to-speech/vietnamese)). Tiếng Việt được hỗ trợ từ ~2024 (đợt mở rộng từ 29 → 32 ngôn ngữ, thêm Vietnamese/Hungarian/Norwegian); cả **Flash v2.5** và **Turbo v2.5** đều chạy tiếng Việt. Speech-to-Text nhận diện **3 accent: Bắc (Hà Nội/chuẩn), Trung (Huế), Nam (TP.HCM)**.

Cộng đồng VN dùng nhiều cho **YouTube faceless** (review phim, tin tức, thuyết minh), **podcast, sách nói, video đào tạo/marketing** — thay cho chi phí thuê voice talent *(nguồn VN: deaitinh.com, mindx.edu.vn, dienmayxanh.com, 1office.vn)*.

### Đăng ký 30 giây

```text
1. Mở https://elevenlabs.io → đăng ký bằng email hoặc đăng nhập nhanh qua Google.
2. Vào ngay giao diện web (không cần cài app) → chọn Text to Speech là dùng được.
3. Nếu định gọi API: vào dashboard → tạo "API key", lưu lại để dùng trong code.
```

### Các gói & giá — ⚠️ HEDGE MẠNH

::: warning ⚠️ Đọc trước khi tin con số
Các nguồn báo **giá / số credit khác nhau rõ rệt** vì ElevenLabs đổi giá, đổi credit và đổi tên gói nhiều lần 2025–2026. Bảng dưới là **khung tham khảo "tới giữa 2026"** để bạn hình dung *thứ tự* các gói và *cơ chế credit*, **không** phải báo giá chính xác. **Luôn mở [elevenlabs.io/pricing](https://elevenlabs.io/pricing) (và [pricing/api](https://elevenlabs.io/pricing/api)) để xem số live trước khi mua.**
:::

| Gói | Giá/tháng (USD, ~) | Credit/tháng (~) | TTS (~phút) | Điểm chính |
|---|---|---|---|---|
| **Free** | $0 | 10.000 | ~10 phút | TTS/STT/sound FX/music; **không** voice clone, **không** thương mại, **bắt buộc ghi nguồn** |
| **Starter** | ~$5–6 | 30.000 | ~30 phút | **Bắt đầu dùng thương mại**, Instant Voice Cloning, Dubbing Studio |
| **Creator** | ~$11–22 | ~100.000–121.000 | ~100–121 phút | **Professional Voice Cloning**, audio 192 kbps |
| **Pro** | ~$99 | ~500.000–600.000 | ~500–600 phút | Audio 44.1 kHz PCM qua API |
| **Scale** | ~$299–330 | ~1,8M–2M | ~1.800–2.000 phút | Nhiều seat, low-latency |
| **Business** | ~$990–1.320 | ~6M–11M | ~6.000+ phút | TTS low-latency rẻ tới ~5¢/phút, nhiều PVC + seat |
| **Enterprise** | Thoả thuận | Thoả thuận | — | SSO, SLA, DPA, BAA (HIPAA), chọn vùng dữ liệu |

::: tip 🔢 Cơ chế credit (hiểu cái này để khỏi cháy túi)
- **1 ký tự = 1 credit** với model chất lượng cao (Multilingual v2 / v3).
- Model **Flash / Turbo v2.5 rẻ hơn — ~0.5 credit/ký tự** (giảm tới ~50% giá qua API). Việc real-time/khối lượng lớn nên ưu tiên Flash.
- Credit dư **rollover tối đa ~2 tháng** nếu bạn còn gói trả phí.
- Mẹo: ước lượng nhanh — một video 8 phút lời ≈ 8.000–10.000 ký tự ≈ 8.000–10.000 credit (v3) hoặc ~một nửa (Flash).
:::

### Free tier — điều kiện dễ vướng nhất

::: warning 🚧 Free dùng được, nhưng đọc kỹ 3 ràng buộc
- **10.000 credit/tháng** (~10 phút TTS).
- **KHÔNG có giấy phép thương mại** — không được kiếm tiền từ output tạo ở Free.
- **Bắt buộc ghi nguồn (attribution):** nếu publish nội dung tạo ở gói Free (hoặc khi không đăng nhập), phải gắn **"elevenlabs.io"** (hoặc "11.ai") **vào tiêu đề**.
→ Muốn **bỏ attribution + được thương mại** thì tối thiểu lên gói **Starter**.
:::

### Thanh toán ở VN

- Chấp nhận **Credit Card, Apple Pay, Google Pay** (UPI chỉ dành cho Ấn Độ).
- **Với thẻ VN:** thẻ phải bật **thanh toán quốc tế** (Visa/Mastercard quốc tế). **Thẻ nội địa thường bị từ chối.** Nếu lỗi thanh toán, dùng thẻ quốc tế hoặc **thẻ ảo** (Help Center có bài *"Why is my payment failing?"*).

::: tip 📌 Lưu ý độ tin: phần VN cụ thể nguồn mỏng
ElevenLabs không có tài liệu chính thức riêng cho thanh toán ở VN. Các chỉ dẫn trên là **hướng dẫn chung + kinh nghiệm cộng đồng** — nếu thẻ bị từ chối, thử thẻ khác/thẻ ảo hoặc liên hệ Help Center.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có prompt/code thật)

Quy trình "đi từ đầu đến xong việc". Mỗi bước có cách **tự kiểm** (verify).

### A. Tạo giọng đọc trên web (không cần code)

**Bước 1 — Đăng nhập & mở Text to Speech.**
Vào [elevenlabs.io](https://elevenlabs.io) → đăng nhập → chọn **Text to Speech**.
→ **Verify:** vào được màn hình có ô dán văn bản + danh sách giọng.

**Bước 2 — Chọn model phù hợp việc.**
- **v3** → biểu cảm / nhiều giọng (kịch, hội thoại).
- **Flash v2.5** → nhanh / real-time (~75ms), rẻ credit hơn.
- **Multilingual v2** → chất lượng ổn định cho narration.
→ **Verify:** tên model hiển thị đúng ở khu chọn model.

**Bước 3 — Chọn giọng** (giọng dựng sẵn, giọng trong Voice Library, hoặc giọng bạn đã clone).

**Bước 4 — Dán văn bản. Với v3, chèn audio tag thật vào kịch bản:**

```text
[excited] Xin chào cả nhà! [whispers] Hôm nay mình có một bí mật nho nhỏ...
[laughs] Đùa thôi, vào nội dung chính luôn nhé.
```

**Bước 5 — Tinh chỉnh thanh trượt:**
- **Stability** thấp → biểu cảm/đa dạng; cao → đọc đều, ổn định cho narration dài.
- **Similarity / Clarity** → độ bám giọng gốc.
→ **Verify:** nghe thử thấy đúng cảm xúc & giọng mong muốn.

**Bước 6 — Generate → nghe → Download** (MP3; chất lượng cao hơn ở gói trả phí: 192 kbps / 44.1 kHz).
→ **Verify:** file tải về phát đúng nội dung, không nuốt chữ/đổi tông giữa câu.

### B. Voice cloning

- **Instant (IVC):** upload **~1–5 phút audio sạch** → clone trong vài giây. Hợp để thử nhanh.
- **Professional (PVC):** upload **≥30 phút** (tối ưu ~3 giờ), yêu cầu audio **≥192 kbps, mỗi file ≥60 giây liên tục, không nhạc nền, không nhiều người nói chồng, không pitch-correction** → bản sao chất lượng cao.

::: warning ⚖️ Chỉ clone giọng bạn sở hữu hoặc có đồng ý bằng văn bản
ElevenLabs chặn clone giọng người nổi tiếng/chính trị gia và khoá tài khoản vi phạm. Chi tiết đạo đức/luật (ELVIS Act, Nghị định VN…) ở [Chương 4 module Generative AI](../generative-ai/4-tao-nhac-giong#_05-giong-noi-elevenlabs-dao-duc).
:::

### C. Gọi API — code THẬT (xác minh từ docs/SDK chính thức)

API key tạo trong dashboard, lưu ở biến môi trường `ELEVENLABS_API_KEY` (đừng hard-code vào file đẩy lên GitHub).

**Python (SDK chính thức `elevenlabs`):**

```python
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play

elevenlabs = ElevenLabs()  # tự đọc key từ biến môi trường ELEVENLABS_API_KEY
audio = elevenlabs.text_to_speech.convert(
    text="The first move is what sets everything in motion.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_v3",
    output_format="mp3_44100_128",
)
play(audio)
```

**cURL (REST API):**

```bash
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Welcome to ElevenLabs. This is your first generated voice.", "model_id": "eleven_flash_v2_5", "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}}' \
  --output speech.mp3
```

::: tip 🔑 Vài thứ phải nhớ khi gọi API
- Endpoint: `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`.
- Header xác thực là **`xi-api-key`** (không phải `Authorization: Bearer`).
- Model ID thật: `eleven_v3`, `eleven_multilingual_v2`, `eleven_flash_v2_5`.
- `voice_id` **không đổi** sau khi tạo → **cache lại** thay vì gọi list mỗi lần.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 🟢 Mẹo ăn tiền

::: tip 6 mẹo dùng ElevenLabs như dân chuyên
1. **Chọn model theo việc, không theo "xịn nhất":** narration dài → Multilingual v2; cảm xúc/hội thoại → v3; real-time/khối lượng lớn → **Flash v2.5** (rẻ ~½ credit).
2. **Cắt văn bản dài thành đoạn ~5 phút** rồi ghép — vừa né giới hạn ký tự, vừa tránh giọng "trôi" giữa chừng.
3. **Stability cao cho narration, thấp cho diễn cảm** — đừng để mặc định cho mọi loại nội dung.
4. **Clone bằng audio sạch:** ≥192 kbps, ≥60s liên tục, **không nhạc nền** (nhạc nền làm giảm ~30% độ rõ phoneme), không nhiều người nói chồng.
5. **Quản lý credit:** ưu tiên Flash cho draft, để v3 cho bản final; nhớ credit **rollover ~2 tháng**.
6. **Dọn voice không dùng:** mỗi tier có giới hạn ~50–100 voice — xoá bớt để khỏi chạm trần, và **cache `voice_id`**.
:::

### 🔴 Lỗi & cạm bẫy

::: warning 🚨 Chất lượng & sản phẩm
- **Giọng đổi tông bất ngờ hoặc nghe "robot" giữa câu** — đặc biệt với văn bản dài hoặc ngôn ngữ ít phổ biến (than phiền phổ biến trên Reddit).
- **Giới hạn độ dài:** ~5.000 ký tự cho v3 (~5 phút), ~10.000 cho Multilingual v2 (~10 phút) → podcast dài phải chia nhỏ.
- **Học hơi dốc / giao diện đôi lúc rối** với người mới.
- **Agent chỉ chạy theo kịch bản/text bạn cấp** — không tự kết nối knowledge base nếu chưa cấu hình.
:::

::: warning 💳 Thanh toán & đăng ký
- **Tự động gia hạn** và **khó huỷ** — nhiều phàn nàn (Trustpilot). Hãy chủ động huỷ trước chu kỳ nếu không dùng tiếp.
- **Thanh toán fail với thẻ nội địa** → dùng thẻ quốc tế / thẻ ảo (xem mục 02).
:::

::: warning 🛠️ Lỗi API/dev hay gặp
- **HTTP 429** — `rate_limit_exceeded` / `concurrent_limit_exceeded` (vượt giới hạn tier hoặc số request đồng thời): xử lý bằng **exponential backoff + xếp hàng request**, hoặc nâng tier.
- `system_busy` (nghẽn tạm thời) → **retry có backoff**.
- **Voice clone kém** nếu audio dưới 128 kbps, có nhạc nền, hoặc nhiều người nói chồng.
:::

::: warning 🔒 Bảo mật & quyền riêng tư — đọc kỹ nếu dùng cho doanh nghiệp
Đây là điểm mạnh đáng nhấn của ElevenLabs (theo tài liệu hãng tới giữa 2026):

**(a) Chứng chỉ:** SOC 2 Type II, ISO 27001, PCI DSS Level 1; **ISO 27701** (quản lý thông tin riêng tư) & **ISO 42001** (quản lý hệ thống AI); có attestation HIPAA & GDPR.

**(b) GDPR:** có **DPA công khai** (SCCs, subprocessor, audit, hỗ trợ DPIA); tuân thủ **EU-US Data Privacy Framework** (+ UK Extension, Swiss-US).

**(c) Dữ liệu giọng nói:** ElevenLabs nói **không dùng voice data/personal data để profiling/targeting**; **không giữ dữ liệu giọng của bạn quá ~3 năm** sau lần tương tác cuối (trừ khi luật yêu cầu). **Mặc định không train trên dữ liệu khách Enterprise.**

**(d) Zero Retention Mode:** không lưu nội dung nhạy cảm trên server; mã hoá khi truyền.

**(e) Data residency:** Enterprise được chọn vùng host; gói non-Enterprise có thể xử lý ở US/EU/Singapore.

**(f) Việt Nam:** dán dữ liệu cá nhân khách hàng (họ tên, SĐT, hồ sơ) lên dịch vụ ngoài có thể vướng **Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân** — cân nhắc trước khi đưa dữ liệu thật.

Trust Center: **compliance.elevenlabs.io**.
:::

::: details ❓ FAQ & lỗi hay gặp (bấm để mở)
**"Giá / số credit trong bảng khác với trang web?"**
Đúng — ElevenLabs đổi giá & credit nhiều lần. **Tin trang [elevenlabs.io/pricing](https://elevenlabs.io/pricing) hơn mọi bảng tổng hợp** (gồm bảng trong chương này).

**"Tạo ở gói Free rồi đăng YouTube được không?"**
Được về kỹ thuật, nhưng **không có giấy phép thương mại** và **bắt buộc ghi "elevenlabs.io" vào tiêu đề**. Muốn kiếm tiền/bỏ attribution → tối thiểu **Starter**.

**"Thanh toán thẻ VN bị từ chối?"**
Bật **thanh toán quốc tế** cho thẻ Visa/Mastercard, hoặc dùng **thẻ ảo**. Thẻ nội địa thường không qua.

**"Giọng đọc bị 'trôi'/đổi tông giữa video dài?"**
Chia văn bản thành đoạn ~5 phút, tăng **Stability**, và ưu tiên Multilingual v2 cho narration.

**"API trả HTTP 429?"**
Bạn vượt rate limit hoặc số request đồng thời của tier. Thêm **exponential backoff + queue**, hoặc nâng tier.

**"Tiếng Việt đọc sai dấu/lai âm Anh?"**
Đây là hạn chế thật của ElevenLabs với tiếng Việt. Với nội dung tiếng Việt thuần (audiobook/faceless), cân nhắc **Vbee/Viettel/FPT/Zalo** — xem [Chương 4](../generative-ai/4-tao-nhac-giong#_06-tts-tieng-viet-dung-tool-rieng).
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm thật 2–3 bài dưới đây để biến "đọc hiểu" thành "làm được". Mỗi bài có tiêu chí hoàn thành rõ ràng.

### 🧪 Bài 1 — Giọng đọc có cảm xúc bằng audio tag (cơ bản)

**Mục tiêu:** cảm nhận sức mạnh của audio tag trong v3.

1. Mở **Text to Speech**, chọn model **v3**, chọn một giọng bất kỳ.
2. Tạo 2 bản từ cùng nội dung: bản 1 không có tag; bản 2 chèn tag:

```text
[whispers] Bạn có nghe thấy không... [pause] [excited] Nó hoạt động rồi! [laughs]
```

3. Nghe đối chiếu 2 bản, chỉnh **Stability** thấp dần để thấy khác biệt.

**✅ Đạt khi:** bạn nghe rõ bản 2 có cảm xúc theo tag, và ghi lại 1 câu: tag + stability ảnh hưởng thế nào.

### 🧪 Bài 2 — Gọi TTS qua API (cho người biết chút code)

**Mục tiêu:** nhúng ElevenLabs vào quy trình tự động.

1. Tạo **API key** trong dashboard, đặt vào biến môi trường `ELEVENLABS_API_KEY`.
2. Chạy đoạn cURL ở mục 03.C để xuất `speech.mp3`:

```bash
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Day la giong noi dau tien toi tao bang API.", "model_id": "eleven_flash_v2_5"}' \
  --output speech.mp3
```

3. Mở `speech.mp3` nghe thử; đổi `model_id` sang `eleven_multilingual_v2` để so chất lượng.

**✅ Đạt khi:** có file MP3 phát đúng nội dung, và bạn thấy khác biệt giữa Flash (nhanh/rẻ) và Multilingual v2 (mượt hơn).

### 🧪 Bài 3 — So sánh tiếng Việt: ElevenLabs vs tool VN

**Mục tiêu:** tự kiểm định "khi nào KHÔNG dùng ElevenLabs cho tiếng Việt".

1. Lấy 3 câu tiếng Việt có dấu khó + 1 tên tiếng Anh + 1 con số, ví dụ:

```text
Hôm nay ngày 19 tháng 6, anh Nguyễn ghé cửa hàng ElevenLabs mua một chiếc loa.
```

2. Tạo giọng bằng **ElevenLabs (giọng tiếng Việt)** và bằng **Vbee/Viettel** (xem [Chương 4](../generative-ai/4-tao-nhac-giong#_06-tts-tieng-viet-dung-tool-rieng)).
3. Đối chiếu: chỗ nào ElevenLabs sai dấu/lai âm, chỗ nào tool VN đọc tự nhiên hơn.

**✅ Đạt khi:** bạn kết luận được — với nội dung tiếng Việt thuần này, nên chọn tool nào và vì sao.

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom ví dụ **có thật** từ trang khách hàng chính thức của ElevenLabs + blog/cộng đồng VN, tới giữa 2026.

::: warning ⚠️ Đọc kỹ về độ tin của nguồn
Các con số kiểu *"nhanh gấp 10 lần"*, *"+35% conversion"* là **do ElevenLabs công bố trên trang khách hàng của họ** (marketing-sourced) — đọc với thái độ cân nhắc, mình ghi rõ "theo ElevenLabs". Use-case VN lấy từ blog/cộng đồng (tự báo cáo).
:::

### 💳 CS1 — Klarna: CSKH tài chính nhanh gấp 10 lần (theo ElevenLabs)
- **Bối cảnh:** Klarna (fintech) dùng **ElevenAgents** cho chăm sóc khách hàng tài chính.
- **Kết quả (theo ElevenLabs):** "giải quyết nhanh **gấp 10 lần**" cho **35 triệu** khách hàng Mỹ.
- **Bài học:** voice agent hợp với CSKH khối lượng lớn, lặp lại — nhưng con số là vendor claim.

### 🏦 CS2 — Revolut: giảm ~8 lần thời gian xử lý ticket (theo ElevenLabs)
- **Bối cảnh:** Revolut (ngân hàng số) triển khai agent hội thoại **đa ngôn ngữ**.
- **Kết quả (theo ElevenLabs):** thời gian xử lý ticket giảm **~8 lần**.
- **Bài học:** điểm mạnh đa ngôn ngữ giúp ngân hàng số phục vụ nhiều thị trường bằng một "brain".

### 🛵 CS3 — Deliveroo: voice agent gọi ra tiếp cận ~75% tài xế (theo ElevenLabs)
- **Bối cảnh:** Deliveroo (giao đồ ăn) dùng voice agent **gọi ra (outbound)**.
- **Kết quả (theo ElevenLabs):** tiếp cận **~75% tài xế & đối tác**.
- **Bài học:** outbound voice tự động giúp vận hành đội ngũ lớn mà không cần tổng đài người.

### 🚗 CS4 — Cars24 & TVS Motor: tăng conversion/lead (theo ElevenLabs)
- **Cars24** (e-commerce ô tô): **+~35% conversion** và **+~20% CSAT** (theo ElevenLabs).
- **TVS Motor** (sản xuất/retail): multimodal agent, **+~35% lead capture** (theo ElevenLabs).
- **Bài học:** voice agent không chỉ "trả lời" mà còn đẩy chỉ số kinh doanh — nếu cấu hình đúng.

### 📞 CS5 — Deutsche Telekom: hỗ trợ + dịch real-time vào hệ thống cuộc gọi
- **Bối cảnh:** Deutsche Telekom (viễn thông) tích hợp AI hỗ trợ + **dịch real-time** vào tổng đài.
- **Bài học:** ở quy mô viễn thông, giá trị nằm ở dịch real-time và hỗ trợ tổng đài viên — không thay thế hẳn người.

### 📚 CS6 — Xuất bản & giải trí: HarperCollins, Bertelsmann…
- **HarperCollins** dùng ElevenLabs cho **sản xuất sách nói**; **Bertelsmann** mở rộng kể chuyện đa ngôn ngữ. Khách khác được nêu: **Epic Games, Cisco, Chess.com, Perplexity**.
- **Bài học:** audiobook/đa ngôn ngữ là điểm ngọt cho ngành xuất bản — nhưng nhớ giới hạn ký tự (chia nhỏ + ghép).

### 🇻🇳 CS7 — Use-case Việt Nam (từ blog/cộng đồng)
- **YouTube faceless** (review phim, tin tức, thuyết minh), **podcast, sách nói, video đào tạo/marketing** — thay cho chi phí thuê voice talent.
- **Caveat:** với **tiếng Việt thuần**, nhiều creator vẫn dùng **Vbee/Viettel** vì ElevenLabs hay lai âm/sai dấu; ElevenLabs hợp hơn cho **nội dung tiếng Anh** hoặc song ngữ.

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 5 điều mang theo
1. **ElevenLabs = AI giọng nói chân thực nhất** (TTS + clone + dubbing + agent), "production-grade".
2. **Chọn model theo việc:** v3 (cảm xúc/đa giọng), Flash v2.5 (nhanh/rẻ), Multilingual v2 (narration ổn định).
3. **Free tier có bẫy:** không thương mại + bắt buộc ghi nguồn → cần thương mại thì tối thiểu **Starter**.
4. **Giá hay đổi** — luôn kiểm tra [elevenlabs.io/pricing](https://elevenlabs.io/pricing); **credit ≈ ký tự**, Flash rẻ ~½.
5. **Tiếng Việt thuần thì cân nhắc tool VN**; clone giọng người thật **phải có đồng ý**.
:::

### Link chính thức từ ElevenLabs (nên bookmark)

Đây là các trang **chính chủ** để tự kiểm tra thông tin mới nhất — luôn tin các link này hơn bài tổng hợp bên thứ ba:

- **Vào dùng:** https://elevenlabs.io
- **Bảng giá & gói:** https://elevenlabs.io/pricing (API pricing: https://elevenlabs.io/pricing/api)
- **TTS tiếng Việt:** https://elevenlabs.io/text-to-speech/vietnamese
- **Tài liệu API / quickstart:** https://elevenlabs.io/docs/eleven-api/quickstart (tổng quan model: https://elevenlabs.io/docs/overview/models)
- **SDK Python chính thức:** https://github.com/elevenlabs/elevenlabs-python
- **Dubbing Studio:** https://elevenlabs.io/dubbing-studio
- **Customer stories:** https://elevenlabs.io/customer-stories
- **Trust Center (bảo mật):** https://compliance.elevenlabs.io (Privacy Policy: https://elevenlabs.io/privacy-policy)

::: details 🔎 Ghi chú độ tin & nguồn bổ sung (research tới giữa 2026)
- **Giá & số credit:** nguồn mâu thuẫn nhau (ElevenLabs đổi tên gói/credit nhiều lần) → đã hedge; **bắt buộc check trang pricing live**.
- **"~1.200+ giọng" / "~6 giọng OpenAI":** từ blog so sánh bên thứ ba, **không** phải số chính thức ElevenLabs.
- **Số liệu case study** (10x, +35%, ~8x…): do ElevenLabs công bố trên trang khách hàng của họ — **marketing-sourced**.
- **Thanh toán thẻ VN:** không có tài liệu chính thức riêng cho VN → hướng dẫn chung + kinh nghiệm cộng đồng.
- **Mốc GA của Eleven v3:** blog gốc công bố 05/06/2025 (giai đoạn đầu), một số nguồn nói GA ~đầu 2026 → diễn đạt thận trọng.
- Tin tài chính: Series C (3,3 tỷ USD, 01/2025) & Series D (11 tỷ USD, 02/2026) — *TechCrunch / CNBC*; PlayHT bị Meta mua (07/2025), API đóng 31/12/2025.

*Số liệu (giá, model, tính năng) có thể đã thay đổi — luôn kiểm tra lại tại elevenlabs.io.*
:::
