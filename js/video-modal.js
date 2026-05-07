// Simple video modal handler
const modal = document.getElementById('video-modal');
if (modal) {
  const overlay = modal.querySelector('.video-modal-overlay');
  const closeBtn = modal.querySelector('#modal-close-btn');
  const modalVideo = modal.querySelector('#modal-video');

  const openModal = (src) => {
    if (!modalVideo) return;
    modalVideo.src = src || '';
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    try { modalVideo.play(); } catch(e) { /* ignore autoplay blocks */ }
  };

  const closeModal = () => {
    if (!modalVideo) return;
    modalVideo.pause?.();
    modalVideo.src = '';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  };

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Attach listeners for any elements with data-video-src attribute
  document.querySelectorAll('[data-video-src]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const src = el.getAttribute('data-video-src');
      if (src) openModal(src);
    });
  });
}
