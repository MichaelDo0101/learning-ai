# Từ Vibe Coding tới Spec Coding: con đường tiến hoá của lập trình AI

> "Code is a lossy projection of intent."
> Code là projection có loss của intent.
> — Sean Grove, OpenAI, AI Engineer World's Fair 2025

## Triết lý core của Spec Coding: mọi thứ đều là Markdown

Trước khi đi sâu Spec Coding, hiểu triết lý nền tảng của Claude Code: **mọi thứ đều là Markdown**.

Trong triết lý design của Claude Code, mọi process record, truyền tin, thậm chí hội thoại với model đều có thể là Markdown:

- **CLAUDE.md**: doc quy chuẩn project dạng Markdown
- **.claude/rules/**: bộ file quy chuẩn phân tầng dạng Markdown
- **specs/**: mô tả nhu cầu function dạng Markdown
- **Lịch sử hội thoại**: record hội thoại Claude Code tự nó là format Markdown
- **AGENTS.md**: instruction quy chuẩn hành vi Agent dạng Markdown

Đây chính là core của Spec Coding: **spec chính là code**. Khi bạn viết nhu cầu, design, tiêu chí accept bằng Markdown, bạn đã đang viết "code" — AI sẽ đọc các Markdown này, rồi sinh code thật.

Tóm tắt của Josh Beckman cho speech của Grove rất sắc:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Software engineering (và làm luật, review pháp lý) bản chất là sửa spec.

Trong Claude Code, process "sửa spec" này là: **sửa Markdown → AI đọc Markdown → sinh/sửa code → verify kết quả**. Toàn bộ process là Markdown-driven.

---

## 1. Sean Grove "The New Code": speech thay đổi tư duy

2025, researcher OpenAI **Sean Grove** đã có speech tại AI Engineer World's Fair với title **"The New Code"**, gây chấn động community dev. Anh ấy đưa ra 1 quan điểm đột phá: **70 năm qua ta viết code để giải vấn đề, nhưng code chỉ là projection có loss của intent — spec mới là "new code" thực sự**.

Speech này khai sinh 1 paradigm dev mới: **Spec Coding** — lấy doc spec (không phải code) làm sản phẩm core của dev, để AI sinh code theo spec.

Bài này từ speech của Grove, dẫn bạn hiểu tư tưởng core của Spec Coding, review giới hạn của Vibe Coding, kết hợp thực hành Claude Code, demo cách dùng methodology này trong dev thật.

::: info 📚 Bạn sẽ học
1. Hiểu tư tưởng key của speech Sean Grove "The New Code"
2. Nắm triết lý core và methodology Spec Coding
3. Nhận thức giá trị và trần của Vibe Coding
4. Thực hành workflow Spec Coding trong Claude Code
5. Nắm chiến lược chuyển tiệm tiến từ Vibe Coding sang Spec Coding
:::

### 1.1 Luận điểm core: code là projection có loss của intent

Khái niệm core speech của Grove có thể tóm bằng 1 câu:

> **Code is a lossy projection of intent.**
> Code là projection có loss của intent.

Nghĩa là gì? Khi bạn có 1 ý tưởng, trong quá trình biến nó thành code, lượng lớn info context bị mất — **tại sao** làm vậy, **đã cân nhắc phương án nào**, **xét constraint nào**. Code cuối chỉ giữ "làm thế nào", mà bỏ "tại sao làm vậy".

Giống như nén 1 cuốn sách thành 1 tweet — lượng info giảm mạnh, intent gốc bị loss nặng.

### 1.2 Bản chất lập trình là giao tiếp

Grove đưa quan điểm có vẻ đơn giản nhưng sâu sắc:

> "If you can communicate effectively, you can program."
> Nếu bạn giao tiếp hiệu quả, bạn có thể lập trình.

Anh ấy cho rằng, việc coding thực tế chỉ chiếm **10-20%** dev, còn lại 80% là **giao tiếp có cấu trúc** quanh nhu cầu và mục tiêu — hiểu user muốn gì, align với team về phương án, define tiêu chí accept, xử lý edge case.

Nghĩa là core của năng lực lập trình không phải nắm syntax của 1 ngôn ngữ, mà là **năng lực biến intent mơ hồ thành mô tả chính xác**.

### 1.3 Người viết spec là programmer

Đây là quan điểm đột phá nhất của Grove:

> "Whoever writes the spec — be it a PM, a lawmaker, an engineer, a marketer — is now the programmer."
> Dù là PM, luật sư, engineer hay marketer, người viết spec là programmer.

Khi AI ngày càng giỏi biến spec thành code, **công việc lập trình thực sự** từ "viết code" thành "viết spec". Ai diễn đạt intent chính xác nhất, người đó là "programmer" có giá trị nhất.

### 1.4 Spec có toolchain giống code

Grove chỉ ra, spec có thể có toolchain đầy đủ như code:

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **Compose**: spec có thể modular compose, như module code
- **Test**: spec có thể embed unit test, verify behavior khớp expectation
- **Lint check**: detect được ngôn ngữ mơ hồ trong spec, như linter detect syntax
- **Consistency verify**: spec cross-team có thể consistency check, giống type checker

### 1.5 OpenAI Model Spec: bằng chứng sống

Grove dùng **Model Spec** của OpenAI làm bằng chứng thực.

Khi OpenAI phát hiện model có vấn đề sycophancy (nịnh user quá), họ không train lại model, mà **sửa doc spec**. Thay đổi tự propagate vào toàn hệ thống, vấn đề được fix.

Chứng minh 1 điểm key: **spec tự nó có thể hoạt động như "code executable"**. Sửa spec = sửa behavior, không cần đụng dòng code truyền thống nào.

---

## 2. Spec Coding: spec chính là code

### 2.1 Spec Coding là gì

Spec Coding (lập trình theo spec), còn gọi Spec-Driven Development (SDD), là 1 methodology lấy **doc spec làm sản phẩm core của dev**.

Ý tưởng core: **viết spec rõ trước, rồi để AI sinh code theo spec. Spec là source of truth, code chỉ là sản phẩm implement của spec.**

Luận điểm kinh điển của Robert C. Martin trong "Clean Code" được kích hoạt lại thời AI:

> "Specifying requirements so precisely that a machine can execute them is programming."
> Mô tả nhu cầu chính xác đủ để máy execute được — đó chính là lập trình.

### 2.2 So sánh Vibe Coding vs Spec Coding

| Chiều | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **Cách** | Prompt ngẫu hứng, iterate từng câu | Viết spec đầy đủ trước, rồi sinh code |
| **Scenario phù hợp** | Prototype, hackathon, explore | Hệ production, cộng tác team, enterprise |
| **Chất lượng code** | Nhanh nhưng fragile | Có cấu trúc, testable, auditable |
| **Tỉ lệ pass lần đầu** | Không ổn định | Mục tiêu 95%+ |
| **Reusability** | Prompt 1 lần | Spec reuse được cross-project |
| **Security** | Dễ sót | Built-in từ tầng spec |
| **Doc** | Không có hoặc lag | Spec chính là doc, tự maintain |
| **Cộng tác team** | Phụ thuộc kỹ năng prompt cá nhân | Spec shared, standard thống nhất |

2 cái không đối lập. Brad Jolicoeur chỉ ra:

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> Engineer thông minh sẽ dùng Vibe Coding làm bước đầu, sinh draft đầu của spec.

### 2.3 Cấu trúc spec 3 tầng của Spec Coding

Engineer Red Hat tổng kết 1 model spec 3 tầng thực dụng:

**Tầng 1: spec function (What)**

Dùng ngôn ngữ tự nhiên mô tả kết quả mong đợi, trả lời "làm gì":

```markdown
## Function xác thực user

### User story
- Là user mới, tôi muốn đăng ký account qua email
- Là user đã đăng ký, tôi muốn login bằng email và password
- Là user quên password, tôi muốn reset password qua email

### Tiêu chí accept
- Đăng ký validate format email và độ mạnh password
- Login fail 5 lần lock account 15 phút
- Link reset password hiệu lực trong 30 phút
```

**Tầng 2: spec không phụ thuộc ngôn ngữ (How - tầng kiến trúc)**

Định nghĩa data structure, pattern kiến trúc, yêu cầu security:

```markdown
## Technical design

### Data model
- Bảng users: id, email, password_hash, created_at, locked_until
- Bảng sessions: id, user_id, token, expires_at

### API design
- POST /api/auth/register → 201 Created
- POST /api/auth/login → 200 OK + JWT
- POST /api/auth/reset-password → 202 Accepted

### Yêu cầu security
- Password dùng bcrypt mã hoá, cost factor ≥ 12
- JWT hiệu lực 15 phút, refresh token 7 ngày
- Tất cả endpoint bật rate limiting
```

**Tầng 3: spec đặc thù ngôn ngữ (How - tầng implement)**

Yêu cầu version, framework test, standard doc:

```markdown
## Constraint implement

### Tech stack
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### Code standard
- TypeScript strict mode
- ESLint + Prettier
- 100% test coverage cho auth module
```

## 3. Thực hành Spec Coding trong Claude Code

### 3.1 Bước 1: dùng CLAUDE.md lập quy chuẩn project

`CLAUDE.md` là tầng 1 của spec project — Claude đọc mỗi lần khởi động.

```markdown
# Quy chuẩn project e-commerce

## Định vị project
B2C e-commerce platform cho thị trường VN, target SMB

## Quyết định kiến trúc
- Frontend: Next.js 14 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + Postgres + Prisma
- Deploy: Vercel (frontend) + Railway (backend)
- Payment: VNPay, Momo, COD
- Shipping: GHTK, GHN

## Constraint core
- All API path: /api/v1/...
- All response: { success: boolean, data?: T, error?: { code, message } }
- Naming: camelCase (variable), PascalCase (component), kebab-case (file)
- Vietnamese for user-facing text, English for code identifier
```

### 3.2 Bước 2: dùng thư mục Rules quản lý spec phân tầng

Project lớn nên tách spec theo lĩnh vực:

```
.claude/rules/
├── 00-architecture.md     # Quyết định kiến trúc
├── 01-security.md         # Quy chuẩn security (input validation, SQL injection...)
├── 02-i18n.md             # Quy chuẩn i18n (tiếng Việt: dấu, chuẩn unicode)
├── 10-frontend.md         # Quy chuẩn frontend (component pattern)
├── 11-backend.md          # Quy chuẩn backend (API design)
├── 20-testing.md          # Quy chuẩn test
└── 30-vn-payment.md       # Quy chuẩn payment VN (Momo, VNPay flow)
```

Mỗi file có YAML frontmatter chỉ apply cho file path nào:

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
priority: 10
---

# Spec API backend

## Standard URL
- RESTful, dùng noun plural
- Version control: /api/v1/users
- Resource nested: /api/v1/users/123/orders

## Format request/response
- Thống nhất JSON
- Error response phải có code và message
- Pagination dùng cursor-based: { data, cursor, hasMore }
```

### 3.3 Bước 3: viết spec function cụ thể trong `specs/`

Cho mỗi feature mới, tạo 1 file spec trong `specs/`:

```
specs/
├── 2026-01-user-auth.md
├── 2026-02-cart-checkout.md
├── 2026-03-vnpay-integration.md
└── 2026-04-loyalty-program.md
```

Format spec đề xuất:

```markdown
# [Feature name]

**Status**: Draft | In progress | Done
**Owner**: [Tên]
**Created**: 2026-XX-XX

## Background & Motivation
Tại sao cần feature này? Business value là gì?

## User Stories
- Là [persona], tôi muốn [action], để [benefit]
- ...

## Acceptance Criteria
- [ ] Criterion 1 (testable)
- [ ] Criterion 2
- [ ] Edge case A handled

## Out of Scope
Cái nào không làm ở phase này

## Technical Design

### Data model changes
[Migration SQL hoặc Prisma schema diff]

### API endpoints
[Method + path + request/response shape]

### UI mockup
[Link Figma hoặc ASCII diagram]

### Dependencies
[Library/service mới cần]

## Test Plan
- Unit tests: ...
- Integration tests: ...
- Manual QA: ...

## Rollout Plan
- Feature flag: yes/no
- Migration strategy: ...
- Monitoring: ...
```

### 3.4 Bước 4: AI gen code từ spec

Trong Claude Code:

```
Đọc specs/2026-01-user-auth.md và implement theo spec.
Code phải pass tất cả acceptance criteria.
Viết test trước khi code (TDD).
```

Claude sẽ:
1. Đọc spec
2. Đọc CLAUDE.md + rules cho context
3. Viết test theo acceptance criteria
4. Implement code đến khi test pass
5. Update spec status sang "In progress"

### 3.5 Bước 5: spec evolve theo code

Spec không tĩnh. Khi dev gặp edge case mới, update spec:

```
Trong khi implement, tôi phát hiện edge case: user nhập email có dấu cộng (a+b@gmail.com).
Update specs/2026-01-user-auth.md với edge case này, rồi update test và code.
```

Spec là source of truth — code follow spec, spec không follow code.

## 4. Vibe Coding vs Spec Coding: khi nào dùng cái nào?

| Use case | Recommend |
|---|---|
| Hackathon 24h | Vibe Coding 100% |
| MVP throwaway | Vibe Coding |
| Internal tool team 5 người | Vibe → Spec sau MVP |
| Production app, user >1000 | Spec Coding từ đầu |
| Enterprise app, compliance | Spec Coding + audit log |
| Migrate legacy system | Spec Coding (define target rõ) |
| Open source library | Spec Coding (spec = doc API) |
| Prototype demo cho khách | Vibe Coding |

## 5. Chiến lược chuyển tiếp từ Vibe sang Spec

Đừng switch sudden — sẽ frustrate team. Approach gradient:

**Tháng 1: thêm CLAUDE.md**
- Viết CLAUDE.md cho project hiện tại
- Document tech stack, convention, common command
- Tất cả prompt mới reference CLAUDE.md

**Tháng 2: spec cho feature mới**
- Feature mới phải có file spec trong `specs/`
- Spec template trong `.claude/templates/spec.md`
- PR review check spec đầy đủ chưa

**Tháng 3: spec backfill cho code hiện có**
- Reverse-engineer spec từ feature đã có
- Dùng AI gen spec từ code: "Đọc src/auth/ và viết spec mô tả behavior"

**Tháng 4+: SDD đầy đủ**
- Mọi feature start với spec
- Spec review trước code review
- Spec là document chính cho onboarding

## 6. Tool support Spec Coding 2026

| Tool | Function | Note |
|---|---|---|
| **Claude Code** | Đọc CLAUDE.md, rules, specs/ | Built-in spec-driven workflow |
| **Cursor** | Project rules + .cursorrules | Lightweight spec |
| **GitHub Spec Kit** | Template spec + validator | OSS tool, Markdown-based |
| **Linear** | Spec link với task | Sync spec → task tracker |
| **Notion + Notion MCP** | Spec ở Notion, AI đọc qua MCP | Cho team không quen Markdown |
| **OpenAPI** | API spec executable | Validation, mock server, client gen |
| **Pact** | Contract testing | Verify spec contract giữa service |

## 7. Best practice 2026

### 1. Spec phải testable

Tránh:
> "Login phải nhanh"

Thay bằng:
> "Login API response 95th percentile < 200ms với p50 < 50ms, measured qua Datadog"

### 2. Spec phải có expiry

Mọi spec nên có:
- `Created` date
- `Last reviewed` date
- `Owner`

Quarterly review: spec đã outdated chưa? Có cần archive không?

### 3. Spec versioning

Treat spec như code — Git version, PR review, semantic version. Major change → bump version, document migration path.

### 4. Spec không phải design doc

Spec = **what + acceptance criteria**. Design doc = **how + architecture**. 2 cái riêng:
- `specs/auth.md` - what & acceptance
- `design/auth.md` - architecture & implementation choice

### 5. AI hỗ trợ viết spec

Dùng AI viết spec draft từ user research:
```
Đọc transcript interview ở research/2026-02-user-interviews.md.
Extract 5 user story và 10 acceptance criteria cho feature checkout.
Format theo template specs/_template.md.
```

## Câu hỏi thường gặp

### Q1: Spec Coding chậm hơn Vibe Coding không?

Initial cost cao hơn (viết spec mất 1-3h), nhưng:
- Giảm rework: code first-time-right cao hơn
- Giảm onboarding cost: dev mới đọc spec hiểu ngay
- Long-term ROI dương sau ~2 tháng

### Q2: Solo dev có cần Spec Coding không?

Có, dù chỉ là lightweight:
- CLAUDE.md cho context
- Spec ngắn cho feature lớn (>1 ngày work)
- Không cần spec cho 1-line fix

### Q3: Spec viết tiếng Việt hay Anh?

Cả 2 đều work với Claude. Khuyến nghị:
- **Tiếng Việt** nếu team thuần VN, user-facing context
- **Tiếng Anh** nếu team international hoặc spec dùng cho open source
- **Mix OK** — code identifier tiếng Anh, business description tiếng Việt

### Q4: Spec change quá thường xuyên?

Đó là dấu hiệu **business chưa rõ**. Đừng force spec stability — mục đích Spec Coding là **discover requirement nhanh hơn**, không phải freeze nó.

### Q5: Khi nào KHÔNG nên dùng Spec Coding?

- Throwaway prototype (vài giờ)
- Exploration giai đoạn early (chưa biết build gì)
- Personal weekend project
- Hackathon (time-boxed creative)

## Tài liệu tham khảo

- [Sean Grove: The New Code (YouTube)](https://www.youtube.com/watch?v=8rABwKRsec4)
- [OpenAI Model Spec](https://model-spec.openai.com/)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Anthropic: Spec-driven development](https://www.anthropic.com/research/spec-driven-development)
- [Red Hat: Three-tier specification model](https://www.redhat.com/en/blog/spec-driven-development)

---

# Phụ lục: Spec Coding 2026

## A. Industry adoption

2026, Spec Coding đã thành mainstream trong:
- **OpenAI** (Model Spec public)
- **Anthropic** (Constitutional AI spec)
- **Stripe** (API spec-first design)
- **Shopify** (theme spec)
- **Vercel** (framework spec)

## B. Spec Coding cho VN context

VN ecosystem có nhiều spec-driven workflow đáng học:
- **Bộ TTTT spec**: chuẩn API cho service công
- **NĐ13/2023**: spec compliance PII
- **VNPay spec**: payment gateway spec public
- **GHTK API spec**: shipping API documented

Build app VN tích hợp các service trên → bắt buộc spec-driven, không vibe-code được vì sai 1 chi tiết là transaction fail.

## C. Tool đề xuất cho team VN

1. **Notion + Notion MCP**: viết spec ở Notion (Vietnamese-friendly), AI đọc qua MCP
2. **GitHub + Spec Kit**: nếu team đã quen Git workflow
3. **Linear**: link spec với task, sync 2 chiều
4. **Confluence + AI Search**: cho enterprise team

## D. Anti-pattern

1. **Spec quá chi tiết** = waterfall reborn. Spec define "what + acceptance", không phải "how exactly"
2. **Spec không ai đọc** = waste. Spec phải actionable, có owner, review định kỳ
3. **Code vs spec drift** = nightmare. Tooling: spec linter, doc test sync
4. **Spec không version** = source of truth không trustable
5. **Force spec cho throwaway** = annoying. Spec là tool, không phải cult

## Sources

- [Sean Grove keynote: The New Code](https://www.youtube.com/watch?v=8rABwKRsec4)
- [Spec-Driven Development - GitHub](https://github.com/github/spec-kit)
- [Robert C. Martin on programming](https://blog.cleancoder.com/)
- [Brad Jolicoeur: Vibe vs Spec coding](https://bradjolicoeur.com/)
