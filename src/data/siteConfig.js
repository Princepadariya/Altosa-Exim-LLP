/**
 * Site-wide configuration: SEO defaults, feature flags and the inquiry
 * form endpoint. Change behaviour here rather than inside components.
 */

export const siteConfig = {
  siteUrl: "https://altosaexim.com",
  titleTemplate: "%s | Altosa Exim LLP",
  defaultTitle: "Industrial Sourcing & Export Partner in India | Altosa Exim LLP",
  defaultDescription:
    "Altosa Exim LLP is a merchant exporter and commission agent in Rajkot, India, sourcing engineering, automotive and electrical components against buyer drawings and specifications.",
  locale: "en_IN",
  twitterHandle: "",
  /*
   * PNG, not the SVG that sits beside it: no major platform renders SVG for a
   * link preview — LinkedIn, WhatsApp, Facebook, X, Slack and iMessage all
   * ignore it and show a bare box. The SVG is kept as the source artwork the
   * PNG is rendered from.
   */
  ogImage: "/og-image.png",

  /** Toggle whole sections without deleting code. */
  features: {
    /**
     * Testimonials are OFF by default: `data/testimonials.js` ships with
     * clearly-marked placeholders only. Turn this on once real, attributable
     * buyer quotes with permission to publish are in that file.
     */
    testimonials: false,
    blog: false,
    stats: true,
    marquee: true,
  },

  /**
   * Inquiry form delivery. The form UI, validation and state handling are
   * complete; only the network call is left to you.
   *
   * Wire it in ONE of two ways:
   *   1. Set `endpoint` to a URL that accepts a JSON POST (Formspree,
   *      Web3Forms, your own API route). No other change needed.
   *   2. Leave `endpoint` null and pass your own `onSubmit(values)` to
   *      <InquiryForm />. It must return a promise; reject to show an error.
   *
   * With neither wired, the form validates and then falls back to opening a
   * prefilled email to `company.contact.email` so no inquiry is ever lost.
   */
  inquiryForm: {
    endpoint: null,
    method: "POST",
    /** Extra fields merged into every submission (e.g. an access key). */
    extraFields: {},
    successMessage:
      "Your requirement has been recorded. You will receive either a scoped quotation or an honest note that we are not the right route for this part.",
    errorMessage:
      "The request could not be sent. Please email exim@altosaeximllp.com with the same details, or try again in a moment.",
  },
};

export default siteConfig;
