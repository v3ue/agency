// components.js - Инициализация меню

// Инициализация десктопного меню
function initDesktopMenu() {
  const desktopPill = document.getElementById('desktop-nav-pill');
  const menuPanelDesktop = document.getElementById('nav-menu-panel-desktop');
  const menuOpenDesktop = document.getElementById('nav-menu-open-desktop');
  const desktopDot = document.querySelector('.nav-menu-open-dot');
  let desktopCloseTimer = null;

  const setDesktopMenuOpen = (open) => {
    if (!menuPanelDesktop) return;
    menuPanelDesktop.classList.toggle('open', open);
    menuPanelDesktop.setAttribute('aria-hidden', String(!open));
    if (menuOpenDesktop) menuOpenDesktop.setAttribute('aria-expanded', String(open));
    if (desktopDot) desktopDot.style.opacity = open ? '0' : '1';
    if (desktopPill) desktopPill.classList.toggle('menu-open', open);
    if (open) clearTimeout(desktopCloseTimer);
  };

  if (desktopPill) {
    desktopPill.addEventListener('mouseenter', () => setDesktopMenuOpen(true));
    desktopPill.addEventListener('mouseleave', () => {
      desktopCloseTimer = window.setTimeout(() => setDesktopMenuOpen(false), 180);
    });
  }
  if (menuPanelDesktop) {
    menuPanelDesktop.addEventListener('mouseenter', () => setDesktopMenuOpen(true));
    menuPanelDesktop.addEventListener('mouseleave', () => {
      desktopCloseTimer = window.setTimeout(() => setDesktopMenuOpen(false), 180);
    });
  }
}

// Инициализация мобильного меню
function initMobileMenu() {
  const menuPanelMobile = document.getElementById('nav-menu-panel');
  const menuOpenMobile = document.getElementById('nav-menu-open-mobile');
  const menuDotMobile = document.querySelector('.menu-dot');
  const menuBtnText = document.querySelector('.mobile-menu-btn-text');
  let mobileOpen = false;

  const toggleMobileMenu = (open) => {
    if (!menuPanelMobile) return;
    mobileOpen = open;
    menuPanelMobile.classList.toggle('open', open);
    menuPanelMobile.setAttribute('aria-hidden', String(!open));
    if (menuOpenMobile) menuOpenMobile.setAttribute('aria-expanded', String(open));
    if (menuDotMobile) menuDotMobile.style.opacity = open ? '0' : '1';
    if (menuBtnText) menuBtnText.textContent = open ? 'Закрыть' : 'Меню';
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (menuOpenMobile) {
    menuOpenMobile.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu(!mobileOpen);
    });
  }
  if (menuPanelMobile) {
    menuPanelMobile.addEventListener('click', (e) => {
      if (e.target === menuPanelMobile) toggleMobileMenu(false);
    });
  }
  
  // Закрытие по клику на ссылки
  if (menuPanelMobile) {
    menuPanelMobile.querySelectorAll('.nav-menu-link').forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
  }
}

// Инициализация всех компонентов меню
function initAllComponents() {
  initDesktopMenu();
  initMobileMenu();
  initHeaderScroll();
}

// Инициализация скролла хедера
function initHeaderScroll() {
  const leftPill = document.getElementById('desktop-nav-pill');
  const rightPill = document.getElementById('header-right-pill');
  if (!leftPill && !rightPill) return;  
  
  // Порог скролла - весь первый экран
  let scrollThreshold = window.innerHeight * 0.8;
  let ticking = false;

  const updateHeader = () => {
    const scrollY = window.scrollY;

    // Левая плашка: фон всегда после первого экрана
    if (leftPill) {
      const shouldHaveBg = scrollY > scrollThreshold;
      if (shouldHaveBg) {
        leftPill.classList.add('has-bg');
      } else {
        leftPill.classList.remove('has-bg');
      }
    }
    
    // Правая плашка: фон всегда после первого экрана (без скрытия)
    if (rightPill) {
      const shouldHaveBg = scrollY > scrollThreshold;
      if (shouldHaveBg) {
        rightPill.classList.add('has-bg');
      } else {
        rightPill.classList.remove('has-bg');
      }
      // Убираем scroll-hidden навсегда
      rightPill.classList.remove('scroll-hidden');
      // Убираем inline-стили, которые могли остаться
      rightPill.style.opacity = '';
      rightPill.style.transform = '';
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    scrollThreshold = window.innerHeight * 0.8;
  });

  // Инициализация при загрузке
  updateHeader();
}
    
    // Правая плашка: фон всегда после первого экрана (без скрытия при скролле)
    if (rightPill) {
      rightPill.classList.toggle('has-bg', scrollY > scrollThreshold);
      // Убираем scroll-hidden, если он был добавлен ранее
      rightPill.classList.remove('scroll-hidden');
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    scrollThreshold = window.innerHeight * 0.6;
  });

  // Инициализация при загрузке
  updateHeader();
}
