/**
 * Headline figures. Only facts that can be evidenced to a buyer belong here.
 * `value` is animated by useCountUp when numeric; `display` overrides it.
 *
 * Every figure is derived from the data it describes rather than typed in.
 * A hand-written count goes stale the moment a sector or a market is added —
 * and a number the site cannot keep true is exactly the kind of unverifiable
 * claim the rest of the content refuses to make.
 */

import company from "./company";
import industries from "./industries";
import { totalCountries } from "./markets";

/**
 * Years since incorporation. Stated alongside the founding year in the note
 * below, so a buyer can check the arithmetic rather than take the figure on
 * trust — which is also why it carries no "+".
 */
export const yearsInBusiness = new Date().getFullYear() - company.founded;

export const stats = [
  {
    id: "years",
    value: yearsInBusiness,
    suffix: "",
    label: "Years in business",
    note: `Registered Indian exporter, incorporated ${company.founded}`,
  },
  {
    id: "sectors",
    value: industries.length,
    suffix: "",
    label: "Industrial sectors",
    note: "Covered by the supplier base around Rajkot",
  },
  {
    id: "markets",
    value: totalCountries,
    suffix: "+",
    label: "Destination markets",
    note: "Discussed across the Middle East, Europe, Americas, Africa and APAC",
  },
  {
    id: "registrations",
    display: "IEC / GST",
    label: "Registered exporter",
    note: "Evidenced during a qualified commercial discussion",
  },
];

/**
 * Short, factual credibility strip used in the hero.
 *
 * The destinations figure replaced an "LLP / Rajkot, Gujarat" badge: the
 * location is already stated twice in the first screen (the header lockup and
 * the drawing's title block), whereas nothing above the fold signalled that
 * this is an export business. Derived from the markets data so it cannot drift.
 *
 * Labelled "Destination markets", not "Export destinations": the markets data
 * describes where requirements are discussed and states that acceptance is not
 * automatic for every country. The stronger label would claim completed export
 * history the site does not evidence, which is the exact move the company's
 * own "verifiable over claimed" value rules out.
 */
export const heroBadges = [
  { code: "IEC", label: "Registered exporter" },
  { code: "GST", label: "Registered business" },
  { code: `${totalCountries}+`, label: "Destination markets" },
];

export default stats;
