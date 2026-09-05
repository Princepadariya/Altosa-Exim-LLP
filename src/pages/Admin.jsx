import { useCallback, useEffect, useMemo, useState } from "react";

import Seo from "../components/ui/Seo";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { toCsv } from "../utils/csv";
import styles from "./Admin.module.css";

/**
 * Inquiry inbox.
 *
 * Deliberately outside the marketing Layout: this is a tool, not a page of the
 * site, and the nav, footer and quote CTA belong to a buyer's journey rather
 * than to whoever is answering it.
 *
 * Filtering, counting, sorting and paging all happen in Postgres rather than in
 * the browser. At a hundred rows either approach would do; the difference is
 * that this one still works at ten thousand, and the query costs the same
 * either way. The browser never holds more than one page.
 *
 * Every read goes through row level security as a signed-in user. Nothing here
 * can reach data an anonymous visitor could not — the panel is a convenience
 * over the policies, never a way around them.
 */

const STATUSES = ["new", "reading", "quoted", "declined", "archived"];
const PAGE_SIZE = 25;

/* Short, because the URL it produces grants anyone holding it access to a
   buyer's drawing. */
const SIGNED_URL_SECONDS = 60;

const DATE_PRESETS = [
  { id: "any", label: "Any time", days: null },
  { id: "1", label: "Today", days: 1 },
  { id: "7", label: "Last 7 days", days: 7 },
  { id: "30", label: "Last 30 days", days: 30 },
  { id: "90", label: "Last 90 days", days: 90 },
];

const EMPTY_FILTERS = {
  status: "all",
  preset: "any",
  from: "",
  to: "",
  country: "",
  attachment: "any",
  search: "",
  sort: "newest",
  page: 0,
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

const formatDateTime = (value) =>
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

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

const countryName = (code) => {
  if (!code) return null;
  try {
    return regionNames?.of(code) ?? code;
  } catch {
    return code;
  }
};

/* Column to label, mirroring the form's wording so a row reads the way the
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

/**
 * PostgREST reads `or=(a.ilike.%x%,b.ilike.%x%)` as structure, so a comma or a
 * bracket typed into the search box is parsed as filter syntax rather than as
 * text — a search for "Alvarez, S.L." becomes a malformed query and a
 * confusing error. Stripped rather than escaped: none of these characters
 * distinguishes one buyer from another.
 */
const safeSearchTerm = (term) => term.replace(/[,()*\\]/g, " ").trim();

/** Local midnight as an instant, so "today" means the operator's today. */
const startOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

/** Resolves the preset or the custom range into an inclusive-exclusive pair. */
const dateRange = ({ preset, from, to }) => {
  if (from || to) {
    return {
      gte: from ? startOfDay(new Date(`${from}T00:00:00`)).toISOString() : null,
      /* Exclusive upper bound a day on, so a "to" of the 5th covers everything
         submitted during the 5th rather than only 00:00 exactly. */
      lt: to
        ? new Date(startOfDay(new Date(`${to}T00:00:00`)).getTime() + 86400000).toISOString()
        : null,
    };
  }

  const days = DATE_PRESETS.find((option) => option.id === preset)?.days;
  if (!days) return { gte: null, lt: null };

  const start = startOfDay(new Date());
  start.setDate(start.getDate() - (days - 1));
  return { gte: start.toISOString(), lt: null };
};

/**
 * Applies every active filter to a query. Shared by the list, the status
 * tallies and the export, so the three can never disagree about what is being
 * looked at.
 */
const applyFilters = (query, filters) => {
  let next = query;

  if (filters.status !== "all") next = next.eq("status", filters.status);
  if (filters.country) next = next.eq("country", filters.country);

  if (filters.attachment === "yes") next = next.not("attachment_path", "is", null);
  if (filters.attachment === "no") next = next.is("attachment_path", null);

  const { gte, lt } = dateRange(filters);
  if (gte) next = next.gte("created_at", gte);
  if (lt) next = next.lt("created_at", lt);

  const term = safeSearchTerm(filters.search);
  if (term) {
    next = next.or(
      [
        `full_name.ilike.%${term}%`,
        `company.ilike.%${term}%`,
        `email.ilike.%${term}%`,
        `product_description.ilike.%${term}%`,
        `drawing_reference.ilike.%${term}%`,
      ].join(","),
    );
  }

  return next;
};

/* --------------------------------------------------------------------------
   Sign in
   -------------------------------------------------------------------------- */

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) setError(signInError.message);
  };

  return (
    <form className={styles.signIn} onSubmit={submit}>
      <h1 className={styles.signInTitle}>Inquiry inbox</h1>
      <p className={styles.signInHint}>
        Sign in with the Supabase account invited to this project.
      </p>

      <label className={styles.label} htmlFor="admin-email">Email</label>
      <input
        id="admin-email"
        className={styles.input}
        type="email"
        autoComplete="username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label className={styles.label} htmlFor="admin-password">Password</label>
      <input
        id="admin-password"
        className={styles.input}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {error && <p className={styles.error} role="alert">{error}</p>}

      <button className={styles.primaryButton} type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};

/* --------------------------------------------------------------------------
   Detail
   -------------------------------------------------------------------------- */

const Detail = ({ inquiry, onChange, onClose }) => {
  const [status, setStatus] = useState(inquiry.status);
  const [note, setNote] = useState(inquiry.internal_note ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [problem, setProblem] = useState("");

  /* No effect resets these when another row is picked: the caller keys this
     component on the row id, so a different selection mounts a fresh Detail
     whose state initialises from its own props. */

  const save = async () => {
    setSaving(true);
    setProblem("");
    const { error } = await supabase
      .from("inquiries")
      .update({ status, internal_note: note || null })
      .eq("id", inquiry.id);
    setSaving(false);

    if (error) setProblem(error.message);
    else {
      setSaved(true);
      onChange({ ...inquiry, status, internal_note: note || null });
    }
  };

  const download = async () => {
    setProblem("");
    const { data, error } = await supabase.storage
      .from("inquiry-attachments")
      .createSignedUrl(inquiry.attachment_path, SIGNED_URL_SECONDS, {
        download: inquiry.attachment_name || true,
      });

    if (error || !data?.signedUrl) {
      setProblem(error?.message ?? "Could not create a download link.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const fields = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const value = inquiry[key];
      if (value === null || value === undefined || value === "") return null;
      if (Array.isArray(value)) return value.length ? [label, value.join(", ")] : null;
      if (key === "country") return [label, countryName(value)];
      return [label, String(value)];
    })
    .filter(Boolean);

  return (
    <div>
      <div className={styles.detailHead}>
        <div>
          <h2 className={styles.detailName}>{inquiry.full_name}</h2>
          <a className={styles.detailEmail} href={`mailto:${inquiry.email}`}>
            {inquiry.email}
          </a>
        </div>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close inquiry">
          ×
        </button>
      </div>

      <p className={styles.detailDate}>{formatDateTime(inquiry.created_at)}</p>

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

      {problem && <p className={styles.error} role="alert">{problem}</p>}

      <div className={styles.triage}>
        <label className={styles.label} htmlFor="admin-status">Status</label>
        <select
          id="admin-status"
          className={styles.input}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {STATUSES.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label className={styles.label} htmlFor="admin-note">Internal note</label>
        <textarea
          id="admin-note"
          className={styles.textarea}
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Not shown to the buyer."
        />

        <button className={styles.primaryButton} type="button" onClick={save} disabled={saving}>
          {saving ? "Saving…" : saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   Inbox
   -------------------------------------------------------------------------- */

const Inbox = ({ onSignOut }) => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [searchDraft, setSearchDraft] = useState("");
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [exporting, setExporting] = useState(false);

  /*
   * One funnel for every filter change. It resets the page, because a filter
   * applied while on page four of the previous result set would otherwise land
   * on a page the new set may not have, and the table would come back empty
   * for a reason nobody could see.
   */
  const update = useCallback((patch) => {
    setLoading(true);
    setSelectedId(null);
    setFilters((current) => ({ ...current, ...patch, page: 0 }));
  }, []);

  const goToPage = useCallback((page) => {
    setLoading(true);
    setFilters((current) => ({ ...current, page }));
  }, []);

  /* Filtering on every keystroke would issue a query per character. Committed
     after a pause, or immediately on submit. */
  useEffect(() => {
    const id = setTimeout(() => {
      setFilters((current) =>
        current.search === searchDraft
          ? current
          : { ...current, search: searchDraft, page: 0 },
      );
    }, 350);
    return () => clearTimeout(id);
  }, [searchDraft]);

  const fetchPage = useCallback((active) => {
    const from = active.page * PAGE_SIZE;
    return applyFilters(supabase.from("inquiries").select("*", { count: "exact" }), active)
      .order("created_at", { ascending: active.sort === "oldest" })
      .range(from, from + PAGE_SIZE - 1);
  }, []);

  const applyPage = useCallback(({ data, error: pageError, count }) => {
    setLoading(false);
    if (pageError) {
      setError(pageError.message);
      return;
    }
    setError("");
    setRows(data ?? []);
    setTotal(count ?? 0);
  }, []);

  useEffect(() => {
    let live = true;
    fetchPage(filters).then((result) => {
      if (live) applyPage(result);
    });
    return () => {
      live = false;
    };
  }, [filters, fetchPage, applyPage]);

  /*
   * Status tallies deliberately ignore the status filter itself. Counting
   * within the current selection would show the chosen status' own total and
   * zero for every other one, which is exactly when the numbers stop being
   * useful — the point of the chips is to say what is waiting elsewhere.
   */
  useEffect(() => {
    let live = true;

    Promise.all(
      STATUSES.map((status) =>
        applyFilters(
          supabase.from("inquiries").select("id", { count: "exact", head: true }),
          { ...filters, status },
        ).then(({ count }) => [status, count ?? 0]),
      ),
    ).then((pairs) => {
      if (live) setCounts(Object.fromEntries(pairs));
    });

    return () => {
      live = false;
    };
  }, [filters]);

  /* The destinations actually seen, so the menu offers real choices rather
     than all 243 ISO codes. Capped: this is a convenience, not a reason to
     read the whole table. */
  useEffect(() => {
    let live = true;
    supabase
      .from("inquiries")
      .select("country")
      .not("country", "is", null)
      .limit(1000)
      .then(({ data }) => {
        if (!live) return;
        const seen = [...new Set((data ?? []).map((row) => row.country))].filter(Boolean);
        seen.sort((a, b) => (countryName(a) ?? a).localeCompare(countryName(b) ?? b));
        setCountries(seen);
      });
    return () => {
      live = false;
    };
  }, []);

  const exportCsv = async () => {
    setExporting(true);
    const { data, error: exportError } = await applyFilters(
      supabase.from("inquiries").select("*"),
      filters,
    )
      .order("created_at", { ascending: filters.sort === "oldest" })
      .limit(2000);
    setExporting(false);

    if (exportError || !data) {
      setError(exportError?.message ?? "Could not export.");
      return;
    }

    /* Exports what is filtered, not what is on screen — the page you happen to
       be looking at is rarely the set you meant. */
    const blob = new Blob([toCsv(data)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const selected = rows.find((row) => row.id === selectedId) ?? null;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const firstShown = total === 0 ? 0 : filters.page * PAGE_SIZE + 1;
  const lastShown = Math.min(total, (filters.page + 1) * PAGE_SIZE);

  const activeFilterCount = useMemo(
    () =>
      [
        filters.status !== "all",
        filters.preset !== "any",
        Boolean(filters.from || filters.to),
        Boolean(filters.country),
        filters.attachment !== "any",
        Boolean(filters.search),
      ].filter(Boolean).length,
    [filters],
  );

  const applyChange = (updated) =>
    setRows((current) => current.map((row) => (row.id === updated.id ? updated : row)));

  const clearAll = () => {
    setSearchDraft("");
    setLoading(true);
    setSelectedId(null);
    setFilters(EMPTY_FILTERS);
  };

  return (
    <div className={styles.inbox}>
      <header className={styles.bar}>
        <div>
          <h1 className={styles.barTitle}>Inquiry inbox</h1>
          <p className={styles.barCount}>
            {loading
              ? "Loading…"
              : total === 0
                ? "No matching inquiries"
                : `${firstShown}–${lastShown} of ${total}`}
          </p>
        </div>

        <div className={styles.barActions}>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={exportCsv}
            disabled={exporting || total === 0}
          >
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
          <button className={styles.secondaryButton} type="button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.toolbar}>
        <form
          className={styles.searchWrap}
          onSubmit={(event) => {
            event.preventDefault();
            update({ search: searchDraft });
          }}
        >
          <input
            className={styles.search}
            type="search"
            placeholder="Search name, company, email, requirement or drawing reference…"
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            aria-label="Search inquiries"
          />
        </form>

        <div className={styles.controlRow}>
          <label className={styles.control}>
            <span className={styles.controlLabel}>Received</span>
            <select
              className={styles.select}
              value={filters.from || filters.to ? "custom" : filters.preset}
              onChange={(event) =>
                update(
                  event.target.value === "custom"
                    ? { preset: "any" }
                    : { preset: event.target.value, from: "", to: "" },
                )
              }
            >
              {DATE_PRESETS.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
              <option value="custom">Custom range…</option>
            </select>
          </label>

          <label className={styles.control}>
            <span className={styles.controlLabel}>From</span>
            <input
              className={styles.select}
              type="date"
              value={filters.from}
              max={filters.to || undefined}
              onChange={(event) => update({ from: event.target.value })}
            />
          </label>

          <label className={styles.control}>
            <span className={styles.controlLabel}>To</span>
            <input
              className={styles.select}
              type="date"
              value={filters.to}
              min={filters.from || undefined}
              onChange={(event) => update({ to: event.target.value })}
            />
          </label>

          <label className={styles.control}>
            <span className={styles.controlLabel}>Destination</span>
            <select
              className={styles.select}
              value={filters.country}
              onChange={(event) => update({ country: event.target.value })}
            >
              <option value="">All</option>
              {countries.map((code) => (
                <option key={code} value={code}>{countryName(code)}</option>
              ))}
            </select>
          </label>

          <label className={styles.control}>
            <span className={styles.controlLabel}>Attachment</span>
            <select
              className={styles.select}
              value={filters.attachment}
              onChange={(event) => update({ attachment: event.target.value })}
            >
              <option value="any">Any</option>
              <option value="yes">With drawing</option>
              <option value="no">Without</option>
            </select>
          </label>

          <label className={styles.control}>
            <span className={styles.controlLabel}>Sort</span>
            <select
              className={styles.select}
              value={filters.sort}
              onChange={(event) => update({ sort: event.target.value })}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>

          {activeFilterCount > 0 && (
            <button className={styles.clear} type="button" onClick={clearAll}>
              Clear {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"}
            </button>
          )}
        </div>

        <div className={styles.filters}>
          {["all", ...STATUSES].map((option) => (
            <button
              key={option}
              type="button"
              className={filters.status === option ? styles.filterOn : styles.filter}
              onClick={() => update({ status: option })}
            >
              {option}
              {option !== "all" && (
                <span className={styles.filterCount}>{counts[option] ?? 0}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      <div className={selected ? styles.splitOpen : styles.split}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Received</th>
                <th scope="col">Company</th>
                <th scope="col">Destination</th>
                <th scope="col">Requirement</th>
                <th scope="col">File</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.id === selectedId ? styles.rowOn : styles.row}
                  onClick={() => setSelectedId(row.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(row.id);
                    }
                  }}
                  tabIndex={0}
                  aria-label={`Open inquiry from ${row.company || row.full_name}`}
                >
                  <td className={styles.cellDate}>{formatDate(row.created_at)}</td>
                  <td>
                    <span className={styles.cellCompany}>{row.company || row.full_name}</span>
                    <span className={styles.cellEmail}>{row.email}</span>
                  </td>
                  <td className={styles.cellCountry}>{countryName(row.country) ?? "—"}</td>
                  <td className={styles.cellSummary}>{row.product_description || "—"}</td>
                  <td className={styles.cellFile}>{row.attachment_path ? "Yes" : "—"}</td>
                  <td>
                    <span className={styles.status} data-status={row.status}>{row.status}</span>
                  </td>
                </tr>
              ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td className={styles.empty} colSpan={6}>
                    {activeFilterCount > 0
                      ? "Nothing matches these filters."
                      : "No inquiries yet. The first submission from the quote form will appear here."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {pages > 1 && (
            <nav className={styles.pager} aria-label="Pages">
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => goToPage(filters.page - 1)}
                disabled={filters.page === 0}
              >
                Previous
              </button>
              <span className={styles.pagerLabel}>
                Page {filters.page + 1} of {pages}
              </span>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => goToPage(filters.page + 1)}
                disabled={filters.page + 1 >= pages}
              >
                Next
              </button>
            </nav>
          )}
        </div>

        {selected && (
          <aside className={styles.pane}>
            {/* Keyed on the row so picking another mounts a fresh Detail whose
                status and note initialise from that row. */}
            <Detail
              key={selected.id}
              inquiry={selected}
              onChange={applyChange}
              onClose={() => setSelectedId(null)}
            />
          </aside>
        )}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   Route
   -------------------------------------------------------------------------- */

const Admin = () => {
  const [session, setSession] = useState(null);
  /* Nothing to check when the project is not configured, so that is derived at
     initialisation rather than corrected by an effect afterwards. */
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
              Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>{" "}
              in the deployment environment, then redeploy. See <code>.env.example</code>.
            </p>
          </div>
        ) : checking ? (
          <p className={styles.empty}>Checking your session…</p>
        ) : session ? (
          <Inbox onSignOut={() => supabase.auth.signOut()} />
        ) : (
          <SignIn />
        )}
      </main>
    </>
  );
};

export default Admin;
