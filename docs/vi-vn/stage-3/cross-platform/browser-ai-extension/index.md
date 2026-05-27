# Cách dev browser AI assistant extension — tóm tắt web 1 click

::: tip Cập nhật 2026
- **Chrome 138+ có built-in AI** (Gemini Nano) — Summarizer, Translator, Writer API local, không cần API key
- **Manifest V3 mandatory** — V2 deprecated từ 2025
- **Side Panel API** (Chrome 114+) thay thế Popup cho UX tốt hơn
- **Edge cũng có built-in AI** (Phi-3 model, Q1/2026)
- **Cross-browser**: Manifest V3 work với Edge, Brave, Opera. Firefox vẫn hơi khác
- **VN context**: dùng extension cho tóm tắt báo VN, dịch tin tức global, AI assistant cho công việc
:::

# Chương 1: browser extension và Chrome extension là gì

Trong tutorial này, ta đi đầy đủ closed loop: từ 0 dev 1 Chrome extension AI-driven, đọc nội dung page bạn đang xem, dùng AI tóm tắt 1 click. Bạn sẽ tự tay dev, debug, học cách publish lên Chrome Web Store.

Bạn ít nhất cần:
- Chrome browser (khuyến nghị 138+ nếu dùng built-in AI)
- 1 code editor (VS Code / Cursor / Trae)
- (Tuỳ chọn) OpenAI hoặc Claude API key

## 1.1 Browser extension là gì?

Bạn chắc đã dùng extension — Adblock, translate tool, password manager... Chúng như "exoskeleton" cho browser, cho bạn super power khi browse web.

Tưởng tượng: mở 1 blog tech 5000 từ, click 1 button extension, vài giây sau, 1 tóm tắt tinh gọn tiếng Việt hiện ở side panel. Đây là cái ta sẽ build.

## 1.2 Kiến trúc cơ bản Chrome extension

Chrome extension (dựa Manifest V3) gồm các thành phần core, mỗi cái 1 việc:

* **Manifest file (manifest.json)**: "ID card" của extension, declare tên, permission, entry file
* **Service Worker (background script)**: "não" extension, xử lý event background, call API. Không chạy luôn, mà start theo nhu cầu
* **Content Script**: "mắt" extension, inject vào page, đọc DOM page được
* **Side Panel**: "mặt" extension, hiện UI ở right side browser, user xem kết quả AI
* **Options Page**: cho user config API Key và param

Flow phối hợp:

```
User click icon extension
    → Side panel mở
    → User click button "Tóm tắt"
    → Side panel notify Service Worker
    → Service Worker bảo Content Script đọc text page
    → Content Script return content
    → Service Worker gửi content cho AI API
    → AI return summary
    → Service Worker gửi summary về side panel display
```

## 1.3 2 phương án AI: cloud API vs Chrome built-in AI

Extension ta có 2 cách lấy năng lực AI:

**Phương án A: call cloud AI API (OpenAI / Claude)**

* Lợi: model mạnh, support mọi device
* Nhược: cần API Key, cần online, có cost
* Phù hợp: cần summary chất lượng cao, content phức tạp

**Phương án B: Chrome built-in AI (Summarizer API)**

Từ Chrome 138, Google built-in AI dựa Gemini Nano vào browser, gồm **Summarizer API** — chạy hoàn toàn local, không cần API Key, không cần online, free hoàn toàn.

* Lợi: free, privacy secure, không cần API Key
* Nhược: cần Chrome 138+, cần hardware tốt (4GB+ VRAM hoặc 16GB+ RAM), năng lực model kém cloud
* Phù hợp: quan tâm privacy, không muốn tốn tiền, hardware OK

**Tutorial này implement cả 2 phương án**, bạn chọn theo trường hợp.

## 1.4 Roadmap tutorial này

Ta sẽ build extension **"AI Page Summarizer"** từ 0 theo các bước:

1. **Dựng khung extension**: tạo structure project Manifest V3, load vào Chrome
2. **Implement function core**: Content Script đọc page + Service Worker call AI API + side panel hiện kết quả
3. **Tích hợp Chrome built-in AI**: dùng Summarizer API cho local summary free
4. **Test và debug**: nắm kỹ thuật debug Chrome extension
5. **Publish lên Chrome Web Store**: package và submit review

# Chương 2: dựng khung extension

## 2.1 Tạo structure project

Mở AI coding assistant (Cursor / Trae / Claude Code), tạo folder mới `ai-page-summarizer`, rồi prompt:

```
Tạo cho tôi 1 Chrome extension project, dùng Manifest V3.
Tên project: ai-page-summarizer, function: dùng AI tóm tắt nội dung web.
Tạo file structure:

ai-page-summarizer/
├── manifest.json          # MV3 manifest
├── background.js          # Service Worker
├── content.js             # Content Script (đọc text page)
├── sidepanel.html         # Side Panel HTML
├── sidepanel.js           # Side Panel logic
├── sidepanel.css          # Side Panel style
├── options.html           # Settings page
├── options.js             # Settings logic
└── icons/                 # Icon folder

Yêu cầu manifest.json:
1. manifest_version: 3
2. Permission: storage, activeTab, scripting, sidePanel
3. Background dùng service_worker: "background.js"
4. Config side_panel, default path sidepanel.html
5. Action config default icon và title
```

AI sẽ gen full khung project.

## 2.2 manifest.json — "ID card" extension

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "Tóm tắt mọi web 1 click bằng AI",
  "permissions": ["storage", "activeTab", "scripting", "sidePanel"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "AI Summarizer",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "options_page": "options.html",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

## 2.3 Load extension vào Chrome

1. Mở `chrome://extensions/`
2. Bật "Developer mode" (góc trên phải)
3. Click "Load unpacked"
4. Chọn folder `ai-page-summarizer`
5. Extension xuất hiện trong list

## 2.4 Test khung cơ bản

Click icon extension → side panel mở. Nếu chưa thấy → check console error.

# Chương 3: implement function core

## 3.1 Content Script: đọc text page

`content.js`:

```javascript
// Listen message từ Service Worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageContent") {
    // Lấy text chính của page (ưu tiên article tag, fallback body)
    const article = document.querySelector('article') || document.body;
    const content = article.innerText;
    sendResponse({ content: content.substring(0, 8000) }); // Giới hạn 8000 chars
  }
  return true; // Async response
});
```

## 3.2 Side Panel UI

`sidepanel.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="sidepanel.css">
</head>
<body>
  <div class="container">
    <h2>📝 AI Page Summarizer</h2>
    <button id="summarizeBtn">Tóm tắt page này</button>
    <div id="result" class="result"></div>
    <div id="loading" class="loading" style="display:none">Đang tóm tắt...</div>
  </div>
  <script src="sidepanel.js"></script>
</body>
</html>
```

`sidepanel.css`:

```css
body { font-family: -apple-system, sans-serif; padding: 16px; }
.container { max-width: 100%; }
button { 
  width: 100%; padding: 12px; 
  background: #4F46E5; color: white; 
  border: none; border-radius: 8px; 
  cursor: pointer; font-size: 14px;
}
button:hover { background: #4338CA; }
.result { 
  margin-top: 16px; padding: 12px; 
  background: #F9FAFB; border-radius: 8px;
  line-height: 1.6; font-size: 14px;
}
.loading { color: #6B7280; margin-top: 16px; }
```

`sidepanel.js`:

```javascript
document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  
  loading.style.display = 'block';
  result.textContent = '';
  
  try {
    // Gửi message tới Service Worker
    const response = await chrome.runtime.sendMessage({ action: "summarize" });
    
    if (response.error) {
      result.textContent = `❌ Lỗi: ${response.error}`;
    } else {
      result.textContent = response.summary;
    }
  } catch (err) {
    result.textContent = `❌ Lỗi: ${err.message}`;
  } finally {
    loading.style.display = 'none';
  }
});
```

## 3.3 Service Worker: orchestration logic

`background.js`:

```javascript
// Cho phép side panel mở khi click icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    handleSummarize().then(sendResponse);
    return true; // Async
  }
});

async function handleSummarize() {
  try {
    // Lấy active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject content script và lấy text page
    const [{ result: pageContent }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const article = document.querySelector('article') || document.body;
        return article.innerText.substring(0, 8000);
      }
    });
    
    if (!pageContent || pageContent.length < 100) {
      return { error: "Page có quá ít text để tóm tắt" };
    }
    
    // Call AI
    const summary = await callAI(pageContent);
    return { summary };
  } catch (err) {
    return { error: err.message };
  }
}

async function callAI(content) {
  // Lấy API key từ storage
  const { apiKey, provider } = await chrome.storage.sync.get(['apiKey', 'provider']);
  
  if (provider === 'chrome-builtin') {
    return await callChromeBuiltinAI(content);
  } else {
    return await callCloudAPI(content, apiKey, provider || 'openai');
  }
}

async function callCloudAPI(content, apiKey, provider) {
  if (!apiKey) throw new Error("Chưa config API key, vào Settings để config");
  
  const endpoint = provider === 'anthropic'
    ? 'https://api.anthropic.com/v1/messages'
    : 'https://api.openai.com/v1/chat/completions';
  
  const body = provider === 'anthropic' ? {
    model: 'claude-sonnet-5',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Tóm tắt nội dung sau bằng tiếng Việt, 3-5 bullet point chính:\n\n${content}`
    }]
  } : {
    model: 'gpt-4o-mini',
    messages: [{
      role: 'user',
      content: `Tóm tắt nội dung sau bằng tiếng Việt, 3-5 bullet point chính:\n\n${content}`
    }]
  };
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(provider === 'anthropic' 
        ? { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }
        : { 'Authorization': `Bearer ${apiKey}` })
    },
    body: JSON.stringify(body)
  });
  
  const data = await response.json();
  return provider === 'anthropic' 
    ? data.content[0].text 
    : data.choices[0].message.content;
}

async function callChromeBuiltinAI(content) {
  if (!('ai' in self) || !('summarizer' in self.ai)) {
    throw new Error("Chrome built-in AI chưa available. Cần Chrome 138+ và enable flag.");
  }
  
  const summarizer = await self.ai.summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  });
  
  return await summarizer.summarize(content);
}
```

## 3.4 Options page

`options.html`:

```html
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, sans-serif; padding: 20px;">
  <h2>AI Summarizer Settings</h2>
  
  <label>AI Provider:</label>
  <select id="provider">
    <option value="openai">OpenAI (GPT-4o-mini)</option>
    <option value="anthropic">Anthropic (Claude Sonnet 5)</option>
    <option value="chrome-builtin">Chrome Built-in AI (Free, local)</option>
  </select>
  
  <br><br>
  <label>API Key:</label>
  <input type="password" id="apiKey" style="width: 400px" />
  <small id="hint">Không cần với Chrome Built-in AI</small>
  
  <br><br>
  <button id="save">Save</button>
  <span id="status"></span>
</body>
<script src="options.js"></script>
</html>
```

`options.js`:

```javascript
// Load saved settings
chrome.storage.sync.get(['provider', 'apiKey'], (data) => {
  if (data.provider) document.getElementById('provider').value = data.provider;
  if (data.apiKey) document.getElementById('apiKey').value = data.apiKey;
});

document.getElementById('save').addEventListener('click', () => {
  const provider = document.getElementById('provider').value;
  const apiKey = document.getElementById('apiKey').value;
  
  chrome.storage.sync.set({ provider, apiKey }, () => {
    document.getElementById('status').textContent = '✅ Saved!';
    setTimeout(() => document.getElementById('status').textContent = '', 2000);
  });
});
```

## 3.5 Test end-to-end

1. Reload extension trong `chrome://extensions/`
2. Right-click icon → Options → setup API key
3. Mở 1 web article dài
4. Click icon extension → side panel mở
5. Click "Tóm tắt page này"
6. Đợi 5-10s → kết quả hiện

# Chương 4: tích hợp Chrome built-in AI (Summarizer API)

Chrome 138+ có built-in Gemini Nano. Để dùng:

## 4.1 Enable Chrome flag

1. Mở `chrome://flags/`
2. Search "Optimization Guide On Device Model" → set "Enabled BypassPerfRequirement"
3. Search "Summarization API" → set "Enabled"
4. Restart Chrome

## 4.2 Verify model downloaded

```javascript
// Trong DevTools console
const canSummarize = await self.ai.summarizer.capabilities();
console.log(canSummarize.available); 
// "readily" = ready
// "after-download" = đang download
// "no" = không support
```

## 4.3 Code đã sẵn sàng

Code `callChromeBuiltinAI` ở chương 3 đã support. Trong Options chọn "Chrome Built-in AI" → free local summarization.

# Chương 5: debug và test

## 5.1 Debug Service Worker

1. `chrome://extensions/` → click "service worker" link dưới extension
2. DevTools mở → check Console log, Network request

## 5.2 Debug Content Script

1. F12 trên page bất kỳ
2. DevTools → Console → log từ content script hiện ở đây

## 5.3 Debug Side Panel

1. Right-click trong side panel → "Inspect"
2. DevTools mở cho side panel

## 5.4 Common bug

| Bug | Fix |
|---|---|
| "Service worker not registered" | Check `background.js` path trong manifest |
| "Cannot read content of page" | Đợi page load xong, check `activeTab` permission |
| "API key invalid" | Verify key trong Options |
| "CORS error" | Cần `host_permissions: ["<all_urls>"]` |
| "Chrome built-in AI not available" | Enable flag + Chrome 138+ + đủ hardware |

# Chương 6: publish lên Chrome Web Store

## 6.1 Chuẩn bị

- **Developer account**: $5 one-time fee (https://chrome.google.com/webstore/devconsole)
- **Icon**: 128x128 PNG (đẹp, brand-aligned)
- **Screenshots**: 1280x800, ít nhất 1 cái
- **Description**: ngắn (132 chars) + detailed (16k chars)
- **Privacy policy URL**: nếu collect data

## 6.2 Package extension

```bash
# Trong folder extension
zip -r ai-page-summarizer.zip . -x "*.git*" -x "*.DS_Store"
```

## 6.3 Submit review

1. Truy cập Developer Console
2. Click "New Item"
3. Upload zip file
4. Fill thông tin:
   - Name, description
   - Category (Productivity)
   - Language (Vietnamese, English)
   - Screenshots, promo images
   - Privacy practices: declare data usage rõ
5. Submit for review (thường 1-7 ngày)

## 6.4 Sau approval

- Extension xuất hiện trong Chrome Web Store
- Có link share (chrome.google.com/webstore/detail/xxx)
- Track install, rating trong dashboard
- Push update bằng cách upload zip mới (re-review 1-3 ngày)

# Câu hỏi thường gặp

### Q1: Cost Chrome Web Store?

$5 one-time fee cho dev account. Sau đó publish extension unlimited.

### Q2: Có cách publish private không?

Có. Trong Distribution → "Private" → chia sẻ qua link riêng cho user cụ thể (cần email).

### Q3: Manifest V2 vẫn dùng được không?

Không. V2 deprecated từ January 2025. Mọi extension mới phải V3.

### Q4: Firefox extension khác Chrome thế nào?

Firefox dùng WebExtensions API tương tự Chrome, nhưng:
- Không support Service Worker (dùng background scripts)
- Side Panel API khác
- Publish qua addons.mozilla.org (free, không $5)

Có thể share 90% code, build 2 manifest riêng.

### Q5: Edge, Brave, Opera?

Tất cả đều dùng Chrome extension. Submit cùng zip lên Edge Add-ons (free), Brave/Opera tự sync từ Chrome Web Store.

# Tài liệu tham khảo

- [Chrome Extension docs](https://developer.chrome.com/docs/extensions)
- [Manifest V3 migration](https://developer.chrome.com/docs/extensions/migrating)
- [Chrome Built-in AI](https://developer.chrome.com/docs/ai/built-in)
- [Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
- [Anthropic API docs](https://docs.anthropic.com)

---

# Phụ lục: Browser extension 2026

## A. Cross-browser strategy

| Store | Cost | Review time | Audience |
|---|---|---|---|
| Chrome Web Store | $5 one-time | 1-7 days | Largest (Chrome + Edge + Brave) |
| Edge Add-ons | Free | 1-3 days | Edge users |
| Mozilla Add-ons | Free | 1-7 days | Firefox users |
| Opera Add-ons | Free | 1-7 days | Opera users |

**Khuyến nghị**: build cho Chrome trước (covers 75% market), Firefox version sau.

## B. Browser built-in AI 2026

Tất cả browser lớn đang add AI native:

| Browser | AI | Model | Available |
|---|---|---|---|
| Chrome | Built-in AI | Gemini Nano | 138+ stable |
| Edge | Phi-3 mini | Microsoft | 2026 Q1 |
| Arc | Native AI | Cloud-based | Built-in |
| Brave | Leo AI | Mixtral / Claude | Built-in |
| Opera | Aria | Multi-model | Built-in |

Build extension dùng browser built-in AI = no API cost cho user.

## C. Use case extension cho VN 2026

| Extension idea | Use case VN |
|---|---|
| **VN news summarizer** | Tóm tắt VnExpress, ZNews, Tuổi Trẻ |
| **EN-VN translator** | Translate technical article, paper |
| **Shopee/Lazada price tracker** | Track giá, notify khi giảm |
| **VietQR generator** | Quick gen VietQR cho bill split |
| **Zalo OA helper** | CSKH bot integration |
| **Form filler VN** | Auto-fill địa chỉ, số điện thoại VN |
| **Tax invoice extractor** | Lấy hoá đơn điện tử từ Sapo, KiotViet |
| **AI search VN** | Tích hợp Claude/Gemini cho search context |

## D. Best practice 2026

1. **Manifest V3 mandatory**: V2 deprecated. Đừng start V2 mới.
2. **Side Panel > Popup**: Side panel persistent, UX tốt hơn popup
3. **Use built-in AI khi có thể**: free cho user, privacy tốt hơn
4. **Minimum permissions**: chỉ request permission cần, Chrome Web Store review strict
5. **Privacy policy mandatory**: nếu collect bất cứ data nào
6. **Localization**: hỗ trợ tiếng Việt cho VN audience
7. **Dark mode**: support cả light + dark
8. **Keyboard shortcut**: power user love shortcuts

## E. Monetization

- **Free + premium**: free tier limited, paid tier unlock (Stripe subscription)
- **One-time purchase**: Gumroad, $5-20
- **Open source + donations**: GitHub Sponsors, Buy Me a Coffee
- **Affiliate**: extension giúp shop comparison → affiliate fee
- **No monetization**: free, build portfolio

## F. Cảnh báo

Chrome Web Store review strict 2026:
- Single purpose only — extension không sprawl scope
- Data minimization — không collect data không cần
- Permission justification — explain rõ tại sao cần permission X
- No remote code — không load JS từ remote
- No tracking pixels — privacy first

Risk: extension bị remove → user mất tool. Backup plan: tự host distribution.

## Sources

- [Chrome Extension docs](https://developer.chrome.com/docs/extensions)
- [Chrome Built-in AI](https://developer.chrome.com/docs/ai/built-in-apis)
- [Manifest V3 best practices](https://developer.chrome.com/docs/extensions/migrating/improving-security)
