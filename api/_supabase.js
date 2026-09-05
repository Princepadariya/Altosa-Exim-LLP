/**
 * Server-side Supabase access for the inquiry endpoint.
 *
 * Filename starts with an underscore so Vercel treats it as a shared module
 * rather than publishing it as its own route at /api/_supabase.
 *
 * This module uses the SERVICE ROLE key, which bypasses row level security
 * completely. It must never be imported by anything under src/ — that code is
 * bundled and shipped to the browser, and the key would go with it. The site's
 * own Supabase access uses the anon key and is subject to RLS.
 */

import { createClient } from "@supabase/supabase-js";

export const ATTACHMENT_BUCKET = "inquiry-attachments";

/*
 * A seam for the test suite, which exercises the mapping and the failure paths
 * without a live project. Production never reassigns it.
 */
let clientFactory = (url, key) =>
  createClient(url, key, { auth: { persistSession: false } });

export const __setClientFactory = (factory) => {
  clientFactory = factory;
};

/**
 * Returns a client, or null when the project is not configured.
 *
 * Null rather than throwing: storing the inquiry is valuable but not the only
 * thing the endpoint does. If Supabase is unreachable or unconfigured the
 * email must still go out, because an inquiry that reached a human is not lost
 * — one that reached neither is.
 */
export const getServiceClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return clientFactory(url, key);
};

/** Multi-selects arrive as an array over JSON and as a joined string over multipart. */
const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((part) => part.trim()).filter(Boolean);
  }
  return [];
};

const trimmed = (value) =>
  typeof value === "string" && value.trim() ? value.trim() : null;

/**
 * Maps the form's camelCase field names onto the table's snake_case columns.
 *
 * Explicit rather than derived from the field schema: the column list is a
 * database contract, and a question renamed in the form should fail loudly
 * here rather than silently start writing to a column nobody created.
 */
export const toRow = (values, { sourcePage = null } = {}) => ({
  full_name: trimmed(values.fullName) ?? "",
  email: trimmed(values.email) ?? "",
  company: trimmed(values.company),
  phone: trimmed(values.phone),
  country: trimmed(values.country),

  industry: trimmed(values.industry),
  product_description: trimmed(values.productDescription),
  drawing_reference: trimmed(values.drawingReference),
  material: trimmed(values.material),
  standard: trimmed(values.standard),
  quantity: trimmed(values.quantity),
  inquiry_type: trimmed(values.inquiryType),
  documentation: asArray(values.documentation),

  port_of_discharge: trimmed(values.portOfDischarge),
  incoterm: trimmed(values.incoterm),
  timeline: trimmed(values.timeline),
  target_date: trimmed(values.targetDate),
  notes: trimmed(values.notes),

  consent: values.consent === true || values.consent === "true" || values.consent === "on",
  source_page: sourcePage,
});

/**
 * Builds the object path for an attachment.
 *
 * Dated folders so the bucket stays browsable as it grows, and a random id so
 * two buyers sending "drawing.pdf" on the same day cannot collide. The
 * original filename is kept in the row, not in the path, which means a name
 * carrying odd characters or another buyer's company name never has to be
 * made safe for a URL.
 */
export const attachmentPath = (filename, now = new Date()) => {
  const stamp = now.toISOString().slice(0, 7); // YYYY-MM
  const extension = (filename.match(/\.[a-z0-9]{1,8}$/i)?.[0] ?? "").toLowerCase();
  const id = globalThis.crypto?.randomUUID?.() ?? String(Date.now());
  return `${stamp}/${id}${extension}`;
};
