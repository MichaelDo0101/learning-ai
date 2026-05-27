# Incident Response + Troubleshooting

::: tip Mở đầu
**3 giờ sáng, điện thoại rung điên cuồng, prod service toàn diện liệt — bạn làm gì?** Với team Internet, fault không phải "có xảy ra không", mà "khi nào". Team tốt không phải không fault, mà fault xảy ra response nhanh, recover hiệu quả, học để không lặp.
:::

**Bạn sẽ học**:
- **Severity tier**: P0~P4
- **Response flow**: phát hiện → recover
- **Org collaboration**: roles
- **Alert escalation**: đảm bảo key issue không sót
- **Postmortem**: 5 whys, no-blame culture

| Chương | Nội dung |
|-----|------|
| **1** | Severity tiers |
| **2** | Response timeline |
| **3** | Incident command |
| **4** | Alert escalation |
| **5** | Postmortem |

---

## 0. Toàn cảnh: fault = best teacher

Netflix có Chaos Monkey — random kill server prod. Nghe điên, logic rõ: **thay vì đợi fault tới, chủ động tạo fault train team**.

Incident response không phải improvisation, mà **process + role + tool** triad. Như fire department không thành lập lúc cháy — họ train + drill + maintain daily.

::: tip 4 core elements
- **Detect fast**: monitor + alert tốt, problem phát hiện trước user
- **Collaborate efficiently**: role + sync mechanism rõ, tránh chaos
- **Recover fast**: ưu tiên restore service, không root cause. Stop bleeding trước, treat sau
- **Continuous improvement**: mỗi fault là learning, postmortem cải tiến system + process
:::

---

## 1. Severity tiers

Color sai vs payment system die không cùng tier. **Severity tiering** cho team respond đúng intensity — không over react waste resource, không under react làm lan rộng.

<SeverityLevelDemo />

| Tier | Name | Impact | Response | Example |
|------|------|---------|---------|------|
| P0 | Fatal | Core business hoàn toàn không dùng | Immediate, all hands | Payment die, data breach |
| P1 | Critical | Core function nặng | Trong 15 phút | Login fail rate >50%, API mass timeout |
| P2 | Major | Partial function abnormal | Trong 1h | Search wrong, 1 phần page 500 |
| P3 | Minor | Non-core abnormal | Work hour | Avatar load fail, non-critical notify delay |
| P4 | Trivial | UX issue | Iteration plan | UI misalign, typo |

::: tip Tiering principles
- **User impact count**: 100% user impact P2 có thể urgent hơn 1% user P1
- **Business loss**: ảnh hưởng revenue (payment, order) ưu tiên cao
- **Degradable**: có workaround thì có thể downgrade
- **Dynamic**: tier có thể adjust khi điều tra sâu
:::

---

## 2. Response timeline

Response như relay, mỗi stage có goal + handoff rõ.

<IncidentTimelineDemo />

::: tip 5 stages
1. **Detection**: monitor/user/internal phát hiện anomaly. Goal: sớm, giảm MTTD (Mean Time To Detect).
2. **Response**: confirm incident, eval severity, call team, set comm channel. Goal: organize force.
3. **Mitigation**: action tạm restore service — rollback, switch backup, rate limit, degradation. Goal: stop bleeding, restore UX.
4. **Resolution**: tìm root cause + fix. Goal: eliminate, prevent recurrence.
5. **Postmortem**: review, analyze root cause, improvement. Goal: learn, robust system.
:::

| Metric | Note | Optimize |
|------|------|---------|
| MTTD | Mean Time to Detect | Improve monitor coverage, lower alert threshold |
| MTTR | Mean Time to Recovery | Auto recovery, runbook drill |
| MTBF | Mean Time Between Failures | Improve reliability, eliminate SPOF |

---

## 3. Incident Command: ai chỉ huy?

Incident lớn sợ nhất không phải tech khó, mà **chaos** — vài chục người cùng debug, không ai biết người khác làm gì, info key phân mảnh nhiều group.

<IncidentCommandDemo />

::: tip 3 core roles
1. **Incident Commander (IC)**: tổng phụ trách. Decide, coordinate, pace. IC không cần technical strongest, nhưng phải coolest + global view.
2. **Communication Lead**: external comm — update status page, notify customer, sync management. IC + tech tập trung giải vấn đề.
3. **Tech Lead**: technical investigation + fix. Organize team, report IC progress + solution.
:::

---

## 4. Alert escalation

Alert system = "mắt" của response. Quá ít = miss, quá nhiều = **alert fatigue** (mỗi ngày vài trăm alert, real important bị drown).

<AlertEscalationDemo />

::: tip 3-tier escalation
1. **L1 (first responder)**: alert trigger → notify on-call. 15 phút chưa ack → auto escalate.
2. **L2**: notify team lead + domain expert. 30 phút chưa mitigate → tiếp tục escalate.
3. **L3**: notify CTO + management, full emergency response.
:::

| Tier | Notify | SLA | Escalate condition |
|---------|---------|---------|---------|
| Warning | IM | Work hour | Không recover 30 phút |
| Critical | Phone + IM | Ack 15 phút | Không ack/mitigate |
| Fatal | Phone bombing + SMS | Respond 5 phút | Auto escalate management |

---

## 5. Postmortem: học từ fault

Sau recover, step quan trọng nhất = **postmortem**. Không phải đổ lỗi, mà tìm systemic improvement. Google, Meta, big tech theo "blameless postmortem" — focus "system sao cho phép error này", không "ai gây ra".

<PostmortemDemo />

::: tip "5 Whys"
Từ symptom, hỏi "why" liên tục đến root cause:
1. **Sao service chết?** → DB connection pool exhausted
2. **Sao pool exhausted?** → Slow query chiếm connection không release
3. **Sao có slow query?** → Thiếu index, full scan
4. **Sao thiếu index?** → New table launch không DBA review
5. **Sao không review?** → Không có SQL audit process

Root cause không phải "1 người quên add index", mà "thiếu SQL audit process". Fix root cause = prevent recurrence.
:::

---

## Tổng kết

Incident response = capability mọi team cần. Không phải individual hero, mà systematic process + role + improvement.

1. **Tier response**: P0~P4 đảm bảo respond đúng intensity
2. **Timeline rõ**: detect→respond→mitigate→resolve→postmortem
3. **Command**: IC + Comm + Tech split work, tránh chaos
4. **Alert escalation**: tier + auto escalate, đảm bảo key issue không sót
5. **Blameless postmortem**: 5 whys, focus system improvement

::: tip 2026 cho VN dev
- **Modern tools 2026**:
  - **PagerDuty**: incident management mainstream
  - **Opsgenie / FireHydrant**: alternative PagerDuty
  - **Rootly / incident.io**: GenAI-powered incident
  - **Datadog / New Relic Incident Intelligence**: AIOps detect anomaly
- **VN context**:
  - Banking VN có strict regulation về incident report (SBV)
  - E-commerce VN (Shopee, Tiki): mature SRE culture
  - Startup: dùng Sentry + Slack alert đủ
- **AI-era**:
  - **AIOps**: ML detect anomaly trước alert
  - **AI postmortem**: LLM draft postmortem từ logs + Slack
  - **ChatOps**: bot Slack chat-driven incident response
- **Bài tập**: chạy 1 chaos engineering exercise / quarter
:::

## Tài liệu

- [Google SRE Book - Managing Incidents](https://sre.google/sre-book/managing-incidents/)
- [PagerDuty Incident Response](https://response.pagerduty.com/)
- [Atlassian Incident Management](https://www.atlassian.com/incident-management)
- [Learning from Incidents](https://www.learningfromincidents.io/)
- [Chaos Engineering](https://www.oreilly.com/library/view/chaos-engineering/9781492043850/)
