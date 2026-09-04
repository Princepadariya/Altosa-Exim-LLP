/**
 * Scroll behaviour for programmatic jumps.
 *
 * CSS `scroll-behavior: smooth` on <html> covers anchor navigation and is
 * already disabled under prefers-reduced-motion. Neither applies to a JS call
 * that passes `behavior: "smooth"` explicitly — that overrides the stylesheet
 * and ignores the media query — so both concerns are handled here instead.
 */

/**
 * Smooth reads well over a screen or two. Over the length of this homepage it
 * does not: the glide runs for seconds, the text is unreadable throughout, and
 * the reader has lost their place well before it lands. Past this many
 * viewport heights we jump instead of animating.
 */
const MAX_SMOOTH_VIEWPORTS = 2.5;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** `smooth` for a short hop, `instant` for a long one or a reduced-motion user. */
export const behaviorForDistance = (distance) => {
  if (prefersReducedMotion()) return "instant";
  return Math.abs(distance) > window.innerHeight * MAX_SMOOTH_VIEWPORTS
    ? "instant"
    : "smooth";
};

export const scrollToTop = () => {
  cancelSmoothScroll();
  window.scrollTo({ top: 0, behavior: behaviorForDistance(window.scrollY) });
};

/** Scrolls an element into view, gliding only when it is already close by. */
export const scrollToElement = (element) => {
  cancelSmoothScroll();
  const distance = element.getBoundingClientRect().top;
  element.scrollIntoView({
    behavior: behaviorForDistance(distance),
    block: "start",
  });
};

/*
 * A glide started by the wheel must be abandoned the moment anything else
 * takes charge of the scroll position — above all a route change, which resets
 * to the top. Comparing positions after the fact is not enough: the eased loop
 * and the reset race each other, and when the loop's next frame lands first it
 * re-reads the new position and keeps pulling toward the old page's target,
 * dragging the freshly opened page back down. This is an explicit hand-off
 * instead, so there is nothing to race.
 */
const cancelListeners = new Set();

/** Registers a canceller; returns the unsubscribe. Used by useSmoothScroll. */
export const onScrollCancelled = (listener) => {
  cancelListeners.add(listener);
  return () => cancelListeners.delete(listener);
};

/** Abandons any wheel glide in flight. Call before taking over the position. */
export const cancelSmoothScroll = () => {
  cancelListeners.forEach((listener) => listener());
};
