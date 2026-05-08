/**
 * IntersectionObserver utilities
 */

/**
 * Observe a set of elements and invoke a callback for each entry.
 * @param {Element[]|NodeList} elements
 * @param {Function} callback - (element: Element, isIntersecting: boolean, entry: IntersectionObserverEntry) => void
 * @param {IntersectionObserverInit} [options={}]
 * @returns {IntersectionObserver}
 */
export function observeVisible(elements, callback, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      callback(entry.target, entry.isIntersecting, entry);
    });
  }, options);

  Array.from(elements).forEach((el) => observer.observe(el));
  return observer;
}

/**
 * Observe a single element and invoke callback when visibility changes.
 * @param {Element} element
 * @param {Function} callback - (isIntersecting: boolean, entry: IntersectionObserverEntry) => void
 * @param {IntersectionObserverInit} [options={}]
 * @returns {IntersectionObserver}
 */
export function observeElement(element, callback, options = {}) {
  if (!element) return null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => callback(entry.isIntersecting, entry));
  }, options);

  observer.observe(element);
  return observer;
}
