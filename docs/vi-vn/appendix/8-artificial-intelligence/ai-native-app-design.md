# Thiết kế AI-Native App

::: tip Mở đầu
**Sao 1 số AI product khiến ngạc nhiên, còn 1 số chỉ là "vỏ ChatGPT"?** Khác biệt không ở model dùng mạnh cỡ nào, mà product có design từ underlying xoay quanh đặc tính AI hay không. AI-native app không phải "thêm chat box" lên app traditional, mà rethink toàn bộ user interaction, system architecture, product logic.
:::

**Bạn sẽ học**:
- **Paradigm**: hiểu khác biệt bản chất AI-native vs traditional
- **Design principles**: core principle cho AI-native product
- **Prompt engineering**: design prompt chất lượng cao drive AI capability
- **Interaction**: new pattern UX của AI era
- **Architecture**: full lifecycle request của AI app

| Chương | Nội dung |
|-----|------|
| **1** | Architecture comparison |
| **2** | Design principles |
| **3** | Prompt engineering |
| **4** | Interaction patterns |
| **5** | Request flow |

---

## 0. Toàn cảnh: từ "thêm AI" → "AI-native"

Mấy năm trước, path AI hoá nhiều product: có app sẵn, thêm 1 nút "AI assistant" ở góc nào đó. Như lắp engine lên xe ngựa — chạy được, nhưng không bằng design 1 chiếc xe hơi từ đầu.

**AI-native app** = product thinking mới: từ dòng code đầu, AI là capability core, không phải feature add sau.

::: tip Traditional vs AI-native
- **Traditional**: user action → deterministic logic → deterministic result. Mỗi lần click "submit order", flow y nhau.
- **AI-native**: user intent → AI hiểu → probabilistic result. Cùng question, mỗi lần answer hơi khác.
- **Core shift**: từ "viết rule" → "mô tả intent", từ "deterministic" → "probabilistic", từ "operation UI" → "dialogue UI".
:::

---

## 1. Architecture comparison

Traditional architecture = "request-response": user click, backend execute deterministic logic, return deterministic result. Cả quá trình predictable, testable, reproducible.

AI-native introduce role mới — **LLM**. Như "smart middleware", nhận natural language input, output natural language. Mang thay đổi architecture căn bản.

<AINativeArchDemo />

| Dim | Traditional | AI-native |
|------|---------|------------|
| Input | Form, button, dropdown | Natural language, image, voice |
| Logic | if-else, rule engine | LLM reasoning, prompt-driven |
| Output | Deterministic, reproducible | Probabilistic, mỗi lần khác |
| Latency | ms | s (cần streaming) |
| Error handling | Error code rõ | Hallucination, refusal, off-topic |
| Cost | Compute cố định | Pay per token, fluctuate |

::: tip 3 stage architecture evolution
1. **AI-augmented**: nhúng AI vào app sẵn (autocomplete, smart recommend)
2. **AI-collaborative**: AI là interaction core, nhưng vẫn traditional UI làm fallback (Notion AI, GitHub Copilot)
3. **AI-native**: cả product xoay quanh AI, bỏ AI = product không tồn tại (ChatGPT, Cursor, Midjourney)
:::

---

## 2. Design principles: "hiến pháp" AI-native

Không copy thinking của traditional software. Probabilistic + latency + unpredictable của AI yêu cầu principle mới.

<AIDesignPrincipleDemo />

::: tip 5 core principles
1. **Embrace uncertainty**: AI output không 100% reliable, design phải cân nhắc "AI có thể sai". Provide edit, retry, feedback. User luôn control.
2. **Progressive trust**: đừng cho AI decision high-risk từ đầu. Build trust ở low-risk trước, expand quyền tự chủ AI.
3. **Transparent + explainable**: cho user biết AI làm gì, sao làm vậy. Show reasoning, citation, confidence.
4. **Human-AI collaboration**: AI không thay người, mà augment người. Best design: AI làm draft, người final review.
5. **Graceful degradation**: AI down hoặc kết quả tệ, product vẫn dùng được. Luôn có Plan B.
:::

---

## 3. Prompt engineering: "programming language" của AI app

Traditional: viết code bảo máy làm gì. AI-native: viết Prompt bảo model làm gì. **Prompt = programming language của AI era** — viết tốt AI ấn tượng; viết tệ AI bịa.

<PromptDesignDemo />

::: tip 4 layer Prompt
1. **System Prompt**: define role, capability boundary, behavior. Instruction cấp "hiến pháp", user không thấy nhưng luôn effective.
2. **Context injection**: doc retrieved qua RAG, user history → background AI cần.
3. **User Message**: question/instruction thực của user.
4. **Format constraint**: chỉ định output format (JSON, Markdown, template), đảm bảo parse được.
:::

| Technique | Note | Effect |
|------------|------|------|
| Role setting | "Bạn là senior FE engineer" | Tăng quality domain answer |
| Few-shot | Cho 2-3 input-output example | Model hiểu format + style |
| Chain of Thought | "Suy nghĩ từng bước" | Tăng accuracy reasoning phức tạp |
| Output constraint | "Trả lời JSON" | Output parse được |
| Negative instruction | "Đừng bịa info không chắc" | Giảm hallucination |

---

## 4. Interaction: UX của AI era

AI-native sinh nhiều pattern mới. Traditional UX = "click-wait-view", AI app = "dialogue-observe-adjust".

<AIUXPatternDemo />

::: tip 4 core interaction pattern
1. **Streaming**: AI gen content hiện từng chữ, không chờ gen hết. Giảm perceived waiting time, user judge direction sớm.
2. **Multi-turn**: dialogue liên tục qua context memory, user refine progressively. Challenge: context window management + history compression.
3. **Multimodal**: support text, image, voice, file. AI cũng output image, code, table.
4. **Agentic**: AI không chỉ answer, mà tự plan + execute multi-step task. User cho goal, AI tự breakdown + complete.
:::

---

## 5. Request flow: 1 AI call lifecycle

User gửi message trong AI app, background xảy ra gì? Hiểu full flow = foundation build reliable AI app.

<AIAppFlowDemo />

::: tip 6 stage processing
1. **Input preprocess**: validate user input, content safety, sensitive info redact
2. **Context assembly**: ghép system prompt + retrieve relevant doc (RAG) + load history
3. **Model call**: send assembled prompt tới LLM API, open streaming
4. **Output postprocess**: format, content safety filter, extract structured data
5. **Cache**: cache common question result, giảm cost + latency
6. **Monitor**: log token usage, response time, user feedback → continuous optimize
:::

| Stage | Key | Common issue |
|------|---------|---------|
| Input preprocess | Injection protection, length limit | Prompt injection, jailbreak |
| Context assembly | Token budget, info priority | Context overflow, key info truncated |
| Model call | Timeout, retry, streaming | API rate limit, network timeout |
| Output postprocess | Format check, hallucination detect | Output format không match |
| Cache | Semantic vs exact cache | Hit rate thấp |
| Monitoring | Cost monitor, quality eval | Token cost out of control |

---

## Tổng kết

AI-native design không phải chỉ đắp AI lên traditional, mà refactor toàn diện về architecture, interaction, engineering.

Key:
1. **Architecture shift**: từ deterministic logic → probabilistic reasoning
2. **Design principle**: embrace uncertainty, progressive trust, transparent, human-AI collab, graceful degradation
3. **Prompt là core**: "programming language" của AI app, quyết product quality
4. **Interaction revolution**: streaming, multi-turn, multimodal, Agent — redefine UX
5. **Full-chain thinking**: từ input preprocess đến monitoring, mỗi mắt xích design riêng cho AI

::: tip 2026 cho VN dev
- **Streaming là must**: dùng Server-Sent Events (SSE) hoặc WebSocket cho UX tốt
- **Generative UI**: Vercel AI SDK, Vercel v0 — AI gen UI component dynamic
- **Cost monitor**: LangSmith, Helicone, Langfuse track cost + quality
- **Eval framework**: Promptfoo, Braintrust auto eval prompt
- **Safety**: Llama Guard, OpenAI Moderation API check input/output
- **VN case**: build CS bot e-commerce → dùng RAG với product DB + structured output cho recommendations
- **Bài tập**: clone Cursor mini — IDE-like editor + chat sidebar + streaming
:::

## Tài liệu

- [Google PAIR Guidelines](https://pair.withgoogle.com/)
- [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- [NN/g: AI UX](https://www.nngroup.com/topic/artificial-intelligence/)
- [Building LLM Applications](https://www.oreilly.com/library/view/building-llm-powered/9781835462317/)
