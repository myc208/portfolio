document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle (matches index.html)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    this.setAttribute('aria-expanded', navLinks.classList.contains('show'));
  });

  // Theme toggle (matches index.html)
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  themeToggle.addEventListener('change', () => {
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Load saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Advanced 3D Radial Menu
  const radialTrigger = document.getElementById('radial-trigger');
  const radialMenu = document.getElementById('radial-menu');
  const radialItems = document.querySelectorAll('.radial-item');
  let isMenuOpen = false;

  // Toggle radial menu with animation
  radialTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    
    radialTrigger.classList.toggle('active');
    radialMenu.classList.toggle('active');
    
    // Add slight delay to items for ripple effect
    radialItems.forEach((item, index) => {
      if (isMenuOpen) {
        item.style.transition = `transform 0.4s cubic-bezier(0.5, 0, 0.5, 1.5) ${index * 0.05}s`;
      } else {
        item.style.transition = `transform 0.3s ease ${(radialItems.length - index) * 0.03}s`;
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !radialMenu.contains(e.target) {
      radialTrigger.click();
    }
  });

  // Project view switching with smooth transitions
  radialItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = item.getAttribute('data-project');
      
      // Close menu
      radialTrigger.click();
      
      // Smooth transition between views
      document.querySelectorAll('.project-view').forEach(view => {
        if (view.classList.contains('active')) {
          view.style.opacity = 0;
          setTimeout(() => {
            view.classList.remove('active');
            view.style.opacity = '';
          }, 300);
        }
      });
      
      setTimeout(() => {
        const targetView = document.getElementById(`view-${projectId}`);
        if (targetView) {
          targetView.classList.add('active');
          targetView.style.opacity = 0;
          setTimeout(() => {
            targetView.style.opacity = 1;
          }, 10);
          
          // Smooth scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 300);
    });
  });

  // Add subtle parallax effect to project images
  const projectImages = document.querySelectorAll('.project-image img');
  projectImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1.05)';
    });
  });

  // Add typing animation to terminal elements
  const terminalElements = document.querySelectorAll('.terminal-text');
  terminalElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    
    let i = 0;
    const speed = 30; // typing speed in ms
    
    function typeWriter() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.unobserve(el);
      }
    });
    
    observer.observe(el);
  });

  // Add hover effect to tech stack items
  const techItems = document.querySelectorAll('.tech-item');
  techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px)';
      item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
    });
  });
});