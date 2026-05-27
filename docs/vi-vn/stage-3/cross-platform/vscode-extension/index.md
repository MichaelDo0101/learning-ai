# Dev VS Code extension — xây trợ lý AI cho project bạn

::: tip Cập nhật 2026
- **VS Code 2.x** (rebrand từ 1.95+) — extension API stable
- **GitHub Copilot Chat API** — extension có thể tap vào Copilot LLM
- **Anthropic + VS Code official extension** ra Q1/2026 — Claude integrate native
- **MCP support in VS Code** — extension call MCP server được
- **Web extension** — extension chạy trên vscode.dev browser
:::

## Tại sao build VS Code extension?

- Audience precise: developer (target high-value)
- Marketplace lớn (hơn 40,000 extension)
- TypeScript familiar cho web dev
- Distribution dễ qua marketplace
- Có thể monetize (subscription, premium feature)

## Use case typical

- **Code generation**: snippet template, boilerplate
- **AI assistant**: Copilot-like cho domain cụ thể
- **Linter custom**: rule riêng cho team
- **Code review automated**: trigger qua command
- **Documentation generator**: README, API docs
- **Project scaffolding**: init template
- **Database explorer**: query DB từ editor
- **Theme/icon pack**: customize visual

# Chương 1: setup

## 1.1 Prerequisites

```bash
# Cài Node.js 18+
# Cài Yeoman + VS Code Extension Generator
npm install -g yo generator-code
```

## 1.2 Tạo project

```bash
yo code
```

Wizard hỏi:
- Type: **New Extension (TypeScript)**
- Name: `my-ai-assistant`
- Identifier: `my-ai-assistant`
- Description: "AI assistant for my project"
- Initialize git: yes
- Package manager: npm

Project structure:
```
my-ai-assistant/
├── .vscode/
│   ├── launch.json
│   └── tasks.json
├── src/
│   └── extension.ts      # Entry point
├── package.json          # Extension manifest
├── tsconfig.json
└── README.md
```

## 1.3 Test trong VS Code

1. Mở project trong VS Code
2. F5 (Run Extension)
3. New VS Code window mở (Extension Development Host)
4. Cmd+Shift+P → "Hello World" → command chạy

# Chương 2: extension cơ bản

## 2.1 package.json (manifest)

```json
{
  "name": "my-ai-assistant",
  "displayName": "My AI Assistant",
  "description": "AI assistant for VS Code",
  "version": "0.0.1",
  "engines": { "vscode": "^1.85.0" },
  "categories": ["Other", "AI"],
  "main": "./out/extension.js",
  "activationEvents": [],
  "contributes": {
    "commands": [
      {
        "command": "myAI.summarize",
        "title": "AI: Summarize Selection"
      },
      {
        "command": "myAI.explain",
        "title": "AI: Explain Code"
      },
      {
        "command": "myAI.refactor",
        "title": "AI: Refactor Code"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "myAI.explain",
          "when": "editorHasSelection",
          "group": "myAI"
        }
      ]
    },
    "configuration": {
      "title": "My AI Assistant",
      "properties": {
        "myAI.apiKey": {
          "type": "string",
          "default": "",
          "description": "API key for Claude/OpenAI"
        },
        "myAI.provider": {
          "type": "string",
          "enum": ["anthropic", "openai"],
          "default": "anthropic"
        },
        "myAI.model": {
          "type": "string",
          "default": "claude-sonnet-5"
        }
      }
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 2.2 extension.ts

```typescript
import * as vscode from 'vscode';
import { AIClient } from './aiClient';

export function activate(context: vscode.ExtensionContext) {
  console.log('My AI Assistant is now active');
  
  // Command: Summarize
  const summarizeCmd = vscode.commands.registerCommand('myAI.summarize', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor');
      return;
    }
    
    const selection = editor.document.getText(editor.selection);
    if (!selection) {
      vscode.window.showErrorMessage('No text selected');
      return;
    }
    
    await runAIWithProgress('Summarizing...', async () => {
      const client = await getAIClient();
      const summary = await client.complete(`Summarize this code in Vietnamese, 3 bullets:\n\n${selection}`);
      
      // Display kết quả trong output channel
      const channel = vscode.window.createOutputChannel('AI Assistant');
      channel.show();
      channel.appendLine('=== SUMMARY ===');
      channel.appendLine(summary);
    });
  });
  
  // Command: Explain
  const explainCmd = vscode.commands.registerCommand('myAI.explain', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    
    const selection = editor.document.getText(editor.selection);
    if (!selection) return;
    
    await runAIWithProgress('Explaining...', async () => {
      const client = await getAIClient();
      const explanation = await client.complete(
        `Giải thích đoạn code này chi tiết bằng tiếng Việt:\n\n${selection}`
      );
      
      // Show in webview
      const panel = vscode.window.createWebviewPanel(
        'aiExplain',
        'Code Explanation',
        vscode.ViewColumn.Beside,
        { enableScripts: false }
      );
      panel.webview.html = `<!DOCTYPE html><html><body style="padding:20px;font-family:sans-serif"><pre>${escapeHtml(explanation)}</pre></body></html>`;
    });
  });
  
  // Command: Refactor
  const refactorCmd = vscode.commands.registerCommand('myAI.refactor', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    
    const selection = editor.document.getText(editor.selection);
    if (!selection) return;
    
    await runAIWithProgress('Refactoring...', async () => {
      const client = await getAIClient();
      const refactored = await client.complete(
        `Refactor code này, giữ behavior nhưng improve readability:\n\n${selection}\n\nOutput ONLY refactored code, no explanation.`
      );
      
      // Replace selection với refactored code
      await editor.edit(builder => {
        builder.replace(editor.selection, refactored);
      });
      
      vscode.window.showInformationMessage('Code refactored!');
    });
  });
  
  context.subscriptions.push(summarizeCmd, explainCmd, refactorCmd);
}

export function deactivate() {}

async function runAIWithProgress<T>(title: string, task: () => Promise<T>) {
  return vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title,
    cancellable: false
  }, async () => task());
}

async function getAIClient(): Promise<AIClient> {
  const config = vscode.workspace.getConfiguration('myAI');
  const apiKey = config.get<string>('apiKey');
  const provider = config.get<string>('provider', 'anthropic');
  const model = config.get<string>('model', 'claude-sonnet-5');
  
  if (!apiKey) {
    const result = await vscode.window.showErrorMessage(
      'API key chưa setup',
      'Open Settings'
    );
    if (result === 'Open Settings') {
      vscode.commands.executeCommand('workbench.action.openSettings', 'myAI');
    }
    throw new Error('No API key');
  }
  
  return new AIClient(provider, apiKey, model);
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]!));
}
```

## 2.3 aiClient.ts

```typescript
export class AIClient {
  constructor(
    private provider: string,
    private apiKey: string,
    private model: string
  ) {}
  
  async complete(prompt: string): Promise<string> {
    if (this.provider === 'anthropic') {
      return this.callAnthropic(prompt);
    } else {
      return this.callOpenAI(prompt);
    }
  }
  
  private async callAnthropic(prompt: string): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    const data: any = await response.json();
    return data.content[0].text;
  }
  
  private async callOpenAI(prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    const data: any = await response.json();
    return data.choices[0].message.content;
  }
}
```

# Chương 3: features nâng cao

## 3.1 Webview cho UI rich

```typescript
const panel = vscode.window.createWebviewPanel(
  'myAIChat',
  'AI Chat',
  vscode.ViewColumn.Beside,
  { enableScripts: true, retainContextWhenHidden: true }
);

panel.webview.html = getWebviewContent();

panel.webview.onDidReceiveMessage(async (message) => {
  if (message.command === 'ask') {
    const response = await aiClient.complete(message.text);
    panel.webview.postMessage({ command: 'response', text: response });
  }
});

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system; padding: 16px; color: var(--vscode-foreground); }
        #messages { height: 400px; overflow-y: auto; border: 1px solid var(--vscode-input-border); padding: 8px; }
        input { width: 100%; padding: 8px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }
      </style>
    </head>
    <body>
      <div id="messages"></div>
      <input type="text" id="prompt" placeholder="Hỏi AI..." />
      <script>
        const vscode = acquireVsCodeApi();
        const input = document.getElementById('prompt');
        const messages = document.getElementById('messages');
        
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && input.value.trim()) {
            addMessage('user', input.value);
            vscode.postMessage({ command: 'ask', text: input.value });
            input.value = '';
          }
        });
        
        window.addEventListener('message', (event) => {
          if (event.data.command === 'response') {
            addMessage('ai', event.data.text);
          }
        });
        
        function addMessage(sender, text) {
          const div = document.createElement('div');
          div.innerHTML = '<b>' + sender + ':</b> ' + escape(text);
          messages.appendChild(div);
          messages.scrollTop = messages.scrollHeight;
        }
      </script>
    </body>
    </html>
  `;
}
```

## 3.2 Code completion provider (Copilot-like)

```typescript
const provider = vscode.languages.registerInlineCompletionItemProvider(
  { pattern: '**' },
  {
    async provideInlineCompletionItems(document, position, context, token) {
      // Get context
      const linesBefore = document.getText(
        new vscode.Range(0, 0, position.line, position.character)
      );
      
      // Call AI cho completion
      const completion = await aiClient.complete(
        `Complete this code:\n\n${linesBefore}`
      );
      
      return [{
        insertText: completion,
        range: new vscode.Range(position, position)
      }];
    }
  }
);

context.subscriptions.push(provider);
```

## 3.3 Diagnostics (custom linter)

```typescript
const diagnosticCollection = vscode.languages.createDiagnosticCollection('myAI');

function lintDocument(document: vscode.TextDocument) {
  const diagnostics: vscode.Diagnostic[] = [];
  const text = document.getText();
  
  // Custom rule: avoid console.log trong production code
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    const match = /console\.log/.exec(line);
    if (match) {
      const range = new vscode.Range(i, match.index, i, match.index + 11);
      diagnostics.push(new vscode.Diagnostic(
        range,
        'console.log nên remove trước commit',
        vscode.DiagnosticSeverity.Warning
      ));
    }
  });
  
  diagnosticCollection.set(document.uri, diagnostics);
}

vscode.workspace.onDidChangeTextDocument(e => lintDocument(e.document));
vscode.workspace.onDidOpenTextDocument(lintDocument);
```

## 3.4 Code action (quick fix)

```typescript
const action = vscode.languages.registerCodeActionsProvider(
  '*',
  {
    provideCodeActions(document, range) {
      const fix = new vscode.CodeAction(
        '🤖 AI Refactor',
        vscode.CodeActionKind.RefactorRewrite
      );
      fix.command = {
        command: 'myAI.refactor',
        title: 'AI Refactor'
      };
      return [fix];
    }
  }
);
```

# Chương 4: debug + test

## 4.1 Debug

1. F5 → mở Extension Development Host
2. Trigger command → debugger pause ở breakpoint
3. Debug Console show output

## 4.2 Unit test

```typescript
// src/test/extension.test.ts
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  test('Commands registered', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('myAI.summarize'));
  });
});
```

```bash
npm test
```

# Chương 5: publish marketplace

## 5.1 Tạo publisher account

1. https://marketplace.visualstudio.com/manage
2. Sign in với Microsoft account
3. Create publisher (unique name)
4. Lấy Personal Access Token từ Azure DevOps

## 5.2 Package extension

```bash
npm install -g @vscode/vsce
vsce package
```

Output: `my-ai-assistant-0.0.1.vsix`

## 5.3 Publish

```bash
# Login với PAT
vsce login your-publisher

# Publish
vsce publish
```

Extension available trên marketplace trong vài phút.

## 5.4 Update

```bash
vsce publish patch  # 0.0.1 → 0.0.2
vsce publish minor  # 0.0.x → 0.1.0
vsce publish major  # 0.x.x → 1.0.0
```

# Chương 6: best practice

## 6.1 Performance

- Lazy activation (activationEvents minimal)
- Cancel pending request khi user navigate
- Cache result đắt tiền
- Async I/O

## 6.2 UX

- Progress notification cho task lâu
- Cancel option
- Output channel cho log
- Status bar cho feedback ngắn

## 6.3 Security

- Don't hardcode secret
- SecretStorage API cho sensitive data
- Validate user input
- Sanitize webview content (XSS)

## 6.4 Marketplace SEO

- Display name compelling
- Description rõ với keyword
- Icon attractive (128x128)
- Screenshots + GIF
- README đầy đủ
- Categories đúng

# Câu hỏi thường gặp

### Q1: Cost?

- Publisher account: free
- Marketplace publish: free
- Code signing: không cần (VS Code không enforce)
- Optional: $99/năm Microsoft Partner cho enterprise features

### Q2: Mất bao lâu approved?

Không có review formal. Publish là available ngay. Nhưng:
- Auto-scan malware (vài phút)
- Banned nếu vi phạm policy (vendor abuse, etc.)

### Q3: Monetize?

- **Free + premium feature**: dùng cloud service riêng làm paywall
- **License key**: user mua, nhập license unlock
- **Subscription**: Stripe + monthly check
- **Sponsorship**: GitHub Sponsors trong README

### Q4: Compatible với Cursor?

Phần lớn extension VS Code work trong Cursor (fork VS Code). Nhưng:
- Cursor có riêng AI feature → có thể conflict
- Cursor marketplace = OpenVSX hoặc Cursor riêng

### Q5: Web extension?

Có. Extension chạy trên vscode.dev cần:
- No Node.js API (browser only)
- Polyfill cho FS
- Bundle với webpack/esbuild target web

# Tài liệu tham khảo

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Samples](https://github.com/microsoft/vscode-extension-samples)
- [vsce CLI](https://github.com/microsoft/vscode-vsce)
- [VS Code Extension Generator](https://www.npmjs.com/package/generator-code)
- [Webview API](https://code.visualstudio.com/api/extension-guides/webview)

---

# Phụ lục: VS Code Extension 2026

## A. Trend 2026

- **Anthropic official Claude extension** ra Q1/2026
- **MCP integration** vào VS Code core
- **Copilot Chat API** mở rộng — extension tap vào Copilot LLM
- **Custom chat participants** — extension thành chat participant
- **WebGPU** support cho local LLM

## B. Use case VN

| Idea | Audience |
|---|---|
| **VN Code Style Linter** | Team VN dev |
| **Đặt tên biến tiếng Việt → English** | VN dev mới |
| **Vietnamese spell check** | Markdown writer |
| **VietQR generator snippet** | Web/Mobile dev |
| **VN ID validator** | Form dev |
| **Phone number formatter VN** | Form dev |
| **Sapo/KiotViet API helper** | E-commerce dev |
| **Zalo Mini App scaffolder** | Mini App dev |

## C. Top extension to learn from

- **GitHub Copilot** — AI completion
- **Prettier** — formatter
- **GitLens** — Git supercharged
- **Live Server** — local dev server
- **REST Client** — API testing
- **TODO Highlight** — comment marker
- **Path Intellisense** — file path autocomplete

## D. Stack đề xuất

```
Language: TypeScript
Bundler: esbuild (faster build)
Test: @vscode/test-electron
CI: GitHub Actions
LLM: Claude Sonnet 5 default
MCP: official SDK
Distribution: vsce + marketplace
Telemetry: opt-in only
```

## Sources

- [VS Code Extension docs](https://code.visualstudio.com/api)
- [Awesome VS Code](https://github.com/viatsko/awesome-vscode)
- [VS Code Tips and Tricks](https://github.com/Microsoft/vscode-tips-and-tricks)
