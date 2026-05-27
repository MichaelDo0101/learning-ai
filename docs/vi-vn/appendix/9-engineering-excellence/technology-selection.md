# Tech Selection Methodology

::: tip Mở đầu
**React hay Vue? MySQL hay PostgreSQL?** Tech selection = decision quan trọng nhất đầu mỗi project. Chọn sai = vài tháng rewrite; chọn đúng = team efficiency × 2.

Chương này: build tư duy systematic, không "chọn theo cảm giác".
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Tech radar (maturity) |
| **2** | Selection dimensions |
| **3** | Decision matrix |
| **4** | Common pitfalls |

---

## 0. Toàn cảnh: bản chất tech selection

Không phải "tech nào tốt nhất", mà "tech nào phù hợp scenario hiện tại". Như chọn phương tiện — máy bay nhanh nhất, nhưng đi khu phố không cần máy bay.

::: tip Core principles
- **No silver bullet**: không tech nào phù hợp mọi scenario
- **Scenario-driven**: hiểu requirement trước, chọn tech sau
- **Team first**: tech team quen thường là choice tốt nhất
- **Reversibility**: ưu tiên solution dễ replace
:::

<TechRadarDemo />

---

## 1. Selection dimensions

### 1.1 Core evaluation

| Dim | Focus | Weight |
|------|--------|---------|
| **Team ability** | Team quen không? Learning cost? | Cao |
| **Community** | Doc, 3rd-party lib, Stack Overflow count | Cao |
| **Performance** | Đáp ứng yêu cầu? | Trung-cao |
| **Maintenance** | Active maintain? Latest release? | Trung |
| **License** | Compatible business model? | Trung |
| **Hiring market** | Tuyển được người? | Trung |

### 1.2 Case: FE framework selection

```
Project: enterprise internal admin
Team: 5 người (3 Vue, 1 React, 1 newbie)
Need: form-heavy, complex permission, no SEO needed

Analysis:
- 60% team quen Vue → Vue priority
- Form-heavy → Element Plus mature
- No SSR → Không cần Next/Nuxt
- → Vue 3 + Element Plus
```

---

## 2. Decision matrix

Khi multi option khó judge trực giác → quantify.

<DecisionMatrixDemo />

### 2.1 Cách dùng

1. **List candidates**: React vs Vue vs Svelte
2. **Define dimensions**: team ability, ecosystem, perf, learning curve
3. **Assign weights**: theo project need, total 100%
4. **Score each item**: 1-5
5. **Weighted sum**: final score

### 2.2 Example

| Dim | Weight | React | Vue | Svelte |
|------|------|-------|-----|--------|
| Team ability | 30% | 3 | 5 | 1 |
| Ecosystem | 25% | 5 | 4 | 2 |
| Learning curve | 20% | 3 | 4 | 5 |
| Performance | 15% | 4 | 4 | 5 |
| Hiring | 10% | 5 | 4 | 2 |
| **Total** | | **3.75** | **4.35** | **2.75** |

---

## 3. Common pitfalls

### 3.1 Resume-driven dev

> "Dùng tech mới, CV thêm 1 dòng"

Chọn tech phải dựa project need, không CV cá nhân. Tech mới = unknown risk + ít community support.

### 3.2 Chase the new

| Mindset | Reality |
|------|------|
| "Mới chắc tốt hơn cũ" | Mới có thể bug undetected |
| "Big tech dùng, mình cũng dùng" | Scenario big tech ≠ scenario bạn |
| "Tech nhiều star nhất" | Star ≠ phù hợp project |

### 3.3 Bỏ qua migration cost

Selection không chỉ xem "dùng thế nào", mà còn "đổi thế nào". Ưu tiên:
- Standard protocol (SQL vs proprietary query)
- Clear migration path
- Không deep lock-in

---

## 4. AI assist tech selection

LLM giúp research nhanh, compare, gen decision report.

### 4.1 Compare options

> **Prompt**:
> ```
> Tôi chọn DB cho e-commerce, candidate: MySQL, PostgreSQL, MongoDB.
> Đặc điểm: read-heavy, complex query, data ~10M.
>
> Compare 5 dim: perf, ecosystem, learning curve, ops cost, scalability.
> Table format, kèm recommend + lý do.
> ```

### 4.2 Generate ADR

> **Prompt**:
> ```
> Viết ADR format:
> - Title: Chọn Vue 3 cho FE framework
> - Context: [background]
> - Options: React, Vue 3, Svelte
> - Decision: Vue 3
> - Rationale: [team, ecosystem, perf]
> - Consequences: [impact, risk]
> ```

### 4.3 Research new tech

> **Prompt**:
> ```
> Cân nhắc thay Node.js bằng Bun. Phân tích:
> 1. Bun pros/cons vs Node.js
> 2. Ecosystem maturity (npm compat, framework support)
> 3. Production risk
> 4. Bun phù hợp/không phù hợp scenario
> Đánh giá khách quan, đừng chỉ nói pros.
> ```

::: tip AI caveat
AI knowledge có cutoff — không biết latest version. Tech iterate nhanh → AI initial research → verify official doc.
:::

---

## 5. Tổng kết

1. **Tech radar**: maturity (Adopt/Trial/Assess/Hold)
2. **Dimensions**: team > community > performance > maintenance
3. **Decision matrix**: quantify, giảm bias subjective
4. **Pitfalls**: đừng chase new, đừng follow blindly, consider migration cost

::: tip Insight cuối
**Tech selection tốt nhất thường là "boring" nhất**. Chọn mature, stable, team quen. Innovation effort dành cho **business itself**. Nhớ: **tech là means, không phải end. User không care framework, chỉ care product có dùng tốt không.**
:::

::: tip 2026 cho VN dev
- **Resources**:
  - **ThoughtWorks Tech Radar**: 6 tháng/lần, authoritative
  - **State of JS / State of HTML**: yearly community survey
  - **JetBrains State of Developer Ecosystem**
- **VN scenario**: tech VN dev quen
  - FE: Vue / React (tuỳ region, HCM nghiêng React)
  - BE: Node.js, Python (FastAPI), Java (Spring Boot)
  - Mobile: Flutter dominant cho cross-platform
- **AI-era 2026**: AI assistant (Cursor, Claude Code) khiến team có thể adopt tech mới nhanh hơn — vì AI có thể fill gap kiến thức
:::

## Tài liệu

- [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar)
- [State of JS](https://stateofjs.com/)
- [Decision matrix examples](https://martinfowler.com/articles/cant-buy-integration.html)
