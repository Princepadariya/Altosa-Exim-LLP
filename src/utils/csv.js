/**
 * CSV for the inquiry export.
 *
 * Lives here rather than beside the admin page because a module that exports
 * both a component and a helper opts out of React Fast Refresh for the whole
 * file — and because a text-encoding rule with a security edge to it deserves
 * to be testable on its own.
 */

/** Column order for the export. Explicit, so the file is stable between runs. */
export const CSV_COLUMNS = [
  "created_at",
  "status",
  "full_name",
  "company",
  "email",
  "phone",
  "country",
  "industry",
  "product_description",
  "drawing_reference",
  "material",
  "standard",
  "quantity",
  "inquiry_type",
  "documentation",
  "port_of_discharge",
  "incoterm",
  "timeline",
  "target_date",
  "notes",
  "attachment_name",
  "internal_note",
];

/**
 * Quotes one value for a CSV cell.
 *
 * The leading-apostrophe guard is not cosmetic. A cell beginning =, +, - or @
 * is treated as a formula by Excel, Numbers and Sheets, so text a stranger
 * typed into a public form becomes something the spreadsheet executes when
 * someone here opens the export. Everything is quoted and embedded quotes are
 * doubled, per RFC 4180.
 */
export const csvCell = (value) => {
  if (value === null || value === undefined) return '""';

  const text = Array.isArray(value) ? value.join("; ") : String(value);
  const guarded = /^[=+\-@]/.test(text) ? `'${text}` : text;

  return `"${guarded.replaceAll('"', '""')}"`;
};

/** Rows to an RFC 4180 document, CRLF terminated as the spec requires. */
export const toCsv = (rows, columns = CSV_COLUMNS) =>
  [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ].join("\r\n");

export default toCsv;
