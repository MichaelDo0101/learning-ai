# High Availability + Disaster Recovery

::: tip Mở đầu
**System down 1 phút = mất vài chục triệu.** **HA (High Availability)** = system tiếp tục serve khi gặp hardware fail, software bug, network issue. **DR (Disaster Recovery)** = recover khi disaster lớn.
:::

**Bạn sẽ học**:
- **Availability metric**: "mấy 9" + downtime
- **Failover**: active-standby, active-active, multi-region
- **DR strategy**: RPO + RTO + backup
- **Fault detection**: heartbeat, probe, circuit breaker
- **Chaos engineering**: chủ động inject fault

| Chương | Nội dung |
|-----|------|
| **1** | Availability metric |
| **2** | Failover architecture |
| **3** | DR design |
| **4** | Fault detection + recovery |
| **5** | Chaos engineering |

---

## 1. Availability metric: "mấy 9" nghĩa gì?

**Availability = Uptime / Total time × 100%**

Vd 1 tháng (30 ngày = 43200 phút) down 43 phút → (43200-43)/43200 ≈ 99.9%. Mỗi 9 thêm = downtime allowed giảm 1 order, complexity + cost tăng exponential.

| Tier | % | Down/tháng | Down/năm | Use |
|-----------|--------|------------|------------|---------|
| 2 nines | 99% | 7.3h | 3.65 ngày | Internal tool |
| 3 nines | 99.9% | 43 phút | 8.76h | Business thường |
| 4 nines | 99.99% | 4.3 phút | 52.6 phút | E-commerce, SaaS |
| 5 nines | 99.999% | 26 giây | 5.26 phút | Banking, payment |

<AvailabilityCalculatorDemo />

::: tip SLA là gì?
**SLA (Service Level Agreement)** = cam kết formal vendor ↔ customer. Vd AWS S3 commit 99.99%, không đạt = refund tỷ lệ. SLA không chỉ tech metric, mà commercial contract — vi phạm = đền tiền.
:::

::: tip Khoảng cách 3 nines → 4 nines
3 nines (99.9%) = 43 phút/tháng — 1 lần deploy lỗi rollback = hết.
4 nines (99.99%) = 4 phút/tháng — yêu cầu auto failover, rolling deploy, health check đầy đủ.
:::

---

## 2. Failover architecture

**Failover** = core mechanism HA: main node fail → auto switch sang standby.

### Active-Standby

Main xử mọi request, standby sync data nhưng không xử. Main fail → standby take over.

```
Normal:
  Client → Main (xử request)
           Standby (sync data, wait)

Failover:
  Client → Standby (new main)
           Original main (fault, repair)
```

Vấn đề key: **Split Brain** — network partition, 2 node đều nghĩ kia chết, cùng serve → data inconsistent. Solution: **Quorum** — ít nhất 3 node vote.

### Multi-AZ

Deploy ở nhiều DC cùng region. DC đơn down không ảnh hưởng. AZ cloud có dedicated link low-latency (<2ms).

### Multi-Region Active-Active

Deploy full replica ở thành phố/nước khác, mỗi site xử request độc lập. HA cao nhất, cũng complex nhất — challenge: **cross-region data sync** latency + consistency.

<FailoverStrategyDemo />

| Architecture | Tier | Cost | Complexity | Use |
|------|-----------|------|--------|---------|
| Single | 99%~99.9% | Thấp | Thấp | Dev test, internal |
| Active-Standby | 99.9%~99.99% | Trung | Trung | Mid-size business |
| Multi-AZ | 99.99% | Cao | Cao | E-commerce, SaaS |
| Multi-Region A-A | 99.999% | Cực cao | Cực cao | Banking, big internet |

---

## 3. DR design: RPO + RTO

| Metric | Full | Nghĩa | Vd |
|------|------|------|------|
| RPO | Recovery Point Objective | Cho phép mất bao nhiêu data | RPO=0 → không mất data nào |
| RTO | Recovery Time Objective | Cho phép down bao lâu | RTO=5min → recover trong 5 phút |

### Backup strategy + RPO

| Cách backup | RPO | Cost | Note |
|---------|-----|------|------|
| Full backup daily | 24h | Thấp | Max mất 1 ngày |
| Realtime incremental | Vài phút | Trung | binlog/WAL sync |
| Sync replication | 0 | Cao | Write phải đợi replica confirm |

::: tip Không mọi data cần RPO=0
Avatar mất user upload lại được (RPO=24h OK), nhưng payment record không được mất (RPO=0). Backup strategy theo business value, không one-size-fits-all.
:::

---

## 4. Fault detection + recovery

### 4.1 Detection

| Mechanism | Nguyên lý | Speed | Use |
|------|------|---------|---------|
| Heartbeat | Send heartbeat định kỳ, timeout = fault | Giây | Node alive |
| Health check | HTTP/TCP probe | Giây | Load balancer backend |
| Business probe | Mô phỏng real request | Giây-phút | End-to-end availability |

**Heartbeat**: node A định kỳ (5s) send "tôi sống" lên monitor. N lần (3) không thấy = fault. Tham số key: **interval** + **threshold**.

**3 cấp health check**:
- **Liveness**: process đang chạy? Không → restart
- **Readiness**: service nhận request? Không → bỏ khỏi LB
- **Startup**: service start xong? Chưa → đợi, không misjudge

### 4.2 Auto recovery

| Mechanism | Description | Tool |
|------|------|---------|
| Auto restart | Process crash → restart | systemd, PM2, K8s |
| Auto scaling | Load tăng → scale up | K8s HPA, Cloud Auto Scaling |
| Circuit breaker | Downstream fail → fail fast | Hystrix, Sentinel, Resilience4j |
| Rate limit | Request quá capacity → reject | Nginx limit_req, gateway |

**Circuit Breaker pattern**:

Cảm hứng từ cầu chì điện — overload tự ngắt, bảo vệ mạch. Microservice, downstream fail → breaker "open", request fail-fast thay vì đợi timeout.

```
3 trạng thái Circuit Breaker:

  Closed (normal) ──→ Fail rate > threshold ──→ Open (broken)
       ↑                                            │
       │                                      Cooldown
       │                                            ↓
       └── Probe success ←── Half-Open (test)
```

- **Closed**: forward request bình thường, count fail rate
- **Open**: mọi request fail-fast, không call downstream
- **Half-Open**: cooldown xong, cho probe ít. OK → close; fail → open

**Fallback** = strategy đi cùng circuit breaker: trigger breaker không trả error, return "fallback" result. Vd recommend service fail → return hot product list; avatar load fail → default avatar.

---

## 5. Chaos engineering: chủ động tìm bug

Core: **thay vì đợi fault, chủ động tạo fault**, verify resilience trong controlled env.

| Tool | By | Capability |
|------|--------|---------|
| Chaos Monkey | Netflix | Random kill instance prod |
| Chaos Mesh | PingCAP | Fault injection K8s |
| Litmus | CNCF | Cloud-native chaos framework |
| ChaosBlade | Alibaba | Multi-scenario fault injection |

::: tip 5 step
1. **Define steady state**: metric system bình thường (vd P99 < 200ms)
2. **Hypothesis**: nếu 1 node die, system phải recover trong 30s
3. **Inject fault**: kiểm soát range (test trước, prod sau)
4. **Observe**: system recover như expected? Cascade fail?
5. **Fix weakness**: phát hiện → improve architecture + process
:::

---

## Tổng kết

HA không phải feature, mà capability architecture. Phải đảm bảo ở mọi mắt xích design → dev → deploy → ops.

1. **Mấy 9**: mỗi 9 thêm = downtime giảm 1 order, cost + complexity exponential
2. **Failover**: từ A-S đến multi-region A-A, theo business need
3. **RPO + RTO**: theo data value design backup
4. **Automation**: detect, restart, circuit breaker = HA infrastructure
5. **Chaos**: chủ động tạo fault, verify resilience

::: tip 2026 cho VN dev
- **VN context**:
  - Banking: target 5 nines (Vietcombank, VPBank)
  - E-commerce VN (Shopee, Tiki): 4 nines, multi-AZ AWS/GCP
  - Startup: 3 nines đủ ban đầu
- **Modern HA tools 2026**:
  - **AWS Multi-Region**: Route 53 + RDS read replica cross-region
  - **Cloudflare**: anycast network → automatic HA
  - **Backup**: AWS Backup, GCP Backup, Velero (K8s)
- **VN regulation**: Banking Decree 13 yêu cầu DR site, RTO/RPO khắt
- **AI scenario**: LLM API có circuit breaker với fallback model (vd GPT-4 fail → fallback Claude/Gemini), critical cho production AI app
:::

## Tài liệu

- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [Chaos Monkey](https://netflix.github.io/chaosmonkey/)
- [Release It!](https://pragprog.com/titles/mnee2/release-it-second-edition/)
- [Chaos Mesh](https://chaos-mesh.org/)
