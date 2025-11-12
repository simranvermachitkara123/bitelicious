document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const passwordField = document.getElementById("signupPassword");
  const checklist = document.querySelector(".password-checklist");

  // === PASSWORD TOGGLE ===
  document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  });

  // === PASSWORD STRENGTH CHECK ===
  if (passwordField && checklist) {
    passwordField.addEventListener("focus", () => {
      checklist.style.display = "block";
    });

    passwordField.addEventListener("blur", () => {
      if (passwordField.value.trim() === "") {
        checklist.style.display = "none";
      }
    });

    passwordField.addEventListener("input", () => {
      const value = passwordField.value;
      document.getElementById("length").style.color = value.length >= 8 ? "green" : "red";
      document.getElementById("uppercase").style.color = /[A-Z]/.test(value) ? "green" : "red";
      document.getElementById("number").style.color = /\d/.test(value) ? "green" : "red";
      document.getElementById("special").style.color = /[!@#$%^&*]/.test(value) ? "green" : "red";
    });
  }

  // === HELPER FUNCTIONS ===
  function showError(input, message) {
    const errorMsg = input.parentElement.querySelector(".error");
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.style.color = "red";
    }
  }

  function showSuccess(input) {
    const errorMsg = input.parentElement.querySelector(".error");
    if (errorMsg) {
      errorMsg.textContent = "";
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  }

  // === SIGNUP VALIDATION ===
  if (signupForm) {
    // Add 'async' to allow 'await' for fetch
    signupForm.addEventListener("submit", async e => {
      e.preventDefault();
      const name = signupForm.querySelector("#signupName");
      const email = signupForm.querySelector("#signupEmail");
      const password = signupForm.querySelector("#signupPassword");
      const confirm = signupForm.querySelector("#signupConfirmPassword");
      let valid = true;

      // (All your validation logic is correct)
      if (/\d/.test(name.value.trim()) || name.value.trim() === "") {
        showError(name, "Name cannot contain numbers or be empty");
        valid = false;
      } else showSuccess(name);

      if (!isValidEmail(email.value.trim())) {
        showError(email, "Invalid email format");
        valid = false;
      } else showSuccess(email);

      if (!isValidPassword(password.value)) {
        showError(password, "Weak password");
        valid = false;
      } else showSuccess(password);

      if (confirm.value !== password.value || confirm.value === "") {
        showError(confirm, "Passwords do not match");
        valid = false;
      } else showSuccess(confirm);

      if (valid) {
        // --- THIS IS THE NEW CODE ---
        try {
          const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.value.trim(),
              email: email.value.trim(),
              password: password.value
            })
          });

          const data = await response.json();

          if (response.ok) { // Server responded with 201
            alert(data.message || "Signup successful!");
            signupForm.reset();
            if (checklist) {
              checklist.style.display = "none";
              document.querySelectorAll(".password-checklist li").forEach(li => (li.style.color = "red"));
            }
          } else {
            // Show server-side error (e.g., "User already exists")
            showError(confirm, data.error || "Signup failed.");
          }
        } catch (err) {
          console.error("Signup error:", err);
          showError(confirm, "Cannot connect to server.");
        }
        // --- END OF NEW CODE ---
      }
    });
  }

  // === LOGIN VALIDATION ===
  if (loginForm) {
    // Add 'async' to allow 'await' for fetch
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      const email = loginForm.querySelector("#loginEmail");
      const password = loginForm.querySelector("#loginPassword");
      let valid = true;

      if (!isValidEmail(email.value.trim())) {
        showError(email, "Enter valid email");
        valid = false;
      } else showSuccess(email);

      if (password.value.trim() === "") {
        showError(password, "Password cannot be empty");
        valid = false;
      } else showSuccess(password);

      if (valid) {
        // START: FETCH API CALL 
        try {
          const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
             email: email.value.trim().toLowerCase(),
              password: password.value
            })
          });

          const data = await response.json();

          if (response.ok) { // Server responded with 200
            alert(data.message || "Login successful!");
            localStorage.setItem("currentUser", JSON.stringify(data.user)); // Save user
            loginForm.reset();
            window.location.href = "../html/home_page.html"; // Redirect to home
          } else {
            // Show server-side error (e.g., "Invalid credentials")
            showError(password, data.error || "Invalid email or password.");
          }
        } catch (err) {
          console.error("Login error:", err);
          showError(password, "Cannot connect to server.");
        }
        // --- END OF NEW CODE ---
      }
    });
  }
});


