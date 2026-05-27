# Monitoring, Logging, Alerting

::: tip Mở đầu
**System lên prod chỉ là bắt đầu.** Sau khi launch, cần đảm bảo nó **chạy ổn định**, **phát hiện vấn đề kịp thời**, **debug nhanh**. Đây là 3 capability core: **Monitoring + Logging + Tracing**.
:::

---

## 1. Monitoring system

**Monitor** = liên tục đo metric system status, judge có healthy không.

### 4 golden signals (Google SRE)

| Signal | Vd | Public health analogy |
|------|------|------|
| **Latency** | API P99 response time | Thời gian khám 1 bệnh nhân |
| **Traffic** | QPS, RPS | Lượng bệnh nhân/giờ |
| **Errors** | 5xx rate | Tỷ lệ chẩn đoán sai |
| **Saturation** | CPU, memory utilization | Bác sĩ đầy lịch |

### Monitor levels

| Level | Use | Tool |
|------|------|------|
| **Infrastructure** | CPU, memory, disk, network | Prometheus + node_exporter, Datadog |
| **Application** | QPS, latency, error rate | Prometheus + custom metrics, New Relic |
| **Business** | DAU, GMV, conversion | Tableau, Looker, custom dashboard |
| **User experience** | Real User Monitoring (RUM) | Sentry, Datadog RUM, NewRelic Browser |

### Prometheus + Grafana = de-facto stack

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'my-app'
    static_configs:
      - targets: ['app:3000']
```

```python
# Expose metric trong app
from prometheus_client import Counter, Histogram, start_http_server

request_count = Counter('app_requests_total', 'Total requests', ['method', 'endpoint'])
request_latency = Histogram('app_request_duration_seconds', 'Request latency')

@app.get("/users")
def list_users():
    request_count.labels(method='GET', endpoint='/users').inc()
    with request_latency.time():
        return db.query(User).all()

start_http_server(8000)  # /metrics endpoint
```

Grafana visualize Prometheus data → dashboard đẹp.

---

## 2. Alerting

**Alert** = monitor data trigger condition → notify on-call.

### Alert tiering

| Tier | Use | Notify |
|------|------|------|
| Info | DB connection > 80% | Slack channel |
| Warning | Error rate > 1% trong 5 phút | Slack DM + email |
| Critical | Service down | Phone call + SMS + Slack |
| Fatal | Payment system die | Phone bombing + escalate management |

### Alert design principles

1. **Actionable**: alert phải có action rõ (đừng alert "FYI")
2. **Symptom > cause**: alert từ user-facing (latency, error) thay vì cause (CPU high)
3. **Avoid alert fatigue**: gộp similar alert, threshold không quá thấp
4. **Self-recovery exclude**: tạm spike auto-recover trong 1 phút → đừng alert
5. **Runbook link**: mỗi alert kèm document handle thế nào

### Tool

| Tool | Use |
|------|------|
| Prometheus Alertmanager | Receive alert từ Prometheus, route → channels |
| PagerDuty | On-call schedule + escalation + incident |
| Opsgenie | Alternative PagerDuty |
| Slack | Notify channel + DM |

---

## 3. Logging

**Log** = record event quan trọng trong app, debug + audit + analyze.

### Log levels

```
DEBUG → INFO → WARN → ERROR → FATAL
detail                              critical
```

| Level | Use | Vd |
|------|------|------|
| DEBUG | Detail dev | "Function X called with args Y" |
| INFO | Normal flow | "User logged in: user_id=123" |
| WARN | Đáng chú ý | "Slow query: 2.5s" |
| ERROR | Lỗi nhưng tiếp | "Failed to send email" |
| FATAL | Crash service | "Out of memory" |

### Structured logging

```python
# ❌ Free-text
logger.info(f"User {user_id} purchased {product_id} for {amount}")

# ✅ Structured (JSON)
logger.info("user.purchase", extra={
    "user_id": user_id,
    "product_id": product_id,
    "amount": amount
})
```

Structured = parse + query dễ trong log aggregator.

### Log management stack

| Stack | Description |
|------|------|
| **ELK** (Elastic) | Elasticsearch + Logstash + Kibana, classic |
| **PLG** (modern) | Promtail + Loki + Grafana, lighter |
| **Datadog Logs** | Managed, expensive nhưng mạnh |
| **Splunk** | Enterprise, đắt nhất |

### Best practice

- **Centralized**: ship log mọi service về 1 nơi
- **Include context**: request_id, user_id, trace_id để correlate
- **Don't log sensitive**: password, credit card, PII
- **Retention policy**: 7 days hot, 30 days warm, 1 year cold
- **Log volume control**: tránh log spam nuốt disk

---

## 4. Distributed Tracing

**Tracing** = track request qua nhiều service. Microservice age must.

### OpenTelemetry standard

```python
from opentelemetry import trace
from opentelemetry.instrumentation.requests import RequestsInstrumentor

tracer = trace.get_tracer(__name__)

@app.get("/orders/{id}")
def get_order(id):
    with tracer.start_as_current_span("get_order") as span:
        span.set_attribute("order.id", id)

        with tracer.start_as_current_span("db.query"):
            order = db.query(Order).get(id)

        with tracer.start_as_current_span("call.user_service"):
            user = requests.get(f"/users/{order.user_id}")

        return {"order": order, "user": user}
```

Trace UI hiển thị: order request → DB query 50ms → user service 200ms → render 10ms.

### Tools

- **Jaeger** (CNCF): open-source, UI tốt
- **Tempo** (Grafana): tích hợp Grafana stack
- **Datadog APM**: managed, đắt nhưng đầy đủ
- **Zipkin**: legacy nhưng vẫn dùng

---

## 5. Debug flow

Khi service slow / error, thứ tự:

1. **Dashboard**: xem 4 golden signal — latency/traffic/error/saturation
2. **Alert review**: alert nào trigger?
3. **Tracing**: trace 1 slow request → bottleneck nằm đâu (service nào, op nào)
4. **Log**: tail log service problematic, grep ERROR
5. **Profile**: nếu CPU/memory issue, dùng profiler

### Practical CLI

```bash
# Top 5 CPU threads
top -H -p <PID>

# JVM tool
jstack <PID>          # Thread dump
jmap -histo <PID>     # Memory histogram
arthas trace          # Method-level tracing (hot, không restart cần)

# Network
ss -tlnp              # Listening port
ss -s                 # Connection stats
```

---

## 6. Performance optimization

| Bottleneck | Symptom | Fix |
|------|------|------|
| CPU bound | CPU 100%, latency tăng | Optimize algo, scale horizontal |
| Memory bound | OOM, swap thrashing | Reduce memory, add RAM, fix leak |
| DB bound | Slow query, connection exhaust | Index, cache, read replica |
| Network bound | Timeout, slow request | CDN, optimize payload size |
| Lock contention | Thread block | Reduce critical section, async |

---

## 7. Capacity planning

Plan resource trước peak:

```bash
# Install wrk
brew install wrk

# Load test
wrk -t 10 -c 100 -d 30s http://example.com/api/users

# Output:
# Running 30s test @ http://example.com/api/users
#   10 threads and 100 connections
#   Latency  Avg: 45.32ms  Stdev: 12.45ms  Max: 120.50ms
#   Requests/sec: 2200.5
```

Theo result quyết scale up bao nhiêu:
- Peak QPS expected
- × safety factor (2-3x)
- ÷ per-instance throughput
- = số instance cần

---

## Tổng kết

Monitoring + Logging + Tracing = "3 nội thị" của system. Khả năng phát hiện vấn đề trước user phàn nàn.

1. **4 golden signals**: latency, traffic, error, saturation
2. **Alert actionable**: thay vì "FYI", phải có action rõ
3. **Structured logging**: JSON, parse dễ
4. **Distributed tracing**: must cho microservice
5. **Debug flow**: dashboard → alert → trace → log → profile

::: tip 2026 cho VN dev
- **Modern stack 2026**:
  - **Grafana stack**: Loki (log) + Tempo (trace) + Mimir (metric) + Pyroscope (profile)
  - **OpenTelemetry**: standard cross-tool
  - **Datadog / New Relic**: managed all-in-one (expensive)
  - **Sentry**: error tracking + performance
- **VN context**:
  - VN startup: Datadog hoặc self-host Grafana stack
  - VN enterprise: Splunk hoặc Dynatrace
  - Free tier: Grafana Cloud, Logflare
- **AI-era**:
  - **AIOps**: ML detect anomaly trước alert
  - **LLM debug**: AI agent debug log + suggest fix
:::
