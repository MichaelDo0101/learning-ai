---
title: 'Windsurf (Devin Desktop) — AI-native IDE nơi agent Cascade tự hành'
description: 'Hướng dẫn thực chiến Windsurf — từ 6/2026 đổi tên thành Devin Desktop (Cognition). AI-native IDE fork VS Code: agent Cascade, Tab/Supercomplete, Codemaps, Rules/Workflows, MCP, model SWE-1.5/1.6. Cài đặt, giá & quota mới, dùng ở VN, workflow từng bước, case study và lỗi hay gặp.'
---

# Windsurf (Devin Desktop) — AI-native IDE nơi agent Cascade tự hành

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🌊</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn nhận một codebase Laravel + React của khách hàng ở TP.HCM, được giao *"thêm tính năng xuất hoá đơn PDF, đụng cả backend lẫn frontend"*. Mở VS Code thuần thì phải tự đọc 30 file để hiểu luồng đã. Mở **Windsurf**, bấm **Ctrl+L** mở **Cascade**, gõ đúng một câu tiếng Việt: *"thêm endpoint xuất hoá đơn PDF cho đơn hàng, gọi từ trang chi tiết đơn, viết test"*. Cascade tự đọc toàn repo, sửa nhiều file một lượt, **chạy lệnh terminal**, xem output rồi tự lặp — bạn ngồi duyệt từng diff. Đây không phải plugin gợi ý code; AI là *trung tâm* của cả IDE.
**💸 Lợi ích thực tế:** việc đụng nhiều file (vốn ngốn nửa ngày đọc-hiểu-gõ) co lại còn vài chục phút; bạn chuyển từ *gõ từng dòng* sang *mô tả & duyệt* — làm được nhiều việc hơn trong cùng một ngày.
:::

> **"Windsurf không phải một ô chat AI gắn thêm vào editor.**
> **Nó là một IDE được xây quanh một agent (Cascade) đọc cả codebase, sửa nhiều file, chạy lệnh và tự lặp đến khi xong."**

::: warning ⚠️ ĐỌC TRƯỚC — công cụ này vừa đổi tên (rất dễ nhầm)
Tới giữa 2026, công cụ này đã qua **2 lần đổi thương hiệu/sở hữu**, nên các bài blog cũ rất dễ làm bạn rối:
- **Codeium → Windsurf**: công ty Codeium đổi tên sản phẩm/công ty thành **Windsurf** (2025).
- **Cognition mua lại** (công bố 14/7/2025) — Cognition là công ty đứng sau agent tự hành **Devin** (CEO Scott Wu).
- **Windsurf → "Devin Desktop"**: ngày **2/6/2026**, Cognition đổi tên Windsurf IDE thành **Devin Desktop** qua một bản cập nhật OTA. Một số domain cũ (`windsurf.com/pricing`, `docs.windsurf.com`) nay **chuyển hướng sang `devin.ai`**.

Trong chương này mình dùng **"Windsurf (Devin Desktop)"** hoặc gọi song song cả hai tên để bạn không bối rối — bản chất vẫn là **một sản phẩm**.
:::

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Cài & mở** Windsurf/Devin Desktop (macOS/Windows/Linux), import cấu hình từ VS Code/Cursor.
- **Giao việc cho Cascade** (Ctrl+L) — chọn đúng chế độ **Write / Chat / Plan** cho từng loại task.
- **Viết `.windsurfrules`** để agent bám coding standards, và đóng workflow lặp thành **slash command** `.windsurf/workflows/*.md`.
- **Hiểu hệ thống quota mới** (theo ngày/tuần, đã bỏ credit) và biết cách thanh toán ở VN.
- **Né các bẫy thực tế**: cạn quota giữa kỳ, hallucinate khi nuốt nguyên codebase lớn, agent sửa vượt yêu cầu.
- **Quyết định khi nào chọn Windsurf** thay vì Cursor / Copilot / Claude Code, và khi nào KHÔNG nên dùng.
:::

Đây là chương công cụ — bạn nên vừa đọc vừa mở Windsurf gõ theo. Học bằng tay nhớ lâu gấp đôi.

> ⏱️ **Lưu ý thời sự:** công cụ này đổi tên/giá/quota **rất nhanh**. Nội dung cập nhật tới khoảng **giữa 2026** — luôn kiểm tra <https://devin.ai/pricing> trước khi mua. Nhiều con số hiệu năng/benchmark do Cognition tự công bố hoặc tổng hợp từ nguồn thứ cấp, đã được gắn nhãn *"theo nguồn"* trong chương.

---

## 01 · Công cụ này là gì & dùng khi nào

**Windsurf** (tiền thân: **Codeium**) là một **AI-native IDE** — môi trường lập trình tích hợp AI làm *trung tâm*. Về bản chất kỹ thuật, nó là một bản **fork của VS Code**, nên giữ nguyên extension, keybinding, theme quen thuộc của VS Code. Điểm khác biệt cốt lõi so với plugin AI thường: AI không "gắn thêm" mà xoay quanh một agent tên **Cascade**.

- **URL chính thức:** <https://windsurf.com> (đang chuyển hướng dần sang <https://devin.ai/desktop>)
- **Nhà phát triển ban đầu:** Codeium (đồng sáng lập Varun Mohan, Anshul Kanakia).
- **Chủ sở hữu hiện tại:** **Cognition AI** — công ty đứng sau agent tự hành **Devin** (CEO Scott Wu). Cognition mua Windsurf tháng 7/2025.
- **Tên hiện tại (từ 6/2026):** **Devin Desktop**.
- **Quy mô (theo nguồn chính thức tới giữa 2025):** khoảng **800.000+ người dùng**, **1.000+ khách hàng enterprise**, ARR ~**82 triệu USD** (7/2025). Một customer story với Anthropic ghi hệ thống xử lý **100 triệu+ token/phút**.

Vì là fork VS Code, bạn dùng được gần như mọi extension/theme/phím tắt quen thuộc và import thẳng cấu hình sang. Khác biệt nằm ở các thứ AI gắn chặt vào lõi: **Cascade** (agent), **Tab/Supercomplete** (autocomplete), **Flow Awareness** (theo dõi ngữ cảnh bạn đang làm), và **Codemaps** (sơ đồ codebase do AI vẽ).

::: warning 💡 Windsurf thuộc nhóm nào? — định vị cho người mới
Thị trường công cụ AI coding 2026 chia làm **3 nhóm**, đừng nhầm:
- **Nhóm "gợi ý inline + chat"** — như **GitHub Copilot**: AI ngồi trong IDE gốc (VS Code), gợi ý từng dòng + ô chat, bạn vẫn lái chính.
- **Nhóm "full IDE có agent tích hợp sâu"** — **Windsurf** ở đây, cùng **Cursor**: IDE riêng (fork VS Code), agent đọc & sửa nhiều file.
- **Nhóm "agent terminal/cloud tự chủ"** — như **Claude Code** / **OpenAI Codex**: giao việc rồi review kết quả, ít thấy "quá trình".

So với **Cursor** (cùng nhóm), triết lý Windsurf nghiêng về **tự hành cao** — Cascade tự quyết nhiều, hỏi ít; còn Cursor cho bạn **kiểm soát chi tiết** hơn (chọn model/task thủ công). Đây là khác biệt "tính cách" quan trọng nhất giữa hai công cụ.
:::

**Dùng khi nào?** Khi bạn có một codebase thật, muốn một công cụ "all-in-one" *ngồi trong editor* nhưng đủ mạnh để giao hẳn việc nhiều bước, đụng nhiều file: thêm tính năng, sửa bug khó, viết/chữa test, refactor. Windsurf đặc biệt hợp với **solo dev / indie hacker** muốn tự hành nhanh, ít cấu hình; hoặc team cần **chạy trên nhiều IDE** (Windsurf có plugin cho 40+ editor), hoặc cần **compliance mạnh** (quốc phòng/tài chính).

::: details 👉 Các tính năng chính của Windsurf (xem nhanh, đi sâu ở mục sau)
| Tính năng | Mô tả ngắn |
|---|---|
| **Cascade** | Agent lõi: đọc toàn bộ codebase, sửa nhiều file từ 1 câu lệnh, chạy lệnh terminal, xem output rồi tự lặp ("flow-aware"). Có chế độ **Write / Chat (Ask) / Plan**. Mở bằng **Ctrl+L** (Cmd+L trên Mac). |
| **Tab / Supercomplete** | Autocomplete nâng cao: không chỉ gợi dòng kế mà đoán *hành động kế tiếp* (di chuyển con trỏ, thêm import, "Tab to Jump"). Hiển thị ghost text xám. |
| **Flow Awareness** | Theo dõi file đang sửa, output terminal, clipboard, browser preview để đoán nhu cầu của bạn. |
| **Codemaps** (2026) | Sơ đồ trực quan codebase do AI chú thích: module, quan hệ, luồng dữ liệu. *Theo nguồn*, đây là điểm mạnh cho monorepo/legacy code mà đối thủ chưa có tương đương. |
| **SWE-1.5 / SWE-1.6** | Model coding riêng của Cognition (xem mục 01 — bảng so sánh). |
| **Browser preview + 1-click deploy** | Xem trước web ngay trong IDE, deploy một nút; có web search & live element targeting. |
| **MCP** | Kết nối DB/API/dịch vụ ngoài qua Model Context Protocol; có 1-click setup cho server MCP có sẵn. |
| **Rules / Memories / Workflows** | `.windsurfrules` (quy tắc project, giới hạn ~12.000 token), **Memories** (AI tự ghi nhớ qua phiên), **Workflows** (kịch bản lặp lưu thành slash command). |
| **Plugins cho 40+ IDE** | JetBrains, Vim/Neovim, Xcode… — không khoá cứng vào một editor như Cursor. |
| **Agent Command Center / Spaces** (Devin Desktop, 6/2026) | Bảng Kanban quản lý nhiều agent local + cloud (Devin Cloud) cùng lúc. |
:::

### So với công cụ khác

Bảng dưới so sánh khách quan với các đối thủ cùng hạng mà dev VN hay cân nhắc *(đặc điểm tới giữa 2026, có thể đổi; nhiều benchmark là nguồn thứ cấp — đọc như tham khảo)*:

| Tiêu chí | **Windsurf / Devin Desktop** | **Cursor** | **VS Code + Copilot** | **Claude Code** | **OpenAI Codex** |
|---|---|---|---|---|---|
| **Dạng** | IDE (fork VS Code) | IDE (fork VS Code) | IDE gốc + extension | CLI/agent trong terminal | CLI/cloud agent + desktop |
| **Triết lý** | Tự hành cao (Cascade tự quyết, hỏi ít) | Kiểm soát chi tiết (chọn model/task, `.cursorrules`) | Trợ lý + autocomplete | Reasoning sâu nhất | Chạy song song nhiều agent cloud |
| **IDE hỗ trợ** | **40+ IDE** | Chỉ Cursor | VS Code | Editor-agnostic (terminal) | Terminal + desktop |
| **Model riêng** | SWE-1.5/1.6 (~950 tok/s) | Composer | GPT/Claude qua Copilot | Opus/Sonnet (Anthropic) | GPT-5.5 |
| **Điểm mạnh** | Codemaps, autonomy, đa-IDE, compliance | Snappy, control, team/power user | Hệ sinh thái sẵn, giá rẻ Copilot | Refactor lớn, chất lượng output | Parallel nhiều agent trong VM cloud |
| **Compliance** | ZDR, SOC2, HIPAA, FedRAMP/DoD, ITAR, RBAC, SCIM | Chủ yếu SOC2 | Theo GitHub/Microsoft | Theo Anthropic | Theo OpenAI |
| **Giá Pro** | ~20 USD/tháng | ~20 USD/tháng | Copilot rẻ hơn | Pro 20 USD hoặc API | Kèm gói ChatGPT hoặc API |

::: tip 📊 Benchmark & model — đọc cho đúng
*(Số liệu tổng hợp tới giữa 2026, phần lớn là nguồn thứ cấp/tự công bố — coi là tham khảo, không phải kiểm toán độc lập.)*
- **Điểm tổng hợp (third-party):** Claude Code ~9,0/10, OpenAI Codex ~8,8/10, Windsurf (bản Wave 13) ~8,7/10 — sát nhau, khác biệt nhỏ hơn so với việc bạn dùng kỷ luật tới đâu.
- **Model SWE-1.5 của Cognition:** đạt **~40,08% SWE-bench Pro** (so với Claude Sonnet 4.5 ~43,6%) — nhỉnh thấp hơn về *điểm*, nhưng **nhanh hơn ~13,8×** và tốc độ ~**950 token/giây**. Triết lý ở đây là *"đủ tốt nhưng cực nhanh"* để vòng lặp agent mượt. *(Nguồn: cognition.ai/blog/swe-1-5 + Scale leaderboard.)*
- **Lưu ý lộ trình model:** từ **1/7/2026**, theo nguồn `devin.ai`, agent **Cascade dự kiến được thay bằng "Devin Local"** — bản viết lại bằng Rust, tuyên bố tiết kiệm ~30% token và hỗ trợ subagent. Cascade được hỗ trợ chuyển tiếp tới mốc này. Nếu bạn đọc chương sau 7/2026, kiểm tra lại tên agent.
:::

### Khi nào KHÔNG nên dùng Windsurf

::: warning 🛑 Ranh giới thật — đừng dùng "búa tạ đập ruồi"
- **Codebase rất lớn / monorepo phức tạp cần độ chính xác cao:** Cascade có thể **hallucinate khi nuốt nguyên codebase lớn** — một dev mô tả là *"rất tệ"*, phải "hand-feed" từng phần (xem mục 04). Codemaps giúp đỡ phần nào nhưng vẫn nên thận trọng.
- **Cần autocomplete cực nhanh, vòng edit ngắn:** nhiều review cho rằng Cursor "snappy" hơn ở các vòng edit ngắn — Windsurf nhỉnh chậm hơn.
- **Cần kiểm soát chi tiết** từng model / từng hành vi agent: Cursor với `.cursorrules` phù hợp hơn; Cascade thiên về tự quyết.
- **Dev cường độ rất cao, ngân sách thấp:** quota theo ngày/tuần dễ cạn giữa kỳ (mục 04) — cân nhắc Claude Code (tính theo API) hoặc Cursor.
- **Chỉ cần trợ lý nhẹ trong VS Code hiện có:** Copilot rẻ và đủ.
- **Lo ngại biến động thương hiệu/sản phẩm:** vừa rebrand thành Devin Desktop (2/6/2026) và sắp thay Cascade bằng Devin Local (1/7/2026) — team cần ổn định nên theo dõi sát hoặc chờ.
:::

---

## 02 · Cài đặt / Đăng ký & truy cập — bối cảnh VN

### Có bản Free dùng được không? — CÓ (giới hạn)

Khác Claude Code (bắt buộc trả phí), Windsurf **có bản Free**. Bản Free cho **inline edit + Tab completion KHÔNG giới hạn**, còn agent (Cascade) chạy với **quota nhẹ và model hạn chế**. Đủ để học/thử, không đủ cho dev cường độ cao.

### Bảng giá & gói (theo `devin.ai/pricing`, ~6/2026)

| Gói | Giá | Gồm |
|---|---|---|
| **Free** | 0 USD | Quota "nhẹ" để chạy agent, model giới hạn; **inline edit + Tab completion không giới hạn** |
| **Pro** | **20 USD/tháng** | Quota cao hơn; full model (OpenAI, Claude, Gemini); SWE-1.6 + model open-source miễn phí; Devin Cloud; mua thêm usage theo giá API |
| **Max** | **200 USD/tháng** | Như Pro nhưng quota **cao hơn nhiều** |
| **Teams** | **80 USD/tháng (base) + 40 USD/dev/tháng** | Không giới hạn thành viên; admin dashboard, analytics, billing tập trung, priority support |
| **Enterprise** | Liên hệ | SSO SAML/OIDC, deploy riêng (self-hosted/air-gapped), dedicated support |

::: warning ⚠️ Hệ thống quota đã ĐỔI — đừng tin số liệu cũ
Từ **19/3/2026**, Windsurf **bỏ hệ thống credit**, chuyển sang **quota theo ngày + tuần** (tự refresh). Quan trọng: Cognition **cố ý không công bố con số quota cụ thể** — họ nói *"chi phí mỗi message tuỳ model và độ phức tạp"*.

→ Hệ quả: rất nhiều blog cũ vẫn ghi giá/credit kiểu **Free 25 credit, Pro 15 USD/500 credit, Teams 30, Enterprise 60** — **đã LỖI THỜI**, đừng dùng. Cũng vì không công bố quota nên **khó dự đoán chi phí** — đây là phàn nàn lớn của cộng đồng (xem mục 04).
:::

### Dùng được ở Việt Nam không? — CÓ

Windsurf/Devin Desktop là **phần mềm tải về**, **không chặn theo vùng** (chưa thấy nguồn nào nói chặn VN). Về mặt sử dụng, bạn **hoàn toàn dùng được** từ VN.

*(Lưu ý minh bạch: phần này nguồn mỏng — không có tài liệu chính thức liệt kê VN trong danh sách hỗ trợ như cách Anthropic làm. Kết luận "dùng được" dựa trên việc đây là app tải về và không có thông tin chặn.)*

::: warning 💳 Thanh toán ở VN — đọc kỹ kẻo bị từ chối thẻ
Windsurf nhận **thẻ tín dụng quốc tế (Visa/Mastercard)**, Apple Pay, Google Pay, Link, WeChat Pay, Alipay — qua cổng thanh toán toàn cầu (nhiều khả năng là **Stripe**).
- **Thẻ VN Visa/Mastercard quốc tế:** thường dùng được.
- **Thẻ nội địa NAPAS:** **không dùng được**.
- **Bị từ chối thẻ?** Một số trường hợp bị chặn do kiểm soát FX/cross-border. Nguồn cộng đồng gợi ý **tắt VPN** để trang hiện đúng phương thức thanh toán theo quốc gia, và liên hệ support nếu vẫn lỗi.

*(Nguồn: evertry.co + docs.devin.ai — third-party + docs, độ tin trung bình.)*
:::

### Cài đặt

Tải tại **<https://windsurf.com/download/editor>** (Mac/Windows/Linux, ~100–200MB):

```text
1. macOS  → tải .dmg, kéo Windsurf vào thư mục Applications.
2. Windows → chạy file cài đặt (wizard), bấm Next đến hết.
3. Linux  → giải nén gói tải về rồi chạy file thực thi.
```

Lần đầu mở, onboarding cho phép **Import from VS Code / Cursor** (mang theo extension, theme, keybinding). Sau đó mở project bằng **File → Open Folder**, IDE sẽ **tự index codebase**. Mở Cascade bằng **Ctrl+L** (hoặc **Cmd+L** trên Mac).

::: tip 🇻🇳 Một điểm cộng cho người Việt
**`.windsurfrules` và prompt cho Cascade viết bằng tiếng Việt vẫn hoạt động tốt** vì các model nền (Claude/GPT/Gemini) hiểu tiếng Việt. Giao diện/docs hiện bằng tiếng Anh và tài liệu cộng đồng tiếng Việt còn ít — vừa là rào cản nhỏ, vừa là khoảng trống tốt để học và chia sẻ.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có lệnh/prompt thật)

Dưới đây là vòng làm việc chuẩn từ lúc mở project đến lúc giao việc cho agent. Mở Windsurf gõ theo.

**Bước 1 — Mở project & đợi index.** Dùng `File → Open Folder`, để IDE index xong codebase (thanh tiến trình ở dưới).

**Bước 2 — Viết bộ quy tắc dự án `.windsurfrules`.** Đặt ở **gốc repo**, giới hạn **≤ 12.000 token**. Đây là nơi bạn "dạy" Cascade về coding standards, kiến trúc, lệnh build:

```text
# .windsurfrules — đặt ở gốc repo

- Dự án dùng TypeScript strict mode, không dùng `any`.
- Backend: Laravel 11. Frontend: React + Vite. State dùng Zustand.
- Luôn viết test cho logic mới (Vitest cho FE, Pest cho BE).
- Không sửa file trong thư mục `vendor/` và `node_modules/`.
- Commit message theo Conventional Commits (feat:, fix:, chore:).
```

**Bước 3 — Mở Cascade (Ctrl+L) và chọn ĐÚNG chế độ.** Đây là điểm nhiều người bỏ qua:

```text
Plan   → cho task lớn/mơ hồ: Cascade dựng kế hoạch TRƯỚC, bạn duyệt rồi mới code.
Write  → để Cascade sửa code trực tiếp (chế độ mặc định khi giao việc).
Chat   → (Ask) hỏi đáp thuần, KHÔNG sửa file — dùng để hiểu code.
```

**Bước 4 — Giao việc bằng ngôn ngữ tự nhiên (tiếng Việt được).** Cascade sẽ lập kế hoạch, sửa nhiều file (hiện diff để duyệt), chạy terminal, và lặp:

```text
Thêm endpoint POST /api/invoices/{order}/pdf để xuất hoá đơn PDF cho đơn hàng.
Gọi nó từ nút "Tải hoá đơn" trên trang chi tiết đơn (src/pages/OrderDetail.tsx).
Viết test cho controller. Chạy test và sửa đến khi pass.
```

**Bước 5 — Duyệt diff từng bước.** Với task đụng nhiều file, đừng "accept all" mù quáng — đọc từng diff, nhất là phần đụng auth/migration/thanh toán.

**Bước 6 — Đóng việc lặp lại thành Workflow** (xem 03b) để lần sau gọi bằng một slash command.

### 03b · Workflow — đóng kịch bản lặp thành slash command

Đây là tính năng "ăn tiền" nhất của Windsurf cho việc lặp. **Cấu trúc thật** (theo `docs.devin.ai/desktop/cascade/workflows`):

- **Vị trí file:** `.windsurf/workflows/*.md` (commit theo repo, cả team dùng chung) **hoặc** global `~/.codeium/windsurf/global_workflows/*.md`.
- **Định dạng:** file Markdown có frontmatter `name:` + `description:` + các bước đánh số. Giới hạn **12.000 ký tự**.
- **Manual-only:** Cascade **không tự gọi** — bạn phải gọi bằng slash command `/[tên-workflow]`.

Một workflow `pre-pr-check` tối thiểu — đặt tại `.windsurf/workflows/pre-pr-check.md`:

```markdown
---
name: pre-pr-check
description: Run before opening a PR — lint, tests, type check, and stage diff
---

1. Chạy linter: `npm run lint` và sửa các lỗi báo về.
2. Chạy type checker: `npm run typecheck`.
3. Chạy toàn bộ test suite: `npm test`.
4. Nếu tất cả xanh, stage thay đổi: `git add -A`.
5. Tóm tắt những gì đã đổi để chuẩn bị mô tả PR.
```

Gọi trong Cascade bằng:

```text
/pre-pr-check
```

Ví dụ workflow chính thức `/address-pr-comments` (rút gọn từ docs) cho thấy có thể nhúng cả lệnh `gh`:

```markdown
---
name: address-pr-comments
description: Check out a PR, read its review comments, and address each one
---

1. Check out the PR branch: `gh pr checkout [id]`
2. Lấy comment trên PR [dùng lệnh `gh api`]
3. Với MỖI comment: đọc → sửa code tương ứng → đánh dấu đã xử lý
4. Sau khi xử lý hết comment, tóm tắt các thay đổi đã làm.
```

::: tip 🔁 Pattern hay dùng — chuỗi workflow theo vòng đời task
Cộng đồng hay dựng một chuỗi workflow đánh số để chuẩn hoá quy trình, gọi lần lượt:
```text
/0-task        # khởi tạo task, ghi mục tiêu
/1-discovery   # đọc code liên quan, liệt kê file cần đụng
/2-design      # đề xuất thiết kế, để bạn duyệt
/3-implement   # code theo thiết kế đã chốt
/4-clean       # dọn dẹp, chạy lint/test
```
Ngoài ra `/test_new_changes` để chạy test riêng phần vừa sửa. *(Nguồn: docs.devin.ai + windsurf.com/university.)*
:::

### 03c · MCP — nối Cascade với dữ liệu/công cụ ngoài

Windsurf hỗ trợ **MCP (Model Context Protocol)** để Cascade truy cập DB/API/dịch vụ ngoài (ví dụ tra issue trên Jira, query database). Điểm tiện: có **1-click setup** cho các server MCP có sẵn trong giao diện. Sau khi thêm, bạn cho Cascade dùng trực tiếp trong prompt — ví dụ *"đọc issue PROJ-123 từ Jira rồi sửa code theo mô tả"*.

### 03d · Codemaps — đọc nhanh một codebase lạ

Khi nhận một monorepo/legacy code lạ, mở **Codemaps** để xem sơ đồ AI vẽ: module nào nói chuyện với module nào, luồng dữ liệu đi đâu. Đây là điểm *theo nguồn* mà đối thủ chưa có tương đương — rất hợp cho việc onboard vào dự án cũ trước khi giao Cascade sửa.

---

## 04 · Mẹo hay & lỗi thường gặp

### Mẹo ăn tiền (làm là thấy khác ngay)

::: tip ✅ 7 mẹo thực chiến
1. **Luôn viết `.windsurfrules` trước khi giao việc lớn.** Không có nó, Cascade đoán mò coding convention của bạn — dễ sửa lệch chuẩn.
2. **Task lớn/mơ hồ → bật chế độ Plan trước.** Xem kế hoạch, chỉnh cho đúng rồi mới cho Write — tránh agent "lao vào" sửa sai hướng.
3. **Đừng "accept all" mù quáng.** Cascade thiên về tự hành nên đôi khi **sửa vượt yêu cầu** — duyệt từng diff, đặc biệt phần auth/migration/thanh toán.
4. **Đóng việc lặp thành Workflow** (`.windsurf/workflows/*.md`) — lần sau gọi `/tên` thay vì gõ lại cả đoạn hướng dẫn.
5. **Codebase lớn → đừng bắt Cascade nuốt cả repo một lần.** Chỉ cho nó phạm vi file liên quan; dùng Codemaps để định vị trước.
6. **Tận dụng Tab/Supercomplete cho lúc gõ tay** — nó đoán cả "hành động kế tiếp" (thêm import, nhảy con trỏ), không chỉ dòng kế.
7. **Theo dõi quota theo ngày/tuần.** Vì Cognition không công bố mức tiêu thụ, hãy để ý đồng hồ quota và giãn việc nặng ra — đừng dồn hết vào đầu tuần.
:::

::: warning 🔒 BẢO MẬT & dữ liệu của bạn đi đâu
Bạn đang giao **cả codebase thật** cho một dịch vụ chạy trên cloud — phải biết dữ liệu đi đâu **trước khi** dán code khách hàng vào. Theo `windsurf.com/security` + nguồn thứ cấp (reco.ai), tới giữa 2026:

- **Zero Data Retention (ZDR)** là **mặc định cho tier Team/Enterprise**: code gửi đi để inference **không lưu** sau khi request xong; tính năng lưu artifact phải **opt-in**.
- **Free/Pro:** có thể tắt telemetry ở **Settings → Telemetry → Disable**. *Theo các nguồn thứ cấp*, nếu **không opt-out**, code có thể bị giữ làm dữ liệu training — nên với code nhạy cảm, cân nhắc tier Team/Enterprise (ZDR) hoặc tắt telemetry.
- **Self-hosted / air-gapped** cho enterprise → nhà cung cấp không truy cập được data (xem case Anduril ở mục 06).
- **Chứng chỉ tuân thủ:** SOC 2, HIPAA, FedRAMP/DoD, ITAR, RBAC, SCIM — nhiều hơn Cursor (chủ yếu SOC2). Đây là lý do Windsurf được chọn ở mảng quốc phòng/tài chính.

**Đừng bao giờ** dán secrets (API key, `.env`, private key), PII khách hàng, hay code ràng buộc NDA vào một phiên Free/Pro chưa tắt telemetry.
:::

### Lỗi thường gặp & cách tránh

::: warning 🚨 7 cái bẫy hay vấp
1. **"End-of-month drought" — cạn quota giữa kỳ.** Sau khi chuyển sang quota ngày/tuần (19–22/3/2026), người dùng cường độ cao **than phiền hết quota giữa chu kỳ** — đây là phàn nàn phổ biến nhất trên r/windsurf.
2. **Top-up không khôi phục quota tuần.** Có người nạp thêm 5 USD khi quota tuần đã dùng 96% — chỉ giảm về ~94%, gần như vô nghĩa. *(Nguồn: Medium @lacanianpupil.)*
3. **Không biết mình tiêu bao nhiêu.** Cognition không công bố mức tiêu thụ quota → khó dự đoán chi phí. Phải tự "cảm" qua đồng hồ quota.
4. **Hallucinate khi nuốt codebase lớn.** Một dev mô tả *"rất tệ"*, phải "hand-feed" từng phần. *(Nguồn: Jeff Heisler, Medium.)*
5. **Agent quá hung hăng** — đôi khi sửa vượt yêu cầu. Khắc phục: dùng Plan mode + duyệt diff kỹ.
6. **Chậm hơn Cursor ở vòng edit ngắn** — nhiều review ghi nhận. Nếu bạn cần phản hồi tức thì khi gõ tay nhiều, đây là điểm trừ.
7. **Support không có live chat ở gói trả phí** — bất tiện so với Cursor khi gặp sự cố gấp.
:::

::: details ❓ FAQ & lỗi hay gặp
*(Sản phẩm đổi nhanh; đối chiếu docs ở mục 07. Nhớ: Windsurf = Devin Desktop từ 6/2026.)*

**Hỏi: "Windsurf" với "Devin Desktop" có phải hai phần mềm khác nhau?**
→ Không. Cùng một sản phẩm. Cognition đổi tên Windsurf IDE thành **Devin Desktop** ngày 2/6/2026; domain cũ chuyển hướng sang `devin.ai`.

**Hỏi: Tải ở đâu cho đúng?**
→ <https://windsurf.com/download/editor>. Sau khi cài, đăng nhập tài khoản để dùng Cascade.

**Hỏi: Quota của tôi bao nhiêu message/ngày?**
→ Cognition **cố ý không công bố** con số cụ thể — "tuỳ model và độ phức tạp mỗi message". Hãy theo dõi đồng hồ quota trong app và giãn việc nặng.

**Hỏi: Tôi nạp thêm tiền sao quota tuần không lên lại?**
→ Đúng, top-up **không** khôi phục quota tuần đã dùng — nạp khi đã gần cạn gần như vô ích. Nên lên gói cao hơn (Max) nếu thường xuyên cạn.

**Hỏi: Cascade sửa hỏng/sửa vượt yêu cầu, làm sao quay lại?**
→ Vì thay đổi nằm trên đĩa/git, dùng `git checkout -- <file>` (hoặc `git restore`) để khôi phục file chưa commit. Lần sau bật **Plan mode** và duyệt diff trước khi accept.

**Hỏi: Thẻ Việt Nam của tôi bị từ chối khi mua Pro?**
→ Thẻ **NAPAS nội địa không dùng được**; cần Visa/Mastercard **quốc tế**. Nếu vẫn lỗi, thử **tắt VPN** để trang hiện đúng phương thức và liên hệ support.

**Hỏi: Tôi nghe nói Cascade sắp bị thay?**
→ Theo `devin.ai`, từ **1/7/2026** Cascade dự kiến được thay bằng **Devin Local** (viết lại bằng Rust, tiết kiệm ~30% token, hỗ trợ subagent). Cascade hỗ trợ chuyển tiếp tới mốc đó. Workflow có thể đổi — theo dõi changelog.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tuần tự. Mỗi bài có **tiêu chí thành công rõ** để bạn tự kiểm.

### 🧪 Bài 1 — Cài, import & "làm quen" một repo thật (cơ bản)

**Mục tiêu:** cài Windsurf, mở một project của bạn, dùng Cascade ở chế độ **Chat** để hiểu code.

1. Cài theo mục 02, mở app, **Import from VS Code/Cursor** nếu có.
2. `File → Open Folder` chọn một project thật, đợi index xong.
3. Mở Cascade (**Ctrl+L**), chọn chế độ **Chat (Ask)**, hỏi 2 câu:
```text
Cho mình tổng quan kiến trúc của codebase này.
Luồng xác thực (authentication) được xử lý ở đâu?
```
4. Mở **Codemaps** xem sơ đồ module.

::: details ✅ Tiêu chí hoàn thành
- Windsurf chạy được, đã import cấu hình (nếu có) và index xong project.
- Bạn nhận được mô tả tổng quan + chỗ xử lý auth.
- Bạn phân biệt được 3 chế độ **Write / Chat / Plan** và biết Chat **không** sửa file.
:::

### 🧪 Bài 2 — Giao một task "tự chạy đến khi xanh" có Plan mode (cốt lõi)

**Mục tiêu:** trải nghiệm vòng *agentic* của Cascade: lập kế hoạch → sửa nhiều file → chạy test → tự sửa. Có `.windsurfrules` để bám chuẩn.

1. Tạo file `.windsurfrules` ở gốc repo (theo mẫu mục 03, Bước 2).
2. Mở Cascade, chọn **Plan**, giao việc:
```text
Thêm một tính năng nhỏ có đụng cả backend lẫn frontend (ví dụ: thêm
trường "ghi chú" cho đơn hàng). Lập kế hoạch các file cần sửa trước.
```
3. Duyệt kế hoạch, chỉnh nếu cần, rồi chuyển sang **Write** để Cascade thực thi và **chạy test, sửa đến khi pass**.

::: details ✅ Tiêu chí hoàn thành
- Bạn **thấy kế hoạch trước** khi file bị sửa (Plan mode hoạt động).
- Cascade sửa nhiều file, **chạy test thật**, tự sửa cho đến khi xanh.
- Bạn duyệt từng diff thay vì "accept all", và biết dùng `git restore` nếu cần hoàn tác.
:::

### 🧪 Bài 3 — Đóng quy trình lặp thành Workflow + nối MCP (nâng cao)

**Mục tiêu:** tạo một slash command tái dùng và (tuỳ chọn) nối một MCP server.

1. Tạo `.windsurf/workflows/pre-pr-check.md` theo mẫu mục 03b.
2. Gọi nó trong Cascade:
```text
/pre-pr-check
```
3. (Tuỳ chọn) Vào phần MCP, dùng **1-click setup** thêm một server (ví dụ filesystem), rồi yêu cầu Cascade dùng nó trong một prompt.

::: details ✅ Tiêu chí hoàn thành
- Workflow chạy đúng các bước (lint → typecheck → test → stage).
- Slash command `/pre-pr-check` gọi được và Cascade thực hiện tuần tự.
- (Nếu làm phần MCP) Cascade truy cập được nguồn dữ liệu/công cụ ngoài đã cấu hình.
:::

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này tổng hợp các trường hợp dùng Windsurf **có thật** giai đoạn 2025–2026. Các case có nguồn **chính thức** (windsurf.com case studies, claude.com/customers) đáng tin nhất; các con số % từ tổng hợp third-party đã được gắn nhãn rõ để bạn đọc dè dặt.

::: warning ⚠️ Đọc số liệu cho đúng
- Các % năng suất từ nguồn thứ cấp (ServiceNow ~10%, ngân hàng ~40%, ~100 triệu USD risk…) **chưa được kiểm chứng độc lập**, một số **không nêu tên công ty** — coi là *"theo tổng hợp"*.
- Danh sách khách hàng enterprise được nêu tên (JPMorgan Chase, Dell, Anduril, Zillow, Broadcom, Mercado Libre, athenahealth) chỉ là **danh sách khách**, **không** phải case study chi tiết cho từng cái.
:::

### 06a · Case có nguồn chính thức (đáng tin nhất)

**① Anduril (quốc phòng, 2.200+ nhân viên) — deploy air-gapped, tiết kiệm "hàng trăm giờ gõ phím"**
- **Bối cảnh:** Anduril triển khai Windsurf **air-gapped trên AWS GovCloud**, tích hợp IAM + GitHub self-hosted — môi trường bảo mật ngặt nghèo.
- **Kết quả:** tiết kiệm *"hàng trăm giờ gõ phím"* nhờ code completion; chứng minh Windsurf chạy được trong môi trường cô lập hoàn toàn (nhà cung cấp không truy cập data).
- **Bài học:** compliance mạnh (FedRAMP/DoD/ITAR + self-hosted) là lý do thật để chọn Windsurf ở mảng nhạy cảm.
- *Nguồn: windsurf.com/blog/anduril-case-study (chính thức).*

**② Customer story với Anthropic/Claude — gần một nửa code commit mới do AI viết**
- **Bối cảnh:** một công ty dùng Windsurf (chạy trên model Claude) được Anthropic ghi nhận trong customer story.
- **Kết quả:** gần **một nửa code commit mới** là do AI viết; **+38% tỉ lệ chấp nhận gợi ý**; hệ thống xử lý **100 triệu+ token/phút**.
- **Bài học:** ở quy mô thật, agentic coding chiếm tỉ trọng đáng kể trong code mới — nhưng vẫn cần con người review.
- *Nguồn: claude.com/customers/windsurf (chính thức).*

**③ WWT (developer cá nhân) — tăng năng suất 70%+, migration mỗi màn hình từ >1 ngày còn vài giờ**
- **Bối cảnh:** một developer ở WWT dùng Windsurf cho công việc migration.
- **Kết quả:** tăng năng suất **70%+**; task từng mất nhiều ngày nay xong trong vài giờ; migration mỗi màn hình từ hơn 1 ngày rút còn ~vài giờ.
- *Nguồn: wwt.com/blog/... (chính thức của WWT).*

### 06b · Case từ tổng hợp third-party (đọc dè dặt)

**④ Dell — sau 2 tuần thử, 100% developer muốn tiếp tục dùng**
- Triển khai thử trong **2 tuần**, **100% developer muốn tiếp tục dùng** Windsurf. *(Nguồn: tổng hợp review + Contrary Research — third-party.)*

**⑤ ServiceNow — ~7.000 kỹ sư, năng suất +~10%**
- Dùng Windsurf cho khoảng **7.000 kỹ sư**, tăng năng suất ~**10%**. *(Nguồn: getpanto.ai — third-party, đọc dè dặt.)*

**⑥ Một top-10 financial services — giảm rủi ro pháp lý/regulatory ~100 triệu USD; một ngân hàng lớn giảm 40% thời gian viết unit test**
- *(Nguồn: tổng hợp third-party — hedge mạnh: không nêu tên công ty, không kiểm chứng độc lập.)*

::: tip 💡 Đọc các case này để rút ra điều gì
- **Compliance + self-hosted** (Anduril) là thế mạnh khác biệt rõ nhất của Windsurf so với Cursor.
- **Agentic coding chiếm tỉ trọng lớn trong code mới** (customer story Claude) — nhưng con người vẫn là người *review & cầm lái thiết kế*.
- **Các % năng suất nghe rất hấp dẫn** nhưng phần lớn là tự báo cáo/tổng hợp — dùng để tham khảo định hướng, đừng coi là cam kết.
:::

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 6 điều mang theo
1. **Windsurf = Devin Desktop** (từ 2/6/2026, do **Cognition** sở hữu) — một **AI-native IDE** fork VS Code, xoay quanh agent **Cascade** đọc cả repo, sửa nhiều file, chạy lệnh và tự lặp.
2. **Có bản Free** (Tab + inline edit không giới hạn, quota agent nhẹ); **Pro 20 USD/tháng**, **Max 200 USD**, **Teams 80 USD base + 40 USD/dev**.
3. **Quota đã đổi (19/3/2026):** bỏ credit, chuyển sang **quota ngày/tuần**, **không công bố con số** → khó dự đoán chi phí; cạn giữa kỳ là phàn nàn phổ biến.
4. **Dùng được ở VN** (app tải về, không chặn vùng); thanh toán cần **Visa/Mastercard quốc tế** — **thẻ NAPAS nội địa không được**.
5. **Quy trình chuẩn:** Open Folder → viết `.windsurfrules` → Cascade (Plan cho task lớn / Write để sửa / Chat để hỏi) → duyệt diff → đóng việc lặp thành Workflow `.windsurf/workflows/*.md`.
6. **Chọn Windsurf khi:** muốn tự hành nhanh ít cấu hình, cần đa-IDE, hoặc cần compliance mạnh (ZDR/HIPAA/FedRAMP/ITAR). **Tránh khi:** cần kiểm soát chi tiết (→ Cursor), vòng edit cực nhanh (→ Cursor), hoặc ngân sách thấp dùng nặng (→ Claude Code/API).
:::

Sản phẩm đổi rất nhanh (vừa rebrand thành Devin Desktop, sắp thay Cascade bằng Devin Local) — khi giáo trình lỗi thời, dùng các link chính thức sau để tự cập nhật:

| Chủ đề | Link chính thức |
|---|---|
| Trang sản phẩm mới (Devin Desktop) | <https://devin.ai/desktop> |
| Trang Windsurf (đang chuyển hướng) | <https://windsurf.com> |
| Bảng giá (pricing) | <https://devin.ai/pricing> |
| Tài liệu (docs) | <https://docs.devin.ai/desktop/> |
| Tải editor | <https://windsurf.com/download/editor> |
| Bảo mật (security) | <https://windsurf.com/security> |
| Blog mua lại (Cognition) | <https://cognition.ai/blog/windsurf> |
| Blog model SWE-1.5 | <https://cognition.ai/blog/swe-1-5> |
| Thông báo đổi tên Devin Desktop | <https://devin.ai/blog/windsurf-is-now-devin-desktop/> |
| Case study Anduril | <https://windsurf.com/blog/anduril-case-study> |

> *Tài liệu trong chương dựa trên nguồn chính thức (cognition.ai, devin.ai, docs.windsurf/devin, claude.com/customers/windsurf, windsurf.com case studies) tới khoảng **giữa 2026**, kết hợp một số nguồn thứ cấp đã gắn nhãn. Các bẫy thời sự cần né: đừng dùng giá/credit cũ (15 USD, 25 credit…); nhớ **Windsurf = Devin Desktop từ 6/2026**, và **Cascade dự kiến → Devin Local từ 1/7/2026**. Khi nghi ngờ, mở <https://devin.ai/pricing> và docs chính thức ở bảng trên.*
