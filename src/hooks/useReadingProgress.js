import { useEffect, useState } from "react";

/**
 * How far the reader has scrolled through an element, as 0–1.
 * Attach the returned ref to the article body; the value drives the progress
 * bar. Reads are throttled to one per animation frame.
 */
export const useReadingProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const { top, height } = element.getBoundingClientRect();
      // Distance scrolled past the top of the article, over the distance
      // there is to scroll before its end reaches the bottom of the viewport.
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(top <= 0 ? 1 : 0);
        return;
      }
      setProgress(Math.min(Math.max(-top / scrollable, 0), 1));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
};

export default useReadingProgress;
