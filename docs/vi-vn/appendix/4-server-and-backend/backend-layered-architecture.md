# Backend Layered Architecture

::: tip Mở đầu
**Backend code "all-in-1" file = ác mộng**. Mỗi sửa làm break nhiều thứ, test khó, team conflict. **Layered architecture** = chia code thành các tầng có vai trò rõ → modular, test, maintain dễ.
:::

---

## 1. Sao cần layered?

Project nhỏ — 1 file đủ. Lớn dần:
- Business logic + DB query + HTTP handling lẫn lộn → spaghetti
- Test 1 unit phải mock cả DB
- Đổi DB (MySQL → PostgreSQL) → sửa nhiều chỗ
- Đổi web framework (Express → Fastify) → rewrite

**Layered architecture giải**: separation of concerns, mỗi tầng 1 trách nhiệm, dependency rõ ràng.

---

## 2. 4-layer architecture

### Tầng từ ngoài vào trong:

```
┌──────────────────────────────────┐
│ 1. Presentation (Controller)     │  HTTP, GraphQL, gRPC handler
├──────────────────────────────────┤
│ 2. Application (Service)         │  Business logic, use case
├──────────────────────────────────┤
│ 3. Domain (Entity, Value Object) │  Core business rule
├──────────────────────────────────┤
│ 4. Infrastructure (Repository)   │  DB, external API, cache, MQ
└──────────────────────────────────┘
```

### 2.1 Presentation layer

Xử HTTP request/response. Không có business logic.

```typescript
// controllers/order.controller.ts
@Controller('/orders')
class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto, @User() user) {
    const order = await this.orderService.createOrder(user.id, dto)
    return { code: 0, data: order }
  }
}
```

### 2.2 Application (Service) layer

Business logic, orchestrate domain + infra.

```typescript
// services/order.service.ts
class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private inventoryService: InventoryService,
    private mq: MessageQueue
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    // Business rule
    await this.inventoryService.reserveStock(dto.items)

    const order = Order.create(userId, dto.items)  // Domain logic
    await this.orderRepo.save(order)

    await this.mq.publish('order.created', order)  // Async event
    return order
  }
}
```

### 2.3 Domain layer

Core business rule, không depend infra.

```typescript
// domain/order.ts
class Order {
  private constructor(
    public id: string,
    public userId: string,
    public items: OrderItem[],
    public status: OrderStatus,
    public total: Money
  ) {}

  static create(userId: string, items: OrderItem[]): Order {
    if (items.length === 0) throw new EmptyOrderError()
    const total = items.reduce((sum, i) => sum.add(i.subtotal), Money.zero())
    return new Order(generateId(), userId, items, OrderStatus.Pending, total)
  }

  cancel() {
    if (this.status !== OrderStatus.Pending) throw new CannotCancelError()
    this.status = OrderStatus.Cancelled
  }
}
```

### 2.4 Infrastructure layer

DB, external API, message queue — adapter của domain.

```typescript
// infrastructure/order.repository.ts
class OrderRepositoryPostgres implements OrderRepository {
  constructor(private db: Pool) {}

  async save(order: Order): Promise<void> {
    await this.db.query(
      'INSERT INTO orders (id, user_id, total, status) VALUES ($1, $2, $3, $4)',
      [order.id, order.userId, order.total.amount, order.status]
    )
  }

  async findById(id: string): Promise<Order | null> {
    const row = await this.db.query('SELECT * FROM orders WHERE id = $1', [id])
    return row ? Order.fromRow(row) : null
  }
}
```

---

## 3. DTO: "translator" giữa các layer

**DTO (Data Transfer Object)** = plain object truyền data giữa layer.

```typescript
// DTO (input)
class CreateOrderDto {
  items: { productId: string; quantity: number }[]
  shippingAddress: string
}

// Domain entity (internal)
class Order { /* ... */ }

// Response DTO (output)
class OrderResponseDto {
  id: string
  total: number
  status: string
  createdAt: string
}
```

**Sao cần DTO?**
- Tách external (API) khỏi internal (domain)
- Đổi domain không break API contract
- Validate input riêng (Zod, class-validator)

---

## 4. Dependency direction: rule sắt

**Outer → inner ONLY**. Inner không biết gì về outer.

```
✅ Controller → Service → Domain
✅ Controller → Service → Repository (interface) ← Repository impl
❌ Domain → Repository (impl)  // Domain không biết DB
❌ Service → Controller        // Service không biết HTTP
```

**Dependency Inversion**: Service depend Repository **interface**, không depend impl cụ thể.

```typescript
// Domain define interface
interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
}

// Infra implement
class OrderRepositoryPostgres implements OrderRepository { /* ... */ }

// Service depend interface
class OrderService {
  constructor(private orderRepo: OrderRepository) {}  // ← interface
}

// Bootstrap: inject impl
const service = new OrderService(new OrderRepositoryPostgres(db))
```

→ Test dễ mock, đổi DB dễ.

---

## 5. Thực chiến: e-commerce order

```
src/
├── controllers/
│   ├── order.controller.ts
│   └── user.controller.ts
├── services/
│   ├── order.service.ts
│   └── inventory.service.ts
├── domain/
│   ├── order.ts
│   ├── order-item.ts
│   ├── money.ts
│   └── repositories/
│       ├── order.repository.ts  (interface)
│       └── inventory.repository.ts (interface)
├── infrastructure/
│   ├── repositories/
│   │   ├── order.repository.postgres.ts
│   │   └── inventory.repository.redis.ts
│   ├── mq/
│   │   └── rabbitmq.adapter.ts
│   └── external/
│       ├── stripe.adapter.ts
│       └── shipping.adapter.ts
└── shared/
    ├── dtos/
    └── errors/
```

---

## 6. Common questions

**Q: Service hay Controller xử validation?**
A: Validate input format ở Controller (request DTO). Validate business rule ở Service/Domain.

**Q: Có cần đủ 4 layer luôn?**
A: Project nhỏ có thể 3 layer (Controller + Service + Repository). Domain layer optional, dùng khi business logic phức tạp.

**Q: Transaction span nhiều service?**
A: Dùng Unit of Work pattern, hoặc orchestrate ở Application service.

**Q: Cross-cutting concern (logging, auth)?**
A: Middleware / decorator / interceptor, không nhét vào business logic.

---

## 7. Tổng kết

- **4 layer**: Presentation, Application, Domain, Infrastructure
- **DTO** = boundary giữa layer
- **Dependency Inversion**: depend interface, không depend impl
- **Outer → inner only**

---

## 8. Architecture patterns khác

| Pattern | Note |
|---------|------|
| **MVC** | Model-View-Controller (web framework classic) |
| **Hexagonal (Ports & Adapters)** | Domain center, ports (interface) + adapters (impl) |
| **Onion** | Tương tự hexagonal, layers concentric |
| **Clean Architecture** | Robert C. Martin, generalize layered + DI |
| **CQRS** | Command Query Responsibility Segregation, tách read và write |
| **Event Sourcing** | Lưu sequence event thay vì state cuối |
| **DDD** (Domain-Driven Design) | Tactical patterns (aggregate, value object, domain event) |

---

::: tip 2026 cho VN dev
- **NestJS**: layered architecture built-in (DI, module, controller, service)
- **Spring Boot**: classic enterprise pattern
- **FastAPI + Pydantic**: lightweight, DTO native với Pydantic
- **VN context**: enterprise banking dùng DDD + Hexagonal; startup dùng layered đơn giản
- **AI architecture**: clear separation giữa LLM call layer (infra) và business logic
:::

## Tài liệu
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
