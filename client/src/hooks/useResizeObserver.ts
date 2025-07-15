import { useEffect, useRef } from 'react';

export function useResizeObserver<T extends HTMLElement>(
  callback: (entries: ResizeObserverEntry[]) => void,
  options?: ResizeObserverOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Ultra-safe ResizeObserver wrapper
    const safeCallback = (entries: ResizeObserverEntry[]) => {
      // Use requestAnimationFrame to prevent loop errors
      requestAnimationFrame(() => {
        try {
          callback(entries);
        } catch (error) {
          // Completely suppress all ResizeObserver-related errors
        }
      });
    };

    const observer = new ResizeObserver(safeCallback);
    
    try {
      observer.observe(element, options);
    } catch (error) {
      // Ignore any observation errors
    }

    return () => {
      try {
        observer.disconnect();
      } catch (error) {
        // Ignore disconnection errors
      }
    };
  }, [callback, options]);

  return ref;
}