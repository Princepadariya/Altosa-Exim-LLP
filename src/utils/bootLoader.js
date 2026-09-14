/**
 * Lifts the intro loader that index.html paints before the app loads.
 *
 * The inline script in index.html decides whether the loader shows at all (home
 * page, first visit this session) and marks <html> with `boot-on`. This decides
 * when it goes: once the page is genuinely ready, but never before it has been
 * on screen long enough to read as intentional rather than as a flicker, and
 * never after a ceiling — a slow font or image must not hold a visitor at the
 * door.
 */

const SEEN_KEY = "altosa:intro-seen";

/* Long enough for the gold bar to finish filling (0.45s delay + 0.95s), so the
   exit never cuts it off half way. */
const MINIMUM_MS = 1400;
const MINIMUM_REDUCED_MS = 350;

/* However slow the network, the page is handed over by this point. */
const CEILING_MS = 3500;

/* Longer than the 0.95s curtain transition, in case transitionend never fires —
   a backgrounded tab, for one, can skip it. */
const EXIT_BACKSTOP_MS = 1400;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));

const pageLoaded = () =>
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

export const dismissBootLoader = () => {
  const root = document.documentElement;
  const loader = document.getElementById("boot-loader");

  if (!loader) return;

  /* Not showing on this route or this visit: take the unused markup out of the
     document rather than leaving it hidden in there. */
  if (!root.classList.contains("boot-on")) {
    loader.remove();
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startedAt = Number(root.dataset.bootStart) || 0;
  const elapsed = performance.now() - startedAt;
  const minimum = reducedMotion ? MINIMUM_REDUCED_MS : MINIMUM_MS;

  const ready = Promise.all([
    wait(minimum - elapsed),
    pageLoaded(),
    document.fonts?.ready ?? Promise.resolve(),
  ]);

  Promise.race([ready, wait(CEILING_MS - elapsed)]).then(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* Storage blocked: the loader simply shows again next visit. */
    }

    /*
     * `boot-leave` starts the curtain and, in the same moment, releases the
     * hero's paused entrance animation and the scroll lock — so the page comes
     * alive as it is uncovered rather than after.
     */
    root.classList.add("boot-leave");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.classList.remove("boot-on", "boot-leave");
      delete root.dataset.bootStart;
      loader.remove();
    };

    loader.addEventListener(
      "transitionend",
      (event) => {
        if (event.target === loader) finish();
      },
      { once: false },
    );
    setTimeout(finish, EXIT_BACKSTOP_MS);
  });
};

export default dismissBootLoader;
