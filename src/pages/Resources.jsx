import { useMemo, useState } from "react";

import ArticleCard from "../components/cards/ArticleCard";
import CtaSection from "../components/sections/CtaSection";
import resources, {
  getResourcesByCategory,
  resourceCategories,
} from "../data/resources";
import cn from "../utils/cn";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Seo from "../components/ui/Seo";
import grid from "../components/ui/Grid.module.css";
import filters from "../components/sections/ProductsSection.module.css";
import { breadcrumbSchema } from "../utils/seo";

const crumbs = [{ label: "Resources", to: "/resources" }];

const countFor = (categoryId) => getResourcesByCategory(categoryId).length;

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const visible = useMemo(
    () => getResourcesByCategory(activeCategory),
    [activeCategory],
  );

  return (
    <>
      <Seo
        title="Buyer Resources & Sourcing Guides"
        description="Practical guides for buyers importing engineering components from India: writing an RFQ, Incoterms 2020, export documents, and reading a material test certificate."
        schema={breadcrumbSchema(crumbs)}
      />

      <PageHero
        eyebrow="Buyer resources"
        title="The parts of importing nobody explains up front"
        lead="Written to be useful whether or not you buy through us. If a guide saves you from a bad RFQ with a different supplier, it has done its job."
        crumbs={crumbs}
      >
        <Button to="/request-a-quote">Send your requirement</Button>
      </PageHero>

      <Section tone="light">
        <SectionHeading
          eyebrow="Guides"
          title="Sourcing, commercial terms, quality and shipping."
          lead="General trade and engineering practice, not a sales pitch. Where something depends on the order, the guide says what it depends on."
        />

        <div className={filters.filters} role="group" aria-label="Filter guides">
          {resourceCategories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                className={cn(filters.filter, isActive && filters.filterActive)}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                <span className={filters.count}>{countFor(category.id)}</span>
              </button>
            );
          })}
        </div>

        <div className={filters.results}>
          <p className={filters.resultCount} aria-live="polite">
            Showing {visible.length} of {resources.length} guides
          </p>

          <div className={`${grid.grid} ${grid.cols3}`}>
            {visible.map((resource, index) => (
              <ArticleCard
                key={`${activeCategory}-${resource.slug}`}
                resource={resource}
                index={index}
              />
            ))}
          </div>
        </div>
      </Section>

      <CtaSection
        title="Still faster to just ask."
        body="If a guide does not cover your situation, send the requirement itself. A specific question gets a specific answer, and we will say so when the honest answer is that it depends."
      />
    </>
  );
};

export default Resources;
