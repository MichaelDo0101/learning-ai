<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { i18n } from './HomeI18n'

const props = defineProps({
  isCjkLocale: Boolean
})

const { lang } = useData()
const t = computed(() => {
  const code = lang.value ? lang.value.toLowerCase() : 'vi-vn'
  const result = i18n[code] || i18n['vi-vn'] || i18n['en']
  result._locale = code
  return result
})

const appleFooterInfo = computed(() => {
  const locale = t.value._locale || 'vi-vn'
  const content = {
    'vi-vn': {
      notes: [
        '1. Lộ trình học và nội dung chương sẽ liên tục cập nhật, nội dung hiển thị lấy theo trang hiện tại.',
        '2. Project ví dụ và ảnh chụp màn hình chỉ dùng cho mục đích minh họa, có thể khác với phiên bản giao diện sau.',
        '3. Một số link chương có thể thay đổi theo lộ trình khoá học, khuyến nghị vào từ trang chủ để lấy đường dẫn mới nhất.'
      ],
      breadcrumbPrefix: 'Learning AI',
      breadcrumbCurrent: 'Điều hướng học tập',
      columns: [
        {
          title: 'Học & điều hướng',
          links: ['Nhập môn cho người mới', 'Dev sơ/trung cấp', 'Dev cao cấp', 'Phụ lục', 'Bản đồ học tập', 'Tổng quan khoá học']
        },
        {
          title: 'Hỗ trợ học tập',
          links: ['Câu hỏi thường gặp', 'Gợi ý học tập', 'Đính chính chương', 'Cập nhật phiên bản']
        },
        {
          title: 'Tài nguyên dự án',
          links: ['GitHub Repository', 'Giấy phép mã nguồn', 'Báo lỗi (Issue)', 'Hướng dẫn đóng góp']
        },
        {
          title: 'Cộng đồng',
          links: ['Cộng đồng học tập', 'Khu thảo luận', 'Phản hồi khoá học']
        },
        {
          title: 'Về Learning AI',
          links: ['Giới thiệu dự án', 'Changelog', 'Liên hệ']
        }
      ],
      more: 'Cách học khác: truy cập',
      moreLink: 'GitHub Repository',
      moreTail: ' để nhận cập nhật và thông tin trao đổi.',
      copyright: 'Copyright © 2026 Learning AI. Bảo lưu mọi quyền.',
      policies: ['Chính sách bảo mật', 'Điều khoản sử dụng', 'Sơ đồ website']
    },
    en: {
      notes: [
        '1. Learning paths and chapters are continuously updated.',
        '2. Screenshots and demo projects are for educational illustration.',
        '3. Some chapter links may change as the course evolves.',
        '4. The page is optimized for modern desktop browsers and responsive layouts.'
      ],
      breadcrumbPrefix: 'Learning AI',
      breadcrumbCurrent: 'Learning Navigation',
      columns: [
        {
          title: 'Explore',
          links: ['Foundations', 'Junior/Mid Dev', 'Senior Dev', 'Appendix', 'Learning Map', 'Course Outline']
        },
        {
          title: 'Support',
          links: ['FAQ', 'Learning Tips', 'Errata', 'Release Notes']
        },
        {
          title: 'Resources',
          links: ['GitHub Repository', 'License', 'Report Issue', 'Contribution Guide']
        },
        {
          title: 'Community',
          links: ['Community', 'Discussions', 'Feedback']
        },
        {
          title: 'About Learning AI',
          links: ['Overview', 'Changelog', 'Contact']
        }
      ],
      more: 'More ways to learn: visit',
      moreLink: 'GitHub Repository',
      moreTail: ' for updates and community discussions.',
      copyright: 'Copyright © 2026 Learning AI. All rights reserved.',
      policies: ['Privacy Policy', 'Terms of Use', 'Sitemap']
    }
  }
  return content[locale] || content['vi-vn']
})

const footerBtnLink = computed(() => {
  const locale = t.value._locale || 'vi-vn'
  return withBase(`/${locale}/stage-1/learning-map/`)
})

const footerPolicyLinkMap = {
  'Chính sách bảo mật': '#',
  'Điều khoản sử dụng': '#',
  'Sơ đồ website': '#',
  'Privacy Policy': '#',
  'Terms of Use': '#',
  'Sitemap': '#'
}

const footerColumnLinkMap = {
  'Nhập môn cho người mới': '/stage-1/',
  'Dev sơ/trung cấp': '/stage-2/',
  'Dev cao cấp': '/stage-3/',
  'Phụ lục': '/appendix/',
  'Bản đồ học tập': '/stage-1/learning-map/',
  'Tổng quan khoá học': '/stage-1/',
  'Giới thiệu dự án': '/guide/introduction',
  'Foundations': '/stage-1/',
  'Junior/Mid Dev': '/stage-2/',
  'Senior Dev': '/stage-3/',
  'Appendix': '/appendix/',
  'Learning Map': '/stage-1/learning-map/',
  'Course Outline': '/stage-1/',
  'Overview': '/guide/introduction',
}

const footerExternalLinks = {
  'GitHub Repository': 'https://github.com/aiecosvietnam/learning-ai',
  'Changelog': 'https://github.com/aiecosvietnam/learning-ai/releases'
}

const getFooterLink = (label) => {
  const external = footerExternalLinks[label]
  if (external) return external
  const basePath = footerColumnLinkMap[label]
  if (!basePath) return '#'
  const locale = t.value._locale || 'vi-vn'
  return `/${locale}${basePath}`
}

const getPolicyLink = (label) => {
  return footerPolicyLinkMap[label] || '#'
}

const resolveFooterHref = (link) => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }
  return withBase(link)
}
</script>

<template>
  <div class="footer-callout">
    <h2 v-html="t.footer.title" />
    <p>{{ t.footer.desc }}</p>
    <a
      class="buy-btn large"
      :href="footerBtnLink"
    >{{ t.footer.btn }}</a>
  </div>

  <div
    class="apple-site-footer"
    :class="{ 'is-cjk-locale': isCjkLocale }"
  >
    <div class="apple-site-footer-inner">
      <div class="apple-footer-breadcrumb">
        <span class="apple-footer-home ti ti-home" aria-hidden="true"></span>
        <span>›</span>
        <span>{{ appleFooterInfo.breadcrumbPrefix }}</span>
        <span>›</span>
        <span>{{ appleFooterInfo.breadcrumbCurrent }}</span>
      </div>

      <div class="apple-footer-notes">
        <p
          v-for="(item, idx) in appleFooterInfo.notes"
          :key="idx"
        >
          {{ item }}
        </p>
      </div>

      <div class="apple-footer-grid">
        <div
          v-for="(column, index) in appleFooterInfo.columns"
          :key="index"
          class="apple-footer-column"
        >
          <h4>{{ column.title }}</h4>
          <a
            v-for="(link, linkIndex) in column.links"
            :key="linkIndex"
            :href="resolveFooterHref(getFooterLink(link))"
          >
            {{ link }}
          </a>
        </div>
      </div>

      <div class="apple-footer-bottom">
        <p>{{ appleFooterInfo.copyright }}</p>
        <div class="apple-footer-policy">
          <a
            v-for="(policy, policyIndex) in appleFooterInfo.policies"
            :key="policyIndex"
            :href="resolveFooterHref(getPolicyLink(policy))"
          >
            {{ policy }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-callout {
  text-align: center;
  padding: 92px 20px;
  background: #fff;
  margin: 0 40px 64px;
  border-radius: 40px;
}

.dark .footer-callout {
  background: var(--vp-c-bg-soft);
}

.footer-callout h2 {
  font-size: 62px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #1d1d1f;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.footer-callout p {
  color: #6e6e73;
  font-size: 20px;
  margin-bottom: 18px;
}

.dark .footer-callout h2 {
  color: var(--vp-c-text-1);
}

.dark .footer-callout p {
  color: var(--vp-c-text-2);
}

.apple-site-footer {
  max-width: none;
  margin: 0 auto 56px;
  padding: 0 40px;
}

.apple-site-footer-inner {
  border-top: 1px solid #d2d2d7;
  color: #6e6e73;
  font-size: 12px;
}

.apple-footer-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6e6e73;
  font-size: 12px;
  padding-top: 12px;
}

.apple-footer-home {
  color: #00b372;
  font-size: 14px;
  line-height: 1;
}

.apple-site-footer.is-cjk-locale .apple-footer-breadcrumb {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.apple-footer-notes {
  padding-top: 18px;
}

.apple-footer-notes p {
  margin: 0 0 8px;
  line-height: 1.45;
  color: #86868b;
}

.apple-site-footer.is-cjk-locale .apple-footer-notes p {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.88;
  letter-spacing: 0.03em;
  font-weight: 400;
  color: #7d7d83;
}

.apple-footer-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 22px;
}

.apple-footer-column h4 {
  margin: 0 0 10px;
  color: #1d1d1f;
  font-size: 12px;
  font-weight: 600;
}

.apple-site-footer.is-cjk-locale .apple-footer-column h4 {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: 0.025em;
}

.apple-footer-column a {
  display: block;
  color: #424245;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 1.25;
}

.apple-site-footer.is-cjk-locale .apple-footer-column a {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.72;
  letter-spacing: 0.02em;
  margin-bottom: 9px;
}

.apple-footer-column a:hover {
  color: #00b372;
}

.apple-footer-more {
  margin-top: 18px;
  border-top: 1px solid #d2d2d7;
  padding-top: 14px;
  color: #6e6e73;
}

.apple-site-footer.is-cjk-locale .apple-footer-more {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.72;
  letter-spacing: 0.02em;
}

.apple-footer-more a {
  color: #00b372;
}

.apple-footer-bottom {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #d2d2d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.apple-footer-bottom p {
  margin: 0;
  color: #86868b;
}

.apple-site-footer.is-cjk-locale .apple-footer-bottom p {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}

.apple-footer-policy {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.apple-footer-policy a {
  color: #424245;
}

.apple-footer-policy a:hover {
  color: #00b372;
}

.apple-site-footer.is-cjk-locale .apple-footer-policy a {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}

@media (min-width: 1024px) {
  .apple-site-footer {
    max-width: none;
    padding: 0 24px;
  }

  .apple-site-footer-inner {
    font-size: 11px;
  }

  .apple-footer-notes p {
    font-size: 11px;
    line-height: 1.38;
    margin-bottom: 6px;
  }

  .apple-footer-grid {
    grid-template-columns: 1.2fr repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .apple-footer-column h4 {
    font-size: 11px;
    margin-bottom: 8px;
  }

  .apple-footer-column a {
    font-size: 11px;
    margin-bottom: 7px;
  }

  .apple-site-footer.is-cjk-locale .site-footer-inner {
    font-size: 13px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-notes p {
    font-size: 13px;
    margin-bottom: 7px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-column h4 {
    font-size: 13px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-column a {
    font-size: 13px;
    margin-bottom: 8px;
  }
}

@media (max-width: 768px) {
  .footer-callout {
    margin: 0 16px 40px;
    border-radius: 28px;
  }

  .footer-callout h2 {
    font-size: 38px;
  }

  .footer-callout p {
    font-size: 17px;
  }

  .apple-site-footer {
    padding: 0 16px;
  }

  .apple-footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 14px;
  }

  .apple-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
