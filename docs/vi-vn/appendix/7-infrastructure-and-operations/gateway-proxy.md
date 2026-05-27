# Gateway + Reverse Proxy

::: tip Mở đầu
**Microservice có 100 service, mỗi service IP riêng. Mobile app gọi 50 service khác — quản thế nào?** **Gateway** = entry door duy nhất, hide complexity backend. Mọi traffic qua gateway, đảm nhận auth, rate limit, routing, log.
:::

---

## 1. Sao cần "Gateway"?

Microservice không gateway:
- Mobile app cần biết URL từng service
- Mỗi service tự handle auth → duplicate code
- Cross-cutting concern (log, monitor, rate limit) khắp nơi
- Service IP đổi → app update

**Gateway solve**:
- 1 entry → hide backend
- Auth, log, rate limit ở 1 chỗ
- Routing dynamic, service can change
- Aggregation + transformation

---

## 2. Reverse proxy là gì?

**Reverse proxy** = server đại diện cho backend service. Client gửi request đến proxy, proxy forward đến backend phù hợp.

**Forward proxy vs Reverse proxy**:

| Type | Use | Vd |
|------|------|----|
| Forward proxy | Bảo vệ client (privacy, bypass geo) | VPN, corporate proxy |
| Reverse proxy | Bảo vệ + tăng power server | Nginx, Cloudflare |

```
Client → Forward Proxy → Internet → Server     (client side)
Client → Internet → Reverse Proxy → Backend   (server side)
```

---

## 3. Nginx: sao gánh được triệu concurrent?

Nginx = reverse proxy + web server phổ biến nhất. Key:

### Event-driven architecture

Traditional (Apache): thread/process per connection → 10k connection = 10k thread → context switch killer.

Nginx: 1 worker process handle 10k+ connection qua **event loop + epoll/kqueue** (như Node.js).

### Config example

```nginx
upstream backend {
    least_conn;  # Strategy
    server 10.0.0.1:3000 max_fails=3 fail_timeout=30s;
    server 10.0.0.2:3000 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/ {
        root /var/www;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 4. API Gateway là gì?

**API Gateway** = reverse proxy + business logic for microservice:

### Capability core

| Capability | Note |
|------|------|
| **Routing** | URL pattern → service nào |
| **Auth** | JWT verify, OAuth, API key |
| **Rate limit** | Per user / IP / endpoint |
| **Circuit breaker** | Service fail → fail fast |
| **Logging + tracing** | Centralized request log |
| **Transformation** | Request/response transform |
| **Aggregation** | Combine multi-service vào 1 response |
| **SSL termination** | Decrypt HTTPS, backend HTTP |
| **CORS** | Cross-origin policy |
| **Monitoring** | Metrics central |

### Tools

| Tool | Lang | Đặc điểm |
|------|------|---------|
| Kong | Lua + Nginx | Plugin ecosystem mạnh, mature |
| Traefik | Go | Cloud-native, dynamic config, K8s tích hợp tốt |
| Envoy | C++ | High perf, modern, service mesh underlying |
| AWS API Gateway | Managed | Serverless, integrate AWS deep |
| Apigee | Managed | Google enterprise, đắt |
| Tyk | Go | Open-source alternative Kong |

---

## 5. Gateway architecture

```
                      ┌─────────────────────┐
                      │  API Gateway        │
                      │  - Auth             │
        Client ────→  │  - Rate limit       │
                      │  - Routing          │
                      │  - Log              │
                      └──────┬──────────────┘
                             │
              ┌──────────────┼──────────────┐
              ↓              ↓              ↓
        ┌─────────┐    ┌─────────┐    ┌─────────┐
        │ User    │    │ Order   │    │ Payment │
        │ Service │    │ Service │    │ Service │
        └─────────┘    └─────────┘    └─────────┘
```

### LB strategies in Nginx

```nginx
# Round-robin (default)
upstream backend1 { server 10.0.0.1; server 10.0.0.2; }

# Weighted
upstream backend2 {
    server 10.0.0.1 weight=3;
    server 10.0.0.2 weight=1;
}

# Least connection
upstream backend3 {
    least_conn;
    server 10.0.0.1;
    server 10.0.0.2;
}

# IP hash (sticky session)
upstream backend4 {
    ip_hash;
    server 10.0.0.1;
    server 10.0.0.2;
}
```

---

## 6. Gateway security

### Auth + Authz

```nginx
location /api/ {
    auth_request /auth;  # Sub-request to auth service
    proxy_pass http://backend;
}

location = /auth {
    internal;
    proxy_pass http://auth-service/verify;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
}
```

### DDoS protection

```nginx
# Connection limit
limit_conn_zone $binary_remote_addr zone=addr:10m;
server {
    location / {
        limit_conn addr 10;  # Max 10 connection per IP
    }
}
```

### WAF (Web Application Firewall)

ModSecurity, AWS WAF, Cloudflare WAF — filter SQL injection, XSS, etc.

---

## 7. Rate limit + circuit breaker

### Rate limit Nginx

```nginx
# Define rate limit zone (trong http block)
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    location /api/ {
        # 1. IP-based rate limit (leaky bucket)
        # zone=mylimit:10m → 10MB ~ 160k IP
        # rate=10r/s → 10 request/giây
        limit_req zone=mylimit burst=20 nodelay;

        # 2. IP connection limit
        limit_conn addr 10;

        # 3. Endpoint rate limit (global)
        limit_req zone=api_limit burst=100;
    }
}
```

### Circuit breaker

```nginx
upstream backend {
    server 10.0.0.1 max_fails=3 fail_timeout=30s;
    server 10.0.0.2 max_fails=3 fail_timeout=30s;
}
```

3 fail trong 30s → mark down, 30s retry. Or dùng Envoy + Istio cho advanced.

---

## 8. Tổng kết

1. **Gateway = entry door**: hide complexity backend
2. **Core capability**: routing + auth + rate limit + logging
3. **Tools**: Kong (mature), Traefik (cloud-native), Envoy (high-perf)
4. **Security**: auth, DDoS protection, WAF
5. **Rate limit + circuit breaker**: protect backend

::: tip 2026 cho VN dev
- **Modern stack 2026**:
  - **Envoy + Istio**: service mesh full feature
  - **Cloudflare Workers**: edge gateway
  - **Kong + Konnect**: managed Kong
  - **Hono**: lightweight gateway code
- **VN context**:
  - Startup: Nginx OK đa số case
  - Mid-size: Kong / Traefik
  - Enterprise: Envoy + service mesh
- **AI scenario**: LLM gateway (LiteLLM, Portkey) thực ra là API gateway specialized cho LLM
:::

## 9. Glossary

| Term | Plain |
|------|------|
| **Gateway** | Entry door duy nhất cho backend |
| **Reverse Proxy** | Server đại diện backend |
| **Routing** | URL pattern → service nào |
| **Rate Limit** | Limit request/giây |
| **Circuit Breaker** | Service fail → fail fast |
| **WAF** | Web Application Firewall |
| **Service Mesh** | Network layer giữa service (Istio, Linkerd) |
