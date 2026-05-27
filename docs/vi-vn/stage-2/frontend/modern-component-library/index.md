# Dùng component library hiện đại để update giao diện

Ở các bài trước, bạn đã học cách dùng tool design vẽ UI, dùng AI IDE biến bản thiết kế thành code, thậm chí hoàn thành 1 project frontend đầy đủ. Nhưng bạn có thể nhận ra 1 vấn đề: button, form, popup tự viết từ 0 dù dùng được, nhưng luôn cảm giác cách "product chuyên nghiệp" một khoảng — style không đủ thống nhất, chi tiết interaction không đủ mượt, thích ứng các size màn hình cũng đau đầu.

Đây chính là vấn đề **component library** giải quyết.

Component library là bộ sưu tập UI parts đã được thiết kế và dev sẵn. Button, input, dropdown, dialog, table… — các UI element bạn dùng lặp đi lặp lại trong bất kỳ product nào — component library đã làm sẵn cho bạn, và đã qua kiểm chứng và mài giũa bởi rất nhiều user. Bạn chỉ cần ghép lại như xếp hình, là build nhanh được UI cấp pro.

## Bạn sẽ học được

1. Hiểu component library frontend là gì, và vì sao dev hiện đại gần như đều dùng
2. Nhận biết 4 component library tiêu biểu nhất, hiểu scenario mỗi cái giỏi
3. Qua 3 scenario thực chiến (landing page, product page, admin backend), học Vibe Coding với AI IDE + component library
4. Học cách đọc tài liệu component library, theo nhu cầu tìm component phù hợp và dùng đúng

## 1. Vì sao cần component library?

Tưởng tượng bạn đang sửa nhà. Bạn có thể tự làm 1 cái ghế từ gỗ, nhưng cách phổ biến hơn là ra IKEA mua — design đẹp, chất lượng ổn định, hướng dẫn rõ, đem về lắp là xong.

Component library chính là "IKEA" trong frontend dev. Nó cung cấp không phải đồ nội thất, mà là UI parts:

| Tự viết tay | Dùng component library |
| :--- | :--- |
| Phải tự xử style, interaction, animation | Out-of-the-box, style và interaction đã mài sẵn |
| Button các page khác nhau có thể trông khác nhau | Phong cách global thống nhất, tự giữ nhất quán |
| Thích ứng mobile, tablet cần work thêm | Đa số component library đã built-in responsive |
| Accessibility dễ bị bỏ qua | Component library pro đã xử keyboard nav, screen reader |
| Tốc độ dev chậm | Tốc độ dev nhanh, focus vào business logic |

Đơn giản: **component library giúp bạn dùng thời gian vào "làm gì", không phải "vẽ thế nào".**

### Mắt thấy mới tin: cùng yêu cầu, có và không component library khác biệt

Nói chay không thuyết phục. Trong Trae dùng cùng yêu cầu gần như giống nhau, riêng chỉ định và không chỉ định component library, xem khác biệt kết quả.

**Prompt 1: không dùng component library**

```text
Giúp tôi làm 1 page dashboard data cho AI writing assistant, gồm:
- Title bar top và button export
- 4 stat card hiển thị user count, active user, doc count, revenue, kèm trend tăng/giảm
- 1 line chart và 1 pie chart
- Table list user, có phân trang
- Sidebar navigation bên trái
```

Effect chạy trực tiếp trong Trae:

<!-- TODO: thay screenshot dashboard không dùng component library trong Trae -->

**Prompt 2: dùng shadcn/ui component library**

```text
Giúp tôi làm 1 page dashboard data cho AI writing assistant, dùng component library shadcn/ui, gồm:
- Title bar top và button export
- 4 stat card hiển thị user count, active user, doc count, revenue, kèm trend tăng/giảm
- 1 line chart và 1 pie chart
- Table list user, có phân trang
- Sidebar navigation bên trái
```

Cùng chạy trong Trae:

<!-- TODO: thay screenshot dashboard dùng shadcn/ui trong Trae -->

Cùng yêu cầu, khác biệt duy nhất là thêm `shadcn/ui + Tailwind CSS` ở đầu prompt, kết quả Trae gen ra về độ nhất quán visual, chi tiết interaction, mức độ mài giũa tổng thể — không cùng cấp độ. Đây là "upgrade miễn phí" component library mang lại — bạn chỉ cần viết thêm tên component library trong prompt.

## 2. Nhận biết 4 component library core

Component library rất nhiều (xem [phụ lục](#phụ-lục-tổng-quan-thêm-component-library)), nhưng bạn chỉ cần biết 4 cái tiêu biểu nhất:

| Library | Framework | Định vị 1 câu | Web chính |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | Của Ant Group, chuẩn de-facto cho middle-back-office cấp doanh nghiệp, độ phủ component cực rộng | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | Không cài npm package, copy thẳng code vào project, dựa Tailwind CSS, độ tự do custom cao nhất | ui.shadcn.com |
| [HeroUI](https://heroui.com) (trước là NextUI) | React | Style mặc định đẹp, animation mượt, hợp landing page và product showcase yêu cầu visual cao | heroui.com |
| [Material UI](https://mui.com) | React | Component library React kỳ cựu nhất, implement chuẩn Google Material Design, ecosystem trưởng thành nhất | mui.com |

> User Vue cũng có nhiều lựa chọn: [Element Plus](https://element-plus.org) (phổ biến nhất Trung Quốc), [Ant Design Vue](https://antdv.com), [Naive UI](https://www.naiveui.com)... chi tiết xem [phụ lục](#phụ-lục-tổng-quan-thêm-component-library).

Các library khác nhau giỏi scenario khác nhau. Tiếp theo qua 3 scenario dev thực, đưa bạn trải nghiệm cách Vibe Coding với AI IDE + component library.

Để show phong cách và đặc điểm các library, ở mỗi scenario cố ý chọn library khác. Nhưng lưu ý: **chỉ để bạn thấy thêm vài giải pháp**, trong dev thực bạn hoàn toàn có thể chỉ dùng 1 cái bạn quen nhất. Ví dụ thích phong cách shadcn/ui, dùng nó làm landing page, product page, admin backend đều OK. Chọn 1 cái bạn thấy đẹp, dùng thoải mái — quan trọng hơn mọi thứ khác.

## 3. Thực chiến 1: dùng HeroUI build product landing page

**Scenario**: bạn làm 1 product AI writing assistant, cần 1 landing page đẹp để show tính năng product, hút user đăng ký. Landing page cần visual impact mạnh, animation mượt, trên mobile cũng đẹp.

**Vì sao chọn HeroUI**: style mặc định HeroUI vốn đẹp, có sẵn transition animation mượt, rất hợp page showcase hướng user.

### 3.1 Tạo project

```bash
# Dùng CLI chính thức HeroUI tạo project
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

### 3.2 Dùng AI IDE gen landing page

Mở AI IDE (Cursor, Trae...), nhập trong khung chat:

```text
Giúp tôi làm landing page AI writing assistant, dùng component library HeroUI:

**Cấu trúc page:**
1. Navbar trên: trái là Logo và tên product, phải là 3 link "Features", "Pricing", "About", thêm button "Get Started"
2. Khu first screen: title lớn "AI là partner viết của bạn", subtitle giới thiệu giá trị product, 2 button "Free trial" và "Xem demo", dưới đặt 1 screenshot product
3. Khu showcase tính năng: 3 cột card, lần lượt giới thiệu "Smart continuation", "Adjust style", "Multi-language translation", mỗi card có icon, title, mô tả
4. Khu pricing: 3 pricing card (Free, Pro, Team), Pro highlight là recommended
5. CTA cuối: 1 câu copy hấp dẫn, kèm button đăng ký
6. Footer: thông tin copyright và link MXH

**Yêu cầu design:**
- Trông hiện đại, pro
- Hỗ trợ dark mode
- Trên mobile cũng phải đẹp
```

### 3.3 Các component then chốt AI sẽ dùng

Trong code AI gen, bạn sẽ thấy các component HeroUI:

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

Vai trò mỗi component:

| Component | Dùng làm gì | Vị trí trong landing page |
| :--- | :--- | :--- |
| `Navbar` | Navbar top | Top page, cố định không di chuyển |
| `Button` | Button, hỗ trợ nhiều variant và color | CTA button, navigation button |
| `Card` | Card container | Showcase tính năng, pricing card |
| `Chip` | Tag nhỏ | Mark "Recommended", "Most popular" |
| `Divider` | Đường phân chia | Phân chia visual giữa các khu |

### 3.4 Iterate optimize

Code bản đầu gen ra có thể chưa hoàn toàn ưng, chat tiếp với AI để chỉnh:

```text
Giúp tôi optimize landing page:

1. Title lớn thêm gradient color, từ xanh sang tím
2. Card tính năng hover phải có animation nhấc lên
3. Pricing card Pro phải highlight, thêm border và tag "Most popular"
4. Navigation trên mobile đổi thành hamburger menu (3 vạch ngang)
```

> **Core của Vibe Coding**: bạn không cần nhớ API mỗi component, chỉ cần mô tả bằng ngôn ngữ tự nhiên hiệu ứng bạn muốn, AI sẽ giúp tìm component phù hợp và cách viết. Gặp chỗ chưa ưng, chat tiếp iterate.

## 4. Thực chiến 2: dùng shadcn/ui build product page

**Scenario**: AI writing assistant của bạn cần giao diện chính sau khi user login — bên trái là danh sách document, bên phải là editor, top có toolbar. Đây là product page function-type, cần UI custom sâu.

**Vì sao chọn shadcn/ui**: shadcn/ui đặt code component thẳng vào project bạn, bạn có thể sửa tuỳ ý mọi chi tiết. Với giao diện product cần custom sâu, mode "sở hữu code" này linh hoạt nhất.

### 4.1 Tạo project

```bash
# Tạo Next.js project
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# Init shadcn/ui
npx shadcn@latest init

# Add component theo nhu cầu (không phải cài tất cả 1 lần)
npx shadcn@latest add button card input sidebar sheet dialog
```

Đặc trưng độc đáo của shadcn/ui: mỗi lần `add` 1 component, nó copy source code vào thư mục `components/ui/` của project bạn. Bạn có thể mở file đó sửa thẳng style và behavior.

### 4.2 Dùng AI IDE gen giao diện product

```text
Giúp tôi làm giao diện chính AI writing assistant, dùng component library shadcn/ui:

**Layout tổng:**
- Bên trái là sidebar có thể collapse, rộng khoảng 280px:
  - Top đặt button "New document"
  - Dưới là list document, mỗi doc hiển thị title và thời gian sửa cuối
  - Right-click doc có thể rename hoặc delete
- Bên phải là vùng editor chính, chia trên dưới:
  - Trên là toolbar: edit title doc, hiện đếm từ, button "AI continuation", dropdown "Export"
  - Dưới là vùng editor: 1 text input lớn, chiếm hết không gian còn lại

**Chi tiết interaction:**
- Bấm "AI continuation" xong button show loading, đáy editor xuất hiện text AI gen (như typewriter từng chữ)
- Trên mobile sidebar thành drawer từ trái trượt ra
- Document đang select phải highlight
```

### 4.3 Các component then chốt AI sẽ dùng

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| Component | Dùng làm gì | Vị trí trong product page |
| :--- | :--- | :--- |
| `Sidebar` | Sidebar collapse được | Danh sách doc bên trái |
| `Sheet` | Drawer mobile | Thay sidebar trên mobile |
| `DropdownMenu` | Dropdown | Button "Export", right-click menu |
| `Dialog` | Dialog | Confirm rename, delete |
| `Button` | Button, hỗ trợ variant và loading | Các button thao tác |
| `Input` | Input | Edit title doc |

### 4.4 Custom style component

Ưu thế shadcn/ui là bạn có thể sửa thẳng source component. Ví dụ muốn border radius button lớn hơn:

```text
Giúp tôi sửa components/ui/button.tsx,
đổi border radius default mọi button từ rounded-md thành rounded-xl,
và thêm shadow tinh tế cho variant primary
```

AI sẽ sửa thẳng file component trong project bạn, không phải override style npm package — đây là lợi ích "sở hữu code" của shadcn/ui.

## 5. Thực chiến 3: dùng Ant Design build admin backend

**Scenario**: AI writing assistant online xong, cần 1 admin backend xem data user, quản nội dung doc, xử lý order trả phí. Core của hệ thống admin backend là hiển thị data và hiệu suất thao tác.

**Vì sao chọn Ant Design**: Ant Design tích luỹ sâu nhất trong lĩnh vực middle-back-office. Table, form, chart và các business component có sẵn out-of-the-box, built-in nhiều pattern interaction cấp doanh nghiệp (batch action, advanced filter, data export...).

### 5.1 Tạo project

```bash
# Dùng scaffold Ant Design Pro (built-in layout, routing, permission)
npx create-umi@latest ai-writer-admin
# Chọn template Ant Design Pro
cd ai-writer-admin
npm install
```

Hoặc từ 0:

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 Dùng AI IDE gen admin backend

```text
Giúp tôi làm admin backend AI writing assistant, dùng component library Ant Design:

**Layout tổng:**
- Bên trái là menu: dashboard, quản user, quản doc, quản order, system setting
- Top hiển thị breadcrumb

**Page quản user:**
- Top đặt 4 stat card: tổng user, mới hôm nay, active user, paying user
- Khu search filter: search theo username, chọn range time đăng ký, filter user status, kèm button "Search" và "Reset"
- Table user:
  - Hiển thị avatar, username, email, time đăng ký, subscription plan (phân biệt bằng tag color khác), status, action
  - Mỗi page hiển thị 20 dòng, hỗ trợ phân trang
  - Có thể batch select user, batch disable hoặc export
  - Cột action: xem chi tiết, edit, disable (disable phải confirm lần 2)
- Bấm "Xem chi tiết" từ phải trượt ra drawer, hiển thị info chi tiết user và list doc gần đây
```

### 5.3 Các component then chốt AI sẽ dùng

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| Component | Dùng làm gì | Vị trí trong backend |
| :--- | :--- | :--- |
| `ProLayout` | Framework layout backend | Khung page (menu + vùng content) |
| `ProTable` | Table cao cấp, built-in search, phân trang, column setting | List user, list doc, list order |
| `StatisticCard` | Stat card | Dashboard, top page overview |
| `Tag` / `Badge` | Status tag | Subscription plan, user status |
| `Drawer` | Side drawer | Chi tiết user, form edit |
| `Popconfirm` | Popconfirm | Delete, disable và các action nguy hiểm |

### 5.4 Iterate tiếp: add dashboard

```text
Giúp tôi làm 1 page dashboard:

1. Top 4 stat card: tổng user, tổng doc, lượt call API hôm nay, doanh thu tháng — mỗi card hiển thị value và biến động so với chu kỳ trước (tăng hay giảm)
2. Giữa đặt 2 chart:
   - Trái: line chart tăng trưởng user 7 ngày gần đây
   - Phải: pie chart phân bố subscription plan
3. Đáy: table log thao tác gần đây, hiển thị time, user, loại action, chi tiết

Dùng component Ant Design để layout, chart có thể dùng Ant Design Charts
```

> **Mẹo Vibe Coding cho admin backend**: cấu trúc page backend tương đối cố định (table + search + popup), rất hợp dùng AI batch gen. Bạn có thể để AI gen 1 page "quản user" làm template trước, rồi nói "tham khảo cấu trúc page quản user, giúp tôi gen page quản doc", AI sẽ tái dùng cùng pattern layout.

## 6. Học tra docs: "manual" của component library

Trong Vibe Coding AI sẽ viết phần lớn code cho bạn, nhưng khi kết quả AI gen sai hoặc bạn muốn fine-tune behavior 1 component, **tra docs** là cách giải nhanh nhất.

Ví dụ với Ant Design, địa chỉ docs: `https://ant.design/components/overview-cn`

Flow chuẩn tra docs:

1. **Rõ nhu cầu**: ví dụ "tôi cần table hỗ trợ select dòng"
2. **Search trong docs**: search "Table" vào page component Table
3. **Xem ví dụ**: mỗi component trong docs có nhiều ví dụ online, tìm ví dụ "Selectable"
4. **Copy code**: copy code ví dụ vào project bạn
5. **Xem bảng API**: ở đáy page tìm config đầy đủ của thuộc tính `rowSelection`

> Bạn cũng có thể gửi link docs thẳng cho AI IDE: "Tham khảo API `rowSelection` ở https://ant.design/components/table-cn, giúp tôi thêm function batch select cho table user". Cung cấp link docs cho AI, code gen ra sẽ chính xác hơn.

Địa chỉ docs các component library tra nhanh:

| Library | Địa chỉ docs |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. Tóm tắt

3 scenario thực chiến cover các nhu cầu dev frontend phổ biến nhất:

| Scenario | Library khuyến nghị | Đặc điểm core |
| :--- | :--- | :--- |
| Landing page / showcase page | HeroUI | Style default đẹp, animation mượt, visual impact mạnh |
| Page function product | shadcn/ui | Code hoàn toàn kiểm soát, custom sâu linh hoạt |
| Admin backend | Ant Design | Business component phong phú, table form out-of-the-box |

Workflow Vibe Coding tóm tắt:

1. Theo scenario chọn library phù hợp
2. Dùng AI IDE mô tả cấu trúc page và interaction bạn muốn
3. AI gen code bản đầu, bạn preview hiệu quả
4. Dùng ngôn ngữ tự nhiên tiếp tục iterate chỉnh
5. Gặp vấn đề chi tiết, tra docs library

### Bài tập

Chọn 1 trong các scenario sau, dùng AI IDE + component library hoàn thành từ 0:

1. Dùng HeroUI làm landing page showcase cho project trước của bạn (ví dụ chân dung Hogwarts)
2. Dùng shadcn/ui build giao diện chính 1 app note (sidebar + editor)
3. Dùng Ant Design build admin nội dung đơn giản (list bài + form bài mới)

---

## Phụ lục: tổng quan thêm component library

Ngoài 4 library core đã giới thiệu chính, trong hệ sinh thái frontend còn nhiều component library xuất sắc. Liệt kê theo framework để bạn chọn theo nhu cầu project.

### Hệ sinh thái Vue

| Library | Stars | Intro | Scenario phù hợp |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | Component library cấp doanh nghiệp Vue 3 của team Ele.me, dùng nhiều nhất TQ, ecosystem tiếng Trung cực tốt | Hệ admin backend |
| [Vuetify](https://vuetifyjs.com) | ~41k | Library Vue Material Design phổ biến nhất, 80+ component, docs đầy đủ | Project phong cách Google Design |
| [Ant Design Vue](https://antdv.com) | ~21k | Library Vue 3 dựa hệ thống design Ant, design spec thống nhất | Middle-back-office doanh nghiệp |
| [Naive UI](https://www.naiveui.com) | ~18k | Viết bằng TypeScript, độ custom theme cực mạnh, không phụ thuộc CSS preprocessor | Project yêu cầu design riêng |
| [Quasar](https://quasar.dev) | ~27k | 1 codebase build SPA, SSR, PWA, mobile và desktop | Project cross-platform |
| [Vant](https://vant-ui.github.io/vant) | ~24k | Library mobile nhẹ của team Youzan, cover nhu cầu TMĐT phổ biến | Page H5 mobile |
| [PrimeVue](https://primevue.org) | ~14k | 90+ component, hỗ trợ nhiều theme (Material, Bootstrap...) | Cần nhiều component và đa theme |
| [Arco Design Vue](https://arco.design/vue) | ~3k | Của ByteDance, chất lượng cao, built-in dark mode | Product middle-back-office |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | Của Tencent, ngôn ngữ design thống nhất, cover scenario desktop phổ biến | Hệ sinh thái Tencent hoặc project doanh nghiệp |

### Hệ sinh thái React

| Library | Stars | Intro | Scenario phù hợp |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Implement kỳ cựu cho chuẩn Google Material Design, component toàn diện nhất, ecosystem trưởng thành nhất | Build nhanh app cấp doanh nghiệp |
| [Ant Design](https://ant.design) | ~94k | Của Ant Group, built-in nhiều business component chất lượng, dẫn đầu community dev TQ | Middle-back-office doanh nghiệp |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | Copy code vào project thay vì cài npm, dựa Radix UI + Tailwind CSS, kiểm soát hoàn toàn | Project cần custom cao |
| [Chakra UI](https://chakra-ui.com) | ~39k | Lấy dev experience làm core, API gọn, built-in support accessibility | Dev prototype nhanh |
| [Mantine](https://mantine.dev) | ~28k | 100+ component và 50+ hooks, gồm date picker, rich text editor và component cao cấp | Cần giải pháp full-feature out-of-the-box |
| [Headless UI](https://headlessui.com) | ~27k | Library component no-style của Tailwind Labs, hỗ trợ cả React và Vue | Dùng kèm Tailwind CSS |
| [HeroUI](https://heroui.com) | ~24k | Dựa Tailwind CSS + React Aria, style default đẹp, animation mượt | Project theo đuổi chất lượng visual |
| [Radix UI](https://www.radix-ui.com) | ~17k | Library primitive no-style tầng đáy, focus accessibility và behavior component, là nền của shadcn/ui | Build design system riêng |

#### Hệ sinh thái mở rộng shadcn/ui

Ngoài các library thông dụng trên, hệ sinh thái shadcn/ui còn có nhiều library mở rộng dựa trên ý tưởng của nó, cung cấp lựa chọn khác biệt cho scenario đặc thù. Các library mở rộng này cũng dùng mode "copy code vào project", cho dev kiểm soát source hoàn toàn.

| Library | Intro | Scenario phù hợp |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200+ component cấp production, chủ đạo glowing card, gradient text, 3D earth | Landing page cao cấp, product SaaS |
| [Tailark UI](https://tailark.com) | Bộ block website marketing — product showcase, testimonial, CTA button | Landing page marketing, web product |
| [UI Tripled](https://ui.tripled.work) | Component interaction động dựa Framer Motion — popup, navigation, card animation | Tool sáng tạo, portfolio cá nhân |
| [Neobrutalism UI](https://neobrutalism.dev) | Phong cách neo-brutalism, đường thô, contrast cao, color rực | Web brand cá tính, project sáng tạo |
| [REUI](https://reui.io) | 967+ pattern ghép component cho business scenario thật | Backend doanh nghiệp, form phức tạp |
| [Cult UI](https://cult-ui.com) | Mài giũa interaction/visual tinh hơn, data table, filter panel và component phức hợp | Project thương mại chất lượng cao |
| [Kibo UI](https://kibo-ui.com) | Business component cao cấp — color picker, rich text editor, file upload | Admin backend, product tool |
| [Kokonut UI](https://kokonutui.com) | 100+ component + 7+ template, phong cách thanh mảnh đơn giản | Web SaaS, blog, TMĐT |
| [Commerce UI](https://ui.stackzero.co) | Chuyên scenario TMĐT — product card, cart, checkout form | Platform TMĐT |
| [shadcnblocks](https://shadcnblocks.com) | 1373 UI block + 13 template, tài nguyên đầy đủ nhất | Mọi scenario |
| [Shoogle](https://shoogle.dev) | Platform search tổng hợp hệ sinh thái shadcn/ui | Tìm tài nguyên nhanh |
| [Discover All Shadcn](https://allshadcn.com) | Navigation tài nguyên dạng tổng hợp | Tìm tài nguyên nhanh |

> **Vì sao chọn shadcn/ui extension?** Các extension này kế thừa ý tưởng "code ownership" của shadcn/ui, đồng thời custom sâu cho scenario đặc thù. Thời đại Vibe Coding, chúng giúp bạn nhanh tìm được component khớp nhu cầu design, thoát khỏi sự đồng nhất của UI library mainstream, làm ra product khác biệt hơn.
