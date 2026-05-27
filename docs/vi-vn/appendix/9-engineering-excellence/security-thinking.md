# Security Thinking + Attack/Defense Basics

::: tip Mở đầu
**Website bạn có an toàn?** Nhiều dev nghĩ "security là việc của team security", đến khi project bị tấn công, user data leak. Security không phải optional, mà skill cơ bản của mỗi dev.

Chương này: build security thinking, hiểu Web threats phổ biến nhất + defense.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Security mindset |
| **2** | Common Web attacks (XSS, SQL injection, CSRF) |
| **3** | Defense strategies |
| **4** | Pre-launch checklist |

---

## 0. Toàn cảnh: sao dev cần biết security?

Tưởng xây nhà, function đủ, decor đẹp, nhưng quên lắp khoá. Security vulnerability = "khoá quên lắp" trong code.

::: tip Core principles
- **Least privilege**: chỉ cấp permission cần
- **Defense in depth**: không 1 defense, multi-layer
- **Never trust input**: data external có thể malicious
- **Secure default**: config default phải secure, không tiện
:::

---

## 1. Common Web attacks

<WebSecurityDemo />

### 1.1 XSS (Cross-Site Scripting)

Attacker inject malicious script vào page, user khác visit → script execute trong browser họ.

```javascript
// Dangerous: insert user input vào HTML directly
element.innerHTML = userInput
// Nếu userInput = <script>maliciousCode</script>, sẽ execute

// Safe: textContent hoặc escape
element.textContent = userInput
// Hoặc dùng framework auto-escape (Vue {{ }}, React JSX)
```

**Defense**:
- Escape HTML special chars (`<`, `>`, `&`, `"`, `'`) when output
- Dùng modern framework auto-escape
- Set `Content-Security-Policy` HTTP header

### 1.2 SQL Injection

Attacker dùng input đặc biệt để alter SQL query logic.

```javascript
// Dangerous: string concat SQL
const query = `SELECT * FROM users WHERE name = '${userInput}'`
// Nếu userInput = ' OR '1'='1, sẽ return mọi user

// Safe: parameterized query
const query = 'SELECT * FROM users WHERE name = ?'
db.execute(query, [userInput])
```

**Defense**:
- Always dùng parameterized query / prepared statement
- Dùng ORM (Prisma, Sequelize)
- Limit DB account permission

### 1.3 CSRF (Cross-Site Request Forgery)

Attacker lure logged-in user visit malicious page, dùng login state để gửi request.

**Defense**:
- CSRF Token
- Check `Referer` / `Origin` header
- Critical op dùng POST, không GET
- Cookie set `SameSite` attribute

---

## 2. Defense strategies

### 2.1 Input validation

```javascript
// Whitelist: chỉ allow expected format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Length limit
function isValidUsername(name) {
  return name.length >= 2 && name.length <= 50
}
```

### 2.2 Sensitive data protection

| Data | Protection |
|---------|---------|
| Password | bcrypt/argon2 hash, never plaintext |
| API key | Env var, không commit code |
| User data | HTTPS transmit, encrypt storage |
| Session token | HttpOnly + Secure + SameSite Cookie |

### 2.3 HTTP security headers

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

---

## 3. Security checklist

<SecurityChecklistDemo />

### 3.1 Dev stage

- [ ] Mọi user input validated + escaped
- [ ] Parameterized query, no SQL concat
- [ ] Password bcrypt hash
- [ ] Sensitive config qua env var
- [ ] `.env` trong `.gitignore`

### 3.2 Deploy stage

- [ ] Enable HTTPS
- [ ] Config security HTTP headers
- [ ] Disable debug mode + detail error
- [ ] DB account min permission
- [ ] Regular update dep (`npm audit`)

---

## 4. AI assist security

LLM = "security consultant", audit code, gen secure config.

### 4.1 Code security audit

> **Prompt**:
> ```
> Security audit code sau, check:
> - XSS (unescaped user input)
> - SQL injection (string concat query)
> - CSRF risk (no token verify)
> - Sensitive data leak (hardcoded key, plaintext password)
> Mỗi issue: risk level + location + fix.
>
> [paste code]
> ```

### 4.2 Generate secure config

> **Prompt**:
> ```
> Project Express.js + PostgreSQL, chuẩn bị deploy.
> Gen security checklist + code snippet:
> - HTTP security headers
> - CORS config
> - DB connection secure setting
> - Env var management
> Cho code snippet usable.
> ```

### 4.3 Explain vulnerability

> **Prompt**:
> ```
> Concrete example CSRF attack full flow:
> 1. Attacker craft malicious page
> 2. Sao browser auto carry Cookie
> 3. Server dùng CSRF Token defend thế nào
> Code demonstrate attack + defense full process.
> ```

::: tip AI caveat
AI security audit không thay được pro security test. Treat as first-pass screening, critical system vẫn cần pro security team.
:::

---

## 5. Tổng kết

1. **Security thinking**: never trust input, least privilege, defense in depth
2. **Common attacks**: XSS, SQL injection, CSRF
3. **Defense**: input validation, output encoding, parameterized query, security headers
4. **Habit**: pre-launch checklist, regular dep audit

::: tip Insight cuối
Security không phải one-time job, mà habit xuyên dev. Như lái xe thắt seatbelt — không phải dự đoán accident, mà basic safety awareness. **Mỗi dòng code, hỏi: nếu input này malicious, xảy ra gì?**
:::

::: tip 2026 cho VN dev
- **OWASP Top 10 2025**:
  1. Broken Access Control
  2. Cryptographic Failures
  3. Injection
  4. Insecure Design
  5. Security Misconfiguration
  6. Vulnerable Components
  7. Identity Failures
  8. Software/Data Integrity
  9. Logging Failures
  10. SSRF
- **Tools**:
  - **Snyk, Trivy, Dependabot**: vulnerability scan
  - **Semgrep, CodeQL**: SAST
  - **OWASP ZAP, Burp Suite**: penetration test
  - **Cloudflare WAF, AWS WAF**: managed firewall
- **VN context**:
  - VN banking + e-commerce có regulation security strict (SBV, Decree)
  - Hire security expert hoặc managed service
- **AI security**:
  - **Prompt injection**: new attack vector cho LLM app
  - **Data leak qua LLM**: cẩn thận khi paste sensitive data vào ChatGPT
  - **Tools**: Lakera Guard, Llama Guard cho LLM security
:::

## Tài liệu

- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackerOne Hacktivity](https://hackerone.com/hacktivity)
- [Have I Been Pwned](https://haveibeenpwned.com/)
