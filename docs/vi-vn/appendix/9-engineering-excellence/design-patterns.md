# Design Patterns

::: tip Mở đầu
**Code bạn "chạy được nhưng lộn xộn"?** Có thể gặp: requirement đổi → code phải sửa nhiều; muốn reuse logic, nhưng nó dính chặt với code khác. **Design pattern** = "routine organize code" tổng kết từ tiền bối, giúp viết code linh hoạt + maintainable.

Chương này: hiểu pattern thực dụng nhất, không học vẹt, mà hiểu "scenario nào dùng routine nào".
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Pattern là gì + classify |
| **2** | Creational patterns |
| **3** | Structural patterns |
| **4** | Behavioral patterns |

---

## 0. Toàn cảnh: bản chất pattern

Tưởng học nấu ăn. Có thể tự mò từ đầu, hoặc học recipe kinh điển — recipe không hạn chế sáng tạo, mà cho bạn đứng trên vai tiền bối. Pattern = "recipe kinh điển" của programming.

::: tip Giá trị pattern
- **Common language**: nói "đây dùng Observer", team hiểu ngay design intent
- **Experience reuse**: không phải bước lại pit
- **Flexibility**: pattern tốt → code đối mặt change chỉ sửa nhỏ
:::

<DesignPatternCatalogDemo />

---

## 1. Creational patterns

### 1.1 Singleton

**Scenario**: chỉ cần 1 instance global. Vd config manager, logger, DB connection pool.

```javascript
class ConfigManager {
  static instance = null

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  constructor() {
    this.config = {}
  }
}

const a = ConfigManager.getInstance()
const b = ConfigManager.getInstance()
console.log(a === b) // true
```

### 1.2 Factory

**Scenario**: theo condition tạo object khác, caller không cần biết creation detail.

```javascript
function createNotification(type, message) {
  switch (type) {
    case 'email':
      return { send: () => console.log(`Email: ${message}`) }
    case 'sms':
      return { send: () => console.log(`SMS: ${message}`) }
    case 'push':
      return { send: () => console.log(`Push: ${message}`) }
    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

const notification = createNotification('email', 'Hello')
notification.send()
```

---

## 2. Structural patterns

### 2.1 Adapter

**Scenario**: 2 interface incompatible, cần "convert plug". Vd old API trả format khác mới component expect.

```javascript
// Old API
const oldApi = {
  getUserInfo: () => ({ user_name: 'Hoàng', user_age: 25 })
}

// Adapter
function adaptUser(oldUser) {
  return { name: oldUser.user_name, age: oldUser.user_age }
}

const user = adaptUser(oldApi.getUserInfo())
// { name: 'Hoàng', age: 25 }
```

### 2.2 Decorator

**Scenario**: thêm capability cho object mà không sửa code gốc. Như lắp ốp phone — phone function unchanged, thêm protection.

```javascript
// Base log
function log(message) {
  console.log(message)
}

// Decorate: timestamp
function withTimestamp(fn) {
  return (message) => fn(`[${new Date().toISOString()}] ${message}`)
}

// Decorate: log level
function withLevel(fn, level) {
  return (message) => fn(`[${level}] ${message}`)
}

const enhancedLog = withTimestamp(withLevel(log, 'INFO'))
enhancedLog('Server started')
// [2025-01-15T10:30:00.000Z] [INFO] Server started
```

---

## 3. Behavioral patterns

### 3.1 Observer

**Scenario**: 1 object state đổi → auto notify nhiều object khác. Vd user place order → đồng thời send email, trừ stock, log.

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data))
  }
}

const bus = new EventEmitter()
bus.on('order:created', (order) => console.log('Send confirm email', order.id))
bus.on('order:created', (order) => console.log('Deduct stock', order.id))
bus.emit('order:created', { id: 'ORD-001' })
```

### 3.2 Strategy

**Scenario**: cùng op có nhiều algo/strategy, switch runtime. Vd sort method khác, price calc khác.

```javascript
const pricingStrategies = {
  normal: (price) => price,
  vip: (price) => price * 0.8,
  svip: (price) => price * 0.6
}

function calculatePrice(price, memberLevel) {
  const strategy = pricingStrategies[memberLevel] || pricingStrategies.normal
  return strategy(price)
}

calculatePrice(100, 'vip')  // 80
calculatePrice(100, 'svip') // 60
```

<PatternPlaygroundDemo />

---

## 4. Chọn pattern thế nào?

| Vấn đề bạn gặp | Recommend | Core idea |
|-------------|---------|---------|
| Global chỉ 1 instance | Singleton | Control instance count |
| Theo condition tạo object | Factory | Encapsulate creation |
| Interface không compat | Adapter | Wrap layer convert |
| Dynamic add feature | Decorator | Layered wrap enhance |
| State đổi notify multi | Observer | Pub-sub decouple |
| Multi algo switch runtime | Strategy | Algo as object |

::: tip Core principle
Pattern không nhiều = tốt. **Over-design** + **no design** đều tệ. Chỉ dùng pattern khi thực sự cần flexibility. Simple problem → simple solution. **KISS**: Keep It Simple, Stupid.
:::

---

## 5. AI assist learn + apply pattern

### 5.1 Identify pattern

> **Prompt**:
> ```
> Analyze code, judge có chỗ improve bằng pattern không.
> Nếu có:
> 1. Vấn đề code hiện tại
> 2. Recommend pattern nào
> 3. Refactored code example
> 4. Sao pattern này phù hợp scenario
>
> [paste code]
> ```

### 5.2 Học pattern qua scenario

> **Prompt**:
> ```
> "Food delivery system" scenario, demo pattern application:
> - Factory: tạo order type khác
> - Observer: order status change notify
> - Strategy: delivery fee calc rule khác
>
> JS code example, mỗi pattern show vấn đề không pattern trước,
> rồi improvement sau pattern.
> ```

### 5.3 Check over-design

> **Prompt**:
> ```
> Review code, judge over-design không.
> Có abstraction unnecessary, pattern không cần, premature optimization?
> Nếu có, suggest simplify, follow KISS.
>
> [paste code]
> ```

::: tip AI caveat
Let AI dùng business scenario quen explain pattern hiệu quả hơn abstract UML. Nhưng nhớ: AI có thể tend recommend complex solution, bạn phải tự judge có cần thật không.
:::

---

## 6. Tổng kết

1. **Creational**: giải "tạo object thế nào"
2. **Structural**: giải "tổ chức code thế nào"
3. **Behavioral**: giải "object interact thế nào"
4. **Flexible apply**: theo scenario, đừng "dùng pattern vì pattern"

::: tip Insight cuối
Pattern bản chất = **manage change**. Design tốt = phần đổi dễ sửa, phần stable giữ. Khi viết code, hỏi mình: "Nếu requirement đổi, phải sửa bao nhiêu chỗ?" — nếu "nhiều chỗ" = có thể cần pattern.
:::

::: tip 2026 cho VN dev
- **Modern JS patterns**:
  - **Module pattern**: ES Modules native
  - **Async iterator**: thay observer trong nhiều case
  - **Higher-order function**: replace many patterns
  - **React hooks**: declarative pattern thay class
- **VN context**:
  - Enterprise Java: pattern dùng nhiều (Factory, Builder, Template Method)
  - Modern JS/TS: pattern simplified bằng language feature
- **AI + pattern**: Copilot, Cursor recognize + apply pattern auto. Hiểu pattern → review AI code tốt hơn.
:::

## Tài liệu

- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [GoF Design Patterns book](https://en.wikipedia.org/wiki/Design_Patterns)
- [JavaScript Patterns (Stoyan Stefanov)](https://www.oreilly.com/library/view/javascript-patterns/9781449399115/)
- [SOLID principles](https://en.wikipedia.org/wiki/SOLID)
