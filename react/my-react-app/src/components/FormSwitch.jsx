export default function FormSwitch({ mode, setMode }) {
  return (
    <div className="switch-buttons">
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
  );
}
