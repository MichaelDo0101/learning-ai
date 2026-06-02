<template>
  <section ref="rootEl" class="hero-stats">
    <div class="stats-grid">
      <div
        v-for="(s, idx) in stats"
        :key="idx"
        class="stat-card"
      >
        <div class="stat-icon"><EvIcon :emoji="s.icon" /></div>
        <div class="stat-number">
          <span class="counter">{{ displayValues[idx] }}</span><span class="suffix">{{ s.suffix }}</span>
        </div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isEN = computed(() => (lang.value || 'vi-VN').toLowerCase().startsWith('en'))

const i18n = {
  vi: {
    modules: 'Module học',
    chapters: 'Chapter chi tiết',
    videos: 'Video YouTube',
    cases: 'Case study thực'
  },
  en: {
    modules: 'Learning modules',
    chapters: 'Detailed chapters',
    videos: 'YouTube videos',
    cases: 'Real case studies'
  }
}

const t = computed(() => isEN.value ? i18n.en : i18n.vi)

const stats = computed(() => [
  { icon: '📚', target: 8, suffix: '', label: t.value.modules },
  { icon: '📖', target: 200, suffix: '+', label: t.value.chapters },
  { icon: '🎥', target: 45, suffix: '+', label: t.value.videos },
  { icon: '🌟', target: 80, suffix: '+', label: t.value.cases }
])

const displayValues = ref(stats.value.map(() => 0))
const rootEl = ref(null)
let observer = null
let started = false

function animateCounters() {
  if (started) return
  started = true

  stats.value.forEach((s, idx) => {
    const duration = 1800
    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      displayValues.value[idx] = Math.round(s.target * eased)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        displayValues.value[idx] = s.target
      }
    }

    setTimeout(() => requestAnimationFrame(step), idx * 120)
  })
}

onMounted(() => {
  if (!rootEl.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.hero-stats {
  max-width: 1280px;
  margin: -20px auto 40px;
  padding: 0 24px;
  position: relative;
  z-index: 2;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .stats-grid { grid-template-columns: repeat(4, 1fr); }
}

.stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-3);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-icon {
  font-size: 28px;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 6px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
}

.counter {
  display: inline-block;
}

.suffix {
  display: inline-block;
}

@media (min-width: 768px) {
  .stat-number { font-size: 44px; }
}

.stat-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .stat-label { font-size: 14px; }
}
</style>
