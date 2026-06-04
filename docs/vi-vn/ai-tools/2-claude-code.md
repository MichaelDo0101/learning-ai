---
title: 'Claude Code — Lập trình viên AI tự hành trong terminal của bạn'
description: 'Hướng dẫn thực chiến Claude Code của Anthropic: agentic coding tự sửa nhiều file & chạy test, CLAUDE.md, Skills, Subagents, Hooks, MCP. Cài đặt, giá, dùng được ở VN, workflow từng bước và bài tập.'
---

# Claude Code — Lập trình viên AI tự hành trong terminal của bạn

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">⌨️</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn nhận task quen thuộc: *"viết test cho module đăng nhập, chạy thử, lỗi đâu sửa đó."* Bình thường mất nửa buổi: đọc code, đoán edge case, viết test, chạy, đỏ, sửa, chạy lại. Với Claude Code bạn gõ đúng một câu trong terminal — nó tự đọc cả codebase, viết test, **chạy** test, thấy fail thì **tự sửa** rồi chạy lại đến khi xanh.
**💸 Lợi ích thực tế:** một dev VN gom được mấy giờ làm tay vào một prompt; thay vì gõ code từng dòng, bạn chuyển sang vai *review & duyệt* — làm được nhiều việc hơn trong cùng một ngày.
:::

> **"Claude Code không phải ô chat gợi ý code.**
> **Nó là một agent: đọc repo, sửa file, chạy lệnh shell, làm việc với git — và lặp đến khi xong."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Cài & khởi động** Claude Code trên máy (macOS/Linux/WSL/Windows) và đăng nhập đúng cách.
- **Giao việc thật**: sửa bug, thêm feature, viết test — bằng ngôn ngữ tự nhiên, để nó tự chạy & tự sửa.
- **Đặt bộ nhớ dự án** với `CLAUDE.md` (qua `/init`) để Claude bám coding standards của bạn.
- **Dùng Plan mode** để xem kế hoạch *trước khi* nó đụng vào file — an toàn cho thay đổi lớn.
- **Giữ context sạch & rẻ**: biết khi nào `/clear`, `/compact`, và khi nào giao việc cho **subagent**.
- **Quyết định gói phù hợp ở VN** (Pro/Max/API) và né các bẫy thanh toán & lỗi 451.
:::

Đây là chương công cụ — bạn nên vừa đọc vừa mở terminal gõ theo. Học bằng tay nhớ lâu gấp đôi.

---

## 01 · Công cụ này là gì & dùng khi nào

**Claude Code** là công cụ lập trình dạng **"agentic" (AI tự hành)** của **Anthropic**. Khác với một ô gợi ý code, nó **tự lập kế hoạch, sửa code nhiều file, chạy test, sửa lỗi cho tới khi xong**. Cụ thể nó có thể:

- Đọc **toàn bộ codebase** để hiểu ngữ cảnh.
- **Sửa file** trực tiếp trên đĩa.
- **Chạy lệnh shell** (build, test, lint…).
- Làm việc với **git** (commit, branch, mở PR).
- **Kết nối công cụ ngoài** qua MCP.

Ban đầu Claude Code là một **CLI trong terminal**. Đến 2026 nó đã có mặt trên nhiều "bề mặt" nhưng dùng chung một **engine**:

| Bề mặt | Dạng |
|---|---|
| **Terminal CLI** | Lệnh `claude` trong terminal |
| **VS Code / Cursor** | Extension |
| **JetBrains** | Plugin |
| **Desktop** | App riêng |
| **Web** | `claude.ai/code` |

Điểm quan trọng: **tất cả chia sẻ cùng `CLAUDE.md`, cùng settings và cùng MCP servers** — học một lần dùng khắp nơi.

::: warning 💡 Đừng nhầm "Claude Code" với các thứ tên giống
- **Claude chat thường** (claude.ai / app): chỉ trò chuyện, không sửa file/chạy lệnh trong repo của bạn.
- **Claude Agent SDK**: bộ SDK để bạn *tự build* agent dựa trên năng lực của Claude Code — không phải bản thân Claude Code.
- **IDE bên thứ ba tích hợp Claude** (Cursor, Zed…): dùng model Claude nhưng là sản phẩm của hãng khác.

Claude Code là **sản phẩm chính chủ của Anthropic**. URL: <https://code.claude.com> · docs: <https://code.claude.com/docs/en/overview> · bản web: <https://claude.ai/code>.
:::

**Dùng khi nào?** Khi bạn có một codebase thật và muốn giao những việc *nhiều bước, đụng nhiều file*: thêm tính năng, sửa bug khó, viết/chữa test, refactor, dọn nợ kỹ thuật, review bảo mật. Nó tỏa sáng đúng ở những việc mà gõ tay từng dòng thì lâu, mà mô tả bằng lời thì nhanh.

::: details 👉 Các "siêu năng lực" của Claude Code (xem nhanh, đi sâu ở mục sau)
- **Agentic coding** — tự lập kế hoạch → sửa nhiều file → chạy test → sửa lỗi đến khi xong.
- **CLAUDE.md (Memory)** — file markdown ở gốc project, nạp đầu mỗi session để đặt coding standards/kiến trúc. 2026 có thêm *auto memory* tự lưu lệnh build, insight debug qua các session.
- **Skills** — gói workflow lặp lại thành `SKILL.md` trong `.claude/skills/`, gọi bằng `/ten-skill` hoặc để Claude tự kích hoạt. Chạy **cùng context**, chỉ nạp body khi cần nên tiết kiệm token (thay cho khái niệm "commands" cũ).
- **Subagents** — spawn một Claude instance riêng, có context window riêng, làm task (research/review) rồi chỉ trả về **tóm tắt** → giữ context chính sạch; có thể gán model rẻ hơn cho việc vặt.
- **Hooks** — script chạy quanh vòng đời/sự kiện tool (auto-format sau mỗi lần edit, lint trước commit). Là **code tất định** — không hallucinate, dùng để **ENFORCE** hành vi/an toàn.
- **MCP (Model Context Protocol)** — chuẩn mở kết nối dữ liệu/công cụ ngoài: Google Drive, Jira, Slack, GitHub… tham chiếu resource bằng `@server:resource`.
- **Plugins** — đóng gói sẵn skills + hooks + subagents + tools để cài 1-click, chia sẻ cho cả team.
- **Git/PR tự động** — stage, viết commit message, tạo branch, mở PR; tích hợp GitHub Actions/GitLab CI và GitHub Code Review.
- **Plan mode** — đọc file và đề xuất kế hoạch, **không** sửa file cho tới khi bạn duyệt.
- **Headless/pipe** (`claude -p`) — chạy không tương tác cho CI, pre-commit, batch (theo triết lý Unix, đọc stdin/stdout).
- **Agent teams + background agents** — nhiều agent chạy song song, một lead điều phối; xem nhiều session từ một màn hình.
- **Đa bề mặt & di động** — Remote Control từ điện thoại, `--teleport` kéo task từ web/iOS về terminal, `/desktop` bàn giao session, mention `@Claude` trong Slack.
- **Lập lịch** — Routines (chạy trên hạ tầng Anthropic kể cả khi tắt máy), Desktop scheduled tasks (chạy máy bạn), `/loop`, `/schedule`.
:::

---

## 02 · Cài đặt / Đăng ký & truy cập — bối cảnh VN

### Có gói Free dùng được không? — KHÔNG

Đây là hiểu lầm tốn thời gian nhất. **Claude Code (terminal) CẦN trả phí**, không có trên gói Free. Gói Free chỉ cho dùng **Claude chat** (web/app). Muốn dùng Claude Code, bạn cần **ít nhất Pro** hoặc **API credits**.

### Bảng giá (subscription, 2026)

| Gói | Giá | Ghi chú |
|---|---|---|
| **Pro** | 20 USD/tháng (~17 USD/tháng nếu trả năm) | Dùng được Claude Code, có **giới hạn** |
| **Max** | 100 USD/tháng (≈5× Pro) | Dùng nặng hơn |
| **Max** | 200 USD/tháng (≈20× Pro) | Dùng rất nặng |

Hoặc dùng theo **API (pay-as-you-go)** qua **Anthropic Console** — tính theo token:

| Model | Input (USD / triệu token) | Output (USD / triệu token) |
|---|---|---|
| **Opus 4.7** | ~5 | ~25 |
| **Sonnet 4.6** | ~3 | ~15 |
| **Haiku 4.5** | ~1 | ~5 |

::: tip 💸 Model mặc định & cách chọn gói cho ví tiền VN
- **Mặc định model:** Pro / Team Standard / Enterprise / API dùng **Sonnet 4.6**. **Opus** chỉ mặc định trên **Max** và **Team Premium**.
- **API credits dùng thử** thường khoảng **5 USD**.
- **Quy đổi:** nếu dùng nhiều (vài chục–trăm triệu token/tháng) thì **Max rẻ hơn API rất nhiều** — một dev báo cáo tiết kiệm **~93%**.
- **Lộ trình hợp lý cho học viên VN:** bắt đầu **Pro 20 USD/tháng** để học → dùng `/init` + `CLAUDE.md` cho project thật → nâng dần lên Skills/Hooks/MCP/subagents → chỉ chuyển **Max** khi dùng nặng.
:::

### Dùng được ở Việt Nam không? — CÓ

**Việt Nam NẰM TRONG** danh sách quốc gia được Anthropic hỗ trợ chính thức (cho cả Claude.ai và API) — xem <https://www.anthropic.com/supported-countries>. Về mặt chính sách, bạn **hoàn toàn dùng được** Claude Code từ VN:

- Đăng ký **Pro/Max** bằng thẻ quốc tế (**Visa/Mastercard**), hoặc
- Tạo **API key** trên **Anthropic Console**.

::: warning ⚠️ Lỗi 451 ở VN/Đông Nam Á — đọc kỹ kẻo hiểu nhầm
Một số người ở VN/ĐNA gặp lỗi:
```text
451 Access to Anthropic models is not available from this data center (HKG)
```
Đây là vấn đề **ĐỊNH TUYẾN** qua data center Hong Kong (hay gặp khi dùng Claude qua **editor bên thứ ba như Zed**), **KHÔNG phải VN bị cấm**. Khi dùng **Claude Code chính chủ** (đăng nhập tài khoản Anthropic) thường **không gặp**; nếu gặp, kiểm tra lại mạng/VPN.

Hai trở ngại *thực tế* ở VN là: (1) thanh toán bằng thẻ quốc tế; (2) thỉnh thoảng lỗi 451 do routing — không phải lệnh cấm.
:::

::: tip 🇻🇳 Một điểm cộng cho người Việt
**`CLAUDE.md` viết bằng tiếng Việt vẫn hoạt động tốt** vì Claude hiểu tiếng Việt. Giao diện/docs hiện bằng tiếng Anh và tài liệu cộng đồng tiếng Việt còn ít — nên đây vừa là rào cản nhỏ, vừa là khoảng trống tốt để học và chia sẻ.
:::

### Cài đặt (3 cách)

Bản **native installer được khuyến nghị**: tự cập nhật, không cần Node.js.

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash
```

```bash
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

```bash
# macOS qua Homebrew
brew install --cask claude-code
```

::: warning ⚠️ Lưu ý cài đặt dễ vấp
- **Windows native:** nên cài **Git for Windows** để Claude dùng được **Bash tool**; thiếu nó Claude sẽ fallback sang PowerShell. (Dùng **WSL** thì không cần.)
- **Bản cài qua Homebrew / WinGet KHÔNG tự cập nhật** — phải `brew upgrade` / `winget upgrade` thủ công. Native installer thì tự update.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có lệnh/prompt thật)

Dưới đây là vòng làm việc chuẩn từ lúc mở project đến lúc ra PR. Mở terminal gõ theo.

**Bước 1 — Vào thư mục project & khởi động.** Lần đầu sẽ yêu cầu đăng nhập (Pro/Max/Console):

```bash
cd your-project && claude
```

**Bước 2 — Khởi tạo bộ nhớ dự án.** Chạy `/init` để Claude tự sinh `CLAUDE.md` (coding standards, kiến trúc, lệnh build):

```text
/init
```

**Bước 3 — Hỏi để hiểu code.** Dùng `@file` để nhúng nội dung thay vì chờ Claude tự đọc (mẹo: `@file` cũng tự kéo `CLAUDE.md` ở thư mục đó vào context):

```text
give me an overview of this codebase
how is authentication handled?
Explain the logic in @src/utils/auth.js
trace the login process from front-end to database
```

**Bước 4 — Với thay đổi lớn, bật Plan mode trước.** Plan mode đọc file và **đề xuất kế hoạch, KHÔNG sửa file** cho tới khi bạn duyệt. Trong session nhấn **Shift+Tab**, hoặc mở thẳng:

```bash
claude --permission-mode plan
```

**Bước 5 — Giao việc bằng ngôn ngữ tự nhiên.** Để Claude chạy test và tự sửa đến khi pass:

```bash
claude "write tests for the auth module, run them, and fix any failures"
```

**Bước 6 — Giữ context sạch khi đổi việc.** Dùng `/clear` khi chuyển task, `/compact` để nén lịch sử; giao research nặng cho subagent:

```text
/clear
/compact
use a subagent to investigate how our auth system handles token refresh
```

**Bước 7 — Hoàn tất: commit hoặc mở PR.**

```bash
claude "commit my changes with a descriptive message"
```

```text
create a pr for my changes
```

**Bước 8 — Tiếp tục phiên sau.**

```bash
claude --continue        # tiếp tục session gần nhất
claude --resume          # chọn từ danh sách (hoặc gõ /resume trong session)
claude --from-pr 123     # mở lại từ một PR
```

### 03b · Chế độ Headless (`claude -p`) — dùng trong CI / pipe

Theo triết lý Unix, `claude -p` chạy **không tương tác**, đọc stdin/stdout — hợp cho CI, pre-commit, batch:

```bash
git log --oneline -20 | claude -p "summarize these recent commits"
```

```bash
tail -200 app.log | claude -p "Slack me if you see any anomalies"
```

```bash
git diff main --name-only | claude -p "review these changed files for security issues"
```

### 03c · Làm việc song song với git worktree

Mở một session riêng trên một **git worktree** riêng để làm nhiều việc cùng lúc mà không đụng nhau:

```bash
claude --worktree feature-auth
```

### 03d · Một số lệnh trong session đáng nhớ

```text
/init      # sinh CLAUDE.md
/clear     # xoá context khi đổi task
/compact   # nén lịch sử khi hội thoại dài
/resume    # chọn lại phiên cũ
/schedule  # lập lịch chạy
/loop      # lặp một prompt trong session
/powerup   # bài học tương tác về chính Claude Code
```

::: tip 🖼️ Mẹo dùng ảnh để debug
Kéo-thả **screenshot lỗi** vào cửa sổ rồi hỏi thẳng:
```text
Here is a screenshot of the error. What is causing it?
```
**Lưu ý macOS:** khi dán ảnh vào CLI hãy dùng **Ctrl+V** (KHÔNG phải Cmd+V).
:::

### 03e · Bốn lớp mở rộng — và mỗi lớp dùng cho việc gì

Đây là phần làm nhiều người "rối". Nhớ nguyên tắc: **đúng việc, đúng lớp**.

| Lớp | Là gì | Dùng khi |
|---|---|---|
| **CLAUDE.md** | Bộ nhớ nạp **mỗi turn** | Quy tắc áp dụng **gần như mọi task** (coding standards, kiến trúc) |
| **Skills** | `SKILL.md` trong `.claude/skills/`, body **chỉ nạp khi gọi** | Workflow **thỉnh thoảng** dùng (PR review, changelog) |
| **Subagents** | Instance riêng, **context window riêng**, trả về tóm tắt | **Research/đọc nhiều file**, việc grunt (gán model rẻ) |
| **Hooks** | **Code tất định** chạy quanh sự kiện tool/vòng đời | Việc cần **ENFORCE** (chặn lệnh nguy hiểm, bắt buộc lint/format) |

→ Còn **MCP** kết nối dữ liệu/công cụ ngoài (Drive, Jira, Slack, GitHub), **Plugins** đóng gói sẵn cả bốn lớp trên để cài 1-click cho team.

---

## 04 · Mẹo hay & lỗi thường gặp

### Mẹo ăn tiền (làm là thấy khác ngay)

::: tip ✅ 8 mẹo thực chiến
1. **CLAUDE.md cho quy tắc thường trực; Skill cho workflow thỉnh thoảng.** CLAUDE.md nạp **mỗi turn**, còn skill body chỉ nạp **khi gọi** → tách workflow ra Skill để tiết kiệm token.
2. **Thấy mình dán cùng một đoạn hướng dẫn vào mọi cuộc chat mới → biến nó thành Skill ngay.**
3. **Giao research/đọc nhiều file cho subagent** để không làm "ngập" context chính (vd đọc 30 file mà chỉ nhận lại bản tóm tắt).
4. **Gán model rẻ/nhanh (Haiku) cho subagent làm việc vặt** (tìm file, kéo dữ liệu API, quét log), để dành model mạnh cho phần suy luận → tiết kiệm chi phí.
5. **Việc cần ENFORCE tất định thì dùng Hooks**, đừng kỳ vọng CLAUDE.md "ép" được — model có thể lách.
6. **Dùng `@file` / `@thư-mục`** để nhúng nội dung nhanh thay vì chờ Claude tự đọc; `@file` cũng tự kéo `CLAUDE.md` ở thư mục đó vào context.
7. **Thay đổi rủi ro cao → bắt đầu bằng Plan mode**, review kế hoạch rồi mới cho sửa đĩa.
8. **Hỏi thẳng Claude về chính nó** — nó luôn có docs mới nhất:
```text
what are the limitations of Claude Code?
how do I use MCP?
```
Hoặc chạy `/powerup` để học tương tác.
:::

### Lỗi thường gặp & cách tránh

::: warning 🚨 9 cái bẫy hay vấp
1. **CLAUDE.md phình to thành "tài liệu quy trình"** → làm nặng **mọi** session (lãng phí token mỗi turn). Tách phần quy trình ra **Skill**.
2. **Spawn subagent cho việc lẽ ra chỉ cần Skill** → thêm overhead và cô lập context không cần thiết.
3. **Dán hướng dẫn ad-hoc vào chat** → không tái sử dụng được; nên đóng thành **Skill/CLAUDE.md**.
4. **Nhầm trách nhiệm các lớp** (để routing logic trong system prompt của subagent thay vì hook; dùng CLAUDE.md để "ép" thay vì hook) → đây là **nguyên nhân chính** khiến setup "rối".
5. **Tưởng có gói Free dùng được Claude Code** → KHÔNG; tối thiểu cần **Pro** hoặc API.
6. **Lỗi 451 ở VN/ĐNA** do định tuyến qua data center **HKG** (hay gặp với editor bên thứ ba) → dễ nhầm là "VN bị cấm" dù VN thực sự được hỗ trợ.
7. **Windows native thiếu Git for Windows** → Claude không dùng được Bash tool, phải fallback PowerShell (WSL thì không cần).
8. **Bản Homebrew/WinGet không tự cập nhật** → nhớ `brew upgrade` / `winget upgrade` thủ công.
9. **Dùng API trực tiếp với khối lượng token lớn rất tốn** → cân nhắc **Max** nếu dùng nhiều (có thể rẻ hơn ~93%).
:::

::: tip 🔑 Một câu để nhớ về 4 lớp
Cùng một mục tiêu "ép Claude làm đúng": nếu là **quy tắc mềm** → CLAUDE.md; nếu là **luật cứng phải tuân** → Hook. Nhầm chỗ là gốc rễ của hầu hết setup rối.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tuần tự. Mỗi bài có **tiêu chí thành công rõ** để bạn tự kiểm.

### 🧪 Bài 1 — Lên xích & "làm quen" một repo thật (cơ bản)

**Mục tiêu:** cài Claude Code, mở một project của bạn, để nó tự lập bộ nhớ và giải thích code.

1. Cài theo mục 02, rồi:
```bash
cd your-project && claude
```
2. Chạy `/init` để sinh `CLAUDE.md`.
3. Hỏi 2 câu hiểu code:
```text
give me an overview of this codebase
how is authentication handled?
```

::: details ✅ Tiêu chí hoàn thành
- Có file `CLAUDE.md` ở gốc project (do `/init` tạo).
- Bạn nhận được mô tả tổng quan codebase + chỗ xử lý auth.
- (Tự ngẫm) Bạn hiểu vì sao `CLAUDE.md` được nạp đầu mỗi session.
:::

### 🧪 Bài 2 — Giao một task "tự chạy đến khi xanh" + mở PR (cốt lõi)

**Mục tiêu:** trải nghiệm vòng *agentic*: viết test → chạy → tự sửa lỗi → commit/PR. Có dùng **Plan mode** cho an toàn.

1. Bật Plan mode để xem kế hoạch trước:
```bash
claude --permission-mode plan
```
2. Sau khi duyệt kế hoạch, giao việc:
```bash
claude "write tests for the auth module, run them, and fix any failures"
```
3. Hoàn tất:
```text
create a pr for my changes
```

::: details ✅ Tiêu chí hoàn thành
- Bạn **thấy kế hoạch trước** khi file bị sửa (Plan mode hoạt động).
- Test mới được tạo, **chạy thật**, và Claude **tự sửa** cho đến khi pass.
- Có một PR (hoặc commit) với message mô tả rõ.
- (Nếu lỡ tay) Bạn biết `claude --continue` để quay lại phiên.
:::

### 🧪 Bài 3 — Tối ưu context & chi phí với subagent + headless (nâng cao)

**Mục tiêu:** tập "kỷ luật context" và dùng `claude -p` trong pipe.

1. Giao một research nặng cho **subagent** để giữ context chính sạch:
```text
use a subagent to investigate how our auth system handles token refresh
```
2. Đổi sang task khác → dọn context:
```text
/clear
```
3. Dùng headless để review thay đổi (không vào session tương tác):
```bash
git diff main --name-only | claude -p "review these changed files for security issues"
```

::: details ✅ Tiêu chí hoàn thành
- Subagent trả về **bản tóm tắt** (không nhồi 30 file vào context chính).
- Bạn dùng `/clear` đúng thời điểm khi đổi việc.
- Lệnh `claude -p` chạy **không tương tác** và in kết quả ra stdout.
- (Tự ngẫm) Khi nào nên giao việc vặt cho subagent gán model **Haiku** để tiết kiệm.
:::

---

::: tip 📌 5 điều mang theo
1. Claude Code = **agent lập trình chính chủ của Anthropic** — đọc repo, sửa file, chạy lệnh, làm git; lặp đến khi xong.
2. **Không có gói Free** cho Claude Code: tối thiểu **Pro 20 USD/tháng** hoặc **API**. Dùng nặng thì **Max** rẻ hơn API nhiều.
3. **VN được hỗ trợ chính thức.** Lỗi 451 (HKG) là vấn đề *routing* qua editor bên thứ ba, không phải lệnh cấm.
4. Quy trình chuẩn: `/init` → hỏi hiểu code → **Plan mode** cho thay đổi lớn → giao việc → `commit`/`pr`.
5. Mở rộng đúng lớp: **CLAUDE.md** (quy tắc thường trực) · **Skills** (workflow thỉnh thoảng) · **Subagents** (research, giữ context sạch) · **Hooks** (ENFORCE tất định) · **MCP/Plugins** (kết nối & đóng gói).
:::

> *Tài liệu trong chương dựa chủ yếu trên docs chính thức `code.claude.com` (cập nhật tới 2026). Sản phẩm cập nhật nhanh — tính năng/giá có thể đã thay đổi; khi nghi ngờ, hỏi thẳng Claude `what are the limitations of Claude Code?` hoặc xem docs chính thức.*
