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

::: tip 📌 5 điều mang theo
1. Hermes Agent = **agent tự host, mã nguồn mở (MIT)**, nhớ xuyên phiên, càng dùng càng hiểu bạn.
2. **Phần mềm FREE** — bạn chỉ trả token (hoặc **$0** với Gemini OAuth/Ollama) + nơi host (~$5/tháng hoặc local).
3. **Người VN dùng được bình thường:** không giới hạn địa lý, không telemetry; Gemini OAuth/Ollama **không cần thẻ quốc tế**.
4. **Quy tắc sống còn:** model phải có context **≥ 64K**; dùng `hermes -c` để giữ trí nhớ; `/compress` khi token đầy.
5. **Bảo mật là của bạn:** giấu gateway sau VPN/SSH, duyệt lệnh nguy hiểm, **review skills tự sinh** trước production.
:::

> Nguồn chính thức: [trang chủ](https://hermes-agent.nousresearch.com/) · [docs](https://hermes-agent.nousresearch.com/docs/) · [GitHub (MIT)](https://github.com/NousResearch/hermes-agent). Tài liệu này tổng hợp tới giữa 2026 — kiểm tra lại nếu lệnh/giá đã đổi.
