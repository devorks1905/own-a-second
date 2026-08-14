# OWN A SECOND — Ürün Brifi

## 0. HEDEF (tek cümle)
Dünyanın her yerinde aynı anda akan tek bir küresel saat üzerinden insanların
"bir saniyeyi" satın alıp sahiplendiği ve o saniye geldiğinde mesajlarının tüm
kullanıcılara aynı anda, tam bir saniyeliğine gösterildiği; tek seferlik satış +
abonelik geliri üreten küresel bir platform kurmak.

## 0b. KAPSAM DIŞI (ilk sürümde YAPILMAYACAKLAR)
- Blockchain / NFT / kripto ödeme (sonraya).
- Native mobil uygulama (önce web).
- Üçüncü taraf reklam ağı (reklam alanı satıyoruz, reklam yayınlamıyoruz).
- Fiziksel ürün / merch (saat, kutu vb.).
- Çok dilli tam lokalizasyon (önce İngilizce tek dil).

## Marka
- Ad: **OWN A SECOND**
- Marka adı her dilde aynı kalır (evrensel). Arayüz metinleri yerelleşir.
- Ton: kesin, merak uyandıran, "bir saniyede anlaşılır".

## Küreselleşme / Dil Mimarisi (TUR 2 kararı)
- Arayüz dili: her zaman ziyaretçinin dili. Tarayıcıdan otomatik algılanır
  (navigator.languages / Accept-Language), manuel değiştirilebilir, localStorage'da tutulur.
- Mesaj/reklam dili: ALICI seçer → "Tüm diller" (otomatik çeviri: her izleyici kendi
  dilinde görür) veya belirli bir dil.
- RTL desteği: Arapça gibi sağdan-sola diller için <html dir="rtl">.
- Çeviri kaynağı (gerçek üründe): (a) alıcının kendi çevirisi, veya (b) otomatik MT
  (DeepL/Google) — premium. Prototipte sözlük.

## Ödeme (TUR 3 kararı — NETLEŞTİ)
- Araç: **STABLECOIN — USDT + USDC** (USD'ye sabit; BTC/ETH gibi uçucu varlıklar DEĞİL).
  Gerekçe (A4): fiyat USD sabit, dalgalanma riski sıfır — alıcı da biz de korunuruz.
- Emanetsiz (non-custodial) checkout — kullanıcı kendi cüzdanından öder, platform fon
  tutmaz (A6 onayı).
- Fiyatlar USD sabitlenir; ödeme anında 1:1 USDT/USDC olarak alınır.
- Ağ (chain) kararı (TUR 4 — NETLEŞTİ): **TRC-20 (Tron)**. Neden: USDT'nin perakende
  dünyasında en yaygın ağı, ücret düşük, hızlı, emerging market kullanıcısına en tanıdık.
- Ücret modeli (TUR 5 — NETLEŞTİ, teknik doğrulama yapıldı):
  - TRON'da ücret Energy+Bandwidth ile ödenir. İKİ model vardır:
    (A) Standart: ücret gönderenin TRX bakiyesinden yakılır (~$1.6-2.2), USDT TAM gider.
    (B) Gas-Free (2025+ cüzdanlar): ücret gönderilen USDT'den düşülür (~$1-1.5), TRX gerekmez.
  - Seçim: **Model B (gas-free)** — "müşteri tam $9 gönderir, ücret içinden düşülür, bize ~$8 gelir."
    Müşteri deneyimi en temiz (TRX/enerji bilmez).
  - ÖNEMLİ: ücret DEĞİŞKEN (~$0.8-3), sabit değil → fiyatlar ücret yedirilerek konur;
    muhasebede on-chain net gelen tutar baz alınır.
  - Borsa çekim ücreti (Binance vb. ~$1-2.4) müşteriye aittir, bizim kontrolümüzde değil.
  - MVP teknik kararı (FAZ 2): gas-free'i biz mi sağlayacağız (native Gas-Free / energy
    rental) yoksa müşteri cüzdanına mı güveneceğiz → en basiti her iki modeli de kabul et,
    on-chain net USDT'yi doğrula (KISS).
- Kart/fiat sonradan opsiyonel.

## Satış Birimi
- Birim: **bir saniye** (bir "an").
- Her saniyenin küresel-tek kimliği: Unix zaman damgası ("Second #1,784,XXX,XXX").

## 3 Ürün Katmanı (fikir birliği)
1. **One Second** — tek seferlik, tarihli bir saniye (doğum günü, yıldönümü).
2. **Forever Second** — her gün aynı an tekrar eden saniye (abonelik, $/ay).
3. **Prime Second** — zirve anlar (00:00 UTC, 11:11, yılbaşı) açık artırma ile.

## Temel Teknik Karar (MVP)
- Tek merkezi saat: UTC. Tüm istemciler sunucu saatine kilitlenir (sapma riski yok).
- Mesaj: en fazla ~12 kelime, gösterim tam 1 saniye.

## Hukuk Notu (A6)
- "Zamanın kendisi" değil, "ekran üzerindeki gösterim süresi" satılır = medya/reklam
  hizmeti. Piksel satmak kadar yasal. (Netleştirilecek: yanıltıcı ifadelerden kaçın.)
