---
title: 'Vibe Coding Solo — Pieter Levels $3.1M, Lovable $400M, Sabrine $456K'
description: 'Pieter Levels (PhotoAI $1.65M ARR), Lovable ($400M ARR), Sabrine Matos ($456K in 45 days). Stack: Cursor + Claude + ship.'
---

# Chapter 1 — Vibe Coding Solo

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">💻</p>

> **"I just see stuff, say stuff, run stuff, and copy-paste stuff, and it mostly works."**
> — *Andrej Karpathy (Feb 6, 2025) — coined "vibe coding"*

::: tip 🎯 You'll learn
- What vibe coding is + why it turns non-devs into devs
- Solo product shipping pipeline: idea → MVP → launch in a week
- 5 cases 2025-2026: Pieter Levels, Lovable, Sabrine Matos, CigarSnap, Base44
- Standard 2026 vibe coding stack
- Opportunity: emerging-market devs taking €550-900/day global freelance
:::

---

## 01 Karpathy coined "vibe coding"

Feb 2025 — **Andrej Karpathy** (OpenAI cofounder, ex-Tesla AI head) tweeted:

> *"There's a new kind of coding I call 'vibe coding,' where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."*

**Collins Word of the Year 2025**: "vibe coding".

### Practical definition

**Vibe coding** = programming by:
1. **Describing intent** to AI (natural language)
2. **Accepting AI-generated code** (not deep-reading every line)
3. **Run + observe** (see if it works)
4. **Iterate** (adjust prompt if wrong)

→ Different from "traditional coding" in: **you don't need to know syntax** line-by-line.

### Jan 2026 stat

- **63% of vibe coding users are non-developers** (TechTimes Q1/2026)
- Product managers, founders, designers, domain experts shipping full-stack apps

---

## 02 Pieter Levels — solo indie hacker $3.1M/year

### Profile

| Item | Number |
|------|------|
| Name | **Pieter Levels** (@levelsio) |
| Home | Netherlands, lives Bali / Netherlands |
| Background | 10 years "build in public", 70+ failed startups |
| X followers | **~600K** |
| Employees | **0** |

### Portfolio (May 2026)

| Product | Status | ARR/MRR |
|------|------|------|
| **PhotoAI** | AI portrait/headshot | **$1.65M ARR** ($132K MRR Nov 2025) |
| **InteriorAI** | AI interior design | ~$300K ARR |
| **NomadList** | Remote community | ~$500K ARR |
| **RemoteOK** | Remote job board | ~$300K ARR |
| **fly.pieter.com** | Browser flight game (vibe-coded) | **$0 → $1M ARR / 17 days** |
| **Total** | | **~$3.1M ARR** |

### fly.pieter.com — case demo

| Milestone | Number |
|------|------|
| Launch | Mar 2025 |
| 17 days later | **$1M ARR** ($87K MRR) |
| Build-in-public tweet | 4.8M views |
| Stack | three.js + raw JS + Cursor |
| Build time | **3 days** |
| Team | **1 (Pieter)** |

### Defining quote

> *"Without AI it would have taken me 10-100x more time. AI really is a creativity and speed maximizer for me, making me just way more creative and more fast."*
> — *Pieter Levels*

---

## 03 Lovable — $0 → $400M ARR / 24 months

### Profile

**Lovable** = no-code AI app builder (Sweden).

| Metric | Number |
|------|------|
| Launch | Jun 2023 |
| $100M ARR milestone | **Faster than OpenAI, Cursor, Wiz** — than any software company before |
| ARR end of 2025 | **~$400M** |
| User base | **>1M users** |

### Sabrine Matos case (Brazil)

- **Non-technical**, no dev background
- Built **safety/background-check app** with Lovable
- **$456K ARR in 45 days**
- Source: TechTimes May 2026

> **Lesson**: Lovable + specific niche + ship fast = solo founder doesn't need dev background.

---

## 04 CigarSnap — 15 features in 48 hours

| Item | Number |
|------|------|
| Founder | Matt Cretzman (solo) |
| Niche | Cigar identification + community |
| Build time | **48 hours** |
| Features shipped | **15** |
| Stack | Claude (prompt sequencing) → Replit Agent (execution) |

### 15 features in 48 hours

AI cigar identification, digital humidor, tasting journal, smoke session tracker, social feed, achievements, subscription billing, referral engine, push notifications, profile, friends/follow, comments, photo upload + CDN, search + tag, admin dashboard.

> **Lesson**: With AI orchestration (Claude → Replit Agent), 1 solo can ship 15-feature MVP over a weekend.

---

## 05 Base44 — $80M exit / 6 months

| Item | Number |
|------|------|
| Founder | **Maor Shlomo** (Israel, solo) |
| Product | No-code AI app builder |
| Launch | Feb 2025 |
| Users month 1 | **250K** |
| Revenue month 1 | **~$1.5M** |
| **Exit** | **$80M acquisition** in **6 months** |

> **Lesson**: Solo founder + AI app builder + execution velocity = new 2025-2026 pattern.

---

## 06 Vibe Coding pipeline — 5 steps

::: tip 💻 Standard 2026 workflow
```
1. Idea ──→ 2. Setup ──→ 3. Vibe ──→ 4. Polish ──→ 5. Ship
   (Claude)   (template)  (Cursor)    (manual)     (Vercel)
   30 min     1 hr        4-8 hr      2-4 hr       1 hr
```
Total: **1-3 days** for a shipable MVP.
:::

### Step 1. Idea + spec (Claude / ChatGPT)

```
I want to build [type] app for [audience]:
- 3 core features
- Tech stack (for solo, ship fast)
- Estimated time-to-MVP
- Edge case + risk

Format: Markdown.
```

### Step 2. Setup from template

| Stack | Template repo |
|------|------|
| **Next.js + Supabase + Stripe** | shadcn-ui / saas-starter |
| **SvelteKit + Pocketbase** | sveltekit-starter |
| **Astro + Cloudflare D1** | starlight-template |
| **Raw PHP** (Pieter style) | pieter-template |

### Step 3. Vibe coding with Cursor / Claude Code

**Loop**:
1. Open Cursor / Claude Code
2. Prompt 1 feature ("Add user auth with Clerk")
3. Accept code
4. Test (npm run dev)
5. Prompt fix if bug
6. Next feature

**Best practice**:
- 1 prompt = 1 feature (don't overload)
- Read AI summary before accepting
- Git commit each working feature

### Step 4. Manual polish

- Empty state, error message, loading state
- Edge cases (null, max length, network fail)
- Mobile responsive
- Basic accessibility

### Step 5. Ship

| Layer | Tool |
|------|------|
| Deploy | **Vercel** (1-click) |
| DB | Supabase / Neon |
| Auth | Clerk / Supabase Auth |
| Payment | Stripe Checkout |
| Analytics | Plausible / Vercel Analytics |
| Domain | Cloudflare / Namecheap |

---

## 07 Prompt pack

::: tip 📝 5 templates

**1. Idea → spec (Claude)**
```
Propose MVP spec for [idea]:
- 3 core features (must-have only)
- Main user flow (5-7 steps)
- Tech stack: Next.js + Supabase + Stripe + Clerk
- DB schema (table + key column)
- API endpoints (REST)
- Estimate time per feature

Format: Markdown with sections.
```

**2. Feature implementation (Cursor / Claude Code)**
```
Add [feature description] to [page/file].
Constraints:
- TypeScript strict
- Use existing components (don't import new lib)
- Match existing style (Tailwind utility class)
- Handle error cases: [list]
- Include loading state

Reference: [similar file].
```

**3. Bug fix**
```
This error occurs when [trigger]:
[paste error stack]

Current code: [paste relevant function]

Hypothesis: [your guess if any]

Fix without changing API contract. Add test if applicable.
```

**4. Refactor**
```
Refactor [file] to:
- Extract [X] into separate util
- Reduce nested if/else with early return
- Add JSDoc for public functions

Keep behavior identical. No new feature.
```

**5. Build-in-public tweet (Claude)**
```
Write 5-7 tweet thread day [N] of [product]:
- Hook tweet: 1 surprising number / fact
- 3-4 progress tweets with screenshot ref
- Closing CTA: "Try it / Follow build / Waitlist"

Tone: Pieter Levels-ish, direct, no fluff.
Each tweet < 280 chars.
```
:::

---

## 08 Common pitfalls

::: warning 🚨 7 mistakes new vibe coders make

**1. Over-prompt in 1 shot** → AI confused. Break into smaller features.

**2. No frequent git commits** → when AI generates wrong code, rollback is hard.

**3. Skip testing** → ship app with bugs. Test critical path minimum.

**4. Trust 100% AI code** → AI still hallucinates APIs, libs. Verify critical logic.

**5. Forget security basics** → SQL injection, XSS, auth bypass. Ask AI to security audit before launch.

**6. Price too low** → hard to scale. Test $19-49/month from start.

**7. No audience built first** → launch into void. Build Twitter before Day 1.
:::

---

## 09 🌏 Developer in emerging markets — playbook

### 🎯 3 viable paths

| Path | Goal | Income potential |
|------|------|------|
| **Global freelance** | Sell hours to global client with AI tools | $30-80/hr ($550-900/day France benchmark) |
| **Solo SaaS** | Build own product (like Pieter Levels) | $500-5K MRR after 6-12 months |
| **Local agency** | Build for SMEs in local market | $1K-10K/project |

### 💰 Stack cost

| Item | Cost/month |
|------|------|
| Cursor Pro | $20 |
| Claude Pro / Max | $20-100 |
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Stripe (no monthly) | $0 |
| Domain | $1 |
| **Total** | **~$90-200/month** |

→ Local dev salary $1-3K/month → tool cost is 5-20% of income. Affordable.

### 🌐 Communities

- **WIP.co** — solo founders global
- **IndieHackers** — global founders
- **F8 community** (Vietnam — Sơn Đặng)
- **r/SideProject** — Reddit
- **Vietnam Tech Twitter** (#vntech), **Brazil indie dev community**, etc.

---

## 10 Practice exercises

::: tip ✍️ 3 levels

**Level 1 — 1 week**
- Idea: 1 AI gen niche tool
- Spec with Claude (1 hr)
- Build MVP with Cursor (4-6 hr)
- Deploy Vercel (30 min)
- Post Twitter (build-in-public)

**Level 2 — 1 month**
- MVP live + 5 paying customers ($50-500 MRR)
- Daily build-in-public
- Pitch ProductHunt week 3-4

**Level 3 — 6 months**
- $1-5K MRR
- 100+ paying customers
- 5K+ Twitter followers
:::

---

## 11 Continue reading

- 🤖 [Chapter 2 — Claude Code Deep](./2-claude-code-deep.md) — autonomous coding 30+ hours
- 🖱️ [Chapter 3 — Computer Use](./3-computer-use.md) — agent clicks screen
- 🧩 [Chapter 4 — Multi-Agent](./4-multi-agent.md) — orchestrator-worker
- 🧰 [Chapter 7 — Toolkit](./toolkit-2026.md)
- 🗓️ [Chapter 9 — 30-Day Roadmap](./roadmap-30-days.md)

::: tip 💻 Final word
> *"In 2020, shipping a SaaS = 5-person team + 6 months.*
> *In 2026, shipping a SaaS = 1 person + 1 weekend.*
> *The question isn't "can it be done?"*
> *It's **"what are you shipping this weekend?"**"*
:::
