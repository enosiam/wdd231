// scripts/spotlights.js
const spotlightsContainer = document.getElementById("spotlights");

async function loadMembers() {
  try {
    const response = await fetch("members.json");
    const data = await response.json();

    // Filter Gold + Silver members only
    const spotlightCandidates = data.members.filter(member =>
      member.membership === "Gold" || member.membership === "Silver"
    );

    // Shuffle and pick 2–3 random members
    const selectedSpotlights = spotlightCandidates
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    displaySpotlights(selectedSpotlights);
  } catch (error) {
    console.error("Error loading spotlight members:", error);
    spotlightsContainer.innerHTML = "<p>Unable to load spotlight members at this time.</p>";
  }
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = ""; // Clear any existing content

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p><a href="tel:${member.phone.replace(/\s+/g, '')}">${member.phone}</a></p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <span class="membership-tag ${member.membership.toLowerCase()}">${member.membership}</span>
    `;

    spotlightsContainer.appendChild(card);
  });
}

// Load spotlight members on page load
loadMembers();
