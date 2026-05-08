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
    const projectsModule = await import('./projects.js');
    projectsModule.initProjects();
    await import('./competencies.js');
    await import('./process-anim.js');

    // Page-level interactions + form + CTA
    await import('./page-interactions.js');
    await import('./cta-toggle.js');
  } catch (err) {
    console.error('Failed to initialize modules', err);
  }
});
