# OWN A SECOND — Teknik, Hukuki ve Operasyonel Analiz

> Amaç: yayına çıkmadan önce "para nasıl cüzdanıma ulaşacak, kayıt nasıl olacak,
> içerik sorumluluğu kime ait, daha neler var" sorularının kapsamlı cevabı.
> Bu belge A1 (strateji) + A3 (mühendislik) + A4 (finans) + A6 (hukuk/risk) ortak çalışmasıdır.

## ⚠️ ÖNEMLİ UYARI (önce bunu oku)
Bu belge iyi niyetli, araştırılmış bir değerlendirmedir; hukuki tavsiye DEĞİLDİR.
Türkiye'de 5651 sayılı kanun, küresel kripto vergilendirmesi ve kişisel veri (KVKK/GDPR)
konularında **mutlaka bir avukata danışılmalıdır.**

---

## 1) ÖDEME — para cüzdanına nasıl ulaşacak?

### Şu anki mimari
- Emanetsiz (non-custodial): kullanıcı kendi cüzdanından USDT/USDC'yi SENİN Tron adresine gönderir.
- Platform hiçbir fon tutmaz; senin cüzdanın = tek alım noktası.

### KRİTİK KARAR 1: Cüzdan sahipliği ve özel anahtar güvenliği
- Parayı alan adres **senin kendi Tron cüzdanın** (örn. TronLink). Bu cüzdanın
  **12/24 kelimelik seed phrase'i (kurtarma ifadesi) HER ŞEYDİR.**
- Seed phrase kaybolursa → tüm gelir kalıcı olarak kaybolur. Çalınırsa → tüm gelir çalınır.
- **Kurallar:** seed'i asla ekranda/dijital notta/sohbette açık tutma; çevrimdışı (kağıt/metale
  kazınmış) yedekle; cüzdanı işlemler için ayrı, "tasarruf" için ayrı tutmayı düşün.

### KRİTİK KARAR 2: Ödemeleri ayırt edebilme (reconciliation)
- Şu an doğrulama "gelen tutar ≥ fatura tutarı" mantığında. Sorun: aynı anda iki kişi $9 gönderirse
  hangisi hangisi ayırt edilemez.
- **Çözüm (ücretsiz, akıllıca): her faturaya benzersiz bir kuruş ekle.** Ör. fatura $9.00 değil,
  $9.00 + rastgele 1-99 cent ($9.37). Böylece her ödeme on-chain'de benzersiz ve eşleştirilebilir.
- Alternatif: fatura başına ayrı alt adres (HD cüzdan türetme) — daha temiz ama daha karmaşık (YAGNI).

### KRİTİK KARAR 3: Vergi olayı
- Kripto ile ödeme almak = gelir = **çoğu ülkede vergiye tabi bir olay** (satış anındaki USD değeri).
- USDT/USDC aldığında, bunu TL'ye/fiat'a çevirdiğin anda ayrı bir işlem daha doğar.
- Türkiye'de kripto kazançlarının vergilendirmesi belirsiz/karmaşık bir alandır → muhasebeci/avukat şart.
- **En azından:** her satışı kaydet (fatura id, tutar USD, tx hash, tarih) — ileride vergi için delil.

### KRİTİK KARAR 4: İade / uyuşmazlık (kripto geri döndürülemez)
- Kullanıcı yanlış tutar gönderirse veya çifte satış olursa **geri ödeme zor ama mümkün** (manuel,
  aynı adrese geri gönder). Politika net olmalı: "yanlış/eksik ödemede saniye ayrılmaz, iade manuel."
- Overpay (fazla ödeme) → otomatik iade mi, kredi mi? Net kural koy.

### KARAR ÖZETİ (A4 önerisi)
- Kendi Tron cüzdanın, seed güvenliği birinci öncelik.
- Faturalara benzersiz kuruş ekle (ödemeleri ayırt etmek için).
- Her satışı kaydet; vergi için muhasebeci/avukatla görüş.
- İade politikasını yazılı netleştir (ToS içinde).

---

## 2) KAYIT — mail ile mi, anonim mi?

### Seçenekler ve dürüst değerlendirme
| Seçenek | Artı | Eksi |
|---|---|---|
| **Anonim (şu anki)** | Sürtünmesiz, Tew'in orijinali böyle, KISS | Beğeni manipüle edilebilir; "sahip" olduğunu kanıtlayamaz; Forever aboneliğini yönetemez; uyuşmazlıkta kimlik yok |
| **E-posta kayıt** | Beğeni bütünlüğü (1 oy), mülkiyet kanıtı, "saniyen geliyor" bildirimi, Forever yenileme/iptal, iade | Sürtünme; e-posta servisi maliyeti; **KVKK/GDPR yükümlülüğü** (kişisel veri) |
| **Cüzdan imzası (kripto-natif)** | Kayıt yok, "sign message" ile kimlik, spam dayanıklı | Kullanıcı için teknik, kitle daralır |

### A6 + A1 ortak önerisi
- **MVP: anonim kal, ama "sahiplik kodu" ver.** Kullanıcı claim edince ona benzersiz bir
  **gizli kod (claim token)** göster; bu kodla saniyesini yönetebilir/silebilir. Mail şart değil,
  ama "benim" diyebilir.
- **E-posta'yı SONRAYA bırak** — ama ekleyince şunlar şart olur:
  - KVKK (Türkiye) + GDPR (AB kullanıcıları) uyumu: açık rıza, gizlilik politikası, silme hakkı.
  - E-posta doğrulama + şifre sıfırlama altyapısı.
- **Forever Second** (abonelik) işte bu yüzden MVP'de "tek seferlik" gibi davranabilir; gerçek
  otomatik yenileme için bir kimlik/kayıt gerekir → ileride e-posta.

### GDPR/KVKK notu (önemli)
- E-posta topladığın an kişisel veri işliyorsun. İster Türk ister yabancı kullanıcı olsun,
  küresel sitede AB kullanıcıları GDPR'a tabi olur. **Gizlilik politikası + rıza + silme mekanizması şart.**

---

## 3) İÇERİK — mesajlar ve YASAL SORUMLULUK (en ciddi konu)

### Sorun
Paralı "herkesin mesaj yayınlayabildiği" halka açık bir duvar = nefret söylemi, tehdit,
yasa dışı içerik, kişisel veri ifşası (doxxing), çocuk istismarı içeriği (CSAM), telif ihlali,
marka taklidi... biri bunu yayınlayabilir. Ve **para alıyorsun**, bu durumu daha hassas yapar.

### Hukuki çerçeve (kısaca)
- **Türkiye — 5651 sayılı kanun:** içerik/yayın sağlayıcısı olarak, hukuka aykırı içeriği
  **bildirim üzerine kaldırmazsan** sorumlu olursun. Hatta bazı içeriklerde (ör. çocuk istismarı)
  proaktif yükümlülük var. Yani "ben sadece platformum" savunması Türkiye'de zayıftır.
- **AB — DSA (Digital Services Act):** belli bir ölçeğin üzerinde sistematik yükümlülükler.
- **ABD — Section 230:** platform sorumluluğunu sınırlar, ama içerik barındırıyorsan yine kaldırma
  mekanizman olmalı (DMCA telif için).
- **Hangi ülkede barındırıyorsun?** Render ABD'de. Ama sen Türkiye'den işletiyorsan **5651 yine bağlar.**
  Bu, ciddiye alınması gereken net bir risk.

### Çözüm mimarisi (A6 önerisi — kademeli)
1. **Otomatik filtre (ilk katman):** yasaklı kelime listesi (ırkçılık, tehdit, cinsel istismar
   terimleri). Eşleşirse mesaj ya reddedilir ya da "incelemede" olur.
2. **Ön-onay (pre-moderation) vs sonradan kaldırma (post-moderation):**
   - **Ön-onay:** mesaj yayınlanmadan sen onaylarsın. En güvenli, ama "anlık" büyüsünü ve viral anı
     öldürür. Solo kurucu için düşük hacimde FİZİBİL (kontrol panelinden onayla).
   - **Sonradan kaldırma:** hemen yayınla + hızlı kaldır + bildirim. Daha akıcı, daha riskli.
   - **Önerim:** lansmanda **ön-onay** ile başla (hacim düşükken sorun değil), trafik artınca
     "otomatik filtre + sonradan kaldırma + şikayet"e geç.
3. **Şikayet/bildirim butonu:** her mesajda "🚩 Report" — 5651/DSA'nın olmazsa olmazı.
4. **Kara liste + kayıt tutma:** kim ne yazdı (kullanıcı adı + mesaj + tx hash + zaman) → yasal talep
   halinde delil.
5. **Yasaklı içerik listesini ToS'a yaz** (ne yayınlanamaz: nefret, tehdit, yasa dışı, doxxing, CSAM,
   telif, marka taklidi...). "Yayınlanamaz içerik tespit edilirse kaldırılır ve ücret iade edilmez" gibi.
6. **Yaş sınırı:** 18+ ve/veya ebeveyn onayı. Reşit olmayanlara "saniye satmak" bazı yargı alanlarında
   hassas (özellikle Prime açık artırması — kumar/çekiliş olarak yorumlanma riski).

### AÇIK UYARI (A6)
Bu konu **projenin en yüksek riski.** "Paralı duvar + küresel kullanıcı + Türkiye'de operatör" =
içerik sorumluluğu gerçek bir baş ağrısı olabilir. **Bir avukata danışmadan küresel lansmana çıkma.**
En azından: ön-onay + filtre + report + kaldırma + ToS + kayıt tutma olmadan yayınlama.

---

## 4) GEREKLİ BELGELER (A6 — yayına çıkmadan önce)

1. **Kullanım Şartları (Terms of Service):**
   - Ne satılıyor (gösterim hakkı, "zamanın kendisi" değil — bunu AÇIKÇA yaz, abes davaları önler).
   - Yasaklı içerik listesi + kaldırma hakkı + ücret iadesi koşulları.
   - İade politikası (kripto geri döndürülemez).
   - Sorumluluk reddi (saat/veri kesintisi, mesajların kullanıcıya ait olduğu).
   - Fikri mülkiyet: kullanıcı mesajını yayınlaman için sana lisans verir.
2. **Gizlilik Politikası (Privacy Policy):**
   - Hangi veri toplanıyor (IP, e-posta ileride, cüzdan adresi, tx), neden, ne kadar saklanır.
   - KVKK/GDPR: rıza, erişim, silme hakları.
3. **Ticari faturanın olmaması** → kripto satışta "fatura kesmek" Türkiye'de ayrı bir konu; muhasebeciye sor.

---

## 5) AKLINA GELMEYEN DİĞER KONULAR (A1 + A3 + A4 + A6)

### A. Tüzel kişilik & operasyon
- **Şahıs olarak mı, şirket olarak mı?** Kripto gelir + küresel satış = şirket (ör. limited) daha temiz;
  hem vergi hem sorumluluk hem de banka/ödeme ilişkileri için. Gelir olmadan önce şart değil ama
  **ilk satışta** karar ver.
- Hangi ülkeden işletiyorsun → hangi vergi/hukuk bağlar (Türkiye'deysen 5651 + KVKK + vergi).

### B. Veri kalıcılığı (üretim şartı)
- Render free tier'da `store.json` **her deploy'da/uykuda sıfırlanır.** Bir müşteri "saniyesini
  aldı" diye ödeme yaptıysa ve veri uçarsa → öfkeli müşteri + iade + itibar kaybı.
- **Yayına çıkmadan önce Supabase'e geçiş ŞART** (şema hazır, sadece bağlamak lazım). Bu, "kayıt
  tutma" (içerik sorumluluğu delili) için de gereklidir.

### C. Güvenlik (sunucu tarafı)
- **Rate limiting:** şu an `/api/claim` sınırsız — biri botla binlerce sahte claim atabilir (veri
  şişirme, spam, kaynak tüketimi). Beğeni için var, claim için YOK. Eklenmeli.
- **CSRF/input temizliği:** mesaj/kullanıcı adı HTML'e güvenle basılıyor mu (XSS)? `textContent`
  kullanılıyor (iyi) ama yine de sunucuda input uzunluk/karakter doğrulaması var mı (var). Gözden geçir.
- **Cüzdan adresi config'de** → `service_role` gibi gizli değil (adres zaten herkese açık olacak),
  ama seed phrase ASLA kodda/repoda olmamalı.

### D. Sahtecilik / kimlik taklidi
- Biri "@elonmusk" ya da bir marka adıyla mesaj atabilir. ToS'a "üçüncü kişi kimliğini taklit etme"
  + filtre + kaldırma ekle. Telif/marka ihlali mesajlarında DMCA/ihbar kanalı şart.

### E. Prime açık artırma = "kumar/çekiliş" mi?
- Açık artırma genelde kumar sayılmaz (skill/bid), ama bazı yargı alanlarında düzenlemeye tabi
  olabilir. Düşük öncelik, ama avukat notu olarak kalsın.

### F. "Saniye satmak" ifadesi
- ToS'ta netleştir: **"saniye üzerinde gösterim hakkı satın alıyorsun, zamanın kendisini değil."**
  Bu, "bana zaman mı sattınız" türü abes iddiaları ve yanıltıcılık riskini önler.

### G. Ölçek & operasyonel sınırlar
- Single-process Node + dosya/DB: belli trafikte yeterli, ama viral dalga gelirse tek Render free
  instance yetmez (spin-down + CPU). Plan: önce Supabase, sonra paid instance.

---

## 6) ÖNCELİK SIRASI (A1 — neyi önce yapmalı)

**YAYINA ÇIKMADAN ÖNCE (olmazsa olmaz):**
1. Cüzdan seed güvenliği (senin kendi kontrolünde).
2. İçerik moderasyonu: filtre + ön-onay/rapor + kaldırma + kayıt.
3. ToS + Gizlilik Politikası (avukat kontrolünde).
4. Supabase kalıcı veri (müşteri verisi kaybını önler + yasal kayıt).
5. Claim rate-limiting + temel güvenlik.

**KISA VADEDE:**
6. Ödeme ayırt etme (benzersiz kuruş) + iade politikası.
7. Vergi/muhasebe kararı (ilk satıştan önce).
8. Tüzel kişilik kararı.

**BÜYÜYÜNCE:**
9. E-posta kayıt + KVKK/GDPR tam uyum.
10. KYC/AML değerlendirmesi (yüksek hacimde).
11. On-chain/NFT'ye geçiş (tamamen farklı hukuk — ayrıca düşünülür).

---

## 7) BİZDEN NET ÖNERİ (özet)

En yüksek riskler sırasıyla: **(1) içerik sorumluluğu (hukuki), (2) cüzdan güvenliği (parasal),
(3) veri kalıcılığı (müşteri güveni).**

Bunların hiçbiri "kod güzelleştirme" değil; hepsi yayın öncesi operasyonel/hukuki hazırlık.
İstersen sıradaki adımda **bunları tek tek uygulamaya** başlayabiliriz:
- Moderation (filtre + report + ön-onay) → kodlayabilirim.
- Supabase bağlantısı → sen anahtarları verince yaparım.
- ToS/Gizlilik taslağı → yazarım (ama avukat onayı şart).
- Rate-limiting + güvenlik → kodlayabilirim.

Hangisinden başlayalım?
