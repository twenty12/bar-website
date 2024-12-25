import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";

import './main.css';
import { NotionDBProvider } from "./providers/NotionDBProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotionDBProvider>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </NotionDBProvider>
    </BrowserRouter>
  </React.StrictMode>
);
