/**
 * 统一维护教程“相关文章”映射表：
 * - key: 文档相对路径（不含 /index.md）
 * - value: 该文档底部相关文章卡片数组
 * 页面只负责按 key 读取并渲染，不在页面内重复维护映射数据。
 */
const rawRelatedArticlesMap = {
  'zh-cn/stage-1/learning-map': [
    {
      href: '/zh-cn/stage-1/ai-capabilities-through-games/',
      title: '0.2 用“小游戏”理解 AI 能力边界',
      description: '先用游戏化方式建立手感，快速理解“什么问题适合交给 AI”。',
      icon: '🎮'
    },
    {
      href: '/zh-cn/stage-1/finding-great-idea/',
      title: '1.0 找到值得做的点子',
      description: '把“我有想法”变成“我有可验证的产品方向”。',
      icon: '💡'
    },
    {
      href: '/zh-cn/stage-1/building-prototype/',
      title: '1.2 把想法做成可交互原型',
      description: '从需求拆解到页面落地，快速完成第一版 Demo。',
      icon: '🧩'
    },
    {
      href: '/zh-cn/stage-2/frontend/lovart-assets/',
      title: '2.0 从 NanoBanana 出发做素材 Agent',
      description: '进入实战阶段，学习构建稳定可复用的素材生产流程。',
      icon: '🖼️'
    }
  ],
  'zh-cn/stage-1/ai-capabilities-through-games': [
    {
      href: '/zh-cn/stage-1/introduction-to-ai-ide/',
      title: '初级二：学会 AI 编程工具',
      description: '把网页试玩升级到本地 AI IDE，建立完整开发环境。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-1/finding-great-idea/',
      title: '初级：找到好点子',
      description: '从“会用工具”走向“做对方向”，明确真实用户问题。',
      icon: '💡'
    },
    {
      href: '/zh-cn/stage-1/learning-map/',
      title: '返回学习地图',
      description: '按完整路线查看每个阶段目标与推荐学习顺序。',
      icon: '🗺️'
    }
  ],
  'zh-cn/stage-1/introduction-to-ai-ide': [
    {
      href: '/zh-cn/stage-1/building-prototype/',
      title: '初级三：动手做出原型',
      description: '从会用 AI IDE 进阶到真正落地业务原型。',
      icon: '🧩'
    },
    {
      href: '/zh-cn/stage-1/integrating-ai-capabilities/',
      title: '初级四：给原型加上 AI 能力',
      description: '接入真实 API，让页面从“可看”变“可用”。',
      icon: '🤖'
    },
    {
      href: '/zh-cn/stage-1/appendix-b-common-errors/',
      title: '附录：常见报错与解决方案',
      description: '遇到环境、依赖或运行异常时，快速定位并修复。',
      icon: '🛠️'
    }
  ],
  'zh-cn/stage-1/building-prototype': [
    {
      href: '/zh-cn/stage-1/integrating-ai-capabilities/',
      title: '初级四：给原型加上 AI 能力',
      description: '把静态原型升级为可调用真实模型服务的应用。',
      icon: '🤖'
    },
    {
      href: '/zh-cn/stage-1/complete-project-practice/',
      title: '初级五：完整项目实战',
      description: '补齐数据、交互与异常处理，完成可演示的完整项目。',
      icon: '🚀'
    },
    {
      href: '/zh-cn/stage-2/frontend/figma-mastergo/',
      title: '进阶：Figma 与 MasterGo 入门',
      description: '继续强化设计到开发的协作流程，为工程化打基础。',
      icon: '🎨'
    }
  ],
  'zh-cn/stage-1/integrating-ai-capabilities': [
    {
      href: '/zh-cn/stage-1/complete-project-practice/',
      title: '初级五：完整项目实战',
      description: '把分散能力拼成完整业务链路，做出可展示的成品。',
      icon: '🧱'
    },
    {
      href: '/zh-cn/stage-2/frontend/lovart-assets/',
      title: '初中级：素材生产 Agent',
      description: '进入更真实的多模型协同流程，搭建可复用的生成系统。',
      icon: '🖼️'
    },
    {
      href: '/zh-cn/stage-2/backend/ai-interface-code/',
      title: '初中级：后端接口设计与开发',
      description: '把 AI 能力规范地接入后端接口，提升工程可维护性。',
      icon: '🔌'
    }
  ],
  'zh-cn/stage-1/complete-project-practice': [
    {
      href: '/zh-cn/stage-2/frontend/lovart-assets/',
      title: '初中级前端：素材生产 Agent',
      description: '学习更复杂的多模型素材生产流程，提升视觉资产效率。',
      icon: '🎯'
    },
    {
      href: '/vi-vn/stage-2/assignments/copywriting-platform-supabase/',
      title: 'Project Stage 2: AI Copywriting SaaS (Supabase)',
      description: 'Đưa kỹ năng prototype lên ứng dụng full-stack triển khai được.',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-2/backend/database-supabase/',
      title: '初中级后端：从数据库到 Supabase',
      description: '补齐数据建模、存储与权限能力，迈向工程化开发。',
      icon: '🗄️'
    }
  ],
  'zh-cn/stage-2/frontend/lovart-assets': [
    {
      href: '/zh-cn/stage-2/frontend/figma-mastergo/',
      title: '2.1 Figma 与 MasterGo 入门',
      description: '把素材放进设计稿，建立从视觉到布局的结构化表达。',
      icon: '🎨'
    },
    {
      href: '/zh-cn/stage-2/frontend/ui-design/',
      title: '2.2 构建第一个现代应用程序 - UI 设计',
      description: '在统一视觉规范下，完成页面层级、组件和布局设计。',
      icon: '🧱'
    },
    {
      href: '/zh-cn/stage-2/frontend/design-to-code/',
      title: '2.6 从设计原型到项目代码',
      description: '把设计稿准确转成可维护的前端代码与组件结构。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-2/frontend/modern-component-library/',
      title: '2.7 使用现代组件库更新你的界面',
      description: '利用组件库做工程化提效，让界面一致性更稳定。',
      icon: '🧩'
    }
  ],
  'zh-cn/stage-2/frontend/figma-mastergo': [
    {
      href: '/zh-cn/stage-2/frontend/ui-design/',
      title: '2.2 构建第一个现代应用程序 - UI 设计',
      description: '继续完善界面结构、视觉层级与交互细节。',
      icon: '🧱'
    },
    {
      href: '/zh-cn/stage-2/frontend/design-to-code/',
      title: '2.6 从设计原型到项目代码',
      description: '把设计稿系统化转译为可维护的前端代码。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-2/frontend/modern-component-library/',
      title: '2.7 使用现代组件库更新你的界面',
      description: '用组件库统一 UI 规范并提升页面开发效率。',
      icon: '🧩'
    }
  ]
}

const supportedLocales = ['vi-vn', 'en']

const getLocaleFromKey = (key) =>
  supportedLocales.find((locale) => key.startsWith(`${locale}/`))

const getArticleSlug = (href) =>
  href
    .replace(/^\/zh-cn\//, '')
    .replace(/\/$/, '')
    .split('/')
    .at(-1)

const localizedArticleText = {
  en: {
    'ai-capabilities-through-games': {
      title: '0.2 Understand AI Capabilities Through Mini Games',
      description:
        'Build intuition through a playful exercise and see what problems are suitable for AI.'
    },
    'finding-great-idea': {
      title: '1.0 Find Ideas Worth Building',
      description:
        'Turn "I have an idea" into a product direction you can validate.'
    },
    'building-prototype': {
      title: '1.2 Turn Ideas into Interactive Prototypes',
      description:
        'Go from requirement breakdown to a working first demo quickly.'
    },
    'lovart-assets': {
      title: '2.0 Build an Asset Agent from NanoBanana',
      description:
        'Move into practice and build a stable, reusable asset production workflow.'
    },
    'introduction-to-ai-ide': {
      title: 'Beginner 2: Master AI Coding Tools',
      description:
        'Move from web experiments to a local AI IDE and set up a real development environment.'
    },
    'learning-map': {
      title: 'Back to the Learning Map',
      description:
        'Review the full path, stage goals, and recommended learning order.'
    },
    'integrating-ai-capabilities': {
      title: 'Beginner 4: Add AI Capabilities',
      description:
        'Connect real APIs and turn a visual prototype into a usable product.'
    },
    'appendix-b-common-errors': {
      title: 'Appendix: Common Errors and Fixes',
      description:
        'Quickly diagnose and fix environment, dependency, and runtime issues.'
    },
    'complete-project-practice': {
      title: 'Beginner 5: Complete Project Practice',
      description:
        'Connect the pieces into a complete business flow and build a presentable product.'
    },
    'figma-mastergo': {
      title: 'Advanced: Figma and MasterGo Basics',
      description:
        'Strengthen the design-to-development workflow for more structured delivery.'
    },
    'ai-interface-code': {
      title: 'Junior Backend: API Design and Development',
      description:
        'Connect AI capabilities through maintainable backend interfaces.'
    },
    'fullstack-app': {
      title: 'Stage 2 Assignment: Full-Stack App',
      description:
        'Upgrade prototype skills into a deployable full-stack application.'
    },
    'database-supabase': {
      title: 'Junior Backend: Database to Supabase',
      description: 'Add data modeling, storage, and permission capabilities.'
    },
    'ui-design': {
      title: '2.2 Build a Modern App: UI Design',
      description:
        'Complete page hierarchy, components, and layout under a unified visual system.'
    },
    'design-to-code': {
      title: '2.6 From Design Prototype to Code',
      description:
        'Convert design files into maintainable frontend code and components.'
    },
    'modern-component-library': {
      title: '2.7 Upgrade UI with Modern Component Libraries',
      description:
        'Use component libraries to improve consistency and development speed.'
    }
  },
  'vi-vn': {
    'ai-capabilities-through-games': {
      title: '0.2 Hiểu ranh giới năng lực AI qua trò chơi nhỏ',
      description:
        'Tạo cảm giác thực hành qua trò chơi và hiểu nhanh vấn đề nào phù hợp để giao cho AI.'
    },
    'finding-great-idea': {
      title: '1.0 Tìm ý tưởng đáng làm',
      description:
        'Biến "tôi có ý tưởng" thành một hướng sản phẩm có thể kiểm chứng.'
    },
    'building-prototype': {
      title: '1.2 Biến ý tưởng thành nguyên mẫu tương tác',
      description:
        'Từ tách yêu cầu đến dựng trang, hoàn thành nhanh bản Demo đầu tiên.'
    },
    'lovart-assets': {
      title: '2.0 Tạo Agent sản xuất tài nguyên từ NanoBanana',
      description:
        'Bước vào thực chiến và học cách xây dựng quy trình sản xuất tài nguyên ổn định, tái sử dụng được.'
    },
    'introduction-to-ai-ide': {
      title: 'Sơ cấp 2: học công cụ lập trình AI',
      description:
        'Từ thử nghiệm trên web chuyển sang AI IDE cục bộ và thiết lập môi trường phát triển đầy đủ.'
    },
    'learning-map': {
      title: 'Quay lại lộ trình học tập',
      description:
        'Xem lại toàn bộ lộ trình, mục tiêu từng giai đoạn và thứ tự học đề xuất.'
    },
    'integrating-ai-capabilities': {
      title: 'Sơ cấp 4: thêm năng lực AI vào nguyên mẫu',
      description:
        'Kết nối API thật để biến giao diện từ "xem được" thành "dùng được".'
    },
    'appendix-b-common-errors': {
      title: 'Phụ lục: lỗi thường gặp và cách xử lý',
      description:
        'Nhanh chóng xác định và sửa lỗi môi trường, phụ thuộc hoặc khi chạy.'
    },
    'complete-project-practice': {
      title: 'Sơ cấp 5: thực chiến dự án hoàn chỉnh',
      description:
        'Ghép các năng lực rời rạc thành một luồng nghiệp vụ hoàn chỉnh có thể trình bày.'
    },
    'figma-mastergo': {
      title: 'Nâng cao: nhập môn Figma và MasterGo',
      description:
        'Tiếp tục củng cố quy trình cộng tác từ thiết kế đến phát triển.'
    }
  }
}

const localizedStage2ArticleText = {
  en: {
    'ai-interface-code': {
      title: 'Junior Backend: API Design and Development',
      description:
        'Connect AI capabilities through maintainable backend interfaces.'
    },
    'fullstack-app': {
      title: 'Stage 2 Assignment: Full-Stack App',
      description:
        'Upgrade prototype skills into a deployable full-stack application.'
    },
    'database-supabase': {
      title: 'Junior Backend: Database to Supabase',
      description: 'Add data modeling, storage, and permission capabilities.'
    },
    'ui-design': {
      title: '2.2 Build a Modern App: UI Design',
      description:
        'Complete page hierarchy, components, and layout under a unified visual system.'
    },
    'design-to-code': {
      title: '2.6 From Design Prototype to Code',
      description:
        'Convert design files into maintainable frontend code and components.'
    },
    'modern-component-library': {
      title: '2.7 Upgrade UI with Modern Component Libraries',
      description:
        'Use component libraries to improve consistency and development speed.'
    }
  },
  'vi-vn': {
    'ai-interface-code': {
      title: 'Backend sơ-trung cấp: thiết kế và phát triển API',
      description: 'Kết nối năng lực AI qua các API backend dễ bảo trì.'
    },
    'fullstack-app': {
      title: 'Bài tập Stage 2: ứng dụng full-stack',
      description:
        'Nâng kỹ năng nguyên mẫu thành ứng dụng full-stack có thể triển khai.'
    },
    'database-supabase': {
      title: 'Backend sơ-trung cấp: từ cơ sở dữ liệu đến Supabase',
      description: 'Bổ sung mô hình dữ liệu, lưu trữ và phân quyền.'
    },
    'ui-design': {
      title: '2.2 Xây dựng ứng dụng hiện đại đầu tiên - Thiết kế UI',
      description:
        'Hoàn thiện tầng trang, component và bố cục trong một hệ thống thị giác thống nhất.'
    },
    'design-to-code': {
      title: '2.6 Từ prototype thiết kế đến code',
      description:
        'Chuyển thiết kế thành code frontend và cấu trúc component dễ bảo trì.'
    },
    'modern-component-library': {
      title: '2.7 Cập nhật giao diện bằng thư viện component hiện đại',
      description:
        'Dùng thư viện component để tăng tính nhất quán và tốc độ phát triển.'
    }
  }
}

for (const locale of Object.keys(localizedStage2ArticleText)) {
  localizedArticleText[locale] = {
    ...localizedStage2ArticleText[locale],
    ...localizedArticleText[locale]
  }
}

const withLocalizedArticleText = (item, locale) => {
  const text = localizedArticleText[locale]?.[getArticleSlug(item.href)]
  return text ? { ...item, ...text } : item
}

const localizeArticleLinks = (items, locale) =>
  items.map((item) => ({
    ...withLocalizedArticleText(item, locale),
    href: item.href.replace(/^\/zh-cn\/stage-1\//, `/${locale}/stage-1/`)
  }))

export const relatedArticlesMap = new Proxy(rawRelatedArticlesMap, {
  get(target, prop) {
    if (typeof prop !== 'string') return target[prop]
    if (prop in target) return target[prop]

    const locale = getLocaleFromKey(prop)
    if (!locale || locale === 'zh-cn') return undefined

    const fallbackKey = prop.replace(`${locale}/`, 'zh-cn/')
    const fallbackItems = target[fallbackKey]
    if (!fallbackItems) return undefined

    return localizeArticleLinks(fallbackItems, locale)
  }
})
