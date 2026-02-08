-- Migration: create bookings table
-- Enables pgcrypto to generate UUIDs and creates bookings table

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  restaurant_id integer not null,
  restaurant_name text,
  name text not null,
  email text,
  phone text,
  "time" text,
  created_at timestamptz not null default now(),
  user_id text,
  user_full_name text,
  user_email text
);

create index if not exists idx_bookings_restaurant_id on public.bookings (restaurant_id);
create index if not exists idx_bookings_user_id on public.bookings (user_id);
