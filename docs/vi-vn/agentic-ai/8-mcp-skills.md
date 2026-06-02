---
title: 'Chương 8 — MCP, Skills & Code Execution'
description: 'Model Context Protocol (3 primitive, JSON-RPC), Agent Skills (SKILL.md + progressive disclosure), code execution with MCP — kèm code đầy đủ build MCP server cho KiotViet, ví dụ SKILL.md, và cơ hội blue ocean cho stack Việt Nam.'
---

# Chương 8 — MCP, Skills & Code Execution

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🔌</p>

::: tip 🔥 Thực chiến — 30 giây
Muốn agent nối thẳng vào KiotViet/Pancake/MISA? Viết **1 MCP server**, mọi agent xài được. Mà mấy hệ này ở VN *chưa ai* làm MCP chính thức.
**💸 Ăn tiền ở đâu:** build lớp kết nối đó = moat kỹ thuật, bán bản hosted cho agency/dev VN.
:::

> **MCP là "USB-C cho AI": một chuẩn cắm là agent dùng được mọi tool.**
> **Với dev VN: phần lớn phần mềm nội địa *chưa có* MCP — đó là blue ocean.**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Hiểu MCP giải bài toán N×M thế nào + 3 primitive.
- **Code một MCP server** (KiotViet) chạy được.
- Viết một **`SKILL.md`** đúng chuẩn progressive disclosure.
- Hiểu **code execution with MCP** tiết kiệm token cực lớn.
:::

---

## 01 · MCP là gì?

Trước MCP: mỗi agent muốn nối M tool phải viết tích hợp riêng → **N agent × M tool = N×M** đoạn code.

**MCP (Model Context Protocol)** — chuẩn mở của Anthropic (11/2024): agent nối tool/dữ liệu qua **server** theo giao thức chung. N×M sụp xuống **N+M**: viết một MCP server, mọi agent dùng được.

::: tip 🔑 Quy mô (giữa 2026, đã kiểm chứng)
- **97 triệu lượt tải SDK/tháng** (Python + TS) — Anthropic công bố 12/2025.
- MCP **chuyển cho Linux Foundation** (lập **Agentic AI Foundation**, 12/2025; đồng sáng lập Anthropic, Block, OpenAI).
> ⚠️ Vài con số lan truyền ("970x tăng trưởng", "78% doanh nghiệp dùng MCP") **không nguồn đáng tin** — đừng trích. Khảo sát thực (Stacklok 2026): ~41% tổ chức phần mềm dùng MCP ở mức nào đó.
:::

---

## 02 · 3 primitive (đa số tutorial chỉ dạy 1)

::: tip 🔑 Tools · Resources · Prompts
1. **Tools** — hàm agent **gọi để hành động** (vd `create_order`).
2. **Resources** — dữ liệu agent **đọc** (vd file, bản ghi DB) — như "GET".
3. **Prompts** — mẫu prompt/quy trình **tái dùng** server cung cấp.
:::

---

## 03 · Kiến trúc

MCP dùng **JSON-RPC 2.0** (không phải REST) qua: **stdio** (local), **SSE / Streamable HTTP** (remote).
```
┌──────────────┐   JSON-RPC 2.0   ┌──────────────┐
│  MCP Client  │◄────────────────►│  MCP Server  │
│ (Claude Code,│   tools/call     │ (KiotViet,   │
│  Cursor, app)│   resources/read │  MISA, ...)  │
└──────────────┘                  └──────────────┘
```

---

## 04 · Build MCP server (code đầy đủ, giải thích)

Một MCP server cho "shop" bằng TypeScript SDK:
```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "shop-mcp", version: "1.0.0" });

// ── TOOL: tạo đơn ──────────────────────────────
server.tool(
  "create_order",                                   // tên (namespace rõ)
  "Tạo đơn hàng mới. Dùng khi khách chốt mua.",     // description kiểu onboarding (Ch4)
  { sku: z.string(), qty: z.number().int().positive(), phone: z.string() }, // schema (Zod)
  async ({ sku, qty, phone }) => {                  // handler
    const order = await db.createOrder({ sku, qty, phone });
    return { content: [{ type: "text",
      text: `Đã tạo đơn ${order.id} cho ${phone}: ${qty}x ${sku}` }] };
  }
);

// ── RESOURCE: đọc tồn kho (URI template → dùng ResourceTemplate) ──
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
server.resource("stock", new ResourceTemplate("stock://{sku}", { list: undefined }),
  async (uri, { sku }) => ({                         // sku lấy từ template, không phải cả uri
    contents: [{ uri: uri.href, text: JSON.stringify(await db.getStock(sku)) }]
  }));

await server.connect(new StdioServerTransport());   // chạy qua stdio
```
| Phần | Vai trò |
|---|---|
| `server.tool(name, desc, schema, handler)` | Khai báo 1 tool: tên + mô tả + schema Zod + hàm chạy |
| `z.string()`, `z.number().int().positive()` | Validate input — agent gửi sai kiểu bị chặn |
| `server.resource(...)` | Dữ liệu chỉ-đọc (GET-like) |
| `StdioServerTransport` | Kênh giao tiếp local; remote dùng HTTP |

→ Cắm server này vào Claude Code/Cursor là agent dùng được ngay.

---

## 05 · Agent Skills — đóng gói "tri thức quy trình"

**Agent Skill** = một **thư mục** chứa **`SKILL.md`** (+ script/tài nguyên kèm), agent **tự phát hiện & nạp khi cần**.

```markdown
---
name: xu-ly-doi-tra
description: Quy trình xử lý yêu cầu đổi/trả hàng cho shop ABC.
  Dùng khi khách muốn đổi size, trả hàng, hoặc khiếu nại chất lượng.
---

# Quy trình đổi/trả

1. Xác minh đơn qua `lookup_order`.
2. Kiểm tra trong 7 ngày + còn tag không.
3. Nếu đủ điều kiện → tạo phiếu đổi/trả, hướng dẫn khách gửi về.
4. Nếu không → giải thích lịch sự, đề xuất phương án khác.

Xem thêm: ./mau-phieu.md (chỉ mở khi cần tạo phiếu)
```

::: tip 🔑 Progressive disclosure (3 tầng)
1. **Tầng 1 — metadata** (`name` + `description`) nạp sẵn: agent chỉ *biết skill tồn tại* (rẻ).
2. **Tầng 2 — thân `SKILL.md`** chỉ đọc *khi* task khớp.
3. **Tầng 3 — file kèm** (`mau-phieu.md`) chỉ mở khi cần.
:::
→ Giữ context gọn mà chiều sâu gần **vô hạn**. Skill **portable** (Claude.ai, Claude Code, Agent SDK). *Skill = quy trình; Tool = thao tác; MCP = nối hệ thống — bổ trợ nhau.*

---

## 06 · Code Execution with MCP — mẹo tiết kiệm token

Vấn đề: nối agent tới **hàng nghìn tool** → nạp hết định nghĩa ngốn hàng trăm nghìn token *trước khi* đọc yêu cầu; kết quả trung gian chảy qua context nhiều lần.

**Giải pháp Anthropic:** trình bày mỗi MCP tool như **file code trong filesystem**; agent **viết code** import & gọi tool trong sandbox, chỉ đọc định nghĩa nó cần.
```
❌ Truyền thống: nạp 1000 định nghĩa tool → ~150k token trước khi làm gì
✅ Code-exec:   agent đọc file servers/kiotviet/createOrder.ts khi CẦN
                → lọc dữ liệu trong sandbox → chỉ trả kết quả gọn
```
::: tip 💸 Tiết kiệm khủng
Ví dụ Anthropic: workflow Google Drive → Salesforce giảm **~150.000 → ~2.000 token (giảm 98,7%)**. Đánh đổi: cần **sandbox an toàn** (giới hạn tài nguyên, giám sát).
:::

---

## 07 · A2A — agent nói chuyện với agent

**A2A (Agent2Agent)** — chuẩn mở (Google 4/2025; chuyển Linux Foundation 6/2025): agent **khám phá & giao việc** cho agent khác xuyên tổ chức (qua Agent Cards, Tasks, JSON-RPC).
> Phân vai: **MCP** nối agent↔**tool/dữ liệu**; **A2A** nối agent↔**agent**. Bổ trợ.

---

## 08 · 🇻🇳 Blue ocean — MCP cho stack Việt Nam

::: warning 💡 Cơ hội thực
Phần lớn phần mềm VN **chưa có MCP server chính thức**: MISA, KiotViet, Sapo, Haravan, Pancake, Base.vn... Ai build trước, lớp kết nối đó thành **moat**:
- Mô hình: open-source MCP server (free) + bản **hosted trả phí** (auth, uptime, support).
- Đăng ký lên registry (Smithery...) để agent toàn cầu thấy.
- Bán cho agency/dev VN đang cần nối agent vào hệ thống khách.
:::

---

## 09 · 🧪 Lab: MCP server KiotViet (giả lập)

::: tip Bài thực hành (90 phút) — code
1. Dựng MCP server 3 tool: `list_products`, `check_stock`, `create_order` (giả lập DB).
2. Validate input bằng **Zod**; description kiểu onboarding ([Chương 4](./4-tool-design.md)).
3. Thêm 1 **resource** đọc thông tin shop.
4. Cắm vào Claude Code, thử: *"còn áo SKU A123 không? Còn thì tạo đơn cho 0901234567."*
5. (Nâng cao) Error "chỉ đường" khi SKU sai.
```ts
server.tool("check_stock", "Kiểm tra tồn kho theo SKU.",
  { sku: z.string() },
  async ({ sku }) => {
    const n = await db.stock(sku);
    if (n === undefined) return { content: [{ type: "text",
      text: `SKU '${sku}' không tồn tại. Hỏi lại khách mã đúng (vd A123).` }] };
    return { content: [{ type: "text", text: `${sku}: còn ${n}` }] };
  });
```
**Tiêu chí đạt:** agent tự chuỗi check_stock → create_order qua MCP server của bạn.
:::

---

## 10 · Bài tập

1. Thêm **resource** `policy://doi-tra` trả chính sách đổi trả; thử để agent tự đọc khi khách hỏi.
2. Viết một `SKILL.md` cho "lên đơn livestream" (gói quy trình + file mẫu tin nhắn chốt đơn).

::: details 👉 Lời giải mẫu
1. `server.resource("policy", new ResourceTemplate("policy://{loai}", {list: undefined}), async (uri,{loai}) => ({ contents:[{ uri: uri.href, text: await db.policy(loai) }] }))`. Agent tự đọc khi khách hỏi "đổi trả thế nào".
2. `SKILL.md` frontmatter: `name: len-don-livestream`, `description: Quy trình chốt đơn khi live — dùng khi khách comment "chốt"/"lấy"`. Thân: xác nhận mã SP + size + SĐT → tạo đơn → gửi tin xác nhận. Kèm `./mau-tin-chot.md` (tầng 3, mở khi cần).
:::

---

## 11 · Kiểm tra nhanh

1. MCP giải bài toán N×M thế nào?
2. 3 primitive của MCP?
3. Progressive disclosure trong Agent Skills là gì?
4. Code execution with MCP tiết kiệm token bằng cách nào?
5. MCP vs A2A khác vai trò?

::: details 👉 Gợi ý đáp án
1. Một MCP server dùng chung cho mọi agent → N×M thành N+M.
2. Tools (hành động), Resources (đọc), Prompts (mẫu).
3. Nạp dần: metadata → thân SKILL.md → file kèm, chỉ khi cần.
4. Trình bày tool như code; agent viết code gọi trong sandbox, lọc dữ liệu trước khi trả về context.
5. MCP nối agent↔tool/dữ liệu; A2A nối agent↔agent.
:::

---

## 12 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- **MCP** = chuẩn mở agent↔tool; 3 primitive **Tools/Resources/Prompts** (đã có code server).
- **Agent Skills** đóng gói quy trình, nạp dần (đã có `SKILL.md` mẫu).
- **Code execution with MCP** tiết kiệm token cực lớn (sandbox).
- **VN**: build MCP cho MISA/KiotViet/Pancake là cơ hội thật.
:::

Bạn đã có đủ mảnh ghép. Chương sau: khi nào nên kéo framework (LangGraph/CrewAI/SDK) và chọn cái nào.

→ [**Chương 9 — Frameworks & Tooling**](./9-frameworks-tooling.md)

---

<ChapterVideos :videos="[
  { id: 'GuTcle5edjk', title: 'you need to learn MCP RIGHT NOW!! (Model Context Protocol)', channel: 'NetworkChuck', why: 'Explainer MCP view cao nhất + hands-on chạy/build MCP server. (2025, 1.5M view)' },
  { id: '7j_NE6Pjv-E', title: 'Model Context Protocol (MCP), clearly explained (why it matters)', channel: 'Greg Isenberg', why: 'Vì sao MCP quan trọng — góc nhìn khái niệm, dễ vào. (2025, 1.3M view)' }
]" />
