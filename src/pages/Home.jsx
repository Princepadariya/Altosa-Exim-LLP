import AboutSection from "../components/sections/AboutSection";
import AssuranceSection from "../components/sections/AssuranceSection";
import CtaSection from "../components/sections/CtaSection";
import EngagementSection from "../components/sections/EngagementSection";
import FaqSection from "../components/sections/FaqSection";
import Hero from "../components/sections/Hero";
import IndustriesSection from "../components/sections/IndustriesSection";
import MarketsSection from "../components/sections/MarketsSection";
import ProcessSection from "../components/sections/ProcessSection";
import ProductsSection from "../components/sections/ProductsSection";
import ResourcesSection from "../components/sections/ResourcesSection";
import ServicesSection from "../components/sections/ServicesSection";
import StatsBand from "../components/sections/StatsBand";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import Seo from "../components/ui/Seo";

/**
 * Homepage, ordered as a first-time visitor's questions actually arrive:
 * who are you, how do I buy from you, what do you source, how does an order
 * run, can I verify any of it, how do I start.
 */
const Home = () => (
  <>
    <Seo
      title={null}
      description="Altosa Exim LLP is a merchant exporter and commission agent in Rajkot, India, sourcing engineering, automotive and electrical components against buyer drawings and specifications."
    />

    <Hero />
    <StatsBand />

    {/*
     * Who we are, then how you buy from us, and only then what we source.
     * The previous order opened with two catalogue sections, which assumes the
     * visitor already knows what a merchant exporter is. A first-time visitor
     * needs the role explained before the range.
     *
     * Heading variants are alternated deliberately down the page: when every
     * section opens with the same eyebrow / title / lead column the page reads
     * as one template repeated, however different the copy is.
     */}
    <AboutSection plate={{ number: "01", label: "The firm" }} />

    {/* The clearest explanation of the business, and it was reachable only
        from /services. Cards only here; the full comparison stays there. */}
    <EngagementSection
      tone="subtle"
      showTable={false}
      plate={{ number: "02", label: "How you buy" }}
    />

    <IndustriesSection plate={{ number: "03", label: "Sectors" }} />

    <ProductsSection
      tone="subtle"
      limit={6}
      showFilters={false}
      headingVariant="rule"
      plate={{ number: "04", label: "Capabilities" }}
    />

    {/*
     * Custom heading: the default one opens "Two ways to buy", which is now
     * section 02's job. Here the six services are the subject.
     */}
    <ServicesSection
      headingVariant="split"
      plate={{ number: "05", label: "Services" }}
      heading={{
        eyebrow: "What we do",
        title: "Sourcing is the start; the order still has to run.",
        lead: "Supplier identification, quality coordination, documentation and dispatch are part of the same engagement rather than extras bolted on once a price is agreed.",
      }}
    />

    <ProcessSection plate={{ number: "06", label: "Process" }} />

    <MarketsSection
      tone="light"
      headingVariant="rule"
      plate={{ number: "07", label: "Markets" }}
    />

    <AssuranceSection tone="dark" plate={{ number: "08", label: "Assurance" }} />

    <TestimonialsSection />

    {/* The guides had no entry point outside the nav. */}
    <ResourcesSection
      tone="subtle"
      limit={3}
      plate={{ number: "09", label: "Guides" }}
    />

    {/* 8, not 6: the two commercial questions added below "who am I buying
        from" — how the commission is calculated and what the payment basis is —
        are the ones a first-time export buyer asks before anything else, and at
        6 they fell off the homepage entirely. */}
    <FaqSection limit={8} />
    <CtaSection />
  </>
);

export default Home;
