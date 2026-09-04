import cn from "../../utils/cn";
import Notice from "./Notice";
import styles from "./Prose.module.css";

/** Turns a heading into a stable anchor id, so the contents list can link to it. */
export const slugifyHeading = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * Renders the structured article bodies in data/resources.js.
 *
 * Keeping article content as data rather than JSX means a guide can be edited
 * without touching a component, and the same blocks can be reused elsewhere.
 */
const Prose = ({ blocks, className }) => (
  <div className={cn(styles.prose, className)}>
    {blocks.map((block, index) => {
      const key = `${block.type}-${index}`;

      switch (block.type) {
        case "h2":
          return (
            <h2
              key={key}
              id={slugifyHeading(block.text)}
              className={styles.heading}
              data-reveal
            >
              {block.text}
            </h2>
          );

        case "list":
          return (
            <ul
              key={key}
              className={cn(styles.list, block.ordered && styles.ordered)}
              data-reveal
            >
              {block.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.marker} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );

        case "table":
          return (
            <div key={key} className={styles.tableWrap} data-reveal>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {block.head.map((heading) => (
                      <th key={heading} scope="col">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${cell}-${cellIndex}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        case "note":
          return (
            <Notice key={key} icon="shield">
              {block.text}
            </Notice>
          );

        case "p":
        default:
          return (
            <p key={key} className={styles.paragraph} data-reveal>
              {block.text}
            </p>
          );
      }
    })}
  </div>
);

export default Prose;
