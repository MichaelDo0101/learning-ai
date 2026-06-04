---
title: 'Công cụ AI — Bộ đồ nghề thực chiến 2026'
description: 'Tuyển tập hướng dẫn thực chiến các công cụ AI quan trọng nhất 2026: ChatGPT, Claude Code, Claude Cowork, OpenAI Codex, GitHub, OpenClaw, Hermes Agent — cài đặt, workflow, mẹo và bối cảnh Việt Nam.'
---

# Công cụ AI — Bộ đồ nghề thực chiến

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧰</p>

::: tip 🔥 Thực chiến — 30 giây
Biết một công cụ AI “đỉnh” mà không biết *khi nào dùng cái nào* thì vẫn chậm. Module này không dạy lý thuyết suông — mỗi chương là **một công cụ, một quy trình làm thật**: cài ở đâu, trả tiền sao (giá ở VN), gõ lệnh/prompt gì, và bẫy nào hay sập.
**💸 Lợi ích thực tế:** chọn đúng công cụ cho đúng việc → tiết kiệm hàng giờ mỗi ngày và tiền subscription.
:::

> **Không có “công cụ tốt nhất” — chỉ có “công cụ đúng cho việc của bạn”.**
> Module này giúp bạn xây *bộ đồ nghề* cá nhân: trợ lý hội thoại, coding agent, nền tảng dev, và agent tự host.

## 🗺️ Bản đồ công cụ — dùng cái nào khi nào

| Công cụ | Mạnh nhất ở | Khi nào chọn |
|---|---|---|
| **[ChatGPT](./1-chatgpt)** | Trợ lý đa năng: viết, dịch, đọc file, phân tích | Việc hằng ngày, không cần cài |
| **[Gemini](./9-gemini)** | Trợ lý đa phương thức, gắn hệ sinh thái Google | Trong Gmail/Docs, context dài, free hào phóng |
| **[Grok](./11-grok)** | Chatbot xAI, dữ liệu real-time từ X | Bắt trend, hỏi thẳng, đã có X Premium |
| **[Perplexity](./10-perplexity)** | Answer engine có trích dẫn nguồn | Tra cứu, nghiên cứu cần dẫn nguồn |
| **[NotebookLM](./13-notebooklm)** | Trợ lý chỉ trả lời từ tài liệu bạn đưa | Học/nghiên cứu từ PDF, tài liệu riêng |
| **[Claude Code](./2-claude-code)** | Agent lập trình tự hành trong terminal | Code dự án thật, sửa nhiều file |
| **[OpenAI Codex](./4-codex)** | Coding agent CLI / Cloud / IDE | Giao task code chạy nền, song song |
| **[Cursor](./8-cursor)** | AI code editor (fork VS Code), Tab & Agent | Vừa code tay vừa nhờ AI, autocomplete đỉnh |
| **[Claude Cowork](./3-claude-cowork)** | Agent giao việc văn phòng (không code) | Tự động hoá giấy tờ, nghiên cứu |
| **[n8n](./12-n8n)** | Tự động hoá no-code, dựng AI agent kéo-thả | Nối app, workflow tự động, tự host |
| **[GitHub](./5-github)** | Lưu code, cộng tác, version control | Mọi dự án code — kỹ năng nền tảng |
| **[OpenClaw](./6-openclaw)** | Agent mã nguồn mở chạy local, ra lệnh qua chat | Tự host, riêng tư, nối Telegram/Zalo |
| **[Hermes Agent](./7-hermes-agent)** | Agent tự host có trí nhớ, đa kênh | Trợ lý 24/7 riêng, nhớ ngữ cảnh dài |

## 🧭 Lộ trình gợi ý

1. **Người mới** → [ChatGPT](./1-chatgpt) (trợ lý đa năng) + [GitHub](./5-github) (kỹ năng nền tảng).
2. **Tra cứu & nghiên cứu** → [Perplexity](./10-perplexity) (có nguồn), [NotebookLM](./13-notebooklm) (từ tài liệu riêng).
3. **Code với AI** → [Cursor](./8-cursor) (IDE) hoặc [Claude Code](./2-claude-code) / [OpenAI Codex](./4-codex) (terminal/agent).
4. **Dân văn phòng / không code** → [Claude Cowork](./3-claude-cowork); tự động hoá với [n8n](./12-n8n).
5. **So các chatbot lớn** → [ChatGPT](./1-chatgpt) vs [Gemini](./9-gemini) vs [Grok](./11-grok).
6. **Agent riêng, tự host** → [OpenClaw](./6-openclaw), [Hermes Agent](./7-hermes-agent).

---

## 🔗 Kết hợp công cụ — một quy trình thật

Sức mạnh thật không nằm ở một công cụ, mà ở chỗ **nối chúng lại**. Ví dụ đưa một ý tưởng web app từ con số 0 đến lúc ship:

| Bước | Làm gì | Công cụ |
|---|---|---|
| 1. Ý tưởng & spec | Brainstorm, viết PRD, phác luồng màn hình | [ChatGPT](./1-chatgpt) |
| 2. Dựng code | Giao spec, để agent tạo khung + sửa nhiều file | [Claude Code](./2-claude-code) hoặc [Codex](./4-codex) |
| 3. Lưu & cộng tác | Commit, branch, Pull Request, review | [GitHub](./5-github) |
| 4. Tự động hoá nền | Agent chạy theo lịch, quét issue, gửi báo cáo | [Cowork](./3-claude-cowork) / [Hermes](./7-hermes-agent) / [OpenClaw](./6-openclaw) |

> 💡 Mẹo: dùng **một trợ lý hội thoại để NGHĨ** (ChatGPT/Claude) và **một coding agent để LÀM** (Claude Code/Codex) — đừng bắt một công cụ gánh tất cả.

## 💳 Free hay trả phí?

| Công cụ | Có bản free? | Khi nào cần trả tiền |
|---|---|---|
| ChatGPT | ✅ (giới hạn) | Cần model mạnh, dùng nhiều, Projects/Agent |
| Gemini | ✅ (hào phóng) | Pro: Deep Research, context dài (sinh viên: 1 năm free) |
| Grok | ✅ (giới hạn) | SuperGrok / X Premium để dùng nhiều |
| Perplexity | ✅ (giới hạn) | Pro ~$20: Deep Research, model mạnh, Comet |
| NotebookLM | ✅ (rộng rãi) | Plus khi cần nhiều notebook/nguồn |
| Cursor | ✅ (giới hạn) | Pro ~$20 khi dùng nhiều (hết credit nhanh) |
| n8n | ✅ (self-host: free) | Cloud trả phí nếu không tự host |
| Claude Code | ❌ (cần gói trả phí/API) | Ngay từ đầu (Pro/Max hoặc API) |
| Claude Cowork | ❌ (theo gói Claude) | Theo gói Claude trả phí |
| OpenAI Codex | ✅ (kèm gói ChatGPT) | Dùng nhiều / chạy cloud nặng |
| GitHub | ✅ (rộng rãi) | Tính năng team / Copilot Pro (sinh viên: free) |
| OpenClaw | ✅ (MIT — free phần mềm) | Chỉ trả token LLM (hoặc $0 nếu chạy local) |
| Hermes Agent | ✅ (MIT — free phần mềm) | Chỉ trả token (hoặc $0 với Ollama/free tier) |

> Chi tiết giá + cách thanh toán ở VN nằm trong **mục 02** của từng chương.

## ❓ FAQ nhanh

::: details Người mới hoàn toàn nên bắt đầu công cụ nào?
**ChatGPT** (trợ lý đa năng, không cần cài) + **GitHub** (kỹ năng nền tảng). Hai cái này dùng được cho gần như mọi việc và phần lớn miễn phí.
:::

::: details Không biết code, muốn AI làm giúp việc giấy tờ/nghiên cứu?
[ChatGPT](./1-chatgpt) cho việc lặt vặt; [Claude Cowork](./3-claude-cowork) khi muốn *giao hẳn một mục tiêu nhiều bước* và nhận sản phẩm.
:::

::: details Muốn AI viết code cho dự án thật — chọn Claude Code hay Codex?
Chọn theo **gói bạn đã có**: đang trả Claude Pro/Max → [Claude Code](./2-claude-code); đang trả ChatGPT → [Codex](./4-codex). Cả hai đều mạnh — khác biệt nhỏ hơn so với việc bạn dùng kỷ luật tới đâu.
:::

::: details Lo dữ liệu/riêng tư, không muốn gửi lên cloud?
Dùng **agent tự host** ([OpenClaw](./6-openclaw) / [Hermes Agent](./7-hermes-agent)) + model chạy local (Ollama) → dữ liệu không rời máy bạn.
:::

::: details Thanh toán ở Việt Nam thế nào?
Đa số nhận **thẻ Visa/Mastercard quốc tế**; một số có thẻ ảo/đối tác trả bằng VND. Chi tiết từng công cụ ở **mục 02** mỗi chương.
:::

::: warning ⏱️ Lưu ý thời sự
Công cụ AI đổi giá & tính năng **rất nhanh**. Nội dung cập nhật tới khoảng **giữa 2026** — luôn kiểm tra trang chính thức trước khi mua gói.
:::
