import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <Navbar />

      <section className="hero">
        <div className="hero-text">
          <span className="tag">🍲 Next-Gen Recipe Finder</span>

          <h1>Discover Delicious Recipes for Every Mood</h1>

          <p>
            Find recipes easily — from quick snacks to gourmet dishes —
            with seamless search and smart recommendations.
          </p>

          <input
            type="text"
            className="search-bar"
            placeholder="Search for dishes, ingredients, or cuisines..."
          />
        </div>

        <div className="hero-image">
          <img src="/Cook_Image.jpg" alt="Cooking" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
