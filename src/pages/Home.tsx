import { Col, Row, Typography } from "antd";
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
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/outside_1.MOV"
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
            backgroundColor: "rgba(0, 0,0, 0.3)", // Semi-transparent background
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
      <div className="full-page-video-body" style={{
        marginBottom: '60px',
        justifyContent: 'center',
        display: 'flex'
      }}>
        <Row
          style={{maxWidth: '990px'}}
          gutter={[16, 16]}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              About Us
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              Since 2016, Honey's has welcomed creative communities of all kinds to the corner of Scott and Randolph. We're a bar and event space that transforms the city's raw, artistic energy into thoughtful experiences for our guests. From poetry readings to floral markets to wild dance parties, a unique experience awaits with each visit.
              <br />
              <br />
              Through carefully curated flavors, sounds, and movements, we ensure every guest leaves feeling both energized and cared for.
            </Typography.Title>
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </div>
    </>

  );
};

export default Home;