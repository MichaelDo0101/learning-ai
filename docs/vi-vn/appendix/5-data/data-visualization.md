# Data Visualization + Dashboard

::: tip Mở đầu
**1 chart tốt hơn 1000 dòng data.** Visualization biến số trừu tượng → visual trực quan, hiểu story sau data trong vài giây. Từ Excel chart đến Grafana monitor — visualization có mọi nơi.
:::

**Bạn sẽ học**:
- **Chart selection**: chọn chart đúng theo mục đích
- **Design principles**: core design
- **Dashboard layout**: pattern theo loại
- **Tool ecosystem**: tool mainstream
- **Common traps**: tránh misleading

| Chương | Nội dung |
|-----|------|
| **1** | Chart type selection |
| **2** | Visualization principles |
| **3** | Dashboard layout |
| **4** | Tool selection |
| **5** | Common traps |

---

## 0. Toàn cảnh: sao cần visualization?

Não người xử visual nhanh hơn text **60000 lần**. 1 line chart cho biết "tháng qua sale giảm" trong 1 giây; table → 30 giây.

Core value:
- **Phát hiện pattern**: trend, cycle, outlier rõ trong chart
- **Hỗ trợ decision**: cho non-tech hiểu data
- **Giao tiếp**: 1 hình ≥ 1000 lời, giảm ambiguity

::: tip Visualization ≠ đẹp
Goal **truyền info**, không show off. 1 bar chart mộc nhưng accurate > 3D chart fancy nhưng khó hiểu.
:::

---

## 1. Chart type selection

Step 1: không phải "tôi thích chart nào", mà "tôi muốn truyền info gì".

<ChartTypeSelectorDemo />

### Cheat sheet

| Mục đích | Recommend | ❌ Không nên | Lý do |
|---------|---------|--------|------|
| So size | Bar, column | Pie | Mắt nhạy length hơn angle |
| Show trend | Line, area | Bar | Line continuity suggests time |
| Show proportion | Pie (≤5), stacked bar | 3D pie | 3D perspective bóp méo area |
| Show distribution | Histogram, box plot | Line | Distribution cần frequency, không trend |
| Show relationship | Scatter, bubble | Bar | 2 continuous var cần 2D space |

::: tip Decision rule đơn giản
- **1 var** → histogram (distribution) / number card (KPI)
- **2 var** → line (time vs value) / scatter (value vs value)
- **Multi category** → bar (compare) / pie (proportion, ≤5)
- **Multi-dim** → radar / parallel coordinates
:::

---

## 2. Visualization design

Edward Tufte trong "The Visual Display of Quantitative Information" đưa core principles:

| Principle | Note | Anti-example |
|------|------|---------|
| Data-ink ratio | "Ink" cho data cao | Grid line thừa, decoration |
| Min non-data | Bỏ visual không truyền info | 3D, shadow, gradient bg |
| Consistent scale | Y axis từ 0, scale đều | Y từ 95 (phóng đại diff) |
| Color hợp lý | Encode info, không decoration | Rainbow cho ordered data |
| Label rõ | Title, axis, legend đủ | Không unit, không time range |

### Color rules
1. **Same metric same color**: revenue luôn blue
2. **Ordered data dùng gradient**: temperature low-high → blue-red
3. **Colorblind-friendly**: ~8% nam có red-green colorblind

### Data-ink ratio

**Xoá hết element không truyền info**.

| Xoá | Giữ |
|-----------|-----------|
| 3D, shadow, gradient | Data point, axis label |
| Grid line thừa | Reference line (target value) |
| Decoration icon | Legend (multi-series) |
| Fancy bg | Title + unit rõ |

### Consistency
- **Color**: cùng dim cùng color
- **Scale**: Y từ 0 (trừ khi có lý do)
- **Time**: axis interval đều, không jump

### Readability
- **Title nói conclusion**: không "Monthly Sales", mà "Sales giảm liên tục 3 tháng"
- **Annotate key points**: outlier, turning point
- **Control density**: 1 chart 1-2 insight, không nhét nhiều

::: tip Tufte quote
"Excellence in statistical graphics consists of complex ideas communicated with clarity, precision, and efficiency."
:::

---

## 3. Dashboard layout: scenario khác, pattern khác

Dashboard = nhiều chart combine. Tốt = không pile chart, mà chọn pattern theo use case.

<DashboardLayoutDemo />

### 4 patterns

| Pattern | Structure | Use | Design |
|---------|---------|---------|---------|
| Overview | KPI card + trend + detail | Mgmt daily, ops overview | Core metric trên cùng |
| Compare | Symmetric layout | A/B test, YoY/MoM | Dim consistent, highlight diff |
| Drill-down | Summary → detail từng layer | Sales analysis, user behavior | Support click, deep dive |
| Realtime | Big number + curve + alert | 12.12 wall, monitoring | Auto refresh, dark bg, big screen |

### 5 design principles

1. **"Ai xem"**: CEO → strategic; ops → process; engineer → tech
2. **5-second rule**: hiểu core info trong 5s
3. **Info hierarchy**: top-left quan trọng nhất (F-pattern reading)
4. **Tránh scroll**: 1 screen hiển thị core
5. **White space**: đừng nhét full, để thở

::: tip Dashboard vs Report
- **Dashboard**: realtime, interactive, monitor + decide nhanh
- **Report**: periodic (daily/weekly/monthly), static, detail analysis + archive

Không thay thế, mà bổ sung. Dashboard phát hiện vấn đề, report deep dive.
:::

---

## 4. Tool selection

3 tiers:

### 4.1 Code-level chart library

| Tool | Lang | Đặc điểm | Use |
|------|------|------|------|
| ECharts | JS | Out-of-box, type chart phong phú | Business system embedded |
| D3.js | JS | Low-level flexible | High customization |
| Chart.js | JS | Lightweight | Simple chart |
| Matplotlib | Python | Scientific standard, static | Analysis, paper |
| Plotly | Python/JS | Interactive, 3D support | Exploration, Jupyter |

### 4.2 BI platform (no/low-code)

| Tool | Position | Lợi | Team |
|------|------|---------|---------|
| Grafana | Monitoring | Time-series tốt, alert | Ops/SRE |
| Metabase | Lightweight BI | Open free, SQL dễ | Mid team |
| Apache Superset | Enterprise BI | Open, big data source | Có data team |
| Tableau | Commercial BI | Drag-drop, đẹp | Business analyst |
| Power BI | Commercial BI | Microsoft ecosystem | MS shop |

::: tip Selection
- **Dev embedded chart** → ECharts hoặc Chart.js
- **Data analyst** → Plotly + Jupyter hoặc Metabase
- **Ops monitoring** → Grafana
- **Business self-service** → Metabase (open) hoặc Tableau (commercial)
- **High custom** → D3.js (learning steep, unlimited)
:::

---

## 5. Common traps: charts đang nói dối bạn

### 5.1 Truncated axis

Y axis bắt đầu từ số lớn → diff nhỏ trông khổng lồ.

| Scenario | Real | Visual |
|------|---------|---------|
| Y từ 0 | A 98 điểm, B 95 điểm | Diff nhỏ |
| Y từ 90 | Cùng data | A như gấp nhiều lần B |

**Khi nào truncate được?** Khi value tuyệt đối lớn nhưng thay đổi nhỏ (vd stock 100→105). Phải **explicit label**.

### 5.2 3D pie chart trap

3D perspective làm sector gần viewer trông lớn hơn. 25% sector trong 3D có thể trông như 35%.

**Solution**: đừng dùng 3D pie. Dùng pie thường, donut, hoặc bar chart.

### 5.3 Color abuse

| ❌ Sai | ✅ Đúng |
|---------|---------|
| Red-green (colorblind unfriendly) | Blue-orange (colorblind-safe) |
| Mỗi category 1 color (rainbow) | Same series same hue, shade đậm-nhạt |
| Color encode continuous data không legend | Always provide legend + value |
| BG color + data color contrast thấp | WCAG AA contrast |

### 5.4 Other errors

| Trap | Issue | Fix |
|------|------|------|
| Dual Y axis | 2 metric không liên quan share X → suggest causality | Split thành 2 chart |
| Area misleading | Dùng radius vs area | Value double → area double, không radius double |
| Uneven time axis | Tháng 1, 3, 12 same spacing | Theo real time proportion |
| Quá nhiều category | Pie có 15 sector | >5 → bar chart hoặc "Other" |

::: tip Ethics
Visualization goal **hỗ trợ hiểu**, không **manipulate cognition**. Mỗi chart hỏi:
- Reader có rút conclusion sai không?
- Có hide unfavorable data?
- Axis, scale, color có công bằng?
:::

---

## Tổng kết

Visualization = "last mile" truyền value data.

1. **Mục đích trước → chart**: compare bar, trend line, proportion pie
2. **Data-ink ratio**: xoá element không truyền info
3. **Dashboard pattern**: overview, compare, drill-down, realtime
4. **Tool theo need**: ECharts product, Grafana monitor, Metabase analyze
5. **Tránh trap**: truncated axis, 3D pie, color abuse

::: tip 2026 cho VN dev
- **AI + viz**: Vercel v0, Plotly Dash, Streamlit, gradio — AI gen chart code từ description
- **Modern stack**: Apache Superset / Metabase open-source mainstream cho VN startup
- **VN enterprise**: PowerBI dominant (Microsoft), Tableau (banking)
- **Realtime**: Grafana + Prometheus chuẩn DevOps; ECharts cho frontend dashboard
- **AI analytics**: ChatGPT/Claude tạo chart từ CSV qua code interpreter — 0-code analytics
:::

## Tài liệu

- [ECharts docs](https://echarts.apache.org/)
- [D3.js](https://d3js.org/)
- [Grafana](https://grafana.com/)
- [Tufte: Visual Display](https://www.edwardtufte.com/tufte/books_vdqi)
- [From Data to Viz](https://www.data-to-viz.com/)
- [ColorBrewer](https://colorbrewer2.org/)
