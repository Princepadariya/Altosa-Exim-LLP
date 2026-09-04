import CapabilitySection from "../components/sections/CapabilitySection";
import CtaSection from "../components/sections/CtaSection";
import ProductsSection from "../components/sections/ProductsSection";
import ServicesSection from "../components/sections/ServicesSection";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Seo from "../components/ui/Seo";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Capabilities", to: "/products" }];

const Products = () => (
  <>
    <Seo
      title="Sourcing Capabilities & Product Families"
      description="Machined, forged and cast components, fasteners, copper and brass electrical parts, fabricated assemblies and flanges — sourced from Indian manufacturers to your drawing."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="What we source"
      title="Sourcing capabilities, not a stock list"
      lead="Altosa holds no inventory. What follows describes what the supplier base can produce against a drawing — the processes, materials and records available, so you know whether it is worth sending your specification."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Send your requirement</Button>
      <Button to="/quality-and-compliance" variant="onDark" showIcon={false}>
        How records are handled
      </Button>
    </PageHero>

    <ProductsSection showCta={false} />

    <CapabilitySection tone="subtle" />

    <ServicesSection
      heading={{
        eyebrow: "Alongside the parts",
        title: "Sourcing is the start; the order still has to run.",
        lead: "Quality coordination, documentation and dispatch are part of the same engagement rather than separate services bolted on afterwards.",
      }}
    />

    <CtaSection
      title="Send the drawing. Get a straight answer."
      body="Where a part is outside what the supplier base can address, we say so rather than quoting something approximate and correcting it later."
    />
  </>
);

export default Products;
