# Cách dev Electron desktop cross-platform — app voice-to-text

::: tip Cập nhật 2026
- **Electron 32+** stable, support Node.js 22, Chromium 130+
- **Tauri 2.0** ra Q4/2025 — alternative Electron với bundle nhỏ hơn 10x (~3MB vs ~150MB)
- **Whisper.cpp + Apple Silicon** chạy real-time STT local, không cần cloud
- **OpenAI Whisper API** rẻ ($0.006/phút), độ chính xác cao tiếng Việt
- **VN context**: tool ghi âm meeting, phỏng vấn, học tiếng Anh đều cần STT
:::

# Chương 1: Electron và desktop app dev

Tutorial này build từ 0 1 desktop app voice-to-text dùng Electron, support cloud API và local model, package thành installer chạy được trên Windows, macOS, Linux.

Bạn cần:
- 1 máy (Windows hoặc Mac, khuyến nghị Mac vì Apple Silicon chạy local model rất nhanh)
- Node.js 18+
- AI coding assistant (Cursor / Trae / Claude Code)
- (Tuỳ chọn) OpenAI API Key (cloud mode)
- 1 microphone (laptop built-in OK)

## 1.1 Electron là gì?

**VS Code, Slack, Discord, Notion** bạn dùng hàng ngày có điểm chung: đều build bằng **Electron**.

Electron là framework open source cho phép dùng **HTML + CSS + JavaScript** build desktop app cho **Windows, macOS, Linux**. Nguyên lý đơn giản — package Chromium browser + Node.js, web của bạn thành desktop App độc lập.

**1 câu hiểu**: Electron = "invisible Chrome browser" + năng lực system của Node.js.

## 1.2 Kiến trúc core Electron

App Electron gồm 2 loại process, hiểu chúng là key để dev:

**Main Process**
- "Quản gia" của App
- Tạo window, quản lý lifecycle app, truy cập filesystem
- Chạy trong Node.js env, dùng được mọi Node module
- Mỗi app chỉ có 1 main process

**Renderer Process**
- "Mặt tiền" App
- Là 1 Chromium page, hiện UI
- Mỗi window 1 renderer process
- Vì security, không truy cập trực tiếp Node API

**Preload Script**
- "Cầu nối" giữa main và renderer
- Qua `contextBridge` expose API cụ thể an toàn

Chúng giao tiếp qua **IPC (Inter-Process Communication)**, như gọi điện: renderer nói "tôi muốn ghi âm", main nhận và call microphone system.

## 1.3 Roadmap

Build app **"Voice Notes"** từ 0:
1. Init project Electron
2. UI ghi âm
3. Tích hợp STT (cloud + local)
4. Save và quản lý transcript
5. Package thành installer multi-platform

# Chương 2: init project

## 2.1 Init Electron app

```bash
# Tạo project mới
mkdir voice-notes && cd voice-notes
npm init -y

# Cài dependency
npm install electron --save-dev
npm install electron-builder --save-dev
```

## 2.2 Structure project

```
voice-notes/
├── package.json
├── main.js              # Main process
├── preload.js           # Preload script
├── index.html           # UI
├── renderer.js          # Renderer logic
├── styles.css           # Style
└── assets/
    └── icon.png
```

## 2.3 main.js

```javascript
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });
  
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: save transcript
ipcMain.handle('save-transcript', async (event, content) => {
  const { filePath } = await dialog.showSaveDialog({
    defaultPath: `transcript-${Date.now()}.txt`,
    filters: [{ name: 'Text', extensions: ['txt'] }]
  });
  
  if (filePath) {
    fs.writeFileSync(filePath, content);
    return { success: true, path: filePath };
  }
  return { success: false };
});

// IPC: transcribe audio
ipcMain.handle('transcribe', async (event, { audioData, provider, apiKey }) => {
  if (provider === 'openai') {
    return await transcribeOpenAI(audioData, apiKey);
  } else if (provider === 'whisper-local') {
    return await transcribeLocal(audioData);
  }
});

async function transcribeOpenAI(audioBuffer, apiKey) {
  const formData = new FormData();
  formData.append('file', new Blob([audioBuffer]), 'audio.webm');
  formData.append('model', 'whisper-1');
  formData.append('language', 'vi'); // Tiếng Việt
  
  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: formData
  });
  
  const data = await response.json();
  return { text: data.text };
}

async function transcribeLocal(audioBuffer) {
  // Dùng whisper.cpp local hoặc nodejs-whisper
  const { transcribe } = require('nodejs-whisper');
  
  const tempFile = path.join(app.getPath('temp'), `audio-${Date.now()}.wav`);
  fs.writeFileSync(tempFile, audioBuffer);
  
  const result = await transcribe(tempFile, {
    modelName: 'base', // tiny, base, small, medium, large
    language: 'vi'
  });
  
  fs.unlinkSync(tempFile);
  return { text: result };
}
```

## 2.4 preload.js

```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  transcribe: (data) => ipcRenderer.invoke('transcribe', data),
  saveTranscript: (content) => ipcRenderer.invoke('save-transcript', content)
});
```

## 2.5 index.html

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>🎙️ Voice Notes</h1>
    
    <div class="recorder">
      <button id="recordBtn" class="record-btn">
        <span class="dot"></span>
        Bắt đầu ghi âm
      </button>
      <div id="timer" class="timer">00:00</div>
    </div>
    
    <div class="settings">
      <label>Provider:</label>
      <select id="provider">
        <option value="openai">OpenAI Whisper (cloud)</option>
        <option value="whisper-local">Whisper.cpp (local)</option>
      </select>
      <input type="password" id="apiKey" placeholder="OpenAI API key (nếu dùng cloud)">
    </div>
    
    <div id="status" class="status"></div>
    
    <div class="transcript">
      <h2>Transcript</h2>
      <textarea id="transcript" placeholder="Transcript sẽ hiện ở đây..."></textarea>
      <button id="saveBtn">💾 Save</button>
    </div>
  </div>
  
  <script src="renderer.js"></script>
</body>
</html>
```

## 2.6 renderer.js

```javascript
let mediaRecorder;
let audioChunks = [];
let startTime;
let timerInterval;
let isRecording = false;

const recordBtn = document.getElementById('recordBtn');
const timer = document.getElementById('timer');
const status = document.getElementById('status');
const transcriptEl = document.getElementById('transcript');

recordBtn.addEventListener('click', toggleRecording);
document.getElementById('saveBtn').addEventListener('click', saveTranscript);

async function toggleRecording() {
  if (!isRecording) {
    await startRecording();
  } else {
    stopRecording();
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    
    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
    mediaRecorder.onstop = handleRecordingStop;
    
    mediaRecorder.start();
    isRecording = true;
    recordBtn.classList.add('recording');
    recordBtn.querySelector('.dot').textContent = '⏹️';
    recordBtn.lastChild.textContent = 'Dừng ghi âm';
    
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    
    status.textContent = '🔴 Đang ghi âm...';
  } catch (err) {
    status.textContent = `❌ Lỗi: ${err.message}`;
  }
}

function stopRecording() {
  mediaRecorder.stop();
  isRecording = false;
  clearInterval(timerInterval);
  recordBtn.classList.remove('recording');
  recordBtn.querySelector('.dot').textContent = '🎙️';
  recordBtn.lastChild.textContent = 'Bắt đầu ghi âm';
}

async function handleRecordingStop() {
  status.textContent = '⏳ Đang transcribe...';
  
  const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
  const audioBuffer = await audioBlob.arrayBuffer();
  
  const provider = document.getElementById('provider').value;
  const apiKey = document.getElementById('apiKey').value;
  
  try {
    const result = await window.api.transcribe({
      audioData: audioBuffer,
      provider,
      apiKey
    });
    
    transcriptEl.value += '\n\n' + result.text;
    status.textContent = '✅ Transcribe xong';
  } catch (err) {
    status.textContent = `❌ Lỗi: ${err.message}`;
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const sec = String(elapsed % 60).padStart(2, '0');
  timer.textContent = `${min}:${sec}`;
}

async function saveTranscript() {
  const content = transcriptEl.value;
  if (!content.trim()) return;
  
  const result = await window.api.saveTranscript(content);
  if (result.success) {
    status.textContent = `✅ Saved: ${result.path}`;
  }
}
```

## 2.7 styles.css

```css
body { 
  font-family: -apple-system, sans-serif;
  margin: 0; padding: 0;
  background: #F9FAFB;
}
.container { 
  max-width: 700px; margin: 0 auto; padding: 40px 20px;
}
h1 { color: #1F2937; margin-bottom: 30px; }
.recorder { 
  display: flex; align-items: center; gap: 20px;
  padding: 30px; background: white; border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.record-btn {
  padding: 16px 32px; font-size: 18px;
  background: #4F46E5; color: white;
  border: none; border-radius: 8px; cursor: pointer;
  transition: all 0.2s;
}
.record-btn.recording { background: #DC2626; animation: pulse 1s infinite; }
@keyframes pulse { 50% { opacity: 0.7; } }
.timer { font-size: 32px; font-family: monospace; color: #6B7280; }
.settings { 
  display: flex; gap: 10px; margin: 20px 0;
  align-items: center;
}
.settings select, .settings input { 
  padding: 8px; border: 1px solid #D1D5DB; border-radius: 6px;
}
.settings input { flex: 1; }
.status { padding: 10px; color: #4B5563; font-size: 14px; }
.transcript { 
  background: white; padding: 20px; border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.transcript textarea {
  width: 100%; min-height: 200px; padding: 12px;
  border: 1px solid #D1D5DB; border-radius: 6px;
  font-family: inherit; font-size: 14px; resize: vertical;
}
```

## 2.8 package.json

```json
{
  "name": "voice-notes",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "build:mac": "electron-builder --mac",
    "build:win": "electron-builder --win",
    "build:linux": "electron-builder --linux"
  },
  "build": {
    "appId": "com.yourname.voice-notes",
    "productName": "Voice Notes",
    "mac": { "category": "public.app-category.productivity" },
    "win": { "target": "nsis" },
    "linux": { "target": "AppImage" }
  },
  "devDependencies": {
    "electron": "^32.0.0",
    "electron-builder": "^25.0.0"
  },
  "dependencies": {
    "nodejs-whisper": "^0.1.5"
  }
}
```

# Chương 3: chạy app

```bash
npm start
```

Window mở → click "Bắt đầu ghi âm" → nói → "Dừng" → đợi transcribe → xem text trong textarea.

# Chương 4: tích hợp local Whisper

## 4.1 Tại sao cần local model?

- **Privacy**: audio không gửi lên cloud
- **Free**: không tốn API cost
- **Offline**: dùng được khi không internet
- **Latency**: faster cho audio ngắn

## 4.2 Cài nodejs-whisper

```bash
npm install nodejs-whisper

# Download model (chạy 1 lần)
npx nodejs-whisper download base
```

Model size:
- `tiny`: 39MB, nhanh, kém chính xác
- `base`: 74MB, balance
- `small`: 244MB, tốt
- `medium`: 769MB, very good
- `large-v3`: 1.5GB, best

Cho tiếng Việt khuyến nghị `small` trở lên.

## 4.3 Code đã sẵn sàng

Code ở chương 2 đã có `transcribeLocal`. Test bằng cách chọn "Whisper.cpp (local)" trong dropdown.

# Chương 5: package app

## 5.1 Build cho platform hiện tại

```bash
npm run build
```

Output trong `dist/`:
- macOS: `.dmg` (installer) hoặc `.app` (folder)
- Windows: `.exe` (NSIS installer)
- Linux: `.AppImage`

## 5.2 Build cross-platform

Để build cho platform khác phải có máy đó (hoặc dùng CI):

**GitHub Actions** ví dụ:
```yaml
name: Build
on: push

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: app-${{ matrix.os }}
          path: dist/
```

## 5.3 Code signing

Để app không bị "Unknown developer" warning:
- **macOS**: cần Apple Developer account ($99/năm) + certificate
- **Windows**: cần code signing certificate ($100-500/năm từ DigiCert, Sectigo)
- **Linux**: không cần (open source norm)

## 5.4 Distribution

- **Direct download**: host installer trên website + GitHub Release (free)
- **Mac App Store**: cần Apple Developer + extra review
- **Microsoft Store**: cần MS Partner Center ($19 one-time)
- **Snap Store / Flatpak** (Linux): free

# Chương 6: nâng cao

## 6.1 Auto-update

```bash
npm install electron-updater
```

`main.js` add:
```javascript
const { autoUpdater } = require('electron-updater');
app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

Host update server trên GitHub Releases hoặc S3.

## 6.2 System tray

```javascript
const { Tray, Menu } = require('electron');

let tray = null;
app.whenReady().then(() => {
  tray = new Tray('assets/tray-icon.png');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow.show() },
    { label: 'Record', click: () => startRecording() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]));
});
```

## 6.3 Global shortcut

```javascript
const { globalShortcut } = require('electron');

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+Shift+R', () => {
    mainWindow.webContents.send('toggle-recording');
  });
});
```

## 6.4 Performance optimize

- Lazy load module nặng
- Compress audio trước khi gửi cloud (Opus codec)
- Stream transcribe cho real-time experience
- Cache result của file đã transcribe

# Câu hỏi thường gặp

### Q1: Tại sao Electron bị chê?

- Bundle size lớn (~100-200MB cho mỗi app)
- RAM usage cao (mỗi app gánh full Chromium)
- Battery drain nhiều trên laptop

Mà vẫn popular vì: dev nhanh, cross-platform, ecosystem mature.

### Q2: Alternative Electron?

- **Tauri 2.0** (2025): Rust + system webview, bundle ~5MB
- **Wails**: Go + webview
- **Neutralino.js**: lightweight, web-based
- **Native**: Swift (macOS), C# (Windows), GTK (Linux)

### Q3: Whisper local có support tiếng Việt không?

Có. `small` model trở lên transcribe tiếng Việt khá tốt (~90% chính xác). `large-v3` ~95%+.

### Q4: Cost OpenAI Whisper API?

$0.006/phút. 1 giờ ghi âm = $0.36. Rất rẻ vs alternative.

### Q5: Sao Apple Silicon nhanh cho Whisper local?

Apple Silicon (M1/M2/M3) có Neural Engine và unified memory → nodejs-whisper dùng được Metal acceleration → ~5-10x nhanh hơn Intel x86.

# Tài liệu tham khảo

- [Electron docs](https://www.electronjs.org/docs)
- [electron-builder](https://www.electron.build/)
- [OpenAI Whisper API](https://platform.openai.com/docs/api-reference/audio)
- [nodejs-whisper](https://github.com/ChetanXpro/nodejs-whisper)
- [Tauri alternative](https://tauri.app/)

---

# Phụ lục: Desktop dev 2026

## A. Electron vs alternatives

| Framework | Bundle | RAM | Dev speed | Maturity |
|---|---|---|---|---|
| **Electron 32** | ~150MB | 100-300MB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Tauri 2.0** | ~5-15MB | 30-80MB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Wails (Go)** | ~10MB | 30-50MB | ⭐⭐⭐ | ⭐⭐⭐ |
| **Neutralino.js** | ~2MB | 20-40MB | ⭐⭐⭐ | ⭐⭐ |
| **Native (Swift/C#)** | ~5-20MB | 20-100MB | ⭐⭐ | ⭐⭐⭐⭐⭐ |

**Khuyến nghị 2026**:
- **Electron** nếu cần dev nhanh, có team familiar với web
- **Tauri** nếu performance/bundle quan trọng và OK với Rust
- **Native** nếu cần OS deep integration

## B. Use case desktop cho VN dev

| App idea | Use case VN |
|---|---|
| **Meeting notes** | Ghi âm meeting Zoom/Meet → transcript → AI summary |
| **Interview tool** | Phỏng vấn báo chí, ghi âm + transcribe |
| **Học tiếng Anh** | Voice journal + AI feedback pronunciation |
| **Subtitle generator** | Video VN → subtitle tự động |
| **Voice search file** | Search file local bằng giọng nói |
| **Dictation cho writer** | Dictate article tiếng Việt |
| **Doctor note assistant** | Bác sĩ dictate ghi bệnh nhân |

## C. Best practice 2026

1. **Security**: enable `contextIsolation`, `nodeIntegration: false`, sandbox
2. **Update**: dùng electron-updater, host update server
3. **Telemetry**: opt-in only, Posthog/Sentry self-host nếu VN compliance cần
4. **Localization**: tiếng Việt sẵn từ đầu
5. **Accessibility**: support keyboard nav, screen reader
6. **DPI**: handle 4K display

## D. Trend AI desktop 2026

- **AI built into OS** (Apple Intelligence, Copilot+ PC) — OS-level AI thay app riêng
- **Local LLM** mainstream (Ollama, LM Studio) — privacy + offline
- **Multi-modal agent** desktop — voice + vision + text combine
- **Co-pilot pattern** — AI luôn-on side panel cho mọi app

## Sources

- [Electron official docs](https://www.electronjs.org/docs)
- [Tauri 2.0 launch](https://tauri.app/blog/tauri-2-0-launch/)
- [Whisper paper](https://arxiv.org/abs/2212.04356)
- [OpenAI Whisper API](https://platform.openai.com/docs/api-reference/audio)
