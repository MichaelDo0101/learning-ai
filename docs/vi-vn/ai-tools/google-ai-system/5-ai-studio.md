---
title: 'Thử nghiệm prompt/API — Google AI Studio: từ prompt đến prototype'
description: 'Google AI Studio trong hệ sinh thái Google AI: prompt testing, model testing và Run settings, structured output, chuyển prompt sang API an toàn, thiết kế mini app human-in-the-loop.'
---

# Thử nghiệm prompt/API — Google AI Studio

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧪</p>

::: tip 🔥 Thực chiến — 30 giây
Có một ranh giới giữa **"dùng AI"** và **"xây giải pháp AI"**. Dùng AI là mở Gemini, hỏi một câu, nhận câu trả lời. Xây giải pháp AI là biến cách hỏi đó thành API, tích hợp vào ứng dụng, giao cho nhiều người dùng. **AI Studio là cầu nối giữa hai thế giới này** — phản ứng phổ biến nhất khi demo: "À, hóa ra prompt mình viết trên Gemini có thể biến thành API được?"
**💸 Lợi ích thực tế:** rút ngắn khoảng cách giữa ý tưởng nghiệp vụ và prototype kiểm thử được — phòng HR thử logic tạo biên bản phỏng vấn, đội sales thử logic phân loại lead, pháp chế thử logic trích xuất điều khoản.
:::

> **Nếu Gemini là nơi bạn hỏi và nhận câu trả lời, thì AI Studio là nơi bạn hỏi một câu khác:**
> **"Làm thế nào để câu trả lời này trở thành một phần của sản phẩm hoặc workflow?"**

::: info 📍 Vị trí trong Google AI System
Hạng mục **Thử nghiệm prompt/API** — "phòng thí nghiệm" của hệ sinh thái, trước khi sang [Firebase/Cloud](./7-firebase-cloud) và [Vertex AI](./8-vertex-ai). Xem [bản đồ tổng quan](./)
:::

## 01 · AI Studio là gì — và 3 cách hiểu sai

AI Studio (aistudio.google.com) là nơi bạn: thử prompt với nhiều model Gemini, điều chỉnh tham số (temperature, top-p, max tokens), so sánh phiên bản, thiết kế **structured output** (JSON), và **lấy code gọi API** để tích hợp.

Ba cách hiểu sai cần tránh:

1. ❌ *"AI Studio là chatbot nâng cấp"* — nếu chỉ hỏi đáp như Gemini, bạn bỏ lỡ phần quan trọng nhất: testing và chuyển sang API.
2. ❌ *"AI Studio tự tạo ứng dụng hoàn chỉnh"* — nó kiểm chứng **logic AI**; ứng dụng thật vẫn cần giao diện, bảo mật, phân quyền, log lỗi.
3. ❌ *"Get code nghĩa là copy thẳng vào sản phẩm"* — code mẫu là điểm khởi đầu; cần kiểm tra bảo mật API key, quản lý lỗi, quota trước khi dùng thật.

**Ai nên dùng:** người triển khai AI cho doanh nghiệp, L&D muốn tạo chatbot từ tài liệu, IT cần prototype trước khi phát triển full, quản lý dự án cần đánh giá tính khả thi use case. Người dùng văn phòng thông thường không cần dùng trực tiếp — nhưng hiểu nó giúp bạn biết: *"prompt mình viết tốt rồi có thể giao IT biến thành ứng dụng."*

## 02 · Prompt testing — kiểm tra độ ổn định, không chỉ một câu trả lời hay

Khi chat thông thường, bạn muốn **một** câu trả lời tốt. Khi làm prompt testing, bạn muốn kiểm tra prompt có **ổn định với nhiều đầu vào khác nhau** không: cuộc họp dài, nhiều người nói chen, quyết định mơ hồ, thiếu deadline — prompt còn dùng được không?

Thiết kế kịch bản kiểm thử gồm: vai trò xử lý → phạm vi nhiệm vụ (được/không được làm gì) → định dạng đầu ra → tiêu chí chất lượng → **test case** (trường hợp rõ, thiếu thông tin, mâu thuẫn, nhạy cảm).

> 💡 **Mẹo negative instruction:** thay vì chỉ "hãy tóm tắt cuộc họp", thêm: *"Không được tự thêm quyết định. Không biến thảo luận thành cam kết. Không tạo deadline nếu không có."* Những ràng buộc này giảm hallucination rất hiệu quả.

## 03 · Model testing và Run settings

Cùng một prompt có thể cho chất lượng khác nhau tùy model, tham số và công cụ được bật:

| Thiết lập | Ý nghĩa |
|---|---|
| **Model** | Gemini Pro / Flash và các phiên bản — mỗi model có ưu nhược riêng |
| **Temperature** | Cao → sáng tạo hơn; thấp → nhất quán hơn |
| **Top-p, Max tokens** | Kiểm soát phạm vi và độ dài phản hồi |
| **Safety settings** | Mức lọc nội dung không phù hợp |
| **Công cụ** | Structured output, function calling, code execution, grounding |

Câu hỏi cần đặt khi test: model xử lý tốt **tiếng Việt nghiệp vụ** không? Có suy diễn quá mức khi dữ liệu thiếu? Đầu ra ổn định khi đổi độ dài đầu vào? Chi phí/quota phù hợp nếu chạy nhiều lần/ngày?

Trong môi trường business, nên có **tiêu chí định lượng tối thiểu**: ví dụ 90% test case trả về đủ trường JSON bắt buộc; mọi trường hợp thiếu deadline phải được đánh dấu "cần xác minh".

## 04 · Structured output — từ câu trả lời tự do thành dữ liệu xử lý được

Đây là khái niệm **quan trọng nhất** khi chuyển từ prompt sang prototype. Văn bản tự do ổn cho người đọc nhưng không ổn cho ứng dụng: nếu mini app cần đưa action items vào Sheets, mỗi item cần các trường cố định — `task, owner, deadline, priority, evidence, needs_verification`. Gemini có thể được cấu hình trả lời theo **JSON Schema**.

**Nên dùng structured output khi:** đưa kết quả vào tracker/CRM/dashboard/workflow; phân loại phản hồi, ticket, lead; trích xuất trường cố định từ email, biên bản, hợp đồng.

> ⚠️ Structured output đảm bảo JSON **đúng cú pháp**, không đảm bảo giá trị bên trong **đúng ngữ nghĩa**. Ứng dụng vẫn cần validate: nếu model trả `owner: "Nguyễn A"`, phải kiểm tra transcript có thật sự nêu vậy không.

## 05 · Từ prompt sang API — Get code, API key và bảo mật

Quy trình 8 bước:

1. Hoàn thiện prompt: system instruction, ví dụ đầu vào/ra, trường hợp cần tránh
2. Chọn model và thiết lập tham số, safety settings
3. Thiết kế structured output nếu cần đưa vào ứng dụng
4. Chạy test case với nhiều đầu vào, ghi nhận lỗi, chỉnh prompt/schema
5. Dùng **Get code** lấy code mẫu (Python, JavaScript, cURL)
6. Thay API key theo cách an toàn — ưu tiên **biến môi trường**
7. Bọc lời gọi API bằng xử lý lỗi, timeout, validation, logging
8. Chỉ đưa vào workflow thật khi có tiêu chí kiểm thử và quy trình phê duyệt

**Bảo mật API key — 5 điều cấm:** không đưa lên slide công khai · không gửi trong chat nhóm · không lưu trong mã nguồn public · không nhúng vào frontend production · xóa key không còn dùng.

## 06 · Thiết kế mini app — tư duy human-in-the-loop

Mini app AI không cần phức tạp: giao diện nhỏ giúp người dùng **nhập dữ liệu → gọi model → nhận đầu ra có cấu trúc → dùng kết quả**. Ví dụ mini app *Meeting-to-Action*: vùng Input (dán transcript) → Settings (loại họp, giọng email) → Output (biên bản, action items, email draft, nút xuất CSV).

Cấu trúc tối thiểu: màn hình nhập liệu (ghi rõ dữ liệu được phép) → prompt hệ thống → schema đầu ra → lớp validation → **màn hình review để người dùng đọc, sửa và duyệt** → nút xuất → log và cảnh báo.

> **Điểm mấu chốt:** AI tạo bản nháp có cấu trúc — **con người kiểm tra và duyệt trước khi sử dụng**.

## 07 · Khi nào dùng AI Studio, khi nào chuyển tiếp?

| Giai đoạn | Nền tảng | Vai trò |
|---|---|---|
| Thử prompt, so sánh model, test structured output | **AI Studio** | Phòng thí nghiệm |
| Xây app có giao diện, preview, database, auth | **[Firebase Studio](./7-firebase-cloud)** | Xưởng prototype |
| Quản trị model, IAM, MLOps, compliance, quy mô lớn | **[Vertex AI](./8-vertex-ai)** | Nhà máy sản xuất |

Không ép AI Studio làm nhiệm vụ của Vertex AI — và ngược lại, đừng bắt đầu bằng Vertex AI nếu chưa biết prompt có giải quyết được bài toán hay không.

## 📝 Prompt mẫu

```text
Với vai trò kiến trúc sư giải pháp AI, hãy phân tích bài toán sau: [mô tả].
Xác định: đầu vào, đầu ra, tiêu chí chất lượng, model phù hợp,
structured output schema, 5 test case (gồm trường hợp thiếu dữ liệu và nhạy cảm),
rủi ro hallucination.
```

```text
Hãy tạo 10 test cases cho prompt [mô tả]. Gồm: trường hợp rõ ràng, thiếu thông tin,
mâu thuẫn, nhạy cảm, ngoài phạm vi. Mỗi test case: input, output kỳ vọng,
tiêu chí pass/fail, rủi ro nếu AI sai.
```

```text
Với bài toán [mô tả], hãy thiết kế JSON schema cho đầu ra. Mỗi trường: tên,
kiểu dữ liệu, mô tả, bắt buộc hay không, ví dụ giá trị.
Thêm trường needs_verification và evidence.
```

## ✅ Checklist chống hallucination và vận hành an toàn

Khi prompt trở thành API, câu trả lời AI không còn là nội dung tham khảo cá nhân — nó là **dữ liệu đầu vào cho quy trình**:

- ☐ Dữ liệu đầu vào có được phép đưa vào AI không? Đã ẩn thông tin nhạy cảm?
- ☐ Prompt có ràng buộc không suy đoán, không tự thêm số liệu, không tự tạo quyết định?
- ☐ Ứng dụng có kiểm tra JSON, trường bắt buộc, null, logic nghiệp vụ?
- ☐ Có bước con người duyệt trước khi gửi email, lưu dữ liệu, tạo báo cáo?
- ☐ API key quản lý an toàn — không hard-code, không public?
- ☐ Lỗi API, lỗi validation, trường hợp cần xác minh có được ghi log?
- ☐ Prototype có gắn nhãn "thử nghiệm", chưa phải công cụ ra quyết định chính thức?

## 🔗 Tài liệu tham khảo

- [AI Studio Quickstart](https://ai.google.dev/gemini-api/docs/ai-studio-quickstart) · [Google AI Studio](https://ai.google.dev/aistudio)
- [Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output) · [API Key Management](https://ai.google.dev/gemini-api/docs/api-key) · [Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)

**Tiếp theo:** [Tự động hóa — Apps Script →](./6-apps-script)
