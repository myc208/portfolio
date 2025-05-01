let currentSlide = 0;
let slidesToShow;

function updateSlidesToShow() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 900) {
        slidesToShow = 3;
    } else if (viewportWidth >= 600) {
        slidesToShow = 2;
    } else {
        slidesToShow = 1;
    }

    renderBullets();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index >= totalSlides - 2) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * (100 / slidesToShow);
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

    updateActiveBullet();
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

updateSlidesToShow();
showSlide(currentSlide);

window.addEventListener('resize', () => {
    updateSlidesToShow();
    showSlide(currentSlide);
});

let autoSlide = setInterval(() => {
    changeSlide(1);
}, 3000);

document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        changeSlide(1);
    }, 3000);
});

function calculatePages() {
    const totalSlides = document.querySelectorAll('.slide').length;
    return totalSlides - 2;
}

function renderBullets() {
    const bulletsContainer = document.querySelector('.navigation-bullets');
    const totalPages = calculatePages();

    bulletsContainer.innerHTML = '';

    if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
            const bullet = document.createElement('span');
            bullet.classList.add('bullet');
            bullet.dataset.page = i;
            bullet.addEventListener('click', () => goToPage(i));
            bulletsContainer.appendChild(bullet);
        }
        updateActiveBullet();
    }
}

function updateActiveBullet() {
    const bullets = document.querySelectorAll('.bullet');
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === currentSlide);
    });
}

function goToPage(pageIndex) {
    showSlide(pageIndex);
}

document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

renderBullets();

window.addEventListener('resize', renderBullets);

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});