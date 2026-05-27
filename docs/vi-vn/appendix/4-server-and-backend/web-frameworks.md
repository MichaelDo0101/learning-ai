# Bản chất Web Framework

::: tip Mở đầu
**Backend hosting evolution**: physical server → monolith → containerization → microservice → serverless. Mỗi stage giải pain trước, kèm new complexity. Chương này dẫn full journey.
:::

---

## 1. Sao hiểu architecture evolution?

- Hiểu **stack hiện tại** từ đâu ra
- Tránh **over-engineering** (dùng K8s cho app 10 user)
- **Choose tech** đúng cho project + scale

---

## 2. Physical server era (1990s)

```
1 web = 1 physical server tự rack
- Mua server hardware ($5k-50k)
- Cài Linux/Windows
- Manual setup web server (Apache)
- Cài app
- Maintain — nâng cấp, security patch, backup
```

**Pain**:
- Provision lâu (vài ngày-tuần)
- Idle resource (server chạy 10%)
- Scale = mua thêm server
- DR khó

---

## 3. Monolith era (2000s)

App + DB + cache trong 1 server, 1 codebase, 1 deploy.

```
┌──────────────────────────┐
│      Single App          │
│  ┌────┐ ┌────┐ ┌────┐    │
│  │User│ │Order│ │Pay │   │  ← Module chung memory
│  └────┘ └────┘ └────┘    │
└──────────┬───────────────┘
           │
       ┌───▼───┐
       │  DB   │
       └───────┘
```

**Lợi**: đơn giản, 1 deploy, transaction qua DB rõ.
**Hại**:
- 1 module crash → cả app down
- Scale toàn app, không chỉ module hot
- Big repo, multi-team conflict
- Tech stack lock cứng

---

## 4. Containerization + Microservice (2010s)

### 4.1 Docker xuất hiện (2013)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
```

`docker build` → image bất biến → chạy mọi nơi (dev, staging, prod giống nhau).

**Giải pain**:
- "Works on my machine" → image consistent
- Provision giây (vs hour)
- Resource isolation
- Tech stack mix-and-match

### 4.2 Microservice break monolith

```
                  ┌────────────┐
                  │  Gateway   │
                  └─────┬──────┘
        ┌───────────┬───┴───┬──────────┐
        ▼           ▼       ▼          ▼
   ┌────────┐  ┌──────┐ ┌──────┐  ┌──────┐
   │  User  │  │Order │ │ Pay  │  │ Cart │
   │ Service│  │ Svc  │ │ Svc  │  │ Svc  │
   └───┬────┘  └──┬───┘ └──┬───┘  └──┬───┘
       │           │        │          │
       ▼           ▼        ▼          ▼
    ┌────┐      ┌────┐   ┌────┐     ┌────┐
    │ DB │      │ DB │   │ DB │     │ DB │
    └────┘      └────┘   └────┘     └────┘
```

**Lợi**:
- Mỗi service team riêng, deploy riêng
- Tech stack tự chọn (Go service cao tải, Python service AI)
- Scale riêng từng service
- Fault isolation

**Hại**:
- Distributed system complexity (network failure, eventual consistency)
- Cần ops mạnh (service discovery, monitoring, tracing)
- Debug khó (cross-service)
- Cost ops cao hơn

### 4.3 Kubernetes (2014)

Orchestrate hàng trăm container:
- Auto scaling
- Self-healing (restart container chết)
- Load balancing
- Rolling deploy

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: user
          image: myapp/user-service:1.0
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
```

---

## 5. Serverless + Cloud-native era (2020s+)

### 5.1 Serverless (FaaS)

```javascript
// AWS Lambda / Vercel / Cloudflare Workers
export async function handler(event) {
  const user = await db.user(event.userId)
  return { statusCode: 200, body: JSON.stringify(user) }
}
```

**Lợi**:
- **No server management**
- **Pay per request** (idle = $0)
- Auto scale 0 → infinity
- Deploy giây

**Hại**:
- Cold start (lần đầu chậm 100ms-1s)
- Vendor lock-in
- Time limit (vd 15 min AWS Lambda)
- Long-running connection khó (WebSocket)

### 5.2 BaaS (Backend as a Service)

Supabase, Firebase, AppWrite, PocketBase — backend ready-to-use:
- Auth
- DB + realtime sync
- Storage
- Edge function

→ FE dev có thể build full app không cần BE team.

### 5.3 Edge computing

Cloudflare Workers, Vercel Edge, AWS Lambda@Edge — chạy code ở edge node gần user (50ms latency global).

---

## 6. Comparison + selection

| Era | Use | Pros | Cons | Cost |
|------|------|------|------|------|
| **Physical** | Legacy data center | Full control | Manual, slow scale | High initial |
| **Monolith** | MVP, internal tool | Simple | Single point of failure | Medium |
| **Container + Monolith** | Mature SaaS | Reproducible, easy deploy | Need ops skill | Medium |
| **Microservice + K8s** | Large enterprise | Scale, fault isolation | Complexity cao | High |
| **Serverless** | Event-driven, sporadic traffic | Zero ops, scale 0 → ∞ | Cold start, vendor lock | Low (pay-per-use) |
| **BaaS** | MVP, no backend team | Cực nhanh ship | Limited customization | Varies |

### Decision flow

```
< 1k user, MVP? → Monolith on Vercel/Railway/Fly.io
+ Need realtime, auth, storage? → Supabase / Firebase BaaS
1k-100k user, growing? → Containerized monolith on managed K8s (GKE, EKS)
> 100k user, multi-team? → Microservice on K8s
Event-driven, sporadic? → Serverless (Lambda, Cloudflare Workers)
Global low-latency? → Edge compute
```

---

## 7. Tổng kết + roadmap

| Stage | Skill |
|------|------|
| Junior | Monolith framework (Express, Django, Spring Boot) |
| Mid | Docker + CI/CD + 1 cloud provider |
| Senior | Microservice patterns + K8s + observability |
| Architect | Event-driven, eventual consistency, multi-region, cost optimization |

::: tip 2026 cho VN dev
- **Serverless platform trendy**: Vercel, Cloudflare Workers, Fly.io, Railway
- **VN cloud**: VNG Cloud (CloudVerse), Viettel Cloud, FPT Cloud — chú ý compliance (data residency)
- **Hybrid**: BE serverless (Vercel) + DB managed (Supabase, Neon, PlanetScale)
- **AI-native architecture**: API gateway layer (LiteLLM, Portkey) cho LLM cost + routing
- **VN context**: startup → Vercel + Supabase; enterprise → AWS/GCP với K8s + Spring Boot
:::

## 8. Glossary

| Term | Note |
|------|------|
| **Monolith** | 1 codebase, 1 deploy |
| **Microservice** | Service nhỏ độc lập, communicate qua API/MQ |
| **Container** | Lightweight VM, image bất biến |
| **Orchestration** | Quản lý container scale (K8s, Nomad) |
| **Serverless / FaaS** | Function as a Service, no server mgmt |
| **BaaS** | Backend as a Service |
| **Cold start** | Lần đầu invoke serverless function, chậm |
| **Edge compute** | Chạy gần user, low latency |
| **IaC** | Infrastructure as Code (Terraform) |
| **GitOps** | Git là source of truth cho infra + deploy |
