import { useId, useState } from "react";

import styles from "./Accordion.module.css";

/**
 * Accessible disclosure list used for the buyer FAQ.
 * Height animates via grid-template-rows so no measurement is needed.
 *
 * @param items       [{ id, question, answer, category? }]
 * @param allowMultiple  keep several panels open at once
 */
const Accordion = ({ items, allowMultiple = false, defaultOpenId = null }) => {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((item) => item !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={styles.item}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index, 6) * 50}ms` }}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <span className={styles.indicator} aria-hidden="true" />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={styles.panel}
              data-open={isOpen}
              /* Keeps collapsed answers out of the tab order while the
                 grid-row height animation still has something to animate. */
              inert={!isOpen}
            >
              <div className={styles.panelInner}>
                <div className={styles.answer}>
                  {item.category && (
                    <span className={styles.category}>{item.category}</span>
                  )}
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
