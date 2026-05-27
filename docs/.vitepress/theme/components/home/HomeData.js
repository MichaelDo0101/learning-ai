import placeholderCover from '../../../../../assets/banner.png'

export const locales = [
  { code: 'vi-vn', text: 'Tiếng Việt' },
  { code: 'en', text: 'English' }
]

export const stage1Cards = [
  {
    title: 'PM Sản phẩm AI',
    desc: 'Từ ý tưởng tới prototype độ trung thực cao — bạn chỉ cần biết nói.',
    sub: 'Phù hợp người không học kỹ thuật',
    color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    icon: '🎨',
    link: '/vi-vn/stage-1/learning-map/'
  },
  {
    title: 'Khởi đầu qua trò chơi',
    desc: 'Tạo Snake, Tetris — phá nỗi sợ code bằng cách vừa chơi vừa học.',
    sub: 'Học bằng chơi',
    color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    icon: '🎮',
    link: '/vi-vn/stage-1/ai-capabilities-through-games/'
  },
  {
    title: 'Vibe Coding',
    desc: 'Tinh túy lập trình thời AI: prompt engineering và quản lý ngữ cảnh.',
    sub: 'Cốt lõi',
    color: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    icon: '💡',
    link: '/vi-vn/stage-1/introduction-to-ai-ide/'
  }
]

export const stage2Cards = [
  {
    imageColor: '#E0C3FC',
    image: placeholderCover,
    imageAlt: 'Lovart asset generation agent',
    link: '/vi-vn/stage-2/'
  },
  {
    imageColor: '#D8C4F8',
    image: placeholderCover,
    imageAlt: 'Figma & MasterGo design tools',
    link: '/vi-vn/stage-2/'
  },
  {
    imageColor: '#C7DDFB',
    image: placeholderCover,
    imageAlt: 'Design-to-code',
    link: '/vi-vn/stage-2/'
  },
  {
    imageColor: '#8EC5FC',
    image: placeholderCover,
    imageAlt: 'Supabase database console',
    link: '/vi-vn/stage-2/'
  },
  {
    imageColor: '#96E6A1',
    image: placeholderCover,
    imageAlt: 'Zeabur deployment',
    link: '/vi-vn/stage-2/'
  },
  {
    imageColor: '#A7F3D0',
    image: placeholderCover,
    imageAlt: 'Dify knowledge base',
    link: '/vi-vn/stage-2/'
  }
]

export const stage3Cards = [
  {
    title: 'Ứng dụng desktop đa nền tảng',
    desc: 'Dùng Electron build app voice-to-text, chạy được trên Windows, macOS, Linux từ một codebase.',
    tag: 'Stage 3',
    visualType: 'phone',
    image: placeholderCover,
    imageAlt: 'Electron voice-to-text desktop app',
    link: '/vi-vn/stage-3/'
  },
  {
    title: 'Đội AI Agent',
    desc: 'Lập đội Claude Agent đa-tác-tử hoàn thành dự án lớn.',
    tag: 'Advanced',
    visualType: 'ai',
    image: placeholderCover,
    imageAlt: 'Claude Agent Teams',
    link: '/vi-vn/stage-3/'
  },
  {
    title: 'Chạy task dài hạn ổn định',
    desc: 'Dùng loop script + Ralph plugin để Claude Code chạy đêm liên tục mà vẫn ổn định.',
    tag: 'Architecture',
    visualType: 'arch',
    image: placeholderCover,
    imageAlt: 'Long-running Claude Code tasks',
    link: '/vi-vn/stage-3/'
  },
  {
    title: 'Thương hiệu cá nhân',
    desc: 'Xây website cá nhân và blog kỹ thuật để dự án và kinh nghiệm của bạn được lan toả.',
    tag: 'Brand',
    visualType: 'brand',
    image: placeholderCover,
    imageAlt: 'Personal website & blog',
    imageClass: 'prod-image--personal-brand',
    link: '/vi-vn/stage-3/'
  }
]

export const appendixCards = [
  {
    title: 'Trí tuệ nhân tạo',
    desc: 'LLM, Agent, RAG — đào sâu nguyên lý AI.',
    tag: 'AI',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Prompt Engineering',
    desc: 'Kỹ thuật giao tiếp hiệu quả với AI, khai mở tiềm năng.',
    tag: 'AI',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Large Language Models',
    desc: 'Hiểu LLM hoạt động và ứng dụng thực tế.',
    tag: 'AI',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'AI Agent',
    desc: 'Khám phá kiến trúc AI có khả năng tự ra quyết định và thực thi.',
    tag: 'AI',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Nền tảng Frontend',
    desc: 'HTML/CSS/JS — ba trụ cột, bài học bắt buộc cho người mới.',
    tag: 'Frontend',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Lịch sử Frontend',
    desc: 'Hiểu sự tiến hoá của stack frontend, nắm xu hướng.',
    tag: 'Frontend',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Kiến trúc Backend',
    desc: 'Từ monolith đến microservice — hành trình kiến trúc.',
    tag: 'Backend',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Ngôn ngữ Backend',
    desc: 'So sánh đặc điểm các ngôn ngữ backend chủ lực, chọn stack tốt nhất.',
    tag: 'Backend',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Cơ sở dữ liệu',
    desc: 'Nguyên lý cốt lõi của database, làm chủ nghệ thuật lưu trữ.',
    tag: 'Database',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Thiết kế API',
    desc: 'Kiến thức nền tảng về thiết kế và phát triển API.',
    tag: 'API',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Git Version Control',
    desc: 'Hiểu sâu nguyên lý Git và các thao tác nâng cao.',
    tag: 'General',
    link: '/vi-vn/appendix/'
  },
  {
    title: 'Mạng máy tính',
    desc: 'Kiến thức nền tảng về giao thức mạng và truyền thông.',
    tag: 'General',
    link: '/vi-vn/appendix/'
  }
]
