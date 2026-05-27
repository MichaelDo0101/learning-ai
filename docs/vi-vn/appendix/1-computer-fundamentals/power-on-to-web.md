# Từ nhấn nút nguồn đến truy cập website

::: tip Mở đầu
Bạn có nghĩ, khi nhấn nút nguồn, đến khi thấy trang web trên browser, ở giữa xảy ra gì?

Quá trình như **cuộc đua tiếp sức** — hardware có điện đánh thức firmware, firmware check xong giao gậy cho OS, OS chuẩn bị env xong mới run browser, browser qua network lấy trang từ server xa. Mỗi mắt xích **phụ thuộc thành công của mắt trước**, mắt nào tuột là sau không chạy được.

Hiểu chuỗi này = hiểu tổng thể computer system, là must cho fullstack engineer.
:::

**Bạn sẽ học**:

Theo thứ tự xảy ra thực tế, đi qua 5 stage:

1. **Hardware boot** → điện đánh thức CPU thế nào
2. **Firmware self-test** → BIOS/UEFI check hardware + tìm boot device
3. **OS boot** → kernel load, desktop xuất hiện
4. **Browser launch** → app được OS run thế nào
5. **Network request** → từ gõ URL đến render page

Mỗi step build trên step trước, không thiếu được.

---

## 1. Nhấn nguồn: hardware tỉnh dậy

### 1.1 Power on

Nhấn nguồn, **PSU (Power Supply Unit)** chuyển AC (220V) → DC (12V, 5V, 3.3V), cấp cho hardware.

```
Power button → PSU → DC output → Mainboard
```

### 1.2 Chipset awake

Power ổn định, **mainboard chipset** start, làm "tổng điều phối" phối hợp hardware.

### 1.3 CPU reset

CPU nhận reset signal, clear register + cache, start execute từ 1 address preset. Address này thường trỏ về **BIOS/UEFI** chip.

<PowerOnDemo />

---

> **Gậy 1 hoàn thành** ⛳ Hardware level done: PSU convert AC→DC ổn định, chipset awake, CPU reset xong, sẵn sàng execute instruction đầu tiên.
>
> Nhưng giờ CPU như "em bé mới mở mắt". Execute instruction được, nhưng không biết env: máy có bao nhiêu RAM? GPU work không? HDD đâu? Boot OS từ device nào? CPU tự không trả lời được.
>
> Vì vậy instruction đầu tiên sau reset là jump tới 1 **address cố định** — chỉ về BIOS/UEFI firmware. Control từ pure hardware giao cho firmware. Nhiệm vụ BIOS/UEFI: **check mọi hardware OK, tìm OS, khởi động OS**. Đây là gậy 2.

## 2. BIOS/UEFI: hardware self-test

<BiosUefiInteractiveDemo />

---

> **Gậy 2 hoàn thành** ⛳ BIOS/UEFI làm xong 3 sứ mệnh: POST self-test (RAM, GPU, keyboard OK), init hardware mode, theo boot order tìm boot sector.
>
> Nhưng BIOS/UEFI dừng ở đây — nó là "bác sĩ + dispatcher". Check hardware, quyết boot từ device nào, nhưng không quản file, không run app, không hiện desktop. Cần software mạnh hơn — **OS**.
>
> Giao thế nào: BIOS/UEFI đọc bootloader code từ boot sector của disk, load vào memory, CPU jump tới đó execute. Control từ firmware → OS bootloader. Bootloader load kernel, start system services, cuối hiện desktop quen thuộc. Gậy phức tạp nhất bắt đầu.

## 3. OS boot: từ kernel đến desktop

<OSBootInteractiveDemo />

---

> **Gậy 3 hoàn thành** ⛳ OS startup xong, desktop hiện ra. Recap: bootloader load kernel, kernel take CPU+memory, system services start (network, audio, security...), cuối cùng GUI render desktop.
>
> OS giờ như toà nhà đã thông nước-điện, BQL vào: **process management** chia phòng cho program, **memory management** chia space, **file system** quản kho, **network stack** giao tiếp ngoài. Là infrastructure cho mọi app.
>
> Bạn double-click browser icon. OS phải: tìm executable, tạo process, allocate memory, load code... Đây là khả năng "process management" của OS.

## 4. Mở browser: app khởi động

### 4.1 Quá trình launch app

Double-click browser icon, OS:

1. **Tìm executable**: theo file association, tìm `.exe` (Windows) hoặc exec
2. **Tạo process**: tạo process mới cho browser
3. **Load program**: load code browser từ disk vào memory
4. **Init**: start main thread, render engine, network engine

```
Browser startup:
1. Double-click icon
2. OS tìm browser executable
3. Tạo browser process
4. Load code vào memory
5. Init modules (render, network, JS)
6. Hiện browser window
```

### 4.2 Component chính của browser

Browser hiện đại = "OS phức tạp":

| Module | Function |
|-----|------|
| **UI** | Address bar, tabs, bookmarks |
| **Browser engine** | Phối UI + render |
| **Render engine** | Parse HTML/CSS, hiện page |
| **JavaScript engine** | Execute JS |
| **Network module** | HTTP request |
| **UI backend** | Vẽ UI basic |
| **Data storage** | Cookie, LocalStorage |

<BrowserArchitectureDemo />

---

> **Gậy 4 hoàn thành** ⛳ Browser startup OK. OS tạo process riêng, allocate memory, các module browser init xong: render engine sẵn sàng parse HTML/CSS, JS engine sẵn sàng execute script, network module sẵn sàng gửi/nhận data.
>
> Tưởng browser như xe đã nổ máy — engine chạy, dashboard sáng, GPS sẵn, nhưng xe đứng yên vì tài (bạn) chưa bảo "đi đâu". Window trống, cursor nhấp nháy ở address bar.
>
> Gõ `https://www.example.com` enter — cuộc hành trình xuyên Internet bắt đầu. Network module browser take over: parse URL, DNS translate domain → IP, TCP connect server xa, TLS handshake encrypt channel, send HTTP request, đợi response, render engine vẽ HTML/CSS/JS thành page. Gậy có nhiều step + protocol nhất.

## 5. Truy cập URL: network request full

### 5.1 URL là gì?

**URL (Uniform Resource Locator)** = address của resource trên Internet.

```
URL structure:
https://  │  www.example.com  │  /path/to/page  │ ?query=1
protocol  │      domain       │      path       │   query
```

- **Protocol**: http, https, ftp
- **Domain**: address server
- **Path**: vị trí resource
- **Query**: param thêm

### 5.2 Quá trình full

Khi truy cập `https://www.example.com`:

<URLRequestDemo />

#### Step 1: URL parsing

Browser parse URL, extract protocol/domain/path.

#### Step 2: DNS resolution

Network dùng **IP** (vd 93.184.216.34), không phải domain. Cần convert domain → IP qua **DNS**.

```
DNS flow:
Browser cache → hosts file → local DNS cache → DNS server

Thực tế:
1. Browser check cache
2. OS check DNS cache
3. Send query tới DNS server
4. DNS server trả IP
```

#### Step 3: TCP connect

Có IP, browser establish **TCP connection** với server.

```
TCP 3-way handshake:
Client → Server: SYN
Server → Client: SYN-ACK
Client → Server: ACK
→ Connection established!
```

Nếu **HTTPS**, thêm **TLS/SSL handshake** để encrypt.

#### Step 4: Send HTTP request

```
HTTP request format:
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0...
Accept: text/html
(empty line)
```

| Method | Nghĩa | Use |
|-----|------|-----|
| **GET** | Lấy resource | Xem page |
| **POST** | Submit data | Login, form |
| **PUT** | Upload | Upload file |
| **DELETE** | Delete | Xoá data |

#### Step 5: Server xử request

Server (thường **Web server** như Nginx, Apache) nhận request:

1. **Parse request**
2. **Process business**: gọi backend (Python, Node.js, Java)
3. **Query DB**: lấy data
4. **Generate response**: assemble HTML, JSON

```
Server flow:
1. Web server nhận request (Nginx/Apache)
2. Theo path tìm handler
3. Execute backend code (API, business)
4. Query DB nếu cần
5. Assemble response (HTML/JSON/CSS/JS)
6. Return HTTP response
```

#### Step 6: HTTP response

```
HTTP response format:
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<!DOCTYPE html>
<html>...</html>
```

| Code | Nghĩa |
|-------|------|
| **200** | Success |
| **301/302** | Redirect |
| **404** | Not found |
| **500** | Server error |

#### Step 7: Browser render

<RenderingDemo />

1. **Parse HTML** → DOM tree
2. **Parse CSS** → style rules → render tree
3. **Execute JS**
4. **Paint** → pixel trên màn hình

```
Browser render:
1. HTML parse → DOM tree
2. CSS parse → style rules
3. DOM + CSS → render tree
4. Layout → kích thước + vị trí mỗi element
5. Paint → pixel ra màn hình
6. Composite → multi-layer merge
```

---

> **Gậy cuối hoàn thành** ⛳ Page hiện trên màn hình! Recap: browser parse URL, DNS lấy IP, TCP 3-way handshake establish connection, TLS handshake encrypt, send HTTP request, server xử business + query DB + assemble response, render engine parse HTML → DOM, CSS → style rules, merge thành render tree, layout, paint pixel.
>
> Zoom out toàn cuộc đua: từ nhấn nguồn → điện đánh thức hardware (gậy 1) → firmware check + tìm boot disk (gậy 2) → OS boot từ kernel đến desktop (gậy 3) → browser được OS run (gậy 4) → network request xuyên Internet lấy data + render page (gậy 5). 5 gậy nối nhau, mỗi gậy build trên gậy trước.

## 6. Recap full flow

<FullProcessDemo />

```
Từ nhấn nguồn đến truy cập website:

1. Power on
   └── PSU start → Chipset awake → CPU reset → Execute BIOS/UEFI

2. BIOS/UEFI boot
   └── Hardware self-test → Find boot device → Read bootloader

3. OS boot
   └── Bootloader → Load kernel → Start services → Show desktop

4. Open browser
   └── Double-click icon → Create process → Load program → Show window

5. Access URL
   └── URL parse → DNS → TCP → HTTP request
       → Server process → HTTP response → Browser render → Show page
```

---

> Mỗi stage giải vấn đề hoàn toàn khác, technology domain khác. Gậy 1 = **electronic engineering** (power, circuit, signal); gậy 2 = **firmware programming** (low-level control hardware); gậy 3 = **OS** (process scheduling, memory, file system); gậy 4 = **app dev**; gậy 5 = **network + frontend** (DNS, TCP/IP, HTTP, HTML/CSS/JS).
>
> Vì sao "fullstack engineer" cần kiến thức rộng: mỗi dòng FE code đều qua cả chuỗi này tới user. Hiểu mỗi mắt xích = định vị nhanh — vấn đề ở network? server? browser render?

## 7. Knowledge map

```
Computer system overview
├── Hardware
│   ├── PSU
│   ├── Chipset
│   └── CPU
├── BIOS/UEFI
│   ├── POST self-test
│   ├── Boot order
│   └── Bootloader
├── OS
│   ├── Kernel
│   ├── System services
│   └── Desktop env
├── App
│   ├── Process management
│   └── Program loading
└── Network
    ├── DNS
    ├── TCP/IP
    ├── HTTP
    └── Browser rendering
```

::: tip 2026 context
- **Secure boot + UEFI**: Windows 11 require, chống bootkit
- **Apple Silicon boot**: Apple riêng iBoot, không phải UEFI
- **Cloud VM boot**: cloud-init thay 1 phần OS boot
- **WebAssembly + Web Workers**: browser ngày càng OS-like
- **HTTP/3 + QUIC**: thay TCP cho web hiện đại
- **VN dev**: hiểu full chain giúp debug "page không load" — đâu trong 5 gậy?
:::

::: tip Tiếp theo
- [Transistor đến CPU](./transistor-to-cpu.md)
- [Operating Systems](./operating-systems.md)
- [Computer Networks](./computer-networks.md)
:::
