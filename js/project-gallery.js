import anime from '../node_modules/animejs/dist/bundles/anime.esm.js'

const projectsData = {
  'flow-studio': {
    title: 'Flow Studio',
    subtitle: 'Брендинг + сайт для креативного пространства',
    description: `<p>Мы создали цельный визуальный язык и современный сайт, который отражает философию студии.</p><p>Работа включала полный ребрендинг, motion-идентификацию и разработку сайта.</p>`,
    year: '2025',
    tags: 'Branding • Web • Motion'
  },
  'astra': {
    title: 'Astra',
    subtitle: 'Перезапуск продукта и новый визуальный язык',
    description: `<p>Полная переработка интерфейса и бренда для одного из самых амбициозных продуктов 2025 года.</p>`,
    year: '2025',
    tags: 'Product Design • Web • UI/UX'
  },
  'lumina': {
    title: 'Lumina',
    subtitle: 'Платформа для креативных команд',
    description: `<p>Создали экосистему для совместной работы креативных команд — от идеи до релиза.</p><p>Минималистичный интерфейс, плавные анимации, продуманная навигация.</p>`,
    year: '2024',
    tags: 'SaaS • Branding • UI/UX'
  },
  'pixel-lab': {
    title: 'Pixel Lab',
    subtitle: 'Цифровая лаборатория визуальных экспериментов',
    description: `<p>Экспериментальная платформа для генерации и исследования визуальных концепций.</p>`,
    year: '2025',
    tags: 'Digital • Motion • R&D'
  }
}

function populateModal(data, videoSrc) {
  document.getElementById('modal-title').textContent = data.title
  document.getElementById('modal-subtitle').textContent = data.subtitle
  document.getElementById('modal-description').innerHTML = data.description
  document.getElementById('modal-year').textContent = data.year
  document.getElementById('modal-tags').textContent = data.tags

  const modalVideo = document.getElementById('modal-video')
  modalVideo.src = videoSrc
  modalVideo.play().catch(() => {})
}

function showModal() {
  const modal = document.getElementById('project-modal')
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  anime({ targets: modal, opacity: [0, 1], duration: 400, easing: 'easeOutQuad' })
}

function hideModal() {
  const modal = document.getElementById('project-modal')
  const modalVideo = document.getElementById('modal-video')
  modal.classList.add('hidden')
  modal.classList.remove('flex')
  modalVideo.pause()
  modalVideo.src = ''
}

function setupCardHover(card) {
  const video = card.querySelector('video')
  if (!video) return
  card.addEventListener('mouseenter', () => video.play().catch(() => {}))
  card.addEventListener('mouseleave', () => video.pause())
}

function setupCardClick(card) {
  card.addEventListener('click', () => {
    const data = projectsData[card.dataset.project]
    if (!data) return

    const source = card.querySelector('video source')
    populateModal(data, source?.src || '')
    showModal()
  })
}

function setupCards() {
  document.querySelectorAll('.project-card').forEach((card) => {
    setupCardHover(card)
    setupCardClick(card)
  })
}

function setupModalControls() {
  const modal = document.getElementById('project-modal')
  const closeBtn = document.getElementById('modal-close')

  closeBtn.addEventListener('click', hideModal)
  modal.addEventListener('click', (e) => { if (e.target === modal) hideModal() })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal() })
}

export function initProjectGallery() {
  if (!document.getElementById('projects-grid')) return
  setupCards()
  setupModalControls()
}
