# Từ Transistor đến CPU

::: tip Mở đầu
**Máy tính "suy nghĩ" thế nào?** Bạn có thể biết CPU là "não", nhưng não đó hoạt động ra sao? Sao từ đống kim loại + nhựa thành thiết bị thông minh chạy program, xử data? Chương này dẫn bạn từ transistor underlying nhất, từng bước hiểu nguyên lý cấu tạo CPU.
:::

**Bạn sẽ học**:
- **Hiểu thuật ngữ**: "CPU clock", "multi-core", "instruction set" không còn mù mờ
- **Code execution view**: 1 dòng code qua fetch-decode-execute-writeback thành pixel màn hình thế nào
- **Tư duy abstraction layer**: mỗi layer cung cấp service lên trên, ẩn complexity dưới
- **Foundation**: cho computer architecture, embedded, performance optimization

| Chương | Nội dung |
|-----|------|
| **1** | Transistor — switch của thế giới digital |
| **2** | Logic gate — implement Bool trên vật lý |
| **3** | Functional unit — adder, register, MUX |
| **4** | CPU core — fetch/decode/execute/writeback |

---

## 0. Toàn cảnh: từ cát đến trí tuệ

Lột vỏ máy tính, ta thấy chỉ kim loại, nhựa, chip silicon. Tự thân không có sự sống, không hiểu toán. Nhưng khi điện chạy qua, mọi thứ vận hành. Tất cả từ 1 abstraction physics đơn giản: **switch**.

Tưởng 1 công tắc đèn. Bật = "1", tắt = "0". Nếu có vài tỷ switch và **1 switch điều khiển switch khác**, ghép logic phức tạp → ta có general computing platform.

::: tip Phân tầng từ cát đến trí tuệ
- **Tầng 1: Transistor (hàng tỷ)** — "switch" đáy. CPU hiện đại dùng MOSFET. Apply điện vào gate → source-drain conduct. Vấn đề core: **dùng điện điều khiển điện thế nào?**
- **Tầng 2: Logic gate (hàng tỷ)** — ghép transistor song song/nối tiếp → mạch thành toán. AND: 2 input đều 1, output 1. Map Bool algebra lên mạch. Core: **biến đóng-mở thành phép tính 0/1?**
- **Tầng 3: Functional unit (hàng trăm)** — ghép logic gate. Adder (số học), MUX (data flow), register (nhớ). Core: **làm máy nhớ + cộng thế nào?**
- **Tầng 4: CPU core (1-128 core)** — trung tâm chỉ huy. Khi bạn viết 1 dòng code, các unit phối hợp tỷ lần/giây để fetch-decode-execute-writeback. Core: **làm modules tự động chạy chuỗi program?**
:::

---

## 1. Transistor: switch của thế giới digital

<TransistorDemo />

### 1.1 Transistor là gì?

::: tip Concept
**Transistor** là semiconductor đã thay đổi lịch sử. Trong digital circuit, abstract = "switch hoàn hảo".

Như vòi nước. Nhưng thay vì dùng tay, **điều khiển bằng điện áp**:
- **Source + Drain** = 2 đầu ống nước
- **Gate** = van điều khiển

Điểm key: không phải tay vặn, mà **điện áp control**. Khi 1 switch có thể bị control bởi switch khác → vượt qua "manual" sang "auto computation".
:::

### 1.2 Transistor biểu diễn 0/1 thế nào?

Vậy "máy chỉ hiểu 0/1" trong vật lý là gì? Trong chip có 0 với 1 nhỏ tí chạy không?

Không. Đây là **convention abstraction**. Chia 2 mức điện áp:
- **Điện áp cao (vd 3.3V hoặc 1.0V)** = logic **1** (True)
- **Điện áp thấp (gần 0V)** = logic **0** (False)

Đây là digital abstraction: cắt thế giới analog đầy noise thành 0/1 sạch sẽ.

### 1.3 Sự tiến hoá số transistor

1 transistor nhỏ bé, nhưng vài tỷ thì sao?

| Năm | Chip | Số transistor | Process | Ý nghĩa |
| -------- | ---------------- | ---------- | -------- | ---------------------- |
| 1971 | Intel 4004 | 2,300 | 10μm | Bình minh microprocessor |
| 1993 | Intel Pentium | 3.1M | 800nm | PC phổ cập |
| 2006 | Intel Core 2 Duo | 291M | 65nm | Multi-core mainstream |
| 2020 | Apple M1 | 16B | 5nm | Mobile architecture phản kích |
| 2023 | Apple M3 Max | 92B | 3nm | Gần giới hạn nguyên tử |

> **3nm** là gì? 1 nguyên tử Si đường kính ~0.2nm. Tức process 3nm = transistor structure chỉ vài chục nguyên tử rộng. Ở rìa quantum mechanics, để xây pháo đài tính toán lớn nhất loài người.

---

## 2. Logic gate: dùng switch làm phép tính

### 2.1 Từ transistor đến logic gate

Khi ghép nhiều transistor theo structure, vật lý → math logic. Tầng mới, không nói volts/amps, nói "true"(1)/"false"(0).

<LogicGateDemo />

### 2.2 Basic logic gate

- **AND**: input đều 1 → output 1. Ẩn dụ: **nối tiếp 2 transistor**. Như mở két nhà băng, manager + supervisor cùng cắm chìa.
- **OR**: 1 input là 1 → output 1. Ẩn dụ: **song song 2 transistor**. Nhiều đường, 1 đường thông là OK.
- **NOT (Inverter)**: 1 → 0, 0 → 1. Flip state.
- **XOR**: 2 input **khác nhau** → 1. Máy "detect difference". Vũ khí để cộng nhị phân.

### 2.3 Logic gate làm phép cộng

<BinaryAdditionRulesDemo />

Vậy ghép XOR (sum bit) + AND (carry) = mạch cộng 1-bit, gọi là **Half Adder**.

<HalfAdderDemo />

Nhưng Half Adder bị bug: chỉ 2 input port (A, B).

Tưởng cộng cột thập phân (`19 + 22`):
- **Hàng đơn vị**: `9+2=11`, viết 1 nhớ 1. 2 input OK.
- **Hàng chục**: phải cộng `1+2` + **carry 1 từ hàng đơn vị** = `1+2+1=4`. Tức ngoài bit thấp nhất, các bit khác là cộng **3 số**!

Half Adder không có cổng "Carry-in", chỉ dùng được bit thấp nhất. Cần **Full Adder** nhận 3 signal:

<FullAdderDemo />

Cascade nhiều Full Adder → cộng nhiều bit:

<AdderChainDemo />

::: tip Phân tích adder
1. **Half Adder**: cộng 2 bit. Tính sum + carry, không nhận carry-in.
2. **Full Adder**: bit middle cần A + B + Carry-in. Thêm logic carry-in → Full Adder.
3. **Ripple Carry Adder**: xử 32/64 bit, cascade chục Full Adder. Carry signal lan như sóng từ bit thấp lên cao.
:::

<CompleteAdderDemo />

---

## 3. Functional unit: ghép logic gate

Với logic gate trong tay, lên layer cao hơn. Cộng không đủ, ta đóng gói thành **Functional Unit**.

### 3.1 Phân loại module

| Module | Sứ mệnh | Cấu tạo logic | Ẩn dụ |
| -------------- | ------------------------------------ | ------------------------------------ | -------------------- |
| **Adder** | Số học | Cascade Full Adder | Bàn tính không mỏi |
| **MUX (Multiplexer)** | Control data flow, multi-to-one | AND làm switch + OR aggregate | Đường ray xe lửa chuyển hướng |
| **Decoder** | Giải binary instruction | Gate array light up specific output | Người dịch điện mật |
| **Flip-Flop** | Vượt tính phù du điện, nhớ history | Feedback loop bistable | Bập bênh giữ trạng thái |

<FunctionalUnitDemo />

<RegisterDemo />

### 3.2 Register: lưu data

Ngoài tính, máy cần nhớ data tạm hoặc lâu. Mất trí nhớ giây trước = không tính được. Khả năng này nhờ **Flip-Flop**.

::: tip Memory là loop
Đa số mạch logic signal flow forward (feed-forward). Để có "memory" liên tục, các thiên tài thiết kế: **output feed lại input**.

Như bập bênh 2 điểm static stable. Không bị ngoại lực → loop tự khoá ở "trái cao phải thấp" (nhớ 0) hoặc ngược (nhớ 1). State thay đổi tức thời cũng được loop khoá lại "deep".

Sắp 32 hoặc 64 flip-flop thành 1 hàng, apply clock signal đồng bộ → **Register** ra đời. Là "scratch pad" tốc độ cao của CPU, giữ mọi biến critical instant.
:::

<FlipFlopDemo />

---

## 4. CPU Architecture: từ functional unit đến processor

### 4.1 Các component CPU

- **ALU (Arithmetic Logic Unit)**: làm việc, cộng/trừ/nhân/chia + logic
- **Register File**: ngăn kéo tạm bàn làm việc, nhỏ nhưng cực nhanh
- **Internal Bus**: băng chuyền chuyển data + signal giữa module
- **Control Unit**: tổng chỉ huy. Đọc instruction binary từ memory, parse, gửi control signal điều phối module

<MinCpuDemo />

### 4.2 CPU thực thi instruction thế nào?

Mọi high-level code cuối cùng thành instruction trong memory. CPU execute instruction lặp 4 step:

1. **Fetch**: theo program counter, đọc từ memory/cache instruction tiếp
2. **Decode**: phân tích — instruction này move memory, hay gọi ALU?
3. **Execute**: gửi instruction tới ALU hoặc unit khác, thực hiện logic
4. **Write Back**: viết kết quả về register hoặc memory

<CpuArchitectureDemo />

::: tip Đỉnh hiệu quả: Pipeline
Nếu phải chờ instruction trước qua hết 4 step mới bắt instruction sau, hiệu quả thấp.

Như dây chuyền nhà máy, chip engineer dùng **Instruction Pipeline**. Khi mạch 1 đang "execute" A, mạch trước đó "decode" B, mạch trước nữa "fetch" C. Parallel overlap → CPU efficiency tăng vọt.
:::

---

## 5. Tổng kết: vượt layer abstraction

Đường đi của abstraction:

1. **Vật lý vĩ mô: cát (SiO2 crystal)** → tinh chế, slice, etch
2. **Vật lý vi mô: vài tỷ transistor switch** (điện điều khiển điện)
3. **Đại số digital: AND/OR/NOT** (truth table)
4. **Microarchitecture module: adder + functional unit**
5. **Architecture phức tạp: CPU array**
6. **Vương quốc app: algorithm + system software + Internet**

Mỗi layer encapsulation **ẩn hoàn hảo complexity layer dưới**. Khi bạn viết `salary = base + bonus`, không cần biết electron drift; chip designer cũng không cần biết tương lai chạy software gì.

::: tip Suy nghĩ cuối
**Computation cuối cùng = vài tỷ switch trong không gian kín reorganize. Theo nhịp clock, trên 1 chip Si nhỏ, hoàn thành tính toán phức tạp.**

"Số lượng đổi chất" — câu này luôn đúng trong computer architecture. Khi gõ keyboard, nhìn màn hình, hãy tưởng tượng: trong silicon vi mô, vài tỷ transistor đang phối hợp với tốc độ ánh sáng. Đây là vẻ đẹp đặc trưng của computer science.
:::

::: tip 2026 update
- **3nm + 2nm process**: TSMC, Samsung, Intel cạnh tranh
- **Chiplet architecture**: AMD, Apple ghép nhiều die nhỏ
- **NPU (Neural Processing Unit)**: chip cho AI inference, Apple M-series, Qualcomm
- **Quantum computing**: IBM, Google, đang ở "NISQ" era
- **VN dev**: hiểu CPU architecture giúp tối ưu performance JS/Python; biết cache line, branch prediction
:::

---

## Tài liệu

- [Computer Organization and Design (Patterson & Hennessy)](https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6) - kinh điển
- [Nand to Tetris](https://www.nand2tetris.org/) - tự build CPU từ NAND
- [Ben Eater 8-bit CPU](https://eater.net/8bit) - YouTube series build CPU
- [Crafting Interpreters](https://craftinginterpreters.com/)
