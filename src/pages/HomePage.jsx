import React, { useEffect, useState } from "react";


export default function HomePage() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("chart_history") || "[]");
    setHistory(storedHistory.slice().reverse()); // latest first
  }, []);

  const handleDownload = (chart) => {
    const data = JSON.stringify(chart.chartData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chart-analysis-${new Date(chart.timestamp).toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewChart = (chart) => {
    localStorage.setItem("chartData", JSON.stringify(chart.chartData));
    localStorage.setItem("chart_type", chart.chartType || "bar");
    window.location.href = "/chart";
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📊 Excel Analytics</div>
        <ul className="nav-links">
          <li><a className="active" href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/chart">Charts</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
        <div className="user-info">
          <span>{user.name}</span>
          {/* Using placeholder avatar URL */}
          <img
            src="https://via.placeholder.com/32.png?text=👤"
            alt="User Avatar"
            className="avatar"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Transform Your <span className="highlight">Excel Data</span> Into Insights</h1>
          <p>Upload Excel files, generate charts, and analyze your data instantly.</p>
          <div className="hero-buttons">
            <a href="/upload" className="btn-primary">⬆️ Start Analyzing Data</a>
            <a href="/chart" className="btn-light">▶️ View Demo</a>
          </div>
        </div>
      </section>

      {/* Recent Analyses */}
      <section className="history-section">
        <h2>Recent Analyses</h2>
        {history.length === 0 ? (
          <p>No analyses yet. Upload a file to get started!</p>
        ) : (
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <strong>{item.chartType?.toUpperCase()}</strong> chart from <em>{item.filename || "unknown file"}</em>
                <br />
                <span>X: {item.headers?.[item.xIndex] || item.xIndex}, Y: {item.headers?.[item.yIndex] || item.yIndex}</span>
                <br />
                <span style={{ color: "#666" }}>{new Date(item.timestamp).toLocaleString()}</span>
                <br />
                <button className="btn-primary" onClick={() => handleViewChart(item)}>View Chart</button>
                <button className="btn-light" onClick={() => handleDownload(item)} style={{ marginLeft: "8px" }}>💾 Download</button>
              </li>
            ))}
         </ul>
        )
      }      
      </section>
    </div>
  );
}
