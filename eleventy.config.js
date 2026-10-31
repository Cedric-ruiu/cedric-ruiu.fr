import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Image from "@11ty/eleventy-img";
import tailwindcss from "@tailwindcss/postcss";
import { minify as minifyHtml } from "html-minifier-terser";
import postcss from "postcss";
import YAML from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    compileOptions: { cache: false },
    compile: async function (inputContent, inputPath) {
      const basename = path.basename(inputPath);
      const absoluteDir = path.resolve(path.dirname(inputPath));

      if (basename.startsWith("_") || absoluteDir !== cssEntryDir) return;

      const result = await processor.process(inputContent, {
        from: inputPath,
        to: undefined,
      });

      const dependencies = result.messages
        .filter((message) => message.type === "dependency")
        .map((message) => message.file);
      if (dependencies.length) {
        this.addDependencies(inputPath, dependencies);
      }

      return async () => result.css;
    },
  });

  if (!isServe) {
    eleventyConfig.addTransform("html-minify", async function (content) {
      const { outputPath } = this;
      if (typeof outputPath !== "string" || !outputPath.endsWith(".html")) {
        return content;
      }

      return minifyHtml(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
        // Otherwise the minifier lowercases viewBox and breaks every inline SVG.
        caseSensitive: true,
        minifyJS: false,
        minifyCSS: false,
      });
    });
  }

  eleventyConfig.addTransform("french-spacing", function (content) {
    const { outputPath } = this;
    if (typeof outputPath !== "string" || !outputPath.endsWith(".html")) {
      return content;
    }

    let raw = false;
    return content
      .split(/(<[^>]*>)/)
      .map((part) => {
        if (part.startsWith("<")) {
          if (/^<(script|style)\b/i.test(part)) raw = true;
          else if (/^<\/(script|style)>/i.test(part)) raw = false;
          return part;
        }
        if (raw) return part;
        return part
          .replace(/ :/g, " :")
          .replace(/ ([;!?»])/g, " $1")
          .replace(/« /g, "« ");
      })
      .join("");
  });

  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addPassthroughCopy(
    "src/*.{webp,avif,jpg,jpeg,png,svg,gif,ico}",
  );

  eleventyConfig.addWatchTarget("assets/logos");

  eleventyConfig.addLayoutAlias("base", "base.njk");

  eleventyConfig.addFilter("phoneDisplay", (raw) =>
    String(raw ?? "")
      .replace(/\D/g, "")
      .replace(/(\d{2})(?=\d)/g, "$1 ")
      .trim(),
  );

  eleventyConfig.addFilter("phoneE164", (raw) => {
    const digits = String(raw ?? "").replace(/\D/g, "");
    return digits.startsWith("0") ? `+33${digits.slice(1)}` : `+${digits}`;
  });

  eleventyConfig.addFilter(
    "absoluteUrl",
    (url, base) => new URL(url ?? "/", base).href,
  );

  eleventyConfig.addFilter("navLinks", (nav, services) =>
    (nav ?? []).map((item) => {
      if (!item.service) return item;
      const service = (services ?? []).find((s) => s.key === item.service);
      if (!service)
        throw new Error(`Unknown service in site.nav: ${item.service}`);
      return { name: service.name, url: service.url, service: item.service };
    }),
  );

  eleventyConfig.amendLibrary("md", (md) => {
    const slugify = eleventyConfig.getFilter("slugify");
    md.core.ruler.push("h2-ids", (state) => {
      state.tokens.forEach((token, i) => {
        if (token.type !== "heading_open" || token.tag !== "h2") return;
        const text = state.tokens[i + 1].children
          .filter(
            (child) => child.type === "text" || child.type === "code_inline",
          )
          .map((child) => child.content)
          .join("");
        token.attrSet("id", slugify(text));
      });
    });
  });

  eleventyConfig.addFilter("headings", (html) =>
    [...String(html ?? "").matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map(
      ([, id, text]) => ({ id, text: text.replace(/<[^>]+>/g, "").trim() }),
    ),
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const imageSource = (url) =>
    path.join(__dirname, "src", String(url ?? "").replace(/^\//, ""));

  eleventyConfig.addFilter(
    "hasImage",
    (url) => Boolean(url) && fs.existsSync(imageSource(url)),
  );

  eleventyConfig.addAsyncShortcode(
    "responsiveImage",
    async (url, alt, { sizes, className = "", eager = false } = {}) => {
      const source = imageSource(url);
      if (!fs.existsSync(source)) return "";

      const metadata = await Image(source, {
        widths: [480, 640, 800, 1200, 1600],
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
