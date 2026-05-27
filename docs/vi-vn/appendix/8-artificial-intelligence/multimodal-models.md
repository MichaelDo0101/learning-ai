# Multimodal Models (Visual / Audio / Video)

> 💡 **Hướng dẫn**: Chương này không cần background computer vision, qua demo interactive hiểu AI có "đôi mắt" thế nào. Vén bí mật nguyên lý core đằng sau GPT-4V, Qwen-VL.

<VlmQuickStartDemo />

## 0. Mở đầu: cấp mắt cho não

Trong [LLM Intro](./llm-principles.md), ta biết LLM bản chất là "não" trong hộp đen, chỉ hiểu thế giới qua **chữ**.

**Multimodal Large Model (VLM)** = lắp **đôi mắt** cho não đó.

Nhưng không dễ. Vì:
- **Não (LLM)** chỉ biết **text** (Token ID)
- **Mắt (camera)** thấy **pixel** (RGB)

Nhiệm vụ core VLM: **dịch "pixel signal" thành "text signal"**, để LLM thấy xem ảnh như đọc bài.

---

## 1. Step 1: Biến ảnh thành "từ" (Visual Tokenization)

Tưởng tả 1 bức xếp hình qua điện thoại cho bạn. Không thể nói 1 hơi, phải từng mảnh.
Máy xem ảnh cũng vậy.

### 1.1 Patchify — chế "visual word"

LLM xử text → chia câu thành Token. Muốn LLM "đọc" ảnh, cách trực quan: biến ảnh thành Token-like.

Phù hợp với "đọc từng từ" của LLM, cần convert 2D image liên tục thành discrete piece — **Patchify**: cắt ảnh 2D như cắt đậu phụ thành ô grid cố định (gọi Patch).

- **Ảnh gốc** = 1 bài viết hoàn chỉnh
- **Patch** = 1 từ (Token) trong bài

Thực hành: thường cắt theo size cố định ($16 \times 16$ hoặc $14 \times 14$ pixel). Vd ảnh $224 \times 224$ → $14 \times 14 = 196$ block.

> 🕹️ **Demo**: click button, xem ảnh gốc bị cắt thành grid Patch.

<PatchifyDemo />

### 1.2 Flatten — xếp thành câu

Sau cắt, ta có $14 \times 14$ ma trận 2D. Transformer/LLM chỉ accept **1D sequence**.

Phải **Flatten + Linear Projection**:
1. **Flatten**: nối các hàng → 1D long axis
2. **Projection**: 196 patch giờ chỉ là pixel RGB "thô". Dùng small NN (thường FC layer) xử mỗi patch → compress thành vector feature length cố định (vd 768).

Sau bước này, ảnh thành 1 chuỗi "visual word sequence" (Visual Token Sequence).

> 🕹️ **Demo**: xem 1 patch pixel đơn được biến thành vector high-dim qua matrix transform.

<LinearProjectionDemo />

---

## 2. Step 2: Cross-species translation (Projection)

Giờ ảnh thành "visual word" 1D, nhưng đối với LLM cuối, vẫn là đống loạn không đọc được.

Vì **feature space khác** (ngôn ngữ khác). Visual encoder (ViT) extract **spatial pixel feature** (chỉ biết "đây là vật từ đường cong đen"); LLM hiểu **deep semantic** ("mèo", "cây", "nguy hiểm").

Giữa 2 ngôn ngữ này, cần cầu — **Projector (adapter)**.

### 2.1 Vai trò translator (Latent Space Alignment)

Projector bản chất = **Latent Space Alignment**. Như interpreter:

- **Input**: visual feature từ ViT (geometry, color, texture pattern)
- **Process**: Projector dùng NN structure (linear layer hoặc attention) tìm math correspondence giữa 2 ngôn ngữ
- **Output**: "LLM language" — text embedding token tương đương với image feature

Qua filter dịch này, LLM thấy: "Ơ? Chuỗi số gửi vào chẳng phải là combo word descriptive tôi đọc à!" → xử image feature + natural language cùng nhau.

<ProjectorDemo />

### 2.2 Trường phái translation

Để alignment nhanh + chuẩn, có vài design hardware tiêu biểu:

1. **Direct translate (Linear Projection)**:
   - **Cách**: cực đơn giản, vài layer MLP / linear projection
   - **Đặc điểm**: **Info loss thấp, giữ nguyên detail ảnh**; nhưng nhét hết visual token (hàng trăm) cho LLM → compute bùng nổ
   - **Đại diện**: LLaVA series

2. **Liberal translate (Q-Former / Resampler)**:
   - **Cách**: không truyền nguyên, mà ở giữa có "small scout network" có khả năng abstract. Agent này hiểu ảnh nhanh, distill ra vài chục key point cô đặc cao
   - **Đặc điểm**: **Info distill cô đặc, Token ít, tiết kiệm compute LLM**; nhưng có thể bỏ chi tiết viền rất nhỏ
   - **Đại diện**: BLIP-2, Gemini (1 phần)

3. **Compromise (C-Abstractor / Pooling)**:
   - **Cách**: pooling convolutional, gộp block $2 \times 2$ thành 1 expression
   - **Đặc điểm**: vừa compress token length, vừa giữ local + spatial cảm
   - **Đại diện**: Qwen-VL-Max

---

## 3. Step 3: Lắp ráp (Architecture)

Có linh kiện + chuẩn ghép, xem nó complete full armor thế nào. Mainstream VLM theo **3-stage architecture**.

### 3.1 Cấu trúc body VLM

<ModelArchitectureComparisonDemo />

1 VLM điển hình gồm 3 phần phối hợp:

1. **"Mắt" feature perception (Vision Encoder)**:
   - **Function**: cổng đầu vào ảnh, abstract high-dim visual feature
   - **Selection**: đa số vendor không train từ zero, dùng component đã pre-train trên hàng tỷ "image-text pair" (vd CLIP của OpenAI, hoặc Google SigLIP)
   - *Ẩn dụ: vùng tế bào cảm quang retina của sinh vật*

2. **"Thị thần kinh" signal transform (Projector)**:
   - **Function**: dock encoder + LLM base, compress dim signal + translate cross-modal
   - **Selection**: **trọng tâm** của training multimodal sau. Param thường nhỏ (so với LLM), nhưng quyết "text" và "image" có hiểu nhau không
   - *Ẩn dụ: thị thần kinh truyền signal điện tới vỏ não thị giác*

3. **"Não" cognitive engine (LLM Backbone)**:
   - **Function**: observation cuối, gọi common sense, deep reasoning, gen response như người
   - **Selection**: thường dùng open-source LLM IQ cao nhất (Qwen, Llama 3, Vicuna)
   - *Ẩn dụ: trung tâm decision có world KB*

---

## 4. Nó học xem ảnh thế nào? (Training)

OK, body đã ghép. Nhưng trước khi tiếp khách, VLM mới ghép ở trạng thái "mù + loạn" — vì thị thần kinh (Projector) mới là white paper, full random.

Để monster này biết xem ảnh nói, có **"Two-Stage Training"** hiệu quả.

### Stage 1: Nhận diện (Feature Alignment)

Mục tiêu: Projector random build cross-modal mapping ban đầu. Như dạy trẻ con "flashcard" nhớ từ.

- **Cho xem (input)**: hàng tỷ ảnh + caption đơn giản (vd ảnh nền trắng "mèo")
- **Bảo nó (output)**: label ngắn ("1 con mèo cam")
- **Goal optimize**: ép Projector học matrix transform để feature mèo align với vector "mèo"
- **Param freeze**: để không phá model gốc, **freeze** "mắt" (ViT) + "não" (LLM) hàng tỷ param, **chỉ open Projector** vài triệu param train

<FeatureAlignmentDemo />

### Stage 2: Đối thoại (Visual Instruction Tuning)

Stage 1 chỉ làm AI thành "máy đọc tên". Stage 2: kích hoạt IQ cao, theo context giải instruction multimodal phức tạp.

- **Cho xem (input)**: high-quality Q-A pair. Vd ảnh giao thông phức tạp
- **Yêu cầu (output)**: User hỏi "`<image>` đàn ông đạp xe trắng góc dưới trái có đội mũ không?" Assistant: "Không, đầu không có gì, trong thành phố rất nguy hiểm"
- **Goal**: model nhận visual clue + tích luỹ văn minh + reasoning multimodal
- **Param freeze**: tiếp tục freeze 1 phần ViT low-level weight, **mở hoàn toàn LLM + Projector** (hoặc LoRA), train global

<VLMInferenceDemo />

---

## 5. Advanced: Nhìn rõ hơn

Architecture trên đủ cho first-gen VLM, nhưng có nhược điểm cơ bản — **cận thị bẩm sinh**.

ViT sớm vì lịch sử chỉ xử resolution thấp ($224 \times 224$ hoặc $336 \times 336$). Như xem qua camera vintage độ phân giải thấp, biển hiệu nhỏ thành mosaic pixel, não cũng "khôn cũng không thể không gạo".

Để vượt low-res, frontier (Qwen-VL, LLaVA-NeXT) dùng engineering tricks:

### 5.1 Dynamic High-Resolution Mapping

Input ảnh lớn → VRAM nổ; thô bạo shrink → mất detail. Solution: **"local close-up + global bird-eye" dual view**.

1. **Overview**: shrink ảnh HD gốc xuống $336 \times 336$, gửi mắt nhìn 1 lần. Để model nắm **layout vĩ mô** (trời đâu? đất đâu?)
2. **Slice zoom**: cắt ảnh HD thành mấy chục slice $336 \times 336$ độc lập
3. **Inspect + reassemble**: visual engine scan từng slice thu detail HD. Projector lắp như xếp hình các block detail vào context overview

Như chụp 1 ảnh toàn cảnh tờ báo (layout) + zoom chụp từng paragraph.

### 5.2 Thay mắt to bẩm sinh (Scaling Vision Encoder)

Cách brutality khác: nếu mắt gốc gene khiếm khuyết, refine lại 1 super eye.

**InternVL** (open Trung Quốc) là đại diện: bỏ ViT small, train từ đáy 1 super giant visual encoder vài tỷ param (vd 6B InternViT-6B). Native support HD seamless. Design này giảm chi phí engineering + risk feature misalign, "1 cái nhìn rõ hết".

---

## 6. Tổng kết

VLM không có magic. Chỉ làm 1 việc:

**Dịch "image" — ngoại ngữ này — thành "text" — tiếng mẹ đẻ — rồi feed LLM.**

Hiểu điểm này = hiểu hết VLM.

---

## 7. Glossary

| Tên | Full | Giải thích |
| :------------ | :-------------------- | :--------------------------------------------------------- |
| **VLM** | Vision-Language Model | Multimodal LLM. GPT biết xem ảnh |
| **ViT** | Vision Transformer | Visual model. "Mắt" VLM, biến pixel thành vector |
| **Patch** | - | Image block. Ảnh cắt nhỏ, = "visual word" |
| **Projector** | - | Projector/translator. Cầu nối mắt + não |
| **Alignment** | - | Align. Cho image + text feature trong cùng space "hiểu nhau" |

::: tip 2026 cho VN dev
- **Top VLM 2026**: GPT-4o, Claude 3.7 Sonnet, Gemini 2.5 Pro (multimodal native)
- **Open VLM**: Qwen2.5-VL, Llama 3.2 Vision, InternVL2, Pixtral
- **Video understanding**: Gemini 2.5 (1h video), Qwen2.5-VL 1-hour video
- **Use case VN**:
  - OCR hoá đơn (vs Google Vision API)
  - Verify CMND/CCCD (eKYC)
  - Inspect ảnh sản phẩm e-commerce
  - Smart CS với screenshot
- **Local inference**: Ollama + qwen2.5-vl, ChatGLM4V trên consumer GPU
:::
