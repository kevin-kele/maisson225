/**
 * main.jsx
 * -----------------------------------------------------------------------------
 * Point d'entrée JavaScript : charge les styles globaux puis monte <App />
 * dans la div #root de index.html.
 */
import React from "react";
import ReactDOM from "react-dom/client";

// Styles globaux (ordre important : variables -> base -> effets)
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/effects.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
