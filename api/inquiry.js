/**
 * Receives the buyer inquiry form and emails it to the sales inbox.
 *
 * Runs as a Vercel serverless function on the same origin as the site, which
 * is the whole reason for preferring it to a hosted form service: no API key
 * ships in the browser bundle, the buyer's drawing never touches a third
 * party, and the payload shape is ours to change.
 *
 * Written against the Web handler signature (Request in, Response out) rather
 * than Node's (req, res). That is what gives us `request.formData()`, and with
 * it multipart parsing — the attachment included — without pulling in a body
 * parser. Nodemailer below is the only dependency, and it is server-side only:
 * nothing here is bundled into the page.
 *
 * Delivery is plain SMTP with an app password, so no email service sits in the
 * path either — the inquiry goes from this function straight to the mailbox
 * that will answer it. The password is a server-side environment variable and
 * never reaches the browser.
 *
 * Configuration, all set in the Vercel dashboard and never in this repo:
 *   SMTP_HOST    e.g. smtp.gmail.com, smtp.zoho.in, mail.yourhost.com
 *   SMTP_PORT    465 for implicit TLS, 587 for STARTTLS
 *   SMTP_USER    the full mailbox address
 *   SMTP_PASS    an app password, never the account's own login password
 *   INQUIRY_TO   where inquiries land, e.g. exim@altosaeximllp.com
 *   INQUIRY_FROM optional display sender; defaults to SMTP_USER
 *
 * Most providers refuse to send as an address the session did not authenticate
 * as, so INQUIRY_FROM is a display name over SMTP_USER rather than a free
 * choice of address.
 */

import nodemailer from "nodemailer";

/*
 * A seam for the test suite, which exercises this handler end to end without
 * opening an SMTP conversation. Production never reassigns it.
 */
let createTransport = (options) => nodemailer.createTransport(options);
export const __setCreateTransport = (factory) => {
  createTransport = factory;
};

/*
 * Vercel caps a serverless request body at 4.5 MB, so the form's own ceiling
 * is set below that (MAX_ATTACHMENT_MB in src/data/inquiryFields.js). This is
 * the backstop for anything that gets past the browser.
 */
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

/*
 * Bots fill hidden inputs. The form drops them before they ever reach here, so
 * a request carrying one arrived by script rather than through the page.
 */
const HONEYPOT_FIELD = "website";

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/* Answered with 200 so a scripted submitter learns nothing from the response. */
const silentlyAccept = () => json({ ok: true }, 200);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * "portOfDischarge" becomes "Port of discharge".
 *
 * Derived rather than imported from the form schema: src/ uses extensionless
 * imports that Vite resolves and plain Node does not, so reaching across would
 * couple this function to the bundler's resolution rules. Deriving also means
 * a question added to the form still reaches the inbox, with a sane label,
 * without anyone remembering to update a map here.
 */
const labelFor = (key) => {
  const spaced = key
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

/** Read first, in this order; everything else follows as it arrived. */
const LEAD_FIELDS = [
  "fullName",
  "company",
  "email",
  "phone",
  "country",
  "industry",
  "productDescription",
];

const isEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());

const isBlank = (value) =>
  value === undefined ||
  value === null ||
  value === "" ||
  value === false ||
  (Array.isArray(value) && value.length === 0);

/**
 * Pulls the fields and the attachment out of either body format. The form
 * sends multipart when a file is attached and JSON when it is not.
 */
const readSubmission = async (request) => {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return { values: await request.json(), attachment: null };
  }

  const form = await request.formData();
  const values = {};
  let attachment = null;

  for (const [key, value] of form.entries()) {
    /*
     * A File is duck-typed rather than checked with instanceof: the global can
     * differ between the runtime's undici build and the one this code is
     * bundled against, and an instanceof miss would silently post the file
     * into the email body as "[object File]".
     */
    if (value && typeof value === "object" && typeof value.arrayBuffer === "function") {
      if (value.size > 0) attachment = value;
      continue;
    }
    values[key] = value;
  }

  return { values, attachment };
};

const buildEmail = (values) => {
  const seen = new Set();
  const ordered = [];

  for (const key of LEAD_FIELDS) {
    if (key in values) {
      ordered.push(key);
      seen.add(key);
    }
  }
  for (const key of Object.keys(values)) {
    if (!seen.has(key) && key !== HONEYPOT_FIELD) ordered.push(key);
  }

  const present = ordered.filter((key) => !isBlank(values[key]));
  const asText = (raw) => (Array.isArray(raw) ? raw.join(", ") : String(raw));

  const rows = present
    .map((key) => {
      const label = escapeHtml(labelFor(key));
      const value = escapeHtml(asText(values[key])).replaceAll("\n", "<br>");
      return (
        "<tr>" +
        `<td style="padding:6px 14px 6px 0;vertical-align:top;color:#585c66;white-space:nowrap;">${label}</td>` +
        `<td style="padding:6px 0;vertical-align:top;color:#14151a;">${value}</td>` +
        "</tr>"
      );
    })
    .join("");

  const plain = present
    .map((key) => `${labelFor(key)}: ${asText(values[key])}`)
    .join("\n");

  return {
    html:
      '<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;line-height:1.6;">' +
      '<p style="margin:0 0 16px;color:#585c66;">New inquiry from the Altosa Exim website.</p>' +
      `<table style="border-collapse:collapse;">${rows}</table>` +
      "</div>",
    text: `New inquiry from the Altosa Exim website.\n\n${plain}`,
  };
};

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 465);
  const to = process.env.INQUIRY_TO || user;
  const from = process.env.INQUIRY_FROM || user;

  if (!host || !user || !pass) {
    /*
     * A misconfigured deploy must not look like a delivered inquiry. Failing
     * here makes the form show its error, which tells the buyer to email the
     * same details instead — an inquiry that visibly failed is recoverable,
     * one that silently vanished is not.
     */
    console.error("Inquiry endpoint is missing SMTP_HOST, SMTP_USER or SMTP_PASS");
    return json({ ok: false, error: "Endpoint not configured" }, 500);
  }

  let values;
  let attachment;

  try {
    ({ values, attachment } = await readSubmission(request));
  } catch (error) {
    console.error("Could not read inquiry body", error);
    return json({ ok: false, error: "Malformed request" }, 400);
  }

  if (values[HONEYPOT_FIELD]) return silentlyAccept();

  if (!isEmail(values.email)) {
    return json({ ok: false, error: "A valid email address is required" }, 422);
  }

  /*
   * The form makes consent a required checkbox, but a POST can arrive without
   * ever having rendered the form. Consent is the stated basis for handling
   * the inquiry at all, so it is checked here too rather than trusted.
   */
  const consent = values.consent;
  if (consent !== true && consent !== "true" && consent !== "on") {
    return json({ ok: false, error: "Consent is required" }, 422);
  }

  if (attachment && attachment.size > MAX_ATTACHMENT_BYTES) {
    return json({ ok: false, error: "Attachment is too large" }, 413);
  }

  const { html, text } = buildEmail(values);
  const who = values.company || values.fullName || values.email;

  const message = {
    from,
    to,
    /*
     * So hitting reply in the inbox answers the buyer rather than the mailbox
     * the site sends from.
     */
    replyTo: values.email,
    subject: `RFQ — ${who}`,
    html,
    text,
  };

  if (attachment) {
    message.attachments = [
      {
        filename: attachment.name || "attachment",
        content: Buffer.from(await attachment.arrayBuffer()),
      },
    ];
  }

  try {
    const transport = createTransport({
      host,
      port,
      /* 465 is implicit TLS from the first byte; 587 opens plain and upgrades
         with STARTTLS, which nodemailer does on its own when secure is false. */
      secure: port === 465,
      auth: { user, pass },
      /* A serverless invocation sends one message and dies, so there is no
         connection worth pooling — and a socket left open past the response
         is what makes a function hang until it times out. */
      pool: false,
    });

    await transport.sendMail(message);
    transport.close();
  } catch (error) {
    console.error("Inquiry email failed", error);
    return json({ ok: false, error: "Could not send the inquiry" }, 502);
  }

  return json({ ok: true }, 200);
}
