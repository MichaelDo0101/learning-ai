# Serialization: "dịch" data

::: tip 🎯 Core
**Data transmit qua network thế nào?** Như: lời 1 người, làm sao người khác hiểu? Serialization giải "dịch data" — biến object trong memory thành format transmittable.
:::

---

## 0. Sao cần serialization?

**Scene 1: FE nhận data "đã đổi"**

```javascript
// BE gửi
Date birth = new Date(1990, 5, 15)

// FE nhận
{ "birth": "1990-06-15T00:00:00Z" }  // String!
```

FE muốn `.getFullYear()` → error: không phải Date object, là string.

**Scene 2: Mã loạn**

```json
// Mong
{ "name": "Hoàng" }
// Nhận
{ "name": "Hoï¿½ng" }
```

Encoding inconsistency → mã loạn.

**Scene 3: Bottleneck performance**

```json
// Response 10000 product, 5.2MB, 3.5s
```

JSON redundancy → packet quá lớn, perf tệ.

---

**Serialization = "dịch"**: biến memory object thành format transmittable, bên nhận dịch ngược.

---

## 1. Serialization / Deserialization

**Serialization** = object → format transmittable.
**Deserialization** = format transmittable → object.

### 1.1 Ẩn dụ gửi hàng

| Gửi hàng | Serialization | Note |
| :--- | :--- | :--- |
| Đóng gói | Serialization | Đóng hộp, dán nhãn |
| Vận chuyển | Network transmission | Xe giao |
| Mở gói | Deserialization | Người nhận mở hộp |

### 1.2 Sao cần?

| Lý do | Note | Vd |
| :--- | :--- | :--- |
| **Network transmission** | Network chỉ byte stream | API, RPC |
| **Persistence** | Disk chỉ byte | Lưu object vào file, DB |
| **Cross-language** | Data structure ngôn ngữ khác nhau | Java object → Python dict |
| **Distributed cache** | Redis/Memcached lưu byte | Cache user info |

---

## 2. Common format

<SerializationDemo />

### 2.1 JSON: phổ biến nhất

**Ưu**:
- Readable, debug dễ
- Mọi ngôn ngữ support
- Browser native (`JSON.parse`/`stringify`)

**Nhược**:
- Size lớn (nhiều `{}` `""`)
- Không hỗ trợ type phong phú (Date, Map, Set convert thành string)

**Hợp**: public API, FE-BE comm, config file.

### 2.2 XML: từng mainstream

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123</id>
  <name>Hoàng</name>
</user>
```

**Ưu**: structure rõ, hỗ trợ comment + nested phức tạp, có Schema validation.
**Nhược**: size lớn, parse chậm, tag redundant.
**Hợp**: config file (Spring), SOAP, complex data exchange.

### 2.3 Protobuf: hiệu quả nhất

```protobuf
syntax = "proto3";
message User {
  int32 id = 1;
  string name = 2;
}
```

**Ưu**: size nhỏ (smaller JSON 30-50%), parse nhanh (5-10x), backward compatible.
**Nhược**: không readable (binary), cần `.proto` file define, không hỗ trợ dynamic type.
**Hợp**: microservice nội bộ, high-perf (game, realtime), mobile (tiết kiệm bandwidth).

### 2.4 MessagePack: cân bằng

JSON binary version. Cùng data, smaller JSON ~30%.

**Ưu**: smaller + faster JSON, giữ JSON model.
**Nhược**: không readable, không bằng Protobuf.
**Hợp**: cần perf nhưng không muốn Protobuf, Redis cache, WebSocket message.

---

## 3. Lib mỗi ngôn ngữ

| Lang | JSON | Protobuf | XML |
| :--- | :--- | :--- | :--- |
| **JS** | `JSON.stringify()` | `protobuf.js` | `fast-xml-parser` |
| **Python** | `json.dumps()` | `protobuf` | `xmltodict` |
| **Java** | `Jackson`/`Gson` | `protobuf-java` | `JAXB` |
| **Go** | `encoding/json` | `proto` | `encoding/xml` |
| **C#** | `System.Text.Json` | `Google.Protobuf` | `System.Xml` |

::: tip 💡 Selection
- **FE-BE comm**: JSON (debug dễ)
- **Microservice nội bộ**: Protobuf (perf tốt nhất)
- **Config**: JSON / YAML
- **Legacy**: XML (có thể bắt buộc)
:::

---

## 4. Performance

### 4.1 Size (user object)

| Format | Size | vs JSON |
| :--- | :--- | :--- |
| JSON | 68 bytes | 100% |
| XML | 142 bytes | 209% |
| Protobuf | 38 bytes | 56% |
| MessagePack | 52 bytes | 76% |

### 4.2 Speed (10000 lần)

| Format | Time | vs JSON |
| :--- | :--- | :--- |
| JSON | 45 ms | 100% |
| XML | 120 ms | 267% |
| Protobuf | 8 ms | 18% |
| MessagePack | 28 ms | 62% |

---

## 5. Common issues

### 5.1 Date serialization

```javascript
const date = new Date('2024-01-01')
JSON.stringify(date)  // "2024-01-01T00:00:00.000Z"
```

**Solution**:
```javascript
// Cách 1: timestamp
{ createdAt: date.getTime() }  // 1704067200000

// Cách 2: ISO string
{ createdAt: date.toISOString() }

// Cách 3: custom serialization
JSON.stringify(obj, (key, value) => {
  if (value instanceof Date) {
    return { __type: 'Date', value: value.toISOString() }
  }
  return value
})
```

### 5.2 Circular reference

```javascript
const obj = { name: 'test' }
obj.self = obj
JSON.stringify(obj)  // TypeError
```

**Solution**:
```javascript
// Cách 1: filter circular
const seen = new WeakSet()
JSON.stringify(obj, (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (seen.has(value)) return
    seen.add(value)
  }
  return value
})

// Cách 2: flatted lib
import { stringify } from 'flatted'
stringify(obj)
```

### 5.3 Mã loạn tiếng Việt

**Lý do**: encoding inconsistent (UTF-8 vs others), BOM marker.

**Solution**:
```python
# Python UTF-8
import json
json.dumps(data, ensure_ascii=False)
```

```javascript
// Node.js
res.setHeader('Content-Type', 'application/json; charset=utf-8')
```

---

## 6. Thực chiến: e-commerce serialization

| Scenario | Format | Lý do |
| :--- | :--- | :--- |
| **App → BE API** | JSON | Debug dễ, FE-BE unified |
| **BE → BE RPC** | Protobuf | Perf tốt nhất, tiết kiệm bandwidth |
| **Cache Redis** | MessagePack | Smaller JSON, serialize object phức tạp |
| **Log** | JSON | Log analysis tool parse được |

---

## Glossary

| Term | Full | Note |
| :--- | :--- | :--- |
| **Serialization** | - | Object → byte stream |
| **Deserialization** | - | Byte stream → object |
| **JSON** | JavaScript Object Notation | Common text format |
| **XML** | Extensible Markup Language | Markup, từng mainstream |
| **Protobuf** | Protocol Buffers | Google open-source high-perf |
| **MessagePack** | - | JSON binary |
| **Encoding** | - | Char → byte |
| **Decoding** | - | Byte → char |

::: tip 2026 cho VN dev
- **Protobuf + gRPC**: microservice standard internal
- **MessagePack** popular cho Redis cache
- **JSON Schema / Zod**: runtime validation, super useful
- **OpenAPI**: API spec chuẩn, gen client SDK
- **VN context**: e-commerce internal microservice nên xài gRPC; public API vẫn JSON
- **AI streaming**: Server-Sent Events dùng JSON line-by-line
:::
