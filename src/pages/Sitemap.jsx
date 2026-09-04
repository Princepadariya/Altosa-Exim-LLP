import { Link } from "react-router-dom";

import CtaSection from "../components/sections/CtaSection";
import industries from "../data/industries";
import resources from "../data/resources";
import { siteMap } from "../data/navigation";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Seo from "../components/ui/Seo";
import styles from "./Sitemap.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Sitemap", to: "/sitemap" }];

/*
 * Sub-pages generated from data rather than listed by hand, so adding a sector
 * or a guide puts it on this page automatically.
 */
const childrenFor = {
  industries: () =>
    industries.map((industry) => ({
      label: industry.title,
      to: `/industries/${industry.id}`,
    })),
  resources: () =>
    resources.map((resource) => ({
      label: resource.title,
      to: `/resources/${resource.slug}`,
    })),
};

const Sitemap = () => {
  const totalPages = siteMap.reduce(
    (sum, group) =>
      sum +
      group.links.reduce(
        (n, link) =>
          n + 1 + (link.childrenFrom ? childrenFor[link.childrenFrom]().length : 0),
        0,
      ),
    0,
  );

  return (
    <>
      <Seo
        title="Sitemap"
        description="Every page on the Altosa Exim site, grouped by what you are trying to do: sourcing, how an order runs, buyer resources and company information."
        schema={breadcrumbSchema(crumbs)}
      />

      <PageHero
        eyebrow="Sitemap"
        title="Every page on this site"
        lead={`All ${totalPages} pages, grouped by what you are trying to do rather than by how the URLs are structured.`}
        crumbs={crumbs}
      />

      <Section tone="light" plate={{ number: "01", label: "Index" }}>
        <div className={styles.groups}>
          {siteMap.map((group, index) => (
            <section
              key={group.title}
              className={styles.group}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 55}ms` }}
            >
              <h2 className={styles.groupTitle}>{group.title}</h2>

              <ul className={styles.list}>
                {group.links.map((link) => {
                  const children = link.childrenFrom
                    ? childrenFor[link.childrenFrom]()
                    : [];

                  return (
                    <li key={link.to} className={styles.item}>
                      <Link to={link.to} className={styles.link}>
                        <span className={styles.linkLabel}>{link.label}</span>
                        <Icon name="arrow" size={15} className={styles.linkGo} />
                      </Link>
                      {link.note && <p className={styles.note}>{link.note}</p>}

                      {children.length > 0 && (
                        <ul className={styles.children}>
                          {children.map((child) => (
                            <li key={child.to}>
                              <Link to={child.to} className={styles.childLink}>
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* The machine-readable version, for search engines. */}
        <p className={styles.xml}>
          Search engines can use the{" "}
          <a href="/sitemap.xml" className={styles.xmlLink}>
            XML sitemap
          </a>
          .
        </p>
      </Section>

      <CtaSection />
    </>
  );
};

export default Sitemap;
