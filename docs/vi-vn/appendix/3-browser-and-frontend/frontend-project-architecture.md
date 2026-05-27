# Frontend Project Architecture

::: tip 🎯 Core
**Từ HTML đơn giản đến app enterprise phức tạp, chọn architecture phù hợp cho mỗi scale thế nào?** Như: từ studio đến mall, design layout không gian theo nhu cầu khác nhau. Architecture tốt phải **evolve cùng project**, không phải over-design từ đầu.
:::

---

## 1. Architecture evolution

### 1.1 3 levels overview

Theo **complexity** + **user scale**, chia 3 levels:

| Level | Stack | User scale | Scenario | Focus |
|------|--------|----------|----------|------------|
| **Beginner** | HTML/CSS/JS | Cá nhân/team nhỏ | Blog, landing page, simple tool | Launch nhanh, maintain dễ |
| **Intermediate** | Vue/React + build tool | SME | Admin system, e-commerce front, SaaS | Reuse component, state management |
| **Enterprise** | Framework + micro-frontend/SSR | Large app | Big platform, complex business | Performance, team collab, scalability |

::: tip 💡 Chọn thế nào?
**Đừng over-design!** Nhiều project bắt đầu HTML đơn giản, theo nhu cầu tăng dần introduce framework.
- Project cá nhân → Beginner
- MVP startup → Beginner/Intermediate
- Admin system enterprise → Intermediate
- Large platform → Enterprise
:::

---

## 2. Beginner: HTML/CSS/JS

### 2.1 Scenario

Blog cá nhân, CV, landing page, simple tool, prototype, demo nhanh.

### 2.2 Recommended structure

```
my-simple-project/
├── index.html
├── about.html
├── css/
│   ├── reset.css
│   ├── variables.css       # CSS variable (color, font)
│   ├── components.css      # Component (button, card)
│   └── main.css
├── js/
│   ├── utils.js
│   ├── api.js
│   └── main.js
├── assets/
│   ├── images/
│   └── fonts/
└── README.md
```

### 2.3 Best practice

✅ **Should**:
- Semantic HTML tag
- CSS variable cho color + spacing
- Image compress + lazy load
- SEO meta tag basic

❌ **Avoid**:
- Inline style (`style="..."`)
- Global variable pollution
- Duplicate code

---

## 3. Intermediate: Vue/React project

### 3.1 Scenario

Enterprise admin (ERP, CRM, OA), e-commerce, SaaS, app interaction phức tạp.

### 3.2 Vue project structure

```
my-vue-project/
├── public/
├── src/
│   ├── assets/
│   │   ├── styles/         # variables.scss, mixins.scss, global.scss
│   │   └── images/
│   ├── components/
│   │   ├── common/         # Global (Button, Modal)
│   │   └── business/       # Business (UserCard)
│   ├── views/              # Page components
│   ├── router/             # Vue Router
│   ├── stores/             # Pinia/Vuex
│   ├── services/           # API services (axios wrap)
│   ├── utils/              # format, validate, storage
│   ├── composables/        # Composables (useAuth, useLoading)
│   ├── constants/
│   ├── App.vue
│   └── main.js
├── tests/
├── .env
├── vite.config.js
└── package.json
```

### 3.3 React project structure

```
my-react-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/         # common + business
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── store/              # Redux/Zustand
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

### 3.4 Concept key

#### Component design

**Single responsibility**: 1 component làm 1 việc.

```vue
<!-- ❌ Tệ: 1 component nhiều việc -->
<template>
  <div>
    <form @submit="handleSubmit"><!-- ... --></form>
    <table><!-- ... --></table>
    <div class="charts"><!-- ... --></div>
  </div>
</template>

<!-- ✅ Tốt: split -->
<template>
  <div>
    <UserForm @submit="fetchData" />
    <UserTable :data="users" />
    <UserStats :data="users" />
  </div>
</template>
```

#### State management

| Type | Lưu | Vd |
|----------|----------|------|
| **Global** | Pinia/Redux | User info, login state, theme |
| **Page** | Page component | Query condition, pagination |
| **Component** | Component nội bộ | Form input, modal show/hide |
| **Server** | TanStack Query/SWR | Server data, cache |

#### Organization

**Type-based** (project nhỏ):
```
src/
├── components/
├── views/
├── stores/
└── services/
```

**Feature-based** (project medium-large):
```
src/
├── features/
│   ├── auth/       # Mọi code auth
│   ├── user/
│   └── product/
├── shared/
└── App.vue
```

::: tip 💡 Chọn
- <10 page → type-based
- >20 page → feature-based
- >5 người team → feature-based, parallel dev
:::

---

## 4. Enterprise

### 4.1 Scenario

Big platform (e-commerce, social, content), enterprise app phức tạp, multi-team, perf + maintain cao.

### 4.2 Micro-frontend

Project quá lớn, single repo khó maintain → **micro-frontend**.

```
Big e-commerce/
├── Base app (main framework)
│   ├── Top nav
│   ├── Side menu
│   └── Sub-app container
├── Product sub-app (deploy riêng)
├── Order sub-app (deploy riêng)
├── User sub-app
└── Marketing sub-app
```

**Lợi**:
- Team autonomy: mỗi sub-app dev + deploy riêng
- Stack-agnostic: team khác dùng framework khác
- Progressive upgrade: refactor dần legacy

### 4.3 Enterprise structure

```
enterprise-project/
├── apps/                       # Micro-frontend sub-apps
│   ├── main/
│   ├── product/
│   └── order/
├── packages/                   # Shared (Monorepo)
│   ├── ui-components/
│   ├── utils/
│   └── types/
├── shared/                     # Config chung
│   ├── eslint-config/
│   └── vite-config/
├── docs/
└── scripts/
```

### 4.4 Performance optimization

```
Strategy/
├── Build-time
│   ├── Code splitting
│   ├── Route lazy load
│   ├── Tree shaking
│   └── Compress
├── Runtime
│   ├── Virtual scrolling
│   ├── Image lazy load
│   └── Cache
└── Network
    ├── CDN
    ├── HTTP cache
    ├── Preload
    └── Service Worker
```

### 4.5 SSR / SSG

| Solution | Scenario | Framework |
|------|----------|----------|
| **SSR** | SEO + first-paint nhanh | Next.js, Nuxt.js |
| **SSG** | Content static, ít update | Astro, VitePress |
| **Hybrid** | 1 phần static, 1 phần dynamic | Next.js (ISR) |

---

## 5. Architecture theo user scale

### 5.1 Cá nhân/team nhỏ (DAU <1000)

**Stack**: Vue 3 + Vite hoặc React + Vite
**State**: Pinia hoặc Zustand
**UI**: Element Plus, Ant Design, shadcn/ui
**Deploy**: Vercel, Netlify

### 5.2 SME (DAU 1k-100k)

**Stack**: Vue 3 + TS hoặc React + TS
**State**: Pinia + composables hoặc Redux Toolkit
**UI**: Component library tự build + business component
**Test**: Unit + E2E
**Deploy**: CI/CD + Docker

### 5.3 Large platform (DAU >100k)

**Stack**: React/Vue + TS strict mode
**Architecture**: Micro-frontend + Monorepo
**State**: Fine-grained + server state cache
**Perf**: SSR/SSG + CDN + edge computing
**Monitor**: FE monitoring + error tracking + perf analysis

---

## 6. Khi nào upgrade architecture?

| Tín hiệu | Note | Recommend |
|------|------|------|
| Build time >5 phút | Project quá lớn | Code split, micro-frontend |
| Conflict nhiều người | Collab khó | Feature-based, module split |
| Sửa 1 chỗ crash nhiều | Coupling nặng | Refactor + test |
| First paint >3s | Perf | Lazy load, SSR |
| Member mới chậm onboard | Structure lộn xộn | Doc, convention, refactor |

---

## 7. Tổng kết

::: tip 💡 Core
**Không có silver bullet, phù hợp mới tốt.**

- **Project nhỏ**: HTML/CSS/JS đủ
- **Project medium**: convention, component, module
- **Project lớn**: micro-frontend, perf, collab

**Nhớ**:
1. **Evolve progressively**: bắt đầu đơn giản, theo nhu cầu
2. **Unified convention**: naming, structure, style consistent
3. **Doc first**: ghi architecture decision
4. **Refactor định kỳ**: tech debt phải trả sớm

**Goal**: code như không gian sắp xếp, dù lớn nhỏ đều efficient.
:::

::: tip 2026 cho VN dev
- **Monorepo tools**: Turborepo (mainstream), Nx, pnpm workspaces
- **Micro-frontend libs**: Module Federation (Webpack/Vite), single-spa, qiankun
- **Build tools 2026**: Vite (default), Turbopack (Next.js), Rsbuild (Rspack)
- **Component lib trend**: shadcn/ui copy-paste, Park UI (themeable), Mantine
- **Architecture pattern**: Feature-Sliced Design (FSD) cho large React app
- **VN team**: bắt đầu với Vite + Vue 3 hoặc Next.js, đừng over-engineer
:::

## Tài liệu

- [Vue Style Guide](https://vuejs.org/style-guide/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Feature Sliced Design](https://feature-sliced.design/)
- [Micro Frontends](https://micro-frontends.org/)
