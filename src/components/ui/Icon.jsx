/**
 * Inline stroke icons. Kept as one map so icon names can live in data files
 * (`industries.js`, `services.js`) without importing components there.
 */

const paths = {
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </>
  ),
  bolt: <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />,
  caliper: (
    <>
      <path d="M4 3v18M20 3v18M4 7h16M4 12h10M4 17h16" />
    </>
  ),
  structure: (
    <>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
    </>
  ),
  tractor: (
    <>
      <circle cx="7" cy="17" r="3" />
      <circle cx="18" cy="18" r="2" />
      <path d="M4 14V7h6l2 5h5v4M10 7V4h4" />
    </>
  ),
  valve: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M8 3h8M8 21h8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2 0 1.4 1.4 0 0 0 0-2M13 15l2.5 2.5a1.4 1.4 0 0 0 2 0 1.4 1.4 0 0 0 0-2L13 11" />
      <path d="M3 10l3-4h5l2 2M21 10l-3-4h-4M3 10l5 5a1.4 1.4 0 0 0 2 0l3-3" />
    </>
  ),
  ship: (
    <>
      <path d="M3 18c1.5 0 2-1 3.5-1s2 1 3.5 1 2-1 3.5-1 2 1 3.5 1 2-1 3.5-1" />
      <path d="M4 14 5 9h14l1 5M9 9V5h6v4M12 5V3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  container: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="1" />
      <path d="M8 7v12M12 7v12M16 7v12M6 7V5h12v2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3v18l2.5-1.5L10 21l2-1.5L14 21l2.5-1.5L19 21V3H5Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  thread: (
    <>
      <path d="M8 9h8M8 13h5" />
      <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 13 4 4L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.3A9 9 0 1 0 12 3Zm4.3 12.4c-.2.5-1.1 1-1.5 1-.4.1-.9.1-1.5-.1a11 11 0 0 1-5.4-4.7c-.4-.7-.6-1.4-.6-2 0-.6.3-1.2.6-1.5.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a8 8 0 0 0 3 2.6c.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.3v.7Z" />
  ),
};

/** Icons drawn as solid shapes rather than strokes. */
const filledIcons = new Set(["whatsapp"]);

const Icon = ({ name, size = 24, strokeWidth = 1.5, className, ...rest }) => {
  const path = paths[name];
  if (!path) return null;

  const isFilled = filledIcons.has(name);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  );
};

export default Icon;
