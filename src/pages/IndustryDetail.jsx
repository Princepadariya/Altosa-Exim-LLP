import { Link, Navigate, useParams } from "react-router-dom";

import CtaSection from "../components/sections/CtaSection";
import industries, { getIndustryById } from "../data/industries";
import products from "../data/products";
import resources from "../data/resources";
import { glossary } from "../data/glossary";
import ArticleCard from "../components/cards/ArticleCard";
import Accordion from "../components/ui/Accordion";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import ProductCard from "../components/cards/ProductCard";
import SectorPlate from "../components/ui/SectorPlate";
import { industryShapes } from "../data/partShapes";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import grid from "../components/ui/Grid.module.css";
import styles from "./IndustryDetail.module.css";
import { breadcrumbSchema, faqSchema } from "../utils/seo";

const IndustryDetail = () => {
  const { industryId } = useParams();
  const industry = getIndustryById(industryId);

  if (!industry) return <Navigate to="/industries" replace />;

  const relatedProducts = products.filter(
    (product) => product.industries?.includes(industry.id),
  );

  const otherIndustries = industries.filter((item) => item.id !== industry.id);

  /* Both look up published content rather than restating it, so a sector page
     cannot drift from the glossary or the guide it points at. */
  const sectorTerms = (industry.terms ?? [])
    .map((term) => glossary.find((entry) => entry.term === term))
    .filter(Boolean);

  const sectorGuides = (industry.guides ?? [])
    .map((slug) => resources.find((resource) => resource.slug === slug))
    .filter(Boolean);

  const sectorFaqs = industry.faqs ?? [];

  const crumbs = [
    { label: "Industries", to: "/industries" },
    { label: industry.title, to: `/industries/${industry.id}` },
  ];

  return (
    <>
      <Seo
        title={`${industry.title} — Sourcing from India`}
        description={industry.summary}
        schema={
          sectorFaqs.length > 0
            ? [breadcrumbSchema(crumbs), faqSchema(sectorFaqs)]
            : breadcrumbSchema(crumbs)
        }
      />

      <PageHero
        eyebrow={`Sector ${industry.number}`}
        title={industry.title}
        lead={industry.summary}
        crumbs={crumbs}
      >
        <Button to={`/request-a-quote?industry=${industry.id}`}>
          Send a requirement for this sector
        </Button>
      </PageHero>

      <Section tone="light">
        <div className={styles.layout}>
          <div>
            <p className={styles.intro} data-reveal>
              {industry.intro}
            </p>

            <h2 className={styles.blockTitle} data-reveal>
              Components sourced most often
            </h2>
            <div className={styles.components}>
              {industry.components.map((component, index) => (
                <span
                  key={component}
                  className={styles.component}
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(index, 6) * 50}ms` }}
                >
                  <Icon name="check" size={15} className={styles.tick} />
                  {component}
                </span>
              ))}
            </div>

            <h2 className={styles.blockTitle} data-reveal>
              What to settle before quoting
            </h2>
            <div className={styles.considerations}>
              {industry.considerations.map((consideration, index) => (
                <article
                  key={consideration.title}
                  className={styles.consideration}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  <span className={styles.considerationNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.considerationTitle}>
                      {consideration.title}
                    </h3>
                    <p className={styles.considerationBody}>
                      {consideration.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {sectorTerms.length > 0 && (
              <>
                <h2 className={styles.blockTitle} data-reveal>
                  Terms used on this page
                </h2>
                <dl className={styles.terms}>
                  {sectorTerms.map((entry, index) => (
                    <div
                      key={entry.term}
                      className={styles.term}
                      data-reveal
                      style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` }}
                    >
                      <dt className={styles.termName}>{entry.term}</dt>
                      <dd className={styles.termDef}>{entry.definition}</dd>
                    </div>
                  ))}
                </dl>
                <Link to="/glossary" className={styles.termsLink} data-reveal>
                  Full trade glossary
                  <Icon name="arrow" size={15} />
                </Link>
              </>
            )}
          </div>

          <aside className={styles.aside}>
            <SectorPlate
              shape={industryShapes[industry.id]}
              label={industry.title}
              className={styles.plate}
            />

            <div className={styles.panel} data-reveal="right">
              <h2 className={styles.panelTitle}>Typical applications</h2>
              <div className={styles.chips}>
                {industry.applications.map((application) => (
                  <span key={application} className={styles.chip}>
                    {application}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.panel} data-reveal="right">
              <h2 className={styles.panelTitle}>Materials</h2>
              <div className={styles.chips}>
                {industry.materials.map((material) => (
                  <span key={material} className={styles.chip}>
                    {material}
                  </span>
                ))}
              </div>

              <Link to="/standards" className={styles.panelLink}>
                Grade equivalents (IS / ASTM / EN)
                <Icon name="arrow" size={14} />
              </Link>
            </div>

            <div className={styles.panel} data-reveal="right">
              <h2 className={styles.panelTitle}>Standards seen most often</h2>
              <p className={styles.panelNote}>
                What buyers in this sector most often write on a drawing. The
                standard that governs your order is the one on your drawing, not
                this list.
              </p>
              <div className={styles.chips}>
                {industry.standards.map((standard) => (
                  <span
                    key={standard}
                    className={`${styles.chip} ${styles.chipMono}`}
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.ctaPanel} data-reveal="right">
              <h2 className={styles.ctaTitle}>Have a drawing for this sector?</h2>
              <p className={styles.ctaBody}>
                Availability for your specific part is confirmed against your
                specification, not assumed from this page.
              </p>
              <Button to={`/request-a-quote?industry=${industry.id}`} size="sm" block>
                Send your requirement
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      {relatedProducts.length > 0 && (
        <Section tone="subtle">
          <SectionHeading
            eyebrow="Capabilities"
            title="Processes this sector draws on."
            lead="Each family describes what the supplier base can produce to a drawing. Availability for your part is confirmed against your specification."
          />

          <div className={`${grid.grid} ${grid.cols3} ${grid.spaced}`}>
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </Section>
      )}

      {sectorFaqs.length > 0 && (
        <Section tone="light" id="sector-faq">
          <div className={grid.split}>
            <div className={grid.sticky}>
              <SectionHeading
                eyebrow="Sector questions"
                title="What buyers in this sector ask first."
                lead="Answered the same way the rest of the site answers — including where the honest answer is that it is confirmed for your order rather than promised on a page."
              />

              <div style={{ marginTop: "var(--space-6)" }} data-reveal>
                <Button to="/faq" variant="secondary">
                  Read every buyer question
                </Button>
              </div>
            </div>

            <Accordion items={sectorFaqs} defaultOpenId={sectorFaqs[0]?.id} />
          </div>
        </Section>
      )}

      {sectorGuides.length > 0 && (
        <Section tone="subtle" narrow>
          <SectionHeading
            eyebrow="Before you send the drawing"
            title="Two guides worth reading first."
            lead="Written for buyers sourcing from India, whether or not the order comes through us. They cover what this sector's inquiries most often arrive missing."
          />

          <div className={`${grid.grid} ${grid.cols2} ${grid.spaced}`}>
            {sectorGuides.map((resource, index) => (
              <ArticleCard key={resource.slug} resource={resource} index={index} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="light">
        <SectionHeading
          eyebrow="Other sectors"
          title="Your part may sit across more than one."
          lead="Sector boundaries matter less than the process. If a part spans two of these, send it anyway."
        />

        <div className={styles.otherGrid}>
          {otherIndustries.map((item, index) => (
            <Link
              key={item.id}
              to={`/industries/${item.id}`}
              className={styles.other}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` }}
            >
              <span className={styles.otherNumber}>{item.number}</span>
              <span className={styles.otherTitle}>{item.title}</span>
            </Link>
          ))}
        </div>

        <Notice style={{ marginTop: "var(--space-7)" }} icon="compass">
          Sector coverage reflects the range our supplier base can address, not a
          claim of completed work in every sector. Availability, standards,
          documentation and export feasibility are confirmed for each inquiry.
        </Notice>
      </Section>

      <CtaSection />
    </>
  );
};

export default IndustryDetail;
