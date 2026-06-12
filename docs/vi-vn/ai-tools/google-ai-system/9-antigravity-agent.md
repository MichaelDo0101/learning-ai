---
title: 'Agent và code — Antigravity & AI Agent: khi AI làm việc như một cộng sự'
description: 'Antigravity và agentic development trong hệ sinh thái Google AI: AI Agent khác chatbot thế nào, công thức giao việc 7 thành phần, framework KWSR, quy trình kiểm soát 8 bước và 5 rủi ro cần quản trị.'
---

# Agent và code — Antigravity & AI Agent

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🤖</p>

::: tip 🔥 Thực chiến — 30 giây
Ở các hạng mục trước, mô hình luôn là: bạn giao việc → AI trả kết quả → bạn kiểm tra. Đến đây câu chuyện đổi: AI không chỉ trả lời — AI **hành động**: mở file, sửa code, chạy lệnh terminal, kiểm tra giao diện trên trình duyệt, ghi lại bằng chứng và trình kết quả để bạn duyệt. Đó là chuyển dịch từ *coding assistant* sang **agentic development** — và Antigravity, nền tảng phát triển agentic của Google, là nơi chuyện này xảy ra.
**💸 Lợi ích thực tế:** có prototype (landing page, dashboard, tool nội bộ) sau **một buổi** thay vì chờ nhiều ngày — với điều kiện bạn biết giao việc và kiểm soát.
:::

> **Không dùng AI Agent như một phép màu. Hãy dùng nó như một nhân sự số** — có mô tả công việc, tài nguyên, quy trình, kỹ năng, quy tắc và cơ chế nghiệm thu rõ ràng.

::: info 📍 Vị trí trong Google AI System
Hạng mục **Agent và code** — tầng AI & Agent cho phát triển phần mềm. Xem [bản đồ tổng quan](./)
:::

## 01 · AI Agent khác chatbot ở điểm nào?

| Đặc điểm | Chatbot | AI Agent |
|---|---|---|
| Mô hình tương tác | Hỏi → Trả lời | Giao mục tiêu → Lập kế hoạch → Thực thi → Báo cáo |
| Phạm vi hành động | Trả lời trong cửa sổ chat | Đọc/sửa file, chạy terminal, mở browser |
| Đầu ra | Văn bản, gợi ý | File code, screenshot, test log, README |
| Kiểm soát | Người dùng tự sửa nếu sai | Cần workspace, rules, review trước khi deploy |
| Rủi ro | Sai thì bỏ qua | Sai có thể tạo hậu quả trên file, dữ liệu, chi phí |

> Khi AI chỉ trả lời, sai thì sửa. Khi AI **hành động**, sai có thể tạo hậu quả trên code, dữ liệu và quy trình. **Agent càng có khả năng hành động, càng cần hàng rào kiểm soát.**

**Vòng agentic coding tối thiểu — 6 bước:** giao mục tiêu → agent lập kế hoạch trước khi sửa file → người dùng **duyệt kế hoạch** → agent thực thi trong phạm vi cho phép → agent kiểm thử và tạo artifact → người dùng review, chấp nhận hoặc yêu cầu chỉnh.

**Khác với vibe coding:** vibe coding bắt đầu bằng cảm hứng ("tạo dashboard đẹp, dark mode") — tạo *tốc độ*. Agentic coding trong doanh nghiệp thêm hệ thống kiểm soát: dữ liệu nào được đọc, file nào không được sửa, lệnh nào bị cấm, test nào phải chạy, artifact nào phải nộp, ai duyệt — tạo *khả năng vận hành*.

## 02 · Antigravity — IDE theo hướng Agent-first

Google mô tả Antigravity là **nền tảng phát triển agentic**, kết hợp:

- **Editor View** — workflow đồng bộ kiểu IDE truyền thống: viết code, terminal, file tree
- **Manager Surface** — điều phối agent theo hướng task-oriented: giao nhiệm vụ, xem kế hoạch, review artifact

Agent có thể lập kế hoạch, thực thi và xác minh tác vụ qua editor, terminal và browser — đồng thời tạo **artifact**: task list, implementation plan, screenshot, browser recording để người dùng kiểm chứng. Bạn không cần đọc log thô — bạn nhìn thấy kế hoạch, kết quả, bằng chứng, **giống một cộng sự nộp báo cáo**.

Vị trí trong hệ sinh thái: [AI Studio](./5-ai-studio) thử prompt/model → [Firebase/Cloud](./7-firebase-cloud) triển khai ứng dụng → **Antigravity** tổ chức công việc phát triển: đọc mã nguồn, tạo file, chạy kiểm thử, quản lý tiến độ agent.

## 03 · Công thức giao việc cho Agent — 7 thành phần

Giao việc kiểu chatbot ("Tạo landing page cho khóa học AI") quá mơ hồ — agent có thể tạo trang nhìn ổn nhưng sai đối tượng, sai thông điệp, bịa cam kết. Công thức đầy đủ:

1. **Mục tiêu** — tạo sản phẩm gì, phục vụ ai, bối cảnh nào
2. **Đầu vào** — brief, brand guideline, tài liệu, asset
3. **Phạm vi** — file nào được sửa, file nào không được chạm
4. **Ràng buộc** — không bịa cam kết, không tự thêm học phí, không dùng hình rủi ro bản quyền
5. **Tiêu chuẩn nghiệm thu** — chạy được, responsive, không lỗi console, CTA rõ
6. **Artifact bắt buộc** — implementation plan, danh sách file, screenshot, test log, README, changelog
7. **Cơ chế duyệt** — agent trình kế hoạch trước; thay đổi nhạy cảm phải được duyệt

Cách giao này làm chậm bước đầu một chút — nhưng **giảm rất mạnh lỗi phía sau**.

## 04 · Framework KWSR

| Thành phần | Ý nghĩa | Ví dụ (dự án landing page) |
|---|---|---|
| **K**nowledge | Những gì agent biết | Brief sản phẩm, brand guideline, dữ liệu |
| **W**orkflow | Trình tự agent cần làm | Brief → Plan → Prototype → Test → README → Review |
| **S**kill | Năng lực chuyên biệt | Tạo giao diện, viết copy, kiểm thử responsive, ghi changelog |
| **R**ule | Ranh giới không được vượt | Không xóa dữ liệu gốc, không commit secrets, không tự deploy production |

Workspace thực hành gợi ý:

```text
Project_AI_LandingPage/
├── 01_Inputs/           # Dữ liệu gốc, chỉ đọc
├── 02_Workspace/        # Nơi agent xử lý
├── 03_Outputs/          # Thành phẩm gửi duyệt
├── 04_Logs/             # Test log, screenshot, changelog
└── AGENT_BRIEF.md       # Vai trò, mục tiêu, quy tắc, nghiệm thu
```

## 05 · Quy trình kiểm soát agent — 8 bước

1. Tạo **brief 1 trang**: mục tiêu, người dùng, dữ liệu đầu vào, output, những điều không được bịa
2. Yêu cầu agent đọc brief và **hỏi lại nếu thiếu thông tin** — không cho làm khi yêu cầu còn mơ hồ
3. Yêu cầu agent lập **implementation plan**: danh sách file, cấu trúc, cách kiểm thử, artifact
4. **Duyệt kế hoạch** — chỉnh nếu agent hiểu sai mục tiêu hoặc chọn giải pháp quá phức tạp
5. Cho agent thực hiện trong **workspace đã giới hạn** — không sửa ngoài thư mục dự án
6. Agent **tự kiểm thử**: mở trang, lỗi console, responsive, link/CTA, nội dung nhạy cảm
7. Yêu cầu **artifact**: screenshot, danh sách file, README, CHANGELOG, TEST_LOG
8. **Con người review cuối**: nghiệp vụ, thương hiệu, bảo mật, trải nghiệm — quyết định phát hành

Với bài tập nhỏ có thể bỏ vài bước. Với dự án thật — đặc biệt có dữ liệu khách hàng — quy trình này **bắt buộc**.

## 06 · Năm rủi ro khi dùng AI Agent

| Rủi ro | Kiểm soát |
|---|---|
| Sai logic nghiệp vụ (trang đẹp nhưng sai gói/đối tượng/lời hứa) | Brief rõ, checklist nghiệm thu, người phụ trách nghiệp vụ review |
| Thao tác nhầm file (sửa nhầm, ghi đè, xóa) | Backup, branch riêng, `01_Inputs` chỉ đọc, cấm lệnh xóa hàng loạt |
| Rò rỉ dữ liệu (agent đọc file chứa secrets, PII) | Biến môi trường, Secret Manager, không hard-code key |
| Code chạy được nhưng không an toàn | Checklist bảo mật: validate input, không lộ key, không dependency lạ |
| Chi phí và quota (agent lặp nhiều vòng) | Giới hạn số vòng, yêu cầu agent dừng và báo cáo sau mỗi mốc lớn |

> **Nguyên tắc vàng: quyền của Agent phải nhỏ hơn quyền của người dùng.** Agent chỉ đọc/sửa trong phạm vi bài toán — không được toàn quyền ổ đĩa, repository hay cloud account.

## 07 · Bài thực hành: điều phối agent tạo landing page khóa học

Brief mẫu: khóa *AI Productivity Bootcamp*, đối tượng nhân viên văn phòng chưa có nền tảng kỹ thuật, 2 ngày, CTA đăng ký lớp nội bộ. **Không được bịa:** cam kết tăng lương, số liệu không nguồn, logo chưa được phép.

```text
Bạn là AI Agent hỗ trợ phát triển web. Tạo landing page cho khóa học
AI Productivity Bootcamp.

Yêu cầu: (1) Lập implementation plan trước khi tạo file. (2) Không sửa/xóa file
trong 01_Inputs/. (3) Prototype trong 02_Workspace/, thành phẩm lưu 03_Outputs/.
(4) Nội dung không bịa cam kết, không tự thêm học phí. (5) Sau khi tạo: kiểm tra
mở được, responsive, CTA, console, chính tả. (6) Tạo README.md, CHANGELOG.md,
TEST_LOG.md.

Tiêu chuẩn nghiệm thu: Trang có Hero, Lợi ích, Nội dung học, Lịch trình 2 ngày,
FAQ, CTA. Responsive desktop + mobile. Không dùng dữ liệu thật.
```

**5 lớp review sau khi agent tạo prototype:** (1) chạy được — mở trang không lỗi; (2) bố cục — Hero, CTA, FAQ rõ; (3) nội dung — không bịa cam kết; (4) responsive — xem trên mobile; (5) tài liệu — README, CHANGELOG, TEST_LOG đầy đủ.

## ✅ Checklist nghiệm thu

- ☐ Agent có lập kế hoạch trước khi sửa file?
- ☐ Agent có giới hạn thao tác trong workspace?
- ☐ Trang/sản phẩm chạy được?
- ☐ Nội dung có bịa cam kết, học phí, số liệu không?
- ☐ Có README, CHANGELOG, TEST_LOG?
- ☐ Người phụ trách nghiệp vụ đã duyệt?
- ☐ Người phụ trách kỹ thuật đã kiểm tra kết nối/form/deploy?

## 🔗 Tài liệu tham khảo

- [Google Antigravity — agentic development platform](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/)
- [Google AI Studio](https://ai.google.dev/aistudio) · [Vertex AI Agent Builder](https://docs.cloud.google.com/agent-builder) · [Gemini API](https://ai.google.dev/gemini-api/docs)
- Xem thêm trong app: [Agentic AI — chuyên đề](../../agentic-ai/) · [Gemini CLI → Antigravity](../9-gemini)

**Tiếp theo:** [AI trên thiết bị — AI Edge Gallery →](./10-ai-edge)
