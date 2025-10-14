import React, { useState } from "react";
import * as XLSX from "xlsx";
import Plot from "react-plotly.js";
// import "../App.css";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);

    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (json.length > 1) {
          const headers = json[0];
          const rows = json.slice(1);
          const xValues = rows.map((r) => r[0]);
          const yValues = rows.map((r) => r[1]);
          setChartData({ headers, xValues, yValues });
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // Generate chart
  const generateChart = () => {
    if (!chartData) return alert("Please upload a valid Excel file first!");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">📊</span> Excel Analytics
          <span className="tagline">Data Visualization Platform</span>
        </div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a className="active" href="/upload">Upload</a></li>
          <li><a href="/charts">Charts</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn-light">Sign In</button>
          <button className="btn-primary">Get Started</button>
        </div>
      </nav>

      {/* Upload Section */}
      <section className="upload-section">
        <h2>Upload Excel Files</h2>
        <p>Drag and drop your Excel or CSV files here to get started</p>

        <div className="upload-box" id="drop-area">
          <div className="upload-icon">⬆️</div>
          <p>Upload your Excel files</p>
          <span className="small-text">
            Supports .xlsx, .xls, and .csv files up to 10MB each
          </span>
          <input
            type="file"
            id="fileInput"
            multiple
            accept=".xlsx,.xls,.csv"
            hidden
            onChange={handleFileUpload}
          />
          <button
            className="btn-primary"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Choose Files
          </button>
        </div>

        {/* Dropdown for Chart Types */}
        <div className="chart-options">
          <label htmlFor="chartType">Select Chart Type:</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">2D Bar Chart</option>
            <option value="line">2D Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="scatter">Scatter Plot</option>
            <option value="3d">3D Column Chart</option>
          </select>
        </div>

        {/* Uploaded File List */}
        <div id="fileList" className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              📁 {file.name}
            </div>
          ))}
        </div>

        {/* Chart Display */}
        {chartData && (
          <div className="chart-container">
            <h2>Generated Chart</h2>
            <Plot
              data={[
                chartType === "bar"
                  ? { x: chartData.xValues, y: chartData.yValues, type: "bar" }
                  : chartType === "line"
                  ? { x: chartData.xValues, y: chartData.yValues, type: "scatter", mode: "lines+markers" }
                  : chartType === "pie"
                  ? { labels: chartData.xValues, values: chartData.yValues, type: "pie" }
                  : chartType === "scatter"
                  ? { x: chartData.xValues, y: chartData.yValues, mode: "markers", type: "scatter" }
                  : { x: chartData.xValues, y: chartData.yValues, type: "bar", marker: { color: "blue" } },
              ]}
              layout={{
                width: "100%",
                height: 500,
                title: `${chartType.toUpperCase()} Chart`,
              }}
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
