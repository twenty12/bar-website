import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, ConfigProvider, Grid } from "antd";

// import Gallery from "./pages/Gallery";
// import Detail from "./pages/Detail";
// import Event from "./pages/Event";
import theme from "./theme.json";
import About from "./pages/About";
// import ContentDetails from "./components/contentDetail";
import AppMenu from "./components/appMenu";

const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;

  return (
    <ConfigProvider
      theme={{
        token: theme.token,
      }}
    >
      <Layout
        className="layout shifting-gradient"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Header
          style={{
            borderBottom: `1px ${theme.token.colorPrimary} solid`,
            backgroundColor: theme.token.headerColor,
            zIndex: 1,
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginRight: "auto",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "2px",
              }}
            >
              <Link to="/">Honey's</Link>
            </div>

            <AppMenu />
          </div>
        </Header>
        <Content
          style={{
            padding: "0 15px",
            marginTop: "20px",
            width: "100%",
            maxWidth: isBelowMd ? "100%" : "1600px",
            margin: "auto",
          }}
        >
          <Routes>
            {/* <Route path="/" element={<Gallery />} />
            <Route path="/:contentType" element={<Gallery />} />
            <Route
              path="/contentDetails/:contentType/:name"
              element={<ContentDetails />}
            />
            <Route path="/art/:id" element={<Detail />} /> */}
            <Route path="/about" element={<About />} />
            {/* <Route path="/party" element={<Event />} /> */}
          </Routes>
        </Content>
        <Footer
          style={{
            marginTop: "30px",
            backgroundColor: theme.token.headerColor,
          }}
        >
          Daniel Gladstone © 2024
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
