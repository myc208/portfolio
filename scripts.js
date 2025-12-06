document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Wait for works.js to populate the slider before initializing logic
    window.addEventListener('sliderContentReady', function() {
        initSlider();
    });

    function initSlider() {
        let currentSlide = 0;
        let slidesToShow = 3; 
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const slidesContainer = document.querySelector('.slides');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const bulletsContainer = document.querySelector('.navigation-bullets');

        if (!slidesContainer || totalSlides === 0) return;

        function updateSlidesToShow() {
            if (window.innerWidth >= 900) {
                slidesToShow = 3;
            } else if (window.innerWidth >= 600) {
                slidesToShow = 2;
            } else {
                slidesToShow = 1;
            }
            renderBullets();
            showSlide(currentSlide);
        }

        function showSlide(index) {
            if (index > totalSlides - slidesToShow) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - slidesToShow;
            } else {
                currentSlide = index;
            }

            const offset = -currentSlide * (100 / slidesToShow);
            slidesContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            slidesContainer.style.transform = `translateX(${offset}%)`;

            updateActiveBullet();
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }

        function renderBullets() {
            if (!bulletsContainer) return;
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

        function updateActiveBullet() {
            const bullets = document.querySelectorAll('.bullet');
            const activeBulletIndex = Math.floor(currentSlide / slidesToShow);

            bullets.forEach((bullet, index) => {
                bullet.classList.toggle('active', index === activeBulletIndex);
            });
        }

        function goToSlide(index) {
            showSlide(index * slidesToShow);
        }

        updateSlidesToShow();
        showSlide(currentSlide);

        if (prevButton) prevButton.addEventListener('click', () => changeSlide(-1));
        if (nextButton) nextButton.addEventListener('click', () => changeSlide(1));

        let autoSlide = setInterval(() => {
            changeSlide(1);
        }, 6000);

        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });

            slider.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => {
                    changeSlide(1);
                }, 5000);
            });
        }

        window.addEventListener('resize', () => {
            updateSlidesToShow();
        });
    }

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

    // Dark/Light Mode Toggle (Handled in works.js mostly, but keeping listeners safe)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            document.body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
    }

    // Timeline and Form Logic
    function initTimeline() {
        const timeline = document.querySelector('.timeline');
        const events = document.querySelectorAll('.event');
        
        if (!timeline) return;

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    timeline.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        timelineObserver.observe(timeline);
        
        events.forEach(event => {
            event.addEventListener('click', function() {
                this.classList.toggle('expanded');
                const content = this.querySelector('.event-content');
                content.style.transition = 'all 0.4s ease';
                if (this.classList.contains('expanded')) {
                    content.style.transform = 'translateY(-5px) scale(1.03)';
                    content.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                } else {
                    content.style.transform = 'translateY(0) scale(1)';
                    content.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                }
            });
            
            event.addEventListener('mouseenter', () => {
                event.style.transition = 'all 0.5s ease-out';
                event.querySelector('.event-content').style.transform = 'translateY(-8px) scale(1.03)';
            });
            
            event.addEventListener('mouseleave', () => {
                event.style.transition = 'all 0.4s ease-out';
                event.querySelector('.event-content').style.transform = 'translateY(0) scale(1)';
            });
        });
        
        const eventObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.event').forEach(el => eventObserver.observe(el));
    }

    if (document.querySelector('.event')) {
        initTimeline();
    }

    // Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        function saveForm() {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        }

        function loadForm() {
            const savedData = localStorage.getItem('contactFormData');
            if (savedData) {
                const formData = JSON.parse(savedData);
                document.getElementById('name').value = formData.name || '';
                document.getElementById('email').value = formData.email || '';
                document.getElementById('message').value = formData.message || '';
            }
        }
        contactForm.addEventListener('input', saveForm);
        loadForm();
    }

    // Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const items = document.querySelectorAll('.service-item');
            
            items.forEach((item, index) => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                        item.classList.add('animate-on-scroll');
                        scrollObserver.observe(item);
                    }, index * 100);
                } else {
                    item.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Scroll Observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.setProperty('--edge-blur', '0px');
            } else {
                entry.target.classList.remove('visible');
                const rect = entry.target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;
                const topDistance = Math.max(0, -rect.top);
                const bottomDistance = Math.max(0, rect.bottom - viewportHeight);
                const leftDistance = Math.max(0, -rect.left);
                const rightDistance = Math.max(0, rect.right - viewportWidth);
                const maxBlur = 10;
                const blurAmount = Math.min(maxBlur, Math.max(topDistance, bottomDistance, leftDistance, rightDistance) / 10);
                entry.target.style.setProperty('--edge-blur', `${blurAmount}px`);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    document.querySelectorAll('.service-item').forEach(item => {
        item.style.display = 'block';
        item.classList.add('animate-on-scroll');
        scrollObserver.observe(item);
    });

    // Dynamic Style Injection
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(20px); }
            }
            .animate-on-scroll { transition: filter 0.3s ease; }
            .animate-on-scroll:not(.visible) { filter: blur(var(--edge-blur, 0px)); }
        `;
        document.head.appendChild(style);
    }

    // EmailJS
    window.sendEmail = function() {
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        if(typeof emailjs !== 'undefined') {
            emailjs.send('service_m86enjx', 'template_m86enjx', templateParams)
                .then(function(response) {
                    alert('Email sent successfully!');
                    document.getElementById('contact-form').reset();
                    localStorage.removeItem('contactFormData');
                }, function(error) {
                    alert('Failed to send email. Please try again later.');
                });
        }
    };

    // Animations (Typewriter / 3D Card)
    function initAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        function typeWriter(elementId, text, delay = 0) {
            setTimeout(() => {
                const element = document.querySelector(elementId);
                if (!element) return;
                let i = 0;
                const speed = 40;
                
                function type() {
                    if (i < text.length) {
                        element.innerHTML = text.substring(0, i+1) + '<span class="blinking-cursor">|</span>';
                        i++;
                        setTimeout(type, speed);
                    } else {
                        element.innerHTML = text + '<span class="blinking-cursor" style="opacity:0">|</span>';
                    }
                }
                type();
            }, delay);
        }

        function initParallaxCards() {
            const cards = document.querySelectorAll('.holographic-card');
            let lastTime = 0;
            const throttleDelay = 16; 
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const now = Date.now();
                    if (now - lastTime < throttleDelay) return;
                    lastTime = now;
                    
                    requestAnimationFrame(() => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        card.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 20}deg) rotateY(${(centerX - x) / 20}deg) translate3d(0, 0, 10px)`;
                    });
                });

                card.addEventListener('mouseleave', () => {
                    requestAnimationFrame(() => {
                        card.style.transform = '';
                    });
                });
            });
        }

        typeWriter('#animated-title', 'Fintech & Applied Computing Student');
        initParallaxCards();
    }

    window.addEventListener('load', () => {
        document.body.classList.add('animations-ready');
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            initAnimations();
        }
    });
});