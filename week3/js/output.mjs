// output.mjs
export function setTitle(course) {
  document.querySelector("#courseName").textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const html = sections
    .map(section => `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.maxCapacity}</td>
      </tr>`)
    .join("");

  document.querySelector("#sections").innerHTML = html;
}
