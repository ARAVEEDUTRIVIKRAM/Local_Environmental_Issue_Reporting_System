-- V3__add_notification_columns.sql
ALTER TABLE notification
  ADD COLUMN IF NOT EXISTS "timestamp" timestamptz,
  ADD COLUMN IF NOT EXISTS read_flag boolean DEFAULT false;
