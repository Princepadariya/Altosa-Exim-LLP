import cn from "../../utils/cn";
import styles from "./Section.module.css";

/**
 * Standard page section: vertical rhythm, background tone and the optional
 * blueprint-grid / glow treatments used on dark bands.
 *
 * @param tone     light | subtle | dark
 * @param spacing  default | tight | flush
 */
const Section = ({
  children,
  tone = "light",
  spacing = "default",
  grid = false,
  glow = false,
  narrow = false,
  plate,
  id,
  className,
  containerClassName,
  ...rest
}) => (
  <section
    id={id}
    className={cn(
      styles.section,
      tone === "subtle" && styles.subtle,
      tone === "dark" && styles.dark,
      spacing === "tight" && styles.tight,
      spacing === "flush" && styles.flush,
      grid && styles.grid,
      glow && styles.glow,
      plate && styles.hasPlate,
      className,
    )}
    {...rest}
  >
    {tone === "dark" && <span className="grain" aria-hidden="true" />}

    <div
      className={cn(
        "container",
        narrow && "container--narrow",
        styles.inner,
        containerClassName,
      )}
    >
      {/* Plate marker: the device that makes the page read as one technical
          document rather than a stack of unrelated blocks. Decorative — the
          section's real heading carries the meaning. */}
      {plate && (
        <span className={styles.plate} aria-hidden="true">
          <span className={styles.plateNumber}>{plate.number}</span>
          <span className={styles.plateRule} />
          <span className={styles.plateLabel}>{plate.label}</span>
        </span>
      )}

      {children}
    </div>
  </section>
);

export default Section;
