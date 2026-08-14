'use strict';
/*
 * OWN A SECOND — MVP server (FAZ 3)
 * Node.js, zero external dependencies (http, https, fs, path, crypto only). KISS.
 * Single source of truth for time = this server (UTC).
 *
 * Sections:
 *  1. config + helpers
 *  2. store (claims / forever / stats / auctions / invoices / pending)
 *  3. claims
 *  4. auctions (Prime seconds)
 *  5. payments (TRC-20 USDT/USDC via TronGrid; dev simulate)
 *  6. translation (provider abstraction)
 *  7. SSE broadcast
 *  8. HTTP routing + static
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const SITE_DIR = path.join(ROOT, 'site');
const DATA_DIR = path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');
const CONFIG_FILE = path.join(ROOT, 'config.json');

// ---------- 1. config + helpers ----------
const DEFAULT_CONFIG = {
  port: 8080,
  pricesUsd: { one: 9, forever: 29 },
  maxMessageChars: 120,
  maxNameChars: 40,
  languages: ['en'],
  audienceOptions: ['all', 'en'],
  paymentEnabled: false,
  tickMs: 1000,
  upcomingWindowSeconds: 86400,
  upcomingLimit: 12,
  payment: { network: 'trc20', receiveAddress: '', usdtContract: '', usdcContract: '',
    tronGridBase: 'https://api.trongrid.io', invoiceExpirySeconds: 900, verifyIntervalMs: 15000, simulateEnabled: false },
  translation: { provider: 'none', deeplApiKey: '', googleApiKey: '' },
  auction: { slots: [], defaultDurationHours: 72, bidIncrementUsd: 10 }
};
const CONFIG = Object.assign({}, DEFAULT_CONFIG, loadJson(CONFIG_FILE, {}));
CONFIG.payment = Object.assign({}, DEFAULT_CONFIG.payment, CONFIG.payment || {});
CONFIG.translation = Object.assign({}, DEFAULT_CONFIG.translation, CONFIG.translation || {});
CONFIG.auction = Object.assign({}, DEFAULT_CONFIG.auction, CONFIG.auction || {});

const PORT = Number(process.env.PORT) || CONFIG.port;
const HOST = '0.0.0.0';

function loadJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { return fallback; }
}
function saveJson(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}
function pad(n) { return (n < 10 ? '0' : '') + n; }
function nowUnix() { return Math.floor(Date.now() / 1000); }
function timeOfDayFromUnix(unix) {
  const d = new Date(unix * 1000);
  return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
}
function isValidTimeOfDay(tod) { return typeof tod === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(tod); }
function nextOccurrence(tod, afterUnix) {
  const [h, m, s] = tod.split(':').map(Number);
  const d = new Date(afterUnix * 1000);
  const occ = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, m, s));
  if (occ.getTime() / 1000 <= afterUnix) occ.setUTCDate(occ.getUTCDate() + 1);
  return Math.floor(occ.getTime() / 1000);
}

// ---------- 2. store ----------
function emptyStore() {
  return { claims: {}, forever: {}, stats: { claims: 0, revenueUsd: 0 }, idCounter: 0,
    auctions: {}, invoices: {}, pending: {} };
}
let store = loadJson(DATA_FILE, emptyStore());
if (!store.claims) store.claims = {};
if (!store.forever) store.forever = {};
if (!store.stats) store.stats = { claims: 0, revenueUsd: 0 };
if (!store.idCounter) store.idCounter = 0;
if (!store.auctions) store.auctions = {};
if (!store.invoices) store.invoices = {};
if (!store.pending) store.pending = {};

function persist() { saveJson(DATA_FILE, store); }

function seed() {
  let dirty = false;
  if (store.stats.claims === 0 && Object.keys(store.forever).length === 0) {
    const mk = (id, tod, name, message, type, translations) => ({
      id, type, timeOfDay: tod, name, message, audience: 'all',
      translations: translations || null,
      priceUsd: type === 'forever' ? CONFIG.pricesUsd.forever : CONFIG.pricesUsd.one,
      claimedAt: Date.now(), payment: 'demo'
    });
    // NOTE: prime slot 00:00:00 is auctioned now — NOT seeded as a fixed claim.
    store.forever['08:08:00'] = mk('oas-seed-1', '08:08:00', '@wish', 'Make a wish.', 'forever');
    store.forever['20:00:00'] = mk('oas-seed-2', '20:00:00', '@aida', 'This second, I choose you.', 'forever', {
      en: 'This second, I choose you.', tr: 'Bu saniyede, seni seçiyorum.', de: 'In dieser Sekunde wähle ich dich.',
      es: 'En este segundo, te elijo a ti.', fr: 'Cette seconde, je te choisis.',
      ar: 'في هذه الثانية، أختارك أنت.', ja: 'この一秒、私はあなたを選ぶ。'
    });
    store.forever['08:08:00'].likes = 7;
    store.forever['20:00:00'].likes = 12;
    store.stats.claims = 2;
    store.stats.revenueUsd = CONFIG.pricesUsd.forever * 2;
    dirty = true;
  }
  // seed auctions for configured prime slots (if not present)
  for (const s of CONFIG.auction.slots) {
    if (!store.auctions[s.slot]) {
      store.auctions[s.slot] = {
        slot: s.slot, minBidUsd: s.minBidUsd,
        endAt: nowUnix() + CONFIG.auction.defaultDurationHours * 3600,
        status: 'open', highestBidUsd: null, highestBidder: null, bids: [], winner: null
      };
      dirty = true;
    }
  }
  if (dirty) persist();
}
seed();

// ---------- 3. claims ----------
function resolveCurrent(unix) {
  const specific = store.claims[String(unix)];
  if (specific) return specific;
  const tod = timeOfDayFromUnix(unix);
  const f = store.forever[tod];
  if (f) return f;
  return null;
}
function computeUpcoming() {
  const now = nowUnix();
  const list = [];
  for (const key of Object.keys(store.claims)) {
    const c = store.claims[key];
    if (c.secondUnix > now) list.push({ id: c.id, type: c.type, name: c.name, message: c.message,
      audience: c.audience, translations: c.translations || null, at: c.secondUnix, daily: false,
      timeOfDay: null, likes: c.likes || 0 });
  }
  for (const tod of Object.keys(store.forever)) {
    const c = store.forever[tod];
    list.push({ id: c.id, type: c.type, name: c.name, message: c.message, audience: c.audience,
      translations: c.translations || null, at: nextOccurrence(tod, now), daily: true,
      timeOfDay: tod, likes: c.likes || 0 });
  }
  list.sort((a, b) => a.at - b.at);
  return list.slice(0, CONFIG.upcomingLimit);
}
function ledgerList() {
  const list = [];
  for (const key of Object.keys(store.claims)) {
    const c = store.claims[key];
    list.push(Object.assign({ at: c.secondUnix, daily: false }, publicClaim(c)));
  }
  for (const tod of Object.keys(store.forever)) {
    const c = store.forever[tod];
    list.push(Object.assign({ at: nextOccurrence(tod, nowUnix()), daily: true }, publicClaim(c)));
  }
  list.sort((a, b) => a.claimedAt - b.claimedAt);
  return list;
}
function publicClaim(c) {
  return { id: c.id, type: c.type, name: c.name, message: c.message, audience: c.audience,
    translations: c.translations || null, secondUnix: c.secondUnix || null, timeOfDay: c.timeOfDay || null,
    priceUsd: c.priceUsd, claimedAt: c.claimedAt, payment: c.payment || null, likes: c.likes || 0 };
}

// ---------- likes (no accounts yet — soft signal, rate-limited per IP) ----------
const likeWindows = new Map();
const LIKE_LIMIT_PER_HOUR = 30;
function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}
function likeAllowed(ip) {
  const now = Date.now();
  const w = likeWindows.get(ip);
  if (!w || now > w.resetAt) { likeWindows.set(ip, { count: 1, resetAt: now + 3600000 }); return true; }
  if (w.count >= LIKE_LIMIT_PER_HOUR) return false;
  w.count += 1;
  return true;
}
function findClaimById(id) {
  for (const k in store.claims) if (store.claims[k].id === id) return store.claims[k];
  for (const k in store.forever) if (store.forever[k].id === id) return store.forever[k];
  return null;
}
function doLike(id, ip) {
  const c = findClaimById(id);
  if (!c) return { code: 'NOT_FOUND' };
  if (!likeAllowed(ip)) return { code: 'RATE_LIMITED' };
  c.likes = (c.likes || 0) + 1;
  persist();
  broadcast({ type: 'like', claimId: id, likes: c.likes });
  return { ok: true, likes: c.likes };
}
function topList() {
  const items = [];
  for (const k in store.claims) { const c = store.claims[k]; items.push(Object.assign({ at: c.secondUnix, daily: false }, publicClaim(c))); }
  for (const k in store.forever) { const c = store.forever[k]; items.push(Object.assign({ at: nextOccurrence(k, nowUnix()), daily: true }, publicClaim(c))); }
  return items.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 10);
}
function validateClaim(body) {
  if (!body || typeof body !== 'object') return { code: 'INVALID_JSON' };
  const type = body.type;
  if (type !== 'one' && type !== 'forever') return { code: 'INVALID_TYPE' };
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name || name.length > CONFIG.maxNameChars) return { code: 'INVALID_NAME' };
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > CONFIG.maxMessageChars) return { code: 'INVALID_MESSAGE' };
  const audience = body.audience;
  if (audience !== 'all' && CONFIG.languages.indexOf(audience) === -1) return { code: 'INVALID_AUDIENCE' };
  let translations = null;
  if (body.translations && typeof body.translations === 'object') {
    translations = {};
    for (const k of Object.keys(body.translations)) {
      if (CONFIG.languages.indexOf(k) !== -1 && typeof body.translations[k] === 'string') {
        translations[k] = body.translations[k].trim();
      }
    }
    if (Object.keys(translations).length === 0) translations = null;
  }
  if (type === 'one') {
    const unix = Number(body.secondUnix);
    if (!Number.isInteger(unix) || unix <= nowUnix()) return { code: 'INVALID_SECOND' };
    if (store.claims[String(unix)]) return { code: 'CONFLICT' };
    return { ok: true, claim: { type: 'one', secondUnix: unix, name, message, audience, translations } };
  }
  const tod = body.timeOfDay;
  if (!isValidTimeOfDay(tod)) return { code: 'INVALID_TIME' };
  if (store.forever[tod]) return { code: 'CONFLICT' };
  // prime slots are auction-only
  if (CONFIG.auction.slots.some((s) => s.slot === tod)) return { code: 'AUCTION_ONLY' };
  return { ok: true, claim: { type: 'forever', timeOfDay: tod, name, message, audience, translations } };
}
function buildClaimObj(validated) {
  const price = validated.type === 'forever' ? CONFIG.pricesUsd.forever : CONFIG.pricesUsd.one;
  store.idCounter += 1;
  return Object.assign({}, validated, {
    id: 'oas-' + String(store.idCounter).padStart(5, '0'),
    priceUsd: price, claimedAt: Date.now(), payment: 'demo', likes: 0
  });
}
function commitClaim(claim, payment) {
  claim.payment = payment || 'demo';
  if (claim.type === 'one') store.claims[String(claim.secondUnix)] = claim;
  else store.forever[claim.timeOfDay] = claim;
  store.stats.claims += 1;
  store.stats.revenueUsd += claim.priceUsd;
  persist();
  broadcast({ type: 'claim', claim: publicClaim(claim) });
  return publicClaim(claim);
}
function doClaim(body) {
  const v = validateClaim(body);
  if (!v.ok) return v;
  const claim = buildClaimObj(v.claim);
  if (CONFIG.paymentEnabled) {
    const invoice = createInvoice(claim.id, claim.priceUsd);
    store.pending[invoice.id] = claim;
    persist();
    return { ok: true, pending: true, invoice: publicInvoice(invoice), claimId: claim.id };
  }
  return { ok: true, claim: commitClaim(claim) };
}

// ---------- 4. auctions ----------
function publicAuction(a) {
  return { slot: a.slot, minBidUsd: a.minBidUsd, endAt: a.endAt, status: a.status,
    highestBidUsd: a.highestBidUsd, highestBidder: a.highestBidder,
    bidCount: a.bids.length, winner: a.winner };
}
function listAuctions() {
  finalizeAuctions();
  return CONFIG.auction.slots.map((s) => publicAuction(store.auctions[s.slot])).filter(Boolean);
}
function placeBid(slot, name, amountUsd) {
  const a = store.auctions[slot];
  if (!a) return { code: 'AUCTION_NOT_FOUND' };
  if (typeof name !== 'string' || !name.trim() || name.trim().length > CONFIG.maxNameChars) return { code: 'INVALID_NAME' };
  const amount = Number(amountUsd);
  if (!Number.isFinite(amount) || amount <= 0) return { code: 'INVALID_BID' };
  if (a.status !== 'open' || nowUnix() >= a.endAt) return { code: 'AUCTION_CLOSED' };
  if (amount < a.minBidUsd) return { code: 'BID_TOO_LOW' };
  if (a.highestBidUsd !== null && amount < a.highestBidUsd + CONFIG.auction.bidIncrementUsd) return { code: 'BID_TOO_LOW' };
  a.highestBidUsd = amount;
  a.highestBidder = name.trim();
  a.bids.push({ name: name.trim(), amountUsd: amount, at: nowUnix() });
  persist();
  broadcast({ type: 'auction', slot: slot });
  return { ok: true, auction: publicAuction(a) };
}
function finalizeAuctions() {
  let changed = false;
  for (const s of CONFIG.auction.slots) {
    const a = store.auctions[s.slot];
    if (!a) continue;
    if (a.status === 'open' && nowUnix() >= a.endAt) {
      if (a.highestBidder) {
        a.status = 'closed';
        a.winner = { name: a.highestBidder, amountUsd: a.highestBidUsd, at: nowUnix() };
        // winner owns the slot forever, as type 'prime'
        const claim = {
          id: 'oas-prime-' + a.slot.replace(/:/g, ''),
          type: 'prime', timeOfDay: a.slot, name: a.winner.name,
          message: 'Prime second · ' + a.slot.slice(0, 5) + ' UTC',
          audience: 'all', translations: null,
          priceUsd: a.highestBidUsd, claimedAt: Date.now(), payment: 'auction'
        };
        store.forever[a.slot] = claim;
        store.stats.claims += 1;
        store.stats.revenueUsd += a.highestBidUsd;
        broadcast({ type: 'claim', claim: publicClaim(claim) });
      } else {
        // no bids: reopen for a fresh window
        a.endAt = nowUnix() + CONFIG.auction.defaultDurationHours * 3600;
      }
      changed = true;
    }
  }
  if (changed) persist();
  return changed;
}
setInterval(finalizeAuctions, 10000);

// ---------- 5. payments ----------
function publicInvoice(i) {
  return { id: i.id, amountUsd: i.amountUsd, address: CONFIG.payment.receiveAddress,
    network: CONFIG.payment.network, expiresAt: i.expiresAt, paid: i.paid, txId: i.txId || null };
}
function createInvoice(claimId, amountUsd) {
  const id = 'inv-' + crypto.randomBytes(6).toString('hex');
  const inv = { id, claimId, amountUsd, createdAt: Date.now(),
    expiresAt: nowUnix() + CONFIG.payment.invoiceExpirySeconds, paid: false, txId: null };
  store.invoices[id] = inv;
  persist();
  return inv;
}
function finalizePayment(inv, txId) {
  inv.paid = true;
  inv.txId = txId || 'simulated';
  const claim = store.pending[inv.id];
  if (claim) {
    claim.payment = 'paid';
    delete store.pending[inv.id];
    commitClaim(claim, 'paid');
  }
  persist();
  broadcast({ type: 'payment', invoiceId: inv.id });
  return publicInvoice(inv);
}
function tronGridRequest(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, CONFIG.payment.tronGridBase);
    https.get(url.toString(), (res) => {
      let d = '';
      res.on('data', (c) => { d += c; });
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error('TronGrid HTTP ' + res.statusCode));
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}
async function checkIncoming(address, sinceTsMs) {
  // Real TRC-20 balance check against TronGrid. Requires a funded receive address to prove live.
  let total = 0;
  for (const contract of [CONFIG.payment.usdtContract, CONFIG.payment.usdcContract]) {
    if (!contract) continue;
    const q = '/v1/accounts/' + address + '/transactions/trc20?contract_address=' + contract +
      '&only_confirmed=true&min_timestamp=' + sinceTsMs + '&limit=50';
    const res = await tronGridRequest(q);
    const data = res.data || [];
    for (const tx of data) {
      const to = (tx.to || '').toLowerCase();
      if (to === address.toLowerCase() && (tx.block_timestamp || 0) >= sinceTsMs) {
        const decimals = (tx.token_info && tx.token_info.decimals) || 6;
        total += Number(tx.value) / Math.pow(10, decimals);
      }
    }
  }
  return total;
}
async function verifyLoop() {
  if (!CONFIG.paymentEnabled) return;
  const now = nowUnix();
  for (const id of Object.keys(store.invoices)) {
    const inv = store.invoices[id];
    if (inv.paid || inv.expiresAt < now) continue;
    try {
      const received = await checkIncoming(CONFIG.payment.receiveAddress, Math.floor(inv.createdAt / 1000) * 1000);
      if (received >= inv.amountUsd) finalizePayment(inv, null);
    } catch (e) {
      console.error('[oas] verify error:', e.message);
    }
  }
}
setInterval(verifyLoop, CONFIG.payment.verifyIntervalMs);

// ---------- 6. translation ----------
const PHRASES = {
  'This second, I choose you.': { en: 'This second, I choose you.', tr: 'Bu saniyede, seni seçiyorum.', de: 'In dieser Sekunde wähle ich dich.', es: 'En este segundo, te elijo a ti.', fr: 'Cette seconde, je te choisis.', ar: 'في هذه الثانية، أختارك أنت.', ja: 'この一秒、私はあなたを選ぶ。' },
  'A new day begins.': { en: 'A new day begins.', tr: 'Yeni bir gün başlıyor.', de: 'Ein neuer Tag beginnt.', es: 'Comienza un nuevo día.', fr: 'Un nouveau jour commence.', ar: 'يبدأ يوم جديد.', ja: '新しい一日が始まる。' },
  'Make a wish.': { en: 'Make a wish.', tr: 'Bir dilek tut.', de: 'Wünsch dir was.', es: 'Pide un deseo.', fr: 'Fais un vœu.', ar: 'تمنَّ أمنية.', ja: '願い事をして。' }
};
function translateText(text, target) {
  // Provider abstraction. 'none' -> dictionary fallback. 'mock' -> test marker.
  // 'deepl' / 'google' -> real HTTPS call (requires API key; not live-tested).
  return new Promise((resolve) => {
    const provider = CONFIG.translation.provider;
    if (provider === 'none' || !provider) {
      if (PHRASES[text] && PHRASES[text][target]) return resolve(PHRASES[text][target]);
      return resolve(text);
    }
    if (provider === 'mock') return resolve('[' + target + '] ' + text);
    if (provider === 'deepl' && CONFIG.translation.deeplApiKey) {
      const body = new URLSearchParams({ text, target_lang: target.toUpperCase() }).toString();
      const req = https.request({
        hostname: 'api-free.deepl.com', path: '/v2/translate', method: 'POST',
        headers: { 'Authorization': 'DeepL-Auth-Key ' + CONFIG.translation.deeplApiKey,
          'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) }
      }, (res) => {
        let d = '';
        res.on('data', (c) => { d += c; });
        res.on('end', () => {
          try { resolve(JSON.parse(d).translations[0].text); } catch (e) { resolve(text); }
        });
      });
      req.on('error', () => resolve(text));
      req.write(body); req.end();
      return;
    }
    if (provider === 'google' && CONFIG.translation.googleApiKey) {
      const q = 'https://translation.googleapis.com/language/translate/v2?key=' +
        CONFIG.translation.googleApiKey + '&q=' + encodeURIComponent(text) + '&target=' + target;
      https.get(q, (res) => {
        let d = '';
        res.on('data', (c) => { d += c; });
        res.on('end', () => {
          try { resolve(JSON.parse(d).data.translations[0].translatedText); } catch (e) { resolve(text); }
        });
      }).on('error', () => resolve(text));
      return;
    }
    resolve(text);
  });
}

// ---------- 7. SSE ----------
const clients = new Set();
function broadcast(obj) {
  const data = 'data: ' + JSON.stringify(obj) + '\n\n';
  for (const c of clients) { try { c.write(data); } catch (e) { clients.delete(c); } }
}
setInterval(function () {
  const unix = nowUnix();
  const current = resolveCurrent(unix);
  broadcast({ type: 'tick', unix, current: current ? publicClaim(current) : null });
}, CONFIG.tickMs);

// ---------- 8. HTTP ----------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon'
};
function send(res, code, body, headers) {
  res.writeHead(code, headers || { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(body);
}
function sendJson(res, code, obj) {
  send(res, code, JSON.stringify(obj), { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
}
function readBody(req, cb) {
  let data = '';
  req.on('data', (c) => { data += c; if (data.length > 1e6) req.destroy(); });
  req.on('end', () => {
    let parsed = null;
    try { parsed = JSON.parse(data || '{}'); } catch (e) { parsed = null; }
    cb(parsed);
  });
}

function handleApi(req, res, pathname) {
  if (req.method === 'GET' && pathname === '/api/health') return sendJson(res, 200, { ok: true, unix: nowUnix() });
  if (req.method === 'GET' && pathname === '/api/config') {
    return sendJson(res, 200, {
      pricesUsd: CONFIG.pricesUsd, maxMessageChars: CONFIG.maxMessageChars,
      maxNameChars: CONFIG.maxNameChars, languages: CONFIG.languages,
      audienceOptions: CONFIG.audienceOptions, paymentEnabled: CONFIG.paymentEnabled
    });
  }
  if (req.method === 'GET' && pathname === '/api/state') {
    const unix = nowUnix();
    return sendJson(res, 200, {
      serverUnix: unix, current: resolveCurrent(unix) ? publicClaim(resolveCurrent(unix)) : null,
      stats: store.stats, upcoming: computeUpcoming(), auctions: listAuctions()
    });
  }
  if (req.method === 'GET' && pathname === '/api/ledger') {
    return sendJson(res, 200, { claims: ledgerList(), stats: store.stats });
  }
  if (req.method === 'GET' && pathname === '/api/auctions') {
    return sendJson(res, 200, { auctions: listAuctions() });
  }
  if (req.method === 'POST' && pathname === '/api/auction/bid') {
    return readBody(req, (body) => {
      const r = placeBid(body && body.slot, body && body.name, body && body.amountUsd);
      if (r.ok) return sendJson(res, 200, r);
      const status = { AUCTION_CLOSED: 409, AUCTION_NOT_FOUND: 404, BID_TOO_LOW: 400, INVALID_BID: 400, INVALID_NAME: 400 }[r.code] || 400;
      return sendJson(res, status, { ok: false, code: r.code });
    });
  }
  if (req.method === 'POST' && pathname === '/api/claim') {
    return readBody(req, (body) => {
      const r = doClaim(body);
      if (r.ok) return sendJson(res, 200, r);
      const status = { CONFLICT: 409, AUCTION_ONLY: 409, INVALID_JSON: 400 }[r.code] || 400;
      return sendJson(res, status, { ok: false, code: r.code });
    });
  }
  if (req.method === 'POST' && pathname === '/api/payment/simulate') {
    if (!CONFIG.payment.simulateEnabled) return sendJson(res, 403, { ok: false, code: 'DISABLED' });
    return readBody(req, (body) => {
      const inv = store.invoices[body && body.invoiceId];
      if (!inv) return sendJson(res, 404, { ok: false, code: 'INVOICE_NOT_FOUND' });
      return sendJson(res, 200, { ok: true, invoice: finalizePayment(inv, 'simulated') });
    });
  }
  if (req.method === 'GET' && pathname.startsWith('/api/invoice/')) {
    const id = pathname.split('/').pop();
    const inv = store.invoices[id];
    if (!inv) return sendJson(res, 404, { ok: false, code: 'INVOICE_NOT_FOUND' });
    return sendJson(res, 200, { invoice: publicInvoice(inv) });
  }
  if (req.method === 'POST' && pathname === '/api/translate') {
    return readBody(req, (body) => {
      const target = body && body.target;
      const text = body && body.text;
      if (!text || CONFIG.languages.indexOf(target) === -1) return sendJson(res, 400, { ok: false, code: 'INVALID' });
      return translateText(text, target).then((translated) => sendJson(res, 200, { ok: true, translated }));
    });
  }
  if (req.method === 'POST' && pathname === '/api/like') {
    return readBody(req, (body) => {
      const r = doLike(body && body.claimId, clientIp(req));
      if (r.ok) return sendJson(res, 200, r);
      const status = r.code === 'RATE_LIMITED' ? 429 : 404;
      return sendJson(res, status, { ok: false, code: r.code });
    });
  }
  if (req.method === 'GET' && pathname === '/api/top') {
    return sendJson(res, 200, { claims: topList() });
  }
  if (req.method === 'GET' && pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache',
      'Connection': 'keep-alive', 'Access-Control-Allow-Origin': '*'
    });
    res.write('retry: 3000\n\n');
    res.write('data: ' + JSON.stringify({ type: 'hello', unix: nowUnix() }) + '\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  return sendJson(res, 404, { ok: false, code: 'NOT_FOUND' });
}

function serveStatic(req, res, pathname) {
  let file = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.normalize(path.join(SITE_DIR, file));
  if (!filePath.startsWith(SITE_DIR)) return send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain' });
  fs.readFile(filePath, (err, buf) => {
    if (err) return send(res, 404, 'Not found', { 'Content-Type': 'text/plain' });
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, buf, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  });
}

const server = http.createServer(function (req, res) {
  const pathname = (req.url || '/').split('?')[0];
  if (pathname.startsWith('/api/')) return handleApi(req, res, pathname);
  if (req.method === 'GET') return serveStatic(req, res, pathname);
  return sendJson(res, 405, { ok: false, code: 'METHOD' });
});

server.listen(PORT, HOST, function () {
  console.log('[oas] OWN A SECOND server listening on http://' + HOST + ':' + PORT);
  console.log('[oas] paymentEnabled =', CONFIG.paymentEnabled, '| translate.provider =', CONFIG.translation.provider);
  console.log('[oas] auction slots =', CONFIG.auction.slots.map((s) => s.slot).join(', '));
});
