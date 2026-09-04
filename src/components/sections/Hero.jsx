import company from "../../data/company";
import marketRegions, { totalCountries } from "../../data/markets";
import { heroBadges } from "../../data/stats";
import usePointerTilt from "../../hooks/usePointerTilt";
import Button from "../ui/Button";
import styles from "./Hero.module.css";

/* Geometry for the flange drawing, kept in one place so the dimension lines
   and the part can never drift apart. */
const CX = 210;
const CY = 190;
const R_OUTER = 90;
const R_RIM = 80;
const R_BOLT_CIRCLE = 63;
const R_BOLT = 8;
const R_BORE = 36;

const BOLT_ANGLES = [0, 60, 120, 180, 240, 300];
const boltAt = (angle) => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CX + R_BOLT_CIRCLE * Math.cos(radians),
    y: CY + R_BOLT_CIRCLE * Math.sin(radians),
  };
};

/* Zone markers along the sheet edges, as on a real drawing sheet. */
const ZONE_COLS = ["A", "B", "C", "D"];
const ZONE_ROWS = ["1", "2", "3", "4"];

/* Two destinations per region, so the strip reads as genuinely global rather
   than as one region's neighbours. */
const heroFlags = marketRegions.flatMap((region) => region.countries.slice(0, 2));

/**
 * Homepage masthead.
 *
 * The right-hand panel is a working engineering drawing sheet rather than a
 * decorative graphic: registration marks, zone coordinates, a hatched section,
 * dimensioned callouts and a title block. The title block carries the actual
 * pitch — the drawing is the buyer's, the sourcing is ours.
 *
 * Every animation is disabled under reduced motion.
 */
const Hero = () => {
  const tiltRef = usePointerTilt(4.5);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <span className="grain" aria-hidden="true" />
      <span className={styles.vignette} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          {/*
           * States the two commercial roles rather than the generic category.
           * "Sourcing & export partner" could describe a broker, an agency or
           * a marketplace; these are the roles that decide who invoices the
           * buyer and who carries the risk — and they appeared nowhere above
           * the fold, with the first mention 1500px down the page.
           */}
          <span className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            Merchant exporter &amp; commission agent
          </span>

          <h1 className={styles.title} id="hero-title">
            {/*
             * The headline carries the proposition, not just the category.
             * "Reliable industrial sourcing" was the largest thing on the page
             * but said nothing a logistics firm or a procurement consultancy
             * could not also claim; "to your drawing" is the actual difference
             * and the thing the rest of the site is built around.
             */}
            <span className={styles.line}>
              <span className={styles.lineInner} style={{ "--line-delay": "80ms" }}>
                Industrial sourcing,
              </span>
            </span>
            <span className={styles.line}>
              <span
                className={`${styles.lineInner} ${styles.accent}`}
                style={{ "--line-delay": "200ms" }}
              >
                to your drawing.
              </span>
            </span>
          </h1>

          <p className={styles.lead}>{company.description}</p>

          <div className={styles.actions}>
            <Button to="/request-a-quote" size="lg">
              Send your requirement
            </Button>
            <Button to="/how-we-work" variant="onDark" size="lg" showIcon={false}>
              See how we work
            </Button>
          </div>

          <p className={styles.hint}>
            Share a drawing, part specification, quantity and destination for a more
            useful first response.
          </p>

          <div className={styles.badges}>
            {heroBadges.map((badge) => (
              <div key={badge.code} className={styles.badge}>
                <span className={styles.badgeCode}>{badge.code}</span>
                <span className={styles.badgeLabel}>{badge.label}</span>
              </div>
            ))}
          </div>

          {/*
           * Flags do the one job no amount of copy does quickly: they say
           * "international trade" at a glance. Without them the first screen
           * reads as an engineering product rather than an export business.
           */}
          <div className={styles.shipsTo}>
            <span className={styles.shipsToLabel}>Delivering to</span>
            <span className={styles.flags} aria-hidden="true">
              {heroFlags.map((country) => (
                <img
                  key={country.code}
                  className={styles.flag}
                  src={`/flags/${country.code.toLowerCase()}.svg`}
                  alt=""
                  width="21"
                  height="16"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </span>
            <span className={styles.shipsToMore}>
              +{totalCountries - heroFlags.length} more
            </span>
          </div>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.visual} ref={tiltRef}>
            <span className={styles.scan} />

            <svg
              className={styles.sheet}
              viewBox="0 0 420 460"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <defs>
                {/* Literal colour, not currentColor: a pattern does not inherit
                    the colour of the element that references it. */}
                <pattern
                  id="hero-hatch"
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="7"
                    stroke="rgba(42, 180, 209, 0.55)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              {/* --- Sheet frame + registration marks --- */}
              <rect x="14" y="14" width="392" height="432" opacity="0.28" />
              <rect x="26" y="26" width="368" height="408" opacity="0.1" />

              <g opacity="0.5" strokeWidth="1.4">
                <path d="M14 34V14h20M406 34V14h-20M14 426v20h20M406 426v20h-20" />
              </g>

              {/* Zone coordinates along the sheet edges */}
              <g className={styles.zone}>
                {ZONE_COLS.map((label, index) => {
                  const x = 26 + (368 / 4) * (index + 0.5);
                  return (
                    <g key={label}>
                      <path
                        d={`M${26 + (368 / 4) * index} 14v12`}
                        opacity="0.28"
                      />
                      <text x={x} y="24" textAnchor="middle">
                        {label}
                      </text>
                    </g>
                  );
                })}
                {ZONE_ROWS.map((label, index) => {
                  const y = 26 + (408 / 4) * (index + 0.5);
                  return (
                    <g key={label}>
                      <path
                        d={`M14 ${26 + (408 / 4) * index}h12`}
                        opacity="0.28"
                      />
                      <text x="20" y={y + 3} textAnchor="middle">
                        {label}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* --- Centre lines --- */}
              <g opacity="0.4">
                <path
                  className="draw"
                  style={{ "--len": 320, "--draw-delay": "0.45s" }}
                  d={`M${CX} ${CY - 115}v230`}
                  strokeDasharray="14 4 3 4"
                />
                <path
                  className="draw"
                  style={{ "--len": 320, "--draw-delay": "0.55s" }}
                  d={`M${CX - 128} ${CY}h256`}
                  strokeDasharray="14 4 3 4"
                />
              </g>

              {/* --- Hatched section quadrant --- */}
              <path
                className={styles.hatch}
                d={`M${CX - R_OUTER} ${CY} A${R_OUTER} ${R_OUTER} 0 0 1 ${CX} ${CY - R_OUTER} L${CX} ${CY - R_BORE} A${R_BORE} ${R_BORE} 0 0 0 ${CX - R_BORE} ${CY} Z`}
                fill="url(#hero-hatch)"
                stroke="none"
              />

              {/* --- The part --- */}
              <g className={styles.part}>
                <circle
                  className="draw"
                  style={{ "--len": 616, "--draw-delay": "0.65s" }}
                  cx={CX}
                  cy={CY}
                  r={R_OUTER}
                  strokeWidth="1.6"
                />
                <circle
                  className="draw"
                  style={{ "--len": 540, "--draw-delay": "0.8s" }}
                  cx={CX}
                  cy={CY}
                  r={R_RIM}
                  opacity="0.45"
                />

                {/* Bolt circle centreline */}
                <circle
                  className="draw"
                  style={{ "--len": 428, "--draw-delay": "0.9s" }}
                  cx={CX}
                  cy={CY}
                  r={R_BOLT_CIRCLE}
                  strokeDasharray="10 4 2 4"
                  opacity="0.5"
                />

                {BOLT_ANGLES.map((angle) => {
                  const { x, y } = boltAt(angle);
                  return (
                    <g key={angle}>
                      <circle
                        className="draw"
                        style={{
                          "--len": 60,
                          "--draw-delay": `${1 + angle / 700}s`,
                        }}
                        cx={x}
                        cy={y}
                        r={R_BOLT}
                        strokeWidth="1.3"
                      />
                      {/* Centre mark on each hole */}
                      <path
                        d={`M${x - 13} ${y}h26M${x} ${y - 13}v26`}
                        opacity="0.35"
                        strokeWidth="0.9"
                      />
                    </g>
                  );
                })}

                <circle
                  className="draw accent"
                  style={{ "--len": 252, "--draw-delay": "1.25s" }}
                  cx={CX}
                  cy={CY}
                  r={R_BORE}
                  strokeWidth="1.8"
                />
                <circle
                  className="draw accent"
                  style={{ "--len": 214, "--draw-delay": "1.35s" }}
                  cx={CX}
                  cy={CY}
                  r={R_BORE - 6}
                  opacity="0.45"
                />
              </g>

              {/* --- Horizontal dimension: outside diameter --- */}
              <g className={`${styles.dim} ${styles.dimH}`} opacity="0">
                <path d={`M${CX - R_OUTER} ${CY + R_OUTER}v20`} opacity="0.3" />
                <path d={`M${CX + R_OUTER} ${CY + R_OUTER}v20`} opacity="0.3" />
                <path d={`M${CX - R_OUTER} 292h${R_OUTER * 2}`} />
                <path
                  d={`M${CX - R_OUTER} 292l9-3.5v7zM${CX + R_OUTER} 292l-9-3.5v7z`}
                  fill="currentColor"
                  stroke="none"
                />
                <rect
                  x={CX - 30}
                  y="282"
                  width="60"
                  height="20"
                  fill="var(--ink-950)"
                  stroke="none"
                />
                <text x={CX} y="296" textAnchor="middle">
                  Ø180
                </text>
              </g>

              {/* --- Vertical dimension: bore --- */}
              <g className={styles.dim} opacity="0" style={{ "--dim-delay": "1.95s" }}>
                <path d={`M${CX} ${CY - R_BORE}h136`} opacity="0.3" />
                <path d={`M${CX} ${CY + R_BORE}h136`} opacity="0.3" />
                <path d={`M340 ${CY - R_BORE}v${R_BORE * 2}`} />
                <path
                  d={`M340 ${CY - R_BORE}l-3.5 9h7zM340 ${CY + R_BORE}l-3.5 -9h7z`}
                  fill="currentColor"
                  stroke="none"
                />
                <rect x="322" y={CY - 10} width="36" height="20" fill="var(--ink-950)" stroke="none" />
                <text x="340" y={CY + 4} textAnchor="middle">
                  Ø72
                </text>
              </g>

              {/* --- Leader callout on the bolt pattern --- */}
              <g className={styles.dim} opacity="0" style={{ "--dim-delay": "2.1s" }}>
                <path
                  d={`M${boltAt(300).x + 6} ${boltAt(300).y - 6}L316 98H386`}
                  opacity="0.6"
                />
                <circle
                  cx={boltAt(300).x + 6}
                  cy={boltAt(300).y - 6}
                  r="2"
                  fill="currentColor"
                  stroke="none"
                />
                <text x="386" y="92" textAnchor="end" className={styles.callout}>
                  6 × Ø18 THRU
                </text>
              </g>

              {/* --- General note, top-left as on a drawing sheet --- */}
              <g className={styles.dim} opacity="0" style={{ "--dim-delay": "2.25s" }}>
                <text x="36" y="58" className={styles.note}>
                  NOTE: UNLESS STATED ±0.05
                </text>
                <text x="36" y="72" className={styles.note}>
                  GEOMETRY PER YOUR DRAWING
                </text>
              </g>
            </svg>

            {/* --- Title block ------------------------------------------------ */}
            <div className={styles.titleBlock}>
              <div className={styles.tbMain}>
                <div className={styles.tbRow}>
                  <span className={styles.tbKey}>Drawn by</span>
                  <span className={styles.tbValue}>Your engineers</span>
                </div>
                <div className={styles.tbRow}>
                  <span className={styles.tbKey}>Sourced by</span>
                  <span className={`${styles.tbValue} ${styles.tbAccent}`}>
                    Altosa Exim LLP
                  </span>
                </div>
                <div className={styles.tbRow}>
                  <span className={styles.tbKey}>Origin</span>
                  <span className={styles.tbValue}>Rajkot, Gujarat, IN</span>
                </div>
              </div>

              <div className={styles.tbMeta}>
                <div className={styles.tbCell}>
                  <span className={styles.tbKey}>Units</span>
                  <span className={styles.tbValue}>mm</span>
                </div>
                <div className={styles.tbCell}>
                  <span className={styles.tbKey}>Scale</span>
                  <span className={styles.tbValue}>1:2</span>
                </div>
                <div className={styles.tbCell}>
                  <span className={styles.tbKey}>Rev</span>
                  <span className={styles.tbValue}>A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        Scroll
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
};

export default Hero;
