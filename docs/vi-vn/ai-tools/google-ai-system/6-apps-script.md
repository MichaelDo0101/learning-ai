---
title: 'Tự động hóa — Apps Script: biến thao tác lặp lại thành quy trình tự động'
description: 'Apps Script trong hệ sinh thái Google AI: workflow 6 lớp, trigger/custom menu/properties/quota, 5 kịch bản tự động hóa phổ biến, kết nối Gemini API an toàn và bài thực hành AI thư ký.'
---

# Tự động hóa — Apps Script

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">⚙️</p>

::: tip 🔥 Thực chiến — 30 giây
"Nếu bạn phải copy-paste cùng một thao tác hơn 3 lần trong tuần, đó là dấu hiệu của công việc cần tự động hóa." Phần lớn thời gian văn phòng không mất ở một tác vụ lớn, mà ở **hàng trăm thao tác nhỏ**: kiểm tra form, copy dữ liệu giữa sheet, email xác nhận, gửi nhắc hạn, báo cáo định kỳ. Apps Script là "lớp keo" giúp Gmail, Docs, Sheets, Forms, Drive, Calendar phối hợp thành quy trình chạy lặp lại.
**💸 Lợi ích thực tế:** bạn không cần thành developer — chỉ cần **mô tả rõ quy trình**, và Gemini có thể giúp viết code.
:::

> **"Tự động hóa một quy trình rối sẽ tạo ra một quy trình rối chạy nhanh hơn."**
> Chuẩn hóa thủ công trước — tự động hóa sau.

::: info 📍 Vị trí trong Google AI System
Hạng mục **Tự động hóa** — điểm vào nhẹ nhất của tầng Development. Xem [bản đồ tổng quan](./)
:::

## 01 · Apps Script là gì, ai nên dùng?

Apps Script là nền tảng scripting của Google: chạy trên đám mây, dùng **JavaScript**, viết code trên trình duyệt, script lưu vào Drive và chạy trên máy chủ Google. Hãy hình dung: Form thu thập dữ liệu, Sheets lưu, Docs tạo tài liệu, Gmail gửi thông báo, Drive lưu hồ sơ — **Apps Script là người điều phối**.

Cách hiểu đúng: Apps Script **không thay thế ERP/CRM/BPM chuyên nghiệp**. Nó phù hợp nhất với quy trình đang sống trong Google Workspace, quy mô vừa phải, cần triển khai nhanh.

| Nhóm | Cần gì |
|---|---|
| Nhân sự vận hành | Không cần tự viết code — cần **mô tả quy trình đủ rõ** để AI/IT chuyển thành script |
| Chuyên viên dữ liệu, L&D, Sales Ops, Admin, Finance | Nắm vài mẫu cơ bản đã giảm đáng kể thao tác thủ công |
| IT nội bộ, chuyển đổi số | Kết nối Gemini API, tạo web app đơn giản, quản lý quyền, quota |

## 02 · Tư duy tự động hóa — workflow 6 lớp

Một quy trình tốt không bắt đầu bằng "viết code gì?", mà bằng *"việc nào đang lặp lại, có dữ liệu rõ và quy tắc xử lý ổn định?"*

1. **Trigger** — khi nào script chạy? (Form submit, edit Sheet, theo lịch)
2. **Dữ liệu** — script đọc gì? Trường nào bắt buộc?
3. **Kiểm tra** — dữ liệu đúng định dạng, trùng, thiếu không?
4. **Xử lý** — tạo email, tạo Docs, phân loại, tóm tắt
5. **Đầu ra** — email, Docs, Sheets, Drive folder, thông báo
6. **Giám sát** — trạng thái, lỗi, thời gian chạy, người phụ trách

> Không nên tự động hóa 100% ngay từ đầu. Tự động phần **tạo nháp, phân loại, kiểm tra, nhắc việc** trước — mở rộng khi quy trình đã ổn định.

## 03 · Thành phần cốt lõi

- **Trigger:** simple trigger (`onOpen`, `onEdit`) cho thao tác cơ bản; installable trigger cho form submit hoặc chạy theo lịch.
- **Custom menu:** biến script thành chức năng thân thiện — nhân sự vào Sheets, bấm menu "AI Thư ký" → "Tạo biên bản" thay vì mở code editor.
- **Script Properties:** nơi lưu cấu hình nhạy cảm (API key, ID thư mục). **Không hard-code API key vào mã chia sẻ.**
- **Quota:** email, UrlFetchApp, thời gian chạy đều có giới hạn. Script chạy tốt với 10 dòng chưa chắc ổn với 10.000 dòng — luôn kiểm tra quota trước khi triển khai lớn.

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu('AI Thư ký')
    .addItem('Tạo biên bản từ dòng đang chọn', 'createMinutes')
    .addItem('Gửi email giao việc', 'sendActionEmails')
    .addSeparator()
    .addItem('Kiểm tra dữ liệu thiếu', 'validateFields')
    .addToUi()
}
```

## 04 · Năm kịch bản tự động hóa phổ biến nhất

1. **Email xác nhận tự động** — Form nhận đăng ký → script đọc dữ liệu → email cá nhân hóa → cập nhật trạng thái "Đã gửi"
2. **Báo cáo tự động** — mỗi thứ Hai, tổng hợp từ Sheets → email recap → lưu log
3. **Nhắc deadline** — quét Sheets, so deadline với ngày hiện tại → nhắc người phụ trách trước 2 ngày
4. **Tạo tài liệu từ mẫu** — tạo bản sao từ template Docs, thay placeholder `{{HO_TEN}}`, `{{PHONG_BAN}}` bằng dữ liệu Sheets
5. **Dashboard tự cập nhật** — dữ liệu nạp vào Sheets → script tạo biểu đồ → cập nhật slide báo cáo

Ví dụ kịch bản 1 (lưu ý cột trạng thái chống gửi trùng):

```javascript
function sendTrainingConfirmations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DangKy')
  const data = sheet.getDataRange().getValues()
  const header = data[0]
  const emailCol = header.indexOf('Email')
  const nameCol = header.indexOf('HoTen')
  const statusCol = header.indexOf('TrangThai')

  for (let i = 1; i < data.length; i++) {
    if (!data[i][emailCol] || data[i][statusCol] === 'Đã gửi') continue
    try {
      MailApp.sendEmail(
        data[i][emailCol],
        'Xác nhận đăng ký khóa học',
        'Kính gửi ' + data[i][nameCol] + ',\n\nPhòng L&D xác nhận đăng ký.\nTrân trọng.'
      )
      sheet.getRange(i + 1, statusCol + 1).setValue('Đã gửi')
    } catch (e) {
      sheet.getRange(i + 1, statusCol + 1).setValue('Lỗi: ' + e)
    }
  }
}
```

## 05 · Kết nối Apps Script với Gemini API

Apps Script gọi API ngoài bằng `UrlFetchApp` — API key lưu trong **Script Properties**:

```javascript
function callGemini(prompt) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY')
  const model = 'gemini-2.5-flash'
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    model + ':generateContent?key=' + apiKey

  const payload = { contents: [{ parts: [{ text: prompt }] }] }

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  })

  const result = JSON.parse(response.getContentText())
  return result.candidates?.[0]?.content?.parts?.[0]?.text || ''
}
```

**Ứng dụng:** tóm tắt nội dung họp, phân loại yêu cầu, viết nháp email, trích xuất JSON (`summary, decisions, action_items, risks`) → Apps Script parse và ghi vào Sheet.

**Cách viết an toàn:** không yêu cầu AI tự quyết nghiệp vụ quan trọng. Email gửi khách, báo cáo tài chính, nội dung pháp lý → AI tạo **bản nháp**, giữ bước duyệt của con người. Khi bài toán cần quản trị truy cập, audit trail, production → chuyển sang [Vertex AI](./8-vertex-ai).

## 06 · Rủi ro và kiểm soát

| Rủi ro | Giải pháp |
|---|---|
| Script chạy sai dữ liệu (đổi tên/thêm cột) | Tìm cột **theo tên header** thay vì số thứ tự cứng; kiểm tra trường bắt buộc |
| Gửi email nhầm/trùng | Cột trạng thái: "Chưa gửi / Đã gửi / Lỗi / Cần duyệt"; email quan trọng → gửi thử cho quản trị viên trước |
| Lộ API key | Lưu trong Script Properties, không đặt trong mã chia sẻ công khai |
| AI tạo nội dung sai | Prompt yêu cầu chỉ dựa trên đầu vào, đánh dấu thông tin chưa rõ; lưu nội dung gốc để đối chiếu |
| Vượt quota | Kiểm tra quota trước, chạy thử tập nhỏ, ghi log |

> **Nguyên tắc triển khai an toàn:** pilot 1 phòng ban, 1 quy trình, 1 nhóm người dùng. Sau 2–4 tuần đo lỗi thực tế mới mở rộng.

## 07 · Bài thực hành: xây "AI thư ký" trong Google Workspace

Kịch bản: sau mỗi cuộc họp, người phụ trách nhập nội dung vào Form → Form đẩy vào Sheet → Apps Script gọi Gemini API tóm tắt → tạo Docs biên bản từ template → lưu Drive → gửi email → cập nhật trạng thái.

1. Tạo Google Form: tên cuộc họp, ngày, chủ trì, ghi chú thô, quyết định, email người nhận
2. Chuẩn hóa Sheet: thêm cột `MaHoSo, TrangThaiXuLy, LinkBienBan, LogLoi, ThoiGianXuLy`
3. Tạo Docs template với placeholder `{{TIEU_DE}}, {{NGAY_HOP}}, {{SUMMARY}}, {{DECISIONS}}, {{ACTION_ITEMS}}`
4. Tạo trigger form submit
5. Gọi Gemini API: yêu cầu trả JSON → parse, ghi Sheet
6. Tạo Docs, lưu Drive, gửi email — **nêu rõ đây là bản nháp do AI hỗ trợ**, người phụ trách duyệt
7. Ghi log, đo hiệu quả sau 2–4 tuần: thời gian xử lý, tỷ lệ lỗi, tỷ lệ phải chỉnh sửa

## 📝 Prompt mẫu

```text
Với vai trò chuyên gia tự động hóa Workspace, hãy phân tích quy trình sau.
Xác định trigger, dữ liệu đầu vào, điều kiện kiểm tra, thao tác xử lý, đầu ra,
log, rủi ro, điểm cần con người duyệt. Không viết code trước khi hoàn tất
phân tích. Quy trình: [mô tả].
```

```text
Review đoạn Apps Script sau theo 7 tiêu chí: quyền truy cập, bảo mật API key,
chống gửi trùng, xử lý lỗi, quota, log, khả năng bảo trì. Chỉ ra lỗi và viết lại
phiên bản an toàn hơn. Code: [dán code].
```

## ✅ Checklist cuối chương

- ☐ Tôi hiểu Apps Script là gì và giải quyết bài toán gì
- ☐ Tôi biết thiết kế workflow 6 lớp: trigger → dữ liệu → kiểm tra → xử lý → đầu ra → giám sát
- ☐ Tôi biết ít nhất 3 kịch bản tự động hóa phù hợp với công việc
- ☐ Tôi biết dùng Gemini viết Apps Script mà không cần biết JavaScript sâu
- ☐ Tôi biết kết nối Gemini API từ Apps Script an toàn
- ☐ Tôi biết chạy thử với dữ liệu nhỏ, ghi log, rồi mới mở rộng

## 🔗 Tài liệu tham khảo

- [Apps Script Overview](https://developers.google.com/apps-script/overview) · [Triggers](https://developers.google.com/apps-script/guides/triggers) · [Custom Menus](https://developers.google.com/apps-script/guides/menus)
- [UrlFetchApp](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app) · [Quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [Gemini API Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)

**Tiếp theo:** [Xây ứng dụng — Firebase & Google Cloud →](./7-firebase-cloud)
