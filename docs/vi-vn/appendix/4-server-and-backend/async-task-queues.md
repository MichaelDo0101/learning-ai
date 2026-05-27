# Async Task Queue + Producer-Consumer

::: tip Mở đầu
**User click "export report", rồi nhìn loading 30s — hợp lý?** Khi op cần vài giây - vài phút, để user chờ không phải UX tốt. **Async task queue** = pattern core giải — quăng op tốn time vào background, user response ngay.
:::

**Bạn sẽ học**:
- **Sync vs async**: sao op nào phải async, UX improvement
- **Producer-Consumer**: core idea + workflow
- **Worker pool**: task distribute parallel
- **Reliability**: retry, idempotency, dead letter queue
- **Selection**: framework mainstream

| Chương | Nội dung |
|-----|------|
| **1** | Sao cần async |
| **2** | Producer-Consumer |
| **3** | Worker pool |
| **4** | Reliability |
| **5** | Framework |

---

## 0. Toàn cảnh: sao không cho user "đợi suông"?

Vào nhà hàng. Tốt sẽ cho bạn mã order ngay, bạn tìm chỗ ngồi, chơi điện thoại, có món tới lấy. Không phải bắt bạn đứng cửa bếp nhìn đầu bếp nấu.

Web app có nhiều op "nấu" tương tự:
- **Gửi email/SMS**: call 3rd party API, vài giây
- **Gen report/PDF**: tính lượng lớn data, vài chục giây
- **Image/video processing**: compress, transcode, watermark, vài phút
- **Data sync**: cross-system, time không chắc

::: tip Core
Tách op tốn time khỏi "request-response" main flow, vào background queue. User submit xong nhận "received, processing" ngay, xong thì notify qua push/poll/WebSocket.
:::

---

## 1. Sync vs Async: story của 1 order

User submit order, BE phải: trừ inventory, tạo order, gửi confirm email, update recommendation, log audit...

Sync: serial execute, user phải đợi hết. Async: chỉ core (trừ inventory, tạo order), còn lại queue background.

<AsyncTaskFlowDemo />

| Dim | Sync | Async |
|---------|---------|---------|
| User wait | Tổng time mọi op | Chỉ core |
| Throughput | Thấp (thread block) | Cao (thread release nhanh) |
| Fail impact | Non-core fail → toàn bộ fail | Non-core fail không ảnh hưởng main |
| Complexity | Đơn giản | Cần queue infra |
| Consistency | Strong | Eventual |

::: tip Khi nào async?
3 tiêu chí: **lâu** (>1-2s), **non-core** (fail không ảnh hưởng main), **delayable** (không cần kết quả ngay). Thoả 2/3 → cân nhắc async.
:::

---

## 2. Producer-Consumer

3 vai trò:
- **Producer**: sinh task, thường web server xử user request
- **Queue**: buffer task chờ xử, thường Redis, RabbitMQ
- **Consumer/Worker**: lấy task từ queue + execute

<TaskWorkerDemo />

::: tip 3 giá trị queue
1. **Decouple**: producer không cần biết ai xử, consumer không cần biết task từ đâu
2. **Smoothing burst**: traffic peak → task pile trong queue, consumer xử theo nhịp
3. **Reliability**: task persist, consumer crash cũng không mất
:::

| Component | Role | Implementation |
|------|------|---------|
| Message middleware | Lưu + forward task | Redis, RabbitMQ, Kafka |
| Serializer | Serialize param | JSON, MessagePack, Pickle |
| Scheduler | Manage cron + delay | Cron, APScheduler, node-cron |
| Result store | Lưu kết quả | Redis, DB, S3 |

---

## 3. Reliability: task không "mất" + không "duplicate"

Distributed env, network shake, service restart, resource thiếu xảy ra bất cứ lúc nào. Async task system phải có reliability đầy đủ.

2 vấn đề core: **task loss** (consumer xử nửa chừng crash) + **duplicate execution** (task được deliver 2 lần).

<TaskRetryDemo />

::: tip 3 vũ khí reliability
1. **ACK**: consumer xử xong mới gửi ACK, task chưa ACK sẽ re-deliver
2. **Retry strategy**: task fail retry theo strategy, **exponential backoff + jitter** = best practice
3. **Idempotency**: cùng task execute nhiều lần kết quả = 1 lần, qua unique ID dedup
:::

| Mechanism | Giải | Implementation |
|------|-----------|---------|
| ACK | Task loss | Xong xác nhận, timeout thì re-deliver |
| Dead Letter Queue (DLQ) | "Poison message" fail liên tục | Quá retry limit chuyển DLQ, human can thiệp |
| Idempotency | Duplicate execution | Unique ID dedup, DB unique constraint |
| Priority queue | Task starvation | High priority xử trước |
| Timeout | Task stuck | Set max execution time, timeout → terminate + retry |

---

## 4. Framework

<AsyncComparisonDemo />

::: tip Recommendation
- **Python**: medium-large = Celery, small = RQ, modern = ARQ/Dramatiq
- **Node.js**: BullMQ (Bull next-gen)
- **Ruby**: Sidekiq
- **Java**: Spring Batch hoặc Kafka Streams
- **Go**: Asynq (Redis-based) hoặc Machinery
- **Cross-language**: Temporal (durable execution, hot 2024+)

Nếu project đã có Redis, plan Redis-based (Celery+Redis, BullMQ, Sidekiq) = đơn giản nhất.
:::

---

## Tổng kết

1. **Tiêu chí async**: lâu, non-core, delayable — thoả 2 thì async
2. **Producer-Consumer**: 3 vai trò decouple
3. **Worker pool**: parallel consume tăng throughput
4. **Reliability**: ACK + retry + idempotency, thiếu 1 cũng không
5. **Selection**: theo stack + scale, Redis là middleware phổ biến nhất

::: tip 2026 cho VN dev
- **Temporal**: durable execution, code task như normal function nhưng auto retry/checkpoint
- **Inngest, Trigger.dev**: serverless background job (Vercel/Cloudflare era)
- **BullMQ**: chuẩn cho Node.js 2026
- **Celery + Redis**: vẫn chuẩn cho Python (FastAPI, Django)
- **VN use case**: send SMS OTP, gen invoice PDF, AI inference batch, sync ERP → cũ chuẩn dùng async
- **AI scenario**: queue LLM call (rate limit OpenAI), batch embedding generation, image processing
:::

## Tài liệu

- [Celery Docs](https://docs.celeryq.dev/)
- [BullMQ Docs](https://docs.bullmq.io/)
- [Sidekiq Wiki](https://github.com/sidekiq/sidekiq/wiki)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/tutorials)
- [Temporal](https://temporal.io/)
- [Job Drain Pattern](https://brandur.org/job-drain)
