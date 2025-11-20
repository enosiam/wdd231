// set timestamp when page loads
const timestampInput = document.getElementById('timestamp');
if (timestampInput) timestampInput.value = new Date().toISOString();

// modal open/close handlers
document.querySelectorAll('.open-modal').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.modal;
    const dialog = document.getElementById(id);
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  });
});

document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('dialog');
    if (dialog) dialog.close();
  });
});

// allow Esc to close dialogs
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
  }
});
