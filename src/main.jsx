import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // global styles
import App from './App.jsx';
import "./App.css";
// import "../src/styles/style.css";

// Get the root DOM node
const rootElement = document.getElementById('root');

// Create React root
const root = createRoot(rootElement);

// Render the app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
