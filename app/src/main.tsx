import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";

import './main.css';
// import { ArtProvider } from "./context/ArtContext";
// import { ScreenSizeProvider } from "./context/ScreenSizeContext";
// import { ModalProvider } from "./context/ModalContext";
// import { CopyTextProvider } from "./context/CopyTextContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        {/* <ScreenSizeProvider> */}
          {/* <ArtProvider> */}
            {/* <CopyTextProvider> */}
            {/* <ModalProvider> */}
              <App />
            {/* </ModalProvider> */}
            {/* </CopyTextProvider> */}
          {/* </ArtProvider> */}
        {/* </ScreenSizeProvider> */}
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
