window.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastEl = document.getElementById('lastModified');
  if (lastEl) lastEl.textContent = 'Last modified: ' + document.lastModified;
});
