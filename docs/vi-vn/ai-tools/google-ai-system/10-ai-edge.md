---
title: 'AI trên thiết bị — AI Edge Gallery: nhanh hơn, riêng tư hơn, ít phụ thuộc cloud'
description: 'On-device AI và AI Edge Gallery trong hệ sinh thái Google AI: khi nào dùng AI trên điện thoại thay vì cloud, quy trình tóm tắt cuộc họp bảo mật từ file ghi âm, checklist bảo mật và quản trị dữ liệu.'
---

# AI trên thiết bị — AI Edge Gallery

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">📱</p>

::: tip 🔥 Thực chiến — 30 giây
Mọi hạng mục trước đều có chung một tiền đề: dữ liệu gửi lên đám mây, model xử lý, kết quả trả về. Nhưng có những thứ **không thể** đẩy lên AI công cộng: ghi âm cuộc họp chứa số liệu kinh doanh, phỏng vấn nhân sự, ghi chú kiểm toán. Và có những nơi **không có mạng ổn định**: nhà máy, công trường, kho, trạm kỹ thuật. On-device AI mở ra tầng ứng dụng mới: model chạy ngay trên điện thoại — xử lý nhanh, cục bộ, riêng tư hơn, ít phụ thuộc kết nối.
**💸 Lợi ích thực tế:** tóm tắt biên bản họp nhạy cảm mà audio thô **không rời khỏi thiết bị**; tra cứu SOP khi mạng yếu; ghi chú giọng nói tại hiện trường.
:::

> **Cloud AI giống gọi chuyên gia ở tổng đài trung tâm** — rất giỏi, xử lý được việc khó, nhưng cần đường truyền.
> **On-device AI giống có trợ lý nhỏ ngồi ngay trong điện thoại** — không giỏi bằng ở mọi việc, nhưng phản hồi nhanh, làm được khi mất mạng, hợp với việc riêng tư.

::: info 📍 Vị trí trong Google AI System
Hạng mục **AI trên thiết bị** — lớp xử lý đầu vào và lớp riêng tư của hệ sinh thái. Xem [bản đồ tổng quan](./)
:::

## 01 · On-device AI là gì?

On-device AI là cách chạy model AI **trực tiếp trên thiết bị đầu cuối** — điện thoại, tablet, laptop, IoT. Thay vì gửi dữ liệu lên máy chủ, thiết bị tự suy luận bằng CPU/GPU/NPU.

Hệ công nghệ **Google AI Edge** gồm nhiều lớp: MediaPipe (tác vụ AI phổ biến), LiteRT (runtime hiệu năng cao), Model Explorer (tối ưu model), và Gemini Nano trên Android/Chrome. Với người không chuyên kỹ thuật, **AI Edge Gallery** là cửa vào dễ nhất: cài app, tải model, thử ngay.

> ⚠️ **Tránh hiểu lầm:** chạy trên thiết bị **không có nghĩa mạnh hơn cloud**. Do giới hạn phần cứng/RAM/pin, model on-device thường nhỏ hơn, ngữ cảnh ngắn hơn. Cách đúng: thiết kế **mô hình lai** — việc nhạy cảm, ngắn, cần offline → trên thiết bị; nghiên cứu sâu, dữ liệu lớn, tích hợp hệ thống → cloud có kiểm soát.

## 02 · AI Edge Gallery — là gì và không phải là gì

Ứng dụng của Google để trưng bày, thử nghiệm và đánh giá các use case GenAI/ML chạy **cục bộ** trên thiết bị. Bốn nhóm tính năng:

| Tính năng | Dùng để |
|---|---|
| **Ask Image** | Đưa ảnh vào và hỏi: ảnh thiết bị, bảng thông báo, hiện trường, giấy tờ không nhạy cảm |
| **Audio Scribe** | Chuyển ghi âm/audio thành văn bản — transcript để tóm tắt |
| **Prompt Lab** | Tác vụ một lượt: tóm tắt, viết lại, tạo code, thử prompt |
| **AI Chat** | Hội thoại nhiều lượt với model cục bộ |

Cài đặt: [CH Play](https://play.google.com/store/apps/details?id=com.google.ai.edge.gallery) · [App Store](https://apps.apple.com/us/app/google-ai-edge-gallery/id6749645337)

**Nó KHÔNG phải là gì:**

1. Không phải mọi điện thoại đều chạy mọi model nhanh — trải nghiệm phụ thuộc thiết bị, RAM, chip, model đã tải.
2. **Offline không đồng nghĩa tuyệt đối không có dữ liệu nào được thu thập** — app vẫn có thể thu thập app activity/performance. Với dữ liệu nhạy cảm, vẫn phải tuân thủ chính sách bảo mật nội bộ.
3. Phù hợp **thử nghiệm và huấn luyện tư duy** — triển khai cho hàng trăm nhân viên cần app riêng, MDM, quản lý model, log và quy trình xóa dữ liệu.

## 03 · Khi nào dùng AI trên điện thoại thay vì cloud?

Ba câu hỏi: dữ liệu nhạy cảm đến mức nào? Tác vụ cần model mạnh đến đâu? Người dùng có mạng ổn định không?

| Tình huống | Ưu tiên |
|---|---|
| Ghi âm nội bộ nhạy cảm, chưa có chính sách cloud AI | **On-device** |
| Phân tích dữ liệu lớn, tích hợp hệ thống, dashboard | Cloud |
| Nhân viên hiện trường vùng mạng yếu | **On-device** |
| Nghiên cứu sâu, brainstorm, dịch tài liệu dài | Cloud |
| Ghi chú giọng nói nhanh sau ca sản xuất | **On-device** |
| Tạo báo cáo phân tích với Gemini + Sheets | Cloud |

**Cách dùng thực tế:** on-device AI là **lớp xử lý đầu vào và lớp riêng tư**. Sau khi dữ liệu được tóm tắt, ẩn danh hoặc duyệt — chuyển *bản đã làm sạch* sang cloud để phân tích sâu, tích hợp workflow.

## 04 · Quy trình thực chiến: tóm tắt cuộc họp bảo mật từ file ghi âm

Tình huống: có file ghi âm cuộc họp trên điện thoại, muốn tóm tắt + trích action items, nhưng **không muốn đưa audio thô lên cloud**.

1. **Ghi âm hợp lệ** — có sự đồng ý của các bên. Đặt tên file ngay: `YYYY-MM-DD_Hop_[ChuDe]_[DonVi]_v01.m4a`
2. **Lưu file cục bộ** — tắt tự động đồng bộ lên dịch vụ không được phê duyệt; điện thoại phải có sinh trắc học + mã hóa thiết bị
3. **Mở Audio Scribe** — nạp file → chuyển giọng nói thành văn bản. Họp tiếng Việt: kiểm tra chất lượng (phụ thuộc âm thanh, giọng vùng miền, tiếng ồn)
4. **Tóm tắt từ transcript** — dùng tóm tắt trực tiếp hoặc copy transcript sang Prompt Lab/AI Chat
5. **Kiểm duyệt con người** — nghe lại các đoạn quan trọng, soát tên người, số tiền, deadline, quyết định. AI có thể nhầm tên, gộp sai ý
6. **Xuất bản an toàn** — chỉ gửi **bản tóm tắt đã kiểm duyệt**. Xóa file tạm — kiểm tra cả thư mục tải xuống, thùng rác, backup

> **Nguyên tắc:** dữ liệu thô nhạy cảm xử lý bước đầu **ngay trên điện thoại**. Bản đưa ra khỏi thiết bị phải là bản tóm tắt đã kiểm duyệt — không phải audio hoặc transcript thô.

## 05 · Ứng dụng theo lĩnh vực

- **Giáo dục & đào tạo:** ghi âm phản hồi buổi học → transcript → tóm tắt điểm khó hiểu → câu hỏi ôn tập. Đánh giá cá nhân xử lý cục bộ giảm rủi ro lan truyền.
- **Vận hành nhà máy/hiện trường:** chụp ảnh thiết bị, mã lỗi, tem nhãn → AI mô tả sơ bộ, lập checklist. *AI không thay chuyên gia kỹ thuật hoặc quy trình an toàn.*
- **Bảo mật & tuân thủ:** giảm đưa "dữ liệu đỏ" lên cloud ở giai đoạn đầu (biên bản kỷ luật, phỏng vấn nhân sự, ghi chú kiểm toán). Giảm rủi ro ≠ triệt tiêu — điện thoại vẫn có thể mất, bị chụp màn hình, backup tự động.
- **Sales/customer visit:** ghi âm trao đổi (được đồng ý) → tóm tắt nhu cầu, deadline, người quyết định → chỉ đưa bản tóm tắt vào CRM.

## 📝 Prompt mẫu

```text
Bạn là thư ký cuộc họp nội bộ. Chỉ sử dụng transcript bên dưới, không suy đoán thêm.
Tạo tóm tắt gồm: (1) Chủ đề cuộc họp. (2) Các ý chính đã thảo luận. (3) Quyết định
đã chốt, nếu có câu chốt rõ ràng. (4) Action items: Người phụ trách | Việc cần làm |
Deadline | Ghi chú. (5) Điểm cần xác minh lại từ audio gốc.
Quy tắc: Nếu thiếu thông tin, ghi "chưa thấy trong transcript". Không biến ý kiến
thành quyết định. Không thêm tên/số liệu nếu transcript không có.
```

```text
Bạn là trợ lý hiện trường. Tạo báo cáo nháp gồm: (1) Thời gian/địa điểm.
(2) Thiết bị/khu vực. (3) Hiện tượng. (4) Hành động đã thực hiện. (5) Việc cần làm
tiếp. (6) Điểm cần chuyên gia xác minh. Không kết luận nguyên nhân nếu không đủ
bằng chứng. Không bỏ qua cảnh báo an toàn.
```

## ✅ Checklist bảo mật và quản trị dữ liệu

- ☐ Xin phép ghi âm trước khi thu âm cuộc họp, phỏng vấn, trao đổi khách hàng
- ☐ Phân loại dữ liệu trước khi xử lý: xanh / vàng / đỏ — dữ liệu đỏ chỉ xử lý trên thiết bị công ty nếu tổ chức cho phép
- ☐ Kiểm tra thiết lập tự động backup — file tự đồng bộ khiến offline processing mất ý nghĩa
- ☐ Output AI không phải biên bản chính thức nếu chưa có người kiểm duyệt
- ☐ Không yêu cầu AI đoán phần nghe không rõ — đánh dấu "cần xác minh"
- ☐ Xóa file tạm sau khi hoàn tất — kiểm tra cả download, cache, thùng rác
- ☐ Ghi rõ phiên bản model/app khi thử nghiệm
- ☐ Không dùng AI Edge Gallery như nền tảng production khi chưa có đánh giá IT, pháp chế, bảo mật

> On-device AI giúp **giảm đường đi của dữ liệu** — nhưng không tự thay thế chính sách bảo mật, phân quyền, mã hóa, quản trị thiết bị và trách nhiệm kiểm duyệt của con người.

## 🔗 Tài liệu tham khảo

- [Google AI Edge](https://ai.google.dev/edge) · [LiteRT Overview](https://ai.google.dev/edge/litert/)
- [AI Edge Gallery — Google Play](https://play.google.com/store/apps/details?id=com.google.ai.edge.gallery) · [google-ai-edge/gallery — GitHub](https://github.com/google-ai-edge/gallery)

**Quay lại:** [Bản đồ Hệ sinh thái — Google AI System ←](./)
