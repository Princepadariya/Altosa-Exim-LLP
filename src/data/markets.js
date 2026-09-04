/**
 * Export destinations discussed most often. Acceptance is not automatic for
 * every market — destination requirements and export feasibility are reviewed
 * per product and inquiry.
 */

export const marketRegions = [
  {
    id: "middle-east",
    region: "Middle East",
    blurb:
      "Established freight routes from Mundra and Kandla, with short transit times and frequent sailings.",
    countries: [
      { name: "United Arab Emirates", code: "AE" },
      { name: "Saudi Arabia", code: "SA" },
      { name: "Qatar", code: "QA" },
      { name: "Oman", code: "OM" },
      { name: "Kuwait", code: "KW" },
      { name: "Bahrain", code: "BH" },
    ],
  },
  {
    id: "europe",
    region: "Europe & United Kingdom",
    blurb:
      "Destination-market conformity and documentation expectations are reviewed before an inquiry is accepted.",
    countries: [
      { name: "United Kingdom", code: "GB" },
      { name: "Germany", code: "DE" },
      { name: "Netherlands", code: "NL" },
      { name: "Italy", code: "IT" },
      { name: "Spain", code: "ES" },
      { name: "Poland", code: "PL" },
    ],
  },
  {
    id: "north-america",
    region: "North America",
    blurb:
      "Standards, marking and inspection expectations are confirmed per order rather than assumed.",
    countries: [
      { name: "United States", code: "US" },
      { name: "Canada", code: "CA" },
      { name: "Mexico", code: "MX" },
    ],
  },
  {
    id: "africa",
    region: "Africa",
    blurb:
      "Pre-shipment inspection regimes vary by country and are confirmed before production begins.",
    countries: [
      { name: "Kenya", code: "KE" },
      { name: "Tanzania", code: "TZ" },
      { name: "South Africa", code: "ZA" },
      { name: "Nigeria", code: "NG" },
      { name: "Egypt", code: "EG" },
    ],
  },
  {
    id: "asia-pacific",
    region: "Asia Pacific",
    blurb:
      "Short sea transits and consolidated shipments suit repeat industrial requirements.",
    countries: [
      { name: "Vietnam", code: "VN" },
      { name: "Malaysia", code: "MY" },
      { name: "Singapore", code: "SG" },
      { name: "Australia", code: "AU" },
      { name: "Thailand", code: "TH" },
    ],
  },
];

/** Ports and gateways used for dispatch from Gujarat. */
export const gateways = [
  { name: "Mundra Port", type: "Sea", note: "Primary container gateway for Gujarat cargo" },
  { name: "Kandla (Deendayal) Port", type: "Sea", note: "Bulk and container shipments" },
  { name: "Nhava Sheva (JNPT)", type: "Sea", note: "Widest sailing schedule coverage" },
  { name: "Ahmedabad (AMD)", type: "Air", note: "Air freight for urgent or light consignments" },
];

export const marketsNotice =
  "Destination-market requirements and export feasibility are reviewed per product and inquiry. Acceptance is not automatic for every market, and conformity remains a decision for the importer of record.";

export const totalCountries = marketRegions.reduce(
  (sum, region) => sum + region.countries.length,
  0,
);

export default marketRegions;
