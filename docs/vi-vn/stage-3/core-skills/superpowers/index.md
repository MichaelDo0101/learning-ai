# Claude Code Superpowers: phát triển level engineering

## Giới thiệu Superpowers

**Superpowers** là agent skill framework open-source phát triển bởi Jesse Vincent (nickname obra), chuyên giải quyết vấn đề core trong coding AI: làm sao để AI viết ra code "level engineering" thay vì "level đồ chơi".

Hãy tưởng tượng: trợ lý coding AI thông thường giống 1 "intern thông minh" — viết được code chạy được, nhưng có thể không có test, không có doc, không theo best practice. Còn Superpowers giống như trang bị cho intern đó 1 "senior engineer mentor", buộc nó tuân thủ flow phát triển software đầy đủ.

### Tại sao cần Superpowers?

Khi chưa có Superpowers, dùng Claude Code có 1 số vấn đề:

- **Lộn xộn của Vibe Coding**: AI lao vào viết code, không lập plan, gây rework liên tục
- **Thiếu kỷ luật TDD**: AI quen viết code trước rồi bổ sung test sau, hoặc thậm chí không viết test
- **Nhu cầu mơ hồ mà vẫn làm**: user nói "làm 1 function login", AI bắt đầu viết, kết quả ra không phải cái muốn
- **Chất lượng code không ổn định**: không có cơ chế code review, chất lượng phụ thuộc vào "tâm trạng" AI

Superpowers giải các vấn đề này, biến Claude thành 1 "team dev có kỷ luật" — làm rõ nhu cầu trước, rồi lập plan, sau đó dev theo TDD, cuối cùng qua code review đảm bảo chất lượng.

---

## Bắt đầu nhanh

### Bước 1: cài Superpowers

Trong Claude Code chạy:

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Cài superpowers
/plugin install superpowers@superpowers-marketplace
```

Hoặc clone tay:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Bước 2: trải nghiệm Skill đầu tiên

Hãy dùng skill **brainstorming** (brainstorm nhu cầu) của Superpowers để trải nghiệm giá trị.

Trong Claude Code nhập:

```
Làm cho tôi 1 function login user
```

**Chưa có Superpowers**: Claude lao vào viết code, có thể ra cái không phải bạn muốn.

**Có Superpowers**: Claude qua hỏi kiểu Socratic giúp bạn làm rõ nhu cầu:

> Function login này design cho Web app hay mobile app?
>
> Cần support những cách login nào? Email-password? Bên thứ 3 (Google, GitHub)?
>
> Có cần function "remember me" không?
>
> Reset password qua email hay SMS?
>
> ...

Các câu hỏi này buộc bạn nghĩ kỹ trước khi code thực sự cần gì, tránh viết 1 đống code không dùng tới.

### Bước 3: hiểu cơ chế trigger skill

Superpowers không phải "công tắc ma thuật", mà là 1 **bộ skills**. Hiểu cách skill trigger rất quan trọng.

**3 cách skill được trigger**:

1. **Trigger keyword**
   - Khi bạn nhắc "TDD", "test-driven development", "viết test trước"
   - Skill `test-driven-development` được kích hoạt

2. **Trigger scenario**
   - Khi nhu cầu mơ hồ, skill `brainstorming` chủ động hỏi
   - Khi xuất hiện bug, skill `systematic-debugging` được kích hoạt

3. **Call tay**
   - Dùng trực tiếp tên skill: `/test-driven-development`

#### 💡 Hiểu quan trọng: không chỉ định TDD thì sao?

Đây là hiểu lầm phổ biến, làm rõ:

```
# Trường hợp A: không nhắc TDD
"Implement 1 calculator"
→ Claude có thể viết test, có thể không
→ Phụ thuộc thói quen train của model

# Trường hợp B: nhắc TDD
"Dùng TDD implement 1 calculator"
→ Skill test-driven-development được kích hoạt
→ Bắt buộc theo flow RED-GREEN-REFACTOR
```

**Giá trị thực của Superpowers**: không phải "tạo từ không khí", mà là "tăng kỷ luật".

- Không có TDD skill: Claude viết test "theo tâm trạng"
- Có TDD skill: Claude bị buộc theo flow TDD

### Hiểu giá trị Superpowers

Qua giải thích trên, bạn thấy giá trị core của Superpowers:

1. **Ưu tiên nhu cầu**: skill `brainstorming` chủ động hỏi khi nhu cầu mơ hồ
2. **Kỷ luật flow**: `test-driven-development` bắt buộc TDD red-green-refactor cycle
3. **Tách task**: `writing-plans` tách project lớn thành task nhỏ
4. **Control chất lượng**: skill `code-review` đảm bảo chất lượng code

---

## Chi tiết Skill core của Superpowers

Superpowers gồm **20+ skill có thể combine**, cover toàn bộ life cycle phát triển software. Cùng tìm hiểu theo nhóm.

### 🧪 Skill nhóm Test

#### test-driven-development (TDD)

**Cách trigger**: nhắc keyword "TDD", "test-driven development", "viết test trước"...

**Skill này làm gì**: buộc Claude theo TDD red-green-refactor cycle, không phải "nhớ thì viết test".

**Cách dev truyền thống** (vấn đề phổ biến):
1. Viết code thẳng
2. Test tay 1 chút
3. Phát hiện bug, sửa code
4. Lặp lại... (test? để sau hẵng tính)

**Cách TDD** (sau khi kích hoạt skill):
1. 🔴 **RED**: viết 1 test fail trước
2. 🟢 **GREEN**: viết code tối thiểu để test pass
3. 🔵 **REFACTOR**: refactor code, giữ test pass
4. Lặp

**Ví dụ dùng**:

```
Dùng TDD implement 1 module xác thực user
```

Claude sẽ:
1. Viết test trước (test validate username-password, test gen token...)
2. Chạy test, confirm tất cả fail (RED)
3. Viết code implement tối thiểu
4. Chạy test, confirm pass (GREEN)
5. Refactor code, extract logic chung
6. Chạy test lại, confirm vẫn pass (REFACTOR)

> **Lưu ý**: nếu bạn không nhắc "TDD", Claude có thể viết test cũng có thể không. Skill này dùng để **tăng cường kỷ luật flow**, đảm bảo test không bị "quên".

### 🐛 Skill nhóm Debug

#### systematic-debugging (debug có hệ thống)

Khi xuất hiện bug, dev người thường thử fix ngẫu nhiên. Superpowers buộc dùng phân tích root cause 4 stage:

**Stage 1: reproduce vấn đề**
- Confirm bug reproduce ổn định
- Ghi step reproduce

**Stage 2: isolate root cause**
- Dùng binary search thu hẹp phạm vi
- Add log định vị code có vấn đề

**Stage 3: verify giả thuyết**
- Đưa giả thuyết root cause
- Design experiment verify

**Stage 4: fix và verify**
- Implement fix
- Confirm bug đã giải quyết
- Add regression test

#### verification-before-completion (verify trước khi hoàn thành)

Skill này chặn Claude "cảm thấy gần xong" rồi dừng. Yêu cầu Claude trước khi tuyên bố task xong:

1. Chạy tất cả test
2. Test tay function chính
3. Check chất lượng code (lint)
4. Confirm doc đã update

### 🤝 Skill nhóm Collaboration

#### brainstorming (brainstorm nhu cầu)

Đây là 1 trong các skill thú vị nhất của Superpowers. Dùng hỏi kiểu Socratic giúp bạn làm rõ nhu cầu.

**Cách làm việc**: khi bạn đưa nhu cầu mơ hồ, Claude không lao vào làm, mà hỏi bạn:

```
Bạn: làm 1 hệ blog

Claude:
- Blog này chủ yếu cho ai đọc? Reader kỹ thuật hay đại chúng?
- Cần support edit Markdown không?
- Cần function comment không?
- Cần function search không?
- Single user hay multi-author?
- ...
```

Các câu hỏi này buộc bạn nghĩ thực sự cần function gì, tránh dev 1 đống không dùng tới.

#### writing-plans (viết plan)

Skill này tách task lớn thành các task nhỏ 2-5 phút hoàn thành được.

**Ví dụ**:

```
Dùng writing-plans plan dev 1 todo API
```

Claude sẽ gen plan chi tiết:

```markdown
# Plan implement

## Task 1: design schema database (estimate 5 phút)
- Tạo table todos
- Define field: id, title, completed, createdAt

## Task 2: tạo route Express (estimate 10 phút)
- POST /todos - tạo task
- GET /todos - lấy list
- GET /todos/:id - lấy 1 cái
- PUT /todos/:id - update
- DELETE /todos/:id - xoá

## Task 3: add validation input (estimate 10 phút)
- Title không trống
- completed phải là boolean

## Task 4: viết test (estimate 15 phút)
- Viết test cho mỗi endpoint
- Cover edge case

## Task 5: khởi động server và verify (estimate 5 phút)
- Chạy test
- Test tay API

Tiêu chí accept:
- Tất cả test pass
- curl test mỗi endpoint ok
```

#### executing-plans (execute plan)

Skill này execute plan theo batch, và pause confirm ở mỗi checkpoint.

**Ví dụ dùng**:

```
Execute plan trên, mỗi task xong pause chút
```

Claude sẽ:
1. Xong task 1, rồi pause: `✅ Schema database xong, tiếp tục?`
2. Bạn confirm xong xong task 2, pause lại
3. Tiếp tục thế

Cho phép bạn check hướng có đúng không ở mỗi stage, tránh chạy xa mới phát hiện sai.

#### dispatching-parallel-agents (dispatch agent parallel)

Skill này có thể start nhiều subagent cùng lúc làm song song.

**Scenario dùng**: khi cần xử lý nhiều task độc lập cùng lúc.

```
Dùng agent parallel cùng hoàn thành:
- Agent A: viết API backend
- Agent B: viết component frontend
- Agent C: viết test
```

Mỗi agent làm trong env isolate của mình, không can thiệp nhau.

#### subagent-driven-development (dev driven bởi subagent)

Skill này start 1 subagent độc lập cho mỗi task nhỏ.

**Lợi ích**:
- Mỗi subagent có context độc lập
- Task fail không ảnh hưởng task khác
- Có thể parallel nhiều task

#### using-git-worktrees (dùng Git worktree)

Skill này dùng worktree của Git tạo env dev isolate.

**Lợi ích**:
- Nhiều feature dev parallel
- Mỗi worktree độc lập
- Không conflict nhau

### 👀 Skill nhóm Code Review

#### requesting-code-review (request code review)

Khi bạn xong code, skill này tự động request code review.

```
Sau khi xong feature tự động trigger code review
```

#### receiving-code-review (nhận code review)

Skill này define cách nhận và xử lý feedback review.

**Flow review**:
1. Commit code
2. Auto trigger review
3. Reviewer check chất lượng code, security, test coverage
4. Đưa đề xuất cải tiến
5. Fix vấn đề
6. Review lại tới khi approve

---

## Workflow đầy đủ Superpowers

Sức mạnh thực sự của Superpowers nằm ở combine nhiều skill thành flow dev đầy đủ.

### Flow dev chuẩn

```
1. Brainstorming
   ↓ Qua Q&A làm rõ nhu cầu thực

2. Design Document
   ↓ Show design từng block, đợi confirm

3. Writing Plans
   ↓ Tách thành task nhỏ 2-5 phút

4. Subagent Development
   ↓ Mỗi task start subagent độc lập
   ↓ Review 2 stage: tuân thủ spec + chất lượng code

5. TDD
   ↓ Bắt buộc RED-GREEN-REFACTOR

6. Code Review
   ↓ Kiểm soát chất lượng

7. Hoàn thành
```

### Case thực: dùng Superpowers build hệ xác thực user

Hãy qua 1 ví dụ đầy đủ trải nghiệm workflow Superpowers.

#### Bước 1: Brainstorming làm rõ nhu cầu

```
Tôi cần 1 hệ xác thực user
```

Claude sẽ hỏi:
- Web app hay mobile app?
- Support cách login nào?
- Cần reset password không?
- Cần "remember me" không?
- ...

#### Bước 2: sinh design document

Sau confirm nhu cầu, Claude gen design document:

```markdown
# Design hệ xác thực user

## Yêu cầu function
1. Đăng ký user (email + password)
2. Login user
3. Reset password (email)
4. Remember me (JWT + Refresh Token)

## Chọn công nghệ
- Backend: Node.js + Express
- Database: SQLite
- Auth: JWT
- Mã hoá: bcrypt

## Design API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Bước 3: viết plan implement

```
Dùng writing-plans lập plan implement
```

Claude sẽ gen task list chi tiết, mỗi task 2-5 phút hoàn thành.

#### Bước 4: execute dev

```
Dùng TDD execute plan trên
```

Claude sẽ:
1. Viết test trước
2. Confirm test fail (RED)
3. Viết code implement
4. Confirm test pass (GREEN)
5. Refactor code (REFACTOR)

#### Bước 5: code review

Sau xong tự động trigger code review, check:
- Chất lượng code
- Security (SQL injection, XSS...)
- Test coverage
- Doc đầy đủ

---

## Superpowers vs dùng Claude Code thẳng

| Chiều | Dùng Claude Code thẳng | Dùng Superpowers |
|------|---------------------|-----------------|
| **Làm rõ nhu cầu** | AI lao vào viết code | Hỏi Socratic làm rõ nhu cầu |
| **Flow dev** | AI tự do bay nhảy | Bắt buộc TDD red-green-refactor |
| **Quản lý task** | 1 lần xong hết | Tách task nhỏ, có checkpoint |
| **Chất lượng code** | Phụ thuộc AI tự đánh giá | Bắt buộc code review |
| **Tính dự đoán** | Kết quả không ổn định | Flow có thể lặp |
| **Phù hợp** | Task đơn giản, verify prototype | Project phức tạp, code production |

### So sánh hình tượng

Nếu coi Claude Code là 1 "intern thông minh":

- **Dùng thẳng**: bảo intern "làm function login", anh ta lao vào viết, có thể ra cái bạn thấy không đúng
- **Dùng Superpowers**: trang bị intern 1 senior mentor, mentor sẽ hỏi rõ nhu cầu, lập plan, check chất lượng code

---

## Chi tiết cài và config

### Cách 1: qua Marketplace (khuyến nghị)

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Cài
/plugin install superpowers@superpowers-marketplace

# Verify cài
/skills
```

### Cách 2: clone tay

```bash
# Tạo thư mục
mkdir -p ~/.claude/skills

# Clone repo
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Cách 3: cài level project

Nếu muốn dùng Superpowers ở project cụ thể:

```bash
# Ở root project
mkdir -p .claude/skills

# Clone hoặc copy superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

Như vậy member team share được cùng config Superpowers.

---

## Bảng tra skill phổ biến

| Tên skill | Function | Scenario dùng |
|---------|------|---------|
| `brainstorming` | Hỏi Socratic làm rõ nhu cầu | Khi nhu cầu chưa rõ |
| `writing-plans` | Tách task thành step nhỏ | Trước khi bắt đầu project lớn |
| `executing-plans` | Execute plan và checkpoint | Khi dev theo plan |
| `test-driven-development` | TDD red-green-refactor cycle | Mọi feature dev |
| `systematic-debugging` | Phân tích root cause 4 stage | Khi xuất hiện bug |
| `verification-before-completion` | Verify trước hoàn thành | Cuối task |
| `requesting-code-review` | Request code review | Trước commit code |
| `subagent-driven-development` | Dev driven subagent | Task parallel |
| `using-git-worktrees` | Isolate Git worktree | Dev feature parallel |

---

## Best practice

### 1. Rõ keyword trigger

Skill Superpowers trigger qua keyword, hiểu trigger word phổ biến:

| Skill | Keyword trigger |
|------|-----------|
| `test-driven-development` | "TDD", "test-driven", "viết test trước" |
| `brainstorming` | Khi nhu cầu mơ hồ auto-trigger |
| `systematic-debugging` | "debug", "bug", "không chạy" |
| `writing-plans` | "lập plan", "plan dev" |

### 2. Khi cần kỷ luật flow thì dùng Superpowers

- Dev code level production → nhắc "TDD"
- Khi nhu cầu chưa rõ → để `brainstorming` giúp làm rõ
- Project phức tạp → dùng `writing-plans` tách task

### 3. Task đơn giản không cần ép

Nếu là prototype nhanh hoặc script 1 lần, không cần ép qua flow đầy đủ. Superpowers phù hợp code cần maintain dài hạn.

### 4. Skill có thể combine

```
Dùng TDD implement xác thực user, xong code review giúp tôi
```

Sẽ trigger cùng lúc `test-driven-development` và `code-review` skill.

---

## Câu hỏi thường gặp

### Q1: Dùng Superpowers bắt buộc chỉ định "TDD" không?

**Không bắt buộc**.

Superpowers là bộ skill, mỗi skill có điều kiện trigger riêng:
- Nói "dùng TDD" → trigger `test-driven-development`
- Không nói TDD → Claude có thể viết test, có thể không (phụ thuộc model)

Tác dụng Superpowers là **tăng cường kỷ luật flow**, không phải tạo năng lực từ không khí.

### Q2: Superpowers có làm dev chậm hơn không?

Giai đoạn đầu có thể cảm thấy chậm vì:
- Cần thời gian làm rõ nhu cầu
- Phải viết test trước rồi viết code
- Phải qua code review

Nhưng dài hạn, do giảm rework và bug, hiệu suất tổng cao hơn.

### Q3: Project nhỏ có cần Superpowers không?

Với prototype verify hoặc task rất đơn giản, dùng Claude Code thẳng được. Superpowers phù hợp hơn:
- Project level production
- Project cộng tác nhiều người
- Project cần maintain dài hạn

### Q4: Superpowers và Skills khác gì?

| Chiều | Superpowers | Skills |
|------|-------------|--------|
| **Bản chất** | Framework methodology dev đầy đủ | Bộ skill reusable |
| **Phạm vi** | Cover toàn flow dev | Tập trung function cụ thể |
| **Quan hệ** | Superpowers nội bộ dùng Skills | Superpowers là bộ Skills |

### Q5: Có thể custom skill Superpowers không?

Có! Superpowers là open source, bạn có thể:
1. Fork repo
2. Sửa skill hiện có
3. Add skill mới
4. Contribute lại community

---

## Tài liệu tham khảo

### Resource official

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - Repo official (50,000+ ⭐)

### Resource community

| Repo | Mô tả |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Toolkit tổng hợp, gồm workflow TDD |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Best practice official |

---

## Tổng kết

Superpowers là 1 **bộ skill dev level engineering**, biến Claude Code từ "intern thông minh" thành "team dev có kỷ luật".

### Điểm core

1. **Superpowers là bộ skill, không phải ma thuật**
   - Sau cài, skill available ở background
   - Trigger qua keyword hoặc scenario
   - Có thể call tay skill cụ thể

2. **Nhớ trigger word chính**
   - Muốn TDD → nói "dùng TDD"
   - Nhu cầu mơ hồ → `brainstorming` chủ động hỏi
   - Xuất hiện bug → nhắc "debug" trigger `systematic-debugging`

3. **Phù hợp**
   - ✅ Dev code level production
   - ✅ Project cần maintain dài hạn
   - ✅ Project cộng tác team
   - ❌ Prototype nhanh (tuỳ chọn)
   - ❌ Script 1 lần (tuỳ chọn)

Nhớ: **Superpowers không làm AI thông minh hơn, mà làm AI có kỷ luật hơn.**

---

# Phụ lục: Superpowers 2026 update

## A. Roadmap Superpowers (Q2/2026)

- **Native plan mode integration**: dùng `Shift+Tab x2` (Claude Code plan mode mới) auto-trigger `brainstorming + writing-plans` combo
- **Checkpoint sau mỗi skill**: tự save state sau brainstorming → trước viết code, để rollback dễ
- **Multi-model skill**: 1 số skill (như `code-review`, `systematic-debugging`) tự dùng Opus 4.7, code generation dùng Sonnet 5 — tối ưu cost
- **Skill marketplace v2**: contribute skill thành package npm, version với semver

## B. Alternative & complement framework

| Framework | Khi nào dùng | Note |
|---|---|---|
| **Superpowers** | Bộ skill toàn diện, engineering discipline | Mature nhất, 50k+ stars |
| **Spec-driven development** | Project lớn cần ARCHITECTURE.md, design doc trước code | Xem [Spec Coding guide](/vi-vn/stage-3/core-skills/spec-coding/) |
| **BMAD-Method** | Agile workflow với AI agent | Story planning, sprint review |
| **AgentOS** | Production agent framework cho team | Memory persistent, multi-agent |
| **Cursor Rules** | Light-weight, không cần plugin | Chỉ guide style không có flow |

**Combo phổ biến 2026**: Superpowers (flow) + Spec coding (design upfront) + MCP (external tool) + Skills tự build (project-specific).

## C. Best practice cho team VN

1. **Áp dụng từng skill, không all-at-once**:
   - Bắt đầu với `brainstorming` (low friction, dev thấy ngay giá trị)
   - Add `writing-plans` cho task >2h work
   - Add `test-driven-development` cho code có test infra sẵn
   - Add `code-review` cuối cùng, khi team đã quen

2. **Train team trước khi rollout**:
   - 1 workshop 2h: show Superpowers vs without
   - Doc internal: "khi nào trigger skill X"
   - Pair-programming session đầu để dev senior coach junior

3. **Customize skill cho VN context**:
   - Fork Superpowers, sửa prompt brainstorming sang tiếng Việt
   - Add skill `vn-compliance-check`: check PII handling, log audit
   - Add skill `mobile-first-design`: cho VN audience chủ yếu mobile

4. **Track ROI**:
   - Đo trước/sau Superpowers: rework rate, bug post-deploy, time-to-merge PR
   - Thực tế team áp dụng đúng: -40% rework, +30% test coverage

::: warning Pitfall thường gặp
- **Không phải cứ dùng Superpowers là code tốt** — model vẫn cần đủ context (CLAUDE.md, code style guide)
- **Đừng force TDD cho UI exploratory** — design phase, prototype không cần TDD
- **Brainstorming có thể annoying nếu task nhỏ** — disable cho throwaway script
- **Plan mode + execute mode confusion** — Claude Code có plan mode native (Shift+Tab x2), khác với `writing-plans` skill (gen plan markdown)
:::

## Sources

- [obra/superpowers GitHub](https://github.com/obra/superpowers)
- [Anthropic blog: Best practices for agentic coding](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Superpowers comparison with BMAD/AgentOS](https://github.com/affaan-m/everything-claude-code)
