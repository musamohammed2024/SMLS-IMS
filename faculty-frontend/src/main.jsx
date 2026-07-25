import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

/* Global styles */
import "./App.css";
import "./styles/layout.css";

/* ================= ROOT APP BOOTSTRAP ================= */

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
   <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>
  <App />
</BrowserRouter>
  </React.StrictMode>
);