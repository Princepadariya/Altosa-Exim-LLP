import glossary, { glossaryLetters } from "../data/glossary";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Seo from "../components/ui/Seo";
import { breadcrumbSchema } from "../utils/seo";
import styles from "./Glossary.module.css";

const crumbs = [{ label: "Trade glossary", to: "/glossary" }];

const Glossary = () => (
  <>
    <Seo
      title="Trade & Sourcing Glossary"
      description="Plain definitions for the trade, logistics and sourcing terms a buyer meets in a quotation or on a shipping document."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Reference"
      title="Trade glossary"
      lead="Plain definitions for the terms you meet in a quotation or on a document. General vocabulary, not Altosa-specific commitments."
      crumbs={crumbs}
    />

    <Section tone="light">
      <nav aria-label="Jump to letter" className={styles.letterNav}>
        {glossaryLetters.map((letter) => (
          <a key={letter} href={`#letter-${letter}`} className={styles.letterLink}>
            {letter}
          </a>
        ))}
      </nav>

      <div className={styles.entries}>
        {glossaryLetters.map((letter) => {
          const entries = glossary.filter((entry) => entry.letter === letter);
          return (
            <section key={letter} id={`letter-${letter}`} className={styles.letterGroup}>
              <span className={styles.letterMark} aria-hidden="true">
                {letter}
              </span>
              <div className={styles.termList}>
                {entries.map((entry, index) => (
                  <article
                    key={entry.term}
                    className={styles.entry}
                    data-reveal
                    style={{ "--reveal-delay": `${Math.min(index, 4) * 60}ms` }}
                  >
                    <h2 className={styles.term}>{entry.term}</h2>
                    <p className={styles.definition}>{entry.definition}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>
          Looking for the standards equivalent or Incoterms breakdown?
        </p>
        <Button to="/standards" variant="secondary">
          Standards reference
        </Button>
      </div>
    </Section>
  </>
);

export default Glossary;
