# File Storage + Object Storage

::: tip Mở đầu
**User upload avatar, bạn lưu vào folder `/uploads` server — rồi server đầy disk, hoặc thêm server thứ 2, user thấy avatar lúc có lúc không.** File storage tưởng đơn giản, nhưng trong distributed env là vấn đề architecture nghiêm túc. **Object storage** = giải pháp chuẩn cho Internet era.
:::

**Bạn sẽ học**:
- **Storage types**: block, file, object — khác biệt + scenario
- **Object storage core**: Bucket, Object, Key, Pre-signed URL
- **Upload design**: client direct vs server transit
- **CDN**: tăng tốc static resource global
- **Best practices**: naming, permission, lifecycle

---

## 0. Toàn cảnh: sao không lưu file ở server local?

Bắt đầu project, lưu file user upload vào folder local là instinctive. Nhưng:
- **Disk có hạn**: server disk sẽ đầy, scale phiền
- **Multi-server không share**: load balance → request có thể đến server khác, file không thấy
- **No backup**: server chết → file mất
- **No CDN**: user toàn cầu access server đơn, chậm

::: tip Giá trị object storage
Object storage (AWS S3, Cloudflare R2, MinIO) giải hết: **capacity vô hạn, global access, auto backup, CDN-friendly native**. Là de-facto standard.
:::

---

## 1. Storage types: block, file, object

3 cách storage chính:

<FileStorageTypeDemo />

| Dim | Block | File | Object |
|------|--------|---------|---------|
| Data unit | Block size cố định | File + folder | Object (Key-Value) |
| Protocol | iSCSI/FC | NFS/SMB | HTTP REST API |
| Perf | Cao nhất (ms) | Trung | Thấp hơn (đủ) |
| Scale | Có hạn | Trung | Gần vô hạn |
| Cost | Cao nhất | Trung | Thấp nhất |
| Use | DB | Shared file | Image/video/backup |

::: tip Memory đơn giản
- **Block** = ổ cứng — cho DB
- **File** = network shared folder — share config multi-server
- **Object** = cloud storage — cho file user upload (image, video)
:::

---

## 2. Object storage core

Data model đơn giản: **Bucket** = container, **Object** = file, mỗi object có **Key** unique.

```
my-app-bucket/                    ← Bucket
├── avatars/user-123.jpg          ← Object Key
├── avatars/user-456.png          ← Object Key
├── reports/2024/q1-report.pdf    ← Object Key
└── uploads/temp/file.zip         ← Object Key
```

| Concept | Note | Vd |
|------|------|------|
| Bucket | Container, global unique name | `my-app-prod` |
| Object | File body + metadata | 1 image, 1 PDF |
| Key | Unique identifier | `avatars/user-123.jpg` |
| Metadata | Info kèm | Content-Type, custom tag |
| ACL | Access control | public-read, private |
| Pre-signed URL | Temp authorized URL | 15 min upload/download |

::: tip Object storage không có "folder" thật
`avatars/user-123.jpg` — `avatars/` không phải folder, chỉ là prefix của Key. Object storage là **flat structure**, mọi object cùng level. Console "folder" chỉ là visual group by prefix.
:::

---

## 3. Upload: ai upload?

2 cách: server transit + client direct upload. Đa số scenario, **client direct** tốt hơn.

<FileUploadFlowDemo />

::: tip Client direct lợi
1. **Tiết kiệm bandwidth server**: file không qua server, thẳng OSS
2. **Tránh timeout**: file lớn không trigger Nginx/gateway timeout
3. **Giảm load server**: server chỉ sign credential, không xử file stream
4. **Resume upload**: OSS hỗ trợ multipart upload native

Step: FE request BE lấy Pre-signed URL → FE upload URL đó thẳng OSS → OSS callback notify BE.
:::

---

## 4. CDN: tăng tốc global

User toàn cầu → download từ origin chậm. **CDN** deploy edge node toàn cầu, cache file gần user nhất → giảm latency mạnh.

<CDNAccelerationDemo />

| Concept | Note |
|---------|------|
| Edge node | Cache server toàn cầu |
| Origin pull | Edge không có cache → request origin |
| Cache hit rate | Tỷ lệ request được edge serve, càng cao càng tốt |
| TTL | Cache validity, hết phải re-pull |
| Cache purge | Chủ động clear edge cache, file mới có hiệu lực |

::: tip CDN best practice
- **Filename hash**: `logo.a3f2b1.png` thay `logo.png`. Update file không cần purge cache.
- **TTL hợp lý**: static (JS/CSS/image) TTL dài (1 năm), HTML TTL ngắn (5 phút)
- **Gzip/Brotli**: text resource giảm 60-80% size
:::

---

## 5. Best practice

| Practice | Note | Vd |
|------|------|------|
| Key naming | Prefix có nghĩa | `{type}/{date}/{uuid}.{ext}` |
| Avoid hot key | Đừng đầu bằng số tăng | UUID hoặc hash prefix |
| Min permission | Bucket default private | Chỉ public khi cần |
| Lifecycle | Auto clean expired | Temp file 7 ngày auto xoá |
| CORS | Direct upload cần config | Allow domain bạn PUT/POST |
| Server-side encryption | File sensitive bật SSE | SSE-S3 hoặc SSE-KMS |

---

## Tổng kết

1. **3 type**: block (DB), file (shared), object (user file)
2. **Object storage model**: Bucket + Key + Object, flat, HTTP API
3. **Client direct upload**: Pre-signed URL
4. **CDN**: edge cache + hash filename → fast global
5. **Security**: min permission, lifecycle, SSE

::: tip 2026 cho VN dev
- **Cloud option**:
  - **AWS S3**: chuẩn, đắt nhất, ecosystem mạnh
  - **Cloudflare R2**: **zero egress fee** (rẻ nhất nếu serve traffic nhiều)
  - **Backblaze B2**: rẻ + S3-compatible
  - **DigitalOcean Spaces**: đơn giản, free CDN
  - **VN cloud**: Viettel Cloud Storage, FPT Object Storage, VNG Cloud
- **Self-host**: MinIO (S3-compatible, open-source)
- **Edge upload**: Vercel Blob, Cloudflare R2 + Workers
- **VN context**: image-heavy site (e-commerce) → CDN VN-friendly (BunnyCDN, Cloudflare APAC)
- **AI use case**: lưu image input cho VLM, audio cho ASR
:::

## Tài liệu

- [AWS S3 Docs](https://docs.aws.amazon.com/s3/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [MinIO Docs](https://min.io/docs/minio/linux/index.html)
- [Pre-signed URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)
