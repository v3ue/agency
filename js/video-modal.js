// Video modal handler with full playback controls
const modal = document.getElementById('video-modal');
if (modal) {
  const overlay = modal.querySelector('.video-modal-overlay');
  const closeBtn = modal.querySelector('#modal-close-btn');
  const modalVideo = modal.querySelector('#modal-video');
  const pauseBtn = modal.querySelector('#modal-pause-btn');
  const soundBtn = modal.querySelector('#modal-sound-btn');
  const soundOffIcon = modal.querySelector('#sound-off-icon');
  const soundOnIcon = modal.querySelector('#sound-on-icon');

  let heroVideo = null;
  let heroWasPlaying = false;

  const updatePauseIcon = (paused) => {
    if (!pauseBtn) return;
    if (paused) {
      pauseBtn.innerHTML = '<svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 1L12 4L2 7V1Z" fill="currentColor"></path></svg>';
      pauseBtn.setAttribute('aria-label', 'Play');
      pauseBtn.classList.remove('RHTV-Modal_pause__qrFyx');
      pauseBtn.classList.add('RHTV-Modal_play__abc');
    } else {
      pauseBtn.innerHTML = '<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.5 7.5H2.5V0.5L5.5 0.5V7.5Z" fill="currentColor"></path><path d="M9.5 7.5H6.5V0.5L9.5 0.5V7.5Z" fill="currentColor"></path></svg>';
      pauseBtn.setAttribute('aria-label', 'Pause');
      pauseBtn.classList.add('RHTV-Modal_pause__qrFyx');
      pauseBtn.classList.remove('RHTV-Modal_play__abc');
    }
  };

  const updateSoundIcon = (muted) => {
    if (!soundOffIcon || !soundOnIcon || !soundBtn) return;
    soundOffIcon.style.display = muted ? 'block' : 'none';
    soundOnIcon.style.display = muted ? 'none' : 'block';
    soundBtn.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
  };

  const openModal = (src, heroVid) => {
    if (!modalVideo) return;
    heroVideo = heroVid || null;
    heroWasPlaying = heroVideo ? !heroVideo.paused : false;
    if (heroVideo) heroVideo.pause();

    modalVideo.src = src || '';
    modalVideo.muted = true;
    modalVideo.currentTime = 0;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const playWhenReady = () => {
      modalVideo.play().catch(e => console.log('Play failed:', e));
      modalVideo.removeEventListener('loadeddata', playWhenReady);
    };
    modalVideo.addEventListener('loadeddata', playWhenReady);

    updatePauseIcon(false);
    updateSoundIcon(true);
  };

  const closeModal = () => {
    if (!modalVideo) return;
    modalVideo.pause();
    modalVideo.src = '';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (heroVideo && heroWasPlaying) {
      heroVideo.play();
      heroWasPlaying = false;
    }
  };

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
      const heroBtn = document.getElementById('hero-video-btn');
      if (heroBtn) heroBtn.focus();
    }
  });

  if (pauseBtn && modalVideo) {
    pauseBtn.addEventListener('click', () => {
      if (modalVideo.paused) {
        modalVideo.play();
        updatePauseIcon(false);
      } else {
        modalVideo.pause();
        updatePauseIcon(true);
      }
    });
  }

  if (soundBtn && modalVideo) {
    soundBtn.addEventListener('click', () => {
      modalVideo.muted = !modalVideo.muted;
      updateSoundIcon(modalVideo.muted);
    });
  }

  document.querySelectorAll('[data-video-src]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const src = el.getAttribute('data-video-src');
      if (src) openModal(src);
    });
  });

  window.openVideoModal = openModal;
}
