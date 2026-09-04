/** What a buyer can verify before committing, and where our role ends. */

export const assurancePoints = [
  {
    id: "identity",
    title: "Business identity",
    body: "Altosa Exim LLP, Rajkot, Gujarat, India. IEC and GST registration details can be shared during a qualified commercial discussion.",
    icon: "badge",
  },
  {
    id: "role",
    title: "Role clarity",
    body: "Altosa is a merchant exporter and commission agent. We do not imply that every item shown is manufactured or stocked by Altosa.",
    icon: "compass",
  },
  {
    id: "spec-first",
    title: "Specification-first sourcing",
    body: "Fit, material, standard, tolerances, test expectations and acceptable documentation are discussed before quotation.",
    icon: "caliper",
  },
  {
    id: "compliance",
    title: "Country & compliance check",
    body: "Destination-market requirements and export feasibility are reviewed per product and inquiry; acceptance is not automatic for every market.",
    icon: "globe",
  },
  {
    id: "commercial",
    title: "Commercial clarity",
    body: "Quantity, lead time, packing, payment basis and the applicable Incoterms® 2020 rule are recorded in the quotation or order documentation.",
    icon: "receipt",
  },
  {
    id: "traceable",
    title: "Traceable communication",
    body: "Important technical and commercial decisions are confirmed in writing, with drawings and revisions clearly identified.",
    icon: "thread",
  },
];

/** Records a buyer can request; availability confirmed per order. */
export const inspectionRecords = [
  "Material test certificates",
  "Dimensional inspection reports",
  "Plating or coating thickness",
  "Hardness and mechanical properties",
  "Heat treatment records",
  "Third-party inspection to your nominated scope",
];

export const roleLimits = {
  title: "Where our role ends",
  body: "We coordinate sourcing, commercial terms and documentation. We do not act as your certifying body, your customs broker, or your legal adviser, and destination-market conformity remains a decision for the importer of record.",
};

/** Reasons to work through a sourcing partner rather than a single factory. */
export const whyWorkWithUs = [
  {
    id: "options",
    title: "Options, not one factory's answer",
    body: "A drawing sent to a single manufacturer gets one answer, shaped by what that manufacturer already makes. We assess suitable supply options against your specification — including manufacturability and documentation needs — before anything is quoted.",
  },
  {
    id: "one-contact",
    title: "One contact across the whole order",
    body: "Technical clarification, commercial terms and dispatch coordination run through one defined inquiry owner, in one language and one thread — instead of across several factory contacts and time zones.",
  },
  {
    id: "spec-before-price",
    title: "Specification settled before price",
    body: "Open points are clarified first, so the quotation reflects a scope both sides have agreed. A number that arrives before the questions is a number that changes later.",
  },
  {
    id: "coordinated",
    title: "The path from inquiry to dispatch is coordinated",
    body: "Milestones, available quality records and dispatch documentation are coordinated against the order, rather than left for you to chase across a distance.",
  },
];

export default assurancePoints;
