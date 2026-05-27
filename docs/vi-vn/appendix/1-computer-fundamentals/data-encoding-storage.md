# Data Encoding và Transmission

::: tip Mở đầu
Khi gửi 1 tấm ảnh, 1 tin nhắn, hay download game vài GB, thông tin xuyên nửa trái đất, nguyên vẹn đến màn hình bạn thế nào? Chương này xoay quanh câu hỏi newbie hay gặp: **sao file tôi nhận bị mã loạn?** Theo dấu vấn đề, vén bức màn 3 nền tảng underlying: **encoding, storage, transmission**.
:::

**Bạn sẽ học**:
- **Debug mã loạn**: gặp "file mở thành ký tự lạ" → biết phân tích từ góc encoding, không vội kết luận "file hỏng"
- **Cross-platform mindset**: trao đổi data biết quan tâm encoding + byte order
- **Encoding worldview**: máy biểu diễn vạn vật bằng 0/1 thế nào
- **Foundation**: cho network protocol, file format, serialization

| Chương | Nội dung |
|-----|------|
| **1** | Character encoding (ASCII, UTF-8, GBK) |
| **2** | Storage (binary, byte order) |
| **3** | Transmission (serialization, compression) |

Trước khi bắt đầu, làm rõ 1 sự thật vật lý newbie hay bỏ qua:

Máy tính cực "cứng nhắc". Không biết chữ Hán, không biết màu sắc, không nghe được nhạc Sơn Tùng.

Underlying nó toàn switch bán dẫn vi mô, **chỉ judge "có điện (1)" hoặc "không (0)"**.

Máy chỉ biết 0/1, sao cho nó hiện ảnh + text phức tạp?

Đáp án: **quy định 1 "code book"**.

Ta + máy thoả thuận: signal `01000001` → vẽ chữ `A`; signal khác → màu đỏ.

Quá trình **dùng codebook dịch qua lại = "Encoding"**.

Hiểu "mọi thứ trong máy bản chất là mật mã", bạn hiểu hiện tượng quái nhất: mã loạn từ đâu ra.

---

## 0. Mở đầu: sao file biến thành "thiên thư"?

Tưởng đồng nghiệp gửi file quan trọng, double-click thấy toàn `浣犲ソ` hoặc `ä½ å¥½`.

Trực giác: chắc file hỏng trên đường? Mất packet?

Thực ra 99% "file hỏng" — sự thật là **máy bạn "chọn nhầm reading rule"**.

👇 **Click thử**: switch các "codebook" khác nhau, đọc cùng 1 chuỗi byte:

<GarbledTextDemo />

**🎯 Insight: codebook không khớp**

Byte (chuỗi 0/1) tự nó không có nghĩa tuyệt đối, **"encoding rule"** do người định mới gán nghĩa.

Như morse "tick tick tack" — dùng codebook Trung Quốc ra 1 chữ; codebook Mỹ ra chữ khác.

**Người gửi dùng UTF-8 dịch chữ Hán thành số, bạn dùng GBK đọc lại → mã loạn.**

Để hiểu sao data không hỏng vẫn loạn, cần biết chuỗi đầy đủ: **encoding → storage → transmission**.

---

## 1. Data encoding là gì? (vạn vật thành số)

> **Encoding** = xây "từ điển dịch 2 chiều", map thông tin phức tạp (text, màu, âm) thành 0/1 máy hiểu.

### 1.1 Text → số: từ ASCII đến Unicode

Mỗi lần gõ phím, máy lén làm 1 việc: **lookup table**.

**Giai đoạn 1: ASCII**

PC sơ khai, người Mỹ nghĩ thế giới chỉ 26 chữ + số + dấu câu → định **ASCII**.

128 ký hiệu, vd số `65` = chữ `A`. Vì ít, **1 Byte (= 8 Bit)** = 256 biến → thừa.

**Giai đoạn 2: chiến quốc**

PC ra thế giới. Vấn đề: **chữ Hán mấy chục nghìn, Nhật có kana, 1 byte không đủ!**

Trung Quốc làm **GBK** (2 byte/Hán), Nhật làm Shift_JIS... thế giới hỗn loạn. Webpage làm ở TQ gửi Mỹ → mã loạn (Mỹ không có GBK dictionary).

**Giai đoạn 3: thống nhất với Unicode**

Cuối, các kỹ sư ngồi với nhau: "làm 1 super dictionary chứa mọi ký hiệu trái đất!" → **Unicode**. Mỗi ký tự, kể cả emoji, có 1 số định danh duy nhất.

**UTF-8** là set "storage rule" phổ biến nhất hiện cho Unicode. Thông minh: **variable length** — Anh 1 byte, Hán 3 byte, tiết kiệm.

👇 **Click thử**: gõ chữ Việt/Anh/Emoji (vd `Xin chào 🎉`), xem byte:

<CharacterEncodingExplorer />

**💡 Phát hiện**:
- Chữ Latin (a-z, không dấu) trong UTF-8 = **1 byte**
- Chữ tiếng Việt có dấu (vd "ố") = **2-3 byte**
- Chữ Hán = **3 byte**
- Emoji (🎉) = **4 byte**!

> **Cold fact**: SMS tiếng Việt có dấu chỉ gửi 70 ký tự/tin (Unicode), không dấu được 160 (GSM-7). Vì physical size khác.

### 1.2 Màu sắc + âm thanh → số?

Text có lookup table, vậy ảnh + giọng hát?

Cùng nguyên lý: **slice + map**.

- **Image encoding**: zoom ảnh max → vài triệu pixel nhỏ. Quy định mỗi màu 1 code (vd `#FF0000` = đỏ), lưu code mọi pixel → ảnh thành số.

  👇 **Click thử**: hover ô bên trái xem màu → hex code.
  <ImageEncodingDemo />

- **Audio encoding**: âm thanh = sóng dao động không khí. Đo độ cao sóng 44100 lần/giây (sample), record giá trị → sóng liên tục thành mảng số rời rạc.

  👇 **Click thử**: kéo slider xem sóng analog liên tục "slice" thành digital.
  <AudioEncodingDemo />

---

## 2. Storage: trước khi gửi, phải chứa đâu đó

Encode xong, sắp gửi. Trước hết phải để vào media vật lý. Đụng quy tắc sắt.

Bạn có thể nghĩ: **"đã phải lưu, lưu chỗ đọc-ghi nhanh nhất là OK?"**

Nhưng trong hardware, có ma chú không vẹn cả: **storage càng nhanh, giá càng đắt, dung lượng càng nhỏ.**

Để dùng tiền ít nhất đổi tốc độ cao nhất, kỹ sư thiết kế **"storage hierarchy"** (kim tự tháp storage).

👇 **Click thử**: click từng layer kim tự tháp, xem máy hiện đại tính toán thế nào.

<StoragePyramidDemo />

**🎯 Insight: triết lý "porter" của OS**

Không có storage hoàn hảo. OS (Windows, macOS) như quản kho thông minh:

1. Phim + game khối lượng lớn → kho chậm-rẻ (**SSD/HDD**)
2. Khi chơi game, vác texture HD từ disk → "bàn làm việc" cực nhanh nhưng nhỏ (**RAM**)
3. Đóng game, clear RAM cho file khác

> **Insight**: chơi open-world AAA, đổi map đen màn hình lâu (loading bar) — vì disk chậm, OS đang vác data map kế lên RAM.

---

## 3. Data transmission (cho 0/1 du lịch)

Encode xong, ở RAM, giờ gửi bạn.

> **Transmission** = đẩy 0/1 (điện hoặc quang signal) theo cáp, dây, sóng — chính xác từ máy A sang máy B.

### 3.1 Hardware + LAN: giới hạn vật lý 1 dây

Trong case hoặc 2 PC gần nhau, **thử thách vật lý thuần**.

Idea đầu tiên hay nghĩ: "1 dây 1 lúc gửi 1 signal, dùng 8 dây song song → x8 speed?"

Đây là **parallel** dùng cho HDD đời cũ.

Nhưng hôm nay Type-C, USB, PCIe mainboard đều dùng **serial (1 channel chính)**.

👇 **Click thử**: so sánh animation serial vs parallel.

<DataTransmissionDemo />

**💡 Sao "đường mòn 1 lối" thắng "8 lane"?**

Speed thấp, 8 dây OK. Nhưng cần vài tỷ signal/giây, vấn đề:
Dòng điện yếu trên các dây sinh sóng điện từ nhiễu nhau (crosstalk); không đảm bảo 8 signal cùng phát sẽ cùng đến đích. 1 dây chậm 1 phần triệu giây vì impedance → 8 bit ghép lại loạn.

Thay vì tốn tiền cân bằng 8 lane, dồn resource vào 1 lane "siêu xe", đẩy speed lên ánh sáng. Đây là sự thật serial thống trị.

### 3.2 WAN + Internet: vượt biển, nghệ thuật chống mất gói

Nếu data không gửi GPU cách 1 inch, mà gửi server Mỹ?

Không thể 1 dây liên tục. Data qua cáp quang, đáy biển, vô số router cũ. Lúc này không phải limit vật lý, mà **thử thách fault tolerance**.

Gửi video 1GB qua app chat, logic underlying như chuyển nhà quốc tế — không thể quăng container nguyên cho bưu điện.

1. **Packetization**: network cắt video thành mấy chục nghìn "data packet" cỡ phong bì (thường 1500 byte).
2. **Checksum**: phòng cáp đáy biển bị cá mập cắn đứt 1 dây làm `0` đảo thành `1`, system tính 1 "fingerprint" toán học cho mỗi phong bì.
3. **TCP retransmit + ACK**: bên nhận tính checksum verify. Nếu sai, hoặc thấy seq nhảy từ 31 sang 33 (mất packet), hét qua network: **"Tôi không nhận được 32, gửi lại 32!"**

Vì cơ chế **TCP (Transmission Control Protocol)** cực chặt này, dù WiFi tệ download file 30 phút, khoảnh khắc xong, file **100% nguyên vẹn**.

---

## 4. Thực chiến: từ bấm shutter đến đăng MXH

3 mảnh xếp lại: **encode + store + transmit**. Xem operation thường ngày: **chụp ảnh tự backup cloud**.

Giây bạn nhấn shutter, trong phone là 1 cuộc chiến số vĩ đại.

👇 **Click thử**: click "execute step", trace hành trình data.

<PhotoUploadJourneyDemo />

---

## 5. Glossary

| Term | Nghĩa |
| :--- | :--- |
| **Bit (b)** | Đơn vị nhỏ nhất, chỉ 0 hoặc 1 |
| **Byte (B)** | 8 Bit. Đơn vị file size cơ bản |
| **Character Set** | "Mục lục từ điển", quy định ký tự nào tồn tại, không quy định lưu byte gì |
| **Encoding** | "Storage rule" cụ thể, quyết ký tự đó tương ứng byte nào (vd UTF-8) |
| **RAM** | Memory siêu nhanh nhưng tắt điện mất. Phone 8G/16G nói cái này |
| **SSD** | Storage permanent hiện đại, chip flash, nhanh hơn HDD vài chục lần |
| **Serial / Parallel** | Serial: 1 channel xếp hàng; Parallel: nhiều channel song song (không hợp tần số cao) |
| **Checksum** | Verify code đính kèm khi transmit. Bên nhận tính lại, khớp = không hỏng |
| **TCP** | Transmission Control Protocol. Cắt file lớn, dán seq, mất packet retransmit, đảm bảo 100% nguyên vẹn |

---

## Tổng kết

Câu hỏi đầu chương, giờ bạn có đáp án từ underlying:

- **Sao file nhận bị mã loạn?**
  Data không hỏng, software bạn không chọn đúng codebook (encoding).

- **Sao dây Type-C nhỏ tí nhưng nhanh hơn dây bự cũ?**
  Trước là nhiều ngựa song song dễ đụng (parallel), giờ là 1 tàu cao tốc đường riêng (serial).

- **Sao game lớn loading scene đen màn lâu?**
  Cần vác mấy chục GB từ disk chậm sang RAM nhanh.

Bản chất máy tính rất mộc mạc:

**Là 1 máy giỏi "chuyển (encode)" mọi thứ thành signal, "giữ (store)" trong silicon, rồi "cắt nhỏ + gửi (transmit)" qua điện áp pulse.**

Đọc hiểu vòng lặp này = bạn cầm chìa khoá underlying của computer science.

::: tip 2026 update
- **Web encoding default**: HTML5 mặc định UTF-8, gần như không còn vấn đề mã loạn
- **NVMe SSD**: PCIe 5.0 NVMe đạt 14 GB/s
- **HTTP/3 + QUIC**: chạy trên UDP (không phải TCP), faster cho mobile
- **AI inference**: dữ liệu encode đặc biệt (tokenization cho LLM)
- **Vector embeddings**: encode text/image thành vector dày để search semantic
- **VN dev**: hiểu UTF-8 = không bao giờ gặp bug "ố thành ô" trong DB
:::
