# Kubernetes Orchestration

::: tip Mở đầu
**Docker giải vấn đề "đóng gói", Kubernetes giải vấn đề "quản lý".** Khi có vài chục-trăm container deploy, scale, recover — manual không khả thi. Kubernetes (K8s) = "OS" của container, auto deploy + scale + ops cho containerized app.
:::

**Bạn sẽ học**:
- **Architecture**: control plane + worker node
- **Core resource**: Pod, Deployment, Service
- **Declarative management**: declare desired state, system converge
- **Ops**: rolling update, auto scale, health check
- **Practical**: kubectl + YAML deploy app

| Chương | Nội dung |
|-----|------|
| **1** | Sao cần K8s |
| **2** | K8s architecture |
| **3** | Core resources |
| **4** | Declarative management |
| **5** | Ops practice |

---

## 1. Sao cần Kubernetes?

Docker dễ pack + run 1 container, nhưng manual không nổi khi:

| Challenge | Description | K8s solution |
|------|------|---------------|
| Multi-replica | 1 service cần 10 replica | Deployment auto manage |
| Fault recovery | Container chết auto restart | Controller auto detect + rebuild Pod |
| Service discovery | Container IP đổi, làm sao find? | Service cung cấp DNS + IP ổn định |
| Rolling update | Update version không stop service | Replace Pod dần, zero-downtime |
| Auto scale | Peak traffic auto scale | HPA theo CPU/memory |
| Resource schedule | Đặt container vào máy phù hợp | Scheduler smart |

::: tip Core idea K8s: declarative
Bạn không bảo "start 3 container" (imperative), mà bảo "tôi muốn 3 replica chạy" (declarative). K8s monitor liên tục, đảm bảo actual = desired. Pod chết → auto tạo mới.
:::

---

## 2. K8s Architecture

Cluster = Control Plane + Worker Node.

<K8sArchitectureDemo />

### Path 1 request:

```
User request → Ingress Controller → Service → kube-proxy → Pod (container)
                                              ↑
                                    Endpoint list (Service maintain)
```

---

## 3. Core resources

K8s qua "resource object" mô tả desired state.

<K8sWorkloadsDemo />

### Resource categories

| Category | Resource | Use |
|------|------|------|
| Workload | Pod, Deployment, StatefulSet, DaemonSet, Job | Run app |
| Network | Service, Ingress, NetworkPolicy | Service discovery + traffic |
| Config | ConfigMap, Secret | Config + secret data |
| Storage | PersistentVolume, PersistentVolumeClaim | Persistent storage |
| Schedule | Node, Namespace, ResourceQuota | Resource isolation + limit |

---

## 4. Declarative management + kubectl

### Reconciliation Loop

K8s core mechanism = control loop:

```
Observe → Diff → Act → Observe...
   ↓        ↓      ↓
 Read     Compare  Execute
 actual   desired  correction
```

Bạn declare `replicas: 3`, controller phát hiện chỉ 2 Pod chạy → tạo thêm 1. Loop chạy mỗi vài giây.

### kubectl commands

| Command | Use | Example |
|------|------|------|
| `kubectl apply -f` | Apply YAML | `kubectl apply -f deployment.yaml` |
| `kubectl get` | List | `kubectl get pods -o wide` |
| `kubectl describe` | Detail | `kubectl describe pod my-app-xxx` |
| `kubectl logs` | Log | `kubectl logs -f my-app-xxx` |
| `kubectl exec` | Enter Pod | `kubectl exec -it my-app-xxx -- sh` |
| `kubectl delete` | Delete | `kubectl delete -f deployment.yaml` |
| `kubectl scale` | Scale manual | `kubectl scale deploy my-app --replicas=5` |

::: tip apply vs create
`kubectl create` = imperative "create này", đã có = error. `kubectl apply` = declarative "đảm bảo state này", không có = create, đã có = update. Prod **luôn dùng apply**.
:::

---

## 5. Ops practice

### 5.1 Rolling update + rollback

Deployment default rolling update strategy: tạo Pod mới dần, đồng thời terminate cũ dần.

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

| Op | Command |
|------|------|
| Update image | `kubectl set image deploy/my-app app=my-app:2.0` |
| View status | `kubectl rollout status deploy/my-app` |
| History | `kubectl rollout history deploy/my-app` |
| Rollback | `kubectl rollout undo deploy/my-app` |

### 5.2 HPA (Auto Scale)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### 5.3 Health probes

| Probe | Use | Effect on fail |
|------|------|---------|
| livenessProbe | Check container alive | Restart container |
| readinessProbe | Check container ready | Remove from Service, không nhận traffic |
| startupProbe | Check container startup | Trong startup không chạy probe khác |

::: tip Sao probe quan trọng?
Pod không có health check, K8s chỉ judge qua process exist. Nhưng nhiều khi process còn, service không respond (deadlock, OOM edge). livenessProbe = auto restart container "zombie".
:::

---

## Tổng kết

K8s = de-facto standard cho container orchestration, foundation cloud-native dev.

1. **Declarative**: bảo K8s "tôi muốn gì", control loop auto converge
2. **Architecture**: control plane decide, worker execute, etcd store state
3. **Core**: Pod (smallest unit), Deployment (replica), Service (discovery), Ingress (entry)
4. **Auto ops**: rolling update zero-downtime, HPA, probe auto fault recovery
5. **Config separation**: ConfigMap + Secret decouple với image

::: tip 2026 cho VN dev
- **Managed K8s**: EKS (AWS), GKE (GCP), AKS (Azure), Civo
- **VN context**:
  - VN cloud: VNG K8s, FPT K8s
  - Startup nhỏ → tránh K8s, dùng Vercel/Railway/Fly.io thay
  - Enterprise → K8s + Istio service mesh
- **Modern tooling 2026**:
  - **Helm**: package manager
  - **ArgoCD / FluxCD**: GitOps
  - **Kustomize**: YAML overlay (built into kubectl)
  - **k9s**: TUI cho K8s
- **AI workload**: K8s + KubeRay, Kueue cho GPU schedule, vLLM cho LLM serving
:::

## Tài liệu

- [Kubernetes docs](https://kubernetes.io/docs/)
- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [The Illustrated Children's Guide to Kubernetes](https://www.cncf.io/phippy/)
- [Kubernetes Patterns](https://www.oreilly.com/library/view/kubernetes-patterns-2nd/9781098131678/)
