# Frontend Frameworks Deep Guide

::: tip Mở đầu
Đã học HTML, CSS, JS basic, làm web đơn giản được. Nhưng khi web tính năng phức tạp dần, code thuần JS khó maintain, sửa 1 chỗ động nhiều chỗ, multi-người collab dễ conflict.

Đây là lý do cần framework — code có order, dễ maintain, dev nhanh. Vibecoding AI viết đa số, nhưng phải đọc được style các framework, biết ưu nhược điểm, để AI chọn stack đúng.

Đọc xong:
- Hiểu sao FE tech phải evolve
- Biết Vue, React, Svelte, Angular khác nhau ở đâu
- Hiểu "data-driven", "componentization"
- Chọn framework theo project
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Sao quan tâm FE evolution |
| **2** | Static web era |
| **3** | jQuery era |
| **4** | Vue/React era |
| **5** | Rendering strategies |
| **6** | Engineering tools |

---

## 1. Sao quan tâm FE evolution?

### 1.1 Từ "e-poster" → "desktop app"

Web sớm = **"e-poster"**: chỉ xem, không sửa, content cố định.

Web hiện đại = **desktop app** (VS Code, Figma): edit doc, vẽ, game, realtime respond, offline được.

**Lý do**: web tính năng phức tạp dần, cần tech + dev mode hiệu quả hơn.

### 1.2 Ẩn dụ xây nhà

| Era | 🏠 Xây nhà | Đặc điểm | Ưu/Nhược |
|------|-----------|---------|--------|
| **2000s** | **Dán poster** | Static web, viết HTML xong | ✅ Đơn giản ❌ Không interact |
| **2010s** | **Thợ tô riêng** | jQuery, op thủ công | ✅ Interact ❌ Code loạn, khó maintain |
| **2020s** | **Lego** | Vue/React, componentization | ✅ Hiệu quả, maintainable ❌ Learning curve |

---

## 2. Stage 1: Static web + "image cutting" (2000s)

<FrontendEvolutionDemo />

### 2.1 Era này thế nào?

**Dev mode**: viết vài HTML file + inline CSS/JS, drag vào browser xem, upload folder lên server = deploy.

**Đặc điểm**:
- ✅ Đơn giản, không learning cost
- ❌ Không complex interaction, code nhiều dễ loạn

### 2.2 "Cắt ảnh" là gì?

Designer Photoshop xong page → FE cắt thành ảnh nhỏ → HTML ghép thành page.

**Sao chậm?** Mỗi ảnh = 1 network request. Càng nhiều request, load càng chậm.

<SliceRequestDemo />

::: tip 💡 Sprite
Để giảm số request, "sprite": ghép nhiều ảnh nhỏ thành 1 ảnh lớn. Lợi: request ít, hại: làm + maintain phiền.
Bài học: **request nhiều = perf killer**.
:::

---

## 3. Stage 2: jQuery era (2010s)

### 3.1 Sao cần jQuery?

JS thuần vấn đề:
- ❌ **API phức tạp**: op đơn giản viết nhiều code
- ❌ **Browser compatibility**: API mỗi browser khác
- ❌ **Selector yếu**: tìm element phiền

**jQuery** ra đời:
```javascript
// Native (phức tạp)
const element = document.getElementById('title')

// jQuery (gọn)
const element = $('#title')
```

### 3.2 Idea jQuery: tự tay sửa page

jQuery core = **imperative**: bảo browser "làm thế nào".

```javascript
$('#title').text('Title mới')
$('#submit-btn').attr('disabled', true)
$('ul').append('<li>Item mới</li>')
```

**Vấn đề**: phải nhớ page có element nào, data đổi phải tự update mọi liên quan.

<JQueryVsStateDemo />

::: warning ⚠️ Pit jQuery
Tưởng làm cart:
```javascript
function addToCart() {
  cartCount++
  // Phải update mọi chỗ liên quan
  $('#cart-count').text(cartCount)        // Badge góc trên
  $('#cart-page-count').text(cartCount)    // Cart page
  $('#checkout-price').text(calculatePrice())  // Checkout button
  // Sót 1 chỗ → page không nhất quán!
}
```

**Đây là cái giá "tự tay làm"**: dễ sai, khó maintain.
:::

### 3.3 Mobile boom: responsive design

Phone + tablet popular → web phải adapt screen khác → **responsive layout**.

**Core: Media Query**:
```css
@media (min-width: 640px) {
  .container { display: flex; }
}
@media (max-width: 640px) {
  .container { display: block; }
}
```

<ResponsiveGridDemo />

---

## 4. Stage 3: từ "tự tay" → "data-driven" (Vue/React)

### 4.1 Sao cần framework mới?

jQuery era vấn đề tích lũy:
- Code nhiều loạn, khó maintain
- Dễ bug: sót 1 chỗ → page không nhất quán
- Collab khó

**Vue/React** core: **chỉ sửa data, page auto update**.

### 4.2 Idea: declarative UI

**jQuery (imperative)**:
```javascript
$('#title').text('Title mới')
$('#title').css('color', 'red')
$('#title').show()
```

**Vue (declarative)**:
```javascript
data() {
  return {
    title: "Title mới",
    color: "red",
    visible: true
  }
}
```

<ImperativeVsDeclarativeDemo />

::: tip 💡 Imperative vs Declarative
Như vẽ tranh:
- **Imperative**: "lấy bút, chấm sơn đỏ, vẽ tròn ở toạ độ (10,10)"
- **Declarative**: đưa hoạ sĩ 1 ảnh, "vẽ giống thế này"

Vue/React = declarative: mô tả "page trông thế nào", framework lo "vẽ thế nào".
:::

### 4.3 Componentization: xây nhà bằng lego

**Componentization** = chia page thành "lego độc lập".

Như chơi lego:
- Không "khắc từng cục từ đầu" (viết HTML/CSS từ đầu)
- Chỉ "lắp theo hướng dẫn" (ghép component)
- Mỗi cục **độc lập**, dùng lại nhiều bộ

**Lợi**:
- **Reuse**: viết "product card" 1 lần, dùng 100 lần
- **Encapsulation**: state nội bộ không ảnh hưởng người khác
- **Maintain**: sửa 1 component, mọi chỗ dùng đều update

::: info 💡 Nhận diện
- `<ComponentName />` → component
- `import xxx from './xxx.vue'` → import component
- `props: {...}` → param component nhận
- `emit('xxx')` → component gửi event lên parent
:::

### 4.4 SPA: Single-Page App

**MPA (Multi-Page App)**:
- Click link → full page refresh → page mới
- Như **lật sách**: đóng cũ, lấy mới ở kệ

**SPA**:
- Click link → chỉ refresh content area → page không refresh
- Như **chuyển chương trong cùng quyển**: xoá nội dung cũ, viết mới

<RoutingModeDemo />

**SPA**:
- ✅ Trải nghiệm mượt
- ✅ State easy manage (input, scroll position giữ)
- ❌ First-paint có thể chậm
- ❌ SEO cần handle thêm (SSR/SSG)

---

## 5. Rendering strategies: CSR/SSR/SSG

**CSR (Client-Side Rendering)**:
- Browser download JS → execute → gen page
- ✅ Interactive mượt, server áp lực ít
- ❌ First-paint chậm, không tốt SEO

**SSR (Server-Side Rendering)**:
- Server gen HTML → browser show trực tiếp
- ✅ First-paint nhanh, tốt SEO
- ❌ Server áp lực, implement phức tạp

**SSG (Static Site Generation)**:
- Build time gen tất cả HTML
- ✅ Cực nhanh, hoàn toàn static, CDN-friendly
- ❌ Không hợp dynamic content

<RenderingStrategyDemo />

::: info 💡 Chọn?
- **Content site** (blog, doc): SSG
- **Dynamic site cần SEO** (e-commerce, news): SSR
- **Admin system**: CSR
- **Hybrid**: Nuxt/Next.js
:::

---

## 6. Stage 4: Engineering + build tools (2015s-2020s)

### 6.1 Sao cần "engineering"?

Project lớn dần, không thể "manually load script".
**Engineering** = dùng tool + standard để dev hiệu quả, code reliable, collab smooth.

### 6.2 Build tools: Webpack → Vite

**Webpack** (traditional):
- Mode: **bundle trước, serve sau**
- Start: bundle hết → start server
- Issue: **chậm**. Project càng lớn càng chậm (~30s)

**Vite** (modern):
- Mode: **on-demand compile**
- Start: không bundle, start server
- Browser request file nào, compile file đó
- Lợi: **nhanh**. Thường <1s

| Item | Webpack | Vite | Speed up |
|--------|---------|------|------|
| Cold start | 30s+ | <1s | **30x faster** |
| Hot update | 3-5s | <100ms | **30x faster** |
| Config | Vài trăm dòng | Vài chục | **Đơn giản nhiều** |

::: tip 💡 Sao Vite nhanh?
**Webpack** = chuẩn bị đồ + chuyển nhà: pack hết, ra đi.
**Vite** = đi du lịch nhẹ: chỉ mang cần thiết, dùng gì mua đó.

Dev env, đa số chỉ sửa vài file, Vite chỉ compile vài đó, nhanh.
:::

---

## 7. Framework mainstream

| Feature | Vue | React | Svelte | Angular |
|------|-----|-------|--------|---------|
| **Philosophy** | Progressive | UI library | Compile-time | Full platform |
| **Learning curve** | ⭐⭐ Dễ | ⭐⭐⭐ Trung | ⭐⭐ Dễ | ⭐⭐⭐⭐ Dốc |
| **Perf** | Nhanh | Nhanh | **Cực nhanh** | Nhanh |
| **Ecosystem** | Tốt | **Tốt nhất** | Đang lớn | Tốt |
| **Bundle size** | Nhỏ | Trung | **Nhỏ nhất** | Lớn |
| **Use** | SME | Large | Cần perf | Enterprise |
| **Backer** | Evan You | Meta | Community | Google |

### 7.2 Vue: progressive

```vue
<template>
  <div>{{ message }}</div>
</template>
<script>
export default {
  data() { return { message: 'Hello Vue' } }
}
</script>
```

**Ưu**: learning dễ, doc EN/VN tốt, template syntax trực quan, .vue SFC rõ.
**Nhược**: state management lớn cần học Pinia/Vuex thêm.
**Hợp**: web SME, prototype nhanh, team Việt (doc friendly).

### 7.3 React: UI library

```jsx
function App() {
  const [message, setMessage] = useState('Hello React')
  return <div>{message}</div>
}
```

**Ưu**: ecosystem tốt nhất, JSX flexible, virtual DOM tốt.
**Nhược**: learning dốc, phải tự chọn lib.
**Hợp**: large app, project cần ecosystem giàu, cross-platform (React Native).

### 7.4 Svelte: compile-time

```svelte
<script>
  let message = 'Hello Svelte'
</script>
<div>{message}</div>
```

**Ưu**: **perf tốt nhất** (no virtual DOM runtime), bundle nhỏ nhất, syntax đơn giản.
**Nhược**: ecosystem nhỏ, community nhỏ hơn Vue/React.
**Hợp**: app cần perf cực, bundle size sensitive.

### 7.5 Angular: full platform

```typescript
@Component({
  selector: 'app-root',
  template: '<div>{{ message }}</div>'
})
export class AppComponent {
  message = 'Hello Angular'
}
```

**Ưu**: full solution, native TS, hợp large team.
**Nhược**: learning cực dốc, complexity cao, bundle lớn.
**Hợp**: enterprise app lớn, team cần convention strict.

---

## 8. Tổng kết: bản chất evolution

### 8.1 Efficiency: thủ công → automation

| Era | Mode | Hiệu quả |
|------|---------|------|
| **2000s** | Viết tay HTML/CSS/JS | ⭐ |
| **2010s** | jQuery + manual DOM | ⭐⭐ |
| **2020s** | Vue/React + data-driven | ⭐⭐⭐ |
| **Now** | Component + engineering + auto | ⭐⭐⭐⭐⭐ |

### 8.2 Scale: cá nhân → team

| Era | Scale | Collab |
|------|---------|---------|
| **2000s** | Vài file | Cá nhân |
| **2010s** | Vài chục file | Team nhỏ, dễ conflict |
| **2020s** | Vài trăm file | Team trung, cần standard |
| **Now** | Vài nghìn file | Team lớn, cần engineering full |

---

## 9. Roadmap

### 9.1 Zero base

1. **HTML/CSS/JS basic**: hiểu 3 nền tảng, viết static page
2. **Học 1 framework (Vue khuyến nghị)**: hiểu data-driven, componentization
3. **Project thực**: SPA hoàn chỉnh, route + state + API call

### 9.2 Có base

- **Engineering**: Vite/Webpack, hiểu build flow
- **Perf**: lazy load, code split, cache
- **TypeScript**: type cho code, tăng reliability
- **SSR**: Nuxt/Next.js, giải SEO + first-paint

---

## 10. Code bạn đọc được

- Hiểu FE evolution
- Phân biệt Vue, React, Svelte, Angular
- Imperative vs declarative
- Data-driven core idea
- Componentization
- CSR, SSR, SSG
- Webpack vs Vite
- Chọn framework + stack theo project

::: info 💡 Practical
Vibecoding với AI:
- "Blog cần SEO, dùng Nuxt (Vue SSR)"
- "Admin system, dùng Vue + Element Plus, không cần SSR"
- "Web app cần perf, xem Svelte"
- "Project đã React, tiếp tục React ecosystem"
:::

## Glossary

| Term | Full | Plain |
|------|------|-----------|
| **DOM** | Document Object Model | Tree đại diện page, JS read/write |
| **jQuery** | - | Lib sớm, simplify DOM op |
| **Vue/React** | - | FE framework hiện đại, data-driven + component |
| **Component** | - | UI unit reusable |
| **MPA** | Multi-Page App | Mỗi navigate full reload |
| **SPA** | Single-Page App | Load 1 lần, switch không reload |
| **Routing** | - | Quản chuyển page |
| **SSR** | Server-Side Rendering | Server gen HTML |
| **SSG** | Static Site Generation | Build time pre-render static |
| **CSR** | Client-Side Rendering | Browser dùng JS gen page |
| **Webpack** | - | Bundle traditional, bundle trước serve |
| **Vite** | - | Modern, on-demand compile, cực nhanh |
| **Responsive** | - | Page auto adapt screen |
| **Media Query** | - | CSS conditional theo width |
| **Imperative** | - | Bảo "làm thế nào" |
| **Declarative** | - | Bảo "cần gì" |
| **Data-Driven** | - | Sửa data, UI auto update |
| **Tree Shaking** | - | Tự loại code không dùng |
| **Code Splitting** | - | Chia code, on-demand load |

::: tip 2026 cho VN dev
- **Vue 3.5+ với Vapor mode**: no virtual DOM, gần Svelte perf
- **React 19 với Server Components**: hybrid SSR/CSR mới
- **Solid.js + Svelte 5**: fine-grained reactivity hot
- **Astro**: islands architecture cho content site
- **Next.js 15 + Turbopack**: build siêu nhanh
- **Bun + Vite**: combo nhanh nhất 2026
- **VN startup**: chọn Vue/React, Next.js cho cần SSR
- **VN enterprise**: vẫn Angular ở banking, telecom
:::
