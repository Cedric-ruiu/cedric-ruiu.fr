import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const outputDir = path.join(rootDir, "public", "fonts");

const families = [
  {
    package: "@fontsource-variable/albert-sans",
    file: "albert-sans-latin-wght-normal.woff2",
    licenseAs: "OFL-AlbertSans.txt",
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
