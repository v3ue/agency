/**
 * Application entry point.
 * Each module is self-contained: it checks for its own DOM elements
 * and silently returns if they are absent (multi-page safety).
 */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Core UI
    await import('./navigation.js');
    await import('./video-modal.js');
    await import('./hero-video.js');

    // Sections
    const projectsModule = await import('./projects-section.js');
    projectsModule.initProjects();
    const competenciesModule = await import('./competencies.js');
    competenciesModule.default();
    await import('./process-anim.js');

    // Page-level interactions + form + CTA
    const pageInteractionsModule = await import('./page-interactions.js');
    pageInteractionsModule.default();
    await import('./cta-toggle.js');

    // Testimonials
    const testimonialsModule = await import('./testimonials.js');
    testimonialsModule.initTestimonials();
  } catch (err) {
    console.error('Failed to initialize modules', err);
  }
});
