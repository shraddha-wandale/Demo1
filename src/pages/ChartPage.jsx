import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
// import "../App.css";

export default function ChartPage() {
  const [chartInfo, setChartInfo] = useState("");
  const [chartTitle, setChartTitle] = useState("Generated Chart");
  const [traces, setTraces] = useState([]);
  const [layout, setLayout] = useState({});

  // Utility function to safely parse sessionStorage JSON
  const safeParse = (key) => {
    try {
      const v = sessionStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch {
      return null;
    }
  };

  // Chart rendering logic
  useEffect(() => {
    const parsedData = safeParse("excel_parsedData");
    const headers = safeParse("excel_headers") || [];
    const xIndex = sessionStorage.getItem("excel_xIndex");
    const yIndex = sessionStorage.getItem("excel_yIndex");
    const zIndex = sessionStorage.getItem("excel_zIndex");
    const chartType = sessionStorage.getItem("excel_chartType") || "bar";
    const filename = sessionStorage.getItem("excel_filename") || "";

    if (!parsedData || !xIndex || !yIndex) {
      setChartTitle("No data to chart");
      setChartInfo("Please go back and upload/select columns.");
      return;
    }

    const labels = [];
    const yVals = [];
    const zVals = [];

    for (let r = 1; r < parsedData.length; r++) {
      const row = parsedData[r] || [];
      const rawX = row[xIndex];
      const rawY = row[yIndex];
      const rawZ = zIndex ? row[zIndex] : null;

      if (
        rawX === undefined ||
        rawX === null ||
        rawX === "" ||
        rawY === undefined ||
        rawY === null ||
        rawY === ""
      ) {
        continue;
      }

      labels.push(String(rawX));
      const numY = Number(rawY);
      yVals.push(isFinite(numY) ? numY : rawY);

      if (zIndex) {
        const numZ = Number(rawZ);
        zVals.push(isFinite(numZ) ? numZ : rawZ);
      } else {
        zVals.push(null);
      }
    }

    const info = `File: ${filename} · X: ${headers[xIndex] ?? xIndex} · Y: ${
      headers[yIndex] ?? yIndex
    } · Type: ${chartType}`;
    setChartInfo(info);

    let traces = [];
    let layout = {
      title: `${chartType.toUpperCase()} - ${headers[yIndex] ?? "Y"}`,
      autosize: true,
      margin: { t: 50, b: 80 },
    };

    if (chartType === "bar") {
      traces = [
        {
          x: labels,
          y: yVals.map((v) =>
            typeof v === "number" ? v : isFinite(Number(v)) ? Number(v) : null
          ),
          type: "bar",
          name: headers[yIndex],
        },
      ];
      layout.xaxis = { title: headers[xIndex] ?? "X" };
      layout.yaxis = { title: headers[yIndex] ?? "Y" };
    } else if (chartType === "line") {
      traces = [
        {
          x: labels,
          y: yVals,
          type: "scatter",
          mode: "lines+markers",
          name: headers[yIndex],
        },
      ];
      layout.xaxis = { title: headers[xIndex] ?? "X" };
      layout.yaxis = { title: headers[yIndex] ?? "Y" };
    } else if (chartType === "pie") {
      const agg = {};
      for (let i = 0; i < labels.length; i++) {
        const lab = labels[i];
        const val = Number(yVals[i]);
        if (!isFinite(val)) continue;
        agg[lab] = (agg[lab] || 0) + val;
      }
      traces = [
        {
          labels: Object.keys(agg),
          values: Object.values(agg),
          type: "pie",
          textinfo: "label+percent",
        },
      ];
      layout.title = `Pie - ${headers[yIndex] ?? "Y"}`;
    } else if (chartType === "scatter") {
      traces = [
        {
          x: labels,
          y: yVals,
          mode: "markers",
          type: "scatter",
          name: headers[yIndex],
        },
      ];
      layout.xaxis = { title: headers[xIndex] ?? "X" };
      layout.yaxis = { title: headers[yIndex] ?? "Y" };
    } else if (chartType === "3d") {
      if (!zIndex) {
        alert("No Z column selected for 3D chart. Please go back and select Z axis.");
        return;
      }
      const numericX = labels.map((l, i) =>
        isFinite(Number(l)) ? Number(l) : i
      );
      const numericY = yVals.map((v) => (isFinite(Number(v)) ? Number(v) : null));
      const numericZ = zVals.map((v) => (isFinite(Number(v)) ? Number(v) : null));
      traces = [
        {
          x: numericX,
          y: numericY,
          z: numericZ,
          mode: "markers",
          type: "scatter3d",
          marker: { size: 6, opacity: 0.8 },
          text: labels.map(
            (lab, i) =>
              `${headers[xIndex] ?? "X"}: ${labels[i]}<br>${
                headers[yIndex]
              }: ${yVals[i]}<br>${headers[zIndex]}: ${zVals[i]}`
          ),
          hoverinfo: "text",
        },
      ];
      layout.scene = {
        xaxis: { title: headers[xIndex] ?? "X" },
        yaxis: { title: headers[yIndex] ?? "Y" },
        zaxis: { title: headers[zIndex] ?? "Z" },
      };
      layout.title = `3D - ${headers[yIndex] ?? "Y"}`;
    } else {
      traces = [{ x: labels, y: yVals, type: "bar" }];
    }

    setTraces(traces);
    setLayout(layout);
  }, []);

  const goBack = () => window.history.back();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📊 Excel Analytics</div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={goBack} className="btn-light">
            Back
          </button>
        </div>
      </nav>

      <main style={{ padding: "20px" }}>
        <h2>{chartTitle}</h2>
        <a href="/dashboard">
          <button className="btn-history">History</button>
        </a>

        {traces.length > 0 ? (
          <Plot
            data={traces}
            layout={{
              ...layout,
              responsive: true,
              width: "100%",
              height: 500,
            }}
            style={{ width: "100%", height: "500px" }}
          />
        ) : (
          <p>No chart data available.</p>
        )}

        <div id="chartInfo" className="small-text" style={{ marginTop: 8 }}>
          {chartInfo}
        </div>
      </main>
    </div>
    
  );
}
