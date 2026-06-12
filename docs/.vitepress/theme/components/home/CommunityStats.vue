<template>
  <section class="community-stats">
    <div class="header">
      <h2>{{ t.title }}</h2>
      <p class="subtitle">{{ t.subtitle }}</p>
    </div>

    <div class="stats-bar">
      <a
        v-for="(s, idx) in items"
        :key="idx"
        :href="s.link"
        :target="s.external ? '_blank' : '_self'"
        :rel="s.external ? 'noopener' : ''"
        class="stat-item"
      >
        <div class="stat-icon"><EvIcon :emoji="s.icon" /></div>
        <div class="stat-content">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
        <div v-if="s.external" class="external-arrow">↗</div>
      </a>
    </div>

    <div class="cta-row">
      <a
        href="https://github.com/aiecosvietnam/learning-ai"
        target="_blank"
        rel="noopener"
        class="cta-primary"
      >
        ⭐ {{ t.ctaStar }}
      </a>
      <a
        href="https://github.com/aiecosvietnam/learning-ai/issues"
        target="_blank"
        rel="noopener"
        class="cta-secondary"
      >
        💬 {{ t.ctaIssues }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isEN = computed(() => (lang.value || 'vi-VN').toLowerCase().startsWith('en'))

const i18n = {
  vi: {
    title: '🌍 Cộng đồng Task AI Wiki',
    subtitle: 'Open-source, multi-language, miễn phí. Build cùng cộng đồng dev VN + global.',
    ctaStar: 'Star trên GitHub',
    ctaIssues: 'Tham gia thảo luận',
    locales: 'Ngôn ngữ',
    contrib: 'Đóng góp viên',
    chapters: 'Chapter mở',
    stars: 'GitHub stars'
  },
  en: {
    title: '🌍 Task AI Wiki Community',
    subtitle: 'Open-source, multi-language, free. Built with VN + global dev community.',
    ctaStar: 'Star on GitHub',
    ctaIssues: 'Join discussions',
    locales: 'Languages',
    contrib: 'Contributors',
    chapters: 'Open chapters',
    stars: 'GitHub stars'
  }
}

const t = computed(() => isEN.value ? i18n.en : i18n.vi)

const items = computed(() => [
  {
    icon: '⭐',
    value: '2.7K+',
    label: t.value.stars,
    link: 'https://github.com/aiecosvietnam/learning-ai',
    external: true
  },
  {
    icon: '🌐',
    value: '2',
    label: t.value.locales,
    link: '/',
    external: false
  },
  {
    icon: '👥',
    value: '50+',
    label: t.value.contrib,
    link: 'https://github.com/aiecosvietnam/learning-ai/graphs/contributors',
    external: true
  },
  {
    icon: '📖',
    value: '200+',
    label: t.value.chapters,
    link: '/',
    external: false
  }
])
</script>

<style scoped>
.community-stats {
  max-width: 1100px;
  margin: 80px auto 40px;
  padding: 0 24px;
}

.header {
  text-align: center;
  margin-bottom: 28px;
}

.header h2 {
  font-size: 28px;
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
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
}

@media (min-width: 640px) {
  .stats-bar { grid-template-columns: repeat(4, 1fr); }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  position: relative;
}

.stat-item:hover {
  background: var(--vp-c-bg);
}

.stat-icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.external-arrow {
  font-size: 14px;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.stat-item:hover .external-arrow {
  color: var(--vp-c-brand-1);
}

.cta-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-primary,
.cta-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cta-primary {
  background: var(--vp-c-brand-1);
  color: white;
  border: 1px solid var(--vp-c-brand-1);
}

.cta-primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.cta-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.cta-secondary:hover {
  border-color: var(--vp-c-brand-3);
  transform: translateY(-1px);
}
</style>
