function openModal(title, details) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-details").textContent = details;
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("close-modal").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};
