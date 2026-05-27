# Dev PWA — biến website thành App thật sự

::: tip Cập nhật 2026
- **PWA Renaissance** sau iOS 17.4 EU Digital Markets Act — Apple bắt buộc cho PWA install như app
- **WebAPK** trên Android — Chrome tự tạo APK shell cho PWA, install như app native
- **Service Worker v2** với better caching và offline
- **Push API** giờ work trên iOS Safari (17.4+)
- **WebAssembly + WebGPU** cho heavy compute trong browser
:::

## PWA là gì?

PWA = **Progressive Web App** = website "tiến hoá" thành app:

- **Installable**: user click "Add to Home Screen" → icon trên màn hình như app
- **Offline**: chạy được khi không có internet (cache static + dynamic)
- **Push notification**: notify user dù app closed
- **Full screen**: không thanh address browser, trải nghiệm như native
- **Background sync**: sync data khi mạng có lại

## PWA vs Native App

| Tiêu chí | PWA | Native (iOS/Android) |
|---|---|---|
| Install | URL → "Add to Home Screen" | App Store / Play Store |
| Discovery | Google search | App Store ASO |
| Update | Tự động (refresh) | Qua store |
| Offline | Có (qua Service Worker) | Có |
| Push notification | Có (Web Push) | Có (APNs/FCM) |
| Hardware access | Limited | Full |
| Performance | Tốt | Tốt nhất |
| Dev cost | 1 codebase web | iOS + Android riêng |
| App Store presence | No | Có |
| Best for | Content, e-commerce, productivity | Game, AR/VR, deep OS integration |

## Use case phù hợp PWA

- News site (VnExpress, Tuổi Trẻ)
- E-commerce (Shopee Lite, Lazada Lite)
- Productivity (Notion, Todoist)
- Social (Twitter Lite, Pinterest)
- Editor (Figma, Canva)
- Lưu ý: KHÔNG phù hợp game phức tạp hoặc AR

# Chương 1: dựng PWA cơ bản

## 1.1 Project structure

```
my-pwa/
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── offline.html
├── src/
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## 1.2 Setup project với Vite + React

```bash
npm create vite@latest my-pwa -- --template react-ts
cd my-pwa
npm install
npm install vite-plugin-pwa --save-dev
```

## 1.3 vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: 'My First PWA',
        short_name: 'MyPWA',
        description: 'A progressive web app demo',
        theme_color: '#4F46E5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\..*\..*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ]
})
```

## 1.4 App.tsx cơ bản

```tsx
import { useState, useEffect } from 'react'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Listen install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    })
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  
  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    console.log('Install outcome:', outcome)
    setInstallPrompt(null)
  }
  
  return (
    <div style={{ padding: 20 }}>
      <h1>My First PWA 🚀</h1>
      <p>Status: {isOnline ? '🟢 Online' : '🔴 Offline'}</p>
      
      {installPrompt && (
        <button onClick={handleInstall}>
          📲 Install App
        </button>
      )}
      
      <h2>Content</h2>
      <p>Đây là content của PWA. Thử tắt internet để xem nó vẫn chạy.</p>
    </div>
  )
}

export default App
```

## 1.5 Build và test

```bash
npm run build
npm run preview
```

Mở browser, F12 → Application → Service Workers → check registered.

# Chương 2: Service Worker

## 2.1 Tự viết Service Worker (nếu không dùng plugin)

`public/service-worker.js`:

```javascript
const CACHE_NAME = 'my-pwa-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
]

// Install: pre-cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  )
})

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response
      
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) return response
          
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          
          return response
        })
        .catch(() => caches.match('/offline.html'))
    })
  )
})
```

Register trong `index.html`:

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.error('SW registration failed', err))
  })
}
```

## 2.2 Caching strategy

| Strategy | Use case | Behavior |
|---|---|---|
| **Cache First** | Static assets (CSS, JS, image) | Check cache → fallback network |
| **Network First** | API data | Check network → fallback cache |
| **Stale While Revalidate** | Content semi-fresh | Return cache, update background |
| **Cache Only** | Truly static | Always cache |
| **Network Only** | Real-time (chat, stock) | Always network |

## 2.3 offline.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Offline</title>
  <style>
    body { font-family: -apple-system, sans-serif; padding: 40px; text-align: center; }
    h1 { color: #4F46E5; }
  </style>
</head>
<body>
  <h1>📡 Bạn đang offline</h1>
  <p>Không có internet. Một số tính năng có thể không dùng được.</p>
  <button onclick="location.reload()">Thử lại</button>
</body>
</html>
```

# Chương 3: Push notification

## 3.1 Request permission

```typescript
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Browser không support notification')
    return
  }
  
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    console.log('Permission granted')
    await subscribeToPush()
  }
}

async function subscribeToPush() {
  const reg = await navigator.serviceWorker.ready
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  })
  
  // Send subscription tới backend
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  })
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return new Uint8Array([...rawData].map(c => c.charCodeAt(0)))
}
```

## 3.2 Service Worker handle push

```javascript
// service-worker.js
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      data: data.url,
      actions: [
        { action: 'view', title: 'Xem' },
        { action: 'dismiss', title: 'Bỏ qua' }
      ]
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    )
  }
})
```

## 3.3 Backend gửi push

Node.js với `web-push`:

```javascript
const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:you@example.com',
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
)

// Gửi notification
async function sendNotification(subscription, data) {
  await webpush.sendNotification(
    subscription,
    JSON.stringify({
      title: 'Hello',
      body: 'Bạn có message mới',
      url: '/messages'
    })
  )
}
```

# Chương 4: IndexedDB cho data lớn

```typescript
import { openDB } from 'idb'

const db = await openDB('my-pwa-db', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
  }
})

// Save
await db.add('notes', { title: 'My note', content: '...', date: new Date() })

// Read
const allNotes = await db.getAll('notes')
```

# Chương 5: Background Sync

Khi user offline, queue request → khi online sync:

```typescript
// Component
async function saveNoteOffline(note: Note) {
  const reg = await navigator.serviceWorker.ready
  
  // Save vào IndexedDB
  await db.add('pending-notes', note)
  
  // Register sync
  await reg.sync.register('sync-notes')
}
```

```javascript
// service-worker.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(syncNotes())
  }
})

async function syncNotes() {
  const db = await openIDB()
  const pending = await db.getAll('pending-notes')
  
  for (const note of pending) {
    try {
      await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(note)
      })
      await db.delete('pending-notes', note.id)
    } catch (err) {
      // Retry next sync
    }
  }
}
```

# Chương 6: deploy + install

## 6.1 Deploy

Best hosts cho PWA (HTTPS auto):
- **Vercel** (free, fastest)
- **Netlify** (free)
- **Cloudflare Pages** (free, edge)
- **GitHub Pages** (free, hơi slow)

```bash
# Vercel
npm install -g vercel
vercel deploy --prod
```

## 6.2 Test install trên devices

**Android Chrome**:
- Mở URL → menu (3 chấm) → "Install app"
- Tự popup "Add to Home Screen" nếu PWA đủ tiêu chuẩn

**iOS Safari** (16.4+):
- Mở URL → Share button → "Add to Home Screen"
- iOS 17.4 EU: install như app native với WebAPK-like

**Desktop Chrome/Edge**:
- Address bar có icon "Install" 
- Click → install như Electron app

## 6.3 Lighthouse audit

Chrome DevTools → Lighthouse → PWA tab → run audit.

Tiêu chí pass:
- ✅ Manifest có name, icons, theme_color
- ✅ Service Worker registered
- ✅ HTTPS
- ✅ Responsive
- ✅ Fast load (LCP <2.5s)
- ✅ Works offline

# Câu hỏi thường gặp

### Q1: PWA install có thực sự thay native app?

- Cho 80% use case: có
- Cho game phức tạp, AR, deep iOS integration: không
- iOS pre-17.4: hạn chế hơn (no push, no badge)
- Android: tốt như native

### Q2: PWA có lên Play Store / App Store được không?

**Play Store**: có, qua **TWA (Trusted Web Activities)** hoặc **PWABuilder**. Submit như app thường.

**App Store**: khó hơn. Phải wrap thành native app (Capacitor, Cordova). Apple strict với "wrapped web view".

### Q3: SEO + PWA?

PWA vẫn là website → SEO tốt. SSR (Next.js, Remix) tốt nhất cho SEO + PWA combine.

### Q4: Push notification iOS có work không?

Có từ iOS 16.4+ (March 2023). Trước đó chỉ Android + Desktop work.

### Q5: Storage limit?

- Chrome: 80% disk space
- Safari: 1GB (5GB cho PWA installed)
- Firefox: 50% disk space (max 2GB)

Nhiều cho most use case.

# Tài liệu tham khảo

- [web.dev/learn/pwa](https://web.dev/learn/pwa/) - course PWA chính thức
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [PWA Builder](https://www.pwabuilder.com/) - tool đóng gói PWA thành app store
- [Workbox](https://developer.chrome.com/docs/workbox) - Service Worker library
- [MDN Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

# Phụ lục: PWA 2026

## A. PWA Renaissance

- **iOS 17.4 EU DMA**: install PWA như app native trong EU
- **WebAPK Android**: Chrome tự tạo APK shell
- **Push notification iOS**: work từ 16.4+
- **WebAssembly + WebGPU**: heavy compute trong browser
- **Origin Trial**: feature mới Web (File System Access, USB, BLE...)

## B. PWA vs Mini App ecosystem VN

| | PWA | Zalo Mini App |
|---|---|---|
| Audience | Mọi web user | Zalo user (75M VN) |
| Install | Browser prompt | Zalo native |
| Payment | Stripe, VNPay tự tích hợp | ZaloPay built-in |
| Discoverability | Google SEO | Zalo search + share |
| Update | Real-time | Review 1-3 ngày |
| Offline | Yes (Service Worker) | Limited |
| Hardware | Limited | More (camera, location) |
| Best for | International, SEO-driven | VN mass market |

## C. Stack đề xuất 2026

```
Framework: Next.js 14+ (SSR + SEO) hoặc Vite + React
PWA: vite-plugin-pwa hoặc next-pwa
UI: Tailwind + shadcn/ui
State: Zustand + TanStack Query
Offline: IndexedDB (idb library) + Background Sync
Push: web-push + VAPID keys
Auth: Supabase Auth hoặc Clerk
Backend: Supabase / Cloudflare D1 + Workers
Deploy: Vercel / Cloudflare Pages
```

## D. Khi nào KHÔNG dùng PWA

- Game 3D heavy (Unity, Unreal)
- App cần deep iOS integration (HealthKit, ARKit)
- App phụ thuộc Bluetooth Low Energy (Web Bluetooth limited)
- App cần CPU-intensive (video editing, ML training)
- App cho enterprise iOS với MDM requirement

## E. Use case PWA cho VN 2026

| App idea | Stack |
|---|---|
| News reader VN | Next.js + Supabase + Vercel PWA |
| Habit tracker | Vite + IndexedDB + Background Sync |
| Recipe book | Next.js + Algolia search + image cache |
| Calculator/Tool | Vanilla JS PWA + offline-first |
| E-commerce lite | Next.js Commerce + Stripe + PWA |
| Personal CRM | Vite + IndexedDB + sync với cloud |
| Voice memo | Web Audio API + IndexedDB + Whisper API |
| Photo gallery | Web Image API + IndexedDB |

## Sources

- [web.dev PWA](https://web.dev/explore/progressive-web-apps)
- [PWA Builder docs](https://docs.pwabuilder.com/)
- [Workbox cookbook](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
- [Apple WebKit blog](https://webkit.org/blog/)
