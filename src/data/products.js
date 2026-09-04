/**
 * Product families are described as manufacturing capabilities, not as stock.
 * Altosa sources against a drawing — this list tells a buyer what the supplier
 * base around Rajkot can address, so they know whether to send a specification.
 */

export const productCategories = [
  { id: "all", label: "All capabilities" },
  { id: "machined", label: "Machined" },
  { id: "forged", label: "Forged" },
  { id: "cast", label: "Cast" },
  { id: "fasteners", label: "Fasteners" },
  { id: "electrical", label: "Electrical" },
  { id: "fabricated", label: "Fabricated" },
];

export const products = [
  {
    id: "precision-machined",
    category: "machined",
    title: "Precision machined components",
    summary:
      "CNC turned and milled parts produced to drawing, from prototype batches through to repeat production runs.",
    processes: ["CNC turning", "CNC milling", "VMC machining", "Grinding"],
    materials: ["Carbon steel", "Alloy steel", "Stainless steel", "Aluminium", "Brass"],
    tolerance: "Confirmed against your drawing",
    industries: ["automotive", "pumps-valves", "general-engineering"],
    records: ["Dimensional report", "Material test certificate"],
  },
  {
    id: "forged-components",
    category: "forged",
    title: "Forged components",
    summary:
      "Closed-die and open-die forgings for load-bearing assemblies, supplied as-forged or fully machined.",
    processes: ["Closed-die forging", "Open-die forging", "Heat treatment", "Machining"],
    materials: ["Carbon steel", "Alloy steel", "Stainless steel"],
    tolerance: "Per forging standard and drawing",
    industries: ["automotive", "agriculture", "construction"],
    records: ["Material test certificate", "Hardness report", "Heat treatment record"],
  },
  {
    id: "castings",
    category: "cast",
    title: "Iron & non-ferrous castings",
    summary:
      "Sand and investment castings for housings, bodies and brackets, with machining coordinated as part of the same order.",
    processes: ["Sand casting", "Investment casting", "Shot blasting", "Machining"],
    materials: ["Grey iron", "Ductile iron", "Aluminium", "Bronze"],
    tolerance: "Per casting standard and drawing",
    industries: ["pumps-valves", "agriculture", "automotive"],
    records: ["Chemical composition", "Mechanical properties", "Dimensional report"],
  },
  {
    id: "fasteners",
    category: "fasteners",
    title: "Fasteners & threaded parts",
    summary:
      "Bolts, nuts, washers, studs and anchor hardware to standard or to a buyer's own drawing.",
    processes: ["Cold forging", "Thread rolling", "Heat treatment", "Plating"],
    materials: ["Mild steel", "Alloy steel", "Stainless steel", "Hot-dip galvanised"],
    tolerance: "To the standard stated in your inquiry",
    industries: ["construction", "general-engineering"],
    records: ["Material test certificate", "Coating thickness report"],
  },
  {
    id: "copper-brass",
    category: "electrical",
    title: "Copper & brass electrical parts",
    summary:
      "Terminals, lugs, busbars, contacts and conductive inserts for switchgear and power distribution assemblies.",
    processes: ["Precision turning", "Stamping", "Extrusion", "Electroplating"],
    materials: ["Electrolytic copper", "Brass", "Bronze"],
    tolerance: "Confirmed against your drawing",
    industries: ["electrical"],
    records: ["Material composition", "Plating thickness", "Dimensional report"],
  },
  {
    id: "sheet-metal",
    category: "fabricated",
    title: "Sheet metal & fabricated assemblies",
    summary:
      "Laser-cut, bent and welded assemblies including enclosures, brackets and mounting frames.",
    processes: ["Laser cutting", "Press braking", "Welding", "Powder coating"],
    materials: ["Mild steel", "Stainless steel", "Aluminium"],
    tolerance: "Per fabrication drawing",
    industries: ["electrical", "general-engineering", "construction"],
    records: ["Weld inspection", "Coating thickness report"],
  },
  {
    id: "pipe-fittings",
    category: "fabricated",
    title: "Flanges, pipe fittings & couplings",
    summary:
      "Flanges, fittings and couplings for fluid handling and structural pipework, machined to the applicable standard.",
    processes: ["Forging", "Machining", "Threading", "Surface treatment"],
    materials: ["Carbon steel", "Stainless steel", "Ductile iron"],
    tolerance: "To the standard stated in your inquiry",
    industries: ["pumps-valves", "construction"],
    records: ["Material test certificate", "Pressure test record"],
  },
  {
    id: "wear-parts",
    category: "cast",
    title: "Wear & replacement parts",
    summary:
      "Hardened wear parts and aftermarket replacements produced from a sample part or a reverse-engineered drawing.",
    processes: ["Casting", "Forging", "Hardening", "Finish machining"],
    materials: ["Hardened alloy steel", "Ductile iron", "Manganese steel"],
    tolerance: "From sample or reverse-engineered drawing",
    industries: ["agriculture", "automotive"],
    records: ["Hardness report", "Dimensional report"],
  },
];

export const getProductsByCategory = (categoryId) =>
  categoryId === "all"
    ? products
    : products.filter((item) => item.category === categoryId);

export default products;
