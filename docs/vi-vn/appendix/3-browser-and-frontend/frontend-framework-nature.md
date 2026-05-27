# Bản chất của FE Framework

> 💡 **Hướng dẫn**: bài này trả lời câu hỏi cốt lõi — **FE framework (Vue, React, Svelte) thực sự làm gì?** Nếu chỉ học HTML, CSS, JS basic, không sao, ta bắt đầu từ zero.

Concept nền:
- **HTML**: khung xương web, define element (tiêu đề, đoạn, button, ảnh). Xem [HTML + CSS Layout](./html-css-layout.md)
- **JavaScript**: cho web "động", sửa content, respond user. Xem [JS Deep Guide](./javascript-deep-dive.md)

### DOM là gì?

DOM = Document Object Model.

Khi browser mở web, đọc HTML xong, không hiển thị HTML text trực tiếp, mà **convert thành tree structure** lưu trong memory. Tree này = DOM tree.

Mỗi node = 1 HTML tag. Quan hệ nest giữa tag → quan hệ parent-child trong DOM tree.

<WhatIsDomDemo />

**Sao cần hiểu DOM?** Vì JS sửa page = op DOM tree (add/remove/modify node). Framework auto hoá các op DOM này.

---

## 0. Mở đầu: "FE framework" là gì?

**Framework** = bộ code + rule đã viết sẵn, quy định code bạn organize + run thế nào. Viết theo cách của nó, nó lo nhiều việc lặp + phức tạp underlying.

**FE framework** = chuyên build UI web. Phổ biến: Vue, React, Svelte, Angular.

<FrameworkMotivationDemo />

---

## 1. Vấn đề core: data đổi, UI thế nào?

### 1.1 "Data" và "UI" là gì?

Mọi web app có 2 thứ cùng tồn tại:

- **Data (State)**: info trong program. Vd "cart 3 món", "user là Hoàng", "tab thứ 2 đang chọn". Lưu trong JS variable, user không thấy.
- **UI**: cái user thấy trên màn hình. Vd "Cart(3)", "Hi Hoàng", tab 2 highlight. Là visual của HTML element.

**Data ↔ UI có quan hệ**: data "3 món" → UI hiển thị "3". Data thành "4 món" → UI cũng đổi "4".

Vấn đề: **ai chịu trách nhiệm "follow đổi"?**

<DataUIGapDemo />

### 1.2 Sao JS variable đổi, UI không auto đổi?

Đây là chỗ newbie hay confused.

Trong JS, variable = vùng memory chứa data. Khi execute `count = count + 1`, JS engine làm: đổi value count trong memory từ 3 thành 4. **Xong, không xảy ra gì khác.**

Content trên page (vd `<span>3</span>` node) lưu trong vùng memory **hoàn toàn khác**. JS engine sửa variable không biết DOM node đang hiển thị giá trị variable, không có cơ chế tự check.

Bản chất: **JS variable + DOM node là 2 vùng memory độc lập, không có cơ chế auto link.**

```javascript
let count = 3
// Page có DOM node: <span id="counter">3</span>

count = 4
// JS engine: chỉ đổi count trong memory thành 4
// Page <span> vẫn hiển thị "3"
```

Muốn page đổi thành "4", phải **viết thêm code**, tìm DOM node, sửa content:

```javascript
count = 4
document.getElementById('counter').textContent = count
```

Nếu page có 5 chỗ hiển thị count, phải viết 5 đoạn. **Sót 1 đoạn → chỗ đó vẫn giá trị cũ → user thấy info sai.**

### 1.3 Framework làm gì? 2 bước auto connect

**Bước 1: trong template "đăng ký" chỗ nào hiển thị variable**

```html
<!-- Vue template -->
<span>Cart: {{ count }} món</span>      <!-- Vị trí A -->
<span>Tổng: ¥{{ count * 99 }}</span>    <!-- Vị trí B -->
<span>{{ count > 5 ? 'Nhiều' : 'OK' }}</span>  <!-- Vị trí C -->
```

Render lần đầu, framework record: **A, B, C đều depend count**.

**Bước 2: framework monitor variable, đổi → check đăng ký → auto update**

Framework dùng `Proxy` của JS để "bọc" variable. Khi sửa variable, Proxy lén thông báo framework "count đổi". Framework check đăng ký, update A, B, C.

```
Native JS:
  Viết HTML → <span>3</span> (không connect với variable)
  Sửa variable → count = 4 → xong, UI không đổi
  Thêm code → document.getElementById('counter').textContent = 4 → UI update

Vue:
  Viết template → <span>{{ count }}</span> (framework nhớ: chỗ này depend count)
  Sửa variable → count = 4 → Proxy intercept → notify framework → auto update A/B/C
```

<WhyNoAutoSyncDemo />

### 1.4 So sánh thực

<ManualVsAutoSyncDemo />

**Đây là lý do tồn tại FE framework: thêm "khi sửa thì auto notify UI update" cho JS variable, loại bug do sync thủ công.**

---

## 2. Core idea: dùng data mô tả UI

### 2.1 2 cách viết

**Imperative (không framework, jQuery)**:
```javascript
var element = document.getElementById('counter')
element.textContent = '4'
document.getElementById('total').textContent = '¥396'
```

**Declarative (framework)**:
```html
<span>{{ count }}</span>
<span>Tổng: ¥{{ count * 99 }}</span>
<span v-if="count > 5">Quá nhiều!</span>
```

### 2.2 Công thức core: UI = f(State)

> **UI = f(State)**

- **State**: data app
- **f**: render mechanism của framework
- **UI**: kết quả user thấy

Data đổi → UI đổi. Dev chỉ care data, không care UI update thế nào.

<DeclarativeFormulaDemo />

### 2.3 Sao declarative tốt hơn imperative?

| Dim | Imperative | Declarative |
| :--- | :--- | :--- |
| **Code** | Mỗi update viết op cụ thể | Viết template 1 lần |
| **Bug** | Dễ sót update | Framework đảm bảo update đủ |
| **Readability** | Code lẫn DOM op | Code rõ ràng describe UI |
| **Maintain** | Sửa 1 feature → sửa nhiều chỗ | Sửa data logic, UI tự follow |

---

## 3. Reactivity: framework biết data đổi thế nào?

### 3.1 "Reactivity" là gì?

JS gốc không có "variable bị sửa tự notify". Framework cần cơ chế "phát hiện" sửa data.

**Reactivity** = cơ chế này.

### 3.2 3 cách implement

**Cách 1: Proxy intercept (Vue)**

Vue dùng `Proxy`. `Proxy` có thể execute code khi đọc/sửa property object.

Vue bọc data với Proxy. `count = 4` → Proxy intercept → notify Vue → update UI.

Dev không cần làm gì thêm — gán bình thường, Vue tự cảm.

**Cách 2: Explicit call (React)**

React không dùng Proxy. Phải gọi function chuyên:

```javascript
const [count, setCount] = useState(0)

// Không viết count = 4 (React không cảm)
// Phải:
setCount(4)
```

Chỉ khi gọi `setCount()`, React mới biết data đổi.

Cách này **explicit** hơn — mỗi data change đều chủ động báo framework.

**Cách 3: Compiler analysis (Svelte)**

Svelte có **compiler**. Trước khi code chạy, compiler phân tích source.

Thấy `count += 1`, compiler tự insert code "notify UI update" sau dòng đó. Trong code chạy, "notify" đã được compiler sắp xếp trước.

<ReactivityMechanismDemo />

### 3.3 So sánh

| Dim | Vue (Proxy) | React (Explicit) | Svelte (Compiler) |
| :--- | :--- | :--- | :--- |
| **Dev write** | Gán trực tiếp `count = 4` | Phải dùng `setCount(4)` | Gán trực tiếp `count = 4` |
| **Detect timing** | Runtime auto intercept | Dev chủ động notify | Compile time insert code |
| **Runtime overhead** | Proxy có chút overhead | setState scheduling overhead | Gần như không |
| **Debug** | Trung | Data flow rõ, dễ | Cần hiểu compile output |
| **Hợp** | Theo đuổi natural | Data flow predictable | Theo đuổi perf cực |

---

## 4. Component: chia UI thành block reusable

### 4.1 Sao chia?

1 web có nav, sidebar, content, search, avatar, button... Nếu tất cả viết 1 file → file rất dài, khó maintain.

**Component** = chia UI thành block độc lập, mỗi block quản data + UI + logic riêng.

E-commerce có thể chia:
- `NavBar`: nav trên cùng
- `SearchBox`: search box
- `ProductCard`: card sản phẩm
- `ShoppingCart`: cart

Mỗi component độc lập. `ProductCard` không cần biết code `NavBar`.

### 4.2 3 lợi ích

1. **Reuse**: `ProductCard` viết 1 lần, dùng 100 lần với data khác.
2. **Encapsulation**: nội bộ data + logic độc lập. Sửa `SearchBox` không ảnh hưởng `ProductCard`.
3. **Maintain**: lỗi 1 feature, định vị component đó để fix.

<ComponentTreeDemo />

### 4.3 Component trong code

Vue, component = file `.vue` có 3 phần:

```html
<!-- ProductCard.vue -->
<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>Giá: ¥{{ price }}</p>
    <button @click="addToCart">Add Cart</button>
  </div>
</template>

<script setup>
const props = defineProps(['name', 'price'])
function addToCart() { /* ... */ }
</script>

<style scoped>
.card { border: 1px solid #ccc; padding: 16px; }
</style>
```

Dùng như custom HTML tag:
```html
<ProductCard name="Tai nghe" price="299" />
<ProductCard name="Bàn phím" price="599" />
<ProductCard name="Màn hình" price="1999" />
```

---

## 5. Cost DOM op: sao framework cần effort?

### 5.1 DOM op là gì?

DOM op = JS sửa node trên DOM tree. Sửa text, add element, remove, sửa style.

Op không phức tạp, nhưng browser sau op cần làm nhiều việc:
1. **Recalculate style**: node + child cần đổi CSS?
2. **Layout (Reflow)**: position + size mọi element cần tính lại
3. **Paint**: vẽ content lên screen

3 step đều có cost. Code trigger DOM op nhiều → browser execute lặp → page lag.

<DomOperationCostDemo />

### 5.2 Framework giải thế nào?

**Strategy 1: Virtual DOM + Diff (Vue, React)**

Virtual DOM = JS object có structure giống real DOM tree, nhưng chỉ trong memory.

Khi data đổi:
1. Tạo virtual DOM tree mới
2. So sánh tree mới + cũ (**Diff**)
3. Chỉ apply phần thật sự đổi vào real DOM (**Patch**)

<VirtualDomDiffDemo />

**Strategy 2: Compile-time precise (Svelte)**

Svelte không dùng virtual DOM. Compiler phân tích lúc code: "khi `count` đổi, cần update `<span>` line 3". Runtime trực tiếp định vị element đó update, skip Diff.

Lý thuyết perf tốt hơn. Phụ thuộc compiler đủ thông minh.

---

## 6. Runtime vs Compile-time: trade-off core

### 6.1 2 stage

- **Compile-time**: source code được build tool (Vite, Webpack) xử thành code browser execute được. Xảy ra trên máy bạn, trước user mở web.
- **Runtime**: code đã transform execute trong browser user. Logic core framework work ở stage này.

### 6.2 Work distribution

- **React**: đa số runtime. Virtual DOM, Diff, Patch trong browser. Linh hoạt, nhưng phải ship ~40KB runtime.
- **Vue**: hybrid. Template optimize lúc compile (mark static node), nhưng UI update qua runtime virtual DOM. ~30KB.
- **Svelte**: đa số compile-time. Compiler analyze code, gen DOM op chính xác. Runtime gần như không có code framework. Bundle nhỏ nhất.

<FrameworkSpectrumDemo />

### 6.3 Trend

Framework trend: **move work từ runtime sang compile-time**. Vì compile time không chiếm tài nguyên user, không ảnh hưởng load.

- **Vue Vapor Mode**: skip virtual DOM, compile-time gen DOM op
- **React Compiler**: auto optimize re-render
- **Svelte 5 Runes**: enhance compile analysis

---

## 7. Tổng kết

**Vấn đề core FE framework**: data đổi → auto, hiệu quả, đáng tin update UI, không phải DOM op thủ công.

**Idea chung**: UI = f(State).

**Tech difference key**:

| Tech | Nghĩa |
| :--- | :--- |
| **Reactivity** | Cách detect data đổi. Vue Proxy, React setState, Svelte compiler |
| **Virtual DOM** | Vue + React dùng JS object mô phỏng DOM tree, Diff để minimal real DOM op |
| **Componentization** | Chia UI thành block độc lập reusable |
| **Compile-time optimization** | Pre-analyze ở build stage, giảm runtime compute. Svelte đi xa nhất |

**1 câu**: FE framework bản chất = take over quá trình sync "data → UI", dev chỉ care data logic.

---

## Glossary

| Term | Plain |
| :--- | :--- |
| **Framework** | Code + rule pre-written, base cho app |
| **DOM** | Tree structure từ HTML, JS op để sửa page |
| **Virtual DOM** | JS object mô phỏng DOM tree, Diff để minimal update |
| **State** | Data app |
| **Reactivity** | Khi data đổi, system auto cảm + update UI |
| **Proxy** | JS built-in, intercept read/write object. Vue 3 dùng |
| **Component** | Block UI độc lập + reusable |
| **Declarative** | Mô tả "cần gì", framework lo |
| **Imperative** | Bảo "làm thế nào" |
| **Diff** | So sánh 2 virtual DOM tree |
| **Patch** | Apply diff vào real DOM |
| **Compile-time** | Stage build, trước user mở web |
| **Runtime** | Stage browser execute code |
| **Compiler** | Convert source code sang form khác |

::: tip 2026 cho VN dev
- **Vue Vapor**: skip virtual DOM, perf gần Svelte
- **React Compiler stable**: auto memoization, không cần `useMemo`/`useCallback` thủ công
- **Svelte 5 Runes**: explicit reactivity, hot
- **Solid.js**: fine-grained reactivity từ đầu, best perf
- **Qwik**: resumability, instant load (gen HTML + serialize state)
- **VN dev**: hiểu nguyên lý → đánh giá tech mới ra (đừng theo hype mù quáng)
:::
