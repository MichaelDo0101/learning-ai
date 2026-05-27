# Web Performance: Đo + Optimize

::: tip Mở đầu
**Sao perf quan trọng?** Amazon đo: tăng 100ms latency = giảm 1% revenue. Google: chậm > 3s, 53% mobile user bỏ. Perf không chỉ là dev concern, mà là vấn đề **revenue + UX**.
:::

---

## 1. Sao cần "optimize perf"?

### 1.1 Số liệu thực

- **Amazon**: +100ms latency = -1% sales
- **Walmart**: -1s = +2% conversion
- **Pinterest**: -40% wait time = +15% signup
- **BBC**: -1s = -10% user

### 1.2 Google Core Web Vitals (ranking factor 2021+)

Google dùng 3 metric đánh giá UX, ảnh hưởng SEO:

| Metric | Đo | Good | Bad |
|---------|-----|------|------|
| **LCP** (Largest Contentful Paint) | Time để load element lớn nhất visible | <2.5s | >4s |
| **INP** (Interaction to Next Paint) | Response time khi interact | <200ms | >500ms |
| **CLS** (Cumulative Layout Shift) | Layout shift bất ngờ | <0.1 | >0.25 |

> Note: 2024+ INP thay FID (First Input Delay)

---

## 2. Core: 3 stage perf

### 2.1 Loading (load time)

- Time download HTML, CSS, JS, image
- Affect: bundle size, network, CDN, cache

### 2.2 Rendering (paint time)

- Time browser parse + render
- Affect: render pipeline, DOM size, CSS complexity

### 2.3 Interaction (interaction time)

- Time response khi click, scroll
- Affect: JS execution, main thread blocking

---

## 3. Thực chiến: team optimize

**Site**: e-commerce VN, ban đầu LCP 5.2s, INP 380ms, CLS 0.18.

### Step 1: Đo + định vị

```bash
# Lighthouse
npx lighthouse https://example.com --view

# Hoặc Chrome DevTools → Lighthouse → Analyze
```

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: pull_request
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://staging.example.com
          uploadArtifacts: true
```

Kết quả: LCP image hero 1.2MB không compress!

### Step 2: Image optimization

```html
<!-- ❌ Bad: 1 size cho mọi device -->
<img src="hero-large.jpg" />

<!-- ✅ Good: responsive + modern format -->
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="..." loading="lazy" width="800" height="600" />
</picture>
```

Tools: Sharp (Node), Squoosh (web), Vercel Image Optimization.
LCP: 5.2s → 2.8s.

### Step 3: Code splitting

```javascript
// ❌ Bad: import hết, bundle 2MB
import { HeavyChart, RareFeature } from './all-features'

// ✅ Good: lazy load
const HeavyChart = lazy(() => import('./HeavyChart'))
const RareFeature = lazy(() => import('./RareFeature'))
```

Bundle initial: 2MB → 400KB.
LCP: 2.8s → 2.1s. ✅

### Step 4: Critical CSS inline

```html
<style>
  /* Critical CSS cho above-the-fold inline */
  .header, .hero { ... }
</style>
<link rel="preload" href="full.css" as="style" onload="this.rel='stylesheet'" />
```

### Step 5: Tối ưu INP

```javascript
// ❌ Long task block main thread
function handleClick() {
  for (let i = 0; i < 1000000; i++) heavyWork()
}

// ✅ Yield to main thread
async function handleClick() {
  for (let i = 0; i < 1000000; i += 1000) {
    for (let j = 0; j < 1000; j++) heavyWork()
    await new Promise(r => setTimeout(r, 0))  // Yield
  }
}

// ✅ Hoặc Web Worker
const worker = new Worker('worker.js')
worker.postMessage(data)
```

INP: 380ms → 150ms. ✅

### Step 6: Fix CLS

```html
<!-- ❌ Bad: image không có size → layout shift -->
<img src="ad.jpg" />

<!-- ✅ Good: reserve space -->
<img src="ad.jpg" width="300" height="250" />

<!-- Font: -->
<link rel="preload" href="font.woff2" as="font" crossorigin />
<style>
  body { font-family: 'CustomFont', system-ui; font-display: swap; }
</style>
```

CLS: 0.18 → 0.04. ✅

---

## 4. Common bottleneck + solution

### 4.1 Bundle quá lớn

```javascript
// Analyze
npm install -D rollup-plugin-visualizer  // Vite
npm install -D webpack-bundle-analyzer   // Webpack

// Solutions:
// - Code splitting (route-based, component-based)
// - Tree shaking (ES modules)
// - Replace lib lớn (vd moment → date-fns)
// - Dynamic import
```

### 4.2 Image quá lớn

- **Format**: WebP / AVIF (smaller than JPEG/PNG)
- **Size**: responsive với srcset
- **Lazy load**: `loading="lazy"`
- **CDN**: Cloudinary, ImageKit, Vercel

### 4.3 Render-blocking resources

```html
<!-- ❌ Block render -->
<script src="analytics.js"></script>

<!-- ✅ Defer (cuối page) -->
<script src="analytics.js" defer></script>

<!-- ✅ Async (không block) -->
<script src="analytics.js" async></script>
```

### 4.4 Font loading

```css
/* font-display: swap → fallback font trước, swap khi loaded */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2');
  font-display: swap;
}
```

### 4.5 3rd party scripts

- Analytics, ads, social widget → defer hoặc load on-demand
- Self-host nếu được (giảm DNS lookup)
- Audit: Lighthouse báo "Reduce impact of third-party code"

---

## 5. Tools monitor

### 5.1 Lighthouse (Google)

```bash
# CLI
npx lighthouse https://example.com

# Chrome DevTools
# Lighthouse → Analyze page load
```

### 5.2 WebPageTest

[webpagetest.org](https://webpagetest.org): test từ vị trí + device khác nhau, multi-run, waterfall chart chi tiết.

### 5.3 Real User Monitoring (RUM)

- **Google Analytics 4** + **Web Vitals**
- **Vercel Speed Insights**
- **Sentry Performance**
- **DataDog RUM**
- **New Relic**

```javascript
// Web Vitals lib
import { onCLS, onINP, onLCP } from 'web-vitals'

onCLS(metric => sendToAnalytics(metric))
onINP(metric => sendToAnalytics(metric))
onLCP(metric => sendToAnalytics(metric))
```

### 5.4 Chrome DevTools

- **Performance tab**: record runtime perf
- **Network tab**: waterfall request
- **Coverage tab**: tìm CSS/JS không dùng
- **Memory tab**: detect memory leak

---

## 6. Perf checklist

### Loading
- [ ] Image: WebP/AVIF, responsive srcset, lazy load, width/height set
- [ ] Code splitting (route + component)
- [ ] Tree shaking enable
- [ ] Bundle size < 200KB initial
- [ ] CDN cho static assets
- [ ] HTTP/2 hoặc HTTP/3
- [ ] Brotli/Gzip compression
- [ ] Cache headers đúng (Cache-Control, ETag)
- [ ] Critical CSS inline
- [ ] Preload key resources
- [ ] DNS prefetch, preconnect 3rd party

### Rendering
- [ ] CSS không block render
- [ ] Font: `font-display: swap`, preload, subset
- [ ] Reserve space (width/height) tránh CLS
- [ ] Above-the-fold ưu tiên load

### Interaction
- [ ] Long task < 50ms (split nếu cần)
- [ ] Debounce/throttle event handler
- [ ] Web Worker cho heavy compute
- [ ] Virtual scrolling cho long list
- [ ] React/Vue: memo, lazy, Suspense

### Monitoring
- [ ] Lighthouse CI trong CI/CD
- [ ] RUM tracking Core Web Vitals
- [ ] Performance budget alert

---

## 7. Tổng kết

**Perf optimization là quy trình liên tục, không phải fix 1 lần.**

Roadmap:
1. **Measure**: Lighthouse + Web Vitals
2. **Identify bottleneck**: Largest issue trước
3. **Optimize**: 1 thứ 1 lần
4. **Verify**: re-measure
5. **Monitor**: RUM trong production
6. **Iterate**: lặp lại

::: tip 2026 cho VN dev
- **Core Web Vitals = ranking factor**: Google ưu tiên web perf tốt
- **INP thay FID** từ 2024
- **Image AVIF mainstream**: tốt hơn WebP
- **Speculation Rules API**: pre-render next page
- **View Transitions API**: smooth transition
- **Bun runtime**: speed up build + dev server
- **VN context**: optimize cho 3G/4G mobile (đa số user), CDN trong nước (BunnyCDN, Cloudflare APAC)
- **Tools VN-friendly**: Vercel Speed Insights, Sentry Performance, Datadog
:::
