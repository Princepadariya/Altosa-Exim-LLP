import { useEffect, useState } from "react";

/**
 * Tracks which heading id is currently in view, for a contents rail.
 * The negative bottom margin means a heading only becomes "active" once it
 * reaches the upper third of the viewport, which matches how people read.
 */
export const useActiveHeading = (ids) => {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0 || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

export default useActiveHeading;
