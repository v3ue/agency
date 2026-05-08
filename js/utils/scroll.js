/**
 * Scroll utilities
 * Throttled scroll listener using requestAnimationFrame.
 */

/**
 * Subscribe to scroll events with rAF throttling.
 * @param {Function} callback - invoked on each scroll tick
 * @returns {Function} unsubscribe function
 */
export function onScroll(callback) {
  let ticking = false;

  const handler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handler, { passive: true });

  return () => window.removeEventListener('scroll', handler);
}
