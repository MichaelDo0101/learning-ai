import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'
import markdownEmojiTabler from './markdown-emoji-tabler.mjs'

// 判断是否是 Vercel 环境， github page 和 vercel 的部署地址相关不一样
const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL_URL
// 检查是否为 EdgeOne 部署 (通过环境变量 EDGEONE 判断)
const isEdgeOne = !!process.env.EDGEONE || process.env.EDGEONE === '1'

// 确定 Base 路径：
// 1. 如果设置了 BASE 环境变量，优先使用
// 2. 如果là dev mode (npm run dev / preview), dùng '/' để URL local đơn giản
// 3. 如果是 Vercel 或 EdgeOne，默认使用根路径 '/'
// 4. 否则（如 GitHub Pages production build），使用 '/easy-vibe/'
const npmEvent = process.env.npm_lifecycle_event || ''
const isDev = npmEvent === 'dev' || npmEvent === 'preview' || process.env.NODE_ENV === 'development'
const base = process.env.BASE || (isDev || isVercel || isEdgeOne ? '/' : '/learning-ai/')

// 站点 URL 配置 - 根据部署环境动态确定
const getSiteUrl = () => {
  if (isVercel && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (isEdgeOne && process.env.EDGEONE_URL) {
    return `https://${process.env.EDGEONE_URL}`
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL
  }
  return 'https://MichaelDo0101.github.io/learning-ai'
}

const siteUrl = getSiteUrl()

// 语言映射配置
const localeMap = {
  'vi-vn': {
    ogLocale: 'vi_VN',
    twitterSite: '@MichaelDo0101',
    lang: 'vi-VN',
    hreflang: 'vi'
  },
  en: {
    ogLocale: 'en_US',
    twitterSite: '@MichaelDo0101',
    lang: 'en-US',
    hreflang: 'en'
  }
}

// SEO 相关配置
const getSeoHead = (locale, title, description, path = '') => {
  const seoConfig = localeMap[locale] || localeMap['vi-vn']
  const canonicalUrl = path ? `${siteUrl}${path}` : `${siteUrl}/${locale}/`
  const ogImageUrl = `${siteUrl}${base}og-image.png`.replace('//', '/')

  // 从路径中提取页面相对路径（去掉语言前缀）
  const getRelativePath = (fullPath, currentLocale) => {
    if (!fullPath) return ''
    const prefix = `/${currentLocale}/`
    if (fullPath.startsWith(prefix)) {
      return fullPath.slice(prefix.length)
    }
    return fullPath.replace(/^\//, '')
  }

  const relativePath = getRelativePath(path, locale)

  const head = [
    // Favicon — SVG primary (modern browsers) + ICO fallback (legacy)
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg?v=3`.replace('//', '/') }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: `${base}favicon.ico?v=3`.replace('//', '/') }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${base}favicon-16x16.png?v=3`.replace('//', '/') }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}favicon-32x32.png?v=3`.replace('//', '/') }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}apple-touch-icon.png?v=3`.replace('//', '/') }],
    ['link', { rel: 'manifest', href: `${base}site.webmanifest`.replace('//', '/') }],
    [
      'link',
      { rel: 'stylesheet', href: `${base}style.css`.replace('//', '/') }
    ],
    ['meta', { name: 'theme-color', content: '#1153c9' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1153c9' }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['link', { rel: 'canonical', href: canonicalUrl }],
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: seoConfig.ogLocale }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImageUrl }],
    ['meta', { property: 'og:image:alt', content: title }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: seoConfig.twitterSite }],
    ['meta', { name: 'twitter:creator', content: seoConfig.twitterSite }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImageUrl }],
    ['meta', { name: 'twitter:image:alt', content: title }],
    // Additional SEO
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Task AI Wiki,học AI,Vibe Coding,AI Coding,lập trình AI,ChatGPT,Claude Code,Cursor,AI IDE,Generative AI,Agentic AI,full-stack,học lập trình cho người mới,prompt engineering,MCP,RAG,Supabase,React,LLM,trí tuệ nhân tạo,khóa học AI tiếng Việt'
      }
    ],
    ['meta', { name: 'author', content: 'Task AI Wiki' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['meta', { name: 'baiduspider', content: 'index,follow' }],
    ['meta', { name: 'bingbot', content: 'index,follow' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'revisit-after', content: '7 days' }]
  ]

  // 添加 hreflang 标签 - 指向相同页面的不同语言版本
  Object.keys(localeMap).forEach((lang) => {
    let alternateUrl = `${siteUrl}/${lang}/`
    if (relativePath) {
      alternateUrl = `${siteUrl}/${lang}/${relativePath}`
    }
    head.push([
      'link',
      {
        rel: 'alternate',
        hreflang: localeMap[lang].hreflang,
        href: alternateUrl
      }
    ])
  })
  head.push([
    'link',
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/vi-vn/` }
  ])

  // 添加 JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    description: description,
    url: siteUrl,
    inLanguage: seoConfig.ogLocale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Task AI Wiki',
      url: 'https://MichaelDo0101.github.io/learning-ai',
      logo: {
        '@type': 'ImageObject',
        url: ogImageUrl
      },
      sameAs: ['https://github.com/MichaelDo0101/learning-ai']
    },
    mainEntity: {
      '@type': 'Course',
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'Task AI Wiki',
        sameAs: 'https://github.com/MichaelDo0101/learning-ai'
      },
      educationalLevel: 'Beginner to Advanced',
      learningResourceType: 'Course'
    }
  }
  head.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])

  // 生成动态 BreadcrumbList 结构化数据
  const generateBreadcrumbList = () => {
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'vi-vn' ? 'Trang chủ' : 'Home',
        item: `${siteUrl}/${locale}/`
      }
    ]

    if (relativePath) {
      // 解析路径生成面包屑
      const pathParts = relativePath.split('/').filter(Boolean)
      let currentPath = ''

      // Tên hiển thị cho từng đoạn URL trên breadcrumb
      const segmentNames = {
        'vi-vn': {
          'stage-1': 'PM Sản phẩm AI',
          'stage-2': 'Lập trình viên Trung cấp',
          'stage-3': 'Lập trình viên Nâng cao',
          appendix: 'Phụ lục',
          guide: 'Hướng dẫn',
          frontend: 'Frontend',
          backend: 'Backend',
          'ai-capabilities': 'Năng lực AI',
          'core-skills': 'Kỹ năng cốt lõi',
          'cross-platform': 'Đa nền tảng',
          'personal-brand': 'Thương hiệu cá nhân',
          'ai-advanced': 'AI Nâng cao'
        },
        en: {
          'stage-1': 'AI Product Manager',
          'stage-2': 'Junior Developer',
          'stage-3': 'Senior Developer',
          appendix: 'Appendix',
          guide: 'Guide',
          frontend: 'Frontend',
          backend: 'Backend',
          'ai-capabilities': 'AI Capabilities',
          'core-skills': 'Core Skills',
          'cross-platform': 'Cross-platform',
          'personal-brand': 'Personal Brand',
          'ai-advanced': 'AI Advanced'
        }
      }

      const names = segmentNames[locale] || segmentNames['vi-vn']

      pathParts.forEach((part, index) => {
        currentPath += `/${part}`
        const name = names[part] || part.replace(/-/g, ' ')
        items.push({
          '@type': 'ListItem',
          position: index + 2,
          name: name,
          item: `${siteUrl}/${locale}${currentPath}/`
        })
      })
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    }
  }

  const breadcrumbJsonLd = generateBreadcrumbList()
  head.push([
    'script',
    { type: 'application/ld+json', class: 'breadcrumb-jsonld' },
    JSON.stringify(breadcrumbJsonLd)
  ])

  return head
}

const commonHead = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg`.replace('//', '/') }],
  ['link', { rel: 'icon', type: 'image/x-icon', href: `${base}favicon.ico`.replace('//', '/') }],
  ['link', { rel: 'stylesheet', href: `${base}style.css`.replace('//', '/') }],
  ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }]
]

const commonThemeConfig = {
  logo: '/logo.png',
  siteTitle: 'Task AI Wiki',
  search: {
    provider: 'local'
  },
  // socialLinks: [
  //   { icon: 'github', link: 'https://github.com/MichaelDo0101/learning-ai' }
  // ],
  editLink: {
    pattern: 'https://github.com/MichaelDo0101/learning-ai/edit/main/docs/:path',
    text: 'Edit this page on GitHub'
  },
  outline: {
    level: [1, 6]
  },
  footer: {
    message:
      'Tài liệu thuộc dự án <a href="https://github.com/MichaelDo0101/learning-ai" target="_blank" rel="noreferrer">Task AI Wiki</a> · Phái sinh từ <a href="https://github.com/datawhalechina/easy-vibe" target="_blank" rel="noreferrer">datawhalechina/easy-vibe</a> (mã nguồn mở)',
    copyright:
      'Tài liệu được phát hành theo giấy phép <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> · © 2026 Task AI Wiki'
  }
}

const productManagerSidebarEn = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Learning Map', link: '/en/stage-1/learning-map/' },
      {
        text: 'AI Era: If You Can Speak, You Can Code',
        link: '/en/stage-1/ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: 'Product Prototype Skills',
    collapsed: false,
    items: [
      {
        text: 'Master AI Programming Tools',
        link: '/en/stage-1/introduction-to-ai-ide/'
      },
      {
        text: 'Find Great Ideas',
        link: '/en/stage-1/finding-great-idea/'
      },
      {
        text: 'Build Product Prototypes',
        link: '/en/stage-1/building-prototype/'
      },
      {
        text: 'Integrate AI Capabilities',
        link: '/en/stage-1/integrating-ai-capabilities/'
      },
      {
        text: 'Complete Project Practice',
        link: '/en/stage-1/complete-project-practice/'
      }
    ]
  },
  {
    text: 'Appendix: Business Thinking',
    collapsed: false,
    items: [
      {
        text: 'Product Thinking and Solution Design',
        link: '/en/stage-1/appendix-a-product-thinking/'
      },
      {
        text: 'AI Industry Application Scenarios (B-end)',
        link: '/en/stage-1/appendix-industry-scenarios/'
      },
      {
        text: 'AI Consumer Scenarios Inspiration (C-end)',
        link: '/en/stage-1/appendix-c-consumer-scenarios/'
      }
    ]
  },
  {
    text: 'Appendix: User Research and Validation',
    collapsed: false,
    items: [
      {
        text: 'Where to Find Ideas: 3 Reference Sources That Work Best for Beginners',
        link: '/en/stage-1/appendix-idea-sources/'
      },
      {
        text: 'Double Diamond: First Do the Right Thing, Then Do It Right',
        link: '/en/stage-1/appendix-double-diamond/'
      },
      {
        text: 'Use Jobs to Be Done to Find What Users Really Want to Get Done',
        link: '/en/stage-1/appendix-jobs-to-be-done/'
      },
      {
        text: 'The Mom Test: A User Interview Method for Validating Demand',
        link: '/en/stage-1/appendix-mom-test/'
      }
    ]
  },
  {
    text: 'Appendix: Technical Solutions',
    collapsed: false,
    items: [
      {
        text: 'What to do if you encounter errors',
        link: '/en/stage-1/appendix-b-common-errors/'
      },
      {
        text: 'Comparison of Seven AI Programming Tools',
        link: '/en/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
      },
      {
        text: 'Design Websites with Agents',
        link: '/en/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
      }
    ]
  }
]

const stage2SidebarEn = [
  {
    text: 'Frontend Development',
    collapsed: false,
    items: [
      {
        text: 'Asset Production & Agent Building',
        link: '/en/stage-2/frontend/lovart-assets/'
      },
      {
        text: 'Figma & MasterGo Basics',
        link: '/en/stage-2/frontend/figma-mastergo/'
      },
      {
        text: 'UI Design Specs & Multi-Product Interface',
        link: '/en/stage-2/frontend/ui-design/'
      },
      {
        text: 'Multi-Product UI Design',
        link: '/en/stage-2/frontend/multi-product-ui/'
      },
      {
        text: 'LLM & Skills Interface Beautification',
        link: '/en/stage-2/frontend/llm-skills-beautiful/'
      },
      {
        text: 'Design Prototype to Project Code',
        link: '/en/stage-2/frontend/design-to-code/'
      },
      {
        text: 'Modern Component Libraries',
        link: '/en/stage-2/frontend/modern-component-library/'
      }
    ]
  },
  {
    text: 'Backend & Full-Stack',
    collapsed: false,
    items: [
      {
        text: 'Git & GitHub Workflow',
        link: '/en/stage-2/backend/git-workflow/'
      },
      {
        text: 'Database & Supabase',
        link: '/en/stage-2/backend/database-supabase/'
      },
      {
        text: 'Backend API Design & Development',
        link: '/en/stage-2/backend/ai-interface-code/'
      },
      {
        text: 'Web App Deployment',
        link: '/en/stage-2/backend/zeabur-deployment/'
      },
      {
        text: 'Modern CLI Dev Tools',
        link: '/en/stage-2/backend/modern-cli/'
      },
      {
        text: 'Stripe Payment Integration',
        link: '/en/stage-2/backend/stripe-payment/'
      }
    ]
  },
  {
    text: 'AI Capabilities Appendix',
    collapsed: false,
    items: [
      {
        text: 'AI 1: Dify & Knowledge Base',
        link: '/en/stage-2/ai-capabilities/dify-knowledge-base/'
      }
    ]
  },
  {
    text: 'Comprehensive Projects',
    collapsed: false,
    items: [
      {
        text: 'Hogwarts Portraits Project',
        link: '/en/stage-2/frontend/hogwarts-portraits/'
      },
      {
        text: 'Project: AI Copywriting SaaS (Supabase)',
        link: '/en/stage-2/assignments/copywriting-platform-supabase/'
      },
      {
        text: 'Project: Dify-style Agent Platform',
        link: '/en/stage-2/assignments/custom-dify-agent-platform/'
      },
      {
        text: 'Project: Exam System (Express)',
        link: '/en/stage-2/assignments/exam-management-express/'
      },
      {
        text: 'Project: Modern AI Image SaaS',
        link: '/en/stage-2/assignments/modern-landing-page/'
      },
      {
        text: 'Project: Movie Recommendation (Spring Boot)',
        link: '/en/stage-2/assignments/movie-recommendation-springboot/'
      },
      {
        text: 'Project: Grocery Microservices',
        link: '/en/stage-2/assignments/simple-grocery-microservices/'
      },
      {
        text: 'Project: Traffic Data Visualization (Go)',
        link: '/en/stage-2/assignments/traffic-data-visualization-go/'
      },
      {
        text: 'Project: Travel Planning Agent',
        link: '/en/stage-2/assignments/travel-planning-agent-platform/'
      }
    ]
  }
]

const stage3SidebarEn = [
  {
    text: 'Core Skills',
    collapsed: false,
    items: [
      {
        text: 'Claude Code Quickstart Core Guide',
        link: '/en/stage-3/core-skills/basics/'
      },
      {
        text: 'MCP and Claude Code Complete Guide',
        link: '/en/stage-3/core-skills/mcp/'
      },
      {
        text: 'Claude Code Skills Complete Guide',
        link: '/en/stage-3/core-skills/skills/'
      },
      {
        text: 'Making Claude Code Work on Long-Running Tasks',
        link: '/en/stage-3/core-skills/long-running-tasks/'
      },
      {
        text: 'Claude Agent Teams Complete Guide',
        link: '/en/stage-3/core-skills/agent-teams/'
      },
      {
        text: 'Claude Code Superpowers for Production-Grade Development',
        link: '/en/stage-3/core-skills/superpowers/'
      },
      {
        text: 'AI-Assisted Development Workflow',
        link: '/en/stage-3/core-skills/workflow/'
      },
      {
        text: 'Claude Code Remote Development on Mobile',
        link: '/en/stage-3/core-skills/mobile-development/'
      },
      {
        text: 'Claude Agent SDK Complete Guide',
        link: '/en/stage-3/core-skills/claude-agent-sdk/'
      },
      {
        text: 'From Vibe Coding to Spec Coding',
        link: '/en/stage-3/core-skills/spec-coding/'
      }
    ]
  },
  {
    text: 'Cross-Platform Development',
    collapsed: false,
    items: [
      {
        text: 'How to Choose the Right Platform for Your App',
        link: '/en/stage-3/cross-platform/choose-platform/'
      },
      {
        text: 'How to Build a Simple WeChat Mini Program',
        link: '/en/stage-3/cross-platform/wechat-miniprogram/'
      },
      {
        text: 'How to Build a WeChat Mini Program with a Backend',
        link: '/en/stage-3/cross-platform/wechat-miniprogram-backend/'
      },
      {
        text: 'How to Build an Android App with Jetpack Compose',
        link: '/en/stage-3/cross-platform/android-app/'
      },
      {
        text: 'How to Build an iOS App with SwiftUI',
        link: '/en/stage-3/cross-platform/ios-app/'
      },
      {
        text: 'How to Build a PWA Local App',
        link: '/en/stage-3/cross-platform/pwa-local-app/'
      },
      {
        text: 'How to Build a Browser AI Assistant Extension',
        link: '/en/stage-3/cross-platform/browser-ai-extension/'
      },
      {
        text: 'How to Build a Cross-Platform Electron Desktop App',
        link: '/en/stage-3/cross-platform/electron-voice-to-text/'
      },
      {
        text: 'How to Quickly Build and Mint an NFT',
        link: '/en/stage-3/cross-platform/nft-minting/'
      },
      {
        text: 'How to Build a VS Code Extension',
        link: '/en/stage-3/cross-platform/vscode-extension/'
      },
      {
        text: 'How to Build an Industrial Qt Desktop App',
        link: '/en/stage-3/cross-platform/qt-industrial-hmi/'
      },
      {
        text: 'How to Build Your Personal Website and Academic Blog',
        link: '/en/stage-3/personal-brand/personal-website-blog/'
      }
    ]
  },
  {
    text: 'AI Advanced',
    collapsed: false,
    items: [
      {
        text: 'What Is RAG and How It Works',
        link: '/en/stage-3/ai-advanced/rag-introduction/'
      },
      {
        text: 'Advanced RAG and Workflow Orchestration with LangGraph',
        link: '/en/stage-3/ai-advanced/langgraph-advanced-rag/'
      }
    ]
  }
]

const appendixSidebarEn = [
  {
    text: 'I. Computer Fundamentals',
    collapsed: false,
    items: [
      {
        text: 'Full-Stack in Vibe Coding Era',
        link: '/en/appendix/1-computer-fundamentals/vibe-coding-fullstack'
      },
      {
        text: 'Power On to Web Visit',
        link: '/en/appendix/1-computer-fundamentals/power-on-to-web'
      },
      {
        text: 'Transistor to CPU',
        link: '/en/appendix/1-computer-fundamentals/transistor-to-cpu'
      },
      {
        text: 'Computer Organization',
        link: '/en/appendix/1-computer-fundamentals/computer-organization'
      },
      {
        text: 'Operating Systems',
        link: '/en/appendix/1-computer-fundamentals/operating-systems'
      },
      {
        text: 'Data Encoding & Storage',
        link: '/en/appendix/1-computer-fundamentals/data-encoding-storage'
      },
      {
        text: 'Computer Networks',
        link: '/en/appendix/1-computer-fundamentals/computer-networks'
      },
      {
        text: 'Data Structures',
        link: '/en/appendix/1-computer-fundamentals/data-structures'
      },
      {
        text: 'Algorithm Thinking',
        link: '/en/appendix/1-computer-fundamentals/algorithm-thinking'
      },
      {
        text: 'Programming Languages',
        link: '/en/appendix/1-computer-fundamentals/programming-languages'
      },
      {
        text: 'Compilers Intro',
        link: '/en/appendix/1-computer-fundamentals/compilers'
      },
      {
        text: 'Type Systems Intro',
        link: '/en/appendix/1-computer-fundamentals/type-systems'
      }
    ]
  },
  {
    text: 'II. Tools & Environment',
    collapsed: false,
    items: [
      {
        text: 'IDE Basics',
        link: '/en/appendix/2-development-tools/ide-basics'
      },
      {
        text: 'Command Line & Shell',
        link: '/en/appendix/2-development-tools/command-line-shell'
      },
      {
        text: 'Git: Code Time Machine',
        link: '/en/appendix/2-development-tools/git-version-control'
      },
      {
        text: 'Env Vars & PATH',
        link: '/en/appendix/2-development-tools/environment-path'
      },
      {
        text: 'Ports & Localhost',
        link: '/en/appendix/2-development-tools/ports-localhost'
      },
      {
        text: 'SSH & Key Auth',
        link: '/en/appendix/2-development-tools/ssh-authentication'
      },
      {
        text: 'Package Managers',
        link: '/en/appendix/2-development-tools/package-managers'
      },
      {
        text: 'Art of Debugging',
        link: '/en/appendix/2-development-tools/debugging-art'
      },
      {
        text: 'Regex',
        link: '/en/appendix/2-development-tools/regex'
      }
    ]
  },
  {
    text: 'III. Browser & Frontend',
    collapsed: false,
    items: [
      {
        text: 'JavaScript Deep Dive',
        link: '/en/appendix/3-browser-and-frontend/javascript-deep-dive'
      },
      {
        text: 'TypeScript Intro',
        link: '/en/appendix/3-browser-and-frontend/typescript'
      },
      {
        text: 'Frontend Frameworks',
        link: '/en/appendix/3-browser-and-frontend/frontend-frameworks'
      },
      {
        text: 'Browser as OS / Rendering Pipeline',
        link: '/en/appendix/3-browser-and-frontend/browser-as-os-rendering'
      },
      {
        text: 'HTML / CSS Layout',
        link: '/en/appendix/3-browser-and-frontend/html-css-layout'
      },
      {
        text: 'JS Runtime',
        link: '/en/appendix/3-browser-and-frontend/javascript-runtime'
      },
      {
        text: 'Nature of Frameworks',
        link: '/en/appendix/3-browser-and-frontend/frontend-framework-nature'
      },
      {
        text: 'State Management',
        link: '/en/appendix/3-browser-and-frontend/state-management'
      },
      {
        text: 'Routing & Navigation',
        link: '/en/appendix/3-browser-and-frontend/routing-navigation'
      },
      {
        text: 'Graphics & Animation',
        link: '/en/appendix/3-browser-and-frontend/graphics-animation'
      },
      {
        text: 'Real-time Comm',
        link: '/en/appendix/3-browser-and-frontend/realtime-communication'
      },
      {
        text: 'Web Performance',
        link: '/en/appendix/3-browser-and-frontend/web-performance'
      },
      {
        text: 'Frontend Engineering',
        link: '/en/appendix/3-browser-and-frontend/frontend-engineering'
      },
      {
        text: 'Project Architecture',
        link: '/en/appendix/3-browser-and-frontend/frontend-project-architecture'
      },
      {
        text: 'A11y & i18n',
        link: '/en/appendix/3-browser-and-frontend/a11n-i18n'
      }
    ]
  },
  {
    text: 'IV. Server & Backend',
    collapsed: false,
    items: [
      {
        text: 'Backend Languages',
        link: '/en/appendix/4-server-and-backend/backend-languages'
      },
      {
        text: 'Client Languages',
        link: '/en/appendix/4-server-and-backend/client-languages'
      },
      {
        text: 'Cross-platform Solutions',
        link: '/en/appendix/4-server-and-backend/cross-platform'
      },
      {
        text: 'HTTP Protocol',
        link: '/en/appendix/4-server-and-backend/http-protocol'
      },
      {
        text: 'Request Journey',
        link: '/en/appendix/4-server-and-backend/request-journey'
      },
      {
        text: 'Web Frameworks',
        link: '/en/appendix/4-server-and-backend/web-frameworks'
      },
      {
        text: 'API Intro',
        link: '/en/appendix/4-server-and-backend/api-intro'
      },
      {
        text: 'API Design Philosophy',
        link: '/en/appendix/4-server-and-backend/api-design'
      },
      {
        text: 'Serialization',
        link: '/en/appendix/4-server-and-backend/serialization'
      },
      {
        text: 'Auth & Authorization',
        link: '/en/appendix/4-server-and-backend/auth-authorization'
      },
      {
        text: 'Concurrency & Async',
        link: '/en/appendix/4-server-and-backend/concurrency-async'
      },
      {
        text: 'Caching Strategies',
        link: '/en/appendix/4-server-and-backend/caching'
      },
      {
        text: 'Message Queues',
        link: '/en/appendix/4-server-and-backend/message-queues'
      },
      {
        text: 'Async Task Queues',
        link: '/en/appendix/4-server-and-backend/async-task-queues'
      },
      {
        text: 'Rate Limiting',
        link: '/en/appendix/4-server-and-backend/rate-limiting-backpressure'
      },
      {
        text: 'Search Engine Principles',
        link: '/en/appendix/4-server-and-backend/search-engines'
      },
      {
        text: 'File Storage',
        link: '/en/appendix/4-server-and-backend/file-storage'
      },
      {
        text: 'Backend Architecture',
        link: '/en/appendix/4-server-and-backend/backend-layered-architecture'
      },
      {
        text: 'Project Architecture',
        link: '/en/appendix/4-server-and-backend/backend-project-architecture'
      },
      {
        text: 'DSL Intro',
        link: '/en/appendix/4-server-and-backend/domain-specific-languages'
      }
    ]
  },
  {
    text: 'V. Data',
    collapsed: false,
    items: [
      {
        text: 'Database Fundamentals',
        link: '/en/appendix/5-data/database-fundamentals'
      },
      {
        text: 'Data Models Panorama',
        link: '/en/appendix/5-data/data-models'
      },
      {
        text: 'Data Tracking',
        link: '/en/appendix/5-data/data-tracking'
      },
      {
        text: 'Data Analysis',
        link: '/en/appendix/5-data/data-analysis'
      },
      {
        text: 'A/B Testing',
        link: '/en/appendix/5-data/ab-testing'
      },
      {
        text: 'Data Visualization',
        link: '/en/appendix/5-data/data-visualization'
      },
      {
        text: 'Data Governance',
        link: '/en/appendix/5-data/data-governance'
      }
    ]
  },
  {
    text: 'VI. Architecture',
    collapsed: false,
    items: [
      {
        text: 'Monolith to Microservices',
        link: '/en/appendix/6-architecture-and-system-design/monolith-to-microservices'
      },
      {
        text: 'Distributed Systems',
        link: '/en/appendix/6-architecture-and-system-design/distributed-systems'
      },
      {
        text: 'HA & Disaster Recovery',
        link: '/en/appendix/6-architecture-and-system-design/high-availability'
      },
      {
        text: 'System Design',
        link: '/en/appendix/6-architecture-and-system-design/system-design-methodology'
      }
    ]
  },
  {
    text: 'VII. Infrastructure',
    collapsed: false,
    items: [
      {
        text: 'Linux Basics',
        link: '/en/appendix/7-infrastructure-and-operations/linux-basics'
      },
      {
        text: 'Docker Containers',
        link: '/en/appendix/7-infrastructure-and-operations/docker-containers'
      },
      {
        text: 'Kubernetes',
        link: '/en/appendix/7-infrastructure-and-operations/kubernetes'
      },
      {
        text: 'CI / CD',
        link: '/en/appendix/7-infrastructure-and-operations/ci-cd'
      },
      {
        text: 'Domain, DNS & HTTPS',
        link: '/en/appendix/7-infrastructure-and-operations/dns-https'
      },
      {
        text: 'Load Balancing',
        link: '/en/appendix/7-infrastructure-and-operations/load-balancing-gateway'
      },
      {
        text: 'Gateway & Reverse Proxy',
        link: '/en/appendix/7-infrastructure-and-operations/gateway-proxy'
      },
      {
        text: 'Cloud Platforms',
        link: '/en/appendix/7-infrastructure-and-operations/cloud-platforms'
      },
      {
        text: 'IAM',
        link: '/en/appendix/7-infrastructure-and-operations/cloud-iam'
      },
      {
        text: 'Storage & CDN',
        link: '/en/appendix/7-infrastructure-and-operations/cloud-storage-cdn'
      },
      {
        text: 'IaC',
        link: '/en/appendix/7-infrastructure-and-operations/infrastructure-as-code'
      },
      {
        text: 'Monitoring & Logging',
        link: '/en/appendix/7-infrastructure-and-operations/monitoring-logging'
      },
      {
        text: 'Incident Response',
        link: '/en/appendix/7-infrastructure-and-operations/incident-response'
      }
    ]
  },
  {
    text: 'VIII. Artificial Intelligence',
    collapsed: false,
    items: [
      {
        text: 'AI History & Concepts',
        link: '/en/appendix/8-artificial-intelligence/ai-history'
      },
      {
        text: 'Neural Networks',
        link: '/en/appendix/8-artificial-intelligence/neural-networks'
      },
      {
        text: 'Transformer & Attention',
        link: '/en/appendix/8-artificial-intelligence/transformer-attention'
      },
      {
        text: 'LLM Principles',
        link: '/en/appendix/8-artificial-intelligence/llm-principles'
      },
      {
        text: 'Prompt Engineering',
        link: '/en/appendix/8-artificial-intelligence/prompt-engineering'
      },
      {
        text: 'Context Engineering',
        link: '/en/appendix/8-artificial-intelligence/context-engineering'
      },
      {
        text: 'Multimodal Models',
        link: '/en/appendix/8-artificial-intelligence/multimodal-models'
      },
      {
        text: 'Image Generation',
        link: '/en/appendix/8-artificial-intelligence/image-generation'
      },
      {
        text: 'Speech Synthesis',
        link: '/en/appendix/8-artificial-intelligence/speech-synthesis-recognition'
      },
      {
        text: 'Embedding & Vector Search',
        link: '/en/appendix/8-artificial-intelligence/embedding-vector-retrieval'
      },
      {
        text: 'RAG Architecture',
        link: '/en/appendix/8-artificial-intelligence/rag'
      },
      {
        text: 'AI Agent & Tools',
        link: '/en/appendix/8-artificial-intelligence/ai-agents'
      },
      {
        text: 'AI Protocols (MCP)',
        link: '/en/appendix/8-artificial-intelligence/ai-protocols'
      },
      {
        text: 'Fine-tuning & Deployment',
        link: '/en/appendix/8-artificial-intelligence/model-finetuning-deployment'
      },
      {
        text: 'AI Native Design',
        link: '/en/appendix/8-artificial-intelligence/ai-native-app-design'
      },
      {
        text: 'AI Dictionary',
        link: '/en/appendix/8-artificial-intelligence/ai-capability-dictionary'
      }
    ]
  },
  {
    text: 'IX. Engineering Excellence',
    collapsed: false,
    items: [
      {
        text: 'Code Quality',
        link: '/en/appendix/9-engineering-excellence/code-quality-refactoring'
      },
      {
        text: 'Testing Strategies',
        link: '/en/appendix/9-engineering-excellence/testing-strategies'
      },
      {
        text: 'Design Patterns',
        link: '/en/appendix/9-engineering-excellence/design-patterns'
      },
      {
        text: 'Security Thinking',
        link: '/en/appendix/9-engineering-excellence/security-thinking'
      },
      {
        text: 'Technical Writing',
        link: '/en/appendix/9-engineering-excellence/technical-writing'
      },
      {
        text: 'Open Source',
        link: '/en/appendix/9-engineering-excellence/open-source-collaboration'
      },
      {
        text: 'Tech Selection',
        link: '/en/appendix/9-engineering-excellence/technology-selection'
      }
    ]
  }
]

const localizeSidebarLinks = (sidebar, locale) =>
  sidebar.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      // Cover the legacy `/zh-cn/` paths that survived in EN sidebars upstream
      link: item.link.replace(/^\/(?:en|vi-vn|zh-cn)\//, `/${locale}/`)
    }))
  }))

const stage1SidebarLabels = {
  'vi-vn': [
    {
      text: 'Nhập môn',
      items: ['Lộ trình học tập', 'Thời đại AI, biết nói là biết lập trình']
    },
    {
      text: 'Thực hành nguyên mẫu sản phẩm',
      items: [
        'Học công cụ lập trình AI',
        'Tìm ý tưởng tốt',
        'Xây dựng nguyên mẫu sản phẩm',
        'Tích hợp năng lực AI',
        'Thực chiến dự án hoàn chỉnh'
      ]
    },
    {
      text: 'Phụ lục: tư duy kinh doanh',
      items: [
        'Tư duy sản phẩm và thiết kế giải pháp',
        'Tham khảo kịch bản ứng dụng AI trong ngành (B2B)',
        'Gợi ý kịch bản tiêu dùng với AI (B2C)'
      ]
    },
    {
      text: 'Phụ lục: nghiên cứu người dùng và xác thực nhu cầu',
      items: [
        'Tìm ý tưởng ở đâu: 3 nguồn phù hợp cho người mới',
        'Double Diamond: làm đúng việc trước, rồi làm đúng cách',
        'Dùng Jobs to Be Done để tìm điều người dùng thật sự muốn hoàn thành',
        'The Mom Test: phỏng vấn người dùng để xác thực nhu cầu'
      ]
    },
    {
      text: 'Phụ lục: giải pháp kỹ thuật',
      items: [
        'Làm gì khi gặp lỗi trong code',
        'So sánh bảy công cụ lập trình AI',
        'Thiết kế website bằng agent thiết kế và agent lập trình'
      ]
    }
  ]
}

const applySidebarLabels = (sidebar, locale) => {
  const labels = stage1SidebarLabels[locale]
  if (!labels) return sidebar

  return sidebar.map((group, groupIndex) => ({
    ...group,
    text: labels[groupIndex]?.text ?? group.text,
    items: group.items.map((item, itemIndex) => ({
      ...item,
      text: labels[groupIndex]?.items[itemIndex] ?? item.text
    }))
  }))
}

const getStage1Sidebar = (locale) => {
  if (locale === 'en') return productManagerSidebarEn
  return applySidebarLabels(
    localizeSidebarLinks(productManagerSidebarEn, locale),
    locale
  )
}

const docFooterLabels = {
  en: { prev: 'Previous page', next: 'Next page' },
  'vi-vn': { prev: 'Trang trước', next: 'Trang tiếp theo' }
}

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
      md.use(markdownEmojiTabler)
    }
  },
  base: base,
  cleanUrls: true,
  ignoreDeadLinks: true,

  // Vite 配置
  vite: {
    server: {
      watch: {
        ignored: ['**/docs/.vitepress/dist/**']
      }
    },
    build: {
      chunkSizeWarningLimit: 2000
    }
  },

  // Sitemap 配置
  sitemap: {
    hostname: siteUrl,
    changefreq: 'weekly',
    priority: {
      '/': 1.0,
      '/vi-vn/': 0.9,
      '/vi-vn/stage-1/': 0.8,
      '/vi-vn/stage-2/': 0.8,
      '/vi-vn/stage-3/': 0.8,
      '/vi-vn/appendix/': 0.7
    },
    transformItems(items) {
      const baseClean = base.replace(/^\/+|\/+$/g, '')
      return items
        .filter((item) => {
          const url = item.url
          return !(
            url.includes('/extra/') ||
            url.includes('/examples/') ||
            url.includes('/project/')
          )
        })
        .map((item) =>
          baseClean ? { ...item, url: `${baseClean}/${item.url}` } : item
        )
    }
  },

  // 构建结束时动态生成 robots.txt
  async buildEnd(siteConfig) {
    const fs = await import('fs')
    const path = await import('path')

    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Block legacy content (đã migrate sang cấu trúc thư mục mới)
Disallow: /vi-vn/extra/
Disallow: /vi-vn/examples/
Disallow: /vi-vn/project/
Disallow: /en/extra/
Disallow: /en/examples/
Disallow: /en/project/

# 禁止抓取 VitePress 缓存和构建文件
Disallow: /.vitepress/
Disallow: /@fs/

# Sitemap 位置
Sitemap: ${siteUrl}/sitemap.xml
`

    const outDir =
      siteConfig.outDir || path.resolve(__dirname, '.vitepress/dist')
    const robotsPath = path.join(outDir, 'robots.txt')

    fs.writeFileSync(robotsPath, robotsTxt, 'utf-8')
    console.log(
      '✓ Generated robots.txt with sitemap URL:',
      `${siteUrl}/sitemap.xml`
    )

    // Copy all .md files to dist for download/copy features
    const srcDir = siteConfig.srcDir || path.resolve(outDir, '../../')
    function copyMdFiles(src, dest) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true })
      }
      const entries = fs.readdirSync(src, { withFileTypes: true })
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        const destPath = path.join(dest, entry.name)
        if (entry.isDirectory()) {
          if (
            entry.name === '.vitepress' ||
            entry.name === 'public' ||
            entry.name === 'node_modules'
          )
            continue
          copyMdFiles(srcPath, destPath)
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          fs.copyFileSync(srcPath, destPath)
        }
      }
    }
    console.log(
      '✓ Copying markdown files to output directory for download feature...'
    )
    copyMdFiles(srcDir, outDir)
  },

  // 多语言配置 - 使用 cn/en-us/ja 结构
  locales: {
    // Root — chỉ dùng cho 404 fallback, trang chủ thực tế tự redirect bởi docs/index.md
    root: {
      label: '',
      lang: 'vi-VN',
      link: '/vi-vn/',
      themeConfig: {
        ...commonThemeConfig,
        notFound: {
          title: 'Không tìm thấy trang',
          quote: 'Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.',
          linkText: 'Về trang chủ',
          linkUrl: '/vi-vn/'
        }
      }
    },
    // 英文
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Task AI Wiki',
      description:
        'Learn Vibe Coding from Zero to Advanced - Master AI programming with Claude Code, Cursor, and other AI IDE tools',
      head: getSeoHead(
        'en',
        'Task AI Wiki',
        'Learn Vibe Coding from Zero to Advanced - Master AI programming with Claude Code, Cursor, and other AI IDE tools'
      ),
      themeConfig: {
        ...commonThemeConfig,
        notFound: {
          title: 'Page Not Found',
          quote:
            'The page you are looking for does not exist or has been moved.',
          linkText: 'Take me home',
          linkUrl: '/en/'
        },
        outline: {
          level: [1, 6],
          label: 'On this page'
        },
        docFooter: docFooterLabels.en,
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: 'Getting Started',
            link: '/en/stage-1/learning-map/',
            activeMatch: '/en/stage-1/'
          },
          {
            text: 'Full-Stack Development',
            link: '/en/stage-2/frontend/lovart-assets/',
            activeMatch: '/en/stage-2/'
          },
          {
            text: 'Advanced Development',
            link: '/en/stage-3/core-skills/basics/',
            activeMatch: '/en/stage-3/'
          },
          {
            text: 'Appendix',
            link: '/en/appendix/index',
            activeMatch: '/en/appendix/'
          },
          {
            text: 'Vibe Stories',
            link: '/en/vibe-stories/story-1',
            activeMatch: '/en/vibe-stories/'
          },
          {
            text: 'Generative AI',
            link: '/en/generative-ai/',
            activeMatch: '/en/generative-ai/'
          },
          {
            text: 'Agentic AI',
            link: '/en/agentic-ai/',
            activeMatch: '/en/agentic-ai/'
          },
          {
            text: 'AI Tools',
            link: '/en/ai-tools/',
            activeMatch: '/en/ai-tools/'
          }
        ],
        sidebar: {
          '/en/vibe-stories/': [
            {
              text: 'Vibe Stories',
              collapsed: false,
              items: [
                {
                  text: 'He Left a Five-Figure Monthly Salary to Help Rural School Kids "Use AI to Block Flies"',
                  link: '/en/vibe-stories/story-1'
                },
                {
                  text: 'During Finals Week, I Secretly Built a "Campus Xianyu" with AI',
                  link: '/en/vibe-stories/story-2'
                },
                {
                  text: 'I Built Each Student a Tireless "Straight-A Study Buddy"',
                  link: '/en/vibe-stories/story-3'
                },
                {
                  text: 'At 48, a Truck Driver Pulled Several All-Nighters and Used AI to Build an Overseas Tool Site',
                  link: '/en/vibe-stories/story-4'
                }
              ]
            }
          ],
          '/en/generative-ai/': [
            {
              text: 'Generative AI',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/en/generative-ai/' },
                { text: '1. Solo Studio — 1 person = 1 film studio', link: '/en/generative-ai/1-solo-studio' },
                { text: '2. AI Music $3M — Suno + Spotify', link: '/en/generative-ai/2-ai-music-3m' },
                { text: '3. Virtual Influencer — Aitana + Vi An', link: '/en/generative-ai/3-virtual-influencer' },
                { text: '4. Solo SaaS $1M — Pieter Levels', link: '/en/generative-ai/4-solo-saas-million' },
                { text: '5. Sora 2 & TikTok — viral formats 2026', link: '/en/generative-ai/5-sora-2-tiktok' },
                { text: '6. Faceless Empire — YouTube + Etsy + TikTok Shop', link: '/en/generative-ai/6-faceless-empire' },
                { text: '7. Toolkit 2026 — complete stack', link: '/en/generative-ai/toolkit-2026' },
                { text: '8. Ethics & Legal 2026', link: '/en/generative-ai/ethics-2026' },
                { text: '9. 30-Day Roadmap', link: '/en/generative-ai/roadmap-30-days' }
              ]
            }
          ],
          '/en/agentic-ai/': [
            {
              text: 'Agentic AI',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/en/agentic-ai/' },
                { text: '1. Agent Foundation — What is AI Agent?', link: '/en/agentic-ai/1-agent-foundation' },
                { text: '2. Claude Code Deep — 30h autonomous', link: '/en/agentic-ai/2-claude-code-deep' },
                { text: '3. Computer Use — 72.5% baseline', link: '/en/agentic-ai/3-computer-use' },
                { text: '4. Multi-Agent — orchestrator-worker', link: '/en/agentic-ai/4-multi-agent' },
                { text: '5. Workflow Agent — n8n + Smax.ai', link: '/en/agentic-ai/5-workflow-agent' },
                { text: '6. MCP Ecosystem — 97M downloads/month', link: '/en/agentic-ai/6-mcp-ecosystem' },
                { text: '7. Toolkit Agent 2026', link: '/en/agentic-ai/toolkit-2026' },
                { text: '8. Safety & Evals — incidents 2025-2026', link: '/en/agentic-ai/safety-evals' },
                { text: '9. 30-Day Roadmap', link: '/en/agentic-ai/roadmap-30-days' }
              ]
            }
          ],
          '/en/ai-tools/': [
            { text: 'AI Tools', collapsed: false, items: [{ text: 'Overview', link: '/en/ai-tools/' }] },
            {
              text: 'A · Chat & search',
              collapsed: false,
              items: [
                { text: '1. ChatGPT — a versatile AI assistant', link: '/en/ai-tools/1-chatgpt' },
                { text: '9. Gemini — Google multimodal assistant', link: '/en/ai-tools/9-gemini' },
                { text: '10. Perplexity — answer engine with citations', link: '/en/ai-tools/10-perplexity' },
                { text: '11. Grok — real-time AI from X', link: '/en/ai-tools/11-grok' },
                { text: '13. NotebookLM — research from your docs', link: '/en/ai-tools/13-notebooklm' }
              ]
            },
            {
              text: 'B · Coding, IDE & builder',
              collapsed: false,
              items: [
                { text: '2. Claude Code — terminal coding agent', link: '/en/ai-tools/2-claude-code' },
                { text: '4. OpenAI Codex — coding agent', link: '/en/ai-tools/4-codex' },
                { text: '8. Cursor — AI code editor', link: '/en/ai-tools/8-cursor' },
                { text: '14. Windsurf — AI-native IDE', link: '/en/ai-tools/14-windsurf' },
                { text: '17. v0 — text-to-UI (Vercel)', link: '/en/ai-tools/17-v0' },
                { text: '18. Replit — cloud IDE + AI Agent', link: '/en/ai-tools/18-replit' }
              ]
            },
            {
              text: 'C · Productivity & media',
              collapsed: false,
              items: [
                { text: '15. Notion AI — AI in your workspace', link: '/en/ai-tools/15-notion-ai' },
                { text: '16. Gamma — AI slides & sites', link: '/en/ai-tools/16-gamma' },
                { text: '19. ElevenLabs — AI voice, clone & dub', link: '/en/ai-tools/19-elevenlabs' }
              ]
            },
            {
              text: 'D · Office agents & automation',
              collapsed: false,
              items: [
                { text: '3. Claude Cowork — office agent', link: '/en/ai-tools/3-claude-cowork' },
                { text: '12. n8n — connect apps & build AI agents', link: '/en/ai-tools/12-n8n' }
              ]
            },
            {
              text: 'E · Dev platform',
              collapsed: false,
              items: [
                { text: '5. GitHub — store code & collaborate', link: '/en/ai-tools/5-github' }
              ]
            },
            {
              text: 'F · Self-hosted agents',
              collapsed: false,
              items: [
                { text: '6. OpenClaw — local agent via chat', link: '/en/ai-tools/6-openclaw' },
                { text: '7. Hermes Agent — self-hosted agent', link: '/en/ai-tools/7-hermes-agent' }
              ]
            }
          ],
          '/en/stage-1/': productManagerSidebarEn,
          '/en/stage-2/': stage2SidebarEn,
          '/en/stage-3/': stage3SidebarEn,
          '/en/appendix/': appendixSidebarEn
        }
      }
    },
    'vi-vn': {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi-vn/',
      title: 'Task AI Wiki',
      description:
        'Học Vibe Coding từ cơ bản đến nâng cao - Làm chủ lập trình AI từ cơ bản đến chuyên sâu',
      head: getSeoHead(
        'vi-vn',
        'Task AI Wiki',
        'Học Vibe Coding từ cơ bản đến nâng cao - Làm chủ lập trình AI từ cơ bản đến chuyên sâu'
      ),
      themeConfig: {
        ...commonThemeConfig,
        notFound: {
          title: 'Không tìm thấy trang',
          quote:
            'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.',
          linkText: 'Về trang chủ',
          linkUrl: '/vi-vn/'
        },
        outline: {
          level: [1, 6],
          label: 'Điều hướng trang'
        },
        docFooter: docFooterLabels['vi-vn'],
        nav: [
          { text: 'Trang chủ', link: '/vi-vn/' },
          {
            text: 'Người mới & PM',
            link: '/vi-vn/stage-1/learning-map/',
            activeMatch: '/vi-vn/stage-1/'
          },
          {
            text: 'Phát triển Full Stack',
            link: '/vi-vn/stage-2/frontend/lovart-assets/',
            activeMatch: '/vi-vn/stage-2/'
          },
          {
            text: 'Phát triển Nâng cao',
            link: '/vi-vn/stage-3/core-skills/basics/',
            activeMatch: '/vi-vn/stage-3/'
          },
          {
            text: 'Phụ lục',
            link: '/vi-vn/appendix/',
            activeMatch: '/vi-vn/appendix/'
          },
          {
            text: 'Vibe Stories',
            link: '/vi-vn/vibe-stories/story-1',
            activeMatch: '/vi-vn/vibe-stories/'
          },
          {
            text: 'Generative AI',
            link: '/vi-vn/generative-ai/',
            activeMatch: '/vi-vn/generative-ai/'
          },
          {
            text: 'Agentic AI',
            link: '/vi-vn/agentic-ai/',
            activeMatch: '/vi-vn/agentic-ai/'
          },
          {
            text: 'Công cụ AI',
            link: '/vi-vn/ai-tools/',
            activeMatch: '/vi-vn/ai-tools/'
          }
        ],
        sidebar: {
          '/vi-vn/ai-tools/': [
            {
              text: 'Công cụ AI',
              collapsed: false,
              items: [{ text: 'Tổng quan', link: '/vi-vn/ai-tools/' }]
            },
            {
              text: 'A · Trợ lý hội thoại & tìm kiếm',
              collapsed: false,
              items: [
                { text: '1. ChatGPT — trợ lý AI đa năng', link: '/vi-vn/ai-tools/1-chatgpt' },
                { text: '9. Gemini — trợ lý đa phương thức (Google)', link: '/vi-vn/ai-tools/9-gemini' },
                { text: '10. Perplexity — answer engine có trích dẫn', link: '/vi-vn/ai-tools/10-perplexity' },
                { text: '11. Grok — AI real-time từ X', link: '/vi-vn/ai-tools/11-grok' },
                { text: '13. NotebookLM — nghiên cứu từ tài liệu', link: '/vi-vn/ai-tools/13-notebooklm' }
              ]
            },
            {
              text: 'B · Coding, IDE & builder',
              collapsed: false,
              items: [
                { text: '2. Claude Code — agent lập trình terminal', link: '/vi-vn/ai-tools/2-claude-code' },
                { text: '4. OpenAI Codex — coding agent', link: '/vi-vn/ai-tools/4-codex' },
                { text: '8. Cursor — AI code editor (Tab & Agent)', link: '/vi-vn/ai-tools/8-cursor' },
                { text: '14. Windsurf — AI-native IDE (agent Cascade)', link: '/vi-vn/ai-tools/14-windsurf' },
                { text: '17. v0 — text-to-UI (Vercel)', link: '/vi-vn/ai-tools/17-v0' },
                { text: '18. Replit — IDE đám mây + AI Agent', link: '/vi-vn/ai-tools/18-replit' }
              ]
            },
            {
              text: 'C · Năng suất & media',
              collapsed: false,
              items: [
                { text: '15. Notion AI — AI trong workspace', link: '/vi-vn/ai-tools/15-notion-ai' },
                { text: '16. Gamma — tạo slide/web bằng AI', link: '/vi-vn/ai-tools/16-gamma' },
                { text: '19. ElevenLabs — AI giọng nói, clone & dub', link: '/vi-vn/ai-tools/19-elevenlabs' }
              ]
            },
            {
              text: 'D · Trợ lý giao việc & tự động hoá',
              collapsed: false,
              items: [
                { text: '3. Claude Cowork — agent văn phòng', link: '/vi-vn/ai-tools/3-claude-cowork' },
                { text: '12. n8n — nối app & dựng AI Agent', link: '/vi-vn/ai-tools/12-n8n' }
              ]
            },
            {
              text: 'E · Nền tảng dev',
              collapsed: false,
              items: [
                { text: '5. GitHub — lưu code & cộng tác', link: '/vi-vn/ai-tools/5-github' }
              ]
            },
            {
              text: 'F · Agent tự host (nâng cao)',
              collapsed: false,
              items: [
                { text: '6. OpenClaw — agent local qua chat', link: '/vi-vn/ai-tools/6-openclaw' },
                { text: '7. Hermes Agent — agent tự host', link: '/vi-vn/ai-tools/7-hermes-agent' }
              ]
            },
            {
              text: '🌐 Hệ sinh thái · Google AI System',
              collapsed: false,
              items: [
                { text: 'Bản đồ toàn cảnh', link: '/vi-vn/ai-tools/google-ai-system/' },
                {
                  text: '1. Trợ lý trung tâm — Gemini',
                  link: '/vi-vn/ai-tools/google-ai-system/1-gemini'
                },
                {
                  text: '2. Tri thức tài liệu — NotebookLM',
                  link: '/vi-vn/ai-tools/google-ai-system/2-notebooklm'
                },
                {
                  text: '3. Năng suất văn phòng — Workspace AI',
                  link: '/vi-vn/ai-tools/google-ai-system/3-workspace-ai'
                },
                {
                  text: '4. Sáng tạo nội dung — Creative AI',
                  link: '/vi-vn/ai-tools/google-ai-system/4-creative-ai'
                },
                {
                  text: '5. Thử nghiệm prompt/API — AI Studio',
                  link: '/vi-vn/ai-tools/google-ai-system/5-ai-studio'
                },
                {
                  text: '6. Tự động hóa — Apps Script',
                  link: '/vi-vn/ai-tools/google-ai-system/6-apps-script'
                },
                {
                  text: '7. Xây ứng dụng — Firebase & Cloud',
                  link: '/vi-vn/ai-tools/google-ai-system/7-firebase-cloud'
                },
                {
                  text: '8. AI doanh nghiệp — Vertex AI',
                  link: '/vi-vn/ai-tools/google-ai-system/8-vertex-ai'
                },
                {
                  text: '9. Agent và code — Antigravity',
                  link: '/vi-vn/ai-tools/google-ai-system/9-antigravity-agent'
                },
                {
                  text: '10. AI trên thiết bị — AI Edge',
                  link: '/vi-vn/ai-tools/google-ai-system/10-ai-edge'
                }
              ]
            }
          ],
          '/vi-vn/vibe-stories/': [
            {
              text: 'Vibe Stories',
              collapsed: false,
              items: [
                {
                  text: 'Bỏ lương 5 chữ số/tháng, anh ấy giúp học sinh nông thôn dùng AI đuổi ruồi',
                  link: '/vi-vn/vibe-stories/story-1'
                },
                {
                  text: 'Tuần thi cuối kỳ, mình lén build "Chợ trời sinh viên" bằng AI',
                  link: '/vi-vn/vibe-stories/story-2'
                },
                {
                  text: 'Mỗi học sinh đều có một "bạn cùng bàn học bá" không biết mệt',
                  link: '/vi-vn/vibe-stories/story-3'
                },
                {
                  text: 'Tài xế xe tải 48 tuổi thức nhiều đêm, dùng AI build một tool site ra biển',
                  link: '/vi-vn/vibe-stories/story-4'
                }
              ]
            }
          ],
          '/vi-vn/generative-ai/': [
            {
              text: 'Generative AI',
              collapsed: false,
              items: [{ text: 'Tổng quan', link: '/vi-vn/generative-ai/' }]
            },
            {
              text: 'A · Hiểu nền tảng',
              collapsed: false,
              items: [
                { text: '1. Generative AI là gì', link: '/vi-vn/generative-ai/1-generative-ai-la-gi' }
              ]
            },
            {
              text: 'B · Tạo (prompt craft)',
              collapsed: false,
              items: [
                { text: '2. Tạo ảnh — prompt & tools', link: '/vi-vn/generative-ai/2-tao-anh' },
                { text: '3. Tạo video — prompt & tools', link: '/vi-vn/generative-ai/3-tao-video' },
                { text: '4. Tạo nhạc & giọng nói', link: '/vi-vn/generative-ai/4-tao-nhac-giong' }
              ]
            },
            {
              text: 'C · Làm chủ Consistency',
              collapsed: false,
              items: [
                { text: '5. Consistency nhân vật & style', link: '/vi-vn/generative-ai/5-consistency-nhan-vat' },
                { text: '6. Consistency series & Post-production', link: '/vi-vn/generative-ai/6-consistency-post' }
              ]
            },
            {
              text: 'D · Tự động hóa',
              collapsed: false,
              items: [
                { text: '7. Pipeline tự động & faceless factory', link: '/vi-vn/generative-ai/7-pipeline-tu-dong' }
              ]
            },
            {
              text: 'E · Ứng dụng & Pháp lý',
              collapsed: false,
              items: [
                { text: '8. Ứng dụng VN, ngách & monetization', link: '/vi-vn/generative-ai/8-ung-dung-vn' },
                { text: '9. Pháp lý, đạo đức & commercial-safe', link: '/vi-vn/generative-ai/9-phap-ly-dao-duc' },
                { text: '10. Roadmap 30 ngày & Capstone', link: '/vi-vn/generative-ai/10-roadmap-capstone' }
              ]
            }
          ],
          '/vi-vn/agentic-ai/': [
            {
              text: 'Agentic AI',
              collapsed: false,
              items: [{ text: 'Tổng quan', link: '/vi-vn/agentic-ai/' }]
            },
            {
              text: 'A · Hiểu nền tảng',
              collapsed: false,
              items: [
                { text: '1. Agent là gì: Workflow vs Agent', link: '/vi-vn/agentic-ai/1-agent-la-gi' },
                { text: '2. Agent Loop & Pattern chuẩn', link: '/vi-vn/agentic-ai/2-agent-loop-patterns' }
              ]
            },
            {
              text: 'B · Làm chủ & Setup',
              collapsed: false,
              items: [
                { text: '3. Build agent đầu tiên từ số 0', link: '/vi-vn/agentic-ai/3-build-first-agent' },
                { text: '4. Tool Design (Agent–Computer Interface)', link: '/vi-vn/agentic-ai/4-tool-design' },
                { text: '5. Context Engineering', link: '/vi-vn/agentic-ai/5-context-engineering' },
                { text: '6. Memory & Agentic RAG', link: '/vi-vn/agentic-ai/6-memory-agentic-rag' }
              ]
            },
            {
              text: 'C · Nâng cao',
              collapsed: false,
              items: [
                { text: '7. Multi-Agent Systems', link: '/vi-vn/agentic-ai/7-multi-agent' },
                { text: '8. MCP, Skills & Code Execution', link: '/vi-vn/agentic-ai/8-mcp-skills' },
                { text: '9. Frameworks & Tooling', link: '/vi-vn/agentic-ai/9-frameworks-tooling' }
              ]
            },
            {
              text: 'D · Ứng dụng & Production',
              collapsed: false,
              items: [
                { text: '10. Evaluation & Observability', link: '/vi-vn/agentic-ai/10-evaluation-observability' },
                { text: '11. Safety, Guardrails & Reliability', link: '/vi-vn/agentic-ai/11-safety-guardrails' },
                { text: '12. Ứng dụng VN & Roadmap ship', link: '/vi-vn/agentic-ai/12-apply-vn-roadmap' }
              ]
            }
          ],
          '/vi-vn/stage-1/': getStage1Sidebar('vi-vn'),
          '/vi-vn/stage-2/': localizeSidebarLinks(stage2SidebarEn, 'vi-vn'),
          '/vi-vn/stage-3/': localizeSidebarLinks(stage3SidebarEn, 'vi-vn'),
          '/vi-vn/appendix/': localizeSidebarLinks(appendixSidebarEn, 'vi-vn')
        }
      }
    }
  }
})
