/**
 * An annotated specimen quotation.
 *
 * The site argues in several places that a quotation states the scope it
 * covers — `quotationScope` in data/process.js even enumerates the six fields.
 * Until this existed, that claim was asserted and never shown, which is a weak
 * position for a page whose whole argument is that scope is settled before a
 * number is sent.
 *
 * Every line below maps 1:1 to an entry in `quotationScope`, in the same order,
 * so the specimen cannot drift from the list it illustrates. The `value` fields
 * are ILLUSTRATIVE — a plausible part, not a real order and not an offer. The
 * `note` on each line is the part that carries the argument: why the field is
 * on the document at all.
 */

export const specimenMeta = {
  documentTitle: "Quotation",
  /** Deliberately not a plausible reference — nobody should be able to quote it back. */
  reference: "ALT-Q-SPECIMEN",
  issued: "Illustrative",
  validity: "Quotations state their own validity period",
};

export const specimenBanner =
  "Specimen document. The figures below are illustrative and are not an offer — a quotation for your part carries these same fields with your values in them.";

export const specimenLines = [
  {
    id: "product",
    field: "Product description",
    value:
      "Closed-die forged yoke, 42CrMo4 to EN 10083-3, machined complete to your drawing rev. B",
    note: "Named against your drawing and its revision rather than by a generic part name. Where the specification changes afterwards the quotation is superseded, not adjusted informally — which is only possible if the revision was written down in the first place.",
  },
  {
    id: "quantity",
    field: "Quantity and minimum order quantity",
    value: "2,000 pcs · MOQ 500 pcs for this process",
    note: "The MOQ is the batch size at which this process stays economic at a specific supplier, not a policy applied across the board. It is stated so you can see whether your real quantity sits above or below it.",
  },
  {
    id: "lead-time",
    field: "Lead time from order confirmation",
    value: "8–10 weeks from order confirmation, including tooling",
    note: "Measured from confirmation, and it means readiness for dispatch — not arrival. Sea transit is separate and depends on the destination and whether the consignment is FCL or consolidated.",
  },
  {
    id: "packing",
    field: "Packing method",
    value: "Seaworthy export cases, ISPM-15 heat-treated timber, case marking per your instruction",
    note: "\u201CExport packing\u201D means different things to different suppliers. Stating the method — and that the timber meets ISPM-15, which destination customs will check — removes an argument that otherwise happens at the port.",
  },
  {
    id: "payment",
    field: "Payment basis",
    value: "Advance against order confirmation, balance against shipping documents",
    note: "Written into the quotation rather than raised after a price is agreed. Under a commission agency arrangement this line instead describes the terms you have agreed directly with the manufacturer.",
  },
  {
    id: "incoterms",
    field: "Incoterms\u00AE 2020 rule and named place",
    value: "FOB Mundra (Incoterms\u00AE 2020)",
    note: "The rule is incomplete without the named place it refers to — \u201CFOB\u201D alone does not say where risk transfers. Incoterms\u00AE 2020 rules describe delivery terms only; they are not a contract, a quality agreement or payment terms.",
  },
];

export const specimenFootnote =
  "A quotation also states which arrangement applies — whether you are contracting with Altosa Exim LLP as merchant exporter, or directly with the manufacturer with Altosa acting as commission agent — so the counterparty is never left implied.";

export default specimenLines;
