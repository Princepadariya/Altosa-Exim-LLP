import CtaSection from "../components/sections/CtaSection";
import IndustriesSection from "../components/sections/IndustriesSection";
import Button from "../components/ui/Button";
import Notice from "../components/ui/Notice";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Industries", to: "/industries" }];

const Industries = () => (
  <>
    <Seo
      title="Industries We Source For"
      description="Automotive, electrical, general engineering, construction, agriculture and fluid-handling components sourced from India against your drawing or specification."
      schema={breadcrumbSchema([{ label: "Industries", to: "/industries" }])}
    />

    <PageHero
      eyebrow="Industries we source for"
      title="Industries we source components for"
      lead="Altosa sources against a buyer's drawing or specification rather than from a fixed catalogue. These are the sectors our supplier base in and around Rajkot covers most often — they are where we start, not where we stop."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Send your requirement</Button>
      <Button to="/products" variant="onDark" showIcon={false}>
        See sourcing capabilities
      </Button>
    </PageHero>

    <IndustriesSection
      layout="cards"
      detailed
      showCta={false}
      heading={{
        eyebrow: "Sector coverage",
        title: "Six sectors our supplier base covers most often.",
        lead: "Each sector below describes the kind of components our supplier base handles most often. Availability for any specific part is confirmed against your drawing or specification, not assumed from this list.",
      }}
    />

    <Section tone="subtle" narrow>
      <SectionHeading
        eyebrow="Not listed?"
        title="Your sector isn't listed?"
        lead="The process does not change. Send the drawing or specification and we will tell you honestly whether we can source it — including when we cannot."
        align="center"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "var(--space-6)",
        }}
        data-reveal
      >
        <Button to="/request-a-quote" size="lg">
          Send your requirement
        </Button>
      </div>

      <Notice style={{ marginTop: "var(--space-8)" }} icon="compass">
        Sector coverage reflects the range our supplier base can address, not a
        claim of completed work in every sector. Availability, standards,
        documentation and export feasibility are confirmed for each inquiry.
      </Notice>
    </Section>

    <CtaSection />
  </>
);

export default Industries;
