# Bản đồ ngôn ngữ lập trình

::: tip Mở đầu
Tại sao có nhiều ngôn ngữ lập trình? Học cái nào? Chương này dẫn bạn từ "tiến hoá ngôn ngữ" tới "paradigm" tới "cách chọn".

**Kết luận: không có ngôn ngữ tốt nhất, chỉ có ngôn ngữ phù hợp scenario nhất.**
:::

**Bạn sẽ học**:
- Năng lực chọn lý tính dựa nhu cầu project
- Hiểu sâu "OOP", "functional programming" là cách tư duy khác
- Lịch sử 70+ năm evolution
- Nền cho hiểu ngôn ngữ mới và quyết định tech selection

| Chương | Nội dung |
|-----|------|
| **1** | Evolution ngôn ngữ (machine → high-level) |
| **2** | Paradigm (imperative, OOP, functional) |
| **3** | Chọn ngôn ngữ theo scenario |

---

## 0. Người "nói chuyện" với máy thế nào?

Robot chỉ hiểu binary:
- **Gõ 0/1 trực tiếp** — sai 1 bit là sai hết (machine language)
- **Mnemonic** — `MOV AX, 1` dễ hơn `10110000 00000001` (assembly)
- **Gần ngôn ngữ tự nhiên** — `int sum = 1 + 2;` (high-level)

**Trend 70+ năm**: ngày càng gần tư duy người.

---

## 1. Evolution ngôn ngữ

<LanguageMapDemo />

::: tip Tóm 1 câu
**Ngày càng gần tư duy người, ngày càng an toàn, ngày càng hiệu quả**. Từ 0/1, assembly, C structured, Java OOP, tới Rust memory-safe.
:::

---

## 2. Paradigm: cách tư duy vấn đề

Paradigm không phải đặc tính ngôn ngữ, mà **cách tư duy**.

### 2.1 Imperative — "từng bước bảo máy làm gì"

```c
int sum = 0;
for (int i = 0; i < n; i++) sum += arr[i];
```

### 2.2 OOP — "đóng gói data + behavior thành object"

```python
class Dog:
    def __init__(self, name): self.name = name
    def bark(self): print(f"{self.name} woof!")
```

### 2.3 Functional — "compose pure function, không sửa state"

```haskell
sum = foldl (+) 0
```

### 2.4 Declarative — "chỉ nói làm gì, không quan tâm làm sao"

```sql
SELECT name FROM users WHERE active = true
```

::: tip Trong thực tế
Ngôn ngữ hiện đại đa **multi-paradigm**. Python, JavaScript support OOP + functional. Chọn cách phù hợp vấn đề.
:::

---

## 3. Type system

| | Strong | Weak |
|---|---|---|
| **Static** | Java, Rust, TypeScript — an toàn nhất | C, C++ — nhanh nhưng cẩn thận |
| **Dynamic** | Python, Ruby — linh hoạt + an toàn | JavaScript, PHP — linh hoạt + dễ sai |

**Câu hỏi**: `"1" + 1` bằng gì?
- **JavaScript** (weak): `"11"` — tự convert
- **Python** (strong): `TypeError` — bắt nghĩ rõ

---

## 4. Compiled vs Interpreted

| | Compiled | Interpreted | JIT |
|---|---|---|---|
| **Process** | Translate hết rồi chạy | Đọc 1 dòng chạy 1 dòng | Interpret + hotspot compile |
| **Tốc độ** | Nhanh nhất | Chậm hơn | Trung bình |
| **Đại diện** | C, Rust, Go | Python, Ruby | Java, JavaScript |

---

## 5. Cách chọn ngôn ngữ

### Theo scenario

| Scenario | Đề xuất | Lý do |
|---|---|---|
| **Web frontend** | JavaScript, TypeScript | Browser chỉ hiểu JS |
| **Web backend** | Go, Java, Python, Node.js | Ecosystem mature |
| **Mobile** | Swift (iOS), Kotlin (Android) | Official |
| **AI / Data** | Python | PyTorch, Pandas |
| **System programming** | C, Rust | Control hardware |
| **Cloud-native** | Go, Rust | Docker/K8s đều Go |

### Roadmap học

1. **Python** — entry point thời AI
2. **JavaScript** — Web full-stack
3. **TypeScript** — add type cho JS
4. **Go hoặc Rust** — hiểu compiled language

---

## 6. Tổng kết

::: tip Điểm core
1. Evolution: ngày càng gần tư duy người
2. Paradigm: chọn theo vấn đề
3. Type: ảnh hưởng an toàn + linh hoạt
4. Compiled vs interpreted: nhanh vs linh hoạt
5. **Không có silver bullet** — chọn theo scenario
:::

::: tip 2026 update
- **Mojo** mature: Python-like + Rust performance cho AI
- **Bun runtime** thay Node trong nhiều startup
- **Rust** mainstream cho systems + cloud + WASM
- **Zig** simpler than C, more explicit
- **AI assistant** giúp học ngôn ngữ mới nhanh hơn → đừng ngại học cái thứ 5, 6
:::

**Bước tiếp**:
- [Compiler nhập môn](./compilers)
- [Type system nhập môn](./type-systems)
- [Data structure](./data-structures)
- [Tư duy giải thuật](./algorithm-thinking)
