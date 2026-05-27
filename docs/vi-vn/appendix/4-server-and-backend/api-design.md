# API Design: "Protocol đối thoại" FE-BE

::: tip 🎯 Core
**FE + BE đối thoại hiệu quả thế nào?** Như: menu nhà hàng design sao khách nhìn hiểu? API design giải "rule đối thoại".
:::

---

## 0. Câu hỏi: bạn từng gặp ác mộng này?

**Scene 1: Naming tuỳ tiện**
```
GET /getUserData
GET /fetchUserInfo
GET /queryUserById
GET /users/query
```
4 API cùng chức năng, naming khác hết. Newbie onboard confused.

**Scene 2: Error handling lung tung**
```json
// Có cái return HTTP status
HTTP/1.1 404 Not Found

// Có cái return 200 + code
HTTP/1.1 200 OK
{ "code": 404, "message": "User không tồn tại" }

// Có cái throw exception
HTTP/1.1 200 OK
{ "error": "Có lỗi" }
```
FE không biết judge request success thế nào.

**Scene 3: Response structure khác nhau**
```json
{ "data": { ... } }
{ "result": { ... } }
{ "content": { ... } }
```
Mỗi API format khác, FE phải handle riêng từng cái.

**API design tốt = menu nhà hàng**: rõ, quy trình chuẩn, error có hint.

---

## 1. API là gì?

**API** = "thoả thuận đối thoại giữa program".

### Ẩn dụ nhà hàng

| Role | API | Note |
| :--- | :--- | :--- |
| Menu | API doc | Cho biết "món" nào order |
| Phục vụ | HTTP protocol | "Đối thoại" chuẩn |
| Bếp | Server | Theo "order" xử |
| Mang món | Response | Trả kết quả |

<ApiRequestDemo />

---

## 2. API design philosophy

4 mainstream style:

<ApiStyleCompare />

### 2.1 REST vs RESTful

| Concept | Nghĩa |
| :--- | :--- |
| **REST** | Architecture style, set of constraints (Roy Fielding) |
| **RESTful** | Tính từ, mô tả API tuân theo REST |

### REST 6 constraints
1. **Client-server separation**: FE-BE độc lập
2. **Stateless**: mỗi request chứa đủ info, server không lưu session
3. **Cacheable**: response mark cacheable không, tăng perf
4. **Uniform interface**: dùng HTTP method + status code chuẩn
5. **Layered system**: client không cần biết connect layer nào
6. **Code on demand** (optional): server extend client function

::: tip Sao REST phổ biến nhất?
1. Learning cost thấp (HTTP sẵn embody REST)
2. Ecosystem chín muồi
3. Universal (mọi ngôn ngữ, platform)
4. Cacheable (GET cacheable native, CDN-friendly)
:::

---

## 3. RESTful: URL "biết nói"

**REST** core:
- Abstract things → **Resource**
- URL identify resource
- HTTP method operate resource

### 3.1 Ẩn dụ kho

| Concept kho | REST | Vd |
| :--- | :--- | :--- |
| Shelf address | URL | `/users`, `/orders` |
| Op cách | HTTP method | GET (xem), POST (nhập) |
| Hàng | Resource | User data, order data |

**Key**: URL là noun, không phải verb.

### 3.2 URL design rules

| Rule | ❌ Sai | ✅ Đúng | Note |
| :--- | :--- | :--- | :--- |
| Dùng noun không verb | `/getUsers` | `/users` | URL = resource, HTTP method = action |
| Plural | `/user` | `/users` | Unified |
| Lowercase + hyphen | `/UserProfiles` | `/user-profiles` | URL case-sensitive |
| Avoid deep hierarchy | `/a/b/c/d/e` | `/a/b/c` | Max 3 levels |
| Filter qua query param | `/products/phone/5000` | `/products?cat=phone` | Filter qua `?` |

### 3.3 HTTP method

| Method | Use | Idempotent | Safe |
| :--- | :--- | :--- | :--- |
| **GET** | Lấy | Có | Có |
| **POST** | Tạo | Không | Không |
| **PUT** | Update full | Có | Không |
| **PATCH** | Update partial | Không | Không |
| **DELETE** | Xoá | Có | Không |

---

## 4. Status code

| Class | Nghĩa | Codes |
| :--- | :--- | :--- |
| **2xx** | Success | 200, 201, 204 |
| **3xx** | Redirect | 301, 304 |
| **4xx** | Client error | 400, 401, 404 |
| **5xx** | Server error | 500, 503 |

<StatusCodeDemo />

---

## 5. Error handling: "reject" elegant

### Pits

**Pit 1: mọi error return 200**
```json
// ❌
HTTP/1.1 200 OK
{ "error": "Có lỗi" }
```
Cache layer cache "success" response, monitor không phát hiện.

**Pit 2: error message quá chung chung**
```json
// ❌
HTTP/1.1 400 Bad Request
{ "message": "Param sai" }
```
Client không biết param nào sai, sao sai.

**Pit 3: Expose sensitive**
```json
// ❌ Dangerous
HTTP/1.1 500 Internal Server Error
{ "stack": "at UserService.login...", "sql": "SELECT * FROM..." }
```
Lộ code structure + SQL → attacker exploit.

<ErrorHandlingDemo />

---

## 6. Version control: "backward compatibility" API

### Sao cần?

App có 1 triệu user, cần sửa order API.
- **Không version**: New app call new API → OK. Old app call new API → field missing, crash!
- **Đúng**: `/v1/orders` (cũ), `/v2/orders` (mới + feature mới)

### Strategy

| Strategy | Vd | Ưu | Nhược |
| :--- | :--- | :--- | :--- |
| **URL path** | `/v1/users` | Trực quan, cacheable | URL dài |
| **Request header** | `Accept: vnd.api.v2+json` | URL sạch | Khó debug |
| **Query param** | `/users?version=2` | Đơn giản | Không chuẩn |

::: tip Best practice
- **Backward compatible**: v1 maintain 6-12 tháng, cho client upgrade
- **Doc sync**: mỗi version doc riêng
- **Deprecation notice**: thông báo trước v1 down
- **Monitor**: stats call v1, confirm an toàn mới stop
:::

---

## 7. Response structure design

<ResponseStructureDemo />

### 7.1 Big company practice

::: details Google API Design Guide
```json
{
  "error": {
    "code": 429,
    "message": "Resource exhausted",
    "status": "RESOURCE_EXHAUSTED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "RESOURCE_AVAILABILITY",
        "domain": "compute.googleapis.com"
      }
    ]
  }
}
```
Core: `ErrorInfo` machine-readable, `message` cho dev rõ, `details` có `LocalizedMessage`, `Help`.
:::

::: details Microsoft REST API Guidelines
- **Error** (4xx): client gửi data invalid
- **Fault** (5xx): server không respond được valid request
- **Response header**: `Date` (RFC 5322), `Content-Type`, `ETag` cho optimistic concurrency
:::

::: details Stripe API
```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "Your card was declined.",
    "param": "number",
    "decline_code": "insufficient_funds",
    "doc_url": "https://stripe.com/docs/error-codes/card-declined"
  }
}
```
Đỉnh: `type` (`api_error`, `card_error`, `invalid_request_error`), `param` chỉ chính xác field sai, `doc_url` link doc.
:::

::: details JSON:API Specification
```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": { "title": "..." },
    "relationships": {
      "author": { "data": { "type": "users", "id": "9" } }
    }
  },
  "included": [
    { "type": "users", "id": "9", "attributes": { "name": "Hoàng" } }
  ]
}
```
`data` main, `included` tránh duplicate request.
:::

::: details GitHub REST API
**Success**:
```json
{
  "id": 1296269,
  "name": "Hello-World",
  "owner": { "login": "octocat", "avatar_url": "..." },
  "html_url": "https://github.com/octocat/Hello-World"
}
```
**Error**:
```json
{ "message": "Bad credentials", "documentation_url": "https://docs.github.com/rest" }
```
Đỉnh: multiple URL format, `Link` header cho pagination.
:::

### 7.2 Best practice tổng kết

1. **Consistency**: mọi API cùng response structure, FE wrap request layer thống nhất
2. **Machine-readable**: error code + reason để code auto-handle
3. **Human-friendly**: message rõ, kèm suggestion
4. **Traceable**: `request_id` xuyên full chain, debug dễ
5. **i18n**: details extend localized message

### 7.3 `data` field design

<DataFieldDesignDemo />

### 7.4 Error response advanced

<ErrorResponseDesignDemo />

---

## 8. Thực chiến: e-commerce API

```
# User module
GET    /v1/users                    # List
POST   /v1/users                    # Create
GET    /v1/users/{id}               # Detail
PUT    /v1/users/{id}               # Update full
PATCH  /v1/users/{id}               # Update partial
DELETE /v1/users/{id}               # Delete

# Order module
GET    /v1/users/{id}/orders        # User's orders
POST   /v1/orders                   # Create order
GET    /v1/orders/{id}              # Order detail
PATCH  /v1/orders/{id}/status       # Update status

# Product (complex filter qua query)
GET    /v1/products?category=phone&price_max=5000&sort=price_desc&page=1
```

---

## 9. AI hỗ trợ design API

### Prompt template

```
Bạn là senior backend architect, giỏi RESTful API design.

## Business
[Mô tả scenario]

## Functional requirements
[List modules]

## Design requirements
1. RESTful compliant
2. URL: noun plural, lowercase + hyphen
3. HTTP method đúng (GET/POST/PUT/PATCH/DELETE)
4. Response format thống nhất: { code, message, data, request_id }
5. Status code hợp lý
6. Versioning: URL path (/v1/)

## Output
- Table API list (method, URL, desc, body, response)
- Key API examples
- Status code list
```

### AI assist notes

| Note | Note |
| :--- | :--- |
| **Provide full context** | Business, role, data relationship |
| **Explicit constraint** | Naming, version, format |
| **Iterate** | First output không hoàn hảo, follow-up |
| **Human review** | Check vs business requirement |
| **Edge cases** | Error handling, permission, pagination |

::: tip 💡 Follow-up technique
- "Add error response example cho mỗi API"
- "Cân nhắc pagination, sort, filter param"
- "Add permission control cho API"
- "Check vs RESTful best practice"
:::

---

## Glossary

| Term | Full | Note |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | - |
| **REST** | Representational State Transfer | Architecture style |
| **Resource** | - | Core concept REST, URL unique |
| **Idempotency** | - | Multi exec same result |
| **Status Code** | - | HTTP response status |
| **Versioning** | - | New + old API coexist |
| **Request Body** | - | POST/PUT/PATCH data |
| **Response Body** | - | Server return |
| **Authentication** | - | "Bạn là ai" (login, token) |
| **Authorization** | - | "Bạn làm được gì" (permission) |

::: tip 2026 cho VN dev
- **OpenAPI 3.1**: spec chuẩn, dùng để gen SDK + doc
- **tRPC**: end-to-end type safety cho TypeScript stack
- **Hono RPC**: lightweight, edge-friendly
- **GraphQL**: cho complex relation query (Facebook, Shopify)
- **gRPC**: cho microservice internal (high perf)
- **VN context**: public API → REST + OpenAPI; internal microservice → gRPC; mobile/web → REST hoặc tRPC
- **AI API**: theo OpenAI standard (chat completions, function calling)
:::
