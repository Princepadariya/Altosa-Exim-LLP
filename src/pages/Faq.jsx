import CtaSection from "../components/sections/CtaSection";
import FaqSection from "../components/sections/FaqSection";
import faqs from "../data/faqs";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Seo from "../components/ui/Seo";
import { breadcrumbSchema, faqSchema } from "../utils/seo";

const crumbs = [{ label: "FAQ", to: "/faq" }];

const Faq = () => (
  <>
    <Seo
      title="Buyer FAQ — Sourcing from India"
      description="Is Altosa a manufacturer? Who is your counterparty? What is the minimum order quantity? The questions careful buyers ask first, answered without hedging."
      schema={[faqSchema(faqs), breadcrumbSchema(crumbs)]}
    />

    <PageHero
      eyebrow="Buyer FAQ"
      title="Questions buyers ask before committing time"
      lead="The questions a careful buyer asks first, answered without hedging — including the ones where the honest answer is that it depends on the order."
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Send your requirement</Button>
      <Button to="/contact" variant="onDark" showIcon={false}>
        Ask something else
      </Button>
    </PageHero>

    <FaqSection
      tone="light"
      showCta={false}
      heading={{
        eyebrow: "Every question",
        title: "Straight answers before you commit time.",
        lead: "If your question is not here, send it. An answer that starts with \"it depends\" will say what it depends on.",
      }}
    />

    <CtaSection />
  </>
);

export default Faq;
