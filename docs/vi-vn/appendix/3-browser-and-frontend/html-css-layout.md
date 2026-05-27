# HTML / CSS Layout System

::: tip Mở đầu
Web có 3 nền tảng: **HTML** (skeleton), **CSS** (skin), **JavaScript** (brain). Chương này giải thích role mỗi cái + workflow cộng tác.
:::

---

## 1. HTML, CSS, JS lần lượt là gì?

| Tech | Vai trò | Vd |
|------|---------|---------|
| **HTML** | Skeleton: define content | `<h1>Title</h1>` |
| **CSS** | Skin: define appearance | `color: red; font-size: 20px` |
| **JS** | Brain: define behavior | `button.onclick = () => alert('Hi')` |

Ẩn dụ: **nhà**.
- HTML = tường, sàn, mái (structure)
- CSS = sơn, đồ đạc, decoration (appearance)
- JS = điện, smart device, control system (behavior)

---

## 2. HTML: skeleton của web

### 2.1 Tag = "lego block"

```html
<h1>Tiêu đề lớn</h1>
<p>Đoạn văn</p>
<a href="https://example.com">Link</a>
<img src="cat.jpg" alt="Mèo" />
<button>Click tôi</button>
```

### 2.2 Semantic HTML

❌ Bad (dùng div cho mọi thứ):
```html
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>
```

✅ Good (semantic tag):
```html
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
```

**Lợi**:
- SEO (Google hiểu structure)
- Accessibility (screen reader đọc đúng)
- Code dễ đọc

### 2.3 Common tag

| Tag | Use |
|------|------|
| `<header>` | Header page/section |
| `<nav>` | Navigation |
| `<main>` | Main content |
| `<article>` | Independent content (blog post) |
| `<section>` | Logical section |
| `<aside>` | Sidebar |
| `<footer>` | Footer |
| `<button>` | Button |
| `<form>`, `<input>` | Form |
| `<ul>`, `<ol>`, `<li>` | List |
| `<table>`, `<tr>`, `<td>` | Table |

---

## 3. CSS: skin của web

### 3.1 Selector

```css
/* Element */
h1 { color: red; }

/* Class */
.title { font-size: 24px; }

/* ID */
#header { background: blue; }

/* Combined */
header .nav a:hover { color: yellow; }
```

### 3.2 Box Model

Mỗi element = box: **content + padding + border + margin**

```css
.box {
  width: 200px;
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
  box-sizing: border-box;  /* Include padding + border vào width */
}
```

### 3.3 Layout systems

**Flexbox** (1D - row hoặc column):
```css
.container {
  display: flex;
  justify-content: space-between;  /* Horizontal */
  align-items: center;             /* Vertical */
  gap: 10px;
}
```

**Grid** (2D):
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 cột bằng nhau */
  gap: 20px;
}
```

**Position**:
- `static`: default
- `relative`: relative chính nó
- `absolute`: relative parent có position
- `fixed`: relative viewport
- `sticky`: scroll-based

### 3.4 Responsive với Media Query

```css
/* Mobile first */
.container {
  width: 100%;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
  .container { width: 750px; margin: 0 auto; }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .container { width: 960px; }
}
```

### 3.5 CSS modern (2024+)

```css
/* Variable */
:root {
  --primary: #3498db;
  --spacing: 16px;
}
.button { color: var(--primary); padding: var(--spacing); }

/* Container query */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* :has() selector */
.card:has(img) { padding: 0; }

/* Nesting (native) */
.button {
  background: blue;
  &:hover { background: darkblue; }
}
```

### 3.6 Sass / Less (preprocessor)

```bash
npm install sass
```

```scss
// variables.scss
$primary: #3498db;
$spacing: 16px;

.button {
  color: $primary;
  padding: $spacing;

  &:hover {
    background: darken($primary, 10%);
  }
}
```

---

## 4. JavaScript: brain của web

```html
<button id="btn">Click</button>
<script>
  const btn = document.getElementById('btn')
  btn.addEventListener('click', () => {
    alert('Hi!')
  })
</script>
```

Chi tiết: xem [JS Deep Guide](./javascript-deep-dive.md).

---

## 5. 3 tech cộng tác

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Demo</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <button id="btn">Click</button>
  </header>
  <script src="app.js"></script>
</body>
</html>
```

```css
/* style.css */
header {
  background: #f0f0f0;
  padding: 20px;
  text-align: center;
}
button {
  background: blue;
  color: white;
  padding: 10px 20px;
}
```

```javascript
// app.js
document.getElementById('btn').addEventListener('click', () => {
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === 'yellow' ? 'white' : 'yellow'
})
```

---

## 6. Gặp code lạ?

Trong vibecoding, AI gen code. Quick read:

1. **HTML tag** → biết có element gì
2. **CSS class** → biết style nào apply
3. **JS event** → biết khi user làm gì, gì xảy ra

Vd:
```html
<button class="btn-primary" @click="handleSubmit">Submit</button>
```
→ Button với class `btn-primary`, click → call function `handleSubmit`.

---

## 7. Glossary

| Term | Plain |
|------|-----------|
| **DOM** | Tree structure từ HTML |
| **Selector** | "Address" tìm element trong CSS |
| **Box Model** | content + padding + border + margin |
| **Flexbox** | Layout 1D (row/column) |
| **Grid** | Layout 2D |
| **Media Query** | Conditional CSS theo screen size |
| **Responsive** | Web adapt screen khác nhau |
| **Semantic HTML** | Dùng tag có nghĩa thay div |

---

## Tổng kết

- **HTML** define **gì** (content)
- **CSS** define **trông thế nào** (style)
- **JS** define **làm gì** (behavior)

Học theo order: HTML → CSS basic → JS basic → Flexbox/Grid → Responsive → Framework.

::: tip 2026 cho VN dev
- **CSS modern 2024-2026**: Container queries, `:has()`, native nesting, View Transitions
- **Tailwind CSS dominant**: utility-first thay viết CSS thuần
- **shadcn/ui pattern**: copy-paste component (Radix UI + Tailwind)
- **Open Props**: design tokens chuẩn
- **CSS Houdini**: custom paint, layout (đợi browser support)
- **VN dev**: học Flexbox + Grid kỹ trước, Tailwind sau
- **HTML 2026**: `<dialog>`, `<details>`, `<search>` native
:::
