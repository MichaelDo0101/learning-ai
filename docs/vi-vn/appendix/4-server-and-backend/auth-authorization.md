# Authentication + Authorization

::: tip Mở đầu
**"Door access" của hệ thống**: ai vào được (auth) + làm gì được (authz). Chương này từ password basic đến OAuth/SSO + best practice security.
:::

---

## 1. Auth vs Authz

| Concept | Hỏi | Vd |
|---------|------|----|
| **Authentication** | "Bạn là ai?" | Login (username + password) |
| **Authorization** | "Bạn làm được gì?" | Admin có thể delete user, regular không |

```
[Login form] → Auth → Check identity OK → Issue token
[Request API] → Authz → Check token + permission → Allow/Deny
```

---

## 2. Auth evolution

### 2.1 Session (legacy, server-stateful)

```
1. User login: POST /login với username + password
2. Server verify, gen session ID, lưu trong memory/Redis
3. Server trả Cookie: session_id=abc123
4. Browser send Cookie với mỗi request
5. Server lookup session_id → get user info
```

```python
# Backend (Flask)
from flask import session

@app.post("/login")
def login():
    user = verify(request.form["username"], request.form["password"])
    if user:
        session["user_id"] = user.id
        return "OK"

@app.get("/profile")
def profile():
    user = User.get(session["user_id"])
    return user.to_dict()
```

**Lợi**: revoke dễ (xoá session ở server).
**Hại**: stateful (cần lưu session) → khó scale horizontal.

### 2.2 Token (JWT, modern, stateless)

```
1. Login: POST /login
2. Server verify, gen JWT (chứa user_id + signature)
3. Trả token cho client
4. Client lưu (localStorage / Cookie)
5. Mỗi request: Header Authorization: Bearer <token>
6. Server verify signature (no DB lookup) → trust token
```

**JWT structure**:
```
header.payload.signature
eyJhbGc... . eyJzdWI... . SflKxw...
```

- **Header**: algorithm (HS256, RS256)
- **Payload**: claims (user_id, exp, role)
- **Signature**: verify integrity

```python
# Issue
import jwt
token = jwt.encode({"user_id": 1, "exp": int(time.time()) + 3600}, SECRET, algorithm="HS256")

# Verify
payload = jwt.decode(token, SECRET, algorithms=["HS256"])
user_id = payload["user_id"]
```

**Lợi**: stateless, scale dễ, microservice ưa thích.
**Hại**: revoke khó (token valid đến expire), payload public (đừng để sensitive).

### 2.3 Refresh token pattern

- **Access token**: short-lived (15 min)
- **Refresh token**: long-lived (7 ngày), lưu HTTP-only Cookie
- Access token expire → dùng refresh token để get token mới
- → Balance security + UX

---

## 3. OAuth 2.0: 3rd party login

"Login với Google/GitHub" — không cho app biết password Google của user.

```
1. User click "Login Google"
2. App redirect → Google authorize
3. User approve permissions
4. Google redirect lại app với authorization code
5. App backend exchange code → access token + user info
6. App tạo session cho user
```

**Vai trò**:
- **Resource Owner**: user
- **Client**: app yêu cầu access
- **Authorization Server**: Google (issue token)
- **Resource Server**: Google API (serve user data)

**Flow** chính:
- **Authorization code** (web app, mobile): secure nhất
- **Implicit** (SPA, deprecated): replaced bởi PKCE
- **Client credentials** (machine-to-machine): no user
- **Device code** (TV, CLI): không có browser

---

## 4. Implement full auth system

```python
# auth_service.py
import jwt
from passlib.hash import bcrypt

SECRET = os.environ["JWT_SECRET"]

def register(email, password):
    hashed = bcrypt.hash(password)
    user = User.create(email=email, password=hashed)
    return user

def login(email, password):
    user = User.get(email=email)
    if user and bcrypt.verify(password, user.password):
        token = jwt.encode(
            {"user_id": user.id, "exp": int(time.time()) + 3600},
            SECRET, algorithm="HS256"
        )
        return token
    raise Unauthorized()

def require_auth(handler):
    """Decorator authorize API"""
    def wrapper(request):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return {"error": "No token"}, 401
        try:
            payload = jwt.decode(token, SECRET, algorithms=["HS256"])
            request.user = User.get(payload["user_id"])
        except jwt.InvalidTokenError:
            return {"error": "Invalid token"}, 401
        return handler(request)
    return wrapper

@require_auth
@app.get("/profile")
def profile(request):
    return request.user.to_dict()
```

---

## 5. Security best practices

### Password hashing

```python
# ❌ Plaintext (NEVER!)
user.password = "secret123"

# ❌ MD5/SHA1 (rainbow table easily cracked)
user.password = hashlib.md5(b"secret123").hexdigest()

# ✅ bcrypt / scrypt / Argon2 (slow + salt)
from passlib.hash import argon2
user.password = argon2.hash("secret123")
```

### Other key practices

| Practice | Note |
|----------|------|
| **HTTPS only** | Token không gửi qua HTTP |
| **HTTP-only Cookie** | JS không read được → XSS protection |
| **SameSite Cookie** | CSRF protection |
| **CSRF token** | Cho form POST |
| **Rate limit login** | Block brute-force (5 attempts → lock 15 min) |
| **2FA** | TOTP (Google Authenticator), SMS, email |
| **Audit log** | Log mọi login + sensitive action |
| **Token short-lived** | Access token 15 min, refresh 7 ngày |
| **Refresh token rotation** | Mỗi refresh → issue refresh token mới |
| **Secret rotation** | JWT secret rotate định kỳ |

---

## 6. Authorization patterns

### RBAC (Role-Based)
```
User → Role → Permission
admin → role:admin → [user:delete, post:edit, ...]
editor → role:editor → [post:edit, post:publish]
```

### ABAC (Attribute-Based)
```
Policy: user.department == resource.department AND user.role IN ["editor", "admin"]
```

### ReBAC (Relationship-Based)
```
user owns post → can edit
user is member of org → can read org data
```

Tool: Open Policy Agent (OPA), Casbin, Permify.

---

## Tổng kết

1. **Auth = identity, Authz = permission**
2. **JWT modern stateless** (vs Session stateful legacy)
3. **OAuth 2.0** = 3rd party login standard
4. **Hash password** với bcrypt/Argon2, never plaintext
5. **HTTPS + HTTP-only Cookie + rate limit** = baseline security
6. **2FA** cho admin / sensitive
7. **RBAC** cho đa số case, ABAC/ReBAC cho phức tạp

::: tip 2026 cho VN dev
- **Passkey (FIDO2)**: thay password, dùng public-key crypto + device biometric — secure + smooth UX
- **OIDC** (OpenID Connect): built on OAuth 2.0, identity layer
- **Auth services**: Clerk, Auth0, Supabase Auth, AWS Cognito — đừng tự build auth từ đầu
- **VN context**: VNPay, MoMo, ZaloPay dùng OAuth 2.0; banking dùng strong 2FA + biometric
- **AI agent auth**: API key, OAuth, MCP authentication
- **Zero Trust**: never trust, always verify (Cloudflare Zero Trust, Tailscale)
:::
