ALTER TABLE issue
  ADD COLUMN IF NOT EXISTS category varchar(255),
  ADD COLUMN IF NOT EXISTS image_filename text,
  ADD COLUMN IF NOT EXISTS created_by bigint,
  ADD COLUMN IF NOT EXISTS assigned_to bigint;
