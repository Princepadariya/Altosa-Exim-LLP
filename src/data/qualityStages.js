/**
 * Where quality is actually checked across an order, and — importantly — who
 * does the checking at each stage. Altosa coordinates; it does not certify.
 */

export const qualityStages = [
  {
    stage: "01",
    title: "Before the order",
    owner: "Buyer and Altosa",
    summary:
      "Drawing, revision, material grade, applicable standard, tolerances, surface treatment and the records you need are settled in writing.",
    checks: [
      "Drawing revision confirmed and frozen",
      "Material grade and standard agreed",
      "Critical dimensions identified",
      "Required records listed in the quotation",
      "Any nominated inspection agency and its scope recorded",
    ],
  },
  {
    stage: "02",
    title: "First article",
    owner: "Supplier, reviewed with the buyer",
    summary:
      "Where the part warrants it, a first-off sample is produced and measured against the drawing before the batch runs.",
    checks: [
      "Dimensional report against the drawing",
      "Material test certificate for the heat used",
      "Surface treatment thickness where specified",
      "Buyer approval recorded before production continues",
    ],
  },
  {
    stage: "03",
    title: "In process",
    owner: "Supplier",
    summary:
      "Routine checks during the run. What is recorded depends on the process and is agreed at quotation rather than assumed.",
    checks: [
      "Sampling frequency against the agreed plan",
      "Hardness and heat treatment records where applicable",
      "Non-conformance raised before the batch completes",
    ],
  },
  {
    stage: "04",
    title: "Pre-shipment",
    owner: "Supplier, or your nominated third party",
    summary:
      "Final check against the agreed scope before packing. Where you nominate an independent agency, that scope was recorded before production began.",
    checks: [
      "Final dimensional inspection to the agreed sample size",
      "Visual and surface finish check",
      "Count, packing and marking verified against the packing list",
      "Third-party report issued where nominated",
    ],
  },
  {
    stage: "05",
    title: "Documentation",
    owner: "Altosa",
    summary:
      "Records assembled against the order so the paperwork matches what was actually agreed and what was actually shipped.",
    checks: [
      "Records collated against the quotation scope",
      "Commercial and shipping documents cross-checked",
      "Discrepancies raised before dispatch, not after",
    ],
  },
];

export const qualityStagesNotice =
  "Altosa coordinates quality; it does not certify. Availability of any record depends on the part, the process and the supplier, and is confirmed in the quotation for that order rather than assumed from this page.";

export default qualityStages;
