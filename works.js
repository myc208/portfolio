document.addEventListener('DOMContentLoaded', function () {
  // Toggle radial menu
  const menu = document.getElementById('radial-menu');
  const menuBtn = document.getElementById('menu-button');
  const items = document.querySelectorAll('.menu-item');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // View switching
  items.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      document.querySelectorAll('.project-view').forEach(view => {
        view.classList.remove('active');
      });
      const view = document.getElementById(`view-${id}`);
      if (view) view.classList.add('active');
      menu.classList.remove('active');
    });
  });

  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  themeToggle.addEventListener('change', () => {
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Persist dark mode preference
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
});