import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { cancelSmoothScroll, scrollToElement } from "../../utils/scroll";

/**
 * Resets scroll on route change, but honours in-page hash links so an anchor
 * such as /request-a-quote#what-to-include still lands in the right place.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    /* A route change owns the scroll position outright: abandon any wheel
       glide still in flight from the previous page before placing this one. */
    cancelSmoothScroll();

    if (hash) {
      /*
       * getElementById, not querySelector.
       *
       * An id is allowed to start with a digit; a CSS selector is not. Every
       * heading in the RFQ guide is numbered, so its anchors are ids like
       * "1-the-drawing-with-its-revision", and querySelector("#1-…") does not
       * return null for those — it throws a SyntaxError. Thrown from inside
       * this effect, that unmounts the tree, so clicking an entry in the
       * contents rail blanked the page rather than scrolling to the section.
       *
       * getElementById does no selector parsing and matches the id literally,
       * which is all this ever needed. The ids stay as they are: they are
       * valid HTML, and rewriting them would break any link already shared.
       */
      const id = hash.slice(1);
      const target = id
        ? document.getElementById(decodeURIComponent(id)) ?? document.getElementById(id)
        : null;

      if (target) {
        scrollToElement(target);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
