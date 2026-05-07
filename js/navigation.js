// Desktop navigation: hover-based panel toggle
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

// Mobile navigation: toggle panel and close on outside click / link click
const menuPanelMobile = document.getElementById('nav-menu-panel');
const menuOpenMobile = document.getElementById('nav-menu-open-mobile');
let mobileOpen = false;

const toggleMobileMenu = (open) => {
  if (!menuPanelMobile) return;
  mobileOpen = open;
  menuPanelMobile.classList.toggle('open', open);
  menuPanelMobile.setAttribute('aria-hidden', String(!open));
  if (menuOpenMobile) menuOpenMobile.setAttribute('aria-expanded', String(open));
  const btn = document.querySelector('.mobile-menu-btn-text');
  if (btn) btn.textContent = open ? 'Закрыть' : 'Меню';
  if (document.body) document.body.style.overflow = open ? 'hidden' : '';
  if (open && typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
};

if (menuOpenMobile) {
  menuOpenMobile.addEventListener('click', () => toggleMobileMenu(!mobileOpen));
}
if (menuPanelMobile) {
  menuPanelMobile.addEventListener('click', (e) => {
    if (e.target === menuPanelMobile) toggleMobileMenu(false);
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileOpen && !menuPanelMobile?.contains(e.target) && !menuOpenMobile?.contains(e.target)) {
    toggleMobileMenu(false);
  }
});

// Close mobile menu on link click; keep desktop menu closing behavior consistent
const menuLinks = Array.from(document.querySelectorAll('.nav-menu-link'));
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMobileMenu(false);
    setDesktopMenuOpen?.(false);
  });
});

// Simple helper to close desktop panel from other modules if needed
function setDesktopMenuOpenGlobal(open){ setDesktopMenuOpen(open); }
