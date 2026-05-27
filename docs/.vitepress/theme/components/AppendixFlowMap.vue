<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const categories = [
  {
    id: 'computer-fundamentals',
    name: 'Nền tảng máy tính',
    icon: '💻',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b98115, #10b98108)',
    description: 'Hiểu nguyên lý hoạt động sâu nhất của máy tính',
    whyLearn: 'Đây là nền móng của mọi ngành kỹ sư phần mềm. Hiểu cách máy tính chạy code, quản lý bộ nhớ, xử lý request sẽ giúp bạn viết code hiệu quả hơn.',
    learningGoals: ['Nguyên lý CPU & RAM', 'Lõi hệ điều hành', 'Nền tảng mạng', 'Cấu trúc dữ liệu & giải thuật'],
    articles: [
      { title: 'Vibe Coding full-stack', path: '/vi-vn/appendix/1-computer-fundamentals/vibe-coding-fullstack', description: 'Bức tranh full-stack thời AI', detail: 'Từ frontend đến backend, từ database đến deploy — bản đồ kỹ năng đầy đủ mà full-stack engineer thời AI cần nắm để có tầm nhìn toàn cảnh.' },
      { title: 'Từ transistor tới CPU', path: '/vi-vn/appendix/1-computer-fundamentals/transistor-to-cpu', description: 'Logic phần cứng cấp thấp nhất', detail: 'Bắt đầu từ những công tắc transistor cơ bản, xây dần lên cổng logic, bộ cộng, thanh ghi, rồi hiểu cách CPU thực thi từng dòng code bạn viết.' },
      { title: 'Hệ điều hành', path: '/vi-vn/appendix/1-computer-fundamentals/operating-systems', description: 'Quản lý tiến trình, bộ nhớ, file system', detail: 'OS là cầu nối giữa phần cứng và phần mềm. Hiểu lập lịch tiến trình, bộ nhớ ảo, file system để nắm môi trường chạy của chương trình.' },
      { title: 'Cấu trúc dữ liệu', path: '/vi-vn/appendix/1-computer-fundamentals/data-structures', description: 'Mảng, linked list, cây, đồ thị', detail: 'Cấu trúc dữ liệu quyết định cách chương trình lưu và truy xuất dữ liệu hiệu quả. Nắm mảng, linked list, stack, queue, tree, graph và bối cảnh áp dụng.' },
      { title: 'Tư duy giải thuật nhập môn', path: '/vi-vn/appendix/1-computer-fundamentals/algorithm-thinking', description: 'Sắp xếp, tìm kiếm, đệ quy', detail: 'Giải thuật là cách tư duy giải quyết vấn đề. Qua các bài kinh điển như sort, search, recursion, DP, rèn năng lực phân tích và bóc tách vấn đề phức tạp.' },
      { title: 'Bản đồ ngôn ngữ lập trình', path: '/vi-vn/appendix/1-computer-fundamentals/programming-languages', description: 'Từ assembly tới ngôn ngữ cấp cao', detail: 'Từ mã máy tới assembly, từ C tới Python, hiểu lịch sử tiến hoá, phân loại và triết lý thiết kế của từng ngôn ngữ và miền áp dụng.' },
      { title: 'Nền tảng mạng', path: '/vi-vn/appendix/1-computer-fundamentals/computer-networks', description: 'Nguyên lý truyền tin từ dây mạng đến Internet', detail: 'Từ tầng vật lý đến tầng ứng dụng, nắm TCP/IP, DNS, HTTP để hiểu hai máy tính cách nhau vạn dặm trò chuyện thế nào.' }
    ]
  },
  {
    id: 'development-tools',
    name: 'Công cụ phát triển',
    icon: '🔧',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #3b82f615, #3b82f608)',
    description: 'Thành thạo CLI, Git, IDE và các công cụ',
    whyLearn: 'Công cụ là vũ khí của dev. Dùng công cụ thành thạo giúp tiết kiệm thời gian, giảm việc lặp lại.',
    learningGoals: ['Dùng IDE hiệu quả', 'Quản lý version với Git', 'Thao tác command-line', 'Debug & xử lỗi'],
    articles: [
      { title: 'Nền tảng IDE', path: '/vi-vn/appendix/2-development-tools/ide-basics', description: 'Mẹo dùng VS Code, Cursor, Trae', detail: 'So sánh tính năng cốt lõi của các IDE chủ lực, nắm phím tắt, hệ sinh thái plugin, snippet để biến editor thành vũ khí thuận tay nhất.' },
      { title: 'Command-line và Shell', path: '/vi-vn/appendix/2-development-tools/command-line-shell', description: 'Thao tác terminal & tự động hoá script', detail: 'Từ lệnh cơ bản tới shell script, học cách dùng CLI để thao tác file, quản lý process, tự động hoá việc lặp lại — tạm biệt phụ thuộc chuột.' },
      { title: 'Quản lý version với Git', path: '/vi-vn/appendix/2-development-tools/git-version-control', description: 'Version control & teamwork', detail: 'Từ init tới rebase, nắm hệ thống branch model, chiến lược merge, giải quyết conflict, hiểu Git workflow trong làm việc nhóm.' },
      { title: 'Biến môi trường & PATH', path: '/vi-vn/appendix/2-development-tools/environment-path', description: 'Cấu hình môi trường & troubleshoot', detail: 'Hiểu cơ chế lookup của PATH, scope của biến môi trường, xử lỗi "không tìm thấy lệnh" hay "sai phiên bản" trong môi trường dev.' },
      { title: 'Trình quản lý package', path: '/vi-vn/appendix/2-development-tools/package-managers', description: 'npm, pip, cargo và quản lý dependency', detail: 'Hiểu cách package manager giải quyết "dependency hell", nắm cách dùng npm, pip, cargo và ý nghĩa của lock file.' },
      { title: 'Nghệ thuật debug', path: '/vi-vn/appendix/2-development-tools/debugging-art/', description: 'Breakpoint debug & định vị lỗi', detail: 'Từ console.log tới breakpoint debug, nắm phương pháp luận xử lỗi hệ thống, dùng DevTools, log analysis để tìm gốc bug nhanh.' }
    ]
  },
  {
    id: 'browser-frontend',
    name: 'Trình duyệt & Frontend',
    icon: '🌍',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b15, #f59e0b08)',
    description: 'Nắm nguyên lý trình duyệt và kỹ thuật frontend',
    whyLearn: 'Trình duyệt là cửa người dùng tiếp xúc phần mềm. Hiểu cách trình duyệt render giúp bạn xây Web app mượt mà hơn.',
    learningGoals: ['Nguyên lý render trình duyệt', 'JavaScript lõi', 'So sánh framework frontend', 'Engineering frontend'],
    articles: [
      { title: 'JavaScript chuyên sâu', path: '/vi-vn/appendix/3-browser-and-frontend/javascript-deep-dive', description: 'Closure, prototype chain, async lõi', detail: 'Đào sâu cơ chế closure, chuỗi prototype kế thừa, event loop và mô hình async Promise — củng cố nền tảng ngôn ngữ frontend.' },
      { title: 'TypeScript', path: '/vi-vn/appendix/3-browser-and-frontend/typescript', description: 'Type safety & định nghĩa interface', detail: 'Học cách dùng hệ type bắt lỗi ngay compile-time, nắm interface, generic, type inference để code frontend chắc chắn hơn.' },
      { title: 'Trình duyệt là một hệ điều hành', path: '/vi-vn/appendix/3-browser-and-frontend/browser-as-os', description: 'Mô hình process & quản lý tài nguyên', detail: 'Trình duyệt hiện đại có kiến trúc multi-process, sandbox, scheduling cấp hệ điều hành. Hiểu cơ chế này mới viết Web app high-performance được.' },
      { title: 'Pipeline render trình duyệt', path: '/vi-vn/appendix/3-browser-and-frontend/browser-as-os-rendering', description: 'DOM, CSSOM, layout & paint', detail: 'Từ parse HTML tới pixel lên màn hình — bóc tách từng giai đoạn render pipeline, hiểu chi phí reflow & repaint.' },
      { title: 'So sánh framework frontend', path: '/vi-vn/appendix/3-browser-and-frontend/frontend-frameworks', description: 'React, Vue, Svelte, Angular', detail: 'So sánh ngang triết lý thiết kế, cơ chế reactive, hệ sinh thái và bối cảnh áp dụng của các framework, giúp bạn chọn tech stack hợp lý.' },
      { title: 'Engineering frontend', path: '/vi-vn/appendix/3-browser-and-frontend/frontend-engineering', description: 'Build tool & modularization', detail: 'Từ Webpack tới Vite, hiểu module bundling, code splitting, tree shaking — dựng pipeline phát triển frontend hiệu quả.' }
    ]
  },
  {
    id: 'server-backend',
    name: 'Server & Backend',
    icon: '⚙️',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #8b5cf615, #8b5cf608)',
    description: 'Xây service backend đáng tin và API',
    whyLearn: 'Backend là hệ thần kinh của ứng dụng. Biết design API, xử lý data sẽ giúp bạn tự làm full-stack.',
    learningGoals: ['Giao thức HTTP', 'Nguyên tắc design API', 'Xác thực & ủy quyền', 'Cache & message queue'],
    articles: [
      { title: 'So sánh ngôn ngữ backend', path: '/vi-vn/appendix/4-server-and-backend/backend-languages', description: 'Chọn Go, Node.js, Python', detail: 'So sánh ngôn ngữ backend chủ lực theo các tiêu chí performance, ecosystem, tốc độ phát triển — chọn tech stack hợp với project.' },
      { title: 'Giao thức HTTP', path: '/vi-vn/appendix/4-server-and-backend/http-protocol', description: 'Request/response & status code', detail: 'Hiểu sâu HTTP method, status code, header, Cookie và cơ chế cache — nền tảng giao tiếp của mọi ứng dụng Web.' },
      { title: 'Triết lý design API', path: '/vi-vn/appendix/4-server-and-backend/api-design', description: 'Design RESTful & GraphQL', detail: 'So sánh REST, GraphQL, gRPC về triết lý thiết kế và bối cảnh áp dụng, học cách design API rõ, nhất quán, dễ dùng.' },
      { title: 'Bản chất Web framework', path: '/vi-vn/appendix/4-server-and-backend/web-frameworks', description: 'Routing, middleware, template engine', detail: 'Bóc lớp vỏ framework, hiểu cơ chế lõi: route matching, middleware pipeline, request context — không chỉ biết dùng mà còn biết tại sao.' },
      { title: 'Xác thực & ủy quyền', path: '/vi-vn/appendix/4-server-and-backend/auth-authorization', description: 'JWT, OAuth & permission control', detail: 'Từ Session tới JWT, từ password login tới OAuth, nắm hệ thống xác thực người dùng và phân quyền đầy đủ.' },
      { title: 'Chiến lược cache', path: '/vi-vn/appendix/4-server-and-backend/caching', description: 'Cache Redis & CDN', detail: 'Hiểu cache trình duyệt, CDN, Redis ở các tầng khác nhau, dùng chiến lược cache để tăng tốc đáp ứng hệ thống.' },
      { title: 'Message queue', path: '/vi-vn/appendix/4-server-and-backend/message-queues', description: 'Ứng dụng RabbitMQ, Kafka', detail: 'Hiểu MQ giúp decouple service, smoothing traffic và xử lý async, so sánh kiến trúc RabbitMQ với Kafka và bối cảnh dùng.' }
    ]
  },
  {
    id: 'data',
    name: 'Dữ liệu',
    icon: '📊',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #ec489915, #ec489908)',
    description: 'Nắm database và kỹ năng phân tích dữ liệu',
    whyLearn: 'Dữ liệu là tài sản cốt lõi của ứng dụng hiện đại. Biết lưu, truy vấn, phân tích data sẽ giúp bạn ra quyết định dựa trên dữ liệu.',
    learningGoals: ['Truy vấn SQL', 'Nguyên lý database', 'Thiết kế data model', 'Cơ bản phân tích dữ liệu'],
    articles: [
      { title: 'SQL', path: '/vi-vn/appendix/5-data/sql', description: 'Query, aggregation & transaction', detail: 'Từ SELECT tới subquery, từ JOIN tới transaction, học SQL bài bản — năng lực cốt lõi để trò chuyện với database.' },
      { title: 'Nguyên lý database', path: '/vi-vn/appendix/5-data/database-fundamentals', description: 'Index, transaction & isolation level', detail: 'Đào sâu B+ tree index, đặc tính ACID, MVCC — hiểu engine DB đảm bảo tính đúng và hiệu năng thế nào.' },
      { title: 'Toàn cảnh data model', path: '/vi-vn/appendix/5-data/data-models', description: 'Relational vs NoSQL vs NewSQL', detail: 'So sánh data model: relational, document, graph, time-series — chọn phương án lưu trữ hợp với bối cảnh business.' },
      { title: 'Cơ bản phân tích dữ liệu', path: '/vi-vn/appendix/5-data/data-analysis', description: 'Excel, SQL & BI visualization', detail: 'Từ thu thập data đến hệ chỉ số, nắm funnel analysis, retention analysis — biết dùng dữ liệu lái sản phẩm và business.' }
    ]
  },
  {
    id: 'architecture',
    name: 'Thiết kế kiến trúc',
    icon: '🏗️',
    color: '#14b8a6',
    bgGradient: 'linear-gradient(135deg, #14b8a615, #14b8a608)',
    description: 'Học system design và mô hình kiến trúc',
    whyLearn: 'Kiến trúc quyết định tương lai của hệ thống. Biết design hệ thống ở góc nhìn vĩ mô giúp bạn xây ứng dụng lớn có khả năng mở rộng.',
    learningGoals: ['Kiến trúc microservice', 'Hệ phân tán', 'Thiết kế high availability', 'Phương pháp luận system design'],
    articles: [
      { title: 'Từ monolith tới microservice', path: '/vi-vn/appendix/6-architecture-and-system-design/monolith-to-microservices', description: 'Tách service & tiến hoá kiến trúc', detail: 'Hiểu điểm nghẽn của monolith, học khi nào và cách nào tách microservice, cùng các thách thức service discovery, data consistency phát sinh sau khi tách.' },
      { title: 'Hệ phân tán', path: '/vi-vn/appendix/6-architecture-and-system-design/distributed-systems', description: 'Định lý CAP & consistency', detail: 'Đào sâu định lý CAP, distributed transaction, consensus (Paxos/Raft) — hiểu trade-off consistency vs availability trong môi trường phân tán.' },
      { title: 'High availability & DR', path: '/vi-vn/appendix/6-architecture-and-system-design/high-availability', description: 'Load balancing & failover', detail: 'Học chiến lược load balancing, master-slave failover, multi-region, circuit breaker — hệ thống chạy ổn định ngay khi có sự cố.' },
      { title: 'Phương pháp luận system design', path: '/vi-vn/appendix/6-architecture-and-system-design/system-design-methodology', description: 'Từ yêu cầu tới phương án', detail: 'Nắm khung tư duy trong system design phỏng vấn và thực chiến: phân tích yêu cầu, ước lượng capacity, design module lõi, nhận diện bottleneck và đánh đổi kiến trúc.' }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Hạ tầng',
    icon: '☁️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #06b6d415, #06b6d408)',
    description: 'Nắm cloud-native và kỹ năng operations',
    whyLearn: 'Hạ tầng là nền của ứng dụng. Biết containerization, automation deploy giúp bạn vận hành ứng dụng hiệu quả.',
    learningGoals: ['Nền tảng Linux', 'Containerization Docker', 'Kubernetes', 'CI/CD tự động hoá'],
    articles: [
      { title: 'Nền tảng Linux', path: '/vi-vn/appendix/7-infrastructure-and-operations/linux-basics', description: 'File system & quản lý process', detail: 'Nắm permission file Linux, quản lý process, system monitoring — nền tảng bắt buộc cho ops server và deploy container.' },
      { title: 'Containerization Docker', path: '/vi-vn/appendix/7-infrastructure-and-operations/docker-containers', description: 'Image, container & network', detail: 'Từ viết Dockerfile, build image, network của container đến mount data volume — biết dùng Docker đóng gói ứng dụng thành đơn vị chuẩn portable.' },
      { title: 'Kubernetes', path: '/vi-vn/appendix/7-infrastructure-and-operations/kubernetes', description: 'Pod, Deployment & Service', detail: 'Hiểu khái niệm lõi K8s: scheduling Pod, rolling update Deployment, service discovery — công cụ chuẩn ngành để orchestrate container.' },
      { title: 'CI/CD tự động hoá', path: '/vi-vn/appendix/7-infrastructure-and-operations/ci-cd', description: 'GitHub Actions & pipeline', detail: 'Học triết lý CI/CD, dùng GitHub Actions dựng pipeline tự động test-build-deploy ngay khi commit code.' }
    ]
  },
  {
    id: 'ai',
    name: 'Trí tuệ nhân tạo',
    icon: '🤖',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #f9731615, #f9731608)',
    description: 'Hiểu nguyên lý AI và phát triển ứng dụng LLM',
    whyLearn: 'AI đang thay đổi cách phát triển phần mềm. Hiểu LLM giúp bạn dùng AI nâng cao hiệu suất tốt hơn.',
    learningGoals: ['Nền tảng neural network', 'Kiến trúc Transformer', 'Nguyên lý LLM', 'RAG & Agent'],
    articles: [
      { title: 'Lược sử AI', path: '/vi-vn/appendix/8-artificial-intelligence/ai-history', description: 'Từ expert system tới deep learning', detail: 'Điểm lại các cột mốc AI từ Turing test tới GPT, hiểu sự dịch chuyển tư tưởng cốt lõi và động lực của mỗi đột phá.' },
      { title: 'Neural network', path: '/vi-vn/appendix/8-artificial-intelligence/neural-networks', description: 'Perceptron & backpropagation', detail: 'Từ neuron đơn lẻ tới network nhiều tầng, hiểu forward propagation, loss function, backpropagation và gradient descent — nền tảng của mọi deep learning.' },
      { title: 'Transformer', path: '/vi-vn/appendix/8-artificial-intelligence/transformer-attention', description: 'Attention & self-attention', detail: 'Đào sâu lõi kiến trúc Transformer — self-attention, hiểu cách nó cho model bắt long-range dependency, trở thành nền tảng các large model hiện đại.' },
      { title: 'Nguyên lý LLM', path: '/vi-vn/appendix/8-artificial-intelligence/llm-principles', description: 'Pretrain & instruction tuning', detail: 'Từ pretraining trên text khổng lồ tới alignment qua RLHF, bóc tách pipeline train và cơ chế làm việc của GPT, Claude và các LLM khác.' },
      { title: 'Kiến trúc RAG', path: '/vi-vn/appendix/8-artificial-intelligence/rag', description: 'Retrieval-Augmented Generation thực chiến', detail: 'Học cách dùng vector retrieval bơm kiến thức ngoài vào LLM, nắm pipeline RAG đầy đủ: chunk, embedding, retrieve và generate.' },
      { title: 'AI Agent', path: '/vi-vn/appendix/8-artificial-intelligence/ai-agents', description: 'Kiến trúc Agent & tool calling', detail: 'Hiểu cách AI Agent ra quyết định tự chủ qua planning, memory, tool calling — nắm các mô hình lõi ReAct, Function Calling.' }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering excellence',
    icon: '✨',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #a855f715, #a855f708)',
    description: 'Nâng chất lượng code và năng lực engineering',
    whyLearn: 'Code là viết cho con người đọc. Nắm design pattern, chiến lược test giúp bạn viết code đẹp và dễ bảo trì hơn.',
    learningGoals: ['Design pattern', 'Refactor code', 'Chiến lược test', 'Technical writing'],
    articles: [
      { title: 'Design pattern', path: '/vi-vn/appendix/9-engineering-excellence/design-patterns', description: 'SOLID & 23 mẫu', detail: 'Từ 5 nguyên tắc SOLID tới Factory, Observer, Strategy và các mẫu kinh điển khác — dùng design pattern giải vấn đề cấu trúc lặp lại trong code.' },
      { title: 'Code quality & refactor', path: '/vi-vn/appendix/9-engineering-excellence/code-quality-refactoring', description: 'Code smell & refactor', detail: 'Nhận diện code lặp, function dài, coupling cao và các code smell khác, nắm extract method, inline variable, move field — kỹ thuật refactor có hệ thống.' },
      { title: 'Chiến lược test', path: '/vi-vn/appendix/9-engineering-excellence/testing-strategies', description: 'Unit, integration, E2E', detail: 'Hiểu phân tầng testing pyramid, biết viết unit test, integration test và E2E — dùng automated test bảo vệ chất lượng code.' },
      { title: 'Technical writing', path: '/vi-vn/appendix/9-engineering-excellence/technical-writing', description: 'Quy chuẩn viết doc & API', detail: 'Học cách viết README, API doc, design doc rõ ràng — kỹ năng mềm cốt lõi của senior engineer.' },
      { title: 'Cộng tác open source', path: '/vi-vn/appendix/9-engineering-excellence/open-source-collaboration', description: 'Issue, PR & cộng đồng', detail: 'Nắm quy trình open source trên GitHub: Issue, Fork, PR, Code Review — biết tham gia và maintain project mã nguồn mở.' }
    ]
  }
]

const activeCategory = ref(categories[0].id)
const hoveredArticle = ref(null)

const toggleCategory = (id) => {
  activeCategory.value = id
  hoveredArticle.value = null
}

const articleCount = categories.reduce((sum, cat) => sum + cat.articles.length, 0)

const activeCategoryData = computed(() => {
  if (!activeCategory.value) return null
  return categories.find(cat => cat.id === activeCategory.value)
})

const hoveredArticleData = computed(() => {
  if (!hoveredArticle.value || !activeCategoryData.value) return null
  return activeCategoryData.value.articles.find(a => a.path === hoveredArticle.value)
})
</script>

<template>
  <div class="appendix-bento">
    <div class="bento-header">
      <h3 class="bento-title">Khám phá phụ lục</h3>
      <p class="bento-subtitle">9 chủ đề · {{ articleCount }} bài viết</p>
    </div>

    <div class="bento-main">
      <!-- 左侧：卡片网格 -->
      <div class="bento-left">
        <div class="bento-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bento-card"
            :class="{ active: activeCategory === category.id }"
            :style="{
              '--card-color': category.color,
              '--card-bg': category.bgGradient
            }"
            @click="toggleCategory(category.id)"
          >
            <div class="card-icon">{{ category.icon }}</div>
            <div class="card-content">
              <h4 class="card-title">{{ category.name }}</h4>
            </div>
            <div class="card-indicator">
              <span>{{ category.articles.length }} bài {{ activeCategory === category.id ? '↓' : '→' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：详情面板 -->
      <div
        class="detail-panel"
        :style="{ '--panel-color': activeCategoryData.color }"
        :key="activeCategoryData.id"
      >
        <div class="panel-header">
          <div class="panel-title-row">
            <span class="panel-icon">{{ hoveredArticleData ? '📄' : activeCategoryData.icon }}</span>
            <div class="panel-title-group">
              <h4 class="panel-title">{{ hoveredArticleData?.title || activeCategoryData.name }}</h4>
              <p class="panel-desc">{{ hoveredArticleData?.description || activeCategoryData.description }}</p>
            </div>
          </div>
          <div class="panel-body">
            <p class="intro-text">{{ hoveredArticleData?.detail || activeCategoryData.whyLearn }}</p>
          </div>
          <div v-if="!hoveredArticleData" class="panel-goals">
            <h5 class="goals-title">Bạn sẽ học được gì?</h5>
            <div class="goals-list">
              <span v-for="(goal, index) in activeCategoryData.learningGoals" :key="index" class="goal-tag">
                {{ goal }}
              </span>
            </div>
          </div>
        </div>

        <div class="panel-articles">
          <div class="articles-header">
            <span class="articles-icon">{{ activeCategoryData.icon }}</span>
            <span class="articles-title">Danh sách bài ({{ activeCategoryData.articles.length }} bài)</span>
          </div>
          <div class="articles-list-scroll">
            <a
              v-for="article in activeCategoryData.articles"
              :key="article.path"
              :href="withBase(article.path)"
              class="article-item"
              :class="{ hover: hoveredArticle === article.path }"
              @mouseenter="hoveredArticle = article.path"
              @mouseleave="hoveredArticle = null"
            >
              <span class="article-bullet"></span>
              <div class="article-info">
                <span class="article-name">{{ article.title }}</span>
                <span class="article-desc">{{ article.description }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appendix-bento {
  padding: 1rem 0;
}

.bento-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.bento-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
}

.bento-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.bento-main {
  display: grid;
  grid-template-columns: 1fr 280px;
  height: 520px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.bento-left {
  overflow-y: auto;
  padding: 0.75rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.bento-card {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-bg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bento-card:hover::before {
  opacity: 1;
}

.bento-card:hover {
  border-color: var(--card-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.bento-card.active {
  border-color: var(--card-color);
}

.bento-card.active::before {
  opacity: 1;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  position: relative;
}

.card-content {
  position: relative;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.card-indicator {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  position: relative;
}

.bento-card:hover .card-indicator {
  color: var(--card-color);
}

/* 右侧面板 */
.detail-panel {
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  height: 200px;
  overflow-y: auto;
  flex-shrink: 0;
}

.panel-title-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.panel-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.panel-title-group {
  flex: 1;
  min-width: 0;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.panel-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.4;
}

.panel-body {
  margin-bottom: 0.75rem;
}

.intro-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

/* 学习目标 */
.panel-goals {
  margin-top: 0.75rem;
}

.goals-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--panel-color);
  margin: 0 0 0.5rem;
}

.goals-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.goal-tag {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
}

/* 文章列表区 */
.panel-articles {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.articles-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.articles-icon {
  font-size: 1.1rem;
}

.articles-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--panel-color);
}

.articles-list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

.article-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.15s ease;
  margin-bottom: 0.25rem;
}

.article-item:hover,
.article-item.hover {
  background: var(--vp-c-bg-soft);
}

.article-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--panel-color);
  flex-shrink: 0;
  margin-top: 0.4rem;
}

.article-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.article-name {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.article-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

/* 响应式 */
@media (max-width: 768px) {
  .bento-main {
    grid-template-columns: 1fr;
    height: auto;
    max-height: 80vh;
  }

  .bento-left {
    max-height: 300px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .detail-panel {
    border-left: none;
    max-height: 400px;
  }
}

@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}
</style>