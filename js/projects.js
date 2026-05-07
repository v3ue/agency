// Simple client-side Projects viewer: renders and cycles video content in the Projects section
(function(){
  const rootVideo = document.getElementById('currentVideo');
  const videoTitleEl = document.getElementById('videoTitle');
  const videoDescriptionEl = document.getElementById('videoDescription');
  const thumbnailBtns = Array.from(document.querySelectorAll('.thumbnail-btn-vertical'));
  const thumbnailIndicator = document.getElementById('thumbnailIndicator');

  const projects = [
    { title: 'Изофом', video: './static/videos/Изофом.mov', poster: './static/images/4lg5t-1.jpg', desc: 'Серия объясняющих роликов для производителя строительного материала.' },
    { title: 'C-Tea', video: './static/videos/C-Tea.mov', poster: './static/images/frame-12@2x.png', desc: 'Серия маркетинговых роликов для продуктовой линейки локального заведения.' },
    { title: 'Янта', video: './static/videos/Yanta.mp4', poster: './static/images/hf-20260428-171201-db32a14f-5f28-4856-bad4-6b4aef3c6ff0-1.png', desc: 'Рекламный ролик для FMCG-бренда с точной передачей упаковки.' },
    { title: 'Особый ремонт', video: './static/videos/Gussi Rem.mp4', poster: './static/images/6l06a-1.png', desc: 'Брендовый ролик в стиле «Миссия невыполнима» для компании.' }
  ];
  let currentIndex = -1;
  let isLocked = false;
  let autoRotateTimer = null;

  const switchProject = (index) => {
    if (index < 0 || index >= projects.length || isLocked || index === currentIndex) return;
    isLocked = true;
    currentIndex = index;
    const proj = projects[currentIndex];
    // Replace video content
    if (!rootVideo) return;
    rootVideo.innerHTML = '';
    const videoWrapper = document.createElement('video');
    videoWrapper.id = 'mainVideo';
    videoWrapper.muted = true;
    videoWrapper.loop = true;
    videoWrapper.playsInline = true;
    videoWrapper.style.width = '100%';
    videoWrapper.style.height = '100%';
    videoWrapper.style.objectFit = 'cover';
    videoWrapper.src = proj.video;
    rootVideo.appendChild(videoWrapper);
    videoWrapper.play().catch(()=>{});
    // Update title/description
    if (videoTitleEl) videoTitleEl.textContent = proj.title;
    if (videoDescriptionEl) videoDescriptionEl.textContent = proj.desc;
    // Update thumbnails active state
    thumbnailBtns.forEach((btn, idx) => btn.classList.toggle('active', idx === index));
    // Move indicator if present
    if (thumbnailIndicator) {
      thumbnailIndicator.classList.add('visible');
      const btnHeight = 50 + 12; // thumbnail height + gap
      thumbnailIndicator.style.transform = 'translateY(' + (index * btnHeight) + 'px)';
    }
    // Allow next transitions after short delay
    setTimeout(() => { isLocked = false; }, 400);
  };

  // Bind clicks to thumbnails
  thumbnailBtns.forEach((btn) => {
    const idx = parseInt(btn.dataset.index, 10);
    btn.addEventListener('click', () => {
      if (!isNaN(idx)) switchProject(idx);
    });
  });

  // Init first project
  switchProject(0);

  // Auto-rotate every 5 seconds
  autoRotateTimer = setInterval(() => {
    const next = (currentIndex + 1) % projects.length;
    switchProject(next);
  }, 5000);
  // Pause auto-rotate on user interaction with thumbnails
  thumbnailBtns.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      clearInterval(autoRotateTimer);
    });
    btn.addEventListener('click', () => {
      clearInterval(autoRotateTimer);
      setTimeout(() => {
        autoRotateTimer = setInterval(function() {
          var nextIndex = (currentIndex + 1) % projects.length;
          switchProject(nextIndex);
        }, 5000);
      }, 10000);
    });
  });
})();
