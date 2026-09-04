import regionHighlights, { regionFacts, regionNotice } from "../../data/region";
import Icon from "../ui/Icon";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./RegionSection.module.css";

/** Why the supplier base exists where it does. Factual cluster context. */
const RegionSection = ({
  plate,
  heading = {
    eyebrow: "Where we source from",
    title: "Rajkot is a cluster, which is why options exist at all.",
    lead: "A sourcing partner is only as useful as the supply base behind it. This is the one Altosa works in, and the reason a part can usually be quoted more than one way.",
  },
}) => (
  <Section tone="dark" grid glow id="region" plate={plate}>
    <div className={styles.layout}>
      <div>
        <SectionHeading {...heading} onDark />

        <div className={styles.highlights}>
          {regionHighlights.map((highlight, index) => (
            <article
              key={highlight.id}
              className={styles.highlight}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` }}
            >
              <span className={styles.iconWrap}>
                <Icon name={highlight.icon} size={20} />
              </span>
              <div>
                <h3 className={styles.title}>{highlight.title}</h3>
                <p className={styles.body}>{highlight.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className={styles.facts} data-reveal="right">
        <h3 className={styles.factsTitle}>At a glance</h3>
        {regionFacts.map((fact) => (
          <div key={fact.label} className={styles.factRow}>
            <span className={styles.factLabel}>{fact.label}</span>
            <span className={styles.factValue}>{fact.value}</span>
          </div>
        ))}
      </aside>
    </div>

    <Notice style={{ marginTop: "var(--space-7)" }} onDark icon="compass">
      {regionNotice}
    </Notice>
  </Section>
);

export default RegionSection;
