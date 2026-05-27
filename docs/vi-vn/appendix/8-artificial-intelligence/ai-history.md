---
title: 'Lược sử AI: từ symbolic logic tới LLM trăm tỉ parameter'
description: '70 năm AI: 3 làn sóng, 2 mùa đông, cuối cùng hợp nhất thành thời đại LLM.'
---

# Lược sử AI: từ symbolic logic tới LLM trăm tỉ parameter

70 năm AI development, qua **3 làn sóng, 2 mùa đông**. Từ symbolism (logic reasoning), tới connectionism (neural network), tới behaviorism (reinforcement learning), cuối hợp nhất thành thời đại LLM. Hiểu lịch sử AI giúp ta thấy rõ bản chất "intelligence" của LLM hôm nay.

<AiEvolutionDemo />
<DiscriminativeVsGenerativeDemo />

---

## 1. Theoretical foundation + symbolism (1940s-1950s)

Trước khi máy tính phổ biến, các pioneer đã nghĩ "máy có thể nghĩ như người?". Research giai đoạn này tập trung mô hình toán neuron, lý thuyết tính toán, auto reasoning. **Conference Dartmouth 1956** chính thức tuyên bố "Artificial Intelligence" thành discipline độc lập.

<FoundationDemo />

### 1.1 Milestone

- **MP Neuron Model (1943)**: Warren McCulloch + Walter Pitts dùng math abstract neuron sinh học. Chứng minh "neural network tính được". Ông tổ của mọi deep network hôm nay.
- **Turing Test (1950)**: Alan Turing publish "Computing Machinery and Intelligence". Bỏ qua tranh luận triết "intelligence là gì", đưa standard operational: nếu máy trong hội thoại làm người không phân biệt được người vs máy → có intelligence.
- **Establishment (1956)**: workshop Dartmouth, John McCarthy + Marvin Minsky. McCarthy first time dùng term "Artificial Intelligence". Năm 1956 = AI Year One.

::: tip Symbolism rise
Early AI: **symbolism dominant**. Vì máy tính chạy bằng logic circuit, scholars nghĩ tự nhiên: **bản chất intelligence là symbol manipulation**.

Chỉ cần biến knowledge thành symbol máy hiểu (concept, rule), rồi dùng logic engine (IF-THEN rule) xử symbol → máy nghĩ như người. **Top-down**, depend heavy vào expert input.
:::

---

## 2. Golden age symbolism + AI Wave 1 (1960s-1970s)

10+ năm đầu, AI vào golden age lạc quan mù. Researcher tin: máy đã chứng minh được math theorem, viết program giải mọi vấn đề chỉ là sớm muộn.

### 2.1 Glory days của Expert System

Đỉnh cao symbolism = **Expert System**. Input "experience rule" của top expert từng lĩnh vực vào máy → system thực hiện diagnosis cấp cao ở vertical specific.

| Expert System | Năm | Ý nghĩa lịch sử |
|---|---|---|
| **Dendral** | 1965 | **Expert system đầu tiên**, infer cấu trúc phân tử từ mass spectrometry data, ngang chemist người |
| **MYCIN** | 1977 | Diagnose blood infection + antibiotic recommend, accuracy 69%, hơn nhiều bác sĩ non-specialist |
| **XCON** | 1980 | Commercial expert system thành công nhất, help DEC auto-config computer theo customer needs, save $40M/năm |

Nhưng đằng sau có vực thẳm không vượt được.

### 2.2 AI Winter 1 (1974-1980)

Phát hiện "biến kiến thức người thành rule" càng đi càng hẹp. 3 giới hạn tử mạng:

**Knowledge acquisition bottleneck**: có knowledge người cũng không nói rõ được (nhận diện mèo thế nào?). Polanyi's paradox. Expert system chỉ hard-code rule rõ.

**Combinatorial explosion + brittleness**: real-world quá nhiều case, khó enumerate. Thiếu common sense, lệch chút khỏi rule là crash.

**Compute không đủ + funding cut**: hardware không support reasoning exploding. DARPA cắt funding.

---

## 3. Expert system + AI Wave 2 (1980s)

80s, micro PC + LISP machine phổ biến → expert system lại được commercial chú ý. Japan launch "5th Generation Computer Project" tham vọng → cả thế giới fomo invest.

### 3.1 Business boom + bust

Mọi multinational dev expert system riêng. Nhưng maintain torture: rule base vượt vài chục nghìn → sửa 1 rule mới conflict 10 rule cũ. Cuối 80s, PC explode → expert AI machine đắt + closed không cạnh tranh.

::: warning ❄️ AI Winter 2 (1987-1993)
1987 AI hardware market crash. "5th Generation" fail vì xa rời hardware reality. Investment expert system hoá tro. "AI" trong academic thành derogatory term "scam funding".
:::

### 3.2 Connectionism ẩn mình

Trong 2 đợt up-down, còn 1 tư duy khác — **Connectionism** = neural network hôm nay.

<PerceptronDemo />

Rosenblatt đưa **Perceptron** 1958. Simulate brain qua adjust weight giữa neuron. Không dạy máy rule rõ, mà cho xem nhiều example, máy tự generalize.

Nhưng 1969 Minsky paper "Perceptrons" math chứng minh giới hạn single-layer (không giải XOR). Connectionism ngồi ghế lạnh cả golden age symbolism. Tới 90s mới sống lại.

---

## 4. Machine Learning + Connectionism revival (1990s-2000s)

90s, AI có pragmatic turn. Bỏ "magical human-like intelligence", focus dùng **rigorous statistical methods** giải classification + prediction real-world. **Machine Learning** rise.

### 4.1 Từ rule dead tới "tìm math boundary"

1997, IBM **Deep Blue** thắng cờ vua champion Kasparov — symbolism glory. Nhưng academic nhận ra: chỉ là win "raw compute + hardcode", Deep Blue không thực sự hiểu cờ.

Same time, **SVM (Support Vector Machine)**, decision tree, random forest dominant 10+ năm.

Expert system trước: dạy máy "email có 'trúng thưởng' = spam". ML approach: **người set feature** (length email, special word freq, sender trust score...), input 10000 email đã label → SVM math draw "boundary line tối ưu" giữa normal vs spam.

Yếu chết: **Feature Engineering depend nặng vào người**. Recognize cat, scientist phải dạy "extract edge", "find triangle ear" — máy tự không tìm cat được. Model ceiling = human cognition.

### 4.2 Backpropagation cho neural network sống lại

1986 Rumelhart popularize **Backpropagation** → train được multi-layer network. Nhưng compute lúc đó vẫn không support deep.

2006 Hinton paper "Deep Belief Networks" + "Deep Learning" term. Set up cho big bang sau.

---

## 5. Deep Learning Era (2010s)

3 yếu tố hội tụ làm DL explode:
1. **Big Data**: ImageNet, web text khổng lồ
2. **GPU compute**: NVIDIA CUDA make GPU programmable
3. **Algorithm**: backprop, dropout, ReLU, batch norm

### 5.1 ImageNet moment (2012)

**AlexNet** by Hinton's student (Krizhevsky) wins ImageNet 2012 với gap khổng lồ. Game changer: deep CNN > traditional CV.

Vài năm sau:
- 2014: VGG, GoogLeNet, GAN
- 2015: ResNet (152 layers) — match human level ImageNet
- 2016: AlphaGo beat Lee Sedol — RL + deep learning + MCTS

### 5.2 NLP revolution

- 2013: Word2Vec — word embedding semantic
- 2014: Seq2Seq + Attention
- **2017: Transformer** — bigest breakthrough
- 2018: BERT — transfer learning NLP
- 2019: GPT-2 — scary scary text gen

---

## 6. LLM Era (2020-present)

### 6.1 Scaling laws (2020)

OpenAI paper "Scaling Laws for Neural Language Models" → performance scales predictably với compute + data + model size.

Insight: **bigger = better, predictably**. Dẫn tới arms race scale model.

### 6.2 GPT-3 (2020) — emergence

175B parameters. **Emergent abilities**: in-context learning, few-shot, reasoning xuất hiện ở scale này — không có ở model nhỏ.

### 6.3 ChatGPT moment (Nov 2022)

ChatGPT release → AI thành mainstream. 100M user trong 2 tháng — fastest growth ever.

Behind scenes:
- GPT-3.5 + **RLHF** + chat interface
- Make AI "talkable" thay vì "complete-able"

### 6.4 Frontier wars (2023-2026)

| Year | Major releases |
|---|---|
| **2023** | GPT-4, Claude 1/2, Llama, PaLM 2, Bard |
| **2024** | GPT-4o, Claude 3, Gemini, Llama 3, o1 (thinking), Sora |
| **2025** | Claude 4, Gemini 2, GPT-5, Llama 4, DeepSeek R1, Qwen 3 |
| **2026** | Claude Sonnet 5/Opus 4.7, Gemini 2.5/Omni, GPT-5+, Mythos |

### 6.5 Key paradigm shifts 2024-2026

1. **Multimodal native**: vision + text + audio + video unified model (Gemini Omni)
2. **Thinking models**: explicit reasoning step (o1, R1, Claude thinking)
3. **Agentic AI**: autonomous task completion (Claude Computer Use, Devin, Manus)
4. **Long context**: 1M-10M token (Gemini)
5. **MoE dominant**: efficient scaling (Mixtral, DeepSeek V3, GPT-4)
6. **Open source catching up**: Llama 3.3, Qwen 3, DeepSeek competitive với frontier closed

---

## 7. 3 schools of AI

| School | Idea core | Đại diện | Trạng thái 2026 |
|---|---|---|---|
| **Symbolism** | Manipulate symbol theo logic rule | Expert system, Prolog | Hồi sinh trong neuro-symbolic |
| **Connectionism** | Network neuron, learn from data | Neural network, deep learning | **Dominant** |
| **Behaviorism** | Learn from environment qua reward | Reinforcement learning, AlphaGo | Combined với LLM (RLHF, RLAIF) |

2026 trend: **Hybrid** — neural backbone + symbolic reasoning (như o1 với chain-of-thought) + RL alignment.

---

## 8. Việt Nam trong AI history

- 2010s: cộng đồng VN còn nhỏ, mostly translate paper + tutorial
- 2018+: nhiều startup AI VN (FPT, Viettel, VNG, AI4VN, Zalo AI)
- 2020-2022: Zalo AI Challenge phổ biến competitions
- 2023+: VinAI ra PhoBERT, VinAI Translation, NLP-focused
- 2024+: nhiều VN startup AI vào series A/B (Filum, Cinnamon AI, Trusting Social)
- 2025+: VN dev join global teams (xAI, Anthropic, OpenAI có VN engineers)
- 2026: AIECOS, Học AI Full A-Z và nhiều platform educational rise → bridge knowledge gap

---

## 9. Tổng kết

70 năm AI:
1. **1940s-50s**: theoretical foundation
2. **1960s-70s**: symbolism rise + winter 1
3. **1980s**: expert system + winter 2
4. **1990s-2000s**: machine learning + statistical methods
5. **2010s**: deep learning explode (CNN, RNN, GAN)
6. **2017+**: Transformer revolution
7. **2020+**: LLM scaling era
8. **2022+**: ChatGPT, AI mainstream
9. **2024+**: multimodal, thinking, agentic

**Bài học từ history**:
- Hype cycle: mọi tech qua peak → trough → plateau
- AI winter là phase, không phải end
- Breakthrough thường đến từ unexpected combination (data + compute + algorithm)
- "Intelligence" vẫn chưa có định nghĩa rõ — Turing test giờ "qua" mà chưa AGI

::: tip 2026 Frontier
- **AGI (Artificial General Intelligence)**: gần hay xa? Tranh luận heated. Some say 2027-2030, some say 2040+
- **AI Safety**: alignment, interpretability hot research
- **Open vs Closed**: Llama, DeepSeek vs GPT, Claude — geopolitical implication
- **Compute as moat**: chỉ vài lab có thể train frontier model
- **Energy crisis**: AI compute consume nhiều electricity, sustainability concern
:::

## Tài liệu

- [A Brief History of AI - Stanford](https://hai.stanford.edu/news/)
- [The Master Algorithm - Pedro Domingos](https://www.basicbooks.com/titles/pedro-domingos/the-master-algorithm/9780465065707/)
- [Genius Makers - Cade Metz](https://www.penguinrandomhouse.com/books/610890/genius-makers-by-cade-metz/)
- [AI Index Report - Stanford](https://aiindex.stanford.edu/)
- [Anthropic research blog](https://www.anthropic.com/research)
