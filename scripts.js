let currentSlide = 0;
let slidesToShow;

// Function to update the number of slides based on the viewport width
function updateSlidesToShow() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 900) {
        slidesToShow = 3; // Show 3 slides on large screens
    } else if (viewportWidth >= 600) {
        slidesToShow = 2; // Show 2 slides on medium screens
    } else {
        slidesToShow = 1; // Show 1 slide on small screens
    }

    renderBullets(); // Update bullets based on the new slidesToShow
}

// Function to display a specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Wrap around the index to create an infinite loop effect
    if (index >= totalSlides - 2) {
        currentSlide = 0; // Go back to the first group of slides
    } else if (index < 0) {
        currentSlide = totalSlides - 1; // Go to the last group
    } else {
        currentSlide = index;
    }

    // Calculate the offset and apply it to the slides container
    const offset = -currentSlide * (100 / slidesToShow);
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

    updateActiveBullet(); // Update active bullet based on the current slide
}

// Function to change the slide by a specific direction (-1 for prev, 1 for next)
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Initial setup: Update slidesToShow based on viewport width and show the first slide
updateSlidesToShow();
showSlide(currentSlide);

// Add resize event listener to update slidesToShow when viewport changes
window.addEventListener('resize', () => {
    updateSlidesToShow();
    showSlide(currentSlide); // Re-calculate the current slide view
});

// Optional: Auto-slide every 3 seconds, stops on user interaction
let autoSlide = setInterval(() => {
    changeSlide(1);
}, 3000);

// Stop auto-slide on user interaction
document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});
document.querySelector('.slider').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        changeSlide(1);
    }, 3000);
});

// === New Code for Dynamic Bullets ===

// Function to calculate the number of pages based on slidesToShow and total slides
function calculatePages() {
    const totalSlides = document.querySelectorAll('.slide').length;
    return totalSlides - 2;
}

// Function to render bullets dynamically based on the number of pages
function renderBullets() {
    const bulletsContainer = document.querySelector('.navigation-bullets');
    const totalPages = calculatePages();

    // Clear existing bullets
    bulletsContainer.innerHTML = '';

    // Only add bullets if more than one page is required
    if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
            const bullet = document.createElement('span');
            bullet.classList.add('bullet');
            bullet.dataset.page = i;
            bullet.addEventListener('click', () => goToPage(i));
            bulletsContainer.appendChild(bullet);
        }
        updateActiveBullet(); // Highlight the active bullet
    }
}

// Function to update the active bullet based on the current page
function updateActiveBullet() {
    const bullets = document.querySelectorAll('.bullet');
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === currentSlide);
    });
}

// Function to navigate to a specific page when a bullet is clicked
function goToPage(pageIndex) {
    showSlide(pageIndex);
}

// Add click event listeners for navigation buttons
document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

// Initial rendering of bullets based on the viewport width
renderBullets();

// Re-render bullets when the window is resized to adjust based on slidesToShow
window.addEventListener('resize', renderBullets);