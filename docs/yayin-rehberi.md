# OWN A SECOND — Yayınlama (Deploy) Rehberi

> Bu, sandbox'tan gerçek internete geçişin adım adım yol haritasıdır.
> Mantıksal sıra takip edilmelidir (her adım bir öncekine bağlı).

## Genel mimari (3 parça)
1. **Veritabanı** → Supabase (Postgres). Kalıcı veri.
2. **Sunucu (backend)** → Node.js (`server.js`) bir bulut sağlayıcıda.
3. **Adres** → bir alan adı (domain) + HTTPS.

Akış: `Tarayıcı → Node sunucu (mantık + SSE) → Supabase (veri)`

---

## ADIM 1 — Supabase kurulumu (veritabanı)

1. [supabase.com](https://supabase.com)'a gir → **Start your project** (ücretsiz katman yeterli).
2. Yeni proje oluştur. Bölge olarak sana/kitlene yakın bir yer seç (ör. Frankfurt).
3. Sol menüden **SQL Editor** → **New query**.
4. Bu repodaki `supabase/schema.sql` dosyasının **tamamını** yapıştır → **Run**.
   (Tablolar: claims, forever_seconds, auctions, invoices, stats + RLS politikaları.)
5. **Settings → API** sayfasından şu 3 değeri kopyala:
   - **Project URL**
   - **anon** (public) key
   - **service_role** key  ← BU GİZLİDİR, kimseyle paylaşma, repoya koyma.

Bu 3 değeri bana ilet (ya da `config.json` içindeki `storage` bloğuna yaz). Ben
sunucuyu Supabase'e bağlayıp canlı test edeceğim.

## ADIM 2 — Sunucuyu yayınla (Node.js)

`server.js` + `site/` + `config.json` bir Node uygulaması. Şu platformlardan biri
(en kolaydan sırayla):
- **Railway** (railway.app) — repoyu bağla, otomatik çalıştırır. Ücretsiz katman var.
- **Render** (render.com) — "Web Service", Node seç.
- **Fly.io / DigitalOcean / Hetzner VPS** — daha fazla kontrol, ~$5/ay.

Ortam değişkenleri (env):
- `PORT` = 8080 (platformun verdiği portu kullanmak için `process.env.PORT` destekli)
- `STORAGE_MODE` = `supabase`
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## ADIM 3 — Domain + HTTPS
- Alan adı al (örn. `ownasecond.com`, ~$10-15/yıl; Namecheap/Cloudflare).
- Cloudflare önerilir: ücretsiz SSL + DDoS koruması.
- Platformun "custom domain" ayarına domaini tanıt. SSL otomatik gelsin.

## ADIM 4 — Gerçek ödemeyi aç
- Bir Tron cüzdanı oluştur (ör. TronLink).
- `config.json` → `payment.receiveAddress` = senin Tron adresin.
- `paymentEnabled` = `true` yap.
- İlk gerçek USDT/USDC ödemesini kendin test et (küçük miktarla).

## ADIM 5 — Canlıya almadan önce kontrol listesi (A6)
- [ ] `service_role` anahtarı yalnızca sunucuda (repoda/git'te DEĞİL).
- [ ] Gerçek Tron adresi doğru ve yedeklenmiş (private key güvende).
- [ ] Kullanım şartları + gizlilik sayfası (kripto ödeme ve "dikkat ürünü" için şart).
- [ ] Vergi/muhasebe konumu net (nereden yönetiyorsun).
- [ ] Yedekleme: Supabase otomatik yedekler (proje ayarından kontrol et).

## Sıralama özeti
```
Supabase kur → schema'yı uygula → 3 anahtarı al → sunucuyu bağla (ben test ederim)
→ Node'u deploy et → domain + SSL → gerçek Tron adresi + paymentEnabled=true → yayınla
```
