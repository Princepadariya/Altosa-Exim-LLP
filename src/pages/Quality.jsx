import AssuranceSection from "../components/sections/AssuranceSection";
import CtaSection from "../components/sections/CtaSection";
import QualityStagesSection from "../components/sections/QualityStagesSection";
import { inspectionRecords, roleLimits } from "../data/assurance";
import company from "../data/company";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import grid from "../components/ui/Grid.module.css";
import styles from "./Quality.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Quality & compliance", to: "/quality-and-compliance" }];

const Quality = () => (
  <>
    <Seo
      title="Quality, Documentation & Buyer Assurance"
      description="What a buyer can verify before committing, how quality expectations are recorded, which inspection records are available, and where Altosa's role as a merchant exporter ends."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Quality & compliance"
      title="Quality, documentation and buyer assurance"
      lead="What a buyer can verify before committing, how quality expectations are recorded, and where the limits of our role sit. Nothing on this page is a guarantee about a product we have not yet seen a specification for."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">State the records you need</Button>
    </PageHero>

    <AssuranceSection
      plate={{ number: "01", label: "Assurance" }}
      showCta={false}
      heading={{
        eyebrow: "Buyer assurance",
        title: "Trust should be verifiable before it is claimed.",
        lead: "This website is designed to make the first due-diligence conversation easier — not to replace technical, legal or commercial verification.",
      }}
    />

    <QualityStagesSection
      tone="subtle"
      plate={{ number: "02", label: "Stages" }}
    />

    <Section tone="light" plate={{ number: "03", label: "Records" }}>
      <div className={grid.split}>
        <div className={grid.sticky}>
          <SectionHeading
            eyebrow="Inspection & material records"
            title="State the records you need in the request itself."
            lead="Availability depends on the part, the process and the supplier, so it is confirmed in the quotation for that order rather than assumed from this page."
          />
        </div>

        <div>
          <ul className={styles.records}>
            {inspectionRecords.map((record, index) => (
              <li
                key={record}
                className={styles.record}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` }}
              >
                <Icon name="check" size={16} className={styles.recordTick} />
                {record}
              </li>
            ))}
          </ul>

          <Notice style={{ marginTop: "var(--space-6)" }} icon="document">
            Where you nominate an independent inspection agency, that scope is
            recorded in the order documentation before production, not agreed
            afterwards.
          </Notice>
        </div>
      </div>
    </Section>

    <Section tone="dark" grid plate={{ number: "04", label: "Certifications" }}>
      <div className={grid.split}>
        <div className={grid.sticky}>
          <SectionHeading
            eyebrow="Certifications"
            title="What we hold, and what we will not claim."
            onDark
          />
        </div>

        <div className={styles.certifications}>
          <p className={styles.certBody} data-reveal>
            {company.legalName} is a registered Indian exporter (IEC) and a
            registered business for GST. Beyond those registrations we do not
            publish product or management-system certifications, because we hold
            none that we can evidence to a buyer — and a certificate that cannot
            be evidenced is worth nothing to your audit file.
          </p>
          <p
            className={styles.certBody}
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            Where a supplier holds a relevant certification for your part, that is
            a fact about the supplier, and it is confirmed for the specific order
            rather than presented here as ours.
          </p>

          <div className={styles.regRow}>
            {company.registrations.map((registration) => (
              <span key={registration.code} className={styles.regChip}>
                {registration.code}
              </span>
            ))}
          </div>

          <div className={styles.limits} data-reveal>
            <h3 className={styles.limitsTitle}>{roleLimits.title}</h3>
            <p className={styles.limitsBody}>{roleLimits.body}</p>
          </div>

          <div style={{ marginTop: "var(--space-6)" }} data-reveal>
            <Button to="/faq" variant="onDark">
              Buyer FAQ, including who your counterparty is
            </Button>
          </div>
        </div>
      </div>
    </Section>

    <CtaSection />
  </>
);

export default Quality;
