import siteConfig from "../../data/siteConfig";
import { publishableTestimonials } from "../../data/testimonials";
import TestimonialCard from "../cards/TestimonialCard";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import grid from "../ui/Grid.module.css";

/**
 * Buyer quotes.
 *
 * Renders nothing unless the feature flag is on AND there is at least one
 * non-placeholder quote — so the section cannot accidentally publish the
 * sample text shipped in data/testimonials.js.
 */
const TestimonialsSection = ({
  tone = "light",
  heading = {
    eyebrow: "In buyers' words",
    title: "What working with Altosa is like.",
    lead: "Quotes are published only where the buyer has agreed to be attributed.",
  },
}) => {
  if (!siteConfig.features.testimonials || publishableTestimonials.length === 0) {
    return null;
  }

  return (
    <Section tone={tone} id="testimonials">
      <SectionHeading {...heading} />

      <div className={`${grid.grid} ${grid.cols3} ${grid.spaced}`}>
        {publishableTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;
