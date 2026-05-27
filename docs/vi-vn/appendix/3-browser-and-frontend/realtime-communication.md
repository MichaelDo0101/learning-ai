# Realtime Communication (Polling / SSE / WebSocket)

::: tip Mở đầu
**Browser thực hiện realtime data update thế nào?**
HTTP truyền thống dựa trên "request-response", client phải chủ động request mới có data. Cho chatroom, stock feed realtime, model này gặp thách thức.

Chương này giới thiệu 3 tech FE cho realtime communication: short polling, SSE (Server-Sent Events), WebSocket full-duplex.
:::

---

## 1. Limit của HTTP truyền thống

HTTP thiết kế ban đầu để retrieve document, **stateless** + **client unidirectional**:
1. Client gửi HTTP request
2. Server xử + return response
3. Connection xong release (HTTP/1.1 có keep-alive nhưng business request-response model không đổi)

Trong model này, server không thể chủ động notify client khi state đổi. Cần architecture khác.

---

## 2. Short Polling

Solution trực tiếp nhất. Client dùng timer (vd `setInterval`), mỗi vài giây tự gửi HTTP request hỏi server có data mới không.

<PollingDemo />

**Đặc điểm + giới hạn**:
- **Ưu**: cực đơn giản, chỉ cần HTTP standard + AJAX/Fetch
- **Nhược**: network overhead lớn + lãng phí. Đa số thời gian server trả "không có". Mỗi request kèm full HTTP header (Headers, Cookies), concurrency cao = network bị chiếm bởi query vô nghĩa

---

## 3. Server-Sent Events (SSE)

Để giảm overhead lập HTTP connection liên tục, **SSE** = single-direction data stream lightweight.

SSE build trên HTTP. Client gửi HTTP request có header đặc biệt (`Accept: text/event-stream`), server return response giữ TCP connection mở. Sau đó server push text data liên tục.

<SSEDemo />

**Đặc điểm**:
- **Ưu**: persistent connection, overhead thấp; browser native support auto reconnect; rất hợp **unidirectional** server → client streaming (LLM output từng chữ, realtime trade feed)
- **Nhược**: channel 1 chiều. Client muốn gửi command/data mới phải lập HTTP request riêng

---

## 4. WebSocket: full-duplex protocol

Khi cần high-frequency bidirectional (multi-player game, collaborative doc editing), cần tech vừa giảm overhead vừa true full-duplex — **WebSocket**.

WebSocket là protocol network độc lập. Khéo léo dùng HTTP để init:
1. **Handshake**: client gửi HTTP request đặc biệt với `Upgrade: websocket` header
2. **Connection upgrade**: server support → reply `101 Switching Protocols`
3. **Tự do hoàn toàn**: HTTP xong, TCP connection giao cho WebSocket. Client + server equal full-duplex, gửi-nhận data frame minimal

<WebSocketDemo />

**Đặc điểm**:
- **Ưu**: true bidirectional realtime; data frame header rất nhỏ, latency thấp, throughput cao; native binary support (ArrayBuffer)
- **Nhược**: complexity cao; maintain persistent connection → yêu cầu architecture server + load balancing + heartbeat strict hơn

---

## 5. Tổng kết: tech selection

| Dim | Polling | SSE | WebSocket |
| :--- | :--- | :--- | :--- |
| **Direction** | Client pull (1-chiều) | Server push (1-chiều) | 2-chiều equal (full-duplex) |
| **Underlying** | HTTP standard | HTTP standard | WebSocket protocol riêng (trên TCP) |
| **Data overhead** | Cực cao (full HTTP header) | Thấp | Cực thấp (data frame minimal header) |
| **Use case** | Check async task status định kỳ | LLM streaming, news/notification push | Realtime voice/video signaling, multiplayer, collaborative whiteboard |

Engineer chọn dựa trên yêu cầu realtime + frequency bidirectional, cân bằng maintenance complexity + communication efficiency.

::: tip 2026 cho VN dev
- **AI streaming**: GPT, Claude, Gemini API đều dùng SSE cho streaming response
- **WebSocket libs**: Socket.IO (popular, fallback), ws (Node), Phoenix Channels (Elixir)
- **Realtime BaaS**: Supabase Realtime, Firebase, Ably, Pusher
- **WebRTC**: voice/video call peer-to-peer, dùng cho call center
- **Long polling deprecated**: dùng SSE thay cho 90% scenario
- **VN use case**: live chat hỗ trợ (Tawk, Crisp), real-time notification (Zalo OA)
- **HTTP/3 + QUIC**: SSE chạy tốt hơn trên HTTP/3, mobile mượt
:::
