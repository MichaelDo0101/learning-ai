# Graphics + Animation (Canvas + friends)

::: tip 🎯 Core
Web cũ chỉ hiện text + image. Muốn làm game brick breaker, hiệu ứng động đẹp, hoặc báo cáo data drag-drop, chỉ `<div>` không đủ. Đây là lý do **Canvas** ra đời.

Hướng dẫn này dẫn từ vẽ đường đầu tiên, từng bước đến viết particle engine 60fps mượt trong browser.
:::

---

## 1. Canvas là gì?

Web sớm = **lego** (HTML tag) ghép static. HTML5 `<canvas>` tag = **giấy trắng số khổng lồ** + **bút điều khiển bằng code**, còn lại tự do.

Tranh không có tag structure. Vẽ xong = **"pixel màu"** thuần.

### 1.1 Canvas vs SVG: 2 trường phái nghệ sĩ

Đối thủ của Canvas là **SVG**, 2 quan niệm khác:

- **Canvas (bitmap)**:
  - **Nguyên lý**: như tô màu trên giấy thật, vẽ xong = đống màu (pixel)
  - **Ưu**: máy chỉ "rải sơn", performance bay! Vẽ vài nghìn particle nhấp nháy cùng lúc
  - **Nhược**: không undo riêng được (không có DOM node), zoom in → mosaic
- **SVG (vector)**:
  - **Nguyên lý**: như làm PPT. Vẽ 1 vòng = sinh "vòng tròn entity" tag độc lập
  - **Ưu**: zoom 100x hay 10 vạn lần vẫn rõ nét. Mỗi shape là DOM node, CSS/JS đổi màu hoặc bind click
  - **Nhược**: vài vạn object bay lung tung = DOM tree nặng → browser kẹt

**🎮 Tóm tắt: game động + particle dùng Canvas; logo + chart interactive dùng SVG.**

---

## 2. Bút đầu tiên: hệ toạ độ phản trực giác

### 2.1 Sao trang giấy này lộn ngược?

Trước khi vẽ, hiểu thước ở Canvas ngược. Toạ độ toán học: gốc ở giữa, lên = lớn. Computer screen: **gốc (0,0) ở góc trên-trái màn hình**. X sang phải = lớn (OK), nhưng **Y xuống dưới = lớn**.

**Core**:
- **Unit**: pixel (px), 1:1 với pixel vật lý
- **X**: phải = dương, từ `0` đến `canvas.width`
- **Y**: xuống = dương, từ `0` đến `canvas.height`

👇 Drag điểm tròn, cảm nhận origin + direction:

<CoordinateSystemDemo />

### 2.2 Tô bút magic

Có toạ độ, gọi bút (gọi `Context` hoặc `ctx`). API Canvas theo 3 step physical drawing:

1. **Mix màu (State)**: `fillStyle` set fill, `strokeStyle` set stroke
2. **Tạo shape (Path)**: vẽ line (`lineTo`), tròn (`arc`), rect (`rect`)
3. **Vẽ (Render)**: fill (`fill()`) hoặc viền (`stroke()`)

Vì Canvas là bitmap thuần, "đặt bút khó undo", vẽ là pixel khô, không undo thành object độc lập.

👇 Thử chọn shape + color khác:

<CanvasBasicsDemo />

---

## 3. Sách flipbook: animation mượt thế nào?

Canvas tô màu là pixel vĩnh viễn, nhân vật trong HTML5 page game chạy khắp screen sao?

Đáp án: **"lừa mắt"**. Như flipbook hoặc film.

1. **Xoá bảng (Clear)**: `clearRect()` xoá hết
2. **Tính position mới (Update)**: X coordinate +2 pixel
3. **Vẽ lại (Render)**: vẽ ở position mới
4. **Loop cuồng (Loop)**: dùng metronome `requestAnimationFrame` chính xác browser. Lặp với refresh rate màn hình (thường 60/giây = 60 FPS)

Mắt có "visual persistence", 60 lần/giây [clear → update → redraw] = thấy mượt như lụa.

👇 Demo speed:

<AnimationLoopDemo />

---

## 4. Người mù sờ voi: click interaction trên Canvas thế nào?

Canvas trong browser chỉ là "canvas màu" không có structure. Vẽ con quái bằng `arc()`, muốn "click quái trừ máu", **không thể** dùng `document.getElementById`. Trong HTML chỉ có tag `<canvas>` 600px cố định.

Đây là vấn đề kinh điển: **Collision Detection + Event Delegation**.

Browser chỉ biết chuột click toạ độ Canvas `(x, y)`, bạn phải tự tính ngược bằng hình học cấp 2:
- **Tròn**: pythagore tính distance từ click → tâm, nhỏ hơn radius = "trúng"
- **Rect**: judge `x` trong biên trái-phải, `y` trong biên trên-dưới

Dù canvas có bao nhiêu element, mouse event luôn bind vào container Canvas duy nhất. Đây là "event delegation" tối thượng.

👇 Thử mouse (click, drag, hover) hoặc keyboard:

<EventHandlingDemo />

---

## 5. Giải phóng compute: Particle System

Ghép "hệ toạ độ" + "animation loop" + "color/shape", boost lên hàng trăm hàng nghìn mảnh nhỏ = vũ khí cuối: **Particle System**.

Idea core đơn giản:
1. Build array khổng lồ chứa hàng trăm "particle object"
2. Mỗi object có life cycle riêng (`life`), velocity (`vx/vy`), gravity damping
3. Mỗi `requestAnimationFrame` trigger, iterate update, render, clear particle "chết"

Browser tức khắc thành nhà máy mộng tạo pháo hoa, tuyết, nổ.

👇 Click hiệu ứng, chỉnh gravity + particle count:

<ParticleSystemDemo />

---

## 6. Bảo vệ FPS: CPU "sốt" sao?

Vài nghìn object compute + redraw 60 lần/giây cực tốn perf. Quạt CPU bay nhanh.

"Tuyệt kỹ" của engine pro:

1. **Local clear (Dirty Rect)**: nhân vật chạy trên thảo nguyên, đừng `clearRect` cả thảo nguyên! Đi qua khu nào, xoá + redraw khu đó. Perf tăng exponential.

2. **Backstage (Offscreen Canvas)**: nếu BG là sao trời, núi non phức tạp, mỗi frame render real-time là ngu. Tạo `<canvas>` ẩn trong memory, vẽ 1 lần đẹp. Mỗi frame sau dùng `drawImage()` paste "tấm nền tĩnh" — bỏ tính cơ bản hàng loạt.

3. **Batch rendering**: từ red sang blue trong bảng màu underlying là expensive. Nếu canvas có 1000 vòng đỏ + 1000 vòng xanh xen kẽ. Nhanh nhất: chuẩn bị sơn đỏ → vẽ hết vòng đỏ → đổi sơn xanh → vẽ hết. Đây là Batch Rendering nổi tiếng.

👇 Kéo object count lên 3000+, xem web lag, bật từng "optimization":

<PerformanceDemo />

---

## 7. Glossary

| Term | Giải thích |
| --- | --- |
| **Canvas** | HTML5 2D canvas. Vẽ cực nhanh, nhưng vẽ xong = pixel, không DOM op |
| **SVG** | Vector. Zoom không mờ, mỗi shape là tag độc lập, CSS/interaction dễ |
| **Context (ctx)** | "Bút magic 2D" để mix color, set shape, draw |
| **requestAnimationFrame** | Metronome thần của browser, chạy theo refresh rate màn hình |
| **FPS** | Frame rate. 60 FPS = 1 giây browser clear + redraw 60 lần |
| **Dirty Rect** | Chỉ clear + redraw vùng đổi → giữ perf mạnh |
| **Offscreen Canvas** | "Shadow canvas" trong memory. Vẽ trước cảnh phức tạp tĩnh, reuse |

::: tip 2026 cho VN dev
- **WebGL/WebGPU**: cho 3D, GPU acceleration. Three.js, Babylon.js, PixiJS
- **Canvas libs**: Fabric.js (interactive object), Konva.js (DOM-like), Pixi.js (2D performance)
- **Animation libs**: GSAP (universal), Framer Motion (React), Motion One (lightweight)
- **Lottie**: After Effects animation → web (mướt, nhỏ)
- **WebGPU 2025+**: thay WebGL, mạnh hơn nhiều
- **VN game dev**: Cocos Creator phổ biến cho HTML5 game
- **AI + Canvas**: Stable Diffusion in browser, Whisper.cpp UI
:::

> Từ 1 đường thẳng đơn giản đến particle system rực rỡ; mọi hiệu ứng magic chỉ là 60 lần/giây tính toán + redraw.
