# Domain-Specific Languages (DSL): "code không giống code" của BE

::: tip Mở đầu
**Backend dev gặp nhiều "ngôn ngữ" lạ**: YAML config, Dockerfile, Terraform `.tf`, GraphQL schema, SQL, regex... Không phải Python/Java/Go, nhưng vẫn là "ngôn ngữ" — **DSL (Domain-Specific Language)**. Chương này hệ thống hoá thế giới DSL.
:::

---

## 1. DSL: ngoài ngôn ngữ general-purpose

**General-purpose language** (Python, Java, Go): Turing-complete, làm mọi thứ.
**DSL**: focused vào 1 domain cụ thể, không Turing-complete nhưng giải vấn đề domain đó cực hiệu quả.

| Aspect | General | DSL |
|--------|---------|-----|
| Phạm vi | Mọi loại app | 1 domain (vd query DB, describe infra) |
| Learning | Curve dài | Nhanh (vài giờ) |
| Tính biểu cảm | Vạn năng | Vạn lần ngắn gọn trong domain |
| Vd | Python, JS | SQL, regex, Dockerfile, YAML |

---

## 2. Data serialization: text describe structured data

### 2.1 YAML — config thường dùng nhất

```yaml
# DB config
database:
  host: localhost
  port: 5432
  name: myapp
  pool:
    min: 5
    max: 20

# Server config
server:
  port: 3000
  cors:
    origins:
      - https://app.example.com
      - https://admin.example.com
```

**Lợi**: readable cực, hỗ trợ comment, nested rõ.
**Hại**: indent strict (tab vs space gây bug), không validate schema mặc định.
**Use**: Docker Compose, Kubernetes manifest, GitHub Actions, Ansible playbook.

### 2.2 JSON / JSON5 / JSONC

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

**Use**: `package.json`, `tsconfig.json`, API response, web config.

### 2.3 TOML

```toml
[server]
port = 3000

[database]
host = "localhost"
port = 5432
```

**Use**: Rust `Cargo.toml`, Python `pyproject.toml`, Hugo config.

### 2.4 XML (legacy, vẫn dùng Java)

```xml
<server>
  <port>3000</port>
</server>
```

**Use**: Spring legacy config, Android `AndroidManifest.xml`, SOAP API.

---

## 3. Embedded scripting: config có programmable

Khi YAML/JSON không đủ (cần loop, condition), dùng scripting embedded.

### 3.1 HCL (Terraform)

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  count         = var.environment == "prod" ? 3 : 1

  tags = {
    Name = "Web-${count.index}"
  }
}
```

Có variable, condition, loop, function — gần ngôn ngữ thật.

### 3.2 Jsonnet

```jsonnet
local env = "prod";
{
  port: 3000,
  replicas: if env == "prod" then 5 else 1,
}
```

JSON với superpower: variable, function, import. Dùng nhiều cho Kubernetes config (giảm duplicate).

### 3.3 Nix language

```nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [ pkgs.nodejs_20 pkgs.python311 ];
}
```

Function pure, reproducible build env.

---

## 4. Infrastructure as Code (IaC)

### 4.1 Terraform (HCL)

```hcl
# Define cloud server
resource "aws_instance" "web" {
  ami           = "ami-12345"
  instance_type = "t3.medium"
}

# Define PostgreSQL DB instance
resource "aws_db_instance" "main" {
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.micro"
  username       = "admin"
  password       = var.db_password
}
```

`terraform apply` → AWS tự provision.

### 4.2 Pulumi (general-purpose lang)

```typescript
import * as aws from "@pulumi/aws"

const web = new aws.ec2.Instance("web", {
  ami: "ami-12345",
  instanceType: "t3.medium",
})
```

Pulumi cho dùng TS/Python/Go thay HCL → IDE support tốt hơn.

### 4.3 CloudFormation / ARM templates

AWS / Azure native IaC. Verbose hơn Terraform, nhưng integrate sâu cloud provider.

---

## 5. Glue code + SDK auto-gen

### 5.1 GraphQL schema (SDL)

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Query {
  user(id: ID!): User
  users(limit: Int = 10): [User!]!
}
```

Define API contract → gen TypeScript types, gen client SDK auto (GraphQL Code Generator).

### 5.2 Protobuf

```protobuf
syntax = "proto3";

message User {
  int32 id = 1;
  string name = 2;
}

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
}
```

→ Gen client + server stub cho mọi ngôn ngữ (Go, Java, Python, JS).

### 5.3 OpenAPI / Swagger

```yaml
openapi: 3.0.0
paths:
  /users/{id}:
    get:
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: User found
```

→ Gen client SDK 30+ ngôn ngữ, mock server, interactive doc (Swagger UI, Scalar).

### 5.4 SQL (DSL kinh điển nhất)

```sql
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC
LIMIT 10;
```

**Declarative**: mô tả "muốn gì", không phải "làm thế nào". DB engine tự optimize execution plan.

### 5.5 Regex (regular expression)

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

10 char giải bài match email phức tạp.

---

## 6. AI + DSL

LLM cực giỏi gen DSL — vì DSL có grammar narrow, AI hiếm hallucinate.

| Dùng AI gen | Lợi |
|---------|------|
| **SQL** | Bảo "lấy 10 user có nhiều order nhất tháng qua" → AI gen SQL |
| **Regex** | Bảo "match VN phone" → AI gen `0[0-9]{9}` |
| **Dockerfile** | Bảo "Node 20 + Postgres client" → AI gen Dockerfile |
| **Terraform** | Bảo "EKS cluster 3 node t3.medium" → AI gen `.tf` |
| **GraphQL schema** | Mô tả entity → AI gen schema |
| **YAML K8s** | Mô tả service → AI gen Deployment + Service manifest |

::: tip Caveat
- AI có thể gen syntactically đúng nhưng semantically sai (vd SQL select wrong column)
- Always validate bằng linter/validator (sqlfluff, hadolint, terraform validate, kubectl --dry-run)
- AI gen → review → test
:::

---

## 7. Glossary

| Term | Note |
|------|------|
| **DSL** | Domain-Specific Language, focused 1 domain |
| **GPL** | General-Purpose Language (đừng nhầm GNU GPL license) |
| **Declarative** | Mô tả "cái gì cần", không phải "làm thế nào" |
| **Imperative** | Mô tả "làm thế nào" step-by-step |
| **Schema** | Define structure, validate data |
| **IaC** | Infrastructure as Code |
| **YAML** | YAML Ain't Markup Language |
| **HCL** | HashiCorp Configuration Language (Terraform) |

---

## Tổng kết

DSL = "language nhỏ giải vấn đề lớn" trong domain hẹp.

Backend dev hiện đại phải đa-ngữ:
- **Config**: YAML, TOML, JSON
- **Query**: SQL, GraphQL
- **Infrastructure**: HCL (Terraform), Dockerfile, K8s YAML
- **Validation**: regex, JSON Schema
- **Doc**: OpenAPI, Protobuf

::: tip 2026 cho VN dev
- **Polyglot**: 1 backend dev hiện đại cần biết 5-10 DSL khác nhau
- **Tooling**: LSP cho mọi DSL (autocomplete + validation IDE)
- **AI gen DSL**: Copilot/Cursor cực mạnh ở SQL, Terraform, Dockerfile
- **VN scenario**: Terraform cho cloud (AWS VN, GCP), K8s YAML cho enterprise on-prem
- **Trends 2026**: PKL (Apple, type-safe config), CUE (validation strong), Dhall (functional)
:::
