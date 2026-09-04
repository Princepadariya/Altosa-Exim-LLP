import { Link } from "react-router-dom";

import { resourceCategories } from "../../data/resources";
import cn from "../../utils/cn";
import Icon from "../ui/Icon";
import styles from "./ArticleCard.module.css";

const categoryLabel = (id) =>
  resourceCategories.find((category) => category.id === id)?.label ?? id;

/** One buyer guide from data/resources.js. */
const ArticleCard = ({ resource, compact = false, index = 0 }) => (
  <article
    className={cn(styles.card, compact && styles.compact)}
    data-reveal
    style={{ "--reveal-delay": `${Math.min(index, 6) * 70}ms` }}
  >
    <div className={styles.meta}>
      <span className={styles.category}>{categoryLabel(resource.category)}</span>
      <span className={styles.dot} aria-hidden="true" />
      <span>{resource.readingTime}</span>
    </div>

    <h3 className={styles.title}>{resource.title}</h3>

    {!compact && <p className={styles.excerpt}>{resource.excerpt}</p>}

    <Link to={`/resources/${resource.slug}`} className={styles.link}>
      Read the guide
      <Icon name="arrow" size={15} />
    </Link>
  </article>
);

export default ArticleCard;
