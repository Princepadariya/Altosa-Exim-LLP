import marketRegions, {
  gateways,
  marketsNotice,
  totalCountries,
} from "../../data/markets";
import Button from "../ui/Button";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./MarketsSection.module.css";

/** Export destinations, grouped by region. */
const MarketsSection = ({
  tone = "subtle",
  showCta = true,
  headingVariant = "stack",
  plate,
  heading = {
    eyebrow: "Export markets",
    title: `Destinations discussed across ${totalCountries}+ markets.`,
    lead: "Freight routes, documentation expectations and conformity requirements differ by destination, so each is reviewed against the specific product and inquiry.",
  },
}) => (
  <Section tone={tone} id="markets" plate={plate}>
    <SectionHeading {...heading} variant={headingVariant} />

    {/* A destination board. The ISO codes carry the section visually — they
        are the densest, most scannable thing in this data — with the country
        name reading underneath, the way a port or departure board is set. */}
    <div className={styles.tally} data-reveal>
      <div className={styles.tallyItem}>
        <span className={styles.figure}>{totalCountries}</span>
        <span className={styles.figureLabel}>Destinations discussed</span>
      </div>
      <div className={styles.tallyItem}>
        <span className={styles.figure}>{marketRegions.length}</span>
        <span className={styles.figureLabel}>Regions covered</span>
      </div>
      <div className={styles.tallyItem}>
        <span className={styles.figure}>{gateways.length}</span>
        <span className={styles.figureLabel}>Ports &amp; gateways</span>
      </div>
    </div>

    {/* One row per region, region on the left and its destinations laid out
        across — so the whole footprint is legible in a single look rather
        than five stacked blocks you have to scroll through. */}
    <div className={styles.board}>
      {marketRegions.map((market, index) => (
        <article
          key={market.id}
          className={styles.row}
          data-reveal
          style={{ "--reveal-delay": `${Math.min(index, 6) * 55}ms` }}
        >
          <div className={styles.rowHead}>
            <h3 className={styles.regionName}>{market.region}</h3>
            {/* Spelled out, not a bare numeral: as a lone "06" above the
                region name this read as an ordinal, so consecutive regions
                looked like a broken sequence. */}
            <span className={styles.regionCount}>
              {market.countries.length} destinations
            </span>
            <p className={styles.blurb}>{market.blurb}</p>
          </div>

          <ul className={styles.codes}>
            {market.countries.map((country) => (
              <li key={country.code} className={styles.tile}>
                {/*
                 * Real SVG flags, not emoji: Windows has never shipped flag
                 * emoji, so a regional-indicator pair renders there as two
                 * boxed letters rather than a flag.
                 *
                 * Lazy + async because this section sits below the fold and a
                 * couple of these files are heavy — mx and es carry detailed
                 * coats of arms that are invisible at this size but cost ~80KB
                 * each. Decorative, so alt is empty; the name is beside it.
                 */}
                <img
                  className={styles.flag}
                  src={`/flags/${country.code.toLowerCase()}.svg`}
                  alt=""
                  width="24"
                  height="18"
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.name}>{country.name}</span>
                <span className={styles.code}>{country.code}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    {/* Closes the loop: where the goods actually leave from. */}
    <div className={styles.origin} data-reveal>
      <span className={styles.originLabel}>Dispatched from</span>
      <div className={styles.gateways}>
        {gateways.map((gateway) => (
          <span key={gateway.name} className={styles.gateway}>
            {gateway.name}
            <span className={styles.gatewayType}>{gateway.type}</span>
          </span>
        ))}
      </div>
    </div>

    <Notice style={{ marginTop: "var(--space-7)" }} icon="globe">
      {marketsNotice}
    </Notice>

    {showCta && (
      <div style={{ marginTop: "var(--space-6)" }} data-reveal>
        <Button to="/markets" variant="secondary">
          See ports, gateways and market notes
        </Button>
      </div>
    )}
  </Section>
);

export default MarketsSection;
