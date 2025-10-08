-- V5__convert_users_id_to_bigint.sql
-- Convert users.id (serial/int) -> bigint safely and keep sequence ownership

-- 1) Make sequence bigint (sequence must exist)
ALTER SEQUENCE IF EXISTS public.users_id_seq OWNED BY NONE;

-- Change sequence type to bigint (Postgres supports ALTER SEQUENCE ... AS)
-- If sequence does not exist this will fail; we use IF EXISTS above to detach first
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'users_id_seq') THEN
    EXECUTE 'ALTER SEQUENCE public.users_id_seq AS bigint';
  END IF;
END
$$;

-- 2) Alter users.id column to bigint (safe conversion using USING)
ALTER TABLE IF EXISTS public.users
  ALTER COLUMN id TYPE bigint USING id::bigint;

-- 3) Re-attach sequence ownership (if sequence exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'users_id_seq') THEN
    EXECUTE 'ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id';
  END IF;
END
$$;
