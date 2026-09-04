/** Buyer questions, answered without hedging — including where it depends. */

export const faqs = [
  {
    id: "manufacturer",
    question: "Is Altosa a manufacturer?",
    answer:
      "No. Altosa Exim LLP is a merchant exporter and commission agent. We do not own the plants that make your parts. Our role is to understand the requirement, identify suitable supply options and coordinate the commercial path from inquiry to dispatch.",
    category: "Role",
  },
  {
    id: "counterparty",
    question: "Am I buying from Altosa, or from the supplier?",
    answer:
      "Either, and it is agreed before the order. Under a merchant export arrangement you contract with Altosa and we are the exporter of record. Under a commission agency arrangement you contract directly with the manufacturer and we are paid a commission on the agreed order. Whichever applies is stated in the quotation, not left implied.",
    category: "Commercial",
  },
  {
    id: "drawings",
    question: "Can you work from drawings?",
    answer:
      "Yes — that is the normal starting point. Send the drawing or specification with the material or grade, applicable standard, quantity and destination. Where a drawing is unavailable, a sample part can be reverse-engineered into one, and that work is quoted separately before it begins.",
    category: "Technical",
  },
  {
    id: "moq",
    question: "What is the minimum order quantity?",
    answer:
      "It depends on the part and the process, so it is confirmed in the quotation rather than published here. Cold-forged fasteners carry a very different economic batch size to investment castings. Tell us the quantity you actually need and we will tell you whether it is viable.",
    category: "Commercial",
  },
  {
    id: "records",
    question: "Can you provide inspection or material records?",
    answer:
      "Often, but availability depends on the part, the process and the supplier, so it is confirmed in the quotation for that order rather than assumed. State the records you need in the request itself — material test certificates, dimensional reports, plating or coating thickness, hardness, or third-party inspection. Where you nominate an independent inspection agency, that scope is recorded in the order documentation before production, not agreed afterwards.",
    category: "Quality",
  },
  {
    id: "countries",
    question: "Do you supply every country?",
    answer:
      "No. Product eligibility, destination-market requirements, logistics and trade compliance are checked before an inquiry is accepted, and we say so when the answer is no. Destination-market conformity remains a decision for the importer of record.",
    category: "Markets",
  },
  {
    id: "certifications",
    question: "What certifications does Altosa hold?",
    answer:
      "Altosa Exim LLP is a registered Indian exporter (IEC) and a registered business for GST. Beyond those registrations we do not publish product or management-system certifications, because we hold none that we can evidence to a buyer — and a certificate that cannot be evidenced is worth nothing to your audit file. Where a supplier holds a relevant certification for your part, that is a fact about the supplier, and it is confirmed for the specific order.",
    category: "Quality",
  },
  {
    id: "response-time",
    question: "How quickly will I get a response?",
    answer:
      "Written inquiries are read in the order they arrive. A specific inquiry — drawing, material, quantity, destination — gets a specific answer. An inquiry missing those details gets a request for them first, which is why the request form asks for them up front.",
    category: "Process",
  },
  {
    id: "incoterms",
    question: "Which Incoterms do you work on?",
    answer:
      "The applicable Incoterms® 2020 rule and the named place it refers to are recorded in the quotation. Tell us your preferred rule in the inquiry if you have one. Incoterms® 2020 rules describe delivery terms only — they are not a substitute for a contract, quality agreement, payment terms, product compliance or legal advice.",
    category: "Commercial",
  },
  {
    id: "confidentiality",
    question: "How are my drawings handled?",
    answer:
      "Drawings are shared with supply options only as far as is needed to assess manufacturability and quote. Please do not send confidential drawings or commercially sensitive documents until handling expectations have been agreed with us in writing.",
    category: "Technical",
  },
];

export const faqCategories = [...new Set(faqs.map((item) => item.category))];

export default faqs;
