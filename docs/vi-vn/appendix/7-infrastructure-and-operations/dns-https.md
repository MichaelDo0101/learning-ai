# Domain, DNS, HTTPS

::: tip Mở đầu
**Khi gõ `google.com` Enter, sau đó xảy ra gì?** Hành động đơn giản đó chứa cả chuỗi cộng tác tinh vi: domain resolution → DNS query → TLS handshake encryption. Hiểu = must cho dev — quyết web access được không, data bị steal không.
:::

**Bạn sẽ học**:
- **DNS principles**: domain → IP
- **Record types**: A, CNAME, MX, TXT
- **HTTPS mechanism**: TLS handshake
- **Certificate**: chain of trust
- **Security**: sao HTTPS = baseline Web hiện đại

| Chương | Nội dung |
|-----|------|
| **1** | DNS resolution |
| **2** | DNS records |
| **3** | HTTPS + TLS |
| **4** | Cert trust chain |
| **5** | HTTP vs HTTPS |

---

## 0. Toàn cảnh: từ domain → secure connection

Internet communication base IP (vd 142.250.80.46), nhưng người không nhớ số. → **DNS** = "phone book" Internet, dịch domain → IP.

Nhưng tìm server thôi chưa đủ. Communication plaintext = ai cũng eavesdrop, tamper được. **HTTPS** = HTTP + TLS encryption, đảm bảo confidentiality + integrity.

::: tip Visit web hoàn chỉnh
1. **Domain resolution**: browser hỏi DNS "google.com IP gì?", DNS trả "142.250.80.46"
2. **TCP connect**: browser + server TCP 3-way handshake
3. **TLS handshake**: 2 bên negotiate encryption + verify cert + exchange key
4. **Encrypted comm**: mọi HTTP data qua encrypted channel
:::

---

## 1. DNS: "phone book" Internet

DNS (Domain Name System) như tra phonebook: biết name (domain), cần phone (IP). Nhưng "phonebook" Internet là **layered distributed system**.

<DnsResolutionDemo />

::: tip 4 step DNS
1. **Browser cache**: query local cache, đã visit → dùng cached IP
2. **Recursive resolver**: cache miss → request đến ISP recursive resolver (8.8.8.8)
3. **Tier query**: recursive resolver hỏi tuần tự Root → TLD (.com) → Authoritative (google.com)
4. **Return**: authoritative trả IP cuối, recursive cache + return browser
:::

| Tier | Server | Job | Quantity |
|------|-------|------|------|
| Root | Root Server | Biết TLD address | 13 global groups |
| TLD | TLD Server | Manage .com, .vn, .org | Mỗi suffix 1 group |
| Authoritative | Authoritative | Lưu DNS record domain cụ thể | Mỗi domain ≥2 |
| Recursive | Resolver | Thay user complete query | ISP hoặc public DNS |

---

## 2. DNS records

DNS không chỉ dịch domain → IP. Qua record type khác, control mail routing, redirect, service discovery.

<DnsRecordTypeDemo />

| Record | Use | Example |
|---------|------|------|
| A | Domain → IPv4 | `example.com → 93.184.216.34` |
| AAAA | Domain → IPv6 | `example.com → 2606:2800:220:1:...` |
| CNAME | Domain → domain khác (alias) | `www.example.com → example.com` |
| MX | Mail server | `example.com → mail.example.com` |
| TXT | Text info | SPF verify, domain ownership |
| NS | Authoritative server | `example.com → ns1.example.com` |

::: tip Real scenarios
- **Deploy site**: add A record → server IP, hoặc CNAME → CDN
- **Setup email**: MX → mail server, TXT cho SPF/DKIM chống spam
- **Verify domain ownership**: cloud vendor yêu cầu add TXT cụ thể
- **Load balance**: cùng domain multi A record, DNS round-robin
:::

---

## 3. HTTPS + TLS: "bulletproof vest" cho data

HTTP plaintext = như postcard, postman (middleman) đọc nội dung tuỳ ý. HTTPS = HTTP + TLS (Transport Layer Security) layer encryption = nhét postcard vào sealed envelope.

TLS handshake = step key build secure connection: verify identity + negotiate key trước khi transmit data.

<HttpsHandshakeDemo />

::: tip TLS 1.3 handshake
1. **Client Hello**: client send supported cipher list + random
2. **Server Hello**: server choose cipher, return cert + random
3. **Cert verify**: client verify server cert trust (CA signature, expiry, domain match)
4. **Key exchange**: 2 bên qua ECDHE negotiate shared key (key không transmit qua network)
5. **Encrypted comm**: data sau dùng symmetric key encrypt
:::

| Feature | TLS 1.2 | TLS 1.3 |
|------|---------|---------|
| Handshake RTT | 2-RTT | 1-RTT (first) / 0-RTT (resume) |
| Key exchange | RSA hoặc ECDHE | Chỉ ECDHE (forward secrecy) |
| Cipher | Hỗ trợ nhiều legacy | Chỉ secure cipher |
| Performance | Chậm hơn | Nhanh hơn |

---

## 4. Certificate trust chain: sao tin web này?

TLS handshake step quan trọng nhất = "cert verify". Browser judge cert thật vs fake thế nào? Trả lời: **certificate trust chain** — system endorsement layer by layer.

<CertificateChainDemo />

::: tip 3-tier cert
1. **Root Certificate (Root CA)**: signed bởi trusted CA, pre-installed OS + browser. Đây là "anchor" của trust.
2. **Intermediate CA**: signed bởi Root CA, dùng sign end cert. Root không direct sign web cert vì security isolation.
3. **Leaf Certificate**: cert web thực dùng, signed bởi intermediate CA, chứa domain + public key + expiry.
:::

| Cert type | Verify level | Issue speed | Use |
|---------|---------|---------|---------|
| DV (Domain Validation) | Chỉ verify domain ownership | Phút | Personal, blog |
| OV (Organization) | Verify org identity | Vài ngày | Enterprise site |
| EV (Extended) | Strict org verify | Vài tuần | Banking, finance |
| Wildcard | Cover mọi subdomain | Theo type | Multi-subdomain |

---

## 5. HTTP vs HTTPS: sao encryption = baseline?

2024, >95% web traffic global qua HTTPS. Chrome đánh dấu HTTP site "Not Secure", search engine giảm rank HTTP. HTTPS không còn "optional", mà **baseline** modern Web.

<DnsHttpsComparisonDemo />

| Dim | HTTP | HTTPS |
|------|------|-------|
| Data transmission | Plaintext, eavesdrop được | Encrypted, không eavesdrop |
| Identity verify | Không | Có (cert verify server) |
| Data integrity | Không (tamper được) | Có (tamper detected) |
| Port | 80 | 443 |
| SEO impact | Giảm rank | Tăng rank |
| Browser display | "Not Secure" warning | Lock icon |

::: tip Free HTTPS cert
**Let's Encrypt** = CA miễn phí + tự động, mọi site bật HTTPS không cost. Combo Certbot = 1-click apply + auto renew. Đa số cloud platform + CDN cung cấp SSL free.
:::

---

## Tổng kết

Domain + DNS + HTTPS = 3 pillar Internet infrastructure. DNS giúp dùng tên thay vì số, HTTPS đảm bảo communication safe + reliable.

1. **DNS layered**: Root → TLD → Authoritative, tier query, cache speedup
2. **Record types**: A → IP, CNAME → alias, MX → mail, TXT → verify
3. **TLS handshake**: cert verify + key negotiate, TLS 1.3 chỉ 1-RTT
4. **Cert chain**: Root CA → Intermediate CA → Leaf cert
5. **HTTPS baseline**: free cert (Let's Encrypt) cho encryption zero-barrier

::: tip 2026 cho VN dev
- **DNS providers**:
  - **Cloudflare**: free, fast nhất, DDoS protection
  - **AWS Route 53**: deep AWS integration
  - **VN registrar**: Mat Bao, P.A. Việt Nam, Nhân Hoà
- **TLS cert**:
  - **Let's Encrypt**: free, auto renew, default cho 99%
  - **ZeroSSL**: alternative Let's Encrypt
  - **Commercial CA**: DigiCert, Sectigo cho EV banking
- **VN context**:
  - VN domain `.vn` qua VNNIC, mất 2-3 ngày verify
  - HTTPS bắt buộc theo VN regulation cho e-commerce + banking
- **Modern security**:
  - **HTTP/3 + QUIC**: faster TLS handshake
  - **HSTS**: force HTTPS, prevent downgrade attack
  - **DNS-over-HTTPS (DoH)**: encrypt DNS query, privacy
  - **Certificate Transparency**: public log mọi cert, detect rogue
:::

## Tài liệu

- [How DNS Works](https://howdns.works/)
- [Let's Encrypt docs](https://letsencrypt.org/docs/)
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [TLS 1.3 RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
