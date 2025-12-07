// discover.js (type=module)
import items from '../data/discover-data.mjs';

const cardsContainer = document.getElementById('cardsContainer');
const visitMessageEl = document.getElementById('visitMessage');
const dialog = document.getElementById('itemDialog');
const dialogBody = document.getElementById('dialogBody');
const dialogClose = document.getElementById('dialogClose');

// ---------- last visit localStorage ----------
(function handleLastVisit() {
  try {
    const key = 'enosiam_discover_last_visit';
    const prevISO = localStorage.getItem(key);
    const now = Date.now();
    if (!prevISO) {
      visitMessageEl.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
      const prev = Number(prevISO);
      const diffMs = now - prev;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 1) {
        visitMessageEl.textContent = 'Back so soon! Awesome!';
      } else if (diffDays === 1) {
        visitMessageEl.textContent = 'You last visited 1 day ago.';
      } else {
        visitMessageEl.textContent = `You last visited ${diffDays} days ago.`;
      }
    }
    localStorage.setItem(key, String(now));
  } catch (err) {
    console.warn('localStorage not available', err);
  }
})();

// ---------- render cards from data ----------
function createCard(item, index) {
  const card = document.createElement('article');
  card.className = `card a${index + 1}`;
  card.setAttribute('tabindex', '0');

  // required: h2, figure (image), address, p (description), button "learn more"
  card.innerHTML = `
    <figure>
      <img src="${item.image}" alt="${item.title}" loading="lazy" width="640" height="360">
    </figure>
    <div class="card-body">
      <h2>${item.title}</h2>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-btn" data-id="${item.id}">Learn more</button>
    </div>
  `;
  return card;
}

function renderAll(itemsArr) {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = '';
  itemsArr.forEach((it, i) => {
    const node = createCard(it, i);
    cardsContainer.appendChild(node);
  });

  // attach event listeners to buttons
  cardsContainer.querySelectorAll('.learn-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(btn.dataset.id);
      const item = itemsArr.find(x => x.id === id);
      openDialog(item);
    });
  });
}

// ---------- dialog open/close ----------
function openDialog(item) {
  if (!dialog) return;
  dialogBody.innerHTML = `
    <figure><img src="${item.image}" alt="${item.title}" loading="lazy" style="width:100%;height:auto;object-fit:cover"></figure>
    <h4>${item.title}</h4>
    <address>${item.address}</address>
    <p>${item.description}</p>
    ${item.url ? `<p><a href="${item.url}" target="_blank" rel="noopener">More info</a></p>` : ''}
  `;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else alert(`${item.title}\n\n${item.address}\n\n${item.description}`);
}

if (dialogClose) {
  dialogClose.addEventListener('click', () => dialog.close());
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dialog && dialog.open) dialog.close();
});

// Initialize
renderAll(items);
