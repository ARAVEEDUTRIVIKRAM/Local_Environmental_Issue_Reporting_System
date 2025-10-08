-- V6__fix_user_roles_bigint_and_roleid.sql
-- Convert user_roles.user_id to bigint and add role_id (if missing).
-- Conditionally add foreign keys only if referenced tables exist.

-- 1) Drop FK to users if exists (we will recreate it after type change)
ALTER TABLE IF EXISTS public.user_roles
  DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;

-- 2) Ensure user_roles.user_id column exists and convert to bigint
-- If column doesn't exist this statement will error; we check first in DO block
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'user_roles' AND column_name = 'user_id'
  ) THEN
    EXECUTE 'ALTER TABLE public.user_roles ALTER COLUMN user_id TYPE bigint USING user_id::bigint';
  END IF;
END
$$;

-- 3) Add role_id column if missing (bigint). Do not fail if exists.
ALTER TABLE IF EXISTS public.user_roles
  ADD COLUMN IF NOT EXISTS role_id bigint;

-- 4) If there is a role/roles table with id column, ensure role id types match.
DO $$
BEGIN
  -- If there's a roles table, ensure its id is bigint (best-effort)
  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'r' AND relname = 'roles') THEN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='roles' AND column_name='id' AND data_type='integer') THEN
      EXECUTE 'ALTER TABLE public.roles ALTER COLUMN id TYPE bigint USING id::bigint';
      -- also attempt to convert dependent sequences if named roles_id_seq
      IF EXISTS (SELECT 1 FROM pg_class WHERE relkind='S' AND relname='roles_id_seq') THEN
        EXECUTE 'ALTER SEQUENCE public.roles_id_seq AS bigint';
        EXECUTE 'ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id';
      END IF;
    END IF;
    -- create FK from user_roles.role_id -> roles.id if not exists
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conrelid = 'public.user_roles'::regclass AND conname = 'user_roles_role_id_fkey'
    ) THEN
      EXECUTE 'ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE';
    END IF;
  END IF;

  -- If there's a table named role (singular), do the same
  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'r' AND relname = 'role') THEN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='role' AND column_name='id' AND data_type='integer') THEN
      EXECUTE 'ALTER TABLE public.role ALTER COLUMN id TYPE bigint USING id::bigint';
      IF EXISTS (SELECT 1 FROM pg_class WHERE relkind='S' AND relname='role_id_seq') THEN
        EXECUTE 'ALTER SEQUENCE public.role_id_seq AS bigint';
        EXECUTE 'ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id';
      END IF;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conrelid = 'public.user_roles'::regclass AND conname = 'user_roles_role_id_fkey'
    ) THEN
      EXECUTE 'ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE';
    END IF;
  END IF;

  -- Recreate FK from user_roles.user_id -> users.id if not exists and users table exists
  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'r' AND relname = 'users') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conrelid = 'public.user_roles'::regclass AND conname = 'user_roles_user_id_fkey'
    ) THEN
      EXECUTE 'ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE';
    END IF;
  END IF;
END
$$;
