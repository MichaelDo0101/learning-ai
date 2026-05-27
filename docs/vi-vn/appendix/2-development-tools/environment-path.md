# Environment Variables và PATH

> 💡 **Hướng dẫn**: mỗi lần bạn gõ `git` hoặc `python` trong terminal, hệ thống phải đi tìm program đó ở đâu. Mỗi lần code gọi LLM API, program phải biết dùng key nào. Cả 2 chuyện này dùng cùng 1 cơ chế — **environment variable**.

---

## 0. Mỗi program đều mang theo 1 bộ config

Mỗi process chạy đều giữ 1 bộ "key=value" config, gọi là **environment variable**. Program có thể đọc bất cứ lúc nào để hiểu môi trường chạy hiện tại.

Click vào bất kỳ variable nào dưới để "xem" value của nó trong terminal:

<EnvVarOverviewDemo />

---

## 1. PATH: Shell tìm command bạn gõ thế nào

`PATH` là 1 env variable đặc biệt, chứa chuỗi directory path (cách nhau dấu `:`). Khi bạn gõ `git`, Shell theo thứ tự chuỗi này, vào từng folder tìm file executable tên `git` — tìm thấy cái đầu tiên là dừng.

```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Chọn 1 command, xem Shell search từng folder:

<PathSearchDemo />

**3 quy luật quan trọng**:
- Folder càng đầu PATH, priority càng cao
- Tìm thấy đầu tiên là dừng, không tiếp tục
- Hết folder vẫn không thấy → `command not found`

---

## 2. Sao cài tool xong phải restart terminal?

Khi install nvm, Homebrew, conda, script install tự động append vào `~/.zshrc` 1 dòng đưa folder vào PATH:

```bash
# Script install tự ghi (ví dụ)
export PATH="/usr/local/opt/python@3.12/bin:$PATH"
```

Dòng này chỉ chạy lúc **Shell mới start**. Terminal đã mở không bị ảnh hưởng, nên:

```bash
# Không cần restart, hiệu lực ngay
source ~/.zshrc
```

**Tình huống thường gặp với AI dev tools**:

```bash
# Ollama / pipx cài xong báo command not found
which ollama          # check vị trí cài thật

# Tool CLI cài bằng pip (đưa vào PATH)
# macOS: ~/Library/Python/3.x/bin
# Linux: ~/.local/bin
export PATH="$PATH:$HOME/.local/bin"

# Khuyến nghị dùng pipx cho command-line tool, auto-quản lý PATH
pipx install aider-chat
```

---

## 3. Scope của variable: ai thấy được variable này?

Env variable không broadcast tới mọi program — mỗi process giữ **bản copy riêng**, kế thừa từ parent process. Sửa bản của mình không ảnh hưởng parent.

Hình dưới có 3 cấp. Trong "user-level" `export` 1 variable mới, xem nó có hiện ở "process-level" không:

<EnvScopeDemo />

---

## 4. export: quyết định subprocess đọc được variable không

Set variable mà không có `export` ≠ có `export`:

<EnvExportDemo />

Để variable cross-session vĩnh viễn, ghi `export` vào file config:

```bash
# macOS (zsh)
echo 'export MY_VAR="value"' >> ~/.zshrc
source ~/.zshrc       # Hiệu lực ngay, không cần mở lại terminal

# Linux (bash)
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc
```

---

## 5. API key: TUYỆT ĐỐI không viết vào code

Khi call OpenAI, Anthropic, DeepSeek API, key chính là "CMND + thẻ tín dụng" của bạn. Leak → người khác xài hết quota, hoá đơn bạn trả.

Sai lầm phổ biến nhất là viết key thẳng vào code:

<ApiKeyDangerDemo />

---

## 6. Local dev: dùng file `.env` quản lý key

Lúc dev local, để key trong `.env` ở root project, code đọc qua dotenv lib. **`.env` PHẢI add vào `.gitignore`**, không commit vào Git.

Bên trái viết config, bên phải đọc — switch giữa 2 ngôn ngữ:

<DotEnvDemo />

---

## 7. Production: để platform inject key

`.env` là tool dev. Trên server và cloud platform, **runtime environment** chịu trách nhiệm inject key, code hoàn toàn không biết key ở đâu:

<ServerSecretDemo />

---

## 8. Debug thực chiến

### `command not found`

```bash
# B1: confirm có trong PATH chưa
which python3         # có output = tìm thấy

# B2: tìm vị trí cài thật (macOS)
brew list python | grep bin

# B3: đưa folder vào PATH
export PATH="/path/found:$PATH"
source ~/.zshrc       # Ghi config xong nhớ source
```

### Cài 2 version, dùng nhầm version

```bash
which python
# /usr/bin/python ← bản cũ system, ở đầu PATH

# Đưa folder bản mới ra đầu PATH
export PATH="/usr/local/bin:$PATH"

which python
# /usr/local/bin/python ← bản mới, giờ ưu tiên
```

### Set variable rồi mà program không đọc được

| Lý do | Giải pháp |
|:---|:---|
| Quên `export` | Thêm `export` thử lại |
| Sửa `~/.zshrc` chưa hiệu lực | `source ~/.zshrc` |
| Dùng `.env` mà không cài dotenv | `pip install python-dotenv` / `npm install dotenv` |
| Trên server chỉ valid trong SSH session | Đổi sang systemd `EnvironmentFile` |

---

## Glossary

| Thuật ngữ | Nghĩa |
|:---|:---|
| **PATH** | Danh sách folder Shell tìm executable, cách nhau `:`, thứ tự = priority |
| **export** | Mark variable inheritable, subprocess nhận bản copy khi start |
| **source** | Run lại file config trong shell hiện tại, hiệu lực ngay |
| **which** | Hiện đường dẫn executable cho command (kết quả PATH search) |
| **.env** | File config local, chứa key dev, BẮT BUỘC add `.gitignore` |
| **.env.example** | Template với tên variable đủ, value trống, commit Git an toàn |
| **chmod 600** | Permission: chỉ owner đọc-ghi, dùng cho file key |
| **Secret Scanner** | GitHub auto scan key leak, phát hiện sẽ báo vendor revoke |

::: tip 2026 cho VN dev
- **AI agents (Claude Code, Cursor) đọc PATH như bạn**: cài tool mới mà agent không tìm thấy → restart agent session
- **Multi-environment**: dùng `direnv` auto-load `.env` theo folder
- **Secret manager**: 1Password CLI, Doppler, Infisical thay `.env`
- **GitHub Actions**: dùng Repository Secrets, đừng để key trong workflow YAML
- **macOS Keychain**: lưu API key bằng `security add-generic-password` an toàn hơn `.env`
- **Cloud-native**: AWS Secrets Manager, GCP Secret Manager, Azure Key Vault — production must
:::

## Tài liệu

- [The Twelve-Factor App](https://12factor.net/config) - config qua env var
- [direnv](https://direnv.net/) - auto load env per folder
- [dotenv docs](https://github.com/motdotla/dotenv) - Node.js
- [python-dotenv](https://pypi.org/project/python-dotenv/) - Python
