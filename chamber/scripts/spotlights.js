// scripts/spotlights.js
const spotlightsContainer = document.getElementById("spotlights");

async function loadSpotlights() {
  try {
    // Fetch members.json
    const response = await fetch("members.json");
    if (!response.ok) throw new Error("Failed to fetch members.json");
    const data = await response.json();

    // Filter for Gold and Silver members only
    const eligibleMembers = data.members.filter(
      member => member.membership === "Gold" || member.membership === "Silver"
    );

    if (eligibleMembers.length === 0) {
      spotlightsContainer.innerHTML = "<p>No eligible spotlight members at this time.</p>";
      return;
    }

    // Shuffle array randomly
    const shuffled = eligibleMembers.sort(() => Math.random() - 0.5);

    // Select 2–3 members
    const selectedMembers = shuffled.slice(0, Math.min(3, shuffled.length));

    // Clear container
    spotlightsContainer.innerHTML = "";

    // Create and append spotlight cards
    selectedMembers.forEach(member => {
      const card = document.createElement("section");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        <span class="membership-tag ${member.membership.toLowerCase()}">${member.membership}</span>
      `;

      spotlightsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlight members:", error);
    spotlightsContainer.innerHTML = "<p>Unable to load spotlight members at this time.</p>";
  }
}

// Run on page load
loadSpotlights();
