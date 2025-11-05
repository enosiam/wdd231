// directory.js - fetch members.json and render grid/list views
async function loadMembers() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const members = await res.json();
    renderMembers(members);
  } catch (err) {
    console.error(err);
    const container = document.getElementById('memberContainer');
    container.innerHTML = '<p>Sorry — could not load member data.</p>';
  }
}

function renderMembers(members) {
  const container = document.getElementById('memberContainer');
  container.innerHTML = members.map(m => memberCardHTML(m)).join('');

  // wire up any links 
  updateCredits(members);

  // set up list/grid toggle already handled by main script buttons
}

function memberCardHTML(m) {
  const membershipText = m.membership === 3 ? 'Gold' : m.membership === 2 ? 'Silver' : 'Member';
  return `
    <article class="member-card" tabindex="0" aria-label="${m.name}">
      <img src="images/logo.jpg" alt="${m.name} logo">
      <div class="member-meta">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p><a href="tel:${m.phone.replace(/\s+/g,'')}">${m.phone}</a></p>
        <p><a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></p>
        <p class="member-membership">${membershipText}</p>
      </div>
    </article>
  `;
}

function updateCredits(members) {
  // optional: sum membership levels as a surrogate for credits (not required)
  const creditsEl = document.getElementById('credits');
  if (!creditsEl) return;
  const total = members.reduce((s, m) => s + (m.credits || 0), 0);
  creditsEl.textContent = `Credits: ${total}`;
}

// view toggles
document.addEventListener('DOMContentLoaded', () => {
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const container = document.getElementById('memberContainer');

  gridBtn?.addEventListener('click', () => {
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  listBtn?.addEventListener('click', () => {
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    // adjust member cards for list view: add class to each to style flex-row
    document.querySelectorAll('.member-card').forEach(card => card.classList.add('list'));
  });

  loadMembers();
});
