---
title: 'Chương 7 — Multi-Agent Systems'
description: 'Tranh luận Cognition vs Anthropic về multi-agent, mô hình Manager (agents-as-tools) vs Decentralized (handoffs), orchestrator-workers và chi phí ~15x token — kèm code Python và lab research đối thủ VN.'
---

# Chương 7 — Multi-Agent Systems

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">👥</p>

::: tip 🔥 Thực chiến — 30 giây
*"Cho 5 con agent bàn nhau cho xịn!"* → hệ mong manh, đốt **~15× token**, mà chưa chắc tốt hơn 1 agent. Chương này dạy *khi nào* mới nên nhiều agent.
**💸 Ăn tiền ở đâu:** biết lúc nào KHÔNG dùng multi-agent = tiết kiệm cả đống tiền cho khách.
:::

> **Đây là chủ đề bị hiểu sai nhiều nhất. Tin tốt: ngành đã có câu trả lời rõ sau cuộc tranh luận lớn Cognition vs Anthropic (2025).**

::: tip 🎯 Sau chương này bạn sẽ **làm được**
- Hiểu **kết luận** của cuộc tranh luận "có nên multi-agent".
- Phân biệt + **code** Manager (agents-as-tools) vs Decentralized (handoffs).
- **Code một orchestrator-workers** thật.
- Có khung quyết định khi nào dùng, khi nào đừng (token ~15x).
:::

---

## 01 · Cuộc tranh luận lớn (6/2025)

::: warning 🥊 Hai phe
**Cognition — "Đừng build Multi-Agents":** multi-agent hiện tại tạo hệ **mong manh** — agent khó giữ mạch hội thoại dài, dễ "lạc nhau". Đề xuất: **một agent đơn luồng** + một LLM nén context. Châm ngôn: *"context engineering là việc số 1."*

**Anthropic — "Cách chúng tôi build hệ multi-agent research":** một **lead agent** sinh **3–5 sub-agent song song**, mỗi cái context riêng, cộng bước trích dẫn cuối. Kết quả: **+90.2%** vs single Opus — nhưng tốn **~15x token**.
:::

---

## 02 · Kết luận đã hội tụ

::: tip 🔑 Consensus 2026 — học thuộc
**Một agent chính sở hữu toàn bộ ngữ cảnh, sinh ra các sub-agent *tạm thời, chỉ-đọc* cho tác vụ con tách biệt; sub-agent trả về **một chuỗi tóm tắt** — KHÔNG chat ngang hàng, KHÔNG chia sẻ state thay đổi.**
- **Single-agent** cho việc **tuần tự** (vd coding): một agent giữ mạch.
- **Multi-agent** chỉ cho việc **song song, đọc nhiều** (vd research) — nơi *chấp nhận trả token* đổi tốc độ/độ bao phủ.
:::

<AgentMultiToolPrinciple />

---

## 03 · Hai kiểu phối hợp (kèm code)

### A. Manager — "agents-as-tools"
Một **manager** điều phối agent chuyên biệt **qua lời gọi tool**, rồi **tổng hợp**.
```python
def manager(yeu_cau):
    # manager tự quyết gọi "agent con" nào (chúng là tool)
    return llm(yeu_cau, tools=[agent_research, agent_viet, agent_thiet_ke])
    # mỗi agent_* bên trong là một run_agent riêng → trả kết quả cho manager
```
```
        ┌─────────────┐
User ──►│   Manager   │  (gọi như tool) ──► [A] [B] [C] ──► tổng hợp ──► User
        └─────────────┘
```
> **Dùng khi:** muốn **một** agent kiểm soát luồng + giữ mạch với user.

### B. Decentralized — "handoffs"
Agent **ngang hàng**; một agent **trao quyền (handoff)** hẳn cho agent khác (chuyển một chiều).
```python
def triage(msg):
    loai = llm(f"Phân loại: HOAN_TIEN / KY_THUAT\n{msg}")
    if loai == "HOAN_TIEN": return refund_agent(msg)   # handoff: giao hẳn
    return tech_agent(msg)
```
> **Dùng khi:** **triage**, không cần bộ não trung tâm tổng hợp.

::: tip 🧩 Cả hai là đồ thị
Agent = node. Manager → cạnh là **tool call**; Decentralized → cạnh là **handoff**.
:::

---

## 04 · Orchestrator-Workers & chi phí thật (code)

Pattern phổ biến nhất production: orchestrator chia việc **động**, workers chạy **song song**, orchestrator tổng hợp.
```python
import asyncio

async def orchestrator(de_bai):
    subtasks = llm(f"Chia '{de_bai}' thành các việc con độc lập").split("\n")  # ĐỘNG
    # workers chạy SONG SONG, mỗi worker context riêng (chỉ-đọc)
    ket_qua = await asyncio.gather(*[worker(t) for t in subtasks])
    return llm("Tổng hợp báo cáo từ:\n" + "\n".join(ket_qua))     # SYNTHESIZE

async def worker(task):
    return await llm_async(f"Làm việc này, trả tóm tắt 5 gạch đầu dòng: {task}")
```

::: warning 💸 Chi phí: ~15x token
Hệ research Anthropic dùng **~15x token** so một lượt chat (token budget giải thích ~80% chênh hiệu năng). → Multi-agent **chỉ đáng** khi giá trị bài toán đủ lớn. Mẹo: orchestrator dùng model mạnh (Sonnet/Opus), workers dùng model rẻ (**Haiku**) → cắt 40%+ chi phí.
:::

<AgentTaskFlowDemo />

---

## 05 · Sub-agent & cô lập ngữ cảnh

Lợi ích lớn nhất của sub-agent **không** phải "nhiều cho oai" mà là **cô lập ngữ cảnh**: mỗi sub-agent khảo sát trong context **sạch riêng**, chỉ trả **tóm tắt cô đọng** → giữ context chính gọn ([Chương 5](./5-context-engineering.md)).

---

## 06 · Khung quyết định

```
Việc SONG SONG hoá được không (đọc nhiều, ít phụ thuộc)?
 ┌─┴──┐
KHÔNG  CÓ
 │      │
 ▼      ▼
SINGLE  Giá trị bài toán có đáng ~15x token?
agent    ┌┴───┐
+context CÓ    KHÔNG
eng.     │      │
         ▼      ▼
      MULTI   SINGLE
```
::: warning 🚨 3 sai lầm
1. **Vội multi-agent** khi single chưa tối ưu → phức tạp vô ích.
2. **Cho sub-agent chat ngang hàng + sửa state chung** → mong manh, khó debug.
3. **Quên token cost** → hoá đơn gấp chục lần.
:::

---

## 07 · 🧪 Lab: research đối thủ shop VN (orchestrator + workers)

::: tip Bài thực hành (60–90 phút) — code
```python
async def research_doi_thu(nganh="trà sữa HN"):
    # orchestrator chia việc động
    doi_thu = llm(f"Liệt kê 3 đối thủ lớn ngành {nganh}, mỗi dòng 1 tên").split("\n")
    # 3 worker SONG SONG, mỗi cái research 1 đối thủ trong context riêng
    bao_cao = await asyncio.gather(*[
        worker(f"Research {d}: giá, menu nổi bật, điểm mạnh/yếu. Tóm tắt 5 ý.")
        for d in doi_thu])
    # orchestrator tổng hợp SWOT
    return llm("Viết bảng SWOT tổng từ:\n" + "\n".join(bao_cao))

print(asyncio.run(research_doi_thu()))
```
**Đo:** tổng token + so với làm tuần tự bằng 1 agent.
**Tiêu chí đạt:** thấy rõ đánh đổi token↔tốc độ; mỗi worker context tách biệt, trả tóm tắt (chỉ-đọc).
:::

---

## 08 · Bài tập

1. Đổi lab trên cho workers dùng **Haiku**, orchestrator dùng **Sonnet** — đo chênh chi phí.
2. Một dev định cho 3 agent "chat qua lại bàn bạc" để chốt giá. Theo consensus mục 02, vì sao đây là ý tồi? Thiết kế lại.

::: details 👉 Gợi ý câu 2
Sub-agent chat ngang hàng + sửa state chung = mong manh (đúng cảnh báo Cognition). Thiết kế lại: 1 agent chính giữ context, sinh sub-agent chỉ-đọc trả tóm tắt, agent chính tự chốt.
:::

---

## 09 · Kiểm tra nhanh

1. Kết luận hội tụ của cuộc tranh luận multi-agent?
2. Manager vs Decentralized khác nhau ở đâu (cạnh đồ thị là gì)?
3. Multi-agent tốn ~bao nhiêu token so single?
4. Lợi ích chính của sub-agent (ngoài "nhiều")?
5. Khi nào single, khi nào multi?

::: details 👉 Gợi ý đáp án
1. Một agent chính giữ context + sinh sub-agent tạm thời, chỉ-đọc, trả tóm tắt; không chat ngang hàng.
2. Manager: cạnh = tool call, có tổng hợp trung tâm; Decentralized: cạnh = handoff một chiều, không tổng hợp.
3. ~15x.
4. Cô lập ngữ cảnh — giữ context chính gọn.
5. Single cho tuần tự; multi cho song song/đọc nhiều đáng trả token.
:::

---

## 10 · Tóm tắt & đọc tiếp

::: tip 📌 Mang theo
- **Mặc định single-agent.** Multi-agent chỉ cho việc song song đáng ~15x token.
- Mô hình chuẩn: agent chính + **sub-agent tạm thời, chỉ-đọc, trả tóm tắt**.
- **Manager** (agents-as-tools) vs **Decentralized** (handoffs) — đã có code.
- Lợi ích cốt lõi của sub-agent = **cô lập ngữ cảnh**.
:::

Agent cần kết nối thế giới thật theo chuẩn mở. Chương sau: MCP, Agent Skills, code execution.

→ [**Chương 8 — MCP, Skills & Code Execution**](./8-mcp-skills.md)

---

<ChapterVideos :videos="[
  { id: '9FuNtfsnRNo', title: 'I Built the Ultimate Team of AI Agents in n8n With No Code (Free Template)', channel: 'Nate Herk | AI Automation', why: 'Orchestrator điều phối 4 sub-agent — bản build orchestrator-workers cực phổ biến. (2025, 1.1M view)' },
  { id: '1w5cCXlh7JQ', title: 'LangGraph Tutorial - How to Build Advanced AI Agent Systems', channel: 'Tech With Tim', why: 'Code-first LangGraph: hệ stateful/multi-agent (supervisor routing). (2025, 200K view)' }
]" />
