# Port và localhost

> 💡 **Hướng dẫn**: khi `npm run dev`, terminal hiện `http://localhost:5173`, bạn có nghĩ: `localhost` là gì? `5173` nghĩa là gì? Sao đôi khi báo `EADDRINUSE`? Chương này giải thích những concept ngày nào cũng thấy nhưng ít khi hiểu sâu.

Trước khi bắt đầu, khuyến nghị bổ sung:
- **Network basics**: chưa rõ IP + HTTP → xem [Network communication](../1-computer-fundamentals/computer-networks.md)
- **Terminal basics**: chưa quen CLI → xem [Command line + Shell script](./command-line-shell.md)

---

## 0. Mở đầu: `localhost:5173` ngày nào cũng thấy là gì?

<DevServerFlowDemo />

Dev nào cũng quen dòng này:

```
➜  Local:   http://localhost:5173/
```

Nhưng dòng ngắn này chứa nhiều concept:

- **http://** → protocol (nói thứ tiếng gì)
- **localhost** → target address (tìm ai)
- **:5173** → port (tìm rồi, gõ cửa nào)

Hiểu 3 thứ này = hiểu 90% network issues dev env.

---

## 1. Port là gì? (IP = toà nhà, port = số phòng)

### 1.1 Ẩn dụ trực quan

Tưởng tượng server là toà nhà:

- **IP** (vd `192.168.1.100`) = địa chỉ toà nhà — "đi toà nào"
- **Port** (vd `:80`) = số phòng — "vào phòng nào"

1 toà có thể có cùng lúc nhà hàng (phòng 80), café (443), văn phòng (22). Tương tự, 1 máy có thể chạy cùng lúc Web server, DB, SSH, mỗi cái 1 port.

👇 **Click thử**: click "số phòng" dưới, simulate connect port khác nhau. Quan sát: port "mở" (có program listen) vs "đóng" — gì xảy ra?

<PortAnalogyDemo />

### 1.2 Range port

Port là số nguyên **0–65535** (tổng 65536). Chia 3 range:

| Range | Số | Use | Ví dụ |
| :--- | :--- | :--- | :--- |
| **System ports** | 0–1023 | Pre-reserved cho standard protocol, user thường không dùng được | 80 (HTTP), 443 (HTTPS), 22 (SSH) |
| **Registered ports** | 1024–49151 | Register cho common app | 3306 (MySQL), 5432 (PostgreSQL), 6379 (Redis) |
| **Dynamic ports** | 49152–65535 | OS tạm cấp | Browser gửi request → OS random pick source port |

> Sao dev server thích dùng 3000, 5173, 8080? Vì trong "registered range", không cần admin, ít conflict với system service.

### 1.3 Common port speed cheat

👇 **Click thử**: nhập port hoặc service name search, click row để expand ví dụ.

<CommonPortsDemo />

---

## 2. localhost là gì? (tự tìm chính mình)

### 2.1 Core concept: "loopback"

`localhost` là domain đặc biệt, luôn trỏ về **chính máy bạn**.

Khi bạn gõ `http://localhost:3000` vào browser:

1. Browser hỏi OS: "IP của `localhost` là gì?"
2. OS trả lời ngay: "`127.0.0.1`" (không cần DNS lookup)
3. Packet gửi tới `127.0.0.1`, nhưng **không thật sự rời máy**
4. OS qua "loopback interface" gửi packet **vòng lại**
5. Program listen port 3000 nhận request, trả response

**Cả quá trình không qua dây mạng, không qua router, không cần Internet.**

👇 **Click thử**: click "send request", quan sát hành trình packet. Click "alias card" dưới hiểu các cách viết localhost.

<LocalhostLoopbackDemo />

### 2.2 `localhost` vs `127.0.0.1` vs `0.0.0.0`

3 concept hay confused, nhưng nghĩa khác hoàn toàn:

| Cách viết | Nghĩa | Ai access được |
| :--- | :--- | :--- |
| `localhost` / `127.0.0.1` | Loopback, chỉ máy bạn | Chỉ máy bạn |
| `0.0.0.0` | Listen mọi network interface | Máy bạn + thiết bị khác trong LAN |
| `192.168.x.x` | LAN IP | Thiết bị trong LAN |

**Scenario thực**:

```bash
# Chỉ mình access (an toàn, hợp dev)
npm run dev -- --host localhost

# Điện thoại cũng access (hợp mobile debug)
npm run dev -- --host 0.0.0.0
```

> Nhiều framework (Vite, Next.js) default listen `localhost`, nên điện thoại dù cùng WiFi cũng không access được. Muốn dùng phone debug? Add `--host` là OK.

---

## 3. Port conflict: vấn đề thường gặp nhất

### 3.1 Sao conflict?

**1 port cùng lúc chỉ 1 program listen được.** Như 1 phòng chỉ 1 hộ ở.

Nếu start service thứ 2 trên cùng port, gặp lỗi kinh điển:

```
Error: listen EADDRINUSE :::3000
```

Dịch: **"Phòng 3000 đã có người, vào không được!"**

Scenario hay gặp:
- Dev server cũ chưa tắt sạch, còn chạy ở background
- 2 project khác nhau dùng cùng default port
- 1 system service đã chiếm port bạn muốn

👇 **Click thử**: thử start nhiều lần. Khi conflict, so sánh "direct start" vs "smart start".

<PortConflictDemo />

### 3.2 Debug + fix

Process debug rất cố định:

**macOS / Linux:**
```bash
# B1: xem ai chiếm port 3000
lsof -i :3000

# B2: có PID, force kill
kill -9 <PID>
```

**Windows:**
```bash
# B1: xem ai chiếm port 3000
netstat -ano | findstr :3000

# B2: kill process
taskkill /PID <PID> /F
```

> Nhiều framework hiện đại (Vite, CRA) gặp conflict sẽ hỏi "đổi port khác?". Nhưng hiểu nguyên lý giúp bạn debug khi framework không giúp được.

---

## 4. "Same-Origin Policy" và CORS

### 4.1 "Origin" là gì?

Browser có security mechanism **Same-Origin Policy**: chỉ **protocol + domain + port** đều giống mới tính "same-origin".

| Address A | Address B | Same-origin? | Lý do |
| :--- | :--- | :--- | :--- |
| `http://localhost:5173` | `http://localhost:5173/about` | ✅ Cùng | Protocol, domain, port đều giống |
| `http://localhost:5173` | `http://localhost:3000` | ❌ Khác | **Port khác** (5173 vs 3000) |
| `http://localhost:5173` | `https://localhost:5173` | ❌ Khác | **Protocol khác** (http vs https) |

### 4.2 Sao FE-BE split chắc chắn gặp CORS?

Khi architecture là:

```
FE (Vite)  →  http://localhost:5173
BE (Express) →  http://localhost:3000
```

FE load từ `:5173`, rồi `fetch('/api/users')` request `:3000` — **port khác, trigger CORS!**

**2 cách giải thường gặp**:

**Cách 1: BE config CORS**
```javascript
// Express BE
app.use(cors({ origin: 'http://localhost:5173' }))
```

**Cách 2: FE config proxy (khuyến nghị)**
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

Nguyên lý proxy: Vite dev server "forward" request giúp bạn. Browser tưởng đang giao tiếp với `:5173` (same-origin), thực ra Vite âm thầm forward sang `:3000`.

---

## 5. Debug thực chiến: 3 vấn đề thường gặp

👇 **Click thử**: chọn vấn đề bạn từng gặp, theo step debug. Mỗi step có "execute" xem output.

<PortTroubleshootDemo />

---

## 6. Glossary

| Term | Nghĩa |
| :--- | :--- |
| **Port** | Số 0-65535, phân biệt network service trên cùng máy. Mỗi service "listen" 1 port, chờ client connect. |
| **localhost** | Domain đặc biệt, luôn trỏ máy bạn (127.0.0.1). Dùng để access service local mà không cần Internet. |
| **Loopback Interface** | Virtual network interface của OS. Packet gửi 127.0.0.1 không rời máy, vòng lại qua interface này. |
| **EADDRINUSE** | Error Node.js / OS báo: port bạn muốn listen đã bị program khác chiếm. |
| **CORS** | Cross-Origin Resource Sharing. Browser security, FE request lib khác origin (protocol/domain/port khác) cần BE explicit cho phép. |
| **Same-Origin Policy** | Foundation security browser: chỉ cùng protocol-domain-port mới free communicate. |
| **Proxy** | Trong dev env, proxy server thay browser forward request, bypass same-origin. |
| **0.0.0.0** | Khi service listen 0.0.0.0 = accept connection từ mọi network interface (máy bạn, LAN). |
| **Well-known Ports** | Tên gọi của 0-1023, pre-reserved cho HTTP (80), HTTPS (443), SSH (22). |
| **PID** | Process ID, số OS cấp cho mỗi process đang chạy. |
| **lsof** | List open files, command macOS/Linux xem process nào chiếm port (`lsof -i :port`). |
| **HMR** | Hot Module Replacement: dev server feature, sửa code → browser auto update, không reload. Dùng WebSocket báo browser. |

---

## Tổng kết

Port + localhost là concept basic + thường gặp nhất dev env:

- **Port** = "số nhà" phân biệt service trên 1 máy (0–65535)
- **localhost** = "tự tìm chính mình" (127.0.0.1), data không rời máy
- **Port conflict** bản chất "1 số nhà chỉ 1 bảng tên"
- **CORS** bản chất "port khác = origin khác", cần CORS hoặc proxy giải

Nhớ 4 câu này, đa số network issue dev env định vị nhanh.

::: tip 2026 cho VN dev
- **Tailscale Funnel**: expose localhost ra Internet không cần ngrok
- **Cloudflare Tunnel**: alternative ngrok, free + stable
- **Vite + HMR**: 99% framework hiện đại default HMR
- **Docker compose**: dev env consistent, port mapping rõ
- **WSL2 networking**: trên Windows, port forward giữa WSL và host
- **`npx kill-port 3000`**: 1-click kill process trên port
:::
