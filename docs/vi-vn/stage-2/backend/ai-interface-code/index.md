# Mô hình lớn hỗ trợ viết code API và tài liệu API

Ở các bài trước, ta đã học cách dùng Figma làm bản thiết kế UI, dùng AI sinh nhanh page tĩnh frontend, và dùng Supabase build database cùng auth user ban đầu. Câu hỏi tự nhiên đặt ra: các nút bấm hấp dẫn trong page frontend, sau khi user bấm, làm sao dữ liệu lặng lẽ vào Supabase? Khi cần execute business logic phức tạp (thanh toán concurrent, push lịch, xử lý data nhạy cảm), để frontend connect thẳng database có an toàn không?

Đây chính là mảnh quan trọng nhất trong kiến trúc Web hiện đại — **API backend**.

So với việc gõ tay hàng trăm dòng route, controller, validation backend trước đây, giờ chúng ta có thể tận dụng năng lực sinh code của mô hình lớn để giao các code cơ bản phiền cho AI. Trong bài này, ta sẽ thoát khỏi vòng lặp "AI viết hay nhưng rỗng", lấy kịch bản business thật làm chỗ dựa, demo cách dùng Prompt chất lượng cao để hướng dẫn mô hình viết ra API Node.js backend chắc chắn, đúng quy chuẩn ngành, đồng thời tự sinh ra tài liệu API và test case.

> 💡 **Kiến thức tiền đề**
> 
> Trước khi học bài này, khuyến nghị bạn đã hiểu:
> - [Từ database tới Supabase](../database-supabase/) — hiểu khái niệm database và data model.
> - [Git và workflow GitHub](../git-workflow/) — quen quản lý phiên bản trong dev project.
> - [Terminal/command line là gì](/vi-vn/appendix/2-development-tools/command-line-shell) — khởi tạo và start project cần thao tác lệnh cơ bản.

# Bạn sẽ học được

1. **API là gì**: hiểu cây cầu giao tiếp frontend-backend và quy chuẩn thiết kế RESTful.
2. **Mô hình lớn hỗ trợ build service**: cách qua Prompt có cấu trúc, để AI giúp bạn dựng project Node.js + Express cơ bản.
3. **Phát triển logic API**: hướng dẫn mô hình lớn sinh các API CRUD có validation business nghiêm, kết nối database Supabase.
4. **Tự động hoá tài liệu API**: để mô hình lớn dựa code sinh ngược tài liệu OpenAPI/Swagger chuẩn để team cross-collab.
5. **Closed loop test và debug**: dùng mô hình lớn sinh Postman collection và test case Jest, bảo đảm chất lượng code.

---

# 1. Vì sao ta cần API?

Trong hiểu biết truyền thống, frontend là "phần nhìn thấy được", database là "kho chứa đồ". Nhưng giữa chúng thiếu một dispatcher. Nếu bạn tưởng tượng cả ứng dụng như một nhà hàng:

- **Frontend (client)** là menu và bàn order của nhà hàng — khách xem món và nêu nhu cầu.
- **Database (Supabase…)** là kho hậu cần — chứa nguyên liệu và sổ sách.
- **API backend** là người phục vụ. Khách không thể xông thẳng vào bếp lấy nguyên liệu (vừa loạn vừa dễ gây vấn đề an toàn), mà phải nói "yêu cầu order" (HTTP Request) cho người phục vụ. Sau khi đối chiếu (validate param, check permission), người này vào bếp lấy món tương ứng, rồi đem "món đã làm" (HTTP Response, thường là data JSON) ra cho khách.

Qua API, ta thực hiện **tách frontend-backend** rõ ràng: frontend chỉ lo render page, backend chỉ chuyên business logic, xử lý data và bảo vệ an toàn.

---

# 2. Thiết kế kiến trúc project và khởi tạo

Một bộ khung project cấu trúc rõ là điều kiện tiên quyết để mô hình lớn viết được code tốt. Trước khi để AI viết code, bản thân ta phải có hình dung về cấu trúc engineering.

## 2.1 Cấu trúc engineering API thường gặp
Dù dùng mô hình lớn sinh code, ta tuyệt đối không nhồi tất cả code vào 1 file `server.js`. Một kiến trúc backend Node.js dễ maintain thường như sau:

```text
my-api-project/
├── .env                  # Biến môi trường nhạy cảm (API Keys, connection string database)
├── server.js             # Entry point project (khởi server, đăng ký middleware global)
├── package.json          # File quản lý dependency
├── src/
│   ├── routes/           # Layer route: định nghĩa URL path và request method
│   ├── controllers/      # Layer controller: xử lý param request, gọi service và trả response
│   ├── services/         # Layer service: đóng gói tương tác database và business logic core
│   └── middlewares/      # Middleware: auth login, bắt error global
└── docs/                 # Thư mục lưu tài liệu API
```

## 2.2 Dùng AI hoàn thành khởi tạo project
Thay vì gõ tay `npm init` và cài từng dependency, ném thẳng quy chuẩn trên dưới dạng Prompt cho mô hình lớn:

> 🗣️ **Prompt mẫu cho mô hình lớn:**
> "Giúp tôi dựng 1 project backend Node.js, phải kết nối được database Supabase, cấu trúc rõ chút để sau dễ maintain."

Chạy code AI trả về, bạn sẽ có 1 ứng dụng backend dạng phôi cấp doanh nghiệp tại `localhost:3000`.

---

# 3. Thực chiến core: mô hình lớn hỗ trợ phát triển API

Đây là phần core nhất chương này. Code mô hình lớn viết ra thường dễ có "lỗ hổng logic" hoặc "qua loa bề mặt", nguyên nhân là dev cho context không đủ. **Mô hình lớn không sợ yêu cầu phức tạp, sợ nhất là yêu cầu mơ hồ.**

Lấy ví dụ API thêm mới `menu_items` (bảng menu) đã nhắc ở [chương database](../database-supabase/), xem cách viết Prompt chất lượng cao.

## 3.1 Cho mô hình lớn context đầy đủ
Trước khi yêu cầu AI viết API, nhất định phải cung cấp **định nghĩa field database (Schema)** và **điều kiện ràng buộc cụ thể**.

> 🗣️ **Template Prompt chất lượng cao:**
> "Giúp tôi viết API thêm menu mới. Menu có các info: tên món, giá, phân loại (burger, snack, đồ uống), có lên kệ hay không. Tên món và giá bắt buộc, giá không được âm. Khi user nhập sai, phải báo lỗi."

## 3.2 Review code mô hình lớn sinh ra
Code mô hình lớn sinh ra thường tách trách nhiệm rõ như sau:

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.createMenuItem = async (menuData) => {
    // Gọi Supabase SDK đẩy data vào bảng
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select();

    if (error) throw new Error(`Insert database fail: ${error.message}`);
    return data[0];
};
```

Bạn có thể thấy, code sinh ra theo cách này không chỉ cấu trúc hợp lý, mà còn tính cả init Supabase, bắt error, xử lý exception — khác xa code spaghetti khi chỉ đơn thuần yêu cầu "viết 1 API thêm mới".

---

# 4. Giải phóng tay: tự động sinh tài liệu API

Với team dev, API không có tài liệu chính là 1 blackbox. Frontend engineer không thể đoán bạn cần truyền param gì, cũng không thể dự đoán return structure gì. Quy chuẩn mô tả API phổ biến nhất ngành là **OpenAPI (trước cũng gọi Swagger)**.

Trước đây, viết tay tài liệu Swagger format YAML hay JSON cực đau khổ và dễ sai. Giờ đây cũng thành lĩnh vực mô hình lớn giỏi nhất.

Bạn có thể chọn thẳng code `routes` và `controllers` vừa viết, rồi ném cho mô hình lớn:

> 🗣️ **Prompt sinh tài liệu:**
> "Giúp tôi dựa code trên sinh 1 bản tài liệu API, viết rõ mỗi param nghĩa gì, return data gì, tiện đồng nghiệp frontend đối tiếp."

Trong quá trình này, bạn còn có thể yêu cầu AI điền thêm Description của field và Mock data (như `price_cents: 1200` đại diện 12 USD), giảm chi phí giao tiếp đáng kể.

---

# 5. Hộ tống: sinh code test và Postman collection

Code viết xong, tài liệu xuất xưởng, còn thiếu bước cuối: verify code có chạy được không.

## 5.1 Sinh config test Postman / Apifox
Trong phát triển API, ta thường dùng tool visual như Postman để mô phỏng frontend gửi HTTP request. Không dùng mô hình lớn, bạn phải gõ tay URL, thêm từng Header, ghép body JSON.

Bạn chỉ cần ra lệnh cho AI:
> "Giúp tôi chuyển bản tài liệu API này thành format Postman import được, gồm cả ví dụ request bình thường và request lỗi."

Nhận được text JSON, save thành `menu_api.json` và kéo vào Postman — bạn lập tức có 1 bộ panel test bấm-là-dùng ngay.

## 5.2 Viết unit test tự động
Nếu bạn theo đuổi chất lượng engineering nghiêm hơn, có thể nhờ mô hình lớn dùng framework như `Jest` viết unit test, test boundary cho business logic core (ví dụ truyền giá âm, validation layer database có hiệu lực không).

---

# 6. Best practice phải biết về API backend

Dù có AI hỗ trợ, là "người gác cổng" cho cả hệ thống, bạn vẫn phải hiểu và review các nguyên tắc core này:

1. **Đặt tên path theo quy chuẩn RESTful**:
   - Thiết kế tốt: `GET /api/users` (lấy danh sách user), `POST /api/users` (tạo user). URL phải đại diện "tài nguyên" — danh từ.
   - Thiết kế sai: `POST /api/getUser` hoặc `POST /api/createUser`. Động từ phải để HTTP Method (GET/POST/PUT/DELETE) thể hiện.
2. **HTTP status code đúng quy chuẩn**:
   - 200/201: request thành công / tài nguyên tạo thành công.
   - 400: Bad Request, frontend truyền param sai format, thiếu field bắt buộc.
   - 401/403: Unauthorized / Forbidden, user chưa login hoặc không có quyền.
   - 404: NotFound, tài nguyên không tồn tại.
   - 500: Server Error, code backend lỗi hoặc database chết. Tuyệt đối tránh để stack trace lộ ra frontend (có rủi ro an toàn).
3. **Tuyệt đối không tin input user**: input frontend có thể bị giả mạo, mọi validation param core phải làm lại 1 lần ở API backend.

# 7. Tổng kết

Qua chương này, bạn đã chuyển đổi góc nhìn dev: không còn là "thợ gõ" bị mắc kẹt giữa cú pháp và dấu chấm phẩy, mà nâng lên thành **system designer và architecture commander**.

Bạn đã làm chủ:
1. Tư duy hệ thống core về **API và tách frontend-backend**.
2. **Cách qua cung cấp context và tư duy phân tầng**, nâng đáng kể chất lượng code server side mô hình lớn sinh ra.
3. Khéo léo chuyển việc **viết tài liệu** và **build test case** phiền phức thành task tự động hoá mà AI giỏi nhất.
4. Kết hợp kiến thức **Supabase** đã học, thông luồng data hoàn chỉnh từ request client tới update database tầng đáy.

::: tip 💡 Bước tiếp theo
Khi luồng data và service backend đã sẵn sàng, hiện tại nó mới chỉ tự sướng trên máy local. Ở các bài tiếp, ta sẽ học cách **deploy** bộ service đã build công phu này **lên server public**, để product được user toàn thế giới truy cập.
:::
