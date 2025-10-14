// src/pages/HomePage.jsx
import React from "react";
// import "./style.css";

export default function HomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          📊 Excel Analytics <span className="tagline">Data Visualization Platform</span>
        </div>
        <ul className="nav-links">
          <li><a className="active" href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/charts">Charts</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn-light">Sign In</button>
          <button className="btn-primary">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Transform Your <span className="highlight">Excel Data</span> Into Powerful Insights
        </h1>
        <p>
          Upload Excel files, create stunning interactive charts, and generate AI-powered insights. 
          No coding required – just drag, drop, and visualize your data instantly.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">⬆️ Start Analyzing Data</button>
          <button className="btn-light">▶️ View Demo</button>
        </div>

        <div className="stats">
          <div>
            <strong>10K+</strong><br />Files Uploaded
          </div>
          <div>
            <strong>50+</strong><br />Chart Types
          </div>
          <div>
            <strong>99.9%</strong><br />Accuracy
          </div>
          <div>
            <strong>24/7</strong><br />Availability
          </div>
        </div>
      </section>
    </div>
  );
}
