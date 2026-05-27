# Code Quality + Refactoring

::: tip Mở đầu
**Code viết xong chạy được là OK?** Bạn có thể viết code như sau: function OK, nhưng 2 tuần sau tự mình cũng không hiểu. Hoặc team có người nghỉ, để lại đống "chỉ chúa với họ hiểu" code.

Chương này: hiểu code tốt là gì, identify bad code, refactor an toàn.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Code smells |
| **2** | Refactoring techniques |
| **3** | Code review |
| **4** | Quality metrics |

---

## 0. Toàn cảnh: code lifecycle

Software dev có 1 sự thật hay bị bỏ qua: **code bị đọc nhiều hơn nhiều lần được viết**.

::: tip Đời code
- **Write**: dev viết version đầu, function chạy được, test pass
- **Review**: team đọc, suggest improvement
- **Maintain**: fix bug, add feature, adapt new req — **chiếm 80%+ lifecycle**
- **Refactor**: code khó maintain → improve internal structure mà không đổi external behavior
- **Retire**: tech iterate, code cũ replace
:::

Martin Fowler trong "Refactoring": **"Bất kỳ thằng ngốc nào cũng viết được code máy hiểu. Chỉ programmer tốt viết được code người hiểu."**

---

## 1. Code smells

### 1.1 Code smell là gì?

"Code smell" (Kent Beck) = feature trong code, **không phải bug, nhưng hint design issue sâu hơn**. Như mùi lạ trong phòng — không bệnh ngay, nhưng cần clean.

<CodeSmellDemo />

### 1.2 Common smells

| Smell | Symptom | Hại |
|-------|------|------|
| **Long function** | Function >50 dòng | Khó hiểu, test, reuse |
| **Magic number** | Code viết `86400000` trực tiếp | Meaning unclear, sửa hay sót |
| **Duplicate code** | Logic giống ở nhiều chỗ | Sửa phải sync nhiều chỗ |
| **Deep nesting** | >3 layer if/for | Logic như mê cung |
| **Long parameter list** | Param >4 | Call khó, dễ sai order |
| **God class** | 1 class/module làm nhiều việc | Trách nhiệm không rõ, sửa 1 break nhiều |

::: tip Core insight
Smell không phải "error", mà "signal". Cho biết: design ở đây có thể cần improve. Không phải mọi smell cần fix ngay, nhưng phải có khả năng identify.
:::

---

## 2. Refactoring techniques

### 2.1 Refactoring là gì?

Definition chính xác: **không đổi external behavior, improve internal structure**.

Key: "không đổi external behavior". Refactor không phải rewrite, không add feature, không fix bug. Là "organize" code internal.

<RefactoringDemo />

### 2.2 Common techniques

**Extract function**

Technique dùng nhất. Khi 1 đoạn code có thể tóm tắt bằng tên có nghĩa → extract thành function.

```javascript
// Before
function printReport(data) {
  // Calc total
  let total = 0
  for (const item of data.items) {
    total += item.price * item.qty
  }
  // Print...
}

// After
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function printReport(data) {
  const total = calculateTotal(data.items)
  // Print...
}
```

**Rename**

Naming tốt = doc rẻ nhất + hiệu quả nhất. Khi cần comment giải thích variable/function = name không đủ tốt.

```javascript
// Before
const d = new Date() - startTime
const arr = users.filter(u => u.a)

// After
const elapsedMs = new Date() - startTime
const activeUsers = users.filter(user => user.isActive)
```

**Replace nested conditional với guard clauses**

```javascript
// Before
function getPayAmount(employee) {
  if (employee.isSeparated) {
    return { amount: 0 }
  } else {
    if (employee.isRetired) {
      return { amount: employee.pension }
    } else {
      return { amount: employee.salary }
    }
  }
}

// After
function getPayAmount(employee) {
  if (employee.isSeparated) return { amount: 0 }
  if (employee.isRetired) return { amount: employee.pension }
  return { amount: employee.salary }
}
```

::: tip Refactor safety net
Risk lớn nhất refactor = "sửa sửa sửa thành bug". Prerequisite refactor = **test coverage**. Mỗi small step refactor → run test, đảm bảo behavior không đổi. Code không test → bổ sung test trước → refactor sau.
:::

---

## 3. Code review

### 3.1 Sao cần?

CR = 1 trong cách hiệu quả nhất đảm bảo quality. Giá trị không chỉ bug detection:

- **Knowledge share**: team biết code nhau, giảm "bus factor"
- **Unify style**: convention dần thành standard team
- **Phát hiện design issue sớm**: khó fix hơn bug = bad architecture
- **Mutual learning**: đọc code người khác = shortcut improve

### 3.2 Review gì?

| Dim | Focus |
|------|--------|
| **Correctness** | Logic đúng? Edge case handle? |
| **Readability** | Naming rõ? Structure dễ hiểu? |
| **Security** | Injection risk? Sensitive data expose? |
| **Performance** | Issue rõ ràng? N+1 query? |
| **Test** | Có test tương ứng? Cover critical path? |

### 3.3 Etiquette

CR tốt = **bàn về code, không phải critize người**:

- "Chúng ta" thay vì "bạn": ~~"Bạn sai đây"~~ → "Đây có thể guard clause"
- Ask thay vì command: ~~"Đổi const"~~ → "Variable này sau sẽ reassign? Nếu không, const an toàn hơn"
- Give reason: không chỉ "không tốt", mà "sao không tốt" + "thế nào tốt hơn"

---

## 4. Code quality metrics

### 4.1 Cyclomatic complexity

Cyclomatic complexity = số path độc lập trong code. Mỗi `if`, `for`, `case`, `&&`, `||` tăng complexity.

| Complexity | Evaluation | Recommend |
|--------|------|------|
| 1-10 | Simple | Dễ hiểu + test |
| 11-20 | Medium | Cân nhắc tách |
| 21-50 | Complex | Phải refactor |
| 50+ | Unmaintainable | Refactor khẩn |

### 4.2 Code coverage

| Type | Note |
|------|------|
| Line coverage | % code line được execute |
| Branch coverage | % branch được execute |

::: tip Coverage trap
80% coverage ≠ code tốt. Coverage chỉ cho biết "code nào không test", không cho biết "test có nghĩa không". Test `expect(true).toBe(true)` tăng coverage nhưng vô giá trị.
:::

### 4.3 Practical tools

| Tool | Use |
|------|------|
| **ESLint** | JS/TS static analysis |
| **Prettier** | Code format, unify style |
| **SonarQube** | Comprehensive quality platform |
| **Husky** | Git hooks, pre-commit check |

---

## 5. AI assist code quality

LLM ở code quality cực practical, có thể làm "24/7 code reviewer".

### 5.1 Identify code smells

> **Prompt**:
> ```
> Review code, identify code smell, bao gồm:
> long function, magic number, duplicate code, deep nesting, long param list.
> Mỗi issue: location + description + improvement.
>
> [paste code]
> ```

### 5.2 Auto refactor

> **Prompt**:
> ```
> Refactor code:
> 1. Không đổi external behavior
> 2. Dùng extract function, guard clause
> 3. Improve naming, loại magic number
> 4. Giải thích mỗi step refactor
>
> [paste code]
> ```

### 5.3 Mock code review

> **Prompt**:
> ```
> Review code as senior dev, feedback từ:
> - Correctness: logic có bug? Edge case?
> - Readability: naming rõ? Structure dễ?
> - Performance: issue rõ?
> - Security: injection / data leak risk?
> Tone "suggest" not "command", give improvement.
>
> [paste code]
> ```

::: tip AI caveat
AI refactor suggestion phải self-verify — run test confirm behavior unchanged. Treat AI as "colleague suggesting", không "authority trust unconditionally".
:::

---

## 6. Tổng kết

1. **Identify**: smell code, biết chỗ cần improve
2. **Refactor**: safe techniques, small step under test protection
3. **Collaborate**: CR, team guard quality together
4. **Measure**: objective metric track code health

::: tip Insight cuối
Code quality không one-time, mà ongoing habit. Như giữ phòng sạch — không phải đợi lộn xộn mới big clean, mà daily tidy. **Boy Scout Rule**: leave code cleaner than you found it.
:::

::: tip 2026 cho VN dev
- **Modern stack 2026**:
  - **ESLint flat config**: format mới
  - **Biome**: thay ESLint + Prettier, faster (Rust)
  - **Knip**: tìm dead code TypeScript
  - **CodeRabbit / Greptile**: AI-powered code review
- **VN context**:
  - Startup: ESLint + Prettier + Husky đủ
  - Enterprise: SonarQube + strict review process
- **AI-era**:
  - Copilot, Cursor catch many bug + smell tự động
  - GPT-4 / Claude review PR efficient
  - Codium AI auto-gen test
- **Bài tập**: configure ESLint + Prettier + Husky cho 1 project
:::

## Tài liệu

- [Refactoring (Martin Fowler) 2nd ed](https://martinfowler.com/books/refactoring.html)
- [Clean Code (Robert C. Martin)](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Google Engineering Practices](https://google.github.io/eng-practices/)
- [Refactoring Guru](https://refactoring.guru/)
