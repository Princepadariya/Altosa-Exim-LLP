import { useMemo, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";

import ArticleCard from "../components/cards/ArticleCard";
import CtaSection from "../components/sections/CtaSection";
import { getResource, resourceCategories } from "../data/resources";
import useActiveHeading from "../hooks/useActiveHeading";
import useReadingProgress from "../hooks/useReadingProgress";
import cn from "../utils/cn";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Prose from "../components/ui/Prose";
import { slugifyHeading } from "../utils/slugify";
import Section from "../components/ui/Section";
import Seo from "../components/ui/Seo";
import styles from "./ResourceArticle.module.css";
import { breadcrumbSchema } from "../utils/seo";
import siteConfig from "../data/siteConfig";

const categoryLabel = (id) =>
  resourceCategories.find((category) => category.id === id)?.label ?? id;

/** Article schema so a guide can surface as its own result. */
const articleSchema = (resource) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: resource.title,
  description: resource.excerpt,
  author: { "@type": "Organization", name: "Altosa Exim LLP" },
  publisher: { "@type": "Organization", name: "Altosa Exim LLP" },
  mainEntityOfPage: `${siteConfig.siteUrl}/resources/${resource.slug}/`,
});

const ResourceArticle = () => {
  const { slug } = useParams();
  const resource = getResource(slug);
  const bodyRef = useRef(null);
  const progress = useReadingProgress(bodyRef);

  // Headings are derived from the body blocks so the contents rail can never
  // drift out of sync with the article itself.
  const headings = useMemo(
    () =>
      (resource?.body ?? [])
        .filter((block) => block.type === "h2")
        .map((block) => ({ id: slugifyHeading(block.text), text: block.text })),
    [resource],
  );

  const activeId = useActiveHeading(headings.map((heading) => heading.id));

  if (!resource) return <Navigate to="/resources" replace />;

  const related = (resource.related ?? [])
    .map((relatedSlug) => getResource(relatedSlug))
    .filter(Boolean);

  const crumbs = [
    { label: "Resources", to: "/resources" },
    { label: resource.title, to: `/resources/${resource.slug}` },
  ];

  return (
    <>
      <Seo
        title={resource.title}
        description={resource.excerpt}
        schema={[articleSchema(resource), breadcrumbSchema(crumbs)]}
      />

      <div
        className={styles.progress}
        style={{ "--progress": progress }}
        aria-hidden="true"
      />

      <PageHero
        eyebrow={categoryLabel(resource.category)}
        title={resource.title}
        lead={resource.excerpt}
        crumbs={crumbs}
      />

      <Section tone="light">
        <div className={styles.layout}>
          <article ref={bodyRef}>
            <div className={styles.meta}>
              <span className={styles.metaAccent}>
                {categoryLabel(resource.category)}
              </span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{resource.readingTime}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>Updated {resource.updated}</span>
            </div>

            <Prose blocks={resource.body} />

            {related.length > 0 && (
              <section className={styles.related}>
                <h2 className={styles.relatedTitle}>Related guides</h2>
                <div className={styles.relatedGrid}>
                  {related.map((item, index) => (
                    <ArticleCard
                      key={item.slug}
                      resource={item}
                      compact
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className={styles.aside}>
            {headings.length > 0 && (
              <nav className={styles.tocNav} aria-label="On this page">
                <h2 className={styles.tocTitle}>On this page</h2>
                <div className={styles.toc}>
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={cn(
                        styles.tocLink,
                        activeId === heading.id && styles.tocActive,
                      )}
                    >
                      {heading.text}
                    </a>
                  ))}
                </div>
              </nav>
            )}

            <div className={styles.asidePanel}>
              <h2 className={styles.asidePanelTitle}>Have the part in hand?</h2>
              <p className={styles.asidePanelBody}>
                Send the drawing, material, quantity and destination and skip
                straight to a scoped answer.
              </p>
              <Button to="/request-a-quote" size="sm" block>
                Request a quote
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <CtaSection />
    </>
  );
};

export default ResourceArticle;
