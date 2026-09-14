import { Link } from "react-router-dom";

import resources, { resourceCategories } from "../../data/resources";
import ArticleCard from "../cards/ArticleCard";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";
import styles from "./ResourcesSection.module.css";

const categoryLabel = (id) =>
  resourceCategories.find((category) => category.id === id)?.label ?? id;

/**
 * Buyer guides. `limit` shows a teaser set on the homepage; the Resources page
 * renders the full list with category filtering.
 *
 * Two layouts, for the same reason the industries section has two:
 *
 *   index  a contents page — hairline-separated rows that scan in one pass.
 *          Three equal cards of label, heading and paragraph is the single
 *          most generated section on the web, and a list of writing is the
 *          most natural thing there is to set as a list.
 *   cards  kept for the places that show two or three guides as an aside,
 *          where a row treatment would read as a stray table.
 */
const ResourcesSection = ({
  tone = "light",
  layout = "index",
  limit = null,
  showCta = true,
  plate,
  heading = {
    eyebrow: "Buyer resources",
    title: "The parts of importing nobody explains up front.",
    lead: "Practical guides on writing an RFQ, reading a material certificate and choosing an Incoterms® rule — written to be useful whether or not you buy through us.",
  },
}) => {
  const items = limit ? resources.slice(0, limit) : resources;

  return (
    <Section tone={tone} id="resources" plate={plate}>
      <SectionHeading {...heading} />

      {layout === "index" ? (
        <ul className={styles.index}>
          {items.map((resource, index) => (
            <li key={resource.slug}>
              <Link
                to={`/resources/${resource.slug}`}
                className={styles.row}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index, 6) * 55}ms` }}
              >
                <span className={styles.meta} aria-hidden="true">
                  <span className={styles.category}>
                    {categoryLabel(resource.category)}
                  </span>
                  <span className={styles.reading}>{resource.readingTime}</span>
                </span>

                <span className={styles.main}>
                  <span className={styles.title}>{resource.title}</span>
                  <span className={styles.excerpt}>{resource.excerpt}</span>
                </span>

                <span className={styles.go} aria-hidden="true">
                  <Icon name="arrow" size={17} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`${grid.grid} ${grid.cols3} ${grid.spaced}`}>
          {items.map((resource, index) => (
            <ArticleCard key={resource.slug} resource={resource} index={index} />
          ))}
        </div>
      )}

      {showCta && (
        <div style={{ marginTop: "var(--space-7)" }} data-reveal>
          <Button to="/resources" variant="secondary">
            Read all buyer guides
          </Button>
        </div>
      )}
    </Section>
  );
};

export default ResourcesSection;
