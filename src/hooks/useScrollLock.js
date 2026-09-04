import { useEffect } from "react";

/**
 * Locks body scroll while a value is true — used by the mobile menu.
 * Compensates for the scrollbar so the page does not shift on lock.
 */
export const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return undefined;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousPadding = body.style.paddingRight;

    body.dataset.scrollLocked = "true";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      delete body.dataset.scrollLocked;
      body.style.paddingRight = previousPadding;
    };
  }, [isLocked]);
};

export default useScrollLock;
