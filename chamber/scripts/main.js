// main.js - navigation toggle and date
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const mainNav = document.getElementById('mainNav');
  menuButton?.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  // footer dates
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const lastEl = document.getElementById('lastModified');
  if (lastEl) lastEl.textContent = 'Last modified: ' + document.lastModified;
});
