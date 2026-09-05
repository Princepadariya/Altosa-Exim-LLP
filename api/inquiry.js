/**
 * Receives the buyer inquiry form and emails it to the sales inbox.
 *
 * Runs as a Vercel serverless function on the same origin as the site, which
 * is the whole reason for preferring it to a hosted form service: no API key
 * ships in the browser bundle, the buyer's drawing never touches a third
 * party, and the payload shape is ours to change.
 *
 * Written against Node's (req, res) signature.
 *
 * It was first written against the Web signature — `(Request) => Response` —
 * because that brings `request.formData()` and with it multipart parsing for
 * free. This deployment does not honour it: the function was invoked, returned
 * a Response object nobody read, and never wrote to `res`. Every call hung
 * until the platform gave up, which a GET measured as a 504 after the full
 * 300-second maximum duration. Nothing in the logs, because nothing failed —
 * the function simply never finished. The Node signature is the one this
 * runtime actually calls, so it is the one to write against.
 *
 * Multipart is still parsed without a body parser: the raw bytes are handed to
 * `new Response(buffer, ...).formData()`, the same undici implementation the
 * Web signature would have used, just reached deliberately. Nodemailer is the
 * only dependency and is server-side: nothing here is bundled into the page.
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

import {
  ATTACHMENT_BUCKET,
  attachmentPath,
  getServiceClient,
  toRow,
} from "./_supabase.js";

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
 * The raw request body as a Buffer.
 *
 * Vercel parses JSON and urlencoded bodies onto `req.body` before we are
 * called, and leaves anything else — multipart included — as a Buffer or as an
 * unread stream, depending on the runtime version. All three are handled here
 * rather than assuming one, because guessing wrong reads an empty body and
 * loses the buyer's attachment silently.
 */
const rawBody = async (req) => {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return Buffer.from(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
};

/**
 * Pulls the fields and the attachment out of either body format. The form
 * sends multipart when a file is attached and JSON when it is not.
 */
const readSubmission = async (req) => {
  const contentType = req.headers["content-type"] || "";

  if (!contentType.includes("multipart/form-data")) {
    if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
      return { values: req.body, attachment: null };
    }
    return { values: JSON.parse((await rawBody(req)).toString("utf8")), attachment: null };
  }

  /*
   * Undici parses multipart for us given the bytes and the boundary, which the
   * content-type header carries. This is the same parser the Web signature
   * would have used behind `request.formData()`.
   */
  const form = await new Response(await rawBody(req), {
    headers: { "content-type": contentType },
  }).formData();

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

/**
 * Writes the inquiry to Supabase: the file into the storage bucket, the row
 * into the table with the path to it.
 *
 * Every failure is caught and reported rather than thrown. The caller treats
 * storage as best-effort, because the email is what actually reaches a person.
 * Returns a small result so the response can say what happened.
 */
const storeInquiry = async (values, attachment, bytes, req) => {
  const supabase = getServiceClient();
  if (!supabase) return { stored: false, reason: "not configured" };

  try {
    const row = toRow(values, {
      sourcePage: values.sourcePage ?? req.headers.referer ?? null,
    });

    if (attachment && bytes) {
      const path = attachmentPath(attachment.name || "attachment");
      const { error } = await supabase.storage
        .from(ATTACHMENT_BUCKET)
        .upload(path, bytes, {
          contentType: attachment.type || "application/octet-stream",
          upsert: false,
        });

      if (error) {
        /* Losing the drawing must not lose the inquiry. Record the row without
           it — the file is still attached to the email that goes out next. */
        console.error("Attachment upload failed", error.message);
      } else {
        row.attachment_path = path;
        row.attachment_name = attachment.name || "attachment";
        row.attachment_size = attachment.size;
        row.attachment_type = attachment.type || null;
      }
    }

    const { data, error } = await supabase
      .from("inquiries")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("Inquiry insert failed", error.message);
      return { stored: false, reason: error.message };
    }

    return { stored: true, id: data?.id ?? null };
  } catch (error) {
    console.error("Inquiry storage failed", error);
    return { stored: false, reason: "exception" };
  }
};

export default async function handler(req, res) {
  const send = (status, payload) => {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
  };

  if (req.method !== "POST") return send(405, { ok: false, error: "Method not allowed" });

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
    return send(500, { ok: false, error: "Endpoint not configured" });
  }

  let values;
  let attachment;

  try {
    ({ values, attachment } = await readSubmission(req));
  } catch (error) {
    console.error("Could not read inquiry body", error);
    return send(400, { ok: false, error: "Malformed request" });
  }

  /* Answered 200 so a scripted submitter learns nothing from the response. */
  if (values[HONEYPOT_FIELD]) return send(200, { ok: true });

  if (!isEmail(values.email)) {
    return send(422, { ok: false, error: "A valid email address is required" });
  }

  /*
   * The form makes consent a required checkbox, but a POST can arrive without
   * ever having rendered the form. Consent is the stated basis for handling
   * the inquiry at all, so it is checked here too rather than trusted.
   */
  const consent = values.consent;
  if (consent !== true && consent !== "true" && consent !== "on") {
    return send(422, { ok: false, error: "Consent is required" });
  }

  if (attachment && attachment.size > MAX_ATTACHMENT_BYTES) {
    return send(413, { ok: false, error: "Attachment is too large" });
  }

  /*
   * Store before sending, so the record exists even if the mailbox is
   * unreachable — but never let storing cost us the email. Supabase being
   * down, misconfigured or absent is logged and stepped over: an inquiry that
   * reached a human is not lost, one that reached neither is.
   */
  const attachmentBytes = attachment
    ? Buffer.from(await attachment.arrayBuffer())
    : null;

  const stored = await storeInquiry(values, attachment, attachmentBytes, req);

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

  if (attachment && attachmentBytes) {
    /* Reuses the bytes already read for storage rather than draining the file
       a second time. */
    message.attachments = [
      { filename: attachment.name || "attachment", content: attachmentBytes },
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

    /*
     * A failed send is only a failed inquiry if nothing else caught it. When
     * the row is already in Supabase the requirement is recorded and can be
     * answered from the admin panel, so telling the buyer it failed would
     * invite a duplicate submission of something we already hold. Reported as
     * success to them, and loudly in the logs, because a silent reliance on
     * someone opening the panel is the part that needs noticing.
     */
    if (stored.stored) {
      console.error(
        `Inquiry ${stored.id} was stored but not emailed — it will not be seen until someone opens the admin panel`,
      );
      return send(200, { ok: true, delivered: "stored" });
    }

    return send(502, { ok: false, error: "Could not send the inquiry" });
  }

  return send(200, { ok: true, delivered: stored.stored ? "stored+email" : "email" });
}
