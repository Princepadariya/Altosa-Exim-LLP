import { Link } from "react-router-dom";

import industries from "../../data/industries";
import IndustryCard from "../cards/IndustryCard";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import SectorPlate from "../ui/SectorPlate";
import { industryShapes } from "../../data/partShapes";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";
import styles from "./IndustriesSection.module.css";

/**
 * Sector overview.
 *
 * Two layouts, because the two places this appears want different things:
 *
 *   index  a rule-separated editorial list — scans quickly, and keeps the
 *          homepage from opening with yet another grid of identical cards
 *   cards  the expanded card grid, used on the Industries page where the
 *          extra components and materials per sector are the point
 */
const IndustriesSection = ({
  layout = "index",
  detailed = false,
  showCta = true,
  tone = "light",
  plate,
  heading = {
    eyebrow: "Industries we source for",
    title: "Start with the requirement, not a fixed catalogue.",
    lead: "As a merchant exporter and commission agent, we source against the buyer's technical and commercial brief. These are the sectors our supplier base covers most often — they are where we start, not where we stop.",
  },
}) => (
  <Section tone={tone} id="industries" plate={plate}>
    <SectionHeading {...heading} variant={layout === "index" ? "split" : "stack"} />

    {layout === "index" ? (
      <ul className={styles.index}>
        {industries.map((industry, index) => (
          <li key={industry.id}>
            <Link
              to={`/industries/${industry.id}`}
              className={styles.row}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 55}ms` }}
            >
              <span className={styles.number} aria-hidden="true">
                {industry.number}
              </span>

              <SectorPlate
                shape={industryShapes[industry.id]}
                label={industry.title}
                compact
                className={styles.thumb}
              />

              <span className={styles.main}>
                <span className={styles.title}>{industry.title}</span>
                <span className={styles.summary}>{industry.summary}</span>
              </span>

              <span className={styles.materials} aria-hidden="true">
                {industry.materials.slice(0, 3).map((material) => (
                  <span key={material} className={styles.material}>
                    {material}
                  </span>
                ))}
              </span>

              <span className={styles.go} aria-hidden="true">
                <Icon name="arrow" size={17} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <div className={`${grid.grid} ${grid.cols3} ${grid.spaced}`}>
        {industries.map((industry, index) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            detailed={detailed}
            index={index}
          />
        ))}
      </div>
    )}

    {showCta && (
      <div className={styles.cta} data-reveal>
        <Button to="/industries" variant="secondary">
          See what we source for each industry
        </Button>
      </div>
    )}
  </Section>
);

export default IndustriesSection;
