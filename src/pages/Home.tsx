import { Typography } from "antd";
import React from "react";

const Home: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "calc(100vw + 60px)",
        left: "-60px",
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
        poster="https://image.mux.com/tyNbIWNKPwZvDmiWmMncp9xBnL01hYQoT/thumbnail.jpg"
        preload="none"
        src="https://brooklynstorehouse.com/app/uploads/2024/05/brooklyn-storehouse-dusk-16x9-02.mp4"
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
          <Typography.Title level={1} style={{ fontSize: '50px', color: "white", margin: "15px", borderBottom: "1px solid white" }}>Let Them Cook</Typography.Title>
          <Typography.Title level={1} style={{ fontWeight: 300, color: "white", margin: "15px" }}>99 Scott St</Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default Home;