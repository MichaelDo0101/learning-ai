# Linux Basics

::: tip Mở đầu
**Server world, Linux là protagonist tuyệt đối.** >90% server toàn cầu chạy Linux, từ Zalo, Tiki đến Google search, sau đều Linux. Là dev, master Linux basics = must, không optional.
:::

**Bạn sẽ học**:
- **File system**: directory structure + philosophy "everything is file"
- **Commands**: file op, text process, process management
- **Permissions**: user, group, permission model
- **Shell basics**: pipe, redirect, env var
- **Practical**: log debug, process check, network diagnosis

| Chương | Nội dung |
|-----|------|
| **1** | File system |
| **2** | Common commands |
| **3** | Permission model |
| **4** | Shell basics |
| **5** | Practical scenarios |

---

## 1. File system: everything is file

Linux core philosophy: **everything is file**. File thường = file, directory = file, disk = file, ngay cả network connection, process info = file. Unified abstraction này cho phép dùng cùng tool (read, write, permission) op gần như mọi system resource.

<LinuxFileSystemDemo />

### Directory structure

Tưởng filesystem Linux như cây ngược:

```
/                    ← Root (gốc)
├── home/            ← User home (file của bạn ở đây)
├── etc/             ← Config (system "setting panel")
├── var/             ← Data thay đổi (log, cache)
├── usr/             ← Software user install
├── tmp/             ← Temp file (restart mất)
├── proc/            ← Process info (virtual, không disk)
├── dev/             ← Device file (disk, terminal)
├── bin/             ← Basic commands (ls, cp, mv)
├── sbin/            ← Admin commands (cần root)
├── opt/             ← Third-party software
└── root/            ← root user home
```

### Path

| Type | Format | Example | Note |
|------|------|------|------|
| Absolute | Bắt đầu `/` | `/home/hoang/code/app.js` | Từ root, không ambiguous |
| Relative | Từ current dir | `./code/app.js` hoặc `../config` | `.` = current, `..` = parent |

::: tip Power "everything is file"
CPU info? Read file: `cat /proc/cpuinfo`
Memory usage? Read file: `cat /proc/meminfo`
Random number? Read file: `cat /dev/urandom`
Discard output? Write file: `echo "no thanks" > /dev/null`

Không cần API riêng, read/write file đủ. Unix philosophy elegance.
:::

---

## 2. Common commands

Linux command format: `command [options] [args]`. Vd `ls -la /home`: `ls` command, `-la` option, `/home` arg.

<LinuxCommandDemo />

### Top 10 most-used

| Command | Use | Memory |
|------|------|----------|
| `ls` | List file | list |
| `cd` | Switch directory | change directory |
| `cat` | View file | concatenate |
| `grep` | Search text | global regex print |
| `find` | Find file | find |
| `ps` | View process | process status |
| `tail -f` | Live log | -f = follow |
| `chmod` | Change permission | change mode |
| `curl` | HTTP request | client URL |
| `ssh` | Remote login | secure shell |

### Art of command combination

Linux mạnh không ở single command, mà ở **combine**. Qua pipe `|`:

```bash
# Top 5 process CPU
ps aux --sort=-%cpu | head -6

# Stats most frequent error type trong log
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -10

# Find file >100MB
find / -size +100M -type f 2>/dev/null

# Monitor live log highlight error
tail -f /var/log/app.log | grep --color "ERROR"
```

::: tip Unix philosophy
"Do one thing well." Mỗi command 1 function, combine qua pipe → complex op. Đây là sao Linux command ngắn — chúng là lego, không phải Swiss army knife.
:::

---

## 3. Permission model

Linux multi-user, permission = security foundation. Mỗi file có 3 group permission: **Owner, Group, Others**.

### Đọc `ls -l`

```bash
$ ls -l app.js
-rwxr-xr-- 1 hoang dev 2048 Jan 15 10:30 app.js
│├──┤├──┤├──┤   │     │      │
│ │   │   │     │     │      └── File size
│ │   │   │     │     └── Group
│ │   │   │     └── Owner
│ │   │   └── Others: r-- (read only)
│ │   └── Group: r-x (read + execute)
│ └── Owner: rwx (read + write + execute)
└── Type: - file, d dir, l link
```

### 3 permission ops

| Permission | Letter | Number | Cho file | Cho dir |
|------|------|------|-------------|-------------|
| Read | `r` | 4 | View content | List content (ls) |
| Write | `w` | 2 | Modify content | Create/delete file trong dir |
| Execute | `x` | 1 | Run program/script | Enter dir (cd) |

<LinuxPermissionsDemo />

### Numeric permission

3 số = Owner/Group/Others, mỗi số = r(4) + w(2) + x(1):

```
chmod 755 script.sh
  7 = rwx (4+2+1)  → Owner: read + write + execute
  5 = r-x (4+0+1)  → Group: read + execute
  5 = r-x (4+0+1)  → Others: read + execute
```

| Common | Meaning | Use |
|---------|------|---------|
| `644` | rw-r--r-- | File thường (owner write, others read) |
| `755` | rwxr-xr-x | Executable / directory |
| `600` | rw------- | Private file (SSH key) |
| `777` | rwxrwxrwx | Mọi người read/write/execute (nguy hiểm) |

### sudo: tạm root

User thường permission hạn chế, 1 số op cần root. `sudo`:

```bash
# User thường không sửa system config
$ vim /etc/nginx/nginx.conf
# Permission denied

# sudo tạm:
$ sudo vim /etc/nginx/nginx.conf

# Switch root (cẩn thận):
$ sudo su -
```

::: warning Minimum permission principle
Đừng `chmod 777` để giải permission issue, = tháo cửa. Hãy xác định ai cần permission nào, grant chính xác. Tương tự, đừng long-term root, chỉ `sudo` khi cần.
:::

---

## 4. Shell basics

Shell = "translator" giữa bạn + Linux kernel. Bash (default Linux) + Zsh (default macOS) phổ biến nhất.

### Pipe + redirect

2 feature mạnh nhất Shell:

| Symbol | Name | Use | Example |
|------|------|------|------|
| `|` | Pipe | Output trước → input sau | `cat log | grep ERROR` |
| `>` | Output redirect | Write file (overwrite) | `echo "hello" > file.txt` |
| `>>` | Append | Append cuối file | `echo "world" >> file.txt` |
| `<` | Input redirect | Read từ file | `wc -l < file.txt` |
| `2>` | Error redirect | Error vào file | `cmd 2> error.log` |
| `2>&1` | Merge output | Error + normal merge | `cmd > all.log 2>&1` |

### Environment variables

```bash
# View hết
env

# View 1 var
echo $PATH
echo $HOME

# Set tạm (chỉ current shell)
export API_KEY="abc123"

# Set permanent (write config file)
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc   # Apply
```

| Common | Meaning | Example |
|---------|------|--------|
| `$PATH` | Command search path | `/usr/local/bin:/usr/bin:/bin` |
| `$HOME` | User home | `/home/hoang` |
| `$USER` | Current username | `hoang` |
| `$PWD` | Current dir | `/var/log` |
| `$SHELL` | Current shell | `/bin/bash` |

### Shell script

Multi command vào file → script:

```bash
#!/bin/bash
# deploy.sh

APP_DIR="/opt/myapp"
LOG_FILE="/var/log/deploy.log"

echo "$(date) - Starting deploy..." >> $LOG_FILE

# Pull latest
cd $APP_DIR && git pull origin main

# Install deps
npm install --production

# Restart service
pm2 restart myapp

echo "$(date) - Deploy done" >> $LOG_FILE
```

```bash
chmod +x deploy.sh
./deploy.sh
```

::: tip Debug script
Đầu script `set -ex`: `-e` script gặp error thoát ngay, `-x` print mỗi command execute. Standard cho production script.
:::

---

## 5. Practical scenarios

### 5.1 Log debug

Service issue → reflex đầu tiên: xem log.

```bash
# 1. Live tracking (hay dùng nhất)
tail -f /var/log/app/error.log

# 2. Search time range error
grep "2024-01-15 14:" error.log | grep "ERROR"

# 3. Stats error/hour
grep "ERROR" app.log | awk '{print substr($1,1,13)}' | uniq -c

# 4. Last 100 lines
tail -100 app.log

# 5. Search multiple file
grep -r "OutOfMemory" /var/log/app/
```

### 5.2 Process check

App freeze, CPU spike, memory leak — từ process:

```bash
# CPU top
ps aux --sort=-%cpu | head -10

# Memory top
ps aux --sort=-%mem | head -10

# Find specific
ps aux | grep "node"

# Detail (kèm thread)
top -Hp <PID>

# Files opened by process
lsof -p <PID>

# Graceful terminate (SIGTERM)
kill <PID>

# Force kill (SIGKILL, last resort)
kill -9 <PID>
```

### 5.3 Network diagnosis

Service connect không được? Network hay app?

```bash
# Ping target
ping -c 4 google.com

# Check port open
telnet db-server 3306
# Hoặc nc
nc -zv db-server 3306

# Port machine listening
ss -tlnp
# Hoặc
netstat -tlnp

# DNS resolve
dig api.example.com
nslookup api.example.com

# Test HTTP
curl -v http://localhost:3000/health

# Network connection stats
ss -s
```

### 5.4 Disk space

Disk full = fault prod common nhất:

```bash
# Partition usage
df -h

# Find biggest dir
du -sh /* 2>/dev/null | sort -rh | head -10

# Drill down
du -sh /var/log/* | sort -rh | head -10

# Find big file (>100MB)
find / -type f -size +100M 2>/dev/null | head -20

# Cleanup
# Old log
sudo journalctl --vacuum-size=500M
# Docker
docker system prune -a
```

::: tip Prod debug formula
**"Log first, process second, network third, disk fourth"**. 90% prod issue locate được qua 4 step. Habit này = efficiency tăng vọt.
:::

---

## Tổng kết

Linux = must skill cho dev. Master basics = handle đa số daily dev + ops.

1. **Everything is file**: Linux dùng file abstract unify access hardware, process, network
2. **Command combo**: single command đơn giản, qua pipe `|` mới power thật
3. **Permission**: Owner/Group/Others × R/W/E, dùng số (755) set nhanh
4. **Shell basics**: pipe, redirect, env var, script = automation foundation
5. **Debug practice**: log → process → network → disk

::: tip 2026 cho VN dev
- **Distro**:
  - **Ubuntu**: phổ biến nhất, easy
  - **Debian**: stable, server
  - **Alpine**: lightweight, container
  - **Rocky/Alma Linux**: thay CentOS legacy
- **VN context**:
  - VPS giá rẻ VN: BKHost, Vietnix, AzDigi
  - International: DigitalOcean, Vultr, Hetzner
- **Modern tools 2026**:
  - **bat**: thay `cat`, syntax highlight
  - **fd**: thay `find`, faster + simple
  - **ripgrep (rg)**: thay `grep`, faster
  - **eza**: thay `ls`, color + icon
  - **fzf**: fuzzy finder magic
  - **zoxide**: smart `cd`
- **WSL2**: Linux trên Windows, mainstream cho VN dev
:::

## Tài liệu

- [Linux man pages](https://man7.org/linux/man-pages/)
- [The Linux Command Line](https://linuxcommand.org/tlcl.php)
- [Linux Journey](https://linuxjourney.com/)
- [explainshell.com](https://explainshell.com/)
