# Build Android App với Jetpack Compose

::: tip Cập nhật 2026
- **Kotlin 2.1** stable với Compose multiplatform improvements
- **Jetpack Compose 1.8** default cho Android dev mới
- **Android Studio Narwhal 2026.1+** với Gemini in IDE
- **Android 15+** target SDK requirement cho new apps trên Play Store
- **VN context**: Android chiếm ~85% VN market — mass market app PHẢI có Android
:::

## Tại sao Android native + Jetpack Compose?

- Android 85% VN — mass market reach
- Jetpack Compose: modern declarative UI (giống SwiftUI)
- Kotlin: concise, type-safe, official Google
- Performance native tốt nhất
- Free dev tool, dev được trên mọi OS (Windows, Mac, Linux)

## Prerequisites

- **Android Studio** (free, ~3GB)
- **JDK 17+** (Android Studio install kèm)
- **Android device** hoặc emulator để test
- **Google Play Developer account** ($25 one-time, chỉ cần khi publish)

# Chương 1: setup

## 1.1 Cài Android Studio

1. Download https://developer.android.com/studio
2. Install (~3GB)
3. Mở → Setup Wizard
4. Install SDK platform (Android 15)
5. Install AVD (Android Virtual Device)

## 1.2 Tạo project

1. New Project → "Empty Activity" (Compose)
2. Name: `MyFirstApp`
3. Package: `com.yourname.myfirstapp`
4. Language: **Kotlin**
5. Minimum SDK: API 24 (Android 7.0) — cover 99% device
6. Build configuration: Kotlin DSL

Project structure:
```
app/
├── src/main/
│   ├── AndroidManifest.xml
│   ├── kotlin/com/yourname/myfirstapp/
│   │   ├── MainActivity.kt
│   │   └── ui/theme/
│   └── res/
└── build.gradle.kts
```

## 1.3 Run trên Emulator

1. Tools → Device Manager → Create Device → Pixel 8 Pro
2. Click ▶️ Run
3. App build và chạy trong emulator

# Chương 2: Compose fundamentals

## 2.1 MainActivity

```kotlin
package com.yourname.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    GreetingScreen()
                }
            }
        }
    }
}

@Composable
fun GreetingScreen() {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Xin chào Việt Nam!",
            style = MaterialTheme.typography.headlineLarge
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "Welcome to Jetpack Compose",
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyAppTheme { GreetingScreen() }
}
```

## 2.2 State management

```kotlin
@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }
    
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Đếm: $count",
            style = MaterialTheme.typography.headlineMedium
        )
        Spacer(modifier = Modifier.height(16.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Button(onClick = { count-- }) { Text("−") }
            Button(onClick = { count++ }) { Text("+") }
        }
    }
}
```

## 2.3 List + Navigation

```kotlin
data class Contact(val name: String, val phone: String)

@Composable
fun ContactsScreen(onContactClick: (Contact) -> Unit) {
    val contacts = listOf(
        Contact("Nguyễn Văn A", "0901234567"),
        Contact("Trần Thị B", "0912345678"),
        Contact("Lê Minh C", "0923456789")
    )
    
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(contacts) { contact ->
            ContactItem(contact = contact, onClick = { onContactClick(contact) })
            Divider()
        }
    }
}

@Composable
fun ContactItem(contact: Contact, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = Icons.Default.Person,
            contentDescription = null,
            modifier = Modifier.size(40.dp)
        )
        Spacer(modifier = Modifier.width(16.dp))
        Column {
            Text(contact.name, style = MaterialTheme.typography.titleMedium)
            Text(contact.phone, style = MaterialTheme.typography.bodyMedium)
        }
    }
}
```

## 2.4 Navigation

```gradle
// build.gradle.kts (Module: app)
dependencies {
    implementation("androidx.navigation:navigation-compose:2.8.0")
}
```

```kotlin
@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    
    NavHost(navController = navController, startDestination = "contacts") {
        composable("contacts") {
            ContactsScreen(onContactClick = { contact ->
                navController.navigate("detail/${contact.name}")
            })
        }
        composable("detail/{name}") { entry ->
            val name = entry.arguments?.getString("name") ?: ""
            ContactDetailScreen(name = name)
        }
    }
}
```

# Chương 3: networking với Retrofit + Coroutines

## 3.1 Dependency

```gradle
dependencies {
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-moshi:2.11.0")
    implementation("com.squareup.moshi:moshi-kotlin:1.15.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.0")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.0")
}
```

## 3.2 API service

```kotlin
import retrofit2.http.GET

data class Post(val id: Int, val title: String, val body: String)

interface ApiService {
    @GET("posts")
    suspend fun getPosts(): List<Post>
}

object RetrofitClient {
    val api: ApiService = Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(MoshiConverterFactory.create())
        .build()
        .create(ApiService::class.java)
}
```

## 3.3 ViewModel + UI

```kotlin
class PostsViewModel : ViewModel() {
    var posts by mutableStateOf<List<Post>>(emptyList())
        private set
    var isLoading by mutableStateOf(false)
        private set
    var error by mutableStateOf<String?>(null)
        private set
    
    fun fetchPosts() {
        viewModelScope.launch {
            isLoading = true
            try {
                posts = RetrofitClient.api.getPosts()
            } catch (e: Exception) {
                error = e.message
            } finally {
                isLoading = false
            }
        }
    }
}

@Composable
fun PostsScreen(viewModel: PostsViewModel = viewModel()) {
    LaunchedEffect(Unit) { viewModel.fetchPosts() }
    
    Box(modifier = Modifier.fillMaxSize()) {
        when {
            viewModel.isLoading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            viewModel.error != null -> Text("Lỗi: ${viewModel.error}", color = Color.Red)
            else -> LazyColumn {
                items(viewModel.posts) { post ->
                    PostItem(post)
                }
            }
        }
    }
}
```

# Chương 4: Gemini Nano on-device

Android 14+ có Gemini Nano built-in:

```gradle
dependencies {
    implementation("com.google.ai.edge.aicore:aicore:0.0.1-exp01")
}
```

```kotlin
import com.google.ai.edge.aicore.GenerativeModel

class AISummarizer(private val context: Context) {
    private val model = GenerativeModel(
        generationConfig {
            temperature = 0.7f
            maxOutputTokens = 500
        }
    )
    
    suspend fun summarize(text: String): String {
        val response = model.generateContent(
            "Tóm tắt text sau bằng tiếng Việt, 3 bullet point:\n\n$text"
        )
        return response.text ?: "Không có kết quả"
    }
}
```

Free, on-device, không cần internet.

# Chương 5: features Android native

## 5.1 Camera

```kotlin
@Composable
fun CameraScreen() {
    val context = LocalContext.current
    var capturedImage by remember { mutableStateOf<Bitmap?>(null) }
    
    val cameraLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.TakePicturePreview()
    ) { bitmap -> capturedImage = bitmap }
    
    Column {
        Button(onClick = { cameraLauncher.launch(null) }) {
            Text("Chụp ảnh")
        }
        capturedImage?.let { bitmap ->
            Image(bitmap = bitmap.asImageBitmap(), contentDescription = null)
        }
    }
}
```

## 5.2 Location

```gradle
dependencies {
    implementation("com.google.android.gms:play-services-location:21.3.0")
}
```

```kotlin
import com.google.android.gms.location.LocationServices

suspend fun getCurrentLocation(context: Context): Location? {
    val fusedLocationClient = LocationServices.getFusedLocationProviderClient(context)
    return suspendCoroutine { continuation ->
        fusedLocationClient.lastLocation
            .addOnSuccessListener { location -> continuation.resume(location) }
            .addOnFailureListener { continuation.resume(null) }
    }
}
```

Add permission trong `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

## 5.3 Local storage với DataStore

```gradle
dependencies {
    implementation("androidx.datastore:datastore-preferences:1.1.0")
}
```

```kotlin
val Context.dataStore by preferencesDataStore(name = "settings")

class SettingsRepository(private val context: Context) {
    private val THEME_KEY = stringPreferencesKey("theme")
    
    val themeFlow: Flow<String> = context.dataStore.data
        .map { preferences -> preferences[THEME_KEY] ?: "light" }
    
    suspend fun setTheme(theme: String) {
        context.dataStore.edit { preferences ->
            preferences[THEME_KEY] = theme
        }
    }
}
```

## 5.4 Database với Room

```gradle
dependencies {
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
}
```

```kotlin
@Entity
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val content: String,
    val createdAt: Long = System.currentTimeMillis()
)

@Dao
interface NoteDao {
    @Query("SELECT * FROM Note ORDER BY createdAt DESC")
    fun getAll(): Flow<List<Note>>
    
    @Insert
    suspend fun insert(note: Note)
}

@Database(entities = [Note::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao
}
```

# Chương 6: publish Play Store

## 6.1 Google Play Developer account

1. https://play.google.com/console
2. $25 one-time fee
3. Verify identity

## 6.2 Build signed APK / AAB

1. Build → Generate Signed Bundle/APK
2. Choose Android App Bundle (AAB) — required by Play Store
3. Create keystore (lưu kỹ! Mất là không update được app)
4. Sign release variant

## 6.3 Upload Play Console

1. Create app
2. Fill app details:
   - Title, short description, full description (cả VN + EN)
   - Category (Productivity, Games...)
   - Content rating questionnaire
   - Target audience
3. Upload screenshots, icon (512x512), feature graphic (1024x500)
4. Upload AAB
5. Submit for review

Review thường 1-7 ngày.

## 6.4 Internal testing trước

Trước public release:
1. Play Console → Testing → Internal testing
2. Add 100 tester via email
3. Tester opt-in via link
4. Test feedback → fix → re-upload

# Chương 7: best practice

## Performance
- Compose performance: `remember`, `derivedStateOf`, `key` đúng cách
- Lazy lists cho data lớn
- Image caching: Coil library
- Profile với Android Studio Profiler

## UX
- Material Design 3 guidelines
- Dark theme support
- Edge-to-edge display (Android 15+)
- Adaptive layout cho tablet, foldable
- Vietnamese localization

## Architecture
- MVVM với ViewModel + StateFlow
- Use Cases / Repository pattern
- Dependency injection (Hilt)
- Module hoá với Gradle modules
- Test: JUnit + Compose UI test

## Security
- Encrypted SharedPreferences cho secret
- Network security config (HTTPS only)
- Certificate pinning cho banking
- Biometric auth
- ProGuard / R8 cho release build

# Câu hỏi thường gặp

### Q1: Compose vs XML View?

Compose 2026 đã mature. Default cho project mới. XML View vẫn dùng được khi:
- Maintain legacy
- Cần feature chưa có ở Compose
- Lib bên thứ 3 chỉ XML

### Q2: Java vs Kotlin?

Kotlin official từ 2017. Tất cả new project nên Kotlin. Java vẫn work nhưng deprecated cho new feature.

### Q3: React Native vs Native Android cho VN?

| Tiêu chí | Native Android | React Native |
|---|---|---|
| Performance | Tốt nhất | Tốt cho most case |
| Dev time | Lâu hơn | Nhanh |
| Audience | Android only | iOS + Android share code |
| Tooling | Mature (Android Studio) | Maturing |
| Best for | Performance-critical, native feature | MVP, cross-platform |

### Q4: Cost dev Android?

- Hardware: $0 (work trên Windows/Mac/Linux thường có)
- Android Studio: free
- Play Developer: $25 one-time
- Play Store fee: 15-30% revenue
- Tổng MVP dev solo: $25 + thời gian

### Q5: Học bao lâu?

- Basic Compose UI: 2-3 tuần
- Production-ready app: 2-4 tháng
- Master: 6-12 tháng

# Tài liệu tham khảo

- [Official Android docs](https://developer.android.com/docs)
- [Jetpack Compose tutorial](https://developer.android.com/jetpack/compose/tutorial)
- [Material Design 3](https://m3.material.io/)
- [Kotlin official](https://kotlinlang.org/docs/home.html)
- [Now in Android podcast](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc9CBxr3BVjPTPoDPLdPIFCE)

---

# Phụ lục: Android dev 2026 cho VN

## A. Trend 2026

- **Compose Multiplatform** (Q2/2026): share code Android + iOS + Desktop + Web
- **Gemini in Android Studio** (Narwhal): AI built-in IDE
- **AndroidX Bluetooth** new API
- **App size budget**: Play Store limit 200MB bundle, 4GB total
- **Privacy Sandbox**: SDK Runtime, FLEDGE for advertising

## B. VN-specific tips

1. **Localization**: tiếng Việt từ đầu, dùng `res/values-vi/strings.xml`
2. **Payment**: Google Play Billing ($) hoặc external (Momo, ZaloPay) cho subscription. Cẩn thận Google policy
3. **Push**: Firebase Cloud Messaging (FCM) standard
4. **Maps**: Google Maps SDK, alternative MapBox
5. **Phone format VN**: dùng `libphonenumber` library
6. **VietQR**: tích hợp `viet-qr-android` library
7. **Vietnam ID OCR**: Mindee API hoặc custom ML model

## C. Stack đề xuất 2026

```
UI: Jetpack Compose + Material 3
Architecture: MVVM + StateFlow + Use Cases
DI: Hilt
Network: Retrofit + OkHttp + Moshi
Database: Room + DataStore
Auth: Firebase Auth + Google Sign-In + Sign in with Zalo
Image: Coil 2.x
Async: Coroutines + Flow
Test: JUnit5 + Mockk + Compose UI Test
Analytics: Firebase Analytics + Posthog
Crash: Firebase Crashlytics hoặc Sentry
CI/CD: GitHub Actions + Fastlane
```

## D. Common pitfalls

1. **Recomposition vô độ**: dùng `remember`, `derivedStateOf` tránh re-render thừa
2. **Memory leak**: ViewModel hold Context → leak
3. **Background task**: Android 15+ restrict tighter, dùng WorkManager
4. **Permission**: Android 13+ có notification permission, 14+ có photo permission granular
5. **Target SDK update mandatory**: mỗi năm phải bump target SDK
6. **Sign in with Google**: deprecate cách cũ, dùng Credential Manager (Android 14+)

## E. Build cho thị trường lower-end VN

VN có nhiều device tier-2 (low RAM, slow CPU):
- Test trên emulator API 28-30 (mid-range device)
- Optimize cho 2GB RAM device
- App size <50MB lý tưởng
- Use Lite Mode (Firebase) cho slow network
- Offline-first design

## Sources

- [Android Developers Blog](https://android-developers.googleblog.com/)
- [Jetpack Compose docs](https://developer.android.com/jetpack/compose)
- [Coding with Mitch](https://www.youtube.com/c/CodingWithMitch)
- [Android Weekly](https://androidweekly.net/)
