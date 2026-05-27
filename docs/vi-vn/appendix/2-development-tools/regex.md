# Regular Expression (Regex)

> 💡 **Hướng dẫn**: regex nhìn như chữ ngoài hành tinh? Thực ra chỉ là 1 mini-language để "mô tả pattern của text". Chương này từ zero giúp bạn hiểu core idea, dùng vài symbol giải 80% bài toán search + validate text.

---

## 0. Sao cần regex?

Tưởng tượng:
- Lấy mọi IP address trong 1 log dài
- Validate format email user nhập
- Replace mọi date `2024/01/15` thành `2024-01-15`
- Extract mọi link từ HTML source

**String search thường?** Phải viết cả đống `if-else`.
**Regex?** 1 dòng pattern xong.

---

## 1. Khởi động: 3 phút bắt đầu

👇 Click thử: nhập regex, xem real-time match

<RegexDemo />

::: tip 💡 1 câu hiểu
Regex = **dùng symbol đặc biệt mô tả "bạn muốn tìm text kiểu gì"**. `\d` = số, `+` = 1 hoặc nhiều, → `\d+` = "1 hoặc nhiều số".
:::

---

## 2. Core concept: ghép "lego"

Bản chất regex = ghép 3 loại "lego":

### 2.1 Lego 1: Character class (match char gì)

| Syntax | Nghĩa | Ví dụ |
|---|---|---|
| `.` | Char bất kỳ | `a.c` → abc, a1c, a c |
| `\d` | Số [0-9] | `\d\d` → 42, 99 |
| `\w` | Chữ/số/underscore | `\w+` → hello, user_1 |
| `\s` | Whitespace | Match space, tab |
| `[abc]` | 1 trong set | `[aeiou]` → nguyên âm |
| `[^abc]` | Không trong set | `[^0-9]` → không phải số |

### 2.2 Lego 2: Quantifier (match mấy lần)

| Syntax | Nghĩa | Ví dụ |
|---|---|---|
| `*` | 0 hoặc nhiều | `ab*` → a, ab, abbb |
| `+` | 1 hoặc nhiều | `ab+` → ab, abbb (không match a) |
| `?` | 0 hoặc 1 | `colou?r` → color, colour |
| `{3}` | Đúng 3 lần | `\d{3}` → 123 |
| `{2,4}` | 2-4 lần | `\d{2,4}` → 12, 1234 |

### 2.3 Lego 3: Position + group

| Syntax | Nghĩa | Ví dụ |
|---|---|---|
| `^` | Đầu dòng | `^Hello` → dòng bắt đầu Hello |
| `$` | Cuối dòng | `end$` → dòng kết thúc end |
| `\b` | Word boundary | `\bcat\b` → cat (không match catch) |
| `(...)` | Capture group | `(\d+)-(\d+)` → capture riêng |
| `a\|b` | Or | `cat\|dog` → cat hoặc dog |

---

## 3. Pattern validate thường gặp

### 3.1 Email

```
[\w.+-]+@[\w-]+\.[\w.]+
```

Phân tích:
- `[\w.+-]+` — username (chữ-số-dot-plus-dash)
- `@` — literal @
- `[\w-]+` — domain
- `\.` — escape dot
- `[\w.]+` — TLD

### 3.2 Phone VN (10 số bắt đầu 0)

```
0\d{9}
```

Phân tích:
- `0` — bắt đầu 0
- `\d{9}` — 9 số sau

### 3.3 Password strength

```
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```

Phân tích:
- `(?=.*[a-z])` — ít nhất 1 chữ thường (lookahead)
- `(?=.*[A-Z])` — ít nhất 1 chữ hoa
- `(?=.*\d)` — ít nhất 1 số
- `.{8,}` — tổng ≥ 8 ký tự

---

## 4. Dùng regex trong code

### JavaScript

```javascript
const text = 'Contact: 0912345678 or 0987654321'
const regex = /0\d{9}/g
const phones = text.match(regex)
// ['0912345678', '0987654321']

// Replace
text.replace(/\d{4}(?=\d{4}$)/, '****')
// Ẩn 4 số giữa của phone

// Validate
/^[\w.+-]+@[\w-]+\.[\w.]+$/.test('user@example.com')
// true
```

### Python

```python
import re

text = 'Giá 99k, giảm 20k'
numbers = re.findall(r'\d+', text)
# ['99', '20']

# Replace
re.sub(r'\d+', 'X', text)
# 'Giá Xk, giảm Xk'

# Group capture
match = re.search(r'(\d+)-(\d+)', '2024-01-15')
match.group(1)  # '2024'
match.group(2)  # '01'
```

---

## 5. Greedy vs Lazy

```
Text: <b>hello</b> and <b>world</b>
```

| Pattern | Match | Note |
|---|---|---|
| `<b>.*</b>` | `<b>hello</b> and <b>world</b>` | Greedy: match max |
| `<b>.*?</b>` | `<b>hello</b>` | Lazy: match min |

::: tip 💡 Nhớ
Default = greedy. Add `?` sau quantifier = lazy. Thường bạn cần lazy.
:::

---

## 6. Tổng kết

::: tip 📚 Core
1. **Regex = mini-language mô tả text pattern**, dùng search/match/replace
2. **3 loại lego**: character class + quantifier + position/group
3. **\d \w \s** = 3 char class hay dùng nhất
4. **Không cần viết từ đầu**: pattern thông dụng đã có sẵn nhiều
5. **Greedy vs lazy**: default greedy, thêm `?` thành lazy
:::

::: tip 2026 AI era
- **Hỏi AI viết regex**: "viết regex match số điện thoại VN" → AI gen ngay
- **Tools**: regex101.com (test online), regexr.com
- **AI code editor** (Cursor, Copilot): suggest regex theo context
- **Vẫn phải hiểu basic**: để debug và verify AI gen có đúng không
:::

**Tiếp theo**:
- [Environment Variable và PATH](./environment-path)
- [SSH và Key Authentication](./ssh-authentication)
