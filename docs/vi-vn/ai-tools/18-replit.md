---
title: 'Replit — IDE đám mây + AI Agent tự dựng & tự deploy app'
description: 'Hướng dẫn thực chiến Replit: Replit Agent 3 tự viết full-stack app, tự test trên trình duyệt và deploy 1-click. Đăng ký, gói & giá (effort-based), dùng được ở VN, workflow prompt thật, case study và bài tập.'
---

# Replit — IDE đám mây + AI Agent tự dựng & tự deploy app

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🟧</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn là PM/founder ở một startup VN, cần một *"app chấm công nội bộ"* để demo cho sếp sáng mai — nhưng dev đang kẹt sprint, mà bạn thì không biết code. Bình thường việc này nằm im trong backlog 2 tuần. Với Replit bạn mở trình duyệt, gõ một đoạn mô tả bằng tiếng Việt, **Replit Agent** tự viết frontend + backend, dựng database, **tự mở trình duyệt bấm thử các nút**, sửa lỗi, rồi **deploy ra một URL chạy thật** — ngay trong buổi tối.
**💸 Lợi ích thực tế:** một người không-phải-dev gom được "ý tưởng → app chạy có link" vào một phiên làm việc; thay vì chờ hàng đợi dev cho mọi tool nội bộ nhỏ, bạn tự dựng prototype để chốt ý rồi mới giao dev làm bản production.
:::

> **"Replit không phải ô chat gợi ý code, cũng không chỉ là editor online.**
> **Nó là IDE đám mây + một agent: tự viết app full-stack, tự mở browser test, tự sửa, rồi deploy 1-click — bạn không cần cài gì lên máy."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- **Đăng ký Replit** và dựng app đầu tiên *hoàn toàn trên trình duyệt* — không cài đặt máy local.
- **Giao việc cho Replit Agent** bằng ngôn ngữ tự nhiên (kể cả tiếng Việt) để nó tự viết, tự test trên browser và tự deploy.
- **Viết prompt "đúng cách"**: cụ thể, chia nhỏ, dùng checkpoint để rollback khi agent đi sai.
- **Hiểu cách tính tiền effort-based** để không bị "đốt credit" bởi vòng lặp lỗi của agent.
- **Quyết định gói phù hợp ở VN** (Free / Core / Pro) và biết khi nào **KHÔNG** nên dùng Replit (so với Cursor/Codex/Bolt).
- **Dựng thêm automation/bot** (cron, Slack/Telegram bot) chỉ bằng mô tả ngôn ngữ tự nhiên.
:::

Đây là chương công cụ — bạn nên vừa đọc vừa mở `replit.com` gõ theo. Học bằng tay nhớ lâu gấp đôi.

---

## 01 · Công cụ này là gì & dùng khi nào

**Replit** là một **IDE đám mây (online) chạy hoàn toàn trên trình duyệt** kết hợp một **AI agent tự động (Replit Agent)**. Nhà cung cấp là **Replit, Inc.** (CEO Amjad Masad). Bạn mô tả app bằng ngôn ngữ tự nhiên, Agent tự viết code frontend + backend, dựng database, tích hợp API, **tự test trên trình duyệt** rồi **deploy 1-click** — không cần cài máy local. Đây là nền tảng *"vibe coding"* tiêu biểu: ý tưởng → câu lệnh → phần mềm chạy thật.

Replit khởi đầu là một **REPL/IDE để học code online**, nay đã chuyển định vị thành nền tảng **"prompt-to-app" full-stack** phục vụ cả người không biết code lẫn dev chuyên nghiệp (làm tool nội bộ, dựng prototype nhanh). Cụ thể nó có thể:

- **Hiểu mô tả tiếng Việt/Anh** và tự lập kế hoạch xây app.
- **Viết code nhiều file** (frontend + backend) ngay trong editor đám mây.
- **Dựng database + Auth tích hợp sẵn**, quản lý secret cho tích hợp bên thứ ba (Stripe, OpenAI…).
- **Tự mở trình duyệt thật để test** — di chuyển con trỏ, bấm nút, điền form, tự đăng nhập để kiểm tra luồng user — rồi tự sửa lỗi.
- **Deploy 1-click** lên hạ tầng của Replit (chạy trên Google Cloud), gắn custom domain.

::: tip 📌 Bối cảnh công ty (đọc để có ngữ cảnh, đừng học thuộc số)
Theo nguồn báo chí 2025–2026 (SaaStr / Growth Unhinged), Replit được định giá **~9 tỷ USD** sau vòng gọi vốn 400 triệu USD, doanh thu **~240 triệu USD** năm tài chính 2025, đặt mục tiêu **1 tỷ USD ARR** cuối 2026. *Đây là số liệu báo chí, không phải số kiểm toán công khai — chỉ dùng để hình dung quy mô, đừng trích như sự thật tài chính chính thức.*
:::

### Replit Agent 3 — trái tim của sản phẩm

Bước nhảy lớn nhất là **Agent 3**, ra mắt **10/09/2025**. Đây là điểm khiến Replit khác hẳn một editor online thường:

- **Autonomy tới ~200 phút** ở chế độ **"Max Autonomy" (Beta)** — tăng khoảng **10×** so với Agent 2 (~20 phút). Nghĩa là bạn có thể giao một việc lớn rồi để agent tự chạy dài hơi.
- **Tự test & tự sửa (self-testing / reflection loop):** Agent **mở trình duyệt thật, di chuyển con trỏ**, bấm nút, điền form, kiểm tra API/nguồn dữ liệu, **tự login bằng Replit Auth** để test luồng user; phát hiện lỗi → sửa → chạy lại đến khi pass. Replit cho biết hệ thống test riêng của họ *"3× nhanh hơn, 10× rẻ hơn"* so với các "Computer Use models".
- **Agent tạo ra Agent khác + automation:** dựng chatbot, workflow theo lịch (cron) bằng mô tả ngôn ngữ tự nhiên — ví dụ Slack bot hỏi-đáp codebase/Notion, Telegram bot đặt lịch, email tóm tắt task Linear.
- **Effort controls:** bật *"High-power model"* (model mạnh hơn cho task khó) + *"Extended Thinking"* (cho thêm thời gian suy luận) + web search.

::: warning 💡 Đừng nhầm "Replit" với các thứ tên/dạng giống
- **Replit (editor online thuần)** vs **Replit Agent:** Replit vẫn là một IDE đầy đủ; *Agent* là lớp AI tự hành phía trên. Bạn có thể tự gõ code trong editor hoặc để Agent làm.
- **Replit ≠ Bolt.new / v0:** cùng là "prompt → app" nhưng Replit có **editor + database + deploy + test browser** trong một chỗ; Bolt thiên về "ra URL prototype nhanh nhất".
- **Replit ≠ GitHub Codespaces:** Codespaces là *môi trường dev cloud* (VS Code) cho dev tự code — **không phải AI builder**.

Replit là **sản phẩm chính chủ của Replit, Inc.** Trang chủ: <https://replit.com> · Agent: <https://replit.com/products/agent>.
:::

**Dùng khi nào?** Khi bạn muốn đi từ *ý tưởng → app chạy thật có link* mà **không phải cài môi trường, không phải tự lo deploy**: dựng tool nội bộ (CRM mini, form, dashboard), prototype để chốt ý với sếp/khách, MVP cho startup nhỏ, hoặc tự động hoá vài việc lặp (bot, cron). Nó tỏa sáng đúng ở chỗ "người không phải dev cũng ra được phần mềm chạy được", và ở chỗ "dev muốn dựng nhanh một thứ rồi deploy ngay".

### So với công cụ khác

Replit không phải lựa chọn duy nhất. Bảng dưới so sánh khách quan với các công cụ cùng hạng mà người dùng VN hay cân nhắc *(đặc điểm tới giữa 2026, có thể đổi; nhiều số/đặc tả là Replit/đối tác tự công bố)*:

| Tiêu chí | **Replit (Agent 3)** | **Cursor** | **OpenAI Codex (cloud)** | **Bolt.new** | **GitHub Codespaces** |
|---|---|---|---|---|---|
| Bản chất | IDE cloud + agent tự dựng + deploy | IDE (fork VS Code) + AI sâu | Agent cloud "teammate" (mỗi task 1 sandbox, tạo PR) | "Prompt → full-stack app" trên trình duyệt | Dev environment cloud (VS Code), **không phải AI builder** |
| Người dùng | Non-coder + dev (nội bộ / prototype) | **Dev biết code** (kiểm soát cao) | Dev (giao task, review PR) | Non-coder / PM cần prototype nhanh | Dev cần môi trường sẵn |
| Deploy | Có sẵn, **1-click** | Không (chỉ editor) | Không (tạo PR vào GitHub) | Có, ra URL nhanh nhất | Không tự deploy |
| Chất lượng code | Hoàn chỉnh first-version (lập kế hoạch trước, chậm hơn) | **Production-ready nhất** (hiểu cả codebase) | Mạnh ở repo-scale, có test/log làm bằng chứng | "Điểm khởi đầu, không phải bản hoàn thiện" | Tùy dev viết |
| Giá tham chiếu | Free + Core ~$20–25 + Pro $100 (credit) | ~$20/th (Pro, flat) | Theo gói ChatGPT + dùng | Free / Pro $25 / Teams $30/member | $0.18/giờ (2 core); free 120 core-hours / 15GB |
| Điểm mạnh riêng | Tự test browser + tự deploy + tạo automation | Background Agents, kiểm soát kiến trúc | Tích hợp GitHub PR + review evidence | Ra URL nhanh nhất | Hạ tầng dev ổn định, pay-as-you-go |

**Đọc bảng cho đúng — chọn theo nhu cầu** *(định hướng theo Zapier, NoCode.Tech, Medium/Anna Arteeva)*:

- **Bạn biết code, cần kiểm soát kiến trúc & chất lượng production** → **Cursor**.
- **Bạn muốn app chạy thật + deploy mà không cần biết code** → **Replit**.
- **Bạn cần một URL prototype siêu nhanh để demo** → **Bolt.new**.
- **Bạn làm trong quy trình GitHub/PR review chặt** → **Codex** (Codex thường được ghép *vào* workflow của Replit, không hẳn là đối thủ trực diện).
- **Bạn chỉ cần một môi trường dev cloud thuần (không cần AI builder)** → **GitHub Codespaces**.

::: warning 🛑 Khi nào KHÔNG nên dùng Replit (xem kỹ trước khi "all-in")
- **Đã có codebase lớn, cần kiểm soát kiến trúc / PR review chặt** → Cursor hoặc Codex (GitHub) phù hợp hơn.
- **Cần code production chất lượng cao, tối ưu sâu:** Agent cho first-version tốt nhưng *"vibe coding"* dễ phát sinh **nợ kỹ thuật** — bạn vẫn phải có người review/refactor.
- **Ngân sách nhạy cảm + task phức tạp/dài:** effort-based pricing + vòng lặp lỗi có thể đốt credit nhanh, khó dự toán (xem mục 02 & 04).
- **Cần làm việc offline / local hoàn toàn**, hoặc compliance bắt buộc tự host → không hợp (trừ khi mua **Enterprise single-tenant**).
- **Chỉ cần môi trường dev cloud thuần** (không cần AI builder) → GitHub Codespaces rẻ và đơn giản hơn.
:::

---

## 02 · Đăng ký / Truy cập & giá — bối cảnh VN

### Đăng ký (không cài đặt gì)

Vào <https://replit.com> → **Sign up** (Google / GitHub / email) → dùng ngay trên trình duyệt. Không cài máy local; có **app mobile** để theo dõi/khởi tạo nhanh.

```text
1. Mở https://replit.com
2. Sign up bằng Google / GitHub / email
3. Vào workspace → ô chat Agent đã sẵn sàng nhận mô tả app
```

### Có gói Free dùng được không? — CÓ (giới hạn)

Khác Claude Code (bắt buộc trả phí), **Replit có gói Free (Starter) dùng thật được** để học và thử Agent — nhưng credit Agent hằng ngày có hạn và chỉ publish được 1 project. Muốn dùng nghiêm túc thì nâng lên Core/Pro.

### Bảng giá *(theo replit.com/pricing tới giữa 2026 — sản phẩm đổi nhanh, kiểm tra lại link ở mục 07)*

| Gói | Giá | Gồm gì (rút gọn) |
|---|---|---|
| **Starter (Free)** | 0 USD | Credit Agent hằng ngày (miễn phí), database tích hợp, tạo slide/video/animation, **publish tối đa 1 project**, deployment private/password |
| **Core** | **$25/tháng** (trả tháng) · **$20/tháng** (trả năm, tiết kiệm ~20%) | **$25 credit/tháng**, tối đa 5 cộng tác viên, **2 agent song song**, workspace không giới hạn, gỡ badge thương hiệu, AI integrations |
| **Pro** | **$100/tháng** (trả tháng) · **$95** (trả năm) | **$100 credit/tháng**, tối đa 15 builder + 50 viewer, **10 agent song song**, model mạnh nhất, database rollback 28 ngày, premium support |
| **Enterprise** | Giá custom | SSO/SAML, single-tenant, chọn region, static outbound IP, VPC peering, advanced privacy |

::: tip 🗓️ Vài mốc thay đổi gói (để khỏi bỡ ngỡ khi thấy giá khác)
- **Core giảm từ $25 → $20** (trả năm) từ khoảng **25/02/2026**.
- **Pro ra mắt 20/02/2026**, thay thế gói **Teams** cũ — khách Teams được tự nâng lên Pro.
- *(Tên gói/giá có thể tiếp tục đổi — luôn xem trang pricing chính chủ trước khi quyết định.)*
:::

### Effort-based pricing — phần QUAN TRỌNG nhất về tiền

Từ **01/07/2025**, Replit bỏ mô hình cũ *"$0.25/checkpoint cố định"* và chuyển sang **effort-based pricing** — chi phí phản ánh **độ phức tạp thật** của việc agent làm:

- Task đơn giản (sửa nhỏ) có thể **dưới $0.25**.
- Task phức tạp có thể **trên $0.25** (agent làm nhiều, chạy nhiều test, suy luận lâu → tốn hơn).
- **Credit hằng tháng của Core/Pro hết hạn sau ~6 tháng** nếu không dùng; **hết credit thì phát sinh overage** *(theo các nguồn bên thứ ba — nên tự kiểm chứng và đặt giới hạn chi tiêu trong tài khoản)*.

::: warning 💸 Ngầm hiểu về tiền: vòng lặp lỗi vẫn bị tính phí
Vì tính theo *công sức agent bỏ ra*, một **vòng lặp lỗi** (agent sửa đi sửa lại không xong) **vẫn trừ credit** dù không ra kết quả. Đây là phàn nàn phổ biến nhất của cộng đồng (xem mục 04). Hệ quả thực tế: **đặt giới hạn chi tiêu**, chia nhỏ task, và dừng lại rollback sớm khi thấy agent "loanh quanh".
:::

### Dùng được ở Việt Nam không? — CÓ (qua trình duyệt)

**Replit dùng được ở VN** qua trình duyệt; tiếng Việt OK với Agent (bạn mô tả app bằng tiếng Việt, nó hiểu và làm). Thanh toán bằng **thẻ quốc tế Visa/Mastercard** (cần bật *thanh toán online quốc tế* + *3D Secure* ở ngân hàng).

::: warning ⚠️ Phần VN/thanh toán: nguồn mỏng — tự kiểm chứng
Replit **không công bố trang riêng cho VN**, **không có cổng nội địa / không thanh toán bằng VND**. Kết luận "dùng được + trả bằng thẻ quốc tế" đến từ thực tế dùng thẻ quốc tế và nhiều bài hướng dẫn tiếng Việt (tino.vn, codegym.vn, markdao.com.vn) — **không phải tài liệu chính thức của Replit**. Hãy tự kiểm tra lại tại thời điểm bạn đăng ký; nếu thẻ bị từ chối, kiểm tra cài đặt thanh toán quốc tế ở ngân hàng phát hành thẻ.
:::

::: tip 🇻🇳 Điểm cộng cho người Việt
**Mô tả app bằng tiếng Việt vẫn hoạt động tốt** vì Agent hiểu tiếng Việt. Giao diện/docs chủ yếu tiếng Anh và tài liệu cộng đồng tiếng Việt còn ít — vừa là rào cản nhỏ, vừa là khoảng trống tốt để học và chia sẻ.
:::

---

## 03 · Workflow thực chiến — làm từng bước (có prompt thật)

Dưới đây là vòng làm việc chuẩn từ lúc mô tả ý tưởng đến lúc deploy ra URL. Mở `replit.com` và làm theo.

**Bước 1 — Mô tả app ở ô chat Agent.** Prompt nên **cụ thể**: nói rõ ai dùng, làm gì, dữ liệu gì, giao diện ra sao. Ví dụ một prompt thật (tiếng Anh cho Agent "hiểu chắc", bạn cũng có thể viết tiếng Việt):

```text
Build a Vietnamese-language expense tracker web app. Users log in with email.
They can add expenses (amount in VND, category, date, note), see a monthly total,
and a pie chart by category. Use a built-in database. Make the UI mobile-friendly
and in Vietnamese.
```

**Bước 2 — Agent lập kế hoạch.** Nó đề xuất kiến trúc và cho bạn chọn **full-stack** hay **frontend-only**, rồi dựng code, cài dependency, tạo DB schema.

**Bước 3 — Agent tự test trên browser.** Đây là điểm đặc trưng: agent **mở trình duyệt thật**, bấm nút, điền form, **tự đăng nhập thử** để kiểm tra luồng user, phát hiện lỗi → sửa → chạy lại trong *reflection loop*. Bạn chỉ quan sát.

**Bước 4 — Review tại checkpoint.** Mỗi bước có **checkpoint** để **rollback** nếu agent đi sai — đây là "phanh an toàn" quan trọng nhất, dùng nó thay vì để agent loanh quanh đốt credit.

**Bước 5 — Iterate bằng prompt NHỎ.** Tránh prompt khổng lồ (dễ gây "loop lỗi"). Sửa từng việc một:

```text
Add a filter to show only this month's expenses
```

```text
Fix: the chart doesn't update after I delete an item
```

::: tip 🧠 Mẹo prompt từ cộng đồng — chia nhỏ là vua
- Bật **"High-power model"** / **"Extended Thinking"** cho task khó (logic phức tạp, bug dai dẳng).
- **Chia task lớn thành nhiều prompt nhỏ** — agent "1-shot" tốt hơn nhiều so với khi bị nhồi một yêu cầu khổng lồ.
- Khi agent **treo / chạy vòng vòng**: dừng lại, **rollback về checkpoint gần nhất**, mô tả lại rõ ràng hơn, hoặc **refresh/restart session**.
:::

**Bước 6 — Thêm automation / agent khác.** Vẫn bằng mô tả ngôn ngữ tự nhiên:

```text
Create a daily 8am automation that emails me yesterday's total spending
```

```text
Build a Slack bot that answers questions about this codebase
```

Replit có sẵn **connectors** để nối: Notion, Linear, Dropbox, SharePoint, Outlook, Google Drive, GitHub; và deploy đầu ra ra **Slack / Telegram / email**.

**Bước 7 — Deploy 1-click → gắn custom domain.** Một nút để đưa app lên hạ tầng Replit (Google Cloud), kèm **DDoS protection + WAF**. Sau đó trỏ **custom domain** của bạn vào.

```text
Deploy this app and set up my custom domain expense.mycompany.vn
```

::: tip 📌 Ví dụ thật — Wholesail: prototype 30 phút thay cho 2 tuần
**Bối cảnh:** Head of Product của **Wholesail** (fintech, dùng qua Plaid) cần thử nghiệm một luồng dữ liệu dòng tiền.
**Làm gì:** Dùng **Replit + Plaid** để dựng prototype kiểm thử dữ liệu — thay vì xếp hàng chờ đội kỹ thuật.
**Kết quả:** việc lẽ ra mất **~2 tuần** được **prototype trong ~30 phút**.
**Bài học:** với người *biết rõ mình muốn gì về sản phẩm*, Replit rút vòng "ý tưởng → bản chạy thử" từ tuần xuống phút — đủ nhanh để **quyết định** thay vì tranh luận.
*Nguồn: blog.replit.com/fintech-pm-customer-story · plaid.com/blog/replit-plaid-prototyping*
:::

---

## 04 · Mẹo hay & lỗi thường gặp

### Mẹo ăn tiền (làm là thấy khác ngay)

::: tip ✅ 7 mẹo thực chiến
1. **Prompt cụ thể, không mơ hồ:** nói rõ *ai dùng / làm gì / dữ liệu gì / UI ra sao*. Mô tả mờ → agent đoán sai → tốn vòng sửa.
2. **Chia nhỏ task:** một yêu cầu = một việc. Prompt khổng lồ là nguyên nhân số một của "loop lỗi".
3. **Dùng checkpoint như Ctrl+Z:** sai là **rollback ngay**, đừng để agent tự "chữa cháy" vòng vòng (đốt credit).
4. **Bật High-power model / Extended Thinking cho việc khó**, tắt cho việc dễ để tiết kiệm.
5. **Đặt giới hạn chi tiêu** trong tài khoản — effort-based pricing có thể nhảy bất ngờ.
6. **Agent treo thường do mạng:** refresh/restart session, kiểm tra VPN/firewall trước khi nghĩ "agent hỏng".
7. **Đừng coi first-version là production:** rất tốt để chạy thử/chốt ý, nhưng hãy review (hoặc nhờ dev review) trước khi đưa vào thật.
:::

::: warning 🔒 Bảo mật & riêng tư — đọc trước khi dán dữ liệu thật
Bạn đang chạy app trên **cloud của Replit** (Google Cloud, US; tùy chọn region Ấn Độ). Một số điểm theo chính sách công bố của Replit *(security page + docs)*:

- **SOC 2 Type II** (2025, Replit nói *"zero exceptions"*), tuân thủ **GDPR/CCPA**, có **DPA + SCC**.
- **Mỗi khách hàng có project GCP riêng biệt** (kể cả free tier); **secret mã hóa AES-256**; mã hóa cả *at rest* và *in transit*.
- **Nội dung private không dùng để train AI** (cam kết của Replit — điểm bán cho doanh nghiệp).
- Deployment có **DDoS protection + WAF**. **Enterprise:** SSO/SAML/OIDC (Okta, Azure AD, Google), RBAC, single-tenant, static outbound IP, VPC peering, "Security Center 2.0".

**Hệ quả thực tế cho người dùng VN:**
- **Đừng dán** API key/token/mật khẩu thật, file `.env` production, **PII khách hàng thật**, hay mã nguồn có **NDA** vào một project Free/cá nhân để "thử cho nhanh".
- Dùng **secret manager** sẵn có của Replit thay vì hard-code key vào code.
- Việc/compliance nhạy cảm cần cân nhắc **Enterprise (single-tenant)** thay vì gói thường.
- *Nguồn: docs.replit.com/teams/information-security/overview · replit.com/products/security · replit.com/dpa*
:::

### Lỗi thường gặp & cách tránh

::: warning 🚨 Những chỗ hay vấp ở quy mô thật *(số liệu lỗi là từ blog/forum bên thứ ba — gắn "theo nguồn", không phải thống kê chính thức)*
1. **"Loop lỗi" của Agent:** agent sửa đi sửa lại không xong nhưng **vẫn trừ credit** (theo sidetool.co/forum Replit, khoảng **~$0.50–$1.50/prompt**). → **Rollback về checkpoint**, mô tả lại rõ hơn, chia nhỏ việc.
2. **"Run out of agent calls… try again in 6 hours"** / hết credit đột ngột → lo ngại **chi phí khó đoán** với effort-based pricing. → Theo dõi mức dùng, đặt giới hạn, cân nhắc gói cao hơn nếu dùng nặng.
3. **Agent treo / phản hồi chậm / lỗi khó hiểu** — nhiều khi do **mạng/VPN/firewall** (theo sidetool: *>60% stall do kết nối*). → Kiểm tra mạng, tắt VPN, refresh session.
4. **"401 Unauthorized"** (credential hết hạn) hoặc **URL sai định dạng**. → Kết nối lại tài khoản/secret, kiểm tra lại đường dẫn.
5. **Coi vibe-coding là xong:** quên rằng first-version có thể mang **nợ kỹ thuật**. → Review code, đặc biệt phần auth/thanh toán, trước khi go-live.
:::

::: details ❓ FAQ & lỗi hay gặp (vận hành)
*(Phần số liệu lỗi dưới đây từ nguồn bên thứ ba — tham khảo, không phải cam kết chính thức của Replit.)*

**Hỏi: Agent cứ sửa vòng vòng không xong, tôi nên làm gì?**
→ Dừng lại, **rollback về checkpoint gần nhất**, rồi **chia nhỏ yêu cầu** và mô tả lại cụ thể hơn. Đừng để agent tự "chữa cháy" mãi vì mỗi vòng vẫn tính phí.

**Hỏi: Sao tôi bị trừ credit mà app vẫn lỗi?**
→ Effort-based pricing tính theo *công sức agent bỏ ra*, kể cả khi kết quả chưa đạt. Đặt **giới hạn chi tiêu**, và rollback sớm khi thấy không tiến triển.

**Hỏi: Agent báo "out of agent calls, try again in 6 hours".**
→ Bạn đã hết hạn mức/credit của chu kỳ. Chờ cửa sổ reset, hoặc nâng gói (Core/Pro có nhiều credit hơn).

**Hỏi: Agent treo, phản hồi rất chậm.**
→ Theo các nguồn cộng đồng, phần lớn trường hợp do **mạng/VPN/firewall**. Refresh/restart session, kiểm tra kết nối, thử tắt VPN.

**Hỏi: Báo "401 Unauthorized" khi gọi tích hợp.**
→ Credential/secret đã hết hạn hoặc cấu hình sai. Kết nối lại connector và kiểm tra secret trong trình quản lý secret.

**Hỏi: Dùng ở VN thanh toán kiểu gì?**
→ Thẻ quốc tế **Visa/Mastercard** (bật thanh toán online quốc tế + 3D Secure). Không có VND/cổng nội địa — xem cảnh báo "nguồn mỏng" ở mục 02.
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tuần tự. Mỗi bài có **tiêu chí thành công rõ** để bạn tự kiểm.

### 🧪 Bài 1 — App đầu tiên trên trình duyệt (cơ bản)

**Mục tiêu:** đăng ký Replit và để Agent dựng một app nhỏ chạy thật, không cài gì lên máy.

1. Vào `replit.com` → Sign up → mở workspace.
2. Dán prompt vào ô chat Agent:

```text
Build a simple to-do list web app in Vietnamese. I can add a task, mark it done,
and delete it. Save tasks in a built-in database so they persist after reload.
Make the UI clean and mobile-friendly.
```

3. Để Agent chạy, quan sát nó **tự test trên browser**.

::: details ✅ Tiêu chí hoàn thành
- App chạy được trong preview của Replit (thêm/đánh dấu/xoá task hoạt động).
- Task **vẫn còn sau khi reload** (đã lưu DB).
- (Tự ngẫm) Bạn thấy Agent tự bấm thử các nút trong trình duyệt khi test.
:::

### 🧪 Bài 2 — Iterate + deploy ra URL thật (cốt lõi)

**Mục tiêu:** trải nghiệm vòng *prompt nhỏ → sửa → deploy*, và dùng checkpoint để rollback.

1. Từ app Bài 1, thêm tính năng bằng **prompt nhỏ**:

```text
Add a filter with three buttons: All, Active, Completed
```

2. Cố tình thử một prompt mơ hồ, thấy agent đi sai → **rollback về checkpoint** trước đó.
3. Khi ưng, **deploy 1-click** và mở URL public.

::: details ✅ Tiêu chí hoàn thành
- Bộ lọc All/Active/Completed hoạt động.
- Bạn đã **rollback về checkpoint** ít nhất một lần (biết "phanh" ở đâu).
- App có **một URL chạy thật** mở được trên điện thoại.
- (Tự ngẫm) Vì sao prompt nhỏ ít gây "loop lỗi" hơn prompt khổng lồ.
:::

### 🧪 Bài 3 — Tool nội bộ + một automation (nâng cao)

**Mục tiêu:** dựng một tool có database + Auth, rồi thêm một automation theo lịch.

1. Tạo app mới:

```text
Build an internal expense tracker. Users log in with email (use built-in Auth).
They add expenses (amount in VND, category, date, note), see a monthly total and a
pie chart by category. Store everything in the built-in database. UI in Vietnamese.
```

2. Thêm automation:

```text
Create a daily 8am automation that emails me yesterday's total spending
```

3. Deploy và đặt giới hạn chi tiêu trong tài khoản trước khi dùng nhiều.

::: details ✅ Tiêu chí hoàn thành
- Đăng nhập bằng email hoạt động; dữ liệu chi tiêu lưu trong DB và hiển thị biểu đồ.
- Có một **automation theo lịch** (cron) được tạo bằng mô tả ngôn ngữ tự nhiên.
- Bạn đã **đặt giới hạn chi tiêu** (kỷ luật chi phí với effort-based pricing).
- (Tự ngẫm) Phần nào của app này bạn sẽ nhờ dev review trước khi đưa vào dùng thật?
:::

---

## 06 · Case study & use-case thật (từ cộng đồng)

Phần này tổng hợp các trường hợp dùng Replit **có thật** giai đoạn 2025–2026. Lưu ý đọc đúng: **đa số số liệu là do Replit hoặc đối tác/khách hàng tự công bố** trên trang `customers`/blog — nên đã gắn nhãn *"theo Replit"*; coi là tham khảo, không phải kiểm chứng độc lập.

::: warning ⚠️ Đọc số liệu cho đúng
- Các con số *tiết kiệm tiền / giảm thời gian* phần lớn là **metric Replit tự công bố** (marketing) — đối chiếu lại nếu trích vào tài liệu chính thức.
- Chúng cho thấy *tiềm năng* của công cụ ở quy mô thật, không phải đảm bảo bạn sẽ đạt y hệt.
:::

**① Zinus (nệm) — DevOps tự build tool nội bộ, tiết kiệm >140.000 USD**
Một nhân viên DevOps tự build công cụ QA chăm sóc khách hàng nội bộ bằng Replit. Theo Replit: **tiết kiệm >140.000 USD** ($40k/năm phí license + $112.050 chi phí thuê dev ngoài) và **giảm 50% thời gian phát triển**. **Bài học:** Replit cho phép người *không thuộc team app chính* tự giải quyết nhu cầu nội bộ thay vì xếp hàng chờ dev. *Nguồn: blog.replit.com/zinus-customer-story.*

**② Rokt (ecommerce) — 135 app nội bộ trong 24 giờ**
Theo Replit, Rokt **build 135 app nội bộ trong 24 giờ**, tổng **tiết kiệm 1,2 triệu USD**. **Bài học:** khi mở khả năng "tự dựng tool" cho cả tổ chức, số lượng tool nhỏ giải quyết được tăng vọt. *Nguồn: replit.com/customers.*

**③ Wholesail (fintech, qua Plaid) — 30 phút thay cho 2 tuần**
Đã kể chi tiết ở hộp *"📌 Ví dụ thật"* mục 03: Head of Product prototype trong **~30 phút** việc lẽ ra mất **~2 tuần**. **Bài học:** rút ngắn vòng quyết định sản phẩm. *Nguồn: blog.replit.com/fintech-pm-customer-story · plaid.com/blog/replit-plaid-prototyping.*

**④ SaaStr — 7 production app trong 3 tháng**
Theo Replit, SaaStr **launch 7 production app trong 3 tháng**. **Bài học:** một tổ chức nhỏ có thể tự ship nhiều ứng dụng vận hành mà không cần phình đội kỹ thuật. *Nguồn: replit.com/customers · saastr.com.*

**⑤ Blubbr (sinh viên đại học) — ~1.000 USD doanh thu/tháng trong 3 tuần**
Một nhóm sinh viên dùng Replit dựng startup, đạt **~1.000 USD doanh thu/tháng trong 3 tuần**. **Bài học:** rào cản "phải biết code mới ra sản phẩm" được hạ thấp đáng kể cho người trẻ khởi nghiệp. *Nguồn: blog.replit.com/blubbr.*

**⑥ Northern Health (y tế, UK) & vài tổ chức khác**
Theo Replit: **Northern Health tiết kiệm >£100.000/năm**; **Leatherman** giảm **60% thời gian**; **Spellbook** (legal) gọi được **20 triệu USD**. **Bài học:** use-case "tool nội bộ + prototype" trải rộng nhiều ngành (y tế, sản xuất, legal). *Nguồn: replit.com/customers — các số này là metric Replit tự công bố.*

::: tip 💡 Các use-case lặp đi lặp lại (mẫu để bạn soi vào nhu cầu của mình)
- **Tool nội bộ nhỏ** (QA, chấm công, form, dashboard) do người không-phải-dev tự dựng.
- **Prototype để chốt ý** với sếp/khách trong phút thay vì tuần.
- **MVP startup** dựng nhanh để thử thị trường, có doanh thu sớm.
- **Automation/bot** (cron, Slack/Telegram, email tóm tắt) bằng mô tả ngôn ngữ tự nhiên.
:::

---

## 07 · Tóm tắt & Nguồn chính thức

::: tip 📌 5 điều mang theo
1. Replit = **IDE đám mây chính chủ + Replit Agent** — mô tả bằng lời, nó tự viết full-stack, **tự test trên browser**, **deploy 1-click**; không cần cài máy local.
2. **Agent 3** (10/09/2025) là bước nhảy: autonomy tới ~200 phút, tự đăng nhập test luồng user, tự dựng cả automation/bot.
3. **Có gói Free** dùng thật (giới hạn). Trả phí: **Core ~$20–25** / **Pro $100** (theo credit). Chú ý **effort-based pricing** — vòng lặp lỗi vẫn tốn tiền.
4. **VN dùng được** qua trình duyệt + thẻ quốc tế (phần VN/thanh toán là *nguồn mỏng* — tự kiểm chứng).
5. **Chọn đúng việc:** non-coder muốn app chạy + deploy → Replit; cần kiểm soát kiến trúc/production → Cursor/Codex; chỉ cần môi trường dev cloud → Codespaces.
6. **Bảo mật:** mỗi khách có project GCP riêng, secret mã hóa, *private không train AI*; nhưng đừng dán secret/PII/NDA thật vào project cá nhân — nhạy cảm thì cân nhắc Enterprise.
:::

Sản phẩm đổi rất nhanh — khi giáo trình lỗi thời, dùng các link chính thức sau để tự cập nhật:

| Chủ đề | Link chính thức |
|---|---|
| Trang chủ | <https://replit.com> |
| Replit Agent | <https://replit.com/products/agent> |
| Bảng giá (pricing) | <https://replit.com/pricing> |
| Blog "Introducing Agent 3" | <https://replit.com/blog/introducing-agent-3-our-most-autonomous-agent-yet> |
| Effort-based pricing | <https://replit.com/blog/effort-based-pricing> |
| Bảo mật (security) | <https://replit.com/products/security> |
| Bảo mật (docs) | <https://docs.replit.com/teams/information-security/overview> |
| Customers (case study) | <https://replit.com/customers> |
| Case Zinus | <https://blog.replit.com/zinus-customer-story> |
| Case fintech (Plaid) | <https://blog.replit.com/fintech-pm-customer-story> |

> *Ghi chú độ tin cậy: phần "là gì / tính năng / giá / bảo mật / link" dựa trên **nguồn chính thức Replit** — khá chắc. Giá đối thủ (mục 01) và metric khách hàng (mục 06) phần lớn là **số Replit/đối tác tự công bố** (đã gắn "theo Replit"). Phần **dùng ở VN / thanh toán** (mục 02) và **số liệu lỗi** (mục 04) là **nguồn mỏng/bên thứ ba** — hãy kiểm chứng thực tế trước khi dựa vào. Số tài chính công ty (~240 triệu USD, định giá ~9 tỷ) là **báo chí 2025–2026**, không phải số kiểm toán. Khi nghi ngờ, xem các link chính thức ở bảng trên hoặc hỏi thẳng trong Replit.*
