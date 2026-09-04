/**
 * How an order physically leaves India: packing, modes and the documents that
 * travel with it. General export practice, confirmed per order in the
 * quotation rather than promised in the abstract.
 */

export const packingOptions = [
  {
    id: "export-cases",
    name: "Fumigated wooden cases",
    note: "ISPM 15 heat-treated and stamped. Standard for machined and cast parts where a pallet alone will not protect the geometry.",
    suitedTo: "Machined components, castings, assemblies",
  },
  {
    id: "pallets",
    name: "Strapped pallets with stretch wrap",
    note: "Economical for robust, high-count parts. Corner protection and edge board specified against the part.",
    suitedTo: "Fasteners, flanges, bulk hardware",
  },
  {
    id: "vci",
    name: "VCI bagging and desiccant",
    note: "Vapour corrosion inhibitor for unplated ferrous parts on long sea transits, with desiccant sized to the container volume.",
    suitedTo: "Bare steel and machined ferrous surfaces",
  },
  {
    id: "returnable",
    name: "Buyer-nominated packaging",
    note: "Where you supply a packing standard or returnable dunnage, that specification is recorded in the order documentation before production.",
    suitedTo: "Programme supply and line-side delivery",
  },
];

export const shippingModes = [
  {
    id: "fcl",
    mode: "FCL — Full container load",
    transit: "Longest transit, lowest unit cost",
    note: "Best when a single order fills 20' or 40' capacity, or when several suppliers can be consolidated into one container.",
    icon: "container",
  },
  {
    id: "lcl",
    mode: "LCL — Less than container load",
    transit: "Adds consolidation time at both ends",
    note: "Suits trial orders and part quantities. Handling is heavier, so packing specification matters more, not less.",
    icon: "ship",
  },
  {
    id: "air",
    mode: "Air freight",
    transit: "Fastest, highest unit cost",
    note: "Used for line-stop situations, samples and first articles. Density and dimensional weight drive the cost more than mass.",
    icon: "bolt",
  },
  {
    id: "courier",
    mode: "Express courier",
    transit: "Door to door, a few days",
    note: "Samples, first-off parts and drawings-to-reality checks before a production quantity is committed.",
    icon: "document",
  },
];

/** Documents that typically accompany an Indian export shipment. */
export const exportDocuments = [
  {
    name: "Commercial invoice",
    purpose: "States the goods, value and terms of sale. The basis for customs valuation at both ends.",
  },
  {
    name: "Packing list",
    purpose: "Carton-by-carton contents, weights and dimensions. Used for inspection and for claiming short shipment.",
  },
  {
    name: "Bill of lading / airway bill",
    purpose: "The carrier's contract and, for an original B/L, the document of title to the goods.",
  },
  {
    name: "Certificate of origin",
    purpose: "Establishes where the goods were produced. Preferential certificates may reduce duty where a trade agreement applies.",
  },
  {
    name: "Shipping bill",
    purpose: "The Indian customs export declaration filed against the exporter's IEC.",
  },
  {
    name: "Insurance certificate",
    purpose: "Required where the Incoterms® rule places the insurance obligation on the seller, such as CIF and CIP.",
  },
  {
    name: "Material test certificate",
    purpose: "Mill or foundry evidence of chemical composition and mechanical properties for the heat supplied.",
  },
  {
    name: "Inspection report",
    purpose: "Dimensional, hardness or third-party inspection results against the agreed scope for that order.",
  },
];

export const logisticsNotice =
  "Packing method, container plan and the documents issued are recorded in the quotation for that order. Document requirements differ by destination and are reviewed per inquiry — acceptance is not automatic for every market.";

export default packingOptions;
