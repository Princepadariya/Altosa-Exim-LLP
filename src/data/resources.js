/**
 * Buyer guides.
 *
 * These are practical references on sourcing and exporting — general trade and
 * engineering practice, written for buyers who are new to importing from India.
 * They deliberately describe how things work, not how good Altosa is.
 *
 * Body blocks are rendered by components/ui/Prose.jsx:
 *   { type: "p",    text }
 *   { type: "h2",   text }
 *   { type: "list", items, ordered? }
 *   { type: "note", text }
 *   { type: "table", head: [], rows: [[]] }
 */

export const resourceCategories = [
  { id: "all", label: "All guides" },
  { id: "rfq", label: "Sending an RFQ" },
  { id: "commercial", label: "Commercial terms" },
  { id: "quality", label: "Quality & records" },
  { id: "logistics", label: "Shipping & documents" },
];

export const resources = [
  {
    slug: "what-to-include-in-an-rfq",
    category: "rfq",
    title: "What to put in an RFQ so the first reply is useful",
    excerpt:
      "Most first inquiries cannot be quoted as written. Six details turn a request for a price into a request that can actually be answered.",
    readingTime: "6 min read",
    updated: "September 2026",
    body: [
      {
        type: "p",
        text: "A supplier cannot price a part they cannot picture. Most first inquiries arrive missing something that makes quoting impossible, and the reply is a list of questions rather than a number — which costs both sides a week. The fix is not a longer email; it is six specific pieces of information.",
      },
      { type: "h2", text: "1. The drawing, with its revision" },
      {
        type: "p",
        text: "A drawing without a revision number is a drawing nobody can hold you to later. State the revision in the inquiry and freeze it before production. If the drawing changes after quotation, the quotation is superseded rather than adjusted informally — that is normal, and saying so early avoids an argument at delivery.",
      },
      {
        type: "p",
        text: "No drawing? A sample part can be reverse-engineered into one. That work is quoted separately, before it begins, because it is engineering time rather than a favour.",
      },
      { type: "h2", text: "2. Material grade and the standard it comes from" },
      {
        type: "p",
        text: "\"Stainless steel\" is not a specification. 316L to ASTM A276 is. Where you can, name both the grade and the standard, because the standard determines which tests the mill actually ran. Where you only know the application, say that instead of guessing — a wrong grade confidently stated is worse than an honest gap.",
      },
      { type: "h2", text: "3. Quantity, and whether it repeats" },
      {
        type: "p",
        text: "Quantity changes the process, not just the price. A part that is machined from bar at 200 pieces may be cast or cold-forged at 20,000, and the tooling cost only makes sense at the second number. Say whether the quantity is a one-off, an annual requirement, or a trial ahead of a programme.",
      },
      { type: "h2", text: "4. Tolerances that actually matter" },
      {
        type: "p",
        text: "Not every dimension on a drawing is critical, but a supplier quoting conservatively has to assume they all are. Identifying the handful of features that carry function — the bore, the mating face, the thread class — usually lowers the price and shortens the lead time, because the rest can be held to general tolerances.",
      },
      { type: "h2", text: "5. The records you need with the order" },
      {
        type: "p",
        text: "Ask for records in the inquiry, not after the parts ship. Availability depends on the part, the process and the supplier, so it belongs in the quotation for that order.",
      },
      {
        type: "list",
        items: [
          "Material test certificate for the heat supplied",
          "Dimensional inspection report, and to what sample size",
          "Hardness or mechanical properties after heat treatment",
          "Plating or coating thickness",
          "Third-party inspection, and whose scope governs it",
        ],
      },
      { type: "h2", text: "6. Destination and target timing" },
      {
        type: "p",
        text: "Destination decides more than freight cost. It drives marking requirements, documentation, inspection regimes and whether the part is exportable to that market at all. Give the country and the port, airport or delivery city, plus your preferred Incoterms® 2020 rule if you have one.",
      },
      {
        type: "note",
        text: "An inquiry missing these gets a request for them first. That is why the request form asks for them up front rather than after a price has been discussed.",
      },
    ],
    related: ["incoterms-2020-explained", "reading-a-material-test-certificate"],
  },

  {
    slug: "incoterms-2020-explained",
    category: "commercial",
    title: "Incoterms® 2020: what each rule actually decides",
    excerpt:
      "Eleven rules, three questions. Who pays for carriage, where risk transfers, and who clears customs — everything else is contract, not Incoterms.",
    readingTime: "7 min read",
    updated: "September 2026",
    body: [
      {
        type: "p",
        text: "Incoterms® rules are frequently treated as shorthand for a whole deal. They are not. Each rule answers three questions and nothing else: who arranges and pays for carriage, at what point risk passes from seller to buyer, and who handles export and import clearance.",
      },
      {
        type: "p",
        text: "They do not set payment terms. They do not define quality, warranty, or what happens when parts are rejected. They do not transfer title. Those live in the contract, and a quotation that names a rule without covering them has not covered them.",
      },
      { type: "h2", text: "The split that catches people out" },
      {
        type: "p",
        text: "Under CFR and CIF the seller pays for the main carriage, but risk passes when the goods are loaded on board. If the vessel is lost mid-ocean, the seller has paid the freight and the buyer carries the loss. Cost and risk are separate questions, and the same rule can answer them differently.",
      },
      { type: "h2", text: "Rules for any mode of transport" },
      {
        type: "table",
        head: ["Rule", "Risk passes", "Buyer arranges"],
        rows: [
          ["EXW", "At the seller's premises", "Collection, export clearance, everything after"],
          ["FCA", "On handover to the named carrier", "Main carriage and import"],
          ["CPT", "On handover to the first carrier", "Import; seller pays carriage"],
          ["CIP", "On handover to the first carrier", "Import; seller pays carriage and insures"],
          ["DAP", "At the named destination", "Import clearance and duties"],
          ["DPU", "Once unloaded at destination", "Import clearance and duties"],
          ["DDP", "At the named destination, cleared", "Nothing further"],
        ],
      },
      { type: "h2", text: "Sea and inland waterway only" },
      {
        type: "table",
        head: ["Rule", "Risk passes", "Buyer arranges"],
        rows: [
          ["FAS", "Alongside the vessel", "Loading, freight, import"],
          ["FOB", "Once on board", "Freight and import"],
          ["CFR", "Once on board", "Import; seller pays freight"],
          ["CIF", "Once on board", "Import; seller pays freight and insures"],
        ],
      },
      {
        type: "p",
        text: "These four are for sea freight moving as break-bulk or where the buyer genuinely takes delivery at the ship's rail. Containerised cargo handed to a terminal days before loading is better served by FCA, CPT or CIP, because the container leaves the seller's control long before it reaches the vessel.",
      },
      { type: "h2", text: "Always name the place" },
      {
        type: "p",
        text: "A rule without a named place is incomplete. \"FOB\" is ambiguous; \"FOB Mundra, Incoterms® 2020\" is not. The named place is where the rule's obligations actually bite, and it is the difference between two prices that look comparable and two prices that are not.",
      },
      {
        type: "note",
        text: "Incoterms® is a registered trademark of the International Chamber of Commerce. This is a general explanation, not legal advice — the ICC's own publication governs, and your contract governs everything the rules do not cover.",
      },
    ],
    related: ["what-to-include-in-an-rfq", "export-documents-explained"],
  },

  {
    slug: "export-documents-explained",
    category: "logistics",
    title: "What travels with an Indian export shipment",
    excerpt:
      "The documents a buyer receives, what each one is actually for, and which of them you need before the container arrives rather than after.",
    readingTime: "5 min read",
    updated: "September 2026",
    body: [
      {
        type: "p",
        text: "Export paperwork looks like bureaucracy until a container is sitting at a port and one document is wrong. Each of these exists to answer a specific question from customs, the carrier or your own finance team.",
      },
      { type: "h2", text: "Commercial documents" },
      {
        type: "list",
        items: [
          "Commercial invoice — the goods, the value and the terms of sale. Customs values the shipment from this at both ends, so a description that does not match the goods creates a delay.",
          "Packing list — carton-by-carton contents, weights and dimensions. This is what an inspector checks against, and what supports a short-shipment claim.",
        ],
      },
      { type: "h2", text: "Transport documents" },
      {
        type: "list",
        items: [
          "Bill of lading — the carrier's contract for sea freight. An original negotiable B/L is a document of title: whoever holds it controls the cargo, which is why it moves through banks under a letter of credit.",
          "Airway bill — the air equivalent, but not a document of title. Cargo is released to the named consignee, so the consignee field matters more than it does at sea.",
        ],
      },
      { type: "h2", text: "Origin and compliance" },
      {
        type: "list",
        items: [
          "Certificate of origin — establishes where goods were produced. A preferential certificate under a trade agreement may reduce duty at your end; a non-preferential one simply states origin.",
          "Shipping bill — the Indian customs export declaration, filed against the exporter's IEC. You will rarely need it, but it is the document that proves the export happened.",
          "Insurance certificate — required where the Incoterms® rule puts insurance on the seller, such as CIF and CIP.",
        ],
      },
      { type: "h2", text: "Quality records" },
      {
        type: "p",
        text: "Material test certificates and inspection reports are not export documents in the customs sense, but for an engineering buyer they are the ones that matter most. They should be agreed at quotation and issued against the order — chasing them after dispatch is how audit files end up incomplete.",
      },
      {
        type: "note",
        text: "Document requirements differ by destination and are reviewed per inquiry. Destination-market conformity remains a decision for the importer of record.",
      },
    ],
    related: ["incoterms-2020-explained", "reading-a-material-test-certificate"],
  },

  {
    slug: "reading-a-material-test-certificate",
    category: "quality",
    title: "How to read a material test certificate",
    excerpt:
      "An MTC is only useful if it traces to the parts in front of you. What to check, in what order, and the three mismatches worth rejecting over.",
    readingTime: "5 min read",
    updated: "September 2026",
    body: [
      {
        type: "p",
        text: "A material test certificate records what a mill or foundry measured on a specific batch of material. It is evidence, not decoration — and it is only evidence if it traces to the parts you actually received.",
      },
      { type: "h2", text: "Check traceability first" },
      {
        type: "p",
        text: "Before reading a single test value, confirm the heat or cast number on the certificate appears on the parts, the packing list, or both. A certificate that cannot be tied to the batch in front of you tells you about someone else's steel.",
      },
      { type: "h2", text: "Then the standard" },
      {
        type: "p",
        text: "The certificate should name the standard the material was produced and tested to, and it should be the standard on your drawing. A near-equivalent grade is not the same grade: composition limits differ, and so do the tests each standard actually requires.",
      },
      { type: "h2", text: "Then the numbers" },
      {
        type: "table",
        head: ["Section", "What it should show", "Common problem"],
        rows: [
          ["Chemical composition", "Each specified element within the standard's limits", "An element reported but not within range, or simply omitted"],
          ["Mechanical properties", "Tensile, yield and elongation as the standard requires", "Values quoted from the standard rather than measured"],
          ["Heat treatment", "Condition supplied, and the cycle where specified", "Blank, on a part whose properties depend on it"],
          ["Test method", "The method and its standard", "Method not stated, so results are not comparable"],
        ],
      },
      { type: "h2", text: "Three mismatches worth stopping for" },
      {
        type: "list",
        ordered: true,
        items: [
          "The heat number does not appear anywhere on the goods or the packing list.",
          "The grade on the certificate is an equivalent of the one you specified, not the one you specified.",
          "Mechanical values are identical to the standard's minimums to the decimal — a sign they were transcribed rather than tested.",
        ],
      },
      {
        type: "note",
        text: "Altosa coordinates records; it does not certify them. Availability of any record depends on the part, the process and the supplier, and is confirmed in the quotation for that order.",
      },
    ],
    related: ["what-to-include-in-an-rfq", "export-documents-explained"],
  },

  {
    slug: "merchant-exporter-or-commission-agent",
    category: "commercial",
    title: "Merchant exporter or commission agent: which fits your order",
    excerpt:
      "Two arrangements, genuinely different commercial positions. Who invoices you, who carries the risk, and when each one is the sensible choice.",
    readingTime: "4 min read",
    updated: "September 2026",
    body: [
      {
        type: "p",
        text: "Buyers often use \"agent\" and \"exporter\" interchangeably. They describe different commercial positions, and which one applies changes who you are contracting with, who carries risk, and how the intermediary is paid.",
      },
      { type: "h2", text: "Merchant export" },
      {
        type: "p",
        text: "The merchant exporter buys from the manufacturer and sells to you. You have one counterparty, one invoice and one point of accountability. The exporter's margin sits inside the quoted price, agreed up front. You do not see the factory's price, because you are not buying from the factory.",
      },
      {
        type: "p",
        text: "This suits buyers who want a single commercial relationship, orders consolidating several suppliers into one shipment, and teams without an import desk experienced in Indian suppliers.",
      },
      { type: "h2", text: "Commission agency" },
      {
        type: "p",
        text: "The commission agent represents you locally. You contract directly with the manufacturer, you see and negotiate the factory price, and the agent is paid an agreed commission on the order. Payment, and the commercial risk that goes with it, runs between you and the manufacturer.",
      },
      {
        type: "p",
        text: "This suits buyers with an established import process, long-term programmes where a direct supplier relationship has value, and cases where full pricing visibility matters more than a single counterparty.",
      },
      { type: "h2", text: "The comparison, plainly" },
      {
        type: "table",
        head: ["Question", "Merchant export", "Commission agency"],
        rows: [
          ["Who invoices you", "The merchant exporter", "The manufacturer"],
          ["Exporter of record", "The merchant exporter", "The manufacturer"],
          ["How the intermediary is paid", "Margin in the quoted price", "Agreed commission on the order"],
          ["Do you see factory pricing", "No", "Yes"],
          ["Who pays the factory", "The merchant exporter", "You"],
          ["Consolidating suppliers", "Straightforward", "Each supplier contracts with you"],
        ],
      },
      {
        type: "note",
        text: "Neither arrangement is inherently better. What matters is that it is agreed before the order and recorded in the quotation, rather than left implied until something goes wrong.",
      },
    ],
    related: ["incoterms-2020-explained", "what-to-include-in-an-rfq"],
  },
  {
    slug: "export-packing-and-marking",
    category: "logistics",
    title: "How export packing is specified, and why it belongs in the quotation",
    excerpt:
      "\u201CExport packing\u201D means whatever the supplier already does. What actually protects the parts \u2014 and clears customs \u2014 is a method written down before production.",
    readingTime: "6 min read",
    updated: "September 2026",
    body: [
      {
        type: "p",
        text: "Packing is the line buyers skim. It is also where a technically perfect order turns into a claim: parts that left the factory to drawing arrive pitted with rust, or sit at a destination port because the pallet under them is not compliant. Neither failure is a manufacturing problem, and neither is expensive to prevent \u2014 but only if the method is agreed before production rather than assumed.",
      },
      { type: "h2", text: "\u201CExport packing\u201D is not a specification" },
      {
        type: "p",
        text: "Written into a purchase order on its own, the phrase means whatever that supplier already does. For one it is a fumigated case with corrosion protection; for another it is the same carton used for a domestic delivery three hours away. Both suppliers believe they quoted export packing, and both are being truthful.",
      },
      {
        type: "p",
        text: "The way out is to state the method rather than the intent: what the parts sit in, how they are protected against moisture, what the timber under them complies with, and how each package is marked. Those four answers cost nothing to write down and settle almost every packing dispute before it starts.",
      },
      {
        type: "table",
        head: ["Method", "Typically used for", "Worth knowing"],
        rows: [
          [
            "Seaworthy wooden case",
            "Heavy or irregular machined and fabricated parts",
            "Solid wood \u2014 must carry an ISPM 15 mark",
          ],
          [
            "Plywood or OSB case",
            "Medium-weight parts, repeat shipments",
            "Processed board is outside ISPM 15",
          ],
          [
            "Palletised cartons, strapped and wrapped",
            "Fasteners, smaller turned parts, high piece counts",
            "Pallet itself still falls under ISPM 15 if solid wood",
          ],
          [
            "Steel or returnable stillage",
            "Ongoing programmes with regular call-offs",
            "Return logistics and ownership need agreeing up front",
          ],
        ],
      },
      { type: "h2", text: "ISPM 15, and why customs cares about your pallet" },
      {
        type: "p",
        text: "ISPM 15 is the international standard governing solid wood packaging in traded goods. It exists to stop timber pests crossing borders inside crates and pallets, and it applies to the packaging rather than to what is inside it. Compliant wood is heat treated or fumigated and then stamped with the IPPC mark, the treatment code and the country and registration of the treatment facility.",
      },
      {
        type: "p",
        text: "The consequence of getting it wrong falls on the consignment, not the packer. Depending on the destination, non-compliant wood can mean treatment at the port at your cost, destruction of the packaging, or re-export of the whole shipment \u2014 with the parts inside it, however correct they are.",
      },
      {
        type: "note",
        text: "ISPM 15 covers solid wood. Processed materials \u2014 plywood, OSB, particleboard, corrugated card \u2014 are manufactured in ways that already destroy pests and fall outside the standard. A plywood case on a solid-wood pallet still needs a compliant pallet.",
      },
      { type: "h2", text: "Corrosion is the failure nobody quotes for" },
      {
        type: "p",
        text: "A container crossing the Indian Ocean goes through repeated heating and cooling cycles, and the moisture in the air inside it condenses on whatever is coldest \u2014 usually the steel. Bare machined surfaces can leave a factory clean and arrive five weeks later with visible rust on exactly the faces that matter.",
      },
      {
        type: "list",
        items: [
          "A rust-preventive oil or wax film on unplated machined surfaces",
          "VCI film, paper or bags, which release a vapour-phase inhibitor inside a sealed package",
          "Desiccant sized to the volume of the package, not added by the handful",
          "Sealed liners for long transits or humid destinations",
          "Separators so finished faces cannot rub against each other in transit",
        ],
      },
      {
        type: "p",
        text: "Which of these applies depends on the finish, the transit time and the destination climate. A plated part and a bare ground shaft do not need the same protection, and paying for the heavier option on both is as avoidable as skipping it on the second.",
      },
      { type: "h2", text: "Marking: what belongs on the outside" },
      {
        type: "p",
        text: "Marking is what lets a warehouse book your goods in without opening them, and what lets you find one item in a mixed consignment without unpacking all of it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Purchase order number and, where you use one, the line item",
          "Part number and drawing revision",
          "Quantity in that package",
          "Case number in the series \u2014 3 of 11, not simply \u201Ccase\u201D",
          "Gross and net weight, and dimensions",
          "Country of origin",
          "Handling and sling marks where the package needs them",
          "Consignee details as they appear on the shipping documents",
        ],
      },
      {
        type: "p",
        text: "Where your goods-in process depends on a barcode or a specific label format, send the format with the RFQ. It is trivial to apply during packing and disproportionately expensive to add after arrival.",
      },
      { type: "h2", text: "Weights and dimensions price the freight" },
      {
        type: "p",
        text: "Freight is charged on whichever is greater: actual weight or volumetric weight. Packing that is safe but wasteful in volume can cost more to ship than the packing itself saved, particularly on part-container and air consignments. Ask for gross and net weights and case dimensions with the quotation rather than after booking \u2014 they determine the freight cost, the handling equipment needed at the far end, and whether a consignment consolidates efficiently into a full container.",
      },
      { type: "h2", text: "What to put in the RFQ" },
      {
        type: "list",
        items: [
          "Destination country and port, so wood and treatment requirements can be checked",
          "Whether the consignment is FCL, LCL or air",
          "Expected total transit and storage time before the parts are used",
          "Any packaging standard your business applies to inbound goods",
          "Label or barcode formats your goods-in process expects",
          "Whether packaging is returnable, and who owns it if it is",
        ],
      },
      {
        type: "note",
        text: "Packing method is one of the lines a quotation states, alongside quantity, lead time, payment basis and the applicable Incoterms\u00AE 2020 rule. If a quotation you receive does not mention it, that is worth asking about before the order rather than after the container is sealed.",
      },
    ],
    related: ["export-documents-explained", "incoterms-2020-explained"],
  },
];

export const getResource = (slug) =>
  resources.find((resource) => resource.slug === slug);

export const getResourcesByCategory = (categoryId) =>
  categoryId === "all"
    ? resources
    : resources.filter((resource) => resource.category === categoryId);

export default resources;
