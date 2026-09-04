import { Link } from "react-router-dom";

import cn from "../../utils/cn";
import Icon from "./Icon";
import styles from "./Button.module.css";

/**
 * One button that renders as a <Link>, an <a> or a <button> depending on the
 * props it receives, so callers never have to restyle for the element type.
 *
 * @param variant  primary | secondary | ghost | onDark
 * @param size     sm | md | lg
 * @param to       internal route  → renders a react-router Link
 * @param href     external URL    → renders an anchor with safe rel
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  icon = "arrow",
  showIcon = true,
  block = false,
  className,
  ...rest
}) => {
  const classes = cn(
    styles.button,
    styles[variant],
    size !== "md" && styles[size],
    block && styles.block,
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon && icon && <Icon name={icon} size={16} className={styles.icon} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
};

export default Button;
