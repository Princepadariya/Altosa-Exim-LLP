import Icon from "../ui/Icon";
import styles from "./ProcessStep.module.css";

/**
 * One decision point from data/process.js.
 *
 * The connecting rail is drawn by .step::before rather than as an element per
 * step: it has to reach the *next* marker's centre, which is past this step's
 * own bottom edge, so it cannot be a child laid out inside the step.
 *
 * @param detailed  show the "you send / you get" exchange panel
 */
const ProcessStep = ({ step, detailed = false, index = 0 }) => (
  <li
    className={styles.step}
    data-reveal
    style={{ "--reveal-delay": `${Math.min(index, 6) * 90}ms` }}
  >
    <span className={styles.marker} aria-hidden="true">
      {step.step}
    </span>

    <div className={styles.body}>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.summary}>{step.summary}</p>

      {detailed && (
        <div className={styles.exchange}>
          <div className={styles.column}>
            <span className={styles.columnLabel}>What you send</span>
            {step.youSend.map((item) => (
              <span key={item} className={styles.item}>
                <Icon name="arrow" size={13} className={styles.tick} />
                {item}
              </span>
            ))}
          </div>

          <div className={styles.column}>
            <span className={styles.columnLabel}>What you get back</span>
            <p className={styles.outcome}>{step.youGet}</p>
          </div>
        </div>
      )}
    </div>
  </li>
);

export default ProcessStep;
