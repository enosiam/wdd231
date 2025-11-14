// spotlight.js

const spotlightsContainer = document.getElementById("spotlights");

async function loadMembers() {
    try {
        const response = await fetch("members.json");
        const data = await response.json();

        // Filter Gold + Silver only
        const spotlightCandidates = data.members.filter(member =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        // Shuffle and pick 2–3 random companies
        const selectedSpotlights = spotlightCandidates
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = ""; // clear existing

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="membership-badge ${member.membership}">${member.membership}</span>
        `;

        spotlightsContainer.appendChild(card);
    });
}

loadMembers();

