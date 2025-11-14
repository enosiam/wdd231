// scripts/footer.js
const yearSpan = document.getElementById('copyrightYear');
const lastModSpan = document.getElementById('lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified || '—';
// End of footer.js