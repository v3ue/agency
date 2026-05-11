/**
 * projects.js
 * Динамичная сетка проектов как на haptic.studio
 * Одна функция — одна задача. Читаемость превыше всего.
 */

import { animate } from '../node_modules/animejs/dist/bundles/anime.esm.js';

const projectsData = {
  'yanta': {
    title: 'Янта',
    subtitle: 'Рекламный ролик про кетчуп',
    companyDesc: 'Производитель кетчупа',
    description: `<p>Рекламный ролик про кетчуп</p>`,
    detailedDescription: `
      <p>Рекламный ролик для производителя кетчупа «Янта». Задача — показать продукт так, чтобы он вызывал аппетит и доверие.</p>
      <p>Мы создали динамичный ролик с крупными планами, сочной цветокоррекцией и плавной динамикой, подчеркивающей вкус и качество продукта.</p>
    `,
    competencies: ['Рекламные ролики', 'Визуализация продукта', 'Сценарий и раскадровка']
  },
  'isoform': {
    title: 'Изофом',
    subtitle: 'Серия объясняющих роликов для производителя строительного материала',
    companyDesc: 'производитель строительных материалов',
    description: `<p>Серия объясняющих роликов для производителя строительного материала.</p>`,
    detailedDescription: `
      <p>Основная задача заключалась в том, чтобы донести сложную техническую информацию через изометрическую графику и простые визуальные образы.</p>
      <p>Динамичный ролик для соцсетей, который выделяется уникальным стилем и лёгкостью восприятия даже сложных материалов.</p>
    `,
    competencies: ['Визуализация продукта', '2D Моушн', 'Объясняющие ролики']
  },
  'c-tea': {
    title: 'C-Tea',
    subtitle: 'Рекламный ролик для чайного бренда',
    companyDesc: 'чайный бренд',
    description: `<p>Рекламный ролик для чайного бренда.</p>`,
    detailedDescription: `
      <p>Атмосферный рекламный ролик для чайного бренда C-Tea. Мы сделали акцент на визуальной эстетике и передаче ощущения уюта.</p>
      <p>Продуманная фуд-съёмка, тёплая цветовая гамма и плавный монтаж создают настроение, которое ассоциируется с качественным чаем.</p>
    `,
    competencies: ['Рекламные ролики', 'Фуд-съёмка', 'Сценарий']
  },
  'osobiy-remont': {
    title: 'Особый ремонт',
    subtitle: 'Ролик для компании по ремонту недвижимости',
    companyDesc: 'компания по ремонту недвижимости',
    description: `<p>Ролик для компании по ремонту недвижимости.</p>`,
    detailedDescription: `
      <p>Ролик для компании «Особый ремонт», специализирующейся на ремонте недвижимости. Мы создали образ, который говорит о надёжности и уюте.</p>
      <p>Видео подчёркивает внимание к деталям, современный подход и индивидуальную работу с каждым клиентом.</p>
    `,
    competencies: ['Рекламные ролики', 'Персонажи', 'Озвучивание']
  },
  'example-1': {
    title: 'Проект 5',
    subtitle: 'Ещё один проект студии',
    companyDesc: 'студия дизайна',
    description: `<p>Демонстрационный проект, показывающий, как выглядит обычная карточка в сетке 3 колонок.</p>`,
    detailedDescription: `<p>Демонстрационный проект. Здесь будет подробное описание проекта студии.</p>`,
    competencies: ['Моушн-дизайн', 'Рекламные ролики']
  },
  'example-2': {
    title: 'Проект 6',
    subtitle: 'Широкий проект на 2 колонки',
    companyDesc: 'продуктовая компания',
    description: `<p>Демонстрационный проект, показывающий, как выглядит широкая карточка на 2/3 ширины.</p>`,
    detailedDescription: `<p>Демонстрационный проект. Здесь будет подробное описание проекта студии.</p>`,
    competencies: ['Моушн-дизайн', 'Рекламные ролики']
  },
  'example-3': {
    title: 'Проект 7',
    subtitle: 'Завершающий ряд сетки',
    companyDesc: 'технологический стартап',
    description: `<p>Демонстрационный проект, завершающий ряд в сетке 3 колонок.</p>`,
    detailedDescription: `<p>Демонстрационный проект. Здесь будет подробное описание проекта студии.</p>`,
    competencies: ['Моушн-дизайн', 'Рекламные ролики']
  }
};

export function initProjects() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalLogo = document.getElementById('modal-logo');
  const modalTitle = document.getElementById('modal-title');
  const modalCompanyDesc = document.getElementById('modal-company-desc');
  const modalShortDesc = document.getElementById('modal-short-desc');
  const modalDescription = document.getElementById('modal-description');
  const modalCompetencies = document.getElementById('modal-competencies');
  const closeBtn = document.getElementById('modal-close');

  const wrap = document.querySelector('.modal-video-wrap');
  let posterSrc = '';
  modalVideo.addEventListener('loadedmetadata', () => {
    if (wrap && modalVideo.videoWidth) {
      wrap.style.aspectRatio = String(modalVideo.videoWidth / modalVideo.videoHeight);
      if (modalVideo.videoWidth > modalVideo.videoHeight) {
        wrap.style.maxHeight = 'none';
        wrap.style.backgroundColor = '';
        wrap.style.boxShadow = '';
        wrap.classList.remove('blur-bg');
      } else {
        wrap.style.maxHeight = '85vh';
        wrap.style.backgroundColor = '';
        wrap.style.boxShadow = '';
        if (posterSrc) {
          wrap.style.setProperty('--blur-bg-img', `url(${posterSrc})`);
          wrap.classList.add('blur-bg');
        } else {
          wrap.classList.remove('blur-bg');
        }
      }
    }
  });

  cards.forEach(card => {
    const video = card.querySelector('video');

    card.addEventListener('mouseenter', () => video?.play().catch(() => {}));
    card.addEventListener('mouseleave', () => video?.pause());

    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const data = projectsData[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCompanyDesc.textContent = data.companyDesc || '';
      modalShortDesc.textContent = data.description.replace(/<[^>]*>/g, '');
      modalDescription.innerHTML = data.detailedDescription || data.description;

      const cardLogo = card.querySelector('.shrink-0');
      modalLogo.src = cardLogo?.src || '';

      modalCompetencies.innerHTML = '';
      (data.competencies || []).forEach(tag => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full';
        span.textContent = tag;
        modalCompetencies.appendChild(span);
      });

      const source = card.querySelector('video source');
      modalVideo.src = source?.src || '';
      const posterImg = card.querySelector('.relative > img');
      posterSrc = posterImg?.src || '';
      const wrap = document.querySelector('.modal-video-wrap');
      if (wrap) {
        wrap.style.aspectRatio = '';
        wrap.style.maxHeight = '85vh';
        wrap.style.backgroundColor = '';
        wrap.style.boxShadow = '';
        wrap.classList.remove('blur-bg');
      }
      modalVideo.load();

      history.pushState({ modalOpen: true }, '');
      document.querySelector('.site-header')?.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      modal.style.display = 'flex';
      animate({ targets: modal, opacity: [0, 1], duration: 300, easing: 'easeOutQuad' });
    });
  });

  const closeModal = () => {
    document.querySelector('.site-header')?.classList.remove('modal-open');
    document.body.style.overflow = '';
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
  };

  const closeWithHistory = () => {
    if (history.state?.modalOpen) {
      history.back();
    } else {
      closeModal();
    }
  };

  closeBtn.addEventListener('click', closeWithHistory);
  modal.addEventListener('click', e => { if (e.target === modal) closeWithHistory(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWithHistory(); });

  window.addEventListener('popstate', () => {
    if (modal.style.display === 'flex') closeModal();
  });
}
