<script setup>
import { computed } from 'vue'
import { emojiToTabler } from '../../emoji-to-tabler.mjs'

const props = defineProps({
  emoji: { type: String, default: '' },
  name: { type: String, default: '' }
})

const tablerName = computed(() => props.name || emojiToTabler[props.emoji] || '')
</script>

<template>
  <i
    v-if="tablerName"
    :class="['ti', `ti-${tablerName}`, 'ev-ti']"
    :aria-label="emoji || tablerName"
    role="img"
  />
  <span v-else class="ev-ti">{{ emoji }}</span>
</template>
