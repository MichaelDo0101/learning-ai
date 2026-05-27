# Object Storage + CDN

::: tip Mở đầu
**Sao file upload/download chậm?** User HCM download file lưu Singapore server, mỗi giây mất ~50ms RTT. **Object storage + CDN** giải cả 2: lưu cheap + access fast.
:::

---

## 1. Object Storage: "smart cloud warehouse"

### Storage trên cloud có 3 type

| Type | Vd | Use | Cost |
|------|-----|------|------|
| **Block** | AWS EBS, GCP Persistent Disk | OS disk, DB | Cao |
| **File** | AWS EFS, Azure Files | Shared filesystem | Trung |
| **Object** | AWS S3, GCP Cloud Storage, R2 | File, image, video, backup | Thấp nhất |

### Object storage là gì?

**Object** = file + metadata + unique key. Không có directory structure thật, flat namespace với "/" trong key giả lập folder.

```
my-bucket/
├── images/photo1.jpg     ← Key: "images/photo1.jpg"
├── videos/intro.mp4
└── docs/readme.md
```

### Đặc điểm

- **Unlimited scale**: TB → PB → EB
- **Cheap**: ~$0.023/GB/month (S3 Standard)
- **Durable**: 99.999999999% (11 nines)
- **Access via HTTP**: GET/PUT/DELETE
- **No FS feature**: không rename atomically, không append efficient
- **Eventual consistency** (S3 strong consistency từ 2020)

### Provider comparison

| Provider | Pros | Cons | Pricing/GB/month |
|---------|------|------|------|
| **AWS S3** | Standard, mature ecosystem | Expensive egress | $0.023 |
| **Cloudflare R2** | **Zero egress fee** | New, ecosystem nhỏ hơn | $0.015 |
| **Backblaze B2** | Cheapest, S3-compatible | Less features | $0.006 |
| **GCP Storage** | Good integration | Egress đắt | $0.020 |
| **MinIO** | Self-host, S3-compatible | Self-manage | Hardware cost |

::: tip Cloudflare R2 = game-changer
R2 **zero egress fee** = nếu site serve nhiều media → cost giảm 90%. AWS S3 charge $0.09/GB egress, R2 = $0.
:::

---

## 2. CDN: "global delivery network"

### Vấn đề: latency địa lý

User HCM → server Virginia US:
- Distance: ~14000 km
- RTT: ~250ms
- Each request: 250ms latency cố định

**CDN solve**: cache file ở edge nodes gần user.

```
User HCM → CDN edge Singapore (5ms) → file
                                      ↓ if miss
                                      Origin US (200ms) → CDN cache → User
```

### CDN architecture

```
                  ┌─→ Edge HCM
                  ├─→ Edge HN
Origin (US) ──→ │ ├─→ Edge SG
                  ├─→ Edge JP
                  └─→ Edge KR
```

Each edge cache popular file. Cache miss → fetch origin, save edge, serve.

### Providers

| Provider | Pricing | VN POP | Note |
|---------|---------|--------|------|
| **Cloudflare** | Free tier mạnh | HCM, HN | DDoS protection built-in |
| **AWS CloudFront** | Pay-per-use | HCM, HN | Tích hợp S3 |
| **BunnyCDN** | Pay-per-use, cheap | HCM, HN | Cost-effective |
| **Akamai** | Enterprise, đắt | HCM, HN | Mature, premium |
| **Fastly** | Pay-per-use | SG | Edge compute mạnh |

---

## 3. Full path: upload → access

```
1. User upload (browser → S3)
   - Get pre-signed URL từ BE
   - PUT directly đến S3
   - BE chỉ handle metadata
   
2. Process (Lambda trigger)
   - S3 event → Lambda
   - Resize image, generate thumbnail
   - Write back S3
   
3. CDN cache
   - User request: cdn.example.com/photo.jpg
   - Edge cache miss → fetch origin S3
   - Save edge, return user
   
4. Subsequent access (fast)
   - Other users → same edge
   - Cache hit, 5ms response
```

### Pre-signed URL (S3 best practice)

```python
import boto3

s3 = boto3.client('s3')
url = s3.generate_presigned_url(
    'put_object',
    Params={'Bucket': 'my-bucket', 'Key': 'uploads/photo.jpg'},
    ExpiresIn=3600  # 1 hour
)
# Send URL to FE → FE PUT direct to S3
```

Lợi:
- BE không proxy file → save bandwidth + CPU
- Temporary credential → secure
- Multi-part upload support → resume large file

---

## 4. Traffic routing: "nearest" node

CDN dùng:
- **GeoDNS**: DNS resolve theo IP user → nearest edge
- **Anycast**: cùng IP advertise nhiều location → BGP route closest
- **Real User Monitoring (RUM)**: measure real latency, optimize routing

### Configure

```
# DNS CNAME
cdn.example.com  → CNAME → mybucket.s3.amazonaws.com (origin)
```

Cloudflare: thêm domain → orange cloud → traffic qua CDN auto.

---

## 5. HTTPS optimization

CDN handle TLS termination → backend HTTP (faster).

```
User (HTTPS) → CDN edge (TLS terminate) → Origin (HTTP)
```

### Modern HTTPS optimization

- **HTTP/3 + QUIC**: 0-RTT handshake
- **TLS 1.3**: 1 round trip
- **OCSP stapling**: server include cert revocation status
- **HSTS**: force HTTPS, prevent downgrade attack

---

## 6. Analytics: đọc CDN report

| Metric | Note | Healthy |
|------|------|------|
| **Cache hit rate** | % serve từ cache | >80% |
| **Bandwidth** | Total traffic | Watch cost |
| **Top URLs** | File popular nhất | Optimize hot file |
| **Top origins** | Countries top | Strategic edge placement |
| **5xx error rate** | Origin/edge fail | <0.1% |

---

## 7. Practical: build image acceleration từ 0

```python
# 1. Upload với pre-signed URL
import boto3
s3 = boto3.client('s3')

# FE call backend này
url = s3.generate_presigned_url('put_object',
    Params={'Bucket': 'my-images', 'Key': f'uploads/{uuid}.jpg', 'ContentType': 'image/jpeg'},
    ExpiresIn=3600
)
return {'upload_url': url}

# FE upload trực tiếp S3
```

```yaml
# 2. Lambda process (S3 event trigger)
import boto3
from PIL import Image
import io

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket=bucket, Key=key)
    img = Image.open(obj['Body'])
    
    # Generate thumbnail
    img.thumbnail((200, 200))
    out = io.BytesIO()
    img.save(out, format='JPEG', quality=85)
    out.seek(0)
    
    # Save thumbnail
    thumb_key = key.replace('uploads/', 'thumbnails/')
    s3.put_object(Bucket=bucket, Key=thumb_key, Body=out, ContentType='image/jpeg')
```

```
# 3. CDN config (Cloudflare)
# DNS: cdn.example.com → CNAME → my-images.s3.amazonaws.com
# Cache rule: Cache everything, TTL 7 days
# Image optimization: Polish on (compress + WebP)
```

```html
<!-- 4. Use trong app -->
<img src="https://cdn.example.com/thumbnails/photo.jpg" loading="lazy">
```

### Lifecycle rules
```json
{
  "Rules": [{
    "ID": "DeleteOldTempFiles",
    "Status": "Enabled",
    "Filter": {"Prefix": "temp/"},
    "Expiration": {"Days": 7}
  }, {
    "ID": "ArchiveOldUploads",
    "Status": "Enabled",
    "Filter": {"Prefix": "uploads/"},
    "Transitions": [{"Days": 90, "StorageClass": "GLACIER"}]
  }]
}
```

### Bandwidth cap (tránh cost spike)
```
Cloudflare: dashboard → Bandwidth Alert
AWS: Budget alert + S3 request metric alarm
```

---

## 8. Object Storage + CDN: golden rules

1. **Pre-signed URL upload**: FE upload thẳng S3, không qua backend
2. **CDN cache aggressively**: static asset TTL >7 ngày, dùng hash filename
3. **Lifecycle policy**: temp file auto delete, old file archive
4. **Image optimization**: compress + WebP/AVIF
5. **Lazy load**: `<img loading="lazy">` save bandwidth
6. **Monitor cost**: alert bandwidth + storage threshold
7. **HTTPS everywhere**: TLS 1.3, HTTP/3 nếu CDN support

---

## 9. Code templates

```python
# S3 upload with pre-signed URL
def get_upload_url(filename):
    return s3.generate_presigned_url('put_object',
        Params={'Bucket': BUCKET, 'Key': f'uploads/{uuid4()}/{filename}'},
        ExpiresIn=3600
    )

# CloudFront signed URL (paid content)
def get_signed_url(key):
    return cloudfront_signer.generate_presigned_url(
        f'https://cdn.example.com/{key}',
        date_less_than=datetime.now() + timedelta(hours=1)
    )

# Cache invalidation (CDN purge)
boto3.client('cloudfront').create_invalidation(
    DistributionId='ABCDEFG',
    InvalidationBatch={
        'Paths': {'Quantity': 1, 'Items': ['/images/*']},
        'CallerReference': str(uuid4())
    }
)
```

---

## 10. Glossary

| Term | Plain |
|------|------|
| **Object Storage** | Storage file qua HTTP, scale unlimited |
| **Bucket** | Container chứa object trong S3 |
| **Key** | Unique identifier cho object |
| **Pre-signed URL** | Temp URL cấp permission action 1 lần |
| **CDN** | Network global cache file gần user |
| **Edge / POP** | Cache server tại region |
| **Origin** | Source server (S3, web server) |
| **Cache hit rate** | % request serve từ cache, không từ origin |
| **TTL** | Cache lifetime |
| **Purge / Invalidation** | Force clear cache CDN |

::: tip 2026 cho VN dev
- **Modern stack 2026**:
  - **Cloudflare R2 + Workers**: zero egress + edge compute
  - **AWS S3 + CloudFront**: standard enterprise
  - **BunnyCDN**: cost-effective alternative
- **VN context**:
  - VN startup: Cloudflare R2 + Cloudflare CDN = cost killer
  - VN enterprise: AWS S3 + CloudFront
  - VN local: Viettel Object Storage, FPT Cloud
- **AI scenario**: store image input + LLM output trong R2, CDN serve để giảm cost + latency
- **Image optimization**: Cloudflare Polish, Vercel Image Optimization auto WebP + resize
:::
