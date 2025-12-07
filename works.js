// works.js

// 1. CENTRAL DATA SOURCE
const portfolioProjects = [
  {
    id: "traffic",
    title: "Traffic-AI: Predictive Traffic Forecasting",
    summary: "Cloud-native system fusing live traffic, weather, and accident data to predict congestion risk using Hybrid LSTM-XGBoost and Graph Neural Networks.",
    image: "traffic-ai.png", // Make sure to add an image with this name to your folder!
    link: "work_traffic.html",
    tags: ["Deep Learning", "Traffic Forecasting", "Python", "Cloud"],
    icon: "fa-car",
    featured: true
  },
  {
    id: "hnn",
    title: "Development of Hybrid Neural Network",
    summary: "Optimizing algorithm learning through convergence of convolutional layers with LSTM/GRU layers.",
    image: "hybridmodel.png",
    link: "work_hnn.html",
    tags: ["Machine Learning", "Python", "Neural Networks"],
    icon: "fa-brain",
    featured: true
  },
  {
    id: "elastic",
    title: "Establishing ElasticSearch DB Ecosystem",
    summary: "Test viability, efficiency and effectiveness of ElasticSearch DB over MSSQL.",
    image: "elasticsearch.png",
    link: "work_elastic.html",
    tags: ["Database", "Docker", "ElasticStack"],
    icon: "fa-database",
    featured: true
  },
  {
    id: "cnn",
    title: "Development of Convolutional Neural Network",
    summary: "Comparing self-trained models to pre-trained model (VGG16).",
    image: "cnn.png",
    link: "work_cnn.html",
    tags: ["Computer Vision", "Deep Learning", "Python"],
    icon: "fa-eye",
    featured: true
  },
  {
    id: "rnn",
    title: "Development of Recurrent Neural Network",
    summary: "Text classification and generation using sequential data processing.",
    image: "rnn.png",
    link: "work_rnn.html",
    tags: ["NLP", "Text Generation", "Python"],
    icon: "fa-language",
    featured: true
  },
  {
    id: "storyboard",
    title: "Creation of Storyboard: Mapping of Visualizations",
    summary: "Allow better conceptualisation of data through graphical storyboard.",
    image: "storyboard.png",
    link: "work_aa.html",
    tags: ["Data Visualization", "Tableau", "Storytelling"],
    icon: "fa-chart-line",
    featured: true
  },
  {
    id: "excel",
    title: "Microsoft Excel Spreadsheet Engineering",
    summary: "Exploring advanced Excel functions for data analysis and automation.",
    image: "fse.png",
    link: "work_fse.html",
    tags: ["Excel", "Data Analysis", "Automation"],
    icon: "fa-file-excel",
    featured: true
  },
  {
    id: "tableau",
    title: "Data Visualizations and Analysis with Tableau",
    summary: "Creating impactful visual representations of complex datasets.",
    image: "tab.png",
    link: "work_dv.html",
    tags: ["Tableau", "Dashboard", "Analytics"],
    icon: "fa-chart-pie",
    featured: true
  },
  {
    id: "csharp",
    title: "Employee Application Development Using C#",
    summary: "Employee management system demonstrating OOP principles.",
    image: "cscover.png",
    link: "work_cs.html",
    tags: ["C#", "OOP", ".NET"],
    icon: "fa-code",
    featured: true
  },
  {
    id: "grade",
    title: "Student Grades Database Implementation Using C",
    summary: "Student grades management system implemented in C.",
    image: "grade.png",
    link: "work_grade.html",
    tags: ["C", "File I/O", "Data Structures"],
    icon: "fa-graduation-cap",
    featured: true
  },
  {
    id: "gwent",
    title: "Creating a replica of a game driven by my passion",
    summary: "A web-based remake of the Gwent card game from The Witcher 3, with enhanced UI and music.",
    image: "gwent.png",
    link: "work_gwent.html",
    tags: ["JavaScript", "Game Development", "UI/UX"],
    icon: "fa-gamepad",
    featured: true
  },
  {
    id: "socket",
    title: "Client-Server chat application using Python",
    summary: "Client-server chat app with encryption, groups, and AI assistance.",
    image: "socketprg.png",
    link: "work_socket.html",
    tags: ["Python", "Networking", "Security"],
    icon: "fa-plug",
    featured: true
  },
  {
    id: "iot",
    title: "IoT Plant Watering System",
    summary: "Smart irrigation system with sensors and web control.",
    image: "iot.png",
    link: "work_iot.html",
    tags: ["IoT", "Python", "Raspberry Pi"],
    icon: "fa-seedling",
    featured: true
  },
  {
    id: "oop",
    title: "Movement and physics controls for OOP",
    summary: "Java-based game with OOP principles, focusing on movement logic.",
    image: "oop.png",
    link: "work_oop.html",
    tags: ["Java", "OOP", "Game Dev"],
    icon: "fa-cogs",
    featured: true
  },
  {
    id: "web",
    title: "Web Application inspired by Medium",
    summary: "PHP-based blog with CRUD and search features.",
    image: "web.png",
    link: "work_web.html",
    tags: ["PHP", "Web Dev", "MySQL"],
    icon: "fa-globe",
    featured: true
  },
  {
    id: "network",
    title: "IP-Allocation and Configuration Project",
    summary: "Efficient IP configuration and access-restrictions for school campus buildings.",
    image: "ip.png",
    link: "work_network.html",
    tags: ["DNS", "IP-Config", "IPv4"],
    icon: "fa-network-wired",
    featured: true
  },
  {
    id: "micron",
    title: "Year 1 Summer Internship Program with Micron",
    summary: "Developed defect visualization systems for inspection machines in manufacturing line.",
    image: "micron-silicon-symbol-drk-tm-rgb.png",
    link: "work_micron.html",
    tags: ["Python", "Data Visualization", "Flask"],
    icon: "fa-industry",
    featured: true
  }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Components
    loadNavOrb();
    loadProjectGrid();
    loadFeaturedSlider();
    
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const currentTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
      }
  
      themeToggle.addEventListener('change', function() {
        if (this.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      });
  
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { 
          if (e.matches) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
          } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
          }
        }
      });
    }
  
    // 3D Navigation Orb Logic
    const navOrb = document.getElementById('navOrb');
    const navSphere = document.getElementById('navSphere');
    
    if (navOrb && navSphere) {
      navOrb.addEventListener('click', function() {
        navSphere.classList.toggle('active');
        this.classList.toggle('active');
      });
    }

    // Modal Logic
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

    // Scroll Animations
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
    animateOnScroll(); 
});

// 2. DYNAMIC NAV ORB GENERATOR
function loadNavOrb() {
    const navSphere = document.getElementById('navSphere');
    if (!navSphere) return;

    // Clear existing content
    navSphere.innerHTML = '';

    portfolioProjects.forEach(project => {
        const link = document.createElement('a');
        link.href = project.link;
        
        const icon = document.createElement('i');
        icon.className = `fas ${project.icon}`;
        
        link.appendChild(icon);
        link.appendChild(document.createTextNode(` ${project.title}`));
        
        navSphere.appendChild(link);
    });
}

// 3. DYNAMIC WORKS GRID GENERATOR (For works.html)
function loadProjectGrid() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    projectGrid.innerHTML = '';

    portfolioProjects.forEach(project => {
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

// 4. DYNAMIC SLIDER GENERATOR (For index.html)
function loadFeaturedSlider() {
    const slidesContainer = document.querySelector('.slides');
    if (!slidesContainer) return;

    // Clear any existing content
    slidesContainer.innerHTML = '';

    // Filter featured projects
    const featuredProjects = portfolioProjects.filter(p => p.featured);

    featuredProjects.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'slide card-item';
        slide.setAttribute('tabindex', '0'); 
        
        slide.innerHTML = `
            <a href="${project.link}" class="card-link">
                <img src="${project.image}" alt="${project.title}" class="card-image" loading="lazy">
                <p class="badge">Developer</p>
                <h2 class="card-title">${project.title}</h2>
                <button class="card-button material-symbols-rounded">→</button>
            </a>
        `;
        slidesContainer.appendChild(slide);
    });

    // Notify scripts.js that the slider content is ready
    window.dispatchEvent(new Event('sliderContentReady'));
}