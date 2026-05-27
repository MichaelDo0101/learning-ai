# Nghệ thuật Debug

::: tip Mở đầu
**Code viết xong, chạy báo lỗi — rồi sao?** Nhiều newbie kẹt đây, nhìn màn hình không biết làm gì. Debug là 1 trong những skill cốt lõi nhất của programming, thậm chí **quan trọng hơn cả viết code**. Viết code chỉ chiếm 30% dev time, 70% còn lại là hiểu vấn đề, định vị bug, verify fix.
:::

**Bạn sẽ học**:
- **Debug mindset**: phương pháp định vị có hệ thống, không "đoán mò"
- **Đọc error**: hiểu error message, định vị nhanh từ stack trace
- **Method kinh điển**: binary search, rubber duck, minimal reproduction
- **Tool**: breakpoint, log, network debug
- **AI-assisted debug**: dùng AI accelerate nhưng không phụ thuộc AI

| Chương | Nội dung |
|-----|------|
| **1** | Đọc error message |
| **2** | Method debug kinh điển |
| **3** | Debug toolbox |
| **4** | Debug AI era |
| **5** | Mindset + habit |

---

## 0. Toàn cảnh: debug là phương pháp khoa học

Debug không phải "may rủi", mà là quy trình khoa học chặt chẽ. Phương pháp nhà vật lý làm thí nghiệm hoàn toàn áp dụng cho debug:

1. **Quan sát**: program bị gì? Báo gì?
2. **Hypothesis**: nguyên nhân có thể là gì?
3. **Thí nghiệm**: verify giả thuyết thế nào?
4. **Kết luận**: đúng → fix, sai → đổi giả thuyết

::: tip Golden rule
- **Reproduce trước, fix sau**: bug không reproduce stable được, fix xong cũng không biết đã fix đúng chưa
- **Mỗi lần chỉ đổi 1 thứ**: đổi nhiều chỗ cùng lúc → không biết cái nào fix
- **Tin evidence, không tin trực giác**: chỗ bạn nghĩ "không thể là đây" thường chính là đây
- **Mới đổi gì?**: 80% bug do change gần nhất gây ra
:::

---

## 1. Đọc error message: error không phải kẻ thù, là clue

Lỗi newbie hay mắc: thấy error là panic, đóng terminal hoặc ignore. Thực ra **error message là program đang nói cho bạn biết bug ở đâu** — bạn của bạn đó.

### 1.1 3 loại error

| Loại | Khi nào | Ví dụ | Khó |
|-----|------|------|---------|
| **Syntax** | Chưa chạy đã báo | Thiếu ngoặc, sai keyword | Dễ fix |
| **Runtime** | Crash khi chạy tới dòng đó | Access undefined, chia 0 | Trung |
| **Logic** | Chạy được nhưng sai kết quả | Sai công thức, sai điều kiện | Khó nhất |

### 1.2 Đọc error stack

JavaScript ví dụ:

```
TypeError: Cannot read properties of undefined (reading 'name')
    at getUserName (app.js:15:23)
    at handleClick (app.js:42:10)
    at HTMLButtonElement.<anonymous> (app.js:58:5)
```

**Đọc từ trên xuống**:
1. **Dòng 1**: loại error + mô tả → `TypeError`, đọc `name` của `undefined`
2. **Dòng 2**: function + vị trí → `getUserName`, `app.js` dòng 15 col 23
3. **Sau**: call chain → ai gọi function này? `handleClick` → button click

::: tip Khẩu quyết đọc stack
**Trên xuống tìm nguyên nhân, dưới lên tìm nguồn gốc.** Dòng đầu nói "lỗi gì", dòng cuối nói "bắt đầu từ đâu".
:::

### 1.3 Common error type

| Tên | Nghĩa | Lý do thường gặp |
|---------|------|---------|
| `SyntaxError` | Sai cú pháp | Ngoặc không match, thiếu comma |
| `TypeError` | Sai type | Op trên `undefined`/`null` |
| `ReferenceError` | Sai reference | Dùng variable chưa declare |
| `RangeError` | Sai range | Array out of bounds, recursion sâu |
| `NetworkError` | Lỗi network | API fail, CORS |
| `404 Not Found` | Resource không tồn tại | URL sai, file bị xoá |
| `500 Internal Server Error` | Server crash | Backend code crash |

### 1.4 Python error: ngược JavaScript

Python stack đọc **từ dưới lên**:

```python
Traceback (most recent call last):
  File "main.py", line 10, in <module>
    result = calculate(data)
  File "main.py", line 5, in calculate
    return data["price"] * data["quantity"]
KeyError: 'quantity'
```

**Dòng cuối** mới là nguyên nhân: `KeyError: 'quantity'`, dict không có key `quantity`.

::: tip Khác ngôn ngữ, cùng tư duy
Mọi ngôn ngữ error đều có 3 info: **lỗi gì** (type), **lỗi đâu** (file + line), **vì sao** (mô tả). Lấy được 3 cái là đọc được mọi error.
:::

---

## 2. Method debug kinh điển

Không cần tool, chỉ cần não. Là nền tảng cho mọi technique advanced.

### 2.1 Binary search

**Core**: thu nhỏ phạm vi đi 1 nửa, lặp lại → tìm ra root.

**Scenario**: code dài, không biết đoạn nào hỏng.

**Step**:
1. Add `console.log` (hoặc `print`) ở giữa code
2. Lỗi trước log → bug ở nửa trên
3. Lỗi sau log → bug ở nửa dưới
4. Repeat trên nửa hỏng

```
100 dòng có bug
    ↓ log dòng 50
Bug ở 50-100
    ↓ log dòng 75
Bug ở 50-75
    ↓ log dòng 62
Bug ở dòng 60-62!
```

::: tip Sức mạnh binary
100 dòng max 7 lần (log₂100 ≈ 7) là định vị xong. 1000 dòng cũng chỉ 10 lần.
:::

### 2.2 Rubber duck

**Core**: "kể" vấn đề từng dòng cho người khác (hoặc 1 con vịt cao su), kể đến đâu tự thấy bug đến đó.

**Vì sao work?** "Viết code" và "giải thích code" dùng vùng não khác nhau. Khi bị ép dùng ngôn ngữ mô tả từng bước, những assumption "tưởng đúng" lộ ra.

**Cách làm**:
1. Mở code có bug
2. Giải thích từng dòng: "dòng này làm gì? sao làm vậy?"
3. Khi bạn nói "à, chỗ này phải... khoan" → bug ở đó

### 2.3 Minimal reproduction

**Core**: simplify vấn đề về tối thiểu, chỉ giữ code đủ trigger bug.

**Vì sao quan trọng?**
- Trong hệ phức tạp, bug bị code khác "che"
- Minimal repro loại nhiễu, problem hiện rõ
- Tiện hỏi người khác — chẳng ai muốn xem 500 dòng code của bạn

**Step**:
1. Tạo file trống mới
2. Chỉ copy code liên quan bug
3. Xoá dần, đến khi xoá thêm 1 dòng bug biến mất
4. Còn lại = root cause

### 2.4 Rollback (Git Bisect)

**Core**: nếu code "trước work giờ hỏng", tìm commit nào gây ra.

```bash
# Tool binary search của Git
git bisect start
git bisect bad          # Mark version hiện tại có bug
git bisect good abc123  # Mark version cũ work
# Git tự switch tới middle commit, test xong báo good/bad
# Lặp vài lần → tìm ra commit gây bug
```

::: tip Chọn method
| Tình huống | Method |
|-----|---------|
| Không biết đoạn code nào hỏng | Binary search |
| Logic nhìn đúng nhưng kết quả sai | Rubber duck |
| Bug trong system phức tạp | Minimal repro |
| "Trước work giờ hỏng" | Rollback / Git Bisect |
:::

---

## 3. Debug toolbox

### 3.1 console.log / print: đơn giản nhất, thực dụng nhất

**Scenario**: xem variable nhanh, confirm code chạy tới đâu.

```javascript
console.log('Function called, params:', data)
console.log('Result:', result)
console.table(arrayData)  // Table cho array/object
```

```python
print(f"Current: {value}")
print(f"Type: {type(data)}")
```

**Advanced**:

| Method | Use |
|-----|------|
| `console.log()` | Output thường |
| `console.warn()` | Vàng, dễ tìm trong log nhiều |
| `console.error()` | Đỏ |
| `console.table()` | Table cho array/object |
| `console.time()` / `console.timeEnd()` | Đo time |
| `console.trace()` | In call stack |

### 3.2 Breakpoint debug

**Scenario**: logic phức tạp, cần track từng bước.

**Chrome DevTools**:
1. F12 → Sources panel
2. Click line number set breakpoint
3. Trigger action, code pause ở breakpoint
4. Control:
   - **Continue** (F8): tới breakpoint sau
   - **Step Over** (F10): chạy dòng hiện tại, không vào function
   - **Step Into** (F11): vào trong function
   - **Step Out** (Shift+F11): out function

**VS Code**:
1. Click cạnh trái line number → red dot
2. F5 start debug
3. "Variables" panel xem mọi value
4. "Watch" panel add expression

::: tip Breakpoint vs console.log
**console.log** verify nhanh, xong xoá. **Breakpoint** phân tích sâu logic phức tạp. Bổ sung nhau.
:::

### 3.3 Network debug

**Scenario**: page sai, không biết do front hay back.

**Chrome DevTools → Network**:

| Xem | Tìm được |
|---------|--------------|
| **Status code** | 404 (sai URL), 500 (server crash), 403 (no permission) |
| **Request params** | FE gửi đúng không |
| **Response** | BE trả về format đúng không |
| **Time** | API nào chậm |
| **Headers** | Token có không, Content-Type đúng không |

**Khẩu quyết**: status code → request params → response data.

### 3.4 Chọn tool

| Vấn đề | Tool |
|---------|---------|
| Value variable sai | console.log / breakpoint |
| Order execute sai | Breakpoint |
| API request fail | Network panel |
| Style sai | Elements panel (CSS) |
| Performance | Performance panel / console.time |
| Memory leak | Memory panel |

---

## 4. Debug AI era

AI tool (ChatGPT, Claude, Cursor) accelerate debug rất nhiều, nhưng phải biết dùng.

### 4.1 AI giỏi gì?

| AI giỏi | AI không giỏi |
|--------|----------|
| Giải thích error | Hiểu business logic của bạn |
| Provide common solution | Judge solution nào hợp project bạn |
| Generate debug snippet | Repro bug chỉ xảy ra trong env riêng |
| Phát hiện potential issue | Hiểu system context phức tạp |

### 4.2 Cách hỏi AI đúng

**Hỏi tệ**:
> "Code tôi báo lỗi, xem giúp"

**Hỏi tốt**:
> "Tôi viết form React, submit báo `TypeError: Cannot read properties of undefined (reading 'email')`. Code đây: [paste]. Đã confirm API response format đúng, có lẽ ở FE data processing."

**Template**:

```
1. Tôi đang làm: [background]
2. Expected: [phải thế nào]
3. Actual: [thực tế thế nào]
4. Error: [full message]
5. Code: [paste]
6. Đã thử: [loại bỏ gì]
```

### 4.3 Trap của AI debug

::: warning 3 trap
1. **AI "tự tin nói bậy"**: solution nhìn hợp lý nhưng có thể sai hoàn toàn. Always verify.
2. **AI không hiểu context**: không biết project structure, dependency version, env. Phải cung cấp đủ context.
3. **Quá phụ thuộc AI → skill thoái hoá**: mỗi lỗi quăng cho AI → không bao giờ tự debug được. Khuyến nghị tự phân tích 5 phút trước, rồi mới hỏi AI.
:::

### 4.4 AI + người = best combo

```
Gặp Bug
  ↓
B1: Tự đọc error (1 phút)
  ↓
B2: Tự đưa hypothesis (2 phút)
  ↓
B3: Verify nhanh (2 phút)
  ↓
Kẹt? → Gửi error + code + phân tích cho AI
  ↓
AI suggest → bạn judge hợp lý không → verify
```

---

## 5. Mindset + habit: từ "cứu hoả" sang "phòng cháy"

Debug tốt nhất là không phải debug. Habit tốt = giảm bug từ gốc.

### 5.1 Defensive programming

**Core**: viết code giả định "mọi thứ đều có thể sai", phòng trước.

```javascript
// Tệ: assume data tồn tại
const name = data.user.name

// Tốt: defensive
const name = data?.user?.name ?? 'Unknown'
```

```python
# Tệ: assume file mở được
content = open('config.json').read()

# Tốt: defensive
try:
    content = open('config.json').read()
except FileNotFoundError:
    print("Config not found, dùng default")
    content = '{}'
```

### 5.2 Viết log tốt

Log là key của "debug sau sự cố". Production không breakpoint được, chỉ có log.

| Level | Use | Ví dụ |
|---------|------|------|
| **DEBUG** | Info dev chi tiết | Value variable, params |
| **INFO** | Flow business bình thường | "User login success", "Order created" |
| **WARN** | Không hỏng nhưng đáng chú ý | "Cache miss", "Retry lần 2" |
| **ERROR** | Sai, cần xử | "DB connection fail", "API timeout" |

::: tip Standard log tốt
1 log tốt phải trả lời: **khi nào**, **ở đâu**, **xảy ra gì**, **data quan trọng là gì**.
```
[2026-05-26 14:30:22] [ERROR] [OrderService] Create order fail
  UserID: 12345, ProductID: 67890, Reason: out of stock
```
:::

### 5.3 Debug checklist

Gặp bug, theo thứ tự:

1. **Đọc error**: type, file, line
2. **Mới đổi gì?**: `git diff` xem change gần nhất
3. **Repro được không?**: tìm step stable
4. **Thu nhỏ phạm vi**: binary search hoặc minimal repro
5. **Đưa hypothesis + verify**: mỗi lần chỉ đổi 1 thứ
6. **Sau fix regression test**: confirm không gây bug mới

### 5.4 Trap newbie

| Trap | Đúng |
|-----|---------|
| Không đọc error đã sửa code | Đọc đầy đủ error trước |
| Sửa nhiều chỗ cùng lúc | Mỗi lần 1 chỗ, verify xong mới chỗ sau |
| Sửa xong không test đã commit | Mỗi change đều test |
| Chỉ test máy mình | Cân nhắc env khác (browser, OS, network) |
| Debug xong không clean console.log | Trước commit xoá hết debug code |
| Gặp lỗi là restart/reinstall | Hiểu nguyên nhân trước, restart chỉ tạm thời |

---

## 6. Tổng kết

Debug là 1 môn craft, cần luyện chủ động. Recap:

1. **Debug = scientific method**: observe → hypothesis → experiment → verify
2. **Error message là bạn**: lấy "lỗi gì, lỗi đâu, vì sao"
3. **Method kinh điển không bao giờ outdated**: binary, rubber duck, minimal repro
4. **Tool đúng scenario**: console.log verify nhanh, breakpoint sâu, Network cho API
5. **AI là assistant không phải nạng**: tự phân tích trước, AI assist, tự verify
6. **Phòng cháy > cứu hoả**: defensive + log tốt = giảm bug từ gốc

::: tip Nhớ câu này
**Mỗi bug là 1 cơ hội học.** Bug nào bạn từng fix đều giúp build "pattern recognition" — lần sau gặp tương tự, định vị nhanh hơn.
:::

---

## Tài liệu

- [Chrome DevTools docs](https://developer.chrome.com/docs/devtools/)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [The Debugging Book](https://www.debuggingbook.org/) - method debug có hệ thống
