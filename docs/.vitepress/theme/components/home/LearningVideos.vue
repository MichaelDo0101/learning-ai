<template>
  <section class="learning-videos">
    <div class="header">
      <h2>{{ t.title }}</h2>
      <p class="subtitle">{{ t.subtitle }}</p>
    </div>

    <div class="filter-tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['filter-tab', { active: activeCat === cat.id }]"
        @click="activeCat = cat.id"
      >
        <EvIcon :emoji="cat.icon" /> {{ cat.label }}
      </button>
    </div>

    <div class="video-grid">
      <div
        v-for="(v, idx) in filteredVideos"
        :key="idx"
        class="video-card"
      >
        <div class="thumbnail-wrapper" @click="open(v)">
          <div v-if="!loadedVideos[v.id]" class="thumbnail">
            <img
              :src="`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`"
              :alt="v.title"
              loading="lazy"
              @error="onThumbnailError($event, v)"
            />
            <div class="play-button">▶</div>
            <div class="duration" v-if="v.duration">{{ v.duration }}</div>
          </div>
          <iframe
            v-else
            :src="`https://www.youtube.com/embed/${v.id}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="video-iframe"
          ></iframe>
        </div>

        <div class="video-info">
          <div class="video-tag">{{ v.module }}</div>
          <h3 class="video-title">{{ v.title }}</h3>
          <div class="video-meta">
            <span class="channel">📺 {{ v.channel }}</span>
            <a
              :href="`https://www.youtube.com/watch?v=${v.id}`"
              target="_blank"
              rel="noopener"
              class="youtube-link"
            >
              YouTube ↗
            </a>
          </div>
          <p class="video-why">{{ v.why }}</p>
        </div>
      </div>
    </div>

    <div class="footer-note">
      <p>{{ t.note }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isEN = computed(() => (lang.value || 'vi-VN').toLowerCase().startsWith('en'))

const i18n = {
  vi: {
    title: '🎥 Video học từ YouTube',
    subtitle: 'Curate từ những channel hàng đầu 2025-2026. Mỗi video link với 1 module để học sâu thêm.',
    note: '💡 Click thumbnail để play inline. Video curate T5/2026 — channel có thể release content mới hơn.',
    all: 'Tất cả',
    coding: 'Vibe Coding',
    generate: 'Vibe Generate',
    agent: 'Vibe Agent',
    vn: 'Tiếng Việt'
  },
  en: {
    title: '🎥 YouTube Learning Videos',
    subtitle: 'Curated from top channels 2025-2026. Each video linked to a module for deeper learning.',
    note: '💡 Click thumbnail to play inline. Videos curated May 2026 — channels may have newer content.',
    all: 'All',
    coding: 'Vibe Coding',
    generate: 'Vibe Generate',
    agent: 'Vibe Agent',
    vn: 'Vietnamese'
  }
}

const t = computed(() => isEN.value ? i18n.en : i18n.vi)

const categories = computed(() => [
  { id: 'all', icon: '🌐', label: t.value.all },
  { id: 'coding', icon: '💻', label: t.value.coding },
  { id: 'generate', icon: '🎨', label: t.value.generate },
  { id: 'agent', icon: '🤖', label: t.value.agent },
  { id: 'vn', icon: '🇻🇳', label: t.value.vn }
])

const activeCat = ref('all')

// Curated videos T5/2026 — known channels + likely-stable video IDs
// Note: URLs may need refresh if videos get removed
const videos = computed(() => [
  {
    id: 'LCEmiRjPEtQ',
    title: isEN.value
      ? 'Andrej Karpathy — Software Is Changing (Again)'
      : 'Andrej Karpathy — Software đang thay đổi (lần nữa)',
    channel: 'Y Combinator',
    duration: '40:00',
    module: isEN.value ? 'Foundation' : 'Nền tảng',
    cat: ['coding'],
    why: isEN.value
      ? 'The talk that coined "vibe coding". Essential foundational viewing.'
      : 'Buổi talk định nghĩa "vibe coding". Bắt buộc xem nếu mới bắt đầu.'
  },
  {
    id: 'EWvNQjAaOHw',
    title: isEN.value
      ? 'How I use LLMs — Andrej Karpathy'
      : 'Cách tôi dùng LLM — Andrej Karpathy',
    channel: 'Andrej Karpathy',
    duration: '2:11:32',
    module: isEN.value ? 'Foundation' : 'Nền tảng',
    cat: ['coding'],
    why: isEN.value
      ? '2-hour deep dive on practical LLM usage from the GOAT.'
      : 'Deep dive 2 tiếng về cách dùng LLM thực tế từ một trong những người giỏi nhất.'
  },
  {
    id: 'gv0WHhKelSE',
    title: isEN.value
      ? 'Claude Code: Best Practices for Agentic Coding'
      : 'Claude Code: Best Practices cho Agentic Coding',
    channel: 'Anthropic',
    duration: '30:00',
    module: 'Vibe Agent Ch 2',
    cat: ['agent'],
    why: isEN.value
      ? 'Official Anthropic guide to Claude Code. Sub-agent pattern, MCP, cost control.'
      : 'Hướng dẫn chính thức của Anthropic về Claude Code. Sub-agent, MCP, cost control.'
  },
  {
    id: 'U6LbW2IFUQw',
    title: isEN.value
      ? 'This is Hands Down the BEST Way to Build AI Agents'
      : 'Cách tốt nhất để build AI Agents (production)',
    channel: 'Cole Medin',
    duration: '51:00',
    module: 'Vibe Agent Ch 3-6',
    cat: ['agent'],
    why: isEN.value
      ? 'Production agent build: framework choice + context engineering.'
      : 'Build agent production: chọn framework + context engineering.'
  },
  {
    id: 'WkHdkwDQJ5o',
    title: isEN.value
      ? 'Claude\'s new Cursor killer just dropped'
      : 'Claude ra "Cursor killer" — review trung thực',
    channel: 'Theo - t3.gg',
    duration: '30:00',
    module: 'Vibe Agent Ch 1-2',
    cat: ['coding', 'agent'],
    why: isEN.value
      ? 'Theo compares Claude Code vs Cursor head-to-head — honest dev take.'
      : 'Theo so sánh Claude Code vs Cursor — góc nhìn dev thẳng thắn.'
  },
  {
    id: 'iv-5mZ_9CPY',
    title: isEN.value
      ? 'But how do AI images and videos actually work?'
      : 'Ảnh & video AI thật ra hoạt động thế nào?',
    channel: '3Blue1Brown',
    duration: '30:00',
    module: 'Vibe Generate',
    cat: ['generate'],
    why: isEN.value
      ? 'The definitive 2025 visual explainer for diffusion. (1.9M views)'
      : 'Explainer hình ảnh hay nhất 2025 về diffusion. (1.9M view)'
  },
  {
    id: 'iyEncfhAFRY',
    title: isEN.value
      ? 'How we made the viral NBA Finals AI Ad in 2 Days'
      : 'Cách làm quảng cáo AI NBA Finals viral trong 2 ngày',
    channel: 'PJ Ace',
    duration: '1:02',
    module: 'Vibe Generate Ch 3',
    cat: ['generate'],
    why: isEN.value
      ? 'Behind the scenes of the viral ~$2K Kalshi AI ad (Veo 3).'
      : 'Behind the scenes quảng cáo AI Kalshi ~$2K viral (Veo 3).'
  },
  {
    id: 'K8Ros5RhJW4',
    title: isEN.value
      ? 'The Only 14 Ways to Make Money with AI in 2026'
      : '14 cách kiếm tiền với AI trong 2026',
    channel: 'Dan Martell',
    duration: '30:00',
    module: 'Vibe Generate Ch 8',
    cat: ['generate'],
    why: isEN.value
      ? '14 concrete, current ways to monetize AI skills. (710K views)'
      : '14 cách kiếm tiền với AI cụ thể, cập nhật. (710K view)'
  },
  {
    id: '9FuNtfsnRNo',
    title: isEN.value
      ? 'I Built the Ultimate Team of AI Agents in n8n (Free Template)'
      : 'Build team AI Agents trong n8n (template free)',
    channel: 'Nate Herk | AI Automation',
    duration: '40:00',
    module: 'Vibe Agent Ch 7',
    cat: ['agent'],
    why: isEN.value
      ? 'Orchestrator + sub-agents in n8n, no code. (1.1M views)'
      : 'Orchestrator + sub-agent trong n8n, no-code. (1.1M view)'
  },
  {
    id: 'lwSNhpkNYao',
    title: isEN.value
      ? 'Build a Vietnamese AI Sales Chatbot with Personality'
      : 'Tạo AI Chatbot bán hàng có "tính cách" (tiếng Việt)',
    channel: 'EVOKA - Chatbot AI',
    duration: '15:00',
    module: 'Vibe Agent Ch 5',
    cat: ['vn', 'agent'],
    why: isEN.value
      ? 'Vietnamese tutorial: give your AI sales bot a persona so it is not robotic.'
      : 'Video tiếng Việt: tạo chatbot bán hàng AI có tính cách, không "máy móc".'
  },
  {
    id: 'GuaKeDS6UKU',
    title: isEN.value
      ? 'n8n Quick Start: Build Your First AI Agent [2026]'
      : 'n8n Quick Start: Build AI Agent đầu tiên [2026]',
    channel: 'n8n',
    duration: '25:00',
    module: 'Vibe Agent Ch 5',
    cat: ['agent'],
    why: isEN.value
      ? 'Official n8n tutorial: build your first AI agent from scratch.'
      : 'Tutorial chính thức n8n: build AI agent đầu tiên từ đầu.'
  },
  {
    id: 'p_e2IAsB84A',
    title: isEN.value
      ? 'AI Cinematography is Here… And Surprisingly Easy'
      : 'Quay phim điện ảnh bằng AI — dễ bất ngờ',
    channel: 'Curious Refuge',
    duration: '20:00',
    module: 'Vibe Generate Ch 3',
    cat: ['generate'],
    why: isEN.value
      ? 'Modern AI cinematography workflow from a top AI-film channel.'
      : 'Workflow quay phim AI điện ảnh hiện đại từ kênh AI-film hàng đầu.'
  }
])

const loadedVideos = ref({})
function open(v) {
  loadedVideos.value[v.id] = true
}

function onThumbnailError(e, v) {
  // Fallback to default thumbnail if hqdefault not available
  e.target.src = `https://i.ytimg.com/vi/${v.id}/default.jpg`
}

const filteredVideos = computed(() => {
  if (activeCat.value === 'all') return videos.value
  return videos.value.filter((v) => v.cat.includes(activeCat.value))
})
</script>

<style scoped>
.learning-videos {
  max-width: 1280px;
  margin: 80px auto 60px;
  padding: 0 24px;
}

.header {
  text-align: center;
  margin-bottom: 24px;
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
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 24px;
}

.filter-tab {
  padding: 8px 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-tab:hover {
  border-color: var(--vp-c-brand-3);
  color: var(--vp-c-text-1);
}

.filter-tab.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

@media (min-width: 640px) {
  .video-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .video-grid { grid-template-columns: repeat(3, 1fr); }
}

.video-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.video-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}

.thumbnail-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  background: #000;
  cursor: pointer;
  overflow: hidden;
}

.thumbnail {
  position: absolute;
  inset: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s ease;
}

.thumbnail:hover img { opacity: 0.85; }

.play-button {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
  pointer-events: none;
  transition: transform 0.2s ease;
}

.thumbnail:hover .play-button { transform: scale(1.1); }

.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 11px;
  border-radius: 4px;
  pointer-events: none;
}

.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.video-info {
  padding: 14px 16px 16px;
}

.video-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: rgba(99, 102, 241, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.video-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 8px;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
}

.channel { color: var(--vp-c-text-2); }

.youtube-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.youtube-link:hover { text-decoration: underline; }

.video-why {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.45;
  margin: 0;
}

.footer-note {
  margin-top: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
