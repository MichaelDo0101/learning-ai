# Client Languages (Swift / Kotlin / Dart)

::: tip 🎯 Core
**"Mobile app dev, chọn ngôn ngữ thế nào?"** Chương này giới thiệu concept client dev, evolution ngôn ngữ mobile, phân tích ngôn ngữ mainstream + scenario.
:::

---

## 1. Client dev overview

Architecture hiện đại có **server (backend)** + **client (frontend)**.

- **Server**: chạy cloud server, business logic + DB + concurrent compute
- **Client**: chạy device user (phone, tablet, PC), render UI + respond interaction + hardware comm

Mobile context, **"client dev" = iOS + Android native app**. Khác web, native call deep hardware (camera, GPS, biometric, sensor) → UX vượt web.

---

## 2. Edge: khi nào dùng ngôn ngữ nào?

Cross-platform (Flutter/Dart) phát triển mạnh, nhưng native (Swift/Kotlin) vẫn không thể bỏ.

### 2.1 Cross-platform OK (Dart/Flutter)

1. **Info display + content distribution**: news app, education, OA. Static layout, form, HTTP request. Hardware không quá khó.
2. **MVP startup**: time + budget hạn chế. 1 codebase, 2 platform.
3. **Strong design-driven, weak interaction**: Design System chuẩn, multi-platform 100% pixel-perfect.

### 2.2 Phải native (Swift/Kotlin)

1. **System-level + deep OS**: tích hợp sâu OS API (Dynamic Island iOS, Widget, notification extension)
2. **3A-grade graphics + realtime game**: 60-120 FPS, GPU intensive. Swift dùng Metal, Kotlin/C++ dùng OpenGL/Vulkan
3. **High-precision hardware**: pro audio mixing, multi-track video editing, low-latency Bluetooth IoT
4. **Đỉnh smoothness interaction**: full-screen high-frequency scroll, spring damping (vd WhatsApp main chat list)

---

## 3. Mobile language evolution

### 3.1 Từ legacy → modern

Mobile sớm:
- **iOS (Objective-C)**: C superset, syntax cũ, manual memory → leak + crash
- **Android (early Java)**: Java cũ, boilerplate nhiều

Modern:
- **iOS Swift**: safe, fast, expressive
- **Android Kotlin**: concise, interop với Java
- **Cross-platform**: Dart/Flutter
- **UI**: declarative

### 3.2 Null safety

Java cũ: `NullPointerException` (NPE) là crash phổ biến nhất.

**Null safety** trong Swift + Kotlin:
- Compiler force declare variable có thể null không
- Static analysis trước run, detect risk → reject compile

**"Runtime crash" → "compile-time error"** → tăng stability mobile mạnh.

---

## 4. Mainstream languages

### 4.1 Swift: Apple core

::: tip 💡 Position
Swift Apple 2014, thay Objective-C. iOS, iPadOS, macOS, watchOS. **Safe, Fast, Expressive**.
:::

**Ưu**:
1. Modern syntax: type inference, generic, pattern matching
2. SwiftUI: declarative UI, state-driven, framework auto diff render

**Nhược**: lock Apple ecosystem. Native iOS/macOS build = phải Xcode trên macOS.

---

### 4.2 Kotlin: Android standard

::: tip 💡 Position
Kotlin của JetBrains. Google 2017 add Android support, 2019 declare "Kotlin First".
:::

**Ưu**:
1. **100% Java interop**: chạy trên JVM, reuse Java code + lib. Project Java legacy không phải vứt
2. **Concise**: bỏ boilerplate Java
3. **Coroutines**: lightweight, code async như sync, tránh "callback hell"

---

### 4.3 Dart: cross-platform renderer

::: tip 💡 Position
Dart của Google. Lên mainstream nhờ Flutter. Flutter mục tiêu "1 source code, multi-platform consistent". Dart là ngôn ngữ duy nhất Flutter dùng.
:::

**Ưu**:
1. **Dual compile**:
   - **Debug**: JIT → "Hot Reload", sửa code phản hồi sub-second
   - **Release**: AOT → native machine code, perf gần native

**Nhược**: ngoài Flutter, Dart hiếm dùng cho backend, system. Specialized cho cross-platform UI.

---

## 5. Tổng kết: selection

| Scenario | Stack | Lý do |
|-------------|----------|------|
| **Deep Apple, iOS/macOS commercial premium** | 🍎 **Swift** | Native Apple, perf + hardware + visual nhất |
| **Android focus, hoặc maintain Java legacy** | 🤖 **Kotlin** | Standard cao nhất Android, Java interop tốt |
| **Team nhỏ, MVP iOS+Android nhanh** | 🦋 **Dart (Flutter)** | Cost-effective, 1 code 2 platform |

::: tip 2026 cho VN dev
- **Swift 6 + SwiftUI** mainstream cho iOS 2025+
- **Kotlin Multiplatform (KMP)**: share code Kotlin business logic giữa Android + iOS, UI vẫn native
- **Compose Multiplatform**: Jetpack Compose chạy được iOS, desktop
- **Flutter 3.27+**: vẫn dominant cho cross-platform mobile
- **VN startup**: Flutter là chọn phổ biến nhất (cost-effective)
- **VN enterprise**: native Swift/Kotlin cho banking, fintech (regulatory + perf)
- **AI on device**: CoreML (iOS), MLKit (Android), gemini-nano cho on-device LLM
:::
