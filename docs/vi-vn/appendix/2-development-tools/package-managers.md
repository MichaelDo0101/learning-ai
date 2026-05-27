# Package Manager

> 💡 **Hướng dẫn**: viết code không cần build từ zero — 99% chức năng đã có người viết sẵn và publish lên Internet. **Package manager** là tool giúp bạn tìm, download, quản lý các "phụ tùng có sẵn" này. Chương này xoay quanh câu hỏi cốt lõi: **làm sao dependency code reproduce được, collaborate được, maintain được?**

---

## 0. Sao chắc chắn bạn sẽ dùng package manager?

Tưởng tượng viết Node.js gửi HTTP request. 2 cách:

- **A (manual)**: tự implement TCP, parse HTTP, redirect, timeout... vài nghìn dòng code, debug vài tháng.
- **B (package manager)**: `npm install axios`, 10 giây, 1 dòng xong.

Package manager bản chất là **"app store" cho code**. Giúp bạn:

1. Tìm lib người khác publish trong central registry
2. Auto download + install vào project
3. Xử dependency của dependency
4. Record chính xác version dùng, để team collaborate không vỡ

---

## 1. Package manager các ngôn ngữ/OS

Mỗi ngôn ngữ + OS có ecosystem riêng, nhưng logic giống nhau.

👇 **Click thử**: chọn ecosystem quen, explore tool chính.

<PackageManagerOverviewDemo />

### 1.1 Package download từ đâu? — Registry

Mỗi ecosystem có 1 central repo:

| Ecosystem | Registry | Số package |
| :--- | :--- | :--- |
| JavaScript | [npmjs.com](https://npmjs.com) | 2 triệu+ |
| Python | [pypi.org](https://pypi.org) | 500k+ |
| Rust | [crates.io](https://crates.io) | 150k+ |
| Go | [pkg.go.dev](https://pkg.go.dev) | 500k+ |
| macOS/Linux tools | [formulae.brew.sh](https://formulae.brew.sh) | 7000+ |
| Windows software | [winget.run](https://winget.run) / [chocolatey.org](https://chocolatey.org) | hàng chục nghìn |

### 1.2 JS 3 ông lớn: npm vs yarn vs pnpm

Tính năng tương đương, khác chủ yếu **speed + disk usage**:

```text
Disk: pnpm (hard link share) < yarn PnP (zero node_modules) < npm (full copy)
Speed: pnpm ≈ yarn > npm
Phổ biến: npm (universal) > pnpm (project mới khuyến nghị) > yarn (1 số team)
```

**Khuyến nghị**: project mới dùng `pnpm`, project cũ giữ tool cũ.

### 1.3 Windows 3 ông lớn: winget vs Chocolatey vs Scoop

| | winget | Chocolatey | Scoop |
| :--- | :--- | :--- | :--- |
| **Official** | Microsoft official | 3rd party | 3rd party |
| **Cần admin** | 1 phần cần | Có | **Không** |
| **Hợp scenario** | Cài software daily | Enterprise batch deploy | Quản dev tool |
| **Số package** | Nhiều, tăng nhanh | Nhiều nhất (10000+) | Focus dev tool |

**Khuyến nghị**: daily dùng `winget`, dev tool dùng `scoop`, enterprise auto dùng `Chocolatey`.

---

## 2. Install package — đằng sau xảy ra gì?

Gõ `npm install axios`, command line im vài giây, xong. Trong vài giây đó xảy ra gì?

👇 **Click thử**: chọn 1 package, click "run", quan sát quá trình install.

<PackageInstallDemo />

### 2.1 4 stage chi tiết

**① Dependency Resolution**

Package manager "hiểu" bạn cần cài gì. `axios` dependency `follow-redirects`, `form-data`... cũng phải cài. Quá trình này gọi là **build dependency tree**.

**② Fetch**

Download mọi package cần từ Registry (`.tgz` format). Smart package manager:
- Parallel download, không chờ từng cái
- Check local cache trước, hit thì không request network

**③ Link**

Giải nén package vào `node_modules/` và xử reference.

**④ Lockfile**

Ghi **exact version** install vào `package-lock.json` (hoặc `yarn.lock` / `pnpm-lock.yaml`).

### 2.2 Command thường dùng

```bash
# ── JavaScript (npm) ──────────────────────────────────
npm install              # Install hết theo package.json
npm install axios        # Install package mới (prod dependency)
npm install -D jest      # Install dev dependency
npm install -g tsx       # Global install (mọi folder dùng được)
npm uninstall axios      # Uninstall
npm update               # Upgrade hết tới compatible latest
npm run build            # Chạy script trong package.json
npx create-react-app .   # Run tạm, không install vào project

# ── Python (pip) ──────────────────────────────────────
pip install requests           # Install
pip install requests==2.28.0   # Install version cụ thể
pip freeze > requirements.txt  # Export dependency list
pip install -r requirements.txt # Install theo list

# ── Rust (cargo) ──────────────────────────────────────
cargo add serde    # Add dependency (tự update Cargo.toml)
cargo build        # Build
cargo test         # Test
cargo run          # Run

# ── Go (go mod) ───────────────────────────────────────
go get github.com/gin-gonic/gin  # Add dependency
go mod tidy                      # Tidy (xoá thừa, bổ sung thiếu)
go build ./...                   # Build

# ── Windows (winget) ──────────────────────────────────
winget install Git.Git           # Install software
winget upgrade --all             # Update hết software đã cài
```

### 2.3 npm scripts là gì?

Trong `package.json` có field `scripts`, đây là **task runner** built-in của npm:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

Run: `npm run dev`, `npm run build`. Lợi:
- **Unified entry**: team không cần nhớ command tool cụ thể
- **Auto config env**: run sẽ tự đưa `node_modules/.bin` vào PATH, dùng tool local trực tiếp

---

## 3. Global install vs Local install

Khái niệm newbie hay confused.

### 3.1 Khác biệt

```bash
npm install axios        # Local: cài vào ./node_modules/, chỉ project này dùng
npm install -g typescript  # Global: cài vào system, mọi project/folder dùng
```

| | Local | Global |
| :--- | :--- | :--- |
| **Lưu ở** | `./node_modules/` | System dir (vd `/usr/local/lib/`) |
| **Hợp** | Lib project (axios, vue, react) | CLI tool (tsc, eslint, create-react-app) |
| **Version isolation** | Mỗi project version riêng ✅ | Cả máy 1 version ⚠️ |
| **Team consistency** | Lockfile đảm bảo ✅ | Mỗi người version khác ⚠️ |

### 3.2 Golden rule

> **Lib dependency (axios, lodash, vue) luôn local install;
> CLI tool (tsc, eslint) ưu tiên local + dùng `npx` gọi.**

**Sao CLI tool cũng khuyến nghị local?**

Giả sử global cài `eslint@8`, nhưng project A cần `eslint@9` rule mới → phải switch qua lại global + project. Cài local + `npx eslint .` → mỗi project có version riêng.

### 3.3 npx — run tạm, không pollute env

`npx` là tool runner built-in npm, cho phép **không install vẫn run**:

```bash
# Không install create-vue, run trực tiếp init project
npx create-vue my-project

# Không install prettier, format file trực tiếp
npx prettier --write src/

# Force version cụ thể (bỏ qua đã cài)
npx typescript@5.4 tsc --version
```

Python có `uvx`, Rust có `cargo run` tương tự:

```bash
uvx ruff check .       # Python: run tạm ruff checker
cargo install ripgrep  # Rust: install global, thành command rg
```

---

## 4. Bí mật số version — Semantic Versioning

Trong `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.6.8",
    "typescript": "~5.4.0"
  }
}
```

`^` và `~` là gì?

👇 **Click thử**: hover từng phần version, hiểu nghĩa; click symbol range xem version nào được accept.

<DependencyTreeDemo />

### 4.1 Sao không lock chết version?

| Cách | Lợi | Hại |
| :--- | :--- | :--- |
| `"axios": "1.6.8"` (lock chính xác) | Predictable hoàn toàn | Security patch không tự update |
| `"axios": "^1.6.8"` (range, khuyến nghị) | Auto get bug fix + feature | Hiếm khi có nhỏ không tương thích |
| `"axios": "*"` (mọi version) | Luôn mới nhất | Major upgrade phá nát code |

**Best practice**: `^` cho range + lockfile lock actual version, kết hợp 2.

### 4.2 Dependency hell là gì?

Khi bạn depend 50 package, mỗi cái lại depend nhiều cái, "tree" có thể vài trăm node. Nếu 2 package bạn depend cần **same lib version không tương thích**, sinh "dependency conflict".

Cách giải các ecosystem:
- **npm v3+**: same major nâng lên top share, khác major cài riêng
- **pnpm**: hard link + strict isolation, chặn "phantom dependency" (package chưa declare nhưng dùng được)
- **cargo (Rust)**: ngôn ngữ cấp ép mỗi package chỉ depend 1 version, tránh conflict
- **go mod (Go)**: Minimum Version Selection (MVS), chọn version thấp nhất thoả mọi constraint

---

## 5. Lockfile — nền tảng team collaboration

### 5.1 Sao cần lockfile?

Giả sử `package.json` viết `"axios": "^1.6.0"`:

- Bạn cài hôm nay → 1.6.8
- Teammate cài mai → có thể 1.7.0 (vừa release tối qua)
- CI tuần sau → có thể 1.7.1

Cùng code, 3 người ra kết quả khác. **Lockfile** record exact version, ai cũng cài theo, kết quả y nhau.

| Scenario | Command | Behavior |
| :--- | :--- | :--- |
| Sync dev env | `npm install` | Tham khảo lockfile cài, không upgrade |
| CI / Production deploy | `npm ci` | **Strict** theo lockfile, có diff báo error |
| Chủ động upgrade | `npm update` | Upgrade trong range cho phép, update lockfile |

### 5.2 Lockfile có nên commit Git?

**App phải commit, lib publish lên npm có thể không commit.**

- ✅ **Web app, backend**: phải commit, đảm bảo deploy env y dev env
- ❌ **Lib npm publish**: thường không commit, user có lockfile riêng
- ✅ **Python project**: `requirements.txt` đóng vai trò lockfile, nên commit
- ✅ **Go project**: `go.sum` phải commit, integrity verify

---

## 6. Python virtual environment

Python có 1 concept đặc biệt: **virtual environment (venv)**.

**Sao cần?**

Python default **global** install. Project A cần `requests==2.28`, B cần `requests==2.31`, conflict.

**Giải**: mỗi project tạo venv riêng, không interfere.

```bash
# 1. Tạo venv (chạy ở root project)
python -m venv .venv

# 2. Activate
source .venv/bin/activate        # macOS / Linux
.venv\Scripts\activate           # Windows (CMD)
.venv\Scripts\Activate.ps1       # Windows (PowerShell)

# 3. Sau activate, pip install chỉ ảnh hưởng venv hiện tại
pip install requests

# 4. Exit
deactivate
```

> ⚠️ **Windows hay gặp**: PowerShell mặc định cấm chạy script, phải:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

**Alternative hiện đại**:
- `conda create -n myproject python=3.11` — quản cả Python version
- `uv venv && source .venv/bin/activate` — viết bằng Rust, tạo cực nhanh

**`.venv` có commit Git?**

Không! `.venv` là local sinh, add vào `.gitignore`. Dùng `requirements.txt` hoặc `pyproject.toml` mô tả dependency.

---

## 7. FAQ

**Q: `node_modules` có commit Git?**

Không! Thường vài trăm MB, add `.gitignore`. Có `package-lock.json` rồi, ai cũng `npm install` rebuild nhanh.

**Q: Install fail / báo lỗi lạ?**

```bash
# Clear cache, xoá install cũ, làm lại
npm cache clean --force
rm -rf node_modules package-lock.json   # macOS/Linux
rmdir /s /q node_modules && del package-lock.json  # Windows CMD
npm install
```

**Q: Install chậm?**

```bash
# Switch sang mirror nội địa (khuyến nghị ghi vào .npmrc local)
echo "registry=https://registry.npmmirror.com" > .npmrc

# pip cũng config mirror được
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**Q: Package có vulnerability sao xử?**

```bash
npm audit          # Scan known vulnerabilities
npm audit fix      # Auto fix compatible
npm audit fix --force  # Force upgrade (có thể breaking, cẩn thận)
```

**Q: Sao biết 1 package đáng tin?**

Trên [npmjs.com](https://npmjs.com) hoặc [bundlephobia.com](https://bundlephobia.com) xem:
- Weekly download (cao = đáng tin)
- Last update (>2 năm không update là phải cẩn thận)
- Số dependency (càng nhiều, càng dễ mang vấn đề)
- GitHub Stars + Issues activity

---

## 8. Glossary

| Term | Nghĩa |
| :--- | :--- |
| **Package** | Code module người khác viết + publish |
| **Registry** | Central server lưu mọi package (vd npmjs.com) |
| **Dependency** | Package project cần để chạy |
| **devDependency** | Chỉ cần lúc dev (test framework, build tool) |
| **Lockfile** | Record exact version, đảm bảo env consistency |
| **SemVer** | Semantic Versioning: MAJOR.MINOR.PATCH |
| **node_modules** | Folder npm cài package thật |
| **venv** | Sandbox isolated cho Python project |
| **tarball** | Format distribute package, thường `.tgz` |
| **Hoisting** | npm nâng sub-dependency lên top tránh duplicate |
| **Phantom Dependency** | Package chưa declare nhưng dùng được (pnpm chặn) |
| **npx** | Package runner của npm, run tạm không install |
| **Crate** | Đơn vị "package" của Rust |
| **winget** | Windows official package manager (built-in Win 10/11) |

---

## Tổng kết

4 câu nhớ core:

1. **Package manager = app store**: tìm, install, manage code phụ tùng, không build lại bánh xe.
2. **Lockfile = team contract**: lock exact version, "trên máy tôi work tốt" thành dĩ vãng.
3. **SemVer = ngôn ngữ giao tiếp**: `^` an toàn nhận update, MAJOR đổi phải cẩn thận.
4. **Local > Global**: dependency project local install, `npx` / `uvx` run tạm, env sạch.

::: tip 2026 cho VN dev
- **`uv` (Python)**: thay pip, nhanh 10-100x, lockfile + virtual env all-in-one
- **`bun` (JS runtime)**: install package nhanh hơn pnpm, JS toolchain all-in-one
- **`pnpm` workspaces**: monorepo cho team lớn
- **Renovate / Dependabot**: auto PR upgrade dependency
- **Socket.dev**: scan supply chain attack trong dependency
- **Lockfile + `npm ci`**: production phải dùng `npm ci`, không `npm install`
:::
