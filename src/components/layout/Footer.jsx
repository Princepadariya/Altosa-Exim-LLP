import { Link } from "react-router-dom";

import company, { hasWhatsapp } from "../../data/company";
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
              {hasWhatsapp && (
                <a
                  href={company.contact.whatsapp}
                  className={styles.contactItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    name="whatsapp"
                    size={16}
                    className={styles.contactIcon}
                  />
                  {company.contact.whatsappLabel}
                </a>
              )}
              <span className={styles.contactItem}>
                <Icon name="clock" size={16} className={styles.contactIcon} />
                {company.timezone.label}
              </span>
            </div>

            {/* The reassuring half of the timezone fact. The label alone tells a
                buyer five hours away that they have probably missed us; the note
                tells them it does not matter. */}
            <p className={styles.timezoneNote}>{company.timezone.note}</p>

            {/* Each code carries its expansion in the markup rather than in a
                title attribute: title needs a hover, phones have none, and the
                footer is read on a phone more often than anywhere else. Three
                bare acronyms mean nothing to a buyer outside India. */}
            <ul className={styles.registrations}>
              {company.registrations.map((registration) => (
                <li key={registration.code} className={styles.regChip}>
                  <span className={styles.regCode}>{registration.code}</span>
                  <span className={styles.regLabel}>{registration.label}</span>
                </li>
              ))}
            </ul>
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
            {/* Not "{company.role} registered in {city}": there is no merchant
                exporter or commission agent registration to hold. The firm is
                registered as an LLP, for IEC and for GST — the chips above say
                so — and claiming a fourth category the site cannot evidence is
                the exact move its own "verifiable over claimed" value rules
                out. */}
            © {year} {company.legalName} — {company.role.toLowerCase()}, based in{" "}
            {company.address.full}. Incoterms® is a registered trademark of the
            International Chamber of Commerce; Incoterms® 2020 rules describe
            delivery terms only.
          </p>

          <div className={styles.bottomLinks}>
            {/* Glossary is not repeated here: it already sits in the Buyer
                resources column above, where a reader looking for it is
                actually looking. The readable sitemap, not the XML one — that
                is linked from the page itself for search engines. */}
            <Link to="/sitemap">Sitemap</Link>
          </div>

          {/* The heart is decoration, not content: a screen reader announcing
              "black heart suit" mid-sentence is noise, so the glyph is hidden
              and the word it stands in for is read instead. */}
          <p className={styles.credit}>
            Made with{" "}
            <span className={styles.heart} aria-hidden="true">
              &#10084;
            </span>
            <span className="visually-hidden">love</span> by{" "}
            <a
              href="https://www.codelixitsolutions.com/"
              className={styles.creditLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Codelix
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
