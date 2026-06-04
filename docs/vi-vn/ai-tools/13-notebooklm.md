---
title: 'NotebookLM — Trợ lý nghiên cứu chỉ trả lời từ tài liệu của bạn (kèm trích dẫn)'
description: 'Hướng dẫn thực chiến NotebookLM (Google) cho người Việt: hỏi-đáp có trích dẫn chống bịa, tạo podcast 2 host AI tiếng Việt, Studio sinh mind map/quiz/slide, gói & giá tại VN (122k–489k–~6 triệu/tháng), workflow tải nguồn, prompt thật và bài tập.'
---

# NotebookLM — Trợ lý nghiên cứu chỉ trả lời từ tài liệu của bạn

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">📓</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn là sinh viên năm 3, mai thi môn có **6 chương giáo trình PDF + 4 bài giảng slide** mà chưa đọc hết. Mở **NotebookLM**, kéo cả 10 file vào một notebook, gõ tiếng Việt: *“Tóm tắt 5 ý cốt lõi mỗi chương, ghi rõ ý nào ở trang nào”* → 30 giây có dàn bài kèm số trích dẫn trỏ thẳng về trang gốc. Bấm thêm một nút → nó tạo **podcast 2 người dẫn nói tiếng Việt** giảng lại nguyên cụm kiến thức để bạn nghe trên đường tới trường. Đêm ôn thi rút từ 6 tiếng còn hơn 1 tiếng.
**💸 Lợi ích thực tế:** một trợ lý đọc-hiểu-ôn-tóm-tắt **chỉ dựa trên tài liệu của chính bạn** (không bịa từ kiến thức ngoài), kèm trích dẫn để bạn kiểm chứng từng câu — bản miễn phí dùng được ngay tại VN, chỉ cần tài khoản Google.
:::

> **“NotebookLM không phải chatbot biết tuốt — nó là trợ lý chỉ đọc tài liệu BẠN đưa, rồi trả lời kèm trích dẫn về câu gốc.**
> **Vì chỉ bám nguồn, nó bịa ít hơn hẳn chatbot thường. Nhưng cũng vì thế, nó vô dụng nếu bạn hỏi thứ không có trong tài liệu.”**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Tạo notebook** và nạp nhiều loại nguồn (PDF, Google Docs/Slides, web, YouTube, audio, EPUB).
- **Hỏi-đáp có trích dẫn** để mọi câu trả lời đều trỏ ngược về đoạn gốc — kỹ năng chống bịa cốt lõi.
- **Tạo Audio Overview (podcast 2 host AI) bằng tiếng Việt** với host instructions tùy chỉnh.
- **Dùng Studio** sinh Mind Map / Quiz / Flashcards / Slide / Infographic chỉ bằng một cú click.
- **Chọn đúng gói** (Free hay Plus/Pro) hợp ví người Việt và biết cách thanh toán tại VN.
- **Biết khi nào KHÔNG dùng** NotebookLM (việc sáng tạo mở, search realtime, dữ liệu tối mật trên tài khoản cá nhân).
:::

::: warning ⏱️ Lưu ý “hạn dùng” của thông tin
Đây là hiểu biết tới **giữa 2026**, tổng hợp từ trang chính thức của Google cộng báo VN và một số bên thứ ba. Google đổi cấu trúc gói + giới hạn **khá thường xuyên**, nên các con số gói/giá dưới đây gắn nhãn “theo nguồn tới giữa 2026”. Cứ vào thẳng [notebooklm.google](https://notebooklm.google) và [notebooklm.google/plans](https://notebooklm.google/plans) để kiểm tra bản mới nhất.
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**NotebookLM** là công cụ *“AI research assistant”* (trợ lý nghiên cứu AI) của **Google Labs**. Cách dùng cốt lõi rất khác chatbot thường: bạn **upload nguồn của chính mình** — PDF, Google Docs/Slides, trang web, video YouTube, file audio, EPUB… — rồi hỏi-đáp, tóm tắt, tạo podcast/video **dựa hoàn toàn trên các nguồn đó**, kèm **trích dẫn (citation)** trỏ về câu gốc trong tài liệu.

Khác biệt cốt lõi so với ChatGPT/Claude/Gemini: NotebookLM **không trả lời từ kiến thức chung của model** mà chỉ từ tài liệu bạn nạp (gọi là *grounded* — “neo vào nguồn”). Hệ quả: tỉ lệ “bịa” (hallucination) thấp hơn nhiều. Một số bên thứ ba quảng cáo con số *“dưới 2%”* — đây là **số marketing**, nên hiểu là “rất thấp” chứ không phải số đo chính thức.

URL chính thức: **https://notebooklm.google** — App: **https://notebooklm.google.com**

::: tip 🔑 Cơ chế bên dưới (đọc để hiểu vì sao nó ít bịa)
- NotebookLM dùng kỹ thuật **RAG (Retrieval-Augmented Generation)** — “tìm đoạn liên quan trong nguồn rồi mới sinh câu trả lời” — chạy trên model **Gemini** của Google.
- Theo Wikipedia, tới khoảng **3/2026** NotebookLM chạy trên **Gemini 3** (trước đó là Gemini 1.5 rồi 2.x). Đây là mốc model nên đọc dè chừng vì Google không phải lúc nào cũng công bố rõ.
- Vì câu trả lời được “neo” vào đoạn cụ thể trong tài liệu, mỗi câu thường kèm **số trích dẫn** click vào sẽ nhảy về đúng chỗ trong nguồn → bạn tự kiểm chứng được.
:::

::: tip 🕰️ Lịch sử nhanh (để khỏi nhầm tên gọi)
- Ra mắt **5/2023** dưới tên **“Project Tailwind”** → sau đổi tên thành **NotebookLM**.
- Bỏ mác “experimental” ngày **17/10/2024** (chính thức thành sản phẩm thật).
- Ra **NotebookLM Plus** (12/2024), ban đầu cho doanh nghiệp + người dùng Gemini Advanced.
- Mở cho cá nhân qua Google One ngày **10/2/2025**.
- Có **app Android và iOS** (ra trong 2025; theo Wikipedia có bản cập nhật lớn vào 5/2026).
:::

**Những việc NotebookLM làm tốt (theo tài liệu chính thức):**

| Nhóm việc | Làm được gì | Ghi chú |
|---|---|---|
| **Hỏi-đáp có trích dẫn** | Hỏi tiếng Việt tự nhiên, mỗi câu trả lời kèm số trích dẫn về đoạn gốc | Mặc định, không cần “prompt đặc biệt” |
| **Audio Overview** | Biến tài liệu thành podcast 2 host AI; có bản **Brief (dưới 4 phút)** và **Deep Dive (~40 phút)** | Hỗ trợ **80+ ngôn ngữ**, gồm tiếng Việt (mở ~29/4/2025) |
| **Video Overview** | Biến tóm tắt thành video slide có narration + hình + sơ đồ; có chế độ “cinematic” | Ra ~29/7/2025 |
| **Studio (sinh nội dung 1 click)** | Mind Map, Slide Deck / Infographic, Data Tables, Quiz, Flashcards, Briefing Doc, FAQ, Study Guide, Timeline | Slide/Infographic dùng model ảnh Nano Banana Pro (~11/2025); Data Tables (~12/2025) |
| **Discover Sources** | Mô tả chủ đề → NotebookLM quét hàng trăm nguồn web, đề xuất tối đa ~10 nguồn kèm tóm tắt, add 1 click | Ra ~2/4/2025; có nút “I’m Feeling Curious” |
| **Chia sẻ / cộng tác** | Share notebook cho người khác cùng dùng | Bản trả phí mạnh hơn |

::: warning 🌐 Lưu ý song ngữ (kiểm lại trước khi tin tuyệt đối)
Bạn **chat và nạp nguồn tiếng Việt** đều ổn. Nhưng theo một nguồn bên thứ ba (notebooklm.in), vài bản tóm tắt tự động (Study Guide / Briefing / FAQ / Timeline) **đôi khi vẫn xuất ra tiếng Anh**. Đây là quan sát chưa chắc chắn — bạn nên đặt **Output language → Tiếng Việt** trong Settings rồi thử thực tế trước khi khẳng định.
:::

**Dùng NotebookLM khi:** bạn có **một bộ tài liệu cố định** (giáo trình, hồ sơ, paper, hợp đồng, biên bản) và cần **đọc/hiểu/ôn/tóm tắt/tạo podcast** từ chính nó, ưu tiên **độ tin cậy + trích dẫn**. Rất hợp học tập, pháp lý, due diligence (thẩm định hồ sơ). **Cân nhắc kỹ khi:** bạn cần sáng tạo mở, tin tức realtime, hay export sạch — xem Mục 09.

::: tip 📌 Ví dụ thật — Spotify dùng công nghệ này tạo podcast cho từng người nghe
Cuối 2024, **Spotify Wrapped** dùng công nghệ Audio Overviews của NotebookLM (kết hợp Gemini) để tạo **podcast riêng cho từng user** — 2 host AI “mổ xẻ” gu nhạc cả năm của bạn. Lan truyền cực mạnh, nhưng Google/Spotify tự thừa nhận host “đôi khi phát âm sai, không bao quát đủ”. **Bài học:** đây là minh chứng công nghệ podcast-AI đủ tốt để chạy ở quy mô hàng trăm triệu người — nhưng vẫn cần người kiểm trước khi đưa vào production. (Chi tiết ở Mục 06 · CS1.)
:::

### So với công cụ khác — “khi nào chọn cái nào”

Đây là điểm dễ nhầm nhất. **NotebookLM là app chuyên dụng** cho việc “nói chuyện với tài liệu của bạn”. Ba đối thủ hay bị đem so — ChatGPT Projects, Claude Projects, Perplexity Spaces — thật ra là **chatbot tổng quát** có thêm tính năng gom file + hướng dẫn theo chủ đề. Bản chất khác nhau, nên “thắng/thua” tùy việc. Bảng dưới tổng hợp đánh giá định tính của các reviewer tới giữa 2026:

| Tiêu chí | NotebookLM | ChatGPT Projects | Claude Projects | Perplexity Spaces |
|---|---|---|---|---|
| Bản chất | App research **grounded** | Workspace trong ChatGPT | Workspace trong Claude | Workspace trong Perplexity |
| Trích dẫn về nguồn gốc | **Mặc định, mạnh nhất** | Yếu hơn | Có (grounded) | Cite web realtime tốt |
| Mức bịa | Rất thấp (chỉ dùng nguồn) | Cao hơn | Thấp (lý luận tốt) | Trung bình |
| Thế mạnh riêng | Audio/Video Overview, học liệu | Tạo nội dung, ảnh, voice, Custom GPT | Lý luận sâu, “ngăn” project gọn | Web search realtime, cap nguồn cao |
| Điểm yếu | Export kém, notebook không liên thông, không web search sâu (trừ Discover) | Citation yếu hơn | Giới hạn dung lượng file | Hay chọn nhầm model, cần hỏi rất cụ thể |

::: tip 💡 Chốt thực dụng — chọn cái nào cho việc gì
- **NotebookLM:** bộ tài liệu cố định + cần độ tin + trích dẫn → học tập, pháp lý, thẩm định hồ sơ, ôn thi, đọc paper.
- **ChatGPT Projects:** cần **vừa sáng tạo vừa tra cứu linh hoạt**, dùng ảnh/voice/GPT tùy biến; file chỉ là phụ trợ.
- **Claude Projects:** cần **lý luận sâu** trên tài liệu + muốn project được “đóng hộp” sạch (chỉ tìm trong chat của project đó).
- **Perplexity Spaces:** cần **nguồn web realtime** + cap nguồn cao, nghiêng về research mở trên Internet.

Dùng song song 2–3 công cụ là chuyện bình thường: NotebookLM để “đào” tài liệu của bạn, ChatGPT/Claude để sáng tạo, Perplexity để tra web mới.
:::

::: warning ⛔ Khi nào NotebookLM KHÔNG hợp (giới hạn thật)
- Cần **kiến thức tổng quát / sáng tạo mở** (brainstorm, viết content, code) không gắn tài liệu → ChatGPT/Claude/Gemini hợp hơn.
- Cần **search web realtime / tin mới liên tục** làm trục chính → Perplexity (NotebookLM chỉ có Discover để gắp nguồn, **không phải** một search engine hội thoại).
- Cần **export sạch** thành file đẹp, biến citation thành link → NotebookLM export yếu (xem Mục 04).
- Cần **nhiều notebook liên thông** thành một “second brain” thống nhất → NotebookLM **không nối** các notebook với nhau.
- **Dữ liệu siêu nhạy cảm** trên **tài khoản cá nhân free** → không nên; chỉ cân nhắc bản **Enterprise/Workspace** (xem Mục 04 và 07).
:::

---

## 02 · Đăng ký & truy cập — bối cảnh VN

### Dùng được ở Việt Nam không? — **Có.**

NotebookLM hỗ trợ khoảng **220 quốc gia/vùng** (gồm VN), nhập nguồn + chat khoảng **130 ngôn ngữ** (gồm tiếng Việt), và **Audio Overview có tiếng Việt** từ ~4/2025. **Bản miễn phí dùng được bình thường ở VN**, chỉ cần tài khoản Google và đủ **18 tuổi**.

::: tip 🔑 Phân biệt 3 thứ dễ lẫn (đọc kỹ kẻo nhầm)
- **NotebookLM không có CLI**, không “cài” gì cả — nó là **web app + app mobile**.
- Bạn **không mua riêng NotebookLM** được. Nó đi kèm như **quyền lợi** của một gói **Google AI** (Plus/Pro/Ultra) hoặc **Google Workspace** / **Google Cloud Enterprise**.
- Vì vậy “giá NotebookLM” thực chất là **giá gói Google AI** mà NotebookLM nằm trong đó.
:::

### Đăng ký / vào dùng 30 giây

```text
1. Mở https://notebooklm.google → đăng nhập tài khoản Google (cần đủ 18 tuổi).
2. Bấm "Create notebook" (Tạo notebook mới).
3. "Add sources" → kéo-thả PDF, dán URL/YouTube, chọn Google Docs/Slides,
   hoặc dùng "Discover" để Google tự tìm nguồn web.
4. Gõ câu hỏi tiếng Việt vào ô chat → dùng được ngay.
(App di động: tải "Google NotebookLM" trên App Store / Google Play.)
```

### Các gói & giá (theo nguồn tới giữa 2026, USD/tháng)

::: warning 📊 Đọc kỹ độ tin của bảng dưới
Các con số **“X notebooks / Y nguồn / Z chat / audio mỗi ngày”** và **giá USD theo gói** dưới đây chủ yếu là **bên thứ ba tổng hợp** (felloai, superlore…), **dao động theo thời điểm và theo nguồn**. Hãy coi là **tham khảo**, và tự kiểm lại trên [notebooklm.google/plans](https://notebooklm.google/plans). Mọi con số đều nên đọc kèm dấu “~”.
:::

| Gói | Giá/tháng | Notebooks | Nguồn/notebook | Chat/ngày | Audio/ngày | Đi kèm |
|---|---|---|---|---|---|---|
| **Free (Standard)** | $0 | ~100 | ~50 | ~50 | ~3 | Không cần đăng ký gì |
| **Plus** | ~$7.99 | ~200 | ~100 | ~200 | ~6 | Google AI Plus |
| **Pro** | ~$19.99 | ~500 | ~300 | ~500 | ~20 | Google AI Pro |
| **Ultra (20TB)** | ~$99.99 | ~500 | ~500 | ~2.500 | ~100 | Google AI Ultra |
| **Ultra (30TB)** | ~$200 | ~500 | ~600 | ~5.000 | ~200 | Google AI Ultra |
| **Student (US)** | ~$9.99 | = Pro | = Pro | = Pro | = Pro | Google AI Pro (ưu đãi SV) |
| **Workspace Business Std** | ~$14/user | ~200 | ~100 | ~200 | ~6 | Google Workspace |
| **Enterprise** | ~$9/license (tối thiểu ~15) | full | full | ~Pro | ~Pro | Google Cloud / Agentspace |

::: tip 💡 Lưu ý về free tier (con số dao động)
Free tier có nơi ghi *“100 notebooks / 50 nguồn / 3 audio mỗi ngày”*, có nơi ghi khác (ví dụ *“50 chat mỗi ngày”*). Đừng coi đây là con số tuyệt đối — điểm chắc chắn là: **bản Free đủ rộng cho học tập cá nhân** (hàng chục notebook, mỗi cái mấy chục nguồn, vài podcast/ngày). Nếu bạn đụng trần thường xuyên → mới tính nâng gói.
:::

### Giá & thanh toán tại VN (theo báo VN 2025–2026)

Vì NotebookLM đi kèm gói **Google AI**, giá tại VN chính là giá các gói đó (đã có bản tiếng Việt, thanh toán nội tệ):

| Gói Google AI (kèm NotebookLM) | Giá tại VN (theo báo VN) | Ghi chú |
|---|---|---|
| **Google AI Plus** | ~**122.000đ/tháng** | Có giai đoạn **giảm 50% 6 tháng đầu** → ~61.000đ |
| **Google AI Pro** | ~**489.000đ/tháng** | — |
| **Google AI Ultra** | ~**6 triệu đồng/tháng (~$230)** | Bản cao nhất, ra mắt VN |

- **Thanh toán:** thẻ **Visa/Mastercard** hoặc **ví điện tử** (Google Play hỗ trợ một số ví/thẻ nội địa tùy thời điểm).
- **Nguồn:** vnexpress, vietnamnet, vietbao (2025–2026). Đây là **giá gói Google AI**, không phải giá riêng NotebookLM.

::: warning 🎓 Ưu đãi sinh viên VN — ĐỪNG tưởng đang còn miễn phí
Google **từng tặng Google AI Pro miễn phí 12 tháng** cho sinh viên 18+ tại VN (đăng ký 8/10–9/12/2025 qua goo.gle/freeproVN, xác minh qua SheerID). **Đợt này đã KẾT THÚC ngày 9/12/2025.** Tới giữa 2026, theo nguồn (truescho), VN **không nằm trong** danh sách miễn phí sinh viên đang chạy. Đừng tin “SV VN được free” như sự thật hiện hành — tùy đợt, hãy tự kiểm lại trên trang Google. Bản **Free thường** thì vẫn luôn dùng được.
:::

::: tip 💸 Mẹo chọn gói cho người Việt
- **Mới học / dùng ít** → **Free** là quá đủ để bắt đầu, không cần thẻ, không cần đăng ký gì.
- **Dùng đều cho học tập / cá nhân** mà đụng trần Free → **Google AI Plus (~122k, có lúc còn ~61k)** là điểm vào rẻ.
- **Chỉ lên Pro (~489k)** khi bạn thật sự cần **nhiều nguồn/notebook + nhiều podcast/ngày** (ví dụ làm nội dung, nghiên cứu nặng). Đừng trả thừa nếu Free còn dư.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có prompt thật)

Đây là quy trình “đi từ đầu đến xong việc”. Mỗi bước có cách **tự kiểm** (verify) để biết mình làm đúng.

### Bước 1 — Tạo notebook & nạp nguồn

Vào [notebooklm.google](https://notebooklm.google) → bấm **+ Create** → **Add sources**. Bạn có thể:

```text
- Kéo-thả file PDF / DOCX / TXT.
- Dán URL trang web hoặc link video YouTube.
- Chọn Google Docs / Google Slides từ Drive.
- Tải file audio, EPUB.
- Hoặc bấm "Discover" → mô tả chủ đề để Google tự tìm & đề xuất nguồn web.
```

::: tip 🧷 Quy tắc vàng: 1 notebook = 1 chủ đề
NotebookLM **không nối các notebook với nhau**. Nếu bạn trộn “luận văn marketing” chung với “hồ sơ thầu xây dựng” vào một notebook, câu trả lời sẽ loãng và khó kiểm. Hãy gom **đúng một chủ đề mỗi notebook** ngay từ đầu.
:::

→ **Verify:** các nguồn hiện ở cột trái, mỗi nguồn có dấu tích (đã xử lý xong, không còn “loading”).

### Bước 2 — Hỏi có trích dẫn

Gõ câu hỏi tiếng Việt vào ô chat. Không cần “prompt đặc biệt” để bắt nó tìm trong tài liệu — **đó là mặc định**. Vài prompt thật hiệu quả:

```text
Tổng hợp các luận điểm chính của TẤT CẢ nguồn về [X], nhóm theo chủ đề,
và ghi rõ nguồn nào nói gì.
```

```text
Liệt kê những điểm mà các nguồn MÂU THUẪN nhau, và trích nguyên câu gốc
của từng bên.
```

```text
Tìm những KHOẢNG TRỐNG: câu hỏi nào về [X] mà chưa nguồn nào trả lời?
```

→ **Verify:** câu trả lời có **số trích dẫn** (ví dụ những con số nhỏ kèm câu); bấm vào nó **nhảy về đúng đoạn gốc** trong nguồn. Nếu không có trích dẫn hoặc trích sai chỗ → đọc kỹ lại, đừng tin vội.

### Bước 3 — Tạo Audio Overview (podcast 2 host AI) bằng tiếng Việt

Đây là tính năng “ngôi sao” của NotebookLM. Cách làm:

```text
1. Bấm icon Settings (bánh răng) → Output language → chọn "Tiếng Việt".
2. Mở mục Audio (trong panel Studio) → bấm "Customize".
3. Dán "host instructions" mô tả bạn muốn podcast nói gì, cho ai nghe.
4. Bấm "Generate" → đợi vài phút.
```

Ví dụ **host instructions** thật (dán vào ô Customize):

```text
Giải thích cho người mới bắt đầu, tránh thuật ngữ hàn lâm, dùng ví dụ
gần gũi ở Việt Nam. Tập trung vào chương 3. Host A đóng vai người hỏi
hoài nghi, host B giải thích rõ ràng từng bước.
```

::: tip 🎚️ Mẹo độ dài podcast (workaround, không phải tính năng chính thức)
Có **Brief (dưới 4 phút)** và **Deep Dive (~40 phút)**, nhưng **không có nút kéo độ dài tùy ý**. Mẹo lách (theo ikangai/makeuseof): muốn podcast **dài/sâu hơn vào một phần cụ thể**, hãy tự tạo một bản tóm tắt phần đó, **upload bản tóm tắt làm nguồn riêng**, rồi để host instructions tập trung vào nó. Đây là cách cộng đồng truyền tay, không phải tính năng chính chủ.
:::

→ **Verify:** nghe thử 1 phút đầu — đúng ngôn ngữ (tiếng Việt), đúng chủ đề bạn yêu cầu, không lạc sang nội dung ngoài nguồn.

### Bước 4 — Dùng Studio sinh học liệu một click

Trong panel **Studio**, mỗi nút sinh ra một loại nội dung từ chính nguồn của bạn:

```text
- Mind Map      → sơ đồ tư duy toàn bộ chủ đề.
- Flashcards    → thẻ ghi nhớ hỏi-đáp để ôn.
- Quiz          → bộ câu hỏi tự kiểm tra.
- Slide Deck    → bộ slide trình bày (dùng model ảnh Nano Banana Pro).
- Infographic   → đồ hoạ thông tin.
- Data Table    → bảng dữ liệu rút từ nguồn.
- Briefing Doc / FAQ / Study Guide / Timeline → các bản tóm tắt chuyên dụng.
```

→ **Verify:** nội dung sinh ra **bám đúng nguồn** (ví dụ Quiz hỏi đúng kiến thức trong tài liệu, không hỏi thứ ngoài lề).

### Bước 5 — Đối chiếu & lưu

Mỗi khi nghi ngờ, **bấm số trích dẫn** để nhảy về câu gốc trong tài liệu — đây là “lá chắn chống bịa” của NotebookLM. Lưu lại các note quan trọng.

::: warning 📤 Lưu ý export trước khi mừng vội
NotebookLM **export yếu** (xem chi tiết Mục 04): không có nút export chuẩn; copy-paste thì **citation không thành link** và format dễ vỡ; tải được **file audio** nhưng **không tải kèm transcript/nguồn**. Hãy coi đây là **giới hạn cố hữu** và tự lưu thủ công những phần cần giữ.
:::

→ **Verify:** bạn giữ được nội dung cần dùng ở nơi khác (Google Docs, Notion…), không phụ thuộc hoàn toàn vào việc “ở trong NotebookLM”.

::: tip ⚙️ 3 thói quen đáng tập ngay
- **Đặt Output language = Tiếng Việt một lần** trong Settings để mọi câu trả lời + podcast ra tiếng Việt, khỏi nhắc lại.
- **Dùng Discover Sources** khi thiếu tài liệu: mô tả chủ đề → chọn trong ~10 nguồn web Google đề xuất → add 1 click. Đây là cách web-search hiếm hoi của NotebookLM.
- **Việc nặng làm trên web**, không làm trên mobile: app (nhất là Android) **thiếu tính năng** so với desktop.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 🟢 Mẹo ăn tiền

::: tip 6 mẹo dùng NotebookLM như dân chuyên
1. **1 notebook = 1 chủ đề.** Vì notebook không liên thông, gom đúng chủ đề từ đầu giúp câu trả lời sắc và dễ kiểm.
2. **Luôn bấm số trích dẫn để kiểm.** Đây là điểm mạnh nhất của NotebookLM — đừng bỏ phí, nhất là khi dùng cho việc thật.
3. **Hỏi kiểu “so sánh / mâu thuẫn / khoảng trống”** thay vì chỉ “tóm tắt”. NotebookLM rất giỏi đối chiếu nhiều nguồn.
4. **Tách bản tóm tắt làm nguồn riêng** khi muốn podcast/đầu ra tập trung sâu vào một phần.
5. **Dùng Discover** khi thiếu nguồn, nhưng vẫn **đọc lại nguồn nó gắp** trước khi tin (web có thể sai).
6. **Việc nặng làm trên web**, để mobile cho lúc nghe podcast/đọc nhanh.
:::

### 🔴 Lỗi & cạm bẫy (đọc kỹ — phần này cứu bạn)

::: warning 🚨 Upload nguồn bị kẹt / báo lỗi
PDF kẹt loading hoặc báo lỗi thường do **vượt giới hạn** hoặc **file bị khoá**:
- Vượt **~500.000 từ/nguồn**.
- Vượt **~200MB/file**.
- **PDF bị copy-protect** (chống sao chép).

**→ Cách xử:** tách file thành nhiều phần nhỏ; gỡ bảo vệ; nếu là **PDF scan ảnh** (không có text) thì **OCR lại** trước khi nạp.
:::

::: warning 📤 Export kém — đây là giới hạn cố hữu
- **Không có nút export chuẩn.** Copy-paste thì **citation không thành link** và format vỡ.
- Tải được **file audio** podcast, nhưng **không tải kèm transcript/nguồn**.
- **Notebook không liên thông:** trùng nguồn/câu hỏi giữa các notebook **không tự nối**.
- **Không có lớp quản lý task:** không flag follow-up, không tag trạng thái → quản lý ngoài (Notion/sheet) nếu cần.

**→ Cách xử:** tự lưu từng phần ra Google Docs/Notion; gom đúng 1 chủ đề/notebook ngay từ đầu; đừng kỳ vọng NotebookLM thay được công cụ knowledge base.
:::

::: warning ⚠️ Các lỗi khác hay gặp
- **Server error khi sinh Study Guide/Quiz/Audio:** thường do **giờ cao điểm** → thử lại sau, kiểm tra mạng.
- **Mobile thiếu tính năng** (nhất là Android: thiếu internal notes, một số quiz/flashcard tự động) → việc nặng làm trên web.
- **Audio tiếng Việt chưa tối ưu:** giọng đôi khi đọc lệch/sai (theo báo VN) → nghe lại, làm nguồn rõ ràng hơn, hoặc tách bản tóm tắt rồi mới generate.
:::

::: warning 🔒 Quyền riêng tư & dữ liệu — đọc kỹ nếu dùng cho công việc
Phần này rất quan trọng với người Việt dùng NotebookLM cho việc công ty. Thông tin theo trang Help chính thức của Google (support.google.com/notebooklm/answer/17004255) tới giữa 2026:

**(a) Mặc định KHÔNG train model trên dữ liệu bạn nạp.**
Google ghi rõ: nội dung trong NotebookLM **sẽ không được dùng để train trực tiếp các foundational model** của họ — **trừ khi bạn chủ động gửi feedback**.

**(b) Người dùng Workspace / Education được bảo vệ mạnh hơn.**
Uploads, câu hỏi, câu trả lời **không bị human review** (kể cả khi bạn bấm 👍/👎) và **không dùng để train model**.

**(c) Nếu bạn bấm 👍/👎 ở bản consumer = mở cửa cho human review.**
Google có thể thu nội dung liên quan để **người thật xem lại** nhằm xử lý lỗi. Dữ liệu feedback được **tách khỏi tài khoản Google** trước khi reviewer xem và **lưu tối đa ~3 năm**. Cân nhắc trước khi bấm 👍/👎 với nội dung nhạy cảm.

**(d) Riêng tư notebook:** nguồn bạn nạp **chỉ bạn (và người bạn share) thấy**, không lộ cho user khác hay public theo mặc định.

**(e) TUYỆT ĐỐI cân nhắc trước khi nạp vào tài khoản CÁ NHÂN free:**
- Hợp đồng/NDA, tài liệu mật, dữ liệu chiến lược.
- **Dữ liệu cá nhân của khách hàng** (họ tên, SĐT, địa chỉ, hồ sơ) — ở VN việc này có thể **vi phạm Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân**.
- Muốn an toàn pháp lý cho dữ liệu nhạy cảm → dùng bản **Enterprise/Workspace**: chạy trong **GCP project của tổ chức**, chọn được **data residency** (vùng lưu dữ liệu) để tuân thủ GDPR…, có **VPC Service Controls + IAM + audit trail**.

**(f) Tranh chấp giọng nói (đạo đức/pháp lý quanh AI voice):** năm 2026 có vụ cựu host NPR **David Greene kiện Google**, cho rằng Audio Overviews tái tạo giọng đặc trưng của ông; **Google phủ nhận**. Đây là rủi ro đang tranh chấp — nêu để bạn biết, không kết luận đúng/sai.
:::

::: details ❓ FAQ & lỗi hay gặp (bấm để mở)
**NotebookLM có dùng được ở Việt Nam không? Có cần VPN không?**
Dùng được, **không cần VPN**. Hỗ trợ ~220 quốc gia (gồm VN), chat + nạp nguồn tiếng Việt OK, Audio Overview có tiếng Việt từ ~4/2025. Chỉ cần tài khoản Google + đủ 18 tuổi.

**Có cài bằng lệnh terminal / có CLI không?**
**Không.** NotebookLM chỉ là **web app + app mobile**. “Cài đặt” = vào notebooklm.google đăng nhập, hoặc tải app “Google NotebookLM” trên store.

**Mua riêng NotebookLM được không?**
Không. Nó đi kèm **gói Google AI** (Plus/Pro/Ultra) hoặc **Workspace / Cloud Enterprise**. Bản **Free** thì luôn dùng được mà không trả phí.

**Upload PDF mãi không xong / báo lỗi?**
Thường do **>500.000 từ/nguồn**, **>200MB/file**, hoặc **PDF bị khoá copy**. Tách nhỏ, gỡ bảo vệ, hoặc OCR lại nếu là PDF scan.

**Sao tôi không export ra file đẹp được?**
Đây là **giới hạn cố hữu**: không có export chuẩn, copy-paste làm mất link citation và vỡ format; audio tải được nhưng không kèm transcript/nguồn. Tự lưu từng phần ra Docs/Notion.

**Câu trả lời/podcast ra tiếng Anh dù tôi hỏi tiếng Việt?**
Vào **Settings → Output language → Tiếng Việt**. Một số bản tóm tắt tự động đôi khi vẫn ra tiếng Anh (theo nguồn bên thứ ba) — thử lại sau khi đặt ngôn ngữ.

**Sinh Quiz/Study Guide/Audio bị “server error”?**
Thường do **giờ cao điểm**. Đợi rồi thử lại, kiểm tra mạng.

**Nó có tự tìm thông tin trên web không?**
Chỉ qua **Discover Sources** (gắp nguồn web để bạn add), **không phải** search engine hội thoại realtime. Cần tin mới liên tục → dùng Perplexity.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm thật 2–3 bài dưới đây để biến “đọc hiểu” thành “làm được”. Mỗi bài có tiêu chí hoàn thành rõ ràng.

### 🧪 Bài 1 — Hỏi-đáp có trích dẫn & bắt lỗi bịa (cơ bản nhưng quan trọng nhất)

**Mục tiêu:** luyện phản xạ kiểm chứng — kỹ năng sống còn khi dùng AI.

1. Tạo notebook mới, nạp **1–2 file PDF** bất kỳ (giáo trình, báo cáo, bài viết).
2. Hỏi:

```text
Tóm tắt 5 ý chính của tài liệu, mỗi ý ghi rõ trích dẫn (số/đoạn) trỏ về
chỗ gốc trong nguồn. Nếu một ý không có trong tài liệu, ghi "không có trong nguồn".
```

3. **Bấm từng số trích dẫn**, đối chiếu với chỗ gốc trong file: ý đó có đúng ở đó không? Có chỗ nào nó “thêm thắt” không?

**✅ Đạt khi:** bạn xác nhận được từng ý có trong tài liệu (hoặc bắt được chỗ trích sai/lệch). Đây là phản xạ phải giữ mãi về sau.

### 🧪 Bài 2 — Tạo podcast ôn tập tiếng Việt (Audio Overview)

**Mục tiêu:** biến một cụm kiến thức thành podcast nghe được trên đường.

1. Trong notebook ở Bài 1, vào **Settings → Output language → Tiếng Việt**.
2. Mở **Audio → Customize**, dán host instructions, ví dụ:

```text
Giảng lại nội dung cho người mới, bằng tiếng Việt, dùng ví dụ đời thường.
Tập trung vào những ý khó nhất. Host A hỏi, host B giải thích từng bước.
```

3. Bấm **Generate**, nghe thử và đối chiếu: podcast có **đúng nội dung trong nguồn** không, có lạc ra ngoài không?

**✅ Đạt khi:** bạn có một file audio tiếng Việt giảng đúng tài liệu, và **nghe ra** được những chỗ host nói chưa chuẩn (để cảnh giác khi dùng thật).

### 🧪 Bài 3 — Đối chiếu nhiều nguồn (đồ án nhỏ kiểu nghiên cứu)

**Mục tiêu:** dùng đúng thế mạnh “grounded + đối chiếu” của NotebookLM.

1. Chọn 1 chủ đề bạn quan tâm (ví dụ “tác động của AI tới việc làm”). Dùng **Discover Sources** hoặc tự nạp **4–6 nguồn** (paper, bài báo, blog).
2. Hỏi lần lượt:

```text
1) Các nguồn ĐỒNG THUẬN ở điểm nào về [chủ đề]? Trích dẫn từng nguồn.
2) Các nguồn MÂU THUẪN ở điểm nào? Trích nguyên văn hai phía.
3) Còn KHOẢNG TRỐNG nào chưa nguồn nào trả lời?
```

3. Bấm **Studio → Mind Map** để xem toàn cảnh; bấm **Quiz** để tự kiểm.

**✅ Đạt khi:** bạn rút ra được bảng “đồng thuận / mâu thuẫn / khoảng trống” có trích dẫn — thứ mà chatbot thường rất dễ bịa, còn NotebookLM thì neo vào nguồn thật.

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom các ví dụ **có thật** từ công bố chính thức của Google, báo chí, tạp chí ngành và tổng hợp thảo luận cộng đồng tới giữa 2026. Mục đích: cho bạn thấy NotebookLM chạy ra sao **ngoài đời thật** — cả lúc toả sáng lẫn lúc lộ giới hạn.

::: warning ⚠️ Đọc kỹ về độ tin của nguồn
Ngoài **Spotify** (case có nguồn chính thức rõ ràng), phần lớn case còn lại là **reviewer / luật sư / blog cá nhân paraphrase workflow**, **không phải** case khách hàng tên tuổi có số liệu ROI kiểm chứng độc lập. Các con số do **Google tự công bố** (vd “>80.000 tổ chức”) là **vendor claim** — đọc có chừng mực. Phần nào chỉ là quan sát cá nhân cũng được ghi rõ.
:::

### 🎧 CS1 — Spotify Wrapped 2024: podcast AI cho từng người nghe (case official, 2 mặt)

- **Bối cảnh:** Spotify muốn làm Wrapped 2024 cá nhân hoá hơn “bảng số liệu cuối năm” thông thường.
- **Làm gì:** Dùng công nghệ **Audio Overviews của NotebookLM + Gemini** để tạo **podcast riêng cho từng user** — 2 host AI “mổ xẻ” gu nhạc cả năm của người nghe. Mở cho US/UK/AU/NZ/CA/IE/SE, có thời hạn.
- **Kết quả / số liệu:** Lan truyền cực mạnh (theo tổng hợp marketing: ~**2,1 triệu mention trong 48h**, ~**400 triệu view TikTok trong 3 ngày**). **Nhưng** Google/Spotify tự thừa nhận host “đôi khi phát âm sai, không bao quát đủ”, và có phản ánh **sai fact cơ bản**.
- **Bài học:** Podcast-AI đủ tốt để chạy ở quy mô khổng lồ và tạo viral — nhưng **vẫn cần người kiểm** trước khi đưa output AI vào production.
- **Nguồn (official):** blog.google + newsroom.spotify + TechCrunch — https://blog.google/technology/google-labs/notebooklm-spotify-wrapped/

### ⚖️ CS2 — Luật sư & sinh viên luật: “AI sidekick” cho hồ sơ và casebook

- **Bối cảnh:** Giới luật cần đọc khối lượng tài liệu khổng lồ (hợp đồng, pleadings, discovery) và **không được bịa** trích dẫn.
- **Làm gì (use thật):** Upload **2 phiên bản hợp đồng** → bắt highlight thay đổi, tóm tắt điều khoản trách nhiệm. Upload **pleadings + discovery + thư từ** → hỏi tranh chấp sự kiện chính, cách tính thiệt hại, điểm bất nhất giữa các tài liệu. Sinh viên luật làm **case brief, flashcard quy phạm, audio ôn bài**.
- **Kết quả:** Đây là mảng NotebookLM **được khen nhất** nhờ **citation + không bịa từ nguồn ngoài** — đúng nhu cầu “mọi câu nói phải truy được về tài liệu”.
- **Bài học:** Khi công việc đòi “neo vào nguồn”, NotebookLM mạnh hơn hẳn chatbot tổng quát. Nhưng vẫn phải đọc lại trích dẫn (xem vụ luật sư bị phạt vì AI bịa án lệ ở các chương khác).
- **Nguồn:** American Bar Association Law Practice Magazine (số 3–4/2026); LLRX (12/2025); Medium @AltPraxis — *(paraphrase workflow, không gắn handle cá nhân).*

### 🔬 CS3 — Researcher: tổng hợp & đối chiếu hàng chục paper

- **Bối cảnh:** Người làm nghiên cứu/giảng dạy cần “đọc nhanh” một chủ đề từ nhiều paper.
- **Làm gì:** Nạp ~10 paper cùng chủ đề (ví dụ AI ethics) → hỏi *“điểm chung là gì”*, *“đồng thuận về quyền riêng tư ở đâu”*, *“khoảng trống nghiên cứu nào”*.
- **Kết quả:** Ra material để teach hoặc viết, kèm trích dẫn về từng paper.
- **Bài học:** Pattern “đồng thuận / mâu thuẫn / khoảng trống” là điểm ngọt của NotebookLM — đúng thứ Bài 3 ở Mục 05 luyện.
- **Nguồn:** DataCamp tutorial; KDnuggets “NotebookLM + Deep Research”; GeeksforGeeks.

### 🎙️ CS4 — Show HN: biến essay/paper thành podcast nghe khi đi đường

- **Bối cảnh:** Một dev muốn “nghe” các bài viết/paper thay vì ngồi đọc.
- **Làm gì:** Build một pipeline biến danh sách bài viết thành podcast bằng NotebookLM, đăng lên Hacker News (“Show HN”).
- **Kết quả:** Cộng đồng HN bàn rằng audio “nghe rất thật”, nhưng có **giới hạn về độ chính xác/độ sâu**.
- **Bài học:** Audio Overview tiện cho “tiêu thụ thụ động” kiến thức, nhưng đừng coi là nguồn chuẩn xác tuyệt đối.
- **Nguồn:** Hacker News thread id=41858076 — *(chỉ xác nhận thread tồn tại + chủ đề; không trích câu cụ thể do không lấy được nội dung chi tiết).*

### 📰 CS5 — Biến NotebookLM thành “newsletter tự tóm tắt”

- **Bối cảnh:** Một reviewer muốn có bản tóm tắt định kỳ (knowledge digest) từ nguồn mình theo dõi.
- **Làm gì:** Nạp nguồn theo đợt và dùng NotebookLM sinh bản tóm tắt dạng newsletter cá nhân.
- **Kết quả:** Có một “bản tin” cô đọng từ chính tài liệu của mình.
- **Bài học:** NotebookLM hợp làm **digest cá nhân** — nhưng nhớ giới hạn export khi muốn gửi đi nơi khác.
- **Nguồn:** XDA — “I turned NotebookLM into an auto-summarizing newsletter”.

### 🏢 CS6 — Doanh nghiệp / Enterprise: xử lý tài liệu nhạy cảm trong GCP

- **Bối cảnh:** Ngân hàng, đội pháp chế… cần “nói chuyện với tài liệu” nội bộ (chiến lược, báo cáo tài chính, chính sách) mà **không được rò rỉ**.
- **Làm gì:** Dùng **NotebookLM for Enterprise** chạy trong **GCP project của tổ chức**, có **VPC Service Controls + IAM + audit trail**, chọn được **data residency**.
- **Kết quả / số liệu:** Google nói **>80.000 tổ chức** đã dùng NotebookLM (bản Business).
- **Bài học:** Với dữ liệu nhạy cảm, **đừng dùng tài khoản cá nhân free** — bản Enterprise/Workspace mới có lớp bảo mật/tuân thủ phù hợp. Con số 80.000 là **Google tự công bố**.
- **Nguồn:** Google Cloud “NotebookLM for enterprise”; Devoteam; Baytech — https://cloud.google.com/resources/notebooklm-enterprise

### 📚 Nguồn đáng chú ý (tiêu đề + URL)

Đây là các trang official / bài tổng hợp truy cập được:

- “NotebookLM × Spotify Wrapped” (official Google) — https://blog.google/technology/google-labs/notebooklm-spotify-wrapped/
- “NotebookLM Discover Sources” (official Google) — https://blog.google/technology/google-labs/notebooklm-discover-sources/
- “NotebookLM new features – December 2024” (ra mắt Plus) — https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/
- “NotebookLM for Enterprise” (Google Cloud) — https://cloud.google.com/resources/notebooklm-enterprise
- Hacker News “Show HN: Podcasts based on essays and research papers, generated by NotebookLM” — thread id=41858076

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 5 điều mang theo
1. **NotebookLM = trợ lý nghiên cứu grounded** — chỉ trả lời từ tài liệu BẠN nạp, **kèm trích dẫn** về câu gốc → ít bịa hơn hẳn chatbot thường.
2. **Điểm mạnh sống còn = trích dẫn + đối chiếu nhiều nguồn.** Luôn bấm số trích dẫn để kiểm.
3. **Audio Overview (podcast 2 host AI) nói được tiếng Việt** — biến tài liệu thành thứ nghe được trên đường; Studio sinh Mind Map/Quiz/Slide một click.
4. **Người Việt dùng được hợp pháp, không cần VPN**; bản **Free đủ cho học tập**, gói Google AI Plus (~122k, có lúc ~61k) là điểm vào rẻ nếu cần thêm.
5. **Biết khi nào KHÔNG dùng:** sáng tạo mở, search realtime, export sạch, hoặc dữ liệu tối mật trên tài khoản cá nhân → chọn công cụ khác / bản Enterprise.
:::

### Link chính thức từ Google (nên bookmark)

Đây là các trang **chính chủ** để bạn tự kiểm tra thông tin mới nhất — luôn tin các link này hơn bài tổng hợp của bên thứ ba:

- **Trang chủ:** https://notebooklm.google
- **Vào dùng (app web):** https://notebooklm.google.com
- **Gói & giá:** https://notebooklm.google/plans
- **NotebookLM trên Google Workspace:** https://workspace.google.com/products/notebooklm/
- **NotebookLM for Enterprise (Google Cloud):** https://cloud.google.com/resources/notebooklm-enterprise
- **Trung tâm trợ giúp:** https://support.google.com/notebooklm
- **Quyền riêng tư & điều khoản (Help chính thức):** https://support.google.com/notebooklm/answer/17004255

::: details 🔎 Nguồn tham khảo bổ sung & ghi chú độ tin cậy (research tới giữa 2026)
**Chắc chắn (nguồn chính thức Google):** bản chất sản phẩm, cơ chế RAG/Gemini, các tính năng & ngày ra mắt lớn, chính sách privacy/training, Discover Sources, Spotify Wrapped, hỗ trợ tiếng Việt.

**Tương đối chắc nhưng dao động (bên thứ ba tổng hợp — felloai/superlore):** các con số giới hạn theo gói (notebooks/nguồn/chat/audio mỗi ngày) và **giá USD theo gói** — luôn gắn “~/theo nguồn tới giữa 2026”, kiểm lại tại notebooklm.google/plans.

**Mỏng / cần kiểm:** *“model = Gemini 3”* (Wikipedia, có thể đổi); *“hallucination dưới 2%”* (số marketing); chi tiết case study cá nhân (paraphrase, không gắn handle/URL); tình trạng **ưu đãi SV VN** (đợt 2025 đã hết, đợt sau tùy Google); một số bản tóm tắt tự động có thể vẫn ra tiếng Anh (notebooklm.in); chi tiết thread HN (chỉ xác nhận tồn tại).

**Giá tại VN** (122k / 489k / ~6 triệu đồng): nguồn báo VN 2025–2026 (vnexpress, vietnamnet, vietbao), là **giá gói Google AI** kèm NotebookLM, không phải giá riêng NotebookLM.

*Số liệu (giá, model, tính năng, giới hạn) có thể đã thay đổi — luôn kiểm tra lại tại notebooklm.google và support.google.com/notebooklm.*
:::
