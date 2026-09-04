import packingOptions, {
  exportDocuments,
  logisticsNotice,
  shippingModes,
} from "../../data/logistics";
import Icon from "../ui/Icon";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import styles from "./LogisticsSection.module.css";

/**
 * How an order physically leaves India: shipping mode, packing method and the
 * documents that travel with it.
 *
 * @param compact  omit the packing and document blocks (used on Markets)
 */
const LogisticsSection = ({
  tone = "subtle",
  compact = false,
  heading = {
    eyebrow: "Packing & dispatch",
    title: "How the parts actually leave India.",
    lead: "Packing method, container plan and the documents issued are recorded in the quotation for that order — not left to be discovered when the container arrives.",
  },
}) => (
  <Section tone={tone} id="logistics">
    <SectionHeading {...heading} />

    <div className={styles.modes}>
      {shippingModes.map((mode, index) => (
        <article
          key={mode.id}
          className={styles.mode}
          data-reveal
          style={{ "--reveal-delay": `${index * 70}ms` }}
        >
          <Icon name={mode.icon} size={22} className={styles.modeIcon} />
          <h3 className={styles.modeName}>{mode.mode}</h3>
          <span className={styles.modeTransit}>{mode.transit}</span>
          <p className={styles.modeNote}>{mode.note}</p>
        </article>
      ))}
    </div>

    {!compact && (
      <>
        <h3 className="visually-hidden">Packing options</h3>
        <div className={styles.packing}>
          {packingOptions.map((pack, index) => (
            <article
              key={pack.id}
              className={styles.pack}
              data-reveal
              style={{ "--reveal-delay": `${index * 60}ms` }}
            >
              <h4 className={styles.packName}>{pack.name}</h4>
              <p className={styles.packNote}>{pack.note}</p>
              <span className={styles.packSuited}>{pack.suitedTo}</span>
            </article>
          ))}
        </div>

        <h3 className="visually-hidden">Documents issued</h3>
        <div className={styles.docs}>
          {exportDocuments.map((doc, index) => (
            <article
              key={doc.name}
              className={styles.doc}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 50}ms` }}
            >
              <Icon name="document" size={18} className={styles.docIcon} />
              <div>
                <h4 className={styles.docName}>{doc.name}</h4>
                <p className={styles.docPurpose}>{doc.purpose}</p>
              </div>
            </article>
          ))}
        </div>
      </>
    )}

    <Notice style={{ marginTop: "var(--space-7)" }} icon="container">
      {logisticsNotice}
    </Notice>
  </Section>
);

export default LogisticsSection;
