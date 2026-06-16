<script setup>
const traits = [
  { icon: 'sparkles', label: 'Hiện đại' },
  { icon: 'shield-check', label: 'Tin cậy' },
  { icon: 'mood-smile', label: 'Thân thiện' },
  { icon: 'heart', label: 'Truyền cảm hứng' },
  { icon: 'arrow-up-right', label: 'Hướng tới tương lai' }
]
</script>

<template>
  <section class="ev-valuebar">
    <div class="ev-valuebar-inner">
      <div v-for="t in traits" :key="t.label" class="ev-trait">
        <i :class="`ti ti-${t.icon}`" />
        <span>{{ t.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ev-valuebar {
  background: linear-gradient(100deg, #2563eb 0%, #1e40af 100%);
}
.ev-valuebar-inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px 44px;
}
.ev-trait {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
}
.ev-trait i {
  font-size: 20px;
  opacity: 0.92;
}
@media (max-width: 640px) {
  .ev-valuebar-inner {
    gap: 14px 24px;
  }
  .ev-trait {
    font-size: 13.5px;
  }
}
</style>
