# OWN A SECOND — Görev Planı

> Anayasa gereği: 3+ adım ve mimari karar içeren işler yazılı planla yürütülür.

## FAZ 0-3.5 ✅ (tamamlandı, kanıtlı)
Hedef, marka, i18n(7 dil/RTL), stablecoin/TRC-20, MVP, auction, payment, translate,
bug düzeltmeleri, AI-era arayüz.

## FAZ 4 — Üretim & güvenlik ✅
- [x] Supabase kalıcı veri (bağlandı, canlı test: yeniden başlatmada veri geri geldi)
- [x] Moderasyon (filtre + report + admin log + rate-limit)  ✅ test
- [x] Benzersiz kuruş (ödeme ayırt etme)  ✅ test
- [x] ToS + Gizlilik Politikası (/legal sayfası + footer link)
- [x] Cüzdan güvenliği rehberi (docs/cuzdan-guvenligi.md)
- [x] Ödeme açma rehberi (docs/odeme-acma.md)
- [x] README.md (proje dokümantasyonu)

## BEKLEYEN: Kullanıcıdan istenen (gerçek ödeme için)
- [ ] Gerçek Tron cüzdan adresi (T...) → config payment.receiveAddress
- [ ] paymentEnabled = true + simulateEnabled = false (ilk satışta, muhasebeci sonrası)
- [ ] İlk gerçek test ödemesi (küçük tutar)
- [ ] Avukat onayı (ToS/Gizlilik + 5651)

## FAZ 5 — Lansman & büyüme (SONRA, talep kanıtı sonrası)
- [ ] İlk 100 sahip kampanyası (docs/lansman-plani.md)
- [ ] Gerçek MT (DeepL) — MyMemory yetersiz kalırsa
- [ ] Tüzel kişilik + vergi kararı
- [ ] Paid hosting (trafik artınca)