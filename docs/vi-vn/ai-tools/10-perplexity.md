---
title: 'Perplexity — Answer engine có trích dẫn, tra cứu ra nguồn'
description: 'Hướng dẫn thực chiến Perplexity (Perplexity AI) cho người Việt: dùng free hay Pro $20, Deep Research, Labs, trình duyệt Comet, API Sonar — workflow research có nguồn, mẹo chống bịa, bối cảnh thanh toán & rủi ro pháp lý.'
---

# Perplexity — Answer engine có trích dẫn, tra cứu ra nguồn

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🔍</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn là nhân viên marketing, sếp nhắn 9h tối: *"Sáng mai họp, gửi anh so sánh 3 nền tảng quảng cáo + số liệu thị phần 2026, kèm nguồn để anh tin."* Mở **Perplexity**, gõ tiếng Việt: *"So sánh Meta Ads, Google Ads, TikTok Ads ở VN 2026 theo chi phí và độ phủ, lập bảng, ghi nguồn từng dòng."* → 30 giây sau có câu trả lời mạch lạc, **mỗi con số gắn một số trích dẫn bấm xem được nguồn gốc**. Bạn mở vài link kiểm tra, dán vào slide. Việc 2 tiếng lục Google rút còn 15 phút.
**💸 Lợi ích thực tế:** một "máy trả lời" tra web thời gian thực rồi tổng hợp **kèm nguồn kiểm chứng** — bản free đã dùng được, gói Pro $20/tháng mở khoá research sâu. Đỡ mất thời gian mở 20 tab Google.
:::

> **"Perplexity không phải Google (trả về 10 link) cũng không phải ChatGPT gốc (trả lời từ trí nhớ).**
> **Nó tra web → đọc nhiều nguồn → tổng hợp thành câu trả lời, gắn trích dẫn vào từng câu. Nhưng nó vẫn bịa — biết chỗ nào tin được, chỗ nào phải verify là khác biệt sống còn."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Phân biệt** Perplexity với Google, ChatGPT, Gemini — và biết khi nào chọn cái nào.
- **Dùng search có trích dẫn**: gõ câu hỏi tự nhiên, bấm số nguồn để kiểm chứng, dùng Focus thu hẹp phạm vi.
- **Chạy Deep Research** ra báo cáo dài có nguồn, và **Labs** để tạo dashboard/file/app từ một prompt.
- **Cài & dùng trình duyệt Comet** (agentic browsing) — và biết giới hạn thật của nó.
- **Gọi API Sonar** bằng `curl` cho lập trình viên, hiểu giá theo token.
- **Nhận diện rủi ro**: hallucinate dữ kiện cứng, dữ liệu bị train mặc định, các vụ kiện bản quyền đang treo.
:::

::: warning ⏱️ Lưu ý "hạn dùng" của thông tin
Đây là hiểu biết tới **giữa 2026**. AI tools đổi rất nhanh (tên đời model, giá gói, hạn mức tính năng) — nhiều con số dưới đây lấy từ **nguồn thứ ba đối chiếu chéo** vì trang giá chính chủ chặn truy cập tự động. Có vài chỗ **các nguồn mâu thuẫn nhau** đã được ghi rõ. Cứ vào thẳng [perplexity.ai](https://www.perplexity.ai) và [docs.perplexity.ai](https://docs.perplexity.ai) để kiểm tra bản mới nhất trước khi trích dẫn cứng.
:::

---

## 01 · Công cụ này là gì & dùng khi nào

**Perplexity** (nhà cung cấp: **Perplexity AI**) là một **"answer engine" (cỗ máy trả lời)** — một loại công cụ khác cả search engine truyền thống lẫn chatbot thuần. Thay vì trả về danh sách 10 link xanh (như Google) hay trả lời "từ trí nhớ" có thể bịa (như ChatGPT bản gốc), Perplexity **tìm kiếm web thời gian thực, đọc nhiều nguồn, rồi tổng hợp thành một câu trả lời mạch lạc kèm trích dẫn đánh số ngay trong câu**. Đây là điểm nhận diện cốt lõi: mỗi khẳng định gắn một nguồn bấm xem được.

Tới 2026, Perplexity đã vượt khỏi khái niệm "công cụ tìm kiếm" để thành một **AI workspace** gồm: tìm kiếm có trích dẫn, **Deep Research**, **Labs** (tạo file/app), **Spaces** (không gian cộng tác), trình duyệt AI **Comet**, và API **Sonar** cho lập trình viên. URL chính: **https://www.perplexity.ai**.

::: tip 🔑 Phân biệt 3 thứ dễ lẫn (đọc kỹ kẻo nhầm)
- **Perplexity (web app)** = cái bạn dùng ở perplexity.ai để hỏi đáp có trích dẫn. Phần lớn chương này nói về cái này.
- **Comet** = một *trình duyệt* riêng do Perplexity làm (cài về máy), có trợ lý AI thao tác thay bạn — khác với web app.
- **Sonar API** = dịch vụ cho *lập trình viên* gọi bằng code, tính tiền theo token — khác hẳn việc dùng app. Người không code bỏ qua được.
:::

**Những việc Perplexity làm tốt (theo research):**

| Tính năng | Làm được gì | Gói cần |
|---|---|---|
| **Search có trích dẫn** | Tra web real-time, trả lời kèm nguồn đánh số. Mặc định chạy model **Sonar** của hãng | Free |
| **Pro Search** | Truy vấn sâu hơn, nhiều bước, chọn model cao cấp. Free bị giới hạn (~5 lượt/ngày) | Free (giới hạn) → Pro |
| **Model switcher** | Đổi qua lại GPT / Claude / Gemini (tới ~giữa 2026 là các đời như GPT-5.x, Claude Opus 4.5–4.6, Gemini 3.x — *tên đời model đổi liên tục, coi là tham khảo*) | Pro trở lên |
| **Deep Research** | Tự search hàng chục lần, duyệt 100+ trang, đối chiếu rồi viết báo cáo có cấu trúc + trích dẫn. Mất ~2–5 phút/truy vấn | Free (rất ít) → Pro/Max |
| **Labs** (nằm trong menu **+**, nhãn "Create files and apps") | Làm 10+ phút việc: tạo report, spreadsheet, dashboard, slide, mini web-app, ảnh — kèm chạy code Python, vẽ chart | Pro/Max |
| **Spaces** | Không gian cộng tác/lưu trữ research theo chủ đề; bản Enterprise có admin control, audit log, SSO | Free (cơ bản) → Enterprise |
| **Comet browser** | Trình duyệt AI-native: tóm tắt trang, hỏi đáp theo tab, **agentic browsing** (tự thêm vào giỏ, tìm coupon, soạn email từ nội dung trang). Có trên iOS/Android/Mac/Windows | Miễn phí (một số khả năng agentic gắn Pro) |
| **Focus modes** | Giới hạn phạm vi tìm: Academic, Reddit, v.v. | Free |
| **Tạo ảnh / video** | Image generation; video (nguồn ~giữa 2026 nhắc Sora 2 Pro ở gói Max). *Tạo ảnh từng bị chặn theo vùng — xem mục 04* | Pro/Max |
| **Sonar API** | API search-grounded cho dev (xem mục 03) | Pay-per-use |

::: tip 📌 Vì sao "trích dẫn" là điểm ăn tiền nhất
Khác biệt lớn nhất của Perplexity so với chatbot thường: nó **mặc định gắn nguồn vào từng câu**. Với việc cần kiểm chứng (tin tức, số liệu kỹ thuật, học thuật), bạn không phải "tin lời AI" — bạn bấm số trích dẫn, mở trang gốc, tự xác nhận. Đây là lý do dân nghiên cứu, nhà báo, marketer chuộng nó. **Nhưng** đừng nhầm "có trích dẫn" với "luôn đúng": nó vẫn có thể gán nguồn lệch ý hoặc bịa dữ kiện không nguồn — xem mục 04.
:::

### So với công cụ khác — "khi nào chọn cái nào"

Không có công cụ "thắng mọi mặt". Perplexity là **người chơi chuyên biệt** cho mảng research có nguồn — về thị phần "AI search" nó nhỏ hơn ChatGPT/Gemini (theo một số nguồn Q1/2026, ChatGPT ~61%, Gemini ~24.8%; *con số bên thứ ba, tham khảo*), nhưng được đánh giá cao ở khâu **tra cứu ra nguồn kiểm chứng được**. Bảng dưới đây ngắn gọn, khách quan tới giữa 2026:

| Công cụ | Mạnh ở | Nên chọn khi |
|---|---|---|
| **Perplexity** | Answer engine chuyên research; **trích dẫn gắn từng câu là mặc định**; có Comet & API Sonar | Cần câu trả lời có nguồn kiểm chứng, tra tin/kỹ thuật/học thuật, research tổng hợp |
| **ChatGPT Search** (OpenAI) | All-rounder, workflow nhiều bước, viết/code/brainstorm; search là bổ trợ | Cần một trợ lý "tất cả trong một", việc đa dạng ngoài research |
| **Google AI Mode** | Tab AI ngay **trong** Google Search, hạ tầng Google duyệt rất nhiều trang | Bạn đã sống trong Google Search và muốn AI ngay tại đó |
| **Gemini** (Google) | **Sáng tạo, multimodal**, tích hợp Google Workspace | Ưu tiên ảnh/video/đa phương tiện, đang dùng hệ Google |
| **Claude** (Anthropic) | Reasoning, viết dài, phân tích tài liệu, code | Phân tích văn bản dài, viết lách, coding — chấp nhận ít search-grounded hơn |

::: warning ⛔ Khi nào KHÔNG dùng Perplexity (giới hạn thật)
Perplexity giỏi research, nhưng **không phải việc gì cũng hợp**:
- **Cần độ chính xác tuyệt đối về dữ kiện cứng** (toạ độ GPS, giờ mở cửa, số điện thoại, thông tin liên hệ cơ quan): cộng đồng phản ánh nó **bịa rất tự tin** ở mảng này (xem mục 06) → luôn verify hoặc dùng nguồn gốc.
- **Tác vụ sáng tạo / đa phương tiện nặng** (ảnh nghệ thuật, video phức tạp, brainstorm dài): Gemini/ChatGPT hợp hơn.
- **Coding / viết tài liệu dài chuyên sâu**: Claude/ChatGPT thường tốt hơn.
- **Agentic tự động hoá quan trọng / giao dịch tiền** qua Comet: nó còn misclick, kẹt ở trang thanh toán — đừng giao việc rủi ro cao chưa giám sát.
- **Dữ liệu cực nhạy cảm trên bản tiêu dùng**: mặc định dữ liệu bị thu thập/train (trừ khi opt-out) — xem mục 04.
:::

::: tip 💡 Tóm tắt nhanh
Nếu việc của bạn là **tra cứu cần nguồn đáng tin** (tin tức, số liệu, học thuật, so sánh sản phẩm) → **Perplexity** là lựa chọn mạnh nhất. Cần một trợ lý đa năng làm đủ thứ → **ChatGPT**. Thiên về **sáng tạo/multimodal** hoặc đã dùng Google → **Gemini**. **Viết dài/coding nghiêm túc** → **Claude**. Nhiều người dùng song song: Perplexity để *tìm & kiểm chứng*, một chatbot khác để *viết & xử lý*.
:::

---

## 02 · Đăng ký/Cài đặt & truy cập — bối cảnh VN

### Dùng được ở Việt Nam không? — **Có.**

Theo các review tiếng Việt 2026, Perplexity **hoạt động ổn định tại VN, không cần VPN**, hỗ trợ tiếng Việt khá tốt (một nguồn VN tự chấm ~4.6/5 cho chất lượng tiếng Việt — *con số do bên review tự đánh giá, không phải số liệu hãng*).

::: warning 🚫 Đừng dùng VPN khi đăng ký/đăng nhập
Đây là điểm nhiều người Việt sập bẫy: Perplexity **chặn VPN** để chống spam và yêu cầu **xác minh số điện thoại đúng vùng** với tài khoản Pro. Dùng VPN hoặc mua Pro qua coupon nước ngoài là nguyên nhân chính khiến tài khoản **bị khoá**. Truy cập thẳng bằng mạng VN là ổn nhất.
:::

### Đăng ký / cài đặt

**Web (không cần cài gì):**

```text
1. Mở https://www.perplexity.ai
2. Đăng ký bằng email, hoặc đăng nhập nhanh qua Google / Apple.
3. Vào thẳng ô hỏi → gõ tiếng Việt là dùng được ngay (bản free).
```

**Comet browser (trình duyệt cài về máy — có installer thật):**

```text
# Tải tại https://www.perplexity.ai/comet  (installer ~200MB)

# macOS:
1. Mở file .dmg
2. Kéo icon "Comet" vào thư mục Applications
3. Mở lần đầu → duyệt quyền ở System Settings → Privacy & Security

# Windows:
1. Chạy file .exe
2. Theo wizard cài đặt
3. Mở từ Start menu

# Mobile:
- iOS: tải "Comet" trên App Store
- Android: tải trên Google Play (gói: ai.perplexity.comet)
```

::: tip ℹ️ Không có CLI cho người dùng cuối
Perplexity **không công bố công cụ dòng lệnh (CLI)** chính thức cho người dùng cuối — bạn tương tác qua app/trình duyệt. Dòng lệnh thật chỉ tồn tại ở phía **API Sonar** (gọi bằng `curl`/SDK), xem mục 03.
:::

### Các gói & giá (cập nhật giữa 2026)

::: warning 📋 Cảnh báo độ chính xác giá
Trang `/pro` của Perplexity **chặn truy cập tự động (lỗi 403)**, nên bảng giá dưới đây tổng hợp từ **nhiều nguồn thứ ba 2026 đối chiếu chéo**. Có **mâu thuẫn** ở vài chỗ — đã ghi rõ. Hãy kiểm tra lại trên trang chính thức trước khi mua hoặc trích dẫn cứng.
:::

| Gói | Giá tháng | Giá năm | Bao gồm chính |
|---|---|---|---|
| **Free** | $0 | $0 | Search cơ bản không giới hạn (model Sonar), trích dẫn, **~5 Pro Search/ngày**; chưa có model cao cấp / Labs / Deep Research đầy đủ |
| **Pro** | **$20** | **$200** (~$16.67/tháng, tiết kiệm ~17%) | Pro Search không giới hạn, model switcher (GPT/Claude/Gemini), Deep Research, upload file, tạo ảnh, **$5 API credit/tháng**, truy cập Comet/Computer mức cơ bản |
| **Max** | **$200** | **Mâu thuẫn nguồn: phần lớn ghi ~$2.400/năm; một nguồn ghi ~$2.000** | Tất cả của Pro + Perplexity Computer (~10.000 credit/tháng), unlimited Labs/Deep Research, "Model Council", ưu tiên model frontier giờ cao điểm, video cao cấp |
| **Education / Pro học sinh** | **~$10** (theo 1 nguồn, giảm 50%) | (thường chỉ theo tháng) | Như Pro, cho học sinh/giáo viên đã xác minh — *nguồn mỏng, cần verify* |
| **Enterprise Pro** | **$40/user** | **$400–$480/user** (nguồn lệch nhau) | Pro cho team, shared Spaces, SSO/SCIM, audit log, SOC 2 Type II |
| **Enterprise Max** | **$325/user** | **$3.250–$3.900/user** (nguồn lệch) | Toàn bộ Enterprise Pro + unlimited Labs/Research, analytics toàn tổ chức |

::: tip 💡 Các điểm KHÔNG chắc (nguồn thứ ba mâu thuẫn — gắn dấu ~)
Giá năm của Max (~$2.000 vs ~$2.400); giá năm Enterprise (~$400 vs ~$480; ~$3.250 vs ~$3.900); **hạn mức Deep Research từng gói**; **tên đời model**; gói Education ~$10; con số "~19 model" của Perplexity Computer. Coi như **tham khảo**, verify lại tại nguồn chính thức trước khi in.
:::

### Thanh toán ở Việt Nam

- Perplexity nhận **thẻ tín dụng/ghi nợ quốc tế Visa / Mastercard / Amex / Discover** (xử lý qua **Stripe**).
- Thực tế VN: thẻ nội địa hay bị **chặn giao dịch SaaS quốc tế/định kỳ**. Cách giảm rủi ro bị từ chối: dùng **thẻ ảo (virtual card)** hỗ trợ thanh toán quốc tế.
- Có hệ **PayPal** (Perplexity đã tích hợp PayPal trong một số luồng) — phương án thay thế nếu thẻ bị từ chối.

::: warning ⚠️ Cẩn thận với "Perplexity Pro giá rẻ"
Ở VN có nhiều nơi rao bán "Perplexity Pro giá rẻ" (vài trăm K/năm). Đây thường là **tài khoản chia sẻ / coupon vùng khác**, rủi ro **bị khoá do yêu cầu xác minh số điện thoại đúng vùng**. Không khuyến nghị cho công việc nghiêm túc — mất tài khoản giữa chừng còn tốn hơn.
:::

::: tip 💸 Mẹo chọn gói cho người Việt
- **Mới thử / dùng ít** → **Free** đủ để tra cứu hằng ngày, không cần thẻ. Hết ~5 Pro Search/ngày thì chuyển về Quick Search.
- **Dùng đều cho research** → **Pro ($20)**: mở Deep Research, model switcher, Labs, Comet đầy đủ. Đáng tiền nhất cho đa số.
- **Chỉ lên Max ($200)** khi bạn thật sự cần Perplexity Computer / unlimited Labs / video cao cấp — đừng trả thừa nếu chưa dùng tới.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có prompt/lệnh thật)

Đây là quy trình "đi từ câu hỏi đến xong việc". Mỗi phần có cách **tự kiểm** (verify) để biết mình làm đúng.

### A. Research có trích dẫn (web app)

```text
1. Vào perplexity.ai → gõ câu hỏi tự nhiên (tiếng Việt OK).
2. Chọn Focus nếu cần thu hẹp: Academic (học thuật), Reddit (ý kiến cộng đồng).
3. Bật Pro Search (gói Pro) để truy vấn nhiều bước.
4. Đọc câu trả lời → bấm số trích dẫn để mở nguồn gốc, kiểm chứng.
5. Dùng "related questions" để đào sâu; lưu vào một Space theo chủ đề để tái dùng.
```

Prompt mẫu cho research nghiêm túc:

```text
So sánh 3 phương án X, Y, Z theo [chi phí, hiệu năng, hỗ trợ VN] tính tới 2026.
Chỉ dùng nguồn ≤ 12 tháng. Lập bảng + ghi rõ nguồn từng dòng.
Nếu dữ liệu mâu thuẫn, nêu cả hai và ghi nguồn.
```

→ **Verify:** câu trả lời có số trích dẫn click được; bạn mở thử thấy nguồn thật, đúng ý, không phải link 404 hay nguồn lệch chủ đề.

### B. Deep Research → báo cáo dài có nguồn

```text
1. Chọn chế độ Deep Research (hoặc trong menu +).
2. Ra đề bài rõ phạm vi + định dạng output mong muốn.
3. Chờ ~2–5 phút (hệ tự duyệt 100+ trang, đối chiếu).
4. Đọc report; nếu cần dashboard/slide → đẩy tiếp sang Labs.
```

→ **Verify:** nhận bản tổng hợp dày, có dẫn nguồn — và **LUÔN kiểm chứng lại số liệu/nguồn quan trọng** trước khi dùng (Deep Research vẫn có thể trích nguồn nông hoặc lệch, xem mục 06).

### C. Labs — tạo app / dashboard / file từ một prompt

```text
1. Menu + → "Create files and apps" (Labs).
2. Viết một prompt mô tả đầy đủ → Labs tự research + chạy Python +
   tạo chart → ra mini web-app / dashboard (~10–30 phút).
3. Mở tab "Tasks" để xem nó đã làm những bước gì.
```

Prompt mẫu Labs (dashboard):

```text
Tạo dashboard theo dõi [startup AI gọi vốn]: dữ liệu funding, nhà sáng lập,
nhà đầu tư, biểu đồ + bản đồ, có filter theo ngày/chủ đề.
Dùng nguồn uy tín, ghi rõ ngày dữ liệu.
```

::: warning ⚠️ Labs mạnh nhưng phải kiểm output
Theo test của DataCamp, Labs đôi khi **nhầm năm hiện tại** (tưởng còn ở năm cũ → dữ liệu lỗi thời), **chart/bản đồ vỡ layout**, hoặc **export hỏng**. Đừng dùng output Labs làm tài liệu chính thức mà không rà lại từng số.
:::

### D. Comet — agentic browsing (trình duyệt tự thao tác)

```text
1. Cài Comet (mục 02) → đăng nhập.
2. Ra lệnh cấp cao trong trợ lý, ví dụ:
   - "tóm tắt trang này"
   - "tìm video tóm tắt chủ đề X"
   - "thêm món vào giỏ + tìm coupon"
   - "đọc tab Gmail, liệt kê email quan trọng chưa trả lời"
3. Comet tự thao tác qua các tab.
   (Gói Max cho chọn model chạy agent — nguồn ~giữa 2026 mặc định Opus 4.6, có Sonnet 4.5.)
```

→ **Verify:** Comet làm đúng việc bạn giao. Nếu nó kẹt ở form phức tạp/trang thanh toán → **can thiệp tay** ở bước đó, đừng để agent tự bấm thanh toán.

### E. Sonar API — cho lập trình viên (lệnh thật)

Lấy API key tại docs.perplexity.ai → gọi endpoint tương thích kiểu chat completions:

```bash
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PPLX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar-pro",
    "messages": [
      {"role": "user", "content": "Tóm tắt tin mới nhất về [chủ đề], kèm nguồn."}
    ]
  }'
```

> Tên model `sonar`, `sonar-pro`, `sonar-reasoning-pro`, `sonar-deep-research` theo docs ~giữa 2026. Cú pháp endpoint xác nhận theo docs; field cụ thể nên đối chiếu docs vì có thể đổi.

Giá API Sonar (~giữa 2026, theo docs):

| Model | Input /1M token | Output /1M token | Phí/1.000 request (Low→High) |
|---|---|---|---|
| **Sonar** | $1 | $1 | $5 → $12 |
| **Sonar Pro** | $3 | $15 | $6 → $14 |
| **Sonar Reasoning Pro** | $2 | $8 | $6 → $14 |
| **Sonar Deep Research** | $2 | $8 | + citation $2/1M, search $5/1K, reasoning $3/1M |

::: tip 💡 Lưu ý chi phí API
Năm 2026 Perplexity **bỏ phí citation token** cho Sonar/Sonar Pro (chỉ còn ở Deep Research) → rẻ hơn mỗi response so với 2025. Gói Pro kèm **$5 API credit/tháng**; dùng nhiều phải mua prepaid thêm. **Sonar API là Zero Data Retention** — không lưu dữ liệu gửi qua API (xem mục 04).
:::

::: tip ⚙️ Mẹo nhỏ tăng chất lượng câu trả lời (web app)
- **Yêu cầu nguồn rõ ràng:** thêm *"ghi nguồn từng ý, ưu tiên nguồn ≤ 12 tháng"* → giảm dữ kiện cũ/bịa.
- **Cho phép nói "không biết":** thêm *"nếu không tìm thấy nguồn đáng tin, nói rõ thay vì đoán"* → giảm bịa dữ kiện cứng.
- **Dùng Focus đúng việc:** câu hỏi học thuật → Academic; cần trải nghiệm thật người dùng → Reddit.
- **Lưu Space theo chủ đề:** gom các phiên research cùng đề tài để không phải gõ lại bối cảnh.
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### 🟢 Mẹo ăn tiền

::: tip 6 mẹo dùng Perplexity như dân chuyên
1. **Luôn bấm số trích dẫn để kiểm nguồn** — "có citation" không bằng "đúng"; nó có thể gán nguồn lệch ý.
2. **Ra đề bài có ràng buộc** (mốc thời gian nguồn, định dạng bảng, "ghi nguồn từng dòng") → kết quả bám sát và dễ verify hơn nhiều prompt mơ hồ.
3. **Cho phép AI nói "không tìm thấy"** → giảm rõ rệt việc bịa dữ kiện cứng (GPS, giờ, số điện thoại).
4. **Việc khó → tách Deep Research (tìm & tổng hợp) rồi đẩy sang Labs (làm output)** thay vì ép một prompt gánh tất cả.
5. **Đổi model khi câu trả lời chưa ưng** (Pro) — cộng đồng phản ánh chọn model khác tạo khác biệt thật.
6. **Người VN: dùng Free trước, lên Pro ($20) khi đụng giới hạn ~5 Pro Search/ngày** hoặc cần Deep Research/Labs.
:::

### 🔴 Lỗi & cạm bẫy (đọc kỹ — phần này cứu bạn)

::: warning 🚨 Hallucination (bịa) — vẫn có, kể cả khi "có trích dẫn"
Perplexity **vẫn bịa**, đặc biệt ở **dữ kiện cứng tra cứu**: cộng đồng Hacker News test thấy nó bịa **toạ độ GPS gần như 100% sai**, **giờ mở cửa** nhà hàng/điểm tham quan "phần lớn bịa", **số điện thoại/phòng ban cơ quan** "gần như 100% sai". Than phiền chính: nó **trả lời tự tin nhưng sai thay vì nói "không tìm thấy"**.

**Dấu hiệu cảnh báo:**
- Khẳng định không gắn nguồn, hoặc nguồn gắn vào **không thật sự nói điều đó** (bấm vào đọc lệch ý).
- Dữ kiện kiểu toạ độ/giờ/số liên hệ — mảng nó hay sai nhất.
- Hỏi lại cách khác → ra đáp án khác hẳn.

**→ LUÔN verify dữ kiện cứng** bằng nguồn gốc trước khi dùng cho việc thật.
:::

::: warning 🔒 Quyền riêng tư & dữ liệu — đọc kỹ nếu dùng cho công việc
Thông tin theo **Privacy Policy hiệu lực 05/02/2026** của Perplexity:

**(a) Dữ liệu của bạn đi đâu?**
- Trên bản **tiêu dùng (Free / Pro / Max)**, theo mặc định prompt và truy vấn **được thu thập, lưu, và dùng để cải thiện/huấn luyện model** — **trừ khi bạn tự tắt (opt-out)**.
- Trên **Enterprise**, dữ liệu khách **KHÔNG** dùng để train/fine-tune (gồm chat, file upload, metadata).
- **Sonar API: Zero Data Retention** — không lưu dữ liệu gửi qua API, không train trên đó.

**(b) Cách tắt training (bản tiêu dùng):**
- Vào **Settings** → tắt tuỳ chọn **AI data retention / training** nếu bạn nhập dữ liệu nhạy cảm.

**(c) TUYỆT ĐỐI không dán những thứ sau vào bản tiêu dùng:**
- Số CMND/CCCD, số thẻ ngân hàng, mật khẩu, OTP.
- Hợp đồng/NDA, tài liệu mật, mã nguồn độc quyền của công ty.
- Dữ liệu cá nhân của khách hàng (họ tên, SĐT, địa chỉ, hồ sơ) — ở Việt Nam việc này có thể **vi phạm Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân**.

**(d) Nếu bắt buộc xử lý dữ liệu nhạy cảm** → dùng **Enterprise / Sonar API (Zero Data Retention)**, đừng dùng bản tiêu dùng.
:::

::: warning ⚖️ Rủi ro pháp lý đang treo (cần biết để đánh giá độ bền)
Đây là phần nóng, nêu trung thực — phần lớn là **cáo buộc trong đơn kiện, chưa phải kết luận toà**:
- **Vụ kiện tracking (4/2026):** một **class-action** cáo buộc Perplexity nhúng phần mềm theo dõi "undetectable" tự chia sẻ hội thoại với Meta/Google **kể cả ở chế độ incognito**. *(Đang là cáo buộc, cần theo dõi diễn biến.)*
- **Hàng loạt vụ kiện bản quyền/scraping:** tới ~31/5/2026 có khoảng **9 tổ chức** kiện Perplexity (CNN — đơn 28/5/2026 cáo buộc sao chép 17.000+ tác phẩm; New York Times; News Corp/Dow Jones; New York Post; Chicago Tribune; Britannica; Merriam-Webster; Reddit; Yomiuri Shimbun). Trước đó (8/2024) tài liệu **Cloudflare** + điều tra Wired/Robb Knight cáo buộc Perplexity dùng **crawler ẩn, bỏ qua robots.txt, giả user-agent**. Phản hồi của hãng (CCO Jesse Dwyer): *"You can't copyright facts."*
- **Hệ quả thực dụng:** nếu bạn phụ thuộc nguồn báo chí lớn, các vụ kiện này có thể ảnh hưởng nội dung/quan hệ nguồn trong tương lai → theo dõi.
:::

::: details ❓ FAQ & lỗi hay gặp (bấm để mở)
**"Image Generation Not Supported in This Region" — sao vậy?**
Tính năng tạo ảnh roll-out theo vùng/compliance (đầu 2026 nhiều vùng gồm Đông Nam Á bị chặn tạm). **Không phải lỗi tài khoản bạn** — chờ mở vùng.

**Hết hạn mức / lỗi mơ hồ khi search?**
Free chỉ ~5 Pro Search/ngày; chạm hạn hiện lỗi chung chung. Cách xử: chuyển về **Quick Search**, hoặc nâng lên **Pro**.

**"Something went wrong" ở mọi truy vấn?**
Có thể do (1) outage dịch vụ, (2) cache cũ, (3) extension chặn. Cách xử: kiểm tra trạng thái dịch vụ; **hard refresh** (Ctrl+Shift+R) + clear cache; test ở chế độ **incognito** tắt extension.

**Không load / giao diện vỡ?**
Nguyên nhân số 1 là **ad-blocker / extension quyền riêng tư / VPN**. Cách xử: tắt extension; **không dùng VPN**; thử Chrome/Edge (Safari hay lỗi vài tính năng).

**Bị khoá / đòi xác minh số điện thoại?**
Thường do mua Pro qua coupon vùng khác; phải xác minh SĐT **đúng vùng**. Cách xử: dùng tài khoản đăng ký hợp lệ đúng vùng, tránh coupon nước ngoài.

**Comet kẹt / misclick khi tự thao tác?**
Do form phức tạp, login lạ, element động, trang thanh toán. Cách xử: **can thiệp tay** ở bước đó; chia nhỏ tác vụ; đừng giao việc thanh toán nhạy cảm cho agent.

**App chậm / không tải ở VN — có cần VPN không?**
**Không cần VPN** (và không nên dùng). Nếu chậm, thử đổi mạng hoặc tắt extension.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm thật 2–3 bài dưới đây để biến "đọc hiểu" thành "làm được". Mỗi bài có tiêu chí hoàn thành rõ ràng.

### 🧪 Bài 1 — Research có nguồn & phản xạ kiểm chứng (cơ bản)

**Mục tiêu:** luyện kỹ năng quan trọng nhất khi dùng Perplexity — bấm nguồn để verify.

1. Vào perplexity.ai, hỏi một câu cần số liệu mới, ví dụ:

```text
Top 3 ngôn ngữ lập trình phổ biến nhất 2026 theo khảo sát uy tín,
kèm % và nguồn từng con số. Chỉ dùng nguồn ≤ 12 tháng.
```

2. **Bấm từng số trích dẫn**, mở trang gốc, đối chiếu: con số trong câu trả lời có đúng như nguồn nói không? Có nguồn nào lệch chủ đề hoặc 404 không?

**✅ Đạt khi:** bạn xác nhận được từng số khớp nguồn (hoặc bắt được một chỗ gán nguồn lệch). Đây là phản xạ phải giữ mãi về sau.

### 🧪 Bài 2 — Deep Research ra báo cáo (quan trọng)

**Mục tiêu:** trải nghiệm research sâu và học cách "không tin mù".

1. Chọn **Deep Research**, ra đề bài có phạm vi rõ:

```text
Khảo sát thị trường máy lọc nước gia đình ở VN 2026: các thương hiệu chính,
khoảng giá, xu hướng người dùng. Lập báo cáo có mục, ghi nguồn từng phần.
Nếu dữ liệu mâu thuẫn giữa các nguồn, nêu cả hai.
```

2. Chờ ~2–5 phút. Đọc báo cáo, rồi **chọn 3 khẳng định quan trọng nhất và tự kiểm chứng** bằng cách mở nguồn.

**✅ Đạt khi:** bạn có một báo cáo có cấu trúc + đã verify ít nhất 3 điểm chính, và nhận ra chỗ nào báo cáo "nghe authoritative nhưng nội dung nông".

### 🧪 Bài 3 — Tạo dashboard bằng Labs (cần Pro/Max)

::: warning Cần gói trả phí
Labs cần gói Pro/Max. Nếu đang ở Free, làm Bài 1 và Bài 2 trước; phần này để dành khi bạn nâng cấp.
:::

**Mục tiêu:** dựng một output thật từ một prompt — và luyện thói quen rà lỗi.

1. Menu **+ → Create files and apps (Labs)**, dùng prompt:

```text
Tạo dashboard so sánh 5 mẫu điện thoại tầm trung bán chạy ở VN 2026:
giá, cấu hình chính, điểm camera, pin. Có bảng + biểu đồ cột.
Dùng nguồn uy tín, ghi rõ ngày dữ liệu.
```

2. Khi xong, **mở tab Tasks xem nó đã làm gì**, rồi rà: năm dữ liệu có đúng 2026 không? Chart có vỡ layout không? Số có khớp nguồn không?

**✅ Đạt khi:** bạn có một dashboard chạy được **và** liệt kê được ít nhất một chỗ cần sửa/verify trước khi dám đưa cho người khác.

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này gom các ví dụ **có thật** từ tutorial (DataCamp), thảo luận cộng đồng (Hacker News), và công bố chính thức tới ~giữa 2026. Mục đích: cho bạn thấy Perplexity chạy ra sao **ngoài đời thật** — cả lúc toả sáng lẫn lúc thành cái bẫy.

::: warning ⚠️ Đọc kỹ về độ tin của nguồn
Một phần nội dung dưới đây là **trải nghiệm cá nhân / test của bên thứ ba**, chưa kiểm chứng độc lập:
- Các nhận xét kiểu *"đẹp", "chính xác", "bịa gần 100%"* là đánh giá của người test cụ thể trong bối cảnh cụ thể → đọc tham khảo.
- Các con số "4.6/5 tiếng Việt", "89%/94% dễ dùng" đến từ **review VN tự công bố**, không phải số liệu chính hãng → chỉ tham khảo định tính.
- Phần nào là **official** (blog Perplexity) được ghi rõ.
:::

### ⚽ CS1 — Dashboard FC Barcelona bằng Labs (đẹp nhưng sai vài chi tiết)

- **Bối cảnh:** Tác giả DataCamp test Perplexity Labs bằng cách yêu cầu tạo một dashboard fan bóng đá chỉ với một prompt.
- **Làm gì:** Một prompt mô tả dashboard gồm kết quả 5 trận gần nhất, lịch đấu, đội hình kèm ảnh + tình trạng hợp đồng, danh sách chấn thương, tin chuyển nhượng.
- **Kết quả:** Output **đẹp, thông tin đội hình chính xác, đúng màu CLB**; nhưng **sai vài chi tiết** gia hạn hợp đồng/chấn thương (do giới hạn research, không phải lỗi hệ thống).
- **Bài học:** Labs cho ra sản phẩm trực quan ấn tượng từ một prompt, nhưng **chi tiết dữ kiện phải rà lại** — đừng coi output là sự thật cuối.
- **Nguồn:** DataCamp — tutorial Perplexity Labs.

### 📈 CS2 — Phân tích 10-K cổ phiếu Shopify bằng Labs

- **Bối cảnh:** Test Labs cho tác vụ phân tích tài chính (đọc báo cáo thường niên 10-K).
- **Làm gì:** Labs đọc dữ liệu 10-K, sinh report chi tiết kèm **chart tự tạo**, dùng **nhiều nguồn hơn** một AI research tool thông thường.
- **Kết quả:** Visual giúp trình bày số liệu dễ hiểu; báo cáo có chiều sâu hơn nhờ tổng hợp đa nguồn.
- **Bài học:** Với phân tích có nhiều số, Labs giỏi ở khâu **biến số liệu thô thành biểu đồ + report** — điểm ngọt của công cụ.
- **Nguồn:** Tài liệu/tutorial Perplexity Labs.

### 🗺️ CS3 — 5 tracker/dashboard thực nghiệm (kể cả lúc lỗi)

- **Bối cảnh:** DataCamp dựng thử 5 dashboard bằng Labs: heat map khí hậu, calendar hội nghị tech, tracker startup AI gọi vốn, bản đồ xung đột toàn cầu...
- **Làm gì:** Mỗi cái phần lớn chỉ cần **1 prompt**, làm trong ~10–30 phút.
- **Kết quả / lỗi thật:** Nhiều cái ra đẹp; **nhưng** có case Labs **nhầm năm hiện tại** (tưởng còn ở năm cũ → dữ liệu lỗi thời), có case **over-engineer làm vỡ pipeline** còn lại 2 dòng dữ liệu, **export/biểu đồ đôi khi hỏng**.
- **Bài học:** Labs mạnh nhưng **không "set & forget"** — phải kiểm output, nhất là năm dữ liệu và tính toàn vẹn của chart/export.
- **Nguồn:** DataCamp.

### 📧 CS4 — Comet làm trợ lý Gmail (tiện nhưng dễ kẹt)

- **Bối cảnh:** Review trình duyệt Comet (USAII / toolstack) thử dùng nó như trợ lý điều khiển trực tiếp tab.
- **Làm gì:** Yêu cầu Comet **tóm tắt email dài** và **tìm email quan trọng chưa trả lời** bằng cách thao tác trên tab Gmail; thử thêm use-case shopping (thêm vào giỏ + dò coupon + so giá).
- **Kết quả:** Tóm tắt và lọc email chạy được; nhưng review cảnh báo web có **form phức tạp / đăng nhập lạ / element động** dễ khiến Comet **misclick, kẹt ở trang thanh toán**, đôi khi **lâu hơn làm tay**.
- **Bài học:** Agentic browsing hữu ích cho việc đọc/tóm tắt, nhưng việc **giao dịch/thanh toán** thì giám sát chặt hoặc làm tay.
- **Nguồn:** Review Comet (USAII / toolstack).

### 🤝 CS5 — Trải nghiệm cộng đồng Hacker News (rất mixed)

- **Bối cảnh:** Thread "Ask HN: What's Your Take on Perplexity AI?" và thread bàn về Deep Research.
- **Tích cực:** Có user dùng 2+ năm cho web search, nhận xét nó **"hallucinate ít hơn trước", "chọn model tạo khác biệt"**.
- **Tiêu cực (rất cụ thể):** Một user test thấy Perplexity **bịa toạ độ GPS gần như 100% sai**, **giờ mở cửa** nhà hàng/điểm tham quan "phần lớn bịa", **số điện thoại/phòng ban chính phủ "gần như 100% sai"** — than phiền chính là nó **trả lời tự tin thay vì nói "không tìm thấy"**. Có ý kiến chê Deep Research "nghe authoritative, cấu trúc tốt nhưng nội dung có thể nông".
- **Bài học:** Mạnh cho **tổng hợp & web search**, yếu cho **dữ kiện cứng tra cứu**. Đây chính là lý do mục 04 nhấn mạnh verify.
- **Nguồn:** Hacker News — "Ask HN: What's Your Take on Perplexity AI?" + thread Deep Research.

### 📰 CS6 — Perplexity tài trợ nghiên cứu AI & báo chí (định vị nhóm dùng)

- **Bối cảnh:** *(Tham khảo, không phải use-case kỹ thuật.)* Perplexity công bố **tặng $250k cho Northwestern/Medill** để nghiên cứu AI và báo chí.
- **Ý nghĩa:** Cho thấy hãng định vị nhóm người dùng cốt lõi là **nhà báo / researcher** — nhất quán với điểm mạnh "research có nguồn".
- **Bài học:** Nếu công việc của bạn là nghiên cứu/báo chí, đây là công cụ được thiết kế hướng tới bạn — nhưng vẫn phải đối chiếu với phần rủi ro pháp lý bản quyền ở mục 04.
- **Nguồn (official):** Blog Perplexity.

::: tip 🧷 Đúc kết từ cộng đồng
- **Tin Perplexity nhất ở:** tổng hợp đa nguồn, tra tin/kỹ thuật/học thuật, so sánh — những thứ có thể bấm nguồn verify.
- **Đừng tin mù ở:** dữ kiện cứng (GPS, giờ, số liên hệ), và output Labs (năm dữ liệu, chart) — luôn rà.
- **Quy tắc vàng:** "có trích dẫn" ≠ "đúng". Bấm vào đọc nguồn mới là verify thật.
:::

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 5 điều mang theo
1. **Perplexity = answer engine có trích dẫn** — tra web real-time, tổng hợp, gắn nguồn vào từng câu. Mạnh nhất cho **research cần kiểm chứng**.
2. **"Có citation" không bằng "đúng"** — luôn bấm số nguồn để verify, nhất là dữ kiện cứng (GPS, giờ, số liên hệ) mà nó hay bịa.
3. **Người Việt dùng được, không cần VPN** (và **không nên** dùng VPN — dễ bị khoá). Free đủ tra cứu; **Pro $20** mở Deep Research/Labs/Comet đầy đủ.
4. **Workflow xương sống:** Search có nguồn → Deep Research (tổng hợp) → Labs (làm output) → Comet (thao tác). Mỗi tầng đều phải kiểm.
5. **Riêng tư:** bản tiêu dùng **mặc định train trên dữ liệu của bạn** (trừ khi opt-out); dữ liệu nhạy cảm → Enterprise/API. Để ý các vụ kiện bản quyền/tracking đang treo.
:::

### Link chính thức (nên bookmark)

Đây là các trang **chính chủ** để bạn tự kiểm tra thông tin mới nhất — luôn tin các link này hơn bài tổng hợp bên thứ ba:

- **Web app:** https://www.perplexity.ai
- **Comet browser:** https://www.perplexity.ai/comet
- **Gói Pro:** https://www.perplexity.ai/pro
- **API docs (Sonar):** https://docs.perplexity.ai
- **Giá API:** https://docs.perplexity.ai/docs/getting-started/pricing
- **Privacy Policy:** https://www.perplexity.ai/hub/legal/privacy-policy
- **Security:** https://www.perplexity.ai/hub/security
- **Help Center:** https://www.perplexity.ai/help-center/en/

::: details 🔎 Ghi chú độ tin cậy (research tới ~giữa 2026)
- **Chắc chắn (nhiều nguồn trùng):** bản chất answer engine + trích dẫn; Pro $20/tháng, $200/năm; Free ~5 Pro Search/ngày; tồn tại Deep Research/Labs/Spaces/Comet/Sonar; Comet miễn phí toàn cầu; dùng được ở VN không cần VPN; giá API Sonar theo docs; các vụ kiện bản quyền & cáo buộc Cloudflare/tracking.
- **Tham khảo / mâu thuẫn nguồn (gắn dấu ~):** giá năm Max (~$2.000 vs ~$2.400); giá năm Enterprise; hạn mức Deep Research từng gói; **tên đời model** (GPT-5.x / Claude 4.5–4.6 / Gemini 3.x — đổi liên tục); gói Education ~$10; con số "~19 model" của Computer.
- **Số liệu bên thứ ba tự công bố (không phải hãng):** 4.6/5 tiếng Việt, 89%/94% dễ dùng — chỉ tham khảo định tính.
- **Trang `/pro` chặn fetch tự động (403)** → giá lấy từ nguồn thứ ba đối chiếu chéo; **verify lại tại nguồn chính thức** trước khi in.

*Số liệu (giá, model, tính năng) có thể đã thay đổi — luôn kiểm tra lại tại perplexity.ai và docs.perplexity.ai.*
:::
