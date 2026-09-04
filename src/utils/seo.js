/** Helpers for page metadata and JSON-LD structured data. */

import company from "../data/company";
import siteConfig from "../data/siteConfig";

export const buildTitle = (title) =>
  title ? siteConfig.titleTemplate.replace("%s", title) : siteConfig.defaultTitle;

export const canonicalFor = (pathname) => {
  const clean = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") + "/";
  return `${siteConfig.siteUrl}${clean}`;
};

/** Organization schema — the entity a buyer is checking before they engage. */
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.name,
  url: siteConfig.siteUrl,
  description: company.description,
  email: company.contact.email,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    addressCountry: "IN",
  },
  knowsAbout: [
    "Merchant export",
    "Commission agency",
    "Industrial sourcing",
    "Engineering components",
  ],
});

export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.label,
    item: `${siteConfig.siteUrl}${crumb.to}`,
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});
