import { onScroll } from './utils/scroll.js';

// Page-level interactions: text reveal, CTA background, form fields, anime.js animations

function initPageInteractions() {
  // Text reveal on scroll
  document.querySelectorAll('.text-reveal').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  document.querySelectorAll('.projects-more').forEach(el => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    observer.observe(el);
  });

  // CTA section background transition
  const ctaSection = document.getElementById('cta');
  if (ctaSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.5) {
          document.body.style.backgroundColor = '#0a0a0a';
          document.body.style.transition = 'background-color 0.8s ease';
        } else {
          document.body.style.backgroundColor = '#f8f8f8';
        }
      });
    }, { threshold: [0.5, 1] });
    observer.observe(ctaSection);
  }

  // CTA form field interactions
  document.querySelectorAll('#cta input, #cta textarea').forEach(el => {
    const wrapper = el.closest('.form-field');
    const label = wrapper?.querySelector('label');
    const gradientLine = wrapper?.querySelector('.line-gradient');

    const updateLabel = () => {
      if (!label) return;
      if (el.value || document.activeElement === el) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    };

    el.addEventListener('focus', () => {
      if (gradientLine) gradientLine.style.transform = 'scaleX(1)';
      updateLabel();
    });

    el.addEventListener('blur', () => {
      if (gradientLine) gradientLine.style.transform = 'scaleX(0)';
      updateLabel();
    });

    el.addEventListener('input', () => {
      updateLabel();
      if (el.tagName === 'TEXTAREA') {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }
    });
  });

  // Desktop nav scroll behavior: bg after 100px, right pill hide on scroll down / show on scroll up
  const desktopPill = document.getElementById('desktop-nav-pill');
  const rightPill = document.getElementById('header-right-pill');
  let lastScrollY = 0;
  let scrollThreshold = window.innerHeight * 0.6;

  const updateNavOnScroll = () => {
    const scrollY = window.scrollY;
    const hasScrolledPastHero = scrollY > scrollThreshold;

    // Background on pills after scrolling 100px (matches original combined behavior)
    if (scrollY > 100) {
      desktopPill?.classList.add('has-bg');
      rightPill?.classList.add('has-bg');
    } else {
      desktopPill?.classList.remove('has-bg');
      rightPill?.classList.remove('has-bg');
      rightPill?.classList.remove('scroll-hidden');
    }

    // Right pill hide/show based on scroll direction (after hero threshold)
    if (hasScrolledPastHero && rightPill) {
      if (scrollY > lastScrollY + 5) {
        rightPill.classList.add('scroll-hidden');
      } else if (scrollY < lastScrollY - 5) {
        rightPill.classList.remove('scroll-hidden');
      }
    } else if (rightPill) {
      rightPill.classList.remove('scroll-hidden');
    }

    lastScrollY = scrollY;
  };

  if (desktopPill || rightPill) {
    onScroll(updateNavOnScroll);
  }

  window.addEventListener('resize', () => {
    scrollThreshold = window.innerHeight * 0.6;
  });

  // Hero text animation with anime.js
  if (window.anime) {
    const heroText = document.querySelector('#hero-text');
    if (heroText) {
      anime({
        targets: '#hero-text',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuad'
      });
    }

    const teamText = document.querySelector('#team-text');
    if (teamText) {
      anime({
        targets: '#team-text',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 300
      });
    }
  }
}

export default initPageInteractions();
