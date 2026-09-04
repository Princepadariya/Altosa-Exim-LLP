/**
 * Core company identity, contact details and legal/registration facts.
 * Everything user-facing about "who Altosa is" starts here.
 */

export const company = {
  name: "Altosa Exim",
  legalName: "Altosa Exim LLP",
  shortName: "Altosa",
  role: "Merchant Exporter & Commission Agent",
  tagline: "Reliable industrial sourcing. Ready for global requirements.",
  description:
    "Altosa Exim LLP connects international buyers with capable Indian suppliers across engineering, automotive and electrical supply chains — sourced against your drawings, specifications and commercial needs.",

  founded: 2018,
  entityType: "Limited Liability Partnership (LLP)",

  address: {
    city: "Rajkot",
    state: "Gujarat",
    country: "India",
    full: "Rajkot, Gujarat, India",
  },

  contact: {
    email: "exim@altosaeximllp.com",
    whatsapp: "https://wa.me/919999999999",
    whatsappLabel: "Message us on WhatsApp",
  },

  timezone: {
    label: "India Standard Time (UTC+5:30)",
    note: "Written inquiries are read in the order they arrive and do not depend on catching us inside your working hours.",
  },

  /** Registrations we can actually evidence to a buyer. */
  registrations: [
    {
      code: "IEC",
      label: "Importer-Exporter Code",
      note: "Registered Indian exporter. Details shared during a qualified commercial discussion.",
    },
    {
      code: "GST",
      label: "Goods & Services Tax",
      note: "Registered Indian business. Details shared during a qualified commercial discussion.",
    },
    {
      code: "LLP",
      label: "Limited Liability Partnership",
      note: "Registered with the Ministry of Corporate Affairs, India.",
    },
  ],

  vision:
    "To be the sourcing partner international buyers trust when a specification matters more than a catalogue.",
  mission:
    "To connect global buyers with capable Indian manufacturers through specification-first sourcing, transparent commercial terms and coordinated export execution.",

  values: [
    {
      title: "Role clarity",
      body: "We are a merchant exporter and commission agent. We do not own the plants that make your parts, and we never imply otherwise.",
    },
    {
      title: "Specification first",
      body: "Fit, material, standard, tolerances and documentation are settled before a number is quoted — because a price sent before the questions is a price that changes later.",
    },
    {
      title: "Verifiable over claimed",
      body: "We publish registrations we can evidence and decline to display certifications we do not hold. A certificate that cannot be evidenced is worth nothing to your audit file.",
    },
    {
      title: "Honest no",
      body: "Product eligibility, destination requirements and export feasibility are checked before an inquiry is accepted — and we say so when the answer is no.",
    },
  ],
};

export default company;
