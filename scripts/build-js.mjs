/**
 * Minifies the hand-written scripts from assets/js/ into public/js/.
 *
 * Has to run as a script rather than an Eleventy transform: public/ is served
 * by addPassthroughCopy, and passthrough copies bypass the transform pipeline
 * entirely. Property mangling stays off (terser's default): the scripts read
 * DOM properties by name, and renaming those breaks them silently.
 *
 * public/js/ is gitignored — runs as part of `yarn assets`.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { minify } from "terser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const sourceDir = path.join(rootDir, "assets", "js");
const outputDir = path.join(rootDir, "public", "js");

await fs.mkdir(outputDir, { recursive: true });
console.log("Minifying scripts to public/js/");

const entries = (await fs.readdir(sourceDir)).filter((name) =>
  name.endsWith(".js"),
);

for (const name of entries) {
  const source = await fs.readFile(path.join(sourceDir, name), "utf8");

  const result = await minify(source, {
    module: false, // classic script (IIFE), not a module
    ecma: 2020,
    compress: { passes: 2 },
    mangle: true,
    format: { comments: false },
  });

  if (!result.code) throw new Error(`terser returned nothing for ${name}`);

  await fs.writeFile(path.join(outputDir, name), result.code);
  console.log(
    `  ${name} — ${(source.length / 1024).toFixed(1)} kB → ${(result.code.length / 1024).toFixed(1)} kB`,
  );
}
