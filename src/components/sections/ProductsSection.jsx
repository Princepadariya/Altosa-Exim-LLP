import { useMemo, useState } from "react";

import products, { productCategories } from "../../data/products";
import cn from "../../utils/cn";
import ProductCard from "../cards/ProductCard";
import Button from "../ui/Button";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";
import styles from "./ProductsSection.module.css";

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
          /*
           * A mosaic rather than an even grid: the first capability runs wide
           * as a lead item and the rest sit beside it. `showFilters` is the
           * signal that this is the full Products page, where an even grid is
           * the honest presentation because no family leads the others.
           */
          <div
            className={
              showFilters
                ? `${grid.grid} ${grid.cols3}`
                : `${grid.grid} ${styles.mosaic}`
            }
          >
            {visibleProducts.map((product, index) => (
              // Keying on the filter as well as the id replays the reveal
              // animation when the list changes.
              <ProductCard
                key={`${activeCategory}-${product.id}`}
                product={product}
                index={index}
                featured={!showFilters && index === 0}
                className={!showFilters && index === 0 ? styles.lead : undefined}
              />
            ))}
          </div>
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
