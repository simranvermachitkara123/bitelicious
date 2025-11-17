import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

export default function Footer() {
  return (
    <>
      {/* MAIN FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          {/* Contact Section */}
          <div className="footer-section">
            <h4>Contact</h4>
            <Link to="#" style={{ textDecoration: "none" }}>Contact</Link>
            <p><strong>Email:</strong> Bitelicious_official.gmail.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p>
              <strong>Instagram:</strong>
              <a
                href="https://www.instagram.com/bite_licious4u"
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                bite_licious4u
              </a>
            </p>
          </div>

          {/* About Section */}
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">How It Works</Link></li>
              <li><Link to="#">Contact Us</Link></li>
            </ul>
          </div>

          {/* Feedback Section */}
          <div className="footer-section">
            <h4>Feedback</h4>
            <ul>
              <li><Link to="#">Reviews</Link></li>
              <li><Link to="#">Personal Experience</Link></li>
              <li><Link to="#">Help</Link></li>
            </ul>
          </div>

        </div>
      </footer>

      {/* BOTTOM FOOTER */}
      <div className="footer-bottom">
        <p>
          Made with LOVE by <strong>OUR TEAM</strong> for
          <strong> FOOD LOVERS 🍔</strong> | &copy; 2025
          <strong> BITELICIOUS</strong>
        </p>

        <p>
          <a
            href="https://www.instagram.com/bite_licious4u"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          {" | "}
          <Link to="#">Feedback</Link>
          {" | "}
          <Link to="#">Contact Us</Link>
        </p>
      </div>
    </>
  );
}
