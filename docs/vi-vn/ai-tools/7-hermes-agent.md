---
title: 'Hermes Agent — Trợ lý AI tự host, có trí nhớ, càng dùng càng hiểu bạn'
description: 'Hướng dẫn thực chiến Hermes Agent (Nous Research): agent mã nguồn mở MIT, tự host trên VPS/máy bạn, nhớ xuyên phiên, tự sinh skills, nối 20+ nền tảng nhắn tin. Cài bằng 1 lệnh, chạy FREE 100% với Gemini OAuth hoặc Ollama — hợp người học AI ở VN 2026.'
---

# Hermes Agent — Trợ lý AI tự host, có trí nhớ

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🪽</p>

::: tip 🔥 Thực chiến — 30 giây
8h sáng, bạn chưa kịp mở máy thì Telegram đã “ting”: *“Repo của bạn đêm qua có 3 issue mới, 1 cái khẩn (CI gãy). Tóm tắt + gợi ý fix bên dưới.”* — Đó là **Hermes Agent** bạn dựng trên con VPS $5/tháng, chạy thường trực, nhớ luôn bạn đang làm dự án gì, và **tự gửi báo cáo** qua đúng kênh bạn hay xài.
**💸 Lợi ích thực tế:** một trợ lý AI *có trí nhớ + chạy 24/7 + tự lên lịch*, phần mềm **miễn phí** (MIT), bạn chỉ trả tiền token (hoặc $0 nếu dùng free tier) — thứ mà ChatGPT bản web không làm được.
:::

> **Hermes Agent KHÔNG phải copilot nhét trong IDE, cũng KHÔNG phải chatbot bọc một API.**
> **Nó là một “autonomous agent” bạn cài lên máy mình, chạy mãi, nhớ mọi thứ, và càng dùng càng hiểu bạn — “the agent that grows with you”.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Cài Hermes Agent** lên macOS/Linux/WSL2 bằng **1 lệnh**, rồi chọn model chạy **FREE 100%**.
- **Chat với agent** qua TUI và **tiếp tục phiên cũ** để tận mắt thấy persistent memory hoạt động.
- **Nối agent vào Telegram/Discord** để ra lệnh từ điện thoại.
- **Hiểu cơ chế memory 3 tầng + skills tự sinh** — và biết khi nào *đừng* tin chúng.
- **Chọn đúng provider cho người VN** (không cần thẻ quốc tế): Gemini OAuth hoặc Ollama local.
- **Tự gỡ 6 lỗi phổ biến nhất** (command not found, 429, model not found, gateway chập chờn…).
:::

Đây là công cụ trình độ **trung–cao**: bạn cần quen terminal/CLI và Linux/WSL2. Không phải app “bấm-là-chạy” như ChatGPT — đổi lại, bạn sở hữu một trợ lý AI thật sự của riêng mình.

::: warning ⏳ Mốc thời gian
Tài liệu này phản ánh hiểu biết về Hermes Agent tới **giữa 2026** (bản phát hành 25/02/2026). Dự án đi rất nhanh (vượt ~175.000 sao GitHub trong chưa đầy 4 tháng), nên lệnh/giá/provider có thể đã đổi. Khi nghi ngờ, kiểm tra lại tại trang chủ và docs chính thức ở mục 02.
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**Hermes Agent** là một AI agent **mã nguồn mở** (license MIT) do **Nous Research** phát hành ngày **25/02/2026**. Điểm khác biệt cốt lõi: đây là một **self-hosted autonomous agent** — bạn cài lên máy/VPS của mình, nó:

- **Chạy thường trực** (persistent) — không phải mở tab là có, đóng tab là mất.
- **Nhớ xuyên phiên** (persistent memory) — nhớ hồ sơ bạn, sở thích, quy ước dự án qua các lần khởi động lại.
- **Tự tạo “skills”** từ kinh nghiệm — càng dùng càng hiểu bạn hơn.
- Tiếp cận bạn qua **CLI/TUI** và **20+ nền tảng nhắn tin** (Telegram, Discord, Slack, WhatsApp, Signal…).

::: tip 🔑 3 trụ cột làm nên Hermes Agent
1. **Persistent memory** — trí nhớ thật, nạp tức thì mỗi phiên, không có độ trễ retrieval.
2. **Self-improving (learning loop)** — tự đúc kết kinh nghiệm thành skill tái dùng được.
3. **Đa kênh + tự host** — bạn điều khiển từ bất kỳ app chat nào, dữ liệu nằm trên hạ tầng của bạn.
:::

### Bộ tính năng đáng chú ý

| Tính năng | Nó làm gì (vì sao đáng quan tâm) |
|---|---|
| **Persistent memory 3 tầng** | 2 file luôn nạp mỗi phiên: `USER.md` (hồ sơ bạn) + `MEMORY.md` (ngữ cảnh dài hạn). Truy cập **tức thì**, không độ trễ retrieval. |
| **Self-improving / skills** | Sau một task xong với **≥ 5 lần gọi tool**, tiến trình nền tóm tắt “trajectory” thành **1 file skill Markdown** (có YAML frontmatter). Skill **tìm kiếm + chia sẻ** được, theo chuẩn mở **agentskills.io**. |
| **40+ tool tích hợp** | Web search, browser automation, vision, đọc/ghi file, chạy lệnh terminal… sẵn dùng. |
| **Đa nền tảng nhắn tin (20+)** | Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Email, SMS, **Feishu/Lark, WeCom**… qua một **gateway process** duy nhất. |
| **Cron scheduler** | Lên lịch automation (vd 8h sáng gửi tóm tắt GitHub issues qua Telegram) và giao kết quả về **bất kỳ** kênh nào. |
| **Subagents** | Spawn các agent con **cô lập** để chạy **song song** nhiều luồng việc. |
| **6 backend terminal** | local, Docker, SSH, Singularity, Modal, Daytona — chạy được trên VPS rẻ hoặc serverless **gần $0 khi idle**. |
| **Không lock-in model** | Đổi provider/model bằng lệnh `hermes model`, **không sửa code**. |

### Dùng khi nào / đừng dùng khi nào

::: tip ✅ Hợp khi
- Bạn muốn một **trợ lý AI thường trực có trí nhớ**, điều khiển từ điện thoại qua Telegram/Discord.
- Bạn cần **automation theo lịch** (báo cáo sáng, quét issue, tóm tắt tin tức) giao về app chat.
- Bạn muốn **toàn quyền + riêng tư**: chạy 100% local bằng Ollama, dữ liệu không rời máy.
- Bạn ổn với **terminal/CLI** và có một con VPS rẻ (hoặc máy cá nhân để bật).
:::

::: warning 🚫 Chưa hợp khi
- Bạn muốn thứ **bấm-là-chạy** trên trình duyệt, ngại terminal → ChatGPT/Claude web dễ hơn nhiều.
- Bạn cần một **copilot gõ code ngay trong IDE** (gợi ý từng dòng) → đó là Cursor/Copilot, không phải Hermes.
- Bạn **không có nơi để nó chạy thường trực** và không cần trí nhớ/automation → lợi thế lớn nhất của Hermes bị lãng phí.
:::

::: details 🧩 “Hermes” — coi chừng nhầm tên
Tên **Hermes** trong hệ sinh thái Nous Research từng gắn với **DÒNG MODEL ngôn ngữ** (Hermes / OpenHermes / Hermes 2, 3, 4 — các LLM fine-tune nổi tiếng, hay chạy qua Ollama/HuggingFace). Đó là **model**, không phải agent.

Chương này nói về **“Hermes Agent”** — sản phẩm **agent** mã nguồn mở của Nous Research (ra 25/02/2026). Hai thứ liên quan nhưng khác vai: Hermes Agent có thể *dùng* các model Hermes/OpenHermes làm “bộ não” bên dưới (qua NVIDIA NIM/HuggingFace), nhưng bản thân nó là khung agent chứ không phải một LLM.

Ngoài ra còn vài dự án **“Hermes” không liên quan AI** (vd Hermes JavaScript engine của Meta cho React Native) — không dính dáng gì ở đây.
:::

---

## 02 · Cài đặt & truy cập — bối cảnh VN

### Cài bằng 1 lệnh

**Cách đơn giản nhất** (qua pip):
```bash
pip install hermes-agent && hermes postinstall
```

**Hoặc lấy bản mới nhất** (script cài chính thức):
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Trình cài **tự lo** các phụ thuộc: Python 3.11+, Node.js, ripgrep, ffmpeg, Git. Hỗ trợ nền tảng:

| Nền tảng | Ghi chú |
|---|---|
| **Linux** | Khuyến nghị, mượt nhất (đặc biệt cho VPS). |
| **macOS** | Chạy tốt. |
| **WSL2** (trên Windows) | **Khuyến nghị** cho người Windows — ổn định hơn native. |
| **Windows native** | Qua PowerShell `iex (irm .../install.ps1)` — chạy được nhưng docs khuyên dùng WSL2. |
| **Termux (Android)** | Cài được ngay trên điện thoại. |

::: warning ⚠️ Sau khi cài: nhớ nạp lại shell
Nếu gõ `hermes` mà báo **“command not found”**, là do bạn chưa nạp lại shell. Chạy:
```bash
source ~/.zshrc   # nếu dùng zsh (mặc định trên macOS)
# hoặc
source ~/.bashrc  # nếu dùng bash
```
:::

### Giá: phần mềm FREE, bạn chỉ trả token + nơi host

Đây là chỗ dễ hiểu nhầm, nên tách bạch rõ:

| Khoản | Chi phí thực tế |
|---|---|
| **Bản thân Hermes Agent** | **MIỄN PHÍ** (MIT, không subscription). |
| **Model (LLM)** | Token của provider bạn chọn — **có thể $0** nếu xài free tier hoặc chạy local. |
| **Nơi host** | VPS **~$5/tháng**, hoặc chạy **local $0** trên máy bạn. |

### Nhiều đường để chạy FREE 100%

Người học VN thường vướng **thanh toán quốc tế** — đây là tin tốt: có nhiều provider **không cần thẻ**.

| Provider | Free tier | Cần thẻ quốc tế? |
|---|---|---|
| **Google Gemini (OAuth)** | Quota ngày **khá rộng**, đăng nhập trình duyệt PKCE, **không cần API key** | ❌ Không — chỉ cần tài khoản Google |
| **Ollama / llama.cpp** | Chạy **local hoàn toàn**, free tuyệt đối | ❌ Không |
| **OpenRouter** | 27+ model gắn hậu tố `:free` (**200 request/ngày**, 20 req/phút) | ✅ Có (để tạo tài khoản/nạp) |
| **NVIDIA NIM** | Credit free khi đăng ký, **không cần thẻ** | ❌ Không |
| **Hugging Face** | Credit free **hàng tháng** | ❌ Không |

::: tip 💸 Người VN nên bắt đầu thế nào
- **Học/thử nghiệm:** dùng **Google Gemini OAuth** (chỉ cần tài khoản Google) — đường nhanh và miễn phí nhất.
- **Cần riêng tư tuyệt đối:** chạy **Ollama** local (vd `ollama pull qwen2.5-coder:32b`) — dữ liệu không rời máy.
- **Muốn chọn nhiều model lạ:** OpenRouter `:free` — nhưng cần thẻ để mở tài khoản.
:::

::: tip 📌 Ví dụ thật — từ $64/tuần xuống $20/tháng
Keith Rumjahn (một solopreneur) kể trước đó tốn **~$64/tuần** gọi thẳng Claude API mà vẫn **không có trí nhớ bền** — sáng nào cũng phải dán lại context. Sau khi chuyển sang Hermes (chạy trên một droplet DigitalOcean ~$18/tháng, cấu hình 2CPU/4GB) và dùng sub rẻ, chi phí về **~$20/tháng**. Điểm mấu chốt không phải “Hermes rẻ hơn API” mà là: **trí nhớ bền giúp anh khỏi trả tiền lặp đi lặp lại cho cùng một context mỗi sáng.** (Nguồn: Substack Keith Rumjahn — chi tiết ở mục 06, Case 2.)
:::

### Nous Portal (gói của nhà sản xuất — tùy chọn)

Nous Research có cổng riêng (**khuyến nghị nhưng không bắt buộc**), gộp **300+ model + tool gateway** (web search, tạo ảnh, TTS, browser) trong **1 subscription**:

| Gói | Giá | Ghi chú |
|---|---|---|
| **Free** | $0/tháng | Chỉ **$0.10 credit** — đủ thử cho biết, không đủ dùng thật. |
| **Plus** | $20/tháng | Trả phí. |
| **Super** | $100/tháng | Trả phí. |
| **Ultra** | $200/tháng | Trả phí. |

> ⚠️ Các gói Nous Portal trả phí (và OpenRouter/Anthropic/OpenAI) **cần thẻ thanh toán quốc tế**. Người mới ở VN nên bắt đầu bằng **Gemini free** hoặc **Ollama** trước.

### Dùng ở VN có vướng gì không?

::: tip 🇻🇳 Bối cảnh VN — đánh giá thẳng
- **Không có giới hạn địa lý** nào được nêu trong tài liệu (no geo restrictions).
- **Không thu telemetry** — dữ liệu chỉ gửi tới **LLM provider bạn cấu hình** (và nếu chạy Ollama local thì *không đi đâu cả*).
- Vì **self-hosted + chọn được provider**, người dùng VN cài và dùng **bình thường**.
- Hỗ trợ sẵn các nền tảng phổ biến ở doanh nghiệp VN/châu Á: **Feishu/Lark, WeCom**, cùng Telegram/Discord/Slack — tiện làm bot trợ lý nội bộ.
- **Lưu ý thực tế:** muốn provider trả phí (OpenRouter, Anthropic, OpenAI, Nous Portal $20+) cần **thẻ quốc tế**; còn **Gemini OAuth** và **Ollama** thì không.
:::

### Link chính thức

```text
Trang chủ : https://hermes-agent.nousresearch.com/
Docs      : https://hermes-agent.nousresearch.com/docs/
GitHub    : https://github.com/NousResearch/hermes-agent   (MIT license)
```

---

## 03 · Workflow thực chiến — làm từng bước

Dưới đây là 7 bước đi từ con số 0 tới một trợ lý AI có trí nhớ, nối được điện thoại và tự chạy theo lịch. Mỗi bước có **lệnh/prompt thật**.

### Bước 1 — Cài đặt

```bash
pip install hermes-agent && hermes postinstall
# hoặc: curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.zshrc   # nạp lại shell (hoặc ~/.bashrc)
```

### Bước 2 — Chọn model/provider

Chạy lệnh tương tác để chọn provider:
```bash
hermes model
```
Ví dụ chọn **Google Gemini OAuth** để xài free, hoặc **OpenRouter** (nhập API key). Nếu muốn chạy **Ollama local**, chọn **Custom endpoint** và điền:
```text
API base URL: http://localhost:11434/v1
```

Nếu dùng **Nous Portal**, cách nhanh nhất là setup OAuth + bật Tool Gateway một phát:
```bash
hermes setup --portal
```

::: warning ⚠️ Quy tắc “64K” — bắt buộc nhớ
Model bạn chọn **phải có context tối thiểu 64.000 token**. Nếu nhỏ hơn, sẽ **không đủ chỗ cho tool-calling** và multi-step sẽ lỗi. Đây là cạm bẫy số 1 khi người mới chọn đại một model nhỏ.
:::

### Bước 3 — Mở giao diện chat & thử nghiệm

Mở **TUI** (giao diện hiện đại, khuyến nghị):
```bash
hermes --tui
```
Hoặc CLI cổ điển: chỉ cần `hermes`. Thử ngay một prompt kiểm tra để xem agent đọc được repo không:
```text
Summarize this repo in 5 bullets and tell me what the main entrypoint is.
```

### Bước 4 — Tiếp tục phiên cũ (kiểm tra MEMORY)

Đây là bước cho bạn **tận mắt thấy persistent memory**. Đóng terminal, mở lại, rồi:
```bash
hermes --continue   # hoặc viết tắt: hermes -c
```
Xem danh sách các phiên đã có:
```bash
hermes sessions list
```
Để kiểm chứng trí nhớ, ở phiên trước bạn nói một việc, phiên sau nhắc lại:
```text
remember that nginx Docker bug from Tuesday
```
Nếu agent “nhớ” được ngữ cảnh cũ → memory đang hoạt động đúng.

::: tip 🔑 Mẹo dùng đúng điểm mạnh
Hãy quen tay với `hermes -c` (continue). **Đừng mở phiên mới mỗi lần** — làm vậy bạn vứt đi đúng thứ khiến Hermes khác biệt: trí nhớ tích lũy theo thời gian.
:::

### Bước 5 (tùy chọn) — Nối nền tảng nhắn tin

Cấu hình rồi chạy gateway để điều khiển agent từ Telegram/Discord/Slack…:
```bash
hermes gateway setup && hermes gateway
```
Nếu bạn ở **WSL2**, chạy gateway ở foreground cho ổn định:
```bash
hermes gateway run
```

### Bước 6 (tùy chọn) — Lên lịch tự động (cron)

Đăng ký một job dạng cron để agent **tự chạy** và giao kết quả về kênh đã nối. Ví dụ kinh điển: *8h sáng tóm tắt GitHub issues → gửi Telegram*. Job được đăng ký qua API jobs của Hermes:
```text
POST /api/jobs   (đăng ký job cron — vd 08:00 hằng ngày: tóm tắt issues → Telegram)
```

::: tip 📌 Ví dụ thật — cron đặt bằng tiếng người, không cần viết YAML
Một dev kể đã giao Hermes task *“mỗi sáng 8am, tổng hợp tin tech, tóm tắt mỗi mục dưới 50 từ, xếp hạng theo độ liên quan tới dev”* — và agent **tự suy ra cách set cron, không cần khai cú pháp YAML**; chạy ổn suốt 1 tuần. Còn Keith Rumjahn thì set một job gửi **báo cáo App Store lúc 8:30 sáng thứ Hai hằng tuần** qua Telegram. Điểm hay: bạn ra lệnh bằng ngôn ngữ tự nhiên, agent tự lo phần lịch. (Nguồn: DEV.to “5 impossible tasks” + Substack Rumjahn — mục 06.)
:::

### Bước 7 — Bảo trì

```bash
hermes doctor    # chẩn đoán khi gặp lỗi
hermes update    # cập nhật phiên bản mới
hermes tools     # bật/tắt từng tool
```

::: details 🧪 Một phiên CLI mẫu, đầu-đến-cuối (minh họa)
```text
$ hermes --tui

you ▸ Summarize this repo in 5 bullets and tell me what the main entrypoint is.
hermes ▸ (đọc file bằng tool read/grep…) Đây là 5 ý chính… Entrypoint: src/main.py.

you ▸ remember that nginx Docker bug from Tuesday
hermes ▸ Đã ghi vào MEMORY.md. Lần sau nhắc “nginx Docker bug” mình sẽ nhớ ngữ cảnh này.

# (đóng terminal, mở lại sau vài tiếng)
$ hermes -c
hermes ▸ Tiếp tục phiên trước. Bạn đang xử lý bug nginx trong Docker — cần mình đào tiếp chứ?
```
Lưu ý: đây là minh họa hành vi *kỳ vọng* để bạn hình dung luồng, không phải transcript copy nguyên văn.
:::

::: tip 🧠 Cơ chế bên trong — đọc 1 lần cho hiểu “càng dùng càng hiểu bạn”
- **Memory:** mỗi phiên, Hermes **luôn nạp** `USER.md` (hồ sơ bạn) + `MEMORY.md` (ngữ cảnh dài hạn) — nên nó “nhớ” ngay, không phải đi tìm.
- **Skills:** sau một task xong với **≥ 5 lần gọi tool**, tiến trình nền **tự đúc kết** trajectory thành **1 file skill Markdown**. Lần sau gặp việc tương tự, agent moi skill đó ra dùng lại → đó chính là “self-improving”.
- **Vì sao skills quan trọng hơn việc đổi model “xịn”:** đội Nous quan sát hiện tượng **“linearized RL”** — agent loay hoay ở lần đầu với task mới, nhưng **giải xong một lần thì mở khoá hiệu suất cho mọi lần sau** (vì đã đóng gói thành skill). Giá trị nằm ở **“giải 1 lần → tái dùng mãi”** (chi tiết: mục 06, Case 4).
:::

::: tip 📌 Ví dụ thật — pattern “CEO + senior engineer” khi cần nhiều agent
Khi việc nặng vượt sức một agent, một mẫu phối hợp được dùng nhiều: **1 agent điều phối nhẹ + uỷ thác task nặng cho agent/CLI mạnh hơn rồi review lại** — Keith Rumjahn gọi vui là *“Hermes làm CEO, OpenClaw làm senior engineer”*, cả hai trỏ chung **1 Obsidian vault** làm bộ não. Ở quy mô đội, Teknium (Nous) chạy **~12 instance Hermes song song mỗi ngày** để tự phát triển chính Hermes. Bài học cho người mới: **đừng nhồi mọi thứ vào một agent** — tách vai “điều phối” và “thực thi” giúp hệ ổn định và dễ kiểm soát hơn. (Chi tiết: mục 06, Case 2 và Case 4.)
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### Mẹo “ăn tiền”

::: tip 💡 7 mẹo thực dụng
1. **Bắt đầu FREE 100%:** dùng **Gemini (OAuth)** hoặc model `:free` của OpenRouter để học; muốn riêng tư tuyệt đối thì chạy **Ollama** local (vd `ollama pull qwen2.5-coder:32b`).
2. **Luôn chọn model context ≥ 64K** — nếu không, multi-step tool-calling sẽ lỗi.
3. **Dùng `hermes -c`** (continue) để tận dụng đúng persistent memory — đừng mở phiên mới mỗi lần.
4. **Phiên dài hay tốn token:** gõ `/compress` định kỳ để nén context, tránh lỗi “context exceeded”.
   ```text
   /compress
   ```
5. **Coi skills tự sinh là “bản nháp cần duyệt”**, không phải automation đáng tin — **review trước** khi cho chạy ở production.
6. **Đổi model linh hoạt theo nhu cầu** (vd model nhẹ/nhanh như `llama-3.1-8b-instruct` cho việc lặt vặt) chỉ bằng `hermes model`, **không sửa code**.
7. **Trên Windows dùng WSL2** thay vì native để ổn định hơn.
:::

### Lỗi thường gặp & cách gỡ

| Triệu chứng | Nguyên nhân | Cách xử lý |
|---|---|---|
| **`hermes: command not found`** sau khi cài | Chưa nạp lại shell | `source ~/.zshrc` (hoặc `source ~/.bashrc`) |
| Cài lỗi vì **Python quá cũ** | Yêu cầu **Python 3.11+** (khuyến nghị 3.12+) | Kiểm tra `python3 --version` rồi nâng cấp |
| **Lỗi 429 / rate limit** | Free tier có hạn (Gemini quota; OpenRouter `:free` **200 req/ngày**) | Đổi sang model khác hoặc nâng gói |
| **“Model not found”** | Sai định danh model | Xác minh lại bằng `hermes model` |
| **Gateway chập chờn trên WSL2** | systemd/dịch vụ nền không ổn | Chạy `hermes gateway run` ở **foreground** thay vì systemd |
| **Telegram báo quá nhiều command** | Telegram giới hạn **tối đa 100 command** | Tắt bớt skill không dùng trong `config.yaml` |
| **Model local phản hồi rất chậm** | Thiếu VRAM GPU | Dùng GPU đủ mạnh; CPU/llama.cpp chạy được nhưng **chậm** |

::: tip 📌 Ví dụ thật — bẫy “fail im lặng” và mẹo Telegram group
Hai cái bẫy cộng đồng gặp nhiều, đáng nhớ trước:
- **Fail im lặng khi token thiếu scope.** Một dev giao Hermes push GitHub issue; khi token **thiếu scope**, lệnh push **hỏng mà agent KHÔNG báo lỗi** — cứ tưởng xong nhưng không có gì lên repo. Bài học: với mọi action có side-effect (push code, gửi mail), hãy **kiểm tra kết quả thật**, đừng tin báo cáo “đã xong” của agent.
- **Bot Telegram im trong group.** Keith Rumjahn mất thời gian vì bot không trả lời trong group — nguyên nhân là Telegram bật **“Group Privacy”** mặc định. Vào BotFather **tắt Group Privacy** thì bot mới đọc được tin nhắn group.

(Nguồn: DEV.to “5 impossible tasks” + Substack Rumjahn — mục 06.)
:::

::: warning 🔐 Bảo mật — đọc trước khi đưa lên VPS
- **KHÔNG để web UI/gateway lộ ra Internet công khai** — đặt sau **VPN/SSH tunnel**.
- **Lệnh nguy hiểm cần bạn duyệt thủ công** — đừng tắt bước xác nhận.
- Agent **tự viết quy trình (skills)** nên **phải có người review** trước khi cho chạy thật.
- `sudo` **không khả dụng** trong gateway nếu chưa cấu hình passwordless — đừng trông đợi nó chạy lệnh root.
:::

::: warning 🚨 Bẫy “429” lúc đang học
Free tier rất hợp để học, nhưng **Gemini quota** và **OpenRouter `:free` (200 req/ngày)** sẽ chạm trần nếu bạn cho agent chạy nhiều vòng tool-calling. Khi gặp **429**, đừng hoảng: hoặc **đổi model** (`hermes model`), hoặc chuyển sang **Ollama local** để chạy không giới hạn.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tuần tự — mỗi bài có **tiêu chí “đạt”** rõ ràng để bạn tự kiểm.

### 🧪 Bài 1 — Dựng agent FREE & kiểm chứng trí nhớ (cơ bản)

**Mục tiêu:** cài Hermes, chạy bằng provider miễn phí, và *chứng minh* nó nhớ xuyên phiên.

Các bước:
```bash
pip install hermes-agent && hermes postinstall
source ~/.zshrc
hermes model        # chọn Google Gemini OAuth (free)
hermes --tui        # mở chat
```
Trong phiên đầu, nói cho agent một dữ kiện cá nhân (vd: *“mình tên Hoàng, đang làm dự án VitePress tên easy-vibe, thích trả lời ngắn gọn”*). Đóng terminal, mở lại:
```bash
hermes -c
```
Rồi hỏi: *“mình tên gì, đang làm dự án nào, thích kiểu trả lời ra sao?”*

::: tip ✅ Đạt khi
Agent trả lời **đúng** tên + dự án + sở thích bạn đã khai ở phiên trước → persistent memory (`USER.md`/`MEMORY.md`) hoạt động.
:::

### 🧪 Bài 2 — “Trợ lý đọc repo” qua Telegram (trung bình)

**Mục tiêu:** điều khiển agent từ điện thoại để tóm tắt một repo.

```bash
hermes gateway setup     # chọn Telegram, dán bot token
hermes gateway           # (WSL2 thì: hermes gateway run)
```
Từ Telegram, nhắn cho bot:
```text
Summarize this repo in 5 bullets and tell me what the main entrypoint is.
```

::: tip ✅ Đạt khi
Bạn nhận được **tóm tắt 5 gạch đầu dòng + entrypoint** ngay trong Telegram, không cần mở terminal. Nếu Telegram báo quá nhiều command → tắt bớt skill trong `config.yaml` (xem mục 04).
:::

### 🧪 Bài 3 — Báo cáo sáng tự động bằng cron (nâng cao)

**Mục tiêu:** mỗi sáng 8h, agent **tự** tóm tắt GitHub issues của một repo và gửi về Telegram — bạn không phải gõ gì.

Phác việc cần làm:
1. Đảm bảo Bài 2 đã chạy (gateway Telegram OK).
2. Đăng ký một **job cron** (vd qua `/api/jobs`) với lịch `08:00` hằng ngày, nội dung: *“tóm tắt issues mới của repo X → gửi Telegram”*.
3. Để máy/VPS chạy thường trực qua đêm.

::: tip ✅ Đạt khi
**Sáng hôm sau**, bạn nhận tin tóm tắt issues qua Telegram mà **không thao tác gì**. Đây là lúc bạn cảm nhận rõ giá trị “agent thường trực + có lịch + đa kênh”.
:::

::: warning ⚠️ Trước khi cho chạy “thật”
- Nếu dùng free tier, canh **quota/429** — cron chạy mỗi ngày vẫn ăn request.
- **Review** mọi skill agent tự sinh trong quá trình làm bài (coi như bản nháp).
- **Đừng phơi gateway ra Internet** — giữ sau VPN/SSH tunnel.
:::

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom các ví dụ **có thật, kiểm chứng được** từ chính Nous Research, GitHub issues (kèm số liệu cụ thể), và các blog first-person của người dùng. Mỗi ví dụ theo khung: **bối cảnh → làm gì → kết quả/số liệu → bài học**, kèm nguồn ở cuối.

::: warning ⚖️ Đọc trước: cách phân biệt thật và “hype”
Quanh Hermes Agent có rất nhiều con số viral nhưng **chưa được kiểm chứng độc lập** (vd “$300 → $123K trong 3 tháng” từ một bot trading thời tiết, hay “224 tỷ token/ngày”, “40% nhanh hơn”). Các con số dạng này phần lớn đến từ post marketing trên X hoặc trang SEO tự sinh. Trong chương này, **dữ liệu đáng tin nhất đến từ GitHub issues** (người dùng tự đo, có dump số liệu) và **blog chính chủ Nous**. Khi đọc bất kỳ con số ROI khổng lồ nào về AI agent, hãy hỏi: *“nguồn gốc có dump dữ liệu/log không, hay chỉ là một dòng tweet?”*
:::

### Case 1 — Nous tự viết trọn một cuốn tiểu thuyết bằng Hermes

**Bối cảnh.** Nous Research muốn chứng minh agent có thể **“ship” một sản phẩm hoàn chỉnh** chứ không chỉ ra bản nháp demo. Họ chọn bài toán khó: viết trọn một cuốn tiểu thuyết (“The Second Son of the House of Bells”).

**Làm gì.** Hermes tự dựng pipeline 4 pha:
1. World-building / xây nhân vật / lập outline.
2. Viết từng chương — **chương nào tự chấm điểm dưới 6.0 thì bỏ, viết lại**.
3. Vòng review đối kháng: dựng 2 persona phản biện (“literary critic” + “novel professor”) soi lỗi.
4. Đẩy qua Claude Opus review **lặp đi lặp lại tới khi không còn cải thiện**.

Đây chính là vòng lặp **“modify → evaluate → keep/discard”** (sửa → chấm → giữ/bỏ) kiểu Autoresearch của Karpathy, nhưng áp cho viết fiction. Khâu hoàn thiện: typeset bằng LaTeX, minh hoạ qua FAL, làm audiobook qua ElevenLabs.

**Kết quả.** **79.456 từ, 19 chương, 4.179 đoạn audio**; trải qua **6 vòng tự động + 6 vòng Opus**.

**Bài học.** Với một vòng lặp tự-đánh-giá có **ngưỡng điểm rõ ràng**, agent xử lý được cả task sáng tạo dài hơi end-to-end — chìa khoá không nằm ở “một prompt thần thánh” mà ở **cơ chế lặp + tiêu chí loại bỏ**.

> Nguồn: blog Nous Research (`nousresearch.com/bells`); repo `github.com/NousResearch/autonovel` (có sẵn `PIPELINE.md`, `ANTI-PATTERNS.md`); thông báo trên X `@NousResearch`.

### Case 2 — Solopreneur: “Hermes là CEO, OpenClaw là senior engineer”

**Bối cảnh.** Keith Rumjahn, một solopreneur, trước đó tốn **~$64/tuần** gọi Claude API mà **không có trí nhớ bền** — sáng nào cũng phải dán lại context, browser automation thì chập chờn. Trước đó còn thử chạy trên Jetson Nano nhưng **crash ~6 lần/ngày**.

**Làm gì.** Chạy **2 agent trỏ chung 1 Obsidian vault** đặt trên NAS UGreen. Cấu hình toàn bộ bằng file markdown:

```text
Souls.md   → personality: "concise technical expert, no fluff"
Agents.md  → quy ước code, format bài LinkedIn
User.md    → memory: tên, quan hệ, công việc
```

Hermes lo việc đơn giản + **điều phối**, **uỷ thác task nặng cho OpenClaw** rồi review lại kết quả — đúng kiểu “CEO giao việc cho senior engineer”. Tích hợp thêm Apple Health, Threads (auth bằng cookie), báo cáo App Store.

**Kết quả / số liệu.**
- Chi phí từ **~$64/tuần → ~$20/tháng** (dùng sub OpenAI Codex; hoặc một droplet DigitalOcean ~$18/tháng cấu hình 2CPU/4GB).
- Tự phân tích giấc ngủ: *“trung bình 7.59h, cao nhất 9.8h, thấp nhất 5.37h”*.
- Kéo 34 post Threads kèm số like/reply/repost.
- Cron gửi **báo cáo App Store lúc 8:30 sáng thứ Hai** qua Telegram.

**Bẫy gặp phải (rất thật).**
- Bot Telegram **không trả lời trong group** cho tới khi tắt **“Group Privacy”** trong BotFather.
- Coi chừng bot `@userinfobot` **giả mạo**.
- Dashboard chạy ở `127.0.0.1:1919`.

**Bài học.** Tách bạch vai **“điều phối nhẹ” vs “thực thi nặng”**; dùng một **vault markdown chung** làm bộ não bền vững cho nhiều agent.

> Nguồn: Substack Keith Rumjahn — “Complete guide to mastering Hermes Agent” (`rumjahn.substack.com/p/complete-guide-to-mastering-hermes`).

### Case 3 — Một dev giao Hermes “5 nhiệm vụ khó” (có cả pass và fail)

**Bối cảnh.** Một full-stack dev test giới hạn của agent bằng 5 task thực tế, ghi lại trung thực cả chỗ làm tốt lẫn chỗ hỏng.

**Làm gì & kết quả (rất cụ thể):**
1. **Tổng hợp tin tech mỗi sáng 8am, tóm tắt mỗi mục dưới 50 từ, xếp hạng theo độ liên quan tới dev** → ✅ **Pass**. Agent tự suy ra “developer relevance” (ưu tiên Next.js/Supabase) và **tự set cron mà không cần khai YAML**; chạy ổn 1 tuần.
2. **Đọc README repo → nhận diện stack → viết checklist review → push GitHub issue** → ⚠️ **một phần**: nhận đúng Next.js + Supabase + Tailwind nhưng checklist **generic** (thiếu RLS, thiếu edge cold start); push thành công khi token đủ scope, **FAIL IM LẶNG khi thiếu scope**.
3. **Quyết định kiến trúc backend** (Supabase serverless vs Node/Express + PostgreSQL) → ✅ lập được ma trận quyết định, suy ra cả yếu tố không được nhắc tới.
4. **Phân tích CSV điểm sinh viên → ghi chú can thiệp → tự đóng gói thành skill tái dùng** → ✅ tạo được skill `at-risk-student-csv-analyzer`; lần 2 dùng lại không cần giải thích (nhưng nội dung ghi chú hơi “lạnh”/chung chung).
5. **Đổi ngữ cảnh giữa chừng** (content calendar dev-tools → personal finance) → ✅ giữ lại phần dùng được + regenerate; còn **rớt 1 ý dính context cũ** (“context bleed”).

**Bài học.** Bộ khung skill-loop **chạy thật**; nhưng reasoning chuyên sâu còn **nông**, output dễ **generic**, có **context bleed** khi đổi chủ đề, và **fail im lặng** khi cấu hình sai (token thiếu scope). Đừng giao việc rủi ro cao mà không kiểm tra output.

> Nguồn: DEV Community — “I Gave Hermes Agent 5 Impossible Tasks” (`dev.to/syedahmershah`).

### Case 4 — Chính đội Nous dùng 12 instance Hermes để… build Hermes

**Bối cảnh.** Teknium (đồng sáng lập Nous) chia sẻ cách đội ngũ dùng chính Hermes để phát triển Hermes.

**Làm gì.** Chạy **~12 instance song song mỗi ngày**. Họ quan sát một hiện tượng gọi là **“linearized RL”**: agent ban đầu khá kém/loay hoay với task chưa từng có “prior”, nhưng **giải xong một lần thì mở khoá hiệu suất lớn cho những lần sau**.

**Kết quả.** Repo lọt top GitHub; ra loạt feature mới — **Hermes Curator** (tự gom/tỉa bớt skill), bản **v0.13.0** thêm **Kanban multi-agent orchestration**, lệnh `/goal` để ép agent hoàn thành mục tiêu, và tối ưu disk.

**Bài học.** Giá trị cốt lõi của loại agent này nằm ở **“giải 1 lần → tái dùng mãi”**, không phải ở sức mạnh của một model đơn lẻ. Đây là lý do persistent memory + skills quan trọng hơn việc đổi sang model “xịn” hơn.

> Nguồn: X `@Teknium` và `@NousResearch` (các post về Hermes Curator, v0.13.0, “linearized RL”).

### Case 5 — Audit token overhead: ~73% mỗi call là “phí cố định”

**Bối cảnh.** Một user dựng dashboard proxy để **đo token thật** từ khoảng **207 API call qua ~10 session** trong một buổi tối — vừa là case hay, vừa là một cái bẫy chi phí.

**Làm gì.** Dump toàn bộ request rồi bóc tách từng thành phần của prompt.

**Kết quả / số liệu (bản v0.6.0):** khoảng **73% mỗi call là overhead cố định (~13.9K token)**:

```text
Tool definitions (31 tool) : 8,759 token  (46.1%)
System prompt              : 5,176 token  (27.2%)
Browser tools              : 1,258 token  (kể cả khi chat WhatsApp KHÔNG dùng browser)
Skills index               : ~2,200 token
```

Ước tính: **1.000 call ≈ 14 triệu token chỉ riêng phần overhead**. Đề xuất của user: **lọc tool theo nền tảng** + **lazy-load skills index**.

**Bài học.** Tự-host xong **vẫn phải tối ưu context**, nếu không sẽ “cháy token” khi chạy model premium. Đây là số liệu THẬT (có dump), khác hẳn các “benchmark 40% faster” của marketing.

> Nguồn: `github.com/NousResearch/hermes-agent/issues/4379`.

### Case 6 — Self-host on-prem cho ngành pháp lý (model nhỏ + 1 GPU)

**Bối cảnh.** Công việc pháp lý **không được phép gửi dữ liệu qua API bên thứ ba**.

**Làm gì.** Chạy Hermes **hoàn toàn local** trên một edge-class GPU với model **Gemma 4B**, nối vào hệ thống nội bộ.

**Kết quả.** Self-host trở thành **điều kiện bắt buộc**; chứng minh chạy được **model nhỏ on-prem** cho công việc thật.

**Bài học.** Với ngành chịu quản chế chặt (pháp lý, y tế, tài chính), **“model nhỏ + on-prem”** quan trọng hơn **“model mạnh trên cloud”**. Đây cũng là lý do người VN nên biết tới đường Ollama/local ngay từ đầu.

> Nguồn: GitHub issue #15562 (qua tổng hợp user-stories chính thức của Nous).

::: details ⚠️ Case 7 (THẬN TRỌNG) — “Bot trading thời tiết kiếm $123K”: vì sao đừng tin
Có một “case” lan truyền mạnh: deploy Hermes trên VPS $5 chạy 24/7, đọc forecast (NOAA/ECMWF), chấm EV, size lệnh bằng Kelly Criterion trên Polymarket, “tự viết note chiến lược, tự điều chỉnh”. Các con số đồn thổi: *“$300 → $123K trong 3 tháng”*, *“$440K lợi nhuận trong 20 ngày”*, *“85% win rate (850/1000)”*.

**Vì sao KHÔNG nên dùng làm dẫn chứng:** ngay cả repo tổng hợp use-case cũng **không có URL bài gốc**, chỉ ghi được handle + tiêu đề post X. Không có dump giao dịch, không có log, không có cách kiểm chứng. Đây là **tuyên bố marketing chưa kiểm chứng** — đưa vào tài liệu thì phải đóng khung rõ là “lời đồn”, hoặc tốt nhất là bỏ. Mình để đây như một **bài tập tư duy phản biện**: khi thấy con số ROI sốc về AI agent, mặc định nghi ngờ cho tới khi có dữ liệu.
:::

### Use-case phổ biến (gom nhóm nhanh)

Ngoài các case có số liệu ở trên, cộng đồng (qua user-stories/Discord/X) còn dùng Hermes cho:

| Nhóm | Ví dụ cụ thể |
|---|---|
| **Trợ lý cá nhân 24/7** | Chạy trên VPS/Raspberry Pi, ra lệnh qua Telegram/WhatsApp/iMessage; cron “standup” sáng/tối gom việc từ mọi project (có người mô tả dùng để quản lý ADHD). |
| **Second brain Obsidian** | Agent đọc/ghi vault markdown làm trí nhớ bền, sống sót qua reset context; viết nhật ký, dashboard. |
| **Dev workflow** | Review PR GitHub (cron + webhook); agent học style codebase qua nhiều ngày rồi tự chỉnh format output; multi-agent Plan → Code → QA → Ship, mỗi vai một model rẻ khác nhau. |
| **Voice-first** | Log bằng voice memo (fitness coach; accessibility cho người gõ khó, người dùng screen reader NVDA). |
| **Content / sáng tạo** | Cron research chủ đề video hằng tuần; sinh tweet/LinkedIn theo “giọng” cá nhân từ folder script cũ; tự build visual novel RenPy + ComfyUI. |
| **Business ops** | Agent “Chief of Staff” + sub-agent theo từng project (memory riêng), báo cáo WhatsApp hằng ngày; triage ticket trong Plane.so. |
| **Tối ưu chi phí** | Route OpenRouter theo tier rẻ; tận dụng free tier (GitHub Copilot, OpenRouter free model); local Ollama/SearXNG để khỏi trả phí API search. |
| **Khu vực / doanh nghiệp châu Á** | Adapter cho Feishu/WeCom/QQ/LINE (TQ/Nhật/ĐNA); yêu cầu Vertex AI; tuân thủ EU AI Act (audit, mã hoá memory). |

> Nguồn nhóm này chủ yếu là user-stories/Discord/X — **tốt để liệt kê ý tưởng, không nên trích con số tuyệt đối**.

### Phàn nàn & cạm bẫy thật (verify qua GitHub issues)

Đây là phần đáng tin nhất vì lấy từ issue có số liệu — đọc kỹ để **né trước**:

| Vấn đề | Chi tiết / số liệu | Nguồn |
|---|---|---|
| **Overhead token cố định lớn** | ~73%/call (~13.9K token): tool definitions + system prompt + skills index nạp mỗi lần → cháy token với model premium. | issue #4379 |
| **File context phình to** | `MEMORY.md`/`USER.md`/`SOUL.md` + daily log nạp full vào mỗi call → **~45K token/call** trong session 250 turn; đề xuất nén đa độ phân giải để giảm 80%+ chi phí. | issue #10585 |
| **Vòng lặp “Prompt too long”** | Đổi sang model local context nhỏ → ước lượng token sai, compression đôi khi làm prompt **TO HƠN**, retry lặp vô tận. | issue #23767 |
| **Fail im lặng khi cấu hình sai** | Vd GitHub token thiếu scope → push hỏng mà **không báo lỗi**. | DEV.to + nhiều issue |
| **Reasoning nông / output generic** | Ở domain chuyên sâu; kèm **“context bleed”** khi đổi chủ đề giữa chừng. | DEV.to |
| **Vi phạm cổng phê duyệt** | Một user chạy script RCA trên 129 session/23 ngày, **tự báo 112/129 session có vi phạm approval-gate** (con số do user tự đo). | issue #17619 |
| **Agent tự sửa code của chính nó** | Lo bị ghi đè khi update → cần pattern customize an toàn trước khi nâng cấp. | cộng đồng |

::: tip 🔍 Ghi chú về độ tin cậy của nguồn (đọc để tự thẩm định)
- **Mạnh nhất:** GitHub (repo + issues có dump số liệu: #4379, #10585, #23767, #17619), blog chính chủ Nous (`nousresearch.com/bells` + repo `autonovel`), X chính chủ `@NousResearch`/`@Teknium`. Hai blog first-person chất lượng nhất để chống “chung chung” là **Rumjahn (Substack)** và **DEV.to “5 impossible tasks”**.
- **Reddit:** lần tổng hợp này **không mở được URL/username cụ thể** nào — chỉ thấy dấu vết chung trên `r/LocalLLaMA` / `r/selfhosted` (than OpenClaw hay vỡ khi update, Hermes ổn định hơn; post “one month wisdom”; chạy Qwen local làm trợ lý Telegram; dùng Obsidian làm memory). Vì thế chương này **chỉ paraphrase, không trích username Reddit**.
- **So sánh với “OpenClaw”:** cảm nhận cộng đồng lặp lại là OpenClaw *“endless bugs / hay vỡ khi update”*, nhiều người chuyển sang Hermes vì *“ổn định hơn”*. Đây là **cảm nhận**, không phải benchmark.
- **Tuyệt đối nghi ngờ:** mọi con số tài chính kiểu weather-trading, “175K sao GitHub”, “224 tỷ token/ngày”, “40% nhanh hơn” — phần lớn từ trang SEO/AI-generated hoặc marketing chưa kiểm chứng độc lập.
:::

---

::: tip 📌 5 điều mang theo
1. Hermes Agent = **agent tự host, mã nguồn mở (MIT)**, nhớ xuyên phiên, càng dùng càng hiểu bạn.
2. **Phần mềm FREE** — bạn chỉ trả token (hoặc **$0** với Gemini OAuth/Ollama) + nơi host (~$5/tháng hoặc local).
3. **Người VN dùng được bình thường:** không giới hạn địa lý, không telemetry; Gemini OAuth/Ollama **không cần thẻ quốc tế**.
4. **Quy tắc sống còn:** model phải có context **≥ 64K**; dùng `hermes -c` để giữ trí nhớ; `/compress` khi token đầy.
5. **Bảo mật là của bạn:** giấu gateway sau VPN/SSH, duyệt lệnh nguy hiểm, **review skills tự sinh** trước production.
:::

> Nguồn chính thức: [trang chủ](https://hermes-agent.nousresearch.com/) · [docs](https://hermes-agent.nousresearch.com/docs/) · [GitHub (MIT)](https://github.com/NousResearch/hermes-agent). Tài liệu này tổng hợp tới giữa 2026 — kiểm tra lại nếu lệnh/giá đã đổi.
