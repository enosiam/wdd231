// scripts/menu.js
const menuBtn = document.getElementById('menuBtn');
const primaryNav = document.getElementById('primaryNav');

if (menuBtn && primaryNav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('nav-show');

    // If opening, move focus to first link for keyboard users
    if (!expanded) {
      primaryNav.querySelector('a')?.focus();
    } else {
      // if closing, return focus to the button
      menuBtn.focus();
    }
  });

  // Close nav on Escape for keyboard users
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('nav-show')) {
      primaryNav.classList.remove('nav-show');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
}
