-- ============================================================
-- OWN A SECOND — Supabase şeması (BASİT + SAĞLAM)
-- Tüm uygulama durumu tek bir JSON sütununda tutulur (KISS).
-- Sunucu service_role ile yazar (RLS'i bypass eder), anon OKUYAMAZ.
-- Uygulama: Supabase → SQL Editor → bu dosyanın TAMAMINI yapıştır → Run.
-- ============================================================

create table if not exists app_state (
  id   integer primary key default 1,
  data jsonb not null default '{}'::jsonb
);

insert into app_state (id, data) values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Güvenlik: anon (public) anahtar hiçbir şey okuyamaz/yazamaz.
-- Sunucu service_role ile eriştiği için RLS'i atlar; politika gerekmez.
alter table app_state enable row level security;
