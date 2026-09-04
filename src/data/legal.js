/**
 * Legal and policy copy.
 *
 * These are plain-language summaries of how the site handles information and
 * on what basis quotations are given. They are not legal advice, and they are
 * NOT a substitute for review by your own adviser before publishing — have a
 * qualified professional check them against Indian and destination-market
 * requirements, and adjust the specifics to your actual practice.
 */

export const legalPages = {
  "data-handling": {
    slug: "data-handling",
    eyebrow: "Data handling",
    title: "How your information is handled",
    lead: "What happens to the details you send through the inquiry form or by email, who can see them, and how long they are kept.",
    updated: "Reviewed September 2026",
    sections: [
      {
        heading: "What we collect",
        body: [
          "The inquiry form collects the details needed to review a sourcing requirement: your name, work email, company, optional phone number, the part or product description, material, quantity, destination, preferred trade terms, timing and any records you need with the order.",
          "Nothing else is collected automatically for marketing purposes. The site sets no advertising or tracking cookies.",
        ],
      },
      {
        heading: "What it is used for",
        body: [
          "Your details are used to prepare a response to your inquiry and to reply to you. Where a requirement needs a manufacturability or pricing assessment, the technical parts of it are shared with supply options only as far as is needed to assess and quote the part.",
          "Your information is not sold, published, or used for advertising.",
        ],
      },
      {
        heading: "Drawings and confidential documents",
        body: [
          "Please do not send confidential drawings or commercially sensitive documents until handling expectations have been agreed with us in writing. Where a non-disclosure agreement applies, tell us before sending the file rather than afterwards.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "Inquiry records are kept for as long as needed to respond to the inquiry and to maintain records of quotations issued. You can ask us to delete an inquiry record by writing to the email address on the contact page.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask what we hold about an inquiry, ask for it to be corrected, or ask for it to be deleted. Write to the email address on the contact page and identify the inquiry.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    eyebrow: "Terms",
    title: "Terms of use and quotation basis",
    lead: "The basis on which this website is published and on which any quotation from Altosa Exim LLP is given.",
    updated: "Reviewed September 2026",
    sections: [
      {
        heading: "Nature of this website",
        body: [
          "This website describes the sourcing and export coordination services of Altosa Exim LLP, a merchant exporter and commission agent. It is informational. Nothing on it is an offer capable of acceptance, and no contract arises from browsing it or from submitting an inquiry.",
          "Product families, sectors, processes and materials described here reflect the range our supplier base can address. They are not a claim of stock, of completed work in every sector, or of capability for any specific part until confirmed against your drawing or specification.",
        ],
      },
      {
        heading: "Quotations",
        body: [
          "A quotation states the scope it covers: product description against your drawing or specification, quantity and any applicable minimum order quantity, lead time from order confirmation, packing method, payment basis, and the applicable Incoterms® 2020 rule with the named place it refers to.",
          "Where the specification changes after quotation, the quotation is superseded rather than adjusted informally.",
        ],
      },
      {
        heading: "Incoterms",
        body: [
          "Incoterms® is a registered trademark of the International Chamber of Commerce. Incoterms® 2020 rules describe delivery terms only. They are not a substitute for a contract, quality agreement, payment terms, product compliance or legal advice.",
        ],
      },
      {
        heading: "Your counterparty",
        body: [
          "Whether you contract with Altosa Exim LLP as merchant exporter, or directly with the manufacturer with Altosa acting as commission agent, is agreed before the order and stated in the quotation.",
        ],
      },
      {
        heading: "Limits of our role",
        body: [
          "We coordinate sourcing, commercial terms and documentation. We do not act as a certifying body, a customs broker, or a legal adviser. Destination-market conformity remains a decision for the importer of record.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "Use of this website is governed by the laws of India, and the courts at Rajkot, Gujarat have jurisdiction, unless a signed order or contract between the parties states otherwise.",
        ],
      },
    ],
  },
};

export const getLegalPage = (slug) => legalPages[slug];

export default legalPages;
