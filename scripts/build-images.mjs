/**
 * Rasterises the two pixel assets derived from assets/logos/logo.svg — the only
 * ones that still need pixels, since neither social crawlers nor GitHub's
 * README renderer will take an inline SVG.
 *
 *   public/og.png    1200×630  social preview card, gitignored (build output)
 *   assets/banner.png 838×280  README header, TRACKED by git
 *
 * The banner is committed on purpose: GitHub renders README.md straight from
 * the repository, where build outputs do not exist. It is still generated here
 * rather than drawn by hand so it can never drift from the logo — same rule as
 * _data/logos.js deriving every viewBox from the source SVG.
 *
 * Runs as the last step of `yarn assets`, chained ahead of Eleventy in both
 * `dev` and `build` (Yarn 4 does not run `pre*` hooks).
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// The ocean-deep background is flattened in (not left transparent): several
// clients composite transparency onto black, which would swallow a white
// wordmark. PNG rather than WebP: crawler support for WebP previews is still
// uneven, and neither file counts against the page budget.
const BACKGROUND = { r: 0, g: 46, b: 69, alpha: 1 };

// currentColor is meaningless to a rasteriser (librsvg resolves it to black),
// so substitute white directly — the rasteriser's equivalent of a text-* utility.
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

// 1200×630 is the box social platforms crop to.
await render({
  file: path.join("public", "og.png"),
  width: 1200,
  height: 630,
  logoWidth: 760,
});

// 838px is the content width GitHub renders a README at, so the banner is
// served 1:1 with no browser downscaling.
await render({
  file: path.join("assets", "banner.png"),
  width: 838,
  height: 280,
  logoWidth: 480,
});
