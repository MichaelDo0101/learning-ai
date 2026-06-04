---
title: 'Grok (xAI) — AI thẳng tính, đọc trend X theo thời gian thực'
description: 'Hướng dẫn thực chiến Grok của xAI cho người Việt: đăng ký qua X Premium/SuperGrok, giá & gói, dùng được ở VN không, DeepSearch & Live Search API, Grok Imagine tạo video có audio, prompt thật, bảo mật dữ liệu X — kèm bài tập.'
---

# Grok (xAI) — AI thẳng tính, đọc trend X theo thời gian thực

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">⚡</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn làm marketing cho một thương hiệu trà sữa ở TP.HCM. 9h sáng có drama nổ ra trên mạng xã hội liên quan ngành F&B, sếp hỏi *"giờ nói gì cho an toàn?"*. Mở **Grok** trong app X, bật **DeepSearch**, gõ tiếng Việt: *"Trend gì đang nóng nhất về F&B trên X trong 6 giờ qua? Tóm tắt 5 góc nhìn chính + sentiment (tích cực/tiêu cực) + 3 điều thương hiệu NÊN tránh nói lúc này."* → 30 giây có bản tóm tắt từ chính dòng trò chuyện đang diễn ra, kèm link bài gốc.
**💸 Lợi ích thực tế:** Grok đọc được dữ liệu **thời gian thực từ X (Twitter)** theo cách gốc mà ChatGPT/Gemini/Claude không có. Khi việc của bạn là "biết chuyện gì đang xảy ra ngay bây giờ", đây là vũ khí khác biệt.
:::

> **"Grok không phải là AI thông minh nhất hay code giỏi nhất. Nó là AI biết chuyện gì đang nóng trên X ngay lúc này, trả lời thẳng và ít vòng vo."**
> **Hiểu đúng điểm mạnh này — và đừng kỳ vọng nó thay Claude khi code — là khác biệt giữa 'dùng đúng việc' và 'thất vọng vì kỳ vọng sai'.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Hiểu Grok mạnh ở đâu, yếu ở đâu** so với ChatGPT/Claude/Gemini/Perplexity — để chọn đúng việc.
- **Đăng ký** Grok ở Việt Nam qua hai đường (X Premium hoặc SuperGrok), biết các gói & giá, biết cách thanh toán bằng thẻ VN.
- **Bật DeepSearch & Think mode** đúng lúc; hiểu vì sao mặc định Grok *không* real-time và cách "mở khoá" dữ liệu mới.
- **Gọi Grok bằng API** (tương thích OpenAI SDK) với Live Search để lấy dữ liệu web + X — kèm lệnh thật.
- **Tạo video ngắn có audio** bằng Grok Imagine cho nội dung social/UGC.
- **Nhận diện rủi ro dữ liệu** đặc thù của Grok (lịch sử opt-in mặc định trên X) và biết gì KHÔNG nên nhập.
:::

::: warning ⏱️ Lưu ý "hạn dùng" của thông tin — đọc kỹ với Grok
Đây là hiểu biết tới **giữa 2026**. Riêng dòng Grok đổi tên model và đổi giá **rất nhanh và bất thường** (nhảy từ 4.1 → "4.20" → 4.3). Tên model và mức giá API dưới đây bám theo `docs.x.ai` đọc được tới giữa 2026, nhưng **bạn nên tự kiểm tra lại** tại [docs.x.ai/developers/models](https://docs.x.ai/developers/models) trước khi dùng. Giá các gói tiêu dùng (consumer) là **tổng hợp từ nguồn bên thứ ba** (trang x.ai chặn truy cập trực tiếp), nên mọi con số gói consumer ở chương này đều ghi "~" hoặc "theo nguồn tổng hợp, tuỳ thời điểm".
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**Grok** là trợ lý AI (chatbot + mô hình nền) do **xAI** — công ty AI của Elon Musk — phát triển. Định vị marketing của xAI là *"maximally truth-seeking AI"* (AI tối đa hoá việc đi tìm sự thật) với phong cách trả lời **thẳng, hài hước/châm biếm** hơn các đối thủ — ít cái giọng "doanh nghiệp cẩn trọng" mà bạn quen thấy ở ChatGPT hay Claude.

Nhưng điểm khác biệt cốt lõi, lặp đi lặp lại trong mọi nguồn, là: **Grok có quyền truy cập native (gốc) dữ liệu thời gian thực từ X (Twitter)**. Không một đối thủ lớn nào có được dữ liệu mạng xã hội này theo cách gốc như vậy. Khi bạn hỏi "chuyện gì đang nóng", Grok đọc thẳng dòng trò chuyện đang diễn ra trên X chứ không chỉ tìm web.

URL chính thức:
- **Web app:** `https://grok.com` (và `https://grok.com/imagine` cho tạo ảnh/video).
- **Trang công ty/sản phẩm:** `https://x.ai` và `https://x.ai/grok`.
- **API & tài liệu:** `https://docs.x.ai`, `https://x.ai/api`.
- **Tin tức/model:** `https://x.ai/news` (ví dụ `https://x.ai/news/grok-4`).
- **Trong app X:** tab Grok tích hợp sẵn cho người dùng X Premium.

::: tip 🔑 Phân biệt 3 thứ dễ lẫn (đọc kỹ kẻo nhầm tiền)
- **Grok** = chatbot/sản phẩm của xAI (cái bạn dùng ở grok.com hoặc trong app X). Bài này nói về cái này.
- **xAI API** = dịch vụ lập trình tính tiền theo token cho dev tại `api.x.ai` — khác trải nghiệm chat.
- **"XAI" / "GROK" trên các sàn coin** (Bitget, Bybit, CoinGecko) = **token tiền mã hoá HOÀN TOÀN KHÁC**, KHÔNG liên quan đến việc trả phí dùng chatbot Grok. Đừng mua nhầm coin tưởng là mua gói AI.
:::

**Mốc thời gian quan trọng** (xác nhận từ release notes chính thức `docs.x.ai/developers/release-notes`):

| Thời điểm | Sự kiện |
|---|---|
| **04/2025** | Grok 3 lên GA (general availability) qua API. |
| **09/07/2025** | **Grok 4** ra mắt (livestream), cùng tier cao **Grok 4 Heavy** (multi-agent). Huấn luyện trên cụm GPU "Colossus" ở Memphis (~200k GPU theo công bố xAI), dùng RL quy mô lớn (xAI nói ~6× compute efficiency so với Grok 3). |
| **11/2025** | Grok 4.1 và Grok 4.1 Fast (Enterprise API). |
| **03/2026** | Grok 4.20 và Grok 4.20 Multi-agent. |
| **14/05/2026** | **Grok Build** ra mắt beta — đây là **CLI coding agent** chạy trong terminal (cùng họ Claude Code / Codex CLI), *không phải* một model. Beta cho SuperGrok & X Premium+ (theo Reuters 05/2026). |
| **15/05/2026** | Một số model cũ bị **retire** (Grok 4, Grok 4.1 Fast, Grok Code Fast 1) — request redirect sang `grok-4.3` (theo nguồn tới giữa 2026). |
| **20/05/2026** | Model `grok-build-0.1` công bố qua API (256K context) — model coding *chạy bên dưới* CLI Grok Build, khác với bản thân CLI. |
| Tới giữa 2026 | Docs còn list alias `grok-4.3` là model khuyến nghị mặc định cho chat/coding (*coi như "bản mới nhất tới giữa 2026", có thể đổi tên*). |

**Những việc Grok làm tốt (theo research):**

| Nhóm việc | Làm được gì | Ghi chú |
|---|---|---|
| **Chat + suy luận** | Mô hình nền Grok 4/4.x, có chế độ reasoning. Context lớn (xem hộp bên dưới). | Knowledge cutoff ~11/2024 — không tự có sự kiện mới nếu *không* bật search. |
| **DeepSearch / DeeperSearch** | Chạy nhiều lượt tìm trên web + X rồi tổng hợp, trả **báo cáo có trích nguồn** thay vì câu trả lời một nguồn. | USP cho việc "tin tức tuần này". |
| **Think / Big Brain mode** | Bật chuỗi suy luận dài hơn cho bài code/toán/khoa học khó. | Big Brain ở SuperGrok trở lên. |
| **Grok Imagine** | Tạo ảnh + video: 5 workflow (text-to-image, image edit, text-to-video, video-to-video, image-to-video). | Bản **1.5** (ra ~04/06/2026, theo nguồn) tạo video tới **~15s**, 720p, **có audio native**. Version đổi nhanh (1.0 → 1.5) — kiểm tra lại grok.com/imagine. |
| **Voice mode** | Trò chuyện giọng nói rảnh tay; có Voice Agent API cho dev. | |
| **Tích hợp X native** | Phân tích tweet, trend, sentiment, tin breaking real-time. | **USP lớn nhất.** |
| **API** | Tương thích **OpenAI SDK & Anthropic SDK** (chỉ đổi base URL), có **Live Search**, function calling, vision (ảnh ≤ 20MB). | |
| **Grok Build** | **CLI coding agent** chạy trong terminal (giống Claude Code / Codex CLI), chạy bằng model `grok-code-fast-1` + `grok-build-0.1`. **Không phải một model.** | Beta cho SuperGrok & X Premium+ (theo Reuters 05/2026). |

::: tip 💡 Lưu ý về context window (con số đang biến động) — và đây là một mặt Grok THẮNG
Grok 4 gốc công bố context **~256K token** (theo công bố lúc ra mắt). Docs giữa-2026 list tới **1M token** cho dòng `grok-4.20`/`grok-4.3`, và dòng **Grok 4 Fast tới ~2M token** (theo nguồn). Context dài là **điểm bán hàng thật** của Grok so với nhiều đối thủ. Các con số này là **theo docs/nguồn tới giữa 2026**, nên nếu việc của bạn phụ thuộc cứng vào context dài, hãy kiểm tra lại trang model trước khi tin. Dù 256K hay 1M–2M, điểm cần nhớ là: **kiến thức nội tại của model dừng ở ~11/2024** — muốn có gì mới phải bật search.
:::

### So với công cụ khác — "khi nào chọn cái nào"

Không có công cụ "thắng mọi mặt". Grok thắng tuyệt đối ở **dữ liệu real-time mạng xã hội**, nhưng thua ở những mặt khác. Bảng dưới đây là bức tranh **định tính** nhất quán across nhiều nguồn (Reddit r/grok, các blog so sánh 2026) tới giữa 2026:

| Tiêu chí | Grok | ChatGPT | Claude | Gemini | Perplexity |
|---|---|---|---|---|---|
| **Real-time / mạng xã hội** | **Mạnh nhất** (X native) | Có search | Yếu hơn về social | Có search (Google) | Mạnh (answer engine) |
| **Coding** | Khá, nhưng cộng đồng nói thua Claude | Tốt | **Tốt nhất** (đồng thuận) | Tốt | Yếu |
| **Viết lách / chất văn** | Khá, cá tính | Tốt | **Tốt nhất** | Tốt | Yếu (văn "cứng") |
| **Trích nguồn / verify** | Có nhưng kém nổi bật | Khá | Khá | Khá | **Tốt nhất** (citation-first) |
| **Cá tính / giọng** | **Thẳng, hài, ít "corporate"** | Trung tính | Cẩn trọng | Trung tính | Trung tính |
| **Context window** | **Rất lớn** (tới 1M–2M theo nguồn) | Vừa | Lớn (~200K–1M) | Rất lớn | Vừa |
| **Ảnh / Video** | Mạnh (Imagine, video + audio) | Mạnh (Sora/ảnh) | Không tạo ảnh | Mạnh (Veo/Imagen) | Không |

::: warning 📉 Lưu ý về benchmark — đừng tin số cụ thể
Trên mạng có nhiều "bảng benchmark" so Grok với các phiên bản tương lai như "GPT-5.5", "Claude Opus 4.7"… kèm số phần trăm SWE-bench rất kêu. **Phần lớn không xác minh được từ nguồn gốc** và lẫn lộn các phiên bản chưa phát hành. Hãy đọc bảng trên như **xu hướng tương quan**, không phải số liệu chốt. Chương này cố tình *không* đưa con số benchmark cụ thể để tránh dẫn bạn đi sai.
:::

**Khi nào chọn cái nào (đồng thuận từ power-user 2026):**
- **Chọn Grok** khi: cần tin/trend "nóng" trên X, theo dõi sentiment mạng xã hội, muốn câu trả lời thẳng/ít né, hoặc cần "đi trước cuộc trò chuyện toàn cầu vài phút"; tạo video ngắn có audio.
- **Chọn Claude** khi: code, refactor, viết dài chất lượng cao, agent chạy lâu.
- **Chọn ChatGPT** khi: "safe default" đa năng, độ tin cậy ổn định, hệ sinh thái plugin/ứng dụng lớn.
- **Chọn Gemini** khi: logic phức tạp, tích hợp Google Workspace, đa phương thức.
- **Chọn Perplexity** khi: nghiên cứu cần trích dẫn kiểm chứng được (sinh viên, nhà báo, analyst).

::: warning ⛔ Khi nào KHÔNG nên dùng Grok (giới hạn thật)
Grok có cá tính riêng, nhưng **không phải việc gì cũng hợp**. Né — hoặc dùng tool khác — ở các trường hợp:
- **Code là trọng tâm, cần độ tin cậy cao** → cộng đồng đồng thuận Claude/ChatGPT tốt hơn. Có câu nói nửa đùa trong giới dev: *"Grok can't code, not like Claude."*
- **Cần trích dẫn kiểm chứng được** (học thuật, báo chí, pháp lý) → Perplexity citation-first minh bạch hơn, dễ fact-check hơn.
- **Kiến thức tĩnh chính xác về chủ đề ÍT bàn trên X** → cộng đồng nêu Grok dễ "bịa" (hallucinate) hơn ở mảng này; nên cross-check.
- **Xử lý dữ liệu nhạy cảm / PII / khách hàng** → rủi ro train + lịch sử opt-in mặc định trên X (xem Mục 04). Tránh, hoặc dùng tier doanh nghiệp với DPA rõ ràng.
- **Cần hạn mức ổn định cho voice/video sản xuất hàng loạt** ở gói consumer → đang bị siết (2026); cân nhắc API hoặc tool chuyên.
- **Không muốn dính hệ sinh thái X** hoặc không muốn trả tiền cho cả X lẫn Grok.
:::

---

## 02 · Đăng ký & truy cập — bối cảnh VN

### Dùng được ở Việt Nam không? — **Có.**

Nguyên tắc đơn giản: **Grok có ở mọi nước mà X Premium được bán.** X có mặt ở Việt Nam, nên Grok dùng được tại VN — qua `x.com/premium` (trong app X) hoặc trực tiếp `grok.com`. Có nguồn trong nước (các trang công nghệ VN, shop) đã bàn giá và hướng dẫn đăng ký, xác nhận khả dụng.

::: warning ⚠️ Trải nghiệm theo vùng có thể đổi
Từng có thời điểm app báo *"not available in this region"* ở vài nước. Nếu bạn gặp lỗi vùng, thử đăng nhập qua một tài khoản X hợp lệ trước (xem Mục 04 · FAQ). Trải nghiệm theo khu vực có thể thay đổi theo thời điểm, nên đây là điều cần lưu ý chứ không phải đảm bảo cứng.
:::

### Hai đường vào Grok

```text
Đường 1 — Qua X (Twitter):
  Mua X Premium / X Premium+ tại x.com/premium
  → mở khoá tab Grok ngay trong app X.

Đường 2 — Qua grok.com / app Grok:
  Đăng ký SuperGrok trực tiếp tại grok.com (đăng nhập bằng tài khoản X).
```

### Các gói & giá

::: warning 💸 Đọc kỹ: các con số gói consumer là "theo nguồn tổng hợp"
Trang x.ai chặn truy cập trực tiếp (trả lỗi 403), nên các mức giá gói tiêu dùng dưới đây tổng hợp từ **nhiều trang bên thứ ba** tới giữa 2026. Quyền lợi và phân tầng giữa các trang **lệch nhau và đổi theo tháng**. Hãy coi đây là **ước lượng định hướng**, kiểm tra lại tại `x.com/premium` và `grok.com` trước khi rút ví.
:::

| Gói | Giá (~, theo nguồn) | Được gì chính |
|---|---|---|
| **Free** | $0 | Có, nhưng **giới hạn chặt** (theo nguồn ~10 prompt / 2 giờ; siết thêm với ảnh/video/voice). **DeepSearch & Think tính hạn mức RIÊNG, thấp hơn — hết nhanh hơn chat thường.** |
| **X Premium** | ~$8/tháng | Grok kèm các tính năng của X. |
| **SuperGrok Lite** | ~$10/tháng | Musk công bố ~25/03/2026 (theo nguồn). |
| **SuperGrok** | ~$30/tháng (hoặc ~$300/năm) | Full Grok 4, DeepSearch, Big Brain, voice, Imagine. |
| **X Premium+** | ~$40/tháng | Mở Grok 4 đầy đủ hơn. |
| **SuperGrok Heavy** | ~$300/tháng | Grok 4 Heavy, multi-agent, context lớn nhất, benchmark cao nhất (ra mắt 09/07/2025). |

::: tip 💸 Mẹo chọn gói cho người Việt
- **Mới thử / dùng ít** → **Free** đủ để cảm nhận, nhưng giới hạn ~10 prompt/2h tới rất nhanh.
- **Đã dùng X hằng ngày** → **X Premium (~$8)** là đường rẻ nhất để có Grok kèm luôn quyền lợi X.
- **Dùng Grok nghiêm túc** (DeepSearch, Imagine, Big Brain) → **SuperGrok (~$30)**. Trả năm (~$300) rẻ hơn trả tháng.
- **Heavy (~$300/tháng)** chỉ dành cho người thật sự cần multi-agent/benchmark đỉnh — đa số người Việt **không cần**.
- Nếu bạn là **dev** và cần ổn định/khối lượng lớn → cân nhắc **API** (xem dưới) thay vì gói consumer đang bị siết hạn mức.
:::

### API pricing (theo `docs.x.ai`, giữa 2026)

| Model | Giá input / output (~/1M token) | Context |
|---|---|---|
| `grok-4.3` (và dòng `grok-4.20-*`) | ~$1.25 in / **~$0.20 cached input** / ~$2.50 out | tới 1M (theo docs) |
| `grok-build-0.1` | ~$1.00 in / ~$2.00 out | 256K |

::: warning ⚠️ Đừng nhầm: "$0.20" KHÔNG phải một model "Fast" rẻ riêng
Có một hiểu nhầm phổ biến rằng tồn tại một dòng "Grok 4 Fast / 4.1 Fast" giá ~$0.20 input. Theo nguồn tới giữa 2026: **Grok 4.1 Fast (cùng Grok 4, Grok Code Fast 1) đã bị retire ngày 15/05/2026**, request redirect sang `grok-4.3`. Con số **$0.20 thực ra là giá *cached input*** của `grok-4.3` (không phải một model rẻ riêng). Trước khi nhúng vào production, đọc lại `docs.x.ai/developers/models` để lấy tên model + giá chính xác — danh sách model giữa-2026 chỉ còn `grok-4.3`, `grok-4.20-*`, `grok-build-0.1`.
:::

::: tip 💸 3 đòn bẩy giảm chi phí API thật sự (thay cho "model Fast" đã biến mất)
- **Cached input ~$0.20/1M** (tiết kiệm ~85% so với $1.25): tận dụng khi gửi đi gửi lại cùng một khối context (system prompt dài, tài liệu nền lặp).
- **Batch API giảm ~20–50%**: cho việc chạy hàng loạt không cần real-time (phân loại, tóm tắt số lượng lớn).
- **Free API credit tới ~$150/tháng** qua chương trình **chia sẻ dữ liệu** (theo nguồn). ⚠️ Đây là **đổi dữ liệu lấy credit** — đừng bật cho dữ liệu khách hàng / PII (xem Mục 04).
:::

### Thanh toán ở Việt Nam

```text
Cách chính thống (khuyến nghị):
  • Thẻ tín dụng/ghi nợ quốc tế (Visa / Mastercard) hoặc thẻ prepaid.
  • Nhiều người VN dùng thẻ ảo (virtual card) hoặc Visa quốc tế — X chấp nhận.

Cách bên thứ ba (RỦI RO — cân nhắc kỹ):
  • Dùng USDT để trả X Premium.
  • Mua tài khoản group-buy / chia sẻ từ shop VN (rẻ hơn nhưng
    rủi ro bảo mật + có thể vi phạm điều khoản dịch vụ).
```

::: warning ⚠️ Cảnh báo về tài khoản group-buy & coin nhầm tên
- **Tài khoản chia sẻ/group-buy** rẻ thật, nhưng bạn **trao quyền truy cập cho bên lạ**, dễ mất tài khoản và vi phạm ToS của X. Với việc quan trọng, hãy tự trả bằng thẻ của bạn.
- Nhắc lại vì rất hay nhầm: **"XAI/GROK" trên sàn coin là token tiền mã hoá khác**, KHÔNG phải cách trả phí dùng chatbot Grok. Đừng chuyển coin để "mua gói AI".
:::

---

## 03 · Workflow thực chiến — làm từng bước (có prompt thật)

Phần này đi từ "mở app" đến "xong việc", cho cả người dùng thường (no-code) lẫn dev (API). Mỗi bước có cách **tự kiểm** (verify).

### A. Dùng web/app — không cần code

#### Bước 1 — Đăng nhập

Vào [grok.com](https://grok.com) hoặc mở tab Grok trong app X → đăng nhập bằng tài khoản X.
→ **Verify:** vào được màn hình chat trống của Grok.

#### Bước 2 — Chọn chế độ phù hợp

- **Fast** → nháp nhanh, hỏi đáp thường ngày.
- **Expert / Heavy** → suy luận sâu (bài khó, phân tích nhiều bước).

→ **Verify:** tên chế độ hiển thị đúng trên thanh chọn.

#### Bước 3 — Bật DeepSearch & Think đúng lúc (QUAN TRỌNG)

Đây là điểm **hay bị hiểu lầm nhất**: theo mặc định Grok **không** trả lời real-time. Muốn có dữ liệu web/X mới, bạn phải **bật DeepSearch**. Muốn suy luận dài hơn, bật **Think**.

→ **Verify:** khi bật DeepSearch, câu trả lời kèm trích nguồn (link bài web/X), không phải kiến thức tĩnh.

#### Bước 4 — Đính kèm dữ liệu & nêu rõ bối cảnh

Đính kèm file/ảnh, rồi nói rõ *"đây là gì, dùng thế nào"* và gán persona (vai trò) cho Grok.

#### Bước 5 — Prompt mẫu nhiều bước (thật)

```text
Step 1: Dùng DeepSearch tìm các nghiên cứu mới (2025–2026) về [chủ đề].
Step 2: Ở Think mode, tổng hợp và đề xuất 3 chiến lược dựa trên bằng chứng,
        kèm trích nguồn cho từng luận điểm.
Nếu không tìm thấy nguồn đáng tin cho ý nào, hãy ghi rõ "chưa có nguồn"
thay vì suy đoán.
```

→ **Verify:** câu trả lời có nguồn click được; mở thử thấy nguồn thật, không phải link hỏng.

#### Bước 6 — Tạo ảnh/video với Grok Imagine

Vào [grok.com/imagine](https://grok.com/imagine) → nhập prompt → chọn workflow (vd `text-to-video`) → Grok tạo **4 biến thể song song** → chọn 1 bản → xuất.

Bản **Grok Imagine 1.5** (ra ~04/06/2026, theo nguồn) tạo video tới **~15 giây, 720p**, có **audio đồng bộ native** (nhạc nền, hiệu ứng, hội thoại lip-sync). Có **Agent Mode (beta)** ghép clip thành phim dài hơn, và preset như *Short Film*, *UGC Product Stories*, *Brand Identity*. Version đổi nhanh (trước đó là 1.0 ~10s) — luôn kiểm tra lại tại grok.com/imagine.

```text
Prompt mẫu (text-to-video, UGC sản phẩm):
"Cận cảnh ly trà sữa trân châu đặt trên bàn gỗ quán cafe, ánh sáng ấm
buổi chiều, hơi nước mỏng bốc lên, một bàn tay nhẹ nhàng khuấy ống hút.
Tông màu ấm, cảm giác cozy. Có tiếng nhạc lo-fi nhẹ nền."
→ chọn preset "UGC Product Stories" → tạo 4 biến thể → chọn bản đẹp nhất.
```

→ **Verify:** clip ra đúng mô tả, có audio; nếu chất lượng tụt (xem Mục 04) thì thử lại prompt hoặc dùng tool chuyên cho ảnh tĩnh.

### B. Dùng API (developer) — lệnh thật

xAI API **tương thích OpenAI SDK và Anthropic SDK** — nghĩa là code cũ của bạn gần như chỉ cần **đổi base URL**.

#### Bước 1 — Lấy API key & nạp credit

Tạo key tại **console quản lý API** của xAI (theo nguồn tới giữa 2026 là `console.x.ai` — `accounts.x.ai` chỉ là trang đăng nhập tài khoản, không quản lý key/credit; nếu lạc, truy cập qua [quickstart](https://docs.x.ai/developers/quickstart)), rồi **nạp credit trước** khi gọi.

```bash
export XAI_API_KEY="..."   # dán key của bạn
```

#### Bước 2 — Gọi thử bằng cURL

```bash
curl https://api.x.ai/v1/chat/completions \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "model": "grok-4.3",
        "messages": [{ "role": "user", "content": "Explain quantum computing" }] }'
```

→ **Verify:** nhận JSON có `choices[].message.content`. Nếu lỗi 401 → key sai; lỗi về credit → chưa nạp tiền.

#### Bước 3 — Dùng OpenAI SDK, chỉ đổi baseURL

```javascript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'   // điểm khác biệt duy nhất so với OpenAI
})

const res = await client.chat.completions.create({
  model: 'grok-4.3',                // hoặc model dated, vd 'grok-4-0709'
  messages: [{ role: 'user', content: 'Tóm tắt 3 ý chính của bài này...' }],
  temperature: 1                    // 0–2, mặc định 1
})
console.log(res.choices[0].message.content)
```

- **Base URL:** `https://api.x.ai/v1`; endpoint chính `POST /chat/completions`.
- **Tham số:** `model` (vd `grok-4.3` hoặc dated `grok-4-0709`), `messages`, `temperature` (0–2, default 1), `max_tokens`.

#### Bước 4 — Bật Live Search để có dữ liệu real-time (điểm dễ quên)

Mặc định API **KHÔNG** real-time — bạn phải bật **search tool** (Live Search: web + X + news). Đây là hiểu lầm phổ biến nhất khi mới dùng API Grok: gọi suông thì chỉ có kiến thức tới ~11/2024.

→ **Verify:** với search bật, response trả về có dữ liệu sự kiện mới + nguồn; không bật thì model "không biết" tin gần đây.

::: tip 🔌 No-code: nối Grok với công cụ bạn đang dùng
Không biết code vẫn tự động hoá được. Dùng connector kiểu **Albato / Zapier** để nối Grok với **Gmail, HubSpot, WhatsApp, Slack, Google Sheets**: tóm tắt email tự động, auto-reply, hỏi CRM bằng ngôn ngữ tự nhiên… Dựng workflow trong vài phút, không viết dòng code nào.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 🟢 Mẹo ăn tiền

::: tip 6 mẹo dùng Grok như dân chuyên
1. **Luôn nhớ bật search** khi cần tin mới — DeepSearch (app) hoặc Live Search (API). Mặc định Grok *không* real-time; đây là lỗi kỳ vọng số 1.
2. **Dùng Grok đúng việc của nó:** trend/sentiment/tin nóng trên X. Việc code/viết dài → để cho Claude/ChatGPT.
3. **Yêu cầu trích nguồn + cho phép nói "chưa có nguồn"** → giảm bịa, dễ fact-check (Grok vốn yếu khoản verify so với Perplexity).
4. **Cross-check chủ đề tĩnh/ít trending** bằng tool khác — đây là điểm yếu đã biết của Grok.
5. **Với dev cần khối lượng lớn**, dùng dòng **Fast** (rẻ hơn nhiều) cho phân loại/tóm tắt hàng loạt; để model lớn cho việc khó.
6. **Tận dụng cá tính thẳng** của Grok cho brainstorm/red-team ý tưởng — nó ít "nịnh" và dám nói thẳng hơn.
:::

### 🔴 Lỗi & cạm bẫy

::: warning 🚨 Hiểu lầm số 1: "Grok luôn real-time"
**KHÔNG.** Mặc định Grok trả lời bằng kiến thức nội tại (cutoff ~11/2024). Phải **bật DeepSearch** (app) hoặc **Live Search** (API) thì mới có dữ liệu mới. Nếu thấy Grok "không biết" tin tuần này → gần như chắc chắn bạn quên bật search.
:::

::: warning ⚠️ Các bẫy khác cần nhớ
- **"Grok is under high demand" / 429 / rate limit:** tải cao hoặc chạm hạn mức gói → đợi reset (Free ~mỗi 2h), giảm tần suất, nâng gói, hoặc thử giờ thấp điểm.
- **Bị siết hạn mức ảnh/video/voice (05/2026):** nhiều người trả phí phản ánh bị siết mạnh — voice khoá sau ~20–30 phút; video Heavy tụt từ ~500 → ~160/ngày (theo nguồn). Cách xử: theo dõi quota, cân nhắc giá trị gói trước khi mua, dùng API nếu cần ổn định hơn.
- **Hallucination cao hơn ở chủ đề KHÔNG trending:** Grok mạnh ở cái đang "hot" trên X, yếu hơn cho kiến thức tĩnh/ít bàn → cross-check, hoặc dùng Perplexity/ChatGPT để verify.
- **Ảnh bị "censored"/chất lượng tụt sau update:** nhiều phàn nàn trên r/grok về "shadow moderation" làm ảnh nhạt đi → kỳ vọng phù hợp, hoặc dùng Midjourney/FLUX cho ảnh chất.
- **Outage:** lịch sử status xAI ghi sự cố 10/03/2026, 02/03/2026, lỗi/latency 27/01/2026 → khi nghi ngờ, check `apistatuscheck.com/is-grok-down` hoặc status page của xAI.
:::

::: warning 🔒 Quyền riêng tư & dữ liệu — phần ĐẶC BIỆT quan trọng với Grok
Grok có một vấn đề dữ liệu **đặc thù** mà các tool khác không có ở mức tương tự — đọc kỹ nếu bạn dùng cho việc công ty.

**(a) Lịch sử opt-in mặc định trên X:**
- **07/2024** người dùng phát hiện X **mặc định bật (opt-in)** việc dùng post + tương tác với Grok để **huấn luyện AI**, mà **không xin phép rõ ràng**.
- **Từ 03/2025 xAI và X về chung một nhà** (xAI mua lại X, ~$33B, theo nguồn) → ranh giới giữa "dữ liệu mạng xã hội" và "dữ liệu train" càng mờ, vì cùng một thực thể kiểm soát cả hai.

**(b) Pháp lý EU:**
- Ủy ban Bảo vệ dữ liệu Ireland (DPC) hành động **08/2024**; tổ chức **noyb** nộp **9 khiếu nại** ở Áo, Bỉ, Pháp, Hy Lạp, Ireland, Ý, Hà Lan, Ba Lan, Tây Ban Nha.
- DPC mở **điều tra chính thức (Statutory Inquiry, Section 110) ngày 11/04/2025** về dữ liệu huấn luyện, với thực thể X Internet Unlimited Company.
- **17/02/2026 (theo nguồn):** DPC mở **điều tra thứ hai** (cũng Section 110) về việc Grok tạo **ảnh "nudification" / hình ảnh thân mật không được đồng thuận** (gồm cả liên quan trẻ em) — củng cố nhận định Grok rủi ro dữ liệu/nội dung hơn các tool khác.

**(c) Opt-out có giới hạn:**
- Với **chat của bạn**, opt-out là thật — **nhưng chỉ phủ chat, không phủ post công khai** trên X; và dữ liệu **đã train rồi thì không rút lại được**.
- Có nguồn cảnh báo điều khoản dịch vụ X cho phép dùng/chia sẻ nội dung người dùng khá rộng (*diễn giải còn tranh cãi, nên đọc với thái độ thận trọng*).

**(d) API doanh nghiệp khác:**
- Với **API/tier doanh nghiệp**, chính sách dữ liệu thường khác (enterprise) — nên kiểm tra **DPA** riêng nếu xử lý dữ liệu khách hàng.
- **Data residency:** dev cần dữ liệu ở lại khu vực có thể gọi qua **endpoint vùng**, ví dụ `https://eu-west-1.api.x.ai` (theo `docs.x.ai/developers/regions`) — một lối thoát kỹ thuật cho lo ngại GDPR / Nghị định 13.

**(e) TUYỆT ĐỐI không nhập vào Grok / không đăng lên X:**
- Số CMND/CCCD, số thẻ ngân hàng, mật khẩu, OTP.
- Hợp đồng/NDA, tài liệu mật, mã nguồn độc quyền.
- Dữ liệu cá nhân của khách hàng (họ tên, SĐT, địa chỉ, hồ sơ) — ở VN có thể **vi phạm Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân** (*đây là gợi ý liên hệ, không phải tư vấn pháp lý*).

**Nguyên tắc vàng:** coi mọi thứ gõ vào Grok hoặc đăng trên X như **có thể bị dùng để train**. Không nhập dữ liệu nhạy cảm.
:::

::: details ❓ FAQ & lỗi hay gặp (bấm để mở)
**"Grok is under high demand" / hết lượt — làm sao?**
Tải cao hoặc chạm hạn mức gói. Cách xử: (1) **đợi reset** (Free ~mỗi 2h); (2) giảm tần suất gửi; (3) thử **giờ thấp điểm**; (4) nếu dùng đều → **nâng gói** hoặc chuyển sang **API** để ổn định hơn.

**"Not available in this region" — làm sao dùng ở VN?**
Đăng nhập qua một **tài khoản X hợp lệ** trước, rồi vào Grok. Trải nghiệm theo vùng có thể thay đổi theo thời điểm; nếu vẫn lỗi, thử qua `grok.com` thay vì trong app, hoặc ngược lại.

**Grok trả lời không "real-time" như mình tưởng?**
Vì **mặc định không bật search**. Bật **DeepSearch** (app) hoặc **Live Search** (API). Đây là hiểu lầm phổ biến nhất.

**Voice/video bị khoá nhanh dù mình trả phí?**
Từ 05/2026 nhiều quota consumer bị **siết mạnh** (voice ~20–30 phút, video Heavy tụt mạnh — theo nguồn). Theo dõi quota; nếu cần sản xuất hàng loạt ổn định, cân nhắc **API** hoặc tool chuyên.

**Ảnh tạo ra bị nhạt/"censored" sau update?**
Cộng đồng phản ánh "shadow moderation". Thử đổi prompt; với ảnh chất lượng cao/ổn định, dùng **Midjourney/FLUX**. Grok Imagine mạnh nhất ở **video ngắn có audio**, không phải ảnh tĩnh nghệ thuật.

**API gọi suông mà không có tin mới?**
Bạn quên **bật search tool**. Mặc định API chỉ có kiến thức tới ~11/2024.

**Grok có đang down không?**
Check `apistatuscheck.com/is-grok-down` hoặc trang status của xAI. Lịch sử có vài sự cố đầu–giữa 2026.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm thật 2–3 bài dưới đây để biến "đọc hiểu" thành "làm được". Mỗi bài có tiêu chí hoàn thành rõ ràng.

### 🧪 Bài 1 — DeepSearch một trend đang nóng (cơ bản)

**Mục tiêu:** cảm nhận USP real-time của Grok và phản xạ kiểm nguồn.

1. Mở Grok, **bật DeepSearch**.
2. Dùng prompt:

```text
Trend gì đang được bàn nhiều nhất trên X trong 24 giờ qua về [lĩnh vực bạn quan tâm]?
Tóm tắt 5 góc nhìn chính + sentiment chung (tích cực/tiêu cực/trung lập),
kèm link bài gốc cho mỗi góc nhìn.
```

3. **Mở thử 2–3 link** nó đưa ra: có thật không, có đúng chủ đề không?

**✅ Đạt khi:** bạn xác nhận được nguồn là thật và đúng chủ đề (hoặc bắt được chỗ nó dẫn link hỏng/lạc đề). Ghi lại 1 câu: Grok khác gì so với hỏi Google.

### 🧪 Bài 2 — So sánh chéo "real-time" với một tool khác (quan trọng)

**Mục tiêu:** tự kiểm điểm mạnh/yếu của Grok thay vì tin lời quảng cáo.

1. Chọn một câu hỏi về **tin mới tuần này** (vd giá vàng, một sự kiện công nghệ).
2. Hỏi **Grok (bật DeepSearch)** và hỏi **một tool khác** (ChatGPT bật web search, hoặc Perplexity) cùng câu đó.
3. So sánh: ai có dữ liệu mới hơn? Ai trích nguồn rõ hơn? Ai bịa?

**✅ Đạt khi:** bạn viết được 3 gạch đầu dòng về *Grok thắng ở đâu, thua ở đâu* cho đúng câu hỏi đó. Đây là phản xạ "chọn tool theo việc" bạn cần giữ mãi.

### 🧪 Bài 3 — Gọi Grok qua API (cho người biết chút code)

::: warning Cần API key & credit
Bài này cần tạo key tại **console API của xAI** (theo nguồn là `console.x.ai`; nếu lạc, vào qua [quickstart](https://docs.x.ai/developers/quickstart)) và **nạp credit trước**. Nếu chưa muốn tốn tiền, đọc hiểu code và làm Bài 1–2 trước.
:::

**Mục tiêu:** chứng minh "đổi base URL là chạy" + hiểu vì sao cần bật search.

1. Set key: `export XAI_API_KEY="..."`.
2. Chạy lệnh cURL ở Mục 03 · B · Bước 2 với `model: "grok-4.3"`. (Mẹo: nếu `grok-4.3` bị đổi tên, dùng **alias không có hậu tố ngày** để luôn trỏ bản stable mới nhất — docs xác nhận alias tự point latest stable.)
3. Hỏi một câu về **tin rất mới** (vd sự kiện hôm qua). Quan sát: gọi suông thì nó **không biết**.
4. (Nâng cao) Bật **Live Search** theo docs rồi hỏi lại cùng câu.

**✅ Đạt khi:** bạn thấy rõ khác biệt giữa **gọi suông** (kiến thức tĩnh, không có tin mới) và **bật Live Search** (có dữ liệu mới + nguồn). Đây chính là điểm dễ quên nhất khi dựng app với Grok.

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom các ví dụ **có thật** từ tin tức chính thống, công bố của xAI, và tổng hợp thảo luận cộng đồng tới giữa 2026. Mục đích: cho bạn thấy Grok chạy ra sao **ngoài đời thật**.

::: warning ⚠️ Đọc kỹ về độ tin của nguồn
Nhiều nội dung dưới đây là **second-hand** — tổng hợp lại thảo luận Reddit/X qua blog và bài báo, **không phải** trích trực tiếp thread gốc. Vì vậy:
- Các "case study công ty cụ thể" trên blog thường **không có tên/nguồn gốc xác minh** → ở đây paraphrase chung, **không bịa** tên công ty/handle/URL.
- Số liệu hạn mức/outage lấy từ trang bên thứ ba (datastudios, apistatuscheck, piunikaweb) — **đúng xu hướng** nhưng ngày/số cụ thể nên đọc với chữ "theo nguồn".
- Phần nào có **nguồn mạnh** (Reuters, release notes chính thức) được ghi rõ.
:::

### 📡 CS1 — Theo dõi tin/trend real-time trên X (use-case "best-in-class")

- **Bối cảnh:** Cộng đồng r/grok (~45k thành viên) thường xuyên bàn về điểm mạnh thật sự của Grok.
- **Làm gì:** Dùng Grok (DeepSearch bật) để theo dõi **sự kiện đang diễn ra, breaking news, đo sentiment** ngay trên dòng trò chuyện X.
- **Kết quả:** Đồng thuận cộng đồng là Grok **dẫn đầu rõ rệt** ở mảng này — không tool lớn nào bám sát "chuyện đang xảy ra" tốt như vậy, vì các tool khác phải đi qua tầng tìm web chứ không đọc gốc dữ liệu X.
- **Bài học:** Khi việc của bạn là "biết ngay chuyện gì đang nóng", Grok là lựa chọn số 1. Nhưng đừng suy ra nó giỏi mọi thứ — đây là use-case *hẹp mà sâu*.
- **Nguồn:** tổng hợp r/grok qua aitooldiscovery (*paraphrase, không gắn @handle cụ thể*).

### 🔀 CS2 — "Route-by-task": power user 2026 dùng nhiều tool, mỗi tool một việc

- **Bối cảnh:** Các bài tổng hợp workflow của power-user 2026.
- **Làm gì:** Định tuyến công việc theo thế mạnh — research **"tuần này"** → Grok; draft 5.000 từ → ChatGPT/Claude; Q&A tài liệu dài → mô hình context lớn; verify nguồn → Perplexity.
- **Kết quả:** Không ai cố ép một tool làm tất cả; chia việc cho đúng thế mạnh ra kết quả tốt hơn.
- **Bài học:** Grok là **một mảnh** trong bộ công cụ, không phải "all-in-one". Trả tiền cho Grok khi bạn thật sự cần mảng real-time/X.
- **Nguồn:** writingmate, aitooldiscovery (*second-hand*).

### 🏢 CS3 — Conversational analytics nội bộ doanh nghiệp

- **Bối cảnh:** Một số doanh nghiệp muốn cho quản lý hỏi dữ liệu kinh doanh **bằng ngôn ngữ tự nhiên**, không cần biết SQL.
- **Làm gì:** Nối Grok với data warehouse qua API; người dùng hỏi *"doanh thu vùng nào giảm tháng trước?"* và nhận câu trả lời bằng tiếng người.
- **Kết quả:** Giảm rào cản kỹ thuật cho người không rành truy vấn (mô tả chung, không có tên công ty xác minh).
- **Bài học:** API tương thích OpenAI SDK giúp tích hợp Grok vào hệ thống nội bộ nhanh — nhưng **cẩn trọng dữ liệu** (xem Mục 04), nên dùng tier có DPA.
- **Nguồn:** coursiv, prked (*mô tả chung, paraphrase*).

### ⚙️ CS4 — Tự động hoá no-code cho SMB

- **Bối cảnh:** Doanh nghiệp nhỏ muốn tự động hoá việc lặp mà không thuê dev.
- **Làm gì:** Qua connector (Albato), dựng workflow: tóm tắt email, auto-reply WhatsApp, truy vấn CRM, follow-up do AI soạn — lắp trong vài phút.
- **Kết quả:** Vận hành nhẹ hơn cho team nhỏ.
- **Bài học:** Bạn không cần code để dùng sức mạnh Grok — connector lo phần nối.
- **Nguồn:** albato (*vendor blog — đọc có chừng mực vì là nguồn bán hàng*).

### 🎬 CS5 — Sản xuất video ngắn có audio cho social/UGC

- **Bối cảnh:** Creator/marketer cần nội dung video ngắn nhanh, rẻ.
- **Làm gì:** Dùng Grok Imagine tạo clip **tới ~15s, 720p** (bản 1.5, 06/2026), lip-sync + nhạc/SFX, 4 biến thể, preset *"UGC Product Stories"/"Short Film"*.
- **Kết quả:** Dựng nội dung social nhanh hơn nhiều so với quay/dựng tay; phù hợp thử nhiều concept.
- **Bài học:** Điểm ngọt của Grok Imagine là **video ngắn có audio native** — chứ không phải ảnh tĩnh nghệ thuật (mảng đó Midjourney/FLUX mạnh hơn).
- **Nguồn:** basenor, pixverse, imagine.art (*tổng hợp, theo nguồn*).

### 👨‍💻 CS6 — Grok Build: nhảy vào mảng agentic coding (beta)

- **Bối cảnh:** xAI muốn cạnh tranh mảng coding agent (vốn là sân của Claude Code/Codex).
- **Làm gì:** Ra mắt **beta Grok Build** (14/05/2026) cho **SuperGrok & X Premium+**. Lưu ý bản chất: **Grok Build là một CLI coding agent** chạy trong terminal (giống Claude Code / Codex CLI) — *không phải* một model. Nó chạy bằng các model coding `grok-code-fast-1` (ra 08/2025) và `grok-build-0.1` (model API công bố 20/05/2026, 256K context).
- **Kết quả:** Đánh dấu định hướng cạnh tranh trực diện ở coding — nhưng còn **beta**, chưa có số liệu hiệu quả độc lập.
- **Bài học:** Theo dõi, nhưng tới giữa 2026 cộng đồng vẫn nghiêng về Claude cho code nghiêm túc. Đây là "để mắt", không phải "đổi ngay". Đừng nhầm **CLI Grok Build** (công cụ) với **model `grok-build-0.1`** (chạy bên dưới) — hai thứ khác nhau.
- **Nguồn (mạnh):** Reuters qua TradingView (05/2026).

---

### 📚 Nguồn đáng chú ý (tiêu đề + URL)

Các bài tổng hợp / công bố truy cập được (không phải thread gốc):

- "Grok 4 announcement" (xAI, official) — https://x.ai/news/grok-4
- "Grok Imagine API" (xAI, official — công bố Imagine API) — https://x.ai/news/grok-imagine-api
- "Grok Code Fast 1" (xAI, official — model coding) — https://x.ai/news/grok-code-fast-1
- "xAI release notes" (lịch sử model/tính năng) — https://docs.x.ai/developers/release-notes
- Reuters/TradingView về Grok Build (05/2026) — tìm "Grok Build beta xAI" trên tradingview.com/news
- DPC Ireland — Statutory Inquiry về X Internet Unlimited Company (11/04/2025) — https://www.dataprotection.ie
- noyb — 9 khiếu nại GDPR về Grok training — https://noyb.eu
- Tổng hợp use-case & so sánh: aitooldiscovery, writingmate, albato, basenor (*second-hand, đọc có chừng mực*).

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 5 điều mang theo
1. **Grok = AI thẳng tính + dữ liệu real-time gốc từ X.** Đây là USP, dùng đúng việc này thì không tool nào bằng.
2. **Mặc định KHÔNG real-time** — phải bật **DeepSearch** (app) hoặc **Live Search** (API). Đây là hiểu lầm số 1.
3. **Đừng kỳ vọng Grok thay Claude/ChatGPT** ở code/viết dài/verify nguồn — chọn tool theo việc.
4. **Người Việt dùng được**; vào qua **X Premium (~$8)** nếu đã dùng X, hoặc **SuperGrok (~$30)** nếu cần Grok đầy đủ. Trả bằng thẻ quốc tế/ảo.
5. **Cẩn trọng dữ liệu hơn các tool khác:** lịch sử opt-in mặc định trên X + điều tra GDPR. Coi mọi input như có thể bị dùng để train.
:::

### Link chính thức từ xAI (nên bookmark)

Đây là các trang **chính chủ** để bạn tự kiểm tra thông tin mới nhất — luôn tin các link này hơn bài tổng hợp của bên thứ ba:

- **Web app Grok:** https://grok.com
- **Tạo ảnh/video (Imagine):** https://grok.com/imagine
- **Trang sản phẩm:** https://x.ai/grok
- **Công bố Grok 4:** https://x.ai/news/grok-4
- **Danh sách model & giá API:** https://docs.x.ai/developers/models
- **Bắt đầu nhanh API (quickstart):** https://docs.x.ai/developers/quickstart
- **Lịch sử phát hành (release notes):** https://docs.x.ai/developers/release-notes
- **Đăng ký X Premium/Premium+ (đường vào Grok cho người VN):** https://x.com/premium

::: details 🔎 Nguồn tham khảo bổ sung (research tới giữa 2026)
- Release notes & danh sách model: `docs.x.ai/developers/release-notes`, `docs.x.ai/developers/models` — mốc Grok 3 (04/2025), Grok 4 + Heavy (09/07/2025), 4.1 Fast (11/2025), 4.20 (03/2026), CLI Grok Build beta (14/05/2026) + model `grok-build-0.1` (20/05/2026).
- Pháp lý dữ liệu: hành động của DPC Ireland (08/2024), Statutory Inquiry Section 110 về dữ liệu train (11/04/2025), điều tra thứ hai về ảnh nudification (17/02/2026, theo nguồn); 9 khiếu nại GDPR qua noyb.
- Giá gói consumer & hạn mức: tổng hợp từ felloai, costbench, aitoolanalysis, piunikaweb, datastudios (*x.ai chặn truy cập trực tiếp — số liệu là ước lượng theo nguồn, tuỳ thời điểm*).
- Grok Imagine: tổng hợp imagine.art, pixverse, basenor + `docs.x.ai/imagine`.

*Số liệu (tên model, giá, tính năng, hạn mức) đổi rất nhanh ở Grok — luôn kiểm tra lại tại grok.com, x.ai và docs.x.ai trước khi tin.*
:::
