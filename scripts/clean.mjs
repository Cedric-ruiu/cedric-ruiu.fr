import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

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
