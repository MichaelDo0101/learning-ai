# Technical Writing

::: tip Mở đầu
**Doc bạn viết có ai đọc?** Nhiều dev nghĩ "code chạy được thôi, doc sau cũng được". Kết quả: newbie onboard không hiểu project, API integration tất cả qua verbal, 6 tháng sau chính bạn quên sao design thế.

Chương này: core method tech writing, doc thực sự có người đọc + hiểu + dùng.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Doc types + structure |
| **2** | Writing principles |
| **3** | Good vs bad compare |
| **4** | Maintain doc |

---

## 0. Toàn cảnh: sao tech doc quan trọng?

Code nói máy "làm thế nào", doc nói người "sao làm thế". Project no doc = electronic device no manual — dùng được, nhưng đoán.

::: tip Giá trị doc tốt
- **Giảm communication cost**: newbie self-onboard
- **Lưu decision context**: ghi "sao", không chỉ "là gì"
- **Tăng credibility**: doc tốt = mặt tiền open-source
- **Speedup collaboration**: API doc cho FE/BE parallel dev
:::

---

## 1. Doc types + structure

<DocStructureDemo />

### 1.1 Common types

| Doc type | Target reader | Core content |
|---------|---------|---------|
| **README** | Everyone | Project là gì, dùng sao, contribute sao |
| **API doc** | API caller | Endpoint, param, response, error code |
| **Architecture doc** | Dev team | Design, tech selection, data flow |
| **Changelog** | User/dev | Version change, new/fix/breaking |
| **Contributing guide** | Contributor | Dev env, code style, PR flow |

### 1.2 README golden structure

1. **Project name + 1-line description**: 3 giây hiểu là gì
2. **Quick start**: min step để chạy
3. **Feature**: core sell points
4. **Install**: chi tiết env + step
5. **Usage example**: copy-paste code
6. **Contributing**: tham gia thế nào
7. **License**: legal info

---

## 2. Writing principles

### 2.1 Clarity first

```markdown
<!-- Bad: mơ hồ -->
Function này xử data.

<!-- Good: cụ thể -->
Convert raw order data sang invoice format, kèm tax calc + currency.
```

### 2.2 Reader-oriented

Trước viết, hỏi: **ai sẽ đọc? Họ cần info gì?**

- Newbie: giải thích term, example đầy đủ
- Experienced dev: thẳng vấn đề, API reference
- Non-tech: dùng analogy, tránh jargon

### 2.3 Code example = best doc

```markdown
<!-- Bad: chỉ text -->
Call createUser function, pass username + email param.

<!-- Good: runnable example -->
const user = await createUser({
  name: 'Hoàng',
  email: 'h@example.com'
})
// Return: { id: 'u_123', name: 'Hoàng', createdAt: '2025-01-15' }
```

---

## 3. Practical compare

<TechWritingPracticeDemo />

### 3.1 Commit message convention

```
# Bad
fix bug
update code

# Good (Conventional Commits)
fix: fix white screen login page Safari
feat: support batch export PDF report
docs: update API auth section example
```

### 3.2 Comment art

```javascript
// Bad: describe "what" (code đã nói)
// Iterate array
for (const item of items) { ... }

// Good: explain "why"
// Reverse iterate vì delete element sẽ skip next nếu forward
for (let i = items.length - 1; i >= 0; i--) { ... }
```

---

## 4. Doc maintenance

### 4.1 Doc as code

Doc + code cùng repo, cùng workflow:

- Doc change kèm code PR
- CI check doc format + link valid
- Release version sync update doc

### 4.2 Tránh doc rot

| Issue | Solution |
|------|---------|
| Doc outdated | Code change force update doc (PR check) |
| Không maintain | Designate doc owner |
| Duplicate | Single source of truth, ref qua link |

---

## 5. AI assist doc quality

LLM ở tech writing gần như "thiên phú" — gen, improve, translate đều mạnh.

### 5.1 Generate API doc

> **Prompt**:
> ```
> Theo Express route code sau, gen full API doc:
> - Endpoint path + method
> - Request param (path, query, body) + type
> - Response success + error example
> - curl call example
>
> [paste route code]
> ```

### 5.2 Improve writing

> **Prompt**:
> ```
> Improve technical doc:
> 1. Concise, bỏ redundancy
> 2. Active voice thay passive
> 3. Tech term accurate
> 4. Add code example necessary
> Giữ original meaning, chỉ improve expression.
>
> [paste doc]
> ```

### 5.3 Generate README

> **Prompt**:
> ```
> Gen README.md cho project:
> - Name: [name]
> - 1-line: [description]
> - Stack: [list]
> - Core features: [list]
>
> Include: intro, quick start, features, install (code), usage, contributing, license.
> ```

::: tip AI caveat
AI gen doc phải verify tech detail accurate — có thể bịa API param không tồn tại hoặc return value sai. Always validate vs actual code.
:::

---

## 6. Tổng kết

1. **Type match**: doc khác có structure + style khác
2. **Clarity first**: cụ thể, accurate, reader-oriented
3. **Example-driven**: code example > 1000 chữ
4. **Maintain**: doc as code, evolve cùng project

::: tip Insight cuối
Viết doc không phải lãng phí time, mà **save future time**. 30 phút viết doc hôm nay = save 10 người × 1 giờ. Doc tốt = investment tốt nhất cho team.
:::

::: tip 2026 cho VN dev
- **Tools**:
  - **VitePress, Docusaurus, GitBook**: modern doc framework
  - **Mintlify, Nextra**: AI-powered doc
  - **Swagger / OpenAPI**: API doc standard
  - **Mermaid**: diagram-as-code
- **VN context**:
  - Doc tiếng Anh: priority cho global team
  - Doc tiếng Việt: internal team
  - Bilingual: dùng VitePress i18n
- **AI tools**:
  - GitHub Copilot tự gen JSDoc, docstring
  - Cursor explain code → gen doc auto
  - Mintlify Writer: AI doc assistant
:::

## Tài liệu

- [Google Technical Writing](https://developers.google.com/tech-writing)
- [Write the Docs](https://www.writethedocs.org/)
- [OpenAPI Specification](https://www.openapis.org/)
- [Diátaxis framework](https://diataxis.fr/) — 4 types of doc
