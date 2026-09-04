import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element inside the tree once it scrolls into
 * view, by adding `.is-visible`. One observer serves the whole page, and
 * elements are unobserved after revealing so nothing re-runs on scroll back.
 *
 * Mounted once in App; components only need the `data-reveal` attribute.
 */
export const useReveal = ({ threshold = 0.12, rootMargin = "0px 0px -8% 0px" } = {}) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveal = (element) => element.classList.add("is-visible");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((element) => observer.observe(element));
    };

    observeAll();

    // Catch elements added by route changes, filters or accordions.
    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin]);
};

export default useReveal;
