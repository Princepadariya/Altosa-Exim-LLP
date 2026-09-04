import processSteps from "../../data/process";
import ProcessStep from "../cards/ProcessStep";
import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";

/**
 * The four decision points. The homepage shows the summary; the How we work
 * page passes `detailed` to expand the "you send / you get" exchange.
 */
const ProcessSection = ({
  detailed = false,
  showCta = true,
  tone = "subtle",
  plate,
  heading = {
    eyebrow: "How we work",
    title: "A transparent sourcing process for cross-border buying teams.",
    lead: "Four decision points stand between an inquiry and a dispatched order. Knowing them in advance tells you what information to send, what you will get back, and where you can still change your mind.",
  },
}) => (
  <Section tone={tone} id="process" plate={plate}>
    <div className={grid.split}>
      <div className={grid.sticky}>
        <SectionHeading {...heading} />

        {showCta && (
          <div style={{ marginTop: "var(--space-6)" }} data-reveal>
            <Button to="/how-we-work" variant="secondary">
              Read the full sourcing process
            </Button>
          </div>
        )}
      </div>

      <ol>
        {processSteps.map((step, index) => (
          <ProcessStep
            key={step.step}
            step={step}
            detailed={detailed}
            index={index}
          />
        ))}
      </ol>
    </div>
  </Section>
);

export default ProcessSection;
