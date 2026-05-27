# Data Analysis: core concept, logic, deep insight

::: tip 🎯 Core
**Trích "certainty" guide business từ data hỗn loạn thế nào?**
Web app sinh data behavior cực lớn mỗi giây. Chỉ xem total (vd total visit) thường che sự thật. Chương này từ basic stats đến advanced business analysis.
:::

---

## 0. Overview: bản chất data analysis

> Nhiều người nghĩ liếc report = analysis. Không hiểu transformation "data → information → insight" sẽ kẹt trong detail. Mục tiêu cuối **không phải report, mà decision**.

Data analysis không phải "report tổng hợp", mà **dimension reduction + feature extraction**.

- **Raw Data**: record rời rạc (vd: user A click button B 10:01)
- **Information**: data processed (vd: 30% user click B hôm nay)
- **Insight**: phát hiện rule (vd: button B click rate mobile cao hơn PC → mobile user dựa nhiều vào tính năng này)

Goal: framework "observe → decompose → locate → decide" closed-loop drive business growth.

---

## 1. Descriptive stats: 1 câu tóm bức tranh

> 10k row data không xem từng row được. Cần **information compression**, vài indicator capture pulse. Không hiểu trap mean vs median → bị extreme value dẫn dắt sai (vd "average consumption per user").

<DescriptiveStatsDemo />

### 1.1 Mean — baseline

Tổng / count. Hại: **bị outlier dẫn**. Vd 9 nhân viên 5k, sếp 100k → mean 14.5k, không đại diện majority.

### 1.2 Median + Mode

- **Median**: sort, lấy giữa. Chống outlier, true "middle layer".
- **Mode**: value xuất hiện nhiều nhất. Phân tích "product user thích nhất", "error code thường gặp".

### 1.3 Standard Deviation: rộng-hẹp distribution

Mức độ data dao động quanh mean.
- **Low STD**: data tập trung, mean đại diện tốt (vd zero defect production line)
- **High STD**: data tản, cá thể khác nhiều
- **Use**: monitoring perf, high STD → system instability, có nhiều "long-tail slow request"

---

## 2. Data aggregation: khai thác micro rule

> "Mọi user conversion 5% trung bình" thường true vô nghĩa. Phải **cắt data**, phát hiện khác biệt khu vực, channel, device. Aggregation xuyên "đồng phục average".

Individual behavior chance, group behavior có statistical rule. **Data Aggregation** core: "slice" theo dimension.

<DataAggregationDemo />

### 2.1 Core logic: Split-Apply-Combine

1. **Split**: theo attribute (city, channel, new/old user)
2. **Apply**: aggregate function: `COUNT`, `SUM`, `AVG`
3. **Combine**: compare group, tìm diff

### 2.2 Sao phải Group By?

Aggregated data che vấn đề. Vd: overall conversion tăng, nhưng split ra thấy "Hà Nội" spike kéo, các vùng khác đều rớt. Aggregation định vị chính xác.

---

## 3. Funnel model: định vị "bleed point" của value chain

> Đổ resource lớn pull user, kết quả conversion ít, tiền phí hả? Funnel cho biết user vấp ở step nào. Học section này = từ "guess" sang "precise R&D".

User từ entry → final goal (paid) = lọc dần. Funnel không chỉ xem conversion cuối, mà **xem mất người ở đâu**.

<FunnelAnalysisDemo />

### 3.1 Core conversion metric

- **Overall conversion**: finish endpoint / start total
- **Step conversion**: current step / previous step
- **Drop rate**: 1 - step conversion

### 3.2 Deep analysis

Step có drop rate bất thường → có **experience friction**. Vd:
- Drop ở register page → form phức tạp, OTP không nhận
- Drop ở chọn payment → payment method ít, jump chậm

Optimize chỗ funnel nhất → ROI cao nhất.

---

## 4. Retention analysis: "core" health check

> Retention là gold standard #1. Pull user = đổ nước vào thùng, retention = check thùng có rò không. Chỉ biết total visit (traffic) không biết retention = không judge product growth healthy hay number game.

User growth không = success, **giữ user mới là core value**. Retention = % user revisit sau time.

<RetentionAnalysisDemo />

### 4.1 Time window core

- **D1 retention**: "first impression". 24h sau lần đầu, user cảm core value chưa?
- **D7 retention**: "habit formation". Tuần đầu form habit dùng?
- **D30 retention**: "long-term stickiness". Quyết product survival ceiling.

### 4.2 Retention curve shape: judge PMF

- **Drop tới 0**: product không giải pain, hoặc target sai
- **Flatten (long tail)**: đã có **PMF (Product-Market Fit)**, có loyal user, base scale lên được

---

## 5. Kết: build scientific data intuition

Analyst tốt có critical thinking, không bị bề ngoài lừa:

1. **Xem distribution, không chỉ mean**: nghĩ về diff + outlier
2. **Xem local, không chỉ total**: multi-dim aggregate restore real scenario
3. **Xem trend, không chỉ point**: retention curve xem long-term health
4. **Tìm break, không blind optimize**: funnel locate real bottleneck

Goal không phải report đẹp, mà **giảm uncertainty về tối thiểu, decide based on fact**.

::: tip 2026 cho VN dev
- **Tool**: PostHog, Amplitude, Mixpanel, Heap (product analytics)
- **SQL skill**: must, ngay cả product manager
- **Data viz**: Metabase (open-source), Superset, Tableau
- **VN context**: Shopee, Tiki dùng Amplitude/Mixpanel; bank dùng Tableau/PowerBI
- **AI analytics**: ChatGPT/Claude phân tích CSV, gen SQL query, draft chart
- **Future**: text-to-SQL tool (vendor specific), AI agent analyze data tự động
:::
