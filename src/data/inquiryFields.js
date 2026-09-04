/**
 * Schema for the buyer inquiry form. The form component renders whatever is
 * declared here, so adding or reordering a question is a data change only.
 *
 * `validate` receives (value, allValues) and returns an error string or null.
 */

import { isEmail, isNotEmpty, minLength } from "../utils/validation";

export const incoterms = [
  "EXW — Ex Works",
  "FCA — Free Carrier",
  "FAS — Free Alongside Ship",
  "FOB — Free On Board",
  "CFR — Cost and Freight",
  "CIF — Cost, Insurance and Freight",
  "CPT — Carriage Paid To",
  "CIP — Carriage and Insurance Paid To",
  "DAP — Delivered at Place",
  "DPU — Delivered at Place Unloaded",
  "DDP — Delivered Duty Paid",
  "Not decided yet",
];

export const timelines = [
  "Urgent — within 4 weeks",
  "1–3 months",
  "3–6 months",
  "Planning ahead / budgetary",
];

export const inquiryTypes = [
  "One-off order",
  "Repeat / annual requirement",
  "New product development",
  "Second-source evaluation",
];

export const documentationOptions = [
  "Material test certificate",
  "Dimensional inspection report",
  "Hardness / mechanical properties",
  "Plating or coating thickness",
  "Heat treatment record",
  "Third-party inspection",
];

/** Grouped so the form reads as a conversation rather than a wall of inputs. */
export const inquiryFieldGroups = [
  {
    id: "contact",
    legend: "Who you are",
    description: "So the reply reaches the right person.",
    fields: [
      {
        name: "fullName",
        label: "Full name",
        type: "text",
        autoComplete: "name",
        required: true,
        placeholder: "Jordan Alvarez",
        validate: (value) => (isNotEmpty(value) ? null : "Please enter your name."),
      },
      {
        name: "email",
        label: "Work email",
        type: "email",
        autoComplete: "email",
        required: true,
        placeholder: "you@company.com",
        validate: (value) =>
          isEmail(value) ? null : "Please enter a valid email address.",
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        autoComplete: "organization",
        required: true,
        placeholder: "Company name",
        validate: (value) => (isNotEmpty(value) ? null : "Please enter your company."),
      },
      {
        name: "phone",
        label: "Phone or WhatsApp",
        type: "tel",
        autoComplete: "tel",
        required: false,
        placeholder: "+1 555 000 1234",
        hint: "Optional. Include the country code.",
      },
    ],
  },
  {
    id: "requirement",
    legend: "What you need",
    description:
      "The more of this you can share, the more useful the first response will be.",
    fields: [
      {
        name: "industry",
        label: "Industry",
        type: "select",
        required: true,
        options: [], // filled at runtime from data/industries.js
        placeholder: "Select an industry",
        validate: (value) => (isNotEmpty(value) ? null : "Please select an industry."),
      },
      {
        name: "productDescription",
        label: "Part or product description",
        type: "textarea",
        rows: 4,
        required: true,
        placeholder:
          "e.g. Machined ductile iron pump housing, drawing ref PH-4820 rev C",
        hint: "Include a drawing reference and revision if you have one.",
        validate: (value) =>
          minLength(value, 12)
            ? null
            : "Please describe the part in a little more detail.",
      },
      {
        name: "material",
        label: "Material, grade or standard",
        type: "text",
        required: false,
        placeholder: "e.g. EN-GJS-400-15 / ASTM A536",
      },
      {
        name: "quantity",
        label: "Quantity or annual requirement",
        type: "text",
        required: true,
        placeholder: "e.g. 2,000 pcs per year",
        validate: (value) => (isNotEmpty(value) ? null : "Please state a quantity."),
      },
      {
        name: "inquiryType",
        label: "Type of requirement",
        type: "select",
        required: false,
        options: inquiryTypes,
        placeholder: "Select a type",
      },
      {
        name: "documentation",
        label: "Records you need with the order",
        type: "checkbox-group",
        required: false,
        options: documentationOptions,
        hint: "Availability is confirmed in the quotation for your order, not assumed.",
      },
    ],
  },
  {
    id: "commercial",
    legend: "Where it is going",
    description: "Destination and timing shape standards, documents and logistics.",
    fields: [
      {
        name: "country",
        label: "Destination country",
        type: "text",
        autoComplete: "country-name",
        required: true,
        placeholder: "e.g. Germany",
        validate: (value) =>
          isNotEmpty(value) ? null : "Please enter the destination country.",
      },
      {
        name: "portOfDischarge",
        label: "Port, airport or delivery city",
        type: "text",
        required: false,
        placeholder: "e.g. Hamburg",
      },
      {
        name: "incoterm",
        label: "Preferred Incoterms® 2020 rule",
        type: "select",
        required: false,
        options: incoterms,
        placeholder: "Select if you have one",
      },
      {
        name: "timeline",
        label: "Target timing",
        type: "select",
        required: false,
        options: timelines,
        placeholder: "Select a timeframe",
      },
      {
        name: "notes",
        label: "Anything else we should know",
        type: "textarea",
        rows: 3,
        required: false,
        placeholder:
          "Packing preferences, inspection agency, prior supplier history, open questions…",
      },
      {
        name: "consent",
        label:
          "I understand this inquiry will be used to prepare a response and may be shared with supply options only as far as needed to assess and quote it.",
        type: "checkbox",
        required: true,
        validate: (value) =>
          value ? null : "Please confirm before sending your requirement.",
      },
    ],
  },
];

/** Flat list, useful for validation and for building initial state. */
export const inquiryFields = inquiryFieldGroups.flatMap((group) => group.fields);

/** Guidance shown alongside the form. */
export const rfqChecklist = [
  "Drawing or specification reference",
  "Material or grade and applicable standard",
  "Quantity or annual requirement",
  "Destination country, city, port or airport",
  "Preferred Incoterms® 2020 rule, if you have one",
  "Target delivery timing",
];

export const rfqNextSteps = [
  "Your request reaches us directly. We read the specification and identify what is still open.",
  "If anything is unclear — a tolerance, a standard, a documentation expectation — we ask before quoting rather than guessing.",
  "You receive a scoped quotation covering product, quantity, lead time, packing and the applicable trade terms, or an honest note that we are not the right route for this part.",
];

export const dataHandlingNotice =
  "Please do not send confidential drawings or commercially sensitive documents through this form until handling expectations have been agreed with us in writing.";

export default inquiryFieldGroups;
