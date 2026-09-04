import cn from "../../utils/cn";
import styles from "./SectionHeading.module.css";

/**
 * Section opener.
 *
 * `variant` exists because a page where every section announces itself the
 * same way reads as a template. Use it to vary the rhythm down a page:
 *
 *   stack     eyebrow / title / lead in a column (the quiet default)
 *   split     title on the left, lead alongside it — for wide sections
 *   statement no eyebrow, oversized title, for a section that should land hard
 *   rule      title sitting on a hairline with the eyebrow set to its right
 *
 * An eyebrow is optional in every variant. Leaving it off is usually the right
 * call when the section above already used one.
 */
const SectionHeading = ({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  variant = "stack",
  align = "left",
  onDark = false,
  id,
  className,
}) => {
  const titleEl = (
    <Tag className={styles.title} id={id} data-reveal style={{ "--reveal-delay": "60ms" }}>
      {title}
    </Tag>
  );

  const eyebrowEl = eyebrow && (
    <span className={styles.eyebrow} data-reveal>
      {eyebrow}
    </span>
  );

  const leadEl = lead && (
    <p className={styles.lead} data-reveal style={{ "--reveal-delay": "120ms" }}>
      {lead}
    </p>
  );

  const root = cn(
    styles.heading,
    styles[variant],
    align === "center" && styles.center,
    onDark && styles.onDark,
    className,
  );

  if (variant === "rule") {
    return (
      <div className={root}>
        <div className={styles.ruleTop} data-reveal>
          {eyebrowEl}
          <span className={styles.ruleLine} aria-hidden="true" />
        </div>
        {titleEl}
        {leadEl}
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div className={root}>
        <div className={styles.splitLeft}>
          {eyebrowEl}
          {titleEl}
        </div>
        {leadEl && <div className={styles.splitRight}>{leadEl}</div>}
      </div>
    );
  }

  return (
    <div className={root}>
      {eyebrowEl}
      {titleEl}
      {leadEl}
    </div>
  );
};

export default SectionHeading;
