/**
 * Logo variants, derived from the SVG sources in assets/logos/ (ratio comes
 * from each file's viewBox, never hand-copied). A .js data file rather than
 * YAML because it reads the filesystem.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "assets",
  "logos",
);

// hasText marks lockups that spell out "cédric ruiu", so the partial can default
// their accessible name to the site name and leave the symbol-only one decorative.
const variants = {
  full: { file: "logo.svg", hasText: true }, // symbol + wordmark + baseline
  default: { file: "logo-light.svg", hasText: true }, // symbol + wordmark
  mark: { file: "logo-mark.svg", hasText: false }, // symbol alone
};

export default function () {
  return Object.fromEntries(
    Object.entries(variants).map(([name, variant]) => {
      const file = path.join(sourceDir, variant.file);
      const svg = fs.readFileSync(file, "utf8");

      const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
      if (!viewBox) {
        throw new Error(`Logo source ${variant.file} has no viewBox.`);
      }

      const [, , width, height] = viewBox
        .trim()
        .split(/[\s,]+/)
        .map(Number);
      if (!(width > 0 && height > 0)) {
        throw new Error(
          `Logo source ${variant.file} has a degenerate viewBox.`,
        );
      }

      // Drop the source's own <svg> wrapper: the partial writes its own with
      // the sizing, colour and accessibility attributes it needs.
      const body = svg
        .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
        .replace(/<\/svg>[\s\S]*$/, "")
        .trim();

      return [name, { ...variant, viewBox, ratio: width / height, body }];
    }),
  );
}
