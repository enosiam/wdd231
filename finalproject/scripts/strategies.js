// strategies.js (ES Module) - loads strategies, renders grid, search/filter, opens modal
import { openModal, closeModal } from './modal.js';
import { saveProgress, loadProgress } from './storage.js';

const strategyListEl = document.getElementById('strategyList');
const spotlightsEl = document.getElementById('spotlights'); // on index page
const searchInput = document.getElementById('searchInput');
const riskFilter = document.getElementById('riskFilter');
const clearFiltersBtn = document.getElementById('clearFilters');

async function fetchStrategies() {
  try {
    const res = await fetch('data/strategies.json');
    if (!res.ok) throw new Error('Failed to fetch strategies.json');
    const json = await res.json();
    return json.strategies || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function makeCardHTML(s) {
  return `
    <article class="strategy-card" data-id="${s.id}">
      <h3>${s.title}</h3>
      <div class="strategy-meta"><span>Type: ${s.type}</span><span>Risk: ${s.risk}</span></div>
      <p class="muted">${s.description}</p>
      <div class="strategy-actions">
        <button class="open-detail" data-id="${s.id}">Details</button>
        <button class="bookmark" data-id="${s.id}">Bookmark</button>
      </div>
    </article>
  `;
}

function renderList(strategies, container = strategyListEl) {
  if (!container) return;
  container.innerHTML = strategies.map(s => makeCardHTML(s)).join('');
  // attach listeners
  container.querySelectorAll('.open-detail').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = btn.dataset.id;
      const s = strategies.find(x => x.id === id);
      if (s) {
        openModal('strategyModal', `
          <h2 id="strategyModalTitle">${s.title}</h2>
          <p><strong>Type:</strong> ${s.type} • <strong>Risk:</strong> ${s.risk}</p>
          <p>${s.description}</p>
          <p><strong>Example:</strong> ${s.example}</p>
        `);
      }
    });
  });

  container.querySelectorAll('.bookmark').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      saveProgress(id);
      btn.textContent = 'Bookmarked';
    });
  });
}

// for index spotlights: pick random 2-3
function renderSpotlights(strategies) {
  if (!spotlightsEl) return;
  const elig = strategies.slice().sort(() => Math.random() - 0.5).slice(0,3);
  spotlightsEl.innerHTML = elig.map(s => `
    <article class="spotlight-card">
      <h3>${s.title}</h3>
      <p class="muted">${s.description}</p>
      <p><button class="open-detail" data-id="${s.id}">Details</button></p>
    </article>
  `).join('');
  spotlightsEl.querySelectorAll('.open-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const s = strategies.find(x => x.id === id);
      if (s) openModal('strategyModal', `
        <h2 id="strategyModalTitle">${s.title}</h2>
        <p><strong>Type:</strong> ${s.type} • <strong>Risk:</strong> ${s.risk}</p>
        <p>${s.description}</p><p><strong>Example:</strong> ${s.example}</p>
      `);
    });
  });
}

function applyFilters(all) {
  let list = all.slice();
  const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const risk = riskFilter ? riskFilter.value : '';
  if (q) {
    list = list.filter(s => (s.title + ' ' + s.description + ' ' + (s.tags||[]).join(' ')).toLowerCase().includes(q));
  }
  if (risk) list = list.filter(s => s.risk === risk);
  renderList(list);
}

async function init() {
  const all = await fetchStrategies();
  // show spotlights on index
  renderSpotlights(all);
  // initial render on strategies page
  renderList(all);

  // filters
  searchInput?.addEventListener('input', () => applyFilters(all));
  riskFilter?.addEventListener('change', () => applyFilters(all));
  clearFiltersBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (riskFilter) riskFilter.value = '';
    applyFilters(all);
  });
}

init();
export { fetchStrategies };
