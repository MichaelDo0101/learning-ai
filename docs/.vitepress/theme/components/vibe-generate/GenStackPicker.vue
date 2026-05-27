<template>
  <div class="gen-stack-picker">
    <div class="header">
      <h3>🎯 Gen Stack Picker — Bạn cần tool gì?</h3>
      <p class="subtitle">
        Trả lời 3 câu để pick tool phù hợp.
      </p>
    </div>

    <div class="questions">
      <!-- Q1: Modality -->
      <div class="question">
        <label>1. Bạn muốn gen gì?</label>
        <div class="options">
          <button
            v-for="opt in modalityOptions"
            :key="opt.value"
            :class="['opt', { selected: modality === opt.value }]"
            @click="modality = opt.value; result = null"
          >
            {{ opt.icon }} {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Q2: Budget -->
      <div v-if="modality" class="question">
        <label>2. Budget/tháng?</label>
        <div class="options">
          <button
            v-for="opt in budgetOptions"
            :key="opt.value"
            :class="['opt', { selected: budget === opt.value }]"
            @click="budget = opt.value; result = null"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Q3: Use case -->
      <div v-if="modality && budget" class="question">
        <label>3. Use case chính?</label>
        <div class="options">
          <button
            v-for="opt in useCaseOptions[modality]"
            :key="opt.value"
            :class="['opt', { selected: useCase === opt.value }]"
            @click="useCase = opt.value; computeResult()"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Result -->
    <div v-if="result" class="result">
      <h4>🎯 Đề xuất stack:</h4>
      <div class="stack-grid">
        <div v-for="(tool, idx) in result.tools" :key="idx" class="tool-card">
          <div class="tool-name">{{ tool.name }}</div>
          <div class="tool-cost">{{ tool.cost }}</div>
          <div class="tool-why">{{ tool.why }}</div>
        </div>
      </div>
      <div class="result-meta">
        <div><strong>Total:</strong> {{ result.total }}</div>
        <div v-if="result.vnNote"><strong>🇻🇳 VN tip:</strong> {{ result.vnNote }}</div>
      </div>
    </div>

    <div class="reset-row">
      <button @click="reset" class="btn-reset">↻ Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modality = ref(null)
const budget = ref(null)
const useCase = ref(null)
const result = ref(null)

const modalityOptions = [
  { value: 'image', icon: '🖼️', label: 'Image' },
  { value: 'video', icon: '🎬', label: 'Video' },
  { value: 'audio', icon: '🎵', label: 'Audio' }
]

const budgetOptions = [
  { value: 'low', label: '< $30/tháng' },
  { value: 'mid', label: '$30-100/tháng' },
  { value: 'high', label: '$100-300/tháng' },
  { value: 'pro', label: '$300+/tháng' }
]

const useCaseOptions = {
  image: [
    { value: 'art', label: 'Illustration / art' },
    { value: 'product', label: 'Product photo' },
    { value: 'brand', label: 'Logo / brand' },
    { value: 'persona', label: 'Persona consistency' }
  ],
  video: [
    { value: 'social', label: 'TikTok / social' },
    { value: 'cinematic', label: 'Cinematic short' },
    { value: 'character', label: 'Character motion' },
    { value: 'budget', label: 'Budget anime style' }
  ],
  audio: [
    { value: 'music', label: 'Full song' },
    { value: 'voice', label: 'Voice-over' },
    { value: 'dub', label: 'Dubbing multi-language' },
    { value: 'realtime', label: 'Real-time voice agent' }
  ]
}

function computeResult() {
  const key = `${modality.value}-${useCase.value}-${budget.value}`
  result.value = lookup[key] || lookup[`${modality.value}-${useCase.value}-mid`] || defaultResult(modality.value)
}

function reset() {
  modality.value = null
  budget.value = null
  useCase.value = null
  result.value = null
}

const lookup = {
  // IMAGE
  'image-art-low': {
    tools: [{ name: 'Midjourney Basic', cost: '$10/tháng', why: 'Aesthetic + character consistency, tier rẻ nhất' }],
    total: '$10/tháng',
    vnNote: 'Card Techcombank/VPBank Visa Debit OK Stripe'
  },
  'image-art-mid': {
    tools: [
      { name: 'Midjourney Standard', cost: '$30/tháng', why: 'Aesthetic top, --cref character consistency' },
      { name: 'Flux Schnell (Replicate)', cost: '~$10 usage', why: 'Fast iteration backup' }
    ],
    total: '~$40/tháng',
    vnNote: 'SDVN community VN có nhiều prompt template miễn phí'
  },
  'image-product-low': {
    tools: [{ name: 'Ideogram 3', cost: '$8/tháng', why: 'In-image text accurate cho product label' }],
    total: '$8/tháng'
  },
  'image-product-mid': {
    tools: [
      { name: 'Flux Pro (Replicate)', cost: '~$30-50 usage', why: '4MP photoreal, light physics — product photo top' },
      { name: 'Nano Banana Pro', cost: '$0.134/image API', why: 'Brand-safe edit, complex composition' }
    ],
    total: '~$50-80/tháng',
    vnNote: 'Ngách ảnh thẻ DN / ảnh cưới VN underserved'
  },
  'image-brand-low': {
    tools: [{ name: 'Recraft V3', cost: '$0 free / $19 Pro', why: '#1 ELO image gen, SVG vector export' }],
    total: '$0-19/tháng'
  },
  'image-brand-mid': {
    tools: [
      { name: 'Recraft V3 Pro', cost: '$19/tháng', why: 'Logo + SVG vector export' },
      { name: 'Ideogram 3', cost: '$8/tháng', why: 'Ad with text overlay' }
    ],
    total: '$27/tháng'
  },
  'image-persona-mid': {
    tools: [
      { name: 'Midjourney Standard', cost: '$30/tháng', why: '--cref Omni Reference cho character' },
      { name: 'Replicate (LoRA train)', cost: '~$2-5/train', why: 'Train LoRA persona Việt' }
    ],
    total: '~$40-50/tháng',
    vnNote: 'Persona Việt: thử Aitana approach (LoRA + IPAdapter + ControlNet)'
  },
  'image-persona-high': {
    tools: [
      { name: 'Flux Pro API', cost: '$50-100 usage', why: 'Photoreal hyper-detailed' },
      { name: 'ComfyUI local + Fal LoRA', cost: '$30-50', why: 'Full control pipeline' },
      { name: 'Photoshop', cost: '$10', why: 'Touch-up cuối' }
    ],
    total: '~$100-160/tháng'
  },

  // VIDEO
  'video-social-low': {
    tools: [{ name: 'Kling 2.5 Basic', cost: '$6.99/tháng', why: 'Cost-efficient, anime/illustration style' }],
    total: '$7/tháng'
  },
  'video-social-mid': {
    tools: [
      { name: 'ChatGPT Plus (Sora 2)', cost: '$20/tháng', why: 'Social-native, Cameo feature, sync audio' },
      { name: 'CapCut Pro', cost: '$7.99/tháng', why: 'Edit + trending audio' }
    ],
    total: '~$28/tháng',
    vnNote: 'TikTok VN: hashtag #sora2 #aivideovn'
  },
  'video-cinematic-mid': {
    tools: [
      { name: 'Gemini Advanced (Veo 3.1)', cost: '$19.99/tháng', why: '4K, native 48kHz dialogue audio' },
      { name: 'Topaz Video AI', cost: '$300 one-time', why: 'Upscale 4K + frame interp' }
    ],
    total: '$20/tháng + $300 one-time'
  },
  'video-cinematic-high': {
    tools: [
      { name: 'Higgsfield Cinema', cost: '$39/tháng', why: 'Aggregate Sora + Veo + Kling + camera presets' },
      { name: 'Runway Standard', cost: '$15/tháng', why: 'Character motion' },
      { name: 'ElevenLabs Creator', cost: '$22/tháng', why: 'Voice clone' }
    ],
    total: '~$76/tháng'
  },
  'video-character-mid': {
    tools: [
      { name: 'Runway Standard', cost: '$15/tháng', why: 'Single-image character consistency' },
      { name: 'Midjourney Standard', cost: '$30/tháng', why: 'Keyframe character ref' }
    ],
    total: '$45/tháng'
  },
  'video-budget-low': {
    tools: [{ name: 'Kling 2.5 Basic', cost: '$6.99/tháng', why: 'Anime/ink/game-CG style packs' }],
    total: '$7/tháng'
  },

  // AUDIO
  'audio-music-low': {
    tools: [{ name: 'Suno Pro', cost: '$10/tháng', why: 'Full song với vocals, 8-min duration, Personas' }],
    total: '$10/tháng',
    vnNote: 'Bolero/V-Pop tiếng Việt — ngách chưa có ai claim'
  },
  'audio-music-mid': {
    tools: [
      { name: 'Suno Premier', cost: '$30/tháng', why: 'Full commercial license + priority' },
      { name: 'LANDR Mastering', cost: '$4/track', why: 'Cloud master tự động' },
      { name: 'DistroKid', cost: '$23/năm', why: 'Distribute Spotify VN' }
    ],
    total: '~$36/tháng',
    vnNote: 'Audio cần DDEX AI flag (T9/2025 Spotify policy)'
  },
  'audio-voice-low': {
    tools: [{ name: 'ElevenLabs Starter', cost: '$5/tháng', why: 'Basic voice, 30K char/tháng' }],
    total: '$5/tháng'
  },
  'audio-voice-mid': {
    tools: [
      { name: 'ElevenLabs Creator', cost: '$22/tháng', why: 'Instant voice clone, emotion tag' }
    ],
    total: '$22/tháng',
    vnNote: 'Voice giọng Việt: ElevenLabs hỗ trợ tiếng Việt'
  },
  'audio-voice-high': {
    tools: [
      { name: 'ElevenLabs Pro', cost: '$99/tháng', why: 'Pro voice clone, 500K char/tháng' }
    ],
    total: '$99/tháng'
  },
  'audio-dub-mid': {
    tools: [
      { name: 'ElevenLabs Creator', cost: '$22/tháng', why: '32+ ngôn ngữ dubbing' }
    ],
    total: '$22/tháng'
  },
  'audio-realtime-mid': {
    tools: [
      { name: 'Vapi', cost: '$0.05/min orch + provider', why: 'Provider-agnostic, 99.99% SLA' },
      { name: 'Cartesia Sonic', cost: 'Per-minute API', why: 'Lowest latency TTS market' }
    ],
    total: '~$50-200/tháng usage',
    vnNote: 'Voice agent VN: dùng cho clinic / consultation / receptionist'
  }
}

function defaultResult(modality) {
  return {
    tools: [{ name: '—', cost: '—', why: 'Cần thông tin thêm. Pick budget + use case khác.' }],
    total: '—'
  }
}
</script>

<style scoped>
.gen-stack-picker {
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

.question {
  margin-bottom: 16px;
}

.question label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.opt {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.opt:hover {
  border-color: var(--vp-c-brand-3);
}

.opt.selected {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.result {
  margin-top: 20px;
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.result h4 {
  margin: 0 0 12px;
  font-size: 16px;
}

.stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

@media (min-width: 640px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tool-card {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tool-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.tool-cost {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  margin-bottom: 6px;
}

.tool-why {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.result-meta {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
}

.result-meta > div {
  margin-bottom: 4px;
}

.reset-row {
  margin-top: 12px;
  text-align: right;
}

.btn-reset {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
}
</style>
