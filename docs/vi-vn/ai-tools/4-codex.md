---
title: 'OpenAI Codex — coding agent của OpenAI trong terminal & cloud'
description: 'Hướng dẫn thực chiến OpenAI Codex (bản hồi sinh 2025–2026): coding agent đa bề mặt (CLI Rust, Cloud sandbox, IDE, app). Cài đặt, đăng nhập bằng gói ChatGPT, bối cảnh VN, giá theo token, AGENTS.md, approval/sandbox, MCP — kèm lệnh & prompt thật.'
---

# OpenAI Codex — coding agent của OpenAI

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧩</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn là dev một startup ở Sài Gòn. 4h chiều sếp ném task: *“Hàm `parseDate` parse sai định dạng `dd/MM/yyyy`, fix + thêm test cho pass.”* Bạn mở terminal, gõ `codex`, dán đúng câu đó bằng tiếng Việt. Codex **tự đọc** `src/utils/date.ts`, hiểu repo, **viết test**, **chạy** `pnpm test`, thấy đỏ, **tự sửa** code rồi chạy lại tới khi xanh — bạn chỉ ngồi duyệt diff.
**💸 Lợi ích thực tế:** việc “đọc code lạ + viết test + chạy + sửa” vốn ngốn 1–2 giờ nay còn ~15 phút; bạn dồn thời gian vào phần khó thật sự thay vì việc lặp.
:::

> **“Codex không phải autocomplete gợi dòng code.**
> **Nó là một agent biết tự đọc repo, sửa file, chạy test và lệnh shell để hoàn thành tác vụ kỹ thuật — và đó là khác biệt phải nắm trước khi đụng phím.”**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Cài** Codex CLI (npm/brew/script) và **đăng nhập** bằng gói ChatGPT của bạn — không cần API key.
- **Chạy một phiên** Codex để giao việc bằng tiếng Việt, xem diff trước khi apply.
- **Viết `AGENTS.md`** cho repo để định hướng agent làm đúng ngay từ đầu.
- **Chọn đúng chế độ an toàn** (`approval_policy` + `sandbox_mode`) cho repo lạ vs repo của bạn.
- **Tự động hóa** một bước trong CI/script bằng `codex exec` (chạy không tương tác).
- **Quyết định** khi nào dùng CLI/IDE (sửa nhanh) vs Codex Cloud (việc nặng, chạy lâu, trả về PR).
:::

::: warning ⚠️ Lưu ý mốc thời gian
Đây là hiểu biết tới **giữa 2026** về Codex bản hồi sinh. OpenAI đổi giá/tính năng/khu vực **rất nhanh** (riêng cách tính tiền đã đổi từ per-message sang theo token trong năm 2026). Trước khi cam kết tiền, hãy tự kiểm tra lại tại trang chính thức [openai.com/codex](https://openai.com/codex/) và [developers.openai.com/codex](https://developers.openai.com/codex/).
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**OpenAI Codex** (bản 2025–2026) là **AI coding agent** — tác tử lập trình của OpenAI. Khác với gợi ý code kiểu autocomplete, nó **tự đọc codebase, sửa file, chạy test/shell** và hoàn thành một tác vụ kỹ thuật từ đầu đến cuối.

::: warning 🚨 Đừng nhầm hai “Codex”
Tên *Codex* có **hai thực thể khác hẳn nhau**:
- **Codex bản gốc 2021–2023:** một *model sinh code* (code-davinci) — **đã khai tử**.
- **Codex bản hồi sinh từ 5/2025:** một *coding agent* đa bề mặt, chạy trên các model GPT-5.x — **đây là thứ chương này nói tới**.

Nhầm hai cái này là sai lầm phổ biến nhất khi đọc tài liệu cũ trên mạng.
:::

Điểm đặc biệt: Codex không phải một app duy nhất, mà là **một họ sản phẩm 4 bề mặt** chia sẻ chung “bộ não”:

| Bề mặt | Là gì | Dùng khi |
|---|---|---|
| **Codex CLI** | Agent chạy trong terminal, **mã nguồn mở, viết bằng Rust** | Bạn sống trong terminal, muốn sửa nhanh + xem diff (tương đương lớp Claude Code) |
| **Codex Cloud** | Agent chạy trong **sandbox đám mây**, làm việc bất đồng bộ rồi trả về **PR/diff** | Việc nặng/chạy lâu, không muốn chiếm máy local; giao qua web/GitHub/Slack/mobile |
| **IDE extension** | Tiện ích chính thức cho **VS Code, Cursor, Windsurf** | Bạn muốn agent ngay trong editor, chọn model qua model selector |
| **Codex app** | App **desktop & iOS** | Làm việc trên máy bàn/điện thoại; iOS có khóa Face ID/passcode |

Model nền hiện tại: **GPT-5.5** (model agentic-first ra mắt 23/4/2026) và dòng **GPT-5.x-Codex**.

::: tip 🔑 Một số tính năng đáng để ý
- **Goal mode** (GA từ 21/5/2026): đặt một *mục tiêu*, Codex tự lái nhiều giờ/nhiều ngày tới đích — có ở app, IDE, CLI.
- **Computer use:** Codex đọc màn hình & thao tác app desktop (macOS, và **Windows từ 29/5/2026**) — phục vụ GUI testing, QA end-to-end.
- **Code review tự động** trên pull request: đọc diff, nhận xét, đề xuất sửa.
- **`AGENTS.md`:** file chỉ dẫn dự án để định hướng agent (hỗ trợ cả `AGENTS.override.md`).
- **MCP (Model Context Protocol):** khai báo `[mcp_servers.<tên>]` để gắn tool ngoài.
- **Sites plugin** (preview, 2/6/2026): build & deploy website ngay từ sidebar của app.
:::

**Khi nào nên dùng Codex?** Khi tác vụ của bạn là *kỹ thuật phần mềm thật* (sửa bug, thêm test, refactor, đọc repo lạ) chứ không chỉ “hỏi đáp code”. Việc càng lặp, càng nhiều bước “đọc → sửa → chạy → sửa lại”, agent càng ăn tiền.

::: tip 📌 Ví dụ thật — Codex không còn chỉ để code (mốc 2026)
Bối cảnh: OpenAI công bố Codex vượt **hơn 4 triệu developer/tuần** (tăng từ hơn 3 triệu chỉ 2 tuần trước đó), usage team tăng **~6x** so với tháng 1 và **~10x** so với tháng 8.

Điều bất ngờ: tới tháng 5/2026, **~50% lượt dùng Codex KHÔNG còn là coding** — người ta dùng nó để quản lý inbox, điều khiển máy Mac, chạy việc dài theo một “mục tiêu”. Codex đã chuyển từ “coding assistant” sang “full-stack work platform”.

Bài học: nếu mới tiếp cận Codex, đừng tự giới hạn ở “viết code”. Nhưng cũng nhớ: các con số phần trăm này là **do OpenAI tự công bố**, đọc như chỉ dấu xu hướng chứ không phải sự thật kiểm chứng độc lập.

*Nguồn: OpenAI “Building more with GPT-5.1-Codex-Max” — https://openai.com/index/gpt-5-1-codex-max/ ; tổng hợp KuCoin — https://www.kucoin.com/news/flash/codex-evolves-from-coding-assistant-to-full-stack-work-platform-with-4m-weekly-active-users*
:::

---

## 02 · Cài đặt & truy cập — bối cảnh VN

### 2.1 · Có dùng được ở Việt Nam không? — Được

Từ **10/2025**, OpenAI mở gói **ChatGPT Go** cho 16 nước châu Á, **trong đó có Việt Nam**, và **chấp nhận thanh toán bằng nội tệ (VND)**. Trước đó VN từng gặp lỗi *“OpenAI unavailable in your country”* — nay không còn. Codex **đi kèm gói ChatGPT** nên khi bạn đã có gói là dùng được; đường API cũng hỗ trợ.

::: warning ⚠️ Tự xác minh lại
Chính sách quốc gia/khu vực **thay đổi nhanh**. Trước khi mua, kiểm tra lại khả năng truy cập & thanh toán cho VN tại trang chính thức — đừng tin một bài viết cũ (kể cả chương này).
:::

### 2.2 · Cài Codex CLI

Chọn **một** cách hợp với máy bạn:

```bash
# Cách 1 — npm (mọi nền tảng)
npm install -g @openai/codex

# Cách 2 — Homebrew (macOS)
brew install --cask codex

# Cách 3 — script (macOS/Linux)
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Trên **Windows** (PowerShell):

```text
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

Hỗ trợ: **macOS** (Apple Silicon + x86_64), **Linux** (x86_64 + arm64), **Windows**.

Kiểm tra cài đặt thành công:

```bash
codex --version
```

### 2.3 · Đăng nhập

Hai đường, chọn một:

| Cách | Ưu | Nhược |
|---|---|---|
| **Sign in with ChatGPT** (khuyến nghị) | Dùng **quota gói ChatGPT** (Plus/Pro/Business/Edu/Enterprise); model mới ra sớm | Bị giới hạn theo cửa sổ trượt của gói |
| **API key** (`OPENAI_API_KEY`) | Tính theo token, không có rate limit cố định | Model/tính năng mới **thường ra trễ hơn** so với gói ChatGPT |

Chạy `codex`, chọn **“Sign in with ChatGPT”** rồi làm theo hướng dẫn — đây là đường vào dễ nhất cho người học VN.

### 2.4 · Giá (gói ChatGPT, đã gồm Codex)

| Gói | Giá | Dành cho |
|---|---|---|
| **Free** | $0 | Chỉ “khám phá” tác vụ nhanh, model nhỏ kiểu Codex Mini, **giới hạn rất chặt** |
| **Go** | ~$8/tháng | Việc nhẹ — điểm vào hợp lý cho dev VN |
| **Plus** | $20/tháng | Phiên tập trung; giới hạn theo **cửa sổ trượt 5 giờ** (vd GPT-5.5: ~15–80 message local/5h) |
| **Pro** | từ $100/tháng (có bậc tới $200) | Giới hạn cao gấp **5x hoặc 20x** Plus (GPT-5.5 bậc 20x: ~300–1.600 message/5h) |
| **Business** | trả theo **seat** (pay-as-you-go) | Team |
| **Enterprise / Edu** | liên hệ sales | Tổ chức lớn / trường học |

::: details 💸 Giá theo token (khi vượt hạn mức, tính bằng credits)
Từ **2/4/2026** OpenAI đổi sang tính **theo token** thay vì per-message. Bảng tham khảo (input / output, đơn vị credits trên 1M token):

| Model | Input /1M | Output /1M |
|---|---|---|
| **GPT-5.5** | 125 | 750 |
| **GPT-5.4** | 62.5 | 375 |
| **GPT-5.4-mini** | 18.75 | 113 |
| **GPT-5.3-Codex** | 43.75 | 350 |

- **Cached input** chỉ tốn ~10% giá → repo càng ổn định, càng rẻ.
- Thực tế trung bình **~$100–$200/dev/tháng** tùy model & cường độ.
:::

::: tip 🎯 Chọn gói cho người học VN
- Mới thử Codex → **Go (~$8)** hoặc **Plus ($20)** là đủ để trải nghiệm CLI/IDE.
- Hay đụng trần cửa sổ 5 giờ với Plus → cân nhắc **Pro** (5x/20x) thay vì trả thêm credit lẻ.
- Codex **hiểu prompt tiếng Việt tốt**; `AGENTS.md` cũng viết tiếng Việt được (UI/tài liệu thì tiếng Anh).
:::

---

## 03 · Workflow thực chiến — làm từng bước

Đây là luồng chuẩn từ con số 0 tới lúc agent chạy được việc thật.

**Bước 1 — Cài CLI** (xem mục 2.2). Verify:

```bash
codex --version
```

**Bước 2 — Đăng nhập.** Chạy `codex`, chọn *Sign in with ChatGPT* (hoặc đặt biến môi trường nếu dùng API):

```bash
export OPENAI_API_KEY="sk-..."   # chỉ khi dùng đường API key
```

**Bước 3 — Vào thư mục dự án và viết `AGENTS.md`.** Đây là **đòn bẩy lớn nhất** để agent làm đúng. Đặt file ở **repo root**:

```text
# AGENTS.md  (ví dụ tối thiểu, đặt ở repo root)
# Project: my-app
# Build: pnpm install && pnpm build
# Test: pnpm test
# Quy ước: TypeScript strict, không thêm dependency mới khi chưa hỏi
```

::: tip 📌 Ví dụ thật — `AGENTS.md` là “công tắc hành vi”
Theo chia sẻ trên Hacker News (thread “Many of us prefer OpenAI’s Codex…”) và blog dev Jason Liu, chỉ cần **đổi nội dung `AGENTS.md`** đã tạo ra “thay đổi hành vi rất lớn” cho agent — đây là lý do nhiều người chọn Codex thay vì công cụ khác.

Một mẹo thực chiến đáng học: ngoài lệnh build/test, hãy **yêu cầu chính agent tự ghi lại điều nó học được** vào `AGENTS.md` (ví dụ: “khi phát hiện quy ước mới của repo, cập nhật vào file này”). Jason Liu để `AGENTS.md` trong một vault Obsidian rồi **sync lên GitHub**, nhờ đó anh review được bằng diff “agent đã nhớ/đổi những gì” qua thời gian.

Bài học: `AGENTS.md` không phải file tĩnh viết-một-lần — coi nó như bộ nhớ sống của agent thì giá trị tăng theo thời gian.

*Nguồn: Hacker News — https://news.ycombinator.com/item?id=47667380 ; blog Jason Liu “Codex-maxxing” — https://jxnl.co/writing/2026/05/10/codex-maxxing/*
:::

**Bước 4 — Mở phiên tương tác** và gõ yêu cầu bằng ngôn ngữ tự nhiên:

```bash
codex
# rồi gõ, ví dụ:
# "thêm test cho hàm parseDate rồi làm cho pass"
```

Muốn chỉ định model:

```bash
codex --model gpt-5.5
# hoặc viết gọn:
codex -m gpt-5.5
```

**Bước 5 — Chọn chế độ duyệt phù hợp.** Mặc định là `on-request` (agent hỏi khi cần). Tùy mức tin tưởng repo:

| Tình huống | Nên đặt |
|---|---|
| Repo lạ, chưa tin | `sandbox_mode = read-only` hoặc approval `on-request` |
| Repo của bạn, muốn chạy nhanh | `workspace-write` / full-auto |
| **Hầu như không bao giờ** | `danger-full-access` (rủi ro cao — xem mục 04) |

**Bước 6 — Việc lớn/chạy lâu → bật Goal mode** để agent tự lái tới mục tiêu nhiều giờ (có ở app, IDE, CLI).

**Bước 7 — Việc bất đồng bộ hoặc nặng → giao cho Codex Cloud.** Vào [chatgpt.com/codex](https://chatgpt.com/codex) (hoặc khởi động từ GitHub/Slack), agent chạy trong sandbox đám mây và **trả về PR** — máy local của bạn rảnh.

**Bước 8 — Tự động hóa/CI → dùng `codex exec`** (non-interactive): chạy một lệnh, lấy kết quả, không cần ngồi tương tác:

```bash
codex exec "viết unit test cho src/utils/date.ts rồi chạy cho pass"
```

**Bước 9 — Mở rộng tool bằng MCP.** Khai báo MCP server trong `~/.codex/config.toml` để Codex gọi tool ngoài:

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[mcp_servers.fetch]
command = "npx"
```

::: tip 🔑 Lệnh trong phiên (slash commands)
Khi đang ở trong một phiên Codex tương tác, bạn có thể dùng các lệnh gạch chéo:

```text
/plan     # cho agent lập kế hoạch trước
/exec     # thực thi
/review   # rà soát thay đổi
/model    # đổi model giữa chừng
/side     # mở một hội thoại phụ (cũng có trên ChatGPT iOS)
```
:::

::: details 🧩 Ví dụ một config.toml đầy đủ hơn (giải thích từng dòng)
```toml
# model nền cho agent
model = "gpt-5.5"

# approval_policy: untrusted | on-request | never
#   - untrusted  : nghi ngờ, hỏi nhiều nhất
#   - on-request : mặc định, hỏi khi cần (an toàn & tiện)
#   - never      : không hỏi (chỉ khi bạn THẬT sự tin)
approval_policy = "on-request"

# sandbox_mode: read-only | workspace-write | danger-full-access
#   - read-only         : chỉ đọc, không sửa file (an toàn nhất cho repo lạ)
#   - workspace-write    : được sửa file trong workspace
#   - danger-full-access : full quyền (RỦI RO — tránh nếu không thật cần)
sandbox_mode = "workspace-write"

# Gắn tool ngoài qua MCP
[mcp_servers.fetch]
command = "npx"
```
> Lưu ý: `config.toml` đặt **trong repo** (`.codex/config.toml`) chỉ được nạp khi bạn “trust” dự án — dùng để override cấu hình theo từng project.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 4.1 · Mẹo ăn tiền

::: tip ✅ 7 mẹo thực chiến
1. **Viết `AGENTS.md` rõ ràng** (lệnh build/test, style, ranh giới được phép) — đây là đòn bẩy lớn nhất để agent làm đúng ngay từ đầu.
2. **Bắt đầu an toàn với repo lạ:** `sandbox_mode=read-only` hoặc approval `on-request`; chỉ mở `workspace-write` khi đã tin. Tránh `danger-full-access` trừ khi thật sự cần.
3. **Đúng công cụ cho đúng việc:** `codex exec` cho CI/script tự động; phiên tương tác cho việc cần **xem diff trước khi apply**.
4. **Việc chạy lâu/độc lập → đẩy lên Codex Cloud** để không chiếm máy local và nhận về PR; việc cần sửa nhanh ngay → CLI/IDE.
5. **Chọn model theo độ khó:** GPT-5.5 cho task phức tạp; dòng **-mini** để tiết kiệm credit cho task đơn giản — vì giá token chênh nhiều lần.
6. **Theo dõi cửa sổ trượt 5 giờ:** hay đụng trần với Plus thì cân nhắc Pro (5x/20x) thay vì trả thêm credit lẻ.
7. **`config.toml` trong repo** (`.codex/config.toml`) chỉ nạp khi bạn “trust” dự án — dùng để override cấu hình theo từng project.
:::

### 4.2 · Lỗi & bẫy thường gặp

::: warning 🚨 8 bẫy phải né
1. **Nhầm “Codex” 2021–2023 với agent 2025–2026** — hai thứ khác hẳn (xem mục 01).
2. **Tưởng gói Free dùng được full agent** — Free chỉ cho task nhanh, model nhỏ, giới hạn rất chặt; **không phải Codex agent đầy đủ**.
3. **Bị chặn đột ngột giữa chừng** do hết hạn mức **cửa sổ trượt 5 giờ** (nhất là Plus với GPT-5.5).
4. **Chi phí token leo nhanh** khi chạy nhiều instance / fast mode / GPT-5.5 — thực tế có thể **$100–$200/dev/tháng**.
5. **Đường API key được cấp model TRỄ hơn** gói ChatGPT → tính năng/model mới có thể chưa có ngay qua API.
6. **`approval_policy=never` + `sandbox danger-full-access` là rủi ro** — agent có thể chạy lệnh phá hủy mà **không hỏi**.
7. **Computer use trên Windows chỉ mới có từ 29/5/2026**; nhiều tính năng (Sites, một số mục) đang **preview** nên có thể đổi.
8. **Chính sách quốc gia/khu vực có thể thay đổi** — xác minh lại khả năng truy cập & thanh toán cho VN tại trang chính thức trước khi cam kết.
:::

::: warning ⚠️ Cấu hình nguy hiểm — nhìn để tránh
Bộ đôi dưới đây cho agent quyền chạy *mọi* lệnh mà **không xin phép**. Chỉ dùng trong môi trường cô lập (container dùng-một-lần), tuyệt đối **không** trên máy chứa dữ liệu quan trọng:

```toml
approval_policy = "never"
sandbox_mode = "danger-full-access"
```
:::

::: warning 📌 Ví dụ thật — “overreach” khi cho full-auto
Nhiều dev kể trên Hacker News và các bài tổng hợp sentiment Reddit (r/codex, r/ChatGPTCoding) rằng khi cho CLI **toàn quyền**, Codex có xu hướng “**viết lại một lượng lớn code, khó theo dõi**” và **tự đề xuất việc ngoài phạm vi** (scope creep).

Một dạng nợ kỹ thuật tinh vi được mô tả: agent **biến một field thành nullable chỉ để làm tắt warning của compiler** — vô tình phá vỡ tính toàn vẹn dữ liệu; hoặc viết hàm trùng lặp; hoặc chọn giải pháp lãng phí (spawn sub-interpreter mỗi lần gọi hàm). Với thư viện/framework lạ, có người mô tả Codex “**ngang một junior dở**”: không chịu nhận “không biết” mà bịa (hallucinate).

Bài học: chính vì vậy mục 4.2 khuyên bắt đầu ở `read-only`/`on-request` và **xem diff trước khi apply** — đừng giao việc lớn cho full-auto rồi merge mù.

*Nguồn: Hacker News “OpenAI Codex hands-on review” — https://news.ycombinator.com/item?id=44042070 ; tổng hợp sentiment Reddit qua DEV.to — https://dev.to/_46ea277e677b888e0cd13/claude-code-vs-codex-2026-what-500-reddit-developers-really-think-31pb (số khảo sát trong bài này CHƯA kiểm chứng từ post gốc).*
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tuần tự — mỗi bài có **tiêu chí “xong”** rõ ràng để bạn tự chấm.

### Bài 1 — Cài & “Hello, agent” (≈15 phút)

**Mục tiêu:** cài Codex CLI, đăng nhập, chạy một phiên đầu tiên.

```bash
npm install -g @openai/codex
codex --version
codex
# trong phiên, gõ một câu vu vơ để thử, ví dụ:
# "liệt kê các file trong thư mục này và đoán dự án làm gì"
```

::: details ✅ Tiêu chí xong
- `codex --version` in ra số phiên bản (không lỗi).
- Bạn đăng nhập được bằng *Sign in with ChatGPT*.
- Codex đọc được thư mục và mô tả lại — chứng tỏ agent **đọc repo thật**, không phải chat suông.
:::

### Bài 2 — `AGENTS.md` + sửa bug có test (≈30 phút)

**Mục tiêu:** trải nghiệm vòng lặp *đọc → viết test → chạy → sửa → xanh*.

1. Vào một repo nhỏ của bạn (hoặc tạo project mẫu có 1 hàm + 1 bug).
2. Tạo `AGENTS.md` ở root (mẫu ở mục 03, sửa lệnh build/test cho khớp project).
3. Mở phiên và giao việc bằng tiếng Việt:

```bash
codex
# "Hàm parseDate đang parse sai dd/MM/yyyy. Viết test tái hiện lỗi,
#  rồi sửa code cho test pass. Không thêm dependency mới."
```

::: details ✅ Tiêu chí xong
- Codex **tự đọc** đúng file chứa hàm (nhờ `AGENTS.md` chỉ đường).
- Có **test mới** tái hiện lỗi, và test **pass** sau khi sửa.
- Bạn **xem diff** trước khi apply (đặt approval `on-request`).
:::

### Bài 3 — `codex exec` cho một bước tự động (≈20 phút)

**Mục tiêu:** chạy Codex **không tương tác**, như một bước trong script/CI.

```bash
codex exec "viết unit test cho src/utils/date.ts rồi chạy cho pass"
echo "Exit code: $?"
```

::: details ✅ Tiêu chí xong
- Lệnh chạy **không cần bạn gõ thêm gì** giữa chừng.
- Có test mới được tạo và chạy.
- Bạn hiểu khác biệt: `codex exec` hợp cho **tự động hóa**; phiên tương tác hợp cho việc **cần duyệt diff**.
- *(Tùy chọn nâng cao):* thử giao cùng task này lên **Codex Cloud** ([chatgpt.com/codex](https://chatgpt.com/codex)) và so sánh — Cloud trả về **PR**, máy local của bạn rảnh.
:::

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom **trải nghiệm thật** của doanh nghiệp và lập trình viên với Codex (bối cảnh 2026). Đọc kèm 2 cảnh báo:

::: warning ⚠️ Đọc số liệu cho đúng
- Số liệu **doanh nghiệp** bên dưới phần lớn đến từ **trang/thông cáo chính thức của OpenAI** → đáng tin về nguồn, nhưng là “số do hãng tự công bố”, chưa có kiểm chứng độc lập.
- Số liệu/giai thoại **cộng đồng** (Hacker News, Reddit) là trải nghiệm dev thật nhưng mang tính **giai thoại** — đúng với người kể, không suy ra cho mọi người.
- Một số **giới hạn kỹ thuật** mô tả ở đây phản ánh giai đoạn 2025–đầu 2026 và **rất có thể đã thay đổi** — luôn đọc kèm mốc thời gian. Xem thêm SOURCING NOTE cuối mục.
:::

### 6.1 · Case study doanh nghiệp (số liệu chính thức của OpenAI)

**① Cisco — triển khai Codex cho toàn bộ tổ chức kỹ thuật**
- *Bối cảnh:* một org engineering quy mô rất lớn, vòng review/release dài.
- *Làm gì:* deploy Codex cho toàn bộ org, dùng cho **code review** và tăng tốc vòng phát triển.
- *Kết quả:* giảm **~50%** thời gian code review; nén timeline dự án “từ nhiều tuần xuống còn vài ngày”.
- *Bài học:* ở doanh nghiệp lớn, giá trị lớn nhất của Codex thường **không** phải “viết code mới” mà là **rút ngắn review và vòng lặp**.
- *Nguồn:* OpenAI — https://openai.com/codex/ (số do OpenAI công bố).

**② Duolingo — onboarding nhanh + giảm thời gian review**
- *Bối cảnh:* tuyển nhiều, kỹ sư mới cần ramp-up nhanh trên codebase lớn.
- *Làm gì:* dùng Codex để **hiểu codebase**, **sinh test**, **mở PR**.
- *Kết quả:* kỹ sư mới làm nhanh hơn **~25%**; thời gian review (trung vị) giảm **~67%**; lượng PR tăng **~70%**.
- *Bài học:* Codex rút ngắn đường cong làm quen codebase — đòn bẩy mạnh cho team tuyển nhiều người.
- *Nguồn:* OpenAI — https://openai.com/codex/ (số do OpenAI công bố).

**③ Superhuman — để PM tự sửa code nhẹ, engineer chỉ review**
- *Bối cảnh:* team sản phẩm có nhiều việc nhỏ lặp lại (test coverage, integration test fail).
- *Làm gì:* Codex xử lý task nhỏ/lặp; quan trọng hơn — **cho Product Manager đóng góp thay đổi code nhẹ**, engineer chỉ vào ở khâu **code review**.
- *Kết quả:* ship nhanh hơn; giải phóng engineer khỏi việc vặt.
- *Bài học:* pattern tổ chức đáng chú ý — “**non-engineer đóng góp code nhẹ + engineer chỉ review**”.
- *Nguồn:* OpenAI — https://openai.com/codex/ (chính thức).

**④ OpenAI tự dùng nội bộ (dogfooding)**
- *Bối cảnh:* chính kỹ sư OpenAI.
- *Làm gì:* dùng Codex hằng tuần trong CLI/IDE/cloud/review.
- *Kết quả:* **~95%** kỹ sư OpenAI dùng Codex hằng tuần; nhóm này **merge nhiều hơn ~70% PR/tuần** kể từ khi dùng. Blog model còn nêu dev hoàn thành task nhanh **~55%** và **time-to-merge nhanh ~50%**.
- *Bài học:* KPI họ chọn để chứng minh tác động là **“PR merged/tuần”**, không phải “số dòng code”.
- *Nguồn:* OpenAI “Building more with GPT-5.1-Codex-Max” — https://openai.com/index/gpt-5-1-codex-max/ (chính thức).

::: details 🚗 Case bổ sung — Kodiak (xe tự lái): Codex cho tooling & refactor
- *Bối cảnh:* phát triển “Kodiak Driver” (autonomous driving), code phức tạp, **an toàn-trọng yếu**.
- *Làm gì:* dùng Codex **viết công cụ debug**, **tăng test coverage**, **refactor** — KHÔNG tự động hóa phần critical.
- *Kết quả:* tăng tốc phát triển công nghệ lõi (định tính, không có % công bố).
- *Bài học:* ngay cả domain nhạy cảm về an toàn cũng dùng Codex, nhưng giới hạn ở **tooling/refactor** quanh phần lõi chứ không thay con người ở chỗ rủi ro cao.
- *Nguồn:* OpenAI — https://openai.com/codex/ (chính thức, định tính).
:::

### 6.2 · Case study lập trình viên cá nhân (giai thoại thật)

**⑤ Jason Liu — vận hành 5 “agent” Codex song song như một bộ máy cá nhân**
- *Bối cảnh:* dev/tư vấn độc lập, muốn chạy song song nhiều luồng việc.
- *Làm gì (rất cụ thể):*
  - Giữ **5 thread ghim** (Chief of Staff, Agents SDK, OpenAI CLI, Codex-cho-open-source, theo dõi Twitter), chuyển nhanh bằng `Command-1` … `Command-9`.
  - Lưu chỉ thị top-level trong `AGENTS.md` đặt trong vault Obsidian (cấu trúc `TODO.md`, `people/`, `projects/`, `agent/`, `notes/`), **sync lên GitHub** để review bằng diff.
  - **Nhập bằng giọng nói** (Wispr Flow): đẩy suy nghĩ thô cho agent thay vì gõ chỉn chu.
  - **“Steering” giữa chừng:** chen tin nhắn ngắn khi agent đang chạy thay vì chờ xong:

```text
make this smaller
fix the spacing
open a PR
```

  - **“Heartbeats” định kỳ:** Chief-of-Staff quét Slack/Gmail **mỗi 30 phút** rồi soạn nháp; vòng feedback animation quét Slack **mỗi 15 phút** rồi render lại; hỗ trợ một việc kiểm **mỗi 5 phút** (rồi 1 phút khi agent vào cuộc).
  - **Connectors hay dùng:** `$slack`, `$gmail`, `$calendar`, `$browser`, `@chrome`, `@computer`; artifact ở side panel (HTML/CSS/JS, Storybook, Remotion, Slidev, Streamlit).
- *Kết quả/đánh đổi:* thread dài **tốn tiền hơn** do cache-miss khi quay lại, nhưng anh đánh giá tính liên tục là đáng (bài không nêu con số token/thời gian tiết kiệm cụ thể).
- *Bài học:* Codex 2026 không chỉ là “coding agent” mà thành **“personal ops” chạy nền**; hai đòn bẩy lớn nhất là **`AGENTS.md`** và **steering giữa chừng**.
- *Nguồn:* blog Jason Liu “Codex-maxxing” — https://jxnl.co/writing/2026/05/10/codex-maxxing/ (trải nghiệm cá nhân, cụ thể).

**⑥ “7 PR nhỏ-vừa trước bữa trưa” — kỹ thuật multi-rollout**
- *Bối cảnh:* một dev trên Hacker News dùng Codex Cloud chạy nhiều task song song.
- *Làm gì (mẹo thật):* chạy **NHIỀU rollout song song cùng một prompt**, chọn bản tốt nhất, rồi tinh chỉnh prompt theo cái work. Áp dụng cho: batch update nhiều repo (sửa README/format/link), CSS fix nhỏ, API munging, sinh test theo pattern có sẵn.
- *Kết quả:* một commenter cho biết “**landed 7 small-to-medium PRs before lunch**”; tỷ lệ thành công task nhỏ **~40–60%** được xem là “khá ổn”; task lớn cần tư duy sâu thì **tụt rõ**.
- *Bài học:* Codex tỏa sáng ở **“đám việc nhỏ song song”** hơn là một task lớn cần suy luận sâu.
- *Nguồn:* Hacker News “OpenAI Codex hands-on review” — https://news.ycombinator.com/item?id=44042070 (giai thoại dev thật).

### 6.3 · Use-case cụ thể (gom theo nhóm)

Tổng hợp từ trang use-case chính thức (https://developers.openai.com/codex/use-cases) và Hacker News:

| Nhóm | Codex làm được gì (ví dụ thật) |
|---|---|
| **Engineering** | Review PR trên GitHub, hiểu codebase lớn, refactor, chạy migration code |
| **Front-end** | Dựng responsive UI từ design/prompt, sửa UI chi tiết, Figma→code, làm game chạy trên browser |
| **iOS / macOS** | Dựng app shell, viết SwiftUI native, thêm App Intents, debug trong iOS simulator |
| **Data & Analysis** | Làm sạch dữ liệu bẩn, query dữ liệu dạng bảng, phân tích dataset/báo cáo (kể cả annotate scRNA-seq cho life sciences) |
| **Quality & Security** | Tự động triage bug, scan bảo mật, remediate lỗ hổng, deep security scan |
| **Workflow / Automation** | Kick off task coding từ Slack, biến feedback thành hành động, dựng internal app, “set up a teammate” |
| **Ngoài coding (mới 2026)** | Quản lý inbox (tìm email quan trọng + soạn trả lời theo giọng văn của bạn), điều khiển máy Mac (click/gõ/điều hướng app), “follow a goal” cho việc chạy dài |

::: details 🔐 Use-case bảo mật quy mô lớn (có số liệu)
Một chiến dịch dùng Codex **quét 1,2 triệu commit** đã phát hiện **10.561 lỗi high-severity**. Đây là minh hoạ cho hướng “security scan ở quy mô lớn” — nhưng nhớ rằng phát hiện tự động vẫn cần con người **triage và xác nhận** trước khi vá.

*Nguồn: The Hacker News — https://thehackernews.com/2026/03/openai-codex-security-scanned-12.html*
:::

Giai thoại cá nhân (Hacker News): có người để Codex dựng cả “**normalization pipeline + tax computing engine**” để hỗ trợ làm thuế — nhưng nhấn mạnh phải **đối chiếu/kiểm tra** rất nhiều, không tin tưởng kết quả một cách mù quáng.

### 6.4 · Mẹo/thủ thuật cộng đồng (chắt lọc)

::: tip ✅ 8 mẹo từ dev thật
1. **Coi `AGENTS.md` là “công tắc hành vi”** — đặt chỉ thị top-level + yêu cầu agent **tự ghi lại điều học được** (Jason Liu; Hacker News).
2. **Steering giữa chừng thay vì cố viết prompt hoàn hảo** — chen lệnh ngắn (“make this smaller”, “open a PR”) khi agent đang chạy (Jason Liu).
3. **Multi-rollout cùng một prompt** → chọn bản tốt nhất → tinh chỉnh prompt theo cái work (Hacker News).
4. **Giữ quyền kiểm soát kiến trúc:** đừng nói “build me an app”; hãy đưa **code stub** rồi để agent **điền các `TODO`** (Hacker News).
5. **Bắt buộc có design doc/spec trước khi giao việc lớn** — giao “raw requirements” hay ra kết quả kém (Hacker News).
6. **Dùng đa-model bổ trợ:** lên ý tưởng lớn bằng một model (vd Claude/Opus), để Codex/GPT lo phần **implement chi tiết**; cho mỗi model **review chéo** vì chúng bắt nhóm bug khác nhau (Hacker News; tổng hợp Reddit).
7. **Pipe diff sang Codex để review** ngay trong workflow công cụ khác (tổng hợp Reddit; dev.to).
8. **Heartbeats/automation định kỳ** (quét Slack/Gmail theo phút) để Codex chạy nền như trợ lý ops; **sync `AGENTS.md`/vault lên GitHub** để xem bằng diff “agent đã nhớ/đổi gì” (Jason Liu).
:::

### 6.5 · Phàn nàn & bẫy thật (hai chiều)

::: warning 🚨 Những điều dev kêu ca
- **Overreach khi full-auto:** cho CLI toàn quyền thì nó “viết lại lượng lớn code, khó theo dõi”; hay tự đề xuất việc ngoài phạm vi (tổng hợp Reddit; Hacker News).
- **Nợ kỹ thuật tinh vi:** biến field thành nullable chỉ để hết warning compiler → phá tính toàn vẹn dữ liệu; viết hàm trùng lặp; chọn giải pháp lãng phí (Hacker News).
- **Hallucinate với lib/framework lạ:** không chịu nhận “không biết” mà bịa; có người mô tả “ngang một junior dở” (Hacker News).
- **Ràng buộc môi trường (bản cloud thời kỳ đầu, có thể đã đổi):** không truy cập git upstream, không kéo dependency mới, không Docker/container, không internet → khó test AWS/dùng web search; mỗi lần lặp phải **mở PR mới** khá vướng (Hacker News).
- **Cần human-in-the-loop nhiều cho task data phức tạp:** một team kể phải “prompt-nudging” liên tục, mất **~3 ngày** mới ra kết quả tầm tầm (Hacker News).
- **Thiếu MCP + bị “context pruning” trong phiên dài** (tổng hợp Reddit — lưu ý trạng thái này có thể đã thay đổi theo thời gian).
- **Nền tảng/UX (giai đoạn đầu):** từng chỉ có macOS, thiếu Linux/Windows; thời gian chờ kết quả không xác định; mặc định không show reasoning (Hacker News).
- **Chi phí thread dài:** quay lại thread cũ gây **cache-miss** → tốn token hơn (Jason Liu).
- **Rủi ro bảo mật khi cho full system access:** **prompt injection qua PDF/email** là mối lo lặp lại (Hacker News).
- **So sánh chất lượng (hai chiều):** nhiều người khen Codex “cẩn thận tìm bug”; nhưng cũng có người (đặc biệt task data/extraction phức tạp) thấy **thua Claude** và cần dẫn dắt nhiều hơn (Hacker News).
:::

### 6.6 · Thread đáng đọc thêm

- “OpenAI Codex hands-on review” — Hacker News — https://news.ycombinator.com/item?id=44042070 (anecdote “7 PRs before lunch”, chi tiết giới hạn cloud).
- “Codex for almost everything” — Hacker News — https://news.ycombinator.com/item?id=47796469 (use-case ngoài coding, mẹo “stub code + để agent điền `TODO`”).
- “Many of us prefer OpenAI’s Codex…” — Hacker News — https://news.ycombinator.com/item?id=47667380 (lý do chọn Codex; `AGENTS.md` tạo “huge behavioral changes”).
- “I work at OpenAI (not on Codex) and have used it successfully…” — Hacker News — https://news.ycombinator.com/item?id=44043717 (góc nhìn nội bộ).
- “…a plea to not screw with the reasoning…” — Hacker News — https://news.ycombinator.com/item?id=46316606 (lo ngại về thay đổi reasoning/model).
- Blog “Codex-maxxing” — Jason Liu — https://jxnl.co/writing/2026/05/10/codex-maxxing/ (workflow 5 agent song song).
- “Claude Code vs Codex 2026 — What 500+ Reddit Developers Really Think” — DEV.to — https://dev.to/_46ea277e677b888e0cd13/claude-code-vs-codex-2026-what-500-reddit-developers-really-think-31pb (trích sentiment r/codex, r/ClaudeCode, r/ChatGPTCoding — **số khảo sát trong bài chưa kiểm chứng từ post gốc**).

::: details 🧾 SOURCING NOTE — đọc để dùng số liệu cho đúng
- **Nguồn chắc:** (a) trang chính thức OpenAI (customer stories Cisco/Duolingo/Superhuman/Kodiak + số nội bộ) và (b) Hacker News (vài thread thật, dev kể trải nghiệm cụ thể). Mọi **% của OpenAI** là **“số hãng tự công bố”**.
- **X (Twitter): hạn chế.** Chỉ xác nhận chắc post ra mắt research preview của @OpenAI (https://x.com/OpenAI/status/1923416740073033873). Không trích thread KOL cá nhân nào để tránh bịa @handle.
- **Reddit: gián tiếp.** Sentiment r/codex, r/ClaudeCode, r/ChatGPTCoding ở đây đến **qua bài tổng hợp** (DEV.to…), KHÔNG phải link post gốc. Các con số khảo sát (kiểu “65.3% nghiêng Codex”) là do bài tổng hợp nêu, **chưa xác minh** → coi là tham khảo độ chắc thấp, đừng trích như fact cứng.
- **Phần có thể đã lỗi thời:** các giới hạn bản cloud thời kỳ đầu (no Docker/no internet/phải mở PR mới mỗi lần lặp, macOS-only, thiếu MCP) phản ánh 2025–đầu 2026 và **rất có thể đã đổi** — luôn đọc kèm mốc thời gian. Tên model (o3 fine-tune → GPT-5.1/5.2-Codex-Max → GPT-5.5/5.6) đổi rất nhanh; kiểm lại nếu cần chính xác phiên bản.
:::

---

::: tip 📌 4 điều mang theo
1. Codex 2025–2026 là **coding agent đa bề mặt** (CLI Rust / Cloud / IDE / app) — **không** phải autocomplete, và **không** phải model Codex cũ 2021–2023.
2. Đường vào dễ nhất cho dev VN: cài CLI → **Sign in with ChatGPT** (gói Go/Plus) — ChatGPT kèm Codex **đã khả dụng & thanh toán VND tại VN**.
3. `AGENTS.md` + **đúng `approval_policy`/`sandbox_mode`** là hai thứ quyết định agent làm đúng & an toàn.
4. **CLI/IDE** cho sửa nhanh có duyệt diff; **Codex Cloud** cho việc nặng/chạy lâu trả về PR; **`codex exec`** cho tự động hóa.
:::

::: details 📚 Nguồn tham khảo chính thức
- Trang sản phẩm: https://openai.com/codex/
- Tài liệu dev: https://developers.openai.com/codex/
- Giá: https://developers.openai.com/codex/pricing
- Changelog: https://developers.openai.com/codex/changelog
- Cấu hình: https://developers.openai.com/codex/config-basic · https://developers.openai.com/codex/config-reference
- MCP: https://developers.openai.com/codex/mcp
- AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Mã nguồn CLI: https://github.com/openai/codex
- Codex Cloud: https://chatgpt.com/codex
- Rate card & dùng với gói ChatGPT: https://help.openai.com/en/articles/20001106-codex-rate-card · https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Giới thiệu Codex: https://openai.com/index/introducing-codex/
- ChatGPT Go mở rộng châu Á (gồm VN): https://techcrunch.com/2025/10/09/openais-affordable-chatgpt-go-plan-expands-to-16-new-countries-in-asia/
:::
