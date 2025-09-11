// script.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("regForm");
    const tbody = document.querySelector("#list tbody");
    const countHeading = document.getElementById("countHeading");
    let students = [];

    // Form submit hone par data table me add hoga
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const course = document.getElementById("course").value;

        if (!fullName || !email || !course) {
            alert("⚠️ Please fill all required fields!");
            return;
        }

        const student = {
            fullName,
            email,
            phone: phone || "-",
            course,
            createdAt: new Date()
        };

        students.push(student);
        updateTable();
        form.reset();
    });

    // Table update function
    function updateTable() {
        tbody.innerHTML = "";
        students.forEach((s, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${i + 1}</td>
              <td>${s.fullName}</td>
              <td>${s.email}</td>
              <td>${s.phone}</td>
              <td>${s.course}</td>
              <td>${s.createdAt.toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
        countHeading.textContent = `Total Students: ${students.length}`;
    }

    // Hover effect on inputs
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.backgroundColor = "#e8f9ff";
            input.style.border = "2px solid #0077b6";
        });
        input.addEventListener("blur", () => {
            input.style.backgroundColor = "";
            input.style.border = "1px solid #ccc";
        });
    });

    // Special effect for course dropdown
    const courseSelect = document.getElementById("course");
    courseSelect.addEventListener("change", () => {
        courseSelect.style.backgroundColor = "#ffeaa7";
        courseSelect.style.border = "2px solid #e17055";
    });

    // Hover effect on buttons
    const buttons = document.querySelectorAll("button, input[type='submit']");
    buttons.forEach(btn => {
        btn.addEventListener("mouseover", () => {
            btn.style.transform = "scale(1.1)";
            btn.style.backgroundColor = "#ff6600";
            btn.style.color = "#fff";
            btn.style.transition = "0.3s";
        });

        btn.addEventListener("mouseout", () => {
            btn.style.transform = "scale(1)";
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });
    });

    // Hover effect on table rows
    tbody.addEventListener("mouseover", (e) => {
        if (e.target.closest("tr")) {
            e.target.closest("tr").style.backgroundColor = "#d1f7ff";
        }
    });
    tbody.addEventListener("mouseout", (e) => {
        if (e.target.closest("tr")) {
            e.target.closest("tr").style.backgroundColor = "";
        }
    });
});
