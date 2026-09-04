import { whyWorkWithUs } from "../../data/assurance";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./WhyUsSection.module.css";

/**
 * The honest case for paying a commission: what the buyer gets that going
 * straight to one factory would not give them.
 */
const WhyUsSection = ({
  tone = "light",
  plate,
  heading = {
    eyebrow: "Why work through us",
    title: "You could contact a manufacturer directly. Here is what changes when you don't.",
    lead: "Working through a sourcing partner costs a commission, so it should buy something specific. These are the things it buys.",
  },
}) => (
  <Section tone={tone} id="why-us" plate={plate}>
    <SectionHeading {...heading} />

    <div className={styles.list} style={{ marginTop: "var(--space-8)" }}>
      {whyWorkWithUs.map((reason, index) => (
        <article
          key={reason.id}
          className={styles.item}
          data-reveal
          style={{ "--reveal-delay": `${index * 70}ms` }}
        >
          <span className={styles.marker} aria-hidden="true" />
          <h3 className={styles.title}>{reason.title}</h3>
          <p className={styles.text}>{reason.body}</p>
        </article>
      ))}
    </div>
  </Section>
);

export default WhyUsSection;
