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
        slidesContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
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
    }, 6000);

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

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        
        // Update button emoji
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '🌞';
    } else {
        themeToggle.textContent = '🌙';
    }

    // Enhanced Timeline with Progress Bar
    function initTimeline() {
        const timeline = document.querySelector('.timeline');
        const events = document.querySelectorAll('.event');
        
        // Add timeline progress bar observer
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    timeline.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        timelineObserver.observe(timeline);
        
        events.forEach(event => {
            // Add click handler to expand/collapse details
            event.addEventListener('click', function() {
                this.classList.toggle('expanded');
                
                // Animate the content
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
            
            // Add hover effects
            events.forEach(event => {
                event.addEventListener('mouseenter', () => {
                    event.style.transition = 'all 0.5s ease-out';
                    event.querySelector('.event-content').style.transform = 'translateY(-8px) scale(1.03)';
                });
                
                event.addEventListener('mouseleave', () => {
                    event.style.transition = 'all 0.4s ease-out';
                    event.querySelector('.event-content').style.transform = 'translateY(0) scale(1)';
                });
            });
        });
        
        // Animate timeline events in sequence
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

    // Initialize timeline if it exists
    if (document.querySelector('.event')) {
        initTimeline();
    }

    // Form Auto-Save Functionality
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

    // Initialize form auto-save
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('input', saveForm);
        loadForm();
    }

    // Enhanced Project Filter Functionality with animations
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
                        // Ensure it's observed for scroll animations
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

    // Enhanced Scroll Animations - triggers every time elements enter viewport
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add edge blur when exiting viewport
                entry.target.style.setProperty('--edge-blur', '0px');
            } else {
                entry.target.classList.remove('visible');
                
                // Calculate distance from viewport edges
                const rect = entry.target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;
                
                // Calculate blur amount based on distance from edges
                const topDistance = Math.max(0, -rect.top);
                const bottomDistance = Math.max(0, rect.bottom - viewportHeight);
                const leftDistance = Math.max(0, -rect.left);
                const rightDistance = Math.max(0, rect.right - viewportWidth);
                
                const maxBlur = 10; // Maximum blur amount in pixels
                const blurAmount = Math.min(
                    maxBlur,
                    Math.max(topDistance, bottomDistance, leftDistance, rightDistance) / 10
                );
                
                entry.target.style.setProperty('--edge-blur', `${blurAmount}px`);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements that should animate
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Initialize all service items as visible
    document.querySelectorAll('.service-item').forEach(item => {
        item.style.display = 'block';
        item.classList.add('animate-on-scroll');
        scrollObserver.observe(item);
    });

    // Add animation keyframes and edge blur styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
        
        /* Edge blur effect */
        .animate-on-scroll {
            transition: filter 0.3s ease;
        }
        .animate-on-scroll:not(.visible) {
            filter: blur(var(--edge-blur, 0px));
        }
    `;
    document.head.appendChild(style);

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
                // Clear saved form data after successful submission
                localStorage.removeItem('contactFormData');
            }, function(error) {
                alert('Failed to send email. Please try again later.');
            });
    };

    // Animation Initialization (only when animations are allowed)
    function initAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Typing animation with RAF for smoothness
        function typeWriter(elementId, text, delay = 0) {
            setTimeout(() => {
                const element = document.querySelector(elementId);
                let i = 0;
                const speed = 40;
                
                function type() {
                    if (i < text.length) {
                        element.innerHTML = text.substring(0, i+1) + 
                            '<span class="blinking-cursor">|</span>';
                        i++;
                        setTimeout(type, speed);
                    } else {
                        element.innerHTML = text + 
                            '<span class="blinking-cursor" style="opacity:0">|</span>';
                    }
                }
                type();
            }, delay);
        }

        // 3D Card effect with performance throttle
        function initParallaxCards() {
            const cards = document.querySelectorAll('.holographic-card');
            let lastTime = 0;
            const throttleDelay = 16; // ~60fps
            
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
                        
                        card.style.transform = `
                            perspective(1000px)
                            rotateX(${(y - centerY) / 20}deg)
                            rotateY(${(centerX - x) / 20}deg)
                            translate3d(0, 0, 10px)
                        `;
                    });
                });

                // Reset card position when mouse leaves
                card.addEventListener('mouseleave', () => {
                    requestAnimationFrame(() => {
                        card.style.transform = '';
                    });
                });
            });
        }

        // Initialize animations
        typeWriter('#animated-title', 'Fintech & Applied Computing Student');
        initParallaxCards();
    }

    // Load animations safely after page load
    window.addEventListener('load', () => {
        document.body.classList.add('animations-ready');
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            initAnimations();
        }
    });
});