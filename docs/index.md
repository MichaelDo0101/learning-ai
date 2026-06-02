---
layout: home
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

const WELCOME_SEEN_KEY = 'learning-ai-welcome-seen'

onMounted(() => {
  // Language map: browser language code -> site path
  const langMap = {
    'vi': '/vi-vn/',
    'vi-vn': '/vi-vn/',
    'en': '/en/',
    'en-us': '/en/',
    'en-gb': '/en/'
  }

  // Get browser language
  const browserLang = navigator.language.toLowerCase()
  const browserLangShort = browserLang.split('-')[0]

  // Resolve target language; fallback to Vietnamese
  let targetLang = langMap[browserLang] || langMap[browserLangShort] || '/vi-vn/'

  const targetPath = withBase(targetLang)
  let hasSeenWelcome = false
  try {
    hasSeenWelcome = window.localStorage.getItem(WELCOME_SEEN_KEY) === '1'
  } catch {
    hasSeenWelcome = false
  }

  if (!hasSeenWelcome) {
    window.location.replace(
      withBase(`/welcome/?next=${encodeURIComponent(targetPath)}`)
    )
    return
  }

  // Redirect immediately without rendering content.
  // Use withBase to handle base path (see config.mjs).
  window.location.replace(targetPath)
})
</script>
