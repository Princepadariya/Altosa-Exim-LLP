import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up from zero the first time the element enters the viewport.
 * Returns `[ref, value]` — attach the ref to the element that holds the number.
 * Respects prefers-reduced-motion by showing the target immediately.
 */

/**
 * Cases where there is nothing to animate: the reader has asked for reduced
 * motion, or the browser cannot tell us when the element comes into view.
 */
const skipAnimation = () =>
  typeof window === "undefined" ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  !("IntersectionObserver" in window);

export const useCountUp = (target, { duration = 1600, decimals = 0 } = {}) => {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(0);
  const hasRun = useRef(false);

  const skip = skipAnimation();

  useEffect(() => {
    const element = ref.current;
    if (skip || !element || typeof target !== "number") return undefined;

    let frame;

    const run = (startTime) => {
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo — fast start, settled finish.
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const next = target * eased;
        setAnimated(Number(next.toFixed(decimals)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasRun.current) return;
          hasRun.current = true;
          run(performance.now());
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [skip, target, duration, decimals]);

  /*
   * Derived at render rather than pushed into state from the effect. The old
   * version called setValue(target) inside the effect for the reduced-motion
   * and no-IntersectionObserver cases, which is a second render to reach a
   * value that was already known — and it went stale if `target` changed while
   * skipping, because the effect returned early.
   */
  return [ref, skip ? target : animated];
};

export default useCountUp;
