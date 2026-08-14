-- ============================================================
-- OWN A SECOND — Supabase (Postgres) Şeması
-- Uygulama: Supabase paneli → SQL Editor → bu dosyanın tamamını yapıştır → Run.
-- ============================================================

-- ---- ONE-TIME CLAIMS (tam saniyeye göre) ----
create table if not exists claims (
  second_unix   bigint primary key,
  id            text not null,
  type          text not null default 'one',
  name          text not null,
  message       text not null,
  audience      text not null default 'all',
  translations  jsonb,
  price_usd     numeric not null,
  claimed_at    timestamptz not null default now(),
  payment       text not null default 'demo'
);

-- ---- FOREVER / PRIME (günün saatine göre: HH:MM:SS) ----
create table if not exists forever_seconds (
  time_of_day   text primary key,
  id            text not null,
  type          text not null default 'forever',   -- 'forever' | 'prime'
  name          text not null,
  message       text not null,
  audience      text not null default 'all',
  translations  jsonb,
  price_usd     numeric not null,
  claimed_at    timestamptz not null default now(),
  payment       text not null default 'demo'
);

-- ---- AUCTIONS (prime slotlar) ----
create table if not exists auctions (
  slot            text primary key,
  min_bid_usd     numeric not null,
  end_at          bigint not null,
  status          text not null default 'open',
  highest_bid_usd numeric,
  highest_bidder  text,
  bids            jsonb default '[]'::jsonb,
  winner          jsonb
);

-- ---- INVOICES (kripto ödemeler) ----
create table if not exists invoices (
  id          text primary key,
  claim_id    text not null,
  amount_usd  numeric not null,
  created_at  timestamptz not null default now(),
  expires_at  bigint not null,
  paid        boolean not null default false,
  tx_id       text
);

-- ---- STATS (sayaç + gelir) ----
create table if not exists stats (
  id          integer primary key default 1,
  claims      integer not null default 0,
  revenue_usd numeric not null default 0,
  id_counter  integer not null default 0
);
insert into stats (id, claims, revenue_usd, id_counter) values (1, 0, 0, 0)
on conflict (id) do nothing;

-- ---- indeksler ----
create index if not exists idx_forever_type on forever_seconds(type);
create index if not exists idx_auctions_status on auctions(status);
create index if not exists idx_invoices_paid on invoices(paid);

-- ---- ROW LEVEL SECURITY ----
-- Sunucu, service_role anahtarıyla YAZAR (RLS'yi bypass eder).
-- Anon (public) anahtar sadece OKUR (saat/defter/açık artırma herkese açık veri).
alter table claims          enable row level security;
alter table forever_seconds enable row level security;
alter table auctions        enable row level security;
alter table invoices        enable row level security;
alter table stats           enable row level security;

create policy "anon okuyabilir" on claims          for select using (true);
create policy "anon okuyabilir" on forever_seconds for select using (true);
create policy "anon okuyabilir" on auctions        for select using (true);
create policy "anon okuyabilir" on stats           for select using (true);
-- invoices: anon için POLİTİKA YOK = anon okuyamaz (özel). Yazma hep service_role.

-- Not: Yazma (insert/update/delete) için politika eklenmez => anon YAZAMAZ.
-- Sunucu service_role ile yazdığı için politika gerekmez (service_role RLS'i atlar).
