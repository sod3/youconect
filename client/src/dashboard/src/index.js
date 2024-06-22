import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Define DashboardApp component
const DashboardApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Export DashboardApp
export { DashboardApp };

// Optional: Keep the original rendering code for standalone usage
if (document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <DashboardApp />
    </React.StrictMode>
  );
}
