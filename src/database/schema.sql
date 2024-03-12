create table if not exists projects (
  id serial primary key,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone,
  name text
)

create type issue_type as enum (
  'TASK',
  'IDEA',
  'STORY',
  'BUG',
  'CONCERN'
);

create type issue_status as enum (
  'CREATED',
  'STARTED',
  'PAUSED',
  'DONE',
  'CLOSED'
);

create table if not exists issues (
  id serial primary key,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone,
  created_by uuid references auth.users not null,

  type issue_type not null,
  status issue_status not null default 'CREATED',
  title text not null,
  description text,
  assignee uuid references auth.users,
  project_id int references projects,
  parent_id int references issues
)