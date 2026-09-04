/**
 * Which schematic each taxonomy uses.
 *
 * Kept out of SectorPlate.jsx so that file exports only its component —
 * mixing constant exports with a component export breaks Fast Refresh for
 * the whole module.
 *
 * Values are keys into the `geometry` map in components/ui/SectorPlate.jsx.
 */

/** Industry id → part shape. */
export const industryShapes = {
  automotive: "shaft",
  electrical: "busbar",
  "general-engineering": "bolt",
  construction: "flange",
  agriculture: "linkage",
  "pumps-valves": "valve",
};

/** Product capability category → part shape. */
export const categoryShapes = {
  machined: "shaft",
  forged: "linkage",
  cast: "valve",
  fasteners: "bolt",
  electrical: "busbar",
  fabricated: "flange",
};
