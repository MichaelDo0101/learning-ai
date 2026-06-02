<template>
  <section class="module-showcase">
    <div class="header">
      <h2>{{ t.title }}</h2>
      <p class="subtitle">{{ t.subtitle }}</p>
    </div>

    <div class="grid">
      <a
        v-for="(m, idx) in modules"
        :key="idx"
        :href="basePath + m.link"
        class="card"
        :class="{ 'card-new': m.isNew }"
      >
        <div class="card-icon"><EvIcon :emoji="m.icon" /></div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">{{ m.title }}</h3>
            <span v-if="m.isNew" class="badge-new">{{ t.newLabel }}</span>
          </div>
          <p class="card-desc">{{ m.desc }}</p>
          <div class="card-meta">
            <span class="meta-item">📚 {{ m.chapters }}</span>
            <span class="meta-item">{{ m.audience }}</span>
          </div>
        </div>
        <div class="card-arrow">→</div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const basePath = computed(() => {
  const l = lang.value || 'vi-VN'
  return l.toLowerCase().startsWith('en') ? '/en' : '/vi-vn'
})

const i18n = {
  vi: {
    title: '📚 8 Module học tập',
    subtitle: 'Chọn module phù hợp với mục tiêu của bạn — từ con số 0 đến ship product có user thật.',
    newLabel: 'MỚI'
  },
  en: {
    title: '📚 8 Learning Modules',
    subtitle: 'Pick the module matching your goal — from zero to shipping product with real users.',
    newLabel: 'NEW'
  }
}

const t = computed(() =>
  (lang.value || 'vi-VN').toLowerCase().startsWith('en') ? i18n.en : i18n.vi
)

const modulesByLocale = {
  vi: [
    {
      icon: '🎮',
      title: 'Stage 0 — Mầm non AI',
      desc: 'Học AI Coding qua games. Bắt đầu từ con số 0 tuyệt đối.',
      chapters: '3 chapters',
      audience: '👶 Mới hoàn toàn',
      link: '/stage-0/'
    },
    {
      icon: '🚀',
      title: 'Stage 1 — PM & Người mới',
      desc: 'Build AI prototype, học AI IDE, product thinking. Từ idea đến demo.',
      chapters: '12 chapters',
      audience: '💼 PM / Designer / Người mới',
      link: '/stage-1/learning-map/'
    },
    {
      icon: '🛠️',
      title: 'Stage 2 — Full Stack Dev',
      desc: 'Frontend + Backend + DB + Deploy. Build full app có user thật.',
      chapters: '20+ chapters',
      audience: '💻 Dev sơ-trung cấp',
      link: '/stage-2/frontend/lovart-assets/'
    },
    {
      icon: '⚙️',
      title: 'Stage 3 — Senior Dev',
      desc: 'Cross-platform: mini program, mobile app, MCP, browser extension.',
      chapters: '20+ chapters',
      audience: '🎓 Senior dev',
      link: '/stage-3/core-skills/basics/'
    },
    {
      icon: '📖',
      title: 'Vibe Stories',
      desc: 'Câu chuyện thật từ tài xế 48 tuổi, sinh viên, giáo viên... build product với AI.',
      chapters: '4 stories',
      audience: '🌟 Mọi đối tượng',
      link: '/vibe-stories/story-1'
    },
    {
      icon: '🎨',
      title: 'Generative AI',
      desc: '1 người = 1 hãng phim/studio: tạo ảnh/video/nhạc, giữ nhân vật nhất quán, automation + monetization 2026.',
      chapters: '10 chương',
      audience: '🎬 Creator / Founder',
      link: '/generative-ai/',
      isNew: true
    },
    {
      icon: '🤖',
      title: 'Agentic AI',
      desc: 'LLM tự lái: agent loop, tool & context, multi-agent, MCP, eval, safety — đến production.',
      chapters: '12 chương',
      audience: '💻 Dev / Founder / Operator',
      link: '/agentic-ai/',
      isNew: true
    },
    {
      icon: '📚',
      title: 'Appendix — Phụ lục',
      desc: 'Tra cứu chuyên sâu: computer fundamentals → AI → engineering excellence.',
      chapters: '104 files',
      audience: '🔬 Tham khảo',
      link: '/appendix/'
    }
  ],
  en: [
    {
      icon: '🎮',
      title: 'Stage 0 — AI Kindergarten',
      desc: 'Learn AI Coding through games. Start from absolute zero.',
      chapters: '3 chapters',
      audience: '👶 Complete beginner',
      link: '/stage-0/'
    },
    {
      icon: '🚀',
      title: 'Stage 1 — PM & Beginners',
      desc: 'Build AI prototypes, learn AI IDE, product thinking. Idea to demo.',
      chapters: '12 chapters',
      audience: '💼 PM / Designer / Beginner',
      link: '/stage-1/learning-map/'
    },
    {
      icon: '🛠️',
      title: 'Stage 2 — Full Stack Dev',
      desc: 'Frontend + Backend + DB + Deploy. Build apps with real users.',
      chapters: '20+ chapters',
      audience: '💻 Jr/Mid developer',
      link: '/stage-2/frontend/lovart-assets/'
    },
    {
      icon: '⚙️',
      title: 'Stage 3 — Senior Dev',
      desc: 'Cross-platform: mini programs, mobile, MCP, browser extensions.',
      chapters: '20+ chapters',
      audience: '🎓 Senior developer',
      link: '/stage-3/core-skills/basics/'
    },
    {
      icon: '📖',
      title: 'Vibe Stories',
      desc: 'Real stories: 48yo truck driver, student, teacher — building with AI.',
      chapters: '4 stories',
      audience: '🌟 Everyone',
      link: '/vibe-stories/story-1'
    },
    {
      icon: '🎨',
      title: 'Generative AI',
      desc: '1 person = 1 studio: image/video/music, character consistency, automation + monetization 2026.',
      chapters: '10 chapters',
      audience: '🎬 Creator / Founder',
      link: '/generative-ai/',
      isNew: true
    },
    {
      icon: '🤖',
      title: 'Agentic AI',
      desc: 'LLMs self-drive: agent loop, tools & context, multi-agent, MCP, eval, safety — to production.',
      chapters: '12 chapters',
      audience: '💻 Dev / Founder / Operator',
      link: '/agentic-ai/',
      isNew: true
    },
    {
      icon: '📚',
      title: 'Appendix',
      desc: 'Deep reference: computer fundamentals → AI → engineering excellence.',
      chapters: '104 files',
      audience: '🔬 Reference',
      link: '/appendix/'
    }
  ]
}

const modules = computed(() =>
  (lang.value || 'vi-VN').toLowerCase().startsWith('en')
    ? modulesByLocale.en
    : modulesByLocale.vi
)
</script>

<style scoped>
.module-showcase {
  max-width: 1280px;
  margin: 60px auto 40px;
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

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-3);
}

.card-new {
  border-color: var(--vp-c-brand-1);
  background: linear-gradient(135deg, var(--vp-c-bg-soft), rgba(99, 102, 241, 0.05));
}

.card-icon {
  font-size: 36px;
  margin-bottom: 12px;
  line-height: 1;
}

.card-body {
  flex: 1;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.badge-new {
  display: inline-block;
  padding: 2px 8px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: 4px;
}

.card-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 12px;
}

.card-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  flex-wrap: wrap;
}

.meta-item {
  padding: 2px 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.card-arrow {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 18px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--vp-c-brand-1);
}
</style>
