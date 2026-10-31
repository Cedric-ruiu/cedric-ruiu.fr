import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const BACKGROUND = { r: 0, g: 46, b: 69, alpha: 1 };

const source = await fs.readFile(
  path.join(rootDir, "assets", "logos", "logo.svg"),
  "utf8",
);
const artwork = Buffer.from(source.replaceAll("currentColor", "#ffffff"));

async function render({ file, width, height, logoWidth }) {
  const logo = await sharp(artwork)
    .resize({ width: logoWidth })
    .png()
    .toBuffer();

  const { size } = await sharp({
    create: { width, height, channels: 4, background: BACKGROUND },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(rootDir, file));

  console.log(`${file} — ${width}×${height}, ${(size / 1024).toFixed(1)} kB`);
}

await render({
  file: path.join("public", "og.png"),
  width: 1200,
  height: 630,
  logoWidth: 760,
});

await render({
  file: path.join("assets", "banner.png"),
  width: 838,
  height: 280,
  logoWidth: 400,
});
