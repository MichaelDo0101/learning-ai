---
title: 'Grok (xAI) — the blunt AI that reads X trends in real time'
description: 'A hands-on guide to xAI''s Grok: signing up via X Premium/SuperGrok, plans & pricing, access, DeepSearch & the Live Search API, Grok Imagine for video with native audio, real prompts, and X data privacy — with exercises.'
---

# Grok (xAI) — the blunt AI that reads X trends in real time

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">⚡</p>

::: tip 🔥 Hands-on — 30 seconds
You do marketing for a bubble-tea brand. At 9 a.m. a piece of drama blows up on social media touching the F&B industry, and your boss asks, *"what's safe for us to say right now?"*. Open **Grok** in the X app, switch on **DeepSearch**, and type: *"What's the hottest F&B trend on X in the last 6 hours? Summarize the 5 main angles + sentiment (positive/negative) + 3 things a brand should NOT say right now."* → In 30 seconds you get a summary drawn straight from the conversation that's happening live, with links to the original posts.
**💸 Why it matters:** Grok can read **real-time data from X (Twitter)** natively, in a way ChatGPT/Gemini/Claude can't. When your job is "know what's happening right now," that's a genuine edge.
:::

> **"Grok isn't the smartest AI or the best at code. It's the AI that knows what's hot on X right now, answers bluntly, and wastes few words."**
> **Understanding that strength correctly — and not expecting it to replace Claude for coding — is the difference between 'using it for the right job' and 'being disappointed by the wrong expectation.'**

::: tip 🎯 After this chapter you'll be able to
- **Understand where Grok is strong and weak** versus ChatGPT/Claude/Gemini/Perplexity — so you pick the right job for it.
- **Sign up** for Grok through either of two paths (X Premium or SuperGrok), know the plans & pricing, and know how to pay by card.
- **Turn on DeepSearch & Think mode** at the right moments; understand why Grok is *not* real-time by default and how to "unlock" fresh data.
- **Call Grok via API** (OpenAI-SDK compatible) with Live Search to pull web + X data — with real commands.
- **Generate short videos with audio** using Grok Imagine for social/UGC content.
- **Spot Grok's specific data risks** (its history of default opt-in on X) and know what NOT to type in.
:::

::: warning ⏱️ A note on the "shelf life" of this info — read carefully for Grok
This reflects what was knowable as of **mid-2026**. The Grok line in particular renames models and changes prices **very fast and erratically** (jumping from 4.1 → "4.20" → 4.3). The model names and API prices below track `docs.x.ai` as read in mid-2026, but **you should verify them yourself** at [docs.x.ai/developers/models](https://docs.x.ai/developers/models) before relying on them. Consumer plan prices are **compiled from third-party sources** (the x.ai site blocks direct access), so every consumer-plan figure in this chapter is marked "~" or "per third-party sources, varies over time."
:::

---

## 01 · What this tool is & when to use it

**Grok** is an AI assistant (chatbot + foundation model) built by **xAI** — Elon Musk's AI company. xAI markets it as *"maximally truth-seeking AI,"* with a more **blunt, humorous/sarcastic** answering style than its rivals — less of the "cautious corporate" tone you're used to from ChatGPT or Claude.

But the core differentiator, repeated across every source, is this: **Grok has native access to real-time data from X (Twitter).** No other major rival has this social-media data natively the way Grok does. When you ask "what's hot right now," Grok reads the live conversation on X directly rather than just searching the web.

Official URLs:
- **Web app:** `https://grok.com` (and `https://grok.com/imagine` for image/video generation).
- **Company/product pages:** `https://x.ai` and `https://x.ai/grok`.
- **API & docs:** `https://docs.x.ai`, `https://x.ai/api`.
- **News/models:** `https://x.ai/news` (e.g. `https://x.ai/news/grok-4`).
- **Inside the X app:** a built-in Grok tab for X Premium users.

::: tip 🔑 Three things people confuse (read carefully or you'll waste money)
- **Grok** = xAI's chatbot/product (what you use at grok.com or inside the X app). This chapter is about this.
- **xAI API** = the per-token developer service at `api.x.ai` — a different experience from chat.
- **"XAI" / "GROK" on crypto exchanges** (Bitget, Bybit, CoinGecko) = a **completely different cryptocurrency token**, with NOTHING to do with paying for the Grok chatbot. Don't buy a coin thinking you're buying an AI plan.
:::

**Key timeline** (confirmed from the official release notes at `docs.x.ai/developers/release-notes`):

| When | Event |
|---|---|
| **Apr 2025** | Grok 3 reaches GA (general availability) via API. |
| **Jul 9, 2025** | **Grok 4** launches (livestream), alongside the top tier **Grok 4 Heavy** (multi-agent). Trained on the "Colossus" GPU cluster in Memphis (~200k GPUs per xAI's announcement), using large-scale RL (xAI claims ~6× compute efficiency vs Grok 3). |
| **Nov 2025** | Grok 4.1 and Grok 4.1 Fast (Enterprise API). |
| **Mar 2026** | Grok 4.20 and Grok 4.20 Multi-agent. |
| **May 14, 2026** | **Grok Build** launches in beta — this is a **CLI coding agent** that runs in your terminal (same family as Claude Code / Codex CLI), *not* a model. Beta for SuperGrok & X Premium+ (per Reuters, May 2026). |
| **May 15, 2026** | Some older models are **retired** (Grok 4, Grok 4.1 Fast, Grok Code Fast 1) — requests redirect to `grok-4.3` (per sources as of mid-2026). |
| **May 20, 2026** | The `grok-build-0.1` model ships via API (256K context) — the coding model *that runs under* the Grok Build CLI, distinct from the CLI itself. |
| As of mid-2026 | Docs still list the alias `grok-4.3` as the recommended default for chat/coding (*treat it as "the latest as of mid-2026," may be renamed*). |

**What Grok does well (per the research):**

| Task group | What it does | Notes |
|---|---|---|
| **Chat + reasoning** | Grok 4/4.x foundation models, with a reasoning mode. Large context (see the box below). | Knowledge cutoff ~Nov 2024 — it won't know recent events *unless* you turn on search. |
| **DeepSearch / DeeperSearch** | Runs multiple search passes over the web + X, then synthesizes a **sourced report** instead of a single-source answer. | The USP for "this week's news." |
| **Think / Big Brain mode** | Turns on a longer reasoning chain for hard coding/math/science problems. | Big Brain is SuperGrok and up. |
| **Grok Imagine** | Generates images + video: 5 workflows (text-to-image, image edit, text-to-video, video-to-video, image-to-video). | Version **1.5** (released ~Jun 4, 2026, per sources) makes video up to **~15s**, 720p, with **native audio**. Versions change fast (1.0 → 1.5) — recheck grok.com/imagine. |
| **Voice mode** | Hands-free voice conversation; a Voice Agent API exists for devs. | |
| **Native X integration** | Analyzes tweets, trends, sentiment, breaking news in real time. | **The biggest USP.** |
| **API** | Compatible with the **OpenAI SDK & Anthropic SDK** (just swap the base URL), with **Live Search**, function calling, vision (images ≤ 20MB). | |
| **Grok Build** | A **CLI coding agent** that runs in your terminal (like Claude Code / Codex CLI), powered by `grok-code-fast-1` + `grok-build-0.1`. **Not a model.** | Beta for SuperGrok & X Premium+ (per Reuters, May 2026). |

::: tip 💡 A note on the context window (a moving number) — and one area where Grok WINS
The original Grok 4 announced **~256K tokens** of context (at launch). Mid-2026 docs list up to **1M tokens** for the `grok-4.20`/`grok-4.3` line, and the **Grok 4 Fast line up to ~2M tokens** (per sources). A long context is a **real selling point** for Grok versus many rivals. These figures are **per docs/sources as of mid-2026**, so if your work depends hard on long context, recheck the model page before trusting it. Whether it's 256K or 1M–2M, the thing to remember is: **the model's internal knowledge stops at ~Nov 2024** — for anything fresh you have to turn on search.
:::

### Versus the other tools — "when to pick which"

No tool "wins on everything." Grok wins outright on **real-time social-media data**, but loses on other fronts. The table below is the **qualitative** picture, consistent across many sources (Reddit's r/grok, comparison blogs in 2026) as of mid-2026:

| Criterion | Grok | ChatGPT | Claude | Gemini | Perplexity |
|---|---|---|---|---|---|
| **Real-time / social media** | **Strongest** (native X) | Has search | Weaker on social | Has search (Google) | Strong (answer engine) |
| **Coding** | Decent, but the community says it trails Claude | Good | **Best** (consensus) | Good | Weak |
| **Writing / prose quality** | Decent, characterful | Good | **Best** | Good | Weak (stiff prose) |
| **Citations / verification** | Present but not prominent | Decent | Decent | Decent | **Best** (citation-first) |
| **Personality / voice** | **Blunt, funny, less "corporate"** | Neutral | Cautious | Neutral | Neutral |
| **Context window** | **Very large** (up to 1M–2M per sources) | Medium | Large (~200K–1M) | Very large | Medium |
| **Image / video** | Strong (Imagine, video + audio) | Strong (Sora/images) | Doesn't generate images | Strong (Veo/Imagen) | No |

::: warning 📉 A note on benchmarks — don't trust specific numbers
Online you'll find lots of "benchmark tables" pitting Grok against future versions like "GPT-5.5," "Claude Opus 4.7"… with very loud SWE-bench percentages. **Most are unverifiable from the original source** and mix in unreleased versions. Read the table above as a **directional comparison**, not settled figures. This chapter deliberately leaves out specific benchmark numbers so it doesn't lead you astray.
:::

**When to pick which (consensus from 2026 power users):**
- **Pick Grok** when: you need hot news/trends on X, want to track social-media sentiment, want a blunt/less-evasive answer, or need to "get a few minutes ahead of the global conversation"; making short videos with audio.
- **Pick Claude** when: coding, refactoring, high-quality long writing, long-running agents.
- **Pick ChatGPT** when: you want a versatile "safe default," steady reliability, a large plugin/app ecosystem.
- **Pick Gemini** when: complex logic, Google Workspace integration, multimodal work.
- **Pick Perplexity** when: research that needs verifiable citations (students, journalists, analysts).

::: warning ⛔ When NOT to use Grok (the real limits)
Grok has personality, but **it isn't right for everything**. Avoid it — or use another tool — in these cases:
- **Code is the focus and you need high reliability** → community consensus is that Claude/ChatGPT are better. There's a half-joke in dev circles: *"Grok can't code, not like Claude."*
- **You need verifiable citations** (academic, journalism, legal) → Perplexity's citation-first approach is more transparent and easier to fact-check.
- **Precise static knowledge on topics rarely discussed on X** → the community notes Grok is more prone to "hallucinate" here; cross-check it.
- **Handling sensitive data / PII / customer data** → there's training risk plus the history of default opt-in on X (see Section 04). Avoid it, or use an enterprise tier with a clear DPA.
- **You need stable quotas for high-volume voice/video production** on a consumer plan → these are being tightened (2026); consider the API or a dedicated tool.
- **You don't want to be tied to the X ecosystem** or don't want to pay for both X and Grok.
:::

---

## 02 · Sign-up & access

### Is it available? — **Yes.**

The simple rule: **Grok is available in every country where X Premium is sold.** Since X operates broadly, Grok is widely accessible — via `x.com/premium` (inside the X app) or directly at `grok.com`. If X Premium is sold in your country, you can get Grok.

::: warning ⚠️ Regional experience can change
At some points the app has shown *"not available in this region"* in a few countries. If you hit a region error, try signing in with a valid X account first (see Section 04 · FAQ). The regional experience can change over time, so treat this as something to watch for rather than a hard guarantee.
:::

### Two ways into Grok

```text
Path 1 — Through X (Twitter):
  Buy X Premium / X Premium+ at x.com/premium
  → unlock the Grok tab right inside the X app.

Path 2 — Through grok.com / the Grok app:
  Sign up for SuperGrok directly at grok.com (sign in with your X account).
```

### Plans & pricing

::: warning 💸 Read carefully: consumer-plan numbers are "per compiled sources"
The x.ai site blocks direct access (returns a 403), so the consumer prices below are compiled from **multiple third-party sites** as of mid-2026. The perks and tiers **differ between sites and change month to month**. Treat these as **directional estimates** and recheck at `x.com/premium` and `grok.com` before you pay.
:::

| Plan | Price (~, per sources) | Main perks |
|---|---|---|
| **Free** | $0 | Available, but **tightly limited** (per sources ~10 prompts / 2 hours; even tighter for image/video/voice). **DeepSearch & Think have SEPARATE, lower quotas — they run out faster than regular chat.** |
| **X Premium** | ~$8/month | Grok bundled with X's features. |
| **SuperGrok Lite** | ~$10/month | Announced by Musk ~Mar 25, 2026 (per sources). |
| **SuperGrok** | ~$30/month (or ~$300/year) | Full Grok 4, DeepSearch, Big Brain, voice, Imagine. |
| **X Premium+** | ~$40/month | Fuller access to Grok 4. |
| **SuperGrok Heavy** | ~$300/month | Grok 4 Heavy, multi-agent, the largest context, the highest benchmarks (launched Jul 9, 2025). |

::: tip 💸 Tips for choosing a plan
- **Just trying it / light use** → **Free** is enough to get a feel, but the ~10-prompts/2h limit comes up fast.
- **Already on X daily** → **X Premium (~$8)** is the cheapest path to get Grok plus X perks.
- **Using Grok seriously** (DeepSearch, Imagine, Big Brain) → **SuperGrok (~$30)**. Annual (~$300) is cheaper than monthly.
- **Heavy (~$300/month)** is only for people who genuinely need top-end multi-agent/benchmarks — most users **don't need it**.
- If you're a **developer** and need stability / high volume → consider the **API** (below) instead of the consumer plans, whose quotas are being tightened.
:::

### API pricing (per `docs.x.ai`, mid-2026)

| Model | Input / output price (~/1M tokens) | Context |
|---|---|---|
| `grok-4.3` (and the `grok-4.20-*` line) | ~$1.25 in / **~$0.20 cached input** / ~$2.50 out | up to 1M (per docs) |
| `grok-build-0.1` | ~$1.00 in / ~$2.00 out | 256K |

::: warning ⚠️ Don't confuse it: "$0.20" is NOT a separate cheap "Fast" model
There's a common misconception that a "Grok 4 Fast / 4.1 Fast" line exists at ~$0.20 input. Per sources as of mid-2026: **Grok 4.1 Fast (along with Grok 4 and Grok Code Fast 1) was retired on May 15, 2026**, with requests redirected to `grok-4.3`. The **$0.20 figure is actually the *cached input* price** of `grok-4.3` (not a separate cheap model). Before you embed this in production, re-read `docs.x.ai/developers/models` for the exact model name + price — the mid-2026 model list is down to `grok-4.3`, `grok-4.20-*`, and `grok-build-0.1`.
:::

::: tip 💸 3 real levers to cut API cost (in place of the "Fast" model that's gone)
- **Cached input ~$0.20/1M** (saves ~85% vs $1.25): use it when you resend the same block of context repeatedly (a long system prompt, repeated background docs).
- **Batch API cuts ~20–50%**: for bulk jobs that don't need real-time (large-scale classification, summarization).
- **Free API credit up to ~$150/month** via the **data-sharing** program (per sources). ⚠️ This **trades data for credit** — don't enable it for customer data / PII (see Section 04).
:::

### Payment & cards

```text
The official route (recommended):
  • International credit/debit card (Visa / Mastercard) or a prepaid card.
  • Virtual cards also work in many regions — X accepts them.

Third-party routes (RISKY — think carefully):
  • Using USDT to pay for X Premium.
  • Buying a group-buy / shared account from a reseller (cheaper, but a
    security risk + may violate the Terms of Service).
```

::: warning ⚠️ A warning on group-buy accounts & the name-clash coin
- **Shared/group-buy accounts** are genuinely cheaper, but you **hand access to a stranger**, risk losing the account, and may violate X's ToS. For anything important, pay with your own card.
- Repeating it because the mix-up is so common: **"XAI/GROK" on crypto exchanges is a different cryptocurrency token**, NOT a way to pay for the Grok chatbot. Don't send coins to "buy an AI plan."
:::

::: tip 🌏 Note for Vietnam / SEA readers
If your local bank card gets declined on `x.com/premium`, a virtual/international Visa or Mastercard (issued by many fintech apps in the region) usually works. Stick to paying with your own card rather than a group-buy account — the few dollars saved aren't worth losing the account or breaching X's ToS.
:::

---

## 03 · The hands-on workflow — step by step (with real prompts)

This part goes from "open the app" to "job done," for both everyday users (no-code) and devs (API). Each step has a way to **check** (verify) it.

### A. Using the web/app — no code needed

#### Step 1 — Sign in

Go to [grok.com](https://grok.com) or open the Grok tab in the X app → sign in with your X account.
→ **Verify:** you reach Grok's empty chat screen.

#### Step 2 — Pick the right mode

- **Fast** → quick drafts, everyday Q&A.
- **Expert / Heavy** → deep reasoning (hard problems, multi-step analysis).

→ **Verify:** the mode name shows correctly on the selector.

#### Step 3 — Turn on DeepSearch & Think at the right moment (IMPORTANT)

This is the **most misunderstood** point: by default Grok does **not** answer in real time. To get fresh web/X data you must **turn on DeepSearch**. For longer reasoning, turn on **Think**.

→ **Verify:** with DeepSearch on, the answer comes with citations (links to web/X posts), not static knowledge.

#### Step 4 — Attach data & state the context clearly

Attach a file/image, then say clearly *"what this is, how to use it,"* and assign Grok a persona (role).

#### Step 5 — A real multi-step sample prompt

```text
Step 1: Use DeepSearch to find recent studies (2025–2026) on [topic].
Step 2: In Think mode, synthesize and propose 3 evidence-based strategies,
        with a citation for each claim.
If you can't find a credible source for a point, write "no source yet"
instead of speculating.
```

→ **Verify:** the answer has clickable sources; open a few and confirm they're real, not dead links.

#### Step 6 — Generate images/video with Grok Imagine

Go to [grok.com/imagine](https://grok.com/imagine) → enter a prompt → choose a workflow (e.g. `text-to-video`) → Grok produces **4 variants in parallel** → pick one → export.

**Grok Imagine 1.5** (released ~Jun 4, 2026, per sources) makes video up to **~15 seconds, 720p**, with **native synchronized audio** (background music, effects, lip-synced dialogue). It has an **Agent Mode (beta)** that stitches clips into a longer film, plus presets like *Short Film*, *UGC Product Stories*, and *Brand Identity*. Versions change fast (the previous 1.0 did ~10s) — always recheck grok.com/imagine.

```text
Sample prompt (text-to-video, product UGC):
"Close-up of a glass of bubble milk tea on a wooden cafe table, warm
afternoon light, a thin wisp of steam rising, a hand gently stirring the
straw. Warm color tones, cozy feel. Soft lo-fi music in the background."
→ choose the "UGC Product Stories" preset → generate 4 variants → pick the best one.
```

→ **Verify:** the clip matches the description and has audio; if quality drops (see Section 04), retry the prompt or use a dedicated tool for still images.

### B. Using the API (developer) — real commands

The xAI API is **compatible with the OpenAI SDK and the Anthropic SDK** — meaning your old code mostly just needs a **base-URL swap**.

#### Step 1 — Get an API key & add credit

Create a key in xAI's **API management console** (per sources as of mid-2026 this is `console.x.ai` — `accounts.x.ai` is just the account sign-in page, not key/credit management; if you get lost, reach it via the [quickstart](https://docs.x.ai/developers/quickstart)), then **add credit** before making calls.

```bash
export XAI_API_KEY="..."   # paste your key
```

#### Step 2 — Try a call with cURL

```bash
curl https://api.x.ai/v1/chat/completions \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "model": "grok-4.3",
        "messages": [{ "role": "user", "content": "Explain quantum computing" }] }'
```

→ **Verify:** you get JSON with `choices[].message.content`. A 401 → wrong key; a credit error → you haven't funded the account.

#### Step 3 — Use the OpenAI SDK, just change the baseURL

```javascript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'   // the only difference from OpenAI
})

const res = await client.chat.completions.create({
  model: 'grok-4.3',                // or a dated model, e.g. 'grok-4-0709'
  messages: [{ role: 'user', content: 'Summarize the 3 key points of this...' }],
  temperature: 1                    // 0–2, default 1
})
console.log(res.choices[0].message.content)
```

- **Base URL:** `https://api.x.ai/v1`; main endpoint `POST /chat/completions`.
- **Parameters:** `model` (e.g. `grok-4.3` or dated `grok-4-0709`), `messages`, `temperature` (0–2, default 1), `max_tokens`.

#### Step 4 — Turn on Live Search for real-time data (easy to forget)

By default the API is **NOT** real-time — you must enable the **search tool** (Live Search: web + X + news). This is the most common misconception for newcomers to the Grok API: a plain call only knows up to ~Nov 2024.

→ **Verify:** with search on, the response includes fresh events + sources; with it off, the model "doesn't know" recent news.

::: tip 🔌 No-code: wire Grok into the tools you already use
You can automate without coding. Use a connector like **Albato / Zapier** to wire Grok into **Gmail, HubSpot, WhatsApp, Slack, Google Sheets**: auto-summarize email, auto-reply, query your CRM in plain language… Build a workflow in minutes without writing a line of code.
:::

---

## 04 · Tips & common mistakes

### 🟢 High-value tips

::: tip 6 tips for using Grok like a pro
1. **Always remember to turn on search** when you need fresh info — DeepSearch (app) or Live Search (API). By default Grok is *not* real-time; this is the #1 expectation mistake.
2. **Use Grok for the job it's good at:** trends/sentiment/hot news on X. Leave coding/long writing to Claude/ChatGPT.
3. **Ask for citations + allow "no source yet"** → fewer fabrications, easier fact-checking (Grok is weak at verification compared to Perplexity).
4. **Cross-check static / non-trending topics** with another tool — this is a known Grok weakness.
5. **For devs needing high volume**, use the **Fast** line (much cheaper) for bulk classification/summarization; reserve the big model for hard work.
6. **Lean on Grok's bluntness** for brainstorming/red-teaming ideas — it flatters less and is more willing to push back.
:::

### 🔴 Mistakes & pitfalls

::: warning 🚨 Misconception #1: "Grok is always real-time"
**No.** By default Grok answers from internal knowledge (cutoff ~Nov 2024). You must **turn on DeepSearch** (app) or **Live Search** (API) to get fresh data. If Grok "doesn't know" this week's news → you almost certainly forgot to enable search.
:::

::: warning ⚠️ Other traps to remember
- **"Grok is under high demand" / 429 / rate limit:** high load or you've hit your plan's quota → wait for a reset (Free ~every 2h), slow down, upgrade, or try off-peak hours.
- **Tightened image/video/voice quotas (May 2026):** many paying users report sharp cuts — voice locking after ~20–30 minutes; Heavy video dropping from ~500 → ~160/day (per sources). What to do: track your quota, weigh a plan's value before buying, and use the API if you need more stability.
- **Higher hallucination on NON-trending topics:** Grok is strong on what's "hot" on X, weaker on static / rarely-discussed knowledge → cross-check, or use Perplexity/ChatGPT to verify.
- **Images "censored"/lower quality after an update:** there are many r/grok complaints about "shadow moderation" washing images out → set expectations accordingly, or use Midjourney/FLUX for quality images.
- **Outages:** xAI's status history logs incidents on Mar 10, 2026 and Mar 2, 2026, plus errors/latency on Jan 27, 2026 → when in doubt, check `apistatuscheck.com/is-grok-down` or xAI's status page.
:::

::: warning 🔒 Privacy & data — ESPECIALLY important with Grok
Grok has a **specific** data problem that other tools don't share at the same level — read carefully if you use it for company work.

**(a) History of default opt-in on X:**
- In **Jul 2024**, users discovered that X **defaulted to opting them in** to using their posts + interactions with Grok to **train AI**, **without clear consent**.
- **Since Mar 2025, xAI and X are under one roof** (xAI acquired X, ~$33B, per sources) → the line between "social-media data" and "training data" blurs further, since one entity controls both.

**(b) EU legal action:**
- Ireland's Data Protection Commission (DPC) acted in **Aug 2024**; the group **noyb** filed **9 complaints** in Austria, Belgium, France, Greece, Ireland, Italy, the Netherlands, Poland, and Spain.
- The DPC opened a **formal Statutory Inquiry (Section 110) on Apr 11, 2025** into the training data, with the entity X Internet Unlimited Company.
- **Feb 17, 2026 (per sources):** the DPC opened a **second inquiry** (also Section 110) into Grok generating **"nudification" / non-consensual intimate imagery** (including child-related cases) — reinforcing that Grok carries more data/content risk than other tools.

**(c) Limited opt-out:**
- For **your chats**, opt-out is real — **but it only covers chats, not your public posts** on X; and data **already used for training can't be pulled back**.
- Some sources warn that X's Terms of Service allow fairly broad use/sharing of user content (*the interpretation is still debated, so read it cautiously*).

**(d) The enterprise API is different:**
- For the **API / enterprise tier**, the data policy is usually different (enterprise) — so check the **DPA** separately if you process customer data.
- **Data residency:** devs who need data to stay in-region can call a **regional endpoint**, e.g. `https://eu-west-1.api.x.ai` (per `docs.x.ai/developers/regions`) — a technical escape hatch for GDPR / data-privacy concerns.

**(e) NEVER type into Grok / NEVER post to X:**
- National ID numbers, bank card numbers, passwords, OTPs.
- Contracts/NDAs, confidential documents, proprietary source code.
- Customers' personal data (names, phone numbers, addresses, records) — under privacy laws like the GDPR (and equivalent national data-protection regulations) this may be a **violation** (*this is a flag to consider, not legal advice*).

**The golden rule:** treat everything you type into Grok or post on X as **potentially usable for training**. Don't enter sensitive data.
:::

::: details ❓ FAQ & common errors (click to open)
**"Grok is under high demand" / out of turns — what do I do?**
High load or you've hit your plan's quota. What to do: (1) **wait for a reset** (Free ~every 2h); (2) send less often; (3) try **off-peak hours**; (4) if you use it regularly → **upgrade** or move to the **API** for more stability.

**"Not available in this region" — how do I use it?**
Sign in with a **valid X account** first, then open Grok. The regional experience can change over time; if it still errors, try via `grok.com` instead of the app, or vice versa.

**Grok isn't as "real-time" as I expected?**
Because **search is off by default**. Turn on **DeepSearch** (app) or **Live Search** (API). This is the most common misconception.

**Voice/video lock up fast even though I'm paying?**
Since May 2026 many consumer quotas have been **tightened sharply** (voice ~20–30 minutes, Heavy video cut hard — per sources). Track your quota; if you need stable bulk production, consider the **API** or a dedicated tool.

**Generated images look washed-out / "censored" after an update?**
The community reports "shadow moderation." Try changing the prompt; for high-quality, stable images, use **Midjourney/FLUX**. Grok Imagine is strongest at **short video with audio**, not artistic stills.

**API calls return no fresh news?**
You forgot to **enable the search tool**. By default the API only knows up to ~Nov 2024.

**Is Grok down?**
Check `apistatuscheck.com/is-grok-down` or xAI's status page. There were a few incidents in early–mid 2026.
:::

---

## 05 · Exercises / mini-projects

Actually do 2–3 of the exercises below to turn "I read it" into "I can do it." Each has a clear completion bar.

### 🧪 Exercise 1 — DeepSearch a hot trend (basic)

**Goal:** feel Grok's real-time USP and build the source-checking reflex.

1. Open Grok, **turn on DeepSearch**.
2. Use this prompt:

```text
What trend is being discussed most on X in the last 24 hours about [your field of interest]?
Summarize the 5 main angles + the overall sentiment (positive/negative/neutral),
with a link to the original post for each angle.
```

3. **Open 2–3 of the links** it gives: are they real, and on-topic?

**✅ Done when:** you can confirm the sources are real and on-topic (or you catch it citing a dead/off-topic link). Write one line: how is Grok different from asking Google?

### 🧪 Exercise 2 — Cross-compare "real-time" against another tool (important)

**Goal:** test Grok's strengths/weaknesses yourself instead of trusting the marketing.

1. Pick a question about **this week's news** (e.g. the gold price, a tech event).
2. Ask **Grok (DeepSearch on)** and ask **another tool** (ChatGPT with web search, or Perplexity) the same question.
3. Compare: who has fresher data? Who cites sources more clearly? Who fabricates?

**✅ Done when:** you can write 3 bullet points on *where Grok wins and where it loses* for that exact question. This is the "pick the tool by the job" reflex you want to keep forever.

### 🧪 Exercise 3 — Call Grok via the API (for those who know a little code)

::: warning Needs an API key & credit
This exercise needs a key from **xAI's API console** (per sources, `console.x.ai`; if you get lost, reach it via the [quickstart](https://docs.x.ai/developers/quickstart)) and **credit added first**. If you don't want to spend money yet, read through the code and do Exercises 1–2 first.
:::

**Goal:** prove "swap the base URL and it runs" + understand why you need to enable search.

1. Set the key: `export XAI_API_KEY="..."`.
2. Run the cURL command from Section 03 · B · Step 2 with `model: "grok-4.3"`. (Tip: if `grok-4.3` gets renamed, use the **alias without the date suffix** to always point at the latest stable build — the docs confirm the alias auto-points to latest stable.)
3. Ask about something **very recent** (e.g. yesterday's event). Observe: a plain call **doesn't know**.
4. (Advanced) Enable **Live Search** per the docs and ask the same question again.

**✅ Done when:** you clearly see the difference between a **plain call** (static knowledge, no fresh news) and **Live Search on** (fresh data + sources). This is exactly the thing most easily forgotten when building an app on Grok.

---

## 06 · Case studies & real use-cases (from the community)

This part gathers **real** examples from mainstream news, xAI's announcements, and a synthesis of community discussion as of mid-2026. The point: show you how Grok runs **in the real world**.

::: warning ⚠️ Read carefully about source reliability
A lot of the material below is **second-hand** — discussion on Reddit/X re-summarized through blogs and articles, **not** quoted directly from the original threads. So:
- The "specific company case studies" on blogs often have **no verifiable name/origin** → here they're paraphrased generically, with **no invented** company name/handle/URL.
- Quota/outage figures come from third-party sites (datastudios, apistatuscheck, piunikaweb) — **directionally right** but read the specific dates/numbers with a "per sources" caveat.
- Where a claim has a **strong source** (Reuters, official release notes) it's stated explicitly.
:::

### 📡 CS1 — Tracking real-time news/trends on X (the "best-in-class" use-case)

- **Context:** the r/grok community (~45k members) regularly debates Grok's real strengths.
- **What they do:** use Grok (DeepSearch on) to track **live events, breaking news, and measure sentiment** right on the X conversation stream.
- **Result:** community consensus is that Grok is the **clear leader** here — no large tool keeps up with "what's happening right now" as well, because the others go through a web-search layer rather than reading X's data natively.
- **Lesson:** when your job is "know immediately what's hot," Grok is the #1 pick. But don't infer it's good at everything — this is a *narrow but deep* use-case.
- **Source:** r/grok synthesis via aitooldiscovery (*paraphrased, no specific @handle attached*).

### 🔀 CS2 — "Route-by-task": 2026 power users run many tools, one job each

- **Context:** roundups of 2026 power-user workflows.
- **What they do:** route work by strength — research **"this week"** → Grok; draft 5,000 words → ChatGPT/Claude; Q&A over long documents → a large-context model; verify sources → Perplexity.
- **Result:** nobody forces one tool to do everything; splitting work by strength produces better results.
- **Lesson:** Grok is **one piece** of the toolkit, not an "all-in-one." Pay for Grok when you genuinely need the real-time/X angle.
- **Source:** writingmate, aitooldiscovery (*second-hand*).

### 🏢 CS3 — Internal enterprise conversational analytics

- **Context:** some companies want managers to query business data **in natural language**, with no SQL required.
- **What they do:** connect Grok to a data warehouse via API; a user asks *"which region's revenue dropped last month?"* and gets a plain-language answer.
- **Result:** lowers the technical barrier for people who aren't fluent in queries (a general description, no verified company name).
- **Lesson:** the OpenAI-SDK-compatible API makes integrating Grok into internal systems fast — but **mind the data** (see Section 04), so use a tier with a DPA.
- **Source:** coursiv, prked (*general description, paraphrased*).

### ⚙️ CS4 — No-code automation for SMBs

- **Context:** small businesses want to automate repetitive work without hiring a dev.
- **What they do:** via a connector (Albato), build a workflow: summarize email, auto-reply on WhatsApp, query the CRM, AI-drafted follow-ups — assembled in minutes.
- **Result:** lighter operations for a small team.
- **Lesson:** you don't need to code to use Grok's power — the connector handles the wiring.
- **Source:** albato (*vendor blog — read with a grain of salt, it's a sales source*).

### 🎬 CS5 — Producing short video with audio for social/UGC

- **Context:** creators/marketers need short video content fast and cheap.
- **What they do:** use Grok Imagine to make clips **up to ~15s, 720p** (version 1.5, Jun 2026), lip-sync + music/SFX, 4 variants, presets *"UGC Product Stories"/"Short Film."*
- **Result:** building social content much faster than shooting/editing by hand; great for trying many concepts.
- **Lesson:** Grok Imagine's sweet spot is **short video with native audio** — not artistic stills (Midjourney/FLUX are stronger there).
- **Source:** basenor, pixverse, imagine.art (*synthesis, per sources*).

### 👨‍💻 CS6 — Grok Build: jumping into agentic coding (beta)

- **Context:** xAI wants to compete in the coding-agent space (long Claude Code/Codex territory).
- **What they do:** launched **Grok Build beta** (May 14, 2026) for **SuperGrok & X Premium+**. Note what it is: **Grok Build is a CLI coding agent** that runs in your terminal (like Claude Code / Codex CLI) — *not* a model. It runs on the coding models `grok-code-fast-1` (released Aug 2025) and `grok-build-0.1` (the API model announced May 20, 2026, 256K context).
- **Result:** marks a head-on push into coding — but it's still **beta**, with no independent effectiveness numbers yet.
- **Lesson:** watch it, but as of mid-2026 the community still leans toward Claude for serious code. This is "keep an eye on it," not "switch now." Don't confuse the **Grok Build CLI** (the tool) with the **`grok-build-0.1` model** (running underneath) — they're two different things.
- **Source (strong):** Reuters via TradingView (May 2026).

---

### 📚 Notable sources (title + URL)

Accessible roundups / announcements (not the original threads):

- "Grok 4 announcement" (xAI, official) — https://x.ai/news/grok-4
- "Grok Imagine API" (xAI, official — the Imagine API announcement) — https://x.ai/news/grok-imagine-api
- "Grok Code Fast 1" (xAI, official — the coding model) — https://x.ai/news/grok-code-fast-1
- "xAI release notes" (model/feature history) — https://docs.x.ai/developers/release-notes
- Reuters/TradingView on Grok Build (May 2026) — search "Grok Build beta xAI" on tradingview.com/news
- DPC Ireland — Statutory Inquiry into X Internet Unlimited Company (Apr 11, 2025) — https://www.dataprotection.ie
- noyb — 9 GDPR complaints about Grok training — https://noyb.eu
- Use-case & comparison roundups: aitooldiscovery, writingmate, albato, basenor (*second-hand, read with a grain of salt*).

---

## 07 · Summary & official sources

::: tip 📌 5 things to take away
1. **Grok = a blunt AI + native real-time data from X.** That's the USP; for this exact job no tool beats it.
2. **NOT real-time by default** — you must turn on **DeepSearch** (app) or **Live Search** (API). This is misconception #1.
3. **Don't expect Grok to replace Claude/ChatGPT** at coding/long writing/source verification — pick the tool by the job.
4. **Anyone can use it**; go in via **X Premium (~$8)** if you already use X, or **SuperGrok (~$30)** if you need full Grok. Pay with an international/virtual card.
5. **Be more careful with data than with other tools:** the history of default opt-in on X + GDPR inquiries. Treat every input as potentially used for training.
:::

### Official links from xAI (worth bookmarking)

These are the **first-party** pages to check for the latest info — always trust these over third-party roundups:

- **Grok web app:** https://grok.com
- **Image/video generation (Imagine):** https://grok.com/imagine
- **Product page:** https://x.ai/grok
- **Grok 4 announcement:** https://x.ai/news/grok-4
- **Model list & API pricing:** https://docs.x.ai/developers/models
- **API quickstart:** https://docs.x.ai/developers/quickstart
- **Release notes (release history):** https://docs.x.ai/developers/release-notes
- **Sign up for X Premium/Premium+ (the way into Grok):** https://x.com/premium

::: details 🔎 Additional references (research as of mid-2026)
- Release notes & model list: `docs.x.ai/developers/release-notes`, `docs.x.ai/developers/models` — milestones Grok 3 (Apr 2025), Grok 4 + Heavy (Jul 9, 2025), 4.1 Fast (Nov 2025), 4.20 (Mar 2026), Grok Build CLI beta (May 14, 2026) + the `grok-build-0.1` model (May 20, 2026).
- Data legal: the DPC Ireland action (Aug 2024), the Section 110 Statutory Inquiry into training data (Apr 11, 2025), the second inquiry into nudification imagery (Feb 17, 2026, per sources); 9 GDPR complaints via noyb.
- Consumer plan pricing & quotas: compiled from felloai, costbench, aitoolanalysis, piunikaweb, datastudios (*x.ai blocks direct access — figures are estimates per sources, varies over time*).
- Grok Imagine: compiled from imagine.art, pixverse, basenor + `docs.x.ai/imagine`.

*The figures (model names, prices, features, quotas) change very fast for Grok — always recheck at grok.com, x.ai, and docs.x.ai before trusting them.*
:::
