// directory.js — fetch members, render grid/list, update credits
document.addEventListener('DOMContentLoaded', () => {
  const url = 'data/members.json';
  const container = document.getElementById('memberContainer');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const creditsEl = document.getElementById('credits');

  // initial view = grid
  container.classList.add('grid-view');

  async function loadMembers() {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      renderMembers(data.members || []);
      updateCredits(data.members || []);
    } catch (err) {
      console.error('Failed to load members:', err);
      container.innerHTML = '<p>Failed to load directory data.</p>';
    }
  }

  function renderMembers(members) {
    container.innerHTML = '';
    if (!Array.isArray(members) || members.length === 0) {
      container.innerHTML = '<p>No members found.</p>';
      return;
    }

    members.forEach(member => {
      const article = document.createElement('article');
      article.className = 'member-card';
      article.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <div class="member-meta">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p><a href="tel:${member.phone.replace(/\s+/g,'')}">${member.phone}</a></p>
          <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p class="badge">${member.membership}</p>
        </div>
      `;
      container.appendChild(article);
    });
  }

  function updateCredits(members) {
    if (!creditsEl) return;
    // optional: sum a numerical credit field if provided; use count here
    creditsEl.textContent = `Members: ${members.length}`;
  }

  // toggle view handlers
  gridBtn?.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.setAttribute('aria-pressed','true');
    listBtn.setAttribute('aria-pressed','false');
  });

  listBtn?.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    gridBtn.setAttribute('aria-pressed','false');
    listBtn.setAttribute('aria-pressed','true');
  });

  // load
  loadMembers();
});


