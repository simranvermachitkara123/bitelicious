export default function Button({ text, type = "button", onClick }) {
  return (
    <button type={type} onClick={onClick} className="main-btn">
      {text}
    </button>
  );
}
