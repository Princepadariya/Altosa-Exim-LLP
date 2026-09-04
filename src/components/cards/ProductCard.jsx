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
    <SectorPlate
      shape={categoryShapes[product.category]}
      label={product.title}
      compact
      crop="tall"
      className={styles.plate}
    />

    <div className={styles.head}>
      <h3 className={styles.title}>{product.title}</h3>
      <span className={styles.badge}>{categoryLabel(product.category)}</span>
    </div>

    <p className={styles.summary}>{product.summary}</p>

    <div className={styles.specs}>
      <div className={styles.specRow}>
        <span className={styles.specLabel}>Processes</span>
        <span className={styles.tags}>
          {product.processes.map((process) => (
            <span key={process} className={styles.tag}>
              {process}
            </span>
          ))}
        </span>
      </div>

      <div className={styles.specRow}>
        <span className={styles.specLabel}>Materials</span>
        <span className={styles.tags}>
          {product.materials.map((material) => (
            <span key={material} className={styles.tag}>
              {material}
            </span>
          ))}
        </span>
      </div>

      <div className={styles.specRow}>
        <span className={styles.specLabel}>Tolerance</span>
        <span className={styles.specValue}>{product.tolerance}</span>
      </div>

      <div className={styles.specRow}>
        <span className={styles.specLabel}>Records</span>
        <span className={styles.specValue}>{product.records.join(" · ")}</span>
      </div>
    </div>

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
