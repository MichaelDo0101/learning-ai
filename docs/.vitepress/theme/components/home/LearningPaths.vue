<template>
  <section class="learning-paths">
    <div class="header">
      <h2>{{ t.title }}</h2>
      <p class="subtitle">{{ t.subtitle }}</p>
    </div>

    <div class="path-tabs">
      <button
        v-for="(p, idx) in paths"
        :key="idx"
        :class="['tab', { active: activeIdx === idx }]"
        @click="activeIdx = idx"
      >
        <span class="tab-icon">{{ p.icon }}</span>
        <span class="tab-label">{{ p.persona }}</span>
      </button>
    </div>

    <div class="path-detail">
      <div class="path-header">
        <div class="path-icon-big">{{ activePath.icon }}</div>
        <div>
          <h3>{{ activePath.persona }}</h3>
          <p class="path-goal">🎯 {{ activePath.goal }}</p>
          <p class="path-duration">⏱️ {{ activePath.duration }}</p>
        </div>
      </div>

      <div class="path-steps">
        <div
          v-for="(step, idx) in activePath.steps"
          :key="idx"
          class="step"
        >
          <div class="step-number">{{ idx + 1 }}</div>
          <a :href="basePath + step.link" class="step-card">
            <div class="step-module">{{ step.module }}</div>
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div class="step-time">⏱️ {{ step.time }}</div>
          </a>
          <div v-if="idx < activePath.steps.length - 1" class="step-arrow">↓</div>
        </div>
      </div>

      <div v-if="activePath.outcome" class="path-outcome">
        <strong>{{ t.outcomeLabel }}</strong> {{ activePath.outcome }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const basePath = computed(() => {
  const l = lang.value || 'vi-VN'
  return l.toLowerCase().startsWith('en') ? '/en' : '/vi-vn'
})

const isEN = computed(() => (lang.value || 'vi-VN').toLowerCase().startsWith('en'))

const i18n = {
  vi: {
    title: '🗺️ 5 Lộ trình học cho mọi đối tượng',
    subtitle: 'Click tab để xem lộ trình phù hợp với bạn. Mỗi bước có chapter cụ thể.',
    outcomeLabel: '🏁 Kết quả Day 30:'
  },
  en: {
    title: '🗺️ 5 Learning paths for everyone',
    subtitle: 'Click a tab to see your path. Each step links to a specific chapter.',
    outcomeLabel: '🏁 Day 30 outcome:'
  }
}

const t = computed(() => isEN.value ? i18n.en : i18n.vi)

const pathsByLocale = {
  vi: [
    {
      icon: '👶',
      persona: 'Người mới hoàn toàn',
      goal: 'Hiểu AI Coding + ship demo đầu tiên',
      duration: '4-6 tuần',
      steps: [
        { module: 'Stage 0', title: 'AI Kindergarten — học qua games', desc: 'Snake game, browser game. Tạo thân thiện với code.', time: '1 tuần', link: '/stage-0/' },
        { module: 'Stage 1', title: 'AI IDE + product thinking', desc: 'Cursor, Claude Code, build prototype với AI.', time: '2 tuần', link: '/stage-1/learning-map/' },
        { module: 'Vibe Stories', title: 'Đọc 4 story truyền cảm hứng', desc: 'Tài xế 48 tuổi build product global. Bạn cũng được.', time: '2 ngày', link: '/vibe-stories/story-1' },
        { module: 'Vibe Generate', title: 'Roadmap 30 ngày Track A', desc: 'Ship 1 product creator có 1K follower.', time: '4 tuần', link: '/vibe-generate/roadmap-30-days' }
      ],
      outcome: '1 demo live + 100-1000 follower / signup đầu tiên.'
    },
    {
      icon: '💼',
      persona: 'PM / Designer / Founder',
      goal: 'Build product SaaS có user trả tiền',
      duration: '8-12 tuần',
      steps: [
        { module: 'Stage 1', title: 'Product thinking + AI prototype', desc: 'Idea → spec → MVP với AI IDE.', time: '2 tuần', link: '/stage-1/learning-map/' },
        { module: 'Vibe Agent Ch 1', title: 'Vibe Coding Solo — Pieter Levels $3.1M', desc: 'Pattern wrap API + niche + build-in-public.', time: '1 tuần', link: '/vibe-agent/1-vibe-coding-solo' },
        { module: 'Vibe Generate Ch 4', title: 'Solo SaaS $1M — Base44, Medvi', desc: 'Niche AI gen + monetization model.', time: '1 tuần', link: '/vibe-generate/4-solo-saas-million' },
        { module: 'Stage 2', title: 'Full-stack: payment + DB + deploy', desc: 'Stripe, Supabase, Vercel — ship MVP thật.', time: '4 tuần', link: '/stage-2/frontend/lovart-assets/' },
        { module: 'Vibe Generate Ch 9', title: 'Roadmap 30 ngày Track B', desc: 'Ship + 5 paying customer.', time: '4 tuần', link: '/vibe-generate/roadmap-30-days' }
      ],
      outcome: 'MVP live + 5-20 paying customer + $50-500 MRR.'
    },
    {
      icon: '💻',
      persona: 'Dev junior/mid → go global',
      goal: 'Land freelance $200-500/ngày với AI tools',
      duration: '8-12 tuần',
      steps: [
        { module: 'Vibe Agent Ch 2', title: 'Claude Code Deep — 30h autonomous', desc: 'Sub-agent orchestrator-worker pattern.', time: '1 tuần', link: '/vibe-agent/2-claude-code-deep' },
        { module: 'Vibe Agent Ch 6', title: 'MCP Ecosystem — 97M downloads/tháng', desc: 'Build MCP cho local stack (blue ocean VN).', time: '2 tuần', link: '/vibe-agent/6-mcp-ecosystem' },
        { module: 'Stage 2', title: 'Full-stack mastery', desc: 'Backend, DB, deploy, CI/CD.', time: '4 tuần', link: '/stage-2/frontend/lovart-assets/' },
        { module: 'Stage 3', title: 'Cross-platform: mobile, mini program, MCP', desc: 'Mở rộng skill cho rate global.', time: '4 tuần', link: '/stage-3/core-skills/basics/' },
        { module: 'Vibe Agent Ch 9', title: 'Roadmap 30 ngày Track A — solo dev', desc: 'Ship 1 agent product có 5+ paying customer.', time: '4 tuần', link: '/vibe-agent/roadmap-30-days' }
      ],
      outcome: '1 freelance gig $200-500/ngày + portfolio + 5K Twitter follower.'
    },
    {
      icon: '🎨',
      persona: 'Creator (filmmaker/musician/influencer)',
      goal: 'Build channel + monetize bằng AI',
      duration: '8-12 tuần',
      steps: [
        { module: 'Vibe Generate Ch 1', title: 'Solo Studio — Josh Kerrigan, PJ Ace', desc: 'Pipeline 1 người làm phim.', time: '1 tuần', link: '/vibe-generate/1-solo-studio' },
        { module: 'Vibe Generate Ch 2', title: 'AI Music $3M — Suno + Spotify', desc: 'Telisha Jones case, distribute Spotify.', time: '1 tuần', link: '/vibe-generate/2-ai-music-3m' },
        { module: 'Vibe Generate Ch 5', title: 'Sora 2 & TikTok — viral formats', desc: '4 format thắng Q4/2025.', time: '1 tuần', link: '/vibe-generate/5-sora-2-tiktok' },
        { module: 'Vibe Generate Ch 8', title: 'Ethics & Legal 2026', desc: 'Disney lawsuit, UMG/Udio, 3 quy tắc commercial-safe.', time: '2 ngày', link: '/vibe-generate/ethics-2026' },
        { module: 'Vibe Generate Ch 9', title: 'Roadmap 30 ngày Track A — Creator', desc: '1K follower + 1 viral clip.', time: '4 tuần', link: '/vibe-generate/roadmap-30-days' }
      ],
      outcome: '1K-10K follower + 1 brand deal $200-1K + revenue stream active.'
    },
    {
      icon: '🏢',
      persona: 'Operator / Agency / Non-dev',
      goal: 'Tự động 5 workflow + serve SME client',
      duration: '6-10 tuần',
      steps: [
        { module: 'Vibe Agent Ch 5', title: 'Workflow Agent — Smax.ai, n8n, Lindy', desc: 'Case Yody +15-20%, Let\'s Sushi +300%.', time: '2 tuần', link: '/vibe-agent/5-workflow-agent' },
        { module: 'Vibe Agent Ch 3', title: 'Computer Use — automate legacy', desc: 'Agent click màn hình thay nhân viên data entry.', time: '1 tuần', link: '/vibe-agent/3-computer-use' },
        { module: 'Vibe Agent Ch 6', title: 'MCP Ecosystem — VN opportunity', desc: 'Build MCP cho MISA, KiotViet, Pancake.', time: '1 tuần', link: '/vibe-agent/6-mcp-ecosystem' },
        { module: 'Vibe Agent Ch 8', title: 'Safety & Evals', desc: 'Production-ready: sandbox + guardrail + audit.', time: '1 tuần', link: '/vibe-agent/safety-evals' },
        { module: 'Vibe Agent Ch 9', title: 'Roadmap 30 ngày Track B/C', desc: 'Close 1 deal $5-10K SME hoặc save 10h/tuần.', time: '4 tuần', link: '/vibe-agent/roadmap-30-days' }
      ],
      outcome: '1 deal SME $5-10K + recurring $300-1K/tháng support.'
    }
  ],
  en: [
    {
      icon: '👶',
      persona: 'Complete Beginner',
      goal: 'Understand AI Coding + ship first demo',
      duration: '4-6 weeks',
      steps: [
        { module: 'Stage 0', title: 'AI Kindergarten — learn via games', desc: 'Snake game, browser game. Friendly intro to code.', time: '1 week', link: '/stage-0/' },
        { module: 'Stage 1', title: 'AI IDE + product thinking', desc: 'Cursor, Claude Code, build prototypes with AI.', time: '2 weeks', link: '/stage-1/learning-map/' },
        { module: 'Vibe Stories', title: 'Read 4 inspirational stories', desc: '48yo truck driver built global product. You can too.', time: '2 days', link: '/vibe-stories/story-1' },
        { module: 'Vibe Generate', title: '30-Day Roadmap Track A', desc: 'Ship 1 creator product with 1K followers.', time: '4 weeks', link: '/vibe-generate/roadmap-30-days' }
      ],
      outcome: '1 live demo + 100-1000 followers / first signups.'
    },
    {
      icon: '💼',
      persona: 'PM / Designer / Founder',
      goal: 'Build SaaS product with paying users',
      duration: '8-12 weeks',
      steps: [
        { module: 'Stage 1', title: 'Product thinking + AI prototype', desc: 'Idea → spec → MVP with AI IDE.', time: '2 weeks', link: '/stage-1/learning-map/' },
        { module: 'Vibe Agent Ch 1', title: 'Vibe Coding Solo — Pieter Levels $3.1M', desc: 'Pattern: wrap API + niche + build-in-public.', time: '1 week', link: '/vibe-agent/1-vibe-coding-solo' },
        { module: 'Vibe Generate Ch 4', title: 'Solo SaaS $1M — Base44, Medvi', desc: 'AI gen niche + monetization model.', time: '1 week', link: '/vibe-generate/4-solo-saas-million' },
        { module: 'Stage 2', title: 'Full-stack: payment + DB + deploy', desc: 'Stripe, Supabase, Vercel — ship real MVP.', time: '4 weeks', link: '/stage-2/frontend/lovart-assets/' },
        { module: 'Vibe Generate Ch 9', title: '30-Day Roadmap Track B', desc: 'Ship + 5 paying customers.', time: '4 weeks', link: '/vibe-generate/roadmap-30-days' }
      ],
      outcome: 'Live MVP + 5-20 paying customers + $50-500 MRR.'
    },
    {
      icon: '💻',
      persona: 'Junior/Mid Dev → Global',
      goal: 'Land freelance $200-500/day with AI tools',
      duration: '8-12 weeks',
      steps: [
        { module: 'Vibe Agent Ch 2', title: 'Claude Code Deep — 30h autonomous', desc: 'Sub-agent orchestrator-worker pattern.', time: '1 week', link: '/vibe-agent/2-claude-code-deep' },
        { module: 'Vibe Agent Ch 6', title: 'MCP Ecosystem — 97M downloads/month', desc: 'Build MCPs for local stacks (blue ocean).', time: '2 weeks', link: '/vibe-agent/6-mcp-ecosystem' },
        { module: 'Stage 2', title: 'Full-stack mastery', desc: 'Backend, DB, deploy, CI/CD.', time: '4 weeks', link: '/stage-2/frontend/lovart-assets/' },
        { module: 'Stage 3', title: 'Cross-platform: mobile, mini program, MCP', desc: 'Expand skills for global rate.', time: '4 weeks', link: '/stage-3/core-skills/basics/' },
        { module: 'Vibe Agent Ch 9', title: '30-Day Roadmap Track A — solo dev', desc: 'Ship 1 agent product with 5+ paying customers.', time: '4 weeks', link: '/vibe-agent/roadmap-30-days' }
      ],
      outcome: '1 freelance gig $200-500/day + portfolio + 5K Twitter followers.'
    },
    {
      icon: '🎨',
      persona: 'Creator (filmmaker/musician/influencer)',
      goal: 'Build channel + monetize with AI',
      duration: '8-12 weeks',
      steps: [
        { module: 'Vibe Generate Ch 1', title: 'Solo Studio — Josh Kerrigan, PJ Ace', desc: 'Solo filmmaker pipeline.', time: '1 week', link: '/vibe-generate/1-solo-studio' },
        { module: 'Vibe Generate Ch 2', title: 'AI Music $3M — Suno + Spotify', desc: 'Telisha Jones case, Spotify distribution.', time: '1 week', link: '/vibe-generate/2-ai-music-3m' },
        { module: 'Vibe Generate Ch 5', title: 'Sora 2 & TikTok — viral formats', desc: '4 winning Q4 2025 formats.', time: '1 week', link: '/vibe-generate/5-sora-2-tiktok' },
        { module: 'Vibe Generate Ch 8', title: 'Ethics & Legal 2026', desc: 'Disney lawsuit, UMG/Udio, 3 commercial-safe rules.', time: '2 days', link: '/vibe-generate/ethics-2026' },
        { module: 'Vibe Generate Ch 9', title: '30-Day Roadmap Track A — Creator', desc: '1K followers + 1 viral clip.', time: '4 weeks', link: '/vibe-generate/roadmap-30-days' }
      ],
      outcome: '1K-10K followers + 1 brand deal $200-1K + active revenue stream.'
    },
    {
      icon: '🏢',
      persona: 'Operator / Agency / Non-dev',
      goal: 'Automate 5 workflows + serve SME clients',
      duration: '6-10 weeks',
      steps: [
        { module: 'Vibe Agent Ch 5', title: 'Workflow Agent — Smax.ai, n8n, Lindy', desc: 'Cases: Yody +15-20%, Let\'s Sushi +300%.', time: '2 weeks', link: '/vibe-agent/5-workflow-agent' },
        { module: 'Vibe Agent Ch 3', title: 'Computer Use — automate legacy', desc: 'Agent clicks like data entry workers.', time: '1 week', link: '/vibe-agent/3-computer-use' },
        { module: 'Vibe Agent Ch 6', title: 'MCP Ecosystem — local opportunities', desc: 'Build MCPs for MISA, KiotViet, Pancake.', time: '1 week', link: '/vibe-agent/6-mcp-ecosystem' },
        { module: 'Vibe Agent Ch 8', title: 'Safety & Evals', desc: 'Production-ready: sandbox + guardrail + audit.', time: '1 week', link: '/vibe-agent/safety-evals' },
        { module: 'Vibe Agent Ch 9', title: '30-Day Roadmap Track B/C', desc: 'Close 1 SME deal $5-10K or save 10h/week.', time: '4 weeks', link: '/vibe-agent/roadmap-30-days' }
      ],
      outcome: '1 SME deal $5-10K + recurring $300-1K/month support.'
    }
  ]
}

const paths = computed(() => isEN.value ? pathsByLocale.en : pathsByLocale.vi)

const activeIdx = ref(0)
const activePath = computed(() => paths.value[activeIdx.value])
</script>

<style scoped>
.learning-paths {
  max-width: 1280px;
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

.path-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: center;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  border-color: var(--vp-c-brand-3);
  color: var(--vp-c-text-1);
}

.tab.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.tab-icon { font-size: 18px; }

.path-detail {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 28px;
}

.path-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.path-icon-big {
  font-size: 48px;
  line-height: 1;
}

.path-header h3 {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
  border: none;
  padding: 0;
}

.path-goal,
.path-duration {
  margin: 2px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  position: relative;
}

.step-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-top: 4px;
}

.step-card {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px 18px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: all 0.15s ease;
  display: block;
}

.step-card:hover {
  border-color: var(--vp-c-brand-3);
  transform: translateX(4px);
}

.step-module {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: rgba(99, 102, 241, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.step-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 6px;
}

.step-time {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.step-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  font-size: 18px;
  color: var(--vp-c-text-3);
  padding: 4px 0;
}

.path-outcome {
  margin-top: 20px;
  padding: 14px 18px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(99, 102, 241, 0.05));
  border-left: 3px solid rgb(34, 197, 94);
  border-radius: 8px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
</style>
