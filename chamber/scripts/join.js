// scripts/join.js
// set timestamp when page loads
const timestampInput = document.getElementById('timestamp');
if (timestampInput) timestampInput.value = new Date().toISOString();

// Open/close dialogs (using <dialog>)
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.dataset.modal;
    const dialog = document.getElementById(id);
    if (!dialog) return;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      // focus first focusable element inside dialog (Close button)
      dialog.querySelector('.close-modal')?.focus();
    } else {
      // fallback for browsers without <dialog>
      dialog.setAttribute('aria-hidden', 'false');
    }
  });
});

// Close button
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('dialog');
    if (dialog) dialog.close();
  });
});

// Click on backdrop (dialog polyfill-safe fallback)
// For native dialogs, the click event target is the dialog itself when clicking backdrop
document.querySelectorAll('dialog').forEach(d => {
  d.addEventListener('click', (e) => {
    const rect = d.getBoundingClientRect();
    // if click is outside dialog content area (approx), close
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      d.close();
    }
  });
});

// Close on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
  }
});
