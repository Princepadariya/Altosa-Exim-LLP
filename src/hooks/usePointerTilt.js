import { useEffect, useRef } from "react";

/**
 * Subtle pointer-reactive tilt for a panel.
 *
 * Writes --tilt-x / --tilt-y / --shift-x / --shift-y onto the element rather
 * than setting transforms directly, so the stylesheet stays in charge of how
 * the values are used. Skipped entirely for touch pointers and under reduced
 * motion, where a tilt is either meaningless or unwelcome.
 *
 * @param max  maximum rotation in degrees at the edge of the element
 */
export const usePointerTilt = (max = 5) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return undefined;

    let frame = null;

    const apply = (event) => {
      frame = null;
      const { left, top, width, height } = element.getBoundingClientRect();
      // -0.5 … 0.5 from the centre of the panel.
      const x = (event.clientX - left) / width - 0.5;
      const y = (event.clientY - top) / height - 0.5;

      element.style.setProperty("--tilt-y", `${x * max}deg`);
      element.style.setProperty("--tilt-x", `${-y * max}deg`);
      element.style.setProperty("--shift-x", `${x * -14}px`);
      element.style.setProperty("--shift-y", `${y * -14}px`);
    };

    const onMove = (event) => {
      if (frame === null) frame = requestAnimationFrame(() => apply(event));
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--shift-x", "0px");
      element.style.setProperty("--shift-y", "0px");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    element.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
};

export default usePointerTilt;
