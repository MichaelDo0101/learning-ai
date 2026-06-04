---
title: 'GitHub — Nơi cả thế giới lưu code & cộng tác (kèm AI Copilot)'
description: 'Học GitHub thực chiến cho người Việt: Git vs GitHub, chu trình add-commit-push, branch & pull request, GitHub Actions, và GitHub Copilot AI. Kèm mẹo Student Pack miễn phí Copilot Pro cho sinh viên VN.'
---

# GitHub — Nơi cả thế giới lưu code & cộng tác

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🐙</p>

::: tip 🔥 Thực chiến — 30 giây
Bạn làm đồ án nhóm 4 người. Không có GitHub: mỗi đứa gửi file qua Zalo, đặt tên `final`, `final_v2`, `final_real_xong`, rồi copy đè lên nhau → **mất code, không biết ai sửa gì**. Có GitHub: cả nhóm cùng push lên một kho, mỗi người làm một nhánh riêng, gộp lại bằng Pull Request có review — **không ai đè code của ai**, sai thì quay lại bản cũ trong 1 giây.
**💸 Lợi ích thực tế:** một repo GitHub xanh (contribution graph) + project public là tấm vé xin việc IT ở VN. Nhà tuyển dụng mở GitHub của bạn ra xem trước cả CV.
:::

> **"Git là cuốn sổ ghi lại MỌI thay đổi của code; GitHub là đám mây để cả nhóm cùng ghi vào cuốn sổ đó.**
> **Người mới hay nhầm hai cái — tách bạch được chúng là nửa chặng đường rồi."**

::: tip 🎯 Sau chương này bạn sẽ làm được
- **Tạo tài khoản GitHub + repo đầu tiên**, đẩy một project nhỏ lên đám mây.
- **Thuộc lòng chu trình `add → commit → push`** — 80% công việc Git hằng ngày.
- **Làm việc nhóm bằng branch + Pull Request**: làm tính năng riêng, đề nghị gộp, review code.
- **Phân biệt rạch ròi Git (công cụ chạy ở máy) vs GitHub (dịch vụ cloud)** — hết nhầm lẫn.
- **Kích hoạt GitHub Copilot** (trợ lý AI gợi ý code) và — nếu là sinh viên — lấy **Copilot Pro miễn phí** qua Student Pack.
- **Tránh được lỗi chết người**: lỡ push file `.env` chứa mật khẩu lên repo public.
:::

Đây là công cụ nền tảng của nghề lập trình. Nắm chắc nó, mọi công cụ AI coding khác (chạy trên GitHub) đều nhẹ hơn.

---

## 01 · Công cụ này là gì & dùng khi nào

**GitHub** là nền tảng lưu trữ mã nguồn (code hosting) và cộng tác phát triển phần mềm, dựa trên hệ thống quản lý phiên bản **Git**. GitHub thuộc sở hữu của **Microsoft** (mua lại năm 2018), và là nơi lưu trữ code lớn nhất thế giới — **hơn 100 triệu developer**.

Trước khi đi tiếp, phải gỡ ngay cục rối lớn nhất của người mới:

::: warning 💡 Git ≠ GitHub — đừng nhầm
- **Git** là một **VCS** (version control system — hệ thống quản lý phiên bản) **mã nguồn mở**, do **Linus Torvalds** tạo ra. Nó là **công cụ chạy trên máy tính của bạn**, hoạt động kể cả khi không có mạng.
- **GitHub** là một **dịch vụ đám mây** đưa Git lên online, để **nhiều người cùng làm việc**, review code, quản lý dự án và tự động hóa.
- Ví von: Git như **Microsoft Word** (phần mềm trên máy); GitHub như **Google Drive** (nơi lưu trên mây + chia sẻ + cộng tác).
:::

GitHub không chỉ là "ổ cứng đám mây cho code". Đây là những thứ nó làm:

| Tính năng | Nó giải bài toán gì |
|---|---|
| **Repository (kho chứa)** | Lưu toàn bộ file dự án + lịch sử thay đổi. Hỗ trợ public (công khai) & private (riêng tư) **không giới hạn ngay cả ở gói Free** |
| **Git version control** | Theo dõi mọi thay đổi qua **commit** (ảnh chụp nhanh có ID riêng); quay lại bản cũ, xem ai sửa gì khi nào |
| **Branch (nhánh) & Merge** | Tạo nhánh riêng làm tính năng/sửa lỗi mà không đụng code chính, xong gộp lại |
| **Pull Request (PR)** | Đề nghị gộp thay đổi — **trung tâm của cộng tác**; cho review code, comment từng dòng |
| **Issues & Projects** | Quản lý task như bảng Kanban; gán việc (assign) cho từng người |
| **GitHub Actions** | Tự động build/test/deploy mỗi khi push code (CI/CD) |
| **GitHub Pages** | Host website tĩnh **miễn phí** trực tiếp từ repo |
| **GitHub Copilot** | Trợ lý **AI** gợi ý code, chat hỏi đáp, tự review PR |
| **Dependabot** | Tự cảnh báo & vá lỗ hổng bảo mật trong thư viện bạn dùng |

**Trong bối cảnh AI 2026**, GitHub đã tích hợp sâu trợ lý AI **GitHub Copilot**: gợi ý code real-time, agent tự code, và code review tự động. Đáng chú ý là **GitHub Copilot coding agent** — một AI agent chạy ngay trên GitHub Actions, tự lấy ngữ cảnh toàn repo và **tự tạo Pull Request với code sửa lỗi**, quản lý qua tab **Agents** mới.

::: tip 📌 Ví dụ thật — agent này có thật sự chạy được không?
Đây không phải lý thuyết. Chính đội **.NET của Microsoft** đã cho Copilot Coding Agent (CCA) chạy thật trên `dotnet/runtime` — một codebase **29 năm tuổi, cực phức tạp** — suốt 10 tháng (5/2025 → 3/2026). Cách dùng: gán một issue cho **assignee là "Copilot"**, agent tự nghiên cứu repo, lập kế hoạch, code trên nhánh `copilot/*`, mở PR rồi chờ người review.

**Kết quả thật:** riêng repo này có **878 PR từ CCA, 535 cái được merge (67.9%)**; trên 7 repo cộng lại là **2.963 PR, 1.885 merged (68.6%)**. Để so sánh: kỹ sư Microsoft đạt 87.1%, người đóng góp cộng đồng 79.7% — agent thấp hơn người nhưng **không phải thảm họa**, và tỷ lệ PR bị revert của agent (0.6%) gần bằng người (0.8%).

**Bài học cho bạn:** AI agent đã đủ sức làm việc thật trên dự án lớn, nhưng nó là *đồng đội cấp junior* — cần người review kỹ, không phải "bấm nút là xong". Chi tiết đầy đủ ở mục 06.
*(Nguồn: Microsoft .NET Blog — "Ten Months with Copilot Coding Agent in dotnet/runtime")*
:::

**Dùng GitHub khi nào?** Gần như **luôn luôn**, ngay từ project cá nhân đầu tiên:
- Bạn viết code (bất kể ngôn ngữ gì) và muốn lưu an toàn, có lịch sử.
- Bạn làm việc nhóm và cần nhiều người cùng sửa code không đè nhau.
- Bạn muốn có portfolio thật để xin việc.
- Bạn muốn dùng các công cụ AI coding (phần lớn đều bám vào GitHub).

::: tip 🔑 Phân biệt với "hàng nhái"
- **GitLab** và **Bitbucket**: nền tảng cạnh tranh tương tự nhưng **khác công ty**. Khái niệm Git giống nhau; ở đây ta học GitHub.
- **GitHub Copilot**: là **sản phẩm AI con** của GitHub, **tính phí riêng** — đừng nhầm nó với tài khoản GitHub cơ bản (vốn miễn phí).
:::

---

## 02 · Đăng ký & truy cập — bối cảnh VN

**Tin tốt cho người Việt:** GitHub hoạt động **bình thường tại Việt Nam, không bị chặn, truy cập trực tiếp không cần VPN**. Đây là công cụ chuẩn mực trong ngành phần mềm VN, cộng đồng dev cực lớn.

**Đăng ký:** vào [github.com](https://github.com), bấm Sign up — chỉ cần **email + username + password**, **không cần thẻ tín dụng**. Tài khoản cơ bản **miễn phí**.

### Bảng giá (theo github.com/pricing, USD)

| Gói | Giá | Có gì đáng chú ý |
|---|---|---|
| **Free** | **$0** | Unlimited repo public/private, unlimited collaborator trên repo public, **2.000 phút Actions/tháng**, 500MB package storage, Dependabot, Issues & Projects, Codespaces (giới hạn chi tiêu $0) |
| **Team** | $4/user/tháng (12 tháng đầu) | 3.000 phút Actions, repository rules, nhiều reviewer cho PR |
| **Enterprise** | $21/user/tháng | 50.000 phút Actions, SAML SSO, advanced auditing, SOC 2 |

::: tip 💸 Gói Free đã quá đủ để học
Bạn **không cần trả một xu** để học và làm portfolio: repo private không giới hạn, 2.000 phút Actions/tháng (và **miễn phí hoàn toàn cho repo public**), 500MB package storage. Đừng vội nâng cấp.
:::

### Riêng GitHub Copilot (AI) — tính phí tách biệt

| Gói Copilot | Giá | Có gì |
|---|---|---|
| **Free** | **$0** | 2.000 completions/tháng + 50 agent request/tháng; dùng được model Haiku 4.5, GPT-5 mini... |
| **Pro** | $10/tháng | Unlimited completion + $15 AI credits |
| **Pro+** | $39/tháng | — |
| **Max** | $100/tháng | — |

::: warning ⚠️ Signup Copilot Pro đang TẠM DỪNG
Theo dữ liệu tới thời điểm tài liệu này, **từ 20/4/2026 việc đăng ký mới các gói Copilot Pro/Pro+/Max/Student đang TẠM DỪNG**. Chỉ user đã verify trước đó hoặc nâng cấp mới dùng được. **Hãy kiểm tra lại tình trạng tại thời điểm bạn dùng** — chính sách này có thể đã thay đổi.
:::

### 🎓 Điểm vàng cho học sinh / sinh viên VN

::: tip 🎓 GitHub Student Developer Pack — MIỄN PHÍ, cực kỳ đáng giá
**GitHub Student Developer Pack** tặng **hơn 30 công cụ trị giá hơn $2.000**, gồm:
- **Copilot Pro** (trợ lý AI coding xịn)
- **$100 credit Azure**
- **JetBrains** (bộ IDE chuyên nghiệp)
- **Canva Pro**, và nhiều tool khác.

Sinh viên VN có **thẻ sinh viên / email trường** (`.edu.vn` hoặc domain trường) đăng ký được tại [education.github.com/pack](https://education.github.com/pack). **Verify qua email trường `.edu` là nhanh nhất** (kích hoạt thường trong ~72 giờ). Đây là **cách hợp pháp để học sinh VN dùng AI coding xịn miễn phí**.

*Giáo viên đã verify và maintainer open-source nổi tiếng cũng được Copilot Pro free.*
:::

::: warning 🚫 ĐỪNG mua tài khoản trôi nổi
Nhiều shop rao bán "tài khoản Student Pack" giá rẻ. **Tuyệt đối không mua** — vi phạm điều khoản, dễ bị **khóa tài khoản**, mất sạch. Hãy **tự đăng ký bằng giấy tờ thật của mình**. Nếu bạn là người dạy: hướng dẫn học viên tự verify, đừng để các em mua hàng trôi nổi.
:::

### Vài lưu ý "đặc sản VN"

- **Giao diện GitHub là tiếng Anh** → người mới có thể bỡ ngỡ thuật ngữ (commit, branch, pull request...). Nên học kèm **bảng thuật ngữ** (xem cuối chương).
- **Thanh toán gói trả phí cần thẻ Visa/Mastercard quốc tế** — rào cản với một số người dùng VN chưa có thẻ. (Nhưng gói Free + Student Pack đã quá đủ.)
- Cộng đồng VN có nhiều tài liệu Git tiếng Việt miễn phí, ví dụ hướng dẫn tại `rogerdudler.github.io/git-guide/index.vi.html`.

---

## 03 · Workflow thực chiến — làm từng bước

Dưới đây là 10 bước đi từ con số 0 đến làm việc nhóm có AI. Làm theo đúng thứ tự.

### Bước 1 — Đăng ký tài khoản
Tạo tài khoản miễn phí tại [github.com](https://github.com) (email + username + password).

### Bước 2 — Cài Git lên máy
Tải Git tại [git-scm.com](https://git-scm.com), cài xong thì **cấu hình danh tính** (chỉ làm **một lần**) để Git biết ai là tác giả mỗi commit:

```bash
git config --global user.name "Nguyen Van A"
git config --global user.email "email@example.com"
```

### Bước 3 — Tạo repository
Trên github.com bấm nút **New repository**, đặt tên (ví dụ `my-first-project`), chọn **public** hay **private**.

### Bước 4 — Clone repo về máy
**Clone** = tải kho từ GitHub về máy tính của bạn:

```bash
git clone https://github.com/username/ten-repo.git
```

### Bước 5 — Sửa code & kiểm tra
Mở file ra sửa như bình thường. Muốn biết Git thấy mình đã đổi những file nào:

```bash
git status
```

### Bước 6 — Chu trình Stage → Commit → Push (CỐT LÕI)

Đây là **trái tim** của Git, lặp đi lặp lại mỗi ngày. Ba động tác:

```bash
git add index.html        # đưa file vào "staging" (giỏ chuẩn bị lưu)
# hoặc thêm tất cả thay đổi:
git add .

git commit -m "Sửa lỗi null pointer trong logic lấy dữ liệu"   # lưu ảnh chụp nhanh

git push -u origin main   # đẩy lên GitHub
```

::: tip 🔑 Hiểu 3 động tác bằng ẩn dụ "gửi bưu kiện"
- **`git add`** = bỏ đồ vào thùng (chọn thứ muốn gửi — gọi là *staging*).
- **`git commit`** = dán nhãn + niêm phong thùng, ghi rõ "thùng này có gì" (commit message). Đây là một **ảnh chụp nhanh có ID riêng**, lưu **ở máy bạn**.
- **`git push`** = mang thùng ra bưu điện gửi đi (đẩy lên GitHub cho người khác thấy).
:::

::: warning 💡 `add` và `commit` chỉ làm ở MÁY BẠN
Sau `git commit`, code **vẫn chưa lên GitHub** — nó mới lưu trong kho Git ở máy bạn. Phải `git push` thì người khác mới thấy. Đây là điểm người mới hay quên.
:::

### Bước 7 — Làm việc nhóm với nhánh (branch)
Muốn làm một tính năng mới mà **không đụng vào code chính** (nhánh `main`), hãy tạo một nhánh riêng:

```bash
git branch tinh-nang-moi        # tạo nhánh
git checkout tinh-nang-moi      # chuyển sang nhánh đó

# Mẹo: gộp 2 lệnh trên thành 1:
git checkout -b tinh-nang-moi
```

Giờ bạn làm việc trên nhánh `tinh-nang-moi`, `add` + `commit` thoải mái mà `main` vẫn an toàn.

### Bước 8 — Tạo Pull Request (PR)
Push nhánh lên GitHub, rồi vào giao diện web github.com — bạn sẽ thấy nút **Compare & pull request**. Bấm vào để **đề nghị gộp** nhánh `tinh-nang-moi` vào `main`. Đồng đội sẽ **review, comment từng dòng, approve**.

```bash
git push -u origin tinh-nang-moi
# sau đó lên github.com bấm "Compare & pull request"
```

### Bước 9 — Merge & đồng bộ
Sau khi PR được duyệt, bấm nút **Merge** trên web. Lúc này các thành viên khác cần kéo code mới nhất về máy:

```bash
git pull
```

### Bước 10 (tùy chọn) — Bật AI
Cài extension **GitHub Copilot** trong VS Code, hoặc bật **Copilot code review** để AI tự review PR. Sinh viên/giáo viên kích hoạt Copilot free tại `github.com/settings/education/benefits`.

::: tip 🤖 Dùng GitHub Copilot Chat trong VS Code
Sau khi cài extension, bạn mở khung chat và dùng các lệnh:

```text
/explain — giải thích đoạn code đang chọn
/fix — đề xuất sửa lỗi cho code đang chọn
@workspace Viết hàm validate email bằng JavaScript và unit test cho nó
```

`@workspace` cho phép Copilot đọc ngữ cảnh toàn bộ dự án để trả lời sát hơn.
:::

### 📋 Bộ lệnh Git "sống còn" — in ra dán cạnh máy

```bash
git status                  # xem file nào đã thay đổi
git add .                   # đưa tất cả thay đổi vào staging
git commit -m "mô tả rõ"    # lưu ảnh chụp nhanh
git push                    # đẩy lên GitHub
git pull                    # kéo code mới nhất về máy
git log --oneline           # xem lịch sử commit (gọn một dòng/commit)
git branch tinh-nang-moi    # tạo nhánh mới
git checkout tinh-nang-moi  # chuyển sang nhánh
git remote -v               # xem repo này nối với GitHub ở đâu
```

---

## 04 · Mẹo hay & lỗi thường gặp

### ✅ Mẹo từ người đi trước

::: tip 💡 8 mẹo thực chiến
- **Thuộc lòng `add → commit → push` trước đã.** Đây là 80% công việc — chưa cần học sâu Git ngay.
- **Viết commit message RÕ RÀNG**, mô tả *làm gì* thay vì *"fixed bug"*. Ví dụ: *"Sửa lỗi crash khi đăng nhập email rỗng"* tốt hơn nhiều so với *"fix"*.
- **Sợ dòng lệnh?** Dùng **GitHub Desktop** (app giao diện) hoặc panel **Source Control** trong VS Code — `add`/`commit`/`push` chỉ bằng nút bấm, không cần gõ lệnh.
- **Sinh viên/giáo viên: đăng ký Student Pack / Education NGAY** để có Copilot Pro miễn phí — verify qua email trường `.edu` là nhanh nhất (~72 giờ).
- **Luôn tạo file `.gitignore`** để loại trừ file rác/bí mật (`node_modules`, `.env`, key) khỏi việc commit — tránh lộ mật khẩu lên repo public.
- **Học qua làm:** tạo 1 repo cá nhân, push một project nhỏ lên, rồi dùng **GitHub Pages** host miễn phí để có sản phẩm thật làm portfolio.
- **Dùng Copilot code review** để AI tự bắt lỗi PR trước khi merge — bạn học được nhiều từ feedback của AI.
- **Đặt repo CV/portfolio ở chế độ public** để nhà tuyển dụng VN xem được. GitHub xanh (contribution graph) là điểm cộng khi xin việc IT.
:::

::: tip 📌 Ví dụ thật — GitHub Actions tiết kiệm hàng giờ mỗi tuần
Một lập trình viên (Ruchi Yadav) kể: mỗi **sáng thứ Hai tốn ~1 giờ** để test và deploy thủ công. Cô dựng một pipeline GitHub Actions 3 tầng để tự động hóa hết:

- **Mỗi khi mở PR:** chạy unit test trên nhiều phiên bản Node (16/18/20), lint, `npm audit`, build, deploy một **preview URL** dạng `pr-123.preview.myapp.com`, rồi **bot tự comment kết quả vào PR**.
- **Khi merge vào `main`:** chạy full test + E2E (Playwright), deploy staging, báo Slack.
- **Khi gắn tag release:** build production, smoke test, deploy zero-downtime, tự sinh release notes.

**Kết quả thật:** thời gian check một PR giảm từ **20 phút xuống còn ~5 phút** nhờ chạy các job **song song** thay vì tuần tự; cache npm theo `package-lock.json` **giảm 50% thời gian tải dependency**.

Vài mẹo kỹ thuật cô nhấn mạnh:

```yaml
# 1) Cache dependency để chạy nhanh hơn (key theo package-lock.json)
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}

# 2) Chống job chạy lố vô tận
jobs:
  test:
    timeout-minutes: 10
```

Ngoài ra: **pin action theo commit hash** (không theo tag) cho an toàn bảo mật, và tách **reusable workflow** để dùng chung nhiều repo.
*(Nguồn: blog "GitHub Actions Saved Me Hours Every Week. Here Is My Setup" — ruchi.no)*
:::

### 🚨 Lỗi thường gặp (và cách thoát)

::: warning 🚨 9 cái bẫy phổ biến
1. **Quên `git pull` trước khi làm việc** → bị **conflict (xung đột)** khi nhiều người sửa cùng file. **Luôn `git pull` mới nhất trước khi bắt đầu.**
2. **Merge conflict làm người mới hoảng** → bình tĩnh: conflict chỉ là Git cần bạn **chọn giữ phần code nào**. Mở file thấy dấu `<<<<<<<`, `=======`, `>>>>>>>` rồi sửa thủ công, xóa các dấu đó đi.
3. **Lỡ commit & push file bí mật** (`.env`, API key, mật khẩu) lên repo **public** → **bị lộ ngay lập tức**. Phải dùng `.gitignore` từ đầu; nếu lỡ lộ thì **đổi key ngay**.
4. **Nhầm Git vs GitHub** → Git chạy trên máy, GitHub là cloud. Học **tách bạch** hai khái niệm.
5. **Tưởng tài khoản Free không có repo private** → **SAI**. Gói Free có repo private **không giới hạn**.
6. **Kỳ vọng đăng ký Copilot Pro mới là dùng được ngay** → từ 20/4/2026 signup mới Pro/Pro+/Max/Student đang **tạm dừng**; cần kiểm tra lại tại thời điểm dùng.
7. **Phát sinh phí ngoài dự kiến với Copilot code review** → từ **1/6/2026**, Copilot code review trên repo **private** tiêu tốn **cả AI Credits LẪN phút GitHub Actions**. Chú ý hạn mức.
8. **Commit thẳng vào `main` khi làm nhóm** → rủi ro. Nên dùng **branch + Pull Request** để có review trước khi merge.
9. **Mua tài khoản Student Pack trôi nổi** → vi phạm điều khoản, dễ bị khóa. **Tự verify bằng giấy tờ thật.**
:::

::: warning 📌 Ví dụ thật — cái bẫy hóa đơn GitHub Actions (đốt sạch ngân sách)
GitHub Actions miễn phí 2.000 phút/tháng, nhưng có một cái bẫy ít người biết: ở repo private, **workflow vẫn tiêu phút trả phí**, và một số thiết lập có thể đốt rất nhanh. Một case được kể lại: một bạn junior **fork một repo vào cuối tuần**, trong đó có workflow chạy theo lịch `cron` **mỗi 5 phút suốt 48 giờ** trên runner mạnh → **đốt sạch ngân sách Actions của cả tháng** trước khi ai kịp để ý.

**Cách phòng tránh:**
- **Tắt chạy Action cho fork** nếu chưa được duyệt (Settings → Actions).
- **Siết retention của artifact** (mặc định giữ tới **90 ngày** — rất tốn dung lượng).
- Đặt `timeout-minutes` cho mọi job; kiểm tra kỹ các trigger `cron` và `schedule`.
- Lưu ý thêm: từ **1/6/2026**, Copilot code review cũng bắt đầu **tiêu phút GitHub Actions** trên repo private.

**Bài học:** với automation, luôn hỏi *"cái này có thể chạy bao nhiêu lần, tốn bao nhiêu?"* trước khi bật.
*(Nguồn: "GitHub Actions: The Hidden Billing Trap" — theexceptioncatcher.com)*
:::

::: details 👉 Gặp merge conflict thì làm gì? (ví dụ cụ thể)
Khi bạn `git pull` hoặc merge và hai người sửa **cùng một dòng**, Git chèn dấu vào file như sau:

```text
<<<<<<< HEAD
const giá = 100000;   // phần code của BẠN (nhánh hiện tại)
=======
const giá = 120000;   // phần code của NGƯỜI KHÁC (nhánh đang gộp vào)
>>>>>>> tinh-nang-moi
```

**Cách xử lý:** quyết định giữ giá trị nào (hoặc gộp cả hai), **xóa sạch 3 dòng dấu** `<<<<<<<`, `=======`, `>>>>>>>`, để lại đúng đoạn code bạn muốn. Sau đó `git add` + `git commit` để hoàn tất việc gộp. Conflict **không phải lỗi nguy hiểm** — nó chỉ là Git lịch sự hỏi "giữ phần nào?".
:::

---

## 05 · Bài tập / đồ án nhỏ

Làm tay 3 bài này là bạn nắm được 90% GitHub dùng hằng ngày.

### 🧪 Bài 1 — Repo đầu tiên & portfolio (cá nhân)

> **Mục tiêu:** đưa một project nhỏ lên GitHub và host miễn phí làm portfolio.

1. Đăng ký tài khoản, cài Git, chạy 2 lệnh `git config` (Bước 2 ở mục 03).
2. Tạo một repo **public** tên `my-portfolio`, có sẵn 1 file `index.html` đơn giản (vài dòng giới thiệu bản thân).
3. `clone` về máy → sửa `index.html` → chạy đủ chu trình `git add . → git commit -m "..." → git push`.
4. Vào **Settings → Pages** của repo, bật **GitHub Pages** để có một website tĩnh **miễn phí** với link công khai.

**Tiêu chí đạt:** mở link GitHub Pages thấy trang của bạn; tab **Commits** của repo có ít nhất 2 commit với message rõ ràng.

### 🧪 Bài 2 — Branch & Pull Request (mô phỏng làm nhóm)

> **Mục tiêu:** quen quy trình nhánh + PR mà KHÔNG đụng `main`.

1. Trong repo Bài 1, tạo nhánh mới: `git checkout -b them-phan-lien-he`.
2. Thêm một mục "Liên hệ" vào `index.html`, rồi `add` + `commit`.
3. Push nhánh: `git push -u origin them-phan-lien-he`.
4. Lên github.com bấm **Compare & pull request**, viết mô tả PR, rồi **tự review** và **Merge** vào `main`.
5. Về máy chạy `git checkout main` rồi `git pull` để đồng bộ.

**Tiêu chí đạt:** repo có một Pull Request đã merge; `main` chứa phần "Liên hệ"; bạn hiểu vì sao làm nhánh an toàn hơn commit thẳng vào `main`.

### 🧪 Bài 3 — Chặn lộ bí mật + thử AI (nâng cao nhẹ)

> **Mục tiêu:** tập phản xạ bảo mật và dùng Copilot.

1. Tạo file `.env` chứa một dòng giả lập như `API_KEY=demo123`.
2. Tạo file `.gitignore`, thêm vào đó dòng `.env` (và `node_modules`). Chạy `git status` → xác nhận Git **không còn thấy** file `.env`. (Đây là lá chắn chống lộ key.)
3. *(Nếu có Copilot)* Trong VS Code, mở Copilot Chat gõ:

```text
@workspace Viết hàm validate email bằng JavaScript và unit test cho nó
```

Đọc code AI sinh ra, hiểu nó, rồi commit nếu thấy hợp lý.

**Tiêu chí đạt:** `git status` xác nhận `.env` đã bị `.gitignore` loại trừ — bạn đã có phản xạ *không bao giờ push bí mật lên repo public*.

::: tip 🔑 Vì sao 3 bài này quan trọng
Bài 1 cho bạn **sản phẩm thật** để khoe. Bài 2 cho bạn **quy trình làm nhóm chuẩn ngành**. Bài 3 rèn **phản xạ bảo mật** — thứ phân biệt người làm cẩn thận với người lỡ tay làm lộ mật khẩu công ty. Cả ba đều dùng được ngay khi đi làm.
:::

---

## 06 · Case study & use-case thật (từ cộng đồng)

Lý thuyết là một chuyện — phần này gom các **câu chuyện thật, có số liệu, có nguồn** về việc dùng GitHub + Copilot Agent + Actions trong năm 2025–2026. Mục tiêu: cho bạn thấy AI agent trên GitHub *thật sự* mạnh ở đâu, *thật sự* đuối ở đâu, và dân làm nghề phàn nàn gì.

::: warning 📖 Cách đọc phần này
Nguồn mạnh và kiểm chứng được nhất là **báo cáo chính thức của đội .NET (Microsoft)** về repo `dotnet/runtime` — có số PR thật, số liệu chi tiết, quote thật của kỹ sư **Stephen Toub**. Các con số doanh nghiệp (Accenture, Harness) là **chỉ báo định hướng** trích từ nghiên cứu/blog vendor, **không phải bằng chứng nhân quả tuyệt đối** — đọc kèm cảnh báo. Phần phản ứng cộng đồng lấy từ **Hacker News** (link thật) và đã được **paraphrase** (không trích nguyên văn dài).
:::

### 🟢 Case 1 — `dotnet/runtime`: 10 tháng dùng Copilot Coding Agent (case study đầu bảng)

> **Bối cảnh:** Đội .NET của Microsoft cho Copilot Coding Agent (CCA) chạy thật trên `dotnet/runtime` — codebase **29 năm tuổi** — từ 5/2025 đến 3/2026.

**Làm gì:** Gán issue cho Copilot (chọn assignee = "Copilot"). Agent tự nghiên cứu repo, lập kế hoạch, code trên nhánh `copilot/*`, mở PR, chờ người review. Một số PR bắt đầu từ "ask mode" (brainstorm hướng tối ưu trước, rồi mới bảo agent implement).

**Kết quả / số liệu thật:**

- `dotnet/runtime`: **878 PR từ CCA, 535 merged (67.9%)**, +95.000 dòng / −31.000 dòng. Trên 7 repo: **2.963 PR, 1.885 merged (68.6%)**.
- Tỷ lệ thành công **tăng dần theo thời gian** nhờ thiết lập đúng: 41.7% (5/2025) → 58.8% (10/2025) → **72.1% (3/2026)**. Trước khi có file `copilot-instructions.md` và mở firewall cho package feed, agent **không build nổi repo**; sau khi setup, tỷ lệ nhảy từ ~38% lên ~69%.
- Phân loại theo loại việc: **dọn dẹp / xóa code (Removal/Cleanup) 84.7%** (tốt nhất), viết test 75.6%, refactor 69.7%, sửa bug 69.4%, **tối ưu hiệu năng chỉ 54.5%**, việc native/đặc thù nền tảng rất thấp (vì runner chỉ chạy Linux).

**Bài học:**

1. Khoản đầu tư đáng giá nhất là **viết "instructions" mô tả cách team làm việc** — mỗi convention ghi lại giúp tránh lỗi lặp qua hàng trăm PR sau.
2. **Chọn task hợp điểm mạnh AI:** rõ ràng, có cách tái hiện lỗi (repro), có sẵn pattern test, không cần phán đoán kiến trúc.
3. **Nút thắt cổ chai chuyển từ "viết code" sang "review code".**

*(Nguồn: Microsoft .NET Blog — "Ten Months with Copilot Coding Agent in dotnet/runtime", devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime)*

### 🟢 Case 2 — "Thí nghiệm tiệc sinh nhật": gán 22+ issue lúc chờ máy bay

> **Bối cảnh:** Stephen Toub gán **22+ issue cho CCA trong ~1 giờ** ngồi chờ ở sân bay, để xem agent xử lý đủ loại task ra sao.

Vài kết quả cụ thể (có số PR thật):

- **PR #120619** (lỗi thread-safety của `System.Text.Json`): agent xác nhận giả thuyết về lỗi + viết regression test, **đúng ngay lần đầu**. Toub mô tả đại ý đây là "CCA ở trạng thái tốt nhất: bug rõ ràng, fix rõ ràng".
- **PR #120622:** agent tìm ra **fix chỉ 1 dòng** trong engine regex `NonBacktracking` xa lạ — thứ con người phải debug hàng giờ mới ra.
- **PR #120638:** agent định thêm validate cho regex, nhưng **điều tra ra hành vi cũ là cố ý** → tự đóng PR. Giá trị nằm ở phần "điều tra để kết luận *không nên sửa*".
- **PR #120633 (BCrypt):** một "odyssey 20+ commit" cần phán đoán kiến trúc về interop → cuối cùng **đóng**. Minh họa điểm yếu khi cần hiểu sâu convention và lịch sử codebase.

**Bài học:** Agent tỏa sáng với **bug nhỏ-rõ-ràng** và việc **dò tìm**; đuối với **quyết định kiến trúc**. Kể cả khi PR bị đóng, nó vẫn hữu ích như **công cụ thăm dò chi phí thấp** (vẫn cho ra insight).

*(Nguồn: cùng bài .NET Blog ở Case 1)*

### 🟡 Case 3 — Code từ điện thoại ở độ cao 10km (và cái bẫy "bom review")

> **Bối cảnh:** Toub mở **9 PR từ điện thoại trên máy bay** (sửa bug, tối ưu hiệu năng, refactor) — việc trước đây bất khả thi nếu không mang laptop.

Kết quả: nhiều PR lớn được merge, ví dụ PR xóa hằng số preprocessor lỗi thời trên **112 file** (cần biến đổi theo ngữ cảnh, không phải search-replace máy móc).

**Nhưng đây là cái bẫy thật:** Toub thừa nhận đại ý *"chỉ trong chốc lát tôi đã tạo ra 5–9 giờ công việc review"*. AI dịch gánh nặng sang **năng lực review của con người**. Số liệu phụ minh họa: **52% PR merged của CCA có người push commit trực tiếp** vào nhánh (sửa nhanh hơn giải thích cho agent); khi có người can thiệp, tỷ lệ merge nhảy lên **86%** so với **55%** nếu để agent tự chạy hoàn toàn.

**Bài học:** Tốc độ tạo code không phải nút thắt nữa — **năng lực review mới là nút thắt**. Đừng gán hàng loạt task rồi không có thời gian đọc kết quả.

*(Nguồn: cùng bài .NET Blog ở Case 1)*

### 🟡 Case 4 — GitHub nội bộ: agent là "contributor #5" (và sự hoài nghi của cộng đồng)

> **Bối cảnh:** Khi ra mắt Coding Agent (5/2025), GitHub công bố ~**400 nhân viên** dùng agent trên **300+ repo**, ~**1.000 PR merged**; agent xếp **hạng #5** về số đóng góp trong chính repo của nó.

**Phản ứng cộng đồng (paraphrase từ thread Hacker News có thật):**

- Hoài nghi **thiên lệch sống sót (survivorship bias)**: công bố "1.000 PR merged" nhưng **không nói có bao nhiêu PR bị từ chối** → "số PR không tự nói lên chất lượng".
- Mỉa mai: nếu agent thật sự hữu ích thì đã là contributor #1, chứ không phải #5. (Product lead GitHub trả lời trong thread: con người vẫn giữ hạng #1–#4, và agent khi đó chạy model **Claude 3.7 Sonnet**.)
- Lo ngại việc làm: đại ý "mấy việc nhàm chán đó tôi *được trả tiền* để làm, và tôi thích được trả tiền".

**Bài học:** Số liệu marketing của vendor cần đọc cẩn thận — **"PR merged" không tự động bằng giá trị**.

*(Nguồn: Hacker News — "We've been using Copilot coding agent internally at GitHub…", news.ycombinator.com/item?id=44032660)*

### 🟢 Case 5 — Doanh nghiệp đo lường: Accenture & Harness

Hai ví dụ cho thấy **tác động đo được nhưng vừa phải** (không phải nhân đôi sản lượng):

- **Accenture (~450 lập trình viên):** thí điểm Copilot cho kết quả **+8.69% số PR/dev**, **+15% tỷ lệ PR được merge**, **+84% build thành công**.
- **Harness** (bật/tắt Copilot để so sánh như A/B tự nhiên): tháng bật so tháng tắt cho **+10.6% số PR trung bình** và **giảm 3.5 giờ cycle time**.

**Bài học:** Lợi ích rõ nhất nằm ở **tốc độ vòng lặp (cycle time)** và **ít ma sát hơn**, chứ không phải chất lượng tuyệt đối tăng vọt.

::: warning ⚠️ Đọc số liệu doanh nghiệp thận trọng
Các con số trên trích từ **nghiên cứu/blog của vendor** (GitHub × Accenture, Harness) — coi là **chỉ báo định hướng**, không phải bằng chứng nhân quả. Bối cảnh team, loại dự án, cách đo… đều ảnh hưởng kết quả.
:::

*(Nguồn: Harness Blog — "The Impact of GitHub Copilot on Developer Productivity: A Case Study", harness.io; số liệu Accenture trích từ nghiên cứu GitHub × Accenture, dẫn lại qua các bài review 2026.)*

### 🔴 Case 6 — Phàn nàn & bẫy thật (góc tối, cần biết trước khi tin AI)

Để cân bằng, đây là những vấn đề **thật** đã được ghi nhận:

- **"Bom review":** AI tạo PR nhanh hơn người review kịp. CCA trung bình **16.5 comment review mỗi PR merged** (người: 12.4) → review tốn công thật, không phải "đóng dấu cho qua".
- **Test nhiều nhưng chất lượng kém ban đầu:** **65.7% số dòng CCA thêm là test** (người: 49.9%), nhưng "thiên về số lượng hơn chất lượng", đôi khi **mã hóa hành vi sai hiện tại thành 'đúng'** (test pass nhưng test sai thứ).
- **Sự cố "PR ads" (3/2026):** Copilot chèn "tip" mang tính quảng cáo vào **hơn 1.5 triệu PR** (lan cả sang GitLab) mà không xin phép; Microsoft gọi là "lỗi logic lập trình". Dev phản ứng rất gay gắt → bài học về **niềm tin** vào công cụ tự động.
- **Đuối ở task lớn, đa file:** theo nhiều bài review 2026, độ chính xác giảm còn ~50% với dự án trên 10.000 dòng; greenfield (repo mới) chạy nhanh hơn brownfield (repo cũ) rõ rệt — cùng đội .NET, repo mới đạt 77.3% success, median merge 17.4 giờ, so với `dotnet/runtime` 67.9% / 50 giờ.
- **"Ảo tưởng hoàn thành":** agent hay báo "đã làm xong đúng spec" nhưng thực tế **thiếu chức năng, không có test** → **bắt buộc phải có người kiểm (human-in-the-loop)**.

::: warning 🚧 Một số con số cần kiểm lại
Các con số từ **bài review bên thứ ba** (ví dụ "1.5 triệu PR ads", "độ chính xác ~50% với dự án trên 10.000 dòng") có gốc là **blog tổng hợp**, nên **verify lại** trước khi trích thành số liệu khẳng định. Ngược lại, mọi số liệu từ **bài .NET Blog** và các con số GitHub công bố trên **Hacker News** có độ tin cậy cao.
:::

*(Nguồn: .NET Blog ở Case 1; tổng hợp review 2026 như nxcode.io — "Is GitHub Copilot Getting Worse in 2026?")*

### 🧭 Tổng kết use-case: AI agent hợp / không hợp với việc gì

Từ các case trên, có thể rút ra **bản đồ giao việc cho AI agent**:

| Giao cho agent (thành công cao) | Tự làm / cần người dẫn dắt |
|---|---|
| Dọn code chết, xóa hằng/preprocessor lỗi thời hàng loạt (~85%) | Quyết định kiến trúc, đổi interop pattern |
| Bug nhỏ có cách tái hiện rõ + viết regression test | Tối ưu hiệu năng phức tạp (~54%) |
| Viết test bổ sung cho code path chưa cover (prompt kỹ) | Việc đặc thù nền tảng (Windows/native) khi runner chỉ có Linux |
| Refactor cơ học (mechanical) | Việc cần hiểu sâu lịch sử & convention codebase |
| Thăm dò "có nên fix không / fix thế nào" | — |

**Use-case Actions/CI-CD đã được chứng thực** (Case "Ruchi Yadav" ở mục 04): test đa phiên bản trên mỗi PR, deploy preview URL, bot comment kết quả; merge `main` → staging + E2E + Slack; tag release → production + smoke test + auto release notes.

::: tip 🔑 Một quy tắc vàng rút ra từ tất cả case trên
**File `.github/copilot-instructions.md` là đòn bẩy số 1.** Đây chính là can thiệp giúp `dotnet/runtime` tăng tỷ lệ thành công mạnh nhất (~38% → 69%). Trong file đó hãy ghi: app làm gì, tech stack, **lệnh build chính xác**, coding convention, cấu trúc thư mục, và một danh sách **"đừng đụng vào"**. Giữ ngắn (≤ ~2 trang).

Và để chống "bệnh lười" của agent: prompt phải **cụ thể & toàn diện**. Thay vì *"Add tests"*, hãy viết kiểu:

```text
Add tests for all untested code paths in this type.
Use a code coverage tool to determine what is tested;
do not rely on code inspection alone.
```

Agent thường **dừng ngay khi đạt yêu cầu tối thiểu** — bạn không nói rõ thì nó không tự suy rộng.
:::

---

## 📒 Thuật ngữ chương này

Giao diện GitHub là tiếng Anh — dán bảng này cạnh máy khi mới học:

| Thuật ngữ | Nghĩa nhanh |
|---|---|
| **Git** | Công cụ quản lý phiên bản chạy ở máy bạn (do Linus Torvalds tạo) |
| **GitHub** | Dịch vụ đám mây đưa Git lên online để cộng tác (của Microsoft) |
| **Repository (repo)** | Kho chứa toàn bộ file dự án + lịch sử thay đổi |
| **Commit** | Một "ảnh chụp nhanh" code có ID riêng, lưu ở máy |
| **Push / Pull** | Đẩy code lên GitHub / Kéo code mới nhất về máy |
| **Clone** | Tải một repo từ GitHub về máy |
| **Branch (nhánh)** | Bản sao code để làm tính năng riêng, không đụng `main` |
| **Merge** | Gộp một nhánh vào nhánh khác |
| **Pull Request (PR)** | Đề nghị gộp thay đổi + nơi review code |
| **Conflict (xung đột)** | Khi hai người sửa cùng dòng, Git cần bạn chọn giữ phần nào |
| **Staging** | "Giỏ" chứa thay đổi đã `add`, chờ `commit` |
| **`.gitignore`** | File khai báo những thứ KHÔNG đưa lên repo (bí mật, file rác) |
| **GitHub Actions** | Tự động build/test/deploy khi push code (CI/CD) |
| **GitHub Copilot** | Trợ lý AI gợi ý code, chat, tự review PR |

---

## 🔗 Nguồn & link chính thức

- **GitHub:** [github.com](https://github.com) · **Bảng giá:** [github.com/pricing](https://github.com/pricing)
- **GitHub Copilot:** [github.com/features/copilot](https://github.com/features/copilot)
- **Tài liệu chính thức:** [docs.github.com](https://docs.github.com)
- **Học Git:** [github.com/git-guides](https://github.com/git-guides) · Cài Git: [git-scm.com](https://git-scm.com)
- **🎓 Student Developer Pack:** [education.github.com/pack](https://education.github.com/pack)
- Hướng dẫn Git tiếng Việt (cộng đồng): `rogerdudler.github.io/git-guide/index.vi.html`

**📚 Case study & bài đáng đọc (cho mục 06):**

- Microsoft .NET Blog — "Ten Months with Copilot Coding Agent in dotnet/runtime" *(case study số 1, nên đọc kỹ)*: [devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime](https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/)
- Hacker News — "We've been using Copilot coding agent internally at GitHub…": [news.ycombinator.com/item?id=44032660](https://news.ycombinator.com/item?id=44032660)
- Harness Blog — "The Impact of GitHub Copilot on Developer Productivity: A Case Study": [harness.io/blog](https://www.harness.io/blog/the-impact-of-github-copilot-on-developer-productivity-a-case-study)
- Blog cá nhân — "GitHub Actions Saved Me Hours Every Week. Here Is My Setup": `ruchi.no/posts/github-actions-saved-hours-my-setup`
- "GitHub Actions: The Hidden Billing Trap": `theexceptioncatcher.com/2026/02/github-billing/`
- "Is GitHub Copilot Getting Worse in 2026?": [nxcode.io](https://www.nxcode.io/resources/news/github-copilot-getting-worse-2026-developers-switching)

::: warning ⏱️ Lưu ý về tính thời sự
Bảng giá, chính sách Copilot và các con số trong chương phản ánh hiểu biết **tới thời điểm 2026** và **có thể đã thay đổi**. Riêng việc **tạm dừng signup Copilot Pro (từ 20/4/2026)** và **Copilot code review tính phí Actions trên repo private (từ 1/6/2026)** — hãy **kiểm tra lại trực tiếp trên github.com** trước khi quyết định.
:::
