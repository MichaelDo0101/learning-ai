# TypeScript Deep Guide

::: tip Mở đầu
Đã biết JS, nhưng có thể đã gặp:
- Variable gán wrong type, runtime mới biết
- Tên property sai, debug mãi
- Function param type sai, sửa qua lại

TypeScript giúp phát hiện vấn đề này trước khi code chạy. Đọc xong, hiểu sao TS tăng code quality, đọc được type annotation, interface, generic, dùng tốt code AI gen trong vibecoding.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | TS là gì |
| **2** | Type annotation cơ bản |
| **3** | Object type + Interface |
| **4** | Function type |
| **5** | Generic |
| **6** | Type inference + tips |

---

## 1. TypeScript là gì

::: tip 🤔 Core
**JS đã đủ dùng, sao cần TS?** Học thêm syntax đáng không?
:::

### 1.1 Từ "runtime error" → "compile-time detection"

| 🔴 JS pain | ✅ TS lợi |
|-----------|-----------|
| Runtime mới biết type error | Viết code đã biết error |
| Typo khó nhận | IDE suggest chính xác |
| Refactor dễ sót | Refactor an toàn |
| IDE hint không chính xác | Code dễ maintain |

| Tech | Ẩn dụ | Use |
|------|------|------|
| **JS** | Material thô | Code chạy trực tiếp |
| **TS** | Blueprint + QC | Thêm type check, cuối compile → JS |

### 1.2 Sao vibecoding cũng cần TS?

::: warning AI code cũng có thể sai
1 dev dùng AI gen feature quản user. AI viết JS chạy được, nhưng age user phải number, đôi khi bị gán string nhầm. Lúc tính "đã trưởng thành?", string "25" bị xử như string → judge fail. Bug ẩn lâu, đến khi user nhập ký tự không phải số mới lộ.

Nếu TS, lúc viết đã báo error: `Type 'string' is not assignable to type 'number'`.

**Đây là giá trị TS — AI viết sai type, bạn biết ngay.**
:::

### 1.3 TS thực ra như thế nào

TS không phải ngôn ngữ mới, chỉ là **superset** của JS:

```typescript
// JS valid = TS valid
const name = "Hoàng"
const age = 25
function greet(user) {
  return `Hello ${user}`
}

// Đây là TS đặc trưng: type annotation
const name2: string = "Linh"
const age2: number = 30
function greet2(user: string): string {
  return `Hello ${user}`
}
```

**Key**:
- Mọi JS code = valid TS code
- TS thêm **type annotation optional**
- TS cuối compile thành JS

::: info 💡 Insight
TS không đổi cách code chạy, chỉ help check type lúc compile. **Có thể adopt TS gradual** — bắt đầu add type cho key variable.
:::

---

## 2. Type annotation cơ bản

### 2.1 Syntax

Type annotation = sau tên variable thêm `: type`:

```typescript
// Syntax: name: type = value
const name: string = "Hoàng"
let age: number = 25
let isStudent: boolean = true
```

<TypeAnnotationDemo />

::: details 🔍 Sao 1 số chỗ không cần annotation?
TS auto-infer từ giá trị:

```typescript
const name = "Hoàng"      // infer string
const age = 25            // infer number
const isActive = true     // infer boolean

let data  // ❌ Không infer được
let data: any  // ✅ Được, nhưng mất type check

function add(a, b) {  // ❌ Param type unclear
  return a + b
}

function add2(a: number, b: number): number {  // ✅
  return a + b
}
```
:::

### 2.2 Basic types

| Type | Note | Vd |
|------|------|------|
| `string` | String | `"hello"` |
| `number` | Số (int + float) | `42`, `3.14` |
| `boolean` | True/False | `true`, `false` |
| `null` / `undefined` | Null | `null`, `undefined` |
| `array` | Array | `number[]`, `string[]` |
| `object` | Object | `{ name: string; age: number }` |

**Array 2 cách viết**:

```typescript
// Cách 1: type[] (hay dùng)
const numbers: number[] = [1, 2, 3]
const names: string[] = ["A", "B"]

// Cách 2: Array<type>
const numbers2: Array<number> = [1, 2, 3]
```

**Special types**:

```typescript
// any: bất kỳ (cẩn thận, = tắt type check)
let data: any = 42
data = "string"
data = { name: "Hoàng" }

// unknown: any type-safe
let value: unknown = 42
if (typeof value === "number") {
  console.log(value + 10)  // Phải check type trước
}

// void: không return
function log(message: string): void {
  console.log(message)
}

// never: không bao giờ return
function error(message: string): never {
  throw new Error(message)
}
```

---

## 3. Object type + Interface

### 3.1 Interface: định nghĩa "shape" object

Interface = cách chính của TS để define object type:

```typescript
interface User {
  id: number
  name: string
  email: string
  age?: number  // Optional
}

const user: User = {
  id: 1,
  name: "Hoàng",
  email: "h@example.com",
  age: 25
}

// age optional, có thể bỏ
const user2: User = {
  id: 2,
  name: "Linh",
  email: "l@example.com"
}
```

<InterfaceDemo />

::: details 🔍 Interface khác
```typescript
// Readonly
interface User {
  readonly id: number  // Không sửa được sau tạo
  name: string
}

const user: User = { id: 1, name: "Hoàng" }
user.id = 2  // ❌ Error
user.name = "Linh"  // ✅

// Function type
interface User {
  name: string
  greet: () => string
}

// Extends
interface Admin extends User {
  permissions: string[]
}
```
:::

### 3.2 Type Alias

Ngoài interface, dùng `type`:

```typescript
type User = {
  id: number
  name: string
}

// Union type
type Status = "pending" | "success" | "error"
const status: Status = "success"  // ✅

// Intersection type
type User = { id: number; name: string }
type Timestamp = { createdAt: Date; updatedAt: Date }
type UserWithTimestamp = User & Timestamp
```

**Interface vs Type**:

| Feature | interface | type |
|------|-----------|------|
| Extend | `extends` | `&` intersection |
| Duplicate | Auto merge | Error |
| Use | Object shape, class | Union, intersection, basic alias |

---

## 4. Function type

### 4.1 Param + return type

```typescript
function add(a: number, b: number): number {
  return a + b
}

// Arrow function
const multiply = (a: number, b: number): number => a * b

// No return
function log(message: string): void {
  console.log(message)
}

// Multiple return type (union)
function parseInput(input: string): number | string {
  const num = parseFloat(input)
  return isNaN(num) ? input : num
}
```

### 4.2 Optional + default param

```typescript
// Optional
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name
}

// Default
function greet2(name: string, title: string = "friend"): string {
  return `${title} ${name}`
}
```

### 4.3 Function type as param

```typescript
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b)
}

calculate(10, 5, (x, y) => x + y)  // 15

// Clearer: define type trước
type Operation = (x: number, y: number) => number
```

---

## 5. Generic

### 5.1 Basic

Generic = define function/interface/class không pre-specify type, lúc use mới specify:

```typescript
// T = type variable
function identity<T>(arg: T): T {
  return arg
}

const num1 = identity<number>(42)  // type number
const str1 = identity<string>("hello")  // type string

// Auto infer
const num2 = identity(42)  // infer number
const str2 = identity("hello")  // infer string
```

<GenericDemo />

### 5.2 Generic constraint

```typescript
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length)
}

logLength("hello")  // ✅
logLength([1, 2, 3])  // ✅
logLength(42)  // ❌
```

### 5.3 Generic interface + class

```typescript
interface Box<T> {
  value: T
  getValue(): T
}

const numberBox: Box<number> = {
  value: 42,
  getValue: () => 42
}

// Generic class
class Storage<T> {
  private items: T[] = []
  add(item: T): void { this.items.push(item) }
  get(index: number): T { return this.items[index] }
}

const numberStorage = new Storage<number>()
numberStorage.add(1)
// numberStorage.add("string")  // ❌
```

---

## 6. Type inference + tips

### 6.1 Type inference

```typescript
const name = "Hoàng"  // infer string
const numbers = [1, 2, 3]  // infer number[]
const mixed = [1, "hello", true]  // infer (number | string | boolean)[]

function add(a: number, b: number) {
  return a + b  // infer return number
}
```

<TypeInferenceDemo />

### 6.2 Khi nào dùng annotation explicit

✅ **Dùng inference**:
- Simple literal assignment
- Function return value clear

✅ **Dùng annotation explicit**:
- Function param (bắt buộc)
- Object property type unclear
- Function return type phức tạp
- Public API

### 6.3 Type guard

Check type lúc runtime:

```typescript
// typeof
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase())  // TS biết string
  } else {
    console.log(value * 2)  // TS biết number
  }
}

// instanceof
function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) animal.bark()
  else animal.meow()
}

// Custom type guard
function isUser(value: any): value is User {
  return typeof value === "object" &&
    value !== null &&
    typeof value.name === "string"
}
```

### 6.4 Utility types

```typescript
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>     // Mọi prop optional
type RequiredUser = Required<PartialUser>  // Mọi prop required
type UserBasic = Pick<User, "id" | "name">  // Chỉ id + name
type UserNoEmail = Omit<User, "email">  // Bỏ email
type UserRoles = Record<string, boolean>  // { [key: string]: boolean }
```

---

## 7. TS trong vibecoding

### 7.1 Để AI gen type-safe code

**❌ Tệ**:
```
Viết feature quản user
```

**✅ Tốt**:
```
Viết feature quản user, dùng TypeScript.

Data structure:
interface User {
  id: number
  name: string
  email: string
  age: number
}

Implement:
1. Get user list: return User[]
2. Create user: input Partial<User>, return User
3. Update user: input id + Partial<User>, return User
4. Delete user: input id, return void

Đảm bảo mọi function có type annotation đầy đủ.
```

### 7.2 Đọc TS error

| Error | Nghĩa | Giải |
|---------|------|---------|
| `Type 'X' is not assignable to type 'Y'` | X không gán được cho Y | Check type match |
| `Property 'X' does not exist on type 'Y'` | Y không có prop X | Check spelling hoặc define prop |
| `Argument of type 'X' is not assignable to parameter of type 'Y'` | Param type không match | Check param type lúc call |
| `Type 'X' is missing the following properties` | X thiếu prop của Y | Add prop thiếu |

### 7.3 Migrate gradual

1. Rename `.js` → `.ts`
2. Fix obvious type error
3. Add type definition dần
4. Enable strict mode:
   ```json
   { "compilerOptions": { "strict": true } }
   ```

---

## 8. Code bạn đọc được

- `: string` → string annotation
- `: number[]` → number array
- `interface User` → object type
- `type User =` → type alias
- `<T>` → generic
- `extends` → interface inherit / generic constraint
- `?` → optional
- `readonly` → readonly
- `|` → union
- `&` → intersection

::: info 💡 Hỏi AI thế nào
- "Function này type annotation thế nào? Param X, return Y"
- "Define interface cho data structure này: ..."
- "TS error này nghĩa gì? Fix thế nào?"
- "Generic function này thêm constraint thế nào, đảm bảo T có prop?"
:::

::: tip 2026 cho VN dev
- **TypeScript 5.7+**: stable, default cho mọi project mới
- **tsconfig strict**: bật `strict: true`, `noUncheckedIndexedAccess`, `noImplicitOverride`
- **No `any`**: dùng `unknown`, có type guard
- **Runtime validation**: Zod (mainstream), Valibot (smaller), Effect Schema
- **Type-safe ORM**: Prisma, Drizzle, Kysely
- **End-to-end type safety**: tRPC, Hono RPC, GraphQL Codegen
- **VN dev**: từ project mới phải dùng TS, JS thuần out-of-date cho production
:::
