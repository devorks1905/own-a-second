# 💰 Cüzdan Güvenliği Rehberi — OWN A SECOND

> Paranı alacak cüzdan SENİN kontrolünde. Bu rehber, o parayı kaybetmemen için
> hayati kuralları içerir. **Bunları atlarsan tüm gelirini kaybedebilirsin.**

## 1. Mimari: para nereden geçiyor?

```
Alıcı (USDT/USDC TRC-20)  →  SENİN Tron cüzdanın
```

- **Non-custodial (emanetsiz):** Platform HİÇBİR fon tutmaz. Para doğrudan senin
  cüzdanına gider. Yani "borsada duruyor, çalındı" riski YOK.
- Tek giriş noktası = senin cüzdanın. Tek korunması gereken şey = **seed phrase.**

## 2. SEED PHRASE — HER ŞEY BU

Tron cüzdanı oluşturunca sana **12 (bazen 24) kelimelik** bir "kurtarma ifadesi"
(seed phrase / recovery phrase) verilir. Bu kelimeler = cüzdanın **tek anahtarı.**

| Durum | Sonuç |
|---|---|
| Seed kayboldu | Cüzdan erişilemez → **tüm para kalıcı kayıp** |
| Seed çalındı | Hırsız parayı anında çeker → **tüm para çalındı** |

### ALTIN KURALLAR (asla çiğneme)
1. **Asla dijital ortamda saklama:** ekran görüntüsü, fotoğraf, Not defteri, e-posta,
   bulut (Google Drive/iCloud), sohbet — HİÇBİRİNE yazma. Telefon kamerasına bile çekme.
2. **Kağıda yaz + güvenli yerde sakla** (tercihen 2 kopya, 2 ayrı fiziksel yer:
   ev + aile yanı).
3. **Asla kimseyle paylaşma** — "destek", "moderatör", "yönetici" diyen herkes dolandırıcı.
   Hiçbir gerçek hizmet seed isteğini sormaz.
4. **İnternete bağlı cihazda seed yazarken** bile dikkatli ol; ideal olarak çevrimdışı yaz.

## 3. Cüzdan türü (seviyene göre)

| Seviye | Öneri | Not |
|---|---|---|
| **Başlangıç (şimdi)** | **TronLink** (tarayıcı eklentisi/mobil) | Ücretsiz, kolay, gerçek cüzdan. Tek gereken: seed'i kağıda yaz. |
| **Gelir artınca** | **Ledger** gibi donanım cüzdanı | Seed cihaz içinde kalır, çevrimdışı imzalar — en güvenlisi. |

## 4. "İşlem cüzdanı" vs "tasarruf" (büyüyünce)

- **İşlem cüzdanı:** günlük satış gelirinin biriktiği yer (TronLink).
- **Tasarruf/soğuk cüzdan:** biriken parayı **periyodik** aktardığın, internete hiç
  bağlanmayan (donanım) cüzdan.
- Kural: işlem cüzdanında büyük tutar **tutma**; düzenli aralıklarla soğuğa taşı.

## 5. Sana düşen şimdi (kontrol listesi)

- [ ] TronLink kur (tronlink.org → resmi siteden).
- [ ] Yeni cüzdan oluştur → seed phrase'i **kağıda yaz** (dijital değil!).
- [ ] Cüzdan adresini kopyala (T... ile başlar) → bana ver (config'e ekleyeceğim).
- [ ] İlk gerçek ödemeyi **küçük tutarla** kendin test et.

---

> ⚠️ Seed phrase'i bu projede, GitHub'da, sohbette, hiçbir yerde yazılı tutma.
> Adres (T...) ise GÜVENLİDİR — insanlar para gönderebilmek için zaten onu görecek.
