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

::: tip 📌 Ví dụ thật — Boris Cherny (creator Claude Code) luôn bắt đầu ở Plan mode
**Bối cảnh:** Boris Cherny, người tạo ra Claude Code, chia sẻ workflow cá nhân hằng ngày trên Threads (@boris_cherny).
**Làm gì:** Hầu hết session của anh bắt đầu ở **Plan mode (nhấn Shift+Tab hai lần)**, anh chỉnh plan tới khi ưng ý rồi mới chuyển sang chế độ auto-accept để Claude tự chạy. Anh còn chạy **5 Claude song song** trong terminal (đánh số tab 1–5, bật system notification) và **5–10 Claude** trên `claude.ai/code`, dùng **git worktrees** để cô lập file tránh xung đột.
**Kết quả:** anh tự nhận đã *automate khoảng 80% việc tạo PR*; chất lượng tăng nhờ luôn có feedback loop để verify.
**Bài học:** *Plan-first → chốt kế hoạch tốt → auto-accept* thường giúp việc "1-shot" (xong ngay lần đầu). Kết hợp parallelism + worktrees + slash command tái dùng là combo năng suất chuẩn.
*Nguồn: Boris Cherny trên Threads (@boris_cherny) — https://www.threads.com/@boris_cherny/post/DTBVppIEkdE ; tổng hợp tại The Pragmatic Engineer.*
:::

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

::: tip 📌 Ví dụ thật — Solo dev dùng `/clear` giữa các subtask + subagent review tách context
**Bối cảnh:** Một dev solo (10+ năm kinh nghiệm) duy trì monorepo **350k+ dòng** (PHP, TypeScript/React, React Native, Terraform, Python).
**Làm gì:** Mỗi subtask anh bắt đầu bằng `/clear` rồi cho Claude đọc lại một file *"implementation overview"* (thay vì kéo theo cả lịch sử chat) để tránh phình context. Anh dựng **3 code-review subagent riêng** (backend / frontend / mobile) chạy ở context tách biệt, và định nghĩa các workflow như `/workflows:fast`, `/approved` (kích hoạt subagent review + chuẩn bị commit). Anh còn tự viết một MCP server nối YouTrack để Claude tự đọc issue.
**Kết quả (phân tích git history Oct–Dec 2025):** NET dòng code nguồn ~3.473/tuần (trước ~2.125), NET dòng test ~2.043/tuần (trước ~434); ước tính **30–40% tăng năng suất** (~tiết kiệm 1 tuần/tháng); **80%+ thay đổi code do Claude Code viết** (có review). Anh cần gói **Max 100 USD/tháng** vì Pro cạn limit trong ~1 giờ.
**Bài học:** Giữ mỗi subtask gọn trong **một context window**; ưu tiên `CLAUDE.md` "đo ni" theo codebase hơn là bộ subagent generic — *“prompt generic không hiểu pattern riêng của codebase bạn”*.
*Nguồn: DEV Community (Dzianis Karviha), 24/12/2025 — https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn*
:::

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

::: warning 📌 Ví dụ thật — Hoá đơn token có thể "nhảy" bất ngờ
**Bối cảnh:** Nhiều người dùng báo chi phí token vọt lên ngoài dự kiến dù tưởng đang dùng cẩn thận.
**Chi tiết:** Một người (Jenny Ouyang) ghi nhận hoá đơn **~1.600 USD**; theo bài viết, con số tương tự được cộng đồng phản ánh không phải cá biệt. Tháng 3/2026 còn có **bug prompt caching** khiến token phình **10–20 lần** mà không cảnh báo — người dùng phải reverse-engineer binary mới phát hiện (GitHub issue #40524, *số hiệu theo nguồn dẫn*).
**Vì sao:** `CLAUDE.md` được nạp **mỗi turn** — file 5.000 token nghĩa là bạn "trả" 5.000 token *trước khi gõ chữ nào*, mỗi lượt, mỗi session. Mọi output từ MCP/`read_file` (JSON lớn, log nhiều dòng) bị **append vĩnh viễn** trong session, nên tin nhắn thứ 40 "trả tiền" cho tất cả những gì trước đó.
**Bài học:** Giữ `CLAUDE.md` lean (50–100 dòng); dùng `/clear` khi đổi việc; với khối lượng lớn cân nhắc gói **Max** thay vì API.
*Nguồn: buildtolaunch.substack.com — https://buildtolaunch.substack.com/p/claude-code-token-optimization*
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

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này tổng hợp các trường hợp dùng Claude Code **có thật** trong giai đoạn 2025–2026, để bạn thấy công cụ này làm được gì *ở quy mô thật* — và cả những chỗ nó vấp. Ba case "xương sống" (Rakuten, Bun, đội Claude Code) có nguồn chính danh + số liệu + tên người thật; các case còn lại mang tính tham khảo, nhiều số liệu là **tự báo cáo** nên đã được gắn nhãn rõ.

::: warning ⚠️ Đọc số liệu cho đúng
- Các con số doanh thu/năng suất do cá nhân tự công bố (indie hacker, blog dev) **chưa được kiểm chứng độc lập** — coi là *"theo chia sẻ"*.
- Số hiệu GitHub issue (#40524, #11712) lấy *theo nguồn dẫn*, nên đối chiếu lại nếu trích vào tài liệu chính thức.
- Một nhân vật HN sau đó chuyển sang công cụ khác (GPT-5.2 Codex) — nên đọc như trải nghiệm tiến trình, không phải lời ca ngợi một chiều cho Claude.
:::

### 06a · Bốn case study đáng tin nhất (có nguồn chính danh)

**① Rakuten — implement một method sâu trong vLLM (12,5 triệu dòng), Claude tự chạy 7 giờ**

- **Bối cảnh:** Kenta Naruse (ML Engineer, Rakuten) giao Claude Code implement phương pháp *"activation vector extraction"* trong **vLLM** — thư viện mã nguồn mở ~**12,5 triệu dòng**, đa ngôn ngữ.
- **Làm gì:** Để Claude Code chạy ở chế độ tự hành. Theo Naruse, anh *“không viết dòng code nào trong 7 giờ đó, chỉ thỉnh thoảng đưa guidance”*.
- **Kết quả:** hoàn thành trong **7 giờ một mạch**, đạt **99,9% độ chính xác số học** so với reference method. Ở quy mô tổ chức, Rakuten báo cáo **giảm 79% time-to-market** (một tính năng từ 24 ngày công xuống 5 ngày), **giảm 97% lỗi nghiêm trọng**, ra bản lớn 2 tuần/lần thay vì theo quý. Yusuke Kaji (GM AI for Business) mô tả cách làm: *chạy song song 5 task — giao 4 cho Claude Code, tự làm 1 cái còn lại*.
- **Bài học:** Claude Code có thể đảm nhận task kỹ thuật sâu trên codebase khổng lồ **nếu giao việc rõ + có cách verify** (đối chiếu với reference).
- *Nguồn: Anthropic customer story (chính thức) — https://claude.com/customers/rakuten*

**② Bun — port runtime từ Zig sang Rust bằng Dynamic Workflows (~750k dòng, 11 ngày)**

- **Bối cảnh:** Bun (JS runtime) dùng tính năng **Dynamic Workflows** để port toàn bộ runtime từ **Zig → Rust**.
- **Làm gì:** Claude tự viết script JS điều phối, *fan-out* tới **16 subagent song song** (tối đa 1.000 subagent/workflow), validate trước khi trả kết quả.
- **Kết quả:** sinh **~750.000 dòng code**, **99,8% test suite hiện có pass**, trong **11 ngày**.
- **Bài học:** Với migration/refactor diện rộng *"song song hoá được"*, workflow fan-out rút việc cả ngày xuống còn vài giờ — nhưng cần *effort* cao để orchestrator chịu viết script.
- *Nguồn: Anthropic blog + InfoQ — https://claude.com/blog/introducing-dynamic-workflows-in-claude-code · https://www.infoq.com/news/2026/06/dynamic-workflows-claude-code/*

**③ Đội Claude Code (Anthropic) tự build chính nó — khoảng 90% do AI viết**

- **Bối cảnh:** Chính team Claude Code *dogfood* công cụ để xây công cụ.
- **Làm gì:** Boris Cherny chọn tech stack *"không cần dạy"* để Claude Code tự build được chính nó; mỗi thay đổi code là một npm release.
- **Kết quả:** **~90% Claude Code được viết bởi chính Claude Code**. Adoption nội bộ: ~20% engineering dùng ngày đầu, 50% sau 5 ngày. Khi team nhân đôi quân số vẫn **+67% PR/engineer**; khoảng **5 PR/engineer/ngày** (~5× mặt bằng); **60–100 internal release/ngày**. Boris dựng **20+ prototype to-do list trong 2 ngày**.
- **Bài học:** *Dogfooding* + release siêu nhỏ, siêu thường xuyên là động lực chất lượng; *“cho Claude một cách verify công việc sẽ tăng chất lượng 2–3 lần”*.
- *Nguồn: The Pragmatic Engineer (Gergely Orosz) phỏng vấn Boris Cherny — https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built*

**④ Solo dev — codebase 350k+ dòng, 80%+ code do Claude Code viết**

- **Bối cảnh & kết quả:** đã tóm tắt ở hộp *"📌 Ví dụ thật"* trong mục 03 (Bước 6). Điểm cốt lõi: monorepo 350k+ dòng đa ngôn ngữ, dùng các workflow tự định nghĩa (`/workflows:fast`, `/workflows:full:*`, `/approved`), 3 subagent review tách context, MCP nối YouTrack; ước tính 30–40% tăng năng suất, 80%+ thay đổi do Claude viết (có review).
- *Nguồn: DEV Community (Dzianis Karviha) — https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn*

### 06b · Hai case từ Hacker News (định tính, không số liệu cứng)

**⑤ "Toàn bộ code AI-gen, multi-worktree"** — Một dev trên Hacker News mô tả quy trình *"không gõ tay dòng nào"*: feed cho agent **user stories, test case, design, ảnh whiteboard** trước khi sinh code; spawn nhiều agent đồng thời theo từng ticket qua nhiều worktree; review → test → để lại note. Anh nhấn mạnh agent cần *"nhìn thấy"* log và kết quả test mới tự chủ được. (Lưu ý: người này sau đó chuyển sang GPT-5.2 Codex.) **Bài học:** cấp *"khả năng quan sát"* (logs/tests) cho agent là điều kiện để chạy tự hành nhiều việc. *Nguồn: HN thread #46410285 — https://news.ycombinator.com/item?id=46410285*

**⑥ "Cầu nối auth cho monolith cũ"** — Một dev thêm một *"shim"* xác thực + REST endpoint mới vào monolith già cỗi — loại việc *"lệch khỏi đường mòn"*. Làm việc qua lại nhiều vòng với Claude Code cho tới khi chạy; coi giá trị nhận được tương xứng *"~20 USD/tháng"*. **Bài học:** kể cả task lệch chuẩn trên hệ thống legacy vẫn khả thi nếu chịu lặp. *Nguồn: cùng thread HN #46410285.*

::: tip 💡 Hai case "tự báo cáo" — đọc dè dặt
- **Indie hacker dựng SaaS trong ~2 ngày:** đưa ý tưởng kinh doanh → Claude dựng concept + bản nháp đầu → tự chỉnh; về sau xây *portfolio SaaS ~28k USD/tháng* (**số liệu do người dùng tự công bố**). Bài học: AI rút MVP từ tuần xuống ngày, nhưng *product judgment, scope, distribution* vẫn là việc của con người. *Nguồn: Indie Hackers.*
:::

### 06c · Use-case cụ thể đã thấy trong nguồn

- **Implement thuật toán/method sâu** trong thư viện lớn, có reference để đối chiếu accuracy (case Rakuten).
- **Migration/port diện rộng** (đổi ngôn ngữ runtime, refactor cả module) bằng *fan-out* subagent (case Bun).
- **Audit cả codebase tìm một class lỗi:** việc cả ngày rút xuống dưới 1 giờ nhờ chạy song song (Dynamic Workflows).
- **Sinh + sửa code theo issue tracker:** nối MCP tới YouTrack/JIRA để Claude tự đọc issue, comment, attachment.
- **Review tự động bằng subagent chuyên biệt:** `code-reviewer`, `test-runner`, `frontend-qa`, `docs-maintainer`, `security-checker`, `migration-planner`.
- **Tự động hoá vòng PR:** lệnh kiểu `/commit-push-pr`; tag `@claude` lên PR đồng nghiệp để cập nhật guideline chung.
- **Build prototype hàng loạt** để thử ý tưởng (20+ bản trong 2 ngày — đội Claude Code).
- **Khoa học dữ liệu:** data scientist chạy nhiều instance Claude Code để sinh query + visualization (Anthropic phát hiện ngoài dự kiến).

### 06d · Mẹo & thủ thuật từ cộng đồng

::: tip 🧰 Những pattern được nhắc đi nhắc lại
- **Plan-first:** bắt đầu ở Plan mode (Shift+Tab × 2), chốt plan tốt rồi mới auto-accept → thường "1-shot" (Boris Cherny).
- **TDD là pattern mạnh nhất:** viết test trước, để mỗi chu kỳ *red → green* làm "tín hiệu" cho agent tự lặp mà không cần người can thiệp.
- **`CLAUDE.md` lean & phân tầng:** giữ 50–100 dòng, chỉ để thứ áp dụng rộng (nó nạp vào system prompt mỗi session). Đặt `CLAUDE.md` lồng nhau theo module để thêm ngữ cảnh tự động.
- **`CLAUDE.md` dùng chung, commit vào Git:** cả team đóng góp nhiều lần/tuần; gặp lỗi gì thì thêm một dòng để *“Claude không tái phạm”* (Boris Cherny).
- **Subagent để tiết kiệm context:** agent chạy ở context window riêng, chỉ trả về *summary* → giữ context chính sạch. Phải **nói rõ "dùng subagent"**, ví dụ:
```text
Use a subagent to review this code for security issues
```
- **Parallelism + git worktrees:** chạy 5–10 Claude, cô lập file bằng worktree, đánh số tab + bật system notification.
- **`/clear` giữa các subtask** rồi đọc lại một file *"implementation overview"* thay vì kéo theo cả lịch sử chat.
- **Tạo Skill cho thao tác hay sai:** khi Claude lặp lại cùng kiểu lỗi, đóng gói thành một skill chuyên dụng.
- **Effort cao cho orchestration:** với Dynamic Workflows nên để mức cao nhất; hạ xuống *medium* thì orchestrator bỏ viết script, mất *fan-out*.
- **Dùng filesystem làm bộ nhớ:** ghi plan ra file `.md` cho agent tham chiếu, khỏi nhét cả nội dung vào context (tiết kiệm token).
:::

### 06e · Phàn nàn & bẫy thật (để bạn không bất ngờ)

::: warning 🚨 Những chỗ Claude Code hay vấp ở quy mô thật
- **Hoá đơn token bất ngờ** và **bug prompt caching (3/2026)** làm token phình 10–20× không cảnh báo — xem hộp *"📌 Ví dụ thật"* về token ở mục 04.
- **"Xé rồi làm lại" trên codebase lớn:** vài dev HN cho biết phần Claude viết phần lớn cuối cùng *"phải xé ra làm lại"*; khi code đủ lớn, Claude có lúc phá vỡ code đang chạy, không tiến lên, và *"hay viết logic trùng lặp"* thay vì tái dùng code có sẵn. *(HN #46410285)*
- **Hallucinate API:** một dev HN kể Claude sinh JSONRPC sai và bịa hàm Python không tồn tại khi làm với Kanboard API, *dù đã có docs*. *(HN #46410285)*
- **Explore & Plan subagent KHÔNG tự nạp `CLAUDE.md` + git status:** nếu cần một rule tới đúng subagent đó (ví dụ *"bỏ qua thư mục vendor/"*) thì phải nhắc lại rule đó trong prompt khi delegate.
- **Subagent resume có thể "sửa" tham số sai:** ví dụ tự đổi `BANANA-123` thành `APPLE-123` khi phải suy ra ý ban đầu của người dùng; có bug *"Subagent Resume Missing All User Prompts"*. *(GitHub issue #11712, số hiệu theo nguồn dẫn — https://github.com/anthropics/claude-code/issues/11712)*
- **Lo "mất kỹ năng/tư duy":** một số người cho rằng *viết code là một cách tư duy* — để LLM làm hết thì mất cơ hội phát hiện lỗi thiết kế. (Đây là quan điểm, không phải bug.)
- **Bảo mật/niềm tin mù quáng:** có bài cảnh báo rủi ro tin tưởng tự động hoá quá mức — đừng auto-approve mọi thứ một cách mặc định.
:::

### 06f · Thread đáng đọc thêm

| Tiêu đề | Nguồn |
|---|---|
| "Claude Code creator says Claude wrote all his code for the last month" | https://news.ycombinator.com/item?id=46410285 |
| "Getting good results from Claude Code" | https://news.ycombinator.com/item?id=44836879 |
| "Claude Code is all you need" | https://news.ycombinator.com/item?id=44864185 |
| "How Claude Code is built" (Pragmatic Engineer) | https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built |
| "Introducing dynamic workflows in Claude Code" (Anthropic) | https://claude.com/blog/introducing-dynamic-workflows-in-claude-code |
| Chuỗi post Plan mode của Boris Cherny (Threads) | https://www.threads.com/@boris_cherny/post/DTBVppIEkdE |
| "Integrating Claude Code into production workflows" (DEV) | https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn |

::: details 🔎 Ghi chú nguồn (minh bạch về độ tin cậy)
- **Xương sống đáng tin nhất:** Rakuten/vLLM (Anthropic chính thức), Bun Zig→Rust (Anthropic + InfoQ), dogfooding qua phỏng vấn Boris Cherny (Pragmatic Engineer). Case solo-dev 350k dòng (DEV) rất chi tiết về lệnh/cấu hình thực tế.
- **Threads của Boris Cherny** là nguồn primary từ chính creator (handle + URL có thật).
- **Reddit:** không truy cập được khi soạn tài liệu, nên **không trích username/post Reddit cụ thể nào**; phần "cộng đồng báo token cao" chỉ nói chung theo bài Substack đã dẫn.
- **Hacker News:** truy cập tốt; nội dung lấy từ thread #46410285. Các thread khác chỉ liệt kê URL.
- **GitHub issues (#40524, #11712):** đến từ search, **chưa mở trực tiếp từng issue** — coi số hiệu là "theo nguồn dẫn".
- **Nhóm cần thận trọng:** doanh thu indie hacker (~28k USD/tháng) là tự công bố; các metric "10×/0.8 productivity" trong blog dev mang tính định tính/marketing.
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
