---
title: 'Gemini (Google) — Trợ lý AI đa phương thức, sống trong hệ sinh thái Google'
description: 'Hướng dẫn thực chiến Google Gemini cho người Việt: gói & giá tại VN, Deep Research, NotebookLM, AI Studio, và bước ngoặt Gemini CLI → Antigravity (hạn tắt CLI cá nhân: 18/6/2026) — kèm bài tập và case study có nguồn.'
---

# Gemini (Google) — Trợ lý AI đa phương thức, sống trong hệ sinh thái Google

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">✨</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn là sinh viên năm cuối, 11h đêm phải nộp phần tổng quan tài liệu cho luận văn — 20 nguồn rải khắp web, đọc tay thì hết đêm. Mở **gemini.google.com**, bật **Deep Research**, gõ tiếng Việt: *"Nghiên cứu sâu về [chủ đề], so sánh quan điểm trái chiều, ưu tiên nguồn 2025–2026, kèm bảng và trích dẫn."* → Gemini đề xuất kế hoạch, bạn duyệt, nó tự duyệt web vài phút rồi trả về báo cáo có nguồn. Xuất sang Google Docs chỉnh lại. Việc cả đêm rút còn 30 phút.
**💸 Lợi ích thực tế:** một trợ lý đọc Gmail/Drive/Docs của bạn, tạo ảnh/video, nuốt cả tài liệu 1 triệu token. Bản Free đã đủ xài cho phần lớn việc học. (Đợt ưu đãi sinh viên VN 1 năm Google AI Pro miễn phí từng mở cuối 2025 nhưng **đã hết hạn đăng ký** — xem Mục 02 để biết cách kiểm đợt mới.) Đỡ thuê trợ lý, đỡ thức khuya.
:::

> **"Gemini không chỉ là một chatbot — nó là cả một họ sản phẩm: model nền, app chat, trợ lý trong Gmail/Docs, và công cụ dev.**
> **Mạnh nhất khi bạn đã sống trong hệ sinh thái Google. Nhưng nó cũng bịa trích dẫn, và Google vừa 'khai tử' Gemini CLI cho người dùng cá nhân — biết rõ mới khỏi sập bẫy."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Phân biệt** ba lớp của Gemini (model nền / app chat / công cụ dev) để khỏi nhầm khi đọc tin.
- **Đăng nhập** và dùng bản Free hào phóng (Deep Research, tạo ảnh, Live đều có), biết chọn gói hợp ví người Việt.
- **Chạy Deep Research** ra báo cáo có trích dẫn, và **kết hợp với NotebookLM** thành quy trình nghiên cứu mạnh.
- **Dùng AI Studio** (miễn phí, không cần thẻ) để lấy API key và "vibe-code" app rồi deploy.
- **Hiểu bước ngoặt Gemini CLI → Antigravity** (hạn tắt CLI cá nhân: 18/6/2026) và quyết định có nên phụ thuộc vào nó không.
- **Nhận diện & phòng** lỗi bịa trích dẫn + rò rỉ dữ liệu trên bản cá nhân — kỹ năng sống còn khi dùng AI cho việc thật.
:::

::: warning ⏱️ Lưu ý "hạn dùng" của thông tin
Đây là hiểu biết tới **đầu tháng 6/2026**. Hệ sinh thái Gemini đổi **cực nhanh** — riêng nửa đầu 2026 đã có Gemini 3, 3.1 Pro, I/O 2026 và vụ đóng Gemini CLI. Các con số giá/benchmark được gắn dấu "~" khi nguồn là bên thứ ba. Cứ vào thẳng [gemini.google.com](https://gemini.google.com) và [ai.google.dev](https://ai.google.dev) để kiểm tra bản mới nhất.
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**Gemini** là họ sản phẩm AI tổng thể của **Google / Google DeepMind**. Khác với ChatGPT (chủ yếu là một app), "Gemini" gồm **3 lớp** dễ lẫn — nắm rõ thì đọc tin tức không bị rối:

::: tip 🔑 Phân biệt 3 lớp của "Gemini" (đọc kỹ kẻo nhầm)
- **Mô hình nền (foundation models)** = dòng model Gemini bên dưới, có nhiều cấp: bản **Pro** (mạnh nhất: 3 Pro, 3.1 Pro, 3.5 Pro), bản **Flash** / **Flash-Lite** (nhanh & rẻ: 3.5 Flash), và chế độ suy luận sâu **Deep Think**. Đây là "động cơ".
- **App người dùng cuối** = ứng dụng chat Gemini (web + iOS/Android), trợ lý trên điện thoại, và phần tích hợp trong Workspace. Bài này nói nhiều về cái này.
- **Công cụ developer** = **AI Studio**, **Gemini API**, **Vertex AI**, và (trước đây) **Gemini CLI** → nay là **Antigravity**.
:::

**Gemini 3** (bản nền tảng) ra mắt **18/11/2025**, được Google mô tả là "mô hình thông minh nhất" — suy luận mạnh, đa phương thức (text/ảnh/video/audio/code), cửa sổ ngữ cảnh **1 triệu token**. Bản **Gemini 3.1 Pro** ra khoảng **19/02/2026**. Tại **Google I/O 2026** (khoảng 19–20/5) Google công bố **Gemini 3.5 Flash** (đã GA — được mô tả nhanh nhưng vượt 3.1 Pro ở coding/agentic), giới thiệu **Gemini Omni**, **Spark**, và **Antigravity** (nền tảng agent-first thay cho Gemini CLI). *Theo nguồn tới giữa 2026:* **Gemini 3.5 Pro** chưa phát hành rộng (đang rollout dần), nên đừng nhầm "3.5 Flash" (đã có) với "3.5 Pro" (chưa có). URL app chính thức: **https://gemini.google.com**.

::: warning 🔗 "Đóng Gemini CLI" và "ra Antigravity" là CÙNG một sự kiện
Thông báo chuyển Gemini CLI → Antigravity được đưa ra **tại I/O 2026 (~19–20/5/2026)**, còn **hạn chót tắt Gemini CLI cho người dùng cá nhân là 18/6/2026** — tức khoảng một tháng sau thông báo. Đừng hiểu nhầm 18/6 là "ngày Antigravity ra mắt": Antigravity (và Antigravity CLI) đã có từ I/O, còn 18/6 chỉ là ngày CLI cũ ngừng phục vụ cá nhân. Chi tiết ở Mục 02.
:::

**Những việc Gemini làm tốt (trong app):**

| Nhóm việc | Làm được gì | Có ở đâu |
|---|---|---|
| **Chat đa phương thức** | Hỏi đáp text/ảnh/video/audio/code; bản Free chạy model lớp Flash (đời mới nhất), trả phí mở thêm lớp Pro | Cả bản Free |
| **Deep Research** | Agent tự duyệt web nhiều nguồn, lập kế hoạch, tổng hợp báo cáo có trích dẫn | Free (mạnh hơn ở Pro/Ultra) |
| **Deep Think** | Chế độ suy luận sâu (nhiều giả thuyết song song); Google công bố Gemini 3 Deep Think đạt ~41% Humanity's Last Exam, ~93.8% GPQA Diamond, mức huy chương vàng IMO 2025 *(số do Google công bố)* | Ultra |
| **Giọng nói & soạn thảo** | **Gemini Live** (hội thoại realtime), **Canvas** (workspace soạn thảo/code), **Gems** (trợ lý tùy biến) | Free + trả phí |
| **Tạo ảnh & video** | Ảnh bằng **Nano Banana / Nano Banana Pro**, video **Veo 3.1** qua **Flow** | Theo gói |
| **Personal Intelligence** | Đọc ngữ cảnh từ Gmail, Drive, Calendar, Maps (có bảng điều khiển quyền riêng) | Theo gói |

::: tip 📌 Hai sản phẩm anh em phải biết
- **NotebookLM** (notebooklm.google.com) — dùng model Gemini, nhưng cách dùng khác: bạn **nạp tài liệu của mình làm "nguồn"**, rồi hỏi đáp có **trích dẫn ngược về nguồn**, tạo **Audio Overview** (podcast tự sinh), tóm tắt, slide. Đây là công cụ **RAG tài liệu cá nhân** cực mạnh — nó chỉ trả lời dựa trên tài liệu bạn đưa, ít bịa hơn chat thường. (Workflow lai với Deep Research ở Mục 03.)
- **Gemini trong Google Workspace** — tích hợp Gmail, Docs, Sheets, Slides, Drive, Meet, Chat, Vids: "Help me write", tóm tắt thread, tạo công thức Sheets, ghi chú cuộc họp. Từ ~1/2025 đã gộp miễn phí vào nhiều gói Workspace business/enterprise.
:::

::: tip ✨ Mới ở I/O 2026 (đang roll-out — đọc có chừng mực)
- **Gemini 3.5 Flash** đã GA — Google mô tả là nhanh nhưng vượt 3.1 Pro ở coding/agentic; **3.5 Pro** thì *theo nguồn tới giữa 2026* đang rollout dần, chưa rộng rãi.
- **Gemini Omni** — model "tạo bất cứ thứ gì từ bất cứ input nào", bắt đầu với video, có trên Plus/Pro/Ultra. **Spark** (agent 24/7, chạy trên 3.5) và **Project Genie** dành cho Ultra.
- *Lưu ý: đây là tính năng I/O 2026 mới, một số đang Beta hoặc giới hạn thị trường US — kiểm tra lại trước khi tin là đã có ở VN.*
:::

**Developer (AI Studio + API):** **AI Studio** (aistudio.google.com) là playground miễn phí — prompt, lấy API key, "vibe-code" app rồi deploy lên **Cloud Run**; truy cập Gemini/Veo/Imagen/Nano Banana/Gemma. **Build mode** dựng web app full-stack hoặc Android (Kotlin/Compose) bằng ngôn ngữ tự nhiên.

**Dùng Gemini khi:** bạn sống trong Google (Gmail/Docs/Drive), cần đa phương thức (ảnh/video/audio), cần context cực dài (1M token), hoặc cần giá tốt ở VN. **Cân nhắc kỹ khi:** việc cần trích dẫn chính xác tuyệt đối (pháp lý/y khoa) — Gemini bịa trích dẫn nhiều hơn Claude (xem dưới).

### So với công cụ khác — "khi nào chọn cái nào"

Không có công cụ "thắng mọi mặt". Gemini mạnh nhất ở **đa phương thức**, **context dài**, và **tích hợp Google**. Bảng dưới tổng hợp từ nhiều bài so sánh bên thứ ba (2026) — benchmark dao động theo nguồn nên xem là **tham khảo định hướng**, không phải con số tuyệt đối:

| Công cụ | Mạnh ở | Gói trả phí phổ biến (~USD/tháng) | Nên chọn khi |
|---|---|---|---|
| **Gemini** (Google) | Đa phương thức (ảnh/video/audio), context 1M token, tích hợp Workspace | Plus ~$8 · Pro ~$20 · Ultra ~$100+ | Sống trong Google, cần video/ảnh, tài liệu cực dài, giá VN tốt |
| **ChatGPT** (OpenAI) | All-rounder, hệ sinh thái plugin/integration rộng nhất | Plus ~$20 | Cần một trợ lý "tất cả trong một" đa năng |
| **Claude** (Anthropic) | Code chất lượng cao, suy luận đa file, tài liệu dài/formal, an toàn | Pro ~$20 | Lập trình nghiêm túc, viết dài bám-spec, ưu tiên an toàn |
| **Perplexity** | Search-first, độ chính xác trích dẫn cao nhất | Pro ~$20 | Tra cứu cần nguồn đáng tin, nghiên cứu nhanh có citation |
| **Grok** (xAI) | Truy cập trực tiếp luồng X, tốc độ nhanh nhất | ~$30 (đổi theo gói X) | Theo dõi tin nóng / mạng xã hội real-time |

*Giá USD tham chiếu (toàn cầu, theo nhiều nguồn tới giữa 2026), có thể chênh theo đợt khuyến mãi & khu vực — người Việt nên xem giá ₫ hiển thị trên trang chính chủ.*

::: tip 💡 Tóm tắt nhanh "ai mạnh mặt nào"
- **Đa phương thức + context dài + tích hợp công việc** → **Gemini** (cộng Veo/Nano Banana).
- **Chất lượng code & suy luận đa file** → **Claude** (một nguồn ghi SWE-bench Verified ~87.6% so với Gemini 3.1 Pro ~80.6% — *con số bên thứ ba, đọc có chừng mực*).
- **Độ chính xác trích dẫn / search realtime** → **Perplexity** (tỷ lệ "ảo" trích dẫn thấp nhất).
- **Tốc độ + dữ liệu mạng xã hội** → **Grok** (truy cập trực tiếp X).
- Nhiều người dùng **song song 2 công cụ** là chuyện bình thường — Gemini để nghĩ/nghiên cứu, Claude để code chẳng hạn.
:::

#### So riêng CLI coding (Antigravity vs Claude Code vs Codex)

Nếu bạn định **code bằng CLI agent**, đây là so sánh trực diện đáng cân nhắc nhất. Điểm gây tranh cãi lớn nhất của Antigravity là **hạn mức miễn phí tụt rất sâu** so với Gemini CLI cũ:

| Trục | **Antigravity CLI** (`agy`) | **Claude Code** | **Codex CLI** |
|---|---|---|---|
| Nguồn mở? | Closed-source | Closed-source | Mã nguồn mở (open) |
| Ngôn ngữ | Go (binary, không cần Node) | Node.js | Rust |
| Free quota/ngày | *theo cộng đồng tới giữa 2026:* ~**20 lượt/ngày** (Gemini CLI cũ từng ~1.000/ngày → giảm ~98%) | Theo gói Claude (Free hạn chế; Pro/Max nhiều hơn) | Theo gói ChatGPT |
| Tính năng agent | Giữ Agent Skills, Hooks, Subagents, Extensions; hỗ trợ MCP | Skills, Hooks, Subagents, MCP | Tool use, MCP |
| Độ chín | Mới (ra ~I/O 2026), cộng đồng phàn nàn chưa đủ feature parity | Chín, dùng rộng | Chín |

::: warning ⚠️ Free quota Antigravity ~20 lượt/ngày là điểm đau thật
*Theo phản ánh cộng đồng tới giữa 2026:* hạn mức miễn phí của Antigravity CLI rơi xuống mức **~20 lượt/ngày** — chỉ vài task là hết, khác xa Gemini CLI cũ (~1.000/ngày). Nếu code nhiều mà không muốn trả phí, cân nhắc **Claude Code / Codex** làm phương án dự phòng, hoặc nâng **Gemini Code Assist Standard** để có hạn mức cao hơn. Con số này hay đổi theo đợt — kiểm lại trước khi phụ thuộc.
:::

::: warning ⛔ Khi nào KHÔNG nên dùng Gemini (giới hạn thật)
Gemini giỏi nhiều việc, nhưng **không phải việc gì cũng hợp**. Tránh — hoặc luôn có người kiểm — ở các trường hợp:
- **Nội dung pháp lý / y khoa cần chính xác trích dẫn tuyệt đối** — một nguồn ghi Gemini "ảo" trích dẫn án lệ ~18% (so với Claude ~3%). *Con số từ bài so sánh bên thứ ba, chưa phải nghiên cứu chính thức* — nhưng đủ để **không tin tuyệt đối** với nội dung pháp lý/y khoa; luôn verify.
- **Dữ liệu nhạy cảm / bí mật trên bản cá nhân** — vì có human review + retention dài (xem Mục 04). Workspace enterprise thì khác.
- **Pipeline production cần CLI mã nguồn mở, ổn định lâu dài** — Gemini CLI vừa bị "khai tử" cho cá nhân (18/6/2026), Antigravity closed-source và chưa đủ feature parity lúc ra mắt → nếu cần open-source/ổn định, cân nhắc Claude Code/Codex hoặc chờ Antigravity chín.
- **Code base lớn cần độ tin cậy sửa đa file cao nhất** — nhiều benchmark cho Claude nhỉnh hơn.
- **Tác vụ cần dữ liệu mạng xã hội realtime** — Grok (truy cập X) phù hợp hơn.
- **Cần độ ổn định API tuyệt đối ngay lúc model vừa ra mắt** — giai đoạn Preview hay gặp lỗi 503 "overloaded" (xem Mục 04).
- **Nhận giọng tiếng Việt chuyên ngành / giọng địa phương trong Gemini Live / audio** — chất lượng nhận tiếng Việt nói (nhất là thuật ngữ, giọng vùng miền) thường còn yếu hơn tiếng Anh; hãy **thử trước** với một đoạn mẫu trước khi dùng cho việc quan trọng.
- **Cần kết quả ổn định / lặp lại được (reproducible)** — model đổi version liên tục (3 → 3.1 → 3.5 chỉ trong 6 tháng), output có thể lệch giữa các đời. **Đừng hard-code phụ thuộc cứng vào một version** trong sản phẩm; ghim version cụ thể qua API nếu cần ổn định.
:::

---

## 02 · Đăng ký & truy cập — bối cảnh VN

### Dùng được ở Việt Nam không? — **Có.**

Google đã **chính thức bán cả 3 gói tại VN** (không cần VPN). Nhiều báo trong nước (VnExpress, VietnamNet, vietbao) đưa tin gói **~122.000₫/tháng (~$5)**. **Bản Free không cần thẻ.**

::: warning 🎓 Ưu đãi sinh viên 1 năm Pro miễn phí — ĐÃ HẾT HẠN ĐĂNG KÝ
Cuối 2025 Google có mở đợt tặng **1 năm Google AI Pro miễn phí** (khi đó "powered by Gemini 2.5 Pro" + 2TB) cho sinh viên/HSSV VN, đăng ký qua `goo.gle/freeproVN` (xác minh SheerID). *Theo nguồn tới giữa 2026:* cửa đăng ký cho VN mở khoảng **8/10/2025 → 9/12/2025** và đợt 12 tháng này **đã đóng trên toàn cầu** (các mốc khu vực kéo dài tới ~tháng 3/2026). **Tới nay (giữa 2026) cửa đăng ký đã đóng — đừng coi như đang có sẵn.** Google thường mở lại theo đợt, nên kiểm `gemini.google/students` xem có đợt mới không.
:::

### Đăng nhập 30 giây (app — không cần cài)

```text
1. Mở https://gemini.google.com (hoặc tải app iOS / Android).
2. Đăng nhập bằng tài khoản Google của bạn.
3. Vào thẳng màn hình chat → gõ tiếng Việt là dùng được ngay (bản Free).
```

### Các gói & giá (giá VN lấy từ trang gemini.google/subscriptions, hiển thị bằng ₫)

| Gói | Giá VN (₫/tháng) | Nội dung chính |
|---|---|---|
| **Free** | 0 | 3.5 Flash + nhiều cấp 3.1 Pro; tạo ảnh, Deep Research, Live, Canvas, Gems; 15 GB |
| **AI Plus** | ~132.000 (báo VN: 122.000; giảm 50% 6 tháng đầu → ~61.000) | 2× hạn mức, tạo video, 200 Flow credits, NotebookLM nâng cao, 200 GB |
| **AI Pro** | ~489.000 | 4× hạn mức, "3.1 Pro" + tính năng nâng cao, 1.000 Flow credits, 5 TB, YouTube Premium Lite |
| **AI Ultra** | ~2.250.000 (5× Pro) / ~5.500.000 (20× Pro) | Deep Think (sớm, US/English), 10.000–25.000 Flow credits, 20+ TB |

::: tip 💡 Lưu ý về giá (đọc trước khi rút ví)
- Giá USD tham chiếu (toàn cầu, theo nhiều nguồn): Plus ~$7.99, Pro ~$19.99, Ultra ~$99.99–$249.99 (I/O 2026 hạ tier cao). Có chênh nhỏ giữa các nguồn → **dùng số hiển thị trên trang chính thức của bạn ở VN** là chuẩn nhất.
- Bản **Free khá hào phóng** — đã có Deep Research, tạo ảnh, Live. Đủ cho phần lớn người học. Đừng vội trả phí.
- **Sinh viên VN:** đợt tặng 1 năm Pro đã hết hạn đăng ký (xem hộp ở trên) — nếu Google mở đợt mới thì tranh thủ, còn không thì cứ bắt đầu với bản Free.
:::

### Thanh toán ở VN

Qua **Google Play / Google One** bằng thẻ quốc tế (Visa/Mastercard); một số ví/thẻ nội địa hỗ trợ qua Google Play.

::: warning ⚠️ Nguồn mỏng về phương thức nội địa
Danh sách phương thức thanh toán **nội địa** chính xác (ví/thẻ nào) thay đổi theo thời điểm và **chưa có nguồn chắc**. Hãy kiểm lại trực tiếp trên **Google One** lúc mua. Nếu thẻ nội địa bị từ chối, thử thẻ Visa/Mastercard quốc tế hoặc kênh mà Google One gợi ý cho VN.
:::

### Developer — AI Studio miễn phí, không cần thẻ

```text
1. Mở https://aistudio.google.com → đăng nhập Google.
2. Lấy API key (có free tier) hoặc vào tab Build để "vibe-code" app.
3. Không cần thẻ tín dụng để bắt đầu.
```

::: warning 🔁 Thay đổi đáng chú ý: model Pro rời khỏi free tier API
- **Free tier API** còn **Flash / Flash-Lite** miễn phí, nhưng **từ 1/4/2026 model Pro bị bỏ khỏi free tier** → muốn dùng Pro qua API phải trả tiền.
- Free tier có giới hạn **~5 request/phút** — đủ thử nghiệm, **quá ít cho app chia sẻ nhiều người** → nâng tier hoặc throttle phía client.
- **Giá API tham khảo (bên thứ ba):** Gemini 3.1 Pro ~**$2.00 input / $12.00 output** mỗi 1M token (≤200K); vượt 200K tăng lên ~$4/$18. Flash-Lite ~$0.10–$0.40/1M. Batch API rẻ hơn ~một nửa.
:::

::: warning 🔒 Dữ liệu free tier AI Studio / Gemini API CÓ THỂ bị dùng để cải thiện model
Điểm sống còn cho dev hay prototype: *theo chính sách Google tới giữa 2026,* prompt/nội dung gửi qua **free tier (AI Studio / Gemini API không trả phí)** **có thể được dùng để cải thiện sản phẩm** (gồm cả human review). **Paid tier thì KHÔNG** dùng dữ liệu của bạn để train. → **Đừng prototype bằng dữ liệu khách hàng / dữ liệu thật trên free tier.** Trước khi chốt, kiểm chính sách hiện hành tại `ai.google.dev/gemini-api/terms`.
:::

### Cài CLI coding — **Antigravity CLI** (thay Gemini CLI)

Google đóng **Gemini CLI** (mã nguồn mở) cho người dùng Free/AI Pro/Ultra từ **18/06/2026**, thay bằng **Antigravity CLI** (closed-source, viết bằng Go, lệnh `agy`). Đây là cách cài chuẩn từ nay:

```bash
# macOS / Linux
curl -fsSL https://antigravity.google/cli/install.sh | bash

# Windows PowerShell
irm https://antigravity.google/cli/install.ps1 | iex

# Chạy (binary tên 'agy', KHÔNG cần Node.js)
agy
```

Lần đầu chạy `agy` sẽ mở trình duyệt đăng nhập Google; qua SSH/headless nó in URL + mã one-time. Antigravity giữ **Agent Skills, Hooks, Subagents, Extensions** (đóng gói thành plugin).

::: details Cài Gemini CLI cũ (chỉ còn ý nghĩa với org Standard/Enterprise)
Với **cá nhân**, Gemini CLI **hết phục vụ từ 18/6/2026** — phần này chỉ còn dùng được nếu bạn là khách **Gemini Code Assist Standard/Enterprise** (API key trả phí) hoặc org dùng qua Google Cloud.

```bash
npx @google/gemini-cli            # chạy không cài
npm install -g @google/gemini-cli  # cài global (cần Node 18+, khuyến nghị 20+)
```
:::

::: warning 🚧 BƯỚC NGOẶT QUAN TRỌNG: Gemini CLI → Antigravity (đọc kỹ nếu bạn code bằng CLI)
Google chuyển **Gemini CLI (open-source) → Antigravity CLI (closed-source)** cho người dùng cá nhân từ **18/06/2026**. Chỉ giữ Gemini CLI cho khách **Standard/Enterprise**. Cộng đồng phản ứng mạnh vì:
- Chuyển từ **mở sang đóng** (mất tính minh bạch/khả năng tự sửa).
- **Chưa đủ feature parity** lúc ra mắt (theregister, FOSS Force, Hacker News đều ghi nhận).

→ Nếu pipeline của bạn cần **CLI mã nguồn mở, ổn định lâu dài**, cân nhắc **Claude Code / Codex**, hoặc chờ Antigravity chín. Đừng xây quy trình quan trọng phụ thuộc cứng vào một CLI đang trong giai đoạn chuyển đổi.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có prompt thật)

Đây là 4 quy trình "đi từ đầu đến xong việc". Mỗi bước có cách **tự kiểm** (verify) để biết mình làm đúng.

### A) Deep Research trong app — báo cáo có trích dẫn

**Bước 1 — Bật Deep Research.**
Mở [gemini.google.com](https://gemini.google.com) → chọn **Deep Research** (hoặc bật từ menu công cụ).
→ **Verify:** thấy chế độ Deep Research được chọn ở thanh công cụ.

**Bước 2 — Gõ prompt rõ ràng.**

```text
Nghiên cứu sâu về [chủ đề]. Lập dàn ý các chủ đề con, so sánh quan điểm
trái chiều, ưu tiên nguồn 2025–2026, kèm bảng so sánh và danh sách trích dẫn.
Nếu nguồn nào không chắc, hãy ghi rõ thay vì đoán.
```

**Bước 3 — Duyệt kế hoạch.**
Gemini đề xuất một **kế hoạch** (các chủ đề con nó sẽ tìm) → bạn chỉnh/duyệt → nó tự duyệt web vài phút → trả về báo cáo.
→ **Verify:** kế hoạch bám đúng ý bạn; báo cáo có link nguồn click được, không phải link 404.

**Bước 4 — Xuất ra Docs.**
Bấm xuất sang **Google Docs** để chỉnh sửa và lưu.
→ **Verify:** mở Doc thấy nội dung + trích dẫn đầy đủ.

### B) Workflow lai Deep Research + NotebookLM (rất mạnh cho học/nghiên cứu)

Đây là combo "điểm ngọt" của hệ sinh thái Google — kết hợp **tìm web rộng** (Deep Research) với **RAG tài liệu cá nhân có trích dẫn ngược** (NotebookLM):

```text
1. Gemini Deep Research: gom thông tin web về chủ đề → copy/export báo cáo.
2. Vào notebooklm.google.com → tạo notebook mới.
3. Add báo cáo đó làm Source + thêm PDF/tài liệu gốc của bạn.
4. Hỏi đáp có trích dẫn NGƯỢC về nguồn; tạo Audio Overview (podcast);
   gom cụm insight thành framework.
```

→ **Verify:** mỗi câu trả lời trong NotebookLM **link ngược đúng đoạn trong nguồn** bạn đã nạp (đây là điểm khác biệt — NotebookLM chỉ trả lời dựa trên nguồn của bạn, ít bịa hơn chat thường).

### C) Coding với Antigravity CLI

```bash
agy                      # mở TUI agent trong thư mục dự án
# trong phiên: mô tả task bằng tiếng Việt/Anh, agent đọc/sửa nhiều file,
# gọi tool, giữ history của phiên
```

**Cấu hình ngữ cảnh cho dự án** — tạo một file mô tả dự án (kế thừa khái niệm **file context** kiểu `GEMINI.md` của Gemini CLI): đặt mô tả dự án, quy ước code, lệnh build, để agent đọc đúng bối cảnh:

```text
# File context dự án (ví dụ nội dung)
Dự án: web app quản lý đơn hàng (React + Supabase).
Quy ước: TypeScript, không dùng any; component đặt trong src/components.
Lệnh build: npm run build. Lệnh test: npm run test.
KHÔNG sửa file trong thư mục /legacy.
```

::: warning 📁 Tên file context & đường dẫn MCP của Antigravity KHÁC Gemini CLI cũ
Gemini CLI cũ dùng `GEMINI.md` cho context và `~/.gemini/settings.json` cho MCP. **Antigravity đã đổi convention** — tên file context, định dạng và đường dẫn cấu hình MCP **không giống** CLI cũ. Đừng học theo convention của tool đã bị khai tử: tra **tên file & đường dẫn chính xác tại `antigravity.google/docs/cli-getting-started`** rồi mới tạo.
:::

→ **Verify:** chạy `agy` trong repo, agent đọc được file context và làm đúng quy ước bạn ghi (ví dụ không đụng vào /legacy).

### D) AI Studio Build mode — dựng app không cần hạ tầng

```text
1. aistudio.google.com → tab Build → mô tả app bằng tiếng Việt/Anh.
2. Agent sinh code (tự tạo ảnh placeholder bằng Nano Banana), cho preview.
3. Deploy lên Cloud Run NGAY trong AI Studio,
   hoặc lấy API key nhúng vào app riêng của bạn.
```

→ **Verify:** preview chạy đúng mô tả; nếu deploy, mở được URL Cloud Run.

::: tip ⚙️ Mẹo làm việc trong git trước khi để agent sửa file
Trước khi chạy `agy` (hoặc bất kỳ agent sửa file tự động nào): **commit git một bản sạch trước**, làm việc trong repo sạch, **review từng diff**, chia task nhỏ. Có ghi nhận CLI **tự xóa/sửa nhầm code** trong phiên dài (xem Mục 04/06) — commit trước là lá chắn rẻ nhất.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 🟢 Mẹo ăn tiền

::: tip 7 mẹo dùng Gemini như dân chuyên
1. **Sống trong Google thì bật Personal Intelligence** — cho Gemini đọc Gmail/Drive/Calendar để nó hiểu ngữ cảnh việc của bạn (nhưng xem hộp quyền riêng tư bên dưới về dữ liệu nhạy cảm).
2. **Việc nghiên cứu → Deep Research; tài liệu của bạn → NotebookLM.** Đừng bắt chat thường gánh cả hai — NotebookLM trích dẫn ngược chuẩn hơn nhiều.
3. **Context 1M token là lợi thế thật** — dán cả tài liệu dài / nhiều file vào một lần thay vì cắt nhỏ.
4. **Cho phép AI nói "không chắc":** thêm *"nếu không có nguồn, hãy nói không chắc"* → giảm bịa rõ rệt, đặc biệt với trích dẫn.
5. **Gặp lỗi 503 "overloaded"? Đổi sang Flash.** Model Flash hồi nhanh hơn Pro khi server quá tải (xem FAQ).
6. **Để agent (CLI) sửa file → luôn trong git repo sạch + review diff.** Phiên dài có rủi ro xóa nhầm.
7. **Sinh viên VN: kích hoạt 1 năm Pro miễn phí** trước khi nghĩ tới trả tiền; AI Studio cũng free cho dev.
:::

### 🔴 Lỗi & cạm bẫy (đọc kỹ — phần này cứu bạn)

::: warning 🚨 Hallucination trích dẫn — cạm bẫy số 1 của Gemini
Gemini có thể **rất tự tin trích dẫn nguồn không tồn tại**, đặc biệt nội dung pháp lý/y khoa. Một nguồn bên thứ ba ghi tỷ lệ "ảo" trích dẫn **~18% (so với Claude ~3%)** — *con số chưa phải nghiên cứu chính thức*, nhưng đủ để:
- **Không tin tuyệt đối** với nội dung pháp lý/y khoa.
- **LUÔN verify** mọi citation/số liệu trước khi đưa vào văn bản chính thức.
- Ưu tiên **NotebookLM** (trích dẫn ngược về nguồn bạn nạp) hoặc **Perplexity** khi cần độ chính xác nguồn cao.
:::

::: warning ⚠️ Các bẫy khác cần nhớ
- **CLI tự xóa/sửa nhầm code** trong phiên dài ("state degradation") → luôn làm việc trong git repo sạch, review từng diff, chia task nhỏ.
- **Model Pro biến mất khỏi free tier API (từ 1/4/2026)** → chỉ còn Flash/Flash-Lite free; đổi model hoặc trả phí.
- **Gemini CLI ngừng phục vụ cá nhân (18/6/2026)** → chuyển sang `agy` (Antigravity) hoặc license Standard/Enterprise.
- **Free tier API 5 req/phút** quá ít cho app chia sẻ → nâng paid tier hoặc throttle phía client.
- **Tính năng I/O 2026 (Gemini Omni/3.5/Spark)** còn đang roll-out, một phần giới hạn US — đừng giả định đã có ở VN.
:::

::: warning 🔒 Quyền riêng tư & dữ liệu — đọc kỹ nếu dùng cho công việc
Phần này rất quan trọng với người Việt dùng Gemini cho việc công ty. Thông tin theo tài liệu Google tới đầu 2026:

**(a) App Gemini (tài khoản cá nhân) — dữ liệu đi đâu?**
- Mặc định **lưu hội thoại** (Gemini Apps Activity), retention mặc định **18 tháng** (đổi được 3 hoặc 36 tháng).
- Google **lấy mẫu một phần chat cho người review** (gồm reviewer của nhà cung cấp dịch vụ) để cải thiện model; **conversation bị reviewer chạm vào có thể giữ tới 3 năm** — và **không nên dán dữ liệu nhạy cảm** vào.

**(b) Cách tắt training / human review (gói cá nhân):**
- Vào **myactivity.google.com/product/gemini** → tắt **Keep Activity**; hoặc **myaccount.google.com → Data & Privacy → Gemini Apps Activity → Turn off**.
- Tắt rồi thì **chat mới không gửi review / không dùng để train**.

**(c) Gemini trong Workspace (doanh nghiệp) — khác hẳn bản cá nhân:**
- Prompt và nội dung **ở trong tổ chức, không chia sẻ ra ngoài, không train model công khai**; áp dụng kiểm soát enterprise (data-region, DLP).

**(c2) AI Studio / Gemini API:** *theo chính sách tới giữa 2026* — **free tier** thì prompt **có thể được dùng để cải thiện model**; **paid tier** thì **không**. → Đừng prototype bằng dữ liệu khách hàng trên free tier (xem Mục 02). Kiểm `ai.google.dev/gemini-api/terms` trước khi chốt.

**(d) TUYỆT ĐỐI không dán những thứ sau vào bản cá nhân:**
- Số CMND/CCCD, số thẻ ngân hàng, mật khẩu, OTP.
- Hợp đồng/NDA, tài liệu mật, mã nguồn độc quyền.
- Dữ liệu cá nhân của khách hàng (họ tên, SĐT, địa chỉ, hồ sơ) — ở VN, việc này có thể **vi phạm Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân**.

**(e) Khi cho agent (CLI) sửa file tự động:** có rủi ro xóa/sửa nhầm → **commit git trước, review diff**.
:::

::: details ❓ FAQ & lỗi hay gặp (bấm để mở)
**Lỗi 503 "model is overloaded" / "Deadline Expired" — làm sao?**
Đây là **server Google quá tải**, KHÔNG phải lỗi quota/billing của bạn. Cách xử lý: (1) **đừng tăng timeout**; (2) dùng **exponential backoff retry**; (3) chờ 5–30 phút (≈70% hồi trong 60 phút); (4) **fallback sang Gemini 2.5/3 Flash** (hồi nhanh 5–15 phút). Hay xảy ra khi model Preview vừa ra (vd đợt 19/02 & 26/02/2026).

**Lỗi 429 RESOURCE_EXHAUSTED — có giống 503 không?**
**Khác hẳn.** 429 mới là **quota / rate-limit cá nhân của bạn** → giảm tần suất, nâng tier, hoặc dùng **Batch API**. Đừng nhầm 429 (lỗi của bạn) với 503 (lỗi server Google).

**Free tier API chỉ 5 req/phút — app của tôi share nhiều người thì sao?**
Quá ít cho app chia sẻ → **nâng lên paid tier** hoặc **throttle phía client** (xếp hàng request). Cân nhắc Batch API nếu chạy theo lô.

**CLI tự xóa/sửa nhầm code của tôi?**
Có ghi nhận điều này trong phiên dài. Phòng: luôn làm việc trong **git repo sạch**, **review từng diff**, **chia task nhỏ**, commit thường xuyên.

**Tôi là cá nhân, Gemini CLI báo ngừng phục vụ?**
Đúng — từ **18/6/2026** Gemini CLI hết phục vụ cá nhân. Chuyển sang **`agy` (Antigravity)** hoặc dùng license **Standard/Enterprise**.

**Gemini trả lời tiếng Anh dù tôi hỏi tiếng Việt?**
Thêm câu lệnh rõ: *"Luôn trả lời bằng tiếng Việt."* hoặc đặt sẵn trong Gems/Saved info để khỏi nhắc lại.

**Model Pro biến mất trong AI Studio?**
Từ **1/4/2026** model Pro bị bỏ khỏi **free tier API** — chỉ còn Flash/Flash-Lite free. Đổi model hoặc trả phí.

**Antigravity CLI (`agy`) báo hết quota sau ~20 lượt/ngày?**
Đây là phàn nàn phổ biến nhất của cộng đồng — *theo phản ánh tới giữa 2026,* free quota Antigravity chỉ ~**20 lượt/ngày** (Gemini CLI cũ ~1.000/ngày). Cách xử lý: kiểm hạn mức còn lại trong phiên; nếu code nhiều thì nâng **Gemini Code Assist Standard** để có hạn mức cao hơn, hoặc dùng **Claude Code / Codex** làm phương án dự phòng. Con số quota hay đổi theo đợt — kiểm lại tại `antigravity.google/docs`.

**Cài Antigravity xong gõ `agy` báo "command not found"?**
Trình cài drop binary vào `~/.local/bin`, thư mục này có thể **chưa nằm trong PATH**. Cách sửa: thêm `~/.local/bin` vào PATH (ví dụ trong `~/.zshrc` / `~/.bashrc`) rồi mở lại terminal; hoặc gọi bằng đường dẫn đầy đủ `~/.local/bin/agy` để kiểm tra trước.

**SheerID không xác minh được trường đại học Việt Nam (khi đăng ký ưu đãi sinh viên)?**
Lỗi kinh điển khi đợt ưu đãi còn mở: SheerID đôi khi không có sẵn tên trường VN trong danh sách. Cách thường dùng: chọn "trường không có trong danh sách" rồi **tải lên giấy tờ chứng minh** (thẻ sinh viên/email .edu), hoặc thử lại với tên trường tiếng Anh chính thức. *Lưu ý:* tới giữa 2026 cửa đăng ký đã đóng (xem Mục 02) — phần này chỉ hữu ích nếu Google mở lại đợt mới.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm thật 2–3 bài dưới đây để biến "đọc hiểu" thành "làm được". Mỗi bài có tiêu chí hoàn thành rõ ràng.

### 🧪 Bài 1 — Deep Research có kiểm chứng (cơ bản)

**Mục tiêu:** chạy một báo cáo Deep Research và luyện phản xạ verify nguồn.

1. Vào [gemini.google.com](https://gemini.google.com) → bật **Deep Research**.
2. Dùng prompt:

```text
Nghiên cứu sâu về "xu hướng xe điện tại Việt Nam 2025–2026".
So sánh quan điểm trái chiều, kèm bảng số liệu và danh sách trích dẫn.
Nếu số nào không có nguồn chắc, ghi rõ "không chắc" thay vì đoán.
```

3. **Mở 3 link nguồn bất kỳ** trong báo cáo, kiểm xem chúng có thật (không 404) và đúng nội dung Gemini trích không.

**✅ Đạt khi:** bạn có báo cáo + xác nhận được ít nhất 3 nguồn là thật và khớp (hoặc **bắt được** một nguồn bịa/sai — bài học còn quý hơn).

### 🧪 Bài 2 — RAG tài liệu cá nhân với NotebookLM (quan trọng)

**Mục tiêu:** trải nghiệm trích dẫn ngược — cách giảm bịa mạnh nhất của hệ sinh thái Google.

1. Vào [notebooklm.google.com](https://notebooklm.google.com) → tạo notebook → nạp **1–2 file PDF của bạn** (tài liệu học, báo cáo) làm Source.
2. Hỏi:

```text
Tóm tắt tài liệu này thành 5 ý chính. Với mỗi ý, trích dẫn ngược
đúng đoạn trong nguồn. Nếu thông tin không có trong tài liệu,
ghi rõ "không có trong nguồn".
```

3. Bấm vào từng **trích dẫn ngược**, kiểm nó nhảy đúng đoạn trong file gốc.
4. (Tùy chọn) Tạo **Audio Overview** để nghe bản podcast tự sinh.

**✅ Đạt khi:** mỗi ý đều link ngược đúng đoạn nguồn; bạn thấy rõ NotebookLM **bám tài liệu** chứ không bịa thêm.

### 🧪 Bài 3 — Vibe-code một app nhỏ trong AI Studio (nâng cao nhẹ)

::: warning Không cần thẻ
AI Studio miễn phí, không cần thẻ tín dụng để bắt đầu.
:::

**Mục tiêu:** dựng một app chạy được từ mô tả tiếng Việt.

1. Vào [aistudio.google.com](https://aistudio.google.com) → tab **Build**.
2. Mô tả app, ví dụ:

```text
Tạo một web app "máy tính chia tiền nhóm": nhập tổng hóa đơn và số người,
hiển thị số tiền mỗi người, có nút làm tròn lên. Giao diện tiếng Việt, đẹp, mobile-friendly.
```

3. Xem **preview**, chỉnh thêm vài câu nếu cần.
4. (Tùy chọn) Deploy lên **Cloud Run** ngay trong AI Studio.

**✅ Đạt khi:** app preview chạy đúng (nhập số → ra kết quả chia đúng). Nếu deploy được URL Cloud Run thì điểm cộng.

### 🧪 Bài 4 — Coding với Antigravity CLI trong repo sạch (nâng cao)

::: warning ⚠️ Lưu ý quota
Free quota Antigravity ~**20 lượt/ngày** (*theo cộng đồng tới giữa 2026*) — đủ cho bài tập nhỏ này, nhưng đừng phung phí. Luôn **commit git một bản sạch trước** khi để agent sửa file.
:::

**Mục tiêu:** trải nghiệm agent CLI sửa file thật + phản xạ an toàn (git + review diff).

1. Cài Antigravity CLI (xem Mục 02). Nếu gõ `agy` báo "command not found" → thêm `~/.local/bin` vào PATH.
2. Vào một repo nhỏ (hoặc tạo mới), **`git init` + commit một bản sạch**.
3. Tạo file context dự án (tra tên file đúng tại `antigravity.google/docs/cli-getting-started`), ghi 1–2 quy ước, ví dụ "KHÔNG sửa thư mục /legacy".
4. Chạy `agy`, giao một task nhỏ bằng tiếng Việt (ví dụ: *"thêm hàm tính tổng hóa đơn và viết test cho nó"*).
5. **Review từng diff** trước khi chấp nhận; chạy `git diff` để kiểm agent có đụng nhầm file ngoài phạm vi không.

**✅ Đạt khi:** agent hoàn thành task đúng quy ước (không đụng /legacy), bạn review được diff, và biết cách `git restore` nếu nó sửa nhầm.

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom các ví dụ **có thật** từ blog, công bố chính thức của Google, và tổng hợp thảo luận cộng đồng (Hacker News, Medium) tới đầu 2026. Mục đích: cho bạn thấy Gemini chạy ra sao **ngoài đời thật** — cả lúc tỏa sáng lẫn lúc thành cái bẫy.

::: warning ⚠️ Đọc kỹ về độ tin của nguồn
Một phần nội dung dưới đây là **trải nghiệm cá nhân / second-hand** — tức blog dev, post Hacker News, hoặc vendor claim của Google. Vì vậy:
- Các nhận định kiểu "tiện nhưng hay bỏ sót" là **đánh giá chủ quan** của tác giả → đọc với thái độ cân bằng.
- Số liệu do **Google tự công bố** (vd Deep Think đạt huy chương vàng IMO) là **vendor claim** — nên cân nhắc.
- Phần nào **chắc chắn** (official Google / báo) được ghi rõ; phần nào chỉ là "theo blog cá nhân" cũng ghi rõ.
:::

### 🔬 CS1 — Literature review khoa học vật liệu: tiện, nhưng hay bỏ sót paper chuyên sâu

- **Bối cảnh:** Một researcher (nền PhD computational materials) test **Deep Research** để làm tổng quan tài liệu về "generative models cho cấu trúc tinh thể vô cơ".
- **Làm gì:** Đối chiếu kết quả Deep Research với **27 paper** trong thư viện cá nhân của họ.
- **Kết quả / bài học:** Tiện, nhưng mỗi công cụ deep-research có "khẩu vị" chọn paper **khác nhau**, và **hay bỏ sót tài liệu chuyên sâu / đứng sau paywall**. → Deep Research tốt để **phác khung & tìm hướng**, nhưng **không thay được việc tự đọc paper gốc** cho nghiên cứu nghiêm túc.
- **Nguồn:** Blog Xiangyu Yin (2026) — *trải nghiệm cá nhân của một researcher*.

### 🏛️ CS2 — STOC 2026 dùng Gemini tạo phản hồi tự động cho bài nộp

- **Bối cảnh:** **STOC 2026** (hội nghị lý thuyết khoa học máy tính hàng đầu) dùng Gemini để tạo **phản hồi tự động** cho các bài nộp.
- **Kết quả:** Có testimonial của **GS. Shuchi Chawla** khen kết quả **vượt kỳ vọng**.
- **Bài học:** Gemini đủ mạnh để hỗ trợ quy trình học thuật nghiêm túc (sàng lọc/phản hồi), không chỉ chat dạo. Nhưng đây là **bối cảnh có chuyên gia giám sát** — không phải để thay reviewer người.
- **Nguồn (official):** research.google blog (2026).

### 📝 CS3 — Master thesis 5G Anomaly Detection: dựng "skeleton" rồi edit thẳng trong Docs

- **Bối cảnh:** Một sinh viên làm luận văn thạc sĩ về **5G Anomaly Detection**.
- **Làm gì:** Dùng Gemini dựng một **"skeleton" ~1.000 từ** cho phần literature review, rồi **edit thẳng trong Google Docs**.
- **Kết quả / bài học:** Đây là điểm ngọt thực tế của Gemini với người Việt làm luận văn — **dựng khung nhanh + chỉnh trong Docs** (tích hợp Workspace), thay vì viết từ trang trắng. Vẫn phải tự viết lại/kiểm nội dung học thuật.
- **Nguồn:** UCStrategies / nguồn tổng hợp (2026).

### 📊 CS4 — NotebookLM cho Quarterly Business Review & battlecard sales

- **Bối cảnh:** Đội ngũ doanh nghiệp dùng **NotebookLM** cho **Quarterly Business Review (QBR)** và sales.
- **Làm gì:** Nạp tài liệu chiến lược → nhận **storyline cho deck**, **talking points cho lãnh đạo**, và Q&A mà **mỗi câu trả lời link ngược về nguồn**. Sales team biến product brief / pricing / win-loss thành **battlecard**.
- **Kết quả / bài học:** NotebookLM tỏa sáng ở **RAG tài liệu nội bộ có trích dẫn** — đúng việc cần độ tin cậy (lãnh đạo hỏi "nguồn đâu?" thì bấm vào xem ngay). Mô hình này áp dụng được cho mọi đội ở VN có kho tài liệu riêng.
- **Nguồn:** UCStrategies; Medium @nitinfab (2026).

### 🏆 CS5 — Gemini 3 Hackathon ($100k): build sản phẩm thật dưới ràng buộc thời gian

- **Bối cảnh:** **Gemini 3 Hackathon** ($100k, 12/2025–02/2026).
- **Làm gì:** Developer **Nisrine Amimi** thuật lại trải nghiệm build một sản phẩm thật dưới ràng buộc thời gian với Gemini 3.
- **Kết quả / bài học:** Cô mô tả nó **"khác hẳn việc chỉ nói về AI"** — tức giá trị thật đến khi **bắt tay ship sản phẩm** dưới deadline, không phải đọc demo. Bài học cho người học: học AI qua **làm dự án thật** ngấm hơn nhiều.
- **Nguồn:** Medium / Google Cloud Community — *trải nghiệm cá nhân*.

::: warning ⚠️ CS6 — Vibe-coding với Gemini 3 trong CLI: mạnh "one-shot" nhưng CLI tự xóa nhầm code (bẫy thật)
- **Bối cảnh:** Bài "5 things to try" vibe-coding với **Gemini 3 Pro trong Gemini CLI**, được thảo luận trên **Hacker News**.
- **Diễn biến:** Cộng đồng ghi nhận model mạnh khi **"one-shot"** (làm xong trong một lần), **nhưng** có vụ **CLI tự xóa nhầm code** trong phiên dài.
- **Bài học:** Đây là cảnh báo **trust boundary** kinh điển — khi để agent sửa file tự động, **luôn commit git trước, review diff, chia task nhỏ**. Sức mạnh "one-shot" không bù được rủi ro mất code nếu bạn không có lưới an toàn.
- **Nguồn:** Hacker News (2026) — *tổng hợp thảo luận cộng đồng*.
:::

::: tip ⚖️ Một góc nhìn trái chiều (để cân bằng)
Một **cựu nhân viên Google** từng nói Gemini là model **"gây ức chế nhất"** họ từng dùng cho dev (paraphrase, không gắn @handle). Nêu ra đây không phải để dìm — mà để bạn thấy **không phải mọi trải nghiệm đều tích cực**. Trải nghiệm thực tế phụ thuộc rất nhiều vào loại task: Gemini tỏa sáng ở nghiên cứu/đa phương thức/context dài, nhưng coding đa file thì nhiều người vẫn thấy Claude nhỉnh hơn.
:::

### 📚 Nguồn đáng chú ý (tiêu đề + bối cảnh)

Đây là các nguồn truy cập được — official Google, blog cá nhân, và thảo luận cộng đồng:

**Nguồn chính thức có link (tin được):**
- Gemini 3 (blog ra mắt, official) — https://blog.google/products/gemini/gemini-3/
- Gemini 3.1 Pro model card (official DeepMind) — https://deepmind.google/models/model-cards/gemini-3-1-pro/
- Thông báo chuyển Gemini CLI → Antigravity (official) — https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
- Quyền riêng tư Gemini Apps (official support) — https://support.google.com/gemini/answer/13594961

**Ví dụ minh họa (không phải nguồn trích dẫn được — chỉ kể lại để bạn hình dung):**
- Trải nghiệm literature review materials science (blog researcher cá nhân) — *minh họa, chưa kèm URL kiểm chứng được*.
- STOC 2026 dùng Gemini phản hồi bài nộp (research.google blog) — *official Google, tra trên research.google nếu cần kiểm*.
- NotebookLM cho QBR & battlecard doanh nghiệp (tổng hợp Medium/UCStrategies) — *minh họa, chưa kèm URL kiểm chứng được*.

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 5 điều mang theo
1. **Gemini = cả một họ sản phẩm** (model nền + app chat + Workspace + dev tools), mạnh nhất khi bạn sống trong Google.
2. **Đa phương thức + context 1M token + Deep Research/NotebookLM** là điểm ngọt — nghiên cứu, ảnh/video, tài liệu dài.
3. **Chống bịa = cho phép nói "không chắc" + ưu tiên NotebookLM (trích dẫn ngược) + LUÔN verify** (Gemini bịa trích dẫn nhiều hơn Claude).
4. **Người Việt dùng được hợp pháp**; bản **Free hào phóng** đủ cho phần lớn việc học. (Đợt ưu đãi sinh viên 1 năm Pro **đã hết hạn đăng ký** — kiểm `gemini.google/students` xem có đợt mới.)
5. **Bước ngoặt CLI:** Gemini CLI ngừng phục vụ cá nhân **18/6/2026** → dùng **`agy` (Antigravity)**, nhưng free quota chỉ ~20 lượt/ngày. Để agent sửa file thì **commit git + review diff**.
:::

### Link chính thức từ Google (nên bookmark)

Đây là các trang **chính chủ** để bạn tự kiểm tra thông tin mới nhất — luôn tin các link này hơn bài tổng hợp của bên thứ ba:

- **App chat Gemini:** https://gemini.google.com
- **Gói & giá:** https://gemini.google/subscriptions/
- **Developer / Gemini API:** https://ai.google.dev (giá: https://ai.google.dev/gemini-api/docs/pricing)
- **Gemini 3 (blog ra mắt):** https://blog.google/products/gemini/gemini-3/
- **Gemini 3.1 Pro model card:** https://deepmind.google/models/model-cards/gemini-3-1-pro/
- **Antigravity (CLI getting started):** https://antigravity.google/docs/cli-getting-started
- **Thông báo Gemini CLI → Antigravity:** https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
- **Quyền riêng tư Gemini Apps:** https://support.google.com/gemini/answer/13594961

::: details 🔎 Ghi chú độ chắc chắn (research tới đầu 6/2026)
- **Chắc chắn (nguồn chính thức Google):** giá VN trên trang subscriptions (hiển thị ₫), ngày ra Gemini 3 (18/11/2025), việc đóng Gemini CLI 18/6/2026, lệnh cài Antigravity, chính sách privacy/retention 18 tháng, AI Studio free.
- **Tương đối chắc (báo VN uy tín):** gói ~122.000₫/$5 tại VN. Ưu đãi sinh viên 1 năm Pro **đã từng có thật nhưng đóng đăng ký** (mốc VN ~8/10–9/12/2025) — không còn hiệu lực ở thời điểm hiện tại.
- **Tham khảo/bên thứ ba (gắn "~"/hedge):** mọi benchmark so sánh (SWE-bench Claude ~87.6% vs Gemini 3.1 Pro ~80.6%, tỷ lệ ảo trích dẫn 18% vs 3%, các điểm Deep Think), giá API per-token, free quota Antigravity ~20/ngày vs Gemini CLI cũ ~1.000/ngày, đường dẫn cấu hình Antigravity mới.
- **Nguồn mỏng / link cần kiểm khi build:** danh sách phương thức thanh toán nội địa VN; tên/chi tiết model I/O 2026 (3.5 Flash đã GA, 3.5 Pro/Omni/Spark còn roll-out, một phần giới hạn US); URL `gemini.google/subscriptions/` và `support.google.com/gemini/answer/13594961` (ID bài support có thể đổi — mở thử trước khi tin).

*Số liệu (giá, model, tính năng) có thể đã thay đổi — luôn kiểm tra lại tại gemini.google.com và ai.google.dev.*
:::
