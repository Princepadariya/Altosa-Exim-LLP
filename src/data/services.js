/** What a buyer actually receives when they source through Altosa. */

export const services = [
  {
    id: "supplier-sourcing",
    number: "01",
    title: "Supplier identification & sourcing",
    summary:
      "We assess suitable supply options against your specification — including manufacturability and documentation needs — before anything is quoted.",
    icon: "search",
    points: [
      "Drawing and specification review",
      "Manufacturability assessment",
      "Multiple supply options, not one factory's answer",
      "Capability match before commercial discussion",
    ],
  },
  {
    id: "commission-agency",
    number: "02",
    title: "Commission agency",
    summary:
      "Where you prefer to contract directly with the manufacturer, we act as your agent on the ground and are paid a commission on the agreed order.",
    icon: "handshake",
    points: [
      "Buyer represented locally in India",
      "Negotiation and clarification handled in one language",
      "Commission basis agreed in writing before the order",
      "Direct buyer–supplier contract where preferred",
    ],
  },
  {
    id: "merchant-export",
    number: "03",
    title: "Merchant export",
    summary:
      "Where you prefer a single counterparty, Altosa is the exporter of record and you contract with us rather than with several factories.",
    icon: "ship",
    points: [
      "One counterparty across the order",
      "Consolidated commercial terms",
      "Export documentation issued in Altosa's name",
      "Single point of accountability for dispatch",
    ],
  },
  {
    id: "quality-coordination",
    number: "04",
    title: "Quality & inspection coordination",
    summary:
      "State the records you need in the request itself; availability is confirmed in the quotation for that order rather than assumed.",
    icon: "shield",
    points: [
      "Material test certificates",
      "Dimensional and hardness reports",
      "Plating and coating thickness records",
      "Third-party inspection scope recorded before production",
    ],
  },
  {
    id: "documentation",
    number: "05",
    title: "Export documentation",
    summary:
      "Commercial and shipping documentation is coordinated against the order so the paperwork matches what was actually agreed.",
    icon: "document",
    points: [
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Bill of lading / airway bill coordination",
      "Destination-specific document review",
    ],
  },
  {
    id: "logistics",
    number: "06",
    title: "Logistics & dispatch coordination",
    summary:
      "Packing method, container planning and dispatch milestones are coordinated against the order rather than left for you to chase across a distance.",
    icon: "container",
    points: [
      "Export packing specification",
      "FCL and LCL container planning",
      "Sea and air freight coordination",
      "Milestone updates through to dispatch",
    ],
  },
];

export default services;
