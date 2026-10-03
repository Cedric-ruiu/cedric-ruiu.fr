/**
 * Search Console curve of the SEO-audit case study on /audit-seo/, derived from
 * _data/audit-case.csv. A .js data file rather than YAML because it reads the
 * filesystem and computes the chart geometry — nothing here is drawn by hand.
 *
 * The CSV holds weekly impressions as an index (100 = weekly average before the
 * actions were applied), never raw volumes: the client stays anonymous and the
 * repository is public.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Week the audit's actions went live (Cédric): the dotted marker on the chart.
const ACTIONS_APPLIED = "2026-05-04";
// First week impressions clearly left their old level. The shaded band between
// the two dates is the wait for Google to take the changes into account — the
// chart is there to show it, not to suggest an overnight effect.
const FIRST_EFFECTS = "2026-06-29";

// Plot area, in viewBox units. The SVG is stretched to its box
// (preserveAspectRatio="none"), so these only set the proportions of the data.
const WIDTH = 600;
const HEIGHT = 200;
const TOP = 12; // headroom above the highest week

const source = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "audit-case.csv",
);

export default function () {
  const weeks = fs
    .readFileSync(source, "utf8")
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [week, impressions] = line.split(",");
      return { week, value: Number(impressions) };
    });

  const time = (date) => Date.parse(`${date}T00:00:00Z`);
  const first = time(weeks[0].week);
  const span = time(weeks.at(-1).week) - first;
  const max = Math.max(...weeks.map((w) => w.value));

  const x = (date) => ((time(date) - first) / span) * WIDTH;
  const y = (value) => HEIGHT - (value / max) * (HEIGHT - TOP);
  const round = (n) => Math.round(n * 10) / 10;

  const points = weeks.map((w) => `${round(x(w.week))},${round(y(w.value))}`);

  // One label per calendar month covered, in French ("mars", "avr."…).
  const monthFormat = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    timeZone: "UTC",
  });
  const months = [
    ...new Set(weeks.map((w) => monthFormat.format(new Date(time(w.week))))),
  ];

  return {
    width: WIDTH,
    height: HEIGHT,
    line: points.join(" "),
    area: `M0,${HEIGHT} L${points.join(" L")} L${WIDTH},${HEIGHT} Z`,
    baselineY: round(y(100)),
    markerX: round(x(ACTIONS_APPLIED)),
    waitWidth: round(x(FIRST_EFFECTS) - x(ACTIONS_APPLIED)),
    months,
  };
}
