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

    {/*
      This link is stretched over the whole card by `.link::after`, so it is
      what every click on the card resolves to — title, summary, component
      list and material chips included. It therefore has to point at the
      sector itself rather than the quote form: sending someone who clicked
      "Pumps, valves & fluid handling" straight to an RFQ skips the page that
      answers what we actually source for that sector, and left
      /industries/:id unreachable from this grid. The detail page carries its
      own quote CTA with the same ?industry= deep link.
    */}
    <Link
      to={`/industries/${industry.id}`}
      className={styles.link}
      aria-label={`Explore ${industry.title.toLowerCase()}`}
    >
      Explore this sector
      <Icon name="arrow" size={15} />
    </Link>
  </article>
);

export default IndustryCard;
