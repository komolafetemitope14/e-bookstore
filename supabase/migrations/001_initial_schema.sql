-- Raising Beyond Today
-- Initial UAT database schema
--
-- Security principles:
-- 1. Authentication is handled by Supabase Auth.
-- 2. Customers can only access their own customer data.
-- 3. Customers cannot mark orders as paid.
-- 4. Customers cannot grant themselves book entitlements.
-- 5. Payment processing is performed by trusted server-side code.
-- 6. Payment events are not exposed to browser clients.

-- =========================================================
-- PROFILES
-- =========================================================

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    first_name text not null,
    last_name text not null,
    phone text not null,
    country text not null,
    state_region text not null,
    city text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================================
-- BOOKS
-- =========================================================

create table public.books (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text not null unique,
    price_kobo integer not null check (price_kobo > 0),
    currency text not null default 'NGN',
    active boolean not null default true,
    created_at timestamptz not null default now(),

    constraint books_currency_check
        check (currency = 'NGN')
);

-- =========================================================
-- ORDERS
-- =========================================================

create table public.orders (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete restrict,

    book_id uuid not null
        references public.books(id)
        on delete restrict,

    amount_kobo integer not null
        check (amount_kobo > 0),

    currency text not null default 'NGN',

    paystack_reference text unique,

    status text not null default 'pending',

    paid_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint orders_currency_check
        check (currency = 'NGN'),

    constraint orders_status_check
        check (
            status in (
                'pending',
                'processing',
                'paid',
                'failed',
                'cancelled'
            )
        )
);

-- =========================================================
-- ENTITLEMENTS
-- =========================================================

create table public.entitlements (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    book_id uuid not null
        references public.books(id)
        on delete restrict,

    order_id uuid not null
        references public.orders(id)
        on delete restrict,

    granted_at timestamptz not null default now(),

    unique (user_id, book_id)
);

-- =========================================================
-- PAYMENT EVENTS
-- =========================================================

create table public.payment_events (
    id uuid primary key default gen_random_uuid(),

    provider text not null default 'paystack',

    event_type text not null,

    provider_reference text,

    payload jsonb not null,

    processed boolean not null default false,

    processed_at timestamptz,

    created_at timestamptz not null default now()
);

-- =========================================================
-- INDEXES
-- =========================================================

create index orders_user_id_idx
    on public.orders(user_id);

create index orders_book_id_idx
    on public.orders(book_id);

create index orders_status_idx
    on public.orders(status);

create index entitlements_user_id_idx
    on public.entitlements(user_id);

create index entitlements_book_id_idx
    on public.entitlements(book_id);

create index payment_events_provider_reference_idx
    on public.payment_events(provider_reference);

-- =========================================================
-- AUTOMATIC PROFILE CREATION
-- =========================================================

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
        coalesce(new.raw_user_meta_data ->> 'first_name', ''),
        coalesce(new.raw_user_meta_data ->> 'last_name', ''),
        coalesce(new.raw_user_meta_data ->> 'phone', ''),
        coalesce(new.raw_user_meta_data ->> 'country', ''),
        coalesce(new.raw_user_meta_data ->> 'state_region', ''),
        nullif(new.raw_user_meta_data ->> 'city', '')
    );

    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;
alter table public.payment_events enable row level security;

-- =========================================================
-- PROFILE POLICIES
-- =========================================================

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- No browser INSERT policy is required.
-- The trusted database trigger creates the profile when
-- Supabase Auth creates a new user.

-- =========================================================
-- BOOK POLICIES
-- =========================================================

create policy "Anyone can view active books"
on public.books
for select
to anon, authenticated
using (active = true);

-- No browser INSERT/UPDATE/DELETE policies are defined.

-- =========================================================
-- ORDER POLICIES
-- =========================================================

create policy "Users can read their own orders"
on public.orders
for select
to authenticated
using ((select auth.uid()) = user_id);

-- Deliberately NO customer INSERT policy.
-- Orders will be created by trusted server-side payment code.

-- Deliberately NO customer UPDATE policy.
-- Customers must never be able to mark an order as paid.

-- Deliberately NO customer DELETE policy.

-- =========================================================
-- ENTITLEMENT POLICIES
-- =========================================================

create policy "Users can read their own entitlements"
on public.entitlements
for select
to authenticated
using ((select auth.uid()) = user_id);

-- Deliberately NO INSERT/UPDATE/DELETE policies.
-- Entitlements are granted only by trusted server-side code
-- after successful payment verification.

-- =========================================================
-- PAYMENT EVENT POLICIES
-- =========================================================

-- No client policies are intentionally defined.
-- Payment events are server-side audit records and must not
-- be readable or writable directly from the browser.

-- =========================================================
-- INITIAL BOOK
-- =========================================================

insert into public.books (
    title,
    slug,
    price_kobo,
    currency,
    active
)
values (
    'Raising Beyond Today',
    'raising-beyond-today',
    10000,
    'NGN',
    true
);
