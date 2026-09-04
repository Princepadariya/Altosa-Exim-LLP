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
import resources from "../src/data/resources.js";
import siteConfig from "../src/data/siteConfig.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = (siteConfig.siteUrl || "https://altosaexim.com").replace(/\/$/, "");

/** [path, changefreq, priority] */
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
  ["/data-handling", "yearly", "0.3"],
  ["/terms", "yearly", "0.3"],
];

const dynamicRoutes = [
  ...industries.map((i) => [`/industries/${i.id}`, "monthly", "0.7"]),
  ...resources.map((r) => [`/resources/${r.slug}`, "monthly", "0.6"]),
];

const routes = [...staticRoutes, ...dynamicRoutes];

const body = routes
  .map(
    ([route, changefreq, priority]) =>
      `  <url>\n` +
      `    <loc>${base}${route === "/" ? "/" : `${route}/`}</loc>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml — ${routes.length} URLs (${dynamicRoutes.length} generated from data)`);
