async function loadStrategies() {
  const res = await fetch("data/strategies.json");
  const data = await res.json();

  const list = document.querySelector("#strategy-list");
  const searchBar = document.querySelector("#searchBar");

  function display(strategies) {
    list.innerHTML = "";
    strategies.forEach(s => {
      const div = document.createElement("div");
      div.classList.add("strategy-card");
      div.innerHTML = `
        <h3>${s.name}</h3>
        <p>Risk: ${s.risk}</p>
        <p>Type: ${s.type}</p>
        <button onclick='openModal("${s.name}", "${s.example}")'>More</button>
      `;
      list.appendChild(div);
    });
  }

  display(data);

  searchBar.addEventListener("input", () => {
    const filtered = data.filter(s =>
      s.name.toLowerCase().includes(searchBar.value.toLowerCase())
    );
    display(filtered);
  });
}

loadStrategies();
