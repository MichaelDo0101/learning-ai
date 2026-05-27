# Phát triển remote trên mobile với Claude Code

::: tip Cập nhật 5/2026
- **Claude iOS app** (Anthropic official) đã có Claude Code mode native, support Pro plan
- **Claude Android app** ra Q1/2026, parity với iOS
- **Cursor mobile** (Q4/2025) — alternative cho user không dùng Anthropic
- **Termius + Claude Code** combo dùng được trên iPhone/iPad/Android
- **Tailscale free tier 3 device** vẫn phổ biến nhất cho self-hosted setup
:::

## Mở đầu

Hãy tưởng tượng scenario: bạn đang đi metro chợt nghĩ ra giải pháp tuyệt cho fix bug; bạn ở quán cafe đang xếp hàng nhận thông báo incident online; bạn đi shopping với bạn gái muốn xem progress project AI đang build.

Mode dev truyền thống, các scenario này nghĩa là phải tìm chỗ mở laptop, hoặc đành hoãn việc. Nhưng thời AI-assisted coding, rules đã thay đổi. Claude Code cho phép bỏ env dev vào túi, giữ productivity mọi lúc mọi nơi.

Mùa hè 2025, Claude Code phổ biến, dev bắt đầu khám phá các phương án "mobile coding". Từ Termux local đơn giản, đến SSH + Tailscale remote phức tạp, đến app dedicated Happy Coder, 1 ecosystem mobile dev hoàn chỉnh dần hình thành.

Chương này giải core: cho Claude Code đi theo điện thoại bạn, trở thành "trợ lý dev bỏ túi" thực sự.

---

::: info 💡 Tóm tắt feedback cộng đồng

Theo feedback user thực:

**Happy Coder (phương án 2)**
- ⚠️ Vấn đề stability: hay disconnect, mất context khi disconnect
- ⚠️ Function hạn chế: không dùng được lệnh `/`
- ⚠️ Quan ngại security: phụ thuộc relay server official

**HAPI (phương án 3)**
- ✅ Self-host server: deploy được trên VPS riêng
- ✅ Pairing với Tailscale tốt hơn: PC chạy `hapi server`, mobile connect qua Tailscale IP
- ✅ Connection tương đối ổn định, phù hợp dùng lâu

**Claude Remote Control (phương án official)**
- ✅ Official, tích hợp native với Claude Code
- ✅ Support truy cập env local đầy đủ (MCP, tool, project config)
- ⚠️ Cần Max subscription (Pro sắp support)
- ⚠️ Phụ thuộc cloud service Anthropic

**Đề xuất**: yêu cầu cao stability hoặc lo security relay bên thứ 3 → chọn **HAPI + Tailscale** hoặc **Remote Control official**.
:::

---

## Nguyên lý core: pattern kiến trúc mobile dev

### Tại sao mobile dev là vấn đề?

IDE truyền thống (VS Code, IntelliJ) cần env OS đầy đủ, CPU mạnh, nhiều memory và storage. Mobile tuy performance ngày càng mạnh, vẫn có giới hạn tự nhiên về trải nghiệm dev:

**Hạn chế input**: keyboard ảo gõ code hiệu suất thấp, syntax phức tạp dễ sai

**Hạn chế màn hình**: màn nhỏ khó cùng lúc xem code, terminal và browser

**Hạn chế env**: mobile không chạy được toolchain dev đầy đủ (compiler, database, debugger)

**Hạn chế connection**: mobile network không ổn định, SSH connect dễ disconnect

### Ý tưởng core: kiến trúc thin client

Core ý tưởng của tất cả phương án mobile dev: mobile chỉ là "console", công việc dev thực sự làm ở chỗ khác.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │  Mobile     │              │ Host/Cloud  │             │
│    │ (Control)   │  ────────►   │ (Execute)   │             │
│    │             │  Cmd/Result  │             │             │
│    │ • Input cmd │              │ • Run CLI   │             │
│    │ • View out  │              │ • Exec code │             │
│    │ • Review    │              │ • Access fs │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Kiến trúc này cho mobile chỉ lo "tương tác người-máy", giao công việc tính toán nặng cho host hoặc cloud.

---

## Phương án 1: iOS official App (Anthropic)

Tháng 10/2025, Anthropic chính thức ra Claude Code mode trong Claude iOS App, đây là phương án mobile dev đơn giản nhất.

### Truy cập từ VN

VN truy cập Claude.ai và Claude App được không cần proxy.

### Nguyên lý hoạt động

```
┌─────────────┐                    ┌─────────────────┐
│  iOS App    │ ──────────────────► │  Cloud Anthropic │
│  (Mobile)   │   HTTPS + OAuth     │  Claude Code     │
└─────────────┘                    └────────┬─────────┘
                                            │
                                            ▼
                                  ┌──────────────────┐
                                  │  Sandbox env     │
                                  │  (managed)       │
                                  └──────────────────┘
```

Claude iOS App connect tới sandbox env quản lý bởi Anthropic, có thể:
- Đọc/ghi file trong sandbox
- Execute lệnh bash
- Install package npm/pip
- Run dev server (preview qua tunnel)

### Cài và dùng

1. Download Claude App từ App Store (iOS) hoặc Play Store (Android, Q1/2026)
2. Login với Anthropic account
3. Tap "Claude Code mode" trong menu
4. Tạo project mới hoặc connect GitHub repo
5. Bắt đầu chat-driven dev

### Lợi ích

- Setup zero, dùng ngay
- UI optimized cho mobile
- Tích hợp với Anthropic ecosystem
- Sync với Claude.ai (start ở mobile, tiếp ở web)

### Hạn chế

- Cần Anthropic Pro/Max subscription
- Sandbox limited (không có ML lib lớn, không có Docker)
- Phụ thuộc cloud (latency)
- Không truy cập filesystem local

---

## Phương án 2: Happy Coder (community)

Happy Coder là app bên thứ 3 phổ biến cho mobile coding với Claude Code.

### Đặc điểm

- App iOS/Android
- Connect tới relay server (official Happy hoặc self-host)
- Backend chạy Claude Code trên VPS hoặc PC bạn
- UI mobile-optimized

### Setup

**Trên PC (server)**:

```bash
# Cài Happy Coder server
npm install -g happy-coder-server

# Khởi động
happy-coder-server --port 3000
```

**Trên mobile**:

1. Download Happy Coder app
2. Scan QR code từ server PC để pair
3. Bắt đầu chat-driven dev

### Nhược điểm thật

Theo feedback community:
- Hay disconnect, sau disconnect mất context
- Không dùng được lệnh `/` (như `/init`, `/compact`)
- Phụ thuộc relay server official → quan ngại data privacy

---

## Phương án 3: HAPI + Tailscale (self-hosted)

HAPI (Headless API for Claude Code) là tool self-host cho mobile remote control.

### Setup

**Bước 1: cài HAPI trên PC**

```bash
npm install -g hapi-claude
hapi server --port 8080
```

**Bước 2: setup Tailscale**

Tailscale tạo VPN private giữa device của bạn, không cần expose public IP.

1. Cài Tailscale trên PC: `brew install tailscale && sudo tailscale up`
2. Cài Tailscale app trên mobile
3. Login cùng account → device cùng mạng Tailscale
4. Lấy Tailscale IP của PC: `tailscale ip` (ví dụ `100.64.1.5`)

**Bước 3: connect từ mobile**

Mobile browser → `http://100.64.1.5:8080`

Hoặc dùng HAPI mobile app, nhập Tailscale IP.

### Lợi ích

- Self-host, không phụ thuộc bên thứ 3
- Truy cập filesystem PC đầy đủ
- Tailscale free tier 3 device đủ cho cá nhân
- Connection ổn định (Tailscale ổn hơn relay server)

### Khi nào dùng

- Bạn có PC stable luôn online (desktop hoặc home server)
- Lo data privacy
- Cần truy cập env dev đầy đủ từ mobile

---

## Phương án 4: SSH + Termius / Termux

Phương án cổ điển nhưng vẫn dùng tốt.

### Setup

**Bước 1: setup SSH server trên VPS hoặc PC**

```bash
# VPS Ubuntu
sudo apt install openssh-server
sudo systemctl enable ssh

# Hoặc dùng Tailscale SSH (không cần expose port)
tailscale up --ssh
```

**Bước 2: cài SSH client trên mobile**

- iOS: **Termius** (free tier, beautiful UI) hoặc **Blink Shell** (paid, mạnh)
- Android: **Termius** hoặc **Termux** (cũng chạy linux env native)

**Bước 3: connect và run Claude Code**

```bash
# Trên mobile SSH client
ssh user@your-server
cd your-project
claude
```

### Tips cho mobile SSH

1. **Tmux**: dùng tmux để session persist khi disconnect
   ```bash
   tmux new -s claude
   claude
   # Disconnect mobile, claude vẫn chạy
   # Reconnect: tmux attach -t claude
   ```

2. **Snippet trong Termius**: lưu các lệnh phổ biến để tap thay vì gõ
3. **Mosh** thay SSH: handle mạng kém tốt hơn (`mosh user@server`)
4. **Voice input**: dùng dictation iOS/Android để input prompt dài

### Lợi ích

- Stable nhất
- Truy cập env Linux đầy đủ
- Free (trừ VPS cost)
- Dùng được mọi version Claude Code

### Hạn chế

- UI terminal trên mobile không thân thiện
- Cần biết SSH/tmux basics
- Cần VPS hoặc PC always-on

---

## Phương án 5: Termux native (Android)

Termux cho Android cho phép chạy Claude Code **native trên điện thoại**.

### Setup

```bash
# Trong Termux
pkg update
pkg install nodejs git

# Cài Claude Code
npm install -g @anthropic-ai/claude-code

# Verify
claude --version

# Setup auth (API key hoặc OAuth)
claude
```

### Lợi ích

- Native, không phụ thuộc server
- Offline khi cài xong (trừ API call)
- Free hoàn toàn

### Hạn chế

- Chỉ Android (Termux không có cho iOS)
- Mobile CPU/RAM giới hạn project size
- Battery drain khi chạy lâu
- Storage giới hạn

### Khi nào dùng

- Bạn dùng Android
- Project nhỏ (script, prototype)
- Cần truly portable (offline capable)

---

## Phương án 6: Claude Remote Control (official)

Mới ra Q1/2026. Anthropic official cho Claude.ai mobile control Claude Code trên PC bạn.

### Setup

**Bước 1: trên PC** — enable Remote Control

```bash
claude --enable-remote
# Show pairing code
```

**Bước 2: trên mobile** — pair với code

1. Mở Claude.ai mobile app
2. Settings → Remote Control → "Pair device"
3. Nhập pairing code
4. Confirm

### Lợi ích

- Official, tích hợp tự nhiên
- Truy cập env local PC đầy đủ
- MCP, tool, project config tự sync
- Auth qua Anthropic OAuth (secure)

### Hạn chế

- Cần Max subscription (Pro support coming)
- Cần PC online
- Phụ thuộc cloud Anthropic làm middleman

---

## So sánh các phương án

| Phương án | Setup | Stability | Privacy | Cost | Phù hợp |
|---|---|---|---|---|---|
| **iOS official App** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $20-100/tháng | Casual user |
| **Happy Coder** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | Free | Try-out |
| **HAPI + Tailscale** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free | Privacy-conscious |
| **SSH + Termius** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free | Dev senior |
| **Termux native** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free | Android user |
| **Remote Control** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Max ($100/tháng) | Power user |

---

## Use case thực tế

### Use case 1: fix incident urgent

Bạn đang ăn tối, nhận alert PagerDuty. Mở Claude iOS app:
```
Incident report PD-12345 fired. 
Check Sentry, identify root cause, propose hotfix.
Don't deploy — chỉ propose.
```

Claude analyze, propose. Bạn approve, về nhà deploy.

### Use case 2: continuous learning

Đi metro 30 phút. Mở app:
```
Explain new React 19 use() hook with example.
Show migration path from useEffect.
```

Học trong khi commute.

### Use case 3: capture idea

Đang shower, idea bất chợt:
```
Idea: dashboard tracker thói quen với heatmap kiểu GitHub.
Generate spec markdown trong specs/habit-tracker.md.
```

Sau ngồi PC dev tiếp.

### Use case 4: code review on-the-go

Notification: "PR #234 needs review". Mở app:
```
Review PR #234. Focus on security and performance.
```

Comment qua Claude, merge nếu OK.

### Use case 5: long-running task monitoring

Setup overnight Ralph loop ở PC, check progress từ mobile:
```
Check progress của task overnight-refactor.
Show diff summary và test status.
```

---

## Best practice 2026

### 1. Setup multi-device từ đầu

Setup từ đầu để dùng được mọi nơi:
- PC: full env dev
- Tablet (iPad/Android tablet): code review, light edit
- Phone: chat, command, monitor

### 2. Voice input cho prompt dài

iOS: bấm và giữ mic icon → dictate
Android: tương tự + có Google Voice typing
Note: prompt voice thường rõ và concise hơn typing!

### 3. Snippet phổ biến

Save snippet trong Termius/Blink:
- `git status && claude "review my changes"`
- `cd ~/project && tmux attach || tmux new -s work`
- `claude "/init"`

### 4. Battery management

- Disable background app refresh cho Claude app
- Dùng dark mode (OLED screens)
- Tắt notification khi không cần
- Charge khi ngồi (mobile coding tốn battery)

### 5. Security

- Dùng biometric lock cho Claude app
- Enable 2FA cho Anthropic account
- Tailscale ACL: chỉ allow connect từ device cụ thể
- Audit log cho lệnh dangerous

### 6. Network resilience

- Tmux/screen cho session persist
- Mosh thay SSH cho mạng kém
- Cache prompt phổ biến offline
- Sync khi có WiFi tốt, defer khi mobile data

---

## Câu hỏi thường gặp

### Q1: Mobile dev có thay PC không?

Không. Mobile dev là **complement**, không **replace**. Vẫn cần PC cho:
- Big refactor
- Multi-file edit
- Visual design
- Long debugging session
- Performance profiling

Mobile tốt cho:
- Quick fix
- Code review
- Capture idea
- Monitor long task
- Learning during commute

### Q2: Bao nhiêu data 4G/5G consume?

Claude Code chủ yếu text → ~1-5 MB/giờ active use. Rất ít vs streaming video. 1GB data plan đủ ~200h dev.

### Q3: Latency từ VN tới Anthropic?

- US-East: ~250-300ms
- Singapore (qua mirror): ~100-150ms
- Anthropic chưa có endpoint VN riêng (Q2/2026 expect)

Latency này OK cho text chat, hơi sluggish cho streaming output.

### Q4: Offline mode?

- iOS app: không (cần internet)
- Termux native: được (sau cài xong, vẫn cần API key valid)
- HAPI offline: chỉ local network, không call Anthropic API offline

### Q5: Cost mobile vs PC?

Cùng tier subscription (Pro $20/Max $100). Mobile không tốn extra. Nếu dùng API pay-as-you-go, mobile session thường ngắn hơn → cost thấp hơn PC dev session.

## Tài liệu tham khảo

- [Claude iOS app](https://claude.com/mobile)
- [Tailscale Setup Guide](https://tailscale.com/kb/1017/install)
- [Termius](https://termius.com/)
- [Blink Shell](https://blink.sh/)
- [Happy Coder](https://github.com/happy-coder/happy-coder)
- [HAPI](https://github.com/hapi-claude/hapi)

---

# Phụ lục: Mobile dev 2026

## A. Trend Q1-Q2 2026

- **Anthropic ra Android app official**: parity feature với iOS, March 2026
- **Cursor mobile** (Q4/2025): web-based, work mọi browser mobile
- **Replit Mobile** improved: AI agent native trên app
- **GitHub Mobile + Copilot Mobile**: code review + simple edit từ mobile
- **VS Code Server mobile-optimized**: cho self-host

## B. Stack đề xuất theo persona

| Persona | Stack |
|---|---|
| **Casual user, iPhone** | Claude iOS app + Claude.ai web |
| **Power user, Android** | Termux + Tailscale + Claude Code |
| **Privacy hawk** | Self-host server + HAPI + Tailscale |
| **Cross-platform team** | Cursor mobile (web) + GitHub Codespaces |
| **Enterprise** | VS Code Server self-host + SSO + audit |

## C. Workflow Việt Nam

VN dev thường gặp:
- Commute Hà Nội-SG metro: 30-60 phút dev mobile được
- Cafe network unstable: mobile thường stable hơn cafe wifi
- Working from coffee shop trend: tablet + bluetooth keyboard = mini-desk

Đề xuất stack cho VN dev:
- iPhone/iPad + Apple Pencil cho thinking/sketch
- Claude iOS app cho quick task
- VPS Hetzner ($5/tháng) chạy HAPI/Tailscale cho heavy work
- Cafe network → fallback 4G nếu wifi rớt

## D. Future: AR/VR coding?

Apple Vision Pro + Meta Quest có thử AR coding nhưng chưa mature. 2026 vẫn chủ yếu screen-based. Có thể 2027-2028 mới mainstream.

## Sources

- [Anthropic Claude mobile](https://claude.com/mobile)
- [Tailscale docs](https://tailscale.com/kb/)
- [Termux wiki](https://wiki.termux.com/)
- [Happy Coder community](https://github.com/happy-coder)
