# Cách deploy ứng dụng Web

Trong tutorial này, ta sẽ giới thiệu cách deploy ứng dụng Web của bạn lên internet, để người khác truy cập được. Ta sẽ giới thiệu 3 platform deploy phổ biến: **Tencent Cloud CloudBase**, **Vercel** và **Zeabur**, giúp bạn hoàn thành flow từ "viết code xong" tới "người khác truy cập được website bạn trên internet".

# "Deploy" là gì?

Trước khi bắt đầu, làm rõ "deployment" rốt cuộc nghĩa là gì. Bất kỳ website nào muốn được user bên ngoài truy cập, đều phải có 1 địa chỉ mạng có thể truy cập công khai (địa chỉ này có thể là IP, ví dụ 123.45.67.89, hoặc domain, ví dụ [google.com](https://google.com/)). Nhưng chỉ có địa chỉ không đủ — code web bạn viết (HTML, CSS, JavaScript hoặc project React, Vue), cộng tài nguyên ảnh/video liên quan, đều phải "đặt" trên 1 server online 24/7, để nó response request mạng, vậy browser của ai cũng có thể truy cập và download các tài nguyên này.

![](images/image1.png)

Nguồn ảnh: https://www.hostinger.com/tutorials/what-is-cloud-hosting

Toàn bộ quá trình upload tài nguyên, config môi trường và cho service "chạy lên" gọi là **deployment (deploy)**.

Đơn giản: web bạn viết trên máy mình, chỉ start program ở máy là chỉ có thể truy cập qua địa chỉ local trong browser mình — vì code đó chỉ tồn tại trên ổ cứng của bạn. "Deploy" là chuyển code và tài nguyên sang 1 server chuyên kết nối internet, và config sẵn để server biết "khi người khác truy cập tôi response thế nào" — ví dụ khi ai gõ domain bạn trong browser, server lập tức tìm file web tương ứng, gửi nội dung về thiết bị họ, để user thấy page.

Nếu deploy thủ công, 1 project thường cần nhiều bước, mỗi bước có thể đạp hố. Các bước then chốt thường:

1. **Chuẩn bị server**: bạn phải mua cloud server trước (Alibaba Cloud, Tencent Cloud, AWS EC2), chọn vùng (Shanghai, Singapore), config (CPU, RAM, disk), còn phải biết remote connect server (qua SSH).
   ![](images/image2.png)
2. **Config môi trường**: ứng dụng Web phải chạy trong "môi trường" cụ thể — chạy Node.js project phải cài Node.js trước; chạy Python project phải cài Python và lib bên 3 tương ứng. Nếu version môi trường không khớp, program có thể báo lỗi, không start.
3. **Upload tài nguyên**: phải upload code và tài nguyên local lên server, cách thông dụng gồm FTP hoặc Git. Nếu project lớn (gồm file video), giữa chừng đứt thì có khi phải re-upload.

![](images/image3.png)

4. **Start service và test**: upload xong, còn phải execute lệnh trên server start app, và test "địa chỉ mạng được phân có truy cập được không". Nếu không truy cập, có thể firewall server không mở port tương ứng (app bạn listen port 3000 nhưng port đó bị firewall chặn), cũng có thể là bug trong program — lúc này phải xem log server để troubleshoot.
   > 💡 Có thể hiểu port là "số phòng" phân biệt các app khác nhau trên cùng thiết bị, IP là "số nhà" của thiết bị. IP và port ghép (IP:port) định vị chính xác 1 service mạng cụ thể.
5. **Maintain và update**: sau này mỗi lần sửa code, đều phải re-upload và restart service. Nếu server crash (mất điện, lỗi mạng), còn phải restart app thủ công, đôi khi phải config thêm "process daemon tool" để program tự lên khi crash bất thường.

Các "platform deploy low-code" như CloudBase, Vercel, Zeabur sinh ra để giải quyết các vấn đề phức tạp trên. Chúng tự động hoàn thành "mua server, config môi trường, upload code, start service, monitor". Bạn chỉ cần connect code repo (GitHub hoặc GitLab) vào platform, hoặc upload code trực tiếp, nó sẽ tự pull code, nhận diện loại app, config runtime tương ứng, cuối cho bạn 1 địa chỉ public ai cũng truy cập được. Thậm chí 1-click bind domain riêng của bạn.

![](images/image4.png)

Tiếp theo, ta sẽ giới thiệu đặc điểm và cách dùng của 3 platform này, giúp bạn chọn giải pháp deploy phù hợp nhất.

---

# So sánh platform deploy

| Platform | Đặc điểm | Scenario phù hợp | Free quota |
|------|------|----------|----------|
| **Tencent Cloud CloudBase** | Tốc độ truy cập TQ nhanh, tích hợp sâu hệ sinh thái WeChat | User TQ là chính, project cần hỗ trợ WeChat mini program | Có free quota |
| **Vercel** | Hỗ trợ framework frontend tốt, tích hợp GitHub chặt | Project frontend hiện đại React/Vue/Next.js | Có free quota |
| **Netlify** | Function toàn diện, hỗ trợ xử lý form và auth, tích hợp Git tốt | Static site cần form processing, auth và function nâng cao | Có free quota |
| **Zeabur** | Hỗ trợ nhiều ngôn ngữ và template service, config linh hoạt | Project phức tạp cần deploy nhiều service (Dify, n8n) | Khoảng 5 USD free quota/tháng |

---

# 1. Tencent Cloud CloudBase

Tencent Cloud CloudBase (Cloud Development) là backend cloud service one-stop của Tencent Cloud, đặc biệt hợp dev TQ. Ưu thế:

- **Tốc độ truy cập TQ nhanh**: server trong TQ, latency thấp
- **Tích hợp hệ sinh thái WeChat**: dễ kết WeChat mini program, OA
- **One-stop**: cung cấp static site hosting, cloud function, database, storage đầy đủ
- **Free quota đủ**: cá nhân dev có nhiều free resource

## Dùng CloudBase deploy ứng dụng Web

### Bước 1: đăng ký và login

Truy cập [Tencent Cloud CloudBase console](https://console.cloud.tencent.com/tcb), login bằng WeChat hoặc QQ.

### Bước 2: tạo môi trường

Bấm "New environment", chọn 1 tên môi trường (như `my-web-app`).

> ⚠️ **Lưu ý**: CloudBase free trial cần redemption code. Bạn cần follow OA Tencent Cloud CloudBase, nhập "領取兌換碼" trong OA để lấy code, rồi nhập khi tạo môi trường là kích hoạt free environment (free trial 6 tháng).

### Bước 3: bật static site hosting

Trong page quản môi trường, tìm "Static site hosting" và bật. Bật xong bạn nhận được 1 domain truy cập mặc định.

Static site hosting CloudBase có nhiều cách deploy, giống Zeabur:

- **Upload project local**: trực tiếp upload file static đã build (HTML, CSS, JS)
- **Deploy template**: dùng preset template để tạo nhanh project — React, Vue web app template
- **Deploy Git repo**: hỗ trợ tự pull code từ GitHub và deploy

### Bước 4: deploy code

Trong page static site hosting, CloudBase cung cấp 3 cách deploy:

**Cách 1: deploy project local (upload local)**
- Chọn "Deploy local project" trong console
- Upload thẳng file static đã build (HTML, CSS, JS)
- Chọn folder project local đã build (`dist` hoặc `build`)
- Đợi upload xong là truy cập được

**Cách 2: deploy template**
- Dùng preset template tạo nhanh project
- Hỗ trợ React Web template, Vue Web template
- Dựa template tự build và deploy

**Cách 3: deploy Git repo**
- **Deploy Git repo cá nhân**: bind code repo cá nhân (GitHub...)
- **Deploy public repo**: hỗ trợ pull code từ Git repo public
- Config build command tự động (`npm run build`)
- Mỗi lần push code tự re-deploy

> 💡 **Mẹo**: bạn cũng có thể dùng tool CLI để deploy:
> ```bash
> # Cài CloudBase CLI
> npm install -g @cloudbase/cli
> # Login
> tcb login
> # Deploy
> tcb hosting deploy ./dist -e your-env-id
> ```

### Bước 5: config domain riêng (tuỳ chọn)

Trong setting static site hosting, có thể bind domain riêng và xin chứng chỉ HTTPS free.

---

# 2. Vercel

Vercel là 1 trong các platform deploy frontend phổ biến nhất toàn cầu, đặc biệt hợp deploy project framework frontend hiện đại như React, Vue, Next.js. Đặc điểm:

- **Tích hợp sâu GitHub**: push code là tự deploy
- **Preview tự động**: mỗi Pull Request gen link preview riêng
- **Global CDN**: website tự distribute toàn cầu, tốc độ truy cập nhanh
- **Serverless function**: hỗ trợ viết backend API trong project

> ⚠️ **Lưu ý**: Vercel ở một số môi trường mạng truy cập có thể không ổn, user TQ khuyến nghị ưu tiên CloudBase.

## Dùng Vercel deploy ứng dụng Web

### Bước 1: đăng ký tài khoản

Truy cập [web Vercel](https://vercel.com), login bằng tài khoản GitHub.

### Bước 2: import project

1. Bấm "Add New Project"
2. Chọn GitHub repo bạn muốn deploy
3. Nếu không thấy repo muốn, bấm "Adjust GitHub App Permissions" để phân quyền truy cập

### Bước 3: config build setting

Vercel sẽ tự nhận diện loại project và config build command:

| Framework | Build command | Output directory |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| HTML thuần | - | Project root |

Nếu auto-detect không đúng, có thể sửa tay:
- **Build Command**: build command, ví dụ `npm run build`
- **Output Directory**: thư mục output build, `dist` hoặc `build`
- **Install Command**: lệnh cài dependency, thường là `npm install`

### Bước 4: deploy

Bấm nút "Deploy", đợi build xong. Sau build xong, bạn nhận được 1 domain `xxx.vercel.app`.

### Bước 5: domain riêng (tuỳ chọn)

Trong page "Domains" của project setting, có thể add domain riêng. Vercel tự config HTTPS.

---

# 3. Netlify

Netlify là 1 platform deploy frontend phổ biến khác, giống Vercel, đặc biệt hợp deploy static site và SPA. Đặc điểm:

- **Function toàn diện**: ngoài static site hosting, hỗ trợ form processing, auth, edge function và các function cao cấp
- **Tích hợp sâu Git**: hỗ trợ GitHub, GitLab, Bitbucket — push code tự deploy
- **Branch preview**: mỗi branch tự gen link preview riêng
- **Global CDN**: website tự distribute toàn cầu, tốc độ nhanh
- **Form processing**: không cần backend code cũng xử lý được form submit
- **Auth**: built-in auth user, implement nhanh login/register

> ⚠️ **Lưu ý**: tốc độ truy cập Netlify ở TQ có thể không bằng CloudBase, khuyến nghị cho project chủ yếu hướng user nước ngoài.

## Dùng Netlify deploy ứng dụng Web

### Bước 1: đăng ký tài khoản

Truy cập [web Netlify](https://www.netlify.com), bấm "Sign up". Có thể đăng ký bằng GitHub, GitLab, Bitbucket hoặc email.

### Bước 2: import project

1. Login xong bấm "Add new site" → "Import an existing project"
2. Chọn platform host code (GitHub)
3. Phân quyền Netlify truy cập repo
4. Chọn repo muốn deploy từ list

### Bước 3: config build setting

Netlify sẽ tự nhận diện framework frontend phổ biến và config build:

| Framework | Build command | Publish directory |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<project-name>` |
| Next.js | `next build` | `out` |
| HTML thuần | - | `.` (project root) |

Nếu auto-detect không đúng, config tay:
- **Build command**: lệnh build, `npm run build`
- **Publish directory**: thư mục output build, `dist` hoặc `build`

### Bước 4: deploy

Bấm nút "Deploy site", đợi build xong. Sau build xong, bạn nhận được 1 domain `xxx.netlify.app`, ai cũng truy cập website bạn qua địa chỉ này được.

### Bước 5: config domain riêng (tuỳ chọn)

1. Vào site setting, bấm "Domain management"
2. Bấm "Add custom domain"
3. Nhập domain bạn và làm theo prompt config DNS record
4. Netlify tự apply và config chứng chỉ HTTPS

### Function đặc trưng

#### 1. Form processing

Netlify cung cấp function rất tiện: không cần backend code cũng xử lý được form submit.

Chỉ cần add attribute `netlify` vào HTML form:

```html
<form name="contact" netlify>
  <p>
    <label>Họ tên: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Tin nhắn: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Gửi</button>
  </p>
</form>
```

Sau deploy, data form submit sẽ tự gửi vào backend Netlify, bạn xem được mọi submit record trong page "Forms", cũng có thể set email notification hoặc forward data sang service khác.

#### 2. Netlify Functions (edge function)

Netlify hỗ trợ deploy serverless function, để bạn implement API đơn giản mà không cần dựng full backend server. Bạn có thể viết function bằng JavaScript hoặc TypeScript, deploy xong tự nhận URL truy cập được.

Ví dụ tạo 1 file `hello.js`:

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

Sau deploy, truy cập function qua `https://your-domain/.netlify/functions/hello`.

#### 3. Hỗ trợ dev local

Netlify cung cấp tool CLI, tiện dev và test local:

```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Start dev server local
netlify dev

# Test function local
netlify functions:serve
```

Dùng tool CLI có thể mô phỏng môi trường Netlify ở local, gồm form submit, function call — tiện test trước deploy.

---

# 4. Zeabur

Zeabur là platform deploy mới nổi, đặc biệt hợp project phức tạp cần deploy nhiều service. Ưu thế:

- **Template service phong phú**: built-in Dify, n8n, database và nhiều template service
- **Hỗ trợ nhiều cách deploy**: GitHub, template, Docker image, project local...
- **Tổ hợp service linh hoạt**: deploy nhiều service liên quan nhau trong 1 project
- **Tính phí theo usage**: dùng bao nhiêu trả bấy nhiêu, hợp project thử nghiệm

## Dùng Zeabur deploy Dify

Ở các bài trước, ta đã sơ tiếp xúc Dify. Giờ, ta có thể qua [Zeabur](https://zeabur.com/projects) rất dễ dàng start Dify service của riêng mình. Đầu tiên mở [page console](https://zeabur.com/projects), xem các khu vực:

![](images/image5.png)

Trong page này, bạn thấy nhiều khối — là các service đã start. Trong menu top, bạn thấy Agent, Servers, Docs, Templates — lần lượt là:

1. **Agent**: mở smart assistant (Agent) built-in của Zeabur, hỏi cách thao tác hoặc query trạng thái server hiện tại.
2. **Servers**: ở đây add cloud server bạn đã mua, hoặc mua server trực tiếp qua Zeabur.
3. **Docs**: xem tài liệu đầy đủ của Zeabur.
4. **Templates**: list các template image built-in.

> "Image" ở đây có thể hiểu là "package chứa code và môi trường chạy". Khi 1 service chạy thành công trên 1 server, ta có thể chọn đóng gói "bộ môi trường + code" thành image. Sau đó, trên bất kỳ server mới nào, chỉ cần giải nén và chạy package này, không cần config lại môi trường và code — service chạy thẳng được.

Ở góc trên phải page, bạn thấy số dư của mình. Mặc định, mỗi tháng có khoảng 5 USD free quota. Quy tắc tính phí chi tiết tạm không cần quá để ý, chỉ cần biết: chỉ cần server đang chạy là tiêu quota.

![](images/image6.png)

Bấm số dư xem chi tiết tiêu mỗi ngày.

![](images/image7.png)

Giờ ta tạo Dify service riêng. Đầu tiên, ở [trang chủ console](https://zeabur.com/projects) bấm "New Project".

![](images/image8.png)

Tiếp theo là giải thích các cách tạo:

1. **GitHub**  
   Kết nối tới tài khoản GitHub. Sau bind, chọn thẳng project từ GitHub repo để deploy (GitHub là platform host code lớn nhất toàn cầu hiện nay).
2. **Template**  
    Deploy service dựa template. Zeabur có sẵn nhiều preset template project (Dify, n8n...), bạn có thể tạo nhanh và deploy app dựa các template này.
   ![](images/image9.png)
3. **Databases**  
   Deploy database service — MySQL, MongoDB và các database thường gặp.
   ![](images/image10.png)
4. **Functions**  
   Deploy function service, có thể viết code JavaScript hoặc Python, chúng được gọi dưới dạng function.
   ![](images/image11.png)

   ![](images/image12.png)

5. **Local Project**  
   Upload 1 folder local, Zeabur tự nhận diện script start trong đó. Hợp deploy nhanh project bạn đã dev local lên Zeabur.
   ![](images/image13.png)
6. **Docker Image**  
   Deploy Docker image đã đóng gói. Nếu project bạn đã đóng gói thành Docker image (đặt ở Docker Hub hoặc image repo khác), có thể deploy thẳng ở đây.
   ![](images/image14.png)
7. **Cursor**  
   Nếu bạn cài Cursor (Cursor IDE), có thể qua entry này deploy thẳng project Cursor lên Zeabur.

Nếu muốn deploy Dify service của bạn, khuyến nghị chọn cách **Template**, rồi nhập "dify" trong search box. Thấy nhiều version do tác giả khác nhau maintain, chọn 1 (ví dụ v1.6.0).

![](images/image15.png)

Tiếp, nhập 1 tên bất kỳ, Zeabur sẽ dựa tên này gen 1 custom domain tạm. Sau đó mọi người truy cập service của bạn qua URL này được.

![](images/image16.png)

Sau tạo xong, bạn thấy nhiều program (service) lần lượt start. Cần kiên nhẫn đợi mọi service vào trạng thái "đã start". (Dify service do nhiều program tạo thành, mỗi cái phụ trách function khác, chúng phối hợp nhau.)

Thông thường, chỉ cần bấm Dify app bên trái là thấy địa chỉ truy cập mặc định. Nhưng trong ví dụ này, vì có lớp nginx ở trước, bạn cần bấm service nginx để lấy địa chỉ truy cập cuối. Có thể hiểu: nginx là main program phụ trách "nhận-gửi request" thống nhất ra ngoài, distribute địa chỉ external request cho các service nội bộ. Bấm Nginx bên trái, trong page chi tiết bạn thấy địa chỉ service hiện tại, mở địa chỉ này trong browser, đợi service start hoàn toàn.

![](images/image17.png)

Đợi chút bạn thấy giao diện login Dify. Nhập email và password đăng ký, bắt đầu dùng Dify service riêng.

![](images/image18.png)

Nếu hứng thú, có thể start luôn 1 service n8n. n8n cũng là platform AI workflow rất phổ biến ở nước ngoài.

![](images/image19.png)![](images/image20.png)

## Dùng Zeabur và Trae deploy game Snake

Phần tiếp tutorial, ta trải nghiệm vài cách dùng nâng cao của Zeabur. Đầu tiên dùng Trae gen 1 game Snake, rồi deploy lên server Zeabur và config 1 link public để ai cũng mở game được.

Bước 1, dùng Trae tạo project Snake ở local.

### Implement bằng framework HTML

![](images/image23.png)

Với Trae, gen 1 game Snake web dựa HTML rất đơn giản. Game gen xong, bạn chỉ cần theo cách deploy local Zeabur đã giới thiệu trước, upload folder chứa mọi file là được.

![](images/image24.png)![](images/image25.png)![](images/image26.png)

Xong bạn vào page chi tiết service đó:

![](images/image27.png)

Bấm option "Network" bên trái, tìm khu "Public Address" trong page. Bấm "Generate Domain" để gen địa chỉ truy cập public, nhập tên bất kỳ bạn thích.

![](images/image28.png)

![](images/image29.png)

Gen xong, chỉ cần mở địa chỉ này trong browser, là chạy game Snake riêng. Các loại Web app HTML khác cũng deploy y hệt cách này.

![](images/image30.png)

### Implement bằng framework React

Trên ta đã học cách deploy app Web dựa HTML. Tiếp theo thử deploy 1 framework frontend dùng phổ biến hiện nay: ứng dụng React. So với HTML thuần, React được coi là framework dev frontend hiện đại và trưởng thành hơn. Qua component hoá, nó tổ chức cấu trúc page, tăng nhanh đáng kể tốc độ dev page phức tạp — lựa chọn rất mainstream trong project doanh nghiệp.

![](images/image31.png)

#### Refactor sang kiến trúc React

Trong Trae, bạn chỉ cần nói với Agent: "Giúp tôi refactor code này sang kiến trúc React", là có thể refactor khá dễ project HTML thành project React.

![](images/image32.png)

Tuy nhiên, so với file HTML đơn giản, ứng dụng React phụ thuộc build tool và cấu trúc project phức tạp hơn, nên quá trình deploy cũng phiền hơn chút. 1 vấn đề điển hình là port setting: mặc định, React app thường listen port 3000 (bạn cũng thấy trong file config hoặc log start).

Tuy nhiên, deploy thế này trên Zeabur sẽ fail — vì Zeabur chỉ hỗ trợ app listen port 8080. Nghĩa là, muốn React app chạy bình thường trên Zeabur, phải đổi port listen default từ 3000 sang 8080.

Để config đúng bước này, cần làm rõ 2 khái niệm: "port" là gì, và "listening port" nghĩa là gì.

#### Port là gì?

> Trong network máy tính, port có thể hiểu là "logical communication endpoint", dùng phân biệt các network service khác nhau chạy trên cùng thiết bị. Ẩn dụ đơn giản: nếu IP như "số nhà" (ví dụ 162.128.1.1), thì port như "số phòng" trong toà nhà này — mỗi phòng tương ứng 1 service (Web server, mail service, hoặc React app của bạn).
>
> Port number biểu diễn bằng integer 16-bit, range 0-65535.

Nếu không muốn nhớ chi tiết, có thể hiểu đơn giản: port là 1 phần cần thiết tạo thành "địa chỉ truy cập mạng".

Thường khi truy cập website hay IP, ta không gõ port number tay là vì port mặc định Web là 80 hoặc 443 (HTTPS). Đa số browser tự dùng các port chuẩn này. Còn với port đặc biệt như React default 3000, Zeabur yêu cầu 8080, ta phải thêm `:3000` hoặc `:8080` sau địa chỉ mới truy cập được nội dung.

#### "Listening port number" là gì?

> "Listening port number" chỉ port mà 1 program chủ động "mở và monitor" trên thiết bị. Khi 1 app set listening port, tức là nó nói với OS: "Tôi sẽ luôn đợi network request ở port này — chỉ cần có request vào, hãy forward cho tôi."

Hình tượng hơn: giả sử máy tính bạn là 1 toà văn phòng, IP là địa chỉ toà. Trong toà có nhiều công ty hoặc bộ phận, chiếm các phòng khác nhau, số phòng là port number.

Khi React dev server default start, nó "mở" cửa 1 phòng và sắp xếp "lễ tân" trực ở cửa — số phòng đó là port listen — 3000.

Đồng thời, program React còn nói với "quản lý" toà (OS): "Tôi ở phòng 3000, hãy forward mọi thư (network request) gửi tới 3000 cho tôi."

Vậy khi bạn truy cập website React, request đầu tiên tới toà; quản lý thấy request cần gửi tới phòng 3000, lập tức giao request cho "lễ tân" React xử lý và trả kết quả — đây là quá trình truy cập React app.

Khi bạn execute `npm start` ở local (lệnh default start React dev server local, cũng execute được trong sidebar Agent Vibe Coding), React dev server tự set port listen 3000.

Còn thiết kế platform Zeabur quyết nó chỉ "nhận diện" app listen port 8080. Nếu React app vẫn dùng default port 3000, Zeabur không thể forward request đúng cho app, cuối deploy fail.

#### Sửa port listen default

Để đổi port listen default React (3000) sang 8080 mà Zeabur yêu cầu, có nhiều cách. Cách đơn giản nhất là ra lệnh thẳng cho Agent trong Trae: "Giúp tôi đổi port default project React này sang 8080." Trae sẽ giúp bạn sửa file config tương ứng trong project. Sửa xong, bạn chỉ cần re-pack và upload lên Zeabur theo cách trước.

![](images/image33.png)

![](images/image34.png)

Trong network setting, chỉ định 1 URL truy cập theo cách giống deploy HTML project, là start được service version React.

![](images/image35.png)

![](images/image36.png)

Với các program khác cần sửa port number, cũng dùng cùng cách: sửa port default trước, rồi upload deploy lên Zeabur. Đến đây, bạn đã có kỹ năng cơ bản deploy Web app phổ biến lên server.

Bạn có thể để Trae build các loại app khác nhau, deploy lên server default Zeabur. Trong bài tiếp, ta sẽ học cách deploy app lên cloud server bạn tự mua.

---

# ⚠️ Cách stop và xoá project (Zeabur)

Vì kích hoạt resource liên quan server đều tốn phí, khi dùng phải tạo thói quen "kịp thời tắt service không dùng" để tránh tiêu hết free quota tháng.

Để tìm entry quản lý project, đầu tiên bấm option "Settings" trong project.

![](images/image21.png)

Vào page setting, kéo xuống cuối, bạn thấy giao diện kiểu sau:

![](images/image22.png)

Bạn có thể bấm "Suspend All Services" để pause mọi service giảm phí; nếu service có vấn đề, bấm "Restart All Services" restart cả. Nếu chắc không cần project này, bấm "Delete Project" để xoá hoàn toàn project.

---

# Tổng kết

Trong tutorial này, đã giới thiệu 4 platform deploy ứng dụng Web phổ biến:

1. **Tencent Cloud CloudBase**: hợp user TQ, tốc độ truy cập nhanh, tích hợp hệ WeChat tốt
2. **Vercel**: hợp project framework frontend hiện đại, tích hợp GitHub chặt, global CDN
3. **Netlify**: function toàn diện, hỗ trợ form processing và auth, hợp static site cần function cao cấp
4. **Zeabur**: hợp project phức tạp, template service phong phú, hỗ trợ nhiều cách deploy

Chọn platform nào tuỳ nhu cầu cụ thể:
- Chủ yếu hướng user TQ → **CloudBase**
- Dùng React/Next.js → **Vercel** hoặc **Netlify**
- Cần form processing, auth và function cao cấp → **Netlify**
- Cần deploy Dify, n8n... → **Zeabur**

Bất kể chọn platform nào, flow core deploy tương tự: chuẩn bị code → chọn platform → config build → deploy online. Sau khi nắm các kỹ năng này, bạn có thể share app mình dev với cả thế giới!
