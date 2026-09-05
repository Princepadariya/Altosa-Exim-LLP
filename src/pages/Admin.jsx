import { useCallback, useEffect, useMemo, useState } from "react";

import Seo from "../components/ui/Seo";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import styles from "./Admin.module.css";

/**
 * Inquiry inbox.
 *
 * Deliberately outside the marketing Layout: this is a tool, not a page of the
 * site, and the nav, footer and quote CTA belong to a buyer's journey rather
 * than to whoever is answering it.
 *
 * Every read here goes through row level security as a signed-in user. Nothing
 * on this page can reach data an anonymous visitor could not — the panel is a
 * convenience over the policies, never a way around them.
 */

const STATUSES = ["new", "reading", "quoted", "declined", "archived"];

/* The download link a signed URL produces is valid for this long. Short,
   because the URL grants access to a buyer's drawing to anyone holding it. */
const SIGNED_URL_SECONDS = 60;

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const countryName = (code) => {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
};

/* Column to label. Mirrors the form's own wording so a row reads the way the
   buyer filled it in. */
const FIELD_LABELS = {
  company: "Company",
  phone: "Phone",
  country: "Destination",
  industry: "Industry",
  product_description: "Requirement",
  drawing_reference: "Drawing reference",
  material: "Material",
  standard: "Standard",
  quantity: "Quantity",
  inquiry_type: "Inquiry type",
  documentation: "Records requested",
  port_of_discharge: "Port of discharge",
  incoterm: "Incoterm",
  timeline: "Timeline",
  target_date: "Target date",
  notes: "Notes",
  source_page: "Submitted from",
};

const SignIn = ({ onSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setBusy(false);
    if (signInError) setError(signInError.message);
    else onSignedIn();
  };

  return (
    <form className={styles.signIn} onSubmit={submit}>
      <h1 className={styles.signInTitle}>Inquiry inbox</h1>
      <p className={styles.signInHint}>
        Sign in with the Supabase account invited to this project.
      </p>

      <label className={styles.label} htmlFor="admin-email">
        Email
      </label>
      <input
        id="admin-email"
        className={styles.input}
        type="email"
        autoComplete="username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label className={styles.label} htmlFor="admin-password">
        Password
      </label>
      <input
        id="admin-password"
        className={styles.input}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button className={styles.primaryButton} type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};

const Detail = ({ inquiry, onChange }) => {
  const [status, setStatus] = useState(inquiry.status);
  const [note, setNote] = useState(inquiry.internal_note ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  /* No effect resets these when a different inquiry is selected: the caller
     keys this component on the row id, so picking another one mounts a fresh
     Detail whose state initialises from its own props. Resetting in an effect
     would render once with the previous row's status still in the select. */

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("inquiries")
      .update({ status, internal_note: note || null })
      .eq("id", inquiry.id);
    setSaving(false);

    if (!error) {
      setSaved(true);
      onChange({ ...inquiry, status, internal_note: note || null });
    }
  };

  const download = async () => {
    setDownloadError("");
    const { data, error } = await supabase.storage
      .from("inquiry-attachments")
      .createSignedUrl(inquiry.attachment_path, SIGNED_URL_SECONDS, {
        download: inquiry.attachment_name || true,
      });

    if (error || !data?.signedUrl) {
      setDownloadError(error?.message ?? "Could not create a download link.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const fields = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const value = inquiry[key];
      if (value === null || value === undefined || value === "") return null;
      if (Array.isArray(value)) {
        return value.length ? [label, value.join(", ")] : null;
      }
      if (key === "country") return [label, countryName(value)];
      return [label, String(value)];
    })
    .filter(Boolean);

  return (
    <div className={styles.detail}>
      <div className={styles.detailHead}>
        <div>
          <h2 className={styles.detailName}>{inquiry.full_name}</h2>
          <a className={styles.detailEmail} href={`mailto:${inquiry.email}`}>
            {inquiry.email}
          </a>
        </div>
        <span className={styles.detailDate}>{formatDate(inquiry.created_at)}</span>
      </div>

      <dl className={styles.fields}>
        {fields.map(([label, value]) => (
          <div className={styles.field} key={label}>
            <dt className={styles.fieldLabel}>{label}</dt>
            <dd className={styles.fieldValue}>{value}</dd>
          </div>
        ))}
      </dl>

      {inquiry.attachment_path && (
        <div className={styles.attachment}>
          <div>
            <p className={styles.attachmentName}>{inquiry.attachment_name}</p>
            <p className={styles.attachmentMeta}>
              {formatSize(inquiry.attachment_size)}
              {inquiry.attachment_type ? ` · ${inquiry.attachment_type}` : ""}
            </p>
          </div>
          <button className={styles.secondaryButton} type="button" onClick={download}>
            Download
          </button>
        </div>
      )}

      {downloadError && (
        <p className={styles.error} role="alert">
          {downloadError}
        </p>
      )}

      <div className={styles.triage}>
        <label className={styles.label} htmlFor="admin-status">
          Status
        </label>
        <select
          id="admin-status"
          className={styles.input}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label className={styles.label} htmlFor="admin-note">
          Internal note
        </label>
        <textarea
          id="admin-note"
          className={styles.textarea}
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Not shown to the buyer."
        />

        <button
          className={styles.primaryButton}
          type="button"
          onClick={save}
          disabled={saving}
        >
          {saving ? "Saving…" : saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

const Inbox = ({ onSignOut }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  /*
   * Fetching and applying are separate on purpose.
   *
   * The fetch touches no state, so the effect below contains no synchronous
   * setState — the updates happen in a callback after the request resolves,
   * which is what the effect is actually synchronising with. It also gives the
   * effect somewhere to stand down: a panel closed while a slow query is in
   * flight would otherwise set state on a component that no longer exists.
   */
  const fetchInquiries = useCallback(
    () =>
      supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
    [],
  );

  const apply = useCallback(({ data, error: loadError }) => {
    setLoading(false);
    if (loadError) setError(loadError.message);
    else {
      setInquiries(data ?? []);
      setError("");
    }
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchInquiries().then(apply);
  }, [fetchInquiries, apply]);

  useEffect(() => {
    let active = true;
    fetchInquiries().then((result) => {
      if (active) apply(result);
    });
    return () => {
      active = false;
    };
  }, [fetchInquiries, apply]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      if (filter !== "all" && inquiry.status !== filter) return false;
      if (!term) return true;
      return [inquiry.full_name, inquiry.company, inquiry.email, inquiry.product_description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [inquiries, filter, search]);

  const selected = visible.find((inquiry) => inquiry.id === selectedId) ?? null;

  const applyChange = (updated) =>
    setInquiries((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );

  return (
    <div className={styles.inbox}>
      <header className={styles.bar}>
        <div>
          <h1 className={styles.barTitle}>Inquiry inbox</h1>
          <p className={styles.barCount}>
            {loading ? "Loading…" : `${visible.length} of ${inquiries.length}`}
          </p>
        </div>

        <div className={styles.barActions}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search name, company, email…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search inquiries"
          />
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={refresh}
          >
            Refresh
          </button>
          <button className={styles.secondaryButton} type="button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.filters}>
        {["all", ...STATUSES].map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? styles.filterOn : styles.filter}
            onClick={() => setFilter(option)}
          >
            {option}
            {option !== "all" && (
              <span className={styles.filterCount}>
                {inquiries.filter((inquiry) => inquiry.status === option).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.split}>
        <ul className={styles.list}>
          {!loading && visible.length === 0 && (
            <li className={styles.empty}>
              {inquiries.length === 0
                ? "No inquiries yet. The first submission from the quote form will appear here."
                : "Nothing matches that filter."}
            </li>
          )}

          {visible.map((inquiry) => (
            <li key={inquiry.id}>
              <button
                type="button"
                className={
                  inquiry.id === selectedId ? styles.rowSelected : styles.row
                }
                onClick={() => setSelectedId(inquiry.id)}
              >
                <span className={styles.rowTop}>
                  <span className={styles.rowName}>
                    {inquiry.company || inquiry.full_name}
                  </span>
                  <span className={styles.rowStatus} data-status={inquiry.status}>
                    {inquiry.status}
                  </span>
                </span>
                <span className={styles.rowMeta}>
                  {countryName(inquiry.country) ?? "—"} ·{" "}
                  {formatDate(inquiry.created_at)}
                  {inquiry.attachment_path ? " · attachment" : ""}
                </span>
                <span className={styles.rowSummary}>
                  {inquiry.product_description || inquiry.email}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.pane}>
          {selected ? (
            /* Keyed on the row so selecting another inquiry mounts a fresh
               Detail, and its status and note initialise from that row. */
            <Detail key={selected.id} inquiry={selected} onChange={applyChange} />
          ) : (
            <p className={styles.empty}>Select an inquiry to read it.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [session, setSession] = useState(null);
  /* There is nothing to check when the project is not configured, so that is
     derived at initialisation rather than corrected by an effect afterwards. */
  const [checking, setChecking] = useState(() => Boolean(supabase));

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  return (
    <>
      {/* Never indexed, and never in the sitemap. */}
      <Seo title="Inquiry inbox" description="Internal." noIndex />

      <main className={styles.page}>
        {!isSupabaseConfigured ? (
          <div className={styles.signIn}>
            <h1 className={styles.signInTitle}>Not configured</h1>
            <p className={styles.signInHint}>
              Set <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> in the deployment environment,
              then redeploy. See <code>.env.example</code>.
            </p>
          </div>
        ) : checking ? (
          <p className={styles.empty}>Checking your session…</p>
        ) : session ? (
          <Inbox onSignOut={() => supabase.auth.signOut()} />
        ) : (
          <SignIn onSignedIn={() => {}} />
        )}
      </main>
    </>
  );
};

export default Admin;
