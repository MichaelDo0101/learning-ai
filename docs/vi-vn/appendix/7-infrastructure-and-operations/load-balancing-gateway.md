# Load Balancing + Gateway

::: tip Mở đầu
**Web app traffic peak → server quá tải → user thấy "Service Unavailable".** Load balancer giải bằng cách chia traffic equal đến nhiều server. Gateway = entry duy nhất, đảm nhận auth, rate limit, routing.
:::

---

## 1. Sao cần load balancing?

Single server bottleneck:
- **Perf**: CPU/memory limit
- **Availability**: down = service mất
- **Scale**: vertical (lớn hơn) đắt + có ceiling

**Solution**: thêm server, chia traffic. Đây là **horizontal scale**.

```
       ┌─→ Server A
Client → LB ─→ Server B
       └─→ Server C
```

Load balancer phân phối request theo strategy → mỗi server xử 1 phần, total throughput tăng.

---

## 2. Load balancer là gì?

**LB** = thiết bị/software phân request đến nhiều server backend.

### Levels

| Level | Protocol | Vd |
|------|------|----|
| **L4** (Transport) | TCP/UDP | AWS NLB, IPVS, HAProxy (L4 mode) |
| **L7** (Application) | HTTP/HTTPS, gRPC | Nginx, AWS ALB, Traefik, Envoy |

| L4 | L7 |
|----|-----|
| Fast, low overhead | Slower (parse HTTP) |
| Không content-aware | URL/header/cookie routing |
| TCP forward | Smart routing |
| 1M+ connection | Fewer concurrent |

### Distribution strategies

| Strategy | Note | Use |
|------|------|------|
| Round-robin | Tuần tự lặp | Server config giống nhau |
| Weighted RR | Theo weight | Server config khác |
| Least connection | Server connection ít nhất | Time xử khác nhau |
| IP hash | Same IP → same server | Session sticky |
| Response time | Server respond nhanh nhất | Heterogeneous backend |

---

## 3. Core 1: Tránh server "broken" tiếp tục serve

LB regularly **health check** backend:

```nginx
upstream backend {
    server 10.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.2:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.3:8080 max_fails=3 fail_timeout=30s backup;  # Backup, chỉ dùng khi main fail
}
```

Logic: 30s liên tiếp 3 fail → mark unhealthy → bỏ khỏi pool. Định kỳ retry, healthy lại → add lại.

Active health check: LB chủ động `GET /health` định kỳ.
Passive health check: từ real traffic detect fail.

---

## 4. Core 2: "Old customer" tới cùng cashier

Một số scenario cần **session affinity** (sticky session): same user → same backend (vì state lưu local).

### 3 cách

| Cách | Note | Pro/Con |
|------|------|---------|
| IP hash | Hash source IP → server | Đơn giản, nhưng nat IP đổi sticky vỡ |
| Cookie | LB inject cookie record server | Mạnh nhất, cần parse HTTP |
| Session in Redis | Stateless backend | Tốt nhất (không cần sticky) |

**Modern recommendation**: dùng external session store (Redis), backend stateless → no need sticky session, scale dễ.

---

## 5. Core 3: Zero-downtime deploy

Update version không stop service?

### Rolling update

```
Initial:  Server A (v1) | Server B (v1) | Server C (v1)
Step 1:   Server A (v2) | Server B (v1) | Server C (v1)
Step 2:   Server A (v2) | Server B (v2) | Server C (v1)
Step 3:   Server A (v2) | Server B (v2) | Server C (v2)
```

LB liên tục health check, server đang restart bị bỏ tạm → user không thấy fail.

### Blue-Green deploy

- **Blue** (current): traffic 100%
- **Green** (new version): deploy nhưng 0% traffic
- Test Green OK → switch traffic 0% → 100%
- Rollback nhanh: switch lại Blue

### Canary deploy

Cho 1% traffic vào version mới, monitor metric. OK → tăng dần (5%, 25%, 50%, 100%). Fail → rollback nhanh.

---

## 6. Core 4: System tự "thở"

**Auto Scaling**: theo load, LB + auto scaler:

```
CPU avg >70% trong 5 phút → +1 instance
CPU avg <30% trong 10 phút → -1 instance
```

| Cloud | Service |
|------|---------|
| AWS | Auto Scaling Group |
| GCP | Managed Instance Group |
| K8s | Horizontal Pod Autoscaler (HPA) |

---

## 7. Selection thực

| Use | Recommend |
|------|------|
| Cloud-managed | AWS ALB/NLB, GCP Cloud LB, Azure LB |
| Self-host L7 simple | Nginx, Caddy |
| Self-host L7 powerful | Envoy, Traefik |
| Self-host L4 | HAProxy, IPVS |
| K8s ingress | Nginx Ingress, Traefik, Envoy-based (Contour, Emissary) |
| Service mesh | Istio, Linkerd (Envoy under) |

---

## 8. Tổng kết: core thinking LB

1. **Horizontal scale**: traffic tăng = thêm server, không upgrade single
2. **Health check**: auto remove broken server, không cho serve
3. **Stateless backend**: avoid sticky session, deploy + scale dễ
4. **Zero-downtime deploy**: rolling / blue-green / canary
5. **Auto scaling**: theo metric tự thêm/xoá instance

::: tip 2026 cho VN dev
- **VN context**:
  - Cloud LB managed (AWS ALB, VNG LB) cho startup
  - On-prem dùng Nginx, HAProxy
  - K8s phổ biến → Ingress Controller
- **Modern trends 2026**:
  - **Service mesh** (Istio, Linkerd): handle service-to-service LB + observability
  - **Gateway API** (K8s): standardize Ingress alternative
  - **eBPF-based LB**: Cilium, faster
- **AI scenario**: LLM API gateway (LiteLLM, Portkey) làm LB cho multiple LLM provider, cost + perf optimization
:::

## 9. Glossary

| Term | Plain |
|------|------|
| **Load Balancer** | Phân request đến nhiều server |
| **Sticky Session** | Same user → same server |
| **Health Check** | Check server alive |
| **Backend / Upstream** | Server thực xử request |
| **L4** | Transport layer (TCP/UDP) |
| **L7** | Application layer (HTTP) |
| **Auto Scaling** | Auto add/remove instance theo load |
