# State Management Philosophy

::: tip Mở đầu
**Khi project phức tạp, data lưu đâu? Sao team A trên component không thấy team B?** Đây là vấn đề **state management** giải. Chương này từ component → cross-component communication → centralized state management toàn diện.
:::

---

## 1. Sao cần "componentization + state management"?

Project nhỏ, data flow đơn giản. Project lớn:
- 100+ component
- Component A đổi data, B + C cần update
- User info dùng ở 20 chỗ
- Multi-team dev, không thể mỗi người tự manage

**State management** = chiến lược tổ chức + share data trong app.

---

## 2. Componentization core

### 2.1 Component = data + UI + logic

```vue
<template>
  <div>
    <h3>{{ count }}</h3>
    <button @click="count++">+</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
```

3 loại data:
1. **Local state**: chỉ component này dùng (vd input value)
2. **Shared state**: nhiều component dùng (vd user info)
3. **Server state**: từ API (vd product list)

### 2.2 Single source of truth

**Nguyên tắc vàng**: 1 piece of data, **1 nguồn đúng duy nhất**. Component khác đọc, không clone.

❌ Bad:
```javascript
// Component A
const user = { name: 'Hoàng' }

// Component B
const user = { name: 'Hoàng' }  // Duplicate!
```

✅ Good:
```javascript
// Centralized store
export const userStore = { name: 'Hoàng' }

// A + B đều import store
import { userStore } from './store'
```

---

## 3. Evolution: component communication

### 3.1 Stage 1: Props + Events (basic)

```vue
<!-- Parent -->
<Child :user="user" @update="handleUpdate" />

<!-- Child -->
<script setup>
const props = defineProps(['user'])
const emit = defineEmits(['update'])
function changeUser() {
  emit('update', { name: 'Linh' })
}
</script>
```

**Lợi**: rõ ràng, type-safe.
**Hại**: deep nesting → **prop drilling** (pass qua nhiều layer).

### 3.2 Stage 2: Provide/Inject (React: Context)

Vue:
```vue
<!-- Top component -->
<script setup>
import { provide } from 'vue'
provide('user', { name: 'Hoàng' })
</script>

<!-- Deep nested child -->
<script setup>
import { inject } from 'vue'
const user = inject('user')  // Không cần pass qua middle
</script>
```

React:
```jsx
const UserContext = createContext()

function App() {
  return (
    <UserContext.Provider value={{ name: 'Hoàng' }}>
      <Child />
    </UserContext.Provider>
  )
}

function DeepChild() {
  const user = useContext(UserContext)
  return <div>{user.name}</div>
}
```

**Lợi**: tránh prop drilling.
**Hại**: vẫn local scope (không global).

### 3.3 Stage 3: Centralized state (Vuex/Pinia/Redux/Zustand)

Khi state phức tạp + share toàn app → centralized store.

---

## 4. State management libs

### 4.1 Vuex (Vue 2/3 legacy)

```javascript
const store = createStore({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++ }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000)
    }
  }
})

// Trong component
store.commit('increment')
store.dispatch('incrementAsync')
```

**Nhược**: boilerplate nhiều (mutation, action tách).

### 4.2 Pinia (Vue 3 official, modern)

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ },
    async fetchData() { /* ... */ }
  }
})

// Component
const counter = useCounterStore()
counter.increment()
```

**Lợi**: TypeScript tốt, no mutation, DevTools tốt.

### 4.3 Redux Toolkit (React standard)

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 }
  }
})

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
})

// Component
const dispatch = useDispatch()
const count = useSelector(state => state.counter.value)
dispatch(counterSlice.actions.increment())
```

**Lợi**: predictable, time-travel debug, ecosystem mạnh.
**Nhược**: learning curve.

### 4.4 Zustand (React lightweight)

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))

// Component
const { count, increment } = useStore()
```

**Lợi**: cực đơn giản, TypeScript tốt.
**Hợp**: project small-medium.

### 4.5 Comparison

| Lib | Framework | Boilerplate | Learning | Use |
|------|-------|---------|---------|---------|
| Vuex | Vue | Nhiều | Trung | Legacy |
| Pinia | Vue 3 | Ít | Dễ | Mới |
| Redux Toolkit | React | Trung | Trung | Large, team |
| Zustand | React | Cực ít | Cực dễ | Small-medium |
| Jotai | React | Ít | Trung | Atomic state |
| Valtio | React | Ít | Dễ | Proxy-based |

---

## 5. Design state management thế nào?

### 5.1 State có phải global?

Hỏi 3 câu:
1. **Nhiều component cần?** Có → có thể global
2. **Cross-page persistent?** Có → global (vd login state)
3. **Server data?** → state library riêng (TanStack Query, SWR)

| Loại data | Lưu đâu |
|----------|----------|
| Form input | Local component |
| Modal show/hide | Local component |
| Current selection | Local component or URL |
| User info, theme | Global store |
| List query condition | URL query param |
| Server data | TanStack Query / SWR |

### 5.2 Server state ≠ client state

**Đừng cho server data vào Redux/Pinia!**

```javascript
// ❌ Bad
const store = {
  products: []  // Server data
}
async function fetchProducts() {
  store.products = await api.get('/products')
}

// ✅ Good (TanStack Query / SWR)
const { data: products, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => api.get('/products')
})
// Auto cache, refetch, retry, dedup
```

### 5.3 Normalize nested data

❌ Nested:
```javascript
const state = {
  posts: [
    { id: 1, author: { id: 1, name: 'Hoàng' } },
    { id: 2, author: { id: 1, name: 'Hoàng' } }  // Duplicate!
  ]
}
```

✅ Normalize:
```javascript
const state = {
  posts: { 1: { id: 1, authorId: 1 }, 2: { id: 2, authorId: 1 } },
  authors: { 1: { id: 1, name: 'Hoàng' } }
}
```

---

## 6. Common pits

### 6.1 Modify state trực tiếp (React/Redux)

```javascript
// ❌
state.items.push(newItem)  // Mutate state → React không re-render

// ✅
setItems([...state.items, newItem])  // New array
```

### 6.2 Store quá lớn

```javascript
// ❌ All-in-one store
const store = { user, products, cart, orders, ui, settings, ... }

// ✅ Split by domain
const userStore = ...
const cartStore = ...
const settingsStore = ...
```

### 6.3 Subscribe quá rộng

```javascript
// ❌ Toàn store
const everything = useStore()  // Re-render mỗi khi anything đổi

// ✅ Chỉ slice cần
const count = useStore(state => state.count)
```

### 6.4 Memory leak

Listener/subscription không cleanup:
```javascript
useEffect(() => {
  const unsub = store.subscribe(...)
  return () => unsub()  // Cleanup khi component unmount
}, [])
```

---

## 7. Recommend + tips

::: tip 💡 Chọn theo project
**Project nhỏ** (<10 component share state):
- Vue: Pinia hoặc composables
- React: Context + useReducer hoặc Zustand

**Project trung** (10-50 component):
- Vue: Pinia
- React: Zustand hoặc Redux Toolkit

**Project lớn** (50+ component, team lớn):
- Vue: Pinia + composables organize theo feature
- React: Redux Toolkit + RTK Query
- Server state: TanStack Query (cả 2)
:::

::: tip 2026 cho VN dev
- **TanStack Query là must**: server state mainstream cả Vue + React
- **Signals revolution**: Solid.js, Preact Signals, Angular Signals — fine-grained reactivity
- **XState**: state machine cho complex flow (wizard, multi-step form)
- **Jotai + Valtio (React)**: atomic + proxy-based, alternative Redux
- **VN dev**: Pinia (Vue) + Zustand (React) đủ cho 90% case
- **Persist state**: localStorage, indexedDB, hoặc Pinia-plugin-persistedstate
:::
