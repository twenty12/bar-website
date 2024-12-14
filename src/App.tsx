import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, ConfigProvider, Grid } from "antd";

// import Gallery from "./pages/Gallery";
// import Detail from "./pages/Detail";
import logo_black from "./assets/images/logo_black.png";
import theme from "./theme.json";
import Calendar from "./pages/Calendar";
// import ContentDetails from "./components/contentDetail";
import AppMenu from "./components/appMenu";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AppFooter from "./components/appFooter";

const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Detect scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
            position: "fixed", // Makes the header fixed at the top
            top: 0, // Positions the header at the very top
            left: 0, // Aligns it with the left edge
            right: 0, // Aligns it with the right edge
            zIndex: 1000, // Ensures it stays above other content
            borderBottom: isScrolled
              ? "1px solid rgb(0, 0, 0, .1)" // Border disappears when scrolled
              : `1px ${theme.token.colorPrimary} solid`, // Border visible at the top
            backgroundColor: theme.token.appMenuBackgroundColor,

            height: "64px", // Fixed height for consistent layout
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Ensures items are spread between left and right
              height: "100%", // Matches header height
              width: "100%", // Ensures proper spacing
            }}
          >
            <div
              style={{
                marginRight: "auto",
                display: "flex", // Added
                alignItems: "center", // Ensures logo inside is vertically centered
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "2px",
              }}
            >
              <Link to="/">
                <img
                  src={logo_black}
                  style={{
                    filter: "grayscale(100%) drop-shadow(1px 1px 2px rgba(0, 0, 0, .05))",
                    height: "50px",
                    display: "block", // Prevents default inline spacing issues
                  }}
                />
              </Link>
            </div>
            <AppMenu />
          </div>
        </Header>
        <Content
          style={{
            maxWidth: isBelowMd ? "100%" : "1600px",
            margin: "auto",
          }}
        >
          <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/events" element={<Events />} />
            <Route path="/" element={<Home />} />

          </Routes>
        </Content>
          <AppFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
