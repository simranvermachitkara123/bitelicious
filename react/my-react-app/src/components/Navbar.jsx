import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">Bitelicious</div>

        <ul className="nav-links">

          {/* HOME */}
          <li>
            <Link to="/">Menu</Link>
          </li>

          {/* LOGIN */}
          <li>
            <Link to="/login" className="login">Login</Link>
          </li>

          {/* OTHER PLACEHOLDERS */}
          <li><Link to="#">Contact</Link></li>
          <li><Link to="#">Favorites</Link></li>
          <li><Link to="#">About</Link></li>
          <li><Link to="#">Reviews</Link></li>

        </ul>
      </nav>
    </header>
  );
}
