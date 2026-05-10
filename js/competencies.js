function initializeCompetencies() {
  const textItems = document.querySelectorAll('.competency-text-item');

  if (!textItems.length) return;

  let currentIndex = 0;
  let hoverTimer = null;
  let rotationTimer = null;
  let isHovering = false;

  function setActive(index) {
    textItems.forEach(item => {
      item.classList.toggle('active', parseInt(item.dataset.index, 10) === index);
    });
    currentIndex = index;
  }

  function startRotation() {
    stopRotation();
    rotationTimer = setInterval(() => {
      if (!isHovering) {
        const next = (currentIndex + 1) % textItems.length;
        setActive(next);
      }
    }, 3000);
  }

  function stopRotation() {
    if (rotationTimer) {
      clearInterval(rotationTimer);
      rotationTimer = null;
    }
  }

  function onItemEnter(e) {
    if (hoverTimer) clearTimeout(hoverTimer);

    isHovering = true;
    stopRotation();

    const index = parseInt(e.currentTarget.dataset.index, 10);

    hoverTimer = setTimeout(() => {
      setActive(index);
      hoverTimer = null;
    }, 350);
  }

  function onItemLeave() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }

    isHovering = false;
    startRotation();
  }

  function onItemTouch(e) {
    if (hoverTimer) clearTimeout(hoverTimer);

    isHovering = true;
    stopRotation();

    const index = parseInt(e.currentTarget.dataset.index, 10);
    setActive(index);
  }

  textItems.forEach(item => {
    item.addEventListener('mouseenter', onItemEnter);
    item.addEventListener('mouseleave', onItemLeave);
    item.addEventListener('touchstart', onItemTouch, { passive: true });
  });

  setActive(0);
  startRotation();
}

export default initializeCompetencies;
