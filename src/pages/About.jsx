import AboutSection from "../components/sections/AboutSection";
import CtaSection from "../components/sections/CtaSection";
import RegionSection from "../components/sections/RegionSection";
import WhyUsSection from "../components/sections/WhyUsSection";
import company from "../data/company";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import styles from "./About.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "About", to: "/about" }];

const About = () => (
  <>
    <Seo
      title="About Altosa Exim — Merchant Exporter in Rajkot"
      description="Altosa Exim LLP is a merchant exporter and commission agent in Rajkot, Gujarat. What we do, what we do not do, and what changes when you buy through us."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="About Altosa Exim"
      title="A merchant exporter and commission agent in Rajkot, India"
      lead={`${company.legalName} is a limited liability partnership based in ${company.address.city}, ${company.address.state}. We are not a manufacturer, and this page explains exactly what that means for a buyer — what we do, what we do not do, and what changes when you buy through us instead of contacting a factory yourself.`}
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Send your requirement</Button>
      <Button to="/contact" variant="onDark" showIcon={false}>
        Contact us
      </Button>
    </PageHero>

    <AboutSection showCta={false} plate={{ number: "01", label: "The firm" }} />

    <Section tone="subtle" plate={{ number: "02", label: "Vision" }}>
      {/*
       * Full width rather than a sticky split: there are only two sentences
       * here, so a column layout left roughly 380px of empty space beside the
       * heading. The statements are the content, so they are set as type
       * rather than boxed in cards.
       */}
      <SectionHeading
        variant="rule"
        eyebrow="Vision & mission"
        title="What we are building towards."
      />

      <div className={styles.statements}>
        <article className={styles.statement} data-reveal>
          <span className={styles.statementLabel}>Vision</span>
          <p className={styles.statementBody}>{company.vision}</p>
        </article>
        <article
          className={styles.statement}
          data-reveal
          style={{ "--reveal-delay": "80ms" }}
        >
          <span className={styles.statementLabel}>Mission</span>
          <p className={styles.statementBody}>{company.mission}</p>
        </article>
      </div>
    </Section>

    {/* Sits between the two light sections so the dark Region and dark
        Registrations bands are not adjacent. */}
    <RegionSection plate={{ number: "03", label: "The cluster" }} />

    <WhyUsSection plate={{ number: "04", label: "Why us" }} />

    <Section tone="dark" grid plate={{ number: "05", label: "Registrations" }}>
      <SectionHeading
        eyebrow="Registrations"
        title="What we can evidence to a buyer."
        lead="We publish the registrations we hold and decline to display certifications we do not. Details are shared during a qualified commercial discussion."
        onDark
      />

      <div className={styles.registrations}>
        {company.registrations.map((registration, index) => (
          <article
            key={registration.code}
            className={styles.registration}
            data-reveal
            style={{ "--reveal-delay": `${index * 80}ms` }}
          >
            <span className={styles.regCode}>{registration.code}</span>
            <h3 className={styles.regLabel}>{registration.label}</h3>
            <p className={styles.regNote}>{registration.note}</p>
          </article>
        ))}
      </div>

      <div className={styles.facts}>
        <span className={styles.fact}>
          <Icon name="pin" size={16} className={styles.factIcon} />
          {company.address.full}
        </span>
        <span className={styles.fact}>
          <Icon name="badge" size={16} className={styles.factIcon} />
          {company.entityType}
        </span>
        <span className={styles.fact}>
          <Icon name="clock" size={16} className={styles.factIcon} />
          Operating since {company.founded}
        </span>
      </div>
    </Section>

    <CtaSection />
  </>
);

export default About;
