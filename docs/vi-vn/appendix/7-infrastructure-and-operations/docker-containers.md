# Docker Containerization

::: tip Mở đầu
**"Trên máy tôi chạy được" = excuse kinh điển của dev, Docker xoá excuse này.** Containerization pack app + mọi dependency thành unit standardized, đảm bảo chạy nhất quán mọi env. Foundation của software delivery hiện đại.
:::

**Bạn sẽ học**:
- **Core concepts**: image, container, registry
- **Architecture**: container vs VM
- **Practical**: Dockerfile + commands
- **Orchestration**: Docker Compose multi-service
- **Best practice**: image optimization, security

| Chương | Nội dung |
|-----|------|
| **1** | Sao cần container |
| **2** | Core concepts |
| **3** | Docker lifecycle |
| **4** | Docker Compose |
| **5** | Best practice |

---

## 1. Sao cần container?

Trước container, deploy app phải manual cài runtime, config env var, handle dependency conflict. Khác biệt env (dev, staging, prod) = ổ chứa bug.

<DockerArchitectureDemo />

### Container giải gì?

| Issue | Traditional | Container |
|------|---------|---------|
| Env inconsistent | "Tôi local chạy được" | Pack mọi dependency, mọi nơi consistent |
| Dependency conflict | App A cần Node 14, B cần 18 | Mỗi container env riêng |
| Resource waste | Mỗi VM 1 full OS | Share kernel, MB overhead |
| Slow deploy | Manual cài config | `docker run` 1 command |
| Scale khó | Tạo VM mới + cài env + deploy | Container start trong giây |

::: tip Container essence
Container không phải lightweight VM. Bản chất = **process bị isolate**. Linux kernel qua 2 mechanism implement container:
- **Namespace**: isolate process view (PID, network, FS)
- **Cgroups**: limit process resource (CPU, mem, IO)

Process trong container và process bình thường trên host không khác bản chất, chỉ "bị nhốt trong phòng không thấy bên ngoài".
:::

---

## 2. Core concepts

3 concepts: **Image, Container, Registry**.

| Concept | Analogy | Note |
|------|------|------|
| Image | Class / template | Template app read-only, chứa code, runtime, lib, config |
| Container | Instance / object | Image running instance, R/W, có lifecycle riêng |
| Registry | App store | Service store + distribute image (Docker Hub, ACR, ECR) |
| Dockerfile | Recipe / blueprint | Text define build image thế nào |
| Volume | External disk | Persist data, container xoá data không mất |

### Image layered structure

Docker image = nhiều layer read-only stack lên, mỗi Dockerfile instruction tạo 1 layer:

```
┌─────────────────────────┐
│  CMD ["node", "app.js"] │  ← Start command layer
├─────────────────────────┤
│  COPY . /app            │  ← App code layer (đổi thường xuyên)
├─────────────────────────┤
│  RUN npm install        │  ← Dependency layer (đôi khi đổi)
├─────────────────────────┤
│  FROM node:18-alpine    │  ← Base image layer (ít đổi)
└─────────────────────────┘
```

::: tip Sao layered quan trọng?
Docker cache mỗi layer. Layer không đổi → reuse cache. Dockerfile phải **instruction đổi ít → trước**, **đổi nhiều → sau**. Đa số build hit cache, nhanh hơn nhiều.
:::

---

## 3. Docker lifecycle

Từ Dockerfile → container chạy = workflow.

<DockerLifecycleDemo />

### Dockerfile commands

| Command | Use | Example |
|------|------|------|
| `FROM` | Base image | `FROM node:18-alpine` |
| `WORKDIR` | Set working dir | `WORKDIR /app` |
| `COPY` | Copy file vào image | `COPY package.json ./` |
| `RUN` | Execute lúc build | `RUN npm install` |
| `ENV` | Env var | `ENV NODE_ENV=production` |
| `EXPOSE` | Declare port (doc) | `EXPOSE 3000` |
| `CMD` | Start command | `CMD ["node", "app.js"]` |
| `ENTRYPOINT` | Entry point (khó override) | `ENTRYPOINT ["nginx"]` |

---

## 4. Docker Compose: multi-service orchestration

Project thật thường nhiều container: app + DB + Redis + Nginx. Docker Compose dùng YAML define + manage.

### docker-compose.yml example

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

  redis:
    image: redis:7-alpine

volumes:
  db-data:
```

### Core concepts

| Concept | Note | Example |
|------|------|------|
| services | Define container service | app, db, redis |
| volumes | Persist data volume | db-data lưu DB file |
| networks | Custom network (default auto tạo) | Service gọi nhau qua tên |
| depends_on | Order dependency | app depend db + redis |
| environment | Env var | DB password, connect URL |

::: tip Service discovery
Trong Docker Compose, **service name = hostname**. App container gọi DB qua `db:5432`, Redis qua `redis:6379`, không cần biết IP. Docker built-in DNS.
:::

---

## 5. Best practice

### 5.1 Multi-stage build

Optimize image size. Build stage cài tool + dependency, final stage chỉ giữ runtime.

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### 5.2 Image optimization

| Item | Cách | Effect |
|--------|------|------|
| Small base image | `alpine` thay vì `ubuntu` | 200MB → 50MB |
| Combine RUN | Multi command `&&` | Giảm layer |
| .dockerignore | Exclude node_modules, .git | Faster build, smaller context |
| Multi-stage | Tách build + run | Final không có build tool |
| Pin version | `node:18.17-alpine` không `node:latest` | Build reproducible |

### 5.3 Security

| Practice | Note |
|------|------|
| Không run as root | `USER node` non-root user |
| Vulnerability scan | `docker scout` hoặc Trivy |
| Min permission | Chỉ cài package cần, không debug tool |
| Đừng hardcode key | Env var hoặc Docker Secret |
| Update base regularly | Fix security vulnerability |

---

## Tổng kết

Docker = infrastructure cho software delivery hiện đại, must cho mọi dev.

1. **Container vs VM**: container share kernel, lightweight, fast, isolation hơi kém VM
2. **Core 3**: image (template), container (instance), registry (distribution)
3. **Dockerfile**: layered build, leverage cache, ít đổi trước
4. **Compose**: YAML define multi-service, service name = hostname
5. **Production**: multi-stage build, alpine base, non-root

::: tip 2026 cho VN dev
- **Modern container tooling 2026**:
  - **Podman**: rootless alternative Docker
  - **Buildah**: build without daemon
  - **nerdctl**: containerd CLI
  - **Lima**: chạy Linux container trên macOS (thay Docker Desktop)
- **VN context**:
  - Startup → Docker Compose đủ cho mid-size
  - Enterprise → Docker + K8s
  - VN banking → Docker compliance + private registry
- **AI scenario**: Dockerfile cho LLM inference (PyTorch + CUDA), multi-stage để image nhỏ
- **Trends**: distroless image (Google), security scanning trong CI (Snyk, Trivy)
:::

## Tài liệu

- [Docker docs](https://docs.docker.com/)
- [Docker Getting Started](https://docs.docker.com/get-started/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Compose docs](https://docs.docker.com/compose/)
