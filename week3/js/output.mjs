export function setTitle(course) {
  document.getElementById("courseName").textContent = course.name;
  document.getElementById("courseCode").textContent = course.code;
}

export function renderSections(sections) {
  const tbody = document.getElementById("sections");
  tbody.innerHTML = sections
    .map(
      s => `
    <tr>
      <td>${s.section}</td>
      <td>${s.enrolled}</td>
      <td>${s.instructor}</td>
    </tr>`
    )
    .join("");
}
