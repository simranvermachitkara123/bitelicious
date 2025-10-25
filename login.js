// Select forms
const signupForm = document.querySelector(".sign-up-container form");
const loginForm = document.querySelector(".sign-in-container form");

//signup........
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  // Get old users
  let users = JSON.parse(localStorage.getItem("users")) || [];


  const exists = users.find((user) => user.email === email); // email already exist
  if (exists) {
    alert("User already exists! Please login instead.");
    return;
  }


  const newUser = { name, email, password };  // new user object 

  // Add to array & store again
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup Successful 🎉");
  signupForm.reset();
});

// login........
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Get stored users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists
  const validUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (validUser) {
    alert(`Welcome back, ${validUser.name}! `);
    localStorage.setItem("currentUser", JSON.stringify(validUser));
    window.location.href = "home.html"; // redirect if you want
  } else {
    alert("Invalid email or password.Please try again ");
  }
});