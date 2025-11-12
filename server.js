// Node.js server for signup/login (no Express)
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 5000; // Change this if needed
const USERS_FILE = path.join(__dirname, "users.json");

// Helper: Read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

// Helper: Write users to file
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Helper: Send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow CORS
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // ✅ Handle preflight (CORS)
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // ✅ Route: POST /signup
  if (req.method === "POST" && parsedUrl.pathname === "/signup") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { name, email, password } = JSON.parse(body);

        if (!name || !email || !password) {
          return sendJSON(res, 400, { error: "Missing required fields" });
        }

        const users = readUsers();
        const existingUser = users.find((u) => u.emailID === email);

        if (existingUser) {
          return sendJSON(res, 409, { error: "User already exists" });
        }

        const newUser = {
          username: name.toLowerCase(),
          displayName: name,
          emailID: email,
          password,
          hasLoggedInBefore: false, // first-time user
        };

        users.push(newUser);
        writeUsers(users);

        return sendJSON(res, 201, {
          message: "User registered successfully!",
          user: newUser,
        });
      } catch (err) {
        return sendJSON(res, 500, { error: "Invalid JSON data" });
      }
    });
    return;
  }

  // ✅ Route: POST /login
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

        if (!user) {
          return sendJSON(res, 401, { error: "Invalid credentials" });
        }

        // ✅ FIXED: Proper string interpolation using backticks
        const message = user.hasLoggedInBefore
          ? `Welcome back, ${user.displayName}!`
          : `Welcome, ${user.displayName}!`;

        // Update login status
        user.hasLoggedInBefore = true;
        writeUsers(users);

        return sendJSON(res, 200, { message, user });
      } catch {
        return sendJSON(res, 500, { error: "Server error" });
      }
    });
    return;
  }

  // ✅ Serve static files (HTML, CSS, JS)
  const filePath = path.join(
    __dirname,
    parsedUrl.pathname === "/" ? "index.html" : parsedUrl.pathname
  );

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
    }

    const ext = path.extname(filePath);
    const mime =
      {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
      }[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": mime });
    res.end(content);
  });
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
