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
import EventDetail from "./pages/EventDetail";
import { Helmet } from "react-helmet-async";


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

// Log the current pathname
console.log("Current pathname:", location.pathname);

// Check if the current route requires a full layout
const isFullLayout = !location.pathname.includes("/links") && !location.pathname.includes("/event/");
const isEventPage = location.pathname.includes("/event/");
// Log the result
console.log("isFullLayout:", isFullLayout);

  return (
    <ConfigProvider
      theme={theme}
    >
      <Helmet>
        {/* Open Graph Tags */}
        <meta property="og:title" content={'Honey\'s'} />
        <meta property="og:description" content="For a sweet time"/>
        <meta property="og:image" content='https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/images/logo_black.png' />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={'Honey\'s'} />
        <meta name="twitter:description" content="For a sweet time" />
        <meta name="twitter:image" content='https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/images/logo_black.png' />
      </Helmet>
      <Layout
        className={isEventPage ? "layout shifting-gradient-dark" : "layout"}
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
            <Route path="/event/:id" element={<EventDetail />} />
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