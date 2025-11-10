// sections.mjs
export function setSectionSelection(sections) {
  const sectionSelect = document.querySelector("#sectionNumber");

  sections.forEach(section => {
    let option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = section.sectionNum;
    sectionSelect.appendChild(option);
  });
}
