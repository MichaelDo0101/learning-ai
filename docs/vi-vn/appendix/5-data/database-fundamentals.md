# DB Principles (Index / Transaction / Query Optimization)

::: tip 🎯 Core
**Sao Excel query 10s, Shopee search 0.01s?** Khi data từ "vài nghìn" → "vài tỷ", "1 người" → "triệu người concurrent", Excel chết. DB = "super Excel" chuyên cho big data + high concurrency.
:::

---

## 1. Sao cần "DB"?

### 1.1 Từ quán sách nhỏ → Shopee

Quán sách nhỏ, vài ghi sổ:
```
2024-01-15: An mua "Đắc Nhân Tâm" 80k
2024-01-16: Linh mua "Sapiens" 200k
```
Đủ. Nhưng "Shopee" với triệu order/ngày:
- **Volume**: vài tỷ row
- **Concurrent**: vài chục triệu access cùng lúc
- **Relation**: order ↔ user ↔ product ↔ stock ↔ logistics
- **Safety**: mất điện không mất order

| 📓 Excel | 🗄️ DB |
|---------|---------|
| Cá nhân / team nhỏ | Enterprise |
| Vài nghìn row | Tỷ+ |
| 1 người sequential | Triệu concurrent |
| Manual, chậm | ms query |

**DB giải: store hiệu quả, query nhanh, manage safely big data.**

### 1.2 Pit: sao không Excel cho user data

::: warning Story 1 startup
Linh làm social app, đầu dùng Excel store user. 100k user → vấn đề:
- Excel mở 5 phút
- Filter "Hà Nội user" lag
- File corrupt, vài nghìn user data mất vĩnh viễn

Chí mạng: muốn "xem mọi order của 1 user" — user info và order ở Excel khác nhau, phải copy-paste tay, 30 phút mỗi lần.

Senior xem: "Bạn không cần Excel, mà DB."

Đổi DB:
- "Hà Nội user" 0.01s
- JOIN auto user + order
- Auto backup

Bài học: **data nhỏ Excel OK, data lớn = thảm hoạ.**
:::

---

## 2. Core: Table, Row, Column, Primary Key

Ẩn dụ thư viện:

| Concept | 📚 Thư viện | Use | Vd |
|------|-------------|----------|----------|
| **Database** | Cả thư viện | Container mọi data | DB của e-commerce |
| **Table** | Kệ sách | Loại data cùng kiểu | users, products, orders |
| **Column** | Label spine sách | Attribute | name, age, phone |
| **Row** | Mỗi cuốn sách | 1 record | "Hoàng, 25, HCM" |
| **Primary Key** | ISBN mỗi cuốn | ID unique mỗi row | user_id = 1001 |

Vd `users` table:

| user_id (PK) | name | age | city | email |
|:-------------:|------|-----|------|-------|
| 1001 | Hoàng | 25 | HCM | h@example.com |
| 1002 | Linh | 30 | HN | l@example.com |
| 1003 | An | 28 | HCM | a@example.com |

### 2.1 Primary Key: "CCCD" của data

**Đặc điểm**:
- **Unique**: không lặp
- **Not null**: phải có value
- **Immutable**: set xong không sửa

```sql
-- Không PK: sẽ sửa mọi "Hoàng" trong table!
UPDATE users SET age = 26 WHERE name = 'Hoàng';

-- Có PK: precise
UPDATE users SET age = 26 WHERE user_id = 1001;
```

**Golden rule**: mỗi table có PK, không sửa.

### 2.2 Foreign Key: cầu nối table

DB mạnh hơn Excel — **table có relation**.

**users**:
| user_id (PK) | name | phone |
|:-:|---|---|
| 1001 | Hoàng | 0901... |
| 1002 | Linh | 0902... |

**orders**:
| order_id (PK) | product | price | user_id (FK) |
|:-:|---|---|:-:|
| 5001 | iPhone 15 | 25M | 1001 |
| 5002 | MacBook | 50M | 1001 |
| 5003 | AirPods | 5M | 1002 |

`user_id = 1001` trong orders → trỏ user_id = 1001 trong users (Hoàng).

**Lợi**:
- Data không duplicate: Hoàng mua 100 order, info chỉ store 1 lần
- Maintain dễ: đổi phone Hoàng, sửa users, mọi order auto link
- Flexible query

<DatabaseRelationDemo />

---

## 3. Đối thoại với DB: SQL

**SQL (Structured Query Language)** = ngôn ngữ DB. Gần natural English.

### 3.1 CRUD

| Op | EN | SQL | Note |
|------|------|------------|----------|
| **C**reate | Create | `INSERT` | Thêm record |
| **R**ead | Read | `SELECT` | Query |
| **U**pdate | Update | `UPDATE` | Sửa |
| **D**elete | Delete | `DELETE` | Xoá |

### 3.2 SELECT

**Vd 1**: tìm user HCM
```sql
SELECT name, age FROM users WHERE city = 'HCM';
```

**Vd 2**: product 5000-15000
```sql
SELECT name, price FROM products WHERE price BETWEEN 5000 AND 15000;
```

**Vd 3**: fuzzy search
```sql
SELECT name FROM users WHERE name LIKE '%Hoàng%';
```

::: warning ⚠️ Performance trap LIKE
`LIKE '%text%'` → **full table scan**, lớn = cực chậm.

**Optimize**:
- ❌ `LIKE '%text%'` (cả 2 phía %)
- ✅ `LIKE 'text%'` (chỉ sau)

Vì `LIKE 'text%'` dùng được index, `%text%` không.
:::

### 3.3 INSERT

```sql
INSERT INTO users (user_id, name, age, city, email)
VALUES (1004, 'An', 35, 'Đà Nẵng', 'a@example.com');
```

Batch (faster):
```sql
INSERT INTO users (name, age, city) VALUES
('Minh', 25, 'HN'),
('Mai', 28, 'HCM'),
('Khang', 30, 'Đà Nẵng');
```

### 3.4 UPDATE

```sql
UPDATE users SET age = age + 1 WHERE city = 'HCM';
```

::: danger ❌ Đừng quên WHERE!
```sql
-- DANGEROUS: sửa MỌI user age = 26
UPDATE users SET age = 26;

-- Đúng:
UPDATE users SET age = 26 WHERE user_id = 1001;
```

**Lesson real**: 2012, 1 cty nổi tiếng dev quên WHERE → vài triệu user data prod bị sửa nhầm, system down 4h.
:::

### 3.5 DELETE

```sql
DELETE FROM users WHERE user_id = 1004;
```

::: danger ❌ DELETE càng nguy hiểm!
```sql
-- DANGEROUS: xoá CẢ TABLE!
DELETE FROM users;

-- Đúng:
DELETE FROM users WHERE user_id = 1004;
```

**Best practice**:
1. Xoá trước SELECT confirm
2. System quan trọng dùng **soft delete** (`is_deleted` field)
3. Prod op trước backup
:::

### 3.6 JOIN: thời khắc magic

**Scenario**: query "product Hoàng đã mua"

3 table: `users`, `products`, `orders`.

```sql
SELECT u.name, p.name AS product_name, p.price, o.quantity
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN products p ON o.product_id = p.product_id
WHERE u.name = 'Hoàng';
```

**Hiểu JOIN**:
1. `FROM orders o`: từ orders
2. `JOIN users u ON o.user_id = u.user_id`: link user
3. `JOIN products p ON o.product_id = p.product_id`: link product
4. `WHERE u.name = 'Hoàng'`: filter

<SqlPlaygroundDemo />

---

## 4. Sao DB nhanh? Index principle

Excel tìm "tên Hoàng" = full scan. Data nhiều = chậm.

DB có 1 tỷ row, tìm vẫn vài ms. **Bí mật: Index.**

### 4.1 Ẩn dụ từ điển

Tìm chữ trong sách 1000 trang không có mục lục → lật từng trang (full scan, avg 500 lần).

Có **pinyin/alphabet index**:
1. Tìm trang index, đến phần "D"
2. Trong "D" tìm "Database"
3. Index báo: trang 256

Chỉ 3 lần! Đây là **index lookup**.

**Index DB như mục lục sách**:
- Không index: scan từng row (1 tỷ row = vài phút)
- Có index: jump thẳng (3 disk I/O = vài ms)

### 4.2 Full scan vs Index

Table 10 triệu record. Tìm `user_id = 5,555,555`:

| Method | Process | Rows checked | Time |
|------|------|----------------|----------|
| **Full scan** | Từ row 1 đọc từng row | Avg 5M | 5-30s |
| **Index** | Tra index tree, jump | 3-4 compare | 0.003s |

**Diff: vài nghìn lần!**

::: tip 💡 Insight
Index không silver bullet, có cost:
- **Space**: extra storage
- **Slower write**: mỗi INSERT/UPDATE/DELETE update index

**Khi nào index?**
- Column hay query (WHERE, JOIN)
- Data lớn (<vài nghìn row không cần)

**Khi nào không?**
- Column ít query
- Column update thường xuyên
- Table nhỏ
:::

### 4.3 Underlying: B+ Tree

Real index = **B+ Tree** — tree "thấp lùn":

- **Thấp**: từ root → leaf chỉ 3-4 layer
- **Mập**: mỗi node store hàng trăm key

**Sao "thấp lùn"?**

Data trên disk, mỗi I/O disk chậm (vs memory chậm vài nghìn lần). Goal B+ Tree: **giảm I/O disk**.

- 3-4 layer = max 3-4 disk read
- Mỗi layer store nhiều key = tree không cao

**Vd**: mỗi node store 1000 key:
- **Root**: 1000 key → trỏ 1000 sub-node
- **Middle**: mỗi node 1000 key → trỏ 1000 leaf
- **Leaf**: mỗi leaf 1000 real data

**Total** = 1000 × 1000 × 1000 = **1 tỷ data**
**Height** = **3 layer**

Tìm 1 trong 1 tỷ chỉ **3 disk I/O**! Bí mật DB nhanh.

<BPlusTreeDemo />

---

## 5. Transaction: data không mất, không loạn

Scene đặt vé tàu:
- T1: User A query, thấy "G1234 còn 1 vé"
- T2: User B cũng query, cũng thấy "còn 1 vé"
- T3: A click buy, system trừ, vé bán cho A
- T4: B click buy — không protection → system trừ lại, bán cùng vé cho B!

Đây là **concurrent conflict**.

### 5.1 Transaction là gì?

**Transaction** = 1 nhóm op DB, **all-or-nothing**.

::: tip 🤖 Ẩn dụ
**Bank transfer** = transaction điển hình:
1. Trừ account A 100k
2. Cộng account B 100k

Bước 1 OK, bước 2 fail (mất điện) → gì xảy ra?
- **Không transaction**: A mất tiền, B không có → tiền biến mất
- **Có transaction**: system phát hiện bước 2 fail → auto rollback bước 1, 2 account về nguyên

**Atomicity**: all-or-nothing.
:::

### 5.2 ACID

| Property | EN | Note | Bank vd |
|------|------|------|--------------|
| **A**tomicity | Atomic | All-or-nothing | Trừ + cộng cùng OK |
| **C**onsistency | Consistent | Data luôn legal | Tổng tiền 2 account không đổi |
| **I**solation | Isolated | Transaction không ảnh hưởng nhau | A đang transfer, B thấy "before" hoặc "after", không "middle" |
| **D**urability | Durable | Commit xong = save vĩnh viễn | Mất điện balance không revert |

### 5.3 Isolation levels

Lý tưởng isolation full = **perf cực tệ** (lock nhiều). DB cung cấp 4 levels:

| Level | Dirty read | Non-repeatable | Phantom | Perf | Use |
|----------|------|------------|------|------|----------|
| **Read Uncommitted** | Có | Có | Có | Nhanh nhất | Hiếm dùng |
| **Read Committed** | Không | Có | Có | Khá | Đa số (Oracle default) |
| **Repeatable Read** | Không | Không | Có | Trung | Banking (MySQL default) |
| **Serializable** | Không | Không | Không | Chậm nhất | Strict nhất, hiếm |

::: tip 📖 3 "read" issue
- **Dirty read**: đọc data tx khác chưa commit (có thể rollback → sai)
- **Non-repeatable**: cùng tx, đọc 2 lần khác nhau (tx khác sửa)
- **Phantom**: cùng tx, query 2 lần, row count khác (tx khác insert/delete)
:::

<TransactionACIDDemo />

---

## 6. Performance: query nhanh 1000x

### 6.1 Index pitfalls

::: warning ⚠️ Index invalid
Index sẽ **invalid** trong:
1. Function on index column
2. Implicit type conversion
3. LIKE starts with %
4. OR condition (1 số case)
5. Composite index không thoả leftmost prefix
:::

**Pit 1: function on index column**
```sql
-- ❌ Function → không index
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- ✅ Range query → index
SELECT * FROM users
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
```

**Pit 2: implicit type conversion**
```sql
-- user_id là int
-- ❌ Truyền string → implicit conversion → no index
SELECT * FROM users WHERE user_id = '123';

-- ✅
SELECT * FROM users WHERE user_id = 123;
```

**Pit 3: LIKE %**
```sql
-- ❌
SELECT * FROM users WHERE name LIKE '%Hoàng%';

-- ✅
SELECT * FROM users WHERE name LIKE 'Hoàng%';

-- ✅ Hoặc full-text index
SELECT * FROM users WHERE MATCH(name) AGAINST('Hoàng');
```

### 6.2 SQL optimize templates

**Pagination deep**:

```sql
-- ❌ OFFSET lớn → càng chậm
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10 OFFSET 1000000;

-- ✅ Cursor pagination
SELECT * FROM orders
WHERE created_at < '2024-01-15 12:00:00'
ORDER BY created_at DESC LIMIT 10;

-- ✅ PK range
SELECT * FROM orders
WHERE order_id > 1000000
ORDER BY order_id LIMIT 10;
```

**Batch insert**:
```sql
-- ❌ Multi network round trip
INSERT INTO users (name, age) VALUES ('Hoàng', 25);
INSERT INTO users (name, age) VALUES ('Linh', 30);

-- ✅ 1 SQL
INSERT INTO users (name, age) VALUES ('Hoàng', 25), ('Linh', 30), ('An', 28);
```

**Avoid SELECT ***:
```sql
-- ❌ Trả mọi column
SELECT * FROM users WHERE user_id = 1;

-- ✅ Chỉ column cần
SELECT user_id, name, email FROM users WHERE user_id = 1;
```

### 6.3 High concurrency

| Scenario | Issue | Solution |
|------|------|----------|
| Hot data | 1 row read/write nhiều, lock contention | Cache (Redis) + read-write split |
| Flash sale | Concurrent trừ stock instant | Optimistic lock + stock pre-heat + MQ smoothing |
| Slow query | Complex query drag DB | Index optimize + query split + read replica |
| Connection exhaustion | Quá nhiều concurrent req | Connection pool optimize + rate limit + circuit breaker |

::: tip 💡 Core principles optimization
1. **Measure first**: `EXPLAIN` find real bottleneck
2. **Index first**: 80% perf issue index optimize giải được
3. **Reduce DB pressure**: cache + async
4. **Divide and conquer**: big table → small, big query → small
:::

<QueryOptimizationDemo />

---

## 7. Tổng kết

| Concept | 1 câu | Vấn đề | Key |
|------|-----------|-----------|--------|
| Table/Row/Column | Cách tổ chức data | Store structured data | Table = sheet, row = record, column = field |
| Primary Key | ID unique mỗi row | Tìm chính xác 1 row | Unique, not null, immutable |
| Foreign Key | Cầu nối table | Link table | Trỏ PK table khác |
| SQL | Ngôn ngữ DB | CRUD | SELECT, INSERT, UPDATE, DELETE |
| Index | Data structure speedup query | Tìm nhanh | B+ Tree, giảm disk I/O |
| Transaction | Mechanism safety | Prevent concurrent conflict | ACID |

::: info Next steps
1. **Practice**: install MySQL/PostgreSQL, create table, write SQL
2. **ORM**: SQLAlchemy, Prisma, TypeORM, Drizzle
3. **Index advanced**: composite, covering, index pushdown
4. **Transaction**: MVCC, lock, isolation impl
5. **Distributed**: sharding, replication, read-write split

**Theory + Practice = mastery**.
:::

::: tip 2026 cho VN dev
- **PostgreSQL 17+ dominant**: open-source, mạnh nhất, có extension (pgvector, TimescaleDB, PostGIS)
- **MySQL 8 vẫn phổ biến**: legacy, ecosystem lớn
- **Managed DB**: Supabase, Neon, PlanetScale, Aurora — không cần DBA
- **VN context**: banking dùng Oracle, MS SQL; modern startup dùng PostgreSQL
- **ORM**: Drizzle (TS, type-safe), Prisma (popular), TypeORM
- **AI scenario**: pgvector cho RAG, ClickHouse cho analytics, TimescaleDB cho logs
:::
