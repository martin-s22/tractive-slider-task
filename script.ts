const slider = document.querySelector('.slider') as HTMLDivElement;
const sliderContent = document.querySelector('.slider-content') as HTMLDivElement;

let isDragging = false;
let startX: number;
let startScrollLeft: number;

sliderContent.addEventListener('mousedown', (e: MouseEvent) => {
  isDragging = true;
  startX = e.clientX;
  startScrollLeft = slider.scrollLeft;

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleDrag);
  });
});

sliderContent.addEventListener('selectstart', (e: Event) => {
  e.preventDefault(); // Prevent text selection
});

sliderContent.addEventListener('dragstart', (e: Event) => {
  e.preventDefault(); // Prevent drag and drop behavior
});

function handleDrag(e: MouseEvent) {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const newScrollLeft = startScrollLeft - deltaX;

  slider.scrollLeft = newScrollLeft;
}

// Optional: Smooth scrolling animation
function smoothScrollTo(targetScrollLeft: number) {
  const scrollDuration = 300; // Adjust the duration as needed
  const startTime = performance.now();
  const startScrollLeft = slider.scrollLeft;

  function step(currentTime: number) {
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < scrollDuration) {
      const progress = Math.min(1, elapsedTime / scrollDuration);
      slider.scrollLeft = startScrollLeft + (targetScrollLeft - startScrollLeft) * progress;
      requestAnimationFrame(step);
    } else {
      slider.scrollLeft = targetScrollLeft;
    }
  }

  requestAnimationFrame(step);
}