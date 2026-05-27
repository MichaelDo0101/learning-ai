import { computed } from 'vue'
import { useData } from 'vitepress'

const langMap = {
  'vi-VN': 'vi-vn',
  'en-US': 'en'
}

/**
 * Lightweight i18n composable for VitePress Vue components.
 *
 * @param {Record<string, Record<string, any>>} messages
 *   Locale map, e.g. { 'vi-vn': { title: 'Tiêu đề' }, en: { title: 'Title' } }
 * @returns {{ t: (key: string) => any, locale: import('vue').ComputedRef<string> }}
 */
export function useI18n(messages) {
  const { lang } = useData()

  const locale = computed(() => langMap[lang.value] || 'vi-vn')

  const current = computed(
    () => messages[locale.value] || messages['vi-vn'] || messages.en || {}
  )

  const t = (key) => {
    const keys = key.split('.')
    let val = current.value
    for (const k of keys) {
      val = val?.[k]
      if (val === undefined) return key
    }
    return val
  }

  return { t, locale, messages: current }
}
