# Nguyên lý cấu tạo máy tính

::: tip Mở đầu
**Sau khi có CPU từ transistor, máy tính tổ chức thành hệ thống thế nào?** Chương trước build CPU core từ transistor + adder + register. Nhưng CPU không đủ — cần phối hợp memory, I/O, cần bus connect, instruction system drive. Chương này từ CPU view → toàn hệ thống view: kiến trúc Von Neumann, instruction system, storage hierarchy, bus + I/O.
:::

**Bạn sẽ học**:
- **System view**: hiểu CPU, memory, I/O phối hợp thế nào
- **Hardware terminology**: instruction cycle, pipeline, CPI, cache hit rate
- **Performance mindset**: hiểu bottleneck + optimization
- **Foundation**: cho OS, architecture, embedded

| Chương | Nội dung |
|-----|------|
| **1** | Kiến trúc Von Neumann |
| **2** | Instruction system (ISA) |
| **3** | CPU controller |
| **4** | Storage hierarchy + cache |
| **5** | Bus + I/O + DMA |

---

## 0. Toàn cảnh

Chương trước hiểu CPU bên trong. Nhưng CPU chỉ là 1 execution unit, để máy "dùng được" cần peripheral.

<CpuArchitectureDemo />

::: tip Phân tầng hardware
- **CPU core**: execute instruction
- **Register**: high-speed storage trong CPU
- **Main memory**: lưu program + data, CPU access qua address bus + data bus
- **I/O devices**: input/output qua I/O controller
- **System bus**: kết nối CPU-Memory-I/O, gồm address/data/control bus
:::

---

## 1. Von Neumann: "hiến pháp" máy tính hiện đại

### 1.1 Stored-program

1945, John von Neumann đề xuất **stored-program architecture**.

::: tip Core
**Stored-program**: program như 1 loại data đặc biệt, lưu trong memory như data thường. CPU đọc + execute instruction từ memory.
:::

Nghĩa:
- **Máy tính cũ**: program là hardwired, đổi program phải re-solder mạch
- **Von Neumann**: program trong memory, đổi program chỉ cần sửa memory content

### 1.2 5 component chính

<RegisterDemo />

| Part | EN | Function |
|------|------|------|
| **ALU** | Arithmetic Logic Unit | Phép số học + logic |
| **CU** | Control Unit | Chỉ huy phối hợp |
| **Memory** | — | Lưu program + data |
| **Input** | Input | Bàn phím, chuột |
| **Output** | Output | Màn hình, máy in |

### 1.3 Data path

**Data path** = đường data chảy giữa các unit. Trong CPU, connect: register, ALU, MDR.

Width data path (truyền được mấy bit/lần) ảnh hưởng trực tiếp performance.

### 1.4 Von Neumann bottleneck

> Tốc độ truyền data CPU ↔ Memory chậm hơn nhiều tốc độ xử CPU.

CPU thường "wait data". Đa số optimization hiện đại xoay quanh:

| Tech | Nguyên lý |
|---------|------|
| **Cache** | Storage nhỏ cao tốc gần CPU |
| **Instruction Pipeline** | Nhiều instruction ở stage khác nhau |
| **Superscalar** | Cùng 1 clock cycle issue nhiều instruction |
| **Multi-core** | Nhiều CPU core chia task |

---

## 2. Instruction System: interface CPU-Software

Câu hỏi: "program" trong memory hình thù gì? CPU đọc thế nào?

Trả lời: **Instruction Set Architecture (ISA)**. Nếu CPU là service, ISA là **API doc** — định nghĩa mọi command CPU hiểu, format, phạm vi data.

### 2.1 Từ code đến instruction

<CodeToInstructionDemo />

| Layer | Content | Ai hiểu |
|------|------|---------|
| High-level | `int a = 10 + 5;` | Người |
| Assembly | `MOV R1, #10` / `ADD R3, R1, R2` | Người (cần train) |
| Machine code | `0001 0001 0000 1010` | CPU |

::: tip Sao cần hiểu chuỗi này?
- Compile error → biết lỗi ở "high-level → assembly"
- Runtime crash → biết lỗi ở stage CPU execute
- Performance optimization → biết compiler optimize gì
- Chọn CPU architecture (x86 vs ARM) → biết khác ở "ISA API"
:::

### 2.2 1 instruction hình thù gì?

Mỗi machine instruction = chuỗi binary, có format chặt:
- **Opcode**: làm gì (cộng? jump? read memory?)
- **Operand**: làm với ai (register nào? memory address? constant?)

```
Instruction:  ADD  R3, R1, R2
              ───  ──────────
              opcode  operand
              (cộng) (R3 = R1 + R2)
```

<InstructionFormatDemo />

| Format | Structure | Ví dụ | Use |
|------|------|------|---------|
| 0-address | Chỉ opcode | `RET` | Stack machine |
| 1-address | Opcode + 1 addr | `INC R1` | Single operand op |
| 2-address | Opcode + 2 addr | `MOV R1, R2` | Hay dùng nhất |
| 3-address | Opcode + 3 addr | `ADD R3, R1, R2` | Không phá source |

### 2.3 CPU tìm data thế nào? — Addressing mode

| Mode | Ẩn dụ | Ví dụ | Note |
|---------|------|---------|------|
| **Immediate** | Người đứng trước mặt | `MOV R1, #100` | Data ngay trong instruction, nhanh nhất |
| **Register** | Gọi nội bộ | `MOV R1, R2` | Data trong register CPU, nhanh |
| **Direct** | Biết số nhà, đến thẳng | `MOV R1, [0x1000]` | Memory address trong instruction |
| **Indirect** | Hỏi reception "Tom phòng nào" | `MOV R1, [R2]` | Register chứa address, query thêm 1 lần |
| **Indexed** | "Toà 3 + tầng 5" | `MOV R1, [R2+10]` | Base + offset, cho array |

<AddressingModeDemo />

::: tip Sao cần nhiều mode?
- **Constant** (`x = 100`) → immediate
- **Variable op** (`a + b`) → register
- **Array** (`arr[i]`) → indexed
- **Pointer** (`*ptr`) → indirect
:::

### 2.4 Phân loại instruction

| Type | Làm gì | Đại diện | Code bạn viết |
|------|-------|---------|-------------|
| **Data transfer** | Move data | MOV, LOAD, STORE | `let x = y`, param function |
| **Arithmetic** | +, -, ×, ÷ | ADD, SUB, MUL, DIV | `a + b`, `count++` |
| **Logic** | Bit op | AND, OR, NOT, XOR | `flags & 0xFF` |
| **Shift** | Dịch trái phải | SHL, SHR | `x << 2` (= ×4) |
| **Control transfer** | Jump + call | JMP, CALL, RET | `if`, `for`, function call |
| **I/O** | Communicate peripheral | IN, OUT | Read keyboard, write screen |

::: tip Insight
Mọi code bạn viết — dù logic phức tạp đến đâu — cuối cùng đều decompose thành 6 loại basic op. CPU "thông minh" không vì làm phức tạp, mà vì execute simple ops tốc độ vài tỷ/giây.
:::

### 2.5 2 triết lý: CISC vs RISC

<CISCvsRISCDemo />

Ẩn dụ:
- **CISC = dao thuỵ sĩ**: 1 dao tích hợp kéo, mở bia... nhiều chức năng nhưng không tốt nhất từng cái
- **RISC = bộ tool chuyên nghiệp**: mỗi tool chỉ 1 việc, nhanh + tốt

::: tip Sao phone dùng ARM, PC dùng x86?
- **x86 (CISC)** dominate PC/server 40 năm, ecosystem software khổng lồ. Đổi architecture = recompile mọi software
- **ARM (RISC)** thống trị mobile nhờ low power. Mobile battery nhỏ, mỗi mW quý
- **Apple Silicon** chứng minh RISC cũng high-performance — M-series vượt x86 cả hiệu năng + power
- **RISC-V** open-source, đang lên ở IoT, education, AI chip
:::

---

## 3. Controller: "trung tâm chỉ huy" CPU

### 3.1 Cấu tạo

<ControllerDemo />

| Component | Function |
|------|------|
| **PC (Program Counter)** | Address instruction tiếp |
| **IR (Instruction Register)** | Instruction đang execute |
| **Decoder** | Parse opcode + operand |
| **Clock generator** | Sinh nhịp, control timing |
| **Microoperation generator** | Sinh control signal execute instruction |

<PSWFlagDemo />

### 3.2 Instruction cycle

1. **Fetch (IF)**: read instruction từ memory về IR
2. **Decode (ID)**: parse
3. **Execute (EX)**: thực hiện op
4. **Memory Access (MEM)**: nếu cần, access memory
5. **Write Back (WB)**: viết về register hoặc memory

### 3.3 Micro-operation

**Micro-operation** = op cơ bản nhất driven bởi control signal. Vd "fetch" decompose:

| Beat | Micro-op | Control signal |
|------|--------|---------|
| T1 | PC → MAR | PCout, MARin |
| T2 | MEM → MDR | MEMout, MDRin |
| T3 | MDR → IR | MDRout, IRin |
| T4 | PC + 1 → PC | PC+1, PCin |

### 3.4 Hardwired vs Microprogram controller

| Feature | Hardwired | Microprogram |
|------|------------|-------------|
| **Implement** | Combinational logic | Microinstruction (firmware) |
| **Speed** | Nhanh | Chậm hơn 1 chút |
| **Design** | Phức tạp | Đơn giản hơn |
| **Flexibility** | Kém (đổi = redesign mạch) | Tốt (sửa microprogram) |
| **Typical** | RISC | CISC early |

---

## 4. Storage hierarchy: sao cần cache?

### 4.1 Pyramid

<StorageHierarchyDemo />

| Layer | Type | Access time | Capacity | Vị trí |
|------|---------|---------|---------|------|
| **Register** | SRAM | <1ns | vài KB | Trong CPU |
| **L1 cache** | SRAM | ~1ns | 32-64KB | Gần core |
| **L2 cache** | SRAM | ~3-10ns | 256KB-1MB | Trong chip |
| **L3 cache** | SRAM | ~10-20ns | 2-16MB | Trong chip/shared |
| **Main memory** | DRAM | ~50-100ns | 8-64GB | Mainboard |
| **SSD** | Flash | ~10-100μs | 256GB-2TB | Mainboard |
| **HDD** | Disk | ~5-10ms | 1-10TB | Case |

::: tip Ẩn dụ tốc độ
CPU access L1 = **lấy 1 tờ giấy trên bàn**:
- Memory → thang máy xuống tiệm tạp hoá mua giấy
- SSD → lái xe sang thành phố khác mua giấy
- HDD → bay sang nước khác mua giấy

Chênh tốc độ **trăm triệu lần**!
:::

### 4.2 Nguyên lý cache

**Cache** giữa CPU-memory, dựa trên 2 nguyên lý locality:

::: tip Locality
- **Temporal locality**: data vừa access có thể access lại sớm
- **Spatial locality**: data được access, data gần đó cũng có thể được access
:::

1. **Hit**: data CPU cần ở cache → đọc trực tiếp
2. **Miss**: không có → load từ memory

```
Hit rate = số hit / tổng access
Avg access time = hit rate × cache time + (1 - hit rate) × memory time
```

<CacheDemo />

### 4.3 Cache mapping

| Mode | Nguyên lý | Lợi | Hại |
|------|------|------|------|
| **Direct mapped** | Mỗi memory block 1 vị trí cố định | Đơn giản | Conflict cao |
| **Set associative** | N vị trí (N-way) | Cân bằng | Phức tạp |
| **Fully associative** | Bất kỳ vị trí | Conflict thấp nhất | Implement khó |

### 4.4 Virtual memory

**Virtual memory** = OS abstraction quan trọng:

- Mỗi process tưởng có toàn bộ virtual address space
- OS translate virtual → physical address
- Page ít dùng swap ra disk

::: tip Ẩn dụ
Như khách sạn quản phòng:
- Bạn (process) tưởng cả toà là của mình
- Thực ra hotel (OS) chỉ cấp phòng đang dùng
- Phòng không dùng "swap out" vào kho (disk)
- Cần phòng → "swap in" ngay
:::

---

## 5. Bus + I/O: "mạch máu" máy tính

### 5.1 System bus

<BusSystemDemo />

| Bus | Function | Direction | Width |
|---------|------|------|---------|
| **Address bus** | Truyền address | 1-way (CPU→mem) | 32/64-bit |
| **Data bus** | Truyền data | 2-way | 32/64-bit |
| **Control bus** | Control signal | 2-way | Nhiều signal lines |

### 5.2 Bus arbitration

Nhiều device cùng yêu cầu bus → **arbitration** quyết định ai trước:

| Mode | Note |
|---------|------|
| **Centralized** | Central arbiter quyết |
| **Distributed** | Device tự thoả thuận |

### 5.3 I/O access methods

| Mode | Nguyên lý | Lợi | Hại |
|------|------|------|------|
| **Polling** | CPU loop check I/O | Đơn giản | CPU utilization thấp |
| **Interrupt** | I/O xong notify CPU | CPU làm song song được | Overhead interrupt |
| **DMA** | I/O access memory trực tiếp | CPU không tham gia | Cần DMA controller |

<IOMethodDemo />

### 5.4 DMA

**DMA (Direct Memory Access)** cho I/O device giao tiếp memory thẳng:

<NetworkOverviewDemo />

- **Không DMA**: CPU tham gia cả quá trình
- **Có DMA**: CPU bảo DMA controller "từ đâu đến đâu, bao nhiêu", rồi đi làm việc khác. DMA xong notify CPU.

::: tip Ẩn dụ DMA
Như **order delivery**:
- **Không DMA**: tự đi siêu thị mua, về nhà rửa, nấu (cả quá trình)
- **Có DMA**: order qua app, shipper giao tới bếp (người khác làm, chỉ "nhận hàng")
:::

### 5.5 Interrupt

1. I/O device xong → gửi **interrupt request** tới CPU
2. CPU đang execute, xong instruction hiện tại thì respond
3. CPU save state, jump tới interrupt handler
4. Xong, restore state, tiếp tục

---

## 6. Performance: Pipeline

### 6.1 Instruction pipeline

<PipelineDemo />

```
Sequential (5 instruction, 15 cycle):
I1: IF→ID→EX→MEM→WB
I2:            IF→ID→EX→MEM→WB
I3:                         IF→ID→EX→MEM→WB

Pipeline (5 instruction, 9 cycle):
I1: IF→ID→EX→MEM→WB
I2:    IF→ID→EX→MEM→WB
I3:       IF→ID→EX→MEM→WB
```

Ideal: N instruction CPI ≈ 1.

### 6.2 Pipeline hazard

| Type | Cause | Fix |
|------|------|---------|
| **Structural** | Resource conflict | Thêm HW / stagger |
| **Data** | Instruction sau cần kết quả trước | Data forwarding / bubble / scheduling |
| **Control** | Jump đổi flow | Delay slot / branch prediction |

---

## 7. Tổng kết: máy tính "chạy" thế nào?

> **Sau khi program start, OS load executable từ disk vào memory. CPU IF unit qua address bus đọc instruction từ memory về IR. Controller decode (ID), nhận diện op type → sinh control signal. EX unit thực thi op, cần thì MEM access memory qua data bus, cuối WB về register/memory. Toàn quá trình driven bởi clock, controller sinh chuỗi micro-op điều phối.**

::: tip 2026 update
- **Apple M3/M4**: unified memory architecture, GPU + CPU share memory
- **HBM (High Bandwidth Memory)**: cho AI chip, GPU
- **CXL (Compute Express Link)**: standard mới cho memory pooling
- **3D stacking**: chip xếp tầng, tăng density
- **VN dev**: hiểu cache line giúp tối ưu data structure (struct of array vs array of struct)
:::

---

## Tài liệu

| Topic | Sách |
|------|-----------------|
| Computer architecture | Patterson & Hennessy |
| CPU microarchitecture | Bryant & O'Hallaron - CSAPP |
| ISA | ARMv8 manual, Intel x64 manual |
| Cache coherence | MESI protocol |

## Tiếp theo

- **[Operating Systems](./operating-systems.md)**: program run trên OS thế nào
- **[Data encoding, storage, transmission](./data-encoding-storage.md)**: data biểu diễn thế nào
