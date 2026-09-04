import Icon from "../ui/Icon";
import styles from "./StageCard.module.css";

/**
 * One quality stage from data/qualityStages.js.
 * The `owner` chip is deliberately prominent: who performs a check matters as
 * much as the check itself, since Altosa coordinates rather than certifies.
 */
const StageCard = ({ stage, index = 0 }) => (
  <li
    className={styles.stage}
    data-reveal
    style={{ "--reveal-delay": `${Math.min(index, 6) * 70}ms` }}
  >
    <span className={styles.number} aria-hidden="true">
      {stage.stage}
    </span>

    <div className={styles.body}>
      <div className={styles.head}>
        <h3 className={styles.title}>{stage.title}</h3>
        <span className={styles.owner}>Carried out by: {stage.owner}</span>
      </div>

      <p className={styles.summary}>{stage.summary}</p>

      <div className={styles.checks}>
        {stage.checks.map((check) => (
          <span key={check} className={styles.check}>
            <Icon name="check" size={14} className={styles.tick} />
            {check}
          </span>
        ))}
      </div>
    </div>
  </li>
);

export default StageCard;
