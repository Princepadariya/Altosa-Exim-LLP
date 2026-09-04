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
];

export const glossaryLetters = [
  ...new Set(glossary.map((entry) => entry.letter)),
].sort();

export default glossary;
