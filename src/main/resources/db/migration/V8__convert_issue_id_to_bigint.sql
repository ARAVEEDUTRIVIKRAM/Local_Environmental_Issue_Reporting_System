-- V8__convert_issue_id_to_bigint.sql
-- Converts public.issue.id from integer -> bigint safely (preserves data and sequence)
DO $$
BEGIN
  -- Only run if issue.id currently exists and is integer (serial)
  IF EXISTS (
    SELECT 1
      FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'issue'
       AND column_name = 'id'
       AND data_type = 'integer'
  ) THEN

    -- If sequence exists, convert it to bigint; otherwise create a bigint sequence.
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'issue_id_seq') THEN
      BEGIN
        EXECUTE 'ALTER SEQUENCE public.issue_id_seq AS bigint';
      EXCEPTION WHEN others THEN
        -- ignore if cannot convert (rare)
      END;
    ELSE
      EXECUTE 'CREATE SEQUENCE IF NOT EXISTS public.issue_id_seq AS bigint START WITH 1';
      -- set nextval based on current max id later
    END IF;

    -- Convert the column type preserving values
    EXECUTE 'ALTER TABLE public.issue ALTER COLUMN id TYPE bigint USING id::bigint';

    -- Attach the sequence to the column and set default
    EXECUTE 'ALTER SEQUENCE public.issue_id_seq OWNED BY public.issue.id';

    -- Ensure the sequence value will continue from the max(id)+1
    PERFORM setval('public.issue_id_seq', COALESCE((SELECT MAX(id) FROM public.issue),0) + 1, false);

    EXECUTE 'ALTER TABLE public.issue ALTER COLUMN id SET DEFAULT nextval(''public.issue_id_seq''::regclass)';

  END IF;
END
$$;
