const spotlightsContainer = document.getElementById("spotlights");

async function loadSpotlights() {
  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error('Failed to fetch spotlights');
    const data = await res.json();

    const eligible = data.members.filter(m => m.membership === "Gold" || m.membership === "Silver");
    if (eligible.length === 0) {
      spotlightsContainer.innerHTML = '<p>No eligible spotlight members at this time.</p>';
      return;
    }

    const shuffled = eligible.sort(() => Math.random() - 0.5).slice(0, Math.min(3, eligible.length));

    spotlightsContainer.innerHTML = shuffled.map(member => `
      <article class="spotlight-card">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="80">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p><a href="tel:${member.phone.replace(/\s+/g,'')}">${member.phone}</a></p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        <span class="membership-tag ${member.membership.toLowerCase()}">${member.membership}</span>
      </article>
    `).join('');
  } catch (err) {
    console.error(err);
    if (spotlightsContainer) spotlightsContainer.innerHTML = '<p>Unable to load spotlight members at this time.</p>';
  }
}

if (spotlightsContainer) loadSpotlights();
