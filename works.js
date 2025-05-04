// Works Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize 3D Navigation
  const navOrb = document.getElementById('navOrb');
  const navSphere = document.getElementById('navSphere');
  
  navOrb.addEventListener('click', function() {
      navSphere.classList.toggle('active');
      this.classList.toggle('active');
  });

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
      themeToggle.addEventListener('change', function() {
          document.body.classList.toggle('dark-mode', this.checked);
          localStorage.setItem('theme', this.checked ? 'dark' : 'light');
      });

      if (localStorage.getItem('theme') === 'dark') {
          document.body.classList.add('dark-mode');
          themeToggle.checked = true;
      }
  }

  // Project Modal Functionality
  const projectModal = document.getElementById('projectModal');
  const closeModal = document.getElementById('closeModal');
  
  if (projectModal && closeModal) {
      closeModal.addEventListener('click', function() {
          projectModal.classList.remove('active');
      });

      window.addEventListener('click', function(e) {
          if (e.target === projectModal) {
              projectModal.classList.remove('active');
          }
      });
  }

  // Animate elements on scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.classList.add('visible');
          }
      });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initialize

  // Project-specific animations
  if (document.querySelector('.project-rnn')) {
      // RNN-specific animations
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
          setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
          }, index * 200);
      });
  }

  if (document.querySelector('.project-cnn')) {
      // CNN-specific animations
      const imageItems = document.querySelectorAll('.image-item');
      imageItems.forEach((item, index) => {
          setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
          }, index * 150);
      });
  }
});

// Dynamic Project Loading
function loadProjectGrid() {
  const projectGrid = document.getElementById('projectGrid');
  if (!projectGrid) return;

  const projects = [
      {
          title: "Hybrid Neural Network",
          summary: "Optimizing algorithm learning through convergence of convolutional layers with LSTM/GRU layers.",
          image: "hnn.png",
          link: "work_hnn.html",
          tags: ["Machine Learning", "Python", "Neural Networks"],
          icon: "fa-brain"
      },
      // Add all other projects here...
  ];

  projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card animate-on-scroll';
      projectCard.innerHTML = `
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.summary}</p>
              <div class="project-tags">
                  ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
          </div>
      `;
      
      projectCard.addEventListener('click', () => {
          window.location.href = project.link;
      });
      
      projectGrid.appendChild(projectCard);
  });
}

// Initialize when page loads
if (document.getElementById('projectGrid')) {
  loadProjectGrid();
}