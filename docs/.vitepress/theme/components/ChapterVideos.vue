<template>
  <div class="chapter-videos">
    <div
      v-for="(v, idx) in videos"
      :key="idx"
      class="cv-card"
    >
      <div class="cv-thumbnail" @click="play(idx)">
        <template v-if="!loaded[idx]">
          <img
            :src="`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`"
            :alt="v.title"
            loading="lazy"
            @error="onThumbError($event, v.id)"
          />
          <div class="cv-play">▶</div>
          <div v-if="v.duration" class="cv-duration">{{ v.duration }}</div>
        </template>
        <iframe
          v-else
          :src="`https://www.youtube.com/embed/${v.id}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="cv-iframe"
        ></iframe>
      </div>
      <div class="cv-info">
        <h4 class="cv-title">{{ v.title }}</h4>
        <div class="cv-meta">
          <span class="cv-channel">📺 {{ v.channel }}</span>
          <a
            :href="`https://www.youtube.com/watch?v=${v.id}`"
            target="_blank"
            rel="noopener"
            class="cv-link"
          >
            YouTube ↗
          </a>
        </div>
        <p v-if="v.why" class="cv-why">{{ v.why }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true
  }
})

const loaded = ref({})

function play(idx) {
  loaded.value[idx] = true
}

function onThumbError(e, id) {
  e.target.src = `https://i.ytimg.com/vi/${id}/default.jpg`
}
</script>

<style scoped>
.chapter-videos {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin: 20px 0 28px;
}

@media (min-width: 640px) {
  .chapter-videos { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .chapter-videos { grid-template-columns: repeat(3, 1fr); }
}

.cv-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.cv-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
}

.cv-thumbnail {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  background: #000;
  cursor: pointer;
  overflow: hidden;
}

.cv-thumbnail img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cv-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
  transition: transform 0.2s ease;
  pointer-events: none;
}

.cv-thumbnail:hover .cv-play { transform: scale(1.15); }

.cv-duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 11px;
  border-radius: 4px;
  pointer-events: none;
}

.cv-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cv-info {
  padding: 10px 12px 12px;
}

.cv-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  border: none !important;
  padding: 0 !important;
}

.cv-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 11px;
}

.cv-channel { color: var(--vp-c-text-2); }

.cv-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.cv-link:hover { text-decoration: underline; }

.cv-why {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin: 0;
}
</style>
