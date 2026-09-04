import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `offset`. Drives the header's
 * condensed state. Reads are throttled to one per animation frame.
 */
export const useScrolled = (offset = 24) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      setIsScrolled(window.scrollY > offset);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset]);

  return isScrolled;
};

export default useScrolled;
