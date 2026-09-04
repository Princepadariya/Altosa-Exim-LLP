import company from "../../data/company";
import { rfqChecklist } from "../../data/inquiryFields";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Section from "../ui/Section";
import styles from "./CtaSection.module.css";

/**
 * Closing call to action. The checklist doubles as guidance — a buyer who
 * reads it sends a better first inquiry, which is the whole argument.
 */
/**
 * @param showSecondary  the mailto button. Off on the Contact page, where the
 *                       same address is already a card further up.
 */
const CtaSection = ({
  eyebrow = "Send your requirement",
  title = "A specific inquiry gets a specific answer.",
  body = "Share the drawing or specification, material or grade, quantity, destination and target timing, and the first response will be useful rather than generic.",
  tone = "light",
  showSecondary = true,
}) => (
  <Section tone={tone}>
    <div className={styles.cta} data-reveal="scale">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>

          <div className={styles.actions}>
            <Button to="/request-a-quote" size="lg">
              Request a quote
            </Button>
            {showSecondary && (
              <Button
                href={`mailto:${company.contact.email}`}
                variant="onDark"
                size="lg"
                icon="mail"
              >
                {company.contact.email}
              </Button>
            )}
          </div>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelTitle}>What to include</p>
          {rfqChecklist.map((item) => (
            <span key={item} className={styles.panelItem}>
              <Icon name="check" size={15} className={styles.panelTick} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

export default CtaSection;
