// Selectors
const memberContainer = document.getElementById("memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Fetch the JSON data
async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading member data:", error);
    }
}

// Display members on page
function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        memberContainer.appendChild(card);
    });
}

// View Toggle Buttons
gridBtn.addEventListener("click", () => {
    memberContainer.classList.add("grid-view");
    memberContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    memberContainer.classList.add("list-view");
    memberContainer.classList.remove("grid-view");
});

// Run
getMembers();
