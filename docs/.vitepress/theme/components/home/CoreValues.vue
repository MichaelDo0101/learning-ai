<script setup>
const values = [
  { icon: 'rocket', title: 'Tiên phong', desc: 'Dẫn dắt xu hướng AI với tinh thần đổi mới không ngừng.' },
  { icon: 'school', title: 'Thực tiễn', desc: 'Học đi đôi với làm, đáp ứng nhu cầu thực tế.' },
  { icon: 'bulb', title: 'Hiểu sâu', desc: 'Hiểu bản chất AI để ứng dụng hiệu quả.' },
  { icon: 'users', title: 'Cộng đồng', desc: 'Kết nối và cùng nhau phát triển trong hệ sinh thái AI.' },
  { icon: 'trending-up', title: 'Tạo giá trị', desc: 'Ứng dụng AI để tạo ra giá trị bền vững cho cá nhân và tổ chức.' }
]
</script>

<template>
  <section class="ev-values">
    <div class="ev-values-head">
      <p class="ev-eyebrow">GIÁ TRỊ CỐT LÕI</p>
      <h2 class="ev-values-title">Điều làm nên <span>Learning AI</span></h2>
      <p class="ev-values-sub">
        Learning AI đồng hành cùng thế hệ học viên Việt Nam làm chủ AI để giải
        quyết vấn đề thực tiễn và tạo ra giá trị cho tương lai.
      </p>
    </div>
    <div class="ev-values-grid">
      <div v-for="v in values" :key="v.title" class="ev-value-card">
        <div class="ev-value-icon"><i :class="`ti ti-${v.icon}`" /></div>
        <h3>{{ v.title }}</h3>
        <p>{{ v.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ev-values {
  max-width: 1152px;
  margin: 0 auto;
  padding: 72px 24px 40px;
}
.ev-values-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 48px;
}
.ev-eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #00b372;
  margin: 0 0 12px;
}
.ev-values-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: #0d1b2a;
  margin: 0 0 16px;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.ev-values-title span {
  color: #00b372;
}
.ev-values-sub {
  font-size: 16px;
  line-height: 1.7;
  color: #41566b;
  margin: 0;
}
.ev-values-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.ev-value-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 30px 22px;
  text-align: center;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}
.ev-value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0, 179, 114, 0.16);
  border-color: #66e0b3;
}
.ev-value-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e6f7f1, #d2f3e6);
  color: #00b372;
  font-size: 28px;
}
.ev-value-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0d1b2a;
  margin: 0 0 10px;
}
.ev-value-card p {
  font-size: 14px;
  line-height: 1.6;
  color: #41566b;
  margin: 0;
}
.dark .ev-values-title {
  color: #fff;
}
.dark .ev-value-card {
  background: #1b263b;
  border-color: #41566b;
}
.dark .ev-value-card h3 {
  color: #fff;
}
.dark .ev-value-card p,
.dark .ev-values-sub {
  color: #a8b3c2;
}
@media (max-width: 900px) {
  .ev-values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .ev-values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
