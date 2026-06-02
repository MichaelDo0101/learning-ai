export const i18n = {
  en: {
    nav: {
      title: 'Learning AI Tutorial',
      home: 'Home',
      stories: 'Vibe Stories',
      pm: 'Product Manager',
      junior: 'Junior Dev',
      senior: 'Senior Dev',
      appendix: 'Appendix',
      start: 'Start Learning'
    },
    stories: {
      cat: 'Vibe Stories',
      title: 'Meet every <br><span class="highlight">shining builder.</span>',
      sub: 'See how people from different backgrounds use AI to solve real problems.',
      s1: {
        title:
          'He gave up a high salary to help rural kids "fight flies" with AI',
        author: 'Xiaohao, primary school teacher'
      },
      s2: {
        title:
          'During finals week, I secretly built a campus marketplace with AI',
        author: 'A sophomore student'
      },
      s3: {
        title: 'I built every student a tireless AI study buddy',
        author: 'A high school IT teacher'
      },
      s4: {
        title:
          'A 48-year-old truck driver stayed up for nights to build an overseas AI tool site',
        author: 'Lao Huang, truck driver'
      },
      authorPrefix: 'By',
      ui: {
        prevLabel: 'Previous story',
        nextLabel: 'Next story',
        selectLabel: 'View this story',
        imageAlt: 'Vibe story cover'
      }
    },
    stage1: {
      cat: 'Stage 1 · Getting Started',
      title: 'Zero to Hero, <br><span class="highlight">Be Your Own PM.</span>',
      sub: 'No CS background needed. Just speak your ideas—AI will turn them into high-fidelity web prototypes.',
      cards: [
        {
          title: 'Learning Map',
          desc: 'Understand the complete learning path from zero to full-stack development.',
          sub: 'All Ages Friendly',
          link: '/en/stage-1/learning-map/'
        },
        {
          title: 'Gamified Intro',
          desc: 'Experience the magic of AI programming by building games like Snake.',
          sub: 'Learn by Playing',
          link: '/en/stage-1/ai-capabilities-through-games/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Master the core of AI coding: From product ideas to interactive prototypes.',
          sub: 'Core Mindset',
          link: '/en/stage-1/learning-map/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Junior/Mid Dev',
      title:
        'Go Full Stack, <br><span class="highlight">Build Real Apps.</span>',
      sub: 'Understand the full journey from frontend to backend, database and deployment.',
      cards: [
        {
          title: 'Asset Agent',
          headline: 'Speed up content production.',
          desc: 'Build your own design-asset workflow and drawing agent with Lovart and Nanobanana.',
          link: '/en/stage-2/frontend/lovart-assets/'
        },
        {
          title: 'Figma & MasterGo',
          headline: 'Get fluent with design tools.',
          desc: 'Learn the basics of modern UI design tools and how design files flow into development.',
          link: '/en/stage-2/frontend/figma-mastergo/'
        },
        {
          title: 'Design to Code',
          headline: 'Turn mockups into pages.',
          desc: 'Convert prototypes into real frontend code that runs in the browser instead of staying as static designs.',
          link: '/en/stage-2/frontend/design-to-code/'
        },
        {
          title: 'Real Data Project',
          headline: 'Backed by a real DB.',
          desc: 'Design tables and permissions on Supabase and wire them into real read/write flows.',
          link: '/en/stage-2/backend/database-supabase/'
        },
        {
          title: 'Deployment',
          headline: 'Ship it to the world.',
          desc: 'Use CloudBase, Vercel and Zeabur to turn local projects into publicly reachable sites.',
          link: '/en/stage-2/backend/zeabur-deployment/'
        },
        {
          title: 'AI Knowledge Base',
          headline: 'Plug AI into the app.',
          desc: 'Use Dify to build AI workflows and knowledge-base powered product experiences.',
          link: '/en/stage-2/ai-capabilities/dify-knowledge-base/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Senior Dev',
      title:
        'Advanced Practice, <br><span class="highlight">Infinite Possibilities.</span>',
      sub: 'Cross-platform apps and AI-native workflows, powered by Claude Code.',
      cards: [
        {
          title: 'Electron Desktop App',
          desc: 'Build a speech-to-text desktop app that runs on Windows, macOS and Linux from one codebase.',
          link: '/en/stage-3/cross-platform/electron-voice-to-text/'
        },
        {
          title: 'Agent Teams',
          desc: 'Use Claude Agent Teams to orchestrate multiple agents like a real dev team.',
          link: '/en/stage-3/core-skills/agent-teams/'
        },
        {
          title: 'Long-running Tasks',
          desc: 'Design loops and task queues so Claude Code can safely run overnight until work is truly done.',
          link: '/en/stage-3/core-skills/long-running-tasks/'
        },
        {
          title: 'Personal Brand',
          desc: 'Build your own website and tech blog to showcase projects and writing.',
          link: '/en/stage-3/personal-brand/personal-website-blog/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI History',
          desc: 'Milestones in AI evolution.',
          link: '/en/appendix/8-artificial-intelligence/ai-history'
        },
        {
          title: 'Prompt Eng',
          desc: 'Master AI communication skills.',
          link: '/en/appendix/8-artificial-intelligence/prompt-engineering'
        },
        {
          title: 'LLM Intro',
          desc: 'Understanding Large Language Models.',
          link: '/en/appendix/8-artificial-intelligence/llm-principles'
        },
        {
          title: 'AI Agents',
          desc: 'Autonomous decision-making AI.',
          link: '/en/appendix/8-artificial-intelligence/ai-agents'
        },
        {
          title: 'Web Basics',
          desc: 'HTML/CSS/JS fundamentals.',
          link: '/en/appendix/3-browser-and-frontend/javascript-deep-dive'
        },
        {
          title: 'Frontend Evo',
          desc: 'Evolution of frontend tech stack.',
          link: '/en/appendix/3-browser-and-frontend/frontend-frameworks'
        },
        {
          title: 'Backend Arch',
          desc: 'From monolith to microservices.',
          link: '/en/appendix/4-server-and-backend/backend-layered-architecture'
        },
        {
          title: 'Backend Lang',
          desc: 'Choosing the right tech stack.',
          link: '/en/appendix/4-server-and-backend/backend-languages'
        },
        {
          title: 'Database',
          desc: 'Core principles of data storage.',
          link: '/en/appendix/5-data/database-fundamentals'
        },
        {
          title: 'API Design',
          desc: 'Designing robust interfaces.',
          link: '/en/appendix/4-server-and-backend/api-intro'
        },
        {
          title: 'Git',
          desc: 'Version control mastery.',
          link: '/en/appendix/2-development-tools/git-version-control'
        },
        {
          title: 'Networks',
          desc: 'Protocols and communication.',
          link: '/en/appendix/1-computer-fundamentals/computer-networks'
        }
      ]
    },
    footer: {
      title: 'Ready to start?',
      desc: 'Learning AI — make coding as natural as breathing.',
      btn: 'Start Now'
    }
  },
  'vi-vn': {
    nav: {
      title: 'Hướng dẫn Learning AI',
      home: 'Trang chủ',
      stories: 'Câu chuyện người dùng',
      pm: 'Quản lý sản phẩm',
      junior: 'Dev Sơ/Trung cấp',
      senior: 'Dev Cao cấp',
      appendix: 'Phụ lục',
      start: 'Bắt đầu học'
    },
    stories: {
      cat: 'Câu chuyện người dùng',
      title:
        'Gặp gỡ từng <br><span class="highlight">câu chuyện tỏa sáng.</span>',
      sub: 'Khám phá cách những người từ nhiều xuất phát điểm khác nhau dùng AI để giải quyết vấn đề thật.',
      s1: {
        title:
          'Anh bỏ mức lương cao để giúp trẻ em vùng quê "đuổi ruồi" bằng AI',
        author: 'Xiaohao, giáo viên tiểu học'
      },
      s2: {
        title:
          'Trong tuần thi cuối kỳ, tôi lặng lẽ làm một chợ đồ cũ trong trường bằng AI',
        author: 'Một sinh viên năm hai'
      },
      s3: {
        title: 'Tôi tạo cho mỗi học sinh một bạn học giỏi AI không biết mệt',
        author: 'Một giáo viên CNTT trung học'
      },
      s4: {
        title:
          'Một tài xế xe tải 48 tuổi thức trắng nhiều đêm để làm một website công cụ AI cho thị trường quốc tế',
        author: 'Lao Huang, tài xế xe tải'
      },
      authorPrefix: 'Người kể:',
      ui: {
        prevLabel: 'Câu chuyện trước',
        nextLabel: 'Câu chuyện tiếp theo',
        selectLabel: 'Xem câu chuyện này',
        imageAlt: 'Ảnh bìa câu chuyện'
      }
    },
    stage1: {
      cat: 'Stage 1 · Người mới & PM',
      title:
        'Từ số 0 đến Hero,<br><span class="highlight">Tự làm PM cho chính mình.</span>',
      sub: 'Không cần nền tảng CS. Chỉ cần nói ra ý tưởng, AI sẽ biến nó thành nguyên mẫu web độ trung thực cao.',
      cards: [
        {
          title: 'AI PM',
          desc: 'Từ ý tưởng đến nguyên mẫu, chỉ bằng lời nói.',
          sub: 'Thân thiện với non-tech',
          link: '/vi-vn/stage-1/learning-map/'
        },
        {
          title: 'Nhập môn qua Game',
          desc: 'Xây dựng Snake, Tetris và phá bỏ nỗi sợ code.',
          sub: 'Học mà chơi',
          link: '/vi-vn/stage-1/learning-map/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Nắm vững cốt lõi lập trình AI: Prompt Engineering & Context.',
          sub: 'Tư duy cốt lõi',
          link: '/vi-vn/stage-1/learning-map/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Dev Sơ/Trung cấp',
      title:
        'Full Stack,<br><span class="highlight">Xây dựng App thực tế.</span>',
      sub: 'Nắm vững tách biệt frontend-backend. Xây dựng dự án thương mại với DB, API và tương tác phức tạp.',
      cards: [
        {
          title: 'Full Stack',
          headline: 'Frontend & Backend.',
          desc: 'Từ thiết kế DB đến API và component, xây dựng trọn vẹn web app hiện đại.',
          link: '/vi-vn/stage-2/'
        },
        {
          title: 'Dự án thực tế',
          headline: 'Không phải code đồ chơi.',
          desc: 'Đi sâu vào Auth, Lưu trữ, Upload file và logic nghiệp vụ cốt lõi.',
          link: '/vi-vn/stage-2/'
        },
        {
          title: 'Triển khai',
          headline: 'Show cho thế giới.',
          desc: 'Cấu hình server, DNS, CI/CD. Chặng cuối của việc giao sản phẩm.',
          link: '/vi-vn/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Dev Cao cấp',
      title:
        'Thực hành nâng cao,<br><span class="highlight">Khả năng vô hạn.</span>',
      sub: 'Mini-app di động & Ứng dụng AI Native. Khám phá kỷ nguyên LLM.',
      cards: [
        {
          title: 'WeChat Mini-app',
          desc: 'Phát triển đa nền tảng, tiếp cận hàng triệu người dùng.',
          link: '/vi-vn/stage-3/'
        },
        {
          title: 'App AI Native',
          desc: 'RAG, Agent. Khám phá giới hạn của LLM.',
          link: '/vi-vn/stage-3/'
        },
        {
          title: 'Kiến trúc phức tạp',
          desc: 'Thiết kế kiến trúc chịu tải cao và sẵn sàng cao.',
          link: '/vi-vn/stage-3/'
        },
        {
          title: 'Thương hiệu cá nhân',
          desc: 'Xây dựng website và blog học thuật của riêng bạn.',
          link: '/vi-vn/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · Phụ lục',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/vi-vn/appendix/8-artificial-intelligence/ai-history'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/vi-vn/appendix/3-browser-and-frontend/javascript-deep-dive'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/vi-vn/appendix/4-server-and-backend/backend-layered-architecture'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/vi-vn/appendix/2-development-tools/git-version-control'
        }
      ]
    },
    footer: {
      title: 'Sẵn sàng chưa?',
      desc: 'Learning AI — biến lập trình trở nên tự nhiên như hơi thở.',
      btn: 'Bắt đầu ngay'
    }
  }
}
