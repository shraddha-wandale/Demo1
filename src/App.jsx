// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ChartPage from "./pages/ChartPage";
import DashboardPage from "./pages/DashboardPage";
// import "../App.css"; // optional if you have global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Default home route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Upload page */}
          <Route path="/upload" element={<UploadPage />} />

          {/* Chart page */}
          <Route path="/chart" element={<ChartPage />} />

          {/* Dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h2>404 - Page Not Found</h2>
                <a
                  href="/"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Go to Home
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
