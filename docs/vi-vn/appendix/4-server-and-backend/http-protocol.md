# HTTP Protocol: "Ngôn ngữ communication" FE-BE

::: tip 🎯 Core
**HTTP work thế nào?** Như: 2 người đối thoại — cần ngôn ngữ, cú pháp, rule. HTTP là "protocol đối thoại" FE-BE.
:::

---

## 0. Bản chất HTTP

**HTTP** (HyperText Transfer Protocol) = protocol nền cho FE-BE communication.

### 0.1 Ẩn dụ đối thoại

| Element | HTTP | Note |
| :--- | :--- | :--- |
| Ngôn ngữ | HTTP protocol | 2 bên đều hiểu |
| Cú pháp | Request/response format | "Nói" thế nào |
| Flow | Request-response | Hỏi-đáp |
| Kết thúc | TCP close | Kết thúc |

---

## 1. HTTP evolution

<HttpProtocolDemo />

| Version | Year | Cải tiến | Đặc trưng |
| :--- | :--- | :--- | :--- |
| **HTTP/0.9** | 1991 | Chỉ GET | Text thuần, chỉ request, không header |
| **HTTP/1.0** | 1996 | + POST/HEAD | Mỗi request 1 TCP connection |
| **HTTP/1.1** | 1997 | Persistent connection | Keep-Alive, 1 connection nhiều request |
| **HTTP/2** | 2015 | Multiplexing | Binary frame, header compression |
| **HTTP/3** | 2022 | Trên QUIC | UDP, giải head-of-line blocking |

::: tip 💡 Sao cần HTTP/2?
HTTP/1.1 dù persistent, request phải serial (response trước → mới send request sau). HTTP/2 multiplexing giải — gửi song song nhiều request.
:::

---

## 2. HTTP request structure

### 2.1 Request line

```http
GET /api/users/123 HTTP/1.1
```

3 phần: **method** (GET, POST, PUT, DELETE), **URL**, **version**.

### 2.2 Request header

```http
Host: api.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer xxx
Content-Type: application/json
Content-Length: 45
```

| Header | Note | Vd |
| :--- | :--- | :--- |
| **Host** | Server domain | `api.example.com` |
| **User-Agent** | Client info | `Mozilla/5.0` |
| **Accept** | Response type chấp nhận | `application/json` |
| **Authorization** | Auth info | `Bearer token` |
| **Content-Type** | Request body type | `application/json` |

### 2.3 Request body

```json
{ "name": "Hoàng", "email": "h@example.com" }
```

Chỉ POST, PUT, PATCH có body.

---

## 3. HTTP response structure

### 3.1 Status line

```http
HTTP/1.1 200 OK
```

### 3.2 Response header

```http
Content-Type: application/json
Content-Length: 156
Cache-Control: max-age=3600
Set-Cookie: session=xxx; HttpOnly
```

### 3.3 Response body

```json
{ "code": 0, "data": { "id": 123, "name": "Hoàng" } }
```

---

## 4. HTTP methods

| Method | Use | Body | Idempotent | Safe |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Lấy resource | Không | Có | Có |
| **POST** | Tạo resource | Có | Không | Không |
| **PUT** | Update full | Có | Có | Không |
| **PATCH** | Update partial | Có | Không | Không |
| **DELETE** | Xoá | Không | Có | Không |
| **HEAD** | Lấy header | Không | Có | Có |
| **OPTIONS** | Query method hỗ trợ | Không | Có | Có |

### 4.1 GET vs POST

| Feature | GET | POST |
| :--- | :--- | :--- |
| **Param** | URL query | Body |
| **Cache** | Cacheable | Default no |
| **Bookmark** | Bookmark được | Không |
| **History** | Save | Không save |
| **Length** | Limit (URL length) | Không limit |
| **Security** | Param visible URL | Param trong body |

---

## 5. Status codes

| Class | Note | Codes |
| :--- | :--- | :--- |
| **2xx** | Success | 200, 201, 204 |
| **3xx** | Redirect | 301, 302, 304 |
| **4xx** | Client error | 400, 401, 403, 404 |
| **5xx** | Server error | 500, 503 |

| Code | Note | Use |
| :--- | :--- | :--- |
| **200 OK** | Success | GET, PUT success |
| **201 Created** | Created | POST success |
| **204 No Content** | No content | DELETE success |
| **301 Moved Permanently** | Permanent redirect | URL change permanent |
| **302 Found** | Temp redirect | URL change temp |
| **304 Not Modified** | Not modified | Cache valid |
| **400 Bad Request** | Param wrong | Format sai |
| **401 Unauthorized** | No auth | Cần login |
| **403 Forbidden** | No permission | Đã login, không quyền |
| **404 Not Found** | Not exist | Resource không tồn tại |
| **429 Too Many Requests** | Rate limited | Quá rate limit |
| **500 Internal Server Error** | Server crash | App exception |
| **503 Service Unavailable** | Unavailable | Maintenance / overload |

---

## 6. HTTPS

### 6.1 HTTP vs HTTPS

| Feature | HTTP | HTTPS |
| :--- | :--- | :--- |
| **Protocol** | TCP | TCP + SSL/TLS |
| **Port** | 80 | 443 |
| **Data** | Plaintext | Encrypted |
| **Cert** | Không cần | SSL cert |
| **Perf** | Hơi nhanh | Hơi chậm (handshake overhead) |
| **SEO** | Không ảnh hưởng | Google ưu tiên |

### 6.2 HTTPS workflow

1. **Client Hello**: client gửi cipher suite hỗ trợ
2. **Server Hello**: server trả cert + cipher chọn
3. **Verify cert**: client verify server cert
4. **Key exchange**: asymmetric encryption đổi session key
5. **Encrypted comm**: symmetric encryption với session key

::: tip 💡 HTTPS lợi
- **Anti-eavesdrop**: data encrypt
- **Anti-tamper**: data integrity check
- **Anti-impersonation**: SSL cert verify server
:::

---

## 7. HTTP cache

### 7.1 Cache headers

| Header | Note | Vd |
| :--- | :--- | :--- |
| **Cache-Control** | Cache strategy | `max-age=3600` |
| **ETag** | Resource version | `"33a64df551425fcc"` |
| **Last-Modified** | Last modified | `Wed, 21 Oct 2015 07:28:00 GMT` |

### 7.2 Cache strategies

**Strong cache**:
```http
Cache-Control: max-age=3600
```
3600s, browser dùng cache trực tiếp, không gửi request.

**Negotiation cache**:
```http
ETag: "33a64df551425fcc"
```
Browser gửi `If-None-Match`, server trả 304 (no modify) hoặc 200 (modified).

---

## 8. Common questions

### 8.1 GET vs POST bản chất

**Misconception**: chỉ khác param position.

**Truth**:
- GET idempotent, multi request kết quả như nhau
- POST không idempotent, multi request có thể tạo nhiều resource
- GET cacheable, POST default không
- GET bookmarkable, POST không

### 8.2 HTTP/1.1 head-of-line blocking

**Problem**: dù persistent, request phải serial. Response trước chậm → sau phải đợi.

**Solutions**:
- HTTP/2 multiplexing
- Domain sharding
- Connection pool

### 8.3 HTTP/2 advantages

| Feature | HTTP/1.1 | HTTP/2 |
| :--- | :--- | :--- |
| **Format** | Text | Binary frame |
| **Multiplexing** | Không | Có |
| **Header compression** | Không | HPACK |
| **Server push** | Không | Có |

---

## Glossary

| Term | Full | Note |
| :--- | :--- | :--- |
| **HTTP** | HyperText Transfer Protocol | - |
| **HTTPS** | HTTP Secure | HTTP + SSL/TLS |
| **TCP** | Transmission Control Protocol | - |
| **SSL/TLS** | Secure Sockets Layer | - |
| **Idempotent** | - | Multi request kết quả giống nhau |
| **Keep-Alive** | - | 1 TCP nhiều request |
| **Multiplexing** | - | Song song nhiều request |
| **HoL Blocking** | Head-of-Line | Request trước block request sau |

::: tip 2026 cho VN dev
- **HTTP/3 + QUIC**: mainstream, Cloudflare, Google, Facebook đều dùng
- **CDN VN**: BunnyCDN, Cloudflare APAC support HTTP/3
- **API auth chuẩn**: Bearer token (JWT), OAuth2 cho 3rd party
- **VN context**: Banking API thường vẫn HTTP/1.1 legacy, e-commerce hiện đại = HTTP/2
- **Tool**: HTTPie, Bruno, Insomnia (Postman alternatives)
:::
