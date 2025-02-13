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
            {/* <Typography.Title level={1} style={{ fontSize: '50px', color: "white", margin: "15px", borderBottom: "1px solid white" }}></Typography.Title> */}
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
            Since 2016, Honey’s has welcomed a wide range of experimental creatives, from chefs and producers to filmmakers and authors. We are deeply committed to creating spaces for free expression through our dynamic programming, private events, rooftop parties, and nightly bar service.
            <br />
            <br />
            We host a wide range of public events, including gardening workshops, chef pop-ups, floral markets, weddings, birthday celebrations, and late-night dance parties in our barrel room and on our rooftop.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Menu
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
            Our bar menu is guided by both our bar team and the creative vision of Arley Marks, while our natural wine list is curated by Harris Gilbertshper, who is also our in-house cider maker and oversees the barrel room and in-house production facilities.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Parties
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
            Parties are central to who we are. We welcome a diverse range of DJs and performers who bring an ever-evolving, unique style and vibe. Do you have a public party you’d like to host with us? Send us a note HERE.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Garden
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
            The rooftop garden at Honey’s is managed by herbalist and garden designer Naneh Israelyan of Pioneer Flora. She brings the space to life each summer with her medicinal and culinary plantings, creating a vibrant backdrop for herbalism classes and wedding ceremonies alike.
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