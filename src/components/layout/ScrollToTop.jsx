import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on route change, but honours in-page hash links so an anchor
 * such as /request-a-quote#what-to-include still lands in the right place.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
