document.addEventListener('DOMContentLoaded', async () => {
  try {
    await import('./navigation.js');
    await import('./competencies.js');
    await import('./video-modal.js');
    await import('./hero-video.js');
    await import('./process-anim.js');
    await import('./page-interactions.js');
  } catch (err) {
    console.error('Failed to initialize modules', err);
  }
});
