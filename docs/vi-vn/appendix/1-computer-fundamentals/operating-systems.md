# Hệ điều hành: thuê "quản gia" cho máy tính

::: tip Mở đầu
**Có CPU hoàn hảo và RAM vô hạn, máy tính dùng được ngay không?**

Ở chương trước, ta đã thấy cách transistor kết hợp thành CPU mạnh. Nhưng kể cả hardware top, nếu cho chúng work trực tiếp, chỉ để hiện 1 chữ trên màn cũng cần viết vài trăm dòng machine instruction tối nghĩa.

Để giải nightmare này, **Hệ điều hành (Operating System, OS)** ra đời. Nó là tầng "software" vĩ đại nhất giữa bạn và hardware lạnh lùng.
:::

**Bạn sẽ học**:
- Năng lực troubleshoot "program treo", "RAM không đủ"
- Hiểu sâu "multi-process", "virtual memory", "file permission"
- Tư duy hệ thống: program tương tác với OS, process khác, hardware
- Nền cho concurrent programming, system tuning, container

| Chương | Nội dung |
|-----|------|
| **1** | Quản lý process (Time-sharing CPU) |
| **2** | Quản lý memory (Virtual memory, paging) |
| **3** | File system (Tổ chức file, directory) |

---

## 0. Toàn cảnh: không có OS thì sao?

Tưởng tượng bạn mở 1 "computing factory" (máy tính), có 1 worker top (CPU), 1 kho khổng lồ (RAM), vô số container (HDD).

Không thuê quản lý (OS):

1. **Khủng hoảng độc quyền CPU**: CPU 1 lần chỉ làm 1 việc. Người nghe nhạc → người khác phải đợi
2. **Tai nạn giẫm đạp memory**: 2 app cùng ghi RAM → crash
3. **Mê cung HDD**: HDD chỉ là disc 0/1, phải nhớ "mặt 1, track 56, sector 8" — không ai nhớ nổi

<OSArchitectureDemo />

OS dùng "3 vũ khí": **quản lý process**, **quản lý memory**, **file system**.

---

## 1. Quản lý process: time-sharing CPU

Máy bạn chỉ 1 CPU core, sao cùng lúc chạy WeChat + nhạc + typing?

**Nó không cùng lúc làm. OS đang "time management" điên cuồng.**

<ProcessDemo />

### 1.1 "Process" là gì?

Mỗi program đang chạy = 1 **process**. Hiểu như 1 project group có code (việc cần làm), data memory (vốn), xếp hàng đợi CPU.

### 1.2 Time slice rotation

OS cắt thời gian CPU thành đoạn nhỏ (~10ms), luân phiên gán cho từng process. Switch quá nhanh → bạn cảm giác "chạy cùng lúc".

---

## 2. Quản lý memory: virtual address space

Nếu mọi software ghi data thẳng vào RAM thật → thảm hoạ giẫm đạp.

<MemoryDemo />

### 2.1 Virtual Memory

OS nói dối với mỗi process: "Bạn độc chiếm toàn bộ RAM, dùng thoải mái!"

Trong mắt process, RAM luôn **liên tục** và **sạch sẽ**.

### 2.2 Page Table mapping

Thực tế OS lén nhét data vào các khe nhỏ trong **physical RAM**. Lợi ích:

1. **An toàn**: WeChat chỉ thấy space riêng, không sửa được data người khác
2. **Tận dụng fragment**: dù physical RAM lộn xộn, virtual space vẫn gọn

---

## 3. File system: tổ chức lưu trữ persistent

HDD mới mua chỉ là vùng storage cell trắng. Muốn lưu ảnh, HDD hỏi: "Lưu ở byte thứ mấy?"

<FilesystemDemo />

### 3.1 File system làm gì?

1. **Cắt HDD**: chia thành block 4KB
2. **Lập sổ kế toán**: ghi block nào đầy/trống
3. **Dịch path**: `D:/photo/pet.jpg` → "block 3, 7, 11"

Đây là lý do rename file xong ngay (chỉ đổi tên trong sổ), copy file lâu hơn (read/write data thật).

---

## 4. 3 component cùng work: process khởi động

<ProgramLaunchDemo />

Dù click icon hay `print("Hello World")`, đều dựa vào loạt operation phức tạp. Ta lướt thoải mái thế giới số được — vì OS gánh thay ở tầng dưới.

---

## Đọc thêm

- **Process & Thread**: process = project group, thread = employee trong group
- **Concurrency & Lock**: 2 process cạnh tranh resource → tránh deadlock
- **System Call**: "service window" OS cho ứng dụng

::: tip 2026 update
- **WASM-based OS** (Bytecode Alliance) nổi — OS-like environment trong browser
- **Unikernel revival**: single-purpose OS cho serverless
- **Linux 6.x** dominant ~99% server market
- **macOS Sequoia + Apple Intelligence**: OS-level AI integration
- **WSL2** stable cho dev Windows + Linux
:::
