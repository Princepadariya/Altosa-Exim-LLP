-- Inquiry storage for the buyer RFQ form.
--
-- Run this once in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- It is written to be re-runnable: every statement guards against already
-- existing, so applying it twice changes nothing.
--
-- The shape follows the rule that keeps this cheap and fast: rows in Postgres,
-- files in Storage. A drawing lives in the bucket and the row keeps only its
-- path. Putting a 4 MB DWG in a bytea column would bloat every backup, slow
-- every query that does not need the file, and eventually hit the row limits.

-- ---------------------------------------------------------------------------
-- 1. The table
-- ---------------------------------------------------------------------------

create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Who is asking
  full_name     text not null,
  email         text not null,
  company       text,
  phone         text,
  country       text,          -- ISO 3166-1 alpha-2, as the form submits it

  -- What they need
  industry            text,
  product_description text,
  drawing_reference   text,
  material            text,
  standard            text,
  quantity            text,
  inquiry_type        text,

  -- documentation is a multi-select. Stored as an array so it can be filtered
  -- on later ("show me everyone who asked for third-party inspection") rather
  -- than as a joined string that would have to be parsed back apart.
  documentation text[] default '{}',

  -- Commercial and delivery
  port_of_discharge text,
  incoterm          text,
  timeline          text,
  target_date       text,      -- free text: buyers write "end of Q2" as often as a date
  notes             text,

  -- The attachment. Path into the storage bucket, plus enough about the file
  -- to render a sensible row in the admin list without fetching the object.
  attachment_path  text,
  attachment_name  text,
  attachment_size  integer,
  attachment_type  text,

  -- Provenance and triage
  consent      boolean not null default false,
  source_page  text,
  status       text not null default 'new'
                 check (status in ('new', 'reading', 'quoted', 'declined', 'archived')),
  internal_note text
);

-- Newest first is the only listing the admin panel ever asks for.
create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

-- Triage views filter by status, then sort by date.
create index if not exists inquiries_status_created_at_idx
  on public.inquiries (status, created_at desc);

-- ---------------------------------------------------------------------------
-- 2. Row level security
-- ---------------------------------------------------------------------------
--
-- Enabling RLS with no permissive policy denies everything to the anon and
-- authenticated roles. That is the intent: nothing on the public internet may
-- read or write this table.
--
-- The serverless function writes with the service role key, which bypasses RLS
-- entirely, so it needs no policy. The admin panel reads as a signed-in user,
-- so it gets one explicit policy below.

alter table public.inquiries enable row level security;

-- Signed-in staff may read every inquiry. Add the policy only if it is absent,
-- since create policy has no "if not exists" form.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'inquiries'
      and policyname = 'authenticated can read inquiries'
  ) then
    create policy "authenticated can read inquiries"
      on public.inquiries for select
      to authenticated
      using (true);
  end if;
end $$;

-- Signed-in staff may triage: change status and leave an internal note.
-- Deliberately narrower than "for all" — nobody should be editing what the
-- buyer actually wrote, because the row is the record of what was submitted.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'inquiries'
      and policyname = 'authenticated can triage inquiries'
  ) then
    create policy "authenticated can triage inquiries"
      on public.inquiries for update
      to authenticated
      using (true)
      with check (true);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 3. The attachment bucket
-- ---------------------------------------------------------------------------
--
-- Private, not public. A buyer's drawing is their commercial property, and a
-- public bucket means anyone who guesses a path can read it. The admin panel
-- downloads through a signed URL that expires.

insert into storage.buckets (id, name, public, file_size_limit)
values ('inquiry-attachments', 'inquiry-attachments', false, 4718592)  -- 4.5 MB
on conflict (id) do nothing;

-- Signed-in staff may read objects in that bucket. Uploads come from the
-- serverless function on the service role key, so no insert policy is needed.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'authenticated can read inquiry attachments'
  ) then
    create policy "authenticated can read inquiry attachments"
      on storage.objects for select
      to authenticated
      using (bucket_id = 'inquiry-attachments');
  end if;
end $$;
