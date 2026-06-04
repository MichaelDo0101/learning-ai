---
title: 'ElevenLabs — the most lifelike AI voice, with cloning & multilingual dubbing'
description: 'A practical guide to ElevenLabs: hyper-real text-to-speech, voice cloning (IVC/PVC), dubbing across 90+ languages, real Python/cURL API, plans & pricing (hedged), security, the Klarna/Revolut case studies — and when NOT to use it.'
---

# ElevenLabs — the most lifelike AI voice, with cloning & multilingual dubbing

<p style="font-size: 48px; line-height: 1; margin: 0 0 12px;">🎙️</p>

::: tip 🔥 Hands-on — 30 seconds
You run a faceless YouTube movie-review channel, and tonight you have to ship an 8-minute video — but your voice is shot. You open **ElevenLabs**, paste your English script into **Text to Speech**, pick a deep male voice, drop in a few emotion tags like `[excited]` / `[whispers]` → 30 seconds later you have an MP3 narration that sounds like a real person. Need to dub a foreign clip? **Dubbing** translates it, keeps the original voice, and matches the lip timing across 90+ languages.
**💸 Why it matters:** instead of paying a voice actor per video, you produce studio-quality narration yourself for a few dollars a month — running 24/7, churning out content at scale.
:::

> **"ElevenLabs is the best 'speaker' in AI audio: lifelike voices, cloning in seconds, dubbing entire films.**
> **But it bills per character, and its non-English voices can still sound 'accented' — knowing what to use it for is the difference between a 'content factory' and 'burning credits.'"**

::: tip 🎯 After this chapter you'll be able to
- **Sign up** for ElevenLabs and understand the **plans + pricing + free tier** (along with the commercial / attribution terms that trip people up).
- **Create high-quality narration** in the web UI and insert emotion **audio tags** correctly.
- **Clone a voice** (Instant vs Professional) — and know the ethical/legal lines you must not cross.
- **Call the API** with real Python and cURL to embed TTS into your own product.
- **Pick the right tool:** when to reach for ElevenLabs, when for OpenAI TTS / Azure / Murf — and **when NOT** to use any of them.
- **Pay & access it from anywhere**, including how international card payments work in practice.
:::

::: warning ⏱️ A note on the "shelf life" of this information
This reflects what's true as of **mid-2026**. AI audio moves fast (model names, **plan names & credit counts**, features). The **PRICING** part especially: ElevenLabs has renamed plans and changed credit amounts several times across 2025–2026, so different sources disagree — the numbers below are a **rough reference**. Always open [elevenlabs.io/pricing](https://elevenlabs.io/pricing) and check the latest before you pull out your wallet.
:::

::: tip 🔗 How this chapter connects to the Generative AI module
The **theory of voice generation** (how TTS works, what audio tags are, the ethics of voice cloning) is covered in [**Chapter 4 — Music & voice generation**](../generative-ai/4-tao-nhac-giong) of the Generative AI module. This chapter focuses on **ElevenLabs as a TOOL**: the company/platform, the model matrix, competitor comparisons, pricing and payment, real workflows + API, case studies, and security. When a foundational concept comes up, I'll point you back to Chapter 4.
:::

---

## 01 · What this tool is & when to use it

**ElevenLabs** is an **AI audio (voice) company/platform**: it turns text into speech (text-to-speech), **clones voices** (voice cloning), **dubs** video/audio (dubbing), transcribes speech (Scribe / speech-to-text), generates music (Eleven Music), and lets you build **conversational voice agents** (ElevenAgents). As of mid-2026, ElevenLabs is widely regarded as the **market leader in voice realism**. Official URL: **https://elevenlabs.io**.

::: tip 🏢 This is a "production-grade" tool, not a side project
A few real milestones so you can put it into a serious workflow with confidence:
- **Series C** (Jan 30, 2025): raised **$180M** at a **$3.3B** valuation (co-led by a16z + ICONIQ) — *TechCrunch*.
- Closed **2025 with over $330M ARR**; customers include Deutsche Telekom, Square, the Government of Ukraine, and Revolut — per the official blog.
- **Series D** (Feb 4, 2026): **$500M at an $11B valuation** — led by Sequoia (a16z 4×, ICONIQ 3×, plus Lightspeed/BOND). CNBC described ElevenLabs as *"Nvidia-backed"* (Nvidia has been a strategic investor **from earlier on**, not part of the Series D round per *TechCrunch*) and *"eyeing an IPO"* (CNBC's framing, not an official announcement) — *TechCrunch / CNBC*.

→ The takeaway: a tool that's heavily funded and used at scale — worth learning to use properly.
:::

::: tip 🔑 Three things people easily confuse
- **ElevenLabs** = the platform/web UI you use at elevenlabs.io (what this chapter is about).
- **ElevenLabs API** = the programmatic service billed by **credit (≈ characters)** for developers — same account, but used via code.
- **Model** (Eleven v3, Multilingual v2, Flash v2.5…) = the "engine" underneath; you **pick a model** for each generation. Don't confuse a model name with a plan name.
:::

**What ElevenLabs does well (per research):**

| Area | What it can do |
|---|---|
| **Text-to-Speech** | Hyper-real narration from text; a very large voice library (third-party sources cite "~1,200+ voices" — *not an official number*) plus a community Voice Library. |
| **Eleven v3** (most expressive) | Supports inline **audio tags** like `[excited]`, `[whispers]`, `[sighs]`, `[laughing]` to control emotion; **Text to Dialogue** stitches multiple voices into seamless conversation; expands to **70+ languages**. |
| **Voice Cloning** | **Instant (IVC):** ~1–5 minutes of audio, clones in seconds. **Professional (PVC):** ~30 minutes minimum (optimal ~3 hours) → a near-indistinguishable copy. |
| **Dubbing** | Translates + dubs video/audio across **90+ languages**, preserving the original emotion/timing/voice character; an automated pipeline of translate → clone → dub → sync. It "localizes" rather than translating word-for-word. |
| **Scribe (Speech-to-Text)** | 90+ languages, word-level timestamps, **speaker diarization for up to 32 speakers**; a Realtime version at ~150ms for live use. |
| **Eleven Music** | Generates "studio-grade" music (game music, podcast beds, marketing). |
| **ElevenAgents** | Conversational voice agents over the phone (Twilio), WhatsApp, and web chat from a single "brain"; includes a dedicated turn-taking model + tool calling (e.g. issue a refund, look up an order). |
| **API** | Official REST API + Python/JS SDKs, with streaming support. |

::: tip 📌 Read alongside Chapter 4
*Audio tags* and *what voice cloning is* are explained in [Chapter 4 of the Generative AI module](../generative-ai/4-tao-nhac-giong#_05-giong-noi-elevenlabs-dao-duc). Here you just need to remember: **v3 = highly expressive + multi-voice**, **Flash v2.5 = fast/real-time (~75ms)**, **Multilingual v2 = consistent quality**.
:::

### Versus other tools — "when to pick which"

No tool wins on every axis. ElevenLabs is strong on **voice quality + cloning + dubbing + agents**. But depending on the job, a competitor may fit better. The table below is an objective snapshot as of mid-2026:

| Criterion | ElevenLabs | OpenAI TTS | PlayHT *(shut down Dec 31, 2025)* | Murf | Google / Azure TTS |
|---|---|---|---|---|---|
| **Realism** | Leading, highly expressive | Good, simple | Good (strong at dialogue) | "Clean," a touch too perfect | Stable, "enterprise" |
| **Voice cloning** | Yes (IVC + PVC) | **No** | Yes | Limited | Custom Voice (needs training) |
| **Prebuilt voices** | Lots (~1,200+ *per comparison sources*) | **~9–11 voices** *(far fewer; per OpenAI docs)* | Many | Use-case based | Many, multi-accent |
| **Real-time latency** | Flash v2.5 ~75ms | Medium | Tuned for dialogue | Not a strength | Good |
| **Emotion audio tags** | Yes (v3) | No | Limited | Limited | Limited (SSML) |
| **Localized/non-English voices** | Yes (incl. regional accents) | Yes (multilingual) | — | Limited | Yes (solid coverage) |
| **Reference price** *(hedge — changes constantly)* | Pricier per credit (≈ characters); Flash ~½ the price | tts-1 ~$15 / 1M characters | (no longer sold) | Per seat plan | ~$4–16 / 1M characters |
| **Best fit for** | Creators / podcasts / audiobooks / agents | Teams already on GPT/Whisper | Podcasts, customer support | Marketing/video teams | Enterprises needing governance |

::: warning 🔥 Hot news you need to know: PlayHT has shut down
**PlayHT** — a familiar TTS competitor — **was acquired by Meta (Jul 12, 2025)**, and **the PlayHT API shut down on Dec 31, 2025**. It's still in the table above **for historical comparison only**; it's no longer something you can buy. If you (or a tool you follow) still use PlayHT, plan your migration; ElevenLabs is one of the main destinations for the wave of former PlayHT users.

**A low-latency competitor worth watching after PlayHT's exit: [Cartesia](https://cartesia.ai) (the Sonic model)** — frequently mentioned alongside ElevenLabs/Murf as a primary alternative for anyone who needs low latency (real-time/voice agents).
:::

::: tip 💡 Quick summary
- Need the **most lifelike voice + cloning + dubbing** → **ElevenLabs**.
- Already living in the **OpenAI ecosystem** and just need simple TTS → **OpenAI TTS** (but no cloning, only ~9–11 voices).
- A large enterprise that needs **governance / brand consistency / cloud-infra SLAs** → **Azure / Google TTS**.
- A marketing team that needs a **collaborative workflow + video integration** → **Murf**.
- ⚠️ For **pure non-English narration** (audiobooks/faceless content that must nail every diacritic/tone), ElevenLabs can sound "accented" — consider a **specialized local-language TTS** for that language (see section 04 + [Chapter 4](../generative-ai/4-tao-nhac-giong#_06-tts-tieng-viet-dung-tool-rieng)).
:::

### ⛔ When NOT to use ElevenLabs

::: warning ⛔ 7 cases to avoid or approach very carefully
- **Budget = $0 but you need commercial use:** the Free plan **doesn't allow monetization** and **requires attribution** → you'll have to go paid; if you only need basic free TTS, consider another option.
- **Already deep in the OpenAI ecosystem** and you only need simple TTS → **OpenAI TTS** is more convenient (no cloning, only ~9–11 voices).
- **An enterprise that needs maximum governance / brand consistency and cloud-infra SLAs** → **Azure / Google TTS** (or WellSaid) gives you tighter control.
- **A marketing team that needs collaboration + video integration** → **Murf** is stronger on collaboration.
- **Very high volume, price-sensitive per character:** credit costs add up fast — budget carefully; at massive volume, cheaper APIs (cloud infra, Deepgram…) are worth comparing.
- **Long, continuous output** (multi-hour audiobooks) → you'll hit per-segment character limits and have to split + stitch, which is clunky.
- **Cloning a real person's voice without permission** → **absolutely not** (voice deepfakes — an ethical/legal violation; see [Chapter 4](../generative-ai/4-tao-nhac-giong#_05-giong-noi-elevenlabs-dao-duc)).
:::

---

## 02 · Sign-up & access

### Is it available worldwide? — **Yes.**

ElevenLabs is broadly accessible **without a VPN** in most countries, with a localized UI and **official non-English voices** for many languages (for example, [elevenlabs.io/text-to-speech/vietnamese](https://elevenlabs.io/text-to-speech/vietnamese) for Vietnamese). Vietnamese, for instance, has been supported since ~2024 (the expansion from 29 → 32 languages added Vietnamese/Hungarian/Norwegian); both **Flash v2.5** and **Turbo v2.5** run it (ElevenLabs recommends **Flash over Turbo** — Flash has surpassed Turbo on latency/price). Speech-to-Text even distinguishes **three Vietnamese accents: Northern (Hanoi/standard), Central (Huế), and Southern (HCMC)** — a useful illustration of how granular its language support can get.

Around the world, creators lean on it heavily for **faceless YouTube** (movie reviews, news, narration), **podcasts, audiobooks, and training/marketing videos** — replacing the cost of hiring voice talent.

### 30-second sign-up

```text
1. Open https://elevenlabs.io → sign up with email, or use one-click Google sign-in.
2. You're straight into the web UI (no app to install) → pick Text to Speech and you're good to go.
3. If you plan to call the API: go to the dashboard → create an "API key" and save it for your code.
```

### Plans & pricing — ⚠️ STRONGLY HEDGED

::: warning ⚠️ Read this before trusting any number
Sources report **noticeably different prices / credit counts** because ElevenLabs has changed pricing, credits, and plan names several times in 2025–2026. The table below is a **rough "as of mid-2026" reference** to give you the *ordering* of the plans and the *credit mechanism* — it is **not** an exact quote. **Always open [elevenlabs.io/pricing](https://elevenlabs.io/pricing) (and [pricing/api](https://elevenlabs.io/pricing/api)) for the live numbers before you buy.**
:::

| Plan | Price/month (USD, ~) | Credits/month (~) | TTS (~minutes) | Key points |
|---|---|---|---|---|
| **Free** | $0 | 10,000 | ~10 min | TTS/STT/sound FX/music; **no** voice cloning, **no** commercial use, **attribution required** |
| **Starter** | ~$5–6 | 30,000 | ~30 min | **Commercial use unlocked**, Instant Voice Cloning, Dubbing Studio |
| **Creator** | ~$11–22 | ~100,000–121,000 | ~100–121 min | **Professional Voice Cloning**, 192 kbps audio |
| **Pro** | ~$99 | ~500,000–600,000 | ~500–600 min | 44.1 kHz PCM audio via API |
| **Scale** | ~$299–330 | ~1.8M–2M | ~1,800–2,000 min | More seats, low latency |
| **Business** | ~$990–1,320 | ~6M–11M | ~6,000+ min | Low-latency TTS as cheap as ~5¢/min, more PVC + seats |
| **Enterprise** | Custom | Custom | — | SSO, SLA, DPA, BAA (HIPAA), choice of data region |

::: tip 🔢 The credit mechanism (understand this so you don't torch your budget)
- **1 character = 1 credit** with a high-quality model like **Multilingual v2**.
- **Flash / Turbo v2.5 are cheaper — ~0.5 credit/character** (up to ~50% off via API). For real-time / high volume, favor Flash.
- **v3:** the credit multiplier **may differ from Multilingual v2 depending on the moment** (v3 had a period of heavy promotional discounting around its GA launch) — don't hard-assume 1:1; check [pricing/api](https://elevenlabs.io/pricing/api) live before running large jobs.
- Leftover credits **roll over for up to ~2 months** as long as you're on a paid plan.
- Tip for a quick estimate: an 8-minute spoken video ≈ 8,000–10,000 characters ≈ 8,000–10,000 credits (Multilingual v2), or about half that (Flash).
:::

### Free tier — the conditions that trip people up most

::: warning 🚧 Free works, but read these 3 constraints carefully
- **10,000 credits/month** (~10 min of TTS).
- **NO commercial license** — you cannot monetize output created on Free.
- **Attribution required:** if you publish content created on the Free plan (or while logged out), you must put **"elevenlabs.io"** (or "11.ai") **in the title**.
→ To **drop attribution + get commercial rights**, upgrade to at least the **Starter** plan.
:::

### Pricing & access

ElevenLabs doesn't publish a **region-specific pricing page** for most countries; it bills in **USD** and accepts standard international payment methods globally. Concretely:

- It accepts **credit cards, Apple Pay, and Google Pay** (UPI is India-only).
- Pricing is the same USD pricing shown on [elevenlabs.io/pricing](https://elevenlabs.io/pricing) wherever you are; there's no separate local-currency checkout.

::: tip 🌏 Note for Vietnam / SEA readers — card payments
ElevenLabs has **no local payment gateway and no official region-specific payment docs** for Vietnam (or most SEA countries). For payment to go through, your **card must have international payments enabled** (a Visa/Mastercard that works internationally). **Domestic-only cards are often declined.** If a payment fails, use an international card or a **virtual card** (the Help Center has an article, *"Why is my payment failing?"*). These notes are **general guidance + community experience**, not official documentation — if a card is declined, try another card / a virtual card, or contact the Help Center.
:::

---

## 03 · Real-world workflow — step by step (with real prompts/code)

A "from start to finished" process. Each step has a way to **verify** it.

### A. Create narration in the web UI (no code needed)

**Step 1 — Sign in & open Text to Speech.**
Go to [elevenlabs.io](https://elevenlabs.io) → sign in → pick **Text to Speech**.
→ **Verify:** you reach a screen with a text box + a list of voices.

**Step 2 — Pick the model that fits the job.**
- **v3** → expressive / multi-voice (drama, dialogue).
- **Flash v2.5** → fast / real-time (~75ms), cheaper on credits.
- **Multilingual v2** → consistent quality for narration.
→ **Verify:** the model name shows correctly in the model picker.

**Step 3 — Pick a voice** (a prebuilt voice, one from the Voice Library, or a voice you've cloned).

**Step 4 — Paste your text. For v3, insert real audio tags into the script:**

```text
[excited] Hello everyone! [whispers] Today I've got a little secret for you...
[laughs] Just kidding — let's get straight into it.
```

**Step 5 — Tune the sliders:**
- **Stability** low → more expressive/varied; high → even, steady delivery for long narration.
- **Similarity / Clarity** → how closely it sticks to the source voice.
→ **Verify:** a preview sounds like the emotion & voice you wanted.

**Step 6 — Generate → listen → Download** (MP3; higher quality on paid plans: 192 kbps / 44.1 kHz).
→ **Verify:** the downloaded file plays the right content, with no dropped words or tone shifts mid-sentence.

### B. Voice cloning

- **Instant (IVC):** upload **~1–5 minutes of clean audio** → clones in seconds. Good for a quick test.
- **Professional (PVC):** upload **≥30 minutes** (optimal ~3 hours); audio must be **≥192 kbps, each file ≥60 continuous seconds, no background music, no overlapping speakers, no pitch correction** → a high-quality copy.

::: warning ⚖️ Only clone a voice you own or have written consent for
ElevenLabs blocks cloning the voices of celebrities/politicians and bans accounts that violate this. The ethics/law details (the ELVIS Act, local data-protection rules, etc.) are in [Chapter 4 of the Generative AI module](../generative-ai/4-tao-nhac-giong#_05-giong-noi-elevenlabs-dao-duc).
:::

### C. Calling the API — REAL code (verified from official docs/SDK)

Create the API key in the dashboard and store it in the environment variable `ELEVENLABS_API_KEY` (don't hard-code it into a file you push to GitHub).

**Python (official `elevenlabs` SDK):**

```python
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play

elevenlabs = ElevenLabs()  # reads the key from the ELEVENLABS_API_KEY env var
audio = elevenlabs.text_to_speech.convert(
    text="The first move is what sets everything in motion.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_v3",
    output_format="mp3_44100_128",
)
play(audio)
```

**cURL (REST API):**

```bash
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Welcome to ElevenLabs. This is your first generated voice.", "model_id": "eleven_flash_v2_5", "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}}' \
  --output speech.mp3
```

::: tip 🔑 A few things to remember when calling the API
- Endpoint: `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`.
- The auth header is **`xi-api-key`** (not `Authorization: Bearer`).
- Real model IDs: `eleven_v3`, `eleven_multilingual_v2`, `eleven_flash_v2_5`.
- A `voice_id` **doesn't change** after creation → **cache it** instead of calling list every time.
- The `elevenlabs` SDK **changes its API surface between major versions** → install the latest (`pip install -U elevenlabs`) so you don't copy outdated code.
:::

---

## 04 · Tips & common mistakes

### 🟢 Tips worth money

::: tip 6 tips to use ElevenLabs like a pro
1. **Pick the model for the job, not "the fanciest":** long narration → Multilingual v2; emotion/dialogue → v3; real-time/high volume → **Flash v2.5** (cheaper, ~½ credit).
2. **Cut long text into ~5-minute chunks** and stitch them — both to dodge character limits and to avoid the voice "drifting" partway through. **Audiobook tip:** Flash v2.5 takes up to **~40,000 characters/request** (~8× Multilingual v2, ~8× v3) → at high volume, Flash isn't just cheaper, it also **handles much longer segments**, so you split less.
3. **High stability for narration, low for performance** — don't leave it on default for every kind of content.
4. **Clone with clean audio:** ≥192 kbps, ≥60s continuous, **no background music** (background music cuts phoneme clarity by ~30%), no overlapping speakers.
5. **Manage credits:** use Flash for drafts and save v3 for the final cut; remember credits **roll over ~2 months**.
6. **Clean up unused voices:** each tier caps you at ~50–100 voices — delete extras so you don't hit the ceiling, and **cache the `voice_id`**.
:::

### 🔴 Mistakes & pitfalls

::: warning 🚨 Quality & product
- **The voice shifts tone unexpectedly or sounds "robotic" mid-sentence** — especially with long text or less-common languages (a frequent complaint on Reddit).
- **Per-request length limits (per docs):** ~5,000 characters for v3, ~10,000 for Multilingual v2, but **~40,000 for Flash v2.5** → for long podcasts/audiobooks: either split, or use Flash to handle longer segments.
- **A somewhat steep learning curve / occasionally cluttered UI** for newcomers.
- **The agent only follows the script/text you give it** — it won't connect to a knowledge base on its own unless you configure it.
:::

::: warning 💳 Payment & subscription
- **Auto-renewal** and **hard-to-cancel** flows draw a lot of complaints (Trustpilot). Cancel before the cycle if you won't keep using it.
- **Payment fails with domestic-only cards** → use an international card / virtual card (see section 02).
:::

::: warning 🛠️ Common API/dev errors
- **HTTP 429** — `rate_limit_exceeded` / `concurrent_limit_exceeded` (you exceeded the tier limit or too many concurrent requests): handle it with **exponential backoff + a request queue**, or upgrade the tier.
- `system_busy` (temporary congestion) → **retry with backoff**.
- **Poor voice clones** if the audio is under 128 kbps, has background music, or has overlapping speakers.
:::

::: warning 🔒 Security & privacy — read carefully if you use this for business
This is a genuine strength worth highlighting for ElevenLabs (per the vendor's documentation as of mid-2026):

**(a) Certifications:** SOC 2 Type II, ISO 27001, PCI DSS Level 1; **ISO 27701** (privacy information management) & **ISO 42001** (AI management systems); plus HIPAA & GDPR attestations.

**(b) GDPR:** a **public DPA** (SCCs, subprocessor list, audits, DPIA support); compliant with the **EU-US Data Privacy Framework** (+ UK Extension, Swiss-US).

**(c) Voice data:** ElevenLabs states it **does not use voice data/personal data for profiling/targeting**; it **does not retain your voice data beyond ~3 years** after your last interaction (unless the law requires it — *the retention figure changes often, double-check the current Privacy Policy*). **By default it does not train on Enterprise customer data.**

**(d) Zero Retention Mode:** sensitive content isn't stored on the server; encrypted in transit.

**(e) Data residency:** Enterprise can choose the hosting region; non-Enterprise plans may be processed in the US/EU/Singapore.

**(f) Privacy compliance:** putting customers' personal data (names, phone numbers, records) on a third-party service may have implications under data-protection law — the EU's **GDPR**, and equivalent privacy regulations elsewhere. Weigh this before uploading real data.

Trust Center: **compliance.elevenlabs.io** — the certification list (especially ISO 42001, a newer one) updates continuously; **check it there yourself** before putting this into a corporate compliance dossier.
:::

::: details ❓ FAQ & common errors (click to open)
**"The prices / credit counts in your table differ from the website?"**
Correct — ElevenLabs changes pricing & credits often. **Trust [elevenlabs.io/pricing](https://elevenlabs.io/pricing) over any summary table** (including the one in this chapter).

**"Can I create on Free and then post to YouTube?"**
Technically yes, but there's **no commercial license** and you **must put "elevenlabs.io" in the title**. To monetize / drop attribution → at least **Starter**.

**"My card keeps getting declined?"**
Enable **international payments** on your Visa/Mastercard, or use a **virtual card**. Domestic-only cards usually don't go through.

**"The voice 'drifts' / changes tone across a long video?"**
Split the text into ~5-minute chunks, raise **Stability**, and favor Multilingual v2 for narration.

**"The API returns HTTP 429?"**
You exceeded your tier's rate limit or concurrent requests. Add **exponential backoff + a queue**, or upgrade the tier.

**"Non-English text reads diacritics wrong / sounds 'accented'?"**
This is a real limitation of ElevenLabs for some languages. For pure non-English content (audiobooks/faceless), consider a **specialized local-language TTS** for that language — see [Chapter 4](../generative-ai/4-tao-nhac-giong#_06-tts-tieng-viet-dung-tool-rieng).
:::

---

## 05 · Exercises / mini-project

Actually do 2–3 of the exercises below to turn "I read it" into "I can do it." Each has clear completion criteria.

### 🧪 Exercise 1 — Emotional narration with audio tags (basic)

**Goal:** feel the power of audio tags in v3.

1. Open **Text to Speech**, pick the **v3** model, pick any voice.
2. Generate 2 versions of the same content: version 1 with no tags; version 2 with tags:

```text
[whispers] Can you hear it... [pause] [excited] It's working! [laughs]
```

3. Listen to the two side by side, lowering **Stability** step by step to see the difference.

**✅ Done when:** you can clearly hear version 2 carry the emotion of the tags, and you write one sentence on how tags + stability affect the result.

### 🧪 Exercise 2 — Call TTS via the API (for those who code a little)

**Goal:** embed ElevenLabs into an automated workflow.

1. Create an **API key** in the dashboard and put it in the env var `ELEVENLABS_API_KEY`.
2. Run the cURL snippet from section 03.C to output `speech.mp3`:

```bash
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "This is the first voice I generated via the API.", "model_id": "eleven_flash_v2_5"}' \
  --output speech.mp3
```

3. Open `speech.mp3` and listen; switch `model_id` to `eleven_multilingual_v2` to compare quality.

**✅ Done when:** you have an MP3 that plays the right content, and you can hear the difference between Flash (fast/cheap) and Multilingual v2 (smoother).

### 🧪 Exercise 3 — Compare a non-English language: ElevenLabs vs a specialized local TTS

**Goal:** prove to yourself "when NOT to use ElevenLabs" for a given non-English language.

1. Take 3 sentences with tricky diacritics + 1 English name + 1 number, for example (Vietnamese, broadly illustrative):

```text
Hôm nay ngày 19 tháng 6, anh Nguyễn ghé cửa hàng ElevenLabs mua một chiếc loa.
```

2. Generate it with **ElevenLabs (the language voice)** and with a **specialized local-language TTS** (see [Chapter 4](../generative-ai/4-tao-nhac-giong#_06-tts-tieng-viet-dung-tool-rieng)).
3. Compare: where does ElevenLabs get a diacritic wrong / sound accented, and where does the local tool read more naturally?

**✅ Done when:** you can conclude — for this kind of pure non-English content, which tool to choose and why.

---

## 06 · Case studies & real use cases (from the community)

This section gathers **real** examples from ElevenLabs' official customer page + blogs/community, as of mid-2026.

::: warning ⚠️ Read carefully — about source reliability
Figures like *"10× faster"* or *"+35% conversion"* are **published by ElevenLabs on their own customer pages** (marketing-sourced) — read them with a grain of salt; I label them "per ElevenLabs." Community use cases are self-reported from blogs/communities.
:::

### 💳 CS1 — Klarna: financial support resolved 10× faster (per ElevenLabs)
- **Context:** Klarna (fintech) uses **ElevenAgents** for financial customer support.
- **Result (per ElevenLabs):** resolutions "**10× faster**" for **35 million** US customers.
- **Lesson:** voice agents fit high-volume, repetitive support — but the number is a vendor claim.

### 🏦 CS2 — Revolut: ~8× reduction in ticket handling time (per ElevenLabs)
- **Context:** Revolut (digital bank) deployed a **multilingual** conversational agent.
- **Result (per ElevenLabs):** ticket handling time cut by **~8×**.
- **Lesson:** multilingual strength lets a digital bank serve many markets from a single "brain."

### 🛵 CS3 — Deliveroo: an outbound voice agent reaching ~75% of riders (per ElevenLabs)
- **Context:** Deliveroo (food delivery) uses an **outbound** voice agent.
- **Result (per ElevenLabs):** reaches **~75% of riders & partners**.
- **Lesson:** automated outbound voice helps operate a large workforce without a human call center.

### 🚗 CS4 — Cars24 & TVS Motor: lifting conversion/leads (per ElevenLabs)
- **Cars24** (auto e-commerce): **+~35% conversion** and **+~20% CSAT** (per ElevenLabs).
- **TVS Motor** (manufacturing/retail): a multimodal agent, **+~35% lead capture** (per ElevenLabs).
- **Lesson:** voice agents don't just "answer" — they move business metrics, if configured right.

### 📞 CS5 — Deutsche Telekom: real-time support + translation in the call system
- **Context:** Deutsche Telekom (telecom) integrated AI support + **real-time translation** into its contact center.
- **Lesson:** at telecom scale, the value is in real-time translation and assisting human agents — not fully replacing people.

### 📚 CS6 — Publishing & entertainment: HarperCollins, Bertelsmann…
- **HarperCollins** uses ElevenLabs for **audiobook production**; **Bertelsmann** is expanding multilingual storytelling. Other named customers: **Epic Games, Cisco, Chess.com, Perplexity**.
- **Lesson:** audiobooks/multilingual are the sweet spot for publishing — but mind the character limits (split + stitch).

### 🌏 CS7 — Creator use cases (from blogs/communities)
- **Faceless YouTube** (movie reviews, news, narration), **podcasts, audiobooks, training/marketing videos** — replacing the cost of hiring voice talent.
- **Caveat:** for **pure non-English content**, many creators still use a **specialized local-language TTS** because ElevenLabs can sound accented / mishandle diacritics; ElevenLabs fits better for **English** or bilingual content.

---

## 07 · Summary & official sources

::: tip 📌 5 things to take with you
1. **ElevenLabs = the most lifelike AI voice** (TTS + cloning + dubbing + agents), "production-grade."
2. **Pick the model for the job:** v3 (emotion/multi-voice), Flash v2.5 (fast/cheap), Multilingual v2 (steady narration).
3. **The Free tier has a trap:** no commercial use + mandatory attribution → if you need commercial use, at least **Starter**.
4. **Pricing changes often** — always check [elevenlabs.io/pricing](https://elevenlabs.io/pricing); **credit ≈ characters**, Flash ~½.
5. **For pure non-English content, consider a specialized local TTS**; cloning a real person's voice **requires consent**.
:::

### Official links from ElevenLabs (worth bookmarking)

These are the **first-party** pages to verify the latest info — always trust these over third-party summaries:

- **Get started:** https://elevenlabs.io
- **Pricing & plans:** https://elevenlabs.io/pricing (API pricing: https://elevenlabs.io/pricing/api)
- **Vietnamese TTS (example language page):** https://elevenlabs.io/text-to-speech/vietnamese
- **API docs / quickstart:** https://elevenlabs.io/docs/quickstart (model overview: https://elevenlabs.io/docs/overview/models)
- **Official Python SDK:** https://github.com/elevenlabs/elevenlabs-python
- **Dubbing Studio:** https://elevenlabs.io/dubbing-studio
- **Customer stories:** https://elevenlabs.io/customer-stories
- **Trust Center (security):** https://compliance.elevenlabs.io (Privacy Policy: https://elevenlabs.io/privacy-policy)

::: details 🔎 Reliability notes & extra sources (research as of mid-2026)
- **Pricing & credit counts:** sources conflict (ElevenLabs renamed plans/credits multiple times) → hedged here; **you must check the live pricing page**.
- **ElevenLabs' "~1,200+ voices":** from a third-party comparison blog, **not** an official ElevenLabs figure. OpenAI TTS has **~9–11** voices (alloy, ash, coral, echo, fable, onyx, nova, sage, shimmer… per OpenAI docs as of mid-2026) — the "~6 voices" figure from older comparison posts is outdated.
- **Case study figures** (10×, +35%, ~8×…): published by ElevenLabs on their own customer pages — **marketing-sourced**.
- **International card payments:** no official region-specific documentation → general guidance + community experience.
- **Eleven v3 milestones:** alpha **Jun 5, 2025**, official GA **Feb 2, 2026** (blog *"Eleven v3 is Now Generally Available"*).
- Financial news: Series C ($180M @ $3.3B, Jan 2025) & Series D ($500M @ $11B, Feb 2026; **~$781M total raised across 5 rounds** per *TechCrunch*) — *TechCrunch / CNBC*; PlayHT acquired by Meta (Jul 2025), API shut down Dec 31, 2025.

*Figures (pricing, models, features) may have changed — always re-check at elevenlabs.io.*
:::
