# Claude Code: hướng dẫn quickstart core

::: tip Cập nhật landscape Claude Code — 5/2026
Tài liệu gốc viết khi Claude Code còn mới và dùng Sonnet 3.7. Trong 2026 hệ sinh thái đã thay đổi đáng kể — bạn nên biết trước khi đi vào:

- **Model line-up tháng 5/2026**: **Claude Opus 4.7** (flagship reasoning), **Claude Sonnet 4.6** (default cho coding), **Claude Sonnet 5** (82.1% SWE-bench Verified — vượt Opus 4.6 trên coding), **Claude Haiku 4.5** (nhanh, rẻ). Chuyển model bằng `/model` bất kỳ lúc nào.
- **Checkpoint mode**: bấm `Ctrl+S` để save state, rollback dễ dàng (như game save).
- **VS Code extension native**: Claude Code chạy hẳn trong VS Code, không cần terminal nữa nếu muốn.
- **Plan Mode (`Shift+Tab` 2 lần)**: chỉ research và lập plan, không edit file. Phù hợp task lớn.
- **Hooks** (`.claude/hooks.json`): chạy script khi event trigger (`PreToolUse`, `PostToolUse`, `Stop`, `UserPromptSubmit`...) — tự động format, lint, test.
- **Skills**: package CLAUDE.md + scripts + docs reuse được cross-project, lưu ở `~/.claude/skills/`.
- **Subagents**: spawn agent con qua `Task` tool, mỗi agent có model + system prompt riêng. Multi-agent native.
- **Managed Agents** (API): Dreaming (review session cũ tự learn pattern), multi-agent orchestration với shared filesystem.
- **Rate limit doubled**: gấp đôi (tháng 5/2026), Opus API limit cũng được nâng.

Chi tiết và best practice 2026 ở [Phụ lục cuối bài](#phụ-lục-claude-code-2026-deep-dive).
:::

Claude Code là tool coding AI-native chính thức của Anthropic, tích hợp năng lực LLM trực tiếp vào terminal, cho bạn dùng ngôn ngữ tự nhiên cộng tác với AI hoàn thành task lập trình. Khác tool autocomplete truyền thống, Claude Code hiểu được context toàn project, execute task dev phức tạp — từ sinh code đến refactor, từ debug đến viết doc — đều làm được.

Chương này dẫn bạn nắm nhanh cách dùng core của Claude Code, gồm cài đặt, thao tác cơ bản, kỹ thuật thực dụng và lệnh phổ biến. Dù bạn lần đầu tiếp xúc tool coding AI hay muốn dùng Claude Code hiệu quả hơn, ở đây đều có kiến thức bạn cần.

---

## Cài đặt nhanh

Claude Code build trên Node.js, nên trước khi cài hãy đảm bảo system có Node.js 18 trở lên. Quá trình cài rất đơn giản, thường chỉ vài phút.

### Tại sao cần Claude Code

Trong flow dev truyền thống, dev phải chuyển đổi liên tục giữa editor, terminal, browser và doc. Claude Code gộp các workflow này vào 1 UI thống nhất: bạn có thể trong cùng cửa sổ terminal viết code, chạy test, xem doc, thậm chí cộng tác với team. Quan trọng hơn, nó hiểu được structure project, nhớ thói quen code của bạn, thực sự trở thành trợ lý lập trình của bạn.

### Cách 1: cài tay

Cài tay phù hợp dev thích control từng bước, cũng giúp bạn rõ thành phần của tool.

```bash
# Cài global Claude Code CLI
# Dùng tham số -g cài lệnh ra global, dùng được ở mọi thư mục
npm install -g @anthropic-ai/claude-code

# Verify cài thành công
# Nếu hiện version (ví dụ 0.1.25) là cài thành công
claude --version
```

Trong quá trình cài, npm tự động download tất cả dependency và config env var. Nếu gặp lỗi permission, có thể thử thêm `sudo` trước lệnh (macOS/Linux) hoặc chạy terminal as admin (Windows).

### Cách 2: để AI Agent cài giúp

Nếu bạn đang dùng trợ lý coding AI khác (như Cursor, Windsurf hay AI Agent của project này), có thể để chúng cài giúp. Lợi ích: AI tự detect env, xử lý conflict dependency, và chọn cách cài tối ưu cho system bạn.

**Cứ nói thẳng:**

```
Cài giúp tôi claude code của anthropic
```

Hoặc cụ thể hơn:

```
Cài claude code cli, và check Node.js version có tương thích không
```

AI Agent sẽ:
1. Check Node.js version hiện tại
2. Nếu không đạt yêu cầu, prompt bạn upgrade
3. Execute lệnh cài
4. Verify kết quả
5. Nếu có vấn đề, tự thử fix

### Khởi động lần đầu và init

Sau khi cài xong, vào thư mục project khởi động Claude Code:

```bash
# Vào thư mục project (Claude Code làm việc ở thư mục hiện tại)
cd /path/to/your/project

# Khởi động Claude Code
claude
```

Lần đầu khởi động, Claude Code dẫn bạn qua vài bước init quan trọng:

1. **Login account Anthropic**: bạn cần có 1 account Anthropic để dùng Claude Code. Nếu chưa có, system sẽ prompt bạn đăng ký.

2. **Chọn plan dùng**:
   - **Free plan**: phù hợp học cá nhân và dùng nhẹ, có 1 giới hạn call nhất định
   - **Pro plan**: phù hợp dev chuyên nghiệp, cấp quota call cao hơn và priority response

3. **Đồng ý điều khoản**: đọc và đồng ý điều khoản dịch vụ và policy privacy của Anthropic

4. **Tuỳ chọn: config API key**: nếu bạn có API key custom (ví dụ qua provider bên thứ 3), có thể config lúc này

::: info Lưu ý cho user Việt Nam
Anthropic chính thức **không restrict thị trường VN** — bạn có thể truy cập trực tiếp claude.com và Claude Code. Tuy nhiên nếu gặp khó khăn (banking, payment), có thể:

1. **Dùng API Token**: mua token API tương thích Anthropic từ provider (như OpenRouter, DeepInfra), config qua env var
2. **Dùng Claude Pro plan**: $20/tháng, thanh toán qua Visa/Mastercard quốc tế
3. **Coding Plan**: 1 số provider có Coding Plan riêng, tối ưu cho coding, thường rẻ hơn

**Khuyến nghị**: cứ để AI Agent giúp bạn config. Chỉ cần cung cấp info config từ vendor (URL API, key...), AI tự set env var đúng.

**Doc config chi tiết hơn:** [Cách cài claudecode và config env var](/vi-vn/stage-2/backend/modern-cli/)
:::

---

## Bắt đầu nhanh: làm thử vài thí nghiệm

Sau khi cài xong, đừng vội dùng vào project chính thức, khuyến nghị làm vài thí nghiệm nhỏ để quen cách Claude Code làm việc. 3 thí nghiệm này design từ dễ tới khó, lần lượt tương ứng 3 năng lực core của Claude Code: hiểu ngôn ngữ tự nhiên, sinh nội dung, và execute code.

### Thí nghiệm 1: hội thoại — cảm nhận khả năng hiểu của AI

Mục tiêu thí nghiệm này là cho bạn trải nghiệm năng lực hiểu ngôn ngữ tự nhiên của Claude Code. Khác search engine thông thường, Claude Code hiểu được context, hội thoại nhiều vòng, và adjust câu trả lời theo feedback của bạn.

**Thử các hội thoại này:**

```
Xin chào, bạn là ai?
```
Claude sẽ giới thiệu mình là Claude Code, trợ lý coding AI do Anthropic phát triển.

```
Closure là gì? Phiên bản TLDR
```
Quan sát cách Claude dựa hint "TLDR" cho giải thích ngắn nhưng chính xác.

```
JavaScript và TypeScript khác nhau thế nào?
```
Câu hỏi này so sánh tech, xem Claude có cho câu trả lời có cấu trúc, có chiều sâu không.

**Điểm chính**: chú ý style trả lời của Claude — thường cho kết luận core trước, sau đó mở rộng chi tiết. Cách trả lời "kim tự tháp ngược" này rất phù hợp lấy info nhanh.

### Thí nghiệm 2: sinh Markdown doc — trải nghiệm sáng tạo content

Thí nghiệm này show năng lực sinh content của Claude Code. Với dev, viết doc thường là việc đau đầu nhất. Claude có thể theo yêu cầu của bạn sinh nhanh doc structure rõ, content đầy đủ.

**Nhập lệnh này:**

```
Viết cho tôi 1 doc Markdown các lệnh Git phổ biến
Yêu cầu: gồm lệnh, mô tả, ví dụ
```

**Claude sẽ làm gì:**

1. Phân tích nhu cầu: lệnh Git phổ biến, format Markdown, 3 yếu tố (lệnh, mô tả, ví dụ)
2. Plan structure doc: thường phân theo scenario dùng (init, dev hàng ngày, quản lý branch, cộng tác remote...)
3. Sinh content: cho mỗi lệnh có mô tả ngắn và ví dụ thực dụng
4. Format output: dùng syntax Markdown, đảm bảo format chuẩn

**Ví dụ output mong đợi**:

```markdown
# Bảng tra cứu lệnh Git phổ biến

## Init repo

| Lệnh | Mô tả | Ví dụ |
|------|------|------|
| `git init` | Init repo mới | `git init my-project` |
| `git clone` | Clone repo remote | `git clone https://github.com/user/repo.git` |

...
```

**Thử nâng cao**: bạn có thể thêm yêu cầu, ví dụ "thêm comment tiếng Việt", "sort theo tần suất dùng", "kèm xử lý lỗi phổ biến"... quan sát cách Claude adjust output.

### Thí nghiệm 3: viết và chạy game — workflow code đầy đủ

Thí nghiệm này khó nhất, show workflow code đầy đủ của Claude Code: hiểu nhu cầu, viết code, tạo file, chạy program, xử lý lỗi. Qua thí nghiệm này, bạn thực sự cảm nhận được sức mạnh của trợ lý coding AI.

**Nhập lệnh này:**

```
Viết game Snake bằng Python
Yêu cầu:
1. Dùng thư viện pygame
2. Có hiển thị điểm
3. ESC để thoát

Viết xong chạy giúp tôi
```

**Claude sẽ thực hiện các bước:**

**Bước 1: check env**
- Check Python đã cài chưa
- Check thư viện pygame có dùng được không
- Nếu thiếu, prompt bạn cài

**Bước 2: viết code**
- Tạo file game chính (như `snake_game.py`)
- Implement logic game: di chuyển rắn, sinh food, detect collision
- Thêm function hiển thị điểm
- Implement ESC để thoát

**Bước 3: chạy game**
- Execute script Python khởi động game
- Cửa sổ game popup, bạn dùng phím mũi tên điều khiển rắn

**Bước 4: support sau**
- Nếu game có bug, có thể nói "rắn xuyên tường rồi, fix giúp"
- Nếu muốn thêm feature, ví dụ "tăng độ khó theo điểm", Claude sẽ tiếp tục sửa

**Giá trị thí nghiệm**:

1. **Verify cài**: đảm bảo Claude Code chạy code được
2. **Trải nghiệm tương tác**: cảm nhận quá trình cộng tác dev với AI
3. **Tạo tự tin**: thấy AI tự hoàn thành 1 program chạy được hoàn chỉnh

**Câu hỏi thường gặp**:

- **Q: Nếu tôi chưa cài pygame?**
  - A: Claude detect được và prompt bạn chạy `pip install pygame`, bạn cũng có thể để Claude cài giúp

- **Q: Game chạy xong terminal bị chiếm thì sao?**
  - A: Bấm ESC thoát game, hoặc dùng Claude Code ở terminal window khác

- **Q: Đổi sang ngôn ngữ lập trình khác được không?**
  - A: Tất nhiên được! Thử "viết bằng JavaScript", "viết bằng HTML5 Canvas"...

---

## Kỹ thuật core

Nắm các kỹ thuật này, hiệu suất dùng Claude Code tăng gấp nhiều lần. Các kỹ thuật này từ kinh nghiệm dev thực tế, cover scenario thao tác phổ biến nhất.

### Kỹ thuật 1: double-click Esc để rollback hội thoại — undo thao tác sai

Đây là shortcut quan trọng và dùng nhiều nhất trong Claude Code. Khi cộng tác với AI, bạn có thể nói sai, ra lệnh sai, hoặc không hài lòng câu trả lời của AI. Double-click Esc cho phép bạn nhanh "quay ngược thời gian".

**Chi tiết shortcut:**

```
Bấm 1 lần Esc    → Xoá content đang nhập (giống Ctrl+C)
Bấm 2 lần Esc    → Rollback về trạng thái hội thoại trước (undo lượt hội thoại trước)
Bấm 3 lần Esc    → Xoá toàn bộ lịch sử hội thoại (bắt đầu lại)
```

**Scenario dùng:**

- **Scenario A**: bạn lỡ gửi lệnh sai, Claude bắt đầu execute. Bấm nhanh 2 lần Esc, về trạng thái trước execute.
- **Scenario B**: reply của Claude không phải cái bạn muốn, muốn hỏi cách khác. Double-click Esc undo, tổ chức lại câu hỏi.
- **Scenario C**: hội thoại đã nhiều vòng, context lộn xộn. Triple-click Esc clear, bắt đầu lại.

**⚠️ Lưu ý quan trọng**: double-click Esc rollback là **trạng thái hội thoại**, không phải sửa code. Nếu Claude đã sửa file của bạn, các sửa đổi này không tự undo. Bạn phải tay dùng `git checkout` hoặc `git reset` khôi phục file.

**Khuyến nghị**: trước khi thao tác có thể sửa code lớn, commit công việc hiện tại (`git commit` hoặc `git stash`), như vậy có vấn đề cũng khôi phục nhanh được.

### Kỹ thuật 2: @ reference file — chỉ định context chính xác

Claude Code tuy tự đọc file project được, nhưng explicit reference file giúp AI hiểu intent của bạn chính xác hơn, và tránh AI đọc file không liên quan lãng phí Token.

**Cách dùng cơ bản:**

Thay vì nói mơ hồ:
```
Giải thích file src/utils.ts
```

Hãy reference trực tiếp:
```
@src/utils.ts giải thích file này
```

**Cách dùng nâng cao:**

**Phân tích so sánh nhiều file:**
```
@src/app.tsx @src/components/Header.tsx Quan hệ 2 file này là gì?
```

**Reference thư mục:**
```
@src/components/ Tổng kết tất cả component trong thư mục này
```

**Reference dòng cụ thể (kèm code editor):**
```
@src/utils.ts:45-60 Giải thích đoạn code này
```

**Mẹo dùng:**

1. **Tab autocomplete**: nhập `@` rồi bấm Tab, Claude hiện list file trong thư mục hiện tại, dùng phím mũi tên chọn
2. **Relative path**: hỗ trợ reference relative path, như `@./config.json` hoặc `@../shared/types.ts`
3. **Fuzzy match**: nhập 1 phần tên file, ví dụ `@utils` sẽ match `src/utils.ts` hoặc `src/utils/index.ts`

### Kỹ thuật 3: ! execute lệnh — tích hợp terminal

Claude Code tích hợp năng lực execute lệnh terminal sẵn, không cần chuyển sang cửa sổ terminal khác để chạy lệnh.

**Cách dùng cơ bản:**

```
!npm test           # Chạy test
!git status         # Xem trạng thái Git
!ls -la             # List file
```

**Scenario thực tế:**

**Scenario: chạy test và phân tích lỗi**
```
!npm test
# Sau khi test fail
Phân tích lý do test fail, và fix code
```

**Scenario: xem diff Git**
```
!git diff
# Sau đó để Claude giải thích thay đổi
Tổng kết content chính của các thay đổi này
```

**Scenario: build project**
```
!npm run build
# Nếu build fail
Build báo lỗi, giúp tôi fix
```

**⚠️ Lưu ý an toàn:**

Claude Code sẽ hỏi xác nhận trước khi chạy 1 số lệnh sensitive (như `rm -rf`, `sudo`...). Đây là cơ chế bảo vệ, hãy xác nhận cẩn thận.

### Kỹ thuật 4: /plan plan trước code sau — cách đúng cho task phức tạp

Với task dev phức tạp, code thẳng thường kém hiệu quả. Lệnh `/plan` cho Claude vào plan mode, lập plan implement chi tiết trước, rồi execute từng bước.

**Cách dùng:**

```
/plan
Tôi muốn thêm function xác thực user, giúp tôi lập plan implement
```

**Claude sẽ làm gì:**

1. **Phân tích nhu cầu**: hiểu function bạn muốn implement
2. **Đánh giá hiện trạng**: xem structure project và tech stack hiện tại
3. **Lập plan**: list từng bước cần làm
4. **Confirm phương án**: thảo luận plan với bạn, adjust theo feedback

**Ví dụ output:**

```
📋 Plan implement function xác thực user

Giai đoạn 1: Design database
- [ ] Tạo bảng users (id, email, password_hash, created_at)
- [ ] Tạo bảng sessions (id, user_id, expires_at)

Giai đoạn 2: Backend API
- [ ] POST /api/auth/register - đăng ký user
- [ ] POST /api/auth/login - login user
- [ ] POST /api/auth/logout - logout user
- [ ] GET /api/auth/me - lấy user hiện tại

Giai đoạn 3: Tích hợp frontend
- [ ] Tạo page login
- [ ] Tạo page đăng ký
- [ ] Thêm router guard

Giai đoạn 4: Test
- [ ] Viết unit test
- [ ] Viết integration test

Bạn muốn bắt đầu từ giai đoạn nào? Hay cần adjust plan?
```

**Best practice:**

- Với task >30 phút, dùng `/plan` trước
- Plan lập xong, có thể execute từng giai đoạn, mỗi giai đoạn xong check 1 lần
- Nếu nhu cầu thay đổi, chạy lại `/plan` adjust plan

### Kỹ thuật 5: /init sinh config tự động — init project nhanh

`/init` là 1 trong các lệnh mạnh nhất của Claude Code. Nó tự scan project, hiểu tech stack và structure, rồi sinh 1 file config `CLAUDE.md` hoàn chỉnh.

**Cách dùng:**

```
/init
```

**Claude thực hiện các bước:**

1. **Scan structure project**: nhận diện framework, ngôn ngữ, build tool
2. **Phân tích file config**: đọc package.json, tsconfig.json...
3. **Check code style**: hiểu naming convention, cách tổ chức file
4. **Sinh CLAUDE.md**: tạo file config chứa info project

**Ví dụ CLAUDE.md được sinh ra:**

```
# My Project

## Tech stack
- Framework: Next.js 14 (App Router)
- Ngôn ngữ: TypeScript
- Style: Tailwind CSS
- State management: Zustand
- Database: Prisma + PostgreSQL

## Lệnh phổ biến

\`\`\`bash
npm run dev      # Khởi động dev server
npm run build    # Build production
npm run test     # Chạy test
npx prisma migrate dev  # Migrate database
\`\`\`

## Quy chuẩn code
- Dùng function component + Hooks
- Naming file: PascalCase (component), camelCase (util function)
- Quy chuẩn commit: Conventional Commits
```

**Tại sao quan trọng:**

`CLAUDE.md` là "memory project" của Claude Code. Mỗi lần khởi động, Claude tự đọc file này, hiểu background project. Nghĩa là:

- Bạn không cần mỗi lần giải thích project dùng framework nào
- Claude biết quy chuẩn code và best practice của bạn
- Khi team cộng tác, member mới cũng hiểu nhanh project

**Khuyến nghị**: project mới sau init, chạy ngay `/init`, rồi adjust config sinh ra theo thực tế.

### Kỹ thuật 6: /compact nén context — tiết kiệm Token

Cửa sổ context của Claude Code có giới hạn (thường 200K Token). Hội thoại dài tốn nhiều Token, vừa tăng chi phí, vừa có thể đẩy info quan trọng ban đầu ra khỏi context window.

**Cách dùng:**

```
/compact
```

**Nguyên lý hoạt động:**

`/compact` phân tích lịch sử hội thoại hiện tại, extract info chính (như quyết định đã ra, code đã sinh, nhu cầu đã confirm), rồi sinh 1 summary ngắn. Hội thoại sau dựa vào summary này, không phải lịch sử đầy đủ.

**Khi nào dùng:**

- Sau 5-6 vòng hội thoại
- Cảm thấy Claude bắt đầu "quên" content trước
- Muốn chuyển sang sub-task mới, nhưng giữ background chính

**Khuyến nghị dùng:**

```
# Sau hội thoại dài compact
/compact

# Sau compact tiếp tục làm
Giờ ta đã xong module user, tiếp theo làm module đơn hàng
```

### Kỹ thuật 7: dùng Claude Code hỗ trợ commit Git

Trong Claude Code, flow commit được khuyến nghị là: để Claude xem diff, organize commit message trước, rồi bạn execute lệnh Git chuẩn để commit. Vừa rõ, vừa tiện cho bạn confirm lại content thay đổi trước commit.

Tham khảo doc official:

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**Flow khuyến nghị:**

```bash
# 1. Xem thay đổi hiện tại
/diff
!git status

# 2. Để Claude tổng kết thay đổi và sinh commit message
Dựa git diff hiện tại, theo quy chuẩn Conventional Commits sinh 1 commit message,
và giải thích bằng tiếng Việt tại sao phân loại như vậy

# 3. Sau khi bạn confirm, execute commit Git chuẩn
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**Lợi ích cách này:**

1. **Gần năng lực official hiện tại hơn**: không depend các lệnh built-in đã bị remove
2. **Transparent hơn**: bạn check được diff và commit message trước, rồi quyết định có commit không
3. **Universal hơn**: chuyển sang AI IDE khác hoặc env Git thuần, workflow vẫn dùng được

**Nếu muốn giữ trải nghiệm "1 lệnh commit":**

Claude Code giờ khuyến nghị bù lại năng lực này qua plugin. Ví dụ plugin `commit-commands` trong marketplace plugin official cung cấp lệnh kiểu `/commit-commands:commit`.

```bash
# 1. Add marketplace plugin mẫu
/plugin marketplace add anthropics/claude-code

# 2. Cài plugin workflow commit
/plugin install commit-commands@anthropics-claude-code

# 3. Reload plugin
/reload-plugins

# 4. Dùng lệnh plugin commit
/commit-commands:commit
```

**Bổ sung:**

- `/commit-commands:commit` là lệnh plugin cung cấp, không phải lệnh built-in default của Claude Code hiện tại
- Nếu bạn chỉ muốn check thay đổi trước commit, ưu tiên dùng `/diff`, hoặc trực tiếp để Claude đọc `git diff`
- Official cũng đã mark `/review` là deprecated; nếu cần năng lực tương tự, khuyến nghị chuyển sang plugin hoặc workflow review bằng ngôn ngữ tự nhiên

### Kỹ thuật 8: Shift+Tab auto accept — tăng fluent

Default Claude hỏi confirm trước khi sửa code. Lúc học hữu ích, nhưng quen rồi có thể thấy phiền. `Shift+Tab` bật auto-accept mode, workflow mượt hơn.

**Cách dùng:**

- Bấm `Shift+Tab` → vào auto-accept mode
- Bấm lại `Shift+Tab` → thoát auto-accept mode

**So sánh mode:**

| Mode | Hành vi | Phù hợp |
|------|------|----------|
| Mode default | Mỗi lần sửa hỏi confirm | Giai đoạn học, code quan trọng |
| Auto-accept | Áp dụng sửa trực tiếp | Sau khi quen, iterate nhanh |

**⚠️ Lưu ý:**

- Auto-accept mode Claude sẽ sửa file trực tiếp, không confirm lần 2
- Khuyến nghị kết hợp Git để dùng, có vấn đề rollback được
- Với thao tác sensitive (xoá file, sửa config), Claude vẫn hỏi

### Kỹ thuật 9: Ctrl+C cancel thao tác — phanh khẩn cấp

Khi Claude đang chạy 1 task lâu, hoặc bạn nhận ra mình ra lệnh sai, `Ctrl+C` là button "phanh khẩn cấp" của bạn.

**Cách dùng:**

- Bấm 1 lần `Ctrl+C` → cancel thao tác đang execute
- Bấm 2 lần `Ctrl+C` → thoát hoàn toàn Claude Code

**Scenario dùng:**

- Claude đang chạy lệnh tốn thời gian, bạn muốn ngắt
- Claude bắt đầu sinh nhiều code không liên quan
- Bạn nhận ra ra lệnh sai, muốn dừng ngay

**Khác biệt với double-click Esc:**

- `Ctrl+C`: dừng **thao tác** đang chạy (như chạy lệnh, sinh code)
- `Double-click Esc`: rollback **trạng thái hội thoại** (undo lượt hội thoại trước)

### Kỹ thuật 10: /context xem dùng context — optimize Token

`/context` show tình hình dùng context của session hiện tại, giúp bạn hiểu Token consumption, optimize chi phí dùng.

**Cách dùng:**

```
/context
```

**Ví dụ output:**

```
📊 Tình hình dùng context

Dùng Token: 45,230 / 200,000 (22.6%)
Reference file: 12 file
Vòng hội thoại: 8 vòng

File tốn Token nhất:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Đề xuất:
- Tỷ lệ dùng hiện tại OK, chưa cần compact
- Muốn giảm consumption, có thể add node_modules vào .claudeignore
```

**Tận dụng info này thế nào:**

1. **Nhận diện file lớn**: nếu file tốn nhiều Token, xét xem có thực sự cần không
2. **Optimize .claudeignore**: add file không liên quan (node_modules, build output) vào ignore list
3. **Quyết định khi nào compact**: khi tỷ lệ dùng > 70%, xét dùng `/compact`

### Kỹ thuật 11: /resume khôi phục session — chuyển nhiều task hội thoại

Khi xử lý nhiều task, có thể mở nhiều session hội thoại. `/resume` cho phép chuyển nhanh về session trước trong chat hiện tại, không cần thoát rồi khởi động lại.

**Cách dùng:**

```
/resume
```

**Nguyên lý hoạt động:**

Claude Code tự ghi nhớ session hội thoại trước. Khi bạn dùng `/resume`, nó chuyển về context của session trước, giữ tất cả content thảo luận và trạng thái trước.

**Scenario dùng:**

**Scenario A: parallel nhiều task**
```
# Task 1: fix bug
claude> Fix vấn đề validation page login
# ... đã hội thoại 1 đoạn...

# Task 2: thêm function mới (mở session mới)
claude> Thêm function đăng ký user
# ... đã hội thoại đoạn khác...

# Chuyển về task 1
claude> /resume
# Tiếp tục công việc fix bug trước
```

**Scenario B: query tạm thời rồi quay lại**
```
claude> Giải thích thuật toán này
# ... thảo luận thuật toán...

claude> /resume
# Tự động chuyển về công việc dev code trước
```

**Scenario C: ngắt hội thoại rồi tiếp tục**
```
claude> Tiếp tục công việc trước
# Nếu bạn từng ngắt 1 task, dùng /resume quay lại được
```

**So sánh với lệnh liên quan:**

| Lệnh | Tác dụng | Scenario dùng |
|------|------|----------|
| `/resume` | Chuyển về session trước trong chat hiện tại | Parallel nhiều task, cần chuyển qua lại |
| `claude -c` | Tiếp tục session gần nhất | Sau khi thoát connect lại cùng session |
| `claude -r` | Khôi phục session trước | Sau khi thoát khôi phục về trạng thái session trước |
| `Double-click Esc` | Rollback về trạng thái hội thoại trước | Undo lượt hội thoại gần nhất |

**Khuyến nghị dùng:**

1. **Quản lý nhiều task**: khi cần chuyển giữa nhiều task, dùng `/resume` hiệu quả hơn mô tả lại context
2. **Memory session**: mỗi session có context độc lập, `/resume` giúp giữ context này
3. **Kết hợp /compact**: trong session dài, có thể `/compact` nén trước, rồi `/resume` chuyển, giữ context rõ

---

## Config core

Config hợp lý giúp Claude Code thích nghi tốt hơn với project và team của bạn. Phần này giới thiệu tác dụng của file config, priority và cách optimize cho scenario dùng khác nhau.

### Vị trí file config và priority

Claude Code dùng chiến lược config phân tầng, các tầng config có scope và priority khác nhau. Hiểu cơ chế này, bạn quản lý config linh hoạt hơn.

**Priority config (từ cao tới thấp):**

| Vị trí | Scope | Tác dụng | Có commit Git không |
|------|--------|------|--------------|
| `.claude/settings.local.json` | Local project | Sở thích cá nhân | ❌ Không |
| `.claude/settings.json` | Shared project | Config thống nhất của team | ✅ Có |
| `~/.claude/settings.json` | Global | Config default cá nhân | ❌ Không |

**Rule merge config:**

- Config priority cao override config item cùng priority thấp
- Config item không xung đột merge thành effect
- Config project priority hơn config global, config local cá nhân priority hơn config shared

**Scenario thực tế:**

**Scenario 1: project team**
```
~/.claude/settings.json          # Setting editor cá nhân default
.claude/settings.json            # Quy chuẩn code, config permission thống nhất của team
.claude/settings.local.json      # Sở thích debug riêng, setting theme
```

**Scenario 2: project cá nhân**
```
~/.claude/settings.json          # Config default global
.claude/settings.json            # Config đặc thù project (như rule permission đặc biệt)
```

### CLAUDE.md - memory project

`CLAUDE.md` là file config quan trọng nhất của Claude Code, tương đương "manual" của project. Mỗi lần khởi động Claude Code, nó tự đọc `CLAUDE.md` trong thư mục hiện tại, hiểu background project, tech stack và quy chuẩn.

**Tại sao CLAUDE.md quan trọng?**

Tưởng tượng scenario này: bạn vào project mới, cần hiểu tech stack, quy chuẩn code, lệnh phổ biến. Thường bạn phải vài tiếng đọc doc, xem code, hỏi đồng nghiệp. Có `CLAUDE.md`, Claude Code lúc khởi động đã biết hết các info này, bạn có thể bắt đầu cộng tác hiệu quả ngay.

**Template tối thiểu dùng được:**

```
# [Tên project]

## Tech stack
- Framework: React 18 + TypeScript
- State management: Zustand
- Style: Tailwind CSS
- Build tool: Vite

## Lệnh phổ biến

\`\`\`bash
npm run dev      # Khởi động dev server (port 5173)
npm run test     # Chạy unit test
npm run build    # Build production
npm run lint     # Check code
\`\`\`

## Quy chuẩn code
- Component dùng function component + Hooks
- Naming file: PascalCase (component), camelCase (util function)
- Commit Git dùng quy chuẩn Conventional Commits
- Tất cả API call phải qua wrap request thống nhất
```

**Template đầy đủ (khuyến nghị):**

```
# [Tên project]

## Tổng quan project
1 câu mô tả function chính và user mục tiêu của project.

## Tech stack
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- State: Zustand + React Query
- Style: Tailwind CSS + Headless UI
- Build: Vite

### Backend (nếu có)
- Runtime: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: JWT + bcrypt

## Structure project

\`\`\`
src/
├── components/      # Component reusable
├── pages/           # Component page
├── hooks/           # Custom Hook
├── lib/             # Util function
├── types/           # Type TypeScript
└── api/             # API call
\`\`\`

## Lệnh phổ biến

\`\`\`bash
# Dev
npm run dev              # Khởi động dev server
npm run dev:mock         # Dùng Mock data dev

# Test
npm run test             # Chạy tất cả test
npm run test:watch       # Chạy test mode watch
npm run test:coverage    # Sinh report coverage test

# Chất lượng code
npm run lint             # Check ESLint
npm run lint:fix         # Auto fix vấn đề ESLint
npm run format           # Format Prettier
npm run typecheck        # Check type TypeScript

# Build
npm run build            # Build production
npm run preview          # Preview build production
\`\`\`

## Quy chuẩn dev
### Code style
- Dùng function component, tránh class component
- Ưu tiên dùng custom Hook wrap logic
- Props component phải define interface TypeScript

### Workflow Git
- Naming branch: prefix `feature/`, `fix/`, `refactor/`
- Commit message theo Conventional Commits
- PR phải qua CI check và Code Review

### Yêu cầu performance
- Component lazy load, giảm thời gian first paint
- Ảnh dùng format WebP, bật lazy load
- API response time control trong 200ms

## Env var

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Câu hỏi thường gặp

### Dev server khởi động fail?

Check port 5173 có bị chiếm không, hoặc thử `npm run dev -- --port 3000`

### Lỗi type?

Chạy `npm run typecheck` xem chi tiết lỗi
```

**Sinh CLAUDE.md nhanh:**

Nếu bạn đã có 1 project, nhưng chưa có `CLAUDE.md`, chạy lệnh `/init` để Claude tự sinh:

```bash
claude
# Trong Claude Code nhập
/init
```

Claude phân tích structure project, package.json, code hiện có, sinh 1 `CLAUDE.md` phù hợp thực tế. Sau khi sinh, khuyến nghị check tay và adjust theo nhu cầu.

### .claudeignore - tiết kiệm Token

File `.claudeignore` báo Claude Code file nào không nên đọc vào context. Config hợp lý giảm đáng kể Token consumption (thường 40-60%), đồng thời tăng tốc response.

**Tại sao cần .claudeignore?**

Claude Code khi hiểu project, sẽ thử đọc file liên quan. Nhưng 1 số file không giúp hiểu project, ngược lại còn:
- Tốn nhiều Token (như file type definition trong node_modules)
- Tạo nhiễu (như file log, build output)
- Chứa info sensitive (như file .env)

**Config khuyến nghị:**

```
# ===== Thư mục dependency =====
# Các thư mục này chứa nhiều code bên thứ 3, Claude không cần đọc
node_modules/
.pnp/
.pnp.js

# ===== Build output =====
# File được sinh ra, không chứa info source code
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== File log =====
# Log sinh ra lúc runtime, không giúp hiểu project
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== Test-related =====
# Report coverage, dữ liệu coverage
coverage/
.nyc_output/

# ===== Editor/IDE =====
# Config editor và file tạm
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== File system =====
# File system macOS, Windows
.DS_Store
Thumbs.db

# ===== Env var =====
# Chứa info sensitive, không nên đọc
.env
.env.local
.env.*.local

# ===== File resource lớn =====
# Ảnh, video và file binary
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== Lock file (tuỳ chọn) =====
# Nếu bạn không cần Claude phân tích version dependency, có thể ignore
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Mẹo config:**

1. **Bắt đầu từ config tối thiểu**: ignore node_modules và build output trước, quan sát Token consumption
2. **Adjust theo project**: nếu là project nhiều ảnh, add ignore format ảnh; nếu là project doc, giữ file Markdown
3. **Optimize định kỳ**: dùng `/context` xem file nào tốn nhiều Token nhất, xét add vào ignore list

### Config permission

Claude Code default sẽ hỏi confirm trước thao tác sensitive. Qua config `permissions` trong `settings.json`, bạn có thể control tinh chỉnh thao tác nào auto execute, nào cần confirm, nào hoàn toàn cấm.

**Structure config permission:**

```json
{
  "permissions": {
    "allow": [
      // Auto allow, không hỏi
    ],
    "ask": [
      // Hỏi confirm trước execute
    ],
    "deny": [
      // Hoàn toàn cấm
    ]
  }
}
```

**Syntax config:**

Rule permission dùng format `loại thao tác(pattern match)`:

| Loại thao tác | Mô tả | Ví dụ |
|----------|------|------|
| `Bash` | Execute lệnh terminal | `Bash(git status)` |
| `Edit` | Edit file | `Edit(src/**/*.ts)` |
| `Read` | Đọc file | `Read(README.md)` |
| `Write` | Tạo file mới | `Write(src/components/*.tsx)` |

**Pattern match hỗ trợ wildcard:**

- `*` match ký tự bất kỳ (không gồm `/`)
- `**` match path bất kỳ
- `?` match 1 ký tự

**Ví dụ config thực tế:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**Khuyến nghị config:**

1. **Giai đoạn dev**: set permission khá lỏng, tăng tốc iteration
2. **Production env**: siết permission, đặc biệt thao tác liên quan deploy, data sensitive
3. **Cộng tác team**: permission cơ bản đặt ở `settings.json` (shared), adjust riêng đặt ở `settings.local.json`

### Thư mục Rules

Với project lớn, 1 `CLAUDE.md` đơn có thể trở nên cồng kềnh khó bảo trì. Claude Code hỗ trợ dùng **thư mục Rules** để quản lý modular, tách các quy chuẩn khác nhau thành file độc lập.

**Structure thư mục:**

```
.claude/
├── settings.json          # File config chính
├── CLAUDE.md              # Tổng quan project (vẫn cần)
└── rules/                 # Thư mục rule
    ├── 00-security.md     # Rule bảo mật (global)
    ├── 01-coding-style.md # Code style (global)
    ├── 10-api.md          # Quy chuẩn dev API
    ├── 11-frontend.md     # Quy chuẩn dev frontend
    ├── 12-backend.md      # Quy chuẩn dev backend
    └── 20-testing.md      # Quy chuẩn test
```

**Khuyến nghị naming file:**

Dùng prefix số control thứ tự load (như `00-`, `01-`), đảm bảo rule cơ sở load trước, rule đặc thù load sau.

**Format file rule:**

File rule hỗ trợ YAML frontmatter, control scope áp dụng của rule:

```markdown
---
# Tuỳ chọn: chỉ định path file áp dụng rule
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Tuỳ chọn: chỉ định lệnh áp dụng rule
commands:
  - "generate api"
  - "create endpoint"

# Tuỳ chọn: priority rule (số càng nhỏ priority càng cao)
priority: 10
---

# Quy chuẩn dev API

## Design routing
- Style RESTful, dùng danh từ số nhiều
- Version control: /api/v1/users
- Resource nested: /api/v1/users/123/orders

## Format request/response
- Thống nhất dùng JSON
- Response error phải có code và message
- Response paginate dùng structure { data, pagination }

## Yêu cầu bảo mật
- Mọi endpoint phải verify auth (trừ endpoint public)
- Thao tác sensitive cần confirm lần 2
- Implement rate limit chống abuse
```

**Inherit và override rule:**

- Rule global (không có frontmatter hoặc `globs: *`) áp dụng cho mọi file
- Rule path đặc thù chỉ áp dụng cho file match
- Khi nhiều rule conflict, rule priority cao có effect
- Rule đặc thù có thể override rule global

**Ví dụ scenario dùng:**

**Scenario 1: project tách frontend-backend**
```
.claude/rules/
├── 00-general.md          # Quy chuẩn tổng (commit message, naming convention)
├── 10-backend.md          # Quy chuẩn backend (NestJS đặc thù)
├── 11-frontend.md         # Quy chuẩn frontend (React đặc thù)
└── 20-database.md         # Quy chuẩn database (Prisma đặc thù)
```

**Scenario 2: kiến trúc microservice**
```
.claude/rules/
├── 00-global/             # Rule global
│   ├── security.md
│   └── logging.md
├── 10-services/           # Rule service đặc thù
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # Rule component shared
    ├── shared-lib.md
    └── common-utils.md
```

**Khuyến nghị migrate:**

Nếu bạn đã có 1 `CLAUDE.md` cồng kềnh, có thể migrate sang thư mục Rules theo các bước:

1. Tạo thư mục `.claude/rules/`
2. Tách content `CLAUDE.md` theo chủ đề
3. Add frontmatter phù hợp cho mỗi file rule
4. Giữ `CLAUDE.md` làm tổng quan project, remove quy chuẩn chi tiết
5. Test đảm bảo rule load đúng

---

## Lệnh thao tác core

Claude Code cung cấp 1 bộ lệnh thao tác phong phú, cho bạn cộng tác hiệu quả với AI. Các lệnh này chia mấy nhóm: Slash command (function built-in), hệ symbol (thao tác shortcut), và lệnh ngôn ngữ tự nhiên (dev hàng ngày).

### Bảng tra Slash command

Slash command là function built-in của Claude Code, bắt đầu bằng `/`. Cung cấp thao tác standardized như init project, quản lý config, xem state...

| Lệnh | Function | Scenario dùng |
|------|------|----------|
| `/help` | Hiện tất cả lệnh | Quên lệnh thì xem nhanh |
| `/init` | Init project, sinh CLAUDE.md | Project mới hoặc thêm config |
| `/plan` | Vào plan mode | Trước task phức tạp lập plan trước |
| `/clear` | Xoá lịch sử hội thoại | Context lộn xộn thì bắt đầu lại |
| `/compact` | Nén context | Sau hội thoại dài tiết kiệm Token |
| `/diff` | Mở interactive diff view | Xem thay đổi chưa commit |
| `/plugin` | Quản lý plugin | Cài plugin commit, review... |
| `/context` | Xem dùng context | Optimize Token consumption |
| `/cost` | Xem chi phí session này | Quan tâm chi phí dùng |
| `/config` | Mở panel config | Sửa setting |
| `/permissions` | Quản lý permission | Adjust permission thao tác |
| `/model` | Chuyển model AI | Chọn model khác |

**Ví dụ combo lệnh:**

```bash
# Workflow dev đầy đủ
/plan                    # 1. Lập plan
# ... execute dev ...
/diff                    # 2. Xem thay đổi
Hãy dựa diff hiện tại sinh commit message
!git add -A              # 3. Stage thay đổi
!git commit -m "..."     # 4. Commit code
/cost                    # 5. Xem chi phí
```

### Hệ symbol

Hệ symbol là cách thao tác shortcut của Claude Code, qua symbol đặc biệt trigger nhanh function cụ thể.

| Symbol | Tên | Tác dụng | Ví dụ |
|------|------|------|------|
| `/` | Slash command | Execute thao tác built-in | `/help`, `/plan` |
| `@` | At reference | Reference file/thư mục | `@src/app.tsx` |
| `!` | Bang mode | Execute lệnh terminal | `!npm test` |
| `&` | Chạy background | Execute task background | `&npm run dev` |

**Mẹo combo symbol:**

```bash
# Combo dùng nhiều symbol
@src/utils.ts !npm test
# Giải thích: đọc utils.ts, rồi chạy test

@src/components/ @src/pages/ So sánh structure 2 thư mục này
# Giải thích: reference 2 thư mục cùng lúc để so sánh

!git diff @src/app.tsx Giải thích các thay đổi này
# Giải thích: xem diff Git, rồi để Claude giải thích thay đổi của file cụ thể
```

### Thao tác file

Thao tác file là function dùng nhiều nhất trong dev hàng ngày. Claude Code hỗ trợ đọc, edit, tạo, xoá và mọi thao tác file.

**Đọc file:**

```bash
# Đọc cơ bản
@src/app.tsx Giải thích file này

# Đọc và phân tích
@src/utils/helpers.ts Tìm vấn đề performance tiềm ẩn

# Đọc so sánh
@src/components/OldButton.tsx @src/components/NewButton.tsx So sánh khác biệt 2 component này
```

**Edit file:**

```bash
# Edit đơn giản
Sửa function formatDate trong src/utils/date.ts hỗ trợ format tiếng Việt

# Edit phức tạp
@src/api/users.ts Refactor file này:
1. Extract logic xử lý lỗi lặp thành function handleError thống nhất
2. Dùng async/await thay chuỗi Promise
3. Thêm comment JSDoc

# Edit batch
Chuyển tất cả class component trong src/components/ thành function component
```

**Tạo file:**

```bash
# Tạo 1 file
Tạo src/components/UserCard.tsx, implement 1 component card hiện info user

# Tạo nhiều file liên quan
Tạo module user:
1. src/types/user.ts - define interface User
2. src/api/users.ts - API call liên quan user
3. src/components/UserCard.tsx - component card user
4. src/hooks/useUser.ts - Hook lấy data user
```

**Xoá file:**

```bash
# Confirm trước xoá
Xoá src/old-component.tsx (component này không còn dùng)

# Claude sẽ hỏi confirm, và có thể đề xuất check xem có file khác reference không
```

### Thao tác Git

Claude Code tích hợp sâu Git, cho bạn không cần rời terminal vẫn hoàn thành workflow version control đầy đủ.

**Xem state:**

```bash
# Xem state Git
Hiện state Git và thay đổi chưa commit

# Xem thay đổi chi tiết
!git diff
Giải thích content thay đổi của src/api/users.ts
```

**Tạo commit:**

```bash
# Xem thay đổi
/diff

# Để Claude sinh commit message
Dựa git diff hiện tại sinh 1 Conventional Commit message

# Commit tay
!git add -A
!git commit -m "..."
```

**Thao tác branch:**

```bash
# Tạo feature branch
!git checkout -b feature/user-authentication

# Sau dev xong
Dựa thay đổi hiện tại sinh commit message
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Ví dụ workflow Git đầy đủ:**

```bash
# 1. Bắt đầu feature mới
!git checkout -b feature/payment-integration

# 2. Dev feature (Claude hỗ trợ code)
Tạo module payment, gồm Momo và VNPay

# 3. Chạy test
!npm test

# 4. Xem thay đổi
/diff

# 5. Sinh và confirm commit message
Dựa git diff hiện tại sinh 1 Conventional Commit message
!git add -A
!git commit -m "..."

# 6. Push lên remote
!git push -u origin feature/payment-integration

# 7. Tạo PR (tuỳ chọn, kèm GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Hỗ trợ Momo và VNPay"
```

### Thao tác code

Thao tác code là năng lực core của Claude Code, gồm sinh, giải thích, refactor, optimize...

**Sinh code:**

```bash
# Sinh component
Tạo 1 React Hook quản lý trạng thái auth user, gồm login, logout, check permission

# Sinh util function
Tạo 1 util function format ngày, hỗ trợ thời gian tương đối (như "2 tiếng trước")

# Sinh module đầy đủ
Tạo module đơn hàng, gồm:
- Page list đơn hàng
- Page chi tiết đơn hàng
- API tạo đơn hàng
- Quản lý trạng thái đơn hàng
```

**Giải thích code:**

```bash
# Giải thích từng dòng
Giải thích từng dòng src/algorithms/quicksort.ts

# Giải thích high-level
@src/services/payment.ts Giải thích design architecture module này

# Giải thích logic phức tạp
Giải thích thao tác reduce trong src/utils/dataTransformer.ts đang làm gì
```

**Refactor code:**

```bash
# Refactor architecture
Chuyển class component trong src/components/ thành function component

# Refactor performance
Optimize performance render của src/App.tsx, giảm re-render không cần thiết

# Clean code
@src/utils/helpers.ts Refactor file này:
1. Xoá function không dùng
2. Extract logic lặp thành function chung
3. Thêm type definition
4. Optimize naming function
```

**Debug code:**

```bash
# Phân tích lỗi
Chạy npm test fail, phân tích nguyên nhân và fix

# Phân tích performance
@src/components/DataTable.tsx Component này render rất chậm, tìm bottleneck performance

# Phân tích log
!cat logs/error.log
Phân tích các log error này, tìm root cause
```

### Thao tác test

Test là cách quan trọng đảm bảo chất lượng code. Claude Code có thể hỗ trợ bạn sinh test, chạy test, phân tích kết quả test.

**Sinh test:**

```bash
# Sinh unit test
Sinh unit test cho src/utils/math.ts, cover mọi edge case

# Sinh component test
Sinh React Testing Library test cho src/components/UserForm.tsx

# Sinh integration test
Tạo integration test cho flow đăng ký user, cover từ submit form tới write database
```

**Chạy và debug test:**

```bash
# Chạy test
!npm test

# Debug test fail
Phân tích nguyên nhân test fail và fix
@tests/auth.test.ts

# Xem coverage test
!npm run test:coverage
Code nào chưa được test cover?
```

**Khuyến nghị chiến lược test:**

```bash
# Thêm test cho feature mới
Tôi đã thêm function xác thực user, hãy:
1. Sinh unit test cho auth.service.ts
2. Sinh component test cho LoginForm
3. Chạy tất cả test đảm bảo pass
```

### Combo lệnh và thao tác chain

Cách dùng Claude Code hiệu quả là combo nhiều lệnh, tạo workflow đầy đủ.

**Scenario 1: workflow fix bug**

```bash
# 1. Xem vấn đề
!npm test
Test báo lỗi, phân tích chút

# 2. Định vị vấn đề
@src/utils/validation.ts Vấn đề có ở file này không?

# 3. Fix vấn đề
Fix function isEmail trong validation.ts, để xử lý đúng email có dấu +

# 4. Verify fix
!npm test

# 5. Commit fix
Dựa diff hiện tại sinh commit message kiểu fix
!git add -A
!git commit -m "fix: ..."
```

**Scenario 2: workflow review code**

```bash
# 1. Xem thay đổi
!git diff --stat
File nào đã được sửa?

# 2. Review chi tiết
@src/components/ Review thay đổi của các component này

# 3. Đưa đề xuất cải tiến
Dựa kết quả review, có những điểm nào có thể cải tiến?

# 4. Implement cải tiến
Optimize performance component UserList

# 5. Review cuối
/diff
Hãy review thay đổi hiện tại, chỉ ra risk tiềm ẩn và điểm cải tiến
```

**Scenario 3: workflow dev feature mới**

```bash
# 1. Lập plan
/plan
Tôi muốn thêm function shopping cart

# 2. Tạo branch
!git checkout -b feature/shopping-cart

# 3. Dev feature
Theo plan implement từng bước

# 4. Thêm test
Sinh test cho module shopping cart

# 5. Chạy test
!npm test

# 6. Review code
/diff
Hãy dựa diff hiện tại làm 1 lần review code

# 7. Commit code
Sinh commit message cho lần dev feature này
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Câu hỏi thường gặp

Trong quá trình dùng Claude Code, bạn có thể gặp nhiều vấn đề. Phần này tổng hợp các vấn đề phổ biến nhất và giải pháp.

### Tiêu thụ Token quá nhanh?

Tiêu thụ Token quá nhanh là vấn đề phổ biến nhất khi dùng Claude Code. Dưới đây là chiến lược optimize dùng Token đầy đủ.

**Chẩn đoán vấn đề:**

Đầu tiên dùng lệnh `/context` xem tình hình dùng Token hiện tại:
```
/context
```

Quan tâm các chỉ số:
- **Tỷ lệ dùng Token**: nếu >70%, cần xét nén context
- **Số lượng reference file**: file reference càng nhiều, Token tốn càng nhiều
- **File lớn**: xem file nào tốn nhiều Token nhất

**Chiến lược optimize:**

**1. Hoàn thiện config .claudeignore**

Đảm bảo file `.claudeignore` của bạn gồm tất cả file không cần:
```
# Phải ignore
node_modules/
dist/
build/
*.log
.env

# Thêm theo loại project
# Project React
.next/
out/

# Project Vue
.nuxt/
.output/

# Chung
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Nén context định kỳ**

Hội thoại dài tích luỹ nhiều Token. Khuyến nghị mỗi 5-6 vòng hội thoại dùng `/compact`:
```
# Sau hội thoại dài
/compact

# Tiếp tục công việc
Giờ ta implement module đơn hàng...
```

**3. Reference file chính xác**

Đừng reference cả thư mục, mà reference file cụ thể cần:
```bash
# Không khuyến nghị (sẽ đọc cả thư mục)
@src/ Giải thích các code này

# Khuyến nghị (chỉ đọc file cần)
@src/utils/auth.ts @src/components/Login.tsx Giải thích flow login
```

**4. Tránh đọc file lớn**

Nếu `/context` hiện 1 file chiếm nhiều Token, xét:
- Có thực sự cần file này không?
- Có thể chỉ reference 1 phần code không?
- Có thể tách file lớn thành module nhỏ không?

### Claude không hiểu project?

Khi câu trả lời của Claude không đủ chính xác, hoặc thường xuyên hỏi info cơ bản của project, nghĩa là nó thiếu background knowledge project.

**Giải pháp:**

**1. Sinh CLAUDE.md**

Chạy `/init` để Claude tự sinh file config project:
```bash
/init
```

Sau sinh, check và hoàn thiện:
- Tổng quan project có chính xác không?
- Tech stack có đầy đủ không?
- Lệnh phổ biến có đúng không?
- Quy chuẩn code có rõ không?

**2. Edit tay CLAUDE.md**

Nếu config auto-generate chưa đủ chi tiết, thêm tay:
```markdown
## Info đặc thù project

### Quyết định kiến trúc
- Vì sao chọn X thay vì Y?
- Design pattern core là gì?

### Bẫy phổ biến
- Khi dùng useEffect chú ý...
- Query database phải...

### Tích hợp bên thứ 3
- Payment dùng Stripe
- Email dùng SendGrid
- File storage dùng AWS S3
```

**3. Dùng thư mục Rules**

Project lớn có thể dùng thư mục Rules tổ chức quy chuẩn:
```
.claude/rules/
├── 00-architecture.md    # Tổng quan kiến trúc
├── 01-coding-style.md    # Code style
├── 10-frontend.md        # Quy chuẩn frontend
├── 11-backend.md         # Quy chuẩn backend
└── 20-testing.md         # Quy chuẩn test
```

**4. Bổ sung context tức thời**

Với task cụ thể, có thể bổ sung background trong lệnh:
```
Ta dùng custom Hook useAuth xử lý auth,
nó return { user, login, logout, isLoading }.
Hãy dựa Hook này implement component user menu.
```

### Cách rollback thao tác?

Claude Code cung cấp nhiều cơ chế rollback, phù hợp scenario khác nhau.

**Scenario 1: rollback trạng thái hội thoại**

Nếu chỉ nói sai, hoặc không hài lòng câu trả lời của Claude:
```
Double-click Esc  →  rollback về lượt hội thoại trước
Triple-click Esc  →  xoá tất cả lịch sử hội thoại
```

**⚠️ Lưu ý**: chỉ rollback trạng thái hội thoại, không undo sửa file.

**Scenario 2: undo sửa file**

Nếu Claude đã sửa file, bạn phải undo tay:

```bash
# Xem thay đổi
!git status
!git diff

# Undo file cụ thể
git checkout -- src/utils/helpers.ts

# Undo tất cả thay đổi
git checkout -- .

# Nếu đã commit
# Soft reset (giữ thay đổi)
git reset --soft HEAD~1

# Hard reset (bỏ thay đổi)
git reset --hard HEAD~1
```

**Scenario 3: dùng workflow Git phòng tránh**

Best practice là commit công việc hiện tại trước khi dùng Claude Code:
```bash
# Save state hiện tại trước
git add .
git commit -m "WIP: before Claude Code session"
# Hoặc dùng git stash
git stash push -m "before claude"

# Dùng Claude Code dev...

# Nếu kết quả không hài lòng, rollback hoàn toàn
git reset --hard HEAD~1
# Hoặc
git stash pop
```

### Quá nhiều prompt permission?

Confirm permission liên tục ảnh hưởng hiệu suất dev. Qua config permission hợp lý, workflow mượt hơn.

**Hiểu hệ permission:**

Permission Claude Code chia 3 mức:
- **allow**: auto allow, không hỏi
- **ask**: hỏi confirm trước execute
- **deny**: hoàn toàn cấm

**Optimize config:**

Edit `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // Thao tác Git read-only
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",
      
      // Test và check
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",
      
      // Dev server
      "Bash(npm run dev:*)",
      
      // Edit source code
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Thao tác Git write
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      
      // Quản lý package
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",
      
      // Build và deploy
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",
      
      // Sửa file config
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      
      // Đọc file sensitive
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // Lệnh nguy hiểm
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      
      // File system
      "Edit(/etc/*)",
      "Write(/usr/*)",
      
      // Thư mục Git
      "Edit(.git/*)"
    ]
  }
}
```

**Chiến lược permission tăng dần:**

- **Giai đoạn học**: giữ setting default, hiểu Claude execute thao tác nào
- **Giai đoạn quen**: add thao tác an toàn phổ biến (git status, npm test) vào allow
- **Giai đoạn hiệu suất**: dựa đặc điểm project, config rule permission tinh hơn

### Dùng ở Việt Nam thế nào?

Anthropic chính thức **đã mở thị trường VN** từ 2024. Bạn có thể truy cập trực tiếp claude.com và dùng Claude Code không cần proxy. Tuy nhiên nếu gặp khó khăn (thanh toán, network), dưới đây là 1 số giải pháp.

**Phương án 1: dùng service API proxy**

Nhiều cloud provider cung cấp service proxy tương thích Anthropic API:

```bash
# Set env var
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# Khởi động Claude Code
claude
```

**Phương án 2: dùng tool tương thích Claude Code bên thứ 3**

1 số provider cung cấp tool tương thích Claude Code:

```bash
# Cài bản tương thích
npm install -g @some-provider/claude-code

# Config API key
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**Phương án 3: dùng tool coding AI khác**

Nếu Claude Code không dùng được, xét các phương án thay thế:

| Tool | Đặc điểm | Phù hợp |
|------|------|----------|
| Cursor | Dựa VS Code, function đầy đủ | Cần trải nghiệm IDE đầy đủ |
| GitHub Copilot | Năng lực autocomplete code mạnh | Chủ yếu cần autocomplete |
| Trae | ByteDance, ổn định ở Asia | Env dev nội địa |
| Codeium / Windsurf | Free tier rộng | Budget hạn chế |

**Phương án 4: để AI Agent giúp config**

Nếu bạn không chắc cách config, có thể để AI Agent hỗ trợ:

```
Tôi muốn dùng Claude Code, nhưng không truy cập trực tiếp được.
Tôi đã mua API của provider XXX,
URL API là https://api.xxx.com,
key là sk-xxx.

Giúp tôi config env var, đảm bảo Claude Code dùng được bình thường.
```

**Câu hỏi thường gặp:**

- **Q: Config xong vẫn không connect được?**
  - A: Check URL API đúng không, confirm có gồm path `/v1` không
  - A: Check API key có hợp lệ không, đã nạp tiền chưa
  - A: Check network local có cần proxy không

- **Q: Tốc độ response rất chậm?**
  - A: Chọn provider địa lý gần hơn
  - A: Dùng Coding Plan thay vì API thông thường
  - A: Xét dùng `/compact` giảm Token consumption

- **Q: 1 số function không dùng được?**
  - A: 1 số service bên thứ 3 có thể không hoàn toàn tương thích mọi function Claude Code
  - A: Check doc của provider, hiểu phạm vi function hỗ trợ

---

## Tài liệu tham khảo

- [Claude Code official doc](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)

---

# Phụ lục: Claude Code 2026 deep-dive

Phụ lục này cập nhật toàn bộ feature lớn của Claude Code đã ra trong 2025-2026, kèm best practice từ kinh nghiệm production.

## A. Model line-up tháng 5/2026

Anthropic giờ có 4 model dùng trong Claude Code, chuyển bằng `/model`:

| Model | Strength | Khi nào dùng | Pricing |
|---|---|---|---|
| **Claude Opus 4.7** | Reasoning sâu nhất, agentic mạnh | Architecture decision, debug task khó, multi-step planning | $15/M input, $75/M output |
| **Claude Sonnet 5** | **82.1% SWE-bench Verified** (vượt Opus 4.6 ở coding) | Default cho mọi task coding | $3/M input, $15/M output |
| **Claude Sonnet 4.6** | Balance speed/quality, dài context | Code review, refactor, general dev | $3/M input, $15/M output |
| **Claude Haiku 4.5** | Nhanh nhất, rẻ nhất | Task lặp lại, format check, lint fix | $0.80/M input, $4/M output |

**Best practice 2026**: dùng **Sonnet 5** cho 80% task, **Opus 4.7** cho task lập plan + architecture, **Haiku 4.5** cho task lặp như rename variable, format, simple bug fix. Tiết kiệm 60-80% chi phí so với chỉ dùng Opus.

## B. Plan Mode — research mà không edit

Tính năng Plan Mode (bấm `Shift+Tab` 2 lần) cho Claude vào mode chỉ research, không edit file. Cực hữu ích cho:

- **Task lớn không quen**: explore codebase trước khi sửa
- **Phỏng vấn architecture**: hỏi Claude phân tích trade-off design
- **Onboarding project mới**: hiểu structure trước khi action
- **Security audit**: scan code mà không vô tình modify

```bash
# Vào Plan Mode
[Shift+Tab x2]

# Plan-mode prompt
Phân tích auth module — flow login, session storage, token rotation.
Liệt kê các vulnerability potential. Đừng sửa file.

# Sau khi research xong, exit và start implementation
[Shift+Tab x2]  # exit plan mode
Implement các fix theo thứ tự priority bạn list ra
```

## C. Checkpoint mode — save & rollback

Từ 2025, Claude Code có checkpoint system như game save:

- **Auto-checkpoint**: trước mỗi tool call lớn (Edit/Write/Bash), Claude tự save state
- **Manual checkpoint**: `Ctrl+S` để save state hiện tại
- **Rollback**: `/rewind` hoặc bấm `Esc` 3 lần với context menu

Khác `git reset`: checkpoint không cần commit, không thay đổi git history. Hoàn hảo cho:
- Thử 3 approach refactor khác nhau → rollback về checkpoint nếu không OK
- AI "đi sai hướng" giữa task lớn → rollback về điểm rẽ
- Test scenario nguy hiểm (database migration, deploy script)

## D. Hooks — automation khi event xảy ra

`.claude/hooks.json` cho phép chạy script khi Claude trigger event:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $CLAUDE_TOOL_RESULT_FILE_PATH"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '[Claude run]:' $CLAUDE_TOOL_INPUT >> .claude/audit.log"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm test -- --silent && say 'Claude xong rồi'"
          }
        ]
      }
    ]
  }
}
```

**Use case phổ biến**:
- `PostToolUse` (Edit/Write): auto format với Prettier/Black, run linter
- `PreToolUse` (Bash): audit log, block lệnh nguy hiểm
- `Stop`: chạy test khi Claude dừng, notify (email/Slack) khi xong task lớn
- `UserPromptSubmit`: inject context tự động (thêm `CLAUDE.md` cập nhật, thông tin user)

## E. Skills — reusable agent capability

`~/.claude/skills/` chứa skill có thể dùng ở mọi project. Mỗi skill là 1 thư mục:

```
~/.claude/skills/
├── code-reviewer/
│   ├── SKILL.md           # System prompt + activation triggers
│   ├── scripts/
│   │   └── check-pr.sh
│   └── docs/
│       └── checklist.md
├── docker-debugger/
│   └── SKILL.md
└── seo-optimizer/
    └── SKILL.md
```

**SKILL.md format**:

```markdown
---
name: code-reviewer
description: Review code changes for quality, security, and brand alignment
triggers:
  - "review my changes"
  - "audit this PR"
  - "code review"
---

# Code Reviewer Skill

Khi được activate, làm theo flow:

1. Run `git diff` để lấy thay đổi
2. Check security issues (XSS, SQL injection, secrets in code)
3. Check style theo CLAUDE.md của project
4. Đề xuất concrete fix với line number
5. Generate PR review comment dạng GitHub flavored

Dùng `scripts/check-pr.sh` để chạy automated checks.
```

Claude sẽ auto-activate skill khi user nói "review my changes" — bất kể đang ở project nào. Khác CLAUDE.md (chỉ scope project), Skill scope user.

## F. Subagents — multi-agent native

Trong session Claude Code, dùng tool `Task` để spawn subagent. Mỗi subagent có:
- Model riêng (có thể khác parent)
- System prompt riêng
- Tool list riêng (có thể restrict)
- Context window riêng (không share với parent — giảm token!)

**Pattern phổ biến**:

```
Tôi cần migrate codebase từ JavaScript sang TypeScript.

[Claude spawn 3 parallel subagent]
- Agent 1 (Haiku): convert /src/utils/* (50 file đơn giản)
- Agent 2 (Sonnet): convert /src/components/* (cần hiểu props)
- Agent 3 (Sonnet): convert /src/api/* (cần type external response)

[Main Claude]: chờ 3 agent xong, run typecheck, fix conflict
```

**Khi nào dùng subagent**:
- Task có **>3 file độc lập** xử lý song song được
- Cần **research nhiều topic** (mỗi agent research 1 topic)
- Muốn **isolate context** (subagent fail không pollute main context)
- Cần **specialist** (code-reviewer agent, security-audit agent...)

## G. Managed Agents API — production multi-agent

Mới ra 2026, qua Claude Managed Agents API:

- **Dreaming**: schedule background process review session cũ, tự learn pattern, curate memory. Agent improve giữa các run.
- **Multi-agent orchestration**: lead agent delegate cho specialist subagent parallel trên shared filesystem. Mỗi agent có model + prompt + tool riêng.
- **Webhooks**: notify khi agent xong task, hoặc trigger agent từ event external (PR open, deploy fail, alarm fire).
- **Outcomes**: track success metric của agent (test pass rate, PR merge rate, customer satisfaction).

Đây là bước tiếp theo sau Claude Code single-session — chạy agent **24/7 trong production** với memory persistent.

## H. Best practice cho VN dev 2026

1. **Cost optimization**:
   - Subscribe Claude Pro ($20/tháng) — bao gồm 5x usage so với free
   - Dùng Claude Max ($100/tháng) nếu code 4+ giờ/ngày — unlimited Sonnet, generous Opus
   - Alternative: trả API pay-as-you-go nếu dùng dưới 10h/tháng
   
2. **Workflow recommended**:
   - **Cursor trong IDE + Claude Code trong terminal** = combo phổ biến nhất 2026
   - Cursor cho autocomplete + chat ngắn
   - Claude Code cho task lớn (refactor, migration, debugging multi-file)
   
3. **CLAUDE.md cho tiếng Việt**:
   - Viết CLAUDE.md tiếng Việt nếu team VN — Claude hiểu fluent
   - Glossary tiếng Việt cho thuật ngữ riêng (như "vùng giao", "đặt cọc", "ship COD")
   - Naming convention bằng tiếng Việt OK nhưng code identifier vẫn nên tiếng Anh
   
4. **MCP servers cho dev VN**:
   - **GitHub MCP**: required cho mọi project
   - **Filesystem MCP**: cho project lớn (>100 file)
   - **Postgres/MySQL MCP**: nếu dùng DB native
   - **Custom MCP**: wrap API VN ecosystem (Sapo, KiotViet, GHTK, VNPay) — đây là cơ hội contribution!
   
5. **Security cho team VN**:
   - Add `.env*`, `secrets/*` vào `.claudeignore` **ngay từ đầu**
   - Dùng `permissions.deny` cho `Bash(curl * | sh)` và `Bash(rm -rf:*)`
   - Audit log qua hook `PreToolUse(Bash)` → log mọi lệnh shell
   - Review CLAUDE.md trước khi commit — đừng leak API key trong example

::: warning Lưu ý quan trọng
- **CLAUDE.md commit vào Git** — nên team review trước khi merge
- **`.claude/settings.local.json`** không commit (đã trong `.gitignore` default)
- **API key** đừng bao giờ hardcode trong CLAUDE.md hay code — luôn dùng env var
- **Update Claude Code thường xuyên** (`npm update -g @anthropic-ai/claude-code`) — feature mới ra hàng tuần
:::
