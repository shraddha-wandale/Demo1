import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function ChartPage() {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar");

  // ✅ 1. Load chart data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("chartData");
    if (data) setChartData(JSON.parse(data));
  }, []);

  // ✅ 2. Update the chart type in history when changed
  useEffect(() => {
    if (chartData) {
      const history = JSON.parse(localStorage.getItem("chart_history") || "[]");
      if (history.length > 0) {
        history[history.length - 1].chartType = chartType;
        localStorage.setItem("chart_history", JSON.stringify(history));
      }
    }
  }, [chartType, chartData]);

  if (!chartData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No Data Found</h2>
        <p>Please upload a file first.</p>
        <a href="/upload" className="btn-primary">Go to Upload Page</a>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          📊 Excel Analytics <span className="tagline">Chart Viewer</span>
        </div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a className="active" href="/chart">Charts</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </nav>

      {/* Chart Section */}
      <section className="chart-section">
        <h2>Generated Chart</h2>

        <div className="chart-options">
          <label>Select Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="scatter">Scatter</option>
          </select>
        </div>

        <Plot
          data={[
            chartType === "bar"
              ? { x: chartData.xValues, y: chartData.yValues, type: "bar" }
              : chartType === "line"
              ? { x: chartData.xValues, y: chartData.yValues, type: "scatter", mode: "lines+markers" }
              : chartType === "pie"
              ? { labels: chartData.xValues, values: chartData.yValues, type: "pie" }
              : { x: chartData.xValues, y: chartData.yValues, mode: "markers", type: "scatter" },
          ]}
          layout={{
            width: 1000,
            height: 600,
            title: `${chartType.toUpperCase()} Chart`,
          }}
        />
      </section>
    </div>
  );
}
