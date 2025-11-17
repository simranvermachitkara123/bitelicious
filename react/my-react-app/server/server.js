// Node.js server for signup/login (no Express)
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 5000;
const USERS_FILE = path.join(__dirname, "users.json");

// Read users
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

// Write users
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // SIGNUP
  if (req.method === "POST" && parsedUrl.pathname === "/signup") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { name, email, password } = JSON.parse(body);
        if (!name || !email || !password)
          return sendJSON(res, 400, { error: "Missing fields" });

        const users = readUsers();
        const existing = users.find((u) => u.emailID === email);
        if (existing)
          return sendJSON(res, 409, { error: "User already exists" });

        const newUser = {
          username: name.toLowerCase(),
          displayName: name,
          emailID: email,
          password,
          hasLoggedInBefore: false,
        };

        users.push(newUser);
        writeUsers(users);
        return sendJSON(res, 201, { message: `Welcome, ${name}! 🎉 Your account has been created successfully. You can now login!`, user: newUser });
      } catch {
        return sendJSON(res, 500, { error: "Invalid JSON" });
      }
    });
    return;
  }

  // LOGIN
  if (req.method === "POST" && parsedUrl.pathname === "/login") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { email, password } = JSON.parse(body);
        const users = readUsers();

        const user = users.find(
          (u) =>
            u.emailID.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!user) return sendJSON(res, 401, { error: "Invalid credentials" });

        const msg = user.hasLoggedInBefore
          ? `👋 Welcome back, ${user.displayName}! Great to see you again.`
          : `🎉 Welcome, ${user.displayName}! Thanks for joining us!`;

        user.hasLoggedInBefore = true;
        writeUsers(users);

        return sendJSON(res, 200, { message: msg, user });
      } catch {
        return sendJSON(res, 500, { error: "Server error" });
      }
    });
    return;
  }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
