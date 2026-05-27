# API Intro: từ zero hiểu "đối thoại giữa program"

::: tip 🎯 Core
**API là gì?** Như: thiết kế menu nhà hàng sao khách nhìn hiểu? Phục vụ ghi order sao không sai? API giải "program đối thoại với program thế nào". Ngày đầu code bạn đã dùng API, chỉ là chưa nhận ra.
:::

---

## 0. 3 confusion thường gặp

**Confusion 1: API là thứ cao siêu?**

API không khó. Bạn đã dùng:
```python
len("hello")        # API của Python
open("file.txt")    # API
requests.get(url)   # API
```

**Confusion 2: Web API vs API thường khác gì?**

| Type | Calling | Communication | Use |
| :--- | :--- | :--- | :--- |
| **Function API** | Local code | Function call | `len()`, `open()` |
| **OS API** | OS | System call | Read/write file, create process |
| **Web API** | Remote server | HTTP request | Call AI model, get weather |

**Confusion 3: HTTP hay SDK?**

```python
# HTTP: tự xử mọi detail
import requests
response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={"Authorization": "Bearer sk-xxx"},
    json={"model": "deepseek-chat", "messages": [...]}
)
result = response.json()["choices"][0]["message"]["content"]

# SDK: butler xử giúp
from openai import OpenAI
client = OpenAI(api_key="sk-xxx")
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[...]
)
result = response.choices[0].message.content
```

---

## 1. Bản chất API: plug + outlet

**API** (Application Programming Interface) = "thoả thuận đối thoại giữa program".

### 1.1 Ẩn dụ thiết bị điện

| Concept | Thiết bị | API |
| :--- | :--- | :--- |
| **Interface** | Hình dáng outlet | Function signature / URL |
| **Input** | Dòng điện vào | Param / request body |
| **Output** | Thiết bị work | Return value / response body |

### 1.2 3 dạng API

<ApiTypesComparison />

### 1.3 Function vs HTTP API

<ApiFunctionVsHttp />

### 1.4 Đọc doc khác loại

<DocumentTypesComparison />

---

## 2. Full API call

<ApiRequestDemo />

### 2.1 4 stage

| Stage | Xảy ra gì | Ẩn dụ điện |
| :--- | :--- | :--- |
| **Request** | Client gửi request | Bấm switch |
| **Transmission** | Request qua network | Điện qua dây |
| **Processing** | Server xử + return | Thiết bị work |
| **Response** | Client nhận + xử kết quả | Đèn sáng |

### 2.2 Ẩn dụ nhà hàng

| Role | API | Note |
| :--- | :--- | :--- |
| **Menu** | API doc | Cho biết "món" nào order được |
| **Phục vụ** | HTTP protocol | Cách "đối thoại" chuẩn |
| **Bếp** | Server | Theo "order" xử |
| **Mang món** | Response | Trả kết quả |

---

## 3. HTTP methods

| Scenario | Bạn nói gì? | HTTP method |
| :--- | :--- | :--- |
| Muốn biết hôm nay có món gì | "Cho menu xem" | **GET** - chỉ "hỏi", không đổi data |
| Muốn order gà xào | "Cho 1 phần gà xào" | **POST** - "làm" việc, tạo data |
| Muốn đổi món | "Đổi gà xào thành cá kho" | **PUT** - replace data |
| Muốn đổi vị | "Gà xào không bỏ ớt" | **PATCH** - update partial |
| Không muốn nữa | "Bỏ món đó" | **DELETE** - xoá data |

<HttpMethodsDemo />

::: warning Idempotent
**Idempotent**: execute nhiều lần kết quả giống nhau?
- **Idempotent** (GET/PUT/DELETE): 10 lần và 1 lần giống nhau
- **Không idempotent** (POST): 10 lần có thể tạo 10 order

**Solution**: POST dùng unique ID verify, tránh xử lặp.
:::

| Method | Use | Idempotent | Safe | Use |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Get | Có | Có | Query list, detail |
| **POST** | Create | Không | Không | New user, submit order |
| **PUT** | Update full | Có | Không | Replace user profile |
| **PATCH** | Update partial | Không | Không | Sửa nickname |
| **DELETE** | Delete | Có | Không | Xoá user, cancel order |

---

## 4. HTTP status codes

<StatusCodeCategories />

| Code | Nghĩa | Use | Client xử |
| :--- | :--- | :--- | :--- |
| **200 OK** | Success | Request OK | Hiện data |
| **201 Created** | Created | POST OK | Jump resource mới |
| **400 Bad Request** | Format sai | Param thiếu hoặc format sai | Check param |
| **401 Unauthorized** | No auth | Không có API Key valid | Dẫn user login |
| **403 Forbidden** | No permission | API Key không quyền | Báo no permission |
| **404 Not Found** | Not exist | URL hoặc resource không có | Check URL |
| **429 Too Many Requests** | Quá rate limit | Vượt limit | Wait retry |
| **500 Internal Server Error** | Server error | Server crash | Báo user retry sau |

<StatusCodeDemo />

---

## 5. HTTP vs SDK

| | 🏃 **HTTP API** | 🤵 **SDK** |
| :--- | :--- | :--- |
| **Ẩn dụ** | Tự chạy việc | Butler làm |
| **Ưu** | Mọi ngôn ngữ dùng được<br>Control mọi detail<br>Không depend extra | Code gọn<br>Auto xử auth<br>Built-in retry |
| **Nhược** | Phải xử mọi detail<br>Code dài, dễ sai | Cần cài dep<br>Có thể vấn đề version |
| **Code** | `requests.post(url, json=..., headers={...})` | `client.chat.completions.create(...)` |

| Scenario | Recommend | Lý do |
| :--- | :--- | :--- |
| **Dev nhanh** | SDK | Auto xử auth, error, retry |
| **Học nguyên lý** | HTTP | Hiểu underlying |
| **Ngôn ngữ không hỗ trợ** | HTTP | Mọi ngôn ngữ dùng được |
| **Cần custom** | HTTP | Control mọi detail |

::: tip 💡 Khuyến nghị
**Có SDK thì dùng SDK**, để chuyện phiền cho lib, time cho mình.
:::

---

## 6. Đọc API doc

API doc = manual + menu. Không cần đọc từ đầu cuối, học "tra từ điển".

### 6.1 Checklist đọc doc

<ApiDocumentDemo />

| Item | Note | Vd |
| :--- | :--- | :--- |
| **Base URL** | Root API | `https://api.deepseek.com` |
| **Authentication** | Cách verify identity | `Authorization: Bearer sk-xxx` |
| **Endpoints** | List interface | `/v1/chat/completions` |
| **Parameters** | Required/optional | `model` (required), `temperature` (optional) |
| **Response** | Data structure | `{"choices": [...]}` |

### 6.2 Step đọc

1. **Tìm Base URL** - prefix mọi request
2. **Hiểu auth** - API Key ở Header hay Query?
3. **Tìm Endpoint cần** - interface bạn call
4. **Xem param** - required/optional?
5. **Hiểu response format** - data tổ chức thế nào?

---

## 7. Thực hành: mock API

<ApiPlayground />

Thử trigger:
- ✅ **Success**: nhập đúng Endpoint + API Key
- ❌ **401**: không nhập API Key, server reject thế nào?
- ❌ **404**: nhập URL không tồn tại

---

## 8. Tổng kết

::: info Key
1. **API = truyền tin**, đưa lời từ code này → code khác / remote server
2. **Bạn đã dùng API**, từ `len()` đến `open()` đều là API
3. **Web API = superpower**, call super computer ngoài xa
4. **SDK = butler tốt**, có SDK thì dùng
5. **Đọc doc tìm 3 thứ**: address, auth, param
:::

AI era, chỉ cần nhớ concept core. Detail thì IDE + AI assistant lo.

## Glossary

| Term | Full | Note |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | Define software interact thế nào |
| **Web API** | - | API based on HTTP |
| **Endpoint** | - | Address cụ thể của API |
| **HTTP** | HyperText Transfer Protocol | Web API protocol |
| **SDK** | Software Development Kit | Wrap underlying API call |
| **URL** | Uniform Resource Locator | Network address |
| **JSON** | JavaScript Object Notation | Common data format |
| **Authentication** | - | Verify identity |
| **Status Code** | - | HTTP response status |
| **Request** | - | Request |
| **Response** | - | Response |
| **Header** | - | HTTP header, metadata |
| **Payload** | - | Actual data |
| **Rate Limit** | - | Rate limit |
| **Idempotent** | - | Multi exec same result |
| **REST** | Representational State Transfer | API architecture style |
| **RPC** | Remote Procedure Call | Remote procedure call |
| **GraphQL** | - | Query language API |
| **gRPC** | - | Google high-perf RPC |

::: tip 2026 cho VN dev
- **LLM API standard**: OpenAI format trở thành de-facto (Anthropic, DeepSeek, Qwen đều có endpoint OpenAI-compatible)
- **API client tool**: Bruno (open-source Postman), Hoppscotch (web-based), HTTPie
- **API doc tool**: Swagger/OpenAPI (chuẩn), Scalar (đẹp), Stoplight
- **Type-safe API**: tRPC (TS), Hono RPC, OpenAPI gen client
- **VN API ecosystem**: payment (VNPay, MoMo, ZaloPay), SMS (Esms, Viettel), eKYC (FPT.AI, VinID)
:::
