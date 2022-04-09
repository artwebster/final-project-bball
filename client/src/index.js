import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorProvider } from "./Hooks/ColorContext";
import { DataProvider } from "./Hooks/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <ColorProvider>
      <App />
    </ColorProvider>
  </DataProvider>
);
