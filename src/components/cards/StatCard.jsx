import cn from "../../utils/cn";
import useCountUp from "../../hooks/useCountUp";
import styles from "./StatCard.module.css";

/**
 * A single headline figure. Numeric stats count up on first view; stats with a
 * `display` string (e.g. "IEC / GST") render as-is.
 */
const StatCard = ({ stat, tone = "dark", index = 0 }) => {
  const [ref, count] = useCountUp(stat.value);
  const isNumeric = typeof stat.value === "number";

  return (
    <div
      className={cn(styles.card, tone === "light" && styles.light)}
      data-reveal
      style={{ "--reveal-delay": `${Math.min(index, 6) * 80}ms` }}
    >
      <span className={styles.value} ref={ref}>
        {isNumeric ? Math.round(count) : stat.display}
        {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
      </span>

      {/* A measure rule, drawn as tick marks with an accent line that sweeps
          across as the figure counts up. Deliberately decorative: the stats
          are on unrelated scales (years, sectors, markets), so a proportional
          bar would imply a comparison that does not exist. */}
      <span className={styles.measure} aria-hidden="true" />

      <span className={styles.label}>{stat.label}</span>
      {stat.note && <span className={styles.note}>{stat.note}</span>}
    </div>
  );
};

export default StatCard;
