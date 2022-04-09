import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorProvider } from "./Hooks/ColorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ColorProvider>
    <App />
  </ColorProvider>
);
