# Build iOS App với SwiftUI native

::: tip Cập nhật 2026
- **Swift 6** stable (Q1/2026) — strict concurrency mặc định, performance tốt hơn
- **SwiftUI 6** với Observation framework (thay @StateObject)
- **Apple Intelligence** APIs (Foundation Models framework) — on-device LLM
- **visionOS** support trong SwiftUI cho Vision Pro
- **iOS 18+ required** cho production app mới
- **VN context**: iPhone chiếm ~14% VN, nhưng segment high-value (premium user)
:::

## Tại sao iOS native + SwiftUI?

- Apple ecosystem 14% VN nhưng **revenue per user cao gấp 2-3x Android**
- SwiftUI giảm 50-70% code so với UIKit
- Apple Intelligence (on-device LLM) — built-in AI free
- Type-safe, fast
- Best dev experience trên Apple platform

## Prerequisites

- **Mac** (bắt buộc, không có cách dev iOS từ Windows/Linux)
- **Xcode 16+** (free trên App Store, ~10GB)
- **Apple Developer account** ($99/năm — chỉ cần khi publish App Store)
- iPhone hoặc iPad để test (simulator OK cho dev)

# Chương 1: setup

## 1.1 Cài Xcode

1. Mở App Store
2. Search "Xcode"
3. Install (~10GB, mất 30-60 phút)
4. Mở Xcode → accept license

## 1.2 Tạo project

1. Xcode → Create New Project
2. iOS → App
3. Product Name: `MyFirstApp`
4. Team: chọn account Apple ID
5. Organization Identifier: `com.yourname`
6. Interface: **SwiftUI**
7. Language: **Swift**
8. Use Core Data: no (cho đơn giản)

Xcode tạo project structure:
```
MyFirstApp/
├── MyFirstApp.swift           # App entry
├── ContentView.swift          # Main view
├── Assets.xcassets/           # Image, color
└── Preview Content/
```

## 1.3 Run trên Simulator

1. Top bar Xcode: chọn simulator (iPhone 16 Pro)
2. Click ▶️ (Cmd+R)
3. Simulator boot → app chạy

# Chương 2: SwiftUI fundamental

## 2.1 ContentView cơ bản

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            
            Text("Xin chào Việt Nam!")
                .font(.title)
                .fontWeight(.bold)
            
            Text("Welcome to SwiftUI")
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

## 2.2 State management

```swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Đếm: \(count)")
                .font(.largeTitle)
            
            HStack(spacing: 20) {
                Button("−") { count -= 1 }
                    .buttonStyle(.bordered)
                Button("+") { count += 1 }
                    .buttonStyle(.borderedProminent)
            }
        }
    }
}
```

## 2.3 List + Navigation

```swift
struct ContactsView: View {
    let contacts = [
        Contact(name: "Nguyễn Văn A", phone: "0901234567"),
        Contact(name: "Trần Thị B", phone: "0912345678")
    ]
    
    var body: some View {
        NavigationStack {
            List(contacts) { contact in
                NavigationLink(value: contact) {
                    HStack {
                        Image(systemName: "person.circle.fill")
                            .font(.largeTitle)
                            .foregroundStyle(.blue)
                        VStack(alignment: .leading) {
                            Text(contact.name).font(.headline)
                            Text(contact.phone).foregroundStyle(.secondary)
                        }
                    }
                }
            }
            .navigationTitle("Danh bạ")
            .navigationDestination(for: Contact.self) { contact in
                ContactDetailView(contact: contact)
            }
        }
    }
}

struct Contact: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let phone: String
}

struct ContactDetailView: View {
    let contact: Contact
    
    var body: some View {
        Form {
            Section("Thông tin") {
                LabeledContent("Tên", value: contact.name)
                LabeledContent("Phone", value: contact.phone)
            }
            Section("Hành động") {
                Button("Gọi điện") {
                    if let url = URL(string: "tel://\(contact.phone)") {
                        UIApplication.shared.open(url)
                    }
                }
            }
        }
        .navigationTitle(contact.name)
    }
}
```

## 2.4 Form + binding

```swift
struct SettingsView: View {
    @State private var name = ""
    @State private var darkMode = false
    @State private var notifications = true
    @State private var language = "vi"
    
    var body: some View {
        Form {
            Section("Thông tin") {
                TextField("Tên hiển thị", text: $name)
            }
            Section("Tuỳ chọn") {
                Toggle("Dark mode", isOn: $darkMode)
                Toggle("Thông báo", isOn: $notifications)
                Picker("Ngôn ngữ", selection: $language) {
                    Text("Tiếng Việt").tag("vi")
                    Text("English").tag("en")
                }
            }
            Section {
                Button("Save") { save() }
                    .frame(maxWidth: .infinity)
            }
        }
    }
    
    func save() {
        UserDefaults.standard.set(name, forKey: "name")
        UserDefaults.standard.set(darkMode, forKey: "darkMode")
    }
}
```

# Chương 3: networking + JSON

```swift
struct Post: Identifiable, Codable {
    let id: Int
    let title: String
    let body: String
}

@Observable
class PostsViewModel {
    var posts: [Post] = []
    var isLoading = false
    var error: String?
    
    func fetchPosts() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
            let (data, _) = try await URLSession.shared.data(from: url)
            posts = try JSONDecoder().decode([Post].self, from: data)
        } catch {
            self.error = error.localizedDescription
        }
    }
}

struct PostsView: View {
    @State private var viewModel = PostsViewModel()
    
    var body: some View {
        NavigationStack {
            List(viewModel.posts) { post in
                VStack(alignment: .leading) {
                    Text(post.title).font(.headline)
                    Text(post.body).foregroundStyle(.secondary).lineLimit(2)
                }
            }
            .overlay {
                if viewModel.isLoading { ProgressView() }
            }
            .navigationTitle("Posts")
            .task { await viewModel.fetchPosts() }
        }
    }
}
```

# Chương 4: Apple Intelligence (on-device LLM)

iOS 18+ có Foundation Models framework:

```swift
import FoundationModels

@Observable
class AISummarizer {
    var summary: String = ""
    var isWorking = false
    
    func summarize(_ text: String) async {
        isWorking = true
        defer { isWorking = false }
        
        do {
            let session = try LanguageModelSession()
            let response = try await session.respond(
                to: "Tóm tắt text sau bằng tiếng Việt, 3 bullet:\n\n\(text)"
            )
            summary = response.content
        } catch {
            summary = "Lỗi: \(error.localizedDescription)"
        }
    }
}
```

Free, on-device, không cần API key, không cần internet.

# Chương 5: AI coding với Cursor + Swift

```bash
# Mở Cursor, mở Xcode project folder
# Prompt:
"Implement login screen với SwiftUI, có:
- Field email, password
- Validation email format
- Loading state
- Error handling
- Animation transition"
```

Cursor gen code Swift, paste vào Xcode, refine.

# Chương 6: features iOS native

## 6.1 Camera + photo

```swift
import PhotosUI

struct PhotoPickerView: View {
    @State private var selectedItem: PhotosPickerItem?
    @State private var selectedImage: UIImage?
    
    var body: some View {
        VStack {
            if let image = selectedImage {
                Image(uiImage: image)
                    .resizable().scaledToFit()
            }
            
            PhotosPicker("Chọn ảnh", selection: $selectedItem, matching: .images)
                .onChange(of: selectedItem) {
                    Task {
                        if let data = try? await selectedItem?.loadTransferable(type: Data.self),
                           let uiImage = UIImage(data: data) {
                            selectedImage = uiImage
                        }
                    }
                }
        }
    }
}
```

## 6.2 Location

```swift
import CoreLocation

@Observable
class LocationManager: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    var location: CLLocation?
    
    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
    }
    
    func requestLocation() {
        manager.requestWhenInUseAuthorization()
        manager.requestLocation()
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        location = locations.first
    }
}
```

Add to `Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>App cần location để tìm dịch vụ gần bạn</string>
```

## 6.3 Push notification (APNs)

Cần backend gửi notification. Setup local first:

```swift
import UserNotifications

func requestNotificationPermission() async {
    do {
        let granted = try await UNUserNotificationCenter.current()
            .requestAuthorization(options: [.alert, .badge, .sound])
        print("Notification granted: \(granted)")
    } catch {
        print(error)
    }
}

func scheduleLocalNotification() {
    let content = UNMutableNotificationContent()
    content.title = "Đến giờ rồi!"
    content.body = "Bạn có task chờ làm"
    content.sound = .default
    
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
    
    UNUserNotificationCenter.current().add(request)
}
```

# Chương 7: publish App Store

## 7.1 Apple Developer account

1. https://developer.apple.com → Enroll
2. $99/năm
3. Verify identity (1-2 ngày)

## 7.2 App ID + certificates

1. Apple Developer portal → Certificates, Identifiers
2. Tạo App ID `com.yourname.MyFirstApp`
3. Xcode tự handle certificate

## 7.3 App icon + screenshots

- App icon: 1024x1024 PNG, no transparency
- Screenshots: required cho mỗi screen size (6.5", 5.5", 12.9" iPad)
- Có thể dùng tool [App Mockup](https://app-mockup.com/) hoặc Figma

## 7.4 App Store Connect

1. https://appstoreconnect.apple.com
2. My Apps → +
3. Fill info:
   - Name, subtitle
   - Description (Vietnamese + English)
   - Keywords
   - Category
   - Age rating
   - Privacy policy URL

## 7.5 Submit build

1. Xcode → Product → Archive
2. Distribute → App Store Connect → Upload
3. Trong App Store Connect: chọn build vừa upload
4. Submit for review

Review thường 1-7 ngày.

## 7.6 TestFlight (beta test trước)

Trước khi public release, mời tester qua TestFlight:
1. App Store Connect → TestFlight tab
2. Internal testing: tới 100 user, không cần review
3. External testing: tới 10,000 user, cần review (nhanh hơn full release)

# Chương 8: best practice

## Performance
- Lazy load lists (LazyVStack, LazyHStack)
- Image caching (AsyncImage hoặc Nuke library)
- Background task cho heavy work
- Profile với Instruments

## UX
- Follow Apple HIG (Human Interface Guidelines)
- Dark mode support
- Dynamic Type (accessibility)
- Haptic feedback
- Animation natural

## Architecture
- MVVM pattern with @Observable
- Dependency injection
- Modular với Swift Package Manager
- Unit test với XCTest

## Security
- Keychain cho secrets (không UserDefaults)
- App Transport Security (HTTPS only)
- Certificate pinning cho banking app
- Biometric auth (FaceID, TouchID)

# Câu hỏi thường gặp

### Q1: Học SwiftUI bao lâu?

- Basic UI: 1-2 tuần
- Production-ready app: 1-3 tháng
- Master: 6-12 tháng

### Q2: Có dùng Cursor / Claude Code cho Swift được không?

Có. Cursor có Swift LSP support. Claude Code generate Swift OK.

### Q3: React Native vs SwiftUI cho VN startup?

| Tiêu chí | SwiftUI native | React Native |
|---|---|---|
| iOS audience | iPhone chỉ ~14% VN | iOS + Android (~99%) |
| Dev time | Lâu hơn 50% | Nhanh |
| Performance | Tốt nhất | Tốt cho most case |
| Tooling | Xcode (Mac only) | Mọi OS |
| Best for | Premium app, AAPL exclusive feature | MVP, cross-platform |

### Q4: SwiftUI vs UIKit?

SwiftUI 2026 đã mature. Default cho project mới. UIKit chỉ cần khi:
- Maintain legacy code
- Cần fine-grained control
- Lib bên thứ 3 chỉ có UIKit version

### Q5: Cost dev iOS?

- Mac: $1000+ (mua mới)
- Apple Developer: $99/năm
- App Store fee: 15-30% revenue
- Tổng MVP cost dev solo: ~$2000-5000

# Tài liệu tham khảo

- [Apple SwiftUI tutorial](https://developer.apple.com/tutorials/swiftui)
- [Hacking with Swift](https://www.hackingwithswift.com/)
- [Apple Developer docs](https://developer.apple.com/documentation)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines)
- [SwiftUI by Example](https://www.hackingwithswift.com/quick-start/swiftui)

---

# Phụ lục: iOS dev 2026 cho VN

## A. Trend 2026

- **Apple Intelligence** đã GA — on-device LLM free trong app
- **Swift 6** strict concurrency mandatory
- **SwiftUI 6** với Observation framework thay @StateObject/@ObservableObject
- **visionOS** mature — opportunity cho VR/AR app
- **App Store Small Business Program** — 15% fee thay 30% nếu revenue < $1M/năm

## B. VN-specific tips

1. **Localization**: support tiếng Việt từ đầu, dùng `String Catalog` (mới iOS 17+)
2. **Payment**: tích hợp Apple Pay (chưa available VN) hoặc StoreKit + IAP, hoặc external payment Momo/ZaloPay (tránh 30% fee)
3. **Push notification VN**: dùng OneSignal hoặc Firebase, fallback Zalo OA
4. **Maps**: Apple Maps cover VN OK, alternative Google Maps SDK
5. **Phone format VN**: dùng `PhoneNumberKit` library, validate +84 format

## C. Stack đề xuất 2026

```
Architecture: MVVM + @Observable
Networking: URLSession + async/await
Image: AsyncImage built-in hoặc Nuke
Database: SwiftData (iOS 17+) hoặc Realm
Auth: Sign in with Apple + custom backend
Payment: StoreKit 2 + Apple Pay (nếu có) / external Stripe
Analytics: TelemetryDeck (privacy-first)
Crash: Sentry hoặc Firebase Crashlytics
Backend: Vapor (Swift server) hoặc Node.js / Supabase
```

## D. Common pitfalls

1. **Force update**: dùng SwiftUI mới, có thể require iOS 17+ → mất user iOS 16-
2. **Memory leak**: closure không [weak self]
3. **Background task quotas**: iOS strict limit
4. **App size bloat**: optimize asset, use App Thinning
5. **Privacy manifest**: iOS 17+ require, declare third-party SDK usage

## Sources

- [Apple Developer 2026](https://developer.apple.com/wwdc25/)
- [SwiftUI Lab](https://swiftui-lab.com/)
- [Point-Free](https://www.pointfree.co/)
- [iOS Dev Weekly](https://iosdevweekly.com/)
