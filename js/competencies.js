function initializeCompetencies() {
  const textItems = document.querySelectorAll('.competency-text-item');
  const cardSets = document.querySelectorAll('.card-set');

  if (!textItems.length || !cardSets.length) return;

  function setActiveCompetency(index) {
    textItems.forEach(item => {
      const itemIndex = parseInt(item.dataset.index, 10);
      item.classList.toggle('active', itemIndex === index);
    });

    cardSets.forEach(set => {
      const setIndex = parseInt(set.dataset.set, 10);
      set.classList.toggle('active', setIndex === index);
    });
  }

  textItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index, 10);
      setActiveCompetency(index);
    });
  });

  setActiveCompetency(0);
}

document.addEventListener('DOMContentLoaded', initializeCompetencies);
