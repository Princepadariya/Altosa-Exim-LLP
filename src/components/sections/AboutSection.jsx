import company from "../../data/company";
import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./AboutSection.module.css";

const rolePoints = [
  "Clear role: merchant exporter and commission agent",
  "Supplier sourcing shaped by drawings and specifications",
  "Export coordination discussed order by order",
  "Direct communication with a defined inquiry owner",
];

/**
 * Who Altosa is — led by what it is *not*, since that is the fact a buyer
 * most needs before deciding how to engage.
 */
/**
 * Layout note: the statement headline runs the full section width rather than
 * sitting in a column. At 64px inside the old 496px column it broke into five
 * lines and left the two columns 188px out of balance. Full width lets it read
 * as the statement it is, and the supporting material pairs off beneath it.
 */
const AboutSection = ({ showCta = true, tone = "light", plate }) => (
  <Section tone={tone} id="about" plate={plate}>
    {/* No eyebrow here on purpose: the sections either side of this one
        carry them, and a third in a row flattens the page. */}
    <SectionHeading
      variant="statement"
      title="A merchant exporter, not a factory pretending otherwise."
      lead={`${company.legalName} is a merchant exporter and commission agent based in ${company.address.city}, ${company.address.state} — one of India's established engineering regions. We do not own the plants that make your parts. What we do is understand the requirement, identify suitable supply options and coordinate the commercial path from inquiry to dispatch.`}
    />

    {/* Two balanced halves: the plain-language claim, and the role points that
        back it up. */}
    <div className={styles.pair}>
      <div className={styles.callout} data-reveal>
        <span className={styles.calloutLabel}>Our role, stated plainly</span>
        <p className={styles.calloutQuote}>
          &ldquo;We do not imply that every item shown is manufactured or
          stocked by Altosa.&rdquo;
        </p>
        <p className={styles.calloutBody}>{company.mission}</p>
      </div>

      <div className={styles.points}>
        {rolePoints.map((point, index) => (
          <div
            key={point}
            className={styles.point}
            data-reveal
            style={{ "--reveal-delay": `${index * 60}ms` }}
          >
            <span className={styles.pointNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.pointText}>{point}</span>
          </div>
        ))}
      </div>
    </div>

    <div className={styles.values}>
      {company.values.map((value, index) => (
        <article
          key={value.title}
          className={styles.value}
          data-reveal
          style={{ "--reveal-delay": `${index * 70}ms` }}
        >
          <h3 className={styles.valueTitle}>{value.title}</h3>
          <p className={styles.valueBody}>{value.body}</p>
        </article>
      ))}
    </div>

    {showCta && (
      <div className={styles.cta} data-reveal>
        <Button to="/about" variant="secondary">
          More about how we work and who we are
        </Button>
      </div>
    )}
  </Section>
);

export default AboutSection;
