/**
 * The two ways a buyer can engage Altosa. Which one applies is agreed before
 * the order and stated in the quotation — this data drives the comparison so
 * the distinction is never left implied.
 */

/*
 * `compareKey` ties each model to its column in `engagementComparison` below.
 * Declared rather than inferred from array order, so reordering the cards
 * cannot silently swap the answers under the wrong heading.
 */
export const engagementModels = [
  {
    id: "merchant-export",
    compareKey: "merchant",
    name: "Merchant export",
    tagline: "One counterparty, one contract",
    summary:
      "Altosa buys from the manufacturer and sells to you. You hold a single commercial relationship and Altosa is the exporter of record.",
    bestFor: [
      "Buyers who want one invoice and one point of accountability",
      "Multi-supplier orders consolidated into one shipment",
      "Teams without an import desk experienced in Indian suppliers",
    ],
    icon: "ship",
  },
  {
    id: "commission-agency",
    compareKey: "agency",
    name: "Commission agency",
    tagline: "Your agent on the ground",
    summary:
      "You contract directly with the manufacturer. Altosa represents you locally and is paid an agreed commission on the order.",
    bestFor: [
      "Buyers with an established import process",
      "Long-term programmes where a direct supplier relationship matters",
      "Cases where the buyer wants full visibility of factory pricing",
    ],
    icon: "handshake",
  },
];

/**
 * Row-per-question comparison. `merchant` and `agency` are deliberately
 * written as plain answers rather than ticks — the differences are factual,
 * not a scorecard where one column wins.
 */
export const engagementComparison = [
  {
    question: "Who invoices you?",
    merchant: "Altosa Exim LLP",
    agency: "The manufacturer, directly",
  },
  {
    question: "Who is the exporter of record?",
    merchant: "Altosa",
    agency: "The manufacturer",
  },
  {
    question: "How is Altosa paid?",
    merchant: "Margin inside the quoted price, agreed up front",
    agency: "An agreed commission on the order value",
  },
  {
    question: "Do you see the factory price?",
    merchant: "No — you see the delivered price Altosa quotes",
    agency: "Yes — you negotiate it directly",
  },
  {
    question: "Who coordinates inspection and documents?",
    merchant: "Altosa, as part of the order",
    agency: "Altosa, on your behalf",
  },
  {
    question: "Who handles payment to the factory?",
    merchant: "Altosa",
    agency: "You, on the terms you agree",
  },
  {
    question: "Consolidating several suppliers?",
    merchant: "Straightforward — one shipment, one invoice",
    agency: "Possible, but each supplier contracts with you separately",
  },
  {
    question: "Where does the commercial risk sit?",
    merchant: "With Altosa, up to the agreed Incoterms® 2020 point",
    agency: "With you and the manufacturer, per your contract",
  },
  {
    question: "If parts are rejected, who do you claim against?",
    merchant: "Altosa — we pursue the manufacturer behind it",
    agency: "The manufacturer, with Altosa coordinating the claim for you",
  },
  {
    question: "Who holds the supplier relationship after the first order?",
    merchant: "Altosa, so a change of supplier does not change your contract",
    agency: "You do, directly — which is usually the point of choosing it",
  },
];

export const engagementNotice =
  "Whichever arrangement applies is agreed before the order and recorded in the quotation, not left implied. Incoterms® 2020 rules describe delivery terms only and are not a substitute for a contract.";

export default engagementModels;
