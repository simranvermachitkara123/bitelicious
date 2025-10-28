// // Select forms
// const signupForm = document.querySelector(".sign-up-container form");
// const loginForm = document.querySelector(".sign-in-container form");

// //signup........
// signupForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const name = signupForm.querySelector('input[type="text"]').value;
//   const email = signupForm.querySelector('input[type="email"]').value;
//   const password = signupForm.querySelector('input[type="password"]').value;

//   // Get old users
//   let users = JSON.parse(localStorage.getItem("users")) || [];


//   const exists = users.find((user) => user.email === email); // email already exist
//   if (exists) {
//     alert("User already exists! Please login instead.");
//     return;
//   }


//   const newUser = { name, email, password };  // new user object 

//   // Add to array & store again
//   users.push(newUser);
//   localStorage.setItem("users", JSON.stringify(users));

//   alert("Signup Successful 🎉");
//   signupForm.reset();
// });

// // login........
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = loginForm.querySelector('input[type="email"]').value;
//   const password = loginForm.querySelector('input[type="password"]').value;

//   // Get stored users
//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   // Check if user exists
//   const validUser = users.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (validUser) {
//     alert(`Welcome back, ${validUser.name}! `);
//     localStorage.setItem("currentUser", JSON.stringify(validUser));
//     window.location.href = "home.html"; // redirect if you want
//   } else {
//     alert("Invalid email or password.Please try again ");
//   }
// });




// // Select forms
// const signupForm = document.querySelector(".sign-up-container form");
// const loginForm = document.querySelector(".sign-in-container form");

// // Helper function to get data from localStorage
// function getUsers() {
//   return JSON.parse(localStorage.getItem("users")) || [];
// }

// // Helper function to save users to localStorage
// function saveUsers(users) {
//   localStorage.setItem("users", JSON.stringify(users));
// }

// // ✅ Signup validation and storage
// signupForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const name = signupForm.querySelector('input[type="text"]').value.trim();
//   const email = signupForm.querySelector('input[type="email"]').value.trim();
//   const password = signupForm.querySelector('input[type="password"]').value.trim();

//   // --- Validation ---
//   if (!name || !email || !password) {
//     alert("All fields are required!");
//     return;
//   }

//   // Email format validation
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   // Password strength (min 6 chars)
//   if (password.length < 6) {
//     alert("Password must be at least 6 characters long.");
//     return;
//   }

//   // Load users and check if already exists
//   const users = getUsers();
//   const exists = users.find((user) => user.email === email);

//   if (exists) {
//     alert("User already exists! Please login instead.");
//     return;
//   }

//   // Save new user
//   const newUser = { name, email, password };
//   users.push(newUser);
//   saveUsers(users);

//   alert("Signup Successful 🎉");
//   signupForm.reset();
// });

// // ✅ Login validation
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = loginForm.querySelector('input[type="email"]').value.trim();
//   const password = loginForm.querySelector('input[type="password"]').value.trim();

//   if (!email || !password) {
//     alert("Please fill in both email and password.");
//     return;
//   }

//   const users = getUsers();

//   // Validate user
//   const validUser = users.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (validUser) {
//     alert(`Welcome back, ${validUser.name}!`);
//     localStorage.setItem("currentUser", JSON.stringify(validUser));
//     window.location.href = "../html/home_page.html"; // Redirect after login
//   } else {
//     alert("Invalid email or password. Please try again.");
//   }
// });
// Select forms
const signupForm = document.querySelector(".sign-up-container form");
const loginForm = document.querySelector(".sign-in-container form");

// Helper functions
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---------------------- PASSWORD MESSAGE BELOW FIELD ---------------------- //
const passwordField = document.getElementById("signup-password");
const confirmField = document.getElementById("confirm-password");

// Create and style password message
const passwordMessage = document.createElement("p");
passwordMessage.style.color = "red";
passwordMessage.style.fontSize = "13px";
passwordMessage.style.marginTop = "5px";
passwordField.insertAdjacentElement("afterend", passwordMessage);

// Create and style confirm password message
const confirmMessage = document.createElement("p");
confirmMessage.style.color = "red";
confirmMessage.style.fontSize = "13px";
confirmMessage.style.marginTop = "5px";
confirmField.insertAdjacentElement("afterend", confirmMessage);

// Password strength pattern
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/;

// Live password validation
passwordField.addEventListener("input", () => {
  const password = passwordField.value.trim();
  if (!password) {
    passwordMessage.textContent = "";
    return;
  }

  if (!passwordPattern.test(password)) {
    passwordMessage.textContent =
      "Password must be at least 8 characters and include:\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character";
    passwordMessage.style.color = "red";
  } else {
    passwordMessage.textContent = "✅ Strong password";
    passwordMessage.style.color = "green";
  }
});

// Live confirm password validation
confirmField.addEventListener("input", () => {
  const password = passwordField.value.trim();
  const confirmPassword = confirmField.value.trim();

  if (!confirmPassword) {
    confirmMessage.textContent = "";
    return;
  }

  if (password !== confirmPassword) {
    confirmMessage.textContent = "Passwords do not match!";
    confirmMessage.style.color = "red";
  } else {
    confirmMessage.textContent = "✅ Passwords match";
    confirmMessage.style.color = "green";
  }
});

// ---------------------- AUTOFILL DROPDOWN FOR NAME & EMAIL ---------------------- //
function setupAutocomplete(inputElement, key) {
  const dataList = document.createElement("datalist");
  dataList.id = `${key}-list`;
  inputElement.setAttribute("list", dataList.id);
  document.body.appendChild(dataList);

  inputElement.addEventListener("focus", () => {
    const users = getUsers();
    const uniqueValues = [...new Set(users.map((user) => user[key]))];
    dataList.innerHTML = uniqueValues
      .map((val) => `<option value="${val}"></option>`)
      .join("");
  });
}

// Attach to signup fields
const nameField = signupForm.querySelector('input[type="text"]');
const emailField = signupForm.querySelector('input[type="email"]');
setupAutocomplete(nameField, "name");
setupAutocomplete(emailField, "email");

// Attach to login email
const loginEmailField = loginForm.querySelector('input[type="email"]');
setupAutocomplete(loginEmailField, "email");

// ---------------------- SIGNUP VALIDATION ---------------------- //
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const confirmPassword = confirmField.value.trim();

  if (!name || !email || !password || !confirmPassword) {
    confirmMessage.textContent = "All fields are required!";
    confirmMessage.style.color = "red";
    return;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    confirmMessage.textContent = "Please enter a valid email address.";
    confirmMessage.style.color = "red";
    return;
  }

  // Password validation
  if (!passwordPattern.test(password)) {
    confirmMessage.textContent =
      "Password must meet the required conditions.";
    confirmMessage.style.color = "red";
    return;
  }

  // Confirm password check
  if (password !== confirmPassword) {
    confirmMessage.textContent = "Passwords do not match!";
    confirmMessage.style.color = "red";
    return;
  }

  // Check for existing user
  const users = getUsers();
  const exists = users.find((user) => user.email === email);
  if (exists) {
    confirmMessage.textContent = "User already exists! Please login instead.";
    confirmMessage.style.color = "red";
    return;
  }

  // Save new user
  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers(users);

  confirmMessage.style.color = "green";
  confirmMessage.textContent = "Signup Successful 🎉 Redirecting...";
  setTimeout(() => {
    signupForm.reset();
    confirmMessage.textContent = "";
  }, 2000);
});

// ---------------------- LOGIN VALIDATION ---------------------- //
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value.trim();
  const password = loginForm.querySelector('input[type="password"]').value.trim();

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  const users = getUsers();
  const validUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (validUser) {
    alert(`Welcome back, ${validUser.name}!`);
    localStorage.setItem("currentUser", JSON.stringify(validUser));
    window.location.href = "../html/home_page.html"; // Redirect
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
// ---------- AUTO-SUGGESTIONS / AUTOFILL FOR LOGIN EMAIL ---------- //

// Select the login email field
const loginEmailInput = document.querySelector('.sign-in-container input[type="email"]');

// Create datalist element
const emailDataList = document.createElement("datalist");
emailDataList.id = "login-email-list";

// Attach datalist to input field
loginEmailInput.setAttribute("list", emailDataList.id);
document.body.appendChild(emailDataList);

// Function to fetch and show saved user emails
function populateEmailSuggestions() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const uniqueEmails = [...new Set(users.map(user => user.email))];

  // Populate datalist
  emailDataList.innerHTML = uniqueEmails
    .map(email => `<option value="${email}"></option>`)
    .join("");
}

// Refresh suggestions when the input is focused
loginEmailInput.addEventListener("focus", populateEmailSuggestions);
