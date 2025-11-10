const courses = [
  { number: "CSE 210", name: "Introduction to Programming", credits: 2, type: "cse", completed: true },
  { number: "CSE 111", name: "Programming with Functions", credits: 2, type: "cse", completed: true },
  { number: "WDD 130", name: "Web Fundamentals", credits: 2, type: "wdd", completed: true },
  { number: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "wdd", completed: true },
  { number: "WDD 231", name: "Web Frontend Development I", credits: 2, type: "wdd", completed: false },
  { number: "WDD 330", name: "Web Frontend Development II", credits: 2, type: "wdd", completed: false },
];

function renderCourses(filter = "all") {
  const container = document.getElementById("courseList");
  let filtered = courses;

  // Apply filter
  if (filter === "wdd") filtered = courses.filter(c => c.type === "wdd");
  if (filter === "cse") filtered = courses.filter(c => c.type === "cse");

  // Render cards
  container.innerHTML = filtered.map(course => `
    <article class="course-card ${course.completed ? "completed" : ""}">
      <h3>${course.number}</h3>
      <p>${course.name}</p>
      <p><strong>${course.credits}</strong> Credits</p>
      <p>Status: ${course.completed ? "✅ Completed" : "In Progress ⏳..."}</p>
    </article>
  `).join("");

  // Update credits using reduce()
  const creditTotal = filtered.reduce((total, course) => total + course.credits, 0);
  document.getElementById("credits").textContent = `Credits: ${creditTotal}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCourses("all");
  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.addEventListener("click", () => renderCourses(btn.dataset.filter))
  );
});
