// Mobile Nav Toggle
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("primaryNav").classList.toggle("nav-show");
});

// Fetch & Display Members
const container = document.querySelector("#memberContainer");

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

document.getElementById("gridBtn").addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

document.getElementById("listBtn").addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

getMembers();



