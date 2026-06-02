---
title: 'Chương 3 — Build agent đầu tiên từ số 0'
description: 'Tự viết agent loop bằng Python chạy thật (không framework): function calling, structured output, điều kiện dừng. Code đầy đủ giải thích từng dòng, bảng lỗi thường gặp + cách debug, và dự án Helpdesk Agent cho shop Việt Nam.'
---

# Chương 3 — Build agent đầu tiên từ số 0

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🛠️</p>

::: tip 🔥 Thực chiến — 30 giây
Hết lý thuyết. Mở terminal, gõ ~40 dòng Python → một con agent tự tra đơn + tồn kho cho shop, **chạy thật**, không framework, không cần nền ML.
**💸 Ăn tiền ở đâu:** đây là MVP bạn demo cho khách để chốt deal đầu tiên.
:::

> **"Loop-first, framework-second."**
> **Mọi khoá agent nghiêm túc đều bắt bạn viết tay vòng lặp trước. Vì framework giấu mất cơ chế — mà cơ chế mới là thứ bạn cần.**

::: tip 🎯 Sau chương này bạn sẽ **có một agent chạy thật**
- Cài môi trường + key, xác minh chạy được.
- Viết **agent loop hoàn chỉnh** bằng Python thuần (copy-paste chạy).
- Hiểu **từng dòng** làm gì.
- **Debug** 6 lỗi người mới hay gặp.
- Nâng thành **Helpdesk Agent cho shop VN** (đa tool, multi-turn).
:::

---

## 01 · Vì sao build tay trước?

Cộng đồng (Anthropic, 12-Factor Agents, r/AI_Agents) đồng thuận: framework (LangGraph/CrewAI) **rất hữu ích — nhưng sau khi bạn hiểu vòng lặp**. Build tay một lần giúp bạn:
- Thấy **gather → act → verify → repeat** là code thật, không phải phép màu.
- **Debug** được khi agent "hành xử lạ".
- Không bị khoá vào abstraction của framework.

---

## 02 · Chuẩn bị môi trường (làm theo từng bước)

```bash
# 1. Python ≥ 3.10 — kiểm tra
python3 --version

# 2. Cài SDK
pip install anthropic

# 3. Lấy API key tại console.anthropic.com → nạp tối thiểu $5
export ANTHROPIC_API_KEY="sk-ant-..."     # macOS/Linux
# Windows PowerShell:  $env:ANTHROPIC_API_KEY="sk-ant-..."
```

**Xác minh key chạy được** (làm bước này trước khi viết agent — tiết kiệm hàng giờ debug):
```python
import anthropic
client = anthropic.Anthropic()
r = client.messages.create(model="claude-sonnet-4-6", max_tokens=50,
                           messages=[{"role": "user", "content": "Chào!"}])
print(r.content[0].text)   # in ra lời chào → key OK
```

::: tip 💡 Model nào để học?
**Sonnet 4.6** cho cân bằng giá/chất lượng. Việc rẻ → **Haiku 4.5**. Một agent demo tốn vài cent.
:::

---

## 03 · Giải phẫu agent loop (5 mảnh)

```
1. SYSTEM PROMPT   — vai trò + hướng dẫn + guardrails
2. TOOLS           — danh sách hàm + JSON schema mô tả
3. MESSAGES        — lịch sử hội thoại (state)
4. LOOP            — gọi LLM → nếu đòi tool thì chạy → nối kết quả → lặp
5. EXIT CONDITION  — LLM không gọi tool nữa / max_turns / lỗi
```

Giờ ta code đủ 5 mảnh.

---

## 04 · Code Phần 1 — định nghĩa tool

Tool = **hàm thật** + **mô tả JSON schema** để LLM biết khi nào & gọi thế nào.

```python
import anthropic, json

client = anthropic.Anthropic()

# ── Hàm thật (deterministic) ──────────────────────────
def get_weather(city: str) -> dict:
    fake = {"Hà Nội": 32, "Đà Lạt": 19, "Sài Gòn": 35}   # demo; thật thì gọi API
    return {"city": city, "temp_c": fake.get(city, 28)}

def suggest_outfit(temp_c: int) -> dict:
    if temp_c >= 30: return {"outfit": "áo thun, quần short, nón"}
    if temp_c >= 22: return {"outfit": "áo sơ mi nhẹ"}
    return {"outfit": "áo khoác, quần dài"}

# ── Mô tả tool cho LLM (phần QUAN TRỌNG — xem Chương 4) ──
TOOLS = [
    {
        "name": "get_weather",
        "description": "Lấy nhiệt độ hiện tại (°C) của một thành phố ở VN.",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string",
                                    "description": "Tên thành phố, vd 'Hà Nội'"}},
            "required": ["city"],
        },
    },
    {
        "name": "suggest_outfit",
        "description": "Gợi ý trang phục dựa trên nhiệt độ (°C).",
        "input_schema": {
            "type": "object",
            "properties": {"temp_c": {"type": "integer",
                                      "description": "Nhiệt độ Celsius"}},
            "required": ["temp_c"],
        },
    },
]

# Bảng tra: tên tool → hàm thật
TOOL_FUNCS = {"get_weather": get_weather, "suggest_outfit": suggest_outfit}
```

::: tip 🔑 Đọc kỹ phần `input_schema`
Đây là cách LLM "biết" tool nhận gì. `required` ép LLM phải điền `city`. `description` của mỗi field là thứ LLM đọc để điền đúng — viết rõ ([Chương 4](./4-tool-design.md) đào sâu).
:::

---

## 05 · Code Phần 2 — vòng lặp (giải thích từng dòng)

```python
def run_agent(user_msg: str, max_turns: int = 6) -> str:
    messages = [{"role": "user", "content": user_msg}]
    system = ("Bạn là trợ lý thời tiết. Khi cần dữ liệu, hãy gọi tool. "
              "Tra nhiệt độ trước, rồi gợi ý trang phục. Trả lời ngắn, tiếng Việt.")

    for turn in range(max_turns):                       # [1] chốt chặn max_turns
        resp = client.messages.create(                  # [2] gọi LLM
            model="claude-sonnet-4-6", max_tokens=1024,
            system=system, tools=TOOLS, messages=messages,
        )

        if resp.stop_reason != "tool_use":              # [3] LLM hết gọi tool → XONG
            return "".join(b.text for b in resp.content if b.type == "text")

        messages.append({"role": "assistant", "content": resp.content})  # [4] lưu lượt

        results = []                                    # [5] chạy tool LLM yêu cầu
        for block in resp.content:
            if block.type == "tool_use":
                fn = TOOL_FUNCS[block.name]              # tra hàm thật
                out = fn(**block.input)                 # [6] chạy hàm
                results.append({"type": "tool_result",
                                "tool_use_id": block.id,
                                "content": json.dumps(out, ensure_ascii=False)})
        messages.append({"role": "user", "content": results})  # [7] nối observation

    return "Đã đạt giới hạn số lượt (max_turns)."        # [8] exit an toàn

print(run_agent("Hôm nay Hà Nội nên mặc gì?"))
```

| Dòng | Vai trò trong vòng lặp |
|---|---|
| **[1]** | `for ... range(max_turns)` — **điều kiện dừng cứng**, chống loop vô tận |
| **[2]** | Gửi `system + tools + messages` cho LLM (đây là "Thought + Action") |
| **[3]** | `stop_reason != "tool_use"` → LLM tự thấy đủ → **thoát** |
| **[4]** | Lưu lượt assistant (chứa yêu cầu gọi tool) vào `messages` (state) |
| **[5][6]** | Đọc `tool_use`, **code BẠN** chạy hàm thật `fn(**block.input)` |
| **[7]** | Nối `tool_result` (Observation) vào `messages` |
| Lặp | Quay lại [2] với lịch sử đã dài thêm |

→ Chạy thử: agent tự `get_weather("Hà Nội")` → 32°C → `suggest_outfit(32)` → trả lời. **Bạn vừa viết một agent.**

---

## 06 · 6 lỗi thường gặp & cách sửa (đọc kỹ — tiết kiệm hàng giờ)

::: warning 🐛 Bảng debug
| Lỗi / triệu chứng | Nguyên nhân | Cách sửa |
|---|---|---|
| `AuthenticationError` | Chưa set `ANTHROPIC_API_KEY` | `export` lại key; xác minh bằng code mục 02 |
| `ModuleNotFoundError: anthropic` | Chưa cài / sai venv | `pip install anthropic`, kiểm tra `which python3` |
| Agent **không gọi tool**, tự bịa đáp án | `description` tool mơ hồ | Viết rõ tool *làm gì + khi nào dùng* ([Ch4](./4-tool-design.md)) |
| `KeyError: <tên tool>` | LLM gọi tool chưa có trong `TOOL_FUNCS` | Thêm vào bảng tra; tên phải khớp `TOOLS` |
| **Loop tới max_turns** rồi dừng | Tool trả lỗi mơ hồ → LLM lặp | Error message "chỉ đường" ([Ch1 §06](./1-agent-la-gi.md)) |
| Tiếng Việt ra `\u1 ...` | Quên `ensure_ascii=False` | `json.dumps(out, ensure_ascii=False)` |
:::

::: tip 🔬 Mẹo debug vàng
**In ra `resp.stop_reason` và mọi `tool_use` mỗi vòng.** 90% bug lộ ra ngay khi bạn thấy agent *thật sự* gọi tool nào với tham số gì:
```python
print(f"[turn {turn}] stop={resp.stop_reason}",
      [(b.name, b.input) for b in resp.content if b.type == "tool_use"])
```
:::

---

## 07 · Structured Output — trả dữ liệu có kiểu

Khi cần agent trả **dữ liệu máy đọc được** (lưu DB, gọi API khác), ép theo schema bằng **Pydantic**:

```python
from pydantic import BaseModel

class OutfitPlan(BaseModel):
    city: str
    temp_c: int
    outfit: str

# Cách đơn giản: yêu cầu LLM trả JSON đúng cấu trúc, rồi validate
raw = llm("...trả về JSON {city, temp_c, outfit}...")
plan = OutfitPlan.model_validate_json(raw)   # ném lỗi nếu sai cấu trúc → an toàn
print(plan.outfit)
```

> Lợi ích: hết `try/except` parse JSON lộn xộn; sai cấu trúc là biết ngay. OpenAI khuyên **luôn bật strict mode**; Anthropic dùng tool "trả structured output".

**Nhưng nếu model trả sai cấu trúc?** Đừng để crash — **feed lỗi lại cho model rồi thử lại**:
```python
from pydantic import ValidationError

def get_structured(prompt, Model, max_retry=2):
    raw = llm(prompt)
    for _ in range(max_retry):
        try:
            return Model.model_validate_json(extract_json(raw))   # bóc {...} rồi validate
        except ValidationError as e:
            raw = llm(f"JSON bạn trả sai schema. Lỗi:\n{e}\nSửa lại, CHỈ trả JSON đúng.")
    raise ValueError("Model không trả đúng schema sau vài lần thử")
```
> Đây là pattern **validate → on-fail → re-prompt** — xương sống để workflow agent ([Chương 12](./12-apply-vn-roadmap.md)) lấy được dữ liệu sạch từ LLM. **3 cách** lấy structured output: **native** (OpenAI strict mode), **tool-based** (Anthropic), **JSON-mode + validate** (di động nhất, dùng pattern trên).

---

## 08 · 🧪 Dự án: Helpdesk Agent cho shop VN (code đầy đủ)

Giờ ráp tất cả thành một agent CSKH thật cho shop quần áo. **4 bước.**

**Bước 1 — Tool (giả lập DB shop):**
```python
ORDERS = {"1234": {"status": "đang giao", "shipped": True}}
STOCK  = {"A123": 5, "B456": 0}

def lookup_order(order_id): return ORDERS.get(order_id, {"error": "không thấy đơn"})
def check_stock(sku):
    n = STOCK.get(sku)
    if n is None: return {"error": f"SKU {sku} không tồn tại. Kiểm tra lại mã."}
    return {"sku": sku, "con_lai": n, "con_hang": n > 0}
```

**Bước 2 — Mô tả tool** (rút gọn — viết `input_schema` như mục 04 cho `lookup_order(order_id)` và `check_stock(sku)`).

**Bước 3 — System prompt có guardrail:**
```python
SYSTEM = ("Bạn là trợ lý CSKH shop thời trang ABC. Lịch sự, xưng 'shop'. "
          "CHỈ trả lời trong phạm vi đơn hàng & tồn kho. "
          "Câu ngoài phạm vi → lịch sự từ chối + mời để lại SĐT cho nhân viên. "
          "KHÔNG bịa thông tin đơn/tồn kho — phải gọi tool.")
```

**Bước 4 — Dùng lại `run_agent` mục 05** (đổi `system=SYSTEM`, `TOOLS`/`TOOL_FUNCS` mới, `max_turns=8`).

**Test 3 ca** (chú ý ca 3 — ngoài phạm vi):
```python
print(run_agent("Đơn 1234 của em tới đâu rồi ạ?"))      # → gọi lookup_order
print(run_agent("Áo A123 còn hàng không shop?"))         # → gọi check_stock
print(run_agent("Shop cho em vay 5 triệu được không?"))  # → từ chối lịch sự
```

::: tip ✅ Tiêu chí đạt
- Agent **tự chọn đúng tool** cho ca 1 & 2.
- Ca 3: **từ chối lịch sự + xin SĐT**, KHÔNG gọi tool, KHÔNG bịa.
- Khi SKU sai (`check_stock("X")`), error "chỉ đường" giúp agent trả lời đúng thay vì lặp.
:::

---

## 09 · Bài tập mở rộng

1. **Thêm tool `create_order(sku, qty, phone)`** + yêu cầu **xác nhận** trước khi tạo (human-in-the-loop sơ khai): agent phải hỏi "Xác nhận đặt 2× A123 cho 09xx?" trước khi gọi tool.
2. **Thêm log**: in mỗi tool call ra file `agent.log`.
3. **Đo chi phí**: đếm số lời gọi LLM mỗi request, ước tính token.

::: details 👉 Gợi ý câu 1
Đừng để LLM tự gọi `create_order` ngay. Tách 2 bước: (a) agent *đề xuất* tạo đơn dưới dạng text + hỏi xác nhận; (b) chỉ khi user trả "đồng ý" mới cho phép gọi tool. Đây là mầm mống của guardrail [Chương 11](./11-safety-guardrails.md).
:::

---

## 10 · Pitfalls (tổng hợp từ r/AI_Agents)

::: warning 🚨
1. **Không max_turns/spend cap** → loop vô tận, *cháy credit qua đêm*.
2. **Quá nhiều tool / tool chồng lấn** → chọn nhầm. Bắt đầu 2–4 tool.
3. **Mô tả tool sơ sài** → LLM không biết khi nào gọi.
4. **Không log** → không debug được.
5. **Quên xác nhận hành động hệ trọng** (tạo đơn, thanh toán).
:::

---

## 11 · Kiểm tra nhanh

1. 5 mảnh của một agent loop?
2. Dòng nào trong code là "điều kiện dừng"?
3. Ai *thật sự* chạy hàm tool — LLM hay code bạn?
4. Agent không gọi tool mà tự bịa — sửa ở đâu?
5. Vì sao cần `ensure_ascii=False`?

::: details 👉 Gợi ý đáp án
1. System prompt, tools, messages, loop, exit condition.
2. `for turn in range(max_turns)` (+ kiểm `stop_reason`).
3. **Code bạn** (`fn(**block.input)`); LLM chỉ nêu ý định.
4. Sửa `description` của tool cho rõ ([Chương 4](./4-tool-design.md)).
5. Để JSON giữ tiếng Việt có dấu, không thành `\uXXXX`.
:::

---

## 12 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Bạn vừa viết **agent chạy thật, không framework** — và một **Helpdesk VN**.
- Function calling = hàm thật + **schema mô tả tốt**; **code bạn** chạy hàm.
- **Luôn** có max_turns + log + xác nhận hành động hệ trọng.
- Biết **debug 6 lỗi** kinh điển + mẹo in `stop_reason`/`tool_use`.
:::

Agent chạy được, nhưng chất lượng phụ thuộc **tool tốt hay tệ**. Chương sau: nghệ thuật thiết kế tool.

→ [**Chương 4 — Tool Design (Agent–Computer Interface)**](./4-tool-design.md)

---

<ChapterVideos :videos="[
  { id: 'YtHdaXuOAks', title: 'Guide to Agentic AI – Build a Python Coding Agent with Gemini', channel: 'freeCodeCamp.org', why: 'Build agent từ số 0 bằng Python: agent loop + tool calling, không framework. (2025, 240K view)' },
  { id: 'eSbeub2ZeNk', title: 'Build & Deploy a Python AI Agent in 20 Minutes', channel: 'Tech With Tim', why: 'Build nhanh, thực hành, từ một creator uy tín. (2025)' }
]" />
