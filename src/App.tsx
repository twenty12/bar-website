import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import logo from "./assets/images/logo.svg";
import theme from "./theme.json";
import Calendar from "./pages/Calendar";
import AppMenu from "./components/appMenu";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AppFooter from "./components/appFooter";
import Links from "./pages/Links";
import Menu from "./pages/Menu";


const App: React.FC = () => {
  const { Header, Content } = Layout;

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Detect scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define routes that skip header/footer
  const routesWithoutHeaderFooter = ["/links"];

  // Check if current route requires a full layout
  const isFullLayout = !routesWithoutHeaderFooter.includes(location.pathname);

  return (
    <ConfigProvider
      theme={theme}
    >
      <Layout
        className="layout"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        {isFullLayout && (
          <Header
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              borderBottom: isScrolled
                ? "1px solid rgb(0, 0, 0, .1)"
                : `1px ${theme.token.colorPrimary} solid`,
              backgroundColor: theme.token.appMenuBackgroundColor,
              height: "64px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
              }}
            >
              <div
                style={{
                  marginRight: "auto",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                }}
              >
                <Link to="/">
                  <img
                    src={logo}
                    style={{
                      filter: "grayscale(100%) drop-shadow(1px 1px 2px rgba(0, 0, 0, .05))",
                      height: "50px",
                      display: "block",
                    }}
                  />
                </Link>
              </div>
              <AppMenu />
            </div>
          </Header>
        )}
        <Content
          style={{
            margin: isFullLayout ? "auto" : "0", // Remove margins for routes without layout
            paddingTop: isFullLayout ? "64px" : "0", // Adjust padding for header
          }}
        >
          <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/events" element={<Events />} />
            <Route path="/links" element={<Links />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Content>
        {isFullLayout && <AppFooter />}
      </Layout>
    </ConfigProvider>
  );
};

export default App;