/**
 * Headline figures. Only facts that can be evidenced to a buyer belong here.
 * `value` is animated by useCountUp when numeric; `display` overrides it.
 */

import { totalCountries } from "./markets";

export const stats = [
  {
    id: "years",
    value: 7,
    suffix: "+",
    label: "Years in business",
    note: "Operating as a registered Indian exporter",
  },
  {
    id: "sectors",
    value: 6,
    suffix: "",
    label: "Industrial sectors",
    note: "Covered by the supplier base around Rajkot",
  },
  {
    id: "markets",
    value: 25,
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
 */
export const heroBadges = [
  { code: "IEC", label: "Registered exporter" },
  { code: "GST", label: "Registered business" },
  { code: `${totalCountries}+`, label: "Export destinations" },
];

export default stats;
