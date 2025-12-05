// accessible mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const primaryNav = document.getElementById('primaryNav');

if (menuBtn && primaryNav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('nav-show');
  });
}
