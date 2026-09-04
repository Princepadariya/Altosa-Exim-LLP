import faqs from "../../data/faqs";
import Accordion from "../ui/Accordion";
import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";

/**
 * Buyer FAQ. `limit` shows a shortened set on the homepage; the FAQ page
 * renders every question and emits FAQPage structured data alongside it.
 */
const FaqSection = ({
  tone = "subtle",
  limit = null,
  showCta = true,
  heading = {
    eyebrow: "Buyer FAQ",
    title: "Straight answers before you commit time.",
    lead: "The questions a careful buyer asks first, answered without hedging — including the ones where the honest answer is that it depends on the order.",
  },
}) => {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <Section tone={tone} id="faq">
      <div className={grid.split}>
        <div className={grid.sticky}>
          <SectionHeading {...heading} />

          {showCta && (
            <div style={{ marginTop: "var(--space-6)" }} data-reveal>
              <Button to="/faq" variant="secondary">
                Read every buyer question
              </Button>
            </div>
          )}
        </div>

        <Accordion items={items} defaultOpenId={items[0]?.id} />
      </div>
    </Section>
  );
};

export default FaqSection;
