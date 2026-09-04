/** The four decision points between a first inquiry and a dispatched order. */

export const processSteps = [
  {
    step: "01",
    title: "Define the requirement",
    summary:
      "Send the drawing or specification, material, quantity, required standards, destination and target timing.",
    youSend: [
      "Drawing or specification reference",
      "Material or grade and applicable standard",
      "Quantity or annual requirement",
      "Destination country, city, port or airport",
    ],
    youGet: "Confirmation of receipt and a list of what is still open.",
  },
  {
    step: "02",
    title: "Review supply fit",
    summary:
      "We clarify open points and assess suitable supplier options, manufacturability and documentation needs.",
    youSend: ["Answers to clarification questions", "Any revised drawing or revision number"],
    youGet:
      "An honest read on whether this part is a fit — including when it is not.",
  },
  {
    step: "03",
    title: "Agree the commercial basis",
    summary:
      "You receive a scoped quotation covering product, quantity, lead time, packing and agreed trade terms.",
    youSend: ["Preferred Incoterms® 2020 rule", "Payment basis and any commercial constraints"],
    youGet:
      "A quotation that states the scope it covers, so both sides agree to the same thing.",
  },
  {
    step: "04",
    title: "Coordinate the order",
    summary:
      "After confirmation, milestones, available quality records and dispatch documentation are coordinated against the order.",
    youSend: ["Order confirmation", "Any nominated inspection agency and its scope"],
    youGet: "Milestone updates, agreed quality records and dispatch documentation.",
  },
];

/** Line items a quotation from Altosa always states. */
export const quotationScope = [
  "Product description against your drawing or specification",
  "Quantity and any minimum order quantity that applies",
  "Lead time from order confirmation",
  "Packing method",
  "Payment basis",
  "The applicable Incoterms® 2020 rule and the named place it refers to",
];

export const incotermsNotice =
  "Incoterms® 2020 rules describe delivery terms only. They are not a substitute for a contract, quality agreement, payment terms, product compliance or legal advice.";

export default processSteps;
