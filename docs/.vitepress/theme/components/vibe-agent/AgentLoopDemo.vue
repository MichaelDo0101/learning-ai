<template>
  <div class="agent-loop-demo">
    <div class="header">
      <h3>🤖 ReAct Loop — Agent suy nghĩ thế nào?</h3>
      <p class="subtitle">
        Click <strong>"Run step"</strong> để xem agent loop từng bước.
      </p>
    </div>

    <div class="task-input">
      <label>Task của agent:</label>
      <select v-model="currentTask" @change="resetLoop">
        <option v-for="t in tasks" :key="t.id" :value="t.id">
          {{ t.label }}
        </option>
      </select>
    </div>

    <div class="loop-visualization">
      <div
        v-for="(step, idx) in visibleSteps"
        :key="idx"
        class="step"
        :class="['step-' + step.type, idx === visibleSteps.length - 1 ? 'active' : '']"
      >
        <div class="step-icon">{{ stepIcon(step.type) }}</div>
        <div class="step-content">
          <div class="step-type">{{ stepLabel(step.type) }} #{{ stepNumber(idx) }}</div>
          <div class="step-text">{{ step.text }}</div>
        </div>
      </div>

      <div v-if="isDone" class="step step-done">
        <div class="step-icon">✅</div>
        <div class="step-content">
          <div class="step-type">Done</div>
          <div class="step-text">Agent hoàn thành task.</div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        @click="runStep"
        :disabled="isDone"
        class="btn-primary"
      >
        ▶ Run step
      </button>
      <button @click="resetLoop" class="btn-secondary">
        ↻ Reset
      </button>
      <button @click="runAll" :disabled="isDone" class="btn-secondary">
        ⏩ Run all
      </button>
    </div>

    <div class="legend">
      <div><span class="dot dot-thought"></span> <strong>Thought</strong> — agent suy nghĩ kế tiếp</div>
      <div><span class="dot dot-action"></span> <strong>Action</strong> — gọi tool</div>
      <div><span class="dot dot-observation"></span> <strong>Observation</strong> — đọc kết quả tool</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tasks = [
  {
    id: 'weather',
    label: 'Check weather in Hanoi',
    steps: [
      { type: 'thought', text: 'User hỏi thời tiết Hà Nội. Cần gọi tool weather API.' },
      { type: 'action', text: 'get_weather(city="Hanoi")' },
      { type: 'observation', text: '{"temp": 28, "condition": "sunny", "humidity": 70}' },
      { type: 'thought', text: 'Có data rồi. Format reply cho user.' },
      { type: 'final', text: 'Hà Nội hôm nay 28°C, nắng, độ ẩm 70%.' }
    ]
  },
  {
    id: 'order',
    label: 'Lookup order status',
    steps: [
      { type: 'thought', text: 'User hỏi đơn #12345. Search trong CRM.' },
      { type: 'action', text: 'search_order(id="12345")' },
      { type: 'observation', text: 'Không tìm thấy. Có thể typo.' },
      { type: 'thought', text: 'Fallback: search theo customer email.' },
      { type: 'action', text: 'search_order_by_email(email="user@example.com")' },
      { type: 'observation', text: '{"order_id": "12354", "status": "shipped", "eta": "2026-05-30"}' },
      { type: 'thought', text: 'Tìm thấy. Confirm với user.' },
      { type: 'final', text: 'Đơn của bạn có thể là #12354, đã ship, dự kiến 30/5.' }
    ]
  },
  {
    id: 'security',
    label: 'Audit code for SQL injection',
    steps: [
      { type: 'thought', text: 'Cần scan /src/db/ for SQL injection pattern.' },
      { type: 'action', text: 'grep("(.exec|.query)", "/src/db/")' },
      { type: 'observation', text: '12 match found. /src/db/users.ts:42, /src/db/orders.ts:18, ...' },
      { type: 'thought', text: 'Spawn sub-agent verify từng match (orchestrator-worker pattern).' },
      { type: 'action', text: 'spawn_subagents(matches=[12], model="haiku")' },
      { type: 'observation', text: '3 confirmed vulnerable: users.ts:42, orders.ts:18, products.ts:91' },
      { type: 'thought', text: 'Generate fix report.' },
      { type: 'final', text: 'Report: 3 SQL injection found + suggested fix (parameterized query).' }
    ]
  }
]

const currentTask = ref('weather')
const stepIndex = ref(0)

const currentSteps = computed(() =>
  tasks.find((t) => t.id === currentTask.value)?.steps || []
)

const visibleSteps = computed(() =>
  currentSteps.value.slice(0, stepIndex.value)
)

const isDone = computed(() => stepIndex.value >= currentSteps.value.length)

function stepIcon(type) {
  return {
    thought: '💭',
    action: '🔧',
    observation: '👁️',
    final: '🎯'
  }[type] || '•'
}

function stepLabel(type) {
  return {
    thought: 'Thought',
    action: 'Action',
    observation: 'Observation',
    final: 'Final answer'
  }[type] || type
}

function stepNumber(idx) {
  const slice = currentSteps.value.slice(0, idx + 1)
  const type = currentSteps.value[idx]?.type
  return slice.filter((s) => s.type === type).length
}

function runStep() {
  if (stepIndex.value < currentSteps.value.length) {
    stepIndex.value++
  }
}

function runAll() {
  stepIndex.value = currentSteps.value.length
}

function resetLoop() {
  stepIndex.value = 0
}
</script>

<style scoped>
.agent-loop-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
  background: var(--vp-c-bg-soft);
}

.header h3 {
  margin: 0 0 4px;
  font-size: 18px;
}

.header .subtitle {
  margin: 0 0 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.task-input {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.task-input label {
  font-weight: 500;
}

.task-input select {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.loop-visualization {
  min-height: 100px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.step {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 3px solid;
  opacity: 0;
  transform: translateY(8px);
  animation: stepIn 0.3s ease forwards;
}

@keyframes stepIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step.active {
  box-shadow: 0 0 0 2px var(--vp-c-brand-3);
}

.step-thought {
  background: rgba(99, 102, 241, 0.08);
  border-left-color: rgb(99, 102, 241);
}

.step-action {
  background: rgba(245, 158, 11, 0.08);
  border-left-color: rgb(245, 158, 11);
}

.step-observation {
  background: rgba(34, 197, 94, 0.08);
  border-left-color: rgb(34, 197, 94);
}

.step-final, .step-done {
  background: rgba(168, 85, 247, 0.08);
  border-left-color: rgb(168, 85, 247);
}

.step-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-type {
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.step-text {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.btn-primary, .btn-secondary {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-secondary {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.btn-primary:disabled, .btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary:not(:disabled):hover {
  opacity: 0.9;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}

.dot-thought { background: rgb(99, 102, 241); }
.dot-action { background: rgb(245, 158, 11); }
.dot-observation { background: rgb(34, 197, 94); }
</style>
