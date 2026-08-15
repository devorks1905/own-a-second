# 🚀 Gerçek Ödemeyi Açma Rehberi — OWN A SECOND

> Amaç: demo modundan gerçek USDT/USDC (TRC-20) ödemesine geçmek.
> Şu an `paymentEnabled = false` → her claim bedava "demo" kaydı.
> Bu rehber, gerçek paraya geçişin adım adım yoludur.

## ÖNEMLİ: Neden şimdi açmıyoruz?
- Para almak için **senin gerçek Tron cüzdanın** gerekli (özel anahtarın sende olmalı —
  biz oluşturamayız).
- Yasal olarak ilk gerçek satış = vergi/muhasebe olayı başlar → önce muhasebeci/avukat.
- Lansman öncesi "talep kanıtı" aşamasında demo modu **yeterli ve daha güvenli.**

## ADIM ADIM

### 1. Tron cüzdanı kur
1. **tronlink.org** → resmi TronLink cüzdanını kur (tarayıcı eklentisi veya mobil).
2. Yeni cüzdan oluştur → **seed phrase'i kağıda yaz** (dijital değil — bkz. cüzdan rehberi).
3. Cüzdan açılınca **T...** ile başlayan adresini kopyala. Bu senin alım adresin.

### 2. Adresi bana ver
- Adresini bana yapıştır. Ben `config.json` → `payment.receiveAddress` alanına yazacağım.
- Adres **güvenli ve public** — insanlar para göndermek için zaten onu görecek. Seed DEĞİL.

### 3. Ödemeyi aç
- `config.json` → `paymentEnabled` = `true`.
- `payment.simulateEnabled` = `false` (test simülasyonu kapansın).

### 4. İlk test ödemesini yap
1. Bir arkadaşından (veya ikinci bir cüzdandan) küçük bir tutar gönder (ör. $9.37).
2. Sunucu, TronGrid API üzerinden **on-chain** olarak ödemeyi doğrular (otomatik, ~15 sn'de bir).
3. Ödeme gelince → saniye "paid" olarak işlenir → mesaj yayına girer.

## Teknik akış (zaten kodlandı, test edildi)
```
claim → invoice (benzersiz kuruş: $9.37) → kullanıcı gönderir
→ verifyLoop (TronGrid TRC-20 sorgusu) → gelen ≥ fatura → finalize → paid
```

## Güvenlik notları
- `receiveAddress` public → config'e konabilir.
- **Seed phrase ASLA kodda/repoda/sohbette olmamalı.**
- Vergi: her satışın kaydı zaten `invoices` + `moderationLog`'da tutuluyor (delil).
- İade: kripto geri döndürülemez → ToS'ta netleştirildi; manuel iade mümkün.

## Ne zaman açmalı?
- **Şimdi değil.** Önce: talep kanıtı → insanlar gerçekten istiyor mu gör → sonra
  cüzdanı bağla + muhasebeciyle görüş + ödemeyi aç.
