# Claude Agent SDK: hướng dẫn đầy đủ

::: tip Cập nhật 5/2026
- **Claude Agent SDK 1.0** stable, support Python 3.10+ và TypeScript
- **Managed Agents API** (mới Q1/2026): Anthropic host agent cho bạn — Dreaming, multi-agent, webhook
- **Sonnet 5 default** cho Agent SDK (vượt Opus 4.6 ở SWE-bench coding 82.1%)
- **Built-in MCP support**: Agent SDK call MCP server native
- **OAuth 2.1** cho remote MCP — không cần manage token
:::

## Mở đầu

Bạn có thể đã dùng basic API của Claude — gửi 1 message, lấy 1 reply, như chat. Nhưng nếu bạn muốn để Claude giúp đọc file, chạy lệnh, search code, fix bug, rồi tự verify kết quả, tiếp tục sửa... năng lực "tự làm việc" này, basic API không làm được.

Claude Agent SDK ra đời cho scenario này. Nó đóng gói toàn bộ năng lực Claude Code — đọc/ghi file, execute lệnh, search code, edit file, browse web — thành library programmable. Bạn không cần tự viết tool-call loop, Claude sẽ tự execute tool, tự iterate, tới khi task xong thực sự.

1 câu tóm: **basic SDK là "bạn hỏi nó trả lời", Agent SDK là "bạn order nó làm việc"**.

---

## Khác biệt với basic SDK là gì?

Xem code, rõ ngay:

```python
# Basic anthropic SDK: bạn phải tự viết loop xử lý tool call
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Fix bug ở auth.py"}],
    tools=[...]  # Bạn phải tự define tool
)
# Claude bảo cần call tool nào đó
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # Bạn phải tự execute
    response = client.messages.create(tool_result=result, **params)  # Bạn phải tự feed lại
```

```python
# Agent SDK: 1 dòng xong, Claude tự đọc file, tìm bug, fix code
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Fix bug ở auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude tự đọc file, định vị vấn đề, sửa code
```

Khác biệt rõ:

| Tiêu chí | Basic anthropic SDK | Claude Agent SDK |
|--------|-------------------|-----------------|
| Tool execution | Bạn tự viết | Claude tự |
| Tool loop | Bạn tự implement | Built-in agent loop |
| Tool built-in | Không có, tự define | Đọc/ghi file, Bash, search out-of-box |
| Context management | Bạn tự maintain | Tự compact, tự quản lý |
| Phù hợp | Chat, gen, simple tool use | Tự hoàn thành task phức tạp |

---

## So với Agent framework khác?

Trên thị trường có nhiều Agent framework — LangChain, LlamaIndex, CrewAI, AutoGPT... Claude Agent SDK so với chúng có gì unique?

So sánh ngắn:

| Framework | Phù hợp nhất |
|------|-------------|
| **Claude Agent SDK** | Để Claude tự hoàn thành code dev, thao tác file, execute lệnh |
| **LangChain** | Build AI app tổng phức tạp, cần custom flow cao |
| **CrewAI** | Mô phỏng cộng tác multi-role (team ảo, role-play) |
| **LlamaIndex** | Build hệ Q&A knowledge base, kết nối data enterprise với LLM |

---

## Cài và config

### Cài

Python cần 3.10+, TypeScript cần Node.js 18+:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### Auth

Set env var API Key là được:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

Cũng support auth cloud platform:
- AWS Bedrock: set `CLAUDE_CODE_USE_BEDROCK=1` + AWS credential
- Google Vertex AI: set `CLAUDE_CODE_USE_VERTEX=1` + GCP credential
- Microsoft Azure: set `CLAUDE_CODE_USE_FOUNDRY=1` + Azure credential

## Quickstart

### Python

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Đọc README.md và tóm tắt project",
        options=ClaudeAgentOptions(
            allowed_tools=["Read"],
            cwd="/path/to/project"
        ),
    ):
        if message.type == "text":
            print(message.content)

asyncio.run(main())
```

### TypeScript

```typescript
import { query, ClaudeAgentOptions } from "@anthropic-ai/claude-agent-sdk"

const messages = query({
  prompt: "Đọc README.md và tóm tắt project",
  options: {
    allowedTools: ["Read"],
    cwd: "/path/to/project"
  }
})

for await (const message of messages) {
  if (message.type === "text") {
    console.log(message.content)
  }
}
```

## Tool built-in

Agent SDK đi kèm các tool sau:

| Tool | Mô tả |
|---|---|
| `Read` | Đọc file local |
| `Write` | Tạo file mới |
| `Edit` | Sửa file hiện có |
| `Bash` | Execute lệnh shell |
| `Glob` | Tìm file theo pattern |
| `Grep` | Search content trong file |
| `Task` | Spawn subagent |
| `WebFetch` | Fetch URL |
| `WebSearch` | Search web |

Cho phép subset bằng `allowed_tools`:

```python
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Grep"],  # Chỉ đọc + search, không sửa
    cwd="/safe/path"
)
```

## Use case core

### Use case 1: code review automated

```python
async def code_review(pr_number: int):
    async for message in query(
        prompt=f"""
        Review PR #{pr_number}:
        1. Đọc thay đổi (git diff)
        2. Check security issue
        3. Check style theo CLAUDE.md
        4. Sinh review comment dạng Markdown
        """,
        options=ClaudeAgentOptions(
            allowed_tools=["Bash", "Read", "Grep"],
            mcp_servers={
                "github": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"]}
            }
        ),
    ):
        yield message
```

### Use case 2: automated test generation

```python
async def gen_tests_for_file(file_path: str):
    async for message in query(
        prompt=f"""
        Đọc {file_path}.
        Sinh unit test cover:
        - Happy path
        - Edge case
        - Error case
        Lưu vào {file_path.replace('.ts', '.test.ts')}
        Chạy test confirm pass.
        """,
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Write", "Edit", "Bash"]
        ),
    ):
        print(message)
```

### Use case 3: refactor codebase

```python
async def refactor_codebase():
    async for message in query(
        prompt="""
        Refactor codebase này:
        1. Tìm tất cả class component (Glob src/**/*.tsx)
        2. Convert sang function component
        3. Update import
        4. Chạy test sau mỗi file
        5. Nếu test fail, revert
        """,
        options=ClaudeAgentOptions(
            allowed_tools=["Glob", "Read", "Edit", "Bash"],
            max_turns=50  # Agent chạy tối đa 50 turn
        ),
    ):
        print(message)
```

### Use case 4: data processing pipeline

```python
async def process_csv(input_file: str):
    async for message in query(
        prompt=f"""
        Đọc {input_file}:
        1. Validate schema
        2. Clean data (remove nulls, dedupe)
        3. Transform (uppercase email, parse date)
        4. Output cleaned-{input_file}
        5. Report stats vào report.md
        """,
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Write", "Bash"]
        ),
    ):
        print(message)
```

## Options nâng cao

### Subagent (Task tool)

Spawn subagent để parallel work:

```python
options = ClaudeAgentOptions(
    allowed_tools=["Task", "Read", "Bash"],
    system_prompt="""
    Bạn là tech lead. Khi gặp task lớn:
    1. Tách thành sub-tasks
    2. Spawn subagent cho mỗi sub-task qua Task tool
    3. Aggregate kết quả
    """
)
```

### Hooks

Run callback khi event xảy ra:

```python
async def pre_tool_use(tool_name: str, tool_input: dict):
    print(f"About to use {tool_name}")
    if tool_name == "Bash" and "rm -rf" in tool_input.get("command", ""):
        return {"block": True, "reason": "Dangerous command blocked"}
    return {"block": False}

options = ClaudeAgentOptions(
    allowed_tools=["Read", "Edit", "Bash"],
    hooks={"PreToolUse": pre_tool_use}
)
```

### Custom MCP server

```python
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Edit"],
    mcp_servers={
        "github": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-github"],
            "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"}
        },
        "postgres": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
        }
    }
)
```

### System prompt custom

```python
options = ClaudeAgentOptions(
    system_prompt="""
    Bạn là code reviewer senior. Khi review code:
    - Tập trung security và performance
    - Đề xuất alternative khi spot anti-pattern
    - Output dạng GitHub review comment
    """,
    allowed_tools=["Read", "Grep"]
)
```

### Model selection

```python
options = ClaudeAgentOptions(
    model="claude-opus-4-7",  # Hoặc claude-sonnet-5, claude-haiku-4-5
    max_tokens=8192
)
```

## Production patterns

### Pattern 1: CI/CD integration

```yaml
# .github/workflows/ai-review.yml
on: pull_request
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install claude-agent-sdk
      - env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: python scripts/ai-review.py
```

### Pattern 2: Slack bot

```python
# Listen Slack message, trigger Agent
@app.message("@reviewbot review PR")
async def handle_review_request(message, say):
    pr_url = extract_pr_url(message["text"])
    async for msg in code_review(pr_url):
        await say(msg.content)
```

### Pattern 3: Scheduled job

```python
# Nightly: tự run security audit
@cron("0 2 * * *")
async def nightly_audit():
    async for msg in query(
        prompt="Audit codebase cho security vulnerability mới. Report vào audit-$(date +%Y%m%d).md",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Grep", "Bash", "WebSearch"]
        )
    ):
        log(msg)
```

### Pattern 4: Webhook handler

```python
# Webhook từ Sentry → trigger AI debug
@app.post("/webhooks/sentry")
async def handle_sentry_alert(alert: dict):
    issue_id = alert["issue_id"]
    async for msg in query(
        prompt=f"""
        Sentry issue {issue_id} just fired.
        1. Fetch issue detail via Sentry MCP
        2. Read related code
        3. Propose fix
        4. Create draft PR
        """,
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash"],
            mcp_servers={"sentry": {...}, "github": {...}}
        )
    ):
        log(msg)
```

## Security best practices

### 1. Restrict tool access

```python
# Read-only audit
options = ClaudeAgentOptions(allowed_tools=["Read", "Grep"])

# Write but no shell
options = ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Write"])

# Full access (dev environment only)
options = ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Write", "Bash"])
```

### 2. Block dangerous commands qua hooks

```python
async def block_dangerous(tool_name, tool_input):
    if tool_name == "Bash":
        cmd = tool_input.get("command", "")
        dangerous = ["rm -rf /", "sudo", "curl | sh", "wget | sh"]
        if any(d in cmd for d in dangerous):
            return {"block": True, "reason": f"Blocked: {cmd}"}
    return {"block": False}
```

### 3. Sandbox với cwd

```python
options = ClaudeAgentOptions(
    cwd="/sandbox/agent-workspace",  # Restrict scope filesystem
    allowed_tools=["Read", "Edit", "Bash"]
)
```

### 4. Audit log

```python
import logging
logging.basicConfig(filename='agent-audit.log', level=logging.INFO)

async def audit_hook(tool_name, tool_input):
    logging.info(f"Tool: {tool_name}, Input: {tool_input}")
    return {"block": False}

options = ClaudeAgentOptions(hooks={"PreToolUse": audit_hook})
```

### 5. Rate limiting

```python
options = ClaudeAgentOptions(
    max_turns=20,           # Tối đa 20 turn
    max_tokens=8192,        # Tối đa token/turn
    timeout=300             # 5 phút timeout
)
```

## Cost management

| Strategy | Saving |
|---|---|
| Dùng Haiku cho task đơn giản | -80% |
| Dùng Sonnet 5 (mặc định) thay Opus | -80% |
| Bật prompt caching | -50% repeat content |
| Filter file qua `.claudeignore` | -40% |
| Compact context định kỳ | -30% long session |
| Subagent với context isolated | -40% multi-step task |

Monitor cost:

```python
async for message in query(prompt="...", options=options):
    if message.type == "result":
        print(f"Total cost: ${message.total_cost_usd}")
        print(f"Input tokens: {message.usage.input_tokens}")
        print(f"Output tokens: {message.usage.output_tokens}")
```

## Câu hỏi thường gặp

### Q1: Khác Claude Code thế nào?

- Claude Code: CLI cho human dùng interactive
- Agent SDK: library cho dev nhúng vào app

Cả 2 dùng cùng engine.

### Q2: Có support model khác Claude không?

Không. Agent SDK design cho Anthropic stack. Cho cross-model, dùng LangChain hoặc LiteLLM.

### Q3: Stream output thế nào?

```python
async for message in query(prompt="...", options=options):
    if message.type == "stream":
        print(message.delta, end="", flush=True)
```

### Q4: Resume session?

```python
options = ClaudeAgentOptions(
    session_id="my-session-123"  # Reuse session ID
)
```

### Q5: Test agent logic?

Mock query function:

```python
async def mock_query(prompt, options):
    yield TextMessage(content="mocked response")

# Trong test:
with patch("claude_agent_sdk.query", mock_query):
    result = await my_agent_function()
```

## Tài liệu tham khảo

- [Claude Agent SDK official doc](https://docs.anthropic.com/en/docs/agent-sdk)
- [Python SDK GitHub](https://github.com/anthropics/anthropic-sdk-python)
- [TypeScript SDK GitHub](https://github.com/anthropics/anthropic-sdk-typescript)
- [Agent SDK examples](https://github.com/anthropics/anthropic-cookbook/tree/main/agents)

---

# Phụ lục: Claude Agent SDK 2026

## A. Managed Agents API (Q1/2026)

Mới ra: Anthropic host agent cho bạn — không cần manage infra:

```python
from claude_agent_sdk import ManagedAgent

agent = ManagedAgent(
    name="customer-support-agent",
    system_prompt="You are a helpful customer support agent...",
    tools=["search_knowledge_base", "create_ticket"],
    memory_enabled=True,  # Persistent memory cross-session
    dreaming=True,        # Background learning
)

# Deploy
agent_id = await agent.deploy()

# Call via webhook
response = await agent.invoke({"user_message": "How do I reset my password?"})
```

Features:
- **Dreaming**: agent review past session, learn pattern, curate memory
- **Multi-agent orchestration**: lead agent delegate cho specialist
- **Webhooks**: trigger từ event external
- **Outcomes tracking**: success metric tự auto-track

## B. Best practice production 2026

1. **Idempotency**: agent có thể retry nên tool call phải idempotent
2. **Observability**: log mọi tool call vào Datadog/Honeycomb
3. **Cost alerting**: set budget, alert khi exceed
4. **Human-in-the-loop**: critical action cần human approval
5. **Graceful degradation**: fallback khi tool fail
6. **Versioning**: prompt và config version control

## C. Stack khuyến nghị cho VN dev

| Use case | Stack |
|---|---|
| **Internal automation** | Agent SDK + Slack MCP + Notion MCP |
| **Customer support** | Managed Agent + Zalo MCP + helpdesk MCP |
| **Code review bot** | Agent SDK + GitHub MCP + Linear MCP |
| **Data pipeline** | Agent SDK + S3 MCP + Postgres MCP |
| **Multi-agent system** | Managed Agent orchestration mode |

## D. Mistake phổ biến

1. **Over-tool**: cho agent 20 tool → confuse. Start với 3-5 core
2. **No max_turns**: agent infinite loop → cost explode
3. **No timeout**: hang task → block production
4. **No audit log**: không debug được khi production issue
5. **Hard-coded prompt**: prompt cần version control, A/B test

## Sources

- [Claude Agent SDK docs](https://docs.anthropic.com/en/docs/agent-sdk)
- [Anthropic Cookbook: Agents](https://github.com/anthropics/anthropic-cookbook)
- [Managed Agents announcement](https://www.anthropic.com/news/managed-agents)
