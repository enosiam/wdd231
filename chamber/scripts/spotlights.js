async function loadSpotlight() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  // 1️⃣ Filter to only Gold and Silver members
  const qualified = data.members.filter(member =>
    member.membership === "Gold" || member.membership === "Silver"
  );

  // 2️⃣ Randomly shuffle the array
  const shuffled = qualified.sort(() => Math.random() - 0.5);

  // 3️⃣ Pick the first 1-2 members
  const spotlightMembers = shuffled.slice(0, 2);

  const container = document.getElementById("spotlight");

  spotlightMembers.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <span class="membership-tag ${member.membership.toLowerCase()}">
        ${member.membership}
      </span>
    `;

    container.appendChild(card);
  });
}

loadSpotlight();
