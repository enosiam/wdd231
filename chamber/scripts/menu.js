// scripts/menu.js
const menuBtn = document.getElementById('menuBtn');
const primaryNav = document.getElementById('primaryNav');

menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
  menuBtn.setAttribute('aria-expanded', !expanded);
  primaryNav.classList.toggle('nav-show');
});
