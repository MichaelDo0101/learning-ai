---
title: 'Notion AI — Lớp AI sống bên trong workspace, từ trợ lý viết đến đội agent chạy nền'
description: 'Hướng dẫn thực chiến Notion AI cho người Việt: Notion Agent & Custom Agents chạy 24/7, AI Meeting Notes (/meet), Enterprise Search, AI Autofill, chọn model GPT-5.2/Claude Opus 4.5/Gemini 3, gói & giá (Business $20/tháng — $15 trả năm, credits $10/1.000), tiếng Việt UI, thanh toán ở VN, workflow + prompt thật, case Ramp, bảo mật và bài tập.'
---

# Notion AI — Lớp AI sống bên trong workspace, từ trợ lý viết đến đội agent chạy nền

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">📝</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn là trưởng nhóm sản phẩm, cả team đang dùng Notion làm wiki + quản lý dự án. Sáng nay có cuộc họp sprint 45 phút: bạn gõ `/meet` ngay trong trang Notion, bấm **Start transcribing** → AI phiên âm + tóm tắt + bóc **action items** ngay khi họp xong, không cần bot nào vào phòng. Chiều, một bạn dev hỏi “chính sách hoàn tiền là gì?” — bạn mở **Enterprise Search** gõ một câu, nó quét xuyên Slack + Google Drive + GitHub trả về câu trả lời kèm nguồn trong vài giây. Việc tổng hợp 30 phút rút còn 3 phút.
**💸 Lợi ích thực tế:** thay vì nhảy giữa 5 app rồi copy-paste, AI sống ngay trong nơi bạn đã lưu dữ liệu — viết, tóm tắt, tìm kiếm, tự điền database và chạy agent nền 24/7. Một gói Business **$20/người/tháng** (rẻ còn **$15** nếu trả năm) gói gọn tất cả.
:::

> **“Notion AI không phải một chatbot bạn mở ra rồi đóng lại — nó sống bên trong trang, database và dự án của bạn.**
> **Khi Notion là trung tâm dữ liệu của team, AI ở đây thắng vì nó đọc được ngữ cảnh thật. Khi Notion chỉ là một app phụ, bài toán tiền bạc thường không lợi.”**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Phân biệt** Notion Agent (ra lệnh từng việc) với **Custom Agents** (chạy nền tự động) — và biết khi nào dùng cái nào.
- **Bật AI Meeting Notes** bằng `/meet` để phiên âm + tóm tắt + bóc action items ngay trong trang.
- **Dùng Enterprise Search** để hỏi-đáp xuyên Slack/Google Drive/GitHub/Gmail đã kết nối.
- **Tạo AI Autofill** trong database để AI tự phân loại / chấm điểm / trích entity cho mọi dòng.
- **Chọn model nền** (GPT-5.2 / Claude Opus 4.5 / Gemini 3) hoặc bật Auto-select cho từng tác vụ.
- **Hiểu đúng giá & credits** (Business $20/tháng — $15 trả năm, credits $10/1.000 cho Custom Agents) và biết **khi nào KHÔNG nên** trả tiền Notion AI.
:::

::: warning ⏱️ Lưu ý "hạn dùng" của thông tin
Đây là hiểu biết tới **giữa 2026**, tổng hợp chủ yếu từ trang chính chủ **notion.com** (product/ai, pricing, help center, releases, customers) cộng vài review bên thứ ba. AI tools đổi rất nhanh — tên/version model, giá, mốc ngày, số ngôn ngữ có thể đã đổi khi bạn đọc. Cứ vào thẳng [notion.com/product/ai](https://www.notion.com/product/ai) và [notion.com/pricing](https://www.notion.com/pricing) để kiểm tra bản mới nhất. Những số liệu chỉ có từ blog bên thứ ba sẽ được ghi rõ là **[nguồn mỏng]**.
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**Notion AI** là lớp trí tuệ nhân tạo tích hợp **bên trong** không gian làm việc all-in-one Notion (docs, wiki, database, project). Khác hẳn một chatbot độc lập, Notion AI sống ngay trong trang/database của bạn và dùng được ngữ cảnh từ chính workspace, các app đã kết nối (Slack, Google Drive, GitHub, Gmail…) và web. Nhà cung cấp: **Notion Labs, Inc.** URL chính thức: **https://www.notion.com/product/ai**.

Theo định vị trên trang chủ AI (tới giữa 2026), Notion AI đã tiến hoá từ một “trợ lý viết” (2023–2024) thành một **nền tảng agent có thể lập trình** — Notion gọi đây là *“Meet your AI team”*: có Notion Agent, Custom Agents chạy nền 24/7, AI Meeting Notes, Enterprise Search, AI Autofill.

::: tip 🔑 Phân biệt 3 thứ dễ lẫn (đọc kỹ kẻo nhầm)
- **Notion** = nền tảng workspace (docs/wiki/database/project) — cái “nơi chốn” bạn lưu mọi thứ.
- **Notion AI** = lớp AI *bên trong* workspace đó. Bài này nói về cái này.
- **Notion Agent vs Custom Agents** = hai chế độ AI khác nhau: **Notion Agent** bạn ra lệnh từng việc (task-by-task); **Custom Agents** là agent có tên, chạy nền tự động theo lịch/sự kiện, không cần bạn nhắc. (Chi tiết ở Mục 02–03.)
:::

**Những việc Notion AI làm tốt (xác nhận từ notion.com/product/ai):**

| Nhóm việc | Làm được gì | Cách dùng |
|---|---|---|
| **Notion Agent** | Tác vụ nhiều bước dùng ngữ cảnh từ Notion + app đã kết nối + web; tạo trang, viết công thức database, dựng view bằng ngôn ngữ tự nhiên | Mở thanh AI, ra lệnh từng việc |
| **Custom Agents** | Agent đặt tên, **chạy tự động** theo lịch hoặc trigger sự kiện, hoạt động 24/7, ghi kết quả trở lại database | Cấu hình một lần, chạy nền |
| **AI Meeting Notes** | Ghi âm + phiên âm + tóm tắt real-time ngay trên trang, “no bot needed”; hỗ trợ ~16 ngôn ngữ | Gõ `/meet` (chỉ desktop app) |
| **Enterprise Search** | Tìm xuyên app đã kết nối: “Search across Slack, Google Drive, GitHub & more — in seconds” (còn gọi “Ask Notion”) | Hỏi một câu, nhận kết quả + nguồn |
| **AI Autofill** | Định nghĩa 1 property (category, summary, sentiment, entity…) và AI tự điền **mọi dòng, kể cả dòng thêm sau** | Trong database |
| **Writing / AI blocks** | Cải thiện văn phong, fix chính tả/ngữ pháp, đổi tone, viết tiếp, dịch, tóm tắt, tìm action items | Ngay trong trang |
| **Research Mode** | Sinh báo cáo & tóm tắt chi tiết trên một chủ đề, có khả năng *reasoning* (tính năng Business AI, liệt kê trên notion.com/pricing) | Trong thanh AI |

::: tip 🆕 Chọn model AI ngay trong tài liệu (từ Notion 3.2)
Từ Notion 3.2 (**20/01/2026**), bạn có thể chọn model nền ngay trong tài liệu: **GPT-5.2 (OpenAI)**, **Claude Opus 4.5 (Anthropic)**, **Gemini 3 (Google)** — hoặc bật **Auto-select** để Notion tự định tuyến theo loại tác vụ. Đổi model giữa chừng vẫn **giữ ngữ cảnh**. (Tên/version model theo nguồn tới giữa 2026, có thể đã đổi.)
:::

::: warning 🔁 Thay đổi đáng chú ý: add-on Notion AI $10 đã bị khai tử
Trước đây Notion AI bán như **add-on $10/tháng** gắn thêm vào gói. Từ **tháng 5/2025**, add-on này **bị khai tử** cho khách Free/Plus mới — toàn bộ AI dồn vào gói **Business $20**. Khách cũ được giữ quyền truy cập theo diện *grandfathered*. Nếu bạn đọc bài cũ thấy “mua thêm Notion AI $10” thì thông tin đó đã lỗi thời.
:::

**Dùng Notion AI khi:** Notion là **workspace trung tâm** của bạn/team; cần hỏi-đáp xuyên toàn bộ tài liệu + app đã kết nối; cần meeting notes ngay trong trang; cần tự động phân loại/tổng hợp database hàng loạt; muốn agent chạy nền làm việc lặp lại. **Cân nhắc kỹ khi:** bạn không thật sự “sống” trong Notion, hoặc đã trả tiền một chatbot đa năng khác (xem Mục 09).

### So với công cụ khác — "khi nào chọn cái nào"

Điểm mấu chốt cần nhớ: **giá pro của hầu hết công cụ đều ~$20/người/tháng**, nên giá *không* phải yếu tố quyết định. Chọn theo **công cụ bạn đã dùng và loại việc bạn làm**. Bảng dưới ngắn gọn, khách quan tới giữa 2026:

| Tiêu chí | Notion AI | ChatGPT | Claude | Gemini (trong Docs) | Coda AI |
|---|---|---|---|---|---|
| **Bản chất** | AI **trong workspace**; mạnh khi Notion là trung tâm dữ liệu | Chatbot đa năng, đa phương thức, web search, code | Mạnh viết & lý luận; nhiều người khen chất lượng văn bản | Tích hợp sâu Google Workspace (Gmail/Docs/Sheets/Meet) | AI dệt vào **formula & automation**, mạnh ở table/row-level |
| **Điểm yếu chính** | Không browse web tự do, không phân tích ảnh, không chạy task ngoài Notion (theo review) — *trong khi ChatGPT/Gemini/Claude đều đã có web browsing*; agent cần prompt rất chuẩn, phải review | Không gắn liền workspace nội bộ của bạn | Tương tự — không phải “hệ điều hành công việc” | Khoá trong hệ Google | Cộng đồng/template ít hơn Notion; pricing đổi nhiều lần |
| **Tự động hoá** | Trigger ở **mức database/page** (page added / property changed) | n/a (ngoài workspace; có Projects/Canvas) | n/a (có Projects) | n/a (có Canvas/Gems) | Trigger **mức cell/row** — chi tiết hơn cho CRM/inventory |
| **Giá pro** | **$15 trả năm / $20 trả tháng** (Business) | ~$20/tháng (Plus) | ~$20/tháng (Pro) | ~$20/tháng (AI Pro) | Chỉ tính phí “Doc Maker”; editor/viewer free |
| **Khi nào thắng** | Là central workspace, chạy team, cần Q&A toàn workspace + meeting notes | Cần một trợ lý vạn năng ngoài Notion | Ưu tiên chất lượng viết/lý luận | Đã sống trong Google Workspace | Data-work nặng, tổ chức lớn nhiều viewer, ngân sách chặt |

::: tip 💡 Tóm tắt nhanh
Nếu Notion **đã là** trung tâm dữ liệu của bạn/team → Notion AI là lựa chọn tự nhiên và mạnh nhất (Q&A toàn workspace + meeting notes + autofill). Nếu bạn cần trợ lý vạn năng ngoài Notion → **ChatGPT**; ưu tiên viết/lý luận → **Claude**; đã sống trong Google → **Gemini**; data-work nặng, nhiều viewer, ngân sách chặt → cân nhắc **Coda**. Một điểm Notion lợi mà ít người để ý: **chiết khấu trả năm sâu** (Business $20 → $15/seat), trong khi ChatGPT Plus / Claude Pro / Gemini AI Pro gần như **không giảm giá năm**. Theo một ước tính từ blog bên thứ ba, tổ chức 100 người (20 creator + 80 viewer) tốn Notion Business ~$1.650/tháng so với Coda Team ~$600/tháng **[nguồn mỏng — ghi “theo ước tính”]**.
:::

::: warning ⛔ Khi nào KHÔNG nên dùng Notion AI (đọc trước khi rút ví)
- **Bạn không sống trong Notion.** Nếu Notion không phải workspace trung tâm, hoặc bạn đã trả ChatGPT/Claude/Gemini → bài toán tiền bạc thường không lợi. Phép thử từ cộng đồng Reddit: *“Bạn có dành hơn 2 giờ/tuần viết hoặc đọc trong Notion không?”* — nếu không, cứ dùng ChatGPT rồi copy-paste sang.
- **Cần chạy task ngoài Notion** (browse web tự do, phân tích ảnh, chạy code đa năng) → dùng chatbot đa năng.
- **Họp client/nhóm tiếng Việt cần phân biệt người nói, hoặc ghi âm trên mobile** → công cụ meeting chuyên dụng (tldv/Otter/Fireflies) tốt hơn. (Notion *có* gắn nhãn người nói nhưng chỉ với tiếng Anh và họp 1-1/online — xem Mục 04.)
- **Tự động hoá cần phản ứng theo từng cell** → Coda phù hợp hơn (Notion chỉ trigger ở mức database/page).
- **Xử lý dữ liệu nhạy cảm (PII/PHI, hồ sơ khách hàng) mà KHÔNG ở gói Enterprise** → chỉ Enterprise mới có **zero data retention** với LLM; gói non-Enterprise vẫn để LLM provider giữ dữ liệu **≤ 30 ngày** (chi tiết ở Mục 04). Dữ liệu thật sự nhạy cảm thì hoặc lên Enterprise, hoặc đừng đưa vào AI.
:::

---

## 02 · Đăng ký & truy cập — bối cảnh VN

### Dùng được ở Việt Nam không? — **Có.**

- **Không thấy chặn địa lý** với VN — không có thông tin restriction. Người Việt đăng ký và dùng bình thường, không cần VPN.
- Notion (app + web) **có giao diện tiếng Việt** chính thức, ra mắt **22/07/2025** (cùng đợt với tiếng Indonesia/Thái). Đổi ngôn ngữ trong **Settings**.
- **Notion AI Translate hỗ trợ tiếng Việt** (nằm trong nhóm ~14 ngôn ngữ dịch; riêng AI Meeting Notes phủ nhiều hơn, ~16 — số ngôn ngữ mỗi tính năng khác nhau và có thể đã đổi). Các tính năng viết (improve writing, fix grammar, change tone, simpler language) dùng được với tiếng Việt.

::: warning 🖥️ Lưu ý quan trọng: AI Meeting Notes chỉ chạy trên desktop app
Tính năng ghi âm của **AI Meeting Notes** (`/meet`) **chỉ chạy trên desktop app** (macOS/Windows), theo review từ cộng đồng (Reddit/tldv). Trên web/mobile bạn không khởi động được phiên ghi âm. Nếu hay họp trên điện thoại → đây là hạn chế cần biết trước.
:::

::: warning 🧪 Vẫn còn beta — đừng phụ thuộc 100%
Tới giữa 2026, theo trang chính chủ, cả **AI Meeting Notes** (help center ghi rõ *“AI Meeting Notes (beta)”*) lẫn **Enterprise Search** (pricing ghi *“Enterprise Search beta”*) vẫn đang là **beta**. Nghĩa là tính năng có thể đổi, đôi lúc thiếu ổn định — dùng được cho việc thật nhưng nên có phương án dự phòng cho khâu quan trọng.
:::

### Đăng ký 30 giây

```text
1. Mở https://www.notion.com (hoặc tải app desktop macOS/Windows, mobile iOS/Android).
2. Đăng ký bằng email, hoặc đăng nhập nhanh qua Google / Apple.
3. Vào workspace → vào Settings đổi ngôn ngữ sang Tiếng Việt nếu muốn.
4. Gõ "/" trong một trang để gọi AI; gõ "/meet" (trên desktop) để bật Meeting Notes.
```

### Các gói & giá (cập nhật giữa 2026 — *giá tháng* và *giá khi trả năm*)

| Gói | Giá/người/tháng (trả năm) | Giá/người/tháng (trả tháng) | AI gồm gì |
|---|---|---|---|
| **Free** | $0 | $0 | Chỉ **dùng thử giới hạn** các tính năng AI cơ bản (chat, generate, autofill, translate) |
| **Plus** | $10 | $12 | Vẫn chỉ **dùng thử giới hạn** các tính năng AI |
| **Business** *(Recommended)* | **$15** | **$20** | **Đầy đủ**: Notion Agent, Ask Notion / AI search, AI Meeting Notes, Enterprise Search |
| **Enterprise** | Liên hệ sales | — | Tất cả Business + **Zero data retention** với LLM, SCIM, audit log, unlimited history, CSM riêng |

> ⚠️ **Lưu ý cách đọc giá (sửa lỗi hay gặp):** con số người ta hay trích là **$20/người/tháng** chính là giá **trả theo tháng** của Business; nếu cam kết trả **theo năm** thì chỉ còn **$15/người/tháng** (~$180/người/năm). Plus tương tự: **$10 (trả năm) / $12 (trả tháng)**. Trang pricing ghi *“Save up to 20% with yearly”*. Nguồn: [notion.com/pricing](https://www.notion.com/pricing).

::: tip 🧮 Credits cho Custom Agents — phần dễ bỏ sót
Custom Agents (ra mắt 24/02/2026, xem Mục 03) **miễn phí dùng thử** đến chu kỳ tiếp theo (vào/sau **04/05/2026**), sau đó tính:
- **$10 / 1.000 Notion credits / tháng**, **không cộng dồn** (reset hằng tháng), **dùng chung toàn workspace**.
- **1.000 credits chạy được bao nhiêu?** Ước tính **~30–60 lần chạy** (≈ $0,17–0,33/lần) tuỳ độ phức tạp agent — *con số ước tính tới giữa 2026, không phải cam kết chính thức*. Notion 3.4 part 2 (14/04/2026) đã hạ chi phí Custom Agent **~35–50%** nên mức tiêu thực tế có thể thấp hơn.
- Đây là phí **cộng thêm** *trên* gói Business/Enterprise, không bao gồm sẵn.
- Trang pricing có nhắc thêm *“Workers (Beta)… starts using credits on August 11”* — tư liệu còn ít **[nguồn mỏng]**.
:::

::: tip 💡 Lưu ý về "free tier" thực tế
Đừng nhầm: gói **Free và Plus chỉ được dùng thử giới hạn các tính năng AI**. Muốn dùng AI **nghiêm túc** (Notion Agent đầy đủ, AI Meeting Notes, Enterprise Search) bạn **phải lên Business** ($20/người/tháng, hoặc $15 nếu trả năm). Nếu mục tiêu của bạn chỉ là “thử cho biết” thì Free là đủ; nhưng đừng kỳ vọng dùng AI hằng ngày trên Free/Plus.
:::

### Thanh toán ở Việt Nam (theo help center chính thức)

- **Web:** thẻ ghi nợ/tín dụng (**Visa/Mastercard** hoạt động ở VN), **Apple Pay**, **Stripe Link**, **SEPA** (chỉ châu Âu).
- **Mobile:** iOS qua Apple Pay; Android qua Google Play (quản lý gói qua App Store / Play Store).
- **Không hỗ trợ PayPal.** Tính phí trả trước theo tháng/năm, xử lý qua **Stripe**.
- Help center **không nêu** thanh toán bằng VND → khả năng cao **tính bằng USD** (cần xác nhận — đây là suy luận, help center không nói rõ).

::: warning ⚠️ Cẩn thận trước khi nâng cả team lên Business
Vì AI thật sự chỉ có ở **Business** ($20/người/tháng trả tháng, $15 trả năm), chi phí nhân theo số người rất nhanh: một team 10 người = **$200/tháng** (giá tháng) hoặc **~$150/tháng** (trả năm) — *chưa kể credits Custom Agents*. Hãy thử trước với **1–2 seat Business** để xác nhận AI giải đúng bài toán của bạn (meeting notes, Enterprise Search, autofill) rồi mới mở rộng cả team.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có lệnh & prompt thật)

Đây là 4 quy trình hay dùng nhất. Mỗi bước có cách **tự kiểm** (verify) để biết mình làm đúng.

### A · AI Meeting Notes — ghi âm, phiên âm, tóm tắt ngay trong trang

Theo help center chính thức:

```text
1. Trên DESKTOP app, gõ /meet trong một trang bất kỳ.
2. Trước họp: ghi agenda / ghi chú vào mục "Notes" → AI sẽ dùng làm
   ngữ cảnh khi tóm tắt.
3. Bấm "Start transcribing" (xác nhận mọi người đồng ý ghi âm).
4. Họp xong bấm "Stop" → AI tự tạo summary + action items.
```

→ **Verify:** sau khi bấm Stop, trang có bản tóm tắt + danh sách action items khớp đúng nội dung đã nói (không phải nội dung bịa).

Prompt mẫu để chuẩn hoá biên bản (từ cộng đồng/PromptRocket — **[nguồn mỏng]**):

```text
Meeting type: [STANDUP / CLIENT CALL / STRATEGY]
Attendees: [...]
Date: [...] — Duration: [...]
Raw notes: [DÁN BẢN PHIÊN ÂM]

Tạo bản tóm tắt gồm:
1. Meeting Overview (1-2 câu)
2. Key Decisions Made (ghi rõ ai quyết)
3. Action Items (người phụ trách + deadline)
```

### B · Hỏi/việc trong trang với Notion Agent

Mở thanh AI → gõ lệnh tự nhiên. Đây là các prompt thật Notion **gợi ý cho product team** (trích guide chính thức):

```text
Simplify the language        # rút gọn một PRD dài
Continue writing             # viết tiếp đoạn đang dở
Make longer                  # khai triển ý cho dài hơn
Fix spelling & grammar       # sửa chính tả / ngữ pháp
Change tone                  # đổi giọng: friendly / casual / professional
Summarize                    # tóm tắt cả trang
Find action items            # bóc việc-cần-làm từ meeting notes / doc
Brainstorm ideas             # ý tưởng tính năng, đặt tên feature
```

→ **Verify:** kết quả bám đúng nội dung trang bạn đang mở, không “chêm” thông tin lạ.

::: tip ✍️ Nguyên tắc vàng Notion nhấn mạnh
Notion khuyến nghị viết **“detailed and specific prompts”** — prompt càng chi tiết, cụ thể thì kết quả càng tốt. *“Viết lại đoạn này”* sẽ thua xa *“Viết lại đoạn này ngắn hơn 30%, giọng chuyên nghiệp, giữ nguyên 3 số liệu trong bảng.”*
:::

### C · AI Autofill trong database — để AI điền hàng loạt

```text
1. Trong database, tạo một property kiểu AI.
2. Mô tả việc cần làm, ví dụ:
   "Phân loại sentiment của phản hồi này thành Positive / Neutral / Negative."
3. Bật autofill → AI điền cho MỌI dòng, kể cả dòng thêm sau này.
```

→ **Verify:** kiểm vài dòng đầu xem AI phân loại hợp lý; thêm một dòng mới và xác nhận nó tự điền.

::: tip ⚙️ Nâng cấp: Autofill chạy bằng Custom Agents (Notion 3.4 part 2)
Notion 3.4 part 2 (**14/04/2026**) nâng AI Autofill chạy bằng **Custom Agents** như một tiến trình nền, nguồn bên thứ ba mô tả *“sub-3-second autofill”* (điền dưới 3 giây) — chi tiết tốc độ này từ blog Fazm **[một phần nguồn mỏng]**.
:::

### D · Custom Agent — agent có tên, chạy nền tự động (Notion 3.3)

Ra mắt **24/02/2026** trong Notion 3.3. Đây là điểm khác biệt lớn nhất so với Notion Agent: bạn cấu hình **một lần**, agent chạy nền không cần nhắc.

```text
1. Đặt TÊN cho agent (vd "Sales Feedback Categorizer").
2. Gán skill / nhiệm vụ bằng ngôn ngữ tự nhiên.
3. Chọn trigger:
   - theo LỊCH định kỳ (vd mỗi sáng 8h), hoặc
   - theo SỰ KIỆN (vd khi có dòng mới / property đổi).
4. Chỉ định OUTPUT ghi vào database nào.
```

→ **Verify:** chờ trigger kích hoạt (hoặc tạo sự kiện thử) và kiểm database đích xem agent đã ghi kết quả đúng chưa.

::: tip 🔑 Notion Agent vs Custom Agents — quy tắc chọn
- **Notion Agent** = bạn ra lệnh **từng việc**, ngồi xem kết quả. Hợp cho việc một lần (viết, tóm tắt, dựng view).
- **Custom Agents** = agent **chạy nền 24/7** theo lịch/sự kiện, ghi kết quả vào database. Hợp cho việc **lặp đi lặp lại** (phân loại feedback mỗi ngày, tổng hợp tuần…). Ramp cho biết một agent được **tạo trong 3 phút** giữa các cuộc họp (xem Mục 06).
:::

::: tip 🔌 Connectors xác nhận trên trang chính thức
Notion AI kết nối được với: **Slack, Google Drive, GitHub, Asana, Gmail**. Đây là nguồn dữ liệu cho Enterprise Search và là nơi Notion Agent/Custom Agents lấy ngữ cảnh ngoài Notion.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 🟢 Mẹo ăn tiền

::: tip 7 mẹo dùng Notion AI như dân chuyên
1. **Prompt chi tiết & cụ thể** — Notion nói thẳng đây là yếu tố số 1. Nêu rõ độ dài, giọng, ràng buộc, dữ liệu phải giữ.
2. **Đưa kiến thức vào prompt và bắt AI “chỉ dùng tài liệu đã cho”** → giảm bịa, nhất là chủ đề kỹ thuật ngách.
3. **Dùng đúng chế độ:** việc một lần → Notion Agent; việc lặp lại hằng ngày → Custom Agents (khỏi nhắc tay).
4. **Tận dụng Auto-select model**, nhưng khi cần chất lượng viết cao → tự chọn model phù hợp; đổi giữa chừng vẫn giữ ngữ cảnh.
5. **Ghi agenda vào mục Notes trước khi `/meet`** → bản tóm tắt bám đúng trọng tâm hơn nhiều.
6. **Coi output là “bản nháp”, luôn review** — đặc biệt với agent: kết quả thường cần người duyệt trước khi dùng.
7. **Là người Việt:** bật giao diện tiếng Việt (có từ 22/07/2025) và dùng Translate/writing với tiếng Việt — nhưng rà lại thuật ngữ chuyên ngành.
:::

### 🔴 Lỗi & cạm bẫy (đọc kỹ — phần này cứu bạn)

::: warning 🚨 Hallucination (bịa) — vẫn là cạm bẫy số 1
Như mọi AI tạo sinh, Notion AI có thể **rất tự tin đưa thông tin sai**, nhất là:
- Tin **rất mới** hoặc chủ đề **kỹ thuật ngách**.
- Khi prompt mơ hồ, AI “tự suy diễn” lấp chỗ trống.

**→ Cách phòng:** coi output là **bản nháp**, luôn verify; đưa kiến thức vào prompt và yêu cầu *“chỉ dùng tài liệu đã cho, nếu không có thì nói không có”*.
:::

::: warning ⚠️ Các hạn chế đặc thù của Notion AI cần nhớ
- **AI Meeting Notes:** **speaker labels chỉ hỗ trợ tiếng Anh** và chỉ đáng tin với **họp 1-1 / online** (bắt được cả mic của bạn lẫn system audio; nếu link calendar event thì gắn được tên người kia). Với **họp nhóm tiếng Việt hoặc nhiều người chung một mic** thì gần như không phân biệt được ai nói. Ngoài ra nó **không tự vào phòng họp** và **chỉ chạy trên desktop**. Họp client/nhóm cần phân biệt ai nói gì → dùng công cụ chuyên dụng (tldv/Otter/Fireflies). Nguồn: [notion.com/help/ai-meeting-notes](https://www.notion.com/help/ai-meeting-notes).
- **Văn phong dễ lặp/nhạt** nếu bạn không chỉ định style cụ thể.
- **Thiếu trí nhớ hội thoại sâu** so với chatbot chuyên dụng; lúng túng với prompt mơ hồ.
- **Notion/Custom Agent “cần prompt rất chính xác”**, kết quả thường phải có người review; tới đầu 2026, độ tin cậy bị một số đánh giá cho là *“chưa đủ ổn định”* để phụ thuộc hoàn toàn (Reddit/eesel — **[nguồn mỏng / đánh giá]**).
- **Automation chỉ ở mức database/page**, không trigger theo từng cell (thua Coda).
- **Không browse web tự do, không phân tích ảnh, không chạy task ngoài Notion** (theo review) — đây không phải chatbot vạn năng.
:::

::: warning 🔒 Quyền riêng tư & dữ liệu — đọc kỹ nếu dùng cho công việc
Thông tin theo **help center chính thức** của Notion tới giữa 2026:

**(a) Có train trên dữ liệu của bạn không? — KHÔNG.**
- Trích nguyên văn: *“Your use of Notion AI does not grant Notion any right or license to your Customer Data to train machine learning models.”*
- Notion có hợp đồng **cấm AI subprocessor dùng dữ liệu khách để train**.

**(b) Cô lập dữ liệu:** tài khoản từng khách tách riêng ở môi trường production; không trộn dữ liệu khi xử lý AI.

**(c) Lưu trữ ở LLM provider:**
- **Enterprise → zero data retention** với LLM provider.
- **Non-Enterprise → LLM provider chỉ giữ ≤ 30 ngày** rồi xoá.

**(d) Mã hoá & chứng nhận:** TLS 1.2+ khi truyền; vector DB lưu embeddings đạt **SOC 2 Type 2** (kiểm bởi auditor ngoài).

**(e) HIPAA:** Notion AI hỗ trợ tuân thủ HIPAA nhờ API zero-retention của LLM provider (xử lý PHI).

**(f) Dù vậy — ở Việt Nam vẫn cẩn trọng:** đưa dữ liệu cá nhân của khách hàng (họ tên, SĐT, hồ sơ) lên bất kỳ dịch vụ cloud nào đều có thể chạm **Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân** — cân nhắc kỹ phạm vi dữ liệu trước khi bật connector quét toàn workspace.

Trang tham chiếu: notion.com/help/notion-ai-security-practices · /help/ai-safety · /help/enterprise-search-security-and-privacy-practices.
:::

::: details ❓ FAQ & lỗi hay gặp (bấm để mở)
**Gõ `/meet` mà không thấy / không ghi âm được?**
AI Meeting Notes **chỉ chạy trên desktop app** (macOS/Windows). Trên web hoặc mobile sẽ không khởi động được phiên transcribe. Cài app desktop rồi thử lại.

**Tôi đang ở Free/Plus mà sao thiếu Notion Agent / Enterprise Search?**
Free và Plus chỉ **dùng thử giới hạn** các tính năng AI. Bộ AI đầy đủ (Notion Agent, AI Meeting Notes, Enterprise Search) chỉ có ở **Business** ($20/người/tháng trả tháng, $15 trả năm) trở lên.

**Trả theo năm rẻ hơn bao nhiêu?**
Business: **$15/người/tháng** khi trả năm so với **$20** khi trả tháng (~25% rẻ hơn). Plus: **$10** so với **$12**. Trang pricing ghi *“Save up to 20% with yearly”*. Nếu chắc chắn dùng lâu dài, trả năm tiết kiệm rõ rệt khi nhân theo số seat.

**1.000 credits chạy được bao nhiêu lần Custom Agent?**
Theo ước tính từ nguồn bên thứ ba tới giữa 2026, **~30–60 lần chạy / 1.000 credits** (tức ~$0,17–0,33/lần) — *con số ước tính, mỗi agent tiêu khác nhau tuỳ độ phức tạp*. Lưu ý: bản Notion 3.4 part 2 (14/04/2026) đã làm Custom Agent **rẻ hơn ~35–50%**, nên mức tiêu thực tế có thể thấp hơn. Nguồn: [notion.com/help/custom-agent-pricing](https://www.notion.com/help/custom-agent-pricing).

**Custom Agent của tôi bỗng báo hết credits?**
Custom Agents tính **$10 / 1.000 credits/tháng**, **không cộng dồn** và **reset hằng tháng**, dùng chung toàn workspace. Nếu nhiều agent chạy nền cùng lúc, credits cạn nhanh — theo dõi mức dùng và nâng thêm nếu cần.

**Trước đây tôi mua add-on Notion AI $10, giờ còn dùng được không?**
Add-on $10 **đã khai tử (5/2025)** cho khách Free/Plus mới. Khách cũ được giữ quyền theo diện *grandfathered*. Khách mới muốn dùng AI đầy đủ phải lên **Business**.

**Notion AI trả lời tiếng Anh dù tôi viết tiếng Việt?**
Nêu rõ trong prompt *“Trả lời bằng tiếng Việt.”* Đồng thời đổi giao diện sang Tiếng Việt trong Settings (hỗ trợ chính thức từ 22/07/2025). Translate có hỗ trợ tiếng Việt.

**Agent trả kết quả sai / kỳ kỳ?**
Agent “cần prompt rất chính xác” và kết quả nên được người review. Viết lại nhiệm vụ chi tiết hơn, thu hẹp phạm vi dữ liệu, và đừng phụ thuộc hoàn toàn vào output chưa kiểm.

**Thanh toán ở VN bằng cách nào? Có PayPal không?**
Không có PayPal. Dùng **thẻ Visa/Mastercard**, **Apple Pay**, hoặc **Stripe Link** (web); mobile qua App Store/Play Store. Xử lý qua Stripe; help center không nêu VND nên khả năng cao tính bằng USD.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm thật 2–3 bài dưới đây để biến "đọc hiểu" thành "làm được". Mỗi bài có tiêu chí hoàn thành rõ ràng.

### 🧪 Bài 1 — Meeting Notes + bóc action items (cơ bản)

**Mục tiêu:** trải nghiệm vòng đời `/meet` từ ghi âm tới action items.

1. Trên **desktop app**, tạo một trang mới, gõ `/meet`.
2. Vào mục **Notes**, ghi sẵn 3 gạch đầu dòng agenda (ví dụ: *“chốt deadline, phân công, rủi ro”*).
3. Bấm **Start transcribing**, đọc to một đoạn họp giả lập ~2 phút (tự đóng vai 2 người), rồi bấm **Stop**.
4. Đối chiếu: bản tóm tắt có đúng 3 mục agenda không? **Action items** có gán đúng người + việc không?

**✅ Đạt khi:** bạn xác nhận được tóm tắt bám đúng nội dung đã nói và bóc ra ít nhất 1–2 action item hợp lý (hoặc bắt được chỗ nó bịa). Ghi lại 1 câu: việc ghi agenda trước có làm tóm tắt sát hơn không.

### 🧪 Bài 2 — AI Autofill phân loại sentiment (quan trọng)

**Mục tiêu:** luyện dùng AI điền hàng loạt + phản xạ kiểm chứng.

1. Tạo một database đơn giản với cột **“Phản hồi”** và dán vào ~8 câu feedback giả (tích cực/tiêu cực/trung tính trộn lẫn).
2. Thêm một property kiểu AI tên **“Sentiment”** với mô tả:

```text
Phân loại sentiment của nội dung cột "Phản hồi" thành đúng một trong ba:
Positive / Neutral / Negative. Chỉ dựa trên văn bản trong dòng đó.
```

3. Bật autofill, rồi **thêm một dòng feedback mới** và xác nhận nó tự điền.
4. **Đối chiếu tay** 8 dòng: AI phân loại có dòng nào sai không?

**✅ Đạt khi:** đa số dòng đúng, dòng mới tự điền, và bạn chỉ ra được dòng nào (nếu có) AI phân loại sai. Đây là phản xạ “không tin mù output” bạn phải giữ mãi.

### 🧪 Bài 3 — Custom Agent chạy nền (nâng cao)

::: warning Cần gói Business + credits
Custom Agents cần gói **Business** và tiêu **credits** ($10/1.000). Nếu chưa có, hãy làm “bản nháp giấy”: viết ra cấu hình agent (tên, nhiệm vụ, trigger, output) như thể sắp tạo — vẫn rèn được tư duy thiết kế agent.
:::

**Mục tiêu:** dựng một agent chạy nền cho việc lặp lại của bạn.

1. Chọn 1 việc bạn làm lặp lại trong Notion (vd: *mỗi sáng tổng hợp các task “In progress” thành 1 đoạn báo cáo*).
2. Tạo Custom Agent: đặt tên, mô tả nhiệm vụ, chọn trigger **theo lịch** (vd 8h sáng), chỉ định database/trang output.

```text
Tên: Daily Standup Summarizer
Nhiệm vụ: Mỗi sáng, đọc các task có trạng thái "In progress" trong database
[Dự án], viết một đoạn tóm tắt 4-6 gạch đầu dòng (việc gì, ai làm, còn vướng gì),
ghi vào trang "Standup [ngày hôm nay]".
Trigger: theo lịch, 08:00 mỗi ngày làm việc.
```

3. Chờ trigger (hoặc kích hoạt thử) và kiểm output.

**✅ Đạt khi:** agent tự ghi đúng bản tóm tắt vào nơi bạn chỉ định mà không cần bạn ra lệnh từng lần — hoặc (nếu làm “bản nháp giấy”) bạn viết được cấu hình agent đủ rõ để người khác dựng theo.

---

## 06 · Case study & use-case thật (từ cộng đồng & official)

Phần này gom các ví dụ **có thật** từ case study chính chủ Notion, đối tác công bố, và review bên thứ ba tới giữa 2026. Mục đích: cho bạn thấy Notion AI chạy ra sao **ngoài đời thật** — cả lúc toả sáng lẫn lúc lộ hạn chế.

::: warning ⚠️ Đọc kỹ về độ tin của nguồn
- Số liệu trong **case study của chính Notion** (Ramp) là **vendor claim** — đọc có chừng mực.
- Con số từ **đối tác** (Decagon) là phía đối tác công bố — ghi rõ “theo Decagon”.
- Phần **[nguồn mỏng]** là review/blog bên thứ ba hoặc thảo luận cộng đồng, chưa kiểm chứng độc lập.
- Các con số **định giá/doanh thu của công ty** (vd Ramp) là bối cảnh doanh nghiệp, **không nên gán trực tiếp** cho hiệu quả của Notion AI.
:::

### 🤖 CS1 — Ramp: chạy hơn 300 Notion Agents mỗi ngày (case study chính chủ)

- **Bối cảnh:** Ramp (công ty fintech) là khách hàng được Notion làm case study chính thức tại notion.com/customers/ramp.
- **Làm gì:** Ramp chạy **hơn 300 Notion Agents/ngày**, mỗi agent đặt tên cụ thể cho một việc: *Product Q&A Oracle* (gắn Slack, trả lời câu hỏi sản phẩm), *Sales Feedback Categorizer* (map feedback vào roadmap), *Referral Bonus Roy*, *Enablement Eddie*, *Customer Advocacy Miner*, *The Underwriter*…
- **Kết quả / số liệu (theo Notion):** **giảm ~70% chi phí công cụ năng suất**; team *“di chuyển nhanh 3×”*. Ramp cho biết một agent có thể được **tạo trong 3 phút** giữa các cuộc họp.
- **Bài học:** sức mạnh thật của Custom Agents là **nhân bản việc lặp lại** — thay vì một “trợ lý vạn năng”, Ramp dựng hàng trăm agent chuyên một việc, đặt tên rõ ràng, chạy nền. *(Các con số định giá / doanh thu của Ramp là bối cảnh công ty, không nên gán trực tiếp cho hiệu quả của Notion AI.)*
- **Nguồn (official Notion — vendor claim):** https://www.notion.com/customers/ramp

### 🎧 CS2 — Notion + Decagon: giảm tới ~34% thời gian xử lý ticket CSKH

- **Bối cảnh:** Notion triển khai giải pháp AI customer experience của **Decagon** cho đội chăm sóc khách hàng.
- **Kết quả / số liệu (theo Decagon):** giảm **tới ~34%** (*“up to 34%”*) thời gian xử lý ticket; **tỷ lệ phải chuyển cho người (ask-for-human) chỉ ~3,4%**; xử lý khoảng **1 triệu yêu cầu/năm**. Định tuyến thông minh tăng *first-touch resolution*, giảm tải cho agent người.
- **Bài học:** ngay cả một công ty “gốc Notion” cũng ghép thêm công cụ chuyên dụng cho CSKH — minh hoạ rằng Notion AI mạnh ở **knowledge/workspace**, còn bài toán ticket quy mô lớn vẫn cần lớp chuyên biệt.
- **Nguồn (đối tác Decagon — đọc có chừng mực):** https://decagon.ai/case-studies/notion

### 📋 CS3 — Product team: nâng cấp PRD/RFC, tổng hợp user research (guide chính chủ)

- **Bối cảnh:** Notion xuất bản guide chính thức hướng dẫn product team dùng Notion AI.
- **Làm gì:** dùng AI để nâng cấp **PRD/RFC** (simplify language, make longer, fix grammar), **tổng hợp user research**, brainstorm feature, scope dự án — bằng đúng các prompt ở Mục 03B.
- **Bài học:** với người làm sản phẩm, giá trị tức thì nhất không phải “agent chạy nền” mà là các **AI block ngay trong tài liệu** — biên tập, tóm tắt, bóc action items.
- **Nguồn (official Notion):** notion.com/help/guides (chuỗi guide cho product teams).

### 🗂️ CS4 — Khai thác insight từ database bằng AI Autofill (guide chính chủ)

- **Bối cảnh:** guide chính thức của Notion *“5 AI prompts to surface insights from your databases”*.
- **Làm gì:** dùng **AI Autofill + prompt** để phân loại, chấm điểm, trích entity cho hàng loạt record (ví dụ phân loại sentiment, gắn nhãn chủ đề, rút tên công ty từ mô tả).
- **Bài học:** đây là “điểm ngọt” của Notion AI cho dân vận hành dữ liệu — bạn mô tả tiêu chí bằng tiếng người, AI điền cho mọi dòng và mọi dòng thêm sau.
- **Nguồn (official Notion):** notion.com/help/guides.

### 👤 CS5 — Solo/creator: meeting notes tiện cho cá nhân, nhưng đuối với họp nhóm

- **Bối cảnh:** review từ tldv, bài Medium *“60 days test”*, và Saner.ai (**[nguồn mỏng — blog/review]**).
- **Làm gì / nhận xét:** AI Meeting Notes hữu ích cho **người dùng cá nhân** làm việc trong Notion (một mình ghi chú họp). Nhưng **đuối với họp nhóm/client tiếng Việt** vì: speaker labels chỉ chạy với tiếng Anh và họp 1-1/online (nhiều người chung một mic thì khó tách ai nói), không tự vào phòng họp, và chỉ chạy desktop.
- **Bài học:** chọn công cụ theo **bối cảnh họp**. Một mình + đã sống trong Notion → tiện; họp nhiều người cần biết ai nói gì → công cụ meeting chuyên dụng thắng.
- **Nguồn (review bên thứ ba):** tldv, Medium “60 days test”, Saner.ai.

::: warning 📉 CS6 — Con số "tăng năng suất ~35%" cần dấu hỏi lớn
Một vài blog dẫn rằng *“Notion's own data”* cho thấy AI tăng năng suất *“tới ~35%”*, và con số *“~34%”* (Decagon) cũng hay bị trích lại. **Vấn đề:** không tìm thấy **trang chính chủ gốc** cho con số 35%. → Hãy dùng các số này **kèm hedge mạnh** hoặc bỏ hẳn; đừng đưa vào báo cáo như sự thật đã kiểm chứng. Đây đúng là kiểu “số đẹp lan truyền” mà bạn nên tự nghi ngờ.
:::

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 6 điều mang theo
1. **Notion AI = lớp AI sống bên trong workspace** — mạnh nhất khi Notion là **trung tâm dữ liệu** của bạn/team.
2. **Hai chế độ agent:** Notion Agent (ra lệnh từng việc) vs **Custom Agents** (chạy nền 24/7 theo lịch/sự kiện, ra mắt 24/02/2026).
3. **AI thật chỉ có ở Business** ($20/người/tháng trả tháng, **$15 nếu trả năm**); Free/Plus chỉ dùng thử giới hạn. Custom Agents tốn thêm **credits $10/1.000**.
4. **`/meet` (chỉ desktop)** cho meeting notes; **Enterprise Search** quét Slack/Drive/GitHub/Gmail; **AI Autofill** điền database hàng loạt.
5. **Chọn model** GPT-5.2 / Claude Opus 4.5 / Gemini 3 hoặc Auto-select; đổi giữa chừng vẫn giữ ngữ cảnh.
6. **Người Việt dùng được** (UI tiếng Việt từ 22/07/2025, Translate có tiếng Việt); thanh toán thẻ/Apple Pay/Stripe, **không PayPal**. Không train trên dữ liệu khách; non-Enterprise giữ ≤30 ngày, Enterprise zero-retention.
:::

### Link chính thức từ Notion (nên bookmark)

Đây là các trang **chính chủ** để bạn tự kiểm tra thông tin mới nhất — luôn tin các link này hơn bài tổng hợp của bên thứ ba:

- **Trang sản phẩm AI:** https://www.notion.com/product/ai
- **Bảng giá & gói:** https://www.notion.com/pricing
- **AI Meeting Notes (help):** https://www.notion.com/help/ai-meeting-notes
- **Notion AI security & privacy:** https://www.notion.com/help/notion-ai-security-practices
- **Cam kết AI safety:** https://www.notion.com/help/ai-safety
- **Giá / credits Custom Agents:** https://www.notion.com/help/custom-agent-pricing
- **What's New / Releases:** https://www.notion.com/releases
- **Case study Ramp:** https://www.notion.com/customers/ramp

::: details 🔎 Ghi chú độ tin cậy (research tới giữa 2026)
- **Chắc (official):** giá gói (Business $20 trả tháng / **$15 trả năm**; Plus $12 / $10); khai tử add-on 5/2025; credits $10/1.000; ngày ra mắt Custom Agents (24/02/2026) & Notion 3.2 (20/01/2026); Research Mode (liệt kê trên trang pricing); connectors (Slack/Drive/GitHub/Asana/Gmail); chính sách bảo mật/retention; tiếng Việt UI (22/07/2025); thanh toán (thẻ/Apple Pay/SEPA, không PayPal, qua Stripe); case Ramp (>300 agents, ~70% giảm chi phí); AI Meeting Notes & Enterprise Search vẫn ở **beta** (tới giữa 2026).
- **Hedge "theo nguồn tới giữa 2026 / ~":** số ngôn ngữ (~16, tuỳ tính năng); tên/version model (GPT-5.2 / Claude Opus 4.5 / Gemini 3 — *các model nền này Notion có thể đã cập nhật lên bản mới hơn*); tốc độ “sub-3s autofill”; ước tính ~30–60 run / 1.000 credits; “Workers Beta tính credits 11/8”.
- **[Nguồn mỏng — kiểm lại trước khi trích]:** con số năng suất ~34% (Decagon, là *“up to”*) và ~35% (blog dẫn “Notion data”, **không thấy trang gốc**); so sánh chi phí Coda 100 người; đánh giá độ tin cậy agent (Reddit/blog).

*Số liệu (giá, model, tính năng, mốc ngày) có thể đã thay đổi — luôn kiểm tra lại tại notion.com/product/ai và notion.com/pricing.*
:::
