# Phát triển full-stack thời Vibe Coding

::: tip Mở đầu
**Vibe Coding là gì?** Đơn giản: "viết code bằng ngôn ngữ tự nhiên" — bạn mô tả bằng tiếng Việt/Anh, AI sinh code. Thay đổi hoàn toàn rule game của software dev.

Nhưng có 1 điểm key: **AI giúp viết code, nhưng AI không thay bạn nghĩ.** Bạn vẫn cần biết "viết gì", "tại sao", "cách phán đoán đúng-sai". Đây là cognitive framework cơ bản chương này giúp bạn xây.
:::

**Bạn sẽ học**:
- **Nhận thức toàn cảnh lĩnh vực**: frontend, backend, AI algorithm... làm gì
- **Năng lực chọn công nghệ**: đối mặt "học ngôn ngữ/framework nào" có quyết định lý tính
- **Roadmap rõ**: hiểu evolution skill từ 0 đến engineer 3-5 năm
- **Tư duy Vibe Coding**: hiểu năng lực nào quan trọng hơn thời AI

| Chương | Nội dung |
|-----|------|
| **1** | Toàn cảnh lĩnh vực CS |
| **2** | Frontend |
| **3** | Backend |
| **4** | Bản đồ ngôn ngữ lập trình |
| **5** | Full-stack engineer |
| **6** | AI algorithm engineer |
| **7** | Roadmap phát triển |

---

## 0. Vibe Coding: paradigm mới của software dev

### 0.1 Vibe Coding là gì?

<VibeCodingFlowDemo />

**Thay đổi core**: từ "viết code thế nào" thành "mô tả nhu cầu thế nào".

### 0.2 Thời Vibe Coding, năng lực nào quan trọng hơn?

<DeveloperSkillShiftDemo />

::: tip 💡 Insight key
AI giúp viết code, nhưng các năng lực sau AI không thay được:
- **Judgment**: biết code AI sinh đúng-tốt-xấu
- **Architecture thinking**: biết system design thế nào, chia module thế nào
- **Domain knowledge**: hiểu business logic, biết "làm gì"
- **Debug ability**: gặp vấn đề biết bắt đầu từ đâu
:::

---

## 1. Toàn cảnh lĩnh vực CS

<ComputerFieldMapDemo />

### 1.1 Ẩn dụ "nhà hàng"

Coi 1 software system là 1 **nhà hàng**:

| Lĩnh vực | Vai trò nhà hàng | Làm gì | Output |
|-----|---------|--------|--------|
| **Frontend** | Trang trí + menu + waiter | Mọi thứ user thấy, tương tác | Web, mini-program, App UI |
| **Backend** | Bếp + kho | Xử business logic, lưu data | API, database, server program |
| **Mobile** | Cửa sổ delivery | Trải nghiệm app trên phone | iOS/Android App |
| **AI/Algorithm** | R&D | Làm system "thông minh" | Model recommendation, image recognition, smart conversation |
| **DevOps** | Quản lý + bảo vệ | Đảm bảo system chạy ổn định | Deploy script, monitoring, security |
| **Data engineering** | Kế toán + analyst | Collect, store, analyse data | Data pipeline, report, dashboard |

### 1.2 Tech stack mỗi lĩnh vực

| Lĩnh vực | Ngôn ngữ chính | Framework/tool phổ biến | Output điển hình |
|-----|---------|--------------|---------|
| Frontend | JavaScript, TypeScript | React, Vue, CSS | Web, admin |
| Backend | Node.js, Go, Java, Python | Express, Gin, Spring | API service |
| Mobile | Swift, Kotlin, Dart | SwiftUI, Jetpack, Flutter | Mobile App |
| AI/Algorithm | Python | PyTorch, TensorFlow | Model, algorithm |
| DevOps | Shell, Python | Docker, Kubernetes | Deploy solution |

::: tip 💡 Lời khuyên cho người mới
Đừng cố học hết 1 lần. Chọn 1 hướng đi sâu trước, dựng "base", rồi mở rộng. Full-stack không phải "biết chút mọi thứ", mà "có 1 mạnh point core, hướng khác dùng được".
:::

---

## 2. Frontend là gì?

### 2.1 Định nghĩa 1 câu

**Frontend = phần user thấy, click, tương tác trực tiếp.**

Mở 1 web:
- Layout, color, font → frontend
- Animation effect khi click → frontend
- Form input, data display → frontend
- Cách page responsive với mobile → frontend

### 2.2 Bộ 3 frontend

<FrontendTriadDemo />

**Ẩn dụ "trang trí nhà"**:

| Tech | Vai trò | Trách nhiệm |
|-----|---------|------|
| **HTML** | Structure nhà | Tường ở đâu, cửa ở đâu, phòng chia thế nào |
| **CSS** | Style trang trí | Màu tường, đặt nội thất, đèn |
| **JavaScript** | Smart home | Bật/tắt đèn, mở rèm, security system |

### 2.3 Frontend framework: sao cần?

Native HTML/CSS/JS viết web được, sao cần học React, Vue?

<FrontendFrameworkDemo />

**Lý do core**: khi page phức tạp (Shopee, Facebook web), control element trực tiếp bằng code rất loạn. Framework giúp "quản lý độ phức tạp".

### 2.4 1 ngày của frontend engineer

```
9:00  Xem design draft, hiểu function cần làm
10:00 Viết React/Vue component code
14:00 Kết với backend API, debug data display
16:00 Fix bug, optimize performance page
18:00 Code review, thảo luận tech solution
```

---

## 3. Backend là gì?

### 3.1 Định nghĩa 1 câu

**Backend = user không thấy, nhưng support toàn hệ thống chạy.**

Khi shop online:
- Verify account/password → backend
- Check stock → backend
- Tính giá discount → backend
- Tạo đơn, trừ tiền → backend
- Notify kho ship → backend

### 3.2 Trách nhiệm core của backend

<BackendCoreDemo />

**Ẩn dụ "bếp nhà hàng"**:

| Trách nhiệm backend | Bếp ví dụ | Cụ thể |
|---------|---------|---------|
| **API design** | Design menu | Define "user order gì", "order thế nào" |
| **Business logic** | Quá trình nấu | Xử đơn, tính giá, verify permission |
| **Data storage** | Quản lý kho | Lưu data vào DB, query |
| **Performance optimize** | Hiệu quả bếp | Cache, async, load balance |
| **Security** | Food safety | Chống SQL injection, permission control |

### 3.3 Chọn ngôn ngữ backend

| Ngôn ngữ | Đặc điểm | Scenario |
|-----|------|---------|
| **Node.js** | Frontend-friendly, JS full-stack | Project nhỏ-trung, prototype nhanh |
| **Go** | High performance, concurrent mạnh | Service concurrency cao, microservice |
| **Java** | Ecosystem mature, enterprise | System enterprise lớn, bank |
| **Python** | Đơn giản, AI ecosystem tốt | Data processing, AI service |

::: tip 💡 Lời khuyên
Nếu bạn đã biết JavaScript (nền frontend), Node.js là entry tự nhiên nhất cho backend.
:::

### 3.4 1 ngày của backend engineer

```
9:00  Xem API requirement doc
10:00 Design structure bảng DB
11:00 Viết API code
14:00 Kết với frontend, fix API issue
16:00 Optimize slow query, xử production issue
18:00 Code review, viết tech doc
```

---

## 4. Bản đồ ngôn ngữ lập trình

### 4.1 Ngôn ngữ lập trình là gì?

**Ngôn ngữ lập trình = cầu nối giao tiếp người với máy.**

Máy chỉ hiểu 0/1, người quen ngôn ngữ tự nhiên. Ngôn ngữ lập trình là tầng giữa.

### 4.2 Phân loại

<ProgrammingLanguageMapDemo />

**Theo cách chạy**:

| Loại | Nguyên lý | Đại diện | Đặc điểm |
|-----|------|---------|------|
| **Compiled** | Translate trước, chạy sau | C, C++, Go, Rust | Chạy nhanh, compile chậm |
| **Interpreted** | Vừa translate vừa chạy | Python, JavaScript, Ruby | Dev nhanh, chạy chậm |
| **Bytecode** | Cân bằng | Java, Kotlin, C# | Performance + dev efficiency |

**Theo type system**:

| Loại | Đặc điểm | Đại diện |
|-----|------|---------|
| **Static** | Type xác định lúc code | Java, TypeScript, Go |
| **Dynamic** | Type xác định lúc chạy | Python, JavaScript, Ruby |
| **Strong** | Type check strict | Python, Java |
| **Weak** | Type check loose | JavaScript, PHP |

### 4.3 Học ngôn ngữ nào?

<LanguageSelectionDemo />

::: tip 💡 Nguyên tắc chọn
Không có "ngôn ngữ tốt nhất", chỉ có "phù hợp scenario nhất". Người mới:
1. **Học 1 ngôn ngữ, học sâu**: xây tư duy lập trình
2. **Học cái thứ 2, so sánh**: hiểu khác biệt design
3. **Học theo nhu cầu**: theo project
:::

---

## 5. Full-stack engineer

### 5.1 Full-stack là gì?

**Full-stack = engineer độc lập làm cả frontend + backend.**

<FullstackSkillDemo />

### 5.2 Ưu thế full-stack

| Ưu thế | Mô tả |
|-----|------|
| **Độc lập làm project** | Từ requirement tới online, 1 mình xong |
| **Cost giao tiếp thấp** | Không cần FE-BE qua lại |
| **View công nghệ rộng** | Hiểu toàn hệ thống |
| **Founder-friendly** | Verify ý tưởng nhanh, MVP dev |

### 5.3 Thách thức

| Thách thức | Mô tả |
|-----|------|
| **Depth vs breadth** | Dễ "biết chút mọi thứ, không sâu cái nào" |
| **Tech update nhanh** | FE-BE đều evolve nhanh |
| **Phân tán năng lượng** | Phải focus nhiều lĩnh vực |

### 5.4 Roadmap full-stack

```
Stage 1: Xây base
└── Chọn 1 hướng đi sâu (start với FE hoặc BE)
└── Đạt mức độc lập làm project

Stage 2: Mở rộng
└── Học cơ bản hướng khác
└── Làm full-stack project đơn giản

Stage 3: Hợp nhất
└── Hiểu FE-BE collaborate thế nào
└── Design được tech architecture đầy đủ

Stage 4: Tinh chỉnh liên tục
└── Giữ depth ở 1 lĩnh vực
└── Các lĩnh vực khác "dùng được"
```

---

## 6. AI algorithm engineer

### 6.1 AI engineer vs traditional dev

<AIvsTraditionalDemo />

| Chiều | Traditional dev | AI algorithm engineer |
|-----|---------|--------------|
| **Task core** | Implement deterministic business logic | Train model, optimize algorithm |
| **Cách tư duy** | "Nếu A thì B" | "Cho máy học pattern từ data" |
| **Output code** | Function module, system | Model, training script |
| **Cách debug** | Breakpoint, log | Xem metric, tune hyperparameter |
| **Standard success** | Function đúng, no bug | Accuracy, recall đạt target |

### 6.2 Skill tree AI engineer (2026)

```
AI engineer (2026)
    │
    ├── Năng lực nền
    │   ├── Python (ngôn ngữ chính)
    │   ├── Data processing (Pandas, NumPy)
    │   └── Intuition toán cơ bản (linear algebra, probability)
    │
    ├── LLM application (hot nhất)
    │   ├── Prompt Engineering
    │   ├── RAG (Retrieval-Augmented Generation)
    │   ├── AI Agent (autonomous task)
    │   ├── Function Calling / MCP (tool calling)
    │   └── Fine-tune + deploy (LoRA, vLLM)
    │
    ├── Generative AI (GenAI)
    │   ├── Text gen (GPT, Claude, Gemini)
    │   ├── Image gen (Stable Diffusion, Midjourney, FLUX, NanoBanana)
    │   ├── Video gen (Sora, Kling, Gemini Omni)
    │   └── Multimodal (text + image + audio)
    │
    └── Traditional ML (vẫn quan trọng)
        ├── Supervised learning (classification, regression)
        ├── DL framework (PyTorch)
        └── Model evaluation + optimization
```

### 6.3 1 ngày của AI engineer

```
9:00  Xem kết quả train model, phân tích metric
10:00 Preprocess data, clean training data
14:00 Adjust model architecture, thử solution mới
16:00 Chạy experiment, so sánh effect
18:00 Viết experiment report, thảo luận với team
```

### 6.4 AI engineer thời Vibe Coding

| Thay đổi | Mô tả |
|-----|------|
| **Code gen** | AI gen được training script, data processing code |
| **Đọc paper** | AI tóm tắt paper |
| **Ghi experiment** | AI giúp organize kết quả |
| **Cái không đổi** | Hiểu vấn đề, phán đoán kết quả, định hướng |

---

## 7. Roadmap: từ nhập môn tới chuyên gia

### 7.1 Roadmap 3-5 năm

<CareerPathDemo />

### 7.2 Yêu cầu năng lực mỗi stage

| Stage | Thời gian | Năng lực core | Output điển hình |
|-----|------|---------|---------|
| **Nhập môn** | 0-1 năm | Nắm 1 ngôn ngữ + tool cơ bản | Làm function module đơn giản |
| **Trung cấp** | 1-2 năm | Quen 1 tech stack + engineering | Làm project trung độc lập |
| **Cao cấp** | 2-3 năm | Sâu 1 lĩnh vực + năng lực architect | Design system solution |
| **Senior** | 3-5 năm | Depth + hiểu business + team work | Lead project lớn |

### 7.3 Strategy học thời Vibe Coding

<LearningStrategyDemo />

::: tip 💡 Lời khuyên core
1. **Nền quan trọng hơn tool**: ngôn ngữ feature, data structure, tư duy giải thuật là gốc
2. **Thực hành quan trọng hơn lý thuyết**: làm project là cách học tốt nhất
3. **Tư duy quan trọng hơn nhớ**: hiểu "tại sao" hơn nhớ "cách làm"
4. **AI là tool không phải nạng**: dùng AI tăng tốc học, không thay tư duy
:::

---

## 8. Tổng kết: năng lực cạnh tranh thời Vibe Coding

Review:

1. **Chia lĩnh vực**: FE, BE, mobile, AI, DevOps, data — mỗi cái có focus
2. **Chọn tech**: không có "tốt nhất", chỉ có "phù hợp scenario nhất"
3. **Roadmap**: sâu trước, rộng sau, xây base rồi mở rộng
4. **Thời AI**: AI giúp viết code, không thay tư duy

### 3 tầng năng lực thời Vibe Coding

```
┌─────────────────────────────────────────┐
│  Tầng 3: Judgment (AI không thay được)  │
│  - Biết đúng là gì                       │
│  - Biết tốt là gì                        │
│  - Biết đi hướng nào                     │
├─────────────────────────────────────────┤
│  Tầng 2: Architecture (AI hỗ trợ)       │
│  - System design                         │
│  - Module split                          │
│  - Tech selection                        │
├─────────────────────────────────────────┤
│  Tầng 1: Code implementation (AI giỏi)  │
│  - Syntax                                │
│  - API call                              │
│  - Common pattern                        │
└─────────────────────────────────────────┘
```

::: tip 2026 update cho dev VN
- **Stack hot 2026**: Cursor + Claude Code (combo phổ biến)
- **VN job market**: full-stack hơn specialist (do startup ecosystem)
- **AI engineer trend**: từ "train model" sang "build AI product với LLM"
- **Salary VN 2026**: junior $800-1500, senior $2500-5000, AI engineer $3000-8000+
- **Remote opportunities** rộng hơn — VN dev cạnh tranh global được
:::
