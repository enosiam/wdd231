function calcPip() {
  const lots = Number(document.getElementById("lots").value);
  const pips = Number(document.getElementById("pips").value);

  if (!lots || !pips) {
    document.getElementById("pip-result").textContent = "Enter values!";
    return;
  }

  const result = lots * pips * 10;
  document.getElementById("pip-result").textContent = `Result: $${result}`;
}

document.getElementById("psychology-list").innerHTML = `
  <li>Stick to your plan</li>
  <li>Control your emotions</li>
  <li>Never over-leverage</li>
`;
