# Command Line và Shell script

> 💡 **Hướng dẫn**: chương này cho reader zero-base hiểu hệ thống cách terminal hoạt động. Không cần background CS, qua interactive demo phân tích từ cơ bản tới sâu.

## 0. Bắt đầu nhanh: mở terminal thế nào?

Terminal là "mặc định nhà máy" của mọi OS, không cần cài software gì.

::: info 🖥️ Cách mở theo OS

**🍎 macOS**
1. Bấm `Command (⌘) + Space` mở Spotlight
2. Gõ `Terminal`
3. Enter → cửa sổ nền trắng chữ đen (hoặc ngược)

**🪟 Windows**
- **CMD**: `Win + R`, gõ `cmd`, Enter (CLI cổ nhất)
- **PowerShell**: `Win + R`, gõ `powershell`, Enter (modern, mạnh hơn)
- **Windows Terminal**: download từ Microsoft Store — best modern terminal
- **WSL2**: install Linux subsystem cho dev workflow

**🐧 Linux**
- Shortcut: `Ctrl + Alt + T`
- Hoặc search "Terminal" trong app menu
:::

### 0.1 Lab thực chiến

> 💡 An toàn dùng **web simulator** dưới. Hoặc mở terminal thật trên máy bạn.

Bạn sẽ học:
1. **Xem file**: `ls` (Linux/Mac), `dir` (Windows) xem thư mục hiện tại
2. **Tạo + vào folder**: `mkdir` tạo, `cd` vào
3. **Tạo file mới**: lệnh nhanh
4. **Cài software**: 1 dòng cài Python lib
5. **Xoá**: cẩn thận!
6. **Hỏi AI**: quan trọng nhất! Quên lệnh → hỏi AI "trên Mac xoá file thế nào?"

<TerminalHandsOn />

### 0.2 Sao bỏ chuột? (Why CLI?)

Không phải "show off geek", mà vì **language (command) mạnh hơn gesture (mouse)** trong scenario cụ thể.

#### 1. Mouse khó "batch" + "logic"

- **GUI (mouse)**: phù hợp "thấy gì click đó". Xoá 1 ảnh → right-click delete nhanh. Nhưng "xoá hết ảnh chụp 2023, >5MB, format PNG" → mouse bó tay.
- **CLI (command)**: phù hợp "mô tả muốn làm gì". 1 dòng command xử cả 10000 ảnh.

#### 2. Command có thể record + reuse

- **GUI**: config 1 lần phải click vài chục menu. Lần sau đổi máy phải click lại từ trí nhớ → dễ sót.
- **CLI**: viết hết lệnh vào 1 file (script). Lần sau chạy file → reproduce **zero-error**. Đây là nền của **automation**.

#### 3. Remote control: lựa chọn duy nhất

- **GUI**: truyền screen như HD video, cần băng thông cao
- **CLI**: truyền text thuần, vài chục char. Kể cả ở vùng tín hiệu kém vẫn control được server bên kia trái đất

**Tóm**: GUI cho **explore** (browse, xem ảnh), CLI cho **production** (dev, ops, batch).

## 1. Terminal là gì?

<TerminalOSDemo />

Trước GUI phổ biến, terminal là cách chính người tương tác máy. Hôm nay, vẫn là tool chính xác + hiệu quả nhất cho dev.

<TerminalDefinition />

Bản chất terminal là **char stream I/O environment**:
- **Input**: keyboard gửi instruction (char signal)
- **Output**: screen hiện text feedback

Không xử graphic, image, video — chỉ focus **text interaction**.

## 2. Architecture core: nghệ thuật decoupling

Trước khi sâu, suy nghĩ: **terminal window tự nó hiểu bạn nói gì?**

Thực tế, terminal như **monitor chỉ truyền tin**. Khi bạn gõ `date`, terminal không biết là "xem ngày", chỉ pack 4 char gửi cho **Shell**.

Shell mới là "não" hiểu bạn nói + chỉ huy máy.

### 2.1 Phân vai

- **🖥️ Terminal**: như "browser" — hiện text, gửi input
- **🧠 Shell**: như "server-side script" — parse command, execute
- **⚙️ Kernel**: như "OS underlying" — xử syscall thật

### 2.2 Flow

```
Bạn gõ "ls"
   ↓
Terminal (display + transport)
   ↓ pass char "ls"
Shell (parse + execute)
   ↓ syscall
Kernel (read directory)
   ↓ return data
Shell (format output)
   ↓
Terminal (display result)
```

## 3. Shell phổ biến

| Shell | Đặc điểm | OS |
|---|---|---|
| **Bash** (Bourne Again Shell) | Phổ biến nhất Linux, default macOS cũ | Linux, macOS, WSL |
| **Zsh** | Powerful hơn Bash, plugins phong phú | macOS default (Catalina+), Linux |
| **Fish** | User-friendly, autocomplete tốt | Cross-platform |
| **PowerShell** | Object-oriented, .NET-based | Windows default, có Linux/Mac |
| **CMD** | Legacy Windows | Windows |
| **Nushell** | Modern, structured data | Cross-platform (mới) |

**Khuyến nghị 2026**: Zsh + Oh My Zsh (macOS) hoặc Fish (clean), PowerShell (Windows), WSL2 (Linux trên Windows).

## 4. Lệnh cơ bản

### 4.1 Navigation

| Linux/Mac | Windows | Mô tả |
|---|---|---|
| `pwd` | `cd` (no arg) | In current path |
| `ls` | `dir` | List files |
| `cd <dir>` | `cd <dir>` | Vào folder |
| `cd ..` | `cd ..` | Lên 1 cấp |
| `cd ~` | `cd %USERPROFILE%` | Vào home |
| `cd -` | - | Quay về folder trước |

### 4.2 File operations

| Linux/Mac | Windows | Mô tả |
|---|---|---|
| `touch file.txt` | `type nul > file.txt` | Tạo file empty |
| `mkdir foo` | `mkdir foo` | Tạo folder |
| `cp src dst` | `copy src dst` | Copy file |
| `mv src dst` | `move src dst` | Move/rename |
| `rm file` | `del file` | Xoá file |
| `rm -rf dir` | `rmdir /s dir` | Xoá folder + content (cẩn thận!) |
| `cat file` | `type file` | In nội dung |
| `head file` | - | 10 dòng đầu |
| `tail -f log` | - | Watch file thay đổi |

### 4.3 Search + filter

```bash
# Tìm file theo tên
find . -name "*.js"

# Tìm text trong file
grep "pattern" file.txt
grep -r "pattern" .       # Recursive
grep -ri "pattern" .      # Recursive + ignore case

# Modern alternatives (faster)
fd "*.js"                 # fd thay find
rg "pattern"              # ripgrep thay grep
```

### 4.4 Process management

```bash
ps aux                    # List all process
top                       # Real-time process monitor
htop                      # Better top
kill <PID>                # Kill process
kill -9 <PID>             # Force kill
killall node              # Kill all node processes
lsof -i :3000             # Process đang dùng port 3000
```

### 4.5 Permission (Linux/Mac)

```bash
chmod +x script.sh        # Make executable
chmod 755 script.sh       # rwxr-xr-x
chown user:group file     # Change owner
sudo command              # Run as admin
```

### 4.6 Network

```bash
ping google.com           # Test connectivity
curl https://api.com      # HTTP request
wget url                  # Download file
ssh user@host             # Remote shell
scp file user@host:path   # Secure copy
```

## 5. Pipe và Redirect

### 5.1 Pipe (`|`)

Output của command này → input của command sau:

```bash
ls | grep ".js"           # List file, filter chỉ .js
ps aux | grep node        # Tìm node process
cat log | tail -100 | grep ERROR  # 100 dòng cuối log, filter ERROR
```

### 5.2 Redirect

```bash
command > file            # Output ra file (overwrite)
command >> file           # Append
command < file            # Input từ file
command 2> error.log      # Stderr ra file
command &> all.log        # Cả stdout + stderr
command > /dev/null       # Bỏ output
```

## 6. Shell scripting

File `.sh` chứa series command:

```bash
#!/bin/bash
# Backup script

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backup/$DATE"

mkdir -p "$BACKUP_DIR"
cp -r ~/important "$BACKUP_DIR"

if [ $? -eq 0 ]; then
    echo "Backup success: $BACKUP_DIR"
else
    echo "Backup failed" >&2
    exit 1
fi
```

Chạy:
```bash
chmod +x backup.sh
./backup.sh
```

### 6.1 Variable + loop

```bash
# Variable
NAME="World"
echo "Hello, $NAME"

# Loop
for file in *.txt; do
    echo "Processing $file"
    wc -l "$file"
done

# Condition
if [ -f "config.json" ]; then
    echo "Config exists"
else
    echo "Config missing"
fi
```

## 7. Productivity tips

### 7.1 Keyboard shortcut

| Shortcut | Tác dụng |
|---|---|
| `Ctrl+R` | Search history |
| `Ctrl+L` | Clear screen |
| `Ctrl+C` | Cancel command |
| `Ctrl+Z` | Suspend (resume với `fg`) |
| `Ctrl+D` | Exit shell |
| `Ctrl+A` | Move to start of line |
| `Ctrl+E` | Move to end |
| `Ctrl+W` | Delete word back |
| `Ctrl+U` | Delete line back |
| `!!` | Run last command |
| `!$` | Last argument of previous command |
| `Tab` | Auto-complete |

### 7.2 Alias

Trong `~/.zshrc` hoặc `~/.bashrc`:

```bash
alias ll='ls -la'
alias gs='git status'
alias gc='git commit'
alias gp='git push'
alias ..='cd ..'
alias ...='cd ../..'
alias serve='python3 -m http.server'
```

### 7.3 Modern tools 2026

| Old | New | Reason |
|---|---|---|
| `cd` | `zoxide` (`z`) | Smart jump |
| `ls` | `eza` / `lsd` | Icon, color |
| `cat` | `bat` | Syntax highlight |
| `grep` | `ripgrep` (`rg`) | Fast |
| `find` | `fd` | Fast, simple |
| `top` | `btop` / `htop` | UI đẹp |
| `du` | `dust` | Visual |
| `tldr` page | - | Quick example mỗi command |
| `man` | `tldr` | Modern docs |

### 7.4 AI in terminal (2026 hot)

- **Warp**: AI-native terminal, ask AI inline
- **Fig** (Amazon Q CLI): autocomplete + AI
- **Claude Code**: agent runs in terminal
- **Aider**: AI pair programmer in terminal
- **gh copilot**: GitHub Copilot for CLI

## 8. Tổng kết

CLI = **expressive, scriptable, reproducible**.
- Học top 30 lệnh là đủ 90% daily work
- Pipe + redirect là superpower
- Script automation = save hours
- Modern tool 2026 dramatically tốt hơn classic UNIX tool

::: tip 2026 tips cho VN dev
- **macOS**: Zsh + Oh My Zsh + plugins (autosuggestion, syntax-highlight)
- **Windows**: Windows Terminal + PowerShell 7 + WSL2 Ubuntu
- **Linux**: tự tay chọn — Fish nếu newbie, Zsh nếu power user
- **Cross-platform tools install**: dùng `brew` (macOS) hoặc `winget` (Win) hoặc `apt` (Ubuntu)
- **AI in terminal**: Claude Code là productivity game-changer
- **Learn modern tools**: ripgrep, bat, eza, zoxide — change life
:::

## Tài liệu

- [The Missing Semester](https://missing.csail.mit.edu/) - MIT course về CLI
- [Bash Guide for Beginners](https://tldp.org/LDP/Bash-Beginners-Guide/html/)
- [tldr pages](https://tldr.sh/) - simplified man page
- [Modern Unix](https://github.com/ibraheemdev/modern-unix) - list modern alternatives
- [Oh My Zsh](https://ohmyz.sh/) - zsh framework
