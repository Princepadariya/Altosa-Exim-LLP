import { Navigate } from "react-router-dom";

import { getLegalPage } from "../data/legal";
import Button from "../components/ui/Button";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Seo from "../components/ui/Seo";
import styles from "./LegalPage.module.css";
import { breadcrumbSchema } from "../utils/seo";

/**
 * Renders any policy page from data/legal.js, so /terms and /data-handling
 * share one layout and only differ by content.
 */
const LegalPage = ({ slug }) => {
  const page = getLegalPage(slug);
  if (!page) return <Navigate to="/404" replace />;

  const crumbs = [{ label: page.eyebrow, to: `/${page.slug}` }];

  return (
    <>
      <Seo
        title={page.title}
        description={page.lead}
        schema={breadcrumbSchema(crumbs)}
      />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        crumbs={crumbs}
      />

      <Section tone="light" narrow>
        <p className={styles.updated}>{page.updated}</p>

        <div className={styles.prose}>
          {page.sections.map((section, index) => (
            <section
              key={section.heading}
              className={styles.block}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 50}ms` }}
            >
              <h2 className={styles.heading}>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <Notice className={styles.disclaimer} icon="document">
          This page is a plain-language summary of how we work, not legal advice.
          For obligations specific to your jurisdiction or your order, take your
          own professional advice.
        </Notice>

        <div className={styles.action} data-reveal>
          <Button to="/contact" variant="secondary">
            Questions about this page
          </Button>
        </div>
      </Section>
    </>
  );
};

export default LegalPage;
