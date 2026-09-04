/**
 * Turns a heading into a stable anchor id.
 *
 * Lives here rather than beside the Prose component because two callers need
 * it — Prose to stamp the id, ResourceArticle to build the contents rail that
 * links to it — and a module that exports both a component and a helper opts
 * out of React Fast Refresh for the whole file.
 */
export const slugifyHeading = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default slugifyHeading;
