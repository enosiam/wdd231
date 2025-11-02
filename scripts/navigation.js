const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primary-nav');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  primaryNav.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && window.matchMedia('(max-width:47.99rem)').matches) {
    primaryNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    primaryNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});