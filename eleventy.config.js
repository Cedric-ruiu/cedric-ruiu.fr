import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Image from "@11ty/eleventy-img";
import tailwindcss from "@tailwindcss/postcss";
import { minify as minifyHtml } from "html-minifier-terser";
import postcss from "postcss";
import YAML from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Only the stylesheet sitting directly in this directory is compiled and
// emitted; anything else under src/ that ends in .css is treated as a partial.
const cssEntryDir = path.join(__dirname, "src", "assets", "css");

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml,yaml", (contents) =>
    YAML.parse(contents),
  );

  eleventyConfig.addTemplateFormats("css");

  const isServe = process.env.ELEVENTY_RUN_MODE === "serve";
  const processor = postcss([
    tailwindcss({ optimize: isServe ? false : { minify: true } }),
  ]);

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    // Eleventy keys its compile cache on the input file contents, but Tailwind's
    // output depends on every scanned template — without this, editing a .njk
    // would serve stale CSS in dev. Same reason --incremental must never run:
    // the stylesheet has to be reprocessed on every build.
    compileOptions: { cache: false },
    compile: async function (inputContent, inputPath) {
      const basename = path.basename(inputPath);
      const absoluteDir = path.resolve(path.dirname(inputPath));

      // Skip partials (leading underscore) and anything outside the entry dir.
      if (basename.startsWith("_") || absoluteDir !== cssEntryDir) return;

      // Dev-only quirk: the Tailwind plugin's module-level cache keeps a class
      // deleted from a template in the stylesheet until `yarn dev` restarts.
      // Harmless, and `yarn build` runs in a cold process so it's always exact.
      const result = await processor.process(inputContent, {
        from: inputPath,
        to: undefined,
      });

      // Let Eleventy watch the stylesheets pulled in via @import.
      const dependencies = result.messages
        .filter((message) => message.type === "dependency")
        .map((message) => message.file);
      if (dependencies.length) {
        this.addDependencies(inputPath, dependencies);
      }

      return async () => result.css;
    },
  });

  // Skipped during `yarn dev` so the served markup stays readable. minifyJS/
  // minifyCSS stay off: there's no inline JS beyond the JSON-LD block and no
  // <style>, so both would touch nothing.
  if (!isServe) {
    eleventyConfig.addTransform("html-minify", async function (content) {
      const { outputPath } = this;
      // `permalink: false` yields false, and sitemap.njk writes .xml — both
      // have to come back untouched rather than empty.
      if (typeof outputPath !== "string" || !outputPath.endsWith(".html")) {
        return content;
      }

      return minifyHtml(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
        // Without this the inline SVG icons' camelCase viewBox gets lowercased,
        // breaking every pictogram.
        caseSensitive: true,
        minifyJS: false,
        minifyCSS: false,
      });
    });
  }

  // Everything in public/ lands at the root of _site/ (CNAME, robots.txt…).
  eleventyConfig.addPassthroughCopy({ public: "." });
  // Images live next to the page that uses them, and ship exactly as authored.
  // Deliberately not recursive: src/portfolio/*.webp are `responsiveImage`
  // sources, whose AVIF/WebP rungs are written to /img/g/ instead. Copying them
  // as well would publish 172 kB of duplicates no page ever links to. A future
  // page folder holding images served as-is needs its own line here.
  eleventyConfig.addPassthroughCopy(
    "src/*.{webp,avif,jpg,jpeg,png,svg,gif,ico}",
  );

  // assets/logos/ sits outside src/ and _data/, so Eleventy wouldn't otherwise
  // notice the SVGs changing during `yarn dev` (they're read by _data/logos.js).
  eleventyConfig.addWatchTarget("assets/logos");

  eleventyConfig.addLayoutAlias("base", "base.njk");

  // "0637844729" → "06 37 84 47 29", grouped with NO-BREAK SPACE (U+00A0): a
  // regular space would let the number wrap mid-way down a narrow column.
  eleventyConfig.addFilter("phoneDisplay", (raw) =>
    String(raw ?? "")
      .replace(/\D/g, "")
      .replace(/(\d{2})(?=\d)/g, "$1 ")
      .trim(),
  );

  // "0637844729" → "+33637844729" (E.164, for tel: links and JSON-LD)
  eleventyConfig.addFilter("phoneE164", (raw) => {
    const digits = String(raw ?? "").replace(/\D/g, "");
    return digits.startsWith("0") ? `+33${digits.slice(1)}` : `+${digits}`;
  });

  // "/portfolio/" → "https://cedric-ruiu.fr/portfolio/" (canonical, OG, sitemap)
  eleventyConfig.addFilter(
    "absoluteUrl",
    (url, base) => new URL(url ?? "/", base).href,
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Images are referenced by public URL ("/portfolio/gyp-sum.webp"), mapping
  // 1:1 onto a path under src/. `hasImage` lets a template fall back to a
  // fixed-ratio placeholder instead of a broken <img> when a file is missing —
  // the placeholder markup itself stays in the template, since Tailwind only
  // scans src/, _includes/ and _data/, not this file.
  const imageSource = (url) =>
    path.join(__dirname, "src", String(url ?? "").replace(/^\//, ""));

  eleventyConfig.addFilter(
    "hasImage",
    (url) => Boolean(url) && fs.existsSync(imageSource(url)),
  );

  // No JPEG rung: measured on the six portfolio screenshots, AVIF+WebP already
  // cover every browser that understands <picture>, and a JPEG fallback would
  // only add unused build output.
  eleventyConfig.addAsyncShortcode(
    "responsiveImage",
    async (url, alt, { sizes, className = "", eager = false } = {}) => {
      const source = imageSource(url);
      if (!fs.existsSync(source)) return "";

      const metadata = await Image(source, {
        // The screenshots are authored at 800px and eleventy-img never upscales,
        // so anything above that rung would silently produce nothing.
        widths: [480, 640, 800],
        formats: ["avif", "webp"],
        outputDir: path.join(__dirname, "_site", "img", "g"),
        urlPath: "/img/g/",
      });

      return Image.generateHTML(metadata, {
        alt,
        sizes,
        class: className,
        loading: eager ? "eager" : "lazy",
        decoding: "async",
        ...(eager ? { fetchpriority: "high" } : {}),
      });
    },
  );

  // No pathPrefix, ever: the custom domain serves the site from the root.
  return {
    dir: {
      input: "src",
      includes: "../_includes",
      layouts: "../_includes/layouts",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
