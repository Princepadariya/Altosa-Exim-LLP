import { Link } from "react-router-dom";

import Icon from "../ui/Icon";
import styles from "./IndustryCard.module.css";

/**
 * One sector from data/industries.js.
 *
 * @param detailed  show the component list and material chips
 * @param index     used only to stagger the reveal animation
 */
const IndustryCard = ({ industry, detailed = false, index = 0 }) => (
  <article
    className={styles.card}
    data-reveal
    style={{ "--reveal-delay": `${Math.min(index, 6) * 70}ms` }}
  >
    <div className={styles.top}>
      <span className={styles.number}>{industry.number}</span>
      <span className={styles.iconWrap}>
        <Icon name={industry.icon} size={22} />
      </span>
    </div>

    <h3 className={styles.title}>{industry.title}</h3>
    <p className={styles.summary}>{industry.summary}</p>

    {detailed && (
      <>
        <div className={styles.components}>
          {industry.components.map((component) => (
            <span key={component} className={styles.component}>
              <Icon name="check" size={14} className={styles.tick} />
              {component}
            </span>
          ))}
        </div>

        <div className={styles.materials}>
          {industry.materials.map((material) => (
            <span key={material} className={styles.material}>
              {material}
            </span>
          ))}
        </div>
      </>
    )}

    <Link
      to={`/request-a-quote?industry=${industry.id}`}
      className={styles.link}
      aria-label={`Discuss ${industry.title.toLowerCase()}`}
    >
      Discuss this sector
      <Icon name="arrow" size={15} />
    </Link>
  </article>
);

export default IndustryCard;
