# Tham khảo UI Guidelines để thiết kế trang và button

Nhiều người nói "Tôi muốn page giống Apple hơn", "Button muốn cao cấp hơn", nhưng khi thật sự bắt tay làm, thường kẹt ở một vấn đề:

**Rốt cuộc nên tham khảo cái gì?**

Nhìn screenshot bắt chước, học được chỉ là "giống hay không". Nhưng mở các design guideline của Apple, Google, Microsoft, Atlassian, bạn sẽ thấy chỗ thực sự đỉnh của chúng không phải phong cách visual, mà là **nói rõ vấn đề design**: page làm nổi gì trước, button phân cấp ra sao, thao tác nhấn mạnh thế nào — các tiêu chuẩn phán đoán này mới là core.

> Tham khảo design guideline không phải để "giống ai", mà học cách người khác ra phán đoán.

:::: info Vì sao bây giờ vẫn phải học các thứ này
Design rules đã được train vào model, được công cụ design hấp thụ mặc định, thậm chí dán vài screenshot AI cũng học được. Nhưng vẫn cần biết các rules này đến từ đâu, vì sao được định vậy.
::::

## Đọc vài đoạn nguyên văn để cảm nhận khác biệt

Nếu trước đây bạn nghĩ "design guideline chẳng phải bàn phong cách thôi sao", đọc vài câu nguyên văn chính thức trước.

Thường trong team ta hay nói thế này:

- Làm 1 cái dropdown
- Đặt 1 cái menu ở đây
- Menu bar thêm vài function
- Đặt 2 button ở đây, 1 confirm 1 cancel

Nghe có vẻ không sao, nhưng trong guideline big tech, các từ này không phải khái niệm mơ hồ, mà được tách rất chi tiết.

| Lời nói thường | Nguyên văn chính thức | Nói đơn giản |
| :--- | :--- | :--- |
| "Làm cái menu" | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` để làm action |
| "Menu bar đặt function" | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | Là menu command top của app |
| "Làm cái dropdown" | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` là chọn 1 từ list |
| "Cũng làm cái dropdown" | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` là mở ra làm action trong context hiện tại |
| "Menu cũng dùng để lọc được chứ" | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` không phải để chọn value |
| "Menu cũng làm navigation được" | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu` không phải main navigation |
| "Button viết bừa OK / Cancel" | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | Text button không viết bừa được |

> Các quote trong bảng đều click được, nhảy thẳng tới trang chính thức tương ứng.

Đây là chỗ dễ bị shock nhất khi lần đầu thật sự đọc design guideline:

> Ta nghĩ mình đang bàn UI, thực ra nhiều khi chỉ đang dùng một mớ từ mơ hồ giao tiếp.

Apple không chỉ nói "làm cái menu"; nó tiếp tục phân biệt:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent không chỉ nói "dropdown"; nó tiếp tục phân biệt:

- `menu`
- `dropdown`
- `select`
- `combobox`

Đây là tính cần thiết của design guideline.

Không phải để page trông pro hơn, mà để team khi bàn UI, mỗi người không còn nghĩ thứ khác nhau trong đầu.

## Bạn sẽ học được

1. Vì sao khi design page và button phải đọc design guideline trước
2. Trong Apple, Material, Fluent, Atlassian — nội dung nào đáng tham khảo nhất
3. Cách design rõ "hierarchy page" và "hierarchy button"
4. Cách để AI tham khảo guideline người khác để gen page và button

## 1. Vì sao design guideline giúp bạn làm page rõ ràng

Đọc xong các nguyên văn trên, bạn thấy 1 điểm then chốt:

**Design guideline không phải làm đẹp thêm, mà là nói chuẩn từ trước.**

Nhiều page không đẹp, không phải vì color chưa sang, mà vì hierarchy thông tin loạn.

Nhiều button khó dùng, cũng không phải vì border radius sai, mà vì:

- Quá nhiều primary button, user không biết bấm cái nào
- Button nguy hiểm và button thường trông gần giống nhau
- Mọi button trong page đều tranh attention
- Style và semantic button ở các page khác nhau không nhất quán

Design guideline trưởng thành chính là giải quyết các vấn đề này. Chúng thường định nghĩa:

| Nội dung guideline | Giải vấn đề gì |
| :--- | :--- |
| **Hierarchy page** | Xem chỗ nào trước, chỗ nào sau, thông tin tổ chức ra sao |
| **Nền tảng visual** | Color, spacing, font, border radius, shadow thống nhất ra sao |
| **Hierarchy button** | Primary, secondary, text button, destructive button phân biệt ra sao |
| **Quy tắc state** | hover, focus, disabled, loading thể hiện thế nào |
| **Semantic interaction** | Button nào là "confirm", nào là "cancel", nào là "more action" |

Vậy, design guideline thực sự cung cấp không phải 1 bộ "skin", mà 1 bộ **tiêu chuẩn phán đoán**.

## 2. Khi tham khảo guideline big tech, trọng tâm xem gì

### 2.1 Tham khảo Apple: học "định nghĩa đủ chi tiết"

Apple đáng học nhất không chỉ cảm giác kiềm chế về visual, mà là nó định nghĩa khái niệm cực chi tiết.

Cùng là "menu" hay "dropdown" trong nhiều team, Apple tiếp tục tách xuống:

- `menu`: 1 nhóm command, option hoặc state
- `menu bar menu`: bộ command cấp app
- `pop-up button`: chọn 1 value
- `pull-down button`: trigger command trong context hiện tại
- `context menu`: action thường dùng liên quan object hoặc task hiện tại

Tách này rất quan trọng, vì ảnh hưởng trực tiếp:

- Component này để chọn value hay làm action
- Thuộc page local hay cấp app
- Nên hiển thị dài hạn value chọn hiện tại, hay chỉ tạm mở ra command

Khi bạn bắt đầu nghĩ ở mức granular này, page bạn design ra sẽ rõ ràng hơn nhiều.

### 2.2 Tham khảo Apple: học hierarchy page và sự kiềm chế

Apple Human Interface Guidelines đặc biệt hợp học 2 việc:

- Page xây hierarchy rõ ra sao
- Control giữ rõ ràng mà không lấn át

Apple nhấn `Hierarchy`, `Harmony`, `Consistency`. Nghĩa là khi design page phải trả lời:

- Info quan trọng nhất page hiện tại là gì
- Task chính của user là gì
- Action nào nên nổi nhất, action nào nên lùi lại

Nếu tham khảo Apple design page, có thể trọng tâm mượn:

- Info first screen đừng quá vụn, content core focus trước
- Dùng whitespace, font size, group xây trật tự, không phải dựa chất nhiều border
- Button đừng tất cả nhấn mạnh cao, chỉ action then chốt mới nên nổi nhất

### 2.3 Tham khảo Material: học cấu trúc page rõ

Material Design hợp học "page tổ chức task flow ra sao".

Nhiều component và layout spec của nó, core đều giúp bạn rõ:

- Page là browse-type hay execute task-type
- Page hiện tại để user đọc, chọn, hay submit
- Element nào trong page nên ổn định lặp lại, element nào nên phản hồi thay đổi context

Nếu tham khảo Material design page, trọng tâm mượn:

- Block page rõ, trách nhiệm module rõ
- Navigation, content area, action area phân công rõ
- Style button khác tương ứng action priority khác

### 2.4 Tham khảo Fluent: học boundary component và hierarchy button

Fluent 2 rất hợp product backend, tool và hệ form phức tạp. Chỗ đáng học nhất là nói thẳng "đừng trộn khái niệm".

Ví dụ nó viết rõ: nếu muốn "collect information", đừng tiếp tục dùng `menu`, mà nên cân nhắc `select`, `dropdown`, `combobox`.

Câu này rất quan trọng, vì đập tan ý "đều gần giống nhau" trong đầu nhiều người.

Fluent 2 cũng coi trọng:

- Hierarchy thao tác
- Boundary semantic component
- Rõ trong scenario info dày đặc

Nếu tham khảo Fluent design button, trọng tâm mượn:

- `Primary button` nhận action quan trọng nhất hiện tại
- `Secondary button` nhận action hỗ trợ
- `Subtle`, `Transparent` — button nhấn yếu — cho action không nên tranh main flow
- Càng nhiều button trong page, càng phải kiểm soát visual priority

### 2.5 Tham khảo Atlassian: học quản page và button có hệ thống

Atlassian Design System đặc biệt hợp "1 team làm nhiều page". Nó nhấn:

- foundations là nền chung
- tokens là cách thống nhất quyết định visual
- components là interaction unit tái dùng lặp lại

Nếu tham khảo Atlassian làm page và button, giá trị nhất là:

- Làm rules thống nhất cho size, color, border radius, spacing button
- Cố định rhythm layout page
- Các page khác nhau dù content khác, ngôn ngữ cấu trúc nhất quán

## 3. Khi design page, nên tham khảo điểm nào trong guideline

Khi xem 1 design system, đừng hỏi trước "page này đẹp không", mà hỏi vài câu sau trước.

### 3.1 Page first impression, primary-secondary có rõ không

1 page thường ít nhất 3 layer:

- **Info chính**: content quan trọng nhất page hiện tại
- **Info phụ trợ**: content giúp hiểu hoặc bổ sung
- **Action phụ**: action không nên phá task chính

Nếu 3 layer không kéo ra, page sẽ "đều quan trọng", bằng "đều không quan trọng".

### 3.2 Layout page, có phục vụ task hay chất module

Khi tham khảo guideline, có thể chú ý đặc biệt:

- Khu title có rõ mục tiêu page không
- Khu main content có tổ chức xoay quanh task không
- Action button có gần content liên quan không
- Info phụ có được làm yếu không

### 3.3 Action trong page, có ưu tiên không

Nhiều page nhìn 1 cái có 6 button, kết quả mỗi button đều như CTA — đây là hierarchy mất kiểm soát điển hình.

Cách hợp lý hơn:

- 1 area thường chỉ có 1 primary action
- Secondary action có thể dùng outline, text button hoặc style yếu hơn
- Risk action đừng trông giống primary action

## 4. Khi design button, nên tham khảo điểm nào trong guideline

Button là phần dễ "design tuỳ tiện" nhất, nhưng cũng là phần lộ rõ nhất hệ thống có trưởng thành không.

### 4.1 Button phân "semantic" trước, rồi mới "style"

Đừng nghĩ trước "button xanh hay đen", nghĩ trước button này role gì.

Các role button thường:

| Loại button | Vai trò | Chiến lược style thường |
| :--- | :--- | :--- |
| **Primary** | Action then chốt nhất area hiện tại | Đặc, contrast cao, nổi nhất |
| **Secondary** | Action hỗ trợ | Outline hoặc nhấn yếu 1 cấp |
| **Tertiary / Text** | Action yếu | Text hoặc visual yếu |
| **Destructive** | Action rủi ro (xoá, dừng, clear) | Color cảnh báo hoặc style risk rõ |
| **Icon button** | Tool action local | Gọn, gần context |

### 4.2 1 page đừng quá nhiều Primary Button

Đây là hố newbie hay đạp nhất.

Nếu page có 4 primary button, là bằng không có primary button. Ý nghĩa primary button vốn là "nói cho user giờ nên làm gì nhất".

Có thể mượn cách làm chung của nhiều design system:

- 1 area chính thường chỉ giữ 1 primary button
- Cancel, back, close thường không tranh cùng cấp với confirm
- More action đặt vào secondary button hoặc menu

### 4.3 Button phải biểu đạt state change

Design guideline thường viết rõ state button:

- Default
- Hover
- Focus
- Disabled
- Loading
- Danger

Quan trọng vì button không phải ảnh tĩnh, mà là control được trigger nhiều nhất trong quá trình user thao tác.

### 4.4 Text button cũng là 1 phần design

Text button không chỉ là "vấn đề copy", nó ảnh hưởng trực tiếp hiểu của user.

Ví dụ:

- `Save`
- `Save changes`
- `Publish now`
- `Delete project`
- `Move to trash`

Các copy này truyền tâm lý kỳ vọng khác nhau hoàn toàn. Guideline trưởng thành thường yêu cầu label button rõ ràng biểu đạt action, không dùng từ mơ hồ.

## 5. 1 checklist page và button rất thực dụng

Khi tự design page, lướt qua checklist này:

### Checklist page

- Title page có nói rõ task hiện tại không
- Info quan trọng nhất first screen có nhìn thấy ngay không
- Page có tổ chức theo task flow chưa, hay nghĩ gì đặt nấy
- Trong cùng area có chỉ 1 primary action không
- Content phụ có được làm yếu phù hợp không

### Checklist button

- Button này là primary action hay secondary
- Vì sao xứng đáng nổi hơn các button khác
- Trong page có quá nhiều primary button không
- Action rủi ro có được đánh dấu rõ không
- Text button có đủ cụ thể không

## 6. Cách dùng AI tham khảo guideline người khác để design page

Section này thực dụng nhất.

Nhiều người để AI design page chỉ nói:

```md
Giúp tôi làm page setting, sang chút, tham khảo phong cách Apple
```

Loại prompt này quá mơ hồ, AI cuối cùng chỉ bắt chước "nền trắng, border radius, shadow".

Với newbie, cách thực dụng hơn không phải tự tổng kết 1 đoạn dài, mà dán thẳng **câu key trong nguyên văn guideline** cho AI.

Cách này có 2 lợi:

- Bạn không cần tự "dịch" lại tư tưởng design
- AI dễ hiểu page và button theo định nghĩa chính thức

### 6.1 Ví dụ 1: để AI tham khảo Apple design page setting

Tìm 1 câu nguyên văn Apple trước:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Bạn có thể dán thẳng cho AI:

```md
Tham khảo câu này trong Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Giúp tôi design page setting bảo mật tài khoản.
Yêu cầu hierarchy page rõ, info quan trọng đặt trước, group gọn 1 chút.
```

Trọng tâm là: không cần tự giải thích quá nhiều, dán thẳng nguyên văn Apple vào.

### 6.2 Ví dụ 2: để AI tham khảo Fluent design button page backend

Tìm 1 câu nguyên văn Fluent trước:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Bạn có thể dán thẳng cho AI:

```md
Tham khảo câu này trong Fluent 2:
"Only use one primary button in a layout..."

Giúp tôi design button cho backend quản lý team.
Button add member nổi nhất, export, filter, more action yếu hơn, delete button highlight riêng.
```

Câu này rất hợp newbie vì nói thẳng cho AI: 1 area đừng đặt quá nhiều primary button.

### 6.3 Ví dụ 3: để AI cùng lúc tham khảo guideline page và button

Cũng có thể dán 1 lúc 2 câu nguyên văn, để AI tham khảo cả page và button:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Rồi viết thẳng:

```md
Tham khảo 2 câu nguyên văn design guideline sau:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Giúp tôi design page chi tiết project.
Page gồm intro project, member, hoạt động gần đây và entry setting.
Hierarchy page rõ chút, primary button chỉ giữ 1, button khác yếu hơn.
```

Cách này đặc biệt hợp newbie vì bạn chỉ cần biết copy nguyên văn, thêm vài câu nhu cầu của mình là đủ.

## 7. Cách dùng AI tham khảo button guideline để gen design button trực tiếp

Nếu bạn chỉ muốn làm button trước, cũng có thể dán thẳng button guideline nguyên văn.

Ví dụ Atlassian định nghĩa button rất ngắn:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Bạn có thể hỏi AI thế này:

```md
Tham khảo câu này của Atlassian:
"A button triggers an event or action."

Giúp tôi design 1 bộ style button cho page backend.
Tôi muốn có primary button, secondary button, delete button — tiện nói cho tôi dùng ở đâu.
```

Loại prompt này đặc biệt hợp newbie, cơ bản là "dán nguyên văn + nói nhu cầu".

## 8. Tóm tắt

Tham khảo UI design guideline để design page và button, quan trọng nhất không phải "làm giống ai", mà học vài việc sau:

1. Dùng hierarchy tổ chức page, không phải chất content lên
2. Dùng phân cấp button biểu đạt action priority, không phải để mọi button đều tranh attention
3. Dùng định nghĩa, boundary và tiêu chuẩn phán đoán trong design guideline để hướng dẫn design
4. Để AI tham khảo guideline người khác, tham khảo "nguyên tắc và cấu trúc", không chỉ tham khảo skin

Khi bạn dùng guideline thế này, cái bạn tham khảo không chỉ là 1 phong cách, mà 1 bộ tư duy design trưởng thành.

---

## Tài liệu tham khảo

Các link sau đều từ design system chính thức hoặc tài liệu chính thức:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
