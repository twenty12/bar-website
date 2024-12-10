import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, ConfigProvider, Grid } from "antd";

// import Gallery from "./pages/Gallery";
// import Detail from "./pages/Detail";
// import Event from "./pages/Event";
import logo_black from "./assets/images/logo_black.png";
import theme from "./theme.json";
import About from "./pages/About";
import Calendar from "./pages/Calendar";
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
      height: "64px", // Ensures consistent height for header
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
            padding: "0 15px",
            marginTop: "20px",
            width: "100%",
            maxWidth: isBelowMd ? "100%" : "1600px",
            margin: "auto",
          }}
        >
          <Routes>
            <Route path="/calander" element={<Calendar />} />
            <Route path="/about" element={<About />} />

          </Routes>
        </Content>
        <Footer
          style={{
            marginTop: "30px",
            backgroundColor: theme.token.headerColor,
          }}
        >
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
