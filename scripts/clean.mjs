/**
 * Empties every build output before a build: _site/, and the generated parts of
 * public/ that `yarn assets` writes.
 *
 * Eleventy never clears its output directory, so a file that stops being
 * generated lingers there — masking a reference that would 404 in production
 * (CI never sees it, since it always builds from a fresh checkout). The same
 * applies one directory over: public/ mixes hand-versioned files with generated
 * ones, and a stale generated file there is copied straight to the site root by
 * the passthrough. This repository has already carried a public/js/lightbox.js
 * long after its source was gone.
 *
 * Chained ahead of `yarn build` (Yarn 4 does not run `pre*` hooks), and always
 * followed by `yarn assets`, which rewrites everything listed below. Skipped by
 * `yarn dev`: wiping under a continuously rebuilding dev server costs a full
 * reload for no benefit.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Keep in step with .gitignore: these are exactly the paths `yarn assets`
// produces. Everything else in public/ is versioned by hand.
const generated = [
  "_site",
  path.join("public", "fonts"),
  path.join("public", "js"),
  path.join("public", "og.png"),
];

for (const target of generated) {
  await fs.rm(path.join(rootDir, target), { recursive: true, force: true });
}

console.log(`Cleaned ${generated.join(", ")}`);
