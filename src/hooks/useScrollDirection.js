import { useEffect, useState } from "react";

/**
 * True while the reader is scrolling down, so the header can trade its
 * floating rounded shape for an edge-to-edge bar and take it back the moment
 * they scroll up.
 *
 * Reads are throttled to one animation frame, matching useScrolled — a scroll
 * listener that measures on every event is the classic way to make a page feel
 * heavy under the finger.
 */

/**
 * Movement below this is ignored, so a trackpad's jitter or the bounce at the
 * end of a flick cannot flip the header. The last offset is not reset when a
 * small move is ignored, so slow scrolling still accumulates to a decision.
 */
const MIN_DELTA_PX = 6;

/**
 * Near the top the header keeps its floating shape whatever the direction.
 * There is nothing behind it to butt against yet, and morphing on the first
 * few pixels of a scroll reads as a glitch rather than a response.
 */
const FLOATING_ABOVE_PX = 120;

/**
 * The whole decision, as a pure function so it can be reasoned about and
 * tested without a scroll container: true to expand to full width, false to
 * return to the pill, or null when the movement is too small to mean anything.
 */
export const directionDecision = (y, lastY) => {
  const delta = y - lastY;
  if (Math.abs(delta) < MIN_DELTA_PX) return null;
  return y > FLOATING_ABOVE_PX && delta > 0;
};

export const useScrollDirection = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = null;

    const update = () => {
      frame = null;
      const decision = directionDecision(window.scrollY, lastY);

      if (decision === null) return;

      setIsScrollingDown(decision);
      lastY = window.scrollY;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return isScrollingDown;
};

export default useScrollDirection;
