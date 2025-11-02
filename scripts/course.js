const courses = [
  { id: 'wdd101', title: 'Intro to Web', credits: 3, program: 'WDD101', completed: false },
  { id: 'wdd131', title: 'HTML & CSS', credits: 3, program: 'WDD131', completed: true },
  { id: 'cse120', title: 'Intro to Programming', credits: 4, program: 'CSE120', completed: false },
];

function renderCourses(filter = 'all') {
  const container = document.getElementById('courseList');
  if (!container) return;

  let filtered = [...courses];
  if (filter === 'wdd') filtered = filtered.filter(c => c.program.toLowerCase() === 'wdd');
  if (filter === 'cse') filtered = filtered.filter(c => c.program.toLowerCase() === 'cse');

  container.innerHTML = filtered.map(c => `
    <article class="course-card ${c.completed ? 'completed' : ''}" aria-label="${c.title}">
      <h3>${c.title}</h3>
      <p>Program: ${c.program}</p>
      <p>Credits: ${c.credits}</p>
      <p>Status: ${c.completed ? 'Completed' : 'Incomplete'}</p>
    </article>
  `).join('');

  const totalCredits = filtered.reduce((sum, cur) => sum + (cur.credits || 0), 0);
  const creditsEl = document.getElementById('credits');
  if (creditsEl) creditsEl.textContent = `Credits: ${totalCredits}`;
}

window.addEventListener('DOMContentLoaded', () => {
  renderCourses('all');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      renderCourses(filter);
    });
  });
});
