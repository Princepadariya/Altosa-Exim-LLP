/**
 * Writes public/sitemap.xml from the site data.
 *
 * Runs automatically on `npm run build` (see the prebuild script). The
 * hand-maintained version had drifted badly — 12 URLs against 24 real pages,
 * missing every industry detail page, every buyer guide, /services, /standards
 * and /glossary — so search engines could not discover them.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import industries from "../src/data/industries.js";
import { legalPages } from "../src/data/legal.js";
import resources from "../src/data/resources.js";
import siteConfig from "../src/data/siteConfig.js";

/*
 * lastmod is emitted only for pages that carry a real editorial date in the
 * data — the buyer guides and the two legal pages. Stamping every URL with the
 * build date would be easy and worthless: it would tell a crawler the whole
 * site changed every time the site is rebuilt, which is precisely the kind of
 * unreliable signal search engines learn to ignore. No date is better than a
 * date that is not true.
 */
const MONTHS = {
  january: "01", february: "02", march: "03", april: "04",
  may: "05", june: "06", july: "07", august: "08",
  september: "09", october: "10", november: "11", december: "12",
};

/** "September 2026" / "Reviewed September 2026" -> "2026-09" (W3C Datetime). */
const toLastmod = (value) => {
  const match = /([A-Za-z]+)\s+(\d{4})/.exec(value ?? "");
  if (!match) return null;
  const month = MONTHS[match[1].toLowerCase()];
  return month ? `${match[2]}-${month}` : null;
};

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = (siteConfig.siteUrl || "https://altosaexim.com").replace(/\/$/, "");

/** [path, changefreq, priority, lastmod?] */
const staticRoutes = [
  ["/", "monthly", "1.0"],
  ["/industries", "monthly", "0.9"],
  ["/products", "monthly", "0.9"],
  ["/services", "monthly", "0.9"],
  ["/request-a-quote", "monthly", "0.9"],
  ["/how-we-work", "monthly", "0.8"],
  ["/markets", "monthly", "0.8"],
  ["/quality-and-compliance", "monthly", "0.8"],
  ["/about", "monthly", "0.8"],
  ["/resources", "monthly", "0.8"],
  ["/standards", "monthly", "0.7"],
  ["/glossary", "monthly", "0.7"],
  ["/faq", "monthly", "0.7"],
  ["/contact", "yearly", "0.6"],
  ["/sitemap", "yearly", "0.4"],
  ["/data-handling", "yearly", "0.3", toLastmod(legalPages["data-handling"]?.updated)],
  ["/terms", "yearly", "0.3", toLastmod(legalPages.terms?.updated)],
];

const dynamicRoutes = [
  ...industries.map((i) => [`/industries/${i.id}`, "monthly", "0.7"]),
  ...resources.map((r) => [`/resources/${r.slug}`, "monthly", "0.6", toLastmod(r.updated)]),
];

const routes = [...staticRoutes, ...dynamicRoutes];

const body = routes
  .map(
    ([route, changefreq, priority, lastmod]) =>
      `  <url>\n` +
      `    <loc>${base}${route === "/" ? "/" : `${route}/`}</loc>\n` +
      (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "") +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
const dated = routes.filter((r) => r[3]).length;
console.log(
  `sitemap.xml — ${routes.length} URLs (${dynamicRoutes.length} from data, ${dated} with lastmod)`,
);
