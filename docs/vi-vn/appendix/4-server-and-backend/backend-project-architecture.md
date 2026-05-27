# Backend Project Architecture

::: tip 🎯 Core
**Từ script đơn giản tới enterprise system, chọn architecture đúng thế nào?** Architecture phải evolve theo scale, không over-design từ đầu.
:::

---

## 1. Evolution: từ script đến system

| Level | User scale | Stack | Focus |
|------|----------|--------|------|
| **Beginner** | <1k | 1 file script | Chạy được |
| **Intermediate** | 1k-100k | MVC + DB + cache | Modular, testable |
| **Enterprise** | >100k | Microservice + queue + observability | Scale, reliability |

---

## 2. Beginner (<1k user)

### Scenario
Internal tool, MVP, demo.

### Structure

```python
# app.py - all in one
from flask import Flask, jsonify
from sqlalchemy import create_engine

app = Flask(__name__)
db = create_engine('sqlite:///app.db')

# Model
class User: ...

# Route
@app.route('/users')
def list_users():
    return jsonify(db.query(User).all())

if __name__ == '__main__':
    app.run()
```

### OK với
- ✅ 1 dev
- ✅ Logic đơn giản
- ✅ <10 endpoint
- ✅ Lưu host nội bộ

### Anti-pattern
- ❌ Hardcode credential
- ❌ Không error handling
- ❌ Không test
- ❌ Production deploy production thẳng

---

## 3. Intermediate (1k-100k)

### Scenario
Startup MVP đã có user, internal SaaS.

### Recommended structure (Django/Flask vd)

```
myapp/
├── manage.py
├── requirements.txt
├── .env.example
├── apps/
│   ├── users/
│   │   ├── models.py        # Data model
│   │   ├── serializers.py   # Validation + transform
│   │   ├── views.py         # HTTP handler
│   │   ├── services.py      # Business logic
│   │   ├── urls.py          # Routes
│   │   └── tests/
│   ├── orders/
│   └── products/
├── core/
│   ├── settings/            # dev.py, staging.py, prod.py
│   ├── middleware/
│   └── exceptions.py
├── tests/
└── scripts/
```

### Patterns

**MVC/MVT** (Model-View-Template/Controller):
- **Model**: DB schema + query
- **View/Controller**: HTTP handler
- **Service layer**: business logic riêng (test dễ)

**Dependency injection**: pass dependency vào constructor thay vì hardcode → test mock dễ.

**Repository pattern**: tách DB query khỏi business logic.

### Cần có

- ✅ Type hint / TypeScript
- ✅ Linter + formatter (Ruff, Black, ESLint, Prettier)
- ✅ Unit test (Pytest, Jest)
- ✅ CI/CD basic (GitHub Actions)
- ✅ Docker compose dev env
- ✅ Migration (Alembic, Prisma)
- ✅ .env config
- ✅ Logging structured (JSON)

---

## 4. Enterprise (>100k user)

### Scenario
Production scale, multi-team, SLA cao.

### Architecture options

**A. Modular monolith** (recommended start)
```
backend/
├── modules/
│   ├── user/        (bounded context)
│   ├── catalog/
│   ├── order/
│   └── payment/
├── shared/          (common utils)
└── infrastructure/  (DB, queue, cache adapters)
```
- 1 deployable, internal modular
- Migration sang microservice sau khi clear boundary

**B. Microservices**
```
services/
├── user-service/    (own DB, own deploy)
├── order-service/
├── payment-service/
└── gateway/         (API gateway)
```
- Mỗi service: separate team, separate DB, separate deploy
- Communication: REST hoặc gRPC + MQ event

### Cần có thêm

- **API gateway**: Kong, Nginx, Traefik
- **Service discovery**: Consul, Eureka, Kubernetes
- **Message queue**: RabbitMQ, Kafka
- **Cache layer**: Redis cluster
- **DB**: master-slave, sharding
- **Observability**: Logging (ELK/Loki), Metrics (Prometheus + Grafana), Tracing (Jaeger/Tempo, OpenTelemetry)
- **CI/CD advanced**: blue-green / canary deploy
- **K8s orchestration**
- **Feature flag**: LaunchDarkly, Unleash
- **Rate limit + Circuit breaker**: Sentinel, Resilience4j

---

## 5. Open-source reference

### Python
- **Django**: full-stack, batteries-included
- **FastAPI**: modern, async, type hint native
- **Flask**: minimal, microframework
- Reference: [cookiecutter-django](https://github.com/cookiecutter/cookiecutter-django), [full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template)

### Node.js
- **NestJS**: enterprise, Angular-inspired, DI native
- **Express + TypeScript**: minimal
- **Hono**: edge-first, fast
- Reference: [nestjs-starter](https://github.com/nestjsx/nestjs-starter)

### Go
- **Gin**: lightweight HTTP framework
- **Echo**: alternative Gin
- **go-zero**: full microservice toolkit
- Reference: clean architecture template

### Java
- **Spring Boot**: dominant enterprise
- Reference: Spring Initializr

---

## 6. Evolution roadmap

```
Stage 1: 1 file script (1 dev, MVP)
    ↓ user tăng → cần test, deploy
Stage 2: Modular (MVC, MVT, layered) (2-5 dev, internal SaaS)
    ↓ traffic tăng → cần cache, queue
Stage 3: Modular monolith + Redis + MQ (5-20 dev, startup)
    ↓ team chia bounded context → cần độc lập deploy
Stage 4: Microservice + K8s + observability (20+ dev, enterprise)
```

**Don't skip stage**. Microservice từ MVP = over-engineering, complexity > business value.

---

## 7. Tổng kết

| Level | Stack | Quy tắc |
|------|------|------|
| **Beginner** | 1 file | Chạy được, deploy nhanh |
| **Intermediate** | MVC + DB + .env + CI | Modular, test |
| **Enterprise** | Microservice + queue + observability | Scale, reliability |

::: tip Khi nào upgrade?
- Tests chạy >2 phút → cần optimize hoặc parallelize
- 5+ dev chung 1 file conflict liên tục → cần modular
- Deploy lock toàn team → cần CI/CD tốt + feature flag
- 1 component crash kill toàn app → cần circuit breaker / microservice
- DB query >500ms → cần cache layer / read replica
:::

::: tip 2026 cho VN dev
- **VN startup**: bắt đầu modular monolith (FastAPI / NestJS / Django), Vercel/Railway/Fly.io deploy
- **VN enterprise**: Spring Boot vẫn dominant (banking, telecom)
- **Cloud-native**: GCP/AWS/Azure VN, dùng managed service (Cloud Run, ECS, GKE)
- **Observability stack 2026**: OpenTelemetry + Grafana stack (Loki, Tempo, Mimir)
- **AI architecture**: vector DB layer + LLM gateway (LiteLLM, Portkey) + cost tracking
:::

## Tài liệu
- [12 Factor App](https://12factor.net/)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Microservices.io patterns](https://microservices.io/patterns/)
- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
