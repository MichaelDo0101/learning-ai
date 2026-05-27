# Speech Synthesis & Recognition

> 💡 **Hướng dẫn**: Chương này đi sâu nguyên lý AI audio. Không chỉ thuật ngữ acoustic (STFT, flow matching, voice embedding), mà còn ẩn dụ + demo interactive cho bạn hiểu AI "nghe người" + "mở miệng nói" thế nào.

<AudioQuickStartDemo />

## 0. Mở đầu: "dịch số hoá" sóng âm vật lý

Tiếng người + âm thanh thế giới bản chất = **sóng vật lý liên tục** từ dao động không khí. Nhưng máy chỉ có `0` + `1`, không nghe được. Bước đầu cho AI xử âm thanh: vượt rãnh "vật lý" ↔ "digital".

Quá trình = **A/D conversion**, output core = **PCM (Pulse-Code Modulation)** waveform — data âm thanh ta hay thấy. 2 metric core:
1. **Sample rate**: chụp ảnh sóng mấy lần/giây. Vd 16kHz = 16000 số amplitude/giây.
2. **Bit depth**: "thước đo" mỗi lần chụp chi tiết. 16-bit = 65536 level amplitude.

Nhưng vấn đề: 16000 số/giây, 1 câu hàng trăm nghìn số. Quá nhiều + thừa. Quăng waveform 1D dài cho NN xử trực tiếp như **bảo người judge len áo qua từng sợi len** — cực khó.

---

## 1. Feature engineering: lắp "tai người" cho AI

Trực tiếp xem "1D waveform (time-domain)" không work, khoa học gia: **biến 1D âm → 2D frequency spectrum (frequency-domain)**.

### 1.1 Từ đường → ảnh: STFT

Khi nghe nhạc giao hưởng, ít quan tâm dao động không khí instant, mà **lúc đó có nhạc cụ nào (tần số khác), to nhỏ ra sao (năng lượng)**.

Qua phép thuật toán **STFT (Short-Time Fourier Transform)**, sóng âm 1D → matrix 2D "time, frequency, energy (độ đậm màu)" = **Spectrogram**. Vấn đề âm thanh → vấn đề "xem ảnh" AI giỏi hơn.

### 1.2 Theo thói quen tai: Mel Scale

Frequency vật lý là linear (0-100Hz tương đương 10000-10100Hz). Nhưng **tai người rất "bias"**: nhạy với low-freq (sâu), tù với high-freq (cao).

Để AI "tập trung chỗ quan trọng" như người, nhà nghiên cứu introduce **Mel Filterbanks** non-linear. Low-freq chia rất mịn, high-freq gộp lại thô.

Sau log transform → **Mel-Spectrogram** = nền tảng linh hồn AI audio hiện đại.

👇 **Demo**: xem waveform 1D biến thành 2D màu sắc theo cảm nhận người.
<MelSpectrogramDemo />

---

## 2. Cho LLM học "ngoại ngữ": 2 paradigm gen

Sau extract feature, dạy AI gen âm thế nào? Có 2 "magic array".

### 2.1 Paradigm 1: âm thanh như chữ (Audio Tokenization)

Với ChatGPT hot, khoa học gia nghĩ: nếu biến âm thành 1 chuỗi "chữ (Token)" được, LLM có thể hát/nói trực tiếp?

- **Compress + quantize**: dùng **Neural Codec** (vd EnCodec) + VQ-VAE, vài MB audio nén cực đoan → mã rời rạc trong "từ điển" (vd: `[82, 105, 33...]`)
- **Generation as completion**: AI predict next token âm như text completion. Thống nhất multimodal architecture!

<AudioTokenizationDemo />

### 2.2 Paradigm 2: âm thanh như tranh (Spectrogram Generation)

Đây là solution mainstream cho đa số software speech hiện đại, control tốt.

- **Spectrogram generation**: model không output waveform, mà học mapping "text" → "Mel-spectrogram 2D", như hoạ sĩ vẽ acoustic feature
- **Vocoder (waveform reconstruction)**: spectrogram mất phase info nên không play trực tiếp. Cần **Vocoder** (vd HiFi-GAN) — translator biến ảnh thành waveform 1D driving loa

---

## 3. 2 đầu nghịch: ASR + TTS

Cho máy có "tai" + "miệng" = 2 cuộc dịch ngược nhau:

- **ASR (Automatic Speech Recognition)**: âm → text. Bài **multi-to-one converging select**. Model (Whisper) phải lọc text duy nhất đúng trong audio đầy noise môi trường, accent variation, đồng âm.
- **TTS (Text-to-Speech)**: text → âm. Bài **one-to-many diverging creative**. 1 câu "xin chào" có thể có 10000 speed, emotion, pause, voice khác nhau. Model phải tự tưởng param thiếu.

<ASRvsTTSDemo />

---

## 4. Từ "vắt kem đánh răng" → "cao tốc": TTS architecture đổi đời

Hiểu flow basic, xem TTS engine theo đuổi speed + coherence cực đoan thế nào.

- **Autoregressive (AR)**: model cũ phải gen theo time, xong ms trước mới predict ms sau. Stable nhưng **dễ kẹt + chậm**.
- **Non-autoregressive (NAR)**: introduce **Duration Predictor**, không gen tuần tự, mà 1 lần "tiên đoán" duration mỗi phoneme, rồi **parallel output cả câu**.
- **Flow Matching (ODE highway)**: solution frontier (F5-TTS). Dùng continuous normalizing flow + ODE bỏ approach gò. Model học quỹ đạo motion thẳng nhất từ "white noise" → "perfect spectrogram". Hiệu quả tăng exponential, natural sound đỉnh.

<TTSPipelineDemo />

---

## 5. Zero-Shot Voice Cloning

Vài năm trước, AI imitate giọng ai đó cần họ ngồi recording studio im lặng vài chục nghìn câu + train mấy ngày. Hôm nay chỉ **3 giây voice** là AI giả y thật.

Tech core: **Speaker Encoder** + metric learning.
- Không chỉ monitor, là **"gene extractor"**. Bỏ noise + nội dung nói (text), capture feature sinh lý cố định: dây thanh bao rộng? Cộng hưởng cỡ nào? Habit nhả chữ?
- Feature này nén thành **Speaker Embedding** (vd x-vector) vài trăm dim. Như barcode, biểu trưng identity giọng. TTS model "đeo" vector này → mọi câu output đều có giọng bạn.

<VoiceCloningDemo />

---

## 6. Cấp linh hồn: control emotion + rhythm + style

1 câu "thật ư", có thể là vui mừng, có thể là phẫn nộ chất vấn. Commercial-grade AI không chỉ "đọc đúng chữ", mà "có cảm xúc".

Học thuật đề xuất **Global Style Token (GST)** + feature bottleneck. LLM cluster từ recording người diễn lượng lớn, extract soft vector trừu tượng "buồn", "phấn khích", "lười".

Engineering, introduce F0 (pitch up-down), Energy (volume + plosive) adapter param trực quan, cho creator "nặn voice emotion" như chỉnh face game character.

<EmotionControlDemo />

---

## 7. Kết

Từ digital signal cơ bản (PCM), tới giảm chiều purify (Mel-Spectrogram), tới base multimodal hot hiện tại (Flow Matching + Neural Codec), AI audio đang upgrade từ mechanical simulation → native understanding.

AI Agent tương lai sẽ thông toàn link cao chiều "xem-nghe-nói" của người, intuition như thật mỗi lần communicate!

---

## 8. Glossary

| Term | Full | Giải thích |
| :--- | :--- | :--- |
| **PCM** | Pulse-Code Modulation | Cách record waveform 1D nguyên thuỷ + lớn nhất |
| **STFT** | Short-Time Fourier Transform | Biến âm từ amplitude theo time → frequency + energy |
| **Mel-Spectrogram** | — | Feature base AI: spectrogram 2D đã qua log + non-linear theo cảm nhận người |
| **Neural Codec** | — | AI component dùng variational autoencoder residual, compress waveform lớn thành discrete token |
| **Vocoder** | — | "Reverse translator": biến Mel-spectrogram 2D → waveform 1D physical |
| **Speaker Embedding** | — | Math ID high-dim immutable lock voice timbre người cụ thể (vd x-vector) |
| **Flow Matching** | — | Biến normal distribution thành empirical data distribution qua ODE path thẳng, accelerate inference AI |

::: tip 2026 cho VN dev
- **TTS tiếng Việt**: FPT AI, VinBigData, Viettel AI, OpenAI TTS (support multilingual)
- **ASR tiếng Việt**: Whisper-large-v3 (tốt nhất), VoskAI, FPT.AI ASR
- **Voice cloning**: ElevenLabs (commercial), OpenVoice (open-source)
- **Realtime conversation**: OpenAI Realtime API, Gemini Live - WebRTC streaming
- **VN use case**:
  - Call center AI (Vinpearl, Tiki)
  - Voice memo → text (note app)
  - Audiobook gen từ ebook
  - Accessibility (screen reader cho người khiếm thị)
- **Bài tập**: build podcast generator — text → multi-voice script → TTS → audio file
:::
