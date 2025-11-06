// footer.js — outputs copyright year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('copyrightYear');
  if (y) y.textContent = new Date().getFullYear();

  const lm = document.getElementById('lastModified');
  if (lm) lm.textContent = 'Last modified: ' + document.lastModified;
});

