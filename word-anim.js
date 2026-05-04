document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('about-animated-text');
  if (!target) return;

  const parts = Array.from(target.querySelectorAll('[data-animate-part]'));
  if (!parts.length) return;

  parts.forEach((part) => {
    const text = part.textContent.trim();
    const words = text.split(/\s+/);
    part.innerHTML = '';

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'animated-word';
      wordSpan.textContent = word;
      part.appendChild(wordSpan);
      if (index < words.length - 1) {
        part.appendChild(document.createTextNode(' '));
      }
    });
  });

  const revealWords = () => {
    const words = Array.from(target.querySelectorAll('.animated-word'));
    words.forEach((word, index) => {
      window.setTimeout(() => {
        word.classList.add('visible');
      }, index * 70 + 180);
    });
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealWords();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  observer.observe(target);

  const initBrandMarquee = () => {
    const track = document.querySelector('.brand-marquee-track');
    if (!track || typeof anime === 'undefined') return;

    const count = 20;
    const circles = [];

    const createCircleItem = (index) => {
      const item = document.createElement('div');
      item.className = 'brand-marquee-item';
      item.setAttribute('role', 'listitem');

      const circle = document.createElement('div');
      circle.className = 'brand-logo-circle';
      circle.setAttribute('aria-hidden', 'true');
      item.appendChild(circle);
      circles.push(circle);

      return item;
    };

    const items = Array.from({ length: count }, (_, index) => createCircleItem(index));
    items.forEach((item) => track.appendChild(item));

    anime({
      targets: circles,
      opacity: [0.25, 0.95],
      duration: 2000,
      delay: anime.stagger(100),
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
    });

    const animateScale = (target,  scale, duration) => {
      anime({
        targets: target,
        scale,
        duration,
        easing: 'easeOutQuad',
      });
    };

    circles.forEach((circle) => {
      circle.addEventListener('mouseenter', () => animateScale(circle, 1.4, 150));
      circle.addEventListener('mouseleave', () => animateScale(circle, 1, 250));
    });
  };

  initBrandMarquee();
});
