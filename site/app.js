(function () {
'use strict';

/* ============================================================
   OWN A SECOND — client
   Single source of truth for TIME = the server (via SSE).
   UI language = viewer's language. Message language = owner's choice.
   ============================================================ */

// ---------- I18N ----------
var I18N = {
en: {
  nav_how:"How it works", nav_pricing:"Pricing", nav_story:"Story", nav_claim:"Claim a second",
  kicker:"One clock · Everywhere · Forever",
  title1:"Own one second", title2:"of the world.",
  sub:"There is one clock, ticking everywhere at once. Buy a second on it. When your second arrives, your message is shown to everyone — at the same moment, for exactly one second.",
  badge_demo:"Demo mode · crypto checkout coming soon",
  clock_label:"Now · Coordinated Universal Time", unclaimed:"— unclaimed", owned:"— owned",
  clock_unclaimed:"This second is unclaimed.", clock_owned_by:"Owned by",
  claim_now:"Claim it now",
  cta_claim:"Claim your second", cta_how:"See how it works",
  claim_title:"Claim a second", claim_sub:"Pick your moment, write your message, and it's yours.",
  claim_type_label:"Type",
  claim_type_one_t:"One Second", claim_type_one_d:"A single, dated moment",
  claim_type_forever_t:"Forever Second", claim_type_forever_d:"Repeats every day",
  claim_type_prime_t:"Prime Second", claim_type_prime_d:"Auction · bid now",
  claim_when_one:"Exact moment (UTC)",
  claim_when_forever:"Time of day (UTC · repeats daily)",
  claim_next_btn:"⚡ Claim the very next second",
  claim_message_label:"Your message", claim_message_ph:"What the world sees for one second…",
  claim_chars:"characters",
  claim_name_label:"Your name / handle", claim_name_ph:"e.g. @you",
  claim_audience_label:"Who sees it in their language",
  claim_audience_all:"Everyone — auto-translated into each viewer's language",
  claim_audience_specific:"A specific language",
  claim_translations_toggle:"Provide my own translations (optional)",
  claim_translations_hint:"Leave empty to use automatic translation",
  claim_price_label:"Price",
  claim_submit:"Claim this second",
  claim_success:"Claimed! Your message will appear when your second arrives.",
  claim_demo_note:"Demo: no payment is taken yet. Crypto checkout (USDT / USDC · TRC-20) is wired next.",
  err_generic:"Something went wrong. Try again.",
  err_taken:"That second is already claimed.",
  err_past:"You can't claim a second in the past.",
  err_message:"Message is empty or too long.",
  err_name:"Name is empty or too long.",
  err_audience:"Invalid audience.",
  err_time:"Invalid time.",
  how_title:"Three steps. One second.", how_sub:"No account needed to understand it. You understand it in one second.",
  step1_t:"Pick your second", step1_d:"A birthday. A midnight. 11:11. Any moment that means something to you — or to the whole world.",
  step2_t:"Write your message", step2_d:"Up to 120 characters. Whatever you want the world to see when your second arrives.",
  step3_t:"Own the moment", step3_d:"When your second hits, everyone sees it. Everywhere. At once. For exactly one second.",
  forever_line:"A second never really passes. Choose a recurring second and it's yours — same moment, every day, forever.",
  forever_sub:"This is what makes a second worth more than a pixel: it keeps coming back.",
  pricing_title:"Own it your way", pricing_sub:"Suggested launch pricing. Prime seconds are auctioned — the rarest moments go to the highest bidder.",
  tier1_tag:"One-time", tier1_name:"One Second", tier1_per:"once · a single dated second", tier1_d:"Perfect for a birthday, an anniversary, a goodbye. Your message appears once — and is recorded forever.",
  tier2_tag:"Recurring", tier2_name:"Forever Second", tier2_per:"every day · same moment", tier2_d:"Your second repeats every single day. A moment that never stops being yours.",
  tier3_tag:"Auction", tier3_name:"Prime Second", tier3_per:"rarest moments", tier3_d:"Midnight UTC. 11:11. New Year's Eve. The seconds everyone wants — decided by open auction.",
  btn_forever:"Own a forever second", btn_prime:"Watch the auction",
  pay_title:"Pay with stablecoins", pay_sub:"Prices are fixed in US dollars. Pay the exact amount in USDT or USDC — no volatility, no surprises.",
  pay_note:"Non-custodial checkout. You pay the exact price — network fees are on us. (TRC-20)",
  ledger_title:"The ledger", ledger_sub:"Every second that has an owner. Forever seconds repeat daily.",
  ledger_empty:"No seconds claimed yet. Be the first.",
  badge_one:"one-time", badge_forever:"forever", badge_prime:"prime",
  at_prefix:"at", daily_suffix:"daily",
  upcoming_title:"Coming up", upcoming_none:"Nothing scheduled yet — claim one now.",
  story_quote:"\"In 2005, a student sold one million pixels for a dollar each and made a million dollars. The lesson wasn't the pixels. It was that the most valuable thing on Earth is attention — and time.\"",
  story_from:"OWN A SECOND takes that idea to the only asset that never runs out: the clock itself.",
  demo_title:"See your message in their language", demo_sub:"Buy a second and choose who sees it: everyone (auto-translated into each viewer's language) or a specific language.",
  demo_lead:"If you choose “All languages”, a viewer sees your message in their own language:",
  demo_msg:"This second, I choose you.",
  auction_title:"Prime Seconds — live auction", auction_sub:"The rarest moments of the clock. Bid to own them forever.", auction_min:"Minimum", auction_current:"Current bid", auction_ends:"Ends", auction_bid_count:"bids", auction_no_live:"No live auctions right now.", auction_place:"Place a bid", auction_your_name:"Your name / handle", auction_amount:"Bid amount (USD)", auction_submit:"Place bid", auction_bid_ok:"Bid placed!", auction_closed:"This auction has ended.", auction_bid_low:"Bid is too low.", auction_not_found:"Auction not found.", auction_won:"Winner", pay_pending:"Payment required", err_auction_only:"That moment is a Prime Second — bid for it in the auction.", feed_title:"Live feed", top_title:"Most loved", feed_empty:"No messages yet — claim the first second.", top_empty:"No likes yet — be the first to love one.", next_broadcast:"Next broadcast", live_label:"LIVE", like_label:"Like", read_more:"Read more", lang_label:"Language", footer1:"OWN A SECOND — a prototype. © 2026", footer2:"Every second has a number. Every number can have an owner."
},
tr: {
  nav_how:"Nasıl çalışır", nav_pricing:"Fiyatlar", nav_story:"Hikâye", nav_claim:"Bir saniye al",
  kicker:"Tek saat · Her yerde · Sonsuza dek",
  title1:"Dünyanın", title2:"bir saniyesine sahip ol.",
  sub:"Her yerde aynı anda işleyen tek bir saat var. Üzerinden bir saniye satın al. Saniyen geldiğinde mesajın herkese — aynı anda, tam bir saniyeliğine — gösterilir.",
  badge_demo:"Demo modu · kripto ödeme yakında",
  clock_label:"Şimdi · Eşgüdümlü Evrensel Zaman", unclaimed:"— sahipsiz", owned:"— sahipli",
  clock_unclaimed:"Bu saniye sahipsiz.", clock_owned_by:"Sahibi",
  claim_now:"Şimdi sahiplen",
  cta_claim:"Saniyeni al", cta_how:"Nasıl çalıştığını gör",
  claim_title:"Bir saniye sahiplen", claim_sub:"Anını seç, mesajını yaz — o saniye senin olsun.",
  claim_type_label:"Tür",
  claim_type_one_t:"Tek Saniye", claim_type_one_d:"Tarihli tek bir an",
  claim_type_forever_t:"Sonsuz Saniye", claim_type_forever_d:"Her gün tekrar eder",
  claim_type_prime_t:"Prime Saniye", claim_type_prime_d:"Açık artırma · hemen teklif ver",
  claim_when_one:"Tam an (UTC)",
  claim_when_forever:"Günün saati (UTC · her gün tekrar)",
  claim_next_btn:"⚡ Sıradaki saniyeyi sahiplen",
  claim_message_label:"Mesajın", claim_message_ph:"Dünya bir saniyeliğine ne görsün…",
  claim_chars:"karakter",
  claim_name_label:"Adın / kullanıcı adın", claim_name_ph:"örn. @sen",
  claim_audience_label:"Kim, kendi dilinde görsün",
  claim_audience_all:"Herkes — her izleyicinin diline otomatik çevrilir",
  claim_audience_specific:"Belirli bir dil",
  claim_translations_toggle:"Kendi çevirimi yazayım (isteğe bağlı)",
  claim_translations_hint:"Boş bırakırsan otomatik çeviri kullanılır",
  claim_price_label:"Fiyat",
  claim_submit:"Bu saniyeyi sahiplen",
  claim_success:"Sahiplenildi! Mesajın saniyen geldiğinde görünecek.",
  claim_demo_note:"Demo: henüz ödeme alınmıyor. Kripto ödeme (USDT / USDC · TRC-20) sırada.",
  err_generic:"Bir şeyler ters gitti. Tekrar dene.",
  err_taken:"O saniye zaten sahipli.",
  err_past:"Geçmişteki bir saniyeyi sahiplenemezsin.",
  err_message:"Mesaj boş veya çok uzun.",
  err_name:"Ad boş veya çok uzun.",
  err_audience:"Geçersiz hedef kitle.",
  err_time:"Geçersiz saat.",
  how_title:"Üç adım. Bir saniye.", how_sub:"Anlamak için hesap gerekmez. Bir saniyede anlarsın.",
  step1_t:"Saniyeni seç", step1_d:"Bir doğum günü. Bir gece yarısı. 11:11. Sana ya da tüm dünyaya bir anlam ifade eden herhangi bir an.",
  step2_t:"Mesajını yaz", step2_d:"En fazla 120 karakter. Saniyen geldiğinde dünyanın görmesini istediğin her şey.",
  step3_t:"O ana sahip ol", step3_d:"Saniyen geldiğinde herkes görür. Her yerde. Aynı anda. Tam bir saniyeliğine.",
  forever_line:"Bir saniye aslında hiç geçmez. Tekrarlayan bir saniye seç, senin olsun — aynı an, her gün, sonsuza dek.",
  forever_sub:"Bir saniyeyi bir pikselden değerli kılan budur: hep geri gelir.",
  pricing_title:"Kendi tarzında sahip ol", pricing_sub:"Önerilen lansman fiyatları. Prime saniyeler açık artırmayla satılır.",
  tier1_tag:"Tek seferlik", tier1_name:"Tek Saniye", tier1_per:"bir kez · tarihli tek bir saniye", tier1_d:"Bir doğum günü, bir yıldönümü, bir veda için birebir. Mesajın bir kez görünür — ve sonsuza dek kayıtlı kalır.",
  tier2_tag:"Tekrarlayan", tier2_name:"Sonsuz Saniye", tier2_per:"her gün · aynı an", tier2_d:"Saniyen her gün tekrar eder. Senin olmaktan hiç vazgeçmeyen bir an.",
  tier3_tag:"Açık artırma", tier3_name:"Prime Saniye", tier3_per:"en nadir anlar", tier3_d:"Gece yarısı UTC. 11:11. Yılbaşı gecesi. Herkesin istediği saniyeler — açık artırmayla belirlenir.",
  btn_forever:"Sonsuz saniye sahiplen", btn_prime:"Açık artırmayı izle",
  pay_title:"Stablecoin ile öde", pay_sub:"Fiyatlar ABD doları cinsinden sabittir. Tutarı USDT veya USDC olarak tam öde — dalgalanma yok, sürpriz yok.",
  pay_note:"Emanetsiz ödeme. Tam tutarı ödersin — ağ ücreti bize ait. (TRC-20)",
  ledger_title:"Defter", ledger_sub:"Sahibi olan her saniye. Sonsuz saniyeler her gün tekrar eder.",
  ledger_empty:"Henüz sahiplenilmiş saniye yok. İlk ol.",
  badge_one:"tek seferlik", badge_forever:"sonsuz", badge_prime:"prime",
  at_prefix:"saat", daily_suffix:"her gün",
  upcoming_title:"Sırada", upcoming_none:"Planlanmış bir şey yok — şimdi bir saniye al.",
  story_quote:"\"2005'te bir öğrenci bir milyon pikseli tanesi bir dolara satıp bir milyon dolar kazandı. Ders pikseller değildi. Ders şuydu: Dünyadaki en değerli şey dikkattir — ve zamandır.\"",
  story_from:"OWN A SECOND bu fikri hiç tükenmeyen tek varlığa taşıyor: saatin kendisine.",
  demo_title:"Mesajını onların dilinde gör", demo_sub:"Bir saniye al ve kimin göreceğini seç: herkes (her izleyicinin diline otomatik çevrilir) ya da belirli bir dil.",
  demo_lead:"“Tüm diller”i seçerseniz, izleyici mesajınızı kendi dilinde görür:",
  demo_msg:"Bu saniyede, seni seçiyorum.",
  auction_title:"Prime Saniyeler — canlı açık artırma", auction_sub:"Saatin en nadir anları. Onlara sonsuza dek sahip olmak için teklif ver.", auction_min:"Minimum", auction_current:"Güncel teklif", auction_ends:"Bitiş", auction_bid_count:"teklif", auction_no_live:"Şu an canlı açık artırma yok.", auction_place:"Teklif ver", auction_your_name:"Adın / kullanıcı adın", auction_amount:"Teklif tutarı (USD)", auction_submit:"Teklif ver", auction_bid_ok:"Teklif verildi!", auction_closed:"Bu açık artırma sona erdi.", auction_bid_low:"Teklif çok düşük.", auction_not_found:"Açık artırma bulunamadı.", auction_won:"Kazanan", pay_pending:"Ödeme gerekli", err_auction_only:"O an bir Prime Saniyedir — açık artırmada teklif ver.", feed_title:"Canlı akış", top_title:"En çok beğenilen", feed_empty:"Henüz mesaj yok — ilk saniyeyi sahiplen.", top_empty:"Henüz beğeni yok — ilk beğenen sen ol.", next_broadcast:"Sıradaki yayın", live_label:"CANLI", like_label:"Beğen", read_more:"Devamını oku", lang_label:"Dil", footer1:"OWN A SECOND — bir prototip. © 2026", footer2:"Her saniyenin bir numarası vardır. Her numaranın bir sahibi olabilir."
},
de: {
  nav_how:"So funktioniert's", nav_pricing:"Preise", nav_story:"Geschichte", nav_claim:"Sekunde sichern",
  kicker:"Eine Uhr · Überall · Für immer",
  title1:"Besitze eine Sekunde", title2:"der Welt.",
  sub:"Es gibt eine Uhr, die überall gleichzeitig tickt. Kaufe eine Sekunde darauf. Wenn deine Sekunde kommt, wird deine Nachricht allen gezeigt — im selben Moment, für genau eine Sekunde.",
  badge_demo:"Demo-Modus · Krypto-Checkout bald",
  clock_label:"Jetzt · Koordinierte Weltzeit", unclaimed:"— frei", owned:"— vergeben",
  clock_unclaimed:"Diese Sekunde ist frei.", clock_owned_by:"Besitzer",
  claim_now:"Jetzt sichern",
  cta_claim:"Sekunde sichern", cta_how:"So funktioniert's",
  claim_title:"Eine Sekunde sichern", claim_sub:"Wähle deinen Moment, schreibe deine Nachricht — und sie gehört dir.",
  claim_type_label:"Typ",
  claim_type_one_t:"Eine Sekunde", claim_type_one_d:"Ein einzelner, datierter Moment",
  claim_type_forever_t:"Ewige Sekunde", claim_type_forever_d:"Wiederholt sich täglich",
  claim_type_prime_t:"Prime-Sekunde", claim_type_prime_d:"Auktion · jetzt bieten",
  claim_when_one:"Exakter Moment (UTC)",
  claim_when_forever:"Uhrzeit (UTC · täglich)",
  claim_next_btn:"⚡ Die nächste Sekunde sichern",
  claim_message_label:"Deine Nachricht", claim_message_ph:"Was die Welt eine Sekunde lang sieht…",
  claim_chars:"Zeichen",
  claim_name_label:"Dein Name / Handle", claim_name_ph:"z. B. @du",
  claim_audience_label:"Wer sieht sie in seiner Sprache",
  claim_audience_all:"Alle — automatisch in jede Sprache übersetzt",
  claim_audience_specific:"Eine bestimmte Sprache",
  claim_translations_toggle:"Eigene Übersetzungen angeben (optional)",
  claim_translations_hint:"Leer lassen für automatische Übersetzung",
  claim_price_label:"Preis",
  claim_submit:"Diese Sekunde sichern",
  claim_success:"Gesichert! Deine Nachricht erscheint, wenn deine Sekunde kommt.",
  claim_demo_note:"Demo: Es wird noch keine Zahlung eingezogen. Krypto-Checkout (USDT / USDC · TRC-20) folgt.",
  err_generic:"Etwas ist schiefgelaufen. Erneut versuchen.",
  err_taken:"Diese Sekunde ist bereits vergeben.",
  err_past:"Eine vergangene Sekunde kannst du nicht sichern.",
  err_message:"Nachricht ist leer oder zu lang.",
  err_name:"Name ist leer oder zu lang.",
  err_audience:"Ungültiges Publikum.",
  err_time:"Ungültige Uhrzeit.",
  how_title:"Drei Schritte. Eine Sekunde.", how_sub:"Kein Konto nötig. Du verstehst es in einer Sekunde.",
  step1_t:"Wähle deine Sekunde", step1_d:"Ein Geburtstag. Eine Mitternacht. 11:11. Jeder Moment, der dir — oder der ganzen Welt — etwas bedeutet.",
  step2_t:"Schreibe deine Nachricht", step2_d:"Bis zu 120 Zeichen. Was auch immer die Welt sehen soll, wenn deine Sekunde kommt.",
  step3_t:"Besitze den Moment", step3_d:"Wenn deine Sekunde schlägt, sehen es alle. Überall. Gleichzeitig. Für genau eine Sekunde.",
  forever_line:"Eine Sekunde vergeht nie wirklich. Wähle eine wiederkehrende Sekunde — derselbe Moment, jeden Tag, für immer.",
  forever_sub:"Das macht eine Sekunde wertvoller als ein Pixel: Sie kommt immer wieder.",
  pricing_title:"Besitze sie auf deine Art", pricing_sub:"Vorgeschlagene Einführungspreise. Prime-Sekunden werden versteigert.",
  tier1_tag:"Einmalig", tier1_name:"Eine Sekunde", tier1_per:"einmal · eine datierte Sekunde", tier1_d:"Perfekt für Geburtstag, Jubiläum, Abschied. Deine Nachricht erscheint einmal — und bleibt für immer.",
  tier2_tag:"Wiederkehrend", tier2_name:"Ewige Sekunde", tier2_per:"jeden Tag · derselbe Moment", tier2_d:"Deine Sekunde wiederholt sich jeden Tag. Ein Moment, der nie aufhört, deiner zu sein.",
  tier3_tag:"Auktion", tier3_name:"Prime-Sekunde", tier3_per:"seltenste Momente", tier3_d:"Mitternacht UTC. 11:11. Silvester. Die Sekunden, die alle wollen — per offener Auktion.",
  btn_forever:"Ewige Sekunde sichern", btn_prime:"Auktion ansehen",
  pay_title:"Mit Stablecoins zahlen", pay_sub:"Preise sind in US-Dollar fixiert. Zahle den exakten Betrag in USDT oder USDC — keine Volatilität, keine Überraschungen.",
  pay_note:"Self-Custody-Checkout. Du zahlst exakt den Preis — Netzwerkgebühren übernehmen wir. (TRC-20)",
  ledger_title:"Das Hauptbuch", ledger_sub:"Jede Sekunde, die einen Besitzer hat. Ewige Sekunden wiederholen sich täglich.",
  ledger_empty:"Noch keine Sekunden vergeben. Sei der Erste.",
  badge_one:"einmalig", badge_forever:"ewig", badge_prime:"prime",
  at_prefix:"um", daily_suffix:"täglich",
  upcoming_title:"Als Nächstes", upcoming_none:"Nichts geplant — sichere jetzt eine Sekunde.",
  story_quote:"\"2005 verkaufte ein Student eine Million Pixel für je einen Dollar und verdiente eine Million. Die Lektion waren nicht die Pixel. Sondern: Das Wertvollste auf der Welt ist Aufmerksamkeit — und Zeit.\"",
  story_from:"OWN A SECOND trägt diese Idee zum einzigen Gut, das nie ausgeht: der Uhr selbst.",
  demo_title:"Deine Nachricht in ihrer Sprache", demo_sub:"Kaufe eine Sekunde und wähle, wer sie sieht: alle (automatisch übersetzt) oder eine bestimmte Sprache.",
  demo_lead:"Wählst du „Alle Sprachen“, sieht ein Zuschauer deine Nachricht in seiner Sprache:",
  demo_msg:"In dieser Sekunde wähle ich dich.",
  auction_title:"Prime-Sekunden — Live-Auktion", auction_sub:"Die seltensten Momente der Uhr. Biete, um sie für immer zu besitzen.", auction_min:"Minimum", auction_current:"Aktuelles Gebot", auction_ends:"Endet", auction_bid_count:"Gebote", auction_no_live:"Gerade keine Live-Auktionen.", auction_place:"Gebot abgeben", auction_your_name:"Dein Name / Handle", auction_amount:"Gebot (USD)", auction_submit:"Bieten", auction_bid_ok:"Gebot abgegeben!", auction_closed:"Diese Auktion ist beendet.", auction_bid_low:"Gebot zu niedrig.", auction_not_found:"Auktion nicht gefunden.", auction_won:"Gewinner", pay_pending:"Zahlung erforderlich", err_auction_only:"Dieser Moment ist eine Prime-Sekunde — biete in der Auktion.", feed_title:"Live-Feed", top_title:"Beliebteste", feed_empty:"Noch keine Nachrichten — sichere die erste Sekunde.", top_empty:"Noch keine Likes — sei der Erste.", next_broadcast:"Nächste Ausstrahlung", live_label:"LIVE", like_label:"Gefällt mir", read_more:"Mehr lesen", lang_label:"Sprache", footer1:"OWN A SECOND — ein Prototyp. © 2026", footer2:"Jede Sekunde hat eine Nummer. Jede Nummer kann einen Besitzer haben."
},
es: {
  nav_how:"Cómo funciona", nav_pricing:"Precios", nav_story:"Historia", nav_claim:"Reclama un segundo",
  kicker:"Un reloj · En todas partes · Para siempre",
  title1:"Sé dueño de un segundo", title2:"del mundo.",
  sub:"Hay un reloj que avanza en todas partes a la vez. Compra un segundo en él. Cuando llegue tu segundo, tu mensaje se muestra a todos — al mismo momento, durante exactamente un segundo.",
  badge_demo:"Modo demo · pago cripto pronto",
  clock_label:"Ahora · Tiempo Universal Coordinado", unclaimed:"— libre", owned:"— ocupado",
  clock_unclaimed:"Este segundo está libre.", clock_owned_by:"Dueño",
  claim_now:"Reclámalo ya",
  cta_claim:"Reclama tu segundo", cta_how:"Ver cómo funciona",
  claim_title:"Reclama un segundo", claim_sub:"Elige tu momento, escribe tu mensaje — y será tuyo.",
  claim_type_label:"Tipo",
  claim_type_one_t:"Un Segundo", claim_type_one_d:"Un momento único y fechado",
  claim_type_forever_t:"Segundo Eterno", claim_type_forever_d:"Se repite cada día",
  claim_type_prime_t:"Segundo Prime", claim_type_prime_d:"Subasta · puja ahora",
  claim_when_one:"Momento exacto (UTC)",
  claim_when_forever:"Hora del día (UTC · diario)",
  claim_next_btn:"⚡ Reclama el siguiente segundo",
  claim_message_label:"Tu mensaje", claim_message_ph:"Lo que el mundo ve durante un segundo…",
  claim_chars:"caracteres",
  claim_name_label:"Tu nombre / usuario", claim_name_ph:"p. ej. @tú",
  claim_audience_label:"Quién lo ve en su idioma",
  claim_audience_all:"Todos — traducido automáticamente al idioma de cada uno",
  claim_audience_specific:"Un idioma concreto",
  claim_translations_toggle:"Dar mis propias traducciones (opcional)",
  claim_translations_hint:"Déjalo vacío para usar traducción automática",
  claim_price_label:"Precio",
  claim_submit:"Reclamar este segundo",
  claim_success:"¡Reclamado! Tu mensaje aparecerá cuando llegue tu segundo.",
  claim_demo_note:"Demo: aún no se cobra. El pago cripto (USDT / USDC · TRC-20) llega después.",
  err_generic:"Algo salió mal. Inténtalo de nuevo.",
  err_taken:"Ese segundo ya está ocupado.",
  err_past:"No puedes reclamar un segundo del pasado.",
  err_message:"El mensaje está vacío o es demasiado largo.",
  err_name:"El nombre está vacío o es demasiado largo.",
  err_audience:"Audiencia no válida.",
  err_time:"Hora no válida.",
  how_title:"Tres pasos. Un segundo.", how_sub:"No hace falta cuenta para entenderlo. Lo entiendes en un segundo.",
  step1_t:"Elige tu segundo", step1_d:"Un cumpleaños. Una medianoche. Las 11:11. Cualquier momento que signifique algo para ti — o para el mundo entero.",
  step2_t:"Escribe tu mensaje", step2_d:"Hasta 120 caracteres. Lo que quieras que el mundo vea cuando llegue tu segundo.",
  step3_t:"Sé dueño del momento", step3_d:"Cuando tu segundo llega, todos lo ven. En todas partes. A la vez. Durante exactamente un segundo.",
  forever_line:"Un segundo nunca pasa de verdad. Elige un segundo recurrente y será tuyo — mismo momento, cada día, para siempre.",
  forever_sub:"Esto hace que un segundo valga más que un píxel: siempre vuelve.",
  pricing_title:"Sé dueño a tu manera", pricing_sub:"Precios de lanzamiento sugeridos. Los segundos Prime se subastan.",
  tier1_tag:"Único", tier1_name:"Un Segundo", tier1_per:"una vez · un segundo con fecha", tier1_d:"Perfecto para un cumpleaños, un aniversario, una despedida. Tu mensaje aparece una vez — y queda grabado para siempre.",
  tier2_tag:"Recurrente", tier2_name:"Segundo Eterno", tier2_per:"cada día · mismo momento", tier2_d:"Tu segundo se repite cada día. Un momento que nunca deja de ser tuyo.",
  tier3_tag:"Subasta", tier3_name:"Segundo Prime", tier3_per:"momentos más raros", tier3_d:"Medianoche UTC. Las 11:11. Nochevieja. Los segundos que todos quieren — por subasta abierta.",
  btn_forever:"Posee un segundo eterno", btn_prime:"Ver la subasta",
  pay_title:"Paga con stablecoins", pay_sub:"Los precios se fijan en dólares. Paga el importe exacto en USDT o USDC — sin volatilidad, sin sorpresas.",
  pay_note:"Pago sin custodia. Pagas el precio exacto — las comisiones de red corren de nuestra cuenta. (TRC-20)",
  ledger_title:"El libro mayor", ledger_sub:"Cada segundo que tiene dueño. Los segundos eternos se repiten a diario.",
  ledger_empty:"Aún no hay segundos reclamados. Sé el primero.",
  badge_one:"único", badge_forever:"eterno", badge_prime:"prime",
  at_prefix:"a las", daily_suffix:"diario",
  upcoming_title:"Próximamente", upcoming_none:"Nada programado — reclama uno ahora.",
  story_quote:"\"En 2005, un estudiante vendió un millón de píxeles a un dólar cada uno y ganó un millón. La lección no fueron los píxeles. Fue que lo más valioso de la Tierra es la atención — y el tiempo.\"",
  story_from:"OWN A SECOND lleva esa idea al único activo que nunca se agota: el reloj mismo.",
  demo_title:"Tu mensaje en su idioma", demo_sub:"Compra un segundo y elige quién lo ve: todos (traducido automáticamente) o un idioma concreto.",
  demo_lead:"Si eliges «Todos los idiomas», cada espectador ve tu mensaje en su idioma:",
  demo_msg:"En este segundo, te elijo a ti.",
  auction_title:"Segundos Prime — subasta en vivo", auction_sub:"Los momentos más raros del reloj. Puja para poseerlos para siempre.", auction_min:"Mínimo", auction_current:"Puja actual", auction_ends:"Termina", auction_bid_count:"pujas", auction_no_live:"No hay subastas en vivo ahora.", auction_place:"Hacer una puja", auction_your_name:"Tu nombre / usuario", auction_amount:"Cantidad de la puja (USD)", auction_submit:"Pujar", auction_bid_ok:"¡Puja realizada!", auction_closed:"Esta subasta ha terminado.", auction_bid_low:"Puja demasiado baja.", auction_not_found:"Subasta no encontrada.", auction_won:"Ganador", pay_pending:"Pago requerido", err_auction_only:"Ese momento es un Segundo Prime — puja por él en la subasta.", feed_title:"Feed en vivo", top_title:"Más queridos", feed_empty:"Aún no hay mensajes — reclama el primer segundo.", top_empty:"Aún no hay likes — sé el primero.", next_broadcast:"Próxima emisión", live_label:"EN VIVO", like_label:"Me gusta", read_more:"Leer más", lang_label:"Idioma", footer1:"OWN A SECOND — un prototipo. © 2026", footer2:"Cada segundo tiene un número. Cada número puede tener un dueño."
},
fr: {
  nav_how:"Comment ça marche", nav_pricing:"Tarifs", nav_story:"Histoire", nav_claim:"Réserver une seconde",
  kicker:"Une horloge · Partout · Pour toujours",
  title1:"Possédez une seconde", title2:"du monde.",
  sub:"Il y a une horloge qui avance partout à la fois. Achetez une seconde dessus. Quand votre seconde arrive, votre message s'affiche pour tous — au même moment, pendant exactement une seconde.",
  badge_demo:"Mode démo · paiement crypto bientôt",
  clock_label:"Maintenant · Temps universel coordonné", unclaimed:"— libre", owned:"— réservée",
  clock_unclaimed:"Cette seconde est libre.", clock_owned_by:"Propriétaire",
  claim_now:"Réserver",
  cta_claim:"Réserver votre seconde", cta_how:"Voir comment ça marche",
  claim_title:"Réserver une seconde", claim_sub:"Choisissez votre moment, écrivez votre message — elle est à vous.",
  claim_type_label:"Type",
  claim_type_one_t:"Une Seconde", claim_type_one_d:"Un moment unique et daté",
  claim_type_forever_t:"Seconde Éternelle", claim_type_forever_d:"Se répète chaque jour",
  claim_type_prime_t:"Seconde Prime", claim_type_prime_d:"Enchère · enchérissez",
  claim_when_one:"Moment exact (UTC)",
  claim_when_forever:"Heure du jour (UTC · quotidienne)",
  claim_next_btn:"⚡ Réserver la prochaine seconde",
  claim_message_label:"Votre message", claim_message_ph:"Ce que le monde voit pendant une seconde…",
  claim_chars:"caractères",
  claim_name_label:"Votre nom / pseudo", claim_name_ph:"ex. @vous",
  claim_audience_label:"Qui le voit dans sa langue",
  claim_audience_all:"Tout le monde — traduit automatiquement dans chaque langue",
  claim_audience_specific:"Une langue précise",
  claim_translations_toggle:"Fournir mes propres traductions (optionnel)",
  claim_translations_hint:"Laissez vide pour la traduction automatique",
  claim_price_label:"Prix",
  claim_submit:"Réserver cette seconde",
  claim_success:"Réservé ! Votre message apparaîtra quand votre seconde arrivera.",
  claim_demo_note:"Démo : aucun paiement n'est encaissé. Le paiement crypto (USDT / USDC · TRC-20) arrive ensuite.",
  err_generic:"Une erreur est survenue. Réessayez.",
  err_taken:"Cette seconde est déjà réservée.",
  err_past:"Impossible de réserver une seconde passée.",
  err_message:"Message vide ou trop long.",
  err_name:"Nom vide ou trop long.",
  err_audience:"Audience invalide.",
  err_time:"Heure invalide.",
  how_title:"Trois étapes. Une seconde.", how_sub:"Pas besoin de compte pour comprendre. On comprend en une seconde.",
  step1_t:"Choisissez votre seconde", step1_d:"Un anniversaire. Un minuit. 11h11. N'importe quel moment qui compte pour vous — ou pour le monde entier.",
  step2_t:"Écrivez votre message", step2_d:"Jusqu'à 120 caractères. Ce que vous voulez que le monde voie quand votre seconde arrive.",
  step3_t:"Possédez l'instant", step3_d:"Quand votre seconde sonne, tout le monde la voit. Partout. En même temps. Pendant exactement une seconde.",
  forever_line:"Une seconde ne passe jamais vraiment. Choisissez une seconde récurrente et elle est à vous — même moment, chaque jour, pour toujours.",
  forever_sub:"C'est ce qui rend une seconde plus précieuse qu'un pixel : elle revient toujours.",
  pricing_title:"Possédez-la à votre façon", pricing_sub:"Tarifs de lancement suggérés. Les secondes Prime sont vendues aux enchères.",
  tier1_tag:"Unique", tier1_name:"Une Seconde", tier1_per:"une fois · une seconde datée", tier1_d:"Parfait pour un anniversaire, un souvenir, un adieu. Votre message apparaît une fois — et reste gravé pour toujours.",
  tier2_tag:"Récurrente", tier2_name:"Seconde Éternelle", tier2_per:"chaque jour · même moment", tier2_d:"Votre seconde se répète chaque jour. Un moment qui ne cesse jamais d'être à vous.",
  tier3_tag:"Enchère", tier3_name:"Seconde Prime", tier3_per:"moments les plus rares", tier3_d:"Minuit UTC. 11h11. Le Nouvel An. Les secondes que tout le monde veut — aux enchères.",
  btn_forever:"Posséder une seconde éternelle", btn_prime:"Voir l'enchère",
  pay_title:"Payez en stablecoins", pay_sub:"Les prix sont fixés en dollars. Payez le montant exact en USDT ou USDC — aucune volatilité, aucune surprise.",
  pay_note:"Paiement sans dépôt. Vous payez le prix exact — les frais de réseau sont pour nous. (TRC-20)",
  ledger_title:"Le registre", ledger_sub:"Chaque seconde qui a un propriétaire. Les secondes éternelles se répètent chaque jour.",
  ledger_empty:"Aucune seconde réservée pour l'instant. Soyez le premier.",
  badge_one:"unique", badge_forever:"éternelle", badge_prime:"prime",
  at_prefix:"à", daily_suffix:"quotidien",
  upcoming_title:"À venir", upcoming_none:"Rien de prévu — réservez-en une maintenant.",
  story_quote:"\"En 2005, un étudiant a vendu un million de pixels à un dollar pièce et gagné un million. La leçon n'était pas les pixels. C'était que la chose la plus précieuse sur Terre est l'attention — et le temps.\"",
  story_from:"OWN A SECOND porte cette idée vers le seul actif qui ne s'épuise jamais : l'horloge elle-même.",
  demo_title:"Votre message dans leur langue", demo_sub:"Achetez une seconde et choisissez qui la voit : tout le monde (traduit automatiquement) ou une langue précise.",
  demo_lead:"Si vous choisissez « Toutes les langues », chaque spectateur voit votre message dans sa langue :",
  demo_msg:"Cette seconde, je te choisis.",
  auction_title:"Secondes Prime — enchère en direct", auction_sub:"Les moments les plus rares de l'horloge. Enchérissez pour les posséder pour toujours.", auction_min:"Minimum", auction_current:"Enchère actuelle", auction_ends:"Fin", auction_bid_count:"enchères", auction_no_live:"Aucune enchère en direct pour le moment.", auction_place:"Enchérir", auction_your_name:"Votre nom / pseudo", auction_amount:"Montant de l'enchère (USD)", auction_submit:"Enchérir", auction_bid_ok:"Enchère placée !", auction_closed:"Cette enchère est terminée.", auction_bid_low:"Enchère trop basse.", auction_not_found:"Enchère introuvable.", auction_won:"Gagnant", pay_pending:"Paiement requis", err_auction_only:"Ce moment est une Seconde Prime — enchérissez dans la vente.", feed_title:"Fil en direct", top_title:"Les plus aimés", feed_empty:"Aucun message — réservez la première seconde.", top_empty:"Aucun like — soyez le premier.", next_broadcast:"Prochaine diffusion", live_label:"EN DIRECT", like_label:"J'aime", read_more:"Lire la suite", lang_label:"Langue", footer1:"OWN A SECOND — un prototype. © 2026", footer2:"Chaque seconde a un numéro. Chaque numéro peut avoir un propriétaire."
},
ar: {
  nav_how:"كيف يعمل", nav_pricing:"الأسعار", nav_story:"القصة", nav_claim:"احجز ثانية",
  kicker:"ساعة واحدة · في كل مكان · للأبد",
  title1:"امتلك ثانية واحدة", title2:"من العالم.",
  sub:"هناك ساعة واحدة تدقّ في كل مكان في الوقت نفسه. اشترِ ثانيةً عليها. عندما تحين ثانيتك، تظهر رسالتك للجميع — في اللحظة نفسها، لثانية واحدة بالضبط.",
  badge_demo:"وضع تجريبي · الدفع الرقمي قريبًا",
  clock_label:"الآن · التوقيت العالمي المنسق", unclaimed:"— متاحة", owned:"— محجوزة",
  clock_unclaimed:"هذه الثانية متاحة.", clock_owned_by:"المالك",
  claim_now:"احجزها الآن",
  cta_claim:"احجز ثانيتك", cta_how:"انظر كيف يعمل",
  claim_title:"احجز ثانية", claim_sub:"اختر لحظتك، اكتب رسالتك — وستكون لك.",
  claim_type_label:"النوع",
  claim_type_one_t:"ثانية واحدة", claim_type_one_d:"لحظة واحدة مؤرخة",
  claim_type_forever_t:"الثانية الأبدية", claim_type_forever_d:"تتكرر كل يوم",
  claim_type_prime_t:"الثانية المميزة", claim_type_prime_d:"مزاد · قدّم عرضًا الآن",
  claim_when_one:"لحظة محددة (UTC)",
  claim_when_forever:"وقت اليوم (UTC · يوميًا)",
  claim_next_btn:"⚡ احجز الثانية التالية",
  claim_message_label:"رسالتك", claim_message_ph:"ما يراه العالم لثانية واحدة…",
  claim_chars:"حرفًا",
  claim_name_label:"اسمك / معرفك", claim_name_ph:"مثال @أنت",
  claim_audience_label:"من يراها بلغته",
  claim_audience_all:"الجميع — تُترجم تلقائيًا إلى لغة كل مشاهد",
  claim_audience_specific:"لغة محددة",
  claim_translations_toggle:"أقدّم ترجماتي الخاصة (اختياري)",
  claim_translations_hint:"اتركه فارغًا لاستخدام الترجمة التلقائية",
  claim_price_label:"السعر",
  claim_submit:"احجز هذه الثانية",
  claim_success:"تم الحجز! ستظهر رسالتك عندما تحين ثانيتك.",
  claim_demo_note:"تجريبي: لا يتم خصم أي مبلغ بعد. الدفع الرقمي (USDT / USDC · TRC-20) قادم.",
  err_generic:"حدث خطأ ما. حاول مجددًا.",
  err_taken:"هذه الثانية محجوزة بالفعل.",
  err_past:"لا يمكنك حجز ثانية في الماضي.",
  err_message:"الرسالة فارغة أو طويلة جدًا.",
  err_name:"الاسم فارغ أو طويل جدًا.",
  err_audience:"جمهور غير صالح.",
  err_time:"وقت غير صالح.",
  how_title:"ثلاث خطوات. ثانية واحدة.", how_sub:"لا حاجة لحساب لفهمها. تفهمها في ثانية.",
  step1_t:"اختر ثانيتك", step1_d:"عيد ميلاد. منتصف ليل. 11:11. أي لحظة تعني لك — أو للعالم كله — شيئًا.",
  step2_t:"اكتب رسالتك", step2_d:"حتى 120 حرفًا. كل ما تريد أن يراه العالم حين تحين ثانيتك.",
  step3_t:"امتلك اللحظة", step3_d:"حين تدقّ ثانيتك، يراها الجميع. في كل مكان. في آنٍ واحد. لثانية واحدة بالضبط.",
  forever_line:"الثانية لا تمضي حقًا. اختر ثانية متكررة وستكون لك — اللحظة نفسها، كل يوم، للأبد.",
  forever_sub:"هذا ما يجعل الثانية أثمن من بكسل: فهي تعود دائمًا.",
  pricing_title:"امتلكها على طريقتك", pricing_sub:"أسعار الإطلاق المقترحة. تُباع الثواني المميزة بالمزاد.",
  tier1_tag:"مرة واحدة", tier1_name:"ثانية واحدة", tier1_per:"مرة · ثانية واحدة مؤرخة", tier1_d:"مثالية لعيد ميلاد أو ذكرى أو وداع. تظهر رسالتك مرة واحدة — وتُسجَّل للأبد.",
  tier2_tag:"متكررة", tier2_name:"الثانية الأبدية", tier2_per:"كل يوم · اللحظة نفسها", tier2_d:"تتكرر ثانيتك كل يوم. لحظة لا تتوقف عن كونها لك.",
  tier3_tag:"مزاد", tier3_name:"الثانية المميزة", tier3_per:"أندر اللحظات", tier3_d:"منتصف الليل بالتوقيت العالمي. 11:11. ليلة رأس السنة. الثواني التي يريدها الجميع — بمزاد مفتوح.",
  btn_forever:"امتلك ثانية أبدية", btn_prime:"شاهد المزاد",
  pay_title:"ادفع بالعملات المستقرة", pay_sub:"الأسعار مثبتة بالدولار الأمريكي. ادفع المبلغ بالضبط بـ USDT أو USDC — بلا تقلبات، بلا مفاجآت.",
  pay_note:"دفع بدون حفظ طرف ثالث. تدفع السعر بالضبط — رسوم الشبكة علينا. (TRC-20)",
  ledger_title:"السجل", ledger_sub:"كل ثانية لها مالك. الثواني الأبدية تتكرر يوميًا.",
  ledger_empty:"لا توجد ثوانٍ محجوزة بعد. كن الأول.",
  badge_one:"مرة واحدة", badge_forever:"أبدية", badge_prime:"مميزة",
  at_prefix:"عند", daily_suffix:"يوميًا",
  upcoming_title:"قريبًا", upcoming_none:"لا شيء مجدول — احجز واحدة الآن.",
  story_quote:"\"في 2005، باع طالب مليون بكسل مقابل دولار لكل بكسل وربح مليونًا. الدرس لم يكن البكسلات. بل أن أثمن شيء على الأرض هو الانتباه — والوقت.\"",
  story_from:"OWN A SECOND تنقل هذه الفكرة إلى الأصل الوحيد الذي لا ينفد أبدًا: الساعة نفسها.",
  demo_title:"رسالتك بلغتهم", demo_sub:"اشترِ ثانية واختر من يراها: الجميع (تُترجم تلقائيًا) أو لغة محددة.",
  demo_lead:"إن اخترت «كل اللغات»، يرى المشاهد رسالتك بلغته:",
  demo_msg:"في هذه الثانية، أختارك أنت.",
  auction_title:"الثواني المميزة — مزاد مباشر", auction_sub:"أندر لحظات الساعة. قدّم عرضًا لتمتلكها للأبد.", auction_min:"الحد الأدنى", auction_current:"العرض الحالي", auction_ends:"ينتهي", auction_bid_count:"عروض", auction_no_live:"لا مزادات مباشرة الآن.", auction_place:"قدّم عرضًا", auction_your_name:"اسمك / معرفك", auction_amount:"قيمة العرض (USD)", auction_submit:"تقديم العرض", auction_bid_ok:"تم تقديم العرض!", auction_closed:"انتهى هذا المزاد.", auction_bid_low:"العرض منخفض جدًا.", auction_not_found:"المزاد غير موجود.", auction_won:"الفائز", pay_pending:"الدفع مطلوب", err_auction_only:"تلك اللحظة ثانية مميزة — قدّم عرضًا في المزاد.", feed_title:"البث المباشر", top_title:"الأكثر إعجابًا", feed_empty:"لا رسائل بعد — احجز الثانية الأولى.", top_empty:"لا إعجابات بعد — كن الأول.", next_broadcast:"البث التالي", live_label:"مباشر", like_label:"أعجبني", read_more:"اقرأ المزيد", lang_label:"اللغة", footer1:"OWN A SECOND — نموذج أولي. © 2026", footer2:"لكل ثانية رقم. ولكل رقم أن يكون له مالك."
},
ja: {
  nav_how:"仕組み", nav_pricing:"料金", nav_story:"ストーリー", nav_claim:"秒を取得",
  kicker:"一つの時計 · どこでも · 永遠に",
  title1:"世界の一秒を", title2:"自分のものに。",
  sub:"どこでも同時に刻む一つの時計があります。その上で一秒を買いましょう。あなたの秒が来ると、メッセージが全員に表示されます — 同じ瞬間に、ちょうど一秒間。",
  badge_demo:"デモモード · 暗号通貨決済は近日公開",
  clock_label:"現在 · 協定世界時", unclaimed:"— 未取得", owned:"— 取得済み",
  clock_unclaimed:"この秒は未取得です。", clock_owned_by:"所有者",
  claim_now:"今すぐ取得",
  cta_claim:"秒を取得する", cta_how:"仕組みを見る",
  claim_title:"秒を取得する", claim_sub:"瞬間を選び、メッセージを書けば — それはあなたのもの。",
  claim_type_label:"種類",
  claim_type_one_t:"ワン・セカンド", claim_type_one_d:"日付付きの単一の瞬間",
  claim_type_forever_t:"フォーエバー・セカンド", claim_type_forever_d:"毎日繰り返す",
  claim_type_prime_t:"プライム・セカンド", claim_type_prime_d:"オークション · 今すぐ入札",
  claim_when_one:"正確な瞬間 (UTC)",
  claim_when_forever:"時刻 (UTC · 毎日)",
  claim_next_btn:"⚡ 次の秒を取得",
  claim_message_label:"あなたのメッセージ", claim_message_ph:"世界が一秒間見るもの…",
  claim_chars:"文字",
  claim_name_label:"名前 / ハンドル", claim_name_ph:"例 @you",
  claim_audience_label:"誰が自分の言語で見るか",
  claim_audience_all:"全員 — 各視聴者の言語に自動翻訳",
  claim_audience_specific:"特定の言語",
  claim_translations_toggle:"自分で翻訳を提供する（任意）",
  claim_translations_hint:"空のままなら自動翻訳を使用",
  claim_price_label:"価格",
  claim_submit:"この秒を取得",
  claim_success:"取得しました！ あなたの秒が来るとメッセージが表示されます。",
  claim_demo_note:"デモ：まだ支払いは発生しません。暗号通貨決済（USDT / USDC · TRC-20）は次の段階です。",
  err_generic:"問題が発生しました。もう一度お試しください。",
  err_taken:"その秒はすでに取得済みです。",
  err_past:"過去の秒は取得できません。",
  err_message:"メッセージが空か長すぎます。",
  err_name:"名前が空か長すぎます。",
  err_audience:"無効な対象です。",
  err_time:"無効な時刻です。",
  how_title:"3ステップ。1秒。", how_sub:"理解にアカウントは不要。一秒でわかります。",
  step1_t:"秒を選ぶ", step1_d:"誕生日。真夜中。11:11。あなたに — あるいは全世界に — 意味のある瞬間なら何でも。",
  step2_t:"メッセージを書く", step2_d:"最大120文字。あなたの秒が来たときに世界に見せたいことなら何でも。",
  step3_t:"瞬間を手に入れる", step3_d:"あなたの秒が来ると、みんな見る。どこでも。同時に。ちょうど一秒間。",
  forever_line:"一秒は本当には過ぎません。繰り返す秒を選べば、それはあなたのもの — 同じ瞬間、毎日、永遠に。",
  forever_sub:"これが秒をピクセルより価値あるものにする理由です。必ず戻ってくるから。",
  pricing_title:"あなた流に所有する", pricing_sub:"ローンチ価格の提案。プライム秒はオークションで。",
  tier1_tag:"一回", tier1_name:"ワン・セカンド", tier1_per:"一回 · 日付付きの一秒", tier1_d:"誕生日、記念日、別れに最適。メッセージは一度だけ表示 — そして永遠に記録されます。",
  tier2_tag:"繰り返し", tier2_name:"フォーエバー・セカンド", tier2_per:"毎日 · 同じ瞬間", tier2_d:"あなたの秒は毎日繰り返します。あなたのものであり続ける瞬間。",
  tier3_tag:"オークション", tier3_name:"プライム・セカンド", tier3_per:"最も希少な瞬間", tier3_d:"UTCの真夜中。11:11。大晦日。みんなが欲しがる秒 — 公開オークションで決定。",
  btn_forever:"フォーエバー秒を所有", btn_prime:"オークションを見る",
  pay_title:"ステーブルコインで支払う", pay_sub:"価格は米ドルで固定。USDTまたはUSDCで正確な金額を支払います — 変動なし、驚きなし。",
  pay_note:"自己保管型チェックアウト。正確な価格をお支払い — ネットワーク手数料は当方負担。(TRC-20)",
  ledger_title:"台帳", ledger_sub:"所有者のいるすべての秒。フォーエバー秒は毎日繰り返します。",
  ledger_empty:"まだ取得された秒はありません。最初になりましょう。",
  badge_one:"一回", badge_forever:"フォーエバー", badge_prime:"プライム",
  at_prefix:"に", daily_suffix:"毎日",
  upcoming_title:"次に来る秒", upcoming_none:"予定はありません — 今すぐ取得しましょう。",
  story_quote:"\"2005年、ある学生が100万ピクセルを1ドルずつ売って100万ドルを稼ぎました。教訓はピクセルではありません。地球上で最も価値あるものは「注目」と「時間」だということです。\"",
  story_from:"OWN A SECONDは、そのアイデアを決して尽きない唯一の資産へ運びます。時計そのものへ。",
  demo_title:"彼らの言語であなたのメッセージを", demo_sub:"秒を買って、誰が見るか選ぶ：全員（自動翻訳）または特定の言語。",
  demo_lead:"「すべての言語」を選ぶと、視聴者は自分の言語でメッセージを見ます：",
  demo_msg:"この一秒、私はあなたを選ぶ。",
  auction_title:"プライム・セカンド — ライブオークション", auction_sub:"時計の最も希少な瞬間。永遠に所有するために入札しましょう。", auction_min:"最低額", auction_current:"現在の入札", auction_ends:"終了", auction_bid_count:"入札", auction_no_live:"現在ライブオークションはありません。", auction_place:"入札する", auction_your_name:"名前 / ハンドル", auction_amount:"入札額 (USD)", auction_submit:"入札", auction_bid_ok:"入札しました！", auction_closed:"このオークションは終了しました。", auction_bid_low:"入札額が低すぎます。", auction_not_found:"オークションが見つかりません。", auction_won:"落札者", pay_pending:"支払いが必要です", err_auction_only:"その瞬間はプライム・セカンドです — オークションで入札してください。", feed_title:"ライブフィード", top_title:"最も愛された", feed_empty:"まだメッセージはありません — 最初の秒を取得しましょう。", top_empty:"まだいいねはありません — 最初になりましょう。", next_broadcast:"次の放送", live_label:"ライブ", like_label:"いいね", read_more:"続きを読む", lang_label:"言語", footer1:"OWN A SECOND — プロトタイプ。© 2026", footer2:"すべての秒には番号があります。すべての番号には持ち主がいられます。"
}
};

var NATIVE_NAMES = { en:"English", tr:"Türkçe", de:"Deutsch", es:"Español", fr:"Français", ar:"العربية", ja:"日本語" };
var RTL = { ar:true };
var SUPPORTED = Object.keys(NATIVE_NAMES);

// Fallback phrase dictionary for "all languages" auto-translation (MVP).
// Real MT provider plugs in later (FAZ 3).
var PHRASES = {
  "This second, I choose you.": {
    en:"This second, I choose you.", tr:"Bu saniyede, seni seçiyorum.", de:"In dieser Sekunde wähle ich dich.",
    es:"En este segundo, te elijo a ti.", fr:"Cette seconde, je te choisis.",
    ar:"في هذه الثانية، أختارك أنت.", ja:"この一秒、私はあなたを選ぶ。" },
  "A new day begins.": {
    en:"A new day begins.", tr:"Yeni bir gün başlıyor.", de:"Ein neuer Tag beginnt.",
    es:"Comienza un nuevo día.", fr:"Un nouveau jour commence.",
    ar:"يبدأ يوم جديد.", ja:"新しい一日が始まる。" },
  "Make a wish.": {
    en:"Make a wish.", tr:"Bir dilek tut.", de:"Wünsch dir was.",
    es:"Pide un deseo.", fr:"Fais un vœu.",
    ar:"تمنَّ أمنية.", ja:"願い事をして。" }
};

// ---------- state ----------
var CONFIG = null;
var lang = 'en';
var ERR = {
  INVALID_JSON:'err_generic', INVALID_TYPE:'err_generic', INVALID_NAME:'err_name',
  INVALID_MESSAGE:'err_message', INVALID_AUDIENCE:'err_audience', INVALID_SECOND:'err_past',
  INVALID_TIME:'err_time', CONFLICT:'err_taken', NOT_FOUND:'err_generic', METHOD:'err_generic',
  AUCTION_CLOSED:'auction_closed', AUCTION_NOT_FOUND:'auction_not_found',
  BID_TOO_LOW:'auction_bid_low', INVALID_BID:'auction_bid_low', AUCTION_ONLY:'err_auction_only'
};

// ---------- helpers ----------
function $(id){ return document.getElementById(id); }
function pad(n){ return (n < 10 ? '0' : '') + n; }
function t(key){ return (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : (I18N.en[key] || key); }
function detectLang(){
  var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
  for (var i=0;i<list.length;i++){
    var code = list[i].split('-')[0].toLowerCase();
    if (SUPPORTED.indexOf(code) !== -1) return code;
  }
  return 'en';
}
function fmtUnix(unix){
  var d = new Date(unix * 1000);
  return d.toISOString().slice(0,16).replace('T',' ') + ' UTC';
}
function fmtTimeOfDay(tod){
  return tod.slice(0,5) + ' UTC';
}

// ---------- translation ----------
function translateMsg(claim){
  if (!claim) return null;
  if (claim.audience !== 'all') return { text: claim.message, lang: claim.audience };
  if (claim.translations && claim.translations[lang]) return { text: claim.translations[lang], lang: lang };
  if (PHRASES[claim.message] && PHRASES[claim.message][lang]) return { text: PHRASES[claim.message][lang], lang: lang };
  return { text: claim.message, lang: 'en' };
}

// ---------- apply language ----------
function applyLang(l){
  if (!I18N[l]) l = 'en';
  lang = l;
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL[lang] ? 'rtl' : 'ltr';
  var els = document.querySelectorAll('[data-i18n]');
  for (var i=0;i<els.length;i++){
    var key = els[i].getAttribute('data-i18n');
    if (I18N[lang][key] !== undefined) els[i].textContent = I18N[lang][key];
  }
  var sel = $('langSelect');
  if (sel) sel.value = lang;
  buildDemoGrid();
  renderAll();
}

// Re-render all dynamic (language-dependent) content. Called on language change.
function renderAll(){
  if (lastUnix > 0) renderClock(lastUnix, lastState.current);
  renderUpcoming();
  if (lastClaims) { renderLedger(lastClaims); renderFeed(); }
  renderTop();
  renderCountdown();
  renderAuctions();
}

// ---------- demo grid ----------
function buildDemoGrid(){
  var grid = $('demoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  SUPPORTED.forEach(function(code){
    var row = document.createElement('div');
    row.className = 'demo-row';
    var l = document.createElement('span');
    l.className = 'demo-lang';
    l.textContent = NATIVE_NAMES[code];
    var m = document.createElement('span');
    m.className = 'demo-msg';
    m.textContent = '“' + I18N[code].demo_msg + '”';
    row.appendChild(l); row.appendChild(m);
    grid.appendChild(row);
  });
}

// ---------- clock / SSE ----------
var clockEl, unixEl, statusEl, whoEl, msgEl, langFlagEl;
var lastState = { current: null, upcoming: [] };
var lastUnix = 0;
var lastClaims = null;

function renderClock(unix, current){
  lastUnix = unix;
  lastState.current = current;
  var d = new Date(unix * 1000);
  var h = pad(d.getUTCHours()), m = pad(d.getUTCMinutes()), s = pad(d.getUTCSeconds());
  clockEl.innerHTML = h + ':' + m + ':<span class="sec">' + s + '</span>';
  unixEl.textContent = Number(unix).toLocaleString('en-US');

  if (current){
    statusEl.textContent = t('owned');
    statusEl.style.color = '#e8b34b';
    whoEl.textContent = current.name;
    var tr = translateMsg(current);
    msgEl.textContent = '“' + tr.text + '”';
    msgEl.style.display = 'block';
    langFlagEl.textContent = tr.lang.toUpperCase();
    langFlagEl.style.display = 'inline-block';
  } else {
    statusEl.textContent = t('unclaimed');
    statusEl.style.color = '#9a9ab0';
    whoEl.textContent = t('clock_unclaimed');
    msgEl.textContent = '';
    msgEl.style.display = 'none';
    langFlagEl.style.display = 'none';
  }
}

function connectSSE(){
  var es = new EventSource('/api/events');
  es.onmessage = function(ev){
    var msg;
    try { msg = JSON.parse(ev.data); } catch(e){ return; }
    if (msg.type === 'tick'){
      renderClock(msg.unix, msg.current);
      if (msg.current && msg.current.id !== lastShownClaimId){
        renderMoment(msg.current);
        lastShownClaimId = msg.current.id;
      } else if (!msg.current){
        lastShownClaimId = null;
      }
      renderCountdown();
    }
    else if (msg.type === 'claim' || msg.type === 'like') refreshData();
  };
  es.onerror = function(){ /* EventSource auto-reconnects */ };
}

// ---------- data ----------
function refreshData(){
  fetch('/api/state').then(function(r){ return r.json(); }).then(function(s){
    lastState.current = s.current;
    lastState.upcoming = s.upcoming || [];
    upcoming = s.upcoming || [];
    renderUpcoming();
    renderCountdown();
  }).catch(function(){});
  fetch('/api/ledger').then(function(r){ return r.json(); }).then(function(d){
    renderLedger(d.claims || []);
    renderFeed();
  }).catch(function(){});
  fetch('/api/top').then(function(r){ return r.json(); }).then(function(d){
    topClaims = d.claims || [];
    renderTop();
  }).catch(function(){});
  refreshAuctions();
}

function renderUpcoming(){
  var el = $('upcomingList');
  if (!el) return;
  if (!lastState.upcoming.length){
    el.textContent = t('upcoming_none');
    return;
  }
  var parts = lastState.upcoming.slice(0, 5).map(function(u){
    var tr = translateMsg(u);
    var when = u.daily ? (t('daily_suffix') + ' · ' + fmtTimeOfDay(u.timeOfDay || '')) : (t('at_prefix') + ' ' + fmtUnix(u.at));
    return u.name + ' → “' + tr.text + '” · ' + when;
  });
  el.innerHTML = '<b>' + t('upcoming_title') + ':</b> ' + parts.join(' &nbsp;·&nbsp; ');
}

function renderLedger(claims){
  var el = $('ledgerList');
  if (!el) return;
  lastClaims = claims;
  el.innerHTML = '';
  if (!claims.length){
    var empty = document.createElement('div');
    empty.className = 'ledger-empty';
    empty.textContent = t('ledger_empty');
    el.appendChild(empty);
    return;
  }
  claims.slice(0, 40).forEach(function(c){
    var item = document.createElement('div');
    item.className = 'ledger-item';

    var badge = document.createElement('span');
    badge.className = 'ledger-badge';
    badge.textContent = c.type === 'one' ? t('badge_one') : (c.type === 'prime' ? t('badge_prime') : t('badge_forever'));

    var body = document.createElement('div');
    body.className = 'ledger-body';

    var who = document.createElement('div');
    who.className = 'ledger-who';
    who.textContent = c.name;

    var tr = translateMsg(c);
    var msg = document.createElement('div');
    msg.className = 'ledger-msg';
    msg.textContent = '“' + tr.text + '”';

    var when = document.createElement('div');
    when.className = 'ledger-when';
    when.textContent = c.daily ? (t('daily_suffix') + ' · ' + fmtTimeOfDay(c.timeOfDay || '')) : (t('at_prefix') + ' ' + fmtUnix(c.at));

    body.appendChild(who); body.appendChild(msg); body.appendChild(when);
    item.appendChild(badge); item.appendChild(body);
    el.appendChild(item);
  });
}

// ---------- claim form ----------
var currentType = 'one';

function setType(type){
  if (type === 'prime'){
    var au = document.getElementById('auction');
    if (au) au.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  currentType = type;
  var buttons = document.querySelectorAll('#typeToggle button');
  for (var i=0;i<buttons.length;i++){
    buttons[i].classList.toggle('active', buttons[i].getAttribute('data-type') === type);
  }
  $('whenOne').style.display = type === 'one' ? 'block' : 'none';
  $('whenForever').style.display = type === 'forever' ? 'block' : 'none';
  updatePrice();
}

function updatePrice(){
  var el = $('priceLine');
  if (!el || !CONFIG) return;
  var p = currentType === 'forever' ? CONFIG.pricesUsd.forever : CONFIG.pricesUsd.one;
  el.textContent = t('claim_price_label') + ': $' + p + ' ' + (CONFIG.paymentEnabled ? '· USDT/USDC' : '· ' + t('badge_demo'));
}

function buildTranslations(){
  var box = $('translationsBox');
  if (!box) return;
  box.innerHTML = '';
  SUPPORTED.forEach(function(code){
    var row = document.createElement('div');
    row.className = 'tr-row';
    var lab = document.createElement('span');
    lab.textContent = NATIVE_NAMES[code];
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.setAttribute('data-tr', code);
    inp.placeholder = code === 'en' ? t('claim_message_ph') : '';
    row.appendChild(lab); row.appendChild(inp);
    box.appendChild(row);
  });
}

function collectTranslations(){
  var box = $('translationsBox');
  if (!box) return null;
  var out = {};
  var inputs = box.querySelectorAll('input[data-tr]');
  for (var i=0;i<inputs.length;i++){
    var v = inputs[i].value.trim();
    if (v) out[inputs[i].getAttribute('data-tr')] = v;
  }
  return Object.keys(out).length ? out : null;
}

function doClaim(payload){
  var errEl = $('claimError'), okEl = $('claimOk');
  errEl.textContent = ''; okEl.textContent = '';
  fetch('/api/claim', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(function(r){ return r.json(); }).then(function(res){
    if (res.ok){
      if (res.pending && res.invoice){
        okEl.textContent = t('pay_pending') + ' — ' + res.invoice.amountUsd + ' USDT/USDC';
      } else {
        okEl.textContent = t('claim_success');
      }
      refreshData();
    } else {
      errEl.textContent = t(ERR[res.code] || 'err_generic');
    }
  }).catch(function(){
    errEl.textContent = t('err_generic');
  });
}

function submitClaim(){
  var errEl = $('claimError'), okEl = $('claimOk');
  errEl.textContent = ''; okEl.textContent = '';
  var name = $('claimName').value.trim();
  var message = $('claimMessage').value.trim();
  var audience = $('claimAudience').value;

  var payload = {
    type: currentType,
    name: name,
    message: message,
    audience: audience,
    translations: collectTranslations()
  };

  if (currentType === 'one'){
    var v = $('claimWhenOne').value;
    if (!v){ errEl.textContent = t('err_time'); return; }
    payload.secondUnix = Math.floor(new Date(v).getTime() / 1000);
  } else {
    var tm = $('claimWhenForever').value;
    if (!tm){ errEl.textContent = t('err_time'); return; }
    payload.timeOfDay = tm + ':00';
  }
  doClaim(payload);
}

function claimNextSecond(){
  var errEl = $('claimError'), okEl = $('claimOk');
  errEl.textContent = ''; okEl.textContent = '';
  var name = $('claimName').value.trim();
  var message = $('claimMessage').value.trim();
  var audience = $('claimAudience').value;
  var unix = Math.floor(Date.now() / 1000) + 5;

  function attempt(){
    doClaim({ type:'one', name:name || '@anon', message: message || t('demo_msg'),
      audience: audience || 'all', translations: collectTranslations(), secondUnix: unix });
  }
  attempt();
}



// ---------- auctions ----------
var AUCTIONS = [];
function renderAuctions(){
  var el = $('auctionList');
  if (!el) return;
  el.innerHTML = '';
  if (!AUCTIONS.length){
    var empty = document.createElement('div');
    empty.className = 'ledger-empty';
    empty.textContent = t('auction_no_live');
    el.appendChild(empty);
    return;
  }
  AUCTIONS.forEach(function(a){
    var card = document.createElement('div');
    card.className = 'auction-card';
    card.setAttribute('data-slot', a.slot);

    var head = document.createElement('div');
    head.className = 'auction-head';
    var slotEl = document.createElement('span');
    slotEl.className = 'auction-slot';
    slotEl.textContent = a.slot.slice(0, 5) + ' UTC';
    var statusEl = document.createElement('span');
    statusEl.className = 'auction-status' + (a.status === 'open' ? '' : ' closed');
    statusEl.textContent = a.status === 'open' ? (t('auction_ends') + ' ' + fmtUnix(a.endAt)) : t('auction_closed');
    head.appendChild(slotEl); head.appendChild(statusEl);
    card.appendChild(head);

    var stats = document.createElement('div');
    stats.className = 'auction-stats';
    var r1 = document.createElement('div');
    r1.innerHTML = '<span>' + t('auction_min') + '</span> $' + a.minBidUsd;
    var r2 = document.createElement('div');
    r2.innerHTML = '<span>' + t('auction_current') + '</span> ' + (a.highestBidUsd !== null ? '$' + a.highestBidUsd + ' · ' + a.highestBidder : '—');
    var r3 = document.createElement('div');
    r3.innerHTML = a.bidCount + ' ' + t('auction_bid_count');
    stats.appendChild(r1); stats.appendChild(r2); stats.appendChild(r3);
    card.appendChild(stats);

    if (a.status === 'open'){
      var form = document.createElement('div');
      form.className = 'auction-bid';
      var nameInp = document.createElement('input');
      nameInp.type = 'text'; nameInp.placeholder = t('auction_your_name'); nameInp.className = 'bid-name';
      var amtInp = document.createElement('input');
      amtInp.type = 'number'; amtInp.min = a.minBidUsd; amtInp.placeholder = t('auction_amount'); amtInp.className = 'bid-amount';
      var btn = document.createElement('button');
      btn.className = 'btn btn-primary'; btn.textContent = t('auction_submit');
      var msg = document.createElement('div');
      msg.className = 'bid-msg';
      btn.addEventListener('click', function(){ placeBid(a.slot, nameInp, amtInp, msg); });
      form.appendChild(nameInp); form.appendChild(amtInp); form.appendChild(btn);
      card.appendChild(form); card.appendChild(msg);
    } else if (a.winner){
      var w = document.createElement('div');
      w.className = 'auction-won';
      w.textContent = t('auction_won') + ': ' + a.winner.name + ' ($' + a.winner.amountUsd + ')';
      card.appendChild(w);
    }
    el.appendChild(card);
  });
}
function placeBid(slot, nameInp, amtInp, msgEl){
  var name = nameInp.value.trim();
  var amount = amtInp.value;
  if (!name || !amount){ msgEl.textContent = t('err_name'); msgEl.className = 'bid-msg err'; return; }
  msgEl.textContent = ''; msgEl.className = 'bid-msg';
  fetch('/api/auction/bid', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slot: slot, name: name, amountUsd: Number(amount) }) })
  .then(function(r){ return r.json(); })
  .then(function(res){
    if (res.ok){ msgEl.textContent = t('auction_bid_ok'); msgEl.className = 'bid-msg ok'; refreshAuctions(); }
    else { msgEl.textContent = t(ERR[res.code] || 'err_generic'); msgEl.className = 'bid-msg err'; }
  }).catch(function(){ msgEl.textContent = t('err_generic'); msgEl.className = 'bid-msg err'; });
}
function refreshAuctions(){
  fetch('/api/auctions').then(function(r){ return r.json(); }).then(function(d){
    AUCTIONS = d.auctions || [];
    renderAuctions();
  }).catch(function(){});
}


// ---------- wall: feed + top + like + countdown + moment ----------
var lastShownClaimId = null;
var topClaims = [];
var upcoming = [];
var momentTimer = null;

function truncate(text, max){ return text.length > max ? text.slice(0, max) + '…' : text; }

function buildFeedItem(c){
  var tr = translateMsg(c);
  var div = document.createElement('div');
  div.className = 'feed-item';

  var meta = document.createElement('div');
  meta.className = 'feed-meta';
  var who = document.createElement('span');
  who.className = 'feed-who';
  who.textContent = c.name;
  var when = document.createElement('span');
  when.className = 'feed-time';
  when.textContent = c.daily ? (t('daily_suffix') + ' · ' + fmtTimeOfDay(c.timeOfDay || '')) : fmtUnix(c.at);
  meta.appendChild(who); meta.appendChild(when);
  div.appendChild(meta);

  var msgEl = document.createElement('div');
  msgEl.className = 'feed-msg';
  msgEl.textContent = tr.text;  // CSS clamps to 2 lines => ellipsis
  div.appendChild(msgEl);

  var more = document.createElement('div');
  more.className = 'feed-more';
  more.textContent = t('read_more') + ' →';
  div.appendChild(more);

  var likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  likeBtn.innerHTML = '❤ <span>' + (c.likes || 0) + '</span>';
  likeBtn.title = t('like_label');
  likeBtn.addEventListener('click', function(ev){ ev.stopPropagation(); doLike(c.id, likeBtn); });
  div.appendChild(likeBtn);

  div.addEventListener('click', function(){ openModal(c); });
  return div;
}

function openModal(c){
  var tr = translateMsg(c);
  $('modalBadge').textContent = c.type === 'one' ? t('badge_one') : (c.type === 'prime' ? t('badge_prime') : t('badge_forever'));
  $('modalWho').textContent = c.name;
  $('modalMsg').textContent = '“' + tr.text + '”';
  $('modalWhen').textContent = c.daily ? (t('daily_suffix') + ' · ' + fmtTimeOfDay(c.timeOfDay || '')) : fmtUnix(c.at);
  $('modalLikes').textContent = '❤ ' + (c.likes || 0);
  var box = $('modalTranslations');
  box.innerHTML = '';
  if (c.translations){
    Object.keys(c.translations).forEach(function(code){
      if (code === tr.lang) return;
      var row = document.createElement('div');
      row.className = 'tr-row';
      var l = document.createElement('span'); l.className = 'tr-lang'; l.textContent = (NATIVE_NAMES[code] || code);
      var tx = document.createElement('span'); tx.className = 'tr-text'; tx.textContent = c.translations[code];
      row.appendChild(l); row.appendChild(tx);
      box.appendChild(row);
    });
  }
  $('modalBackdrop').classList.add('open');
}
function closeModal(){ $('modalBackdrop').classList.remove('open'); }
function feedEmpty(el, key){
  var d = document.createElement('div');
  d.className = 'feed-empty';
  d.textContent = t(key);
  el.appendChild(d);
}
function renderFeed(){
  var el = $('feedList');
  if (!el) return;
  el.innerHTML = '';
  if (!lastClaims || !lastClaims.length){ feedEmpty(el, 'feed_empty'); return; }
  var items = lastClaims.slice().sort(function(a,b){ return b.claimedAt - a.claimedAt; }).slice(0, 30);
  items.forEach(function(c){ el.appendChild(buildFeedItem(c)); });
}
function renderTop(){
  var el = $('topList');
  if (!el) return;
  el.innerHTML = '';
  if (!topClaims.length){ feedEmpty(el, 'top_empty'); return; }
  topClaims.forEach(function(c){ el.appendChild(buildFeedItem(c)); });
}
function doLike(claimId, btn){
  fetch('/api/like', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claimId: claimId }) })
  .then(function(r){ return r.json(); })
  .then(function(res){
    if (res.ok && btn){ var sp = btn.querySelector('span'); if (sp) sp.textContent = res.likes; }
    refreshTop();
  }).catch(function(){});
}
function refreshTop(){
  fetch('/api/top').then(function(r){ return r.json(); }).then(function(d){
    topClaims = d.claims || [];
    renderTop();
  }).catch(function(){});
}
function renderCountdown(){
  var el = $('countdown');
  if (!el) return;
  if (!upcoming.length || lastUnix <= 0){ el.textContent = ''; return; }
  var u = upcoming[0];
  var remaining = u.at - lastUnix;
  if (remaining <= 0){ el.textContent = ''; return; }
  var tr = translateMsg(u);
  el.innerHTML = t('next_broadcast') + ': <b>' + u.name + '</b> · ' + remaining + 's';
}
function renderMoment(claim){
  var ov = $('moment');
  if (!ov) return;
  var tr = translateMsg(claim);
  $('momentWho').textContent = claim.name;
  $('momentMsg').textContent = '“' + tr.text + '”';
  var secLabel = claim.type === 'forever' ? ('FOREVER · ' + fmtTimeOfDay(claim.timeOfDay || '')) : ('#' + claim.secondUnix);
  $('momentSec').textContent = secLabel + ' · ' + tr.lang.toUpperCase();
  ov.classList.add('show');
  clearTimeout(momentTimer);
  momentTimer = setTimeout(function(){ ov.classList.remove('show'); }, 3000);
}

// ---------- init ----------
function init(){
  clockEl = $('clock'); unixEl = $('unix'); statusEl = $('status'); whoEl = $('who'); msgEl = $('msg'); langFlagEl = $('langFlag');

  var sel = $('langSelect');
  var stored = null;
  try { stored = localStorage.getItem('oas-lang'); } catch(e){}
  var initial = (stored && SUPPORTED.indexOf(stored) !== -1) ? stored : detectLang();
  applyLang(initial);
  sel.addEventListener('change', function(){
    applyLang(sel.value);
    try { localStorage.setItem('oas-lang', sel.value); } catch(e){}
  });

  var toggle = $('typeToggle');
  toggle.addEventListener('click', function(e){
    var b = e.target.closest('button');
    if (!b || b.disabled) return;
    setType(b.getAttribute('data-type'));
  });

  var msgInput = $('claimMessage');
  msgInput.addEventListener('input', function(){
    var n = msgInput.value.length;
    var max = CONFIG ? CONFIG.maxMessageChars : 120;
    $('charCount').textContent = n + ' / ' + max + ' ' + t('claim_chars');
    msgInput.style.borderColor = n > max ? '#ff8a8a' : '';
  });

  $('translationsToggle').addEventListener('change', function(){
    $('translationsBox').classList.toggle('show', this.checked);
  });

  var aud = $('claimAudience');
  SUPPORTED.forEach(function(code){
    var o = document.createElement('option');
    o.value = code; o.textContent = NATIVE_NAMES[code];
    aud.appendChild(o);
  });

  $('claimSubmit').addEventListener('click', submitClaim);
  $('claimNow').addEventListener('click', claimNextSecond);

  $('modalClose').addEventListener('click', closeModal);
  $('modalBackdrop').addEventListener('click', function(e){ if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeModal(); });
  var claimNextBtn = $('claimNext');
  if (claimNextBtn) claimNextBtn.addEventListener('click', claimNextSecond);

  fetch('/api/config').then(function(r){ return r.json(); }).then(function(c){
    CONFIG = c;
    updatePrice();
    refreshData();
  }).catch(function(){});

  connectSSE();
  buildTranslations();
  setType('one');
  refreshAuctions();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
})();
