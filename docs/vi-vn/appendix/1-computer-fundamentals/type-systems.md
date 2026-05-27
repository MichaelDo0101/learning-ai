# Nhập môn Type System

::: tip Mở đầu
**Tại sao `"1" + 1` trong JavaScript = `"11"`, trong Python lại error?** Đây là type system hoạt động. Type system là "luật giao thông" của ngôn ngữ — quyết data dùng thế nào, operation với cái nào, check legal lúc nào. Hiểu type system = hiểu "tính cách" khác nhau của ngôn ngữ.
:::

**Bạn sẽ học**:
- **Năng lực phân loại**: nắm 4 quadrant static/dynamic + strong/weak
- **Diagnose vấn đề**: gặp `TypeError` định vị nhanh nguyên nhân
- **Chọn ngôn ngữ**: hiểu sao TypeScript phù hợp project lớn, Python phù hợp prototype
- **Type inference**: hiểu ngôn ngữ hiện đại cân bằng đơn giản + an toàn
- **Practice awareness**: thói quen code type-safe

| Chương | Nội dung |
|-----|------|
| **1** | Type system là gì |
| **2** | Static vs Dynamic |
| **3** | Strong vs Weak |
| **4** | Type inference |
| **5** | Generics |
| **6** | Type safety thực chiến |
| **7** | 4 quadrant ngôn ngữ |

---

## 0. Toàn cảnh: type là "CMND" của data

Trong đời thực, bạn không nhét sách vào cốc cafe — vì chúng là loại khác. Programming tương tự: number, string, boolean, array... mỗi loại có "identity" riêng, quyết tham gia operation nào.

**Type system** là hệ rule ngôn ngữ quản lý "identity" này. Trả lời 2 câu hỏi:

::: tip 2 câu hỏi core
- **Khi nào check?** Lúc viết code (static), hay lúc chạy (dynamic)?
- **Strict thế nào?** Nghiêm cấm mix (strong) hay tự convert giúp (weak)?
:::

---

## 1. Type system: luật giao thông data

<TypeSystemDemo />

Bản chất type system = bộ **constraint rule**, báo compiler/interpreter:
- Variable lưu được value gì?
- 2 value cộng được không?
- Function parameter phải gì?

| Tác dụng | Mô tả | Ví dụ |
|-------------|------|------|
| Chống operation illegal | Chặn op vô nghĩa | Không chia được string |
| Cung cấp doc info | Type là doc tốt nhất | `function add(a: number, b: number)` rõ ngay |
| Hỗ trợ IDE tool | Autocomplete, refactor | Gõ `user.` → suggest hết property |
| Optimize performance | Compiler biết type → sinh code nhanh hơn | Biết integer → dùng integer instruction |

---

## 2. Static vs Dynamic: khi nào check?

Dimension quan trọng nhất.

<StaticVsDynamicDemo />

::: tip Khác biệt core
- **Static**: type variable xác định lúc compile-time, code chưa chạy đã catch type error. Đại diện: Java, TypeScript, Rust, Go
- **Dynamic**: type xác định lúc run-time, cùng 1 variable có thể lưu number rồi string. Đại diện: Python, JavaScript, Ruby, PHP
:::

| Dimension | Static | Dynamic |
|------|---------|---------|
| Thời điểm check | Compile-time | Run-time |
| Phát hiện bug | Sớm | Muộn (user thao tác mới lộ) |
| Linh hoạt | Thấp | Cao |
| IDE support | Tốt | Yếu hơn |
| Speed dev | Đầu chậm (phải viết type) | Đầu nhanh |
| Long-term maintainability | **Cao** | Thấp (cần test bù) |

### Ví dụ thực

```typescript
// TypeScript (static)
function add(a: number, b: number): number {
    return a + b;
}
add(1, "2");  // ❌ Compile error: Argument of type 'string' is not assignable to parameter of type 'number'
```

```python
# Python (dynamic)
def add(a, b):
    return a + b

add(1, "2")  # ❌ RuntimeError: unsupported operand type(s) for +: 'int' and 'str'
# Chỉ catch khi chạy tới đây
```

---

## 3. Strong vs Weak: strict thế nào?

Khác biệt: khi gặp type mismatch, có **auto convert** không?

::: tip Khác biệt core
- **Strong**: không auto convert, type mismatch = error. Python, Java, Ruby
- **Weak**: tự convert giúp, có thể có behavior bất ngờ. JavaScript, PHP, C
:::

### Ví dụ

```javascript
// JavaScript (weak)
"5" + 3        // "53"   — convert 3 thành "3"
"5" - 3        // 2      — convert "5" thành 5 (!)
"5" * "3"      // 15     — cả 2 convert
[] + {}        // "[object Object]"  — chaos!
true + 1       // 2
```

```python
# Python (strong)
"5" + 3        # TypeError
"5" - 3        # TypeError
int("5") + 3   # 8 — phải convert tay
```

JavaScript weak typing convenient nhưng buggy. TypeScript là JavaScript với "strict mode" bật.

---

## 4. 4 quadrant ngôn ngữ

| | Strong | Weak |
|---|---|---|
| **Static** | Java, Rust, TypeScript, Kotlin, Swift | C, C++ |
| **Dynamic** | Python, Ruby | JavaScript, PHP, Perl |

**Trend hiện đại**: Static + Strong (TypeScript, Rust, Swift, Kotlin) dominant. Production app gần như luôn dùng static để catch bug sớm.

---

## 5. Type inference

Modern static language không bắt bạn viết type mọi nơi.

```typescript
// Explicit
let x: number = 5;

// Inferred — TypeScript biết x là number
let x = 5;

// Inferred từ return value
function double(n: number) { return n * 2; }
// TypeScript infer return type là number
```

**Cân bằng**: get safety + dev speed.

Rust, Swift, Go, Kotlin, TypeScript đều có powerful inference.

---

## 6. Generics: viết 1 lần, dùng cho mọi type

Tránh viết duplicate cho mỗi type:

```typescript
// Without generics: 3 copies
function firstOfStrings(arr: string[]): string { return arr[0]; }
function firstOfNumbers(arr: number[]): number { return arr[0]; }
function firstOfUsers(arr: User[]): User { return arr[0]; }

// With generics: 1 function cho mọi type
function first<T>(arr: T[]): T { return arr[0]; }
first<string>(["a", "b"]);    // string
first<number>([1, 2]);         // number
first<User>([user1, user2]);   // User
```

**Constraint**:
```typescript
function longerOf<T extends { length: number }>(a: T, b: T): T {
    return a.length > b.length ? a : b;
}
// Chỉ work cho type có property length
```

---

## 7. Type safety thực chiến

### 7.1 Trap phổ biến

**Null/undefined**:
```typescript
function getLength(s: string | null): number {
    return s.length;  // ❌ s có thể null
    
    if (s) return s.length;  // ✅ narrow type
    return 0;
}
```

**Any escape hatch**:
```typescript
let x: any = "hello";
x.foo.bar.baz();  // Compile OK, runtime crash
// ❌ Dùng any = bỏ type safety
```

**Type assertion liều**:
```typescript
const user = response.data as User;  
// ❌ Nếu response.data không phải User → bug runtime
// ✅ Dùng type guard hoặc Zod validate
```

### 7.2 Best practice

1. **Strict mode**: bật `strict: true` trong tsconfig.json
2. **No any**: ban `any`, dùng `unknown` thay
3. **Runtime validation**: dùng Zod, Yup cho external data
4. **Discriminated union**: model state đúng
   ```typescript
   type State =
     | { status: 'loading' }
     | { status: 'success'; data: User }
     | { status: 'error'; error: string };
   ```

---

## 8. Type system trong AI/ML era

**Pydantic** (Python): runtime type validation + type hint
```python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    email: str

# Validate khi parse
user = User.parse_obj({"name": "Anna", "age": 25, "email": "a@b.com"})
```

**LangChain, Pydantic AI**: dùng pydantic schema cho LLM tool calling.

**Structured output từ LLM**: GPT-4, Claude support JSON schema output → kết hợp Pydantic/Zod để validate response.

---

## 9. Tổng kết

Type system = trade-off:
- **Safety**: catch bug sớm
- **Speed**: write code nhanh
- **Flexibility**: thay đổi type dễ

**Modern winner**: Static + Strong + Type Inference (TypeScript, Rust, Kotlin). Best of all worlds.

::: tip 2026 Update
- **TypeScript dominant cho web**: chiếm >70% large project mới
- **Rust** mainstream cho systems
- **Pydantic v2** stable, foundation cho FastAPI, LangChain
- **Type-driven AI**: dùng schema cho LLM structured output (Zod, Pydantic)
- **Gradual typing** trong Python (mypy, pyright) phổ biến
- **VN dev**: học TypeScript là MUST. JavaScript thuần (no TS) đã out-of-date cho production project mới
:::

## Tài liệu

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Pydantic docs](https://docs.pydantic.dev/)
- [Rust Book](https://doc.rust-lang.org/book/) - type system mạnh nhất
- [Types and Programming Languages (Pierce)](https://www.cis.upenn.edu/~bcpierce/tapl/) - academic foundation
