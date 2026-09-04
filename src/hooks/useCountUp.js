import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up from zero the first time the element enters the viewport.
 * Returns `[ref, value]` — attach the ref to the element that holds the number.
 * Respects prefers-reduced-motion by jumping straight to the target.
 */
export const useCountUp = (target, { duration = 1600, decimals = 0 } = {}) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof target !== "number") return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setValue(target);
      return undefined;
    }

    let frame;

    const run = (startTime) => {
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo — fast start, settled finish.
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const next = target * eased;
        setValue(Number(next.toFixed(decimals)));
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
  }, [target, duration, decimals]);

  return [ref, value];
};

export default useCountUp;
