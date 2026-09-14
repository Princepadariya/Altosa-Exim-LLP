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
  agriculture: "linkage",
  "highway-offhighway": "hub",
  "oil-gas": "valve",
  "general-engineering": "bolt",
};

/**
 * Product id → part shape, where the category drawing does not fit that
 * particular family. Overrides categoryShapes below; everything not listed
 * here falls back to it.
 */
export const productShapes = {
  "sheet-metal": "bracket",
  "wear-parts": "wear",
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
