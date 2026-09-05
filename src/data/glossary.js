/**
 * Trade and sourcing vocabulary a buyer meets in a quotation or on a document.
 * General definitions, not Altosa-specific commitments.
 */

export const glossary = [
  {
    term: "Merchant exporter",
    letter: "M",
    definition:
      "A business that buys goods from a manufacturer and exports them under its own name. The buyer contracts with the merchant exporter rather than with the factory.",
  },
  {
    term: "Commission agent",
    letter: "C",
    definition:
      "An intermediary who arranges a sale between buyer and manufacturer without taking ownership of the goods, and is paid an agreed commission on the order.",
  },
  {
    term: "IEC",
    letter: "I",
    definition:
      "Importer-Exporter Code. The registration number required to import into or export from India, issued by the Directorate General of Foreign Trade.",
  },
  {
    term: "Incoterms® 2020",
    letter: "I",
    definition:
      "The International Chamber of Commerce's eleven delivery rules. They set who arranges carriage, where risk passes and who clears customs — nothing else.",
  },
  {
    term: "MTC",
    letter: "M",
    definition:
      "Material test certificate. A mill or foundry record of chemical composition and mechanical properties for a specific heat or cast of material.",
  },
  {
    term: "MOQ",
    letter: "M",
    definition:
      "Minimum order quantity. The smallest batch a process makes economic sense at — it varies by part and process rather than being a fixed company policy.",
  },
  {
    term: "First article",
    letter: "F",
    definition:
      "A first-off sample produced and measured against the drawing, approved before the production batch runs.",
  },
  {
    term: "FCL / LCL",
    letter: "F",
    definition:
      "Full container load and less than container load. FCL books a whole container; LCL shares one with other shippers, adding consolidation time and handling.",
  },
  {
    term: "Bill of lading",
    letter: "B",
    definition:
      "The sea carrier's contract of carriage. An original negotiable bill is also a document of title — whoever holds it controls the cargo.",
  },
  {
    term: "Certificate of origin",
    letter: "C",
    definition:
      "A document establishing where goods were produced. A preferential certificate under a trade agreement may reduce duty at the destination.",
  },
  {
    term: "ISPM 15",
    letter: "I",
    definition:
      "The international standard for treating wooden packaging so it can cross borders. Compliant cases carry a stamped mark.",
  },
  {
    term: "VCI packaging",
    letter: "V",
    definition:
      "Vapour corrosion inhibitor film or paper that protects bare ferrous surfaces from corrosion during long sea transits.",
  },
  {
    term: "Pre-shipment inspection",
    letter: "P",
    definition:
      "A final check against an agreed scope before packing, carried out by the supplier or by a third-party agency the buyer nominates.",
  },
  {
    term: "RFQ",
    letter: "R",
    definition:
      "Request for quotation. A buyer's inquiry setting out the part, quantity, material, destination and timing so a supplier can price it.",
  },
  {
    term: "Lead time",
    letter: "L",
    definition:
      "The time from order confirmation to readiness for dispatch. It excludes transit unless the quotation says otherwise.",
  },
  {
    term: "Named place",
    letter: "N",
    definition:
      "The location that completes an Incoterms® rule. \"FOB\" alone is ambiguous; \"FOB Mundra\" is not.",
  },
  {
    term: "Heat number",
    letter: "H",
    definition:
      "The identifier for a specific melt of metal. It ties parts back to the material test certificate that covers them.",
  },
  {
    term: "Importer of record",
    letter: "I",
    definition:
      "The party legally responsible for customs clearance and destination-market conformity at the destination. Usually the buyer.",
  },
  {
    term: "Letter of credit",
    letter: "L",
    definition:
      "A bank undertaking to pay the seller once documents matching the credit's terms are presented. Payment depends on the documents being correct, not on the goods being correct, which is why the document list is negotiated as carefully as the price.",
  },
  {
    term: "Proforma invoice",
    letter: "P",
    definition:
      "A quotation issued in invoice form, stating goods, quantity, value and terms before an order exists. Buyers commonly use it to raise a purchase order, open a letter of credit or apply for an import licence.",
  },
  {
    term: "Packing list",
    letter: "P",
    definition:
      "The document stating what is in each package: contents, quantities, case numbers, and gross and net weights. It travels with the shipment and is what customs and the receiving warehouse check the consignment against.",
  },
  {
    term: "HS code",
    letter: "H",
    definition:
      "Harmonised System code. The internationally agreed classification number for a product, which determines the duty rate and any restrictions at the destination. The first six digits are common worldwide; countries add further digits of their own.",
  },
  {
    term: "Demurrage and detention",
    letter: "D",
    definition:
      "Charges that begin once free time runs out \u2014 demurrage while a container sits inside the terminal, detention while it is held outside it. Both accrue daily and are usually the importer's cost, so clearing customs promptly is a commercial matter as much as an administrative one.",
  },
  {
    term: "Tooling amortisation",
    letter: "T",
    definition:
      "Spreading the one-off cost of dies, patterns or fixtures across the pieces they produce, rather than invoicing it separately up front. Whether tooling is amortised, paid for outright, and who then owns it, is agreed before the first order.",
  },
  {
    term: "Telegraphic transfer (T/T)",
    letter: "T",
    definition:
      "A bank-to-bank wire transfer, and the ordinary way an advance or a balance is settled. Fast and inexpensive, but it carries no guarantee of its own — whatever protection exists comes from what the payment is made against, such as shipping documents.",
  },
  {
    term: "Documents against payment (D/P)",
    letter: "D",
    definition:
      "A bank collection in which the shipping documents are released to the buyer only when the invoice is paid. Neither side hands over value before the other, but no bank guarantees payment, which is what separates it from a letter of credit.",
  },
  {
    term: "Open account",
    letter: "O",
    definition:
      "Goods shipped and invoiced with payment due after arrival. It places the exposure entirely on the supplier, and is a feature of established relationships rather than an opening position.",
  },
  {
    term: "Discrepancy",
    letter: "D",
    definition:
      "Any mismatch between a document presented under a letter of credit and what the credit demanded — a name spelled differently, a date past the latest one stated, a document missing. Each one carries a fee and delays payment, and most are caused by wording nobody checked before the credit was issued.",
  },
  {
    term: "SWIFT charge codes (OUR / SHA / BEN)",
    letter: "S",
    definition:
      "Who pays the bank charges on an international transfer: the sender, both sides, or the beneficiary. Under BEN, intermediary banks deduct along the way and the beneficiary receives less than the invoice states, which reads as a short payment and holds up the shipment until it is reconciled.",
  },
];

export const glossaryLetters = [
  ...new Set(glossary.map((entry) => entry.letter)),
].sort();

export default glossary;
