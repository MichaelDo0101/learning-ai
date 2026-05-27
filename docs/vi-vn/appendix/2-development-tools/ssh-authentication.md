# SSH và Key Authentication

> 💡 **Hướng dẫn**: mỗi lần `git push` lại nhập password? SSH server cứ báo "Permission denied"? Chương này 5 phút giúp bạn hiểu nguyên lý SSH key authentication và cách 1-click no-password login GitHub + server.

---

## 0. Chắc chắn bạn từng gặp

- `git push` bật popup password liên tục, phiền chết
- SSH connect server fail, không hiểu `id_rsa` với `id_ed25519` khác gì
- Nghe nói "public key" + "private key" nhưng không phân biệt được cái nào cho người, cái nào giữ

**Mâu thuẫn core**: password vừa không an toàn vừa phiền. SSH key sinh ra để giải cả 2.

---

## 1. Password vs Key: sao key tốt hơn?

👇 Click thử: so sánh password login và key login

<SSHAuthDemo />

::: tip 💡 1 câu tóm
Password login = mỗi lần gửi password để bên kia verify (có thể bị chặn);
Key login = chứng minh "tôi có chìa khoá" mà **không cần đưa chìa cho ai xem** (private key không bao giờ transmit).
:::

---

## 2. Asymmetric encryption: public key + private key

SSH key dựa trên **asymmetric encryption**, sinh 2 chìa cùng lúc:

| | Private Key | Public Key |
|---|---|---|
| **Lưu ở** | Máy bạn `~/.ssh/id_ed25519` | Server / GitHub |
| **Cho người khác?** | ❌ Không bao giờ | ✅ Free đưa |
| **Chức năng** | Sign (chứng minh identity) | Verify sign |
| **Ẩn dụ** | Chìa khoá | Ổ khoá |

### Loại key thường gặp

| Loại | Command | Khuyến nghị | Note |
|---|---|---|---|
| **Ed25519** | `ssh-keygen -t ed25519` | ⭐⭐⭐ | Mới nhất, nhanh nhất, an toàn nhất |
| **RSA** | `ssh-keygen -t rsa -b 4096` | ⭐⭐ | Compatibility tốt, chậm hơn |
| **ECDSA** | `ssh-keygen -t ecdsa` | ⭐ | Thường không khuyến nghị |

---

## 3. Thực chiến: gen + config SSH key

### 3.1 Gen key pair

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

Sẽ hỏi:
- **File path**: Enter dùng default `~/.ssh/id_ed25519`
- **Passphrase**: có thể set thêm 1 lớp bảo vệ (cũng có thể để trống)

### 3.2 Add public key vào GitHub

```bash
# 1. Copy public key content
cat ~/.ssh/id_ed25519.pub | pbcopy  # macOS
cat ~/.ssh/id_ed25519.pub | xclip   # Linux

# 2. Mở GitHub → Settings → SSH and GPG keys → New SSH key
# 3. Paste public key, save

# 4. Test connection
ssh -T git@github.com
# Success sẽ thấy: Hi username! You've been authenticated...
```

### 3.3 Add public key vào server

```bash
# Cách 1: ssh-copy-id (khuyến nghị)
ssh-copy-id user@your-server

# Cách 2: manual copy
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

---

## 4. SSH Config: tạm biệt command dài

Trong `~/.ssh/config` config alias, 1 lần config dùng cả đời:

```
Host dev
  HostName 192.168.1.100
  User deploy
  IdentityFile ~/.ssh/id_ed25519

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```

Hiệu quả sau khi config:

| Trước | Sau |
|---|---|
| `ssh -i ~/.ssh/id_ed25519 deploy@192.168.1.100` | `ssh dev` |
| Phải nhớ IP + username | Nhớ alias là đủ |

---

## 5. Debug thường gặp

| Vấn đề | Nguyên nhân | Giải pháp |
|---|---|---|
| `Permission denied (publickey)` | Public key chưa add vào server | `ssh-copy-id user@server` |
| `WARNING: UNPROTECTED PRIVATE KEY FILE` | File private key permission quá rộng | `chmod 600 ~/.ssh/id_ed25519` |
| `Could not resolve hostname` | SSH Config sai format | Check `~/.ssh/config` |
| GitHub vẫn hỏi password | Dùng HTTPS thay vì SSH | Đổi `git@github.com:user/repo.git` |

---

## 6. Tổng kết

::: tip 📚 Core
1. **Key > Password**: private key không bao giờ transmit, an toàn hơn nhiều
2. **Khuyến nghị Ed25519**: algorithm hiện đại nhất, nhanh, secure
3. **Public key đưa thoải mái, private key tuyệt đối không leak**: rule sắt
4. **SSH Config**: config 1 lần, sau đó `ssh alias` 1-click
5. **GitHub/GitLab**: add public key xong, `git push/pull` không cần nhập password
:::

::: tip 2026 cho VN dev
- **1Password SSH agent**: lưu private key trong 1Password, tự inject khi ssh
- **Tailscale SSH**: SSH qua mesh VPN, không lo về key management
- **GitHub Codespaces**: SSH auto-setup khi dùng cloud dev env
- **YubiKey + FIDO2**: key lưu trên hardware token, không leak được
- **AI agent CLI** (Claude Code, Cursor): cần SSH key để pull/push repo
:::

**Tiếp theo**:
- [Port và localhost](./ports-localhost)
- [Environment Variable và PATH](./environment-path)
