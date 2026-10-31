import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ACTIONS_APPLIED = "2026-05-04";
const FIRST_EFFECTS = "2026-06-29";

const WIDTH = 600;
const HEIGHT = 200;
const TOP = 12;

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
