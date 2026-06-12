-- Cloudflare D1 schema for the exercise-tracker demo (SQLite).
-- This is the D1 (edge SQLite) equivalent of the MongoDB model used by the
-- Express runtime. Apply with:
--   bunx wrangler d1 migrations apply exercise-tracker
--
-- The primary runtime still uses MongoDB (see app.js); D1 is provided as the
-- documented Cloudflare-native demo path noted in the README.

CREATE TABLE IF NOT EXISTS users (
  id       TEXT PRIMARY KEY,
  username TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  duration    INTEGER NOT NULL,
  date        TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_exercises_user_id ON exercises(user_id);
