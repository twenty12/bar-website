import { Typography } from "antd";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="full-page-video-wrapper">

        <video
          autoPlay
          loop
          muted
          playsInline
          poster=""
          preload="none"
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/splash_vid_1.mp4"
          style={{
            height: "100vh",
          }}
        ></video>
        <div
          style={{
            position: "relative",
            color: "white",
            display: "flex",
            justifyContent: "flex-end", // Aligns the text to the right
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
            <Typography.Title level={1} style={{ fontSize: '50px', color: "white", margin: "15px", borderBottom: "1px solid white" }}>For a Sweet Time</Typography.Title>
            <Typography.Title level={1} style={{ fontWeight: 300, color: "white", margin: "15px" }}>93 Scott Ave<br />Brooklyn 11237</Typography.Title>
          </div>
        </div>
      </div>
      <div className="full-page-video-body" style={{marginBottom: '60px'}}>
        <Typography.Title level={1} style={{ fontWeight: 300, margin: 0 }}>
        Honey’s has been welcoming creative communities of all types to the corner of Scott and Ralph since 2014. We are a bar and event space that channels the city’s raw, artistic energy into thoughtful experiences for our guests. Whether it’s a poetry reading, a flower farmer’s market, or a wild dance party, there’s no single archetype for what you might find when you visit. Through the curation of flavor, sound, and movement, we want every guest feeling both energized and cared for.
        </Typography.Title>
          <br/>
          <br/>
          <br/>
      </div>
    </>

  );
};

export default Home;