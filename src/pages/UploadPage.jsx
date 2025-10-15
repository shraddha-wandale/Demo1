import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

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

          // ✅ Prepare chart info
          const chartInfo = { headers, xValues, yValues };

          // ✅ Save current chart data
          localStorage.setItem("chartData", JSON.stringify(chartInfo));

          // ✅ Save chart history
          const history = JSON.parse(localStorage.getItem("chart_history") || "[]");
          history.push({
            filename: file.name,
            chartType: "bar",
            headers,
            xIndex: 0,
            yIndex: 1,
            timestamp: Date.now(),
            parsedSnapshot: chartInfo,
          });
          localStorage.setItem("chart_history", JSON.stringify(history));

          // ✅ Redirect to Chart page
          navigate("/chart");
        }
      };

      reader.readAsArrayBuffer(file);
    }
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
          <li><a href="/chart">Charts</a></li>
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
        <p>Upload your Excel or CSV files to generate interactive charts</p>

        <div className="upload-box">
          <div className="upload-icon">⬆️</div>
          <p>Upload your Excel files</p>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            hidden
            id="fileInput"
            onChange={handleFileUpload}
          />
          <button
            className="btn-primary"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Choose File
          </button>
        </div>

        {/* Uploaded file name */}
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              📁 {file.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
