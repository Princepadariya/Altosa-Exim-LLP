import styles from "./TestimonialCard.module.css";

const initialsOf = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

/**
 * A buyer quote. Only rendered for entries that are not placeholders — see the
 * note at the top of data/testimonials.js.
 */
const TestimonialCard = ({ testimonial, index = 0 }) => (
  <figure
    className={styles.card}
    data-reveal
    style={{ "--reveal-delay": `${Math.min(index, 6) * 80}ms` }}
  >
    <span className={styles.mark} aria-hidden="true">
      &rdquo;
    </span>

    <blockquote className={styles.quote}>{testimonial.quote}</blockquote>

    <figcaption className={styles.footer}>
      <span className={styles.avatar} aria-hidden="true">
        {initialsOf(testimonial.author)}
      </span>
      <span className={styles.author}>
        <span className={styles.name}>{testimonial.author}</span>
        <span className={styles.meta}>
          {[testimonial.role, testimonial.company, testimonial.country]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </span>
    </figcaption>
  </figure>
);

export default TestimonialCard;
