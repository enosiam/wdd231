// footer utilities (copyright year + last modified)
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('copyrightYear');
  if (y) y.textContent = new Date().getFullYear();
  const last = document.getElementById('lastModified');
  if (last) last.textContent = document.lastModified || '—';
});
