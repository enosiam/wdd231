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

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    // Create grid/list content structure
    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo of ${member.name}" class="member-img">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <span class="membership-tag ${member.membership.toLowerCase()}">${member.membership} Member</span>
    `;

    container.appendChild(card);
  });
}

// Toggle Views
document.getElementById("gridBtn").addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");

  // Show images in grid view
  document.querySelectorAll(".member-img").forEach(img => img.style.display = "block");
});

document.getElementById("listBtn").addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");

  // Hide images in list view
  document.querySelectorAll(".member-img").forEach(img => img.style.display = "none");
});

// Initialize
getMembers();




