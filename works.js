// ==========================================================================
// works.js – Handles interactivity for work-related views
// Author: Ming Yang Portfolio
// ==========================================================================

// --------------------------------------------------------------------------
// DARK MODE TOGGLE LOGIC
// --------------------------------------------------------------------------

// 1. Get the toggle switch and the <body> element
const toggle = document.getElementById('theme-toggle');
const body = document.body;

// 2. On change, apply or remove the dark mode class and persist the setting
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

// 3. On page load, check localStorage for saved theme and apply it
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
  } else {
    body.classList.remove('dark-mode');
    toggle.checked = false;
  }
});

// --------------------------------------------------------------------------
// (Optional) SMOOTH FADE-IN FOR MAIN CONTENT – CAN BE ENHANCED LATER
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.main-content');
  if (content) {
    content.style.opacity = 0;
    content.style.transition = 'opacity 0.8s ease-in-out';
    requestAnimationFrame(() => {
      content.style.opacity = 1;
    });
  }
});

// --------------------------------------------------------------------------
// READY FOR EXTENSIONS: animations, keyboard toggles, nav interactions
// --------------------------------------------------------------------------
// Example future logic:
// - IntersectionObserver for lazy fade-in
// - Keyboard shortcut for toggling dark mode
// - Scroll-to-top button
