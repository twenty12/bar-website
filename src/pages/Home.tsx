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
            Since 2016, Honey’s has been a host and home to a range of creative people and events. In both our physical space and our programming, we have a appreciation for handmade objects and original thought.
            <br />
            <br />
            In an average month, we co-host an array of events; gardening workshops, chef pop-ups, floral markets, weddings, birthday celebrations, and, of course, weekends filled with dancing.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Menu
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
            As fermenters and producers ourselves, we create and look for drinks with flavors that are distinct yet grounded. Our cocktails are guided by the creative vision of Arley Marks, while our ever-evolving natural wine list is curated by Harris Gilbertshper.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Parties
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
            Parties are central to who we are. There’s a joy and magic to a night of dancing and celebrating that we’re deeply fortunate to help create. Rather than focusing on a single genre, our programming is driven by our love of dancing and respect for original sounds.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Garden
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              The rooftop garden at Honey’s, run by herbalist and garden designer Naneh Israelyan, is a living celebration of plants, culture, and community.
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