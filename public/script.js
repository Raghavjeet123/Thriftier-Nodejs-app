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

            // Dummy validation: check if user exists in students
            const found = students.find(
                s =>
                    (s.email === contact || s.phone === contact) &&
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

        // Password toggle feature
        const togglePassword = document.getElementById("togglePassword");
        if (togglePassword) {
            togglePassword.addEventListener("click", () => {
                const pwField = document.getElementById("loginPassword");
                if (pwField.type === "password") {
                    pwField.type = "text";
                    togglePassword.textContent = "Hide";
                } else {
                    pwField.type = "password";
                    togglePassword.textContent = "Show";
                }
            });
        }
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
            const course = document.getElementById("course").value.trim();
            const dob = document.getElementById("dob").value;

            if (!fullName || !contact || !password || !course || !dob) {
                alert("⚠️ Please fill all fields!");
                return;
            }

            const student = {
                fullName,
                email: contact.includes("@") ? contact : "",
                phone: contact.includes("@") ? "" : contact,
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
                  <td>${escapeHtml(s.email)}</td>
                  <td>${escapeHtml(s.phone)}</td>
                  <td>${maskPassword(s.password)}</td>
                  <td>${escapeHtml(s.course)}</td>
                  <td>${escapeHtml(s.dob)}</td>
                  <td>${new Date(s.createdAt).toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            });
            if (countHeading) {
                countHeading.textContent = `Total Students: ${students.length}`;
            }
        }

        // Initial render on page load
        updateTable();
    }
});
