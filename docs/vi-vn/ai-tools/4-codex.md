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
