import { Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./PageHero.module.css";

/**
 * Dark masthead shared by every inner page: breadcrumbs, eyebrow, H1 and lead.
 * `crumbs` is [{ label, to }] with the current page last (rendered as text).
 */
const PageHero = ({ eyebrow, title, lead, crumbs = [], children }) => (
  <header className={styles.hero}>
    <span className="grain" aria-hidden="true" />

    <div className="container">
    <div className={styles.inner}>
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className={styles.crumbs} data-reveal>
          <Link to="/" className={styles.crumbLink}>
            Home
          </Link>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <Fragment key={crumb.label}>
                <span className={styles.crumbSep} aria-hidden="true">
                  /
                </span>
                {isLast || !crumb.to ? (
                  <span className={styles.current} aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.to} className={styles.crumbLink}>
                    {crumb.label}
                  </Link>
                )}
              </Fragment>
            );
          })}
        </nav>
      )}

      {eyebrow && (
        <span className={styles.eyebrow} data-reveal style={{ "--reveal-delay": "60ms" }}>
          {eyebrow}
        </span>
      )}

      <h1 className={styles.title} data-reveal style={{ "--reveal-delay": "120ms" }}>
        {title}
      </h1>

      {lead && (
        <p className={styles.lead} data-reveal style={{ "--reveal-delay": "180ms" }}>
          {lead}
        </p>
      )}

      {children && (
        <div className={styles.actions} data-reveal style={{ "--reveal-delay": "240ms" }}>
          {children}
        </div>
      )}
    </div>
    </div>
  </header>
);

export default PageHero;
