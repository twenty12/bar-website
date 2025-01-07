import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="full-page-video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/outside_1_poster.jpg"
          preload="auto"
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/outside_1.mov"
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
          <div
            className='dark-hover'
            onClick={() => navigate('/calendar')}
            style={{
              border: "2px solid white",
              borderRadius: "2px",
              paddingRight: "15px",
              cursor: "pointer",
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
          style={{ maxWidth: '990px' }}
          gutter={[16, 16]}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              About
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              Since 2016, Honey's has welcomed creative communities of all kinds to the corner of Scott and Randolph. We're a bar and event space that transforms the city's raw, artistic energy into thoughtful experiences for our guests. From poetry readings to floral markets to wild dance parties, we are a space for creators of all types.
              <br />
              <br />
              Through carefully curated flavors, sounds, and movements, we strive to have every guest leave feeling cared for and energized.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Menu
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              We take a thoughtful approach to every drink we serve. Our natural wine selection highlights small producers, sustainable practices, and bold, unexpected flavors. Cocktails are crafted with seasonal ingredients and house-made infusions, thoughtfully designed to complement the spirit of Honey’s.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Parties
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              Parties are central to who we are - our ritual in community building. These gatherings remind us that life is best when shared, that music and movement awaken inspiration, and that spontaneity keeps things real. They ground us in the moment, bringing people together in ways that feel raw, unexpected, and deeply familiar. The energy of these nights lingers, sparking ideas, building connections, and fueling us beyond that one night.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Garden
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              The rooftop garden at Honey’s, run by herbalist and garden designer Naneh Israelyan, is a living celebration of plants, culture, and community—a space where ancient traditions of herbal medicine meet modern urban life. Conceived as a botanical library of historically significant and medicinal plants, the garden evolves with each season, reflecting Naneh’s deep knowledge and creative vision.
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