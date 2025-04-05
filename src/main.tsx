import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";

import './main.css';
import { NotionDBProvider } from "./providers/CalendarProvider";
import { HelmetProvider } from "react-helmet-async";
import { GalleryProvider } from "./providers/GalleryProvider";
import { WebsiteCopyProvider } from "./providers/websiteCopyProvider";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://12cd852129ca17573b42d88728d9f7b1@o4509101155483648.ingest.us.sentry.io/4509101177831424"
});


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary>
      <BrowserRouter>
        <NotionDBProvider>
          <HelmetProvider>
            <ConfigProvider>
              <GalleryProvider>
                <WebsiteCopyProvider>
                  <App />
                </WebsiteCopyProvider>
              </GalleryProvider>
            </ConfigProvider>
          </HelmetProvider>
        </NotionDBProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);