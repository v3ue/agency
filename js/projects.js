// Projects video switching with scroll, thumbnails, and auto-rotate
(function(){
  const rootVideo = document.getElementById('currentVideo');
  const videoDisplay = document.getElementById('videoDisplay');
  const videoTitleEl = document.getElementById('videoTitle');
  const videoDescriptionEl = document.getElementById('videoDescription');
  const thumbnailBtns = Array.from(document.querySelectorAll('.thumbnail-btn-vertical'));
  const thumbnailIndicator = document.getElementById('thumbnailIndicator');

  const projects = [
    {
      title: 'Изофом',
      video: './static/videos/Изофом.mov',
      poster: './static/images/4lg5t-1.jpg',
      desc: 'Серия объясняющих роликов для производителя строительного материала.',
      isVertical: false
    },
    {
      title: 'C-Tea',
      video: './static/videos/C-Tea.mov',
      poster: './static/images/frame-12@2x.png',
      desc: 'Серия маркетинговых роликов для продуктовой линейки локального заведения.',
      isVertical: true
    },
    {
      title: 'Янта',
      video: './static/videos/Yanta.mp4',
      poster: './static/images/hf-20260428-171201-db32a14f-5f28-4856-bad4-6b4aef3c6ff0-1.png',
      desc: 'Рекламный ролик для FMCG-бренда с точной передачей упаковки.',
      isVertical: false
    },
    {
      title: 'Особый ремонт',
      video: './static/videos/Gussi Rem.mp4',
      poster: './static/images/6l06a-1.png',
      desc: 'Брендовый ролик в стиле «Миссия невыполнима» для компании, занимающейся ремонтом недвижимости.',
      isVertical: false
    }
  ];

  let currentIndex = -1;
  let isLocked = false;
  let autoRotateTimer = null;

  const switchProject = (index) => {
    if (index < 0 || index >= projects.length || isLocked || index === currentIndex) return;
    isLocked = true;
    currentIndex = index;
    const proj = projects[currentIndex];

    if (rootVideo) {
      rootVideo.style.opacity = '0';
      setTimeout(() => {
        if (proj.video) {
          const isMov = proj.video.endsWith('.mov');
          const objectFit = proj.isVertical ? 'contain' : 'cover';
          rootVideo.innerHTML =
            '<video id="mainVideo" muted loop playsinline poster="' + proj.poster + '" ' +
            'style="width:100%;height:100%;object-fit:' + objectFit + ';border-radius:12px;' +
            'transition:object-fit 0.3s ease;transform:translateZ(0);">' +
            '<source src="' + proj.video + '" type="' + (isMov ? 'video/quicktime' : 'video/mp4') + '">' +
            '</video>';

          if (proj.isVertical && videoDisplay) {
            videoDisplay.style.backgroundColor = '#000';
          }

          const v = document.getElementById('mainVideo');
          if (v) {
            v.play().catch(() => {});
          }
        } else {
          rootVideo.innerHTML = '<img src="' + proj.poster + '" style="width:100%;height:100%;object-fit:cover;">';
        }
        rootVideo.style.opacity = '1';
      }, 300);
    }

    if (videoTitleEl) videoTitleEl.textContent = proj.title;
    if (videoDescriptionEl) videoDescriptionEl.textContent = proj.desc;

    thumbnailBtns.forEach((btn, idx) => btn.classList.toggle('active', idx === currentIndex));

    if (thumbnailIndicator) {
      thumbnailIndicator.classList.add('visible');
      const btnHeight = 50 + 12;
      thumbnailIndicator.style.transform = 'translateY(' + (currentIndex * btnHeight) + 'px)';
    }

    setTimeout(() => { isLocked = false; }, 400);
  };

  thumbnailBtns.forEach((btn) => {
    const idx = parseInt(btn.dataset.index, 10);
    btn.addEventListener('click', () => {
      if (!isNaN(idx)) switchProject(idx);
    });
  });

  switchProject(0);

  autoRotateTimer = setInterval(() => {
    const next = (currentIndex + 1) % projects.length;
    switchProject(next);
  }, 5000);

  thumbnailBtns.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      clearInterval(autoRotateTimer);
    });
    btn.addEventListener('click', () => {
      clearInterval(autoRotateTimer);
      setTimeout(() => {
        autoRotateTimer = setInterval(() => {
          const nextIndex = (currentIndex + 1) % projects.length;
          switchProject(nextIndex);
        }, 5000);
      }, 10000);
    });
  });
})();
