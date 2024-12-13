import { Grid, Typography } from "antd";
import React from "react";
const { useBreakpoint } = Grid;


const Home: React.FC = () => {
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;

  return (
    <div
      style={{
        position: "fixed",
        width: "calc(100vw + 60px)",
        left: isBelowMd? "0" : "-60px",
        top: "-60px",
        height: "calc(100vh + 60px)",
        overflow: "hidden",
      }}
    >

      <video
        autoPlay
        loop
        muted
        playsInline
        poster=""
        preload="none"
        // src="https://brooklynstorehouse.com/app/uploads/2024/05/brooklyn-storehouse-dusk-16x9-02.mp4"
        src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/splash_vid_1.mp4"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "calc(100vw + 60px)",
          height: "calc(100vh + 60px)",
          objectFit: "cover", // Ensures the video covers the entire container
          transform: "translate(-50%, -50%)", // Centers the video
        }}
      ></video>
      <div
        style={{
          position: "relative",
          color: "white",
          display: "flex",
          justifyContent: "flex-end", // Aligns the text to the right
          padding: "20px", // Optional padding for spacing
          marginRight: "75px", // Optional margin for spacing
          marginTop: "200px", // Optional margin for spacing

        }}
      >
        <div style={{
          border: "2px solid white",
          backgroundColor: "rgba(0, 0,0, 0.1)", // Semi-transparent background
          borderRadius: "2px",
          paddingRight: "15px",
          paddingLeft: "15px",
          textAlign: "center",
        }}>
          <Typography.Title level={1} style={{ fontSize: '50px', color: "white", margin: "15px", borderBottom: "1px solid white" }}>For a sweet time</Typography.Title>
          <Typography.Title level={1} style={{ fontWeight: 300, color: "white", margin: "15px" }}>93 Scott Ave<br/>Brooklyn NY 11237</Typography.Title>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          marginLeft: '90px',
          bottom: "60px",
          width: "100%",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        New Website Coming Soon
      </div>
    </div>
  );
};

export default Home;