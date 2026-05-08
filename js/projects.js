/**
 * Projects section logic
 * Desktop: fixed thumbnails on the left, centered videos, bottom-left info panel.
 * Mobile: linear list with inline titles.
 */

import { projects } from './projects-data.js';
import { onScroll } from './utils/scroll.js';

const DESKTOP_MIN_WIDTH = 1024;
const RESIZE_DEBOUNCE_MS = 150;

let activeId = -1;
let isUserInteracting = false;
let resizeTimeout = null;

/** Root DOM elements (queried once) */
function getElements() {
  return {
    thumbnailList: document.getElementById('project-thumbnail-list'),
    showcase: document.getElementById('project-showcase'),
    mobileContainer: document.getElementById('projects-mobile'),
    info: document.getElementById('project-info-fixed'),
    sidebar: document.getElementById('projects-sidebar'),
    section: document.getElementById('projects'),
  };
}

/** Build fixed thumbnail strip (desktop only) */
function buildThumbnails(thumbnailList) {
  if (!thumbnailList) return;

  thumbnailList.innerHTML = '';

  projects.forEach((project) => {
    const btn = document.createElement('button');
    btn.className = 'project-thumbnail-item';
    btn.dataset.id = String(project.id);
    btn.innerHTML = `<img src="${project.poster}" alt="${project.title}">`;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      isUserInteracting = true;
      setActive(project.id);
      scrollToCard(project.id);
      setTimeout(() => { isUserInteracting = false; }, 1500);
    });

    thumbnailList.appendChild(btn);
  });
}

/** Build desktop video showcase */
function buildShowcase(showcase) {
  showcase.innerHTML = '';

  projects.forEach((project) => {
    const wrapperClass = project.isVertical
      ? 'project-video-container vertical'
      : 'project-video-container';

    const card = document.createElement('div');
    card.className = 'project-card';
    card.id = `project-card-${project.id}`;
    card.innerHTML = `
      <div class="${wrapperClass}">
        <video muted loop playsinline preload="metadata" poster="${project.poster}" class="project-video">
          <source src="${project.video}" type="${project.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}">
        </video>
      </div>
    `;

    showcase.appendChild(card);
  });
}

/** Build mobile cards */
function buildMobile(mobileContainer) {
  mobileContainer
    .querySelectorAll('.project-mobile-card')
    .forEach((el) => el.remove());

  projects.forEach((project) => {
    const wrapperClass = project.isVertical
      ? 'project-video-container vertical'
      : 'project-video-container';

    const card = document.createElement('div');
    card.className = 'project-mobile-card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="${wrapperClass}">
        <video muted loop playsinline preload="metadata" poster="${project.poster}" class="project-video">
          <source src="${project.video}" type="${project.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}">
        </video>
      </div>
    `;

    mobileContainer.appendChild(card);
  });
}

/** Scroll to a specific project card */
function scrollToCard(id) {
  const card = document.getElementById(`project-card-${id}`);
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Activate a project (highlight thumbnail + update info panel) */
function setActive(id) {
  if (id === activeId) return;
  activeId = id;

  const { thumbnailList, info } = getElements();

  thumbnailList
    ?.querySelectorAll('.project-thumbnail-item')
    .forEach((item) => {
      item.classList.toggle('active', parseInt(item.dataset.id, 10) === id);
    });

  const project = projects.find((p) => p.id === id);
  if (!project || !info) return;

  const titleEl = document.getElementById('project-info-title');
  const descEl = document.getElementById('project-info-desc');

  if (titleEl) titleEl.textContent = project.title;
  if (descEl) descEl.textContent = project.description;
}

/** Scroll-based: выбирает активную карточку по расстоянию до центра экрана */
function setupActiveObserver(showcase) {
  const cards = showcase.querySelectorAll('.project-card');
  if (!cards.length) return;

  const { info, sidebar } = getElements();

  function pickActiveCard() {
    if (isUserInteracting) return;

    const vh = window.innerHeight;
    let bestCard = null;
    let bestDist = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - vh / 2);

      if (rect.top < vh * 0.7 && rect.bottom > vh * 0.3) {
        if (dist < bestDist) {
          bestDist = dist;
          bestCard = card;
        }
      }
    });

    if (bestCard) {
      const id = parseInt(bestCard.id.replace('project-card-', ''), 10);
      setActive(id);
      info?.classList.add('visible');
      sidebar?.classList.add('visible');
    }
  }

  onScroll(pickActiveCard);
  pickActiveCard();
}

/** IntersectionObserver: auto-play / pause videos */
function setupPlayback(container) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.3 }
  );

  container.querySelectorAll('.project-video').forEach((video) => observer.observe(video));
}

/** Scroll-based: скрывает превью когда вышли за пределы секции (в обе стороны) */
function setupVisibility({ info, sidebar, showcase }) {
  if (!info || !showcase) return;

  const cards = showcase.querySelectorAll('.project-card');
  if (!cards.length) return;

  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];

  function updateVisibility() {
    const vh = window.innerHeight;
    const firstRect = firstCard.getBoundingClientRect();
    const lastRect = lastCard.getBoundingClientRect();

    const scrolledAbove = firstRect.top > vh * 0.5;
    const scrolledBelow = lastRect.bottom < vh * 0.5;

    if (scrolledAbove || scrolledBelow) {
      info.classList.remove('visible');
      sidebar?.classList.remove('visible');
    }
  }

  onScroll(updateVisibility);
  updateVisibility();
}

/** Main render: desktop vs mobile */
function render() {
  const { thumbnailList, showcase, mobileContainer } = getElements();
  const isDesktop = window.innerWidth >= DESKTOP_MIN_WIDTH;

  showcase.innerHTML = '';
  mobileContainer.innerHTML = '';

  if (isDesktop) {
    buildThumbnails(thumbnailList);
    buildShowcase(showcase);
    setActive(0);

    requestAnimationFrame(() => {
      setupActiveObserver(showcase);
      setupPlayback(showcase);
      setupVisibility(getElements());
    });
  } else {
    const title = document.createElement('h2');
    title.className = 'section-title mobile-projects-title';
    title.textContent = 'Проекты';
    mobileContainer.appendChild(title);

    buildMobile(mobileContainer);
    setupPlayback(mobileContainer);
  }
}

/** Public API */
export function initProjects() {
  const { showcase } = getElements();
  if (!showcase) return; // section not present on this page

  render();

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(render, RESIZE_DEBOUNCE_MS);
  });
}
