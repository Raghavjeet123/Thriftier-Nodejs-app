document.addEventListener("DOMContentLoaded", function () {
    // Local storage arrays
    let students = JSON.parse(localStorage.getItem("students") || "[]");

    // Helpers
    function maskPassword(pw) {
        return pw ? "•".repeat(Math.min(8, pw.length)) : "-";
    }
    function escapeHtml(text) {
        if (!text) return "-";
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    function persistStudents() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    // ---------------- Login Page ----------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("loginName").value.trim();
            const contact = document.getElementById("loginContact").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!name || !contact || !password) {
                alert("⚠️ Please fill all fields!");
                return;
            }

            // Check if user exists in students
            const found = students.find(
                s =>
                    (s.contact === contact) &&
                    s.password === password &&
                    s.fullName === name
            );
            if (found) {
                alert("✅ Login successful!");
            } else {
                alert("❌ Invalid credentials!");
            }
            loginForm.reset();
        });

        // Redirect to signup page
        const signupBtn = document.getElementById("signupBtn");
        signupBtn.addEventListener("click", () => {
            window.location.href = "signup.html";
        });
    }

    // ---------------- Signup Page ----------------
    const signupForm = document.getElementById("signupForm");
    const tbody = document.querySelector("#list tbody");
    const countHeading = document.getElementById("countHeading");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = document.getElementById("signupName").value.trim();
            const contact = document.getElementById("signupContact").value.trim();
            const password = document.getElementById("signupPassword").value.trim();
            const course = document.getElementById("signupCourse").value.trim();
            const dob = document.getElementById("signupDob").value;

            if (!fullName || !contact || !password || !course || !dob) {
                alert("⚠️ Please fill all fields!");
                return;
            }

            const student = {
                fullName,
                contact, // single field for email OR phone
                password,
                course,
                dob,
                createdAt: new Date().toISOString()
            };

            students.push(student);
            persistStudents();
            updateTable();
            signupForm.reset();
            alert("✅ Account created successfully!");
        });

        // Table update function
        function updateTable() {
            tbody.innerHTML = "";
            students.forEach((s, i) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                  <td>${i + 1}</td>
                  <td>${escapeHtml(s.fullName)}</td>
                  <td>${escapeHtml(s.contact)}</td>
                  <td>${maskPassword(s.password)}</td>
                  <td>${escapeHtml(s.course)}</td>
                  <td>${escapeHtml(s.dob)}</td>
                  <td>${new Date(s.createdAt).toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            });
            countHeading.textContent = `Total Students: ${students.length}`;
        }

        // Initial render on page load
        updateTable();
    }
});
