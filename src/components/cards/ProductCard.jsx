import { Link } from "react-router-dom";

import cn from "../../utils/cn";
import Icon from "../ui/Icon";
import SectorPlate from "../ui/SectorPlate";
import { categoryShapes } from "../../data/partShapes";
import { productCategories } from "../../data/products";
import styles from "./ProductCard.module.css";

const categoryLabel = (categoryId) =>
  productCategories.find((category) => category.id === categoryId)?.label ??
  categoryId;

/**
 * One product family from data/products.js, described as a capability rather
 * than as stock — processes, materials, tolerance basis and available records.
 */
const ProductCard = ({ product, index = 0, featured = false, className }) => (
  <article
    className={cn(styles.card, featured && styles.featured, className)}
    data-reveal
    style={{ "--reveal-delay": `${Math.min(index, 6) * 70}ms` }}
  >
    {/* The featured card gets the full drawing sheet — frame, registration
        marks, centre lines and the "representative geometry, not a specific
        part" caption. Compact mode exists because that detail turns to noise
        at thumbnail size, which the featured panel is not. */}
    <SectorPlate
      shape={categoryShapes[product.category]}
      label={product.title}
      compact={!featured}
      crop="tall"
      className={styles.plate}
    />

    <div className={styles.head}>
      <h3 className={styles.title}>{product.title}</h3>
      <span className={styles.badge}>{categoryLabel(product.category)}</span>
    </div>

    <p className={styles.summary}>{product.summary}</p>

    {/*
      A description list, not a stack of divs: every row here is a term and its
      value, and saying so gives screen readers the pairing the layout implies.

      Processes and materials used to render as chips while tolerance and
      records rendered as middot text — the same kind of content presented two
      ways inside one card. Five chips wrapping to three rows also made every
      card a different height, so the Materials row started at a different
      point in each one and the three could not be read across.
    */}
    <dl className={styles.specs}>
      <div className={styles.specRow}>
        <dt className={styles.specLabel}>Processes</dt>
        <dd className={styles.specValue}>{product.processes.join(" · ")}</dd>
      </div>

      <div className={styles.specRow}>
        <dt className={styles.specLabel}>Materials</dt>
        <dd className={styles.specValue}>{product.materials.join(" · ")}</dd>
      </div>

      <div className={styles.specRow}>
        <dt className={styles.specLabel}>Tolerance</dt>
        <dd className={styles.specValue}>{product.tolerance}</dd>
      </div>

      <div className={styles.specRow}>
        <dt className={styles.specLabel}>Records</dt>
        <dd className={styles.specValue}>{product.records.join(" · ")}</dd>
      </div>
    </dl>


    <Link
      to={`/request-a-quote?product=${product.id}`}
      className={styles.link}
      aria-label={`Send a requirement for ${product.title.toLowerCase()}`}
    >
      Send a requirement
      <Icon name="arrow" size={15} />
    </Link>
  </article>
);

export default ProductCard;
