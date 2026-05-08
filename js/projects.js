/**
 * Projects section logic — стабильная версия (превью теперь работает)
 */

import { projects } from './projects-data.js';

const DESKTOP_MIN_WIDTH = 1024;
const RESIZE_DEBOUNCE_MS = 150;

let activeId = -1;
let isUserInteracting = false;
let resizeTimeout = null;

/** Root DOM elements */
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

/** Build functions */
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

function buildShowcase(showcase) {
  showcase.innerHTML = '';
  projects.forEach((project) => {
    const wrapperClass = project.isVertical ? 'project-video-container vertical' : 'project-video-container';
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

function buildMobile(mobileContainer) {
  mobileContainer.querySelectorAll('.project-mobile-card').forEach(el => el.remove());
  projects.forEach((project) => {
    const wrapperClass = project.isVertical ? 'project-video-container vertical' : 'project-video-container';
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

function scrollToCard(id) {
  const card = document.getElementById(`project-card-${id}`);
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Активация проекта + показ превью */
function setActive(id) {
  if (id === activeId) return;
  activeId = id;

  const { thumbnailList, info, sidebar } = getElements();

  // Обновляем превьюшки
  thumbnailList?.querySelectorAll('.project-thumbnail-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.id, 10) === id);
  });

  // Обновляем текст в панели
  const project = projects.find(p => p.id === id);
  if (project && info) {
    document.getElementById('project-info-title').textContent = project.title;
    document.getElementById('project-info-desc').textContent = project.description;
  }

  // Показываем панель
  if (info) info.classList.add('visible');
  if (sidebar) sidebar.classList.add('visible');
}

/** Observer для выбора активного проекта */
function setupActiveObserver(showcase) {
  const cards = showcase?.querySelectorAll('.project-card');
  if (!cards?.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (isUserInteracting) return;

    let bestEntry = null;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
          bestEntry = entry;
        }
      }
    });

    if (bestEntry) {
      const id = parseInt(bestEntry.target.id.replace('project-card-', ''), 10);
      setActive(id);
    }
  }, {
    rootMargin: '-38% 0px -38% 0px',
    threshold: [0.4, 0.7, 1]
  });

  cards.forEach(card => observer.observe(card));
}

/** Playback видео */
function setupPlayback(container) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });

  container.querySelectorAll('.project-video').forEach(video => observer.observe(video));
}

/** Render */
function render() {
  const { thumbnailList, showcase, mobileContainer } = getElements();
  const isDesktop = window.innerWidth >= DESKTOP_MIN_WIDTH;

  showcase.innerHTML = '';
  mobileContainer.innerHTML = '';

  if (isDesktop) {
    buildThumbnails(thumbnailList);
    buildShowcase(showcase);

    requestAnimationFrame(() => {
      setActive(0);                    // сразу активируем первый проект
      setupActiveObserver(showcase);
      setupPlayback(showcase);
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

export function initProjects() {
  const { showcase } = getElements();
  if (!showcase) return;

  render();

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(render, RESIZE_DEBOUNCE_MS);
  });
}
