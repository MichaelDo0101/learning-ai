# Evolution: từ Monolith đến Microservice

::: tip Mở đầu
**Không architecture nào "tốt nhất", chỉ "phù hợp giai đoạn hiện tại".** Từ monolith sang microservice không phải nhảy 1 bước, mà evolve dần theo scale business + team. Tách microservice quá sớm = quá muộn = đều nguy hiểm.
:::

**Bạn sẽ học**:
- **Path evolution**: 4 stage từ monolith → microservice
- **Tách khi nào**: tín hiệu nên/không nên
- **Strategy tách**: phương pháp theo business domain
- **Communication pattern**: sync/async giữa service
- **Data tách**: thách thức + solution

| Chương | Nội dung |
|-----|------|
| **1** | Path evolution |
| **2** | Khi nào tách |
| **3** | Strategy tách |
| **4** | Service communication |
| **5** | Data tách |

---

## 1. Path evolution

Architecture evolution không driven bởi tech, mà **organization scale**. Team 5 → 500 người, monolith collab efficiency giảm rõ.

| Stage | Architecture | Team | Đặc điểm |
|------|------|---------|------|
| Khởi đầu | Monolith | 1-10 | Code trong 1 project, deploy đơn giản |
| Lớn dần | Modular monolith | 10-50 | Code chia module, vẫn deploy chung |
| Mở rộng | SOA | 50-200 | Tách service coarse theo business line |
| Scale | Microservice | 200+ | Service fine, team độc lập dev + deploy |

<ArchEvolutionDemo />

::: tip Conway's Law
"Design system của 1 organization, architecture sinh ra = communication structure của organization." — Melvin Conway

Đơn giản: 3 team làm 1 system → cuối thành 3 service. Architecture tách bản chất = **organization tách**.

**Reverse Conway**: muốn architecture thế nào → tạo organization như vậy. Vd muốn tách payment service độc lập, trước hết tạo payment team độc lập. Nhiều cty fail microservice không phải tech, mà organization không chỉnh theo.
:::

---

## 2. Khi nào tách microservice?

Không mọi system cần microservice. Tách sớm = complexity vô ích.

| Tín hiệu | Note | Recommend |
|------|------|------|
| Deploy conflict liên tục | Nhiều team sửa cùng repo, hay conflict | Cân nhắc tách |
| Module cần scale riêng | Search cần 10x resource | Cân nhắc tách |
| Stack khác biệt | AI module Python, main Java | Cân nhắc tách |
| Team < 10 người | Communication cost thấp, monolith đủ | Đừng tách |
| Business exploration | Requirement đổi nhanh, boundary chưa rõ | Đừng tách |
| Không có DevOps | Không CI/CD, container, monitoring | Đừng tách |

---

## 3. Strategy tách

### 3.1 Tách theo business domain (DDD Bounded Context)

DDD **Bounded Context** = principle tốt nhất tách microservice. Mỗi bounded context = 1 business domain độc lập, có data model + business rule riêng.

**Bounded context là gì?** Cùng 1 từ trong business domain khác nghĩa khác. Vd "user" trong user domain = thông tin register (name, email), trong order domain = người đặt (address, payment), trong recommend domain = behavior profile (history, preference). Bounded context = vẽ ranh giới rõ, trong đó term + model thống nhất.

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   User      │  │   Order     │  │  Payment    │
│   domain    │  │   domain    │  │  domain     │
│             │  │             │  │             │
│ User        │  │ Order       │  │ Payment     │
│ Profile     │  │ OrderItem   │  │ Refund      │
│ Address     │  │ Cart        │  │ Transaction │
│             │  │             │  │             │
│ User service│  │ Order svc   │  │ Payment svc │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────── API call / Event ─────────┘
```

| Context | Core entity | Service |
|-----------|---------|---------|
| User | User, Profile, Address | User service |
| Product | Product, Category, SKU | Product service |
| Order | Order, OrderItem | Order service |
| Payment | Payment, Refund | Payment service |
| Logistics | Shipment, Tracking | Logistics service |

### 3.2 Strangler Fig Pattern

Đừng rewrite monolith 1 lần, thay dần module bằng service mới (như cây strangler fig):

1. Tạo service mới ngoài monolith
2. Proxy route 1 phần traffic sang service mới
3. Verify ổn, migrate thêm traffic
4. Cuối thay hoàn toàn module cũ

---

## 4. Service communication patterns

| Method | Protocol | Đặc điểm | Use |
|------|------|------|---------|
| REST | HTTP/JSON | Đơn giản, ecosystem | Public API, CRUD |
| gRPC | HTTP/2 + Protobuf | High perf, type-safe | Service internal high-freq |
| Message queue | AMQP/Kafka | Async decouple, smoothing | Event, async task |
| GraphQL | HTTP/JSON | Client query theo nhu cầu | BFF, mobile |

::: tip Sync vs Async
- **Cần return ngay** → sync (REST/gRPC)
- **Không cần return ngay** → async (MQ)
- **1 event trigger nhiều action** → async (pub-sub)

Rule of thumb: **được async thì async**, sync chain càng dài, system càng fragile.
:::

---

## 5. Data tách: phần khó nhất

Tách microservice đau khổ nhất không phải code, mà **DB**. Mỗi service nên có DB riêng → cross-service query khó.

| Challenge | Description | Solution |
|------|------|---------|
| Cross-service JOIN | Không JOIN 2 service được | API composition, data redundancy |
| Distributed transaction | Cross-DB transaction không local | Saga, local message table |
| Data consistency | Multi-service data có thể tạm khác | Eventual consistency, event-driven |
| Data migration | Từ shared DB → independent | Dual-write transition, sync tool |

---

## Tổng kết

Từ monolith → microservice là quá trình tiệm tiến, không revolution.

1. **Path**: monolith → modular monolith → SOA → microservice, mỗi step có driver rõ
2. **Khi nào tách**: team size, deploy conflict, scale need = signal
3. **Strategy**: DDD bounded context guide, strangler fig migrate dần
4. **Communication**: async được thì async, sync chain ngắn nhất
5. **Data tách**: khó nhất nhưng quan trọng nhất, accept eventual consistency = mindset shift key

::: tip 2026 cho VN dev
- **VN context**:
  - Startup MVP → modular monolith
  - VN scale-up (Tiki, Grab, MoMo) → microservice nhưng vẫn có monolith core
  - VN bank → Spring Boot enterprise + slow migrate microservice
- **Modern trends 2026**:
  - **Modular monolith comeback**: Shopify, Stack Overflow giữ monolith scale
  - **Self-contained service**: vs traditional microservice, larger granularity
  - **Service mesh** (Istio, Linkerd): handle service-to-service complexity
  - **DDD + Event Storming** workshop popular cho design service boundary
- **AI scenario**: tách AI service (LLM gateway) khỏi business service → cost + perf control độc lập
:::

## Tài liệu

- [Building Microservices](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/)
- [Monolith to Microservices](https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)
