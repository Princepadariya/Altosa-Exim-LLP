import industries from "../../data/industries";
import siteConfig from "../../data/siteConfig";
import stats from "../../data/stats";
import StatCard from "../cards/StatCard";
import Marquee from "../ui/Marquee";
import Section from "../ui/Section";
import styles from "./StatsBand.module.css";

/**
 * Figures strip plus a scrolling list of the sectors covered.
 * Both halves are individually switchable from siteConfig.features.
 */
const StatsBand = () => {
  if (!siteConfig.features.stats) return null;

  return (
    <Section tone="dark" spacing="tight" grid aria-label="Altosa Exim at a glance">
      <div className={styles.band}>
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      {siteConfig.features.marquee && (
        <div className={styles.marquee}>
          <span className={styles.marqueeLabel}>Sourced against your drawing</span>
          <Marquee items={industries.map((industry) => industry.title)} />
        </div>
      )}
    </Section>
  );
};

export default StatsBand;
