# Cloud Platforms thực chiến

::: tip Mở đầu
**Tại sao ngày càng nhiều cty không mua server?** Trước, deploy 1 web cần mua server, lắp DC, thuê admin. Hôm nay, 5 phút online + cấu hình tốt hơn. Đây là magic cloud platform.
:::

---

## 1. Cloud vendor là gì?

**Cloud computing vendor** = bán "computing resource as a service". Bạn không cần mua hardware, chỉ thuê + dùng cloud, vendor lo hết hardware + maintenance.

Như **thuê nhà**:
- Mua server = mua nhà (cost cao, dài hạn, không flexible)
- Thuê cloud = thuê nhà (pay-as-go, scale dễ, chuyển nhà dễ)

---

## 2. Vendors nổi tiếng

### Global (2026)

| Vendor | Đặc điểm | Market share |
|------|------|------|
| **AWS** (Amazon) | Most comprehensive, dịch vụ phong phú nhất | ~32% |
| **Azure** (Microsoft) | Tích hợp tốt Microsoft ecosystem | ~22% |
| **GCP** (Google) | Mạnh nhất AI/ML, BigQuery analytics | ~11% |
| **Alibaba Cloud** | #1 Asia Pacific, China dominance | ~5% |
| **DigitalOcean** | UX dev-friendly, predictable pricing | <2% |
| **Cloudflare** | Edge-first, developer platform | Growing |

### VN local

- **Viettel Cloud**: largest VN, telecom backbone
- **VNG Cloud (CloudVerse)**: gaming + e-commerce focus
- **FPT Cloud**: enterprise + banking
- **CMC Cloud**: SOE customer

::: tip Global vs VN cloud
**Global**: tools phong phú, doc tốt, ecosystem mạnh. Phù hợp startup + tech company.
**VN cloud**: compliance VN (data residency), customer service VN, pricing VND. Phù hợp enterprise + banking + government.
:::

---

## 3. Dùng cloud thế nào?

### 3.1 Mô hình service: IaaS, PaaS, SaaS

| Mô hình | Mức | Cấp gì | Vd |
|------|------|------|------|
| **IaaS** (Infrastructure) | Underlying | VM, network, storage | AWS EC2, GCP Compute Engine |
| **PaaS** (Platform) | Mid | App runtime, DB managed | Vercel, Heroku, GCP App Engine |
| **SaaS** (Software) | Top | Ready software | Gmail, Notion, Slack |

Recipe ẩn dụ:
- **IaaS**: cho bạn bếp + nguyên liệu, tự nấu
- **PaaS**: cho công thức + ai đã chuẩn bị, bạn nấu
- **SaaS**: bưng món lên bàn

### 3.2 Service categories

1. **Compute**: VM (EC2), container (ECS, GKE), serverless (Lambda, Cloud Run)
2. **Storage**: object (S3), block (EBS), file (EFS)
3. **Database**: managed RDS, NoSQL (DynamoDB), data warehouse (BigQuery, Redshift)
4. **Network**: VPC, load balancer, CDN
5. **AI/ML**: SageMaker, Vertex AI, Bedrock
6. **Security**: IAM, KMS, WAF
7. **DevOps**: CodePipeline, Cloud Build

---

## 4. Mua + call API

### Mỗi vendor flow tương tự:

1. **Register**: tạo account
2. **Verify**: identity + phone + payment method
3. **Get credentials**: Access Key + Secret (giống password cho API call)
4. **Pick region**: chọn DC (asia-southeast-1 cho VN low latency)
5. **Pricing**: pay-as-go hoặc reserved instance (discount commit lâu)

### Call API

```bash
# AWS CLI
aws configure
# Nhập Access Key + Secret + region
aws s3 ls  # List buckets

# Hoặc SDK
```

```python
import boto3
s3 = boto3.client('s3')
s3.upload_file('local.txt', 'my-bucket', 'remote.txt')
```

---

## 5. Thực chiến: deploy web từ 0

**Goal**: deploy 1 Node.js app lên cloud.

### Cách 1: Easy mode (PaaS)

```bash
# Vercel (FE + serverless function)
npm install -g vercel
vercel
# Done. URL có ngay.

# Hoặc Railway, Render, Fly.io
```

### Cách 2: VM mode (IaaS)

1. Tạo EC2 t3.micro (Ubuntu, free tier eligible)
2. SSH vào: `ssh -i key.pem ubuntu@<IP>`
3. Install Node.js, Nginx, PM2
4. Clone repo + setup
5. Config Nginx reverse proxy
6. Setup HTTPS với Let's Encrypt
7. Open security group port 80, 443

### Cách 3: Container mode

```bash
# Build Docker image, push ECR/GCR
docker build -t my-app .
docker push <registry>/my-app

# Deploy ECS / Cloud Run / Lambda container
```

---

## 6. Tổng kết + next steps

Cloud = **revolution** trong deploy + ops infra. Tools đa dạng phù hợp project size.

### Recommend
- **Newbie**: bắt đầu Vercel/Railway (PaaS), không phải lo infra
- **Dev mid**: học AWS basics (EC2, S3, RDS, Lambda)
- **DevOps**: K8s + Terraform + multi-cloud

### Common mistakes
- **Quên billing alert**: cost spike không phát hiện
- **Public bucket S3**: leak data
- **Root account dùng daily**: security risk
- **Single AZ deploy**: không HA

::: tip 2026 cho VN dev
- **Free tiers**:
  - **Cloudflare Workers**: 100k req/day free
  - **Vercel**: hobby tier free
  - **Supabase**: 500MB DB + 1GB storage free
  - **AWS**: 12 months free tier
- **Budget tip**: dùng spot/preemptible instance (60-90% cheaper) cho non-critical workload
- **VN context**:
  - **Latency**: chọn Singapore region cho VN users (~20ms)
  - **Compliance**: nếu cần data ở VN, dùng VN cloud
  - **Payment**: international card cần thiết, hoặc VN cloud chấp nhận VietQR
- **AI workload**: GPU instance đắt, dùng API (OpenAI, Anthropic) thay self-host trừ khi scale lớn
:::

## 7. Glossary

| Term | Plain |
|------|------|
| **Region** | Geographic area (us-east-1, ap-southeast-1) |
| **AZ** (Availability Zone) | DC trong region |
| **VPC** | Virtual Private Cloud, network isolated |
| **EC2** | AWS VM service |
| **S3** | AWS object storage |
| **Lambda** | AWS serverless function |
| **CloudFront** | AWS CDN |
| **Route 53** | AWS DNS |
