# JavaScript Runtime Deep Guide

::: tip Mở đầu
Đã học JS basic syntax, nhưng có nghĩ:
- Code chạy ở đâu?
- Sao cùng code chạy browser + Node.js behavior khác nhau?
- Sao code đôi khi "kẹt", đôi khi "parallel"?

Bài này dẫn sâu vào runtime env của JS: event loop, call stack, memory management. Đọc xong, hiểu sao code execute theo order nào, define bug async nhanh, optimize perf + tránh memory leak.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Runtime overview |
| **2** | Browser runtime |
| **3** | Node.js runtime |
| **4** | Event loop sâu |
| **5** | Call stack + memory |
| **6** | Thực chiến |

---

## 1. Runtime overview

::: tip 🤔 Core
**"Runtime" là gì?** JS là ngôn ngữ, sao cùng code env khác behavior khác?
:::

### 1.1 Runtime là gì

**Runtime = JS engine + API env cung cấp**

JS = "ngôn ngữ", runtime = "OS" — quyết code làm gì được, không được.

```
┌─────────────────────────────────────┐
│         JavaScript code             │
├─────────────────────────────────────┤
│      JS engine (V8)                 │  ← Parse + execute code
├─────────────────────────────────────┤
│      Runtime env (Browser/Node.js)  │  ← Cấp khả năng thêm
└─────────────────────────────────────┘
```

**Ẩn dụ: JS là "tiếng phổ thông", runtime là "thành phố"**
- Syntax JS (phổ thông) ở đâu cũng vậy
- Nhưng thành phố khác cấp tiện ích khác:
  - Browser = DOM, window, fetch (như TP có shopping mall, library)
  - Node.js = fs, http, path (như TP có factory, highway)

### 1.2 2 mainstream runtimes

| Feature | Browser | Node.js |
|------|--------|---------|
| **Use chính** | Web interaction, UI | Server, CLI tool |
| **Global object** | `window` | `global` |
| **DOM API** | ✅ | ❌ |
| **File system** | ❌ (hạn chế) | ✅ Full |
| **Module** | ES Modules | CommonJS + ES Modules |
| **Timer** | `setTimeout`, `setInterval` | Y vậy |
| **Network** | `fetch`, `XMLHttpRequest` | `http`, `https` module |

👇 So sánh env browser + Node.js:

<RuntimeEnvironmentDemo />

::: info 💡 Insight
Runtime quyết API bạn dùng được. DOM API trong browser không dùng được trong Node.js; file API trong Node.js không dùng được trong browser. Đó là sao 1 số code cần "env check".
:::

---

## 2. Browser runtime

### 2.1 Cấu tạo

```
┌─────────────────────────────────────────────┐
│            JS engine (V8/SpiderMonkey)      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              Web APIs                       │
│  DOM (op web) | BOM (op browser) | Network  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Event Loop                        │
│   Coordinate execute + event + task         │
└─────────────────────────────────────────────┘
```

### 2.2 3 loại Web APIs

**1. DOM API - op web content**
```javascript
const title = document.querySelector('h1')
title.textContent = 'Title mới'
title.style.color = 'red'
```

**2. BOM API - op browser**
```javascript
window.location.href = 'https://example.com'
localStorage.setItem('key', 'value')
history.back()
```

**3. Network API**
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
```

### 2.3 Event-driven

Browser runtime mạnh nhất là "event-driven" — code không chạy liên tục, đợi user action.

```javascript
button.addEventListener('click', () => {
  console.log('Button clicked')
})
```

| Event | Trigger | Use |
|---------|---------|---------|
| `click` | Mouse click | Button |
| `input` | Input change | Search realtime |
| `scroll` | Page scroll | Lazy load |
| `load` | Resource loaded | Init data |
| `error` | Lỗi | Error handling |

---

## 3. Node.js runtime

### 3.1 Cấu tạo

```
┌─────────────────────────────────────────────┐
│            JS engine (V8)                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Node.js built-in modules          │
│  fs (file) | http (server) | path           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          libuv event loop library           │
│      Cross-platform async I/O              │
└─────────────────────────────────────────────┘
```

### 3.2 Node.js features

**1. File system**
```javascript
const fs = require('fs')
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})
```

**2. HTTP server**
```javascript
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<h1>Hello World</h1>')
})
server.listen(3000)
```

**3. Module system**
```javascript
// CommonJS (Node.js default)
const fs = require('fs')
module.exports = { myFunction }

// ES Modules (modern)
import fs from 'fs'
export { myFunction }
```

### 3.3 Browser vs Node.js

| Feature | Browser | Node.js |
|------|--------|---------|
| **Entry** | HTML file | JS file |
| **Global** | `window`, `document` | `global`, `process` |
| **Module load** | `<script>` | `require()` / `import` |
| **Security** | Sandbox, hạn chế | Access system resource |
| **Use** | UI | Backend, tool |

---

## 4. Event loop sâu

::: tip 🤔 Core
**JS là single-thread, sao "non-blocking"?**
:::

### 4.1 Event loop là gì

**Event loop = "task scheduler" của JS**

JS single-thread, 1 lúc 1 việc. Event loop làm cảm giác "song song".

**Core**:
1. **Execute sync code** (call stack)
2. **Xử async task** (task queue)
3. **Chờ task mới** (loop)

```
Call stack              Task queue
┌─────────┐             ┌──────────┐
│ Task 1  │             │ Macro 1  │
│ Task 2  │ ←───────────│ Macro 2  │
│ Task 3  │  Xong 1, lấy │ Macro 3  │
└─────────┘   tiếp       └──────────┘
      ↓                       ↑
      └───────────────────────┘
         Event loop check liên tục
```

### 4.2 Macrotask vs Microtask

Đây là concept hay nhầm nhất!

**Macrotask**:
- `setTimeout`, `setInterval`
- I/O
- UI render

**Microtask**:
- `Promise.then`
- `MutationObserver`
- `queueMicrotask`

**Order: sync code → microtask → macrotask**

👇 Quan sát order:

<TaskQueueDemo />

### 4.3 Câu phỏng vấn kinh điển

```javascript
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')

// Output: 1, 4, 3, 2
```

**Lý do**:
1. Sync code: 1, 4
2. Microtask: Promise.then → 3
3. Macrotask: setTimeout → 2

::: info 💡 Practical
- Muốn execute sớm → microtask (`Promise.then`)
- Muốn delay → macrotask (`setTimeout`)
- Tránh mix nhiều async → "callback hell"
:::

---

## 5. Call stack + memory

### 5.1 Call stack: dấu chân function

```javascript
function a() { b() }
function b() { c() }
function c() { console.log('Done') }
a()
```

Stack change:
```
Step 1: call a()    Step 2: a→b      Step 3: a→b→c    Step 4: c done
┌─────┐             ┌─────┐           ┌─────┐          ┌─────┐
│  a  │             │  b  │           │  c  │          │  b  │
└─────┘             │  a  │           │  b  │          │  a  │
                    └─────┘           │  a  │          └─────┘
                                      └─────┘
```

<CallStackDemo />

### 5.2 Memory management

JS có **auto garbage collection** — không cần free memory thủ công.

**Mark-Sweep algorithm**:
1. **Mark**: từ "root" tìm mọi variable accessible
2. **Sweep**: variable không mark = "rác" → recycle

```javascript
let obj1 = { name: 'Object 1' }
let obj2 = { name: 'Object 2' }

obj1 = null  // Object 1 ban đầu được recycle
console.log(obj2.name)  // Object 2 vẫn dùng, không recycle
```

<GarbageCollectionDemo />

### 5.3 Memory leak

**Memory leak = memory đáng release nhưng không, tích lũy**

**1. Global variable quá nhiều**
```javascript
// ❌ Global không recycle
globalCache = []
function addItem(item) { globalCache.push(item) }
```

**2. Event listener không remove**
```javascript
// ❌
button.addEventListener('click', handleClick)

// ✅
button.removeEventListener('click', handleClick)
```

**3. Closure reference object lớn**
```javascript
// ❌ Closure reference forever
function createHandler() {
  const bigData = new Array(1000000).fill('data')
  return function() { console.log('Processing') }
}
const handler = createHandler()  // bigData luôn trong memory
```

<MemoryLeakDemo />

::: info 💡 Practical
- **Check định kỳ**: DevTools → Memory → Heap Snapshot
- **Tránh global**: dùng `const`, `let`, không `var`
- **Clean kịp thời**: event listener + timer xong remove
- **Weak reference**: `WeakMap`, `WeakSet` cho object reference
:::

---

## 6. Thực chiến

### 6.1 Performance

**1. Giảm reflow/repaint**
```javascript
// ❌ Loop trigger reflow mỗi lần
for (let i = 0; i < 1000; i++) {
  element.style.top = i + 'px'
}

// ✅ Batch
element.style.transform = `translateY(${position}px)`
```

**2. Event delegation**
```javascript
// ❌ Add listener mỗi button
buttons.forEach(btn => btn.addEventListener('click', handleClick))

// ✅ 1 listener cho parent
container.addEventListener('click', (e) => {
  if (e.target.matches('.button')) handleClick(e)
})
```

**3. Debounce + Throttle**
```javascript
// Debounce: user ngừng input mới execute
function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Throttle: limit frequency
function throttle(fn, delay) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}
```

### 6.2 Debug

**1. DevTools call stack**
```javascript
function c() {
  debugger  // Pause ở đây, xem call stack
}
```

**2. `console.trace()`**
```javascript
function trackExecution() {
  console.trace('Path')  // Output full call stack
}
```

**3. Performance analysis**
```javascript
performance.mark('start')
// ... code
performance.mark('end')
performance.measure('Loop perf', 'start', 'end')
const measure = performance.getEntriesByName('Loop perf')[0]
console.log(`Time: ${measure.duration}ms`)
```

### 6.3 FAQ

| Vấn đề | Lý do | Giải |
|------|---------|---------|
| Memory cao | Memory leak, cache quá nhiều | Check global, remove listener |
| Page lag | Long task block main thread | Split task, Web Workers |
| Event không trigger | Listener chưa bind, element không tồn tại | Check DOM ready |
| Order async sai | Mix macro + micro | Dùng Promise hoặc async/await |
| Timer không chính xác | Main thread block | Web Workers / requestAnimationFrame |

---

## Tổng kết

- **Runtime = engine + env API**, runtime khác cấp khả năng khác
- **Event loop** coordinate sync, microtask, macrotask
- **Call stack** record function execution, **stack overflow** do recursion sâu
- **GC** auto clean variable không dùng, nhưng coi chừng **memory leak**
- **Performance**: giảm reflow/repaint, dùng async hợp lý

::: info 💡 Hỏi AI thế nào
- "Function chạy chậm, optimize perf giúp"
- "Memory tăng dần, có thể leak, check giúp"
- "Async order sai, phải A trước B, hiện A và B start gần như cùng lúc"
- "Event listener không trigger, check DOM load timing"
:::

::: tip 2026 cho VN dev
- **Bun runtime**: thay Node.js, nhanh hơn 3-5x, native TS, all-in-one
- **Deno 2**: TypeScript native, security default, package từ URL
- **Edge runtime**: Cloudflare Workers, Vercel Edge — V8 isolate
- **Web Workers + SharedArrayBuffer**: true multi-threading trong browser
- **WebGPU + WASM**: heavy compute (AI inference) trong browser
- **Performance API**: User Timing Level 3, INP (Interaction to Next Paint) 2024+
:::
