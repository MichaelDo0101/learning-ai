# Message Queue + Event-Driven

::: tip Mở đầu
**Order tạo xong, cần làm 10 việc: trừ stock, gen invoice, gửi mail, log, push notification, sync warehouse, update recommendation, gen analytics, sync ERP, send SMS.** Sync gọi từng cái → user đợi mãi. Phải gen MQ.
:::

---

## 1. Sao cần "message queue"?

| Pain sync | MQ giải |
|------|---------|
| User wait time = tổng mọi op | User chỉ wait core, MQ async lo còn lại |
| 1 service down → fail toàn bộ | Decouple — service B down không ảnh hưởng A |
| Burst traffic spike → server crash | Queue buffer, consumer xử theo nhịp |
| Coupled hệ thống | Pub-sub pattern, A không cần biết B, C, D |

---

## 2. Message Queue là gì?

3 core element:

- **Producer**: sinh message
- **Broker (Queue)**: storage trung gian
- **Consumer**: nhận + xử

```
Producer → [msg msg msg] → Consumer 1
              Broker      → Consumer 2
                          → Consumer 3
```

---

## 3. Core 1: Decouple system

### Tightly coupled
```javascript
async function createOrder(order) {
  await db.save(order)
  await emailService.sendConfirm(order)      // Email service down → fail
  await smsService.sendNotify(order)         // SMS service down → fail
  await warehouseService.reserveStock(order) // Warehouse down → fail
  await analyticsService.track(order)
}
```

### Event-driven decoupled
```javascript
async function createOrder(order) {
  await db.save(order)
  await mq.publish('order.created', order)
  return order
}

// Đăng ký event riêng
emailService.subscribe('order.created', sendConfirm)
smsService.subscribe('order.created', sendNotify)
warehouseService.subscribe('order.created', reserveStock)
analyticsService.subscribe('order.created', track)
```

Order service không biết có những service nào tiêu thụ event. Thêm new service = add subscriber, không sửa order code.

---

## 4. Core 2: Smoothing burst traffic

Flash sale 12.12, 00:00:00 burst 100k order/giây. Backend xử 10k/giây.

**Không MQ**: 90k request fail.
**Có MQ**: 100k message vào queue, consumer xử 10k/giây liên tục, 10 giây xử xong.

→ Trade latency lấy throughput + reliability.

---

## 5. Core 3: Đảm bảo message không mất, không duplicate, có thứ tự

### Không mất

3 lớp đảm bảo:
1. **Producer ACK**: send xong nhận broker confirm mới yên tâm
2. **Broker persistence**: ghi disk, không chỉ memory
3. **Consumer ACK**: xử xong mới ACK, fail thì broker re-deliver

### Không duplicate

Network không tin được, message có thể duplicate. Solution: **idempotency**.

```javascript
async function handleOrder(message) {
  if (await db.processed(message.id)) return  // Đã xử
  await db.markProcessed(message.id)
  await actuallyHandle(message)
}
```

### Có thứ tự

- **Same partition** → đảm bảo order (Kafka)
- Cross partition = không guarantee
- Solution: business key → cùng partition (vd order theo user_id)

---

## 6. Selection thực

| MQ | Đặc điểm | Hợp |
|------|---------|------|
| **RabbitMQ** | Mature, flexible (exchange + queue + binding) | Enterprise general, complex routing |
| **Kafka** | High throughput, persistent log | Event streaming, big data, log aggregation |
| **Redis Streams** | Đơn giản, đã có Redis | Project nhỏ-medium |
| **AWS SQS** | Managed, no ops | AWS ecosystem |
| **NATS** | Cực nhẹ, fast | Microservice, IoT, realtime |
| **Pulsar** | Multi-tenant, geo-replication | Multi-region |

| Need | Recommended |
|------|------|
| Project mới, vừa | Redis Streams hoặc RabbitMQ |
| Microservice complex | RabbitMQ hoặc NATS |
| Event streaming, log | Kafka |
| Serverless / AWS | SQS / EventBridge |
| Multi-region, multi-tenant | Pulsar |

---

## 7. Tổng kết: design tâm pháp

1. **Decouple > sync call**
2. **Idempotency luôn**
3. **Persistence + ACK = no loss**
4. **Pick MQ theo scenario** (RabbitMQ general, Kafka stream)
5. **Monitoring**: queue depth, consumer lag, failed message

::: tip 2026 cho VN dev
- **RabbitMQ** vẫn dominant cho enterprise
- **Kafka** chuẩn cho data engineering / analytics
- **Cloudflare Queues, Inngest, Trigger.dev**: serverless event-driven trendy
- **VN context**: e-commerce dùng RabbitMQ, đa số agency dev với RabbitMQ
- **AI scenario**: queue LLM call (rate limit), async embedding generation, batch inference
:::

## 8. Glossary

| Term | Note |
|------|---------|
| **Producer** | Sinh message |
| **Consumer** | Tiêu thụ message |
| **Broker** | Storage trung gian (RabbitMQ, Kafka) |
| **Topic / Queue** | Channel chứa message |
| **Pub/Sub** | Publish-Subscribe pattern |
| **ACK** | Acknowledgment, xác nhận xử |
| **DLQ** | Dead Letter Queue, message fail liên tục |
| **Idempotency** | Multi exec same result |
| **Backpressure** | Consumer chậm hơn producer → strategy giảm tải |
