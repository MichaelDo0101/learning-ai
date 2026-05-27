# Model Fine-tuning & Deployment

::: tip Mở đầu
**LLM mạnh, nhưng không hiểu business bạn.** GPT-4 viết thơ, viết code, nhưng không biết thuật ngữ sản phẩm cty bạn, không biết quy chuẩn nghiệp ngành bạn. **Fine-tuning** = quá trình cho LLM general "học" kiến thức chuyên môn của bạn — như đào tạo onboarding cho 1 generalist uyên bác để thành chuyên gia domain.
:::

**Bạn sẽ học**:
- **Quy trình**: full pipeline từ data prep đến model serving
- **Data engineering**: yêu cầu format + chất lượng data
- **Efficient fine-tuning**: LoRA và parameter-efficient
- **Model compression**: quantization để LLM chạy hardware consumer
- **Deployment**: serving architecture mainstream + selection strategy

| Chương | Nội dung |
|-----|------|
| **1** | Fine-tuning pipeline |
| **2** | Training data |
| **3** | LoRA |
| **4** | Quantization |
| **5** | Deployment |

---

## 0. Toàn cảnh: sao cần fine-tune?

Training LLM chia 2 stage: **pretraining** + **fine-tuning**. Pretraining = học ngôn ngữ trên data tổng quát khổng lồ. Fine-tuning = học task chuyên môn trên data đặc thù.

Ẩn dụ: pretraining như đại học — học general, biết mọi thứ 1 chút. Fine-tuning = onboarding cho job — học skill chuyên cho vị trí.

::: tip Khi nào cần fine-tune?
- **Output format cố định**: cần model luôn output JSON cố định
- **Domain knowledge**: y tế, pháp luật, tài chính
- **Style transfer**: model trả lời với tone/style nhất định (vd customer service)
- **Niche language**: tăng performance ngôn ngữ ít resource
- **Cost optimization**: small model fine-tune thay LLM lớn → giảm cost
:::

---

## 1. Fine-tuning pipeline

Fine-tuning không phải "quăng data vào model là xong". Là quy trình engineering chặt, mỗi mắt xích ảnh hưởng kết quả.

<FinetuningPipelineDemo />

::: tip 5 stage
1. **Data prep**: collect, clean, label — mất time nhất + critical nhất
2. **Model selection**: chọn base model (Llama 3, Qwen, Mistral)
3. **Training config**: set learning rate, batch size, epoch
4. **Train execution**: run GPU, monitor loss + metric
5. **Eval + deploy**: test, deploy API
:::

| Stage | Action | Pit |
|------|---------|---------|
| Data prep | Clean, dedup, format | Data tệ → model "học hư" |
| Model select | Eval base capability | Quá lớn không train được, quá nhỏ kết quả tệ |
| Training config | Tune hyperparam | LR quá cao → catastrophic forgetting |
| Train execution | Monitor loss | Overfit, không converge |
| Eval + deploy | A/B test, gradual rollout | Test set leak → eval ảo cao |

---

## 2. Training data: trần của fine-tuning

Câu cũ: **"Garbage in, garbage out"**. Data quality quyết trần hiệu quả. 100 sample chất lượng cao thường hơn 10000 sample tệ.

<TrainingDataDemo />

::: tip 3 format thường gặp
1. **Instruction format**: hay dùng nhất, instruction + input + output. Hợp train follow instruction.
2. **Chat format**: multi-turn, system/user/assistant message list. Hợp chatbot.
3. **Completion format**: prompt-completion pair đơn giản, hợp text gen, code completion.
:::

| Dimension | Note | Check |
|------------|------|---------|
| Accuracy | Answer phải đúng | Human review, expert verify |
| Consistency | Style trả lời câu hỏi giống nhau | Sample compare |
| Diversity | Cover đủ scenario + variant | Stats question type distribution |
| Dedup | Tránh sample lặp gây overfit | Text dedup, semantic dedup |
| Volume | 500~5000 sample chất lượng cao đủ | Bắt đầu ít, tăng dần |

---

## 3. LoRA: 1% param đạt 90% kết quả

**Full fine-tuning** update mọi param model — model 70B = vài trăm GB VRAM + lượng GPU lớn. Đa số team không khả thi.

**LoRA (Low-Rank Adaptation)** giải elegantly: **freeze param model gốc, chỉ train nhóm matrix low-rank mới**. Param matrix này thường chỉ 0.1%~1% model gốc, nhưng đạt gần full fine-tuning.

<LoRADemo />

::: tip Core LoRA
Matrix W của model gốc lớn (vd 4096×4096). LoRA không sửa W trực tiếp, mà thêm "bypass": W' = W + BA, B + A là 2 matrix nhỏ (vd 4096×8 + 8×4096). Train chỉ update B + A, W gốc giữ nguyên.
- **Rank**: r lớn = expressiveness cao, param nhiều hơn. Thường r=8~64 đủ.
- **Merge deploy**: train xong, có thể merge BA về W, inference không thêm overhead.
:::

| Cách | Trainable param | VRAM | Train speed | Hiệu quả |
|---------|-----------|---------|---------|------|
| Full fine-tune | 100% | Cực cao | Chậm | Tốt nhất |
| LoRA | 0.1%~1% | Thấp | Nhanh | Gần full |
| QLoRA | 0.1%~1% | Thấp hơn | Trung | Hơi thấp LoRA |
| Prompt Tuning | <0.01% | Cực thấp | Rất nhanh | Có hạn |

---

## 4. Quantization: "giảm cân" LLM

Model 70B với FP32 = 280GB VRAM — không có GPU top không chạy được. **Quantization** giảm precision số để compress model, cho LLM chạy hardware consumer.

<ModelQuantizationDemo />

::: tip Core trade-off
Bản chất quantization = **đánh đổi precision lấy space**. FP32 → FP16 gần không mất, INT8 mất ít, INT4 mất rõ nhưng chấp nhận được. Tìm balance theo scenario.
- **FP16 (half precision)**: size giảm 1/2, gần không mất, default cho train + inference
- **INT8**: giảm tiếp 1/2, mất rất ít, hợp đa số inference
- **INT4**: chỉ 1/8 FP32, mất 1 phần, hợp resource hạn chế
:::

| Precision | Byte/param | Size model 70B | Quality loss | Use |
|------|-----------|-------------|---------|---------|
| FP32 | 4 | ~280 GB | Không | Training baseline |
| FP16 | 2 | ~140 GB | Gần không | Train + inference chuẩn |
| INT8 | 1 | ~70 GB | Rất ít | Production inference |
| INT4 | 0.5 | ~35 GB | Chấp nhận | Edge, local deploy |

---

## 5. Model deployment: từ lab → production

Model trained + compressed xong, deploy thành service callable. Không chỉ "chạy model", còn concurrency, load balance, cost control.

<ModelServingDemo />

::: tip 3 deployment mainstream
1. **API vendor**: dùng API OpenAI, Anthropic trực tiếp. Zero-ops, pay per token, hợp validate nhanh + dùng vừa-nhỏ.
2. **Self-hosted inference**: vLLM, TGI deploy GPU server riêng. Cost control được, data không ra khỏi, hợp privacy hoặc scale lớn.
3. **Serverless inference**: AWS SageMaker, Replicate, pay-per-request, auto scale. Hợp traffic fluctuate.
:::

| Cách | Cost | Latency | Ops complexity | Use |
|---------|---------|------|-----------|---------|
| API vendor | Pay per token | Trung | 0 | Prototype, mid-scale |
| vLLM self | GPU rent | Thấp | Cao | Scale lớn, privacy |
| Serverless | Pay per request | Cold start cao | Thấp | Traffic fluctuate |
| Edge | One-time hardware | Cực thấp | Trung | Offline, IoT |

---

## Tổng kết

Fine-tuning + deployment = mắt xích biến LLM general → specialist. Từ data prep tới serving, mỗi bước cần tư duy engineering.

Key:
1. **Fine-tuning = onboarding training**: LLM general học knowledge + behavior pattern domain
2. **Data quality quyết trần**: 100 sample tốt > 10000 sample tệ
3. **LoRA = king efficiency**: dưới 1% param đạt gần full
4. **Quantization = vũ khí deploy**: INT4 cho model 70B chạy single GPU
5. **Deploy linh hoạt**: validate dùng API, scale lớn self-host, fluctuate Serverless

::: tip 2026 cho VN dev
- **Unsloth**: 2x speedup LoRA, easier learning curve
- **MLX (Apple Silicon)**: train + inference trên Mac M-series rất nhanh
- **Llama Factory**: GUI fine-tune trong vài click
- **Modal**: serverless GPU dễ cho team không có infra
- **Together.ai / Fireworks**: managed fine-tuning Vietnamese-friendly pricing
- **VN data**: fine-tune Vistral, PhoGPT trên dataset VN
- **Bài tập VN**: fine-tune Qwen2.5-7B trên 1000 cặp Q-A nội bộ → CS agent
:::

## Tài liệu

- [Hugging Face PEFT](https://huggingface.co/docs/peft)
- [vLLM docs](https://docs.vllm.ai/)
- [Unsloth](https://github.com/unslothai/unsloth)
- [GGUF format](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md)
- [OpenAI Fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
