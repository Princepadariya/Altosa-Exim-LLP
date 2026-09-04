import resources from "../../data/resources";
import ArticleCard from "../cards/ArticleCard";
import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";

/**
 * Buyer guides. `limit` shows a teaser set on the homepage; the Resources page
 * renders the full list with category filtering.
 */
const ResourcesSection = ({
  tone = "light",
  limit = null,
  showCta = true,
  plate,
  heading = {
    eyebrow: "Buyer resources",
    title: "The parts of importing nobody explains up front.",
    lead: "Practical guides on writing an RFQ, reading a material certificate and choosing an Incoterms® rule — written to be useful whether or not you buy through us.",
  },
}) => {
  const items = limit ? resources.slice(0, limit) : resources;

  return (
    <Section tone={tone} id="resources" plate={plate}>
      <SectionHeading {...heading} />

      <div className={`${grid.grid} ${grid.cols3} ${grid.spaced}`}>
        {items.map((resource, index) => (
          <ArticleCard key={resource.slug} resource={resource} index={index} />
        ))}
      </div>

      {showCta && (
        <div style={{ marginTop: "var(--space-7)" }} data-reveal>
          <Button to="/resources" variant="secondary">
            Read all buyer guides
          </Button>
        </div>
      )}
    </Section>
  );
};

export default ResourcesSection;
