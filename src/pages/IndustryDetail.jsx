import { Link, Navigate, useParams } from "react-router-dom";

import CtaSection from "../components/sections/CtaSection";
import industries, { getIndustryById } from "../data/industries";
import products from "../data/products";
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
import { breadcrumbSchema } from "../utils/seo";

const IndustryDetail = () => {
  const { industryId } = useParams();
  const industry = getIndustryById(industryId);

  if (!industry) return <Navigate to="/industries" replace />;

  const relatedProducts = products.filter(
    (product) => product.industries?.includes(industry.id),
  );

  const otherIndustries = industries.filter((item) => item.id !== industry.id);

  const crumbs = [
    { label: "Industries", to: "/industries" },
    { label: industry.title, to: `/industries/${industry.id}` },
  ];

  return (
    <>
      <Seo
        title={`${industry.title} — Sourcing from India`}
        description={industry.summary}
        schema={breadcrumbSchema(crumbs)}
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
            </div>

            <div className={styles.panel} data-reveal="right">
              <h2 className={styles.panelTitle}>Standards seen most often</h2>
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
