---
title: 'GitHub — Where the World Stores Code & Collaborates (with AI Copilot)'
description: 'Hands-on GitHub for beginners: Git vs GitHub, the add-commit-push cycle, branches & pull requests, GitHub Actions, and GitHub Copilot AI. Plus how students get Copilot Pro free via the Student Developer Pack.'
---

# GitHub — Where the World Stores Code & Collaborates

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🐙</p>

::: tip 🔥 Hands-on — 30 seconds
You're on a 4-person group project. Without GitHub: everyone messages files back and forth, naming them `final`, `final_v2`, `final_real_done`, then copies over each other → **lost code, no idea who changed what**. With GitHub: the whole team pushes to one repo, each person works on their own branch, and changes get merged through a reviewed Pull Request — **nobody overwrites anyone**, and if something breaks you roll back to the old version in one second.
**💸 Real payoff:** a green GitHub contribution graph + a public project is a ticket to a software job. Recruiters open your GitHub and look at it before they even read your CV.
:::

> **"Git is the notebook that records EVERY change to your code; GitHub is the cloud where the whole team writes into that notebook together.**
> **Beginners constantly mix the two up — telling them apart is half the battle."**

::: tip 🎯 After this chapter you'll be able to
- **Create a GitHub account + your first repo**, and push a small project to the cloud.
- **Know the `add → commit → push` cycle by heart** — 80% of daily Git work.
- **Collaborate with branches + Pull Requests**: build a feature in isolation, propose a merge, review code.
- **Clearly tell Git (a tool on your machine) apart from GitHub (a cloud service)** — no more confusion.
- **Turn on GitHub Copilot** (the AI code-suggestion assistant) and — if you're a student — get **Copilot Pro for free** via the Student Pack.
- **Avoid a fatal mistake**: accidentally pushing a `.env` file full of passwords to a public repo.
:::

This is the foundational tool of the programming profession. Master it, and every other AI coding tool (which all run on GitHub) gets a lot easier.

---

## 01 · What this tool is & when to use it

**GitHub** is a code-hosting and software-collaboration platform built on the **Git** version-control system. GitHub is owned by **Microsoft** (acquired in 2018) and is the world's largest code host — **over 150 million developers** (per github.com/about; some 2026 sources report higher).

Before going further, we have to untangle the single biggest knot for beginners:

::: warning 💡 Git ≠ GitHub — don't mix them up
- **Git** is an **open-source VCS** (version control system) created by **Linus Torvalds**. It's a **tool that runs on your own computer** and works even with no internet connection.
- **GitHub** is a **cloud service** that puts Git online, so **many people can work together**, review code, manage projects, and automate things.
- Analogy: Git is like **Microsoft Word** (software on your machine); GitHub is like **Google Drive** (cloud storage + sharing + collaboration).
:::

GitHub isn't just a "cloud drive for code." Here's what it actually does:

| Feature | The problem it solves |
|---|---|
| **Repository** | Stores all your project files + their full change history. Supports public and private repos **with no limit, even on the Free plan** |
| **Git version control** | Tracks every change as a **commit** (a snapshot with its own ID); roll back to old versions, see who changed what and when |
| **Branch & Merge** | Create a separate branch to build a feature / fix a bug without touching the main code, then merge it back |
| **Pull Request (PR)** | Propose merging changes — **the heart of collaboration**; enables code review and line-by-line comments |
| **Issues & Projects** | Manage tasks like a Kanban board; assign work to specific people |
| **GitHub Actions** | Automatically build/test/deploy every time you push code (CI/CD) |
| **GitHub Pages** | Host a static website **for free** directly from a repo |
| **GitHub Copilot** | An **AI** assistant that suggests code, answers questions in chat, and auto-reviews PRs |
| **Dependabot** | Automatically warns about and patches security holes in the libraries you use |

**In the 2026 AI landscape**, GitHub has deeply integrated its AI assistant **GitHub Copilot**: real-time code suggestions, an agent that writes code on its own, and automated code review. Notable is the **GitHub Copilot coding agent** — an AI agent that runs right on GitHub Actions, pulls in context from your whole repo, and **opens a Pull Request with its fix on its own**, managed through the new **Agents** tab.

::: tip 📌 Real example — does this agent actually work?
This isn't theory. **Microsoft's own .NET team** ran the Copilot Coding Agent (CCA) for real on `dotnet/runtime` — a **29-year-old, extremely complex** codebase — for 10 months (May 2025 → Mar 2026). How it works: you assign an issue to **"Copilot" as the assignee**, the agent researches the repo on its own, plans, writes code on a `copilot/*` branch, opens a PR, then waits for human review.

**Real results:** this repo alone saw **878 PRs from CCA, 535 merged (67.9%)**; across 7 repos combined, **2,963 PRs, 1,885 merged (68.6%)**. For comparison: Microsoft engineers hit 87.1%, community contributors 79.7% — the agent is lower than humans but **not a disaster**, and the agent's revert rate (0.6%) is close to humans' (0.8%).

**The lesson for you:** AI agents are now capable of real work on large projects, but the agent is a *junior teammate* — it needs careful human review, not "press a button and you're done." Full details in section 06.
*(Source: Microsoft .NET Blog — "Ten Months with Copilot Coding Agent in dotnet/runtime")*
:::

**When should you use GitHub?** Almost **always**, right from your very first personal project:
- You write code (in any language) and want to store it safely, with history.
- You work in a team and need multiple people editing code without overwriting each other.
- You want a real portfolio for job hunting.
- You want to use AI coding tools (most of which are built around GitHub).

::: warning 🚧 When NOT to use GitHub (GitHub's own real limits)
GitHub is great for **code**, but it's not the place for everything:
- **Not for large / binary files:** GitHub caps **a single file at 100MB**, and repos should stay small (ideally under 1–5GB). Videos, datasets, heavy design files → use **Git LFS** or a different storage service.
- **Not a place for secrets / sensitive data** — **even in a private repo**. Passwords, keys, and customer data should not live in Git.
- **A public repo = anyone can clone it, and it's very hard to "delete from the internet":** once it's public (even for a few minutes), someone may already have **forked or cached** it — deleting the original repo doesn't delete those copies. This is why leaking a key in a public repo means you **must rotate the key immediately**, not just delete the file.
- **Free GitHub Actions has a quota** (see section 02) — large projects running lots of CI/CD can **incur charges**.
:::

::: tip 🔑 Telling it apart from "look-alikes"
- **GitLab** and **Bitbucket**: similar competing platforms, but **different companies**. The Git concepts are the same; here we learn GitHub.
- **GitHub Copilot**: a **separate AI product** from GitHub, **billed separately** — don't confuse it with a basic GitHub account (which is free).
:::

### Compared to other tools (objective, per our understanding as of mid-2026)

**Code-hosting platforms — GitHub vs GitLab vs Bitbucket:**

| Criterion | **GitHub** | **GitLab** | **Bitbucket** |
|---|---|---|---|
| Strongest at | Largest community, AI ecosystem (Copilot), open source | Deeply integrated CI/CD, easy to **self-host** (run on your own server) | Tight **Jira / Atlassian** integration (great for teams already on Jira) |
| Community size | Largest (over 150 million devs) | Much smaller | Much smaller |
| For beginners | **Recommended** — job-hunting ticket, lots of docs | Consider if your company requires self-hosting | Consider if your company already uses Jira |

> Why choose GitHub to learn on: the biggest community means **more docs, more people to help**, and a nice GitHub profile carries real weight with recruiters. The Git concepts are identical, so once you've learned GitHub, switching to GitLab/Bitbucket is fast.

**AI coding assistants — Copilot vs Cursor vs Cody:**

| Tool | Quick positioning |
|---|---|
| **GitHub Copilot** | **Deeply integrated with GitHub** (agent runs on Actions, auto-reviews PRs); runs in VS Code and many IDEs |
| **Cursor** | A **standalone IDE** (forked from VS Code), strong at **multi-file edits**, with chat that understands your codebase |
| **Cody** (Sourcegraph) | **Generous free tier**, strong at reading **large-codebase context** |

> You don't need to pick the "one true tool" — Copilot is a safe choice because it's tied to GitHub and is **free for students** (see the Student Pack below). You can try Cursor/Cody later once you're comfortable.

---

## 02 · Pricing & access

GitHub works **anywhere in the world** — it's the standard tool across the software industry, with a huge developer community. Sign-up needs **only an email + username + password**, **no credit card**.

**Sign up:** go to [github.com](https://github.com), click Sign up — that's it. The basic account is **free**.

### Pricing (per github.com/pricing, USD)

| Plan | Price | What's notable |
|---|---|---|
| **Free** | **$0** | Unlimited public/private repos, unlimited collaborators on public repos, **2,000 Actions minutes/month**, 500MB package storage, Dependabot, Issues & Projects, Codespaces ($0 spending limit) |
| **Team** | $4/user/month (first 12 months) | 3,000 Actions minutes, repository rules, multiple reviewers per PR |
| **Enterprise** | $21/user/month | 50,000 Actions minutes, SAML SSO, advanced auditing, SOC 2 |

::: tip 💸 The Free plan is more than enough to learn
You **don't need to pay a cent** to learn and build a portfolio: unlimited private repos, 2,000 Actions minutes/month (and **completely free for public repos**), 500MB package storage. Don't rush to upgrade.
:::

### GitHub Copilot (AI) specifically — billed separately

::: warning 💳 A BIG change in how billing works (from June 1, 2026)
Per official docs as of mid-2026 (github.blog/changelog dated June 1, 2026), **all Copilot plans have moved to usage-based billing measured in "GitHub AI Credits"**: each plan comes with a **monthly AI Credits allowance**, and once you use it up you **buy more**. The old "premium request" concept is replaced by AI Credits. Also, per the same source, the **Opus models have been removed from the Pro plan** (now only on Pro+ and above). The figures below reflect our understanding as of that point — **double-check at docs.github.com/copilot before buying**.
:::

**Individual plans:**

| Copilot plan | Price | What you get (as of mid-2026) |
|---|---|---|
| **Free** | **$0** | A small monthly allowance of completions + agent requests; access to a few basic models (e.g. Haiku 4.5, GPT-5 mini) |
| **Pro** | $10/month | Generous completions + **~$10 AI Credits/month included**; (no more Opus) |
| **Pro+** | $39/month | **~$39 AI Credits/month included**; unlocks premium models (including Opus) |
| **Max** | $100/month | The highest allowance for individuals |

**Plans for companies (important if you're employed — don't confuse these with the GitHub platform plans):**

| Copilot plan | Price | For |
|---|---|---|
| **Business** | ~$19/user/month | Businesses; centralized administration, **does not train on your code** |
| **Enterprise** | ~$39/user/month | Large organizations; adds advanced admin/security features |

::: tip 🧮 What happens when AI Credits run out?
When you've used up your AI Credits for the month, basic completions/chat usually still run within the plan's allowance, while credit-heavy tasks (premium models, the agent) will **stop or ask you to buy more**. If you're a beginner who's just learning, the **Free plan or Student Pack is plenty** — you'll almost never hit the ceiling.
:::

::: warning ⚠️ Copilot Pro sign-ups are PAUSED
Per data available as of this document, **as of April 20, 2026, new sign-ups for Copilot Pro/Pro+/Max/Student are PAUSED**. Only previously verified users or upgrades can use them. **Check the current status when you're reading this** — this policy may have changed.
:::

::: warning 🔒 Where do your code & data go when you use Copilot?
Copilot is an AI that **runs in the cloud** — to generate a suggestion, it **sends the code and the context around your cursor to the server**. A few things to know (per GitHub's docs / Trust Center as of mid-2026):
- **Individual plans** have a *"Allow GitHub to use my code snippets for product improvements"* setting — if you don't want your code used to improve the product, **TURN IT OFF** in settings.
- **Business / Enterprise plans** by default **do not use customer code to train models**, and offer **content exclusion** (excluding sensitive files/repos from Copilot).
- **Private repos stay safe**, but **the prompt you send (via Chat) is not part of the repo** — so **don't paste secrets, passwords, personal information (PII), or customer code** into Copilot Chat.

Simple rule: treat Copilot Chat like a **public chat box** — if you don't want it leaked, don't paste it in.
:::

::: tip 🌍 Note for Vietnam / SEA readers
- GitHub works fine in Vietnam — **no blocking, direct access, no VPN needed**. The dev community is large, with plenty of free Vietnamese-language Git tutorials (e.g. the guide at `rogerdudler.github.io/git-guide/index.vi.html`).
- **Paid plans require an international Visa/Mastercard** — a hurdle if you don't have one. But the Free plan + Student Pack are more than enough.
- The GitHub interface is **English-only**, so terms (commit, branch, pull request…) may feel unfamiliar at first — keep the **glossary** at the end of this chapter handy.
:::

### 🎓 The golden opportunity for students

::: tip 🎓 GitHub Student Developer Pack — FREE, and hugely valuable
The **GitHub Student Developer Pack** gives you **over 90 tools worth thousands of USD**, including:
- **Copilot Pro** (a top-tier AI coding assistant)
- **$100 in Azure credit**
- **JetBrains** (a professional IDE suite)
- **Canva Pro**, and many more tools.

Students with a **student ID / school email** (a `.edu` domain or your school's domain) can sign up at [education.github.com/pack](https://education.github.com/pack). **Verifying via a school `.edu` email is fastest** (usually activated within ~72 hours). This is the **legitimate way for students to use top-tier AI coding tools for free**.

*Verified teachers and well-known open-source maintainers also get Copilot Pro free.*
:::

::: warning 🚫 DON'T buy sketchy accounts
Lots of shops advertise cheap "Student Pack accounts." **Absolutely don't buy them** — it violates the terms, gets your account **banned** easily, and you lose everything. **Sign up yourself with your own real documents.** If you teach: guide your students to verify themselves; don't let them buy sketchy accounts.
:::

---

## 03 · Hands-on workflow — step by step

Below are 10 steps that take you from zero to AI-assisted teamwork. Follow them in order.

### Step 1 — Create an account
Create a free account at [github.com](https://github.com) (email + username + password).

### Step 2 — Install Git on your machine
Download Git at [git-scm.com](https://git-scm.com). After installing, **configure your identity** (do this **once**) so Git knows who authored each commit:

```bash
git config --global user.name "Jane Doe"
git config --global user.email "email@example.com"
```

### Step 3 — Create a repository
On github.com, click the **New repository** button, give it a name (e.g. `my-first-project`), and choose **public** or **private**.

### Step 4 — Clone the repo to your machine
**Clone** = download the repo from GitHub to your computer:

```bash
git clone https://github.com/username/repo-name.git
```

### Step 5 — Edit code & check status
Open files and edit them as usual. To see which files Git thinks you've changed:

```bash
git status
```

### Step 6 — The Stage → Commit → Push cycle (THE CORE)

This is the **heart** of Git, repeated every day. Three moves:

```bash
git add index.html        # put a file into "staging" (the basket of things to save)
# or add all changes:
git add .

git commit -m "Fix null pointer in the data-fetching logic"   # save a snapshot

git push -u origin main   # push it up to GitHub
```

::: tip 🔑 Understand the 3 moves with a "shipping a package" analogy
- **`git add`** = put items in the box (choose what to send — called *staging*).
- **`git commit`** = label + seal the box, writing down "what's in this box" (the commit message). This is a **snapshot with its own ID**, saved **on your machine**.
- **`git push`** = take the box to the post office and send it off (push it up to GitHub for others to see).
:::

::: warning 💡 `add` and `commit` only happen ON YOUR MACHINE
After `git commit`, your code is **still not on GitHub** — it's only saved in the Git repo on your machine. You have to `git push` for others to see it. This is something beginners constantly forget.
:::

### Step 7 — Teamwork with branches
To build a new feature **without touching the main code** (the `main` branch), create a separate branch:

```bash
git branch new-feature        # create the branch
git checkout new-feature      # switch to that branch

# Tip: combine the two commands into one:
git checkout -b new-feature
```

Now you work on the `new-feature` branch and can `add` + `commit` freely while `main` stays safe.

### Step 8 — Open a Pull Request (PR)
Push your branch to GitHub, then go to the github.com web interface — you'll see a **Compare & pull request** button. Click it to **propose merging** the `new-feature` branch into `main`. Your teammates will **review, comment line by line, and approve**.

```bash
git push -u origin new-feature
# then go to github.com and click "Compare & pull request"
```

### Step 9 — Merge & sync
After the PR is approved, click the **Merge** button on the web. Now other members need to pull the latest code to their machines:

```bash
git pull
```

### Step 10 (optional) — Turn on AI
Install the **GitHub Copilot** extension in VS Code, or enable **Copilot code review** so the AI auto-reviews PRs. Students/teachers can activate Copilot for free at [github.com/settings/education/benefits](https://github.com/settings/education/benefits).

**How to turn on Copilot in VS Code (first time):**
1. Open VS Code → the **Extensions** tab (Ctrl+Shift+X) → search for and install **GitHub Copilot** (and **GitHub Copilot Chat**).
2. Click **Sign in to GitHub** when prompted → sign in with a GitHub account that has Copilot access (Free/Pro/Student).
3. Know the **3 modes** of using Copilot:
   - **Completion (inline suggestions):** Copilot shows grayed-out suggestions as you type — press **Tab** to accept, **Esc** to dismiss.
   - **Chat:** ask questions in the chat panel on the side (explain, generate code, suggest fixes).
   - **Agent mode:** hand off a larger task and let Copilot **edit multiple files on its own** (needs to be enabled in a supporting version).

::: tip 🤖 Using GitHub Copilot Chat in VS Code
In the chat panel you use commands like:

```text
/explain — explain the selected code
/fix — suggest a fix for the selected code
@workspace Write a JavaScript function to validate an email and unit tests for it
```

`@workspace` lets Copilot read your whole project's context to answer more accurately. The **Tab** shortcut to accept inline suggestions is the action you'll use most often.
:::

### 📋 The "survival" Git command set — print it and tape it next to your machine

```bash
git status                  # see which files changed
git add .                   # stage all changes
git commit -m "clear message"  # save a snapshot
git push                    # push up to GitHub
git pull                    # pull the latest code to your machine
git log --oneline           # view commit history (one line per commit)
git branch new-feature      # create a new branch
git checkout new-feature    # switch to a branch
git remote -v               # see where this repo connects to GitHub
```

### 🔑 Authentication when pushing — read this BEFORE you hit the error (critical for beginners)

::: warning 🚫 GitHub REMOVED password login for push (back in 2021)
This is the **#1 beginner mistake**: you run `git push`, GitHub asks for a password, you enter your account password → **error**:

```text
remote: Support for password authentication was removed.
fatal: Authentication failed
```

Why: since 2021, GitHub **no longer allows pushing with your account password**. You must use **one of these 3 methods**.
:::

**Method 1 — Personal Access Token (PAT), simplest when cloning over HTTPS:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens) → create a token (Tokens classic, check the `repo` scope).
2. When `git push` asks for a password, **paste the token into the password field** (not your account password). Save the token carefully — it's shown only once.

**Method 2 — SSH key (no token typing each time):**

```bash
ssh-keygen -t ed25519 -C "email@example.com"   # generate a key pair (press Enter through the prompts for defaults)
cat ~/.ssh/id_ed25519.pub                       # copy the contents of the PUBLIC key
```

Paste the public key into [github.com/settings/keys](https://github.com/settings/keys) (New SSH key). Then clone using the **SSH** link (form `git@github.com:username/repo.git`) instead of HTTPS.

**Method 3 — GitHub CLI (`gh`), which handles auth for you:** install `gh` then run `gh auth login` and follow the prompts — no need to create a PAT/SSH yourself (see section 04).

---

## 04 · Tips & common mistakes

### ✅ Tips from those who came before

::: tip 💡 8 hands-on tips
- **Memorize `add → commit → push` first.** That's 80% of the work — you don't need deep Git knowledge yet.
- **Write CLEAR commit messages** that describe *what you did* instead of *"fixed bug"*. Example: *"Fix crash when logging in with an empty email"* is far better than *"fix"*.
- **Afraid of the command line?** Use **GitHub Desktop** (a GUI app) or the **Source Control** panel in VS Code — `add`/`commit`/`push` with just buttons, no commands to type.
- **Students/teachers: sign up for the Student Pack / Education NOW** to get Copilot Pro free — verifying via a school `.edu` email is fastest (~72 hours).
- **Always create a `.gitignore` file** to exclude junk/secret files (`node_modules`, `.env`, keys) from commits — avoid leaking passwords to a public repo.
- **Learn by doing:** create a personal repo, push a small project, then use **GitHub Pages** to host it for free so you have a real product for your portfolio.
- **Use Copilot code review** to let the AI catch PR bugs before you merge — you learn a lot from the AI's feedback.
- **Set your CV/portfolio repo to public** so recruiters can see it. A green GitHub contribution graph is a plus when job hunting.
:::

::: tip 📌 Real example — GitHub Actions saves hours every week
A developer (Ruchi Yadav) describes spending **~1 hour every Monday morning** testing and deploying manually. She built a 3-tier GitHub Actions pipeline to automate it all:

- **On every PR opened:** run unit tests across multiple Node versions (16/18/20), lint, `npm audit`, build, deploy a **preview URL** like `pr-123.preview.myapp.com`, then a **bot auto-comments the results on the PR**.
- **On merge to `main`:** run full tests + E2E (Playwright), deploy to staging, notify Slack.
- **On a release tag:** build production, smoke-test, zero-downtime deploy, auto-generate release notes.

**Real results:** the time to check a PR dropped from **20 minutes to ~5 minutes** by running jobs **in parallel** instead of sequentially; caching npm by `package-lock.json` **cut dependency-download time by 50%**.

A few technical tips she emphasizes:

```yaml
# 1) Cache dependencies to run faster (key on package-lock.json)
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}

# 2) Stop jobs from running forever
jobs:
  test:
    timeout-minutes: 10
```

Also: **pin actions by commit hash** (not by tag) for security, and split out **reusable workflows** to share across repos.
*(Source: blog "GitHub Actions Saved Me Hours Every Week. Here Is My Setup" — ruchi.no)*
:::

### 🚨 Common mistakes (and how to escape them)

::: warning 🚨 9 common traps
1. **Forgetting to `git pull` before you start working** → you hit a **conflict** when multiple people edit the same file. **Always `git pull` the latest before you begin.**
2. **A merge conflict scares beginners** → stay calm: a conflict just means Git needs you to **choose which version of the code to keep**. Open the file, find the `<<<<<<<`, `=======`, `>>>>>>>` markers, edit manually, and delete those markers.
3. **Accidentally committing & pushing secret files** (`.env`, API keys, passwords) to a **public** repo → **leaked instantly**. Use `.gitignore` from the start; if it leaks, **rotate the key immediately**.
4. **Confusing Git vs GitHub** → Git runs on your machine, GitHub is the cloud. Learn to **keep the two concepts separate**.
5. **Thinking the Free plan has no private repos** → **WRONG**. The Free plan has **unlimited** private repos.
6. **Expecting that you have to sign up for Copilot Pro to use it right away** → as of April 20, 2026, new sign-ups for Pro/Pro+/Max/Student are **paused**; check the current status when you use it.
7. **Unexpected charges from Copilot code review** → from **June 1, 2026**, Copilot code review on **private** repos consumes **both AI Credits AND GitHub Actions minutes**. Watch your quota.
8. **Committing straight to `main` on a team** → risky. Use **branches + Pull Requests** so there's a review before merging.
9. **Buying a sketchy Student Pack account** → violates the terms, easily banned. **Verify yourself with real documents.**
:::

::: warning 📌 Real example — the GitHub Actions billing trap (burns your whole budget)
GitHub Actions is free for 2,000 minutes/month, but there's a little-known trap: on private repos, **workflows still consume paid minutes**, and some setups can burn through them fast. One reported case: a junior dev **forked a repo over the weekend** that contained a scheduled `cron` workflow running **every 5 minutes for 48 hours** on a powerful runner → it **burned the entire month's Actions budget** before anyone noticed.

**How to prevent it:**
- **Disable Actions for forks** until approved (Settings → Actions).
- **Tighten artifact retention** (the default keeps them for **90 days** — very storage-heavy).
- Set `timeout-minutes` on every job; carefully review `cron` and `schedule` triggers.
- Note also: from **June 1, 2026**, Copilot code review also starts **consuming GitHub Actions minutes** on private repos.

**Lesson:** with automation, always ask *"how many times could this run, and how much does it cost?"* before turning it on.
*(Source: "GitHub Actions: The Hidden Billing Trap" — theexceptioncatcher.com)*
:::

::: details 👉 What to do when you hit a merge conflict (concrete example)
When you `git pull` or merge and two people edited **the same line**, Git inserts markers into the file like this:

```text
<<<<<<< HEAD
const price = 100000;   // YOUR code (current branch)
=======
const price = 120000;   // SOMEONE ELSE'S code (the branch being merged in)
>>>>>>> new-feature
```

**How to handle it:** decide which value to keep (or merge both), **delete all 3 marker lines** `<<<<<<<`, `=======`, `>>>>>>>`, and leave exactly the code you want. Then `git add` + `git commit` to finish the merge. A conflict **is not a dangerous error** — it's just Git politely asking "which part do I keep?".
:::

::: details ❓ FAQ & common errors (quick lookup when you're stuck)

**`remote: Support for password authentication was removed`** — you're typing your account password when pushing. GitHub removed this in 2021. Use a **Personal Access Token**, **SSH key**, or **GitHub CLI** (see the "Authentication when pushing" block in section 03).

**`fatal: remote origin already exists`** — the repo already has a remote named `origin`. Either change its URL:

```bash
git remote set-url origin https://github.com/username/repo.git
```

or remove it and add it back: `git remote remove origin` → `git remote add origin <url>`.

**`error: failed to push some refs ... Updates were rejected`** — GitHub has newer commits than your machine (usually because someone else pushed, or you created the repo with a README). Pull first, then push again:

```bash
git pull --rebase origin main
git push
```

**`Permission denied (publickey)`** — you cloned over SSH but haven't added your SSH key to GitHub (or added it wrong). Create a key and add it to [github.com/settings/keys](https://github.com/settings/keys) (see section 03). Test the connection: `ssh -T git@github.com`.

**Accidentally `commit`ted the wrong thing / want to set changes aside to do something else** — use `git stash` to **temporarily set aside** all uncommitted changes, do something else, then `git stash pop` to get them back:

```bash
git stash        # set aside your in-progress changes
git stash pop    # get them back when you return
```

**Not sure what to put in `.gitignore`** — go to [gitignore.io](https://www.toptal.com/developers/gitignore) (type "Node", "Python"…) or see the official templates at [github.com/github/gitignore](https://github.com/github/gitignore). A minimal example for Node:

```text
node_modules/
.env
dist/
*.log
.DS_Store
```

:::

::: tip 🌟 3 tips to "score points" with recruiters (do these early)
- **GitHub CLI (`gh`):** after `gh auth login`, you can open a Pull Request straight from the terminal with `gh pr create` — fast, and it **sidesteps the whole PAT/SSH hassle**.
- **Profile README:** create a repo **with the same name as your username** (e.g. if your username is `janedoe`, create a repo called `janedoe`), add a `README.md` → its contents **show up right on your GitHub profile page**. This is the "cover page" recruiters see first — perfectly on-message with "GitHub is your job-hunting ticket."
- **README.md with badges + images** for each project: adding screenshots + badges (build passing, language) makes your portfolio **look far more professional**.
:::

---

## 05 · Exercises / mini-projects

Do these 3 by hand and you'll have 90% of the GitHub you use day to day.

### 🧪 Exercise 1 — Your first repo & portfolio (personal)

> **Goal:** put a small project on GitHub and host it for free as a portfolio.

1. Create an account, install Git, run the 2 `git config` commands (Step 2 in section 03).
2. Create a **public** repo named `my-portfolio` with a simple `index.html` file (a few lines introducing yourself).
3. `clone` it to your machine → edit `index.html` → run the full cycle `git add . → git commit -m "..." → git push`.
4. Go to the repo's **Settings → Pages**, enable **GitHub Pages** to get a **free** static website with a public link.

**Done when:** opening the GitHub Pages link shows your page; the repo's **Commits** tab has at least 2 commits with clear messages.

### 🧪 Exercise 2 — Branch & Pull Request (simulating teamwork)

> **Goal:** get comfortable with the branch + PR flow WITHOUT touching `main`.

1. In the Exercise 1 repo, create a new branch: `git checkout -b add-contact-section`.
2. Add a "Contact" section to `index.html`, then `add` + `commit`.
3. Push the branch: `git push -u origin add-contact-section`.
4. Go to github.com, click **Compare & pull request**, write a PR description, then **self-review** and **Merge** into `main`.
5. Back on your machine, run `git checkout main` then `git pull` to sync.

**Done when:** the repo has one merged Pull Request; `main` contains the "Contact" section; you understand why branching is safer than committing straight to `main`.

### 🧪 Exercise 3 — Block secret leaks + try AI (slightly advanced)

> **Goal:** build a security reflex and use Copilot.

1. Create a `.env` file with one fake line like `API_KEY=demo123`.
2. Create a `.gitignore` file and add the line `.env` (and `node_modules`). Run `git status` → confirm Git **no longer sees** the `.env` file. (This is your shield against key leaks.)
3. *(If you have Copilot)* In VS Code, open Copilot Chat and type:

```text
@workspace Write a JavaScript function to validate an email and unit tests for it
```

Read the code the AI generates, understand it, then commit it if it makes sense.

**Done when:** `git status` confirms `.env` has been excluded by `.gitignore` — you've built the reflex of *never pushing secrets to a public repo*.

::: tip 🔑 Why these 3 exercises matter
Exercise 1 gives you a **real product** to show off. Exercise 2 gives you the **industry-standard teamwork flow**. Exercise 3 trains a **security reflex** — the thing that separates careful people from those who accidentally leak the company's passwords. All three are immediately useful on the job.
:::

---

## 06 · Case studies & real use-cases (from the community)

Theory is one thing — this section gathers **real stories, with numbers and sources** about using GitHub + Copilot Agent + Actions in 2025–2026. The goal: show you where AI agents on GitHub are *genuinely* strong, where they *genuinely* struggle, and what practitioners complain about.

::: tip 🧭 If you're new to this
This section is fairly number-heavy. **If you've just created your first repo, reading Case 1 + the summary table at the end is enough** — save the rest for after you're comfortable with GitHub.
:::

::: warning 📖 How to read this section
The strongest, most verifiable source is the **official report from the .NET team (Microsoft)** on the `dotnet/runtime` repo — with real PR counts, detailed numbers, and real quotes from engineer **Stephen Toub**. The enterprise numbers (Accenture, Harness) are **directional indicators** drawn from vendor research/blogs, **not absolute causal proof** — read them with the caveat. The community-reaction part comes from **Hacker News** (real link) and has been **paraphrased** (no long verbatim quotes).
:::

### 🟢 Case 1 — `dotnet/runtime`: 10 months of the Copilot Coding Agent (the headline case study)

> **Context:** Microsoft's .NET team ran the Copilot Coding Agent (CCA) for real on `dotnet/runtime` — a **29-year-old** codebase — from May 2025 to March 2026.

**What they did:** assign an issue to Copilot (set the assignee = "Copilot"). The agent researches the repo, plans, writes code on a `copilot/*` branch, opens a PR, and waits for human review. Some PRs start in "ask mode" (brainstorm an optimization direction first, then have the agent implement it).

**Results / real numbers:**

- `dotnet/runtime`: **878 PRs from CCA, 535 merged (67.9%)**, +95,000 lines / −31,000 lines. Across 7 repos: **2,963 PRs, 1,885 merged (68.6%)**.
- The success rate **rose over time** thanks to proper setup: 41.7% (May 2025) → 58.8% (Oct 2025) → **72.1% (Mar 2026)**. Before there was a `copilot-instructions.md` file and the firewall was opened for the package feed, the agent **couldn't even build the repo**; after setup, the rate jumped from ~38% to ~69%.
- By task type: **Removal/Cleanup 84.7%** (best), writing tests 75.6%, refactoring 69.7%, bug fixing 69.4%, **performance optimization only 54.5%**, and native/platform-specific work very low (since the runner only runs Linux).

**Lessons:**

1. The most valuable investment is **writing "instructions" describing how the team works** — every convention you record helps avoid repeated mistakes across hundreds of later PRs.
2. **Pick tasks that fit the AI's strengths:** clear, with a way to reproduce the bug (repro), with existing test patterns, and not requiring architectural judgment.
3. **The bottleneck shifts from "writing code" to "reviewing code."**

*(Source: Microsoft .NET Blog — "Ten Months with Copilot Coding Agent in dotnet/runtime", devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime)*

### 🟢 Case 2 — The "birthday party experiment": assigning 22+ issues while waiting for a flight

> **Context:** Stephen Toub assigned **22+ issues to CCA in ~1 hour** while waiting at an airport, to see how the agent handled all kinds of tasks.

A few concrete results (with real PR numbers):

- **PR #120619** (a thread-safety bug in `System.Text.Json`): the agent confirmed the hypothesis about the bug + wrote a regression test, **correct on the first try**. Toub describes this roughly as "CCA at its best: a clear bug, a clear fix."
- **PR #120622:** the agent found a **one-line fix** in the unfamiliar `NonBacktracking` regex engine — something a human would have to debug for hours to find.
- **PR #120638:** the agent intended to add validation for regex, but **investigated and found the old behavior was intentional** → closed the PR itself. The value lies in the "investigate to conclude that you *shouldn't* fix" part.
- **PR #120633 (BCrypt):** a "20+ commit odyssey" that needed architectural judgment about interop → ultimately **closed**. It illustrates the weakness when deep understanding of conventions and codebase history is required.

**Lesson:** the agent shines at **small-and-clear bugs** and **investigation** work; it struggles with **architectural decisions**. Even when a PR gets closed, it's still useful as a **low-cost probe** (it still yields insight).

*(Source: same .NET Blog as Case 1)*

### 🟡 Case 3 — Coding from a phone at 33,000 feet (and the "review bomb" trap)

> **Context:** Toub opened **9 PRs from his phone on a plane** (bug fixes, performance optimizations, refactors) — something previously impossible without a laptop.

Result: many large PRs were merged, e.g. a PR removing an obsolete preprocessor constant across **112 files** (which needed context-aware transformation, not a mechanical search-replace).

**But here's the real trap:** Toub admits, roughly, *"in a moment I created 5–9 hours of review work."* AI shifts the burden onto **human review capacity**. A supporting number illustrates this: **52% of CCA's merged PRs had a human push a commit directly** to the branch (faster than explaining it to the agent); when a human intervened, the merge rate jumped to **86%** versus **55%** when leaving the agent fully on its own.

**Lesson:** the speed of producing code is no longer the bottleneck — **review capacity is the new bottleneck**. Don't mass-assign tasks and then have no time to read the results.

*(Source: same .NET Blog as Case 1)*

### 🟡 Case 4 — GitHub internally: the agent is "contributor #5" (and the community's skepticism)

> **Context:** When the Coding Agent launched (May 2025), GitHub announced ~**400 employees** using the agent across **300+ repos**, ~**1,000 PRs merged**; the agent ranked **#5** by number of contributions in its own repo.

**Community reaction (paraphrased from a real Hacker News thread):**

- Skepticism about **survivorship bias**: announcing "1,000 PRs merged" but **not saying how many PRs were rejected** → "the number of PRs doesn't speak to quality on its own."
- Sarcasm: if the agent were truly useful it would be contributor #1, not #5. (GitHub's product lead responded in the thread: humans still held ranks #1–#4, and the agent was running the **Claude 3.7 Sonnet** model at the time.)
- Job worries: roughly "those boring tasks are what I *get paid* to do, and I like getting paid."

**Lesson:** vendor marketing numbers need careful reading — **"PRs merged" doesn't automatically equal value**.

*(Source: Hacker News — "We've been using Copilot coding agent internally at GitHub…", news.ycombinator.com/item?id=44032660)*

### 🟢 Case 5 — Enterprises measuring it: Accenture & Harness

Two examples showing **measurable but moderate** impact (not doubled output):

- **Accenture (~450 developers):** a Copilot pilot showed **+8.69% PRs/dev**, **+15% PR merge rate**, **+84% build success**.
- **Harness** (toggling Copilot on/off as a natural A/B test): the on-month versus the off-month showed **+10.6% average PRs** and a **3.5-hour reduction in cycle time**.

**Lesson:** the clearest benefit is in **cycle time** and **less friction**, not a dramatic jump in absolute quality.

::: warning ⚠️ Read enterprise numbers with caution
The numbers above are drawn from **vendor research/blogs** (GitHub × Accenture, Harness) — treat them as **directional indicators**, not causal proof. Team context, project type, measurement method… all affect the results.
:::

*(Source: Harness Blog — "The Impact of GitHub Copilot on Developer Productivity: A Case Study", harness.io; Accenture numbers from GitHub × Accenture research, cited via 2026 review articles.)*

### 🔴 Case 6 — Complaints & real traps (the dark side, worth knowing before you trust AI)

For balance, here are **real** problems that have been documented:

- **"Review bomb":** AI creates PRs faster than humans can review them. CCA averaged **16.5 review comments per merged PR** (humans: 12.4) → review takes real effort, not "rubber-stamping."
- **Lots of tests but poor quality at first:** **65.7% of the lines CCA added were tests** (humans: 49.9%), but "quantity over quality," sometimes **encoding current wrong behavior as 'correct'** (the test passes but tests the wrong thing).
- **The "PR ads" incident (Mar 2026):** Copilot inserted advertising-style "tips" into **over 1.5 million PRs** (spilling over to GitLab too) without permission; Microsoft called it "a programming logic bug." Devs reacted very harshly → a lesson about **trust** in automated tools.
- **Struggles on large, multi-file tasks:** per several 2026 reviews, accuracy drops to ~50% on projects over 10,000 lines; greenfield (new repo) runs noticeably faster than brownfield (old repo) — same .NET team, a new repo hit 77.3% success, median merge 17.4 hours, versus `dotnet/runtime` at 67.9% / 50 hours.
- **The "illusion of completion":** the agent often reports "done, exactly to spec" when in reality it's **missing functionality and has no tests** → a **human-in-the-loop is mandatory**.

::: warning 🚧 Some numbers need re-checking
The numbers from **third-party reviews** (e.g. "1.5 million PR ads," "~50% accuracy on projects over 10,000 lines") originate from **aggregator blogs**, so **verify them** before citing them as firm figures. By contrast, all numbers from the **.NET Blog** and the figures GitHub stated on **Hacker News** are highly reliable.
:::

*(Source: .NET Blog from Case 1; 2026 review aggregations such as nxcode.io — "Is GitHub Copilot Getting Worse in 2026?")*

### 🧭 Use-case summary: what AI agents are / aren't suited for

From the cases above, we can draw a **map for delegating work to an AI agent**:

| Hand to the agent (high success) | Do yourself / needs human guidance |
|---|---|
| Dead-code cleanup, mass removal of obsolete constants/preprocessors (~85%) | Architectural decisions, changing interop patterns |
| Small bugs with a clear repro + writing regression tests | Complex performance optimization (~54%) |
| Writing extra tests for uncovered code paths (with careful prompting) | Platform-specific work (Windows/native) when the runner only has Linux |
| Mechanical refactors | Work that needs deep understanding of codebase history & conventions |
| Probing "should we fix this / how to fix it" | — |

**The Actions/CI-CD use-case is proven** (the "Ruchi Yadav" case in section 04): multi-version testing on each PR, deploying a preview URL, a bot commenting results; merge to `main` → staging + E2E + Slack; release tag → production + smoke test + auto release notes.

::: tip 🔑 One golden rule drawn from all the cases above
**The `.github/copilot-instructions.md` file is the #1 lever.** This is exactly the intervention that boosted `dotnet/runtime`'s success rate the most (~38% → 69%). In that file, write: what the app does, the tech stack, the **exact build commands**, coding conventions, directory structure, and a **"don't touch" list**. Keep it short (≤ ~2 pages).

And to counter the agent's "laziness," your prompt must be **specific & comprehensive**. Instead of *"Add tests"*, write something like:

```text
Add tests for all untested code paths in this type.
Use a code coverage tool to determine what is tested;
do not rely on code inspection alone.
```

The agent often **stops the moment it meets the minimum requirement** — if you don't spell it out, it won't extrapolate on its own.
:::

---

## 📒 Glossary for this chapter

The GitHub interface is in English — keep this table next to you when starting out:

| Term | Quick meaning |
|---|---|
| **Git** | The version-control tool that runs on your machine (created by Linus Torvalds) |
| **GitHub** | The cloud service that puts Git online for collaboration (owned by Microsoft) |
| **Repository (repo)** | The store holding all your project files + their change history |
| **Commit** | A "snapshot" of your code with its own ID, saved on your machine |
| **Push / Pull** | Push code up to GitHub / Pull the latest code to your machine |
| **Clone** | Download a repo from GitHub to your machine |
| **Branch** | A copy of the code to build a feature in isolation, without touching `main` |
| **Merge** | Combine one branch into another |
| **Pull Request (PR)** | A proposal to merge changes + the place for code review |
| **Conflict** | When two people edit the same line, Git needs you to choose which part to keep |
| **Staging** | The "basket" holding changes you've `add`ed, waiting to be `commit`ted |
| **`.gitignore`** | A file declaring what NOT to put in the repo (secrets, junk files) |
| **GitHub Actions** | Auto build/test/deploy when you push code (CI/CD) |
| **GitHub Copilot** | The AI assistant that suggests code, chats, and auto-reviews PRs |

---

## 07 · Summary & Official sources

**1-minute summary:** **Git** runs on your machine, **GitHub** is the cloud for collaboration — telling the two apart is half the battle. Memorize `add → commit → push`, and collaborate with **branches + Pull Requests**. When push fails with a password error, use a **PAT / SSH / GitHub CLI**. The **Free plan + Student Pack** are more than enough to learn and build a portfolio. Turn on **Copilot** as an assistant, but **don't paste secrets into Chat** and remember **`.gitignore`** so you don't leak `.env`.

- **GitHub:** [github.com](https://github.com) · **Pricing:** [github.com/pricing](https://github.com/pricing)
- **GitHub Copilot:** [github.com/features/copilot](https://github.com/features/copilot) · **Plans & billing:** [docs.github.com/copilot](https://docs.github.com/en/copilot/get-started/plans)
- **Official docs:** [docs.github.com](https://docs.github.com)
- **Authentication (PAT / SSH key):** [docs.github.com — authentication](https://docs.github.com/en/authentication)
- **Track changes (billing, features):** [github.blog/changelog](https://github.blog/changelog/) — where you check for the latest changes yourself
- **Learn Git:** [github.com/git-guides](https://github.com/git-guides) · Install Git: [git-scm.com](https://git-scm.com)
- **🎓 Student Developer Pack:** [education.github.com/pack](https://education.github.com/pack)
- Vietnamese-language Git guide (community): [rogerdudler.github.io/git-guide](https://rogerdudler.github.io/git-guide/index.vi.html)

**📚 Case studies & worthwhile reads (for section 06):**

- Microsoft .NET Blog — "Ten Months with Copilot Coding Agent in dotnet/runtime" *(case study #1, worth reading carefully)*: [devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime](https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/)
- Hacker News — "We've been using Copilot coding agent internally at GitHub…": [news.ycombinator.com/item?id=44032660](https://news.ycombinator.com/item?id=44032660)
- Harness Blog — "The Impact of GitHub Copilot on Developer Productivity: A Case Study": [harness.io/blog](https://www.harness.io/blog/the-impact-of-github-copilot-on-developer-productivity-a-case-study)
- Personal blog — "GitHub Actions Saved Me Hours Every Week. Here Is My Setup": `ruchi.no/posts/github-actions-saved-hours-my-setup`
- "GitHub Actions: The Hidden Billing Trap": `theexceptioncatcher.com/2026/02/github-billing/`
- "Is GitHub Copilot Getting Worse in 2026?": [nxcode.io](https://www.nxcode.io/resources/news/github-copilot-getting-worse-2026-developers-switching)

::: warning ⏱️ A note on timeliness
The pricing, Copilot policies, and numbers in this chapter reflect our understanding **as of 2026** and **may have changed**. In particular, the **pause on Copilot Pro sign-ups (as of April 20, 2026)** and **Copilot code review billing Actions minutes on private repos (from June 1, 2026)** — please **check directly on github.com** before deciding.
:::
