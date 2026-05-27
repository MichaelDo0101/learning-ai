# Data Governance + Data Quality

::: tip Mở đầu
**Bạn từng gặp: số trên report ≠ business thực tế, cùng 1 user trên 2 system info khác, phân tích không tin được vì dirty data?** Data governance giải systematically. "Data-driven decision" era, data quality quyết decision quality — **Garbage In, Garbage Out**.
:::

**Bạn sẽ học**:
- **6 quality dimension**: completeness, accuracy, consistency...
- **Governance framework**: org + process + tech
- **Data lineage**: track data từ source → consume
- **Metadata management**: "data describing data"
- **Layered architecture**: ODS → DWD → DWS → ADS
- **Practical**: how to roll out

| Chương | Nội dung |
|-----|------|
| **1** | 6 quality dimensions |
| **2** | Governance framework |
| **3** | Data lineage |
| **4** | Metadata management |
| **5** | Layered architecture |
| **6** | Tools + practice |

---

## 0. Toàn cảnh: sao cần governance?

Governance không phải tech, mà **management**. Trả lời: **Ai own data? Standard là gì? Đảm bảo data persistently trustworthy thế nào?**

Tưởng cty 100 table, mỗi team riêng, no naming convention, no data dictionary, no quality check. Kết quả: cùng "MAU" metric, marketing tính 500k, product tính 300k — vì definition khác.

::: tip 4 pillars governance
1. **Org**: Data Owner, Data Steward role + responsibility
2. **Process**: data onboarding, change, deprecation standard process
3. **Tech**: deploy data quality monitor, metadata mgmt, lineage
4. **Culture**: cả công ty agree "data là asset", không phải "data là byproduct"
:::

---

## 1. 6 quality dimensions

<DataQualityDemo />

| Dim | Definition | Detection | Common issue |
|------|------|---------|---------|
| Completeness | Data thiếu không | Null rate check | Required field empty |
| Accuracy | Data đúng không | Rule check, sampling | Money negative, date invalid |
| Consistency | Multi-source đồng nhất | Cross-system compare | CRM + order name khác |
| Timeliness | Update kịp không | Update time check | Stock lag, price không sync |
| Uniqueness | Có duplicate | Dedup | User register 2 lần |
| Validity | Format đúng không | Regex / range | Email sai format, age âm |

::: tip 1-10-100 rule
- **$1**: validate ở entry, prevent dirty data
- **$10**: clean dirty data trong data warehouse
- **$100**: cost decision sai vì dirty data

Phát hiện + fix sớm = rẻ nhất.
:::

---

## 2. Governance framework

Không phải one-time project, mà ongoing process xuyên data lifecycle.

<DataGovernanceFrameworkDemo />

| Stage | Output | Role |
|------|---------|---------|
| Define standard | Data dictionary, naming convention, classification | Data architect |
| Ingest | Ingest spec, validation rule, lineage record | Data engineer |
| Storage | Layered model, permission matrix, lifecycle policy | DBA / platform |
| Consume | Data catalog, mask rule, quality report | Data analyst / business |
| Archive | Archive strategy, deletion record, audit log | Security + compliance |

### DAMA-DMBOK domains

| Domain | Core content | Key output |
|---------|---------|---------|
| Data architecture | Define model, flow, storage | Architecture diagram, ER |
| Data standard | Unified naming, encoding, metric definition | Data dictionary, metric library |
| Data quality | Quality rule, monitor, fix process | Quality report, SLA dashboard |
| Data security | Classification, access control, mask/encrypt | Security policy, audit log |
| Master Data Management | Unified "golden record" cho core entity | Master data center |
| Data lifecycle | Create → archive → destroy | Retention policy, archive rule |

::: tip Maturity model
- **Level 1 - Initial**: no unified, each team own way
- **Level 2 - Repeatable**: basic doc, execution inconsistent
- **Level 3 - Defined**: unified process + tool, đa số team theo
- **Level 4 - Managed**: quantified metric + auto monitor
- **Level 5 - Optimized**: continuous improve, governance trong daily dev
:::

---

## 3. Data lineage: từ đâu đến đâu

**Data lineage** record full flow data từ source → consume cuối. Như "family tree" của data.

<DataLineageDemo />

3 core use case:

| Scenario | Question | Lineage giúp |
|------|------|------------|
| Impact analysis | Sửa field user table, ảnh hưởng report nào? | Trace down lineage hết dependency |
| Root cause | Hôm nay GMV report bất thường, vấn đề ở step nào? | Trace up lineage từng mắt xích |
| Compliance audit | Phone user qua system nào? Mask hết chưa? | Track sensitive field full flow |

::: tip Lineage collection
- **Active**: parse SQL, ETL config → auto extract table/field-level lineage
- **Passive**: Hook query engine (Hive, Spark) execution plan → realtime record

Mainstream tool: Apache Atlas, DataHub, OpenLineage — auto lineage collection.
:::

---

## 4. Metadata management: "data describing data"

Metadata = data về data. Data = nội dung sách, metadata = table of contents, author, ISBN.

| Type | Description | Vd |
|-----------|------|------|
| Technical | Physical storage info | Table name, field type, partition, location |
| Business | Business meaning | Field VN name, business definition, calculation |
| Operational | Runtime status | ETL execution time, data volume, frequency |

::: tip Data dictionary
1 dictionary tốt phải có:
- **Field name**: EN + VN
- **Type**: VARCHAR(50), INT, DATETIME
- **Business definition**: field đại diện gì? Tính thế nào?
- **Value range**: valid value? Null allowed?
- **Owner**: ai maintain? Có vấn đề tìm ai?

Không dict → new hire hiểu table mất 1 tuần. Có dict → 10 phút.
:::

---

## 5. Layered architecture: ODS → DWD → DWS → ADS

Data warehouse không nhét hết vào 1 chỗ, mà layered theo **processing level**.

| Layer | Full | Role | Đặc điểm |
|------|------|------|---------|
| ODS | Operational Data Store | Mirror business DB | Raw, không xử |
| DWD | Data Warehouse Detail | Clean, standardize, dedup | Clean detail record |
| DWS | Data Warehouse Summary | Theme aggregate (day/week/month) | Pre-computed metric |
| ADS | Application Data Store | Cho report/API cụ thể | Direct usable |

::: tip Sao layered?
- **Reuse**: DWD clean 1 lần, mọi layer trên share, tránh re-clean
- **Decouple**: business DB schema change chỉ ảnh hưởng ODS, không touch report
- **Performance**: DWS pre-aggregate, report query read direct
- **Traceable**: mỗi layer giữ, debug từng layer
:::

---

## 6. Tool + practice

| Tool | Position | Capability | Use |
|------|------|---------|---------|
| Great Expectations | Data quality | Declarative validation, auto quality report | Python pipeline |
| dbt | Data transformation | SQL model, built-in test + doc | DW modeling |
| DataHub | Metadata | Data catalog, lineage, discovery | Enterprise |
| Apache Atlas | Metadata | Hadoop lineage | Big data |
| OpenMetadata | Metadata | Open data catalog, multi-source | SME team |
| Amundsen | Discovery | Search-based data discovery | Data democratization |

::: tip Path from zero
1. **Data dictionary trước**: record table + field meaning (dù bằng Excel)
2. **Add quality check**: critical pipeline có null + range check
3. **Unified metric**: "DAU", "MAU", "GMV" calculation method statunified
4. **Introduce tool**: khi manual cost quá cao, dùng DataHub / dbt
5. **Build process**: data change phải review, quality issue có SLA + alert
:::

---

## Tổng kết

Data governance = engineering biến data từ "usable" → "good, trustworthy, traceable". Không one-time, mà ongoing operation.

1. **6 dimensions**: completeness, accuracy, consistency, timeliness, uniqueness, validity
2. **4 pillars**: org, process, tech, culture
3. **Data lineage**: support impact analysis + root cause
4. **Metadata**: data dictionary = most basic + important output
5. **Layered architecture**: ODS → DWD → DWS → ADS
6. **Progressive rollout**: từ dictionary, gradually tool + process

::: tip 2026 cho VN dev
- **Modern data stack 2026**: dbt + Snowflake/BigQuery + Airflow + Datadog
- **Open-source alternative**: dbt-core + DuckDB + Dagster + DataHub
- **VN context**: bank dùng Informatica, Talend; modern startup dùng dbt + Snowflake; smaller team dùng Metabase + Airflow
- **AI + governance**: LLM tự auto-doc data dictionary, semantic search trên catalog (DataHub có AI assistant)
- **Privacy**: GDPR, VN Data Protection Decree → cần tool support PII detection (Macie AWS, BigID)
:::

## Tài liệu

- [DAMA-DMBOK](https://www.dama.org/cpages/body-of-knowledge)
- [DataHub](https://datahubproject.io/)
- [Great Expectations](https://greatexpectations.io/)
- [dbt](https://www.getdbt.com/)
- [Kimball Data Warehouse Toolkit](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/)
