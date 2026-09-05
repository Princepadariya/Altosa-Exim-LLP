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
   * Inquiry form delivery.
   *
   * Posts to our own serverless function at api/inquiry.js, which emails the
   * inquiry to the sales inbox. The path is relative on purpose: the function
   * is served from this same origin, so there is no cross-origin request, no
   * third-party form service, and — the part that matters — no API key in the
   * browser bundle. The credentials live only in the Vercel environment.
   *
   * That function sends over plain SMTP with an app password, so no email
   * service sits in the path either. It needs SMTP_HOST, SMTP_USER and
   * SMTP_PASS set in the deployment; see .env.example. Without them it returns
   * 500 rather than pretending to have sent anything.
   *
   * Two other routes remain wired for local work or a change of provider:
   *   - pass your own `onSubmit(values)` to <InquiryForm />; it takes priority
   *   - set `endpoint` to null to fall back to a prefilled mailto, so an
   *     inquiry is never dropped on the floor
   */
  inquiryForm: {
    endpoint: "/api/inquiry",
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
