# ⏱ OWN A SECOND

**One clock. Everywhere. One second can be yours.**

In 2005, a student sold one million pixels for $1 each and made $1M. The lesson wasn't the
pixels — it was that the most valuable thing on Earth is **attention** and **time**.

OWN A SECOND takes that idea to the only asset that never runs out: **the clock itself.**
Buy a second on a single global clock. When your second arrives, your message is shown to
everyone — at the same moment, in their own language, for exactly one second.

---

## ✨ Features

- 🕐 **Live global clock** — single source of truth (UTC), streamed via SSE to every viewer
- 💬 **Three tiers:** One Second (dated) · Forever Second (recurring) · Prime Second (auction)
- 🌍 **7 languages** (en/tr/de/es/fr/ar/ja) + RTL support + **auto-translation** ("all languages")
- ❤️ **Likes** (toggle, per-user persisted) + **Most loved** ranking + **Live feed**
- 🎨 **AI-era UI** — liquid glass, constellation particle field, clock pulse rings, cinematic
  broadcast moment, magnetic tilt, scroll reveal, sound chime
- 🔒 **Moderation** — banned-word filter, report button, admin log, rate-limiting
- 💳 **Crypto payments** — USDT/USDC (TRC-20), non-custodial, unique-cents invoices, on-chain
  verification (TronGrid)
- 🗄️ **Persistence** — Supabase (Postgres) with graceful file fallback

## 🏗️ Architecture

```
Browser ──SSE/API──► Node.js (server.js, zero deps) ──► Supabase (Postgres)
                        │
                        ├─ claims / forever / auctions / likes / reports
                        ├─ translation (MyMemory free API)
                        └─ payments (TronGrid TRC-20 verification)
```

- **Zero npm dependencies** — `http`, `https`, `fs`, `path`, `crypto` only (KISS).
- **Single source of truth for time** = the server. Clients lock to it via SSE.
- **Storage adapter:** `file` (local JSON) or `supabase` (via env/config).

## 🚀 Run locally

```bash
# 1. Install Node.js (>=18) from nodejs.org

# 2. Start
node server.js

# 3. Open
open http://localhost:8080
```

## ⚙️ Configuration (`config.json`)

| Key | Purpose |
|---|---|
| `pricesUsd` | `one` / `forever` pricing |
| `languages` | supported UI languages |
| `moderation.bannedWords` | content filter list |
| `moderation.claimRateLimitPerHour` | anti-spam rate limit |
| `payment.*` | TRC-20 receive address, contracts, TronGrid |
| `paymentEnabled` | `true` = real payments, `false` = demo mode |
| `translation.provider` | `mymemory` (free) / `deepl` / `google` / `none` |
| `auction.slots` | prime seconds + min bids |
| `storage.mode` | `file` / `supabase` |

## ☁️ Deploy

- **Host:** Render / Railway / Fly.io (free tiers work)
- **Database:** Supabase (see `supabase/schema.sql`)
- **Env vars:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STORAGE_MODE=supabase`
- Full guide: `docs/yayin-rehberi.md` · `docs/ucretsiz-canliya-alma.md`

## 📚 Docs

- `docs/urun-brifi.md` — product brief & decisions
- `docs/lansman-plani.md` — launch plan
- `docs/teknik-hukuk-analizi.md` — legal/technical risk analysis
- `docs/cuzdan-guvenligi.md` — wallet security guide
- `docs/odeme-acma.md` — how to enable real payments
- `docs/TOS.md` + `docs/PRIVACY.md` — legal templates

## ⚠️ Disclaimer

This is a prototype. The ToS/Privacy templates are **not legal advice** — have them reviewed
by a lawyer before public launch.
