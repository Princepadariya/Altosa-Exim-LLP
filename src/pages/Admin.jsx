import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import Icon from "../components/ui/Icon";
import Seo from "../components/ui/Seo";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { toCsv } from "../utils/csv";
import styles from "./Admin.module.css";

/**
 * Inquiry inbox.
 *
 * Deliberately outside the marketing Layout: this is a tool, not a page of the
 * site, and the nav, footer and quote CTA belong to a buyer's journey rather
 * than to whoever is answering it. It borrows the site's tokens — the same ink,
 * azure, mono labels and spring easing — so it reads as the same product seen
 * from behind, rather than as a database viewer bolted on beside it.
 *
 * Two routes. /admin lists, /admin/:id reads one inquiry on a page of its own,
 * so a specific requirement has an address that can be bookmarked, reopened, or
 * sent to whoever is quoting it.
 *
 * The list's filters live in the query string rather than in component state.
 * That is what makes the back button work: returning from an inquiry restores
 * the exact filtered page it was opened from, instead of dumping the reader
 * back at an unfiltered list to start again — which at two hundred rows is the
 * difference between a tool and a chore. It also makes any filtered view
 * shareable.
 *
 * Filtering, counting, sorting and paging all happen in Postgres. The browser
 * never holds more than one page, so this works the same at ten thousand rows
 * as at ten.
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
  { id: "any", label: "Any", days: null },
  { id: "1", label: "Today", days: 1 },
  { id: "7", label: "7d", days: 7 },
  { id: "30", label: "30d", days: 30 },
  { id: "90", label: "90d", days: 90 },
];

const DEFAULTS = {
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

/** Query string to filters. Anything absent falls back to its default, so a
    bare /admin is a clean unfiltered list. */
const readFilters = (params) => ({
  status: params.get("status") ?? DEFAULTS.status,
  preset: params.get("preset") ?? DEFAULTS.preset,
  from: params.get("from") ?? DEFAULTS.from,
  to: params.get("to") ?? DEFAULTS.to,
  country: params.get("country") ?? DEFAULTS.country,
  attachment: params.get("attachment") ?? DEFAULTS.attachment,
  search: params.get("q") ?? DEFAULTS.search,
  sort: params.get("sort") ?? DEFAULTS.sort,
  page: Number.parseInt(params.get("page") ?? "0", 10) || 0,
});

/** Filters to query string, writing only what differs from the default so the
    URL stays short enough to read and to paste. */
const writeFilters = (filters) => {
  const params = new URLSearchParams();
  if (filters.status !== DEFAULTS.status) params.set("status", filters.status);
  if (filters.preset !== DEFAULTS.preset) params.set("preset", filters.preset);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.country) params.set("country", filters.country);
  if (filters.attachment !== DEFAULTS.attachment) params.set("attachment", filters.attachment);
  if (filters.search) params.set("q", filters.search);
  if (filters.sort !== DEFAULTS.sort) params.set("sort", filters.sort);
  if (filters.page > 0) params.set("page", String(filters.page));
  return params;
};

/**
 * Recency, because "3h ago" answers the question an operator is actually
 * asking — how fresh is this — faster than a date they have to subtract from
 * today. The exact timestamp stays available on hover and on the inquiry page.
 */
const relativeDate = (value) => {
  const then = new Date(value);
  const minutes = Math.round((Date.now() - then.getTime()) / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;

  return then.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
};

const formatDateTime = (value) =>
  new Date(value).toLocaleString(undefined, {
    day: "numeric",
    month: "long",
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

/** Two letters to anchor a row visually, so the eye has something to land on
    down the company column other than text. */
const initials = (name) =>
  (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

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

/* Grouped the way the form asks for them, so an inquiry reads in the order the
   buyer filled it in rather than as one undifferentiated list of columns. */
const FIELD_GROUPS = [
  {
    title: "Contact",
    fields: [
      ["company", "Company"],
      ["phone", "Phone"],
      ["country", "Destination"],
      ["source_page", "Submitted from"],
    ],
  },
  {
    title: "Requirement",
    fields: [
      ["industry", "Industry"],
      ["product_description", "Requirement"],
      ["drawing_reference", "Drawing reference"],
      ["material", "Material"],
      ["standard", "Standard"],
      ["quantity", "Quantity"],
      ["inquiry_type", "Inquiry type"],
      ["documentation", "Records requested"],
    ],
  },
  {
    title: "Commercial",
    fields: [
      ["port_of_discharge", "Port of discharge"],
      ["incoterm", "Incoterm"],
      ["timeline", "Timeline"],
      ["target_date", "Target date"],
      ["notes", "Notes"],
    ],
  },
];

/**
 * PostgREST reads `or=(a.ilike.%x%,b.ilike.%x%)` as structure, so a comma or a
 * bracket typed into the search box is parsed as filter syntax rather than as
 * text — a search for "Alvarez, S.L." becomes a malformed query and a confusing
 * error. Stripped rather than escaped: none of these characters distinguishes
 * one buyer from another.
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
   Small pieces
   -------------------------------------------------------------------------- */

/** A select that looks like the rest of the interface rather than like the
    operating system: the native arrow is removed and one of ours drawn over. */
const Select = ({ label, value, onChange, children }) => (
  <label className={styles.field}>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={styles.selectWrap}>
      <select className={styles.select} value={value} onChange={onChange}>
        {children}
      </select>
      <Icon name="chevronDown" size={14} className={styles.selectChevron} />
    </span>
  </label>
);

const StatusTag = ({ status }) => (
  <span className={styles.status} data-status={status}>
    <span className={styles.statusDot} aria-hidden="true" />
    {status}
  </span>
);

/** Placeholder rows, so a slow query reads as loading rather than as empty. */
const Skeleton = () =>
  Array.from({ length: 6 }, (_, index) => (
    <tr key={index} className={styles.skeletonRow}>
      {Array.from({ length: 6 }, (_, cell) => (
        <td key={cell}>
          <span className={styles.skeleton} />
        </td>
      ))}
    </tr>
  ));

/* --------------------------------------------------------------------------
   Sign in
   -------------------------------------------------------------------------- */

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [reveal, setReveal] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) setError(signInError.message);
  };

  return (
    <div className={styles.authPage}>
      {/* The plate grid and grain the site's dark sections already use, so the
          way in looks like part of the building rather than a login screen
          bolted to the side of it. */}
      <span className={styles.authGrid} aria-hidden="true" />
      <span className="grain" aria-hidden="true" />

      <div className={styles.authInner}>
        <div className={styles.lockup}>
          <span className={styles.lockupMark} aria-hidden="true">AE</span>
          <span className={styles.lockupText}>
            <span className={styles.lockupName}>ALTOSA EXIM</span>
            <span className={styles.lockupSub}>Rajkot, Gujarat, India</span>
          </span>
        </div>

        <form className={styles.authCard} onSubmit={submit}>
          <h1 className={styles.authTitle}>Inquiry inbox</h1>
          <p className={styles.authHint}>
            Staff access. Sign in to read requirements sent through the site.
          </p>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input
              className={styles.input}
              type="email"
              autoComplete="username"
              placeholder="you@altosaeximllp.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Password</span>
            <span className={styles.passwordWrap}>
              <input
                className={styles.input}
                type={reveal ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {/* Typing blind into an unfamiliar screen is where a good share
                  of "wrong password" actually comes from. */}
              <button
                className={styles.reveal}
                type="button"
                onClick={() => setReveal((shown) => !shown)}
                aria-label={reveal ? "Hide password" : "Show password"}
              >
                {reveal ? "Hide" : "Show"}
              </button>
            </span>
          </label>

          {error && (
            <p className={styles.authError} role="alert">
              {error}
            </p>
          )}

          <button className={styles.primaryButton} type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className={styles.authFoot}>Internal tool · not linked from the public site</p>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   One inquiry, on its own page
   -------------------------------------------------------------------------- */

const InquiryPage = ({ id, backTo }) => {
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  const [status, setStatus] = useState("new");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [problem, setProblem] = useState("");

  const fetchOne = useCallback(
    () => supabase.from("inquiries").select("*").eq("id", id).maybeSingle(),
    [id],
  );

  const apply = useCallback(({ data, error }) => {
    setLoading(false);
    if (error) {
      setProblem(error.message);
      return;
    }
    if (!data) {
      setMissing(true);
      return;
    }
    setInquiry(data);
    setStatus(data.status);
    setNote(data.internal_note ?? "");
  }, []);

  useEffect(() => {
    let live = true;
    fetchOne().then((result) => {
      if (live) apply(result);
    });
    return () => {
      live = false;
    };
  }, [fetchOne, apply]);

  const dirty =
    inquiry && (status !== inquiry.status || note !== (inquiry.internal_note ?? ""));

  const save = async () => {
    setSaving(true);
    setProblem("");
    const { error } = await supabase
      .from("inquiries")
      .update({ status, internal_note: note || null })
      .eq("id", id);
    setSaving(false);

    if (error) setProblem(error.message);
    else {
      setSaved(true);
      setInquiry((current) => ({ ...current, status, internal_note: note || null }));
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

  if (loading) {
    return (
      <div className={styles.inbox}>
        <p className={styles.checking}>Loading inquiry…</p>
      </div>
    );
  }

  if (missing || !inquiry) {
    return (
      <div className={styles.inbox}>
        <Link className={styles.back} to={backTo}>
          <Icon name="arrow" size={15} className={styles.backIcon} />
          Back to inbox
        </Link>
        <div className={styles.notFound}>
          <h1 className={styles.authTitle}>Inquiry not found</h1>
          <p className={styles.authHint}>
            It may have been deleted, or the link may be wrong.
          </p>
        </div>
      </div>
    );
  }

  const groups = FIELD_GROUPS.map((group) => ({
    title: group.title,
    rows: group.fields
      .map(([key, label]) => {
        const value = inquiry[key];
        if (value === null || value === undefined || value === "") return null;
        if (Array.isArray(value)) return value.length ? [label, value.join(", ")] : null;
        if (key === "country") return [label, countryName(value)];
        return [label, String(value)];
      })
      .filter(Boolean),
  })).filter((group) => group.rows.length > 0);

  return (
    <div className={styles.inbox}>
      <Link className={styles.back} to={backTo}>
        <Icon name="arrow" size={15} className={styles.backIcon} />
        Back to inbox
      </Link>

      <header className={styles.pageHead}>
        <span className={styles.monogramLarge} aria-hidden="true">
          {initials(inquiry.company || inquiry.full_name)}
        </span>

        <div className={styles.pageWho}>
          <h1 className={styles.pageTitle}>{inquiry.company || inquiry.full_name}</h1>
          <p className={styles.pageSub}>{inquiry.full_name}</p>
        </div>

        <StatusTag status={inquiry.status} />
      </header>

      <div className={styles.pageMeta}>
        <a className={styles.metaItem} href={`mailto:${inquiry.email}`}>
          <Icon name="mail" size={15} />
          {inquiry.email}
        </a>
        {inquiry.phone && (
          <span className={styles.metaItem}>
            <Icon name="badge" size={15} />
            {inquiry.phone}
          </span>
        )}
        <span className={styles.metaItem}>
          <Icon name="globe" size={15} />
          {countryName(inquiry.country) ?? "—"}
        </span>
        <span className={styles.metaItem}>
          <Icon name="clock" size={15} />
          {formatDateTime(inquiry.created_at)}
        </span>
      </div>

      {problem && <p className={styles.error} role="alert">{problem}</p>}

      <div className={styles.pageBody}>
        <div className={styles.pageMain}>
          {inquiry.attachment_path && (
            <button className={styles.attachment} type="button" onClick={download}>
              <span className={styles.attachmentIcon} aria-hidden="true">
                <Icon name="document" size={18} />
              </span>
              <span className={styles.attachmentText}>
                <span className={styles.attachmentName}>{inquiry.attachment_name}</span>
                <span className={styles.attachmentMeta}>
                  {formatSize(inquiry.attachment_size)} · download
                </span>
              </span>
              <Icon name="arrow" size={16} className={styles.attachmentGo} />
            </button>
          )}

          {groups.map((group) => (
            <section className={styles.group} key={group.title}>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              <dl className={styles.fields}>
                {group.rows.map(([label, value]) => (
                  <div className={styles.fieldRow} key={label}>
                    <dt className={styles.fieldKey}>{label}</dt>
                    <dd className={styles.fieldValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <aside className={styles.pageSide}>
          <div className={styles.triageCard}>
            <h2 className={styles.groupTitle}>Triage</h2>

            <span className={styles.fieldLabel}>Status</span>
            <div className={styles.statusPicker}>
              {STATUSES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={status === option ? styles.statusPickOn : styles.statusPick}
                  data-status={option}
                  onClick={() => {
                    setStatus(option);
                    setSaved(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Internal note</span>
              <textarea
                className={styles.textarea}
                rows={5}
                value={note}
                onChange={(event) => {
                  setNote(event.target.value);
                  setSaved(false);
                }}
                placeholder="Not shown to the buyer."
              />
            </label>

            <button
              className={styles.primaryButton}
              type="button"
              onClick={save}
              disabled={saving || !dirty}
            >
              {saving ? "Saving…" : saved && !dirty ? "Saved" : "Save changes"}
            </button>

            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => navigate(backTo)}
            >
              Back to inbox
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   The list
   -------------------------------------------------------------------------- */

const Inbox = ({ onSignOut }) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  /* Derived from the URL rather than held alongside it, so the two cannot drift
     apart and the back button restores a filtered view for free. */
  const filters = useMemo(() => readFilters(params), [params]);

  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  /*
   * Every filter change replaces the history entry rather than pushing one.
   * Pushing would make the back button walk backwards through each individual
   * filter change before it ever left the inbox. Opening an inquiry is the only
   * push here, so back always means "return to the list I came from".
   */
  const update = useCallback(
    (patch) => {
      setLoading(true);
      setParams(writeFilters({ ...filters, ...patch, page: 0 }), { replace: true });
    },
    [filters, setParams],
  );

  const goToPage = useCallback(
    (page) => {
      setLoading(true);
      setParams(writeFilters({ ...filters, page }), { replace: true });
    },
    [filters, setParams],
  );

  /* Filtering on every keystroke would issue a query per character. Committed
     after a pause, or immediately on submit. */
  useEffect(() => {
    if (searchDraft === filters.search) return undefined;
    const id = setTimeout(() => {
      setParams(writeFilters({ ...filters, search: searchDraft, page: 0 }), { replace: true });
    }, 350);
    return () => clearTimeout(id);
  }, [searchDraft, filters, setParams]);

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

  /* The destinations actually seen, so the menu offers real choices rather than
     all 243 ISO codes. Capped: this is a convenience, not a reason to read the
     whole table. */
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

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const firstShown = total === 0 ? 0 : filters.page * PAGE_SIZE + 1;
  const lastShown = Math.min(total, (filters.page + 1) * PAGE_SIZE);
  const usingCustom = Boolean(filters.from || filters.to);
  const query = params.toString();

  /* Carried onto the inquiry's URL so its Back link can rebuild this exact
     list, even for someone opening the link cold. */
  const linkFor = (id) => (query ? `/admin/${id}?${query}` : `/admin/${id}`);

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

  const clearAll = () => {
    setSearchDraft("");
    setCustomOpen(false);
    setLoading(true);
    setParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className={styles.inbox}>
      <header className={styles.topbar}>
        <div className={styles.topbarTitle}>
          <span className={styles.mark} aria-hidden="true">AE</span>
          <div>
            <h1 className={styles.title}>Inquiry inbox</h1>
            <p className={styles.subtitle}>
              {loading
                ? "Loading…"
                : total === 0
                  ? "Nothing to show"
                  : `${firstShown}–${lastShown} of ${total}`}
            </p>
          </div>
        </div>

        <div className={styles.topbarActions}>
          <button
            className={styles.ghostButton}
            type="button"
            onClick={exportCsv}
            disabled={exporting || total === 0}
          >
            <Icon name="receipt" size={15} />
            {exporting ? "Exporting…" : "Export"}
          </button>
          <button className={styles.ghostButton} type="button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.controls}>
        <form
          className={styles.searchRow}
          onSubmit={(event) => {
            event.preventDefault();
            update({ search: searchDraft });
          }}
        >
          <Icon name="search" size={17} className={styles.searchIcon} />
          <input
            className={styles.search}
            type="search"
            placeholder="Search name, company, email, requirement or drawing reference…"
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            aria-label="Search inquiries"
          />
          {activeFilterCount > 0 && (
            <button className={styles.clear} type="button" onClick={clearAll}>
              Clear {activeFilterCount}
            </button>
          )}
        </form>

        <div className={styles.filterRow}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Received</span>
            <div className={styles.segment} role="group" aria-label="Date received">
              {DATE_PRESETS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={
                    !usingCustom && filters.preset === option.id
                      ? styles.segmentOn
                      : styles.segmentOff
                  }
                  onClick={() => {
                    setCustomOpen(false);
                    update({ preset: option.id, from: "", to: "" });
                  }}
                >
                  {option.label}
                </button>
              ))}
              <button
                type="button"
                className={usingCustom || customOpen ? styles.segmentOn : styles.segmentOff}
                onClick={() => setCustomOpen((open) => !open)}
              >
                Range
              </button>
            </div>
          </div>

          <Select
            label="Destination"
            value={filters.country}
            onChange={(event) => update({ country: event.target.value })}
          >
            <option value="">All destinations</option>
            {countries.map((code) => (
              <option key={code} value={code}>{countryName(code)}</option>
            ))}
          </Select>

          <Select
            label="Attachment"
            value={filters.attachment}
            onChange={(event) => update({ attachment: event.target.value })}
          >
            <option value="any">Any</option>
            <option value="yes">With drawing</option>
            <option value="no">Without</option>
          </Select>

          <Select
            label="Sort"
            value={filters.sort}
            onChange={(event) => update({ sort: event.target.value })}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </Select>
        </div>

        {/* Revealed only when asked for: two date inputs on permanent display is
            a lot of chrome for a filter most sessions never use. */}
        {(customOpen || usingCustom) && (
          <div className={styles.range}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>From</span>
              <input
                className={styles.input}
                type="date"
                value={filters.from}
                max={filters.to || undefined}
                onChange={(event) => update({ from: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>To</span>
              <input
                className={styles.input}
                type="date"
                value={filters.to}
                min={filters.from || undefined}
                onChange={(event) => update({ to: event.target.value })}
              />
            </label>
          </div>
        )}

        <div className={styles.chips}>
          {["all", ...STATUSES].map((option) => (
            <button
              key={option}
              type="button"
              className={filters.status === option ? styles.chipOn : styles.chip}
              data-status={option}
              onClick={() => update({ status: option })}
            >
              {option !== "all" && <span className={styles.chipDot} aria-hidden="true" />}
              {option}
              {option !== "all" && <span className={styles.chipCount}>{counts[option] ?? 0}</span>}
            </button>
          ))}
        </div>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Received</th>
                <th scope="col">Company</th>
                <th scope="col">Destination</th>
                <th scope="col">Requirement</th>
                <th scope="col" className={styles.colFile}>File</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && rows.length === 0 && <Skeleton />}

              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={styles.row}
                  onClick={() => navigate(linkFor(row.id))}
                >
                  <td className={styles.cellDate} title={formatDateTime(row.created_at)}>
                    {relativeDate(row.created_at)}
                  </td>
                  <td>
                    <span className={styles.company}>
                      <span className={styles.monogram} aria-hidden="true">
                        {initials(row.company || row.full_name)}
                      </span>
                      <span className={styles.companyText}>
                        {/* A real link, so the row can be opened in a new tab,
                            reached by keyboard and read out as a link. The row
                            click is a convenience on top of it, not instead. */}
                        <Link className={styles.companyName} to={linkFor(row.id)}>
                          {row.company || row.full_name}
                        </Link>
                        <span className={styles.companyEmail}>{row.email}</span>
                      </span>
                    </span>
                  </td>
                  <td className={styles.cellCountry}>{countryName(row.country) ?? "—"}</td>
                  <td className={styles.cellSummaryCell}>
                    <span className={styles.cellSummary}>
                      {row.product_description || "—"}
                    </span>
                  </td>
                  <td className={styles.colFile}>
                    {row.attachment_path ? (
                      <Icon name="document" size={16} className={styles.fileIcon} />
                    ) : (
                      <span className={styles.fileNone}>—</span>
                    )}
                  </td>
                  <td>
                    <StatusTag status={row.status} />
                  </td>
                </tr>
              ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td className={styles.empty} colSpan={6}>
                    <span className={styles.emptyMark} aria-hidden="true">
                      <Icon name="search" size={22} />
                    </span>
                    <span className={styles.emptyTitle}>
                      {activeFilterCount > 0 ? "Nothing matches" : "No inquiries yet"}
                    </span>
                    <span className={styles.emptyBody}>
                      {activeFilterCount > 0
                        ? "Try widening the date range or clearing a filter."
                        : "The first submission from the quote form will appear here."}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <nav className={styles.pager} aria-label="Pages">
            <button
              className={styles.ghostButton}
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
              className={styles.ghostButton}
              type="button"
              onClick={() => goToPage(filters.page + 1)}
              disabled={filters.page + 1 >= pages}
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   Route
   -------------------------------------------------------------------------- */

const Admin = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
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

  const query = params.toString();
  const backTo = query ? `/admin?${query}` : "/admin";

  return (
    <>
      {/* Never indexed, and never in the sitemap. */}
      <Seo title="Inquiry inbox" description="Internal." noIndex />

      <main className={styles.page}>
        {!isSupabaseConfigured ? (
          <div className={styles.authPage}>
            <span className={styles.authGrid} aria-hidden="true" />
            <div className={styles.authInner}>
              <div className={styles.authCard}>
                <h1 className={styles.authTitle}>Not configured</h1>
                {/* The one screen that talks about deployment, because it is a
                    deploy fault rather than a sign-in and the person reading it
                    needs to know where to look. It names the file rather than
                    the vendor: the file is the actionable part. */}
                <p className={styles.authHint}>
                  This deployment is missing its database credentials. Set the
                  variables listed in <code>.env.example</code> in the hosting
                  environment, then redeploy.
                </p>
              </div>
            </div>
          </div>
        ) : checking ? (
          <div className={styles.authPage}>
            <span className={styles.authGrid} aria-hidden="true" />
            <p className={styles.checking}>Checking your session…</p>
          </div>
        ) : !session ? (
          <SignIn />
        ) : id ? (
          <InquiryPage id={id} backTo={backTo} />
        ) : (
          <Inbox onSignOut={() => supabase.auth.signOut()} />
        )}
      </main>
    </>
  );
};

export default Admin;
