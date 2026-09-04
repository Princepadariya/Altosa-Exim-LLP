import qualityStages, { qualityStagesNotice } from "../../data/qualityStages";
import StageCard from "../cards/StageCard";
import Notice from "../ui/Notice";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

/** Where quality is checked across an order, and who does the checking. */
const QualityStagesSection = ({
  tone = "light",
  plate,
  heading = {
    eyebrow: "Quality across an order",
    title: "Five points where a part is actually checked.",
    lead: "Each stage names who carries out the check. Altosa coordinates quality and assembles the records; it does not act as your certifying body.",
  },
}) => (
  <Section tone={tone} id="quality-stages" plate={plate}>
    <SectionHeading {...heading} />

    <ol style={{ marginTop: "var(--space-8)" }}>
      {qualityStages.map((stage, index) => (
        <StageCard key={stage.stage} stage={stage} index={index} />
      ))}
    </ol>

    <Notice style={{ marginTop: "var(--space-7)" }} icon="shield">
      {qualityStagesNotice}
    </Notice>
  </Section>
);

export default QualityStagesSection;
