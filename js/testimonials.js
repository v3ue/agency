export function initTestimonials() {
  const cards = document.querySelectorAll('#testimonials-grid > article');
  if (!cards.length || !window.anime) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 800,
          easing: 'easeOutQuad',
          complete: function (anim) {
            anim.animatables.forEach(function (a) {
              a.target.style.opacity = '';
            });
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach((card) => observer.observe(card));
}
