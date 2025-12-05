// modal.js - small modal utility using dialog element
export function openModal(id, htmlContent) {
  const dlg = document.getElementById(id);
  if (!dlg) return;
  const content = dlg.querySelector('#strategyModalContent') || dlg.querySelector('#modalContent') || null;
  if (content) content.innerHTML = htmlContent;
  if (typeof dlg.showModal === 'function') {
    dlg.showModal();
  } else {
    // fallback for older browsers
    dlg.setAttribute('open', '');
  }
  // set accessible focus
  const close = dlg.querySelector('.close-modal');
  if (close) close.focus();
}

export function closeModal(id) {
  const dlg = document.getElementById(id);
  if (!dlg) return;
  if (typeof dlg.close === 'function') dlg.close();
  else dlg.removeAttribute('open');
}

// close all dialogs on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
  }
});

// close when close button clicked
document.addEventListener('click', (e) => {
  if (e.target.matches('.close-modal')) {
    const dlg = e.target.closest('dialog');
    if (dlg) dlg.close();
  }
});
