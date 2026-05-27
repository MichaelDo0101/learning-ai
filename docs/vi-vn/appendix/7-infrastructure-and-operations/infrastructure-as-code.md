# Infrastructure as Code

::: tip Mở đầu
**Bạn từng gặp ác mộng: server prod chết, không ai nhớ config ban đầu thế nào?** Manual SSH, gõ command theo memory, cầu trời không gõ sai — đây là ops traditional. **IaC (Infrastructure as Code)** thay đổi: dùng code define + manage infra, để config server như software — version-controlled, reproducible, auditable.
:::

**Bạn sẽ học**:
- **Core concept**: IaC + sao nó là foundation ops hiện đại
- **Workflow**: Terraform Write → Plan → Apply → Destroy
- **Tool selection**: Terraform, Pulumi, CloudFormation
- **Risk**: config drift detect + prevent
- **Best practice**: engineering management

| Chương | Nội dung |
|-----|------|
| **1** | IaC concept |
| **2** | Terraform workflow |
| **3** | Tool comparison |
| **4** | Config drift |
| **5** | Best practice |

---

## 0. Toàn cảnh: sao infra cần "source code"?

Tưởng bạn là đầu bếp. Mỗi món nấu theo cảm giác — hôm nay 1 muỗng muối, mai 2 muỗng — taste không stable. Nhưng ghi recipe — chính xác từng gam — ai cũng reproduce được.

Infra management same. 1 server config có thể vài chục param (OS, network, security group, volume, env var). Manual config dễ sai, **không reproducible, không auditable, không rollback**.

::: tip IaC core value
- **Reproducible**: cùng code, run bao nhiêu lần kết quả như nhau (idempotency)
- **Version-controlled**: infra change qua Git, ai sửa gì, sao sửa rõ
- **Auditable**: mọi change có record, đáp ứng compliance
- **Automatable**: qua CI/CD auto deploy, loại risk thao tác người
- **Collaborative**: team review infra change qua PR, như review code
:::

---

## 1. IaC concept

Ops traditional: login cloud console, manual click create server, config network, set security group. Vài server OK, hàng chục-trăm → ác mộng.

IaC core: **dùng declarative code mô tả desired infra state, tool tự implement**. Không bảo "tạo VPC, tạo subnet, tạo SG" (imperative), chỉ bảo "tôi muốn network env này" (declarative), tool tự tính step.

<IaCConceptDemo />

| Dim | Manual ops | IaC |
|------|---------|--------------|
| Op | Click console | Viết code |
| Reproducibility | Dựa doc + memory | Code = doc, 100% reproducible |
| Change tracking | Không record / không đủ | Git version, full history |
| Collaboration | Verbal, doc pass | PR review |
| Rollback | Manual reverse | git revert + re-apply |
| Consistency | Env diff lớn | Dev/staging/prod identical |

::: tip Declarative vs Imperative
- **Declarative**: mô tả "tôi muốn gì", tool tự "làm thế nào". Terraform, CloudFormation. Idempotency tốt, flexibility hạn chế.
- **Imperative**: mô tả "làm thế nào", step-by-step. Ansible, shell script. Flexible, khó đảm bảo idempotency.
- **Hybrid**: Pulumi, AWS CDK viết bằng programming language thường, vừa declarative state vừa imperative flexibility.
:::

---

## 2. Terraform workflow: Write → Plan → Apply

Terraform = tool IaC phổ biến nhất, HashiCorp dev. Workflow rõ ràng, 4 phase như "code → review → deploy → cleanup".

<TerraformWorkflowDemo />

::: tip 4-stage workflow
1. **Write**: HCL (HashiCorp Configuration Language) define infra (.tf). Declare resource: server, DB, network.
2. **Plan**: `terraform plan` compare current vs target state, gen "execution plan" — báo bạn sẽ create/modify/delete resource nào. Safety net.
3. **Apply**: confirm plan OK → `terraform apply`. Save state vào terraform.tfstate.
4. **Destroy**: không cần nữa → `terraform destroy` clean hết, tránh cost.
:::

| Command | Use | Modify infra | When |
|------|------|----------------|---------|
| `terraform init` | Init project, download Provider | No | First time hoặc add Provider |
| `terraform plan` | Preview change | No | Every change trước |
| `terraform apply` | Execute change | Yes | Sau confirm plan |
| `terraform destroy` | Destroy mọi resource | Yes | Clean test env, decommission |
| `terraform state` | Manage state file | Theo op | State migration, import |

---

## 3. Tool comparison

<IaCToolComparisonDemo />

| Tool | Language | Cloud support | Learning | Use |
|------|------|-----------|---------|---------|
| Terraform | HCL | Multi-cloud | Trung | Multi-cloud, team |
| Pulumi | Python/TS/Go | Multi-cloud | Thấp (dùng programming lang) | Dev-friendly, complex logic |
| AWS CloudFormation | JSON/YAML | AWS only | Trung | Pure AWS |
| AWS CDK | Python/TS/Java | AWS only | Thấp | AWS + programming lang |
| Ansible | YAML | Multi-cloud + bare metal | Thấp | Config management, hybrid |

::: tip Chọn?
- **Startup / single-cloud**: CloudFormation (AWS) hoặc native cloud tool
- **Multi-cloud / mid-large team**: Terraform, community lớn nhất, Provider phong phú, hire dễ
- **Dev-led team**: Pulumi / CDK, viết infra bằng lang quen, IDE tốt
- **Config management**: Ansible, mạnh ở internal server config (install software, modify file)
:::

---

## 4. Config drift: bomb nổ chậm

**Config drift** = enemy silent nhất IaC. Actual infra state với code definition dần lệch.

Sao? Có ai "quick fix" prod issue, login console sửa SG thẳng; có ai debug tạm tăng config server quên đổi lại. "Tweaks" tích lũy = code + actual env lệch nặng.

<ConfigDriftDemo />

::: tip Hại config drift
1. **Không reproducible**: code mô tả env ≠ actual, tạo env mới sẽ issue
2. **Rollback fail**: tưởng rollback OK, nhưng env đã modify manual
3. **Security risk**: port mở manual, permission relax bị quên → entry attack
4. **Audit fail**: compliance audit dựa code, nhưng code không reflect actual
:::

| Prevention | Note |
|---------|------|
| Cấm manual change | IAM policy hạn chế console op |
| Drift detection định kỳ | Cron `terraform plan` check diff |
| Auto-fix | Detect drift → auto `apply` restore |
| Change audit | Bật CloudTrail audit log |

---

## 5. Best practices

<IaCBestPracticeDemo />

::: tip 6 core practices
1. **Modularize**: trừu tượng reusable infra thành module (VPC, DB module), tránh copy-paste. Như function: define 1 chỗ, call nhiều.
2. **Env isolation**: dev/staging/prod dùng state file + var file riêng, qua workspace hoặc directory.
3. **Remote state**: state (tfstate) lưu remote backend (S3 + DynamoDB), support team collab + state lock, tránh concurrent conflict.
4. **Secret management**: password, key đừng viết code, dùng Vault, AWS Secrets Manager.
5. **CI/CD**: `terraform plan` vào PR flow, `apply` qua pipeline tự động, no manual local.
6. **Code review**: infra change cần Code Review như app code, đặc biệt SG + IAM policy.
:::

---

## Tổng kết

IaC = foundation modern cloud-native ops. Biến "manual op không describable" thành "code version-controlled", infra management từ "art" → "engineering".

1. **IaC essence**: declarative code define desired infra, tool tự implement
2. **Terraform**: Write → Plan → Apply, Plan = safety net
3. **Tool**: multi-cloud → Terraform, single-cloud → native, dev team → Pulumi
4. **Drift**: risk ẩn, process + tool double protect
5. **Engineering**: modularize + env isolation + remote state + CI/CD

::: tip 2026 cho VN dev
- **Modern tooling 2026**:
  - **Terraform**: vẫn dominant
  - **OpenTofu**: open-source fork of Terraform (after BSL license)
  - **Pulumi**: lên mạnh cho TypeScript/Python team
  - **Crossplane**: K8s-native IaC
- **VN context**:
  - VN startup → Terraform + AWS/GCP
  - VN bank → on-prem VMware + Ansible
  - VN enterprise → Terraform + private cloud
- **GitOps trend**: ArgoCD, FluxCD đẩy IaC sang next level
- **AI-era IaC**: LLM gen Terraform/HCL từ natural language (Pulumi AI, Terramate AI)
:::

## Tài liệu

- [Terraform tutorials](https://developer.hashicorp.com/terraform/tutorials)
- [Pulumi docs](https://www.pulumi.com/docs/)
- [AWS CDK Workshop](https://cdkworkshop.com/)
- [Infrastructure as Code (O'Reilly)](https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/)
- [Spacelift Blog](https://spacelift.io/blog)
