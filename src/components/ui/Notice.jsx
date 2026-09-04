import cn from "../../utils/cn";
import Icon from "./Icon";
import styles from "./Notice.module.css";

/**
 * Small print that matters — Incoterms caveats, market limits, data handling.
 * Deliberately visible rather than buried, since the site's argument is that
 * limits are stated up front.
 */
const Notice = ({
  title,
  children,
  icon = "shield",
  onDark = false,
  className,
  ...rest
}) => (
  <aside
    className={cn(styles.notice, onDark && styles.onDark, className)}
    data-reveal
    {...rest}
  >
    <Icon name={icon} size={20} className={styles.icon} />
    <div className={styles.body}>
      {title && <p className={styles.title}>{title}</p>}
      <p>{children}</p>
    </div>
  </aside>
);

export default Notice;
