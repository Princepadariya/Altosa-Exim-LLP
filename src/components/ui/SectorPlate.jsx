import styles from "./SectorPlate.module.css";

/**
 * A small technical drawing per sector, in the same idiom as the hero sheet.
 *
 * Authored as SVG rather than photographed on purpose: Altosa is a merchant
 * exporter, and stock factory photography would imply plants it does not own —
 * the exact claim the site's copy is at pains to deny. A drawing shows the kind
 * of part without asserting who made it.
 *
 * Geometry is centred on (160, 118) in a 320×240 sheet.
 */

const CX = 160;
const CY = 118;

/* Thread ticks along a bolt shank. */
const threads = (from, to, top, bottom) => {
  const marks = [];
  for (let x = from; x <= to; x += 9) {
    marks.push(<path key={x} d={`M${x} ${top}v${bottom - top}`} opacity="0.5" />);
  }
  return marks;
};

/*
 * Geometry is keyed by part shape, not by sector, because the same drawings
 * serve two different taxonomies: industries and product capability families.
 */
const geometry = {
  /* Stepped turned shaft, side view. */
  shaft: (
    <>
      <rect x="56" y="101" width="54" height="34" />
      <rect x="110" y="92" width="42" height="52" />
      <rect x="152" y="101" width="56" height="34" />
      <rect x="208" y="107" width="46" height="22" />
      <rect className="accent" x="122" y="86" width="18" height="6" />
    </>
  ),

  /* Busbar with terminal holes. */
  busbar: (
    <>
      <rect x="62" y="98" width="196" height="42" rx="3" />
      <circle className="accent" cx="92" cy={CY} r="9" />
      <circle className="accent" cx="228" cy={CY} r="9" />
      <path d="M120 98v42M200 98v42" opacity="0.35" strokeDasharray="4 4" />
    </>
  ),

  /* Hex-head bolt, side view. */
  bolt: (
    <>
      <rect x="60" y="94" width="36" height="48" />
      <path d="M60 104h36M60 132h36" opacity="0.45" />
      <rect x="96" y="108" width="150" height="20" />
      <g strokeWidth="1">{threads(140, 240, 108, 128)}</g>
      <path className="accent" d="M246 108v20" strokeWidth="1.8" />
    </>
  ),

  /* Bolted flange plate, plan view. */
  flange: (
    <>
      <rect x="66" y="60" width="188" height="116" rx="6" />
      <circle cx="94" cy="88" r="9" />
      <circle cx="226" cy="88" r="9" />
      <circle cx="94" cy="148" r="9" />
      <circle cx="226" cy="148" r="9" />
      <circle className="accent" cx={CX} cy={CY} r="26" />
    </>
  ),

  /* Linkage arm with two eyes. */
  linkage: (
    <>
      <path
        d="M84 152q26 0 44-20t48-40"
        strokeWidth="15"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path d="M84 152q26 0 44-20t48-40" strokeWidth="1.4" fill="none" />
      <circle cx="84" cy="152" r="14" />
      <circle className="accent" cx="84" cy="152" r="6" />
      <circle cx="200" cy="82" r="16" />
      <circle className="accent" cx="200" cy="82" r="7" />
    </>
  ),

  /* Valve body with flanged ports, section. */
  valve: (
    <>
      <circle cx={CX} cy={CY} r="50" />
      <circle className="accent" cx={CX} cy={CY} r="24" />
      <rect x="78" y="104" width="34" height="28" />
      <rect x="208" y="104" width="34" height="28" />
      <rect x="70" y="96" width="9" height="44" />
      <rect x="241" y="96" width="9" height="44" />
    </>
  ),
};

/*
 * Crops for compact mode. Each must match the aspect-ratio the caller gives
 * the figure, or the SVG letterboxes inside it and the part shrinks.
 *   wide  2:1   — the industries index thumbnails
 *   tall  3:2   — product cards, where the image has more room
 */
const CROPS = {
  wide: "40 60 240 120",
  tall: "50 44 220 147",
};

/**
 * @param shape    key into `geometry`
 * @param compact  drops the sheet frame, centre lines and caption. At
 *                 thumbnail sizes that detail collapses into noise, so small
 *                 placements get the part outline only.
 * @param crop     which compact crop to use; ignored when not compact.
 */
const SectorPlate = ({ shape, label, compact = false, crop = "wide", className }) => {
  const part = geometry[shape];
  if (!part) return null;

  const root = [styles.plate, compact && styles.compact, className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={root}>
      <svg
        className={styles.sheet}
        viewBox={compact ? (CROPS[crop] ?? CROPS.wide) : "0 0 320 240"}
        fill="none"
        stroke="currentColor"
        strokeWidth={compact ? "2.2" : "1.4"}
        role="img"
        aria-label={`Schematic drawing — ${label}`}
      >
        {!compact && (
          <>
            {/* Sheet frame and registration marks */}
            <rect x="10" y="10" width="300" height="220" opacity="0.22" strokeWidth="1" />
            <g opacity="0.4" strokeWidth="1.2">
              <path d="M10 26V10h16M310 26V10h-16M10 214v16h16M310 214v16h-16" />
            </g>

            {/* Centre lines */}
            <g opacity="0.3" strokeWidth="1">
              <path d={`M40 ${CY}h240`} strokeDasharray="12 4 3 4" />
              <path d={`M${CX} 34v168`} strokeDasharray="12 4 3 4" />
            </g>
          </>
        )}

        <g className={styles.part}>{part}</g>
      </svg>

      {!compact && (
        <figcaption className={styles.caption}>
          Schematic — representative geometry, not a specific part
        </figcaption>
      )}
    </figure>
  );
};

export default SectorPlate;
