-- V9__convert_notification_id_to_bigint.sql
-- Converts notification.id from SERIAL (int) → BIGSERIAL (bigint) safely

DO $$
BEGIN
  -- Only run if notification.id currently exists and is integer
  IF EXISTS (
    SELECT 1
      FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'notification'
       AND column_name = 'id'
       AND data_type = 'integer'
  ) THEN

    -- Detach sequence (if exists)
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'notification_id_seq') THEN
      EXECUTE 'ALTER SEQUENCE public.notification_id_seq OWNED BY NONE';
      EXECUTE 'ALTER SEQUENCE public.notification_id_seq AS bigint';
    ELSE
      -- create bigint sequence if missing
      EXECUTE 'CREATE SEQUENCE IF NOT EXISTS public.notification_id_seq AS bigint START WITH 1';
    END IF;

    -- Convert the column
    EXECUTE 'ALTER TABLE public.notification ALTER COLUMN id TYPE bigint USING id::bigint';

    -- Re-attach sequence ownership
    EXECUTE 'ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id';

    -- Adjust next sequence value to max(id) + 1
    PERFORM setval('public.notification_id_seq', COALESCE((SELECT MAX(id) FROM public.notification),0) + 1, false);

    -- Restore default
    EXECUTE 'ALTER TABLE public.notification ALTER COLUMN id SET DEFAULT nextval(''public.notification_id_seq''::regclass)';
  END IF;
END
$$;
