---
title: 'Chương 1 — Agent là gì: Workflow vs Agent'
description: 'Định nghĩa chuẩn AI agent theo Anthropic & OpenAI, đọc nhiều trace thực thi thật (cả trace lỗi), xem một tool call gửi gì xuống dây, so workflow vs agent bằng pseudo-code, giải phẫu một agent thật, thang tự chủ L0–L5, kinh tế token, và 2 walkthrough quyết định.'
---

# Chương 1 — Agent là gì?

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🧭</p>

::: tip 🔥 Thực chiến — 30 giây
Khách nhắn shop 11h đêm: *"Đơn 1234 tới đâu? Chưa giao thì hủy giúp."* — **Chatbot:** "Dạ liên hệ tổng đài 1900…" → mất đơn. **Agent:** tự tra → thấy chưa giao → tự hủy → "Đã hủy, hoàn tiền 3 ngày nhé ạ."
**💸 Ăn tiền ở đâu:** con bot biết *làm* (không chỉ nói) thay được 1 nhân viên trực chat — bán cho SME ra tiền thật.
:::

> **"Mọi người gọi mọi thứ có nhét LLM vào là 'agent'.**
> **Nhưng 90% trong số đó không phải agent — và biết phân biệt là bài học đắt giá nhất chương này."**

::: tip 🎯 Sau chương này bạn sẽ **làm được** (không chỉ "biết")
- **Phân loại** bất kỳ hệ thống AI nào vào đúng ô: chatbot / function-calling / workflow / agent — và nói được *vì sao*.
- **Đọc hiểu trace thực thi** của agent: từng vòng lặp, từng tool call, từng quyết định — kể cả **trace lỗi**.
- **Biết một tool call thật gửi gì** xuống dây (JSON), để hết "ảo thuật".
- **Viết pseudo-code** phân biệt workflow và agent cho *cùng* bài toán.
- **Định lượng** đánh đổi token/độ trễ/rủi ro của agent vs workflow.
- **Ra quyết định kiến trúc** cho một brief thật — kể cả khi câu trả lời đúng là *"không cần agent"*.
:::

Đây là chương nền, hơi dài. Nắm chắc nó, 11 chương sau nhẹ hẳn.

---

## 01 · Khởi đầu từ một hiểu lầm tốn tiền

Năm 2025–2026, từ "agent" bị lạm dụng đến mức gần vô nghĩa:

- Một chatbot FAQ → "AI agent".
- Một script gọi API thời tiết → "AI agent".
- Một workflow n8n có node OpenAI → "AI agent".

Hệ quả **không** chỉ là chữ nghĩa — nó dẫn tới quyết định kỹ thuật sai, tốn tiền thật:

| Hiểu sai | Hậu quả thực tế |
|---|---|
| Gọi workflow là "agent" → build bằng vòng lặp LLM tự do | Đắt gấp 5–15 lần, khó đoán, khó debug, khi đáng lẽ chỉ cần `if-else` |
| Tưởng agent "thông minh hơn" → dùng cho việc tất định | Bug khó tái hiện, khách mất tiền, mất niềm tin |
| Không phân biệt được → mua nhầm giải pháp | Trả phí cho thứ không giải đúng bài toán |

→ Cần một định nghĩa **sắc như dao**.

---

## 02 · Định nghĩa chuẩn (và mổ xẻ từng vế)

Hai nguồn canonical nhất của ngành định nghĩa gần như trùng nhau:

::: tip 🔑 Định nghĩa
> **Anthropic** (*Building Effective Agents*): Agent là hệ thống trong đó **LLM tự điều khiển tiến trình và cách dùng tool của chính nó**.

> **OpenAI** (*A Practical Guide to Building Agents*): Agent là hệ thống **tự mình hoàn thành nhiệm vụ thay cho bạn**.
:::

Một agent có **2 đặc điểm cốt lõi**. Mổ xẻ — vì đây là chỗ phần lớn người học hiểu hời hợt:

### Đặc điểm 1 — LLM điều khiển *luồng thực thi* (control flow)

"Control flow" = thứ tự các bước + rẽ nhánh + điều kiện lặp/dừng. Phần mềm truyền thống: **lập trình viên** viết (`if`, `for`, `while`). Agent: **LLM** quyết ở runtime —
- tự nhận biết **khi nào xong** (không cần code điều kiện dừng cứng),
- tự **sửa sai** khi một bước thất bại,
- biết **dừng, trả quyền cho người** khi bế tắc.

### Đặc điểm 2 — LLM dùng *tool* để tác động thế giới thật

- LLM **tự chọn** tool nào tuỳ tình huống (không hardcode "bước 3 luôn gọi API X"),
- luôn trong **hàng rào an toàn (guardrails)** ([Chương 11](./11-safety-guardrails.md)).

::: warning 💡 Câu hỏi vàng — học thuộc
**"LLM có đang điều khiển *luồng đi* của hệ thống không?"**
- **Không** → app có LLM (chatbot, classifier, workflow). Không phải agent.
- **Có** → agent.
:::

---

## 03 · "LLM điều khiển luồng" trông như thế nào? — đọc trace thật

Đây là chỗ bạn thật sự *hiểu*. Theo dõi một agent giải bài toán, **từng vòng lặp**.

**Bài toán:** *"Đơn #1234 của tôi tới đâu rồi? Nếu chưa giao thì hủy giúp mình."*
**Agent có 3 tool:** `lookup_order(id)`, `cancel_order(id)`, và trả lời.

```
┌─ VÒNG 1 ─────────────────────────────────────────────┐
│ 💭 Thought: Cần biết trạng thái đơn #1234 trước.       │
│            Chưa có dữ liệu → gọi tool tra cứu.         │
│ 🔧 Action:  lookup_order(id="1234")                   │
│ 👁️ Observation: { status: "đang đóng gói",           │
│                   shipped: false }                    │
└───────────────────────────────────────────────────────┘
        │  (LLM đọc observation → quyết bước tiếp)
        ▼
┌─ VÒNG 2 ─────────────────────────────────────────────┐
│ 💭 Thought: Đơn CHƯA giao (shipped=false). Khách yêu   │
│            cầu hủy nếu chưa giao → điều kiện đúng.     │
│ 🔧 Action:  cancel_order(id="1234")                   │
│ 👁️ Observation: { ok: true, refund: "hoàn trong 3 ngày" }│
└───────────────────────────────────────────────────────┘
        ▼
┌─ VÒNG 3 ─────────────────────────────────────────────┐
│ 💭 Thought: Đã hủy + có thông tin hoàn tiền. Đủ để trả │
│            lời. Không cần tool nữa.                    │
│ ✅ Final:   "Đơn #1234 đang đóng gói (chưa giao) nên   │
│             mình đã hủy giúp bạn. Tiền hoàn ~3 ngày."  │
└───────────────────────────────────────────────────────┘
        (stop_reason ≠ tool_use → THOÁT vòng lặp)
```

::: tip 🔑 3 điều chứng minh "LLM điều khiển luồng"
1. **Không ai code "nếu shipped=false thì cancel".** *LLM* tự suy ra rẽ nhánh ở Vòng 2 từ yêu cầu người dùng.
2. **Số vòng lặp không biết trước** — câu này 3 vòng, câu khác có thể 1 hoặc 6.
3. Agent **tự quyết khi nào dừng** (Vòng 3 không gọi tool nữa).
:::

### 03b · Trace #2 — *cùng agent*, input khác → luồng rẽ khác

Đây là điều một workflow cố định không làm được. **Cùng agent đó**, nhưng đơn **đã giao**:

```
┌─ VÒNG 1 ─────────────────────────────────────────────┐
│ 🔧 lookup_order(id="1234")                            │
│ 👁️ { status: "đang giao", shipped: true }            │
└───────────────────────────────────────────────────────┘
        ▼
┌─ VÒNG 2 ─────────────────────────────────────────────┐
│ 💭 Thought: shipped=true → KHÔNG hủy được. Không gọi   │
│            cancel_order. Phải giải thích cho khách +   │
│            gợi ý phương án (đổi/trả khi nhận).         │
│ ✅ Final:   "Đơn đang trên đường giao nên không hủy   │
│             được ạ. Khi nhận, bạn có thể từ chối nhận  │
│             hoặc liên hệ đổi/trả trong 7 ngày nhé."    │
└───────────────────────────────────────────────────────┘
```

→ **Chỉ 2 vòng, KHÔNG gọi `cancel_order`.** LLM tự đọc `shipped=true` và đổi hẳn kế hoạch. *Cùng một agent, hai trajectory hoàn toàn khác* — tuỳ dữ liệu runtime. Đó chính là "động".

---

## 04 · Nhìn xuống dây: một tool call thật gửi gì?

"LLM gọi tool" nghe huyền bí, nhưng bên dưới chỉ là **JSON đi qua lại**. Hết ảo thuật khi bạn thấy nó. Ở Vòng 1 phía trên, đây là thứ thật sự xảy ra:

**Bước A — LLM *không* tự chạy hàm. Nó trả về một "ý định gọi tool":**
```json
// Phản hồi của LLM (assistant) — chỉ là DATA, chưa có gì chạy
{
  "role": "assistant",
  "stop_reason": "tool_use",
  "content": [
    { "type": "text", "text": "Để mình tra đơn của bạn." },
    { "type": "tool_use",
      "id": "call_01",
      "name": "lookup_order",
      "input": { "id": "1234" } }      // ← LLM tự điền tham số
  ]
}
```

**Bước B — CODE CỦA BẠN đọc `tool_use`, chạy hàm thật, rồi gửi kết quả lại:**
```json
// Bạn nối message kế tiếp với kết quả (observation)
{
  "role": "user",
  "content": [
    { "type": "tool_result",
      "tool_use_id": "call_01",        // ← khớp với id ở trên
      "content": "{ \"status\": \"đang đóng gói\", \"shipped\": false }" }
  ]
}
```

**Bước C — gửi cả lịch sử lại cho LLM → nó sinh Vòng 2.** Lặp đến khi `stop_reason ≠ "tool_use"`.

::: warning 💡 3 hiểu lầm tan biến khi thấy JSON này
1. **LLM không tự chạy code.** Nó chỉ *nói* "tôi muốn gọi `lookup_order("1234")`". **Code của bạn** mới chạy hàm → đây là chỗ bạn gắn guardrail/xác nhận ([Chương 11](./11-safety-guardrails.md)).
2. **"Observation" chỉ là một message** bạn nối vào — không có gì kỳ bí.
3. **Vòng lặp = bạn gửi lại lịch sử nhiều lần.** Vì vậy context phình dần ⇒ token lũy tiến (mục 10).
:::

> Bạn sẽ tự viết vòng lặp này bằng code thật ở [Chương 3](./3-build-first-agent.md).

---

## 05 · Workflow vs Agent bằng pseudo-code (cùng bài toán)

Nhìn khác biệt *trong code*. Cùng bài "tra đơn + hủy nếu chưa giao":

### Phiên bản WORKFLOW (lập trình viên viết luồng)
```python
def handle_request(order_id, intent):
    order = lookup_order(order_id)        # bước 1: cố định
    if intent == "cancel":                # nhánh: NGƯỜI viết sẵn
        if not order["shipped"]:          # điều kiện: NGƯỜI viết sẵn
            cancel_order(order_id)
            return "Đã hủy, hoàn tiền 3 ngày."
        return "Đơn đã giao, không hủy được."
    return f"Đơn đang {order['status']}."
```
→ **Mọi rẽ nhánh do bạn viết.** Ổn định, rẻ, dễ test. Nhưng khách hỏi kiểu lạ ("đổi địa chỉ giao luôn") → **không xử lý được**, phải viết thêm nhánh.

### Phiên bản AGENT (LLM viết luồng ở runtime)
```python
def handle_request(user_message):
    messages = [{"role": "user", "content": user_message}]
    while True:                              # số bước KHÔNG biết trước
        resp = llm(messages, tools=[lookup_order, cancel_order])
        if resp.stop_reason != "tool_use":   # LLM tự quyết khi nào dừng
            return resp.text
        for call in resp.tool_calls:         # LLM tự chọn tool & tham số
            messages.append(run_tool(call))
```
→ **Không có `if intent == cancel`.** LLM tự suy ra từ ngôn ngữ tự nhiên. Có tool `update_address` → agent tự dùng khi khách đổi địa chỉ, **không cần viết thêm nhánh**.

::: warning 💡 Ranh giới cốt lõi
**Workflow đẩy độ phức tạp vào *code bạn viết*; agent đẩy nó vào *quyết định của LLM ở runtime*.** Agent linh hoạt hơn — nhưng vì LLM phi tất định, nó khó đoán và tốn token hơn (mục 10).
:::

---

## 06 · Đọc một trace LỖI (kỹ năng sống còn)

Agent thật **không phải lúc nào cũng chạy đẹp**. Biết đọc trace lỗi = biết debug. Đây là một ca hỏng kinh điển — agent **lặp vô ích** vì observation mơ hồ:

```
User: "Hủy đơn 1234 giúp mình"
┌─ VÒNG 1 ─ 🔧 cancel_order(id="1234")
│           👁️ { error: "failed" }          ← lỗi KHÔNG nói vì sao
├─ VÒNG 2 ─ 💭 "Có lẽ trục trặc tạm thời, thử lại."
│           🔧 cancel_order(id="1234")
│           👁️ { error: "failed" }
├─ VÒNG 3 ─ 🔧 cancel_order(id="1234")  ← LẶP, không tiến triển
│           👁️ { error: "failed" }
│           ... (lặp đến max_turns) → tốn token, vô dụng
└─ ⛔ Chạm max_turns → thoát
```

::: tip 🔬 Chẩn đoán: lỗi nằm ở đâu?
**Không phải lỗi "model ngu".** Đây là **lỗi thiết kế tool** ([Chương 4](./4-tool-design.md)):
- `{ error: "failed" }` không cho agent biết *vì sao* → nó không có cơ sở để đổi hành động → lặp.
- **Sửa:** error message phải "chỉ đường":
  `{ error: "Đơn đã giao, không thể hủy. Gợi ý khách dùng đổi/trả." }`
- Khi đó agent đọc được nguyên nhân → đổi kế hoạch (giải thích cho khách) thay vì lặp.

**Bài học:** phần lớn "agent ngu" thực ra là **tool tệ / context tệ / thiếu chốt chặn**, không phải model. Đây là lý do [Chương 4](./4-tool-design.md), [5](./5-context-engineering.md), [10](./10-evaluation-observability.md) tồn tại.
:::

3 dạng lỗi trace hay gặp — tập nhận diện:

| Dạng lỗi | Dấu hiệu trong trace | Gốc rễ |
|---|---|---|
| **Lặp vô ích** | Gọi 1 tool nhiều lần, observation y hệt | Error message không "chỉ đường" |
| **Chọn nhầm tool** | Gọi tool không liên quan câu hỏi | Tool chồng lấn / mô tả mơ hồ |
| **Bịa (hallucinate)** | Trả lời tự tin nhưng không khớp observation | Thiếu ràng buộc/structured output |

---

## 07 · Phổ "agenticness": 4 nấc

"Có phải agent không?" là một **phổ**. Càng sang phải, LLM càng nắm nhiều quyền:

| | **Chatbot** | **Function-calling** | **Workflow** | **Agent** |
|---|---|---|---|---|
| LLM làm gì | Sinh văn bản | Gọi 1 tool/lượt | Điền vào bước **người** dựng | **Tự quyết** bước & tool |
| Ai quyết luồng | — | Lập trình viên | Lập trình viên | **LLM** |
| Vòng lặp | Không | 1 nhịp | Graph cố định | **Loop động** |
| Đoán trước | Cao | Cao | Cao | Thấp hơn |
| Chi phí | Thấp | Thấp | Thấp–vừa | Cao hơn |
| Ví dụ | FAQ | "Thời tiết HN?"→API | Tóm tắt→dịch→gửi mail | "Đặt lịch công tác" |

**Bài học:** đừng mặc định nhảy sang cột phải. Phần lớn bài toán dừng ở **workflow** là tối ưu.

---

## 08 · Viên gạch nền: Augmented LLM (mổ xẻ)

Mọi agent xây từ **augmented LLM** — LLM được tăng cường 3 thứ:

```
Augmented LLM = Model + Tools + Memory + Retrieval
```

| Thành phần | LLM điều khiển nó thế nào | Ví dụ |
|---|---|---|
| **Retrieval** | Tự sinh truy vấn để lấy thông tin | Hỏi chính sách đổi trả → tự tạo query → tra KB |
| **Tools** | Tự chọn & gọi hàm/API | Tự quyết `lookup_order` hay `check_stock` |
| **Memory** | Tự quyết giữ gì qua nhiều lượt | Nhớ "khách thích size M" |

Cả ba **do LLM chủ động điều khiển**. Việc của bạn: cung cấp **giao diện tốt** — Anthropic gọi là **ACI (Agent–Computer Interface)** ([Chương 4](./4-tool-design.md)).

<AgentArchitectureDemo />

---

## 09 · Thang tự chủ L0–L5 (kèm sản phẩm thật)

Mức "tự lái" là thang bậc (mô phỏng xe tự lái). Nhớ theo **vai trò con người**:

| Cấp | Con người là | Agent làm gì | Ví dụ thật |
|---|---|---|---|
| **L0** | Vận hành | Không agent — script cố định | Macro Excel, Zapier nhánh cứng |
| **L1** | Vận hành | LLM + tool, gọi theo lệnh | ChatGPT gọi 1 plugin khi bạn bảo |
| **L2** | **Cộng tác viên** | Tự lập kế hoạch, người giám sát sát | Cursor/Claude Code, bạn duyệt từng diff |
| **L3** | **Cố vấn** | Tự chạy, hỏi ở checkpoint | Agent research dừng xin xác nhận |
| **L4** | **Người duyệt** | Tự chủ phần lớn, duyệt việc rủi ro | Coding agent chạy hàng giờ, review PR cuối |
| **L5** | **Quan sát** | Tự chủ dài hạn, chỉ xem log | Hiếm trong production 2026 |

<AgentLevelDemo />

::: warning ⚠️ "Cấp cao hơn" KHÔNG phải "tốt hơn"
Cấp tự chủ phải **khớp rủi ro**. Agent kế toán đụng tiền nên ở **L2–L3** (người duyệt mọi giao dịch), không phải L5. Câu hỏi đúng: *"sai một lần thì hậu quả tới đâu?"* — rủi ro càng cao càng kéo về L2–L3.
:::

### 09b · Giải phẫu một agent thật: Claude Code

Ghép khung trên vào một sản phẩm bạn có thể đã dùng — **Claude Code** (coding agent):

| Mảnh khung | Trong Claude Code |
|---|---|
| **Model** | Claude (Sonnet/Opus) làm "bộ não" |
| **Tools** | `read_file`, `write_file`, `bash`, `grep`, `edit`... |
| **Retrieval** | "Agentic search" — tự chạy `grep`/`find` để đọc đúng file cần |
| **Memory** | `CLAUDE.md` (hướng dẫn dự án) + lịch sử phiên |
| **Vòng lặp** | gather (đọc code) → act (sửa/chạy) → verify (chạy test) → lặp |
| **Cấp tự chủ** | **L2** mặc định (bạn duyệt mỗi thay đổi) → **L4** nếu bật quyền tự chạy |
| **Guardrail** | Hỏi xác nhận trước lệnh nguy hiểm; sandbox |

→ Khi bạn nhìn *bất kỳ* sản phẩm agent nào (Devin, Cursor, Manus), hãy map vào khung này — bạn sẽ hiểu ngay nó làm gì và ở cấp tự chủ nào.

---

## 10 · Cái giá của agent: token, độ trễ, rủi ro

Lý do #1 khiến "đừng vội build agent". Con số (định tính, lấy trực giác):

| Tiêu chí | Workflow | Agent |
|---|---|---|
| **Số lời gọi LLM** | 0–1 | **N vòng** (mỗi vòng ≥1) |
| **Token** | Thấp, đoán được | Cao — mỗi vòng nạp lại lịch sử + định nghĩa tool |
| **Độ trễ** | 1 nhịp | Cộng dồn (3 vòng ≈ 3×) |
| **Đoán trước** | Cao | Thấp |
| **Chi phí debug** | Thấp | Cao — phải đọc cả *trajectory* ([Chương 10](./10-evaluation-observability.md)) |

::: tip 💸 Vì sao token "lũy tiến"
Mỗi vòng, agent gửi lại **toàn bộ** message history + định nghĩa tool. Vòng 5 đắt hơn vòng 1 vì context đã phình. Đây là lý do [Context Engineering (Chương 5)](./5-context-engineering.md) + prompt caching tồn tại. Agent 6 vòng có thể tốn 5–10× một workflow giải cùng việc.
:::

→ **Kết luận:** agent đáng dùng khi *giá trị linh hoạt > cái giá token/độ trễ/rủi ro*.

---

## 11 · Khi nào NÊN build agent? (3 dấu hiệu + phản ví dụ)

Ẩn dụ OpenAI: hệ quy tắc giống **checklist**; agent giống **điều tra viên dày dạn**. Chỉ "thuê điều tra viên" khi "checklist" không kham nổi.

::: tip ✅ Dấu hiệu 1 — Quyết định phức tạp, nhiều ngoại lệ
- ✅ **Nên:** Duyệt hoàn tiền — cân nhắc lịch sử khách, lý do, chính sách, ngoại lệ.
- ❌ **Không:** Hoàn tiền khi "đơn < 24h và chưa giao" → quy tắc rõ, dùng `if`.
:::
::: tip ✅ Dấu hiệu 2 — Bộ quy tắc khó bảo trì
- ✅ **Nên:** Review bảo mật nhà cung cấp — hàng trăm quy tắc đan xen.
- ❌ **Không:** Định tuyến 3 loại ticket → routing workflow đủ ([Chương 2](./2-agent-loop-patterns.md)).
:::
::: tip ✅ Dấu hiệu 3 — Phụ thuộc nhiều vào dữ liệu phi cấu trúc
- ✅ **Nên:** Đọc hồ sơ bảo hiểm (PDF tự do, ảnh) → cần hiểu + phán đoán.
- ❌ **Không:** Đọc một field JSON cố định → parse thẳng.
:::
::: warning 🚫 DỨT KHOÁT đừng dùng agent khi
- Luồng **biết trước, ổn định** → workflow rẻ và chắc hơn.
- Giải được bằng **quy tắc tất định** đơn giản → `if-else`.
- Sai sót **không được phép** và **không có người duyệt** → rủi ro quá cao.
> *"Nếu một giải pháp tất định là đủ — thì nó là lựa chọn đúng."*
:::

---

## 12 · Walkthrough #1: ca NÊN dùng agent (lai)

> **"Build hệ tự trả lời tin nhắn Fanpage shop quần áo: giá, còn hàng, tư vấn size."**

Chạy khung quyết định:
1. **Bước biết trước?** → Câu hỏi rơi vào 3 nhóm (giá / tồn / size). Khá đoán được.
2. **Cần phán đoán linh hoạt runtime?** → Tư vấn size cần đọc "mình cao 1m60 nặng 55kg" → có yếu tố phi cấu trúc.
3. **Sai sót tới đâu?** → Sai giá/tồn gây mất đơn, nhưng *không* đụng tiền/không đảo ngược.

**Thiết kế (cân bằng, không cực đoan):**
- Giá & tồn kho → **function-calling/workflow** (tra DB) — rẻ, chắc.
- Tư vấn size → **một agent nhỏ** (đọc mô tả → suy luận → gợi ý), **người duyệt** khi chốt đơn lớn.
- Toàn hệ → **workflow điều phối** gọi agent size khi cần (kiến trúc lai — [Chương 12](./12-apply-vn-roadmap.md)).

→ **Training thật: không phải "agent hay không", mà chọn *đúng nấc cho từng phần*.**

### 12b · Walkthrough #2: ca câu trả lời đúng là "KHÔNG cần agent"

> **"Mỗi sáng tổng hợp doanh số hôm qua từ Google Sheet → gửi báo cáo lên Slack."**

Chạy khung:
1. **Bước biết trước?** → Có: đọc Sheet → tính tổng/so cùng kỳ → format → gửi Slack. **Cố định hoàn toàn.**
2. **Cần phán đoán linh hoạt?** → Không. Phép biến đổi giống nhau mỗi ngày.
3. **Dữ liệu phi cấu trúc?** → Không. Bảng số có cấu trúc.

**Kết luận: WORKFLOW thuần (n8n/cron + 1 lời gọi LLM tuỳ chọn để viết câu tóm tắt).** Dùng agent ở đây là **over-engineer** — đắt hơn, kém ổn định, không thêm giá trị.

::: tip 🔑 Vì sao ca này quan trọng
Một kỹ sư agent giỏi được trả tiền **để biết khi nào KHÔNG dùng agent**. "Đừng vội build agent" không phải khẩu hiệu — nó là kỷ luật.
:::

---

## 13 · Các kiểu "build sai" thường gặp

::: warning 🚨 4 thất bại điển hình
1. **Agent hoá một workflow** → "Sao bot lúc đúng lúc sai?" Vì để LLM quyết thứ đáng lẽ cố định. Sửa: kéo phần tất định về `if-else`.
2. **Workflow hoá một agent** → "Sao bot không xử lý nổi câu lạ?" Vì cố liệt kê mọi nhánh cho việc vốn mở. Sửa: cho LLM quyền quyết + tool.
3. **Nhồi quá nhiều tool** → chọn nhầm tool. Sửa: 2–4 tool, mô tả rõ ([Chương 4](./4-tool-design.md)).
4. **Quên chốt chặn** → loop vô tận, cháy credit. Sửa: luôn có max_turns + spend cap ([Chương 3](./3-build-first-agent.md), [11](./11-safety-guardrails.md)).
:::

---

## 14 · 🧪 Bài tập phân loại (có lời giải)

Mỗi ca: **Chatbot / Function-calling / Workflow / Agent?** và **vì sao**. Tự làm trước.

1. Bot trả lời "Shop mở cửa mấy giờ?"
2. "Tỉ giá USD hôm nay?" → gọi 1 API → trả lời.
3. Mỗi đơn mới: tạo hoá đơn → gửi email → cập nhật Sheet (cố định).
4. "Nghiên cứu 5 đối thủ rồi viết SWOT" — tự tìm, đọc, tổng hợp.
5. Đọc CV (PDF tự do), tự quyết hỏi thêm gì, chấm điểm, đề xuất lịch.
6. "Đặt giúp chuyến công tác HN tuần sau, ngân sách 5tr" — tra vé, so giá, đặt, xử lý hết phòng.

::: details 👉 Lời giải chi tiết
1. **Chatbot** — chỉ sinh văn bản, không tool.
2. **Function-calling** — 1 tool, 1 nhịp, luồng cố định.
3. **Workflow** — bước biết trước, người dựng graph. Đừng gọi "agent" dù có node AI.
4. **Agent** — luồng mở, LLM tự quyết tìm/đọc/tổng hợp. Số bước không biết trước.
5. **Agent** — đủ 3 dấu hiệu: PDF phi cấu trúc + quyết định linh hoạt + nhiều ngoại lệ.
6. **Agent** — nhiều bước phụ thuộc kết quả trước (hết phòng → đổi → so lại). Bước "đặt" (tiêu tiền) cần **người duyệt** (L3).
:::

### 14b · 🧪 Bài tập THIẾT KẾ (sketch kiến trúc)

> **Brief:** *"Phòng khám nha khoa muốn tự động: (a) trả lời giá dịch vụ, (b) đặt lịch hẹn, (c) nhắc bệnh nhân trước 1 ngày."*

Hãy phác: mỗi phần là **chatbot / function-calling / workflow / agent**? Cần **tool** gì? **Cấp tự chủ** nào? Chỗ nào cần **người duyệt**?

::: details 👉 Lời giải mẫu (một cách hợp lý)
- **(a) Trả lời giá** → **function-calling/RAG**: tra bảng giá → trả lời. Rẻ, chắc. Không cần agent.
- **(b) Đặt lịch** → **agent nhỏ (L2–L3)**: cần đối thoại linh hoạt ("còn slot chiều thứ 5 không?", "đổi sang sáng thứ 6"), tool `check_slots`, `book_slot`. **Người duyệt/xác nhận** trước khi chốt (tránh đặt nhầm).
- **(c) Nhắc hẹn** → **workflow thuần (cron)**: mỗi ngày quét lịch mai → gửi SMS/Zalo. Cố định, không cần agent.
- **Toàn hệ** → **workflow điều phối** + 1 agent đặt lịch. Kiến trúc lai.
- **Guardrail:** không để agent tự huỷ/đổi lịch của người khác; xác thực bệnh nhân trước khi thao tác.

*Không có một đáp án "đúng duy nhất" — quan trọng là lập luận: phần nào tất định → workflow; phần nào cần phán đoán → agent + đúng cấp tự chủ + người duyệt việc hệ trọng.*
:::

---

## 15 · Hiểu lầm thường gặp

::: warning 🚨 5 ngộ nhận
1. **"Có LLM = agent"** → Sai. Phải có LLM *điều khiển luồng*.
2. **"Agent luôn tốt hơn workflow"** → Sai. Agent đắt hơn, khó đoán hơn.
3. **"Multi-agent xịn hơn single"** → Chưa chắc. Tốn ~15x token ([Chương 7](./7-multi-agent.md)).
4. **"Càng nhiều tool càng mạnh"** → Sai. Tool chồng lấn → chọn nhầm ([Chương 4](./4-tool-design.md)).
5. **"Tự chủ cao = mục tiêu"** → Sai. Phải khớp rủi ro.
:::

---

## 16 · Kiểm tra nhanh

1. Câu hỏi *một* để biết thứ gì đó có phải agent?
2. Trong trace mục 03, điều gì chứng minh "LLM điều khiển luồng"?
3. Trong JSON mục 04, ai *thật sự* chạy hàm — LLM hay code của bạn?
4. Đọc trace lỗi mục 06: agent lặp vô ích, gốc rễ ở đâu?
5. Map Claude Code: "agentic search" tương ứng thành phần nào của augmented LLM?
6. Ca "nhắc hẹn mỗi sáng" nên là gì, vì sao?

::: details 👉 Gợi ý đáp án
1. "LLM có điều khiển *luồng thực thi* không?"
2. Không ai code "nếu shipped=false thì cancel"; số vòng không cố định; agent tự dừng.
3. **Code của bạn** chạy hàm. LLM chỉ trả về *ý định* `tool_use`.
4. Error message không "chỉ đường" (`{error:"failed"}`) → agent không biết vì sao → lặp. Sửa tool, không phải đổi model.
5. **Retrieval** (tự sinh truy vấn để lấy đúng thông tin cần).
6. **Workflow thuần (cron)** — bước cố định, không cần phán đoán → agent là over-engineer.
:::

---

## 17 · 📒 Thuật ngữ chương này

| Thuật ngữ | Nghĩa nhanh |
|---|---|
| **Control flow** | Thứ tự bước + rẽ nhánh + điều kiện lặp/dừng |
| **Agent** | Hệ mà *LLM* điều khiển control flow + dùng tool |
| **Workflow** | Hệ mà *lập trình viên* viết control flow |
| **Augmented LLM** | Model + Tools + Memory + Retrieval |
| **ACI** | Agent–Computer Interface: lớp giao tiếp agent↔tool |
| **tool_use / tool_result** | Ý định gọi tool (LLM) / kết quả tool (code bạn) |
| **Trace / Trajectory** | Bản ghi từng vòng lặp + tool call |
| **Exit condition** | Điều kiện dừng (xong/lỗi/max turns) |
| **L0–L5** | Thang tự chủ, theo vai trò con người |

---

## 18 · Tóm tắt & đọc tiếp

::: tip 📌 6 điều mang theo
1. Agent = **LLM điều khiển luồng** + **dùng tool**. Câu hỏi vàng: *"LLM có quyết luồng không?"*
2. Bạn đã **đọc 3 trace** (2 thành công rẽ khác nhau + 1 lỗi) và biết **chẩn đoán**.
3. Một tool call chỉ là **JSON** — LLM nêu *ý định*, **code bạn** mới chạy hàm.
4. **Augmented LLM** = model + tools + memory + retrieval; map được vào sản phẩm thật (Claude Code).
5. Agent **đắt hơn** (token/độ trễ/rủi ro) → chỉ dùng khi linh hoạt đáng giá.
6. Thực chiến = chọn **đúng nấc cho từng phần**; đôi khi câu trả lời đúng là **"không cần agent"**.
:::

→ [**Chương 2 — Agent Loop & các Pattern chuẩn**](./2-agent-loop-patterns.md)

---

<ChapterVideos :videos="[
  { id: 'EDb37y_MhRw', title: 'Generative vs Agentic AI: Shaping the Future of AI Collaboration', channel: 'IBM Technology', why: 'Phân biệt rõ AI sinh nội dung vs AI agent — câu hỏi nền tảng của chương. (2025, 1.2M view)' },
  { id: 'VSFuqMh4hus', title: '7 AI Terms You Need to Know: Agents, RAG, ASI & More', channel: 'IBM Technology', why: 'Định nghĩa “agent” cùng bộ từ vựng xung quanh, dễ vào cho người mới. (2025, 1.2M view)' }
]" />
