# Browser Rendering Pipeline

::: tip 🎯 Core
**Sao 1 số web mượt như lụa, 1 số lag thành PPT?** Browser biến HTML/CSS/JS thành web bạn thấy thế nào? Chương này đi vào "factory" của browser, hiểu workflow, viết web perf tốt hơn.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Sao hiểu rendering pipeline |
| **2** | 5 stage của pipeline |
| **3** | Build DOM + CSSOM tree |
| **4** | Render tree |
| **5** | Layout + Reflow |
| **6** | Paint + Repaint |
| **7** | Composite + GPU acceleration |
| **8** | Event loop |
| **9** | Performance thực chiến |

---

## 1. Sao hiểu "rendering pipeline"?

### 1.1 Từ "chạy được" → "chạy nhanh"

Mới học FE, chỉ care code "chạy được không". Project lớn dần, user nhiều, sự thật khắc nghiệt: **cùng feature, page có người viết mượt, có người viết lag user muốn ném chuột**.

Như học lái xe. Newbie chỉ care "xe chạy được không", lái già care "khi nào chuyển số, khi nào phanh, lái sao tiết kiệm xăng". Browser là "xe", hiểu "tính khí" mới lái nhanh + ổn.

### 1.2 Story thực: sao "optimize" xong lại lag hơn?

::: warning Pit
1 dev e-commerce optimize trang product. Detail page lag, user phàn nàn.

Dev nghĩ: "Lag vì DOM nhiều, dùng `display:none` ẩn, sửa xong hiện lại, browser không re-render lặp".

```javascript
// "Optimize" tưởng đúng
const container = document.getElementById('list')
container.style.display = 'none'

for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.style.width = Math.random() * 100 + 'px'
  container.appendChild(item)
}

container.style.display = 'block'
```

Test xong, page **lag hơn**!

Lead nhìn code, chỉ ra: **dù element bị ẩn, mỗi sửa `style.width` vẫn trigger style calculation + layout mark. Browser làm việc vô ích background.**

Cách đúng: dùng `DocumentFragment` op batch trong memory, 1 lần insert vào DOM cuối, chỉ trigger 1 render.
:::

::: info 💡 Insight
Không hiểu workflow browser → viết code "tự tin optimize" → perf tệ hơn. **Hiểu pipeline = biết op nào đắt, op nào rẻ.**
:::

---

## 2. "Rendering pipeline" là gì?

::: tip 🤔 "Render" là gì?
Browser "vẽ" code thành web bạn thấy.

Tưởng **nhà in sách**:
- **HTML** = nội dung sách (text, image, chương)
- **CSS** = yêu cầu typography (font, color, spacing)
- **JS** = sửa động (tác giả sửa kịch bản, điều chỉnh)

Browser nhận "material", qua chuỗi "workflow", "in" ra web. Chuỗi đó = **Rendering Pipeline**.
:::

### 2.1 Ẩn dụ tiệm bánh

| Stage | 🥖 Tiệm bánh | Browser | Vd |
|------|-------------|--------------|----------|
| **1. Material** | List nguyên liệu | **Build DOM tree** | `<div><p>Hello</p></div>` → tree `div→p→"Hello"` |
| **2. Recipe** | Card công thức | **Build CSSOM tree** | `.title { color: red }` → "title text red" |
| **3. Kế hoạch** | Quyết hôm nay làm bánh nào | **Build Render Tree** | `<script>` không hiện → không trong render tree |
| **4. Vị trí** | Bày bánh vào tủ | **Layout** | "div rộng 200px cao 100px ở (50,50)" |
| **5. Trang trí** | Phết trứng, rắc mè | **Paint** | Vẽ thực "red text" lên screen |
| **6. Hoàn thiện** | Ghép bánh đẹp | **Composite** | GPU merge layer background + text + image |

### 2.2 5 stage

<RenderingPipelineDemo />

---

## 3. Stage 1: Build DOM + CSSOM

### 3.1 Sao "tree hoá"?

::: tip DOM?
**DOM** = browser biến HTML thành tree structure, để JS op page element.

Như **gia phả**:
- Trên cùng = tổ tiên (`<html>`)
- Dưới = con (`<body>`, `<head>`)
- Dưới nữa = cháu (`<div>`, `<p>`)

**Sao tree?** Vì tree dễ "tìm" và "sửa". Vd tìm "mọi element class `title`" → search tree nhanh.
:::

3 step:

**1. Tokenize**: cắt code thành "word"
```html
<div class="container"><p>Hello</p></div>
```
→ tokens: `<div>`, `class="container"`, `<p>`, `"Hello"`, `</p>`, `</div>`

**2. Parse**: ghép tokens thành "node"
- Element: `<div>`, `<p>`
- Attribute: `class="container"`
- Text: `"Hello"`

**3. Build tree**:
```
Document
└── html
    └── body
        └── div.container
            └── p
                └── "Hello"
```

### 3.2 CSSOM: "rule book" của style

CSSOM = browser biến CSS rule thành tree, để compute style cuối mỗi element.

Khác key: **CSS có "inheritance" + "cascading"**.

---

## 4. Stage 2: Build Render Tree

Merge DOM + CSSOM = **Render Tree**.

Key: **chỉ element "visible" mới trong render tree**.
- `<head>`, `<script>` không hiện → không trong render tree
- `display: none` element → không trong render tree
- `visibility: hidden` element → vẫn trong render tree (vì chiếm space)

---

## 5. Stage 3: Layout (Reflow)

**Layout** = tính position + size chính xác mỗi node.

Trigger layout (đắt):
- Thêm/xoá DOM
- Đổi size (width, height, padding, border, margin)
- Đổi font (đôi khi đổi size)
- Window resize
- Đọc property cần layout (offsetTop, scrollTop, getBoundingClientRect)

**Reflow lan rộng**: đổi 1 element có thể ảnh hưởng nhiều element khác → recalculate hết.

**Optimize**:
- Batch DOM op (DocumentFragment)
- Cache layout property (đừng đọc trong loop)
- Dùng `transform` thay `top/left` (không trigger layout)

---

## 6. Stage 4: Paint (Repaint)

**Paint** = vẽ pixel: color, border, shadow, background.

Repaint không trigger layout. Trigger:
- Đổi color, background-color, visibility
- Đổi box-shadow, outline

Cheap hơn layout, nhưng vẫn tốn nếu nhiều.

---

## 7. Stage 5: Composite + GPU

Browser hiện đại chia content thành **layers** (như Photoshop). GPU merge layers thành ảnh cuối.

**Trigger composite layer** (không trigger layout/paint):
- `transform: translate/scale/rotate`
- `opacity`
- `will-change: transform`

**Sao animation `transform` mượt hơn `width`?**
- `width` → trigger layout + paint + composite (đắt)
- `transform` → chỉ composite (GPU acceleration, mượt)

---

## 8. Event loop

JS single-thread, cùng main thread với render. Long task block render → page freeze.

```javascript
// Bad: block main thread
for (let i = 0; i < 1000000; i++) {
  doSomething(i)
}

// Good: split thành chunks
function processChunk(start, end) {
  for (let i = start; i < end; i++) doSomething(i)
  if (end < 1000000) {
    requestIdleCallback(() => processChunk(end, end + 1000))
  }
}
```

**Hỗ trợ**:
- `requestAnimationFrame`: trước paint
- `requestIdleCallback`: lúc browser rảnh
- Web Workers: thread riêng (không thao tác DOM)

---

## 9. Performance thực chiến

### 9.1 Tránh layout thrashing

```javascript
// ❌ Trigger 10 layout
for (let i = 0; i < 10; i++) {
  element.style.width = (i * 10) + 'px'
  console.log(element.offsetWidth)  // Force layout
}

// ✅ Batch read + write
const widths = []
for (let i = 0; i < 10; i++) {
  widths.push(elements[i].offsetWidth)  // Đọc hết
}
for (let i = 0; i < 10; i++) {
  elements[i].style.width = widths[i] + 'px'  // Ghi hết
}
```

### 9.2 Use transform + opacity cho animation

```css
/* ❌ Trigger layout */
@keyframes slide {
  from { left: 0; }
  to { left: 100px; }
}

/* ✅ GPU compose */
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

### 9.3 will-change hint

```css
.animated {
  will-change: transform;  /* Báo browser: chuẩn bị layer riêng */
}
```

Đừng overuse → tốn memory.

### 9.4 Virtual scrolling cho list dài

```javascript
// Long list 10000 item → render hết = lag
// Virtual scrolling: chỉ render item trong viewport (~20)
```

Libs: react-window, vue-virtual-scroller, TanStack Virtual.

### 9.5 Lazy load images

```html
<img src="image.jpg" loading="lazy" />
```

---

## Tổng kết

Browser rendering pipeline: **DOM + CSSOM → Render Tree → Layout → Paint → Composite**.

| Op | Cost | Trigger |
|------|---------|---------|
| Layout (Reflow) | Đắt | Đổi size, add/remove DOM |
| Paint (Repaint) | Trung | Đổi color, visibility |
| Composite | Rẻ | Transform, opacity |

**Golden rule**:
- Tránh layout thrashing (đọc + ghi trộn)
- Animation dùng `transform` + `opacity`
- Long list dùng virtual scrolling
- Image lazy load
- Long JS task split chunks

::: tip 2026 cho VN dev
- **View Transitions API**: smooth page transitions native browser
- **CSS @container queries**: responsive theo container, không viewport
- **Speculation Rules API**: pre-render next page
- **INP (Interaction to Next Paint)**: metric mới thay FID
- **CrUX dashboard**: Chrome User Experience Report
- **Tools**: Lighthouse, WebPageTest, Vercel Speed Insights, Sentry Performance
:::
