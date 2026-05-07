document.addEventListener('DOMContentLoaded', async () => {
  // Lazy-load modules after DOM is ready to ensure DOM nodes exist
  try {
    await import('./navigation.js');
    await import('./competencies.js');
    await import('./video-modal.js');
    await import('./hero-video.js');
    await import('./process-anim.js');
    await import('./projects.js');
  } catch (err) {
    console.error('Failed to initialize modules', err);
  }
});
