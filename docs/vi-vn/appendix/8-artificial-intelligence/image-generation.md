# Nguyên lý Image Generation

> 💡 **Hướng dẫn**: Chương này khám phá cơ chế work của generative visual large model. Đi từ bài toán "đốt GPU" trong high-dim pixel space, giải mã VAE, Diffusion Model, Cross-Attention. Interactive component giúp bạn — dù không có background AI — vẫn hiểu nhanh tech tiên tiến này!

<ImageGenQuickStartDemo />

## 0. Mở đầu: thách thức "curse of dimensionality"

Khi ngạc nhiên với tuyệt phẩm của Midjourney hoặc Stable Diffusion, hiểu áp lực số máy phải chịu.

1 ảnh HD chuẩn $1024 \times 1024$ pixel, RGB 3-channel, cần ~**3 triệu+ float**.

**Curse of Dimensionality**: nếu để neural net trực tiếp ước estimate joint probability distribution trên Euclidean Space khổng lồ đó cho mỗi pixel, computational cost cực huỷ diệt + image dễ bị méo locally + semantic torn.

Vì vậy, algorithm hiện đại tìm bến đỗ giảm chiều: **"Đừng cố tính trên canvas pixel hỗn loạn, đi vào feature space cô đặc cao mà điêu khắc chính xác."**

---

## 1. Nền giảm chiều: Latent Space + magic compression VAE

Vì 1 bức tranh có nhiều phần thừa liên tục (vd vùng trời xanh đồng đều), ta có thể "đóng gói" feature. Cần **Variational Autoencoder (VAE)**.

VAE đơn nhiệm vụ:
- **Compress (Encoder)**: nén pixel space hàng triệu, extract feature + color structure → grid nhỏ. Grid mật độ cao này = **Latent Space**.
- **Decode (Decoder)**: net generation tính trên latent grid. Sau khi feature low-dim ghép xong, VAE "nở" lại như mì ăn liền hút nước → pixel HD người thấy được.

👇 **Click thử**: kéo điểm đỏ trên space plane, cảm nhận chỉ 2 dim toạ độ thay đổi cực nhỏ → decode thành feature khác hoàn toàn!

<LatentSpaceViz />

---

## 2. Core evolution: Diffusion Model bóc lớp sương mù

Canvas latent space sẵn, model làm sao gen feature đúng kỳ vọng?

Architecture thống trị hiện tại — **Denoising Diffusion Probabilistic Model (DDPM)** — dùng ý tưởng "điêu khắc ngược" tuyệt vời.

Như Michelangelo nói: "Tượng vốn ở trong đá, tôi chỉ bỏ phần thừa." Diffusion học 2 cực:

1. **Add noise (Forward Process)**: định nghĩa toán = Markov chain destruction (SDE). Training, theo noise schedule thêm gaussian noise đều vào ảnh tốt → cuối ảnh sụp thành isotropic gaussian noise tinh khiết. **(Model nhớ kỹ trajectory destruction)**.
2. **Denoise (Reverse Process)**: inference, cho AI 1 đống white noise. U-Net hoặc DiT (Diffusion Transformer) bắt đầu work. Mỗi time step nhỏ predict: "Trong đống loạn này, phần nào là noise cần loại (Score function)?" + trừ đi.

Qua hàng nghìn lần lặp annealing + bóc, từ mosaic vô tự gen được feature ảnh tinh tế.

<DiffusionProcessDemo />

---

## 3. Multimodal alignment: hiểu lời người (Cross-Attention)

AI biết vẽ, nhưng nếu không control sẽ ra random. Muốn theo Prompt ("Cyberpunk cat") chính xác, cần cross-modal translation + spotlight.

- **Translator (CLIP)**: contrastive language-image network. Biến mỗi mô tả Anh thành vector hàng trăm dim resonate với ảnh.
- **Execute (Cross-Attention)**: thần bút trong model. Mỗi denoise step, image latent là Query, đi với CLIP text Key/Value.

Khi đến vẽ contour, vector "mèo" được attention amplify hình học, focus vào grid vùng sẽ thành body. **Lúc này, ngôn ngữ bạn = đèn pin, chiếu sáng chỗ AI cần focus!**

<PromptVisualizer />

---

## 4. Inference revolution: Flow Matching cao tốc

Diffusion traditional lý thuyết đẹp, nhưng **chạy chậm**. Vì dựa random inference, như mò trong mê cung khúc khuỷu (stochastic differential), gen 1 ảnh thường cần ~50 steps.

Để revolution performance, model top mới (SD3, Flux) introduce nền mới: **Flow Matching (Continuous Normalizing Flows)**.

Với analytic geometry + Optimal Transport (OT) logic tối giản, model không random mò vòng. **Algorithm bị strapped vào 1 quỹ đạo ODE (ordinary differential equation) gần thẳng từ noise → data!**

Không vòng nữa! Model Flow Matching chỉ cần "low-dim" số steps cực thấp (chỉ 4-8 step) để render kết quả đẹp!

<FlowMatchingDemo />

---

## 5. Architecture summary

Khi nhấn `<Enter>` trong AI app gen ảnh, vài giây trong GPU:

1. **Language translator (CLIP / Text Encoder)**: vector hoá ý đồ người → anchor instruction
2. **Core engine (DiT + Flow Matching/Diffusion)**: trên latent grid abstract, qua Cross-Attention interference, high-concurrency loại noise gaussian
3. **Compress map magnifier (VAE)**: gatekeeper cuối, decompress feature matrix nhỏ → màn hình HD

---

## 6. Glossary

| Term | Full | Nghĩa |
| :--- | :--- | :--- |
| **Latent Space** | — | Math space giảm chiều mạnh; bản "draft cô đặc" chỉ AI artist hiểu |
| **VAE** | Variational Autoencoder | Size converter cực ngầu. Compress tỷ pixel, decompress final art lên |
| **Diffusion** | Diffusion Probabilistic Model | Algorithm mainstream extract feature + reverse predict. Loại dần noise isotropic → image emerge |
| **CLIP** | Contrastive Language-Image Pre-Training | Train trên tỷ ảnh + caption, link text với color/object |
| **Cross-Attention** | — | Cơ chế trộn feature trong model; ép image grid lúc compute phải check external language instruction |
| **Flow Matching** | — | Continuous mapping cao cấp build trên random mò, giải eq buộc 1 đường thẳng ổn → cắt rendering time hàng trăm lần |

::: tip 2026 cho VN dev
- **Top model 2026**: Flux 1.1 Pro (Black Forest Labs), Stable Diffusion 3.5, Google Imagen 3, Midjourney v7
- **Open source**: Flux dev (chạy được local), SDXL Turbo (4 step)
- **API**: Replicate (host nhiều open model), Fal.ai (fast inference)
- **Edit ảnh AI**: Adobe Firefly, FLUX Fill, ComfyUI workflow
- **Video gen**: Runway Gen-4, Pika 2.0, Sora, Veo 3
- **VN dev**: thử ComfyUI local cho project nội bộ, không upload sensitive content lên cloud
:::
