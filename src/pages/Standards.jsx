import CtaSection from "../components/sections/CtaSection";
import {
  incotermGroups,
  materialFamilies,
  standardsNotice,
  surfaceTreatments,
} from "../data/standards";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import { breadcrumbSchema } from "../utils/seo";
import styles from "./Standards.module.css";

const crumbs = [{ label: "Standards reference", to: "/standards" }];

const Standards = () => (
  <>
    <Seo
      title="Material & Incoterms Standards Reference"
      description="Cross-reference table for IS, ASTM and EN material grades, surface treatment options, and all eleven Incoterms 2020 rules explained."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Reference"
      title="Standards reference"
      lead="Cross-references for common material grades, surface treatments, and all eleven Incoterms® 2020 rules. These are published equivalents, not claims about specific stock."
      crumbs={crumbs}
    />

    <Section tone="light" plate={{ number: "01", label: "Materials" }}>
      <Notice icon="compass" style={{ marginBottom: "var(--space-8)" }}>
        {standardsNotice}
      </Notice>

      <SectionHeading
        eyebrow="Materials"
        title="Grade cross-reference."
        lead="IS, ASTM and EN designations for the material families sourced most often. The drawing governs."
      />

      <div className={styles.families}>
        {materialFamilies.map((family) => (
          <section key={family.id} className={styles.family} data-reveal>
            <h2 className={styles.familyTitle}>{family.family}</h2>
            <p className={styles.familyNote}>{family.note}</p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>IS (Indian)</th>
                    <th className={styles.th}>ASTM</th>
                    <th className={styles.th}>EN</th>
                    <th className={`${styles.th} ${styles.thNote}`}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {family.grades.map((grade) => (
                    <tr key={grade.indian} className={styles.tr}>
                      <td className={`${styles.td} ${styles.mono}`}>{grade.indian}</td>
                      <td className={`${styles.td} ${styles.mono}`}>{grade.astm}</td>
                      <td className={`${styles.td} ${styles.mono}`}>{grade.en}</td>
                      <td className={`${styles.td} ${styles.noteCell}`}>{grade.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </Section>

    <Section tone="subtle" plate={{ number: "02", label: "Finishes" }}>
      <SectionHeading
        eyebrow="Surface treatments"
        title="Coatings and finishes."
        lead="Typical thickness ranges and what to specify. The coating belongs on the drawing, not in a covering note."
      />

      <div className={styles.treatments}>
        {surfaceTreatments.map((treatment, index) => (
          <div
            key={treatment.name}
            className={styles.treatment}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` }}
          >
            <h3 className={styles.treatmentName}>{treatment.name}</h3>
            <span className={styles.treatmentRange}>{treatment.typical}</span>
            <p className={styles.treatmentNote}>{treatment.note}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section tone="light" plate={{ number: "03", label: "Incoterms" }}>
      <SectionHeading
        eyebrow="Incoterms® 2020"
        title="All eleven delivery rules."
        lead="Each rule sets a handover point where risk and responsibility pass from seller to buyer. The named place completes the rule."
      />

      {incotermGroups.map((group) => (
        <div key={group.group} className={styles.incotermGroup} data-reveal>
          <h2 className={styles.incotermGroupTitle}>{group.group}</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={`${styles.th} ${styles.thCode}`}>Code</th>
                  <th className={styles.th}>Rule</th>
                  <th className={styles.th}>Handover point</th>
                  <th className={styles.th}>Buyer carries</th>
                </tr>
              </thead>
              <tbody>
                {group.rules.map((rule) => (
                  <tr key={rule.code} className={styles.tr}>
                    <td className={`${styles.td} ${styles.mono} ${styles.codeCell}`}>
                      {rule.code}
                    </td>
                    <td className={styles.td}>{rule.name}</td>
                    <td className={`${styles.td} ${styles.muted}`}>{rule.handover}</td>
                    <td className={`${styles.td} ${styles.muted}`}>{rule.buyerCarries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <Notice icon="shield" style={{ marginTop: "var(--space-8)" }}>
        Incoterms® is a registered trademark of the International Chamber of
        Commerce. Rules shown here summarise the 2020 edition; consult the ICC
        publication for the authoritative text.
      </Notice>
    </Section>

    <CtaSection />
  </>
);

export default Standards;
