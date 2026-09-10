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
    title: "Automotive & Mobility",
    summary:
      "Machined housings, hubs, forged and cast components for passenger vehicles, commercial vehicles and two-wheelers.",
    icon: "gear",
    intro:
      "Automotive work divides sharply between programme supply — where a drawing is frozen and volumes are known years out — and aftermarket supply, where a part is often reverse-engineered from a sample. Both are sourced the same way here: against a specification rather than from a catalogue. But they carry very different tooling economics, so the quantity you state changes the answer more than it does in most sectors.",
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
        body: "A part machined from bar at 200 pieces may be forged or cast at 20,000. Say whether the quantity is a trial, an annual requirement or a programme — tooling only pays back at the larger number.",
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
    id: "agriculture",
    number: "02",
    title: "Agricultural Equipment",
    summary:
      "Castings, forgings, wear parts and machined components for tractors, implements, seeding and harvesting equipment.",
    icon: "tractor",
    intro:
      "Agricultural parts are built around wear resistance and shock loading rather than tight tolerance. A tillage tine in the wrong hardness wears out before the season ends — which is why hardness specification and heat treatment details matter more here than dimensional tolerances that are generous by engineering standards. Seasonal demand cycles also mean lead time planning is as important as the part specification itself.",
    components: [
      "Tractor and implement castings",
      "Forged linkage and hitch parts",
      "Tillage tines and wear blades",
      "Seeder and planter components",
      "Machined gearbox and PTO parts",
    ],
    materials: ["Ductile iron", "Forged carbon steel", "Hardened alloy steel", "Boron steel"],
    applications: [
      "Tractor linkages and three-point hitch assemblies",
      "Tillage and harvesting implements",
      "Seeding and planting equipment",
      "Replacement wear parts and consumables",
    ],
    standards: ["IS 1865 SG grades", "ASTM A536", "EN-GJS-500-7", "IS 2062", "Hardness per drawing"],
    considerations: [
      {
        title: "Hardness is the specification",
        body: "State the required hardness and where it is measured. Surface and core hardness on a case-hardened part are different requirements — both belong in the inquiry.",
      },
      {
        title: "Wear parts often start from a sample",
        body: "Replacement parts frequently arrive without a drawing. That is workable, and the reverse-engineering work is quoted before it begins, not billed after.",
      },
      {
        title: "Seasonality affects lead time",
        body: "Agricultural demand arrives in bursts before planting and harvesting seasons. Building the target delivery window into the inquiry avoids quoting against a date that cannot be met.",
      },
    ],
  },
  {
    id: "highway-offhighway",
    number: "03",
    title: "Highway/off-highway Heavy Duty truck & trailer",
    summary:
      "Forged, cast and machined components for trucks, trailers, axles, heavy-duty drivetrains and off-highway equipment.",
    icon: "structure",
    intro:
      "Heavy truck and trailer components carry high dynamic loads and are expected to last well beyond a single overhaul interval. The combination of load cycles, road shock and corrosion exposure means that material grade and heat treatment are not supplementary data — they are the specification. A machined kingpin in the wrong steel behaves differently in fatigue, and that difference shows up in the field rather than at incoming inspection.",
    components: [
      "Kingpins and fifth wheel components",
      "Axle housings and hubs",
      "Brake drum and disc assemblies",
      "Trailer chassis brackets and couplings",
      "Heavy-duty suspension and steering parts",
    ],
    materials: ["Forged alloy steel", "Ductile iron", "Structural steel", "Hardened carbon steel"],
    applications: [
      "Long-haul truck drivetrains and chassis",
      "Trailer axle and coupling systems",
      "Off-highway haulers and dump equipment",
      "Replacement and aftermarket heavy components",
    ],
    standards: ["IS 2062 E250/E350", "ASTM A536", "SAE J429", "DIN 74050 (kingpins)", "ISO 1726 (fifth wheel)"],
    considerations: [
      {
        title: "Load rating is not optional data",
        body: "State the axle load rating and duty cycle alongside the drawing. A component sized for a 9-tonne axle fitted to a 16-tonne one will fail predictably — the load data changes the material and section, not just the price.",
      },
      {
        title: "Aftermarket kingpins need dimensional confirmation",
        body: "Kingpin dimensions are nominally standardised but tolerance stacks vary between OEMs. A worn pin from the vehicle is worth sending alongside the drawing.",
      },
      {
        title: "Surface treatment for corrosion matters",
        body: "Heavy vehicle components in tropical or coastal operating environments need corrosion protection stated in the inquiry — phosphate, paint or zinc plating to a specified thickness, not 'standard finish'.",
      },
    ],
  },
  {
    id: "oil-gas",
    number: "04",
    title: "Oil & Gas Industry",
    summary:
      "Flanges, fittings, valve bodies, pressure components and high-tensile fasteners for upstream, midstream and downstream applications.",
    icon: "valve",
    intro:
      "Oil and gas components operate under pressure, temperature and aggressive media — conditions where a part that passes dimensional inspection but misses a material or traceability requirement fails at a certification audit rather than in a testing bay. The documentation trail matters as much as the part itself, and that makes the inquiry stage the right time to establish what certifications, heat numbers and test reports the end application requires.",
    components: [
      "Weld neck and slip-on flanges",
      "Pipe fittings and elbows",
      "Valve bodies and bonnets",
      "Pressure vessel components",
      "High-tensile fasteners for pressure joints",
    ],
    materials: [
      "Carbon steel A105 / A350",
      "Stainless steel 316 / 316L",
      "Alloy steel F22 / F11",
      "Duplex SS 2205",
    ],
    applications: [
      "Wellhead and Christmas tree assemblies",
      "Pressure piping and manifold systems",
      "Refinery and petrochemical plant fitout",
      "Offshore and onshore pipeline connections",
    ],
    standards: ["ASME B16.5 / B16.47", "ASTM A105 / A350 LF2", "ASME B16.9", "API 6A", "NACE MR0175 / ISO 15156"],
    considerations: [
      {
        title: "MTRs are part of the deliverable",
        body: "Material test reports, heat numbers and third-party inspection are not extras in oil and gas — they are part of what is being bought. State the documentation requirement in the inquiry so it is costed, not chased at shipment.",
      },
      {
        title: "NACE compliance changes the material",
        body: "Sour service applications require NACE-compliant material and hardness limits. A standard A105 flange and a NACE-compliant one are different products from different heats — confirm which one before quoting.",
      },
      {
        title: "Third-party inspection needs lead time",
        body: "TPI agencies book against a schedule. If your end client requires witnessed testing or source inspection, name the agency in the inquiry — last-minute bookings delay shipment.",
      },
    ],
  },
  {
    id: "general-engineering",
    number: "05",
    title: "Industrial Equipment & Engineering Components",
    summary:
      "Bolts, nuts, washers, threaded parts and drawing-based precision components across mixed industrial requirements.",
    icon: "caliper",
    intro:
      "This is the broadest category and the most common starting point: a mixed list of parts that do not belong to one process or one factory. It is also where a sourcing partner earns its commission most visibly, because a list of fifteen drawings sent to one manufacturer gets fifteen answers shaped by what that manufacturer already makes — not what the buyer actually needs.",
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
];

export const getIndustryById = (id) => industries.find((item) => item.id === id);

export default industries;
