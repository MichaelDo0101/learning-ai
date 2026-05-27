<template>
  <section class="testimonials">
    <div class="header">
      <h2>{{ t.title }}</h2>
      <p class="subtitle">{{ t.subtitle }}</p>
    </div>

    <div class="carousel" @mouseenter="pause" @mouseleave="resume">
      <transition name="slide" mode="out-in">
        <div :key="activeIdx" class="testimonial-card">
          <div class="quote-mark">"</div>
          <blockquote class="quote">{{ active.quote }}</blockquote>
          <div class="author">
            <div class="author-avatar" :style="{ background: active.avatarBg }">
              {{ active.avatarText }}
            </div>
            <div class="author-info">
              <div class="author-name">{{ active.name }}</div>
              <div class="author-title">{{ active.title }}</div>
              <div v-if="active.source" class="author-source">{{ active.source }}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="controls">
      <button
        v-for="(_item, idx) in testimonials"
        :key="idx"
        class="dot"
        :class="{ active: idx === activeIdx }"
        :aria-label="`Testimonial ${idx + 1}`"
        @click="goTo(idx)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isEN = computed(() => (lang.value || 'vi-VN').toLowerCase().startsWith('en'))

const i18n = {
  vi: {
    title: '💬 Lời từ những người đã làm thật',
    subtitle: 'Quote từ creator, founder, giáo viên đã build product có user thật với AI.'
  },
  en: {
    title: '💬 From people who actually built',
    subtitle: 'Quotes from creators, founders, teachers who shipped real AI products with users.'
  }
}

const t = computed(() => isEN.value ? i18n.en : i18n.vi)

const testimonialsByLocale = {
  vi: [
    {
      quote: 'Without AI it would have taken me 10-100x more time. AI really is a creativity and speed maximizer.',
      name: 'Pieter Levels',
      title: 'Solo indie hacker — PhotoAI $1.65M ARR',
      source: 'X / @levelsio · 600K+ followers',
      avatarText: 'PL',
      avatarBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      quote: 'Tôi không biết hát. Tôi viết thơ. Suno hát hộ. Hallwood trả 3 triệu đô.',
      name: 'Telisha Jones (Xania Monet)',
      title: 'Nhà thơ Mississippi — AI artist đầu tiên trên Billboard',
      source: 'Billboard · 1.4M monthly Spotify',
      avatarText: 'TJ',
      avatarBg: 'linear-gradient(135deg, #ec4899, #f97316)'
    },
    {
      quote: '14,000 dòng PHP raw. 0 nhân viên. $132K MRR. Ship fast. Ship ugly. Ship in public.',
      name: 'Pieter Levels',
      title: 'PhotoAI builder',
      source: 'Tweet 4.8M views',
      avatarText: 'PL',
      avatarBg: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
      quote: 'I just see stuff, say stuff, run stuff, and copy-paste stuff, and it mostly works.',
      name: 'Andrej Karpathy',
      title: 'Coined "vibe coding"',
      source: 'X — Feb 2025',
      avatarText: 'AK',
      avatarBg: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
    },
    {
      quote: 'AI is a teacher with boundless patience.',
      name: 'Hongyan AI Project',
      title: 'Rural China AI tutor',
      source: 'UNESCO Courier · 2025',
      avatarText: '智',
      avatarBg: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
      quote: 'Đừng sợ, chỉ cần bạn muốn khởi hành, lúc nào cũng không muộn. Vô-lăng, ngay trong tay bạn!',
      name: 'Anh Hoàng',
      title: 'Tài xế xe tải 48 tuổi → solo dev AI go-global',
      source: 'Story #4 Vibe Stories',
      avatarText: '驾',
      avatarBg: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    },
    {
      quote: 'Burned through entire 2026 AI budget in 4 months. Claude Code adoption: 32% → 84%.',
      name: 'Praveen Neppalli Naga',
      title: 'CTO Uber',
      source: 'Startup Fortune · 2026',
      avatarText: 'UB',
      avatarBg: 'linear-gradient(135deg, #ef4444, #f59e0b)'
    },
    {
      quote: 'I built everything on Lovable — the website, the desktop app, the backend workflows — all without an engineering degree.',
      name: 'Sabrine Matos',
      title: 'Solo founder Brazil — Plinq $456K ARR/3 tháng',
      source: 'Lovable blog · 2025',
      avatarText: 'SM',
      avatarBg: 'linear-gradient(135deg, #10b981, #3b82f6)'
    }
  ],
  en: [
    {
      quote: 'Without AI it would have taken me 10-100x more time. AI really is a creativity and speed maximizer.',
      name: 'Pieter Levels',
      title: 'Solo indie hacker — PhotoAI $1.65M ARR',
      source: 'X / @levelsio · 600K+ followers',
      avatarText: 'PL',
      avatarBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      quote: 'I can\'t sing. I write poems. Suno sings them. Hallwood paid $3 million.',
      name: 'Telisha Jones (Xania Monet)',
      title: 'Mississippi poet — first AI artist on Billboard',
      source: 'Billboard · 1.4M monthly Spotify',
      avatarText: 'TJ',
      avatarBg: 'linear-gradient(135deg, #ec4899, #f97316)'
    },
    {
      quote: '14,000 lines of raw PHP. 0 employees. $132K MRR. Ship fast. Ship ugly. Ship in public.',
      name: 'Pieter Levels',
      title: 'PhotoAI builder',
      source: 'Tweet 4.8M views',
      avatarText: 'PL',
      avatarBg: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
      quote: 'I just see stuff, say stuff, run stuff, and copy-paste stuff, and it mostly works.',
      name: 'Andrej Karpathy',
      title: 'Coined "vibe coding"',
      source: 'X — Feb 2025',
      avatarText: 'AK',
      avatarBg: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
    },
    {
      quote: 'AI is a teacher with boundless patience.',
      name: 'Hongyan AI Project',
      title: 'Rural China AI tutor',
      source: 'UNESCO Courier · 2025',
      avatarText: '智',
      avatarBg: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
      quote: 'Don\'t be afraid. As long as you want to start, it\'s never too late. The steering wheel is in your hands!',
      name: 'Anh Hoàng',
      title: '48yo truck driver → solo dev AI global',
      source: 'Story #4 Vibe Stories',
      avatarText: '驾',
      avatarBg: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    },
    {
      quote: 'Burned through entire 2026 AI budget in 4 months. Claude Code adoption: 32% → 84%.',
      name: 'Praveen Neppalli Naga',
      title: 'CTO Uber',
      source: 'Startup Fortune · 2026',
      avatarText: 'UB',
      avatarBg: 'linear-gradient(135deg, #ef4444, #f59e0b)'
    },
    {
      quote: 'I built everything on Lovable — the website, the desktop app, the backend workflows — all without an engineering degree.',
      name: 'Sabrine Matos',
      title: 'Solo founder Brazil — Plinq $456K ARR in 3 months',
      source: 'Lovable blog · 2025',
      avatarText: 'SM',
      avatarBg: 'linear-gradient(135deg, #10b981, #3b82f6)'
    }
  ]
}

const testimonials = computed(() => isEN.value ? testimonialsByLocale.en : testimonialsByLocale.vi)
const activeIdx = ref(0)
const active = computed(() => testimonials.value[activeIdx.value])

let timer = null
const AUTO_INTERVAL = 6000

function next() {
  activeIdx.value = (activeIdx.value + 1) % testimonials.value.length
}

function goTo(idx) {
  activeIdx.value = idx
  restart()
}

function pause() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resume() {
  if (!timer) {
    timer = setInterval(next, AUTO_INTERVAL)
  }
}

function restart() {
  pause()
  resume()
}

onMounted(() => resume())
onBeforeUnmount(() => pause())
</script>

<style scoped>
.testimonials {
  max-width: 900px;
  margin: 80px auto 40px;
  padding: 0 24px;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.header h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  border: none;
  padding: 0;
}

.subtitle {
  font-size: 17px;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.carousel {
  position: relative;
  min-height: 240px;
}

.testimonial-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 40px 32px 28px;
  text-align: center;
}

.quote-mark {
  position: absolute;
  top: 0;
  left: 24px;
  font-size: 90px;
  line-height: 1;
  color: var(--vp-c-brand-1);
  opacity: 0.18;
  font-family: Georgia, serif;
  font-weight: 700;
}

.quote {
  font-size: 19px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.55;
  margin: 0 0 24px;
  color: var(--vp-c-text-1);
  position: relative;
  z-index: 1;
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
}

.author-info {
  text-align: left;
}

.author-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.author-title {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 2px;
}

.author-source {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.dot:hover {
  background: var(--vp-c-brand-3);
}

.dot.active {
  background: var(--vp-c-brand-1);
  width: 24px;
  border-radius: 4px;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
