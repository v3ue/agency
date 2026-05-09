/**
 * projects.js
 * Динамичная сетка проектов как на haptic.studio
 * Одна функция — одна задача. Читаемость превыше всего.
 */

import { animate } from '../node_modules/animejs/dist/bundles/anime.esm.js';

const projectsData = {
  'isoform': {
    title: 'Изофом',
    subtitle: 'Серия объясняющих роликов для производителя строительного материала',
    description: `<p>Серия объясняющих роликов для производителя строительного материала.</p>`
  },
  'c-tea': {
    title: 'C-Tea',
    subtitle: 'Рекламный ролик для чайного бренда',
    description: `<p>Рекламный ролик для чайного бренда.</p>`
  },
  'yanta': {
    title: 'Янта',
    subtitle: 'Рекламный ролик про кетчуп',
    description: `<p>Рекламный ролик про кетчуп.</p>`
  },
  'osobiy-remont': {
    title: 'Особый ремонт',
    subtitle: 'Ролик для компании по ремонту недвижимости',
    description: `<p>Ролик для компании по ремонту недвижимости.</p>`
  },
  'example-1': {
    title: 'Проект 5',
    subtitle: 'Ещё один проект студии',
    description: `<p>Демонстрационный проект, показывающий, как выглядит обычная карточка в сетке 3 колонок.</p>`
  },
  'example-2': {
    title: 'Проект 6',
    subtitle: 'Широкий проект на 2 колонки',
    description: `<p>Демонстрационный проект, показывающий, как выглядит широкая карточка на 2/3 ширины.</p>`
  },
  'example-3': {
    title: 'Проект 7',
    subtitle: 'Завершающий ряд сетки',
    description: `<p>Демонстрационный проект, завершающий ряд в сетке 3 колонок.</p>`
  }
};

export function initProjects() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.getElementById('modal-close');

  cards.forEach(card => {
    const video = card.querySelector('video');

    // Hover — видео на карточке
    card.addEventListener('mouseenter', () => video?.play().catch(() => {}));
    card.addEventListener('mouseleave', () => video?.pause());

    // Клик — открытие модалки
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const data = projectsData[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDescription.innerHTML = data.description;

      const source = card.querySelector('video source');
      if (source) modalVideo.src = source.src;

      modal.style.display = 'flex';
      modalVideo.play().catch(() => {});

      animate({ targets: modal, opacity: [0, 1], duration: 400, easing: 'easeOutQuad' });
    });
  });

  // Закрытие модалки
  const closeModal = () => {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
