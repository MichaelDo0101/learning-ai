# Từ điển khả năng AI

Cùng với generative AI đi vào nhiều scenario, vấn đề ngày càng thực tế: **AI có những capability nào dùng được?** Với requirement cụ thể, **chọn capability/model/product nào?**

Cách dễ nhất: "ôm phật chân vội" — gặp need thì search API cloud + commercial solution. Thấy image need nghĩ image generation, text need nghĩ LLM, voice nghĩ ASR/TTS. Nhưng **gộp đống product** ≠ **systematically plan + select + combine AI capability ở enterprise scale**. Search lúc cần + judge bằng kinh nghiệm gây fragmentation, design tuỳ tiện, khó reuse.

Cẩm nang này theo "AI Capability Landscape" core. Mục tiêu: không nhét tên, mà giúp bạn nhanh hiểu 3 thứ: **"việc này dùng AI capability nào? Loại model/product nào? Keyword nào để tìm API/project/service thử?"**

Qua hệ thống từ modal (text/image/audio/video/3D/multimodal) → architecture (model/retrieval/Agent/platform engineering), **mỗi need + scenario điển hình tìm được AI capability tương ứng, model/product đại diện, use case thực**, giúp team xây hệ AI với cost trial-error thấp, decision efficiency cao, reuse mạnh.

> Nội dung **nhiều**, có thể tra lúc cần. Recommend **chia sẻ cẩm nang này cho AI** để gợi ý chọn model + API cho scenario cụ thể.

Nếu chỉ muốn biết category, chỉ đọc intro mỗi chapter (vd 1.1, 1.2), không cần đi sâu 1.1.1, 1.1.2.

**Khuyến nghị: tra phần cần thiết hoặc browse L1 outline; thấy hấp dẫn mới đọc full.**

## Bạn sẽ học

- AI capability landscape: từ text, image, audio, video, 3D đến multimodal, Agent, RAG, safety, platform engineering
- Model + product mỗi capability: Embedding, OCR, ASR, TTS, VLM, RAG
- Capability → scenario mapping: content product, search Q&A, smart CS, auto ops

## Model parameter

Trước khi vào, làm rõ concept hay nói: gì là big model, gì là small model?

**Học thuật**: big model = vài tỷ → trăm tỷ → trillion param general model. Small model = task/scenario specific, vài chục triệu → trăm triệu param.

**Giá**: API call cực rẻ (vài hào/lần, hoặc vài cent/1K token) + không nhấn mạnh general LLM → thường là small model điển hình (OCR, ASR, image classification, content moderation), hoặc lightweight LLM compress/distill cho high concurrency low cost. Giá cao (vài hào → 1k/call) → thường là big model.

Nếu product mention LLM, general big model, multimodal big model, hoặc end-to-end task phức tạp → thường là big model. Nếu nhấn mạnh 1 vertical capability (card OCR, invoice, license plate, ad CTR, voice transcribe, content safety) → underlying thường 1 hoặc nhiều small model.

**Convention** trong bài:
- **Big model**: general, conversational, programmable, giá hơi cao (kèm multimodal: GPT-4o, Gemini 2.5 Pro, Claude 3.7 Sonnet). Cover đa số task general text + code + multimodal.
- **Small model**: task specific fine-tune/custom. Rẻ hơn, perf ổn định, phạm vi hẹp.

**Industry change quan trọng**: nhiều capability trong cẩm nang trước 2021 do "small model" đảm nhận. Hôm nay, **đa số general scenario có thể call big model trực tiếp giải**.

Từ góc **precision + cost** cực đại, small model vẫn không thay thế được. Nhưng **người mới có thể bắt đầu bằng call API big model**, rồi tiến vào high-level. Chỉ cần trade-off cost vs precision vs latency, quyết chỗ nào general LLM, chỗ nào small model specific.

> **Common general big model**:
>
> - OpenAI: GPT-4, GPT-4.1, GPT-4o, GPT-5
> - Google: Gemini 2.5 Pro, Gemini 2.5 Flash
> - Anthropic: Claude 3.7 Sonnet, Opus 4
> - Open: Llama 4, Qwen 3, DeepSeek V3.5, Mistral Large 2

---

# 1. Text task (Text / NLP / LLM)

Text task = foundational. Dù content moderation, search-recommend, KB Q&A, writing assistant, code Copilot — đều xoay quanh: máy hiểu chữ thật.

## 1.1 Language modeling + representation cơ bản

Goal: cho máy "quen" ngôn ngữ statistically, tìm vector representation ổn định cho word/sentence/document.

**Scenario**:
- Search: general search, e-commerce site search, KB retrieval
- Recommend: content recommend, product recommend, user interest modeling
- Q&A: FAQ, KB Q&A
- Text analysis: sentiment, dedup, clustering
- Downstream task base: classification, IE, generation

**Principle**:
- Language modeling: autoregressive (GPT, Llama, Qwen) + Masked LM (BERT, RoBERTa, ERNIE)
- Word/sentence/document representation: Word2Vec/GloVe (static), BERT embedding/Sentence-BERT (contextual), document-level vector

**Model**: BERT/RoBERTa/ERNIE, GPT/Llama/Qwen LLM, Embedding (OpenAI text-embedding-3, bge, E5, SimCSE, BGE-M3 cho VN)

## 1.2 Text classification + matching

Trên vector representation, build classifier + similarity.

**Scenario**: sentiment classification, intent recognition, spam detection, FAQ matching, dedup, paraphrase detect, semantic search.

**Principle**:
- Classification: single-label, multi-label, hierarchical
- Matching: pairwise (Sentence-BERT, cross-encoder), retrieval (bi-encoder)
- Natural Language Inference (NLI): entailment, contradiction, neutral

**Model**: fine-tuned BERT, sentence-transformers (all-MiniLM, paraphrase-mpnet), commercial API (OpenAI moderation, Azure Content Moderator).

## 1.3 Sequence labeling + Information Extraction (IE)

Token-level decision.

**Scenario**: Named Entity Recognition (người, địa điểm, công ty), relation extraction (Hoàng work at AIECOS), event extraction (M&A, leadership change), invoice extraction (date, amount, vendor).

**Principle**:
- NER: BIO tagging, CRF, span-based
- Relation extraction: pipeline (NER → RE), joint
- LLM extraction: zero/few-shot, structured output (JSON schema)

**Model**: spaCy, Stanford CoreNLP, fine-tuned BERT (BERT-CRF), LLM (GPT-4o với JSON mode, Claude tool use), specialized (UIE, GLINER).

## 1.4 Text generation + editing

**Scenario**: writing assistant, content creation, summarization, translation, code generation, rewriting, expansion, polishing.

**Principle**:
- Generation: autoregressive LLM
- Summarization: extractive, abstractive
- Translation: NMT (Marian, mBART), LLM zero-shot
- Editing: instruction-tuned LLM

**Model**: GPT-4o, Claude 3.7, Gemini 2.5, Qwen, Llama, Mistral. Translation: DeepL, Google Translate, M2M-100. Code: GitHub Copilot, Cursor, Codestral.

---

# 2. Image modal (Image / Vision)

## 2.1 Low-Level Vision

Pixel-level processing: denoising, super-resolution, deblur, color correction, HDR.

**Scenario**: photo enhance, video upscale, scan cleanup, low-light enhance.

**Model**: ESRGAN, Real-ESRGAN, SwinIR, DnCNN, NAFNet.

## 2.2 Image classification + recognition

**Scenario**: product category, scene tag, brand recognition, NSFW detection, medical image diagnosis.

**Model**: ResNet, EfficientNet, Vision Transformer (ViT), CLIP zero-shot, Imagenet pre-trained.

## 2.3 Object detection

**Scenario**: pedestrian detect, vehicle detect, defect detect, security camera, autonomous driving.

**Model**: YOLO series (YOLOv8, v11, v12), DETR, Faster R-CNN, RT-DETR.

## 2.4 Image segmentation

Pixel-level mask.

**Scenario**: cutout, virtual background, medical organ segmentation, satellite analysis.

**Model**: Segment Anything (SAM, SAM 2), Mask R-CNN, U-Net, MaskFormer.

## 2.5 Keypoint + action recognition

Skeleton + motion.

**Scenario**: motion capture, fitness app, dance grading, surveillance behavior.

**Model**: OpenPose, MediaPipe, MMPose, ViTPose.

## 2.6 Open-vocabulary / open-world / open-domain detection

Without fixed label set.

**Scenario**: "find me the green cup" search, prompt-based object search.

**Model**: GroundingDINO, OWL-ViT, OWLv2, CLIP.

## 2.7 Vision-Language tasks

VLM cross-modal.

**Scenario**: image captioning, VQA (visual Q&A), image search by text.

**Model**: CLIP, BLIP-2, LLaVA, Qwen2.5-VL, GPT-4V, Claude vision.

## 2.8 OCR

Text from image.

**Scenario**: invoice extraction, ID verification (eKYC), document digitalization, receipt parsing.

**Model**: PaddleOCR, EasyOCR, Tesseract, TrOCR, MinerU. Commercial: Google Vision OCR, Azure Document Intelligence, FPT.AI OCR.

## 2.9 Image generation + editing

**Scenario**: art creation, marketing image, product image variation, inpainting, outpainting.

**Model**: Flux 1.1 Pro, Stable Diffusion 3.5, SDXL, Midjourney v7, DALL-E 3, Google Imagen 3.
Edit: ControlNet, InstantID, IP-Adapter, Adobe Firefly.

## 2.10 Image Quality Assessment (IQA)

Quality score for image.

**Scenario**: photo selection, model output filter, photography contest.

**Model**: BRISQUE, NIQE, MUSIQ, MANIQA, Q-Align.

---

# 3. 3D / Spatial modal (3D / Spatial / XR)

## 3.1 3D perception + reconstruction

**Scenario**: 3D scanning, AR/VR, photogrammetry, autonomous driving depth.

**Model**: NeRF, Gaussian Splatting, COLMAP, MVSNet, Depth Anything.

## 3.2 3D scene understanding + SLAM

**Scenario**: robot navigation, AR mapping, mobile robot.

**Model**: SuperPoint, SuperGlue, ORB-SLAM, NICE-SLAM.

## 3.3 3D generation + editing

**Scenario**: game asset, metaverse, virtual try-on, product visualization.

**Model**: Shap-E, GET3D, Meshy, Tripo, DreamGaussian, Trellis.

---

# 4. Audio (Audio / Speech)

## 4.1 Waveform-level audio processing

**Scenario**: noise reduction, echo cancellation, voice enhance.

**Model**: RNNoise, DNS Challenge models, FullSubNet, NSNet.

## 4.2 Speech Recognition (ASR) + Speaker

**Scenario**: voice memo, podcast subtitle, call center transcription, meeting note.

**Model**: Whisper (large-v3 best multilingual), Faster-Whisper, Conformer, Paraformer. VN: VietAI Whisper-VN, FPT.AI ASR.
Speaker ID: ECAPA-TDNN, x-vector, Resemblyzer.

## 4.3 Audio / Music understanding

**Scenario**: music tagging, content ID (Shazam-like), genre classification, scene classification.

**Model**: PANNs, YAMNet, MERT, MusicGen analysis.

## 4.4 Speech + audio generation (TTS / VC / Music)

**Scenario**: audiobook, voice assistant, voice cloning, music creation.

**Model**: TTS: ElevenLabs, OpenAI TTS, F5-TTS, Coqui XTTS, FishSpeech.
Voice clone: OpenVoice, GPT-SoVITS.
Music: Suno, Udio, MusicGen, Stable Audio.

---

# 5. Video

## 5.1 Traditional video processing

**Scenario**: video encoding, compression, watermark, transcoding.

**Model**: FFmpeg, x264, AV1, NVENC.

## 5.2 Video understanding + structure analysis

**Scenario**: scene segmentation, action recognition, video tagging, highlight clip.

**Model**: TimeSformer, VideoMAE, InternVideo, VJEPA.

## 5.3 Video + Language multimodal

**Scenario**: video Q&A, video captioning, video search by text.

**Model**: Gemini 2.5 (1h video), Qwen2.5-VL, InternVL, Video-LLaMA.

## 5.4 Video generation + editing

**Scenario**: short video creation, ad gen, animation, scene generation.

**Model**: Sora, Veo 3, Runway Gen-4, Pika 2.0, Kling, Hunyuan Video, MiniMax Video.

## 5.5 Digital human / Avatar

**Scenario**: live host, virtual influencer, customer service, e-learning instructor.

**Model**: HeyGen, Synthesia, D-ID, Hedra, EMO (Alibaba), VASA-1 (Microsoft).

---

# 6. Time series + sequential decision

## 6.1 Classical statistical TS modeling

**Scenario**: sales forecast, inventory, energy demand, traffic flow.

**Model**: ARIMA, Prophet, ETS, statsmodels.

## 6.2 Deep learning TS forecasting

**Model**: N-BEATS, Temporal Fusion Transformer (TFT), Informer, PatchTST, TimeMixer, TimesFM (Google foundation model).

## 6.3 Anomaly + change point detection

**Scenario**: fraud detection, equipment failure, system monitoring.

**Model**: Isolation Forest, LSTM autoencoder, USAD, RobustAD, Anomaly Transformer.

## 6.4 Spatio-temporal modeling

**Scenario**: traffic prediction, weather, crowd flow.

**Model**: ConvLSTM, ST-GCN, GraphWaveNet, ClimaX (climate).

---

# 7. Agent + Tool use

## 7.1 Tool calling / Function calling

**Scenario**: AI book ticket, query weather, control device, query DB.

**Model**: GPT-4o function calling, Claude tool use, Gemini function calling, Qwen function call. Framework: LangChain, LlamaIndex, OpenAI Assistants.

## 7.2 Workflow orchestration + multi-Agent

**Scenario**: end-to-end task automation, multi-role collab simulation, complex business process.

**Framework**: LangGraph, CrewAI, AutoGen, Microsoft Magentic-One, Anthropic Claude Code, Cursor Agent. Protocol: MCP, A2A.

---

# 8. Retrieval + Knowledge

## 8.1 RAG (Retrieval-Augmented Generation)

**Scenario**: enterprise KB Q&A, document chat, customer support, code search.

**Component**: embedding model + vector DB + retrieval strategy + LLM.
**Framework**: LlamaIndex, LangChain, Haystack, Dify, FastGPT, RAGFlow.
**Vector DB**: Pinecone, Milvus, Qdrant, Weaviate, Chroma, pgvector.

## 8.2 Structured data + Knowledge Graph

**Scenario**: enterprise knowledge management, search engine entity, recommendation, fraud detection.

**Tool**: Neo4j, Stardog, Apache TinkerPop, OpenSPG. LLM-based KG: GraphRAG (Microsoft), LightRAG.

---

# 9. Safety / Alignment / Evaluation

## 9.1 Capability evaluation + benchmark

**Scenario**: model selection, A/B test prompt, regression test.

**Benchmark**: MMLU (general), HumanEval (code), MT-Bench (chat), GAIA (agent), AgentBench, BFCL (function calling).
**Eval tool**: LangSmith, Helicone, Langfuse, Phoenix (Arize), Braintrust, Promptfoo.

## 9.2 Value alignment + training

**Method**: RLHF (Reinforcement Learning from Human Feedback), DPO (Direct Preference Optimization), Constitutional AI (Anthropic), RLAIF.

## 9.3 Content safety + compliance

**Scenario**: jailbreak prevent, harmful content filter, prompt injection defense, PII detection.

**Tool**: OpenAI Moderation, Azure Content Safety, AWS Bedrock Guardrails, Llama Guard 3, NVIDIA NeMo Guardrails, Lakera Guard.

---

# 10. AI for Science (AI4Science)

## 10.1 Molecular + drug design

**Model**: AlphaFold 3, DiffDock, MolFormer, Boltz-1, ChemCrow.

## 10.2 Protein + structural biology

**Model**: AlphaFold 3, ESMFold, RoseTTAFold, ProteinMPNN, RFdiffusion.

## 10.3 Physics simulation + surrogate modeling

**Model**: PINN (Physics-Informed NN), FNO (Fourier Neural Operator), GraphCast (Google weather), Aurora (Microsoft).

## 10.4 Materials discovery + crystal design

**Model**: GNoME (Google), MatterGen, M3GNet, ALIGNN.

## 10.5 Mathematics + symbolic reasoning

**Model**: AlphaProof, AlphaGeometry, Minerva, DeepSeek-Math, LLEMMA. Tool: Lean, Coq theorem provers.

## 10.6 Scientific workflow + lab automation

**Tool**: Coscientist (CMU), ChemCrow, Aviary, MOSES.

---

# 11. Platform + engineering (MLOps / Infra)

## 11.1 Model training + fine-tuning

**Framework**: PyTorch, JAX, DeepSpeed, FSDP, Hugging Face Transformers + PEFT + TRL.
**Service**: Together AI, Fireworks AI, Modal, RunPod, Lambda Labs. Apple Silicon: MLX.
**No-code**: Llama Factory, Unsloth, Axolotl, OpenAI fine-tuning UI.

## 11.2 Model deployment + inference optimization

**Engine**: vLLM, TGI (Text Generation Inference), TensorRT-LLM, SGLang, llama.cpp, MLC-LLM, Ollama (local).
**Quantization**: GGUF, AWQ, GPTQ, BitsAndBytes.
**Serving**: BentoML, Modal, Replicate, AnyScale.

## 11.3 Data + model ops

**Data**: LabelStudio, Argilla, Snorkel, Cleanlab.
**Experiment tracking**: MLflow, Weights & Biases, Neptune.
**Monitoring**: Arize, WhyLabs, Evidently, Helicone, LangSmith.

---

## Tổng kết

Cẩm nang này là **map navigation** cho AI capability landscape. Recommend:

1. **Newbie**: scan L1 outline để có big picture
2. **Có need cụ thể**: tra section liên quan, copy model/tool name → search docs
3. **Architect**: dùng làm checklist khi design AI system, không bỏ sót capability
4. **Stay updated**: AI changes nhanh, model mới ra hàng tuần. Theo dõi:
   - [Hugging Face Trending](https://huggingface.co/models)
   - [Papers with Code](https://paperswithcode.com/)
   - [LMSYS Chatbot Arena](https://lmarena.ai/)
   - [AI News by Smol AI](https://buttondown.com/ainews)

::: tip 2026 VN dev
- **API VN-friendly pricing**: Fireworks, Together, DeepInfra, Replicate
- **Open source**: Qwen 3, Llama 4, DeepSeek-V3 — chạy được local nếu có 1-2 GPU
- **VN-specific**: PhoGPT, Vistral, VinaLLaMA cho tasks tiếng Việt
- **Skill priority 2026**:
  1. Function calling + MCP — kỹ năng nền cho mọi AI app
  2. RAG patterns — KB Q&A là use case enterprise lớn nhất
  3. Agent orchestration — LangGraph, Claude Code, Cursor
  4. Fine-tuning với LoRA — cho domain specific
  5. Cost optimization + caching
:::

> **Cẩm nang này tự maintain liên tục**. Model nào mới release > 6 tháng có thể đã out-of-date. Phải verify với docs official.
