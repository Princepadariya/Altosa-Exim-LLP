import services from "../../data/services";
import Icon from "../ui/Icon";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./ServicesSection.module.css";

/** What a buyer actually receives when sourcing through Altosa. */
const ServicesSection = ({
  tone = "dark",
  headingVariant = "stack",
  plate,
  heading = {
    eyebrow: "What we do",
    title: "Two ways to buy, one path from inquiry to dispatch.",
    lead: "Whether you contract with Altosa or directly with the manufacturer is agreed before the order — and stated in the quotation rather than left implied.",
  },
}) => (
  <Section tone={tone} grid={tone === "dark"} glow={tone === "dark"} id="services" plate={plate}>
    <SectionHeading
      {...heading}
      variant={headingVariant}
      onDark={tone === "dark"}
    />

    {/* A bordered matrix, sharing dividers rather than floating as separate
        cards. Cells stretch to a common height, so the six read as one table
        of services instead of six loose tiles. */}
    <div
      className={
        tone === "dark" ? styles.matrix : `${styles.matrix} ${styles.onLight}`
      }
    >
      {services.map((service, index) => (
        <article
          key={service.id}
          className={styles.service}
          data-reveal
          style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` }}
        >
          <span className={styles.head}>
            <span className={styles.number} aria-hidden="true">
              {service.number}
            </span>
            <Icon name={service.icon} size={20} className={styles.icon} />
          </span>

          <h3 className={styles.title}>{service.title}</h3>
          <p className={styles.summary}>{service.summary}</p>

          <ul className={styles.points}>
            {service.points.map((point) => (
              <li key={point} className={styles.point}>
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </Section>
);

export default ServicesSection;
