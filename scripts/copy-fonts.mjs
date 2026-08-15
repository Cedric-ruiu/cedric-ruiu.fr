/**
 * Copies the self-hosted webfonts out of node_modules into public/fonts/.
 *
 * Only the `latin` subset is shipped — it covers every character French needs.
 * The Fontsource CSS files are NOT imported: they also declare cyrillic, greek,
 * vietnamese and latin-ext, which would multiply requests. @font-face is
 * hand-written in src/assets/css/main.css instead.
 *
 * public/fonts/ is gitignored — runs as the first step of `yarn dev`/`yarn build`.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const outputDir = path.join(rootDir, "public", "fonts");

const families = [
  {
    package: "@fontsource-variable/bitter",
    file: "bitter-latin-wght-normal.woff2",
    licenseAs: "OFL-Bitter.txt",
  },
  {
    package: "@fontsource-variable/manrope",
    file: "manrope-latin-wght-normal.woff2",
    licenseAs: "OFL-Manrope.txt",
  },
];

async function copy(from, to) {
  await fs.copyFile(from, to);
  const { size } = await fs.stat(to);
  console.log(`  ${path.basename(to)} — ${(size / 1024).toFixed(1)} kB`);
}

await fs.mkdir(outputDir, { recursive: true });
console.log("Copying webfonts to public/fonts/");

for (const family of families) {
  const packageDir = path.join(rootDir, "node_modules", family.package);

  try {
    await fs.access(packageDir);
  } catch {
    throw new Error(
      `${family.package} is not installed — run \`yarn install\` first.`,
    );
  }

  await copy(
    path.join(packageDir, "files", family.file),
    path.join(outputDir, family.file),
  );
  await copy(
    path.join(packageDir, "LICENSE"),
    path.join(outputDir, family.licenseAs),
  );
}
