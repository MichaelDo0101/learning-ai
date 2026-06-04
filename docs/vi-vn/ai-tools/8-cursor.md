---
title: 'Cursor — AI code editor nơi agent ở trung tâm'
description: 'Hướng dẫn thực chiến Cursor (Anysphere): AI code editor fork từ VS Code với Tab autocomplete số 1, Agent Mode, Plan Mode, Composer, Rules & MCP. Cài đặt, giá & hệ thống credit, bối cảnh thanh toán VN, workflow từng bước, bảo mật và lỗi hay gặp.'
---

# Cursor — AI code editor nơi agent ở trung tâm

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🖱️</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn đang làm landing page cho một startup ở Đà Nẵng. Cần đổi cả hệ thống nút bấm sang style mới, sửa 12 file React + CSS, mà mỗi chỗ một kiểu. Mở VS Code gõ tay thì cả buổi. Mở **Cursor**, bấm **⌘+.** mở Agent, gõ đúng một câu tiếng Việt: *"đổi toàn bộ button sang variant `primary` mới trong `src/components`, giữ nguyên props cũ"*. Cursor đọc cả project, sửa từng file, bạn ngồi duyệt diff. Còn lúc gõ code thường? Cursor đoán trước nguyên khối 4–5 dòng kế tiếp — bạn chỉ bấm **Tab**.
**💸 Lợi ích thực tế:** việc lặp đi lặp lại trên nhiều file (vốn ngốn cả buổi) co lại còn vài chục phút; bạn chuyển từ *gõ từng dòng* sang *mô tả & duyệt* — ship nhanh hơn rõ rệt mỗi ngày.
:::

> **"Cursor không phải plugin AI gắn vào IDE.**
> **Nó là một IDE được xây lại quanh AI — autocomplete, chat, và agent là trung tâm, không phải tính năng phụ."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Cài & mở** Cursor (macOS/Windows/Linux) và hiểu nó khác VS Code + Copilot ở đâu.
- **Dùng Tab autocomplete** đúng cách — thứ được cộng đồng gọi là "Tab tốt nhất thị trường".
- **Giao việc cho Agent Mode** (⌘+.) và **dùng Plan Mode** (Shift+Tab) để "nghĩ trước, code sau".
- **Viết `.cursor/rules/*.mdc`** để agent bám coding standards của bạn; cấu hình **MCP** nối tool ngoài.
- **Hiểu hệ thống credit & các gói giá**, biết cách thanh toán ở VN và né bẫy hoá đơn khó đoán.
- **Bật Privacy Mode** đúng lúc và biết khi nào KHÔNG nên để agent tự chạy (auth, migration, production).
:::

Đây là chương công cụ — bạn nên vừa đọc vừa mở Cursor gõ theo. Học bằng tay nhớ lâu gấp đôi.

> ⏱️ **Lưu ý thời sự:** Cursor đổi giá, tên gói và chính sách credit **rất nhanh**. Nội dung cập nhật tới khoảng **giữa 2026** — luôn kiểm tra <https://cursor.com/pricing> trước khi mua. Các con số hiệu năng/benchmark phần lớn do Cursor tự công bố, đã được gắn nhãn *"theo nguồn"* trong chương.

---

## 01 · Công cụ này là gì & dùng khi nào

**Cursor** là một **AI code editor** — trình soạn thảo code tích hợp AI sâu, là một bản **fork của VS Code**, do công ty **Anysphere** phát triển. Điểm khác biệt cốt lõi: thay vì gắn một plugin AI vào IDE có sẵn, Cursor là một IDE độc lập được xây **"AI-native"** — AI không phải tính năng phụ mà là *trung tâm* của trải nghiệm.

- **URL chính thức:** <https://cursor.com>
- **Công ty:** Anysphere Inc.
- **Quy mô (theo nguồn tới đầu 2026):** doanh thu annualized vượt **~2 tỷ USD ARR** (đạt mốc $2B ARR khoảng đầu 3/2026); được hàng triệu dev dùng; **hơn một nửa (>50%) công ty Fortune 500** dùng Cursor *(số do chính Cursor công bố trên trang Enterprise — xem là marketing claim, không phải kiểm toán độc lập)*.
- **Phiên bản hiện tại (giữa 2026):** **Cursor 3.0** (ra mắt **2/4/2026**), giao diện "agent-first", kèm mô hình riêng **Composer 2.5** (ra **18/5/2026**). Cursor 3 chuyển sang **"Agents Window"** hợp nhất agent local/cloud/remote, *theo nguồn* hỗ trợ chạy tới ~8 agent song song trên Git worktree/branch cô lập.

Vì là fork VS Code, bạn dùng được **gần như mọi extension, theme, phím tắt** quen thuộc — và import thẳng cấu hình VS Code sang. Khác biệt nằm ở 3 thứ AI gắn chặt vào lõi: **Tab** (autocomplete), **Chat/Agent** (sửa code), và **codebase indexing** (AI hiểu cả project).

::: warning 💡 Cursor thuộc nhóm nào? — định vị cho người mới
Thị trường công cụ AI coding 2026 chia làm **3 nhóm**, đừng nhầm:
- **Nhóm "gợi ý inline + chat"** — như **GitHub Copilot**: AI ngồi trong IDE gốc, gợi ý từng dòng + ô chat, bạn vẫn lái chính.
- **Nhóm "full IDE có agent tích hợp sâu"** — **Cursor** ở đây (cùng Windsurf/Antigravity): IDE riêng, agent đọc & sửa nhiều file.
- **Nhóm "agent terminal/cloud tự chủ"** — như **Claude Code** / **OpenAI Codex**: giao việc rồi review kết quả, ít thấy "quá trình".

Cursor mạnh nhất khi bạn vẫn muốn **ngồi trong editor**, vừa gõ code vừa có một agent đủ mạnh để delegate việc lớn — chứ không hoàn toàn "giao rồi quên".
:::

**Dùng khi nào?** Khi bạn làm việc trong IDE **hằng ngày** và muốn một công cụ "all-in-one": có autocomplete xịn cho lúc gõ tay, có agent cho lúc cần sửa nhiều file. Cursor tỏa sáng nhất ở **frontend/React/CSS** — loại việc lặp nhanh, cần phản hồi trực quan, thấy ngay kết quả.

::: details 👉 Các tính năng chính của Cursor (xem nhanh, đi sâu ở mục sau)
| Tính năng | Mô tả ngắn |
|---|---|
| **Tab (autocomplete)** | Mô hình riêng của Cursor, đoán không chỉ dòng hiện tại mà cả "hành động kế tiếp" (3–5 dòng tới, nơi con trỏ nên nhảy đến). Được khen là Tab tốt nhất thị trường; *theo một nguồn thứ cấp, tỷ lệ chấp nhận ~72%*. |
| **Agent / Agent Mode** | Agent tự chủ: đọc codebase, lập kế hoạch, sửa nhiều file, chạy lệnh terminal, chạy test, lặp tới khi xong — bạn review trước khi accept. Mở bằng **⌘+.** / **Ctrl+.** |
| **Plan Mode** | Trước khi code, agent dựng "kế hoạch" markdown (lưu ở `.cursor/plans`). Bật bằng **Shift+Tab** trong ô input. "Nghĩ rõ trước, code sau". |
| **Composer** | Mô hình agentic của Anysphere cho tác vụ coding dài/nhiều bước. *Theo Cursor, mô hình Composer (gốc) nhanh ~4x mô hình frontier ngang hàng (~250 tok/s vs Sonnet ~63 tok/s), đa số lượt agent xong dưới 30 giây.* Bản mới nhất **Composer 2.5** (ra 18/5/2026) *theo nguồn* xây trên base **Kimi K2.5** của Moonshot AI và **ngang Claude Opus 4.7 / GPT-5.5 trên coding benchmark với chi phí ~1/10** — đây là điểm định vị chính của Cursor 3.x. |
| **Background / Cloud Agents** | Agent chạy nền trên hạ tầng đám mây của Cursor, làm việc độc lập trong khi bạn làm việc khác. |
| **Agents Window (Cursor 3)** | Workspace hợp nhất agent local + cloud + remote; hỗ trợ multi-repo (một agent suy luận xuyên nhiều Git repo). |
| **Codebase Indexing + Semantic Search** | Index toàn project để AI "hiểu cả codebase"; tìm kiếm theo ngữ nghĩa. |
| **Chat (Ask mode)** | Chat AI mở (**⌘+L** / **Ctrl+L**), KHÔNG sửa file — hỏi đáp thuần. |
| **MCP** | Kết nối Cursor với tool/dữ liệu ngoài (DB, API, Jira, GitHub…). |
| **Rules** | Quy tắc tùy biến hành vi agent (xem mục 03). |
| **BugBot** | Code-review tự động tích hợp GitHub pull request. |
| **CLI** | Chạy agent headless trong terminal / CI / GitHub Actions. |
| **Multi-model** | Truy cập model của OpenAI, Anthropic (Claude), Google Gemini, xAI Grok + **model nội bộ Composer 2.5** — khác biệt cạnh tranh so với Copilot/Codex (vốn phụ thuộc model bên thứ ba), giúp Cursor chủ động về chi phí/tốc độ. **Auto mode** chọn model tự động. |
:::

### So với công cụ khác

Bảng dưới so sánh Cursor với các đối thủ trực tiếp mà dev VN hay cân nhắc *(đặc điểm tới giữa 2026, có thể đổi; "đúng/sai" phụ thuộc workflow & team hơn điểm benchmark)*:

| Tiêu chí | **Cursor** | **VS Code + Copilot** | **Devin Desktop (ex-Windsurf)** | **Claude Code** | **OpenAI Codex** |
|---|---|---|---|---|---|
| Dạng | IDE AI-native (fork VS Code) | IDE + extension | IDE AI-native (agent-neutral) | Agent terminal (CLI) | Cloud agent tự chủ |
| Mức tự chủ | Cao — đã dịch hẳn sang **agent-first** (Cursor 3: Agents Window, multi-agent) | Thấp nhất (gợi ý + chat) | Ở giữa | Cao ("như junior dev") | Cao nhất (chạy nền, trả PR) |
| Tab/inline | **Tốt nhất thị trường** | Tốt, đã chín | Tốt | Không phải thế mạnh | Không (cloud) |
| Đa file / refactor lớn | Mạnh (Composer) | Yếu hơn | Mạnh | **Rất mạnh** | Mạnh (bất đồng bộ) |
| Giá khởi điểm | $20/th (Pro) | **$10/th** — rẻ nhất, free tier rộng | Kế thừa giá Windsurf cũ (carry over) | $17/th Pro, $100+/th Max | gói cao ~$200/th |

::: tip 🤔 Khi nào nên cân nhắc đối thủ thay vì Cursor
- **Ngân sách thấp / chỉ cần autocomplete + tổ chức lớn ưu tiên ổn định, compliance:** → **VS Code + Copilot** ($10, free tier rộng, "lựa chọn mặc định doanh nghiệp").
- **Delegate refactor lớn / việc nặng kiểu "giao rồi review":** → **Claude Code** (thường dẫn nhóm benchmark coding phức tạp). *Lưu ý số liệu thay đổi rất nhanh: con số "Opus 4.5 ~80.9% SWE-bench Verified" chỉ đúng tại thời điểm ra mắt cuối 2025; tới giữa 2026 nhóm dẫn đầu (Opus 4.7/4.8, GPT-5.5) đều ở quanh ~87–89% — hãy kiểm tra leaderboard hiện tại thay vì tin con số tuyệt đối.*
- **Nhiều task độc lập, định nghĩa rõ, muốn "code khi bạn ngủ" trong sandbox cách ly:** → **OpenAI Codex**.
- **Làm việc IDE hằng ngày, frontend/React/CSS lặp nhanh, muốn cả autocomplete xịn lẫn agent:** → **Cursor** (đúng thế mạnh chương này).

> ⚠️ **Lưu ý lớn về Windsurf:** ngày **2/6/2026**, Cognition đã **khai tử thương hiệu Windsurf và tái ra mắt thành "Devin Desktop"** — một **IDE agent-neutral** (quản agent của OpenAI/Anthropic… qua **Agent Client Protocol**). User Windsurf cũ được cập nhật OTA tự động; **Cascade** (agent cũ) gỡ bỏ sau **1/7/2026**; gói/giá kế thừa nguyên từ Windsurf. Khi tham khảo tài liệu cũ về "Windsurf", hãy quy chiếu sang Devin Desktop.
:::

::: tip 💡 Pattern thực tế 2026 — dev giỏi thường ghép 2 công cụ
Đừng nghĩ phải chọn **một**. Dev hiệu quả nhất thường dùng **một IDE-assistant cho việc hằng ngày** (Cursor/Copilot) + **một terminal agent cho việc nặng** (Claude Code/Codex). Có người còn chạy Claude Code *bên trong terminal của Cursor*. Quy tắc lặp lại ở nhiều nguồn: **Cursor cho ~80% việc cần phán đoán thời gian thực, Codex/Claude Code cho ~20% có thể delegate.**
:::

### Khi nào KHÔNG nên dùng Cursor (hoặc Agent Mode)

::: warning 🛑 Ranh giới thật — đừng giao nhầm việc cho agent
- **Code chạm production / hệ thống đang phục vụ khách trả tiền:** nhiều dev kỳ cựu nhấn mạnh ý "không còn cần review code" là **sai** trong môi trường multi-dev có khách hàng — kiến trúc & maintainability vẫn quan trọng.
- **Logic xác thực/bảo mật (auth), database migration, cấu hình CI/CD:** agent mode "ít phù hợp" cho các vùng rủi ro cao này.
- **Nối MCP server vào DB production với quyền service-role/ghi:** đừng làm — đây đúng bài học vụ Supabase (xem mục 04). Chỉ cấp quyền tối thiểu, ưu tiên read-only và môi trường staging.
- **Codebase legacy phức tạp:** không thể "viết lại bằng AI" dễ dàng; AI có thể tạo gánh nặng bảo trì.
- **Team rất lớn cần kiểm soát tuyệt đối & compliance:** nhiều tổ chức chọn Copilot vì an toàn/ổn định hơn; có lo ngại **vendor lock-in** với Cursor.
- **Chỉ cần autocomplete đơn giản + ngân sách thấp:** Copilot ($10) hoặc free tier có thể đã đủ.
- **Khi bạn không định review output:** code AI "trông đúng mà sai tinh vi", có rủi ro lỗ hổng/lỗi ẩn mà test có thể không bắt.
:::

---

## 02 · Cài đặt / Đăng ký & truy cập — bối cảnh VN

### Cài đặt IDE

Tải bản desktop tại **<https://cursor.com>** (macOS / Windows / Linux). Mở lên, đăng nhập bằng tài khoản (Google / GitHub / email). Lần đầu Cursor sẽ hỏi có muốn **import cấu hình từ VS Code** (extension, theme, keybindings) — nên đồng ý để giữ thói quen cũ.

### Có bản Free không? — CÓ (giới hạn)

Khác với Claude Code, Cursor **có gói Free (Hobby)** dùng ngay, **không cần thẻ**. Nó cho **agent requests giới hạn** + **Tab completions giới hạn** *(con số cụ thể Cursor không công bố rõ — chỉ ghi "giới hạn")*. Đủ để học và thử; dùng nghiêm túc thì cần lên Pro.

### Bảng giá (theo cursor.com/pricing + nguồn thứ cấp, tới giữa 2026)

| Gói | Giá (tháng) | Bao gồm chính |
|---|---|---|
| **Hobby (Free)** | **$0**, không cần thẻ | Agent requests *giới hạn* + Tab completions *giới hạn* |
| **Pro** | **$20** (~**$16** nếu trả năm, tiết kiệm ~20%) | Tab không giới hạn; quỹ credit ~$20 dùng API agent; Background Agents; frontier models; MCP, skills, hooks; Cloud agents; BugBot tính theo usage |
| **Pro+** | **$60** (~$48/th trả năm) | Như Pro nhưng **gấp ~3x credit (~$60/th)** |
| **Ultra** | **$200** | **~20x usage multiplier** + ưu tiên tính năng mới — cho power user chạy agent liên tục trên frontier model |
| **Teams** | **$40/user/th** (~$32 trả năm) | Mọi thứ Individual + billing tập trung, marketplace nội bộ (rules/skills), BugBot review, shared context, usage analytics, **privacy mode toàn team**, SAML/OIDC SSO |
| **Enterprise** | **Custom** | Mọi thứ Teams + pooled usage, invoice/PO, SCIM, kiểm soát repo/model/MCP access, audit logs, AI code tracking API, hỗ trợ ưu tiên |

::: warning 💸 Hệ thống CREDIT — chỗ gây nhầm nhất, đọc kỹ
*Theo nguồn, từ ~6/2025* các gói trả phí có một **quỹ credit hằng tháng bằng đúng giá gói** (ví dụ Pro $20 → ~$20 credit). Cách credit hao:
- **Auto mode** (để Cursor tự chọn model): *trước đây* được quảng cáo "không giới hạn / không trừ credit", nhưng **chính sách này đã đổi nhiều lần**. Trang `cursor.com/pricing` hiện hành mô tả *mọi gói có một lượng usage nhất định, vượt thì tính on-demand* — tức tới giữa 2026 nên coi **MỌI request (kể cả Auto) đều có thể rút credit**. **Đừng tin tuyệt đối "Auto là miễn phí" — kiểm tra `cursor.com/pricing` trước.**
- **Tự tay chọn frontier model** (ví dụ Claude Opus, GPT đời mới) thì **trừ credit nhanh hơn** theo lượt dùng.
- Hết "fast requests" thì bị đẩy xuống **"slow queue"** (phản hồi chậm 5–30s+ — xem mục 04).

⚠️ **Đây là điểm dễ lỗi thời nhất của cả chương:** chính sách credit/limit của Cursor đã thay đổi **nhiều lần**. Con số "credit = giá gói", "20x multiplier" nên được kiểm tra lại tại <https://cursor.com/pricing> trước khi tin tuyệt đối.
:::

### Cài CLI (agent headless trong terminal)

Dùng cho script / CI / GitHub Actions. *Lệnh thật theo cursor.com/docs/cli/installation:*

```bash
# macOS / Linux / WSL
curl https://cursor.com/install -fsS | bash
```

```bash
# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex
```

```bash
# Hoặc qua npm
npm install -g @cursor/cli
```

### Dùng được ở Việt Nam không? — CÓ

**Cursor dùng được bình thường ở VN**, không thấy chặn vùng. Free tier (Hobby) dùng ngay không cần thẻ. Vấn đề thực tế duy nhất ở VN là **thanh toán gói trả phí**.

::: warning 💳 Thanh toán ở VN — các cách dev hay dùng
- **Cursor nhận:** **Visa/Mastercard** và **Alipay** (từ 2024). **KHÔNG** nhận UnionPay / PayPal / WeChat Pay / Apple Pay — lý do là **Stripe** (đơn vị xử lý thanh toán của Cursor) không hỗ trợ các phương thức này, không phải chính sách riêng của Cursor.
- **Trở ngại thật:** thẻ nội địa VN hay bị từ chối giao dịch quốc tế / không hỗ trợ thanh toán định kỳ / phí quy đổi cao.
- **Cách dev VN thường dùng:**
  1. **Thẻ Visa/Mastercard quốc tế** (cách phổ biến & ổn định nhất — có dev VN trả $20 Pro thành công bằng Visa).
  2. **Thẻ ảo (virtual card)** nạp bằng USDT/USDC qua các nền tảng trung gian.
  3. **Nạp thẻ ảo bằng crypto** (BTC/USDT/USDC) qua một số dịch vụ proxy. *Lưu ý:* tới ~3/2026 **Cursor KHÔNG nhận crypto trực tiếp** — cách này thực chất là dùng thẻ ảo (vốn được nạp bằng crypto) để trả, chứ không phải Cursor chấp nhận tiền mã hoá.

> Các dịch vụ thẻ ảo/crypto là **bên thứ ba** (nguồn blog) — nêu như tùy chọn phổ biến, **không bảo chứng** chất lượng/độ an toàn. Ưu tiên thẻ quốc tế chính chủ nếu có.
:::

::: tip 🇻🇳 Một điểm cộng cho người Việt
**Prompt và Rules viết bằng tiếng Việt vẫn hoạt động tốt** vì các model nền (Claude/GPT/Gemini) hiểu tiếng Việt. Giao diện/docs hiện bằng tiếng Anh, nhưng bạn cứ ra lệnh cho Agent bằng tiếng Việt thoải mái — nó hiểu và làm được.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có lệnh/prompt/cấu hình thật)

Dưới đây là vòng làm việc chuẩn, tổng hợp từ **cursor.com/blog/agent-best-practices**. Mở Cursor và làm theo.

### Quy trình khuyến nghị

**Bước 1 — Plan trước, code sau (thay đổi tác động lớn nhất).** Trong ô input, nhấn **Shift+Tab** để bật **Plan Mode**. Agent dựng một file kế hoạch markdown ở `.cursor/plans` liệt kê từng bước, thư viện dùng, chuẩn code, đặt file ở đâu. Đọc & chỉnh kế hoạch tới khi ưng rồi mới cho chạy.

::: tip 📌 Mẹo về độ chi tiết của plan
Kế hoạch **càng ít chi tiết → agent càng "tự do"** quyết định (đôi khi sai ý bạn); càng nhiều chi tiết → bám ý bạn hơn nhưng tốn công viết. Với việc quan trọng, hãy chốt rõ "đặt file ở đâu, dùng lib nào, giữ API nào nguyên".
:::

**Bước 2 — Viết prompt cụ thể.** Tỷ lệ thành công tăng rõ khi prompt rõ ràng. So sánh:

```text
❌ Mơ hồ:  sửa cho đẹp
✅ Cụ thể: Refactor src/auth/login.ts để tách logic validate token ra hàm riêng,
          thêm unit test cho input không hợp lệ, giữ nguyên public API
```

**Bước 3 — Chạy Agent Mode.** Mở bằng **⌘+.** (Mac) / **Ctrl+.** (Win/Linux). Agent đọc lỗi/log, sửa đa file, chạy test, lặp. Cần hỏi đáp thuần (không sửa file) thì dùng **Chat/Ask** (**⌘+L** / **Ctrl+L**).

**Bước 4 — Review kỹ.** Code AI "trông đúng mà sai tinh vi" — **luôn đọc diff trước khi accept**. Đừng accept-all theo phản xạ.

**Bước 5 — Lặp lại setup từ từ.** Chỉ thêm **rule** khi thấy agent lặp **cùng một lỗi**; chỉ thêm **command/skill** khi đã có workflow muốn tái dùng. **Đừng tối ưu sớm.**

### Tab autocomplete — dùng cho đúng

Tab là "đặc sản" của Cursor. Khi gõ code, nó hiện gợi ý mờ (ghost text) — không chỉ phần còn lại của dòng mà cả **khối 3–5 dòng kế tiếp** và **nơi con trỏ nên nhảy đến**. Thao tác:

```text
Tab        → chấp nhận gợi ý
Esc        → từ chối
Tab (tiếp) → "nhảy" tới vị trí sửa kế tiếp mà Cursor dự đoán
```

### CLI headless (cho script/CI)

*Theo cursor.com/docs/cli/installation:* binary để chạy agent ở chế độ headless là **`cursor-agent`** (alias `agent`), **không phải** lệnh `cursor` (vốn dùng mở GUI). Sau khi cài, nhớ thêm `~/.local/bin` vào `PATH` rồi kiểm tra:

```bash
# Kiểm tra cài đặt
cursor-agent --version
```

```bash
# Chạy agent không tương tác, in kết quả ra console
cursor-agent -p "fix the failing tests in src/auth/"
```

```bash
# Kết hợp định dạng output cho script (json hoặc text)
cursor-agent -p "refactor module X" --output-format json
```

### Chạy nhiều agent song song (Cursor 3)

Điểm bán hàng lớn nhất của Cursor 3 là **multi-agent**: chạy tới ~8 agent **song song**, mỗi agent làm trên **Git worktree/branch cô lập** (local, cloud hoặc qua SSH) nên không giẫm chân nhau. Cách dùng nhanh:

1. Mở **Agents Window** (workspace hợp nhất agent local + cloud + remote).
2. Giao mỗi agent một task độc lập, rõ ràng (ví dụ: agent A viết test, agent B refactor module khác) — task càng tách bạch càng ít xung đột.
3. Theo dõi từng agent, **review diff** của mỗi nhánh riêng rồi mới merge.

::: tip 📌 Khi nào multi-agent đáng dùng
Hợp khi bạn có **nhiều task độc lập, không phụ thuộc nhau**. Nếu các task đụng cùng file/cùng logic, chạy song song dễ tạo xung đột merge — lúc đó làm tuần tự lại nhanh hơn.
:::

### Cấu hình RULES — bám coding standards của bạn

*Cú pháp thật theo cursor.com/docs/context/rules.* Rules là cách bạn "dạy" agent quy tắc dự án.

- **Vị trí:** thư mục `.cursor/rules/` chứa các file **`.mdc`** (markdown + frontmatter), được version-control (commit vào git để cả team dùng chung).
- **4 loại áp dụng**, điều khiển qua 3 field frontmatter (`alwaysApply`, `description`, `globs`):
  1. **Always Apply** — vào **mọi** chat.
  2. **Apply Intelligently** — agent tự quyết theo `description`.
  3. **Apply to Specific Files** — kích hoạt khi file khớp `globs`.
  4. **Apply Manually** — chỉ khi bạn gọi `@tên-rule` trong chat.
- **Tạo rule:** gõ `/create-rule` trong chat, hoặc vào *Cursor Settings → Rules, Commands → + Add Rule*.

Ví dụ file `.cursor/rules/typescript.mdc`:

```markdown
---
description: TypeScript coding standards for this project
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---
- Always use strict TypeScript, no `any`.
- Prefer functional components and named exports.
- Co-locate tests next to source files.
```

::: warning ⚠️ Cái bẫy phổ biến nhất với Rules
File **`.md` thường (không có frontmatter) bị HỆ RULE BỎ QUA**. Phải dùng đuôi **`.mdc`** với frontmatter (`description` / `globs` / `alwaysApply`) đúng thì rule mới được nạp.

**Thay thế đơn giản hơn:** file `AGENTS.md` (markdown thuần, không cần frontmatter, hỗ trợ file lồng trong thư mục con — file cụ thể hơn thắng file cha). Ngoài ra có **Team Rules** (Team/Enterprise) và **User Rules** (toàn cục). File **`.cursorrules`** cũ (ở root) vẫn được nhắc nhưng cách mới chính thức là `.cursor/rules/*.mdc`.
:::

### Cấu hình MCP — nối tool/dữ liệu ngoài

*Theo cursor.com/docs/mcp.* MCP (Model Context Protocol) cho agent đọc DB, gọi API, đọc Jira/GitHub…

- **Global:** `~/.cursor/mcp.json`. **Per-project:** `.cursor/mcp.json` (chia sẻ với team qua git).
- Truy cập UI: *Settings → Tools & MCP* (hoặc Features → MCP).

::: warning 🔌 Cài MCP xong mà không thấy server?
**Phải thoát hẳn & mở lại Cursor** sau khi cài server — MCP server **chỉ load lúc khởi động**. Nếu đúng, server sẽ hiện ở mục **"Installed MCP Servers"**.
:::

### `.cursorignore` — loại bớt thứ không cần index

Tạo file `.cursorignore` ở gốc project để loại thư mục lớn / dependencies / build output khỏi indexing → giảm tải, tăng tốc (xem mục 04). Ví dụ nội dung:

```text
node_modules/
dist/
build/
.env
*.log
```

---

## 04 · Mẹo hay & lỗi thường gặp

### Mẹo ăn tiền (làm là thấy khác ngay)

::: tip ✅ 7 mẹo thực chiến
1. **Để Auto mode khi không cần model cụ thể** → thường rẻ hơn (Cursor tự chọn model phù hợp); chỉ chọn frontier model cho việc thật sự khó. *Lưu ý: Auto không còn chắc chắn "miễn phí hoàn toàn" như chính sách 2025 — vẫn nên theo dõi mức usage.*
2. **Đổi sang model nhỏ/nhanh (Haiku/mini) cho việc routine** → vừa nhanh vừa tiết kiệm; để dành model mạnh cho phần suy luận.
3. **Plan Mode (Shift+Tab) cho mọi thay đổi rủi ro cao** → xem kế hoạch *trước khi* agent đụng file.
4. **Tạo `.cursorignore`** loại `node_modules`/build → Cursor mượt hẳn trên repo lớn.
5. **Chỉ thêm Rule khi agent lặp cùng một lỗi** → đừng viết "tài liệu quy trình" khổng lồ vào rule từ đầu.
6. **Dùng `@file` để nhúng đúng file** vào context thay vì để agent tự mò → kết quả chính xác hơn, đỡ "lạc".
7. **Reserve frontier model + dùng API key riêng** nếu bị slow queue làm phiền → trả per-token, không bị Cursor giới hạn tốc độ.
:::

::: warning 🔒 BẢO MẬT & RIÊNG TƯ — dữ liệu của bạn đi đâu
Bạn đang giao **codebase thật** cho dịch vụ cloud — phải biết dữ liệu đi đâu **trước khi** dán code khách hàng vào. *Theo cursor.com/security, /data-use, /privacy:*

**Dữ liệu đi đâu:** khi dùng tính năng AI, Cursor gửi **prompt + ngữ cảnh code** tới nhà cung cấp model (**OpenAI, Anthropic, Google Vertex AI, xAI Grok**).

**Privacy Mode (Chế độ riêng tư):**
- Có cho **mọi user** (cả Free lẫn Pro); **bật mặc định cho thành viên team**.
- Khi **BẬT**: Cursor có thỏa thuận **Zero Data Retention (ZDR)** với các nhà cung cấp model → họ **không lưu trữ** và **không train** trên dữ liệu của bạn. Codebase indexing: vector DB **không bao giờ thấy raw code** — chỉ lưu vector (không reverse được về source); khi cần, Cursor tra code thật trên **máy local** theo "tọa độ" vector trả về.
- Khi **TẮT**: Cursor **có thể lưu & dùng** codebase data, prompt, hành động editor, snippet… để cải thiện và **train model của họ**.

👉 **Với code nhạy cảm / của khách hàng / có NDA → BẬT Privacy Mode.** Và đừng bao giờ để agent đọc/dán **secrets** (API key, token, `.env`, private key) — thêm chúng vào `.cursorignore`.
:::

::: warning 🚨 Rủi ro bảo mật agent — đừng "auto-run" mọi thứ
*(Nguồn kỹ thuật: Check Point, GitHub Security Advisory, Practical-DevSecOps.)*
- **Prompt injection (gián tiếp):** kẻ tấn công nhúng lệnh độc vào dữ liệu mà agent đọc. Vụ thật giữa 2025: agent Cursor của **Supabase** chạy với quyền service-role đặc quyền, xử lý support ticket chứa input người dùng → kẻ tấn công nhúng lệnh SQL để **rò rỉ integration token** ra public thread.
- **Lỗ hổng MCP đã công bố — CurXecute (CVE-2025-54135):** prompt injection gián tiếp khiến Cursor ghi file `.cursor/mcp.json` độc → **remote code execution (RCE)** chỉ bằng một tin nhắn. **Đã được vá ở Cursor 1.3 (29/7/2025)** — cập nhật phiên bản là biện pháp chính.
- **MCPoison (CVE-2025-54136):** cùng đợt research của Check Point — kẻ tấn công lợi dụng việc Cursor **không xác thực lại** cấu hình MCP đã được duyệt một lần, sửa lệnh sau lưng để **thực thi mã dai dẳng** (persistent code execution). Cũng đã được vá; bài học: cẩn trọng khi duyệt MCP và cập nhật Cursor sớm.
- **Auto-run / "YOLO" mode:** thực thi lệnh AI sinh ra **không cần phê duyệt** → nếu payload độc, khai thác cực nhanh. *Từ Cursor 3.6+* nên dùng **Auto-review** (mặc định khuyến nghị): chạy allowlist, sandbox, phần còn lại đẩy qua bộ phân loại LLM để allow/block.

**Best practice:** (1) bật Privacy Mode; (2) **không bật auto-run/full-auto** cho repo nhạy cảm; (3) review allowlist lệnh; (4) cẩn trọng khi cài MCP server lạ; (5) thêm `.cursorignore` cho secrets/`.env`.
:::

### Lỗi thường gặp & cách xử

| Lỗi / triệu chứng | Nguyên nhân | Cách xử |
|---|---|---|
| **"You've reached your request limit" / "Too many requests"** | Hết fast requests; spam ⌘K/regenerate | Chờ ~60s; tránh bắn liên tục. *Theo nguồn, Pro có ~500 fast requests/tháng* — **đây là mô hình giá CŨ (trước 6/2025), đã bị thay bằng hệ thống credit; số này nguồn thứ cấp & hay đổi** |
| **Phản hồi rất chậm (slow queue)** | Hết fast requests, bị hạ ưu tiên | Đổi sang model nhỏ/nhanh; hoặc dùng **API key riêng** (per-token, không bị giới hạn) |
| **Cursor chậm trên repo lớn** | Indexer churn, context nặng, MCP overhead, "extension tax" | Tạo **`.cursorignore`**; tắt extension nặng (ESLint/Pylance trên project lớn, GitLens); chọn fast model cho việc routine |
| **"User provided API key rate limit exceeded"** | Giới hạn ở phía OpenAI/Anthropic (key của bạn) | Kiểm tra quota/billing ở nhà cung cấp model; chờ reset |
| **Code sinh ra hỏng / "sửa lỗi này tạo lỗi khác"** | Agent chưa đủ context, prompt mơ hồ | Dùng Plan Mode + prompt cụ thể; `@` tham chiếu đúng file; review diff; chia nhỏ task |
| **MCP server không xuất hiện** | MCP chỉ load lúc khởi động | **Thoát hẳn & mở lại Cursor**; kiểm tra `.cursor/mcp.json`; xem "Installed MCP Servers" |
| **Rule không áp dụng** | File `.md` không có frontmatter bị bỏ qua | Đổi sang `.mdc` với frontmatter (`description`/`globs`/`alwaysApply`) đúng |

::: details ❓ FAQ & lỗi hay gặp (vận hành)

**Hỏi: Tôi import được extension/theme VS Code sang Cursor không?**
→ Được. Cursor là fork VS Code; lần đầu mở nó hỏi import luôn. Phần lớn extension chạy bình thường.

**Hỏi: Auto mode khác chọn tay model thế nào về tiền?**
→ Auto mode để Cursor tự chọn model nên **thường rẻ hơn**; tự chọn frontier model thì **rút credit nhanh hơn** theo lượt. *Cảnh báo:* khẳng định "Auto = không trừ credit" là chính sách 2025 và **đã thay đổi** — tới giữa 2026 nên coi mọi request đều có thể tính usage; kiểm tra `cursor.com/pricing`. Nguyên tắc dùng: việc thường để Auto, việc khó mới chọn model mạnh.

**Hỏi: Bị "slow queue" hoài, làm sao thoát?**
→ Đã hết fast requests. Hoặc chờ cửa sổ reset, hoặc dùng model nhanh hơn, hoặc cắm **API key riêng** để trả per-token (bỏ qua giới hạn của Cursor).

**Hỏi: Limit reset theo tháng dương lịch?**
→ Không — limit **reset theo ngày billing** của bạn, không theo mùng 1. Xem *Settings → Subscription* để biết ngày reset.

**Hỏi: Rule tôi viết mà agent không nghe?**
→ Khả năng cao file là `.md` (bị bỏ qua) thay vì `.mdc`, hoặc thiếu frontmatter, hoặc loại áp dụng sai (ví dụ để "Apply Manually" nên phải gọi `@tên-rule`). Xem lại mục 03.

**Hỏi: Cursor "không hiểu hết codebase" của tôi?**
→ Kiểm tra codebase indexing đã chạy xong chưa; loại bớt rác bằng `.cursorignore`; và **chủ động `@file`** những file liên quan vào context thay vì kỳ vọng agent tự tìm hết.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tuần tự. Mỗi bài có **tiêu chí thành công rõ** để bạn tự kiểm.

### 🧪 Bài 1 — Làm quen Tab + Chat trên một project thật (cơ bản)

**Mục tiêu:** cài Cursor, mở project của bạn, cảm nhận Tab autocomplete và Chat.

1. Cài theo mục 02, mở Cursor, *Open Folder* trỏ vào một project của bạn.
2. Mở một file code, gõ dở một hàm → quan sát **Tab** gợi ý khối lệnh; bấm **Tab** để chấp nhận, **Esc** để từ chối.
3. Mở **Chat** (**⌘+L** / **Ctrl+L**) và hỏi:
```text
Giải thích tổng quan codebase này
Xác thực (authentication) được xử lý ở đâu?
```

::: details ✅ Tiêu chí hoàn thành
- Bạn thấy Tab gợi ý **nhiều hơn một dòng** và chấp nhận được bằng Tab.
- Chat trả lời tổng quan codebase + chỗ xử lý auth (mà **không** sửa file nào).
- (Tự ngẫm) Bạn phân biệt được **Chat/Ask** (hỏi đáp) vs **Agent** (sửa file).
:::

### 🧪 Bài 2 — Giao một task cho Agent + Plan Mode (cốt lõi)

**Mục tiêu:** trải nghiệm vòng *plan → agent → review*: để agent sửa code và chạy test.

1. Trong ô input, nhấn **Shift+Tab** bật **Plan Mode**, gõ:
```text
Thêm unit test cho hàm validate input trong src/, chạy test, sửa tới khi pass.
Giữ nguyên public API.
```
2. Đọc **kế hoạch** agent dựng (ở `.cursor/plans`), chỉnh nếu cần, rồi cho chạy.
3. Mở **Agent Mode** (**⌘+.** / **Ctrl+.**) để agent thực thi; **đọc diff** từng file trước khi accept.

::: details ✅ Tiêu chí hoàn thành
- Bạn **thấy kế hoạch trước** khi file bị sửa (Plan Mode hoạt động).
- Agent tạo test, **chạy thật**, và tự sửa cho tới khi pass.
- Bạn **review diff** và accept có chọn lọc (không accept-all mù).
:::

### 🧪 Bài 3 — Rules + MCP + tiết kiệm credit (nâng cao)

**Mục tiêu:** "dạy" agent quy tắc dự án và nối một tool ngoài; tập kỷ luật chi phí.

1. Tạo `.cursor/rules/style.mdc` với frontmatter `globs` đúng (mẫu ở mục 03), ép một quy tắc bạn hay phải nhắc (ví dụ "no `any`", "dùng named export").
2. Thêm một MCP server (per-project `.cursor/mcp.json`), **thoát & mở lại Cursor**, kiểm tra nó hiện ở "Installed MCP Servers".
3. Làm một task bằng **Auto mode** (không chọn frontier model) và **quan sát mức usage/credit tiêu thụ** ở *Settings → Usage*; sau đó thử chọn tay một frontier model và để ý chênh lệch mức tiêu thụ.

::: details ✅ Tiêu chí hoàn thành
- Rule `.mdc` **được áp dụng** (agent tự bám quy tắc mà bạn không nhắc lại).
- MCP server xuất hiện sau khi khởi động lại Cursor.
- Bạn hiểu chênh lệch chi phí giữa **Auto mode (thường rẻ hơn)** vs **chọn tay frontier model (tốn credit nhanh hơn)** — và biết khi nào dùng cái nào.
:::

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này tổng hợp các trường hợp dùng Cursor **có nguồn**, để bạn thấy nó làm được gì *ở quy mô thật*. Các case doanh nghiệp lấy từ trang **cursor.com/customers** (có tên + chức danh người phát biểu).

::: warning ⚠️ Đọc số liệu cho đúng
Mọi **% năng suất** ở mục này đều là **self-reported** qua trang khách hàng của Cursor (hoặc benchmark do Cursor công bố) — **chưa kiểm toán độc lập**. Tên công ty + chức danh là có thật trên trang đó. Hãy đọc như *"theo công bố của doanh nghiệp/Cursor"*, không phải con số trung lập.
:::

**① Coinbase — refactor từ tháng xuống ngày**
- **Bối cảnh:** Brian Armstrong (CEO) công bố tính tới ~2/2025.
- **Làm gì → kết quả:** **100% kỹ sư đã dùng Cursor**; một kỹ sư đơn lẻ giờ refactor codebase trong *vài ngày* thay vì *vài tháng*.
- **Bài học:** ở quy mô lớn, lợi ích lớn nhất của Cursor là **rút ngắn việc cơ học lặp lại trên nhiều file**.
- *Nguồn: cursor.com/customers (Coinbase).*

**② Rippling — adoption lan nhanh trong vài tuần**
- **Bối cảnh:** Albert Strasheim (CTO).
- **Kết quả:** adoption tăng từ **150 → 500+ kỹ sư (~60% tổ chức)** chỉ trong vài tuần.
- **Bài học:** khi Tab + Agent đủ tốt, công cụ **tự lan** trong team mà không cần ép.
- *Nguồn: cursor.com/customers (Rippling).*

**③ Upwork — số PR & lượng code ship tăng**
- **Bối cảnh:** Anton Andreev (Principal SWE).
- **Kết quả:** **+25% số PR**, kích thước PR trung bình **+100%**, tổng code ship **+50%**.
- **Bài học:** đo tác động bằng **PR & code ship**, không chỉ "cảm giác nhanh hơn".
- *Nguồn: cursor.com/customers (Upwork).*

**④ monday.com — velocity 2–5x, quản tech-debt tốt hơn**
- **Bối cảnh:** Roni Avidov (Senior R&D Team Lead).
- **Kết quả:** **velocity tăng 2–5x**; quản tech-debt và refactor tốt hơn.
- **Bài học:** Cursor không chỉ để viết tính năng mới mà còn hợp với **dọn nợ kỹ thuật/refactor**.
- *Nguồn: cursor.com/customers (monday.com).*

**⑤ Brex — adoption >70%, onboarding & debug tốt hơn**
- **Bối cảnh:** James Reggio (CTO).
- **Kết quả:** **>70% kỹ sư adoption**; migration nhanh hơn, debug & onboarding tốt hơn.
- **Bài học:** giá trị không chỉ ở tốc độ code mà còn ở **hiểu code nhanh** (onboarding người mới, debug).
- *Nguồn: cursor.com/customers (Brex). (Mercado Libre, Stripe, Sentry, eBay cũng có chứng thực tương tự.)*

**⑥ Cộng đồng (Reddit r/cursor) — refactor đa file & dựng hệ thống thật**
- **Bối cảnh:** *nguồn thứ cấp tổng hợp, không có handle cụ thể nên paraphrase chung.*
- **Làm gì → kết quả:** một dev mô tả dùng Cursor xây hệ thống scraper xếp hàng job, quản fleet máy ảo trên Fly.io, ghi dữ liệu vào Supabase; cộng đồng khen mạnh khả năng **refactor đa file xuyên codebase**, tiết kiệm hàng giờ.
- **Bài học:** thế mạnh được nhắc đi nhắc lại của Cursor là **sửa nhất quán trên nhiều file một lúc**.
- *Nguồn: tổng hợp thảo luận r/cursor.*

::: tip 💡 Endorsement đáng chú ý (nguồn báo, không phải cursor.com)
CEO **NVIDIA Jensen Huang** công khai ủng hộ Cursor và phát biểu đại ý **"100% kỹ sư của chúng tôi giờ code với AI"** *(TechStartups, ~10/2025)*. Lưu ý: câu này nói về *"code với AI"* nói chung trong ngữ cảnh endorse Cursor — đừng hiểu thành "100% dùng riêng Cursor".
:::

::: details 📌 Pattern lặp lại từ các case (đáng học)
- **Adoption tự lan** khi Tab + Agent đủ tốt (Rippling, Brex) — không cần ép từ trên xuống.
- **Đo bằng PR & code ship**, không chỉ cảm giác (Upwork).
- **Hợp cả việc mới lẫn refactor/tech-debt** (monday.com, Coinbase).
- **Giá trị onboarding/debug** ngang ngửa giá trị tốc độ code (Brex).
- **Thế mạnh kỹ thuật rõ nhất: refactor đa file** (cộng đồng).
:::

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 6 điều mang theo
1. Cursor = **AI code editor** (fork VS Code, của Anysphere) — AI là **trung tâm**, không phải plugin. Mạnh nhất ở **Tab autocomplete** + **Agent Mode** + **codebase indexing**.
2. **Có bản Free (Hobby)** dùng ngay không cần thẻ; nghiêm túc thì **Pro $20/th**. Hiểu rõ **hệ thống credit** (Auto thường rẻ hơn; chọn tay frontier model tốn nhanh hơn — và "Auto miễn phí" là chính sách cũ, đã đổi) — đây là chỗ dễ nhầm & dễ "cháy túi" nhất.
3. **VN dùng được bình thường**; trở ngại duy nhất là **thanh toán** — ưu tiên thẻ Visa/Mastercard quốc tế.
4. Quy trình chuẩn: **Plan Mode (Shift+Tab)** → prompt cụ thể → **Agent (⌘+.)** → **review diff** → chỉ thêm Rule/MCP khi thật cần.
5. **Rules dùng đuôi `.mdc` + frontmatter** (file `.md` thường bị bỏ qua); MCP **phải khởi động lại Cursor** mới load.
6. **Bảo mật:** bật **Privacy Mode** cho code nhạy cảm; **không auto-run** trên repo quan trọng; cẩn trọng MCP lạ (đã có CVE RCE). Và **đừng giao auth/migration/production cho agent một cách mù quáng**.
:::

Sản phẩm đổi rất nhanh — khi giáo trình lỗi thời, dùng các link chính chủ sau để tự cập nhật:

| Chủ đề | Link chính thức |
|---|---|
| Trang chủ | <https://cursor.com> |
| Bảng giá (pricing) | <https://cursor.com/pricing> |
| Tính năng (features) | <https://cursor.com/features> |
| Docs — Rules | <https://cursor.com/docs/context/rules> |
| Docs — MCP | <https://cursor.com/docs/mcp> |
| Docs — CLI cài đặt | <https://cursor.com/docs/cli/installation> |
| Bảo mật / Data use | <https://cursor.com/security> · <https://cursor.com/data-use> |
| Blog — Best practices with agents | <https://cursor.com/blog/agent-best-practices> |

> *Tài liệu trong chương dựa chủ yếu trên docs chính thức `cursor.com` (cập nhật tới ~giữa 2026). Các con số hiệu năng/benchmark (Tab ~72%, Composer gốc ~4x tốc độ, "8 agent song song"…) phần lớn do **Cursor tự công bố** — đã gắn nhãn "theo nguồn". Số liệu benchmark model (SWE-bench…) đổi rất nhanh, ưu tiên kiểm tra leaderboard hiện tại. Giá, tên gói và chính sách credit thay đổi nhiều lần; khi nghi ngờ, kiểm tra <https://cursor.com/pricing> trước khi mua.*
