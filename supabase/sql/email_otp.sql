-- OTP storage table (run this in your Supabase SQL editor or migrations)
create table if not exists public.email_otp (
  id bigserial primary key,
  email text not null,
  code text not null,
  expires_at timestamptz not null,
  consumed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Indexes for quick lookups
create index if not exists email_otp_email_idx on public.email_otp (email);
create index if not exists email_otp_created_at_idx on public.email_otp (created_at desc);

-- RLS: lock down to service role only (serverless functions)
alter table public.email_otp enable row level security;
do $$ begin
  create policy email_otp_no_client_access on public.email_otp
  for all
  using (false)
  with check (false);
exception when duplicate_object then null; end $$;
