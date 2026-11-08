<p align="center">
  <img src="assets/banner.png" alt="Cédric Ruiu — website, référencement, performance" width="838">
</p>

<h1 align="center">cedric-ruiu.fr</h1>

<p align="center">
  The website of <strong>Cédric Ruiu</strong>, freelance web developer.<br>
  Static, dependency-free at runtime, and built to the performance budget it advertises.
</p>

<p align="center">
  <a href="https://github.com/Cedric-ruiu/cedric-ruiu.fr/actions/workflows/deploy.yml"><img src="https://github.com/Cedric-ruiu/cedric-ruiu.fr/actions/workflows/deploy.yml/badge.svg" alt="Deploy to GitHub Pages"></a>
  <img src="https://img.shields.io/badge/Lighthouse-100%2F100%2F100-1e6c8e?style=flat-square&logo=lighthouse&logoColor=white" alt="Lighthouse mobile: 100 performance, 100 accessibility, 100 best practices">
  <img src="https://img.shields.io/badge/Eleventy-3.1-1e6c8e?style=flat-square&logo=eleventy&logoColor=white" alt="Eleventy 3.1">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-1e6c8e?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4.3">
  <img src="https://img.shields.io/badge/Node.js-22_LTS-1e6c8e?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 22 LTS">
  <img src="https://img.shields.io/badge/code-MIT-1e6c8e?style=flat-square&logo=opensourceinitiative&logoColor=white" alt="Source code under the MIT licence">
</p>

---

## Overview

A twelve-page site — home, five service pages, portfolio, a visibility guide, contact, thank-you, legal notice, 404 — for a freelance web
developer working with tradespeople, sole traders and very small businesses, based in Brittany and
serving the whole of France.

The brief was self-imposed and set before the first line of code: a site that sells speed and
search visibility has no business being slow, breaking on a cheap phone, or dropping a cookie it
does not need. Everything below follows from that.

- **No runtime dependencies.** No framework, no CDN, no third-party script. Two small hand-written
  scripts are all the JavaScript the site itself needs — the menu and the off-screen pause of
  the underwater scenes, 1.5 kB on the wire together — beside a small audience-measurement script,
  and every page works without any of them: the menu button is only revealed
  once its script runs, and the footer carries the same navigation.
- **No tracking.** No pixel, no cookie, no third-party tracker — and therefore no consent banner.
  Audience is measured with a cookieless, privacy-friendly tool run by the site owner: aggregate,
  anonymous statistics only, shared with no one.
- **A budget, not an aspiration.** 300 kB per page on mobile, images included. The heaviest page
  currently uses 68 % of it; the home page, 26 %.
- **Motion that never leaves the compositor.** Every page opens under water: kelp fronds from the
  logo swaying around their holdfast, bubbles rising, sunlight coming down from the surface; the home
  page is a whole dive, from the surface to the seabed of the footer. `transform` and `opacity` only
  — no image, no library, Lighthouse still 100 and CLS still 0.000. Slow and discreet, it pauses on
  its own off screen, and it goes still under `prefers-reduced-motion`.
- **Mobile-first in the strict sense.** Unprefixed utilities are the mobile case; breakpoints only
  ever widen. Verified from 320 px up.
- **WCAG 2.1 AA.** Every colour pair in the palette is contrast-checked, form fields included.

## Measured results

Measured **2026-10-30** against the production build, served locally with gzip as in production,
under mobile emulation (Moto G Power, slow 4G, 4× CPU throttle). Lighthouse 13.6.0, median of three
runs.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Home | 100 | 100 | 100 | 100 | 0.91 s | 0 |
| Website creation | 100 | 100 | 100 | 100 | 0.91 s | 0 |
| SEO audit | 100 | 100 | 100 | 100 | 0.91 s | 0 |
| Web performance | 100 | 100 | 100 | 100 | 0.90 s | 0 |
| Website redesign | 100 | 100 | 100 | 100 | 0.90 s | 0 |
| Mobile app | 100 | 100 | 100 | 100 | 0.92 s | 0 |
| Portfolio | 100 | 100 | 100 | 100 | 1.88 s | 0 |
| Contact | 100 | 100 | 100 | 100 | 0.76 s | 0 |
| Visibility guide | 100 | 100 | 100 | 100 | 0.90 s | 0 |
| Legal notice | 100 | 100 | 100 | 100 | 0.76 s | 0 |
| 404 | 100 | 100 | 100 | 66 | 0.76 s | 0 |
| Thank-you | 100 | 100 | 100 | 66 | 0.77 s | 0 |

The 404 and thank-you pages are `noindex` by design, which Lighthouse scores down through its
`is-crawlable` audit. That is the intended outcome, not a defect.

| Page | Requests | Transferred | Budget used |
|---|---|---|---|
| Home | 10 | **79.5 kB** | 26 % |
| Website creation | 12 | 144.7 kB | 48 % |
| SEO audit | 9 | 70.6 kB | 24 % |
| Web performance | 11 | 121.7 kB | 41 % |
| Website redesign | 9 | 67.8 kB | 23 % |
| Mobile app | 11 | 93.6 kB | 31 % |
| Portfolio | 15 | 203.3 kB | 68 % |
| Contact | 9 | 62.3 kB | 21 % |
| Visibility guide | 9 | 65.4 kB | 22 % |
| Legal notice | 9 | 63.5 kB | 21 % |
| 404 | 9 | 61.2 kB | 20 % |
| Thank-you | 9 | 61.3 kB | 20 % |

Both tables were re-measured in full on **2026-10-30**, after the redesign: one variable typeface
instead of two (31.3 kB on the wire instead of 57.9), and every page opening in an animated
underwater band. The redesign left every page 15.8 to 18.8 kB lighter than on 2026-10-20; the
menu's gliding underline and its opening animation, added the same day, then took 0.9 to 1.2 kB
per page back, and the portfolio's sharper screenshots, retaken the same day, 2.4 to 9 kB on the
pages that show them (the app page lost 2.2 kB). The service pages'
charts — a Search Console curve, Core Web Vitals figures and a page-weight comparison — are inline
SVG and HTML, with no image and no request. The website creation page is the heaviest service page
because it shows three portfolio screenshots, lazy-loaded and counted here.

Both tables are deliberately pessimistic. The request count includes the manifest and the full icon
set, which Lighthouse fetches to test installability and a browser does not — a real client picks
one icon and caches it. The portfolio figure scrolls the whole page, so it counts all seven
screenshots, where a visitor who lands and stays put loads the first one or two.

One stylesheet per page, **48,725 bytes** minified and **10,623 bytes** over the wire (gzip -9). Two
scripts: the menu, **2,889 bytes** minified and **1,293 bytes** over the wire, and the scenes' off-screen
pause, **296 bytes** and **229 bytes**. On the home page the self-hosted typeface accounts for
31.3 kB, leaving 48 kB for the document, stylesheet, scripts, portrait and icons combined. The kelp
is 8.5 kB of inline path data: on the home page its copies sit next to each other, so gzip matches
each one after the first for about 150 bytes; every other page draws it once and repeats it through
`<use>`, a few bytes each.

## Stack

| Layer | Choice | Rationale |
|---|---|---|
| Static site generator | [Eleventy](https://www.11ty.dev/) 3 (ESM) | Six pages that change a few times a year need no database and no CMS to keep patched. Static HTML means nothing to execute server-side and free hosting. |
| Templating | Nunjucks + Markdown | Layouts hold the structure, prose stays in Markdown and is editable without tooling. |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4, CSS-first | No `tailwind.config.js`: the theme lives in `@theme`, in standard CSS. Only classes actually present in the templates are emitted. |
| Colour | Native **OKLCH** tokens | Perceptually uniform, so adjusting a hue does not silently break a contrast ratio — which matters when the whole palette must hold AA. |
| Content data | YAML in `_data/` | Copy and projects are data, not code. Raw values only; every derived form is an Eleventy filter, so there is one source of truth. |
| JavaScript | None, beyond two hand-written files | The mobile menu and the off-screen pause of the underwater scenes. Portfolio tiles are links and the contact form is a plain `POST`. |
| Fonts | Albert Sans, self-hosted | Variable, latin subset, 31.3 kB. No Google Fonts request, so no user data leaves the site. |
| Contact form | [Web3Forms](https://web3forms.com/) | Static hosting cannot send mail. Web3Forms takes the POST and forwards it, without JavaScript and without a cookie. |
| Hosting | GitHub Pages + GitHub Actions | Free, HTTPS included, CDN-served. The repository is the source of truth: a merge deploys, and the Git history is the site's history. |
| Tooling | [Biome](https://biomejs.dev/) 2 | One tool for JS, CSS and JSON, in a fraction of the ESLint + Prettier runtime. |

## Getting started

Requires **Node 22** (see `.nvmrc`) and **Yarn 4** via Corepack. This project uses neither `npm` nor
`npx`.

```bash
git clone https://github.com/Cedric-ruiu/cedric-ruiu.fr.git
cd cedric-ruiu.fr
corepack enable
yarn install
yarn dev          # http://localhost:8080, live reload
```

| Command | Effect |
|---|---|
| `yarn dev` | Builds assets, then serves with live reload. |
| `yarn build` | Empties `_site/`, builds assets, writes the production site to `_site/`. |
| `yarn assets` | Fonts, minified script and generated images. Called by `dev` and `build`. |
| `yarn lint` | Biome check. |
| `yarn format` | Biome formatting and safe fixes. |

> Never run Eleventy with `--incremental`. The stylesheet would stop being regenerated when a
> template changes, and the dev server would serve a stale one.

## Structure

```
.
├── _data/                    # YAML content and constants — where the copy lives
│   ├── site.yml              #   identity, contact details, navigation, legal notice
│   ├── home.yml              #   every string on the home page
│   ├── projects.yml          #   portfolio entries
│   └── logos.js              #   logo variants, derived from the SVG sources
├── _includes/
│   ├── layouts/              # base layout plus one per page type
│   └── partials/             # header, footer, logo, icons, the kelp, the section list
├── src/                      # Eleventy input: pages, images, stylesheet, sitemap
│   ├── index.md              #   home
│   ├── portfolio/            #   page + seven screenshots
│   ├── contact/              #   form page + thank-you page
│   ├── mentions-legales/     #   legal notice
│   ├── 404.md
│   ├── sitemap.njk
│   └── assets/css/main.css   #   the entire Tailwind theme: palette, scale, components
├── assets/
│   ├── logos/                # three SVG sources, inlined into the HTML
│   ├── js/                   # menu and off-screen scene pause, minified at build
│   └── banner.png            # this file's header, rendered from logo.svg
├── public/                   # copied verbatim to the site root
│   ├── CNAME robots.txt favicon.* site.webmanifest
│   └── fonts/ js/ og.png     # generated at build, not versioned
├── scripts/                  # clean · copy-fonts · build-js · build-images
├── eleventy.config.js        # filters, shortcodes, CSS compilation, HTML minification
└── .github/workflows/deploy.yml
```

The logos are **inlined into the HTML rather than referenced as `<img>`**. All three SVGs are
painted `fill="currentColor"` and carry no colour of their own, so a single file serves both light
and dark backgrounds, tinted by a utility class at the call site. An externally referenced SVG would
resolve `currentColor` against its own document and render black on the dark blue header.

## Editing content

Copy lives in `_data/`, so most changes touch no template at all.

| To change | Edit |
|---|---|
| Home page copy | `_data/home.yml` |
| Email, phone, town, navigation, form subject | `_data/site.yml` |
| Portfolio entries | `_data/projects.yml` |
| Body text of a page | The corresponding `.md` file under `src/` |
| A page's `title` or `description` | The front matter of that `.md` file |

Adding a project means dropping a 1600×1000 screenshot into `src/portfolio/` and appending a
block to `_data/projects.yml`. Capture it at twice the CSS width, in a 16:10 window, at the
narrowest width where the site still shows its desktop menu: the text then reads at its largest
in the frame, which is 16:10 too and crops from the top if a source runs taller. The build derives
the AVIF and WebP variants at 480 / 640 / 800 / 1200 / 1600 px — the top rungs for 2x and 3x
screens — so no manual compression is needed, and the sources themselves are never copied to the
output. A project without a screenshot renders a neutral
fixed-ratio placeholder, so nothing shifts on the day the image arrives.

## Deployment

```
develop  ──(work, commits, review)──►  main  ──►  GitHub Actions  ──►  cedric-ruiu.fr
```

`develop` is the working branch and deploys nothing. Merging `develop` into `main` is the only
trigger: the workflow runs `yarn install --immutable`, then `yarn build`, then publishes `_site/`
to GitHub Pages. Roughly one to two minutes. `public/CNAME` must keep holding the custom domain, or
GitHub drops it on every deployment.

> **Status:** the site is complete and the workflow is in place; the DNS cutover to GitHub Pages is
> still pending, so `cedric-ruiu.fr` does not serve this build yet.

Three constraints of the platform are accepted rather than worked around. GitHub Pages sets **no
custom HTTP headers**, so there is no server-set CSP or HSTS — the site depends on neither, loading
no third-party script and storing nothing on the visitor's device. It runs **no server-side code**, hence the form is
delegated to Web3Forms, which the legal notice discloses. And it serves **no pre-compressed files**,
so compression is the CDN's and minification at build time is the only remaining lever.

## Licence

Two regimes, set out in **[LICENSE.md](LICENSE.md)**:

- **the code** — templates, configuration, scripts, technical assets — is **MIT**, freely reusable;
- **the content** — copy, photographs, logo and visual identity — is the **exclusive property of
  Cédric Ruiu** and is not covered by the MIT licence.

Albert Sans is distributed under the SIL Open Font License 1.1, whose text ships alongside the
generated font file.
