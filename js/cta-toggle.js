/**
 * cta-toggle.js
 *
 * Переключает видимость двух CTA-кнопок «Обсудить проект»:
 * - #hero-cta-btn — большая кнопка справа от hero-видео (видна на первом экране)
 * - #nav-cta-btn — кнопка в шапке (появляется после скролла первого экрана)
 */

const heroCta = document.getElementById('hero-cta-btn');
const navCta = document.getElementById('nav-cta-btn');
const heroBanner = document.getElementById('hero-banner');

// Проверка наличия всех элементов — если хоть одного нет, модуль не работает
if (heroCta && navCta && heroBanner) {
  // Начальное состояние: шапка скрыта, hero-кнопка видна
  navCta.classList.add('nav-cta-hidden');
  heroCta.classList.remove('hero-cta-hidden');

  /**
   * Определяет, прошёл ли пользователь первый экран.
   * heroBanner.bottom < 140 — нижняя граница hero ушла выше 140px от верха.
   */
  const updateCtaVisibility = () => {
    const rect = heroBanner.getBoundingClientRect();
    const isPastHero = rect.bottom < 140;

    if (isPastHero) {
      heroCta.classList.add('hero-cta-hidden');
      navCta.classList.remove('nav-cta-hidden');
    } else {
      heroCta.classList.remove('hero-cta-hidden');
      navCta.classList.add('nav-cta-hidden');
    }
  };

  // passive: true — не блокируем скролл
  window.addEventListener('scroll', updateCtaVisibility, { passive: true });
  window.addEventListener('resize', updateCtaVisibility);

  // Первичный расчёт при загрузке
  updateCtaVisibility();
}
