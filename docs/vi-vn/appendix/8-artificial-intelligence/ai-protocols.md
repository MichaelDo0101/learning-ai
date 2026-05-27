# AI Agent Protocol (MCP & A2A)

::: tip Core
**AI Agent "đối thoại" với thế giới ngoài thế nào?** Như Internet cần HTTP, AI Agent cần protocol chuẩn. Chương này giới thiệu 2 protocol mainstream: MCP + A2A, giải bài toán AI-tool và Agent-Agent communication.
:::

---

## 0. Protocol là gì?

**Protocol** = bộ rule chuẩn cho các system/program "hiểu" + "communicate" nhau.

### 0.1 Sao cần protocol?

Tưởng gửi quà cho bạn cần điền địa chỉ. Nếu mỗi người viết format khác, shipper không giao được. Protocol = chuẩn "viết địa chỉ thế nào".

Computer cũng vậy. 2 program communicate phải agree:
- Data format gì? (JSON? binary?)
- Lập connection thế nào? (handshake)
- Lỗi thì sao? (error handling)

### 0.2 Protocol thường gặp

| Protocol | Use | Bạn dùng hàng ngày |
|------|------|-------------|
| **HTTP** | Web transfer | Browser mở web |
| **HTTPS** | HTTP encrypt | Banking, payment |
| **TCP/IP** | Internet base | Mọi network communication |
| **DNS** | Domain resolve | `google.com` → IP |
| **SMTP** | Send email | Gửi mail |
| **WebSocket** | Realtime 2-way | Chat, online game |
| **SSH** | Remote login secure | Connect server |
| **FTP** | File transfer | Upload/download |

Đây là nền tảng Internet. Không có chúng = không xem web, không gửi mail.

### 0.3 Giá trị protocol

Core value: **standardization + interoperability**.
- **Standardization**: cùng rule, giảm chi phí communicate
- **Interoperability**: vendor/stack khác nhau seamless integrate

Vd HTTP: Chrome access Nginx server, Python crawler crawl Java website. Chrome + Nginx không cần "biết nhau", chỉ cần đều theo HTTP.

### 0.4 AI Agent cũng cần protocol

AI Agent muốn "làm việc" cần:
- Gọi external tool (xem thời tiết, gửi mail, op DB)
- Cộng tác Agent khác (chia việc, làm task phức tạp)

Cần protocol chuẩn cho "AI gọi tool", "Agent đối thoại". Đây là nguồn gốc **MCP** + **A2A**.

---

## 1. Layer của Agent protocol

| Layer | Protocol | Vấn đề | Ẩn dụ |
|------|------|-----------|------|
| **1** | Function Call | AI gọi local function thế nào | Não phát lệnh |
| **2** | **MCP** | AI connect external tool/data | Cổng USB-C |
| **3** | **A2A** | Agent communicate Agent | Slack/Teams nội bộ |

::: tip Đọc table
**Layer 1 (Function Call)**: capability LLM cơ bản — output JSON trigger function. Là "nền protocol", nhưng giống capability hơn standard protocol.

**Layer 2 (MCP)**: Model Context Protocol, Anthropic release 2024-11. Chuẩn hoá cách AI connect external tool + data, như USB-C thống nhất cổng sạc.

**Layer 3 (A2A)**: Agent-to-Agent, Google release 2025-04. Cho các Agent discover-communicate-collaborate, như nội bộ enterprise.
:::

---

## 2. MCP (Model Context Protocol)

### 2.1 Info

| Item | Content |
|------|------|
| **Full** | Model Context Protocol |
| **Initiator** | Anthropic |
| **Release** | 2024-11-25 |
| **Docs** | [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **License** | MIT |
| **GitHub** | [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |

::: tip Sao gọi "Context Protocol"?
**Context** = key cho LLM hiểu task. Core idea MCP: **AI dynamically lấy context cần**, không phải nhét hết vào Prompt.

Vd AI cần đọc 1 file → không cần bạn copy-paste content, mà qua MCP access file system trực tiếp.
:::

### 2.2 Background

2024, với Claude 3.5 Sonnet, Anthropic phát hiện vấn đề: **mỗi tool phải tích hợp riêng**.

Tưởng:
- AI đọc GitHub repo → viết integration GitHub
- AI query DB → viết integration DB
- AI op file system → viết integration FS

Mỗi integration lặp code: auth, error, data transform...

Anthropic viết:
> "Introducing MCP, an open protocol that standardizes how applications provide context to LLMs."

**Mục tiêu**: tool dev viết 1 lần, mọi AI app support MCP đều dùng được.

### 2.3 MCP là gì?

<McpVisualDemo />

**3 capability core**:

| Capability | EN | Use | Vd |
|------|------|------|------|
| **Tools** | — | Function AI gọi | Query weather, send mail |
| **Resources** | — | Data AI đọc | File content, DB record |
| **Prompts** | — | Template prompt | Code review, writing template |

### 2.4 MCP internal

<McpDetailedDemo />

### 2.5 Ẩn dụ: USB-C

MCP như **USB-C**:
- **Trước**: mỗi device 1 cổng (tròn, dẹt, magnetic...)
- **Giờ**: USB-C thống nhất sạc + transfer
- **MCP**: thống nhất cách AI connect mọi tool

Tool dev implement 1 lần MCP Server, mọi AI app support MCP (Claude, Cursor, Windsurf) đều dùng.

### 2.6 MCP scenario

| Scenario | Note | Vd |
|------|------|------|
| **Local file** | AI đọc/sửa local file | Đọc codebase, phân tích log |
| **DB query** | AI query DB trực tiếp | SQL, data analysis |
| **API call** | AI gọi 3rd party | GitHub API, Slack, mail |
| **Dev tool** | AI dùng dev tool | Git, terminal |

**Case thực**:
- **Cursor/Windsurf**: MCP connect FS, Git, terminal
- **Claude Desktop**: MCP connect note app, mail
- **Auto script**: AI execute auto task (backup, deploy, sync)

---

## 3. A2A (Agent-to-Agent Protocol)

### 3.1 Info

| Item | Content |
|------|------|
| **Full** | Agent-to-Agent Protocol |
| **Initiator** | Google |
| **Release** | 2025-04-09 |
| **Docs** | [google.github.io/A2A](https://google.github.io/A2A) |
| **License** | Apache 2.0 |
| **GitHub** | [github.com/google/A2A](https://github.com/google/A2A) |

::: tip Sao Google?
Google release A2A tại Cloud Next 2025, liên quan enterprise AI strategy.

Google nghĩ: tương lai enterprise AI không phải 1 super-Agent, mà **nhiều specialized Agent collaborate** — có cái data analysis, có cái code gen, có cái doc process.

Cần standard communicate.
:::

### 3.2 Background

MCP giải "AI connect tool", còn: **multi-Agent cộng tác thế nào?**

Vd:
- Agent A: requirements analyst
- Agent B: code gen
- Agent C: test

User: "Build login function"

A phân tích req → assign B; B viết code → cho C test. Communicate thế nào?

Google:
> "A2A is an open protocol that enables AI agents to communicate with each other, facilitating collaboration across different frameworks and vendors."

**Mục tiêu**: Agent khác vendor/framework seamless collaborate.

### 3.3 A2A là gì?

<A2AVisualDemo />

**3 core concept**:

| Concept | EN | Use | Ẩn dụ |
|------|------|------|------|
| **Agent Card** | — | Mô tả capability | Thẻ nhân viên |
| **Task** | — | Đơn vị công việc | Ticket |
| **Message** | — | Nội dung communicate | Chat log |

### 3.4 A2A internal

<A2ADetailedDemo />

### 3.5 Ẩn dụ: Slack/Teams nội bộ

A2A như **Slack nội bộ**:
- **Agent Card**: thẻ mỗi người, name + dept + role
- **Send task**: @ai đó, assign task
- **Chat**: trong task có thể chat
- **Task tracking**: thấy progress + status

Agent khác = đồng nghiệp khác, A2A cho collaborate project phức tạp.

### 3.6 A2A scenario

| Scenario | Note | Vd |
|------|------|------|
| **Software dev** | Multi-Agent dev | Req → code → test → deploy |
| **Enterprise workflow** | Dept khác Agent collaborate | HR + Finance + Legal Agent |
| **Smart CS** | Specialized Agent chia việc | Greet → answer → escalate → record |
| **Data analysis** | Multi-Agent | Collect → clean → analyze → visualize → report |

**Case**:
- **Google Agent Space**: multi-Agent xử doc, mail, calendar
- **Dev team**: Req → Code → Test → Deploy Agent
- **CS system**: Greet → Specialist → Human escalate Agent

---

## 4. MCP vs A2A

### 4.1 Khác biệt

| Dim | MCP | A2A |
|------|-----|-----|
| **Initiator** | Anthropic (2024.11) | Google (2025.04) |
| **Position** | AI ↔ Tool | Agent ↔ Agent |
| **Scope** | Client-Server | Peer-to-Peer |
| **Format** | JSON-RPC 2.0 | HTTP + JSON |
| **Ẩn dụ** | USB-C | Slack |

### 4.2 Quan hệ

MCP + A2A **không phải cạnh tranh, mà bổ sung**:

<ProtocolComparisonDemo />

### 4.3 Chọn?

| Scenario | Chọn |
|------|------|
| AI gọi local function/tool | Function Call |
| Dùng 3rd party tool (DB, API, FS) | MCP |
| Build multi-Agent collaborative system | A2A |
| Cần cả tool integration + multi-Agent | MCP + A2A |

---

## 5. Tương lai

### 5.1 Ecosystem

**MCP** (đến 2026):
- Official Server: FS, SQLite, Git, PostgreSQL
- Community: Slack, Notion, Figma, Stripe
- App support: Claude Desktop, Cursor, Windsurf, Zed, Cline

**A2A** (mới ra):
- Google Agent products đầu tiên support
- Open source SDK đang phát triển
- Enterprise đang khám phá

### 5.2 Standardization

Hiện Agent protocol đang "thời chiến quốc":
- MCP + A2A mainstream
- Còn ANP, AGP và mới khác
- Tương lai có thể merge/unify

Như Internet:
- Sớm: nhiều LAN protocol
- Sau: TCP/IP standard
- Giờ: Agent protocol có thể đi tới unify

---

## 6. Tóm tắt

::: tip Key
| Protocol | 1 câu | Release | Initiator | Use |
|------|-----------|---------|--------|---------|
| **MCP** | "USB-C" cho AI ↔ Tool | 2024.11 | Anthropic | Tool integration |
| **A2A** | "Slack" cho Agent collaboration | 2025.04 | Google | Multi-Agent |

**Insight**:
1. MCP giải "AI lấy external capability"
2. A2A giải "Multi-AI collaborate"
3. Bổ sung, tương lai có thể merge
4. Chọn theo scenario, không có silver bullet
:::

::: tip 2026 cho VN dev
- **MCP tăng tốc dữ dội**: 500+ MCP server công khai trên GitHub
- **Claude Code + MCP**: pipeline AI dev hiện đại
- **A2A vẫn nascent**: chưa nhiều case thực, theo dõi Google
- **Cursor + MCP**: setup MCP server cho project = boost productivity
- **Bài tập**: viết 1 MCP server đơn giản đọc Notion DB
:::

---

## Tài liệu

1. **MCP**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
2. **MCP GitHub**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
3. **Anthropic blog**: "Introducing MCP" (2024-11-25)
4. **A2A**: [google.github.io/A2A](https://google.github.io/A2A)
5. **A2A GitHub**: [github.com/google/A2A](https://github.com/google/A2A)
6. **Google Cloud blog**: "Announcing A2A" (2025-04-09)
