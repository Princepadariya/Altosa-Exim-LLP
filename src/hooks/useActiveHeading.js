import { useEffect, useState } from "react";

/**
 * Tracks which heading the reader is currently inside, for a contents rail.
 *
 * Measures positions rather than watching an IntersectionObserver band, because
 * a band can be missed entirely. The previous version observed a strip between
 * 20% and 30% of the viewport — roughly 160px to 240px on a laptop — and
 * updated only when a heading was inside it. But `scroll-margin-top` parks a
 * clicked heading at `--header-h + 2rem`, about 124px down, which is above that
 * strip. Clicking a link in the rail scrolled the article and then found no
 * heading in the band at all, so nothing was set and the highlight stayed on
 * whatever section the reader had come from.
 *
 * Reading the geometry always yields an answer: the active heading is the last
 * one to have passed the line, so there is no state in which the rail has
 * nothing to say.
 */
export const useActiveHeading = (ids) => {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  /* ids is rebuilt by the caller on every render, so depending on the array
     itself would tear down and rebuild the listener each time. */
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return undefined;

    let frame = 0;

    const measure = () => {
      frame = 0;

      /*
       * The line a heading must cross to count as the one being read is
       * derived from the CSS that decides where a click puts it, rather than
       * from arithmetic here that could drift out of step with the stylesheet.
       *
       * Two properties stack. `scroll-padding-top` on the scrollport insets
       * the start edge to clear the fixed header; `scroll-margin-top` on the
       * heading adds its own clearance on top. A clicked heading therefore
       * lands at the sum of the two — 240px as the tokens currently stand,
       * not the 124px that scroll-margin-top alone suggests. Setting the line
       * anywhere above that is what made a clicked heading fail to register.
       */
      const scrollPadding =
        parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

      let current = list[0];

      for (const id of list) {
        const element = document.getElementById(id);
        if (!element) continue;

        const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
        /* A few pixels of tolerance for sub-pixel rounding, so a heading that
           has landed exactly on its own line is not judged to be short of it. */
        const line = scrollPadding + margin + 4;

        if (element.getBoundingClientRect().top > line) break;
        current = id;
      }

      /* A short final section can end before its heading ever crosses the
         line, leaving the rail stuck one item short at the foot of the
         article. If the page cannot scroll further, the last heading is the
         one being read whatever the arithmetic says. */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = list[list.length - 1];

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return activeId;
};

export default useActiveHeading;
