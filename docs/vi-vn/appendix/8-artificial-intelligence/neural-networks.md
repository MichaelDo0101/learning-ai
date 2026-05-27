# Neural Network và Deep Learning

::: tip Mở đầu
**Neural network là engine của AI revolution.** Từ language understanding của ChatGPT đến image recognition của autonomous driving, đều là neural network. Không phải ma thuật, mà framework toán học tinh xảo — "học" mapping input→output từ lượng lớn data. Hiểu nguyên lý cơ bản giúp bạn dùng và debug AI tool tốt hơn.
:::

**Bạn sẽ học**:
- **Khái niệm core**: neuron, layer, forward propagation, backpropagation
- **Loại network**: CNN, RNN, Transformer
- **Process training**: model "học" từ data thế nào
- **Tip key**: overfitting, learning rate, regularization
- **Lịch sử evolution**: từ perceptron đến LLM

| Chương | Nội dung |
|-----|------|
| **1** | Từ neuron tới network |
| **2** | Network học thế nào |
| **3** | Architecture chính |
| **4** | Nghệ thuật training |
| **5** | Lịch sử và frontier |

---

## 1. Từ neuron tới network

### Single neuron

Unit nhỏ nhất = **neuron**. Mô phỏng neuron sinh học: nhận nhiều input, weighted sum, qua activation function → output.

```
input x1 ──→ ×w1 ──┐
input x2 ──→ ×w2 ──┼──→ Σ(weighted sum) + b(bias) ──→ f(activation) ──→ output
input x3 ──→ ×w3 ──┘
```

Math: **y = f(w₁x₁ + w₂x₂ + w₃x₃ + b)**

<NeuronDemo />

### Activation function: sao cần non-linear?

Nếu không có activation, dù stack nhiều layer cũng tương đương 1 linear transformation (matrix multiply). Activation đưa **non-linearity** vào → network học được pattern phức tạp.

| Activation | Formula | Đặc điểm | Scenario |
|---------|------|------|---------|
| ReLU | max(0, x) | Đơn giản hiệu quả, train nhanh | Default hidden layer |
| Sigmoid | 1/(1+e⁻ˣ) | Output 0~1 | Binary classification output |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | Output -1~1 | RNN |
| Softmax | eˣᵢ/Σeˣⱼ | Probability distribution | Multi-class output |
| GELU | x·Φ(x) | Smooth, dùng trong Transformer | LLM (GPT, BERT) |
| SwiGLU | Swish-gated | Modern, dùng Llama, PaLM | LLM mới |

### Từ neuron tới network

Tổ chức nhiều neuron thành **layer**, stack nhiều layer:

```
Input layer       Hidden 1       Hidden 2       Output layer
(features)       (low-level)     (high-level)   (prediction)

 x1 ──→  [○ ○ ○ ○] ──→ [○ ○ ○] ──→  [○ ○]
 x2 ──→  [○ ○ ○ ○] ──→ [○ ○ ○] ──→  Cat/Dog
 x3 ──→  [○ ○ ○ ○] ──→ [○ ○ ○]
```

| Concept | Mô tả |
|------|------|
| Input layer | Nhận raw data (pixel image, text vector...) |
| Hidden layer | Tầng xử lý giữa, càng nhiều layer càng "deep" |
| Output layer | Sinh prediction cuối |
| Forward propagation | Data flow từ input qua từng layer tới output |

::: tip Sao gọi "deep" learning?
ML truyền thống thường 1-2 layer. Khi hidden layer tăng tới hàng chục/trăm → "deep" learning. Network sâu hơn học feature trừu tượng hơn: layer 1 học edge, layer 2 học texture, layer 3 học part, sâu hơn học "đây là mèo".
:::

---

## 2. Network học thế nào

### 2.1 Loss function

Đo "model dự đoán cách target bao xa".

- **Regression**: MSE (Mean Squared Error) — `(y_pred - y_true)²`
- **Binary classification**: Binary Cross-Entropy
- **Multi-class**: Cross-Entropy
- **Language model**: Negative Log Likelihood

### 2.2 Gradient Descent

Iteratively adjust weight để minimize loss.

```python
weight = weight - learning_rate * gradient
```

- **Learning rate**: bước nhảy mỗi update. Quá lớn → diverge. Quá nhỏ → chậm.
- **Gradient**: derivative của loss theo weight

<GradientDescentDemo />

### 2.3 Backpropagation

Algorithm tính gradient hiệu quả qua chain rule.

```
Output → Loss
   ↓ chain rule
Hidden 2 weights ← gradient
   ↓
Hidden 1 weights ← gradient
   ↓
Input weights ← gradient
```

Tất cả gradient tính 1 lần qua reverse pass. Đây là breakthrough cho phép train deep network.

### 2.4 Optimizer

Variant của gradient descent:

| Optimizer | Đặc điểm |
|---|---|
| **SGD** | Stochastic, cơ bản |
| **Momentum** | Add momentum để vượt local minimum |
| **Adam** | Adaptive learning rate per parameter, popular nhất |
| **AdamW** | Adam với weight decay, default cho LLM |
| **Lion** | New (2023), simpler than Adam, often better |

---

## 3. Architecture chính

### 3.1 CNN (Convolutional Neural Network)

Cho image. Key: **convolution layer** trượt filter trên image, học pattern local (edge, texture, shape).

```
Image → Conv → ReLU → Pool → Conv → ReLU → Pool → FC → Output
```

**Đại diện**: AlexNet (2012), VGG, ResNet, EfficientNet, ConvNeXt.

**Ứng dụng**: image classification, object detection, segmentation, face recognition, medical imaging.

### 3.2 RNN (Recurrent Neural Network)

Cho sequence (text, time series). Maintain hidden state qua time step.

**Variants**: LSTM, GRU — giải vanishing gradient.

**Hạn chế**: sequential (không parallel), long-distance forget.

Đã bị Transformer thay thế phần lớn.

### 3.3 Transformer

Đỉnh cao hiện tại. Dùng **self-attention** thay recurrence.

**Đại diện**:
- **Encoder-only**: BERT, RoBERTa (classification, embedding)
- **Decoder-only**: GPT, Llama, Claude (generation)
- **Encoder-Decoder**: T5, BART (translation)
- **Vision Transformer (ViT)**: image classification
- **Multimodal**: CLIP, Flamingo, Gemini

Chi tiết: xem [Transformer & Attention](./transformer-attention).

### 3.4 GAN (Generative Adversarial Network)

2 network đối kháng:
- **Generator**: tạo fake data trông như thật
- **Discriminator**: phân biệt real vs fake

Cải tiến lẫn nhau → generator gen được data rất realistic.

**Ứng dụng**: image gen (StyleGAN), super-resolution, image-to-image translation.

### 3.5 Diffusion Model

Hot 2022-2025. Train model "khử noise" từ random noise tới image.

**Đại diện**: Stable Diffusion, DALL-E, Midjourney, Flux.

### 3.6 Autoencoder & VAE

Encoder nén input → latent, decoder reconstruct. Dùng cho dimensionality reduction, anomaly detection, generative modeling.

---

## 4. Nghệ thuật training

### 4.1 Overfitting

Model "nhớ" training data nhưng không generalize tới data mới.

**Dấu hiệu**: training accuracy cao, validation accuracy thấp.

**Giải pháp**:
- **More data**: data augmentation, collect more
- **Regularization**: L1, L2, dropout
- **Early stopping**: dừng khi validation loss tăng
- **Smaller model**: giảm parameter

### 4.2 Underfitting

Model quá đơn giản → cả training và validation accuracy thấp.

**Giải pháp**: larger model, more features, train longer.

### 4.3 Hyperparameter

Không học từ data, phải set bằng tay:
- Learning rate
- Batch size
- Số layer, neuron mỗi layer
- Dropout rate
- Optimizer choice

**Tuning**: grid search, random search, Bayesian optimization, hoặc gut feeling + experience.

### 4.4 Regularization

| Method | Mô tả |
|---|---|
| **L2 (weight decay)** | Penalty weight lớn, default cho hầu hết model |
| **L1** | Sparse weight, feature selection |
| **Dropout** | Random "drop" neuron khi train, prevent over-reliance |
| **Batch Normalization** | Normalize activation, train ổn định hơn |
| **Layer Normalization** | Như BatchNorm nhưng cho NLP/Transformer |
| **Data augmentation** | Tạo data biến thể (rotate, flip cho image) |

### 4.5 Transfer Learning

Dùng model pre-trained trên large dataset, fine-tune cho task riêng.

**Lợi ích**: data ít, train nhanh, performance cao.

Đây là pattern dominant 2018+. BERT → fine-tune cho NER, sentiment, etc.

---

## 5. Lịch sử evolution

| Năm | Milestone | Impact |
|---|---|---|
| 1957 | **Perceptron** (Rosenblatt) | Đầu tiên |
| 1986 | **Backpropagation** (Rumelhart) | Train deep network |
| 1989 | **CNN** (LeCun, LeNet) | Image |
| 1997 | **LSTM** (Hochreiter) | Sequence |
| 2006 | **Deep Belief Network** (Hinton) | "Deep learning" buzzword |
| 2012 | **AlexNet** wins ImageNet | DL takes over CV |
| 2014 | **GAN** (Goodfellow) | Generative |
| 2017 | **Transformer** (Vaswani) | Game-changer NLP |
| 2018 | **BERT** (Google) | Transfer learning NLP |
| 2020 | **GPT-3** (OpenAI) | LLM scale |
| 2022 | **ChatGPT** | AI mainstream |
| 2023 | **GPT-4, Claude, Llama 2** | Frontier models |
| 2024 | **Multimodal native, o1 thinking** | Reasoning revolution |
| 2025 | **Sonnet 4, Gemini 2** | Long context + agentic |
| 2026 | **Sonnet 5, Opus 4.7, Gemini Omni** | Cross-modal, autonomous |

---

## 6. Tổng kết

Neural network = **stack of layers**, mỗi layer = matrix multiply + non-linear activation. Train qua **gradient descent + backpropagation**.

- **CNN** cho image
- **RNN/LSTM** cho sequence (legacy)
- **Transformer** cho mọi thứ hiện nay
- **Diffusion** cho image generation

::: tip 2026 Update
- **Hybrid models** (Transformer + Mamba): best of both
- **MoE** scale model hiệu quả
- **Multimodal native** không còn separate vision + text
- **Thinking models** (o1, R1, Claude thinking): test-time compute
- **Foundation models** dominant: train once, fine-tune everywhere
- **VN context**: PyTorch và Transformers library là standard, Hugging Face hub đầy đủ Vietnamese model
:::

## Tài liệu

- [3Blue1Brown Neural Network series (YouTube)](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
- [Andrej Karpathy: Neural Networks Zero to Hero](https://karpathy.ai/zero-to-hero.html)
- [Deep Learning Book (Goodfellow)](https://www.deeplearningbook.org/)
- [Hugging Face course](https://huggingface.co/learn)
- [PyTorch tutorials](https://pytorch.org/tutorials/)
