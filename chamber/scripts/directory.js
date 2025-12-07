import { members } from "../data/members.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderMembers(members);

  const gridBtn = document.getElementById("gridBtn");
  const listBtn = document.getElementById("listBtn");
  const container = document.getElementById("memberContainer");

  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
  });

  const filter = document.getElementById("membershipFilter");
  filter.addEventListener("change", () => {
    filterMembers(filter.value);
  });
});

function filterMembers(type) {
  let filtered =
    type === "all"
      ? members
      : members.filter((m) => m.membership === type);

  renderMembers(filtered);
}

function renderMembers(list) {
  const container = document.getElementById("memberContainer");
  container.innerHTML = list.map(memberCardHTML).join("");
}

function memberCardHTML(m) {
  return `
    <article class="member-card">
      <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
      <h3>${m.name}</h3>
      <address>${m.address}</address>
      <p><a href="tel:${m.phone}">${m.phone}</a></p>
      <p><a href="${m.website}" target="_blank">${m.website}</a></p>
      <p class="membership">${m.membership}</p>
    </article>
  `;
}
