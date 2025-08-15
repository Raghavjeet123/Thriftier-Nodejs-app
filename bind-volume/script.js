async function fetchStudents() {
  const res = await fetch('/api/students');
  const data = await res.json();
  const tbody = document.querySelector('#list tbody');
  tbody.innerHTML = '';
  data.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${s.fullName}</td>
      <td>${s.email}</td>
      <td>${s.phone || '-'}</td>
      <td>${s.course}</td>
      <td>${new Date(s.createdAt).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    course: document.getElementById('course').value
  };
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const { error } = await res.json();
    alert(error || 'Failed');
    return;
  }
  e.target.reset();
  await fetchStudents();
});

fetchStudents();
