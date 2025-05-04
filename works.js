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
    {
        title: "ElasticSearch DB Ecosystem",
        summary: "Test viability, efficiency and effectiveness of ElasticSearch DB over MSSQL.",
        image: "elasticsearch.png",
        link: "work_elastic.html",
        tags: ["Database", "Docker", "ElasticStack"],
        icon: "fa-database"
    },
    {
        title: "Convolutional Neural Network",
        summary: "Comparing self-trained models to pre-trained model (VGG16).",
        image: "cnn.png",
        link: "work_cnn.html",
        tags: ["Computer Vision", "Deep Learning", "Python"],
        icon: "fa-eye"
    },
    {
        title: "Recurrent Neural Network",
        summary: "Text classification and generation using sequential data processing.",
        image: "rnn.png",
        link: "work_rnn.html",
        tags: ["NLP", "Text Generation", "Python"],
        icon: "fa-language"
    },
    {
        title: "Storyboard Mapping",
        summary: "Allow better conceptualisation of data through graphical storyboard.",
        image: "storyboard.png",
        link: "work_aa.html",
        tags: ["Data Visualization", "Tableau", "Storytelling"],
        icon: "fa-chart-line"
    },
    {
        title: "Excel Engineering",
        summary: "Exploring advanced Excel functions for data analysis and automation.",
        image: "fse.png",
        link: "work_fse.html",
        tags: ["Excel", "Data Analysis", "Automation"],
        icon: "fa-file-excel"
    },
    {
        title: "Data Visualization",
        summary: "Creating impactful visual representations of complex datasets.",
        image: "tab.png",
        link: "work_dv.html",
        tags: ["Tableau", "Dashboard", "Analytics"],
        icon: "fa-chart-pie"
    },
    {
        title: "C# Application",
        summary: "Employee management system demonstrating OOP principles.",
        image: "cscover.png",
        link: "work_cs.html",
        tags: ["C#", "OOP", ".NET"],
        icon: "fa-code"
    },
    {
        title: "Grades Database",
        summary: "Student grades management system implemented in C.",
        image: "grade.png",
        link: "work_grade.html",
        tags: ["C", "File I/O", "Data Structures"],
        icon: "fa-graduation-cap"
    }
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