import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import products, { productCategories } from "../../data/products";
import { categoryShapes, productShapes } from "../../data/partShapes";
import cn from "../../utils/cn";
import ProductCard from "../cards/ProductCard";
import SectorPlate from "../ui/SectorPlate";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";
import styles from "./ProductsSection.module.css";

const labelFor = (categoryId) =>
  productCategories.find((category) => category.id === categoryId)?.label ??
  categoryId;

const countFor = (categoryId) =>
  categoryId === "all"
    ? products.length
    : products.filter((product) => product.category === categoryId).length;

/**
 * Product capabilities with client-side category filtering.
 *
 * `limit` renders a shortened set for the homepage; the Products page shows
 * the filter bar and the full list.
 */
const ProductsSection = ({
  tone = "light",
  limit = null,
  showFilters = true,
  showCta = true,
  headingVariant = "stack",
  plate,
  heading = {
    eyebrow: "What we source",
    title: "Capabilities, described honestly as capabilities.",
    lead: "Altosa does not hold stock. Each family below describes what the supplier base around Rajkot can produce to a drawing — availability for your specific part is confirmed against your specification, not assumed from this list.",
  },
}) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleProducts = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category === activeCategory);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [activeCategory, limit]);

  return (
    <Section tone={tone} id="products" plate={plate}>
      <SectionHeading {...heading} variant={headingVariant} />

      {showFilters && (
        <div className={styles.filters} role="group" aria-label="Filter capabilities">
          {productCategories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                className={cn(styles.filter, isActive && styles.filterActive)}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                <span className={styles.count}>{countFor(category.id)}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.results}>
        {showFilters && (
          <p className={styles.resultCount} aria-live="polite">
            Showing {visibleProducts.length} of {products.length} capabilities
          </p>
        )}

        {visibleProducts.length === 0 ? (
          <p className={styles.empty}>
            Nothing listed under this filter yet — send the drawing anyway and we
            will tell you honestly whether we can source it.
          </p>
        ) : (
          showFilters ? (
            <div className={`${grid.grid} ${grid.cols3}`}>
              {visibleProducts.map((product, index) => (
                // Keying on the filter as well as the id replays the reveal
                // animation when the list changes.
                <ProductCard
                  key={`${activeCategory}-${product.id}`}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            /*
             * One sheet, then a spec index.
             *
             * This was six cards of the same shape stacked into a mosaic, which
             * ran to 2,700px of the homepage repeating one idea. The lead keeps
             * its full drawing sheet because it earns the room; the rest become
             * rows on a parts list, which is how a specification is actually
             * read and which stops the section from being a card wall. No fact
             * is dropped — every row still carries all four spec pairs.
             */
            <>
              <ProductCard
                product={visibleProducts[0]}
                index={0}
                featured
                className={styles.lead}
              />

              <ul className={styles.index}>
                {visibleProducts.slice(1).map((product, index) => (
                  <li key={product.id}>
                    <Link
                      to={`/request-a-quote?product=${product.id}`}
                      className={styles.row}
                      data-reveal
                      style={{ "--reveal-delay": `${Math.min(index, 6) * 55}ms` }}
                      aria-label={`Send a requirement for ${product.title.toLowerCase()}`}
                    >
                      <SectorPlate
                        shape={
                          productShapes[product.id] ??
                          categoryShapes[product.category]
                        }
                        label={product.title}
                        compact
                        className={styles.rowPlate}
                      />

                      <span className={styles.rowMain}>
                        <span className={styles.rowCategory}>
                          {labelFor(product.category)}
                        </span>
                        <span className={styles.rowTitle}>{product.title}</span>
                        <span className={styles.rowSummary}>{product.summary}</span>
                      </span>

                      <span className={styles.rowSpecs}>
                        {[
                          ["Processes", product.processes.join(" · ")],
                          ["Materials", product.materials.join(" · ")],
                          ["Tolerance", product.tolerance],
                          ["Records", product.records.join(" · ")],
                        ].map(([label, value]) => (
                          <span key={label} className={styles.spec}>
                            <span className={styles.specLabel}>{label}</span>
                            <span className={styles.specValue}>{value}</span>
                          </span>
                        ))}
                      </span>

                      <span className={styles.rowGo} aria-hidden="true">
                        <Icon name="arrow" size={17} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )
        )}
      </div>

      <Notice style={{ marginTop: "var(--space-7)" }} icon="caliper">
        Process, material and tolerance capability is confirmed per part against
        your drawing. Where a supplier holds a relevant certification for your
        part, that is a fact about the supplier and is confirmed for the specific
        order rather than presented here as ours.
      </Notice>

      {showCta && (
        <div style={{ marginTop: "var(--space-6)" }} data-reveal>
          <Button to="/products" variant="secondary">
            See all sourcing capabilities
          </Button>
        </div>
      )}
    </Section>
  );
};

export default ProductsSection;
