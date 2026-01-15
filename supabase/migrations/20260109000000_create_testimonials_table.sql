-- Create the testimonials table
create table public.testimonials (
  id uuid not null default gen_random_uuid (),
  client_name text not null,
  client_position text null,
  company text null,
  testimonial_text text not null,
  rating integer null default 5,
  featured boolean null default false,
  created_at timestamp with time zone not null default now(),
  constraint testimonials_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.testimonials enable row level security;

-- Create policies
create policy "Enable read access for all users"
on public.testimonials
for select
using (true);

create policy "Enable insert for authenticated users only"
on public.testimonials
for insert
to authenticated
with check (true);

create policy "Enable update for authenticated users only"
on public.testimonials
for update
to authenticated
using (true);

create policy "Enable delete for authenticated users only"
on public.testimonials
for delete
to authenticated
using (true);
