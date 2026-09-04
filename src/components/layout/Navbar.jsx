import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import company, { hasWhatsapp } from "../../data/company";
import { navMenus, primaryCta, primaryNav } from "../../data/navigation";
import useScrollLock from "../../hooks/useScrollLock";
import useScrollDirection from "../../hooks/useScrollDirection";
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
  /** Which desktop dropdown is open, keyed by its parent path. */
  const [openMenu, setOpenMenu] = useState(null);
  /**
   * The drawer keeps its own open-group state. Sharing it with the desktop
   * panels would subject the drawer to their outside-pointer dismissal, which
   * closes on any tap that is not inside a .navItem — and nothing in the
   * drawer is.
   */
  const [openDrawerMenu, setOpenDrawerMenu] = useState(null);
  const isScrolled = useScrolled(24);
  const isScrollingDown = useScrollDirection();
  const { pathname } = useLocation();

  /*
   * The bar drops its floating shape and runs edge to edge while the reader is
   * moving down the page, and takes it back on the way up. Frozen while a menu
   * is open: the dropdowns are positioned against the bar, so reshaping it
   * underneath an open panel would shift the panel out from under the cursor.
   */
  /*
   * Follows the scroll direction alone. It used to be held back while a menu
   * was open, from when the shape change moved layout and would have dragged
   * an anchored panel with it. The bar is painted on a pseudo-element now, so
   * nothing moves — and the guard had become a bug of its own: hovering a
   * submenu while scrolled down snapped the full-width bar back to a pill.
   */
  const isFullWidth = isScrollingDown;

  useScrollLock(isMenuOpen);

  /*
   * Close the drawer on navigation, by comparing the path against the one the
   * drawer was opened under. React's documented way to reset state when a
   * value changes: an effect for this costs a second render every time the
   * route changes, and only to reach a value already known during the first.
   */
  const [pathAtRender, setPathAtRender] = useState(pathname);

  if (pathAtRender !== pathname) {
    setPathAtRender(pathname);
    setIsMenuOpen(false);
    setOpenMenu(null);
    setOpenDrawerMenu(null);
  }

  /*
   * Dismissal for the desktop dropdowns: Escape, or a pointer landing outside
   * the item that owns the open panel. Both listeners are attached only while
   * a panel is actually open, so the common case costs nothing.
   */
  useEffect(() => {
    if (!openMenu) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    const onPointerDown = (event) => {
      if (!event.target.closest?.(`.${styles.navItem}`)) setOpenMenu(null);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  // Close the drawer on Escape.
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
        className={cn(
          styles.header,
          (isScrolled || isMenuOpen) && styles.scrolled,
          isFullWidth && styles.headerFull,
        )}
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
            {primaryNav.map((item) => {
              const menu = navMenus[item.to];

              if (!menu) {
                return (
                  <NavLink key={item.to} to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                );
              }

              const menuId = `nav-menu-${item.to.replace(/\W+/g, "")}`;
              const isOpen = openMenu === item.to;

              return (
                <div
                  key={item.to}
                  className={styles.navItem}
                  /*
                   * Hover opens the panel and moving off the item closes it.
                   * The panel is a child of this element, so travelling down
                   * into it never leaves the item and never triggers the
                   * close — the gap between the two is bridged by .menu's own
                   * ::before, so a diagonal path to a link stays inside.
                   *
                   * Guarded on pointerType: a touch also fires pointerenter,
                   * and on a phone that would open the panel on the same tap
                   * that follows the link underneath it.
                   */
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setOpenMenu(item.to);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") {
                      setOpenMenu((current) =>
                        current === item.to ? null : current,
                      );
                    }
                  }}
                >
                  {/*
                    The label stays a link to the index page and the chevron is
                    a separate control. Turning the whole item into a menu
                    button would take away the one destination a visitor is
                    most likely to want, and a link that also opens a panel
                    cannot say which of the two a click will do.
                  */}
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>

                  <button
                    type="button"
                    className={cn(styles.disclosure, isOpen && styles.disclosureOpen)}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    aria-label={`${item.label} pages`}
                    onClick={() =>
                      setOpenMenu((current) => (current === item.to ? null : item.to))
                    }
                  >
                    <Icon name="chevronDown" size={13} strokeWidth={2.4} />
                  </button>

                  <div id={menuId} className={styles.menu} hidden={!isOpen}>
                    <Link to={item.to} className={styles.menuOverview}>
                      {menu.overview}
                    </Link>

                    <ul className={styles.menuList}>
                      {menu.items.map((sub) => (
                        <li key={sub.to}>
                          <NavLink to={sub.to} className={styles.menuLink}>
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
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

      {/*
        Backdrop behind the drawer. Blurs and dims everything underneath, and
        closes on a tap — the gesture people reach for before they look for a
        button.
      */}
      <div
        className={cn(styles.scrim, isMenuOpen && styles.scrimOpen)}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={cn(styles.drawer, isMenuOpen && styles.drawerOpen)}
        inert={!isMenuOpen}
      >
        {/*
          The drawer now covers the header, so the toggle that opened it is no
          longer reachable. This is the way back out, alongside Escape and a
          tap on the scrim.
        */}
        <button
          type="button"
          className={styles.drawerClose}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <Icon name="plus" size={22} />
        </button>

        <nav className={styles.drawerNav} aria-label="Mobile">
          {primaryNav.map((item, index) => {
            const menu = navMenus[item.to];

            if (!menu) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={drawerLinkClass}
                  style={{ "--stagger": index }}
                >
                  {item.label}
                  <Icon name="arrow" size={18} className={styles.drawerArrow} />
                </NavLink>
              );
            }

            const menuId = `drawer-menu-${item.to.replace(/\W+/g, "")}`;
            const isOpen = openDrawerMenu === item.to;

            return (
              <div
                key={item.to}
                className={styles.drawerGroup}
                style={{ "--stagger": index }}
              >
                <div className={styles.drawerRow}>
                  {/* The row's own label still goes to the index page, so the
                      sub-list does not repeat it the way the desktop panel
                      does — there the label and the panel are separated by a
                      hover's worth of distance; here they are adjacent. */}
                  <NavLink to={item.to} className={drawerLinkClass}>
                    {item.label}
                  </NavLink>

                  <button
                    type="button"
                    className={cn(
                      styles.drawerDisclosure,
                      isOpen && styles.drawerDisclosureOpen,
                    )}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    aria-label={`${item.label} pages`}
                    onClick={() =>
                      setOpenDrawerMenu((current) =>
                        current === item.to ? null : item.to,
                      )
                    }
                  >
                    <Icon name="chevronDown" size={20} strokeWidth={2.2} />
                  </button>
                </div>

                <ul id={menuId} className={styles.drawerSubList} hidden={!isOpen}>
                  {menu.items.map((sub) => (
                    <li key={sub.to}>
                      <NavLink to={sub.to} className={styles.drawerSubLink}>
                        {sub.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
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
            {hasWhatsapp && (
              <a
                href={company.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={16} />
                {company.contact.whatsappLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
