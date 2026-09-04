import {
  capabilityNotice,
  leadAxisMax,
  leadAxisTicks,
  leadTimeDrivers,
  processEnvelope,
} from "../../data/capabilities";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./CapabilitySection.module.css";

/**
 * The process envelope, plus the things that actually move a date.
 *
 * Publishing indicative MOQs and lead times is deliberate: it lets a buyer
 * self-qualify before writing an inquiry, which is faster for them and for us
 * than discovering a mismatch two emails in.
 */
const CapabilitySection = ({ tone = "light", showDrivers = true }) => (
  <Section tone={tone}>
    <SectionHeading
      eyebrow="Process envelope"
      title="Where each process stays economic."
      lead="Indicative figures so you can judge fit before sending anything. They are starting points for a conversation, not limits — a part outside them is checked against a specific supplier rather than ruled out."
    />

    {/*
     * A datasheet rather than a table. The lead-time column is the one figure
     * that is comparable across every row, so it is drawn on a shared axis —
     * which process is quick and which carries tooling time reads at a glance,
     * where a column of "6–10 weeks" strings does not.
     */}
    <div className={styles.sheet}>
      <div className={styles.sheetHead} aria-hidden="true">
        <span>Process</span>
        <span>Size envelope &amp; tolerance</span>
        <span>Indicative MOQ</span>
        <span className={styles.axisHeadLabel}>Indicative lead time</span>
      </div>

      {processEnvelope.map((row, index) => {
        const [from, to] = row.leadWeeks;
        return (
          <article
            key={row.id}
            className={styles.row}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index, 6) * 45}ms` }}
          >
            <h3 className={styles.process}>{row.process}</h3>

            <div className={styles.spec}>
              <span className={styles.envelope}>{row.envelope}</span>
              <span className={styles.tolerance}>{row.tolerance}</span>
            </div>

            <span className={styles.moq}>{row.moq}</span>

            <div className={styles.lead}>
              <span
                className={styles.axis}
                aria-hidden="true"
                style={{
                  "--from": `${(from / leadAxisMax) * 100}%`,
                  "--to": `${(to / leadAxisMax) * 100}%`,
                }}
              >
                <span className={styles.range} />
              </span>
              <span className={styles.leadLabel}>{row.leadTime}</span>
            </div>
          </article>
        );
      })}

      {/* Scale for the bars above. */}
      <div className={styles.scale} aria-hidden="true">
        <span className={styles.scaleLabel}>Weeks</span>
        <span className={styles.scaleTicks}>
          {leadAxisTicks.map((tick) => (
            <span
              key={tick}
              className={styles.tick}
              style={{ "--at": `${(tick / leadAxisMax) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </span>
      </div>
    </div>

    <Notice icon="compass" className={styles.notice}>
      {capabilityNotice}
    </Notice>

    {showDrivers && (
      <div className={styles.drivers}>
        <h3 className={styles.driversTitle}>What moves a lead time</h3>
        <div className={styles.driverGrid}>
          {leadTimeDrivers.map((driver, index) => (
            <article
              key={driver.id}
              className={styles.driver}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` }}
            >
              <span className={styles.driverEffect}>{driver.effect}</span>
              <h4 className={styles.driverTitle}>{driver.title}</h4>
              <p className={styles.driverBody}>{driver.body}</p>
            </article>
          ))}
        </div>
      </div>
    )}
  </Section>
);

export default CapabilitySection;
