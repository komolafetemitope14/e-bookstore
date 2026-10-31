-- Migration 003
-- Support minimal customer accounts for digital purchases
-- and guest checkout for physical hard-cover orders.
--
-- Security model:
-- 1. E-book access requires an authenticated Supabase account.
-- 2. Account creation does not require physical delivery information.
-- 3. Hard-cover orders may be created for guests by trusted server-side code.
-- 4. Browser clients still cannot create or mark orders as paid.
-- 5. Delivery information remains attached to physical orders.

-- ============================================================
-- PROFILES
-- ============================================================

-- Account profiles should not require information that is unrelated
-- to authentication or digital book access.

alter table public.profiles
    alter column first_name drop not null,
    alter column last_name drop not null,
    alter column phone drop not null,
    alter column country drop not null,
    alter column state_region drop not null;

-- ============================================================
-- ORDERS
-- ============================================================

-- E-book orders will normally belong to an authenticated user.
-- Hard-cover checkout may be completed without creating an account.
-- Trusted server-side checkout code remains responsible for creating
-- orders and validating the appropriate fields for each edition.

alter table public.orders
    alter column user_id drop not null;

-- ============================================================
-- AUTOMATIC PROFILE CREATION
-- ============================================================

-- Replace the original trigger function so new accounts can be created
-- with only the information required by Supabase Auth.
--
-- Optional profile information is copied from user metadata when present.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (
        id,
        first_name,
        last_name,
        phone,
        country,
        state_region,
        city
    )
    values (
        new.id,
        nullif(trim(new.raw_user_meta_data ->> 'first_name'), ''),
        nullif(trim(new.raw_user_meta_data ->> 'last_name'), ''),
        nullif(trim(new.raw_user_meta_data ->> 'phone'), ''),
        nullif(trim(new.raw_user_meta_data ->> 'country'), ''),
        nullif(trim(new.raw_user_meta_data ->> 'state_region'), ''),
        nullif(trim(new.raw_user_meta_data ->> 'city'), '')
    );

    return new;
end;
$$;

-- ============================================================
-- COMMENTS
-- ============================================================

comment on table public.profiles is
    'Optional customer profile information associated with an authenticated account.';

comment on column public.orders.user_id is
    'Authenticated customer for account-based orders. May be null for guest physical-book orders.';
