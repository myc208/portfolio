// Dark mode toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggle.checked);
  localStorage.setItem('theme', toggle.checked ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }
});

// Radial menu logic
const menuBtn = document.getElementById('menu-button');
const menu = document.getElementById('radial-menu');
const items = menu.querySelectorAll('.menu-item');
const radius = 120;

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
  if (menu.classList.contains('active')) {
    items.forEach((item, i) => {
      const angle = (Math.PI / (items.length - 1)) * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      item.style.transform = `translate(-${x}px, -${y}px)`;
    });
  } else {
    items.forEach(item => item.style.transform = 'scale(0)');
  }
});

// Switching views
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
