# Claude Code MCP: hướng dẫn đầy đủ

::: tip Cập nhật 5/2026
- **MCP đã thành chuẩn ngành** — không chỉ Claude Code, mà Cursor, Windsurf, Zed, Continue, Cline đều support MCP client native.
- **MCP Registry official** từ Anthropic ([registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)) là "app store" cho MCP server, hơn **3000 server** đã list.
- **Smithery** (smithery.ai) và **MCP.so** là 2 marketplace cộng đồng lớn nhất, có rating, review, 1-click install.
- **OAuth 2.1 cho remote MCP** đã chuẩn hoá → dễ dàng tích hợp SaaS (Notion, Linear, GitHub Enterprise) không cần manage token tay.
- **Skill > MCP cho 1 số case**: Anthropic giới thiệu Skills (`~/.claude/skills/`) thường rẻ và nhanh hơn MCP cho task không cần API external. Xem [Claude Code Skills guide](/vi-vn/stage-3/core-skills/skills/).
:::

## Claude Code MCP là gì?

**Claude Code** là CLI tool AI chính thức của Anthropic, và **MCP (Model Context Protocol)** là protocol cho Claude Code kết nối với tool và service external.

Đơn giản: MCP biến Claude Code từ 1 trợ lý AI "chỉ đọc-ghi file local" thành 1 super assistant "truy cập được GitHub, database, API, cloud service"!

## Tại sao cần dùng MCP trong Claude Code?

### Claude Code không có MCP

```
Bạn làm được:
✓ Đọc file local
✓ Edit code
✓ Chạy lệnh
✓ Dùng tool Bash

Bạn không làm được:
✗ Xem GitHub Issues của bạn
✗ Truy cập cloud database
✗ Call API external
✗ Lấy thời tiết real-time
```

### Claude Code có MCP

```
Bạn làm được:
✓ Tất cả function cũ
✓ Xem/tạo GitHub Issues và PR
✓ Query database SQLite, PostgreSQL
✓ Truy cập Notion, Slack và service external
✓ Lấy thời tiết, data map real-time
✓ Tự động hoá browser
✓ ...và nhiều hơn nữa!
```

## Bắt đầu nhanh

### Bước 1: hiểu vị trí file config

File config MCP của Claude Code nằm ở:

| Level | Path file config | Scope |
|-----|-------------|----------|
| **User** | `~/.claude.json` | Mọi project |
| **Project** | `.claude/mcp.json` | Project hiện tại |

Khuyến nghị ưu tiên **config level project**, cho mỗi project dùng MCP service khác nhau.

### Bước 2: dùng ngôn ngữ tự nhiên add MCP server

Trong Claude Code, bạn không cần edit config tay hay nhớ lệnh, chỉ cần mô tả bằng ngôn ngữ tự nhiên:

```
Bạn: thêm giúp tôi GitHub MCP server, token tôi là ghp_xxx

Claude: tôi sẽ config GitHub MCP server...

[Tự update .claude/mcp.json]
```

```
Bạn: thêm 1 SQLite database server, file DB ở ./data/app.db

Claude: ok, tôi config SQLite MCP server...
```

```
Bạn: thêm 1 MCP server kiểu HTTP, URL là https://api.example.com/mcp

Claude: tôi thêm remote MCP server này...
```

### Bước 3: verify config

Hỏi thẳng Claude Code:

```
Bạn: giờ có những MCP server nào available?

Claude: MCP server hiện đã config:
• github - GitHub integration
• sqlite - SQLite database
• filesystem - truy cập filesystem
```

Hoặc dùng lệnh chẩn đoán:

```
/doctor
```

### Bước 4: bắt đầu dùng

Sau config thành công, call function MCP bằng ngôn ngữ tự nhiên:

```
Bạn: giúp tôi tạo 1 Issue trên GitHub

Claude: tôi giúp bạn tạo GitHub Issue. Cho tôi biết:
- Repo (như owner/repo)
- Title Issue
- Description Issue
```

## Quản lý ngôn ngữ tự nhiên của Claude Code

### Xem và quản lý MCP server

Bạn có thể tương tác với Claude Code hoàn toàn bằng ngôn ngữ tự nhiên:

```
Bạn: list tất cả MCP server đã config

Bạn: check trạng thái connect của MCP server

Bạn: xoá MCP server notion

Bạn: update token của github server
```

### Chẩn đoán vấn đề

Khi gặp vấn đề:

```
Bạn: check giúp tôi MCP connect có vấn đề gì

Claude: [tự động chạy chẩn đoán, phân tích file config, check trạng thái server]
```

## Chi tiết các cách config

### Config level user (global)

Edit `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Config level project (khuyến nghị)

Edit `.claude/mcp.json` ở root project:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**Lợi ích config level project:**
- Member team share được config (commit vào Git)
- Mỗi project dùng MCP service khác nhau
- Config linh hoạt hơn, không pollute global setting

### Config transport

Claude Code hỗ trợ 3 cách transport:

#### STDIO (local process)

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP (remote service)

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE (server-sent events)

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## Ví dụ thực chiến

### Ví dụ 1: tự động hoá workflow GitHub

```
Bạn: push thay đổi hiện tại lên GitHub, rồi tạo 1 PR, title là "thêm feature mới"

Claude:
1. Check trạng thái git hiện tại...
2. Tạo branch mới feature/new-feature...
3. Commit thay đổi...
4. Push lên remote...
5. Call github_create_pull_request tạo PR...
6. PR đã tạo: https://github.com/owner/repo/pull/123
```

### Ví dụ 2: query database

```
Bạn: query 10 user đăng ký gần nhất trong database

Claude:
1. Connect tới SQLite database...
2. Execute query: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Trả kết quả:
   - Nguyễn Văn A (a@example.com) - 2026-02-28
   - Trần Thị B (b@example.com) - 2026-02-27
   ...
```

### Ví dụ 3: screenshot web và phân tích

```
Bạn: mở https://example.com và chụp màn hình, phân tích design page

Claude:
1. Khởi động browser...
2. Navigate tới https://example.com...
3. Chụp màn hình...
4. [Trả screenshot]
5. Phân tích design page:
   - Layout dùng design căn giữa, max-width 1200px
   - Màu chủ đạo là blue (#3b82f6)
   - Nav bar fixed ở top
   ...
```

### Ví dụ 4: tích hợp với Notion

```
Bạn: save ghi chú vừa rồi lên Notion

Claude:
1. Dùng Notion MCP server...
2. Tạo page mới...
3. Đã save: https://notion.so/page/xxx
```

## Mẹo debug

### Dùng ngôn ngữ tự nhiên chẩn đoán

Khi gặp vấn đề, nói thẳng với Claude Code:

```
Bạn: MCP server của tôi không connect được, check giúp

Bạn: GitHub MCP tool call fail, lý do là gì?

Bạn: tại sao sqlite server cứ hiện connecting?
```

Claude Code sẽ tự động:
1. Check format file config
2. Verify env var
3. Test connect server
4. Đưa gợi ý fix cụ thể

### Troubleshoot vấn đề phổ biến

| Vấn đề | Nguyên nhân có thể | Giải pháp |
|-----|---------|----------|
| Server chưa connect | Format file config sai | Check syntax JSON |
| Tool không call được | Permission không đủ | Check env var |
| Connect timeout | Vấn đề network | Check URL hoặc network |
| Process crash | Code server lỗi | Xem log server |

### Lệnh chẩn đoán tay

```
/doctor
```

Ví dụ output:
```
Báo cáo chẩn đoán hệ thống:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

Trạng thái MCP server:
• github: ✓ đã connect (12 tools)
• sqlite: ✗ connect fail - Database file not found
• puppeteer: ✓ đã connect (8 tools)

Đề xuất:
1. Check path database sqlite có đúng không
2. Đảm bảo format .claude/mcp.json đúng
```

## Best practice

### 1. Ưu tiên config level project

**Tại sao khuyến nghị config level project?**

Các project khác nhau thường cần MCP service khác nhau. Ví dụ, project frontend có thể cần tool test browser, còn project backend cần connect database. Dùng config level project cho mỗi project có MCP server set riêng, tránh lộn xộn của config global.

Quan trọng hơn, config level project có thể commit vào Git repo, member team clone project là dùng ngay cùng MCP service, không cần config lại.

```
Project A (frontend) → .claude/mcp.json gồm MCP test browser
Project B (backend) → .claude/mcp.json gồm MCP database
```

### 2. Info sensitive dùng env var

**Đừng bao giờ hardcode key trong file config!**

File config có thể vô tình commit vào Git repo, lộ key. Cách đúng: lưu info sensitive trong env var, file config chỉ reference tên var. Như vậy kể cả file config public, cũng không lộ key thật.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",  // ✓ Tốt - đọc từ env var
    "GITHUB_TOKEN": "ghp_abc123"       // ✗ Không tốt - hardcode key
  }
}
```

### 3. Lock version

**Tại sao cần lock version?**

Default `npx -y` luôn dùng version mới nhất của MCP server. Có thể gây vấn đề: version mới đưa breaking change, hoặc server bị remove/rename.

Qua thêm `@version` sau tên package, đảm bảo luôn dùng version cụ thể đã verify, tránh vấn đề bất ngờ do auto-update.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]  // Lock version
}
```

### 4. Document hoá MCP config của bạn

**Để member team nhanh hiểu MCP config**

Khi project có nhiều MCP server, member mới có thể không rõ tác dụng và yêu cầu config của mỗi server. Tạo 1 file `README.md` trong thư mục `.claude/`, mô tả tác dụng mỗi server, item config cần và cách lấy — giảm chi phí giao tiếp team đáng kể.

Tạo `.claude/README.md` trong project:

```markdown
# Mô tả MCP config

MCP server project này dùng:

## github
Dùng để tự động hoá thao tác GitHub, cần config GITHUB_TOKEN.

## sqlite
Connect tới ./data/app.db, dùng để query và sửa data.

## puppeteer
Dùng cho E2E test.
```

## Claude Code vs Claude Desktop

| Feature | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **File config** | `~/.claude.json` hoặc `.claude/mcp.json` | `claude_desktop_config.json` |
| **Config level project** | ✓ Hỗ trợ | ✗ Không hỗ trợ |
| **Quản lý ngôn ngữ tự nhiên** | ✓ Hỗ trợ | ✗ Cần edit tay |
| **Tool chẩn đoán** | ✓ `/doctor` | ✗ Không |
| **Hot reload** | ✓ Auto reload | ✗ Phải restart app |
| **Scenario phù hợp** | Workflow dev, CI/CD | Dùng hàng ngày, office |

## MCP server phổ biến

### GitHub server

**Function:** Issues, PR, quản lý repo

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Lấy Token:** https://github.com/settings/tokens

### SQLite server

**Function:** Query và quản lý database SQLite

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Filesystem server

**Function:** Truy cập file ở thư mục chỉ định

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Puppeteer automation browser

**Function:** Control browser, screenshot, automation test

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Brave search server

**Function:** Search web

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## Tài liệu tham khảo

### Doc official

- [Claude Code official doc - MCP](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [MCP official website](https://modelcontextprotocol.io/)
- [MCP spec doc](https://modelcontextprotocol.io/specification/)
- [MCP GitHub repo](https://github.com/modelcontextprotocol)

### Server official

- `@modelcontextprotocol/server-github` - GitHub integration
- `@modelcontextprotocol/server-sqlite` - SQLite database
- `@modelcontextprotocol/server-postgres` - PostgreSQL database
- `@modelcontextprotocol/server-filesystem` - Truy cập filesystem
- `@modelcontextprotocol/server-puppeteer` - Automation browser
- `@modelcontextprotocol/server-fetch` - Web scraping
- `@modelcontextprotocol/server-brave-search` - Brave search
- `@modelcontextprotocol/server-git` - Thao tác Git

### MCP server marketplace

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - list MCP server đầy đủ nhất
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - "app store" official Anthropic
- [MCP.so](https://mcp.so) - trung tâm MCP server cộng đồng
- [Glama.ai MCP](https://glama.ai/mcp/servers) - directory MCP có rating review
- [Smithery](https://smithery.ai) - marketplace MCP server
- [MCPHub](https://mcphub.io/registry) - directory UI gọn

---

# Phụ lục: MCP 2026 deep-dive

## A. Cập nhật MCP protocol 2026

**MCP 1.0 spec đã release** (Q1/2026) với các thay đổi quan trọng:

- **OAuth 2.1 cho remote MCP server**: chuẩn auth flow cho remote MCP, không cần manage token tay nữa. Notion, GitHub Enterprise, Linear, Salesforce MCP server đều support OAuth.
- **Resources + Prompts**: ngoài tool, MCP server giờ expose 3 loại primitive: tools (functions), resources (data), prompts (template). Cho AI agent context phong phú hơn.
- **Sampling**: server có thể request LLM completion qua client (reverse direction). Dùng cho server cần LLM reasoning trong workflow.
- **Roots**: client expose workspace root cho server, server biết scope filesystem được phép access.

## B. MCP server ecosystem 2026

**Top MCP server cho dev VN** (đề xuất theo use case):

| Use case | MCP server | Note |
|---|---|---|
| Code repo | **GitHub MCP** (official) hoặc **GitLab MCP** | OAuth 2.1, không cần PAT |
| Database | **Postgres MCP**, **MySQL MCP**, **Supabase MCP** | Support read-only mode cho safety |
| Cloud storage | **AWS S3 MCP**, **Cloudflare R2 MCP** | Upload/download/list |
| Project management | **Linear MCP** (official), **Notion MCP** (official), **Asana MCP** | OAuth, real-time sync |
| Communication | **Slack MCP** (official), **Discord MCP**, **Telegram MCP** | Send/read message, channel mgmt |
| Docs | **Confluence MCP**, **Google Docs MCP** | Read/write/search |
| Monitoring | **Sentry MCP**, **Datadog MCP**, **Grafana MCP** | Query metric, alert |
| AI services | **OpenAI MCP**, **Anthropic MCP**, **Gemini MCP** | Cross-model — gọi model khác từ Claude |
| VN-specific | **VietnamMCP collection** (community-built) | KiotViet, Sapo, GHTK, VNPay wrappers |

## C. So sánh MCP với alternatives

| Approach | When to use | Trade-off |
|---|---|---|
| **MCP** | Cần tool external (API, DB, service) | Setup overhead, mỗi tool 1 server |
| **Skills** (`~/.claude/skills/`) | Logic complex chỉ dùng local file/bash | Không call API external được |
| **Subagent** (Task tool) | Cần specialist với context isolated | Cost extra token |
| **CLAUDE.md** | Knowledge tĩnh về project | Không execute action |
| **Hooks** (`.claude/hooks.json`) | Auto-run script khi event | Không AI-driven |
| **Plugin** | Distribute capability cho team | Cần publish + install flow |

**Decision tree**:
1. Cần data/action từ service external? → MCP
2. Logic chạy local, không cần API? → Skill
3. Task parallel/isolated context? → Subagent
4. Run-on-event automation? → Hook
5. Project knowledge cho Claude đọc? → CLAUDE.md

## D. Build MCP server custom — TypeScript template

```typescript
// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

const server = new Server(
  { name: "my-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "get_weather",
    description: "Get current weather for a city",
    inputSchema: {
      type: "object",
      properties: {
        city: { type: "string", description: "City name" }
      },
      required: ["city"]
    }
  }]
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_weather") {
    const { city } = request.params.arguments as { city: string }
    const data = await fetch(`https://wttr.in/${city}?format=j1`)
    const weather = await data.json()
    return {
      content: [{
        type: "text",
        text: `Thời tiết ở ${city}: ${weather.current_condition[0].temp_C}°C, ${weather.current_condition[0].weatherDesc[0].value}`
      }]
    }
  }
  throw new Error("Unknown tool")
})

const transport = new StdioServerTransport()
await server.connect(transport)
```

**Config trong `.claude/mcp.json`:**

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["./my-mcp-server/dist/index.js"]
    }
  }
}
```

## E. Best practice 2026 cho team VN

1. **Curate carefully**: đừng cài >10 MCP server cùng lúc — token cost tăng (mỗi server expose schema), Claude bị confuse khi nhiều tool tương tự. Bắt đầu với 3-5 core, add khi cần.

2. **Read-only mode mặc định cho DB**: production database MCP → set read-only first. Cho write access chỉ khi rõ workflow.

3. **Audit log**: với MCP làm thao tác destructive (delete file, write DB, send email), dùng `PreToolUse` hook để log mọi call.

4. **MCP server VN ecosystem** — cơ hội contribution:
   - **KiotViet MCP**: query đơn hàng, sản phẩm, kho
   - **Sapo MCP**: tương tự cho Sapo POS
   - **GHTK/GHN MCP**: track vận đơn, tạo đơn ship
   - **VNPay/Momo MCP**: query payment status
   - **Lark/Base.vn MCP**: HR, document, workflow
   
   Build 1 MCP server đơn giản ~100 dòng TypeScript. Publish lên npm + đăng registry official → đóng góp lớn cho dev community VN.

5. **OAuth flow cho team**: nếu team dùng chung Notion/Linear, set up OAuth MCP — không cần share PAT cá nhân, mỗi dev login với account mình.

::: warning Security
- MCP server chạy với quyền user của bạn — nguy hiểm nếu cài server không trusted
- Review code MCP server trước khi cài, đặc biệt server tự build trong community
- Server với khả năng `execute_shell` hay `write_file` cần extra audit
- Token trong env var, không hardcode trong `.claude/mcp.json` commit vào Git
:::

## Sources

- [MCP Official Docs](https://modelcontextprotocol.io/)
- [Claude Code MCP guide](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [MCP Registry](https://registry.modelcontextprotocol.io)
