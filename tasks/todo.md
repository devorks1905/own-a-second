# OWN A SECOND — Görev Planı

> Anayasa gereği: 3+ adım ve mimari karar içeren işler yazılı planla yürütülür.

## FAZ 0-1-1.5-2  ✅ (tamamlandı, kanıtlı)
Hedef, marka, i18n(7 dil/RTL), stablecoin kararı, TRC-20 kararı, MVP (server+SSE+claim+ledger).

## FAZ 3 — Prime açık artırma + ödeme + çeviri + lansman  ✅
- [x] Plan: mimari kararlar
- [x] A3: auction (prime slot, bid, finalize → forever 'prime')  ✅ test
- [x] A3: payment (invoice → verify TronGrid TRC-20 → finalize; dev simulate)  ✅ test
- [x] A3: translate (dictionary/mock/deepl/google arayüzü + fallback)  ✅ test
- [x] A5: arayüz (auction bölümü + bid formu + i18n 116 anahtar × 7 dil)  ✅
- [x] A4/A6: doğrulama (uçtan uca) + risk notları  ✅
- [x] A2: lansman planı (docs/lansman-plani.md)

## FAZ 3 MİMARİ KARARLARI (değişirse DUR + yeniden planla)
- Auction: prime slot'lar config'den (auction.slots), min bid + süre + artış adımı config'den.
  Finalize: süre dolunca en yüksek teklif sahibi → store.forever[slot] = type 'prime'.
  Teklif yoksa slot yeniden açılır (yeni pencere).
- Payment: paymentEnabled=false (canlı demo güvenli). true olunca claim → invoice → doğrulama.
  TRC-20 gerçek kod (TronGrid API, built-in https, sıfır bağımlılık). Dev simülasyonu
  endpoint'i test için (config'den açık/kapalı). USDT+USDC kontrat adresleri config'den.
- Translate: provider arayüzü. 'none'=sözlük fallback, 'mock'=test, 'deepl'/'google'=gerçek
  (API anahtarı gerekir; canlı test edilmedi → dürüstçe işaretli).
- Seed değişikliği: 00:00:00 artık auction slot'u → seed'den çıkarıldı (çakışma önlendi).

## FAZ 3.5 — Bug düzeltme + tam çalışır doğrulama  ✅
- [x] BUG (kritik): renderAll() tanımsız → sayfa açılışta JS çöküyordu. Tanımlandı + lastUnix/lastClaims takibi.
- [x] BUG: formdaki "⚡ next second" butonu id'siz (ölü) → id=claimNext + listener bağlandı.
- [x] BUG: claim_type_prime_d "coming soon" idi ama auction canlı → 7 dilde "bid now" yapıldı.
- [x] Doğrulama: node --check temiz, smoke test (sahte DOM) → init() hatasız, tüm id'ler HTML'de mevcut,
      116 i18n anahtarı × 7 dil birebir, claim/auction/ledger uçtan uca testli.

## FAZ 4 — Üretim & büyüme  [ŞİMDİ]
- [x] Plan: Supabase = kalıcı DB (A3+A6 mutabakatı)
- [x] A3: supabase/schema.sql (tablolar + RLS + indeksler)
- [x] A3: config.json storage bloğu (mode: file|supabase)
- [x] A2: docs/yayin-rehberi.md (adım adım deploy)
- [ ] A3: server.js storage adapter (file → supabase) — KULLANICI anahtarları verince + canlı test
- [ ] A3: Supabase'e seed (ilk açılışta boşsa)
- [ ] A6: gerçek Tron adresi + paymentEnabled=true
- [ ] A2: ilk 100 sahip kampanyası (docs/lansman-plani.md)

## BEKLEYEN: Kullanıcıdan istenen
- (sonra) gerçek Tron cüzdan adresi (ADIM 4)
- (sonra) domain kararı (ADIM 3)