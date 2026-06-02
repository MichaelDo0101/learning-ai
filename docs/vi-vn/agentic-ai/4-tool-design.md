---
title: 'Chương 4 — Tool Design (Agent–Computer Interface)'
description: '5 nguyên tắc thiết kế tool cho agent theo Anthropic, mỗi nguyên tắc kèm code before/after. Error message chỉ đường, response_format, iterate-with-evals, và lab refactor tool KiotViet từ tệ thành tốt.'
---

# Chương 4 — Tool Design (Agent–Computer Interface)

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🔧</p>

::: tip 🔥 Thực chiến — 30 giây
Cùng một model, agent của người A thông minh, của bạn "ngu" — khác nhau ở **tool**. Tool tệ → agent gọi nhầm, lặp vô tận, đốt tiền.
**💸 Ăn tiền ở đâu:** sửa mô tả tool 5 phút có khi cứu cả con bot khỏi "tự kỷ" — rẻ hơn đổi model.
:::

> **Tool tệ → agent ngu, dù model xịn cỡ nào.**
> **Anthropic: "Tool là một loại phần mềm mới — hợp đồng giữa hệ tất định và agent phi tất định."**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Nhận ra một tool "tệ" và **refactor** nó thành "tốt" (có code before/after).
- Áp **5 nguyên tắc** thiết kế tool của Anthropic.
- Viết **error message "chỉ đường"** và **mô tả tool** mà LLM thật sự hiểu.
:::

---

## 01 · Tư duy: viết tool cho ai?

Agent **phi tất định** — có thể đoán sai, hiểu nhầm công dụng tool, đi đường khác nhau với cùng input.

::: warning 💡 Đừng bê API có sẵn ra làm tool 1:1
Endpoint REST thiết kế cho lập trình viên (trả UUID, mã lỗi khô, phân trang phức tạp) thường là **tool tệ cho agent**. Phải thiết kế lại theo cách agent *dùng được*.
:::

Anthropic gọi lớp này là **ACI — Agent–Computer Interface**, đầu tư vào nó quan trọng ngang UI/UX cho người.

<AgentToolUseDemo />

---

## 02 · 5 nguyên tắc (mỗi cái có code before/after)

### 1. Consolidate — gộp thành tool "hình dạng workflow"
Nhiều tool mỏng ≠ tốt hơn. Gộp thành tool ánh xạ **workflow thật**.
```python
# ❌ Before: bắt agent ghép 3 tool
list_contacts(); search_contacts(q); get_contact(id)
# ✅ After: 1 tool đủ dùng
search_contacts(query)          # tự tìm + trả thông tin cần
# ❌ Before: book_meeting cần agent tự dò lịch trống trước
# ✅ After: schedule_meeting(person, duration) — TỰ tìm slot trống VÀ đặt
```

### 2. Namespacing — tiền tố nhất quán
```python
# ❌ search, get, create  (không biết của hệ nào)
# ✅ kiotviet_orders_search, kiotviet_stock_get, pancake_message_send
```
> 🇻🇳 Khi nối nhiều hệ VN (KiotViet + Pancake + MISA), namespace cứu agent khỏi gọi nhầm.

### 3. Trả về ngữ cảnh có ý nghĩa
Ưu tiên **định danh ngữ nghĩa** (tên, tiêu đề) hơn **UUID/mã đục**.
```python
# ❌ Before
{"user_id": "u_8f3a91c2", "status": 3}
# ✅ After
{"ten_khach": "Nguyễn Văn A", "trang_thai": "đang giao",
 "link_don": "https://shop.vn/don/1234"}
```

### 4. Tối ưu token
Cài **phân trang, lọc, giới hạn** mặc định hợp lý — đừng đổ 10.000 dòng làm ngộp context ([Chương 5](./5-context-engineering.md)).
```python
def kiotviet_orders_search(phone, limit=5):   # ✅ mặc định 5, không phải tất cả
    rows = db.find(phone=phone)
    return {"orders": rows[:limit], "con_lai": max(0, len(rows) - limit)}
```

### 5. Prompt-engineer phần mô tả tool
Viết `name` + `description` như **onboard nhân viên mới**.
```python
# ❌ Before
{"name": "search", "description": "search"}
# ✅ After
{"name": "kiotviet_orders_search",
 "description": "Tìm đơn hàng trong KiotViet theo SĐT khách hoặc mã đơn. "
                "Dùng khi khách hỏi tình trạng/đơn của họ. Trả tối đa 5 đơn mới nhất.",
 "input_schema": {"type": "object",
   "properties": {"phone": {"type": "string", "description": "SĐT 10 số, vd 0901234567"}},
   "required": ["phone"]}}
```
> Anthropic ghi nhận: chỉ tinh chỉnh mô tả tool đã cải thiện benchmark đáng kể.

---

## 03 · Error message — "chỉ đường", không chỉ báo lỗi

```python
# ❌ Tệ — agent không biết làm gì tiếp → lặp vô ích (xem Ch1 §06)
def check_stock(sku):
    if sku not in DB: return {"error": "400"}

# ✅ Tốt — agent đọc được nguyên nhân → tự sửa
def check_stock(sku):
    if sku not in DB:
        return {"error": f"SKU '{sku}' không tồn tại. SKU đúng dạng 'A123'. "
                         f"Gợi ý: hỏi lại khách mã sản phẩm chính xác."}
```
> Error tốt biến một lần thất bại thành một lần **tự sửa** thành công.

---

## 04 · `response_format` — để agent chọn độ chi tiết

```python
def kiotviet_orders_search(phone, response_format="concise"):
    rows = db.find(phone=phone)
    if response_format == "concise":          # agent lấy bản gọn khi chỉ cần kiểm tra
        return [{"ma": r.id, "trang_thai": r.status} for r in rows[:5]]
    return rows[:5]                            # bản đầy đủ khi cần phân tích
```
→ Tiết kiệm token mà vẫn linh hoạt.

---

## 05 · Quy trình iterate-with-evals

```
1. PROTOTYPE   — dựng tool nhanh, test cục bộ với Claude Code/desktop
2. EVALUATE    — chạy agent trên task thực, đo: accuracy, RUNTIME,
                 SỐ TOKEN, số lần gọi tool, tỉ lệ lỗi
3. COLLABORATE — đưa transcript lỗi cho Claude phân tích → refactor tool
```
::: tip 🔑 Đo nhiều hơn "đúng/sai"
Một tool đúng kết quả nhưng tốn gấp 5× token vì trả dữ liệu thừa vẫn là **tool tệ**. Đo cả token + số lần gọi + runtime.
:::

---

## 06 · Anti-pattern — tool khiến agent chọn nhầm

::: warning 🚨
- **Tool trùng chức năng** (`get_user` vs `fetch_user` vs `lookup_user`) → agent phân vân.
- **Tool quá to làm mọi thứ** → khó mô tả, gọi sai tham số.
- **Tham số mơ hồ** (`mode: int`) → dùng enum tên (`mode: "fast" | "accurate"`).
- **Trả raw dump** → ngộp context, đắt.
- Quy tắc Anthropic: *nếu engineer giỏi không chắc nên dùng tool nào, agent cũng vậy.*
:::

---

## 07 · 🧪 Lab: refactor tool KiotViet (tệ → tốt)

::: tip Bài thực hành (45 phút) — code before/after
**Tool tệ cho sẵn:**
```python
{"name": "data", "description": "get data",
 "input_schema": {"properties": {"q": {"type": "string"},
                                 "m": {"type": "integer"}}}}
# trả về: [{"id":"x9f2a","v":3,"t":1699900000}]   # UUID + mã + timestamp thô
```
**Nhiệm vụ:** áp cả 5 nguyên tắc. Đáp án mẫu:
```python
{"name": "kiotviet_orders_search",
 "description": "Tìm đơn hàng theo SĐT khách. Dùng khi khách hỏi tình trạng đơn. "
                "Trả tối đa 5 đơn mới nhất, kèm trạng thái dễ đọc.",
 "input_schema": {"type": "object",
   "properties": {
     "phone": {"type": "string", "description": "SĐT 10 số, vd 0901234567"},
     "response_format": {"type": "string", "enum": ["concise", "detailed"]}},
   "required": ["phone"]}}

def kiotviet_orders_search(phone, response_format="concise"):
    rows = db.find(phone=phone)
    if not rows:
        return {"error": f"Không thấy đơn cho SĐT {phone}. "
                         f"Kiểm tra lại SĐT (10 số) giúp khách."}
    data = [{"ma_don": r.id, "trang_thai": r.status_text,
             "ngay": r.date} for r in rows[:5]]
    return {"orders": data, "con_lai": max(0, len(rows) - 5)}
```
**Tiêu chí đạt:** một dev khác đọc tool mới hiểu ngay khi nào & cách dùng — không cần hỏi.
:::

---

## 08 · Bài tập

1. Thiết kế tool `pancake_send_message(conversation_id, text)` đủ 5 nguyên tắc + error "chỉ đường" khi conversation không tồn tại.
2. Một agent gọi `check_stock` 5 lần liên tiếp với cùng SKU. Đọc lại [Ch1 §06](./1-agent-la-gi.md) — lỗi ở tool hay model? Sửa thế nào?

::: details 👉 Gợi ý câu 2
Lỗi ở **tool**: error message không "chỉ đường" → agent không biết vì sao → lặp. Sửa error cho rõ nguyên nhân + gợi ý hành động.
:::

---

## 09 · Kiểm tra nhanh

1. ACI là gì, vì sao quan trọng?
2. Kể 5 nguyên tắc thiết kế tool.
3. Vì sao trả "tên" tốt hơn "UUID"?
4. Error tốt khác error tệ ở điểm nào?
5. Ngoài accuracy, iterate-with-evals còn đo gì?

::: details 👉 Gợi ý đáp án
1. Agent–Computer Interface — lớp giao tiếp agent↔tool; quyết định lớn tới chất lượng agent.
2. Consolidate, namespacing, ngữ cảnh có nghĩa, token-efficient, mô tả tốt.
3. Agent hiểu ngữ nghĩa → suy luận đúng; UUID là mã đục dễ lạc.
4. Error tốt **chỉ đường** để tự sửa; error tệ chỉ báo có lỗi.
5. Token, số lần gọi tool, runtime, tỉ lệ lỗi.
:::

---

## 10 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- Viết tool **cho agent**, không bê API 1:1.
- 5 nguyên tắc: **consolidate, namespacing, ngữ cảnh có nghĩa, token-efficient, mô tả tốt**.
- Error message phải **chỉ đường**; cải thiện tool bằng **đo lường**.
:::

Tool tốt rồi — nhưng đổ hết dữ liệu vào context sẽ làm agent "loạn trí". Chương sau: quản lý ngữ cảnh, cú shift lớn nhất 2026.

→ [**Chương 5 — Context Engineering**](./5-context-engineering.md)

---

<ChapterVideos :videos="[
  { id: 'eur8dUO9mvE', title: 'What is MCP? Integrate AI Agents with Databases & APIs', channel: 'IBM Technology', why: 'Thiết kế tool/tích hợp cho agent qua MCP — name, description, input schema. (2025, 590K view)' },
  { id: '_d0duu3dED4', title: 'Why Everyone\'s Talking About MCP?', channel: 'ByteByteGo', why: 'Giải thích trực quan cách agent gọi tool qua một giao diện chuẩn. (2025, 450K view)' }
]" />
