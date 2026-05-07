// Hero banner video controls (optional lightweight behavior)
const heroVideoBtn = document.getElementById('hero-video-btn');
const heroBannerVideo = document.getElementById('hero-banner-video');
if (heroVideoBtn && heroBannerVideo) {
  heroVideoBtn.addEventListener('click', () => {
    if (heroBannerVideo.paused) {
      heroBannerVideo.play().catch(() => {});
    } else {
      heroBannerVideo.pause();
    }
  });
}
