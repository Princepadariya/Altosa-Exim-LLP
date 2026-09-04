import { useEffect } from "react";

import { onScrollCancelled } from "../utils/scroll";

/**
 * Eased wheel scrolling.
 *
 * `scroll-behavior: smooth` in global.css only governs anchor jumps and
 * programmatic scrolls — the wheel is untouched by it, which is why the page
 * still moved in hard steps. This interpolates the wheel instead: each notch
 * moves a target, and the page eases toward that target over a few frames.
 *
 * Deliberately restrained. EASE closes most of the remaining distance every
 * frame, so a notch settles in roughly a tenth of a second — enough to take
 * the edge off the step without the floaty, laggy feel of a full scroll
 * hijack, and short enough that it never fights a fast flick.
 *
 * It stays out of the way in every case where it would do harm:
 *   - touch devices keep native momentum, which is already better than this
 *   - reduced-motion users get the untouched native wheel
 *   - nested scrollers (the mobile drawer, the article tables) scroll normally
 *   - it yields entirely while the body is scroll-locked behind the menu
 *   - pinch-zoom (ctrl + wheel) is left alone
 */

/** Share of the remaining distance closed per frame. Higher is snappier. */
const EASE = 0.18;

/** Anything closer than this is a finished scroll. */
const SETTLE_PX = 0.5;

/**
 * How far the real scroll position may drift from what this loop last wrote
 * before the movement is attributed to something else. Sub-pixel rounding and
 * clamping account for well under a pixel; a route change or an anchor jump
 * moves by hundreds.
 */
const EXTERNAL_SCROLL_TOLERANCE_PX = 4;

/** Rough px-per-unit for mice that report lines or pages instead of pixels. */
const LINE_HEIGHT = 16;
const PAGE_HEIGHT = 800;

const deltaInPixels = (event) => {
  if (event.deltaMode === 1) return event.deltaY * LINE_HEIGHT;
  if (event.deltaMode === 2) return event.deltaY * PAGE_HEIGHT;
  return event.deltaY;
};

/** True when the event started inside something that can still scroll itself. */
const insideScrollableChild = (node, delta) => {
  let element = node instanceof Element ? node : null;

  while (element && element !== document.body && element !== document.documentElement) {
    const { overflowY } = getComputedStyle(element);

    if (/(auto|scroll)/.test(overflowY) && element.scrollHeight > element.clientHeight + 1) {
      const atTop = element.scrollTop <= 0;
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

      // Only defer while that element still has room to move in this direction;
      // once it hits its end the page should take over, as it natively would.
      if (!(delta < 0 && atTop) && !(delta > 0 && atBottom)) return true;
    }

    element = element.parentElement;
  }

  return false;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    /* Queried on every wheel event rather than once at mount: a pointer type
       or motion preference that changes after load should take effect
       immediately, not at the next full reload. */
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isActive = () => finePointer.matches && !reducedMotion.matches;

    let target = window.scrollY;
    let frame = null;
    let animating = false;
    let watchdog = null;
    let lastWritten = null;

    /*
     * The wheel is preventDefault-ed before the eased loop takes over, so if
     * requestAnimationFrame never runs the page would simply stop scrolling.
     * That should not be possible in a visible tab, but "the page will not
     * scroll" is too severe a failure to leave to that assumption: if no frame
     * arrives promptly the enhancement retires itself, drops the reader at the
     * position they asked for, and hands the wheel back to the browser.
     */
    let retired = false;
    const FRAME_TIMEOUT_MS = 250;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const stop = () => {
      animating = false;
      lastWritten = null;
      if (frame) cancelAnimationFrame(frame);
      if (watchdog) clearTimeout(watchdog);
      frame = null;
      watchdog = null;
    };

    const retire = () => {
      retired = true;
      const destination = target;
      stop();
      window.scrollTo({ top: destination, behavior: "instant" });
    };

    const tick = () => {
      if (watchdog) clearTimeout(watchdog);
      watchdog = null;

      const current = window.scrollY;
      const distance = target - current;

      if (Math.abs(distance) < SETTLE_PX) {
        /* `behavior: "instant"` on every write below, and never the two-argument
           scrollTo(x, y): that form obeys the CSS `scroll-behavior: smooth`
           set on <html>, so each frame would ask the browser to start its own
           smooth animation toward a target this loop is already easing toward.
           The two fight, and the result is the sluggish, rubbery scroll the
           easing was supposed to remove. This loop owns the position; the
           browser must place it exactly where it is told. */
        lastWritten = target;
        window.scrollTo({ top: target, behavior: "instant" });
        stop();
        return;
      }

      const next = current + distance * EASE;
      lastWritten = next;
      window.scrollTo({ top: next, behavior: "instant" });
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event) => {
      if (retired || !isActive()) return;
      if (event.ctrlKey || event.defaultPrevented) return;
      if (document.body.dataset.scrollLocked === "true") return;

      const delta = deltaInPixels(event);
      if (!delta) return;
      if (insideScrollableChild(event.target, delta)) return;

      event.preventDefault();

      // Re-anchor to the real position when starting from rest, so a wheel
      // after a keyboard or back-to-top jump does not snap back.
      if (!animating) target = window.scrollY;

      target = Math.min(Math.max(target + delta, 0), maxScroll());

      if (!animating) {
        animating = true;
        frame = requestAnimationFrame(tick);
        watchdog = setTimeout(retire, FRAME_TIMEOUT_MS);
      }
    };

    /*
     * Anything that scrolls the page by other means — a route change resetting
     * to the top, an anchor link, the back-to-top button, the keyboard,
     * find-in-page — owns the position, and this loop must yield to it.
     *
     * Yielding only while idle was not enough. Clicking a footer link during a
     * glide (trivially easy: you wheel down to the footer and click) left the
     * loop still holding the old target, so it dragged the newly-opened page
     * back down to where the previous page had been scrolled to — the new page
     * appeared to open at its bottom.
     *
     * `lastWritten` is what this loop last told the browser. A scroll event
     * that does not match it came from somewhere else, so the glide is
     * abandoned rather than resumed.
     */
    const onExternalScroll = () => {
      if (!animating) {
        target = window.scrollY;
        return;
      }

      if (
        lastWritten === null ||
        Math.abs(window.scrollY - lastWritten) > EXTERNAL_SCROLL_TOLERANCE_PX
      ) {
        stop();
        target = window.scrollY;
      }
    };

    /* The deterministic hand-off: a route change or a programmatic scroll
       announces itself here, so the glide is dropped before the new position
       is written rather than after, leaving nothing to race. */
    const unsubscribe = onScrollCancelled(() => {
      stop();
      target = window.scrollY;
    });

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onExternalScroll, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onExternalScroll);
      stop();
    };
  }, []);
};

export default useSmoothScroll;
