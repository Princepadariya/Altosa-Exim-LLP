import CtaSection from "../components/sections/CtaSection";
import ProcessSection from "../components/sections/ProcessSection";
import SpecimenQuotation from "../components/sections/SpecimenQuotation";
import { incotermsNotice, quotationScope } from "../data/process";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import grid from "../components/ui/Grid.module.css";
import styles from "./HowWeWork.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "How we work", to: "/how-we-work" }];

const rfqPrinciples = [
  {
    title: "Plain English",
    body: "Specific language, readable on mobile, with no inflated market-leader claims.",
    icon: "thread",
  },
  {
    title: "Country-aware",
    body: "The buyer's destination is captured early so standards, documents and logistics can be discussed.",
    icon: "globe",
  },
  {
    title: "Buyer-controlled",
    body: "No instant commitment; the quotation is based on the agreed specification and commercial scope.",
    icon: "compass",
  },
];

const HowWeWork = () => (
  <>
    <Seo
      title="How We Work — Sourcing & Export Process"
      description="The four decision points between a first inquiry and a dispatched order: define the requirement, review supply fit, agree the commercial basis, coordinate the order."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="How we work"
      title="From inquiry to dispatch: how a sourcing order runs"
      lead="Four decision points stand between a first inquiry and a dispatched order. Knowing them in advance tells you what information to send, what you will get back, and where you can still change your mind."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Start with step one</Button>
    </PageHero>

    <ProcessSection
      plate={{ number: "01", label: "The steps" }}
      detailed
      showCta={false}
      tone="light"
      heading={{
        eyebrow: "The four steps",
        title: "Every requirement is different. These decision points are not.",
        lead: "What you send at each stage, and what comes back — so there are no surprises about who is waiting on whom.",
      }}
    />

    <Section tone="dark" grid glow plate={{ number: "02", label: "RFQ path" }}>
      <SectionHeading
        eyebrow="Built for international inquiries"
        title="One clear RFQ path across markets and time zones."
        onDark
      />

      <div className={styles.principles}>
        {rfqPrinciples.map((principle, index) => (
          <article
            key={principle.title}
            className={styles.principle}
            data-reveal
            style={{ "--reveal-delay": `${index * 80}ms` }}
          >
            <Icon name={principle.icon} size={22} className={styles.principleIcon} />
            <h3 className={styles.principleTitle}>{principle.title}</h3>
            <p className={styles.principleBody}>{principle.body}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section tone="subtle" plate={{ number: "03", label: "Quotation" }}>
      <div className={grid.split}>
        <div className={grid.sticky}>
          <SectionHeading
            eyebrow="The quotation"
            title="What gets recorded in the quotation."
            lead="A quotation from Altosa states the scope it covers, so both sides are agreeing to the same thing."
          />
        </div>

        <div>
          <ol className={styles.scope}>
            {quotationScope.map((item, index) => (
              <li
                key={item}
                className={styles.scopeItem}
                data-reveal
                style={{ "--reveal-delay": `${index * 55}ms` }}
              >
                <span className={styles.scopeNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>

          {/* The list above says which fields a quotation carries; the specimen
              shows one carrying them. The claim that scope is settled before a
              number is sent was asserted across several pages and demonstrated
              on none of them. */}
          <div className={styles.specimen}>
            <SpecimenQuotation />
          </div>

          <Notice style={{ marginTop: "var(--space-6)" }} icon="receipt">
            {incotermsNotice}
          </Notice>

          <div style={{ marginTop: "var(--space-6)" }} data-reveal>
            <Button to="/quality-and-compliance" variant="secondary">
              How quality records and documentation are handled
            </Button>
          </div>
        </div>
      </div>
    </Section>

    <CtaSection />
  </>
);

export default HowWeWork;
