import assurancePoints from "../../data/assurance";
import { incotermsNotice } from "../../data/process";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./AssuranceSection.module.css";

/**
 * What a buyer can verify before committing. Rendered as a bordered matrix
 * rather than floating cards — it reads as a checklist, which is the point.
 */
const AssuranceSection = ({
  tone = "light",
  showCta = true,
  showNotice = true,
  plate,
  heading = {
    eyebrow: "Buyer assurance",
    title: "Trust should be verifiable before it is claimed.",
    lead: "Specifications, standards, inspection records, destination-market requirements and Incoterms® 2020 terms are confirmed per order rather than promised in general.",
  },
}) => {
  const onDark = tone === "dark";

  return (
    <Section
      tone={tone}
      id="assurance"
      plate={plate}
      className={cn(onDark && styles.onDark)}
    >
      <SectionHeading {...heading} onDark={onDark} />

      {/* A numbered manifesto, not a matrix of tiles: each claim gets a line
          of its own so it reads as a set of commitments. */}
      <ol className={styles.list}>
        {assurancePoints.map((point, index) => (
          <li
            key={point.id}
            className={styles.item}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index, 6) * 55}ms` }}
          >
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className={styles.itemMain}>
              <h3 className={styles.title}>
                <Icon name={point.icon} size={19} className={styles.iconWrap} />
                {point.title}
              </h3>
              <p className={styles.body}>{point.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {showNotice && (
        <Notice className={styles.footerNote} onDark={onDark} icon="receipt">
          {incotermsNotice}
        </Notice>
      )}

      {showCta && (
        <div style={{ marginTop: "var(--space-6)" }} data-reveal>
          <Button
            to="/quality-and-compliance"
            variant={onDark ? "onDark" : "secondary"}
          >
            How quality and documentation are handled
          </Button>
        </div>
      )}
    </Section>
  );
};

export default AssuranceSection;
