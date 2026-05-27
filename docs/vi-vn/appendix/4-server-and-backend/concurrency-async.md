# Concurrency, Async, Multi-thread

::: tip Mở đầu
**Service "lag" khi peak hour vì sao?** Hiểu process/thread/coroutine + concurrency model = key handle high traffic.
:::

---

## 1. Process vs Thread vs Coroutine

| Concept | Note | Cost | Vd |
|---------|------|------|----|
| **Process** | Đơn vị OS cấp resource, memory độc lập | Cao (MB-GB) | Chrome tab, Python `multiprocessing` |
| **Thread** | Đơn vị OS schedule, chia memory với process | Trung (MB) | Java thread, C++ `std::thread` |
| **Coroutine** | User-space "lightweight thread", schedule bằng program | Cực thấp (KB) | Python `asyncio`, Go goroutine, Kotlin coroutine |

**Ẩn dụ**: process = nhà riêng (đắt, độc lập); thread = phòng trong cùng nhà (chia điện-nước); coroutine = task trong todo list (lưu trong sổ).

---

## 2. Pain peak hour

**Scene**: e-commerce site, daily 100 req/s. 12.12 sale → 10000 req/s. Hệ thống crash.

**Lý do**: backend sync, mỗi req = 1 thread, OS chỉ scale ~1000 thread/server → fail.

---

## 3. Concurrency models

### 3.1 Multi-process (Python WSGI: Gunicorn)

```python
# app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello"

# Run: gunicorn --workers 4 app:app
# 4 process độc lập xử request
```

**Lợi**: tận dụng multi-core, isolation tốt.
**Hại**: memory tốn (mỗi process load full app).

### 3.2 Multi-thread

```python
# Java Spring Boot, Tomcat
# Mỗi req 1 thread từ pool (vd 200 thread)
```

**Lợi**: share memory, communicate nhanh.
**Hại**: race condition, dead lock, max thread limit OS.

### 3.3 Async I/O (event loop)

```python
# FastAPI + asyncio
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/")
async def index():
    await asyncio.sleep(1)  # Không block
    return {"hello": "world"}

# Run: uvicorn main:app --workers 4
# Mỗi worker handle hàng nghìn coroutine
```

**Nguyên lý**: I/O op chậm (DB, network) → yield, event loop xử req khác. Khi I/O xong → tiếp tục.

**Lợi**: handle 10k+ concurrent connection với resource ít.
**Hại**: CPU-bound task vẫn block; cần `async/await` ở mọi lib.

### 3.4 Green threads (Go goroutine)

```go
package main

import (
  "fmt"
  "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "Hello")
}

func main() {
  http.HandleFunc("/", handler)
  // Go runtime auto chia work vào nhiều goroutine
  http.ListenAndServe(":8080", nil)
}
```

Go schedule goroutine trên N OS thread (default = num CPU). 1 server handle hàng triệu goroutine.

---

## 4. Race condition + lock

```python
counter = 0
def increment():
    global counter
    counter += 1  # NOT atomic: read + add + write

# 1000 thread concurrent → counter < 1000 (race)
```

**Solutions**:
- **Mutex/Lock**: chỉ 1 thread access tại 1 thời điểm
- **Atomic op**: hardware-level atomic (vd `atomic.AddInt32` Go)
- **Distributed lock**: Redis `SETNX`, ZooKeeper, etcd

```python
# Redis distributed lock
import redis
r = redis.Redis()
if r.set("lock:order:123", "1", nx=True, ex=10):
    try:
        process_order()
    finally:
        r.delete("lock:order:123")
```

---

## 5. Comparison

| Model | Concurrency | CPU-bound | I/O-bound | Languages |
|------|-------------|-----------|-----------|-----------|
| Multi-process | OS process limit | ✅ Tốt | OK | Python (CGI/WSGI) |
| Multi-thread | OS thread limit (~1k-10k) | OK | OK | Java, C++ |
| Async I/O | Hàng chục nghìn | ❌ Block | ✅ Tuyệt | Python asyncio, Node.js, FastAPI |
| Goroutine | Triệu | ✅ Tốt | ✅ Tuyệt | Go |
| Actor model | Hàng nghìn-triệu | ✅ Tốt | ✅ Tốt | Erlang, Elixir (Phoenix), Akka |

---

## 6. Selection

| Scenario | Recommended |
|------|------|
| Web API, I/O-bound (DB, external API) | Async (FastAPI, Node.js Express, Go) |
| Heavy compute (image, AI inference) | Multi-process (Python), thread pool (Java) |
| Realtime chat, WebSocket | Async / Go / Elixir |
| Batch processing | Multi-process + queue |
| Microservice high concurrency | Go, Rust |

---

## Tổng kết

1. **Process vs Thread vs Coroutine**: cost từ cao → thấp
2. **Async = best cho I/O-bound** (web API hiện đại)
3. **Goroutine = best cho mọi loại** (Go)
4. **Race condition** = bug khó tìm, dùng lock/atomic
5. **Pick model theo workload**: I/O hay CPU

::: tip 2026 cho VN dev
- **Python async stack**: FastAPI mainstream, Sanic, Litestar alternative
- **Node.js**: vẫn đỉnh I/O, Bun runtime fast hơn
- **Go**: chuẩn cho microservice, đặc biệt API gateway
- **Rust**: async với Tokio, đỉnh perf nhưng learning cao
- **Elixir/Phoenix**: realtime app (chat, IoT), millions of connections
- **VN context**: startup → FastAPI/Node.js; enterprise → Java thread pool; high-perf → Go
- **AI scenario**: LLM API call I/O-bound → async tối ưu (handle 1000+ concurrent LLM call)
:::
