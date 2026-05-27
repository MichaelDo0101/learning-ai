# Open-Source Collaboration

::: tip Mở đầu
**Muốn tham gia open-source nhưng không biết bắt đầu đâu?** Open-source không chỉ "free dùng code người khác", mà là **collaboration mode + career accelerator**. 1 contribution chất lượng cao có thể thuyết phục hơn 10 personal project trong CV.

Chương này dẫn full process open-source — từ tìm project đến submit PR, bước đầu contribution.
:::

**Bạn sẽ học**:

| Chương | Nội dung |
|-----|------|
| **1** | Open-source flow |
| **2** | Licenses |
| **3** | Collaboration etiquette |
| **4** | Start from zero |

---

## 0. Toàn cảnh: giá trị open-source

Open-source không chỉ code sharing, mà **mode collaboration global**. Linux, React, Vue, Node.js — projects đổi thay world đều open-source.

::: tip Lợi tham gia
- **Tech growth**: đọc code tốt, nhận review từ pro
- **Career**: contribution = tech business card tốt nhất
- **Community**: thành member dev global
- **Give back**: tool bạn dùng daily cần ai maintain
:::

---

## 1. Open-source flow

<OpenSourceWorkflowDemo />

### 1.1 Overview

```
Fork → Clone → Branch → Commit → Push → PR → Review → Merge
```

### 1.2 Key steps

**Tạo feature branch**: đừng dev trên main.

```bash
git checkout -b fix/typo-in-readme
```

**Clear commit message**:

```bash
git commit -m "fix: typo install command trong README"
```

**Tạo PR** với description gồm:
- Sửa gì, sao sửa
- Link Issue (`Fixes #123`)
- Test thế nào

---

## 2. Open-source licenses

<LicenseComparisonDemo />

### 2.1 Common licenses

| License | Đặc điểm | Project |
|-------|------|---------|
| **MIT** | Permissive nhất, gần như no limit | React, Vue, jQuery |
| **Apache 2.0** | Giữ copyright notice, có patent grant | Android, Kubernetes |
| **GPL** | Derivative cũng phải open-source | Linux, WordPress |
| **BSD** | Giống MIT | FreeBSD, Flask |

### 2.2 Chọn?

- **Cho nhiều người dùng**: MIT
- **Bảo vệ patent**: Apache 2.0
- **Đảm bảo derivative cũng open**: GPL

---

## 3. Collaboration etiquette

### 3.1 Issue etiquette

```markdown
<!-- Bad -->
Title: không dùng được
Content: code có bug

<!-- Good -->
Title: v2.1.0 login page white screen trên Safari 17
Content:
- Env: macOS 14.2, Safari 17.2
- Reproduce: 1. Open login 2. Enter cred 3. Click login
- Expected: jump home
- Actual: page white, console error TypeError: xxx
- Screenshot: [attached]
```

### 3.2 PR etiquette

- Đọc `CONTRIBUTING.md` trước, hiểu project convention
- 1 PR 1 thứ, đừng mix multiple change
- Keep PR small + focused, review dễ
- Patient wait review, polite respond

### 3.3 Review code người khác

- Acknowledge điểm tốt trước, sau suggest improvement
- Ask thay vì command: "Có cân nhắc dùng X không?"
- Give reason + alternative, không chỉ "không tốt"

---

## 4. Start from zero

### 4.1 Beginner-friendly contribution

| Type | Difficulty | Note |
|------|------|------|
| Fix doc error | Thấp | Typo, link cũ, không rõ |
| Translate | Thấp | Document sang ngôn ngữ khác |
| Add test | Trung | Uncovered code add test |
| Fix `good first issue` | Trung | Maintainer mark beginner-friendly |
| New feature | Cao | Discuss Issue trước, agreed mới làm |

### 4.2 Tìm project phù hợp

- Từ tool bạn dùng daily
- GitHub search label `good first issue`
- Project active (recent maintain)

---

## 5. AI assist open-source

### 5.1 Hiểu code base lạ nhanh

> **Prompt**:
> ```
> Mới clone project open-source. Phân tích directory structure sau,
> giải thích role mỗi dir/file, overall architecture + data flow.
> Muốn fix bug login → start từ đâu?
>
> [paste tree output]
> ```

### 5.2 Write PR description

> **Prompt**:
> ```
> Theo git diff sau, viết PR description gồm:
> - Title (concise, change là gì)
> - Description (sao change, change gì)
> - Test method (verify thế nào)
> - Link Issue (nếu có)
> English, professional + friendly.
>
> [paste git diff]
> ```

### 5.3 Assist translate

> **Prompt**:
> ```
> Translate VN tech doc sang EN:
> 1. Tech term dùng standard EN
> 2. Code comment + variable name không translate
> 3. Markdown format giữ nguyên
> 4. Natural, không machine-translate feel
>
> [paste VN doc]
> ```

::: tip AI caveat
Dùng AI viết PR description, đảm bảo tự hiểu từng line change. Reviewer có thể hỏi sao thay đổi — nếu không trả lời được = chưa hiểu thật.
:::

---

## 6. Tổng kết

1. **Flow**: Fork → Branch → Commit → PR → Review → Merge
2. **Licenses**: MIT permissive nhất, GPL strict nhất
3. **Etiquette**: clear Issue, focused PR, polite communication
4. **Start**: doc fix + `good first issue` first

::: tip Insight cuối
Open-source bản chất = **collaboration**. Tech skill quan trọng, nhưng communication + collaboration cũng key. PR thái độ tốt + description rõ ràng > PR code hoàn hảo + giao tiếp thô. **First PR không cần perfect, chỉ cần bước first.**
:::

::: tip 2026 cho VN dev
- **VN open-source**:
  - VietAI, FPT.AI projects
  - vue-vietnam, reactjs-vietnam communities
- **Practice**:
  - Hacktoberfest (mỗi October)
  - Google Summer of Code (GSoC)
  - GitHub Sponsors hỗ trợ maintainer
- **Big contributors VN**: contributors vào React Native, Vue, Tailwind
- **AI agent + open-source**: tools như Devin, SWE-agent fix Issue tự động (đang nascent)
:::

## Tài liệu

- [GitHub Open Source Guide](https://opensource.guide/)
- [Choose a License](https://choosealicense.com/)
- [Hacktoberfest](https://hacktoberfest.com/)
- [First Contributions](https://firstcontributions.github.io/)
