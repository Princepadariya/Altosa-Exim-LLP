import CtaSection from "../components/sections/CtaSection";
import company from "../data/company";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import grid from "../components/ui/Grid.module.css";
import styles from "./Contact.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Contact", to: "/contact" }];

const Contact = () => (
  <>
    <Seo
      title="Contact Altosa Exim"
      description="Contact Altosa Exim LLP in Rajkot, Gujarat. Written inquiries are preferred for anything technical — a drawing reference and a quantity get a far more useful answer."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Contact"
      title="Contact Altosa Exim LLP"
      lead="Rajkot, Gujarat, India. Written inquiries are preferred for anything technical, because a drawing reference and a quantity get a far more useful answer than a phone call does."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Send your requirement</Button>
    </PageHero>

    <Section tone="light">
      <div className={grid.split}>
        <div className={grid.sticky}>
          <SectionHeading
            eyebrow="How to reach us"
            title="One inbox, read in the order things arrive."
            lead="Every inquiry is handled by a defined owner, so technical clarification and commercial terms stay in one thread rather than spreading across contacts."
          />
        </div>

        <div className={styles.column}>
        <div className={styles.cards}>
          <a
            href={`mailto:${company.contact.email}`}
            className={styles.card}
            data-reveal
          >
            <span className={styles.cardIcon}>
              <Icon name="mail" size={22} />
            </span>
            <span className={styles.cardLabel}>Email</span>
            <span className={styles.cardValue}>{company.contact.email}</span>
            <span className={styles.cardNote}>
              Best for drawings, specifications and anything with a quantity.
            </span>
            <Icon name="arrowUpRight" size={16} className={styles.cardGo} />
          </a>

          <a
            href={company.contact.whatsapp}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            style={{ "--reveal-delay": "70ms" }}
          >
            <span className={styles.cardIcon}>
              <Icon name="whatsapp" size={22} />
            </span>
            <span className={styles.cardLabel}>WhatsApp</span>
            <span className={styles.cardValue}>{company.contact.whatsappLabel}</span>
            <span className={styles.cardNote}>
              Useful for quick clarifications once an inquiry is open.
            </span>
            <Icon name="arrowUpRight" size={16} className={styles.cardGo} />
          </a>

        </div>

        {/*
         * Reference detail, deliberately not styled as a card. Office and
         * time zone are things to read, not things to click — as identical
         * cards they were indistinguishable from the two links above, so
         * nothing signalled which of the four you could act on.
         */}
        <dl className={styles.details}>
          <div className={styles.detail} data-reveal>
            <dt className={styles.detailLabel}>
              <Icon name="pin" size={15} className={styles.detailIcon} />
              Registered office
            </dt>
            <dd className={styles.detailValue}>
              <strong>{company.legalName}</strong>
              <span>{company.address.full}</span>
            </dd>
          </div>

          <div
            className={styles.detail}
            data-reveal
            style={{ "--reveal-delay": "70ms" }}
          >
            <dt className={styles.detailLabel}>
              <Icon name="clock" size={15} className={styles.detailIcon} />
              Time zone
            </dt>
            <dd className={styles.detailValue}>
              <strong>{company.timezone.label}</strong>
              <span>{company.timezone.note}</span>
            </dd>
          </div>
        </dl>
        </div>
      </div>
    </Section>

    {/*
     * The shared closer rather than a bespoke centred one. Its checklist is
     * the argument this page is making — the form asks for these specifics,
     * which is why it beats a cold email. The secondary mailto is suppressed
     * because the same address is already a card above.
     */}
    <CtaSection
      eyebrow="Sending a requirement"
      title="For anything involving a drawing, use the request form."
      body="It asks for the details needed to review supply options, so the first reply can be specific instead of a request for more information."
      showSecondary={false}
    />
  </>
);

export default Contact;
