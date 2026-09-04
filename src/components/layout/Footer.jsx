import { Link } from "react-router-dom";

import company from "../../data/company";
import { footerNav } from "../../data/navigation";
import Icon from "../ui/Icon";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className="grain" aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div>
              <p className={styles.brandName}>{company.legalName}</p>
              <span className={styles.role}>{company.role}</span>
            </div>

            <p className={styles.blurb}>{company.description}</p>

            <div className={styles.contactList}>
              <span className={styles.contactItem}>
                <Icon name="pin" size={16} className={styles.contactIcon} />
                {company.address.full}
              </span>
              <a
                href={`mailto:${company.contact.email}`}
                className={styles.contactItem}
              >
                <Icon name="mail" size={16} className={styles.contactIcon} />
                {company.contact.email}
              </a>
              <a
                href={company.contact.whatsapp}
                className={styles.contactItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={16} className={styles.contactIcon} />
                {company.contact.whatsappLabel}
              </a>
              <span className={styles.contactItem}>
                <Icon name="clock" size={16} className={styles.contactIcon} />
                {company.timezone.label}
              </span>
            </div>

            <div className={styles.registrations}>
              {company.registrations.map((registration) => (
                <span
                  key={registration.code}
                  className={styles.regChip}
                  title={registration.label}
                >
                  {registration.code}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.navCols}>
            {footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className={styles.colTitle}>{column.title}</h2>
                <ul className={styles.colList}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className={styles.colLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclaimer}>
            © {year} {company.legalName}. {company.role} registered in{" "}
            {company.address.full}. Incoterms® is a registered trademark of the
            International Chamber of Commerce; Incoterms® 2020 rules describe
            delivery terms only.
          </p>

          <div className={styles.bottomLinks}>
            <Link to="/glossary">Glossary</Link>
            {/* The readable sitemap, not the XML one — that is linked from
                the page itself for search engines. */}
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
