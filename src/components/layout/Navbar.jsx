import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import company from "../../data/company";
import { primaryCta, primaryNav } from "../../data/navigation";
import useScrollLock from "../../hooks/useScrollLock";
import useScrolled from "../../hooks/useScrolled";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import styles from "./Navbar.module.css";

/**
 * Fixed header. Transparent over the hero, condensing to a blurred bar once
 * the page scrolls. Below 1080px the nav collapses into a full-height drawer.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled(24);
  const { pathname } = useLocation();

  useScrollLock(isMenuOpen);

  // Close the drawer on navigation and on Escape.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    cn(styles.link, isActive && styles.active);

  const drawerLinkClass = ({ isActive }) =>
    cn(styles.drawerLink, isActive && styles.drawerActive);

  return (
    <>
      <header
        className={cn(styles.header, (isScrolled || isMenuOpen) && styles.scrolled)}
      >
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.brand} aria-label={`${company.name} — home`}>
            <span className={styles.brandMark} aria-hidden="true">
              <Icon name="arrowUpRight" size={19} strokeWidth={2.2} />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>
                ALTOSA EXIM<span className={styles.brandSuffix}>LLP</span>
              </span>
              <span className={styles.brandRole}>{company.address.full}</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <span className={styles.ctaDesktop}>
              <Button to={primaryCta.to} size="sm">
                {primaryCta.label}
              </Button>
            </span>

            <button
              type="button"
              className={cn(styles.toggle, isMenuOpen && styles.toggleOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className={styles.toggleBar} />
              <span className={styles.toggleBar} />
              <span className={styles.toggleBar} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(styles.drawer, isMenuOpen && styles.drawerOpen)}
        inert={!isMenuOpen}
      >
        <nav className={styles.drawerNav} aria-label="Mobile">
          {primaryNav.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={drawerLinkClass}
              style={{ "--stagger": index }}
            >
              {item.label}
              <Icon name="arrow" size={18} className={styles.drawerArrow} />
            </NavLink>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <Button to={primaryCta.to} block>
            {primaryCta.label}
          </Button>

          <div className={styles.drawerContact}>
            <a href={`mailto:${company.contact.email}`}>
              <Icon name="mail" size={16} />
              {company.contact.email}
            </a>
            <a
              href={company.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={16} />
              {company.contact.whatsappLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
