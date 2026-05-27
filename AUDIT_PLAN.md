# Plan Audit & Migration: zh-cn → vi-vn (giữ en)

> Tài liệu plan cho việc chuyển ngôn ngữ gốc của repo Easy-Vibe sang tiếng Việt, giữ lại bản tiếng Anh, gỡ bỏ các locale khác.

## 1. Tóm tắt hiện trạng (đo ngày 2026-05-21)

| Locale | Số file `.md` | Khối lượng | Coverage so với zh-cn | Quyết định |
|---|---:|---:|---:|---|
| `zh-cn` (gốc) | 187 | ~237k từ / 409M | 100% | 🔴 Xóa khỏi repo |
| `en` | 70 | 38k dòng / 3.2M | ~37% | 🟢 Giữ nguyên |
| `vi-vn` | 24 | 9k dòng / 600K | ~13% (7 file dịch dở 1–65%) | 🟢 Mở rộng đến 100% |
| `ja-jp` | 24 | 1.2M | skeleton | 🔴 Xóa |
| `ko-kr` | 25 | 888K | skeleton | 🔴 Xóa |
| `zh-tw` | 24 | 732K | skeleton | 🔴 Xóa |
| `es-es` | 24 | 628K | skeleton | 🔴 Xóa |
| `fr-fr` | 24 | 888K | skeleton | 🔴 Xóa |
| `de-de` | 24 | 580K | skeleton | 🔴 Xóa |
| `ar-sa` | 24 | 1.2M | skeleton | 🔴 Xóa |

**Khối lượng dịch zh-cn → vi-vn:**
- `stage-1` (PM/sản phẩm): 26k từ
- `stage-2` (frontend + backend): 37k từ
- `stage-3` (advanced + cross-platform): 46k từ
- `appendix` (9 chương kiến thức): 126k từ
- `vibe-stories` (4 câu chuyện): ~500 từ
- `guide` + `index`: ~400 từ
- **Tổng: ~236k từ cần dịch**

**Files đã có trong vi-vn nhưng cần dịch tiếp:**
- `appendix/index.md` (33%)
- `stage-1/ai-capabilities-through-games/index.md` (29%)
- `stage-1/appendix-a-product-thinking/index.md` (14%)
- `stage-1/appendix-consumer-scenarios/index.md` (1%)
- `stage-1/finding-great-idea/index.md` (19%)
- `stage-2/index.md` (65%)
- `stage-3/index.md` (61%)

**Files cần phát hiện thêm:**
- `vi-vn/stage-0/index.md` — VI-only, giữ lại (không có trong zh-cn)

## 2. Quyết định đã chốt

| # | Quyết định | Lựa chọn |
|---|---|---|
| 1 | Phạm vi appendix | **Dịch hết 9 chương** (full parity với zh-cn) |
| 2 | Slug folder/URL | **Giữ tiếng Anh** (e.g., `/vi-vn/stage-1/finding-great-idea/`) |
| 3 | Phương pháp dịch | **AI batch (Claude) + glossary** thuật ngữ thống nhất, user review |
| 4 | Stage 0 VI-only | **Giữ lại** (orphan có chủ đích) |
| 5 | Vibe stories | Dịch toàn bộ (chỉ 500 từ) |
| 6 | Default locale sau migration | `vi-vn` (root redirect `/` → `/vi-vn/`) |

## 3. Phase 1 — Glossary thuật ngữ

Trước khi dịch, lập glossary để AI batch dùng nhất quán. Đề xuất khung ban đầu (mở rộng khi gặp):

| zh-cn / en gốc | vi-vn |
|---|---|
| Vibe Coding | Vibe Coding (giữ nguyên) |
| Prompt Engineering | Kỹ thuật prompt |
| AI Agent | AI Agent (giữ nguyên) |
| Large Language Model (LLM) | Mô hình ngôn ngữ lớn (LLM) |
| Frontend / Backend | Frontend / Backend (giữ) |
| API | API (giữ) |
| Full-stack | Full-stack (giữ) |
| MCP | MCP (giữ nguyên) |
| 产品经理 (Product Manager) | Product Manager (PM) |
| 学习地图 (Learning Map) | Lộ trình học |
| 实战 | Thực chiến |
| 入门 / 进阶 / 高级 | Nhập môn / Trung cấp / Nâng cao |
| 工程师 | Kỹ sư |
| 架构 | Kiến trúc |
| 部署 | Triển khai |
| 数据库 | Cơ sở dữ liệu |
| 缓存 | Bộ nhớ đệm (cache) |
| 队列 | Hàng đợi (queue) |
| 认证 / 授权 | Xác thực / Phân quyền |

**Quy tắc dịch:**
- Tên riêng tool/framework (Claude, Cursor, Vue, Vite…): giữ nguyên
- Code snippet và filename trong code block: KHÔNG dịch
- Heading: dịch nghĩa, không word-by-word
- Tone: thân thiện, giáo dục, xưng "bạn" — phù hợp tài liệu cho người mới
- Câu chuyện thật (vibe-stories): localize bối cảnh nếu phù hợp

## 4. Phase 2 — Snapshot & Cleanup locales

### 4.1 Snapshot trước khi xóa
```bash
git init  # nếu chưa init
git add -A && git commit -m "snapshot: before vi-vn migration"
git branch backup/multilang
```

### 4.2 Xóa file
```bash
# Locales cần xóa
rm -rf docs/{zh-cn,zh-tw,ja-jp,ko-kr,es-es,fr-fr,de-de,ar-sa}
```

### 4.3 Sửa code (các file đã định vị)
- `docs/.vitepress/config.mjs`:
  - Xóa entries trong `localeMap` (dòng 31–93) trừ `vi-vn`, `en`
  - Xóa blocks `'zh-cn'`, `'ja-jp'`, `'zh-tw'`, `'ko-kr'`, `'es-es'`, `'fr-fr'`, `'de-de'`, `'ar-sa'` (dòng 1805–3115)
  - Sửa `root` locale (dòng 1790) trỏ về `/vi-vn/` thay vì `/zh-cn/`
  - Sửa các nav link đang trỏ `/zh-cn/stage-2`, `/zh-cn/stage-3`, `/zh-cn/appendix` trong block `vi-vn` (dòng 3152–3163) → đổi thành `/vi-vn/...`
- `docs/index.md`: rút gọn `langMap` còn `vi-*`, `en-*`, default `vi-vn`
- `docs/welcome.md`: kiểm tra & rút locale
- `docs/.vitepress/theme/composables/useI18n.js`: chỉ giữ `vi-VN`, `en`
- `docs/.vitepress/theme/components/home/HomeI18n.js`: xóa keys `ja-jp`, `zh-tw`, `ko-kr`, `es-es`, `fr-fr`, `de-de`, `ar-sa`, `zh-cn`; chỉ giữ `vi-vn`, `en`
- `docs/.vitepress/theme/components/home/HomeData.js`: tương tự
- `docs/.vitepress/theme/data/relatedArticles.js`: tương tự
- `docs/.vitepress/theme/index.js`: kiểm tra & gỡ ref
- `docs/.vitepress/theme/utils/readingBookmark.test.js`: gỡ test case ngôn ngữ khác
- `scripts/generate-sitemap.mjs`: chỉ generate sitemap cho `vi-vn`, `en`

**17 Vue components có hardcode label tiếng khác** (audit từng file):
```
docs/.vitepress/theme/components/HomeFeatures.vue
docs/.vitepress/theme/components/appendix/api-design/StatusCodeDemo.vue
docs/.vitepress/theme/components/appendix/cloud-services/K8sServicesDemo.vue
docs/.vitepress/theme/components/appendix/component-state-management/ComponentHierarchyDemo.vue
docs/.vitepress/theme/components/appendix/computer-fundamentals/AddressingModeDemo.vue
docs/.vitepress/theme/components/appendix/computer-fundamentals/TransportLayerDemo.vue
docs/.vitepress/theme/components/appendix/file-storage/CDNAccelerationDemo.vue
docs/.vitepress/theme/components/appendix/frontend-evolution/RoutingModeDemo.vue
docs/.vitepress/theme/components/appendix/frontend-evolution/SliceRequestDemo.vue
docs/.vitepress/theme/components/appendix/frontend-routing/RoutingModesDemo.vue
docs/.vitepress/theme/components/appendix/gateway-proxy/SslTerminationDemo.vue
docs/.vitepress/theme/components/appendix/llm-intro/MoEDemo.vue
docs/.vitepress/theme/components/appendix/load-balancing/MultiRegionDemo.vue
docs/.vitepress/theme/components/appendix/prompt-engineering/PromptSecurityDemo.vue
docs/.vitepress/theme/components/appendix/rag/RAGArchitectureDemo.vue
docs/.vitepress/theme/components/appendix/web-basics/DeploymentArchitecture.vue
docs/.vitepress/theme/components/appendix/web-basics/DnsLookupDemo.vue
```

### 4.4 Acceptance Phase 2
- [ ] `npm run dev` chạy không error
- [ ] Navbar dropdown ngôn ngữ chỉ hiện **Tiếng Việt**, **English**
- [ ] Vào `http://localhost:5173/easy-vibe/` redirect đúng về `/vi-vn/`
- [ ] Không còn file nào còn folder `/zh-cn/`, `/ja-jp/`, etc.

## 5. Phase 3 — Khung skeleton vi-vn

Tạo cây thư mục vi-vn mirror cấu trúc zh-cn cũ (đã snapshot ở backup branch):
- 9 thư mục appendix
- Stage-1: 14 thư mục (bao gồm các appendix-*)
- Stage-2: 4 thư mục (ai-capabilities, assignments, backend, frontend)
- Stage-3: 4 thư mục (ai-advanced, core-skills, cross-platform, personal-brand)
- vibe-stories
- guide

Mỗi file mới tạo:
- Frontmatter cơ bản (title, description tiếng Việt)
- Stub: `> 🚧 Đang dịch` (để build pass + sidebar không 404)

### 5.1 Sửa sidebar
Trong `config.mjs` block `vi-vn`:
- Sao sidebar zh-cn sang vi-vn, đổi prefix `/zh-cn/` → `/vi-vn/`, dịch label `text:`
- Bao gồm `vibe-stories` (đang thiếu trong vi-vn nav hiện tại)

### 5.2 Acceptance Phase 3
- [ ] Tất cả URL trong sidebar `/vi-vn/...` trả 200 (smoke script)
- [ ] `npm run build` không có dead link warning

## 6. Phase 4 — Dịch nội dung (3 wave)

### Wave A — Core (~64k từ)
1. `vi-vn/index.md`, `guide/`, `welcome` ⏱ <1h
2. Fix 7 file dịch dở (`stage-1/appendix-consumer-scenarios`, `finding-great-idea`, etc.)
3. `stage-1/*` (12 chương) — 26k từ
4. `stage-2/*` — 37k từ (frontend trước, backend sau)
5. `stage-3/*` — 46k từ
6. `vibe-stories/*` — 500 từ

### Wave B — Appendix chương 1, 2, 3, 8 (~80k từ)
- `1-computer-fundamentals` (12 file)
- `2-development-tools` (10 file)
- `3-browser-and-frontend` (~15 file)
- `8-artificial-intelligence`

### Wave C — Appendix chương 4, 5, 6, 7, 9 (~46k từ)
- `4-server-and-backend`
- `5-data`
- `6-architecture-and-system-design`
- `7-infrastructure-and-operations`
- `9-engineering-excellence`

### Quy trình mỗi batch (≤10 file/lần)
1. Đọc nguyên bản từ backup branch
2. Dịch qua Claude với glossary đính kèm prompt
3. Ghi đè file stub trong vi-vn
4. User review (Hybrid checkpoint cuối mỗi wave)
5. Update glossary nếu có term mới

## 7. Phase 5 — QA toàn diện

- [ ] `npm run build` clean, 0 dead link
- [ ] Smoke script: HEAD request mọi URL trong sitemap → 200
- [ ] `grep -rE "[\\x{4e00}-\\x{9fff}]" docs/vi-vn` → 0 match (không còn chữ Hán)
- [ ] Local search (minisearch) tìm được "AI", "Vibe", "Lộ trình" trong vi-vn
- [ ] Manual check 10 trang random trên 3 thiết bị (desktop/mobile/dark mode)
- [ ] Browser language detect: trình duyệt VN → `/vi-vn/`, trình duyệt EN → `/en/`

## 8. Phase 6 — Deploy & doc

- [ ] Update `README.md`: phần "Multi-language" nói rõ chỉ còn vi + en
- [ ] Update `AGENTS.md`, `CLAUDE.md`: gỡ mention 13 ngôn ngữ
- [ ] `npm run build && npm run preview` test local
- [ ] Cập nhật `vercel.json` nếu có hardcode
- [ ] Cập nhật `nginx.conf` nếu có locale routing
- [ ] Commit theo logical chunks: cleanup / skeleton / wave-A / wave-B / wave-C / docs

## 9. Estimate effort

| Phase | Effort | Phụ thuộc |
|---|---|---|
| 1. Glossary | 30 phút | — |
| 2. Cleanup locales | 1–2h | Glossary |
| 3. Skeleton vi-vn | 2–3h | Phase 2 done |
| 4. Wave A (core) | AI batch ~2–3h + review 4h | Phase 3 done |
| 4. Wave B (appendix priority) | AI batch ~3h + review 6h | Wave A done |
| 4. Wave C (appendix rest) | AI batch ~2h + review 4h | Wave B done |
| 5. QA | 4h | Phase 4 done |
| 6. Deploy & docs | 1h | Phase 5 pass |
| **Total** | ~30h effort (1 tuần làm full-time, hoặc 2–3 tuần part-time) | |

## 10. Risk register

| Risk | Mitigation |
|---|---|
| AI dịch không nhất quán thuật ngữ | Bắt buộc đính glossary vào mỗi prompt; review wave-by-wave |
| Code snippet bị dịch nhầm | Prompt rule: trong code block, chỉ dịch comment, không dịch identifier |
| Link nội bộ bị vỡ sau dịch | Giữ slug tiếng Anh, không rename folder |
| Mất nội dung gốc khi xóa zh-cn | `backup/multilang` branch trước khi xóa |
| Vue components có chữ TQ ngấm vào UI | Audit từng component, dùng `useI18n` thay vì hardcode |
| Wave dài, mất context | Commit cuối mỗi wave + checklist trong file này |
| Vibe-stories culturally Chinese | Dịch sát, không localize; ghi chú "ví dụ từ TQ" trong intro |

## 11. Out-of-scope (lần này không làm)

- Thêm ngôn ngữ mới (Khmer, Thai…)
- Refactor cấu trúc folder
- Đổi VitePress version
- Viết lại nội dung gốc (chỉ dịch, không edit nội dung)
- Audit SEO cho từng trang

---

**Next step:** Bắt đầu Phase 1 (glossary mở rộng nếu cần) + Phase 2 (cleanup locales) ngay khi user xác nhận.
