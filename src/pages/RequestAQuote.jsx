import { Link } from "react-router-dom";

import InquiryForm from "../components/form/InquiryForm";
import company, { hasWhatsapp } from "../data/company";
import { rfqChecklist, rfqNextSteps } from "../data/inquiryFields";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Seo from "../components/ui/Seo";
import styles from "./RequestAQuote.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Request a quote", to: "/request-a-quote" }];

/**
 * The page the whole site points at.
 *
 * The form itself is <InquiryForm />; wiring its delivery is a one-line change
 * in data/siteConfig.js, or pass an `onSubmit` handler here.
 */
const RequestAQuote = () => (
  <>
    <Seo
      title="Request a Quote"
      description="Send a sourcing requirement to Altosa Exim LLP: drawing or specification, material, quantity, destination and timing. A specific inquiry gets a specific answer."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Request a quote"
      title="Request a quotation"
      lead="A specific inquiry gets a specific answer. The form below records the details needed to review supply options — no account, no login, no obligation."
      crumbs={crumbs}
    />

    <Section tone="subtle">
      <div className={styles.layout}>
        <div className={styles.formColumn}>
          <InquiryForm
            /*
             * Wire delivery here if you prefer a handler over the endpoint in
             * data/siteConfig.js. It must return a promise; rejecting shows
             * the error state.
             *
             *   onSubmit={async (values) => {
             *     await fetch("/api/inquiry", {
             *       method: "POST",
             *       headers: { "Content-Type": "application/json" },
             *       body: JSON.stringify(values),
             *     });
             *   }}
             */
          />
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.panel} id="what-to-include" data-reveal="right">
            <h2 className={styles.panelTitle}>What to include</h2>
            <p className={styles.panelLead}>
              The more of the following you can share, the more useful the first
              response will be.
            </p>
            <ul className={styles.checklist}>
              {rfqChecklist.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <Icon name="check" size={15} className={styles.checkTick} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.panel}
            data-reveal="right"
            style={{ "--reveal-delay": "80ms" }}
          >
            <h2 className={styles.panelTitle}>What happens after you send it</h2>
            <ol className={styles.steps}>
              {rfqNextSteps.map((step, index) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section
            className={styles.panel}
            data-reveal="right"
            style={{ "--reveal-delay": "160ms" }}
          >
            <h2 className={styles.panelTitle}>Prefer not to use the form?</h2>
            <div className={styles.contactLinks}>
              <a
                href={`mailto:${company.contact.email}`}
                className={styles.contactLink}
              >
                <Icon name="mail" size={17} />
                {company.contact.email}
              </a>
              {hasWhatsapp && (
                <a
                  href={company.contact.whatsapp}
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={17} />
                  {company.contact.whatsappLabel}
                </a>
              )}
            </div>
            <p className={styles.timezone}>
              {company.timezone.label}. {company.timezone.note}
            </p>
          </section>

          <Notice icon="shield">
            Please do not send confidential drawings or commercially sensitive
            documents until handling expectations have been agreed with us in
            writing. See the{" "}
            <Link to="/data-handling" className={styles.inlineLink}>
              data-handling notice
            </Link>
            .
          </Notice>

          <Button to="/how-we-work" variant="secondary" block>
            See the full sourcing process
          </Button>
        </aside>
      </div>
    </Section>
  </>
);

export default RequestAQuote;
