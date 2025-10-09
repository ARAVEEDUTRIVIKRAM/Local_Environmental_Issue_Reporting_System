-- V4__add_issue_category.sql
ALTER TABLE issue
  ADD COLUMN IF NOT EXISTS category varchar(50);
