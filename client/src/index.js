import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AccountProvider } from "./Hooks/AccountContext";
import { ColorProvider } from "./Hooks/ColorContext";
import { DataProvider } from "./Hooks/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <AccountProvider>
      <ColorProvider>
        <App />
      </ColorProvider>
    </AccountProvider>
  </DataProvider>
);
