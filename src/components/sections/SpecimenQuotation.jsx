import {
  specimenBanner,
  specimenFootnote,
  specimenLines,
  specimenMeta,
} from "../../data/quotation";
import Icon from "../ui/Icon";
import styles from "./SpecimenQuotation.module.css";

/**
 * The annotated specimen quotation.
 *
 * Rendered as a document rather than as a list: the point is to show what the
 * buyer will actually receive, so it borrows the title-block language used by
 * the hero drawing — mono field labels, hairline rules, values set in text.
 *
 * The annotation beside each line is the argument; the value is only there to
 * make the field concrete. Marked as a specimen in the markup and visually,
 * because a document that looks like a real quotation and is not one would be
 * the single worst thing this site could publish.
 */
const SpecimenQuotation = () => (
  <figure className={styles.doc} data-reveal>
    <figcaption className={styles.banner}>
      <Icon name="shield" size={16} className={styles.bannerIcon} />
      <span>{specimenBanner}</span>
    </figcaption>

    <header className={styles.head}>
      <span className={styles.docTitle}>{specimenMeta.documentTitle}</span>

      <dl className={styles.meta}>
        <div className={styles.metaPair}>
          <dt>Ref</dt>
          <dd>{specimenMeta.reference}</dd>
        </div>
        <div className={styles.metaPair}>
          <dt>Issued</dt>
          <dd>{specimenMeta.issued}</dd>
        </div>
        <div className={styles.metaPair}>
          <dt>Validity</dt>
          <dd>{specimenMeta.validity}</dd>
        </div>
      </dl>
    </header>

    <ol className={styles.lines}>
      {specimenLines.map((line, index) => (
        <li
          key={line.id}
          className={styles.line}
          style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` }}
        >
          <span className={styles.lineNo} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className={styles.lineBody}>
            <span className={styles.lineField}>{line.field}</span>
            <p className={styles.lineValue}>{line.value}</p>
            <p className={styles.lineNote}>{line.note}</p>
          </div>
        </li>
      ))}
    </ol>

    <footer className={styles.foot}>{specimenFootnote}</footer>
  </figure>
);

export default SpecimenQuotation;
