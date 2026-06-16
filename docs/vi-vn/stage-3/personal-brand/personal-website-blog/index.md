# Build personal website và academic blog — GitHub Pages static

::: tip Cập nhật 2026
- **Next.js 14+** với App Router đã thành chuẩn cho personal site
- **Astro 4+** rất phổ biến cho content-heavy site (faster than Next)
- **VitePress** dành cho doc/blog tech (Vue ecosystem)
- **GitHub Pages free** + custom domain support
- **Cloudflare Pages** alternative, faster CDN, deploy edge
- **AI-generated content** trend — disclose properly
:::

## Tại sao có personal website?

- **Showcase work**: portfolio, project, paper
- **Personal brand**: tăng visibility cho job/freelance
- **Long-form content**: blog post detailed
- **SEO own brand**: control kết quả Google search "tên bạn"
- **Academic credibility**: paper, citation, CV
- **Newsletter platform**: build audience

## Stack lựa chọn 2026

| Stack | Best for | Difficulty |
|---|---|---|
| **Hugo / Jekyll** | Đơn giản, fast | ⭐ |
| **Astro** | Content-heavy, performance | ⭐⭐ |
| **Next.js** | Modern, full-stack potential | ⭐⭐⭐ |
| **VitePress** | Tech doc site | ⭐⭐ |
| **Quartz** | Digital garden / Obsidian sync | ⭐⭐ |
| **Vanilla HTML** | Tối giản nhất | ⭐ |

Tutorial này dùng **Astro** vì balance giữa đơn giản và mạnh mẽ.

# Chương 1: setup project Astro

## 1.1 Init project

```bash
npm create astro@latest my-blog
cd my-blog
# Chọn:
# - Template: Just the basics
# - TypeScript: Yes (strict)
# - Install dependencies: Yes
# - Initialize git: Yes
```

## 1.2 Structure

```
my-blog/
├── public/              # Static assets
├── src/
│   ├── content/         # Markdown content
│   │   ├── blog/        # Blog posts
│   │   └── projects/    # Project showcases
│   ├── components/      # Astro/React components
│   ├── layouts/         # Page layouts
│   └── pages/           # Routes
├── astro.config.mjs
└── package.json
```

## 1.3 Astro config

`astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yourname.dev',
  integrations: [tailwind(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-dark' }
  }
});
```

Cài tailwind:
```bash
npx astro add tailwind sitemap
npm install @tailwindcss/typography
```

# Chương 2: layout + design

## 2.1 BaseLayout

`src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title} | Nguyễn Văn A</title>
  <link rel="icon" href="/favicon.svg" />
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <nav class="border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-3xl mx-auto px-4 py-4 flex justify-between">
      <a href="/" class="font-bold text-xl">Nguyễn Văn A</a>
      <div class="space-x-6">
        <a href="/blog" class="hover:text-indigo-600">Blog</a>
        <a href="/projects" class="hover:text-indigo-600">Projects</a>
        <a href="/about" class="hover:text-indigo-600">About</a>
        <a href="/cv" class="hover:text-indigo-600">CV</a>
      </div>
    </div>
  </nav>
  
  <main class="max-w-3xl mx-auto px-4 py-8">
    <slot />
  </main>
  
  <footer class="border-t border-gray-200 dark:border-gray-800 mt-16">
    <div class="max-w-3xl mx-auto px-4 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
      © 2026 Nguyễn Văn A. Built with Astro + ❤️.
    </div>
  </footer>
</body>
</html>
```

## 2.2 Homepage

`src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const recentPosts = (await getCollection('blog'))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3);
---

<BaseLayout title="Trang chủ" description="Personal website của Nguyễn Văn A">
  <section class="py-12">
    <h1 class="text-4xl font-bold mb-4">Xin chào, tôi là Văn A 👋</h1>
    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
      Tôi là Full-stack Developer và AI Researcher ở Hà Nội, đang research về 
      <a href="/research" class="text-indigo-600 underline">Large Language Models</a> 
      và build product với AI.
    </p>
    <p class="mt-4">
      Hiện đang làm tại 
      <a href="https://taskai.vn" class="text-indigo-600 underline">Task AI</a>, 
      trước đây từng làm tại VinAI Research và FPT Software.
    </p>
  </section>
  
  <section class="py-12 border-t border-gray-200 dark:border-gray-800">
    <h2 class="text-2xl font-bold mb-6">Bài viết gần đây</h2>
    <ul class="space-y-4">
      {recentPosts.map(post => (
        <li>
          <a href={`/blog/${post.slug}`} class="block hover:bg-gray-50 dark:hover:bg-gray-800 p-4 -mx-4 rounded">
            <h3 class="font-semibold">{post.data.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {post.data.date.toLocaleDateString('vi-VN')} · {post.data.description}
            </p>
          </a>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

# Chương 3: blog system

## 3.1 Content collection

`src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('Văn A'),
    image: z.string().optional()
  })
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tech: z.array(z.string()),
    url: z.string().optional(),
    github: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection
};
```

## 3.2 Blog post sample

`src/content/blog/2026-05-claude-code-review.md`:

```markdown
---
title: "Review Claude Sonnet 5 sau 1 tháng dùng"
description: "Đánh giá hands-on Claude Sonnet 5 cho dev"
date: 2026-05-15
tags: ["AI", "Claude", "Review"]
---

Sau 1 tháng dùng Claude Sonnet 5 hàng ngày, đây là đánh giá của tôi.

## TL;DR

- 🎯 Coding: tốt hơn GPT-4o ~20%
- 💰 Cost: rẻ hơn Opus 5x
- ⚡ Speed: nhanh gấp đôi
- ❌ Weakness: vision còn yếu

## Chi tiết

[Content...]
```

## 3.3 Blog list page

`src/pages/blog/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout title="Blog">
  <h1 class="text-3xl font-bold mb-8">Blog</h1>
  
  <ul class="space-y-6">
    {posts.map(post => (
      <li class="border-b border-gray-200 dark:border-gray-800 pb-6">
        <a href={`/blog/${post.slug}`} class="block">
          <h2 class="text-xl font-semibold hover:text-indigo-600">
            {post.data.title}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            {post.data.description}
          </p>
          <div class="flex items-center gap-3 mt-3 text-sm text-gray-500">
            <time>{post.data.date.toLocaleDateString('vi-VN')}</time>
            <div class="flex gap-2">
              {post.data.tags.map(tag => (
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      </li>
    ))}
  </ul>
</BaseLayout>
```

## 3.4 Blog post page

`src/pages/blog/[...slug].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="prose dark:prose-invert max-w-none">
    <h1>{post.data.title}</h1>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      {post.data.date.toLocaleDateString('vi-VN')} · {post.data.author}
    </p>
    <Content />
  </article>
  
  <nav class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
    <a href="/blog" class="text-indigo-600 hover:underline">← Quay lại Blog</a>
  </nav>
</BaseLayout>
```

# Chương 4: projects showcase

`src/pages/projects/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout title="Projects">
  <h1 class="text-3xl font-bold mb-8">Projects</h1>
  
  <div class="grid md:grid-cols-2 gap-6">
    {projects.map(project => (
      <div class="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-2">{project.data.title}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {project.data.description}
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          {project.data.tech.map(tech => (
            <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
        <div class="flex gap-3">
          {project.data.url && (
            <a href={project.data.url} class="text-indigo-600 hover:underline" target="_blank">
              Demo →
            </a>
          )}
          {project.data.github && (
            <a href={project.data.github} class="text-indigo-600 hover:underline" target="_blank">
              GitHub →
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
</BaseLayout>
```

# Chương 5: academic features

## 5.1 Publication list

`src/pages/publications.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const publications = [
  {
    title: "Efficient Fine-tuning of LLMs for Vietnamese",
    authors: ["Nguyễn Văn A", "Trần Thị B", "Lê Minh C"],
    venue: "ACL 2026",
    year: 2026,
    type: "conference",
    pdf: "/papers/llm-vietnamese-2026.pdf",
    code: "https://github.com/yourname/llm-vn",
    bibtex: `@inproceedings{nguyen2026vn,
  title={Efficient Fine-tuning of LLMs for Vietnamese},
  author={Nguyen, Van A and Tran, Thi B and Le, Minh C},
  booktitle={ACL},
  year={2026}
}`
  },
  // ...
];
---

<BaseLayout title="Publications">
  <h1 class="text-3xl font-bold mb-8">Publications</h1>
  
  <ul class="space-y-6">
    {publications.map(pub => (
      <li class="border-b border-gray-200 pb-6">
        <h3 class="font-semibold text-lg">{pub.title}</h3>
        <p class="text-gray-700 dark:text-gray-300 mt-1">
          {pub.authors.join(', ')}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <em>{pub.venue}</em>, {pub.year}
        </p>
        <div class="flex gap-3 mt-3 text-sm">
          {pub.pdf && <a href={pub.pdf} class="text-indigo-600 underline">PDF</a>}
          {pub.code && <a href={pub.code} class="text-indigo-600 underline">Code</a>}
          <details>
            <summary class="cursor-pointer text-indigo-600">BibTeX</summary>
            <pre class="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">{pub.bibtex}</pre>
          </details>
        </div>
      </li>
    ))}
  </ul>
</BaseLayout>
```

## 5.2 CV page

`src/pages/cv.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="CV">
  <div class="prose dark:prose-invert max-w-none">
    <h1>CV — Nguyễn Văn A</h1>
    <a href="/cv.pdf" class="text-indigo-600">📄 Download PDF</a>
    
    <h2>Experience</h2>
    <h3>Task AI — Senior AI Engineer (2024 - now)</h3>
    <ul>
      <li>Lead AI team xây dựng platform Sale Agent</li>
      <li>Tích hợp LLM (Claude, GPT) với business workflow</li>
    </ul>
    
    <h2>Education</h2>
    <h3>VinUniversity — BS Computer Science (2020-2024)</h3>
    
    <h2>Skills</h2>
    <ul>
      <li><strong>Languages</strong>: Python, TypeScript, Go, Rust</li>
      <li><strong>AI/ML</strong>: PyTorch, Transformers, LangChain, LlamaIndex</li>
      <li><strong>Web</strong>: Next.js, React, Astro</li>
      <li><strong>DevOps</strong>: Docker, K8s, AWS, Vercel</li>
    </ul>
  </div>
</BaseLayout>
```

# Chương 6: deploy

## 6.1 GitHub Pages

```bash
# Build
npm run build

# Init git
git init
git remote add origin https://github.com/yourname/yourname.github.io.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

GitHub Action `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
      - uses: actions/deploy-pages@v4
```

Settings → Pages → Source: GitHub Actions.

Site available tại `https://yourname.github.io`.

## 6.2 Custom domain

1. Mua domain (Namecheap, Cloudflare ~$10/năm)
2. GitHub Pages → Custom domain → `yourname.dev`
3. DNS record:
   - A: 185.199.108.153 (và 109, 110, 111)
   - hoặc CNAME: yourname.github.io
4. Enable "Enforce HTTPS"

## 6.3 Alternative hosts

- **Vercel**: faster, better DX
- **Cloudflare Pages**: edge, free unlimited bandwidth
- **Netlify**: free, easy

```bash
# Vercel
vercel deploy --prod

# Cloudflare Pages
# Connect repo qua dashboard
```

# Chương 7: SEO + analytics

## 7.1 SEO basics

- **sitemap.xml**: tự sinh qua `@astrojs/sitemap`
- **robots.txt**: `public/robots.txt`
- **Open Graph**: meta tag cho social share
- **Schema.org**: structured data
- **Internal linking**: tốt cho SEO

```astro
<!-- BaseLayout.astro head -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

## 7.2 Analytics

**Posthog self-host** (privacy-friendly, free):
```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||...
  posthog.init('YOUR_KEY', {api_host: 'https://app.posthog.com'})
</script>
```

Hoặc **Plausible** ($9/tháng, privacy-friendly), **Cloudflare Analytics** (free).

Tránh Google Analytics nếu care về privacy.

## 7.3 RSS feed

```bash
npx astro add rss
```

`src/pages/rss.xml.js`:

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Nguyễn Văn A — Blog',
    description: 'Posts về AI, dev, life',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`
    }))
  });
}
```

# Chương 8: AI-assisted blog writing

## 8.1 Workflow

1. **Idea**: Notion / Obsidian capture
2. **Draft với Claude**: prompt "Viết blog về [topic], audience VN dev, 1500 từ"
3. **Refine**: edit + add personal voice
4. **Image AI-gen**: NanoBanana 2, Midjourney cho cover
5. **SEO check**: keywords, meta
6. **Publish**: commit + push

## 8.2 Disclose AI usage

Theo trend 2026, nên disclose:

```markdown
---
title: "..."
ai_assisted: true
ai_role: "draft + outline"
ai_model: "Claude Sonnet 5"
human_edit_pct: 60
---
```

Build trust với reader.

# Chương 9: maintain + grow

## 9.1 Posting cadence

- **Hằng ngày**: micro-blog Twitter/X
- **Hàng tuần**: blog post 800-1500 từ
- **Hàng tháng**: deep-dive 3000+ từ
- **Hàng quý**: newsletter summary

## 9.2 Growth channel

- **HackerNews**: submit khi có post quality
- **Reddit r/programming**: VN dev còn ít, opportunity
- **Twitter/X**: thread breakdown long post
- **LinkedIn**: professional audience
- **dev.to / Hashnode**: republish (canonical link về site bạn)
- **VN forum**: Tinhte, Voz (cẩn thận với rule)

## 9.3 Newsletter

Tích hợp Beehiiv / Substack / ConvertKit:

```astro
<form action="https://your-newsletter.com/subscribe" method="POST">
  <input type="email" name="email" placeholder="Email của bạn" required />
  <button type="submit">Subscribe</button>
</form>
```

## 9.4 Comment

- **Giscus**: comment qua GitHub Discussions (free, dev-friendly)
- **Disqus**: traditional (ads, privacy concern)
- **Cusdis**: privacy-friendly, simple

# Câu hỏi thường gặp

### Q1: Cost?

- GitHub Pages: free
- Domain: $10/năm
- Tools (Posthog, Plausible, newsletter): free tier đủ
- Total: ~$10/năm

### Q2: SEO bao lâu mới có traffic?

- 3-6 tháng để Google index tốt
- 6-12 tháng để rank cho long-tail keyword
- 1-2 năm để rank competitive keyword

Consistency > intensity. Post đều, quality tốt.

### Q3: Tiếng Việt hay tiếng Anh?

- **Tiếng Việt**: niche VN, ít cạnh tranh, audience nhỏ hơn
- **Tiếng Anh**: global, nhiều cạnh tranh, audience lớn
- **Cả 2**: tốt nhất nếu có thời gian. Cross-post sang Hashnode/dev.to (EN) + ưu tiên blog mình (VI)

### Q4: Đề xuất framework cho người mới?

**Astro** balance tốt nhất 2026:
- Simple như Hugo
- Modern như Next.js
- Fast nhất (zero JS by default)
- Best DX

### Q5: Có nên dùng template ready-made?

- **Pro template**: tiết kiệm thời gian, professional
- **Build từ đầu**: học được, customize hoàn toàn

Người mới: dùng template (vd: [Astro Paper](https://github.com/satnaing/astro-paper), [Astrofy](https://github.com/manuelernestog/astrofy)).

Sau quen → custom theo style mình.

# Tài liệu tham khảo

- [Astro docs](https://docs.astro.build/)
- [GitHub Pages docs](https://docs.github.com/en/pages)
- [Tailwind CSS](https://tailwindcss.com/)
- [Awesome Astro themes](https://astro.build/themes/)
- [VitePress alternative](https://vitepress.dev/)

---

# Phụ lục: Personal brand 2026

## A. Stack đề xuất

```
Framework: Astro 4+ (content) hoặc Next.js (more dynamic)
Style: Tailwind CSS + shadcn/ui
Content: MDX (Markdown + React component)
Comments: Giscus (GitHub Discussions)
Analytics: Posthog hoặc Plausible (privacy-first)
Newsletter: Beehiiv / Ghost
Hosting: GitHub Pages / Vercel / Cloudflare Pages
Domain: Namecheap / Cloudflare Registrar
```

## B. Content strategy 2026

- **Pillar content**: 5-10 long-form post deep về expertise
- **Cluster content**: 20-30 short post link tới pillar
- **Update old content**: cập nhật post cũ định kỳ (Google reward)
- **AI-generated với disclosure**: OK nếu giá trị thật + edit thoroughly
- **Authentic voice**: personal story > generic content

## C. VN dev community 2026

- **VN dev community lớn nhưng phân mảnh**: cơ hội consolidate
- **Tech write tiếng Việt còn ít quality content**: blue ocean
- **English content cho VN dev cũng tốt**: career international

## D. Personal brand metrics

Track:
- **Unique visitors / month**: target 1000 sau 6 tháng
- **Newsletter subscribers**: target 500 sau 1 năm
- **Backlinks**: từ site quality
- **Search impressions**: Google Search Console
- **Citation** (cho academic): Google Scholar

## E. Common mistakes

1. **Build site fancy nhưng không write content**: tools < content
2. **Inconsistent posting**: 1 post rồi nghỉ 3 tháng
3. **Đuổi theo trend hot**: viết về evergreen topic tốt hơn
4. **Không SEO**: title, meta, URL slug ảnh hưởng lớn
5. **Không có CTA**: mỗi post nên có call to action (newsletter, contact, share)
6. **Không backup**: lose Git history = lose post
7. **Quá perfectionist**: publish nhanh, iterate sau

## Sources

- [Astro Theme Repository](https://astro.build/themes/)
- [GitHub Pages best practices](https://docs.github.com/en/pages)
- [SEO for developers](https://web.dev/learn/seo)
- [Personal brand strategy](https://www.swyx.io/learn-in-public)
