# Frontend Engineering Overview

::: tip Mở đầu
**Sao FE từ "viết file HTML đơn giản" trở thành "engineering chuyên ngành" với cả ngàn tool?** Vì project ngày càng phức tạp, cần build, transform, optimize, automate. Chương này dẫn bạn từ "manual workshop" → "modern factory".
:::

---

## 1. Sao cần "engineering"?

### Project nhỏ (1-2 file HTML)
- Viết HTML thẳng, mở browser xem
- Đủ rồi, không cần gì

### Project lớn (vài trăm component)
- Code cần modularize (ES Modules)
- Có TypeScript, Sass, Vue/JSX (browser không hiểu thẳng)
- Cần test, lint, format
- Bundle phải nhỏ
- Multi-env (dev/staging/prod)
- Multi-team collaborate

→ Cần **chain tool tự động hoá**: build, transform, bundle, optimize, deploy.

---

## 2. Core concept: Transpile, Bundle, Build

### 2.1 Transpile (translate)

Code bạn viết ≠ code browser execute. Cần "translator":

- **TypeScript** → JavaScript
- **Sass/Less** → CSS
- **Vue SFC** (.vue) → JavaScript
- **JSX** (React) → JavaScript
- **ES2024+ features** → ES5 (cho browser cũ)

Tool: TypeScript compiler, Babel, Sass, esbuild, SWC.

### 2.2 Bundle (đóng gói)

Project có 100 file `.js`. Browser load 100 request = chậm. **Bundle** = merge thành ít file (vd 1-5 file).

Bundle còn xử:
- **Tree shaking**: loại code không dùng
- **Minify**: compress (xoá space, rename variable)
- **Code splitting**: chia bundle theo route/feature

Tool: Webpack, Rollup, Parcel, Vite, esbuild, Bun.

### 2.3 Build (full process)

Build = transpile + bundle + optimize + assets handling.

```bash
npm run build
# →
# 1. Type check (tsc)
# 2. Transpile TS/Vue/JSX → JS
# 3. Transpile Sass → CSS
# 4. Bundle modules
# 5. Minify, tree shake
# 6. Hash filename (cache busting)
# 7. Output → dist/
```

---

## 3. Thực chiến: team evolution

### Stage 1: No tools (2010)

```html
<script src="jquery.js"></script>
<script src="app.js"></script>
<script src="utils.js"></script>
```

**Vấn đề**: order load matter, global pollution, không modularize.

### Stage 2: Webpack (2015-2020)

```bash
npm install webpack webpack-cli
npx webpack
# Wait 30s...☕
# [INFO] Compiled successfully in 30123ms

# Sửa code → save → wait 5s → finally thấy
```

**Lợi**: modularize, transpile, bundle.
**Hại**: setup phức tạp, dev server chậm.

### Stage 3: Vite (2020+)

```bash
npm create vite@latest
npm install
npm run dev
# Wait 300ms...không kịp react đã xong
# [INFO] ready in 312ms

# Sửa code → save → instant
```

**Lợi**: cực nhanh, config đơn giản, modern.

---

## 4. Sao Vite nhanh thế?

### 4.1 Dev mode: native ESM

Browser hiện đại support **ES Modules** native. Vite không bundle dev:

```html
<script type="module" src="/src/main.js"></script>
```

Browser request `main.js` → Vite chỉ transpile file đó on-demand → trả về. Không pre-bundle toàn bộ.

**Webpack**: bundle hết → start server (chậm)
**Vite**: start server ngay → on-demand compile (cực nhanh)

### 4.2 Production: Rollup

Production thì cần bundle (browser cũ + perf). Vite dùng **Rollup**.

### 4.3 Pre-bundle dependencies với esbuild

Lib `node_modules` (vd lodash, react) Vite pre-bundle 1 lần bằng **esbuild** (Go-based, cực nhanh).

```bash
# esbuild bundle 10x-100x faster than Webpack/Rollup
```

---

## 5. Webpack: Loader + Plugin

### 5.1 Loader: transform 1 loại file

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },         // TS → JS
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },  // CSS
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpg|svg)$/, type: 'asset/resource' }
    ]
  }
}
```

### 5.2 Plugin: extend chức năng

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin()
  ]
}
```

---

## 6. Vite config template

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'  // hoặc @vitejs/plugin-react
import path from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // import '@/utils'
    }
  },

  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'  // Backend API proxy
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']  // Split chunk
        }
      }
    }
  }
})
```

## 6.1 SourceMap

Production code đã minify (`a.b.c = 1; var x = function(){}`). Debug khó!

**SourceMap** = file map giữa minified code và source. DevTools dùng để hiện source khi debug.

```javascript
// vite.config.js
build: {
  sourcemap: true  // dev: true mặc định, prod: tuỳ
}
```

Lưu ý: sourcemap public = lộ source code. Cân nhắc:
- `'hidden-source-map'`: gen nhưng không reference trong code
- Upload sourcemap riêng cho Sentry, không expose public

## 6.2 Asset fingerprint

Output filename có hash:
```
app.[hash].js   → app.a3f5b9.js
```

Khi code đổi, hash đổi → URL đổi → browser fetch lại. Code không đổi → URL giữ → browser dùng cache (cực nhanh).

```javascript
// Vite default: filename hash auto
build: {
  rollupOptions: {
    output: {
      entryFileNames: 'assets/[name].[hash].js',
      chunkFileNames: 'assets/[name].[hash].js',
      assetFileNames: 'assets/[name].[hash].[ext]'
    }
  }
}
```

---

## 7. Engineering toolchain

### 7.1 Package manager

- **npm**: default Node.js
- **pnpm**: nhanh hơn, save disk (hard link)
- **yarn**: alternative, classic
- **bun**: rất nhanh, all-in-one (runtime + manager)

### 7.2 Linter + Formatter

```bash
# ESLint: tìm bug, code style
npm install -D eslint @typescript-eslint/parser

# Prettier: format code
npm install -D prettier

# .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2
}
```

### 7.3 Type check

```bash
# TypeScript
npm install -D typescript
npx tsc --noEmit  # Type check only

# Vue + TS
npm install -D vue-tsc
npx vue-tsc --noEmit
```

### 7.4 Testing

- **Unit**: Vitest (mới), Jest (classic)
- **Component**: Vitest + Testing Library
- **E2E**: Playwright (best), Cypress (popular)

```bash
npm install -D vitest @testing-library/vue
```

### 7.5 Git hooks

```bash
# Husky + lint-staged: chạy lint trước commit
npm install -D husky lint-staged

# .husky/pre-commit
npx lint-staged

# package.json
"lint-staged": {
  "*.{js,ts,vue}": ["eslint --fix", "prettier --write"]
}
```

### 7.6 CI/CD

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build
```

---

## 8. Tổng kết

Engineering = automate + standardize toàn FE workflow.

**Chain tool 2026 typical**:
- **Package manager**: pnpm hoặc bun
- **Build tool**: Vite
- **Framework**: Vue 3 / React / Svelte
- **TypeScript**: must
- **Linter**: ESLint (+ Prettier format)
- **Test**: Vitest (unit) + Playwright (E2E)
- **Git hooks**: Husky + lint-staged
- **CI**: GitHub Actions / GitLab CI
- **Deploy**: Vercel / Netlify / Cloudflare Pages
- **Monitor**: Sentry / Vercel Analytics

::: tip 2026 cho VN dev
- **Vite is king**: tốc độ + DX không có đối thủ
- **Bun runtime**: nhanh hơn Node 3-5x, có thể thay npm + vite cho 1 số project
- **Turbopack** (Next.js): Rust-based, faster Webpack
- **Rsbuild** (Rspack-based): Webpack-compatible nhưng Rust, nhanh
- **Storybook**: dev + showcase component isolated
- **Changesets**: version + changelog cho monorepo
- **VN setup chuẩn**: Vite + Vue 3 hoặc Next.js, pnpm, Vercel deploy, GitHub Actions CI
:::

::: warning Anti-pattern
- ❌ Không có build → import từng `<script>` (project nhỏ thì OK)
- ❌ Webpack config 500 dòng → dùng template (vue-cli, create-react-app) hoặc switch Vite
- ❌ Không lint, không format → team chaos nhanh
- ❌ Không test → bug tăng theo dependency
- ❌ Không CI → deploy phải manual, dễ sót
:::
