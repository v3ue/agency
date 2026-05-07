// Hero banner video button with mouse tracking and modal integration
const heroVideoBtn = document.getElementById('hero-video-btn');
const heroBanner = document.getElementById('hero-banner');
const heroBannerVideo = document.getElementById('hero-banner-video');

if (heroBanner && heroVideoBtn && heroBannerVideo) {
  const btnSizes = new Map();

  heroBanner.addEventListener('mouseenter', () => {
    heroBanner.style.cursor = 'none';
    heroVideoBtn.style.display = 'flex';
    heroVideoBtn.style.pointerEvents = 'auto';
    requestAnimationFrame(() => {
      if (!btnSizes.has(heroVideoBtn)) {
        btnSizes.set(heroVideoBtn, {
          width: heroVideoBtn.offsetWidth,
          height: heroVideoBtn.offsetHeight
        });
      }
      heroVideoBtn.style.opacity = '1';
    });
  });

  heroBanner.addEventListener('mousemove', (e) => {
    const rect = heroBanner.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const size = btnSizes.get(heroVideoBtn) || { width: 120, height: 30 };
    const btnW = size.width;
    const btnH = size.height;

    const minX = btnW / 2;
    const maxX = rect.width - btnW / 2;
    const minY = btnH / 2;
    const maxY = rect.height - btnH / 2;

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    heroVideoBtn.style.left = x + 'px';
    heroVideoBtn.style.top = y + 'px';
    heroVideoBtn.style.transform = 'translate(-50%, -50%)';
  });

  const hideBtn = () => {
    heroBanner.style.cursor = 'default';
    heroVideoBtn.style.opacity = '0';
    heroVideoBtn.style.pointerEvents = 'none';
    setTimeout(() => {
      if (heroVideoBtn.style.opacity === '0') {
        heroVideoBtn.style.display = 'none';
      }
    }, 200);
  };

  heroBanner.addEventListener('mouseleave', (e) => {
    if (heroVideoBtn.contains(e.relatedTarget)) return;
    hideBtn();
  });

  heroVideoBtn.addEventListener('mouseenter', () => {
    heroVideoBtn.style.opacity = '1';
    heroVideoBtn.style.pointerEvents = 'auto';
    heroBanner.style.cursor = 'pointer';
  });

  heroVideoBtn.addEventListener('mouseleave', (e) => {
    if (heroBanner.contains(e.relatedTarget)) {
      heroBanner.style.cursor = 'none';
      return;
    }
    hideBtn();
  });

  heroVideoBtn.addEventListener('click', () => {
    if (typeof window.openVideoModal === 'function') {
      window.openVideoModal(heroBannerVideo.src, heroBannerVideo);
    }
  });
}
