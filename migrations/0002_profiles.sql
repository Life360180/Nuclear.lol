create table if not exists profiles (
  id serial primary key,
  user_id text not null unique,
  username text not null unique,
  display_name text not null default '',
  bio text not null default '',
  location text not null default '',
  avatar_url text not null default '',
  published boolean not null default true,
  views integer not null default 0,
  theme text not null default '{}',
  links text not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_views_idx on profiles (views desc);
create index if not exists profiles_published_idx on profiles (published);
