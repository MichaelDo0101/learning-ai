---
title: 'AI doanh nghiệp — Vertex AI: quản trị model cấp tổ chức'
description: 'Vertex AI trong hệ sinh thái Google AI: khi nào cần nền tảng quản trị model doanh nghiệp, Model Garden/MLOps/enterprise controls, so sánh với AI Studio và Firebase, chi phí và giới hạn triển khai.'
---

# AI doanh nghiệp — Vertex AI

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🏭</p>

::: tip 🔥 Thực chiến — 30 giây
Cách nhớ đơn giản nhất về 3 tầng triển khai: **AI Studio** trả lời câu hỏi *"prompt này có hoạt động không?"* — **Firebase/Cloud** trả lời *"app này có người dùng được không?"* — **Vertex AI** trả lời *"hệ thống AI này có thể được quản trị, giám sát và nhân rộng không?"* Khi bài toán vượt khỏi mức prototype — dữ liệu lớn, bảo mật chặt, nhiều người dùng, cần audit — đó là lúc cần Vertex AI.
**💸 Lợi ích thực tế:** không phải để AI "thông minh hơn", mà để **nền tảng quản trị xung quanh AI đầy đủ hơn**: phân quyền, giám sát, compliance, kiểm soát ngân sách.
:::

> **Điểm khác biệt của Vertex AI không phải model — mà là governance.**
> Model Garden, MLOps, enterprise-grade controls cho bảo mật và tuân thủ.

::: info 📍 Vị trí trong Google AI System
Hạng mục **AI doanh nghiệp** — "nhà máy AI" của hệ sinh thái, tầng cao nhất của Development & Deployment. Xem [bản đồ tổng quan](./)
:::

## 01 · Khi nào cần Vertex AI?

Vertex AI phù hợp khi bài toán **đã vượt khỏi mức prototype**:

- Trợ lý hỏi đáp nội bộ có **kiểm soát nguồn tri thức**
- Mô hình phân loại ticket khách hàng **quy mô lớn**
- Agent hỗ trợ phân tích tài liệu pháp lý
- Ứng dụng AI có **dữ liệu lớn, yêu cầu bảo mật chặt**

Và **chưa cần** khi: bạn còn đang thử xem prompt có giải quyết được bài toán không (→ [AI Studio](./5-ai-studio)), hoặc mới cần một app nội bộ cho một phòng ban (→ [Firebase](./7-firebase-cloud)).

| Nền tảng | Câu hỏi nó trả lời |
|---|---|
| AI Studio | "Prompt này có hoạt động không?" |
| Firebase / Cloud | "App này có người dùng được không?" |
| **Vertex AI** | "Hệ thống AI này có thể được quản trị, giám sát và nhân rộng không?" |

## 02 · Vertex AI cung cấp gì?

- **Model Garden** — kho model để chọn, so sánh, triển khai
- **MLOps** — pipeline huấn luyện/tuning/triển khai/giám sát model có quy trình
- **Enterprise-grade controls** — governance, security, compliance: IAM, audit trail, data residency
- **Monitoring & budget** — theo dõi hành vi model, chi phí token, budget alert

Đầu ra cần kiểm soát ở hạng mục này (theo bản đồ hệ sinh thái): **DevOps, phân quyền, budget alert, giám sát.**

## 03 · Tín hiệu cần chuyển từ Apps Script / Firebase lên Vertex AI

- Bài toán cần **quản trị truy cập** và **audit trail** đầy đủ
- Triển khai **production** kết nối nhiều hệ thống
- Yêu cầu bảo mật cao: dữ liệu nhân sự, tài chính, pháp lý quy mô tổ chức
- Cần **tuning model**, đánh giá chất lượng có quy trình, giám sát drift
- Số người dùng / số request vượt mức quota của giải pháp nhẹ

> ⚠️ Chiều ngược lại cũng đúng: **không bắt đầu bằng Vertex AI** nếu chưa chứng minh được use case bằng prototype nhỏ. Đi từ nhỏ đến lớn — AI Studio → Firebase → Cloud → Vertex AI.

## 04 · Chi phí, bảo mật và giới hạn triển khai

- **Chi phí:** không chỉ model API — còn hạ tầng, lưu trữ, traffic, logging, backup, nhân lực vận hành. Thiết lập **budget alert** ngay từ đầu.
- **Phân quyền (IAM):** nguyên tắc *least privilege* — tách quyền developer, reviewer, admin, operator, end-user. Không để một tài khoản vừa user vừa admin.
- **Bảo mật API/secrets:** gọi AI qua backend; backend đọc secret từ Secret Manager, kiểm tra quyền, log request.
- **Hallucination ở quy mô doanh nghiệp:** cơ chế kiểm soát gồm grounding theo tài liệu được duyệt, giới hạn phạm vi trả lời, human review ở bước quyết định, tập kiểm thử cố định chạy lại mỗi khi đổi model/prompt.
- **Nhân lực:** tầng này cần phối hợp DevOps/IT — vai trò của người triển khai nghiệp vụ là **đặt tiêu chuẩn nghiệm thu** và thiết kế quy trình duyệt.

## 05 · Vị trí trong quy trình 6 bước của tổ chức

Theo [mô hình hành động 6 bước](./) của Google AI System (Khám phá → Kết nối tri thức → Sản xuất → Sáng tạo → Tự động hóa → **Triển khai**), Vertex AI nằm ở bước cuối: đưa giải pháp vào vận hành thật ở cấp doanh nghiệp — IAM, monitoring, data residency, budget control.

**Đầu ra tối thiểu của bước này:** pilot có người dùng thật, thời gian cụ thể, KPI trước–sau, cơ chế feedback, tiêu chí tiếp tục/dừng.

## 📝 Prompt mẫu

```text
Với vai trò Finance/Procurement Control Agent (triển khai trên Vertex AI),
hãy kiểm tra hồ sơ đề xuất mua hàng: nhu cầu, ngân sách, báo giá, điều khoản,
thuế, phê duyệt, rủi ro, việc cần bổ sung. Không tự phê duyệt.
Không tư vấn pháp lý cuối cùng. Số không khớp → dừng, yêu cầu xác minh.
Đầu ra: checklist đạt/chưa đạt + thiếu sót + câu hỏi nhà cung cấp + bước tiếp.
```

```text
Với vai trò AI System Designer, hãy đánh giá use case sau có cần Vertex AI chưa:
[mô tả use case]. Phân tích theo: quy mô người dùng, mức nhạy cảm dữ liệu,
yêu cầu audit, nhu cầu tuning/giám sát model, chi phí dự kiến.
Đề xuất nền tảng phù hợp (AI Studio / Firebase / Cloud / Vertex AI) kèm lộ trình chuyển tiếp.
```

## ✅ Checklist trước khi lên Vertex AI

- ☐ Use case đã được chứng minh bằng prototype (AI Studio / Firebase)
- ☐ Dữ liệu đã phân loại; chính sách bảo mật AI đã được phê duyệt
- ☐ Cloud billing đã thiết lập với budget alert
- ☐ Đã tách quyền: developer / reviewer / admin / operator / end-user
- ☐ Có tập kiểm thử cố định và tiêu chí nghiệm thu
- ☐ Có người chịu trách nhiệm vận hành, giám sát và xử lý sự cố

## 🔗 Tài liệu tham khảo

- [Vertex AI Overview](https://docs.cloud.google.com/vertex-ai/docs/start/introduction-unified-platform) · [Vertex AI Generative AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs)
- [Vertex AI Agent Builder](https://docs.cloud.google.com/agent-builder) · [Migrate AI Studio → Vertex AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-google-ai)
- [Cloud Quotas](https://docs.cloud.google.com/docs/quotas/overview)

**Tiếp theo:** [Agent và code — Antigravity & AI Agent →](./9-antigravity-agent)
