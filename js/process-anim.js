// Timeline animation for the "Понятный путь ведения проекта" section
// - Animates steps into view and fills a progress indicator based on visible steps
(() => {
  const steps = Array.from(document.querySelectorAll('.process-step'));
  const stepsContainer = document.querySelector('.process-steps');
  if (!steps.length || !stepsContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
    const lastVisibleIndex = steps.reduce((result, step, index) => {
      return step.classList.contains('visible') ? index : result;
    }, -1);
    const pct = ((lastVisibleIndex + 1) / steps.length) * 100;
    stepsContainer.style.setProperty('--fill-pct', `${pct}%`);
  }, { threshold: 0.4, rootMargin: '0px 0px -20% 0px' });

  steps.forEach((step) => observer.observe(step));
})();
