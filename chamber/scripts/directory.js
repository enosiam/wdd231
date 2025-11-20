const container = document.querySelector("#memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const membershipFilter = document.getElementById("membershipFilter");

async function getMembers() {
  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error('Failed to fetch members');
    const data = await res.json();
    displayMembers(data.members);
    setupFilter(data.members);
  } catch (err) {
    console.error(err);
    if (container) container.innerHTML = '<p>Unable to load directory at this time.</p>';
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.className = 'member-card';
    card.innerHTML = `
      <img class="member-img" src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" width="280" height="140">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p><a href="tel:${member.phone.replace(/\s+/g,'')}">${member.phone}</a></p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <span class="membership-tag ${member.membership.toLowerCase()}">${member.membership}</span>
    `;
    container.appendChild(card);
  });
}

gridBtn?.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
  gridBtn.setAttribute('aria-pressed','true');
  listBtn.setAttribute('aria-pressed','false');
});

listBtn?.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
  listBtn.setAttribute('aria-pressed','true');
  gridBtn.setAttribute('aria-pressed','false');
});

function setupFilter(allMembers) {
  membershipFilter?.addEventListener('change', () => {
    const value = membershipFilter.value;
    const filtered = value === 'all' ? allMembers : allMembers.filter(m => m.membership === value);
    displayMembers(filtered);
  });
}

getMembers();


