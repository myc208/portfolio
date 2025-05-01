document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Initialize slider
    let currentSlide = 0;
    let slidesToShow = 3; // Default for larger screens
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesContainer = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const bulletsContainer = document.querySelector('.navigation-bullets');

    // Update slides to show based on screen size
    function updateSlidesToShow() {
        if (window.innerWidth >= 900) {
            slidesToShow = 3;
        } else if (window.innerWidth >= 600) {
            slidesToShow = 2;
        } else {
            slidesToShow = 1;
        }
        renderBullets();
        showSlide(currentSlide); // Adjust slide position on resize
    }

    // Show current slide
    function showSlide(index) {
        // Handle wrap-around for infinite loop
        if (index > totalSlides - slidesToShow) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - slidesToShow;
        } else {
            currentSlide = index;
        }

        const offset = -currentSlide * (100 / slidesToShow);
        slidesContainer.style.transform = `translateX(${offset}%)`;

        updateActiveBullet();
    }

    // Change slide
    function changeSlide(direction) {
        showSlide(currentSlide + direction);
    }

    // Create navigation bullets
    function renderBullets() {
        bulletsContainer.innerHTML = '';
        const bulletCount = Math.ceil(totalSlides / slidesToShow);

        for (let i = 0; i < bulletCount; i++) {
            const bullet = document.createElement('span');
            bullet.classList.add('bullet');
            bullet.addEventListener('click', () => goToSlide(i));
            bulletsContainer.appendChild(bullet);
        }

        updateActiveBullet();
    }

    // Update active bullet
    function updateActiveBullet() {
        const bullets = document.querySelectorAll('.bullet');
        const activeBulletIndex = Math.floor(currentSlide / slidesToShow);

        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === activeBulletIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        showSlide(index * slidesToShow);
    }

    // Initialize
    updateSlidesToShow();
    showSlide(currentSlide);

    // Event listeners
    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));

    // Auto slide
    let autoSlide = setInterval(() => {
        changeSlide(1);
    }, 5000);

    // Pause auto slide on hover
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlidesToShow();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Email form submission
    window.sendEmail = function() {
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        emailjs.send('service_m86enjx', 'template_m86enjx', templateParams)
            .then(function(response) {
                alert('Email sent successfully!');
                document.getElementById('contact-form').reset();
            }, function(error) {
                alert('Failed to send email. Please try again later.');
            });
    };
});