var slider = document.querySelector('.slider');
var sliderContent = document.querySelector('.slider-content');
var isDragging = false;
var startX;
var startScrollLeft;
sliderContent.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = slider.scrollLeft;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', function () {
        isDragging = false;
        document.removeEventListener('mousemove', handleDrag);
    });
});
sliderContent.addEventListener('selectstart', function (e) {
    e.preventDefault(); // Prevent text selection
});
sliderContent.addEventListener('dragstart', function (e) {
    e.preventDefault(); // Prevent drag and drop behavior
});
function handleDrag(e) {
    if (!isDragging)
        return;
    var deltaX = e.clientX - startX;
    var newScrollLeft = startScrollLeft - deltaX;
    slider.scrollLeft = newScrollLeft;
}
// Optional: Smooth scrolling animation
function smoothScrollTo(targetScrollLeft) {
    var scrollDuration = 300; // Adjust the duration as needed
    var startTime = performance.now();
    var startScrollLeft = slider.scrollLeft;
    function step(currentTime) {
        var elapsedTime = currentTime - startTime;
        if (elapsedTime < scrollDuration) {
            var progress = Math.min(1, elapsedTime / scrollDuration);
            slider.scrollLeft = startScrollLeft + (targetScrollLeft - startScrollLeft) * progress;
            requestAnimationFrame(step);
        }
        else {
            slider.scrollLeft = targetScrollLeft;
        }
    }
    requestAnimationFrame(step);
}
