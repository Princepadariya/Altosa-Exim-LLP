import { useLocation } from "react-router-dom";

import company from "../../data/company";
import { primaryCta } from "../../data/navigation";
import useScrolled from "../../hooks/useScrolled";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import styles from "./FloatingActions.module.css";

/**
 * Two persistent affordances that appear once the buyer has scrolled:
 * a back-to-top control, and — on phones — a bar carrying the quote CTA and
 * WhatsApp, so the primary action is never more than a thumb away.
 *
 * Both are suppressed on the quote page itself, where the form is the action.
 */
const FloatingActions = () => {
  const isScrolled = useScrolled(600);
  const { pathname } = useLocation();

  const isQuotePage = pathname.startsWith("/request-a-quote");

  return (
    <>
      <button
        type="button"
        className={cn(styles.toTop, isScrolled && styles.toTopVisible)}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={isScrolled ? 0 : -1}
      >
        <Icon name="arrow" size={18} />
      </button>

      {!isQuotePage && (
        <div
          className={cn(styles.bar, isScrolled && styles.barVisible)}
          inert={!isScrolled}
        >
          <Button to={primaryCta.to} className={styles.barAction} block>
            {primaryCta.label}
          </Button>

          <a
            href={company.contact.whatsapp}
            className={styles.barSecondary}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={company.contact.whatsappLabel}
          >
            <Icon name="whatsapp" size={20} />
          </a>
        </div>
      )}
    </>
  );
};

export default FloatingActions;
