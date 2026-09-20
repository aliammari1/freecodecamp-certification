// gen-openapi.js — writes the swagger-jsdoc spec to openapi.json for
// Spectral linting and Schemathesis contract testing.
const fs = require("node:fs");
const path = require("node:path");
const { specs } = require("./swagger");

const out = path.join(__dirname, "openapi.json");
fs.writeFileSync(out, JSON.stringify(specs, null, 2));
console.log(`Wrote ${out}`);
