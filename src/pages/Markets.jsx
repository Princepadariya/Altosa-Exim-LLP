import CtaSection from "../components/sections/CtaSection";
import MarketsSection from "../components/sections/MarketsSection";
import { gateways, totalCountries } from "../data/markets";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import styles from "./Markets.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Markets", to: "/markets" }];

const Markets = () => (
  <>
    <Seo
      title="Export Markets & Shipping Gateways"
      description="Destination markets across the Middle East, Europe, North America, Africa and Asia Pacific, and the Gujarat ports and airports used for dispatch."
      schema={breadcrumbSchema(crumbs)}
    />

    <PageHero
      eyebrow="Export markets"
      title="Where the parts go, and how they get there"
      lead={`Destinations are discussed across ${totalCountries}+ markets. Which of them applies to your order depends on the product, the destination requirements and the export feasibility for that specific part.`}
      crumbs={crumbs}
    >
      <Button to="/request-a-quote">Tell us your destination</Button>
    </PageHero>

    <MarketsSection
      tone="light"
      showCta={false}
      heading={{
        eyebrow: "Regions",
        title: "Markets grouped by the way they actually differ.",
        lead: "Freight routes, documentation expectations and conformity requirements vary by region — which is why the destination is captured at the inquiry stage rather than after a price is agreed.",
      }}
    />

    <Section tone="dark" grid>
      <SectionHeading
        eyebrow="Gateways"
        title="Dispatched from Gujarat's ports and airports."
        lead="Gujarat's container gateways sit within reach of the Rajkot supplier base, which keeps inland haulage short and consolidation straightforward."
        onDark
      />

      <div className={styles.gateways}>
        {gateways.map((gateway, index) => (
          <article
            key={gateway.name}
            className={styles.gateway}
            data-reveal
            style={{ "--reveal-delay": `${index * 70}ms` }}
          >
            <span className={styles.gatewayType}>{gateway.type}</span>
            <h3 className={styles.gatewayName}>{gateway.name}</h3>
            <p className={styles.gatewayNote}>{gateway.note}</p>
          </article>
        ))}
      </div>
    </Section>

    <CtaSection
      title="Destination decides more than freight."
      body="Standards, marking, inspection regimes and documentation all follow from where the parts are going. Tell us the destination in the first message and the answer comes back specific."
    />
  </>
);

export default Markets;
