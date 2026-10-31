import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "assets",
  "logos",
);

const variants = {
  full: { file: "logo.svg", hasText: true },
  default: { file: "logo-light.svg", hasText: true },
  mark: { file: "logo-mark.svg", hasText: false },
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

      const body = svg
        .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
        .replace(/<\/svg>[\s\S]*$/, "")
        .trim();

      return [name, { ...variant, viewBox, ratio: width / height, body }];
    }),
  );
}
