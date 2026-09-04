/**
 * Process envelope for the supplier base around Rajkot.
 *
 * These are the ranges a requirement normally sits inside — the point where a
 * process stays economic — not hard limits and not a guarantee. Anything near
 * or past an edge is worth sending anyway; it just gets checked against a
 * specific supplier rather than assumed. Every figure here is confirmed per
 * inquiry against your drawing.
 */

/*
 * `leadWeeks` is the same range as `leadTime`, stated as numbers so it can be
 * drawn on a shared axis. It is declared here rather than parsed out of the
 * string at render time — the strings carry qualifiers ("incl. tooling") that
 * a parser would have to guess at, and a silent mis-parse would put a wrong
 * bar next to correct text.
 */
export const processEnvelope = [
  {
    id: "cnc-turning",
    process: "CNC turning",
    envelope: "Ø6–350 mm, up to 900 mm long",
    tolerance: "IT7 typical, IT6 achievable",
    moq: "25–100 pcs",
    leadTime: "3–5 weeks",
    leadWeeks: [3, 5],
  },
  {
    id: "cnc-milling",
    process: "CNC milling / VMC",
    envelope: "Up to 800 × 500 × 400 mm",
    tolerance: "IT7 typical, ±0.02 mm on features",
    moq: "25–100 pcs",
    leadTime: "3–6 weeks",
    leadWeeks: [3, 6],
  },
  {
    id: "closed-die-forging",
    process: "Closed-die forging",
    envelope: "0.2–40 kg per piece",
    tolerance: "Per IS 3469 / DIN 7526, machined after",
    moq: "500–2,000 pcs",
    leadTime: "6–10 weeks incl. tooling",
    leadWeeks: [6, 10],
  },
  {
    id: "sand-casting",
    process: "Sand casting (iron)",
    envelope: "0.5–500 kg per piece",
    tolerance: "CT10–CT12 as-cast",
    moq: "100–500 pcs",
    leadTime: "5–9 weeks incl. pattern",
    leadWeeks: [5, 9],
  },
  {
    id: "investment-casting",
    process: "Investment casting",
    envelope: "0.05–25 kg per piece",
    tolerance: "CT6–CT8 as-cast",
    moq: "200–1,000 pcs",
    leadTime: "6–10 weeks incl. tooling",
    leadWeeks: [6, 10],
  },
  {
    id: "fasteners",
    process: "Cold-forged fasteners",
    envelope: "M4–M36, up to 300 mm long",
    tolerance: "Property class 8.8 / 10.9 / A2-70",
    moq: "5,000 pcs",
    leadTime: "4–7 weeks",
    leadWeeks: [4, 7],
  },
  {
    id: "sheet-fabrication",
    process: "Sheet metal & fabrication",
    envelope: "Up to 12 mm plate, 3 m bed",
    tolerance: "±0.5 mm on formed features",
    moq: "10–50 pcs",
    leadTime: "3–5 weeks",
    leadWeeks: [3, 5],
  },
  {
    id: "copper-machining",
    process: "Copper & brass machining",
    envelope: "Ø3–200 mm bar and extrusion",
    tolerance: "IT7 typical; plating specified separately",
    moq: "100–500 pcs",
    leadTime: "4–6 weeks",
    leadWeeks: [4, 6],
  },
];

/** Upper bound of the lead-time axis, in weeks. */
export const leadAxisMax = 12;

/** Ticks drawn under the axis. */
export const leadAxisTicks = [0, 3, 6, 9, 12];

export const envelopeColumns = [
  { key: "process", label: "Process", lead: true },
  { key: "envelope", label: "Typical size envelope" },
  { key: "tolerance", label: "Tolerance basis", mono: true },
  { key: "moq", label: "Indicative MOQ", mono: true },
  { key: "leadTime", label: "Indicative lead time", mono: true },
];

/**
 * What actually moves a lead time or a price, in the order buyers most often
 * get caught by. Written as cause and effect rather than as a warning.
 */
export const leadTimeDrivers = [
  {
    id: "tooling",
    title: "Whether tooling already exists",
    effect: "Adds 2–5 weeks",
    body: "Forging dies, casting patterns and cold-heading tools are made once and reused. A first order carries that time and cost; a repeat order does not. If you expect repeats, say so — it changes how tooling is amortised in the price.",
  },
  {
    id: "material",
    title: "Whether the material is stocked",
    effect: "Adds 1–4 weeks",
    body: "Common carbon and mild steel sections are held locally. Specific alloy grades, larger bar diameters and most stainless sections are mill-ordered, which sets a floor on lead time regardless of how fast the machining runs.",
  },
  {
    id: "treatment",
    title: "Heat treatment and plating",
    effect: "Adds 1–2 weeks",
    body: "These are outside operations at separate facilities. Each transfer adds handling and queue time, and a plating thickness report adds a further test cycle.",
  },
  {
    id: "inspection",
    title: "Third-party inspection",
    effect: "Adds 1–2 weeks",
    body: "A nominated inspection agency works to its own schedule. Booking it against a realistic readiness date rather than an optimistic one avoids paying for a wasted visit.",
  },
  {
    id: "first-article",
    title: "First-article approval",
    effect: "Adds 1–3 weeks",
    body: "The production batch waits on your sign-off. The clock here is largely yours — the faster the first article is reviewed, the sooner the batch runs.",
  },
  {
    id: "sailing",
    title: "Sailing schedule and transit",
    effect: "Adds 2–6 weeks",
    body: "Lead time in a quotation means readiness for dispatch, not arrival. Transit from Mundra or Nhava Sheva depends on the destination and on whether the consignment is FCL or consolidated.",
  },
];

export const capabilityNotice =
  "Ranges describe where a process normally stays economic, not a hard limit or a commitment. A part outside these figures is still worth sending — it is checked against a specific supplier rather than ruled out here. Quantities, tolerances and dates are confirmed against your drawing before anything is quoted.";

export default processEnvelope;
