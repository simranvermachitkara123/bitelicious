// import React, { useState, useEffect } from "react";
// import "../css/login.css";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [mode, setMode] = useState("login");

//   const [signupValues, setSignupValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });

//   const [loginValues, setLoginValues] = useState({
//     email: "",
//     password: "",
//   });

//   const togglePassword = (id) => {
//     const field = document.getElementById(id);
//     if (field) field.type = field.type === "password" ? "text" : "password";
//   };

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isValidPassword = (pass) =>
//     pass.length >= 8 &&
//     /[A-Z]/.test(pass) &&
//     /\d/.test(pass) &&
//     /[!@#$%^&*]/.test(pass);

//   useEffect(() => {
//     const pwd = signupValues.password;

//     const checklist = {
//       length: pwd.length >= 8,
//       uppercase: /[A-Z]/.test(pwd),
//       number: /\d/.test(pwd),
//       special: /[!@#$%^&*]/.test(pwd),
//     };

//     Object.entries(checklist).forEach(([id, status]) => {
//       const el = document.getElementById(id);
//       if (el) el.style.color = status ? "green" : "red";
//     });
//   }, [signupValues.password]);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, email, password, confirm } = signupValues;

//     if (name.trim() === "" || /\d/.test(name)) return alert("Invalid name");
//     if (!isValidEmail(email)) return alert("Invalid email");
//     if (!isValidPassword(password)) return alert("Weak password");
//     if (password !== confirm) return alert("Passwords do not match");

//     try {
//       const res = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(data.message);
//         setMode("login");
//       } else alert(data.error);
//     } catch {
//       alert("Server connection failed");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const { email, password } = loginValues;

//     if (!isValidEmail(email)) return alert("Invalid email");
//     if (!password) return alert("Password required");

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Login successful!");
//         localStorage.setItem("currentUser", JSON.stringify(data.user));
//         navigate("/home");
//       } else alert(data.error);
//     } catch {
//       alert("Server connection failed");
//     }
//   };

//   return (
//     <div className="auth-page">

//       {/* background bubbles */}
//       <div className="background">
//         <div className="bubble"></div>
//         <div className="bubble"></div>
//       </div>

//       <div className="login-card">

//         {/* Switch buttons */}
//         <div className="switch-buttons">
//           <button
//             className={mode === "login" ? "active" : ""}
//             onClick={() => setMode("login")}
//           >
//             Login
//           </button>

//           <button
//             className={mode === "signup" ? "active" : ""}
//             onClick={() => setMode("signup")}
//           >
//             Sign Up
//           </button>
//         </div>

//         {/* LOGIN FORM */}
//         {mode === "login" && (
//           <form onSubmit={handleLogin}>
//             <h1>Login</h1>

//             <input
//               type="email"
//               placeholder="Email"
//               value={loginValues.email}
//               onChange={(e) =>
//                 setLoginValues({ ...loginValues, email: e.target.value })
//               }
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               id="loginPassword"
//               value={loginValues.password}
//               onChange={(e) =>
//                 setLoginValues({ ...loginValues, password: e.target.value })
//               }
//             />

//             <button type="submit">Login</button>

//             <p className="toggle-text">
//               Don’t have an account?{" "}
//               <span onClick={() => setMode("signup")}>Sign Up</span>
//             </p>
//           </form>
//         )}

//         {/* SIGNUP FORM */}
//         {mode === "signup" && (
//           <form onSubmit={handleSignup}>
//             <h1>Create Account</h1>

//             <input
//               type="text"
//               placeholder="Full Name"
//               value={signupValues.name}
//               onChange={(e) =>
//                 setSignupValues({ ...signupValues, name: e.target.value })
//               }
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               value={signupValues.email}
//               onChange={(e) =>
//                 setSignupValues({ ...signupValues, email: e.target.value })
//               }
//             />

//             <input
//               id="signupPassword"
//               type="password"
//               placeholder="Password"
//               value={signupValues.password}
//               onChange={(e) =>
//                 setSignupValues({ ...signupValues, password: e.target.value })
//               }
//             />

//             <ul className="password-checklist">
//               <li id="length">At least 8 characters</li>
//               <li id="uppercase">One uppercase letter</li>
//               <li id="number">One number</li>
//               <li id="special">One special character (!@#$%^&*)</li>
//             </ul>

//             <input
//               id="signupConfirm"
//               type="password"
//               placeholder="Confirm Password"
//               value={signupValues.confirm}
//               onChange={(e) =>
//                 setSignupValues({ ...signupValues, confirm: e.target.value })
//               }
//             />

//             <button type="submit">Sign Up</button>

//             <p className="toggle-text">
//               Already have an account?{" "}
//               <span onClick={() => setMode("login")}>Login</span>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup

  const [signupValues, setSignupValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [showPwd, setShowPwd] = useState(false);

  // Validation functions
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (pass) =>
    pass.length >= 8 &&
    /[A-Z]/.test(pass) &&
    /\d/.test(pass) &&
    /[!@#$%^&*]/.test(pass);

  // Validation for name - check if it contains numbers
  const hasNumberInName = /\d/.test(signupValues.name);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginValues;

    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Invalid email format");
      return;
    }
    if (!password) {
      alert("Password is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/home");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server connection failed");
      console.error(err);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = signupValues;

    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (hasNumberInName) {
      alert("Name cannot contain numbers");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Invalid email format");
      return;
    }
    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters with uppercase, number, and special character");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Account created successfully!");
        setSignupValues({ name: "", email: "", password: "", confirm: "" });
        setMode("login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Server connection failed");
      console.error(err);
    }
  };

  // password rules
  const pwd = signupValues.password;

  const rules = {
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[!@#$%^&*]/.test(pwd),
  };

  const strength =
    rules.length + rules.uppercase + rules.number + rules.special;

  const strengthText =
    strength <= 1
      ? "Weak"
      : strength === 2 || strength === 3
      ? "Medium"
      : "Strong";

  const strengthColor =
    strength <= 1 ? "red" : strength === 2 || strength === 3 ? "orange" : "green";

  return (
    <div className="auth-page">
      <div className="card">

        {/* SWITCH BUTTONS */}
        <div className="switch-box">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <h2 className="title">Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginValues.email}
              onChange={(e) =>
                setLoginValues({ ...loginValues, email: e.target.value })
              }
            />

            <div className="input-group">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={loginValues.password}
                onChange={(e) =>
                  setLoginValues({ ...loginValues, password: e.target.value })
                }
              />

              <span className="eye" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? "\u{1F513}" : "\u{1F512}"}
              </span>
            </div>

            <button type="submit" className="btn-main">Login</button>

            <p className="switch-text">
              Don't have an account?{" "}
              <span onClick={() => setMode("signup")}>Sign Up</span>
            </p>
          </form>
        )}

        {/* SIGNUP FORM */}
        {mode === "signup" && (
          <form onSubmit={handleSignup}>
            <h2 className="title">Create Account</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={signupValues.name}
              onChange={(e) =>
                setSignupValues({ ...signupValues, name: e.target.value })
              }
            />

            {hasNumberInName && signupValues.name.length > 0 && (
              <p className="error-msg">Name cannot contain numbers</p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={signupValues.email}
              onChange={(e) =>
                setSignupValues({ ...signupValues, email: e.target.value })
              }
            />

            {/* PASSWORD FIELD */}
            <div className="input-group">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={signupValues.password}
                onChange={(e) =>
                  setSignupValues({ ...signupValues, password: e.target.value })
                }
              />

              <span className="eye" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? "\u{1F513}" : "\u{1F512}"}
              </span>
            </div>

            {/* STRENGTH METER */}
            {pwd.length > 0 && (
              <p className="strength" style={{ color: strengthColor }}>
                Strength: {strengthText}
              </p>
            )}

            {/* PASSWORD RULES WITH CHECKMARKS */}
            {pwd.length > 0 && (
              <ul className="rules">
                <li className={rules.length ? "ok" : ""}>
                  At least 8 characters
                </li>
                <li className={rules.uppercase ? "ok" : ""}>
                  One uppercase letter
                </li>
                <li className={rules.number ? "ok" : ""}>One number</li>
                <li className={rules.special ? "ok" : ""}>
                  One special character (!@#$%^&*)
                </li>
              </ul>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={signupValues.confirm}
              onChange={(e) =>
                setSignupValues({ ...signupValues, confirm: e.target.value })
              }
            />

            <button type="submit" className="btn-main">Sign Up</button>

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
