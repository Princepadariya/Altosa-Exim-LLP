import cn from "../../utils/cn";
import styles from "./Marquee.module.css";

/**
 * Continuous scrolling strip. The track is duplicated so the loop is seamless;
 * the copy is hidden from assistive tech. Pauses on hover and under
 * prefers-reduced-motion.
 */
const Marquee = ({ items, duration = 42, reverse = false, className }) => (
  <div
    className={cn(styles.marquee, reverse && styles.reverse, className)}
    style={{ "--marquee-duration": `${duration}s` }}
  >
    {[0, 1].map((copy) => (
      <div key={copy} className={styles.track} aria-hidden={copy === 1}>
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    ))}
  </div>
);

export default Marquee;
