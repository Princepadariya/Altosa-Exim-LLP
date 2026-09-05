/**
 * Schema for the buyer inquiry form. The form component renders whatever is
 * declared here, so adding or reordering a question is a data change only.
 *
 * `validate` receives (value, allValues) and returns an error string or null.
 */

import { isEmail, isNotEmpty, minLength } from "../utils/validation";
import countries from "./countries";

/*
 * Attachment ceiling.
 *
 * Set by the delivery path, not by taste: a Vercel serverless function rejects
 * a request body over 4.5 MB before our code ever runs, and multipart framing
 * plus twenty form fields have to fit under that alongside the file. Four
 * leaves the margin.
 *
 * A buyer with a larger drawing is not turned away — the validator tells them
 * to send the requirement without it and email the file separately, which is
 * a worse experience than an upload but a far better one than a submission
 * that fails at the edge with nothing to explain it.
 */
export const MAX_ATTACHMENT_MB = 4;

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
        label: "Phone or WhatsApp (with country code)",
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
        name: "drawingReference",
        label: "Drawing or specification reference",
        type: "text",
        required: false,
        placeholder: "e.g. PH-4820 rev C",
        hint: "Name the revision too — a drawing without one cannot be frozen.",
      },
      {
        /* Split from the old combined "Material, grade or standard" field. The
           grade and the standard are two different facts: the standard is what
           decides which tests the mill actually ran, and merging them let a
           buyer supply one and believe they had given both. */
        name: "material",
        label: "Material or grade",
        type: "text",
        required: false,
        placeholder: "e.g. EN-GJS-400-15",
      },
      {
        name: "standard",
        label: "Applicable standard",
        type: "text",
        required: false,
        placeholder: "e.g. ASTM A536",
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
        /* A list rather than free text: the destination decides which standards,
           documents and wood-packaging rules apply, and "UAE", "U.A.E." and
           "Dubai" arriving as three different strings makes that check
           guesswork. The submitted value is the ISO code. */
        name: "country",
        label: "Destination country",
        type: "select",
        autoComplete: "country",
        required: true,
        options: countries,
        placeholder: "Select a destination",
        validate: (value) =>
          isNotEmpty(value) ? null : "Please select the destination country.",
      },
      {
        name: "portOfDischarge",
        label: "Destination city, port or airport",
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
        /* Kept alongside the bracket above rather than replacing it: the bracket
           is what a buyer can always answer, the date is what they answer when
           a programme has a real deadline attached to it. */
        name: "targetDate",
        label: "Target delivery date",
        type: "text",
        required: false,
        placeholder: "e.g. October 2026",
        hint: "If a fixed date drives this requirement, name it.",
      },
      {
        name: "attachment",
        label: "Drawing, specification or requirement document",
        type: "file",
        required: false,
        accept:
          ".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.png,.jpg,.jpeg,.xlsx,.xls,.doc,.docx,.zip",
        maxSizeMb: MAX_ATTACHMENT_MB,
        hint: `PDF, DWG, DXF, STEP, image, spreadsheet or ZIP, up to ${MAX_ATTACHMENT_MB} MB.`,
        validate: (value) =>
          !value || value.size <= MAX_ATTACHMENT_MB * 1024 * 1024
            ? null
            : `That file is over ${MAX_ATTACHMENT_MB} MB. Send the requirement without it and email the file separately — we will match it to your inquiry.`,
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
