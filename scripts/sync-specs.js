// sync-specs.js — copy each service's generated openapi.json into docs/specs/
// so the Mintlify site is self-contained. Run after `bun run openapi`.
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const services = [
  "exercise-tracker",
  "file-metadata",
  "header-parser",
  "timestamp",
  "url-shortener",
];

const outDir = path.join(root, "docs", "specs");
fs.mkdirSync(outDir, { recursive: true });

for (const svc of services) {
  const src = path.join(root, svc, "openapi.json");
  if (!fs.existsSync(src)) {
    throw new Error(`Missing ${src}; run "bun run openapi" first.`);
  }
  fs.copyFileSync(src, path.join(outDir, `${svc}.json`));
  console.log(`synced ${svc}.json`);
}
