const memberContainer = document.querySelector("#memberContainer");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector(".nav");

// Mobile Toggle
menuBtn.addEventListener("click", () => {
    nav.style.display = nav.style.display === "block" ? "none" : "block";
});

// Fetch Data
async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="badge">${member.membership} Member</span>
        `;
        memberContainer.appendChild(card);
    });
}

// View Toggle
gridBtn.addEventListener("click", () => {
    memberContainer.classList.add("grid-view");
    memberContainer.classList.remove("list-view");
});
listBtn.addEventListener("click", () => {
    memberContainer.classList.add("list-view");
    memberContainer.classList.remove("grid-view");
});

getMembers();



