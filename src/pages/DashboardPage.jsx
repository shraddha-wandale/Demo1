import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  // Load history from localStorage when component mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chart_history") || "[]");
    setHistory(stored);
  }, []);

  // View chart handler
  const viewChart = (index) => {
    const historyData = JSON.parse(localStorage.getItem("chart_history") || "[]");
    const reversed = historyData.slice().reverse();
    const entry = reversed[index];
    if (!entry) return;

    try {
      if (entry.parsedSnapshot) {
        sessionStorage.setItem("excel_parsedData", JSON.stringify(entry.parsedSnapshot));
      } else {
        sessionStorage.removeItem("excel_parsedData");
      }

      sessionStorage.setItem("excel_headers", JSON.stringify(entry.headers));
      sessionStorage.setItem("excel_xIndex", entry.xIndex);
      sessionStorage.setItem("excel_yIndex", entry.yIndex);
      sessionStorage.setItem("excel_zIndex", entry.zIndex || "");
      sessionStorage.setItem("excel_chartType", entry.chartType || "bar");
      sessionStorage.setItem("excel_filename", entry.filename || "");

      window.location.href = "/chart"; // navigate to chart page
    } catch (err) {
      console.warn("Storage error:", err);
      alert("Unable to open this history entry.");
    }
  };

  // Clear chart history
  const clearHistory = () => {
    if (!window.confirm("Clear all saved chart history?")) return;
    localStorage.removeItem("chart_history");
    setHistory([]);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">📊</span> Excel Analytics
          <span className="tagline">Dashboard</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/chart">Charts</a></li>
          <li><a className="active" href="/dashboard">Dashboard</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn-light">Sign In</button>
          <button className="btn-primary">Get Started</button>
        </div>
      </nav>

      {/* Dashboard Section */}
      <section className="upload-section">
        <h2>Chart History</h2>
        <p>All your previously generated charts are listed below.</p>

        <div id="historyList" className="file-list">
          {history.length === 0 ? (
            <p>No charts generated yet.</p>
          ) : (
            <ul>
              {history
                .slice()
                .reverse()
                .map((h, i) => (
                  <li key={i}>
                    <strong>{h.chartType?.toUpperCase()}</strong> chart from{" "}
                    <em>{h.filename || "unknown file"}</em>
                    <br />
                    <span>
                      X: {h.headers?.[h.xIndex] || h.xIndex}, Y:{" "}
                      {h.headers?.[h.yIndex] || h.yIndex}
                      {h.zIndex ? `, Z: ${h.headers?.[h.zIndex] || h.zIndex}` : ""}
                    </span>
                    <br />
                    <span style={{ color: "#666" }}>
                      {new Date(h.timestamp).toLocaleString()}
                    </span>
                    <br />
                    <button
                      onClick={() => viewChart(i)}
                      className="btn-primary"
                      style={{ marginTop: "8px" }}
                    >
                      View Chart
                    </button>
                    <hr />
                  </li>
                ))}
            </ul>
          )}
        </div>

        {history.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <button className="btn-light" onClick={clearHistory}>
              Clear History
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
