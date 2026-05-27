# Thách thức của Distributed Systems

::: tip Mở đầu
**Khi 1 máy không đủ, vấn đề mới bắt đầu.** Distributed system = nền tảng Internet hiện đại — từ chat Zalo đến order Shopee, đằng sau là vài trăm máy cộng tác. Nhưng "distributed" không miễn phí, mang theo loạt thách thức mà single-machine chưa gặp.
:::

**Bạn sẽ học**:
- **Core theorem**: CAP + ảnh hưởng design
- **Consistency models**: strong, eventual, causal
- **8 challenges**: core difficulties
- **Consensus algorithms**: Paxos, Raft
- **Practical patterns**: 2PC, Saga, CRDT

| Chương | Nội dung |
|-----|------|
| **1** | Sao cần distributed |
| **2** | CAP theorem |
| **3** | Consistency models |
| **4** | 8 challenges |
| **5** | Consensus algorithms |
| **6** | Distributed transaction |

---

## 0. Toàn cảnh: sao cần distributed?

Single-machine đơn giản đáng tin, nhưng 3 bottleneck không vượt:

| Bottleneck | Note | Distributed giải |
|------|------|-------------|
| Perf ceiling | CPU, RAM, disk physical limit | Horizontal scale: thêm máy |
| Single point of failure | 1 máy chết, cả service chết | Redundant replica |
| Geographic latency | User toàn cầu, 1 máy 1 chỗ | Multi-site deploy gần user |

::: tip Cost distributed
Distributed giải vấn đề trên, nhưng mang complexity mới: network unreliable, clock asynchronous, partial failure, data consistency...

**Peter Deutsch's 8 Fallacies of Distributed Computing** — các giả định **sai** trong distributed:
1. Network reliable
2. Latency = zero
3. Bandwidth = infinite
4. Network secure
5. Topology không đổi
6. Chỉ 1 admin
7. Transport cost = zero
8. Network homogeneous
:::

---

## 1. CAP theorem: "tam giác bất khả"

2000, Eric Brewer đưa ra CAP conjecture (sau chứng minh = theorem): distributed system tối đa thoả 2/3 properties:

| Property | Nghĩa | Plain |
|------|------|---------|
| **C**onsistency | Mọi node cùng lúc thấy same data | ATM nào cũng cùng balance |
| **A**vailability | Mỗi request nhận response non-error | System luôn respond, không "unavailable" |
| **P**artition tolerance | Network partition vẫn run | Cáp đứt 1 phần, system vẫn work |

<CAPTheoremDemo />

### Sao chỉ 2/3?

Trong distributed, network partition (P) không tránh được — cáp quang bị cuốc, switch fail, DC mất net. P = bắt buộc, thực tế chọn giữa C + A:

- **Chọn CP**: partition → reject request không chắc, giữ data đúng → finance, inventory
- **Chọn AP**: partition → tiếp tục serve, data có thể tạm khác → social, content

::: tip CAP không black-white
System thật không "CP hoặc AP" đơn giản. Nhiều system khác op khác choice — vd cùng DB, read = AP (cho đọc data cũ), write = CP (yêu cầu majority confirm).
:::

---

## 2. Consistency models: "strictness" của data sync

Consistency không switch (có/không), mà spectrum.

<ConsistencyModelsDemo />

| Model | Guarantee | Latency | Use |
|------|------|------|---------|
| Strong | Đọc = giá trị write mới nhất | Cao (đợi sync) | Banking, inventory |
| Eventual | Cuối mọi replica = nhau, middle có thể đọc cũ | Thấp (write return ngay) | Social, DNS |
| Causal | Op có causality giữ order | Trung | Comment reply, collab edit |
| Linearizable | Mọi op như serial single-machine | Cao nhất | Distributed lock, leader election |
| Session | Trong session đảm bảo read own writes | Thấp-trung | User personal data |

::: tip "Read Your Own Writes" consistency
Need thực tế nhất: user sửa data của mình → mình thấy update ngay (user khác có thể trễ). Đây là enhancement của eventual consistency.
:::

---

## 3. 8 challenges

<DistributedChallengesDemo />

### Quan hệ giữa các challenges

8 challenges không độc lập, mà liên quan:

- **Network unreliable** → **Network partition** → **CAP trade-off**
- **Clock async** → **Event ordering khó** → **Data consistency**
- **Partial failure** → có thể **Split brain** → cần **Consensus**
- **Data consistency** → cần **Distributed transaction** → bị ảnh hưởng **Network unreliable**

::: tip No silver bullet
Distributed không có solution "hoàn hảo", chỉ "phù hợp". Hiểu essence challenges = design đúng trade-off.
:::

---

## 4. Consensus algorithms

Core distributed: multi-node agree về 1 value? Dù 1 phần node fail hoặc network trễ.

### 4.1 Paxos

Leslie Lamport 1990, algorithm đầu tiên proven correct.

| Role | Job |
|------|------|
| Proposer | Propose value |
| Acceptor | Vote accept/reject |
| Learner | Học value chosen cuối |

**2-phase flow**:
1. **Prepare**: Proposer send proposal number, Acceptor commit không accept number nhỏ hơn
2. **Accept**: Proposer send value, majority Acceptor accept → through

::: tip Vấn đề Paxos
Paxos correct nhưng nổi tiếng khó hiểu + implement. Lamport's paper dùng metaphor Greek parliament, làm nhiều người confused hơn.
:::

### 4.2 Raft: vì understandability

2014 Diego Ongaro đưa Raft, target "Paxos dễ hiểu". Chia consensus thành 3 sub-problem:

| Sub | Note |
|--------|------|
| Leader election | Chọn 1 Leader, mọi write qua Leader |
| Log replication | Leader replicate log đến Follower |
| Safety | Đảm bảo log committed không bị overwrite |

**Raft core flow**:
1. Start, mọi node = Follower
2. Follower timeout không nhận heartbeat → Candidate, start election
3. Candidate được majority vote → New Leader
4. Leader receive client request, replicate log đến majority → commit

### 4.3 Compare

| Algorithm | Year | Understandability | Systems |
|------|---------|---------|---------|
| Paxos | 1990 | Khó | Google Chubby |
| Raft | 2014 | Dễ | etcd, Consul, TiKV |
| ZAB | 2011 | Trung | ZooKeeper |
| EPaxos | 2013 | Khó | Academic |

---

## 5. Distributed transaction: cross-node "all-or-nothing"

Single-DB transaction dùng local lock + log đảm bảo ACID. Nhưng business op span nhiều service/DB, atomicity thế nào?

### 5.1 Two-Phase Commit (2PC)

Protocol kinh điển, 2 phase:

| Phase | Coordinator | Participant |
|------|-----------|-----------|
| Prepare | Hỏi mọi participant "commit được?" | Execute op nhưng không commit, reply Yes/No |
| Commit | Yes hết → send Commit | Commit thật; có No → rollback hết |

**Vấn đề 2PC**:
- **Blocking**: sau Prepare, coordinator chết → participant đợi mãi
- **Single point of failure**: coordinator chết → transaction kẹt
- **Perf kém**: multi-round trip, lock hold lâu

### 5.2 Saga

Saga chia 1 big transaction thành nhiều local transaction, mỗi cái có compensating op. 1 step fail → execute compensation ngược.

**E-commerce order Saga**:

| Step | Forward | Compensation |
|------|---------|---------|
| T1 | Tạo order (pending) | Cancel order |
| T2 | Trừ stock | Restore stock |
| T3 | Trừ balance | Refund balance |
| T4 | Confirm order (paid) | — |

T3 fail → C2 (restore stock) → C1 (cancel order).

**2 orchestration**:
- **Choreography**: mỗi service listen event, tự quyết next. Đơn giản nhưng global state khó track
- **Orchestration**: central coordinator control flow. Rõ nhưng coordinator single point

### 5.3 TCC (Try-Confirm-Cancel)

TCC = 2PC business layer, mỗi op 3 phase:

| Phase | Note | Vd (trừ stock) |
|------|------|---------------|
| Try | Reserve resource, không execute thật | Freeze 10 stock |
| Confirm | Confirm execute, consume reserved | Frozen -10 (trừ thật) |
| Cancel | Cancel reservation | Frozen -10, available +10 |

### 5.4 Comparison

| Solution | Consistency | Perf | Complexity | Use |
|------|--------|------|--------|---------|
| 2PC | Strong | Thấp | Trung | DB level cross-DB |
| Saga | Eventual | Cao | Cao | Long process (order, logistics) |
| TCC | Eventual | Trung | Cao nhất | Money-related, high reliability |

::: tip Recommendation
- Single-DB transaction được → đừng distributed
- Đa số scenario Saga + MQ đủ
- TCC cho consistency cực cao (banking) nhưng dev cost cao
- 2PC cho DB middleware (ShardingSphere) handle tự động
:::

---

## Tổng kết

Distributed system = infrastructure Internet hiện đại, nhưng complexity vượt single-machine. Hiểu challenges không phải "giải", mà design trade-off đúng.

1. **CAP**: network partition không tránh được, trade-off C ↔ A
2. **Consistency**: strong → eventual = spectrum, theo business need
3. **8 challenges**: network unreliable, clock async, partition, split brain liên quan nhau
4. **Consensus**: Raft thực tế nhất, etcd/Consul base
5. **Distributed transaction**: Saga đa số, TCC cho banking, 2PC cho DB

::: tip 2026 cho VN dev
- **VN context**:
  - Banking VN dùng 2PC + Oracle XA
  - E-commerce VN dùng Saga + Kafka/RabbitMQ
  - Startup dùng eventual consistency + retry
- **Modern tools 2026**:
  - **etcd / Consul**: service discovery + config dùng Raft
  - **Temporal.io**: durable workflow, simplify Saga implementation
  - **CockroachDB / TiDB**: distributed SQL, hide complexity từ dev
  - **ScyllaDB / Cassandra**: AP-leaning NoSQL
- **AI scenario**: LLM-based agent state coordination cần distributed consensus (multi-agent system)
:::

## Tài liệu

- [Designing Data-Intensive Applications](https://dataintensive.net/)
- [Raft Consensus](https://raft.github.io/)
- [CAP Twelve Years Later](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)
- [Jepsen](https://jepsen.io/)
- [Patterns of Distributed Systems (Martin Fowler)](https://martinfowler.com/articles/patterns-of-distributed-systems/)
