import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";

import './main.css';
import { NotionDBProvider } from "./providers/NotionDBProvider";
import { HelmetProvider } from "react-helmet-async";
import { GalleryProvider } from "./providers/GalleryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotionDBProvider>
        <HelmetProvider>
          <ConfigProvider>
            <GalleryProvider>
              <App />
            </GalleryProvider>
          </ConfigProvider>
        </HelmetProvider>
      </NotionDBProvider>
    </BrowserRouter>
  </React.StrictMode>
);
