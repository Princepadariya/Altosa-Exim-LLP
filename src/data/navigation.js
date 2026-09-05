/** Primary navigation, footer columns and the global call to action. */

import industries from "./industries";
import resources from "./resources";

/**
 * Ordered by the sequence a buyer actually asks things in, not by importance.
 *
 * The first four are qualification — can you serve me at all? Sector, part,
 * commercial model, destination. Markets belongs here rather than after
 * Quality, where it used to sit: "do you ship to my country?" is a question
 * that disqualifies in one word, and a buyer who cannot get an answer to it
 * early has no reason to read the assurance pages at all.
 *
 * The next two are the case for us — how an order runs, and what can be
 * verified. Then reference material, then who we are. Anyone still reading by
 * About is already convinced.
 */
export const primaryNav = [
  { label: "Industries", to: "/industries" },
  { label: "Capabilities", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Markets", to: "/markets" },
  { label: "How we work", to: "/how-we-work" },
  { label: "Quality", to: "/quality-and-compliance" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export const primaryCta = { label: "Request a quote", to: "/request-a-quote" };

/**
 * Footer columns. Each one follows the order its equivalent uses in the header,
 * so a reader who has learned the nav does not have to re-learn the footer.
 *
 * Two pages moved out of Company, which had become the column for anything
 * that did not obviously belong elsewhere:
 *
 *  - Quality & compliance is not a page about the firm, it is a page about how
 *    an order is checked. It sits with the sourcing sequence, where both the
 *    header and the readable sitemap already put it.
 *  - Buyer FAQ was filed here while the header's Resources menu lists it as a
 *    resource. The same page cannot be in two taxonomies; the header's is the
 *    one a buyer meets first.
 *
 * That leaves Company as what the word means — who we are and how to reach us.
 * It and Legal are shorter than the first two columns. That is the honest
 * shape of the site: there is more to say about sourcing than about the firm,
 * and padding the column out with links that belong elsewhere is what caused
 * the mis-filing in the first place.
 */
export const footerNav = [
  {
    title: "Sourcing",
    links: [
      { label: "Industries we serve", to: "/industries" },
      { label: "Product capabilities", to: "/products" },
      { label: "Services & engagement", to: "/services" },
      { label: "Export markets", to: "/markets" },
      { label: "How we work", to: "/how-we-work" },
      { label: "Quality & compliance", to: "/quality-and-compliance" },
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
      { label: "Buyer FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Altosa", to: "/about" },
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
    ],
  },
  {
    /* "and where" earns its place in the title: the group holds the four
       qualifying questions in the order the header asks them, and destination
       is one of them. Export markets used to sit under "How an order runs",
       which read as process — a buyer checking whether their country is served
       is not yet thinking about how an order runs. */
    title: "What we source, and where",
    links: [
      {
        label: "Industries",
        to: "/industries",
        note: "The six sectors the supplier base covers most often",
        childrenFrom: "industries",
      },
      { label: "Product capabilities", to: "/products", note: "Processes, tolerances and lead times" },
      { label: "Services & engagement", to: "/services", note: "Merchant export or commission agency" },
      { label: "Export markets", to: "/markets", note: "Destinations and dispatch gateways" },
    ],
  },
  {
    title: "How an order runs",
    links: [
      { label: "How we work", to: "/how-we-work", note: "The four decision points, inquiry to dispatch" },
      { label: "Quality & compliance", to: "/quality-and-compliance", note: "What you can verify, and where our role ends" },
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
      /* Filed as a resource here, in the footer and in the header's Resources
         menu. It answers buyer questions, not questions about the firm. */
      { label: "Buyer FAQ", to: "/faq", note: "Straight answers before you commit time" },
    ],
  },
  {
    /* Contact moved up from "Start here" so this is not a group of one, and so
       Company means the same thing it means in the footer: who we are and how
       to reach us. Request a quote stays under "Start here" — it is the action
       the page exists to point at, not a fact about the company. */
    title: "Company",
    links: [
      { label: "About Altosa", to: "/about", note: "Who we are, and what we are not" },
      { label: "Contact", to: "/contact", note: "Email, WhatsApp and registered office" },
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

/**
 * Contents of the desktop dropdowns, keyed by the parent nav path.
 *
 * Only two top-level items carry one, and both for the same reason: they are
 * index pages in front of a set of real pages that had no other route in. The
 * six sector pages and the six buyer guides were reachable only by landing on
 * the index first and clicking through, which is a page of friction in front
 * of content a buyer often arrives already knowing they want.
 *
 * Built from the same data the pages themselves render, so a new sector or a
 * new guide appears in the nav without anyone remembering to add it.
 */
export const navMenus = {
  "/industries": {
    overview: "All industries",
    items: industries.map((industry) => ({
      label: industry.title,
      to: `/industries/${industry.id}`,
    })),
  },
  "/resources": {
    overview: "All buyer guides",
    items: [
      ...resources.map((resource) => ({
        label: resource.title,
        to: `/resources/${resource.slug}`,
      })),
      /* The three reference pages that live only in the footer otherwise. */
      { label: "Materials & standards", to: "/standards" },
      { label: "Trade glossary", to: "/glossary" },
      { label: "Buyer FAQ", to: "/faq" },
    ],
  },
};
