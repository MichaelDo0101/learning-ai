# Git: cỗ máy thời gian của code

> 💡 **Hướng dẫn**: chương này dành cho người hoàn toàn chưa dùng Git. Không bắt bạn học thuộc lệnh, mà rõ "Git giúp giải vấn đề gì" trước, rồi từng bước nối lệnh và khái niệm. Sau khi đọc xong, bạn độc lập làm được: local commit, tạo branch, push lên GitHub.

---

## 0. Câu hỏi trước: bạn đã gặp các nightmare này chưa?

**Scenario 1: version hell**

Viết luận văn/code, sửa giữa chừng phát hiện sai, muốn quay về version 3 ngày trước — nhưng không tìm được.

```
project_v1.zip
project_v2_chinh-sua.zip
project_v3_ban-cuoi.zip
project_v3_ban-cuoi_that-su-cuoi.zip
project_v3_ban-cuoi_quyet-khong-sua.zip
```

Mỗi lần save 1 copy mới, ổ cứng càng lộn xộn, không nhớ nổi version nào sửa gì.

**Scenario 2: collaboration nightmare**

Bạn và teammate cùng sửa 1 file:
- Bạn sửa dòng 10, add function login
- Teammate sửa dòng 10, fix 1 Bug
- Email code qua lại, merge xong code 1 người bị overwritten
- Không ai biết cuối cùng đoạn nào đúng

**Scenario 3: không có "thuốc hối hận"**

Deploy production code mới, ra Bug, muốn revert về version cũ ổn định — nhưng không biết cách, chỉ panic tìm backup.

---

**Git ra đời để giải 3 vấn đề trên.**

Git là **Version Control System**. Bản chất: **ghi lại mỗi lần "save" của bạn thành 1 timeline lịch sử đầy đủ, cho phép quay về bất kỳ điểm nào**.

Không phóng đại: Git là 1 trong các tool quan trọng nhất software dev hiện đại. Gần như mọi công ty, mọi open source dùng.

---

## 1. Git và GitHub có giống nhau?

Người mới hay nhầm:

| | Git | GitHub |
|:---|:---|:---|
| **Là gì** | Tool version control chạy trên máy bạn | Website lưu Git repo (cloud) |
| **Ở đâu** | Local máy bạn | Internet |
| **Dùng độc lập?** | ✅ Có, chỉ quản local history | ❌ Cần Git |
| **Ẩn dụ** | Nhật ký local | Cloud drive lưu nhật ký |

Đơn giản: **Git là tool, GitHub là service hosting**. Như Word là tool, OneDrive là cloud.

Ngoài GitHub, có **GitLab**, **Gitee** (TQ), **Bitbucket**.

---

## 2. Khái niệm core: 3 area

Đây là design quan trọng nhất Git. Hiểu 3 area là hiểu linh hồn Git.

**Working Directory**: folder thường, file bạn đang edit. Git sense được bạn sửa gì, nhưng chưa record.

**Staging Area (Index)**: "chuẩn bị commit" — staging. Giống bỏ hàng vào hộp ship — chưa gửi nhưng đã chọn xong.

**Repository**: kho lưu trữ permanent, ẩn trong folder `.git`. Mỗi `git commit` → content staging được lưu vào repo, thành record không sửa được.

<GitCommitFlow />

### Tại sao "2 bước" (add + commit)?

Người mới thường hỏi: sao không one-click save?

**Vì thực tế dev, bạn thường không muốn commit hết changes 1 lúc.**

Ví dụ hôm nay sửa 5 file:
- `login.js`: xong function login (muốn commit)
- `style.css`: chỉnh style login page (muốn commit)
- `debug.log`: debug output tạm (**không muốn** commit)
- `experiment.js`: function mới test, chưa xong (**không muốn**)
- `todo.txt`: ghi chú cá nhân (**không muốn**)

Không có staging area → commit hết (record loạn) hoặc không commit gì. Có staging → `git add login.js style.css` chỉ bỏ 2 file vào hộp, rồi `commit` — record "Function login xong" rõ ràng.

---

## 3. Lần đầu dùng Git

### 3.1 Cài và init

Cài Git (macOS có sẵn, Windows tải git-scm.com), mở terminal, vào folder project:

```bash
git init
# Git tạo folder ẩn .git, lưu history trong đó
```

Cấu hình lần đầu:
```bash
git config --global user.name "Tên bạn"
git config --global user.email "email@example.com"
```

### 3.2 Workflow hàng ngày: 3 bước save

**Bước 1: check state**
```bash
git status
```
Lệnh dùng nhiều nhất. Hiện: branch hiện tại, file nào đã sửa (đỏ = chưa stage), file nào trong staging (xanh = đã stage).

**Bước 2: bỏ file vào staging**
```bash
git add login.js              # 1 file
git add login.js style.css    # Nhiều
git add .                     # Tất cả
```

> ⚠️ Misconception: `git add .` tiện nhưng add hết. Habit tốt là precise add, hoặc dùng `.gitignore` exclude file không muốn track.

**Bước 3: commit, viết message**
```bash
git commit -m "feat: thêm function login user"
```

### 3.3 Commit message chuẩn

```bash
# ❌ Tệ
git commit -m "update"
git commit -m "fix"

# ✅ Tốt: type + colon + mô tả 1 câu
git commit -m "feat: thêm function login user"
git commit -m "fix: fix white screen iOS Safari trang chủ"
git commit -m "docs: update deploy note trong README"
git commit -m "refactor: tách UserService thành module riêng"
```

| Prefix | Nghĩa |
|:---|:---|
| `feat:` | Function mới |
| `fix:` | Fix Bug |
| `docs:` | Sửa doc |
| `style:` | Format code (không ảnh hưởng function) |
| `refactor:` | Refactor (function không đổi) |
| `chore:` | Build, tool, dependency |
| `test:` | Test |

### 3.4 Xem history

```bash
git log              # Chi tiết
git log --oneline    # Gọn, recommend
# a1b2c3d (HEAD -> main) feat: thêm function login user
# 9f3e1b2 init: init project
```

---

## 4. Vũ trụ song song: Branch

**Branch** là feature mạnh nhất Git, cũng confuse người mới nhất.

### 4.1 Branch là gì? Ẩn dụ "vũ trụ song song"

Tưởng tượng game RPG, có lựa chọn key:
- Lựa chọn A: challenge Boss (dev function mới)
- Lựa chọn B: giữ stable main line

Nếu chọn A trên save chính, fail → mất hết tiến độ.

Nhưng **copy save**, làm A trên copy:
- Thắng? Merge thành quả copy vào save chính
- Thua? Save chính không bị ảnh hưởng, xoá copy làm lại

**Git branch chính là cơ chế "copy save" này.**

`main` (hoặc `master`) branch = "save chính", luôn stable usable. Khi dev function mới, tạo branch mới từ main, dev/test ở đó, xong merge về main.

### 4.2 Visualize branch

<GitBranchVisual />

### 4.3 Thao tác branch

**Tạo + switch branch mới**:
```bash
# 2 bước
git branch feature-login
git checkout feature-login

# 1 bước (recommend)
git checkout -b feature-login
```

Sau tạo, prompt terminal hiện branch name:
```
user@mac ~/project (feature-login) $
```

**Xem branches**:
```bash
git branch
# * feature-login    (* = current)
#   main
```

**Dev trên branch như bình thường**:
```bash
git add login.js
git commit -m "feat: add HTML form login"
```

**Switch về main, merge**:
```bash
git checkout main
git merge feature-login
git branch -d feature-login    # Xoá branch (optional)
```

### 4.4 Khi nào nên tạo branch?

| Scenario | Khuyến nghị |
|:---|:---|
| Dev function mới | ✅ Tạo branch |
| Fix bug production urgent | ✅ Tạo `hotfix-xxx` từ main |
| Parallel dev với teammate | ✅ Mỗi người 1 branch |
| Chỉ sửa 1 typo | ❌ Sửa thẳng trên main |

### 4.5 Branch strategy team

| Branch | Mục đích | Đặc điểm |
|:---|:---|:---|
| `main`/`master` | Code production stable | Chỉ code test pass, không push thẳng |
| `dev`/`develop` | Integration branch hàng ngày | Function branch merge vào trước |
| `feature/xxx` | Dev function cụ thể | Vd `feature/user-login` |
| `hotfix/xxx` | Fix urgent | Tạo từ main, merge cả main + dev |

---

## 5. Cộng tác: remote repo

Trên đây là Git **local**. Để share code với teammate, cần **remote repo** (GitHub, GitLab).

### 5.1 Nguyên lý hoạt động

Remote repo = "save chung của team":
- Mỗi người dev local, commit
- Xong `push` (upload) lên remote
- Teammate `pull` (download) latest về local
- Đồng bộ

<GitSyncDemo />

### 5.2 Lần đầu push lên GitHub

**Bước 1**: tạo new repo trên GitHub (góc trên phải + → New repository), KHÔNG check init option.

**Bước 2**: associate remote:
```bash
git remote add origin https://github.com/username/repo.git
git remote -v    # Verify
```

**Bước 3**: push:
```bash
git push -u origin main    # -u = lần sau git push default về origin main
```

### 5.3 Workflow hàng ngày với remote

```bash
# Sáng: pull về mới nhất
git pull

# Dev cả ngày
git add .
git commit -m "feat: ..."

# Tối: push lên
git push
```

### 5.4 Clone repo có sẵn

```bash
git clone https://github.com/username/repo.git
cd repo
# Bắt đầu dev
```

---

## 6. Xử conflict (merge conflict)

Khi 2 người sửa cùng dòng → conflict khi merge/pull.

```bash
git pull
# Auto-merging login.js
# CONFLICT (content): Merge conflict in login.js
```

Mở file `login.js`:
```javascript
<<<<<<< HEAD
const login = (username, password) => { /* code bạn */ }
=======
const login = (user, pwd) => { /* code teammate */ }
>>>>>>> abc123
```

Sửa thủ công:
```javascript
const login = (username, password) => { /* code merged */ }
```

Sau đó:
```bash
git add login.js
git commit -m "merge: resolve conflict in login.js"
```

---

## 7. `.gitignore`: file không track

Tạo file `.gitignore` ở root:

```gitignore
# Dependency
node_modules/

# Build output
dist/
build/

# Env
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Log
*.log
```

---

## 8. Pull Request (PR) workflow — cách team modern

Thay vì push thẳng main, dùng PR:

```bash
# 1. Tạo feature branch
git checkout -b feature/user-profile

# 2. Dev, commit
git add .
git commit -m "feat: add user profile page"

# 3. Push branch
git push -u origin feature/user-profile

# 4. Trên GitHub: tạo PR feature/user-profile → main
# 5. Teammate review, comment, approve
# 6. Merge qua UI GitHub
```

Lợi ích PR:
- Code review trước khi merge
- CI/CD auto test
- Discussion log lưu được
- Audit trail rõ

---

## 9. Lệnh phổ biến cheat sheet

```bash
# Setup
git init
git clone <url>

# Daily
git status
git add <file>     # hoặc git add .
git commit -m "..."
git push
git pull

# Branch
git checkout -b <branch>
git checkout <branch>
git branch                  # list
git merge <branch>
git branch -d <branch>      # xoá
git push -u origin <branch>

# History
git log --oneline
git diff
git diff HEAD~1             # so với commit trước

# Undo
git restore <file>          # undo working dir
git restore --staged <file> # unstage
git reset HEAD~1            # undo last commit (keep changes)
git reset --hard HEAD~1     # ❌ destructive: undo + xoá changes

# Remote
git remote -v
git remote add origin <url>
git fetch
git pull = git fetch + git merge

# Tag (cho release)
git tag v1.0.0
git push origin v1.0.0
```

---

## 10. Học tiếp

- **Rebase** (advanced): rewrite history clean
- **Stash**: tạm hide changes
- **Cherry-pick**: pick 1 commit cụ thể từ branch khác
- **Reflog**: recover lost commit
- **GitHub Actions**: CI/CD tự động
- **Git hooks**: chạy script trước/sau commit

::: tip 2026 Update
- **GitHub Copilot + AI commit message**: auto gen commit message rất tốt
- **Claude Code + GitHub MCP**: AI manage GitHub workflow
- **GitButler**: visual Git client mới — virtual branches
- **Lazygit**: TUI cực hiệu quả cho Vim user
- **`gh` CLI**: GitHub CLI native, mạnh hơn web UI cho power user
- **Trunk-based development** trending: 1 main branch + short-lived feature branch
- **Conventional Commits** standard cho commit message (used by AI auto-changelog)
:::

::: tip Cho VN dev
- Default git config user.email match GitHub email (nếu khác, contribution không count)
- Setup SSH key thay vì HTTPS password (https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Dùng GitHub student pack nếu là sinh viên (free Pro 1 năm)
- Self-host: Gitea (lightweight), Forgejo (fork Gitea), GitLab CE
:::
