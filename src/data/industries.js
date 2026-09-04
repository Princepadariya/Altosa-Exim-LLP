/**
 * Sectors the supplier base covers most often. These describe range, not a
 * claim of completed work in every sector — availability is confirmed per
 * inquiry against the buyer's drawing.
 *
 * The extra fields (`intro`, `applications`, `standards`, `considerations`)
 * drive the per-sector detail pages at /industries/:id.
 */

export const industries = [
  {
    id: "automotive",
    number: "01",
    title: "Automotive & vehicle components",
    summary:
      "Machined housings, hubs, forged parts and cast components for vehicle assemblies and aftermarket supply.",
    icon: "gear",
    intro:
      "Automotive work divides sharply between programme supply, where a drawing is frozen and volumes are known years out, and aftermarket supply, where a part is often reverse-engineered from a sample. Both are sourced the same way here — against a specification rather than from a catalogue — but they carry very different tooling economics, so the quantity you state changes the answer more than it does in most sectors.",
    components: [
      "Machined housings and hubs",
      "Forged steering and suspension parts",
      "Cast brackets and mounts",
      "Precision-turned shafts and pins",
      "Aftermarket replacement components",
    ],
    materials: ["Carbon steel", "Alloy steel", "Grey & ductile iron", "Aluminium"],
    applications: [
      "Passenger vehicle sub-assemblies",
      "Commercial vehicle running gear",
      "Two- and three-wheeler components",
      "Aftermarket and replacement programmes",
    ],
    standards: ["IS 2062", "ASTM A536", "EN-GJS grades", "42CrMo4 / 4140", "16MnCr5"],
    considerations: [
      {
        title: "Volume decides the process",
        body: "A part machined from bar at 200 pieces may be forged or cast at 20,000. Say whether the quantity is a trial, an annual requirement or a programme, because tooling only pays back at the larger number.",
      },
      {
        title: "Aftermarket usually starts from a sample",
        body: "Where no drawing exists, a sample part can be reverse-engineered into one. That engineering is quoted separately, before it starts.",
      },
      {
        title: "Traceability expectations vary",
        body: "Programme supply often needs heat traceability and dimensional reports per batch. State that in the inquiry so it is priced, not discovered later.",
      },
    ],
  },
  {
    id: "electrical",
    number: "02",
    title: "Electrical & power distribution",
    summary:
      "Copper parts, terminals, busbars, contacts, lugs and precision components for electrical assemblies.",
    icon: "bolt",
    intro:
      "Electrical components are dominated by two variables that sit outside the drawing geometry: the conductivity of the base material and the plating on top of it. A dimensionally perfect terminal in the wrong copper grade, or with the wrong plating thickness, fails in service rather than at inspection — which is why both belong in the inquiry rather than in a later clarification.",
    components: [
      "Copper terminals and lugs",
      "Busbars and connectors",
      "Switchgear contacts",
      "Brass electrical inserts",
      "Precision-machined conductive parts",
    ],
    materials: ["Electrolytic copper", "Brass", "Bronze", "Tin & silver plating"],
    applications: [
      "Switchgear and control panels",
      "Power distribution assemblies",
      "Transformer and motor terminations",
      "Cable accessories and jointing hardware",
    ],
    standards: ["IS 613 ETP", "ASTM C11000", "Cu-ETP", "CuZn39Pb3 / C36000"],
    considerations: [
      {
        title: "Name the copper grade, not just \"copper\"",
        body: "Electrolytic tough pitch copper and free-cutting brass machine very differently and conduct very differently. The grade drives both price and performance.",
      },
      {
        title: "Plating thickness is a specification",
        body: "State the coating, its thickness range and whether you need a thickness report. Tin plating for a contact surface is not the same requirement as tin plating for corrosion protection.",
      },
      {
        title: "Copper pricing moves",
        body: "Quotations for copper-intensive parts usually carry a shorter validity than steel parts, because the metal content tracks the market.",
      },
    ],
  },
  {
    id: "general-engineering",
    number: "03",
    title: "General engineering & industrial",
    summary:
      "Bolts, nuts, washers, threaded parts and drawing-based precision components across mixed requirements.",
    icon: "caliper",
    intro:
      "This is the broadest category and the most common starting point: a mixed list of parts that do not belong to one process or one factory. It is also where a sourcing partner earns its commission most visibly, because a list of fifteen drawings sent to one manufacturer gets fifteen answers shaped by what that manufacturer already makes.",
    components: [
      "Bolts, nuts and washers",
      "Threaded rods and studs",
      "Drawing-based turned parts",
      "Sheet metal and fabricated assemblies",
      "Mixed-requirement component packages",
    ],
    materials: ["Mild steel", "Stainless steel", "Alloy steel", "Aluminium"],
    applications: [
      "Machine builders and OEM sub-assemblies",
      "Maintenance and spares packages",
      "Mixed component consolidation",
      "Second-source evaluation against an existing supplier",
    ],
    standards: ["IS 1367", "ISO 898-1", "ASTM A193 / A194", "DIN threads"],
    considerations: [
      {
        title: "Split the list before pricing it",
        body: "A mixed package usually spans several processes. Grouping it by process rather than by assembly gets each part to the supplier that makes it well.",
      },
      {
        title: "Property class matters on fasteners",
        body: "8.8, 10.9 and A2-70 are different materials and different heat treatments. The class belongs in the inquiry alongside the thread size.",
      },
      {
        title: "Consolidation saves more than unit price",
        body: "Shipping fifteen parts in one container against fifteen separate consignments is often the larger saving, and it is a reason to quote the whole list together.",
      },
    ],
  },
  {
    id: "construction",
    number: "04",
    title: "Construction & infrastructure",
    summary:
      "Structural fasteners, flanges, pipe fittings and heavy-duty threaded parts.",
    icon: "structure",
    intro:
      "Construction hardware is usually specified by standard rather than by drawing, and it is frequently governed by destination-market conformity rules that sit outside the supplier's control. That makes the destination question unusually important here: a structural fastener acceptable in one market may need marking or certification that is not available for another.",
    components: [
      "Structural fasteners and anchor bolts",
      "Flanges and pipe fittings",
      "Heavy-duty threaded parts",
      "Scaffolding and formwork components",
      "Galvanised hardware",
    ],
    materials: ["Structural steel", "Stainless steel", "Hot-dip galvanised steel"],
    applications: [
      "Structural steel connections",
      "Pipework and utility infrastructure",
      "Formwork, scaffolding and site hardware",
      "Civil and industrial projects",
    ],
    standards: ["IS 2062", "ASTM A325 / A490", "EN 14399", "ASME B16.5 flanges"],
    considerations: [
      {
        title: "Destination conformity is checked first",
        body: "Marking and certification requirements differ by market and are reviewed before an inquiry is accepted. Where the answer is no, we say so.",
      },
      {
        title: "Galvanising changes the thread",
        body: "Hot-dip coatings are thick enough to affect thread fit. Whether nuts are over-tapped, and to what allowance, needs stating.",
      },
      {
        title: "Project quantities move in steps",
        body: "Construction requirements often arrive as phased call-offs. Say so — it changes how the batch and the price are structured.",
      },
    ],
  },
  {
    id: "agriculture",
    number: "05",
    title: "Agriculture & off-highway",
    summary:
      "Castings, forgings and machined parts for tractors, implements and off-highway equipment.",
    icon: "tractor",
    intro:
      "Off-highway parts are built around wear and shock loading rather than tight tolerance. Hardness, section thickness and heat treatment usually govern whether a part survives its duty cycle, and those are the details worth pinning down first — a dimensionally correct tine in the wrong hardness simply wears out sooner.",
    components: [
      "Tractor and implement castings",
      "Forged linkage and hitch parts",
      "Machined gearbox components",
      "Wear parts and tines",
      "Off-highway equipment hardware",
    ],
    materials: ["Ductile iron", "Forged carbon steel", "Hardened alloy steel"],
    applications: [
      "Tractor linkages and hitch assemblies",
      "Tillage and harvesting implements",
      "Construction and earthmoving attachments",
      "Replacement wear parts",
    ],
    standards: ["IS 1865 SG grades", "ASTM A536", "EN-GJS-500-7", "Hardness per drawing"],
    considerations: [
      {
        title: "Hardness is the specification",
        body: "State the required hardness and where it is measured. Surface and core hardness on a case-hardened part are different requirements.",
      },
      {
        title: "Wear parts are often reverse-engineered",
        body: "Replacement parts frequently arrive as a sample rather than a drawing. That is workable, and the drawing work is quoted before it begins.",
      },
      {
        title: "Seasonality affects lead time",
        body: "Agricultural demand is seasonal at both ends. Building the target delivery window into the inquiry avoids quoting against an unrealistic date.",
      },
    ],
  },
  {
    id: "pumps-valves",
    number: "06",
    title: "Pumps, valves & fluid handling",
    summary:
      "Cast and machined bodies, flanges, fittings and precision-turned components.",
    icon: "valve",
    intro:
      "Fluid-handling parts combine a casting, a machining operation and, frequently, a pressure test — three stages where a part can fail for unrelated reasons. Porosity that passes visual inspection can fail under pressure, so the test requirement belongs in the quotation rather than being assumed from the application.",
    components: [
      "Cast pump and valve bodies",
      "Machined impellers and covers",
      "Flanges and couplings",
      "Precision-turned fluid fittings",
      "Sealing and gland components",
    ],
    materials: ["Cast iron", "Stainless steel", "Bronze", "Brass"],
    applications: [
      "Pump and valve manufacturing",
      "Water and wastewater infrastructure",
      "Process and chemical handling",
      "Irrigation and general fluid systems",
    ],
    standards: ["ASME B16.5", "IS 210 FG grades", "ASTM A216 WCB", "EN 1092-1"],
    considerations: [
      {
        title: "State the pressure test",
        body: "Hydrostatic test pressure and hold time, and whether a test certificate is required, should be named in the inquiry rather than inferred.",
      },
      {
        title: "Flange standard, not just size",
        body: "ASME, EN and IS flanges of nominally the same size differ in bolt circle and thickness. Name the standard and the class.",
      },
      {
        title: "Porosity is a casting risk",
        body: "For pressure-containing parts, agree acceptance criteria and any NDT requirement before production, not at rejection.",
      },
    ],
  },
];

export const getIndustryById = (id) => industries.find((item) => item.id === id);

export default industries;
