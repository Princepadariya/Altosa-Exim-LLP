import CtaSection from "../components/sections/CtaSection";
import EngagementSection from "../components/sections/EngagementSection";
import LogisticsSection from "../components/sections/LogisticsSection";
import ServicesSection from "../components/sections/ServicesSection";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Seo from "../components/ui/Seo";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Services", to: "/services" }];

const Services = () => (
  <>
    <Seo
      title="Services & Engagement Models"
      description="Supplier sourcing, commission agency, merchant export, quality coordination, export documentation and dispatch — and the two commercial arrangements a buyer can choose between."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Services"
      title="What you are actually buying when you buy through us"
      lead="A commission has to buy something specific. These are the services it covers, and the two commercial arrangements they can run under — agreed before the order rather than left implied."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Send your requirement</Button>
      <Button to="/how-we-work" variant="onDark" showIcon={false}>
        See the process
      </Button>
    </PageHero>

    <EngagementSection />

    <ServicesSection
      heading={{
        eyebrow: "The six services",
        title: "Sourcing is the start; the order still has to run.",
        lead: "Quality coordination, documentation and dispatch are part of the same engagement rather than extras bolted on once the price is agreed.",
      }}
    />

    <LogisticsSection />

    <CtaSection
      title="Not sure which arrangement fits?"
      body="Describe the order — how many suppliers, whether it repeats, and how your import process works today — and we will tell you which arrangement makes sense, including when neither does."
    />
  </>
);

export default Services;
