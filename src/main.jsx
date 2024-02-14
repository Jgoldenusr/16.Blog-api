import "./index.css";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";

const raiz = createRoot(document.getElementById("root"));
raiz.render(
  /* jshint ignore:start */
  <React.StrictMode>
    <App />
  </React.StrictMode>
  /* jshint ignore:end */
);
