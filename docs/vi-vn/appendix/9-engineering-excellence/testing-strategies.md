# Testing Strategies

::: tip Mở đầu
**Code bạn thật sự "không vấn đề"?** Mỗi lần sửa xong, click manual xem có hỏng — cách này OK khi project nhỏ, nhưng project lên vài chục nghìn dòng + team chục người = thảm hoạ.

Chương này: hiểu core strategy software testing, từ test pyramid đến TDD, build tư duy systematic quality assurance.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Test pyramid |
| **2** | Unit test practical |
| **3** | TDD |
| **4** | Strategy selection |

---

## 0. Toàn cảnh: sao cần automated test?

Tưởng bạn là kỹ sư xây dựng. Mỗi sửa drawing không trèo từng tầng check structure — dùng **automated detection system**. Software test = "structural detection system" cho code.

::: tip Giá trị automated test
- **Regression protection**: sửa A, auto check B, C, D có ảnh hưởng không
- **Refactor confidence**: code có test → refactor an tâm
- **Living doc**: test tốt = best manual
- **Fast feedback**: vài giây biết code đúng/sai, không đợi deploy
:::

---

## 1. Test pyramid

### 1.1 3 layer

Mike Cohn's test pyramid = classic strategy model. **Mỗi loại test có proportion khác**.

<TestPyramidDemo />

### 1.2 Sao pyramid?

Reflect trade-off **speed vs realism**:

- **Bottom (unit)**: fast, most numerous, cheap, nhưng chỉ verify single piece
- **Middle (integration)**: medium, verify piece collaboration
- **Top (E2E)**: gần real user, nhưng slow, expensive maintain, brittle

> **Anti-pattern: ice-cream cone** — E2E nhiều, unit ít. Test suite chậm, hay fail, maintain expensive.

---

## 2. Unit test practical

### 2.1 FIRST principles

| Principle | Meaning | Note |
|------|------|------|
| **F**ast | Nhanh | ms-level, dev willing run thường xuyên |
| **I**ndependent | Độc lập | Test không depend nhau, run riêng được |
| **R**epeatable | Lặp được | Bất kỳ env kết quả giống |
| **S**elf-validating | Tự verify | Pass/fail rõ, không cần judge |
| **T**imely | Đúng lúc | Viết test cùng (hoặc trước) code |

### 2.2 AAA pattern

Mỗi test có 3-section structure:

```javascript
test('Tính price với tax', () => {
  // Arrange
  const price = 100
  const taxRate = 0.13

  // Act
  const result = calculateTotalWithTax(price, taxRate)

  // Assert
  expect(result).toBe(113)
})
```

### 2.3 Test gì? Không test gì?

**Should test**:
- Core business logic (price calc, permission, transform)
- Edge case (null, zero, negative, huge)
- Error path

**Don't test**:
- 3rd-party lib internal
- Simple getter/setter
- Framework built-in (Vue reactivity)

---

## 3. TDD: Test-Driven Development

### 3.1 Red-Green-Refactor

TDD core = simple cycle: **write test → write impl → refactor**.

<TDDCycleDemo />

### 3.2 3 rules

1. **Don't write production code, except to pass failing test**
2. **Write just enough test code to fail** (compile error counts as fail)
3. **Write just enough production code to pass test**

### 3.3 Real value

Value không chỉ "test trước", mà **force think interface design**. Test trước = từ "user" view: function nhận param gì? Return gì? Tự nhiên hướng API tốt hơn.

::: tip TDD không silver bullet
TDD hợp logic-heavy (algorithm, business rule, data transform), nhưng UI layout, exploratory prototype → force TDD slow xuống. Key = hiểu ideology, apply linh hoạt.
:::

---

## 4. Strategy selection

### 4.1 Project khác, focus khác

| Type | Focus | Proportion |
|----------|----------|----------|
| Tool/SDK | Unit | 90% unit + 10% integration |
| API service | Integration | 30% unit + 60% integration + 10% E2E |
| Web app | Balance | 50% unit + 30% integration + 20% E2E |
| MVP/prototype | Critical path E2E | Few core test |

### 4.2 Common tools

| Tool | Type | Use |
|------|------|----------|
| **Vitest** | Unit/integration | Vite first choice, Jest API compatible |
| **Jest** | Unit/integration | Node.js most popular |
| **Playwright** | E2E | Cross-browser, Microsoft |
| **Cypress** | E2E | DX tốt, debug dễ |
| **Testing Library** | Component | User-perspective UI test |

---

## 5. AI assist testing

### 5.1 Gen unit test

> **Prompt**:
> ```
> Viết unit test cho function sau, Vitest framework:
> 1. AAA pattern
> 2. Cover normal + edge + error path
> 3. Mỗi test case có description rõ
>
> [paste function]
> ```

### 5.2 Phát hiện edge case

> **Prompt**:
> ```
> Phân tích function, list mọi edge condition + extreme input:
> null, zero, negative, huge, special char, concurrent.
> Mỗi scenario: expected behavior + risk.
>
> [paste function]
> ```

### 5.3 Requirement → test (TDD assist)

> **Prompt**:
> ```
> Implement shopping cart module:
> - Add/delete/update qty
> - Auto total price (kèm discount)
> - Báo error khi out of stock
>
> Theo TDD, viết test cases trước (no impl), Vitest, cover mọi core scenario.
> ```

::: tip AI caveat
AI gen test phải check assertion có nghĩa — tránh `expect(true).toBe(true)`. Test tốt phải fail khi code sai.
:::

---

## 6. Tổng kết

1. **Pyramid**: bottom nhiều, top ít, balance speed + realism
2. **Unit test**: FIRST + AAA, test core logic
3. **TDD**: Red-Green-Refactor, test drive design
4. **Selection**: theo project + stage

::: tip Insight cuối
Test không phải burden, mà **accelerator**. Short-term tốn time, long-term save vô số lần manual verify + regression debug + late-night emergency fix. Test tốt = tự tin "refactor được, test sẽ tell."
:::

::: tip 2026 cho VN dev
- **Modern stack 2026**:
  - **Vitest**: chuẩn cho Vite project
  - **Playwright**: E2E dominant
  - **MSW (Mock Service Worker)**: mock API
  - **Testing Library**: React/Vue component test
- **VN context**:
  - Startup: Vitest đủ ban đầu
  - Enterprise: Jest legacy + Playwright cho E2E
- **AI testing**:
  - **GitHub Copilot**: gen test tự động
  - **Codium**: AI-powered test generation
  - **Diffblue (Java)**: AI gen test JUnit
:::

## Tài liệu

- [Kent Beck - TDD by Example](https://www.oreilly.com/library/view/test-driven-development/0321146530/)
- [Martin Fowler - Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Vitest docs](https://vitest.dev/)
- [Playwright docs](https://playwright.dev/)
