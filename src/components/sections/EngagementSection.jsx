import engagementModels, {
  engagementComparison,
  engagementNotice,
} from "../../data/engagement";
import Icon from "../ui/Icon";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./EngagementSection.module.css";

/**
 * The two commercial arrangements, side by side.
 *
 * This is the single most consequential thing a buyer needs to understand
 * before engaging, so it gets a comparison table rather than a paragraph.
 */
const EngagementSection = ({
  tone = "light",
  showTable = true,
  plate,
  heading = {
    eyebrow: "Two ways to buy",
    title: "Merchant exporter or commission agent — decided before the order.",
    lead: "These are genuinely different commercial positions, not two names for the same service. Which one applies changes who invoices you, who carries the risk and how we are paid.",
  },
}) => (
  <Section tone={tone} id="engagement" plate={plate}>
    <SectionHeading {...heading} />

    <div className={styles.models}>
      {engagementModels.map((model, index) => (
        <article
          key={model.id}
          className={styles.model}
          data-reveal
          style={{ "--reveal-delay": `${index * 90}ms` }}
        >
          <span className={styles.iconWrap}>
            <Icon name={model.icon} size={24} />
          </span>

          <span className={styles.tagline}>{model.tagline}</span>
          <h3 className={styles.name}>{model.name}</h3>
          <p className={styles.summary}>{model.summary}</p>

          <span className={styles.bestForLabel}>Suits</span>
          <div className={styles.bestFor}>
            {model.bestFor.map((item) => (
              <span key={item} className={styles.bestForItem}>
                <Icon name="check" size={14} className={styles.tick} />
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>

    {showTable && (
      <div className={styles.compare}>
        <div className={styles.compareIntro}>
          <h3 className={styles.compareTitle}>The differences, plainly</h3>
          <p className={styles.compareNote}>
            Neither arrangement is inherently better. What matters is that it is
            agreed up front.
          </p>
        </div>

        {/*
         * Columns are derived from the same model data as the cards above, so
         * the headings, icons and answer keys cannot drift apart.
         *
         * The two arrangements are separated by a rule rather than by shading
         * one of them: a tint on a single column reads as a recommendation,
         * which would contradict the note above it.
         */}
        <div className={styles.grid}>
          <div className={styles.headRow}>
            <span />
            {engagementModels.map((model, index) => (
              <span
                key={model.id}
                className={index === 1 ? `${styles.colHead} ${styles.alt}` : styles.colHead}
              >
                <Icon name={model.icon} size={16} className={styles.colIcon} />
                {model.name}
              </span>
            ))}
          </div>

          {engagementComparison.map((row, rowIndex) => (
            <div
              key={row.question}
              className={styles.compareRow}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(rowIndex, 6) * 40}ms` }}
            >
              <span className={styles.question}>{row.question}</span>
              {engagementModels.map((model, index) => (
                <span
                  key={model.id}
                  className={index === 1 ? `${styles.answer} ${styles.alt}` : styles.answer}
                  data-model={model.name}
                >
                  {row[model.compareKey]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    )}

    <Notice style={{ marginTop: "var(--space-6)" }} icon="receipt">
      {engagementNotice}
    </Notice>
  </Section>
);

export default EngagementSection;
