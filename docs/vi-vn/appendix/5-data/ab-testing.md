# A/B Testing: "Decide bằng data"

::: tip 🎯 Core
**Verify thay đổi product khoa học thế nào?**
Tình huống quen: team làm feature mới 1 tháng, launch, data tăng vọt! Team vui, 3 tuần sau data lại rớt về cũ. Do feature mới thực sự tốt, hay đúng holiday traffic? A/B testing loại noise, để data nói sự thật.
:::

---

## 0. Toàn cảnh: vũ khí khoa học chống "đoán mò"

Bạn cân nhắc 2 màu button: blue ổn định vs red nổi bật. Decision-maker thường dựa kinh nghiệm, trực giác, hoặc **HiPPO** (Highest Paid Person's Opinion).

Nhưng user feedback thật vượt tưởng tượng. Có thể red quá chói gây giảm conversion, hoặc blue không đủ nổi... Sao chắc chắn 1 change tốt hơn?

Đáp án: **Controlled experiment** — như y học verify thuốc mới.

::: tip 💡 Bản chất A/B
**A/B = compare + observe**
Như "double-blind test" y học:
- **Control (A)**: uống placebo giống thuốc (xem version cũ)
- **Treatment (B)**: uống thuốc mới (xem version mới)
Chỉ khi Treatment conversion rate ổn định + rõ ràng > Control, mới claim thuốc mới (change) hiệu quả.
:::

---

## 1. Traffic split: cắt "parallel universe"

Rule sắt: **đồng thời, random, isolate**.

Không được: "Nửa tháng đầu mọi user xem blue, nửa tháng sau red". Time span = vô số biến số — không biết tăng conversion do red hay do đến 12.12 sale.

Phải tạo "parallel universe" cùng thời điểm. Mỗi user vào, system flip coin → vào universe A hoặc B.

<ABTestingDemo tab="traffic" />

### 1.1 Sao random quan trọng?

Chỉ random 100% mới abolish mọi feature khác. Sample đủ lớn + random hoàn hảo → tỷ lệ user trẻ, thu nhập, vùng địa lý ở A và B sẽ giống nhau.

Lúc đó nếu data khác, chỉ có thể do bạn đổi button đỏ.

---

## 2. Sample + test: math logic thắng ảo tưởng

OK chia nhóm rồi, lấy 10 user xem được không? Đụng rule lạnh lùng nhất A/B: **Law of Large Numbers + Sample Size**.

Flip coin 10 lần, 7 head 3 tail — coin gian lận? Không, base quá nhỏ, 7:3 là noise. Nếu flip 100k lần thấy 70k head, mới claim coin gian lận.

Tương tự, 100 user test, 1 user click nhiều thêm = 1% spike. Cần công thức tính sample size trước experiment.

<ABTestingDemo tab="calculator" />

### 2.1 2 thần hộ mệnh statistics

- **Statistical Power** (thường yêu cầu 80%): nếu change thực sự effective, bạn có bao nhiêu % chắc chắn detect được. (Chống false negative)
- **Significance level (P-value)** (thường <0.05): "P<0.05" — diff giữa 2 nhóm có thể do luck là <5%. Lucky <5% → admit **statistically significant**. (Chống false positive)

## 3. Result showdown

Sau collect đủ data, professional funnel model:

<ABTestingDemo tab="results" />

Thấy **"Significant ✅"** → tự hào claim với cả công ty: bỏ tranh luận chủ quan, full launch B! Có math principle backed.

---

## 4. Pit tối: misanalysis

A/B testing tự thân rational + scientific, nhưng người làm bị weakness của con người. Hay chỉ thấy kết quả mong → test distort:

<ABTestingDemo tab="pitfalls" />

### 4.1 "Novelty effect"

Thứ mới ra, user click vì curiosity → conversion rate vọt 3 ngày đầu.

Nhiều PM stop experiment ngày thứ 3 với "data hoàn hảo" + báo cáo. Nhưng đợi 2 tuần → user hết mới mẻ, data rớt dưới line cũ. Đó là sao **experiment duration** quan trọng — đừng bị short-term spike đánh lừa.

---

## 5. Tổng kết: dũng cảm phục data

Từ "đoán mò trực giác" → "A/B" = mental shift lớn:

1. **Đưa hypothesis thận trọng**: observation kỹ user, hypothesis quantifiable
2. **Cắt parallel universe**: random thuần, loại noise
3. **Chịu sample baptism**: chờ LLN, đủ time + sample giảm volatility
4. **Math judgment**: P-value declare good/bad, strict significance

Là software creator, trí tuệ lớn nhất = **dũng cảm phục sự thật. Không cần cãi nhau giờ trong meeting room về blue vs red; chỉ cần đợi 2 tuần, click rate sẽ chứng minh user thích ai.**

::: tip 2026 cho VN dev
- **Tool**:
  - **Optimizely**: enterprise, no-code A/B
  - **GrowthBook** (open-source): self-host, dev-friendly
  - **Vercel Edge Config + Statsig**: serverless A/B
  - **PostHog**: all-in-one (analytics + A/B + feature flag)
- **VN context**: Shopee, Tiki, Grab dùng A/B extensively
- **AI scenario**: A/B test prompt khác nhau, model khác nhau (GPT-4o vs Claude vs Gemini), embedding model
- **Caveat**: sample size, novelty effect, holiday confounder, segment analysis quan trọng
:::
