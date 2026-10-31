-- Migration 002
-- Add separate e-book and hard-cover editions for Raising Beyond Today.
-- Digital purchases receive protected account access.
-- Hard-cover purchases require physical delivery information.

-- ============================================================
-- BOOK EDITIONS
-- ============================================================

create table public.book_editions (
    id uuid primary key default gen_random_uuid(),
    book_id uuid not null
        references public.books(id)
        on delete cascade,

    edition_type text not null,
    price_kobo integer not null,
    currency text not null default 'NGN',
    active boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint book_editions_type_check
        check (edition_type in ('ebook', 'hard_cover')),

    constraint book_editions_price_check
        check (price_kobo > 0),

    constraint book_editions_currency_check
        check (currency = 'NGN'),

    constraint book_editions_book_type_unique
        unique (book_id, edition_type)
);

create index book_editions_book_id_idx
    on public.book_editions (book_id);

-- ============================================================
-- EXISTING BOOK PRICE
-- ============================================================

-- The original books.price_kobo represented the e-book price.
-- Move that price into the new editions table.

insert into public.book_editions (
    book_id,
    edition_type,
    price_kobo,
    currency,
    active
)
select
    id,
    'ebook',
    price_kobo,
    currency,
    active
from public.books
where slug = 'raising-beyond-today';

-- Add the hard-cover edition at ₦150 = 15,000 kobo.

insert into public.book_editions (
    book_id,
    edition_type,
    price_kobo,
    currency,
    active
)
select
    id,
    'hard_cover',
    15000,
    'NGN',
    true
from public.books
where slug = 'raising-beyond-today';

-- ============================================================
-- ORDERS
-- ============================================================

-- Every new order must identify which edition was purchased.

alter table public.orders
    add column edition_id uuid
        references public.book_editions(id)
        on delete restrict;

-- Delivery information is used only for physical hard-cover
-- fulfillment. These fields remain null for e-book orders.

alter table public.orders
    add column delivery_first_name text,
    add column delivery_last_name text,
    add column delivery_phone text,
    add column delivery_email text,
    add column delivery_country text,
    add column delivery_state_region text,
    add column delivery_city text,
    add column delivery_address text;

create index orders_edition_id_idx
    on public.orders (edition_id);

-- ============================================================
-- ENTITLEMENTS
-- ============================================================

-- Entitlements represent protected digital access.
-- They therefore apply only to e-book purchases.
-- The existing book_id remains useful for identifying the book.

alter table public.entitlements
    add column edition_id uuid
        references public.book_editions(id)
        on delete restrict;

create index entitlements_edition_id_idx
    on public.entitlements (edition_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.book_editions enable row level security;

create policy "Anyone can view active book editions"
on public.book_editions
for select
to anon, authenticated
using (active = true);

-- No browser INSERT, UPDATE, or DELETE policy is created.
-- Product/edition management remains server/admin controlled.

-- ============================================================
-- COMMENTS
-- ============================================================

comment on table public.book_editions is
    'Sellable editions of a book, including digital and physical editions.';

comment on column public.book_editions.edition_type is
    'Product format. Supported values are ebook and hard_cover.';

comment on column public.orders.edition_id is
    'The exact book edition purchased in this order.';

comment on column public.orders.delivery_first_name is
    'First name of the person receiving a physical hard-cover delivery.';

comment on column public.orders.delivery_last_name is
    'Last name of the person receiving a physical hard-cover delivery.';

comment on column public.orders.delivery_phone is
    'Phone number used for physical delivery coordination.';

comment on column public.orders.delivery_email is
    'Email address associated with the physical-book delivery.';

comment on column public.orders.delivery_country is
    'Delivery country for a physical hard-cover order.';

comment on column public.orders.delivery_state_region is
    'Delivery state or region for a physical hard-cover order.';

comment on column public.orders.delivery_city is
    'Delivery city for a physical hard-cover order.';

comment on column public.orders.delivery_address is
    'Physical delivery address for a hard-cover order.';

comment on column public.entitlements.edition_id is
    'Digital edition that the authenticated customer is entitled to access.';
