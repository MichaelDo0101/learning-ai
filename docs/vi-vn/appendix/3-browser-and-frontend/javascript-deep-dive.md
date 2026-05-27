# JavaScript Deep Guide

::: tip Mở đầu
Đã học HTML + CSS, làm web đẹp được. Nhưng click button không phản ứng, submit form không gửi, web như "static image".

Đây là lý do cần JS — làm web "sống dậy". Click button hiện menu, gõ text search realtime, scroll load thêm content...

Trong vibecoding, AI viết đa phần code. Nhưng bạn phải đọc được code làm gì, không AI sai cũng không biết. Đọc xong:
- Đọc được AI code làm gì
- Thấy code chỗ nào sai
- Nói rõ cho AI sửa thế nào
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | JS là gì |
| **2** | Data + variable |
| **3** | Function + logic |
| **4** | DOM + event |
| **5** | Thực chiến |

---

## 1. JavaScript là gì

### 1.1 Từ "static web" → "dynamic app"

| 📄 Không có JS | 🚀 Có JS |
|-----------|-----------|
| Content cố định, không interact | Click button hiện menu |
| Click button không phản ứng | Gõ text search realtime |
| Submit form không gửi | Scroll auto load |
| Page không auto update | Data realtime |

| Tech | Ẩn dụ | Use |
|------|------|------|
| **HTML** | Khung xương | Define structure + content |
| **CSS** | Da | Define appearance + style |
| **JS** | Cơ + thần kinh | Cho web respond + interact + think |

### 1.2 Sao vibecoding cần hiểu JS?

::: warning Pit dev mới
1 dev JS mới dùng AI làm "counter" — click button, số +1. AI gen code chạy được.

Muốn đổi thành "+2 mỗi click", bảo AI: "mỗi click +2". AI sửa, nhưng số vẫn chỉ +1.

Hỏi AI sao không hiệu quả, AI giải thích, nhưng dev không hiểu `count = count + 1` nghĩa gì, không biết AI sửa chỗ đó không. Cứ "thêm 2 không hiệu quả", AI sửa nhiều version: có version đổi init thành 2, có version add 2 ở chỗ không liên quan.

Cuối cùng đọc chương 2 "variable", hiểu `count = count + 1` = gán count thêm 1 rồi lưu lại. Bảo AI: "đổi `count + 1` thành `count + 2`".

1 lần là OK.

**Đó là sao cần hiểu JS — không phải viết code, mà khi AI sai, bạn thấy đúng vấn đề, 1 câu nói trúng.**
:::

### 1.3 Preview: 1 đoạn code AI thực

```javascript
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
let currentIndex = 0

const button = document.querySelector('#changeBtn')

button.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % colors.length
  document.body.style.backgroundColor = colors[currentIndex]
})
```

| Code | Use | Chương |
|------|------|----------|
| `const colors = [...]` | Define color data | 2: Array |
| `let currentIndex = 0` | Record color hiện tại | 2: Variable |
| `document.querySelector(...)` | Tìm button | 4: DOM |
| `button.addEventListener(...)` | Click event | 4: Event |
| `() => {...}` | Code chạy khi click | 3: Arrow function |

::: info 💡 Insight
**JS code = chuỗi instruction bảo browser "khi user làm X, phải xảy ra gì"**
:::

---

## 2. Data + Variable

### 2.1 Variable: đặt tên data

**Variable như box có label** — bỏ data vào, lấy bằng label.

```javascript
const name = "Hoàng"   // Tên không đổi → const
let age = 25            // Tuổi có thể đổi → let
```

| Keyword | Đổi được? | Use | Vd |
|--------|---------|----------|------|
| `const` | ❌ | Value không đổi | CCCD, config, color list |
| `let` | ✅ | Value đổi | Counter, selection, input |

::: details 🔍 Vd cụ thể
```javascript
const PI = 3.14159
const MAX_USERS = 100

let count = 0
count = 1  // ✅ OK
count = count + 1  // ✅ OK

const fixedCount = 0
fixedCount = 1  // ❌ Error! const không reassign
```
:::

<VariableBoxDemo />

### 2.2 Data types

| Type | Note | Vd | Use |
|------|------|------|----------|
| `string` | Text | `"hello"` | Username, description |
| `number` | Số | `42`, `3.14` | Price, quantity |
| `boolean` | Y/N | `true`, `false` | Logged-in, completed |

**Special**:
- `undefined` → declared chưa value
- `null` → cố ý empty

::: details 🔍 Template string
```javascript
const name = "Hoàng"
const age = 25

// Traditional (phiền)
const message = "Tên " + name + ", tuổi " + age

// Template string (gọn)
const message = `Tên ${name}, tuổi ${age}`
```

Thấy backtick + `${}` → đang chèn variable vào text.
:::

### 2.3 Object + Array

**Object** = nhóm property có tên (như info card):

```javascript
const user = {
  name: "Hoàng",
  age: 25,
  isVIP: true
}

console.log(user.name)  // "Hoàng"
console.log(user.age)   // 25
```

**Array** = list có order:

```javascript
const colors = ['red', 'green', 'blue']
console.log(colors[0])  // "red"
console.log(colors[1])  // "green"
```

**Nested** (hay nhất trong AI code):

```javascript
const todos = [
  { id: 1, text: "Học JS", done: false },
  { id: 2, text: "Làm project", done: true }
]

console.log(todos[0].text)  // "Học JS"
```

::: info 💡 Nhận diện
- `{}` → object
- `[]` → array
- `data[0].name` → lấy item 0, rồi prop name
:::

### 2.4 Value vs Reference (pit hay vấp)

**Primitive (string, number, boolean) = copy value**:

```javascript
let a = 10
let b = a
b = 20
console.log(a)  // 10 (a không đổi)
```

**Object/Array = copy address (cùng trỏ về 1 thứ)**:

```javascript
let user1 = { name: "Hoàng" }
let user2 = user1
user2.name = "Linh"
console.log(user1.name)  // "Linh" (user1 cũng đổi!)
```

**Sao cần copy?** Trong React/Vue, sửa data trực tiếp UI không update. AI code hay có `[...array]` hoặc `{...obj}` — tạo copy:

```javascript
const arr1 = [1, 2, 3]
const arr2 = [...arr1]
arr2.push(4)
console.log(arr1)  // [1, 2, 3] (không đổi)
console.log(arr2)  // [1, 2, 3, 4]
```

<ReferenceDemo />

### 2.5 Destructuring + Spread

**Destructuring**: lấy data từ object/array nhanh

```javascript
const user = { name: "Hoàng", age: 25, city: "HCM" }

// Traditional
const name = user.name
const age = user.age

// Destructuring
const { name, age } = user
```

**Spread**: copy + expand

```javascript
// Array
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]  // [1, 2, 3, 4, 5]

// Object
const user1 = { name: "Hoàng", age: 25 }
const user2 = { ...user1, city: "HCM" }
```

---

## 3. Logic: Function + Flow control

### 3.1 Conditional

**if/else**:
```javascript
const age = 18
if (age >= 18) {
  console.log("Adult")
} else {
  console.log("Minor")
}
```

**Ternary** (if/else 1 dòng):
```javascript
const message = age >= 18 ? "Adult" : "Minor"
```

**`&&` short-circuit** (React hay dùng):
```javascript
isLoggedIn && <UserPanel />  // Chỉ hiện khi logged in
```

### 3.2 Function: đóng gói operation

**Function = công thức món ăn**:
- Define = viết công thức
- Call = nấu theo công thức
- Param = nguyên liệu
- Return = thành phẩm

```javascript
function greet(name) {
  return "Hello " + name
}
console.log(greet("Hoàng"))  // "Hello Hoàng"
```

**3 cách viết**:
```javascript
// 1. function declaration
function greet(name) { return "Hello " + name }

// 2. Arrow function (AI hay dùng nhất)
const greet = (name) => { return "Hello " + name }

// 3. Arrow function ngắn (1 dòng)
const greet = (name) => "Hello " + name
```

<FunctionMachineDemo />

### 3.3 Array methods

React/Vue list render hay dùng:

```javascript
const todos = [
  { id: 1, text: "Học", done: false },
  { id: 2, text: "Làm", done: true }
]

// .map(): biến mỗi item thành cái khác
const texts = todos.map(todo => todo.text)
// ["Học", "Làm"]

// .filter(): lọc
const unfinished = todos.filter(todo => !todo.done)

// .find(): tìm cái đầu match
const found = todos.find(todo => todo.id === 1)
```

### 3.4 Scope

**Ẩn dụ "phòng"**:
- Variable trong function = đồ trong phòng, ngoài không thấy
- Nhưng người trong phòng thấy được hành lang (outer scope)

```javascript
const global = "Hành lang"
function room() {
  const local = "Trong phòng"
  console.log(global)  // ✅ Thấy hành lang
}
console.log(local)  // ❌ Ngoài không thấy đồ trong phòng
```

<ScopeDemo />

### 3.5 Closure: function "nhớ" env lúc sinh

```javascript
function setupCounter() {
  let count = 0
  return {
    add: () => { count++; return count },
    getCount: () => count
  }
}

const counter = setupCounter()
counter.add()       // 1
counter.add()       // 2
counter.getCount()  // 2
```

**Core**: function nhớ variable xung quanh lúc tạo, dù outer function đã chạy xong.

<ClosureDemo />

### 3.6 `this`: ai gọi function

**Scenario 1: trong method object, `this` trỏ object**:
```javascript
const user = {
  name: "Hoàng",
  sayHi() {
    console.log("Hi, " + this.name)  // this = user
  }
}
```

**Scenario 2: trong event listener, `this` trỏ element trigger**:
```javascript
button.addEventListener('click', function() {
  console.log(this)  // this = button
})

// Arrow function không đổi this
button.addEventListener('click', () => {
  console.log(this)  // this = outer this
})
```

::: info 💡 Bug
AI code có bug this (vd `Cannot read property of undefined`) → bảo AI: "method này `this` sai, đổi arrow function hoặc dùng bind"
:::

---

## 4. Interaction: DOM, Event, Async

### 4.1 DOM: web qua mắt JS

Web trong JS = "tree", mỗi HTML tag = node.

```html
<html>
  <body>
    <h1>Title</h1>
    <p>Paragraph</p>
  </body>
</html>
```

**JS op web = find node + modify node + create/delete node**

<DOMTreeDemo />

### 4.2 Find + modify

```javascript
// Find (CSS selector, hay dùng)
const title = document.querySelector('h1')
const button = document.querySelector('#btn')
const items = document.querySelectorAll('.item')

// Modify
title.textContent = "Title mới"
element.style.color = "red"
element.classList.add('active')
element.classList.remove('hidden')
element.classList.toggle('open')
```

### 4.3 Event

```javascript
button.addEventListener('click', () => {
  console.log("Clicked")
})
```

| Event | Trigger | Use |
|------|---------|----------|
| `click` | Click | Button, link |
| `input` | Input change | Realtime search |
| `submit` | Form submit | Login, register |
| `scroll` | Scroll | Lazy load |

```javascript
input.addEventListener('input', (e) => {
  console.log(e.target.value)
  e.preventDefault()  // Chặn default behavior
})
```

### 4.4 Async

**Ẩn dụ nhà hàng**: order xong không đứng ở cửa bếp đợi, làm việc khác, món xong phục vụ mang ra.

```javascript
// Sync (block page, đừng dùng)
const data = fetch('/api/data')  // ❌ block

// Async (đúng)
async function loadData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Lỗi:', error)
  }
}
```

- `async` → mark function có async
- `await` → đợi op xong (không block)
- `try/catch` → handle error

<AsyncRestaurantDemo />

### 4.5 Event loop

**JS = "1 person workstation"**, 1 lúc 1 việc, có "todo sticky notes" (task queue).

Gặp op đợi (network, timer), JS không đợi ngu, dán "xong làm gì" lên notes, mình tiếp tục. Xong việc hiện tại, mới xem notes.

```javascript
console.log("1")
setTimeout(() => console.log("2"), 0)
console.log("3")
// Output: 1, 3, 2 (không phải 1, 2, 3!)
```

**Vì sao?**
1. `console.log("1")` → 1
2. `setTimeout` → dán callback lên notes, tiếp tục
3. `console.log("3")` → 3
4. Code hiện tại xong, xem notes
5. Chạy callback `setTimeout` → 2

<JSEventLoopDemo />

### 4.6 Module: import/export

AI gen React/Vue code line đầu hầu hết là `import`.

**import = lấy function từ file khác**:
```javascript
import { formatDate } from './utils'
import React from 'react'
import { useState } from 'react'
```

**export = expose function**:
```javascript
// utils.js
export function formatDate(date) { ... }

// Hoặc default
export default function formatDate(date) { ... }
```

**npm package = tool người khác viết, install xong dùng**:
```javascript
// npm install lodash
import _ from 'lodash'
```

---

## 5. Thực chiến

### 5.1 Đọc AI code thế nào

**4 step**:

| Step | Xem | Vd |
|------|--------|------|
| **1. Cấu trúc** | Có mấy function? Làm gì? | `loadData()` load, `renderList()` render |
| **2. Tìm entry** | Code start từ đâu? | `addEventListener('click', ...)` |
| **3. Theo data flow** | Data từ đâu, đi đâu? | API → parse → render |
| **4. Detail logic** | Function cụ thể xử thế nào? | Loop, judge, calc |

### 5.2 Error thường gặp

| Error | Nghĩa | Bảo AI |
|------|-----------|-------------|
| `TypeError: Cannot read properties of undefined` | Truy cập prop của thứ không tồn tại | "Line X báo, biến undefined, check gán" |
| `ReferenceError: xxx is not defined` | Variable chưa declare | "Variable xxx chưa define, typo hoặc quên import?" |
| `TypeError: xxx is not a function` | Call cái không phải function | "xxx không phải function, check type + source" |
| `SyntaxError: Unexpected token` | Syntax sai | "Line X syntax error, check ngoặc + punctuation" |
| `CORS error` | Browser chặn cross-origin | "CORS error, cần config CORS" |
| `404 Not Found` | Resource không tồn tại | "API trả 404, check URL" |

### 5.3 Mô tả vấn đề chính xác

Khoảng cách newbie vs pro: **độ chính xác mô tả vấn đề**.

| ❌ Tệ | ✅ Tốt |
|-----------|-----------|
| "Code có bug" | "Click delete button, xoá item cuối thay vì current" |
| "Style sai" | "Title phải center, hiện đang left" |
| "Data không hiện" | "fetch trả data (console thấy), nhưng page không re-render" |
| "Add feature" | "Trong user list page add search box, gõ filter realtime theo name fuzzy" |
| "Click không phản ứng" | "Click button console báo 'Cannot read property of undefined' line X" |

### 5.4 Code bạn đọc được

- `const/let` → biết có reassign được không
- `{}` → object / `[]` → array
- `{...obj}` / `[...arr]` → tạo copy
- `function` / `=>` → define op
- `if/else` / `? :` → judge
- `.map()` / `.filter()` → transform/filter array
- `document.querySelector` → tìm element
- `addEventListener` → listen user action
- `async/await` → đợi op tốn time
- `import/export` → import/export module

**Concept core**:
- **Value vs Reference**: primitive copy value, object/array copy address
- **Scope + closure**: function "nhớ" variable xung quanh lúc sinh
- **`this` bản chất**: tuỳ ai gọi function
- **Event loop**: JS single-thread, dùng task queue "non-blocking"

::: info 💡 Bảo AI
- "Line X báo XXX, check giúp"
- "Function logic XXX, kết quả sai, phải là XXX"
- "Muốn sửa XXX feature, yêu cầu cụ thể XXX"
:::

::: tip 2026 cho VN dev
- **ES2024+ features**: `Object.groupBy`, `Promise.withResolvers`, top-level await
- **Bun runtime**: faster JS runtime, native TS support
- **TypeScript là standard**: dự án mới phải dùng TS
- **No callback hell**: async/await mặc định, Promise.then ít dần
- **Web Streams**: ReadableStream cho LLM streaming
- **Temporal API**: thay Date (đợi browser support)
- **VN dev**: ECMAScript Modules (ESM) chuẩn, CommonJS dần out
:::
