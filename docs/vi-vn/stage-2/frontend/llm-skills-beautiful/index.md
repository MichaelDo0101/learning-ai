# Dùng LLM và Skills khiến UI đẹp hơn: thực chiến prompt và plugin

Ở các bài trước, bạn đã học dùng AI IDE biến bản thiết kế thành code, dùng component library dựng nhanh UI. Nhưng có thể bạn nhận ra vấn đề khó xử: **cùng yêu cầu, page AI gen ra luôn cảm giác thiếu gì đó** — font luôn là Inter quen thuộc, color là gradient tím khắp nơi, layout là grid card đối xứng đến phát ngáp — cả page toả ra mùi "AI vị" đậm đặc.

Đây không phải lỗi AI, mà bạn chưa nói cho nó **phong cách** bạn muốn.

Tưởng tượng bạn vào tiệm cắt tóc. Nếu chỉ nói "cắt giúp 1 kiểu", thợ sẽ cho 1 kết quả an toàn nhưng tầm thường. Nhưng nếu nói "tôi muốn kiểu tóc xoăn Nhật, mái 8 chữ, dài tới xương đòn, layer rõ", bạn sẽ nhận được kết quả khớp kỳ vọng.

AI cũng vậy. **Nó cần bạn mô tả hướng thẩm mỹ rõ**, mới gen ra UI đẹp và độc đáo.

Bài này dạy bạn 2 cách để AI gen UI đẹp:

1. **Prompt template thiết kế kỹ**: dùng ngôn ngữ tự nhiên nói cho AI phong cách thẩm mỹ bạn muốn
2. **Plugin Skills frontend**: để AI tự load design spec chuyên

## Bạn sẽ học được

1. Hiểu vì sao UI AI gen default "rất bình thường"
2. Làm chủ 5 chiều mô tả phong cách design (font, color, layout, animation, chi tiết)
3. Học dùng 3 plugin Skills để UI đẹp hơn
4. Qua 3 scenario thực chiến, luyện dùng prompt + Skills gen UI đẹp

## 1. Vì sao UI AI gen default "rất bình thường"?

Training data của AI có lượng cực lớn code frontend, và phần lớn code đó dùng các lựa chọn "an toàn":

| Chiều | Lựa chọn default của AI | Vấn đề |
| :--- | :--- | :--- |
| Font | Inter, Roboto, Arial | Quá thường, không có cá tính |
| Color | Gradient tím, primary xanh | Giới tech dùng quá nhiều, mỏi mắt |
| Layout | Grid đối xứng, card chồng | Dễ đoán, thiếu bất ngờ |
| Animation | Fade in/out, hover đơn giản | Không đủ tinh, thiếu layer |
| Background | Solid color, gradient đơn giản | Đơn điệu, thiếu chất liệu |

Các lựa chọn này nhìn riêng đều không tệ, nhưng **khi mọi page AI gen đều dùng chúng, thành "AI vị"**.

> 💡 **Insight then chốt**: AI không phải không biết design, mà **default về "trung bình thống kê"**. Bạn cần nói rõ cho nó hướng lệch khỏi trung bình.

## 2. Cách 1: dùng prompt mô tả phong cách design

### 2.1 5 chiều của phong cách design

Để gen UI đẹp, bạn cần mô tả hiệu ứng muốn từ 5 chiều:

| Chiều | Điểm mô tả | Keyword ví dụ |
| :--- | :--- | :--- |
| **Font** | Title dùng display bold, body dùng readable | Space Grotesk, Playfair Display, JetBrains Mono |
| **Color** | Main color + accent, tránh phân bố đều | #4F46E5 main + #F59E0B accent |
| **Layout** | Bất đối xứng, chồng, phá grid | Bento Grid, phân khu bất đối xứng, element nổi |
| **Animation** | Page load có chuẩn bị kỹ, micro-interaction | staggered reveals, scroll trigger |
| **Chi tiết** | Background, shadow, border, texture | Noise, geometric pattern, gradient mesh |

### 2.2 Mắt thấy mới tin: prompt thường vs prompt làm đẹp

So sánh hiệu ứng qua ví dụ landing page:

**Prompt thường:**

```
Giúp tôi làm landing page AI writing assistant, gồm navbar, first screen, function showcase, pricing, footer
```

**Prompt làm đẹp:**

```
Giúp tôi làm landing page AI writing assistant, yêu cầu:

**Phong cách thẩm mỹ: Neubrutalism (Tân Brutal)**

**Font:**
- Title: Space Grotesk, weight 700-900
- Body: IBM Plex Sans, weight 400

**Color:**
- Main: #000000 (đen thuần)
- Accent: #FF6B00 (cam)
- Background: #FFFDF0 (trắng kem)
- Border: 3px solid đen

**Layout:**
- Bất đối xứng, element phân chia bằng đường đen dày
- Card có hard shadow (box-shadow: 8px 8px 0px #000)
- Contrast whitespace mạnh

**Animation:**
- Page load element bật lên từ dưới
- hover button dịch lên 2px

**Chi tiết:**
- Border radius toàn 0px (góc vuông)
- Button có hiệu ứng 3D mạnh
- Background thêm noise texture tinh tế
```

Cùng yêu cầu, prompt 2 cho AI gen ra page phong cách rõ, ấn tượng.

### 2.3 Repo Skills làm đẹp frontend

Đừng viết prompt từ 0! Đây là các AI Skills liên quan trực tiếp làm đẹp frontend:

| Repo | Nội dung | Star | Link |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57 phong cách + 95 color scheme + 56 font | 10k+ | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | Tránh AI aesthetic phổ biến | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | Tool dev UI AI-native | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Skill frontend design chính thức Anthropic | - | [GitHub](https://github.com/anthropics/skills) |

> 💡 Thêm prompt phong cách xem [phụ lục: tra prompt phong cách design](#style-prompts)

### 2.5 3 template phong cách thường dùng

3 template phong cách đã verify, copy sửa dùng:

#### Template 1: Minimalism

```
**Phong cách thẩm mỹ: Minimalism**

**Font:**
- Title: PP Neue Montreal, weight 500-700
- Body: Inter, weight 400

**Color:**
- Main: #FFFFFF (trắng)
- Text: #1A1A1A (gần đen)
- Accent: #3B82F6 (xanh, dùng ít)

**Layout:**
- Whitespace nhiều (padding tối thiểu 64px)
- Layout 1 hoặc 2 cột, căn giữa
- Element phân chia bằng whitespace không phải divider

**Animation:**
- Fade in chậm (duration 600ms)
- hover color transition

**Chi tiết:**
- Border radius: 8px
- Shadow: subtle (0 4px 12px rgba(0,0,0,0.08))
- Không decoration background
```

#### Template 2: Glassmorphism

```
**Phong cách thẩm mỹ: Glassmorphism**

**Font:**
- Title: Outfit, weight 600-800
- Body: Plus Jakarta Sans, weight 400-500

**Color:**
- Background: gradient #667eea tới #764ba2
- Card background: rgba(255, 255, 255, 0.1)
- Text: #FFFFFF

**Layout:**
- Card nổi
- Card chồng nhau

**Animation:**
- Page load card xuất hiện lần lượt (staggered)
- hover card scale 1.05

**Chi tiết:**
- Border radius: 20px
- Background blur: backdrop-blur-xl
- Border: 1px rgba(255, 255, 255, 0.2)
- Halo gradient tinh tế
```

#### Template 3: Bento Grid

```
**Phong cách thẩm mỹ: Bento Grid**

**Font:**
- Title: SF Pro Display, weight 700
- Body: SF Pro Text, weight 400

**Color:**
- Background: #F5F5F7 (xám nhạt)
- Card: #FFFFFF (trắng)
- Accent: #0071E3 (xanh Apple)

**Layout:**
- Grid layout, card kích cỡ khác ghép lại
- Gap 16px giữa card
- Border radius 24px

**Animation:**
- hover card nhẹ nhấc lên
- Click có hiệu ứng nhấn

**Chi tiết:**
- Card lớn show content quan trọng
- Card nhỏ show info phụ
- Dùng icon thay 1 phần text
- Shadow sạch (0 4px 24px rgba(0,0,0,0.06))
```

## 3. Cách 2: dùng plugin Skills tự load design spec

Mỗi lần viết tay prompt phong cách rất phiền. **Skills** là package design spec tái dùng, cài xong AI tự apply.

### 3.1 3 Skills làm UI đẹp

| Skills | Đặc điểm | Lệnh cài |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 phong cách, 96 color scheme, 57 font combination | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Chính thức Anthropic, tránh AI aesthetic phổ biến | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | Plugin IDE, gen nhiều design variant | Search "SuperDesign" trong VSCode marketplace |

### 3.2 Cài UI/UX Pro Max (khuyến nghị nhất)

UI/UX Pro Max là Skills design spec toàn diện nhất hiện tại, preset:

- **67 phong cách UI**: Glassmorphism, Neumorphism, Brutalism, Bento Grid...
- **96 color scheme**: phân loại theo ngành (SaaS, TMĐT, social...)
- **57 font combination**: combo do designer pro verify
- **100+ rule design**: spec cho spacing, border radius, shadow

**Bước cài:**

```bash
# 1. Cài CLI global
npm install -g uipro-cli

# 2. Init (chọn AI tool bạn dùng)
uipro init --ai claude
# hoặc
uipro init --ai cursor
# hoặc
uipro init --ai trae
```

Sau cài, chỉ cần thêm 1 câu trong prompt:

```
Dùng phong cách Glassmorphism của UI/UX Pro Max, giúp tôi làm landing page AI writing assistant
```

AI sẽ tự apply font, color, layout spec tương ứng.

### 3.3 Cài frontend-design chính thức Anthropic

Skill chính thức Anthropic, chuyên giải vấn đề "AI aesthetic phổ biến":

```bash
# Execute trong Claude Code
npx skills add anthropics/skills/frontend-design
```

Sau cài, AI tự tránh:
- ❌ Font Inter, Roboto, Arial
- ❌ Background gradient tím
- ❌ Layout grid đối xứng
- ❌ Shadow quá nhạt

Mà nghiêng về:
- ✅ Combo font độc đáo
- ✅ Main color táo bạo + accent sắc bén
- ✅ Layout bất đối xứng, chồng
- ✅ Background có chất liệu (noise, geometric pattern)

## 4. Thực chiến 1: dùng prompt làm đẹp redesign landing page

Dùng kiến thức vừa học, biến landing page thường thành đẹp.

### 4.1 Version thường

Đầu tiên dùng prompt thường xem AI cho gì:

```
Giúp tôi làm landing page platform nhận nuôi thú cưng, gồm:
- Navbar (Logo, link, button đăng ký)
- First screen (title, subtitle, CTA button, ảnh thú cưng)
- Showcase thú cưng (3 card)
- About us
- Footer
```

Page gen ra... dùng được, nhưng rất thường.

### 4.2 Version làm đẹp

Giờ thêm mô tả phong cách:

```
Giúp tôi làm landing page platform nhận nuôi thú cưng, yêu cầu:

**Phong cách thẩm mỹ: ấm áp mềm mại + cảm giác vẽ tay**

**Font:**
- Title: Nunito (font tròn), weight 700-800
- Body: Nunito, weight 400-600

**Color:**
- Main: #FFB347 (cam ấm)
- Secondary: #FFCCB3 (cam nhạt)
- Background: #FFF8F0 (trắng kem)
- Text: #5D4037 (nâu)

**Layout:**
- Card tròn trịa (border-radius: 24px)
- Card nghiêng nhẹ (góc khác nhau)
- Element nổi, hiệu ứng chồng

**Animation:**
- Page load element trượt vào từ 2 bên
- Card thú cưng hover lắc đầu như thú cưng (animation rotate)
- Button hover hiệu ứng nảy

**Chi tiết:**
- Mọi border radius dùng 16-24px
- Shadow ấm mềm (0 8px 24px rgba(255,179,71,0.3))
- Background thêm pattern dấu chân
- Ảnh dùng cắt bất quy tắc (clip-path)
- Icon phong cách vẽ tay (outline style)
```

Page gen ra sẽ ấm áp, đáng yêu, khiến người muốn nhận nuôi thú cưng.

## 5. Thực chiến 2: dùng Skills gen nhanh dashboard

Skills đặc biệt hợp hệ backend cần nhiều page.

### 5.1 Dùng UI/UX Pro Max

```
Dùng phong cách Dashboard Dark của UI/UX Pro Max,
giúp tôi làm page dashboard backend quản product SaaS, gồm:

**Top:** 4 stat card (user count, active user, revenue, API calls)

**Giữa:**
- Trái: line chart tăng trưởng user (7 ngày gần đây)
- Phải: pie chart phân bố subscription plan

**Đáy:** list hoạt động gần đây (time, user, action)
```

AI sẽ tự apply design spec dashboard dark:
- Background xám đậm (#1A1A2E)
- Card contrast cao (#16213E)
- Color data rực (xanh, lục, cam)
- Card nổi hiệu ứng glassmorphism

### 5.2 Dùng frontend-design Skill

```
Dùng frontend-design skill,
giúp tôi làm trang chủ blog cá nhân, phong cách độc đáo, có cá tính
```

AI sẽ chọn 1 hướng thẩm mỹ phi-mainstream (retro-futuristic hoặc magazine style), rồi dùng font, color, layout độc đáo để implement.

## 6. Thực chiến 3: tạo Skill design system riêng

Nếu bạn có phong cách brand cố định, có thể tạo Skill riêng, để mọi page AI gen tuân thủ brand bạn.

### 6.1 Tạo file Skill

Trong project tạo `.claude/skills/my-brand/SKILL.md`:

````markdown
---
name: my-brand
description: Design system riêng cho project, đảm bảo mọi UI tuân ngôn ngữ design thống nhất
---

# Design system project tôi

## Color brand
- Main: #6366F1 (Indigo 500)
- Secondary: #8B5CF6 (Violet 500)
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Background: #F9FAFB
- Card: #FFFFFF

## Font system
- Title: Plus Jakarta Sans
  - H1: 700, 48px
  - H2: 600, 36px
  - H3: 600, 24px
- Body: Inter
  - Body: 400, 16px
  - Small: 400, 14px

## Spacing system
- Base unit: 4px
- Component padding: 8px / 12px / 16px
- Block spacing: 24px / 32px / 48px
- Page margin: 64px

## Border radius
- Button: 8px
- Card: 12px
- Input: 8px
- Modal: 16px

## Shadow
- Small: 0 1px 3px rgba(0,0,0,0.1)
- Medium: 0 4px 12px rgba(0,0,0,0.1)
- Large: 0 8px 24px rgba(0,0,0,0.12)

## Animation
- Transition time: 150ms / 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Hover effect: nhẹ phóng (scale-105)

## Style cấm dùng
- Không dùng gradient tím
- Không dùng font ngoài Inter
- Không dùng border radius lớn hơn 16px
- Không dùng pure black (#000000), dùng #1F2937
````

### 6.2 Dùng Skill riêng

Sau tạo, bạn chỉ cần nói trong prompt:

```
Dùng my-brand skill, giúp tôi làm 1 page user setting
```

AI sẽ tự apply mọi design spec bạn định.

## 7. Tóm tắt

Có 2 cách để AI gen UI đẹp:

| Cách | Ưu | Nhược | Scenario phù hợp |
| :--- | :--- | :--- | :--- |
| **Prompt mô tả** | Linh hoạt, mỗi lần điều chỉnh được | Phải viết lặp lại | Page 1 lần, thử nghiệm phong cách khác |
| **Plugin Skills** | Cài 1 lần, hiệu lực liên tục | Cần cài config | Project có yêu cầu phong cách cố định |

**Khuyến nghị workflow Vibe Coding:**

1. **Giai đoạn explore**: dùng prompt phong cách khác thử nghiệm, tìm hướng thẩm mỹ thích
2. **Sau xác định phong cách**: cài Skill tương ứng (UI/UX Pro Max hoặc frontend-design)
3. **Project brand**: tạo Skill riêng, thống nhất ngôn ngữ design cả project

### Bài tập

Chọn 1 scenario, dùng cách bài này hoàn thành từ 0:

1. Dùng prompt phong cách redesign UI cho 1 project trước của bạn (chọn 1 phong cách bạn thích)
2. Cài UI/UX Pro Max, dùng 1 phong cách của nó gen 1 page mới
3. Tạo Skill design system riêng, định nghĩa color và font brand bạn

---

## Phụ lục: bảng tra phong cách design

| Phong cách | Keyword | Scenario phù hợp | Product ví dụ |
| :--- | :--- | :--- | :--- |
| **Minimalism** | Whitespace, monochrome, sạch | Product cao cấp, portfolio cá nhân | Apple website |
| **Glassmorphism** | Mờ kính, gradient, blur | Product tech, landing SaaS | macOS Big Sur |
| **Neubrutalism** | Border dày, hard shadow, solid color | Brand trend, web nghệ thuật | Brassius |
| **Bento Grid** | Grid, ghép, card | Hiển thị info, dashboard | Apple promo |
| **Retro Future** | Neon, gradient, synthwave | Game, music | STRANGER THINGS |
| **Hand-drawn** | Bất quy tắc, tròn trịa, illustration | Giáo dục, sản phẩm trẻ em | Duolingo |
| **Magazine** | Font lớn, bất đối xứng, whitespace | Web content, blog | Medium |
| **Dark Luxury** | Tối, vàng, tinh tế | Cao cấp, luxury | Nhiều brand cao cấp |

## Phụ lục: tra nhanh cài Skills

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# Anthropic frontend-design
npx skills add anthropics/skills/frontend-design

# Anthropic brand-guidelines
npx skills add anthropics/skills/brand-guidelines

# Xem Skills đã cài trong Claude Code
/help
```

## Phụ lục: khuyến nghị color scheme

| Color scheme | Main | Accent | Background | Phong cách |
| :--- | :--- | :--- | :--- | :--- |
| **Sunset** | #F97316 | #FBBF24 | #FFF7ED | Ấm, sức sống |
| **Ocean** | #0EA5E9 | #06B6D4 | #F0F9FF | Tươi, pro |
| **Forest** | #10B981 | #34D399 | #ECFDF5 | Tự nhiên, khoẻ |
| **Berry** | #8B5CF6 | #EC4899 | #FAF5FF | Lãng mạn, sáng tạo |
| **Coffee** | #78350F | #D97706 | #FFFBEB | Ấm, retro |
| **Monolith** | #6B7280 | #9CA3AF | #F9FAFB | Pro, trung tính |

## Phụ lục: tra prompt phong cách design {#style-prompts}

Prompt thử để page frontend đẹp hơn:

### Loại phong cách

| Phong cách | Keyword (Eng) | Đặc trưng visual core | Prompt ví dụ |
|:---|:---|:---|:---|
| **Pop Art** | Pop Art | Color contrast táo bạo, outline đen, texture chấm | Pop art style website, bold colors and comic dots, vibrant |
| **Minimalism** | Minimalism | Whitespace nhiều, color và line ít, không decoration | Minimalist web design, ample white space, geometric, serene |
| **Abstract Expressionism** | Abstract Expressionism | Nét đầy emotion, splash color | Abstract expressionism background, dynamic paint splashes, emotional |
| **Retro/Vintage** | Retro/Vintage | Font cũ, texture cũ, color scheme retro | Retro 80s website design, neon grid and synthwave color palette |
| **Cyberpunk** | Cyberpunk | Neon contrast cao, glitch art, background tối | Cyberpunk UI, neon lights on dark background, glitch effects |
| **Neumorphism** | Neumorphism | Shadow và highlight mềm, chất liệu nhẹ lồi/lõm | Neumorphism design style, soft shadows, clean and modern |
| **Generative Art** | Generative Art | Pattern visual flow do algorithm sinh | Generative art background, flowing algorithmic patterns, digital |
| **Acid Graphics** | Acid Graphics | Chất kim loại, glass state, font răng cưa | Acid graphics web layout, glass morphism, chaotic typography |
| **Immersive 3D** | Immersive 3D | Scene 3D tương tác, không gian cực mạnh | Immersive 3D website, interactive product model in space |
