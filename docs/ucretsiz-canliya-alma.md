# ÜCRETSİZ CANLIYA ALMA — "Talep Testi" İçin Halka Açık URL

> Amaç: reklam (HN/Reddit) yaptığında insanların gerçekten açabileceği, $0 bir adres.
> Sandbox önizlemesi YALNIZCA sana özeldir — halka açık değildir. Bu yüzden bu adım şart.

## Önemli dürüstlük (önce bunu oku)
- Ücretsiz hosting katmanları (Render/Glitch) **kısa süre kullanılmazsa uykuya geçer.**
  Uyandığında ilk ziyaret ~30-60 sn bekletebilir. "Talep testi" için bu kabul edilebilir.
- Ücretsiz katmanda **dosya diski geçicidir** → data/store.json yeniden başlatmada sıfırlanır.
  Kalıcı veri istiyorsan Supabase (sonra). Talep testi için geçici veri sorun değil.
- Eğer HN'de gerçek bir trafik dalgası alırsak, "uyumuyor" diye **Fly.io**'ya geçeriz
  (kart ister, ama küçük kullanım ücretsiz kotada kalır).

## ADIM ADIM — Render (en kolay, $0)

1. [render.com](https://render.com) → kaydol (GitHub ile en kolayı).
2. Kodunu GitHub'a koy (ücretsiz):
   - GitHub'da yeni repo aç (`own-a-second`).
   - Bu klasördeki TÜM dosyaları (server.js, package.json, config.json, site/, docs/,
     supabase/) o repoya yükle.
   - **UYARI (A6):** `config.json` içine henüz gizli anahtar koymadın — sadece boş
     Supabase alanları var. Güvenli. İleride service_role anahtarı eklersen onu
     ASLA repoya koyma (env variable kullan).
3. Render'da **New → Web Service** → repo'nu seç.
4. Ayarlar:
   - **Build Command:** boş bırak (bağımlılık yok).
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Deploy et. Render sana `https://own-a-second.onrender.com` gibi bir adres verir.
6. Bu adresi test et: telefonundan (başka ağdan) aç. Açılıyorsa → **HALKA AÇIK demektir.**

## ADIM ADIM — Glitch (alternatif, daha da basit)

1. [glitch.com](https://glitch.com) → New project → **Import from GitHub** (ya da boş Node projesi açıp dosyaları yapıştır).
2. `package.json` zaten var → start komutu otomatik `npm start`.
3. Glitch sana `https://xxx.glitch.me` adresi verir (halka açık).
4. Glitch 5 dk boşta kalınca uyur; "always on" için ücretsiz ping servisi (ör. uptimerobot) kullanılabilir.

## İlk açılışta görünmesi gerekenler
- Saat akıyor, `Second #...` değeri artıyor.
- "Claim a second" formu çalışıyor (demo modda, ödeme alınmıyor).
- 4 Prime slot açık artırmada görünüyor.

## Bundan sonra
- Bu public URL'i HN + Reddit paylaşımında kullanırsın (metinleri hazır).
- İlgi gelirse → kalıcı veri (Supabase) + gerçek ödeme (Tron adresi) + domain.
