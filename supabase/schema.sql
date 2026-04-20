create extension if not exists pgcrypto;

create table if not exists public.car_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  brand text not null,
  model text not null,
  year integer not null,
  mileage integer not null,
  age integer not null,
  asking_price bigint not null,
  condition text not null check (condition in ('excellent', 'good', 'fair', 'risky')),
  previous_owners integer not null default 1,
  seller_name text not null,
  notes text not null default '',
  checklist jsonb not null default '{}'::jsonb,
  insights jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists car_reports_user_id_updated_at_idx
  on public.car_reports (user_id, updated_at desc);

create or replace function public.set_car_reports_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists car_reports_set_updated_at on public.car_reports;
create trigger car_reports_set_updated_at
before update on public.car_reports
for each row execute function public.set_car_reports_updated_at();

alter table public.car_reports enable row level security;

drop policy if exists "Users can view their own car reports" on public.car_reports;
create policy "Users can view their own car reports"
on public.car_reports
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own car reports" on public.car_reports;
create policy "Users can insert their own car reports"
on public.car_reports
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own car reports" on public.car_reports;
create policy "Users can update their own car reports"
on public.car_reports
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own car reports" on public.car_reports;
create policy "Users can delete their own car reports"
on public.car_reports
for delete
using (auth.uid() = user_id);
