import { useState, useLayoutEffect } from 'react';

interface ScrollSpyOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useScrollSpy = (ids: string[], { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0 }: ScrollSpyOptions = {}) => {
  const [activeId, setActiveId] = useState<string>('');

  useLayoutEffect(() => {
    const observerOptions = {
      root,
      rootMargin,
      threshold,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let intersectingId = '';
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingId = entry.target.id;
        }
      });
      
      if (intersectingId) {
        setActiveId(intersectingId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [ids, root, rootMargin, threshold]);

  return activeId;
};

export default useScrollSpy;
