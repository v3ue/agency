// Competencies: card sets switching with auto-rotation and user interaction
const competencyItems = Array.from(document.querySelectorAll('.competency-item'));
const cardSets = Array.from(document.querySelectorAll('.card-set'));
const totalSets = cardSets.length;
let currentIndex = 0;
let autoTimer = null;
let userInteracting = false;
const AUTO_DELAY = 4000;

const switchSet = (index) => {
  if (index === currentIndex) return;
  const oldSet = cardSets[currentIndex];
  const newSet = cardSets[index];
  oldSet?.classList.remove('active');
  newSet?.classList.add('active');
  competencyItems.forEach((item, i) => item.classList.toggle('active', i === index));
  currentIndex = index;
  if (!userInteracting) resetAutoTimer();
};

const nextSet = () => switchSet((currentIndex + 1) % totalSets);
const resetAutoTimer = () => {
  clearTimeout(autoTimer);
  autoTimer = setTimeout(nextSet, AUTO_DELAY);
};

// Initialize
cardSets[0]?.classList.add('active');
resetAutoTimer();

competencyItems.forEach((item) => {
  const index = parseInt(item.dataset.index, 10);
  item.addEventListener('mouseenter', () => {
    userInteracting = true;
    clearTimeout(autoTimer);
    window.setTimeout(() => switchSet(index), 200);
  });
  item.addEventListener('mouseleave', () => {
    userInteracting = false;
    resetAutoTimer();
  });
  item.addEventListener('click', () => {
    switchSet(index);
    userInteracting = true;
    clearTimeout(autoTimer);
    window.setTimeout(() => { userInteracting = false; resetAutoTimer(); }, 8000);
  });
});
