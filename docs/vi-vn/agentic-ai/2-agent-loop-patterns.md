---
title: 'Chương 2 — Agent Loop & các Pattern chuẩn'
description: 'Vòng lặp agent, 4 agentic pattern của Andrew Ng và 5 workflow pattern của Anthropic — mỗi pattern kèm code Python chạy được + ví dụ Việt Nam. Lab ghép pattern cho bot Fanpage, debug, và bài tập thiết kế.'
---

# Chương 2 — Agent Loop & các Pattern chuẩn

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🔁</p>

::: tip 🔥 Thực chiến — 30 giây
Vì sao agent người ta "tự sửa khi sai" còn con bot của bạn thì **lặp vô tận**? Vì nó chạy đúng *vòng lặp* + đúng *pattern*. Chương này là bộ "chiêu thức" để đọc hiểu mọi hệ agent.
**💸 Ăn tiền ở đâu:** chọn đúng pattern = rẻ hơn 5–15× so với nhồi LLM bừa cho cùng một việc.
:::

> **Nắm vòng lặp + bộ pattern này, bạn có "từ vựng" để đọc hiểu *mọi* hệ thống agent — và quan trọng hơn: tự code được chúng.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Vẽ + code được **vòng lặp agent** có điều kiện dừng.
- Viết được **9 pattern** (4 của Ng + 5 của Anthropic) bằng Python — mỗi cái vài dòng.
- Ghép pattern thành một **bot Fanpage VN** thật.
- Nhận diện & **debug** khi áp pattern sai.
:::

> 📝 Code là pseudo-Python. **Quy ước:** `llm(...)` ở các pattern trả về **chuỗi**; riêng `llm(messages, tools=...)` trong *agent loop* (§01) trả về **object** có `.stop_reason`/`.tool_calls`. `llm_async(...)` = bản async của `llm`; `asyncio` = chạy song song (ráp ở [Chương 3](./3-build-first-agent.md)+).

---

## 01 · Trái tim: vòng lặp agent

Mọi agent chạy một vòng lặp. Anthropic (Claude Agent SDK) gói thành 4 nhịp:

::: tip 🔑 Gather → Act → Verify → Repeat
1. **Gather context** — search, đọc file, gọi API lấy thông tin.
2. **Take action** — gọi tool làm việc thật.
3. **Verify work** — đối chiếu kết quả với tiêu chí; tự sửa nếu sai.
4. **Repeat** — đến **điều kiện dừng**.
:::

Đây là phiên bản kỹ thuật của **ReAct** (Reasoning + Acting):

```
   ┌─────────────────────────────────────┐
   ▼                                     │
Thought  →  Action  →  Observation  ─────┘
(nghĩ)     (gọi tool)  (đọc kết quả)
   │
   └──► đủ thông tin? ──► Final Answer
```

```python
# Khung vòng lặp tối giản (sẽ dùng lại suốt module)
def agent_loop(user_msg, tools, max_turns=6):
    messages = [{"role": "user", "content": user_msg}]
    for _ in range(max_turns):                 # ← chốt chặn bắt buộc
        resp = llm(messages, tools=tools)
        if resp.stop_reason != "tool_use":     # LLM tự thấy xong
            return resp.text
        for call in resp.tool_calls:           # chạy tool LLM yêu cầu
            messages.append(run_tool(call))    # nối observation
    return "Đạt giới hạn lượt."                # ← exit an toàn
```

<AgentLoopDemo />

---

## 02 · 4 Agentic Pattern của Andrew Ng (kèm code)

Andrew Ng đúc kết **4 pattern** mà gần như mọi agent đều dùng. Mỗi pattern dưới đây có **1 ví dụ VN + code ngắn**.

### 1. Reflection (Tự soi)
Agent tự phê bình và sửa output của mình.
> 🇻🇳 *Viết caption bán hàng → tự chấm → viết lại hay hơn.*
```python
def write_with_reflection(sp):
    draft = llm(f"Viết caption bán {sp}")
    critique = llm(f"Chê thẳng caption này, chỉ ra 3 điểm yếu:\n{draft}")
    return llm(f"Viết lại khắc phục các điểm:\n{critique}\nBản cũ:\n{draft}")
```

### 2. Tool Use (Dùng công cụ)
LLM tự chọn hàm/API để gọi.
> 🇻🇳 *Hỏi "còn áo SKU A123 không?" → agent gọi `check_stock`.*
```python
resp = llm("Còn áo A123 không?", tools=[check_stock, lookup_price])
# LLM tự quyết gọi check_stock("A123") — bạn không hardcode
```

### 3. Planning (Lập kế hoạch)
LLM chia bài toán lớn thành các bước.
> 🇻🇳 *"Viết báo cáo thị trường trà sữa HN" → chia 4 bước rồi làm từng bước.*
```python
def plan_and_do(goal):
    steps = llm(f"Chia '{goal}' thành các bước, mỗi dòng 1 bước").split("\n")
    results = [llm(f"Thực hiện bước: {s}") for s in steps]
    return llm("Tổng hợp kết quả:\n" + "\n".join(results))
```

### 4. Multi-Agent (Phối hợp)
Nhiều agent chuyên biệt cộng tác (chi tiết [Chương 7](./7-multi-agent.md)).
> 🇻🇳 *Agent research + agent viết + agent biên tập = một "toà soạn mini".*

::: warning 💡 "Agentic = lặp đi lặp lại"
Khác biệt cốt lõi giữa "gọi LLM một phát" (zero-shot) và **agentic** là: agentic **lặp** — plan → act → reflect → dùng tool → lặp. Chính vòng lặp tạo chất lượng vượt trội. Ng xếp 4 pattern từ dễ (Reflection, Tool Use) → khó (Planning, Multi-Agent).
:::

<AgentPlanningDemo />

---

## 03 · 5 Workflow Pattern của Anthropic (kèm code + khi nào dùng)

Khi luồng **biết trước**, không cần agent động — ghép **workflow pattern**. 5 cái, độ tinh vi tăng dần.

### 1. Prompt Chaining — nối chuỗi
Chia việc thành chuỗi bước cố định; output bước trước là input bước sau. Có thể chèn **gate** kiểm tra.
```
Input → [LLM 1] → (gate?) → [LLM 2] → [LLM 3] → Output
```
```python
def dich_tai_lieu(text):
    draft = llm(f"Dịch sang tiếng Việt:\n{text}")
    if not thuat_ngu_ok(draft):                # gate
        draft = llm(f"Sửa thuật ngữ ngành cho đúng:\n{draft}")
    return llm(f"Trau chuốt văn phong tự nhiên:\n{draft}")
```
> **Dùng khi:** việc chia gọn thành bước cố định. 🇻🇳 *Dịch hợp đồng, viết bài chuẩn SEO nhiều bước.*

### 2. Routing — định tuyến
Phân loại input rồi đẩy tới handler chuyên biệt.
```
Input → [Classifier] ┬→ [Handler A] / B / C
```
```python
def route(msg):
    kind = llm(f"Phân loại 1 từ: GIA / TONKHO / SIZE / KHAC\n{msg}")
    return {"GIA": tra_gia, "TONKHO": tra_ton,
            "SIZE": tu_van_size}.get(kind, tra_loi_chung)(msg)
```
> **Dùng khi:** input có nhiều loại rõ rệt. 🇻🇳 *Phân loại tin nhắn Fanpage, ticket CSKH.*

### 3. Parallelization — song song
Chạy nhiều lời gọi cùng lúc. 2 biến thể:
```python
# Sectioning: chia phần độc lập, chạy song song
import asyncio
async def tom_tat_reviews(reviews):
    parts = await asyncio.gather(*[llm_async(f"Tóm tắt: {r}") for r in reviews])
    return llm("Tổng hợp insight:\n" + "\n".join(parts))

# Voting: cùng việc nhiều lần, lấy đa số (tăng độ tin cậy)
def kiem_duyet(comment):
    votes = [llm(f"Bình luận có vi phạm? yes/no\n{comment}") for _ in range(3)]
    return votes.count("yes") >= 2
```
> **Dùng khi:** cần tốc độ (sectioning) hoặc độ tin cậy (voting). 🇻🇳 *Tóm tắt 200 review, kiểm duyệt bình luận shop.*

### 4. Orchestrator-Workers — điều phối–thợ
Một LLM chia việc **động** (không biết trước) rồi giao cho worker, tổng hợp.
```python
def nghien_cuu(chu_de):
    cau_hoi = llm(f"Chia '{chu_de}' thành câu hỏi con").split("\n")  # ĐỘNG
    findings = [llm(f"Trả lời: {q}") for q in cau_hoi]
    return llm("Viết báo cáo từ:\n" + "\n".join(findings))
```
> **Dùng khi:** số/loại subtask **không đoán trước**. 🇻🇳 *Research đối thủ (số đối thủ tuỳ ngành).*

### 5. Evaluator-Optimizer — đánh giá–tối ưu
Một LLM tạo, một LLM **chấm** và phản hồi, lặp đến khi đạt.
```python
def viet_caption(sp, max_lan=3):
    draft = llm(f"Viết caption bán {sp}")
    for _ in range(max_lan):
        cham = llm(f"Chấm caption: trả 'ĐẠT' hoặc góp ý cụ thể.\n{draft}")
        if "ĐẠT" in cham:
            break
        draft = llm(f"Viết lại theo góp ý:\n{cham}\nBản cũ:\n{draft}")
    return draft
```
> **Dùng khi:** có tiêu chí đánh giá rõ + lặp lại thật sự cải thiện. 🇻🇳 *Viết caption/email bán hàng "đỉnh".*

<AgentWorkflowDemo />

---

## 04 · Ghép pattern: bot Fanpage shop quần áo (VN)

Hệ thật **ghép nhiều pattern**. Một bot Fanpage có thể là:

```
Tin nhắn khách
   └► [Routing] phân loại: GIÁ / TỒN / SIZE / KHÁC
         ├─ GIÁ/TỒN → [Tool Use] tra DB, trả lời (rẻ, chắc)
         ├─ SIZE   → [Planning] đọc số đo → gợi ý size
         │            └► [Reflection] tự kiểm "gợi ý có hợp lý?"
         └─ KHÁC   → chuyển nhân viên (human-in-the-loop)
```

```python
def fanpage_bot(msg):
    kind = llm(f"Phân loại: GIA/TON/SIZE/KHAC\n{msg}")        # Routing
    if kind in ("GIA", "TON"):
        return llm(msg, tools=[tra_gia, tra_ton])            # Tool Use
    if kind == "SIZE":
        goi_y = llm(f"Đọc số đo & gợi ý size:\n{msg}")        # Planning
        return llm(f"Kiểm tra gợi ý có hợp lý không, sửa nếu cần:\n{goi_y}")  # Reflection
    return chuyen_nhan_vien(msg)                              # Human handover
```

→ **Đừng học pattern như ô rời rạc — học để *ghép*.**

---

## 05 · 🧪 Lab: build "máy viết caption" (Evaluator-Optimizer + Voting)

::: tip Bài thực hành (45–60 phút) — code đầy đủ
Mục tiêu: một hàm nhận tên sản phẩm → trả caption bán hàng **đã qua tự chấm** + **chọn bản tốt nhất từ 3 bản**.
```python
def caption_xin(san_pham):
    # 1) VOTING: sinh 3 bản khác nhau
    drafts = [llm(f"Viết caption bán {san_pham}, giọng {tone}")
              for tone in ["năng động", "sang trọng", "thân thiện"]]

    # 2) EVALUATOR: chấm chọn bản tốt nhất theo rubric
    rubric = "Tiêu chí: hook mạnh, có CTA, đúng đối tượng, dưới 50 từ."
    best = llm(f"{rubric}\nChọn caption tốt nhất (chỉ trả nội dung):\n"
               + "\n---\n".join(drafts))

    # 3) OPTIMIZER: tinh chỉnh 1 vòng
    return llm(f"Trau chuốt thêm, giữ ý chính:\n{best}")

print(caption_xin("áo thun cotton form rộng"))
```
**Mở rộng:** thêm bước `gate` kiểm caption không chứa từ cấm (TPCN: "chữa/cam kết"); log mỗi bản nháp.
**Tiêu chí đạt:** chạy ra 1 caption, thấy rõ 3 pattern (voting → evaluator → optimizer) trong code.
:::

---

## 06 · Áp pattern SAI — lỗi thường gặp & debug

::: warning 🚨 4 lỗi điển hình
1. **Dùng orchestrator-workers cho việc biết trước** → tốn token vô ích. *Sửa:* nếu subtask cố định → parallelization/sectioning.
2. **Evaluator-optimizer không có điều kiện dừng** → lặp mãi, đốt tiền. *Sửa:* `max_lan` + tiêu chí "ĐẠT" rõ ràng (xem code mục 03).
3. **Routing với nhãn mơ hồ** ("loại 1/2/3") → classifier đoán bừa. *Sửa:* nhãn có nghĩa (GIA/TON/SIZE) + ví dụ mẫu trong prompt.
4. **Voting với số chẵn** (2 hoặc 4 phiếu) → hoà, không quyết được. *Sửa:* dùng số lẻ (3, 5).
:::

::: tip 🔬 Cách debug nhanh
- **In ra mọi bước trung gian** (draft, critique, route label) — đừng chỉ nhìn output cuối.
- Đếm **số lời gọi LLM** mỗi request — nếu nhiều bất thường → pattern sai hoặc thiếu điều kiện dừng.
:::

---

## 07 · 🧪 Bài tập thiết kế (map scenario VN → pattern)

> **Brief:** *"Quán cà phê muốn: (a) trả lời menu/giá, (b) tóm tắt 100 đánh giá Google mỗi tuần, (c) soạn bài post Facebook hằng ngày 'chuẩn gu quán'."*

Chọn pattern cho mỗi phần + lý do.

::: details 👉 Lời giải mẫu
- **(a) Menu/giá** → **Routing + Tool Use**: phân loại câu hỏi → tra bảng giá. Rẻ, chắc.
- **(b) Tóm tắt 100 review** → **Parallelization (sectioning)**: tóm tắt song song rồi tổng hợp. Nhanh.
- **(c) Soạn post "chuẩn gu"** → **Evaluator-Optimizer** (có rubric giọng quán) + có thể **Voting** chọn bản tốt nhất.
- *Lý do chung:* phần tất định → workflow pattern rẻ; phần cần chất lượng cao → vòng lặp tự chấm.
:::

---

## 08 · Kiểm tra nhanh

1. 4 nhịp của vòng lặp agent?
2. 4 agentic pattern của Ng?
3. Phân biệt 2 biến thể của Parallelization, mỗi cái dùng khi nào?
4. Khác biệt giữa parallelization và orchestrator-workers?
5. Vì sao Voting nên dùng số phiếu lẻ?

::: details 👉 Gợi ý đáp án
1. Gather → Act → Verify → Repeat.
2. Reflection, Tool Use, Planning, Multi-Agent.
3. Sectioning (chia phần độc lập — cần tốc độ); Voting (cùng việc nhiều lần — cần độ tin cậy).
4. Parallelization: subtask biết trước; Orchestrator-workers: LLM tự chia động.
5. Tránh hoà phiếu → luôn có đa số.
:::

---

## 09 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Vòng lặp: **gather → act → verify → repeat**, luôn có **điều kiện dừng**.
- **4 agentic pattern** (Ng) + **5 workflow pattern** (Anthropic) — bạn đã *code* được từng cái.
- Hệ thật **ghép** pattern (bot Fanpage). Bắt đầu đơn giản nhất.
- Áp sai pattern = tốn token/loop vô tận → debug bằng cách in bước trung gian.
:::

Hiểu lý thuyết + thấy code rồi — giờ tự tay ráp một agent loop **chạy thật**, không framework.

→ [**Chương 3 — Build agent đầu tiên từ số 0**](./3-build-first-agent.md)

---

<ChapterVideos :videos="[
  { id: 'CEvIs9y1uog', title: 'Don\'t Build Agents, Build Skills Instead – Barry Zhang & Mahesh Murag, Anthropic', channel: 'AI Engineer', why: 'Kỹ sư Anthropic bàn triết lý thiết kế agent + pattern skills/scaffolding. (2025, 1.4M view)' },
  { id: 'D7_ipDqhtwk', title: 'How We Build Effective Agents: Barry Zhang, Anthropic', channel: 'AI Engineer', why: 'Bản nói của tài liệu canonical — workflow vs agent + 5 pattern chuẩn. (2025)' }
]" />
