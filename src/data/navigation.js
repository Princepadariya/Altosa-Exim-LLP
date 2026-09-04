/** Primary navigation, footer columns and the global call to action. */

export const primaryNav = [
  { label: "Industries", to: "/industries" },
  { label: "Capabilities", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "How we work", to: "/how-we-work" },
  { label: "Quality", to: "/quality-and-compliance" },
  { label: "Markets", to: "/markets" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export const primaryCta = { label: "Request a quote", to: "/request-a-quote" };

export const footerNav = [
  {
    title: "Sourcing",
    links: [
      { label: "Industries we serve", to: "/industries" },
      { label: "Product capabilities", to: "/products" },
      { label: "Services & engagement", to: "/services" },
      { label: "Export markets", to: "/markets" },
      { label: "How we work", to: "/how-we-work" },
    ],
  },
  {
    title: "Buyer resources",
    links: [
      { label: "All buyer guides", to: "/resources" },
      { label: "What to include in an RFQ", to: "/resources/what-to-include-in-an-rfq" },
      { label: "Incoterms® 2020 explained", to: "/resources/incoterms-2020-explained" },
      { label: "Materials & standards", to: "/standards" },
      { label: "Trade glossary", to: "/glossary" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Altosa", to: "/about" },
      { label: "Quality & compliance", to: "/quality-and-compliance" },
      { label: "Buyer FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Request a quote", to: "/request-a-quote" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Data handling", to: "/data-handling" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

/**
 * Human-readable sitemap, grouped by what a visitor is trying to do rather
 * than by URL structure.
 *
 * `childrenFrom` marks a group whose sub-pages are generated from data — the
 * Sitemap page expands those from industries.js and resources.js, so the
 * listing cannot fall behind the content it describes.
 */
export const siteMap = [
  {
    title: "Start here",
    links: [
      { label: "Home", to: "/", note: "What Altosa is, and the two ways to buy" },
      {
        label: "Request a quote",
        to: "/request-a-quote",
        note: "The inquiry form — drawing, quantity, destination",
      },
      { label: "Contact", to: "/contact", note: "Email, WhatsApp and registered office" },
    ],
  },
  {
    title: "What we source",
    links: [
      {
        label: "Industries",
        to: "/industries",
        note: "The six sectors the supplier base covers most often",
        childrenFrom: "industries",
      },
      { label: "Product capabilities", to: "/products", note: "Processes, tolerances and lead times" },
      { label: "Services & engagement", to: "/services", note: "Merchant export or commission agency" },
    ],
  },
  {
    title: "How an order runs",
    links: [
      { label: "How we work", to: "/how-we-work", note: "The four decision points, inquiry to dispatch" },
      { label: "Quality & compliance", to: "/quality-and-compliance", note: "What you can verify, and where our role ends" },
      { label: "Export markets", to: "/markets", note: "Destinations and dispatch gateways" },
    ],
  },
  {
    title: "Buyer resources",
    links: [
      {
        label: "Buyer guides",
        to: "/resources",
        note: "Practical guides, useful whether or not you buy through us",
        childrenFrom: "resources",
      },
      { label: "Materials & standards", to: "/standards", note: "IS / ASTM / EN grades and Incoterms® 2020" },
      { label: "Trade glossary", to: "/glossary", note: "Plain definitions for terms in a quotation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Altosa", to: "/about", note: "Who we are, and what we are not" },
      { label: "Buyer FAQ", to: "/faq", note: "Straight answers before you commit time" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Data handling", to: "/data-handling", note: "What we do with what you send" },
      { label: "Terms", to: "/terms", note: "Terms of use and quotation basis" },
    ],
  },
];

export default primaryNav;
