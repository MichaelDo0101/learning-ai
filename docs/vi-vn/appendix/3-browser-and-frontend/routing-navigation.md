# Routing + Navigation

::: tip Mở đầu
**SPA chỉ có 1 HTML, sao khác URL hiển thị khác page?** Đây là magic của **frontend routing**. Chương này giải thích nguyên lý + cách dùng router của Vue/React.
:::

---

## 1. Sao cần "frontend routing"?

### Tradition: MPA (Multi-Page App)
- Mỗi URL = 1 file HTML khác trên server
- Click link → full page reload → server gửi HTML mới

### Modern: SPA (Single-Page App)
- Chỉ 1 HTML file
- Click link → JS đổi content area, **không reload page**
- URL đổi, history hoạt động

**Lợi SPA**: nhanh, smooth transition, state giữ.
**Hại**: complex hơn, SEO khó (cần SSR).

---

## 2. Core concepts

### 2.1 Route = mapping URL ↔ Component

```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/product/:id', component: ProductDetail }
]
```

URL `/product/123` → render `ProductDetail` với param `id=123`.

### 2.2 2 modes

**Hash mode** (`/#/about`):
- URL có `#`
- Không cần server config
- Hợp static hosting (GitHub Pages)

**History mode** (`/about`):
- URL clean
- Cần server config redirect tất cả → `index.html`
- Best UX + SEO

### 2.3 Navigation

```javascript
// Declarative (template)
<router-link to="/about">About</router-link>  // Vue
<Link to="/about">About</Link>  // React

// Programmatic (code)
router.push('/about')  // Vue
navigate('/about')  // React
```

---

## 3. Evolution

### Stage 1: Traditional MPA

```
example.com/index.html       → home
example.com/about.html       → about
example.com/contact.html     → contact
```

Mỗi page reload full. Server có nhiều file HTML.

### Stage 2: AJAX + jQuery (semi-SPA)

Click link → AJAX load partial HTML → swap content area. Nhưng URL không đổi → back button vỡ.

### Stage 3: HTML5 History API + SPA

`history.pushState()` cho phép đổi URL mà không reload. SPA + History API = router hiện đại.

```javascript
// Đổi URL không reload
history.pushState({}, '', '/about')
window.addEventListener('popstate', () => {
  // Handle back/forward button
})
```

---

## 4. Underlying: router work thế nào?

### 4.1 Listen URL change

```javascript
// Hash mode
window.addEventListener('hashchange', () => {
  const path = location.hash.slice(1)  // Bỏ '#'
  renderComponent(path)
})

// History mode
window.addEventListener('popstate', () => {
  const path = location.pathname
  renderComponent(path)
})
```

### 4.2 Render component theo path

```javascript
function renderComponent(path) {
  const route = routes.find(r => matchPath(r.path, path))
  if (route) {
    // Mount component vào <router-view>
    mount(route.component)
  } else {
    // 404
    mount(NotFound)
  }
}
```

### 4.3 Dynamic param

```javascript
// Path: /product/:id
function matchPath(pattern, actual) {
  // /product/:id ↔ /product/123
  // → { id: '123' }
}
```

---

## 5. Practical guide

### 5.1 Vue Router

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/product/:id', name: 'product', component: ProductDetail },
  { path: '/:pathMatch(.*)*', component: NotFound }  // 404
]

const router = createRouter({
  history: createWebHistory(),  // History mode
  routes
})

// Trong main.js
app.use(router)
```

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link :to="{ name: 'product', params: { id: 1 } }">Product 1</router-link>
  </nav>
  <router-view />  <!-- Render component theo route -->
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()  // Hiện tại
const router = useRouter()  // Navigate

console.log(route.params.id)  // Get param
router.push('/about')  // Navigate code
</script>
```

### 5.2 React Router

```javascript
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <h1>Product {id}</h1>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  )
}
```

### 5.3 Nested routes

```javascript
// Vue
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts }
    ]
  }
]
// URL: /user/1/profile
```

### 5.4 Route guards (auth)

```javascript
// Vue
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

// React (HOC pattern)
function ProtectedRoute({ children }) {
  const isAuth = useAuth()
  return isAuth ? children : <Navigate to="/login" />
}
```

### 5.5 Lazy load route

```javascript
// Vue
const routes = [
  { path: '/about', component: () => import('./About.vue') }
]

// React
const About = lazy(() => import('./About'))
```

→ Code split → faster initial load.

---

## 6. Common issues + solutions

### 6.1 History mode → refresh 404

Server không tìm thấy `/about` → 404. Cần config server redirect tất cả → `index.html`.

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache** (`.htaccess`):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Vercel / Netlify**: auto-config rồi.

### 6.2 Scroll position

Mặc định: navigate → scroll giữ vị trí cũ. Khắc phục:

```javascript
// Vue Router
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition  // Back button
    return { top: 0 }  // Top mỗi navigate
  }
})
```

### 6.3 Query params

```javascript
// URL: /search?q=hello&page=2
const { q, page } = route.query  // Vue
const [searchParams] = useSearchParams()  // React
const q = searchParams.get('q')
```

### 6.4 SEO cho SPA

SPA → bot crawler khó index. Solution:
- **SSR** (Server-Side Rendering): Nuxt, Next.js
- **SSG** (Static Site Generation): Astro, VitePress, Nuxt static
- **Prerender**: prerender 1 số page quan trọng

---

## 7. Tổng kết

- **Frontend routing** = magic của SPA, đổi URL + content không reload
- **2 modes**: hash (đơn giản) vs history (clean URL, cần server config)
- **Vue Router** + **React Router** = de-facto standard
- **Advanced**: nested route, guard, lazy load, scroll behavior, query param
- **SEO**: dùng SSR/SSG nếu cần

::: tip 2026 cho VN dev
- **TanStack Router** (React): type-safe routing, hot
- **File-based routing**: Next.js App Router, Nuxt 3, SvelteKit, SolidStart — không cần config route thủ công
- **Type-safe params**: TypeScript route param định nghĩa
- **Streaming SSR**: Suspense + lazy
- **View Transitions API**: smooth transition native browser
- **VN dev**: SPA + History mode + Vercel/Netlify hosting = setup chuẩn 2026
:::
