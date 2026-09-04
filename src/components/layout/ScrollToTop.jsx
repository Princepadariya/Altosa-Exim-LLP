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
      const target = document.querySelector(hash);
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
