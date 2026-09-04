/**
 * PLACEHOLDER CONTENT — NOT REAL CLIENT QUOTES.
 *
 * The testimonials section is disabled by default via
 * `siteConfig.features.testimonials = false`, so none of this is published.
 * Replace these entries with real, attributable quotes that you have written
 * permission to publish, then flip that flag to true.
 *
 * Publishing invented buyer quotes on a site whose whole argument is
 * "verifiable over claimed" would undercut the rest of the content, so the
 * section stays off until the quotes below are real.
 */

export const testimonials = [
  {
    id: "placeholder-1",
    isPlaceholder: true,
    quote:
      "Replace this with a real quote from a buyer who has agreed to be named or attributed.",
    author: "Buyer name",
    role: "Procurement Manager",
    company: "Company name",
    country: "Country",
  },
  {
    id: "placeholder-2",
    isPlaceholder: true,
    quote:
      "Replace this with a real quote from a buyer who has agreed to be named or attributed.",
    author: "Buyer name",
    role: "Head of Sourcing",
    company: "Company name",
    country: "Country",
  },
  {
    id: "placeholder-3",
    isPlaceholder: true,
    quote:
      "Replace this with a real quote from a buyer who has agreed to be named or attributed.",
    author: "Buyer name",
    role: "Technical Buyer",
    company: "Company name",
    country: "Country",
  },
];

/** Only quotes that are no longer placeholders are ever rendered. */
export const publishableTestimonials = testimonials.filter(
  (item) => !item.isPlaceholder,
);

export default testimonials;
