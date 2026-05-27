# Cross-Platform Solutions (React Native / Flutter / Electron / Tauri)

::: tip 🎯 Core
**"Sao cần cross-platform? Thay native được không?"**
"Write once, run anywhere" là ước mơ software engineering. Chương này khám phá concept, architecture school, edge của cross-platform.
:::

---

## 1. Cross-platform overview

### 1.1 Pain của native + driver cross-platform

**Native dev**: deploy full-terminal (iOS, Android, Win, macOS) = nhiều team độc lập:
- iOS: Swift/Objective-C
- Android: Kotlin/Java
- Desktop: C++/C#

Cost cao, multi-platform logic duplicate, feature sync khó, bug fix slow.

**Cross-platform**: middle layer abstract (JS/TS/Dart), 1 codebase, framework transpile/bundle/bridge → app cho mỗi OS.

---

## 2. Edge tech

Theo "Law of Leaky Abstractions", mọi abstraction qua OS đều có perf loss + feature compromise.

### 2.1 Cross-platform OK

1. **Info display, content distribution**: news, education, OA
2. **High-frequency iteration business**: e-commerce, food delivery, ride-hailing — cần hot reload + remote update (CodePush của RN)
3. **MVP startup**
4. **Strong design system, weak interaction**: Flutter strong vì self-render

### 2.2 Phải native

1. **3A graphics + realtime game**: 60-120 FPS, GPU intensive
2. **Heavy hardware**: pro audio/video, Bluetooth, IoT
3. **System-level interaction**: complex scroll, spring damping (chat list)
4. **OS first-day adopt**: feature mới (Dynamic Island) chỉ native first day

---

## 3. 3 architecture schools (mobile)

### 3.1 Container nesting (WebView)

**Nguyên lý**: app là website HTML/CSS/JS, embed native WebView (no browser UI). JS Bridge cho web call native.

- **Đại diện**: Cordova, Ionic, mini-program runtime
- **Đánh giá**: dev rất nhanh, FE reuse + remote update native. Nhưng perf trần thấp, scroll lag, cảm giác "không native" rõ.

### 3.2 Native bridging (Bridge)

**Nguyên lý**: viết JS/TS declarative UI. Không nhúng web renderer. Có "Bridge" async message proxy. Instruction "render button" serialize qua Bridge → OS render real native button.

- **Đại diện**: **React Native (RN)**
- **Đánh giá**: bỏ Web DOM, user touch real native view → tactile tốt hơn WebView. Nhưng complex business + animation + gesture → Bridge overhead lớn → bottleneck (push RN tới JSI direct call architecture mới).

### 3.3 Independent rendering engine (Self-draw)

**Nguyên lý**: bỏ OS UI control. Compile 2D rendering engine (Skia) vào app. Engine take pixel-level rendering, vượt OS native component.

- **Đại diện**: **Flutter**
- **Đánh giá**: 100% UI consistency, GPU direct → frame rate đỉnh. Trade-off: bundle lớn hơn, hardware deep cần Swift/Kotlin/C++ joint dev.

---

## 4. Desktop cross-platform: Electron vs Tauri

### 4.1 Electron (heavyweight)

VS Code, Figma, Slack, Discord dùng.

- **Ưu**: embed full **Chromium kernel + Node.js runtime**. Inherit Web API (WebGL, WebRTC), full FS + process access. Ecosystem mạnh nhất desktop.
- **Nhược**: **memory cực lớn**. Tool nhỏ cũng dùng vài trăm MB RAM. "Resource-intensive".

### 4.2 Tauri (lightweight)

Chống Electron bloat:

- **Ưu**: bỏ Chromium kernel. UI render dùng OS WebView built-in (Edge WebView2 Win, WebKit macOS). Backend bằng **Rust** safe + concurrent. Install package vài MB.
- **Nhược**: depend OS WebView khác → "cross-browser compat" issue cũ trở lại. Rust learning curve cao.

---

## 5. Selection matrix

| Background | Recommended | Lý do |
|-------------|----------|------|
| **Hardware deep, extreme visual, 3D, OS first-day feature** | 🔨 **Native (Swift / Kotlin)** | Industry bottom line. Hardware + ultra-data app không chịu được middle layer perf loss. |
| **FE team mạnh (React skill), high-frequency online business, cần hot update** | ⚛️ **React Native** | Reuse FE team, tool mạnh, hot deploy + instant fix. |
| **Brand-new app, 100% UI consistency multi-platform, high FPS strict** | 🦋 **Flutter** | Perf ceiling cao nhất cho cross-platform, self-render full control. |
| **Desktop complex productivity, FE skill, end-user resource OK** | ⚛️ **Electron** | International standard top desktop. Ecosystem + stability + DX bù memory cost. |
| **Desktop lightweight + perf high, team biết Rust** | 🦀 **Tauri** | Modern alternative Electron, package nhỏ, perf cao. |

::: tip 2026 cho VN dev
- **React Native New Architecture**: JSI + Fabric + TurboModules → perf gần native
- **Flutter 3.27+** vẫn dominant
- **Expo** (React Native): managed workflow, DX siêu tốt
- **Tauri 2.0**: support mobile + desktop, hot
- **VN startup mobile**: Flutter chiếm ưu thế
- **VN agency**: React Native vì JS team có sẵn từ web project
- **Desktop VN**: Electron cho commercial (Zalo PC), Tauri cho startup
- **AI native mobile**: chạy LLM nhỏ (Phi-3, Gemma 2B) trên device qua ONNX, CoreML, TensorFlow Lite
:::
