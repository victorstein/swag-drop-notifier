import { useState, useRef, useCallback } from 'react';

export function useIntersection(options?: IntersectionObserver) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useCallback(
    (element: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
      if (element === null) {
        setEntry(null);
        return;
      }
      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry);
      }, options);
      observer.current.observe(element);
    },
    [options?.rootMargin, options?.root, options?.thresholds],
  );
  return { ref, entry };
}
