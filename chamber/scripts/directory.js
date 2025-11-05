const memberContainer = document.getElementById("memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Fetch JSON
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

// Display Members
function displayMembers(members) {
  memberContainer.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    memberContainer.appendChild(card);
  });
}

// View Toggle
gridBtn.onclick = () => memberContainer.className = "grid-view";
listBtn.onclick = () => memberContainer.className = "list-view";

getMembers();

