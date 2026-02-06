import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tokens.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ✅ Import Vue Web Component to register it globally

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
