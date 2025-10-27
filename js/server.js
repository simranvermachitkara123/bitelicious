// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

// Read users
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Write users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ===== SIGNUP =====
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const users = getUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "User already exists!" });
  }

  users.push({ name, email, password });
  saveUsers(users);

  res.json({ success: true, message: "Signup successful!" });
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  res.json({ success: true, message: "Login successful!", user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));