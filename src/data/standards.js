/**
 * Reference tables for buyers writing a specification.
 *
 * These are published material and Incoterms references, not claims about
 * Altosa. Approximate equivalents are exactly that — near-equivalent grades
 * differ in composition and in the tests each standard requires, so the grade
 * that governs an order is the one written on the drawing.
 */

export const materialFamilies = [
  {
    id: "structural-steel",
    family: "Structural & mild steel",
    note: "General fabrication, brackets, frames and non-critical machined parts.",
    grades: [
      { indian: "IS 2062 E250", astm: "A36", en: "S235JR", note: "General structural" },
      { indian: "IS 2062 E350", astm: "A572 Gr 50", en: "S355JR", note: "Higher strength structural" },
      { indian: "IS 1079 / IS 513", astm: "A1011 CS", en: "DC01", note: "Cold-rolled sheet" },
    ],
  },
  {
    id: "alloy-steel",
    family: "Alloy & heat-treatable steel",
    note: "Shafts, gears, fasteners and forged load-bearing parts.",
    grades: [
      { indian: "40Cr4 / EN18", astm: "5140", en: "41Cr4", note: "Through-hardening" },
      { indian: "16MnCr5", astm: "5115", en: "16MnCr5", note: "Case-hardening" },
      { indian: "42CrMo4 / EN19", astm: "4140", en: "42CrMo4", note: "High-strength shafts" },
      { indian: "EN8 / C45", astm: "1045", en: "C45", note: "Medium carbon, general" },
    ],
  },
  {
    id: "stainless",
    family: "Stainless steel",
    note: "Fluid handling, food and corrosive-service components.",
    grades: [
      { indian: "X04Cr19Ni9", astm: "304 / 304L", en: "1.4301 / 1.4307", note: "General austenitic" },
      { indian: "X04Cr17Ni12Mo2", astm: "316 / 316L", en: "1.4401 / 1.4404", note: "Chloride resistance" },
      { indian: "X12Cr12", astm: "410", en: "1.4006", note: "Martensitic, wear parts" },
    ],
  },
  {
    id: "cast-iron",
    family: "Cast iron",
    note: "Pump and valve bodies, housings, brackets and counterweights.",
    grades: [
      { indian: "IS 210 FG200", astm: "A48 Class 30", en: "EN-GJL-200", note: "Grey iron" },
      { indian: "IS 1865 SG 400/15", astm: "A536 60-40-18", en: "EN-GJS-400-15", note: "Ductile, ductile-critical" },
      { indian: "IS 1865 SG 500/7", astm: "A536 70-50-05", en: "EN-GJS-500-7", note: "Higher strength ductile" },
    ],
  },
  {
    id: "copper-alloys",
    family: "Copper & brass",
    note: "Terminals, busbars, contacts and fluid fittings.",
    grades: [
      { indian: "IS 613 ETP", astm: "C11000", en: "Cu-ETP", note: "Electrolytic tough pitch" },
      { indian: "IS 319 free-cutting brass", astm: "C36000", en: "CuZn39Pb3", note: "Machined brass parts" },
      { indian: "IS 305 gunmetal", astm: "C83600", en: "CuSn5Zn5Pb5", note: "Bearing / valve bronze" },
    ],
  },
];

/** Surface treatments a buyer may need to name on the drawing. */
export const surfaceTreatments = [
  {
    name: "Zinc plating (trivalent)",
    typical: "5–12 µm",
    note: "Indoor and light outdoor service; specify passivation colour.",
  },
  {
    name: "Hot-dip galvanising",
    typical: "45–85 µm",
    note: "Structural and outdoor hardware; check thread clearance after coating.",
  },
  {
    name: "Electroless nickel",
    typical: "10–25 µm",
    note: "Uniform coverage on complex geometry; specify phosphorus content.",
  },
  {
    name: "Tin plating",
    typical: "3–15 µm",
    note: "Electrical contact surfaces; specify matte or bright finish.",
  },
  {
    name: "Powder coating",
    typical: "60–120 µm",
    note: "Fabricated assemblies; specify RAL colour and pre-treatment.",
  },
  {
    name: "Black oxide / phosphating",
    typical: "1–5 µm",
    note: "Mild corrosion resistance with negligible dimensional change.",
  },
];

/** Incoterms® 2020, grouped the way they actually behave. */
export const incotermGroups = [
  {
    group: "Any mode of transport",
    rules: [
      { code: "EXW", name: "Ex Works", handover: "Seller's premises", buyerCarries: "Everything from collection onwards" },
      { code: "FCA", name: "Free Carrier", handover: "Named place / carrier", buyerCarries: "Main carriage and import" },
      { code: "CPT", name: "Carriage Paid To", handover: "First carrier", buyerCarries: "Risk from first carrier; import" },
      { code: "CIP", name: "Carriage & Insurance Paid To", handover: "First carrier", buyerCarries: "Import; seller insures" },
      { code: "DAP", name: "Delivered at Place", handover: "Named destination", buyerCarries: "Import clearance and duties" },
      { code: "DPU", name: "Delivered at Place Unloaded", handover: "Unloaded at destination", buyerCarries: "Import clearance and duties" },
      { code: "DDP", name: "Delivered Duty Paid", handover: "Named destination, cleared", buyerCarries: "Nothing further" },
    ],
  },
  {
    group: "Sea and inland waterway only",
    rules: [
      { code: "FAS", name: "Free Alongside Ship", handover: "Alongside the vessel", buyerCarries: "Loading, freight and import" },
      { code: "FOB", name: "Free On Board", handover: "On board the vessel", buyerCarries: "Freight and import" },
      { code: "CFR", name: "Cost and Freight", handover: "On board; seller pays freight", buyerCarries: "Risk from loading; import" },
      { code: "CIF", name: "Cost, Insurance and Freight", handover: "On board; seller pays freight + insurance", buyerCarries: "Risk from loading; import" },
    ],
  },
];

export const standardsNotice =
  "Cross-references are approximate. Near-equivalent grades differ in composition limits and in the tests each standard requires, so the grade that governs an order is the one stated on your drawing — not the equivalent shown here.";

export default materialFamilies;
