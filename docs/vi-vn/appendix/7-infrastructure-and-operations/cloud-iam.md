# Cloud Identity + Access Management

::: tip Mở đầu
**Mới lên cloud đã "踩雷"?** Dev tweet ra **AWS Access Key** trên GitHub → 5 phút sau hacker dùng để mine crypto, hoá đơn $50k. Đây là tình huống **không thể tránh** nếu không hiểu **IAM** kỹ.
:::

---

## 1. IAM là gì? Từ "access control"

**IAM (Identity and Access Management)** = system control:
- **Ai** access được (Identity)
- **Cái gì** access được (Resource)
- **Làm gì** được (Action)

Ẩn dụ "access control toà nhà":
- Identity = thẻ nhân viên
- Resource = mỗi phòng
- Action = mở cửa / vào / ra

### Vendor terminology

| Cloud | IAM term |
|------|------|
| AWS | IAM |
| Azure | RBAC |
| GCP | Cloud IAM |
| Alibaba | RAM (Resource Access Mgmt) |
| Cloudflare | API Tokens + Roles |

---

## 2. User, Group, Role: dùng cái nào?

### User: identity duy nhất

Mỗi người = 1 User. Có credential riêng (username + password / Access Key).

```
User: dev-hoang
  password: ********
  access_key: AKIA...
  groups: [developers]
```

### Group: gom User

Permission **group level**, gán cho group thay vì từng user → easier manage.

```
Group: developers
  policies:
    - ReadOnlyAccess
    - S3DevBucketWrite
  users: [hoang, linh, an]
```

Thêm user mới = add vào group → kế thừa permission.

### Role: identity tạm có thể "assume"

User không có password lâu dài, mà **assume role** tạm. Như "tạm đeo ID badge khác":

```
Role: ec2-s3-reader
  trust_policy: ec2.amazonaws.com  # Cho EC2 instance assume
  policies:
    - S3ReadOnly
```

EC2 instance attach role này → tự động có S3 read permission, **không cần Access Key trong code**.

### Khi nào dùng cái nào?

| Use | User | Group | Role |
|------|------|------|------|
| Human dev SSH | ✓ | ✓ (gán policy) | ✗ |
| Service-to-service | ✗ | ✗ | ✓ |
| Cross-account access | ✗ | ✗ | ✓ |
| EC2 access S3 | ✗ | ✗ | ✓ |
| Temp access | ✗ | ✗ | ✓ |

---

## 3. Role + Policy: "linh hồn" permission management

### Policy: rule permission cụ thể

JSON describe Action nào trên Resource nào:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}
```

### Policy types

| Type | Note | Vd |
|------|------|----|
| AWS Managed | AWS pre-built | AmazonS3ReadOnlyAccess |
| Customer Managed | Bạn tạo, reusable | MyAppS3Policy |
| Inline | Embed trong user/group/role | One-off |

### Principle: Least Privilege

**Cấp permission tối thiểu để task chạy được.** Đừng `AdministratorAccess` trừ khi cần.

Bad:
```json
{ "Effect": "Allow", "Action": "*", "Resource": "*" }  // Admin god
```

Good:
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-bucket/uploads/*"
}
```

---

## 4. Access Key (AK/SK): "key" cần giữ cẩn thận

**AK/SK** (Access Key ID + Secret Access Key) = credential cho **API access** (cli/sdk).

```
AKIA1234567890ABCDEF       ← Access Key ID (như username)
wJalrXUtnFEMI/K7MDENG/...  ← Secret (như password)
```

### Anti-patterns chí mạng

**❌ NEVER hardcode trong code**:
```python
# Pit fatal!
# Hoàng dev viết (vấn đề security nghiêm trọng!)
s3 = boto3.client('s3',
    aws_access_key_id='AKIA1234567890ABCDEF',
    aws_secret_access_key='wJalrXUtnFEMI/K7...'
)
s3.upload_file('local.txt', 'my-bucket', 'remote.txt')
```

Code này push GitHub → 5 phút sau hacker tự động scan → mine crypto.

**✅ Solution 1: AWS CLI config**
```bash
# Chỉ chạy 1 lần local
aws configure
# Enter Access Key ID + Secret + region
# Lưu ở ~/.aws/credentials, permission 600
```

```python
# Code không cần credential
import boto3
s3 = boto3.client('s3')
s3.upload_file('local.txt', 'my-bucket', 'remote.txt')
```

**✅ Solution 2: IAM Instance Profile (cho EC2)**
```python
# 1. Tạo IAM Role với permission (vd S3ReadOnly)
# 2. Tạo Instance Profile, attach Role
# 3. Launch EC2 với Instance Profile
# 4. Code không cần credential — SDK tự lấy từ instance metadata
import boto3
s3 = boto3.client('s3')  # Auto get temp credentials
# Credentials auto rotate, no expire worry
```

**✅ Solution 3: OIDC Federation (cho CI/CD)**
```yaml
# GitHub Actions với OIDC
permissions:
  id-token: write  # Allow GitHub mint OIDC token
  contents: read

jobs:
  deploy:
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/github-deploy-role
          aws-region: ap-southeast-1
      # No AK/SK in secrets, AWS trust GitHub identity
```

---

## 5. MFA: layer protection thứ 2

**MFA (Multi-Factor Authentication)** = ngoài password, cần factor thứ 2 (OTP, hardware token).

```bash
# Bật MFA cho root account TRƯỚC
# Cấp 1: Google Authenticator OTP
# Cấp 2: Hardware key (YubiKey)
```

**Root account**: BẮT BUỘC MFA + lock away. Daily dùng IAM user.

---

## 6. Audit + monitor

### CloudTrail / Activity Log

Record mọi API call. Ai làm gì, khi nào, từ IP nào.

```
2024-01-15 10:30:00 user=hoang action=s3:DeleteObject resource=my-bucket/data.csv ip=1.2.3.4
2024-01-15 10:35:00 user=root action=ec2:RunInstances ... ← ⚠️ Root dùng = suspicious
```

### Alert

Set alert:
- Root account login
- IAM policy change
- Console login từ IP unusual
- AK/SK exposed (GitHub Secret Scanner detect)

---

## 7. Best practices

| Practice | Note |
|------|------|
| Root account: lock + MFA | Daily dùng IAM user |
| Least privilege | Permission tối thiểu |
| Use Role thay AK | EC2, Lambda, container → instance profile |
| Rotate credentials | AK/SK rotate 90 ngày |
| Audit log enable | CloudTrail / Activity Log on |
| MFA cho user | Mọi admin user enable MFA |
| Permission boundary | Limit max permission cho user |
| Service Control Policy | Org-level guardrail |
| No production AK in laptop | Use SSO, AWS SSO, OIDC federation |
| Secret manager | AWS Secrets Manager, Vault cho app secret |

---

## 8. Common AWS IAM patterns

### CI/CD deploy
```
GitHub Actions → OIDC → IAM Role → AWS resources
(No AK in secrets)
```

### Cross-account access
```
Account A user → assume role → Account B resource
```

### EC2 → S3
```
EC2 instance profile → IAM Role → S3 bucket
```

### Lambda → DynamoDB
```
Lambda execution role → DynamoDB permission
```

---

## Tổng kết

IAM = foundation security cho cloud. Vi phạm IAM = data breach + hoá đơn vài chục $k.

1. **User / Group / Role**: human dùng User, service dùng Role
2. **Least Privilege**: permission tối thiểu
3. **AK/SK**: NEVER hardcode, dùng instance profile / OIDC
4. **MFA**: layer protection thứ 2
5. **Audit**: CloudTrail + alert
6. **Best practice**: rotate, separate dev/prod, no root daily

::: tip 2026 cho VN dev
- **Modern auth 2026**:
  - **AWS IAM Identity Center** (SSO)
  - **OIDC Federation**: thay AK trong CI/CD
  - **AssumeRoleWithWebIdentity**
- **Tools**:
  - **AWS Vault** (CLI): manage AWS credential
  - **HashiCorp Vault**: secret manager mạnh
  - **AWS Secrets Manager / Parameter Store**: managed
  - **Doppler, Infisical**: dev-friendly secret manager
- **VN context**:
  - Hire DevOps có IAM expertise → critical
  - VN bank: IAM phải comply SBV regulation
- **AI scenario**: AI agent assume role có permission scoped, mỗi action audited
:::
