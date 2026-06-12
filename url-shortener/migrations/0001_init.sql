-- Cloudflare D1 schema for the url-shortener demo (SQLite).
-- Apply with: bunx wrangler d1 migrations apply url-shortener
--
-- The current Express runtime keeps the last URL in memory (per the FCC spec);
-- this table is the D1 (edge SQLite) demo path for persisting many short URLs,
-- as noted in the README's engineering-decisions section.

CREATE TABLE IF NOT EXISTS urls (
  short_url    INTEGER PRIMARY KEY AUTOINCREMENT,
  original_url TEXT NOT NULL UNIQUE
);
