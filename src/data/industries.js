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
    /* Definitions from data/glossary.js, chosen to match this sector's
       considerations — the page uses the vocabulary, so it should explain it. */
    terms: ["First article", "PPAP", "Tooling amortisation", "MTC"],
    guides: ["what-to-include-in-an-rfq", "reading-a-material-test-certificate"],
    /* Sector-specific buyer questions. Deliberately not duplicates of the
       site-wide FAQ: these are the questions this sector asks first, and the
       answers hold the same line the rest of the site does — what is confirmed
       per order is not promised here. */
    faqs: [
      {
        id: "programme-or-aftermarket",
        question: "Do you handle OEM programme supply, or only aftermarket parts?",
        answer:
          "Both, and they are sourced the same way — against a specification rather than from a catalogue. What changes is the economics behind the answer. A frozen drawing with an annual requirement justifies tooling that a one-off aftermarket batch never will, and an aftermarket part often has to be reverse-engineered from a sample before it can be quoted at all. Say which of the two you are in the inquiry: it changes the process we would recommend, not just the price.",
      },
      {
        id: "iatf",
        question: "Do your suppliers hold IATF 16949?",
        answer:
          "Altosa holds no management-system certification and does not claim one. Whether a particular supplier holds IATF 16949 is a fact about that supplier, and it is confirmed for your specific part rather than asserted here — if the certification matters to your programme, say so in the inquiry and the evidence is provided with the quotation, before the order rather than after it. A certificate nobody can produce on request is worth nothing to your audit file.",
      },
      {
        id: "ppap",
        question: "Can you provide PPAP or first article approval before the batch runs?",
        answer:
          "Yes. Say which submission level you need in the inquiry — a level 3 package is a different amount of work to a level 1 warrant, and naming it up front means it is costed into the quotation rather than discovered mid-order. A first-off sample measured against the drawing and approved before production is the normal starting point; the fuller PPAP package is assembled with the supplier making your part, alongside any customer-specific requirements your programme carries. What the submission has to contain is fixed before production rather than negotiated after the first shipment.",
      },
    ],
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
    /* Definitions from data/glossary.js, chosen to match this sector's
       considerations — the page uses the vocabulary, so it should explain it. */
    terms: ["Lead time", "First article", "MOQ", "RFQ"],
    guides: ["what-to-include-in-an-rfq", "export-packing-and-marking"],
    /* Sector-specific buyer questions. Deliberately not duplicates of the
       site-wide FAQ: these are the questions this sector asks first, and the
       answers hold the same line the rest of the site does — what is confirmed
       per order is not promised here. */
    faqs: [
      {
        id: "sample-no-drawing",
        question: "We buy a wear part elsewhere and have no drawing. Can you match it?",
        answer:
          "Usually, starting from the sample. The part is measured and reverse-engineered into a drawing, and that engineering is quoted separately before it begins rather than billed afterwards. One caution worth stating up front: a sample gives you dimensions, not heat treatment. It cannot tell you the hardness the original was made to, so where that governs how the part wears it needs to be specified rather than inferred from the piece in your hand.",
      },
      {
        id: "hardness-verification",
        question: "How is hardness confirmed on tillage and wear parts?",
        answer:
          "By stating it as a requirement and asking for the record that evidences it. Give the hardness value and where it is measured — surface and core on a case-hardened part are two different requirements, and a drawing naming only one leaves the other to the supplier's discretion. Whether a hardness report can be produced for your part depends on the supplier and the process, so it is confirmed in the quotation for that order rather than assumed from this page.",
      },
      {
        id: "seasonal-stock",
        question: "Can you hold stock so parts are ready before the season?",
        answer:
          "No — Altosa does not hold stock. What can be planned is the schedule. Agricultural demand arrives in bursts before planting and harvesting, so the useful step is bringing the requirement forward: give the target delivery window in the inquiry and it is quoted against a date that can actually be met, rather than a lead time that looks workable in one month and does not in the next.",
      },
    ],
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
    icon: "truck",
    intro:
      "Heavy truck and trailer components carry high dynamic loads and are expected to last well beyond a single overhaul interval. The combination of load cycles, road shock and corrosion exposure means that material grade and heat treatment are not supplementary data — they are the specification. A machined kingpin in the wrong steel behaves differently in fatigue, and that difference shows up in the field rather than at incoming inspection. Off-highway equipment shifts the emphasis rather than the method: a loader pin sees abrasion and impact rather than highway fatigue, so case depth and surface hardness carry the weight that load rating carries on a trailer axle.",
    components: [
      "Kingpins and fifth wheel components",
      "Axle housings and hubs",
      "Brake drum and disc assemblies",
      "Trailer chassis brackets and couplings",
      "Heavy-duty suspension and steering parts",
      "Off-highway pins, bushings and wear inserts",
    ],
    materials: ["Forged alloy steel", "Ductile iron", "Structural steel", "Hardened carbon steel"],
    applications: [
      "Long-haul truck drivetrains and chassis",
      "Trailer axle and coupling systems",
      "Off-highway haulers, loaders and dump equipment",
      "Replacement and aftermarket heavy components",
    ],
    standards: ["IS 2062 E250/E350", "ASTM A536", "SAE J429", "DIN 74050 (kingpins)", "ISO 1726 (fifth wheel)", "EN 10084 (case-hardening steel)"],
    /* Definitions from data/glossary.js, chosen to match this sector's
       considerations — the page uses the vocabulary, so it should explain it. */
    terms: ["MTC", "Heat number", "VCI packaging", "First article"],
    guides: ["what-to-include-in-an-rfq", "export-packing-and-marking"],
    /* Sector-specific buyer questions. Deliberately not duplicates of the
       site-wide FAQ: these are the questions this sector asks first, and the
       answers hold the same line the rest of the site does — what is confirmed
       per order is not promised here. */
    faqs: [
      {
        id: "kingpin-interchange",
        question: "Will a kingpin or coupling part interchange with our existing vehicles?",
        answer:
          "Not on our say-so from a catalogue. Kingpin dimensions are nominally standardised, but tolerance stacks vary between OEMs, and an assumed fit is the kind of claim discovered to be wrong at assembly. Interchangeability is confirmed against your drawing, and a worn pin sent alongside it is worth more than any amount of description — it shows the wear pattern and the dimensions the replacement actually has to live with.",
      },
      {
        id: "load-data",
        question: "What do you need to know before quoting a heavy vehicle component?",
        answer:
          "The load rating and the duty cycle, alongside the drawing. A component sized for a nine-tonne axle and fitted to a sixteen-tonne one fails predictably, and that data changes the material and the section rather than only the price. Add the operating environment: heavy components working in tropical or coastal conditions need corrosion protection named in the inquiry — phosphate, paint or zinc plating to a stated thickness, not a standard finish left to the supplier.",
      },
      {
        id: "off-highway-wear",
        question: "How should off-highway pins and bushings be specified?",
        answer:
          "By wear behaviour, not only by dimensions. Earthmoving and mining parts fail through abrasion and impact rather than road fatigue, so case depth and surface hardness are the specification — a part described by its dimensions alone gets quoted in the cheapest steel that fits the drawing, and it will fit perfectly while wearing out early. State the duty, and state which records you need to see it evidenced.",
      },
    ],
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
      {
        title: "Off-highway duty is abrasion, not road load",
        body: "Earthmoving and mining parts wear out by abrasion and impact rather than by road fatigue. For pins, bushings and wear inserts, state the case depth and surface hardness you need — a part specified by dimensions alone gets quoted in the cheapest steel that fits the drawing.",
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
    /* Definitions from data/glossary.js, chosen to match this sector's
       considerations — the page uses the vocabulary, so it should explain it. */
    terms: ["MTC", "Heat number", "Pre-shipment inspection", "First article"],
    guides: ["reading-a-material-test-certificate", "export-documents-explained"],
    /* Sector-specific buyer questions. Deliberately not duplicates of the
       site-wide FAQ: these are the questions this sector asks first, and the
       answers hold the same line the rest of the site does — what is confirmed
       per order is not promised here. */
    faqs: [
      {
        id: "nace-sour",
        question: "Can you source NACE MR0175 compliant material for sour service?",
        answer:
          "It has to be asked for specifically, because it is a different product. A standard A105 flange and a NACE-compliant one come from different heats and carry different hardness limits — they are not the same part at a different price. Name sour service in the inquiry and it is sourced and documented as such; whether a given supplier can meet it for your part is confirmed for that order rather than assumed here.",
      },
      {
        id: "mtrs",
        question: "Will I receive material test reports and heat numbers?",
        answer:
          "State the documentation you need in the inquiry, and name the certificate type you are bound to — in this sector the paperwork is part of what is being bought rather than an extra. Material test reports and heat numbers tie the parts in front of you back to the melt they came from, and an incomplete trail fails a certification audit even where the part itself is sound. Which records a supplier can genuinely produce is confirmed in the quotation, so it is costed up front instead of chased at shipment.",
      },
      {
        id: "tpi",
        question: "Can our inspection agency witness testing before shipment?",
        answer:
          "Where you nominate one, the scope is recorded in the order documentation before production starts rather than agreed once parts are finished. Name the agency in the inquiry rather than at dispatch: third-party inspectors book against their own schedule, and a witnessed test arranged at the last minute delays the shipment it was meant to release.",
      },
    ],
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
      "Drawing-based precision components, fasteners and fabricated assemblies for machine builders and mixed industrial requirements.",
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
    standards: ["IS 1367", "ISO 898-1", "ASTM A193 / A194", "DIN threads", "ISO 2768 (general tolerances)"],
    /* Definitions from data/glossary.js, chosen to match this sector's
       considerations — the page uses the vocabulary, so it should explain it. */
    terms: ["RFQ", "MOQ", "FCL / LCL", "Incoterms® 2020"],
    guides: ["what-to-include-in-an-rfq", "incoterms-2020-explained"],
    /* Sector-specific buyer questions. Deliberately not duplicates of the
       site-wide FAQ: these are the questions this sector asks first, and the
       answers hold the same line the rest of the site does — what is confirmed
       per order is not promised here. */
    faqs: [
      {
        id: "mixed-list",
        question: "Can you quote a mixed list of parts that no single factory makes?",
        answer:
          "That is what this sector is. A list of fifteen drawings sent to one manufacturer comes back shaped by what that factory already makes, not by what you need — so the list is split by process first and routed to the suppliers that make each part well. You get one consolidated answer rather than fifteen conversations, and where more than one route is viable you are told a choice exists and what separates the options.",
      },
      {
        id: "standard-or-drawing",
        question: "Do you supply to a standard, or only to our drawing?",
        answer:
          "Either, but the basis has to be stated. For fasteners the property class is the specification — 8.8, 10.9 and A2-70 are different materials with different heat treatments, and the class belongs in the inquiry next to the thread size. For drawing-based parts, name the tolerance basis you expect, whether a general tolerance standard such as ISO 2768 or tolerances written on the drawing itself. A part quoted against an assumed tolerance is a part quoted against the cheapest one.",
      },
      {
        id: "consolidation",
        question: "Can parts from several suppliers ship as one consignment?",
        answer:
          "Consolidating is usually the point of quoting the list together. Shipping fifteen parts in one container against fifteen separate consignments is often a larger saving than anything negotiated on unit price, and it is a reason to send the whole requirement at once rather than part by part. Whether a full or part container load is the better answer depends on the volume and the destination, and it is worked out with the quotation.",
      },
    ],
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
