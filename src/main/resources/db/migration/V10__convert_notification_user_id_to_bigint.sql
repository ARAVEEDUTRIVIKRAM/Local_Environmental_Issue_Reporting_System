-- V10__convert_notification_user_id_to_bigint.sql
-- Converts notification.user_id from INTEGER → BIGINT safely

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
      FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'notification'
       AND column_name = 'user_id'
       AND data_type = 'integer'
  ) THEN
    EXECUTE 'ALTER TABLE public.notification ALTER COLUMN user_id TYPE bigint USING user_id::bigint';
  END IF;
END
$$;
