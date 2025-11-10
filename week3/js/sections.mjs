export function setSectionSelection(sections) {
  const select = document.getElementById("sectionNumber");
  select.innerHTML = sections
    .map(s => `<option value="${s.section}">${s.section}</option>`)
    .join("");
}
