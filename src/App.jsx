import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Updated imports to match correct page files
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ChartPage from "./pages/ChartPage"; // ✅ changed from ChartsPage
import DashboardPage from "./pages/DashboardPage";
import "./main.jsx";

// import "../App.css";

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
          <Route path="/chart" element={<ChartPage />} /> {/* ✅ path corrected to singular 'chart' */}

          {/* Dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Optional: 404 page for unmatched routes */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h2>404 - Page Not Found</h2>
                <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
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
